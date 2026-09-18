// Ending prose must describe the route the reducer actually accepted. Fixtures
// supply only vocabulary/practice resources; every story flag, role, item and
// arrival used as evidence below comes from a canonical player action.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STORY, lineOf } from '../src/game/content.js'
import {
  canChoose, currentStoryState, durationHoursOf, hasCond, isOptionRevealed, newRun, normalizeSavedState,
  trainablePhraseSenses, reducer, storyScenePresentationForState,
} from '../src/game/gameState.js'
import { embodimentIdentity, embodimentQuest } from '../src/game/embodiment.js'
import { canonicalPlayerActionId } from '../src/game/playerActionRuntime.js'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'
import { NODE_POS, PLACE_OF } from '../src/components/nodePositions.js'
import { NODE_REGION } from '../src/game/regions.js'
import {
  DEPARTURE_CONTEXTS, departureContextForChoice,
  isUnchartedStoryNode,
} from '../src/game/departureContexts.js'
import { departureContextIssues } from '../src/game/departureContextValidation.js'
import { routeForChoice } from '../src/game/worldModel.js'
import { departureContextForState, worldLocationForState } from '../src/game/worldLocation.js'
import { ACHIEVEMENT_BY_ID } from '../src/game/achievements.js'
import { testFor } from '../src/game/comprehension.js'
import { recordPresentedStoryReadings } from './lib/comprehension-journeys.mjs'
import { commitProjectedOption, settleProjectedState } from './lib/story-projections.mjs'

import { ENDING_LORE, FOLKLORE } from '../src/game/folklore.js'
import maroTale from '../src/game/data/tales/maro-perhitura.js'
import { checkKordhaGjizarCausality } from './lib/kordha-gjizar-causality-tests.mjs'
import { checkFourArcsCausality } from './lib/four-arcs-causality-tests.mjs'

// Earned outcomes must open this tale's source, including its optional exits.
// A creature card about the early mill episode cannot replace Maro's record.
const maroLore = FOLKLORE.find(({ id }) => id === maroTale.id)
assert.ok(maroLore, 'Maro endings have no library entry for their own tale')
assert.equal(maroLore.category, 'Folktale')
const maroWitness = maroTale.references.find(({ role }) => role === 'source-text')
assert.ok(maroWitness && maroLore.sources.some(({ url }) => url === maroWitness.url), 'Maro library entry lost its selected source witness')
const maroEndings = embodimentQuest(maroTale.id).endings
assert.equal(maroEndings.length, 7, 'Review Maro lore bindings when its terminal outcomes change')
for (const id of maroEndings) {
  assert.equal(ENDING_LORE[id], maroTale.id, `${id}: ending opens another tale or a generic creature card`)
  if (ACHIEVEMENT_BY_ID[id]) assert.equal(ACHIEVEMENT_BY_ID[id].lore, maroTale.id, `${id}: earned source panel is bound to the wrong tale`)
}

const visitedEdges = new Set()
const completed = new Map()
const certifiedStates = new Map()
const departures = new Map()
const trace = []
const at = (nodeId, clock = 13) => ({ ...newRun(), nodeId, clock })
const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const wordsReady = (state, option) => {
  const reveal = option.reveal
    ? resolveRevealLine(STORY[state.nodeId].text.map(lineOf), option).line : []
  const ids = new Set([...trainablePhraseSenses(option.text), ...trainablePhraseSenses(reveal || [])])
  const discovered = { ...state.discovered }, mana = { ...state.mana }, practiced = { ...state.practiced }
  for (const id of ids) {
    discovered[id] = true
    mana[id] = Math.max(20, mana[id] || 0)
    practiced[id] = Math.max(mana[id], practiced[id] || 0)
  }
  return { ...state, discovered, mana, practiced }
}
const take = (input, actionId, destination = null) => {
  const candidates = STORY[input.nodeId].options.filter((option) => !option.confuser &&
    canonicalPlayerActionId(input.nodeId, option) === actionId &&
    (!destination || option.to === destination))
  const playable = candidates.map((option) => ({ option, state: wordsReady(input, option) }))
    .filter(({ option, state }) => canChoose(currentStoryState(state), option))
  assert.equal(playable.length, 1, `${input.nodeId}: expected one legal ${actionId} -> ${destination || '*'}; trace ${trace.slice(-12).join(', ')}`)
  const { option } = playable[0]
  const before = recordPresentedStoryReadings(playable[0].state)
  const after = commitProjectedOption(before, option)
  assert.ok(after !== before, `${input.nodeId}: reducer rejected ${actionId}; visible=${isOptionRevealed(currentStoryState(before), option)}; reveal=${option.reveal}/${option.revealOccurrence || 1}`)
  assert.equal(after.nodeId, option.to, `${actionId}: wrong destination`)
  assert.equal(after.cameFrom, input.nodeId, `${actionId}: lost source`)
  assert.equal(after.choiceIndex, STORY[input.nodeId].options.indexOf(option), `${actionId}: lost exact source choice`)
  assert.equal(after.turn, before.turn + 1, `${actionId}: did not commit exactly once`)
  assert.ok(after.actionSpeech, `${actionId}: accepted action lost its karaoke handoff`)
  if (after.nodeId === 'maroPrincesha') departures.set(actionId, { before, after, option })
  visitedEdges.add(`${input.nodeId}:${after.choiceIndex}->${after.nodeId}`)
  trace.push(actionId)
  return recordPresentedStoryReadings(settleProjectedState(after))
}
const walk = (state, actions) => actions.reduce((current, action) =>
  Array.isArray(action) ? take(current, ...action) : take(current, action), state)
const finish = (label, state) => {
  assert.equal(state.ended, STORY[state.nodeId].end, `${label}: not a canonical ending`)
  completed.set(label, state)
  return state
}
const readings = (state) => storyScenePresentationForState(state).normalEntries
  .map(({ line }) => englishReadingOf(line)).join('\n')
const albanian = (state) => storyScenePresentationForState(state).normalEntries
  .map(({ line }) => albanianTextOf(line)).join('\n')

