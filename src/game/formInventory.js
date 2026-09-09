import { DICT, HEART_LEVELS, ITEMS, STORY } from './content.js'
import { TRAIN_WORD_FORM_POLICY } from './trainingProgression.js'
import { SEASONS, WEATHER_TYPES } from './environment.js'
import {
  ENVIRONMENT_DIMENSIONS,
  ENVIRONMENT_NARRATION_SETTINGS,
  environmentStoryLine,
  purseStoryLine,
} from './storyContext.js'
import { WORD_CLASS, wordClassOf } from './wordClassPolicy.js'

const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
const lineOf = (entry) => Array.isArray(entry) ? entry : entry?.line || []

// A non-noun `wf(id, surface, gloss)` in playable content is an explicit,
// reviewed surface declaration for that dictionary sense. Harvesting those
// declarations here avoids a second hand-copied table drifting from the story.
// Nouns with complete review are deliberately different: their role-labelled
// paradigms come only from nounForms.js through DICT[id].forms. A declared noun
// still in the explicit paradigm backlog may expose attested surfaces through
// the generic changing-word drill, but never an invented noun-role question.
const usage = new Map()
const addToken = (token) => {
  if (!token?.id || !DICT[token.id]) return
  const bySurface = usage.get(token.id) || new Map()
  const key = lower(token.al)
  const record = bySurface.get(key) || { al: token.al, count: 0, glossCounts: new Map() }
  record.count += 1
  if (token.en) record.glossCounts.set(token.en, (record.glossCounts.get(token.en) || 0) + 1)
  bySurface.set(key, record)
  usage.set(token.id, bySurface)
}

for (const node of Object.values(STORY)) {
  for (const entry of node.text) for (const token of lineOf(entry)) addToken(token)
  for (const option of node.options) for (const token of option.text) addToken(token)
}
for (const item of Object.values(ITEMS)) {
  for (const action of Object.values(item)) {
    if (Array.isArray(action?.phrase)) for (const token of action.phrase) addToken(token)
  }
}
for (const level of Object.values(HEART_LEVELS)) {
  for (const token of lineOf(level.line)) addToken(token)
  for (const token of lineOf(level.heal?.phrase)) addToken(token)
}

// Generated story context is playable Albanian too. Enumerate its finite
// semantic state space rather than relying on one representative sentence:
// every civil hour, season, weather, narration setting and authored-dimension
// omission can select a different token surface. This module deliberately
// works from the canonical public state domains so additions cannot be missed
// by a hand-maintained phrase list.
const omissionSets = Array.from({ length: 2 ** ENVIRONMENT_DIMENSIONS.length }, (_, mask) =>
  ENVIRONMENT_DIMENSIONS.filter((_, index) => mask & (1 << index)))
for (const setting of ENVIRONMENT_NARRATION_SETTINGS) {
  for (const season of SEASONS) {
    for (const weather of WEATHER_TYPES) {
      for (let clock = 0; clock < 24; clock++) {
        for (const omit of omissionSets) {
          for (const token of lineOf(environmentStoryLine(
            { clock, season, weather },
            { setting, omit },
          ))) addToken(token)
        }
      }
    }
  }
}
// A positive safe-integer balance changes only the punctuation token holding
// its digits; the sense-pinned Albanian tokens are invariant. The boundary
// value also protects that assumption from future changes to the generator.
for (const balance of [1, Number.MAX_SAFE_INTEGER]) {
  for (const token of lineOf(purseStoryLine(balance))) addToken(token)
}

const mostFrequentGloss = (record, fallback) => {
  let answer = fallback
  let best = -1
  for (const [gloss, count] of record?.glossCounts || []) {
    if (count > best) {
      answer = gloss
      best = count
    }
  }
  return answer
}

const inventory = {}
for (const [id, entry] of Object.entries(DICT)) {
  const used = usage.get(id) || new Map()
  const lemmaKey = lower(entry.al)
  const hasAttestedVariant = [...used.keys()].some((surface) => surface !== lemmaKey)
  const wordClass = wordClassOf(id, entry, { hasAttestedVariant })
  const rows = new Map()
  const declare = (form, source, count = 0) => {
    const key = lower(form.al)
    const current = rows.get(key)
    if (current) {
      current.count = Math.max(current.count, count)
      if (source === 'paradigm') Object.assign(current, form, { source, wordClass })
      return
    }
    rows.set(key, { ...form, source, wordClass, count })
  }

  const lemmaForm = entry.forms?.find((form) => lower(form.al) === lemmaKey)
  declare(lemmaForm || { al: entry.al, tag: 'lemma', gloss: entry.en }, lemmaForm ? 'paradigm' : 'lemma', used.get(lemmaKey)?.count || 0)
  for (const form of entry.forms || []) {
    declare(form, entry.formTrack === 'noun' ? 'paradigm' : 'dictionary', used.get(lower(form.al))?.count || 0)
  }
  const hasReviewedNounParadigm = wordClass === WORD_CLASS.NOUN && entry.formTrack === 'noun'
  if (!hasReviewedNounParadigm) {
    for (const [surface, record] of used) {
      if (surface === lemmaKey) continue
      declare({
        al: record.al,
        tag: 'attestedSurface',
        gloss: mostFrequentGloss(record, entry.en),
      }, 'playable', record.count)
    }
  }
  inventory[id] = Object.freeze([...rows.values()].map(Object.freeze))
}

export const PLAYABLE_FORM_INVENTORY = Object.freeze(inventory)

export const FORMS_UNLOCK_THRESHOLD = TRAIN_WORD_FORM_POLICY.practiceWinsRequired

// A word enters form practice once it has enough evidence and at least one
// reviewed non-lemma surface. Nouns use complete role-labelled paradigms;
// other classes use only surfaces already attested in playable content.
export const formsUnlocked = (state, id) =>
  (state.practiced?.[id] || 0) >= FORMS_UNLOCK_THRESHOLD && trainingForms(id).length >= 2

// Every reviewed surface is included by default. Frequency only orders forms
// within the same mastery layer; callers must opt into narrowing with min/cap.
export function trainingForms(id, { min = 0, cap = Infinity } = {}) {
  // A reviewed declaration may describe a surface that is valid only while
  // bound to neighbouring words (for example, the reflexive fragment in
  // `mos u shqetëso`). Keep it in the language contract so authored story
  // text remains sense-pinned, but never lift that fragment out as a
  // standalone Train answer.
  const rows = (PLAYABLE_FORM_INVENTORY[id] || []).filter((form) => form.trainable !== false)
  if (!rows.length) return []
  const lemma = lower(DICT[id].al)
  const lemmaRow = rows.find((form) => lower(form.al) === lemma)
  const variants = rows
    .filter((form) => lower(form.al) !== lemma && form.count >= min)
    .sort((a, b) => b.count - a.count)
    .slice(0, cap)
  return lemmaRow ? [lemmaRow, ...variants] : variants
}

export const formTrackForSense = (id) => {
  const forms = PLAYABLE_FORM_INVENTORY[id] || []
  const wordClass = forms[0]?.wordClass || wordClassOf(id, DICT[id])
  const hasNounRoleStep = wordClass === WORD_CLASS.NOUN && DICT[id]?.formTrack === 'noun'
  return {
    wordClass,
    hasNounRoleStep,
    coverage: hasNounRoleStep
      ? 'reviewed-paradigm'
      : wordClass === WORD_CLASS.NOUN
        ? 'noun-paradigm-backlog'
        : 'reviewed-playable-surfaces',
  }
}

export const playableFormUsage = (id) => usage.get(id) || new Map()
