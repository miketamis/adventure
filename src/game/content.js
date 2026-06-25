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
  // places & things along the journey
  lume:      { al: 'lumë',      en: 'river' },
  ure:       { al: 'urë',       en: 'bridge' },
  mal:       { al: 'mal',       en: 'mountain' },
  shpelle:   { al: 'shpellë',   en: 'cave' },
  plak:      { al: 'plak',      en: 'old man' },
  kalo:      { al: 'kalo',      en: 'cross' },
  // --- folklore: characters & creatures ---
  fshat:     { al: 'fshat',     en: 'village' },
  plake:     { al: 'plakë',     en: 'old woman' },
  kulshedra: { al: 'kulshedra', en: 'kulshedra' }, // multi-headed she-dragon
  zane:      { al: 'zanë',      en: 'fairy' },     // mountain fairy (Zana)
  bukura:    { al: 'Bukura',    en: 'the Beauty' },// E Bukura e Dheut
  dragua:    { al: 'dragua',    en: 'dragon-hero' },// the Drangue
  trim:      { al: 'trim',      en: 'hero' },
  shqiponje: { al: 'shqiponjë', en: 'eagle' },
  gjarper:   { al: 'gjarpër',   en: 'serpent' },
  mbret:     { al: 'mbret',     en: 'king' },
  nene:      { al: 'nënë',      en: 'mother' },
  femije:    { al: 'fëmijë',    en: 'child' },
  tomor:     { al: 'Tomor',     en: 'Tomorr' },    // the sky-father mountain
  // --- folklore: places & things ---
  pus:       { al: 'pus',       en: 'well' },
  bote:      { al: 'botë',      en: 'world' },
  kala:      { al: 'kala',      en: 'castle' },
  mur:       { al: 'mur',       en: 'wall' },
  hije:      { al: 'hije',      en: 'shadow' },
  dite:      { al: 'ditë',      en: 'day' },
  koke:      { al: 'kokë',      en: 'head' },
  bese:      { al: 'besë',      en: 'oath' },
  // --- items ---
  buke:      { al: 'bukë',      en: 'bread' },
  mish:      { al: 'mish',      en: 'meat' },
  kripe:     { al: 'kripë',     en: 'salt' },
  unaze:     { al: 'unazë',     en: 'ring' },
  pende:     { al: 'pendë',     en: 'feather' },
  qumesht:   { al: 'qumësht',   en: 'milk' },
  shpate:    { al: 'shpatë',    en: 'sword' },
  gur:       { al: 'gur',       en: 'stone' },     // the Drangue's thunder-stone
  // --- verbs ---
  shko:      { al: 'shko',      en: 'go' },
  prit:      { al: 'prit',      en: 'wait' },
  lufto:     { al: 'lufto',     en: 'fight' },
  vrit:      { al: 'vrit',      en: 'kill' },
  shpeto:    { al: 'shpëto',    en: 'save' },
  ngjit:     { al: 'ngjit',     en: 'climb' },
  zbrit:     { al: 'zbrit',     en: 'go down' },
  fluturo:   { al: 'fluturo',   en: 'fly' },
  degjo:     { al: 'dëgjo',     en: 'listen' },
  flet:      { al: 'flet',      en: 'speaks' },
  thote:     { al: 'thotë',     en: 'says' },
  ndihmo:    { al: 'ndihmo',    en: 'help' },
  beso:      { al: 'beso',      en: 'trust' },
  hyr:       { al: 'hyr',       en: 'enter' },
  dil:       { al: 'dil',       en: 'leave' },
  thirr:     { al: 'thirr',     en: 'call' },
  hidh:      { al: 'hidh',      en: 'throw' },
  kthehu:    { al: 'kthehu',    en: 'return' },
  prek:      { al: 'prek',      en: 'touch' },
  vdes:      { al: 'vdes',      en: 'dies' },
  bie:       { al: 'bie',       en: 'falls' },
  pre:       { al: 'pre',       en: 'cut' },
  // --- qualities & connectors ---
  forte:     { al: 'fortë',     en: 'strong' },
  bukur:     { al: 'bukur',     en: 'beautiful' },
  keq:       { al: 'keq',       en: 'bad' },
  thate:     { al: 'thatë',     en: 'dry' },
  lart:      { al: 'lart',      en: 'up' },
  por:       { al: 'por',       en: 'but' },
  nuk:       { al: 'nuk',       en: 'not' },
  une:       { al: 'unë',       en: 'I' },
  per:       { al: 'për',       en: 'for' },
  // --- folklore: the night branches ---
  shtrige:   { al: 'shtrigë',   en: 'witch' },     // the Shtriga, a vampiric night-witch
  ora:       { al: 'Ora',       en: 'spirit' },    // the Ora, a personal fate-spirit
  det:       { al: 'det',       en: 'sea' },
  ftohte:    { al: 'ftohtë',    en: 'cold' },
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
  // --- folklore: the Baloz of the sea (Gjergj Elez Alia) ---
  baloz:     { al: 'baloz',     en: 'sea-monster' }, // the Baloz, a sea-giant
  motra:     { al: 'motër',     en: 'sister' },
  plage:     { al: 'plagë',     en: 'wound' },
  nente:     { al: 'nëntë',     en: 'nine' },
  vajze:     { al: 'vajzë',     en: 'maiden' },
  // --- the Zana's trial (Mujo) & the eagle's nest ---
  fole:      { al: 'folé',      en: 'nest' },
  zog:       { al: 'zog',       en: 'chick' },
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
  // =========================================================================
  // ACT I — the thirsting village (the Call)
  // =========================================================================
  start: {
    id: 'start',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('fshat'), w('te_link'), w('vjeter'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('nuk'), w('ka'), w('uje'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('pyll'), p('.')),
      L(w('nje'), w('plake'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plake', 'plakën', 'the old woman')), to: 'plaka' },
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylli1' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
      { text: L(w('kerko'), w('thesar')), to: 'fshehur', secret: true },
    ],
  },

  plaka: {
    id: 'plaka',
    text: [
      L(wf('plake', 'plaka', 'the old woman'), w('thote'), p(':')),
      L(w('kulshedra'), w('ka'), w('uje'), w('dhe'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('trim'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('jep'), w('buke'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('buke')), grant: 'buke', to: 'fshatiDil' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  pylli1: {
    id: 'pylli1',
    text: [
      L(w('ti'), w('ec'), w('ne'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('eshte'), w('erret'), w('dhe'), w('thate'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylliThelle' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  pylliThelle: {
    id: 'pylliThelle',
    text: [
      L(w('ne'), w('pyll'), w('vjen'), w('nje'), w('ujk'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('eshte'), w('i_art'), w('uritur'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'shokuUjk' },
      { text: L(w('lufto'), wf('ujk', 'ujkun', 'the wolf')), to: 'eaten' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  shokuUjk: {
    id: 'shokuUjk',
    text: [
      L(wf('ujk', 'ujku', 'the wolf'), w('ha'), w('buke'), w('dhe'), w('behet'), w('mik'), p('.')),
      L(w('ti'), w('ke'), w('nje'), w('mik'), w('te_link'), w('ri'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('me'), wf('ujk', 'ujkun', 'the wolf')), to: 'udha' },
    ],
  },

  udha: {
    id: 'udha',
    text: [
      L(w('ti'), w('dhe'), wf('ujk', 'ujku', 'the wolf'), w('ec'), w('larg'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('lume'), w('te_link'), w('madh'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('lume')), to: 'ura' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  // =========================================================================
  // ACT II — the river & the Zana (the mountain fairy)
  // =========================================================================
  lumi: {
    id: 'lumi',
    text: [
      L(wf('lume', 'lumi', 'the river'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(w('por'), w('ti'), w('sheh'), w('nje'), w('zane'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('zane', 'zanën', 'the fairy')), to: 'zana1' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
      { text: L(w('kerko'), w('thesar')), to: 'fshehur', secret: true },
    ],
  },

  zana1: {
    id: 'zana1',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('eshte'), w('e_art'), w('bukur'), w('dhe'), w('e_art'), w('forte'), p('.')),
      L(wf('zane', 'zana', 'the fairy'), w('thote'), p(':')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), p('.')),
    ],
    options: [
      { text: L(w('beso'), wf('zane', 'zanën', 'the fairy')), to: 'zanaProva' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  zanaQumesht: {
    id: 'zanaQumesht',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('jep'), w('qumesht'), p('.')),
      L(wf('qumesht', 'qumeshti', 'the milk'), w('jep'), w('fuqi'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('qumesht')), grant: 'qumesht', to: 'zanaKripe' },
    ],
  },

  zanaKripe: {
    id: 'zanaKripe',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('jep'), w('kripe'), p('.')),
      L(wf('kripe', 'kripa', 'the salt'), w('eshte'), w('per'), wf('kulshedra', 'kulshedrën', 'the kulshedra')),
    ],
    options: [
      { text: L(w('merr'), w('kripe')), grant: 'kripe', to: 'zanaPende' },
    ],
  },

  zanaPende: {
    id: 'zanaPende',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('jep'), w('nje'), w('pende'), p('.')),
      L(wf('pende', 'penda', 'the feather'), w('eshte'), w('per'), wf('shqiponje', 'shqiponjën', 'the eagle')),
    ],
    options: [
      { text: L(w('merr'), w('pende')), grant: 'pende', to: 'zanaFole' },
    ],
  },

  rrethi: {
    id: 'rrethi',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('thote'), p(':')),
      L(w('shko'), w('lart'), w('ne'), w('mal'), w('tomor')),
    ],
    options: [
      { text: L(w('shko'), w('ne'), w('mal')), to: 'mali1' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  // =========================================================================
  // ACT III — Mount Tomorr (the sky-father & the Drangue's storm)
  // =========================================================================
  mali1: {
    id: 'mali1',
    text: [
      L(w('ti'), w('je'), w('ne'), w('mal'), w('tomor'), p('.')),
      L(wf('mal', 'mali', 'the mountain'), w('eshte'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('erret'), p('.')),
    ],
    options: [
      { text: L(w('ngjit'), w('lart')), to: 'mali2' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  mali2: {
    id: 'mali2',
    text: [
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), w('nje'), wf('kulshedra', 'kulshedrën', 'the kulshedra'), p('.')),
      L(w('ti'), w('gjen'), w('nje'), w('gur'), w('te_link'), w('forte'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('gur')), grant: 'gur', to: 'mali3' },
      { text: L(w('ngjit'), w('lart')), to: 'mali3' },
    ],
  },

  mali3: {
    id: 'mali3',
    text: [
      L(w('ti'), w('ngjit'), w('lart'), p('.')),
      L(w('lart'), w('eshte'), w('nje'), w('plak'), w('te_link'), w('vjeter'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'maja' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  tomor1: {
    id: 'tomor1',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('eshte'), w('tomor'), p('.')),
      L(w('tomor'), w('thote'), p(':')),
      L(w('kulshedra'), w('eshte'), w('poshte'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), w('tomor')), to: 'tomor2' },
    ],
  },

  tomor2: {
    id: 'tomor2',
    text: [
      L(w('tomor'), w('jep'), w('nje'), w('shpate'), p('.')),
      L(wf('shpate', 'shpata', 'the sword'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the kulshedra')),
    ],
    options: [
      { text: L(w('merr'), w('shpate')), grant: 'shpate', to: 'tomor3' },
    ],
  },

  pusi: {
    id: 'pusi',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('pus'), w('te_link'), w('madh'), p('.')),
      L(wf('pus', 'pusi', 'the well'), wf('shko', 'shkon', 'goes'), w('poshte'), w('ne'), w('nje'), w('bote'), w('te_link'), w('erret'), p('.')),
    ],
    options: [
      { text: L(w('zbrit'), w('ne'), w('pus')), to: 'zbritja' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  // =========================================================================
  // ACT IV — Bota e Poshtme (the underworld)
  // =========================================================================
  zbritja: {
    id: 'zbritja',
    text: [
      L(w('ti'), w('zbrit'), w('poshte'), w('ne'), w('pus'), p('.')),
      L(w('ti'), w('je'), w('ne'), w('nje'), w('bote'), w('te_link'), w('erret'), p('.')),
    ],
    options: [
      { text: L(w('hyr'), w('ne'), wf('bote', 'botën', 'the world')), to: 'bota1' },
    ],
  },

  bota1: {
    id: 'bota1',
    text: [
      L(wf('bote', 'bota', 'the world'), w('e_art'), w('poshte'), w('eshte'), w('e_art'), w('erret'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('dere'), w('te_link'), w('madh'), p('.')),
    ],
    options: [
      { text: L(w('hap'), wf('dere', 'derën', 'the door')), to: 'dera' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  bota2: {
    id: 'bota2',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('shpelle'), w('te_link'), w('madh'), p('.')),
      L(w('ketu'), w('eshte'), w('mish'), w('dhe'), w('uje'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('mish')), grant: 'mish', to: 'tre1' },
      { text: L(w('ec'), w('poshte')), to: 'tre1' },
    ],
  },

  bukura1: {
    id: 'bukura1',
    text: [
      L(w('ti'), w('sheh'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('bukura'), w('eshte'), w('e_art'), w('bukur'), p('.')),
    ],
    options: [
      { text: L(w('shpeto'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'bukura2' },
    ],
  },

  bukura2: {
    id: 'bukura2',
    text: [
      L(w('bukura'), w('jep'), w('nje'), w('unaze'), p('.')),
      L(w('bukura'), w('thote'), p(':')),
      L(w('kulshedra'), w('vjen'), p('!')),
    ],
    options: [
      { text: L(w('merr'), w('unaze')), grant: 'unaze', to: 'kulshedra1' },
    ],
  },

  kulshedra1: {
    id: 'kulshedra1',
    text: [
      L(w('kulshedra'), w('ka'), w('shume'), w('koke'), p('.')),
      L(w('kulshedra'), w('ka'), w('zjarr'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the kulshedra')), requires: 'shpate', consumes: 'shpate', to: 'fitorja' },
      { text: L(w('hidh'), w('gur')), requires: 'gur', consumes: 'gur', to: 'dranguasi' },
      { text: L(w('hidh'), w('kripe')), requires: 'kripe', consumes: 'kripe', to: 'fitorja' },
      { text: L(w('ik'), w('shpejt')), to: 'djegur' },
    ],
  },

  fitorja: {
    id: 'fitorja',
    text: [
      L(wf('kulshedra', 'kulshedra', 'the kulshedra'), w('vdes'), p('.')),
      L(w('uje'), w('vjen'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('ik'), w('shpejt')), to: 'kthimi' },
    ],
  },

  // =========================================================================
  // ACT V — the ascent (the eagle from the underworld)
  // =========================================================================
  pusi2: {
    id: 'pusi2',
    text: [
      L(w('ti'), w('je'), w('ne'), w('pus'), p('.')),
      L(wf('pus', 'pusi', 'the well'), w('eshte'), w('i_art'), w('madh'), w('ti'), w('nuk'), w('mund'), w('te_subj'), w('ngjit'), p('.')),
    ],
    options: [
      { text: L(w('thirr'), wf('shqiponje', 'shqiponjën', 'the eagle')), requires: 'pende', consumes: 'pende', to: 'shqiponja1' },
      { text: L(w('ngjit'), w('lart')), to: 'rene' },
    ],
  },

  shqiponja1: {
    id: 'shqiponja1',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('vjen'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('do'), w('mish'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('mish')), requires: 'mish', consumes: 'mish', to: 'siperfaqja' },
      { text: L(w('pre'), w('mish')), to: 'mishiVetes', secret: true },
      { text: L(w('ik'), w('shpejt')), to: 'rene' },
    ],
  },

  siperfaqja: {
    id: 'siperfaqja',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('fluturo', 'fluturon', 'flies'), w('lart'), p('.')),
      L(w('ti'), w('je'), w('lart'), w('perseri'), p('.')),
      L(wf('bote', 'bota', 'the world'), w('ka'), w('uje'), w('tani'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('rruge'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('rruge')), to: 'udhaKthimit' },
      { text: L(w('shko'), w('ne'), w('det')), to: 'bregu' },
      { text: L(w('kthehu'), w('ne'), w('fshat')), to: 'shtepia' },
    ],
  },

  // =========================================================================
  // ACT VI — Rozafa (the besa & the wall)
  // =========================================================================
  kala1: {
    id: 'kala1',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('kala'), p('.')),
      L(wf('kala', 'kalaja', 'the castle'), w('ka'), w('nje'), w('mur'), p('.')),
      L(wf('mur', 'muri', 'the wall'), w('nuk'), w('rri'), w('lart'), p('.')),
      L(w('nje'), w('mbret'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('mbret', 'mbretin', 'the king')), to: 'kala2' },
    ],
  },

  kala2: {
    id: 'kala2',
    text: [
      L(wf('mbret', 'mbreti', 'the king'), w('thote'), p(':')),
      L(wf('mur', 'muri', 'the wall'), w('do'), w('nje'), w('nene'), p('.')),
      L(w('nje'), w('nene'), w('jep'), w('qumesht'), wf('femije', 'fëmijës', 'to the child')),
    ],
    options: [
      { text: L(w('jep'), w('unaze')), requires: 'unaze', to: 'mbreti' },
      { text: L(w('ndihmo'), wf('mur', 'murin', 'the wall')), to: 'murosur' },
      { text: L(w('kthehu'), w('ne'), w('fshat')), to: 'shtepia' },
    ],
  },

  // =========================================================================
  // ENDINGS
  // =========================================================================
  mbreti: {
    id: 'mbreti',
    end: 'good',
    title: 'Hero of Rozafa',
    blurb:
      'You gave the Beauty’s ring to the king. The water flows, the castle stands without a sacrifice, and you are honoured as a true Drangue.',
    text: [
      L(w('ti'), w('jep'), wf('unaze', 'unazën', 'the ring'), wf('mbret', 'mbretit', 'to the king'), p('.')),
      L(w('bukura'), w('eshte'), w('e_art'), w('sigurt'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), p('!')),
    ],
    options: [],
  },

  shtepia: {
    id: 'shtepia',
    end: 'good',
    title: 'Home Again',
    blurb: 'You carried the water back and went home to the village. No crown — but the wells are full and the people sing your name.',
    text: [
      L(w('ti'), w('kthehu'), w('ne'), w('fshat'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('tani'), p('.')),
    ],
    options: [],
  },

  dranguasi: {
    id: 'dranguasi',
    end: 'secret',
    title: 'The Drangue Awakens',
    blurb: 'You hurled the thunder-stone the way the Drangue strike the Kulshedra in the storms. Lightning answered your hand — you were born for this.',
    text: [
      L(wf('gur', 'guri', 'the stone'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the kulshedra'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), w('te_link'), w('forte'), p('!')),
    ],
    options: [],
  },

  mishiVetes: {
    id: 'mishiVetes',
    end: 'secret',
    title: 'Flesh for the Eagle',
    blurb: 'You had no meat, so you cut your own and fed the eagle, as the old hero did. You rise to the light — alive, scarred, unforgotten.',
    text: [
      L(w('ti'), w('pre'), w('mish'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('fluturo', 'fluturon', 'flies'), w('lart'), p('.')),
    ],
    options: [],
  },

  // === branch: the hidden hoard — the guardian serpent ====================
  fshehur: {
    id: 'fshehur',
    text: [
      L(w('ti'), w('gjen'), w('nje'), w('thesar'), w('te_link'), w('vjeter'), p('.')),
      L(w('por'), w('nje'), w('gjarper'), w('i_art'), w('madh'), w('vjen'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('do'), wf('thesar', 'thesarin', 'the treasure'), p('.')),
    ],
    options: [
      { text: L(w('jep'), wf('thesar', 'thesarin', 'the treasure')), to: 'thesarKthyer' },
      { text: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), requires: 'shpate', consumes: 'shpate', to: 'gjarperVrare' },
      { text: L(w('ik'), w('shpejt')), to: 'gjarperNgrene' },
    ],
  },

  thesarKthyer: {
    id: 'thesarKthyer',
    end: 'good',
    title: 'The Gold Returned',
    blurb:
      'You laid the old gold back in the dark, and the great serpent let you pass. Some hoards are kept by an Ora that wears a serpent’s shape — wiser to walk away than to wake its wrath.',
    text: [
      L(w('ti'), w('jep'), wf('thesar', 'thesarin', 'the treasure'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), wf('ik', 'ikën', 'flees'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  gjarperVrare: {
    id: 'gjarperVrare',
    end: 'secret',
    title: 'The Serpent’s Hoard',
    blurb:
      'You cut down the guardian serpent and the old gold was yours — enough to dig a hundred wells. The village will drink after all, and your name will be sung beside the water.',
    text: [
      L(wf('shpate', 'shpata', 'the sword'), wf('vrit', 'vret', 'kills'), wf('gjarper', 'gjarprin', 'the serpent'), p('.')),
      L(w('ti'), w('ke'), w('thesar'), p('.')),
    ],
    options: [],
  },

  gjarperNgrene: {
    id: 'gjarperNgrene',
    end: 'bad',
    title: 'Greed in the Dark',
    blurb:
      'You ran with the gold, and the serpent ran faster. The hoard keeps its old guardian fed — and now it keeps you too.',
    text: [
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('ti'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  murosur: {
    id: 'murosur',
    end: 'bad',
    title: 'Walled in Rozafa',
    blurb: 'To make the castle stand, a mother was sealed in the wall — one breast left out to nurse her child. The besa was kept; the price was cruel.',
    text: [
      L(wf('mur', 'muri', 'the wall'), w('merr'), w('nje'), w('nene'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  djegur: {
    id: 'djegur',
    end: 'bad',
    title: 'Burned by the Kulshedra',
    blurb: 'You ran, but the Kulshedra breathes fire. The dark world keeps the Beauty and the water both.',
    text: [
      L(w('ti'), w('vdes'), w('ne'), w('zjarr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === branch: the long fall — the Beauty of the Sea =====================
  rene: {
    id: 'rene',
    text: [
      L(w('ti'), w('bie'), w('poshte'), p('.')),
      L(w('ti'), w('je'), w('ne'), w('nje'), w('det'), w('te_link'), w('erret'), p('.')),
      L(w('bukura'), w('e_art'), wf('det', 'Detit', 'of the sea'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'detiUp' },
      { text: L(w('hyr'), w('ne'), w('det')), to: 'detiNgrene' },
    ],
  },

  detiUp: {
    id: 'detiUp',
    end: 'good',
    title: 'The Beauty of the Sea',
    blurb:
      'At the bottom of the black water you found Bukura e Detit, the Beauty of the Sea. She bore you up through the dark to the light and set you again upon the living earth.',
    text: [
      L(w('bukura'), wf('ndihmo', 'ndihmon', 'helps'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('lart'), w('perseri'), p('.')),
    ],
    options: [],
  },

  detiNgrene: {
    id: 'detiNgrene',
    end: 'bad',
    title: 'The Black Sea',
    blurb:
      'You stepped into the black water and it closed over you. Not every deep has a Beauty waiting; some hold only the dark.',
    text: [
      L(wf('det', 'deti', 'the sea'), w('ti'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === branch: lost in the dark — your Ora (the three Fates) ==============
  humbur: {
    id: 'humbur',
    text: [
      L(w('ti'), w('humbet'), w('ne'), w('erresire'), p('.')),
      L(w('por'), w('nje'), w('drite'), w('vjen'), p('.')),
      L(wf('drite', 'drita', 'the light'), w('eshte'), w('nje'), w('ora'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('ora', 'Orën', 'the spirit')), to: 'oraBardhe' },
      { text: L(w('ik'), w('ne'), w('erresire')), to: 'oraZeze' },
    ],
  },

  oraBardhe: {
    id: 'oraBardhe',
    end: 'good',
    title: 'Led Home by your Ora',
    blurb:
      'You followed the light. Every Albanian is born with an Ora, a fate-spirit that walks beside them; yours was e Bardha, the White, who deals out good fortune. She led you out of the dark and home, alive.',
    text: [
      L(wf('ora', 'Ora', 'the spirit'), wf('ndihmo', 'ndihmon', 'helps'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  oraZeze: {
    id: 'oraZeze',
    end: 'bad',
    title: 'The Black Ora',
    blurb:
      'You fled the light, deeper into the dark. There are three Fates; the one that found you there was e Zeza, the Black — the Ora who decides death.',
    text: [
      L(w('ti'), w('humbet'), w('ne'), w('erresire'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  eaten: {
    id: 'eaten',
    end: 'bad',
    title: 'Eaten by the Wolf',
    blurb: 'A hungry wolf, no bread, no friend. The forest is older and crueller than the village songs say.',
    text: [
      L(wf('ujk', 'ujku', 'the wolf'), w('ti'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === the forest loop (where fleeing sends you) ==========================
  pylliLoop: {
    id: 'pylliLoop',
    text: [
      L(w('ti'), w('je'), w('perseri'), w('ne'), w('pyll'), p('.')),
      L(w('eshte'), w('erret'), p('.')),
    ],
    options: [
      { text: L(w('ndiz'), w('nje'), w('zjarr')), to: 'zjarriPyll' },
      { text: L(w('ec'), w('ne'), w('erresire')), to: 'humbur' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  // === branch: the night fire — the guest, the Ora, the Shtriga ===========
  zjarriPyll: {
    id: 'zjarriPyll',
    text: [
      L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('i_art'), w('madh'), p('.')),
      L(w('naten'), w('vjen'), w('nje'), w('plake'), w('e_art'), w('ftohte'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('do'), w('buke'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'besaFire' },
      { text: L(w('prit'), w('ketu')), to: 'shtrigaNate' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  shtrigaNate: {
    id: 'shtrigaNate',
    text: [
      L(w('naten'), wf('plake', 'plaka', 'the old woman'), w('behet'), w('nje'), w('shtrige'), p('.')),
      L(wf('shtrige', 'shtriga', 'the witch'), w('do'), w('fuqi'), p('.')),
    ],
    options: [
      { text: L(w('hidh'), w('kripe')), requires: 'kripe', consumes: 'kripe', to: 'shtrigaIkur' },
      { text: L(w('hidh'), w('zjarr')), to: 'shtrigaIkur' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  besaFire: {
    id: 'besaFire',
    end: 'good',
    title: 'The Sacred Guest',
    blurb:
      'You shared your bread with the cold stranger. She was your Ora in an old woman’s shape — she blessed you, and you woke at dawn safe and strong. To an Albanian, a guest is sent by God, and the besa to feed a traveller is sacred.',
    text: [
      L(w('ti'), w('jep'), w('buke'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('eshte'), w('nje'), w('ora'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  shtrigaIkur: {
    id: 'shtrigaIkur',
    end: 'secret',
    title: 'Salt in the Flames',
    blurb:
      'You cast salt into the fire as the old ones taught. The Shtriga shrieked, shrank to a moth, and fled before the dawn. You kept your years — and the night-witch will not come again.',
    text: [
      L(w('ti'), w('hidh'), w('kripe'), w('ne'), w('zjarr'), p('.')),
      L(wf('shtrige', 'shtriga', 'the witch'), wf('ik', 'ikën', 'flees'), p('.')),
    ],
    options: [],
  },

  gjumi: {
    id: 'gjumi',
    text: [
      L(w('ti'), w('fle'), w('ne'), w('toke'), p('.')),
      L(w('naten'), w('vjen'), w('nje'), w('ujk'), w('te_link'), w('uritur'), p('.')),
    ],
    options: [
      { text: L(w('zgjohu'), w('dhe'), w('ik')), to: 'pylliLoop' },
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'eaten' },
    ],
  },

  // === extra journey nodes (depth) ========================================
  fshatiDil: {
    id: 'fshatiDil',
    text: [
      L(w('ti'), w('ec'), w('larg'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylli1' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  ura: {
    id: 'ura',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('ure'), p('.')),
      L(wf('lume', 'lumi', 'the river'), w('poshte'), w('eshte'), w('i_art'), w('thate'), p('.')),
    ],
    options: [
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'lumi' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  maja: {
    id: 'maja',
    text: [
      L(w('ti'), w('je'), w('lart'), w('ne'), w('mal'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('plak'), w('te_link'), w('vjeter'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'tomor1' },
    ],
  },

  tomor3: {
    id: 'tomor3',
    text: [
      L(w('tomor'), w('thote'), p(':')),
      L(w('kulshedra'), w('ka'), w('shume'), w('koke'), p('.')),
      L(w('nje'), w('pus'), w('eshte'), w('poshte'), p('.')),
    ],
    options: [
      { text: L(w('shko'), w('ne'), w('pus')), to: 'pusi' },
    ],
  },

  dera: {
    id: 'dera',
    text: [
      L(w('ti'), w('hyr'), w('ne'), w('nje'), w('dere'), w('te_link'), w('madh'), p('.')),
      L(w('brenda'), w('eshte'), w('nje'), w('hije'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('brenda')), to: 'sprova' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  sprova: {
    id: 'sprova',
    text: [
      L(wf('hije', 'hija', 'the shadow'), w('eshte'), w('ti'), p('.')),
      L(wf('hije', 'hija', 'the shadow'), w('nuk'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('prek'), wf('hije', 'hijen', 'the shadow')), to: 'gjarpri' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  gjarpri: {
    id: 'gjarpri',
    text: [
      L(w('nje'), w('gjarper'), w('i_art'), w('madh'), w('rri'), w('ketu'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('ka'), w('zjarr'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), requires: 'shpate', to: 'bota2' },
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'bota2' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  uji: {
    id: 'uji',
    text: [
      L(w('ketu'), w('eshte'), w('shume'), w('uje'), p('.')),
      L(w('kulshedra'), w('ka'), wf('uje', 'ujin', 'the water'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('poshte')), to: 'bukura1' },
    ],
  },

  kthimi: {
    id: 'kthimi',
    text: [
      L(w('ti'), w('dhe'), w('bukura'), w('ec'), w('lart'), p('.')),
      L(wf('shpelle', 'shpella', 'the cave'), w('bie'), p('.')),
      L(wf('pus', 'pusi', 'the well'), w('eshte'), w('lart'), p('.')),
    ],
    options: [
      { text: L(w('shko'), w('ne'), w('pus')), to: 'pusi2' },
    ],
  },

  udhaKthimit: {
    id: 'udhaKthimit',
    text: [
      L(w('ti'), w('ec'), w('ne'), w('nje'), w('rruge'), p('.')),
      L(wf('bote', 'bota', 'the world'), w('ka'), w('uje'), w('tani'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('kala'), p('.')),
    ],
    options: [
      { text: L(w('shko'), w('ne'), w('kala')), to: 'kala1' },
      { text: L(w('kthehu'), w('ne'), w('fshat')), to: 'shtepia' },
    ],
  },

  // =========================================================================
  // ACT IV (deepened) — the three Earthly Beauties (the Scurfhead's descent)
  // Below, the hero passes three houses, each with one of the three Beauties
  // (sisters); the youngest sets him on the dragon. Threads the underworld spine.
  // =========================================================================
  tre1: {
    id: 'tre1',
    text: [
      L(w('ti'), w('ec'), w('poshte'), w('ne'), wf('bote', 'botën', 'the world'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('shtepi'), p('.')),
      L(w('brenda'), w('eshte'), w('nje'), w('bukura'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'tre2' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  tre2: {
    id: 'tre2',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('shtepi'), w('tjeter'), p('.')),
      L(w('nje'), w('bukura'), w('tjeter'), w('eshte'), w('e_art'), w('bukur'), p('.')),
      L(w('bukura'), w('thote'), p(':')),
      L(w('kulshedra'), w('ka'), w('uje'), w('dhe'), wf('bukura', 'Bukurën', 'the Beauty')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'tre3' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  tre3: {
    id: 'tre3',
    text: [
      L(w('nje'), w('shtepi'), w('tjeter'), w('eshte'), w('ketu'), p('.')),
      L(w('nje'), w('bukura'), w('e_art'), w('bukur'), w('rri'), w('ketu'), p('.')),
      L(w('bukura'), w('thote'), p(':')),
      L(wf('shpate', 'shpata', 'the sword'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the kulshedra')),
    ],
    options: [
      { text: L(w('ec'), w('poshte')), to: 'uji' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  // =========================================================================
  // SIDE-QUEST — the Baloz of the sea (Gjergj Elez Alia)
  // Reached from the surface after the ascent. A sea-giant takes a maiden a year;
  // now it comes for the sister who tends your wounds. You rise to fight it.
  // =========================================================================
  bregu: {
    id: 'bregu',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('fshat'), w('te_link'), w('det'), p('.')),
      L(w('ti'), w('ke'), w('nente'), w('plage'), p('.')),
      L(w('nje'), w('motra'), w('jep'), w('uje'), wf('trim', 'trimit', 'to the hero')),
    ],
    options: [
      { text: L(w('degjo'), wf('motra', 'motrën', 'the sister')), to: 'balozTribut' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozTribut: {
    id: 'balozTribut',
    text: [
      L(wf('motra', 'motra', 'the sister'), w('thote'), p(':')),
      L(w('nje'), w('baloz'), w('vjen'), w('ne'), wf('det', 'detin', 'the sea')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('do'), w('nje'), w('vajze'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('do'), wf('motra', 'motrën', 'the sister')),
    ],
    options: [
      { text: L(w('degjo'), wf('motra', 'motrën', 'the sister')), to: 'balozZgjedh' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozZgjedh: {
    id: 'balozZgjedh',
    text: [
      L(w('ti'), w('ke'), w('nente'), w('plage'), w('dhe'), w('je'), w('i_art'), w('uritur'), p('.')),
      L(w('por'), wf('motra', 'motra', 'the sister'), w('eshte'), w('ne'), w('rrezik'), p('.')),
    ],
    options: [
      { text: L(w('zgjohu'), w('dhe'), w('lufto')), to: 'balozLufte' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozLufte: {
    id: 'balozLufte',
    text: [
      L(w('ti'), w('zgjohu'), w('dhe'), wf('lufto', 'lufton', 'fight'), wf('baloz', 'balozin', 'the sea-monster'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('hidh'), w('nje'), w('gur'), p('!')),
    ],
    options: [
      { text: L(w('hidh'), w('nje'), w('gur')), to: 'balozKoke' },
      { text: L(w('ik'), w('shpejt')), to: 'bregHumb' },
    ],
  },

  balozKoke: {
    id: 'balozKoke',
    text: [
      L(w('ti'), w('pre'), wf('koke', 'kokën', 'the head'), w('te_link'), wf('baloz', 'balozit', 'of the sea-monster'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('vdes'), p('.')),
      L(wf('det', 'deti', 'the sea'), w('eshte'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), w('ne'), w('fshat')), to: 'balozFitore' },
    ],
  },

  balozFitore: {
    id: 'balozFitore',
    end: 'good',
    title: 'Gjergj Elez Alia',
    blurb:
      'Nine wounds and nine years, and still you rose for your sister. You cut the Black Baloz down and freed the coast — then your wounds took you, and brother and sister were laid in one grave. The hero who dies in victory is the one the lahuta sings.',
    text: [
      L(wf('baloz', 'balozi', 'the sea-monster'), w('vdes'), p('.')),
      L(w('ti'), w('dhe'), wf('motra', 'motra', 'the sister'), w('je'), w('i_art'), w('sigurt'), p('.')),
      L(w('por'), w('ti'), w('ke'), w('nente'), w('plage'), p('.')),
    ],
    options: [],
  },

  bregFle: {
    id: 'bregFle',
    end: 'bad',
    title: 'The Sea’s Tribute',
    blurb:
      'You were too weary to rise, and the Baloz took the maiden it came for. The coast still pays its yearly tribute to the dark water — and no song is sung for the one who slept.',
    text: [
      L(w('ti'), w('fle'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('merr'), w('nje'), w('vajze'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  bregHumb: {
    id: 'bregHumb',
    end: 'bad',
    title: 'Lost to the Sea',
    blurb:
      'You turned from the duel, and the Baloz caught you at the water’s edge. The sea is older than any hero, and it keeps what it takes.',
    text: [
      L(w('ti'), w('ik'), w('ne'), wf('det', 'detin', 'the sea')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('ti'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // ACT II (deepened) — the Zana's trial (how Mujo won his strength)
  // Lost in the storm, you rock two unseen children by a boulder; at dawn the
  // Zanas reward you with a hero's strength — then her milk.
  // =========================================================================
  zanaProva: {
    id: 'zanaProva',
    text: [
      L(w('naten'), w('eshte'), w('e_art'), w('erret'), w('dhe'), w('e_art'), w('ftohte'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('femije'), w('dhe'), w('nje'), w('femije'), w('tjeter'), p('.')),
      L(wf('femije', 'fëmijët', 'the children'), w('nuk'), w('fle'), p('.')),
    ],
    options: [
      { text: L(w('rri'), w('me'), wf('femije', 'fëmijët', 'the children')), to: 'zanaProva2' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  zanaProva2: {
    id: 'zanaProva2',
    text: [
      L(w('naten'), w('mbaroi'), w('dhe'), w('vjen'), w('dite'), p('.')),
      L(wf('zane', 'zana', 'the fairy'), w('vjen'), w('dhe'), w('thote'), p(':')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), w('te_link'), w('forte'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('zane', 'zanën', 'the fairy')), to: 'zanaQumesht' },
    ],
  },

  // =========================================================================
  // ACT II (deepened) — the eagle's nest (the debt that brings the eagle)
  // On the climb you save an eagle's chicks from a serpent; the eagle will come
  // when you call it from the dark below.
  // =========================================================================
  zanaFole: {
    id: 'zanaFole',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('dhe'), w('ti'), w('ngjit'), w('lart'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('peme'), w('me'), w('nje'), w('fole'), p('.')),
      L(w('nje'), w('gjarper'), w('ngjit'), w('ne'), wf('fole', 'folenë', 'the nest')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('do'), w('te_subj'), w('ha'), w('nje'), w('zog'), p('!')),
    ],
    options: [
      { text: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'foleShpetuar' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  foleShpetuar: {
    id: 'foleShpetuar',
    text: [
      L(w('ti'), w('vrit'), wf('gjarper', 'gjarprin', 'the serpent'), w('dhe'), w('shpeto'), wf('zog', 'zogun', 'the chick'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('vjen'), w('dhe'), w('thote'), p(':')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('do'), w('te_subj'), w('ndihmo'), w('ti'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('shqiponje', 'shqiponjën', 'the eagle')), to: 'rrethi' },
    ],
  },
}

// ---------------------------------------------------------------------------
// CONFUSERS — every non-ending node gets THREE distractor options. A distractor
// must be genuinely IMPOSSIBLE, never merely unwise. Two kinds qualify:
//   (1) an action on something NOT present in this scene (cross a bridge where
//       there is no bridge, call an eagle when none is here);
//   (2) a categorically-impossible action on something present (drink a
//       mountain, open a wolf, take a river, fight water, fly).
// We NEVER use a doable action on a present thing (e.g. "fight the old man" —
// you could fight a man, so it isn't nonsensical). Picking any costs a heart.
// ---------------------------------------------------------------------------
const eagleAcc = () => wf('shqiponje', 'shqiponjën', 'the eagle')
const bridgeAcc = () => wf('ure', 'urën', 'the bridge')
const forestAcc = () => wf('pyll', 'pyllin', 'the forest')
const wolfAcc = () => wf('ujk', 'ujkun', 'the wolf')
const fairyAcc = () => wf('zane', 'zanën', 'the fairy')
const oldManAcc = () => wf('plak', 'plakun', 'the old man')
const oldWomanAcc = () => wf('plake', 'plakën', 'the old woman')
const mountainAcc = () => wf('mal', 'malin', 'the mountain')
const wellAcc = () => wf('pus', 'pusin', 'the well')
const beautyAcc = () => wf('bukura', 'Bukurën', 'the Beauty')
const serpentAcc = () => wf('gjarper', 'gjarprin', 'the serpent')
const kulshAcc = () => wf('kulshedra', 'kulshedrën', 'the kulshedra')
const shadowAcc = () => wf('hije', 'hijen', 'the shadow')

// (1) an action on something NOT present in the scene
const CONFUSERS = {
  start: L(w('merr'), w('shpate')), //            take a sword — none here
  plaka: L(w('ngjit'), w('mal')), //              climb a mountain — none here
  fshatiDil: L(w('kalo'), bridgeAcc()), //        cross a bridge — none here
  pylli1: L(w('thirr'), eagleAcc()), //           call the eagle — none here
  pylliThelle: L(w('kalo'), bridgeAcc()), //      cross a bridge — none here
  shokuUjk: L(w('ngjit'), w('mal')), //           climb a mountain — none here
  udha: L(w('zbrit'), w('ne'), w('pus')), //      go down a well — none here
  lumi: L(w('ngjit'), w('mal')), //               climb a mountain — none here yet
  ura: L(w('thirr'), eagleAcc()), //              call the eagle — none here
  zana1: L(w('kalo'), bridgeAcc()), //            cross a bridge — none here
  zanaQumesht: L(w('merr'), w('shpate')), //      take a sword — none here
  zanaKripe: L(w('merr'), w('unaze')), //         take a ring — none here
  zanaPende: L(w('merr'), w('mish')), //          take meat — none here
  rrethi: L(w('zbrit'), w('ne'), w('pus')), //    go down a well — none here
  mali1: L(w('kalo'), bridgeAcc()), //            cross a bridge — none here
  mali2: L(w('thirr'), eagleAcc()), //            call the eagle — none here
  mali3: L(w('fluturo'), w('lart')), //           fly up — you cannot fly
  maja: L(w('kalo'), bridgeAcc()), //             cross a bridge — none here
  tomor1: L(w('kalo'), bridgeAcc()), //           cross a bridge — none here
  tomor2: L(w('kalo'), bridgeAcc()), //           cross a bridge — none here
  tomor3: L(w('kalo'), bridgeAcc()), //           cross a bridge — none here
  pusi: L(w('kalo'), bridgeAcc()), //             cross a bridge — none here
  zbritja: L(w('shko'), w('ne'), w('fshat')), //  go to the village — you are deep below
  bota1: L(w('fluturo'), w('lart')), //           fly up — you cannot
  dera: L(w('thirr'), eagleAcc()), //             call the eagle — none here
  sprova: L(w('thirr'), eagleAcc()), //           call the eagle — none here
  gjarpri: L(w('thirr'), eagleAcc()), //          call the eagle — none here
  bota2: L(w('shko'), w('ne'), w('kala')), //     go to the castle — you are underground
  uji: L(w('thirr'), eagleAcc()), //              call the eagle — none here
  bukura1: L(w('ngjit'), w('mal')), //            climb a mountain — none here
  bukura2: L(w('ngjit'), w('mal')), //            climb a mountain — none here
  kulshedra1: L(w('kalo'), bridgeAcc()), //       cross a bridge — none here
  fitorja: L(w('ngjit'), w('mal')), //            climb a mountain — none here
  kthimi: L(w('thirr'), eagleAcc()), //           call the eagle — none here
  pusi2: L(w('shko'), w('ne'), w('kala')), //     go to the castle — you are stuck in the well
  shqiponja1: L(w('kalo'), bridgeAcc()), //       cross a bridge — none here
  siperfaqja: L(w('zbrit'), w('ne'), w('pus')), //go down a well — you just escaped one
  udhaKthimit: L(w('zbrit'), w('ne'), w('pus')), //go down a well — none here
  kala1: L(w('ngjit'), w('mal')), //              climb a mountain — none here
  kala2: L(w('thirr'), eagleAcc()), //            call the eagle — none here
  pylliLoop: L(w('kalo'), bridgeAcc()), //        cross a bridge — none here
  gjumi: L(w('thirr'), eagleAcc()), //            call the eagle — none here
  zjarriPyll: L(w('ngjit'), w('mal')), //         climb a mountain — none here
  shtrigaNate: L(w('kalo'), bridgeAcc()), //      cross a bridge — none here
  fshehur: L(w('thirr'), eagleAcc()), //          call the eagle — none here
  humbur: L(w('ngjit'), w('mal')), //             climb a mountain — none here
  rene: L(w('ngjit'), w('mal')), //               climb a mountain — none here
  tre1: L(w('thirr'), eagleAcc()), //             call the eagle — none here (deep below)
  tre2: L(w('kalo'), bridgeAcc()), //             cross a bridge — none here
  tre3: L(w('ngjit'), w('mal')), //               climb a mountain — none here
  bregu: L(w('zbrit'), w('ne'), w('pus')), //     go down a well — none here
  balozTribut: L(w('thirr'), eagleAcc()), //      call the eagle — none here
  balozZgjedh: L(w('kalo'), bridgeAcc()), //      cross a bridge — none here
  balozLufte: L(w('ngjit'), w('mal')), //         climb a mountain — none here
  balozKoke: L(w('thirr'), eagleAcc()), //        call the eagle — none here
  zanaProva: L(w('fluturo'), w('lart')), //       fly up — you cannot fly
  zanaProva2: L(w('kalo'), bridgeAcc()), //       cross a bridge — none here
  zanaFole: L(w('kalo'), bridgeAcc()), //         cross a bridge — none here
  foleShpetuar: L(w('kalo'), bridgeAcc()), //     cross a bridge — none here
}

// (2) a categorically-impossible action on a PRESENT thing — shares a noun
// with the scene, so you can't dodge it by scanning for the noun.
const CONFUSERS2 = {
  start: L(w('hap'), forestAcc()), //                open the forest
  plaka: L(w('pi'), wf('buke', 'bukën', 'the bread')), //   drink the bread
  fshatiDil: L(w('pi'), forestAcc()), //            drink the forest
  pylli1: L(w('pi'), forestAcc()), //               drink the forest
  pylliThelle: L(w('pi'), wolfAcc()), //            drink the wolf
  shokuUjk: L(w('pi'), wolfAcc()), //               drink the wolf
  udha: L(w('merr'), wf('lume', 'lumin', 'the river')), //  take the river
  lumi: L(w('hap'), fairyAcc()), //                 open the fairy
  zana1: L(w('hap'), fairyAcc()), //                open the fairy
  zanaQumesht: L(w('lufto'), wf('qumesht', 'qumështin', 'the milk')), // fight the milk
  zanaKripe: L(w('pi'), wf('kripe', 'kripën', 'the salt')), // drink the salt
  zanaPende: L(w('lufto'), wf('pende', 'pendën', 'the feather')), // fight the feather
  rrethi: L(w('pi'), mountainAcc()), //             drink the mountain
  mali1: L(w('pi'), mountainAcc()), //              drink the mountain
  mali2: L(w('pi'), wf('gur', 'gurin', 'the stone')), //   drink the stone
  mali3: L(w('pi'), oldManAcc()), //                drink the old man
  maja: L(w('pi'), oldManAcc()), //                 drink the old man
  tomor1: L(w('pi'), w('tomor')), //                drink Tomorr
  tomor2: L(w('pi'), wf('shpate', 'shpatën', 'the sword')), // drink the sword
  tomor3: L(w('pi'), wellAcc()), //                 drink the well
  pusi: L(w('pi'), wellAcc()), //                   drink the well
  zbritja: L(w('pi'), wf('bote', 'botën', 'the world')), // drink the world
  bota1: L(w('pi'), wf('dere', 'derën', 'the door')), //  drink the door
  bota2: L(w('pi'), wf('mish', 'mishin', 'the meat')), //  drink the meat
  bukura1: L(w('hap'), beautyAcc()), //             open the Beauty
  bukura2: L(w('pi'), wf('unaze', 'unazën', 'the ring')), // drink the ring
  kulshedra1: L(w('pi'), kulshAcc()), //            drink the kulshedra
  fitorja: L(w('lufto'), wf('uje', 'ujin', 'the water')), // fight the water
  pusi2: L(w('pi'), wellAcc()), //                  drink the well
  shqiponja1: L(w('pi'), wf('mish', 'mishin', 'the meat')), // drink the meat
  siperfaqja: L(w('pi'), wf('rruge', 'rrugën', 'the road')), // drink the road
  kala1: L(w('pi'), wf('mur', 'murin', 'the wall')), //   drink the wall
  kala2: L(w('pi'), wf('mur', 'murin', 'the wall')), //   drink the wall
  pylliLoop: L(w('pi'), forestAcc()), //            drink the forest
  gjumi: L(w('pi'), wolfAcc()), //                  drink the wolf
  ura: L(w('pi'), bridgeAcc()), //                  drink the bridge
  dera: L(w('pi'), wf('dere', 'derën', 'the door')), //   drink the door
  sprova: L(w('merr'), shadowAcc()), //             take the shadow
  gjarpri: L(w('hap'), serpentAcc()), //            open the serpent
  uji: L(w('lufto'), wf('uje', 'ujin', 'the water')), //  fight the water
  kthimi: L(w('pi'), wellAcc()), //                 drink the well
  udhaKthimit: L(w('pi'), wf('kala', 'kalanë', 'the castle')), // drink the castle
  zjarriPyll: L(w('pi'), wf('zjarr', 'zjarrin', 'the fire')), // drink the fire
  shtrigaNate: L(w('pi'), wf('shtrige', 'shtrigën', 'the witch')), // drink the witch
  fshehur: L(w('pi'), wf('thesar', 'thesarin', 'the treasure')), // drink the treasure
  humbur: L(w('merr'), wf('drite', 'dritën', 'the light')), // take the light
  rene: L(w('pi'), wf('det', 'detin', 'the sea')), //    drink the sea
  tre1: L(w('pi'), wf('shtepi', 'shtëpinë', 'the house')), // drink the house
  tre2: L(w('pi'), beautyAcc()), //                 drink the Beauty
  tre3: L(w('pi'), kulshAcc()), //                  drink the kulshedra
  bregu: L(w('pi'), wf('det', 'detin', 'the sea')), //   drink the sea
  balozTribut: L(w('hap'), wf('det', 'detin', 'the sea')), // open the sea
  balozZgjedh: L(w('pi'), wf('plage', 'plagën', 'the wound')), // drink the wound
  balozLufte: L(w('pi'), wf('baloz', 'balozin', 'the sea-monster')), // drink the sea-monster
  balozKoke: L(w('pi'), wf('koke', 'kokën', 'the head')), // drink the head
  zanaProva: L(w('pi'), wf('naten', 'natën', 'the night')), // drink the night
  zanaProva2: L(w('pi'), wf('dite', 'ditën', 'the day')), //  drink the day
  zanaFole: L(w('pi'), wf('peme', 'pemën', 'the tree')), //   drink the tree
  foleShpetuar: L(w('pi'), eagleAcc()), //          drink the eagle
}

// (3) a third distractor — another impossible action (open/take/fight a present
// thing, or fly), distinct from the other two for that node.
const CONFUSERS3 = {
  start: L(w('pi'), wf('fshat', 'fshatin', 'the village')), // drink the village
  plaka: L(w('hap'), oldWomanAcc()), //             open the old woman
  fshatiDil: L(w('merr'), forestAcc()), //          take the forest
  pylli1: L(w('hap'), forestAcc()), //              open the forest
  pylliThelle: L(w('hap'), forestAcc()), //         open the forest
  shokuUjk: L(w('hap'), wolfAcc()), //              open the wolf
  udha: L(w('pi'), wolfAcc()), //                   drink the wolf
  lumi: L(w('pi'), fairyAcc()), //                  drink the fairy
  zana1: L(w('pi'), fairyAcc()), //                 drink the fairy
  zanaQumesht: L(w('hap'), fairyAcc()), //          open the fairy
  zanaKripe: L(w('hap'), fairyAcc()), //            open the fairy
  zanaPende: L(w('pi'), wf('pende', 'pendën', 'the feather')), // drink the feather
  rrethi: L(w('hap'), fairyAcc()), //               open the fairy
  mali1: L(w('merr'), mountainAcc()), //            take the mountain
  mali2: L(w('lufto'), wf('gur', 'gurin', 'the stone')), // fight the stone
  mali3: L(w('hap'), oldManAcc()), //               open the old man
  maja: L(w('pi'), mountainAcc()), //               drink the mountain
  tomor1: L(w('hap'), w('tomor')), //               open Tomorr
  tomor2: L(w('lufto'), wf('shpate', 'shpatën', 'the sword')), // fight the sword
  tomor3: L(w('merr'), wellAcc()), //               take the well
  pusi: L(w('merr'), wellAcc()), //                 take the well
  zbritja: L(w('merr'), wellAcc()), //              take the well
  bota1: L(w('pi'), wf('bote', 'botën', 'the world')), // drink the world
  bota2: L(w('hap'), wf('shpelle', 'shpellën', 'the cave')), // open the cave
  bukura1: L(w('fluturo'), w('lart')), //           fly up — you cannot fly
  bukura2: L(w('hap'), beautyAcc()), //             open the Beauty
  kulshedra1: L(w('pi'), wf('zjarr', 'zjarrin', 'the fire')), // drink the fire
  fitorja: L(w('pi'), kulshAcc()), //               drink the kulshedra
  pusi2: L(w('merr'), wellAcc()), //                take the well
  shqiponja1: L(w('hap'), eagleAcc()), //           open the eagle
  siperfaqja: L(w('hap'), eagleAcc()), //           open the eagle
  kala1: L(w('pi'), wf('kala', 'kalanë', 'the castle')), // drink the castle
  kala2: L(w('lufto'), wf('qumesht', 'qumështin', 'the milk')), // fight the milk
  pylliLoop: L(w('hap'), forestAcc()), //           open the forest
  gjumi: L(w('hap'), wolfAcc()), //                 open the wolf
  ura: L(w('merr'), bridgeAcc()), //                take the bridge
  dera: L(w('merr'), shadowAcc()), //               take the shadow
  sprova: L(w('vrit'), shadowAcc()), //             kill the shadow — it is only you
  gjarpri: L(w('pi'), serpentAcc()), //             drink the serpent
  uji: L(w('fluturo'), w('lart')), //               fly up — you cannot fly
  kthimi: L(w('merr'), wellAcc()), //               take the well
  udhaKthimit: L(w('fluturo'), w('lart')), //       fly up — you cannot fly
  zjarriPyll: L(w('hap'), oldWomanAcc()), //        open the old woman
  shtrigaNate: L(w('hap'), wf('shtrige', 'shtrigën', 'the witch')), // open the witch
  fshehur: L(w('hap'), serpentAcc()), //            open the serpent
  humbur: L(w('merr'), wf('erresire', 'errësirën', 'the darkness')), // take the darkness
  rene: L(w('merr'), wf('det', 'detin', 'the sea')), //   take the sea
  tre1: L(w('hap'), beautyAcc()), //                open the Beauty
  tre2: L(w('fluturo'), w('lart')), //              fly up — you cannot fly
  tre3: L(w('pi'), wf('shpate', 'shpatën', 'the sword')), // drink the sword
  bregu: L(w('ngjit'), w('mal')), //                climb a mountain — none here
  balozTribut: L(w('pi'), wf('baloz', 'balozin', 'the sea-monster')), // drink the sea-monster
  balozZgjedh: L(w('fluturo'), w('lart')), //       fly up — you cannot fly
  balozLufte: L(w('hap'), wf('baloz', 'balozin', 'the sea-monster')), // open the sea-monster
  balozKoke: L(w('pi'), wf('det', 'detin', 'the sea')), // drink the sea
}

// inject all three distractors into every non-ending node
for (const [id, node] of Object.entries(STORY)) {
  if (node.end) continue
  for (const map of [CONFUSERS, CONFUSERS2, CONFUSERS3]) {
    if (map[id]) node.options.push({ text: map[id], confuser: true })
  }
}

// Master list of endings (every node with an `end`) for the collection tab.
export const ENDINGS = Object.values(STORY)
  .filter((n) => n.end)
  .map((n) => ({ id: n.id, kind: n.end, title: n.title || n.id, blurb: n.blurb || '' }))

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
    word: 'eliksir',
    blurb: 'Refreshes peak for 3 turns — hover a discovered Albanian word to see its English.',
    use: {
      label: 'Drink',
      phrase: [w('pi'), w('eliksir')], // "drink potion"
      effect: { peakTurns: 3 },
    },
  },
  qumesht: {
    id: 'qumesht',
    icon: '🥛',
    name: "Zana's milk",
    al: 'qumësht',
    blurb: 'The mountain fairy’s milk — drink it to recover a heart. (As the Zana suckled the hero Mujo to give him strength.)',
    use: {
      label: 'Drink',
      phrase: [w('pi'), w('qumesht')], // "drink milk"
      effect: { hearts: 1 },
    },
  },
  // key items — carried, used by choosing the right path in the story
  buke: {
    id: 'buke', icon: '🍞', name: 'Bread', al: 'bukë',
    blurb: 'A loaf from the old woman. Hunger walks the forest — bread can buy a friend or a passage. Eat it yourself to recover all your hearts — but then it is gone.',
    use: {
      label: 'Eat',
      phrase: [w('ha'), w('buke')], // "eat bread"
      effect: { hearts: 3 }, // restores to full (capped at START_HEARTS)
    },
  },
  shpate: {
    id: 'shpate', icon: '⚔️', name: 'Sword', al: 'shpatë',
    blurb: 'Baba Tomor’s blade. The only steel that bites a Kulshedra — and it cuts a path past her guardian serpent.',
  },
  gur: {
    id: 'gur', icon: '🪨', name: 'Thunder-stone', al: 'gur',
    blurb: 'A stone from the storm where a Drangue fought. Hurled at the Kulshedra, it strikes like lightning — a hidden ending.',
  },
  kripe: {
    id: 'kripe', icon: '🧂', name: 'Salt', al: 'kripë',
    blurb: 'The Zana’s salt. Thrown in the Kulshedra’s many eyes, it blinds the she-dragon.',
  },
  pende: {
    id: 'pende', icon: '🪶', name: 'Feather', al: 'pendë',
    blurb: 'An eagle’s feather. Hold it up at the bottom of the well and the great eagle will come.',
  },
  mish: {
    id: 'mish', icon: '🍖', name: 'Meat', al: 'mish',
    blurb: 'Meat from the Kulshedra’s larder. The eagle will only carry you up if it is fed.',
  },
  unaze: {
    id: 'unaze', icon: '💍', name: "Beauty's ring", al: 'unazë',
    blurb: 'E Bukura e Dheut’s ring. Proof of who you saved — and the key to the best of endings.',
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
  for (const item of Object.values(ITEMS)) if (item.use) for (const t of item.use.phrase) add(t)
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

  // qualities used in the story
  vjeter: L(w('jo'), w('i_art'), w('ri')), //          not new
  drite: L(w('jo'), w('erret')), //                    not dark
  sy: L(w('me'), w('sy'), w('ti'), w('sheh')), //      with eyes you see

  // journey places & actions
  lume: L(w('shume'), w('uje')), //                    much water
  ure: L(w('nje'), w('vend'), w('ku'), w('ti'), w('kalo')), // a place where you cross
  mal: L(w('nje'), w('vend'), w('i_art'), w('madh')), //       a big place
  shpelle: L(w('nje'), w('vend'), w('ne'), w('mal')), //       a place in a mountain
  plak: L(w('nje'), w('njeri'), w('i_art'), w('vjeter')), //   an old person
  kalo: L(w('ec'), w('ne'), w('ure')), //              walk on a bridge

  // === folklore vocabulary ===
  // characters & creatures
  fshat: L(w('nje'), w('vend'), w('me'), w('shtepi')), //          a place with houses
  plake: L(w('nje'), w('nene'), w('e_art'), w('vjeter')), //       an old mother
  kulshedra: L(w('nje'), w('gjarper'), w('i_art'), w('madh'), w('me'), w('zjarr')), // a big serpent with fire
  zane: L(w('nje'), w('e_art'), w('bukur'), w('te_link'), w('mal')), // a beautiful one of the mountain
  bukura: L(w('nje'), w('nene'), w('e_art'), w('bukur')), //       a beautiful woman
  dragua: L(w('nje'), w('trim'), w('i_art'), w('forte')), //       a strong hero
  trim: L(w('nje'), w('njeri'), w('i_art'), w('forte')), //        a strong person
  shqiponje: L(w('nje'), w('kafshe'), w('qe'), w('fluturo')), //   an animal that flies
  gjarper: L(w('nje'), w('kafshe'), w('pa'), w('kembe')), //       an animal without legs
  mbret: L(w('nje'), w('njeri'), w('te_link'), w('kala')), //      a person of the castle
  nene: L(w('nje'), w('njeri'), w('me'), w('femije')), //          a person with a child
  femije: L(w('nje'), w('njeri'), w('i_art'), w('vogel')), //      a small person
  tomor: L(w('nje'), w('mal'), w('i_art'), w('madh')), //          a big mountain
  // places & things
  pus: L(w('nje'), w('vend'), w('me'), w('uje'), w('poshte')), //  a place with water below
  bote: L(w('nje'), w('vend'), w('i_art'), w('madh')), //          a big place
  kala: L(w('nje'), w('vend'), w('me'), w('mur')), //              a place with walls
  mur: L(w('nje'), w('gje'), w('te_link'), w('kala')), //          a thing of a castle
  koke: L(w('ku'), w('rri'), w('sy')), //                          where the eyes are
  buke: L(w('nje'), w('ushqim')), //                               a food
  mish: L(w('ushqim'), w('te_link'), w('kafshe')), //              food from an animal
  kripe: L(w('per'), w('ushqim')), //                              for food
  unaze: L(w('nje'), w('gje'), w('e_art'), w('vogel')), //         a small thing
  pende: L(w('nje'), w('gje'), w('te_link'), w('shqiponje')), //   a thing of an eagle
  qumesht: L(w('nje'), w('leng'), w('te_link'), w('nene')), //     a liquid of a mother
  shpate: L(w('nje'), w('gje'), w('qe'), w('pre')), //             a thing that cuts
  gur: L(w('nje'), w('gje'), w('e_art'), w('forte')), //           a hard thing
  // verbs
  shko: L(w('ec'), w('larg')), //                                  walk far
  lufto: L(w('ti'), w('vrit')), //                                 you kill
  vrit: L(w('bej'), w('vdes')), //                                 make die
  shpeto: L(w('ndihmo')), //                                       help
  ngjit: L(w('shko'), w('lart')), //                               go up
  zbrit: L(w('shko'), w('poshte')), //                             go down
  fluturo: L(w('shko'), w('lart')), //                             go up (through air)
  degjo: L(w('ti'), w('merr'), w('fjale')), //                     you take in words
  flet: L(w('thote'), w('fjale')), //                              says words
  thote: L(w('jep'), w('fjale')), //                              gives a word
  ndihmo: L(w('jep'), w('fuqi')), //                               give power
  beso: L(w('je'), w('mik')), //                                   be a friend
  hyr: L(w('shko'), w('brenda')), //                               go inside
  dil: L(w('shko'), w('jashte')), //                               go outside
  thirr: L(w('flet'), w('larg')), //                               speak afar
  hidh: L(w('jep'), w('larg')), //                                 send far
  kthehu: L(w('vjen'), w('perseri')), //                           come again
  vdes: L(w('nuk'), w('je')), //                                   you are no more
  bie: L(w('shko'), w('poshte')), //                               go down
  pre: L(w('me'), w('shpate')), //                                 with a sword
  // qualities & connectors
  forte: L(w('me'), w('fuqi')), //                                 with power
  bukur: L(w('shume'), w('mire')), //                              very good
  keq: L(w('jo'), w('mire')), //                                   not good
  thate: L(w('pa'), w('uje')), //                                  without water
  lart: L(w('jo'), w('poshte')), //                               not below
  larg: L(w('jo'), w('ketu')), //                                 not here
  por: L(w('dhe'), w('jo')), //                                   and not
  nuk: L(w('jo')), //                                              not
  per: L(w('te_subj')), //                                         to / for
  une: L(w('jo'), w('ti')), //                                    not you (= me)
  do: L(w('kerko')), //                                            to seek
  fuqi: L(w('ti'), w('je'), w('i_art'), w('madh')), //             you are great
  hije: L(w('nje'), w('gje'), w('e_art'), w('erret')), //          a dark thing
  me: L(w('jo'), w('pa')), //                                      not without
  poshte: L(w('jo'), w('lart')), //                               not up
  prek: L(w('jo'), w('larg')), //                                 not far (right up close)
  shume: L(w('jo'), w('vogel')), //                               not small (in number)
  tani: L(w('kohe')), //                                           this time
  shtrige: L(w('nje'), w('plake'), w('e_art'), w('keq')), //       a bad old woman
  ora: L(w('nje'), w('hije'), w('e_art'), w('mire')), //           a good spirit
  det: L(w('nje'), w('lume'), w('i_art'), w('madh')), //           a big water
  ftohte: L(w('pa'), w('zjarr')), //                              without fire (cold)
  prit: L(w('jo'), w('ec')), //                                   do not walk (stay)
  tjeter: L(w('nje'), w('gje'), w('e_art'), w('ri')), //          a new one
  rrezik: L(w('ku'), w('ti'), w('mund'), w('te_subj'), w('vdes')), // where you can die
  // --- the Baloz branch ---
  baloz: L(w('nje'), w('gjarper'), w('te_link'), w('det')), //     a serpent of the sea
  motra: L(w('nje'), w('vajze')), //                              a maiden (your sister)
  plage: L(w('nje'), w('gje'), w('e_art'), w('keq')), //          a bad thing
  nente: L(w('shume')), //                                        many
  vajze: L(w('nje'), w('e_art'), w('bukur'), w('njeri')), //      a beautiful person
  fole: L(w('nje'), w('shtepi'), w('te_link'), w('shqiponje')), // a house of the eagle
  zog: L(w('nje'), w('e_art'), w('vogel'), w('shqiponje')), //    a small eagle
  dite: L(w('nje'), w('kohe'), w('me'), w('drite')), //           a time with light
  peme: L(w('nje'), w('gje'), w('ne'), w('pyll')), //             a thing in the forest
}