// Start at public tale thresholds, then enter roles using the real confirmation
// reducer. No fixture gives itself the oath, marriage, payment or child flags.
const prespa = take(at('pylli1'), 'pylli1:shko-tek-zane-prane-prespa')
assert.equal(hasCond(prespa, 'flag:prespaMarriageAccepted'), false)
finish('prespa-free-without-proposal', take(prespa, 'prespapyll:le-nereida'))
const proposed = take(prespa, 'prespa-propose-marriage')
assert.equal(hasCond(proposed, 'flag:prespaMarriageAccepted'), true)
finish('prespa-free-after-proposal', take(reload(proposed), 'prespapyll:le-nereida'))
finish('prespa-voluntary-wedding', take(proposed, 'prespapyll:shko-me-nereida-ne-dasme'))

const bride = take(at('gjarperOrigin'), 'gjarperorigin:marto-gjarper')
finish('serpent-disclosure', take(bride, 'gjarperburr1:fol-per-njeri'))
const silentSearch = walk(bride, [
  'gjarperburr1:rri-i-art-qete', 'gjarperburr2:kerko-njeri', 'gjarperkerkim:shko-ne-det',
])
assert.match(readings(silentSearch), /salt|water|Kulshedra/i, 'serpent search lost its concrete escape proposal')
finish('serpent-fight', take(silentSearch, 'gjarperkulshedra:lufto-kulshedra'))
const salt = take(silentSearch, 'gjarper-take-sea-salt')
assert.equal(salt.inventory.kripe, 1, 'serpent salt was not obtained through its real action')
finish('serpent-silence-and-salt', take(salt, 'gjarperkulshedra:jep-uje-me-kripe'))

const oathNight = walk(at('udhaKthimit'), [
  'udhakthimit:shko-ne-kala', 'observation:mist-castle-old-man',
  'kalamjegull:degjo-plak', 'rozafa-pledge-besa', 'kalabesa:shko-ne-shtepi',
])
const kept = take(oathNight, 'story:kala-nate:mban-bese')
assert.equal(hasCond(kept, 'flag:besaMbajtur'), true)
assert.equal(hasCond(kept, 'flag:rozafaWifeWarned'), false, 'silent action granted an unspoken warning')
assert.equal(embodimentIdentity(kept), 'the youngest brother')
const keptReloaded = reload(kept)
assert.equal(hasCond(keptReloaded, 'flag:besaMbajtur'), true, 'reload lost kept oath')
const youngestAtWall = take(keptReloaded, 'kalamengjes:shko-ne-kala')
const youngestWithdraw = finish('rozafa-youngest-withdrawal', take(youngestAtWall, 'kalangjitje:ik-nga-mur'))
assert.equal(embodimentIdentity(youngestWithdraw), 'the youngest brother', 'withdrawal rewrote the earlier brother identity')
finish('rozafa-youngest-stays', walk(youngestAtWall, [
  'kalangjitje:degjo-rozafa', 'kalalutje:ndihmo-mur', 'kalamur:sheh-mur',
]))
const warned = take(oathNight, 'rozafa-warn-wife')
assert.equal(hasCond(warned, 'flag:besaMbajtur'), false)
assert.equal(hasCond(warned, 'flag:rozafaWifeWarned'), true, 'actual warning did not persist positive evidence')
assert.equal(embodimentIdentity(warned), 'one of the elder brothers')
assert.match(albanian(warned), /Mos shko në kala në mëngjes\./,
  'night warning does not explicitly name the coming morning')
assert.doesNotMatch(albanian(warned), /nesër/i, 'after-midnight warning incorrectly says tomorrow')
const morningLines = storyScenePresentationForState(warned).normalEntries.map(({ line }) => line)
const warningIndex = morningLines.findIndex((line) => /You tell your wife.*She wakes\./.test(englishReadingOf(line)))
const dawnEntry = STORY.kalaMengjes.text.find((entry) => entry?.cond === 'became:dawn')
const dawnIndex = morningLines.indexOf(lineOf(dawnEntry))
const wifeHomeIndex = morningLines.findIndex((line) => /Your wife stays home\./.test(englishReadingOf(line)))
assert.ok(warningIndex >= 0 && dawnIndex > warningIndex && wifeHomeIndex > dawnIndex,
  `warning/waking must precede dawn, with the morning wife-home result afterward: ${JSON.stringify({ warningIndex, dawnIndex, wifeHomeIndex, nightClock: oathNight.clock, warningClock: warned.clock, taleClock: warned.embodimentClock, dawnEligible: hasCond(currentStoryState(warned), 'became:dawn'), lines: morningLines.map(englishReadingOf) })}`)
const observedMorning = take(reload(warned), 'observation:rozafa-dawn-road')
assert.equal(observedMorning.clock, warned.clock, 'looking at the dawn road took story time')
assert.equal(hasCond(observedMorning, 'flag:rozafaWifeWarned'), true, 'road observation erased the real warning')
assert.match(readings(observedMorning), /Your wife stays home\./, 'road observation erased the persistent wife-home consequence')
assert.doesNotMatch(readings(observedMorning), /You tell your wife|She wakes\./,
  'same-place road observation replayed the earlier spoken action and waking')
const elderAtWall = take(reload(observedMorning), 'kalamengjes:shko-ne-kala')
finish('rozafa-elder-withdrawal', take(elderAtWall, 'kalangjitje:ik-nga-mur'))
finish('rozafa-elder-after-wall', walk(elderAtWall, [
  'kalangjitje:degjo-rozafa', 'kalalutje:ndihmo-mur', 'kalamur:shko-nga-mur',
]))

const artaOffer = walk(at('uraVellezerit'), [
  'uravellezerit:une-jam-kico-vella-juaj', 'uraartes1:ure-cka-do-ti',
])
assert.equal(hasCond(artaOffer, 'flag:artaOathSworn'), false)
finish('arta-refused-oath', take(artaOffer, 'uraartes2:jo'))
const artaNight = walk(artaOffer, ['uraartes2:premto-bese', 'uraartes2:shko-ne-shtepi'])
assert.equal(hasCond(artaNight, 'flag:artaOathSworn'), true)
finish('arta-night-warning', walk(artaNight, [
  'arta-warn-bride', ['uramengjes:shko-tek-ure', 'uraArtesShpetim'],
]))
const artaPit = walk(artaNight, [
  'arta-keep-besa', ['uramengjes:shko-tek-ure', 'uraGropa'],
])
assert.equal(hasCond(artaPit, 'flag:besaArtes'), true)
finish('arta-pit-warning', take(artaPit, 'uragropa:ik'))

