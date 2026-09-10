import { DICT } from './content.js'
import { EVERYDAY_CORE_SENSE_SET } from './everydayAlbanian.js'
import {
  containsExcludedPhraseWord,
  shuffleWith,
} from './phrasePractice.js'
import {
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_QUESTION_MIX_POLICY,
} from './trainingProgression.js'
import {
  normalizeWordProgress,
  wordProgressPlan,
} from './wordProgression.js'

const DIRECTION = Object.freeze({
  al2en: { field: 'en', promptField: 'al' },
  en2al: { field: 'al', promptField: 'en' },
})

const senseText = (id, field) => field === 'en'
  ? DICT[id].enAll ?? DICT[id].en
  : DICT[id][field]

const siblingsOf = (id) => Object.keys(DICT).filter(
  (candidate) => candidate !== id && DICT[candidate].al === DICT[id].al,
)

const weightedPick = (entries, mana, rng) => {
  const weights = entries.map(({ id, plan }) => {
    const held = mana[id] || 0
    const need = held === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (held + 1)
    const practical = EVERYDAY_CORE_SENSE_SET.has(id)
      ? TRAIN_QUESTION_MIX_POLICY.practicalWordWeight
      : 1
    // Within the due pool, earlier lexical stages stay slightly ahead of
    // retention work without starving an older word.
    const foundation = 1 + Math.max(0, 3 - plan.baseStage) * 0.3
    return need * practical * foundation
  })
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let roll = rng() * total
  for (let index = 0; index < entries.length; index++) {
    roll -= weights[index]
    if (roll <= 0) return entries[index]
  }
  return entries.at(-1)
}

const distractorIds = (
  answerId,
  candidateIds,
  field,
  promptField,
  count,
  excludeWords,
  rng,
) => {
  const localFirst = candidateIds.length > count
    ? candidateIds
    : [...candidateIds, ...Object.keys(DICT)]
  const distractors = []
  const usedText = new Set([senseText(answerId, field)])
  for (const id of shuffleWith(localFirst, rng)) {
    if (id === answerId || distractors.includes(id)) continue
    if (containsExcludedPhraseWord(DICT[id].al, excludeWords)) continue
    // A second option with the same prompt or answer text would create two
    // defensible answers even if the dictionary stores distinct senses.
    if (DICT[id][promptField] === DICT[answerId][promptField]) continue
    const text = senseText(id, field)
    if (usedText.has(text)) continue
    usedText.add(text)
    distractors.push(id)
    if (distractors.length === count) break
  }
  return distractors
}

function buildContextQuestion(answerId, candidateIds, plan, excludeWords, rng) {
  const { field, promptField } = DIRECTION[plan.direction]
  const count = plan.definition.variant.distractors
  const preferred = [...siblingsOf(answerId), ...candidateIds, ...Object.keys(DICT)]
  const distractors = distractorIds(
    answerId,
    preferred,
    field,
    promptField,
    count,
    excludeWords,
    rng,
  )
  return {
    kind: TRAIN_EXERCISE_FAMILIES.wordContext.kind,
    answerId,
    field,
    ctx: DICT[answerId].ctx,
    dir: plan.direction,
    mode: plan.mode,
    tier: plan.tier,
    wordStageId: plan.definition.id,
    difficultyLabel: plan.difficultyLabel,
    remediation: plan.remediation,
    options: shuffleWith([answerId, ...distractors], rng),
    lexicalSurfaces: [DICT[answerId].ctx.al],
  }
}

let questionSequence = 0

export function wordHasNoEvidence(value) {
  const progress = normalizeWordProgress(value)
  return Object.keys(progress.wins).length === 0 && progress.strictWins === 0 && !progress.remediation
}

export function buildWordQuestion({
  discoveredIds,
  mana = {},
  wordProgress = {},
  currentRound = 0,
  excludeWords = [],
  rng = Math.random,
} = {}) {
  const due = (discoveredIds || []).flatMap((id) => {
    if (!DICT[id]) return []
    const surface = DICT[id].ctx?.al || DICT[id].al
    if (containsExcludedPhraseWord(surface, excludeWords)) return []
    const plan = wordProgressPlan(wordProgress[id], currentRound)
    return plan.due ? [{ id, plan }] : []
  })
  if (!due.length) return null

  const { id: answerId, plan } = weightedPick(due, mana, rng)
  const questionKey = `${answerId}:word:${plan.tier}:${plan.mode}:${questionSequence++}`
  if (plan.mode === 'type') {
    return {
      kind: TRAIN_EXERCISE_FAMILIES.wordSpelling.kind,
      questionKey,
      answerId,
      dir: plan.direction,
      mode: plan.mode,
      tier: plan.tier,
      wordStageId: plan.definition.id,
      difficultyLabel: plan.difficultyLabel,
      remediation: plan.remediation,
      answerTolerance: plan.answerTolerance,
      typingCue: senseText(answerId, 'en'),
      typingAnswer: DICT[answerId].al,
      lexicalSurfaces: [DICT[answerId].al],
    }
  }

  const { field, promptField } = DIRECTION[plan.direction]
  // Albanian-to-English homonyms need their authored blanked context even at
  // the entry tier. The context disambiguates the sense without printing a
  // fluent translation or changing the stage's evidence claim.
  if (plan.direction === 'al2en' && DICT[answerId].ctx) {
    return {
      ...buildContextQuestion(
        answerId,
        due.map(({ id }) => id),
        plan,
        excludeWords,
        rng,
      ),
      questionKey,
    }
  }

  const distractors = distractorIds(
    answerId,
    due.map(({ id }) => id),
    field,
    promptField,
    plan.definition.variant.distractors,
    excludeWords,
    rng,
  )
  return {
    kind: TRAIN_EXERCISE_FAMILIES.wordMeaning.kind,
    questionKey,
    answerId,
    dir: plan.direction,
    mode: plan.mode,
    tier: plan.tier,
    wordStageId: plan.definition.id,
    difficultyLabel: plan.difficultyLabel,
    remediation: plan.remediation,
    field,
    promptText: senseText(answerId, promptField),
    options: shuffleWith([answerId, ...distractors], rng),
    lexicalSurfaces: [DICT[answerId].al],
  }
}
