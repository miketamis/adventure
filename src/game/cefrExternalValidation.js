// External-validation contract for claims stronger than the game's internal
// A1-ready/A2-ready profile. This module deliberately contains protocols and
// pending states only. Human ratings and participant data stay in the ignored
// `.private/validation/` workspace and are never imported by the game runtime.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION = 1

export const CEFR_ACOUSTIC_BREADTH = deepFreeze({
  provider: 'Microsoft Azure Speech',
  locale: 'sq-AL',
  reproducibleVoiceIds: ['sq-AL-AnilaNeural', 'sq-AL-IlirNeural'],
  providerInventory: {
    status: 'verified-from-configured-resource',
    checkedOn: '2026-09-12',
    voiceIds: ['sq-AL-AnilaNeural', 'sq-AL-IlirNeural'],
  },
  humanRecordingPack: {
    status: 'pending-human',
    voiceIds: [],
    boundary: 'No human voice counts until recording consent, licence, Albanian specialist review and comprehensibility review are documented outside Git.',
  },
  targetDistinctVoices: 4,
  currentStatus: 'provider-limited',
  evidenceBoundary: 'Different character labels, speaking-rate changes, pitch shifts and duplicated synthesis do not count as different acoustic voices.',
  expansionRule: 'Add a voice only after the configured provider reports that exact sq-AL voice ID, or after a separately licensed human recording pack passes specialist and comprehensibility review.',
  verificationCommand: 'node scripts/tts-download.mjs --list-voices',
})

export const CEFR_VALIDATION_PRIVACY = deepFreeze({
  privateRoot: '.private/validation',
  participantIdentity: 'Use study-scoped pseudonymous IDs; never collect names, phone numbers, account handles or private conversation text.',
  learnerContent: 'Raw writing and recordings remain in the approved private study store and never enter Git, fixtures, analytics events or the production bundle.',
  publicAggregation: 'Only de-identified aggregate results that satisfy the preregistered disclosure floor may be published.',
  trackedState: 'Tracked code may contain protocol versions, workflow IDs and privacy-reviewed aggregate decisions only; never per-participant responses, ratings, audio paths or identifiers.',
  consent: 'Record informed consent, withdrawal and data-retention decisions outside the repository before collecting any learner response.',
})

const workflow = ({ id, label, purpose, prerequisites = [], instruments, requiredEvidence, completionAuthority, blockingClaim }) => ({
  id,
  label,
  status: 'pending-human',
  purpose,
  prerequisites,
  instruments,
  requiredEvidence,
  completionAuthority,
  blockingClaim,
})