const giant = at('katallan1')
finish('katallan-fight', take(giant, 'katallan1:lufto-katallan'))
const blinded = walk(giant, [
  'katallan1:prit-naten', 'katallan1:sheh-zjarr',
  'katallanzjarr:bej-nje-hu', 'katallanzjarr:godit-me-hu',
])
finish('katallan-blinded-escape', take(reload(blinded), 'katallanverbim:ik-vetem'))

const seaBeauty = take(at('detiThelle1'), 'detithelle1:zbrit-ne-kala')
const seaAgreement = take(seaBeauty, 'sea-beauty-propose-marriage')
assert.equal(hasCond(seaAgreement, 'flag:seaBeautyMarriageAccepted'), true)
finish('sea-consenting-marriage', take(reload(seaAgreement), 'detithelle2:dil-nga-det-me-bukura'))
finish('sea-requested-help', walk(seaBeauty, ['sea-beauty-ask-help', 'detithelle2:shko-lart-me-bukura']))
finish('sea-well-rescue', walk(at('rene'), ['rene:degjo-bukura', 'rene:shko-lart-me-bukura']))

const eagle = finish('eagle-without-restored-water', walk(at('udhaKthimit'), [
  'udhakthimit:ec-rruge', 'shqipe1:ngjit-ne-fole', 'shqipe2:vrit-gjarper',
  'shqipe3:merr-zog', 'shqipebarter:jep-zog',
]))
for (const id of ['droughtBroken', 'riverRestored', 'villageWellsRestored']) {
  assert.equal(hasCond(eagle, `fact:${id}`), false, `eagle unexpectedly required ${id}`)
}

// Follow Maro from her public threshold through the mill and the wedding news.
// This establishes the role and every family/payment state through real play.
const maroNews = walk(at('maroShtepi', 16), [
  'maroshtepi:une-jam-maro', 'story:maro-nisja:merr-thes-me-drithe',
  'story:maro-nisja:merr-furke-dhe-li', 'maronisja:shko-ne-mulli-naten',
  'mulli1:hyr-ne-mulli-naten', 'story:maro-mulli1:ve-drithe-ne-mulli',
  'maromulli1:tjerr-li', 'maroxhindet1:kjo-ka-shume-mundim',
  'marolitani1:vazhdo-tregoj-furke', 'marolitani2:vazhdo-tregoj-si-behet-rroba',
  'marolitani3:shko-ne-shtepi', 'maroshtepi:xhind-jep-flori',
  'maro-sleep-while-lilo-goes', 'marolilokthim:prit-deri-ne-mbremje',
])
const weddingFromInn = (state) => walk(state, [
  'marohani:ik-para-mesnate', 'maroikja:shko-ne-shtepi', 'marokthyershtepi:prit',
])
const directWedding = weddingFromInn(take(maroNews, 'marolajmi:shko-drejt-ne-han'))
assert.equal(hasCond(directWedding, 'flag:maroFamilyPromised'), false)
finish('maro-leaves-wedding-alone', take(directWedding, 'marokrushqit:ik-pa-fjale'))
const palace = walk(directWedding, [
  'marokrushqit:premto-motra-dhe-njerke-vjen-afer', 'marokrushqit:shko-me-princ-ne-pallat',
])
assert.equal(hasCond(palace, 'flag:maroFamilyPromised'), true)
finish('maro-refuses-payment', walk(palace, [
  'maro-refuse-palace-payment', 'maropallati:ik-nga-pallat-para-se-femije-te-subj-lind',
]))
const midwife = walk(palace, ['maro-give-palace-coins', 'maropallati:prit-dhjete-dite'])
assert.equal(hasCond(midwife, 'flag:maroPalaceCoinsGiven'), true)
finish('maro-leaves-with-son', walk(reload(midwife), ['maro-refuse-strange-midwife', 'maro-leave-with-son']))
const recognition = (state) => walk(state, [
  'marogjilpera:thirr-mami', 'marolindja:fluturo-nga-dritare',
  'marozogu:fluturo-larg-ne-pyll', 'marokopshti:fluturo-ne-dore-e-link-tij',
])
finish('maro-recognition-without-coach', recognition(midwife))
const auntWedding = weddingFromInn(walk(maroNews, [
  'marolajmi:shko-tek-teto', 'story:maro-tetua:kap-dy-mi',
  'story:maro-tetua:merr-nje-kungull', 'marotetua:hip-ne-karroce-dhe-shko-ne-han',
]))
const auntMidwife = walk(auntWedding, [
  'marokrushqit:premto-motra-dhe-njerke-vjen-afer', 'marokrushqit:shko-me-princ-ne-pallat',
  'maro-give-palace-coins', 'maropallati:prit-dhjete-dite',
])
finish('maro-recognition-with-coach', recognition(auntMidwife))

// These source-specific helpers walk real choices and check the whole normal
// presentation, including portraits. Reuse their exact routes for the ending
// receipts/copy contract; synthetic terminal flags cannot stand in for a walk.
const causalExpectedVariants = {
  "kordhaMoatVdes": "solo-moat-leap",
  "kordhaZjarr": "palace-alone",
  "kordhaProvaVdes": "spring-hands",
  "kordhaFund": "blade-secret-kept",
  "kordhaDeti": "blade-returned",
  "gjizarKap": "palace-call",
  "gjizarUnazatLena": "rings-left",
  "gjizarVellezerRefuz": "brothers-declined",
  "gjizarPus": "well-stayed",
  "gjizarFund": "nightingale-restored",
  "bletaFund": "chosen-care",
  "merimangaFund": "chosen-weaving",
  "gjinkallaFund": "chosen-song",
  "agaYmerFund": "oath-return",
  "agaYmerStay": "stay-home",
  "rushaFund": "rusha-oath-request",
  "rushaKeq": "rusha-seizure",
  "balozFitore": "coast-victory",
  "bregHumb": "coast-flight"
}
const causalCompleted = new Map()
const checkCausalArc = (label, run) => {
  try { run() } catch (error) { throw new Error(`Tale causality: ${label}`, { cause: error }) }
}
for (const inspect of [checkKordhaGjizarCausality, checkFourArcsCausality]) {
  const result = await inspect(checkCausalArc)
  assert.ok(result?.completed instanceof Map && result?.visitedEdges instanceof Set,
    'causal arc audit did not return its real routes and edges')
  for (const [label, state] of result.completed) {
    assert.ok(!completed.has(label) && !causalCompleted.has(label), `${label}: duplicate route fixture`)
    assert.ok(causalExpectedVariants[state.nodeId], `${label}: unexpected causal ending`)
    causalCompleted.set(label, state)
    finish(label, state)
  }
  for (const edge of result.visitedEdges) visitedEdges.add(edge)
}
assert.deepEqual([...new Set([...causalCompleted.values()].map((state) => state.nodeId))].sort(),
  Object.keys(causalExpectedVariants).sort(), 'causal ending review omitted a branch')

