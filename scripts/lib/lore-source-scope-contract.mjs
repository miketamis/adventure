import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STORY, lineOf } from '../../src/game/content.js'

const normalized = value => String(value || '').normalize('NFC').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
const beat = (tale, id) => tale?.beats?.find(item => item.id === id)
const line = (tale, beatId, ref) => beat(tale, beatId)?.lines?.find(item => item[0] === ref)
const notes = (tale, id) => (tale?.play?.divergences || []).filter(item => item.beat === id).map(item => item.note).join(' ')
const reference = (tale, role, url) => tale?.references?.some(item => item.role === role && item.url === url)
const tokenIds = tokens => (tokens || []).filter(token => token.id).map(token => token.id)

// These four reviews bind source scope to selected witnesses and the actual
// adaptation. They do not certify every tale by searching for reassuring words,
// and do not substitute a content hash for the source/quotation audits.
export function loreSourceScopeIssues(tales, sources, story = STORY) {
  const issues = []
  const require = (id, claim, condition) => { if (!condition) issues.push(`${id}: ${claim}`) }
  const n = tales.nastradin, c = tales.cuckoo, g = tales['goose-girl'], t = tales.tortoise
  const nSource = sources.nastradin || '', cSource = sources.cuckoo || '', gSource = sources['goose-girl'] || ''

  require('nastradin', 'selected 1954 source route or three-anecdote evidence changed',
    n?.albanian?.local === 'docs/references/pralla-1954-nastradini.sq.txt'
    && reference(n, 'source-text', 'https://doczz.net/doc/2729503/pralla-popullore-shqiptare')
    && ['Mushka me zog', 'Tre fiq në qerre', 'Lopa e Nastradinit'].every(title => nSource.includes(title))
    && /mushk.*me zog/i.test(line(n, 'mushka', '4.5')?.[2] || '')
    && /fiq/i.test(line(n, 'fiq', '6.1')?.[2] || '')
    && /lop/i.test(line(n, 'lopa', '7.1')?.[2] || ''))
  require('nastradin', 'coin judgment must remain separate from the selected 1954 anecdotes',
    /not the selected 1954 mule, fig and cow anecdotes/i.test(notes(n, 'gjyqi'))
    && /no selected local witness for this judgment is established/i.test(notes(n, 'gjyqi'))
    && /authored alternative/i.test(notes(n, 'gjyqi'))
    && !/in the selected witness Nastradin gives/i.test(notes(n, 'gjyqi')))
  require('nastradin', 'Borrow must remain a non-Albanian cauldron analogue',
    reference(n, 'analogue', 'https://www.gutenberg.org/files/16244/16244-h/16244-h.htm')
    && n.references.some(item => item.role === 'analogue' && /non-Albanian.*cauldron/i.test(item.note || '')))

  const song = beat(c, 'kenga')?.lines || []
  const partialSongEvidence = ['Qyqe, qyqe, paraqyqe!', 'Pe mu?', 'Pe ty?', 'Pe Gjonin, tyt vëlla,',
    'kë e therin posi ka?', 'Gjak në lugë,', 'mish në kupë,', 'nemi dy ato duar.']
  require('cuckoo', 'Hahn1854 partial Albanian song and its five aligned units must survive',
    c?.albanian?.local === 'docs/references/hahn-entstehung-des-kukuks.de-sq.txt'
    && /1854.*165/s.test(cSource)
    && partialSongEvidence.every(fragment => cSource.includes(fragment))
    && song.length === 5 && song.every((entry, index) => entry[0] === `3.${index + 1}` && typeof entry[2] === 'string' && entry[2].length > 4))
  require('cuckoo', 'partial song must not become either absent Albanian or a complete narrative',
    c?.albanian?.status === 'missing'
    && /no complete Albanian narrative text has been located for quotation in this project/i.test(c.albanian.why)
    && /Greek-alphabet Albanian/i.test(c.albanian.why)
    && /1854.*preserves.*Greek-alphabet Albanian/i.test(notes(c, 'kenga'))
    && /eight verse lines as five sentence units/i.test(notes(c, 'kenga'))
    && /transliteration uncertainties/i.test(notes(c, 'kenga'))
    && /rather than.*verbatim Q\(\)/i.test(notes(c, 'kenga'))
    && !/no locatable Albanian original|no Albanian narrative text was ever published/i.test(`${notes(c, 'kenga')} ${c.albanian.why}`))

  // Raw Dozon spelling is evidence, not modern Albanian invented by the test.
  const dozon = normalized(gSource)
  require('goose-girl', 'Dozon testimony must retain counting, repeated hearing and her reply in order',
    g?.albanian?.local === 'docs/references/dozon-mbreti-mermerte.sq.txt'
    && dozon.includes('nœmœrônte') && dozon.includes('dû tri hérœ') && dozon.includes('psé kyân?')
    && /numëronte një nga një hallëtë/.test(line(g, 'counted', '4.11')?.[2] || '')
    && /si dëgjoi dy tri herë/.test(line(g, 'counted', '5.1')?.[2] || '')
    && /kshu kshu më gjanë/.test(line(g, 'counted', '5.2')?.[2] || '')
    && beat(g, 'counted').lines.map(entry => entry[0]).join('|') === '4.11|5.1|5.2')
  require('goose-girl', 'listening stone and game alternatives must not be attributed to Dozon',
    /listening stone.*game additions/i.test(notes(g, 'counted'))
    && /neither the stone.*Dozon's testimony device/i.test(normalized(notes(g, 'counted')))
    && /added listening stone in the game/i.test(g?.places?.find(item => item.id === 'gooseHut')?.anchor?.mirror || ''))
  require('goose-girl', 'second movement must cite pages40–41 of the selected facsimile',
    g?.references?.some(item => item.role === 'facsimile'
      && item.url === 'https://archive.org/details/manueldelalangue00dozouoft'
      && /pp\. 40[–-]41\./.test(item.note || ''))
    && /pp\. 40[–-]41/.test(g?.albanian?.source || ''))

  require('tortoise', 'modern selected telling and distinct variant must retain separate provenance',
    reference(t, 'selected-witness', 'https://prizrenpress.com/plaka-dhe-breshka/')
    && reference(t, 'variant', 'https://kohajone.com/kuriozitete/breshka-ne-letersi-mitologji-e-bestytni-shqiptare/')
    && /oral collection region not established/i.test(t?.origin?.region || '')
    && /no oral informant or collection date established/i.test(t?.origin?.collector || ''))
  require('tortoise', 'missing must describe the project corpus while preserving modern witnesses',
    t?.albanian?.status === 'missing'
    && /No reviewed public-domain Albanian narrative.*imported into the project/i.test(t.albanian.why)
    && /Modern Albanian witnesses are available/i.test(t.albanian.why)
    && t.beats.every(item => item.lines.every(entry => entry[2] == null)))
  require('tortoise', 'source bread and salt must remain a source fact, not be erased to match gameplay',
    /before her guest she set bread and salt/.test(line(t, 'dera', '2.2')?.[1] || '')
    && t?.items?.some(item => item.id === 'bukaKripa')
    && /bread and salt/.test(t?.cast?.find(item => item.id === 'plaka')?.note || ''))
  const setup = (story.breshka1?.text || []).filter(Array.isArray).map(tokenIds)
  const choices = (story.breshka1?.options || []).filter(option => !option.confuser)
  require('tortoise', 'actual game setup and choices must remain cooking, waiting, give meat or hide meat',
    setup.some(ids => ['buke', 'mish', 'behet'].every(id => ids.includes(id)))
    && setup.some(ids => ['prit', 'jashte'].every(id => ids.includes(id)))
    && !(story.breshka1?.text || []).some(entry => tokenIds(lineOf(entry)).includes('jep'))
    && choices.some(option => option.to === 'breshkaMire' && tokenIds(option.text).join('|') === 'jep|mish|mik')
    && choices.some(option => option.to === 'breshkaFund' && tokenIds(option.text).join('|') === 'fsheh|mish'))
  require('tortoise', 'game projection must acknowledge no prior gift and its added sharing alternative',
    /No gift has been made before the choice/i.test(t?.play?.role || '')
    && /starts before any gift/i.test(notes(t, 'dera'))
    && /sharing branch is a game alternative, not an ending found in the selected telling/i.test(notes(t, 'dera'))
    && /no bread or salt has already been given/i.test(t?.places?.find(item => item.id === 'shtepia')?.anchor?.mold || ''))
  require('tortoise', 'winding shell image must remain source commentary rather than a claimed enacted beat',
    /winding line.*guilt/.test(line(t, 'rrashta', '3.3')?.[1] || '')
    && /source commentary rather than an enacted beat/i.test(notes(t, 'rrashta'))
    && !Object.values(t?.play?.scenes || {}).flat().includes('rrashta'))
  return issues
}

