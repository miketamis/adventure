import { readFileSync } from 'node:fs'
import { FOLKLORE, AREA_ACHIEVEMENTS, CORPUS } from '../../src/game/folklore.js'
import zanas from '../../src/game/data/tales/mujo-zanas.js'
import tortoise from '../../src/game/data/tales/tortoise.js'

const local = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')
const normalized = (value) => String(value).normalize('NFC').replace(/[’‘]/g, "'").replace(/\s+/g, ' ')
const reference = (name) => `docs/references/${name}`
const witnessNames = [
  'nopcsa-aus-shala-und-klementi.de.txt', 'durham-high-albania-1908.en.txt',
  'palaj-kurti-martesa-e-mujit.sq.txt', 'rozafa-legjenda-e-rozafes.sq.txt',
  'cam-balada-murimit-ura-e-artes.sq.txt', 'pralla-1954-nastradini.sq.txt',
]
const canonical = () => ({
  folklore: FOLKLORE, areas: AREA_ACHIEVEMENTS, corpus: CORPUS,
  handbook: local('docs/albanian-folklore.md'),
  witnesses: Object.fromEntries(witnessNames.map((name) => [name, local(reference(name))])),
})

// Exact reviewed claim relationships, not a seal over changing prose. These
// checks join the public card/reward to the selected witness and reject the
// concrete conflations corrected in this checkpoint.
export function loreSummaryScopeIssues(data = canonical()) {
  const issues = []
  const require = (ok, target, message) => { if (!ok) issues.push(`${target}: ${message}`) }
  const card = (id) => {
    const rows = data.folklore.filter((entry) => entry.id === id)
    require(rows.length === 1, id, 'expected one reviewed public card')
    return rows[0] || { summary: '', sources: [] }
  }
  const matches = (id, pattern, message) => require(pattern.test(card(id).summary), id, message)
  const rejects = (id, pattern, message) => require(!pattern.test(card(id).summary), id, message)
  const linked = (id, suffix) => require(card(id).sources?.some(({ url }) => url.endsWith(suffix)), id, `missing public source link ${suffix}`)
  const excerpt = (name, text) => require(normalized(data.witnesses[name] || '').includes(normalized(text)), name, `missing claim evidence: ${text}`)

  excerpt(witnessNames[0], 'in Dibra ist er jedoch unbekannt')
  excerpt(witnessNames[0], 'kann allein den festen Boden nicht verlassen')
  excerpt(witnessNames[1], 'Men and male animals can become Drangonis')
  excerpt(witnessNames[2], 'Se na i kemi tri dhi t’egra,')
  excerpt(witnessNames[2], 'I kanë brinat prej dukatit,')
  excerpt(witnessNames[2], 'Se me dalë kush me na i xanë,')
  excerpt(witnessNames[2], 'Grimë forcejet ne s’na jet!')
  excerpt(witnessNames[3], 'syrin e djathtë të ma lini jashtë')
  excerpt(witnessNames[4], 'të dridhesh si dridhem unë.')
  excerpt(witnessNames[5], 'Tre fiq në qerre')
  excerpt(witnessNames[5], 'Lopa e Nastradinit e marrimi i botës')

  matches('ora', /some Albanian traditions[\s\S]*vary by region/i, 'regional belief became universal')
  matches('ora', /Nopcsa[\s\S]*Shala[\s\S]*Dibra/, 'regional qualification lost its source/location')
  rejects('ora', /Every Albanian/, 'universal ethnic claim returned')
  linked('ora', witnessNames[0])
  matches('drangue', /human and animal forms/, 'animal variants omitted')
  matches('drangue', /Nopcsa[\s\S]*bull[\s\S]*on the ground/, 'earthbound variant omitted')
  rejects('drangue', /almost always wins/, 'unfounded outcome frequency returned')
  linked('drangue', witnessNames[0]); linked('drangue', witnessNames[1])
  for (const [id, sourceId] of [['ora', 'src-nopcsa'], ['drangue', 'src-nopcsa'], ['drangue', 'src-durham']]) {
    require(data.corpus.find((source) => source.id === sourceId)?.covers.includes(id), id, `source coverage missing in ${sourceId}`)
  }

  const goatScope = /In The Marriage of Gjeto Basho Mujo, the three Zanas lose their strength if someone catches their three golden-horned wild goats\./
  matches('zana-e-malit', goatScope, 'goat condition is not bound to the song and trio')
  linked('zana-e-malit', witnessNames[2])
  linked('zana-e-malit', 'palaj-kurti-fuqia-e-mujit.sq.txt')
  require(zanas.cast.find(({ id }) => id === 'zanat')?.name === 'the three zanas', 'zana-e-malit', 'selected song no longer identifies the trio')
  const river = data.areas.filter(({ id }) => id === 'area-river')
  require(river.length === 1 && goatScope.test(river[0].blurb), 'area-river', 'reward lost the specific goat condition')
  require(river.length === 1 && /strength song[\s\S]*cares for their children/.test(river[0].blurb), 'area-river', 'milk reward lost its source-specific cause')
  require(river.length === 1 && !/matched only|her strength lives|She blesses/.test(river[0].blurb), 'area-river', 'universal power/blessing returned')

  matches('rozafa', /telling followed by the game[\s\S]*Other recorded immurement tellings differ/, 'selected telling and variant boundary missing')
  rejects('rozafa', /attested 1505|hymn to|Accepting her fate/, 'unproven version date or editorial moral returned')
  linked('rozafa', witnessNames[3])
  matches('ura-e-artes', /selected Çam ballad[\s\S]*old wayfarer[\s\S]*Kiço[\s\S]*tremble as she trembles[\s\S]*wishes for her son/, 'selected ballad sequence drifted')
  rejects('ura-e-artes', /curses then blesses|talking bird/, 'different synopsis/variant merged into selected ballad')
  linked('ura-e-artes', witnessNames[4])
  matches('maro-perhitura', /ending in which Maro remains a bird; these are alternatives to the source sequence/, 'game-only bird ending attributed to source')

  matches('tortoise', /Hajdar Mallaku[\s\S]*modern retelling[\s\S]*PrizrenPress[\s\S]*2022/, 'selected modern witness unqualified')
  matches('tortoise', /gives[\s\S]*bread and salt[\s\S]*hides the meat/, 'actual source gift was erased')
  matches('tortoise', /game begins before any gift[\s\S]*sharing the meat as an alternative/, 'source gift/game alternative conflated')
  for (const role of ['selected-witness', 'variant']) {
    const expected = tortoise.references.find((entry) => entry.role === role)
    require(Boolean(expected) && card('tortoise').sources.some(({ url }) => url === expected.url), 'tortoise', `${role} public bibliography differs from tale`)
  }
  matches('nastradin', /game adapts the cauldron and sound-for-smell[\s\S]*wider repertoire[\s\S]*selected 1954 Albanian text[\s\S]*different anecdotes[\s\S]*mule[\s\S]*figs[\s\S]*cow/, '1954 source and game repertoire conflated')
  matches('nastradin', /Borrow is linked here as a cauldron analogue, not as evidence for the coin judgment/, 'cauldron analogue misused for coin provenance')
  linked('nastradin', witnessNames[5])
  linked('nastradin', '/16244-h/16244-h.htm')
  require(!/Every Albanian is \*\*born with an Ora|hymn to the \*\*besa|Drangue \(almost\) always/.test(data.handbook), 'handbook', 'retired universal/moral claim remains in public documentation')
  return issues
}

