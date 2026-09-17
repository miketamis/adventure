// Every structured action must establish what it presupposes before selection
// and show its identity-preserving immediate consequence after selection.
// Accompaniment is the first required semantic kind; the fact schema is shared
// with future participant, object, posture, motion, opportunity, and state uses.
import assert from 'node:assert/strict'
import { HEART_LEVELS, ITEMS, STORY } from '../src/game/content.js'
import { attachReviewedOptionReadings } from '../src/game/data/readings/reviewedOptionReadings.js'
import { albanianTextOf } from '../src/game/language.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import {
  NAVIGATION_AFFORDANCE_EVIDENCE_KINDS,
  accompanimentLeadReview,
  accompanimentSemantics,
  actionSemanticContinuityIssues,
  semanticFact,
  sharedActionSemantics,
  soloNavigationAffordanceReview,
  transportSemantics,
  withSemanticFacts,
} from '../src/game/actionSemantics.js'

attachReviewedOptionReadings(STORY, ITEMS, HEART_LEVELS)

const token = (id) => ({ id, al: id, en: id })
const source = withSemanticFacts(
  [token('guide'), token('invite')],
  semanticFact('participant', 'guide', ['guide']),
  semanticFact('opportunity', 'guided-walk', ['invite']),
)
const destination = withSemanticFacts(
  [token('guide'), token('walk')],
  semanticFact('participant', 'guide', ['guide']),
  semanticFact('motion', 'guided-walk', ['walk']),
)
const validFixture = {
  here: {
    id: 'here', text: [source], options: [{
      text: [token('shko'), token('me'), token('guide')],
      to: 'there',
      actionSemantics: accompanimentSemantics('guided-walk', ['guide']),
    }],
  },
  there: { id: 'there', text: [{ cond: 'from:here', line: destination }], options: [] },
}
assert.deepEqual(actionSemanticContinuityIssues(validFixture), [], 'valid semantic continuity fixture failed')

const missingMetadata = structuredClone(validFixture)
delete missingMetadata.here.options[0].actionSemantics
assert.ok(actionSemanticContinuityIssues(missingMetadata).some((issue) => issue.includes('lacks actionSemantics')),
  'candidate completeness fixture did not fail closed')

const staleMetadata = structuredClone(validFixture)
staleMetadata.here.options[0].text = [token('shko')]
assert.ok(actionSemanticContinuityIssues(staleMetadata).some((issue) => issue.includes('stale accompaniment metadata')),
  'stale accompaniment fixture did not fail closed')

const duplicateFacts = structuredClone(validFixture)
duplicateFacts.here.options[0].actionSemantics.prerequisites.push(
  structuredClone(duplicateFacts.here.options[0].actionSemantics.prerequisites[0]),
)
assert.ok(actionSemanticContinuityIssues(duplicateFacts).some((issue) => issue.includes('duplicate facts')),
  'duplicate prerequisite fixture did not fail closed')

const hiddenSourceFact = structuredClone(validFixture)
hiddenSourceFact.here.text[0] = { cond: 'flag:guide-ready', line: hiddenSourceFact.here.text[0] }
assert.ok(actionSemanticContinuityIssues(hiddenSourceFact).some((issue) => issue.includes('not guaranteed')),
  'conditional source fact fixture did not fail closed')

const invalidSharedAction = structuredClone(validFixture)
invalidSharedAction.here.options[0].actionSemantics = structuredClone(sharedActionSemantics('guided-walk', ['guide']))
invalidSharedAction.here.options[0].actionSemantics.participantIds = []
assert.ok(actionSemanticContinuityIssues(invalidSharedAction).some((issue) => issue.includes('shared-action requires unique participantIds')),
  'invalid shared-action schema fixture did not fail closed')

const invalidTransport = structuredClone(validFixture)
invalidTransport.here.options[0].actionSemantics = structuredClone(transportSemantics('guided-walk', ['pack']))
invalidTransport.here.options[0].actionSemantics.objectIds = []
assert.ok(actionSemanticContinuityIssues(invalidTransport).some((issue) => issue.includes('transport requires unique objectIds')),
  'invalid transport schema fixture did not fail closed')

