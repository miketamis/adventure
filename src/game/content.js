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
  // genus / qualifier words used to build dictionary definitions
  njeri:     { al: 'njeri',     en: 'person' },
  kafshe:    { al: 'kafshë',    en: 'animal' },
  vend:      { al: 'vend',      en: 'place' },
  peme:      { al: 'pemë',      en: 'tree' },
  leng:      { al: 'lëng',      en: 'liquid' },
  drite:     { al: 'dritë',     en: 'light' },
  gje:       { al: 'gjë',       en: 'thing' },
  fjale:     { al: 'fjalë',     en: 'word' },
  kohe:      { al: 'kohë',      en: 'time' },
  ushqim:    { al: 'ushqim',    en: 'food' },
  sy:        { al: 'sy',        en: 'eyes' },
  kembe:     { al: 'këmbë',     en: 'legs' },
  fuqi:      { al: 'fuqi',      en: 'power' },
  rrezik:    { al: 'rrezik',    en: 'danger' },
  e_art:     { al: 'e',         en: 'the' },   // feminine adjectival article
  jo:        { al: 'jo',        en: 'not' },
  pa:        { al: 'pa',        en: 'without' },
  me:        { al: 'me',        en: 'with' },
  shume:     { al: 'shumë',     en: 'many' },
  mire:      { al: 'mirë',      en: 'good' },
  vogel:     { al: 'vogël',     en: 'small' },
  vjeter:    { al: 'vjetër',    en: 'old' },
  ngadale:   { al: 'ngadalë',   en: 'slow' },
  poshte:    { al: 'poshtë',    en: 'below' },
  larg:      { al: 'larg',      en: 'far' },
  jashte:    { al: 'jashtë',    en: 'outside' },
  ku:        { al: 'ku',        en: 'where' },
  qe:        { al: 'që',        en: 'that' },
  do:        { al: 'do',        en: 'wants' },
  bej:       { al: 'bëj',       en: 'make' },
  luan:      { al: 'luan',      en: 'plays' },
  mbyll:     { al: 'mbyll',     en: 'close' },
  zhurme:    { al: 'zhurmë',    en: 'noise' },
  tani:      { al: 'tani',      en: 'now' },
  tjeter:    { al: 'tjetër',    en: 'other' },
  vazhdon:   { al: 'vazhdon',   en: 'continues' },
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

// ---------------------------------------------------------------------------
// STEMS — the invariant root of each sense, computed as the longest common
// prefix of every surface form it takes across the content. The remainder of a
// surface is its inflectional ending, which we render faded.
//   eliksir / eliksirin -> stem "eliksir", endings ""/"in"
//   ujk / ujku          -> stem "ujk",     endings ""/"u"
// ---------------------------------------------------------------------------
export const STEMS = (() => {
  const surfaces = {} // id -> Set of surface forms
  const add = (t) => {
    if (!t.id) return
    ;(surfaces[t.id] ||= new Set()).add(t.al)
  }
  for (const node of Object.values(STORY)) {
    for (const line of node.text) for (const t of line) add(t)
    for (const opt of node.options) for (const t of opt.text) add(t)
  }
  for (const item of Object.values(ITEMS)) for (const t of item.use.phrase) add(t)
  for (const id of Object.keys(DICT)) (surfaces[id] ||= new Set()).add(DICT[id].al)

  const commonPrefix = (words) => {
    let p = words[0] || ''
    for (const w of words) {
      let i = 0
      while (i < p.length && i < w.length && p[i] === w[i]) i++
      p = p.slice(0, i)
      if (!p) break
    }
    return p
  }

  const stems = {}
  for (const id of Object.keys(surfaces)) stems[id] = commonPrefix([...surfaces[id]])
  return stems
})()

// Split an Albanian surface into [stem, ending] for a given sense.
export function splitStem(id, surface) {
  const stem = STEMS[id]
  if (stem && surface.startsWith(stem) && stem.length < surface.length) {
    return [surface.slice(0, stem.length), surface.slice(stem.length)]
  }
  return [surface, '']
}

