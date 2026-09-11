// ---------------------------------------------------------------------------
// TTS DOWNLOADER
// Generates one MP3 per case-folded Albanian surface in the game using Azure Neural
// TTS, writing them to public/audio/<slug>.mp3. Already-downloaded clips are
// skipped, so re-running only fills gaps.
//
//   node scripts/tts-download.mjs            # fill missing clips
//   node scripts/tts-download.mjs --force    # re-generate everything
//   node scripts/tts-download.mjs --force-cefr # re-generate held-out listening clips with their assigned voices
//
// Credentials come from .env (AZURE_TTS_KEY1 / AZURE_TTS_ENDPOINT).
// ---------------------------------------------------------------------------
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DICT, STORY } from '../src/game/content.js'
import { audioSlug } from '../src/game/audio.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { CEFR_TASKS } from '../src/game/cefrTasks.js'
import { CEFR_PREPARATION_ACTIVITIES } from '../src/game/cefrPreparation.js'
import { collectAudioSurfaces } from './lib/audio-surfaces.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'public/audio')
const FORCE = process.argv.includes('--force')
const FORCE_CEFR = process.argv.includes('--force-cefr')
const ONLY_SURFACE = process.argv.find((argument) => argument.startsWith('--surface='))?.slice('--surface='.length) || null

// --- credentials ----------------------------------------------------------
function loadEnv() {
  const env = {}
  const raw = readFileSync(resolve(ROOT, '.env'), 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) env[m[1]] = m[2].trim()
  }
  return env
}
const env = loadEnv()
const KEY = env.AZURE_TTS_KEY1 || env.AZURE_TTS_KEY2
if (!KEY) {
  console.error('Missing AZURE_TTS_KEY1 in .env')
  process.exit(1)
}
// region from the cognitive-services endpoint host, e.g. westeurope
const region = (env.AZURE_TTS_ENDPOINT || '')
  .replace(/^https?:\/\//, '')
  .split('.')[0]
if (!region) {
  console.error('Could not derive region from AZURE_TTS_ENDPOINT')
  process.exit(1)
}
const TTS_HOST = `https://${region}.tts.speech.microsoft.com`

// --- pick the best Albanian neural voice -----------------------------------
async function availableVoices() {
  const res = await fetch(`${TTS_HOST}/cognitiveservices/voices/list`, {
    headers: { 'Ocp-Apim-Subscription-Key': KEY },
  })
  if (!res.ok) {
    throw new Error(`voices/list failed: ${res.status} ${await res.text()}`)
  }
  const voices = await res.json()
  const sq = voices.filter((v) => v.Locale === 'sq-AL')
  if (!sq.length) {
    throw new Error('No sq-AL voices available on this Speech resource')
  }
  // prefer female neural (Anila) for clarity, else first available
  const pick =
    sq.find((v) => /Anila/i.test(v.ShortName)) ||
    sq.find((v) => v.VoiceType === 'Neural') ||
    sq[0]
  return {
    defaultVoice: pick.ShortName,
    supported: new Set(sq.map((entry) => entry.ShortName)),
  }
}

// --- synthesize one surface ------------------------------------------------
const xmlEscape = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]))

async function synth(text, voice) {
  const ssml =
    `<speak version='1.0' xml:lang='sq-AL'>` +
    `<voice xml:lang='sq-AL' name='${voice}'>${xmlEscape(text)}</voice>` +
    `</speak>`
  const res = await fetch(`${TTS_HOST}/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'language-adventure-tts',
    },
    body: ssml,
  })
  if (!res.ok) {
    throw new Error(`synth "${text}" failed: ${res.status} ${await res.text()}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

// --- main ------------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const authoredSurfaces = collectAudioSurfaces(
    DICT,
    STORY,
    EVERYDAY_PHRASE_DRILLS,
    CEFR_TASKS,
    CEFR_PREPARATION_ACTIVITIES,
  )
  const cefrVoiceBySlug = new Map()
  for (const task of CEFR_TASKS) {
    if (task?.mode !== 'listening' || task.stimulus?.kind !== 'continuous-audio') continue
    const slug = audioSlug(task.stimulus.scriptSq)
    const assigned = task.voice?.synthesisVoice
    if (!assigned) throw new Error(`${task.id} has no synthesisVoice`)
    const previous = cefrVoiceBySlug.get(slug)
    if (previous && previous !== assigned) {
      throw new Error(`${task.id} reuses a listening surface with conflicting voices`)
    }
    cefrVoiceBySlug.set(slug, assigned)
  }
  // Capitalization variants share one deterministic runtime URL and one
  // pronunciation. Generate each case-folded filename only once.
  const bySlug = new Map()
  for (const al of authoredSurfaces) {
    const slug = audioSlug(al)
    const previous = bySlug.get(slug)
    if (!previous || (previous[0] === previous[0].toUpperCase() && al[0] !== al[0].toUpperCase())) {
      bySlug.set(slug, al)
    }
  }
  const surfaces = [...bySlug.values()]
  const todo = surfaces.filter(
    (al) => (!ONLY_SURFACE || al === ONLY_SURFACE) && (
      FORCE ||
      (FORCE_CEFR && cefrVoiceBySlug.has(audioSlug(al))) ||
      !existsSync(resolve(OUT_DIR, `${audioSlug(al)}.mp3`))
    ),
  )
  console.log(`${authoredSurfaces.length} authored surfaces / ${surfaces.length} case-folded clips, ${todo.length} to generate.`)
  if (!todo.length) return

  const { defaultVoice, supported } = await availableVoices()
  for (const assigned of new Set(cefrVoiceBySlug.values())) {
    if (!supported.has(assigned)) throw new Error(`Assigned CEFR voice is unavailable on this Speech resource: ${assigned}`)
  }
  console.log(`Using default voice: ${defaultVoice}; ${new Set(cefrVoiceBySlug.values()).size} assigned CEFR voices`)

  let done = 0
  for (const al of todo) {
    const file = resolve(OUT_DIR, `${audioSlug(al)}.mp3`)
    let attempt = 0
    for (;;) {
      try {
        const voice = cefrVoiceBySlug.get(audioSlug(al)) || defaultVoice
        const buf = await synth(al, voice)
        writeFileSync(file, buf)
        done++
        console.log(`  [${done}/${todo.length}] ${al} -> ${audioSlug(al)}.mp3`)
        break
      } catch (e) {
        attempt++
        if (attempt >= 4) {
          console.error(`  FAILED ${al}: ${e.message}`)
          break
        }
        await sleep(1000 * attempt) // back off (handles 429 throttling)
      }
    }
    await sleep(120) // be gentle with the free-tier rate limit
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