// The lazy resolver/copy contract is checked below, once all independent route
// fixtures have demonstrated that production can actually reach each outcome.
const { endingCopyForState } = await import('../src/game/endingCopyForState.js')
const { ENDING_COPY, ENDING_COPY_VARIANTS, ENDING_COPY_REVIEWED_IDS } = await import('../src/game/endingCopy.js')

// Real public-route saves from the previous release must not reinterpret an
// old choice index as a newly authored act. Keep their world outcome, but use
// common recaps where these saves cannot prove the new request or stance.
const legacy77 = JSON.parse(readFileSync(new URL('./fixtures/story-causality-legacy77.json', import.meta.url), 'utf8'))
assert.equal(legacy77.sourceCommit, '77f9bcb7050bb3d5cac3066e04f5d2e1bb600883')
for (const [label, saved] of Object.entries(legacy77.saves)) {
  let state = normalizeSavedState({ ...newRun(), ...saved }, newRun())
  for (let pass = 0; pass < 3; pass++) {
    assert.equal(state.nodeId, saved.nodeId, `${label}: legacy location changed`)
    assert.equal(state.ended, saved.ended, `${label}: legacy outcome changed`)
    assert.deepEqual(state.worldFacts, saved.worldFacts, `${label}: legacy world consequence changed`)
    assert.equal(Boolean(state.flags.rushaOathRequested), false, `${label}: invented oath request`)
    assert.equal(Boolean(state.flags.stoodByGjergj), false, `${label}: invented stance`)
    assert.doesNotMatch(albanian(state), /ti kërkon një besë|ti rri pranë trimit/i,
      `${label}: legacy choice index narrated the replacement act`)
    if (saved.ended) assert.equal(endingCopyForState(state).variantId, 'common', `${label}: unproved live recap`)
    if (label === 'gjizar') {
      assert.match(albanian(state), /Gjizar këndon, dhe përralla mbaron me një dasmë\./, 'old Gjizar save has no neutral Albanian outcome')
      assert.doesNotMatch(albanian(state), /ti i tregon Bukurës|ti shkon me kalë|hipën në anije/i, 'old Gjizar save claims a newly authored answer or ride')
      assert.equal(worldLocationForState(state).kind, 'unknown', 'old Gjizar save invented the newly authored ship arrival')
    }
    state = reload(state)
  }
}

console.log(`Ending truth route fixtures: ${completed.size} real paths, ${visitedEdges.size} canonical edges`)

const reviewedIds = [
  'prespaFund', 'prespaLiri', 'gjarperBurrFund', 'gjarperBurrVdes', 'gjarperKulVdes',
  'kalaFundTurp', 'maroPrincesha', 'maroFundi', 'uraArtesShpetim', 'katallanVdes',
  'detiNuse', 'detiUp', 'shqipeFund',
  ...Object.keys(causalExpectedVariants),
]
assert.deepEqual([...ENDING_COPY_REVIEWED_IDS].sort(), [...reviewedIds].sort(),
  'ending truth review scope changed without route fixtures')
const expectedVariants = {
  ...Object.fromEntries([...causalCompleted].map(([label, state]) => [label, causalExpectedVariants[state.nodeId]])),
  'prespa-free-without-proposal': 'leave-nereida',
  'prespa-free-after-proposal': 'leave-nereida',
  'prespa-voluntary-wedding': 'accepted-marriage',
  'serpent-disclosure': 'secret-spoken',
  'serpent-fight': 'fight-kulshedra',
  'serpent-silence-and-salt': 'salt-water-escape',
  'rozafa-youngest-withdrawal': 'youngest-withdrawal',
  'rozafa-elder-withdrawal': 'elder-withdrawal',
  'rozafa-elder-after-wall': 'elder-after-walling',
  'arta-refused-oath': 'oath-refused',
  'arta-night-warning': 'warning-at-night',
  'arta-pit-warning': 'warning-at-pit',
  'katallan-fight': 'fight-giant',
  'katallan-blinded-escape': 'escape-alone',
  'sea-consenting-marriage': 'marriage-then-gift',
  'sea-requested-help': 'castle-ascent',
  'sea-well-rescue': 'black-water-ascent',
  'eagle-without-restored-water': 'eaglet-returned',
  'maro-leaves-wedding-alone': 'leave-wedding',
  'maro-refuses-payment': 'leave-before-birth',
  'maro-leaves-with-son': 'leave-with-son',
  'maro-recognition-without-coach': 'needle-removed',
  'maro-recognition-with-coach': 'needle-removed',
}
const usedVariants = new Set()
let certified = 0
for (const [label, state] of completed) {
  if (!expectedVariants[label]) continue // kept-oath Rozafa ending is unchanged
  const copy = endingCopyForState(state)
  assert.ok(copy?.title && copy?.blurb, `${label}: missing ending delivery`)
  assert.equal(copy.variantId, expectedVariants[label], `${label}: wrong live route copy`)
  usedVariants.add(`${state.nodeId}:${copy.variantId}`)
  assert.deepEqual(endingCopyForState(reload(state)), copy, `${label}: reload changed the live route`)
  if (state.eligible?.[state.nodeId]) {
    const attempt = state.attempts[state.nodeId] || 0
    const questions = testFor(ACHIEVEMENT_BY_ID[state.nodeId], attempt, state)
    assert.ok(questions?.length, `${label}: actual reading route cannot be certified`)
    const earned = reducer(state, {
      type: 'EARN_ACHIEVEMENT', id: state.nodeId, expectedAttempt: attempt,
      answers: questions.map((question) => question.correct),
    })
    assert.equal(earned.earned[state.nodeId], true, `${label}: canonical reading answers rejected`)
    certifiedStates.set(label, earned)
    assert.deepEqual(endingCopyForState(earned), copy, `${label}: certification changed the route recap`)
    assert.deepEqual(endingCopyForState(reload(earned)), copy, `${label}: earned reload lost the route recap`)
    certified++
  }
}
assert.deepEqual(Object.keys(expectedVariants).filter((label) => !completed.has(label)), [],
  'an expected story route was not walked')

