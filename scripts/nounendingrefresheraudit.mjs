import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT } from '../src/game/content.js'
import { NOUN_FORMS } from '../src/game/nounForms.js'
import {
  buildNounEndingRefresher,
  NOUN_FORM_ROLE_LABELS,
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
    } else {
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
assert.match(feminineExample.pattern, /common feminine -ë.+-ë for one\/a.+-a for the subject.+-ën for the object.+-ës for of\/to/)
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
    { al: 'urës', role: 'to / of the noun', learnerMeaning: 'of / to the bridge', example: { al: 'Pranë urës.', en: 'Near the bridge.' } },
  ],
  'bridge refresher does not clearly distinguish the four grammatical jobs',
)

const refresherUi = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const refresherLogic = readFileSync(new URL('../src/game/nounEndingRefresher.js', import.meta.url), 'utf8')
assert.ok(refresherUi.includes('Same noun, different job'), 'plain same-noun framing is missing')
assert.ok(refresherUi.includes('Pattern to reuse'), 'transferable pattern is not separated from the exact noun')
assert.ok(!refresherUi.includes('noun-ending-chain'), 'misleading form ladder remains in the UI')
assert.ok(!refresherUi.includes('noun-ending-arrow'), 'unlabelled ending arrows remain in the UI')
assert.ok(!refresherUi.includes('→') && !refresherLogic.includes('→'), 'noun refresher still implies a required sequence')

assert.equal(buildNounEndingRefresher('vajze', 'invented form'), null)
assert.equal(buildNounEndingRefresher('not-a-noun', 'vajzën'), null)

console.log(`✅ noun-ending refreshers: ${checked} reviewed forms across ${Object.keys(NOUN_FORMS).length} nouns`)
