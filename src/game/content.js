// ---------------------------------------------------------------------------
// DICTIONARY
// Each entry is one word/sense. `id` is the sense id (discovery + mana are keyed
// on it). `al` is the Albanian lemma surface, `en` is the English gloss.
// A word with multiple senses simply gets multiple entries with different ids.
// ---------------------------------------------------------------------------
export const DICT = {
  ti:        { al: 'ti',        en: 'you' },
  je:        { al: 'je',        en: 'are' },
  ne:        { al: 'në',        en: 'in' },
  nje:       { al: 'një',       en: 'a' },
  pyll:      { al: 'pyll',      en: 'forest' },
  madh:      { al: 'madh',      en: 'big' },
  sheh:      { al: 'sheh',      en: 'see' },
  rruge:     { al: 'rrugë',     en: 'road' },
  ec:        { al: 'ec',        en: 'walk' },
  fle:       { al: 'fle',       en: 'sleep' },
  ketu:      { al: 'këtu',      en: 'here' },
  dhe:       { al: 'dhe',       en: 'and' },
  shtepi:    { al: 'shtëpi',    en: 'house' },
  ka:        { al: 'ka',        en: 'has' },
  dere:      { al: 'derë',      en: 'door' },
  hap:       { al: 'hap',       en: 'open' },
  ik:        { al: 'ik',        en: 'flee' },
  brenda:    { al: 'brenda',    en: 'inside' },
  ujk:       { al: 'ujk',       en: 'wolf' },
  eshte:     { al: 'është',     en: 'is' },
  uritur:    { al: 'uritur',    en: 'hungry' },
  jep:       { al: 'jep',       en: 'give' },
  uje:       { al: 'ujë',       en: 'water' },
  shpejt:    { al: 'shpejt',    en: 'fast' },
  pi:        { al: 'pi',        en: 'drink' },
  behet:     { al: 'bëhet',     en: 'becomes' },
  mik:       { al: 'mik',       en: 'friend' },
  ke:        { al: 'ke',        en: 'have' },
  ri:        { al: 'ri',        en: 'new' },
  toke:      { al: 'tokë',      en: 'ground' },
  naten:     { al: 'natën',     en: 'night' },
  vjen:      { al: 'vjen',      en: 'comes' },
  zgjohu:    { al: 'zgjohu',    en: 'wake' },
  rri:       { al: 'rri',       en: 'stay' },
  qete:      { al: 'qetë',      en: 'calm' },
  perseri:   { al: 'përsëri',   en: 'again' },
  erret:     { al: 'errët',     en: 'dark' },
  ndiz:      { al: 'ndiz',      en: 'light' },
  zjarr:     { al: 'zjarr',     en: 'fire' },
  erresire:  { al: 'errësirë',  en: 'darkness' },
  ha:        { al: 'ha',        en: 'eats' },
  loja:      { al: 'loja',      en: 'the game' },
  mbaroi:    { al: 'mbaroi',    en: 'ended' },
  sigurt:    { al: 'sigurt',    en: 'safe' },
  humbet:    { al: 'humbet',    en: 'gets lost' },
  merr:      { al: 'merr',      en: 'take' },
  eliksir:   { al: 'eliksir',   en: 'potion' },
  // grammatical particles — shown word-for-word like any other word
  te_link:   { al: 'të',        en: 'of' },   // agreement particle: pyll të madh
  te_subj:   { al: 'të',        en: 'to' },   // subjunctive particle: mund të pi
  mund:      { al: 'mund',      en: 'can' },
  i_art:     { al: 'i',         en: 'the' },  // adjectival article: i uritur
  kerko:     { al: 'kërko',     en: 'search' },
  thesar:    { al: 'thesar',    en: 'treasure' },
  gjen:      { al: 'gjen',      en: 'finds' },
}

// ---------------------------------------------------------------------------
// TOKEN HELPERS
//   w(id)            -> word token, uses the dictionary surface/gloss
//   wf(id, al, en?)  -> word token with an inflected surface (same sense id)
//   p(en)            -> structural token (punctuation), rendered plainly, not discoverable
// ---------------------------------------------------------------------------
export const w = (id) => ({ id, al: DICT[id].al, en: DICT[id].en })
export const wf = (id, al, en) => ({ id, al, en: en ?? DICT[id].en })
export const p = (en) => ({ en, paren: true })

// shorthand: build a token line from a compact spec
const L = (...tokens) => tokens

// ---------------------------------------------------------------------------
// STORY GRAPH
// Each node: { id, text: [tokens], options: [{ text:[tokens], to }], end? }
// Answers are kept short and reuse story vocabulary.
// ---------------------------------------------------------------------------
export const START_NODE = 'start'