// Earning a source card never grants access to the debug-only library. A stale
// normal-play click must leave the visible story and its accepted route intact.
const earnedMaro = reload(certifiedStates.get('maro-leaves-with-son'))
assert.equal(earnedMaro.debug, false)
assert.equal(earnedMaro.earned.maroPrincesha, true)
const openMaroLore = { type: 'OPEN_LORE', lore: maroTale.id }
assert.equal(reducer(earnedMaro, openMaroLore), earnedMaro,
  'normal earned ending can navigate into an invisible debug-only library')
const debugMaro = { ...earnedMaro, debug: true }
assert.deepEqual(reducer(debugMaro, openMaroLore), {
  ...debugMaro, view: 'debug', loreFocus: maroTale.id,
}, 'debug ending library navigation changed its route, reward or focus')

// No new incoming edge can inherit somebody else's recap silently. Every
// reviewed row has a real exact edge and was exercised by a complete path.
for (const id of reviewedIds) {
  const rows = ENDING_COPY_VARIANTS[id]
  assert.ok(Array.isArray(rows) && rows.length, `${id}: missing reviewed variants`)
  assert.equal(new Set(rows.map((row) => row.id)).size, rows.length, `${id}: duplicate variant id`)
  for (const row of rows) {
    assert.ok(row.id && row.from && row.actionId && row.blurb, `${id}: malformed variant`)
    assert.ok(Array.isArray(row.required) && Array.isArray(row.excluded), `${id}/${row.id}: missing condition arrays`)
    assert.equal(new Set(row.required).size, row.required.length, `${id}/${row.id}: duplicate requirement`)
    assert.equal(new Set(row.excluded).size, row.excluded.length, `${id}/${row.id}: duplicate exclusion`)
    assert.ok(row.required.every((condition) => !row.excluded.includes(condition)), `${id}/${row.id}: impossible condition pair`)
    const edges = STORY[row.from]?.options.filter((option) => !option.confuser && option.to === id &&
      canonicalPlayerActionId(row.from, option) === row.actionId) || []
    assert.equal(edges.length, 1, `${id}/${row.id}: variant is not bound to one canonical action/destination`)
    assert.ok(usedVariants.has(`${id}:${row.id}`), `${id}/${row.id}: no real route exercises this copy`)
  }
  for (const [sourceId, source] of Object.entries(STORY)) {
    for (const [index, option] of source.options.entries()) {
      if (option.confuser || option.to !== id) continue
      const actionId = canonicalPlayerActionId(sourceId, option)
      assert.ok(rows.some((row) => row.from === sourceId && row.actionId === actionId),
        `${sourceId}.options[${index}]->${id}: new incoming edge has no reviewed ending copy`)
      assert.ok(visitedEdges.has(`${sourceId}:${index}->${id}`),
        `${sourceId}.options[${index}]->${id}: ending arrival was never reached by a reducer walk`)
    }
  }
}

const copyFor = (label) => endingCopyForState(completed.get(label)).blurb
const includes = (label, expressions) => {
  for (const expression of expressions) assert.match(copyFor(label), expression, `${label}: missing necessary route claim`)
}
const excludes = (label, expressions) => {
  for (const expression of expressions) assert.doesNotMatch(copyFor(label), expression, `${label}: claims an unplayed event`)
}
includes('prespa-voluntary-wedding', [/propos/i, /Nereida agreed/i, /warning/i, /flood/i])
excludes('prespa-voluntary-wedding', [/seiz|coerc|held.*until|forced.*consent/i])
for (const label of ['prespa-free-without-proposal', 'prespa-free-after-proposal']) {
  includes(label, [/forest/i, /town remains standing/i])
  excludes(label, [/never (?:asked|proposed|won)|ruled alone|never.*agreed/i])
}
assert.equal(copyFor('prespa-free-without-proposal'), copyFor('prespa-free-after-proposal'),
  'shared freedom copy needlessly claims whether the optional proposal happened')
includes('serpent-silence-and-salt', [/kept.*secret/i, /searched/i, /give salt water to the captive man/i, /he returns home safely/i])
excludes('serpent-silence-and-salt', [/betray|iron shoes|bread crust|coffin|burn|you (?:both )?return.*together/i])
excludes('serpent-disclosure', [/forever|permanent|carry to the grave/i])
excludes('serpent-fight', [/sword|blade|both.*(?:died|dead|killed)/i])
includes('rozafa-youngest-withdrawal', [/kept silent/i, /leave the wall/i, /Rozafa.*sealed/i])
excludes('rozafa-youngest-withdrawal', [/you warned|your wife.*(?:stayed|hearth)|other brother.s wife|you.*(?:sealed her|broke.*oath|helped.*wall)/i])
includes('rozafa-elder-withdrawal', [/warned your wife/i, /leave the wall/i, /do not stay.*plea/i])
includes('rozafa-elder-after-wall', [/warned your wife/i, /heard her plea/i, /helped at the wall/i])
assert.notEqual(copyFor('rozafa-elder-withdrawal'), copyFor('rozafa-elder-after-wall'),
  'before/after wall work recaps collapsed')
includes('maro-leaves-wedding-alone', [/leave the wedding train alone/i, /prince does not follow/i])
excludes('maro-leaves-wedding-alone', [/your (?:son|child)|pregnan|princess|you (?:married|rule|ruled)|guarded palace/i])
includes('maro-refuses-payment', [/brought the stepfamily near/i, /refused the palace payment/i, /before your child is born/i, /safely away/i])
excludes('maro-refuses-payment', [/never.*(?:family|sisters).*near|never.*palace/i])
includes('maro-leaves-with-son', [/given the palace money/i, /refused the strange midwife/i, /son is born safely/i, /leave the palace with him/i])
excludes('maro-leaves-with-son', [/kept all.*(?:gold|money)|never.*family.*near|lady of the palace|rule.*palace/i])
for (const label of ['maro-recognition-without-coach', 'maro-recognition-with-coach']) {
  includes(label, [/open hands/i, /needle/i, /removes/i, /recognizes/i])
  excludes(label, [/pumpkin|coach|buried alive|live burial/i])
}
assert.equal(copyFor('maro-recognition-without-coach'), copyFor('maro-recognition-with-coach'),
  'recognition recap should not depend on the optional coach')
