import assert from 'node:assert/strict'
import { DICT } from '../src/game/dictionary.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import { sensesMayShareAnswer } from '../src/game/practiceAnswerValidity.js'
import { HARD_CONTRAST_REVIEWS_I_P } from '../src/game/data/practiceHardContrasts/i-p.js'

const owned = Object.keys(DICT).filter((id) => /^[i-p]/i.test(id) && isTrainableSense(id))
const ownedSet = new Set(owned)
const reviewed = Object.keys(HARD_CONTRAST_REVIEWS_I_P)

assert.deepEqual(
  [...reviewed].sort(),
  [...owned].sort(),
  'I-P hard-contrast registry must review every and only owned trainable dictionary sense',
)

let contrastTargets = 0
let contrastLinks = 0
let notApplicable = 0

for (const targetId of owned) {
  const row = HARD_CONTRAST_REVIEWS_I_P[targetId]
  assert.ok(row, `${targetId}: missing review`)
  if (row.status === 'not-applicable') {
    notApplicable += 1
    assert.ok(row.reason?.length >= 40, `${targetId}: N/A disposition needs a specific safety reason`)
    continue
  }
  assert.equal(row.status, 'reviewed', `${targetId}: unknown review status`)
  contrastTargets += 1
  assert.ok(row.contrasts.length >= 3 && row.contrasts.length <= 6, `${targetId}: expected 3-6 contrasts`)
  assert.equal(new Set(row.contrasts.map(({ candidateId }) => candidateId)).size, row.contrasts.length, `${targetId}: duplicate contrast`)
  for (const contrast of row.contrasts) {
    contrastLinks += 1
    assert.notEqual(contrast.candidateId, targetId, `${targetId}: self contrast`)
    assert.ok(DICT[contrast.candidateId], `${targetId}: missing contrast id ${contrast.candidateId}`)
    assert.ok(isTrainableSense(contrast.candidateId), `${targetId}: non-trainable contrast ${contrast.candidateId}`)
    assert.ok(contrast.relation?.length >= 8, `${targetId}/${contrast.candidateId}: missing relation metadata`)
    assert.ok(contrast.reason?.length >= 30, `${targetId}/${contrast.candidateId}: missing editorial reason`)
    if (sensesMayShareAnswer(targetId, contrast.candidateId)) {
      assert.equal(
        contrast.requiresContext,
        true,
        `${targetId}/${contrast.candidateId}: answer-equivalent senses require an authored disambiguating context`,
      )
    }
  }
}

assert.equal(ownedSet.size, reviewed.length)
console.log(`✓ I-P hard distractors: ${owned.length} owned senses; ${contrastTargets} with reviewed contrasts; ${notApplicable} explicit safe N/A; ${contrastLinks} reviewed links.`)
