import assert from 'node:assert/strict'
import { DICT } from '../src/game/dictionary.js'
import { planSenseDistractors } from '../src/game/distractorPlanning.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import {
  PRACTICE_HARD_CONTRASTS,
  PRACTICE_HARD_CONTRAST_SOURCES,
  practiceHardContrastCandidateIds,
  practiceHardContrastLink,
  practiceHardContrastReview,
  senseRequiresContextForHardContrast,
} from '../src/game/practiceHardContrasts.js'
import { sensesMayShareAnswer } from '../src/game/practiceAnswerValidity.js'

const trainableIds = Object.keys(DICT).filter(isTrainableSense)
assert.deepEqual(
  Object.keys(PRACTICE_HARD_CONTRASTS).sort(),
  [...trainableIds].sort(),
  'the combined hard-contrast authority must cover every and only trainable dictionary sense',
)
assert.deepEqual(PRACTICE_HARD_CONTRAST_SOURCES, ['a-h', 'i-p', 'q-z'])

let reviewed = 0
let contextOnly = 0
let links = 0
for (const targetId of trainableIds) {
  const row = practiceHardContrastReview(targetId)
  assert.ok(row, `${targetId}: missing normalized hard-contrast review`)
  assert.ok(PRACTICE_HARD_CONTRAST_SOURCES.includes(row.source), `${targetId}: unknown range source`)
  if (row.status === 'context-only') {
    contextOnly += 1
    assert.ok(row.reason?.length >= 40, `${targetId}: context-only reason lost during normalization`)
    assert.deepEqual(practiceHardContrastCandidateIds(targetId), [], `${targetId}: context-only target exposed bare candidates`)
    continue
  }

  reviewed += 1
  assert.equal(row.status, 'reviewed', `${targetId}: unknown normalized status`)
  assert.ok(row.contrasts.length >= 3 && row.contrasts.length <= 6, `${targetId}: normalized review lost its authored contrast range`)
  for (const contrast of row.contrasts) {
    links += 1
    assert.equal(practiceHardContrastLink(targetId, contrast.candidateId), contrast, `${targetId}/${contrast.candidateId}: link lookup is not canonical`)
    assert.ok(contrast.reason?.length >= 20, `${targetId}/${contrast.candidateId}: missing reason`)
    assert.ok(contrast.relation?.length >= 8, `${targetId}/${contrast.candidateId}: missing relation`)
    assert.equal(contrast.source, row.source, `${targetId}/${contrast.candidateId}: source provenance drift`)
    if (sensesMayShareAnswer(targetId, contrast.candidateId)) {
      assert.equal(contrast.requiresContext, true, `${targetId}/${contrast.candidateId}: answer-equivalent link lacks a context requirement`)
    }
  }
}

assert.equal(reviewed, 895)
assert.equal(contextOnly, 80)
assert.equal(links, 4210)

// Every source must influence the real planner, not merely exist as dead data.
for (const targetId of ['fshat', 'mund', 'qen']) {
  const review = practiceHardContrastReview(targetId)
  const legalHardIds = review.contrasts
    .map(({ candidateId }) => candidateId)
    .filter((candidateId) => !senseRequiresContextForHardContrast(candidateId))
    .slice(0, 3)
  assert.ok(legalHardIds.length >= 2, `${targetId}: integration fixture lacks two bare-safe hard contrasts`)
  const evidence = {
    discoveredIds: [targetId, ...legalHardIds],
    mana: Object.fromEntries(legalHardIds.map((id) => [id, 1])),
    practiced: Object.fromEntries(legalHardIds.map((id) => [id, 1])),
    wordProgress: Object.fromEntries(legalHardIds.map((id) => [id, { wins: { 'meaning-recognition': 2 } }])),
  }
  for (const difficultyBand of ['developing', 'challenge']) {
    const planned = planSenseDistractors({
      answerId: targetId,
      candidateIds: ['buke', ...legalHardIds],
      fallbackIds: [],
      count: 2,
      field: 'al',
      difficultyBand,
      rng: () => 0.25,
      ...evidence,
    })
    assert.equal(planned.complete, true, `${targetId}/${difficultyBand}: runtime planner could not use editorial links`)
    assert.ok(planned.trace.selected.every(({ relation }) => relation.type === 'editor-reviewed-hard-contrast'), `${targetId}/${difficultyBand}: broader fallback outranked an eligible editorial hard contrast`)
    assert.ok(planned.trace.selected.every(({ relation }) => relation.editorialHardContrast?.source === review.source), `${targetId}/${difficultyBand}: trace lost exact range source`)
    assert.ok(planned.trace.selected.every(({ relation }) => relation.editorialHardContrast?.reason), `${targetId}/${difficultyBand}: trace lost editorial reason`)
  }
}

const foundation = planSenseDistractors({
  answerId: 'mund',
  candidateIds: ['fshat', 'rruge'],
  fallbackIds: [],
  count: 2,
  difficultyBand: 'foundation',
  rng: () => 0.25,
})
assert.equal(foundation.complete, true)
assert.deepEqual(new Set(foundation.selectedIds), new Set(['fshat', 'rruge']), 'foundation did not prefer the clearer far reviewed choices')

const contextOnlyCandidate = planSenseDistractors({
  answerId: 'mund',
  candidateIds: ['duhet'],
  fallbackIds: [],
  count: 1,
  difficultyBand: 'challenge',
  rng: () => 0,
})
assert.ok(!contextOnlyCandidate.selectedIds.includes('duhet'), 'context-only candidate entered a bare scored choice')
assert.match(
  contextOnlyCandidate.trace.rejected.find(({ id }) => id === 'duhet').validity.rejectionReasons.join(' '),
  /candidate is context-only/,
)

const authoredContext = planSenseDistractors({
  answerId: 'dhe',
  candidateIds: ['por', 'ose'],
  fallbackIds: [],
  count: 2,
  contextual: true,
  source: 'editor-reviewed-context-pool',
  rng: () => 0,
})
assert.equal(authoredContext.complete, true, 'authored context could not safely use a context-only target')
assert.equal(authoredContext.trace.targetHardContrastReview.activeForThisQuestion, false)

console.log(`✓ combined hard-contrast runtime: ${reviewed} reviewed targets, ${contextOnly} context-only dispositions, ${links} provenanced links; developing/challenge prefer legal editorial neighbours, foundation keeps clear choices, and context-only senses never become bare distractors.`)
