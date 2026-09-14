// Release gate for independently authored conversational expressions. The
// registry records social force and Train disposition; this audit proves that
// each expression is grounded in public story content and that coarse,
// hyperbolic or intonation-dependent material cannot leak into productive
// practice merely because its spelling exists in the dictionary.

import assert from 'node:assert/strict'
import {
  DICT,
  START_NODE,
  STORY,
  lineOf,
} from '../src/game/content.js'
import {
  COLLOQUIAL_EARLY_HUB_MINIMUM,
  COLLOQUIAL_EXPRESSION_REVIEWS,
  COLLOQUIAL_MEANING_MODES,
  COLLOQUIAL_PROSODY,
  COLLOQUIAL_REGISTERS,
  COLLOQUIAL_TRAIN_POLICIES,
} from '../src/game/colloquialAlbanian.js'
import { CONVERSATION_HUBS } from '../src/game/conversationHub.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import {
  reviewedContextEligibilityForSense,
  trainingForms,
} from '../src/game/formInventory.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  LEXICAL_TRAINABILITY_KIND,
  RECEPTIVE_COLLOQUIAL_IDS,
  isTrainableSense,
  lexicalTrainability,
} from '../src/game/lexicalTrainability.js'
import { phraseWords } from '../src/game/phrasePractice.js'

const REQUIRED_SURFACES = [
  'Po flet kot.',
  'Ça po bën?',
  "Ç'kemi?",
  'Hajt, mo.',
  'Hë, hë.',
  'Çfarë ndodhi?',
  'Kushedi.',
  'Gjoja.',
  'Lëre.',
  'Lëre fare.',
  'Seriozisht?',
  'Normal!',
  'fiks',
  'Vari leshtë.',
  'Na plasi.',
  'Vdiqa së qeshuri.',
  'U çmenda.',
  'Mos më ça kokën.',
  "S'ka gjë.",
  'Çfarë do të thuash?',
  'Si domethënë?',
  'Prit pak.',
  'Mos u shqetëso.',
  'Ke të drejtë.',
  'Pse jo?',
  'Epo mirë.',
  'Nejse.',
]

const lower = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/’/gu, "'")
  .trim()
const wordSequence = (value) => phraseWords(lower(value)).map(lower)
const containsSequence = (container, requested) => {
  const whole = wordSequence(container)
  const part = wordSequence(requested)
  if (!part.length || part.length > whole.length) return false
  return whole.some((_, start) => part.every((word, offset) => whole[start + offset] === word))
}

const surfacesByNode = new Map()
const choiceSurfaces = []
for (const [nodeId, node] of Object.entries(STORY)) {
  const surfaces = []
  for (const entry of node.text || []) {
    const line = lineOf(entry)
    surfaces.push({ kind: 'text', al: albanianTextOf(line), ids: line.filter(({ id }) => id).map(({ id }) => id) })
  }
  for (const option of node.options || []) {
    const line = option.text || []
    const surface = { nodeId, kind: 'option', al: albanianTextOf(line), ids: line.filter(({ id }) => id).map(({ id }) => id) }
    surfaces.push(surface)
    if (!option.confuser) choiceSurfaces.push(surface)
  }
  surfacesByNode.set(nodeId, surfaces)
}

const phraseById = new Map(EVERYDAY_PHRASE_DRILLS.map((phrase) => [phrase.id, phrase]))
const trainPolicies = new Set(Object.values(COLLOQUIAL_TRAIN_POLICIES))
const registers = new Set(Object.values(COLLOQUIAL_REGISTERS))
const prosodies = new Set(Object.values(COLLOQUIAL_PROSODY))
const meaningModes = new Set(Object.values(COLLOQUIAL_MEANING_MODES))

assert.ok(Object.isFrozen(COLLOQUIAL_EXPRESSION_REVIEWS), 'colloquial review registry is mutable')
assert.deepEqual(
  COLLOQUIAL_EXPRESSION_REVIEWS.map(({ al }) => al),
  REQUIRED_SURFACES,
  'the reviewed colloquial inventory changed without updating its exact public coverage contract',
)

