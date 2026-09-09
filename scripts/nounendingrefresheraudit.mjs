import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT } from '../src/game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { NOUN_FORMS } from '../src/game/nounForms.js'
import { phraseAnswerDiagnostic } from '../src/game/phrasePractice.js'
import {
  PHRASE_MIN_INTERVENING_ROUNDS,
  advancePhraseProduction,
  emptyPhraseProductionProgress,
  phraseProductionPlan,
} from '../src/game/phraseProgression.js'
import {
  buildNounEndingRefresher,
  NOUN_FORM_ROLE_LABELS,
  phraseNounEndingRefresher,
} from '../src/game/nounEndingRefresher.js'

let checked = 0
const exactKey = (form) => `${form.al}\u0000${form.tag}\u0000${form.gloss}`
const coreTags = ['indefNom', 'defNom', 'defAcc', 'defDat']
const commonPrefix = (surfaces) => {
  let prefix = surfaces[0] || ''
  for (const surface of surfaces.slice(1)) {
    let index = 0
    while (index < prefix.length && index < surface.length && prefix[index] === surface[index]) index += 1
    prefix = prefix.slice(0, index)
  }
  return prefix
}
const signatureOf = (forms) => {
  const rows = coreTags.map((tag) => forms.filter((form) => form.tag === tag))
  if (rows.some((matches) => matches.length !== 1)) return null
  const selected = rows.map(([form]) => form)
  const stem = commonPrefix(selected.map((form) => form.al))
  if (stem.length < 2) return null
  return {
    rows: selected,
    endings: selected.map((form) => form.al.slice(stem.length)),
  }
}

for (const [id, sourceForms] of Object.entries(NOUN_FORMS)) {
  assert.deepEqual(DICT[id]?.forms, sourceForms, `${id}: DICT is not using its nounForms paradigm`)
  const sourceKeys = new Set(sourceForms.map(exactKey))

  for (const target of sourceForms) {
    assert.ok(NOUN_FORM_ROLE_LABELS[target.tag], `${id}/${target.al}: unknown learner-facing role ${target.tag}`)
    const sheet = buildNounEndingRefresher(id, target.al, target.gloss)
    assert.ok(sheet, `${id}/${target.al}: no refresher generated`)
    assert.equal(exactKey(sheet.target), exactKey(target), `${id}/${target.al}: wrong target form`)
    assert.equal(sheet.target.role, NOUN_FORM_ROLE_LABELS[target.tag], `${id}/${target.al}: wrong target role`)
    assert.ok(sheet.pattern.length > 20, `${id}/${target.al}: missing narrow pattern guidance`)
    assert.equal(
      sheet.rows.filter((row) => row.missed).length,
      1,
      `${id}/${target.al}: target must be highlighted exactly once`,
    )
    assert.ok(
      sheet.rows.some((row) => row.missed && exactKey(row) === exactKey(target)),
      `${id}/${target.al}: highlighted row is not the missed form`,
    )
    for (const row of sheet.rows) {
      assert.ok(sourceKeys.has(exactKey(row)), `${id}/${target.al}: invented row ${row.al}/${row.tag}`)
      assert.equal(row.role, NOUN_FORM_ROLE_LABELS[row.tag], `${id}/${row.al}: missing exact role label`)
      assert.ok(row.learnerMeaning, `${id}/${row.al}: missing plain learner meaning`)
      assert.ok(
        row.example?.al.toLocaleLowerCase('sq').includes(row.al.toLocaleLowerCase('sq')),
        `${id}/${row.al}: Albanian example does not contain the exact reviewed form`,
      )
      assert.ok(row.example?.en && /[A-Za-z]/.test(row.example.en), `${id}/${row.al}: missing English example`)
    }

    const targetSignature = coreTags.includes(target.tag) ? signatureOf(sourceForms) : null
    const matchingPeers = targetSignature
      ? Object.entries(NOUN_FORMS).filter(([candidateId, candidateForms]) => {
          if (candidateId === id) return false
          const candidate = signatureOf(candidateForms)
          return candidate && candidate.endings.join('\u0000') === targetSignature.endings.join('\u0000')
        })
      : []
    assert.equal(
      Boolean(sheet.peer),
      matchingPeers.length > 0,
      `${id}/${target.al}: peer presence does not match exact four-role class support`,
    )
    if (sheet.peer) {
      assert.notEqual(sheet.peer.id, id, `${id}/${target.al}: target noun reused as its own example`)
      assert.equal(sheet.peer.rows.length, 4, `${id}/${target.al}: peer does not show all four roles`)
      const peerSource = NOUN_FORMS[sheet.peer.id]
      const peerSignature = signatureOf(peerSource)
      assert.deepEqual(sheet.ruleSignature?.tags, coreTags, `${id}/${target.al}: rule tags drifted`)
      assert.deepEqual(sheet.ruleSignature?.endings, targetSignature.endings, `${id}/${target.al}: target rule signature drifted`)
      assert.deepEqual(peerSignature.endings, targetSignature.endings, `${id}/${target.al}: peer ending signature differs`)
      assert.deepEqual(
        sheet.peer.rows.map(exactKey),
        peerSignature.rows.map(exactKey),
        `${id}/${target.al}: peer example is not its exact reviewed four-form row`,
      )
      for (const row of sheet.peer.rows) {
        assert.equal(row.role, NOUN_FORM_ROLE_LABELS[row.tag], `${id}/${target.al}: peer form has wrong role`)
      }
    } else if (coreTags.includes(target.tag)) {
      assert.match(sheet.pattern, /specific/i, `${id}/${target.al}: no-peer guidance is not explicitly narrowed`)
    }
    checked += 1
  }
}

