import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  ACTIVITY_COVERAGE_RESEARCHED_ON,
  ACTIVITY_COVERAGE_SOURCES,
  ACTIVITY_EQUIVALENCE_CALIBRATION,
  ACTIVITY_EQUIVALENCE_LEVELS,
  LEARNING_ACTIVITY_EQUIVALENCE_CLAIMS,
  learningActivityEquivalenceMatrix,
  learningActivityProductionInventory,
  resolveLearningActivityReference,
} from '../src/game/learningActivityCoverage.js'

const unique = (values, label) => assert.equal(new Set(values).size, values.length, `${label} contains duplicates`)

assert.match(ACTIVITY_COVERAGE_RESEARCHED_ON, /^20\d{2}-\d{2}-\d{2}$/)
assert.match(ACTIVITY_EQUIVALENCE_CALIBRATION, /uncalibrated/i)
assert.match(ACTIVITY_EQUIVALENCE_CALIBRATION, /not .*efficacy|not comparative efficacy/i)
assert.match(ACTIVITY_EQUIVALENCE_CALIBRATION, /not .*CEFR|or CEFR attainment/i)

const sourceEntries = Object.entries(ACTIVITY_COVERAGE_SOURCES)
assert.ok(sourceEntries.length >= 8, 'official comparison source ledger is too narrow')
unique(sourceEntries.map(([, source]) => source.url), 'official comparison URLs')
for (const [id, source] of sourceEntries) {
  assert.match(source.url, /^https:\/\/blog\.duolingo\.com\//, `${id}: source is not an official primary product page`)
  assert.ok(source.label.startsWith('Official '), `${id}: source label does not identify its primary status`)
  assert.ok(source.supports.length > 0, `${id}: source has no bounded observation list`)
}

const rows = learningActivityEquivalenceMatrix()
const inventory = learningActivityProductionInventory()
assert.equal(rows.length, LEARNING_ACTIVITY_EQUIVALENCE_CLAIMS.length)
assert.ok(rows.length >= 18, 'documented capability comparison is not broad enough')
unique(rows.map(({ id }) => id), 'capability claim IDs')

const allowedLevels = new Set(Object.keys(ACTIVITY_EQUIVALENCE_LEVELS))
for (const row of rows) {
  assert.ok(allowedLevels.has(row.level), `${row.id}: unknown equivalence level ${row.level}`)
  assert.equal(row.calibration, ACTIVITY_EQUIVALENCE_CALIBRATION, `${row.id}: claim lost the shared uncalibrated boundary`)
  assert.ok(row.sources.length > 0, `${row.id}: no official observation supports this capability row`)
  assert.equal(row.sources.length, row.sourceIds.length, `${row.id}: unknown official source reference`)
  unique(row.refs.map(({ registry, id }) => `${registry}:${id}`), `${row.id} production references`)
  if (!['intentionallyNotClaimed', 'missingCandidate', 'notAppropriate'].includes(row.level)) {
    assert.ok(row.refs.length > 0, `${row.id}: claimed equivalence has no production registry reference`)
    for (const equivalent of row.equivalents) {
      assert.ok(equivalent.value, `${row.id}: missing claimed equivalent ${equivalent.reference.registry}:${equivalent.reference.id}`)
      assert.equal(resolveLearningActivityReference(equivalent.reference), equivalent.value,
        `${row.id}: matrix copied or reconstructed a production definition`)
    }
  }
  if (['missingCandidate', 'notAppropriate'].includes(row.level)) {
    assert.equal(row.refs.length, 0, `${row.id}: an unimplemented disposition points at a production registry object`)
  }
}

for (const implemented of [
  'demonstrative-gender-bundle',
  'adjective-linking-article-agreement',
  'paired-form-meaning-contrast',
  'grammatical-form-odd-one-out',
  'same-root-grammar-matching',
  'ending-before-whole-spelling',
  'audio-written-meaning-match',
  'albanian-sound-contrast',
  'multi-gap-agreement-cloze',
]) {
  assert.notEqual(rows.find(({ id }) => id === implemented)?.level, 'missingCandidate',
    `${implemented}: implemented production mechanic is still labelled as missing`)
}
assert.equal(rows.find(({ id }) => id === 'handwriting-or-script-tracing')?.level, 'notAppropriate')

// The comparison is a full disposition over the current production surfaces,
// not a cherry-picked list. New families/aspects/mechanics must be placed in a
// capability row in the same change or this audit fails.
const covered = (registry) => new Set(rows.flatMap(({ refs }) => refs
  .filter((reference) => reference.registry === registry)
  .map(({ id }) => id)))
for (const family of inventory.trainFamilies) {
  assert.ok(covered('train-family').has(family.id), `Train family ${family.id} has no capability disposition`)
}
for (const aspect of inventory.wordAspects) {
  assert.ok(covered('word-learning-aspect').has(aspect.id), `word aspect ${aspect.id} has no capability disposition`)
}
for (const mechanic of inventory.preparationMechanics) {
  assert.ok(covered('cefr-preparation-mechanic').has(mechanic.id), `preparation mechanic ${mechanic.id} has no capability disposition`)
  assert.ok(inventory.preparationActivities.some(({ mechanicId }) => mechanicId === mechanic.id),
    `preparation mechanic ${mechanic.id} has no authored production activity`)
}

const component = readFileSync(new URL('../src/components/DebugLearningActivityCoverage.jsx', import.meta.url), 'utf8')
const debugView = readFileSync(new URL('../src/components/DebugView.jsx', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.match(component, /learningActivityEquivalenceMatrix\(\)/)
assert.match(component, /learningActivityProductionInventory\(\)/)
assert.match(component, /ACTIVITY_EQUIVALENCE_CALIBRATION/)
assert.match(debugView, /lazy\(\(\) => import\('\.\/DebugLearningActivityCoverage\.jsx'\)\)/)
assert.match(debugView, /sub === 'activity-coverage'/)
assert.doesNotMatch(app, /LearningActivityCoverage|learningActivityCoverage/,
  'normal App imports the debug-only external comparison')
assert.doesNotMatch(practice, /LearningActivityCoverage|learningActivityCoverage/,
  'ordinary Train imports the debug-only external comparison')

console.log(`✓ ${rows.length} researched activity capabilities resolve to ${inventory.trainFamilies.length} Train families, ${inventory.wordAspects.length} word aspects and ${inventory.preparationMechanics.length} A1–A2 preparation mechanics; every claim is explicitly uncalibrated.`)