includes('arta-refused-oath', [/refuse.*before swearing/i, /unbuilt/i])
excludes('arta-refused-oath', [/you (?:broke|swore|warned)|broken oath|\bring\b/i])
includes('arta-night-warning', [/swore.*warned.*night/i, /stays home/i])
includes('arta-pit-warning', [/kept.*silence/i, /at the pit.*tell.*go away/i])
excludes('arta-pit-warning', [/ring.lie|already on your tongue|you (?:lied|sent her down|deceived her)/i])
includes('katallan-fight', [/you fight/i, /one hand/i, /eats you/i])
excludes('katallan-fight', [/blade|sword|blinded|escape alone/i])
includes('katallan-blinded-escape', [/has been blinded/i, /escape alone/i, /door/i])
excludes('katallan-blinded-escape', [/strength instead of cunning|you fight|blade|sword/i])
includes('sea-consenting-marriage', [/asked.*marry.*agreed/i, /dry land/i, /marry.*afterward.*golden hair/i])
excludes('sea-consenting-marriage', [/win.*(?:hair|bride)|pluck|seiz/i])
for (const label of ['sea-requested-help', 'sea-well-rescue', 'eagle-without-restored-water']) {
  excludes(label, [/drought|restor.*(?:water|spring|river|well)|broke.*thirst/i])
}
includes('eagle-without-restored-water', [/saved the eaglet/i, /gave the young bird back/i, /Son of the Eagle/i])

// Keep recap claims within the enacted arc. These checks deliberately name
// the earlier semantic errors, rather than snapshotting a whole prose bank.
const causalByEnding = new Map([...causalCompleted.values()].map((state) => [state.nodeId, state]))
const causalCopy = (id) => endingCopyForState(causalByEnding.get(id)).blurb
const orderedCopy = (id, expressions) => {
  const copy = causalCopy(id)
  let offset = 0
  for (const expression of expressions) {
    const match = expression.exec(copy.slice(offset))
    assert.ok(match, `${id}: missing/out-of-order recap event ${expression}`)
    offset += match.index + match[0].length
  }
}
orderedCopy('kordhaDeti', [/tell the Beauty/i, /crone steals/i, /collapse/i,
  /feather/i, /two brothers/i, /retrieves the blade/i, /wake whole/i])
assert.match(causalCopy('kordhaFund'), /one of the three sworn brothers/i)
assert.doesNotMatch(causalCopy('kordhaFund'), /four|like Kordha|new battle|fight again/i)
assert.doesNotMatch(causalCopy('kordhaZjarr'), /no single sword|any lone sword|only together/i)
orderedCopy('gjizarFund', [/climb the rope/i, /king.s men/i, /home/i, /unable to speak/i,
  /hear how/i, /day or two/i, /voice returns/i, /Gjizar sing/i, /ride with the bird/i, /Beauty.s ship/i, /she asks/i, /tell her the truth/i, /marry/i])
assert.doesNotMatch(causalCopy('gjizarFund'), /king pulled|Beauty.*(?:pulls|rescues)|age.suitable|Pedersen|pp\./i)
assert.match(causalCopy('gjizarPus'), /already taken Gjizar/i)
for (const id of ['bletaFund', 'merimangaFund', 'gjinkallaFund']) {
  assert.doesNotMatch(causalCopy(id), /mother.*(?:dies|dead)|cake|baked|\bother.*(?:spider|cicada|bee)/i)
}
orderedCopy('bletaFund', [/help her/i, /blesses/i, /become the bee/i])
orderedCopy('merimangaFund', [/make your carpet/i, /turns you into a spider/i])
orderedCopy('gjinkallaFund', [/You sing/i, /tells you/i, /become the cicada/i])
orderedCopy('agaYmerFund', [/return to captivity/i, /welcome/i, /releases/i, /return home/i])
assert.doesNotMatch(causalCopy('agaYmerStay'), /lived out|unforgiven|name left out|word spread|songs/i)
orderedCopy('rushaFund', [/ask Rusha/i, /She swears/i, /do as you say/i, /cup remains/i, /tower/i])
assert.doesNotMatch(causalCopy('rushaFund'), /free will|freely|consent|ride|Jutbina|marry|you swear|you (?:then )?drink/i)
assert.doesNotMatch(causalCopy('rushaKeq'), /cry|guard|stair|head left|singers.*say/i)
orderedCopy('balozFitore', [/horse knelt/i, /Gjergj struck/i, /embraces/i, /hearts stop/i, /one grave/i])
assert.doesNotMatch(causalCopy('balozFitore'), /you (?:laid|buried|intercept|beheaded)|hurled stone|dodged.*stone/i)
for (const id of Object.keys(causalExpectedVariants)) {
  assert.doesNotMatch(ENDING_COPY[id].blurb, /\byou(?:r)?\b/i,
    `${id}: common catalog copy attributes an unproved player act`)
  const state = causalByEnding.get(id)
  const row = ENDING_COPY_VARIANTS[id][0]
  for (const condition of row.required) {
    let missing
    if (condition.startsWith('flag:')) missing = { ...state, flags: { ...state.flags, [condition.slice(5)]: false } }
    else if (condition.startsWith('fact:')) missing = { ...state, worldFacts: { ...state.worldFacts, [condition.slice(5)]: false } }
    else missing = { ...state, inventory: { ...state.inventory, [condition]: 0 } }
    assert.equal(endingCopyForState(missing).variantId, 'common',
      `${id}: missing ${condition} still authorizes a route claim`)
  }
  for (const condition of row.excluded) {
    assert.ok(condition.startsWith('flag:'), `${id}: add exact contradiction probe for ${condition}`)
    const contradicted = { ...state, flags: { ...state.flags, [condition.slice(5)]: true } }
    assert.equal(endingCopyForState(contradicted).variantId, 'common',
      `${id}: contradictory ${condition} still authorizes a route claim`)
  }
}

// Inspect the same normal projected Albanian prose the player sees, not just
// the replacement English ending panel. A kept oath cannot show a broken-oath
// proverb or a wife kept home, and leaving with a son cannot become ruling.
assert.doesNotMatch(albanian(youngestWithdraw), /prishi besë|gruaja rri te vatra|gruas.*mos shko/i,
  'kept-oath withdrawal still displays elder warning/broken-besa Albanian')
assert.match(readings(youngestWithdraw), /leave.*wall/i, 'youngest withdrawal lacks its exact immediate consequence')
assert.doesNotMatch(readings(youngestWithdraw), /your wife.*(?:hearth|home)|you warned|you broke/i,
  'youngest withdrawal projects another brother’s consequence')