export function reviewedLoreSummaryChecks() {
  const data = canonical()
  const issues = loreSummaryScopeIssues(data)
  const mutations = [
    ['ora', (d) => { d.folklore.find((e) => e.id === 'ora').summary = 'Every Albanian is born with an Ora.' }],
    ['drangue', (d) => { d.folklore.find((e) => e.id === 'drangue').summary = 'A semi-human winged hero who almost always wins.' }],
    ['zana-e-malit', (d) => { d.folklore.find((e) => e.id === 'zana-e-malit').summary = 'Every Zana keeps her strength in three goats.' }],
    ['area-river', (d) => { d.areas.find((e) => e.id === 'area-river').blurb = 'Her strength lives in three wild goats.' }],
    ['rozafa', (d) => { d.folklore.find((e) => e.id === 'rozafa').summary += ' A hymn to the besa, attested 1505.' }],
    ['ura-e-artes', (d) => { d.folklore.find((e) => e.id === 'ura-e-artes').summary += ' She curses then blesses the bridge.' }],
    ['maro-perhitura', (d) => { const c = d.folklore.find((e) => e.id === 'maro-perhitura'); c.summary = c.summary.replace('alternatives to the source sequence', 'the traditional conclusion') }],
    ['tortoise', (d) => { d.folklore.find((e) => e.id === 'tortoise').sources = [] }],
    ['nastradin', (d) => { d.folklore.find((e) => e.id === 'nastradin').summary = 'The 1954 Albanian text tells the cauldron and coin judgments.' }],
    [witnessNames[0], (d) => { d.witnesses[witnessNames[0]] = '' }],
    ['handbook', (d) => { d.handbook += '\nEvery Albanian is **born with an Ora**.' }],
  ]
  for (const [target, mutate] of mutations) {
    const changed = structuredClone(data)
    mutate(changed)
    if (!loreSummaryScopeIssues(changed).some((issue) => issue.startsWith(`${target}:`))) {
      issues.push(`${target}: reviewed-claim mutation was not rejected`)
    }
  }
  return issues
}
