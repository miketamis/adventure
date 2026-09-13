import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_ASPECT_REGISTRY_VERSION,
  WORD_LEARNING_ASPECTS,
  WORD_STAGE_ASPECT_BINDINGS,
  advanceWordProgress,
  normalizeWordProgress,
  wordAspectTargetsForPlan,
  wordProgressionSnapshot,
} from '../src/game/wordProgression.js'
import { recordWordExposure } from '../src/game/wordExposure.js'

const ids = WORD_LEARNING_ASPECTS.map(({ id }) => id)
assert.equal(new Set(ids).size, ids.length, 'word aspect IDs are not unique')
assert.ok(WORD_ASPECT_REGISTRY_VERSION >= 2, 'branching/audio aspect registry migration is not versioned')
for (const aspect of WORD_LEARNING_ASPECTS) {
  assert.ok(WORD_STAGE_ASPECT_BINDINGS[aspect.stageId], `${aspect.id} lacks an activity binding`)
  for (const requirement of aspect.prerequisites || []) {
    assert.ok(ids.includes(requirement.aspectId), `${aspect.id} requires unknown aspect ${requirement.aspectId}`)
  }
  for (const requirements of Object.values(aspect.conditionalPrerequisites || {})) {
    for (const requirement of requirements) {
      assert.ok(ids.includes(requirement.aspectId), `${aspect.id} conditionally requires unknown aspect ${requirement.aspectId}`)
    }
  }
}

const options = wordProgressionOptionsForSense('fshat')
const foundation = normalizeWordProgress({ wins: { 'meaning-recognition': 2 } })
const branched = wordProgressionSnapshot(foundation, 10, options)
const eligible = branched.aspects.filter(({ eligible }) => eligible).map(({ aspect }) => aspect.id)
for (const id of [
  'grammatical-form-recognition',
  'controlled-lemma-retrieval',
  'contextual-meaning-inference',
]) assert.ok(eligible.includes(id), `${id} was incorrectly hidden behind a global sequence`)
assert.ok(!eligible.includes('auditory-form-construction'), 'whole-form sound construction bypassed exact noun-ending recall')
assert.ok(!eligible.includes('contextual-form-selection'), 'ending choice bypassed exact form/job recognition')
assert.ok(!eligible.includes('reviewed-ending-recall'), 'typed ending bypassed ending selection')
assert.equal(branched.next.aspectSelection.strategy, 'highest scored due weak aspect; registry order breaks exact ties')

const initial = wordProgressionSnapshot(null, 0, options)
const result = advanceWordProgress(null, 0, {
  correct: true,
  stageId: initial.next.stageId,
  tier: initial.next.tier,
  mode: initial.next.mode,
  direction: initial.next.direction,
  variantId: initial.next.contextVariantId || initial.next.variantId,
  targetFormKey: initial.next.targetFormKey,
  aspectTargets: wordAspectTargetsForPlan('fshat', initial.next),
  questionKey: 'aspect-audit-first-proof',
  round: 1,
}, options)
assert.ok(result.accepted)
const writtenProofs = Object.entries(result.progress.aspectProofs).filter(([, proof]) => proof.attempts > 0)
assert.equal(writtenProofs.length, 1, 'one word question updated more than its exercised aspect')
assert.match(writtenProofs[0][0], /lexical-meaning-recognition$/)

const exposureBase = { wordExposure: {}, wordExposureReceipts: {} }
const exposed = recordWordExposure(exposureBase, {
  receipt: 'audit:story:1', source: 'story', occurrences: ['fshat', 'fshat'],
})
assert.equal(exposed.wordExposure.fshat.total, 2)
assert.strictEqual(recordWordExposure(exposed, {
  receipt: 'audit:story:1', source: 'story', occurrences: ['fshat'],
}), exposed, 'replaying an exposure receipt changed familiarity')
assert.deepEqual(
  wordProgressionSnapshot(null, 0, options).next.aspectId,
  wordProgressionSnapshot(null, 0, { ...options, wordExposure: exposed.wordExposure }).next.aspectId,
  'passive exposure changed a capability gate',
)

const question = buildWordQuestion({
  discoveredIds: ['fshat'], targetId: 'fshat', wordExposure: exposed.wordExposure,
  currentRound: 0, rng: () => 0.25, debugTrace: true,
})
const weighting = question?.debugSelection?.weightedSelection?.candidates?.[0]
assert.ok(weighting?.retrievalPriorityBoost > 1, 'passive familiarity did not create its bounded retrieval-priority boost')
assert.ok(weighting.retrievalPriorityBoost <= 1.35, 'passive exposure boost escaped its declared cap')

const debugSource = readFileSync(new URL('../src/components/DebugLearningProgression.jsx', import.meta.url), 'utf8')
assert.match(debugSource, /snapshot\.aspects\.map/)
assert.match(debugSource, /data-word-aspect-registry-version/)
assert.doesNotMatch(debugSource, /word ladder/i)
const storySource = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
assert.match(storySource, /scenePresentation\.normalEntries/)
assert.match(storySource, /story-choice:/)
const modelCard = readFileSync(new URL('../docs/adaptive-learning-model-card.md', import.meta.url), 'utf8')
for (const boundary of ['independently evidenced capability graph', 'Passive exposure', 'cannot complete a prerequisite']) {
  assert.ok(modelCard.includes(boundary), `model card omits ${boundary}`)
}

console.log(`✓ ${ids.length} word-learning aspects form a shared branching graph; passive exposure is replay-safe priority evidence, never mastery.`)