const feminineExample = buildNounEndingRefresher('vajze', 'vajzën', 'the maiden (object)')
assert.deepEqual(
  feminineExample.rows.map((row) => row.al),
  ['vajzë', 'vajza', 'vajzën', 'vajzës'],
  'common feminine -ë correction lost its useful four-form chain',
)
assert.match(feminineExample.pattern, /common feminine -ë.+-ë for one\/a.+-a for the subject.+-ën for the object.+-ës for of\/to\/from/)
assert.ok(feminineExample.peer, 'common feminine class needs a second reviewed noun example')
assert.notEqual(feminineExample.peer.id, 'vajze')
assert.deepEqual(
  feminineExample.peer.rows.map((row) => row.al.slice(commonPrefix(feminineExample.peer.rows.map((item) => item.al)).length)),
  ['ë', 'a', 'ën', 'ës'],
  'common feminine peer does not share the exact four-ending signature',
)

const bridge = buildNounEndingRefresher('ure', 'urën', 'the bridge (object)')
assert.deepEqual(
  bridge.rows.map(({ al, role, learnerMeaning, example }) => ({ al, role, learnerMeaning, example })),
  [
    { al: 'urë', role: 'base form · one / a', learnerMeaning: 'a bridge', example: { al: 'një urë', en: 'a bridge' } },
    { al: 'ura', role: 'the noun · subject', learnerMeaning: 'the bridge', example: { al: 'Ura është këtu.', en: 'The bridge is here.' } },
    { al: 'urën', role: 'the noun · object', learnerMeaning: 'the bridge', example: { al: 'Shoh urën.', en: 'I see the bridge.' } },
    { al: 'urës', role: 'of / to / from the noun', learnerMeaning: 'of / to / from the bridge', example: { al: 'Pranë urës.', en: 'Near the bridge.' } },
  ],
  'bridge refresher does not clearly distinguish the four grammatical jobs',
)

const phraseBridge = phraseNounEndingRefresher(
  { focusId: 'ure', skill: 'production', tier: 3, mode: 'type', typeScope: 'phrase' },
  {
    correct: false,
    diagnostic: {
      kind: 'word',
      focusId: 'ure',
      expectedSurface: 'urën',
      answerSurface: 'ura',
    },
  },
)
assert.equal(phraseBridge.target.al, 'urën', 'phrase remediation did not use its exact contextual noun form')
assert.deepEqual(
  phraseBridge.rows.map((row) => row.al),
  ['urë', 'ura', 'urën', 'urës'],
  'phrase remediation did not reuse the exact noun/general-pattern sheet',
)
const focusSpellingBridge = phraseNounEndingRefresher(
  { focusId: 'ure', skill: 'production', tier: 2, mode: 'type', typeScope: 'word' },
  {
    correct: false,
    diagnostic: { kind: 'word', focusId: 'ure', expectedSurface: 'urën', answerSurface: 'ura' },
  },
)
assert.equal(focusSpellingBridge.target.al, 'urën', 'focus spelling lost the exact noun refresher')
assert.deepEqual(focusSpellingBridge.ruleSignature, phraseBridge.ruleSignature)

