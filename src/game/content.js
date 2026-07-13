// ---------------------------------------------------------------------------
// DICTIONARY
// Each entry is one word/sense. `id` is the sense id (discovery + mana are keyed
// on it). `al` is the Albanian lemma surface, `en` is the English gloss.
// A word with multiple senses simply gets multiple entries with different ids.
//
// When one Albanian word covers several close English senses that don't warrant
// separate ids (e.g. në = "on / in"), give it `en` = the single best default
// sense and `enAll` = every sense. The story shows the contextual sense (`en`,
// or a per-token override via wf(id, al, en)); training mode shows `enAll`.
// ---------------------------------------------------------------------------
export const DICT = {
  ti:        { al: 'ti',        en: 'you' },
  je:        { al: 'je',        en: 'are' },
  ne:        { al: 'në',        en: 'in', enAll: 'in / on / to / at' },
  nje:       { al: 'një',       en: 'a' },
  pyll:      { al: 'pyll',      en: 'forest' },
  madh:      { al: 'madh',      en: 'big' },
  sheh:      { al: 'sheh',      en: 'see' },
  rruge:     { al: 'rrugë',     en: 'road', forms: [
    { al: 'rrugë',  tag: 'indefNom', gloss: 'a road' },
    { al: 'rruga',  tag: 'defNom',   gloss: 'the road' },
    { al: 'rrugën', tag: 'defAcc',   gloss: 'the road (object)' },
    { al: 'rrugës', tag: 'defDat',   gloss: 'to/of the road' },
    { al: 'rrugët', tag: 'plDef',    gloss: 'the roads' },
  ] },
  ec:        { al: 'ec',        en: 'walk' },
  fle:       { al: 'fle',       en: 'sleep' },
  ketu:      { al: 'këtu',      en: 'here' },
  dhe:       { al: 'dhe',       en: 'and' },
  shtepi:    { al: 'shtëpi',    en: 'house', forms: [
    { al: 'shtëpi',   tag: 'indefNom', gloss: 'a house' },
    { al: 'shtëpia',  tag: 'defNom',   gloss: 'the house' },
    { al: 'shtëpinë', tag: 'defAcc',   gloss: 'the house (object)' },
    { al: 'shtëpisë', tag: 'defDat',   gloss: 'to/of the house' },
    { al: 'shtëpitë', tag: 'plDef',    gloss: 'the houses' },
  ] },
  ka:        { al: 'ka',        en: 'has' },
  dere:      { al: 'derë',      en: 'door', forms: [
    { al: 'derë',  tag: 'indefNom', gloss: 'a door' },
    { al: 'dera',  tag: 'defNom',   gloss: 'the door' },
    { al: 'derën', tag: 'defAcc',   gloss: 'the door (object)' },
    { al: 'derës', tag: 'defDat', gloss: "to/of the door" },
  ] },
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
  mik:       { al: 'mik',       en: 'friend', enAll: 'friend / guest' }, // mik = the sacred guest of the Kanun
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
  te_link:   { al: 'të',        en: 'of',  ctx: { al: 'fuqi të rrufe', en: 'power __ lightning', focus: 'të' } },   // linking particle
  te_subj:   { al: 'të',        en: 'to',  ctx: { al: 'mund të pi', en: 'can __ drink', focus: 'të' } },   // subjunctive particle
  te_obj:    { al: 'të',        en: 'you', ctx: { al: 'ujku të ha', en: 'the wolf eats __', focus: 'të' } },  // object clitic
  mund:      { al: 'mund',      en: 'can' },
  deri:      { al: 'deri',      en: 'until' },
  i_art:     { al: 'i',         en: 'the', ctx: { al: 'i uritur', en: '__ hungry', focus: 'i' } },  // adjectival article
  i_link:    { al: 'i',         en: 'of',  ctx: { al: 'syri i gjarprit', en: 'the eye __ the serpent', focus: 'i' } },   // masculine linking article
  kerko:     { al: 'kërko',     en: 'search' },
  thesar:    { al: 'thesar',    en: 'treasure' },
  gjen:      { al: 'gjen',      en: 'finds' },
  // places & things along the journey
  lume:      { al: 'lumë',      en: 'river' },
  ure:       { al: 'urë',       en: 'bridge' },
  mal:       { al: 'mal',       en: 'mountain', forms: [
    { al: 'mal',   tag: 'indefNom', gloss: 'a mountain' },
    { al: 'mali',  tag: 'defNom',   gloss: 'the mountain' },
    { al: 'malin', tag: 'defAcc',   gloss: 'the mountain (object)' },
    { al: 'malit', tag: 'defDat',   gloss: 'to/of the mountain' },
    { al: 'malet', tag: 'plDef',    gloss: 'the mountains' },
  ] },
  shpelle:   { al: 'shpellë',   en: 'cave' },
  plak:      { al: 'plak',      en: 'old man', forms: [
    { al: 'plak',   tag: 'indefNom', gloss: 'an old man' },
    { al: 'plaku',  tag: 'defNom',   gloss: 'the old man' },
    { al: 'plakun', tag: 'defAcc',   gloss: 'the old man (object)' },
    { al: 'plako',  tag: 'voc',      gloss: 'old man (buddy)' },
  ] },
  kalo:      { al: 'kalo',      en: 'cross' },
  // --- folklore: characters & creatures ---
  fshat:     { al: 'fshat',     en: 'village', forms: [
    { al: 'fshat',   tag: 'indefNom', gloss: 'a village' },
    { al: 'fshati',  tag: 'defNom',   gloss: 'the village' },
    { al: 'fshatin', tag: 'defAcc',   gloss: 'the village (object)' },
  ] },
  plake:     { al: 'plakë',     en: 'old woman' },
  kulshedra: { al: 'kulshedra', en: 'she-dragon' }, // the Kulshedra: multi-headed, fire-spitting
  zane:      { al: 'zanë',      en: 'fairy' },     // mountain fairy (Zana)
  bukura:    { al: 'Bukura',    en: 'the Beauty' },// E Bukura e Dheut
  dragua:    { al: 'dragua',    en: 'dragon-hero' },// the Drangue
  trim:      { al: 'trim',      en: 'hero', forms: [
    { al: 'trim',   tag: 'indefNom', gloss: 'a hero' },
    { al: 'trimi',  tag: 'defNom',   gloss: 'the hero' },
    { al: 'trimin', tag: 'defAcc',   gloss: 'the hero (object)' },
    { al: 'trimit', tag: 'defDat',   gloss: 'to/of the hero' },
    { al: 'trima',  tag: 'plIndef',  gloss: 'heroes' },
    { al: 'trimave', tag: 'plDat', gloss: "to/of the heroes" },
  ] },
  shqiponje: { al: 'shqiponjë', en: 'eagle' },
  gjarper:   { al: 'gjarpër',   en: 'serpent' },
  mbret:     { al: 'mbret',     en: 'king', forms: [
    { al: 'mbret',   tag: 'indefNom', gloss: 'a king' },
    { al: 'mbreti',  tag: 'defNom',   gloss: 'the king' },
    { al: 'mbretin', tag: 'defAcc',   gloss: 'the king (object)' },
    { al: 'mbretit', tag: 'defDat',   gloss: 'to/of the king' },
  ] },
  nene:      { al: 'nënë',      en: 'mother' },
  femije:    { al: 'fëmijë',    en: 'child' },
  tomor:     { al: 'Tomor',     en: 'Tomorr' },    // the sky-father mountain
  // --- folklore: places & things ---
  pus:       { al: 'pus',       en: 'well' },
  bote:      { al: 'botë',      en: 'world' },
  kala:      { al: 'kala',      en: 'castle' },
  qytet:     { al: 'qytet',     en: 'city' },   // the dead cavern-city of the hoard (Durham, High Albania)
  treg:      { al: 'treg',      en: 'market' }, // its ghostly bazaar of fine wares
  shesh:     { al: 'shesh',     en: 'square' }, // the village square, crossed side to side
  pishtar:   { al: 'pishtar',   en: 'torch' },  // made from the forest fire; light for the dark cavern
  mur:       { al: 'mur',       en: 'wall' },
  hije:      { al: 'hije',      en: 'shadow' },
  dite:      { al: 'ditë',      en: 'day' },
  agim:      { al: 'agim',      en: 'dawn' },  // time-of-day phase word (the 🌅 chip)
  muzg:      { al: 'muzg',      en: 'dusk' },  // time-of-day phase word (the 🌆 chip)
  yll:       { al: 'yll',       en: 'star' },
  pleq:      { al: 'pleq',      en: 'elders' },
  gjinkalla: { al: 'gjinkalla', en: 'cicada' },
  burg:      { al: 'burg',      en: 'prison' },
  koke:      { al: 'kokë',      en: 'head' },
  bese:      { al: 'besë',      en: 'oath' },
  // --- items ---
  buke:      { al: 'bukë',      en: 'bread' },
  mish:      { al: 'mish',      en: 'meat' },
  peshk:     { al: 'peshk',     en: 'fish' },   // a ware in the dead city's bazaar (Durham)
  qengj:     { al: 'qengj',     en: 'lamb' },
  kashte:    { al: 'kashtë',    en: 'hay' },
  kukull:    { al: 'kukull',    en: 'doll' },
  varros:    { al: 'varros',    en: 'buries' },
  balte:     { al: 'baltë',     en: 'clay' },
  gjalpe:    { al: 'gjalpë',    en: 'butter' },
  karkanxholl: { al: 'karkanxholl', en: 'iron-clad revenant' }, // kallikantzaros-kin, prowls the 12 nights
  troket:    { al: 'troket',    en: 'knocks' },
  kuzhinier: { al: 'kuzhinier', en: 'cook' },
  mos:       { al: 'mos',       en: 'do not' },
  ze:        { al: 'zë',        en: 'sound' },
  pagezim:   { al: 'pagëzim',   en: 'christening' },
  goje:      { al: 'gojë',      en: 'mouth' },
  djathe:    { al: 'djathë',    en: 'cheese' },
  shtrydh:   { al: 'shtrydh',   en: 'squeezes' },
  plesht:    { al: 'plesht',    en: 'flea' },
  kerce:     { al: 'kërcen',    en: 'leaps' },
  ballokume: { al: 'ballokume', en: 'cake' },
  flutur:    { al: 'flutur',    en: 'moth' },
  dre:       { al: 'dre',       en: 'stag' },
  kose:      { al: 'kosë',      en: 'scythe' },
  shkop:     { al: 'shkop',     en: 'cudgel' },
  gershere:  { al: 'gërshërë',  en: 'scissors' },
  qep:       { al: 'qep',       en: 'sews' },
  rreze:     { al: 'rreze',     en: 'ray' },     // a sunbeam — the road to the Sun's house
  pallat:    { al: 'pallat',    en: 'palace' },
  mbreteresha:{ al: 'mbretëreshë', en: 'queen' },
  liber:     { al: 'libër',     en: 'book' },
  laker:     { al: 'lakër',     en: 'cabbage' },
  kopsht:    { al: 'kopsht',    en: 'garden' },
  shkolle:   { al: 'shkollë',   en: 'school' },
  lut:       { al: 'lut',       en: 'prays' },
  dymbedhjete:{ al: 'dymbëdhjetë', en: 'twelve' },
  thyhet:    { al: 'thyhet',    en: 'breaks' },
  etur:      { al: 'etur',      en: 'thirsty' },
  atje:      { al: 'atje',      en: 'there' },
  hip:       { al: 'hip',       en: 'climbs' },
  mermer:    { al: 'mermer',    en: 'marble' },
  sherbetore:{ al: 'shërbëtore', en: 'servant' },
  pate:      { al: 'patë',      en: 'goose' },
  zgjuar:    { al: 'zgjuar',    en: 'awake' },
  zhytet:    { al: 'zhytet',    en: 'dives' },
  aga:       { al: 'aga',       en: 'aga' },
  xhami:     { al: 'xhami',     en: 'mosque' },
  tabak:     { al: 'tabak',     en: 'tanner' },   // the leather-workers; their stone bridge over the river is Ura e Tabakëve
  lekure:    { al: 'lëkurë',    en: 'leather' },
  kafe:      { al: 'kafe',      en: 'coffee' },
  krajl:     { al: 'krajl',     en: 'Slav king' },
  rusha:     { al: 'Rusha',     en: 'Rusha' },
  kripe:     { al: 'kripë',     en: 'salt' },
  pende:     { al: 'pendë',     en: 'feather' },
  kafaz:     { al: 'kafaz',     en: 'cage' },
  qiri:      { al: 'qiri',      en: 'candle' },
  kapidan:   { al: 'kapidan',   en: 'captain' },
  mejdan:    { al: 'mejdan',    en: 'single-combat' },
  hendek:    { al: 'hendek',    en: 'moat' },
  hu:        { al: 'hu',        en: 'stake' },
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
  vdes:      { al: 'vdes',      en: 'dies', enAll: 'dies / die / dead' },
  varr:      { al: 'varr',      en: 'grave' },  // for Gjergj & his sister's single grave
  emer:      { al: 'emër',      en: 'name' },
  mbi:       { al: 'mbi',       en: 'over' },
  vetem:     { al: 'vetëm',     en: 'only', enAll: 'only / alone' },
  zemer:     { al: 'zemër',     en: 'heart' },
  bashke:    { al: 'bashkë',    en: 'together' },
  gjalle:    { al: 'gjallë',    en: 'alive' },
  nga:       { al: 'nga',       en: 'from' },
  sjell:     { al: 'sjell',     en: 'brings' },
  marto:     { al: 'martohet',  en: 'marries' },
  mallko:    { al: 'mallkon',   en: 'curses' },
  le:        { al: 'lë',        en: 'leaves' },  // lë = sets down / leaves behind
  grua:      { al: 'grua',      en: 'woman' },  // grua = woman / wife
  unaze:     { al: 'unazë',     en: 'ring' },   // the portrait-ring Tanusha knows Halil by
  fytyre:    { al: 'fytyrë',    en: 'face' },
  dru:       { al: 'dru',       en: 'wood' },   // Sari Salltëk's wooden sword
  mushkonje: { al: 'mushkonjë', en: 'mosquito' }, // the serpent's spy in the swallow fable
  bisht:     { al: 'bisht',     en: 'tail' },   // the swallow's forked tail
  bretkose:  { al: 'bretkosë',  en: 'frog' },   // the Half-Rooster's swallowed helpers
  dhelpra:   { al: 'dhelpër',   en: 'fox' },
  mi:        { al: 'mi',        en: 'mouse' },
  rrobe:     { al: 'rrobë',     en: 'dress' },   // e Bukura e Dheut's power-in-the-dress
  krah:      { al: 'krah',      en: 'wing', enAll: 'wing / wings / arm' },    // the dragua's wings under the arms; të lumtë krahu = the arm
  kuq:       { al: 'kuq',       en: 'red' },     // the Kulshedra's reddish hair
  bri:       { al: 'bri',       en: 'horn' },    // the Vitore's golden horns
  gju:       { al: 'gju',       en: 'knee' },    // the Katallan has no knees
  zgjedh:    { al: 'zgjedh',    en: 'chooses' }, // Mujo chooses strength
  pasuri:    { al: 'pasuri',    en: 'wealth' },
  ngre:      { al: 'ngre',      en: 'lifts' },  // Mujo lifts the boulder after the Zana's milk
  sot:       { al: 'sot',       en: 'today' },
  vere:      { al: 'verë',      en: 'summer' }, // Dita e Verës, the spring-new-year festival
  feste:     { al: 'festë',     en: 'festival' },
  liqen:     { al: 'liqen',     en: 'lake' },
  flocka:    { al: 'Floçka',    en: 'water-maiden' }, // the lake-fairy who must be taught to speak
  meso:      { al: 'mëso',      en: 'teaches' },
  burre:     { al: 'burrë',     en: 'man' },     // burrë = man (the gjâmë is the men's lament)
  gjeme:     { al: 'gjëmë',     en: 'death-wail' }, // the men's stylized funeral lament
  vajtim:    { al: 'vajtim',    en: 'lament' },  // the women's sung lament for the dead
  stihi:     { al: 'Stihi',     en: 'fire-dragon' }, // the female fire-breathing treasure-guardian
  flake:     { al: 'flakë',     en: 'flame' },
  nxjerr:    { al: 'nxjerr',    en: 'breathes' }, // nxjerr zjarr = breathes fire
  semure:    { al: 'sëmuret',   en: 'sickens' }, // the evil eye (syri i keq) sickens the praised child
  hudher:    { al: 'hudhër',    en: 'garlic' },
  peri:      { al: 'Peri',      en: 'white fairy' }, // the white-clad spring/mountain nymph
  krua:      { al: 'krua',      en: 'spring' },  // a water-spring
  xhind:     { al: 'Xhind',     en: 'jinn' },    // the invisible threshold/water spirit
  prag:      { al: 'prag',      en: 'threshold' },
  bie:       { al: 'bie',       en: 'falls' },
  pre:       { al: 'pre',       en: 'cut' },
  // --- qualities & connectors ---
  forte:     { al: 'fortë',     en: 'strong' },
  bukur:     { al: 'bukur',     en: 'beautiful' },
  keq:       { al: 'keq',       en: 'bad' },
  thate:     { al: 'thatë',     en: 'dry' },
  lart:      { al: 'lart',      en: 'up', enAll: 'up / high' },
  por:       { al: 'por',       en: 'but' },
  // 'po' is highly polysemous — three grammatically distinct senses on one surface:
  po_yes:    { al: 'po',        en: 'yes', ctx: { al: 'ti thua: po', en: 'you say: __', focus: 'po' } },  // affirmation
  po_prog:   { al: 'po',        en: 'is',  ctx: { al: 'uji po vjen', en: 'the water __ coming', focus: 'po' } },   // progressive marker, "is …-ing"
  po_but:    { al: 'po',        en: 'but', ctx: { al: 'rri këtu po nuk ka ujë', en: 'stays here __ has no water', focus: 'po' } },  // adversative (spoken variant of por)
  nuk:       { al: 'nuk',       en: 'not' },
  une:       { al: 'unë',       en: 'I' },
  mua:       { al: 'mua',       en: 'me' },   // object form of unë — used in reported speech
  per:       { al: 'për',       en: 'for', enAll: 'for / about' },
  // --- folklore: the night branches ---
  shtrige:   { al: 'shtrigë',   en: 'witch' },     // the Shtriga, a vampiric night-witch
  ora:       { al: 'Ora',       en: 'spirit' },    // the Ora, a personal fate-spirit
  det:       { al: 'det',       en: 'sea' },
  ftohte:    { al: 'ftohtë',    en: 'cold' },
  ngrohte:   { al: 'ngrohtë',   en: 'warm' },
  // genus / qualifier words used to build dictionary definitions
  njeri:     { al: 'njeri',     en: 'person' },
  kafshe:    { al: 'kafshë',    en: 'animal' },
  vend:      { al: 'vend',      en: 'place' },
  peme:      { al: 'pemë',      en: 'tree', enAll: 'tree / fruit' }, // pemë = both the tree and its fruit
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
  e_art:     { al: 'e',         en: 'the', ctx: { al: 'e bukura', en: '__ beautiful one', focus: 'e' } },   // feminine adjectival article
  e_link:    { al: 'e',         en: 'of',  ctx: { al: 'Bukura e Detit', en: 'the Beauty __ the Sea', focus: 'e' } },   // feminine linking article
  e_obj:     { al: 'e',         en: 'it', enAll: 'it / her / him', ctx: { al: 'kulshedra e ha', en: 'the kulshedra eats __', focus: 'e' } }, // object clitic (all genders): kulshedra e ha (eats IT) · Halili e do (wants HER) · Mujo e vajton (mourns HIM)
  e_conj:    { al: 'e',         en: 'and', ctx: { al: 'Mujo e Halili', en: 'Mujo __ Halili', focus: 'e' } }, // conjunction (folk/epic register, = dhe)
  jo:        { al: 'jo',        en: 'not' },
  pa:        { al: 'pa',        en: 'without' },
  me:        { al: 'me',        en: 'with' },
  shume:     { al: 'shumë',     en: 'many' },
  mire:      { al: 'mirë',      en: 'good' },
  vogel:     { al: 'vogël',     en: 'small' },
  vjeter:    { al: 'vjetër',    en: 'old' },
  ngadale:   { al: 'ngadalë',   en: 'slow' },
  poshte:    { al: 'poshtë',    en: 'below', enAll: 'below / down' },
  larg:      { al: 'larg',      en: 'far' },
  jashte:    { al: 'jashtë',    en: 'outside' },
  ku:        { al: 'ku',        en: 'where' },
  qe:        { al: 'që',        en: 'that' },
  do:        { al: 'do',        en: 'wants', ctx: { al: 'gjarpri do ar', en: 'the serpent __ gold', focus: 'do' } },
  do_fut:    { al: 'do',        en: 'will',  ctx: { al: 'bolla do të bëhet', en: 'the Bolla __ become', focus: 'do' } },  // future auxiliary
  bej:       { al: 'bëj',       en: 'make' },
  luan:      { al: 'luan',      en: 'plays', enAll: 'plays / lion' }, // homonym: luan = plays AND lion
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
  // --- the storm of Baba Tomor (the Drangue's lightning) ---
  rrufe:     { al: 'rrufe',     en: 'thunderbolt' },
  re:        { al: 're',        en: 'cloud' },
  ere:       { al: 'erë',       en: 'wind', enAll: 'wind / smell' }, // erë = wind AND smell
  // --- the underworld: the rams & the Beauty's twist ---
  dash:      { al: 'dash',      en: 'ram' },     // the white & black rams (Scurfhead)
  bardhe:    { al: 'bardhë',    en: 'white' },
  zi:        { al: 'zi',        en: 'black' },
  jam:       { al: 'jam',       en: 'am' },
  // --- Act I: the village & the besa ---
  premto:    { al: 'premto',    en: 'swear' },   // to swear the besa
  // --- the road by night: the Vitore & the Lugat ---
  lugat:     { al: 'lugat',     en: 'revenant' }, // the Lugat, a restless dead thing
  // --- Rozafa (the walled-up wife) ---
  vella:     { al: 'vëlla',     en: 'brother' },
  // --- the climax: the eclipse & the freed spring ---
  diell:     { al: 'diell',     en: 'sun' },     // the Kulshedra swallows it (eclipse)
  // --- the underworld gate ---
  qen:       { al: 'qen',       en: 'dog' },     // the three-headed sleepless hound
  // --- Tomorr & Shpirag; Mujo's golden-horned goats ---
  lot:       { al: 'lot',       en: 'tears' },
  dhi:       { al: 'dhi',       en: 'goat' },
  ar:        { al: 'ar',        en: 'gold' },
  // --- Nastradin Hoxha (the comic interlude) ---
  hoxha:     { al: 'hoxha',     en: 'hodja' },   // Nastradin Hoxha, the trickster-sage
  kazan:     { al: 'kazan',     en: 'cauldron' },
  // --- lore-review fixes: the caul, Rozafa's body, the cradles, the choice ---
  lind:      { al: 'lind',      en: 'born' },    // born with the caul (lindur me këmishë)
  kemishe:   { al: 'këmishë',   en: 'caul', enAll: 'caul / shirt' }, // dragua's caul; lit. shirt (karkanxholl's mail)
  gji:       { al: 'gji',       en: 'breast' },  // Rozafa nurses through the wall
  dore:      { al: 'dorë',      en: 'hand' },
  djep:      { al: 'djep',      en: 'cradle' },  // Mujo's cradles by the boulder
  dije:      { al: 'dije',      en: 'knowledge' }, // the Zanas' three gifts
  ose:       { al: 'ose',       en: 'or' },
  // --- Sari Salltëk, the dragon-slaying dervish ---
  dervish:   { al: 'dervish',   en: 'dervish' },
  gjuhe:     { al: 'gjuhë',     en: 'tongue' },  // the seven tongues as proof
  shtate:    { al: 'shtatë',    en: 'seven' },
  tund:      { al: 'tund',      en: 'rock', enAll: 'rock / shake' }, // rock the cradle; shake the coins
  dordolec:  { al: 'dordolec',  en: 'rain-child' }, // the green-clad child of the rain-call
  shi:       { al: 'shi',       en: 'rain' },
  vesh:      { al: 'vesh',      en: 'wears' },
  gjelber:   { al: 'gjelbër',   en: 'green' },
  verdhe:    { al: 'verdhë',    en: 'yellow' }, // the Yellow Fate, e Verdha (ill-luck)
  kendo:     { al: 'këndo',     en: 'sing' },
  bolla:     { al: 'bolla',     en: 'bolla-serpent' }, // the serpent that becomes a Kulshedra
  shengjergj:{ al: 'Shëngjergj',en: 'St George' },// Shëngjergji, when the Bolla opens its eyes
  kurre:     { al: 'kurrë',     en: 'never' },
  katallan:  { al: 'katallan',  en: 'one-eyed giant' }, // the Albanian Polyphemus
  godit:     { al: 'godit',     en: 'strike' },
  verbo:     { al: 'verbo',     en: 'blind' },   // verbo syrin — put out the eye
  gjak:      { al: 'gjak',      en: 'blood' },   // gjakmarrja / falja e gjakut
  dy:        { al: 'dy',        en: 'two' },
  bar:       { al: 'bar',       en: 'herb' },    // the Ora's healing mountain herb
  tre:       { al: 'tre',       en: 'three' },
  shurdhi:   { al: 'Shurdhi',   en: 'Shurdhi' }, // the northern storm-god of hail and thunder
  hekur:     { al: 'hekur',     en: 'iron' },   // bang iron to rouse/ward the storm-god
  kale:      { al: 'kalë',      en: 'horse' },  // Mujo's oracular courser
  ruan:      { al: 'ruan',      en: 'guards' }, // the Ora-serpent guards the hoard
  roje:      { al: 'roje',      en: 'guard' },  // the guard at the queen's black palace
  bekim:     { al: 'bekim',     en: 'blessing' }, // the Ora's blessing for the hospitable
  mujo:      { al: 'Mujo',      en: 'Mujo' },    // Gjeto Basho Muji, elder kreshnik of Jutbina
  halil:     { al: 'Halili',    en: 'Halili' },  // Sokol Halili, his young brother
  tanusha:   { al: 'Tanusha',   en: 'Tanusha' },// daughter of the Krajl, Halili's bride
  nuse:      { al: 'nuse',      en: 'bride' },
  fsheh:     { al: 'fsheh',     en: 'hide' },
  djall:     { al: 'djall',     en: 'devil' },
  perendi:   { al: 'Perëndi',   en: 'God' },     // the supreme power
  verbti:    { al: 'i Verbti',  en: 'the Blind One' }, // the blind fire-and-wind god
  omer:      { al: 'Omer',      en: 'Omer' },    // Mujo's son, killed young
  vajto:     { al: 'vajto',     en: 'mourn' },   // vajtim — the sung lament
  lubia:     { al: 'Lubia',     en: 'she-hydra' }, // the Lubia: the southern many-headed she-demon
  prende:    { al: 'Prende',    en: 'Prende' },  // Zoja e Bukurisë, Lady of Beauty (Friday)
  ylber:     { al: 'ylber',     en: 'rainbow' },// Prende's belt
  gjegjeza:  { al: 'gjëegjëzë', en: 'riddle' },
  samar:     { al: 'samar',     en: 'packsaddle' },
  breshka:   { al: 'breshka',   en: 'tortoise' },
  gjon:      { al: 'Gjon',      en: 'Gjon' },    // the boy who became the Gjon-bird
  arushe:    { al: 'arushë',    en: 'bear' },
  mashtro:   { al: 'mashtro',   en: 'trick' },
  dhampir:   { al: 'dhampir',   en: 'half-vampire' }, // the dhampir: half-living son of a lugat
  bleta:     { al: 'bleta',     en: 'bee' },
  merimanga: { al: 'merimangë', en: 'spider' },
  dallendyshe:{ al: 'dallëndyshe', en: 'swallow' },
  kukudh:    { al: 'kukudh',    en: 'miser-ghost' }, // the kukudh: a lugat hardened, a miser's revenant
  hardhi:    { al: 'hardhi',    en: 'vine' },
  bresher:   { al: 'breshër',   en: 'hail' },
  // --- review pass 2: Blue Eye donkey, Daughter of Moon & Sun, Aga Ymer ---
  gomar:     { al: 'gomar',     en: 'donkey' },  // the burning donkey (Syri i Kaltër)
  hene:      { al: 'hënë',      en: 'moon' },    // Hëna, mother of the lightning-maiden
  bije:      { al: 'bijë',      en: 'daughter', forms: [
    { al: 'bijë',  tag: 'indefNom', gloss: 'a daughter' },
    { al: 'bija',  tag: 'defNom',   gloss: 'the daughter' },
    { al: 'bijën', tag: 'defAcc',   gloss: 'the daughter (object)' },
  ] },// E Bija e Hënës dhe e Diellit
  vit:       { al: 'vit',       en: 'year' },    // Aga Ymer's nine years
  fol:       { al: 'fol',       en: 'speak' },   // the broken-silence taboo
  shpirag:   { al: 'Shpirag',   en: 'Shpirag' }, // the rival mountain of Tomorr
  bir:       { al: 'bir',       en: 'son' },     // Son of the Eagle (Shqiptar)
  mban:      { al: 'mban',      en: 'keeps' },   // mban besën — keeps the oath
  vitore:    { al: 'vitore',    en: 'house-serpent' }, // the Vitore, luck-serpent of the home
  sulmo:     { al: 'sulmo',     en: 'attack' },   // the wolf attacks a threat
  // --- the Sky realm: Zojz the sky-father & i Bukuri i Qiellit (the Sun) ---
  qiell:     { al: 'qiell',     en: 'sky' },      // i Bukuri i Qiellit, the Beauty of the Sky
  zojz:      { al: 'Zojz',      en: 'Zojz' },     // the sky-father & thunder-god (PIE *Dyeus)
  dem:       { al: 'dem',       en: 'bull' },     // the white bull offered on Tomorr's summit
  mekat:     { al: 'mëkat',     en: 'sin' },      // Zojz hurls the bolt at the proud and sinful
  shenjte:   { al: 'shenjtë',   en: 'holy' },     // the holy mountain of the pilgrimage
  mjeker:    { al: 'mjekër',    en: 'beard' },    // Zojz, an old man white-bearded to his belt
  fal:       { al: 'fal',       en: 'forgive' },  // falja e gjakut — forgiving the blood-feud
  krenar:    { al: 'krenar',    en: 'proud' },    // the tall tree the thunderbolt finds
  udhekryq:  { al: 'udhëkryq',  en: 'crossroads' }, // the hub where the roads of the world fork
  bari:      { al: 'bari',      en: 'shepherd' }, // the herder whose white bull is Zojz's offering
  maja:      { al: 'majë',      en: 'summit' },   // the peak of Tomorr, where Zojz sits
  // --- the explorable village: buildings ---
  oda:       { al: 'odë',       en: 'guest-room' }, // the men's oda where a guest (mik) is received
  kulle:     { al: 'kullë',     en: 'tower' },    // the stone tower-house; a man "in blood" shut inside
  // --- the Sea realm: e Bukura e Detit & the deep ---
  thelle:    { al: 'thellë',    en: 'deep' },     // the deep sea, the Beauty's realm
  flok:      { al: 'flokë',     en: 'hair' },     // a strand of her golden hair binds her as wife
  // --- the kreshnik highland epic ---
  jutbina:   { al: 'Jutbina',   en: 'Jutbina' },  // the plain & towers of the frontier-warriors
  lahute:    { al: 'lahutë',    en: 'lute' },     // the one-string fiddle of the lahutarë
  // --- the Shtojzovalle: the moon-dancing fate-fairies ---
  shtojzovalle:{ al: 'shtojzovalle', en: 'moon-dancer' }, // airy night-fairies who spin human fate
  valle:     { al: 'valle',     en: 'round-dance' }, // the moonlit fairy-ring; join it and you dance on
  // --- village rural life & folk tales ---
  vatra:     { al: 'vatra',     en: 'hearth' },   // the sacred hearth; its fire never let to die
  qilim:     { al: 'qilim',     en: 'rug' },      // the woven kilim with its protective motifs
  udhetar:   { al: 'udhëtar',   en: 'traveller' }, // travellers in the oda whose tales point to other realms
  gjysmegjel:{ al: 'gjysmëgjel',en: 'half-rooster' }, // Gjysmëkokoshi, hero of the children's tale
  // --- high-frequency spoken-Albanian words (top-100 frequency coverage) ---
  // Woven into the oda conversation + narration so the learner meets the words
  // that carry everyday Albanian speech, not only the folklore content-words.
  di:        { al: 'di',        en: 'know' },
  duhet:     { al: 'duhet',     en: 'must' },
  mendoj:    { al: 'mendoj',    en: 'think' },
  duket:     { al: 'duket',     en: 'seems' },
  ai:        { al: 'ai',        en: 'he' },
  ajo:       { al: 'ajo',       en: 'she' },
  ata:       { al: 'ata',       en: 'they' },
  tij:       { al: 'tij',       en: 'his' },
  ky:        { al: 'ky',        en: 'this' },
  ju:        { al: 'ju',        en: 'you' },   // you (plural / formal)
  na:        { al: 'na',        en: 'us' },
  kush:      { al: 'kush',      en: 'who' },
  cfare:     { al: 'çfarë',     en: 'what' },
  pse:       { al: 'pse',       en: 'why' },
  sa:        { al: 'sa',        en: 'how much' },
  kur:       { al: 'kur',       en: 'when' },
  nese:      { al: 'nëse',      en: 'if' },
  sepse:     { al: 'sepse',     en: 'because' },
  edhe:      { al: 'edhe',      en: 'also' },
  apo:       { al: 'apo',       en: 'or' },
  si:        { al: 'si',        en: 'how', enAll: 'how / as / like' },
  pra:       { al: 'pra',       en: 'so' },
  keshtu:    { al: 'kështu',    en: 'thus' },
  gjithe:    { al: 'gjithë',    en: 'all' },
  pak:       { al: 'pak',       en: 'a little' },
  para:      { al: 'para',      en: 'before', enAll: 'before / money' }, // para natës = before night; paratë = the money
  tek:       { al: 'tek',       en: 'at' },
  vertete:   { al: 'vërtetë',   en: 'truly' },
  dicka:     { al: 'diçka',     en: 'something' },
  asgje:     { al: 'asgjë',     en: 'nothing' },
  ja:        { al: 'ja',        en: 'behold' },
  oh:        { al: 'oh',        en: 'oh' },
  hej:       { al: 'hej',       en: 'hey' },
  duke:      { al: 'duke',      en: 'while' },   // gerund particle: duke + participle
  jete:      { al: 'jetë',      en: 'life' },
  rregull:   { al: 'rregull',   en: 'order' },   // në rregull = in order (alright)
  faleminderit: { al: 'faleminderit', en: 'thank you' },
  se:        { al: 'se',        en: 'that' },
  ta:        { al: 'ta',        en: 'it' },       // të + e clitic cluster
  im:        { al: 'im',        en: 'my' },
  // --- the village quarters (river & church) — frequency-guided everyday words ---
  punon:     { al: 'punon',     en: 'works' },    // #494 spoken freq
  mjeshter:  { al: 'mjeshtër',  en: 'master' },   // #1277 — the master-builder of the bridge
  fushe:     { al: 'fushë',     en: 'field' },     // #2362
  kishe:     { al: 'kishë',     en: 'church' },    // #2510
  prift:     { al: 'prift',     en: 'priest' },    // #3152
  mulli:     { al: 'mulli',     en: 'mill' },      // the water-mill (concrete village institution)
  miell:     { al: 'miell',     en: 'flour' },     // what the mill makes
  // --- top-150 spoken-frequency fill: the commonest everyday words a learner
  //     meets constantly (pronouns, quantifiers, deixis). Ranks from the
  //     OpenSubtitles sq_50k list; see scripts/freqrank.mjs.
  ne_we:     { al: 'ne',        en: 'we' },        // #29  (distinct from ne='në'=in)
  me_more:   { al: 'më',        en: 'more', ctx: { al: 'më i madh', en: '__ big (bigger)', focus: 'më' } }, // #8 (comparative; shares 'më' with me_obj)
  disa:      { al: 'disa',      en: 'some' },       // #116
  ndonje:    { al: 'ndonjë',    en: 'any' },        // #114
  gjitha:    { al: 'gjitha',    en: 'all' },        // #115 (të gjitha)
  pas:       { al: 'pas',       en: 'after' },      // #118
  ndoshta:   { al: 'ndoshta',   en: 'maybe' },      // #119
  shiko:     { al: 'shiko',     en: 'look' },       // #120 (distinct from shko='go')
  cdo:       { al: 'çdo',       en: 'every' },      // #123
  zoteri:    { al: 'zotëri',    en: 'sir' },        // #124
  keto:      { al: 'këto',      en: 'these' },      // #125
  ashtu:     { al: 'ashtu',     en: 'so' },         // #127 (ashtu është = so it is)
  qene:      { al: 'qenë',      en: 'been' },       // #128 (participle of jam)
  tuaj:      { al: 'tuaj',      en: 'your' },       // #142 (plural/formal possessive)
  tyre:      { al: 'tyre',      en: 'their' },      // #144
  saj:       { al: 'saj',       en: 'her' },        // #146
  kaq:       { al: 'kaq',       en: 'so much' },    // #148
  atehere:   { al: 'atëherë',   en: 'then' },       // #137
  aty:       { al: 'aty',       en: 'there' },      // #143
  zot:       { al: 'zot',       en: 'lord' },       // #139 (Zoti = the Lord)
  dreq:      { al: 'dreq',      en: 'devil' },      // #130 (dreqin)
  yt:        { al: 'yt',        en: 'your' },       // #131 (tënde = your, fem.)
  ma:        { al: 'ma',        en: 'to me' },      // #133 (ma jep = give it to me)
  // --- top 151-200 spoken-frequency fill ---
  deri:      { al: 'deri',      en: 'until' },      // #152
  hajde:     { al: 'hajde',     en: 'come on' },    // #153 (interjection)
  prej:      { al: 'prej',      en: 'from' },       // #155
  ia:        { al: 'ia',        en: 'it to him' },  // #156 (clitic cluster i+a)
  aq:        { al: 'aq',        en: 'so much' },    // #157 (aq … sa = as … as)
  sikur:     { al: 'sikur',     en: 'as if' },      // #158
  gati:      { al: 'gati',      en: 'ready' },      // #161
  gjithcka:  { al: 'gjithçka',  en: 'everything' }, // #162
  pune:      { al: 'punë',      en: 'work' },       // #163
  as:        { al: 'as',        en: 'nor' },        // #164
  cka:       { al: 'çka',       en: 'what' },       // #167 (colloquial 'what')
  pastaj:    { al: 'pastaj',    en: 'then' },       // #174
  fund:      { al: 'fund',      en: 'end' },        // #175 (fundit)
  thjesht:   { al: 'thjesht',   en: 'simply' },     // #176
  akoma:     { al: 'akoma',     en: 'still' },      // #178
  here:      { al: 'herë',      en: 'time' },       // #179 (një herë = once)
  vertet:    { al: 'vërtet',    en: 'really' },     // #181
  dikush:    { al: 'dikush',    en: 'someone' },    // #186
  sigurisht: { al: 'sigurisht', en: 'surely' },     // #187
  epo:       { al: 'epo',       en: 'well' },       // #188 (interjection)
  drejte:    { al: 'drejtë',    en: 'right' },      // #190 (drejt = straight)
  asnje:     { al: 'asnjë',     en: 'none' },       // #192
  dashur:    { al: 'dashur',    en: 'dear' },       // #194 (i dashur = beloved)
  ndodh:     { al: 'ndodh',     en: 'happens' },    // #196
  nevoje:    { al: 'nevojë',    en: 'need' },       // #197 (kam nevojë = I need)
  // --- top 201-250 spoken-frequency fill ---
  juaj:      { al: 'juaj',      en: 'your' },       // #201 (plural/formal possessive)
  pelqen:    { al: 'pëlqen',    en: 'likes' },      // #202 (më pëlqen = I like it)
  gjithmone: { al: 'gjithmonë', en: 'always' },     // #206
  mjaft:     { al: 'mjaft',     en: 'enough' },     // #211
  o:         { al: 'o',         en: 'oh' },         // #212 (vocative: o zot!)
  tone:      { al: 'tonë',      en: 'our' },        // #213
  perse:     { al: 'përse',     en: 'why' },        // #216
  gjate:     { al: 'gjatë',     en: 'long' },       // #217 (gjatë natës = during the night)
  vete:      { al: 'vetë',      en: 'self' },       // #223 (veten = oneself)
  baba:      { al: 'baba',      en: 'father' },     // #225/#243 (babi, babai)
  shok:      { al: 'shok',      en: 'comrade' },    // #235 (shoku)
  ende:      { al: 'ende',      en: 'yet' },        // #236
  djale:     { al: 'djalë',     en: 'boy' },        // #239 (djema = boys)
  vone:      { al: 'vonë',      en: 'late' },       // #240
  sapo:      { al: 'sapo',      en: 'just' },       // #249 (just now / as soon as)
  askush:    { al: 'askush',    en: 'nobody' },     // #250
  // --- top 251-300 spoken-frequency fill ---
  deshiron:  { al: 'dëshiron',  en: 'wishes' },     // #254
  kujdes:    { al: 'kujdes',    en: 'care' },       // #261 (ki kujdes = be careful)
  kuptoj:    { al: 'kuptoj',    en: 'understand' }, // #262
  problem:   { al: 'problem',   en: 'problem' },    // #263
  ok:        { al: 'ok',        en: 'okay' },       // #266
  fare:      { al: 'fare',      en: 'at all' },     // #267
  menyre:    { al: 'mënyrë',    en: 'way' },        // #272
  ndonjehere:{ al: 'ndonjëherë',en: 'sometimes' },  // #274
  cili:      { al: 'cili',      en: 'which' },      // #275
  pershendetje:{al:'përshëndetje',en:'hello' },     // #277
  mama:      { al: 'mama',      en: 'mom' },        // #279 (mami = mommy)
  kesaj:     { al: 'kësaj',     en: 'this' },       // #281 (oblique fem.)
  rreth:     { al: 'rreth',     en: 'around' },     // #283
  sonte:     { al: 'sonte',     en: 'tonight' },    // #284
  minuta:    { al: 'minuta',    en: 'minutes' },    // #295
  neser:     { al: 'nesër',     en: 'tomorrow' },   // #297
  fat:       { al: 'fat',       en: 'luck' },       // #299
  keta:      { al: 'këta',      en: 'these' },      // #300 (masc.)
  // --- top 301-350 spoken-frequency fill ---
  ca:        { al: 'ca',        en: 'some' },       // #304
  mend:      { al: 'mend',      en: 'mind' },       // #309
  dot:       { al: 'dot',       en: 'at all' },     // #310 (negation intensifier)
  sic:       { al: 'siç',       en: 'as' },         // #311
  dakord:    { al: 'dakord',    en: 'agreed' },     // #319
  lidhje:    { al: 'lidhje',    en: 'a bond' },     // #324
  veshtire:  { al: 'vështirë',  en: 'difficult' },  // #325
  gjithashtu:{ al: 'gjithashtu',en: 'also' },       // #328
  tille:     { al: 'tillë',     en: 'such' },       // #339
  frike:     { al: 'frikë',     en: 'fear' },       // #342
  pjese:     { al: 'pjesë',     en: 'part' },       // #347
  perpara:   { al: 'përpara',   en: 'forward' },    // #350
  ore:       { al: 'orë',       en: 'hour' },       // #317 (distinct from Ora, the spirit)
  // --- top 351-400 spoken-frequency fill ---
  tregoj:    { al: 'tregoj',    en: 'tell' },       // #352
  mes:       { al: 'mes',       en: 'among' },      // #353 (në mes = in the middle)
  lumtur:    { al: 'lumtur',    en: 'happy' },      // #354 (i lumtur)
  tere:      { al: 'tërë',      en: 'whole' },      // #358 (i tërë)
  menjehere: { al: 'menjëherë', en: 'at once' },    // #359
  fakt:      { al: 'fakt',      en: 'fact' },       // #360
  cmendur:   { al: 'çmendur',   en: 'crazy' },      // #370 (i çmendur)
  leviz:     { al: 'lëviz',     en: 'move' },       // #372
  pyetje:    { al: 'pyetje',    en: 'question' },   // #374
  ide:       { al: 'ide',       en: 'idea' },       // #379
  mundesi:   { al: 'mundësi',   en: 'chance' },     // #380
  afer:      { al: 'afër',      en: 'near' },       // #382
  derisa:    { al: 'derisa',    en: 'until' },      // #390
  mbrapa:    { al: 'mbrapa',    en: 'behind' },     // #395
  // --- top 401-450 spoken-frequency fill ---
  prandaj:   { al: 'prandaj',   en: 'therefore' },  // #401
  kujtoj:    { al: 'kujtoj',    en: 'remember' },   // #402 (kujtohet)
  shpresoj:  { al: 'shpresoj',  en: 'hope' },       // #406
  mbase:     { al: 'mbase',     en: 'maybe' },      // #407
  nen:       { al: 'nën',       en: 'under' },      // #409 (distinct from nënë=mother)
  zonje:     { al: 'zonjë',     en: 'lady' },       // #412 (zonja)
  ndalo:     { al: 'ndalo',     en: 'stop' },       // #413
  lehte:     { al: 'lehtë',     en: 'easy' },       // #414
  njoh:      { al: 'njoh',      en: 'know' },       // #416 (know a person)
  duket:     { al: 'duket',     en: 'seems' },      // #422 (dukesh)
  pasi:      { al: 'pasi',      en: 'after' },      // #429
  mengjes:   { al: 'mëngjes',   en: 'morning' },    // #430
  pese:      { al: 'pesë',      en: 'five' },       // #431
  qetesohu:  { al: 'qetësohu',  en: 'calm down' },  // #432
  drejt:     { al: 'drejt',     en: 'straight' },   // #434
  gabim:     { al: 'gabim',     en: 'mistake' },    // #436
  teper:     { al: 'tepër',     en: 'too much' },   // #438
  he:        { al: 'hë',        en: 'well' },       // #446 (interjection)
  prapa:     { al: 'prapa',     en: 'behind' },     // #449
  // --- top 451-500 spoken-frequency fill ---
  arme:      { al: 'armë',      en: 'weapon' },     // #451
  muaj:      { al: 'muaj',      en: 'month' },      // #464
  tung:      { al: 'tung',      en: 'hi' },         // #465 (greeting)
  lloj:      { al: 'lloj',      en: 'kind' },       // #466
  ketej:     { al: 'këtej',     en: 'this way' },   // #473
  dashuri:   { al: 'dashuri',   en: 'love' },       // #475
  rendesi:   { al: 'rëndësi',   en: 'importance' }, // #483
  kunder:    { al: 'kundër',    en: 'against' },    // #484
  kater:     { al: 'katër',     en: 'four' },       // #486
  pari:      { al: 'pari',      en: 'first' },      // #487 (i pari)
  jave:      { al: 'javë',      en: 'week' },       // #488
  vazhdo:    { al: 'vazhdo',    en: 'continue' },   // #491
  shpirt:    { al: 'shpirt',    en: 'soul' },       // #497
  ulu:       { al: 'ulu',       en: 'sit down' },   // #498
  arsye:     { al: 'arsye',     en: 'reason' },     // #499
  // ===== SURVIVAL CORE — functional/notional vocabulary (Nation & Crabbe 1991) =====
  // The words a traveller needs to SURVIVE (buy, lodge, ask directions, get help),
  // selected by NEED rather than frequency rank. Taught via talk-and-return
  // market / inn / healer / traveller vignettes. Audited by scripts/survivalcore.mjs.
  // --- greetings & politeness ---
  lutem:      { al: 'të lutem',    en: 'please' },
  mirmengjes: { al: 'mirëmëngjes', en: 'good morning' },
  mirdita:    { al: 'mirëdita',    en: 'good day' },
  mirembrema: { al: 'mirëmbrëma',  en: 'good evening' },
  natenmire:  { al: 'natën e mirë',en: 'good night' },
  mirupafshim:{ al: 'mirupafshim', en: 'goodbye' },
  // --- numbers ---
  gjashte:    { al: 'gjashtë',     en: 'six' },
  tete:       { al: 'tetë',        en: 'eight' },
  dhjete:     { al: 'dhjetë',      en: 'ten' },
  njezet:     { al: 'njëzet',      en: 'twenty' },
  njeqind:    { al: 'njëqind',     en: 'hundred' },
  mije:       { al: 'mijë',        en: 'thousand' },
  zero:       { al: 'zero',        en: 'zero' },
  // --- buying & bargaining ---
  tregtar:    { al: 'tregtar',     en: 'trader' },
  dua:        { al: 'dua',         en: 'want' },
  blej:       { al: 'blej',        en: 'buy' },
  shes:       { al: 'shes',        en: 'sell' },
  kushton:    { al: 'kushton',     en: 'costs' },
  lek:        { al: 'lek',         en: 'lek' },
  shtrenjte:  { al: 'shtrenjtë',   en: 'expensive' },
  lire:       { al: 'lirë',        en: 'cheap' },
  dyqan:      { al: 'dyqan',       en: 'shop' },
  kusur:      { al: 'kusur',       en: 'change' },
  fatura:     { al: 'faturë',      en: 'bill' },
  // --- food & drink ---
  caj:        { al: 'çaj',         en: 'tea' },
  birre:      { al: 'birrë',       en: 'beer' },
  perime:     { al: 'perime',      en: 'vegetables' },
  // --- lodging ---
  bujtine:    { al: 'bujtinë',     en: 'inn' },
  dhome:      { al: 'dhomë',       en: 'room' },
  shtrat:     { al: 'shtrat',      en: 'bed' },
  celes:      { al: 'çelës',       en: 'key' },
  // --- health ---
  sherues:    { al: 'shërues',     en: 'healer' },
  mjek:       { al: 'mjek',        en: 'doctor' },
  semur:      { al: 'sëmurë',      en: 'sick' },
  dhimbje:    { al: 'dhimbje',     en: 'pain' },
  // --- about yourself & controlling language ---
  quhem:      { al: 'quhem',       en: 'am called' },
  familje:    { al: 'familje',     en: 'family' },
  vjec:       { al: 'vjeç',        en: 'years old' },
  perserit:   { al: 'përsërit',    en: 'repeat' },
  // --- directions & signs ---
  majtas:     { al: 'majtas',      en: 'left' },
  djathtas:   { al: 'djathtas',    en: 'right' },
  harte:      { al: 'hartë',       en: 'map' },
  hyrje:      { al: 'hyrje',       en: 'entrance' },
  dalje:      { al: 'dalje',       en: 'exit' },
  shtyj:      { al: 'shtyj',       en: 'push' },
  terheq:     { al: 'tërheq',      en: 'pull' },
  // --- time & quality ---
  mbremje:    { al: 'mbrëmje',     en: 'evening' },
  dje:        { al: 'dje',         en: 'yesterday' },
  nxehte:     { al: 'nxehtë',      en: 'hot' },
  // --- survival core, round 2: signs + folk-framed "modern" words ---
  mbyllur:    { al: 'mbyllur',     en: 'closed' },
  ndalohet:   { al: 'ndalohet',    en: 'forbidden' },
  burra:      { al: 'burra',       en: 'men' },
  gra:        { al: 'gra',         en: 'women' },
  bilete:     { al: 'biletë',      en: 'fare' },     // folk-frame: a gate/passage fare (not a bus ticket)
  polici:     { al: 'polici',      en: 'guard' },    // folk-frame: a city guard (roje)
  hotel:      { al: 'hotel',       en: 'hotel' },    // folk-frame: a big inn
  restorant:  { al: 'restorant',   en: 'eating-house' }, // folk-frame: a house where you eat
  // --- legends & living-custom vignettes (Skanderbeg / burrnesha / lahuta) ---
  skender:    { al: 'Skënderbeu',  en: 'Skanderbeg' },   // Gjergj Kastrioti, the national hero
  armik:      { al: 'armik',       en: 'enemy' },
  kenge:      { al: 'këngë',       en: 'song' },
  jeto:       { al: 'jeto',        en: 'live' },
  burrneshe:  { al: 'burrneshë',   en: 'sworn virgin' }, // the Kanun's vajza e betuar
  // --- living customs (city-quarter + wedding vignettes) ---
  raki:       { al: 'raki',        en: 'raki' },         // the fruit brandy of welcome
  gezuar:     { al: 'gëzuar',      en: 'cheers' },
  dasme:      { al: 'dasmë',       en: 'wedding' },
  shenje:     { al: 'shenjë',      en: 'sign' },
  thike:      { al: 'thikë',       en: 'knife' },
  luge:       { al: 'lugë',        en: 'spoon' },
  plis:       { al: 'plis',        en: 'felt cap' },     // the white qeleshe
  xhublete:   { al: 'xhubletë',    en: 'bell-dress' },   // the highland felt dress
  kurbet:     { al: 'kurbet',      en: 'exile-work' },   // labour migration, the kurbet
  // --- proper names woven into scenes so blurbs never introduce them first ---
  rozafa:     { al: 'Rozafa',      en: 'Rozafa' },       // the immured mother of the castle
  gjergj:     { al: 'Gjergj Elez Alia', en: 'Gjergj Elez Alia' }, // the nine-wound hero
  kumaLisa:   { al: 'Kuma Lisa',   en: 'Kuma Lisa' },    // the godmother she-fox
  sariSalltek:{ al: 'Sari Salltëk', en: 'Sari Salltëk' }, // the dragon-slaying dervish
  gjizar:     { al: 'Gjizar',      en: 'Gjizar' },       // the nightingale
  kostandin:  { al: 'Kostandin',   en: 'Kostandin' },    // the besa-keeping dead brother
  doruntine:  { al: 'Doruntina',   en: 'Doruntine' },    // the far-married sister
  kruje:      { al: 'Krujë',       en: 'Krujë' },        // Skanderbeg's castle-town
  lezhe:      { al: 'Lezhë',       en: 'Lezhë' },        // where Skanderbeg died
  osum:       { al: 'Osum',        en: 'Osum' },         // the river of the giantess's tears
  zuku:       { al: 'Zuku',        en: 'Zuku' },         // Zuku Bajraktar
  mashallah:  { al: 'mashallah',   en: 'mashallah' },    // the praise-safely word
  teqe:       { al: 'teqe',        en: 'teqe' },         // the Bektashi lodge
  kurban:     { al: 'kurban',      en: 'sacrifice' },    // the shared votive lamb
  ymer:       { al: 'Ymer',        en: 'Ymer' },         // Aga Ymer of Ulcinj
  premte:     { al: 'e premte',    en: 'Friday' },       // Prende's day
  kalter:     { al: 'kaltër',      en: 'blue' },
  dyzet:      { al: 'dyzet',       en: 'forty' },
  edyta:      { al: 'e dyta',      en: 'the second' },  // ordinal — comprehension-riddle key
  // --- words of the verbatim folk-quotes (Q() lines) — each exists so a classic
  // line from the sources can be slotted word-for-word into the story ---
  shqiptar:   { al: 'shqiptar',    en: 'Albanian' },     // Kanun §602: shtëpia e shqiptarit…
  shkimet:    { al: 'shkimet',     en: 'goes out' },     // Gheg (= shuhet) — Ajkuna's curse to the moon
  mplaket:    { al: 'mplaket',     en: 'grows old' },    // tale-closing formula: u mplakën…
  trashegohet: { al: 'trashëgohet', en: 'has heirs' },   // …e u trashëguan (Dozon's closing)
  lan:        { al: 'lan',         en: 'washes' },       // Kanun §631: buka e lan dëmin
  dem_harm:   { al: 'dëm',         en: 'harm' },         // dëm ≠ dem (the bull) — diacritic distinguishes
  eshtra:     { al: 'eshtra',      en: 'bones' },        // gjuha eshtra s'ka, eshtra thyen
  thyen:      { al: 'thyen',       en: 'breaks' },
  leh:        { al: 'leh',         en: 'barks' },        // qeni që leh nuk kafshon
  kafshon:    { al: 'kafshon',     en: 'bites' },
  durim:      { al: 'durim',       en: 'patience' },     // me durim bëhen të gjitha
  vonon:      { al: 'vonon',       en: 'delays' },       // Zoti vonon, por nuk harron
  harron:     { al: 'harron',      en: 'forgets' },
  udhe:       { al: 'udhë',        en: 'road' },         // the farewell's word (cf. udhëkryq); = rrugë
  mbare:      { al: 'mbarë',       en: 'fortunate' },    // udha e mbarë — the traveller's blessing
  me_obj:     { al: 'më',          en: 'me', ctx: { al: 'më jep bukë', en: 'give __ bread', focus: 'më' } }, // object clitic
  plumb:      { al: 'plumb',       en: 'bullet' },       // fjala dhe plumbi kur dalin s'kthehen më
  piqet:      { al: 'piqet',       en: 'meets' },        // mali me mal nuk piqet, njeriu me njeriun piqet
  dylle:      { al: 'dyllë',       en: 'wax' },          // the bee-riddle: na jep dyllë…
  mjalte:     { al: 'mjaltë',      en: 'honey' },        // …e na jep mjaltë
  rron:       { al: 'rron',        en: 'lives' },        // sa rron, aq mëson (= jeton)
  pluhur:     { al: 'pluhur',      en: 'dust' },         // Kostandin's answer: pluhuri i udhës
  are:        { al: 'arë',         en: 'field' },        // the rain-chant: …në arat tona
  tona:       { al: 'tona',        en: 'our' },
  perralle:   { al: 'përrallë',    en: 'tale' },         // the teller's sign-off: përralla atje…
  shendet:    { al: 'shëndet',     en: 'health' },       // …shëndeti këtej!
  djathte:    { al: 'djathtë',     en: 'right (side)' }, // Rozafa: gjirin e djathtë ma lini jashtë
  lumte:      { al: 'lumtë',       en: 'blessed be' },   // të lumtë krahu / të lumtë goja
}

// Declension tables for every noun the story inflects (see the wf() forms guard
// and frequentForms). Attached onto DICT below; the 9 flagship nouns keep their
// inline forms. Generated by scripts/gen_forms.mjs, hand-reviewed.
const NOUN_FORMS = {
  ar: [ /* gold */
    { al: 'ar', tag: 'indefNom', gloss: "a gold" },
    { al: 'ari', tag: 'defNom', gloss: "the gold" },
    { al: 'arin', tag: 'defAcc', gloss: "the gold (object)" },
  ],
  arushe: [ /* bear */
    { al: 'arushë', tag: 'indefNom', gloss: "a bear" },
    { al: 'arushën', tag: 'defAcc', gloss: "the bear (object)" },
    { al: 'arushës', tag: 'defDat', gloss: "to/of the bear" },
  ],
  baba: [ /* father — hand */
    { al: 'baba', tag: 'indefNom', gloss: "a father" },
    { al: 'babai', tag: 'defNom', gloss: "the father" },
    { al: 'babi', tag: 'defNom', gloss: "dad" },
    { al: 'baban', tag: 'defAcc', gloss: "the father (object)" },
  ],
  baloz: [ /* sea-monster */
    { al: 'baloz', tag: 'indefNom', gloss: "a sea-monster" },
    { al: 'balozi', tag: 'defNom', gloss: "the sea-monster" },
    { al: 'balozin', tag: 'defAcc', gloss: "the sea-monster (object)" },
    { al: 'balozit', tag: 'defDat', gloss: "to/of the sea-monster" },
  ],
  bir: [ /* son */
    { al: 'bir', tag: 'indefNom', gloss: "a son" },
    { al: 'biri', tag: 'defNom', gloss: "the son" },
    { al: 'birin', tag: 'defAcc', gloss: "the son (object)" },
    { al: 'bijtë', tag: 'plDef', gloss: "the sons" },
  ],
  bote: [ /* world */
    { al: 'botë', tag: 'indefNom', gloss: "a world" },
    { al: 'bota', tag: 'defNom', gloss: "the world" },
    { al: 'botën', tag: 'defAcc', gloss: "the world (object)" },
    { al: 'botës', tag: 'defDat', gloss: "to/of the world" },
  ],
  burre: [ /* man */
    { al: 'burrë', tag: 'indefNom', gloss: "a man" },
    { al: 'burri', tag: 'defNom', gloss: "the man" },
    { al: 'burrin', tag: 'defAcc', gloss: "the man (object)" },
    { al: 'burrat', tag: 'plDef', gloss: "the men" },
  ],
  dallendyshe: [ /* swallow — hand */
    { al: 'dallëndyshe', tag: 'indefNom', gloss: "a swallow" },
    { al: 'dallëndyshen', tag: 'defAcc', gloss: "the swallow (object)" },
    { al: 'dallëndyshes', tag: 'defDat', gloss: "to/of the swallow" },
  ],
  dash: [ /* ram */
    { al: 'dash', tag: 'indefNom', gloss: "a ram" },
    { al: 'dashi', tag: 'defNom', gloss: "the ram" },
    { al: 'dashin', tag: 'defAcc', gloss: "the ram (object)" },
    { al: 'dashit', tag: 'defDat', gloss: "to/of the ram" },
  ],
  dem: [ /* bull */
    { al: 'dem', tag: 'indefNom', gloss: "a bull" },
    { al: 'demi', tag: 'defNom', gloss: "the bull" },
    { al: 'demin', tag: 'defAcc', gloss: "the bull (object)" },
  ],
  dervish: [ /* dervish */
    { al: 'dervish', tag: 'indefNom', gloss: "a dervish" },
    { al: 'dervishi', tag: 'defNom', gloss: "the dervish" },
    { al: 'dervishin', tag: 'defAcc', gloss: "the dervish (object)" },
  ],
  det: [ /* sea */
    { al: 'det', tag: 'indefNom', gloss: "a sea" },
    { al: 'deti', tag: 'defNom', gloss: "the sea" },
    { al: 'detin', tag: 'defAcc', gloss: "the sea (object)" },
    { al: 'detit', tag: 'defDat', gloss: "to/of the sea" },
  ],
  dhelpra: [ /* fox */
    { al: 'dhelpër', tag: 'indefNom', gloss: "a fox" },
    { al: 'dhelpra', tag: 'defNom', gloss: "the fox" },
    { al: 'dhelprën', tag: 'defAcc', gloss: "the fox (object)" },
  ],
  dhi: [ /* goat */
    { al: 'dhi', tag: 'indefNom', gloss: "a goat" },
    { al: 'dhia', tag: 'defNom', gloss: "the goat" },
    { al: 'dhinë', tag: 'defAcc', gloss: "the goat (object)" },
    { al: 'dhitë', tag: 'plDef', gloss: "the goats" },
  ],
  diell: [ /* sun */
    { al: 'diell', tag: 'indefNom', gloss: "a sun" },
    { al: 'dielli', tag: 'defNom', gloss: "the sun" },
    { al: 'diellin', tag: 'defAcc', gloss: "the sun (object)" },
    { al: 'diellit', tag: 'defDat', gloss: "to/of the sun" },
  ],
  dite: [ /* day */
    { al: 'ditë', tag: 'indefNom', gloss: "a day" },
    { al: 'dita', tag: 'defNom', gloss: "the day" },
    { al: 'ditën', tag: 'defAcc', gloss: "the day (object)" },
    { al: 'ditës', tag: 'defDat', gloss: "to/of the day" },
  ],
  djale: [ /* boy */
    { al: 'djalë', tag: 'indefNom', gloss: "a boy" },
    { al: 'djali', tag: 'defNom', gloss: "the boy" },
    { al: 'djema', tag: 'plIndef', gloss: "boys" },
    { al: 'djemtë', tag: 'plDef', gloss: "the boys" },
  ],
  djall: [ /* devil */
    { al: 'djall', tag: 'indefNom', gloss: "a devil" },
    { al: 'djalli', tag: 'defNom', gloss: "the devil" },
    { al: 'djallin', tag: 'defAcc', gloss: "the devil (object)" },
  ],
  djep: [ /* cradle */
    { al: 'djep', tag: 'indefNom', gloss: "a cradle" },
    { al: 'djepin', tag: 'defAcc', gloss: "the cradle (object)" },
    { al: 'djepe', tag: 'plIndef', gloss: "cradles" },
    { al: 'djepet', tag: 'plDef', gloss: "the cradles" },
  ],
  dore: [ /* hand */
    { al: 'dorë', tag: 'indefNom', gloss: "a hand" },
    { al: 'dora', tag: 'defNom', gloss: "the hand" },
    { al: 'duart', tag: 'plDef', gloss: "the hands" },
  ],
  dre: [ /* stag */
    { al: 'dre', tag: 'indefNom', gloss: "a stag" },
    { al: 'dreun', tag: 'defAcc', gloss: "the stag (object)" },
    { al: 'dreut', tag: 'defDat', gloss: "to/of the stag" },
  ],
  dreq: [ /* devil */
    { al: 'dreq', tag: 'indefNom', gloss: "a devil" },
    { al: 'dreqi', tag: 'defNom', gloss: "the devil" },
    { al: 'dreqin', tag: 'defAcc', gloss: "the devil (object)" },
  ],
  drite: [ /* light */
    { al: 'dritë', tag: 'indefNom', gloss: "a light" },
    { al: 'drita', tag: 'defNom', gloss: "the light" },
    { al: 'dritën', tag: 'defAcc', gloss: "the light (object)" },
  ],
  ere: [ /* wind */
    { al: 'erë', tag: 'indefNom', gloss: "a wind" },
    { al: 'era', tag: 'defNom', gloss: "the wind" },
    { al: 'erën', tag: 'defAcc', gloss: "the wind (object)" },
  ],
  erresire: [ /* darkness */
    { al: 'errësirë', tag: 'indefNom', gloss: "a darkness" },
    { al: 'errësira', tag: 'defNom', gloss: "the darkness" },
    { al: 'errësirën', tag: 'defAcc', gloss: "the darkness (object)" },
  ],
  femije: [ /* child */
    { al: 'fëmijë', tag: 'indefNom', gloss: "a child" },
    { al: 'fëmija', tag: 'defNom', gloss: "the child" },
    { al: 'fëmijën', tag: 'defAcc', gloss: "the child (object)" },
    { al: 'fëmijës', tag: 'defDat', gloss: "to/of the child" },
    { al: 'fëmijët', tag: 'plDef', gloss: "the children" },
  ],
  flake: [ /* flame */
    { al: 'flakë', tag: 'indefNom', gloss: "a flame" },
    { al: 'flaka', tag: 'defNom', gloss: "the flame" },
    { al: 'flakën', tag: 'defAcc', gloss: "the flame (object)" },
  ],
  fund: [ /* end */
    { al: 'fund', tag: 'indefNom', gloss: "an end" },
    { al: 'fundin', tag: 'defAcc', gloss: "the end (object)" },
    { al: 'fundit', tag: 'defDat', gloss: "to/of the end" },
  ],
  fuqi: [ /* power */
    { al: 'fuqi', tag: 'indefNom', gloss: "a power" },
    { al: 'fuqia', tag: 'defNom', gloss: "the power" },
    { al: 'fuqinë', tag: 'defAcc', gloss: "the power (object)" },
  ],
  gjak: [ /* blood */
    { al: 'gjak', tag: 'indefNom', gloss: "a blood" },
    { al: 'gjaku', tag: 'defNom', gloss: "the blood" },
    { al: 'gjakun', tag: 'defAcc', gloss: "the blood (object)" },
  ],
  gjarper: [ /* serpent */
    { al: 'gjarpër', tag: 'indefNom', gloss: "a serpent" },
    { al: 'gjarpri', tag: 'defNom', gloss: "the serpent" },
    { al: 'gjarprin', tag: 'defAcc', gloss: "the serpent (object)" },
    { al: 'gjarprit', tag: 'defDat', gloss: "to/of the serpent" },
  ],
  gje: [ /* thing — hand */
    { al: 'gjë', tag: 'indefNom', gloss: "a thing" },
    { al: 'gjëra', tag: 'plIndef', gloss: "things" },
    { al: 'gjërat', tag: 'plDef', gloss: "the things" },
    { al: 'gjëja', tag: 'defNom', gloss: "the thing" },
  ],
  grua: [ /* woman */
    { al: 'grua', tag: 'indefNom', gloss: "a woman" },
    { al: 'gruaja', tag: 'defNom', gloss: "the woman" },
    { al: 'gruan', tag: 'defAcc', gloss: "the woman (object)" },
    { al: 'gruas', tag: 'defDat', gloss: "to/of the woman" },
    { al: 'gratë', tag: 'plDef', gloss: "the women" },
  ],
  gur: [ /* stone */
    { al: 'gur', tag: 'indefNom', gloss: "a stone" },
    { al: 'guri', tag: 'defNom', gloss: "the stone" },
    { al: 'gurin', tag: 'defAcc', gloss: "the stone (object)" },
    { al: 'gurë', tag: 'plIndef', gloss: "stones" },
  ],
  hekur: [ /* iron */
    { al: 'hekur', tag: 'indefNom', gloss: "an iron" },
    { al: 'hekuri', tag: 'defNom', gloss: "the iron" },
    { al: 'hekurin', tag: 'defAcc', gloss: "the iron (object)" },
  ],
  hendek: [ /* moat */
    { al: 'hendek', tag: 'indefNom', gloss: "a moat" },
    { al: 'hendeku', tag: 'defNom', gloss: "the moat" },
    { al: 'hendekun', tag: 'defAcc', gloss: "the moat (object)" },
  ],
  hene: [ /* moon */
    { al: 'hënë', tag: 'indefNom', gloss: "a moon" },
    { al: 'hëna', tag: 'defNom', gloss: "the moon" },
    { al: 'hënën', tag: 'defAcc', gloss: "the moon (object)" },
    { al: 'hënës', tag: 'defDat', gloss: "to/of the moon" },
  ],
  hije: [ /* shadow */
    { al: 'hije', tag: 'indefNom', gloss: "a shadow" },
    { al: 'hija', tag: 'defNom', gloss: "the shadow" },
    { al: 'hijen', tag: 'defAcc', gloss: "the shadow (object)" },
    { al: 'hijet', tag: 'plDef', gloss: "the shadows" },
  ],
  kale: [ /* horse */
    { al: 'kalë', tag: 'indefNom', gloss: "a horse" },
    { al: 'kali', tag: 'defNom', gloss: "the horse" },
    { al: 'kalin', tag: 'defAcc', gloss: "the horse (object)" },
    { al: 'kuajt', tag: 'plDef', gloss: "the horses" },
  ],
  kapidan: [ /* captain */
    { al: 'kapidan', tag: 'indefNom', gloss: "a captain" },
    { al: 'kapidani', tag: 'defNom', gloss: "the captain" },
    { al: 'kapidanin', tag: 'defAcc', gloss: "the captain (object)" },
  ],
  karkanxholl: [ /* iron-clad revenant */
    { al: 'karkanxholl', tag: 'indefNom', gloss: "an iron-clad revenant" },
    { al: 'karkanxholli', tag: 'defNom', gloss: "the iron-clad revenant" },
    { al: 'karkanxhollin', tag: 'defAcc', gloss: "the iron-clad revenant (object)" },
  ],
  katallan: [ /* one-eyed giant */
    { al: 'katallan', tag: 'indefNom', gloss: "an one-eyed giant" },
    { al: 'katallani', tag: 'defNom', gloss: "the one-eyed giant" },
    { al: 'katallanin', tag: 'defAcc', gloss: "the one-eyed giant (object)" },
  ],
  kazan: [ /* cauldron */
    { al: 'kazan', tag: 'indefNom', gloss: "a cauldron" },
    { al: 'kazani', tag: 'defNom', gloss: "the cauldron" },
    { al: 'kazanin', tag: 'defAcc', gloss: "the cauldron (object)" },
  ],
  kembe: [ /* legs — hand */
    { al: 'këmbë', tag: 'indefNom', gloss: "a leg" },
    { al: 'këmbën', tag: 'defAcc', gloss: "the leg (object)" },
    { al: 'këmbës', tag: 'defDat', gloss: "to/of the leg" },
  ],
  kemishe: [ /* caul */
    { al: 'këmishë', tag: 'indefNom', gloss: "a caul" },
    { al: 'këmishën', tag: 'defAcc', gloss: "the caul (object)" },
  ],
  kishe: [ /* church */
    { al: 'kishë', tag: 'indefNom', gloss: "a church" },
    { al: 'kisha', tag: 'defNom', gloss: "the church" },
    { al: 'kishën', tag: 'defAcc', gloss: "the church (object)" },
  ],
  koke: [ /* head */
    { al: 'kokë', tag: 'indefNom', gloss: "a head" },
    { al: 'kokën', tag: 'defAcc', gloss: "the head (object)" },
    { al: 'koka', tag: 'plIndef', gloss: "heads" },
    { al: 'kokës', tag: 'defDat', gloss: "to/of the head" },
  ],
  krajl: [ /* Slav king */
    { al: 'krajl', tag: 'indefNom', gloss: "a Slav king" },
    { al: 'krajli', tag: 'defNom', gloss: "the Slav king" },
    { al: 'krajlin', tag: 'defAcc', gloss: "the Slav king (object)" },
    { al: 'krajlit', tag: 'defDat', gloss: "to/of the Slav king" },
  ],
  krua: [ /* spring */
    { al: 'krua', tag: 'indefNom', gloss: "a spring" },
    { al: 'kroi', tag: 'defNom', gloss: "the spring" },
    { al: 'kroin', tag: 'defAcc', gloss: "the spring (object)" },
  ],
  kukudh: [ /* miser-ghost */
    { al: 'kukudh', tag: 'indefNom', gloss: "a miser-ghost" },
    { al: 'kukudhi', tag: 'defNom', gloss: "the miser-ghost" },
    { al: 'kukudhin', tag: 'defAcc', gloss: "the miser-ghost (object)" },
  ],
  kulle: [ /* tower */
    { al: 'kullë', tag: 'indefNom', gloss: "a tower" },
    { al: 'kulla', tag: 'defNom', gloss: "the tower" },
    { al: 'kullën', tag: 'defAcc', gloss: "the tower (object)" },
    { al: 'kullës', tag: 'defDat', gloss: "to/of the tower" },
    { al: 'kullat', tag: 'plDef', gloss: "the towers" },
  ],
  kuzhinier: [ /* cook */
    { al: 'kuzhinier', tag: 'indefNom', gloss: "a cook" },
    { al: 'kuzhinieri', tag: 'defNom', gloss: "the cook" },
    { al: 'kuzhinierin', tag: 'defAcc', gloss: "the cook (object)" },
    { al: 'kuzhinierit', tag: 'defDat', gloss: "to/of the cook" },
  ],
  lahute: [ /* lute */
    { al: 'lahutë', tag: 'indefNom', gloss: "a lute" },
    { al: 'lahuta', tag: 'defNom', gloss: "the lute" },
    { al: 'lahutën', tag: 'defAcc', gloss: "the lute (object)" },
  ],
  liber: [ /* book */
    { al: 'libër', tag: 'indefNom', gloss: "a book" },
    { al: 'libri', tag: 'defNom', gloss: "the book" },
    { al: 'librin', tag: 'defAcc', gloss: "the book (object)" },
  ],
  lot: [ /* tears — hand */
    { al: 'lot', tag: 'indefNom', gloss: "a tear" },
    { al: 'lotët', tag: 'plDef', gloss: "the tears" },
  ],
  lugat: [ /* revenant */
    { al: 'lugat', tag: 'indefNom', gloss: "a revenant" },
    { al: 'lugati', tag: 'defNom', gloss: "the revenant" },
    { al: 'lugatin', tag: 'defAcc', gloss: "the revenant (object)" },
    { al: 'lugatit', tag: 'defDat', gloss: "to/of the revenant" },
  ],
  lume: [ /* river — hand */
    { al: 'lumë', tag: 'indefNom', gloss: "a river" },
    { al: 'lumi', tag: 'defNom', gloss: "the river" },
    { al: 'lumin', tag: 'defAcc', gloss: "the river (object)" },
  ],
  mbreteresha: [ /* queen */
    { al: 'mbretëreshë', tag: 'indefNom', gloss: "a queen" },
    { al: 'mbretëresha', tag: 'defNom', gloss: "the queen" },
    { al: 'mbretëreshën', tag: 'defAcc', gloss: "the queen (object)" },
    { al: 'mbretëreshës', tag: 'defDat', gloss: "to/of the queen" },
  ],
  mik: [ /* friend — hand */
    { al: 'mik', tag: 'indefNom', gloss: "a friend" },
    { al: 'mike', tag: 'indefNom', gloss: "a friend (female)" },
    { al: 'miku', tag: 'defNom', gloss: "the friend" },
    { al: 'mikun', tag: 'defAcc', gloss: "the friend (object)" },
    { al: 'mikut', tag: 'defDat', gloss: "to/of the friend" },
    { al: 'miq', tag: 'plIndef', gloss: "friends" },
  ],
  mjeshter: [ /* master */
    { al: 'mjeshtër', tag: 'indefNom', gloss: "a master" },
    { al: 'mjeshtri', tag: 'defNom', gloss: "the master" },
    { al: 'mjeshtrin', tag: 'defAcc', gloss: "the master (object)" },
  ],
  motra: [ /* sister */
    { al: 'motër', tag: 'indefNom', gloss: "a sister" },
    { al: 'motra', tag: 'defNom', gloss: "the sister" },
    { al: 'motrën', tag: 'defAcc', gloss: "the sister (object)" },
    { al: 'motrës', tag: 'defDat', gloss: "to/of the sister" },
    { al: 'motrat', tag: 'plDef', gloss: "the sisters" },
  ],
  mulli: [ /* mill — hand */
    { al: 'mulli', tag: 'indefNom', gloss: "a mill" },
    { al: 'mulliri', tag: 'defNom', gloss: "the mill" },
    { al: 'mullirin', tag: 'defAcc', gloss: "the mill (object)" },
  ],
  mur: [ /* wall */
    { al: 'mur', tag: 'indefNom', gloss: "a wall" },
    { al: 'muri', tag: 'defNom', gloss: "the wall" },
    { al: 'murin', tag: 'defAcc', gloss: "the wall (object)" },
    { al: 'mure', tag: 'plIndef', gloss: "walls" },
  ],
  nene: [ /* mother — hand */
    { al: 'nënë', tag: 'indefNom', gloss: "a mother" },
    { al: 'nëna', tag: 'defNom', gloss: "the mother" },
    { al: 'nënën', tag: 'defAcc', gloss: "the mother (object)" },
    { al: 'nënës', tag: 'defDat', gloss: "to/of the mother" },
  ],
  njeri: [ /* person — hand */
    { al: 'njeri', tag: 'indefNom', gloss: "a person" },
    { al: 'njeriu', tag: 'defNom', gloss: "the person" },
    { al: 'njeriun', tag: 'defAcc', gloss: "the person (object)" },
    { al: 'njeriut', tag: 'defDat', gloss: "to/of the person" },
    { al: 'njerëz', tag: 'plIndef', gloss: "people" },
    { al: 'njerëzit', tag: 'plDef', gloss: "the people" },
  ],
  nuse: [ /* bride — hand */
    { al: 'nuse', tag: 'indefNom', gloss: "a bride" },
    { al: 'nusja', tag: 'defNom', gloss: "the bride" },
    { al: 'nusen', tag: 'defAcc', gloss: "the bride (object)" },
    { al: 'nuses', tag: 'defDat', gloss: "to/of the bride" },
    { al: 'nuseve', tag: 'plDef', gloss: "the brides" },
  ],
  pallat: [ /* palace */
    { al: 'pallat', tag: 'indefNom', gloss: "a palace" },
    { al: 'pallati', tag: 'defNom', gloss: "the palace" },
    { al: 'pallatin', tag: 'defAcc', gloss: "the palace (object)" },
  ],
  pate: [ /* goose — hand */
    { al: 'patë', tag: 'indefNom', gloss: "a goose" },
    { al: 'patat', tag: 'plDef', gloss: "the geese" },
    { al: 'patave', tag: 'plDef', gloss: "the geese (to/of)" },
  ],
  peme: [ /* tree */
    { al: 'pemë', tag: 'indefNom', gloss: "a tree" },
    { al: 'pemën', tag: 'defAcc', gloss: "the tree (object)" },
  ],
  pende: [ /* feather */
    { al: 'pendë', tag: 'indefNom', gloss: "a feather" },
    { al: 'penda', tag: 'defNom', gloss: "the feather" },
    { al: 'pendën', tag: 'defAcc', gloss: "the feather (object)" },
  ],
  plake: [ /* old woman */
    { al: 'plakë', tag: 'indefNom', gloss: "an old woman" },
    { al: 'plaka', tag: 'defNom', gloss: "the old woman" },
    { al: 'plakën', tag: 'defAcc', gloss: "the old woman (object)" },
  ],
  prift: [ /* priest */
    { al: 'prift', tag: 'indefNom', gloss: "a priest" },
    { al: 'prifti', tag: 'defNom', gloss: "the priest" },
    { al: 'priftin', tag: 'defAcc', gloss: "the priest (object)" },
  ],
  pune: [ /* work */
    { al: 'punë', tag: 'indefNom', gloss: "a work" },
    { al: 'puna', tag: 'defNom', gloss: "the work" },
    { al: 'punën', tag: 'defAcc', gloss: "the work (object)" },
  ],
  pus: [ /* well */
    { al: 'pus', tag: 'indefNom', gloss: "a well" },
    { al: 'pusi', tag: 'defNom', gloss: "the well" },
    { al: 'pusin', tag: 'defAcc', gloss: "the well (object)" },
  ],
  qen: [ /* dog */
    { al: 'qen', tag: 'indefNom', gloss: "a dog" },
    { al: 'qeni', tag: 'defNom', gloss: "the dog" },
    { al: 'qenin', tag: 'defAcc', gloss: "the dog (object)" },
    { al: 'qenit', tag: 'defDat', gloss: "to/of the dog" },
  ],
  qengj: [ /* lamb */
    { al: 'qengj', tag: 'indefNom', gloss: "a lamb" },
    { al: 'qengji', tag: 'defNom', gloss: "the lamb" },
    { al: 'qengjit', tag: 'defDat', gloss: "to/of the lamb" },
  ],
  qilim: [ /* rug */
    { al: 'qilim', tag: 'indefNom', gloss: "a rug" },
    { al: 'qilimi', tag: 'defNom', gloss: "the rug" },
    { al: 'qilimin', tag: 'defAcc', gloss: "the rug (object)" },
  ],
  qumesht: [ /* milk */
    { al: 'qumësht', tag: 'indefNom', gloss: "a milk" },
    { al: 'qumështi', tag: 'defNom', gloss: "the milk" },
    { al: 'qumështin', tag: 'defAcc', gloss: "the milk (object)" },
  ],
  qytet: [ /* city */
    { al: 'qytet', tag: 'indefNom', gloss: "a city" },
    { al: 'qyteti', tag: 'defNom', gloss: "the city" },
    { al: 'qytetin', tag: 'defAcc', gloss: "the city (object)" },
  ],
  roje: [ /* guard */
    { al: 'roje', tag: 'indefNom', gloss: "a guard" },
    { al: 'roja', tag: 'defNom', gloss: "the guard" },
    { al: 'rojen', tag: 'defAcc', gloss: "the guard (object)" },
  ],
  rrobe: [ /* dress */
    { al: 'rrobë', tag: 'indefNom', gloss: "a dress" },
    { al: 'rroba', tag: 'defNom', gloss: "the dress" },
    { al: 'rrobën', tag: 'defAcc', gloss: "the dress (object)" },
    { al: 'rrobat', tag: 'plDef', gloss: "the dresses" },
  ],
  sherbetore: [ /* servant */
    { al: 'shërbëtore', tag: 'indefNom', gloss: "a servant" },
    { al: 'sherbetorja', tag: 'defNom', gloss: "the servant" },
    { al: 'sherbetoren', tag: 'defAcc', gloss: "the servant (object)" },
  ],
  shpate: [ /* sword */
    { al: 'shpatë', tag: 'indefNom', gloss: "a sword" },
    { al: 'shpata', tag: 'defNom', gloss: "the sword" },
    { al: 'shpatën', tag: 'defAcc', gloss: "the sword (object)" },
  ],
  shpelle: [ /* cave */
    { al: 'shpellë', tag: 'indefNom', gloss: "a cave" },
    { al: 'shpella', tag: 'defNom', gloss: "the cave" },
    { al: 'shpellën', tag: 'defAcc', gloss: "the cave (object)" },
  ],
  shqiponje: [ /* eagle */
    { al: 'shqiponjë', tag: 'indefNom', gloss: "an eagle" },
    { al: 'shqiponja', tag: 'defNom', gloss: "the eagle" },
    { al: 'shqiponjën', tag: 'defAcc', gloss: "the eagle (object)" },
    { al: 'shqiponjës', tag: 'defDat', gloss: "to/of the eagle" },
    { al: 'shqiponjat', tag: 'plDef', gloss: "the eagles" },
  ],
  shtrige: [ /* witch */
    { al: 'shtrigë', tag: 'indefNom', gloss: "a witch" },
    { al: 'shtriga', tag: 'defNom', gloss: "the witch" },
    { al: 'shtrigën', tag: 'defAcc', gloss: "the witch (object)" },
  ],
  sy: [ /* eyes — hand */
    { al: 'sy', tag: 'indefNom', gloss: "an eye" },
    { al: 'syri', tag: 'defNom', gloss: "the eye" },
    { al: 'syrin', tag: 'defAcc', gloss: "the eye (object)" },
    { al: 'sytë', tag: 'plDef', gloss: "the eyes" },
    { al: 'syve', tag: 'plDat', gloss: "to/of the eyes" },
  ],
  toke: [ /* ground */
    { al: 'tokë', tag: 'indefNom', gloss: "a ground" },
    { al: 'toka', tag: 'defNom', gloss: "the ground" },
    { al: 'tokën', tag: 'defAcc', gloss: "the ground (object)" },
    { al: 'dheut', tag: 'defDat', gloss: "to/of the ground" },
  ],
  treg: [ /* market */
    { al: 'treg', tag: 'indefNom', gloss: "a market" },
    { al: 'tregu', tag: 'defNom', gloss: "the market" },
    { al: 'tregun', tag: 'defAcc', gloss: "the market (object)" },
  ],
  shesh: [ /* square */
    { al: 'shesh', tag: 'indefNom', gloss: "a square" },
    { al: 'sheshi', tag: 'defNom', gloss: "the square" },
    { al: 'sheshin', tag: 'defAcc', gloss: "the square (object)" },
  ],
  udhetar: [ /* traveller */
    { al: 'udhëtar', tag: 'indefNom', gloss: "a traveller" },
    { al: 'udhëtari', tag: 'defNom', gloss: "the traveller" },
    { al: 'udhëtarin', tag: 'defAcc', gloss: "the traveller (object)" },
    { al: 'udhëtarë', tag: 'plIndef', gloss: "travellers" },
    { al: 'udhëtarët', tag: 'plDef', gloss: "the travellers" },
  ],
  uje: [ /* water */
    { al: 'ujë', tag: 'indefNom', gloss: "a water" },
    { al: 'uji', tag: 'defNom', gloss: "the water" },
    { al: 'ujin', tag: 'defAcc', gloss: "the water (object)" },
    { al: 'ujit', tag: 'defDat', gloss: "to/of the water" },
  ],
  ujk: [ /* wolf */
    { al: 'ujk', tag: 'indefNom', gloss: "a wolf" },
    { al: 'ujku', tag: 'defNom', gloss: "the wolf" },
    { al: 'ujkun', tag: 'defAcc', gloss: "the wolf (object)" },
    { al: 'ujkut', tag: 'defDat', gloss: "to/of the wolf" },
  ],
  ure: [ /* bridge */
    { al: 'urë', tag: 'indefNom', gloss: "a bridge" },
    { al: 'ura', tag: 'defNom', gloss: "the bridge" },
    { al: 'urën', tag: 'defAcc', gloss: "the bridge (object)" },
  ],
  tabak: [ /* tanner */
    { al: 'tabak', tag: 'indefNom', gloss: "a tanner" },
    { al: 'tabaku', tag: 'defNom', gloss: "the tanner" },
    { al: 'tabakun', tag: 'defAcc', gloss: "the tanner (object)" },
    { al: 'tabakët', tag: 'plDef', gloss: "the tanners" },
    { al: 'tabakëve', tag: 'defDat', gloss: "to/of the tanners" },
  ],
  vajze: [ /* maiden */
    { al: 'vajzë', tag: 'indefNom', gloss: "a maiden" },
    { al: 'vajza', tag: 'defNom', gloss: "the maiden" },
    { al: 'vajzën', tag: 'defAcc', gloss: "the maiden (object)" },
    { al: 'vajzës', tag: 'defDat', gloss: "to/of the maiden" },
    { al: 'vajzat', tag: 'plDef', gloss: "the maidens" },
  ],
  varr: [ /* grave */
    { al: 'varr', tag: 'indefNom', gloss: "a grave" },
    { al: 'varrin', tag: 'defAcc', gloss: "the grave (object)" },
    { al: 'varrit', tag: 'defDat', gloss: "to/of the grave" },
    { al: 'varret', tag: 'plDef', gloss: "the graves" },
    { al: 'varri', tag: 'defNom', gloss: "the grave" },
  ],
  vella: [ /* brother — hand */
    { al: 'vëlla', tag: 'indefNom', gloss: "a brother" },
    { al: 'vëllai', tag: 'defNom', gloss: "the brother" },
    { al: 'vëllait', tag: 'defDat', gloss: "to/of the brother" },
    { al: 'vëllezër', tag: 'plIndef', gloss: "brothers" },
    { al: 'vëllezërit', tag: 'plDef', gloss: "the brothers" },
  ],
  vend: [ /* place */
    { al: 'vend', tag: 'indefNom', gloss: "a place" },
    { al: 'vendi', tag: 'defNom', gloss: "the place" },
    { al: 'vendin', tag: 'defAcc', gloss: "the place (object)" },
    { al: 'vendet', tag: 'plDef', gloss: "the places" },
  ],
  vit: [ /* year */
    { al: 'vit', tag: 'indefNom', gloss: "a year" },
    { al: 'viti', tag: 'defNom', gloss: "the year" },
    { al: 'vjet', tag: 'plDef', gloss: "the years" },
    { al: 'vite', tag: 'plIndef', gloss: "years" },
  ],
  vitore: [ /* house-serpent */
    { al: 'vitore', tag: 'indefNom', gloss: "a house-serpent" },
    { al: 'vitorja', tag: 'defNom', gloss: "the house-serpent" },
    { al: 'vitoren', tag: 'defAcc', gloss: "the house-serpent (object)" },
  ],
  zane: [ /* fairy */
    { al: 'zanë', tag: 'indefNom', gloss: "a fairy" },
    { al: 'zana', tag: 'defNom', gloss: "the fairy" },
    { al: 'zanën', tag: 'defAcc', gloss: "the fairy (object)" },
    { al: 'zanës', tag: 'defDat', gloss: "to/of the fairy" },
    { al: 'zanat', tag: 'plDef', gloss: "the fairies" },
  ],
  zjarr: [ /* fire */
    { al: 'zjarr', tag: 'indefNom', gloss: "a fire" },
    { al: 'zjarri', tag: 'defNom', gloss: "the fire" },
    { al: 'zjarrin', tag: 'defAcc', gloss: "the fire (object)" },
    { al: 'zjarrit', tag: 'defDat', gloss: "to/of the fire" },
  ],
  zog: [ /* chick */
    { al: 'zog', tag: 'indefNom', gloss: "a chick" },
    { al: 'zogu', tag: 'defNom', gloss: "the chick" },
    { al: 'zogun', tag: 'defAcc', gloss: "the chick (object)" },
    { al: 'zogjtë', tag: 'plDef', gloss: "the birds" },
    { al: 'zogut', tag: 'defDat', gloss: "to/of the chick" },
  ],
}
for (const [id, forms] of Object.entries(NOUN_FORMS)) DICT[id].forms = forms

// ---------------------------------------------------------------------------
// TOKEN HELPERS
//   w(id)            -> word token, uses the dictionary surface/gloss
//   wf(id, al, en?)  -> word token with an inflected surface (same sense id)
//   p(en)            -> structural token (punctuation), rendered plainly, not discoverable
// ---------------------------------------------------------------------------
export const w = (id) => ({ id, al: DICT[id].al, en: DICT[id].en })
// The declared English senses of a word: enAll ("on / in") split into a set, or
// just [en] for single-sense words.
const sensesOf = (id) => (DICT[id].enAll ?? DICT[id].en).split('/').map((s) => s.trim())
// The inflected surfaces a word's forms table declares (lower-cased). Used by wf()
// to guarantee every surface the STORY shows is also a known form — so the forms
// table (the single source of truth for a word's declension) can never fall out of
// sync with the story. Case-folded so sentence-initial Capitals match; diacritics
// stay significant so a missing ë is caught as the real typo it is.
const formSurfaces = (id) => (DICT[id].forms ?? []).map((f) => f.al.toLowerCase())
export const wf = (id, al, en) => {
  // If a word declares multiple senses (enAll), a per-token gloss override must
  // pick one of them — guards against typos and senses drifting out of enAll.
  // (Words without enAll keep using `en` freely for inflected-form glosses.)
  if (en != null && DICT[id].enAll && !sensesOf(id).includes(en)) {
    throw new Error(
      `wf('${id}', '${al}', '${en}'): '${en}' is not a declared sense of '${id}'. ` +
        `Add it to enAll ("${DICT[id].enAll}") or use one of: ${sensesOf(id).join(', ')}`,
    )
  }
  // If a word has a forms table (nouns we drill in "endings mode"), every inflected
  // surface used in the story MUST be a declared form — this is the completeness
  // guard: an unlisted surface throws at import so the table stays exhaustive.
  if (DICT[id].forms && !formSurfaces(id).includes(al.toLowerCase())) {
    throw new Error(
      `wf('${id}', '${al}'): '${al}' is not a declared form of '${id}'. ` +
        `Add { al: '${al}', tag: '…', gloss: '…' } to its forms table, or fix the surface. ` +
        `Declared: ${formSurfaces(id).join(', ')}`,
    )
  }
  return { id, al, en: en ?? DICT[id].en }
}
export const p = (en) => ({ en, paren: true })

// shorthand: build a token line from a compact spec
const L = (...tokens) => tokens

// A line quoted WORD-FOR-WORD from the folk sources (a ballad, the Kanun, a tale
// formula). It is a normal token line — every word discoverable and trainable —
// but carries its attribution, and the game sets it apart visually so the player
// knows they are reading the real thing, not game prose. Spelling is normalized
// to the game's standard Albanian (the Gheg original stays in the code comment).
// Composes with when()/unless(): the return value IS the token array.
export const Q = (source, ...tokens) => Object.assign(tokens, { quote: source })

// Conditional story lines — a node.text entry is normally a token line (array), but
// when()/unless() make a line appear only if the player HAS / LACKS a given item or
// companion. This lets a scene react to what walks with you: e.g. with the wolf, a
// hostile encounter resolves "the wolf attacks them" instead of the neutral default.
// Either accepts an array of ids as an AND ("all of these"): when(['night',
// 'fireLive'], …) shows the line only at night AND while the fire burns; unless()
// with an array hides it only when ALL are present.
export const when = (itemId, line) => ({ cond: itemId, line })
export const unless = (itemId, line) => ({ cond: itemId, negate: true, line })
// from()/notFrom() react to the WAY you entered the scene: gameState tracks the
// node you walked in from (`state.cameFrom`) and exposes it as the virtual item
// `from:<nodeId>`, so an arrival can be narrated as the crossing it was ("you
// cross the tanners' bridge — now you are at the river") while notFrom() keeps
// the plain establishing line for every other way in. Takes one node id or an
// array of them (any match).
const fromCond = (nodeIds) => 'from:' + [].concat(nodeIds).join('|')
export const from = (nodeIds, line) => ({ cond: fromCond(nodeIds), line })
export const notFrom = (nodeIds, line) => ({ cond: fromCond(nodeIds), negate: true, line })
// became()/notBecame() react to the HOUR turning under your feet: gameState
// tracks the time-of-day phase you last acted in (`state.cameFromPhase`) and
// exposes the crossing as the virtual item `became:<phase>`, true only when
// your last choice — a walk, a wait, a `time:` rest-jump — carried the clock
// into that phase. So nightfall can be narrated as it HAPPENS ("nata vjen.")
// while notBecame() keeps the standing description ("është natën.") for a
// scene entered deep inside the phase. Takes one phase id or an array (any).
const becameCond = (phases) => 'became:' + [].concat(phases).join('|')
export const became = (phases, line) => ({ cond: becameCond(phases), line })
export const notBecame = (phases, line) => ({ cond: becameCond(phases), negate: true, line })
export const lineOf = (entry) => (Array.isArray(entry) ? entry : entry.line)
// the lines actually shown for a node, given has(itemId) -> bool; a cond may be
// an array of ids meaning ALL of them (see when()/unless() above)
export const visibleLines = (node, has) =>
  node.text.filter((e) => {
    if (Array.isArray(e)) return true
    const all = [].concat(e.cond).every(has)
    return e.negate ? !all : all
  }).map(lineOf)

// ---------------------------------------------------------------------------
// STORY GRAPH
// Each node: { id, text: [tokens], options: [{ text:[tokens], to }], end? }
// Answers are kept short and reuse story vocabulary.
// ---------------------------------------------------------------------------
export const START_NODE = 'start'
// the open-world hub you drop back into after a GOOD ending (rather than
// restarting from START_NODE). A good ending may override this with `returnTo`.
export const WORLD_HUB = 'udhekryq'

export const STORY = {
  // =========================================================================
  // ACT I — the thirsting village (the Call)
  // =========================================================================
  // The Call comes in the wild: you are a hungry traveller caught at DUSK in
  // the forest edge, the village a far glimmer of light — and the clock starts
  // exactly two choices shy of nightfall (gameState's START_CLOCK), so the
  // natural opening (into the forest, light a fire) has night fall AS the fire
  // catches (lendina's became('night') line). Rest here, light a fire against
  // the coming dark, or make for the lamps — each a real choice that follows from
  // the scene, and sleeping in the woods (not in a town) now leads coherently to
  // the wolf in the night. You carry no bread yet; that is earned at the village.
  // You arrive out of the wild at the BRIDGE that leads into the village — the
  // threshold from the dark forest (behind you, a path leading into it) to the
  // settled world across the river. Cross the bridge to the river-quarter, or
  // go into the forest: the path ends at a clearing (lendina), the forest's
  // front door — camp there, or walk on deeper into the wild (pylliLoop).
  start: {
    id: 'start',
    text: [
      // walked back over the bridge? the scene opens with the crossing
      from('fshatiLumi', L(w('ti'), wf('kalo', 'kalon', 'cross'), wf('ure', 'urën', 'the bridge'), w('mbrapa'), p('.'))),
      notFrom('fshatiLumi', L(w('ti'), w('je'), w('para'), w('nje'), w('ure'), p('.'))),
      L(w('nje'), w('lume'), w('eshte'), w('poshte'), p('.')),
      L(wf('ure', 'ura', 'the bridge'), wf('shko', 'shkon', 'goes'), wf('ne', 'në', 'to'), w('nje'), w('fshat'), p('.')),
      L(w('mbrapa'), w('eshte'), w('nje'), w('pyll'), w('me'), w('nje'), w('rruge'), p('.')),
      // the hour of the world — one line per phase of the day/night cycle; when
      // the walk itself crossed into the dark, nightfall is announced as an event
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(w('eshte'), w('erret'), w('dhe'), w('ftohte'), p('.'))),
      when('dawn', L(w('eshte'), w('agim'), p(','), wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      when('day', L(w('eshte'), w('dite'), p(','), wf('diell', 'dielli', 'the sun'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      when('dusk', L(w('eshte'), w('muzg'), p(','), wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.')),
    ],
    options: [
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'fshatiLumi' },
      { text: L(w('hyr'), wf('ne', 'në', 'in'), w('pyll')), to: 'lendina' },
    ],
  },

  // The forest CLEARING — the forest's front door AND the camp: lendina IS the
  // fireplace. The path from the bridge ends here; the campfire is lit HERE and
  // lives here between visits (big, dying, cold ash — relight it). At the night
  // fire the whole guest arc plays out in place: the cold old woman drawn to the
  // light (feed her — the Ora's blessing; wait — the Shtriga). Sleep on the
  // ground (the wolf), follow the road back out, or walk deeper (pylliLoop).
  lendina: {
    id: 'lendina',
    text: [
      // "you walk in the forest" is the ARRIVAL crossing — only the walk in from
      // the road (start), not the wait/light-fire/torch self-loops back to here
      from('start', L(w('ti'), w('ec'), wf('ne', 'në', 'in'), wf('pyll', 'pyllin', 'the forest'), p('.'))),
      L(w('ketu'), w('eshte'), w('nje'), w('vend'), w('i_art'), w('qete'), p('.')),
      // the path ends at the clearing — behind you the road, ahead only trees
      L(w('nje'), w('rruge'), wf('shko', 'shkon', 'goes'), w('mbrapa'), p('.')),
      L(wf('pyll', 'pylli', 'the forest'), wf('shko', 'shkon', 'goes'), w('thelle'), p('.')),
      // striking the fire is narrated as it happens (the turn you light it)…
      when('litFire', L(w('ti'), wf('ndiz', 'ndez', 'light'), wf('zjarr', 'zjarrin', 'the fire'), p('.'))),
      // …then the campfire is a PHYSICAL fact of the clearing — it burns, dies, goes cold
      when('fireBig', L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('i_art'), w('madh'), p('.'))),
      when('fireLow', L(wf('zjarr', 'zjarri', 'the fire'), w('vdes'), p('.'))),
      when('fireOut', L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('i_art'), w('ftohte'), p('.'))),
      // if THIS visit crossed into the dark (lighting the fire at dusk, waiting),
      // nightfall is narrated as it happens…
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(w('eshte'), w('erret'), w('dhe'), w('ftohte'), p('.'))),
      // …and the sleep on the ground ("fle deri në agim") breaks HERE at sunrise
      became('dawn', L(wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      when('dawn', L(w('eshte'), w('agim'), w('dhe'), w('ftohte'), p('.'))),
      when('day', L(w('eshte'), w('dite'), p('.'))),
      when('dusk', L(w('eshte'), w('muzg'), p(','), wf('naten', 'nata', 'the night'), w('vjen'), p(','), w('behet'), w('ftohte'), p('.'))),
      // …and the cold old woman of the wood WALKS here (npcs.js plakaPyllit):
      // at nightfall she comes out of the trees to the clearing; if a fire
      // burns, the light draws her to sit and the guest arc opens — a dark or
      // dead fireplace draws no one to it
      when('npc:plakaPyllit', L(w('nje'), w('plake'), w('e_art'), w('ftohte'), w('vjen'), w('nga'), wf('pyll', 'pylli', 'the forest'), p('.'))),
      when(['npc:plakaPyllit', 'fireLive'], L(wf('plake', 'plaka', 'the old woman'), w('rri'), wf('tek', 'te', 'at'), wf('zjarr', 'zjarri', 'the fire'), p('.'))),
      when(['npc:plakaPyllit', 'fireLive'], L(wf('plake', 'plaka', 'the old woman'), w('eshte'), w('nje'), wf('mik', 'mik', 'guest'), w('i_art'), w('shenjte'), p('.'))),
      when(['npc:plakaPyllit', 'fireLive'], L(wf('plake', 'plaka', 'the old woman'), w('do'), w('buke'), p('.'))),
      L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.')),
    ],
    options: [
      // a fire wants the cold hours — by day it has no cause (standards §2)
      { text: L(w('ndiz'), w('nje'), w('zjarr')), unless: ['day', 'fireLive'], fire: true, to: 'lendina' },
      // the guest arc — only while SHE sits at a live fire (npc + fireLive)
      { text: L(w('jep'), w('buke')), requires: ['buke', 'npc:plakaPyllit', 'fireLive'], consumes: 'buke', to: 'besaBekim', reveal: 'buke' },
      // making the torch is the PLAYER's act (no narration) — it wants the big flame
      { text: L(w('bej'), w('pishtar')), requires: 'fireBig', grant: 'pishtar', unless: 'pishtar', to: 'lendina' },
      { text: L(w('prit'), w('ketu')), requires: ['npc:plakaPyllit', 'fireLive'], to: 'shtrigaNate' },
      // sleeping carries you into the night (the wolf finds you there)
      { text: L(w('fle'), w('ketu')), to: 'gjumi', time: 'night' },
      // rest in the clearing until dark — the big "wait" time-jump
      { text: L(w('prit'), wf('naten', 'natën', 'night')), unless: 'night', to: 'lendina', time: 'night' },
      // the two ways on: back out down the path, or deeper into the wild
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road'), w('mbrapa')), to: 'start' },
      { text: L(w('ec'), w('thelle'), wf('ne', 'në', 'in'), w('pyll')), to: 'pylliLoop', reveal: 'pyll' },
    ],
  },

  // The old woman's HOUSE — one building of the explorable village. A guest is
  // sent by God, so she feeds you (your first bread) and gives the Call: the
  // Kulshedra holds the water and the Beauty. She also tells of Aga Ymer's besa.
  plaka: {
    id: 'plaka',
    text: [
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'to'), w('nje'), w('shtepi'), p('.')),
      L(w('nje'), w('plake'), w('rri'), w('brenda'), p('.')),
      L(w('une'), wf('thote', 'them', 'say'), p(':'), w('te_obj'), wf('lut', 'lutem', 'please'), p(','), w('jep'), w('buke'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('jep'), w('buke'), p('.')),
      // the Kanun's hospitality formula, spoken as she sets the bread down —
      // §608: "Buka e kryp' e zêmra" (what the guest is owed: bread, salt and heart)
      Q('Kanuni i Lekë Dukagjinit, §608',
        wf('plake', 'plaka', 'the old woman'), w('thote'), p(':'), w('buke'), w('e_conj'), w('kripe'), w('e_conj'), w('zemer'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('thote'), p(':'), w('kulshedra'), w('ka'), w('uje'), w('dhe'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('buke')), grant: 'buke', to: 'fshatiSheshi', reveal: 'buke' },
      { text: L(w('degjo'), wf('plake', 'plakën', 'the old woman')), to: 'agaYmer1', reveal: 'brenda' },
      { text: L(w('dil'), w('jashte')), to: 'fshatiSheshi' },
    ],
  },

  // =========================================================================
  // SIDE-QUEST — Aga Ymer of Ulcinj (the besa of the returning husband)
  // A captive held abroad nine years is freed on his besa to return; he reaches
  // home as his wife is to remarry, is known by a scar — then rides back to keep
  // his word.
  // =========================================================================
  agaYmer1: {
    id: 'agaYmer1',
    text: [
      L(wf('plake', 'plaka', 'the old woman'), w('thote'), p(':')),
      // the classic Tosk tale-opener, exactly as the tellers begin (Dozon prints
      // it "Iç mos iç" and calls it the initial formula of the tales)
      Q('formula e përrallës (Dozon, 1879)',
        wf('eshte', 'ish', 'was'), w('e_conj'), wf('mos', 'mos', 'not'), wf('eshte', 'ish', 'was'), p('…')),
      L(w('nje'), w('trim'), w('eshte'), w('larg'), w('nente'), wf('vit', 'vjet', 'years'), w('dhe'), w('nente'), wf('dite', 'ditë', 'days'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), wf('quhem', 'quhet', 'is called'), w('aga'), w('ymer'), p('.')),
      L(w('nje'), w('grua'), w('prit'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), w('eshte'), wf('ne', 'në', 'in'), w('burg'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), wf('ka', 'kishte', 'had'), w('nje'), w('bese'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), w('kendo'), w('me'), wf('lahute', 'lahutën', 'the lute'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), wf('premto', 'premton', 'swears'), w('te_subj'), w('kthehu'), p('.')),
      L(wf('bije', 'bija', 'the daughter'), w('e_link'), wf('mbret', 'mbretit', 'the king'), w('fal'), wf('trim', 'trimin', 'the hero'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('trim', 'trimin', 'the hero')), to: 'agaYmer2', reveal: 'trim' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // === THE EVIL EYE (syri i keq) — the praising/envious gaze sickens =========
  syriKeq1: {
    id: 'syriKeq1',
    text: [
      L(w('ketu'), w('nje'), w('femije'), w('eshte'), w('i_art'), w('bukur'), p('.')),
      L(w('nje'), w('njeri'), w('thote'), p(':'), w('i_art'), w('bukur'), p('!')),
      L(w('femije'), w('semure'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('ka'), w('hudher'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('thote'), p(':'), wf('thote', 'thuaj', 'say'), w('mashallah'), w('per'), w('nje'), w('femije'), w('te_link'), w('bukur'), p('!')),
    ],
    options: [
      { text: L(w('jep'), w('hudher'), wf('femije', 'fëmijës', 'to the child')), to: 'syriKeqFund', reveal: 'hudher' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  syriKeqFund: {
    id: 'syriKeqFund',
    end: 'secret',
    title: 'The Evil Eye',
    blurb:
      'A child too openly admired, the old people warn, draws the syri i keq — the evil eye, the envious or even the loving gaze that sickens what it praises. So a wise mouth says "mashallah" over a fair child, and a wise hand hangs garlic to turn the eye aside. You hung the garlic, and the child’s fever broke. Never praise a child, a bride, or a fat lamb without a charm — the eye does not mean to harm, and harms all the same.',
    text: [
      L(w('ti'), w('jep'), w('hudher'), wf('femije', 'fëmijës', 'to the child'), p('.')),
      L(w('ti'), w('ia'), w('jep'), p('.')),
      L(wf('sy', 'syri', 'the eye'), w('i_art'), w('keq'), wf('ik', 'ikën', 'goes'), p('.')),
      L(wf('femije', 'fëmija', 'the child'), w('eshte'), w('i_art'), w('mire'), p('.')),
    ],
    options: [],
  },

  // === THE TORTOISE — why the breshkë carries her house (the inhospitable wife) =
  breshka1: {
    id: 'breshka1',
    text: [
      L(w('ti'), wf('bej', 'bën', 'bake'), w('buke'), p('.')),
      L(w('nje'), w('mik'), w('vjen'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('eshte'), w('uritur'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('do'), w('buke'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('thote'), p(':'), w('ke'), w('ndonje'), w('buke'), p('?')),
      L(wf('mik', 'miku', 'guest'), w('do'), wf('buke', 'bukën', 'the bread'), wf('yt', 'tënde', 'your'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('thote'), p(':'), w('ma'), w('jep'), p('!')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('nje'), w('mik'), w('vjen'), w('nga'), w('perendi'), p('.')),
      // the most famous sentence of the Kanun, word for word — §602:
      // "Shpija e Shqyptarit âsht e Zotit dhe e mikut" (Gheg original)
      Q('Kanuni i Lekë Dukagjinit, §602',
        wf('shtepi', 'shtëpia', 'the house'), w('e_link'), wf('shqiptar', 'shqiptarit', 'Albanian'), w('eshte'),
        w('e_link'), wf('zot', 'Zotit', 'lord'), w('dhe'), w('e_link'), wf('mik', 'mikut', 'guest'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('nje'), w('grua'), wf('fsheh', 'fshehu', 'hid'), w('buke'), w('nga'), w('nje'), w('mik'), w('dhe'), wf('behet', 'u bë', 'became'), w('breshka'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('mik', 'mikut', 'guest')), to: 'breshkaMire', reveal: 'mik' },
      { text: L(w('fsheh'), wf('buke', 'bukën', 'the bread')), to: 'breshkaFund', reveal: 'buke' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  breshkaMire: {
    id: 'breshkaMire',
    end: 'good',
    title: 'Bread for the Guest',
    blurb:
      'A hungry traveller came to your fire and you set bread before him without being asked. The grandmothers tell what became of the wife who did the opposite — cursed to carry her baking-pan on her back for all time, the first tortoise, slow and shut-in, her stinginess written on her shell for every child to read. You are her opposite and her answer: she who gives bread keeps her own roof, and her name. The traveller ate, and blessed your house and your hand, and that blessing outlasts the loaf.',
    text: [
      L(w('ti'), w('jep'), w('buke'), wf('mik', 'mikut', 'guest'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('te_obj'), w('jep'), w('nje'), w('bekim'), p('.')),
    ],
    options: [],
  },

  breshkaFund: {
    id: 'breshkaFund',
    end: 'secret',
    title: 'Why the Tortoise Carries her House',
    blurb:
      'You hid your bread from a hungry guest and turned him from the door — and that, the grandmothers say, is how the first tortoise was made: a stingy wife who would not give a crust to a traveller (some say to God in a beggar’s shape) was cursed to wear her baking-pan upon her back and carry her house with her wherever she goes, slow and shut-in, for all of time. So the inhospitable are remembered. Bread refused is a roof lost.',
    text: [
      L(w('ti'), w('fsheh'), wf('buke', 'bukën', 'the bread'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('mallko'), w('ti'), p('.')),
      L(w('ti'), wf('behet', 'bëhesh', 'become'), w('nje'), w('breshka'), p('.')),
      L(wf('shtepi', 'shtëpia', 'the house'), w('rri'), w('mbi'), w('ti'), p('.')),
    ],
    options: [],
  },

  agaYmer2: {
    id: 'agaYmer2',
    text: [
      L(wf('trim', 'trimi', 'the hero'), w('thote'), p(':')),
      L(w('une'), wf('premto', 'premtova', 'swore'), w('nje'), w('bese'), p('.')),
      L(w('une'), wf('kthehu', 'kthehem', 'return'), wf('ne', 'në', 'to'), w('shtepi'), p('.')),
      L(w('por'), w('nje'), w('grua'), w('do'), w('nje'), w('trim'), w('tjeter'), p('.')),
      L(w('dhe'), w('une'), wf('ka', 'kam', 'have'), w('nje'), w('plage'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('sheh'), wf('plage', 'plagën', 'the wound'), w('dhe'), w('di'), p(':'), w('ky'), w('eshte'), wf('trim', 'trimi', 'the hero'), p('.')),
      L(w('une'), wf('kthehu', 'kthehem', 'return'), wf('ne', 'në', 'to'), w('burg'), p(','), w('se'), w('une'), wf('premto', 'premtova', 'swore'), p('.')),
    ],
    options: [
      { text: L(w('mban'), wf('bese', 'besën', 'the besa')), to: 'agaYmerFund' },
      { text: L(w('rri'), w('ne'), w('shtepi')), to: 'agaYmerStay', reveal: 'shtepi' },
    ],
  },

  agaYmerStay: {
    id: 'agaYmerStay',
    end: 'bad',
    title: 'The Broken Word',
    blurb:
      'You stayed. After nine years in chains, who could blame you for taking your wife’s hand and your own hearth again? But a besa is a besa, and word spread that Aga Ymer had given his sworn word to return and had not — and in the old country a man is only as good as his besa. You lived out your days warm and fed and quietly unforgiven, your name left out of the songs that should have carried it forever. Some prisons have no walls.',
    text: [
      L(wf('trim', 'trimi', 'the hero'), w('rri'), w('ne'), w('shtepi'), p('.')),
      L(w('por'), wf('trim', 'trimi', 'the hero'), w('nuk'), w('mban'), wf('bese', 'besën', 'the besa'), p('.')),
    ],
    options: [],
  },

  agaYmerFund: {
    id: 'agaYmerFund',
    end: 'secret',
    title: 'Aga Ymer’s Besa',
    blurb:
      'His wife had sworn to wait for him nine years and nine days; held captive far from home, Aga Ymer of Ulcinj was freed at last only on his besa to return. He reached his door as that vow ran out and she was about to be wed to another, and an old scar on his arm proved who he was — and then, his word unbroken, he mounted and rode all the way back to his chains — and the captor-king, awed that a man would ride back to prison to keep his word, set him free for good. Not even a homecoming outweighs a sworn besa; and a besa kept can open even a prison door.',
    text: [
      L(wf('grua', 'gruaja', 'the woman'), w('sheh'), wf('trim', 'trimin', 'the hero'), w('perseri'), p('.')),
      // the ballad's welcome, word for word: "Mirë se erdhe, Imer Aga!"
      Q('Ymer Aga — këngë popullore',
        wf('thote', 'thonë', 'they say'), p(':'), w('mire'), w('se'), wf('vjen', 'erdhe', 'came'), p(','), w('aga'), w('ymer'), p('!')),
      // and the crowd's praise: "majte besën qi ke dhanë!" (Gheg original)
      Q('Ymer Aga — këngë popullore',
        wf('mban', 'mbajte', 'kept'), wf('bese', 'besën', 'the besa'), w('qe'), w('ke'), wf('jep', 'dhënë', 'given'), p('!')),
      L(wf('trim', 'trimi', 'the hero'), wf('mban', 'mban', 'keeps'), wf('bese', 'besën', 'the besa'), w('dhe'), w('kthehu'), w('larg'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('fal'), wf('trim', 'trimin', 'the hero'), p('.')),
      // the tale closes as the tellers close: "U mplak e u trashëgua" (Dozon's
      // printed closing formula, the pair of "Iç mos iç")
      Q('formula e mbylljes (Dozon, 1879)',
        w('ata'), wf('mplaket', 'u mplakën', 'grew old'), w('e_conj'), wf('trashegohet', 'u trashëguan', 'had heirs'), p('.')),
    ],
    options: [],
  },

  pylli1: {
    id: 'pylli1',
    text: [
      // the forest's EDGE — both village roads (the gate road and the
      // crossroads road) arrive here before the wood deepens
      from('udhekryq', L(w('ti'), w('vjen'), w('nga'), wf('udhekryq', 'udhëkryqi', 'crossroads'), p('.'))),
      L(w('ti'), w('ec'), w('ne'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('eshte'), w('erret'), w('dhe'), w('thate'), p('.')),
      L(w('tre'), wf('vella', 'vëllezër', 'brothers'), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
      L(w('nje'), w('dervish'), w('dhe'), w('nje'), w('arushe'), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylliThelle', reveal: 'pyll' },
      { text: L(w('fol'), w('me'), wf('vella', 'vëllezërit', 'the brothers')), to: 'kordha1', reveal: 'vella' },
      { text: L(w('fol'), w('me'), wf('dervish', 'dervishin', 'the dervish')), to: 'arushe1', reveal: 'arushe' },
      // the honest way out of the great forest — back down the road you came in by
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiDil' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  pylliThelle: {
    id: 'pylliThelle',
    text: [
      L(w('ne'), w('pyll'), w('vjen'), w('nje'), w('ujk'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('eshte'), w('i_art'), w('uritur'), p('.')),
      when('mish', L(wf('ujk', 'ujku', 'the wolf'), w('sheh'), wf('mish', 'mishin', 'the meat'), wf('yt', 'tënd', 'your'), p('.'))),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('naten'), w('mos'), wf('thirr', 'thirr', 'call'), wf('emer', 'emrin', 'the name'), w('e_link'), wf('ujk', 'ujkut', 'the wolf'), p('.')),
      unless('buke', L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.'))),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'shokuUjk', reveal: 'uritur' },
      { text: L(w('jep'), w('mish'), wf('ujk', 'ujkut', 'to the wolf')), requires: 'mish', consumes: 'mish', to: 'shokuUjk', reveal: 'uritur' },
      { text: L(w('lufto'), wf('ujk', 'ujkun', 'the wolf')), to: 'eaten', reveal: 'ujk' },
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
      // the wolf leads you onto the night road (udheNate — its beings walk after dark)
      { text: L(w('ec'), w('me'), wf('ujk', 'ujkun', 'the wolf')), grant: 'ujk', to: 'udheNate', time: 'night' },
      { text: L(w('degjo'), wf('ujk', 'ujkun', 'the wolf')), to: 'ujkuLind1', reveal: 'mik' },
    ],
  },

  udha: {
    id: 'udha',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('lume'), w('te_link'), w('madh'), p('.')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'to'), w('lume')), to: 'udhaThate', reveal: 'lume' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi', time: 'night' },
    ],
  },

  // === THE STIHI — the female fire-breathing treasure-guardian dragon =========
  stihi1: {
    id: 'stihi1',
    text: [
      L(w('ketu'), w('eshte'), w('nje'), wf('shpelle', 'shpellë', 'cave'), p('.')),
      L(w('zjarr'), wf('dil', 'del', 'comes out'), w('nga'), wf('shpelle', 'shpella', 'the cave'), p('.')),
      L(w('nje'), w('stihi'), w('eshte'), wf('ne', 'në', 'in'), wf('shpelle', 'shpellën', 'the cave'), p('.')),
      L(wf('stihi', 'stihia', 'the fire-dragon'), w('ruan'), w('ar'), p('.')),
      L(wf('stihi', 'stihia', 'the fire-dragon'), w('nxjerr'), wf('flake', 'flakë', 'flame'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kush'), w('merr'), wf('ar', 'arin', 'the gold'), p(','), w('nuk'), wf('dil', 'del', 'comes out'), p('.'), w('kush'), wf('le', 'lë', 'leaves'), wf('ar', 'arin', 'the gold'), p(','), wf('jeto', 'jeton', 'lives'), p('.')),
      // the proverb over every hoard and every debt: God delays, but does not forget
      Q('fjalë e urtë',
        wf('thote', 'thonë', 'they say'), p(':'), wf('zot', 'Zoti', 'lord'), w('vonon'), p(','), w('por'), w('nuk'), w('harron'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('ar', 'arin', 'the gold')), to: 'stihiDjeg', reveal: 'ar' },
      { text: L(wf('le', 'lër', 'leave'), wf('ar', 'arin', 'the gold')), to: 'stihiFund', reveal: 'ar' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylliLoop' },
    ],
  },

  stihiDjeg: {
    id: 'stihiDjeg',
    end: 'bad',
    title: 'The Fire of the Stihi',
    blurb:
      'You reached for the hoard, and the Stihi woke. She is no common serpent but a Stihi — from stuhí, the storm — a fire-breathing she-dragon of the southern Albanian and Arbëresh tales, close kin to the kulshedra, set to guard a treasure. Her breath is a sheet of flame, and a hoard kept by a Stihi is not taken by any hand: it is hers, and now so are your ashes.',
    text: [
      L(wf('stihi', 'stihia', 'the fire-dragon'), w('nxjerr'), wf('flake', 'flakë', 'flame'), p('.')),
      L(wf('flake', 'flaka', 'the flame'), w('te_obj'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  stihiFund: {
    id: 'stihiFund',
    end: 'good',
    title: 'What the Stihi Keeps',
    blurb:
      'You took your hand from the gold and stepped back, and the Stihi lowered her head and let the fire die in her throat. A Stihi is a fire-breathing she-dragon set over a hoard; her treasure is no more for the taking than the lightning is, and the only ones who leave her cave are the ones who leave it empty-handed. You went out alive into the cool of the forest: the wisest wealth, by that fire, was the wealth you did not reach for.',
    text: [
      L(w('ti'), wf('le', 'lë', 'leave'), wf('ar', 'arin', 'the gold'), p('.')),
      L(wf('stihi', 'stihia', 'the fire-dragon'), w('fle'), w('perseri'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  // === THE GJÂMË — the death-wail / cult of the dead (Nëna e Diellit) =========
  vajtim1: {
    id: 'vajtim1',
    text: [
      L(w('ketu'), w('nje'), w('trim'), w('eshte'), wf('vdes', 'i vdekur', 'dead'), p('.')),
      L(w('nje'), w('kapidan'), wf('vrit', 'vrau', 'killed'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(wf('burre', 'burrat', 'the men'), wf('bej', 'bëjnë', 'make'), wf('gjeme', 'gjëmën', 'the death-wail'), p('.')),
      L(wf('burre', 'burrat', 'the men'), wf('godit', 'godasin', 'strike'), wf('gji', 'gjirin', 'the chest'), w('dhe'), wf('thirr', 'thërrasin', 'cry'), wf('emer', 'emrin', 'the name'), w('e_link'), wf('trim', 'trimit', 'the hero'), p('.')),
      L(wf('grua', 'gratë', 'the women'), wf('kendo', 'këndojnë', 'sing'), wf('vajtim', 'vajtimin', 'the lament'), p('.')),
      L(w('mujo'), w('do'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(wf('bej', 'bëj', 'make'), wf('gjeme', 'gjëmën', 'the death-wail')), to: 'vajtimFund', reveal: 'gjeme' },
      { text: L(w('ndihmo'), w('mujo')), to: 'mujoHak1', reveal: 'kapidan' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  // === MUJO AVENGES HALILI (the most famous Kângë Kreshnikësh) ============
  mujoHak1: {
    id: 'mujoHak1',
    text: [
      L(wf('lahute', 'lahuta', 'the lute'), wf('kendo', 'këndon', 'sings'), p(':')),
      L(w('nje'), w('kapidan'), wf('vrit', 'vrau', 'killed'), wf('halil', 'Halilin', 'Halili'), w('pa'), w('bese'), p('.')),
      L(w('halil'), w('eshte'), wf('vdes', 'i vdekur', 'dead'), p('.')),
      L(w('mujo'), wf('bej', 'bën', 'makes'), wf('gjeme', 'gjëmën', 'the death-wail'), p('.')),
      L(w('mujo'), w('do'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), w('mujo')), to: 'mujoHakFund', reveal: 'kapidan' },
      { text: L(w('mos'), w('lufto')), to: 'mujoHakKeq' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujoHakFund: {
    id: 'mujoHakFund',
    end: 'secret',
    title: 'Mujo Avenges Halili',
    blurb:
      'Brother-vengeance runs through the whole frontier cycle: a kreshnik treacherously killed must be answered in blood by his own. A Slav captain killed young Halili by treachery, and Mujo of Jutbina would not rest while the blood lay unanswered — he hunted the captain down and paid the debt where it was owed. A brother’s blood, treacherously spilled, is the one debt that must be paid.',
    text: [
      L(w('mujo'), wf('lufto', 'lufton', 'fights'), wf('kapidan', 'kapidanin', 'the captain'), p('.')),
      L(w('mujo'), wf('vrit', 'vret', 'kills'), wf('kapidan', 'kapidanin', 'the captain'), w('mbi'), w('varr'), p('.')),
      L(w('mujo'), w('merr'), wf('gjak', 'gjakun', 'the blood'), p('.')),
    ],
    options: [],
  },

  mujoHakKeq: {
    id: 'mujoHakKeq',
    end: 'bad',
    title: 'The Blood Unanswered',
    blurb:
      'You held Mujo back, and the captain who murdered Halili by treachery rode home untouched. Among the kreshniks there is no heavier shame than a brother killed in cold blood and left unavenged. The lahutë began the song of Halili’s death — and found it had no second half to sing, for no one rose to answer the blood.',
    text: [
      L(w('ti'), w('nuk'), wf('lufto', 'lufton', 'fight'), p('.')),
      L(wf('kapidan', 'kapidani', 'the captain'), wf('ik', 'ikën', 'escapes'), p('.')),
      L(w('mujo'), w('nuk'), w('merr'), w('gjak'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === THE MEJDAN + THE BESA BETWEEN WARRIORS ============================
  mejdan1: {
    id: 'mejdan1',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), w('mejdan'), p('.')),
      L(wf('kapidan', 'kapidani', 'the captain'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(w('nje'), w('mejdan'), w('eshte'), wf('vetem', 'vetëm', 'alone'), p('.')),
      // the proverb of every parley before a fight: word and bullet, once out,
      // never come back
      Q('fjalë e urtë',
        wf('thote', 'thonë', 'they say'), p(':'), wf('fjale', 'fjala', 'the word'), w('dhe'), wf('plumb', 'plumbi', 'the bullet'), w('kur'), wf('dil', 'dalin', 'go out'), wf('kthehu', "s'kthehen", 'do not return'), w('me_more'), p('.')),
      L(wf('aga', 'agat', 'the agas'), wf('rri', 'rrinë', 'stand'), w('larg'), p('.')),
      when('day', L(wf('diell', 'dielli', 'the sun'), w('eshte'), w('lart'), p('.'))),
    ],
    options: [
      { text: L(w('lufto'), wf('vetem', 'vetëm', 'alone')), to: 'mejdan2', reveal: 'mejdan' },
      { text: L(w('thirr'), wf('aga', 'agat', 'the agas')), to: 'mejdanKeq' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mejdan2: {
    id: 'mejdan2',
    text: [
      L(wf('kapidan', 'kapidani', 'the captain'), w('bie'), p('.')),
      L(wf('kapidan', 'kapidani', 'the captain'), w('kerko'), wf('bese', 'besën', 'the besa'), p('.')),
      // the proverb the moment turns on: the Albanian's besa is not for sale
      Q('fjalë e urtë',
        wf('thote', 'thonë', 'they say'), p(':'), wf('bese', 'besa', 'the besa'), w('e_link'), wf('shqiptar', 'shqiptarit', 'Albanian'), w('nuk'), wf('shes', 'shitet', 'is sold'), p('.')),
      L(wf('kapidan', 'kapidani', 'the captain'), w('thote'), p(':'), w('une'), wf('premto', 'premtoj', 'swear'), w('per'), w('diell'), p(','), w('per'), w('hene'), p(','), w('per'), w('gur'), p('.')),
    ],
    options: [
      { text: L(w('jep'), wf('bese', 'besën', 'the besa')), to: 'besaVella', reveal: 'bese' },
      { text: L(w('vrit'), wf('kapidan', 'kapidanin', 'the captain')), to: 'besaThyer' },
    ],
  },

  mejdanKeq: {
    id: 'mejdanKeq',
    end: 'bad',
    title: 'The Broken Mejdan',
    blurb:
      'A mejdan is single combat — one champion against one, sacred among the kreshniks. You set the agas on a lone challenger who came to fight you fairly, and won by numbers what your own arm could not. The lahutë does not sing such a victory; the frontier remembers it only as the day Jutbina paid for a head with its honour.',
    text: [
      L(w('ti'), w('thirr'), wf('aga', 'agat', 'the agas'), p('.')),
      L(wf('aga', 'agat', 'the agas'), wf('vrit', 'vrasin', 'kill'), wf('kapidan', 'kapidanin', 'the captain'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  besaVella: {
    id: 'besaVella',
    end: 'secret',
    title: 'The Besa Between Warriors',
    blurb:
      'You beat the Krajl’s champion in fair single combat — a mejdan, the sacred one-against-one — and when he fell and asked your besa you gave it, and the man who rode out to kill you rode home alive under your word. That is the besa: the pledge sworn "by sun, moon, sky and earth, by fire, stone and thunderstone," held above life itself — the word that powers Rozafa and Constantine and the whole moral universe of the songs — and it binds even across the battle-line, turning a beaten foe into a friend. In the lived world it worked as a truce too: a village would swear a besa so blood-foes could meet as friends at a festival, and even a killer walked safe, under a day’s besa, to his victim’s funeral. To break a given word — or to win by numbers what your own arm could not — is the one thing the songs leave a name out for.',
    text: [
      L(w('ti'), w('jep'), wf('bese', 'besën', 'the besa'), p('.')),
      L(wf('kapidan', 'kapidani', 'the captain'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('mik'), p('.')),
    ],
    options: [],
  },

  besaThyer: {
    id: 'besaThyer',
    end: 'bad',
    title: 'The Besa Betrayed',
    blurb:
      'He fell, he asked your besa, and you cut him down anyway. There is no act a kreshnik holds lower than breaking the besa he has given — even to an enemy, even to a beaten one. The songs leave such a name out on purpose, so that it will be forgotten. You won the duel and threw away the one thing that made you worth singing about.',
    text: [
      L(w('ti'), w('vrit'), wf('kapidan', 'kapidanin', 'the captain'), p('.')),
      L(w('ti'), w('nuk'), w('mban'), wf('bese', 'besën', 'the besa'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  vajtimFund: {
    id: 'vajtimFund',
    end: 'secret',
    title: 'The Wail for the Dead',
    blurb:
      'You stood with the men in the gjâmë — the men-only death-wail of the Dukagjin and Gjakovë highlands, held to be as old as the Illyrians: ten men or more ranged in a line, striking their chests, raking their faces with their nails, crying the dead man’s name and deeds in one slow synchronised wail — the loudest grief a mountain man is ever allowed, the male answer to the women’s sung vajtim. To mourn rightly is itself a besa kept with the dead. You gave the fallen man his due, and the mountains carried the cry.',
    text: [
      L(w('ti'), wf('bej', 'bën', 'make'), wf('gjeme', 'gjëmën', 'the death-wail'), p('.')),
      L(w('ti'), wf('vajto', 'vajton', 'mourn'), wf('burre', 'burrin', 'the man'), p('.')),
      L(wf('burre', 'burri', 'the man'), w('rri'), w('i_art'), w('qete'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // ACT II — the river & the Zana (the mountain fairy)
  // =========================================================================
  // lumi — THE RIVER, the district hub. The dry riverbed runs from Tomorr (upstream,
  // a persistent landmark) down to the sea (downstream — the coast's address). Here:
  // the Zana, the bolla-serpent, and the old man with the rumour of buried gold.
  lumi: {
    id: 'lumi',
    text: [
      // the walk in from the crossroads
      from('udhekryq', L(w('ti'), w('vjen'), w('nga'), wf('udhekryq', 'udhëkryqi', 'crossroads'), p('.'))),
      L(wf('lume', 'lumi', 'the river'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('maja'), p(','), w('poshte'), w('eshte'), wf('det', 'deti', 'the sea'), p('.')),
      L(w('por'), w('ti'), w('sheh'), w('nje'), w('zane'), p('.')),
      L(w('nje'), w('gjarper'), w('fle'), w('ne'), wf('lume', 'lumë', 'the river'), p('.')),
      L(w('larg'), w('nje'), w('plak'), w('flet'), wf('per', 'për', 'about'), w('ar'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('liqen'), p('.')),
      L(w('poshte'), w('eshte'), w('nje'), w('ure'), w('e_art'), w('vjeter'), p('.')),
      // the "prit natën" wait pays off as an EVENT (became), then the standing
      // night line carries the hour on later visits — same for dawn
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(wf('lume', 'lumi', 'the river'), w('eshte'), w('i_art'), w('erret'), w('dhe'), w('i_art'), w('qete'), p('.'))),
      became('dawn', L(wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      when('dawn', L(w('nje'), w('drite'), w('bie'), wf('ne', 'në', 'on'), wf('lume', 'lumin', 'the river'), p('.'))),
    ],
    options: [
      { text: L(w('degjo'), wf('zane', 'zanën', 'the fairy')), to: 'zana1', reveal: 'zane' },
      { text: L(w('kerko'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'bolla1', reveal: 'gjarper' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'fshehur', reveal: 'ar' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('det')), to: 'deti1', reveal: 'det' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('liqen')), to: 'flocka1', reveal: 'liqen' },
      // downstream to the riddle bridge — the dry river's own quarter
      { text: L(w('shko'), wf('tek', 'te', 'to'), wf('ure', 'ura', 'the bridge')), to: 'ura', reveal: 'ure' },
      { text: L(w('prit'), wf('naten', 'natën', 'night')), unless: 'night', to: 'lumi', time: 'night' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  // === DITA E VERËS — the spring-new-year festival (Mar 14) =================
  veraDite1: {
    id: 'veraDite1',
    text: [
      L(w('sot'), wf('fshat', 'fshati', 'the village'), wf('bej', 'bën', 'makes'), w('nje'), w('feste'), p('.')),
      L(wf('ftohte', 'i ftohti', 'the cold'), wf('ik', 'ikën', 'goes'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), wf('kthehu', 'kthehet', 'returns'), p('.')),
      L(wf('femije', 'fëmijët', 'the children'), wf('ndiz', 'ndezin', 'light'), w('nje'), w('zjarr'), p('.')),
      L(wf('femije', 'fëmijët', 'the children'), wf('kerce', 'kërcejnë', 'leap'), w('mbi'), w('zjarr'), p('.')),
      L(wf('femije', 'fëmijët', 'the children'), wf('ha', 'hanë', 'eat'), w('ballokume'), p('.')),
      // the girls' spring rite keeps to the feast day too (→ nenaDiell1)
      L(wf('vajze', 'vajzat', 'the girls'), wf('bej', 'bëjnë', 'make'), w('nje'), w('kukull'), w('balte'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('sot'), wf('zane', 'zana', 'the fairy'), w('e_link'), wf('mal', 'malit', 'the mountain'), wf('dil', 'del', 'comes out'), p('.')),
    ],
    options: [
      { text: L(wf('bej', 'bëj', 'make'), w('nje'), w('feste')), to: 'veraDiteFund', reveal: 'feste' },
      { text: L(w('ndihmo'), wf('vajze', 'vajzat', 'the girls')), to: 'nenaDiell1', reveal: 'kukull' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('shesh')), to: 'sheshiKisha' },
    ],
  },

  veraDiteFund: {
    id: 'veraDiteFund',
    end: 'secret',
    title: 'The Day of Summer',
    blurb:
      'You kept Dita e Verës, the Day of Summer — the old spring-new-year the Albanians still hold on the fourteenth of March, the oldest feast of the pagan calendar. The children leapt the bonfires and ate the round ballokume cookie; the cold of winter went out of the land and Dielli the Sun climbed stronger into the sky; and on the holy mountain the Zana of the heights showed herself, as she does on this one day alone. Earth and Sun and fairy turn together toward the green half of the year.',
    text: [
      L(w('ti'), wf('ndiz', 'ndez', 'light'), w('nje'), w('zjarr'), w('te_link'), w('vere'), p('.')),
      L(wf('zane', 'zana', 'the Zana'), w('e_link'), wf('mal', 'malit', 'the mountain'), wf('dil', 'del', 'comes out'), p('.')),
      L(wf('vit', 'viti', 'the year'), w('eshte'), w('i_art'), w('mire'), p('.')),
    ],
    options: [],
  },

  // === THE FLOÇKA — the lake-maiden won by teaching her to speak ============
  flocka1: {
    id: 'flocka1',
    text: [
      L(w('ketu'), w('eshte'), w('nje'), w('liqen'), p('.')),
      L(wf('ne', 'në', 'in'), w('liqen'), w('eshte'), w('nje'), w('flocka'), p('.')),
      L(wf('flocka', 'floçka', 'the water-maiden'), w('ka'), w('flok'), p('.')),
      L(wf('flocka', 'floçka', 'the water-maiden'), w('nuk'), w('ka'), w('fjale'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('nje'), w('burre'), w('merr'), w('nje'), w('flocka'), wf('ne', 'në', 'to'), w('shtepi'), p('.'), w('kur'), wf('bese', 'besa', 'the oath'), wf('vdes', 'vdes', 'dies'), p(','), wf('flocka', 'floçka', 'the water-maiden'), wf('kthehu', 'kthehet', 'returns'), wf('ne', 'në', 'to'), w('uje'), p('.')),
      when('night', L(w('naten'), wf('hene', 'hëna', 'the moon'), w('eshte'), wf('ne', 'në', 'in'), w('uje'), p('.'))),
      when('dawn', L(w('eshte'), w('agim'), p(','), wf('liqen', 'liqeni', 'the lake'), w('eshte'), w('i_art'), w('qete'), p('.'))),
    ],
    options: [
      { text: L(w('meso'), wf('flocka', 'floçkën', 'the water-maiden'), w('fjale')), to: 'flockaFund', reveal: 'flocka' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  flockaFund: {
    id: 'flockaFund',
    end: 'secret',
    title: 'The Maiden of the Lake',
    blurb:
      'In the lakes and the hidden mountain tarns, the old people say, live the Floçka — water-maidens named for their long flowing hair, who do not know human speech until a mortal teaches it to them. You sat on the shore of Lake Shkodra, the wide water below Rozafa\'s castle where the Shkodër country has always set these tales, and taught her your words, one by one, until she could answer. In the old tales a Floçka is caught and kept by a man, bound to his house by a besa and silent for years, and the day the oath is broken she takes back what bound her and slips beneath the water again. You bound her with nothing — you only gave her speech — and so she helped you freely and went as she came. Of all the powers in these mountains, she is the one you win not by the sword but by a word.',
    text: [
      L(w('ti'), wf('meso', 'mëson', 'teach'), wf('flocka', 'floçkën', 'the water-maiden'), p('.')),
      L(wf('flocka', 'floçka', 'the water-maiden'), w('flet'), p('.')),
      L(wf('flocka', 'floçka', 'the water-maiden'), w('te_obj'), wf('ndihmo', 'ndihmon', 'helps'), p('.')),
    ],
    options: [],
  },

  // deti1 — THE COAST, hub of the SEA district (the third cosmic Beauty's realm).
  // Two ways in: the shore village (the Baloz / Gjergj Elez Alia set-piece) and the
  // DEEP — dive to the sea-floor palace of e Bukura e Detit (beauty, danger, mystery).
  // Her palace, named here as a landmark/lure, pulls the player down.
  deti1: {
    id: 'deti1',
    text: [
      // surfacing from the deep is its own arrival
      from('detiThelle1', L(w('ti'), w('ngjit'), w('lart'), w('nga'), wf('uje', 'uji', 'the water'), p('.'))),
      L(wf('lume', 'lumi', 'the river'), w('vjen'), wf('ne', 'në', 'to'), w('det'), p('.')),
      L(wf('det', 'deti', 'the sea'), w('eshte'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('thelle'), p('.')),
      L(w('poshte'), wf('thote', 'thonë', 'they say'), w('rri'), w('bukura'), w('e_link'), wf('det', 'detit', 'the sea'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('bukura'), w('ka'), w('dy'), w('motra'), p(','), wf('ne', 'në', 'in'), w('toke'), w('dhe'), wf('ne', 'në', 'in'), w('qiell'), p('.')),
      L(w('nje'), w('fshat'), w('eshte'), w('ketu'), p('.')),
      // the open sky over the coast tells the hour — the moon-road at night, the
      // sun by day; nightfall itself is an event when the wait carries you into it
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(wf('hene', 'hëna', 'the moon'), w('eshte'), w('mbi'), wf('det', 'detin', 'the sea'), p('.'))),
      when('day', L(wf('diell', 'dielli', 'the sun'), w('eshte'), w('mbi'), wf('det', 'detin', 'the sea'), p('.'))),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('fshat')), to: 'bregu', reveal: 'det' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('det')), to: 'detiThelle1', reveal: 'thelle' },
      // rest on the shore until dark — the coast hub's wait-jump
      { text: L(w('prit'), wf('naten', 'natën', 'night')), unless: 'night', to: 'deti1', time: 'night' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  // THE DEEP — the descent to e Bukura e Detit's palace, guarded by the storm of the
  // Kuçedra e Detit (the sea-dragon of shipwrecks). Fight it and drown; swim past it.
  detiThelle1: {
    id: 'detiThelle1',
    text: [
      // the dive reads as a dive — but climbing back up from the palace doesn't
      notFrom('detiThelle2', L(w('ti'), w('zbrit'), wf('ne', 'në', 'to'), w('det'), p('.'))),
      from('detiThelle2', L(w('ti'), w('vjen'), w('lart'), w('nga'), wf('kala', 'kalaja', 'the castle'), p('.'))),
      L(wf('det', 'deti', 'the sea'), w('eshte'), w('i_art'), w('erret'), p('.')),
      L(w('nje'), w('kulshedra'), w('e_link'), wf('det', 'detit', 'the sea'), w('vjen'), p('.')),
      L(w('poshte'), w('eshte'), w('nje'), w('kala'), p('.')),
    ],
    options: [
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('kala')), to: 'detiThelle2', reveal: 'kala' },
      { text: L(w('lufto'), w('kulshedra')), to: 'detiStuhi', reveal: 'kulshedra' },
      { text: L(w('ngjit'), w('lart')), to: 'deti1' },
    ],
  },

  // detiThelle2 — THE PALACE, the Sea's apex: e Bukura e Detit, sister of the Earthly
  // Beauty. The folktale choice: take one strand of her golden hair (she binds to you
  // as wife) / seize her gold (greed → the Black Sea drowns you) / heed her (she frees you up).
  detiThelle2: {
    id: 'detiThelle2',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('kala'), w('ne'), w('det'), p('.')),
      L(w('ketu'), w('rri'), w('bukura'), w('e_link'), wf('det', 'detit', 'the sea'), p('.')),
      L(wf('bukura', 'bukura', 'the Beauty'), w('ka'), w('flok'), p('.')),
      L(w('ketu'), w('eshte'), w('shume'), w('ar'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('flok')), to: 'detiNuse', reveal: 'flok' },
      { text: L(w('merr'), w('ar')), to: 'detiNgrene', reveal: 'ar' },
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'detiUp', reveal: 'bukura' },
      { text: L(w('ngjit'), w('lart')), to: 'detiThelle1' },
    ],
  },

  detiNuse: {
    id: 'detiNuse',
    end: 'secret',
    title: 'The Bride of the Sea',
    blurb:
      'e Bukura e Detit — the Beauty of the Sea, sister of the Earthly and the Sky Beauties, the sea-fairy of beauty and danger and mystery, kin to all the maidens of the water. You did not seize her gold nor force her hand; you took a single strand of her golden hair, and it was the gentleness itself that won her: she rose with you out of the deep into the light. The sea yields up its Beauty only to the hand that will not grab.',
    text: [
      L(w('ti'), w('merr'), w('flok'), p('.')),
      L(wf('bukura', 'bukura', 'the Beauty'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('nuse'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  detiStuhi: {
    id: 'detiStuhi',
    end: 'bad',
    title: 'Drowned in the Storm',
    blurb:
      'The Kuçedra e Detit, the sea-dragon that brews the storms and breaks the ships, met you in its own black element — and no one fights the sea and wins. It loosed a storm, the dark water closed over your head, and the deep kept you. Some powers a wise traveller goes around, never through.',
    text: [
      L(w('ti'), w('lufto'), w('kulshedra'), p('.')),
      L(wf('det', 'deti', 'the sea'), w('te_obj'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  zana1: {
    id: 'zana1',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('eshte'), w('e_art'), w('bukur'), w('dhe'), w('e_art'), w('forte'), p('.')),
      L(wf('zane', 'zana', 'the fairy'), w('ruan'), w('uje'), p(','), w('pyll'), w('dhe'), wf('dhi', 'dhitë', 'the goats'), p('.'), w('fuqi'), w('e_link'), wf('zane', 'zanës', 'the fairy'), w('rri'), wf('ne', 'në', 'in'), w('tre'), w('dhi'), p('.')),
      when('night', L(w('naten'), wf('yll', 'yjet', 'the stars'), wf('jep', 'japin', 'give'), w('drite'), p('.'))),
      L(wf('zane', 'zana', 'the fairy'), w('thote'), p(':')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), p('.')),
      L(w('ti'), w('ke'), wf('krah', 'krahë', 'wings'), p('.')),
      L(w('ti'), w('ke'), w('nje'), w('zemer'), w('e_link'), w('ar'), p('.')),
    ],
    options: [
      { text: L(w('beso'), wf('zane', 'zanën', 'the fairy')), to: 'zanaProva', reveal: 'dragua', time: 'night' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  zanaQumesht: {
    id: 'zanaQumesht',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('jep'), w('qumesht'), p('.')),
      L(wf('qumesht', 'qumështi', 'the milk'), w('jep'), w('fuqi'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('qumesht')), grant: 'qumesht', to: 'zanaKripe' },
    ],
  },

  zanaKripe: {
    id: 'zanaKripe',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('jep'), w('kripe'), p('.')),
      // no use-hint here (bread-and-salt is the hospitality pair) — what salt
      // does to a Shtriga is learned where the witch is faced, or the hard way
      L(wf('kripe', 'kripa', 'the salt'), w('eshte'), w('per'), w('buke'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('kripe')), grant: 'kripe', to: 'zanaFole' },
    ],
  },

  rrethi: {
    id: 'rrethi',
    text: [
      L(wf('zane', 'zana', 'the fairy'), w('thote'), p(':')),
      L(w('kulshedra'), w('eshte'), w('poshte'), w('ne'), w('nje'), w('pus'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pus')), to: 'pusi', reveal: 'pus' },
      { text: L(w('ec'), w('lart')), to: 'dhia1' },
      { text: L(w('ik'), w('shpejt')), to: 'botaHumbur' },
    ],
  },

  // =========================================================================
  // ACT III — Mount Tomorr (the sky-father & the Drangue's storm)
  // =========================================================================
  // mali1 — THE MOUNTAINSIDE, the single hub of the whole massif. From here the
  // two ascents diverge: the storm side (the Drangue & the thunder-stone, up to
  // Baba Tomor & the kreshnik peak) and the pilgrim path to the holy peak (Zojz).
  // The Sun-maiden is chained on a high rock; a cave holds the Katallan; and you
  // can always descend to the crossroads. This is what ties the mountain together.
  mali1: {
    id: 'mali1',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('mal'), w('tomor'), p('.')),
      // the way in colours the scene: the climb up, the walk down, the flight out
      from('udhekryq', L(w('ti'), w('ngjit'), w('nga'), wf('udhekryq', 'udhëkryqi', 'crossroads'), p('.'))),
      from(['mali3', 'dhia1', 'qiell1'], L(w('ti'), w('zbrit'), w('nga'), w('lart'), p('.'))),
      from('katallan1', L(w('ti'), w('ik'), w('nga'), wf('shpelle', 'shpella', 'the cave'), p('.'))),
      L(wf('mal', 'mali', 'the mountain'), w('eshte'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('erret'), p('.')),
      when('night', L(w('naten'), wf('mal', 'mali', 'the mountain'), w('eshte'), w('i_art'), w('ftohte'), p('.'))),
      when('day', L(wf('diell', 'dielli', 'the sun'), w('eshte'), w('mbi'), w('maja'), p('.'))),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('maja'), w('e_art'), w('shenjte'), p('.')),
      L(wf('ne', 'në', 'on'), w('nje'), w('gur'), w('rri'), wf('shenje', 'shenja', 'the sign'), w('e_link'), w('nje'), w('kale'), w('te_link'), w('bardhe'), p('.')),
      L(w('nje'), w('shpelle'), w('eshte'), w('ketu'), p('.')),
      L(w('nje'), w('peri'), w('rri'), w('ketu'), p('.')),
      when('day', L(wf('ne', 'në', 'on'), w('mal'), w('rri'), w('nje'), w('bar'), w('i_art'), w('mire'), p(':'), w('caj'), p('.'))),
    ],
    options: [
      { text: L(w('ngjit'), wf('mal', 'malin', 'the mountain')), to: 'mali2', reveal: 'mal' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('maja')), to: 'qiell1', reveal: 'shenjte' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'katallan1', reveal: 'shpelle' },
      { text: L(w('fol'), w('me'), wf('peri', 'Perinë', 'the fairy')), to: 'peri1', reveal: 'peri' },
      // çaj mali shows itself only by daylight; one bundle at a time — sell it
      // to the trader in the dead city (shitjaCaj), then pick again
      { text: L(w('merr'), w('caj')), requires: 'day', unless: 'cajMali', grant: 'cajMali', to: 'cajMali1', reveal: 'caj' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  // The tea slope — Albania's herb-picker economy in one scene: the wild çaj
  // mali (ironwort) of the sunny heights, picked by hand, carried down to market.
  cajMali1: {
    id: 'cajMali1',
    text: [
      L(w('ti'), w('merr'), w('caj'), wf('ne', 'në', 'on'), w('mal'), p('.')),
      L(w('caj'), w('eshte'), w('bar'), w('i_art'), w('mire'), w('per'), wf('dite', 'ditë', 'days'), w('te_link'), wf('ftohte', 'ftohta', 'cold'), p('.')),
      L(wf('tregtar', 'tregtari', 'the trader'), wf('ne', 'në', 'in'), w('qytet'), wf('blej', 'blen', 'buys'), w('caj'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
    ],
  },

  mali2: {
    id: 'mali2',
    text: [
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), w('me'), w('djep'), w('dhe'), w('me'), w('gur'), p('.')),
      unless('gur', L(w('ti'), w('gjen'), w('nje'), w('gur'), w('te_link'), w('forte'), p('.'))),
    ],
    options: [
      { text: L(w('merr'), w('gur')), grant: 'gur', to: 'mali2', unless: 'gur', reveal: 'gur' },
      { text: L(w('ngjit'), w('lart')), to: 'mali3' },
    ],
  },

  mali3: {
    id: 'mali3',
    text: [
      // you only "climb up" when you actually came up; from the peak you come down
      from('mali2', L(w('ti'), w('ngjit'), w('lart'), p('.'))),
      from(['maja', 'kali1'], L(w('ti'), w('zbrit'), w('nga'), wf('maja', 'maja', 'summit'), p('.'))),
      notFrom(['mali2', 'maja', 'kali1'], L(w('ti'), w('je'), w('lart'), wf('ne', 'në', 'on'), w('mal'), p('.'))),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('nje'), w('plak'), w('te_link'), w('vjeter'), p('.')),
      L(w('nje'), w('kale'), w('rri'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'maliStuhi', reveal: 'plak' },
      { text: L(w('degjo'), wf('kale', 'kalin', 'the horse')), to: 'kali1', reveal: 'kale' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
    ],
  },

  tomor1: {
    id: 'tomor1',
    text: [
      L(w('tomor'), w('te_obj'), wf('prit', 'pret', 'waits'), p('.')),
      L(wf('shqiponje', 'shqiponjat', 'the eagles'), wf('rri', 'rrinë', 'stay'), w('me'), wf('tomor', 'Tomorin', 'Tomor'), p('.')),
      L(w('tomor'), w('thote'), p(':')),
      L(w('kulshedra'), w('eshte'), w('poshte'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), w('tomor')), to: 'tomorProva' },
    ],
  },

  tomor2: {
    id: 'tomor2',
    text: [
      L(w('tomor'), w('jep'), w('nje'), w('shpate'), p('.')),
      L(wf('shpate', 'shpata', 'the sword'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon')),
    ],
    options: [
      { text: L(w('merr'), w('shpate')), grant: 'shpate', to: 'tomorBekim' },
    ],
  },

  pusi: {
    id: 'pusi',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('pus'), w('te_link'), w('madh'), p('.')),
      L(wf('pus', 'pusi', 'the well'), wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), wf('ne', 'në', 'to'), w('nje'), w('bote'), w('te_link'), w('erret'), p('.')),
      L(w('larg'), w('rri'), w('nje'), w('dervish'), p('.')),
    ],
    options: [
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('pus')), to: 'zbritjaThelle', reveal: 'bote' },
      { text: L(w('degjo'), wf('dervish', 'dervishin', 'the dervish')), to: 'sari1', reveal: 'dervish' },
      { text: L(w('ik'), w('shpejt')), to: 'botaHumbur' },
    ],
  },

  // =========================================================================
  // ACT IV — Bota e Poshtme (the underworld)
  // =========================================================================
  bota1: {
    id: 'bota1',
    text: [
      L(wf('bote', 'bota', 'the world'), w('e_art'), w('poshte'), w('eshte'), w('e_art'), w('erret'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('dere'), w('te_link'), wf('madh', 'madhe', 'big'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('bukura'), w('e_link'), wf('toke', 'Dheut', 'the Earth'), w('rri'), w('ketu'), wf('poshte', 'poshtë', 'below'), p('.')),
    ],
    options: [
      { text: L(w('hap'), wf('dere', 'derën', 'the door')), to: 'dera', reveal: 'dere' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  bota2: {
    id: 'bota2',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('shpelle'), w('te_link'), wf('madh', 'madhe', 'big'), p('.')),
      unless('mish', L(w('ketu'), w('eshte'), w('mish'), w('dhe'), w('uje'), p('.'))),
      L(w('larg'), w('rri'), w('nje'), w('gjarper'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('mish')), grant: 'mish', to: 'bota2', unless: 'mish', reveal: 'mish' },
      { text: L(w('ec'), wf('poshte', 'poshtë', 'down')), to: 'tre1' },
      { text: L(w('kerko'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'gjarperOrigin', reveal: 'gjarper' },
    ],
  },

  // === THE SWAPPED-FOOD GATE — give the meat to the lion, the hay to the lamb ==
  porta1: {
    id: 'porta1',
    text: [
      L(w('ketu'), w('eshte'), w('nje'), w('dere'), p('.')),
      L(w('nje'), wf('luan', 'luan', 'lion'), w('dhe'), w('nje'), w('qengj'), wf('ruan', 'ruajnë', 'guard'), wf('dere', 'derën', 'the door'), p('.')),
      L(w('ketu'), w('ka'), w('mish'), w('dhe'), w('kashte'), p('.')),
      L(wf('luan', 'luani', 'lion'), w('dhe'), wf('qengj', 'qengji', 'the lamb'), w('eshte'), w('uritur'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('mish'), wf('luan', 'luanit', 'lion')), to: 'bukura1', reveal: 'luan' },
      { text: L(w('jep'), w('mish'), wf('qengj', 'qengjit', 'to the lamb')), to: 'portaVdes', reveal: 'qengj' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  portaVdes: {
    id: 'portaVdes',
    end: 'bad',
    title: 'The Hungry Lion',
    blurb:
      'At the gate to the Beauty’s chamber stood a lion and a lamb, set there to devour whoever fed them wrongly. The trick the old tale teaches is simple: give the meat to the lion and the grass to the lamb, and both, fed at last, let you pass. You gave the meat to the lamb instead; the lion stayed ravenous, and a ravenous lion at a narrow door is the end of the road. The wise traveller gives each creature the food that is truly its own.',
    text: [
      L(wf('luan', 'luani', 'lion'), w('eshte'), w('uritur'), p('.')),
      L(wf('luan', 'luani', 'lion'), w('te_obj'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  bukura1: {
    id: 'bukura1',
    text: [
      L(w('ti'), w('sheh'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('bukura'), w('eshte'), w('e_art'), w('bukur'), p('.')),
      L(w('kulshedra'), w('mban'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kush'), w('prit'), p(','), w('merr'), w('bekim'), p('.'), w('kush'), w('merr'), w('shpejt'), p(','), w('merr'), w('gur'), p('.')),
    ],
    options: [
      { text: L(w('shpeto'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'bukuraLirim' },
    ],
  },

  bukura2: {
    id: 'bukura2',
    text: [
      L(w('bukura'), w('thote'), p(':')),
      L(w('kulshedra'), w('vjen'), p('!')),
      L(w('ti'), wf('lind', 'linde', 'were born'), w('me'), w('kemishe'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), p('.')),
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), w('me'), wf('gur', 'gurë', 'stones'), w('rrufe'), p('.')),
      L(w('vetem'), w('nje'), w('dragua'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'kulshedra1' },
    ],
  },

  kulshedra1: {
    id: 'kulshedra1',
    text: [
      L(w('kulshedra'), w('ka'), w('shume'), w('koke'), p('.')),
      L(w('kulshedra'), w('ka'), w('zjarr'), p('.')),
      L(w('kulshedra'), w('ka'), w('flok'), wf('kuq', 'kuq', 'red'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('jep'), w('nje'), w('vajze'), wf('kulshedra', 'kulshedrës', 'to the she-dragon'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), requires: 'shpate', consumes: 'shpate', to: 'kulshLufte1', reveal: 'kulshedra' },
      { text: L(w('hidh'), w('gur')), requires: 'gur', consumes: 'gur', to: 'dranguasi' },
      { text: L(w('lufto'), w('me'), w('fuqi')), requires: 'qumesht', to: 'kulshLufte1' },
      { text: L(w('lufto'), w('me'), w('bekim')), requires: 'bekim', unless: 'qumesht', to: 'kulshLufte1' },
      { text: L(w('ik'), w('shpejt')), to: 'djegur' },
    ],
  },

  fitorja: {
    id: 'fitorja',
    text: [
      L(wf('kulshedra', 'kulshedra', 'the she-dragon'), w('vdes'), p('.')),
      L(w('uje'), w('vjen'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('uje')), to: 'springReturn' },
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
      { text: L(w('thirr'), wf('shqiponje', 'shqiponjën', 'the eagle')), requires: 'shqiponja', to: 'shqiponja1' },
      { text: L(w('bie'), wf('poshte', 'poshtë', 'down')), to: 'rene' },
    ],
  },

  shqiponja1: {
    id: 'shqiponja1',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('vjen'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('do'), w('mish'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('mish')), requires: 'mish', consumes: 'mish', to: 'ngjitja1', reveal: 'mish' },
      { text: L(w('pre'), w('mish')), to: 'mishiVetes', secret: true, reveal: 'mish' },
      { text: L(w('ik'), w('shpejt')), to: 'rene' },
    ],
  },

  siperfaqja: {
    id: 'siperfaqja',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('fluturo', 'fluturon', 'flies'), w('lart'), p('.')),
      L(w('ti'), w('je'), wf('lart', 'lart', 'high'), w('perseri'), p('.')),
      // the open sky again after the timeless dark below
      when('dawn', L(w('eshte'), w('agim'), p(','), wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      when('day', L(wf('diell', 'dielli', 'the sun'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      when('night', L(w('eshte'), w('naten'), p(','), wf('hene', 'hëna', 'the moon'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      L(wf('bote', 'bota', 'the world'), w('ka'), w('uje'), w('tani'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('rruge'), p('.')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'on'), w('rruge')), to: 'ktheu1', reveal: 'rruge' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('det')), to: 'bregu' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
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
      L(wf('mur', 'muri', 'the wall'), w('nuk'), w('rri'), wf('lart', 'lart', 'high'), p('.')),
      when('dawn', L(wf('ne', 'në', 'in'), w('agim'), wf('mur', 'muri', 'the wall'), w('eshte'), w('perseri'), wf('poshte', 'poshtë', 'down'), p('.'))),
      L(w('nje'), w('plak'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'kalaVllezer' },
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
      { text: L(w('ndihmo'), wf('mur', 'murin', 'the wall')), to: 'murosur', reveal: 'mur' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  // =========================================================================
  // ENDINGS
  // =========================================================================
  shtepia: {
    id: 'shtepia',
    end: 'good',
    title: 'Home Again',
    blurb:
      'You went down into the world below and did what the old songs promise of a dragua: you broke the drought. Know what it was you beat. The Kulshedra is the archetype of the dark itself — the many-headed, fire-spitting she-dragon who withholds the rain and hoards the springs, who demands a maiden to release the waters, and who began, they say, as a mere snake that no human eye saw for too many years. The water ran red, then clean, up through every well to the dying villages above. There is no crown and no king’s daughter waiting — only your own fshat, its wells brimming and its children alive. But that is the whole of it, and it is enough: for a hundred years they will sing your name at the spring.',
    text: [
      L(w('ti'), wf('vrit', 'vrate', 'killed'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), w('dhe'), wf('shpeto', 'shpëtove', 'saved'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('ti'), w('kthehu'), wf('ne', 'në', 'to'), w('fshat'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('tani'), p('.')),
      // the praise called after every feat of arms: blessed be your arm!
      Q('urimi i trimit',
        wf('thote', 'thonë', 'they say'), p(':'), wf('te_subj', 'të', 'may'), w('lumte'), wf('krah', 'krahu', 'arm'), p('!')),
    ],
    options: [],
  },

  dranguasi: {
    id: 'dranguasi',
    end: 'secret',
    title: 'The Drangue Awakens',
    blurb:
      'You hurled the thunder-stone — the kokerr rrufeje — the way the Drangue strike the Kulshedra in the storm-clouds, and lightning answered your open hand. The crowned head fell, and below you the springs the dragon had hoarded broke loose and ran red, then clear, up through the well-shafts to the parched villages above. You were born with the caul; you were born for exactly this. The rains will come now, and come again every year the dragon’s brood crawls back — for there will always be a Drangue, and now the land knows your name.',
    text: [
      L(w('ti'), wf('lind', 'linde', 'were born'), w('me'), w('kemishe'), p('.')),
      L(wf('gur', 'guri', 'the stone'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(wf('uje', 'uji', 'the water'), w('vjen'), w('perseri'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), w('te_link'), w('forte'), p('!')),
    ],
    options: [],
  },

  mishiVetes: {
    id: 'mishiVetes',
    end: 'secret',
    title: 'Flesh for the Eagle',
    blurb:
      'There was no meat left, and the eagle would not fly without it — so you drew your knife across your own thigh and fed the great bird your own flesh — the hard old bargain of the deep places, where the hero feeds the eagle piece by piece from his own leg. Wing-beat by wing-beat it bore you up the black shaft toward the daylight. You reach the living world torn and limping, but you reach it — alive, scarred, and not forgotten. Some buy their way out of the underworld with gold; you bought yours with your body.',
    text: [
      L(w('mish'), w('mbaroi'), p('.')),
      L(w('ti'), w('pre'), wf('kembe', 'këmbën', 'your leg'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('fluturo', 'fluturon', 'flies'), w('lart'), p('.')),
    ],
    options: [],
  },

  // === branch: the cavern-city hoard — the Ora in serpent form ============
  // Edith Durham, "High Albania" (Edward Arnold, 1909), p.264, ch. "The Debatable Lands —
  // Djakova": a magic cavern on the road to Prizren running miles underground, holding a
  // dead city whose bazaar is still stocked with "fruit, flesh, fish, jewels, and fair
  // raiment", guarded by ORAS in serpent-shape — touch one thing and "his torch at once
  // goes out, serpents spring up and devour him in the darkness... No man has ventured in
  // for many years." (The widely-cited "p.152" is a later print-on-demand reprint's page.)
  // An old man tells the tale; the deeper warning (thesarOra) folds in the Vitore belief
  // (a gold-laying house-serpent killed by a greedy family -> the line fails).
  // MECHANIC (Durham, faithful): the cavern is pitch dark. You must bring a TORCH (pishtar,
  // made at the forest campfire, lendina) or shpellaHyrje shows only blackness and the sole
  // way on is back out. With a torch you reach the lit bazaar (thesar2): TOUCH the gold and
  // "his torch at once goes out, serpents spring up and devour him in the darkness" (bad);
  // LEAVE it untouched and walk out alive (good); cut the guardian down -> the Vitore curse
  // (secret). Greed vs. heeding the warning -> a costed fork, not an instant prize.
  fshehur: {
    id: 'fshehur',
    text: [
      L(w('ketu'), w('rri'), w('nje'), w('plak'), w('te_link'), w('vjeter'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(wf('shpelle', 'shpella', 'the cave'), w('ka'), w('nje'), w('qytet'), w('te_link'), w('vjeter'), p('.')),
      L(wf('qytet', 'qyteti', 'the city'), w('ka'), w('nje'), w('treg'), w('dhe'), w('ar'), p('.')),
      L(w('nje'), w('gjarper'), w('ruan'), wf('ar', 'arin', 'the gold'), p('.')),
      L(w('brenda'), w('eshte'), w('erret'), p('.')),
      L(w('ti'), w('prek'), wf('ar', 'arin', 'the gold'), p(','), wf('erresire', 'errësira', 'the darkness'), w('te_obj'), w('ha'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'thesarOra', reveal: 'plak' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'shpellaHyrje', reveal: 'shpelle' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  thesarOra: {
    id: 'thesarOra',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('flet'), p(':')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('eshte'), w('nje'), w('vitore'), p('.')),
      L(wf('vitore', 'vitorja', 'the vitore'), wf('lind', 'lindi', 'laid'), w('ar'), p('.')),
      L(wf('njeri', 'njerëz', 'people'), wf('vrit', 'vranë', 'killed'), wf('vitore', 'vitoren', 'the vitore'), p('.')),
      L(wf('zjarr', 'zjarri', 'the fire'), wf('ha', 'hëngri', 'ate'), wf('shtepi', 'shtëpinë', 'the house'), p('.')),
      L(w('tani'), wf('ar', 'ari', 'the gold'), wf('vrit', 'vret', 'kills'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('brenda'), wf('jam', 'janë', 'are'), w('tre'), wf('rruge', 'rrugë', 'roads'), p('.'), w('vetem'), wf('rruge', 'rruga', 'the road'), w('edyta'), wf('shko', 'shkon', 'goes'), wf('ne', 'në', 'to'), w('qytet'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'shpellaHyrje' },
      { text: L(w('ec'), w('larg')), to: 'thesarLeave' },
    ],
  },

  // The cave mouth — pitch dark. Durham: you go down with a torch or you see nothing.
  // No torch -> the only way on is back out. The torch is made at the forest campfire (lendina).
  shpellaHyrje: {
    id: 'shpellaHyrje',
    text: [
      // the wrong (right-hand) road of the cavern riddle loops you back here;
      // walking back from the dead city, the passage delivers you out of the
      // dark at this same mouth (the only hole the cavern has to the river)
      notFrom(['shpellaRruget', 'qyteti', 'qytetiUdhetar', 'qytetiUdhetar2', 'qytetiUdhetar3', 'qytetiUdhetar4'], L(w('ti'), w('zbrit'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave'), p('.'))),
      from('shpellaRruget', L(wf('rruge', 'rruga', 'the road'), w('djathtas'), w('vjen'), w('mbrapa'), wf('tek', 'te', 'to'), wf('hyrje', 'hyrja', 'entrance'), p('.'))),
      from(['qyteti', 'qytetiUdhetar', 'qytetiUdhetar2', 'qytetiUdhetar3', 'qytetiUdhetar4'], L(w('ti'), wf('dil', 'del', 'come out'), w('nga'), wf('erresire', 'errësira', 'the darkness'), p('.'))),
      unless('pishtar', L(w('brenda'), w('eshte'), w('erret'), p('.'))),
      unless('pishtar', L(w('ti'), w('nuk'), w('sheh'), p('.'))),
      when('pishtar', L(wf('pishtar', 'pishtari', 'the torch'), w('jep'), w('drite'), p('.'))),
      when('pishtar', L(w('ti'), w('sheh'), w('nje'), w('qytet'), w('te_link'), w('vjeter'), p('.'))),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('qytet')), requires: 'pishtar', to: 'shpellaRruget', reveal: 'qytet' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  // === COMPREHENSION RIDDLE: the three roads of the cavern — the old man said
  // "only the SECOND road" (rruga e dyta); here the roads are named only by
  // position, so the player must map e dyta → the one in the middle. Wrong → lost.
  shpellaRruget: {
    id: 'shpellaRruget',
    text: [
      L(w('tre'), wf('rruge', 'rrugë', 'roads'), wf('ne', 'në', 'in'), w('erresire'), p(':'), w('nje'), w('majtas'), p(','), w('nje'), wf('ne', 'në', 'in'), w('mes'), p(','), w('nje'), w('djathtas'), p('.')),
      L(wf('pishtar', 'pishtari', 'the torch'), w('jep'), w('drite'), w('pak'), p('.')),
    ],
    options: [
      { text: L(w('shko'), w('majtas')), to: 'botaHumbur' },
      { text: L(w('shko'), wf('rruge', 'rrugës', 'the road'), wf('ne', 'në', 'in'), w('mes')), to: 'qyteti' },
      { text: L(w('shko'), w('djathtas')), to: 'shpellaHyrje' },
    ],
  },

  // Exploring the dead city: no man lives here (Durham), but the bazaar still stands,
  // stocked with the finest wares. The hoard's guardian only stirs at the gold (thesar2).
  qyteti: {
    id: 'qyteti',
    text: [
      // the middle road of the cavern riddle delivers you out of the dark
      from('shpellaRruget', L(w('ti'), wf('dil', 'del', 'comes out'), w('nga'), wf('erresire', 'errësira', 'the darkness'), wf('ne', 'në', 'in'), w('qytet'), p('.'))),
      notFrom('shpellaRruget', L(w('ti'), w('ec'), wf('ne', 'në', 'in'), w('qytet'), p('.'))),
      L(w('ketu'), w('nuk'), w('rri'), w('njeri'), p('.')),
      L(w('por'), w('ketu'), w('eshte'), w('nje'), w('treg'), p('.')),
      L(wf('treg', 'tregu', 'the market'), w('ka'), w('ar'), p(','), w('mish'), p(','), w('peshk'), p(','), wf('peme', 'pemë', 'fruit'), w('dhe'), wf('rrobe', 'rroba', 'clothes'), p('.')),
      L(w('por'), w('sot'), w('nje'), w('udhetar'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'qytetiUdhetar', reveal: 'udhetar' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('treg', 'tregun', 'the market')), to: 'thesar2', reveal: 'treg' },
      { text: L(w('ec'), w('ne'), w('qytet')), to: 'sheshi' },
      // the way back to the river is the miles-long passage you came in by —
      // you emerge at the cave MOUTH on the bank (shpellaHyrje), not upstream
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'shpellaHyrje' },
    ],
  },

  // A traveller passing through the dead city — a flavour vignette (talk-and-
  // return) carrying the everyday 151-200 words: greeting, asking your errand,
  // offering to guide you on toward the sea. No ending, no folktale weight.
  qytetiUdhetar: {
    id: 'qytetiUdhetar',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':')),
      L(w('hajde'), p('!')),
      L(w('une'), wf('vjen', 'vij', 'come'), w('prej'), w('nje'), w('vend'), w('larg'), p('.')),
      L(w('cka'), wf('kerko', 'kerkon', 'seek'), w('ti'), p('?')),
      L(w('une'), wf('ka', 'kam', 'have'), w('nevoje'), w('per'), w('pune'), p('.')),
      L(w('mua'), w('pelqen'), wf('vend', 'vendi', 'the place'), p('.')),
      L(w('une'), wf('merr', 'marr', 'take'), wf('rruge', 'rrugën', 'the road'), p('.')),
      L(w('ti'), w('duhet'), w('te_subj'), wf('jam', 'jesh', 'be'), w('gati'), p('.')),
      L(w('epo'), p(','), w('ti'), w('je'), w('gati'), p('?')),
      L(w('une'), wf('sheh', 'shoh', 'see'), w('mire'), p(','), w('vertet'), p('.')),
      L(w('thjesht'), w('ec'), w('me'), w('mua'), p('.')),
      L(w('aq'), w('larg'), w('eshte'), wf('det', 'deti', 'the sea'), p('.')),
      L(w('sigurisht'), p(','), wf('rruge', 'rruga', 'the road'), w('eshte'), w('drejte'), p('.')),
      L(wf('vend', 'vendi', 'the place'), w('yt'), w('eshte'), w('larg'), p('?')),
      L(w('cka'), w('eshte'), wf('pune', 'puna', 'the work'), wf('yt', 'jote', 'your'), p('?')),
      L(w('atehere'), p(','), w('cka'), wf('bej', 'bëjmë', 'do'), w('ne_we'), p('?')),
      L(w('cfare'), w('do_fut'), w('te_subj'), wf('bej', 'bësh', 'do'), p('?')),
      L(w('mik'), w('i_art'), w('dashur'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'qytetiUdhetar2' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'shpellaHyrje' },
    ],
  },

  qytetiUdhetar2: {
    id: 'qytetiUdhetar2',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':')),
      L(w('une'), wf('fol', 'flas', 'speak'), w('mire'), p('.')),
      L(w('une'), w('kuptoj'), w('ti'), p('.')),
      L(w('cili'), w('vend'), p('?')),
      L(w('nuk'), w('eshte'), w('problem'), p('.')),
      L(w('une'), w('di'), w('nje'), w('menyre'), p('.')),
      L(w('ndonjehere'), w('une'), wf('vjen', 'vij', 'come'), w('ketu'), p('.')),
      L(w('rreth'), wf('det', 'detit', 'the sea'), w('fare'), w('nuk'), wf('ka', 'ka', 'has'), w('njeri'), p('.')),
      L(w('ju'), wf('di', 'dini', 'know'), wf('rruge', 'rrugën', 'the road'), p('?')),
      L(w('ti'), w('deshiron'), w('te_subj'), wf('shko', 'shkosh', 'go'), p('?')),
      L(w('une'), wf('gjen', 'gjej', 'find'), wf('rruge', 'rrugën', 'the road'), p('.')),
      L(w('une'), w('vete'), w('kuptoj'), p('.')),
      L(w('ti'), wf('ka', 'ke', 'have'), wf('para', 'paratë', 'money'), p('?')),
      L(w('pas'), w('minuta'), p(','), w('ne_we'), wf('ik', 'ikim', 'leave'), p('.')),
      L(w('cfare'), w('do_fut'), w('te_subj'), wf('thote', 'thuash', 'say'), p('?')),
      L(w('une'), wf('mund', 'mundem', 'can'), p('.')),
      L(wf('do', 'doni', 'want'), w('uje'), p('?')),
      L(wf('bej', 'bëni', 'do'), w('mire'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'qytetiUdhetar3' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'shpellaHyrje' },
    ],
  },

  qytetiUdhetar3: {
    id: 'qytetiUdhetar3',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':')),
      L(w('ti'), wf('kuptoj', 'kupton', 'understand'), p('?')),
      L(w('sic'), wf('thote', 'thashë', 'said'), p(':'), w('ne_we'), wf('ik', 'ikim', 'leave'), p('.')),
      L(w('dakord'), p('?')),
      L(w('une'), wf('jep', 'jap', 'give'), w('ti'), w('ca'), w('uje'), p('.')),
      L(wf('merr', 'merre', 'take'), p('!')),
      L(w('gjithashtu'), w('une'), wf('ka', 'kam', 'have'), w('buke'), p('.')),
      L(w('pas'), w('nje'), w('ore'), w('ne_we'), wf('shko', 'shkojmë', 'go'), p('.')),
      L(w('ne_we'), wf('fol', 'flasim', 'speak'), p('.')),
      L(wf('shiko', 'shikoni', 'look'), p('!')),
      L(w('nje'), w('gje'), w('e_link'), w('tille'), p('.')),
      L(wf('rruge', 'rruga', 'the road'), w('eshte'), w('veshtire'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), w('mend'), p('.')),
      L(w('nuk'), wf('mund', 'mund', 'can'), w('dot'), p('.')),
      L(w('une'), w('do'), w('nje'), w('pjese'), p('.')),
      L(w('ec'), w('perpara'), p('!')),
      L(w('ne_we'), wf('ka', 'kemi', 'have'), w('nje'), w('lidhje'), p('.')),
      L(w('une'), wf('bej', 'bëra', 'made'), w('nje'), w('gje'), w('mire'), p('.')),
      L(w('ti'), w('duhet'), w('te_subj'), wf('ka', 'kesh', 'have'), w('fat'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'qytetiUdhetar4' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'shpellaHyrje' },
    ],
  },

  qytetiUdhetar4: {
    id: 'qytetiUdhetar4',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':')),
      L(w('tung'), p('!')),
      L(wf('vjen', 'ejani', 'come'), p('!')),
      L(w('ulu'), p('!')),
      L(wf('prit', 'prisni', 'wait'), p('!')),
      L(w('vazhdo'), p('!')),
      L(w('ec'), w('ketej'), p('.')),
      L(w('cfare'), wf('mendoj', 'mendoni', 'think'), w('ju'), p('?')),
      L(wf('cili', 'cili', 'which'), w('lloj'), p('?')),
      L(wf('jete', 'jeta', 'life'), w('eshte'), w('e_link'), w('mire'), p('.')),
      L(w('nje'), w('muaj'), wf('ka', 'ka', 'has'), wf('kalo', 'kaluar', 'passed'), p('.')),
      L(w('nje'), w('jave'), p(','), w('kater'), wf('dite', 'ditë', 'days'), p('.')),
      L(w('une'), w('jam'), w('i_art'), w('pari'), p('.')),
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':'), w('kafe'), w('vjen'), w('perpara'), p(','), w('pas'), wf('vjen', 'vijnë', 'come'), wf('fjale', 'fjalët', 'the words'), p('.')),
      L(w('dashuri'), w('eshte'), w('e_link'), w('madh'), p('.')),
      L(wf('ka', 'ka', 'has'), w('rendesi'), p('?')),
      L(wf('cili', 'cila', 'which'), w('eshte'), w('arsye'), p('?')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'shpellaHyrje' },
    ],
  },

  // ===== SURVIVAL CORE — the living quarter of the dead city =====
  // A small square that still breathes: a market stall, an inn, a healer, a foreign
  // traveller, the old gate. Talk-and-return vignettes that teach the survival
  // vocabulary (buying, lodging, health, directions, greetings) a folktale world
  // otherwise never has occasion to use. See scripts/survivalcore.mjs.
  sheshi: {
    id: 'sheshi',
    text: [
      L(w('ti'), w('ec'), w('ne'), w('qytet'), p('.')),
      L(w('ketu'), w('rri'), w('njeri'), p('.')),
      L(w('burra'), w('dhe'), w('gra'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('tregtar'), w('shes'), w('mish'), w('dhe'), w('perime'), p('.')),
      L(w('afer'), w('eshte'), w('nje'), w('restorant'), p('.')),
      L(w('nje'), w('bujtine'), w('ka'), w('dhome'), p('.')),
      L(w('nje'), w('sherues'), w('ka'), w('bar'), p('.')),
      L(w('nje'), w('udhetar'), w('vjen'), w('prej'), w('larg'), p('.')),
      L(w('nje'), w('dere'), w('e_link'), w('madh'), w('eshte'), w('ketu'), p('.')),
      L(wf('tek', 'te', 'at'), wf('dere', 'dera', 'the door'), w('rri'), w('nje'), w('njeri'), w('pa'), w('buke'), w('dhe'), w('pa'), w('lek'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('tregtar', 'tregtarin', 'the trader')), to: 'tregtari' },
      { text: L(w('shko'), w('ne'), wf('bujtine', 'bujtinën', 'the inn')), to: 'bujtina' },
      { text: L(w('fol'), w('me'), wf('sherues', 'shëruesin', 'the healer')), to: 'sheruesi' },
      { text: L(w('fol'), w('me'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'udhetariHuaj' },
      { text: L(w('shiko'), wf('dere', 'derën', 'the door')), to: 'udhaShenja' },
      { text: L(w('jep'), w('lek')), lek: -5, to: 'lemoshaFund', reveal: 'njeri' },
      { text: L(w('kthehu'), w('ne'), w('qytet')), to: 'qyteti' },
    ],
  },

  lemoshaFund: {
    id: 'lemoshaFund',
    end: 'secret',
    title: 'Lëmosha — the Open Hand',
    blurb:
      'The man at the great door had neither bread nor lek, and you put five lek in his hand without being asked. That is lëmosha, the alms-giving that sits beside hospitality at the root of the old code: the guest is sent by God, and so is the man at your door with nothing. Dora që jep s’mbetet zbrazët, the old people say — the hand that gives is never left empty. Yours already isn’t: you gave money in Albanian and were thanked in it, and no phrasebook sells that.',
    text: [
      L(w('ti'), w('jep'), w('pese'), w('lek'), p('.')),
      L(wf('njeri', 'njeriu', 'the man'), w('thote'), p(':'), w('faleminderit'), p('!'), w('ti'), w('je'), w('nje'), w('mik'), p('.')),
    ],
    options: [],
  },

  // The market stall — buying, selling, prices, please/thanks.
  tregtari: {
    id: 'tregtari',
    text: [
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':')),
      L(w('mirmengjes'), p('!')),
      L(w('si'), w('je'), w('ti'), p('?')),
      L(w('cka'), w('do'), w('ti'), p('?')),
      L(w('une'), w('shes'), w('mish'), p(','), w('peshk'), p(','), w('perime'), p('.')),
      L(w('nje'), w('buke'), w('kushton'), w('pese'), w('lek'), p('.')),
      L(w('mish'), w('eshte'), w('shtrenjte'), p('.')),
      L(w('perime'), w('eshte'), w('lire'), p('.')),
      L(w('sa'), w('kushton'), w('nje'), w('caj'), p('?')),
      L(w('nje'), w('caj'), p(','), w('gjashte'), w('lek'), p('.')),
      L(w('nje'), w('birre'), p(','), w('tete'), w('lek'), p('.')),
      L(w('kripe'), p(','), w('tre'), w('lek'), p('.')),
      L(w('ti'), wf('blej', 'blen', 'buy'), p('?')),
      L(w('une'), w('dua'), w('para'), p('.')),
      L(w('jep'), w('dhjete'), w('lek'), p('.')),
      L(w('une'), wf('jep', 'jap', 'give'), w('kusur'), p('.')),
      L(w('faleminderit'), p('!')),
      L(w('lutem'), p(','), wf('vjen', 'eja', 'come'), w('perseri'), p('!')),
    ],
    options: [
      { text: L(w('blej'), w('buke')), lek: -5, grant: 'buke', to: 'blerjaBuke' },
      { text: L(w('blej'), w('kripe')), lek: -3, grant: 'kripe', to: 'blerjaKripe' },
      { text: L(w('shes'), w('caj')), requires: 'cajMali', consumes: 'cajMali', lek: 10, to: 'shitjaCaj' },
      { text: L(w('degjo'), wf('tregtar', 'tregtarin', 'the trader')), to: 'tregtari2' },
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  // A real purchase — five lek across the stall, a loaf in the pack. The first
  // survival transaction the game lets you actually MAKE, not just hear priced.
  blerjaBuke: {
    id: 'blerjaBuke',
    text: [
      L(w('ti'), w('jep'), w('pese'), w('lek'), w('dhe'), w('merr'), w('nje'), w('buke'), p('.')),
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':'), w('faleminderit'), p('!'), wf('vjen', 'eja', 'come'), w('perseri'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'tregtari' },
    ],
  },

  // Salt across the stall — a market staple, so the Zana's gift is never the
  // ONLY salt in the world (the game continues after every earned tale).
  blerjaKripe: {
    id: 'blerjaKripe',
    text: [
      L(w('ti'), w('jep'), w('tre'), w('lek'), w('dhe'), w('merr'), w('kripe'), p('.')),
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':'), w('faleminderit'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'tregtari' },
    ],
  },

  // Selling the mountain's tea — the picker's side of the market. The wild herb
  // of the high slopes is worth more than the brewed cup: ten lek the bundle.
  shitjaCaj: {
    id: 'shitjaCaj',
    text: [
      L(w('ti'), w('jep'), w('caj'), w('dhe'), wf('tregtar', 'tregtari', 'the trader'), w('jep'), w('dhjete'), w('lek'), p('.')),
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':'), w('caj'), w('nga'), w('mal'), w('eshte'), w('bar'), w('i_art'), w('mire'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'tregtari' },
    ],
  },

  // The trader haggles — the bigger numbers.
  tregtari2: {
    id: 'tregtari2',
    text: [
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':')),
      L(w('sa'), w('do'), w('ti'), p('?')),
      L(w('njezet'), w('lek'), p('?')),
      L(w('nje'), w('gje'), w('e_link'), w('mire'), w('kushton'), w('njeqind'), w('lek'), p('.')),
      L(w('nje'), w('kale'), w('kushton'), w('mije'), w('lek'), p('.')),
      L(w('por'), w('per'), w('ti'), p(','), w('lire'), p('!')),
      L(w('zero'), w('problem'), p('.')),
      L(w('dyqan'), w('im'), w('eshte'), w('mire'), p('.')),
      L(w('une'), w('shes'), w('edhe'), wf('rrobe', 'rroba', 'clothes'), p(':'), w('nje'), w('plis'), w('i_art'), w('bardhe'), p(','), w('nje'), w('xhublete'), p('.')),
      L(wf('dore', 'duart', 'the hands'), wf('bej', 'bëjnë', 'make'), wf('plis', 'plisin', 'the felt cap'), p('.')),
      L(wf('xhublete', 'xhubleta', 'the bell-dress'), w('eshte'), w('e_art'), wf('zi', 'zezë', 'black'), w('dhe'), w('ka'), w('diell'), p(','), w('hene'), w('dhe'), w('yll'), p('.'), w('nje'), w('vajze'), w('e_obj'), w('vesh'), w('kur'), w('behet'), w('grua'), p('.')),
      L(w('une'), w('shes'), w('edhe'), w('nje'), w('lahute'), p(':'), w('dyzet'), w('lek'), p('.')),
      L(w('faleminderit'), w('dhe'), w('mirupafshim'), p('!')),
    ],
    options: [
      { text: L(w('merr'), wf('plis', 'plisin', 'the felt cap')), to: 'plisiFund', reveal: 'plis' },
      { text: L(w('shiko'), wf('xhublete', 'xhubletën', 'the bell-dress')), to: 'xhubletaFund', reveal: 'xhublete' },
      { text: L(w('blej'), w('lahute')), lek: -40, grant: 'lahute', to: 'blerjaLahuta', reveal: 'lahute' },
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  // Forty lek for a bard's fiddle — the game's one INVESTMENT: it pays itself
  // back song by song wherever travellers rest (see kengaLahute).
  blerjaLahuta: {
    id: 'blerjaLahuta',
    text: [
      L(w('ti'), w('jep'), w('dyzet'), w('lek'), w('dhe'), w('merr'), wf('lahute', 'lahutën', 'the lute'), p('.')),
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':'), w('kendo'), w('per'), wf('trim', 'trima', 'heroes'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  plisiFund: {
    id: 'plisiFund',
    end: 'secret',
    title: 'The Plis — a White Cap Older than Rome',
    blurb:
      'The trader set the plis on your head — the brimless white skullcap felted by hand from sheep’s wool, the most iconic single piece of Albanian men’s dress, older than any of the empires that marched past it. White wool on a walker’s head — you will pass for a friend of the country now, wherever the road takes you.',
    text: [
      L(w('ti'), w('vesh'), wf('plis', 'plisin', 'the felt cap'), w('i_art'), w('bardhe'), p('.')),
      L(wf('tregtar', 'tregtari', 'the trader'), w('thote'), p(':'), w('i_art'), w('bukur'), p('!')),
    ],
    options: [],
  },

  xhubletaFund: {
    id: 'xhubletaFund',
    end: 'secret',
    title: 'The Xhubleta — the Bell of the Alps',
    blurb:
      'The trader unfolded a xhubleta — the undulating, bell-shaped dress of the northern Alps, black above all, embroidered with suns, moons, stars, eagles and serpents whose meanings are older than any church. A girl put it on at womanhood and it announced her standing ever after. You did not buy it — some things a traveller only gets to look at — but you know now what walked the mountain paths for a thousand years.',
    text: [
      L(w('ti'), w('sheh'), wf('xhublete', 'xhubletën', 'the bell-dress'), w('e_art'), w('zi'), p('.')),
      L(wf('xhublete', 'xhubleta', 'the bell-dress'), w('ka'), w('diell'), p(','), w('hene'), w('dhe'), w('yll'), p('.')),
    ],
    options: [],
  },

  // The inn — a room, a bed, a key, the evening greetings.
  bujtina: {
    id: 'bujtina',
    text: [
      // "you go to the inn" only holds walking in off the square; after coffee
      // or a night's sleep you are simply still here
      notFrom(['kafeja1', 'bujtina'], L(w('ti'), w('shko'), w('ne'), wf('bujtine', 'bujtina', 'the inn'), p('.'))),
      from(['kafeja1', 'bujtina'], L(w('ti'), w('je'), w('perseri'), w('ne'), wf('bujtine', 'bujtina', 'the inn'), p('.'))),
      L(w('nje'), w('grua'), w('thote'), p(':')),
      L(w('mirembrema'), p('!')),
      L(w('nje'), w('bujtine'), w('e_link'), w('madh'), w('eshte'), w('nje'), w('hotel'), p('.')),
      L(w('ketu'), w('eshte'), w('nje'), w('dhome'), p('.')),
      L(w('dhome'), w('ka'), w('nje'), w('shtrat'), p('.')),
      L(w('naten'), w('kushton'), w('njezet'), w('lek'), p('.')),
      L(w('ketu'), w('eshte'), w('celes'), p('.')),
      L(w('fle'), w('mire'), p('!')),
      L(w('natenmire'), p('!')),
      // the traveller's blessing, exactly as the ballad has it ("Udha e marë, o
      // krushqellarë!" — Ymer Aga) — the inn-keeper's farewell to every guest
      Q('Ymer Aga — këngë popullore',
        wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), wf('udhe', 'udha', 'the road'), w('e_art'), w('mbare'), p('!')),
      L(wf('grua', 'gruaja', 'the woman'), wf('bej', 'bën', 'makes'), w('kafe'), w('dhe'), w('ka'), w('raki'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), w('raki'), w('eshte'), w('per'), w('mik'), p('.')),
    ],
    options: [
      { text: L(w('pi'), w('kafe')), to: 'kafeja1', reveal: 'kafe' },
      { text: L(w('pi'), w('raki')), to: 'gezuarFund', reveal: 'raki' },
      // the priced bed the scene quotes ("nata kushton njëzet lek") — unlike the
      // oda's free guest-corner, an inn is trade: pay, sleep to dawn, wake whole
      { text: L(w('fle'), w('ketu')), lek: -20, time: 'dawn', hearts: 3, unless: 'dawn', to: 'gjumiBujtina', reveal: 'shtrat' },
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  // The paid night — twenty lek, a bed, a key, and the morning coffee already on.
  gjumiBujtina: {
    id: 'gjumiBujtina',
    text: [
      L(w('ti'), w('jep'), w('njezet'), w('lek'), w('dhe'), w('fle'), wf('ne', 'në', 'in'), w('nje'), w('shtrat'), p('.')),
      L(w('ti'), w('fle'), w('mire'), p('.')),
      L(w('tani'), w('eshte'), w('agim'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), wf('bej', 'bën', 'makes'), w('kafe'), p('.')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  // === KAFEJA — coffee, the cup-reading, and the raki toast at the inn ========
  kafeja1: {
    id: 'kafeja1',
    text: [
      L(wf('grua', 'gruaja', 'the woman'), wf('bej', 'bën', 'makes'), w('nje'), w('kafe'), w('e_art'), wf('vogel', 'vogël', 'small'), p('.')),
      L(wf('kafe', 'kafeja', 'the coffee'), w('vjen'), w('me'), w('uje'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), w('pi'), w('ngadale'), p('.')),
      L(w('une'), wf('sheh', 'shoh', 'see'), w('fat'), wf('ne', 'në', 'in'), w('kafe'), p('.')),
    ],
    options: [
      { text: L(w('pi'), wf('kafe', 'kafen', 'the coffee')), to: 'kafejaFund', reveal: 'kafe' },
      { text: L(w('degjo'), wf('grua', 'gruan', 'the woman')), to: 'fallFund', reveal: 'fat' },
      { text: L(w('kthehu')), to: 'bujtina' },
    ],
  },

  kafejaFund: {
    id: 'kafejaFund',
    end: 'secret',
    title: 'Kafeja — the Slow Cup',
    blurb:
      'The woman of the inn made you kafe turke — ground fine, boiled slow in the little copper xhezve, served small and strong with a glass of water on the side — and you drank it the only correct way: avash-avash, slowly, slowly, in no hurry at all. Coffee is the social ritual of Albanian life; a single cup can anchor a whole afternoon of friends, business and gossip, and to set one before a guest is as much a part of the welcome as bread and salt. You did not just drink a coffee. You kept somebody company.',
    text: [
      L(w('ti'), w('pi'), wf('kafe', 'kafen', 'the coffee'), w('ngadale'), p('.')),
      L(w('ti'), w('flet'), w('dhe'), w('rri'), p('.')),
    ],
    options: [],
  },

  fallFund: {
    id: 'fallFund',
    end: 'secret',
    title: 'Fall — the Fortune in the Cup',
    blurb:
      'When the cup was done the woman turned it over on the saucer to cool, righted it, and read your fortune in the shapes the grounds had left — love in one quarter of the cup, the far future in another, all of it told half-laughing, the way the fall is always told. Reading the coffee is a routine, sociable little magic done by women of every background, kept up even where belief has gone loose; Tuesday and Friday are its lucky days, and Sunday is left alone. "A guest is coming down your road," she said. She was right before she said it — you had already come down hers.',
    text: [
      L(wf('grua', 'gruaja', 'the woman'), w('sheh'), wf('ne', 'në', 'in'), wf('kafe', 'kafen', 'the coffee'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), w('nje'), w('mik'), w('vjen'), w('per'), w('ti'), p('.')),
    ],
    options: [],
  },

  gezuarFund: {
    id: 'gezuarFund',
    end: 'secret',
    title: 'Gëzuar! — the Raki of Welcome',
    blurb:
      'The woman set out the little glass of raki — the home-distilled grape spirit that is the drink of welcome, of celebration and of mourning alike — and you met her eye and answered the only right way: Gëzuar! To offer raki is to offer trust. In the north the coffee and the raki arrive together, and nobody thinks that strange. You drank to the house, and the house drank to you.',
    text: [
      L(wf('grua', 'gruaja', 'the woman'), w('jep'), w('raki'), w('dhe'), w('thote'), p(':'), w('gezuar'), p('!')),
      L(w('ti'), w('thote'), p(':'), w('gezuar'), p('!')),
    ],
    options: [],
  },

  // The healer — sick, pain, herbs, help. No modern hospital in a folktale world.
  sheruesi: {
    id: 'sheruesi',
    text: [
      L(wf('sherues', 'shëruesi', 'the healer'), w('thote'), p(':')),
      L(w('mirdita'), p('!')),
      L(w('ti'), w('je'), w('semur'), p('?')),
      L(w('ku'), w('eshte'), w('dhimbje'), p('?')),
      L(w('ketu'), w('eshte'), w('bar'), p('.')),
      L(w('bar'), w('eshte'), w('mire'), w('per'), w('ti'), p('.')),
      L(w('bar'), w('kushton'), w('dhjete'), w('lek'), p('.')),
      L(w('nje'), w('mjek'), w('ne'), w('qytet'), w('nuk'), w('eshte'), p('.')),
      L(w('une'), wf('ndihmo', 'ndihmoj', 'help'), w('ti'), p('.')),
      L(w('ti'), wf('behet', 'bëhesh', 'become'), w('mire'), p('!')),
      // the healer's blessing over every cure: may you live to a hundred!
      Q('urim i moçëm',
        wf('sherues', 'shëruesi', 'the healer'), w('thote'), p(':'), wf('behet', 'u bëfsh', 'may you become'), w('njeqind'), w('vjec'), p('!')),
      L(wf('sherues', 'shëruesi', 'the healer'), w('di'), wf('shenje', 'shenja', 'signs'), p('.')),
      L(w('kur'), wf('dore', 'dora', 'the hand'), w('te_obj'), w('ha'), p(','), w('vjen'), wf('para', 'para', 'money'), p('.')),
      L(w('kur'), wf('thike', 'thika', 'the knife'), w('bie'), p(','), w('vjen'), w('nje'), w('burre'), p('.')),
      L(w('kur'), wf('luge', 'luga', 'the spoon'), w('bie'), p(','), w('vjen'), w('nje'), w('grua'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('bar')), lek: -10, hearts: 3, to: 'sherimiBar' },
      { text: L(w('degjo'), wf('sherues', 'shëruesin', 'the healer')), to: 'besimeFund', reveal: 'shenje' },
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  // Ten lek for the healer's herbs — the folktale world's clinic visit: the cure
  // is a brew of the same mountain tea the slopes grow (see cajMali1).
  sherimiBar: {
    id: 'sherimiBar',
    text: [
      L(w('ti'), w('jep'), w('dhjete'), w('lek'), p('.')),
      L(wf('sherues', 'shëruesi', 'the healer'), w('jep'), w('bar'), w('dhe'), w('caj'), p('.')),
      L(w('ti'), w('pi'), w('dhe'), wf('behet', 'bëhesh', 'become'), w('mire'), p('.')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  besimeFund: {
    id: 'besimeFund',
    end: 'secret',
    title: 'Shenjat — What the Kitchen Mutters',
    blurb:
      'The healer talked signs while the herbs steeped, and every one is still said reflexively in Albanian houses: an itching palm means money on the move; a dropped knife brings a male guest, and a dropped spoon a female one. There are dozens more where those came from, and all of them are genuinely still said. You now know what the kitchen is muttering about.',
    text: [
      L(w('ti'), w('di'), wf('shenje', 'shenjat', 'the signs'), p('.')),
      L(w('kur'), wf('thike', 'thika', 'the knife'), w('bie'), p(','), w('nje'), w('mik'), w('vjen'), p('.')),
    ],
    options: [],
  },

  // The foreign traveller — controlling language ("I don't understand", "speak
  // slowly", "how is it said", "what does it mean") and talking about yourself.
  udhetariHuaj: {
    id: 'udhetariHuaj',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':')),
      L(w('mirmengjes'), p('!')),
      L(w('une'), w('nuk'), w('kuptoj'), p('.')),
      L(w('fol'), w('ngadale'), p(','), w('lutem'), p('.')),
      L(w('perserit'), p(','), w('lutem'), p('.')),
      L(w('si'), wf('thote', 'thuhet', 'is said'), p('?')),
      L(w('cfare'), w('do_fut'), w('te_subj'), wf('thote', 'thotë', 'means'), p('?')),
      L(w('une'), w('nuk'), w('di'), p('.')),
      L(w('une'), w('quhem'), w('udhetar'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), w('nje'), w('familje'), p('.')),
      L(w('une'), w('jam'), w('njezet'), w('vjec'), p('.')),
      L(w('une'), wf('shko', 'shkoj', 'go'), wf('ne', 'në', 'to'), w('kurbet'), p(':'), w('pune'), w('larg'), p('.')),
      L(w('nje'), w('dite'), w('une'), wf('kthehu', 'kthehem', 'return'), p('.')),
      L(w('faleminderit'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'kurbetiFund', reveal: 'kurbet' },
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  kurbetiFund: {
    id: 'kurbetiFund',
    end: 'secret',
    title: 'Kurbeti — Work Far Away, Heart at Home',
    blurb:
      'The young traveller is going where so many have gone before him: në kurbet — out into the world for work, while the family stays behind. The kurbet is centuries old and has a whole songbook of its own, songs of the road, of longing, of the mother waiting at the gate — and it is not history — the roads still lead out, the money still comes home, and the songs are still being lived. He told you he will come back one day. They all say it — and a remarkable number of them mean it.',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), wf('shko', 'shkon', 'goes'), w('larg'), w('per'), w('pune'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('e_link'), w('tij'), w('rri'), w('dhe'), wf('prit', 'pret', 'waits'), p('.')),
    ],
    options: [],
  },

  // The old gate — directions and the signs on the door.
  udhaShenja: {
    id: 'udhaShenja',
    text: [
      L(w('ti'), w('shiko'), wf('dere', 'derën', 'the door'), p('.')),
      L(w('nje'), w('polici'), w('ruan'), wf('dere', 'derën', 'the door'), p('.')),
      L(wf('polici', 'policia', 'the guard'), w('thote'), p(':')),
      L(w('ketu'), w('eshte'), w('hyrje'), p('.')),
      L(w('atje'), w('eshte'), w('dalje'), p('.')),
      L(wf('dere', 'dera', 'the door'), w('eshte'), w('mbyllur'), p('.')),
      L(w('ndalohet'), p('!')),
      L(w('per'), w('brenda'), p(','), w('shtyj'), p('.')),
      L(w('per'), w('jashte'), p(','), w('terheq'), p('.')),
      L(w('per'), wf('rruge', 'rrugën', 'the road'), p(','), w('jep'), w('nje'), w('bilete'), p('.')),
      L(w('ku'), w('eshte'), w('det'), p('?')),
      L(w('majtas'), w('eshte'), w('mal'), p('.')),
      L(w('djathtas'), w('eshte'), w('det'), p('.')),
      L(w('nje'), w('harte'), w('ka'), wf('rruge', 'rrugët', 'the roads'), p('.')),
      L(w('afer'), w('eshte'), wf('bujtine', 'bujtina', 'the inn'), p('.')),
      L(w('faleminderit'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'sheshi' },
    ],
  },

  // The lit bazaar of the dead city (reachable only WITH a torch). The Ora-serpent guards
  // the hoard. Touch one thing -> the torch dies, you are devoured (Durham). Leave it
  // untouched -> you walk out alive (good). Cut the guardian down with a sword -> the
  // Vitore-curse (secret).
  thesar2: {
    id: 'thesar2',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), wf('treg', 'tregun', 'the market'), p('.')),
      L(w('ketu'), w('eshte'), w('ar'), p('.')),
      L(w('nje'), w('gjarper'), w('i_art'), w('madh'), w('ruan'), wf('ar', 'arin', 'the gold'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('eshte'), w('nje'), w('ora'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kush'), w('prek'), wf('ar', 'arin', 'the gold'), p(','), wf('drite', 'drita', 'the light'), wf('vdes', 'vdes', 'dies'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kush'), wf('vrit', 'vret', 'kills'), w('nje'), w('gjarper'), w('e_link'), wf('shtepi', 'shtëpisë', 'of the house'), p(','), w('nuk'), w('ka'), w('fat'), p('.')),
    ],
    options: [
      { text: L(w('prek'), wf('ar', 'arin', 'the gold')), to: 'gjarperNgrene', reveal: 'ar' },
      { text: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), requires: 'shpate', consumes: 'shpate', to: 'gjarperVrare', reveal: 'gjarper' },
      { text: L(w('dil'), w('jashte')), to: 'thesarKthyer' },
    ],
  },

  thesarKthyer: {
    id: 'thesarKthyer',
    end: 'good',
    title: 'The Untouched Bazaar',
    blurb:
      'Your torch lit the whole heaped bazaar of the dead city — gold, jewels, fair raiment laid out just as in Durham’s telling of the Gjakova cavern — and you did not lay a hand on one single thing. So the flame stayed bright, the coiled Orë let you pass, and you climbed back into the daylight with empty hands and your life still your own. They say no man has ever carried so much as a coin out of that cavern; the wise are the ones who walk out exactly as they came in. (Edith Durham, High Albania, 1909.)',
    text: [
      L(w('ti'), w('dil'), w('nga'), wf('treg', 'tregun', 'the market'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('rri'), w('i_art'), w('qete'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  gjarperVrare: {
    id: 'gjarperVrare',
    end: 'secret',
    title: 'The Serpent’s Hoard',
    blurb:
      'You cut down the guardian serpent and the gold of the dead city was yours — but a hoard-serpent is an Ora in beast-shape, set over the treasure to watch it, and gold taken over her body never comes clean. The old people tell the same doom of the vitore, the golden house-snake that dwells in a house’s walls and lays its luck coin by coin: a greedy family killed theirs once, to seize the gold at a stroke — their house burned and their line failed, and now their doom was yours. You dug your hundred wells and the village drank — yet the water ran brackish, the cattle sickened, and at night a cold hiss followed you. Some serpents are not for killing.',
    text: [
      L(wf('shpate', 'shpata', 'the sword'), wf('vrit', 'vret', 'kills'), wf('gjarper', 'gjarprin', 'the serpent'), p('.')),
      L(w('ti'), w('ke'), w('thesar'), p('.')),
      L(w('por'), wf('uje', 'uji', 'the water'), w('behet'), w('i_art'), w('keq'), p('.')),
      L(w('naten'), w('ti'), wf('degjo', 'dëgjon', 'hear'), w('nje'), w('gjarper'), p('.')),
    ],
    options: [],
  },

  gjarperNgrene: {
    id: 'gjarperNgrene',
    end: 'bad',
    title: 'Greed in the Dark',
    blurb:
      'You reached out and closed your hand on the gold — and it happened exactly as the old man warned. Your torch went out as though a fist had shut on the flame, and in the blind dark the heaped bazaar woke: the Orë of the dead city, no true serpents but spirits in serpent-shape, sprang up and devoured you where you stood. In Durham’s Gjakova they say no man who ever touched one single thing came back out of the cavern. Now you are one of them.',
    text: [
      L(w('ti'), w('prek'), wf('ar', 'arin', 'the gold'), p('.')),
      L(wf('pishtar', 'pishtari', 'the torch'), wf('ik', 'ikën', 'goes out'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('te_obj'), w('ha'), wf('ne', 'në', 'in'), wf('erresire', 'errësirë', 'darkness'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  murosur: {
    id: 'murosur',
    end: 'bad',
    title: 'Walled in Rozafa',
    blurb: 'To make the castle stand, a mother was sealed in the wall — one breast left out to nurse her child — and to this day a white trace runs down the stone where her milk still flows. The besa was kept; the price was cruel.',
    text: [
      L(wf('mur', 'muri', 'the wall'), w('merr'), w('nje'), w('nene'), p('.')),
      // the walled mother's plea, as the song of Rozafa keeps it: leave my right
      // breast out (to nurse the child)
      Q('kënga e Rozafës',
        wf('nene', 'nëna', 'the mother'), w('thote'), p(':'), wf('gji', 'gjirin', 'the breast'), w('e_art'), w('djathte'), w('ma'), wf('le', 'lini', 'leave'), w('jashte'), p('.')),
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
      // only the leap down the well is a FALL; climbers and fleers arrive on their feet
      from('pusi2', L(w('ti'), w('bie'), wf('poshte', 'poshtë', 'down'), p('.'))),
      from('ngjitja1', L(w('ti'), w('zbrit'), w('mbrapa'), wf('poshte', 'poshtë', 'down'), p('.'))),
      L(w('ti'), w('je'), w('ne'), w('nje'), w('det'), w('te_link'), w('erret'), p('.')),
      L(w('bukura'), w('e_link'), wf('det', 'Detit', 'the sea'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'detiUp' },
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('det')), to: 'detiNgrene', reveal: 'det' },
    ],
  },

  detiUp: {
    id: 'detiUp',
    end: 'good',
    title: 'The Beauty of the Sea',
    blurb:
      'At the bottom of the black water you found Bukura e Detit, the Beauty of the Sea, and she bore you up through the dark to the light and set you again upon the living earth. You did not climb out a conqueror — the eagle’s road was never yours — but you came up alive, and the springs the Kulshedra once hoarded were already running green through the valleys above. Some heroes are carried home by the deep itself; the sea, this once, was merciful.',
    text: [
      L(w('bukura'), w('te_obj'), wf('ndihmo', 'ndihmon', 'helps'), p('.')),
      L(w('ti'), w('je'), wf('lart', 'lart', 'high'), w('perseri'), p('.')),
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
      L(wf('det', 'deti', 'the sea'), w('te_obj'), w('ha'), p('.')),
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
      L(wf('ora', 'Ora', 'the spirit'), w('eshte'), w('nje'), w('nga'), w('tre'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('nje'), w('njeri'), w('ka'), w('nje'), w('ora'), w('per'), w('gjithe'), wf('jete', 'jetën', 'the life'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('ora', 'Orës', 'to the Ora')), requires: 'buke', consumes: 'buke', to: 'oraBardhe' },
      { text: L(w('jep'), w('kripe'), wf('ora', 'Orës', 'to the Ora')), requires: 'kripe', consumes: 'kripe', to: 'oraBardhe' },
      { text: L(w('degjo'), wf('ora', 'Orën', 'the spirit')), to: 'oraVerdhe' },
      { text: L(w('ik'), wf('ne', 'në', 'to'), w('erresire')), to: 'oraZeze', reveal: 'erresire' },
    ],
  },

  oraBardhe: {
    id: 'oraBardhe',
    end: 'good',
    title: 'Led Home by your Ora',
    blurb:
      'Lost in the dark, you met your own — for every Albanian is born with an Ora, a fate-spirit assigned for life, a personal fortune-keeper who may walk as a bird, a beast, a woman or a serpent. Yours came as e Bardha, the White, the one who deals out good luck, and she led you out of the dark and home, alive. The old people say a man rarely sees his Ora even once — but she sees him all his days.',
    text: [
      L(wf('ora', 'Ora', 'the spirit'), w('te_obj'), wf('ndihmo', 'ndihmon', 'helps'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  oraZeze: {
    id: 'oraZeze',
    end: 'bad',
    title: 'The Black Ora',
    blurb:
      'You fled the light, deeper into the dark. There are three Fates; the one that found you there was e Zeza, the Black — the Fate who decides death.',
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
    blurb:
      'A starving wolf is all teeth, and the only thing that gentles it is bread — shared, not withheld. With a loaf in hand you might have won a companion instead of a grave; with empty hands, your legs would have served you better than your fists. You chose to fight, and a hungry wolf does not lose. The songs are older and crueller than the village tells.',
    text: [
      unless('buke', L(w('ti'), w('lufto'), wf('ujk', 'ujkun', 'the wolf'), p('.'))),
      when('buke', L(w('ti'), w('nuk'), w('jep'), w('buke'), wf('ujk', 'ujkut', 'to the wolf'), p('.'))),
      L(wf('ujk', 'ujku', 'the wolf'), w('te_obj'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === the deep forest (where fleeing sends you) ==========================
  // pylliLoop — THE DEEP FOREST, the wild district's hub, past the clearing where
  // the path ends. Tomorr's holy peak shows far above the trees (a persistent
  // landmark, glimpsed from many districts). Wander deeper and get lost, seek the
  // cave / the fox / the dance / the brothers — or walk back to the road-end
  // clearing (your camp: the fire and the sleeping-ground live THERE, not here)
  // or across to the brothers' glade (pylli1). The deep wood touches no road:
  // the crossroads is a whole forest away (its road ends at pylli1, the edge).
  pylliLoop: {
    id: 'pylliLoop',
    text: [
      // from the clearing you push past the road's end into the deep wood
      from('lendina', L(w('ti'), w('ec'), w('thelle'), wf('ne', 'në', 'in'), w('pyll'), p('.'))),
      notFrom('lendina', L(w('ti'), w('je'), w('perseri'), w('ne'), w('pyll'), p('.'))),
      when('night', L(w('eshte'), w('erret'), w('dhe'), w('ftohte'), p('.'))),
      unless('night', L(wf('pyll', 'pylli', 'the forest'), w('eshte'), w('i_art'), w('qete'), p('.'))),
      L(wf('lart', 'lart', 'high'), w('larg'), w('eshte'), w('maja'), w('e_art'), w('shenjte'), p('.')),
      // the moon-dancers' ring turns only in the dark
      when('night', L(w('naten'), wf('degjo', 'dëgjon', 'you hear'), w('nje'), w('valle'), p('.'))),
      when('night', L(wf('thote', 'thonë', 'they say'), p(':'), w('kush'), wf('hyr', 'hyn', 'enters'), wf('ne', 'në', 'in'), w('valle'), p(','), w('nuk'), wf('dil', 'del', 'comes out'), p('.'))),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('nje'), w('ora'), w('ec'), wf('ne', 'në', 'in'), w('pyll'), p(','), wf('si', 'si', 'as'), w('zog'), p(','), wf('si', 'si', 'as'), w('kafshe'), p(','), w('ose'), wf('si', 'si', 'as'), w('plake'), p('.')),
      // …and in the dead of night you may SEE her: the cold old woman of the
      // wood (npcs.js plakaPyllit) walking back from the road-end fire
      when('npc:plakaPyllit', L(w('nje'), w('plake'), w('e_art'), w('ftohte'), w('ec'), w('ne'), w('erresire'), p('.'))),
      L(w('larg'), w('nje'), wf('shpelle', 'shpellë', 'cave'), w('nxjerr'), w('zjarr'), p('.')),
      L(w('nje'), w('dhelpra'), w('dhe'), w('nje'), w('ujk'), wf('ka', 'kanë', 'have'), w('gjalpe'), p('.')),
      L(w('larg'), wf('rri', 'rrinë', 'stay'), w('tre'), wf('vella', 'vëllezër', 'brothers'), p('.')),
    ],
    options: [
      // back to the road-end clearing — the camp: while your fire burns there it
      // calls you home by name, otherwise you walk back to the road
      { text: L(w('kthehu'), w('tek'), wf('zjarr', 'zjarri', 'the fire')), requires: 'fireLive', to: 'lendina' },
      { text: L(w('kthehu'), w('tek'), wf('rruge', 'rruga', 'the road')), unless: 'fireLive', to: 'lendina' },
      // across the clearings to the brothers' camp — the forest circle runs both ways
      { text: L(w('shko'), wf('tek', 'te', 'to'), wf('vella', 'vëllezërit', 'the brothers')), to: 'pylli1', reveal: 'vella' },
      { text: L(w('ec'), w('ne'), w('valle')), requires: 'night', to: 'shtojzovalle1', reveal: 'valle' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('shpelle')), to: 'stihi1', reveal: 'shpelle' },
      { text: L(w('sheh'), wf('dhelpra', 'dhelprën', 'the fox')), to: 'dhelpra1', reveal: 'dhelpra' },
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'humbur', reveal: 'pyll' },
    ],
  },

  // =========================================================================
  // THE SHTOJZOVALLE — the moon-dancers ("may God increase their dance"): airy,
  // half-unseen forest fairies who sing and turn in a moonlit ring and spin the
  // thread of human life. The dance enchants to your doom; their tears are death;
  // a maiden is kept only by the gift of clothes. The moral: HONOUR, don't seize.
  // =========================================================================
  shtojzovalle1: {
    id: 'shtojzovalle1',
    text: [
      L(w('eshte'), w('naten'), w('dhe'), wf('hene', 'hëna', 'the moon'), w('eshte'), w('lart'), p('.')),
      L(w('ketu'), wf('shtojzovalle', 'shtojzovallet', 'the moon-dancers'), wf('bej', 'bëjnë', 'make'), w('nje'), w('valle'), p('.')),
      L(wf('shtojzovalle', 'shtojzovallet', 'the moon-dancers'), wf('kendo', 'këndojnë', 'sing'), p('.')),
      L(w('valle'), w('eshte'), w('e_art'), w('bukur'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('shtojzovalle', 'shtojzovallet', 'the moon-dancers'), wf('mban', 'mbajnë', 'hold'), w('fat'), w('e_link'), wf('njeri', 'njeriut', 'a man'), p('.')),
    ],
    options: [
      { text: L(w('sheh'), w('valle')), to: 'shtojzovalle2', reveal: 'shtojzovalle' },
      { text: L(w('hyr'), w('ne'), w('valle')), to: 'shtojzovalleVallja', reveal: 'valle' },
      { text: L(w('ik'), w('ngadale')), to: 'pylliLoop' },
    ],
  },

  shtojzovalle2: {
    id: 'shtojzovalle2',
    text: [
      L(w('ti'), w('sheh'), wf('shtojzovalle', 'shtojzovallet', 'the moon-dancers'), p('.')),
      L(w('nje'), w('vajze'), w('eshte'), w('e_art'), w('bukur'), p('.')),
      L(w('vajze'), w('ka'), w('lot'), p('.')),
      L(wf('lot', 'lotët', 'the tears'), wf('vrit', 'vrasin', 'kill'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('jep'), wf('kemishe', 'këmishën', 'shirt'), wf('yt', 'tënde', 'your'), p(','), w('dhe'), wf('vajze', 'vajza', 'the maiden'), w('rri'), w('me'), w('ti'), p('.')),
    ],
    options: [
      { text: L(w('jep'), wf('kemishe', 'këmishën', 'shirt')), to: 'shtojzovalleNuse', reveal: 'vajze' },
      { text: L(w('prek'), wf('vajze', 'vajzën', 'the maiden')), to: 'shtojzovalleLot', reveal: 'lot' },
      { text: L(w('ik'), w('ngadale')), to: 'shtojzovalleBekim' },
    ],
  },

  shtojzovalleVallja: {
    id: 'shtojzovalleVallja',
    end: 'secret',
    title: 'The Endless Round',
    blurb:
      'The Shtojzovalle — "may God increase their dance" — are the airy ones, the half-seen fairies who come out under the moon to sing and turn in their ring. You stepped into their round; and the old people could have warned you — whoever joins the dance of the fairies dances on. You turn yet beneath that moon, beautiful and tireless and no longer quite a man, while the years you were meant to live spool away in another’s hands.',
    text: [
      L(w('ti'), w('hyr'), w('ne'), w('valle'), p('.')),
      L(w('ti'), w('je'), w('ne'), w('valle'), w('perseri'), p('.')),
    ],
    options: [],
  },

  shtojzovalleLot: {
    id: 'shtojzovalleLot',
    end: 'bad',
    title: 'The Fairies’ Tears',
    blurb:
      'You laid hands on a Shtojzovalle maiden, and she wept — and the old people say a fairy’s tears are death: let a single one fall upon a mortal, and he dies. Hers fell upon you. The airy ones are not for the grasping hand; they are seen at all only by grace, and never kept by force.',
    text: [
      L(w('ti'), w('prek'), wf('vajze', 'vajzën', 'the maiden'), p('.')),
      L(wf('lot', 'lotët', 'the tears'), wf('bie', 'bien', 'fall'), w('ne'), w('ti'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  shtojzovalleNuse: {
    id: 'shtojzovalleNuse',
    end: 'secret',
    title: 'The Airy Bride',
    blurb:
      'There is one way to keep a Shtojzovalle, the old tales hold: give her clothes of your own to wear, and she will stay. You laid your shirt across her shoulders, and the airy maiden came home with you — a wife out of the moonlight, who spins good fortune into the house so long as she is treated with unfailing gentleness. The fairy-wife is kept by gentleness, or she is not kept at all.',
    text: [
      L(w('ti'), w('jep'), wf('kemishe', 'këmishën', 'shirt'), p('.')),
      L(w('nje'), w('vajze'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('nuse'), p('.')),
    ],
    options: [],
  },

  shtojzovalleBekim: {
    id: 'shtojzovalleBekim',
    end: 'good',
    title: 'Blessed of the Moon',
    blurb:
      'You came upon the Shtojzovalle at their moonlit round and did the wise thing: you watched in silence and drew back without breaking their ring or treading on the unseen. The airy ones, who spin the thread of every human life, were pleased — and into your own thread they wove a little more length and a little more luck. Some powers you do not seize and do not join; you honour them, and you step back.',
    text: [
      L(w('ti'), w('ik'), w('ngadale'), p('.')),
      L(wf('shtojzovalle', 'shtojzovallet', 'the moon-dancers'), wf('jep', 'japin', 'give'), w('ti'), w('bekim'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  // === branch: the night fire — the guest, the Ora, the Shtriga ===========
  // (the fire and its guest arc live AT the clearing, lendina — the shtriga
  // confrontation is the one scene that leaves it)
  shtrigaNate: {
    id: 'shtrigaNate',
    text: [
      L(w('naten'), wf('plake', 'plaka', 'the old woman'), w('behet'), w('nje'), w('shtrige'), p('.')),
      L(wf('shtrige', 'shtriga', 'the witch'), w('do'), wf('gjak', 'gjakun', 'the blood'), w('e_link'), wf('femije', 'fëmijës', 'the child'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('shtrige', 'shtriga', 'the witch'), wf('ik', 'ikën', 'flees'), w('nga'), w('kripe'), wf('ne', 'në', 'in'), w('zjarr'), p('.')),
    ],
    options: [
      { text: L(w('hidh'), w('kripe')), requires: 'kripe', consumes: 'kripe', to: 'shtrigaIkur', reveal: 'shtrige' },
      { text: L(w('lufto'), wf('shtrige', 'shtrigën', 'the witch')), to: 'humbur', reveal: 'shtrige' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  besaFire: {
    id: 'besaFire',
    end: 'good',
    title: 'The Sacred Guest',
    blurb:
      'The cold stranger at your night-fire was an Ora in an old woman’s shape — for in the old country a guest is sent by God, and to feed a traveller is a besa sacred above all. She blessed you; and rather than carry her blessing on into the dark, you chose to rest by her fire, and woke at dawn safe and strong, your hospitality repaid the way the songs promise.',
    text: [
      L(w('ti'), w('jep'), w('buke'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('eshte'), w('nje'), w('mik'), p('.')),
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
      L(w('ti'), w('hidh'), w('kripe'), wf('ne', 'në', 'on'), w('zjarr'), p('.')),
      L(wf('shtrige', 'shtriga', 'the witch'), w('behet'), w('nje'), w('flutur'), p('.')),
      L(wf('shtrige', 'shtriga', 'the witch'), wf('ik', 'ikën', 'flees'), p('.')),
    ],
    options: [],
  },

  gjumi: {
    id: 'gjumi',
    text: [
      L(w('ti'), w('fle'), wf('ne', 'në', 'on'), w('toke'), p('.')),
      unless('ujk', L(w('naten'), w('vjen'), w('nje'), w('ujk'), w('te_link'), w('uritur'), p('.'))),
      when('ujk', L(wf('ujk', 'ujku', 'the wolf'), w('rri'), w('me'), w('ti'), w('deri'), wf('ne', 'në', 'to'), w('agim'), p('.'))),
      unless('buke', L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.'))),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', grant: 'ujk', unless: 'ujk', to: 'shokuUjk', reveal: 'uritur' },
      // the sleeping-ground is the road-end clearing — you wake where you lay down
      { text: L(w('zgjohu'), w('dhe'), w('ik')), to: 'lendina' },
      // with the wolf on watch you can sleep the night out — wake at first light
      { text: L(w('fle'), w('deri'), wf('ne', 'në', 'to'), w('agim')), requires: 'ujk', to: 'lendina', time: 'dawn', reveal: 'agim' },
      { text: L(w('lufto'), wf('ujk', 'ujkun', 'the wolf')), unless: 'ujk', to: 'eaten', reveal: 'ujk' },
    ],
  },

  // === extra journey nodes (depth) ========================================
  fshatiDil: {
    id: 'fshatiDil',
    text: [
      // stepping out of the trees onto the gate road
      from('pylli1', L(w('ti'), wf('dil', 'del', 'comes out'), w('nga'), wf('pyll', 'pylli', 'the forest'), p('.'))),
      L(w('ti'), w('ec'), wf('ne', 'në', 'on'), w('nje'), w('rruge'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('dy'), wf('njeri', 'njerëz', 'people'), wf('lufto', 'luftojnë', 'fight'), w('per'), w('gjak'), p('.')),
      L(w('nje'), w('grua'), w('vjen'), w('me'), w('frike'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('grua', 'gruan', 'the woman')), to: 'dilFrike', reveal: 'frike' },
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylli1', reveal: 'pyll' },
      { text: L(w('ndihmo'), wf('njeri', 'njerëzit', 'the people')), to: 'gjak1', reveal: 'gjak' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road')), to: 'gjizar1' },
      // back into the village — closes the outskirts loop (lanes -> ... -> gate -> crossroads)
      // (no sleeping here: gjumi is the FOREST sleeping-ground by the clearing,
      // a thousand paces west — "fle ketu" at the gate would teleport)
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  // A frightened woman on the forest road — a flavour vignette (talk-and-return)
  // carrying the past-tense/fear words of the 301-350 band; coherent with the
  // dangerous forest and the blood-feud already on this road.
  dilFrike: {
    id: 'dilFrike',
    text: [
      L(w('nje'), w('grua'), w('thote'), p(':')),
      L(w('une'), wf('ka', 'kam', 'have'), w('frike'), p('!')),
      L(w('nje'), w('gje'), w('e_link'), w('keq'), wf('ndodh', 'ndodhur', 'happened'), p('.')),
      L(wf('djale', 'djali', 'the boy'), w('im'), w('eshte'), wf('humbet', 'humbur', 'lost'), p('.')),
      L(w('ku'), wf('ka', 'ka', 'has'), wf('shko', 'shkuar', 'gone'), p('?')),
      L(w('une'), w('nuk'), wf('di', 'dija', 'knew'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('degjo', 'dëgjuar', 'heard'), p(':'), w('nje'), w('njeri'), w('eshte'), wf('vrit', 'vrarë', 'killed'), p('.')),
      L(wf('dikush', 'dikë', 'someone'), w('e_obj'), wf('merr', 'mori', 'took'), p('?')),
      L(w('une'), w('nuk'), wf('ka', 'kam', 'have'), wf('gjen', 'gjetur', 'found'), wf('ai', 'atij', 'him'), p('.')),
      L(w('une'), wf('duhet', 'duhej', 'had to'), w('te_subj'), wf('shiko', 'shikoj', 'look'), p('.')),
      L(wf('dore', 'duart', 'the hands'), w('e_link'), wf('im', 'mia', 'my'), wf('eshte', 'janë', 'are'), w('ftohte'), p('.')),
      L(w('kush'), w('jep'), wf('ndihmo', 'ndihmë', 'help'), p('?')),
      L(w('ai'), w('eshte'), w('nje'), wf('djale', 'djalë', 'boy'), w('i_art'), w('mire'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('mendoj', 'menduar', 'thought'), w('shume'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('rruge', 'rrugës', 'the road')), to: 'fshatiDil' },
    ],
  },

  ura: {
    id: 'ura',
    text: [
      // crossing back from the Fshaj side opens with the crossing
      from('uraFshaj', L(w('ti'), wf('kalo', 'kalon', 'cross'), wf('ure', 'urën', 'the bridge'), w('mbrapa'), p('.'))),
      notFrom('uraFshaj', L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('nje'), w('ure'), p('.'))),
      L(wf('lume', 'lumi', 'the river'), w('poshte'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(w('nje'), w('plak'), w('thote'), w('nje'), w('gjegjeza'), p('.')),
      when('night', L(w('eshte'), w('naten'), p(','), wf('hene', 'hëna', 'the moon'), w('eshte'), w('mbi'), wf('lume', 'lumin', 'the river'), p('.'))),
      when('dawn', L(w('eshte'), w('agim'), p(','), w('nje'), w('drite'), w('bie'), wf('ne', 'në', 'on'), wf('ure', 'urën', 'the bridge'), p('.'))),
    ],
    options: [
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'uraFshaj', reveal: 'ure' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'riddle1', reveal: 'gjegjeza' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  maja: {
    id: 'maja',
    text: [
      // reached through the storm, or stepping down off the Sun's rays
      from('maliStuhi', L(w('ti'), w('ngjit'), w('lart'), wf('ne', 'në', 'to'), w('maja'), p('.'))),
      from('diellShtepi1', L(w('ti'), w('zbrit'), w('nga'), wf('rreze', 'rrezet', 'the rays'), w('e_link'), wf('diell', 'diellit', 'the Sun'), p('.'))),
      notFrom(['maliStuhi', 'diellShtepi1'], L(w('ti'), w('je'), wf('lart', 'lart', 'high'), wf('ne', 'në', 'on'), w('mal'), p('.'))),
      L(w('ketu'), w('rri'), w('nje'), w('plak'), w('te_link'), w('vjeter'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('ne', 'në', 'in'), w('vere'), wf('njeri', 'njerëzit', 'the people'), wf('ngjit', 'ngjiten', 'climb'), w('ketu'), w('dhe'), wf('ha', 'hanë', 'eat'), w('nje'), w('kurban'), p('.')),
      L(w('larg'), wf('rri', 'rrinë', 'stand'), wf('kulle', 'kullat', 'the towers'), w('e_link'), w('jutbina'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('mal'), w('tjeter'), p('.')),
      // waiting out the night on the peak: sunrise arrives as an EVENT, and the
      // rays return with it; nightfall likewise if you linger into the dark
      became('dawn', L(wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      // the Sun's rays touch the peak only while he rides the sky
      unless('night', L(wf('rreze', 'rrezet', 'the rays'), w('e_link'), wf('diell', 'diellit', 'the Sun'), wf('bie', 'bien', 'fall'), wf('ne', 'në', 'on'), w('maja'), p('.'))),
      when('night', L(wf('yll', 'yjet', 'the stars'), wf('je', 'janë', 'are'), w('lart'), p('.'))),
    ],
    options: [
      { text: L(w('ec'), w('mbi'), wf('rreze', 'rrezet', 'the rays')), to: 'diellShtepi1', reveal: 'rreze', unless: 'night' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'majaEagle', reveal: 'plak' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina', reveal: 'jutbina' },
      { text: L(w('sheh'), wf('mal', 'malet', 'the mountains')), to: 'shpirag1' },
      // the way down the peak you climbed — the summit is never a trap
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('mal')), to: 'mali3' },
      // wait out the night on the peak — the rays return with the sun
      { text: L(w('prit'), w('agim')), requires: 'night', to: 'maja', time: 'dawn' },
    ],
  },

  // =========================================================================
  // JUTBINA — the kreshnik hub: the towers of the frontier-warriors, where the
  // lahutë sings the Songs of the Kreshnikë. From here the scattered highland
  // epic is gathered: Mujo & Halili (the Tanusha raid), Zuku Bajraktar (the
  // blinded hero), and the Zanas' gift of a hero's strength (how Mujo grew strong).
  // =========================================================================
  jutbina: {
    id: 'jutbina',
    text: [
      L(w('ketu'), w('eshte'), w('jutbina'), p('.')),
      L(w('mujo'), w('dhe'), w('halil'), wf('rri', 'rrinë', 'dwell'), w('ketu'), p('.')),
      L(w('nje'), w('trim'), w('nuk'), w('sheh'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), wf('jep', 'japin', 'give'), w('fuqi'), p('.')),
      L(w('nje'), w('lahute'), wf('kendo', 'këndon', 'sings'), p('.')),
      // the "prit agim" vigil among the towers breaks as an event
      became('dawn', L(wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(wf('burre', 'burrat', 'the men'), wf('rri', 'rrinë', 'stay'), w('me'), w('zjarr'), p('.'))),
      L(wf('burre', 'burrat', 'the men'), wf('bej', 'bëjnë', 'make'), wf('gjeme', 'gjëmën', 'the death-wail'), w('per'), w('nje'), w('trim'), p('.')),
      L(w('rusha'), w('rri'), wf('ne', 'në', 'in'), wf('kulle', 'kullën', 'the tower'), w('e_link'), wf('krajl', 'krajlit', 'the Krajl'), p('.')),
      L(wf('krajl', 'krajli', 'a Krajl'), w('merr'), wf('mujo', 'Mujon', 'Mujo'), p('.')),
      L(w('nje'), w('kapidan'), w('do'), w('nje'), w('mejdan'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), w('mujo')), to: 'mujo1', reveal: 'mujo' },
      { text: L(w('ndihmo'), wf('trim', 'trimin', 'the hero')), to: 'zuku1', reveal: 'trim' },
      // the Zana are met in the dark — seeking them walks you into the night
      { text: L(w('kerko'), wf('zane', 'zanat', 'the Zanas')), to: 'mujiZana1', reveal: 'zane', time: 'night' },
      { text: L(wf('bej', 'bëj', 'make'), wf('gjeme', 'gjëmën', 'the death-wail')), to: 'vajtim1', reveal: 'gjeme' },
      { text: L(w('merr'), wf('rusha', 'Rushën', 'Rusha')), to: 'rusha1', reveal: 'rusha' },
      { text: L(w('ndihmo'), w('halil')), to: 'halil1', reveal: 'krajl' },
      // a mejdan is fought by day, before witnesses — no duel in the dark
      { text: L(w('dil'), wf('ne', 'në', 'to'), w('mejdan')), to: 'mejdan1', reveal: 'mejdan', unless: 'night' },
      // sit out the dark among the towers — the frontier wakes at first light
      { text: L(w('prit'), w('agim')), requires: 'night', to: 'jutbina', time: 'dawn' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('maja')), to: 'maja' },
    ],
  },

  // === MUJI'S STRENGTH-ORIGIN — the tale the kreshnik cycle presupposes ========
  mujiZana1: {
    id: 'mujiZana1',
    text: [
      L(w('naten'), w('nje'), w('gur'), w('i_art'), w('madh'), w('eshte'), w('ketu'), p('.')),
      when('night', L(wf('hene', 'hëna', 'the moon'), w('eshte'), w('lart'), p('.'))),
      L(w('ketu'), wf('je', 'janë', 'are'), w('dy'), wf('djep', 'djepe', 'cradles'), p('.')),
      L(w('dy'), w('femije'), wf('ka', 'kanë', 'have'), w('lot'), p('.')),
    ],
    options: [
      // rock the Zana cradles the night through — the mothers come with the dawn
      { text: L(w('tund'), wf('djep', 'djepet', 'the cradles')), to: 'mujiZana2', reveal: 'djep', time: 'dawn' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujiZana2: {
    id: 'mujiZana2',
    text: [
      L(w('ti'), w('tund'), wf('djep', 'djepet', 'the cradles'), w('deri'), wf('ne', 'në', 'to'), w('agim'), p('.')),
      L(w('dy'), w('zane'), w('vjen'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), wf('je', 'janë', 'are'), w('nene'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), w('thote'), p(':')),
      L(w('mujo'), w('tund'), wf('djep', 'djepet', 'the cradles'), w('ketu'), p('.'), w('mujo'), wf('pi', 'piu', 'drank'), w('qumesht'), w('dhe'), w('merr'), w('fuqi'), p('.')),
      L(w('kush'), w('ka'), w('dije'), p(','), wf('degjo', 'dëgjon', 'hears'), wf('zog', 'zogun', 'the bird'), p('.')),
      L(w('zgjedh'), p(':'), w('fuqi'), p(','), w('pasuri'), p(','), w('ose'), w('dije'), p('.')),
    ],
    options: [
      { text: L(w('zgjedh'), w('fuqi')), to: 'mujiFund' },
      { text: L(w('zgjedh'), w('pasuri')), to: 'mujiPasuri', reveal: 'pasuri' },
      { text: L(w('zgjedh'), w('dije')), to: 'mujiDije', reveal: 'dije' },
    ],
  },

  mujiFund: {
    id: 'mujiFund',
    end: 'good',
    title: 'The Strength of Mujo',
    blurb:
      'This is how Gjeto Basho Muji of Jutbina came by his strength, and how you came by yours: in the night you found two cradles by a great stone, two infants crying, and you rocked them till dawn though no one had asked you. Their mothers were Zana, and they gave you their own breast to suckle; you rose able to lift the very stone you had slept beside. Around that herdsman-made-hero the whole epic turns, and the strength the fairies fed him is the strength the lahutë has been singing ever since.',
    text: [
      L(w('ti'), w('pi'), w('qumesht'), w('e_link'), wf('zane', 'zanës', 'the Zana'), p('.')),
      L(w('ti'), w('ke'), w('fuqi'), w('e_art'), wf('madh', 'madhe', 'great'), p('.')),
      L(w('ti'), w('ngre'), wf('gur', 'gurin', 'the stone'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), wf('je', 'janë', 'are'), wf('mik', 'mike', 'friend'), p('.')),
    ],
    options: [],
  },

  mujiPasuri: {
    id: 'mujiPasuri',
    end: 'secret',
    title: 'Gold, but no Strength',
    blurb:
      'The Zana offered you strength, wealth, or wisdom, and you chose the gold. You went away rich — but no stronger than any man; and the day a Baloz rises from the sea or a Kulshedra coils on the spring, gold lifts no sword. The kreshnik in the old songs knew to choose otherwise.',
    text: [
      L(w('ti'), w('merr'), wf('pasuri', 'pasurinë', 'the wealth'), p('.')),
      L(w('por'), w('ti'), w('nuk'), w('je'), w('i_art'), wf('forte', 'fortë', 'strong'), p('.')),
    ],
    options: [],
  },

  mujiDije: {
    id: 'mujiDije',
    end: 'secret',
    title: 'The Speech of Birds',
    blurb:
      'You asked the Zana not for strength but for knowledge, and they taught you the speech of the birds and the hidden names of things. It is a rare and a quiet gift — but it is not the gift that hurls a Baloz into the sea. Mujo, the songs say, chose strength; you chose to understand.',
    text: [
      L(w('ti'), w('merr'), w('dije'), p('.')),
      L(w('por'), w('ti'), w('nuk'), w('je'), w('i_art'), wf('forte', 'fortë', 'strong'), p('.')),
    ],
    options: [],
  },

  tomor3: {
    id: 'tomor3',
    text: [
      L(w('tomor'), w('thote'), p(':')),
      L(w('kulshedra'), w('ka'), w('shume'), w('koke'), p('.')),
      L(w('nje'), w('pus'), w('eshte'), w('poshte'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pus')), to: 'tomorZbritje' },
    ],
  },

  dera: {
    id: 'dera',
    text: [
      L(w('ti'), w('hyr'), wf('ne', 'në', 'to'), w('nje'), w('dere'), w('te_link'), wf('madh', 'madhe', 'big'), p('.')),
      L(w('brenda'), w('eshte'), w('nje'), w('hije'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('hije', 'hija', 'the shadow'), w('ruan'), wf('dere', 'derën', 'the door'), w('te_link'), w('vjeter'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('hije', 'hijen', 'the shadow')), to: 'sprova', reveal: 'hije' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  sprova: {
    id: 'sprova',
    text: [
      L(w('shume'), w('hije'), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
      L(wf('hije', 'hijet', 'the shadows'), w('nuk'), wf('flet', 'flasin', 'speak'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('hije', 'hija', 'the shadow'), wf('jeto', 'jeton', 'lives'), w('pas'), wf('njeri', 'njeriut', 'the man'), p('.')),
    ],
    options: [
      { text: L(w('prek'), wf('hije', 'hijen', 'the shadow')), to: 'gjarpri', reveal: 'hije' },
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
      { text: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), requires: 'shpate', to: 'bota2', reveal: 'gjarper' },
      { text: L(w('lufto'), w('me'), w('fuqi')), requires: 'qumesht', to: 'bota2' },
      { text: L(w('lufto'), w('me'), w('bekim')), requires: 'bekim', unless: 'qumesht', to: 'bota2' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  uji: {
    id: 'uji',
    text: [
      L(w('ketu'), w('eshte'), w('shume'), w('uje'), p('.')),
      L(w('kulshedra'), w('ka'), wf('uje', 'ujin', 'the water'), p('.')),
      L(w('ketu'), w('rri'), w('prende'), p('.')),
      L(w('nje'), w('ylber'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('uje')), to: 'ujiShpella' },
      { text: L(w('degjo'), w('prende')), to: 'prende1', reveal: 'prende' },
    ],
  },

  kthimi: {
    id: 'kthimi',
    text: [
      L(w('ti'), w('dhe'), w('bukura'), w('ec'), w('lart'), p('.')),
      L(wf('shpelle', 'shpella', 'the cave'), w('bie'), p('.')),
      L(wf('pus', 'pusi', 'the well'), w('eshte'), wf('lart', 'lart', 'high'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pus')), to: 'pusi2' },
    ],
  },

  ktheu3: {
    id: 'ktheu3',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('kala'), w('dhe'), w('nje'), w('fshat'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('atje'), w('rri'), w('kala'), w('e_link'), w('rozafa'), p('.')),
      L(w('ti'), w('je'), w('ketu'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('fshat')), to: 'udhaKthimit' },
    ],
  },

  udhaKthimit: {
    id: 'udhaKthimit',
    text: [
      L(w('ti'), w('ec'), wf('ne', 'në', 'on'), w('nje'), w('rruge'), p('.')),
      L(wf('bote', 'bota', 'the world'), w('ka'), w('uje'), w('tani'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('kala'), p('.')),
      when('night', L(w('eshte'), w('naten'), p(','), wf('hene', 'hëna', 'the moon'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      when('dawn', L(w('eshte'), w('agim'), p(','), wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('kala')), to: 'kalaBuna', reveal: 'kala' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road')), to: 'shqipe1' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  // =========================================================================
  // SIDE-QUEST — Sons of the Eagle (the national origin legend)
  // On the road home you find an eaglet a serpent means to devour. Save it, and
  // the great eagle grants you the gifts that name your people Shqiptar.
  // =========================================================================
  shqipe1: {
    id: 'shqipe1',
    text: [
      L(w('lart'), w('nje'), w('peme'), w('ka'), w('nje'), w('fole'), p('.')),
      L(w('nje'), w('shqiponje'), w('vjen'), w('me'), w('nje'), w('gjarper'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('hidh'), wf('gjarper', 'gjarprin', 'the serpent'), wf('ne', 'në', 'in'), w('fole'), w('dhe'), wf('fluturo', 'fluturon', 'flies'), w('larg'), p('.')),
      L(w('nje'), w('zog'), wf('luan', 'luan', 'plays'), w('me'), wf('gjarper', 'gjarprin', 'the serpent'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('fle'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('shqiponje', 'shqiponja', 'the eagle'), wf('bej', 'bën', 'makes'), w('nje'), w('mbret'), p('.')),
    ],
    options: [
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('fole')), to: 'shqipe2', reveal: 'fole' },
      { text: L(w('ec'), w('larg')), to: 'shtepia' },
    ],
  },

  shqipe2: {
    id: 'shqipe2',
    text: [
      L(w('ti'), w('ngjit'), wf('ne', 'në', 'to'), wf('fole', 'folenë', 'the nest'), p('.')),
      L(w('por'), wf('gjarper', 'gjarpri', 'the serpent'), w('nuk'), w('eshte'), wf('vdes', 'i vdekur', 'dead'), p('!')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), wf('zgjohu', 'zgjohet', 'wakes'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('do'), w('te_subj'), w('ha'), wf('zog', 'zogun', 'the chick'), p('!')),
    ],
    options: [
      { text: L(w('vrit'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'shqipe3', reveal: 'gjarper' },
      { text: L(w('ik'), w('shpejt')), to: 'shtepia' },
    ],
  },

  shqipe3: {
    id: 'shqipe3',
    text: [
      L(w('ti'), wf('vrit', 'vret', 'kill'), wf('gjarper', 'gjarprin', 'the serpent'), w('dhe'), w('shpeto'), wf('zog', 'zogun', 'the chick'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('kthehu', 'kthehet', 'returns'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('te_obj'), w('jep'), w('sy'), w('dhe'), w('fuqi'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('shqiponje', 'shqiponjën', 'the eagle')), to: 'shqipeFund' },
    ],
  },

  shqipeFund: {
    id: 'shqipeFund',
    end: 'good',
    title: 'Son of the Eagle',
    blurb:
      'On the long road home you came upon what the oldest story of all begins with: a great eagle dropping a serpent into its nest and flying off, an eaglet left playing with the limp coil — and the serpent not dead at all, but rising to strike. You killed it as the hunter in the legend did, and the eagle, returning, gave you the sharpness of its eyes and the strength of its wings. Your people made you their king and took the eagle’s name for their own — Shqiptarët, the Sons of the Eagle, in the Land of the Eagle, Shqipëria. You had already broken the drought; but this was the blessing that made you more than a hero, and the eagle’s shadow has watched over the land ever since.',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('fluturo', 'fluturon', 'flies'), w('mbi'), w('ti'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), w('te_obj'), wf('bej', 'bëjnë', 'make'), w('mbret'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), w('merr'), wf('emer', 'emrin', 'the name'), w('e_link'), wf('shqiponje', 'shqiponjës', 'the eagle'), p('.')),
      L(w('ti'), w('je'), wf('bir', 'biri', 'the son'), w('i_link'), wf('shqiponje', 'shqiponjës', 'the eagle'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — the Maiden Promised to the Sun (Dielli)
  // On the mountain a maiden has been chained to the rock and promised to the Sun
  // to buy rain. Free her and defy the old bargain, or honour the cruel vow.
  // =========================================================================

  // =========================================================================
  // SIDE-QUEST — Sari Salltëk, the dragon-slaying dervish (the seven tongues)
  // A Bektashi dervish slew the seven-headed Kulshedra at Krujë and kept its seven
  // tongues; when a false hero claims the deed, the tongues prove the truth.
  // =========================================================================
  sari1: {
    id: 'sari1',
    text: [
      L(w('nje'), wf('kulshedra', 'kulshedër', 'she-dragon'), w('do'), wf('bije', 'bijën', 'the daughter'), w('e_link'), wf('mbret', 'mbretit', 'the king'), p('.')),
      L(w('nje'), w('dervish'), wf('shko', 'shkon', 'goes'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave'), p('.')),
      L(wf('dervish', 'dervishi', 'the dervish'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), w('me'), w('nje'), w('shpate'), wf('dru', 'druri', 'of wood'), p('.')),
      L(wf('dervish', 'dervishi', 'the dervish'), w('pre'), w('shtate'), wf('koke', 'koka', 'heads'), p('.')),
      L(wf('dervish', 'dervishi', 'the dervish'), w('merr'), w('shtate'), w('gjuhe'), p('.')),
      L(wf('dervish', 'dervishi', 'the dervish'), wf('quhem', 'quhet', 'is called'), w('sariSalltek'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('dervish', 'dervishin', 'the dervish')), to: 'sari2', reveal: 'dervish' },
      { text: L(w('kthehu')), to: 'pusi' },
    ],
  },

  sari2: {
    id: 'sari2',
    text: [
      L(w('nje'), w('trim'), w('merr'), w('shtate'), wf('koke', 'koka', 'heads'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), w('thote'), p(':'), w('une'), wf('vrit', 'vras', 'kill'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(w('por'), wf('dervish', 'dervishi', 'the dervish'), w('ka'), w('shtate'), w('gjuhe'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('jep'), wf('bije', 'bijën', 'the daughter'), p(','), w('por'), wf('dervish', 'dervishi', 'the dervish'), w('thote'), p(':'), w('jo'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('dervish', 'dervishi', 'the dervish'), w('ka'), w('shtate'), wf('varr', 'varret', 'graves'), wf('ne', 'në', 'in'), w('shtate'), wf('vend', 'vendet', 'lands'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('dervish', 'dervishin', 'the dervish')), to: 'sariFund' },
    ],
  },

  sariFund: {
    id: 'sariFund',
    end: 'secret',
    title: 'Sari Salltëk’s Tongues',
    blurb:
      'The dervish Sari Salltëk slew the seven-headed Kulshedra at Krujë with a wooden sword and cut out its seven tongues. When a false hero claimed the deed, the seven tongues proved who had truly done it. Cut the tongues, the old dervishes say, lest another steal your glory. They say the saint himself has seven graves in seven lands.',
    text: [
      L(w('shtate'), w('gjuhe'), w('nga'), w('shtate'), wf('koke', 'koka', 'heads'), p('.')),
      L(wf('dervish', 'dervishi', 'the dervish'), w('eshte'), wf('trim', 'trimi', 'the hero'), p('.')),
      L(wf('dervish', 'dervishi', 'the dervish'), w('nuk'), w('do'), wf('bije', 'bijën', 'the daughter'), w('e_link'), wf('mbret', 'mbretit', 'the king'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — the serpent bridegroom (the Snake and the King's Daughter)
  // By night a serpent sheds its skin to stand a young man; keep his secret and
  // the enchantment breaks — he is a man forever.
  // =========================================================================
  gjarperBurr1: {
    id: 'gjarperBurr1',
    text: [
      L(w('naten'), w('nje'), w('gjarper'), w('behet'), w('nje'), w('njeri'), p('.')),
      L(wf('njeri', 'njeriu', 'the person'), w('thote'), p(':')),
      L(w('nuk'), w('flet'), wf('per', 'për', 'about'), w('une'), p('.')),
    ],
    options: [
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'gjarperBurr2' },
      { text: L(w('fol'), wf('per', 'për', 'about'), wf('njeri', 'njeriun', 'the person')), to: 'gjarperBurrVdes', reveal: 'njeri' },
    ],
  },

  gjarperBurrVdes: {
    id: 'gjarperBurrVdes',
    end: 'bad',
    title: 'The Broken Silence',
    blurb:
      'You could not hold your tongue, and his secret was spoken aloud. The spell snapped shut: the youth was a serpent again, and slid away into the dark to stay one forever. Some secrets a bride — or a friend — must carry to the grave.',
    text: [
      L(w('ti'), w('fol'), p('.')),
      L(wf('njeri', 'njeriu', 'the person'), w('humbet'), w('perseri'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  gjarperBurr2: {
    id: 'gjarperBurr2',
    text: [
      L(w('ti'), w('nuk'), w('flet'), p('.')),
      L(w('nje'), w('kulshedra'), w('merr'), wf('njeri', 'njeriun', 'the person'), p('.')),
    ],
    options: [
      { text: L(w('kerko'), wf('njeri', 'njeriun', 'the person')), to: 'gjarperKerkim' },
    ],
  },

  gjarperKerkim: {
    id: 'gjarperKerkim',
    text: [
      L(w('ti'), w('vesh'), w('hekur'), wf('ne', 'në', 'on'), wf('kembe', 'këmbë', 'feet'), p('.')),
      L(w('ti'), w('fol'), w('me'), wf('diell', 'diellin', 'the Sun'), w('dhe'), wf('hene', 'hënën', 'the Moon'), p('.')),
      L(w('ti'), w('fol'), w('me'), wf('ere', 'erën', 'wind'), p('.')),
      L(wf('ere', 'era', 'wind'), w('thote'), p(':'), wf('ne', 'në', 'in'), wf('det', 'detin', 'the sea'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('det', 'detin', 'the sea')), to: 'gjarperKulshedra', reveal: 'det' },
      { text: L(w('kthehu')), to: 'bota2' },
    ],
  },

  // === SERPENT BRIDEGROOM flagship: the wooing, the search, the chores ====
  gjarperOrigin: {
    id: 'gjarperOrigin',
    text: [
      L(w('nje'), w('plake'), w('ka'), w('nje'), w('gjarper'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('do'), w('nje'), w('vajze'), w('e_link'), wf('mbret', 'mbretit', 'the king'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), wf('bej', 'bën', 'makes'), w('nje'), w('pallat'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('thote'), p(':'), w('naten'), p(','), wf('thote', 'thonë', 'they say'), p(','), wf('gjarper', 'gjarpri', 'the serpent'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('djale'), p('.')),
    ],
    options: [
      { text: L(w('marto'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'gjarperBurr1', reveal: 'gjarper' },
      { text: L(w('ik'), w('shpejt')), to: 'gjarperRefuz' },
    ],
  },

  gjarperRefuz: {
    id: 'gjarperRefuz',
    end: 'secret',
    title: 'The Suitor Refused',
    blurb:
      'An old woman’s snake-son raised a palace overnight and asked for the king’s daughter, and you turned from it as a monster. So you never saw what the wedding night would have shown — that under the cold skin slept a young man held by a spell. In the tale it is the bride who weds the snake who breaks the curse; the one who flees only leaves a man enchanted forever, and never even knows it.',
    text: [
      L(w('ti'), w('ik'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('rri'), w('nje'), w('gjarper'), p('.')),
    ],
    options: [],
  },

  gjarperKulshedra: {
    id: 'gjarperKulshedra',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), wf('det', 'detin', 'the sea'), p('.')),
      L(w('nje'), w('kulshedra'), w('mban'), wf('njeri', 'njeriun', 'the person'), p('.')),
      L(w('kulshedra'), w('do'), wf('lot', 'lotët', 'tears'), w('e_link'), w('ti'), p('.')),
      L(w('uje'), w('me'), w('kripe'), wf('behet', 'bëhet', 'becomes'), wf('lot', 'lot', 'tears'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('uje'), w('me'), w('kripe')), to: 'gjarperBurrFund', reveal: 'kulshedra' },
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'gjarperKulVdes' },
    ],
  },

  gjarperKulVdes: {
    id: 'gjarperKulVdes',
    end: 'bad',
    title: 'Beyond the Sea',
    blurb:
      'The Kulshedra who held your husband beyond the sea was never going to fall to a sword — she is older than the heroes, and the tale frees him not by force but by wit, by answering her impossible chores with cleverer tricks. You drew steel instead, and the sea kept you both.',
    text: [
      L(w('ti'), w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(w('kulshedra'), w('te_obj'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  gjarperBurrFund: {
    id: 'gjarperBurrFund',
    end: 'secret',
    title: 'The Serpent Bridegroom',
    blurb:
      'By night the serpent shed its skin and stood a young man, and begged you never to tell. You kept faith and never betrayed him — but the secret slipped out all the same, as it always does in the old tale, and a Kulshedra carried him off beyond the sea. Because you had never wronged him you could follow: you walked the world asking the sun, the moon and the wind where he was, the wind pointed past the water, and there you outwitted the Kulshedra and brought him home a man for good. In this tale it is never silence that frees the snake-husband — it is the long, faithful search after he is lost.',
    text: [
      L(w('ti'), w('mashtro'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(w('ti'), w('gjen'), wf('njeri', 'njeriun', 'the person'), p('.')),
      L(w('ti'), w('sjell'), wf('njeri', 'njeriun', 'the person'), wf('ne', 'në', 'to'), w('shtepi'), p('.')),
      L(wf('njeri', 'njeriu', 'the person'), w('eshte'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — Nastradin Hoxha (the cauldron that gave birth)
  // =========================================================================
  nastradin1: {
    id: 'nastradin1',
    text: [
      L(w('nje'), w('hoxha'), w('eshte'), w('ketu'), p('.')),
      L(wf('hoxha', 'hoxha', 'the hodja'), w('merr'), w('nje'), w('kazan'), p('.')),
      L(wf('hoxha', 'hoxha', 'the hodja'), w('thote'), p(':'), wf('kazan', 'kazani', 'the cauldron'), wf('lind', 'lindi', 'gave birth'), w('nje'), w('femije'), p('!')),
      L(w('nje'), w('kuzhinier'), w('vjen'), wf('ne', 'në', 'to'), w('hoxha'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('femije', 'fëmijën', 'the child')), to: 'nastradin2', reveal: 'femije' },
      { text: L(w('sheh'), wf('kuzhinier', 'kuzhinierin', 'the cook')), to: 'nastradinGjyq1', reveal: 'kuzhinier' },
      { text: L(w('kthehu')), to: 'fshatiBesa' },
    ],
  },

  nastradinFund: {
    id: 'nastradinFund',
    end: 'secret',
    title: 'Nastradin’s Cauldron',
    blurb:
      'You lent Nastradin Hoxha your cauldron, and he returned it with a little pot inside — "your cauldron gave birth." Next time he kept it: "the cauldron died." When you protested, he shrugged: "if a cauldron can give birth, it can die." You laughed, and let the hodja keep it.',
    text: [
      L(wf('hoxha', 'hoxha', 'the hodja'), w('merr'), wf('kazan', 'kazanin', 'the cauldron'), p('.')),
      L(wf('kazan', 'kazani', 'the cauldron'), w('vdes'), p('!')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — Constantine & Doruntine (the besa beyond death)
  // A grieving mother whose son swore a besa to bring her daughter home, then died;
  // at her grief he rises from the grave to keep his word.
  // =========================================================================
  kostandin1: {
    id: 'kostandin1',
    text: [
      L(w('nje'), w('nene'), w('ka'), w('lot'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('thote'), p(':')),
      L(w('nje'), w('bir'), wf('premto', 'premton', 'swears'), w('nje'), w('bese'), p('.')),
      L(w('i_art'), w('gjalle'), w('ose'), w('i_art'), wf('vdes', 'i vdekur', 'dead'), p(','), w('une'), w('sjell'), wf('bije', 'bijën', 'the daughter'), p('.')),
      L(wf('bije', 'bija', 'the daughter'), w('marto'), w('larg'), p('.')),
      L(wf('bir', 'biri', 'the son'), wf('quhem', 'quhet', 'is called'), w('kostandin'), p('.'), wf('bije', 'bija', 'the daughter'), wf('quhem', 'quhet', 'is called'), w('doruntine'), p('.')),
      L(w('por'), wf('bir', 'bijtë', 'the sons'), wf('vdes', 'vdesin', 'die'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kur'), w('nje'), w('nene'), w('mallko'), p(','), w('varr'), w('hap'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nënën', 'the mother')), to: 'kostandin2', reveal: 'nene' },
      { text: L(w('ndihmo'), wf('nene', 'nënën', 'the mother')), to: 'kostandinPushim' },
      { text: L(w('ec'), wf('ne', 'në', 'to'), w('fshat')), to: 'fshatiBesa' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes' },
    ],
  },

  kostandin2: {
    id: 'kostandin2',
    text: [
      L(wf('nene', 'nëna', 'the mother'), w('mallko'), wf('bir', 'birin', 'the son'), p('.')),
      L(wf('bir', 'biri', 'the son'), wf('zgjohu', 'zgjohet', 'wakes'), p('.')),
      L(wf('bir', 'biri', 'the son'), w('vjen'), w('nga'), w('varr'), p('!')),
      L(w('por'), wf('bir', 'biri', 'the son'), w('nuk'), w('eshte'), w('lugat'), p('.'), w('bese'), wf('zgjohu', 'zgjon', 'wakes'), wf('bir', 'birin', 'the son'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nënën', 'the mother')), to: 'kostandin3', reveal: 'nene' },
      { text: L(w('ik'), w('shpejt')), to: 'fshatiBesa' },
    ],
  },

  kostandin3: {
    id: 'kostandin3',
    text: [
      L(wf('bir', 'biri', 'the son'), wf('i_art', 'i', 'the'), wf('vdes', 'vdekur', 'dead'), wf('shko', 'shkon', 'goes'), w('larg'), p('.')),
      L(wf('bije', 'bija', 'the daughter'), w('eshte'), wf('ne', 'në', 'in'), w('valle'), p('.')),
      L(wf('bir', 'biri', 'the son'), w('sjell'), wf('bije', 'bijën', 'the daughter'), wf('ne', 'në', 'on'), w('kale'), p('.')),
      L(wf('bije', 'bija', 'the daughter'), w('sheh'), w('toke'), w('mbi'), wf('bir', 'birin', 'the son'), p('.')),
      // the legend's most famous exchange, on the horse in the dark: "why do you
      // smell of earth?" — "it is the dust of the road"
      Q('Kostandini e Doruntina — legjendë',
        wf('bije', 'bija', 'the daughter'), w('thote'), p(':'), w('pse'), wf('me_obj', 'më', 'me'), w('vjen'), wf('ere', 'erë', 'smell'), w('e_link'), wf('toke', 'dheut', 'the ground'), p('?')),
      Q('Kostandini e Doruntina — legjendë',
        wf('bir', 'biri', 'the son'), w('thote'), p(':'), w('eshte'), wf('pluhur', 'pluhuri', 'the dust'), w('i_link'), wf('udhe', 'udhës', 'the road'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bije', 'bijën', 'the daughter')), to: 'kostandinFund' },
    ],
  },

  kostandinFund: {
    id: 'kostandinFund',
    end: 'secret',
    title: 'The Besa Beyond Death',
    blurb:
      'A son had sworn his mother a besa — dead or alive, he would bring her far-married daughter Doruntine home whenever she wished — and then he and all his brothers died in the war. At the lonely mother’s curse the dead Kostandin rose from his grave — no lugat, but a brother bound by his besa, and rode the night roads to keep his word: he found Doruntine at the round-dance, set her on his horse, and brought her to the door — she half-seeing the grave-earth on his shoulders. He left her at the threshold and rode back to his grave. When mother and daughter spoke the truth aloud — that the dead brother had kept his besa — both fell dead in the same breath. There is no oath in the old country so strong that the grave itself can break it.',
    text: [
      L(wf('bir', 'biri', 'the son'), wf('le', 'lë', 'leaves'), wf('bije', 'bijën', 'the daughter'), wf('ne', 'në', 'in'), wf('dere', 'derë', 'the door'), p('.')),
      L(wf('bir', 'biri', 'the son'), w('shko'), w('nga'), w('varr'), p('.')),
      L(wf('bije', 'bija', 'the daughter'), w('thote'), p(':'), w('hap'), p(','), wf('nene', 'nënë', 'mother'), p('!')),
      L(wf('nene', 'nëna', 'the mother'), w('dhe'), wf('bije', 'bija', 'the daughter'), wf('vdes', 'vdesin', 'die'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — Gjizar the nightingale (the three roads)
  // A fork of three roads — "you will return / you will return / you will not
  // return" — and the magical nightingale that sings beyond the last.
  // =========================================================================
  gjizar1: {
    id: 'gjizar1',
    text: [
      L(w('ketu'), w('shume'), w('rruge'), p('.')),
      L(w('nje'), w('rruge'), w('thote'), p(':'), w('ti'), w('kthehu'), p('.')),
      L(w('nje'), w('rruge'), w('thote'), p(':'), w('ti'), w('nuk'), w('kthehu'), p('.')),
      L(w('nje'), wf('nene', 'nënë', 'mother'), w('vdes'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'fshatiDil' },
      { text: L(w('ndihmo'), wf('nene', 'nënën', 'the mother')), to: 'bleta1', reveal: 'nene' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road')), to: 'gjizar2' },
    ],
  },

  gjizar2: {
    id: 'gjizar2',
    text: [
      L(w('nje'), w('mbret'), w('do'), w('nje'), w('zog'), w('per'), w('nje'), w('xhami'), p('.')),
      L(wf('zog', 'zogu', 'the bird'), w('eshte'), w('larg'), p('.')),
      L(wf('zog', 'zogu', 'the bird'), w('eshte'), wf('ne', 'në', 'in'), wf('pallat', 'pallatin', 'the palace'), w('e_link'), wf('bukura', 'Bukurës', 'the Beauty'), p('.')),
      L(w('nje'), w('zog'), w('tjeter'), w('thote'), p(':'), w('gjon'), p('!')),
      L(w('nje'), w('dallendyshe'), wf('lufto', 'lufton', 'fights'), w('nje'), w('gjarper'), p('.')),
    ],
    options: [
      { text: L(w('kerko'), wf('zog', 'zogun', 'the bird')), to: 'gjizarUdha' },
      { text: L(w('degjo'), w('gjon')), to: 'cuckoo1', reveal: 'gjon' },
      { text: L(w('ndihmo'), wf('dallendyshe', 'dallëndyshen', 'the swallow')), to: 'dallendyshe1', reveal: 'dallendyshe' },
    ],
  },

  // === GJIZAR THE NIGHTINGALE (Elsie 14): the full quest ====================
  gjizarUdha: {
    id: 'gjizarUdha',
    text: [
      L(w('ti'), w('ec'), w('larg'), p('.')),
      L(w('nje'), w('grua'), w('rri'), w('ketu'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('eshte'), w('uritur'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('do'), w('buke'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('krua'), p('.'), wf('njeri', 'njerëzit', 'the people'), wf('bej', 'bënë', 'made'), wf('krua', 'kroin', 'the spring'), w('per'), w('nje'), w('shpirt'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('grua', 'gruas', 'the woman')), to: 'gjizarPallat', reveal: 'grua' },
      { text: L(w('kthehu')), to: 'gjizar2' },
    ],
  },

  gjizarPallat: {
    id: 'gjizarPallat',
    text: [
      L(wf('shqiponje', 'shqiponja', 'an eagle'), wf('fluturo', 'fluturon', 'flies'), w('me'), w('ti'), p('.')),
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), wf('pallat', 'pallatin', 'the palace'), w('e_link'), wf('bukura', 'Bukurës', 'the Beauty'), p('.')),
      L(wf('zog', 'zogu', 'the bird'), w('eshte'), wf('ne', 'në', 'in'), w('nje'), w('kafaz'), p('.')),
      L(wf('zog', 'zogu', 'the bird'), wf('quhem', 'quhet', 'is called'), w('gjizar'), p('.')),
      L(w('nje'), w('qiri'), w('ka'), w('zjarr'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('fle'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('kafaz', 'kafazin', 'the cage'), w('ngadale')), to: 'gjizarTradheti' },
      { text: L(w('thirr'), wf('zog', 'zogun', 'the bird')), to: 'gjizarKap', reveal: 'kafaz' },
    ],
  },

  gjizarKap: {
    id: 'gjizarKap',
    end: 'bad',
    title: 'Caught in the Palace',
    blurb:
      'You woke the Earthly Beauty. In her own palace, far down the road of no return, she keeps Gjizar the nightingale in a golden cage — and the thief who reaches for it loudly, instead of slipping the cage away while the candle burns and she sleeps, she catches in her own hands. Some birds are only won quietly.',
    text: [
      L(wf('bukura', 'Bukura', 'the Beauty'), wf('zgjohu', 'zgjohet', 'wakes'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('te_obj'), w('merr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  gjizarTradheti: {
    id: 'gjizarTradheti',
    text: [
      L(w('ti'), w('merr'), wf('zog', 'zogun', 'the bird'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), w('merr'), wf('zog', 'zogun', 'the bird'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), w('hidh'), w('ti'), wf('ne', 'në', 'in'), w('nje'), w('pus'), p('.')),
      L(wf('zog', 'zogu', 'the bird'), w('nuk'), w('flet'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('kerko'), wf('zog', 'zogun', 'the bird'), p('.')),
    ],
    options: [
      { text: L(w('thirr'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'gjizarFund' },
      { text: L(w('rri'), wf('ne', 'në', 'in'), w('pus')), to: 'gjizarPus', reveal: 'pus' },
    ],
  },

  gjizarPus: {
    id: 'gjizarPus',
    end: 'bad',
    title: 'Silent in the Cage',
    blurb:
      'You stayed in the well, and let your brothers carry Gjizar off and claim him for the king. But the nightingale will not sing for the false hands that stole him from the one who truly won him — so they had a silent bird in a golden cage, and you the dark at the bottom of a well. A bird won by treachery never sings.',
    text: [
      L(w('ti'), w('rri'), wf('ne', 'në', 'in'), w('pus'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), w('merr'), wf('zog', 'zogun', 'the bird'), p('.')),
      L(w('por'), wf('zog', 'zogu', 'the bird'), w('nuk'), w('flet'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  gjizarFund: {
    id: 'gjizarFund',
    end: 'secret',
    title: 'Gjizar the Nightingale',
    blurb:
      'A king wanted Gjizar the nightingale to grace his new mosque, and Gjizar sang only in the palace of the Earthly Beauty, far down the road of no return. You fed the hungry woman of the road, who set you on your way; her eagle bore you over to the Beauty’s hall, and while the Beauty slept and the candle burned you slipped the caged nightingale away. Your brothers betrayed you — took the cage and left you in a well — but the bird fell silent in their false hands and would not sing a note, so the Earthly Beauty came after it, and Gjizar sang the moment it was yours again. The truth came out, and the king had his nightingale for the mosque. (Elsie 14.) A nightingale sings only for the one who truly won it.',
    text: [
      L(wf('bukura', 'Bukura', 'the Beauty'), w('vjen'), p('.')),
      L(wf('zog', 'zogu', 'the bird'), w('flet'), w('per'), w('ti'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('merr'), wf('zog', 'zogun', 'the bird'), w('per'), w('nje'), w('xhami'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — the giants Tomorr & Shpirag (the river of tears)
  // =========================================================================
  shpirag1: {
    id: 'shpirag1',
    text: [
      L(w('ketu'), w('nje'), w('mal'), w('dhe'), w('nje'), w('mal'), w('tjeter'), p('.')),
      L(w('tomor'), w('dhe'), w('shpirag'), wf('jam', 'ishin', 'were'), w('dy'), w('burra'), w('te_link'), wf('madh', 'mëdhenj', 'big'), p('.')),
      L(w('tomor'), w('dhe'), w('shpirag'), wf('lufto', 'luftojnë', 'fight'), w('per'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('tomor'), w('ka'), w('nje'), w('kose'), p('.')),
      L(w('shpirag'), w('ka'), w('nje'), w('shkop'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('vdes'), w('dhe'), wf('lot', 'lotët', 'the tears'), wf('behet', 'bëhen', 'become'), w('nje'), w('lume'), p('.')),
      L(wf('lume', 'lumi', 'the river'), wf('quhem', 'quhet', 'is called'), w('osum'), p('.')),
    ],
    options: [
      { text: L(w('sheh'), wf('mal', 'malet', 'the mountains')), to: 'shpiragFund', reveal: 'mal' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
    ],
  },

  shpiragFund: {
    id: 'shpiragFund',
    end: 'secret',
    title: 'The Tears of the Earth',
    blurb:
      'Two of the great mountains, the people say, were once giants — Tomorr and Shpirag — who fought to the death over E Bukura e Dheut. When she died her tears ran down to become the river Osum. Tomor’s scythe gouged the long furrows down Shpirag’s flank and Shpirag’s cudgel cratered Tomor, and you can still read their wounds in the mountains’ torn sides; and the land has wept for her ever since.',
    text: [
      L(w('tomor'), w('dhe'), w('nje'), w('mal'), wf('vdes', 'vdesin', 'die'), p('.')),
      L(wf('lot', 'lotët', 'the tears'), w('e_link'), wf('bukura', 'Bukurës', 'the Beauty'), wf('behet', 'bëhen', 'become'), w('nje'), w('lume'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — Mujo & the golden-horned goats (the petrified wedding)
  // =========================================================================
  dhia1: {
    id: 'dhia1',
    text: [
      L(w('ketu'), w('shume'), wf('njeri', 'njerëz', 'people'), wf('gur', 'guri', 'of stone'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('njeri', 'njerëzit', 'the people'), wf('gur', 'guri', 'of stone'), wf('jam', 'ishin', 'were'), w('nje'), w('dasme'), p('.'), wf('zane', 'zanat', 'the fairies'), wf('bej', 'bënë', 'made'), wf('dasme', 'dasmën', 'the wedding'), w('gur'), p('.')),
      L(wf('zane', 'zanat', 'the fairies'), wf('ka', 'kanë', 'have'), w('fuqi'), w('ne'), w('nje'), w('dhi'), p('.')),
      L(wf('dhi', 'dhia', 'the goat'), w('ka'), w('ar'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('dhi', 'dhinë', 'the goat')), to: 'dhiaFund', reveal: 'dhi' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
    ],
  },

  dhiaFund: {
    id: 'dhiaFund',
    end: 'secret',
    title: 'The Golden-Horned Goats',
    blurb:
      'A wedding party stood frozen to stone — the work of the wild Zanas. Their strength, as Mujo learned, was hidden in goats with golden horns. Seizing the goats, you held the Zanas’ very power in your hands and forced them to swear a binding besa: free the guests and never harm them again. Bound by the oath no Zana dares break, the stone wedding drew breath once more. It was never the gold that saved them — it was the oath.',
    text: [
      L(w('ti'), w('merr'), wf('dhi', 'dhinë', 'the goat'), p('.')),
      L(w('nje'), w('zane'), wf('premto', 'premton', 'swears'), w('nje'), w('bese'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('zgjohu', 'zgjohen', 'wake'), w('perseri'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // SIDE-QUEST — the Maiden Promised to the Sun (Dielli)



  // =========================================================================
  // ACT IV (deepened) — the three Earthly Beauties (the Scurfhead's descent)
  // Below, the hero passes three houses, each with one of the three Beauties
  // (sisters); the youngest sets him on the dragon. Threads the underworld spine.
  // =========================================================================
  tre1: {
    id: 'tre1',
    text: [
      L(w('ti'), w('ec'), wf('poshte', 'poshtë', 'down'), wf('ne', 'në', 'to'), wf('bote', 'botën', 'the world'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('shtepi'), p('.')),
      L(w('brenda'), w('nje'), w('bukura'), wf('bej', 'bën', 'makes'), w('ar'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'tre2', reveal: 'bukura' },
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
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'tre3', reveal: 'bukura' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  tre3: {
    id: 'tre3',
    text: [
      L(w('nje'), w('shtepi'), w('tjeter'), w('eshte'), w('ketu'), p('.')),
      L(w('nje'), w('bukura'), w('e_art'), w('bukur'), w('rri'), w('ketu'), p('.')),
      L(w('bukura'), w('thote'), p(':')),
      L(wf('shpate', 'shpata', 'the sword'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'udhetimi1', reveal: 'bukura' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  // =========================================================================
  // ACT IV (deepened) — the dark road of Bota e Poshtme & the white/black rams
  // You pass the petrified (the stone wedding-guests), and learn the Scurfhead's
  // secret: a white ram bears you up, a black ram keeps you below.
  // =========================================================================
  udhetimi1: {
    id: 'udhetimi1',
    text: [
      L(w('nje'), w('rruge'), w('te_link'), w('erret'), p('.')),
      L(w('ketu'), w('rri'), w('shume'), wf('njeri', 'njerëz', 'people'), wf('gur', 'guri', 'of stone'), p('.')),
      L(w('por'), w('ti'), w('vazhdon'), p('.')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'on'), wf('rruge', 'rrugën', 'the road')), to: 'udhetimi2', reveal: 'rruge' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  udhetimi2: {
    id: 'udhetimi2',
    text: [
      L(w('ketu'), w('rri'), w('nje'), w('dash'), w('i_art'), w('bardhe'), w('dhe'), w('nje'), w('dash'), w('i_art'), w('zi'), p('.')),
      L(wf('dash', 'dashi', 'the ram'), w('i_art'), w('bardhe'), w('eshte'), w('mik'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('dash', 'dashin', 'the ram'), w('e_art'), w('bardhe')), to: 'uji' },
      { text: L(w('merr'), wf('dash', 'dashin', 'the ram'), w('e_art'), w('zi')), to: 'humbur', reveal: 'dash' },
    ],
  },

  // =========================================================================
  // THE TWIST — E Bukura e Dheut (the drought is her imprisonment)
  // The Beauty is the goddess of the spring; the Kulshedra's drought is her
  // captivity. Free her, and the water of the whole world returns.
  // =========================================================================
  bukuraThellesi: {
    id: 'bukuraThellesi',
    text: [
      L(wf('bukura', 'Bukura', 'the Beauty'), w('thote'), p(':')),
      L(w('une'), w('jam'), w('bukura'), w('e_link'), wf('toke', 'Dheut', 'the Earth'), p('.')),
      L(w('kulshedra'), w('ka'), w('une'), w('dhe'), w('uje'), p('.')),
      L(w('kulshedra'), w('ka'), wf('rrobe', 'rrobën', 'the dress'), p('.')),
      L(wf('rrobe', 'rroba', 'the dress'), w('ka'), w('fuqi'), p('.')),
      L(w('ti'), w('shpeto'), w('une'), w('dhe'), w('uje'), w('vjen'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'bukura2' },
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
      // the shore's rhythm — fishermen in the light hours, the moon-road at night
      unless('night', L(wf('burre', 'burrat', 'the men'), wf('merr', 'marrin', 'take'), w('peshk'), w('nga'), wf('det', 'deti', 'the sea'), p('.'))),
      when('night', L(w('naten'), wf('hene', 'hëna', 'the moon'), w('eshte'), w('mbi'), wf('det', 'detin', 'the sea'), p('.'))),
      L(w('ketu'), w('eshte'), w('nje'), w('kulle'), p('.')),
      L(wf('ne', 'në', 'in'), w('kulle'), w('nje'), w('trim'), w('ka'), w('nente'), w('plage'), p('.')),
      L(w('nje'), w('motra'), w('jep'), w('uje'), wf('trim', 'trimit', 'to the hero'), p('.')),
      L(wf('flok', 'flokët', 'the hair'), w('e_link'), wf('motra', 'motrës', 'the sister'), wf('ka', 'kanë', 'have'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('motra', 'motrën', 'the sister')), to: 'balozMotra', reveal: 'motra' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('det')), to: 'deti1' },
    ],
  },

  balozMotra: {
    id: 'balozMotra',
    text: [
      L(wf('motra', 'motra', 'the sister'), w('thote'), p(':')),
      L(wf('trim', 'trimi', 'the hero'), wf('quhem', 'quhet', 'is called'), w('gjergj'), p('.')),
      L(w('nente'), wf('vit', 'vjet', 'years'), wf('trim', 'trimi', 'the hero'), w('rri'), wf('ne', 'në', 'in'), w('kulle'), p('.')),
      L(w('une'), w('jam'), wf('vetem', 'vetëm', 'alone'), w('me'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(w('nente'), wf('vit', 'vjet', 'years'), w('une'), w('jep'), w('uje'), w('dhe'), w('buke'), wf('trim', 'trimit', 'to the hero'), p('.')),
      L(w('une'), wf('vajto', 'vajtoj', 'mourn'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(w('zemer'), wf('im', 'ime', 'my'), w('dhe'), w('zemer'), w('e_link'), wf('trim', 'trimit', 'the hero'), wf('jam', 'janë', 'are'), w('nje'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('motra', 'motrën', 'the sister')), to: 'balozTribut', reveal: 'motra' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozTribut: {
    id: 'balozTribut',
    text: [
      L(wf('motra', 'motra', 'the sister'), w('thote'), p(':')),
      L(w('nje'), w('baloz'), w('vjen'), wf('ne', 'në', 'to'), wf('det', 'detin', 'the sea'), p('.')),
      L(w('perpara'), wf('baloz', 'balozi', 'the sea-monster'), wf('do', 'donte', 'wanted'), w('ar'), p(','), w('pas'), wf('dhi', 'dhitë', 'the goats'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('jep'), w('nje'), w('vajze'), wf('baloz', 'balozit', 'to the sea-monster'), p('.')),
      L(w('tani'), wf('baloz', 'balozi', 'the sea-monster'), w('do'), w('mua'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('motra', 'motrën', 'the sister')), to: 'balozZgjedh', reveal: 'motra' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozZgjedh: {
    id: 'balozZgjedh',
    text: [
      L(wf('motra', 'motra', 'the sister'), wf('vajto', 'vajton', 'weeps'), p('.')),
      L(w('lot'), w('bie'), wf('ne', 'në', 'on'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), w('do'), w('te_subj'), wf('lufto', 'luftojë', 'fight'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), w('ka'), w('nente'), w('plage'), p('.')),
      L(wf('shpate', 'shpata', 'the sword'), w('e_link'), wf('trim', 'trimit', 'the hero'), w('eshte'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('jep'), wf('shpate', 'shpatën', 'the sword'), wf('trim', 'trimit', 'to the hero')), to: 'balozLufte', reveal: 'shpate' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozLufte: {
    id: 'balozLufte',
    text: [
      // in some tellings the Baloz rises from the sea at dawn — flavor only, no gate (standards #14)
      when('dawn', L(w('eshte'), w('agim'), p(','), wf('baloz', 'balozi', 'the sea-monster'), w('vjen'), w('nga'), wf('det', 'deti', 'the sea'), p('.'))),
      L(wf('trim', 'trimi', 'the hero'), wf('lufto', 'lufton', 'fights'), wf('baloz', 'balozin', 'the sea-monster'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('thote'), p(':')),
      L(wf('trim', 'trimi', 'the hero'), w('eshte'), w('nje'), w('trim'), wf('vdes', 'i vdekur', 'dead'), p('!')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('hidh'), w('nje'), w('gur'), p('!')),
    ],
    options: [
      { text: L(w('ndihmo'), wf('trim', 'trimin', 'the hero')), to: 'balozKoke', reveal: 'trim' },
      { text: L(w('ik'), w('shpejt')), to: 'bregHumb' },
    ],
  },

  balozKoke: {
    id: 'balozKoke',
    text: [
      L(wf('trim', 'trimi', 'the hero'), w('pre'), wf('koke', 'kokën', 'the head'), w('e_link'), wf('baloz', 'balozit', 'the sea-monster'), p('.')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('vdes'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('eshte'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('kulle')), to: 'balozFitore' },
    ],
  },

  balozFitore: {
    id: 'balozFitore',
    end: 'good',
    title: 'Gjergj Elez Alia',
    blurb:
      'You found Gjergj Elez Alia in his tower as the oldest song tells it: nine years bedridden with nine wounds, kept alive only by his sister, who for nine years washed his wounds and dried his blood with her own hair. When the Black Baloz that had taken the coast’s yearly tribute of a maiden from each house came at last for her, her tears woke him, and though his nine wounds still bled he rose, took the sword you put in his hand, and went down to the shore himself. The sea-ogre mocked him for a dead man come from the grave; he dodged its hurled stone and struck its head from its shoulders, and freed the coast of its tribute forever. Then, the danger past, brother and sister embraced — and in that one breath both their hearts stopped together, the way the song says they must, and you laid the two of them in a single grave under one stone. The lahutë sang Gjergj and his faithful sister for five hundred years; now it sings you beside them.',
    text: [
      L(w('ti'), w('kthehu'), wf('ne', 'në', 'to'), w('kulle'), p('.')),
      L(wf('zemer', 'zemra', 'the heart'), w('e_link'), wf('trim', 'trimit', 'the hero'), w('dhe'), wf('zemer', 'zemra', 'the heart'), w('e_link'), wf('motra', 'motrës', 'the sister'), wf('vdes', 'vdesin', 'die'), w('bashke'), p('.')),
      L(w('nje'), w('varr'), w('per'), wf('dy', 'dy', 'two'), p('.')),
      L(wf('lahute', 'lahuta', 'the lute'), wf('kendo', 'këndon', 'sings'), wf('trim', 'trimin', 'the hero'), w('dhe'), wf('motra', 'motrën', 'the sister'), p('.')),
    ],
    options: [],
  },

  bregFle: {
    id: 'bregFle',
    end: 'bad',
    title: 'The Sea’s Tribute',
    blurb:
      'You did not take up the fight, and the Baloz took the maiden it came for. The coast still pays its yearly tribute to the dark water, and the wounded hero you might have stood for grieves alone. No song is sung for the one who turns away.',
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
      'You fled instead of standing by Gjergj, and the Baloz caught you at the water’s edge. The sea is older than any hero, and it keeps what it takes.',
    text: [
      L(w('ti'), w('ik'), wf('ne', 'në', 'to'), wf('det', 'detin', 'the sea')),
      L(wf('baloz', 'balozi', 'the sea-monster'), w('te_obj'), w('ha'), p('.')),
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
      L(wf('ne', 'në', 'on'), w('nje'), w('gur'), w('te_link'), w('madh'), w('eshte'), w('nje'), w('djep'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('femije'), w('dhe'), w('nje'), w('femije'), w('tjeter'), p('.')),
      L(wf('femije', 'fëmijët', 'the children'), w('nuk'), wf('fle', 'flenë', 'sleep'), p('.')),
    ],
    options: [
      { text: L(w('tund'), wf('djep', 'djepin', 'the cradle')), to: 'zanaProva2', reveal: 'femije', time: 'dawn' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  zanaProva2: {
    id: 'zanaProva2',
    text: [
      L(w('naten'), w('mbaroi'), w('dhe'), w('vjen'), w('dite'), p('.')),
      L(wf('zane', 'zana', 'the fairy'), w('vjen'), w('dhe'), w('thote'), p(':')),
      L(w('qumesht'), wf('im', 'im', 'my'), wf('bej', 'bën', 'makes'), wf('trim', 'trima', 'heroes'), p('.'), w('mujo'), wf('pi', 'piu', 'drank'), w('ketu'), p('.')),
      L(w('merr'), w('ar'), p(','), w('dije'), w('ose'), w('fuqi'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('fuqi')), to: 'zanaQumesht' },
      { text: L(w('merr'), w('ar')), to: 'zanaGold', reveal: 'ar' },
      { text: L(w('merr'), w('dije')), to: 'zanaDije', reveal: 'dije' },
    ],
  },

  zanaGold: {
    id: 'zanaGold',
    end: 'secret',
    title: 'The Lesser Gifts',
    blurb:
      'By the boulder the Zanas offered you what they once offered the young Mujo — wealth, knowledge, or a hero’s strength — and you reached for the gold. You went home the richest man in the valley, and the Kulshedra kept the water. Remember whose gold it was: the zana of the mountain is no petting fairy — she whose milk makes heroes, as she told you herself. Her gifts are real, and so is the cost of choosing the smallest of them.',
    text: [
      L(w('ti'), w('nuk'), w('je'), w('nje'), w('dragua'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  zanaDije: {
    id: 'zanaDije',
    end: 'secret',
    title: 'The Zanas’ Wisdom',
    blurb:
      'By the boulder the Zanas offered you wealth, knowledge, or a hero’s strength, and you chose knowledge. You went home the wisest man in the valley — wise enough to know what you had refused: for it is zana-milk that makes the kreshniks, the strength that suckled Mujo himself to a might matched only by a drangue’s. Wise enough, at last, to understand that you had held that very choice in your hand and let it pass. Some gifts are a quiet kind of grief.',
    text: [
      L(w('ti'), w('ke'), w('dije'), p('.')),
      L(w('por'), w('ti'), w('nuk'), w('je'), w('nje'), w('dragua'), p('.')),
    ],
    options: [],
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
      L(w('nje'), w('gjarper'), w('ngjit'), wf('ne', 'në', 'to'), wf('fole', 'folenë', 'the nest')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('do'), w('te_subj'), w('ha'), w('nje'), w('zog'), p('!')),
    ],
    options: [
      { text: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'foleShpetuar', reveal: 'gjarper' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  foleShpetuar: {
    id: 'foleShpetuar',
    text: [
      L(w('ti'), wf('vrit', 'vret', 'kill'), wf('gjarper', 'gjarprin', 'the serpent'), w('dhe'), w('shpeto'), wf('zog', 'zogun', 'the chick'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('vjen'), w('dhe'), w('thote'), p(':')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('do'), w('te_subj'), w('ndihmo'), w('ti'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('shqiponje', 'shqiponjën', 'the eagle')), grant: 'shqiponja', to: 'rrethi' },
    ],
  },

  // =========================================================================
  // ACT III (deepened) — Baba Tomor's storm-trial (the Drangue's lightning)
  // The sky-father shows you the storm where a Drangue fights the Kulshedra;
  // a true dragua stands in the lightning unafraid before he is given the sword.
  // =========================================================================
  tomorProva: {
    id: 'tomorProva',
    text: [
      L(w('tomor'), w('thote'), p(':')),
      L(w('nje'), w('dragua'), w('ka'), w('fuqi'), w('te_link'), w('rrufe'), p('.')),
      L(w('nje'), w('re'), w('e_art'), w('madh'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('tomor', 'Tomorin', 'Tomor')), to: 'tomorStuhi', reveal: 'tomor' },
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  tomorStuhi: {
    id: 'tomorStuhi',
    text: [
      L(w('ere'), w('dhe'), w('rrufe'), w('vjen'), p('.')),
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), w('ne'), w('re'), p('.')),
      L(w('ti'), w('nuk'), w('ik'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'tomor2', reveal: 'kulshedra' },
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  // =========================================================================
  // ACT V (deepened) — the long ascent (the Scurfhead's eagle climb)
  // The eagle bears you up the great well by night; do not look down, and feed
  // it on the long climb, until the dawn shows the rim.
  // =========================================================================
  ngjitja1: {
    id: 'ngjitja1',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('fluturo', 'fluturon', 'flies'), w('lart'), wf('ne', 'në', 'to'), w('pus'), p('.')),
      L(wf('pus', 'pusi', 'the well'), w('eshte'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('erret'), p('.')),
    ],
    options: [
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'ngjitja2' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), to: 'rene', reveal: 'pus' },
    ],
  },

  ngjitja2: {
    id: 'ngjitja2',
    text: [
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('eshte'), w('i_art'), w('uritur'), p('.')),
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('do'), w('buke'), w('ose'), w('mish'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'ngjitja3', reveal: 'buke' },
      { text: L(w('jep'), w('mish')), requires: 'mish', consumes: 'mish', to: 'ngjitja3', reveal: 'buke' },
      { text: L(w('ngjit'), w('lart')), to: 'rene' },
    ],
  },

  ngjitja3: {
    id: 'ngjitja3',
    text: [
      L(w('naten'), w('mbaroi'), w('dhe'), w('vjen'), w('dite'), p('.')),
      L(wf('pus', 'pusi', 'the well'), w('eshte'), wf('lart', 'lart', 'high'), p('.')),
    ],
    options: [
      // the text says the night ended at the rim — climbing out lands you at dawn
      { text: L(w('ngjit'), wf('pus', 'pusin', 'the well')), to: 'siperfaqja', time: 'dawn' },
    ],
  },

  // =========================================================================
  // ACT I (deepened) — the village square: the dry well, the elders' besa
  // The drought, the legend of the Kulshedra below, and the old woman's reveal
  // that you were born a dragua. A shared early bottleneck.
  // =========================================================================
  // =========================================================================
  // THE VILLAGE SQUARE — now an explorable hub, not a single scene. The dry well
  // and the children are here in the open; the elders are inside their buildings
  // (the old woman's HOUSE, the men's ODA); the back lanes hold more.
  // =========================================================================
  fshatiSheshi: {
    id: 'fshatiSheshi',
    text: [
      L(w('ti'), w('je'), w('ne'), wf('fshat', 'fshatin', 'the village'), p('.')),
      // arrivals: up the road from the crossroads, or the climb from the river-quarter
      from('udhekryq', L(w('ti'), w('vjen'), w('nga'), wf('udhekryq', 'udhëkryqi', 'crossroads'), p('.'))),
      from('fshatiLumi', L(w('ti'), w('ngjit'), w('nga'), wf('lume', 'lumi', 'the river'), p('.'))),
      L(w('nje'), w('pus'), w('eshte'), w('i_art'), w('thate'), p('.')),
      // the water-carrier arrives up the river road with the spring's water —
      // the dry well's answer, walked in on foot (npcs.js gruaUji)
      when('npc:gruaUji', L(w('nje'), w('grua'), w('sjell'), w('uje'), w('nga'), wf('krua', 'kroi', 'the spring'), p('.'))),
      // the dordolec gang (npcs.js femijet) roams square ↔ lanes — the children
      // are only HERE (and helpable) while their walk brings them here
      when('npc:femijet', L(wf('femije', 'fëmijët', 'the children'), wf('bej', 'bëjnë', 'make'), w('nje'), w('dordolec'), p('.'))),
      L(w('ketu'), w('rri'), w('nje'), w('shtepi'), w('dhe'), w('nje'), w('oda'), p('.')),
      // the far side of the square, SEEN from here: crossing over is its own
      // scene (sheshiKisha) — this sight-line is what reveals the way across
      L(w('ti'), w('sheh'), w('nje'), w('kishe'), w('dhe'), w('nje'), w('xhami'), p('.')),
      L(w('nje'), w('rruge'), wf('shko', 'shkon', 'goes'), w('larg'), p('.')),
      // the bride's procession (npcs.js krushqit) rides through this side too
      when('npc:krushqit', L(w('nje'), w('nuse'), w('vjen'), w('me'), w('kale'), p('.'))),
      // the day FADES over the square if the hour turned while you stood here:
      // dusk and nightfall arrive as events, then the standing lines take over
      became('dusk', L(wf('diell', 'dielli', 'the sun'), w('bie'), p('.'))),
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(wf('fshat', 'fshati', 'the village'), w('fle'), p('.'))),
      when('night', L(w('nje'), w('gjinkalla'), wf('kendo', 'këndon', 'sings'), wf('ne', 'në', 'in'), w('erresire'), p('.'))),
      // the Xhindët's night walk crosses the sleeping square (npcs.js xhindet)
      when('npc:xhindet', L(w('dikush'), wf('ec', 'ecën', 'walks'), wf('ne', 'në', 'in'), w('erresire'), p('.'))),
      L(w('nje'), w('rruge'), wf('zbrit', 'zbret', 'goes down'), wf('poshte', 'poshtë', 'down'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river'), p('.')),
      // the old man keeps his timetable (npcs.js plakuSheshit): mornings here,
      // evenings in the oda among the men
      when('npc:plakuSheshit', L(w('nje'), w('plak'), w('rri'), w('ketu'), w('dhe'), wf('shiko', 'shikon', 'looks'), w('ti'), p('.'))),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('plak', 'plakun', 'the old man')), requires: 'npc:plakuSheshit', to: 'sheshiPlak', reveal: 'plak' },
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('shtepi')), to: 'plaka', reveal: 'shtepi' },
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('oda')), to: 'oda1', reveal: 'oda' },
      { text: L(w('ndihmo'), wf('femije', 'fëmijët', 'the children')), requires: 'npc:femijet', to: 'dordolec1', reveal: 'dordolec' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pus')), to: 'pusiThate', reveal: 'thate' },
      // cross to the church side — the festival, the wedding and the market
      // gather over there, so each half of the square stays readable
      { text: L(w('kalo'), wf('shesh', 'sheshin', 'the square')), to: 'sheshiKisha', reveal: 'kishe' },
      { text: L(w('zbrit'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi', reveal: 'lume' },
      { text: L(w('shko'), wf('tek', 'te', 'to'), w('udhekryq')), to: 'udhekryq' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes' },
    ],
  },

  // The CHURCH SIDE of the square — the far half, across from the well. The
  // square was one crowded node; split in two, each side describes its own
  // buildings and SEES the other's ("ti sheh…"), and the day-life cluster
  // (the festival, the wedding, the market street) gathers over here.
  sheshiKisha: {
    id: 'sheshiKisha',
    text: [
      from('fshatiSheshi', L(w('ti'), wf('kalo', 'kalon', 'cross'), wf('shesh', 'sheshin', 'the square'), p('.'))),
      L(w('nje'), w('kishe'), w('dhe'), w('nje'), w('xhami'), wf('rri', 'rrinë', 'stand'), w('bashke'), w('ketu'), p('.')),
      // looking back across the square at the well side
      L(w('ti'), w('sheh'), wf('pus', 'pusin', 'the well'), w('dhe'), wf('shtepi', 'shtëpitë', 'the homes'), p('.')),
      when('day', L(w('sot'), wf('fshat', 'fshati', 'the village'), wf('bej', 'bën', 'makes'), w('nje'), w('feste'), p('.'))),
      // the wedding runs all day; the bride herself only rides in when the
      // krushqit procession (npcs.js) actually reaches this side
      unless('night', L(w('sot'), w('ka'), w('nje'), w('dasme'), p('.'))),
      when('npc:krushqit', L(w('nje'), w('nuse'), w('vjen'), w('me'), w('kale'), p('.'))),
      // the market street opens off this side (→ pazari1); stalls pack up at dusk
      unless('night', L(w('nje'), w('treg'), w('i_art'), w('vogel'), w('eshte'), w('ketu'), p('.'))),
      when('night', L(w('naten'), w('ketu'), w('eshte'), w('qete'), p('.'))),
    ],
    options: [
      { text: L(wf('bej', 'bëj', 'make'), w('nje'), w('feste')), requires: 'day', to: 'veraDite1', reveal: 'feste' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('dasme')), unless: 'night', to: 'dasma1', reveal: 'dasme' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('treg')), unless: 'night', to: 'pazari1', reveal: 'treg' },
      // back across to the well side — always open (the ungated path)
      { text: L(w('kalo'), wf('shesh', 'sheshin', 'the square')), to: 'fshatiSheshi' },
    ],
  },

  // An old man at the square — a flavour vignette that voices Act I's thirsting
  // village from a human mouth (the dry well is right there in front of you), and
  // carries a cluster of the commonest everyday words. Talk-and-return: no ending,
  // no folktale weight — just the village speaking to the stranger.
  sheshiPlak: {
    id: 'sheshiPlak',
    text: [
      L(w('nje'), w('plak'), w('thote'), p(':')),
      L(w('shiko'), p(','), w('zoteri'), p('!')),
      L(w('ne_we'), wf('shko', 'shkojmë', 'go'), wf('tek', 'te', 'to'), w('pus'), w('cdo'), wf('dite', 'ditë', 'day'), p('.')),
      L(w('po_but'), wf('pus', 'pusi', 'the well'), w('eshte'), w('i_art'), w('thate'), w('kaq'), w('kohe'), p('.')),
      L(w('disa'), wf('njeri', 'njerëz', 'people'), wf('ik', 'ikën', 'leave'), p('.')),
      L(w('ndoshta'), w('ti'), wf('ndihmo', 'ndihmon', 'help'), w('ne_we'), p('.')),
      L(w('atehere'), wf('fshat', 'fshati', 'the village'), w('eshte'), w('i_art'), w('mire'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'sheshiPlak2' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  sheshiPlak2: {
    id: 'sheshiPlak2',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(wf('bir', 'biri', 'the son'), wf('im', 'tim', 'my'), w('eshte'), w('larg'), p(','), w('nente'), wf('vit', 'vjet', 'years'), p('.')),
      L(wf('ata', 'ato', 'they'), p(','), wf('motra', 'motrat', 'the sisters'), w('e_link'), w('saj'), p(','), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
      L(wf('shtepi', 'shtëpitë', 'the houses'), w('tyre'), w('qene'), w('me'), w('zjarr'), p('.')),
      L(w('gjitha'), w('keto'), w('vatra'), w('tani'), wf('eshte', 'janë', 'are'), w('ftohte'), p('.')),
      L(w('ne_we'), w('nuk'), wf('lufto', 'luftojmë', 'fight'), p('.')),
      L(w('oh'), p(','), w('zot'), p('!')),
      L(w('ne_we'), wf('do', 'duam', 'want'), w('me_more'), w('shume'), w('uje'), p('.')),
      L(w('ndoshta'), wf('zot', 'zoti', 'the Lord'), w('sheh'), p('.')),
      L(w('ashtu'), w('eshte'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'sheshiPlak3' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  sheshiPlak3: {
    id: 'sheshiPlak3',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(w('gjithcka'), wf('jam', 'ishte', 'was'), w('mire'), p('.')),
      L(w('une'), wf('jam', 'isha', 'was'), w('i_art'), w('ri'), p('.')),
      L(w('pastaj'), wf('vjen', 'erdhi', 'came'), w('nje'), w('here'), w('e_link'), w('keq'), p('.')),
      L(w('dikush'), wf('thote', 'tha', 'said'), p(':'), w('une'), wf('ik', 'iki', 'leave'), p('.')),
      L(w('as'), w('une'), w('nuk'), w('di'), p('.')),
      L(w('akoma'), w('nuk'), wf('ka', 'kemi', 'have'), w('uje'), p('.')),
      L(w('sikur'), w('ndodh'), w('perseri'), p('.')),
      L(w('asnje'), w('nuk'), w('vjen'), p('.')),
      L(wf('dite', 'ditën', 'the day'), w('e_link'), wf('fund', 'fundit', 'last'), p(','), w('deri'), wf('ne', 'në', 'to'), w('fund'), p(','), w('une'), w('rri'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // The PAZAR — the small market down the street from the square, with the
  // sahat-kulla (the tower of the hour) above it. The square used to carry the
  // market and clock-tower as flavour lines nothing acted on; re-homed here as
  // a place you can walk to, with the two-lek loaf as the everyday economy
  // lesson. The stalls pack up at dusk (the way in is unless: 'night').
  pazari1: {
    id: 'pazari1',
    text: [
      from('sheshiKisha', L(w('ti'), wf('shko', 'shkon', 'go'), wf('ne', 'në', 'to'), w('treg'), p('.'))),
      L(wf('treg', 'tregu', 'the market'), w('eshte'), w('i_art'), w('vogel'), p('.')),
      L(w('nje'), w('kulle'), w('e_link'), wf('ore', 'orës', 'the hour'), w('rri'), wf('lart', 'lart', 'high'), p('.')),
      L(wf('ore', 'ora', 'the hour'), wf('bie', 'bie', 'strikes'), w('cdo'), w('ore'), p('.')),
      unless('night', L(wf('njeri', 'njerëzit', 'the people'), wf('blej', 'blejnë', 'buy'), w('dhe'), wf('shes', 'shesin', 'sell'), p('.'))),
      unless('night', L(w('nje'), w('grua'), wf('shes', 'shet', 'sells'), w('buke'), w('dhe'), w('djathe'), p('.'))),
      when('night', L(w('naten'), wf('treg', 'tregu', 'the market'), w('fle'), p('.'))),
    ],
    options: [
      // two lek buys the loaf — a priced option stays visible when you can't
      // pay (the price tag is part of the lesson), and bread has its uses
      { text: L(w('blej'), w('buke')), unless: 'night', lek: -2, grant: 'buke', to: 'pazari1', reveal: 'buke' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('shesh')), to: 'sheshiKisha' },
    ],
  },

  // The dry well — the village's dead heart, made into a place. Women come with
  // empty jugs; an old woman names the cause the elders give (the Kulshedra hoards
  // the springs below), felt here as the village's daily thirst. The shaft also
  // foreshadows the descent (zbrit në pus → the world below).
  pusiThate: {
    id: 'pusiThate',
    text: [
      L(w('nje'), w('pus'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(w('nje'), w('plake'), w('rri'), w('ketu'), w('po_but'), w('nuk'), w('ka'), w('uje'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('thote'), p(':'), w('kulshedra'), w('poshte'), w('ka'), w('uje'), p('.')),
      L(wf('pus', 'pusi', 'the well'), wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), w('thelle'), p('.')),
      L(w('naten'), wf('xhind', 'Xhindët', 'the jinn'), w('rri'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plake', 'plakën', 'the old woman')), to: 'fshatiSheshi', reveal: 'kulshedra' },
      // waiting for the unseen ones carries you into the dark ("është natën" there)
      { text: L(w('prit'), w('naten')), to: 'xhind1', time: 'night', reveal: 'xhind' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // The back lanes — the second layer of the explorable village: the stone tower
  // (a blood-feud) and the road out past the graves (Constantine & Doruntine).
  // === THE PERIT — white-clad water-mountain nymphs; honour the spring =======
  peri1: {
    id: 'peri1',
    text: [
      L(w('ketu'), w('rri'), w('nje'), w('peri'), p('.')),
      L(wf('peri', 'Peria', 'the fairy'), w('eshte'), w('e_art'), w('uritur'), p('.')),
      L(w('ketu'), w('eshte'), w('buke'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('buke'), w('eshte'), w('e_art'), w('shenjte'), p('.'), wf('zane', 'zanat', 'the fairies'), wf('sheh', 'shohin', 'watch'), wf('buke', 'bukën', 'the bread'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('peri', 'Perisë', 'to the fairy')), to: 'periFund', reveal: 'peri' },
      { text: L(w('hidh'), wf('buke', 'bukën', 'the bread')), to: 'periKeq', reveal: 'buke' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
    ],
  },

  periFund: {
    id: 'periFund',
    end: 'good',
    title: 'The White Fairy of the Heights',
    blurb:
      'On the mountain you met a perí — and learned a traveller’s lesson in words as well as spirits: peri is simply another of the names the Albanians lay on the same white fairies the highlands call zana and orë — not a separate folk, but another word for them. Like all the fairies she watches how mortals treat bread: you broke yours and gave her a share, and for that she let her grace fall on you — the road open and her good will, which is worth having and dangerous to lose. Honour your bread, whatever name the fairy goes by.',
    text: [
      L(w('ti'), w('jep'), w('buke'), wf('peri', 'Perisë', 'to the fairy'), p('.')),
      L(wf('peri', 'Peria', 'the fairy'), w('te_obj'), w('jep'), w('nje'), w('bekim'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  periKeq: {
    id: 'periKeq',
    end: 'bad',
    title: 'The Wasted Bread',
    blurb:
      'You threw your bread to the ground before a Peri — a white-clad fairy of the heights — and of all things the perí cannot forgive the wasting of bread. They bend the squanderer into a crooked hunchback and wither the careless hand. You went down the mountain twisted and cursed; the old people would have shared the last crust with a stranger sooner than let one crumb fall to waste.',
    text: [
      L(w('ti'), w('hidh'), wf('buke', 'bukën', 'the bread'), p('.')),
      L(wf('peri', 'Peria', 'the fairy'), w('te_obj'), w('mallko'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === THE XHINDI — invisible threshold/water jinn (the Ottoman layer) =======
  xhind1: {
    id: 'xhind1',
    text: [
      L(w('eshte'), w('naten'), p('.')),
      L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('prag'), p('.')),
      L(wf('xhind', 'Xhindët', 'the jinn'), wf('je', 'janë', 'are'), w('ketu'), p('.')),
      L(w('ti'), w('nuk'), w('sheh'), wf('xhind', 'Xhindët', 'the jinn'), p('.')),
      L(wf('ne', 'në', 'on'), w('prag'), w('eshte'), wf('uje', 'ujë', 'water'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kush'), w('hidh'), wf('uje', 'ujë', 'water'), w('naten'), p(','), w('behet'), wf('semur', 'i sëmurë', 'sick'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ngadale')), to: 'xhindFund', reveal: 'prag' },
      { text: L(w('hidh'), wf('uje', 'ujë', 'water')), to: 'xhindKeq', reveal: 'prag' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pus')), to: 'pusiThate' },
    ],
  },

  xhindFund: {
    id: 'xhindFund',
    end: 'good',
    title: 'The Unseen of the Threshold',
    blurb:
      'You crossed the threshold softly in the dark, and did not pour your water out or stamp where you could not see — for the Xhindi, the invisible jinn that Albanian belief took from its Ottoman neighbours, haunt the doorstep, the hearth-ash, and the well in the dead of night, and an unclean or careless foot among them brings sickness on the house. You stepped with respect, and the unseen ones let you pass. At the threshold and the water, after dark, the wise move gently.',
    text: [
      L(w('ti'), w('ec'), w('ngadale'), p('.')),
      L(wf('xhind', 'Xhindët', 'the jinn'), wf('le', 'të lënë', 'let you'), wf('ik', 'ikësh', 'go'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  xhindKeq: {
    id: 'xhindKeq',
    end: 'bad',
    title: 'The Anger of the Xhindi',
    blurb:
      'You flung your water out into the night across the threshold where the Xhindi gather, and the unseen ones took it for an insult. These invisible night-spirits — kin to the jinn of Islamic belief, dwelling on the doorstep and by the water — answer carelessness with a sudden fever, a crooked mouth, a wasting in the house. You woke ill and did not know why. After dark, the old people say, you do not pour water out at a threshold, nor tread where the Xhindi may be.',
    text: [
      L(w('ti'), w('hidh'), wf('uje', 'ujë', 'water'), p('.')),
      L(wf('xhind', 'Xhindët', 'the jinn'), w('te_obj'), w('mallko'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === NËNA E DIELLIT — the funeral of the Sun's Mother (spring renewal).
  // Reached from veraDite1: the Day-of-Summer feast gathers the spring rites,
  // so the square itself stays uncluttered. ======
  nenaDiell1: {
    id: 'nenaDiell1',
    text: [
      L(wf('vajze', 'vajzat', 'the girls'), wf('bej', 'bëjnë', 'make'), w('nje'), w('kukull'), w('balte'), p('.')),
      L(wf('kukull', 'kukulla', 'the doll'), w('eshte'), wf('nene', 'Nëna', 'Mother'), w('e_link'), wf('diell', 'Diellit', 'the Sun'), p('.')),
      L(wf('vajze', 'vajzat', 'the girls'), wf('kendo', 'këndojnë', 'sing'), w('dhe'), wf('vajto', 'vajtojnë', 'weep'), p('.')),
      L(wf('vajze', 'vajzat', 'the girls'), wf('kendo', 'këndojnë', 'sing'), p(':'), w('nene'), p(','), wf('diell', 'dielli', 'the sun'), w('vjen'), w('dhe'), w('nuk'), w('te_obj'), w('sheh'), p('.')),
    ],
    options: [
      { text: L(w('varros'), wf('nene', 'Nënën', 'the Mother'), w('e_link'), wf('diell', 'Diellit', 'the Sun')), to: 'nenaDiellFund', reveal: 'kukull' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('feste')), to: 'veraDite1' },
    ],
  },

  nenaDiellFund: {
    id: 'nenaDiellFund',
    end: 'secret',
    title: 'The Funeral of the Sun’s Mother',
    blurb:
      'You kept the strangest and gentlest of the old spring rites: the funeral of Nëna e Diellit, the Mother of the Sun — a mother-goddess of the sky, the fields and the herds. At the close of the spring cycle, near Pentecost, the girls of the village mould a little doll of clay, name her the Sun’s Mother, and carry her out beyond the houses to bury her with real weeping and a real lament — "Mother, oh Mother, the Sun came and did not find you." It is the goddess’s own death and burial, so that, mourned and laid to rest, she may return green with the turning year. You wept her down into the earth, and summer climbed up behind her.',
    text: [
      L(w('ti'), w('varros'), wf('nene', 'Nënën', 'the Mother'), w('e_link'), wf('diell', 'Diellit', 'the Sun'), p('.')),
      L(wf('vajze', 'vajzat', 'the girls'), wf('vajto', 'vajtojnë', 'weep'), p('.')),
      L(w('vere'), w('vjen'), w('perseri'), p('.')),
    ],
    options: [],
  },

  // === THE KARKANXHOLL — iron-clad night-revenant; do not answer ==============
  karkanxholl1: {
    id: 'karkanxholl1',
    text: [
      L(w('naten'), w('nje'), w('karkanxholl'), w('troket'), p('.')),
      L(wf('karkanxholl', 'karkanxholli', 'the revenant'), w('ka'), w('nje'), wf('kemishe', 'këmishë', 'shirt'), wf('hekur', 'hekuri', 'of iron'), p('.')),
      L(wf('karkanxholl', 'karkanxholli', 'the revenant'), wf('thirr', 'thërret', 'calls'), wf('emer', 'emrin', 'the name'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('mos'), w('hap'), wf('dere', 'derën', 'the door'), p('.'), w('mos'), w('fol'), p('.'), w('kush'), w('flet'), p(','), wf('ik', 'ikën', 'is taken'), p('.')),
    ],
    options: [
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'karkanxhollFund' },
      { text: L(w('fol')), to: 'karkanxhollKeq', reveal: 'karkanxholl' },
    ],
  },

  karkanxhollFund: {
    id: 'karkanxhollFund',
    end: 'secret',
    title: 'The Caller at the Door',
    blurb:
      'In the dead of the twelve dark nights between Christmas and Epiphany, the karkanxholl walks — a small iron-shirted revenant dragging its chains through the snow. It knocks and it calls; whoever opens the door or answers the name is cursed or carried off. You kept the door barred, held your tongue, and gave it nothing, and at cock-crow it went back into the dark.',
    text: [
      L(w('ti'), w('rri'), w('i_art'), w('qete'), p('.')),
      L(wf('karkanxholl', 'karkanxholli', 'the revenant'), w('ik'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  karkanxhollKeq: {
    id: 'karkanxhollKeq',
    end: 'bad',
    title: 'Answered in the Night',
    blurb:
      'It called your name through the door, and you answered — the one thing the old people forbid on those twelve haunted nights. The karkanxholl, the iron-shirted thing that walks between Christmas and Epiphany, takes those who answer it. You were never seen again; in the spring they found only your name, worn smooth on everyone’s lips, and no one left to wear it.',
    text: [
      L(w('ti'), wf('thote', 'thua', 'say'), w('po_yes'), p('.')),
      L(wf('karkanxholl', 'karkanxholli', 'the revenant'), w('te_obj'), w('merr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === THE FOX (Kuma Lisa) — the trickster who frames the wolf ================
  dhelpra1: {
    id: 'dhelpra1',
    text: [
      L(w('nje'), w('dhelpra'), w('dhe'), w('nje'), w('ujk'), wf('ka', 'kanë', 'have'), w('gjalpe'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), w('thote'), p(':'), w('une'), wf('shko', 'shkoj', 'go'), wf('ne', 'në', 'to'), w('pagezim'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), w('ha'), wf('gjalpe', 'gjalpën', 'the butter'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), wf('quhem', 'quhet', 'is called'), w('kumaLisa'), p('.')),
    ],
    options: [
      { text: L(w('sheh'), wf('dhelpra', 'dhelprën', 'the fox')), to: 'dhelpra2', reveal: 'dhelpra' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylliLoop' },
    ],
  },

  dhelpra2: {
    id: 'dhelpra2',
    text: [
      L(w('gjalpe'), w('nuk'), w('eshte'), w('ketu'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('ka'), w('gjalpe'), wf('ne', 'në', 'on'), w('goje'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), w('thote'), p(':'), wf('ujk', 'ujku', 'the wolf'), w('ha'), wf('gjalpe', 'gjalpën', 'the butter'), p('!')),
    ],
    options: [
      { text: L(w('mos'), w('beso'), wf('dhelpra', 'dhelprën', 'the fox')), to: 'dhelpraFund', reveal: 'dhelpra' },
      { text: L(w('beso'), wf('dhelpra', 'dhelprën', 'the fox')), to: 'dhelpraKeq', reveal: 'dhelpra' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylliLoop' },
    ],
  },

  dhelpraFund: {
    id: 'dhelpraFund',
    end: 'good',
    title: 'Kuma Lisa Caught Out',
    blurb:
      'The fox and the wolf had laid up a pot of butter for the winter, and all through the autumn the fox kept slipping away — "I have been asked to a christening," she would say — and licking the pot lower with each visit. When it was empty she smeared the last of it on the sleeping wolf’s mouth and cried thief. You were not fooled: the planted butter is the oldest trick of Kuma Lisa, the she-fox of a hundred Balkan tales, and she wins only over those who believe her. The wolf went free, and the fox slunk off hungry.',
    text: [
      L(w('ti'), w('nuk'), wf('beso', 'beson', 'believe'), wf('dhelpra', 'dhelprën', 'the fox'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), w('ha'), wf('gjalpe', 'gjalpën', 'the butter'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('eshte'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  dhelpraKeq: {
    id: 'dhelpraKeq',
    end: 'secret',
    title: 'The Fox’s Christening',
    blurb:
      'You believed her — the butter was on the wolf’s own mouth, after all — and the wolf was driven off a thief while the fox licked her whiskers. That is Kuma Lisa, the godmother fox of the old tales, forever slipping away to a christening that is really the butter-pot: her tricks are old and simple, and they work on no one but the man who believes her. No one died; but a guiltless beast was wronged, and somewhere a fox is laughing.',
    text: [
      L(w('ti'), wf('beso', 'beson', 'believe'), wf('dhelpra', 'dhelprën', 'the fox'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), w('ha'), wf('gjalpe', 'gjalpën', 'the butter'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('humbet'), wf('gjalpe', 'gjalpën', 'the butter'), p('.')),
    ],
    options: [],
  },

  // === NASTRADIN II — the smell of the food, the sound of the coin ===========
  nastradinGjyq1: {
    id: 'nastradinGjyq1',
    text: [
      L(w('nje'), w('njeri'), w('ha'), wf('ere', 'erën', 'smell'), w('e_link'), wf('ushqim', 'ushqimit', 'the food'), p('.')),
      L(wf('kuzhinier', 'kuzhinieri', 'the cook'), w('do'), w('ar'), p('.')),
      L(wf('hoxha', 'hoxha', 'the hodja'), w('merr'), w('ar'), p('.')),
      L(wf('hoxha', 'hoxha', 'the hodja'), w('thote'), p(':'), w('ti'), w('ha'), wf('ere', 'erën', 'smell'), p(','), w('ti'), wf('degjo', 'dëgjon', 'hear'), wf('ar', 'arin', 'the gold'), p('.')),
    ],
    options: [
      { text: L(wf('tund', 'tund', 'shake'), wf('ar', 'arin', 'the gold')), to: 'nastradinGjyqFund', reveal: 'kuzhinier' },
      { text: L(w('jep'), w('ar'), wf('kuzhinier', 'kuzhinierit', 'to the cook')), to: 'nastradinGjyqKeq', reveal: 'kuzhinier' },
      { text: L(w('kthehu')), to: 'nastradin1' },
    ],
  },

  nastradinGjyqFund: {
    id: 'nastradinGjyqFund',
    end: 'secret',
    title: 'The Sound of the Coin',
    blurb:
      'A poor man had warmed his dry bread in the steam of the cook’s pot, breathing the smell of the soup, and the cook hauled him before Nastradin Hoxha demanding to be paid for the aroma. The hodja heard them out, drew a coin from his pocket, shook it so it rang beside the cook’s ear, and pocketed it again: "The sound of the coin pays for the smell of the food." A debt of nothing, settled with a coin of nothing — and the whole bazaar laughed the greedy cook home.',
    text: [
      L(w('ti'), wf('tund', 'tund', 'shake'), wf('ar', 'arin', 'the gold'), p('.')),
      L(wf('kuzhinier', 'kuzhinieri', 'the cook'), wf('degjo', 'degjon', 'hears'), w('nje'), w('ze'), p('.')),
      L(w('nje'), w('ze'), w('per'), w('nje'), wf('ere', 'erë', 'smell'), p('.')),
    ],
    options: [],
  },

  nastradinGjyqKeq: {
    id: 'nastradinGjyqKeq',
    end: 'secret',
    title: 'Paid for the Smell',
    blurb:
      'You took the cook’s side and made the poor man pay real gold for a smell he could not help breathing. The cook went home rich on nothing, and a hungry man went home poorer — the very injustice Nastradin’s ringing coin was invented to mock. Some judgments cost more than they settle.',
    text: [
      L(w('ti'), w('jep'), w('ar'), wf('kuzhinier', 'kuzhinierit', 'to the cook'), p('.')),
      L(w('ti'), w('jep'), w('ar'), w('per'), w('nje'), wf('ere', 'erë', 'smell'), p('.')),
    ],
    options: [],
  },

  // === ZUKU & RUSHA — the bride won by the besa, not the sword ===============
  rusha1: {
    id: 'rusha1',
    text: [
      L(w('rusha'), w('eshte'), wf('bije', 'bija', 'the daughter'), w('e_link'), wf('krajl', 'krajlit', 'the Krajl'), p('.')),
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'in'), wf('kulle', 'kullën', 'the tower'), w('e_link'), wf('krajl', 'krajlit', 'the Krajl'), p('.')),
      L(w('rusha'), w('jep'), w('kafe'), p('.')),
      L(w('une'), wf('thote', 'them', 'say'), p(':'), wf('premto', 'premto', 'swear'), w('nje'), w('bese'), p(':'), w('ti'), w('vjen'), w('me'), w('zemer'), p(','), w('ose'), w('ti'), w('rri'), p('.')),
    ],
    options: [
      { text: L(w('kerko'), w('bese')), to: 'rushaFund', reveal: 'rusha' },
      { text: L(w('merr'), wf('rusha', 'Rushën', 'Rusha'), w('pa'), w('bese')), to: 'rushaKeq', reveal: 'rusha' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  rushaFund: {
    id: 'rushaFund',
    end: 'good',
    title: 'Rusha of the Krajl',
    blurb:
      'Like Zuku Bajraktar in the old song, you rode into the Krajl’s tower for Rusha, his daughter across the frontier; and when she brought you coffee you would not take her away until she swore you the besa — God’s own oath — that she came of her free will. She gave her word, climbed up behind you, and you rode for Jutbina — a bride won not by the sword but by the sworn word. (What Muji made of it when you came home, the old singers leave for another night.)',
    text: [
      L(w('rusha'), w('jep'), w('nje'), w('bese'), p('.')),
      L(w('rusha'), w('vjen'), w('me'), w('ti'), p('.')),
      L(w('ti'), w('dhe'), w('rusha'), w('ec'), wf('ne', 'në', 'to'), w('jutbina'), p('.')),
    ],
    options: [],
  },

  rushaKeq: {
    id: 'rushaKeq',
    end: 'bad',
    title: 'Taken Without the Oath',
    blurb:
      'You reached for Rusha without waiting for her besa, and a maiden carried off by force from the Krajl’s tower is a war, not a wedding. Her cry brought the Krajl and all his guard; you were cut down on his own stair, your boast unkept and your head left behind just as you swore it would be. The kreshnik wins the enemy’s daughter by binding her with the sacred oath — never by the grab that any brigand could make.',
    text: [
      L(w('ti'), w('merr'), wf('rusha', 'Rushën', 'Rusha'), w('pa'), w('bese'), p('.')),
      L(wf('krajl', 'krajli', 'the Krajl'), w('godit'), w('ti'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === HALILI AVENGES MUJI — the younger brother takes the blood =============
  halil1: {
    id: 'halil1',
    text: [
      L(wf('krajl', 'krajli', 'a Krajl'), w('merr'), wf('mujo', 'Mujon', 'Muji'), p('.')),
      L(w('mujo'), w('eshte'), wf('ne', 'në', 'in'), w('burg'), p('.')),
      L(w('halil'), w('eshte'), wf('vetem', 'vetëm', 'alone'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('burg')), to: 'halilFund', reveal: 'burg' },
      { text: L(w('rri'), wf('ne', 'në', 'in'), w('jutbina')), to: 'halilKeq' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('maja')), to: 'maja' },
    ],
  },

  halilFund: {
    id: 'halilFund',
    end: 'good',
    title: 'Halili Frees Muji',
    blurb:
      'The Krajl took Muji of Jutbina and threw him in a tower, and for once the elder kreshnik could not free himself — so Halili rode alone into the Krajl’s land, broke into the prison, fought his way through, and carried his brother home. That is Sokol Halili, the second pillar the whole epic stands on: Muji’s younger brother and inseparable comrade, youthful, dashing and impetuous where Muji is brute strength. The songs give Halili a cycle of his own — his marriage, his feats, his death. A shadow no longer.',
    text: [
      L(w('halil'), w('shko'), wf('ne', 'në', 'to'), w('burg'), p('.')),
      L(w('halil'), wf('lufto', 'lufton', 'fights'), wf('krajl', 'krajlin', 'the Krajl'), p('.')),
      L(w('halil'), wf('shpeto', 'shpëton', 'frees'), wf('mujo', 'Mujon', 'Muji'), p('.')),
    ],
    options: [],
  },

  halilKeq: {
    id: 'halilKeq',
    end: 'secret',
    title: 'The Blood Untaken',
    blurb:
      'You let Halili sit in the hall while Muji lay in the Krajl’s chains, and no one rode to bring him home. Among the kreshniks that is the one unbearable thing: a brother left in irons while the lahutë waits for a rescue that never comes. Muji of Jutbina grew old in a foreign tower, and the song had no second half to sing.',
    text: [
      L(w('ti'), w('rri'), wf('ne', 'në', 'in'), w('jutbina'), p('.')),
      L(w('mujo'), w('rri'), wf('ne', 'në', 'in'), w('burg'), p('.')),
      L(w('halil'), w('nuk'), wf('shpeto', 'shpëton', 'frees'), wf('mujo', 'Mujon', 'Muji'), p('.')),
    ],
    options: [],
  },

  arushe2: {
    id: 'arushe2',
    text: [
      L(w('dervish'), w('shtrydh'), w('nje'), w('djathe'), p('.')),
      L(w('uje'), wf('dil', 'del', 'comes out'), p('.')),
      L(w('arushe'), w('thote'), p(':'), w('ti'), w('je'), w('i_art'), w('forte'), p('!')),
    ],
    options: [
      { text: L(w('mashtro'), wf('arushe', 'arushën', 'the bear')), to: 'arushePeme', reveal: 'arushe' },
      { text: L(w('lufto'), wf('arushe', 'arushën', 'the bear')), to: 'humbur', reveal: 'arushe' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylli1' },
    ],
  },

  // === THE SUN'S DAUGHTER (Elsie tale 22) — REGION A: the village ============
  // The black palace (bookend: locked at the start, the reunion at the end), the
  // two villagers who explain the loss & the promise, and the book that names the road.
  pallatiZi: {
    id: 'pallatiZi',
    text: [
      L(w('ketu'), w('eshte'), w('nje'), w('pallat'), w('i_art'), w('zi'), p('.')),
      unless('vajza', L(wf('dere', 'dera', 'the door'), w('nuk'), wf('hap', 'hapet', 'opens'), p('.'))),
      unless('vajza', L(w('nje'), w('roje'), wf('rri', 'rri', 'stands'), w('ketu'), p('.'))),
      when('vajza', L(wf('vajze', 'vajza', 'the maiden'), w('thote'), p(':'), w('nene'), p(','), wf('hap', 'hap', 'open'), wf('dere', 'derën', 'the door'), p('!'))),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('roje', 'rojen', 'the guard')), to: 'pallatRoje', reveal: 'pallat', unless: 'vajza' },
      { text: L(wf('hap', 'hap', 'open'), wf('dere', 'derën', 'the door')), to: 'pallatiKthim', requires: 'vajza' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiLanes' },
    ],
  },

  pallatRoje: {
    id: 'pallatRoje',
    text: [
      L(wf('roje', 'roja', 'the guard'), w('thote'), p(':')),
      L(w('ti'), w('nuk'), w('mund'), w('te_subj'), wf('hyr', 'hysh', 'enter'), wf('ne', 'në', 'to'), w('pallat'), p('.')),
    ],
    options: [
      { text: L(w('pse'), wf('pallat', 'pallati', 'the palace'), w('eshte'), w('i_art'), w('zi'), p('?')), to: 'pallatRojeZi' },
      { text: L(w('pse'), w('nuk'), wf('hyr', 'hyj', 'enter'), p('?')), to: 'pallatRojePse' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pallat')), to: 'pallatiZi' },
    ],
  },

  pallatRojeZi: {
    id: 'pallatRojeZi',
    text: [
      L(wf('roje', 'roja', 'the guard'), w('thote'), p(':')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), wf('vajto', 'vajton', 'weeps'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), wf('bej', 'bën', 'makes'), wf('pallat', 'pallatin', 'the palace'), w('zi'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('tek', 'te', 'to'), wf('roje', 'rojen', 'the guard')), to: 'pallatRoje' },
    ],
  },

  pallatRojePse: {
    id: 'pallatRojePse',
    text: [
      L(wf('roje', 'roja', 'the guard'), w('thote'), p(':')),
      L(w('diell'), w('merr'), wf('bije', 'bijën', 'the daughter'), w('e_link'), wf('mbreteresha', 'mbretëreshës', 'the queen'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('pa'), w('femije'), wf('premto', 'premtoi', 'promised'), wf('bije', 'bijën', 'the daughter'), wf('diell', 'Diellit', 'to the Sun'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), wf('vajto', 'vajton', 'weeps'), w('sepse'), w('diell'), w('merr'), wf('bije', 'bijën', 'the daughter'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('tek', 'te', 'to'), wf('roje', 'rojen', 'the guard')), to: 'pallatRoje' },
    ],
  },

  libriDiell: {
    id: 'libriDiell',
    text: [
      L(wf('liber', 'libri', 'the book'), w('thote'), p(':')),
      L(wf('shtepi', 'shtëpia', 'the house'), w('e_link'), wf('diell', 'diellit', 'the Sun'), w('eshte'), wf('lart', 'lart', 'high'), p('.')),
      L(w('ec'), w('mbi'), wf('rreze', 'rrezet', 'the rays'), w('e_link'), wf('diell', 'diellit', 'the Sun'), p('.')),
      L(w('nga'), w('maja'), w('e_link'), w('tomor'), p('.')),
    ],
    options: [
      { text: L(w('dil'), w('jashte')), to: 'oda1' },
    ],
  },

  pallatiKthim: {
    id: 'pallatiKthim',
    end: 'good',
    title: 'The Maiden Brought Home',
    blurb:
      'You brought the queen’s daughter home. A childless queen had prayed to the Sun and promised her girl at twelve; when the day came the Sun carried her off to his house in the sky, and her grieving mother had the whole palace painted black and shut her door on the world. You read the old book, walked the road that runs on the Sun’s own rays from the peak of Tomorr, and out of his house — past the Kulshedra that would have devoured her — you brought her home on the antlers of a stag. The black is washed from the walls now; the door that had not opened in years swings wide, and the queen carries out to the stag the three okas of fresh hay it asked in return. (In this old tale the Sun is no tyrant — it was he who summoned the stag to bear her safely home.)',
    text: [
      L(wf('dere', 'dera', 'the door'), wf('hap', 'hapet', 'opens'), p('.')),
      L(wf('pallat', 'pallati', 'the palace'), w('nuk'), w('eshte'), w('i_art'), w('zi'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('ka'), wf('bije', 'bijën', 'the daughter'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('sjell'), w('kashte'), wf('dre', 'dreut', 'to the stag'), p('.')),
    ],
    options: [],
  },

  // === REGION C: the Sun's house (open hub) =================================
  diellShtepi1: {
    id: 'diellShtepi1',
    text: [
      // the sunbeam-road is walked only on the way up from the peak
      from('maja', L(w('ti'), w('ec'), w('mbi'), wf('rreze', 'rrezet', 'the rays'), w('e_link'), wf('diell', 'diellit', 'the Sun'), p('.'))),
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), wf('shtepi', 'shtëpia', 'the house'), w('e_link'), wf('diell', 'diellit', 'the Sun'), p('.')),
      L(w('nje'), w('kulshedra'), w('eshte'), w('ketu'), p('.')),
      L(w('kulshedra'), w('thote'), p(':'), wf('vajze', 'vajza', 'the maiden'), w('mban'), wf('ere', 'erë', 'smell'), wf('mbret', 'mbreti', 'of a king'), p('!')),
      L(w('diell'), w('thote'), p(':'), w('mos'), w('prek'), wf('vajze', 'vajzën', 'the maiden'), p('!')),
      L(w('nje'), w('kopsht'), w('eshte'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('kopsht')), to: 'diellKopsht', reveal: 'kopsht' },
      { text: L(w('fol'), w('me'), wf('diell', 'diellin', 'the Sun')), to: 'diellOda', reveal: 'diell' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('maja')), to: 'maja' },
    ],
  },

  diellKopsht: {
    id: 'diellKopsht',
    text: [
      L(w('ketu'), w('eshte'), w('nje'), w('kopsht'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('merr'), w('nje'), w('laker'), p('.')),
      L(wf('laker', 'lakra', 'the cabbage'), w('thyhet'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('thote'), p(':'), wf('zemer', 'zemra', 'the heart'), w('e_link'), wf('nene', 'nënës', 'mother'), w('thyhet'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), wf('vajto', 'vajton', 'weeps'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('vajze', 'vajzën', 'the maiden')), to: 'diellKopshtFol', reveal: 'kopsht' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('shtepi', 'shtëpinë', 'the house')), to: 'diellShtepi1' },
    ],
  },

  diellKopshtFol: {
    id: 'diellKopshtFol',
    text: [
      L(w('ti'), w('thote'), p(':'), w('ti'), w('do'), wf('nene', 'nënën', 'your mother'), p('?')),
      L(wf('vajze', 'vajza', 'the maiden'), w('thote'), p(':'), w('po_yes'), p(','), w('une'), w('do'), wf('nene', 'nënën', 'my mother'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('thote'), p(':'), w('fol'), w('me'), wf('diell', 'diellin', 'the Sun'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('diell', 'diellin', 'the Sun')), to: 'diellOda', reveal: 'diell' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('kopsht')), to: 'diellKopsht' },
    ],
  },

  diellOda: {
    id: 'diellOda',
    text: [
      L(w('ti'), w('lut'), wf('diell', 'diellin', 'the Sun'), w('per'), wf('vajze', 'vajzën', 'the maiden'), p('.')),
      L(w('diell'), w('thote'), p(':'), w('thirr'), w('nje'), w('kafshe'), p('.')),
    ],
    options: [
      { text: L(w('thirr'), w('nje'), w('kafshe')), to: 'diellThirrKul', reveal: 'kafshe' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('shtepi', 'shtëpinë', 'the house')), to: 'diellShtepi1' },
    ],
  },

  diellThirrKul: {
    id: 'diellThirrKul',
    text: [
      L(w('nje'), w('kulshedra'), w('vjen'), p('.')),
      L(w('kulshedra'), w('thote'), p(':'), w('une'), w('ha'), wf('vajze', 'vajzën', 'the maiden'), p('!')),
      L(w('kulshedra'), w('thote'), p(':'), w('une'), w('pi'), wf('gjak', 'gjakun', 'the blood'), p('!')),
      L(w('diell'), w('thote'), p(':'), w('jo'), w('kulshedra'), p('!')),
      L(w('diell'), w('thote'), p(':'), w('thirr'), w('nje'), w('dre'), p('.')),
    ],
    options: [
      { text: L(w('thirr'), wf('dre', 'dreun', 'the stag')), to: 'rrugaDielli1' },
      { text: L(w('mban'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'diellKulVdes', reveal: 'kulshedra' },
    ],
  },

  diellKulVdes: {
    id: 'diellKulVdes',
    end: 'bad',
    title: 'The Wrong Beast',
    blurb:
      'The Sun himself warned you. He summoned the dragon first and put it to the test — "If you were hungry, what would you eat?" "I’d eat her." "And if you were thirsty?" "I’d drink her blood." — and told you to call a stag instead. You kept the Kulshedra anyway, and it carried the maiden off exactly the way it had promised: into its own belly. She was promised to the Sun, who was shielding her; the only way to lose her was to overrule him.',
    text: [
      L(w('ti'), w('mban'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(w('kulshedra'), w('merr'), wf('vajze', 'vajzën', 'the maiden'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === REGION D: the road home (open ride) ==================================
  rrugaDielli1: {
    id: 'rrugaDielli1',
    text: [
      L(w('dre'), w('thote'), p(':'), w('une'), w('ha'), w('bar'), p('.')),
      L(w('dre'), w('thote'), p(':'), w('une'), w('pi'), w('uje'), p('.')),
      L(w('dre'), w('thote'), p(':'), wf('nene', 'nëna', 'the mother'), w('sjell'), w('kashte'), p('.')),
      L(w('dre'), w('merr'), wf('vajze', 'vajzën', 'the maiden'), wf('ne', 'në', 'on'), wf('bri', 'brirë', 'antlers'), p('.')),
      L(w('dre'), w('eshte'), w('uritur'), p('.')),
      L(w('dre'), w('thote'), p(':'), w('hip'), wf('ne', 'në', 'in'), wf('peme', 'pemë', 'tree'), p('!')),
    ],
    options: [
      { text: L(w('hip'), wf('ne', 'në', 'in'), wf('peme', 'pemën', 'tree')), to: 'pemaDielli', reveal: 'peme' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('shtepi', 'shtëpinë', 'the house')), to: 'diellShtepi1' },
    ],
  },

  pemaDielli: {
    id: 'pemaDielli',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), wf('peme', 'pemën', 'tree'), p('.')),
      L(w('nje'), w('kulshedra'), w('vjen'), p('.')),
      L(w('kulshedra'), w('thote'), p(':'), w('zbrit'), p('!')),
    ],
    options: [
      { text: L(wf('thote', 'thuaj', 'say'), w('ti'), w('shko'), wf('ne', 'në', 'to'), w('shtepi')), to: 'rrugaDielli2' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'pemaVdes', reveal: 'kulshedra' },
    ],
  },

  pemaVdes: {
    id: 'pemaVdes',
    end: 'bad',
    title: 'Down From the Tree',
    blurb:
      'The Kulshedra called sweetly — "Come on down, so that we can talk" — and the maiden came down. In the old tale she knows better: she stalls it ("You run home first and I’ll climb down when you return") and waits for the stag. Down from the tree there was no stag to save her, only the open jaws that had followed them the whole road home.',
    text: [
      L(wf('vajze', 'vajza', 'the maiden'), w('zbrit'), p('.')),
      L(w('kulshedra'), w('ha'), wf('vajze', 'vajzën', 'the maiden'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  rrugaDielli2: {
    id: 'rrugaDielli2',
    text: [
      L(w('kulshedra'), w('shko'), wf('ne', 'në', 'to'), w('shtepi'), p('.')),
      L(w('dre'), w('vjen'), w('perseri'), p('.')),
      L(w('dre'), w('do'), w('kashte'), p('.'), wf('mbreteresha', 'mbretëresha', 'the queen'), w('sjell'), w('kashte'), p('.')),
      L(w('nje'), w('njeri'), w('thote'), p(':'), w('diell'), wf('thirr', 'thirri', 'called'), w('dre'), p('.')),
      L(w('dre'), w('merr'), wf('vajze', 'vajzën', 'the maiden'), wf('ne', 'në', 'on'), wf('bri', 'brirë', 'antlers'), p('.')),
      L(w('dre'), w('ik'), w('nga'), w('kulshedra'), p('.')),
      L(w('nje'), w('njeri'), w('thote'), p(':'), w('kulshedra'), w('ec'), wf('rruge', 'rrugë', 'road'), w('tjeter'), p('!')),
      L(w('ti'), w('dhe'), wf('vajze', 'vajza', 'the maiden'), w('je'), wf('ne', 'në', 'in'), wf('fshat', 'fshatin', 'the village'), p('.')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), grant: 'vajza', to: 'fshatiLanes' },
    ],
  },

  // === ACT II (Elsie tale 22, second movement): the marble king, the false
  // bride, the goose-girl. Reachable from the palace lane.
  kopshtMermer1: {
    id: 'kopshtMermer1',
    text: [
      L(w('ketu'), w('eshte'), w('nje'), w('kopsht'), w('mermer'), p('.')),
      L(wf('vajze', 'vajzat', 'the girls'), wf('do', 'duan', 'want'), w('te_subj'), wf('luan', 'luajnë', 'plays'), p('.')),
      L(w('nje'), wf('dere', 'dera', 'the door'), w('nuk'), wf('hap', 'hapet', 'opens'), p('.')),
    ],
    options: [
      { text: L(w('prek'), wf('dere', 'derën', 'the door')), to: 'kopshtMermer2', reveal: 'mermer' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiLanes' },
    ],
  },

  kopshtMermer2: {
    id: 'kopshtMermer2',
    text: [
      L(wf('dere', 'dera', 'the door'), wf('hap', 'hapet', 'opens'), w('per'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('brenda'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('je', 'janë', 'are'), w('mermer'), p('.')),
      L(w('nje'), w('mbret'), w('mermer'), w('rri'), w('ketu'), p('.')),
      L(wf('liber', 'libri', 'the book'), w('thote'), p(':'), w('rri'), w('zgjuar'), w('tre'), wf('naten', 'net', 'nights'), p(','), w('dhe'), wf('mbret', 'mbreti', 'the king'), wf('zgjohu', 'zgjohet', 'wakes'), p('.')),
    ],
    options: [
      { text: L(w('rri'), w('zgjuar')), to: 'mermerZgjim', reveal: 'zgjuar' },
      { text: L(w('fle'), w('ketu')), to: 'mermerSli' },
    ],
  },

  mermerZgjim: {
    id: 'mermerZgjim',
    text: [
      L(w('ti'), w('rri'), w('zgjuar'), p('.')),
      L(w('tre'), wf('naten', 'net', 'nights'), wf('kalo', 'kalojnë', 'pass'), p('.')),
      L(w('nje'), w('njeri'), w('jep'), w('nje'), w('sherbetore'), p('.')),
      L(w('ti'), w('do'), w('te_subj'), w('fle'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('sherbetore', 'sherbetoren', 'the servant')), to: 'mermerTradheti', reveal: 'sherbetore' },
      { text: L(w('fle'), w('ketu')), to: 'mermerSli' },
    ],
  },

  mermerTradheti: {
    id: 'mermerTradheti',
    text: [
      L(w('ti'), w('fle'), p('.')),
      L(wf('sherbetore', 'sherbetorja', 'the servant'), w('merr'), wf('rrobe', 'rrobat', 'the clothes'), w('e_link'), w('ti'), p('.')),
      L(w('mbret'), wf('zgjohu', 'zgjohet', 'wakes'), p('.')),
      L(wf('sherbetore', 'sherbetorja', 'the servant'), w('thote'), p(':'), w('une'), w('rri'), w('zgjuar'), p('.')),
      L(w('mbret'), wf('marto', 'marton', 'marries'), wf('sherbetore', 'sherbetoren', 'the servant'), p('.')),
    ],
    options: [
      { text: L(w('vazhdon')), to: 'patatGruaja' },
    ],
  },

  patatGruaja: {
    id: 'patatGruaja',
    text: [
      L(w('ti'), w('ruan'), wf('pate', 'patat', 'the geese'), p('.')),
      L(w('ti'), w('rri'), wf('ne', 'në', 'in'), w('nje'), w('shtepi'), w('e_art'), w('vogel'), p('.')),
      L(w('ti'), wf('vajto', 'vajton', 'weep'), p('.')),
      L(w('ti'), w('flet'), w('me'), w('nje'), w('gur'), p('.'), wf('gur', 'guri', 'the stone'), wf('degjo', 'dëgjon', 'listens'), p('.')),
    ],
    options: [
      { text: L(w('kendo'), wf('pate', 'patave', 'to the geese')), to: 'mbretiDrejtesi', reveal: 'pate' },
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'patatHesht' },
    ],
  },

  mbretiDrejtesi: {
    id: 'mbretiDrejtesi',
    end: 'good',
    title: 'The Goose-Girl and the Marble King',
    blurb:
      'A locked garden opened for one girl alone and shut her in among people and beasts of marble, with a marble king and his scroll: whoever stays awake three days, three nights and three weeks will bring him back to life. You kept the long vigil — but worn out at the last, you bought a maidservant to watch while you slept, and she stole your place: dressed in your clothes, she told the waking king she was the one who had kept watch, and he married her. Demoted to goose-girl, you wept your true tale in your little hut until the king himself overheard, learned who had really woken him, took you for his wife, and had the false bride executed. The patient one is known in the end, however long the lie wears her clothes.',
    text: [
      L(w('mbret'), wf('degjo', 'degjon', 'hears'), w('ti'), p('.')),
      L(w('mbret'), wf('marto', 'marton', 'marries'), w('ti'), p('.')),
      L(wf('sherbetore', 'sherbetorja', 'the servant'), w('vdes'), p('.')),
    ],
    options: [],
  },

  patatHesht: {
    id: 'patatHesht',
    end: 'bad',
    title: 'The Silent Goose-Girl',
    blurb:
      'You held your tongue. In the old tale the goose-girl weeps her woes aloud in her hut, and the king overhears and the truth comes out; you kept yours behind your teeth, and a truth never spoken changes nothing. The false bride kept her stolen crown, and you kept the geese — for the rest of your days, a queen’s daughter in a hut at the edge of the yard, known to no one.',
    text: [
      L(w('ti'), w('rri'), w('i_art'), w('qete'), p('.')),
      L(w('ti'), w('ruan'), wf('pate', 'patat', 'the geese'), w('perseri'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  mermerSli: {
    id: 'mermerSli',
    end: 'bad',
    title: 'Asleep in the Marble Garden',
    blurb:
      'You slept, and the vigil was broken. The marble king the scroll promised you could wake stayed cold stone forever, and the garden that opened for you only once never opened again. They say a girl who fails the three-weeks’ watch joins the marble — one more grey figure in a garden of the almost-living.',
    text: [
      L(w('ti'), w('fle'), p('.')),
      L(w('mbret'), w('rri'), w('mermer'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  fshatiLanes: {
    id: 'fshatiLanes',
    text: [
      // stepping out of the tower-house door back into the lane
      from(['kulle1', 'kulle2'], L(w('ti'), wf('dil', 'del', 'comes out'), w('nga'), wf('kulle', 'kulla', 'the tower'), p('.'))),
      L(w('ti'), w('ec'), wf('rruge', 'rrugës', 'the lane'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('kulle'), w('te_link'), wf('lart', 'lart', 'high'), p('.')),
      L(w('nje'), w('njeri'), w('rri'), w('brenda'), p('.')),
      L(w('ketu'), wf('rri', 'rrinë', 'stand'), wf('shtepi', 'shtëpitë', 'the homes'), p('.')),
      L(wf('ne', 'në', 'in'), w('nje'), w('shtepi'), w('nje'), w('djep'), w('ka'), w('nje'), w('femije'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('pallat'), w('i_art'), w('zi'), p('.')),
      unless('night', L(wf('ne', 'në', 'in'), w('pallat'), wf('vajze', 'vajzat', 'the girls'), wf('luan', 'luajnë', 'plays'), wf('ne', 'në', 'in'), w('nje'), w('kopsht'), w('mermer'), p('.'))),
      // the dordolec gang's roam reaches the lanes (npcs.js femijet)
      when('npc:femijet', L(wf('femije', 'fëmijët', 'the children'), wf('bej', 'bëjnë', 'make'), w('nje'), w('dordolec'), w('ketu'), p('.'))),
      when('night', L(w('naten'), wf('rruge', 'rrugët', 'the lanes'), wf('je', 'janë', 'are'), w('qete'), p('.'))),
      // …quiet, except when the Xhindët's walk passes through (npcs.js xhindet)
      when('npc:xhindet', L(w('por'), w('dikush'), wf('ec', 'ecën', 'walks'), wf('ne', 'në', 'in'), w('erresire'), p('.'))),
      L(w('nje'), w('kishe'), w('rri'), wf('lart', 'lart', 'high'), w('mbi'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(w('nje'), w('rruge'), wf('zbrit', 'zbret', 'goes down'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river'), p('.')),
    ],
    options: [
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('kulle')), to: 'kulle1', reveal: 'kulle' },
      // catch the dordolec gang on their lane leg — same rain-rite, other spot
      { text: L(w('ndihmo'), wf('femije', 'fëmijët', 'the children')), requires: 'npc:femijet', to: 'dordolec1', reveal: 'dordolec' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('shtepi')), to: 'fshatiJeta', reveal: 'shtepi' },
      { text: L(w('sheh'), wf('djep', 'djepin', 'the cradle')), to: 'djepi1', reveal: 'djep' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pallat')), to: 'pallatiZi', reveal: 'pallat' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('kopsht')), unless: 'night', to: 'kopshtMermer1', reveal: 'mermer' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('kishe', 'kishën', 'the church')), to: 'kisha1', reveal: 'kishe' },
      { text: L(w('zbrit'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi', reveal: 'lume' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the lane')), to: 'kostandin1' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // =========================================================================
  // THE THREE FATES AT THE CRADLE — the Fatí / Orë come on the night after a birth
  // to decree the child's lifelong fate (e Bardha the White = luck, e Verdha the
  // Yellow = ill, e Zeza the Black = death); the household sets out BREAD so they
  // bless and do not curse the newborn. You honour the custom; the child is blessed.
  // =========================================================================
  djepi1: {
    id: 'djepi1',
    text: [
      L(w('ketu'), w('nje'), w('femije'), w('lind'), p('.')),
      // the proverb of the full house: a house without children is a night without stars
      Q('fjalë e urtë',
        wf('thote', 'thonë', 'they say'), p(':'), wf('shtepi', 'shtëpia', 'the house'), w('pa'), w('femije'), wf('si', 'si', 'as'), wf('naten', 'nata', 'the night'), w('pa'), wf('yll', 'yje', 'stars'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('jep'), w('buke'), w('per'), wf('ora', 'Orat', 'the Fates'), p('.')),
      L(w('naten'), wf('vjen', 'vijnë', 'come'), w('tre'), wf('ora', 'Ora', 'Fates'), p('.')),
    ],
    options: [
      { text: L(w('prit'), wf('ora', 'Orat', 'the Fates')), to: 'djepi2', reveal: 'femije' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes' },
    ],
  },

  djepi2: {
    id: 'djepi2',
    text: [
      L(w('tre'), wf('ora', 'Ora', 'Fates'), wf('vjen', 'vijnë', 'come'), wf('ne', 'në', 'to'), w('djep'), p('.')),
      L(w('nje'), w('eshte'), w('e_art'), wf('bardhe', 'Bardhë', 'White'), p(','), w('nje'), w('e_art'), wf('verdhe', 'Verdhë', 'Yellow'), p(','), w('nje'), w('e_art'), wf('zi', 'Zezë', 'Black'), p('.')),
      L(w('e_art'), wf('bardhe', 'Bardha', 'White'), w('jep'), w('mire'), p('.'), w('e_art'), wf('verdhe', 'Verdha', 'Yellow'), w('jep'), w('keq'), p('.'), w('e_art'), wf('zi', 'Zeza', 'Black'), w('jep'), w('fund'), p('.')),
      L(w('e_art'), wf('bardhe', 'Bardha', 'White'), w('jep'), w('bekim'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('ora', 'Orave', 'to the Fates')), to: 'djepi3', reveal: 'bekim' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes' },
    ],
  },

  // === COMPREHENSION RIDDLE: the Fates' question — their offices were spoken
  // one line ago (White gives good, Yellow gives ill, Black gives the end);
  // answer from understanding, or the Yellow one smiles.
  djepi3: {
    id: 'djepi3',
    text: [
      L(wf('ora', 'Orat', 'the Fates'), wf('ha', 'hanë', 'eat'), wf('buke', 'bukën', 'the bread'), p('.')),
      L(w('e_art'), wf('bardhe', 'Bardha', 'White'), w('thote'), p(':'), wf('cili', 'cila', 'which'), w('nga'), w('ne_we'), w('jep'), w('fund'), p('?')),
      L(w('e_art'), wf('verdhe', 'Verdha', 'Yellow'), w('dhe'), w('e_art'), wf('zi', 'Zeza', 'Black'), wf('rri', 'rrinë', 'wait'), p('.')),
      L(wf('thote', 'thuaj', 'say'), p(','), w('dhe'), w('merr'), wf('bekim', 'bekimin', 'the blessing'), p('.')),
    ],
    options: [
      { text: L(wf('thote', 'thuaj', 'say'), p(':'), w('e_art'), wf('zi', 'Zeza', 'Black')), to: 'djepiFund' },
      { text: L(wf('thote', 'thuaj', 'say'), p(':'), w('e_art'), wf('verdhe', 'Verdha', 'Yellow')), to: 'djepiKeq' },
      { text: L(wf('thote', 'thuaj', 'say'), p(':'), w('e_art'), wf('bardhe', 'Bardha', 'White')), to: 'fshatiLanes' },
    ],
  },

  djepiKeq: {
    id: 'djepiKeq',
    end: 'bad',
    title: 'The Yellow One’s Gift',
    blurb:
      'The Fates asked you one question over the cradle, and its answer had just left their own lips: the White gives good, the Yellow gives ill, and it is the Black who deals the end. You answered wrongly — and it was e Verdha, the Yellow, who smiled. She is the Fate of bad luck and crooked spells, and a wrong word before the three sisters is exactly the opening she waits for. The old people set out bread for the Fates and keep their mouths careful; you gave the bread, and then gave her the opening anyway.',
    text: [
      L(w('e_art'), wf('verdhe', 'Verdha', 'Yellow'), wf('degjo', 'dëgjon', 'hears'), p('.')),
      L(w('e_art'), wf('verdhe', 'Verdha', 'Yellow'), w('te_obj'), w('jep'), w('keq'), p('.')),
    ],
    options: [],
  },

  djepiFund: {
    id: 'djepiFund',
    end: 'secret',
    title: 'The Three Fates at the Cradle',
    blurb:
      'In the night after a child is born, the old people say, the three fate-women — the Fatí, the northern Orë — come to the cradle to settle its whole life: e Bardha, the White, deals out good fortune; e Verdha, the Yellow, ill luck; e Zeza, the Black, the hour of death. So the house is swept and bread set out for them, that they go away pleased and bless the newborn rather than curse it. You kept the custom — laid out the bread — and the White Fate smiled on the cradle; the child will carry a white-faced Ora at its shoulder all its days, and meet its share of luck.',
    text: [
      L(wf('ora', 'Orat', 'the Fates'), wf('jep', 'japin', 'give'), w('bekim'), wf('femije', 'fëmijës', 'to the child'), p('.')),
      L(wf('femije', 'fëmija', 'the child'), w('ka'), w('nje'), w('e_art'), wf('bardhe', 'bardhë', 'white'), w('ora'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // VILLAGE LIFE — rural-life texture you can just visit: the sacred hearth
  // (vatra) with its ancestor-serpent, the loom and its qilim, the shepherd and
  // his Zana-guarded flock; and the children's folk tale of the Half-Rooster.
  // =========================================================================
  fshatiJeta: {
    id: 'fshatiJeta',
    text: [
      // the climb up from the river-quarter to the living homes
      from('fshatiLumi', L(w('ti'), w('ngjit'), w('nga'), wf('lume', 'lumi', 'the river'), wf('tek', 'te', 'to'), wf('shtepi', 'shtëpitë', 'the homes'), p('.'))),
      L(w('ketu'), wf('rri', 'rrinë', 'stand'), wf('shtepi', 'shtëpitë', 'the homes'), p('.')),
      L(w('nje'), w('vatra'), w('eshte'), w('ketu'), p('.')),
      // the living quarter by day; at night everyone sleeps behind their doors
      unless('night', L(w('nje'), w('nene'), wf('bej', 'bën', 'makes'), w('nje'), w('qilim'), p('.'))),
      // the shepherd's timetable (npcs.js bari): home at first light and dusk,
      // out at the pasture with the flock through the working day
      when('npcAt:bari:fshatiJeta', L(w('nje'), w('bari'), wf('rri', 'rri', 'sits'), w('me'), wf('dhi', 'dhitë', 'goats'), p('.'))),
      when('npcAt:bari:bariu', L(w('nje'), w('bari'), w('eshte'), w('jashte'), w('me'), wf('dhi', 'dhitë', 'goats'), p('.'))),
      unless('night', L(w('nje'), w('gjysmegjel'), w('rri'), w('ketu'), p('.'))),
      unless('night', L(w('nje'), w('femije'), w('eshte'), w('i_art'), w('bukur'), p('.'))),
      unless('night', L(w('nje'), w('grua'), wf('bej', 'bën', 'bakes'), w('buke'), p('.'))),
      unless('night', L(w('nje'), w('baba'), w('rri'), w('me'), wf('djale', 'djemtë', 'the boys'), p('.'))),
      when('night', L(w('naten'), wf('njeri', 'njerëzit', 'the people'), wf('fle', 'flenë', 'sleep'), w('brenda'), p('.'))),
      when('night', L(wf('vatra', 'vatra', 'the hearth'), w('eshte'), w('e_art'), w('ngrohte'), p('.'))),
      L(wf('poshte', 'poshtë', 'below'), wf('shko', 'shkon', 'goes'), w('nje'), w('rruge'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('baba', 'baban', 'the father')), unless: 'night', to: 'jetaBaba', reveal: 'baba' },
      { text: L(w('fol'), w('me'), wf('grua', 'gruan', 'the woman')), unless: 'night', to: 'jetaGrua', reveal: 'grua' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('vatra')), to: 'vatra', reveal: 'vatra' },
      { text: L(w('degjo'), wf('nene', 'nënën', 'the woman')), unless: 'night', to: 'qilim', reveal: 'qilim' },
      // walk out to the pasture — only while the flock is actually out there
      { text: L(w('ndihmo'), w('bari')), requires: 'npcAt:bari:bariu', to: 'bariu', reveal: 'bari' },
      { text: L(w('ndihmo'), w('gjysmegjel')), unless: 'night', to: 'gjysmegjel1', reveal: 'gjysmegjel' },
      { text: L(w('sheh'), wf('femije', 'fëmijën', 'the child')), unless: 'night', to: 'syriKeq1', reveal: 'femije' },
      { text: L(wf('bej', 'bëj', 'bake'), w('buke')), unless: 'night', to: 'breshka1', reveal: 'buke' },
      { text: L(w('zbrit'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi', reveal: 'lume' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // A father with his boys in the village-life quarter — a flavour vignette
  // (talk-and-return) carrying the family/everyday 201-250 words.
  jetaBaba: {
    id: 'jetaBaba',
    text: [
      L(w('nje'), w('baba'), w('thote'), p(':')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('djale', 'djema', 'boys'), p('.')),
      L(w('keta'), wf('djale', 'djema', 'boys'), wf('eshte', 'janë', 'are'), w('i_art'), w('mire'), p('.')),
      L(wf('bir', 'biri', 'the son'), wf('im', 'jem', 'my'), w('rri'), w('ketu'), p('.')),
      L(wf('djale', 'djema', 'boys'), wf('thote', 'thonë', 'say'), p(':'), wf('baba', 'babi', 'dad'), p('!')),
      L(w('ku'), wf('eshte', 'janë', 'are'), wf('djale', 'djemtë', 'the boys'), w('e_link'), wf('yt', 'tu', 'your'), p('?')),
      L(w('ai'), w('eshte'), wf('shok', 'shoku', 'the comrade'), w('im'), p('.')),
      L(wf('baba', 'babai', 'the father'), w('im'), wf('jam', 'ishte', 'was'), w('nje'), w('bari'), p('.')),
      L(wf('vend', 'vendi', 'the place'), w('tone'), w('eshte'), w('ketu'), p('.')),
      L(wf('shtepi', 'shtëpia', 'the house'), w('juaj'), w('eshte'), w('larg'), p('?')),
      L(w('une'), wf('beso', 'besoj', 'believe'), w('gjithmone'), p('.')),
      L(w('njeri'), w('do'), wf('vete', 'veten', 'oneself'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('gje', 'gjëra', 'things'), w('i_art'), w('mire'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('baba', 'baban', 'the father')), to: 'jetaBaba2' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  jetaBaba2: {
    id: 'jetaBaba2',
    text: [
      L(w('baba'), w('thote'), p(':')),
      L(w('o'), wf('djale', 'djema', 'boys'), p('!')),
      L(w('une'), wf('thote', 'thashë', 'said'), p(':'), wf('rri', 'rrini', 'stay'), p('.')),
      L(w('por'), w('ti'), wf('thote', 'the', 'said'), p(':'), w('jo'), p('.')),
      L(w('perse'), p('?')),
      L(w('une'), wf('do', 'doja', 'wanted'), w('vetem'), w('uje'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('thote', 'thënë', 'said'), w('mjaft'), p('.')),
      L(w('cfare'), w('te_subj'), wf('bej', 'bëjë', 'do'), p('?')),
      L(w('gjate'), w('naten'), p(','), w('askush'), w('nuk'), w('vjen'), w('ende'), p('.')),
      L(w('tani'), w('eshte'), w('vone'), p('.')),
      L(w('ti'), wf('jam', 'ishe', 'were'), w('larg'), p('?')),
      L(w('sapo'), w('ti'), wf('ka', 'ke', 'have'), wf('vjen', 'ardhur', 'come'), p('.')),
      L(w('cfare'), wf('ndodh', 'ndodhi', 'happened'), p('?')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  // The woman of the quarter greets the stranger — a flavour vignette carrying
  // the greeting/time/luck words of the 251-300 band. Talk-and-return.
  jetaGrua: {
    id: 'jetaGrua',
    text: [
      L(w('nje'), w('grua'), w('thote'), p(':')),
      L(w('pershendetje'), p('!')),
      L(wf('fal', 'falni', 'forgive'), p('!')),
      L(wf('femije', 'fëmijët', 'the children'), wf('thote', 'thonë', 'say'), p(':'), wf('mama', 'mami', 'mommy'), p('!')),
      L(w('une'), wf('mendoj', 'mendova', 'thought'), p(':'), w('ti'), w('vjen'), w('sonte'), p('.')),
      L(wf('kohe', 'koha', 'the time'), wf('ka', 'ka', 'has'), wf('kalo', 'kaluar', 'passed'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('ka', 'pasur', 'had'), w('fat'), p('.')),
      L(wf('gje', 'gjërat', 'the things'), w('e_link'), wf('im', 'mia', 'my'), wf('eshte', 'janë', 'are'), w('ketu'), p('.')),
      L(w('dhe'), wf('gje', 'gjërat', 'the things'), w('e_link'), wf('yt', 'tua', 'your'), p('?')),
      L(w('kujdes'), w('kesaj'), w('naten'), p('!')),
      L(wf('femije', 'fëmijët', 'the children'), wf('jam', 'ishin', 'were'), w('ketu'), p('.')),
      L(wf('jep', 'jepi', 'give'), w('uje'), wf('femije', 'fëmijës', 'to the child'), p('!')),
      L(w('ok'), p(','), w('une'), w('do'), wf('jete', 'jetën', 'life'), p('.')),
      L(w('fat'), w('i_art'), w('mire'), w('neser'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('grua', 'gruan', 'the woman')), to: 'jetaGrua2' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  jetaGrua2: {
    id: 'jetaGrua2',
    text: [
      L(w('nje'), w('grua'), w('thote'), p(':')),
      L(w('mengjes'), w('i_art'), w('mire'), p(','), wf('zonje', 'zonja', 'lady'), p('!')),
      L(w('he'), p('?')),
      L(w('une'), w('shpresoj'), p('.')),
      L(w('mbase'), w('nje'), w('gje'), w('e_link'), w('mire'), wf('ndodh', 'ndodhë', 'happens'), p('.')),
      L(w('qetesohu'), p('!')),
      L(w('ndalo'), p('!')),
      L(w('eshte'), w('gabim'), p('.')),
      L(w('eshte'), w('lehte'), p('.')),
      L(w('jo'), w('teper'), w('larg'), p('.')),
      L(w('prandaj'), w('une'), w('rri'), w('ketu'), p('.')),
      L(wf('shtepi', 'shtëpia', 'the house'), wf('tone', 'jonë', 'our'), w('eshte'), w('ketu'), p('.')),
      L(wf('gje', 'gjërat', 'the things'), wf('yt', 'tuaja', 'your'), p('?')),
      L(w('une'), w('njoh'), w('ti'), p('.')),
      L(wf('kujtoj', 'kujtohet', 'is remembered'), w('mire'), p('.')),
      L(w('ec'), wf('shpejt', 'shpejtë', 'fast'), p('!')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  // The HEARTH (vatra) — the holiest thing in the house: the fire never let to die,
  // the Gjarpri i Vatrës (the ancestor-serpent) in the warm ash, Nëna e Vatrës over it.
  vatra: {
    id: 'vatra',
    text: [
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'to'), w('nje'), w('shtepi'), p('.')),
      L(w('nje'), w('vatra'), w('me'), w('zjarr'), w('eshte'), w('ketu'), p('.')),
      L(w('nje'), w('gjarper'), w('rri'), w('ne'), w('vatra'), w('dhe'), w('eshte'), w('mik'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('ka'), w('bri'), w('e_link'), w('ar'), p('.')),
      L(wf('njeri', 'njeriu', 'the family'), w('jep'), w('qumesht'), wf('gjarper', 'gjarprit', 'to the serpent'), p('.')),
      L(wf('zjarr', 'zjarri', 'the fire'), w('kurre'), w('vdes'), p('.')),
    ],
    options: [
      { text: L(w('beso'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'fshatiJeta', reveal: 'vatra' },
      { text: L(w('kthehu')), to: 'fshatiJeta' },
    ],
  },

  // The LOOM — a woman weaves a qilim; its motifs (the sun, the serpent) guard the house.
  qilim: {
    id: 'qilim',
    text: [
      L(w('nje'), w('nene'), wf('bej', 'bën', 'makes'), w('nje'), w('qilim'), p('.')),
      L(wf('qilim', 'qilimi', 'the rug'), w('ka'), w('nje'), w('diell'), w('dhe'), w('nje'), w('gjarper'), p('.')),
      L(wf('qilim', 'qilimi', 'the rug'), w('ruan'), w('shtepi'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nënën', 'the woman')), to: 'fshatiJeta', reveal: 'qilim' },
      { text: L(w('kthehu')), to: 'fshatiJeta' },
    ],
  },

  // The SHEPHERD — his flock, and the Zana of the high pastures who guard the herders.
  bariu: {
    id: 'bariu',
    text: [
      L(w('nje'), w('bari'), wf('rri', 'rri', 'sits'), w('me'), wf('dhi', 'dhitë', 'goats'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), wf('ruan', 'ruajnë', 'guard'), wf('bari', 'bariun', 'the shepherd'), p('.')),
      when('day', L(wf('bari', 'bariu', 'the shepherd'), w('thote'), p(':'), w('ka'), w('pune'), w('per'), w('ti'), p(':'), wf('ruan', 'ruaj', 'guard'), wf('dhi', 'dhitë', 'the goats'), p('.'))),
    ],
    options: [
      { text: L(w('degjo'), wf('bari', 'bariun', 'the shepherd')), to: 'fshatiJeta', reveal: 'bari' },
      // a herder's wage — watch the flock while he sleeps, five lek at dusk
      { text: L(wf('ruan', 'ruaj', 'guard'), wf('dhi', 'dhitë', 'the goats')), requires: 'day', lek: 5, to: 'punaBariu', reveal: 'pune' },
      { text: L(w('kthehu')), to: 'fshatiJeta' },
    ],
  },

  // An afternoon with the flock — the oldest work the mountains know.
  punaBariu: {
    id: 'punaBariu',
    text: [
      L(w('ti'), wf('ruan', 'ruan', 'guard'), wf('dhi', 'dhitë', 'the goats'), w('dhe'), wf('bari', 'bariu', 'the shepherd'), w('fle'), p('.')),
      L(wf('dhi', 'dhitë', 'the goats'), w('ha'), w('bar'), p('.')),
      L(wf('bari', 'bariu', 'the shepherd'), w('jep'), w('pese'), w('lek'), w('dhe'), w('thote'), p(':'), w('faleminderit'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'fshatiJeta' },
    ],
  },

  // FOLK TALE — Gjysmëkokoshi, the Half-Rooster: the king seized his coin, so the
  // half-bird sets off to the palace, swallowing helpers to win it back.
  gjysmegjel1: {
    id: 'gjysmegjel1',
    text: [
      L(w('nje'), w('gjysmegjel'), w('rri'), w('ketu'), p('.')),
      L(wf('gjysmegjel', 'gjysmëgjeli', 'the half-rooster'), w('ka'), w('nje'), w('krah'), w('dhe'), w('nje'), wf('kembe', 'këmbë', 'leg'), p('.')),
      L(wf('gjysmegjel', 'gjysmëgjeli', 'the half-rooster'), w('gjen'), w('ar'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('merr'), wf('ar', 'arin', 'the gold'), p('.')),
      L(wf('gjysmegjel', 'gjysmëgjeli', 'the half-rooster'), w('do'), wf('ar', 'arin', 'the gold'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), w('gjysmegjel')), to: 'gjysmegjel2', reveal: 'gjysmegjel' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiJeta' },
    ],
  },

  gjysmegjel2: {
    id: 'gjysmegjel2',
    text: [
      L(wf('gjysmegjel', 'gjysmëgjeli', 'the half-rooster'), w('ec'), wf('ne', 'në', 'to'), wf('mbret', 'mbretin', 'the king'), p('.')),
      L(wf('gjysmegjel', 'gjysmëgjeli', 'the half-rooster'), w('ha'), w('nje'), w('bretkose'), p(','), w('nje'), wf('dhelpra', 'dhelpër', 'fox'), p(','), w('nje'), w('ujk'), w('dhe'), w('nje'), w('mi'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('ka'), w('nje'), w('zjarr'), p(','), wf('kale', 'kalë', 'horses'), p(','), wf('pate', 'patat', 'geese'), w('dhe'), w('ar'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('eshte'), w('ne'), w('rrezik'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), w('gjysmegjel')), to: 'gjysmegjelFund', reveal: 'rrezik' },
      { text: L(w('kthehu')), to: 'fshatiJeta' },
    ],
  },

  gjysmegjelFund: {
    id: 'gjysmegjelFund',
    end: 'secret',
    title: 'The Half-Rooster',
    blurb:
      'Gjysmëkokoshi, the Half-Rooster — one leg, one wing, half a bird and all of him cunning — is the hero of one of the best-loved Albanian children’s tales. When the king seized the coin he had found, he set off crowing to the palace, and on the road he swallowed whole a frog, a fox, a wolf and a mouse, carrying them in his belly. At court the king tried to be rid of him, and one by one he loosed them: the frog, whose pondful of water drowned the fire they lit beneath him; the wolf among the king’s horses; the fox among the king’s geese; and the mouse to gnaw open the gold-chest — out of which the Half-Rooster swallowed back his coin and a bellyful more, and hopped home crowing. The smallest and the half-made outwits the mighty: so the grandmothers tell it by the hearth.',
    text: [
      L(w('bretkose'), wf('vrit', 'vret', 'kills'), wf('zjarr', 'zjarrin', 'the fire'), p('.')),
      L(w('ujk'), w('ha'), wf('kale', 'kuajt', 'the horses'), p('.')),
      L(wf('dhelpra', 'dhelpra', 'the fox'), w('ha'), wf('pate', 'patat', 'the geese'), p('.')),
      L(w('mi'), w('hap'), wf('ar', 'arin', 'the gold'), p('.')),
      L(wf('gjysmegjel', 'gjysmëgjeli', 'the half-rooster'), w('merr'), wf('ar', 'arin', 'the gold'), p('.')),
    ],
    options: [],
  },

  // The KULLË — the stone tower-house. A man is "in blood" (gjakmarrja) and has
  // not stepped outside for fear of the gun. The choice: broker falja e gjakut
  // (the forgiving of blood, the Kanun's higher law) or feed the feud.
  kulle1: {
    id: 'kulle1',
    text: [
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'to'), w('nje'), w('kulle'), p('.')),
      L(w('nje'), w('njeri'), w('rri'), w('brenda'), p('.')),
      L(wf('njeri', 'njeriu', 'the man'), w('ka'), w('gjak'), w('me'), wf('njeri', 'njerëz', 'people'), w('tjeter'), p('.')),
      L(wf('njeri', 'njeriu', 'the man'), w('nuk'), w('dil'), w('jashte'), p('.')),
      L(w('brenda'), wf('kulle', 'kullës', 'the tower'), wf('njeri', 'njeriu', 'the man'), w('eshte'), w('i_art'), w('sigurt'), p('.'), w('jashte'), wf('njeri', 'njerëz', 'people'), wf('do', 'duan', 'want'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('njeri', 'njeriun', 'the man')), to: 'kulle2', reveal: 'gjak' },
      { text: L(w('dil'), w('jashte')), to: 'fshatiLanes' },
    ],
  },

  kulle2: {
    id: 'kulle2',
    text: [
      L(wf('njeri', 'njeriu', 'the man'), w('thote'), p(':'), w('une'), w('vrit'), w('nje'), w('njeri'), p('.')),
      L(w('tani'), wf('njeri', 'njerëz', 'people'), wf('do', 'duan', 'want'), w('gjak'), p('.')),
      L(w('nje'), w('bese'), w('mund'), w('te_subj'), w('mbyll'), w('gjak'), p('.')),
      L(w('kur'), w('nje'), w('bese'), w('mbyll'), w('gjak'), p(','), w('burra'), wf('pi', 'pinë', 'drink'), w('kafe'), p('.')),
    ],
    options: [
      { text: L(w('fal'), w('gjak')), to: 'kulleFal', reveal: 'bese' },
      { text: L(w('do'), w('gjak')), to: 'kulleGjak' },
      { text: L(w('dil'), w('jashte')), to: 'fshatiLanes' },
    ],
  },

  kulleFal: {
    id: 'kulleFal',
    end: 'secret',
    title: 'The Blood Forgiven',
    blurb:
      'You carried the besa between the towers, and the man who had not stepped out of his kullë in years walked into the lane a free man. Look at the house that held him: the kulla, the fortified stone tower-house of the northern highlands, walls an arm thick and one guarded door. Under the Kanun it was home and inviolable refuge in one: a man "in blood" could shut himself inside for years and no enemy might touch him within its walls — a besa built in stone, keeping its word for as long as the feud lasted. Two families that had been counting their dead stopped counting.',
    text: [
      L(wf('pleq', 'pleqtë', 'the elders'), w('vjen'), wf('ne', 'në', 'to'), w('kulle'), p('.')),
      L(w('ti'), w('fal'), w('gjak'), p('.')),
      L(wf('njeri', 'njeriu', 'the man'), w('jep'), w('kafe'), p('.')),
      L(wf('njeri', 'njerëz', 'people'), w('pi'), w('kafe'), p('.')),
      L(wf('njeri', 'njeriu', 'the man'), wf('dil', 'del', 'goes out'), w('jashte'), p('.')),
    ],
    options: [],
  },

  kulleGjak: {
    id: 'kulleGjak',
    end: 'bad',
    title: 'Blood for Blood',
    blurb:
      'You urged the old law, and the old law fed itself — blood for blood, a life for a life, and the tower stayed shut and the children grew up indoors. The feud you might have closed with a single word ran on into another generation. The Kanun grants a man his right to revenge; but the wise old ones always say the brave thing is to forgive the blood, not to take it.',
    text: [
      L(w('ti'), w('do'), w('gjak'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('vdes', 'vdesin', 'die'), p('.')),
    ],
    options: [],
  },

  fshatiBesa: {
    id: 'fshatiBesa',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(w('kulshedra'), w('poshte'), w('ka'), w('uje'), w('dhe'), wf('bukura', 'Bukurën', 'the Beauty')),
      L(w('nje'), w('dragua'), w('mund'), w('te_subj'), w('vrit'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('do'), w('nje'), w('bese'), p('.')),
    ],
    options: [
      { text: L(w('premto'), w('bese')), to: 'fshatiCaul', reveal: 'bese' },
      { text: L(w('ec'), wf('ne', 'në', 'to'), w('fshat')), to: 'nastradin1' },
    ],
  },

  fshatiCaul: {
    id: 'fshatiCaul',
    text: [
      L(w('ti'), wf('thote', 'thua', 'say'), p(':'), w('po_yes'), p('.')),
      L(w('nje'), w('plake'), w('thote'), p(':')),
      L(w('ti'), wf('lind', 'linde', 'were born'), w('me'), w('kemishe'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('mal'), w('dhe'), w('nje'), w('pyll'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pyll')), to: 'fshatiDil', reveal: 'pyll' },
    ],
  },

  // =========================================================================
  // ACT II (deepened) — the road by night (the Vitore & the Lugat)
  // You shelter in a ruin where a house-serpent (Vitore) brings luck; at night a
  // Lugat rises and must be driven off with fire or salt; your Ora sees you to dawn.
  // =========================================================================
  udheNate: {
    id: 'udheNate',
    text: [
      // "night comes" only if it actually fell on the walk in — arriving deep
      // in the night (fleeing the kukudh) skips the announcement
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      L(w('ti'), w('dhe'), wf('ujk', 'ujku', 'the wolf'), w('je'), w('ne'), w('nje'), w('shtepi'), w('te_link'), w('vjeter'), p('.')),
      L(w('nje'), w('gjarper'), w('rri'), wf('ne', 'në', 'on'), w('mur'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('eshte'), w('mik'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('eshte'), w('nje'), w('vitore'), p('.')),
      L(w('nje'), w('kukudh'), w('rri'), w('ketu'), p('.')),
      L(w('naten'), w('nje'), w('karkanxholl'), w('troket'), p('.')),
    ],
    options: [
      { text: L(w('fle'), w('ketu')), to: 'udheLugat' },
      { text: L(w('degjo'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'udha', reveal: 'mik' },
      { text: L(w('kerko'), wf('kukudh', 'kukudhin', 'the miser-ghost')), to: 'kukudh1', reveal: 'kukudh' },
      { text: L(w('degjo'), wf('karkanxholl', 'karkanxhollin', 'the revenant')), to: 'karkanxholl1', reveal: 'karkanxholl' },
    ],
  },

  udheLugat: {
    id: 'udheLugat',
    text: [
      L(w('naten'), w('nje'), w('lugat'), w('vjen'), p('.')),
      L(wf('lugat', 'lugati', 'the revenant'), w('eshte'), w('nje'), w('hije'), w('e_art'), wf('keq', 'keqe', 'bad'), p('.')),
      L(wf('lugat', 'lugati', 'the revenant'), w('te_obj'), w('do'), p('!')),
      L(w('nje'), w('dhampir'), w('sheh'), wf('lugat', 'lugatin', 'the revenant'), p('.')),
    ],
    options: [
      { text: L(wf('ujk', 'ujku', 'the wolf'), wf('lufto', 'lufton', 'fights'), wf('lugat', 'lugatin', 'the revenant')), requires: 'ujk', to: 'udheOra', reveal: 'lugat' },
      { text: L(w('ndiz'), w('nje'), w('zjarr')), to: 'udheOra' },
      { text: L(w('ndihmo'), wf('dhampir', 'dhampirin', 'the half-vampire')), to: 'dhampir1', reveal: 'dhampir' },
      { text: L(w('lufto'), wf('lugat', 'lugatin', 'the revenant')), to: 'humbur', reveal: 'lugat' },
    ],
  },

  udheOra: {
    id: 'udheOra',
    text: [
      L(w('dite'), w('vjen'), p('.')),
      L(w('nje'), w('ora'), w('ec'), w('me'), w('ti'), p('.')),
      L(wf('ora', 'Ora', 'the Ora'), w('eshte'), w('e_art'), w('bardhe'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('ora', 'Orën', 'the Ora')), grant: 'ora', to: 'udha' },
    ],
  },

  // =========================================================================
  // ACT VI (deepened) — Rozafa, the walled-up wife (the besa in stone)
  // Three brothers build a castle whose wall falls each night; a wise man says a
  // life must be walled in. They swear a besa; only the youngest keeps it, so his
  // wife Rozafa comes with the meal — unless you give the Beauty's ring instead.
  // =========================================================================
  kalaVllezer: {
    id: 'kalaVllezer',
    text: [
      L(wf('vella', 'vëllezërit', 'the brothers'), wf('bej', 'bëjnë', 'make'), w('nje'), w('kala'), p('.')),
      L(wf('mur', 'muri', 'the wall'), w('bie'), w('naten'), p('.')),
      when('day', L(w('sot'), wf('vella', 'vëllezërit', 'the brothers'), wf('punon', 'punojnë', 'work'), wf('ne', 'në', 'on'), w('mur'), p('.'))),
      when('dawn', L(wf('ne', 'në', 'in'), w('agim'), wf('vella', 'vëllezërit', 'the brothers'), wf('sheh', 'shohin', 'see'), wf('mur', 'murin', 'the wall'), wf('poshte', 'poshtë', 'down'), p('.'))),
      L(w('nje'), w('plak'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'kalaBesa', reveal: 'plak' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  kalaBesa: {
    id: 'kalaBesa',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(wf('mur', 'muri', 'the wall'), w('do'), w('nje'), w('grua'), wf('ne', 'në', 'in'), w('gur'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), wf('premto', 'premtojnë', 'swear'), w('bese'), p('.')),
      L(w('dy'), wf('vella', 'vëllezër', 'brothers'), w('nuk'), wf('mban', 'mbajnë', 'keep'), wf('bese', 'besën', 'the besa'), p('.')),
      L(w('nje'), w('vella'), w('mban'), wf('bese', 'besën', 'the besa'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'kalaRozafa', reveal: 'plak' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  kalaRozafa: {
    id: 'kalaRozafa',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(wf('kala', 'kalaja', 'the castle'), w('bie'), p('.')),
      L(w('nje'), w('nene'), w('vjen'), w('me'), w('buke'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), wf('quhem', 'quhet', 'is called'), w('rozafa'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('ka'), w('nje'), w('femije'), w('te_link'), w('vogel'), p('.')),
      L(wf('mur', 'muri', 'the wall'), w('merr'), wf('nene', 'nënën', 'the mother'), wf('ne', 'në', 'in'), w('gur'), p('.')),
      L(w('sot'), w('qumesht'), w('i_art'), w('bardhe'), wf('dil', 'del', 'comes out'), w('nga'), wf('mur', 'muri', 'the wall'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nënën', 'the mother')), to: 'kalaGji', reveal: 'nene' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  // =========================================================================
  // CLIMAX (deepened) — the duel with the Kulshedra (the eclipse)
  // She swallows the sun and the world goes dark; you fight on and sever her
  // crowned central head. Then the spring returns — but the Beauty is bound below.
  // =========================================================================
  kulshLufte1: {
    id: 'kulshLufte1',
    text: [
      L(wf('diell', 'dielli', 'the sun'), w('eshte'), wf('lart', 'lart', 'high'), p('.')),
      L(w('kulshedra'), w('e_obj'), w('ha'), p('.')),
      L(w('eshte'), w('erret'), p('.')),
      L(w('nje'), w('vajze'), w('me'), w('rrufe'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'kulshLufte2', reveal: 'kulshedra' },
      { text: L(wf('ujk', 'ujku', 'the wolf'), wf('lufto', 'lufton', 'fights'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), requires: 'ujk', to: 'kulshLufte2', reveal: 'kulshedra' },
      { text: L(w('degjo'), wf('vajze', 'vajzën', 'the maiden')), to: 'bijaHene1', reveal: 'vajze' },
      { text: L(w('ik'), w('shpejt')), to: 'djegur' },
    ],
  },

  // =========================================================================
  // SIDE-QUEST — E Bija e Hënës dhe e Diellit (the lightning-maiden ally)
  // In the eclipse the Daughter of the Moon and the Sun descends — "the drop of
  // the sky" — and fights the Kulshedra at your side.
  // =========================================================================
  bijaHene1: {
    id: 'bijaHene1',
    text: [
      L(wf('vajze', 'vajza', 'the maiden'), w('eshte'), w('bije'), w('e_link'), wf('diell', 'Diellit', 'the Sun'), w('dhe'), wf('hene', 'Hënës', 'of the Moon'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('ka'), w('rrufe'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('do'), w('te_subj'), wf('lufto', 'luftojë', 'fight'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), w('me'), wf('vajze', 'vajzën', 'the maiden')), to: 'bijaHeneFund' },
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), to: 'kulshLufte2', reveal: 'kulshedra' },
    ],
  },

  bijaHeneFund: {
    id: 'bijaHeneFund',
    end: 'secret',
    title: 'Daughter of the Moon and Sun',
    blurb:
      'Down from the sky came E Bija e Hënës dhe e Diellit — the Daughter of the Moon and the Sun, the lightning-maiden born of the married Sun and Moon and sent down against pride and evil. She stood with you until the last head fell and the rain came back.',
    text: [
      L(w('rrufe'), w('e_link'), wf('vajze', 'vajzës', 'the maiden'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('vjen'), w('perseri'), w('lart'), p('.')),
      L(w('shi'), w('vjen'), p('.')),
    ],
    options: [],
  },

  kulshLufte2: {
    id: 'kulshLufte2',
    text: [
      L(w('kulshedra'), w('ka'), w('shume'), w('koke'), p('.')),
      L(w('ti'), w('pre'), w('nje'), w('koke'), w('por'), w('kulshedra'), wf('ka', 'ka', 'has'), w('koke'), w('perseri'), p('.')),
      L(w('ti'), w('pre'), w('koke'), w('me'), w('zjarr'), p('.')),
      L(w('kulshedra'), w('bie'), p('.')),
    ],
    options: [
      { text: L(w('pre'), wf('koke', 'kokën', 'the head')), to: 'fitorja' },
    ],
  },

  springReturn: {
    id: 'springReturn',
    text: [
      L(wf('kulshedra', 'kulshedra', 'the she-dragon'), w('vdes'), p('.')),
      L(w('uje'), w('po_prog'), wf('vjen', 'vjen', 'coming'), w('perseri'), wf('ne', 'në', 'to'), wf('bote', 'botën', 'the world'), p('.')),
      L(wf('bote', 'bota', 'the world'), w('eshte'), w('gjalle'), w('perseri'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('eshte'), w('e_art'), w('sigurt'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('me'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'bukuraKthim' },
    ],
  },

  bukuraKthim: {
    id: 'bukuraKthim',
    text: [
      L(wf('bukura', 'Bukura', 'the Beauty'), w('thote'), p(':')),
      L(w('une'), w('jam'), w('bukura'), w('e_link'), wf('toke', 'Dheut', 'the Earth'), p('.')),
      L(w('une'), w('kthehu'), wf('poshte', 'poshtë', 'down'), w('perseri'), p('.')),
      L(w('por'), w('uje'), w('rri'), w('ne'), wf('bote', 'botën', 'the world'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'kthimi' },
    ],
  },

  // =========================================================================
  // ACT II (deepened) — the parched land, the Blue Eye, the immured bridge
  // The dead riverbed; the deep blue spring that was a slain serpent's eye
  // (Syri i Kaltër); the bridge that holds because a life was sealed in it.
  // =========================================================================
  udhaThate: {
    id: 'udhaThate',
    text: [
      L(wf('toke', 'toka', 'the ground'), w('eshte'), w('e_art'), w('thate'), p('.')),
      L(w('nje'), w('lume'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(w('ti'), w('ec'), w('larg'), p('.')),
      L(w('nje'), w('lubia'), w('mban'), w('uje'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), to: 'udhaSyri', reveal: 'lume' },
      { text: L(w('kerko'), wf('lubia', 'lubinë', 'the she-hydra')), to: 'lubia1', reveal: 'lubia' },
      { text: L(w('degjo'), wf('ujk', 'ujkun', 'the wolf')), requires: 'ujk', to: 'ujkuUje' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi', time: 'night' },
    ],
  },

  // Lost on Mount Tomorr — the region-local "flee" node. Fleeing a trial high on
  // the mountain no longer teleports you to the forest loop; instead you lose the
  // path in the cloud and must retreat down to the crossroads you climbed from
  // (which keeps the mountain's word-discovery — and its distractors — intact).
  maliHumbur: {
    id: 'maliHumbur',
    text: [
      L(w('ti'), w('je'), wf('lart', 'lart', 'high'), wf('ne', 'në', 'on'), w('mal'), p('.')),
      L(w('eshte'), w('ftohte'), w('dhe'), w('erret'), p('.')),
      L(w('nje'), w('re'), w('e_art'), w('madh'), w('vjen'), p('.')),
      L(w('ti'), w('nuk'), w('sheh'), wf('rruge', 'rrugën', 'the path'), p('.')),
      L(w('larg'), w('poshte'), w('eshte'), w('udhekryq'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  // Lost by the river — the river quarter's region-local "flee" node (same shape
  // as maliHumbur): fleeing a river trial leads here, then back to the crossroads.
  lumiHumbur: {
    id: 'lumiHumbur',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('lume'), p('.')),
      when('night', L(w('eshte'), w('erret'), w('dhe'), w('ftohte'), p('.'))),
      L(wf('uje', 'uji', 'the water'), w('vjen'), w('shpejt'), p('.')),
      L(w('ti'), w('nuk'), w('sheh'), wf('rruge', 'rrugën', 'the path'), p('.')),
      L(w('larg'), w('eshte'), w('udhekryq'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  // Lost in the world below — the underworld's region-local "flee" node: you lose
  // your way in the dark and climb back up to the crossroads.
  botaHumbur: {
    id: 'botaHumbur',
    text: [
      L(w('ti'), w('je'), wf('poshte', 'poshtë', 'below'), wf('ne', 'në', 'in'), w('bote'), p('.')),
      L(w('eshte'), w('erret'), p('.')),
      L(w('ti'), w('nuk'), w('sheh'), wf('rruge', 'rrugën', 'the path'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('bote', 'bota', 'the world'), w('e_art'), w('poshte'), w('ka'), w('nje'), w('qiell'), w('tjeter'), p('.')),
      L(wf('lart', 'lart', 'high'), w('larg'), w('eshte'), w('udhekryq'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  // Companion payoff — the wolf you fed bread (shokuUjk) repays the besa of shared
  // bread: on the dry road it scents and digs out a hidden spring. The wolf in
  // Albanian lore is a guardian, not mere prey ("Të hângtë ujku!" is its dark side).
  ujkuUje: {
    id: 'ujkuUje',
    end: 'secret',
    title: 'Brother Wolf',
    blurb:
      'The starving wolf you fed was no wolf at all — it was a drangue in a wolf’s hide, one of the storm-heroes born among men to do battle with the kulshedra. When the drought bit cruellest it shed its shape, rose into the black clouds and gave battle, and the rain it loosed there ran down to every parched village. You never knew the hero whose bread you shared — the old people only say a guest is sent by God, and the bread you break is never wasted.',
    text: [
      L(wf('ujk', 'ujku', 'the wolf'), w('eshte'), w('nje'), w('dragua'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), wf('shko', 'shkon', 'goes'), wf('lart', 'lart', 'up'), wf('ne', 'në', 'in'), w('re'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), wf('lufto', 'lufton', 'fights'), w('atje'), p(','), w('dhe'), w('shi'), w('vjen'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('perseri'), p('.')),
    ],
    options: [],
  },

  udhaSyri: {
    id: 'udhaSyri',
    text: [
      L(wf('lume', 'lumi', 'the riverbed'), w('eshte'), w('i_art'), w('thate'), w('ketu'), p('.')),
      L(w('nje'), w('plak'), w('jep'), w('nje'), w('gomar'), w('me'), w('zjarr'), wf('gjarper', 'gjarprit', 'to the serpent'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('ha'), w('gomar'), w('dhe'), w('vdes'), p('.')),
      L(wf('sy', 'syri', 'the eye'), w('i_link'), wf('gjarper', 'gjarprit', 'the serpent'), w('bie'), w('dhe'), w('behet'), w('uje'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('quhem', 'e quajnë', 'call'), wf('uje', 'ujin', 'the water'), p(':'), wf('sy', 'Syri', 'the Eye'), w('i_art'), w('kalter'), p('.')),
    ],
    options: [
      { text: L(w('pi'), w('uje')), to: 'syriFund', reveal: 'uje' },
      // fleeing backs you up the dry riverbed you came down (udhaThate is a
      // short walk upstream) — the living river's bridge is a realm away
      { text: L(w('ik'), w('shpejt')), to: 'udhaThate' },
    ],
  },

  syriFund: {
    id: 'syriFund',
    end: 'secret',
    title: 'Syri i Kalter',
    blurb:
      'You knelt and drank where the serpent’s eye had fallen, and the water ran sweeter and colder than any well — an endless deep-blue spring welling out of the earth, the Syri i Kalter the old people say still weeps near Saranda. You never slew the Kulshedra nor freed the Beauty; you simply found water that would never run dry, and cut a channel to lead it home to your village. Sometimes the drought breaks not by the hero’s sword but by the patient miracle of a spring that does not stop.',
    text: [
      L(w('ti'), w('pi'), w('uje'), wf('sy', 'syri', 'the eye'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('perseri'), p('.')),
    ],
    options: [],
  },

  uraFshaj: {
    id: 'uraFshaj',
    text: [
      L(wf('ure', 'ura', 'the bridge'), w('bie'), w('naten'), p('.')),
      L(w('nje'), w('nene'), w('eshte'), wf('ne', 'në', 'on'), wf('ure', 'urën', 'the bridge'), p('.')),
      when('night', L(w('naten'), w('ti'), wf('degjo', 'dëgjon', 'hear'), wf('nene', 'nënën', 'the mother'), wf('ne', 'në', 'in'), w('gur'), p('.'))),
      L(w('ti'), w('kalo'), wf('ure', 'urën', 'the bridge'), p('.')),
    ],
    options: [
      // cross back the way you came, or follow the dry bank up to the river hub
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'ura', reveal: 'ure' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  // =========================================================================
  // ACT III (deepened) — the storm on Tomorr (i Verbti & Shurdhi)
  // =========================================================================
  maliStuhi: {
    id: 'maliStuhi',
    text: [
      L(w('ere'), w('dhe'), w('rrufe'), w('vjen'), wf('ne', 'në', 'to'), w('mal'), p('.')),
      L(w('nje'), w('zjarr'), w('i_art'), w('madh'), w('vjen'), p('.')),
      // the climb-line is true only on the way up from the old man's ledge
      from('mali3', L(w('ti'), w('ngjit'), w('lart'), p('.'))),
      L(w('ne'), w('re'), w('rri'), w('shurdhi'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('godit', 'godasin', 'strike'), w('hekur'), p('.')),
      L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('verbti'), p('.')),
    ],
    options: [
      { text: L(w('ngjit'), wf('mal', 'malin', 'the mountain')), to: 'maja', reveal: 'mal' },
      { text: L(w('godit'), w('hekur')), to: 'shurdhi1', reveal: 'shurdhi' },
      { text: L(w('degjo'), w('verbti')), to: 'verbti1', reveal: 'verbti' },
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  // =========================================================================
  // ACT IV (deepened) — the cold descent & the three-headed gate-hound
  // Deeper down the great well, among the shades; a sleepless many-headed dog
  // guards the inner gate — feed it bread, or slip past in the dark.
  // =========================================================================
  zbritjaThelle: {
    id: 'zbritjaThelle',
    text: [
      L(w('ti'), w('zbrit'), wf('poshte', 'poshtë', 'down'), wf('ne', 'në', 'to'), w('erresire'), p('.')),
      L(w('ketu'), w('eshte'), w('i_art'), w('ftohte'), p('.')),
      L(w('shume'), w('hije'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('hije'), w('thote'), p(':'), w('ketu'), w('vjen'), w('ere'), w('e_link'), w('nje'), w('njeri'), w('te_link'), w('gjalle'), p('!')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('erresire')), to: 'qeniGate', reveal: 'erresire' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  qeniGate: {
    id: 'qeniGate',
    text: [
      L(w('nje'), w('qen'), w('i_art'), w('madh'), w('rri'), w('ketu'), p('.')),
      L(wf('qen', 'qeni', 'the dog'), w('ruan'), wf('dere', 'derën', 'the door'), w('e_link'), wf('bukura', 'Bukurës', 'the Beauty'), p('.')),
      L(wf('qen', 'qeni', 'the dog'), w('nuk'), w('fle'), p('.')),
      // the proverb (Dozon prints it: "Kyéni kyœ lyéh noûkœ kafçón") — cold
      // comfort here: THIS dog does not bark either
      Q('fjalë e urtë (Dozon, 1879)',
        wf('thote', 'thonë', 'they say'), p(':'), wf('qen', 'qeni', 'the dog'), w('qe'), w('leh'), w('nuk'), w('kafshon'), p('.')),
      L(w('por'), wf('qen', 'qeni', 'the dog'), w('nuk'), w('leh'), p('.')),
    ],
    options: [
      { text: L(wf('ora', 'Ora', 'the Ora'), w('te_obj'), wf('ndihmo', 'ndihmon', 'helps')), requires: 'ora', to: 'bota1' },
      { text: L(w('jep'), w('buke'), wf('qen', 'qenit', 'to the dog')), requires: 'buke', consumes: 'buke', to: 'bota1' },
      { text: L(w('kalo'), wf('qen', 'qenin', 'the dog')), to: 'humbur' },
    ],
  },

  // =========================================================================
  // ACT III (deepened) — Tomorr's peak, the blessing, the descent to the well
  // The sky-father's she-eagles circle the summit; he blesses the blade and warns
  // of the white & black rams below; you climb down to the mouth of the great well.
  // =========================================================================
  majaEagle: {
    id: 'majaEagle',
    text: [
      L(wf('shqiponje', 'shqiponjat', 'the eagles'), w('e_link'), wf('tomor', 'Tomorit', 'Tomorr'), wf('fluturo', 'fluturojnë', 'fly'), w('lart'), p('.')),
      L(w('nje'), w('plak'), wf('rri', 'rri', 'sits'), wf('lart', 'lart', 'high'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('eshte'), w('tomor'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), w('tomor')), to: 'tomor1', reveal: 'tomor' },
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  tomorBekim: {
    id: 'tomorBekim',
    text: [
      L(w('tomor'), w('thote'), p(':')),
      L(w('poshte'), w('eshte'), w('nje'), w('dash'), w('i_art'), w('bardhe'), w('dhe'), w('nje'), w('dash'), w('i_art'), w('zi'), p('.')),
      L(wf('dash', 'dashi', 'the ram'), w('i_art'), w('bardhe'), wf('shko', 'shkon', 'goes'), w('lart'), p('.')),
      L(wf('dash', 'dashi', 'the ram'), w('i_art'), w('zi'), wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), p('.')),
      L(w('merr'), wf('dash', 'dashin', 'the ram'), w('e_art'), w('bardhe'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), w('tomor')), to: 'tomor3' },
    ],
  },

  tomorZbritje: {
    id: 'tomorZbritje',
    text: [
      L(w('ti'), w('zbrit'), wf('poshte', 'poshtë', 'down'), wf('ne', 'në', 'to'), w('mal'), p('.')),
      L(w('poshte'), w('eshte'), w('nje'), w('pus'), p('.')),
      L(w('ti'), w('ec'), wf('ne', 'në', 'to'), w('pus'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pus')), to: 'pusi', reveal: 'pus' },
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  // =========================================================================
  // ACT II/IV (deepened) — the strength, the well's mouth, the dragon's lair
  // =========================================================================
  ujiShpella: {
    id: 'ujiShpella',
    text: [
      L(w('ti'), w('ec'), wf('ne', 'në', 'to'), w('nje'), w('shpelle'), p('.')),
      L(w('brenda'), w('eshte'), w('e_art'), w('erret'), p('.')),
      L(w('ti'), w('sheh'), wf('bukura', 'Bukurën', 'the Beauty'), w('ne'), w('mur'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'porta1', reveal: 'shpelle' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  // =========================================================================
  // ACT V (deepened) — the long way home (the greening land, the cost, the gates)
  // The parched world greens again behind you; you pass a mother who lost a child
  // to the drought; then the castle and the village come into sight.
  // =========================================================================
  ktheu1: {
    id: 'ktheu1',
    text: [
      L(wf('bote', 'bota', 'the world'), w('ka'), w('uje'), w('tani'), p('.')),
      L(wf('uje', 'uji', 'the water'), wf('jam', 'ishte', 'was'), w('me'), w('gjak'), p(','), w('tani'), w('eshte'), w('i_art'), w('qete'), p('.')),
      L(wf('toke', 'toka', 'the ground'), w('nuk'), w('eshte'), w('e_art'), w('thate'), p('.')),
      when('day', L(wf('diell', 'dielli', 'the sun'), w('eshte'), w('mbi'), wf('bote', 'botën', 'the world'), p('.'))),
      L(w('ti'), w('ec'), w('larg'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), wf('bote', 'botën', 'the world')), to: 'ktheu2', reveal: 'bote' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  ktheu2: {
    id: 'ktheu2',
    text: [
      L(w('ti'), w('ec'), wf('ne', 'në', 'on'), w('nje'), w('rruge'), p('.')),
      when('night', L(w('eshte'), w('naten'), p(','), w('erret'), w('dhe'), w('ftohte'), p('.'))),
      L(w('ketu'), w('nje'), w('nene'), w('kerko'), w('nje'), w('femije'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('eshte'), w('e_art'), wf('keq', 'keqe', 'bad'), p('.')),
      when('ora', L(wf('ora', 'Ora', 'the Ora'), w('thote'), p(':'), wf('nene', 'nëna', 'the mother'), w('eshte'), wf('nene', 'nëna', 'the mother'), w('e_link'), wf('naten', 'natës', 'the night'), p('.'))),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('kulshedra'), wf('jam', 'ishte', 'was'), w('nje'), w('gjarper'), p('.'), w('shume'), wf('vit', 'vjet', 'years'), w('pa'), w('sy'), p(','), w('dhe'), wf('behet', 'u bë', 'became'), w('kulshedra'), p('.')),
      when('ujk', L(wf('ujk', 'ujku', 'the wolf'), wf('sulmo', 'sulmon', 'attacks'), wf('nene', 'nënën', 'the mother'), p('.'))),
      when('ujk', L(wf('nene', 'nëna', 'the mother'), wf('ik', 'ikën', 'flees'), p('.'))),
    ],
    options: [
      { text: L(w('ndihmo'), wf('nene', 'nënën', 'the mother')), unless: 'ujk', to: 'nenaShtrige', reveal: 'nene' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road')), to: 'ktheu3' },
    ],
  },

  // Real, telegraphed choice — the text says plainly she "is bad"; the weeping
  // mother is a Shtriga (the child-stealing night-witch), the lost child her bait.
  nenaShtrige: {
    id: 'nenaShtrige',
    end: 'bad',
    title: 'The Night-Mother’s Lure',
    blurb:
      'She was no grieving mother but a shtriga — one of the night-witches of Albanian belief — and the "lost child" was only her lure to draw a kind traveller off the road into the dark. Kindness is a virtue, but the old people warned of exactly this: on the night road, you do not follow a weeping woman into the dark.',
    text: [
      L(wf('nene', 'nëna', 'the mother'), w('eshte'), wf('nene', 'nëna', 'the mother'), w('e_link'), wf('naten', 'natës', 'the night'), p('.')),
      L(wf('naten', 'nata', 'the night'), w('te_obj'), w('merr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // ACT IV/VI (deepened) — free the Beauty's chains; the full Rozafa finale
  // =========================================================================
  bukuraLirim: {
    id: 'bukuraLirim',
    text: [
      L(wf('bukura', 'Bukura', 'the Beauty'), w('eshte'), w('ne'), w('mur'), p('.')),
      L(w('ti'), w('pre'), w('dhe'), w('shpeto'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('bukura', 'Bukurën', 'the Beauty')), to: 'bukuraThellesi' },
    ],
  },

  kalaBuna: {
    id: 'kalaBuna',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('kala'), w('ne'), w('nje'), w('lume'), p('.')),
      unless('night', L(wf('vella', 'vëllezërit', 'the brothers'), wf('bej', 'bëjnë', 'make'), w('nje'), w('mur'), p('.'))),
      when('night', L(w('naten'), wf('vella', 'vëllezërit', 'the brothers'), wf('fle', 'flenë', 'sleep'), w('dhe'), wf('mur', 'muri', 'the wall'), w('bie'), p('.'))),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('kala')), to: 'kala1', reveal: 'kala' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  kalaGji: {
    id: 'kalaGji',
    text: [
      L(wf('nene', 'nëna', 'the mother'), w('thote'), p(':')),
      L(w('une'), w('jam'), w('ne'), w('mur'), p('.')),
      L(w('por'), w('gji'), p(','), w('sy'), p(','), w('dore'), w('dhe'), w('kembe'), w('rri'), w('jashte'), p('.')),
      L(w('sy'), w('sheh'), wf('femije', 'fëmijën', 'the child'), p('.')),
      L(w('dore'), w('mban'), wf('femije', 'fëmijën', 'the child'), p('.')),
      L(w('kembe'), w('tund'), wf('djep', 'djepin', 'the cradle'), p('.')),
      L(w('gji'), w('jep'), w('qumesht'), wf('femije', 'fëmijës', 'to the child'), p('.')),
      L(w('qumesht'), w('rri'), w('mbi'), wf('mur', 'murin', 'the wall'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nënën', 'the mother')), to: 'kala2' },
    ],
  },

  // === SIDE-QUEST: the Dordolec / rain-call (riti i dordolecit; Tirta 2004) ===
  // Children clad a child head to foot in green branches and lead a singing procession,
  // sprinkling water, faces turned to Shendelli (the Holy Sun) — imitative rain magic.
  dordolec1: {
    id: 'dordolec1',
    text: [
      L(wf('femije', 'fëmijët', 'the children'), wf('bej', 'bëjnë', 'make'), w('nje'), w('dordolec'), p('.')),
      L(w('nje'), w('femije'), w('vesh'), wf('peme', 'pemë', 'tree'), w('te_link'), w('gjelber'), p('.')),
      L(wf('dordolec', 'dordoleci', 'the rain-child'), wf('kerko', 'kërkon', 'calls for'), w('shi'), p('.')),
      L(w('nje'), w('shtepi'), w('e_art'), wf('ri', 're', 'new'), w('ka'), w('nje'), w('dordolec'), w('dhe'), w('nje'), w('hudher'), p('.')),
      L(w('nje'), w('njeri'), w('thote'), p(':'), wf('sy', 'syri', 'the eye'), w('i_art'), w('keq'), w('sheh'), wf('dordolec', 'dordolecin', 'the scarecrow'), p(','), w('jo'), wf('shtepi', 'shtëpinë', 'the house'), p('.')),
    ],
    options: [
      { text: L(w('kendo'), w('me'), wf('femije', 'fëmijët', 'the children')), to: 'dordolec2', reveal: 'dordolec' },
      { text: L(w('shiko'), wf('shtepi', 'shtëpinë', 'the house')), to: 'dordolecSyriFund', reveal: 'shtepi' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // === DASMA — the village wedding: the bride's arrival and the valle =========
  dasma1: {
    id: 'dasma1',
    text: [
      L(w('sot'), w('ka'), w('nje'), w('dasme'), wf('ne', 'në', 'in'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(wf('nuse', 'nusja', 'the bride'), w('vjen'), w('me'), w('kale'), p('.')),
      L(wf('nuse', 'nusja', 'the bride'), w('rri'), w('qete'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('e_link'), wf('nuse', 'nuses', 'of the bride'), w('ka'), w('lot'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('kendo', 'këndojnë', 'sing'), w('dhe'), wf('hyr', 'hyjnë', 'enter'), wf('ne', 'në', 'in'), w('nje'), w('valle'), p('.')),
      // the wedding blessing, called to every new pair: may they have heirs!
      Q('urimi i dasmës',
        wf('njeri', 'njerëzit', 'the people'), wf('thote', 'thonë', 'say'), p(':'), wf('trashegohet', 'u trashëgofshin', 'may they have heirs'), p('!')),
      L(w('nje'), w('njeri'), wf('shko', 'shkon', 'goes'), w('perpara'), p(','), wf('njeri', 'njerëzit', 'the people'), wf('shko', 'shkojnë', 'go'), w('pas'), p('.')),
    ],
    options: [
      { text: L(w('hyr'), wf('ne', 'në', 'in'), w('valle')), to: 'valleFund', reveal: 'valle' },
      { text: L(w('shiko'), wf('nuse', 'nusen', 'the bride')), to: 'dasmaFund', reveal: 'nuse' },
      { text: L(w('kthehu')), to: 'sheshiKisha' },
    ],
  },

  dasmaFund: {
    id: 'dasmaFund',
    end: 'secret',
    title: 'Dasma — the Bride Who Crosses Over',
    blurb:
      'A dasma in the old style ran for days, and at its heart is one crossing: the bride leaves her father’s house veiled and wept over in ritual sorrow, for she is passing out of one household forever and into another. You watched the bride come in on horseback, silent and still as custom asks. The old people watched a river changing its bed.',
    text: [
      L(wf('nuse', 'nusja', 'the bride'), w('vjen'), wf('ne', 'në', 'to'), w('nje'), w('shtepi'), w('e_art'), wf('ri', 're', 'new'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('ka'), w('lot'), p(','), w('por'), wf('njeri', 'njerëzit', 'the people'), wf('kendo', 'këndojnë', 'sing'), p('.')),
    ],
    options: [],
  },

  valleFund: {
    id: 'valleFund',
    end: 'secret',
    title: 'The Valle — the Line that Teaches You',
    blurb:
      'They pulled you into the valle — the chain dance of every Albanian wedding and festival, an open or closed circle behind a first dancer who improvises while the whole line answers his steps. No one asks whether you know the steps; the line teaches you as it turns. You danced at a stranger’s wedding — which, in this country, makes you a stranger no longer.',
    text: [
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'in'), w('valle'), p('.')),
      L(wf('valle', 'vallja', 'the round-dance'), w('te_obj'), wf('mban', 'mban', 'holds'), p('.')),
    ],
    options: [],
  },

  dordolecSyriFund: {
    id: 'dordolecSyriFund',
    end: 'secret',
    title: 'The Dordolec on the New House',
    blurb:
      'The children’s rain-doll has a sterner cousin: on the new house hung a dordolec — a stuffed figure set there so that the syri i keq, the envious eye, fixes on the odd thing instead of on the thing worth envying. Scarecrow or doll, garlic or blue bead — the old decoy still hangs wherever something enviable rises. Envy looks; the dordolec looks back; the house gets built.',
    text: [
      L(wf('shtepi', 'shtëpia', 'the house'), w('e_art'), wf('ri', 're', 'new'), w('ka'), w('nje'), w('dordolec'), p('.')),
      L(wf('sy', 'syri', 'the eye'), w('i_art'), w('keq'), w('sheh'), wf('dordolec', 'dordolecin', 'the scarecrow'), p(','), w('jo'), wf('shtepi', 'shtëpinë', 'the house'), p('.')),
    ],
    options: [],
  },

  dordolec2: {
    id: 'dordolec2',
    text: [
      L(wf('femije', 'fëmijët', 'the children'), wf('kendo', 'këndojnë', 'sing'), w('dhe'), wf('hidh', 'hedhin', 'throw'), w('uje'), p('.')),
      // the rain-chant itself, as the children sing it: rona, rona, peperona,
      // fall, rain, on our fields!
      Q('kënga e shiut',
        p('rona, rona, peperona,'), wf('bie', 'bjerë', 'fall'), w('shi'), wf('ne', 'në', 'on'), wf('are', 'arat', 'the fields'), w('tona'), p('!')),
      L(w('ti'), w('sheh'), wf('mal', 'malin', 'the mountain'), w('e_link'), wf('diell', 'diellit', 'the sun'), p('.')),
    ],
    options: [
      { text: L(w('shko'), w('me'), wf('femije', 'fëmijët', 'the children')), to: 'dordolecFund', reveal: 'femije' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  dordolecFund: {
    id: 'dordolecFund',
    end: 'secret',
    title: 'The Rain-Caller',
    blurb:
      'You did not slay the Kulshedra; you called the rain the old way. The children clad the Dordolec head to foot in green — elder and fern and oak — and led him singing through the parched lanes, sprinkling water as they went, their faces turned to Shendelli, the Holy Sun mountain. Old Perendia heard, as the rite promises, and the first fat drops struck the dust. Sometimes a drought breaks not by a hero’s sword but by the village’s own song.',
    text: [
      L(w('shi'), w('vjen'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('perseri'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: the Bolla (the dragon's life-cycle; Lambertz/Doja, Elsie 2001) ===
  // A Bolla keeps its eyes shut all year, opening them only on St George's Eve to devour;
  // left to live it grows to a bullar, sprouts wings, and becomes a Kulshedra.
  bolla1: {
    id: 'bolla1',
    text: [
      L(w('nje'), w('gjarper'), w('fle'), w('ne'), wf('lume', 'lumë', 'the river'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('eshte'), w('nje'), w('bolla'), p('.')),
      L(wf('naten', 'nata', 'the night'), w('e_link'), wf('shengjergj', 'Shëngjergjit', 'St George'), w('eshte'), w('e_art'), w('shenjte'), p('.')),
      L(wf('naten', 'atë natë', 'that night'), w('bolla'), w('hap'), wf('sy', 'sytë', 'its eyes'), p('.')),
      L(w('kur'), w('bolla'), w('sheh'), w('nje'), w('njeri'), p(','), w('bolla'), w('ha'), wf('njeri', 'njeriun', 'the person'), p('.')),
    ],
    options: [
      { text: L(w('prit'), wf('shengjergj', 'Shëngjergjin', 'St George')), to: 'bolla2', reveal: 'bolla' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  bolla2: {
    id: 'bolla2',
    text: [
      L(w('bolla'), w('hap'), wf('sy', 'sytë', 'its eyes'), p('.')),
      L(w('bolla'), w('do_fut'), w('te_subj'), w('behet'), w('nje'), wf('kulshedra', 'kulshedër', 'she-dragon'), p('.')),
    ],
    options: [
      { text: L(w('vrit'), wf('bolla', 'bollën', 'the bolla')), to: 'bollaFund', reveal: 'bolla' },
      { text: L(w('ik'), w('shpejt')), to: 'lumi' },
    ],
  },

  bollaFund: {
    id: 'bollaFund',
    end: 'secret',
    title: 'The Dragon Slain Young',
    blurb:
      'You waited for Shëngjergj — Saint George’s Day, the one day in the year the saint’s curse lifts and a Bolla unseals its eyes to look on the world and devour — and you struck before it could look on you. The old people say a Bolla left to live grows and grows, sprouts wings, and becomes at last a Kulshedra to swallow the springs. You killed the dragon while it was still small: a drought that would have come in your grandchildren’s day will now never come at all.',
    text: [
      L(w('ti'), wf('vrit', 'vret', 'kill'), wf('bolla', 'bollën', 'the bolla'), p('.')),
      L(w('nje'), wf('kulshedra', 'kulshedër', 'she-dragon'), w('nuk'), w('vjen'), w('kurre'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: the Katallan — the one-eyed, knee-less cannibal giant (Albanian Polyphemus) ===
  katallan1: {
    id: 'katallan1',
    text: [
      // crossing the cave-mouth from the open mountainside
      from('mali1', L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave'), p('.'))),
      L(w('ne'), wf('shpelle', 'shpellën', 'the cave'), w('rri'), w('nje'), w('katallan'), p('.')),
      L(wf('katallan', 'katallani', 'the giant'), w('ka'), w('nje'), w('sy'), p('.')),
      L(wf('katallan', 'katallani', 'the giant'), w('nuk'), w('ka'), w('gju'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('katallan', 'katallani', 'the giant'), w('ha'), wf('udhetar', 'udhëtarë', 'travellers'), p('.')),
      L(w('nje'), w('udhetar'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('zjarr'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('gur'), w('e_art'), w('madh'), w('mbyll'), wf('dere', 'derën', 'the door'), p('.')),
      // biding in the shadows pays off as an event: night falls, the giant sleeps
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      when('night', L(wf('katallan', 'katallani', 'the giant'), w('fle'), p('.'))),
      unless('night', L(wf('katallan', 'katallani', 'the giant'), w('nuk'), w('fle'), p('.'))),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'katallanRob', reveal: 'udhetar' },
      { text: L(w('sheh'), wf('zjarr', 'zjarrin', 'the fire')), to: 'katallanZjarr', reveal: 'zjarr' },
      { text: L(w('prek'), wf('gur', 'gurin', 'the stone')), to: 'katallanGur', reveal: 'gur' },
      { text: L(w('lufto'), wf('katallan', 'katallanin', 'the giant')), to: 'katallanVdes' },
      // bide in the shadows till the giant sleeps
      { text: L(w('prit'), wf('naten', 'natën', 'night')), unless: 'night', to: 'katallan1', time: 'night' },
      { text: L(w('ik'), w('shpejt')), to: 'mali1' },
    ],
  },


  // === KATALLAN'S CAVE (open): the fire-stake, the door, the captive, the escape
  katallanRob: {
    id: 'katallanRob',
    text: [
      L(w('nje'), w('udhetar'), w('rri'), w('ketu'), p('.')),
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':'), w('verbo'), wf('sy', 'syrin', 'the eye'), p('!')),
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':'), w('ik'), w('me'), w('dash'), p('!')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'katallan1' },
    ],
  },

  katallanGur: {
    id: 'katallanGur',
    text: [
      L(w('ti'), w('prek'), wf('gur', 'gurin', 'the stone'), p('.')),
      L(wf('gur', 'guri', 'the stone'), w('eshte'), w('i_art'), w('madh'), p('.')),
      L(w('ti'), w('nuk'), wf('ngre', 'ngre', 'lift'), wf('gur', 'gurin', 'the stone'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'katallan1' },
    ],
  },

  katallanZjarr: {
    id: 'katallanZjarr',
    text: [
      L(w('nje'), w('zjarr'), w('rri'), w('ketu'), p('.')),
      L(w('ti'), wf('bej', 'bën', 'make'), w('nje'), w('hu'), p('.')),
      L(wf('hu', 'huri', 'the stake'), w('rri'), wf('ne', 'në', 'in'), w('zjarr'), p('.')),
      when('night', L(w('naten'), wf('katallan', 'katallani', 'the giant'), w('fle'), p('.'))),
      unless('night', L(wf('katallan', 'katallani', 'the giant'), w('sheh'), p('.'))),
    ],
    options: [
      // the eye is struck only while the giant sleeps
      { text: L(w('godit'), w('me'), w('hu')), to: 'katallanVerbim', reveal: 'hu', requires: 'night' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'katallan1' },
    ],
  },

  katallanVerbim: {
    id: 'katallanVerbim',
    text: [
      L(w('ti'), w('godit'), wf('sy', 'syrin', 'the eye'), p('.')),
      L(wf('katallan', 'katallani', 'the giant'), w('nuk'), w('sheh'), p('.')),
      L(wf('katallan', 'katallani', 'the giant'), w('rri'), wf('ne', 'në', 'in'), wf('dere', 'derën', 'the door'), p('.')),
      L(w('nje'), w('dash'), w('rri'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('ik'), w('me'), wf('dash', 'dashin', 'the ram')), to: 'katallanFund', reveal: 'dash' },
      { text: L(w('ik'), wf('vetem', 'vetëm', 'alone')), to: 'katallanVdes' },
    ],
  },

  katallanFund: {
    id: 'katallanFund',
    end: 'secret',
    title: 'The One-Eyed Giant',
    blurb:
      'The Katallan — the one-eyed, knee-less giant who eats the travellers that stray into his cave — never saw you coming, for you put out his single eye while he slept; and when he groped for you at the cave-mouth you slipped past clinging to the belly of his own ram, the oldest trick in the world. Homer told it of the Cyclops; the Albanians tell it of the Katallan, and on the mountain road they still warn you never to trust a giant with one eye.',
    text: [
      L(w('ti'), wf('verbo', 'verbon', 'blind'), wf('katallan', 'katallanin', 'the giant'), p('.')),
      L(w('ti'), w('ik'), w('me'), wf('dash', 'dashin', 'the ram'), p('.')),
    ],
    options: [],
  },

  katallanVdes: {
    id: 'katallanVdes',
    end: 'bad',
    title: 'Eaten by the Katallan',
    blurb:
      'You raised your blade to a giant twice your height, and he simply ate you. The Katallan is never beaten with strength — only the cunning that blinds his one eye and rides out under his ram. Force was the wrong answer, as it always is with the one-eyed giant.',
    text: [
      L(wf('katallan', 'katallani', 'the giant'), w('te_obj'), w('ha'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: Falja e Gjakut — ending a blood-feud (Kanun §988; Anton Çetta) ===
  gjak1: {
    id: 'gjak1',
    text: [
      L(w('ketu'), w('dy'), wf('njeri', 'njerëz', 'people'), wf('lufto', 'luftojnë', 'fight'), p('.')),
      L(w('nje'), w('njeri'), wf('vrit', 'vrau', 'killed'), w('nje'), w('vella'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('do', 'duan', 'want'), w('gjak'), p('.')),
      L(w('nje'), w('bese'), w('mund'), w('te_subj'), w('mbyll'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(w('premto'), w('nje'), w('bese')), to: 'gjak2', reveal: 'gjak' },
      { text: L(w('kthehu')), to: 'fshatiDil' },
    ],
  },

  gjak2: {
    id: 'gjak2',
    text: [
      L(w('ti'), wf('premto', 'premton', 'swear'), w('nje'), w('bese'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('behet', 'bëhen', 'become'), wf('vella', 'vëllezër', 'brothers'), p('.')),
      L(w('nje'), w('plak'), w('thote'), p(':'), w('ata'), wf('eshte', 'janë', 'are'), wf('vella', 'vëllezërit', 'the brothers'), w('tuaj'), w('tani'), p('.')),
      // the Kanun on the reconciliation meal — §631: "Buka e lan dâmin" (Gheg)
      Q('Kanuni i Lekë Dukagjinit, §631',
        wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('buke', 'buka', 'the bread'), w('e_obj'), w('lan'), wf('dem_harm', 'dëmin', 'the harm'), p('.')),
      L(wf('gjak', 'gjaku', 'the blood'), wf('yt', 'tënd', 'your'), w('dhe'), wf('gjak', 'gjaku', 'the blood'), w('i_link'), w('tij'), wf('eshte', 'janë', 'are'), w('nje'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('njeri', 'njerëzit', 'the people')), to: 'gjakFund' },
    ],
  },

  gjakFund: {
    id: 'gjakFund',
    end: 'secret',
    title: 'The Peacemaker',
    blurb:
      'Two houses were locked in gjakmarrja — blood for blood, koka për kokë, head for head — and the road would not open until it ended. You did what the pleqësia of elders do under the Kanun: you brokered the besa, and pleaded the pardon, the falja e gjakut, until the killer and the avenger drank together and became new brothers. A besa kept is worth more than a head taken.',
    text: [
      L(wf('gjak', 'gjaku', 'the blood-feud'), w('mbaroi'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('behet', 'bëhen', 'become'), wf('vella', 'vëllezër', 'brothers'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: Zuku Bajraktar — the blinded kreshnik (Palaj-Kurti, Song 11) ===
  zuku1: {
    id: 'zuku1',
    text: [
      L(w('ketu'), w('nje'), w('trim'), w('nuk'), w('sheh'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(w('nje'), w('nene'), wf('verbo', 'verboi', 'blinded'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), wf('quhem', 'quhet', 'is called'), w('zuku'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), wf('ka', 'kishte', 'had'), w('nje'), w('mik'), p(':'), w('nje'), w('baloz'), p('.'), wf('nene', 'nëna', 'the mother'), wf('verbo', 'verboi', 'blinded'), wf('bir', 'birin', 'the son'), w('per'), wf('baloz', 'balozin', 'the sea-monster'), p('.')),
      L(w('nje'), w('ora'), w('jep'), w('bar'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('bar'), wf('trim', 'trimit', 'to the hero')), to: 'zuku2', reveal: 'bar' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  zuku2: {
    id: 'zuku2',
    text: [
      L(wf('trim', 'trimi', 'the hero'), w('sheh'), w('perseri'), p('.')),
      L(wf('trim', 'trimi', 'the hero'), wf('premto', 'premton', 'swears'), w('nje'), w('bese'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('trim', 'trimin', 'the hero')), to: 'zukuFund' },
    ],
  },

  zukuFund: {
    id: 'zukuFund',
    end: 'secret',
    title: 'Zuku Bajraktar',
    blurb:
      'You found Zuku Bajraktar — a kreshnik, one of the giant border-warriors of the old highland songs, blinded by his own mother, who the song says had taken the part of a sea-monster her son once captured — stumbling sightless on the drought-cracked mountain. As an Ora once did in the old song, you healed his eyes with her mountain herb; and seeing again, he swore you his besa. Now the blinded hero rides at your side, and there is no Baloz nor Kulshedra that two such men cannot bring down.',
    text: [
      L(wf('trim', 'trimi', 'the hero'), wf('lufto', 'lufton', 'fights'), w('me'), w('ti'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: Kordha & the Three Sworn Brothers — the external soul (Elsie no. 3) ===
  // Kordha ("Sword"), Ylli ("Star," who leaps), Deti ("Sea," who dives); Kordha's life is
  // hidden in his sabre. A treacherous crone learns the secret and steals it; Deti dives
  // to the deep to recover it. The lesson: never tell where your soul is kept.
  kordha1: {
    id: 'kordha1',
    text: [
      L(w('ketu'), w('tre'), wf('vella', 'vëllezër', 'brothers'), p('.')),
      L(w('nje'), w('vella'), wf('kerce', 'kërcen', 'leaps'), w('larg'), p('.')),
      L(w('nje'), w('vella'), w('zhytet'), w('thelle'), p('.')),
      L(w('nje'), w('vella'), w('ka'), w('nje'), wf('shpate', 'shpatë', 'sword'), p('.')),
      L(wf('fuqi', 'fuqia', 'the power'), w('e_link'), wf('vella', 'vëllait', 'the brother'), w('eshte'), w('ne'), wf('shpate', 'shpatë', 'the sword'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), wf('do', 'duan', 'want'), w('nje'), w('bese'), p('.')),
    ],
    options: [
      { text: L(w('premto'), w('nje'), w('bese')), to: 'kordhaMoat', reveal: 'tre' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylli1' },
    ],
  },

  kordha2: {
    id: 'kordha2',
    text: [
      L(w('ti'), w('merr'), wf('bukura', 'Bukurën', 'the Beauty'), w('e_link'), wf('toke', 'Dheut', 'the Earth'), p('.')),
      L(w('ti'), wf('ka', 'ke', 'have'), w('dy'), wf('vella', 'vëllezër', 'brothers'), p(':'), wf('yll', 'Ylli', 'the Star'), w('dhe'), wf('det', 'Deti', 'the Sea'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), wf('mban', 'mbajnë', 'keep'), w('nje'), w('pende'), p('.'), w('kur'), w('ti'), wf('vdes', 'vdes', 'die'), p(','), wf('pende', 'penda', 'the feather'), w('ka'), w('gjak'), p('.')),
      L(wf('jete', 'jeta', 'the life'), wf('yt', 'jote', 'your'), w('rri'), wf('ne', 'në', 'in'), wf('shpate', 'shpatën', 'the sword'), p('.')),
      L(w('nje'), w('plake'), w('do'), wf('fuqi', 'fuqinë', 'the power'), p('.')),
    ],
    options: [
      { text: L(w('fol'), wf('per', 'për', 'about'), w('fuqi')), to: 'kordhaDeti', reveal: 'fuqi' },
      { text: L(w('rri'), w('i_art'), w('qete')), to: 'kordhaFund' },
    ],
  },

  // === KORDHA flagship: the moat, the Beauty's palace, the trial =========
  kordhaMoat: {
    id: 'kordhaMoat',
    text: [
      L(w('nje'), w('mbret'), w('ka'), w('nje'), w('vajze'), p('.')),
      L(w('nje'), w('hendek'), w('rri'), w('ketu'), p('.')),
      L(wf('hendek', 'hendeku', 'the moat'), w('eshte'), w('i_art'), w('madh'), p('.')),
      L(w('burra'), wf('hidh', 'hedhin', 'throw'), w('nje'), w('gur'), w('te_link'), w('madh'), p('.')),
      L(w('nje'), w('vella'), wf('kerce', 'kërcen', 'leaps'), w('mbi'), wf('hendek', 'hendekun', 'the moat'), p('.')),
    ],
    options: [
      { text: L(wf('kerce', 'kërce', 'leap'), w('me'), wf('vella', 'vëllezërit', 'the brothers')), to: 'kordhaUdha', reveal: 'hendek' },
      { text: L(wf('kerce', 'kërce', 'leap'), wf('vetem', 'vetëm', 'alone')), to: 'kordhaMoatVdes' },
    ],
  },

  kordhaMoatVdes: {
    id: 'kordhaMoatVdes',
    end: 'bad',
    title: 'The Moat',
    blurb:
      'The king’s moat was too wide for any man to clear alone — that was the whole cruelty of his challenge, and the heads along his wall proved it. Ylli the Star could have carried all of you over in a single leap; you tried it on your own, and the dark water closed over your head. A sworn brother’s gift is no use to the one too proud to take it.',
    text: [
      L(w('ti'), wf('kerce', 'kërcen', 'leap'), wf('vetem', 'vetëm', 'alone'), p('.')),
      L(w('ti'), w('bie'), wf('ne', 'në', 'in'), wf('hendek', 'hendekun', 'the moat'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  kordhaUdha: {
    id: 'kordhaUdha',
    text: [
      L(w('nje'), w('vella'), wf('kerce', 'kërcen', 'leaps'), w('me'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('mbi'), wf('hendek', 'hendekun', 'the moat'), p('.')),
      L(w('nje'), w('vella'), w('ka'), w('nje'), w('pende'), p('.')),
      L(wf('pende', 'penda', 'the feather'), w('ka'), w('gjak'), wf('ne', 'në', 'in'), w('rrezik'), p('.')),
      L(w('larg'), w('rri'), wf('pallat', 'pallati', 'the palace'), w('e_link'), wf('bukura', 'Bukurës', 'the Beauty'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pallat')), to: 'kordhaPallat', reveal: 'pallat' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylli1' },
    ],
  },

  kordhaPallat: {
    id: 'kordhaPallat',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'in'), wf('pallat', 'pallatin', 'the palace'), w('e_link'), wf('bukura', 'Bukurës', 'the Beauty'), p('.')),
      L(w('nje'), w('kulshedra'), w('ruan'), wf('pallat', 'pallatin', 'the palace'), p('.')),
      L(w('kulshedra'), w('ka'), w('zjarr'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), w('me'), wf('vella', 'vëllezërit', 'the brothers')), to: 'kordhaProva' },
      { text: L(wf('hyr', 'hyn', 'enter'), wf('vetem', 'vetëm', 'alone')), to: 'kordhaZjarr', reveal: 'kulshedra' },
    ],
  },

  kordhaZjarr: {
    id: 'kordhaZjarr',
    end: 'bad',
    title: 'The Palace Guard',
    blurb:
      'The Earthly Beauty’s palace was guarded by a Kulshedra and her brood, and no single sword could pass them — which is exactly why heroes go to win her sworn together, not alone. You rushed the gate by yourself, and the she-dragon’s fire was the last thing you saw.',
    text: [
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('vetem', 'vetëm', 'alone'), p('.')),
      L(w('ti'), w('vdes'), wf('ne', 'në', 'in'), w('zjarr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  kordhaProva: {
    id: 'kordhaProva',
    text: [
      L(w('kulshedra'), w('vdes'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('rri'), wf('ne', 'në', 'in'), wf('pallat', 'pallatin', 'the palace'), p('.')),
      L(w('nje'), w('krua'), w('rri'), w('ketu'), p('.')),
      L(w('pi'), w('nga'), wf('krua', 'kroi', 'the spring'), w('pa'), wf('dore', 'dorë', 'a hand'), p('.')),
    ],
    options: [
      { text: L(w('pi'), w('pa'), wf('dore', 'dorë', 'a hand')), to: 'kordha2', reveal: 'krua' },
      { text: L(w('pi'), w('me'), wf('dore', 'dorë', 'a hand')), to: 'kordhaProvaVdes' },
    ],
  },

  kordhaProvaVdes: {
    id: 'kordhaProvaVdes',
    end: 'bad',
    title: 'The Trial of the Spring',
    blurb:
      'The Earthly Beauty is not won by force but by passing her trials her own way — and the first is to drink from her spring without ever touching it with your hands. You reached in with both hands like any thirsty man, and the palace closed over you. Her hand is earned by the one who heeds her rule, not the one who grabs.',
    text: [
      L(w('ti'), w('pi'), w('me'), wf('dore', 'dorë', 'a hand'), p('.')),
      L(wf('pallat', 'pallati', 'the palace'), w('te_obj'), w('merr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  kordhaFund: {
    id: 'kordhaFund',
    end: 'secret',
    title: 'The Three Sworn Brothers',
    blurb:
      'You held your tongue. The crone never learned that, like Kordha of the old tale, a hero may keep his very life hidden in his blade — so no one could steal your strength and cast it in the sea. Kordha the Sword, Ylli the Star who clears the castle moat with all three on his back, and Deti the Sea who dives to its floor swore you brotherhood, and four such men go down against the Kulshedra as one.',
    text: [
      L(w('ti'), w('rri'), w('i_art'), w('qete'), p('.')),
      L(w('tre'), wf('vella', 'vëllezër', 'brothers'), wf('lufto', 'luftojnë', 'fight'), w('me'), w('ti'), p('.')),
    ],
    options: [],
  },

  kordhaDeti: {
    id: 'kordhaDeti',
    end: 'secret',
    title: 'Deti’s Dive',
    blurb:
      'You told the crone where your strength was kept — as Kordha, in the old tale, once let his own secret slip — and she stole the blade and flung it into the sea, and you sickened unto death. But Deti, the brother who can dive to the floor of any water, went down into the dark and brought your soul back to you. You live, barely, and you have learned the oldest rule of the heroes: never tell a living soul where your own is hidden.',
    text: [
      L(wf('plake', 'plaka', 'the crone'), w('merr'), wf('shpate', 'shpatën', 'the sword'), p('.')),
      L(w('ti'), w('fle'), w('thelle'), p('.')),
      L(w('nje'), w('pende'), w('ka'), w('gjak'), p('.')),
      L(wf('vella', 'vëllezërit', 'the brothers'), w('vjen'), p('.')),
      L(wf('det', 'deti', 'the sea-brother'), wf('shpeto', 'shpëton', 'saves'), wf('shpate', 'shpatën', 'the sword'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: Shurdhi — the storm-god of hail and thunder (Lambertz; Tirta; Elsie) ===
  shurdhi1: {
    id: 'shurdhi1',
    text: [
      L(w('ne'), w('re'), w('rri'), w('shurdhi'), p('.')),
      L(w('shurdhi'), w('ka'), w('rrufe'), w('dhe'), w('bresher'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('godit', 'godasin', 'strike'), w('hekur'), p('.')),
    ],
    options: [
      { text: L(w('godit'), w('hekur')), to: 'shurdhiFund', reveal: 'shurdhi' },
      { text: L(w('ik'), w('shpejt')), to: 'maliStuhi' },
    ],
  },

  shurdhiFund: {
    id: 'shurdhiFund',
    end: 'secret',
    title: 'Shurdhi’s Storm',
    blurb:
      'High in the hail-clouds rides Shurdhi, the northern storm-god who hurls thunder and lightning and looses the crops-killing hail; he is no giver of gentle rain. The old people knew only one answer to him — to bang on iron and fire their guns into the sky and drive him away — and so you beat the iron until he turned his black storm aside, and the village was spared the hail. Some storms you do not pray to; you drive them off.',
    text: [
      L(w('shurdhi'), wf('ik', 'ikën', 'flees'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('eshte'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  // === SIDE-QUEST: Mujo's oracular horse (Kângë Kreshnikësh; Palaj-Kurti) ===
  kali1: {
    id: 'kali1',
    text: [
      L(w('ketu'), w('nje'), wf('kale', 'kalë', 'horse'), p('.')),
      L(wf('kale', 'kali', 'the horse'), w('flet'), w('dhe'), w('sheh'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('ky'), w('eshte'), wf('kale', 'kali', 'the horse'), w('i_link'), w('mujo'), p('.')),
      L(wf('kale', 'kali', 'the horse'), wf('ik', 'ikën', 'flees'), w('nga'), w('nje'), w('dore'), w('e_art'), wf('keq', 'keqe', 'bad'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('kale', 'kalin', 'the horse')), to: 'kaliFund', reveal: 'kale' },
      { text: L(w('merr'), wf('kale', 'kalin', 'the horse')), to: 'humbur' },
      { text: L(w('zbrit')), to: 'mali3' },
    ],
  },

  kaliFund: {
    id: 'kaliFund',
    end: 'secret',
    title: 'Mujo’s Horse',
    blurb:
      'You did not seize the horse by force — for Mujo’s courser shies from a cruel or unworthy hand — but spoke to it gently and earned its trust. Now the oracular horse that foretells the future, grieves for a fallen rider, and runs swift as the wind, bears you toward the Kulshedra, and warns you of every danger before it comes.',
    text: [
      L(wf('kale', 'kali', 'the horse'), w('ec'), w('me'), w('ti'), p('.')),
      L(wf('kale', 'kali', 'the horse'), w('sheh'), w('rrezik'), p('.')),
    ],
    options: [],
  },

  thesarLeave: {
    id: 'thesarLeave',
    end: 'secret',
    title: 'The Gold Left Buried',
    blurb:
      'You heeded the old man and never set foot in the cavern. In the tale the old men tell, men do go down with torches to look — the bazaar of the dead city heaped with fruit and flesh, jewels and fair raiment — but let one hand close on one thing and the torch goes out, and the serpent-Oras devour the thief in the dark; no man has ever carried out so much as a coin. The only ones who come back are the ones who walk out exactly as they came in, empty-handed and alive. You never even went down — and the old people say that is the wisest walk of all.',
    text: [
      L(w('ti'), w('ec'), w('larg'), p('.')),
      L(wf('ar', 'ari', 'the gold'), w('rri'), w('ne'), wf('shpelle', 'shpellë', 'the cave'), p('.')),
    ],
    options: [],
  },

  oraVerdhe: {
    id: 'oraVerdhe',
    end: 'bad',
    title: 'The Yellow Ora',
    blurb:
      'You had no offering for her, but you did not flee her either. The Fate who met you in the dark was e Verdha, the Yellow — of the three Fates, the one who deals out bad luck and hard spells. She let you keep your life; but hers is the cold gift, and ill-fortune followed you out of the dark.',
    text: [
      L(wf('ora', 'Ora', 'the spirit'), w('te_obj'), wf('ndihmo', 'ndihmon', 'helps'), p('.')),
      L(w('por'), w('ti'), w('humbet'), w('perseri'), p('.')),
    ],
    options: [],
  },

  nastradin2: {
    id: 'nastradin2',
    text: [
      L(w('perseri'), wf('hoxha', 'hoxha', 'the hodja'), w('merr'), wf('kazan', 'kazanin', 'the cauldron'), p('.')),
      L(wf('hoxha', 'hoxha', 'the hodja'), w('thote'), p(':'), wf('kazan', 'kazani', 'the cauldron'), w('vdes'), p('!')),
    ],
    options: [
      { text: L(w('ec'), w('larg')), to: 'nastradinFund' },
      { text: L(w('kerko'), wf('kazan', 'kazanin', 'the cauldron')), to: 'nastradinUrte', reveal: 'kazan' },
    ],
  },

  nastradinUrte: {
    id: 'nastradinUrte',
    end: 'secret',
    title: 'If a Cauldron Can Be Born',
    blurb:
      'You demanded your cauldron back. Nastradin Hoxha only spread his hands: last time it gave birth, and you pocketed the little pot gladly enough — so if a cauldron can give birth, surely it can also die. You had no answer, having kept the child. That is Nastradin all over — the wise-fool hodja whose absurd logic is a mirror: it shows each man the exact size of his own greed.',
    text: [
      L(wf('hoxha', 'hoxha', 'the hodja'), w('thote'), p(':'), wf('kazan', 'kazani', 'the cauldron'), w('vdes'), p('.')),
      L(w('ti'), w('ec'), w('larg'), w('pa'), wf('kazan', 'kazanin', 'the cauldron'), p('.')),
    ],
    options: [],
  },

  kostandinPushim: {
    id: 'kostandinPushim',
    end: 'secret',
    title: 'Let the Dead Rest',
    blurb:
      'You did not let the old woman speak the curse that would tear her son from his grave. You sat with her grief until the bitterness passed, and she let Kostandin lie still in the earth. No lugat — no dead man risen from his grave — rode the night roads; Doruntine, the far-married sister, never came home across the mountains, and the besa went unkept — but no one fell dead upon the threshold, and the dead slept on in peace. Some say a besa unkept is a wound that never heals; some say the living were owed their lives.',
    text: [
      L(wf('vella', 'vëllai', 'the brother'), w('fle'), wf('ne', 'në', 'on'), w('toke'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('rri'), w('i_art'), w('qete'), p('.')),
    ],
    options: [],
  },

  // The guest you FED reveals herself an Ora and blesses you (mirror of shtrigaNate, where
  // the guest you turn away becomes a Shtriga). The Ora takes an old woman's form (doc §4)
  // and her blessing strengthens the hero, as a Zana's does (§4). A real trade-off: carry
  // the boon onward, or take the peaceful good ending now.
  besaBekim: {
    id: 'besaBekim',
    text: [
      L(w('naten'), wf('plake', 'plaka', 'the old woman'), w('behet'), w('nje'), w('ora'), p('.')),
      L(wf('ora', 'Ora', 'the spirit'), w('te_obj'), w('jep'), w('nje'), w('bekim'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('bekim', 'bekimin', 'the blessing')), grant: 'bekim', to: 'pylliLoop', reveal: 'bekim' },
      // rest by the blessed fire — the ending wakes you "at dawn, safe and strong"
      { text: L(w('fle'), w('ketu')), to: 'besaFire', time: 'dawn' },
    ],
  },

  // Act-1 buildup bottleneck on the shared spine. The hospitality rite (bukë e krypë; a
  // guest is sent by God) and the village's grief, before the dragua/besa revelation —
  // adds forced investment so the central quest is not reached on a single click. (§10)
  // The men's ODA — the guest-room building. A stranger is a guest sent by God,
  // so the old man receives you with bread and salt; here the besa is spoken.
  oda1: {
    id: 'oda1',
    text: [
      // you ENTER only from the square; from the book, the talkers, or waking
      // at dawn you are already inside
      from('fshatiSheshi', L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'to'), w('nje'), w('oda'), p('.'))),
      // the canonical greeting-pair of the threshold — the Kanun (§620) commands
      // the first; the second is the guest's set reply
      Q('Kanuni i Lekë Dukagjinit, §620',
        wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('mire'), w('se'), wf('vjen', 'erdhe', 'came'), p('!')),
      Q('përgjigjja e mikut — urim i moçëm',
        w('ti'), wf('thote', 'thua', 'say'), p(':'), w('mire'), w('se'), w('ju'), wf('gjen', 'gjeta', 'found'), p('!')),
      notFrom('fshatiSheshi', L(w('ti'), w('je'), w('perseri'), wf('ne', 'në', 'in'), w('oda'), p('.'))),
      // the night's sleep among the men ends with the light at the windows
      became('dawn', L(w('tani'), w('eshte'), w('agim'), p('.'))),
      L(wf('plak', 'plaku', 'the old man'), w('jep'), w('buke'), w('dhe'), w('kripe'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('mik'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('si'), w('je'), p('?'), w('kush'), w('je'), w('ti'), p('?')),
      L(w('une'), wf('thote', 'them', 'say'), p(':'), w('une'), w('jam'), w('nje'), w('udhetar'), p('.'), w('faleminderit'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('vjen', 'eja', 'come'), p(','), w('ha'), w('buke'), w('edhe'), w('kripe'), p('!')),
      L(w('nese'), w('ti'), w('je'), w('nje'), w('mik'), p(','), wf('plak', 'plaku', 'the old man'), w('na'), w('jep'), w('buke'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('shtepi', 'shtëpia', 'the house'), w('eshte'), w('e_link'), wf('perendi', 'Perëndisë', 'God'), w('dhe'), w('e_link'), w('mik'), p('.')),
      L(w('tani'), w('eshte'), wf('ne', 'në', 'in'), w('rregull'), p('.')),
      L(w('ketu'), wf('rri', 'rrinë', 'rest'), wf('udhetar', 'udhëtarë', 'travellers'), p('.')),
      // evenings, the old man of the square sits in here too (npcs.js plakuSheshit)
      when('npc:plakuSheshit', L(w('nje'), w('plak'), w('tjeter'), w('rri'), w('ketu'), p('.'))),
      L(wf('ne', 'në', 'in'), w('oda'), w('rri'), w('nje'), w('njeri'), w('me'), w('nje'), w('arme'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('liber'), p('.')),
    ],
    options: [
      { text: L(w('ha'), w('buke')), to: 'oda2', reveal: 'mik' },
      { text: L(w('degjo'), wf('udhetar', 'udhëtarët', 'the travellers')), to: 'udhetaret', reveal: 'udhetar' },
      { text: L(w('fol'), w('me'), wf('njeri', 'njeriun', 'the person')), to: 'burrnesha1', reveal: 'njeri' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'odaPlak', reveal: 'plak' },
      { text: L(w('sheh'), wf('liber', 'librin', 'the book')), to: 'libriDiell', reveal: 'liber' },
      // the oda is where travellers bed down — the town's rest-jump to morning
      { text: L(w('fle'), w('ketu')), unless: 'dawn', to: 'oda1', time: 'dawn', reveal: 'udhetar' },
      { text: L(w('dil'), w('jashte')), to: 'fshatiSheshi' },
    ],
  },

  // The old man of the oda tells the tale that names the far quest: the childless
  // queen who prayed to the Sun, promised her daughter, and lost her at twelve.
  // (Relocated from the palace gate, where a guard now keeps the door.)
  odaPlak: {
    id: 'odaPlak',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      // Dozon's Tale IX — "La fille promise au soleil", the very tale the old man
      // tells — opens in print with exactly this formula
      Q('formula e përrallës (Dozon, 1879)',
        wf('eshte', 'ish', 'was'), w('e_conj'), wf('mos', 'mos', 'not'), wf('eshte', 'ish', 'was'), p('…')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('nuk'), w('ka'), w('femije'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('lut'), wf('diell', 'diellin', 'the Sun'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), wf('premto', 'premton', 'promises'), wf('bije', 'bijën', 'the daughter'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('eshte'), w('dymbedhjete'), wf('vit', 'vjet', 'years'), p('.')),
      L(w('diell'), w('merr'), wf('bije', 'bijën', 'the daughter'), p('.')),
      // the teller's sign-off (Lambertz records it in Tirana): the tale there,
      // health here!
      Q('mbyllja e tregimtarit (Lambertz)',
        wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('perralle', 'përralla', 'the tale'), w('atje'), p(','), wf('shendet', 'shëndeti', 'the health'), w('ketej'), p('!')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('oda')), to: 'oda1' },
    ],
  },

  // =========================================================================
  // THE TRAVELLERS' TALES — the oda as the village's window on the wider world.
  // Each guest's tale points to a DIFFERENT realm (a pilgrim → the Sky/Tomorr, a
  // man of the coast → the Sea/Baloz, a lahutar → the kreshnikë/Jutbina), and an
  // old grandmother watches you and speaks of the dragua — foreshadowing the caul.
  // Pure lore/lures: you hear of a place, then go to it the proper way.
  // =========================================================================
  udhetaret: {
    id: 'udhetaret',
    text: [
      L(w('ketu'), wf('rri', 'rrinë', 'rest'), wf('udhetar', 'udhëtarë', 'travellers'), p('.')),
      L(w('nje'), w('flet'), wf('per', 'për', 'about'), w('mal'), p('.')),
      L(w('nje'), w('flet'), wf('per', 'për', 'about'), w('det'), p('.')),
      L(w('nje'), wf('kendo', 'këndon', 'sings'), wf('per', 'për', 'about'), w('mujo'), p('.')),
      L(w('nje'), w('flet'), wf('per', 'për', 'about'), w('nje'), w('trim'), w('te_link'), w('vjeter'), p('.')),
      L(w('nje'), w('udhetar'), w('thote'), p(':'), w('hej'), p(','), w('mik'), p('!')),
      L(w('cfare'), wf('kerko', 'kërkon', 'seek'), w('ti'), p('?'), w('pse'), w('je'), w('ketu'), p('?')),
      L(w('une'), wf('thote', 'them', 'say'), p(':'), w('une'), wf('mendoj', 'mendoj', 'think'), w('se'), wf('uje', 'uji', 'the water'), w('rri'), w('tek'), wf('mal', 'mali', 'the mountain'), p('.')),
      L(w('ju'), wf('jam', 'jeni', 'are'), wf('trim', 'trima', 'heroes'), p('.')),
      L(w('cfare'), wf('ka', 'keni', 'have'), wf('sheh', 'parë', 'seen'), p('?')),
      L(w('pse'), w('ata'), wf('rri', 'rrinë', 'rest'), w('ketu'), p('?')),
      L(w('nje'), w('udhetar'), w('flet'), wf('per', 'për', 'about'), wf('nene', 'nënën', 'the mother'), w('e_link'), w('tij'), p('.')),
      L(w('ai'), w('thote'), p(':'), wf('nene', 'nëna', 'the mother'), wf('im', 'ime', 'my'), w('rri'), w('atje'), p(','), w('larg'), p('.')),
      L(w('une'), wf('do', 'dua', 'want'), wf('nene', 'nënën', 'the mother'), wf('im', 'time', 'my'), p('.')),
      L(w('une'), w('duhet'), w('te_subj'), wf('shko', 'shkoj', 'go'), p('.')),
      L(w('pra'), p(','), wf('jam', 'jemi', 'are'), wf('udhetar', 'udhëtarë', 'travellers'), p('.')),
      L(w('nje'), w('plake'), w('te_obj'), w('sheh'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('per', 'për', 'about'), w('mal')), to: 'tregMal', reveal: 'mal' },
      { text: L(w('degjo'), wf('per', 'për', 'about'), w('det')), to: 'tregDet', reveal: 'det' },
      { text: L(w('degjo'), wf('per', 'për', 'about'), w('mujo')), to: 'tregMujo', reveal: 'mujo' },
      { text: L(w('degjo'), wf('per', 'për', 'about'), wf('trim', 'trimin', 'the hero')), to: 'skender1', reveal: 'trim' },
      { text: L(w('degjo'), wf('plake', 'plakën', 'the old woman')), to: 'tregDragua', reveal: 'plake' },
      { text: L(w('fol'), w('me'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'udhetaretBisede', reveal: 'udhetar' },
      // own a lahuta and the oda is a stage: sing of Muji, earn a singer's due
      { text: L(w('kendo'), w('me'), wf('lahute', 'lahutën', 'the lute')), requires: 'lahute', lek: 10, to: 'kengaLahute', reveal: 'mujo' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('oda')), to: 'oda1' },
    ],
  },

  // Your song in the oda — the lahuta bought at the market earns its forty lek
  // back ten at a time, the way the wandering lahutarë have always eaten.
  kengaLahute: {
    id: 'kengaLahute',
    text: [
      // the singer's invocation before the song, exactly as Fishta opens the
      // epic: "Ndihmo', Zot, si m'ké ndihmue!" (Gheg)
      Q('Lahuta e Malcís — Gjergj Fishta',
        w('ti'), wf('thote', 'thua', 'say'), p(':'), w('ndihmo'), p(','), w('zot'), p(','), wf('si', 'si', 'as'), wf('me_obj', 'më', 'me'), w('ke'), wf('ndihmo', 'ndihmuar', 'helped'), p('!')),
      L(w('ti'), wf('kendo', 'këndon', 'sing'), w('me'), wf('lahute', 'lahutën', 'the lute'), wf('per', 'për', 'about'), w('mujo'), p('.')),
      L(w('burra'), wf('rri', 'rrinë', 'sit'), w('dhe'), wf('degjo', 'dëgjojnë', 'listen'), p('.')),
      L(w('burra'), wf('jep', 'japin', 'give'), w('dhjete'), w('lek'), p('.')),
      L(w('nje'), w('plak'), w('thote'), p(':'), w('ti'), wf('kendo', 'këndon', 'sing'), w('si'), w('nje'), w('trim'), p('!')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  // A traveller talking plans and farewells — a flavour vignette (talk-and-
  // return) carrying the plans/positive words of the 351-400 band.
  udhetaretBisede: {
    id: 'udhetaretBisede',
    text: [
      L(w('nje'), w('udhetar'), w('thote'), p(':')),
      L(w('une'), w('jam'), w('lumtur'), p('.')),
      L(wf('shko', 'shkoni', 'go'), w('menjehere'), p('!')),
      L(w('une'), wf('ka', 'kam', 'have'), w('nje'), w('ide'), p('.')),
      L(w('eshte'), w('nje'), w('mundesi'), p('.')),
      L(wf('cili', 'cila', 'which'), w('rruge'), p('?')),
      L(wf('vend', 'vendet', 'the places'), wf('tone', 'tona', 'our'), wf('eshte', 'janë', 'are'), w('larg'), p('.')),
      L(wf('ne', 'në', 'in'), w('mes'), wf('mal', 'malit', 'the mountain'), w('eshte'), wf('uje', 'uji', 'the water'), p('.')),
      L(w('derisa'), w('ne_we'), wf('shko', 'shkojmë', 'go'), p('.')),
      L(wf('det', 'deti', 'the sea'), w('eshte'), w('afer'), p('?')),
      L(w('mbrapa'), w('eshte'), wf('mal', 'mali', 'the mountain'), p('.')),
      L(wf('rruge', 'rruga', 'the road'), w('eshte'), w('e_link'), wf('sigurt', 'sigurtë', 'safe'), p('?')),
      L(wf('gje', 'gjërat', 'the things'), wf('eshte', 'janë', 'are'), wf('mire', 'mira', 'good'), p('.')),
      L(w('une'), wf('shko', 'shkoj', 'go'), w('tek'), wf('ajo', 'asaj', 'to her'), p('.')),
      L(w('tere'), wf('fshat', 'fshati', 'the village'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'udhetaretBisede2' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('udhetar', 'udhëtarët', 'the travellers')), to: 'udhetaret' },
    ],
  },

  // A traveller who was a soldier recounts a fight — a flavour vignette carrying
  // the warrior/heroic words of the 451-500 band.
  udhetaretBisede2: {
    id: 'udhetaretBisede2',
    text: [
      L(w('nje'), w('udhetar'), w('thote'), p(':')),
      L(w('o'), wf('plak', 'plako', 'old man'), p('!')),
      L(w('une'), wf('ka', 'kam', 'have'), w('nje'), w('arme'), p('.')),
      L(w('une'), wf('lufto', 'luftova', 'fought'), w('kunder'), w('nje'), w('baloz'), p(','), wf('si', 'si', 'as'), w('gjergj'), p('!')),
      L(w('shpirt'), w('im'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(wf('mal', 'mali', 'the mountain'), w('eshte'), wf('lart', 'lartë', 'high'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('fol', 'folur', 'spoken'), p('.')),
      L(w('une'), wf('ka', 'kam', 'have'), wf('jep', 'dhënë', 'given'), w('buke'), p('.')),
      L(w('ata'), w('duhet'), w('te_subj'), wf('jam', 'jenë', 'be'), wf('trim', 'trima', 'heroes'), p('.')),
      L(w('nje'), w('trim'), w('duhet'), w('te_subj'), wf('vjen', 'vijë', 'come'), p('.')),
      L(w('ti'), w('duhet'), w('te_subj'), wf('merr', 'marrësh', 'take'), w('nje'), w('arme'), p('.')),
      L(w('ai'), w('duhet'), w('te_subj'), wf('shko', 'shkojë', 'go'), p('.')),
      L(wf('shiko', 'shikoje', 'look'), p('!')),
      L(w('ne_we'), wf('di', 'dimë', 'know'), wf('rruge', 'rrugën', 'the road'), p('.')),
      L(w('ai'), wf('njoh', 'njeh', 'knows'), w('mua'), p('.')),
      L(w('une'), wf('jep', 'jap', 'give'), wf('ata', 'atyre', 'to them'), w('buke'), p('.')),
      L(w('une'), wf('bej', 'bëja', 'was doing'), w('nje'), w('gje'), p('.')),
      L(w('ne_we'), wf('jam', 'ishim', 'were'), wf('trim', 'trima', 'heroes'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('udhetar', 'udhëtarët', 'the travellers')), to: 'udhetaret' },
    ],
  },

  // the pilgrim's tale → the SKY realm (Zojz, the white-bull offering on Tomorr)
  tregMal: {
    id: 'tregMal',
    text: [
      L(w('nje'), w('udhetar'), w('ngjit'), wf('ne', 'në', 'to'), w('nje'), w('mal'), w('te_link'), w('shenjte'), p('.')),
      L(wf('lart', 'lart', 'high'), w('rri'), w('zojz'), w('me'), w('mjeker'), w('e_art'), w('bardhe'), p('.')),
      L(w('oh'), p(','), w('sa'), wf('lart', 'lart', 'high'), p('!')),
      L(w('ky'), w('mal'), w('eshte'), w('vertete'), w('i_art'), w('shenjte'), p('.')),
      L(w('zojz'), w('do'), w('nje'), w('dem'), w('te_link'), w('bardhe'), p('.')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  // the coast-man's tale → the SEA realm (the Baloz, e Bukura e Detit in the deep)
  tregDet: {
    id: 'tregDet',
    text: [
      L(w('larg'), w('eshte'), w('nje'), w('det'), w('te_link'), w('madh'), p('.')),
      L(w('nje'), w('baloz'), w('merr'), w('nje'), w('vajze'), p('.')),
      L(w('poshte'), w('rri'), w('bukura'), w('e_link'), wf('det', 'detit', 'the sea'), p('.')),
      L(wf('perendi', 'Perëndia', 'God'), w('ka'), wf('bej', 'bërë', 'made'), wf('det', 'detin', 'the sea'), p('.')),
      L(w('para'), wf('naten', 'natës', 'night'), p(','), wf('det', 'deti', 'the sea'), w('eshte'), w('i_art'), w('keq'), p('.')),
      L(w('nje'), w('gje'), w('e_art'), wf('keq', 'keqe', 'bad'), wf('qe', 'që', 'that'), w('rri'), w('poshte'), p('.')),
      L(w('ti'), w('shko'), w('tek'), w('det'), w('apo'), w('tek'), w('mal'), p('?')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  // the lahutar's song → the KRESHNIK realm (Mujo & Halili at Jutbina)
  tregMujo: {
    id: 'tregMujo',
    text: [
      L(w('nje'), w('lahute'), wf('kendo', 'këndon', 'sings'), wf('per', 'për', 'about'), w('mujo'), w('e_conj'), w('halil'), p('.')),
      L(w('mujo'), w('dhe'), w('halil'), wf('rri', 'rrinë', 'dwell'), w('ne'), w('jutbina'), p('.')),
      L(w('ky'), w('eshte'), w('mujo'), p('.'), w('ai'), w('eshte'), wf('trim', 'trimi', 'the hero'), p('.')),
      L(w('nje'), w('udhetar'), wf('kendo', 'këndon', 'sings'), w('duke'), wf('luan', 'luajtur', 'plays'), wf('lahute', 'lahutën', 'the lute'), p('.')),
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('lahute', 'lahutën', 'the lute')), to: 'lahuta1', reveal: 'lahute' },
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  // === THE LAHUTA — the one-string lute and the memorized epic (told in song) ===
  lahuta1: {
    id: 'lahuta1',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), wf('luan', 'luan', 'plays'), wf('lahute', 'lahutën', 'the lute'), w('dhe'), wf('kendo', 'këndon', 'sings'), p('.')),
      L(w('ai'), w('thote'), p(':'), wf('kenge', 'këngët', 'the songs'), wf('jam', 'janë', 'are'), w('te_link'), wf('vjeter', 'vjetra', 'old'), p('.')),
      L(w('une'), wf('mban', 'mbaj', 'keep'), w('mije'), wf('kenge', 'këngë', 'songs'), wf('ne', 'në', 'in'), w('koke'), p('.')),
      L(w('kush'), wf('kendo', 'këndon', 'sings'), p(','), w('nuk'), wf('vdes', 'vdes', 'dies'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('kenge', 'këngët', 'the songs')), to: 'lahutaFund', reveal: 'kenge' },
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  lahutaFund: {
    id: 'lahutaFund',
    end: 'secret',
    title: 'The Lahuta — a Thousand Songs on One String',
    blurb:
      'The traveller sang all night over the lahutë — the old lute of the highlands — and what he sang was no entertainment but a library: the Këngë Kreshnike, the songs of Mujo and Halili, thousands of lines carried in the head and re-made at every singing. Kush këndon, nuk vdes — who is sung, does not die.',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), wf('kendo', 'këndon', 'sings'), w('gjithe'), w('naten'), p('.')),
      L(w('mujo'), w('dhe'), w('halil'), wf('jeto', 'jetojnë', 'live'), wf('ne', 'në', 'in'), wf('kenge', 'këngët', 'the songs'), p('.')),
    ],
    options: [],
  },

  // === SKËNDERBEU — the goat-candle legend of Krujë, told by a traveller ======
  skender1: {
    id: 'skender1',
    text: [
      L(w('nje'), w('udhetar'), w('flet'), wf('per', 'për', 'about'), w('nje'), w('trim'), w('te_link'), w('vjeter'), p('.')),
      L(w('ai'), w('thote'), p(':'), w('skender'), wf('jam', 'ishte', 'was'), wf('trim', 'trimi', 'the hero'), w('i_art'), w('madh'), p('.')),
      L(w('nje'), w('armik'), w('i_art'), w('madh'), w('vjen'), w('me'), w('mije'), w('burra'), p('.')),
      L(wf('armik', 'armiku', 'the enemy'), w('do'), wf('kala', 'kalanë', 'the castle'), w('e_link'), wf('skender', 'Skënderbeut', 'Skanderbeg'), p('.')),
      L(wf('kala', 'kalaja', 'the castle'), wf('quhem', 'quhet', 'is called'), w('kruje'), p('.')),
      L(w('burra'), wf('ne', 'në', 'in'), wf('kala', 'kalanë', 'the castle'), wf('jam', 'janë', 'are'), w('pak'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'skender2', reveal: 'armik' },
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  skender2: {
    id: 'skender2',
    text: [
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':'), w('naten'), w('skender'), w('merr'), wf('dhi', 'dhitë', 'the goats'), p('.')),
      L(wf('dhi', 'dhitë', 'the goats'), wf('ka', 'kanë', 'have'), wf('qiri', 'qirinj', 'candles'), wf('ne', 'në', 'on'), w('bri'), p('.')),
      L(wf('qiri', 'qirinjtë', 'the candles'), wf('ka', 'kanë', 'have'), w('zjarr'), p('.')),
      L(wf('dhi', 'dhitë', 'the goats'), wf('shko', 'shkojnë', 'go'), wf('lart', 'lart', 'up'), wf('ne', 'në', 'on'), wf('kala', 'kalanë', 'the castle'), p('.')),
      L(wf('armik', 'armiku', 'the enemy'), w('sheh'), w('zjarr'), wf('ne', 'në', 'on'), wf('kala', 'kalanë', 'the castle'), p('.')),
      L(wf('armik', 'armiku', 'the enemy'), wf('mendoj', 'mendon', 'thinks'), p(':'), wf('kala', 'kalaja', 'the castle'), w('ka'), w('mije'), wf('trim', 'trima', 'heroes'), p('!')),
      L(wf('armik', 'armiku', 'the enemy'), w('ka'), w('frike'), w('dhe'), wf('ik', 'ikën', 'flees'), p('.')),
      L(wf('udhetar', 'udhëtari', 'the traveller'), w('thote'), p(':'), w('nje'), w('dite'), w('skender'), wf('vdes', 'vdes', 'dies'), wf('ne', 'në', 'in'), w('lezhe'), p('.'), w('kur'), w('skender'), wf('vdes', 'vdes', 'dies'), p(','), wf('vend', 'vendi', 'the country'), w('bie'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'skenderFund', reveal: 'dhi' },
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  // === THE BURRNESHA — the sworn virgin who sits in the men's oda =============
  burrnesha1: {
    id: 'burrnesha1',
    text: [
      L(wf('njeri', 'njeriu', 'the person'), w('vesh'), wf('rrobe', 'rroba', 'dress'), wf('si', 'si', 'as'), w('burre'), p('.')),
      L(wf('njeri', 'njeriu', 'the person'), w('mban'), w('nje'), w('arme'), p('.')),
      L(wf('njeri', 'njeriu', 'the person'), w('thote'), p(':'), w('une'), w('jam'), w('grua'), p('.')),
      L(w('baba'), w('im'), wf('vdes', 'vdes', 'dies'), w('pa'), w('djale'), p('.')),
      L(w('une'), wf('premto', 'premtoj', 'swear'), w('nje'), w('bese'), p('.')),
      L(wf('pleq', 'pleqtë', 'the elders'), wf('degjo', 'dëgjojnë', 'hear'), wf('bese', 'besën', 'the oath'), p('.')),
      L(wf('bese', 'besa', 'the oath'), wf('im', 'ime', 'my'), w('nuk'), wf('kthehu', 'kthehet', 'turns back'), p('.')),
      L(w('tani'), w('une'), wf('jeto', 'jetoj', 'live'), wf('si', 'si', 'as'), w('burre'), p('.')),
      L(w('une'), wf('mban', 'mbaj', 'keep'), wf('shtepi', 'shtëpinë', 'the house'), w('dhe'), wf('emer', 'emrin', 'the name'), p('.')),
      L(w('une'), w('jam'), w('nje'), w('burrneshe'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('burrneshe', 'burrneshën', 'the sworn virgin')), to: 'burrneshaFund', reveal: 'burrneshe' },
      { text: L(w('kthehu')), to: 'oda1' },
    ],
  },

  burrneshaFund: {
    id: 'burrneshaFund',
    end: 'secret',
    title: 'The Burrneshë — an Oath Instead of a Life',
    blurb:
      'The one who sat armed among the men of the oda was a burrneshë — a sworn virgin. Under the Kanun a woman could swear a lifelong oath of celibacy before the village elders and from that day live socially as a man: head of the household, a rifle on her shoulder, a man’s name, a man’s dress, a man’s seat in the oda. The vow was sworn most often when a house was left without a male heir. It was irreversible, and it was never about desire: it was the one legitimate door out of a woman’s fixed lot, and the old people held a burrneshë in full honour. You drank her coffee and heard her out; her house has a head, and her father’s name lives.',
    text: [
      L(wf('burrneshe', 'burrnesha', 'the sworn virgin'), w('rri'), w('me'), wf('pleq', 'pleqtë', 'the elders'), p('.')),
      L(wf('bese', 'besa', 'the oath'), w('mban'), wf('shtepi', 'shtëpinë', 'the house'), p('.')),
    ],
    options: [],
  },

  skenderFund: {
    id: 'skenderFund',
    end: 'secret',
    title: 'The Goat-Candles of Krujë',
    blurb:
      'Gjergj Kastrioti — Skënderbeu — held the Ottoman empire off this land for a lifetime of war, and around him the folk hung their best-loved legends. The traveller sang the favourite: the castle of Krujë besieged and its defenders few, and the hero tying lit candles to the horns of a herd of goats and driving them up the ramparts by night, so that the enemy counted a thousand watch-fires and broke camp afraid. He died at Lezhë; and when he died, the old people say, Albania fell. (The candle-goats and the helmet are a people’s love for its hero, not the ledger of history — and that too is a kind of truth.)',
    text: [
      L(wf('kala', 'kalaja', 'the castle'), w('rri'), p('.')),
      L(w('njeqind'), w('dhi'), p(','), w('njeqind'), wf('trim', 'trima', 'heroes'), p('.')),
      L(wf('emer', 'emri', 'the name'), w('i_link'), wf('skender', 'Skënderbeut', 'Skanderbeg'), wf('jeto', 'jeton', 'lives'), p('.')),
    ],
    options: [],
  },

  // the grandmother → the dragua/caul (she watches you; foreshadows fshatiCaul)
  tregDragua: {
    id: 'tregDragua',
    text: [
      L(w('nje'), w('plake'), w('te_obj'), w('sheh'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('thote'), p(':'), w('nje'), w('dragua'), wf('lind', 'lind', 'is born'), w('me'), w('kemishe'), p('.')),
      L(w('ajo'), w('te_obj'), w('sheh'), wf('ti', 'ty', 'you'), p('.')),
      L(w('ajo'), w('thote'), p(':'), w('une'), w('di'), w('dicka'), p('.')),
      L(w('por'), w('ti'), w('nuk'), w('di'), w('asgje'), p('.')),
      L(w('ti'), w('nuk'), w('mund'), w('ta'), wf('di', 'dish', 'know'), p('.')),
      L(w('keshtu'), w('thote'), wf('plake', 'plaka', 'the old woman'), p('.')),
      L(w('ja'), p('!'), w('ajo'), w('jep'), wf('ky', 'këtë', 'this'), w('bekim'), p('.')),
      L(w('nje'), w('dragua'), wf('vrit', 'vret', 'kills'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
    ],
    options: [
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
  },

  oda2: {
    id: 'oda2',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('ka'), w('lot'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(wf('njeri', 'njerëz', 'people'), wf('vdes', 'vdesin', 'die'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(wf('ky', 'kjo', 'this'), w('jete'), w('eshte'), w('e_art'), wf('keq', 'keqe', 'bad'), p('.')),
      L(w('sepse'), w('nuk'), w('ka'), w('uje'), p(','), w('gjithe'), wf('fshat', 'fshati', 'the village'), w('im'), wf('vdes', 'vdes', 'dies'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), wf('jam', 'ishte', 'was'), w('i_art'), w('gjelber'), p('.')),
      L(w('tani'), wf('ka', 'kemi', 'have'), w('pak'), w('uje'), p('.')),
      L(w('kur'), w('vjen'), wf('shi', 'shiu', 'the rain'), p('?')),
      L(wf('duket', 'duket', 'seems'), w('se'), wf('perendi', 'Perëndia', 'God'), w('nuk'), wf('degjo', 'dëgjon', 'hears'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'fshatiBesa', reveal: 'lot' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  // === EPIC: The Marriage of Halili (Kângë Kreshnikësh) ===
  // Mujo, taunted that his young brother Halil is still unwed, sends him to carry off
  // Tanusha, daughter of the Krajl of Kotor. Halil disguises among her 300 maidens, is
  // seized, and Mujo and the agas of Jutbina storm in to free him — a rare song that ends
  // in a wedding, not a grave.
  mujo1: {
    id: 'mujo1',
    text: [
      L(w('ketu'), wf('rri', 'rrinë', 'stay'), w('dy'), wf('trim', 'trima', 'heroes'), p('.')),
      L(w('nje'), w('eshte'), w('mujo'), p('.')),
      L(w('nje'), w('eshte'), w('halil'), p('.')),
      L(w('halil'), w('do'), w('nje'), w('nuse'), p('.')),
      L(w('omer'), w('eshte'), wf('bir', 'biri', 'the son'), w('e_link'), w('mujo'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), w('halil')), to: 'mujo2', reveal: 'halil' },
      { text: L(w('degjo'), w('omer')), to: 'omer1', reveal: 'omer' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujo2: {
    id: 'mujo2',
    text: [
      L(w('halil'), w('thote'), p(':')),
      L(w('tanusha'), wf('rri', 'rri', 'stays'), w('larg'), p('.')),
      L(w('tanusha'), w('eshte'), wf('bije', 'bija', 'the daughter'), w('e_link'), wf('mbret', 'mbretit', 'the king'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), wf('hene', 'hëna', 'the moon'), w('dhe'), wf('zane', 'zana', 'the Zana'), wf('ruan', 'ruajnë', 'guard'), wf('rruge', 'rrugën', 'the road'), p('.')),
      L(w('une'), wf('e_obj', 'e', 'her'), wf('do', 'dua', 'want'), p('.')),
      L(w('une'), wf('fsheh', 'fshihem', 'hide'), w('me'), wf('vajze', 'vajzat', 'the maidens'), p('.')),
    ],
    options: [
      { text: L(w('merr'), wf('tanusha', 'tanushën', 'Tanusha')), to: 'mujo3', reveal: 'tanusha' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujo3: {
    id: 'mujo3',
    text: [
      L(w('halil'), wf('fsheh', 'fshihet', 'hides'), w('me'), wf('vajze', 'vajzat', 'the maidens'), p('.')),
      L(w('tanusha'), w('ka'), w('nje'), w('unaze'), p('.')),
      L(wf('unaze', 'unaza', 'the ring'), w('ka'), wf('fytyre', 'fytyrën', 'the face'), w('e_link'), wf('halil', 'halilit', 'Halili'), p('.')),
      L(w('por'), wf('mbret', 'mbreti', 'the king'), w('merr'), wf('halil', 'halilin', 'Halili'), p('!')),
    ],
    options: [
      { text: L(w('vazhdon')), to: 'mujo4', reveal: 'unaze' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujo4: {
    id: 'mujo4',
    text: [
      L(wf('mbret', 'mbreti', 'the king'), wf('le', 'lë', 'leaves'), wf('halil', 'halilin', 'Halili'), wf('ne', 'në', 'in'), w('erresire'), p('.')),
      L(w('halil'), wf('kendo', 'këndon', 'sings'), w('me'), w('lahute'), p('.')),
      L(w('mujo'), wf('degjo', 'dëgjon', 'hears'), w('larg'), p('.')),
      L(wf('aga', 'agat', 'the agas'), wf('vjen', 'vijnë', 'come'), w('me'), w('mujo'), p('.')),
      L(w('mujo'), w('vjen'), p('!')),
    ],
    options: [
      { text: L(w('lufto'), w('me'), w('mujo')), to: 'mujoFund', reveal: 'mujo' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujoFund: {
    id: 'mujoFund',
    end: 'secret',
    title: 'The Marriage of Halili',
    blurb:
      'From the songs of the frontier warriors: Mujo, taunted that his young brother Halil was still unwed, sent him to carry off Tanusha, daughter of the Krajl of Kotor — guarded on the road by the Sun, the Moon and the Zana. Halil reached the Danube and slipped in among her three hundred maidens; Tanusha knew him by a ring that bore his likeness, but the affair was found out and the king cast Halil into the dungeon. From his cell Halil sang on the lahut\u00eb, and the song carried to Jutbina and summoned Mujo and the thirty agas, who stormed the king\u2019s hall \u2014 Halil cut down the king himself \u2014 and carried home both Halil and his bride. One of the rare frontier songs that ends not in a grave but a wedding.',
    text: [
      L(w('mujo'), wf('lufto', 'lufton', 'fights'), wf('mbret', 'mbretin', 'the king'), p('.')),
      L(w('halil'), wf('vrit', 'vret', 'kills'), wf('mbret', 'mbretin', 'the king'), p('.')),
      L(w('halil'), w('merr'), wf('tanusha', 'tanushën', 'Tanusha'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('trim'), p('.')),
    ],
    options: [],
  },

  // === FABLE: why the wolf devours (von Hahn 105 — the curse "Të hângtë ujku!") ===
  ujkuLind1: {
    id: 'ujkuLind1',
    text: [
      L(wf('djall', 'djalli', 'the devil'), wf('bej', 'bën', 'makes'), w('nje'), w('ujk'), w('nga'), w('balte'), p('.')),
      L(w('por'), wf('ujk', 'ujku', 'the wolf'), w('nuk'), wf('jeto', 'jeton', 'lives'), p('.')),
      L(wf('djall', 'djalli', 'the devil'), w('thote'), p(':'), w('perendi'), p(','), w('jep'), wf('jete', 'jetë', 'life'), p('!')),
      L(w('perendi'), w('thote'), p(':'), w('ha'), wf('djall', 'djallin', 'the devil'), p('!')),
    ],
    options: [
      { text: L(w('degjo')), to: 'ujkuFund' },
    ],
  },

  ujkuFund: {
    id: 'ujkuFund',
    end: 'secret',
    title: 'Why the Wolf Devours',
    blurb:
      'Across the Balkans the old people tell it: the Devil moulded a wolf out of dough but could not give it life, and begged God to. God breathed it alive with the words "devour your creator" — and the wolf turned at once and ate the Devil. That is why the wolf devours, and why the worst curse a mouth can carry is still "Të hângtë ujku!" — may the wolf eat you.',
    text: [
      L(wf('ujk', 'ujku', 'the wolf'), w('ha'), wf('djall', 'djallin', 'the devil'), p('.')),
      // the curse the fable explains, word for word: "Të hângtë ujku!" (Gheg)
      Q('mallkimi i moçëm (von Hahn, përralla 105)',
        wf('thote', 'thonë', 'they say'), p(':'), w('te_obj'), wf('ha', 'hëngtë', 'may eat'), wf('ujk', 'ujku', 'the wolf'), p('!')),
    ],
    options: [],
  },

  // === DEITY: i Verbti, the blind fire-and-wind god (Tirta; Lambertz). Punishes foul
  // speech and uncleanliness; held more powerful than the Christian God; to invoke him
  // wrongly is to be blinded with fire. ===
  verbti1: {
    id: 'verbti1',
    text: [
      L(w('nje'), w('zjarr'), w('vjen'), p('.')),
      L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('verbti'), p('.')),
      L(w('verbti'), w('nuk'), w('sheh'), p(','), w('por'), wf('degjo', 'dëgjon', 'hears'), w('gjithe'), p('.')),
      L(w('verbti'), w('nuk'), w('do'), w('nje'), w('fjale'), w('te_link'), wf('keq', 'keqe', 'bad'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('poshte'), wf('fshat', 'fshati', 'the village'), w('eshte'), w('i_art'), w('thate'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('mire')), to: 'verbtiFund', reveal: 'verbti' },
      { text: L(w('fol'), w('keq')), to: 'verbtiVdes', reveal: 'verbti' },
      { text: L(w('ik'), w('shpejt')), to: 'maliStuhi' },
    ],
  },

  verbtiFund: {
    id: 'verbtiFund',
    end: 'secret',
    title: 'The Blind Fire-God',
    blurb:
      'High in the storm rides i Verbti, the Blind One — the fire-and-wind god the old people held more powerful even than the Christian God, who punishes a foul mouth and an unclean hand. You kept a clean tongue before his flame, and he blessed you: he fanned the fire on the dead hearths and turned the storm\u2019s water back onto the thirsting fields.',
    text: [
      L(w('verbti'), w('te_obj'), w('jep'), w('zjarr'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('perseri'), p('.')),
    ],
    options: [],
  },

  verbtiVdes: {
    id: 'verbtiVdes',
    end: 'bad',
    title: 'Blinded by Fire',
    blurb:
      'i Verbti punishes foul speech above all, and the old fear was plain: to invoke the Blind One wrongly is to be blinded with fire. You cursed before his flame, and the flame answered — it took your eyes, and you wander the mountain sightless as the god himself.',
    text: [
      L(w('verbti'), w('te_obj'), w('verbo'), p('.')),
      L(w('ti'), w('nuk'), w('sheh'), p('.')),
    ],
    options: [],
  },

  // === EPIC: Ajkuna's Lament — the death of Omer (the cycle's emotional summit) ===
  omer1: {
    id: 'omer1',
    text: [
      L(w('omer'), w('eshte'), w('nje'), w('bir'), w('te_link'), w('mujo'), p('.')),
      L(w('omer'), w('eshte'), w('nje'), w('femije'), p('.')),
      L(w('omer'), wf('lufto', 'lufton', 'fights'), w('dhe'), w('ka'), w('shume'), w('plage'), p('.')),
      L(w('omer'), w('vdes'), p('.')),
      L(w('mujo'), wf('e_obj', 'e', 'him'), w('mban'), p('.')),
    ],
    options: [
      { text: L(w('vazhdon')), to: 'omer2', reveal: 'omer' },
      { text: L(w('kthehu')), to: 'mujo1' },
    ],
  },

  omer2: {
    id: 'omer2',
    text: [
      L(w('mujo'), wf('bej', 'bën', 'makes'), w('nje'), w('varr'), wf('ne', 'në', 'in'), w('mal'), p('.')),
      L(w('nje'), w('gur'), w('mbi'), wf('varr', 'varrin', 'the grave'), p('.')),
      // the ballad's line at the grave, word for word: "Kanë lanë kangen zogjtë
      // e malit" — the mountain birds have left their song
      Q('Vajtimi i Ajkunës — këngë kreshnike',
        wf('ka', 'kanë', 'have'), wf('le', 'lënë', 'left'), wf('kenge', 'këngën', 'the song'), wf('zog', 'zogjtë', 'the birds'), w('e_link'), wf('mal', 'malit', 'the mountain'), p('.')),
      L(w('mujo'), w('fsheh'), wf('omer', 'omerin', 'Omer'), w('nga'), wf('nene', 'nënën', 'the mother'), p('.')),
      L(w('por'), wf('nene', 'nëna', 'the mother'), wf('degjo', 'dëgjon', 'hears'), p('.'), wf('hene', 'hëna', 'the moon'), w('di'), w('dhe'), w('nuk'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('vazhdon')), to: 'omerFund', reveal: 'varr' },
      { text: L(w('kthehu')), to: 'mujo1' },
    ],
  },

  omerFund: {
    id: 'omerFund',
    end: 'secret',
    title: 'Ajkuna\u2019s Lament',
    blurb:
      'Omer, Mujo\u2019s son, barely thirteen, was cornered in a churchyard and fought there to the death; Mujo buried him under a mountain fir, beneath a stone thirty men could not lift, and hid the death from the boy\u2019s mother. But Ajkuna — Omer’s mother, Mujo’s wife — learned of it, and her lament for Omer swelled into a cry for every mother who loses a son to war, and the mountains keened it back to her, until her own heart broke at the graveside and she lay down beside her son.',
    text: [
      L(wf('nene', 'nëna', 'the mother'), w('ka'), w('lot'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('shko'), wf('ne', 'në', 'to'), w('varr'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('mallko'), wf('hene', 'hënën', 'the moon'), p('.')),
      // the curse itself, word for word from the ballad: "T'u shkimtë drita ty,
      // o mori hanë" (Gheg; trimmed of the vocative filler, hanë → hënë)
      Q('Vajtimi i Ajkunës — këngë kreshnike',
        wf('nene', 'nëna', 'the mother'), w('thote'), p(':'),
        wf('shkimet', "t'u shkimtë", 'may it go out'), wf('drite', 'drita', 'the light'), p(','), w('o'), w('hene'), p('!')),
      L(wf('yll', 'yjet', 'the stars'), w('rri'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), wf('vajto', 'vajton', 'mourns'), wf('omer', 'omerin', 'Omer'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), wf('vajto', 'vajton', 'mourns'), wf('bir', 'bijtë', 'the sons'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('fle'), w('afer'), wf('varr', 'varrit', 'the grave'), p('.')),
    ],
    options: [],
  },

  // === MONSTER: the Lubia, the southern hydra she-demon (heads regrow when cut) ===
  lubia1: {
    id: 'lubia1',
    text: [
      L(w('ketu'), w('rri'), w('lubia'), p('.')),
      L(w('lubia'), w('ka'), w('shume'), w('koke'), p('.')),
      L(w('lubia'), w('mban'), w('uje'), p('.')),
      L(w('lubia'), w('do'), w('nje'), w('vajze'), p('.')),
      L(wf('zjarr', 'zjarri', 'fire'), wf('vrit', 'vret', 'kills'), wf('lubia', 'lubinë', 'the she-hydra'), p('.')),
    ],
    options: [
      { text: L(w('lufto'), wf('lubia', 'lubinë', 'the she-hydra')), to: 'lubiaKoke', reveal: 'lubia' },
      { text: L(w('hidh'), w('zjarr')), to: 'lubiaFund', reveal: 'koke' },
      { text: L(w('ik'), w('shpejt')), to: 'udhaThate' },
    ],
  },

  lubiaKoke: {
    id: 'lubiaKoke',
    text: [
      L(w('ti'), w('pre'), w('nje'), w('koke'), p('.')),
      L(w('por'), w('dy'), w('koke'), wf('vjen', 'vijnë', 'come'), p('.')),
      L(wf('zjarr', 'zjarri', 'fire'), wf('vrit', 'vret', 'kills'), wf('lubia', 'lubinë', 'the she-hydra'), p('.')),
    ],
    options: [
      { text: L(w('hidh'), w('zjarr')), to: 'lubiaFund', reveal: 'koke' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  lubiaFund: {
    id: 'lubiaFund',
    end: 'secret',
    title: 'The Lubia Burned',
    blurb:
      'The Lubia is the southern sister of the Kulshedra — a she-demon of seven, of seventy, of a hundred heads, who dries the springs and devours little girls until a maiden is given to her. The old people told that her heads grow back the instant they are cut, just as the Greeks across the water told of their Lernaean Hydra; and so, as Herakles did to that beast, you seared each neck with fire as you struck, until no head could grow again and the southern springs ran free.',
    text: [
      L(w('ti'), w('hidh'), w('zjarr'), p('.')),
      L(w('lubia'), w('vdes'), p('.')),
      L(w('uje'), w('vjen'), w('perseri'), p('.')),
    ],
    options: [],
  },

  // === DEITY: Prende, Zoja e Bukurisë — Lady of love, beauty and the spring (Friday;
  // her belt is the rainbow). Often named as a face of E Bukura e Dheut herself. ===
  prende1: {
    id: 'prende1',
    text: [
      L(w('ketu'), w('rri'), w('prende'), p('.')),
      L(w('prende'), w('eshte'), w('e_art'), w('bukur'), p('.')),
      L(w('prende'), w('eshte'), wf('yll', 'ylli', 'the star'), w('i_link'), w('mengjes'), p('.'), wf('yll', 'ylli', 'the star'), w('vjen'), w('perpara'), wf('diell', 'diellit', 'the sun'), p('.')),
      L(w('nje'), w('dallendyshe'), wf('fluturo', 'fluturon', 'flies'), w('me'), w('prende'), p('.')),
      L(w('nje'), w('ylber'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), w('prende')), to: 'prendeFund', reveal: 'prende' },
      { text: L(w('kthehu')), to: 'uji' },
    ],
  },

  prendeFund: {
    id: 'prendeFund',
    end: 'secret',
    title: 'The Lady of Beauty',
    blurb:
      'Prende — Zoja e Bukurisë, the Lady of Beauty, goddess of love and of the green that returns. She is the morning star that rides up ahead of the sun, and the swallows, the Lady’s Birds, draw her chariot up the dawn sky. You did her honour, and where she sets her foot the earth flowers and the springs remember how to run; she blessed your road and the freeing of the Beauty both.',
    text: [
      L(w('prende'), w('te_obj'), w('jep'), w('nje'), w('bekim'), p('.')),
      L(w('uje'), w('vjen'), w('perseri'), p('.')),
    ],
    options: [],
  },

  // === RIDDLE-GATE: the bridge elder's gjëegjëzë (the doc's tortoise riddle). Reading the
  // clue word 'samar' unlocks the right answer; wrong guesses send you off the path. ===
  riddle1: {
    id: 'riddle1',
    text: [
      L(w('nje'), w('plak'), w('thote'), w('nje'), w('gjegjeza'), p(':')),
      L(w('ka'), w('samar'), w('por'), w('nuk'), w('eshte'), w('gomar'), p('.')),
    ],
    options: [
      { text: L(w('breshka')), to: 'riddleFund', reveal: 'samar' },
      { text: L(w('gomar')), to: 'humbur' },
      { text: L(w('gjarper')), to: 'humbur' },
    ],
  },

  riddleFund: {
    id: 'riddleFund',
    end: 'secret',
    title: 'The Tortoise\u2019s Answer',
    blurb:
      'The old man\u2019s riddle — "it has a packsaddle, but it is no donkey" — is the tortoise (breshka), who carries her own house-saddle on her back wherever she goes. You read the clue and answered, and the elder, well pleased, blessed your road across the bridge. In the mountains a quick wit is prized as highly as a strong arm.',
    text: [
      L(w('breshka'), w('ka'), w('samar'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('eshte'), w('nje'), w('mik'), p('.')),
      // the elder's parting proverb on wit and words: the tongue has no bones,
      // yet bones it breaks
      Q('fjalë e urtë',
        wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('gjuhe', 'gjuha', 'the tongue'), w('eshtra'), wf('ka', "s'ka", 'has not'), p(','), w('eshtra'), w('thyen'), p('.')),
    ],
    options: [],
  },

  // === FABLE: the origin of the cuckoo (von Hahn 104) ===
  cuckoo1: {
    id: 'cuckoo1',
    text: [
      L(wf('zog', 'zogu', 'the bird'), w('eshte'), w('gjon'), p('.')),
      L(w('nje'), w('motra'), wf('qep', 'qep', 'sews'), p('.')),
      L(wf('gershere', 'gërshëra', 'the scissors'), wf('vrit', 'vrasin', 'kill'), w('gjon'), p('.')),
      L(w('motra'), w('kerko'), w('gjon'), p('.')),
      L(w('motra'), wf('vajto', 'vajton', 'weeps'), p(':'), w('ku'), p('?'), w('ku'), p('?')),
    ],
    options: [
      { text: L(w('degjo'), wf('zog', 'zogun', 'the bird')), to: 'cuckooFund', reveal: 'gjon' },
      { text: L(w('kthehu')), to: 'gjizar2' },
    ],
  },

  cuckooFund: {
    id: 'cuckooFund',
    end: 'secret',
    title: 'Gjon and the Cuckoo',
    blurb:
      'A sister at her sewing struck her brother Gjon dead with her scissors, by a terrible accident; and in her grief she became the cuckoo, who cries "Ku? Ku?" — "Where? Where?" — searching for him down all the years, while he became the little Gjon-bird who answers only "Gjon! Gjon!", his own name — she calling by day and he by night, so the two of them call across the woods and never once meet.',
    text: [
      L(w('motra'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('zog'), p('.')),
      L(w('motra'), w('thote'), p(':'), w('ku'), p('?'), w('ku'), p('?')),
      L(w('gjon'), w('eshte'), w('nje'), w('zog'), p('.')),
      L(w('gjon'), w('thote'), p(':'), w('gjon'), p('!'), w('gjon'), p('!')),
    ],
    options: [],
  },

  // === FABLE: the Bear and the Dervish — the weak trickster beats the strong (Elsie 12) ===
  arushe1: {
    id: 'arushe1',
    text: [
      L(w('nje'), w('dervish'), w('dhe'), w('nje'), w('arushe'), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
      L(w('arushe'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(w('arushe'), w('thote'), p(':'), w('ti'), w('je'), w('i_art'), w('forte'), p('?')),
    ],
    options: [
      { text: L(w('ndihmo'), wf('dervish', 'dervishin', 'the dervish')), to: 'arushe2', reveal: 'arushe' },
      { text: L(w('lufto'), wf('arushe', 'arushën', 'the bear')), to: 'humbur', reveal: 'arushe' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylli1' },
    ],
  },

  // === BEAR & DERVISH flagship: the Brave-Tailor bluff-gauntlet ==========
  arushePeme: {
    id: 'arushePeme',
    text: [
      L(w('arushe'), wf('ngre', 'ngre', 'lifts'), w('nje'), w('peme'), p('.')),
      L(w('dervish'), w('thote'), p(':'), w('une'), wf('ngre', 'ngre', 'lift'), w('nje'), w('pyll'), p('!')),
    ],
    options: [
      // the trick plays out that night ("natën arusha do gjak")
      { text: L(w('mashtro'), wf('arushe', 'arushën', 'the bear')), to: 'arusheNate', time: 'night', reveal: 'peme' },
      { text: L(wf('ngre', 'ngre', 'lift'), w('nje'), w('peme')), to: 'humbur' },
    ],
  },

  arusheNate: {
    id: 'arusheNate',
    text: [
      L(w('naten'), w('arushe'), w('do'), w('gjak'), p('.')),
      L(w('arushe'), w('godit'), w('ketu'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('kazan'), w('i_art'), w('madh'), w('me'), w('qumesht'), p('.')),
    ],
    options: [
      { text: L(w('fsheh')), to: 'arusheFund', reveal: 'gjak' },
      { text: L(w('fle'), w('ketu')), to: 'humbur' },
    ],
  },

  arusheFund: {
    id: 'arusheFund',
    end: 'secret',
    title: 'The Bear and the Dervish',
    blurb:
      'The little dervish could never beat the bear by strength, so he beat it by wit: he crushed a white cheese in his fist and swore it was a stone he had squeezed the water from; he shrugged off the bear\u2019s mightiest cuffs as mere fleabites; and at the last he coaxed the great beast into a cauldron and boiled it in milk. In the mountains the cunning man outlives the strong one.',
    text: [
      L(w('dervish'), w('thote'), p(':'), w('nje'), w('plesht'), p('!')),
      L(w('dervish'), w('mashtro'), wf('arushe', 'arushën', 'the bear'), p('.')),
      L(w('dervish'), w('thote'), p(':'), w('qumesht'), wf('bej', 'bën', 'makes'), w('i_art'), w('forte'), p('.')),
      L(wf('koke', 'koka', 'the head'), w('e_link'), wf('arushe', 'arushës', 'the bear'), wf('hyr', 'hyn', 'goes'), wf('ne', 'në', 'in'), w('qumesht'), p('.')),
      L(w('dervish'), w('godit'), wf('arushe', 'arushën', 'the bear'), p('.')),
      L(w('arushe'), wf('ne', 'në', 'in'), w('kazan'), p('.')),
      L(w('arushe'), w('vdes'), p('.')),
    ],
    options: [],
  },

  // === BEING: the dhampir, the only one who can see and unmake the invisible undead ===
  dhampir1: {
    id: 'dhampir1',
    text: [
      L(w('nje'), w('dhampir'), w('vjen'), p('.')),
      L(w('dhampir'), w('eshte'), w('bir'), w('i_link'), w('nje'), w('lugat'), w('dhe'), w('i_link'), w('nje'), w('grua'), p('.')),
      L(w('vetem'), w('dhampir'), w('sheh'), wf('lugat', 'lugatin', 'the revenant'), p('.')),
      when('pishtar', L(wf('pishtar', 'pishtari', 'the torch'), wf('yt', 'jot', 'your'), w('jep'), w('drite'), p('.'), w('dhampir'), w('sheh'), w('mire'), p('.'))),
      L(w('dhampir'), wf('lufto', 'lufton', 'fights'), wf('lugat', 'lugatin', 'the revenant'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), wf('dhampir', 'dhampirin', 'the half-vampire')), to: 'dhampirFund', reveal: 'dhampir' },
      { text: L(w('ik'), w('shpejt')), to: 'humbur' },
    ],
  },

  dhampirFund: {
    id: 'dhampirFund',
    end: 'secret',
    title: 'The Dhampir',
    blurb:
      'The lugat walks invisible, and only the dhampir can see it — the half-living son a revenant fathered on a widow, "the dhampir knows the lugat." (Where no dhampir is at hand, the lugat’s grave is found by leading a virgin boy on a white stallion through the churchyard: the horse balks at the unquiet grave.) He knew the undead thing by sight, wrestled it down in the dark, and unmade it; and the night road was clean again.',
    text: [
      L(w('dhampir'), wf('lufto', 'lufton', 'fights'), wf('lugat', 'lugatin', 'the revenant'), p('.')),
      L(wf('lugat', 'lugati', 'the revenant'), w('vdes'), p('.')),
    ],
    options: [],
  },

  // === FABLE: the bee, the cicada and the spider (a dying mother's three daughters) ===
  bleta1: {
    id: 'bleta1',
    text: [
      L(w('nje'), w('nene'), w('vdes'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('ka'), w('tre'), wf('vajze', 'vajza', 'daughters'), p('.')),
      L(w('nje'), w('vajze'), wf('bej', 'bën', 'makes'), w('nje'), w('qilim'), p('.')),
      L(w('nje'), w('vajze'), w('kendo'), p('.')),
      L(w('nje'), w('vajze'), wf('ndihmo', 'ndihmon', 'helps'), wf('nene', 'nënën', 'the mother'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('thote'), p(':'), w('ti'), w('qe'), wf('ndihmo', 'ndihmon', 'help'), p(','), w('ti'), w('jep'), w('drite'), w('per'), wf('vdes', 'të vdekurit', 'dead'), w('dhe'), w('buke'), w('per'), wf('njeri', 'njerëzit', 'the living'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('thote'), p(':'), w('ti'), wf('behet', 'bëhesh', 'become'), w('merimanga'), p(','), w('dhe'), w('ti'), wf('behet', 'bëhesh', 'become'), w('gjinkalla'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), wf('nene', 'nënën', 'the mother')), to: 'bletaFund', reveal: 'nene' },
      { text: L(wf('bej', 'bëj', 'make'), w('nje'), w('qilim')), to: 'merimangaFund', reveal: 'qilim' },
      { text: L(w('kthehu')), to: 'gjizar1' },
    ],
  },

  bletaFund: {
    id: 'bletaFund',
    end: 'secret',
    title: 'The Bee',
    blurb:
      'A dying mother left three daughters, and the dutiful one she blessed: "you shall be the light of the ancestors and the food of the living." So the bee was made — the one creature whose work feeds both worlds, honey for the table of the living and wax for the candles of the dead — and that is why, to this day, you must never blaspheme in a house that keeps a hive, and why the old people name the bee the way they name bread: in the voice they keep for holy things.',
    text: [
      L(wf('vajze', 'vajza', 'the daughter'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('bleta'), p('.')),
      L(w('bleta'), w('jep'), w('drite'), p('.')),
      // the riddle the children still ask about her (docs §12): buzz-buzz, works
      // day and night, gives us wax and gives us honey
      Q('gjëegjëzë e moçme',
        p('zu-zu-zu,'), w('punon'), w('dite'), w('e_conj'), wf('naten', 'natë', 'night'), p(','), w('na'), w('jep'), w('dylle'), w('e_conj'), w('na'), w('jep'), w('mjalte'), p('.')),
    ],
    options: [],
  },

  merimangaFund: {
    id: 'merimangaFund',
    end: 'secret',
    title: 'The Spider',
    blurb:
      'The sister who would not leave her loom, and the idle one, earned the mother\u2019s other word: one became the spider, condemned to spin a web she can never finish, the other the cicada, to sing her one summer and die parched on a stem. Only the dutiful sister was blessed as the bee. Idleness earns a thankless thread.',
    text: [
      L(wf('vajze', 'vajza', 'the daughter'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('merimanga'), p('.')),
      L(w('merimanga'), w('kurre'), w('mbaroi'), p('.')),
      L(w('nje'), w('vajze'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('gjinkalla'), p('.')),
      L(w('gjinkalla'), w('kendo'), w('dhe'), w('vdes'), p('.')),
    ],
    options: [],
  },

  // === FABLE: the swallow (dallëndyshja), the friend of man ===
  dallendyshe1: {
    id: 'dallendyshe1',
    text: [
      L(w('nje'), w('gjarper'), w('do'), wf('gjak', 'gjakun', 'the blood'), w('e_link'), wf('njeri', 'njeriut', 'the person'), p('.')),
      L(w('nje'), w('mushkonje'), wf('ndihmo', 'ndihmon', 'helps'), wf('gjarper', 'gjarprin', 'the serpent'), p('.')),
      L(w('por'), w('nje'), w('dallendyshe'), w('pre'), wf('gjuhe', 'gjuhën', 'the tongue'), w('e_link'), wf('mushkonje', 'mushkonjës', 'the mosquito'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('eshte'), w('i_art'), w('keq'), w('me'), wf('dallendyshe', 'dallëndyshen', 'the swallow'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), wf('dallendyshe', 'dallëndyshen', 'the swallow')), to: 'dallendysheFund', reveal: 'dallendyshe' },
      { text: L(w('kthehu')), to: 'gjizar2' },
    ],
  },

  dallendysheFund: {
    id: 'dallendysheFund',
    end: 'secret',
    title: 'The Swallow',
    blurb:
      'A serpent meant to learn whose blood was sweetest, so it could feed on the best of them — and the answer was man\u2019s. But the swallow bit out the prying mosquito\u2019s tongue before it could tell, so the serpent never learned the answer and mankind was spared. In its fury the cheated serpent struck at the swallow as she fled and tore her tail into the fork she has worn ever since. And ever after the swallow nests at the head of the house, the friend of man, and it is a sin to do her harm.',
    text: [
      L(w('gjarper'), w('pre'), wf('bisht', 'bishtin', 'the tail'), w('e_link'), wf('dallendyshe', 'dallëndyshes', 'the swallow'), p('.')),
      L(wf('njeri', 'njeriu', 'the person'), w('eshte'), w('i_art'), w('sigurt'), p('.')),
      L(w('dallendyshe'), w('rri'), w('ne'), w('shtepi'), p('.')),
    ],
    options: [],
  },

  // === BEING: the kukudh — a lugat hardened, killed only with a noose of vine ===
  kukudh1: {
    id: 'kukudh1',
    text: [
      L(w('nje'), w('kukudh'), w('vjen'), p('.')),
      L(w('kukudh'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(w('nje'), w('lugat'), w('i_art'), w('vjeter'), wf('behet', 'bëhet', 'becomes'), w('kukudh'), p('.')),
      L(wf('arme', 'arma', 'the weapon'), w('nuk'), wf('vrit', 'vret', 'kills'), wf('kukudh', 'kukudhin', 'the miser-ghost'), p('.')),
      L(w('disa'), wf('thote', 'thonë', 'say'), p(':'), wf('kukudh', 'kukudhi', 'the miser-ghost'), w('eshte'), w('nje'), w('dreq'), p('.')),
      L(w('hardhi'), wf('vrit', 'vret', 'kills'), wf('kukudh', 'kukudhin', 'the miser-ghost'), p(','), wf('dreq', 'dreqin', 'the devil'), p('.')),
    ],
    options: [
      { text: L(w('hidh'), w('hardhi')), to: 'kukudhFund', reveal: 'hardhi' },
      { text: L(w('lufto'), wf('kukudh', 'kukudhin', 'the miser-ghost')), to: 'humbur', reveal: 'kukudh' },
      { text: L(w('ik'), w('shpejt')), to: 'udheNate', time: 'night' },
    ],
  },

  kukudhFund: {
    id: 'kukudhFund',
    end: 'secret',
    title: 'The Kukudh Strangled',
    blurb:
      'When a lugat is left too long unburned it hardens — around Mount Tomorr above all — into a kukudh: squat and goat-tailed and proof against any blade. Steel is wasted on it; the old people knew it could be killed only one way, strangled with a noose of green vine. You looped the vine about its neck and choked the revenant still.',
    text: [
      L(w('ti'), w('hidh'), w('hardhi'), p('.')),
      L(w('kukudh'), w('vdes'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // THE CROSSROADS — the hub. From here the realms open as PEERS, none of them
  // the "main" road: the dry lowland village (Earth, the Kulshedra spine), the
  // holy mountain (Sky, Zojz), and — as they are built — the sea (Deti) and the
  // highland towers (the kreshnikë). The drought is now one path among equals.
  // =========================================================================
  udhekryq: {
    id: 'udhekryq',
    text: [
      L(w('ti'), w('je'), w('ne'), w('nje'), w('udhekryq'), p('.')),
      // the crossroads knows which road brought you in — and finding it again
      // after being lost is a small homecoming
      from('mali1', L(w('ti'), w('zbrit'), w('nga'), wf('mal', 'mali', 'the mountain'), p('.'))),
      from('fshatiSheshi', L(w('ti'), w('vjen'), w('nga'), wf('fshat', 'fshati', 'the village'), p('.'))),
      from(['maliHumbur', 'lumiHumbur', 'botaHumbur'], L(w('ti'), w('gjen'), wf('rruge', 'rrugën', 'the road'), w('perseri'), p('.'))),
      // the open sky over the crossroads tells the hour
      when('dawn', L(w('eshte'), w('agim'), p(','), wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      when('day', L(wf('diell', 'dielli', 'the sun'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      when('dusk', L(w('eshte'), w('muzg'), p(','), wf('diell', 'dielli', 'the sun'), wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), p('.'))),
      when('night', L(w('eshte'), w('naten'), p(','), wf('hene', 'hëna', 'the moon'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      // the map is authoritative: the village square is a short walk from here,
      // while the great forest and the river lie a real journey away
      L(w('ketu'), w('eshte'), w('nje'), w('fshat'), p('.')),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('nje'), w('mal'), w('te_link'), w('shenjte'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('pyll'), w('dhe'), w('nje'), w('lume'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), wf('lume', 'lumi', 'the river'), wf('shko', 'shkon', 'goes'), w('poshte'), p(','), w('aty'), w('larg'), p(','), wf('tek', 'te', 'to'), wf('det', 'deti', 'the sea'), p('.')),
      // the crossroads' own proverb — mountains never meet, but people do
      Q('fjalë e urtë',
        wf('thote', 'thonë', 'they say'), p(':'), wf('mal', 'mali', 'the mountain'), w('me'), w('mal'), w('nuk'), w('piqet'), p(','), wf('njeri', 'njeriu', 'the person'), w('me'), wf('njeri', 'njeriun', 'the person'), w('piqet'), p('.')),
      L(w('ti'), wf('mendoj', 'mendon', 'think'), p(':'), w('ku'), w('te_subj'), wf('shko', 'shkosh', 'go'), p('?')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'to'), w('fshat')), to: 'fshatiSheshi' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1', reveal: 'shenjte' },
      // the forest road arrives at the wood's EDGE (pylli1, where the village
      // gate road also lands) — never straight into the deep forest hub
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylli1', reveal: 'pyll' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('lume')), to: 'lumi', reveal: 'lume' },
      // the gate road — makes the outskirts circuit walkable in BOTH directions
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road')), to: 'fshatiDil' },
    ],
  },

  // =========================================================================
  // THE SKY — Zojz, the sky-father (the Albanian *Dyeus, sibling of Zeus), and
  // i Bukuri i Qiellit, the Beauty of the Sky (the Sun, Dielli, the all-seeing
  // eye). The third realm, peer to Earth and Sea. Its moral is not the besa but
  // HUMILITY: the thunderbolt finds the proud — "the tall tree, the tall tower" —
  // while the white bull of the Tomorr pilgrimage and the forgiven feud are honored.
  // =========================================================================
  // qiell1 — the trailhead of Tomorr. A FORK between the two pilgrim roads up:
  // the gentle OFFERING road (lead the shepherd's white bull to the summit) and
  // the hard STORM road (climb through the winds, the sky-father's servants).
  qiell1: {
    id: 'qiell1',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('nje'), w('mal'), w('te_link'), w('shenjte'), p('.')),
      unless('night', L(wf('lart', 'lart', 'high'), wf('shqiponje', 'shqiponjat', 'eagles'), wf('fluturo', 'fluturojnë', 'fly'), p('.'))),
      when('night', L(w('naten'), wf('yll', 'yjet', 'the stars'), wf('je', 'janë', 'are'), wf('lart', 'lart', 'high'), p('.'))),
      L(wf('lart', 'lart', 'high'), w('vjen'), w('ere'), w('dhe'), w('bresher'), p('.')),
      L(w('bari'), w('thote'), p(':'), wf('njeri', 'njerëzit', 'the people'), wf('premto', 'premtojnë', 'swear'), p(':'), w('per'), w('qiell'), p('!')),
      when('shqiponja', L(wf('shqiponje', 'shqiponja', 'the eagle'), wf('yt', 'jote', 'your'), wf('fluturo', 'fluturon', 'flies'), w('me'), wf('shqiponje', 'shqiponjat', 'the eagles'), p('.'))),
      L(w('qiell'), w('dhe'), w('perendi'), wf('ka', 'kanë', 'have'), w('nje'), w('emer'), p(':'), w('perendi'), p('.')),
      L(w('nje'), w('bari'), wf('rri', 'rri', 'sits'), w('me'), w('nje'), w('dem'), w('te_link'), w('bardhe'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('bari', 'bariun', 'the shepherd')), to: 'qiellDem1', reveal: 'bari' },
      { text: L(w('ngjit'), w('lart')), to: 'qiellErera1', reveal: 'ere' },
      // the long climb back down to Tomorr — the sky realm is not a trap
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1' },
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  // The OFFERING road — lead the white bull up (service/humility), or seize it.
  qiellDem1: {
    id: 'qiellDem1',
    text: [
      L(w('bari'), w('eshte'), w('plak'), p('.')),
      L(wf('dem', 'demi', 'the bull'), w('eshte'), w('i_art'), w('forte'), p('.')),
      L(w('maja'), w('eshte'), w('larg'), p('.')),
      L(w('bari'), w('thote'), p(':'), wf('dem', 'demi', 'the bull'), w('eshte'), w('nje'), w('kurban'), w('per'), wf('mal', 'malin', 'the mountain'), p('.')),
    ],
    options: [
      { text: L(w('ngjit'), w('me'), w('dem')), to: 'qiell2', grant: 'dem', reveal: 'dem' },
      { text: L(w('merr'), w('dem')), to: 'demKeq', reveal: 'forte' },
      { text: L(w('kthehu')), to: 'qiell1' },
    ],
  },

  // The STORM road — Shurdhi's hail (ward it with iron, the attested rite) then
  // i Verbti, the blind fire-god in the wind.
  qiellErera1: {
    id: 'qiellErera1',
    text: [
      L(w('shurdhi'), w('vjen'), w('me'), w('bresher'), p('.')),
      L(wf('ere', 'era', 'wind'), w('eshte'), w('e_art'), w('forte'), p('.')),
      L(wf('njeri', 'njerëzit', 'the people'), wf('godit', 'godasin', 'strike'), w('hekur'), p('.')),
    ],
    options: [
      { text: L(w('godit'), w('hekur')), to: 'qiellErera2', reveal: 'hekur' },
      { text: L(w('lufto'), w('ere')), to: 'ereHumbur', reveal: 'ere' },
      { text: L(w('kthehu')), to: 'qiell1' },
    ],
  },

  qiellErera2: {
    id: 'qiellErera2',
    text: [
      L(w('ne'), w('ere'), w('vjen'), w('verbti'), p('.')),
      L(w('verbti'), w('eshte'), w('zjarr'), p('.')),
      L(w('verbti'), w('do'), w('sy'), p('.')),
    ],
    options: [
      { text: L(w('mbyll'), w('sy')), to: 'qiell2', reveal: 'sy' },
      { text: L(wf('sheh', 'shih', 'look'), w('verbti')), to: 'qiellVerbuar', reveal: 'zjarr' },
      { text: L(w('kthehu')), to: 'qiell1' },
    ],
  },

  // qiell2 — THE SUMMIT, where both roads converge and Zojz judges you. The
  // white bull (held only if you took the offering road) buys his blessing; the
  // forgiven feud opens the Sun; the bowed head opens his court; pride is burned.
  qiell2: {
    id: 'qiell2',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('maja'), w('te_link'), w('mal'), p('.')),
      L(w('nje'), w('plak'), w('me'), w('mjeker'), w('e_art'), w('bardhe'), w('rri'), w('ketu'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('eshte'), w('zojz'), p('.')),
      L(w('nje'), w('rrufe'), w('godit'), w('nje'), w('peme'), w('te_link'), wf('lart', 'lart', 'high'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('sheh'), w('gjak'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('njeri', 'njerëzit', 'the people'), wf('premto', 'premtojnë', 'swear'), w('per'), wf('ky', 'këtë', 'this'), w('diell'), p(','), w('se'), wf('diell', 'dielli', 'the sun'), w('sheh'), w('gjithe'), p('.')),
      L(w('zojz'), w('do'), w('nje'), w('dem'), w('te_link'), w('bardhe'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('dem')), to: 'zojzBekim', requires: 'dem', consumes: 'dem', reveal: 'dem' },
      { text: L(w('fal'), w('gjak')), to: 'diellShenjt', reveal: 'gjak' },
      { text: L(w('bie'), wf('ne', 'në', 'to'), w('toke')), to: 'qiellPrende', reveal: 'zojz' },
      { text: L(w('ngjit'), w('lart')), to: 'zojzRrufe' },
    ],
  },

  zojzBekim: {
    id: 'zojzBekim',
    end: 'good',
    title: 'The Sky-Father’s Blessing',
    blurb:
      'You climbed Tomorr the way the pilgrims still climb it, and gave the sky-father the offering of the old songs — the white bull carried to the summit. Zojz, an old man white-bearded to his belt, the she-eagles wheeling about him and the winds for his servants, found no pride in you to burn. He blessed you, and the winds bore you home. (The mountain is climbed to this day, each August — though the kurban the pilgrims share at the tekke now is a lamb, not a bull for the old god.) The thunderbolt seeks the tall tree and the tall tower; it never finds the one who kneels.',
    text: [
      L(w('ti'), w('jep'), w('nje'), w('dem'), w('te_link'), w('bardhe'), p('.')),
      L(w('zojz'), wf('bekim', 'bekon', 'blesses'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  diellShenjt: {
    id: 'diellShenjt',
    end: 'secret',
    title: 'The Beauty of the Sky',
    blurb:
      'Before the all-seeing one you did the hardest thing the Kanun allows — falja e gjakut, the forgiving of blood: you let a feud die rather than feed it. And the sky opened. Dielli, the Sun, is the eye no deed escapes, and that is why he is the witness the old people swear by — për këtë diell, "by this sun" — the oath that cannot be taken back, for that witness never sets without having seen. You forgave in the sight of that eye, and it was not ashamed of you.',
    text: [
      L(w('ti'), w('fal'), w('gjak'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('sheh'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('bukur'), p('.')),
    ],
    options: [],
  },

  zojzRrufe: {
    id: 'zojzRrufe',
    end: 'bad',
    title: 'Struck by the Thunderbolt',
    blurb:
      'You stood tall before the sky-father and would not bow. But Zojz watches the deeds of men, and the proud he burns: he hurls the thunderbolt on the tall tree and the high tower, and so he hurled it on you. In the old country they tell it to children as a warning — the bolt always finds the one who will not bow.',
    text: [
      L(w('ti'), w('je'), wf('krenar', 'krenar', 'proud'), p('.')),
      L(w('nje'), w('rrufe'), w('godit'), w('ti'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // THE CELESTIAL COURT — reached by bowing to Zojz. His daughter Prende (dawn,
  // Lady of Beauty, rainbow-belt) and then the Sun himself, i Bukuri i Qiellit.
  qiellPrende: {
    id: 'qiellPrende',
    text: [
      L(w('ti'), w('ngjit'), wf('ne', 'në', 'to'), w('qiell'), p('.')),
      L(w('prende'), w('eshte'), wf('bije', 'bija', 'the daughter'), w('e_link'), w('zojz'), p('.')),
      L(w('prende'), w('eshte'), w('e_art'), w('bukur'), p('.')),
      L(w('prende'), w('jep'), w('nje'), w('bekim'), p('.')),
      L(wf('premte', 'e premtja', 'Friday'), w('eshte'), wf('dite', 'dita', 'the day'), w('e_link'), w('prende'), p('.')),
      L(w('prende'), w('jep'), w('zemer'), w('dhe'), w('bekim'), w('per'), w('gra'), p('.')),
      L(w('nje'), w('ylber'), w('rri'), wf('lart', 'lart', 'high'), p('.')),
      L(wf('ylber', 'ylberi', 'the rainbow'), w('eshte'), w('e_link'), w('prende'), p('.'), wf('thote', 'thonë', 'they say'), p(':'), w('kush'), w('kalo'), wf('ylber', 'ylberin', 'the rainbow'), p(','), w('burre'), wf('behet', 'bëhet', 'becomes'), w('grua'), p('.')),
      // Prende is the dawn-goddess; her light is strongest as day breaks
      when('dawn', L(w('eshte'), w('agim'), p(','), w('prende'), w('eshte'), w('e_art'), w('forte'), p('.'))),
    ],
    options: [
      { text: L(w('merr'), w('bekim')), to: 'prendeBekim', reveal: 'prende' },
      { text: L(w('kalo'), w('ylber')), to: 'ylberKaprcim', reveal: 'ylber' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('qiell')), to: 'qiellDiell' },
    ],
  },

  // The height of heaven: by DAY the Sun rides here (stand in his light → his
  // blessing); by NIGHT he is gone and the Moon holds the sky (seek her quiet).
  // The two are mutually exclusive by the hour — wait out the sky to reach either.
  qiellDiell: {
    id: 'qiellDiell',
    text: [
      unless('night', L(wf('lart', 'lart', 'high'), w('eshte'), wf('diell', 'dielli', 'the sun'), p('.'))),
      unless('night', L(wf('diell', 'dielli', 'the sun'), w('sheh'), w('ti'), p('.'))),
      unless('night', L(wf('diell', 'dielli', 'the sun'), w('jep'), w('drite'), w('dhe'), w('fuqi'), p('.'))),
      unless('night', L(wf('diell', 'dielli', 'the sun'), w('sheh'), wf('bote', 'botën', 'the world'), p('.'))),
      unless('night', L(wf('thote', 'thonë', 'they say'), p(':'), wf('diell', 'dielli', 'the sun'), w('eshte'), w('bukura'), w('e_link'), wf('qiell', 'qiellit', 'the sky'), p('.'), wf('toke', 'toka', 'the earth'), w('dhe'), wf('det', 'deti', 'the sea'), wf('ka', 'kanë', 'have'), w('nje'), w('bukura'), p('.'))),
      // waiting in the height of heaven, you WATCH the changeover happen: the
      // Sun leaves as night falls, and returns with the dawn
      became('night', L(wf('naten', 'nata', 'the night'), w('vjen'), p('.'))),
      became('dawn', L(wf('diell', 'dielli', 'the sun'), w('vjen'), p('.'))),
      when('night', L(wf('diell', 'dielli', 'the sun'), wf('ik', 'ikën', 'is gone'), p('.'))),
      when('night', L(wf('hene', 'hëna', 'the moon'), w('eshte'), wf('lart', 'lart', 'high'), p('.'))),
      when('night', L(wf('hene', 'hëna', 'the moon'), w('jep'), w('drite'), w('e_art'), w('qete'), p('.'))),
    ],
    options: [
      // stand in the Sun's full light — only while he is in the sky
      { text: L(w('rri'), w('ne'), w('drite')), unless: 'night', to: 'diellApex', reveal: 'drite' },
      // seek the Moon — only when she has risen
      { text: L(w('kerko'), w('hene')), requires: 'night', to: 'henaPaqe', reveal: 'hene' },
      // linger in the sky until the Sun sets and the Moon comes
      { text: L(w('prit'), wf('naten', 'natën', 'night')), unless: 'night', to: 'qiellDiell', time: 'night' },
      // linger until the Sun climbs again
      { text: L(w('prit'), w('agim')), requires: 'night', to: 'qiellDiell', time: 'dawn' },
      // fleeing the height of heaven loses you in the cloud on the mountainside
      // (maliHumbur), the same as fleeing qiell1 — never straight to the village
      { text: L(w('ik'), w('shpejt')), to: 'maliHumbur' },
    ],
  },

  demKeq: {
    id: 'demKeq',
    end: 'bad',
    title: 'The Offering Seized',
    blurb:
      'You did not lead the white bull up — you took it, wrestled it from an old shepherd and dragged it to the holy stone by force. But a gift carried in anger is no gift, and the sky-father knows the difference. The proud hand that seizes the offering is the very hand the thunderbolt seeks; Zojz struck, and the bull and the man who stole it were ash on the rock.',
    text: [
      L(w('ti'), w('merr'), wf('dem', 'demin', 'the bull'), w('me'), w('fuqi'), p('.')),
      L(w('nje'), w('rrufe'), w('godit'), w('ti'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  ereHumbur: {
    id: 'ereHumbur',
    end: 'bad',
    title: 'Lost in the Winds',
    blurb:
      'The winds are the sky-father’s own servants, and you raised your fists at them. No one fights the wind. Shurdhi’s hail drove you blind off the path and the storm walked you in circles until the cold had you. The pilgrims who bang the iron and bow their heads come down the mountain again; those who battle the air do not.',
    text: [
      L(w('ti'), w('lufto'), wf('ere', 'erën', 'wind'), p('.')),
      L(w('ti'), w('humbet'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  qiellVerbuar: {
    id: 'qiellVerbuar',
    end: 'bad',
    title: 'Blinded by the Blind One',
    blurb:
      'You looked on i Verbti, the Blind One — the fire-and-wind god who burns whatever meets his eye. The old people say you must never look at him, only cover your face and let him pass. You looked. The fire took your sight, and a blind man does not walk down off a mountain.',
    text: [
      L(wf('sheh', 'shih', 'you look at'), w('verbti'), p('.')),
      L(w('zjarr'), wf('verbo', 'verbon', 'blinds'), w('ti'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  prendeBekim: {
    id: 'prendeBekim',
    end: 'good',
    title: 'Prende’s Blessing',
    blurb:
      'You bowed your head, and Zojz let you up into his court — where his daughter waited. Prende, Zoja e Bukurisë: the dawn-goddess, protector of women and giver of love and health, whose name the week itself still keeps — Friday, e premtja, is Prende’s day. She laid her blessing on you, and you came down the mountain whole, and lucky, and loved. Not every gift of the sky is a thunderbolt.',
    text: [
      L(w('prende'), wf('bekim', 'bekon', 'blesses'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  ylberKaprcim: {
    id: 'ylberKaprcim',
    end: 'secret',
    title: 'Over the Rainbow',
    blurb:
      'The rainbow is Prende’s belt, and the old people tell it plainly: whoever leaps over the rainbow comes down changed — a man a woman, a woman a man. You leapt. You landed on the far slope in a body not the one you carried up, and walked back into the world to learn it new. The sky keeps stranger gifts than blessings.',
    text: [
      L(w('ti'), w('kalo'), wf('ylber', 'ylberin', 'the rainbow'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('ri'), p('.')),
    ],
    options: [],
  },

  diellApex: {
    id: 'diellApex',
    end: 'good',
    title: 'i Bukuri i Qiellit',
    blurb:
      'You stood full in the light and the Sun looked back — i Bukuri i Qiellit, the Beauty of the Sky: giver of life and health and energy, the all-seeing eye that misses no deed done beneath heaven. The Earth hides her Beauty in the dark spring and the Sea keeps hers in the deep, but this one rides the open day where every soul can see it. You stood in its light and were counted among the just — the highest of the three Beauties, and the only one that never sets for long.',
    text: [
      L(w('ti'), w('rri'), w('ne'), w('drite'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('sheh'), w('ti'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('bukur'), p('.')),
    ],
    options: [],
  },

  henaPaqe: {
    id: 'henaPaqe',
    end: 'secret',
    title: 'The Moon’s Quiet',
    blurb:
      'You turned from the burning Sun and asked instead for the Moon — Hëna, who rides the night as the Sun rides the day, mother of the lightning-maiden, the cool eye that does not judge but only watches. She gave you no blessing and no fortune, only quiet: a night without fear, and the road home shown to you in silver — for the old people sowed by the waxing moon and reaped by the full, and carved her crescent beside the sun on their grave-stones. Some who climb all the way to heaven do not want its fire — only to come down again in peace.',
    text: [
      L(w('ti'), wf('kerko', 'kërkon', 'seek'), wf('hene', 'hënën', 'the moon'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('qete'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // ACT I — THE RIVER QUARTER (te lumi) — the lower village, down the slope.
  // THE FIRST SCENE of the game: the bridge you cross from `start` IS the old
  // stone bridge of the tanners (Ura e Tabakëve), and it lands you here. The
  // quarter holds the water-MILL (the fair measure), the living SPRING, the
  // TANNERS' BANK under the old bridge (tabaket1 — the bridge's own story),
  // and — kept clearly APART from the crossed bridge — the men building
  // ANOTHER bridge (the Bridge of Arta, the walled bride). Also reached by
  // "zbrit te lumin" from the square. "kalo urën" retreats to the bridgehead
  // for free (a `free:` option — the way you came is never token-locked).
  // Deliberately SLIM: this is the player's first wall of Albanian — every
  // line here is an arrival, a gated signpost, or live NPC/time state.
  // =========================================================================
  fshatiLumi: {
    id: 'fshatiLumi',
    text: [
      // the scene opens with HOW you got here: over the tanners' bridge, down
      // from the village, or (any other way) the plain establishing shot
      from('start', L(w('ti'), wf('kalo', 'kalon', 'cross'), wf('ure', 'urën', 'the bridge'), w('e_art'), w('vjeter'), p('.'))),
      from('start', L(w('tani'), w('ti'), w('je'), wf('tek', 'te', 'at'), wf('lume', 'lumi', 'the river'), p('.'))),
      from(['fshatiSheshi', 'fshatiJeta', 'fshatiLanes'], L(w('ti'), wf('zbrit', 'zbret', 'go down'), w('nga'), wf('fshat', 'fshati', 'the village'), wf('tek', 'te', 'to'), wf('lume', 'lumi', 'the river'), p('.'))),
      notFrom(['start', 'fshatiSheshi', 'fshatiJeta', 'fshatiLanes'], L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('lume', 'lumi', 'the river'), p('.'))),
      L(wf('ure', 'ura', 'the bridge'), w('e_art'), w('vjeter'), w('eshte'), w('e_link'), wf('tabak', 'tabakëve', 'the tanners'), p('.')),
      L(wf('burre', 'burrat', 'the men'), wf('bej', 'bëjnë', 'build'), w('nje'), w('ure'), w('tjeter'), p('.')),
      L(w('nje'), w('mulli'), w('punon'), w('me'), w('uje'), p('.')),
      // the water-carrier (npcs.js gruaUji) walks her daylight loop past here:
      // seen ACROSS the water at the spring, or met HERE with the full jugs
      when('npcAt:gruaUji:kroi1', L(wf('tek', 'te', 'at'), wf('krua', 'kroi', 'the spring'), w('nje'), w('grua'), w('merr'), w('uje'), p('.'))),
      when('npc:gruaUji', L(w('nje'), w('grua'), w('vjen'), w('nga'), wf('krua', 'kroi', 'the spring'), w('me'), w('uje'), p('.'))),
      // the wedding train (npcs.js krushqit): watched crossing the old bridge
      // above you, or met on this bank as the bride rides off it
      when('npcAt:krushqit:start', L(wf('tek', 'te', 'at'), wf('ure', 'ura', 'the bridge'), w('e_art'), w('vjeter'), w('nje'), w('nuse'), w('vjen'), w('me'), w('kale'), p('.'))),
      when('npc:krushqit', L(w('nje'), w('nuse'), w('me'), w('kale'), wf('kalo', 'kalon', 'crosses'), wf('ure', 'urën', 'the bridge'), p('.'))),
      L(wf('lart', 'lart', 'up'), wf('shko', 'shkon', 'goes'), w('nje'), w('rruge'), wf('tek', 'te', 'to'), wf('fshat', 'fshati', 'the village'), p('.')),
    ],
    options: [
      // walk back over the bridge you crossed — retreat spends no tokens
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'start', free: true },
      // only offered while she actually stands on this bank (npc route)
      { text: L(w('fol'), w('me'), wf('grua', 'gruan', 'the woman')), requires: 'npc:gruaUji', to: 'gruaUji1', reveal: 'grua' },
      { text: L(w('shko'), wf('tek', 'te', 'to'), wf('ure', 'ura', 'the bridge'), w('tjeter')), to: 'uraArtes1', reveal: 'tjeter' },
      { text: L(w('shko'), wf('tek', 'te', 'to'), wf('tabak', 'tabakët', 'the tanners')), to: 'tabaket1', reveal: 'tabak' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('mulli')), to: 'mulli1', reveal: 'mulli' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('krua')), to: 'kroi1', reveal: 'krua' },
      { text: L(w('ngjit'), wf('tek', 'te', 'to'), wf('shtepi', 'shtëpitë', 'the homes')), to: 'fshatiJeta', reveal: 'rruge' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes', reveal: 'rruge' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('fshat')), to: 'fshatiSheshi' },
    ],
  },

  // The water-carrier stopped on the bank — a talk-and-return vignette, only
  // reachable while the walking NPC (npcs.js gruaUji) stands at the river. She
  // is the living link between the dry well up in the square and the spring
  // down here: every daylight hour of her loop IS the village's water supply.
  gruaUji1: {
    id: 'gruaUji1',
    text: [
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':')),
      L(wf('pus', 'pusi', 'the well'), wf('ne', 'në', 'in'), w('fshat'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(wf('krua', 'kroi', 'the spring'), w('jep'), w('uje'), p(','), wf('pus', 'pusi', 'the well'), w('jo'), p('.')),
      L(w('une'), wf('shko', 'shkoj', 'go'), wf('tek', 'te', 'to'), w('krua'), w('cdo'), w('dite'), p('.')),
      L(w('une'), wf('sjell', 'sjell', 'bring'), w('uje'), w('lart'), wf('ne', 'në', 'to'), w('fshat'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('tek', 'te', 'to'), wf('lume', 'lumi', 'the river')), to: 'fshatiLumi' },
    ],
  },

  // The miller at his water-mill — a flavour vignette (talk-and-return) carrying
  // the telling/asking words of the 351-400 band. Reached from mulli1 ("degjo
  // plakun") — the speaker IS the old miller of the mill scene.
  lumiMjeshter: {
    id: 'lumiMjeshter',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(w('une'), w('tregoj'), w('ti'), w('nje'), w('gje'), p('.')),
      L(w('ti'), wf('ka', 'ke', 'have'), w('nje'), w('pyetje'), p('?')),
      L(w('eshte'), w('nje'), w('fakt'), p('.')),
      // the proverb the game itself lives by: as long as you live, you learn
      Q('fjalë e urtë',
        w('sa'), w('rron'), p(','), w('aq'), wf('meso', 'mëson', 'you learn'), p('.')),
      L(w('une'), wf('sheh', 'pashë', 'saw'), wf('uje', 'ujin', 'the water'), p('.')),
      L(w('ne_we'), wf('sheh', 'shohim', 'see'), wf('mulli', 'mullirin', 'the mill'), p('.')),
      L(wf('uje', 'uji', 'the water'), wf('leviz', 'lëviz', 'moves'), p('.')),
      L(w('une'), wf('mban', 'mbaj', 'hold'), wf('pune', 'punën', 'the work'), p('.')),
      L(w('kush'), w('e_obj'), wf('bej', 'bëri', 'made'), p('?')),
      L(w('oh'), p(','), wf('dreq', 'dreqi', 'the devil'), p('!')),
      L(w('une'), wf('ndihmo', 'ndihmoj', 'help'), w('ti'), p('.')),
      L(wf('pune', 'puna', 'the work'), w('eshte'), w('e_link'), w('cmendur'), p('.')),
      L(w('une'), wf('bej', 'bëj', 'make'), wf('gje', 'gjëra', 'things'), w('e_link'), wf('tjeter', 'tjera', 'other'), p('.')),
      L(w('ne_we'), wf('sheh', 'shihemi', 'see'), w('neser'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'lumiMjeshter2' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('mulli')), to: 'mulli1' },
    ],
  },

  lumiMjeshter2: {
    id: 'lumiMjeshter2',
    text: [
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':')),
      L(w('une'), wf('mendoj', 'mendoja', 'was thinking'), w('per'), w('ti'), p('.')),
      L(w('ti'), wf('duket', 'dukesh', 'seem'), w('i_art'), w('lumtur'), p('.')),
      L(wf('cili', 'cili', 'which'), w('eshte'), wf('emer', 'emri', 'the name'), w('yt'), p('?')),
      L(w('une'), wf('di', 'din', 'know'), wf('emer', 'emrin', 'the name'), wf('yt', 'tënd', 'your'), p('.')),
      L(w('ne_we'), wf('merr', 'marrim', 'take'), w('uje'), w('nga'), wf('lume', 'lumi', 'the river'), p('.')),
      L(wf('merr', 'merrni', 'take'), w('uje'), p('!')),
      L(w('une'), wf('kerko', 'kërkoj', 'search'), w('nje'), w('gje'), p('.')),
      L(wf('uje', 'uji', 'the water'), wf('leviz', 'lëviz', 'moves'), w('drejt'), p('.')),
      L(w('nen'), w('ure'), w('eshte'), wf('uje', 'uji', 'the water'), p('.')),
      L(w('prapa'), w('mulli'), wf('je', 'janë', 'are'), wf('fushe', 'fushat', 'the fields'), p('.')),
      L(w('pasi'), w('ne_we'), wf('bej', 'bëjmë', 'do'), wf('pune', 'punën', 'the work'), p('.')),
      L(w('pese'), wf('vit', 'vite', 'years'), wf('ka', 'kanë', 'have'), wf('kalo', 'kaluar', 'passed'), p('.')),
      L(w('une'), w('nuk'), wf('mund', 'mundur', 'been able'), p('.')),
      L(w('ti'), wf('mund', 'mundesh', 'can'), p('?')),
      L(wf('merr', 'merre', 'take'), w('prej'), wf('mua', 'meje', 'me'), p('!')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('mulli')), to: 'mulli1' },
    ],
  },

  // === THE BRIDGE OF ARTA — the walled bride (the immurement ballad) =========
  // Web-verified canon: masons build a bridge whose piers fall every night; a
  // bird with a human voice says it will not stand unless a life is walled in —
  // the wife who brings the bread. The masters swear a besa of silence; the
  // young bride is sealed in the pier and curses the bridge to shiver like a
  // leaf, then blesses it to bear travellers safe. Sister-tale to Rozafa's wall.
  // The player's hinge mirrors murosur: keep the cruel besa (BAD) or break the
  // silence and warn her (GOOD) — mercy over stone.
  uraArtes1: {
    id: 'uraArtes1',
    text: [
      L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('ure', 'ura', 'the bridge'), w('tjeter'), p('.')),
      L(wf('burre', 'burrat', 'the men'), wf('bej', 'bëjnë', 'build'), w('ure'), p(','), w('por'), w('naten'), wf('ure', 'ura', 'the bridge'), w('bie'), p('.')),
      L(w('nje'), w('mjeshter'), w('rri'), w('ketu'), p('.')),
      L(wf('mjeshter', 'mjeshtri', 'the master'), wf('bej', 'bën', 'builds'), w('ure'), w('perseri'), p('.')),
      L(w('nje'), w('zog'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('mjeshter', 'mjeshtrin', 'the master')), to: 'uraArtes2', reveal: 'mjeshter' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi' },
    ],
  },

  uraArtes2: {
    id: 'uraArtes2',
    text: [
      L(wf('mjeshter', 'mjeshtri', 'the master'), w('thote'), p(':')),
      L(w('ure'), w('bie'), w('naten'), w('perseri'), p('.')),
      L(w('zog'), w('thote'), p(':'), w('ure'), w('do'), w('nje'), w('jete'), p('.')),
      L(w('nje'), w('nuse'), w('vjen'), w('me'), w('buke'), p('.')),
      L(wf('burre', 'burrat', 'the men'), wf('premto', 'premtojnë', 'swear'), w('nje'), w('bese'), p(':'), w('mos'), wf('thote', 'thoni', 'tell'), wf('nuse', 'nuseve', 'the wives'), p('.')),
      L(w('mur'), w('do_fut'), w('te_subj'), wf('merr', 'marrë', 'take'), wf('nuse', 'nusen', 'the bride'), wf('ne', 'në', 'in'), w('gur'), p('.')),
    ],
    options: [
      { text: L(wf('thote', 'thuaj', 'tell'), wf('nuse', 'nuses', 'the bride')), to: 'uraArtesShpetim', reveal: 'nuse' },
      { text: L(w('rri'), wf('ne', 'në', 'in'), w('bese')), to: 'uraArtesMur', reveal: 'bese' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi' },
    ],
  },

  uraArtesShpetim: {
    id: 'uraArtesShpetim',
    end: 'good',
    title: 'The Bride Warned',
    blurb:
      'The masters had sworn a cruel besa — to say nothing, and let the wall take whichever wife came first with the bread. You broke that silence and told her to run, for a besa that buys a bridge with an innocent life is no besa at all, and the old people honoured mercy above stone. The bridge stayed unfinished, only wood and water; travellers ford the river and cross themselves as they pass the place where a young bride was almost sealed alive — and lived, because one stranger would not keep quiet.',
    text: [
      L(w('ti'), wf('thote', 'i thua', 'tell'), wf('nuse', 'nuses', 'the bride'), p(':'), w('ik'), p('!')),
      L(wf('nuse', 'nusja', 'the bride'), w('ik'), p('.')),
      L(wf('nuse', 'nusja', 'the bride'), w('eshte'), w('e_art'), w('gjalle'), p('.')),
    ],
    options: [],
  },

  uraArtesMur: {
    id: 'uraArtesMur',
    end: 'bad',
    title: 'The Bridge of Arta',
    blurb:
      'You kept the masters’ besa and said nothing. At dawn the young bride came down to the river with the bread, and the wall took her — sealed alive in the pier so the piling would stand at last. As the stones closed over her she cursed the bridge to shiver like a leaf on the water, then softened and blessed it to bear the road’s travellers safe, for her own brothers walked the world. The three-arched bridge has stood ever since, and trembles yet; the besa was kept, and the price, as at Rozafa’s wall, was cruel.',
    text: [
      L(w('mur'), w('merr'), wf('nuse', 'nusen', 'the bride'), wf('ne', 'në', 'in'), w('gur'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === THE WATER-MILL — the fair measure (resist greed at the common stone) ==
  mulli1: {
    id: 'mulli1',
    text: [
      L(w('ti'), w('je'), wf('tek', 'te', 'at'), w('mulli'), p('.')),
      L(wf('uje', 'uji', 'the water'), w('punon'), w('dhe'), wf('mulli', 'mulliri', 'the mill'), wf('bej', 'bën', 'makes'), w('miell'), p('.')),
      L(w('nje'), w('plak'), wf('bej', 'bën', 'grinds'), w('miell'), w('per'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(w('ketu'), w('eshte'), w('shume'), w('miell'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('mulli', 'mulliri', 'the mill'), w('ka'), w('nje'), w('fjale'), w('te_link'), w('vjeter'), p(':'), w('merr'), w('pak'), p(','), w('jo'), w('shume'), p('.')),
      // the miller's proverb over the slow stone (Dozon prints it:
      // "Me dourim tœ tœra bœkenœ")
      Q('fjalë e urtë (Dozon, 1879)',
        wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('me'), w('durim'), wf('behet', 'bëhen', 'become'), wf('te_link', 'të', 'the'), w('gjitha'), p('.')),
      when('day', L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('ka'), w('pune'), w('per'), w('ti'), p(':'), w('merr'), w('miell'), w('per'), wf('fshat', 'fshatin', 'the village'), p('.'))),
    ],
    options: [
      { text: L(w('merr'), w('pak'), w('miell')), to: 'mulliFund', reveal: 'miell' },
      { text: L(w('merr'), w('shume'), w('miell')), to: 'mulliKeq', reveal: 'miell' },
      // honest work at the common stone — the miller pays five lek a load
      { text: L(w('bej'), w('pune')), requires: 'day', lek: 5, to: 'punaMulli', reveal: 'pune' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'lumiMjeshter', reveal: 'plak' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi' },
    ],
  },

  // A day's work at the mill — flour carried for the village, five lek earned.
  punaMulli: {
    id: 'punaMulli',
    text: [
      L(w('ti'), w('mban'), w('miell'), w('per'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(w('ti'), w('punon'), w('shume'), wf('ne', 'në', 'in'), w('mulli'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('jep'), w('pese'), w('lek'), w('dhe'), w('thote'), p(':'), w('faleminderit'), p('!')),
      // the worker's motto: few words and much work
      Q('fjalë e urtë',
        wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('fjale'), w('pak'), w('e_conj'), w('pune'), w('shume'), p('!')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('mulli')), to: 'mulli1' },
    ],
  },

  mulliFund: {
    id: 'mulliFund',
    end: 'good',
    title: 'The Fair Measure',
    blurb:
      'The mill grinds for the whole village, and you took your own share and no more — and the miller and the mothers of the village blessed your hand. That is no small thing in the old country: the mill, the pasture, the water and the boundary-stone all lie under the Kanun, the unwritten code of the mountains, whose one principle is that a man’s given word outweighs his life. Fair dealing is not a courtesy here; it is the law of the land, older than any court.',
    text: [
      L(w('ti'), w('merr'), w('pak'), w('miell'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('mire'), p('.')),
    ],
    options: [],
  },

  mulliKeq: {
    id: 'mulliKeq',
    end: 'bad',
    title: 'The Thief at the Mill',
    blurb:
      'You took far more than your share of the flour — the grain other houses had carried down to the river on their own backs. A thief at the mill, the old people say, is cursed to the third house: the village turned its face from you, and the bread stolen from it was ash in the mouth. Greed at the common stone is never forgiven.',
    text: [
      L(w('ti'), w('merr'), w('shume'), w('miell'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('te_obj'), w('mallko'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  // === THE SPRING — the girl at the kroi (water is the first hospitality) =====
  kroi1: {
    id: 'kroi1',
    text: [
      L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('krua', 'kroi', 'the spring'), p('.')),
      L(wf('uje', 'uji', 'the water'), w('eshte'), w('i_art'), w('ftohte'), p('.')),
      // the spring's own night: the quiet the river scene used to narrate from afar
      when('night', L(w('naten'), wf('krua', 'kroi', 'the spring'), w('eshte'), w('i_art'), w('qete'), p('.'))),
      L(w('nje'), w('vajze'), w('merr'), w('uje'), w('ketu'), p('.')),
      // the water-carrier's loop passes through the spring itself
      when('npc:gruaUji', L(w('nje'), w('grua'), w('merr'), w('uje'), w('dhe'), wf('shko', 'shkon', 'goes'), w('lart'), p('.'))),
      L(wf('vajze', 'vajza', 'the girl'), w('te_obj'), w('jep'), w('uje'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('nje'), w('mik'), w('vjen'), w('nga'), w('perendi'), p(','), w('dhe'), w('nje'), w('ora'), w('mund'), w('te_subj'), w('ec'), wf('si', 'si', 'as'), w('vajze'), p('.')),
    ],
    options: [
      { text: L(w('pi'), w('uje')), to: 'kroiFund', reveal: 'uje' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi' },
    ],
  },

  kroiFund: {
    id: 'kroiFund',
    end: 'good',
    title: 'The Girl at the Spring',
    blurb:
      'The well in the square is dead and dry, but below the village the old spring still runs cold and clear, and a girl filling her jug gave the thirsty stranger the first cup without being asked. That is mikpritja, the first law of the old country: the guest is sent by God, and is owed bread, salt and heart — fire, water and a bed — at any hour, unasked. You drank, and thanked her and the spring; and the old people say a stranger served so may be more than a stranger, for an Ora walks in homespun, and blesses the hand that pours.',
    text: [
      L(w('ti'), w('pi'), w('uje'), p('.')),
      L(w('ti'), wf('thote', 'thua', 'say'), p(':'), w('faleminderit'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  // === THE TANNERS' BANK — the leather-workers under the old bridge. Their
  // craft is what names the game's first crossing: ura e vjetër IS Ura e
  // Tabakëve (the real one stands in Tirana over the Lana — the factoid
  // ending finally pays that off for the player). Work here pays lek by day
  // (the second wage of the quarter, beside the mill's).
  tabaket1: {
    id: 'tabaket1',
    text: [
      from('fshatiLumi', L(w('ti'), wf('shko', 'shkon', 'walk'), wf('tek', 'te', 'to'), wf('ure', 'ura', 'the bridge'), w('e_art'), w('vjeter'), p('.'))),
      notFrom('fshatiLumi', L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('ure', 'ura', 'the bridge'), w('e_art'), w('vjeter'), p('.'))),
      L(wf('tabak', 'tabakët', 'the tanners'), wf('punon', 'punojnë', 'work'), w('lekure'), w('ketu'), p('.')),
      when('day', L(wf('lekure', 'lëkura', 'the leather'), w('rri'), wf('ne', 'në', 'in'), w('diell'), p('.'))),
      // the offer that gates "bej pune" (same shape as the miller's)
      when('day', L(w('nje'), w('tabak'), w('thote'), p(':'), w('ka'), w('pune'), w('per'), w('ti'), p('.'))),
      when('night', L(w('naten'), w('askush'), w('nuk'), w('punon'), p('.'))),
      when('night', L(wf('lekure', 'lëkura', 'the leather'), w('rri'), wf('tek', 'te', 'at'), wf('ure', 'ura', 'the bridge'), p('.'))),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('tabak', 'tabakun', 'the tanner')), requires: 'day', to: 'tabakFund', reveal: 'tabak' },
      // honest work on the bank — hides hauled from the cold water, four lek
      { text: L(w('bej'), w('pune')), requires: 'day', lek: 4, to: 'punaTabak', reveal: 'pune' },
      { text: L(w('kthehu'), wf('tek', 'te', 'to'), wf('lume', 'lumi', 'the river')), to: 'fshatiLumi' },
    ],
  },

  // A day's work among the hides — the quarter's second wage, beside the mill's.
  punaTabak: {
    id: 'punaTabak',
    text: [
      L(w('ti'), w('punon'), w('lekure'), w('me'), wf('tabak', 'tabakët', 'the tanners'), p('.')),
      L(wf('uje', 'uji', 'the water'), w('eshte'), w('i_art'), w('ftohte'), w('dhe'), wf('pune', 'puna', 'the work'), w('e_link'), wf('madh', 'madhe', 'big'), p('.')),
      L(wf('tabak', 'tabaku', 'the tanner'), w('jep'), w('kater'), w('lek'), w('dhe'), w('thote'), p(':'), w('faleminderit'), p('!')),
    ],
    options: [
      { text: L(w('kthehu'), wf('tek', 'te', 'to'), wf('tabak', 'tabakët', 'the tanners')), to: 'tabaket1' },
    ],
  },

  tabakFund: {
    id: 'tabakFund',
    end: 'good',
    title: 'The Tanners’ Bridge',
    blurb:
      'The tanner told you plainly what the whole quarter lives by: the herds come in over the old stone bridge, the hides are worked on the bank below it, and the bridge keeps the tanners’ name. That bridge is real. Ura e Tabakëve — the Tanners’ Bridge — still stands in the middle of Tirana: an eighteenth-century Ottoman stone footbridge over the Lana stream, on the old road that brought livestock and produce in from the eastern highlands, named for the guild of tanners whose workshops and slaughterhouses lined the bank beside it. When the Lana was rerouted the bridge was left dry and half-forgotten among the traffic, until it was restored as a footbridge; today you can walk the game’s first crossing yourself — a few steps of humpbacked stone between the ministries and the mosques of the capital.',
    text: [
      L(wf('tabak', 'tabaku', 'the tanner'), w('thote'), p(':')),
      L(wf('kafshe', 'kafshët', 'the animals'), wf('vjen', 'vijnë', 'come'), w('mbi'), w('ure'), p('.')),
      L(w('ne_we'), wf('punon', 'punojmë', 'work'), wf('lekure', 'lëkurën', 'the leather'), wf('tek', 'te', 'at'), wf('lume', 'lumi', 'the river'), p('.')),
      L(wf('ure', 'ura', 'the bridge'), w('mban'), wf('emer', 'emrin', 'the name'), w('e_link'), wf('tabak', 'tabakëve', 'the tanners'), p('.')),
    ],
    options: [],
  },

  // =========================================================================
  // ACT I — THE CHURCH QUARTER (te kisha) — holy ground on the rise above the
  // village, the graves behind it. The priest blesses the traveller; at the
  // graves a woman keeps a candle for her dead — the faith between the living
  // and the dead that the Constantine ballad turns on. Reached by "shko te
  // kishën" from the back lanes.
  // =========================================================================
  kisha1: {
    id: 'kisha1',
    text: [
      // the church sits above the lanes — going to it is a climb
      from('fshatiLanes', L(w('ti'), w('ngjit'), w('lart'), wf('tek', 'te', 'to'), wf('kishe', 'kisha', 'the church'), p('.'))),
      notFrom('fshatiLanes', L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('kishe', 'kisha', 'the church'), p('.'))),
      L(wf('kishe', 'kisha', 'the church'), w('rri'), wf('lart', 'lart', 'high'), w('mbi'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(w('nje'), w('prift'), w('rri'), wf('tek', 'te', 'at'), w('dere'), p('.')),
      L(wf('prift', 'prifti', 'the priest'), w('jep'), w('nje'), w('bekim'), p('.')),
      L(w('afer'), w('rri'), w('nje'), w('teqe'), p('.'), wf('njeri', 'njerëzit', 'the people'), wf('shko', 'shkojnë', 'go'), wf('ne', 'në', 'to'), wf('kishe', 'kisha', 'the church'), w('dhe'), wf('ne', 'në', 'to'), w('teqe'), p('.')),
      L(w('bekim'), w('eshte'), w('nje'), p('.')),
      L(w('larg'), wf('je', 'janë', 'are'), wf('varr', 'varret', 'the graves'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('prift', 'priftin', 'the priest')), to: 'kishaFund', reveal: 'prift' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('varr', 'varret', 'the graves')), to: 'varret1', reveal: 'varr' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  kishaFund: {
    id: 'kishaFund',
    end: 'good',
    title: 'The Priest’s Blessing',
    blurb:
      'The little church keeps the rise above the village, half between the living houses and the graves behind it, and the priest laid his blessing on the traveller as the old country lays it on everyone who passes — for a road walked with a blessing is a road half-guarded. Whether the call to it was a church-bell or the drum of a teqe, the same grace was asked: that you go and come again in peace, and that the earth of this place remember you kindly.',
    text: [
      L(wf('prift', 'prifti', 'the priest'), w('te_obj'), w('jep'), w('nje'), w('bekim'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
    ],
    options: [],
  },

  varret1: {
    id: 'varret1',
    text: [
      L(w('ketu'), wf('je', 'janë', 'are'), wf('varr', 'varret', 'the graves'), p('.')),
      when('night', L(w('eshte'), w('naten'), w('dhe'), w('eshte'), w('erret'), p('.'))),
      unless('night', L(wf('varr', 'varret', 'the graves'), wf('rri', 'rrinë', 'rest'), w('qete'), p('.'))),
      L(w('nje'), w('grua'), wf('ndiz', 'ndez', 'lights'), w('nje'), w('qiri'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('ka'), w('lot'), w('per'), w('nje'), w('burre'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), wf('burre', 'burri', 'the man'), w('im'), w('rri'), wf('ne', 'në', 'in'), w('varr'), p(','), w('por'), w('bese'), w('nuk'), wf('vdes', 'vdes', 'die'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), w('dyzet'), wf('dite', 'ditë', 'days'), wf('qiri', 'qiriu', 'the candle'), w('ka'), w('zjarr'), p(','), w('dyzet'), wf('dite', 'ditë', 'days'), wf('shpirt', 'shpirti', 'the soul'), w('ec'), p('.')),
    ],
    options: [
      { text: L(w('ndiz'), w('nje'), w('qiri')), to: 'varretFund', reveal: 'qiri' },
      { text: L(w('kthehu')), to: 'kisha1' },
    ],
  },

  varretFund: {
    id: 'varretFund',
    end: 'secret',
    title: 'A Candle for the Dead',
    blurb:
      'You lit a candle at the graves, as the old country keeps its dead: a candle kept burning forty days, for forty days the soul is on its road. The dead here are not left at the grave’s edge; they are walked out of the world slowly, and in company. You kept faith with the dead, and the dead keep faith with you.',
    text: [
      L(w('ti'), wf('ndiz', 'ndez', 'light'), w('nje'), w('qiri'), w('per'), wf('varr', 'varret', 'the graves'), p('.')),
      L(w('bese'), w('nuk'), wf('vdes', 'vdes', 'die'), p('.')),
    ],
    options: [],
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
const kulshAcc = () => wf('kulshedra', 'kulshedrën', 'the she-dragon')
const shadowAcc = () => wf('hije', 'hijen', 'the shadow')

// (1) an action on something NOT present in the scene
const CONFUSERS = {
  maliHumbur: L(w('ngjit'), wf('re', 'renë', 'the cloud')), // climb the cloud — you cannot
  lumiHumbur: L(w('sheh'), wf('rruge', 'rrugën', 'the road')), // see the road — the scene says you cannot
  botaHumbur: L(w('sheh'), w('udhekryq')), // take the world — you cannot
  // village river & church quarters
  fshatiLumi: L(w('merr'), wf('lume', 'lumin', 'the river')), // take the river — you cannot
  uraArtes1: L(w('degjo'), wf('ure', 'urën', 'the bridge')), // listen to the bridge — it cannot answer
  uraArtes2: L(w('degjo'), wf('gur', 'gurin', 'the stone')), // listen to the stone — it cannot speak
  mulli1: L(w('merr'), wf('mulli', 'mullirin', 'the mill')), // take the mill — you cannot
  kroi1: L(w('merr'), wf('krua', 'kroin', 'the spring')), // take the spring — you cannot
  tabaket1: L(w('fol'), w('me'), wf('ure', 'urën', 'the bridge')), // speak with the bridge — it cannot answer
  punaTabak: L(w('jep'), wf('pune', 'punën', 'the work')), // give the work (away) — you cannot
  gruaUji1: L(w('jep'), wf('pus', 'pusin', 'the well')), // give the well — you cannot
  kisha1: L(w('degjo'), wf('varr', 'varret', 'the graves')), // listen to the graves — they cannot answer
  varret1: L(w('ndiz'), wf('bese', 'besën', 'the oath')), // light the oath — you cannot
  udhekryq: L(w('ngjit'), wf('lume', 'lumin', 'the river')), // climb the river — you cannot climb water
  qiell1: L(w('fol'), w('me'), wf('maja', 'majën', 'the summit')), // speak with the summit — it cannot answer
  qiell2: L(w('jep'), wf('diell', 'diellin', 'the Sun')), // give the Sun — you cannot
  qiellDem1: L(w('merr'), wf('mal', 'malin', 'the mountain')), // take the mountain — none here
  deti1: L(w('zbrit'), wf('ne', 'në', 'to'), w('qiell')), // go down to the sky — you cannot (the sky is above)
  detiThelle1: L(w('lufto'), wf('det', 'detin', 'the sea')), // fight the sea — you cannot
  detiThelle2: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot speak
  jutbina: L(w('kerko'), wf('maja', 'majën', 'the summit')), // search the summit — none here
  katallanRob: L(w('verbo'), wf('udhetar', 'udhëtarin', 'the traveller')), // blind the traveller — he is not your foe
  katallanGur: L(wf('ngre', 'ngre', 'lift'), wf('gur', 'gurin', 'the stone')), // lift the stone — you cannot
  katallanZjarr: L(w('godit'), wf('zjarr', 'zjarrin', 'the fire')), // strike the fire — pointless
  katallanVerbim: L(w('godit'), wf('dere', 'derën', 'the door')), // strike the door — pointless
  kordhaMoat: L(wf('kerce', 'kërce', 'leap'), wf('vajze', 'vajzën', 'the daughter')), // leap the daughter — nonsense
  arushePeme: L(w('mashtro'), wf('peme', 'pemën', 'tree')), // trick the tree — nonsense
  arusheNate: L(w('godit'), wf('gjak', 'gjakun', 'the blood')), // strike the blood — nonsense
  kordhaUdha: L(wf('kerce', 'kërce', 'leap'), w('mbi'), wf('pallat', 'pallatin', 'the palace')), // leap over the palace — nonsense
  kordhaPallat: L(w('hyr'), wf('ne', 'në', 'to'), w('zjarr')), // enter the fire — death
  kordhaProva: L(w('lufto'), wf('krua', 'kroin', 'the spring')), // fight the spring — nonsense
  mujoHak1: L(w('ndihmo'), wf('kapidan', 'kapidanin', 'the captain')), // help the captain — he is the enemy
  mejdan1: L(w('thirr'), wf('kapidan', 'kapidanin', 'the captain')), // summon the captain — he is your foe, not your man
  mejdan2: L(w('vrit'), wf('bese', 'besën', 'the besa')), // kill the besa — you cannot kill an oath
  rusha1: L(w('merr'), wf('kulle', 'kullën', 'the tower')), // take the tower — you cannot
  halil1: L(w('merr'), wf('mujo', 'Mujon', 'Muji')), // take Muji — you cannot
  mujiZana1: L(w('tund'), wf('gur', 'gurin', 'the stone')), // rock the boulder — you cannot
  mujiZana2: L(w('zgjedh'), wf('nene', 'nënën', 'the mother')), // choose the mother — not a gift offered
  qiellErera1: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // lufto the mountain — you cannot
  qiellErera2: L(w('godit'), wf('mal', 'malin', 'the mountain')), // godit the mountain — you cannot
  qiellPrende: L(w('merr'), wf('ylber', 'ylberin', 'the rainbow')), // take the rainbow — you cannot grasp it
  qiellDiell: L(w('jep'), wf('mal', 'malin', 'the mountain')), // jep the mountain — you cannot
  plaka: L(w('merr'), wf('bukura', 'Bukurën', 'the Beauty')), // take the Beauty — none here (far, with the kulshedra)
  fshatiDil: L(w('fol'), w('me'), wf('pyll', 'pyllin', 'the forest')), // speak with the forest — it cannot answer
  pylli1: L(w('kthehu'), wf('ne', 'në', 'to'), w('pyll')), // return into the forest — you are already in it
  pylliThelle: L(w('jep'), wf('ujk', 'ujkun', 'the wolf')), // give the wolf — you cannot
  udha: L(w('jep'), wf('lume', 'lumin', 'the river')), // give the river — you cannot
  lumi: L(w('sheh'), wf('ar', 'arin', 'the gold')), // see the gold — none here (the old man only speaks of it)
  veraDite1: L(w('ndiz'), wf('diell', 'diellin', 'the sun')), // light the sun — you cannot
  flocka1: L(w('meso'), wf('liqen', 'liqenin', 'the lake')), // teach the lake — you cannot
  ura: L(w('degjo'), wf('lume', 'lumin', 'the river')), // listen to the river — it is dry and cannot answer
  zanaQumesht: L(w('tund'), wf('djep', 'djepin', 'the cradle')), // rock the cradle — none here
  zanaKripe: L(w('sheh'), wf('buke', 'bukën', 'the bread')), // see the bread — the salt is "for bread", no loaf is here
  zanaPende: L(w('merr'), w('mish')), //          take meat — none here
  rrethi: L(w('degjo'), wf('gjarper', 'gjarprin', 'the serpent')), // degjo the serpent — you cannot
  mali1: L(w('fol'), w('me'), wf('maja', 'majën', 'the summit')), // speak with the summit — it cannot answer
  peri1: L(w('hidh'), wf('peri', 'Perinë', 'the fairy')), // throw the fairy — you cannot
  xhind1: L(w('hidh'), wf('prag', 'pragun', 'the threshold')), // throw the threshold — you cannot
  mali2: L(w('ngjit'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // climb the she-dragon — you cannot
  mali3: L(w('ngjit'), wf('plak', 'plakun', 'the old man')), // climb the old man — you cannot
  maja: L(w('ngjit'), wf('plak', 'plakun', 'the old man')), // climb the old man — you cannot
  tomor1: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  tomor2: L(w('lufto'), wf('re', 'renë', 'the cloud')), // fight the cloud — none here
  tomor3: L(w('ngjit'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // climb the she-dragon — you cannot
  pusi: L(w('degjo'), wf('pus', 'pusin', 'the well')), // listen to the well — it cannot answer
  zbritja: L(w('shko'), wf('ne', 'në', 'to'), w('fshat')), //  go to the village — you are deep below
  bota1: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  dera: L(w('ngjit'), wf('hije', 'hijen', 'the shadow')), // climb the shadow — you cannot
  sprova: L(w('degjo'), wf('hije', 'hijen', 'the shadow')), // listen to the shadow — the shadows do not speak
  gjarpri: L(w('degjo'), wf('gjarper', 'gjarprin', 'the serpent')), // listen to the serpent — it cannot speak
  bota2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  uji: L(w('ngjit'), wf('uje', 'ujin', 'the water')), // climb the water — you cannot
  bukura1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  bukura2: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  kulshedra1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  fitorja: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  kthimi: L(w('zbrit'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), // descend into the cave — it is falling
  pusi2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  shqiponja1: L(w('jep'), wf('pus', 'pusin', 'the well')), // jep the well — you cannot
  siperfaqja: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  udhaKthimit: L(w('lufto'), wf('rruge', 'rrugën', 'the road')), // fight the road — you cannot
  kala1: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  kala2: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  pylliLoop: L(w('nxjerr'), w('zjarr')), // breathe out fire — you are not the Stihi
  stihi1: L(w('merr'), wf('flake', 'flakën', 'the flame')), // take the flame — you cannot
  vajtim1: L(wf('bej', 'bëj', 'make'), wf('burre', 'burrin', 'the man')), // make the man — you cannot
  gjumi: L(w('lufto'), wf('toke', 'tokën', 'the ground')), // fight the ground — you cannot
  lendina: L(w('jep'), wf('zjarr', 'zjarrin', 'the fire')), // give the fire — you cannot
  shtrigaNate: L(w('prit'), wf('plake', 'plakën', 'the old woman')), // wait for the old woman — she is already a witch now
  fshehur: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot answer
  shpellaHyrje: L(w('degjo'), wf('shpelle', 'shpellën', 'the cave')), // listen to the cave — it cannot answer
  qyteti: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot answer
  humbur: L(w('jep'), wf('erresire', 'errësirën', 'the darkness')), // give the darkness — you cannot
  rene: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  tre1: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  tre2: L(w('merr'), wf('uje', 'ujin', 'the water')), // take the water — the she-dragon holds it
  tre3: L(w('vrit'), wf('dragua', 'dragoin', 'the dragon')), // kill the dragon — none here
  bregu: L(w('jep'), wf('kulle', 'kullën', 'the tower')), // give the tower — you cannot
  balozMotra: L(w('jep'), wf('kulle', 'kullën', 'the tower')), // give the tower — you cannot
  balozTribut: L(w('jep'), wf('det', 'detin', 'the sea')), // give the sea — you cannot
  balozZgjedh: L(w('lufto'), wf('det', 'detin', 'the sea')), // fight the sea — none here
  balozLufte: L(w('jep'), wf('baloz', 'balozin', 'the sea-monster')), // give the sea-monster — you cannot
  balozKoke: L(w('pre'), wf('fshat', 'fshatin', 'the village')), // cut the village — you cannot
  zanaProva: L(w('degjo'), wf('gur', 'gurin', 'the stone')), // listen to the stone — it cannot speak
  zanaProva2: L(w('tund'), wf('dite', 'ditën', 'the day')), // rock the day — you cannot
  zanaFole: L(w('lufto'), wf('fole', 'folenë', 'the nest')), // lufto the nest — you cannot
  foleShpetuar: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  tomorProva: L(w('ngjit'), wf('re', 'renë', 'the cloud')), // climb the cloud — you cannot
  tomorStuhi: L(w('ngjit'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // climb the thunderbolt — you cannot
  ngjitja1: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  ngjitja2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  ngjitja3: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  udhetimi1: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  udhetimi2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  bukuraThellesi: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  fshatiSheshi: L(w('bej'), wf('pus', 'pusin', 'the well')), // make the well — you cannot
  sheshiKisha: L(wf('bej', 'bëj', 'make'), w('nje'), w('xhami')), // make a mosque — you cannot
  pazari1: L(w('blej'), wf('ore', 'orën', 'the hour')), // buy the hour — you cannot buy time
  sheshiPlak: L(w('ndihmo'), wf('pus', 'pusin', 'the well')), // help the well — it is not a person
  sheshiPlak2: L(w('lufto'), wf('vatra', 'vatrat', 'the hearths')), // fight the hearths — nonsense
  sheshiPlak3: L(w('ik'), wf('fund', 'fundin', 'the end')), // flee the end — you cannot
  qytetiUdhetar: L(w('ec'), wf('det', 'detin', 'the sea')), // walk the sea — you cannot
  jetaBaba: L(w('degjo'), wf('vend', 'vendin', 'the place')), // listen to the place — it cannot answer
  jetaBaba2: L(wf('bej', 'bëj', 'make'), wf('naten', 'natën', 'the night')), // make the night — you cannot
  jetaGrua: L(w('jep'), wf('fat', 'fatin', 'the luck')), // give the luck — you cannot hand it over
  qytetiUdhetar2: L(w('fol'), wf('det', 'detin', 'the sea')), // speak to the sea — it cannot answer
  dilFrike: L(w('jep'), wf('frike', 'frikën', 'the fear')), // give the fear — you cannot hand it over
  qytetiUdhetar3: L(w('merr'), wf('ore', 'orën', 'the hour')), // take the hour — you cannot carry time
  lumiMjeshter: L(w('tregoj'), wf('mulli', 'mullirin', 'the mill')), // tell the mill — it cannot listen
  udhetaretBisede: L(wf('shko', 'shko', 'go'), wf('ide', 'idenë', 'the idea')), // go the idea — it is not a place
  jetaGrua2: L(w('ndalo'), wf('mengjes', 'mëngjesin', 'the morning')), // stop the morning — you cannot
  lumiMjeshter2: L(w('merr'), wf('vit', 'vite', 'years')), // take the years — you cannot carry time
  qytetiUdhetar4: L(w('ec'), wf('arsye', 'arsyen', 'the reason')), // walk the reason — it is not a place
  udhetaretBisede2: L(w('lufto'), wf('rruge', 'rrugën', 'the road')), // fight the road — nonsense
  nenaDiell1: L(wf('bej', 'bëj', 'make'), wf('diell', 'diellin', 'the sun')), // make the sun — you cannot
  karkanxholl1: L(wf('thirr', 'thërret', 'call'), wf('hekur', 'hekurin', 'the iron')), // call the iron — nonsense
  dhelpra1: L(w('ha'), wf('ujk', 'ujkun', 'the wolf')), // eat the wolf — you cannot
  dhelpra2: L(w('ha'), wf('goje', 'gojën', 'the mouth')), // eat the mouth — you cannot
  arushe2: L(w('shtrydh'), wf('arushe', 'arushën', 'the bear')), // squeeze the bear — you cannot
  nastradinGjyq1: L(w('ha'), wf('ar', 'arin', 'the gold')), // eat the gold — you cannot
  fshatiLanes: L(w('hyr'), wf('ne', 'në', 'to'), wf('njeri', 'njeriun', 'the person')), // enter the person — you cannot
  kopshtMermer1: L(wf('hap', 'hap', 'open'), wf('mermer', 'mermerin', 'the marble')), // open the marble — you cannot
  kopshtMermer2: L(wf('hap', 'hap', 'open'), wf('mbret', 'mbretin', 'the king')), // open the king — you cannot
  mermerZgjim: L(w('merr'), wf('naten', 'natën', 'the night')), // take the night — you cannot
  mermerTradheti: L(w('merr'), wf('mbret', 'mbretin', 'the king')), // take the king — you cannot
  patatGruaja: L(w('kendo'), wf('shtepi', 'shtëpinë', 'the house')), // sing the house — you cannot
  diellShtepi1: L(w('fol'), w('me'), wf('kopsht', 'kopshtin', 'the garden')), // speak with the garden — it cannot answer
  diellKopsht: L(w('merr'), wf('kopsht', 'kopshtin', 'the garden')), // take the garden — you cannot
  diellKopshtFol: L(w('fol'), w('me'), wf('nene', 'nënën', 'the mother')), // speak with the mother — she is not here
  diellOda: L(w('lut'), wf('kafshe', 'kafshën', 'the animal')), // pray to the animal — it will not hear
  diellThirrKul: L(w('ha'), wf('diell', 'diellin', 'the Sun')), // eat the Sun — you cannot
  rrugaDielli1: L(w('ha'), wf('dre', 'dreun', 'the stag')), // eat the stag — you cannot
  pemaDielli: L(wf('thote', 'thuaj', 'say'), wf('peme', 'pemën', 'tree')), // speak to the tree — it cannot answer
  rrugaDielli2: L(w('merr'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // take the she-dragon — you cannot
  pallatiZi: L(w('fol'), w('me'), wf('pallat', 'pallatin', 'the palace')), // speak with the palace — it cannot answer
  pallatRoje: L(w('fol'), w('me'), wf('pallat', 'pallatin', 'the palace')), // speak with the palace — it cannot answer
  pallatRojeZi: L(w('fol'), w('me'), wf('mbreteresha', 'mbretëreshën', 'the queen')), // speak with the queen — she is not here
  pallatRojePse: L(w('merr'), wf('diell', 'diellin', 'the Sun')), // take the Sun — you cannot
  odaPlak: L(w('lut'), wf('femije', 'fëmijën', 'the child')), // pray to the child — it cannot hear
  libriDiell: L(w('ec'), w('mbi'), wf('diell', 'diellin', 'the Sun')), // walk on the Sun — you cannot
  djepi1: L(w('jep'), wf('djep', 'djepin', 'the cradle')), // give the cradle — you cannot
  djepi2: L(w('jep'), wf('djep', 'djepin', 'the cradle')), // give the cradle — you cannot
  pusiThate: L(w('degjo'), wf('uje', 'ujin', 'the water')), // listen to the water — it cannot speak
  fshatiJeta: L(w('degjo'), wf('qilim', 'qilimin', 'the rug')), // listen to the rug — it cannot speak
  syriKeq1: L(w('jep'), wf('nene', 'nënën', 'the mother')), // give the mother — you cannot
  breshka1: L(wf('bej', 'bëj', 'make'), wf('mik', 'mikun', 'guest')), // eat the guest — you cannot
  shtojzovalle1: L(w('degjo'), wf('hene', 'hënën', 'the moon')), // listen to the moon — it cannot answer
  shtojzovalle2: L(w('degjo'), wf('lot', 'lotët', 'the tears')), // listen to the tears — they cannot answer
  udhetaret: L(w('sheh'), wf('fshat', 'fshatin', 'the village')), // see the village — none here
  tregMal: L(w('ngjit'), wf('fshat', 'fshatin', 'the village')), // climb the village — none here
  tregDet: L(w('merr'), wf('fshat', 'fshatin', 'the village')), // take the village — none here
  tregMujo: L(w('lufto'), wf('fshat', 'fshatin', 'the village')), // fight the village — none here
  lahuta1: L(w('kendo'), wf('udhetar', 'udhëtarin', 'the traveller')), // sing the traveller — you cannot sing a person
  kafeja1: L(w('pi'), w('fat')), // drink the fate — you cannot
  dasma1: L(w('hyr'), wf('ne', 'në', 'in'), w('kale')), // enter into the horse — you cannot
  shpellaRruget: L(w('shko'), wf('ne', 'në', 'in'), w('drite')), // take the light — you cannot hold it
  djepi3: L(w('ha'), wf('bekim', 'bekimin', 'the blessing')), // eat the blessing — you cannot
  skender1: L(w('degjo'), wf('kala', 'kalanë', 'the castle')), // listen to the castle — a tale, not here
  skender2: L(w('merr'), wf('frike', 'frikën', 'the fear')), // take the fear — you cannot hold it
  burrnesha1: L(w('vesh'), wf('bese', 'besën', 'the oath')), // wear the oath — it is not clothing
  tregDragua: L(w('sheh'), wf('fshat', 'fshatin', 'the village')), // see the village — none here
  vatra: L(w('beso'), wf('zjarr', 'zjarrin', 'the fire')), // trust the fire — it cannot answer
  qilim: L(w('degjo'), wf('qilim', 'qilimin', 'the rug')), // listen to the rug — it cannot speak
  bariu: L(w('degjo'), wf('dhi', 'dhinë', 'the goat')), // listen to the goat — it cannot speak
  gjysmegjel1: L(w('merr'), wf('mbret', 'mbretin', 'the king')), // take the king — you cannot
  gjysmegjel2: L(w('ha'), wf('rrezik', 'rrezikun', 'the danger')), // eat the danger — you cannot
  kulle1: L(w('degjo'), wf('kulle', 'kullën', 'the tower')), // listen to the tower — it cannot speak
  kulle2: L(w('vrit'), wf('gjak', 'gjakun', 'the blood')), // kill the blood — you cannot
  fshatiBesa: L(w('premto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // swear to the she-dragon — none here
  fshatiCaul: L(w('premto'), wf('plak', 'plakun', 'the old man')), // swear to the old man — none here
  udheNate: L(w('degjo'), wf('mur', 'murin', 'the wall')), // listen to the wall — it cannot speak
  udheLugat: L(w('ndiz'), wf('hije', 'hijen', 'the shadow')), // light the shadow — you cannot
  udheOra: L(w('degjo'), wf('dite', 'ditën', 'the day')), // listen to the day — it cannot answer
  kalaVllezer: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  kalaBesa: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  kalaRozafa: L(w('degjo'), wf('mur', 'murin', 'the wall')), // degjo the wall — you cannot
  kulshLufte1: L(w('ngjit'), wf('diell', 'diellin', 'the Sun')), // climb the Sun — you cannot
  kulshLufte2: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  springReturn: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  bukuraKthim: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  udhaThate: L(w('jep'), wf('uje', 'ujin', 'the water')), // give the water — you cannot
  udhaSyri: L(w('ha'), wf('gjarper', 'gjarprin', 'the serpent')), // eat the serpent — you cannot
  uraFshaj: L(w('kalo'), wf('nene', 'nënën', 'the mother')), // cross the mother — she is not a bridge
  maliStuhi: L(w('ngjit'), wf('re', 'renë', 'the cloud')), // climb the cloud — you cannot
  zbritjaThelle: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  qeniGate: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  majaEagle: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  tomorBekim: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  tomorZbritje: L(w('degjo'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // degjo the she-dragon — you cannot
  zanaFuqi: L(w('kalo'), bridgeAcc()), //         cross a bridge — none here
  pusiThelle: L(w('thirr'), eagleAcc()), //       call the eagle — none here
  ujiShpella: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  porta1: L(w('jep'), wf('dere', 'derën', 'the door')), // give the door — you cannot
  ktheu1: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  ktheu3: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  ktheu2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  bukuraLirim: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  kalaBuna: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  kalaGji: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  kalaRing: L(w('ngjit'), w('mal')), //           climb a mountain — none here
  kalaMilk: L(w('kalo'), bridgeAcc()), //         cross a bridge — none here
  shqipe1: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  shqipe2: L(w('degjo'), wf('peme', 'pemën', 'tree')), // degjo the tree — you cannot
  shqipe3: L(w('hap'), wf('dere', 'derën', 'the door')), // open a door — none in the nest
  shpirag1: L(w('ngjit'), oldManAcc()), //        climb the old man — not here (all words already discovered)
  dhia1: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot speak
  kostandin1: L(w('degjo'), wf('lot', 'lotët', 'the tears')), // listen to the tears — they cannot speak
  kostandin2: L(w('degjo'), wf('varr', 'varrin', 'the grave')), // listen to the grave — it cannot answer
  kostandin3: L(w('sjell'), wf('rruge', 'rrugën', 'the road')), // bring the road — you cannot
  gjizar1: L(w('ndihmo'), wf('rruge', 'rrugën', 'the road')), // help the road — absurd
  gjizar2: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), // fight the serpent — not your fight
  gjizarUdha: L(w('jep'), wf('grua', 'gruan', 'the woman')), // give away the woman — you cannot
  gjizarPallat: L(w('merr'), wf('qiri', 'qiriun', 'the candle')), // take the candle — not the bird
  gjizarTradheti: L(w('thirr'), wf('vella', 'vëllezërit', 'the brothers')), // call the brothers — they betrayed you
  gjarperBurr1: L(w('kerko'), wf('pus', 'pusin', 'the well')), // search the well — none here
  gjarperBurr2: L(w('merr'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // carry off the she-dragon — you cannot
  gjarperOrigin: L(w('marto'), wf('pallat', 'pallatin', 'the palace')), // wed the palace — nonsense
  gjarperKulshedra: L(w('lufto'), wf('det', 'detin', 'the sea')), // fight the sea — you cannot
  gjarperKerkim: L(w('fol'), w('me'), wf('det', 'detin', 'the sea')), // speak with the sea — it cannot answer
  nastradin1: L(w('merr'), wf('fshat', 'fshatin', 'the village')), // take the village — none here
  sari1: L(w('ngjit'), wf('dervish', 'dervishin', 'the dervish')), // climb the dervish — you cannot
  sari2: L(w('ngjit'), wf('trim', 'trimin', 'the hero')), // climb the hero — you cannot
  dordolec1: L(w('kerko'), wf('fshat', 'fshatin', 'the village')), // search the village — none here
  dordolec2: L(w('hidh'), wf('diell', 'diellin', 'the Sun')), // throw the Sun — you cannot
  bolla1: L(w('hap'), wf('lume', 'lumin', 'the river')), // open the river — you cannot
  bolla2: L(w('hap'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // open the she-dragon — you cannot
  katallan1: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // fight the mountain — none here, and impossible
  gjak1: L(w('lufto'), wf('bese', 'besën', 'the oath')), // fight the oath — you cannot
  gjak2: L(w('degjo'), wf('gjak', 'gjakun', 'the blood')), // listen to the blood — it cannot speak
  zuku1: L(w('jep'), wf('kulle', 'kullën', 'the tower')), // jep the tower — you cannot
  zuku2: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  kordha1: L(w('fol'), wf('shpate', 'shpatën', 'the sword')), // speak with the sword — it cannot answer
  kordha2: L(w('fol'), w('me'), wf('shpate', 'shpatën', 'the sword')), // speak with the sword — it cannot answer
  shurdhi1: L(w('ngjit'), wf('re', 'renë', 'the cloud')), // climb the cloud — you cannot
  kali1: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  thesarOra: L(w('degjo'), wf('zjarr', 'zjarrin', 'the fire')), // listen to the fire — it cannot answer
  thesar2: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot answer
  nastradin2: L(w('kerko'), wf('femije', 'fëmijën', 'the child')), // search the child — none here
  besaBekim: L(w('merr'), wf('plake', 'plakën', 'the old woman')), // take the old woman — you cannot
  oda1: L(w('degjo'), wf('buke', 'bukën', 'the bread')), // listen to the bread — it has nothing to say
  oda2: L(w('ha'), wf('lot', 'lotët', 'the tears')), // eat the tears — you cannot
  mujo1: L(w('degjo'), wf('kulle', 'kullën', 'the tower')), // degjo the tower — you cannot
  mujo2: L(w('merr'), wf('mal', 'malin', 'the mountain')), // merr the mountain — you cannot
  mujo3: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  mujo4: L(w('ngjit'), wf('lahute', 'lahutën', 'the lute')), // climb the lute — you cannot
  ujkuLind1: L(w('bej'), wf('ujk', 'ujkun', 'the wolf')), // make a wolf — you are no devil
  verbti1: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  omer1: L(w('degjo'), wf('kulle', 'kullën', 'the tower')), // degjo the tower — you cannot
  omer2: L(w('ngjit'), wf('varr', 'varrin', 'the grave')), // climb the grave — you cannot
  lubia1: L(w('hidh'), wf('lume', 'lumin', 'the river')), // throw the river — none here
  lubiaKoke: L(w('kerko'), wf('uje', 'ujin', 'the water')), // search the water — none here
  prende1: L(w('ngjit'), wf('ylber', 'ylberin', 'the rainbow')), // climb the rainbow — you cannot
  riddle1: L(w('degjo'), w('gomar')), // listen to the donkey — none here (the riddle only names it)
  cuckoo1: L(w('qep'), wf('zog', 'zogun', 'the bird')), // sew the bird — absurd
  arushe1: L(w('lufto'), wf('pyll', 'pyllin', 'the forest')), // fight the forest — you cannot
  dhampir1: L(w('ndihmo'), wf('lugat', 'lugatin', 'the revenant')), // fight the bread — you cannot
  bleta1: L(w('ndihmo'), wf('qilim', 'qilimin', 'the carpet')), // help the carpet — you cannot
  dallendyshe1: L(w('ndihmo'), wf('gjak', 'gjakun', 'the blood')), // help the blood — you cannot
  kukudh1: L(w('vrit'), wf('arme', 'armën', 'the weapon')), // kill the bread — you cannot
  bijaHene1: L(w('ngjit'), wf('hene', 'hënën', 'the moon')), // climb the moon — you cannot
  agaYmer1: L(w('hyr'), wf('ne', 'në', 'to'), wf('trim', 'trimin', 'the hero')), // enter the hero — you cannot
  agaYmer2: L(w('degjo'), wf('plage', 'plagën', 'the wound')), // listen to the wound — you cannot
  // --- the LEK economy vignettes ---
  blerjaBuke: L(w('merr'), wf('tregtar', 'tregtarin', 'the trader')), // take the trader — you cannot
  blerjaKripe: L(w('kthehu'), wf('ne', 'në', 'to'), w('kripe')), // return into the salt — absurd
  shitjaCaj: L(w('jep'), wf('mal', 'malin', 'the mountain')), // give the mountain — you cannot
  blerjaLahuta: L(w('kendo'), w('me'), w('lek')), // sing with the lek — absurd
  gjumiBujtina: L(w('fle'), wf('ne', 'në', 'in'), w('kafe')), // sleep in the coffee — absurd
  sherimiBar: L(w('pi'), w('lek')), // drink the lek — you cannot
  cajMali1: L(w('merr'), wf('mal', 'malin', 'the mountain')), // take the mountain — you cannot
  punaMulli: L(w('merr'), wf('plak', 'plakun', 'the old man')), // take the old man — you cannot
  punaBariu: L(w('ha'), w('lek')), // eat the lek — you cannot
  kengaLahute: L(w('kendo'), w('per'), w('lek')), // sing to the lek — absurd
}

// (2) a categorically-impossible action on a PRESENT thing — shares a noun
// with the scene, so you can't dodge it by scanning for the noun.
const CONFUSERS2 = {
  maliHumbur: L(w('ngjit'), wf('udhekryq', 'udhëkryqin', 'the crossroads')), // climb the crossroads — you cannot
  lumiHumbur: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), // return to the river — you are already in it
  botaHumbur: L(w('kthehu'), wf('ne', 'në', 'to'), w('bote')), // climb the crossroads — you cannot
  // village river & church quarters
  fshatiLumi: L(w('merr'), wf('ure', 'urën', 'the bridge')), // take the bridge — you cannot
  uraArtes1: L(w('degjo'), wf('lume', 'lumin', 'the river')), // listen to the river — it cannot answer
  uraArtes2: L(w('merr'), wf('ure', 'urën', 'the bridge')), // take the bridge — you cannot
  mulli1: L(w('merr'), wf('lume', 'lumin', 'the river')), // take the river — you cannot
  kroi1: L(w('merr'), wf('lume', 'lumin', 'the river')), // take the river — you cannot
  tabaket1: L(w('bej'), w('nje'), w('lume')), // make a river — you cannot
  punaTabak: L(w('jep'), wf('tabak', 'tabakun', 'the tanner')), // give the tanner (away) — you cannot
  kisha1: L(w('jep'), wf('kishe', 'kishën', 'the church')), // give the church — you cannot
  varret1: L(w('rri'), wf('ne', 'në', 'in'), wf('qiri', 'qiriun', 'the candle')), // stay in the candle — you cannot
  udhekryq: L(w('ngjit'), wf('udhekryq', 'udhëkryqin', 'the crossroads')), // climb the crossroads — you stand on it
  qiell1: L(w('fol'), wf('me', 'me', 'with'), wf('ere', 'erën', 'wind')), // speak with the wind — it cannot answer
  qiell2: L(w('godit'), wf('diell', 'diellin', 'the Sun')), // strike the Sun — you cannot
  qiellDem1: L(w('fol'), wf('me', 'me', 'with'), wf('maja', 'majën', 'the summit')), // speak with the summit — it cannot answer
  deti1: L(w('rri'), w('mbi'), wf('det', 'detin', 'the sea')), // sit upon the open sea — you cannot
  detiThelle1: L(w('ngjit'), wf('det', 'detin', 'the sea')), // climb the sea — you cannot
  detiThelle2: L(w('merr'), wf('det', 'detin', 'the sea')), // take the sea — you cannot
  jutbina: L(w('ngjit'), wf('lahute', 'lahutën', 'the lute')), // climb the lute — you cannot
  qiellErera1: L(w('godit'), wf('ere', 'erën', 'wind')), // strike the wind — you cannot grasp it
  qiellErera2: L(w('godit'), wf('zjarr', 'zjarrin', 'the fire')), // strike the fire — you cannot
  qiellPrende: L(w('merr'), wf('maja', 'majën', 'the summit')), // take the summit — none here
  qiellDiell: L(w('jep'), wf('diell', 'diellin', 'the Sun')), // give the Sun — you cannot
  start: L(w('kalo'), wf('pyll', 'pyllin', 'the forest')), // cross the forest — you cannot
  lendina: L(w('ndiz'), wf('pyll', 'pyllin', 'the forest')), // light the forest — you cannot
  plaka: L(w('degjo'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // listen to the she-dragon — none here
  fshatiDil: L(w('lufto'), wf('pyll', 'pyllin', 'the forest')), // fight the forest — you cannot
  pylli1: L(w('fol'), w('me'), wf('pyll', 'pyllin', 'the forest')), // speak with the forest — it cannot answer
  pylliThelle: L(w('jep'), wf('pyll', 'pyllin', 'the forest')), // give the forest — you cannot
  shokuUjk: L(w('degjo'), wf('buke', 'bukën', 'the bread')), // listen to the bread — you cannot
  udha: L(w('fle'), wf('ne', 'në', 'in'), wf('lume', 'lumin', 'the river')), // sleep in the river — you cannot
  lumi: L(w('kerko'), wf('udhekryq', 'udhëkryqin', 'the crossroads')), // search the crossroads — none here (you left it behind)
  zana1: L(w('beso'), wf('dragua', 'dragoin', 'the dragon')), // trust the dragon — you are the dragua, there is no other
  zanaQumesht: L(w('sheh'), wf('femije', 'fëmijën', 'the child')), // see the child — none here
  zanaKripe: L(w('tund'), wf('djep', 'djepin', 'the cradle')), // rock the cradle — none here
  zanaPende: L(w('lufto'), wf('pende', 'pendën', 'the feather')), // fight the feather
  rrethi: L(w('degjo'), wf('fole', 'folenë', 'the nest')), // degjo+folenë — impossible
  mali1: L(w('fol'), w('me'), wf('shpelle', 'shpellën', 'the cave')), // speak with the cave — it cannot answer
  mali2: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — it fights for you
  mali3: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // listen to the mountain — it cannot speak
  maja: L(w('sheh'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // see the thunderbolt — none here
  tomor1: L(w('degjo'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // listen to the thunderbolt — none here
  tomor2: L(w('ngjit'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // climb the thunderbolt — none here
  tomor3: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // fight the mountain — none here
  pusi: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  zbritja: L(w('pi'), wf('bote', 'botën', 'the world')), // drink the world
  bota1: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  bota2: L(w('merr'), wf('pus', 'pusin', 'the well')), // merr the well — you cannot
  bukura1: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  bukura2: L(w('lufto'), wf('pus', 'pusin', 'the well')), // lufto the well — you cannot
  kulshedra1: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  fitorja: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  pusi2: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  shqiponja1: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  siperfaqja: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  kala1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  kala2: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  pylliLoop: L(w('degjo'), wf('maja', 'majën', 'the summit')), // listen to the summit — it cannot answer
  ura: L(w('degjo'), wf('ure', 'urën', 'the bridge')), // listen to the bridge — it cannot speak
  dera: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  sprova: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  gjarpri: L(w('merr'), wf('zjarr', 'zjarrin', 'the fire')), // take the fire — you cannot
  uji: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  kthimi: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  udhaKthimit: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  shtrigaNate: L(w('lufto'), wf('zjarr', 'zjarrin', 'the fire')), // fight the fire — you cannot
  fshehur: L(w('degjo'), wf('treg', 'tregun', 'the market')), // listen to the market — it cannot answer
  shpellaHyrje: L(w('zbrit'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), // go down to the river — none here
  qyteti: L(w('degjo'), wf('peshk', 'peshkun', 'the fish')), // listen to the fish — it cannot answer
  humbur: L(w('degjo'), wf('drite', 'dritën', 'the light')), // listen to the light — it cannot answer
  rene: L(w('degjo'), wf('pus', 'pusin', 'the well')), // degjo the well — you cannot
  tre1: L(w('ngjit'), wf('bote', 'botën', 'the world')), // climb the world — you cannot
  tre2: L(w('degjo'), wf('shtepi', 'shtëpinë', 'the house')), // degjo the house — you cannot
  tre3: L(w('degjo'), wf('shtepi', 'shtëpinë', 'the house')), // degjo the house — you cannot
  bregu: L(w('degjo'), wf('gjak', 'gjakun', 'the blood')), // listen to the blood — it cannot speak
  balozMotra: L(w('vajto'), wf('buke', 'bukën', 'the bread')), // mourn the bread — you cannot
  balozTribut: L(w('degjo'), wf('fshat', 'fshatin', 'the village')), // listen to the village — it cannot answer
  balozZgjedh: L(w('degjo'), wf('plage', 'plagën', 'the wound')), // listen to the wound — it cannot answer
  balozLufte: L(w('ndihmo'), wf('baloz', 'balozin', 'the sea-monster')), // help the sea-monster — never
  balozKoke: L(w('degjo'), wf('koke', 'kokën', 'the head')), // listen to the head — it cannot answer
  zanaProva: L(w('tund'), wf('gur', 'gurin', 'the stone')), // rock the stone — you cannot
  zanaProva2: L(w('sheh'), wf('djep', 'djepin', 'the cradle')), // see the cradle — none here
  zanaFole: L(w('degjo'), wf('peme', 'pemën', 'tree')), // listen to the tree — it cannot speak
  foleShpetuar: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  tomorProva: L(w('degjo'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // listen to the thunderbolt — it cannot speak
  tomorStuhi: L(w('lufto'), wf('ere', 'erën', 'wind')), // fight the wind — you cannot
  ngjitja1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  ngjitja2: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  ngjitja3: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  udhetimi1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  udhetimi2: L(w('hap'), wf('dash', 'dashin', 'the ram')), // open the ram — you cannot
  bukuraThellesi: L(w('merr'), wf('uje', 'ujin', 'the water')), // take the water — the she-dragon holds it
  pusiThate: L(w('degjo'), wf('pus', 'pusin', 'the well')), // listen to the well — it cannot speak
  fshatiJeta: L(w('bej'), wf('dhi', 'dhinë', 'the goat')), // make the goat — you cannot
  shtojzovalle2: L(w('jep'), wf('lot', 'lotët', 'the tears')), // give the tears — you cannot
  udhetaret: L(w('degjo'), wf('shtepi', 'shtëpinë', 'the house')), // listen to the house — none here
  tregMal: L(w('degjo'), wf('shtepi', 'shtëpinë', 'the house')), // listen to the house — none here
  tregDet: L(w('degjo'), wf('det', 'detin', 'the sea')), // listen to the sea — it cannot speak
  tregMujo: L(w('lufto'), wf('lahute', 'lahutën', 'the lute')), // fight the lute — you cannot
  lahuta1: L(w('degjo'), wf('koke', 'kokën', 'the head')), // listen to the head — it does not sing
  kafeja1: L(w('degjo'), wf('kafe', 'kafen', 'the coffee')), // listen to the coffee — it cannot answer
  dasma1: L(w('kendo'), w('kale')), // sing the horse — you cannot sing a horse
  shpellaRruget: L(w('shko'), wf('ne', 'në', 'in'), w('pishtar')), // take the darkness — you cannot
  djepi3: L(w('merr'), w('fund')), // take the end — it is not a thing to carry
  skender1: L(w('degjo'), wf('armik', 'armikun', 'the enemy')), // listen to the enemy — a tale, not here
  skender2: L(w('degjo'), wf('dhi', 'dhitë', 'the goats')), // listen to the goats — a tale, not here
  burrnesha1: L(w('degjo'), wf('arme', 'armën', 'the weapon')), // listen to the weapon — it cannot speak
  tregDragua: L(w('vrit'), wf('shtepi', 'shtëpinë', 'the house')), // kill the house — none here
  qilim: L(w('degjo'), wf('diell', 'diellin', 'the Sun')), // listen to the Sun — it cannot answer
  gjysmegjel2: L(w('ha'), wf('mbret', 'mbretin', 'the king')), // eat the king — you cannot
  fshatiBesa: L(w('vrit'), wf('uje', 'ujin', 'the water')), // kill the water — you cannot
  udheNate: L(w('jep'), wf('shtepi', 'shtëpinë', 'the house')), // give the house — you cannot
  udheLugat: L(w('sheh'), wf('zjarr', 'zjarrin', 'the fire')), // see the fire — none here
  udheOra: L(w('jep'), wf('dite', 'ditën', 'the day')), // give the day — you cannot
  kalaVllezer: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  kalaBesa: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  kalaRozafa: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  kulshLufte1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  kulshLufte2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  springReturn: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  bukuraKthim: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  udhaThate: L(w('degjo'), wf('toke', 'tokën', 'the ground')), // listen to the ground — it cannot speak
  udhaSyri: L(w('pi'), wf('zjarr', 'zjarrin', 'the fire')), // drink the fire — you cannot
  uraFshaj: L(w('kthehu'), wf('ne', 'në', 'in'), w('gur')), // return into the stone — you cannot
  maliStuhi: L(w('godit'), wf('ere', 'erën', 'wind')), // strike the wind — you cannot
  zbritjaThelle: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  qeniGate: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  majaEagle: L(w('degjo'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // listen to the thunderbolt — none here
  tomorBekim: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  tomorZbritje: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo+malin — impossible
  zanaFuqi: L(w('pi'), wf('gur', 'gurin', 'the stone')), // drink the stone
  pusiThelle: L(w('pi'), wellAcc()), //             drink the well
  ujiShpella: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  ktheu1: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  ktheu3: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  ktheu2: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  bukuraLirim: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — none here
  kalaBuna: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  kalaGji: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  kalaMilk: L(w('lufto'), wf('qumesht', 'qumështin', 'the milk')), // fight the milk
  shqipe1: L(w('degjo'), wf('peme', 'pemën', 'tree')), // listen to the tree — it cannot speak
  shqipe2: L(w('degjo'), wf('fole', 'folenë', 'the nest')), // listen to the nest — it cannot speak
  shqipe3: L(w('merr'), wf('ar', 'arin', 'the gold')), // take gold — none in the nest
  shpirag1: L(w('degjo'), wf('rrufe', 'rrufenë', 'the thunderbolt')), // listen to the thunderbolt — you cannot (all words already discovered)
  dhia1: L(w('merr'), wf('fuqi', 'fuqinë', 'the power')), // take the power — it is hidden in the goat, not yours to grab
  kostandin1: L(w('premto'), wf('rruge', 'rrugën', 'the road')), // swear the road — none here
  kostandin3: L(w('degjo'), wf('lot', 'lotët', 'the tears')), // listen to the tears — you cannot
  gjizar2: L(w('kerko'), wf('xhami', 'xhaminë', 'the mosque')), // seek the mosque — the bird is the goal
  gjarperBurr1: L(w('ngjit'), wf('gjarper', 'gjarprin', 'the serpent')), // climb the serpent — you cannot
  gjarperBurr2: L(w('kerko'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // seek the she-dragon — it is not what you seek
  sari1: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  sari2: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  bijaHene1: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  agaYmer1: L(w('degjo'), wf('burg', 'burgun', 'the prison')), // listen to the prison — it cannot speak
  agaYmer2: L(w('degjo'), wf('bese', 'besën', 'the besa')), // listen to the besa — you cannot
  // --- the LEK economy vignettes ---
  blerjaBuke: L(w('jep'), wf('tregtar', 'tregtarin', 'the trader')), // give the trader (away) — you cannot
  shitjaCaj: L(w('kthehu'), wf('ne', 'në', 'to'), w('lek')), // return into the lek — absurd
  blerjaLahuta: L(w('merr'), wf('tregtar', 'tregtarin', 'the trader')), // take the trader — you cannot
  gjumiBujtina: L(w('jep'), w('agim')), // give the dawn — you cannot
  sherimiBar: L(w('merr'), wf('sherues', 'shëruesin', 'the healer')), // take the healer — you cannot
  cajMali1: L(w('merr'), wf('tregtar', 'tregtarin', 'the trader')), // take the trader — he is not here
  punaMulli: L(w('jep'), wf('plak', 'plakun', 'the old man')), // give the old man (away) — you cannot
  punaBariu: L(w('jep'), wf('bari', 'bariun', 'the shepherd')), // give the shepherd (away) — you cannot
  kengaLahute: L(w('jep'), w('burra')), // give the men (away) — you cannot
}

// (3) a third distractor — another impossible action (open/take/fight a present
// thing, or fly), distinct from the other two for that node.
const CONFUSERS3 = {
  maliHumbur: L(w('kthehu'), wf('re', 'renë', 'the cloud')), // return to the cloud — you cannot
  lumiHumbur: L(w('kthehu'), wf('uje', 'ujin', 'the water')), // return to the water — you cannot
  botaHumbur: L(w('degjo'), wf('bote', 'botën', 'the world')), // listen to the world — it cannot answer
  // village river & church quarters
  fshatiLumi: L(w('merr'), wf('mulli', 'mullirin', 'the mill')), // take the mill — you cannot
  tabaket1: L(w('fol'), w('me'), wf('lekure', 'lëkurën', 'the leather')), // speak with the leather — it cannot answer
  uraArtes2: L(w('degjo'), wf('buke', 'bukën', 'the bread')), // listen to the bread — it has nothing to say
  kisha1: L(w('jep'), wf('dere', 'derën', 'the door')), // give the door — you cannot
  udhekryq: L(w('ngjit'), wf('fshat', 'fshatin', 'the village')), // climb the village — you cannot
  qiell1: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  qiell2: L(w('jep'), wf('toke', 'tokën', 'the ground')), // give the ground — none here
  qiellDem1: L(w('ngjit'), wf('plak', 'plakun', 'the old man')), // climb the old man — you cannot
  detiThelle1: L(w('lufto'), w('kala')), // fight the castle — you cannot
  detiThelle2: L(w('degjo'), wf('det', 'detin', 'the sea')), // listen to the sea — it cannot answer
  jutbina: L(w('sheh'), wf('kulle', 'kullën', 'the tower')), // see the tower — none here
  qiellErera1: L(w('lufto'), wf('maja', 'majën', 'the summit')), // lufto the summit — you cannot
  qiellErera2: L(w('sheh'), wf('bresher', 'breshrin', 'the hail')), // see the hail — none here
  qiellPrende: L(w('jep'), wf('toke', 'tokën', 'the ground')), // give the ground — none here
  qiellDiell: L(w('kerko'), wf('plak', 'plakun', 'the old man')), // search for the old man — none here
  plaka: L(w('merr'), wf('uje', 'ujin', 'the water')), // take the water — none here
  udhetaret: L(w('degjo'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), // listen in the village — none here
  tregMal: L(w('ngjit'), wf('dem', 'demin', 'the bull')), // climb the bull — you cannot
  tregDet: L(w('merr'), wf('udhetar', 'udhëtarin', 'the traveller')), // take the traveller — none here
  tregMujo: L(w('degjo'), wf('shtepi', 'shtëpinë', 'the house')), // listen to the house — none here
  lahuta1: L(w('luan'), wf('koke', 'kokën', 'the head')), // play the head — it is no instrument
  kafeja1: L(w('bej'), w('nje'), w('fat')), // make a fate — you cannot
  dasma1: L(w('shiko'), w('sot')), // look at today — it is not a thing to see
  shpellaRruget: L(w('shko'), wf('ne', 'në', 'in'), w('tre'), wf('rruge', 'rrugë', 'roads')), // take three roads at once — you cannot
  djepi3: L(w('jep'), w('fund'), wf('ora', 'Orave', 'to the Fates')), // give the end to the Fates — it is theirs already
  skender1: L(w('vjen'), w('me'), w('mije'), w('burra')), // come with a thousand men — you have none
  skender2: L(w('sheh'), wf('armik', 'armikun', 'the enemy')), // see the enemy — a tale, not here
  burrnesha1: L(w('premto'), wf('arme', 'armën', 'the weapon')), // swear to the weapon — it cannot hear a besa
  tregDragua: L(w('degjo'), wf('dragua', 'dragoin', 'the dragon')), // listen to the dragon — only spoken of, not here to answer
  fshatiDil: L(w('fol'), w('me'), wf('gjak', 'gjakun', 'the blood')), // speak with the blood — it cannot answer
  pylli1: L(w('fol'), w('me'), wf('arushe', 'arushën', 'the bear')), // speak with the bear — it cannot answer
  pylliThelle: L(w('lufto'), wf('naten', 'natën', 'the night')), // fight the night — you cannot
  lumi: L(w('fle'), wf('ne', 'në', 'on'), wf('maja', 'majën', 'the summit')), // sleep on the summit — none here
  zanaQumesht: L(w('merr'), wf('djep', 'djepin', 'the cradle')), // take the cradle — none here
  zanaKripe: L(w('merr'), wf('djep', 'djepin', 'the cradle')), // take the cradle — it stayed on the trial stone
  zanaPende: L(w('pi'), wf('pende', 'pendën', 'the feather')), // drink the feather
  rrethi: L(w('tund'), wf('djep', 'djepin', 'the cradle')), // rock the cradle — none here
  mali1: L(w('fol'), w('me'), wf('mal', 'malin', 'the mountain')), // speak with the mountain — it cannot answer
  mali2: L(w('lufto'), wf('gur', 'gurin', 'the stone')), // fight the stone
  maja: L(w('degjo'), wf('ere', 'erën', 'wind')), // listen to the wind — none here
  tomor1: L(w('prit'), wf('plak', 'plakun', 'the old man')), // wait for the old man — none here
  tomor2: L(w('merr'), wf('ere', 'erën', 'wind')), // take the wind — none here
  tomor3: L(w('degjo'), wf('koke', 'kokën', 'the head')), // listen to the head — it cannot speak
  pusi: L(w('merr'), wf('bote', 'botën', 'the world')), // take the world — you cannot
  zbritja: L(w('merr'), wellAcc()), //              take the well
  bota1: L(w('degjo'), wf('bote', 'botën', 'the world')), // listen to the world — it cannot answer
  bota2: L(w('degjo'), wf('uje', 'ujin', 'the water')), // listen to the water — it cannot answer
  bukura1: L(w('hap'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // open the she-dragon — you cannot
  bukura2: L(w('hap'), wf('bukura', 'Bukurën', 'the Beauty')), // open the Beauty — you cannot
  kulshedra1: L(w('degjo'), wf('zjarr', 'zjarrin', 'the fire')), // listen to the fire — it cannot answer
  fitorja: L(w('lufto'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // fight the she-dragon — it is already dead
  pusi2: L(w('degjo'), wf('pus', 'pusin', 'the well')), // listen to the well — it cannot answer
  shqiponja1: L(w('hap'), wf('mish', 'mishin', 'the meat')), // open the meat — you cannot
  siperfaqja: L(w('degjo'), wf('rruge', 'rrugën', 'the road')), // listen to the road — it cannot answer
  kala1: L(w('degjo'), wf('mur', 'murin', 'the wall')), // listen to the wall — it cannot answer
  kala2: L(w('degjo'), wf('mur', 'murin', 'the wall')), // listen to the wall — it cannot answer
  ura: L(w('kalo'), wf('plak', 'plakun', 'the old man')), // cross the old man — he is not a bridge
  dera: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  sprova: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  gjarpri: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  uji: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  kthimi: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
  udhaKthimit: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  shtrigaNate: L(w('hidh'), wf('zjarr', 'zjarrin', 'the fire')), // throw the fire — none here
  fshehur: L(w('degjo'), wf('qytet', 'qytetin', 'the city')), // listen to the city — it cannot answer
  shpellaHyrje: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot answer (unreachable in the dark)
  qyteti: L(w('degjo'), wf('mish', 'mishin', 'the meat')), // listen to the meat — it cannot answer
  rene: L(w('hap'), wf('det', 'detin', 'the sea')), // open the sea — you cannot
  tre1: L(w('merr'), wf('shtepi', 'shtëpinë', 'the house')), // take the house — you cannot carry it
  tre2: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
  tre3: L(w('hap'), wf('bukura', 'Bukurën', 'the Beauty')), // open the Beauty — you cannot
  balozMotra: L(w('jep'), wf('det', 'detin', 'the sea')), // give the sea — you cannot
  balozZgjedh: L(w('jep'), wf('uje', 'ujin', 'the water')), // give the water — none here
  balozLufte: L(w('degjo'), wf('baloz', 'balozin', 'the sea-monster')), // listen to the sea-monster — it only threatens
  balozKoke: L(w('jep'), wf('baloz', 'balozin', 'the sea-monster')), // give the sea-monster — it is dead
  // --- survival-core vignettes (listen-to X: X cannot answer) ---
  sheshi: L(w('degjo'), wf('dere', 'derën', 'the door')), // listen to the door — it cannot answer
  tregtari: L(w('degjo'), w('lek')), // listen to the lek (coin) — it cannot answer
  tregtari2: L(w('degjo'), w('problem')), // listen to the problem — it cannot answer
  bujtina: L(w('degjo'), wf('celes', 'çelësin', 'the key')), // listen to the key — it cannot answer
  sheruesi: L(w('degjo'), wf('dhimbje', 'dhimbjen', 'the pain')), // listen to the pain — it cannot answer
  udhetariHuaj: L(w('degjo'), w('njezet')), // listen to twenty — absurd
  // --- the LEK economy vignettes ---
  blerjaBuke: L(w('kthehu'), wf('ne', 'në', 'to'), w('buke')), // return into the bread — absurd
  shitjaCaj: L(w('jep'), wf('tregtar', 'tregtarin', 'the trader')), // give the trader (away) — you cannot
  blerjaLahuta: L(w('blej'), wf('tregtar', 'tregtarin', 'the trader')), // buy the trader — you cannot
  gjumiBujtina: L(w('fle'), wf('ne', 'në', 'in'), w('lek')), // sleep in the lek — absurd
  sherimiBar: L(w('pi'), wf('sherues', 'shëruesin', 'the healer')), // drink the healer — absurd
  cajMali1: L(w('kthehu'), wf('ne', 'në', 'to'), w('caj')), // return into the tea — absurd
  punaMulli: L(w('mban'), wf('plak', 'plakun', 'the old man')), // carry the old man — you cannot
  punaBariu: L(w('ha'), wf('dhi', 'dhitë', 'the goats')), // eat the goats — you cannot
  kengaLahute: L(w('degjo'), w('dhjete')), // listen to ten — absurd
  udhaShenja: L(w('degjo'), wf('harte', 'hartën', 'the map')), // listen to the map — it cannot answer
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
  // --- MONEY — the lek. `currency: true` keeps it out of the "ti ke një X"
  // carry-line (a count, not a thing); the topbar shows the 🪙 purse instead.
  // Earned with work (the mill, the flock, mountain tea, a song on the lahuta),
  // spent at the market, the inn, the healer — an option's `lek: <n>` moves it.
  lek: {
    id: 'lek', icon: '🪙', name: 'Lek', al: 'lek', word: 'lek', currency: true,
    blurb: 'The coin of the country — named, the old people like to say, for Leka i Madh, Alexander the Great himself. Bread is five, a bed is twenty, and every lek of it is earned: the mill pays, the shepherd pays, the trader pays good money for mountain tea, and a song on the lahuta fills the cap.',
  },
  cajMali: {
    id: 'cajMali', icon: '🌿', name: 'Mountain tea', al: 'çaj mali', word: 'caj',
    blurb: 'Çaj mali — ironwort, the wild mountain tea of the high slopes, picked in the sun and dried in bundles. Every Albanian house brews it against colds and long winters, and the trader in the dead city pays ten lek a bundle for it.',
  },
  lahute: {
    id: 'lahute', icon: '🪕', name: 'Lahuta', al: 'lahutë', word: 'lahute',
    blurb: 'The one-stringed fiddle of the highland bards — carved from a single piece of maple, played on the knee while the lahutar half-sings, half-cries the songs of Muji and Halili. Sing with it where travellers rest and the listeners will pay a singer’s due.',
  },
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
    blurb: 'The mountain fairy’s milk. As the Zanas suckled the hero Mujo to make him stronger than a drangue, it has put a hero’s strength in you — enough to grapple even the Kulshedra bare-handed.',
  },
  bekim: {
    id: 'bekim',
    icon: '✨',
    name: "the Ora's blessing",
    al: 'bekim',
    blurb: 'The blessing of the Ora you fed at your night-fire. A guest is sent by God, and the besa to feed a stranger is sacred above all — so the fate-spirit put her own strength in you, enough to meet even the Kulshedra bare-handed.',
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
  dem: {
    id: 'dem', icon: '🐂', name: 'White bull', al: 'dem',
    blurb: 'The white bull, the offering the pilgrims still lead to the summit of Tomorr. It is the oldest gift the sky-father Zojz is owed — give it on the peak and no pride of yours will draw his thunderbolt.',
  },
  gur: {
    id: 'gur', icon: '🪨', name: 'Thunder-stone', al: 'gur',
    blurb: 'A stone from the storm where a Drangue fought. Hurled at the Kulshedra, it strikes like lightning — a hidden ending.',
  },
  pishtar: {
    id: 'pishtar', icon: '🔦', name: 'Torch', al: 'pishtar',
    blurb: 'A brand pulled from the big campfire in the forest clearing. The drowned cavern under the well is pitch dark — this is the only light that walks with you.',
  },
  kripe: {
    id: 'kripe', icon: '🧂', name: 'Salt', al: 'kripë',
    blurb: 'The Zana’s salt. Thrown in the Kulshedra’s many eyes, it blinds the she-dragon.',
  },
  mish: {
    id: 'mish', icon: '🍖', name: 'Meat', al: 'mish',
    blurb: 'Meat from the Kulshedra’s larder. The eagle will only carry you up if it is fed.',
  },
  // companions — tracked like items, but they walk WITH you: they render as their own
  // story line ("ti dhe ujku") instead of "you have a X", and an option can gate on
  // them with requires:'<id>'. No `use` — you never spend a companion.
  ujk: {
    id: 'ujk', icon: '🐺', name: 'Wolf', al: 'ujku', word: 'ujk', companion: true,
    blurb: 'The wolf you shared your bread with — but the old people say a wolf may be a drangue in disguise, one of the storm-heroes hidden in beast-shape. It walks at your side now, and the bread you broke with it binds a besa deeper than the drought.',
  },
  shqiponja: {
    id: 'shqiponja', icon: '🦅', name: 'Eagle', al: 'shqiponja', word: 'shqiponje', companion: true,
    blurb: 'The great eagle whose chicks you saved from the nest-serpent. By the old law of the grateful beast it owes you its wings — trapped at the bottom of the world, call and it will come, as it bore the Scurfhead up out of the underworld.',
  },
  vajza: {
    id: 'vajza', icon: '👧', name: 'Maiden', al: 'vajza', word: 'vajze', companion: true,
    blurb: 'The queen’s daughter, promised to the Sun and carried home on a stag’s antlers. She walks beside you now — take her to the black palace and let her knock on her mother’s door.',
  },
  ora: {
    id: 'ora', icon: '✨', name: 'Ora', al: 'Ora', word: 'ora', companion: true,
    blurb: 'Your Ora — the fate-spirit born with you, e Bardha, the White One. Unseen, she walks at your side and turns aside what would harm you. Every Albanian is born with an Ora; few ever see their own. You braved the Lugat’s night, and yours stepped into the light to walk with you.',
  },
}

// All distinct sense ids that actually appear in the story (for practice pool).
export const ALL_SENSE_IDS = (() => {
  const ids = new Set()
  for (const node of Object.values(STORY)) {
    for (const e of node.text) for (const t of lineOf(e)) if (t.id) ids.add(t.id)
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
    for (const e of node.text) for (const t of lineOf(e)) add(t)
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
// FORMS ("endings" drill) — a word's declension is authored once as DICT[id].forms
// (see `wf` guard above). Each form is { al, tag, gloss }: the inflected surface, a
// grammatical role from FORM_TAGS, and a PRECISE English gloss (finer than the
// story's smoothed one) used as an answer option when the player drills what the
// ending does. The lemma (indefNom) row is always present.
// ---------------------------------------------------------------------------
export const FORM_TAGS = {
  indefNom: 'a … (subject)',
  indefAcc: 'a … (object)',
  defNom: 'the … (subject)',
  defAcc: 'the … (object)',
  defDat: 'to/of the …',
  plIndef: 'plural',
  plDef: 'the … (plural)',
  plDat: 'to/of the … (plural)',
}

// FORM_FREQ[id] -> Map<surface(lower), count>: how often each surface of a sense
// actually appears across the same corpus STEMS walks (story text/options + item
// use-phrases). Endings mode uses this to drill the forms a word takes OFTEN,
// rather than a full paradigm the story never uses.
export const FORM_FREQ = (() => {
  const counts = {}
  const add = (t) => {
    if (!t.id) return
    ;(counts[t.id] ||= new Map())
    const k = t.al.toLowerCase()
    counts[t.id].set(k, (counts[t.id].get(k) || 0) + 1)
  }
  for (const node of Object.values(STORY)) {
    for (const e of node.text) for (const t of lineOf(e)) add(t)
    for (const opt of node.options) for (const t of opt.text) add(t)
  }
  for (const item of Object.values(ITEMS)) if (item.use) for (const t of item.use.phrase) add(t)
  return counts
})()

// The forms of `id` worth drilling: every inflected form that actually appears in
// the story (count ≥ min), richest-first, capped — PLUS the lemma (indefNom) row,
// which is always included so the core "a X" vs "the X" contrast is always teachable
// even though the story leans almost entirely on definite forms. Returns [] if the
// word has no forms table.
export function frequentForms(id, { min = 1, cap = 5 } = {}) {
  const forms = DICT[id]?.forms
  if (!forms) return []
  const freq = FORM_FREQ[id]
  const lemma = DICT[id].al.toLowerCase()
  const isLemma = (f) => f.al.toLowerCase() === lemma
  const inflected = forms
    .filter((f) => !isLemma(f))
    .map((f) => ({ ...f, count: freq?.get(f.al.toLowerCase()) || 0 }))
    .filter((f) => f.count >= min)
    .sort((a, b) => b.count - a.count)
    .slice(0, cap)
  const lemmaRow = forms.find(isLemma)
  return lemmaRow
    ? [{ ...lemmaRow, count: freq?.get(lemma) || 0 }, ...inflected]
    : inflected
}

// ---------------------------------------------------------------------------
// DEFS — a short Albanian "definition" (really an illustrative phrase) for each
// sense. Rendered with the same Token logic as the story, so any word inside a
// definition that you haven't discovered yet shows as its English gloss.
// Built from story-validated phrasings to keep the Albanian grammar correct.
// ---------------------------------------------------------------------------
export const DEFS = {
  // --- words of the verbatim folk-quotes ---
  shqiptar: L(w('nje'), w('njeri'), w('nga'), w('ky'), w('vend')), // a person from this land
  shkimet: L(w('nje'), w('drite'), w('vdes')), //       a light dies (Gheg: = shuhet)
  mplaket: L(w('behet'), w('plak')), //                 becomes an old man
  trashegohet: L(wf('familje', 'familja', 'the family'), w('vazhdon'), w('me'), wf('femije', 'fëmijë', 'children')), // the family continues with children
  lan: L(wf('merr', 'merr', 'takes'), wf('pluhur', 'pluhurin', 'the dust'), w('me'), w('uje')), // takes the dust with water
  dem_harm: L(w('nje'), w('gje'), w('e_art'), wf('keq', 'keqe', 'bad')), // a thing the bad
  eshtra: L(wf('si', 'si', 'as'), wf('gur', 'gurë', 'stones'), w('brenda'), wf('njeri', 'njeriut', 'the person')), // as stones inside the person
  thyen: L(wf('bej', 'bën', 'makes'), w('dy'), w('nga'), wf('nje', 'një', 'one')), // makes two from one
  leh: L(wf('qen', 'qeni', 'the dog'), w('flet')), //   the dog speaks (barks)
  kafshon: L(wf('merr', 'merr', 'takes'), wf('forte', 'fort', 'hard'), w('me'), w('goje')), // takes hard with mouth
  durim: L(w('kur'), wf('prit', 'pret', 'waits'), wf('shume', 'shumë', 'much'), w('dhe'), wf('rri', 'rri', 'stays'), w('qete')), // when waits much and stays calm
  vonon: L(w('vjen'), w('vone')),                       // comes late
  harron: L(w('nuk'), w('e_obj'), w('mban'), w('ne'), w('koke')), // not it keeps in head
  udhe: L(w('nje'), w('rruge')), //                     a road (= rrugë)
  mbare: L(w('kur'), wf('pune', 'puna', 'the work'), wf('shko', 'shkon', 'goes'), wf('mire', 'mirë', 'well')), // when the work goes well
  me_obj: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('per'), w('mua')), // a word the small for me
  plumb: L(wf('dil', 'del', 'comes out'), w('nga'), wf('arme', 'arma', 'the weapon'), w('dhe'), wf('vrit', 'vret', 'kills')), // comes out from the weapon and kills
  piqet: L(w('nje'), w('njeri'), w('gjen'), w('nje'), w('njeri')), // one person finds another (meets)
  dylle: L(w('nje'), w('gje'), w('nga'), w('bleta'), w('per'), w('drite')), // a bee-thing for light (candle wax)
  mjalte: L(w('nje'), w('gje'), w('nga'), w('bleta'), w('qe'), w('ti'), wf('ha', 'ha', 'eat')), // a thing from bee that you eat
  rron: L(wf('jeto', 'jeton', 'lives')),                // lives
  pluhur: L(w('toke'), wf('ne', 'në', 'in'), w('ere')), // earth in the wind (dust)
  are: L(w('toke'), w('qe'), wf('jep', 'jep', 'gives'), w('buke')), // ground that gives bread
  tona: L(w('tone')),                                   // our
  perralle: L(w('nje'), w('gje'), w('qe'), wf('plake', 'plaka', 'the old woman'), wf('tregoj', 'tregon', 'tells')), // a thing the old woman tells
  shendet: L(w('kur'), w('nuk'), w('je'), w('i_art'), w('semur')), // when not are the sick
  djathte: L(wf('krah', 'krahu', 'arm'), w('qe'), w('nuk'), w('eshte'), w('majtas')), // arm that not is left
  lumte: L(wf('thote', 'thua', 'you say'), w('kur'), w('dikush'), wf('bej', 'bën', 'does'), wf('shume', 'shumë', 'very'), wf('mire', 'mirë', 'well')), // you say when someone does very well
  tabak: L(w('nje'), w('njeri'), w('qe'), w('punon'), w('me'), w('lekure')), // a person that works with leather
  lekure: L(w('nje'), w('gje'), w('nga'), wf('nje', 'një', 'an'), w('kafshe'), w('per'), wf('rrobe', 'rroba', 'clothes')), // a thing from an animal for clothes
  udhekryq: L(w('ku'), wf('piqet', 'piqen', 'meet'), wf('rruge', 'rrugët', 'the roads')), // where meet the roads
  vatra: L(wf('vend', 'vendi', 'the place'), w('i_link'), wf('zjarr', 'zjarrit', 'the fire'), w('ne'), w('shtepi')), // the place of the fire in house
  qilim: L(w('nje'), w('gje'), w('e_art'), w('bukur'), w('mbi'), w('toke'), w('ne'), w('shtepi')), // a thing the beautiful over ground in house
  jutbina: L(w('nje'), w('vend'), w('ku'), wf('rri', 'rri', 'stays'), w('mujo')), // a place where stays Mujo
  qytet: L(w('nje'), w('vend'), w('i_art'), w('madh'), w('me'), w('shume'), wf('shtepi', 'shtëpi', 'houses')), // a place the big with many houses
  treg: L(w('nje'), w('vend'), w('ku'), wf('njeri', 'njerëzit', 'the people'), wf('blej', 'blejnë', 'buy'), w('dhe'), wf('shes', 'shesin', 'sell')), // a place where the people buy and sell
  pishtar: L(w('zjarr'), w('mbi'), w('dru'), w('per'), w('drite')), // fire over wood for light
  // --- the Sky realm ---
  qiell: L(w('ku'), wf('rri', 'rri', 'stays'), wf('diell', 'dielli', 'the sun')), // where stays the sun
  zojz: L(w('nje'), w('perendi'), w('e_link'), wf('qiell', 'qiellit', 'the sky')), // a god of the sky
  dem: L(w('nje'), w('kafshe'), w('e_art'), w('forte'), w('me'), w('bri')), // a animal the strong with horn
  mekat: L(w('nje'), w('pune'), w('e_art'), wf('keq', 'keqe', 'bad'), w('para'), wf('perendi', 'Perëndisë', 'God')), // a work the bad before God
  shenjte: L(w('i_link'), wf('perendi', 'Perëndisë', 'God')), // of God
  mjeker: L(w('flok'), wf('ne', 'në', 'on'), w('fytyre')), // hair on face
  fal: L(w('harron'), wf('te_link', 'të', 'the'), wf('keq', 'keqen', 'bad')), // forgets the bad
  krenar: L(w('me'), w('koke'), w('lart')),             // with head up
  bari: L(w('nje'), w('njeri'), w('qe'), w('ruan'), wf('dhi', 'dhitë', 'the goats')), // a person that guards the goats
  maja: L(wf('vend', 'vendi', 'the place'), wf('me_more', 'më', 'most'), w('i_art'), wf('lart', 'lartë', 'high'), wf('ne', 'në', 'on'), w('mal')), // the place most the high on mountain
  mbyll: L(w('jo'), w('hap')), //                      not open
  oda: L(w('nje'), w('dhome'), w('per'), wf('mik', 'miq', 'guest')), // a room for guest
  kulle: L(w('nje'), w('shtepi'), w('e_art'), wf('lart', 'lartë', 'high'), w('me'), wf('gur', 'gurë', 'stones')), // a house the high with stones
  thelle: L(wf('shume', 'shumë', 'very'), wf('poshte', 'poshtë', 'down')), // very down
  flok: L(wf('si', 'si', 'as'), wf('pende', 'pendë', 'feathers'), w('mbi'), w('koke')), // as feathers over head
  shtojzovalle: L(w('nje'), w('zane'), w('qe'), wf('bej', 'bën', 'makes'), w('valle'), wf('naten', 'natën', 'at night')), // a fairy that makes round-dance at night
  valle: L(w('kur'), wf('njeri', 'njerëzit', 'the people'), wf('leviz', 'lëvizin', 'move'), w('bashke'), w('me'), w('kenge')), // when the people move together with song
  udhetar: L(w('nje'), w('njeri'), w('qe'), wf('ec', 'ecën', 'walks'), w('larg')), // a person that walks far
  gjysmegjel: L(w('nje'), wf('zog', 'zog', 'bird'), w('me'), wf('nje', 'një', 'one'), wf('kembe', 'këmbë', 'leg')), // a bird with one leg
  lahute: L(w('nje'), w('gje'), w('qe'), wf('bej', 'bën', 'makes'), wf('kenge', 'këngë', 'songs'), wf('per', 'për', 'about'), wf('trim', 'trima', 'heroes')), // a thing that makes songs about heroes
  // --- the village quarters (river & church) ---
  kishe: L(w('nje'), w('shtepi'), w('per'), w('perendi')), //   a house for god
  prift: L(w('nje'), w('njeri'), w('i_link'), wf('perendi', 'Perëndisë', 'God'), w('ne'), w('kishe')), // a person of God in church
  mjeshter: L(w('nje'), w('njeri'), w('qe'), wf('bej', 'bën', 'does'), w('pune'), wf('shume', 'shumë', 'very'), wf('mire', 'mirë', 'well')), // a person that does work very well
  mulli: L(w('nje'), w('shtepi'), w('qe'), wf('bej', 'bën', 'makes'), w('miell')), // a house that makes flour
  miell: L(w('nje'), w('gje'), w('e_art'), w('bardhe'), w('per'), w('buke')), // a thing the white for bread
  fushe: L(w('nje'), w('vend'), w('i_art'), w('madh'), w('me'), wf('bar', 'bar', 'grass')), // a place the big with grass
  punon: L(wf('bej', 'bën', 'does'), w('nje'), w('pune')), // does a work
  // pronouns / function words — defined by role or synonym
  ti: L(w('jo'), w('une'), w('por'), wf('njeri', 'njeriu', 'the person'), w('qe'), wf('degjo', 'dëgjon', 'listens')), // not I but the person that listens
  je: L(wf('si', 'si', 'as'), w('eshte'), w('por'), w('per'), wf('ti', 'ty', 'you')), // as is but for you
  eshte: L(w('je')), //                                are
  ne: L(w('brenda'), w('nje'), wf('vend', 'vendi', 'place')), // inside a place
  nje: L(w('jo'), w('dy'), w('jo'), w('tre')),          // not two not three
  dhe: L(w('bashke'), w('me')),                         // together with
  ka: L(w('ke')), //                                   have
  ke: L(w('ka')), //                                   has
  mund: L(w('ti'), w('ke'), w('fuqi'), w('per'), w('dicka')), // you have power for something
  te_link: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('para'), w('bukur')), // a word the small before beautiful
  te_subj: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('pas'), w('do_fut')), // a word the small after will
  i_art: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('per'), w('nje'), w('burre')), // a word the small for a man
  i_link: L(w('fjale'), w('e_art'), w('vogel'), w('qe'), w('thote'), w('kush'), w('e_obj'), w('ka')), // word the small that says who it has
  e_art: L(wf('fjale', 'fjala', 'the word'), w('para'), w('bukur')), // the word before beautiful
  e_link: L(w('nje'), w('fjale'), w('si'), w('i_link')), // a word how of
  e_obj: L(w('nje'), w('fjale'), w('si'), w('ta')),     // a word how it
  e_conj: L(w('dhe')),                                  // and
  do_fut: L(w('nje'), w('fjale'), w('per'), wf('kohe', 'kohën', 'the time'), w('qe'), w('vjen')), // a word for the time that comes

  // top-150 frequency fill — defined by role or simple synonym
  kohe: L(wf('dite', 'dita', 'the day'), w('dhe'), wf('naten', 'nata', 'the night')), // the day and the night
  ne_we: L(w('une'), w('dhe'), w('ti')), //            I and you
  me_more: L(wf('edhe', 'edhe', 'even'), w('shume')),   // even many
  disa: L(w('dy'), w('ose'), w('tre')),                 // two or three
  ndonje: L(w('ndoshta'), w('nje')), //                maybe one
  gjitha: L(wf('fjale', 'fjalë', 'a word'), w('per'), w('cdo'), w('gje'), w('bashke')), // a word for every thing together
  cdo: L(w('gjithe'), wf('nje', 'një', 'one'), wf('nga', 'nga', 'by'), wf('nje', 'një', 'one')), // all one by one
  pas: L(w('jo'), w('para')), //                       not before
  atehere: L(w('ne'), wf('ajo', 'atë', 'that'), w('kohe')), // in that time
  ndoshta: L(w('mbase')),                               // maybe
  shiko: L(w('sheh')), //                              see
  zoteri: L(w('fjale'), w('per'), w('nje'), w('burre')), // word for a man
  keto: L(wf('gje', 'gjërat', 'the things'), w('ketu')), // the things here
  ashtu: L(w('ne'), wf('ajo', 'atë', 'that'), w('menyre')), // in that way
  qene: L(w('eshte'), w('qe'), w('vjen'), w('pas'), w('ka')), // is that comes after has
  tuaj: L(w('te_link'), w('ju')),                       // of you
  tyre: L(w('e_link'), w('ata')), //                   of them
  saj: L(w('e_link'), w('ajo')), //                    of her
  yt: L(w('e_link'), w('ti')), //                      of you
  kaq: L(wf('sa', 'sa', 'as much as'), w('keto')),      // as much as these
  aty: L(w('jo'), w('ketu')), //                       not here
  zot: L(w('nje'), w('perendi')), //                   a god
  dreq: L(w('nje'), w('djall')),                        // a devil
  ma: L(w('per'), w('mua')),                            // for me
  vend: L(w('atje'), w('ku'), w('je'), w('ti')),        // there where are you
  shesh: L(w('nje'), w('vend'), wf('ne', 'në', 'in'), w('fshat')), // a place in the village (= the square)
  // top 151-200 frequency fill
  deri: L(w('nga'), w('tani'), wf('ne', 'në', 'to'), w('nje'), w('kohe'), w('tjeter')), // from now to a time other
  hajde: L(wf('vjen', 'eja', 'come'), w('ketu')),       // come here
  prej: L(w('nga')), //                                from
  ia: L(w('per'), wf('ai', 'atë', 'him')),              // for him
  aq: L(wf('sa', 'sa', 'as much as'), wf('ata', 'ata', 'them')), // as much as them
  sikur: L(wf('si', 'si', 'as'), w('kur')),             // as when
  gati: L(w('gjithcka'), w('eshte'), w('ne'), w('rregull')), // everything is in order
  gjithcka: L(w('cdo'), w('gje')),                      // every thing
  pune: L(w('gje'), w('qe'), wf('njeri', 'njeriu', 'the person'), wf('bej', 'bën', 'does')), // thing that the person does
  as: L(w('edhe'), w('jo')),                            // also not
  cka: L(w('cfare')), //                               what
  pastaj: L(w('pas'), w('kesaj')),                      // after this
  fund: L(w('ku'), w('dicka'), w('mbaroi')),            // where something ended
  thjesht: L(w('vetem')), //                           only
  akoma: L(w('ende')),                                  // yet
  here: L(w('kur'), w('dicka'), w('ndodh')),            // when something happens
  vertet: L(w('vertete')),                              // truly
  dikush: L(w('nje'), w('njeri')), //                  a person
  sigurisht: L(w('sigurt')), //                        sure(ly)
  epo: L(w('po_yes'), w('mire')),                       // yes good
  drejte: L(w('jo'), wf('gabim', 'gabim', 'a mistake')), // not a mistake
  asnje: L(w('jo'), wf('nje', 'një', 'one')),           // not one
  dashur: L(w('me'), w('dashuri')),                     // with love
  ndodh: L(w('behet')), //                             becomes (happens)
  nevoje: L(w('gje'), w('qe'), wf('duhet', 'duhet', 'is needed')), // thing that is needed
  // top 201-250 frequency fill
  juaj: L(w('e_link'), w('ju')), //                    of you
  pelqen: L(w('dicka'), w('eshte'), w('mire'), w('per'), wf('ti', 'ty', 'you')), // something is good for you
  gjithmone: L(w('cdo'), w('here')), //                every time
  mjaft: L(w('sa'), wf('duhet', 'duhet', 'is needed')), // how much is needed
  o: L(w('hej')), //                                   hey (o!)
  tone: L(w('nje'), w('fjale'), w('per'), wf('gje', 'gjërat', 'the things'), w('tona')), // a word for the things our
  perse: L(w('pse')),                                   // why
  gjate: L(w('per'), wf('shume', 'shumë', 'much'), w('kohe')), // for much time
  vete: L(w('jo'), w('dikush'), w('tjeter')),           // not someone other
  baba: L(w('nje'), w('burre'), w('qe'), w('ka'), w('femije')), // a man that has child
  shok: L(w('nje'), w('mik')), //                      a friend
  ende: L(w('akoma')), //                              still (yet)
  djale: L(w('nje'), w('femije'), w('qe'), w('behet'), w('burre')), // a child that becomes man
  vone: L(w('vjen'), w('pas'), wf('kohe', 'kohës', 'the time')), // comes after the time
  sapo: L(w('para'), w('pak'), wf('kohe', 'kohe', 'time')), // before a little time
  askush: L(w('asnje'), w('njeri')),                    // none person
  // top 251-300 frequency fill
  deshiron: L(w('do')), //                             wants (wishes)
  kujdes: L(w('shiko'), wf('mire', 'mirë', 'well'), wf('se', 'se', 'because'), w('ka'), w('rrezik')), // look well because has danger
  kuptoj: L(w('di'), w('cfare'), w('do'), w('te_subj'), wf('thote', 'thotë', 'say')), // know what wants to say
  problem: L(w('nje'), w('gje'), w('qe'), w('nuk'), wf('shko', 'shkon', 'goes'), wf('mire', 'mirë', 'well')), // a thing that not goes well
  ok: L(w('mire')), //                                 good (okay)
  fare: L(w('as'), w('pak')),                           // nor a little
  menyre: L(w('si'), w('behet'), w('nje'), w('gje')),   // how becomes a thing
  ndonjehere: L(w('ndonje'), w('here')), //            some time
  cili: L(w('kush'), w('nga'), w('keta')),              // who from these
  pershendetje: L(w('tung')),                           // hi
  mama: L(w('nje'), w('nene')), //                     a mother
  kesaj: L(w('ky')), //                                this
  rreth: L(w('ne'), w('cdo'), w('vend'), w('afer')),    // in every place near
  sonte: L(wf('ky', 'këtë', 'this'), wf('naten', 'natë', 'night')), // this night
  minuta: L(w('nje'), w('pjese'), w('e_art'), w('vogel'), w('e_link'), wf('ore', 'orës', 'the hour')), // a part the small of the hour
  neser: L(wf('dite', 'dita', 'the day'), w('tjeter'), w('pas'), wf('naten', 'natës', 'night')), // the day other after night
  fat: L(w('dicka'), w('e_art'), w('mire'), w('qe'), w('vjen')), // something the good that comes
  keta: L(w('shume'), wf('gje', 'gjëra', 'things'), w('ketu')), // many things here
  // top 301-350 frequency fill
  ca: L(w('disa')), //                                 some
  mend: L(w('brenda'), wf('koke', 'kokës', 'the head'), w('ku'), wf('mendoj', 'mendoj', 'I think')), // inside the head where I think
  dot: L(w('nuk'), w('mund')),                          // not can
  sic: L(w('ashtu'), wf('si', 'si', 'like')),           // so like
  dakord: L(w('po_yes')), //                           yes (agreed)
  lidhje: L(wf('ajo', 'ajo', 'that one'), w('qe'), w('mban'), w('dy'), wf('gje', 'gjëra', 'things'), w('bashke')), // that one that keeps two things together
  veshtire: L(w('jo'), w('lehte')),                     // not easy
  gjithashtu: L(w('edhe')),                             // also
  tille: L(wf('si', 'si', 'like'), w('ky')),            // like this
  frike: L(w('kur'), w('ka'), w('rrezik'), w('do'), w('te_subj'), wf('ik', 'ikësh', 'flee')), // when has danger wants to flee
  pjese: L(w('pak'), w('nga'), w('nje'), w('gje')),     // a little from a thing
  perpara: L(w('para')), //                            before (ahead)
  ore: L(w('nje'), w('pjese'), w('e_art'), w('vogel'), w('e_link'), wf('dite', 'ditës', 'the day')), // a part the small of the day
  // top 351-400 frequency fill
  tregoj: L(w('thote'), w('cfare'), w('ndodh')),        // says what happens
  mes: L(w('kur'), w('je'), w('me'), w('shume'), wf('njeri', 'njerëz', 'people')), // when are with many people
  lumtur: L(w('kur'), w('je'), wf('shume', 'shumë', 'very'), w('mire'), w('ne'), w('zemer')), // when are very good in heart
  tere: L(w('gjithe'), w('pa'), wf('asnje', 'asnjë', 'any'), w('pjese'), w('jashte')), // all without any part outside
  menjehere: L(w('tani'), w('pa'), wf('prit', 'pritur', 'waiting')), // now without waiting
  fakt: L(w('nje'), w('gje'), w('qe'), w('eshte'), w('e_art'), wf('vertete', 'vërtetë', 'true')), // a thing that is the true
  cmendur: L(w('pa'), w('mend'), w('ne'), w('koke')),   // without mind in head
  leviz: L(w('nuk'), w('rri'), w('ne'), wf('nje', 'një', 'one'), w('vend')), // not stay in one place
  pyetje: L(w('fjale'), w('kur'), wf('do', 'do', 'want'), w('te_subj'), wf('di', 'dish', 'know'), w('dicka')), // word when want to know something
  ide: L(w('nje'), w('gje'), w('e_art'), wf('ri', 're', 'new'), w('ne'), w('mend')), // a thing the new in mind
  mundesi: L(w('kur'), w('dicka'), w('mund'), w('te_subj'), wf('ndodh', 'ndodhë', 'happen')), // when something can to happen
  afer: L(w('jo'), w('larg')), //                      not far (near)
  derisa: L(w('deri'), w('ne'), wf('kohe', 'kohën', 'the time'), w('qe')), // until in the time that
  mbrapa: L(wf('pas', 'pas', 'behind'), w('jo'), w('perpara')), // behind not forward
  // top 401-450 frequency fill
  prandaj: L(w('pra')),                                 // so
  kujtoj: L(w('nuk'), wf('harron', 'harroj', 'forget')), // not forget
  shpresoj: L(w('dua'), w('qe'), w('dicka'), w('e_art'), w('mire'), w('te_subj'), wf('ndodh', 'ndodhë', 'happen')), // want that something the good to happen
  mbase: L(w('ndoshta')), //                           maybe
  nen: L(w('poshte')), //                              below (under)
  zonje: L(w('fjale'), w('e_art'), w('mire'), w('per'), w('nje'), w('grua')), // word the good for a woman
  ndalo: L(w('mos'), w('leviz')),                       // do not move
  lehte: L(w('jo'), w('veshtire')), //                 not difficult (easy)
  njoh: L(w('di'), w('kush'), w('eshte'), w('nje'), w('njeri')), // know who is a person
  duket: L(wf('sy', 'syri', 'the eye'), w('e_obj'), wf('sheh', 'sheh', 'sees'), w('keshtu')), // the eye it sees thus
  pasi: L(w('pas'), wf('kohe', 'kohës', 'the time'), w('qe'), w('dicka'), w('ndodh')), // after the time that something happens
  mengjes: L(wf('kohe', 'koha', 'the time'), w('pas'), wf('naten', 'natës', 'the night'), w('kur'), w('vjen'), wf('dite', 'dita', 'the day')), // the time after the night when comes the day
  pese: L(w('kater'), w('dhe'), wf('nje', 'një', 'one')), // four and one
  qetesohu: L(w('rri'), w('qete')), //                 stay calm
  drejt: L(w('perpara'), wf('as', 'as', 'neither'), w('majtas'), w('as'), w('djathtas')), // forward neither left nor right
  gabim: L(w('dicka'), w('qe'), w('nuk'), w('eshte'), w('e_art'), w('drejte')), // something that not is the right
  teper: L(w('me_more'), wf('shume', 'shumë', 'much'), wf('se', 'se', 'than'), w('mjaft')), // more much than enough
  he: L(w('epo')),                                      // well
  prapa: L(w('mbrapa')), //                            behind
  // top 451-500 frequency fill
  arme: L(w('nje'), w('gje'), w('per'), w('te_subj'), wf('lufto', 'luftuar', 'fight'), wf('si', 'si', 'like'), wf('shpate', 'shpata', 'the sword')), // a thing for to fight like the sword
  muaj: L(w('kater'), wf('jave', 'javë', 'weeks')),     // four weeks
  tung: L(w('pershendetje')),                           // hello
  lloj: L(w('si'), w('eshte'), w('nje'), w('gje')),     // how is a thing
  ketej: L(w('nga'), w('ketu')),                        // from here
  dashuri: L(w('kur'), wf('do', 'do', 'loves'), wf('shume', 'shumë', 'much'), w('nje'), w('njeri')), // when loves much a person
  rendesi: L(w('kur'), w('dicka'), w('eshte'), w('e_art'), wf('madh', 'madhe', 'big'), w('per'), wf('ne_we', 'ne', 'us')), // when something is the big for us
  kunder: L(wf('si', 'si', 'as'), w('armik'), w('jo'), wf('si', 'si', 'as'), w('mik')), // as enemy not as friend
  kater: L(w('tre'), w('dhe'), wf('nje', 'një', 'one')), // three and one
  pari: L(w('ai'), w('qe'), w('vjen'), w('para')),      // he that comes before
  jave: L(w('shtate'), wf('dite', 'ditë', 'days')),     // seven days
  vazhdo: L(w('mos'), w('ndalo')),                      // do not stop
  shpirt: L(wf('gje', 'gjëja', 'the thing'), w('brenda'), w('qe'), w('nuk'), w('vdes')), // the thing inside that not dies
  ulu: L(w('rri'), wf('poshte', 'poshtë', 'down')),     // stay down
  arsye: L(w('pse'), w('ndodh'), w('nje'), w('gje')),   // why happens a thing

  // nouns — a kind of thing
  pyll: L(w('nje'), w('vend'), w('me'), w('shume'), w('peme')), //   a place with many trees
  rruge: L(w('nje'), w('vend'), w('ku'), w('ti'), wf('ec', 'ecën', 'walk')), // a place where you walk
  shtepi: L(w('nje'), w('vend'), w('ku'), w('ti'), w('fle'), w('dhe'), wf('ha', 'ha', 'eat')), // a place where you sleep and eat
  dere: L(w('nje'), w('gje'), w('ne'), w('mur'), w('qe'), w('ti'), w('hap')), // a thing in wall that you open
  ujk: L(w('nje'), w('kafshe'), wf('si', 'si', 'like'), w('qen'), w('i_art'), w('madh'), w('ne'), w('pyll')), // a animal like dog the big in forest
  uje: L(w('nje'), w('leng'), w('ne'), w('lume'), w('dhe'), w('ne'), w('det')), // a liquid in river and in sea
  zjarr: L(w('nje'), w('gje'), w('e_art'), w('nxehte'), w('me'), w('flake'), w('dhe'), w('drite')), // a thing the hot with flame and light
  mik: L(w('nje'), w('njeri'), w('i_art'), w('mire'), w('jo'), w('armik')), // a person the good not enemy
  toke: L(w('nje'), w('vend'), w('nen'), wf('kembe', 'këmbë', 'feet')), // a place under feet
  naten: L(w('nje'), w('kohe'), w('pa'), w('diell'), w('kur'), w('ti'), w('fle')), // a time without sun when you sleep
  erresire: L(w('nje'), w('vend'), w('pa'), w('drite')), //         a place without light
  eliksir: L(w('nje'), w('leng'), w('qe'), w('jep'), w('fuqi')), // a liquid that gives power
  thesar: L(wf('shume', 'shumë', 'much'), w('ar'), w('dhe'), w('pasuri')), // much gold and wealth
  loja: L(w('nje'), w('gje'), w('qe'), w('ti'), w('luan')), //      a thing that you play

  // adjectives — a quality, often by its opposite
  madh: L(w('jo'), w('i_art'), w('vogel')), //         not small
  ri: L(w('jo'), w('i_art'), w('vjeter')), //          not old
  shpejt: L(w('jo'), w('ngadale')), //                 not slow
  erret: L(w('pa'), w('drite')), //                    without light
  sigurt: L(w('pa'), w('rrezik')), //                  without danger
  qete: L(w('pa'), w('zhurme')), //                    without noise
  uritur: L(w('do'), w('te_subj'), wf('ha', 'ha', 'eat'), w('ushqim')), // wants to eat food

  // verbs — the action, often by its opposite
  sheh: L(w('ti'), wf('gjen', 'gjen', 'find'), wf('gje', 'gjëra', 'things'), w('me'), w('sy')), // you find things with eyes
  ec: L(w('shko'), w('me'), w('kembe')),                // go with legs
  fle: L(w('rri'), w('ne'), w('shtrat'), wf('naten', 'natën', 'at night'), w('jo'), w('zgjuar')), // stay in bed at night not awake
  zgjohu: L(w('hap'), wf('sy', 'sytë', 'the eyes'), w('mos'), w('fle')), // open the eyes do not sleep
  hap: L(w('jo'), w('mbyll')), //                      not close
  ik: L(w('shko'), w('larg'), w('shpejt')),             // go far fast
  vjen: L(wf('ec', 'ecën', 'walks'), w('ketu'), w('nga'), w('larg')), // walks here from far
  rri: L(w('mos'), w('ik'), w('prit'), w('ketu')),      // do not flee wait here
  brenda: L(w('jo'), w('jashte')), //                  not outside
  jep: L(w('jo'), w('merr')), //                       not take
  merr: L(w('nuk'), w('jep'), w('por'), w('e_obj'), w('mban'), w('ne'), w('dore')), // not give but it keeps in hand
  pi: L(w('merr'), w('uje'), w('me'), w('goje')),       // take water with mouth
  ha: L(w('merr'), w('ushqim'), w('me'), w('goje')),    // take food with mouth
  behet: L(w('tani'), w('eshte'), w('dicka'), w('tjeter')), // now is something other
  gjen: L(wf('kerko', 'kërkon', 'searches'), w('dhe'), w('pastaj'), w('e_obj'), wf('sheh', 'sheh', 'sees')), // searches and then it sees
  humbet: L(w('nuk'), w('gjen'), wf('rruge', 'rrugën', 'the road')), // not finds the road
  ndiz: L(w('bej'), w('drite')), //                    make light
  kerko: L(w('shiko'), w('ketu'), w('dhe'), w('atje'), w('per'), w('dicka')), // look here and there for something
  mbaroi: L(w('nuk'), w('vazhdon'), w('me_more')),      // not continues more
  perseri: L(w('edhe'), wf('nje', 'një', 'one'), w('here')), // also one time
  ketu: L(w('ne'), wf('vend', 'vendin', 'the place'), w('ku'), w('ti'), w('je')), // in the place where you are

  // qualities used in the story
  vjeter: L(w('jo'), w('i_art'), w('ri')), //          not new
  drite: L(w('vjen'), w('nga'), wf('diell', 'dielli', 'the sun'), w('dhe'), w('nga'), wf('zjarr', 'zjarri', 'the fire')), // comes from the sun and from the fire
  sy: L(w('ti'), w('sheh'), w('me'), w('keta')),        // you see with these

  // journey places & actions
  lume: L(w('uje'), w('qe'), wf('shko', 'shkon', 'goes'), wf('ne', 'në', 'to'), w('det')), // water that goes to sea
  ure: L(w('nje'), w('rruge'), w('mbi'), w('nje'), w('lume')), // a road over a river
  mal: L(w('nje'), w('vend'), w('qe'), wf('shko', 'shkon', 'goes'), w('lart'), w('ne'), w('qiell')), // a place that goes up in sky
  shpelle: L(w('nje'), w('vend'), w('i_art'), w('erret'), w('brenda'), wf('mal', 'malit', 'the mountain')), // a place the dark inside the mountain
  plak: L(w('nje'), w('burre'), w('i_art'), w('vjeter')), // a man the old
  kalo: L(w('ec'), w('mbi'), w('nje'), w('ure')),       // walk over a bridge

  // === folklore vocabulary ===
  // characters & creatures
  fshat: L(w('nje'), w('vend'), w('i_art'), w('vogel'), w('me'), wf('pak', 'pak', 'few'), wf('shtepi', 'shtëpi', 'houses')), // a place the small with few houses
  plake: L(w('nje'), w('grua'), w('e_art'), w('vjeter')), // a woman the old
  kulshedra: L(w('nje'), w('gjarper'), w('i_art'), w('madh'), w('me'), w('shume'), wf('koke', 'koka', 'heads')), // a serpent the big with many heads
  zane: L(w('nje'), w('vajze'), w('e_art'), w('bukur'), w('e_link'), wf('mal', 'malit', 'the mountain')), // a maiden the beautiful of the mountain
  bukura: L(wf('vajze', 'vajza', 'the maiden'), wf('me_more', 'më', 'most'), w('e_art'), w('bukur'), w('e_link'), wf('bote', 'botës', 'the world')), // the maiden most the beautiful of the world
  dragua: L(w('nje'), w('trim'), w('me'), wf('krah', 'krahë', 'wings'), w('qe'), wf('lufto', 'lufton', 'fights'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // a hero with wings that fights the she-dragon
  trim: L(w('nje'), w('njeri'), w('pa'), w('frike'), w('qe'), wf('lufto', 'lufton', 'fights')), // a person without fear that fights
  shqiponje: L(w('nje'), wf('zog', 'zog', 'bird'), w('i_art'), w('madh'), w('qe'), wf('fluturo', 'fluturon', 'flies'), w('lart')), // a bird the big that flies up
  gjarper: L(w('nje'), w('kafshe'), w('pa'), w('kembe')), //       an animal without legs
  mbret: L(w('nje'), w('burre'), w('qe'), w('ka'), w('gjithe'), wf('vend', 'vendin', 'the land')), // a man that has all the land
  nene: L(w('nje'), w('grua'), w('me'), wf('femije', 'fëmijë', 'children')), // a woman with children
  femije: L(w('nje'), w('njeri'), w('i_art'), w('vogel')), //      a small person
  tomor: L(w('nje'), w('mal'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('shenjte')), // a mountain the big and the holy
  // places & things
  pus: L(w('nje'), w('vend'), w('i_art'), w('thelle'), w('me'), w('uje'), w('poshte')), // a place the deep with water below
  bote: L(w('gjithe'), wf('vend', 'vendet', 'the places'), w('dhe'), w('gjithe'), wf('njeri', 'njerëzit', 'the people')), // all the places and all the people
  kala: L(wf('shtepi', 'shtëpia', 'the house'), w('e_art'), wf('madh', 'madhe', 'big'), w('e_link'), wf('mbret', 'mbretit', 'the king'), w('me'), wf('mur', 'mure', 'walls')), // the house the big of the king with walls
  mur: L(w('nje'), w('gje'), w('me'), wf('gur', 'gurë', 'stones'), w('qe'), wf('mbyll', 'mbyll', 'closes'), w('nje'), w('vend')), // a thing with stones that closes a place
  koke: L(wf('pjese', 'pjesa', 'the part'), w('ku'), wf('rri', 'rrinë', 'stay'), wf('sy', 'sytë', 'the eyes'), w('dhe'), wf('goje', 'goja', 'the mouth')), // the part where stay the eyes and the mouth
  buke: L(w('ushqim'), w('qe'), wf('njeri', 'njeriu', 'the person'), w('ha'), w('cdo'), w('dite')), // food that the person eats every day
  mish: L(w('ushqim'), w('nga'), w('nje'), w('kafshe')), // food from a animal
  peshk: L(w('kafshe'), w('e_link'), wf('uje', 'ujit', 'the water'), w('pa'), w('kembe')), // animal of the water without legs
  qengj: L(wf('femije', 'fëmija', 'the child'), w('i_link'), wf('dash', 'dashit', 'the ram')), // the child of the ram
  kashte: L(w('bar'), w('i_art'), w('thate'), w('per'), wf('kafshe', 'kafshët', 'the animals')), // herb the dry for the animals
  kukull: L(w('nje'), w('gje'), wf('si', 'si', 'like'), w('njeri'), w('i_art'), w('vogel')), // a thing like person the small
  varros: L(w('e_obj'), w('le'), w('nen'), w('toke')),  // it leaves under ground
  balte: L(w('toke'), w('me'), w('uje')),               // ground with water
  gjalpe: L(w('ushqim'), w('i_art'), w('verdhe'), w('nga'), wf('qumesht', 'qumështi', 'the milk')), // food the yellow from the milk
  karkanxholl: L(w('nje'), w('lugat'), w('me'), w('hekur')), //   a revenant with iron
  troket: L(wf('godit', 'godet', 'strikes'), wf('dere', 'derën', 'the door'), w('me'), w('dore')), // strikes the door with hand
  kuzhinier: L(w('nje'), w('njeri'), w('qe'), wf('bej', 'bën', 'makes'), w('ushqim')), // a person that makes food
  mos: L(w('fjale'), w('qe'), w('thote'), w('ndalo')),  // word that says stop
  jo: L(w('nuk')), //                                             not (= no)
  ushqim: L(w('nje'), w('gje'), w('qe'), w('ti'), wf('ha', 'ha', 'eat')), // a thing that you eat
  ze: L(w('nje'), w('gje'), w('qe'), wf('degjo', 'dëgjon', 'you hear')), // a thing that you hear
  pagezim: L(w('nje'), w('feste'), w('ku'), wf('femije', 'fëmija', 'the child'), wf('merr', 'merr', 'takes'), w('emer')), // a festival where the child takes name
  goje: L(w('ku'), wf('njeri', 'njeriu', 'the person'), w('ha'), w('dhe'), w('flet')), // where the person eats and speaks
  djathe: L(w('ushqim'), w('i_art'), w('bardhe'), w('nga'), wf('qumesht', 'qumështi', 'the milk')), // food the white from the milk
  shtrydh: L(wf('merr', 'merr', 'takes'), wf('leng', 'lëngun', 'the liquid'), w('me'), w('fuqi')), // takes the liquid with power
  plesht: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('qe'), w('kerce'), w('dhe'), w('kafshon')), // a animal the small that leaps and bites
  kerce: L(wf('hidh', 'hidhet', 'throws itself'), w('lart')), // throws itself up
  ballokume: L(w('nje'), w('ushqim'), w('per'), wf('feste', 'festën', 'the festival'), w('e_link'), wf('vere', 'verës', 'the summer')), // a food for the festival of the summer
  flutur: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('me'), wf('krah', 'krahë', 'wings')), // a animal the small with wings
  dre: L(w('kafshe'), w('e_link'), wf('pyll', 'pyllit', 'the forest'), w('me'), wf('bri', 'brirë', 'horns')), // animal of the forest with horns
  kose: L(w('nje'), w('gje'), w('qe'), wf('pre', 'pret', 'cuts'), wf('bar', 'barin', 'the herb')), // a thing that cuts the herb
  shkop: L(w('nje'), w('dru'), w('i_art'), w('gjate'), w('per'), w('te_subj'), wf('godit', 'goditur', 'strike')), // a wood the long for to strike
  gershere: L(w('nje'), w('gje'), w('qe'), wf('pre', 'pret', 'cuts'), wf('rrobe', 'rroba', 'clothes'), w('dhe'), w('flok')), // a thing that cuts clothes and hair
  qep: L(wf('bej', 'bën', 'makes'), wf('rrobe', 'rroba', 'clothes'), w('me'), w('dore')), // makes clothes with hand
  rreze: L(w('drite'), w('nga'), wf('diell', 'dielli', 'the sun')), // light from the sun
  pallat: L(wf('shtepi', 'shtëpia', 'the house'), w('e_art'), wf('madh', 'madhe', 'big'), w('e_link'), wf('mbret', 'mbretit', 'the king')), // the house the big of the king
  mbreteresha: L(wf('grua', 'gruaja', 'the woman'), w('e_link'), wf('mbret', 'mbretit', 'the king')), // the woman of the king
  liber: L(w('nje'), w('gje'), w('me'), w('shume'), wf('fjale', 'fjalë', 'words'), w('per'), w('dije')), // a thing with many words for knowledge
  laker: L(w('ushqim'), w('i_art'), w('gjelber'), w('nga'), wf('kopsht', 'kopshti', 'the garden')), // food the green from the garden
  kopsht: L(w('toke'), w('me'), w('peme'), w('afer'), wf('shtepi', 'shtëpisë', 'the house')), // ground with tree near the house
  shkolle: L(w('vend'), w('ku'), wf('femije', 'fëmijët', 'the children'), wf('meso', 'mësojnë', 'learn')), // place where the children learn
  lut: L(w('flet'), w('me'), wf('perendi', 'Perëndinë', 'God')), // speaks with God
  dymbedhjete: L(w('dhjete'), w('dhe'), w('dy')),       // ten and two
  thyhet: L(w('behet'), w('shume'), wf('pjese', 'pjesë', 'parts')), // becomes many parts
  etur: L(w('do'), w('uje')), //                                 wants water (= thirsty)
  atje: L(w('jo'), w('ketu'), w('por'), w('larg')),     // not here but far
  hip: L(wf('shko', 'shkon', 'goes'), w('lart'), w('mbi'), w('dicka')), // goes up over something
  kafshe: L(w('nje'), w('gje'), w('e_art'), wf('gjalle', 'gjallë', 'living'), w('si'), wf('ujk', 'ujku', 'the wolf')), // a thing the living how the wolf
  mermer: L(w('nje'), w('gur'), w('i_art'), w('bardhe'), w('per'), wf('pallat', 'pallatin', 'the palace')), // a stone the white for the palace
  sherbetore: L(w('grua'), w('qe'), w('punon'), w('ne'), wf('shtepi', 'shtëpinë', 'the house'), w('e_link'), wf('mbret', 'mbretit', 'the king')), // woman that works in the house of the king
  pate: L(w('nje'), wf('zog', 'zog', 'bird'), w('i_link'), wf('uje', 'ujit', 'water')), // a bird of water
  zgjuar: L(w('nuk'), w('fle')), //                              not asleep (= awake)
  zhytet: L(wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), w('ne'), w('uje')), // goes down in water
  aga: L(w('nje'), w('trim'), w('i_link'), wf('jutbina', 'Jutbinës', 'Jutbina')), // a hero of Jutbina
  xhami: L(w('nje'), w('shtepi'), w('e_art'), w('shenjte'), w('e_link'), wf('hoxha', 'hoxhës', 'the hodja')), // a house the holy of the hodja
  kafe: L(w('nje'), w('uje'), w('i_art'), w('zi'), w('per'), w('mengjes')), // a water the black for morning
  krajl: L(w('nje'), w('mbret'), w('armik')),           // a king enemy
  rusha: L(wf('vajze', 'vajza', 'the maiden'), w('e_link'), wf('krajl', 'krajlit', 'the Slav king'), w('qe'), w('vjen'), w('me'), wf('zuku', 'Zukun', 'Zuku')), // the maiden of the Slav king that comes with Zuku
  kripe: L(w('nje'), w('gje'), w('e_art'), w('bardhe'), w('nga'), wf('det', 'deti', 'the sea'), w('per'), w('ushqim')), // a thing the white from the sea for food
  pende: L(w('nje'), w('gje'), w('nga'), wf('krah', 'krahu', 'wing'), w('i_link'), wf('zog', 'zogut', 'the bird')), // a thing from wing of the bird
  qumesht: L(w('nje'), w('leng'), w('i_art'), w('bardhe'), w('nga'), wf('nene', 'nëna', 'the mother')), // a liquid the white from the mother
  shpate: L(w('nje'), w('arme'), w('e_art'), w('gjate'), w('qe'), wf('pre', 'pret', 'cuts')), // a weapon the long that cuts
  gur: L(w('nje'), w('gje'), w('e_art'), w('forte'), w('nga'), wf('toke', 'toka', 'the ground')), // a thing the strong from the ground
  // verbs
  shko: L(w('ec'), w('larg')), //                                  walk far
  lufto: L(w('shko'), w('kunder'), wf('armik', 'armikut', 'the enemy')), // go against the enemy
  vrit: L(w('bej'), w('qe'), w('te_subj'), wf('vdes', 'vdesë', 'die')), // make that to die
  shpeto: L(w('ndihmo'), w('ne'), w('rrezik')),         // help in danger
  ngjit: L(w('shko'), w('lart'), w('me'), w('kembe')),  // go up with legs
  zbrit: L(w('shko'), wf('poshte', 'poshtë', 'down')), //                             go down
  fluturo: L(w('shko'), w('ne'), w('qiell'), w('me'), wf('krah', 'krahë', 'wings')), // go in sky with wings
  degjo: L(w('merr'), wf('fjale', 'fjalët', 'the words'), w('e_link'), wf('tjeter', 'tjetrit', 'the other')), // take the words of the other
  flet: L(w('thote'), w('fjale')), //                              says words
  thote: L(w('jep'), w('fjale')), //                              gives a word
  ndihmo: L(w('jep'), w('fuqi')), //                               give power
  beso: L(w('di'), w('se'), w('eshte'), w('mik')),      // know that is friend
  hyr: L(w('shko'), w('brenda')), //                               go inside
  dil: L(w('shko'), w('jashte')), //                               go outside
  thirr: L(w('fol'), w('me'), w('ze'), wf('te_link', 'të', 'the'), w('madh')), // speak with sound the big
  hidh: L(w('bej'), w('qe'), w('te_subj'), wf('fluturo', 'fluturojë', 'fly'), w('larg')), // make that to fly far
  kthehu: L(wf('hajde', 'hajde', 'come'), w('perseri')), // come again
  vdes: L(w('nuk'), w('eshte'), wf('me_more', 'më', 'anymore'), w('gjalle')), // not is anymore alive
  varr: L(w('nje'), w('vend'), w('nen'), w('toke'), w('per'), wf('vdes', 'të vdekurin', 'dead')), // a place under ground for dead
  emer: L(w('nje'), w('fjale'), w('per'), w('nje'), w('njeri')), // a word for a person
  luan: L(wf('femije', 'fëmija', 'the child'), wf('bej', 'bën', 'makes'), w('nje'), wf('loja', 'lojë', 'game')), // the child makes a game
  vetem: L(w('pa'), w('njeri'), w('tjeter')),           // without person other
  zemer: L(w('brenda'), wf('njeri', 'njeriut', 'the person'), wf('jep', 'jep', 'gives'), w('jete'), w('dhe'), w('dashuri')), // inside the person gives life and love
  bashke: L(w('jo'), wf('vetem', 'vetëm', 'alone')), //             not alone (= together)
  gjalle: L(w('jo'), wf('vdes', 'i vdekur', 'dead')),   // not dead
  nga: L(w('fjale'), w('qe'), wf('tregoj', 'tregon', 'tells'), w('ku'), w('vjen')), // word that tells where comes
  sjell: L(w('vjen'), w('me'), w('nje'), w('gje')), // comes with a thing (= brings)
  marto: L(w('merr'), wf('nuse', 'nuse', 'a bride')), //            takes a bride (= marries)
  mallko: L(w('thote'), wf('fjale', 'fjalë', 'words'), w('per'), w('dem_harm')), // says words for harm
  le: L(w('nuk'), w('mban')), //                                  does not keep (= leaves behind)
  grua: L(w('nje'), w('nene'), w('ose'), w('vajze')), //          a mother or a maiden (= a woman)
  unaze: L(w('ar'), wf('ne', 'në', 'on'), w('dore')), //          gold on the hand (= a ring)
  fytyre: L(wf('ne', 'në', 'on'), w('koke'), w('me'), w('sy'), w('dhe'), w('goje')), // on head with eyes and mouth
  dru: L(w('nga'), w('nje'), w('peme'), w('per'), w('zjarr')), // from a tree for fire
  ku: L(w('ne'), w('cfare'), wf('vend', 'vendi', 'place')), // in what place
  mushkonje: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('qe'), wf('pi', 'pi', 'drinks'), w('gjak')), // a animal the small that drinks blood
  bisht: L(wf('kafshe', 'kafsha', 'the animal'), w('e_obj'), w('ka'), w('mbrapa')), // the animal it has behind
  bretkose: L(w('nje'), w('kafshe'), w('ne'), w('uje'), w('qe'), w('kerce')), // a animal in water that leaps
  dhelpra: L(w('nje'), w('kafshe'), w('qe'), wf('mashtro', 'mashtron', 'tricks')), // a animal that tricks
  mi: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('qe'), w('ha'), w('djathe')), // a animal the small that eats cheese
  rrobe: L(w('nje'), w('gje'), w('per'), wf('vesh', 'të veshur', 'to wear')), // a thing to wear (dress)
  krah: L(w('nje'), w('gje'), w('e_link'), wf('shqiponje', 'shqiponjës', 'the eagle'), w('per'), wf('fluturo', 'të fluturuar', 'to fly')), // a thing of the eagle for to fly
  kuq: L(wf('si', 'si', 'as'), wf('gjak', 'gjaku', 'the blood')), // as the blood
  bri: L(wf('dash', 'dashi', 'the ram'), w('e_obj'), w('ka'), wf('ne', 'në', 'on'), w('koke')), // the ram it has on head
  gju: L(w('pjese'), w('e_link'), wf('kembe', 'këmbës', 'the leg'), w('ne'), wf('mes', 'mes', 'middle')), // part of the leg in middle
  zgjedh: L(w('merr'), wf('nje', 'një', 'one'), w('nga'), w('shume')), // take one from many
  pasuri: L(w('shume'), w('ar')), //                              much gold (wealth)
  ngre: L(w('merr'), wf('lart', 'lart', 'high')), //              takes up high (= lifts)
  sot: L(wf('dite', 'dita', 'the day'), w('tani'), w('jo'), w('dje'), w('jo'), w('neser')), // the day now not yesterday not tomorrow
  vere: L(w('kohe'), w('e_art'), w('ngrohte'), w('me'), w('diell')), // time the warm with sun
  feste: L(w('dite'), w('kur'), wf('njeri', 'njerëzit', 'the people'), wf('kendo', 'këndojnë', 'sing')), // day when the people sing
  liqen: L(w('nje'), w('uje'), w('i_art'), w('madh'), w('ne'), w('toke')), // a water the big in ground
  flocka: L(w('nje'), w('zane'), wf('ne', 'në', 'in'), w('liqen')), // a fairy in a lake
  meso: L(w('jep'), w('dije')), //                                gives knowledge (= teaches)
  burre: L(w('njeri'), w('jo'), w('grua')),             // person not woman
  gjeme: L(wf('burre', 'burrat', 'men'), wf('vajto', 'vajtojnë', 'mourn')), // men mourn (the wail)
  vajtim: L(wf('grua', 'gratë', 'women'), wf('vajto', 'vajtojnë', 'mourn')), // women mourn (the lament)
  stihi: L(w('nje'), wf('kulshedra', 'kulshedër', 'she-dragon'), w('me'), w('zjarr')), // a she-dragon with fire
  flake: L(wf('drite', 'drita', 'the light'), w('e_link'), wf('zjarr', 'zjarrit', 'the fire')), // the light of the fire
  nxjerr: L(wf('hidh', 'hedh', 'throws'), wf('jashte', 'jashtë', 'out')), // throws out
  semure: L(w('behet'), w('i_art'), w('semur')),        // becomes the sick
  hudher: L(w('nje'), w('ushqim'), w('i_art'), w('forte'), w('kunder'), wf('lugat', 'lugatit', 'the revenant')), // a food the strong against the revenant
  peri: L(w('nje'), w('zane'), w('e_art'), wf('bardhe', 'bardhë', 'white')), //  a white fairy
  krua: L(w('uje'), w('qe'), w('vjen'), w('nga'), wf('gur', 'guri', 'the stone')), // water that comes from the stone
  xhind: L(w('nje'), w('hije'), w('e_link'), wf('naten', 'natës', 'the night')), // a shadow of the night
  prag: L(wf('vend', 'vendi', 'the place'), w('poshte'), wf('dere', 'derës', 'the door')), // the place below the door
  fjale: L(w('dicka'), w('qe'), w('ti'), wf('thote', 'thua', 'say')), // something that you say
  mbi: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('per'), w('lart')), // a word the small for up
  bie: L(wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), wf('ne', 'në', 'to'), w('toke')), // goes down to ground
  pre: L(wf('bej', 'bën', 'makes'), w('dy'), wf('pjese', 'pjesë', 'parts'), w('me'), w('thike')), // makes two parts with knife
  // qualities & connectors
  forte: L(w('me'), w('fuqi')), //                                 with power
  bukur: L(w('mire'), w('per'), wf('sy', 'sytë', 'the eyes')), // good for the eyes
  keq: L(w('qe'), wf('bej', 'bën', 'makes'), w('dem_harm')), // that makes harm
  mire: L(w('jo'), w('keq')), //                                   not bad
  thate: L(w('pa'), w('uje')), //                                  without water
  lart: L(w('atje'), w('ku'), w('eshte'), wf('qiell', 'qielli', 'the sky')), // there where is the sky
  larg: L(w('jo'), w('afer')),                          // not near
  por: L(w('dhe'), w('dicka'), w('kunder')),            // and something against
  po_yes: L(w('vertete'), w('ashtu'), w('eshte')),      // truly so is
  po_prog: L(w('dicka'), w('ndodh'), w('tani')),        // something happens now
  po_but: L(w('por')),                                  // but
  nuk: L(w('jo')), //                                              not
  per: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('si'), w('te_subj')), // a word the small how to
  une: L(wf('njeri', 'njeriu', 'the person'), w('qe'), w('flet')), // the person that speaks
  mua: L(w('une')), //                                            me (= I)
  do: L(w('ai'), w('deshiron')),                        // he wishes
  fuqi: L(w('ti'), wf('ngre', 'ngre', 'lift'), wf('gur', 'gurë', 'stones')), // you lift stones
  hije: L(w('nje'), w('gje'), w('e_art'), w('erret'), wf('ne', 'në', 'on'), w('toke'), w('nga'), wf('drite', 'drita', 'the light')), // a thing the dark on ground from the light
  me: L(w('bashke')),                                   // together
  poshte: L(w('atje'), w('ku'), w('eshte'), wf('toke', 'toka', 'the ground')), // there where is the ground
  prek: L(w('godit'), wf('lehte', 'lehtë', 'lightly'), w('me'), w('dore')), // strike lightly with hand
  shume: L(w('jo'), w('pak')),                          // not a little
  tani: L(w('ne'), wf('ky', 'këtë', 'this'), w('kohe')), // in this time
  shtrige: L(w('nje'), w('plake'), w('e_art'), wf('keq', 'keqe', 'bad')), //       a bad old woman
  ora: L(w('nje'), w('hije'), w('e_art'), w('mire'), w('qe'), w('ruan'), wf('njeri', 'njeriun', 'the person')), // a shadow the good that guards the person
  det: L(w('nje'), w('uje'), w('i_art'), w('madh'), w('pa'), w('fund')), // a water the big without end
  ftohte: L(w('jo'), w('ngrohte')),                     // not warm
  ngrohte: L(w('me'), w('zjarr')), //                             with fire (warm)
  te_obj: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('qe'), w('thote'), w('ti')), // a word the small that says you
  prit: L(w('rri'), w('dhe'), w('mos'), w('ik')),       // stay and do not flee
  tjeter: L(w('jo'), w('ky')),                          // not this
  rrezik: L(w('dicka'), w('e_art'), wf('keq', 'keqe', 'bad'), w('eshte'), w('afer')), // something the bad is near
  // --- the Baloz branch ---
  baloz: L(w('nje'), w('gjarper'), w('i_art'), w('madh'), w('nga'), wf('det', 'deti', 'the sea')), // a serpent the big from the sea
  motra: L(w('nje'), w('vajze'), w('nga'), wf('nene', 'nëna', 'the mother'), wf('im', 'ime', 'my')), // a maiden from the mother my
  plage: L(w('nje'), w('vend'), w('i_art'), w('keq'), w('me'), w('gjak')), // a place the bad with blood
  nente: L(w('tete'), w('dhe'), wf('nje', 'një', 'one')), // eight and one
  vajze: L(w('nje'), w('grua'), w('e_art'), wf('ri', 're', 'young')), // a woman the young
  fole: L(w('nje'), w('shtepi'), w('e_link'), wf('shqiponje', 'shqiponjës', 'the eagle')), // a house of the eagle
  zog: L(w('nje'), w('shqiponje'), w('e_art'), w('vogel')), // a eagle the small
  dite: L(w('nje'), w('kohe'), w('me'), w('drite')), //           a time with light
  agim: L(wf('diell', 'dielli', 'the sun'), w('vjen')), //        the sun comes
  muzg: L(wf('naten', 'nata', 'the night'), w('vjen')), //        the night comes
  deri: L(w('nga'), w('tani'), wf('ne', 'në', 'to'), w('nje'), w('kohe'), w('tjeter')), // from now to a time other
  yll: L(w('nje'), w('drite'), w('e_art'), w('vogel'), w('ne'), w('qiell'), wf('naten', 'natën', 'at night')), // a light the small in sky at night
  pleq: L(w('burra'), wf('te_link', 'të', 'the'), w('vjeter')), // men the old
  gjinkalla: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('qe'), wf('kendo', 'këndon', 'sings'), w('ne'), w('vere')), // a animal the small that sings in summer
  burg: L(w('nje'), w('vend'), w('ku'), wf('njeri', 'njeriu', 'the person'), w('nuk'), wf('dil', 'del', 'goes out'), w('dot')), // a place where the person not goes out at all
  kafaz: L(w('nje'), w('burg'), w('i_art'), w('vogel'), w('per'), wf('zog', 'zogun', 'the bird')), // a prison the small for the bird
  qiri: L(w('nje'), w('drite'), w('e_art'), w('vogel'), w('me'), w('dylle')), // a light the small with wax
  kapidan: L(w('nje'), w('trim'), w('i_link'), wf('krajl', 'krajlit', 'the Slav king')), // a hero of the Slav king
  mejdan: L(w('nje'), wf('lufto', 'luftë', 'fight'), w('mes'), w('dy'), wf('trim', 'trimave', 'heroes')), // a fight among two heroes
  hendek: L(w('uje'), w('rreth'), wf('kala', 'kalasë', 'the castle')), // water around the castle
  hu: L(w('nje'), w('dru'), w('i_art'), w('gjate'), w('ne'), w('toke')), // a wood the long in ground
  peme: L(w('nje'), w('dru'), w('i_art'), w('gjalle'), w('ne'), w('pyll')), // a wood the alive in forest
  // --- the storm ---
  rrufe: L(w('drite'), w('qe'), w('bie'), w('nga'), wf('re', 'retë', 'the clouds')), // light that falls from the clouds
  re: L(w('nje'), w('gje'), w('ne'), w('qiell'), w('qe'), w('sjell'), w('shi')), // a thing in sky that brings rain
  ere: L(w('dicka'), w('qe'), wf('leviz', 'lëviz', 'moves'), wf('re', 'retë', 'the clouds')), // something that moves the clouds
  // --- the underworld rams & the twist ---
  dash: L(wf('baba', 'babai', 'the father'), w('i_link'), wf('qengj', 'qengjit', 'the lamb')), // the father of the lamb
  bardhe: L(wf('si', 'si', 'like'), wf('qumesht', 'qumështi', 'the milk')), // like the milk
  zi: L(wf('si', 'si', 'like'), wf('erresire', 'errësira', 'the darkness')), // like the darkness
  jam: L(w('je'), w('por'), w('per'), w('mua')),        // are but for me
  njeri: L(w('nje'), w('burre'), w('ose'), w('nje'), w('grua')), // a man or a woman
  vazhdon: L(w('nuk'), wf('ndalo', 'ndalon', 'stops')), // not stops
  // --- the village & the besa ---
  premto: L(w('jep'), w('bese')), //                              give an oath
  bese: L(w('nje'), w('fjale'), w('qe'), w('nuk'), w('thyhet'), w('kurre')), // a word that not breaks never
  lugat: L(w('nje'), w('i_art'), wf('vdes', 'vdekur', 'dead'), w('qe'), wf('ec', 'ecën', 'walks'), wf('naten', 'natën', 'at night')), // a the dead that walks at night
  vella: L(w('nje'), w('djale'), w('nga'), wf('nene', 'nëna', 'the mother'), wf('im', 'ime', 'my')), // a boy from the mother my
  bej: L(w('une'), wf('punon', 'punoj', 'work'), w('dhe'), w('dicka'), w('e_art'), wf('ri', 're', 'new'), w('vjen')), // I work and something the new comes
  vogel: L(w('jo'), w('i_art'), w('madh')), //                    not big
  diell: L(wf('drite', 'drita', 'the light'), w('e_art'), wf('madh', 'madhe', 'big'), w('e_link'), wf('dite', 'ditës', 'the day')), // the light the big of the day
  qen: L(w('nje'), w('kafshe'), w('qe'), w('leh')),     // a animal that barks
  ngadale: L(w('jo'), w('shpejt')), //                            not fast
  lot: L(w('uje'), w('nga'), wf('sy', 'sytë', 'the eyes')), // water from the eyes
  dhi: L(w('nje'), w('kafshe'), w('qe'), w('hip'), w('ne'), w('mal')), // a animal that climbs in mountain
  ar: L(w('nje'), w('gje'), w('e_art'), w('verdhe'), w('qe'), w('kushton'), wf('shume', 'shumë', 'much')), // a thing the yellow that costs much
  hoxha: L(w('nje'), w('plak'), w('qe'), w('flet'), w('ne'), w('xhami')), // a old man that speaks in mosque
  kazan: L(w('nje'), w('gje'), w('per'), w('ushqim'), w('mbi'), w('zjarr')), // a thing for food over fire
  // --- lore-review fixes ---
  lind: L(w('vjen'), wf('ne', 'në', 'to'), w('bote')), //                      to come into the world
  kemishe: L(w('nje'), w('rrobe'), w('qe'), wf('femije', 'fëmija', 'the child'), w('ka'), w('kur'), wf('lind', 'lind', 'is born')), // a dress that the child has when is born
  gji: L(w('ku'), wf('nene', 'nëna', 'the mother'), wf('jep', 'jep', 'gives'), w('qumesht')), // where the mother gives milk
  dore: L(wf('pjese', 'pjesa', 'the part'), w('qe'), wf('merr', 'merr', 'takes'), wf('gje', 'gjëra', 'things')), // the part that takes things
  djep: L(w('nje'), w('shtrat'), w('i_art'), w('vogel'), w('per'), wf('femije', 'fëmijën', 'the child')), // a bed the small for the child
  dije: L(w('gjithcka'), w('qe'), wf('di', 'di', 'you know')), // everything that you know
  ose: L(w('ky'), w('apo'), wf('ai', 'ai', 'that')),    // this or that
  kembe: L(w('ec'), w('me'), w('keto')),                // walk with these
  jashte: L(w('jo'), w('brenda')), //                            not inside
  // --- Sari Salltëk ---
  dervish: L(w('nje'), w('burre'), w('i_art'), w('shenjte'), w('ne'), w('teqe')), // a man the holy in teqe
  gjuhe: L(w('nje'), w('gje'), w('ne'), wf('goje', 'gojë', 'the mouth'), w('qe'), w('flet')), // a thing in the mouth that speaks
  shtate: L(w('gjashte'), w('dhe'), wf('nje', 'një', 'one')), // six and one
  tund: L(wf('leviz', 'lëviz', 'moves'), wf('djep', 'djepin', 'the cradle'), w('ose'), wf('peme', 'pemën', 'tree')), // moves the cradle or tree
  dordolec: L(w('nje'), w('femije'), w('qe'), wf('thirr', 'thërret', 'calls'), wf('shi', 'shiun', 'the rain')), // a child that calls the rain
  shi: L(w('uje'), w('qe'), w('bie'), w('nga'), wf('qiell', 'qielli', 'the sky')), // water that falls from the sky
  vesh: L(w('mban'), wf('rrobe', 'rroba', 'clothes'), wf('mbi', 'mbi', 'on'), w('vete')), // keeps clothes on self
  gjelber: L(wf('si', 'si', 'like'), w('nje'), w('peme'), w('ne'), w('vere')), // like a tree in summer
  verdhe: L(wf('si', 'si', 'like'), wf('ar', 'ari', 'the gold'), w('dhe'), wf('diell', 'dielli', 'the sun')), // like the gold and the sun
  kendo: L(w('bej'), w('nje'), w('kenge'), w('me'), wf('ze', 'zë', 'voice')), // make a song with voice
  bolla: L(w('nje'), w('gjarper'), w('qe'), w('behet'), wf('kulshedra', 'kulshedra', 'the she-dragon')), // a serpent that becomes the she-dragon
  shengjergj: L(w('nje'), w('feste'), w('kur'), w('vjen'), wf('vere', 'vera', 'the summer')), // a festival when comes the summer
  kurre: L(w('jo'), w('sot'), w('jo'), w('neser'), wf('asnje', 'asnjë', 'no'), w('dite')), // not today not tomorrow no day
  katallan: L(w('nje'), w('njeri'), w('i_art'), w('madh'), w('me'), wf('nje', 'një', 'one'), wf('sy', 'sy', 'eye')), // a person the big with one eye
  godit: L(w('prek'), wf('forte', 'fort', 'hard'), w('me'), w('dore'), w('ose'), w('arme')), // touch hard with hand or weapon
  verbo: L(w('merr'), wf('drite', 'dritën', 'the light'), w('e_link'), wf('sy', 'syve', 'the eyes')), // take the light of the eyes
  gjak: L(w('nje'), w('leng'), w('i_art'), w('kuq'), w('brenda'), wf('njeri', 'njeriut', 'the person')), // a liquid the red inside the person
  dy: L(wf('nje', 'një', 'one'), w('dhe'), wf('nje', 'një', 'one')), // one and one
  bar: L(w('nje'), w('gje'), w('e_art'), w('gjelber'), w('qe'), wf('ndihmo', 'ndihmon', 'helps')), // a thing the green that helps
  tre: L(w('dy'), w('dhe'), wf('nje', 'një', 'one')),   // two and one
  shurdhi: L(w('nje'), w('perendi'), w('qe'), w('sjell'), wf('re', 're', 'clouds'), w('dhe'), w('rrufe')), // a God that brings clouds and thunderbolt
  hekur: L(w('nje'), w('gur'), w('i_art'), w('forte'), w('per'), wf('shpate', 'shpata', 'swords')), // a stone the strong for swords
  kale: L(w('nje'), w('kafshe'), w('e_art'), wf('madh', 'madhe', 'big'), w('ku'), w('hip'), wf('trim', 'trimi', 'the hero')), // a animal the big where climbs the hero
  ruan: L(w('mban'), wf('larg', 'larg', 'away'), wf('rrezik', 'rrezikun', 'the danger')), // keeps away the danger
  roje: L(w('nje'), w('njeri'), w('qe'), w('ruan')), //          a person who guards
  bekim: L(w('nje'), w('fjale'), w('e_art'), w('mire'), w('qe'), wf('jep', 'jep', 'gives'), w('fat')), // a word the good that gives luck
  mujo: L(w('nje'), w('trim'), w('i_art'), w('madh'), w('nga'), w('jutbina')), // a hero the big from Jutbina
  skender: L(w('nje'), w('trim'), w('i_link'), w('madh'), w('nga'), wf('kruje', 'Kruja', 'Krujë')), // a hero of big from Krujë
  armik: L(w('jo'), w('nje'), w('mik')), //                      not a friend (enemy)
  kenge: L(w('nje'), w('gje'), w('qe'), w('ti'), wf('kendo', 'këndon', 'sing')), // a thing that you sing
  jeto: L(w('rri'), w('gjalle')),                       // stay alive
  burrneshe: L(w('nje'), w('grua'), w('qe'), wf('jeto', 'jeton', 'lives'), wf('si', 'si', 'like'), w('burre')), // a woman that lives like man
  raki: L(w('nje'), w('gje'), w('e_link'), w('forte'), w('qe'), w('ti'), w('pi')), // a thing of strong that you drink
  gezuar: L(w('nje'), w('fjale'), w('kur'), w('ti'), w('pi')), // a word when you drink
  dasme: L(w('nje'), w('feste'), w('me'), w('nuse')),   // a festival with bride
  shenje: L(w('nje'), w('gje'), w('qe'), w('thote'), w('dicka')), // a thing that says something
  thike: L(w('nje'), w('gje'), w('qe'), wf('pre', 'pret', 'cuts'), w('buke'), w('e_conj'), w('mish')), // a thing that cuts bread and meat
  luge: L(w('nje'), w('gje'), w('qe'), w('sjell'), w('leng'), w('ne'), w('goje')), // a thing that brings liquid in mouth
  plis: L(w('nje'), w('gje'), w('e_link'), w('bardhe'), w('per'), wf('koke', 'kokën', 'the head')), // a thing of white for the head
  xhublete: L(w('nje'), w('rrobe'), w('per'), w('grua')), //     a dress for a woman (bell-dress)
  kurbet: L(w('pune'), w('larg'), w('nga'), wf('shtepi', 'shtëpia', 'the home')), // work far from the home
  rozafa: L(w('nje'), w('nene'), w('brenda'), w('nje'), wf('mur', 'muri', 'wall')), // a mother inside a wall
  gjergj: L(w('nje'), w('trim'), w('me'), w('nente'), wf('plage', 'plagë', 'wounds')), // a hero with nine wounds
  kumaLisa: L(w('nje'), w('dhelpra'), w('qe'), wf('mashtro', 'mashtron', 'tricks')), // a fox that tricks
  sariSalltek: L(w('nje'), w('dervish'), w('i_link'), w('shenjte'), w('ne'), w('nje'), w('shpelle')), // a dervish of holy in a cave
  gjizar: L(w('nje'), w('zog'), w('nga'), w('nje'), w('perralle')), // a chick from a tale
  kostandin: L(w('nje'), w('vella'), w('qe'), wf('kthehu', 'kthehet', 'returns'), w('nga'), wf('varr', 'varri', 'the grave')), // a brother that returns from the grave
  doruntine: L(wf('motra', 'motra', 'the sister'), w('e_link'), wf('kostandin', 'Kostandinit', 'Kostandin')), // the sister of Kostandin
  kruje: L(w('nje'), w('qytet'), w('i_link'), w('vjeter'), w('me'), w('kala')), // a city of old with castle
  lezhe: L(wf('qytet', 'qyteti', 'the city'), w('me'), wf('varr', 'varrin', 'the grave'), w('e_link'), wf('skender', 'Skënderbeut', 'Skanderbeg')), // the city with the grave of Skanderbeg
  osum: L(wf('lume', 'lumi', 'the river'), w('nen'), w('tomor')), // the river under Tomorr
  zuku: L(w('nje'), w('trim'), w('dhe'), w('mik'), w('i_link'), wf('mujo', 'Mujos', 'Mujo')), // a hero and friend of Mujo
  mashallah: L(w('nje'), w('fjale'), w('per'), w('bekim')), //   a word for blessing (mashallah)
  teqe: L(w('nje'), w('shtepi'), w('e_link'), w('shenjte'), w('per'), w('dervish')), // a house of holy for dervish
  kurban: L(w('mish'), w('per'), w('perendi')), //               meat for god (sacrifice)
  ymer: L(w('nje'), w('trim'), w('qe'), wf('kthehu', 'kthehet', 'returns'), w('nga'), wf('burg', 'burgu', 'the prison')), // a hero that returns from the prison
  premte: L(w('nje'), w('dite'), w('e_link'), wf('jave', 'javës', 'the week')), // a day of the week
  kalter: L(wf('si', 'si', 'like'), wf('qiell', 'qielli', 'the sky')), // like the sky
  dyzet: L(w('kater'), wf('here', 'herë', 'times'), wf('dhjete', 'dhjetë', 'ten')), // four times ten (forty)
  edyta: L(w('vjen'), w('pas'), wf('te_link', 'të', 'the'), wf('pari', 'parit', 'first')), // comes after the first
  halil: L(wf('vella', 'vëllai', 'the brother'), w('i_link'), wf('trim', 'trimit', 'the hero'), w('mujo')), // the brother of the hero Mujo
  tanusha: L(wf('vajze', 'vajza', 'the maiden'), w('e_link'), wf('krajl', 'krajlit', 'the Slav king'), w('qe'), w('halil'), wf('do', 'do', 'loves')), // the maiden of the Slav king that Halili loves
  nuse: L(w('nje'), w('vajze'), w('qe'), w('marto')),   // a maiden that marries
  fsheh: L(w('mban'), wf('larg', 'larg', 'far from'), wf('sy', 'syve', 'the eyes')), // keeps far from the eyes
  djall: L(w('nje'), w('shpirt'), w('i_art'), w('keq'), w('nga'), wf('zjarr', 'zjarri', 'the fire')), // a soul the bad from the fire
  perendi: L(w('nje'), w('fuqi'), w('e_art'), wf('madh', 'madhe', 'big'), w('ne'), w('qiell')), // a power the big in sky
  verbti: L(w('nje'), w('perendi'), w('e_link'), wf('zjarr', 'zjarrit', 'the fire'), w('qe'), w('nuk'), wf('sheh', 'sheh', 'sees')), // a God of the fire that not sees
  omer: L(wf('bir', 'biri', 'the son'), w('i_link'), wf('trim', 'trimit', 'the hero'), w('mujo')), // the son of the hero Mujo
  vajto: L(w('flet'), w('me'), w('lot'), w('kur'), w('dikush'), w('vdes')), // speaks with tears when someone dies
  lubia: L(w('nje'), w('gjarper'), w('me'), w('shume'), wf('koke', 'koka', 'heads')), // a serpent with many heads
  prende: L(w('nje'), w('perendi'), w('e_link'), wf('dashuri', 'dashurisë', 'the love')), // a God of the love
  ylber: L(w('nje'), w('drite'), w('e_art'), w('bukur'), w('ne'), w('qiell'), w('pas'), wf('shi', 'shiut', 'the rain')), // a light the beautiful in sky after the rain
  gjegjeza: L(w('nje'), w('pyetje'), w('qe'), wf('fsheh', 'fsheh', 'hides'), w('nje'), w('fjale')), // a question that hides a word
  samar: L(w('nje'), w('gje'), wf('mbi', 'mbi', 'on'), wf('gomar', 'gomarin', 'the donkey'), w('ku'), wf('rri', 'rri', 'sits'), wf('njeri', 'njeriu', 'the person')), // a thing on the donkey where sits the person
  breshka: L(w('nje'), w('kafshe'), w('qe'), w('mban'), wf('shtepi', 'shtëpinë', 'the house'), wf('mbi', 'mbi', 'on'), w('vete')), // a animal that keeps the house on self
  gjon: L(w('nje'), wf('zog', 'zog', 'bird'), w('qe'), wf('kendo', 'këndon', 'sings'), wf('naten', 'natën', 'at night')), // a bird that sings at night
  arushe: L(w('nje'), w('kafshe'), w('e_art'), wf('madh', 'madhe', 'big'), w('qe'), w('ha'), w('mjalte')), // a animal the big that eats honey
  mashtro: L(w('thote'), w('nje'), w('gje'), w('qe'), w('nuk'), w('eshte')), // says a thing that not is
  dhampir: L(w('nje'), w('bir'), w('i_link'), wf('lugat', 'lugatit', 'the revenant')), // a son of the revenant
  bleta: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('qe'), wf('bej', 'bën', 'makes'), w('mjalte')), // a animal the small that makes honey
  merimanga: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('me'), w('tete'), w('kembe')), // a animal the small with eight legs
  dallendyshe: L(w('nje'), wf('zog', 'zog', 'bird'), w('qe'), w('vjen'), w('ne'), w('vere')), // a bird that comes in summer
  kukudh: L(w('nje'), w('lugat'), w('qe'), w('mban'), wf('ar', 'arin', 'the gold')), // a revenant that keeps the gold
  hardhi: L(w('nje'), w('peme'), w('qe'), wf('ngjit', 'ngjitet', 'climbs'), w('mbi'), w('mur')), // a tree that climbs over wall
  bresher: L(w('shi'), wf('si', 'si', 'as'), wf('gur', 'gurë', 'stones'), w('nga'), wf('re', 'retë', 'the clouds')), // rain as stones from the clouds
  pa: L(w('jo'), w('me')),                              // not with
  gomar: L(w('nje'), w('kafshe'), w('qe'), wf('mban', 'mban', 'carries'), w('samar')), // a animal that carries packsaddle
  hene: L(w('nje'), w('drite'), w('e_art'), wf('madh', 'madhe', 'big'), wf('naten', 'natën', 'at night')), // a light the big at night
  bije: L(wf('vajze', 'vajza', 'the maiden'), w('e_link'), wf('nene', 'nënës', 'the mother')), // the maiden of the mother
  vit: L(w('dymbedhjete'), wf('muaj', 'muaj', 'months')), // twelve months
  fol: L(w('thote'), wf('fjale', 'fjalë', 'words')),    // says words
  shpirag: L(w('nje'), w('mal'), w('qe'), wf('lufto', 'lufton', 'fights'), w('me'), wf('tomor', 'Tomorin', 'Tomorr')), // a mountain that fights with Tomorr
  bir: L(wf('djale', 'djali', 'the boy'), w('i_link'), wf('nene', 'nënës', 'the mother')), // the boy of the mother
  mban: L(w('ka'), w('dhe'), w('nuk'), w('e_obj'), w('le')), // has and not it leaves
  vitore: L(w('nje'), w('gjarper'), w('qe'), w('sjell'), w('fat'), w('ne'), w('shtepi')), // a serpent that brings luck in house
  sulmo: L(w('shko'), w('dhe'), w('godit')),            // go and strike
  // --- high-frequency spoken words (top-100 coverage) ---
  di: L(w('ke'), w('dije')), //                                 have knowledge (= know)
  duhet: L(w('eshte'), w('nevoje')),                    // is need
  mendoj: L(wf('punon', 'punoj', 'work'), w('me'), w('koke')), // work with head
  duket: L(wf('sy', 'syri', 'the eye'), w('e_obj'), wf('sheh', 'sheh', 'sees'), w('keshtu')), // the eye it sees thus
  ai: L(wf('fjale', 'fjala', 'the word'), w('per'), w('nje'), w('burre')), // the word for a man
  ajo: L(wf('fjale', 'fjala', 'the word'), w('per'), w('nje'), w('grua')), // the word for a woman
  ata: L(w('ai'), w('dhe'), w('ajo')),                  // he and she
  tij: L(w('e_link'), wf('ai', 'atij', 'him')),         // of him
  ky: L(w('ai'), w('qe'), w('eshte'), w('ketu')),       // he that is here
  ju: L(w('ti'), w('dhe'), w('ti')), //                        you and you (= you plural)
  na: L(w('nje'), w('fjale'), w('e_art'), w('vogel'), w('per'), wf('ne_we', 'ne', 'us')), // a word the small for us
  kush: L(w('cili'), w('njeri')),                       // which person
  cfare: L(wf('cili', 'cila', 'which'), w('gje')),      // which thing
  pse: L(w('per'), w('cfare')), //                             for what (= why)
  sa: L(w('shume'), w('ose'), w('pak')), //                    many or few (= how much)
  kur: L(w('ne'), w('cfare'), wf('kohe', 'kohe', 'time')), // in what time
  nese: L(w('ndoshta'), w('po_yes'), w('ndoshta'), wf('jo', 'jo', 'no')), // maybe yes maybe no
  sepse: L(w('per'), wf('ky', 'këtë', 'this'), w('arsye')), // for this reason
  edhe: L(w('dhe'), w('gjithashtu')),                   // and also
  apo: L(w('ose')), //                                         or
  si: L(w('ne'), w('cfare'), wf('menyre', 'mënyre', 'way')), // in what way
  pra: L(w('keshtu')), //                                      thus (= so)
  keshtu: L(wf('si', 'si', 'as'), w('ky')),             // as this
  gjithe: L(w('cdo'), w('gje'), w('dhe'), w('cdo'), w('njeri')), // every thing and every person
  pak: L(w('jo'), w('shume')), //                             not many (= a little)
  para: L(w('jo'), w('tani'), w('jo'), w('pas')),       // not now not after
  tek: L(wf('ne', 'në', 'in')), //                            in (= at)
  vertete: L(wf('shume', 'shumë', 'very'), wf('sigurt', 'sigurt', 'sure')), // very sure
  dicka: L(w('nje'), w('gje')), //                            a thing (= something)
  asgje: L(wf('asnje', 'asnjë', 'not any'), w('gje')),  // not any thing
  ja: L(w('shiko'), w('ketu')),                         // look here
  oh: L(w('nje'), w('fjale'), w('per'), w('dhimbje')),  // a word for pain
  hej: L(w('degjo'), w('ti')),                          // listen you
  duke: L(w('ne'), wf('kohe', 'kohën', 'the time'), w('qe')), // in the time that
  jete: L(wf('kohe', 'koha', 'the time'), w('kur'), wf('je', 'je', 'you are'), w('gjalle')), // the time when you are alive
  rregull: L(w('kur'), w('cdo'), w('gje'), w('eshte'), w('mire')), // when every thing is good
  faleminderit: L(w('nje'), w('fjale'), w('e_art'), w('mire'), w('kur'), w('dikush'), wf('jep', 'jep', 'gives'), w('dicka')), // a word the good when someone gives something
  se: L(w('qe')), //                                         that
  qe: L(w('se')), //                                         that (relative)
  gje: L(w('dicka')), //                                     something (= a thing)
  ta: L(w('nje'), w('fjale'), w('per'), w('te_subj'), w('dhe'), w('e_obj')), // a word for to and it
  im: L(w('qe'), wf('ke', 'kam', 'I have')),            // that I have
  // ===== SURVIVAL CORE definitions (in-language, built from simpler words) =====
  lutem: L(w('nje'), w('fjale'), w('kur'), wf('do', 'do', 'you want'), w('dicka')), // a word when you want something
  mirmengjes: L(w('mire'), w('mengjes')), //                good morning
  mirdita: L(w('mire'), w('dite')), //                      good day
  mirembrema: L(w('mire'), w('mbremje')), //                good evening
  natenmire: L(w('fjale'), w('kur'), wf('shko', 'shkon', 'you go'), w('te_subj'), wf('fle', 'flesh', 'sleep')), // word when you go to sleep
  mirupafshim: L(w('nje'), w('fjale'), w('kur'), wf('shko', 'shkon', 'you go')), // a word when you go
  gjashte: L(w('pese'), w('dhe'), wf('nje', 'një', 'one')), // five and one
  tete: L(w('shtate'), w('dhe'), wf('nje', 'një', 'one')), // seven and one
  dhjete: L(w('nente'), w('dhe'), wf('nje', 'një', 'one')), // nine and one
  njezet: L(w('dhjete'), w('dhe'), w('dhjete')), //         ten and ten
  njeqind: L(w('dhjete'), wf('here', 'herë', 'times'), w('dhjete')), // ten times ten
  mije: L(w('dhjete'), wf('here', 'herë', 'times'), w('njeqind')), // ten times hundred
  zero: L(w('kur'), w('nuk'), wf('ka', 'ka', 'there is'), wf('asgje', 'asgjë', 'anything')), // when not there is anything
  tregtar: L(w('njeri'), w('qe'), wf('shes', 'shet', 'sells'), w('ne'), w('treg')), // person that sells in market
  dua: L(wf('deshiron', 'dëshiroj', 'I wish'), w('dicka')), // I wish something
  blej: L(w('jep'), wf('para', 'para', 'money'), w('per'), w('nje'), w('gje')), // give money for a thing
  shes: L(w('jep'), w('nje'), w('gje'), w('per'), wf('para', 'para', 'money')), // give a thing for money
  kushton: L(w('sa'), wf('para', 'para', 'money'), w('do'), w('nje'), w('gje')), // how much money wants a thing
  lek: L(wf('para', 'paraja', 'money'), w('e_link'), wf('shqiptar', 'shqiptarëve', 'the Albanians')), // money of the Albanians
  shtrenjte: L(w('kushton'), wf('shume', 'shumë', 'much'), wf('para', 'para', 'money')), // costs much money
  lire: L(w('kushton'), w('pak'), wf('para', 'para', 'money')), // costs a little money
  dyqan: L(w('vend'), w('ku'), wf('blej', 'blej', 'I buy'), wf('gje', 'gjëra', 'things')), // place where I buy things
  kusur: L(wf('para', 'para', 'money'), w('qe'), wf('merr', 'merr', 'you take'), wf('prapa', 'prapa', 'back')), // money that you take back
  fatura: L(wf('tregoj', 'tregon', 'shows'), w('sa'), wf('para', 'para', 'money'), wf('duhet', 'duhet', 'is needed')), // shows how much money is needed
  caj: L(w('uje'), w('i_art'), w('nxehte'), w('me'), w('bar')), // water the hot with herb
  birre: L(w('nje'), w('leng'), w('i_art'), w('verdhe'), w('qe'), wf('pi', 'pi', 'you drink'), wf('ne', 'në', 'at'), w('feste')), // a liquid the yellow that you drink at festival
  perime: L(w('ushqim'), w('nga'), wf('toke', 'toka', 'the ground')), // food from the ground
  bujtine: L(w('shtepi'), w('ku'), wf('fle', 'fle', 'sleeps'), wf('udhetar', 'udhëtari', 'the traveller')), // house where sleeps the traveller
  dhome: L(w('vend'), w('brenda'), wf('shtepi', 'shtëpisë', 'the house'), w('me'), w('dere')), // place inside the house with door
  shtrat: L(w('gje'), w('ne'), w('dhome'), w('ku'), wf('fle', 'fle', 'you sleep')), // thing in room where you sleep
  celes: L(w('gje'), w('qe'), wf('hap', 'hap', 'opens'), wf('dere', 'derën', 'the door')), // thing that opens the door
  sherues: L(w('njeri'), w('qe'), wf('ndihmo', 'ndihmon', 'helps'), w('kur'), wf('je', 'je', 'you are'), w('semur')), // person that helps when you are sick
  mjek: L(w('nje'), w('sherues')), //                       a healer (doctor)
  semur: L(w('kur'), wf('ke', 'ke', 'you have'), w('dhimbje')), // when you have pain
  dhimbje: L(w('gje'), w('e_link'), wf('keq', 'keqe', 'bad'), w('nga'), w('nje'), w('plage')), // thing of bad from a wound
  quhem: L(wf('emer', 'emri', 'name'), w('im'), w('eshte')), // name my is
  familje: L(w('nene'), w('e_conj'), w('baba'), w('dhe'), wf('femije', 'fëmijë', 'children')), // mother and father and children
  vjec: L(wf('sa', 'sa', 'how many'), wf('vit', 'vjet', 'years'), wf('ke', 'ke', 'you have')), // how many years you have
  perserit: L(w('thote'), w('perseri')), //                say again (repeat)
  majtas: L(w('nga'), wf('dore', 'dora', 'the hand'), w('e_link'), wf('zemer', 'zemrës', 'the heart')), // from the hand of the heart
  djathtas: L(w('nga'), wf('dore', 'dora', 'the hand'), w('tjeter')), // from the hand other
  harte: L(wf('tregoj', 'tregon', 'shows'), wf('rruge', 'rrugët', 'the roads'), w('dhe'), wf('vend', 'vendet', 'the places')), // shows the roads and the places
  hyrje: L(w('dere'), w('ku'), wf('hyr', 'hyn', 'you enter')), // door where you enter
  dalje: L(w('dere'), w('per'), w('jashte')), //            a door for outside (exit)
  shtyj: L(w('leviz'), w('nje'), w('gje'), w('larg'), w('nga'), w('ti')), // move a thing far from you
  terheq: L(w('leviz'), w('nje'), w('gje'), w('afer'), wf('ti', 'teje', 'you')), // move a thing near you
  mbremje: L(w('kohe'), w('para'), wf('naten', 'natës', 'the night')), // time before the night
  dje: L(w('nje'), w('dite'), w('me_more'), wf('para', 'parë', 'before')), // a day more before
  nxehte: L(wf('shume', 'shumë', 'very'), w('ngrohte'), wf('si', 'si', 'like'), wf('zjarr', 'zjarri', 'the fire')), // very warm like the fire
  mbyllur: L(w('jo'), wf('hap', 'hapur', 'open')),      // not open
  ndalohet: L(w('mos'), w('bej')), //                       do not do it (forbidden)
  burra: L(w('shume'), w('burre')), //                      many men
  gra: L(w('shume'), w('grua')), //                         many women
  bilete: L(wf('para', 'para', 'money'), w('per'), w('nje'), w('rruge')), // money for a road
  polici: L(w('nje'), w('roje'), w('ne'), w('qytet')),  // a guard in city
  hotel: L(w('nje'), w('bujtine'), w('e_link'), wf('madh', 'madhe', 'big'), w('ne'), w('qytet')), // a inn of big in city
  restorant: L(w('nje'), w('shtepi'), w('ku'), w('ti'), wf('ha', 'ha', 'eat')), // a house where you eat
  // ===== added by dictionary overhaul =====
  leng: L(w('dicka'), w('si'), wf('uje', 'uji', 'the water'), w('ose'), w('si'), wf('qumesht', 'qumështi', 'the milk')), // something how the water or how the milk
  zhurme: L(w('nje'), w('ze'), w('i_art'), w('madh')),  // a sound the big
}
