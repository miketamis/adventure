import { NOUN_FORMS } from './nounForms.js'

// Albanian word/sense catalog. Kept as its own static cache boundary: the
// story, reducer and training surfaces all need it synchronously, but adding
// one word should not invalidate or oversize the authored story-graph chunk.
// Each entry is one word/sense. `id` is the discovery/mana sense id; `al` is
// the Albanian lemma and `en` its default English gloss. Closely related senses
// use `enAll`, while context-specific readings stay on story tokens.
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
  dhe:       { al: 'dhe',       en: 'and', ctx: { al: 'bukë dhe ujë', en: 'bread __ water', focus: 'dhe' } },
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
    { al: 'derës', tag: 'defDat',   gloss: 'of/to the door' },
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
  gjakove:   { al: 'Gjakovë',   en: 'Gjakova' },
  plak:      { al: 'plak',      en: 'old man', forms: [
    { al: 'plak',   tag: 'indefNom', gloss: 'an old man' },
    { al: 'plaku',  tag: 'defNom',   gloss: 'the old man' },
    { al: 'plakun', tag: 'defAcc',   gloss: 'the old man (object)' },
    { al: 'plakut', tag: 'defDat',   gloss: 'of/to the old man' },
    { al: 'plako',  tag: 'voc',      gloss: 'old man (buddy)' },
  ] },
  kalo:      { al: 'kalo',      en: 'cross' },
  // --- folklore: characters & creatures ---
  fshat:     { al: 'fshat',     en: 'village', forms: [
    { al: 'fshat',   tag: 'indefNom', gloss: 'a village' },
    { al: 'fshati',  tag: 'defNom',   gloss: 'the village' },
    { al: 'fshatin', tag: 'defAcc',   gloss: 'the village (object)' },
    { al: 'fshatit', tag: 'defDat',   gloss: 'of/to the village' },
  ] },
  plake:     { al: 'plakë',     en: 'old woman' },
  kulshedra: { al: 'kulshedra', en: 'she-dragon' }, // the Kulshedra: multi-headed, fire-spitting
  zane:      { al: 'zanë',      en: 'mountain-fairy' }, // the Zana: fierce mountain nymph
  bukura:    { al: 'Bukura',    en: 'the Beauty' },// E Bukura e Dheut
  dragua:    { al: 'dragua',    en: 'dragon-hero' },// the Drangue
  trim:      { al: 'trim',      en: 'hero', forms: [
    { al: 'trim',   tag: 'indefNom', gloss: 'a hero' },
    { al: 'trimi',  tag: 'defNom',   gloss: 'the hero' },
    { al: 'trimin', tag: 'defAcc',   gloss: 'the hero (object)' },
    { al: 'trimit', tag: 'defDat',   gloss: 'to/of the hero' },
    { al: 'trima',  tag: 'plIndef',  gloss: 'heroes' },
    { al: 'trimat', tag: 'plDef',    gloss: 'the heroes' },
  ] },
  shqiponje: { al: 'shqiponjë', en: 'eagle' },
  tiger:     { al: 'tigër',     en: 'tiger', forms: [
    { al: 'tigër',  tag: 'indefNom', gloss: 'a tiger' },
    { al: 'tigri',  tag: 'defNom',   gloss: 'the tiger' },
    { al: 'tigrit', tag: 'defDat',   gloss: 'to/of the tiger' },
  ] },
  furre:     { al: 'furrë',     en: 'oven', forms: [
    { al: 'furrë',  tag: 'indefNom', gloss: 'an oven' },
    { al: 'furra',  tag: 'defNom',   gloss: 'the oven' },
    { al: 'furrës', tag: 'defDat',   gloss: 'to/of the oven' },
  ] },
  gjethe:    { al: 'gjethe',    en: 'leaves' },
  sqep:      { al: 'sqep',      en: 'beak', forms: [
    { al: 'sqep',   tag: 'indefNom', gloss: 'a beak' },
    { al: 'sqepi',  tag: 'defNom',   gloss: 'the beak' },
    { al: 'sqepin', tag: 'defAcc',   gloss: 'the beak (object)' },
  ] },
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
  vrime:     { al: 'vrimë',     en: 'hole' },
  bote:      { al: 'botë',      en: 'world' },
  kala:      { al: 'kala',      en: 'castle' },
  qytet:     { al: 'qytet',     en: 'city' },   // the dead cavern-city of the hoard (Durham, High Albania)
  treg:      { al: 'treg',      en: 'market' }, // its ghostly bazaar of fine wares
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
  eger:      { al: 'egër',      en: 'wild' },
  morra:     { al: 'morra',     en: 'lice' },
  digjet:    { al: 'digjet',    en: 'is burned' },
  verber:    { al: 'verbër',    en: 'blind' },
  berber:    { al: 'berber',    en: 'barber' },
  top:       { al: 'top',       en: 'cannon' },
  gjysme:    { al: 'gjysmë',    en: 'half' },
  // --- items ---
  buke:      { al: 'bukë',      en: 'bread' },
  mish:      { al: 'mish',      en: 'meat' },
  peshk:     { al: 'peshk',     en: 'fish' },   // a ware in the dead city's bazaar (Durham)
  qengj:     { al: 'qengj',     en: 'lamb' },
  kashte:    { al: 'kashtë',    en: 'hay' },
  kukull:    { al: 'kukull',    en: 'doll' },
  varros:    { al: 'varros',    en: 'buries' },
  balte:     { al: 'baltë',     en: 'clay' },
  brum:      { al: 'brumë',     en: 'dough' },
  thuper:    { al: 'thupër',    en: 'switch' },
  gjalpe:    { al: 'gjalpë',    en: 'butter' },
  karkanxholl: { al: 'karkanxholl', en: 'iron-clad revenant' }, // kallikantzaros-kin, prowls the 12 nights
  troket:    { al: 'troket',    en: 'knocks', forms: [{ al: 'trokasin', tag: '3plPres', gloss: 'knock' }] },
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
  aga:       { al: 'aga',       en: 'aga', forms: [
    { al: 'agat', tag: 'plDef', gloss: 'the Agas' },
    { al: 'agallarët', tag: 'plDef', gloss: 'the Agas' },
  ] },
  filxhan:   { al: 'filxhan',   en: 'cup' },
  cakmak:    { al: 'çakmak',    en: 'lighter', forms: [
    { al: 'çakmak',   tag: 'indefNom', gloss: 'a lighter' },
    { al: 'çakmaku',  tag: 'defNom',   gloss: 'the lighter' },
    { al: 'çakmakun', tag: 'defAcc',   gloss: 'the lighter (object)' },
  ] },
  shishe:    { al: 'shishe',    en: 'bottle', forms: [
    { al: 'shishe',   tag: 'indefNom', gloss: 'a bottle' },
    { al: 'shishja',  tag: 'defNom',   gloss: 'the bottle' },
    { al: 'shishen',  tag: 'defAcc',   gloss: 'the bottle (object)' },
  ] },
  cader:     { al: 'çadër',     en: 'umbrella', forms: [
    { al: 'çadër',  tag: 'indefNom', gloss: 'an umbrella' },
    { al: 'çadra',  tag: 'defNom',   gloss: 'the umbrella' },
    { al: 'çadrën', tag: 'defAcc',   gloss: 'the umbrella (object)' },
  ] },
  batanije:  { al: 'batanije',  en: 'blanket', forms: [
    { al: 'batanije',   tag: 'indefNom', gloss: 'a blanket' },
    { al: 'batanija',   tag: 'defNom',   gloss: 'the blanket' },
    { al: 'batanijen',  tag: 'defAcc',   gloss: 'the blanket (object)' },
  ] },
  sapun:     { al: 'sapun',     en: 'soap', forms: [
    { al: 'sapun',   tag: 'indefNom', gloss: 'soap' },
    { al: 'sapuni',  tag: 'defNom',   gloss: 'the soap' },
    { al: 'sapunin', tag: 'defAcc',   gloss: 'the soap (object)' },
  ] },
  mbush:     { al: 'mbush',     en: 'fill' },
  plot:      { al: 'plot',      en: 'full' },
  cete:      { al: 'çetë',      en: 'company', forms: [
    { al: 'çeta', tag: 'defNom', gloss: 'the company' },
    { al: 'çetat', tag: 'plDef', gloss: 'the companies' },
  ] },
  ndahet:    { al: 'ndahet',    en: 'splits away' },
  perkulet:  { al: 'përkulet',  en: 'bends' },
  pershperit:{ al: 'pëshpërit', en: 'whispers' },
  mepare:    { al: 'më parë',   en: 'before' },
  buzeqesh:  { al: 'buzëqesh',  en: 'smiles' },
  mbulon:    { al: 'mbulon',    en: 'covers' },
  pergjigjet:{ al: 'përgjigjet',en: 'answers' },
  thua:      { al: 'thua',      en: 'fingernail', forms: [
    { al: 'thonj', tag: 'plIndef', gloss: 'fingernails' },
    { al: 'thonjtë', tag: 'plDef', gloss: 'the fingernails' },
  ] },
  dashje:    { al: 'dashje',    en: 'intention' },
  dergon:    { al: 'dërgon',    en: 'sends' },
  con:       { al: 'çon',       en: 'leads' },
  shoqeron:  { al: 'shoqërojnë', en: 'escort' },
  kycur:     { al: 'kyçur',     en: 'locked' },
  varen:     { al: 'varen',     en: 'hang' },
  neper:     { al: 'nëpër',     en: 'through' },
  ngul:      { al: 'ngul',      en: 'drive in' },
  zhveshur:  { al: 'zhveshur',  en: 'drawn' },
  shtrihet:  { al: 'shtrihet',  en: 'lies down' },
  sofer:     { al: 'sofër',     en: 'table' },
  mesdite:   { al: 'mesditë',   en: 'noon' },
  porta:     { al: 'portë',     en: 'gate', forms: [
    { al: 'porta', tag: 'defNom', gloss: 'the gate' },
    { al: 'portën', tag: 'defAcc', gloss: 'the gate' },
  ] },
  xhami:     { al: 'xhami',     en: 'mosque' },
  tabak:     { al: 'tabak',     en: 'tanner' },   // the leather-workers; their stone bridge over the river is Ura e Tabakëve
  lekure:    { al: 'lëkurë',    en: 'leather' },
  gozhde:    { al: 'gozhdë',    en: 'nail' },
  behuri:    { al: 'Behuri',    en: 'Behuri' },
  osman:     { al: 'Osmani',    en: 'Osman', ctx: { al: 'Dizdar Osmani', en: 'Dizdar __', focus: 'Osmani' } },
  kotor:     { al: 'Kotor',     en: 'Kotor' },
  tridhjete: { al: 'tridhjetë', en: 'thirty' },
  tym:       { al: 'tym',       en: 'smoke' },
  barut:     { al: 'barut',     en: 'gunpowder' },
  fitil:     { al: 'fitil',     en: 'fuse' },
  ahur:      { al: 'ahur',      en: 'stable', forms: [{ al: 'ahurit', tag: 'defDat', gloss: 'of the stable' }] },
  kurth:     { al: 'kurth',     en: 'trap' },
  ul:        { al: 'ul',        en: 'lowers' },
  ndiej:     { al: 'ndiej',     en: 'sense' },
  dorezohem: { al: 'dorëzohem', en: 'surrender' },
  rrethoj:   { al: 'rrethoj',   en: 'surround' },
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
  dhemb:     { al: 'dhemb',      en: 'hurts' },
  skuqem:    { al: 'skuqem',     en: 'blush' },
  nejse:     { al: 'nejse',       en: 'anyway' },
  shaka:     { al: 'shaka',       en: 'joke' },
  beso:      { al: 'beso',      en: 'trust' },
  hyr:       { al: 'hyr',       en: 'enter' },
  dil:       { al: 'dil',       en: 'leave' },
  thirr:     { al: 'thirr',     en: 'call' },
  hidh:      { al: 'hidh',      en: 'throw' },
  kthehu:    { al: 'kthehu',    en: 'return' },
  prek:      { al: 'prek',      en: 'touch' },
  fryj:      { al: 'fryj',      en: 'blow' },
  shuaj:     { al: 'shuaj',     en: 'extinguish' },
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
  mungon:    { al: 'mungon',    en: 'is missed' },
  marto:     { al: 'martohet',  en: 'marries' },
  mallko:    { al: 'mallkon',   en: 'curses' },
  le:        { al: 'lë',        en: 'leaves' },  // lë = sets down / leaves behind
  grua:      { al: 'grua',      en: 'woman' },  // grua = woman / wife
  unaze:     { al: 'unazë',     en: 'ring' },   // the portrait-ring Tanusha knows Halil by
  fytyre:    { al: 'fytyrë',    en: 'face' },
  dru:       { al: 'dru',       en: 'wood' },   // Sari Salltëk's wooden sword
  mushkonje: { al: 'mushkonjë', en: 'mosquito' }, // the serpent's spy in the swallow fable
  bisht:     { al: 'bisht',     en: 'tail' },   // an animal's tail
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
  xhind:     { al: 'Xhind',     en: 'night-spirit' }, // the invisible threshold/water spirit
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
  po_turn:   { al: 'po',        en: 'and', ctx: { al: 'mirë, po ti?', en: 'fine, __ you?', focus: 'po' } }, // turns the same question back: “and/how about…?”
  a_q:       { al: 'a',         en: 'do', ctx: { al: 'a vjen?', en: '__ you come?', focus: 'a' } }, // yes/no question particle
  nuk:       { al: 'nuk',       en: 'not' },
  une:       { al: 'unë',       en: 'I' },
  mua:       { al: 'mua',       en: 'me' },   // object form of unë — used in reported speech
  per:       { al: 'për',       en: 'for', enAll: 'for / about' },
  // --- folklore: the night branches ---
  shtrige:   { al: 'shtrigë',   en: 'witch' },     // the Shtriga, a vampiric night-witch
  ora:       { al: 'Ora',       en: 'fate-spirit' }, // the Ora, a personal fate-spirit
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
  i_obj:     { al: 'i',         en: 'to him', ctx: { al: 'i thotë krajlit', en: 'says __ to the Krajl', focus: 'i' } },
  e_conj:    { al: 'e',         en: 'and', ctx: { al: 'Mujo e Halili', en: 'Mujo __ Halili', focus: 'e' } }, // conjunction (folk/epic register, = dhe)
  jo:        { al: 'jo',        en: 'not' },
  pa:        { al: 'pa',        en: 'without', enAll: 'without / and then' }, // folk chains: «pa e lajmë, pa e presim…»
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
  do:        { al: 'do',        en: 'wants', ctx: { al: 'gjarpri do ar', en: 'the serpent __ gold', focus: 'do' } }, // dua also = love — glossed 'loves' at Halili's declaration (mujo2)
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
  zog:       { al: 'zog',       en: 'chick', enAll: 'chick / bird' }, // the needle turns the princess into one
  // --- the storm of Baba Tomor (the Drangue's lightning) ---
  rrufe:     { al: 'rrufe',     en: 'thunderbolt' },
  re:        { al: 're',        en: 'cloud' },
  ere:       { al: 'erë',       en: 'wind', enAll: 'wind / smell' }, // erë = wind AND smell
  mjegull:   { al: 'mjegull',   en: 'mist' },   // the Buna fog that opens Kuteli's Rozafa legend
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
  bolla:     { al: 'bolla',     en: 'serpent-dragon' }, // the serpent that becomes a Kulshedra
  gardh:     { al: 'gardh',     en: 'hedge' },
  litar:     { al: 'litar',     en: 'cord', enAll: 'cord / rope' },
  zambak:    { al: 'zambak',    en: 'lily' },
  vese:      { al: 'vesë',      en: 'dew' },
  gurezohet: { al: 'gurëzohet', en: 'turns to stone' },
  kuror:     { al: 'kurorë',    en: 'crown' },
  mbreteri:  { al: 'mbretëri',  en: 'kingdom' },
  huaj:      { al: 'huaj',      en: 'foreign' },
  prove:     { al: 'provë',     en: 'test' },
  provo:     { al: 'provo',     en: 'attempt' },
  keshille:  { al: 'këshillë',  en: 'counsel' },
  vdekje:    { al: 'vdekje',    en: 'death' },
  gurezuar:  { al: 'gurëzuar',  en: 'petrified' },
  shengjergj:{ al: 'Shëngjergj',en: 'St George' },// Shëngjergji, when the Bolla opens its eyes
  kurre:     { al: 'kurrë',     en: 'never' },
  katallan:  { al: 'katallan',  en: 'one-eyed giant' }, // the Albanian Polyphemus
  godit:     { al: 'godit',     en: 'strike', forms: [
    { al: 'godet', tag: '3sgPres', gloss: 'strikes' },
    { al: 'godasin', tag: '3plPres', gloss: 'strike' },
    { al: 'goditi', tag: '3sgPast', gloss: 'struck' },
  ] },
  verbo:     { al: 'verbo',     en: 'blind' },   // verbo syrin — put out the eye
  gjak:      { al: 'gjak',      en: 'blood' },   // gjakmarrja / falja e gjakut
  dy:        { al: 'dy',        en: 'two' },
  bar:       { al: 'bar',       en: 'herb' },    // the Ora's healing mountain herb
  tre:       { al: 'tre',       en: 'three' },
  shurdhi:   { al: 'Shurdhi',   en: 'Shurdhi' }, // the northern storm-god of hail and thunder
  hekur:     { al: 'hekur',     en: 'iron' },   // bang iron to rouse/ward the storm-god
  hekurt:    { al: 'hekurt',    en: 'iron' },   // adjectival form: derë e hekurt
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
  mehill:    { al: 'Mëhill',    en: 'Michael' },
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
  kap:       { al: 'kap',       en: 'catches' },
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
  pe:        { al: 'pe',        en: 'thread' },   // the red protective thread (pe i kuq) worked into the charm
  zili:      { al: 'zili',      en: 'envy' },     // the envious gaze behind the syri i keq
  udhetar:   { al: 'udhëtar',   en: 'traveller' }, // travellers in the oda whose tales point to other realms
  gjysmegjel:{ al: 'gjysmëgjel',en: 'half-rooster' }, // Gjysmëkokoshi, hero of the children's tale
  gjel:      { al: 'gjel',      en: 'rooster' },  // the village dawn-crier (root of gjysmëgjel)
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
  si:        { al: 'si',        en: 'how', enAll: 'how / as' },
  pra:       { al: 'pra',       en: 'so' },
  keshtu:    { al: 'kështu',    en: 'thus' },
  gjithe:    { al: 'gjithë',    en: 'all' },
  gjitheve:  { al: 'të gjithëve', en: 'everyone' },
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
  lule:      { al: 'lule',      en: 'flower' },
  kishe:     { al: 'kishë',     en: 'church' },    // #2510
  prift:     { al: 'prift',     en: 'priest' },    // #3152
  mulli:     { al: 'mulli',     en: 'mill' },      // the water-mill (concrete village institution)
  miell:     { al: 'miell',     en: 'flour' },     // what the mill makes
  // --- Maro Përhitura (the xhindet's night mill — Pralla 1954, pp. 100–110) ---
  njerke:    { al: 'njerkë',    en: 'stepmother' },
  drithe:    { al: 'drithë',    en: 'grain' },      // what the household carries to the mill
  li:        { al: 'li',        en: 'flax' },       // #2212 — the litany's thread
  furke:     { al: 'furkë',     en: 'distaff' },    // Maro asks for it before the night mill
  tjerr:     { al: 'tjerr',     en: 'spin' },       // (imperative: tirr)
  flori:     { al: 'flori',     en: 'gold coin' },  // #6087 — the xhindet's gilding (ar = the metal)
  mbjell:    { al: 'mbjell',    en: 'sow' },        // the flax litany, first of the chain
  mbledh:    { al: 'mbledh',    en: 'gather' },
  ve:        { al: 'vë',        en: 'put' },
  laj:       { al: 'laj',       en: 'wash' },       // #5410
  pres:      { al: 'pres',      en: 'cut' },        // #514 — the litany's shears
  tremb:     { al: 'tremb',     en: 'frighten' },   // #4851 — «mos u tremb» (the njerka's send-off)
  rroba:     { al: 'rroba',     en: 'clothes' },    // #1688 — rags vs the golden clothes
  thes:      { al: 'thes',      en: 'sack' },       // #5297 — the grain sack on Maro's back
  varfer:    { al: 'varfër',    en: 'poor' },       // the njerka's house, Maro's rags
  kjo:       { al: 'kjo',       en: 'this' },       // fem. (Maro's answer: «kjo ka shumë mundim»)
  mundim:    { al: 'mundim',    en: 'toil' },       // #5657 — «gjë që ka shumë mundim», the litany's key
  plas:      { al: 'plas',      en: 'burst' },      // #3409 — Lilo's curse «u plasshin sytë»
  shtrember: { al: 'shtrembër', en: 'crooked' },    // what the xhindet make of the rude
  qaj:       { al: 'qaj',       en: 'weep' },       // #2195
  // --- Acts III–IV: the dream-prince, the coach, the needle-bird ---
  enderr:    { al: 'ëndërr',    en: 'dream' },      // #1228 — the prince measures his bride in one
  princ:     { al: 'princ',     en: 'prince' },     // #3841
  kungull:   { al: 'kungull',   en: 'pumpkin' },    // #13058 — the coach
  karroce:   { al: 'karrocë',   en: 'coach' },      // #4999
  mesnate:   { al: 'mesnatë',   en: 'midnight' },   // #5167 — the aunt's deadline
  kepuce:    { al: 'këpucë',    en: 'shoe' },       // #2741 — cut to the dream's measure
  han:       { al: 'han',       en: 'roadside inn' }, // #3025 — the prince's feast-han by the crossroads
  gjej:      { al: 'gjej',      en: 'find' },       // #298
  heq:       { al: 'heq',       en: 'pull out' },   // #942 — the needle from the bird's head
  dritare:   { al: 'dritare',   en: 'window', forms: [
    { al: 'dritare',  tag: 'indefNom', gloss: 'a window' },
    { al: 'dritarja', tag: 'defNom',   gloss: 'the window' },
    { al: 'dritaren', tag: 'defAcc',   gloss: 'the window (object)' },
  ] },     // #2712 — the bird at the window
  gjilpere:  { al: 'gjilpërë',  en: 'needle' },     // #11766 — the stepmother's hundred-lira weapon
  ciu:       { al: 'ciu',       en: 'cheep' },      // the bird-cry: «ciu ciu, djal' i mëmës»
  mami:      { al: 'mami',      en: 'midwife' },    // #279 — the bribed one at the birth
  lajm:      { al: 'lajm',      en: 'news' },       // #1760 — the prince's feast reaches the village
  magjistare: { al: 'magjistare', en: 'sorceress', forms: [
    { al: 'magjistare',  tag: 'indefNom', gloss: 'a sorceress' },
    { al: 'magjistarja', tag: 'defNom',   gloss: 'the sorceress' },
    { al: 'magjistaren', tag: 'defAcc',   gloss: 'the sorceress (object)' },
  ] }, // the aunt's secret craft (≠ shtriga, the night-witch)
  teto:      { al: 'teto',      en: 'auntie' },     // the mother's sister — Maro's one kind door
  maro:      { al: 'Maro',      en: 'Maro' },       // the tale's drudge-daughter (Maro Përhitura)
  lilo:      { al: 'Lilo',      en: 'Lilo' },       // the njerka's elder daughter
  lena:      { al: 'Lena',      en: 'Lena' },       // the njerka's younger daughter
  // --- top-150 spoken-frequency fill: the commonest everyday words a learner
  //     meets constantly (pronouns, quantifiers, deixis). Ranks from the
  //     OpenSubtitles sq_50k list; see scripts/freqrank.mjs.
  ne_we:     { al: 'ne',        en: 'we' },        // #29  (distinct from ne='në'=in)
  me_more:   { al: 'më',        en: 'more', ctx: { al: 'më i madh', en: '__ big (bigger)', focus: 'më' } }, // #8 (comparative; shares 'më' with me_obj)
  disa:      { al: 'disa',      en: 'some' },       // #116
  ndonje:    { al: 'ndonjë',    en: 'any' },        // #114
  gjitha:    { al: 'gjitha',    en: 'all' },        // #115 (të gjitha)
  pas:       { al: 'pas',       en: 'after', enAll: 'after / behind / beyond' }, // #118 — behind: the sun sets "pas malit"
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
  // --- the kafene (coffee-house) scene, home of the relocated everyday-talk vignettes ---
  kafene:     { al: 'kafene',      en: 'coffee-house' },
  qoshe:      { al: 'qoshe',       en: 'corner' },
  qesh:       { al: 'qesh',        en: 'laughs' },
  // --- quote-harvest 2026-07-17: words carried by verbatim folk Q-lines ---
  pikon:     { al: 'pikon',    en: 'drips' },
  dhe_gave:  { al: 'dhe',      en: 'gave', ctx: { al: 'ti më dhe besën', en: 'you __ me the oath', focus: 'dhe' } },  // aorist 2sg of jap (you gave)
  yne:       { al: 'ynë',      en: 'our' },
  besnik:    { al: 'besnik',   en: 'faithful' },
  qenke:     { al: 'qenke',    en: 'you have been' },
  shpetim:   { al: 'shpëtim',  en: 'escape' },
  fatkeqesi: { al: 'fatkeqësi', en: 'disaster' },
  mbyt:      { al: 'mbyt',     en: 'drowns' },
  krijoj:    { al: 'krijoj',   en: 'creates' },
  dredh:     { al: 'dredh',    en: 'dodge' },
  vrafte:    { al: 'vraftë',   en: 'may he slay' },
  mjeri:     { al: 'mjeri',    en: 'woe is me' },
  sokol:     { al: 'sokol',    en: 'falcon' },
  ua:        { al: 'ua',       en: 'to them' },
  shembet:   { al: 'shembet',  en: 'collapses' },
  lidh:      { al: 'lidh',     en: 'bind' },
  fe:        { al: 'fe',       en: 'faith' },
  prish:     { al: 'prish',    en: 'break' },
  // --- beautify-pass 2026-07-16: high-frequency additions proposed by the writer fan-out ---
  teje:      { al: 'teje',       en: 'you' },
  fryme:     { al: 'frymë',      en: 'breath' },
  embel:     { al: 'ëmbël',      en: 'sweet' },
  shesh:     { al: 'shesh',      en: 'square' },
  pyet:      { al: 'pyet',       en: 'asks' },
  gjume:     { al: 'gjumë',      en: 'sleep' },
  hapur:      { al: 'hapur',       en: 'open' },
  diku:      { al: 'diku',       en: 'somewhere' },
  prane:     { al: 'pranë',      en: 'beside' },
  pergjithmone: { al: 'përgjithmonë', en: 'forever' },
  faj:       { al: 'faj',        en: 'fault' },
  lufte:     { al: 'luftë',     en: 'war' },       // #691
  betohem:   { al: 'betohem',   en: 'vow' },       // #742 (betohem)
  djalosh:    { al: 'djalosh',     en: 'lad' },
  natenmire:  { al: 'natën e mirë',en: 'good night' },
  mirupafshim:{ al: 'mirupafshim', en: 'goodbye' },
  mireseerdhe: { al: 'mirë se erdhe', en: 'welcome', forms: [{ al: 'mirë se erdhët', tag: '2plPast', gloss: 'welcome' }] },
  // --- modern conversational core: arranging ordinary life ---
  nisem:      { al: 'nisem',      en: 'set off' },
  takohem:    { al: 'takohem',    en: 'meet' },
  mbaroj:     { al: 'mbaroj',     en: 'finish' },
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
  lodhur:     { al: 'lodhur',      en: 'tired' },     // the hearts ladder — "ti je i lodhur" at 2 ♥ (HEART_LEVELS)
  pushim:     { al: 'pushim',      en: 'rest' },      // "do pushim" — wants rest (hearts ladder)
  shendoshe:  { al: 'shëndoshë',   en: 'healthy' },   // shëndoshë e mirë — hale and hearty (full ♥)
  // --- about yourself & controlling language ---
  quhem:      { al: 'quhem',       en: 'am called' },
  elira:      { al: 'Elira',        en: 'Elira' },
  vonohem:    { al: 'vonohem',      en: 'am late' },
  me_vone:    { al: 'më vonë',      en: 'later' },
  ane:        { al: 'anë',          en: 'side' },
  matane:     { al: 'matanë',       en: 'across' },
  gezohem:    { al: 'gëzohem',      en: 'am pleased' },
  heret:      { al: 'herët',        en: 'early' },
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
  pasdite:    { al: 'pasdite',     en: 'afternoon' },
  pranvere:   { al: 'pranverë',    en: 'spring' },
  vjeshte:    { al: 'vjeshtë',     en: 'autumn' },
  dimer:      { al: 'dimër',       en: 'winter' },
  bore:       { al: 'borë',        en: 'snow' },
  stuhi:      { al: 'stuhi',       en: 'storm' },
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
  paster:     { al: 'pastër',      en: 'clean', enAll: 'clean / clear' },
  kanal:      { al: 'kanal',       en: 'channel', forms: [
    { al: 'kanal', tag: 'indefNom', gloss: 'a channel' },
    { al: 'kanali', tag: 'defNom', gloss: 'the channel' },
    { al: 'kanalin', tag: 'defAcc', gloss: 'the channel (object)' },
  ] },
  burim:      { al: 'burim',       en: 'spring', forms: [
    { al: 'burim', tag: 'indefNom', gloss: 'a spring' },
    { al: 'burimi', tag: 'defNom', gloss: 'the spring' },
    { al: 'burimin', tag: 'defAcc', gloss: 'the spring (object)' },
  ] },
  jeto:       { al: 'jeto',        en: 'live' },
  burrneshe:  { al: 'burrneshë',   en: 'sworn virgin' }, // the Kanun's vajza e betuar
  // --- living customs (city-quarter + wedding vignettes) ---
  raki:       { al: 'raki',        en: 'grape brandy' }, // the fruit brandy of welcome
  gezuar:     { al: 'gëzuar',      en: 'cheers', enAll: 'cheers / happy' },
  ditelindje: { al: 'ditëlindje',  en: 'birthday' },
  dasme:      { al: 'dasmë',       en: 'wedding' },
  shenje:     { al: 'shenjë',      en: 'sign' },
  force:      { al: 'forcë',       en: 'force' },
  denoj:      { al: 'dënon',       en: 'sentences' },
  djeg:       { al: 'djeg',        en: 'burn', enAll: 'burn' },
  shkelqen:   { al: 'shkëlqen',    en: 'shines' },
  perqafon:   { al: 'përqafon',    en: 'embraces' },
  pranga:     { al: 'pranga',      en: 'shackles', forms: [
    { al: 'pranga', tag: 'plIndef', gloss: 'shackles' },
    { al: 'prangat', tag: 'plDef', gloss: 'the shackles' },
  ] },
  balle:      { al: 'ballë',        en: 'brow' },
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
  nereida:    { al: 'Nereida',     en: 'Nereida' },      // the forest-nymph of the Prespa legend
  prespa:     { al: 'Prespa',      en: 'Prespa' },       // the lake that drowned the town
  argjiro:    { al: 'Argjiro',     en: 'Argjiro' },      // the princess of Gjirokastër
  gjirokaster:{ al: 'Gjirokastër', en: 'Gjirokastër' },  // the city named for her
  osmani:     { al: 'Osmani',      en: 'Osmani', ctx: { al: 'Arnaut Osmani', en: 'Arnaut __', focus: 'Osmani' } }, // the captive kreshnik
  ali:        { al: 'Ali',         en: 'Ali' },          // Ali the standard-bearer
  zjerma:     { al: 'Zjerma',      en: 'Zjerma' },       // the elder twin
  handa:      { al: 'Handa',       en: 'Handa' },        // the younger twin
  bardhakuqja:{ al: 'Bardhakuqja', en: 'Bardhakuqja' }, // the river-king's daughter; not E Bukura e Dheut
  barkulku:   { al: 'Barkulku',    en: 'Wolfbelly' },    // the false claimant in Binoshët
  aliPasha:   { al: 'Ali Pasha',   en: 'Ali Pasha' },    // the Lion of Ioannina
  zadran:     { al: 'Zadran',      en: 'Zadran' },       // the Slav who kills Halili
  zuku:       { al: 'Zuku',        en: 'Zuku' },         // Zuku Bajraktar
  // --- the Bridge of Arta (the Çam walled-bride ballad, Rozafa's southern twin) ---
  arta:       { al: 'Arta',        en: 'Arta' },         // the town on the Arachthos, in Çamëria
  kico:       { al: 'Kiço',        en: 'Kiço' },         // the youngest brother-mason — the player's mold
  pano:       { al: 'Pano',        en: 'Pano' },         // the middle brother
  mihal:      { al: 'Mihal',       en: 'Mihal' },        // the eldest brother, Mihal Guri
  dridhet:    { al: 'dridhet',     en: 'trembles' },     // her curse: të dridhesh si dridhem unë
  fik:        { al: 'fik',         en: 'fig' },          // the white fig of her dying wish
  argjend:    { al: 'argjend',     en: 'silver' },       // the silver spring from the wall
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
// inline forms. Generated by scripts/gen_forms.mjs with explicit overrides.
for (const [id, forms] of Object.entries(NOUN_FORMS)) DICT[id].forms = forms