const seenIds = new Set()
const seenSurfaceSenses = new Set()
const expressionHits = new Map()
for (const review of COLLOQUIAL_EXPRESSION_REVIEWS) {
  assert.match(review.id, /^[a-z][a-z0-9-]*$/u, `${review.id}: unstable review id`)
  assert.ok(!seenIds.has(review.id), `${review.id}: duplicate review id`)
  seenIds.add(review.id)
  assert.equal(review.al, review.al.normalize('NFC').trim(), `${review.id}: Albanian surface is not canonical NFC text`)
  assert.equal(review.en, review.en.trim(), `${review.id}: English sense has outer whitespace`)
  assert.ok(review.en.length >= 3, `${review.id}: English sense is empty`)
  const senseKey = `${lower(review.al)}\u0000${lower(review.en)}`
  assert.ok(!seenSurfaceSenses.has(senseKey), `${review.id}: duplicate surface and English sense`)
  seenSurfaceSenses.add(senseKey)
  assert.ok(trainPolicies.has(review.trainPolicy), `${review.id}: unknown Train policy ${review.trainPolicy}`)
  assert.ok(registers.has(review.register), `${review.id}: unknown register ${review.register}`)
  assert.ok(prosodies.has(review.prosody), `${review.id}: unknown prosody ${review.prosody}`)
  assert.ok(meaningModes.has(review.meaningMode), `${review.id}: unknown meaning mode ${review.meaningMode}`)
  assert.ok(typeof review.tone === 'string' && review.tone.length >= 3, `${review.id}: missing tone review`)
  assert.ok(typeof review.usageNote === 'string' && review.usageNote.length >= 48,
    `${review.id}: register or situation note is not substantive`)
  assert.ok(Array.isArray(review.dictionaryIds) && review.dictionaryIds.length > 0,
    `${review.id}: no related dictionary senses`)
  assert.equal(new Set(review.dictionaryIds).size, review.dictionaryIds.length,
    `${review.id}: repeated dictionary sense`)
  assert.equal(new Set(review.focalSenseIds).size, review.focalSenseIds.length,
    `${review.id}: repeated focal sense`)
  for (const id of review.dictionaryIds) assert.ok(DICT[id], `${review.id}: unknown dictionary sense ${id}`)
  for (const id of review.focalSenseIds) assert.ok(review.dictionaryIds.includes(id),
    `${review.id}: focal sense ${id} is not a related dictionary sense`)
  for (const id of review.contextSenseIds) {
    assert.ok(review.focalSenseIds.includes(id), `${review.id}: contextual sense ${id} is not focal`)
    const eligibility = reviewedContextEligibilityForSense(id)
    assert.equal(eligibility.requiresReviewedContext, true, `${review.id}/${id}: contextual policy has no reviewed context`)
    assert.equal(eligibility.eligible, true, `${review.id}/${id}: ${eligibility.gaps.join('; ')}`)
  }

  assert.ok(Array.isArray(review.groundingNodeIds) && review.groundingNodeIds.length > 0,
    `${review.id}: no story grounding nodes`)
  assert.equal(new Set(review.groundingNodeIds).size, review.groundingNodeIds.length,
    `${review.id}: repeated grounding node`)
  const grounded = []
  for (const nodeId of review.groundingNodeIds) {
    assert.ok(STORY[nodeId], `${review.id}: unknown grounding node ${nodeId}`)
    for (const surface of surfacesByNode.get(nodeId) || []) {
      if (containsSequence(surface.al, review.al)) grounded.push({ nodeId, ...surface })
    }
  }
  assert.ok(grounded.length > 0,
    `${review.id}: “${review.al}” is absent from its declared public story nodes (${review.groundingNodeIds.join(', ')})`)
  assert.ok(grounded.some(({ ids }) => review.dictionaryIds.every((id) => ids.includes(id))),
    `${review.id}: no grounded occurrence carries every declared dictionary sense`)
  expressionHits.set(review.id, grounded)

  for (const form of review.blockedStandaloneForms) {
    assert.ok(review.dictionaryIds.includes(form.id), `${review.id}: blocked form ${form.id}/${form.al} is unrelated`)
    const declared = (DICT[form.id].forms || []).find(({ al }) => lower(al) === lower(form.al))
    assert.ok(declared, `${review.id}: blocked standalone form ${form.id}/${form.al} is not reviewed`)
    assert.equal(declared.trainable, false, `${review.id}: ${form.al} can enter standalone form Train`)
    assert.ok(!trainingForms(form.id).some(({ al }) => lower(al) === lower(form.al)),
      `${review.id}: ${form.al} survived the standalone training-form filter`)
  }

  for (const id of review.blockedProductiveSenseIds) {
    assert.ok(review.focalSenseIds.includes(id), `${review.id}: blocked sense ${id} is not focal`)
    assert.equal(isTrainableSense(id), false, `${review.id}: receptive-only sense ${id} can enter word Train`)
  }

  const sensitive = review.prosody === COLLOQUIAL_PROSODY.SENSITIVE ||
    review.register === COLLOQUIAL_REGISTERS.COARSE ||
    review.meaningMode === COLLOQUIAL_MEANING_MODES.HYPERBOLIC
  if (sensitive) {
    assert.equal(review.trainPolicy, COLLOQUIAL_TRAIN_POLICIES.STORY_ONLY,
      `${review.id}: prosodic, coarse or hyperbolic language entered productive policy`)
  }
  if (['rude', 'sarcastic-dismissal'].includes(review.tone)) {
    assert.equal(review.trainPolicy, COLLOQUIAL_TRAIN_POLICIES.STORY_ONLY,
      `${review.id}: hostile social force entered productive policy`)
  }

  for (const phraseId of review.phraseIds) {
    const phrase = phraseById.get(phraseId)
    assert.ok(phrase, `${review.id}: unknown related phrase drill ${phraseId}`)
    assert.ok(containsSequence(phrase.al, review.al),
      `${review.id}: ${phraseId} does not contain the reviewed expression`)
    assert.ok(review.focalSenseIds.every((id) => phrase.requires.includes(id)),
      `${review.id}: ${phraseId} omits a focal dictionary sense`)
    if (review.trainPolicy === COLLOQUIAL_TRAIN_POLICIES.CONTEXTUAL) {
      assert.ok(wordSequence(phrase.al).length > wordSequence(review.al).length,
        `${review.id}: context-dependent expression is exposed as a bare phrase drill`)
    }
  }

  if (review.trainPolicy === COLLOQUIAL_TRAIN_POLICIES.PRODUCTIVE) {
    assert.ok(review.phraseIds.length > 0 || review.focalSenseIds.some(isTrainableSense),
      `${review.id}: productive policy has no real Train route`)
  }
  if (review.trainPolicy === COLLOQUIAL_TRAIN_POLICIES.STORY_ONLY) {
    assert.equal(review.phraseIds.length, 0, `${review.id}: story-only review names a phrase drill`)
    assert.ok(!EVERYDAY_PHRASE_DRILLS.some((phrase) => containsSequence(phrase.al, review.al)),
      `${review.id}: story-only expression leaked into productive phrase Train`)
    assert.ok(!EVERYDAY_PHRASE_DRILLS.some((phrase) =>
      review.blockedProductiveSenseIds.some((id) => phrase.requires.includes(id))),
    `${review.id}: a productive phrase requires its receptive-only sense`)
  }
}

