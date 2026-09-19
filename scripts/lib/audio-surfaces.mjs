// One canonical walk for every Albanian surface that can expose the runtime
// pronunciation button. Keep generation and certification on the same input so
// newly-authored inflections cannot silently ship without audio.
import { phraseWords } from '../../src/game/phrasePractice.js'
import { albanianTextOf } from '../../src/game/language.js'
import { ALBANIAN_CONSTRUCTION_CHUNKS } from '../../src/game/formPractice.js'
import { actionTranscriptWords } from './action-audio-surfaces.mjs'
import { playableContextForSense, reviewedFormTargets } from '../../src/game/formInventory.js'
import { REVIEWED_NOUN_AGREEMENT_FRAMES } from '../../src/game/nounAgreementPractice.js'

export function collectAudioSurfaces(
  dict,
  story,
  phrases = [],
  cefrTasks = [],
  cefrPreparation = [],
  { items = {}, heartLevels = {}, additionalLanguage = [] } = {},
) {
  const surfaces = new Set()
  const add = (al) => {
    if (typeof al === 'string' && al.trim()) surfaces.add(al.trim())
  }

  // Heard-word construction speaks each selectable Albanian grapheme through
  // its own generated MP3 when the learner taps it. These clips pronounce the
  // tile only; complete words and phrases continue to use their own continuous
  // recordings and are never assembled from these sounds.
  for (const chunk of ALBANIAN_CONSTRUCTION_CHUNKS) add(chunk)

  for (const [id, entry] of Object.entries(dict)) {
    add(entry.al)
    add(entry.ctx?.al)
    add(playableContextForSense(id)?.al)
    for (const target of reviewedFormTargets(id)) add(target.context?.al)
    // Train can play every standalone reviewed form, including surfaces that
    // have not yet appeared in story prose. Bound fragments are deliberately
    // excluded because the UI never presents or plays them on their own.
    for (const form of entry.forms || []) {
      if (form.trainable !== false) add(form.al)
    }
  }
  for (const frame of REVIEWED_NOUN_AGREEMENT_FRAMES) {
    add(frame.demonstrative.phrase)
    add(frame.adjective.phrase)
    add(`${frame.demonstrative.phrase} ${frame.adjective.article} ${frame.adjective.adjective}`)
  }

  const walk = (value) => {
    if (!value || typeof value !== 'object') return
    if (typeof value.al === 'string' && !value.paren) add(value.al)
    for (const nested of Object.values(value)) {
      if (nested && typeof nested === 'object') walk(nested)
    }
  }
  walk(story)
  walk(additionalLanguage)
  // Committed actions play as one fluent utterance before the reducer changes
  // scene. Their complete surfaces therefore need their own recordings; the
  // individual token clips gathered by walk(story) cannot be stitched.
  for (const node of Object.values(story)) {
    for (const option of node.options || []) {
      const action = albanianTextOf(option.text)
      add(action)
      for (const word of actionTranscriptWords(action)) add(word)
    }
  }
  for (const item of Object.values(items)) {
    const action = albanianTextOf(item.use?.phrase)
    add(action)
    for (const word of actionTranscriptWords(action)) add(word)
  }
  for (const level of Object.values(heartLevels)) {
    const action = albanianTextOf(level.heal?.phrase)
    add(action)
    for (const word of actionTranscriptWords(action)) add(word)
  }
  for (const phrase of phrases) {
    add(phrase.al)
    for (const word of phraseWords(phrase.al)) add(word)
  }
  // Held-out listening transcripts never render before an attempt, but their
  // complete recordings are playable assessment stimuli. Keep them in the
  // same generated-asset contract as ordinary continuous phrase audio.
  for (const task of cefrTasks) {
    if (task?.mode === 'listening' && task.stimulus?.kind === 'continuous-audio') {
      add(task.stimulus.scriptSq)
    }
  }
  // Guided preparation also uses continuous utterances. These are ordinary
  // practice recordings (never held-out evidence), but they still need one
  // fluent clip rather than stitched word audio.
  const collectPreparationAudio = (value) => {
    if (!value || typeof value !== 'object') return
    if (value.channel === 'continuous-audio') add(value.transcript?.text)
    for (const child of Object.values(value)) collectPreparationAudio(child)
  }
  for (const activity of cefrPreparation) {
    collectPreparationAudio(activity)
    if (activity?.kind === 'local-audio-cycle') {
      add(activity.model?.text)
      for (const prompt of activity.prompts || []) add(prompt?.text)
    }
  }

  return [...surfaces].sort((a, b) => a.localeCompare(b, 'sq'))
}
