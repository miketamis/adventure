import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  CEFR_ACOUSTIC_BREADTH,
  CEFR_EXTERNAL_VALIDATION_BY_ID,
  CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION,
  CEFR_EXTERNAL_VALIDATION_WORKFLOWS,
  CEFR_VALIDATION_PRIVACY,
  cefrExternalValidationSnapshot,
} from '../src/game/cefrExternalValidation.js'
import { CEFR_ACOUSTIC_VOICES, CEFR_TASKS } from '../src/game/cefrTasks.js'

assert.equal(CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION, 1)
assert.equal(new Set(CEFR_EXTERNAL_VALIDATION_WORKFLOWS.map(({ id }) => id)).size,
  CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length, 'validation workflow IDs must be unique')
assert.deepEqual(Object.keys(CEFR_EXTERNAL_VALIDATION_BY_ID).sort(),
  CEFR_EXTERNAL_VALIDATION_WORKFLOWS.map(({ id }) => id).sort())
assert.ok(CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length >= 7,
  'specialist, speech, pilot, retention, comparison, fairness and standard-setting workflows must remain explicit')

for (const workflow of CEFR_EXTERNAL_VALIDATION_WORKFLOWS) {
  assert.equal(workflow.status, 'pending-human', `${workflow.id} fabricated a completed human study`)
  assert.ok(workflow.purpose.length >= 60, `${workflow.id} purpose is underspecified`)
  assert.ok(workflow.instruments.length >= 1, `${workflow.id} has no data instrument`)
  assert.ok(workflow.requiredEvidence.length >= 3, `${workflow.id} has no defensible evidence contract`)
  assert.match(workflow.completionAuthority, /human|rater|panel|analyst|research|reviewer/i,
    `${workflow.id} can apparently self-approve`)
  for (const dependency of workflow.prerequisites) {
    assert.ok(CEFR_EXTERNAL_VALIDATION_BY_ID[dependency], `${workflow.id} has unknown prerequisite ${dependency}`)
  }
}

const visited = new Set()
const visiting = new Set()
const visit = (id) => {
  assert.ok(!visiting.has(id), `validation prerequisite cycle reaches ${id}`)
  if (visited.has(id)) return
  visiting.add(id)
  for (const dependency of CEFR_EXTERNAL_VALIDATION_BY_ID[id].prerequisites) visit(dependency)
  visiting.delete(id)
  visited.add(id)
}
for (const id of Object.keys(CEFR_EXTERNAL_VALIDATION_BY_ID)) visit(id)

assert.equal(CEFR_VALIDATION_PRIVACY.privateRoot, '.private/validation')
assert.match(readFileSync(new URL('../.gitignore', import.meta.url), 'utf8'), /^\.private\/$/m,
  'private validation artifacts are not ignored')
assert.match(CEFR_VALIDATION_PRIVACY.learnerContent, /never enter Git/i)

const listening = CEFR_TASKS.filter(({ mode }) => mode === 'listening')
const taskVoices = [...new Set(listening.map(({ voice }) => voice.acousticVoiceId))].sort()
assert.deepEqual(taskVoices, [...CEFR_ACOUSTIC_VOICES].sort(),
  'the acoustic registry and held-out task bank disagree')
assert.deepEqual(taskVoices, [...CEFR_ACOUSTIC_BREADTH.reproducibleVoiceIds].sort(),
  'validation breadth advertises voices not reproducibly used by the task bank')
assert.ok(CEFR_ACOUSTIC_BREADTH.targetDistinctVoices > taskVoices.length,
  'the known acoustic breadth gap was silently marked complete')
assert.match(CEFR_ACOUSTIC_BREADTH.evidenceBoundary, /do not count/i)

const snapshot = cefrExternalValidationSnapshot()
assert.equal(snapshot.status, 'pending-human')
assert.equal(snapshot.completed, 0)
assert.equal(snapshot.total, CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length)
assert.equal(snapshot.acousticBreadthReady, false)

const cli = readFileSync(new URL('./cefr-validation.mjs', import.meta.url), 'utf8')
assert.match(cli, /Refusing to write outside/)
assert.match(cli, /Refusing to overwrite/)
assert.match(cli, /status === 'complete' && !study\.humanApproval/)
assert.match(cli, /private-qualified-review-material/)
assert.match(cli, /taskCatalogSha256/)
assert.match(cli, /Never serve to players or add to Git/)
assert.doesNotMatch(cli, /status:\s*['"]complete['"]|humanApproval:\s*\{/, 'CLI contains a fabricated completion path')

console.log('=== Aventura Shqip — external CEFR validation boundary ===')
console.log(`${snapshot.total} human-owned workflows · ${snapshot.completed} complete · ${taskVoices.length}/${CEFR_ACOUSTIC_BREADTH.targetDistinctVoices} reproducible acoustic voices`)
console.log('✓ specialist review, speech rating, pilot, delayed transfer, baseline, fairness and standard-setting remain explicit')
console.log('✓ private templates cannot be scaffolded into tracked paths or self-approved')
console.log('✅ stronger CEFR and SOTA claims fail closed while human evidence is pending')
