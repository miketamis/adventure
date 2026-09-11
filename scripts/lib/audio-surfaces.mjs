// One canonical walk for every Albanian surface that can expose the runtime
// pronunciation button. Keep generation and certification on the same input so
// newly-authored inflections cannot silently ship without audio.
import { phraseWords } from '../../src/game/phrasePractice.js'

export function collectAudioSurfaces(dict, story, phrases = [], cefrTasks = [], cefrPreparation = []) {
  const surfaces = new Set()
  const add = (al) => {
    if (typeof al === 'string' && al.trim()) surfaces.add(al.trim())
  }

  for (const entry of Object.values(dict)) {
    add(entry.al)
    if (entry.ctx?.audio === true) add(entry.ctx.al)
    // Train can play every standalone reviewed form, including surfaces that
    // have not yet appeared in story prose. Bound fragments are deliberately
    // excluded because the UI never presents or plays them on their own.
    for (const form of entry.forms || []) {
      if (form.trainable !== false) add(form.al)
    }
  }

  const walk = (value) => {
    if (!value || typeof value !== 'object') return
    if (typeof value.al === 'string' && !value.paren) add(value.al)
    for (const nested of Object.values(value)) {
      if (nested && typeof nested === 'object') walk(nested)
    }
  }
  walk(story)
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
