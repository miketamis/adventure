import assert from 'node:assert/strict'
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
assert.match(feminineExample.pattern, /common feminine -ë.+-ë → -a → -ën → -ës/)
assert.ok(feminineExample.peer, 'common feminine class needs a second reviewed noun example')
assert.notEqual(feminineExample.peer.id, 'vajze')
assert.deepEqual(
  feminineExample.peer.rows.map((row) => row.al.slice(commonPrefix(feminineExample.peer.rows.map((item) => item.al)).length)),
  ['ë', 'a', 'ën', 'ës'],
  'common feminine peer does not share the exact four-ending signature',
)

assert.equal(buildNounEndingRefresher('vajze', 'invented form'), null)
assert.equal(buildNounEndingRefresher('not-a-noun', 'vajzën'), null)

console.log(`✅ noun-ending refreshers: ${checked} reviewed forms across ${Object.keys(NOUN_FORMS).length} nouns`)