const reasonlessClassification = structuredClone(validFixture)
delete reasonlessClassification.here.options[0].actionSemantics
reasonlessClassification.here.options[0].semanticLeadClassification = { kind: 'temporal', reason: '' }
assert.ok(actionSemanticContinuityIssues(reasonlessClassification).some((issue) => issue.includes('inline semantic lead classifications are forbidden')),
  'reasonless lead classification fixture did not fail closed')

const staleClassification = structuredClone(reasonlessClassification)
staleClassification.here.options[0].text = [token('shko')]
staleClassification.here.options[0].semanticLeadClassification.reason = 'narrow reviewed exception'
assert.ok(actionSemanticContinuityIssues(staleClassification).some((issue) => issue.includes('inline semantic lead classifications are forbidden')),
  'stale lead classification fixture did not fail closed')

const directFollow = structuredClone(validFixture)
directFollow.here.options[0].text.optionReading = 'Follow the guide.'
delete directFollow.here.options[0].actionSemantics
assert.ok(actionSemanticContinuityIssues(directFollow).some((issue) => issue.includes('lacks actionSemantics')),
  'direct follow wording bypassed structured continuity')

for (const reading of [
  'Accompany the guide.',
  'Join the guide.',
  'Go alongside the guide.',
  'Set out beside the guide.',
]) {
  const adversarialLead = structuredClone(validFixture)
  adversarialLead.here.options[0].text = Object.assign([token('guide')], { optionReading: reading })
  delete adversarialLead.here.options[0].actionSemantics
  assert.ok(actionSemanticContinuityIssues(adversarialLead).some((issue) => issue.includes('lacks actionSemantics')),
    `'${reading}' bypassed structured accompaniment continuity`)
}

const albanianAccompaniment = structuredClone(validFixture)
albanianAccompaniment.here.options[0].text = [token('shoqeron'), token('guide')]
delete albanianAccompaniment.here.options[0].actionSemantics
assert.ok(actionSemanticContinuityIssues(albanianAccompaniment).some((issue) => issue.includes('lacks actionSemantics')),
  'shoqeron bypassed structured accompaniment continuity')

const forgedSpeechLead = structuredClone(validFixture)
forgedSpeechLead.here.options[0].text.optionReading = 'Follow the guide.'
forgedSpeechLead.here.options[0].intent = 'speech'
forgedSpeechLead.here.options[0].playerIntents = ['speech']
delete forgedSpeechLead.here.options[0].actionSemantics
assert.equal(accompanimentLeadReview(forgedSpeechLead.here.options[0]).resolution, 'unresolved',
  'speech metadata suppressed a physical follow lead')
assert.ok(actionSemanticContinuityIssues(forgedSpeechLead).some((issue) => issue.includes('lacks actionSemantics')),
  'speech metadata allowed a physical follow lead to bypass continuity')

const spokenAgreement = structuredClone(validFixture.here.options[0])
spokenAgreement.text.optionReading = 'No. I am coming with you now.'
spokenAgreement.intent = 'speech'
spokenAgreement.playerIntents = ['speech']
delete spokenAgreement.actionSemantics
assert.equal(accompanimentLeadReview(spokenAgreement).resolution, 'speech-only',
  'a first-person spoken departure agreement was mistaken for physical movement')

const joinDance = structuredClone(validFixture.here.options[0])
joinDance.text = Object.assign([token('dance')], { optionReading: 'Join the round dance.' })
delete joinDance.actionSemantics
assert.equal(accompanimentLeadReview(joinDance).lead, false,
  'joining an activity was mistaken for accompanying a moving actor')

const unsupportedKind = structuredClone(validFixture)
unsupportedKind.here.options[0].actionSemantics.kind = 'banana'
assert.ok(actionSemanticContinuityIssues(unsupportedKind).some((issue) => issue.includes('actionSemantics.kind must be one of')),
  'unknown action semantic kind did not fail closed')

