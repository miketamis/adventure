// Proves that every reviewed noun surface is reachable in Train and that the
// scheduler exhausts an unseen layer before repeating a mastered form.
import assert from 'node:assert/strict'
import { DICT, frequentForms } from '../src/game/content.js'
import { formPracticeKey, pickLeastPracticedForm } from '../src/game/formProgression.js'
import { newRun, reducer } from '../src/game/gameState.js'

let paradigms = 0
let drillableForms = 0

for (const [id, entry] of Object.entries(DICT)) {
  if (entry.forms?.length && entry.formTrack !== 'noun') {
    assert.deepEqual(frequentForms(id), [], `${id}: a non-noun surface table leaked into noun practice`)
    continue
  }
  if (entry.formTrack !== 'noun') continue
  assert.ok(entry.forms?.length, `${id}: noun form track has no paradigm`)
  paradigms += 1

  const drillPool = frequentForms(id)
  // Syncretic roles can share one surface (for example singular and plural
  // indefinite *rrugë*). A context-free spelling prompt cannot distinguish
  // those jobs, so Train exposes the surface once while the role refresher
  // retains both rows.
  const uniqueReviewedSurfaces = [...new Map(entry.forms.map((form) => [
    form.al.normalize('NFC').toLocaleLowerCase('sq'),
    form,
  ])).values()]
  assert.deepEqual(
    drillPool.map((form) => form.al.normalize('NFC').toLocaleLowerCase('sq')).sort(),
    uniqueReviewedSurfaces.map((form) => form.al.normalize('NFC').toLocaleLowerCase('sq')).sort(),
    `${id}: Train silently omits a reviewed dictionary form`,
  )

  const lemma = entry.al.toLocaleLowerCase('sq')
  const targets = drillPool.filter((form) => form.al.toLocaleLowerCase('sq') !== lemma)
  const mastery = {}
  const firstCycle = []
  for (let index = 0; index < targets.length; index += 1) {
    const selected = pickLeastPracticedForm(targets, id, mastery, () => 0)
    assert.ok(selected, `${id}: scheduler returned no target`)
    assert.ok(!firstCycle.includes(selected.al), `${id}: ${selected.al} repeated before every reviewed form appeared`)
    firstCycle.push(selected.al)
    mastery[formPracticeKey(id, selected.al)] = 1
  }
  assert.equal(new Set(firstCycle).size, targets.length, `${id}: first form cycle is incomplete`)
  drillableForms += targets.length
}

// Reducer-side validation prevents a forged or stale UI event from creating
// mastery for a surface that is not in that exact word's reviewed paradigm.
const sample = Object.entries(DICT).find(([, entry]) => entry.forms?.some((form) =>
  form.al.toLocaleLowerCase('sq') !== entry.al.toLocaleLowerCase('sq'),
))
assert.ok(sample, 'no inflected noun is available for the reducer audit')
const [sampleId, sampleEntry] = sample
const sampleForm = sampleEntry.forms.find((form) =>
  form.al.toLocaleLowerCase('sq') !== sampleEntry.al.toLocaleLowerCase('sq'),
)
const ready = { ...newRun(), discovered: { [sampleId]: true } }
const correct = reducer(ready, {
  type: 'PRACTICE_FORM_CORRECT',
  id: sampleId,
  formSurface: sampleForm.al,
})
assert.equal(correct.formPracticed[formPracticeKey(sampleId, sampleForm.al)], 1)
const forged = reducer(ready, {
  type: 'PRACTICE_FORM_CORRECT',
  id: sampleId,
  formSurface: '__not_a_reviewed_form__',
})
assert.deepEqual(forged.formPracticed, {}, 'a forged form surface created mastery')
const lemmaOnly = reducer(ready, {
  type: 'PRACTICE_CORRECT',
  id: sampleId,
  completeRound: false,
})
assert.deepEqual(lemmaOnly.formPracticed, {}, 'recognizing the lemma prematurely created form mastery')
const failed = reducer(ready, {
  type: 'PRACTICE_WRONG',
  formId: sampleId,
  formSurface: sampleForm.al,
})
assert.deepEqual(failed.formPracticed, {}, 'an incorrect answer was counted as form mastery')

console.log(`✓ ${drillableForms} inflected surfaces across ${paradigms} paradigms are reachable without starvation.`)
