#!/usr/bin/env node
// Scaffold and validate the private, human-owned CEFR validation workspace.
// This command never turns human work into a product claim and never writes
// participant material to tracked paths.

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'
import {
  CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION,
  CEFR_EXTERNAL_VALIDATION_WORKFLOWS,
  CEFR_VALIDATION_PRIVACY,
} from '../src/game/cefrExternalValidation.js'
import { CEFR_TASKS } from '../src/game/cefrTasks.js'

const ROOT = resolve(new URL('..', import.meta.url).pathname)
const PRIVATE_ROOT = resolve(ROOT, CEFR_VALIDATION_PRIVACY.privateRoot)
const arg = (name) => process.argv.find((entry) => entry.startsWith(`${name}=`))?.slice(name.length + 1)
const SCAFFOLD = arg('--scaffold')
const CHECK = arg('--check')

const csvEscape = (value) => `"${String(value).replaceAll('"', '""')}"`
const csvLine = (values) => values.map(csvEscape).join(',')
const isWithinPrivateRoot = (path) => {
  const rel = relative(PRIVATE_ROOT, path)
  return rel === '' || (!rel.startsWith(`..${sep}`) && rel !== '..' && !rel.startsWith(sep))
}
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`
const sha256 = (value) => createHash('sha256').update(value).digest('hex')

const HEADERS = {
  'specialist-review.csv': ['reviewer_pseudonym', 'reviewer_role', 'task_id', 'surface_id', 'disposition', 'issue_code', 'notes_private'],
  'issue-resolution.csv': ['issue_code', 'task_id', 'resolution', 'resolved_by_pseudonym', 'reviewed_again_by_pseudonym'],
  'speech-samples.csv': ['participant_id', 'task_id', 'recording_id_private', 'first_attempt', 'support_exposed', 'subgroup_key_consented'],
  'speech-ratings.csv': ['recording_id_private', 'rater_pseudonym', 'comprehensibility_0_3', 'task_fulfilment_0_3', 'repetition_needed', 'rating_notes_private'],
  'rater-calibration.csv': ['rater_pseudonym', 'calibration_set_id', 'agreement_measure', 'agreement_value', 'adjudication_required'],
  'participant-sessions.csv': ['participant_id', 'eligibility_confirmed', 'consent_record_id_private', 'condition_id', 'started_at', 'completed_at', 'withdrawn'],
  'task-outcomes.csv': ['participant_id', 'task_id', 'mode', 'first_attempt', 'correct_or_human_pass', 'support_exposed', 'response_time_ms'],
  'usability-observations.csv': ['participant_id', 'screen_id', 'observation_code', 'language_failure', 'usability_failure', 'notes_private'],
  'delayed-outcomes.csv': ['participant_id', 'delay_window', 'task_id', 'mode', 'unseen_context', 'correct_or_human_pass', 'missing_reason'],
  'allocation.csv': ['participant_id', 'condition_id', 'allocation_method', 'allocated_before_outcomes'],
  'baseline-outcomes.csv': ['participant_id', 'condition_id', 'outcome_id', 'value', 'follow_up_window', 'included', 'exclusion_reason'],
  'fairness-analysis.csv': ['subgroup_key', 'outcome_id', 'n', 'estimate', 'lower_interval', 'upper_interval', 'privacy_suppressed', 'disposition'],
  'panel-judgments.csv': ['panelist_pseudonym', 'expertise_declaration', 'conflict_declaration', 'level', 'mode', 'task_id', 'borderline_judgment', 'rationale_private'],
}

function scaffold(out) {
  const target = resolve(ROOT, out)
  if (!isWithinPrivateRoot(target)) throw new Error(`Refusing to write outside ${CEFR_VALIDATION_PRIVACY.privateRoot}`)
  if (existsSync(target)) throw new Error(`Refusing to overwrite existing validation workspace: ${target}`)
  mkdirSync(target, { recursive: true })
  const taskCatalogText = stableJson({
    schemaVersion: CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION,
    classification: 'private-qualified-review-material',
    warning: 'Contains held-out task answers. Never serve to players or add to Git.',
    tasks: CEFR_TASKS,
  })
  const protocol = {
    schemaVersion: CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION,
    status: 'pending-human',
    generatedFrom: 'src/game/cefrExternalValidation.js',
    taskCatalogSha256: sha256(taskCatalogText),
    privacy: CEFR_VALIDATION_PRIVACY,
    studies: CEFR_EXTERNAL_VALIDATION_WORKFLOWS.map(({ id, status, prerequisites, instruments }) => ({
      id,
      status,
      prerequisites,
      instruments,
      humanApproval: null,
    })),
  }
  writeFileSync(resolve(target, 'protocol.json'), stableJson(protocol))
  for (const headers of new Set(Object.values(CEFR_EXTERNAL_VALIDATION_WORKFLOWS).flatMap(({ instruments }) => instruments))) {
    if (headers === 'task-catalog.json') {
      writeFileSync(resolve(target, headers), taskCatalogText)
      continue
    }
    if (headers.endsWith('.json')) {
      writeFileSync(resolve(target, headers), stableJson({ status: 'pending-human', humanApproval: null }))
      continue
    }
    writeFileSync(resolve(target, headers), `${csvLine(HEADERS[headers] || ['pending_human'])}\n`)
  }
  console.log(`Created pending human-validation workspace at ${relative(ROOT, target)}`)
  console.log('No review, participant result, rating or CEFR approval has been inferred.')
}

function parseCsvHeader(path) {
  const firstLine = readFileSync(path, 'utf8').split(/\r?\n/, 1)[0]
  return firstLine.match(/(?:"(?:[^"]|"")*"|[^,])+/g)?.map((cell) => cell.replace(/^"|"$/g, '').replaceAll('""', '"')) || []
}

function checkWorkspace(input) {
  const target = resolve(ROOT, input)
  if (!isWithinPrivateRoot(target)) throw new Error(`Refusing to inspect participant material outside ${CEFR_VALIDATION_PRIVACY.privateRoot}`)
  const protocolPath = resolve(target, 'protocol.json')
  if (!existsSync(protocolPath)) throw new Error('protocol.json is missing; create it with --scaffold first')
  const protocol = JSON.parse(readFileSync(protocolPath, 'utf8'))
  if (protocol.schemaVersion !== CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION) throw new Error('validation schema version does not match the application')
  const declared = new Map((protocol.studies || []).map((study) => [study.id, study]))
  const catalogText = readFileSync(resolve(target, 'task-catalog.json'), 'utf8')
  if (sha256(catalogText) !== protocol.taskCatalogSha256) throw new Error('private task catalog no longer matches its exported hash')
  const catalog = JSON.parse(catalogText)
  if (catalog.classification !== 'private-qualified-review-material') throw new Error('task catalog lost its private classification')
  if (catalog.tasks?.length !== CEFR_TASKS.length) throw new Error('private task catalog is stale against the current held-out bank')
  for (const workflow of CEFR_EXTERNAL_VALIDATION_WORKFLOWS) {
    const study = declared.get(workflow.id)
    if (!study) throw new Error(`protocol is missing ${workflow.id}`)
    if (!['pending-human', 'in-progress', 'complete', 'invalidated'].includes(study.status)) throw new Error(`${workflow.id} has invalid status ${study.status}`)
    for (const instrument of workflow.instruments) {
      const path = resolve(target, instrument)
      if (!existsSync(path)) throw new Error(`${workflow.id} is missing ${instrument}`)
      if (instrument.endsWith('.csv')) {
        const expected = HEADERS[instrument] || []
        const actual = parseCsvHeader(path)
        if (expected.join('\u0000') !== actual.join('\u0000')) throw new Error(`${instrument} header does not match the registered schema`)
      }
    }
    if (study.status === 'complete' && !study.humanApproval) {
      throw new Error(`${workflow.id} claims completion without an externally supplied humanApproval record`)
    }
  }
  const complete = [...declared.values()].filter(({ status }) => status === 'complete').length
  console.log(`Validation workspace is structurally valid: ${complete}/${CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length} workflows carry external human completion records.`)
  if (complete < CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length) console.log('Product certification remains pending; this command does not approve studies or score learners.')
}

if (Boolean(SCAFFOLD) === Boolean(CHECK)) {
  console.error('Usage: node scripts/cefr-validation.mjs --scaffold=.private/validation/study-id')
  console.error('   or: node scripts/cefr-validation.mjs --check=.private/validation/study-id')
  process.exit(1)
}

try {
  if (SCAFFOLD) scaffold(SCAFFOLD)
  else checkWorkspace(CHECK)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
