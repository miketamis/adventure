// Committed story-action audio contract. Playback belongs to the reducer's
// accepted-action boundary, not to optimistic button clicks: stale, locked and
// rejected actions must stay silent, while each accepted action exposes one
// complete Albanian utterance to the app.
import assert from 'node:assert/strict'
import { HEART_LEVELS, ITEMS, STORY } from '../src/game/content.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
  saveState,
} from '../src/game/gameState.js'
import { playActionPhrase, setMuted } from '../src/game/audio.js'
import { storyConfuserConsequence } from '../src/game/consequenceBuilders.js'
import { optionEnglishReadingOf } from '../src/game/data/readings/reviewedOptionReadings.js'
import fs from 'node:fs'

const checks = []
async function check(name, test) {
  try {
    const detail = await test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}${detail ? ` (${detail})` : ''}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}: ${error.message}`)
  }
}

const grant = (state, line) => reducer(state, {
  type: 'DEBUG_GRANT',
  ids: phraseSenses(line),
})

await check('the app keeps the source scene inert until karaoke playback settles', () => {
  const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const karaoke = fs.readFileSync(new URL('../src/components/ActionKaraoke.jsx', import.meta.url), 'utf8')
  const previewAt = app.indexOf('const preview = reducer(current, action)')
  const mountAt = app.indexOf('<ActionKaraoke action={actionTransition}')
  assert.ok(previewAt >= 0 && mountAt > previewAt, 'accepted action is not previewed before karaoke mounts')
  assert.match(app, /const finishActionTransition = useCallback\([\s\S]*?baseDispatch\(transition\.action\)/)
  assert.match(app, /confirmReset \|\| actionTransition/)
  assert.match(app, /inert=\{blockingOverlay \? '' : undefined\}/)
  assert.match(app, /<ActionKaraoke action=\{actionTransition\} onComplete=\{finishActionTransition\}/)
  assert.match(karaoke, /playActionPhrase\(action\.al/)
  assert.match(karaoke, /\.then\(finish, finish\)/)
  assert.match(karaoke, /--karaoke-progress/)
  assert.match(karaoke, /lang="sq"/)
})

await check('a committed story choice emits its exact complete Albanian action once', () => {
  const option = STORY.start.options.find((candidate) => !candidate.confuser)
  const ready = grant(newRun(), option.text)
  const chosen = reducer(ready, {
    type: 'CHOOSE', option, fromNodeId: ready.nodeId, fromTurn: ready.turn,
  })
  assert.deepEqual(chosen.actionSpeech, {
    id: 1,
    al: albanianTextOf(option.text),
  })
  const stale = reducer(chosen, {
    type: 'CHOOSE', option, fromNodeId: ready.nodeId, fromTurn: ready.turn,
  })
  assert.strictEqual(stale, chosen)
})

await check('story restart preserves event identity for the next spoken action', () => {
  const option = STORY.start.options.find((candidate) => !candidate.confuser)
  const firstReady = grant(newRun(), option.text)
  const first = reducer(firstReady, {
    type: 'CHOOSE', option, fromNodeId: firstReady.nodeId, fromTurn: firstReady.turn,
  })
  assert.equal(first.actionSpeech.id, 1)
  const restarted = reducer(first, { type: 'RESET' })
  assert.equal(restarted.actionSpeech, null)
  assert.equal(restarted.actionSpeechSequence, 1)
  const secondReady = grant(restarted, option.text)
  const second = reducer(secondReady, {
    type: 'CHOOSE', option, fromNodeId: secondReady.nodeId, fromTurn: secondReady.turn,
  })
  assert.equal(second.actionSpeech.id, 2)
})

await check('locked choices and preview requests emit no action speech', () => {
  const option = STORY.start.options.find((candidate) => !candidate.confuser)
  const fresh = newRun()
  assert.strictEqual(reducer(fresh, {
    type: 'CHOOSE', option, fromNodeId: fresh.nodeId, fromTurn: fresh.turn,
  }), fresh)
  const embody = Object.values(STORY).flatMap((node) => node.options || [])
    .find((candidate) => candidate.become)
  if (embody) {
    const owner = Object.values(STORY).find((node) => node.options?.includes(embody))
    const ownerState = grant({ ...fresh, nodeId: owner.id }, embody.text)
    const preview = reducer(ownerState, {
      type: 'REQUEST_EMBODIMENT', optionIndex: owner.options.indexOf(embody),
    })
    assert.equal(preview.actionSpeech, null)
  }
})

await check('item, healing and committed distractor actions use the same boundary', () => {
  let bread = { ...newRun(), hearts: 2, inventory: { buke: 1 } }
  bread = grant(bread, ITEMS.buke.use.phrase)
  bread = reducer(bread, { type: 'USE_ITEM', item: ITEMS.buke, expectedCount: 1 })
  assert.equal(bread.actionSpeech.al, albanianTextOf(ITEMS.buke.use.phrase))

  let healed = { ...newRun(), hearts: 2 }
  healed = grant(healed, [...HEART_LEVELS[2].line, ...HEART_LEVELS[2].heal.phrase])
  healed = reducer(healed, { type: 'HEAL', expectedHearts: 2 })
  assert.equal(healed.actionSpeech.al, albanianTextOf(HEART_LEVELS[2].heal.phrase))

  const option = STORY.start.options.find((candidate) => candidate.confuser)
  let confused = grant(newRun(), option.text)
  confused = reducer(confused, {
    type: 'CONFUSE',
    expectedHearts: confused.hearts,
    actionText: option.text,
    consequence: storyConfuserConsequence({
      nodeId: confused.nodeId,
      turn: confused.turn,
      key: 'audit-confuser',
      tokens: option.text,
      english: optionEnglishReadingOf(option.text),
    }),
  })
  assert.equal(confused.actionSpeech.al, albanianTextOf(option.text))
  assert.ok(confused.pendingHeartConsequence, 'heart consequence displaced action speech')

  const damaging = STORY.maroZogu.options.find((candidate) => (candidate.hearts || 0) < 0)
  let danger = grant({ ...newRun(), nodeId: 'maroZogu' }, damaging.text)
  danger = reducer(danger, {
    type: 'CHOOSE', option: damaging,
    fromNodeId: danger.nodeId, fromTurn: danger.turn,
  })
  assert.ok(danger.pendingHeartConsequence)
  assert.equal(danger.actionSpeech.al, albanianTextOf(damaging.text))
})

await check('one-shot action speech is omitted from saves and dropped on reload', () => {
  const originalStorage = globalThis.localStorage
  let saved = null
  globalThis.localStorage = { setItem: (_key, value) => { saved = value } }
  try {
    saveState({ ...newRun(), actionSpeechSequence: 7, actionSpeech: { id: 7, al: 'shko në fshat' } })
    const parsed = JSON.parse(saved)
    assert.equal('actionSpeech' in parsed, false)
    assert.equal(parsed.actionSpeechSequence, 7)
    const restored = normalizeSavedState({
      ...parsed,
      actionSpeech: { id: 7, al: 'must not replay' },
    }, newRun())
    assert.equal(restored.actionSpeech, null)
    assert.equal(restored.actionSpeechSequence, 7)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
})

await check('missing MP3 stays silent without browser speech synthesis and mute stays silent', async () => {
  const originalAudio = globalThis.Audio
  const originalSynth = globalThis.speechSynthesis
  const utterances = []
  class MissingRecording {
    pause() {}
    play() {
      queueMicrotask(() => this.onerror?.())
      return Promise.resolve()
    }
  }
  globalThis.Audio = MissingRecording
  globalThis.speechSynthesis = {
    cancel() {},
    speak(utterance) {
      utterances.push(utterance)
    },
  }
  try {
    setMuted(false)
    assert.equal(await playActionPhrase('po shkoj në fshat.'), false)
    assert.equal(utterances.length, 0)
    setMuted(true)
    assert.equal(await playActionPhrase('kjo nuk duhet të dëgjohet'), false)
    assert.equal(utterances.length, 0)
  } finally {
    setMuted(false)
    if (originalAudio === undefined) delete globalThis.Audio
    else globalThis.Audio = originalAudio
    if (originalSynth === undefined) delete globalThis.speechSynthesis
    else globalThis.speechSynthesis = originalSynth
  }
})

const failed = checks.filter((result) => !result.ok)
if (failed.length) {
  console.error(`\n${failed.length} committed-action audio contract(s) failed.`)
  process.exit(1)
}
console.log(`\nCommitted-action audio audit passed (${checks.length} contracts).`)