assert.match(readings(warned), /wife|woman/i, 'night warning does not establish its hearer before the ending')
assert.match(albanian(warned), /gruaja.*(?:zgjohet|rri)|gruas/i, 'night warning has no visible wife reaction')
assert.doesNotMatch(albanian(completed.get('maro-leaves-with-son')), /ti je zonja e pallatit/i,
  'leaving the palace still makes Maro its resident lady')
assert.match(readings(completed.get('maro-leaves-with-son')), /(?:leave|away).*palace/i,
  'son route does not visibly leave the palace')

// Missing, malformed and stale provenance must all use the same neutral
// catalog entry. A later run's branch flags cannot specialize collection copy.
for (const id of reviewedIds) {
  const state = [...completed.values()].find((candidate) => candidate.nodeId === id)
  const fallback = { ...ENDING_COPY[id], variantId: 'common' }
  for (const override of [
    { cameFrom: null }, { cameFrom: 'missing-scene' }, { choiceIndex: null },
    { choiceIndex: -1 }, { choiceIndex: 99999 }, { choiceIndex: 0.5 },
    { choiceIndex: String(state.choiceIndex) }, { choiceIndex: NaN },
    { choiceIndex: undefined }, { ended: null }, { ended: 'not-an-ending-kind' },
  ]) {
    const stale = { ...state, ...override }
    assert.deepEqual(endingCopyForState(stale), fallback,
      `${id}: stale/missing arrival guessed a route for ${JSON.stringify(override)}`)
    if (!Object.hasOwn(override, 'ended')) assert.deepEqual(endingCopyForState(reload(stale)), fallback,
      `${id}: save normalization reconstructed missing/stale route evidence`)
  }
  const anotherDestination = STORY[state.cameFrom].options.findIndex((option) => option.to !== id)
  if (anotherDestination >= 0) assert.deepEqual(endingCopyForState({ ...state, choiceIndex: anotherDestination }), fallback,
    `${id}: another option at the same source supplied unrelated route evidence`)
  const historical = {
    ...state, cameFrom: null, choiceIndex: null,
    flags: { ...state.flags, besaMbajtur: true, besaArtes: true, artaOathSworn: true,
      maroFamilyPromised: true, maroPalaceCoinsGiven: true, maroPaymentRefused: true,
      maroStrangeMidwifeRefused: true, prespaMarriageAccepted: true, seaBeautyMarriageAccepted: true },
  }
  assert.deepEqual(endingCopyForState(historical), fallback, `${id}: current flags specialized a historical catalog entry`)
}
for (const state of [null, undefined, {}, { nodeId: 'not-a-node' }]) {
  assert.equal(endingCopyForState(state), null, 'unknown ending invented fallback copy')
}
const artaSharedId = completed.get('arta-night-warning')
const pitIndex = STORY.uraMengjes.options.findIndex((option) => option.to === 'uraGropa')
assert.equal(canonicalPlayerActionId('uraMengjes', STORY.uraMengjes.options[pitIndex]),
  canonicalPlayerActionId('uraMengjes', STORY.uraMengjes.options[artaSharedId.choiceIndex]),
  'fixture no longer exercises a shared action id with different destinations')
assert.equal(endingCopyForState({ ...artaSharedId, choiceIndex: pitIndex }).variantId, 'common',
  'shared action id bypassed the exact destination check')

for (const [label, flag] of [
  ['prespa-voluntary-wedding', 'prespaMarriageAccepted'],
  ['sea-consenting-marriage', 'seaBeautyMarriageAccepted'],
  ['sea-requested-help', 'seaBeautyHelpAccepted'],
  ['arta-night-warning', 'artaOathSworn'],
]) {
  const state = completed.get(label)
  const flags = { ...state.flags }
  delete flags[flag]
  const noEvidence = { ...state, flags }
  assert.equal(endingCopyForState(noEvidence).variantId, 'common', `${label}: missing consent/oath still claimed it`)
  const legacy = { ...noEvidence, inventory: { ...noEvidence.inventory, [flag]: 1 } }
  assert.deepEqual(endingCopyForState(legacy), endingCopyForState(state),
    `${label}: legacy canonical flag compatibility drifted from hasCond`)
}
for (const [label, removedFlag] of [
  ['rozafa-youngest-withdrawal', 'besaMbajtur'],
  ['rozafa-elder-withdrawal', 'rozafaWifeWarned'],
  ['rozafa-elder-after-wall', 'rozafaWifeWarned'],
]) {
  const state = completed.get(label)
  const flags = { ...state.flags }
  delete flags[removedFlag]
  const missingEvidence = { ...state, flags }
  const common = { ...ENDING_COPY.kalaFundTurp, variantId: 'common' }
  assert.deepEqual(endingCopyForState(missingEvidence), common,
    `${label}: missing positive evidence was misread as the opposite night action`)
  assert.deepEqual(endingCopyForState(reload(missingEvidence)), common,
    `${label}: save normalization inferred an unrecorded warning/oath`)
  assert.equal(embodimentIdentity(missingEvidence), embodimentIdentity(oathNight),
    `${label}: missing branch evidence guessed a brother identity`)
  assert.equal(embodimentIdentity(reload(missingEvidence)), embodimentIdentity(oathNight),
    `${label}: reload guessed a brother identity without positive evidence`)
  assert.doesNotMatch(albanian(missingEvidence), /prishi besë|gruaja rri te vatra/i,
    `${label}: Albanian inferred a wife warning from absent oath evidence`)
}
const contradictoryRozafa = {
  ...youngestWithdraw, flags: { ...youngestWithdraw.flags, rozafaWifeWarned: true },
}
assert.equal(embodimentIdentity(contradictoryRozafa), embodimentIdentity(oathNight),
  'contradictory oath/warning evidence arbitrarily chose one brother')
assert.equal(endingCopyForState(contradictoryRozafa).variantId, 'common',
  'contradictory oath/warning evidence arbitrarily chose one recap')
assert.equal(embodimentIdentity(reload(contradictoryRozafa)), embodimentIdentity(oathNight),
  'reload chose one of two contradictory identities')