const wrongAccompanimentKind = structuredClone(validFixture)
wrongAccompanimentKind.here.options[0].actionSemantics = structuredClone(sharedActionSemantics('guided-walk', ['guide']))
assert.ok(actionSemanticContinuityIssues(wrongAccompanimentKind).some((issue) => issue.includes('must use accompaniment actionSemantics')),
  'an accompaniment lead accepted a weaker semantic kind')

const impossibleDestinationFact = structuredClone(validFixture)
impossibleDestinationFact.there.text[0].cond = ['from:here', 'flag:never-established']
assert.ok(actionSemanticContinuityIssues(impossibleDestinationFact).some((issue) => issue.includes('not guaranteed')),
  'destination evidence hidden behind an unentailed condition did not fail closed')

const ambientEvidence = structuredClone(validFixture)
ambientEvidence.here.text[0].scenePriority = 'ambient'
assert.ok(actionSemanticContinuityIssues(ambientEvidence).some((issue) => issue.includes('not guaranteed')),
  'optional ambient prose incorrectly satisfied a required source fact')

const ungroundedTake = structuredClone(validFixture)
ungroundedTake.here.options[0] = {
  text: Object.assign([token('merr'), token('knife')], { optionReading: 'Take the knife.' }),
  to: 'there',
}
assert.ok(actionSemanticContinuityIssues(ungroundedTake).some((issue) => issue.includes('acquisition target is not established')),
  'an ungrounded acquisition did not fail closed')

const conditionalTake = structuredClone(validFixture)
conditionalTake.here.text = [{ cond: 'flag:knife-visible', line: [token('knife')] }]
conditionalTake.here.options[0] = {
  text: Object.assign([token('merr'), token('knife')], { optionReading: 'Take the knife.' }),
  unless: 'flag:knife-visible',
  grant: 'knife',
  playerIntents: ['acquisition'],
  to: 'there',
}
assert.ok(actionSemanticContinuityIssues(conditionalTake).some((issue) => issue.includes('acquisition target is not established')),
  'an acquisition used scene evidence hidden by an incompatible condition')

const entailedConditionalTake = structuredClone(conditionalTake)
entailedConditionalTake.here.options[0].requires = 'flag:knife-visible'
delete entailedConditionalTake.here.options[0].unless
assert.equal(actionSemanticContinuityIssues(entailedConditionalTake).some((issue) => issue.includes('acquisition')), false,
  'an acquisition rejected source evidence entailed by its own visibility gate')

const consequenceFreeTake = structuredClone(validFixture)
consequenceFreeTake.here.text = [[token('knife')]]
consequenceFreeTake.here.options[0] = {
  text: Object.assign([token('merr'), token('knife')], { optionReading: 'Take the knife.' }),
  playerIntents: ['acquisition'],
  to: 'there',
}
assert.ok(actionSemanticContinuityIssues(consequenceFreeTake).some((issue) => issue.includes('no canonical inventory effect or routed visible consequence')),
  'a canonical acquisition could silently lose its target after selection')

const hiddenDestination = {
  well: {
    id: 'well',
    text: [[token('pus')]],
    options: [{ text: [token('shko'), token('ne'), token('treg')], to: 'market' }],
  },
  market: { id: 'market', text: [[token('treg')]], options: [] },
}
const sharedPlace = { well: 'well', market: 'well' }
assert.ok(actionSemanticContinuityIssues(hiddenDestination, { placeOf: sharedPlace })
  .some((issue) => issue.includes('navigation affordance is unsupported')),
'a named market destination absent from the source scene bypassed solo-navigation continuity')
assert.equal(
  soloNavigationAffordanceReview(hiddenDestination, 'well', hiddenDestination.well.options[0], { placeOf: sharedPlace })
    .evidenceKinds.includes('visible-current-scene-cue'),
  false,
  'destination-only prose was accepted retroactively as source evidence',
)