export const CEFR_EXTERNAL_VALIDATION_WORKFLOWS = deepFreeze([
  workflow({
    id: 'albanian-specialist-review',
    label: 'Independent Albanian specialist review',
    purpose: 'Review every assessed stimulus, accepted alternative, distractor, rubric, grammatical form and pronunciation note for contemporary Standard Albanian and task fairness.',
    instruments: ['task-catalog.json', 'specialist-review.csv', 'issue-resolution.csv'],
    requiredEvidence: [
      'At least two independent qualified Albanian reviewers declare their role and review scope.',
      'Every held-out task and every learner-facing scoring alternative receives an explicit accept, revise or reject disposition.',
      'Disagreements and revisions are resolved in an auditable issue ledger before tasks are released again.',
    ],
    completionAuthority: 'Named human study owner confirms both independent reviewer decisions and issue resolution; the application cannot self-approve this step.',
    blockingClaim: 'Albanian task validity',
  }),
  workflow({
    id: 'human-speech-comprehensibility',
    label: 'Human speech comprehensibility study',
    purpose: 'Establish whether unfamiliar supportive Albanian listeners can understand learner speech, rather than treating recording, transcription or self-rating as intelligibility.',
    prerequisites: ['albanian-specialist-review'],
    instruments: ['speech-samples.csv', 'speech-ratings.csv', 'rater-calibration.csv'],
    requiredEvidence: [
      'A preregistered sample includes A1 and A2 tasks, first attempts, varied speakers and the intended learner population.',
      'At least two trained raters independently score each sampled response with blinded task order.',
      'Inter-rater agreement, adjudication, missing-audio handling and subgroup error estimates are reported.',
      'The cut decision is related to listener comprehension and human judgments, never ASR confidence alone.',
    ],
    completionAuthority: 'Trained human raters and an independent methodology reviewer sign off the study report.',
    blockingClaim: 'Externally supported spoken intelligibility',
  }),
  workflow({
    id: 'true-beginner-pilot',
    label: 'True-beginner learning pilot',
    purpose: 'Test whether learners starting with no Albanian can navigate the game, understand its feedback and progress without hidden prior knowledge.',
    prerequisites: ['albanian-specialist-review'],
    instruments: ['participant-sessions.csv', 'task-outcomes.csv', 'usability-observations.csv'],
    requiredEvidence: [
      'Eligibility verifies no prior Albanian beyond the preregistered beginner ceiling.',
      'First attempts, support exposure, completion, time on task, attrition and recovery from errors are retained.',
      'Observed usability failures are separated from language failures.',
      'Withdrawals and missing results remain visible instead of being silently excluded.',
    ],
    completionAuthority: 'Human research lead signs the recruitment, consent, exclusions and analysis report.',
    blockingClaim: 'Zero-to-A2 learnability',
  }),
  workflow({
    id: 'delayed-retention-transfer',
    label: 'Delayed retention and transfer',
    purpose: 'Measure what remains usable after time has passed and in new contexts, rather than counting immediate rehearsal as durable learning.',
    prerequisites: ['true-beginner-pilot'],
    instruments: ['delayed-outcomes.csv'],
    requiredEvidence: [
      'Preregistered post-tests occur after at least one short delay and one longer delay.',
      'Tests use unseen combinations and changed situations without pre-answer support.',
      'Retention, transfer, missing follow-up and confidence intervals are reported separately by mode.',
    ],
    completionAuthority: 'Human research lead verifies test isolation, delay windows and participant follow-up.',
    blockingClaim: 'Durable learning and fresh-context transfer',
  }),
  workflow({
    id: 'baseline-comparison',
    label: 'Preregistered baseline comparison',
    purpose: 'Determine whether the adaptive adventure improves learning efficiency or retention relative to a credible alternative using comparable content and time.',
    prerequisites: ['true-beginner-pilot', 'delayed-retention-transfer'],
    instruments: ['allocation.csv', 'baseline-outcomes.csv'],
    requiredEvidence: [
      'The comparison, allocation method, primary outcome, stopping rule and exclusions are fixed before outcome inspection.',
      'Groups receive comparable Albanian content, study time and assessments.',
      'Effect sizes, uncertainty, attrition and adverse usability effects are reported, not only statistical significance.',
    ],
    completionAuthority: 'Independent analyst verifies allocation and the preregistered analysis.',
    blockingClaim: 'State-of-the-art learning-efficiency superiority',
  }),
  workflow({
    id: 'subgroup-fairness',
    label: 'Subgroup and fairness analysis',
    purpose: 'Check whether task access, audio, feedback and gate decisions work comparably across relevant learner and device groups.',
    prerequisites: ['human-speech-comprehensibility', 'true-beginner-pilot'],
    instruments: ['fairness-analysis.csv'],
    requiredEvidence: [
      'Subgroups and minimum reportable sample sizes are preregistered and collected only with consent.',
      'Completion, missingness, false-blocking, listening and human-rating differences are reported with uncertainty.',
      'Small cells are suppressed for privacy and are labelled inconclusive rather than passed.',
      'Material disparities have a documented mitigation, retest and appeal path.',
    ],
    completionAuthority: 'Independent methodology reviewer approves the fairness analysis and privacy treatment.',
    blockingClaim: 'Fair and reliable readiness decisions',
  }),
  workflow({
    id: 'cefr-standard-setting',
    label: 'External CEFR relation and standard-setting',
    purpose: 'Relate the complete assessment profile and cut decisions to CEFR A1/A2 descriptors through independent expert judgment and empirical learner performance.',
    prerequisites: ['albanian-specialist-review', 'human-speech-comprehensibility', 'delayed-retention-transfer', 'subgroup-fairness'],
    instruments: ['panel-judgments.csv', 'standard-setting-report.json'],
    requiredEvidence: [
      'An independent panel documents CEFR expertise, Albanian expertise, training and conflicts of interest.',
      'The method, borderline performances, cut-score rationale, uncertainty and consequences of false decisions are documented.',
      'All seven modes are considered separately; strength in one mode cannot compensate for another.',
      'The relation is checked against suitable external performances or assessments and is periodically revalidated.',
    ],
    completionAuthority: 'Independent CEFR/Albanian panel signs the standard-setting report; repository tests cannot create this approval.',
    blockingClaim: 'Certified or externally verified CEFR level',
  }),
])

export const CEFR_EXTERNAL_VALIDATION_BY_ID = deepFreeze(Object.fromEntries(
  CEFR_EXTERNAL_VALIDATION_WORKFLOWS.map((item) => [item.id, item]),
))

export function cefrExternalValidationSnapshot() {
  const pending = CEFR_EXTERNAL_VALIDATION_WORKFLOWS.filter(({ status }) => status !== 'complete')
  const approvedAcousticVoices = new Set([
    ...CEFR_ACOUSTIC_BREADTH.reproducibleVoiceIds,
    ...CEFR_ACOUSTIC_BREADTH.humanRecordingPack.voiceIds,
  ])
  return {
    schemaVersion: CEFR_EXTERNAL_VALIDATION_SCHEMA_VERSION,
    status: pending.length ? 'pending-human' : 'complete',
    completed: CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length - pending.length,
    total: CEFR_EXTERNAL_VALIDATION_WORKFLOWS.length,
    pendingIds: pending.map(({ id }) => id),
    approvedAcousticVoices: approvedAcousticVoices.size,
    acousticBreadthReady: approvedAcousticVoices.size >= CEFR_ACOUSTIC_BREADTH.targetDistinctVoices,
  }
}