for (const id of RECEPTIVE_COLLOQUIAL_IDS) {
  const classification = lexicalTrainability(id)
  assert.equal(classification.kind, LEXICAL_TRAINABILITY_KIND.RECEPTIVE_COLLOQUIAL,
    `${id}: receptive colloquial id has the wrong lexical classification`)
  assert.equal(classification.trainable, false, `${id}: receptive colloquial id can enter word Train`)
  const reviews = COLLOQUIAL_EXPRESSION_REVIEWS.filter((entry) =>
    entry.blockedProductiveSenseIds.includes(id))
  assert.ok(reviews.length > 0, `${id}: receptive colloquial id has no blocked story review`)
  assert.ok(reviews.every(({ trainPolicy }) => trainPolicy === COLLOQUIAL_TRAIN_POLICIES.STORY_ONLY),
    `${id}: receptive colloquial id is not consistently story-only`)
}

// Coarse and hyperbolic dialogue may characterize an NPC, but an ordinary
// story choice must not silently coach the player to say it.
for (const review of COLLOQUIAL_EXPRESSION_REVIEWS.filter((entry) =>
  entry.register === COLLOQUIAL_REGISTERS.COARSE ||
  entry.meaningMode === COLLOQUIAL_MEANING_MODES.HYPERBOLIC)) {
  assert.ok(!choiceSurfaces.some(({ al }) => containsSequence(al, review.al)),
    `${review.id}: coarse or hyperbolic expression appears as player choice text`)
}

// Reuse the story's normal reachability convention. Two different early NPC
// hubs must carry this material so one banter scene cannot masquerade as broad
// first-village conversation coverage.
const depths = new Map([[START_NODE, 0]])
const queue = [START_NODE]
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const nodeId = queue[cursor]
  const nextDepth = depths.get(nodeId) + 1
  for (const option of STORY[nodeId]?.options || []) {
    if (option.confuser || !option.to || depths.has(option.to)) continue
    depths.set(option.to, nextDepth)
    queue.push(option.to)
  }
}
const earlyHubIds = Object.values(CONVERSATION_HUBS)
  .filter(({ nodeId }) => (depths.get(nodeId) ?? Infinity) <= 7)
  .filter(({ nodeId }) => COLLOQUIAL_EXPRESSION_REVIEWS.some((review) =>
    (expressionHits.get(review.id) || []).some((hit) => hit.nodeId === nodeId)))
  .map(({ id }) => id)
assert.ok(new Set(earlyHubIds).size >= COLLOQUIAL_EARLY_HUB_MINIMUM,
  `colloquial language reaches ${new Set(earlyHubIds).size} early conversation hub(s), ` +
  `target >= ${COLLOQUIAL_EARLY_HUB_MINIMUM}`)

const storyOnlyCount = COLLOQUIAL_EXPRESSION_REVIEWS.filter(({ trainPolicy }) =>
  trainPolicy === COLLOQUIAL_TRAIN_POLICIES.STORY_ONLY).length
console.log(`✓ ${COLLOQUIAL_EXPRESSION_REVIEWS.length} colloquial expressions are publicly grounded across ` +
  `${new Set(earlyHubIds).size} early hubs; ${storyOnlyCount} sensitive expressions remain story-only.`)
