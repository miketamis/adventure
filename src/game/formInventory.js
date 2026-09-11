import { DICT, HEART_LEVELS, ITEMS, STORY, moneyOutcomeLinesOf } from './content.js'
import { TRAIN_WORD_FORM_POLICY } from './trainingProgression.js'
import { wordContextAlignment, wordProgressStage } from './wordProgression.js'
import { SEASONS, WEATHER_TYPES } from './environment.js'
import {
  ENVIRONMENT_DIMENSIONS,
  ENVIRONMENT_NARRATION_SETTINGS,
  environmentStoryLine,
  purseStoryLine,
} from './storyContext.js'
import { WORD_CLASS, wordClassOf } from './wordClassPolicy.js'
import { buildNounEndingRefresher, NOUN_FORM_ROLE_LABELS } from './nounEndingRefresher.js'
import { isTrainableSense, lexicalTrainability } from './lexicalTrainability.js'
import {
  PRACTICE_TARGET_KIND,
  contextualChoiceLabel,
  practiceTargetKind,
} from './practiceContrasts.js'

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
const tidyLine = (value) => value.replace(/\s+([.!?:,;])/gu, '$1').replace(/\s+/gu, ' ').trim()
const lineText = (tokens, field) => tidyLine(tokens.map((token) => token?.id ? token[field] : token?.en).join(' '))
const addToken = (token, tokens = null, tokenIndex = -1) => {
  if (!token?.id || !DICT[token.id]) return
  const bySurface = usage.get(token.id) || new Map()
  const key = lower(token.al)
  const record = bySurface.get(key) || { al: token.al, count: 0, glossCounts: new Map(), examples: [] }
  record.count += 1
  if (token.en) record.glossCounts.set(token.en, (record.glossCounts.get(token.en) || 0) + 1)
  if (Array.isArray(tokens) && tokenIndex >= 0 && record.examples.length < 4) {
    const alWords = tokens.map((part) => part?.id ? part.al : part?.en)
    const enWords = tokens.map((part) => part?.id ? part.en : part?.en)
    record.examples.push(Object.freeze({
      al: lineText(tokens, 'al'),
      en: typeof tokens.reading === 'string' && tokens.reading.trim() ? tokens.reading.trim() : lineText(tokens, 'en'),
      reviewedEnglish: typeof tokens.reading === 'string' && Boolean(tokens.reading.trim()),
      focus: token.al,
      targetTokenIndex: tokenIndex,
      alGap: tidyLine(alWords.map((part, index) => index === tokenIndex ? '__' : part).join(' ')),
      enCue: tidyLine(enWords.join(' ')),
    }))
  }
  bySurface.set(key, record)
  usage.set(token.id, bySurface)
}

const addLine = (entry) => {
  const tokens = lineOf(entry)
  tokens.forEach((token, index) => addToken(token, tokens, index))
}