const goingVillage = EVERYDAY_PHRASE_DRILLS.find((phrase) => phrase.id === 'going-village')
const villageDiagnostic = phraseAnswerDiagnostic('po shkoj në fshati', goingVillage.al, goingVillage)
assert.equal(villageDiagnostic.expectedTag, 'indefAcc', 'the actual village phrase lost its reviewed object role')
const villageGuide = phraseNounEndingRefresher(
  { skill: 'production', tier: 3, mode: 'type', typeScope: 'phrase', target: goingVillage },
  { correct: false, diagnostic: villageDiagnostic },
)
assert.equal(villageGuide.target.al, 'fshat')
assert.equal(villageGuide.target.tag, 'indefAcc', 'the syncretic fshat surface guessed the wrong grammatical job')
const villageFocusIds = ['shko', 'fshat']
const villageReady = {
  ...emptyPhraseProductionProgress(),
  clozeWins: 2,
  clozeProofs: villageFocusIds,
  arrangeWins: 1,
  spellingProofs: villageFocusIds,
}
const villageMiss = advancePhraseProduction(villageReady, villageFocusIds, 10, {
  correct: false,
  skill: 'production',
  tier: 3,
  mode: 'type',
  typeScope: 'phrase',
  questionKey: 'going-village:noun-ending-test',
  diagnostic: villageDiagnostic,
  round: 10,
})
assert.equal(villageMiss.accepted, true)
assert.equal(villageMiss.progress.remediation.reason, 'word-form')
assert.equal(villageMiss.progress.remediation.focusId, 'fshat')
assert.equal(villageMiss.progress.remediation.stage, 2)
assert.equal(
  villageMiss.progress.remediation.dueAfterRound,
  10 + PHRASE_MIN_INTERVENING_ROUNDS,
  'noun-ending backoff did not preserve the disjoint-round delay',
)
assert.equal(phraseProductionPlan(villageMiss.progress, villageFocusIds, 10).due, false)
assert.equal(phraseProductionPlan(villageMiss.progress, villageFocusIds, 11).due, true)
assert.equal(
  phraseNounEndingRefresher(
    { focusId: 'shko', skill: 'production', tier: 3, mode: 'type', typeScope: 'phrase' },
    { correct: false, diagnostic: { kind: 'word', focusId: 'shko', expectedSurface: 'shkoj', answerSurface: 'shkon' } },
  ),
  null,
  'a non-noun phrase error opened noun-ending remediation',
)
assert.equal(
  phraseNounEndingRefresher(
    { focusId: 'ure' },
    { correct: true, diagnostic: { kind: 'word', focusId: 'ure', expectedSurface: 'urën' } },
  ),
  null,
  'a correct phrase opened noun-ending remediation',
)
assert.equal(
  phraseNounEndingRefresher(
    { focusId: 'ure', skill: 'production', tier: 0, mode: 'cloze', typeScope: 'word' },
    { correct: false, diagnostic: { kind: 'word', focusId: 'ure', expectedSurface: 'urën', answerSurface: 'ura' } },
  ),
  null,
  'a selection exercise opened the typed noun-ending correction sheet',
)
assert.equal(
  phraseNounEndingRefresher(
    { focusId: 'ure', skill: 'production', tier: 2, mode: 'type', typeScope: 'word' },
    { correct: false, diagnostic: { kind: 'word', focusId: 'ure', expectedSurface: 'urën', answerSurface: 'lumë' } },
  ),
  null,
  'a different noun was misdiagnosed as an ending error',
)

const refresherUi = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const refresherLogic = readFileSync(new URL('../src/game/nounEndingRefresher.js', import.meta.url), 'utf8')
assert.ok(refresherUi.includes('Same noun, different job'), 'plain same-noun framing is missing')
assert.ok(refresherUi.includes('Pattern to reuse'), 'transferable pattern is not separated from the exact noun')
assert.ok(!refresherUi.includes('noun-ending-chain'), 'misleading form ladder remains in the UI')
assert.ok(!refresherUi.includes('noun-ending-arrow'), 'unlabelled ending arrows remain in the UI')
assert.ok(!refresherUi.includes('→') && !refresherLogic.includes('→'), 'noun refresher still implies a required sequence')
assert.match(
  refresherUi,
  /const guide = phraseNounEndingRefresher\(q, result\)[\s\S]+stage: 'phrase-production'/,
  'wrong noun forms in phrase production do not open the shared next-screen refresher',
)
assert.match(
  refresherUi,
  /In that phrase you wrote[\s\S]+The needed form was/,
  'phrase correction does not connect the learner answer to the exact required form',
)

assert.equal(buildNounEndingRefresher('vajze', 'invented form'), null)
assert.equal(buildNounEndingRefresher('not-a-noun', 'vajzën'), null)

console.log(`✅ noun-ending refreshers: ${checked} reviewed forms across ${Object.keys(NOUN_FORMS).length} nouns`)