for (const state of [contradictoryRozafa, reload(contradictoryRozafa)]) {
  assert.doesNotMatch(albanian(state), /besa është mbajtur|rozafa është gruaja jote|prishi besë/i,
    'normal Albanian chose a brother from contradictory oath/warning evidence')
}
for (const [state, flag] of [[youngestWithdraw, 'besaMbajtur'], [completed.get('rozafa-elder-withdrawal'), 'rozafaWifeWarned']]) {
  const flags = { ...state.flags }
  delete flags[flag]
  const legacy = { ...state, flags, inventory: { ...state.inventory, [flag]: 1 } }
  assert.equal(embodimentIdentity(legacy), embodimentIdentity(state),
    'legacy positive identity evidence disagrees with canonical branch')
}
for (const id of ['kalaFundTurp', 'maroPrincesha', 'uraArtesShpetim', 'katallanVdes']) {
  const common = ENDING_COPY[id].blurb
  assert.doesNotMatch(common, /you (?:warned|swore|fought|blinded|married|refused|helped)|your wife|your son/i,
    `${id}: shared catalog asserts one route without an arrival`)
}
for (const id of ['detiUp', 'shqipeFund']) assert.doesNotMatch(ENDING_COPY[id].blurb, /drought|restor.*(?:spring|river|well)/i)
assert.doesNotMatch(ENDING_COPY.prespaFund.blurb, /seiz|until she consented/i)
assert.doesNotMatch(ENDING_COPY.gjarperBurrFund.blurb, /iron shoes|coffin|bread crust|burn/i)
assert.doesNotMatch(ENDING_COPY.maroFundi.blurb, /pumpkin|coach|buried alive/i)

// One shared ending can describe departures from different places. Its chart
// location must therefore derive only the known origin from the exact arrival,
// leave the unnamed destination unknown, and preserve each authored duration.
assert.deepEqual(departureContextIssues(STORY), [], 'departure context registry is invalid')
assert.equal(isUnchartedStoryNode('maroPrincesha'), true)
assert.equal(NODE_POS.maroPrincesha, undefined, 'Maro departure retains an invented fixed destination')
assert.equal(PLACE_OF.maroPrincesha, undefined, 'Maro departure still aliases one branch’s physical place')
assert.equal(NODE_REGION.maroPrincesha, undefined, 'Maro departure guesses a destination region')
const departureCases = [
  ['maro-leaves-wedding-alone', 'maroKrushqit', 'marokrushqit:ik-pa-fjale', 0],
  ['maro-refuses-payment', 'maroPallati', 'maropallati:ik-nga-pallat-para-se-femije-te-subj-lind', 1],
  ['maro-leaves-with-son', 'maroGjilpera', 'maro-leave-with-son', 1],
]
assert.deepEqual(DEPARTURE_CONTEXTS.filter(({ to }) => to === 'maroPrincesha').map(({ from }) => from).sort(),
  departureCases.map(([, from]) => from).sort(), 'Maro departure registry changed without reviewed route fixtures')
for (const [label, from, actionId, duration] of departureCases) {
  const state = completed.get(label)
  const { before, after, option } = departures.get(actionId)
  const snapshot = JSON.stringify(state)
  const context = departureContextForState(state, STORY)
  assert.ok(context, `${label}: exact arrival lost its departure context`)
  assert.equal(context.from, from)
  assert.equal(context.actionId, actionId)
  assert.equal(context.durationHours, duration)
  assert.equal(departureContextForChoice(from, option, STORY), context)
  assert.equal(departureContextForChoice(from, { ...option }, STORY), null,
    `${label}: a caller-owned option supplied departure evidence`)
  assert.equal(after.clock - before.clock, duration, `${label}: reducer applied a fictitious journey duration`)
  assert.equal(durationHoursOf(option, from), duration, `${label}: timing helper disagrees with real action`)
  const location = worldLocationForState(state)
  assert.deepEqual(location, {
    kind: 'uncharted', nodeId: 'maroPrincesha', placeId: null, regionId: null, position: null,
    departureId: context.id, originNodeId: from,
    originPlaceId: PLACE_OF[from], originRegionId: NODE_REGION[from],
  }, `${label}: location did not preserve exact origin and unknown destination`)
  assert.deepEqual(worldLocationForState(reload(state)), location, `${label}: reload changed departure geography`)
  assert.equal(JSON.stringify(state), snapshot, `${label}: location lookup wrote shadow state`)
  const route = routeForChoice(from, option)
  assert.equal(route.valid, true)
  assert.equal(route.charted, false)
  assert.equal(route.spatial, true)
  assert.equal(route.fromPlace, PLACE_OF[from])
  assert.equal(route.fromRegion, NODE_REGION[from])
  for (const field of ['toPlace', 'toRegion', 'distance', 'direction', 'vector', 'dx', 'dy']) {
    assert.equal(route[field], null, `${label}: route invented ${field} for an unnamed destination`)
  }
  assert.deepEqual(route.duration, { kind: 'hours', hours: duration })
  const wrongIndex = STORY[from].options.findIndex((candidate) => candidate.to !== state.nodeId)
  for (const override of [{ cameFrom: null }, { cameFrom: 'missing-node' },
    { choiceIndex: null }, { choiceIndex: String(state.choiceIndex) },
    { choiceIndex: 99999 }, { choiceIndex: wrongIndex }]) {
    const stale = { ...state, ...override }
    assert.equal(departureContextForState(stale, STORY), null, `${label}: stale arrival guessed a departure`)
    const unknown = worldLocationForState(stale)
    assert.equal(unknown.kind, 'unknown')
    for (const field of ['placeId', 'regionId', 'position', 'departureId', 'originNodeId', 'originPlaceId', 'originRegionId']) {
      assert.equal(unknown[field], null, `${label}: missing arrival inferred ${field}`)
    }
    assert.deepEqual(worldLocationForState(reload(stale)), unknown, `${label}: reload invented missing geography`)
  }
}

console.log(`✅ ending truth: ${completed.size} reducer paths, ${visitedEdges.size} canonical edges, ${usedVariants.size} live variants, ${certified} reading certifications, reload and neutral fallbacks`)

// Explicit local browser-QA export only; release checks do not create fixtures.
if (process.argv.includes('--write-browser-fixtures')) {
  const { writeFile } = await import('node:fs/promises')
  for (const [label, path] of [
    ['rozafa-youngest-withdrawal', '/tmp/ending-youngest-save.json'],
    ['maro-leaves-with-son', '/tmp/ending-maro-son-save.json'],
  ]) {
    await writeFile(path, `${JSON.stringify(certifiedStates.get(label), null, 2)}\n`)
    console.log(`Browser fixture: ${path}`)
  }
}