// ---------------------------------------------------------------------------
// DEFS — a short Albanian "definition" (really an illustrative phrase) for each
// sense. Rendered with the same Token logic as the story, so any word inside a
// definition that you haven't discovered yet shows as its English gloss.
// Built from story-validated phrasings to keep the Albanian grammar correct.
// ---------------------------------------------------------------------------
export const DEFS = {
  // pronouns / function words — defined by role or synonym
  ti: L(w('nje'), w('njeri')), //                      a person
  je: L(w('eshte')), //                                is
  eshte: L(w('je')), //                                are
  ne: L(w('brenda'), w('nje'), w('vend')), //          inside a place
  nje: L(w('jo'), w('shume')), //                      not many
  dhe: L(w('me')), //                                  with
  ka: L(w('ke')), //                                   have
  ke: L(w('ka')), //                                   has
  mund: L(w('ti'), w('ke'), w('fuqi')), //             you have power
  te_link: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), // a small word
  te_subj: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  i_art: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  e_art: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),

  // nouns — a kind of thing
  pyll: L(w('nje'), w('vend'), w('me'), w('shume'), w('peme')), //   a place with many trees
  rruge: L(w('nje'), w('vend'), w('ku'), w('ti'), w('ec')), //       a place where you walk
  shtepi: L(w('nje'), w('vend'), w('ku'), w('ti'), w('fle')), //     a place where you sleep
  dere: L(w('nje'), w('gje'), w('qe'), w('ti'), w('hap')), //        a thing that you open
  ujk: L(w('nje'), w('kafshe'), w('ne'), w('pyll')), //             an animal in the forest
  uje: L(w('nje'), w('leng'), w('qe'), w('ti'), w('pi')), //         a liquid that you drink
  zjarr: L(w('nje'), w('gje'), w('me'), w('drite')), //             a thing with light
  mik: L(w('nje'), w('njeri'), w('i_art'), w('mire')), //           a good person
  toke: L(w('nje'), w('vend'), w('poshte')), //                     a place below
  naten: L(w('nje'), w('kohe'), w('pa'), w('drite')), //            a time without light
  erresire: L(w('nje'), w('vend'), w('pa'), w('drite')), //         a place without light
  eliksir: L(w('nje'), w('leng'), w('qe'), w('jep'), w('fuqi')), // a liquid that gives power
  thesar: L(w('nje'), w('gje'), w('e_art'), w('mire')), //          a good thing
  loja: L(w('nje'), w('gje'), w('qe'), w('ti'), w('luan')), //      a thing that you play

  // adjectives — a quality, often by its opposite
  madh: L(w('jo'), w('i_art'), w('vogel')), //         not small
  ri: L(w('jo'), w('i_art'), w('vjeter')), //          not old
  shpejt: L(w('jo'), w('ngadale')), //                 not slow
  erret: L(w('pa'), w('drite')), //                    without light
  sigurt: L(w('pa'), w('rrezik')), //                  without danger
  qete: L(w('pa'), w('zhurme')), //                    without noise
  uritur: L(w('do'), w('te_subj'), w('ha')), //        wants to eat

  // verbs — the action, often by its opposite
  sheh: L(w('me'), w('sy')), //                        with eyes
  ec: L(w('me'), w('kembe')), //                       with legs
  fle: L(w('jo'), w('zgjohu')), //                     not wake
  zgjohu: L(w('jo'), w('fle')), //                     not sleep
  hap: L(w('jo'), w('mbyll')), //                      not close
  ik: L(w('ec'), w('larg')), //                        walk far
  vjen: L(w('jo'), w('ik')), //                        not flee
  rri: L(w('jo'), w('ik')), //                         not flee
  brenda: L(w('jo'), w('jashte')), //                  not outside
  jep: L(w('jo'), w('merr')), //                       not take
  merr: L(w('jo'), w('jep')), //                       not give
  pi: L(w('ti'), w('merr'), w('leng')), //             you take liquid
  ha: L(w('ti'), w('merr'), w('ushqim')), //           you take food
  behet: L(w('eshte'), w('tani')), //                  is now
  gjen: L(w('jo'), w('humbet')), //                    not lose
  humbet: L(w('jo'), w('gjen')), //                    not find
  ndiz: L(w('bej'), w('drite')), //                    make light
  kerko: L(w('do'), w('te_subj'), w('gjen')), //       want to find
  mbaroi: L(w('jo'), w('vazhdon')), //                 not continue
  perseri: L(w('nje'), w('kohe'), w('tjeter')), //     another time
  ketu: L(w('jo'), w('larg')), //                      not far
}