const visibleDestination = structuredClone(hiddenDestination)
visibleDestination.well.text.push([token('treg')])
assert.equal(actionSemanticContinuityIssues(visibleDestination, { placeOf: sharedPlace })
  .some((issue) => issue.includes('navigation affordance')), false,
'a named destination visibly established in the source scene was rejected')
assert.ok(soloNavigationAffordanceReview(
  visibleDestination,
  'well',
  visibleDestination.well.options[0],
  { placeOf: sharedPlace },
).evidenceKinds.includes('visible-current-scene-cue'), 'visible source evidence was not classified')

const englishOnlyDestination = structuredClone(hiddenDestination)
englishOnlyDestination.well.options[0].text.optionReading = 'Go to the market visible beside the well.'
assert.ok(actionSemanticContinuityIssues(englishOnlyDestination, { placeOf: sharedPlace })
  .some((issue) => issue.includes('navigation affordance is unsupported')),
'English-only wording bypassed Albanian source-cue continuity')

const retroactiveReveal = structuredClone(hiddenDestination)
retroactiveReveal.well.options[0].reveal = 'treg'
assert.ok(actionSemanticContinuityIssues(retroactiveReveal, { placeOf: sharedPlace })
  .some((issue) => issue.includes('navigation affordance is unsupported')),
'a reveal found only at the destination was accepted as forward source evidence')
assert.ok(soloNavigationAffordanceReview(
  retroactiveReveal,
  'well',
  retroactiveReveal.well.options[0],
  { placeOf: sharedPlace },
).evidenceKinds.includes('genuine-recent-backtrack'),
'a reveal-gated edge did not expose its runtime recent-backtrack fallback classification')

const reciprocalDestination = structuredClone(hiddenDestination)
reciprocalDestination.market.options.push({ text: [token('kthehu')], to: 'well' })
assert.ok(actionSemanticContinuityIssues(reciprocalDestination, { placeOf: sharedPlace })
  .some((issue) => issue.startsWith('well.options[0]') && issue.includes('navigation affordance is unsupported')),
'a reverse graph edge was mistaken for proof of a genuine recent backtrack')

const genuineBacktrack = structuredClone(hiddenDestination)
genuineBacktrack.well.options[0] = {
  text: [token('kthehu')],
  requires: 'from:market',
  to: 'market',
}
assert.equal(actionSemanticContinuityIssues(genuineBacktrack, { placeOf: sharedPlace })
  .some((issue) => issue.startsWith('well.options[0]') && issue.includes('navigation')), false,
'an exact from:destination gate was not recognised as a genuine recent backtrack')
assert.ok(soloNavigationAffordanceReview(
  genuineBacktrack,
  'well',
  genuineBacktrack.well.options[0],
  { placeOf: sharedPlace },
).evidenceKinds.includes('genuine-recent-backtrack'), 'recent backtrack evidence was not classified')

const learnedRoute = structuredClone(hiddenDestination)
learnedRoute.well.options[0].requires = 'knows:market-route'
assert.equal(actionSemanticContinuityIssues(learnedRoute, { placeOf: sharedPlace })
  .some((issue) => issue.startsWith('well.options[0]') && issue.includes('navigation')), false,
'a canonical learned route condition was not recognised')
assert.ok(soloNavigationAffordanceReview(
  learnedRoute,
  'well',
  learnedRoute.well.options[0],
  { placeOf: sharedPlace },
).evidenceKinds.includes('learned-persistent-route'), 'learned persistent route evidence was not classified')

const canonicalExit = {
  room: { id: 'room', text: [[token('dhoma')]], options: [{ text: [token('dil'), token('jashte')], to: 'square' }] },
  square: { id: 'square', text: [[token('shesh')]], options: [] },
}
assert.equal(actionSemanticContinuityIssues(canonicalExit, { placeOf: { room: 'square', square: 'square' } })
  .some((issue) => issue.includes('navigation affordance')), false,
'a canonical current-place exit was rejected')
assert.ok(soloNavigationAffordanceReview(
  canonicalExit,
  'room',
  canonicalExit.room.options[0],
  { placeOf: { room: 'square', square: 'square' } },
).evidenceKinds.includes('canonical-current-place-exit'), 'canonical current-place exit evidence was not classified')