for (const node of Object.values(STORY)) {
  for (const entry of node.text) addLine(entry)
  for (const option of node.options) {
    addLine(option.text)
    for (const outcome of moneyOutcomeLinesOf(option)) addLine(outcome)
  }
}
for (const item of Object.values(ITEMS)) {
  for (const action of Object.values(item)) {
    if (Array.isArray(action?.phrase)) addLine(action.phrase)
  }
}
for (const level of Object.values(HEART_LEVELS)) {
  addLine(level.line)
  addLine(level.heal?.phrase)
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
  isTrainableSense(id) &&
  (state.practiced?.[id] || 0) >= FORMS_UNLOCK_THRESHOLD &&
  wordProgressStage(state.wordProgress?.[id]) >= TRAIN_WORD_FORM_POLICY.lexicalStageRequired &&
  trainingForms(id).length >= 2

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

export function playableContextForSense(id, surface = DICT[id]?.al) {
  if (!DICT[id] || typeof surface !== 'string') return null
  const harvested = playableFormUsage(id).get(lower(surface))?.examples?.[0]
  if (harvested) return harvested
  const authored = DICT[id].ctx
  if (!authored?.al || !authored?.en || !authored?.focus) return null
  const words = authored.al.split(/\s+/u)
  const targetTokenIndex = words.findIndex((word) => lower(word.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')) === lower(authored.focus))
  if (targetTokenIndex < 0) return null
  return Object.freeze({
    al: authored.al,
    en: authored.retrieval?.reviewed ? authored.retrieval.en : authored.en.replace('__', DICT[id].en),
    focus: authored.focus,
    targetTokenIndex,
    alGap: words.map((word, index) => index === targetTokenIndex ? '__' : word).join(' '),
  })
}

const genericRoleLabel = (form, wordClass) => {
  if (NOUN_FORM_ROLE_LABELS[form.tag]) return NOUN_FORM_ROLE_LABELS[form.tag]
  const cleaned = String(form.tag || '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').trim()
  if (cleaned && cleaned !== 'attested Surface' && cleaned !== 'lemma') return cleaned.toLocaleLowerCase('en')
  if (wordClass === WORD_CLASS.VERB) return 'reviewed verb form in this sentence'
  if (wordClass === WORD_CLASS.ADJECTIVE) return 'reviewed describing form in this sentence'
  if (wordClass === WORD_CLASS.PRONOUN) return 'reviewed pronoun form in this sentence'
  return 'reviewed form in this sentence'
}

// Preserve exact form+role rows for progression. `trainingForms` intentionally
// deduplicates standalone spellings, but a syncretic noun spelling can express
// several grammatical jobs and must never be presented as a naked "what form?"
// ladder. Each target therefore owns a role-bearing natural context.
export function reviewedFormTargets(id) {
  if (!DICT[id] || !isTrainableSense(id)) return []
  const track = formTrackForSense(id)
  // Playable `wf(...)` occurrences prove that a spelling exists, but do not by
  // themselves review its grammatical analysis. The form lane therefore uses
  // complete noun paradigms or explicit dictionary form declarations only.
  // Everything else takes the non-inflecting path until editorial review adds
  // exact role metadata.
  const source = DICT[id].formTrack === 'noun'
    ? (DICT[id].forms || [])
    : (DICT[id].forms || []).filter((form) => form.tag && form.tag !== 'lemma')
  const seen = new Set()
  const targets = source.flatMap((form) => {
    if (form.trainable === false) return []
    const surface = form.al
    const role = form.tag || 'attestedSurface'
    const key = `${lower(surface)}::${role}`
    if (seen.has(key)) return []
    seen.add(key)
    const guide = track.hasNounRoleStep ? buildNounEndingRefresher(id, surface, form.gloss) : null
    const harvested = playableFormUsage(id).get(lower(surface))?.examples
      ?.find((candidate) => candidate.reviewedEnglish) || null
    const example = guide?.target?.example || harvested
    if (!example?.al || !example?.en) return []
    const targetIndex = Number.isInteger(example.targetTokenIndex)
      ? example.targetTokenIndex
      : example.al.split(/\s+/u).findIndex((word) => lower(word.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')) === lower(surface))
    if (targetIndex < 0) return []
    const words = example.al.split(/\s+/u)
    const rawTargetWord = words[targetIndex] || surface
    const surfaceOffset = lower(rawTargetWord).indexOf(lower(surface))
    const gapWord = surfaceOffset >= 0
      ? `${rawTargetWord.slice(0, surfaceOffset)}__${rawTargetWord.slice(surfaceOffset + surface.length)}`
      : '__'
    return [Object.freeze({
      key,
      id,
      surface,
      role,
      roleLabel: guide?.target?.role || genericRoleLabel(form, track.wordClass),
      learnerMeaning: guide?.target?.learnerMeaning || form.gloss || DICT[id].en,
      gloss: form.gloss || DICT[id].en,
      wordClass: track.wordClass,
      coverage: track.coverage,
      context: Object.freeze({
        al: example.al,
        en: example.en,
        provenance: guide ? 'reviewed-noun-template' : 'reviewed-line-reading',
        alGap: example.alGap || words.map((word, index) => index === targetIndex ? gapWord : word).join(' '),
        focus: surface,
        targetTokenIndex: targetIndex,
      }),
    })]
  })
  const distinctSurfaces = new Set(targets.map(({ surface }) => lower(surface))).size
  const distinctContrasts = new Set(targets.map((target) =>
    target.wordClass === WORD_CLASS.NOUN ? target.roleLabel : target.learnerMeaning,
  )).size
  return distinctSurfaces >= 2 && distinctContrasts >= 2 ? targets : []
}

export const hasReviewedFormLane = (id) => reviewedFormTargets(id).length > 0

export const REVIEWED_CONTEXT_QUALITY = 'sense-discriminating'

const normalizedSenseSurface = (id) => DICT[id]?.al ? lower(DICT[id].al) : null
const siblingSenseIds = (id) => {
  const surface = normalizedSenseSurface(id)
  if (!surface) return []
  return Object.keys(DICT).filter((candidate) => candidate !== id && normalizedSenseSurface(candidate) === surface)
}

// Context-dependent and same-surface senses fail closed. Until an editor has
// supplied one natural, aligned situation and explicitly accounted for every
// sibling sense, Train must not award bare-word evidence that cannot identify
// which meaning the learner actually knew.
export function reviewedContextEligibilityForSense(id) {
  const entry = DICT[id]
  const siblings = siblingSenseIds(id)
  const requiresReviewedContext = Boolean(entry?.ctx) || siblings.length > 0 ||
    practiceTargetKind(id) === PRACTICE_TARGET_KIND.function
  if (!entry) return Object.freeze({ eligible: false, requiresReviewedContext, siblingIds: siblings, gaps: ['missing dictionary sense'] })
  if (!requiresReviewedContext) return Object.freeze({ eligible: true, requiresReviewedContext: false, siblingIds: [], gaps: [] })

  const context = entry.ctx
  const alignment = wordContextAlignment(context, entry.al)
  const declaredContrasts = new Set(Array.isArray(context?.contrastIds) ? context.contrastIds : [])
  const missingSiblingIds = siblings.filter((siblingId) => !declaredContrasts.has(siblingId))
  const recognitionDistractors = (context?.distractorIds || [])
    .filter((candidate, index, ids) => DICT[candidate] && candidate !== id && ids.indexOf(candidate) === index)
  const missingSiblingOptions = siblings.filter((siblingId) => !recognitionDistractors.includes(siblingId))
  const recognitionLabel = (candidate) => context?.distractorLabels?.al2en?.[candidate] ||
    contextualChoiceLabel(candidate, DICT[candidate]?.enAll || DICT[candidate]?.en)
  const recognitionLabels = [contextualChoiceLabel(id, entry.enAll || entry.en), ...recognitionDistractors.map(recognitionLabel)]
  const retrievalDistractors = (context?.retrieval?.distractorIds || [])
    .filter((candidate, index, ids) => DICT[candidate] && candidate !== id && ids.indexOf(candidate) === index)
  const distinctRetrievalSurfaces = new Set(retrievalDistractors.map(normalizedSenseSurface))
  distinctRetrievalSurfaces.delete(normalizedSenseSurface(id))
  const gaps = []
  if (context?.quality !== REVIEWED_CONTEXT_QUALITY) gaps.push(`ctx.quality must be “${REVIEWED_CONTEXT_QUALITY}”`)
  if (!alignment.usable || !alignment.unmarkedSafe) gaps.push(`context alignment: ${alignment.reason || 'target is not uniquely aligned'}`)
  if (!alignment.mirrorSafe) gaps.push('reviewed full-English retrieval cue is missing or misaligned')
  if (missingSiblingIds.length) gaps.push(`unreviewed same-surface contrasts: ${missingSiblingIds.join(', ')}`)
  if (missingSiblingOptions.length) gaps.push(`same-surface senses absent from recognition options: ${missingSiblingOptions.join(', ')}`)
  if (recognitionDistractors.length < 3) gaps.push('context recognition needs three reviewed distractor senses')
  if (new Set(recognitionLabels).size !== recognitionLabels.length) gaps.push('context recognition labels are not distinct')
  if (distinctRetrievalSurfaces.size < 3) gaps.push('controlled retrieval needs three distinct Albanian distractor surfaces')
  return Object.freeze({
    eligible: gaps.length === 0,
    requiresReviewedContext,
    siblingIds: Object.freeze(siblings),
    declaredContrastIds: Object.freeze([...declaredContrasts]),
    missingSiblingIds: Object.freeze(missingSiblingIds),
    recognitionDistractorIds: Object.freeze(recognitionDistractors),
    retrievalDistractorIds: Object.freeze(retrievalDistractors),
    alignment,
    gaps: Object.freeze(gaps),
  })
}

// One canonical option bundle for every consumer of the lexical state machine.
// This prevents Train, reducers and debug panels from disagreeing about a
// sense's lemma context, exact reviewed form lane or name trainability.
export const wordProgressionOptionsForSense = (id) => {
  const lexical = lexicalTrainability(id)
  const contextEligibility = reviewedContextEligibilityForSense(id)
  const trainability = lexical.trainable && !contextEligibility.eligible
    ? Object.freeze({
        ...lexical,
        trainable: false,
        kind: 'context-review-required',
        reason: `Context review required before this sense can enter Train: ${contextEligibility.gaps.join('; ')}`,
      })
    : lexical
  return {
    context: contextEligibility.eligible && contextEligibility.requiresReviewedContext ? DICT[id].ctx : null,
    contextEligibility,
    answerSurface: DICT[id]?.al || null,
    reviewedForms: reviewedFormTargets(id),
    trainability,
  }
}
