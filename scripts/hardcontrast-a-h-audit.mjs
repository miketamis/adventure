import assert from 'node:assert/strict'
import { DICT } from '../src/game/dictionary.js'
import { lexicalTrainability } from '../src/game/lexicalTrainability.js'
import { sensesMayShareAnswer } from '../src/game/practiceAnswerValidity.js'
import { PRACTICE_HARD_CONTRASTS_A_H } from '../src/game/data/practiceHardContrasts/a-h.js'

const inRange = (id) => /^[a-h]/iu.test(id)
const targets = Object.keys(DICT).filter((id) => inRange(id) && lexicalTrainability(id).trainable)
const targetSet = new Set(targets)

assert.deepEqual(
  Object.keys(PRACTICE_HARD_CONTRASTS_A_H).filter((id) => targetSet.has(id)).sort(),
  [...targets].sort(),
  'A-H hard-contrast registry must cover every canonical trainable A-H dictionary sense exactly once',
)

for (const id of Object.keys(PRACTICE_HARD_CONTRASTS_A_H)) {
  assert.ok(DICT[id], `${id}: registry target is not a canonical dictionary sense`)
  assert.ok(inRange(id), `${id}: target is outside the A-H range-owned module`)
  assert.ok(lexicalTrainability(id).trainable, `${id}: non-trainable target entered hard contrasts`)
}

let reviewed = 0
let contextOnly = 0
for (const id of targets) {
  const entry = PRACTICE_HARD_CONTRASTS_A_H[id]
  assert.ok(entry, `${id}: missing disposition`)
  if (entry.status === 'context-only') {
    contextOnly += 1
    assert.ok(entry.reason?.length >= 40, `${id}: context-only disposition needs a concrete safety reason`)
    assert.equal(entry.contrasts, undefined, `${id}: context-only item must not leak bare distractors`)
    continue
  }

  reviewed += 1
  assert.equal(entry.status, 'reviewed-contrasts', `${id}: unknown disposition`)
  assert.ok(entry.contrasts.length >= 3 && entry.contrasts.length <= 6, `${id}: expected 3-6 reviewed contrasts`)
  assert.equal(new Set(entry.contrasts.map(({ id: peerId }) => peerId)).size, entry.contrasts.length, `${id}: duplicate contrast`)
  for (const contrast of entry.contrasts) {
    assert.ok(DICT[contrast.id], `${id}/${contrast.id}: contrast is not a canonical dictionary sense`)
    assert.ok(lexicalTrainability(contrast.id).trainable, `${id}/${contrast.id}: contrast is not trainable`)
    assert.notEqual(contrast.id, id, `${id}: target cannot distract itself`)
    assert.ok(contrast.relation?.length >= 10, `${id}/${contrast.id}: missing reviewed relation`)
    assert.ok(contrast.reason?.length >= 20, `${id}/${contrast.id}: missing reviewed incompatibility reason`)
    assert.equal(
      sensesMayShareAnswer(id, contrast.id),
      false,
      `${id}/${contrast.id}: pair can share a bare answer and requires context instead`,
    )
  }
}

console.log(`✓ A-H hard-contrast registry covers ${targets.length} trainable senses: ${reviewed} with 3-6 reviewed incompatible contrasts and ${contextOnly} explicit context-only dispositions.`)