for (const [nodeId, optionIndex] of [['behuriJutbina', 1], ['argjiroKala', 0], ['kordhaMoat', 0]]) {
  assert.equal(accompanimentLeadReview(STORY[nodeId].options[optionIndex]).lead, true,
    `${nodeId}.options[${optionIndex}] was not discovered as a joint-movement lead`)
}

const eliraDeparture = STORY.bisedaFollowAgree.options[0]
assert.equal(eliraDeparture.actionSemantics, undefined,
  'Elira agreement falsely claims that accompaniment is already complete')
assert.equal(accompanimentLeadReview(eliraDeparture).resolution, 'not-a-lead',
  'Elira agreement must remain ordinary spoken consent before the separate crossing choice')
assert.equal(
  Object.values(STORY).flatMap((node) => node.options || [])
    .filter((option) => option.semanticLeadClassification).length,
  0,
  'production content must resolve lead candidates through canonical intent or action semantics, not inline exceptions',
)

const semanticEvidenceLines = Object.values(STORY).flatMap((node) => node.text || [])
  .map((entry) => Array.isArray(entry) ? entry : entry?.line)
  .filter((line) => Array.isArray(line) && line.semanticFacts?.length)
const bareNarrativeImperatives = new Set(['shko', 'zbrit', 'ngjit', 'ec', 'këndo', 'lufto', 'kalo', 'ik'])
const singularAfterPlural = new Set(['thotë', 'rri', 'ngre', 'vrapo'])
for (const line of semanticEvidenceLines) {
  const surface = albanianTextOf(line)
  const words = line.filter((token) => token?.id).map((token) => String(token.al || '').toLocaleLowerCase('sq'))
  for (let index = 0; index < words.length - 1; index++) {
    assert.equal(words[index] === 'ti' && bareNarrativeImperatives.has(words[index + 1]), false,
      `semantic evidence uses an imperative as second-person narration: ${surface}`)
    assert.equal(words[index] === 'me' && words[index + 1] === 'ajo', false,
      `semantic evidence uses an uninflected pronoun after 'me': ${surface}`)
    assert.equal(['vëllezërit', 'fëmijët', 'motrat'].includes(words[index]) && singularAfterPlural.has(words[index + 1]), false,
      `semantic evidence uses a singular or imperative verb with a plural subject: ${surface}`)
  }
}

const issues = actionSemanticContinuityIssues(STORY, { placeOf: PLACE_OF })
assert.deepEqual(issues, [], `action semantic continuity failures:\n${issues.join('\n')}`)

const classified = Object.values(STORY).flatMap((node) => node.options || [])
  .filter((option) => option.actionSemantics).length
const navigationReviews = Object.entries(STORY).flatMap(([nodeId, node]) =>
  (node.options || []).map((option) => soloNavigationAffordanceReview(
    STORY,
    nodeId,
    option,
    { placeOf: PLACE_OF },
  ))).filter((review) => review.candidate)
const navigationEvidenceCounts = Object.fromEntries(NAVIGATION_AFFORDANCE_EVIDENCE_KINDS.map((kind) => [
  kind,
  navigationReviews.filter((review) => review.evidenceKinds.includes(kind)).length,
]))
console.log(
  `✅ action semantic continuity audited: ${classified} structured choice(s); `
  + `${navigationReviews.length} solo-navigation choice(s) `
  + `(${NAVIGATION_AFFORDANCE_EVIDENCE_KINDS.map((kind) => `${kind}=${navigationEvidenceCounts[kind]}`).join(', ')}); `
  + 'every joint-movement lead and solo route affordance resolved',
)