export const STORY = {
  start: {
    id: 'start',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('rruge'), w('dhe'), w('nje'), w('eliksir'), p('.')),
      L(w('ti'), w('mund'), w('te_subj'), w('pi'), w('eliksir'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('eliksir', 'eliksirin', 'the potion')), grant: 'potion', to: 'road' },
      { text: L(w('ec'), w('ne'), w('rruge')), to: 'road' },
      { text: L(w('fle'), w('ketu')), to: 'sleep' },
      { text: L(w('kerko'), w('thesar')), to: 'secret', secret: true },
    ],
  },

  road: {
    id: 'road',
    text: [
      L(w('ti'), w('ec'), w('dhe'), w('sheh'), w('nje'), w('shtepi'), p('.')),
      L(wf('shtepi', 'shtëpia', 'the house'), w('ka'), w('nje'), w('dere'), p('.')),
    ],
    options: [
      { text: L(w('hap'), wf('dere', 'derën', 'door')), to: 'house' },
      { text: L(w('ik'), w('shpejt')), to: 'forest2' },
      { text: L(w('kerko'), w('thesar')), to: 'secret', secret: true },
    ],
  },

  house: {
    id: 'house',
    text: [
      L(w('brenda'), w('eshte'), w('nje'), w('ujk'), w('te_link'), w('madh'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('eshte'), w('i_art'), w('uritur'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('uje')), to: 'friend' },
      { text: L(w('ik'), w('shpejt')), to: 'forest2' },
      { text: L(w('kerko'), w('thesar')), to: 'secret', secret: true },
    ],
  },

  friend: {
    id: 'friend',
    end: 'good',
    text: [
      L(wf('ujk', 'ujku', 'the wolf'), w('pi'), w('uje'), w('dhe'), w('behet'), w('mik'), p('.')),
      L(w('ti'), w('ke'), w('nje'), w('mik'), w('te_link'), w('ri'), p('.')),
    ],
    options: [],
  },

  sleep: {
    id: 'sleep',
    text: [
      L(w('ti'), w('fle'), w('ne'), w('toke'), p('.')),
      L(w('naten'), w('vjen'), w('nje'), w('ujk'), p('.')),
    ],
    options: [
      { text: L(w('zgjohu'), w('dhe'), w('ik')), to: 'forest2' },
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'eaten' },
      { text: L(w('kerko'), w('thesar')), to: 'secret', secret: true },
    ],
  },

  forest2: {
    id: 'forest2',
    text: [
      L(w('ti'), w('je'), w('perseri'), w('ne'), w('pyll'), p('.')),
      L(w('eshte'), w('erret'), p('.')),
    ],
    options: [
      { text: L(w('ndiz'), w('nje'), w('zjarr')), to: 'fire' },
      { text: L(w('ec'), w('ne'), w('erresire')), to: 'lost' },
      { text: L(w('kerko'), w('thesar')), to: 'secret', secret: true },
    ],
  },

  fire: {
    id: 'fire',
    end: 'good',
    text: [
      L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('te_link'), w('madh'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  eaten: {
    id: 'eaten',
    end: 'bad',
    text: [
      L(wf('ujk', 'ujku', 'the wolf'), w('ti'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  lost: {
    id: 'lost',
    end: 'bad',
    text: [
      L(w('ti'), w('humbet'), w('ne'), w('erresire'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  secret: {
    id: 'secret',
    end: 'good',
    text: [
      L(w('ti'), w('gjen'), w('nje'), w('thesar'), w('te_link'), w('madh'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },
}

// ---------------------------------------------------------------------------
// ITEMS — things you can carry in your inventory.
// `use.phrase` is the Albanian you must "say" to use the item: every word must be
// discovered and you must hold one training token per word, which are spent on use.
// ---------------------------------------------------------------------------
export const ITEMS = {
  potion: {
    id: 'potion',
    icon: '🧪',
    name: 'Potion',
    al: 'eliksir',
    blurb: 'Refreshes peak for 3 turns — hover a discovered Albanian word to see its English.',
    use: {
      label: 'Drink',
      phrase: [w('pi'), w('eliksir')], // "drink potion"
      effect: { peakTurns: 3 },
    },
  },
}

// All distinct sense ids that actually appear in the story (for practice pool).
export const ALL_SENSE_IDS = (() => {
  const ids = new Set()
  for (const node of Object.values(STORY)) {
    for (const line of node.text) for (const t of line) if (t.id) ids.add(t.id)
    for (const opt of node.options) for (const t of opt.text) if (t.id) ids.add(t.id)
  }
  return [...ids]
})()
