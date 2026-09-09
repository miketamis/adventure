// Proves that every reviewed form surface is reachable in Train and that the
// scheduler exhausts an unseen layer before repeating a mastered form.
import assert from 'node:assert/strict'
import { DICT } from '../src/game/content.js'
import {
  formTrackForSense,
  playableFormUsage,
  trainingForms,
} from '../src/game/formInventory.js'
import { formPracticeKey, pickLeastPracticedForm } from '../src/game/formProgression.js'
import { newRun, reducer } from '../src/game/gameState.js'

const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
let trackedSenses = 0
let drillableForms = 0
const classes = new Map()

for (const [id, entry] of Object.entries(DICT)) {
  const drillPool = trainingForms(id)
  if (drillPool.length < 2) continue
  trackedSenses += 1
  const track = formTrackForSense(id)
  classes.set(track.wordClass, (classes.get(track.wordClass) || 0) + 1)

  const poolSurfaces = new Set(drillPool.map((form) => lower(form.al)))
  if (entry.formTrack === 'noun') {
    // Syncretic noun roles may share one surface. Train exposes the spelling
    // once while the noun refresher retains every reviewed grammatical row.
    const reviewed = new Set(entry.forms.map((form) => lower(form.al)))
    assert.deepEqual([...poolSurfaces].sort(), [...reviewed].sort(), `${id}: Train silently omits a reviewed noun form`)
    assert.equal(track.hasNounRoleStep, true, `${id}: noun lost its grammatical-role step`)
  } else {
    assert.equal(track.hasNounRoleStep, false, `${id}: non-noun was sent to noun-role remediation`)
    const lemma = lower(entry.al)
    for (const surface of playableFormUsage(id).keys()) {
      if (surface === lemma) continue
      const declaration = (entry.forms || []).find((form) => lower(form.al) === surface)
      if (declaration?.trainable === false) {
        assert.match(declaration.tag, /Fragment$/, `${id}/${surface}: non-trainable surface lacks an explicit fragment tag`)
      } else {
        assert.ok(poolSurfaces.has(surface), `${id}/${surface}: playable form is not quiz-reachable`)
      }
    }
    for (const form of entry.forms || []) {
      if (form.trainable === false) {
        assert.match(form.tag, /Fragment$/, `${id}/${form.al}: a non-trainable form needs an explicit fragment tag`)
      } else {
        assert.ok(poolSurfaces.has(lower(form.al)), `${id}/${form.al}: dictionary form is not quiz-reachable`)
      }
    }
  }

  const lemma = lower(entry.al)
  const targets = drillPool.filter((form) => lower(form.al) !== lemma)
  const mastery = {}
  const firstCycle = []
  for (let index = 0; index < targets.length; index += 1) {
    const selected = pickLeastPracticedForm(targets, id, mastery, () => 0)
    assert.ok(selected, `${id}: scheduler returned no target`)
    assert.ok(!firstCycle.includes(lower(selected.al)), `${id}: ${selected.al} repeated before every reviewed form appeared`)
    firstCycle.push(lower(selected.al))
    mastery[formPracticeKey(id, selected.al)] = 1
  }
  assert.equal(new Set(firstCycle).size, targets.length, `${id}: first form cycle is incomplete`)
  drillableForms += targets.length
}

// Reducer-side validation prevents forged or stale UI events from creating
// mastery. Check one noun and one non-noun so both inventory paths stay live.
const samples = [
  Object.entries(DICT).find(([id, entry]) => entry.formTrack === 'noun' && trainingForms(id).length > 1),
  Object.entries(DICT).find(([id, entry]) => entry.formTrack !== 'noun' && trainingForms(id).length > 1),
].filter(Boolean)
assert.equal(samples.length, 2, 'both noun and non-noun form tracks need a reducer sample')

for (const [sampleId, sampleEntry] of samples) {
  const sampleForm = trainingForms(sampleId).find((form) => lower(form.al) !== lower(sampleEntry.al))
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
  assert.deepEqual(forged.formPracticed, {}, `${sampleId}: forged form surface created mastery`)
}

console.log(`✓ ${drillableForms} reviewed standalone form surfaces across ${trackedSenses} senses are reachable without starvation; bound fragments are excluded.`)
console.log(`  tracked classes: ${[...classes].map(([name, count]) => `${name} ${count}`).join(', ')}`)
