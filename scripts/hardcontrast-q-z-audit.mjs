import assert from 'node:assert/strict'
import { DICT } from '../src/game/dictionary.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import { sensesMayShareAnswer } from '../src/game/practiceAnswerValidity.js'
import { HARD_CONTRAST_REVIEWS_Q_Z } from '../src/game/data/practiceHardContrasts/q-z.js'

const inOwnedRange = (id) => /^[q-z]/iu.test(id)
const owned = Object.keys(DICT).filter((id) => inOwnedRange(id) && isTrainableSense(id))
const reviewedIds = Object.keys(HARD_CONTRAST_REVIEWS_Q_Z)

assert.deepEqual(
  [...reviewedIds].sort(),
  [...owned].sort(),
  'Q-Z hard-contrast registry must review every and only canonical trainable Q-Z dictionary sense',
)

let contrastTargets = 0
let contrastLinks = 0
let contextOnlyTargets = 0

for (const targetId of owned) {
  const row = HARD_CONTRAST_REVIEWS_Q_Z[targetId]
  assert.ok(row, `${targetId}: missing editorial disposition`)
  if (row.status === 'context-only') {
    contextOnlyTargets += 1
    assert.ok(row.reason?.length >= 60, `${targetId}: context-only disposition needs a specific safety reason`)
    assert.equal(row.contrasts, undefined, `${targetId}: context-only item must not expose bare hard distractors`)
    continue
  }

  assert.equal(row.status, 'reviewed', `${targetId}: unknown editorial disposition`)
  contrastTargets += 1
  assert.ok(row.contrasts.length >= 3 && row.contrasts.length <= 6, `${targetId}: expected 3-6 reviewed contrasts`)
  assert.equal(new Set(row.contrasts.map(({ candidateId }) => candidateId)).size, row.contrasts.length, `${targetId}: duplicate contrast`)
  for (const contrast of row.contrasts) {
    contrastLinks += 1
    assert.notEqual(contrast.candidateId, targetId, `${targetId}: target cannot distract itself`)
    assert.ok(DICT[contrast.candidateId], `${targetId}/${contrast.candidateId}: contrast is not a canonical dictionary sense`)
    assert.ok(isTrainableSense(contrast.candidateId), `${targetId}/${contrast.candidateId}: contrast is not trainable`)
    assert.ok(contrast.relation?.length >= 10, `${targetId}/${contrast.candidateId}: missing reviewed relation`)
    assert.ok(contrast.reason?.length >= 30, `${targetId}/${contrast.candidateId}: missing incompatibility reason`)
    assert.equal(
      sensesMayShareAnswer(targetId, contrast.candidateId),
      false,
      `${targetId}/${contrast.candidateId}: answer-equivalent senses require authored context instead`,
    )
  }
}

console.log(`✓ Q-Z hard distractors: ${owned.length} owned senses; ${contrastTargets} with 3-6 reviewed incompatible contrasts; ${contextOnlyTargets} explicit context-only dispositions; ${contrastLinks} reviewed links.`)