export function assertLoreSourceScopeContracts(taleById) {
  const ids = ['nastradin', 'cuckoo', 'goose-girl', 'tortoise']
  const selected = Object.fromEntries(ids.map(id => [id, taleById[id]]))
  const sources = Object.fromEntries(ids.filter(id => id !== 'tortoise').map(id =>
    [id, readFileSync(selected[id].albanian.local, 'utf8')]))
  assert.deepEqual(loreSourceScopeIssues(selected, sources), [], 'selected source/adaptation scope changed')
  const mutations = [
    ['nastradin', tales => { tales.nastradin.play.divergences.find(item => /No selected local witness/.test(item.note)).note = 'In the selected witness Nastradin gives the clever sound-for-smell judgment.' }],
    ['nastradin', tales => { tales.nastradin.references.find(item => item.role === 'analogue').role = 'selected-witness' }],
    ['cuckoo', tales => { tales.cuckoo.play.divergences.find(item => item.beat === 'kenga').note = 'The song has no locatable Albanian original.' }],
    ['cuckoo', tales => { tales.cuckoo.albanian.status = 'transcribed' }],
    ['cuckoo', tales => { beat(tales.cuckoo, 'kenga').lines[0][2] = null }],
    ['goose-girl', tales => { tales['goose-girl'].play.divergences.find(item => item.beat === 'counted').note = 'Dozon makes the maiden tell her story to a listening stone.' }],
    ['goose-girl', tales => { tales['goose-girl'].references.find(item => item.role === 'facsimile').note = 'Second movement, pp. 41–45.' }],
    ['goose-girl', tales => { beat(tales['goose-girl'], 'counted').lines.reverse() }],
    ['tortoise', tales => { tales.tortoise.play.role = 'You have already given the guest bread and salt.' }],
    ['tortoise', tales => { line(tales.tortoise, 'dera', '2.2')[1] = 'The old woman has given no food to her guest.' }],
    ['tortoise', tales => { tales.tortoise.origin.region = 'pan-Albanian; collected in Prizren' }],
    ['tortoise', tales => { line(tales.tortoise, 'dera', '2.2')[2] = 'A modern passage must not become a quotation.' }],
    ['tortoise', tales => { tales.tortoise.play.divergences.find(item => item.beat === 'rrashta').note = 'The shell winding lines are shown in the playable ending.' }],
  ]
  for (const [id, mutate] of mutations) {
    const copy = structuredClone(selected)
    mutate(copy)
    assert.ok(loreSourceScopeIssues(copy, sources).some(issue => issue.startsWith(`${id}:`)),
      `${id}: contradictory source-scope mutation passed`)
  }
  for (const id of ['nastradin', 'cuckoo', 'goose-girl']) {
    assert.ok(loreSourceScopeIssues(selected, { ...sources, [id]: '' }).some(issue => issue.startsWith(`${id}:`)),
      `${id}: missing primary evidence passed`)
  }
  const changedStory = { ...STORY, breshka1: { ...STORY.breshka1,
    options: STORY.breshka1.options.map(option => option.to === 'breshkaMire'
      ? { ...option, text: option.text.map(token => token.id === 'mish' ? { ...token, id: 'buke' } : token) } : option) } }
  assert.ok(loreSourceScopeIssues(selected, sources, changedStory).some(issue => issue.startsWith('tortoise:')),
    'source bread gift cannot silently replace the actual game meat choice')
  return { scopes: ids.length, mutations: mutations.length + 4 }
}
