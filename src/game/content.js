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
  ne:        { al: 'në',        en: 'in', enAll: 'in / on / to' },
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
  i_art:     { al: 'i',         en: 'the', ctx: { al: 'i uritur', en: '__ hungry', focus: 'i' } },  // adjectival article
  i_link:    { al: 'i',         en: 'of',  ctx: { al: 'syri i gjarprit', en: 'the eye __ the serpent', focus: 'i' } },   // masculine linking article
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
  kulshedra: { al: 'kulshedra', en: 'she-dragon' }, // the Kulshedra: multi-headed, fire-spitting
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
  qytet:     { al: 'qytet',     en: 'city' },   // the dead cavern-city of the hoard (Durham, High Albania)
  treg:      { al: 'treg',      en: 'market' }, // its ghostly bazaar of fine wares
  pishtar:   { al: 'pishtar',   en: 'torch' },  // made from the forest fire; light for the dark cavern
  mur:       { al: 'mur',       en: 'wall' },
  hije:      { al: 'hije',      en: 'shadow' },
  dite:      { al: 'ditë',      en: 'day' },
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
  krah:      { al: 'krah',      en: 'wing' },    // the dragua's wings under the arms
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
  bije:      { al: 'bijë',      en: 'daughter' },// E Bija e Hënës dhe e Diellit
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
  si:        { al: 'si',        en: 'how' },
  pra:       { al: 'pra',       en: 'so' },
  keshtu:    { al: 'kështu',    en: 'thus' },
  gjithe:    { al: 'gjithë',    en: 'all' },
  pak:       { al: 'pak',       en: 'a little' },
  para:      { al: 'para',      en: 'before' },
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
  me_more:   { al: 'më',        en: 'more' },      // #8   (comparative "më i madh")
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
}

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
  return { id, al, en: en ?? DICT[id].en }
}
export const p = (en) => ({ en, paren: true })

// shorthand: build a token line from a compact spec
const L = (...tokens) => tokens

// Conditional story lines — a node.text entry is normally a token line (array), but
// when()/unless() make a line appear only if the player HAS / LACKS a given item or
// companion. This lets a scene react to what walks with you: e.g. with the wolf, a
// hostile encounter resolves "the wolf attacks them" instead of the neutral default.
export const when = (itemId, line) => ({ cond: itemId, line })
export const unless = (itemId, line) => ({ cond: itemId, negate: true, line })
export const lineOf = (entry) => (Array.isArray(entry) ? entry : entry.line)
// the lines actually shown for a node, given has(itemId) -> bool
export const visibleLines = (node, has) =>
  node.text.filter((e) => Array.isArray(e) || (e.negate ? !has(e.cond) : has(e.cond))).map(lineOf)

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
  // The Call comes in the wild: you are a hungry traveller benighted in the
  // forest, the village a far glimmer of light. Rest here, light a fire against
  // the dark, or make for the lamps — each a real choice that follows from the
  // scene, and sleeping in the woods (not in a town) now leads coherently to the
  // wolf in the night. You carry no bread yet; that is earned at the village.
  start: {
    id: 'start',
    text: [
      L(w('ti'), w('ec'), w('ne'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('eshte'), w('naten'), p(','), w('erret'), w('dhe'), w('ftohte'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.')),
      L(w('larg'), w('nje'), w('fshat'), w('ka'), w('drite'), p('.')),
      L(w('nje'), w('rruge'), wf('shko', 'shkon', 'goes'), wf('ne', 'në', 'to'), w('fshat'), p('.')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'on'), w('rruge')), to: 'udhekryq' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
      { text: L(w('ndiz'), w('nje'), w('zjarr')), to: 'zjarriPyll' },
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
      L(w('nje'), w('trim'), w('eshte'), w('larg'), w('nente'), wf('vit', 'vjet', 'years'), w('dhe'), w('nente'), wf('dite', 'ditë', 'days'), p('.')),
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
      'A child too openly admired, the old people warn, draws the syri i keq — the evil eye, the envious or even the loving gaze that sickens what it praises. So a wise mouth says "mashallah" over a fair child, and a wise hand hangs garlic, or a blue bead, or a thread of red, to turn the eye aside; a little of the praiser’s own spittle breaks it too. You hung the garlic, and the child’s fever broke. Never praise a child, a bride, or a fat lamb without a charm — the eye does not mean to harm, and harms all the same.',
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
      'A hungry traveller came to your fire and you set bread before him without being asked — for in the old country the guest is sent by God, and the house belongs first to God and the guest. He ate, and blessed your house and your hand; and that blessing is worth more than the loaf, for it is the besa of hospitality, kept. The opposite of the woman who became the tortoise: she who gives bread keeps her own roof, and her name.',
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
      'You hid your bread from a hungry guest and turned him from the door — and that, the grandmothers say, is how the first tortoise was made: a stingy wife who would not give a crust to a traveller (some say to God in a beggar’s shape) was cursed to wear her baking-pan upon her back and carry her house with her wherever she goes, slow and shut-in, for all of time. So the breshkë answers the old riddle — "a packsaddle, but no donkey" — and so the inhospitable are remembered. Bread refused is a roof lost.',
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
      L(wf('trim', 'trimi', 'the hero'), wf('mban', 'mban', 'keeps'), wf('bese', 'besën', 'the besa'), w('dhe'), w('kthehu'), w('larg'), p('.')),
      L(wf('mbret', 'mbreti', 'the king'), w('fal'), wf('trim', 'trimin', 'the hero'), p('.')),
    ],
    options: [],
  },

  pylli1: {
    id: 'pylli1',
    text: [
      L(w('ti'), w('ec'), w('ne'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('eshte'), w('erret'), w('dhe'), w('thate'), p('.')),
      L(w('tre'), wf('vella', 'vëllezër', 'brothers'), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
      L(w('nje'), w('dervish'), w('dhe'), w('nje'), w('arushe'), wf('rri', 'rrinë', 'stay'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylliThelle', reveal: 'pyll' },
      { text: L(w('fol'), w('me'), wf('vella', 'vëllezërit', 'the brothers')), to: 'kordha1', reveal: 'vella' },
      { text: L(w('fol'), w('me'), wf('dervish', 'dervishin', 'the dervish')), to: 'arushe1', reveal: 'arushe' },
      { text: L(w('ik'), w('shpejt')), to: 'pylliLoop' },
    ],
  },

  pylliThelle: {
    id: 'pylliThelle',
    text: [
      L(w('ne'), w('pyll'), w('vjen'), w('nje'), w('ujk'), p('.')),
      L(wf('ujk', 'ujku', 'the wolf'), w('eshte'), w('i_art'), w('uritur'), p('.')),
      unless('buke', L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.'))),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'shokuUjk', reveal: 'uritur' },
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
      { text: L(w('ec'), w('me'), wf('ujk', 'ujkun', 'the wolf')), grant: 'ujk', to: 'udheNate' },
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
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
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
      'You took your hand from the gold and stepped back, and the Stihi lowered her many heads and let the fire die in her throat. A Stihi — from stuhí, the storm — is a fire-breathing she-dragon set over a hoard; her treasure is no more for the taking than the lightning is, and the only ones who leave her cave are the ones who leave it empty-handed. You went out alive into the cool of the forest: the wisest wealth, by that fire, was the wealth you did not reach for.',
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
      L(w('nje'), w('kapidan'), wf('vrit', 'vrau', 'killed'), wf('halil', 'Halilin', 'Halili'), p('.')),
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
      'The most famous of all the frontier songs: a Slav captain killed young Halili by treachery, and his elder brother Mujo of Jutbina would not rest while the blood lay unanswered. He hunted the captain down and cut him to the ground over Halili’s own grave, so the debt was paid where the boy lay buried. In the highland code a brother’s blood, treacherously spilled, is the one debt that must be answered — and the lahutë has sung Mujo’s vengeance for five hundred years.',
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
      L(wf('aga', 'agat', 'the agas'), wf('rri', 'rrinë', 'stand'), w('larg'), p('.')),
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
      'You beat the Krajl’s champion in fair single combat, and when he fell and asked your besa you gave it — and a besa, in the highland code, is sacred even to a sworn enemy. The man who rode out to kill you rode home alive under your word, and by that word a foe became a friend: among the kreshniks the deepest brotherhoods are the ones sworn across the battle-line. A besa given binds harder than blood.',
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
      'You stood with the men and beat your brow in the gjâmë — the stylized death-wail of the Albanian highlands, the men ranged in a line crying the dead man’s deeds — while the women raised the sung vajtim, the lament that is the oldest rite the Illyrians left carved on their grave-stones. To mourn rightly is itself a besa kept with the dead; and in the old country they even kept "the funeral of the Sun’s Mother," Nëna e Diellit, weeping for her each year so the Sun would rise again. You gave the fallen man his due, and the mountains carried the cry.',
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
      L(wf('lume', 'lumi', 'the river'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('maja'), p(','), w('poshte'), w('eshte'), wf('det', 'deti', 'the sea'), p('.')),
      L(w('por'), w('ti'), w('sheh'), w('nje'), w('zane'), p('.')),
      L(w('nje'), w('gjarper'), w('fle'), w('ne'), wf('lume', 'lumë', 'the river'), p('.')),
      L(w('larg'), w('nje'), w('plak'), w('flet'), wf('per', 'për', 'about'), w('ar'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('liqen'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('zane', 'zanën', 'the fairy')), to: 'zana1', reveal: 'zane' },
      { text: L(w('kerko'), wf('gjarper', 'gjarprin', 'the serpent')), to: 'bolla1', reveal: 'gjarper' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'fshehur', reveal: 'ar' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('det')), to: 'deti1', reveal: 'det' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('liqen')), to: 'flocka1', reveal: 'liqen' },
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
    ],
    options: [
      { text: L(wf('bej', 'bëj', 'make'), w('nje'), w('feste')), to: 'veraDiteFund', reveal: 'feste' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
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
      'In the lakes and the hidden mountain tarns, the old people say, live the Floçka — water-maidens named for their long flowing hair, who do not know human speech until a mortal teaches it to them. You sat by the water and taught her your words, one by one, until she could answer. In the old tales a Floçka is caught and kept by a man, bound to his house by a besa and silent for years, and the day the oath is broken she takes back what bound her and slips beneath the water again. You bound her with nothing — you only gave her speech — and so she helped you freely and went as she came. Of all the powers in these mountains, she is the one you win not by the sword but by a word.',
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
      L(wf('lume', 'lumi', 'the river'), w('vjen'), wf('ne', 'në', 'to'), w('det'), p('.')),
      L(wf('det', 'deti', 'the sea'), w('eshte'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('thelle'), p('.')),
      L(w('poshte'), wf('thote', 'thonë', 'they say'), w('rri'), w('bukura'), w('e_link'), wf('det', 'detit', 'the sea'), p('.')),
      L(w('nje'), w('fshat'), w('eshte'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('fshat')), to: 'bregu', reveal: 'det' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('det')), to: 'detiThelle1', reveal: 'thelle' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  // THE DEEP — the descent to e Bukura e Detit's palace, guarded by the storm of the
  // Kuçedra e Detit (the sea-dragon of shipwrecks). Fight it and drown; swim past it.
  detiThelle1: {
    id: 'detiThelle1',
    text: [
      L(w('ti'), w('zbrit'), wf('ne', 'në', 'to'), w('det'), p('.')),
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
      'e Bukura e Detit — the Beauty of the Sea, sister of the Earthly Beauty, the sea-fairy of beauty and danger and mystery. You did not seize her gold nor force her hand; you took a single strand of her golden hair, as the old tales teach, and by that gentlest of claims she was bound to you — a faithful wife who rose with you out of the deep into the light. The sea yields up its Beauty only to the hand that will not grab.',
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
      L(wf('zane', 'zana', 'the fairy'), w('thote'), p(':')),
      L(w('ti'), w('je'), w('nje'), w('dragua'), p('.')),
      L(w('ti'), w('ke'), wf('krah', 'krahë', 'wings'), p('.')),
      L(w('ti'), w('ke'), w('nje'), w('zemer'), w('e_link'), w('ar'), p('.')),
    ],
    options: [
      { text: L(w('beso'), wf('zane', 'zanën', 'the fairy')), to: 'zanaProva', reveal: 'dragua' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
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
      L(wf('kripe', 'kripa', 'the salt'), w('eshte'), w('per'), wf('shtrige', 'shtrigën', 'the witch')),
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
      L(wf('mal', 'mali', 'the mountain'), w('eshte'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('erret'), p('.')),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('maja'), w('e_art'), w('shenjte'), p('.')),
      L(w('nje'), w('shpelle'), w('eshte'), w('ketu'), p('.')),
      L(w('nje'), w('peri'), w('rri'), w('ketu'), p('.')),
    ],
    options: [
      { text: L(w('ngjit'), wf('mal', 'malin', 'the mountain')), to: 'mali2', reveal: 'mal' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('maja')), to: 'qiell1', reveal: 'shenjte' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'katallan1', reveal: 'shpelle' },
      { text: L(w('fol'), w('me'), wf('peri', 'Perinë', 'the fairy')), to: 'peri1', reveal: 'peri' },
      { text: L(w('zbrit'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
    ],
  },

  mali2: {
    id: 'mali2',
    text: [
      L(w('nje'), w('dragua'), wf('lufto', 'lufton', 'fights'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
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
      L(w('ti'), w('ngjit'), w('lart'), p('.')),
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
      L(w('nje'), w('mbret'), w('flet'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('mbret', 'mbretin', 'the king')), to: 'kalaVllezer' },
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
      'You went down into the world below, where the Kulshedra had coiled around the springs and held E Bukura e Dheut in the dark — and you did what the old songs promise of a dragua: you broke the drought. The water ran red, then clean, up through every well to the dying villages above, and you climbed back into the light. There is no crown and no king’s daughter waiting — only your own fshat, its wells brimming and its children alive. But that is the whole of it, and it is enough: for a hundred years they will sing your name at the spring.',
    text: [
      L(w('ti'), wf('vrit', 'vrate', 'killed'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), w('dhe'), wf('shpeto', 'shpëtove', 'saved'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('ti'), w('kthehu'), wf('ne', 'në', 'to'), w('fshat'), p('.')),
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('tani'), p('.')),
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
      'There was no meat left, and the eagle would not fly without it — so you drew your knife across your own thigh and fed the great bird your own flesh, as the youngest brother does in the old tale, borne up by a falcon he feeds piece by piece from his own leg. Wing-beat by wing-beat it bore you up the black shaft toward the daylight. You reach the living world torn and limping, but you reach it — alive, scarred, and not forgotten. Some buy their way out of the underworld with gold; you bought yours with your body.',
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
  // made at the forest fire, zjarriPyll) or shpellaHyrje shows only blackness and the sole
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
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave')), to: 'shpellaHyrje' },
      { text: L(w('ec'), w('larg')), to: 'thesarLeave' },
    ],
  },

  // The cave mouth — pitch dark. Durham: you go down with a torch or you see nothing.
  // No torch -> the only way on is back out. The torch is made at the forest fire (zjarriPyll).
  shpellaHyrje: {
    id: 'shpellaHyrje',
    text: [
      L(w('ti'), w('zbrit'), wf('ne', 'në', 'to'), wf('shpelle', 'shpellën', 'the cave'), p('.')),
      unless('pishtar', L(w('brenda'), w('eshte'), w('erret'), p('.'))),
      unless('pishtar', L(w('ti'), w('nuk'), w('sheh'), p('.'))),
      when('pishtar', L(wf('pishtar', 'pishtari', 'the torch'), w('jep'), w('drite'), p('.'))),
      when('pishtar', L(w('ti'), w('sheh'), w('nje'), w('qytet'), w('te_link'), w('vjeter'), p('.'))),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('qytet')), requires: 'pishtar', to: 'qyteti', reveal: 'qytet' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
    ],
  },

  // Exploring the dead city: no man lives here (Durham), but the bazaar still stands,
  // stocked with the finest wares. The hoard's guardian only stirs at the gold (thesar2).
  qyteti: {
    id: 'qyteti',
    text: [
      L(w('ti'), w('ec'), wf('ne', 'në', 'in'), w('qytet'), p('.')),
      L(w('ketu'), w('nuk'), w('rri'), w('njeri'), p('.')),
      L(w('por'), w('ketu'), w('eshte'), w('nje'), w('treg'), p('.')),
      L(wf('treg', 'tregu', 'the market'), w('ka'), w('ar'), p(','), w('mish'), p(','), w('peshk'), p(','), wf('peme', 'pemë', 'fruit'), w('dhe'), wf('rrobe', 'rroba', 'clothes'), p('.')),
      L(w('por'), w('sot'), w('nje'), w('udhetar'), w('vjen'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'qytetiUdhetar', reveal: 'udhetar' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('treg', 'tregun', 'the market')), to: 'thesar2', reveal: 'treg' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
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
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumë', 'the river')), to: 'lumi' },
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
      'You cut down the guardian serpent and the gold of the dead city was yours — but that serpent was a vitore, a golden house-snake, an Ora in beast-shape set over the cavern bazaar to watch the hoard. A greedy family killed just such a serpent once before, to seize at a stroke the gold it laid them coin by coin; their house burned and their line failed, and now their doom was yours, for gold taken over a guardian’s body never comes clean. You dug your hundred wells and the village drank — yet the water ran brackish, the cattle sickened, and at night a cold hiss followed you. Some treasures are guarded for a reason.',
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
      L(w('ti'), w('bie'), wf('poshte', 'poshtë', 'down'), p('.')),
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
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('ora', 'Orës', 'to the Ora')), requires: 'buke', consumes: 'buke', to: 'oraBardhe' },
      { text: L(w('degjo'), wf('ora', 'Orën', 'the spirit')), to: 'oraVerdhe' },
      { text: L(w('ik'), wf('ne', 'në', 'to'), w('erresire')), to: 'oraZeze', reveal: 'erresire' },
    ],
  },

  oraBardhe: {
    id: 'oraBardhe',
    end: 'good',
    title: 'Led Home by your Ora',
    blurb:
      'Lost in the dark, you met one of the three Fates — as Albanian families meet them at a cradle, setting out bread so the fates bless and not curse. She came to you as e Bardha, the White, the one who deals out good fortune; she led you out of the dark and home, alive.',
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

  // === the forest loop (where fleeing sends you) ==========================
  // pylliLoop — THE FOREST, the wild district's hub. Tomorr's holy peak shows far
  // above the trees (a persistent landmark, glimpsed from many districts). Make a
  // fire, wander deeper and get lost, sleep — or leave for the crossroads.
  pylliLoop: {
    id: 'pylliLoop',
    text: [
      L(w('ti'), w('je'), w('perseri'), w('ne'), w('pyll'), p('.')),
      L(w('eshte'), w('erret'), w('dhe'), w('ftohte'), p('.')),
      L(wf('lart', 'lart', 'high'), w('larg'), w('eshte'), w('maja'), w('e_art'), w('shenjte'), p('.')),
      L(w('naten'), wf('degjo', 'dëgjon', 'you hear'), w('nje'), w('valle'), p('.')),
      L(w('larg'), w('nje'), wf('shpelle', 'shpellë', 'cave'), w('nxjerr'), w('zjarr'), p('.')),
      L(w('nje'), w('dhelpra'), w('dhe'), w('nje'), w('ujk'), wf('ka', 'kanë', 'have'), w('gjalpe'), p('.')),
    ],
    options: [
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('udhekryq')), to: 'udhekryq' },
      { text: L(w('ndiz'), w('nje'), w('zjarr')), to: 'zjarriPyll' },
      { text: L(w('ec'), w('ne'), w('valle')), to: 'shtojzovalle1', reveal: 'valle' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('shpelle')), to: 'stihi1', reveal: 'shpelle' },
      { text: L(w('sheh'), wf('dhelpra', 'dhelprën', 'the fox')), to: 'dhelpra1', reveal: 'dhelpra' },
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'humbur', reveal: 'pyll' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
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
      'The Shtojzovalle — "may God increase their dance" — are the airy ones, the half-seen fairies who come out under the moon to sing and turn in their ring, and who spin out the thread of every human life. You stepped into their round; and the old people could have warned you — whoever joins the dance of the fairies dances on. You turn yet beneath that moon, beautiful and tireless and no longer quite a man, while the years you were meant to live spool away in another’s hands.',
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
      'There is one way to keep a Shtojzovalle, the old tales hold: give her clothes of your own to wear, and she will stay. You laid your shirt across her shoulders, and the airy maiden came home with you — a wife out of the moonlight, who spins good fortune into the house so long as you never raise hand or voice to her. The fairy-wife is kept by gentleness, or she is not kept at all.',
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
  zjarriPyll: {
    id: 'zjarriPyll',
    text: [
      L(wf('zjarr', 'zjarri', 'the fire'), w('eshte'), w('i_art'), w('madh'), p('.')),
      unless('pishtar', L(w('nga'), wf('zjarr', 'zjarri', 'the fire'), w('ti'), wf('bej', 'bën', 'make'), w('nje'), w('pishtar'), p('.'))),
      L(w('naten'), w('vjen'), w('nje'), w('plake'), w('e_art'), w('ftohte'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('eshte'), w('nje'), wf('mik', 'mik', 'guest'), p('.')),
      L(wf('mik', 'miku', 'guest'), w('eshte'), w('i_art'), w('shenjte'), p('.')),
      L(wf('plake', 'plaka', 'the old woman'), w('do'), w('buke'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'besaBekim', reveal: 'buke' },
      { text: L(w('bej'), w('pishtar')), grant: 'pishtar', unless: 'pishtar', to: 'pylliLoop', reveal: 'pishtar' },
      { text: L(w('prit'), w('ketu')), to: 'shtrigaNate' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  shtrigaNate: {
    id: 'shtrigaNate',
    text: [
      L(w('naten'), wf('plake', 'plaka', 'the old woman'), w('behet'), w('nje'), w('shtrige'), p('.')),
      L(wf('shtrige', 'shtriga', 'the witch'), w('do'), wf('gjak', 'gjakun', 'the blood'), w('e_link'), wf('femije', 'fëmijës', 'the child'), p('.')),
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
      when('ujk', L(wf('ujk', 'ujku', 'the wolf'), w('rri'), w('me'), w('ti'), p('.'))),
      unless('buke', L(w('ti'), w('je'), w('i_art'), w('uritur'), p('.'))),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', grant: 'ujk', unless: 'ujk', to: 'shokuUjk', reveal: 'uritur' },
      { text: L(w('zgjohu'), w('dhe'), w('ik')), to: 'pylliLoop' },
      { text: L(w('lufto'), wf('ujk', 'ujkun', 'the wolf')), unless: 'ujk', to: 'eaten', reveal: 'ujk' },
    ],
  },

  // === extra journey nodes (depth) ========================================
  fshatiDil: {
    id: 'fshatiDil',
    text: [
      L(w('ti'), w('ec'), wf('ne', 'në', 'on'), w('nje'), w('rruge'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('pyll'), w('te_link'), w('madh'), p('.')),
      L(w('dy'), wf('njeri', 'njerëz', 'people'), wf('lufto', 'luftojnë', 'fight'), w('per'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('ne'), w('pyll')), to: 'pylli1', reveal: 'pyll' },
      { text: L(w('ndihmo'), wf('njeri', 'njerëzit', 'the people')), to: 'gjak1', reveal: 'gjak' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the road')), to: 'gjizar1' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
    ],
  },

  ura: {
    id: 'ura',
    text: [
      L(w('ti'), w('je'), wf('ne', 'në', 'on'), w('nje'), w('ure'), p('.')),
      L(wf('lume', 'lumi', 'the river'), w('poshte'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(w('nje'), w('plak'), w('thote'), w('nje'), w('gjegjeza'), p('.')),
    ],
    options: [
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'uraFshaj', reveal: 'ure' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'riddle1', reveal: 'gjegjeza' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  maja: {
    id: 'maja',
    text: [
      L(w('ti'), w('je'), wf('lart', 'lart', 'high'), wf('ne', 'në', 'on'), w('mal'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('plak'), w('te_link'), w('vjeter'), p('.')),
      L(w('larg'), wf('rri', 'rrinë', 'stand'), wf('kulle', 'kullat', 'the towers'), w('e_link'), w('jutbina'), p('.')),
      L(w('larg'), w('eshte'), w('nje'), w('mal'), w('tjeter'), p('.')),
      L(wf('rreze', 'rrezet', 'the rays'), w('e_link'), wf('diell', 'diellit', 'the Sun'), wf('bie', 'bien', 'fall'), wf('ne', 'në', 'on'), w('maja'), p('.')),
    ],
    options: [
      { text: L(w('ec'), w('mbi'), wf('rreze', 'rrezet', 'the rays')), to: 'diellShtepi1', reveal: 'rreze' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'majaEagle', reveal: 'plak' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina', reveal: 'jutbina' },
      { text: L(w('sheh'), wf('mal', 'malet', 'the mountains')), to: 'shpirag1' },
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
      L(wf('burre', 'burrat', 'the men'), wf('bej', 'bëjnë', 'make'), wf('gjeme', 'gjëmën', 'the death-wail'), w('per'), w('nje'), w('trim'), p('.')),
      L(w('rusha'), w('rri'), wf('ne', 'në', 'in'), wf('kulle', 'kullën', 'the tower'), w('e_link'), wf('krajl', 'krajlit', 'the Krajl'), p('.')),
      L(wf('krajl', 'krajli', 'a Krajl'), w('merr'), wf('mujo', 'Mujon', 'Mujo'), p('.')),
      L(w('nje'), w('kapidan'), w('do'), w('nje'), w('mejdan'), p('.')),
    ],
    options: [
      { text: L(w('ndihmo'), w('mujo')), to: 'mujo1', reveal: 'mujo' },
      { text: L(w('ndihmo'), wf('trim', 'trimin', 'the hero')), to: 'zuku1', reveal: 'trim' },
      { text: L(w('kerko'), wf('zane', 'zanat', 'the Zanas')), to: 'zana1', reveal: 'zane' },
      { text: L(w('kerko'), w('fuqi')), to: 'mujiZana1', reveal: 'fuqi' },
      { text: L(wf('bej', 'bëj', 'make'), wf('gjeme', 'gjëmën', 'the death-wail')), to: 'vajtim1', reveal: 'gjeme' },
      { text: L(w('merr'), wf('rusha', 'Rushën', 'Rusha')), to: 'rusha1', reveal: 'rusha' },
      { text: L(w('ndihmo'), w('halil')), to: 'halil1', reveal: 'krajl' },
      { text: L(w('dil'), wf('ne', 'në', 'to'), w('mejdan')), to: 'mejdan1', reveal: 'mejdan' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('maja')), to: 'maja' },
    ],
  },

  // === MUJI'S STRENGTH-ORIGIN — the tale the kreshnik cycle presupposes ========
  mujiZana1: {
    id: 'mujiZana1',
    text: [
      L(w('naten'), w('nje'), w('gur'), w('i_art'), w('madh'), w('eshte'), w('ketu'), p('.')),
      L(w('ketu'), wf('je', 'janë', 'are'), w('dy'), wf('djep', 'djepe', 'cradles'), p('.')),
      L(w('dy'), w('femije'), wf('ka', 'kanë', 'have'), w('lot'), p('.')),
    ],
    options: [
      { text: L(w('tund'), wf('djep', 'djepet', 'the cradles')), to: 'mujiZana2', reveal: 'djep' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('jutbina')), to: 'jutbina' },
    ],
  },

  mujiZana2: {
    id: 'mujiZana2',
    text: [
      L(w('dy'), w('zane'), w('vjen'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), wf('je', 'janë', 'are'), w('nene'), p('.')),
      L(wf('zane', 'zanat', 'the Zanas'), w('thote'), p(':')),
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
      'This is how Mujo of Jutbina came by his strength, and how you came by yours: in the night you found two cradles by a great stone, two infants crying, and you rocked them till dawn though no one had asked you. Their mothers were Zana — the wild mountain-fairies — and for your kindness they let you choose among all gifts; you asked for strength, and they gave you their own breast to suckle. You rose able to lift the very stone you had slept beside, and the Zana are your sworn sisters now, who stand unseen at your shoulder in every fight. So the old songs say Mujo did, long before you.',
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

  udhaKthimit: {
    id: 'udhaKthimit',
    text: [
      L(w('ti'), w('ec'), wf('ne', 'në', 'on'), w('nje'), w('rruge'), p('.')),
      L(wf('bote', 'bota', 'the world'), w('ka'), w('uje'), w('tani'), p('.')),
      L(w('ti'), w('sheh'), w('nje'), w('kala'), p('.')),
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
      'By night the serpent shed its skin and stood a young man, and begged you never to tell. You kept faith and never betrayed him — but the secret slipped out all the same, as it always does in the old tale, and a Kulshedra carried him off beyond the sea. Because you had never wronged him you could follow: you walked the world asking the sun, the moon and the wind where he was, the wind pointed past the water, and there you outwitted the Kulshedra and brought him home a man for good. In this tale it is never silence that frees the snake-husband — it is the long, faithful search after he is lost. (From the Snake and the King’s Daughter.)',
    text: [
      L(w('ti'), w('mashtro'), wf('kulshedra', 'kulshedrën', 'the she-dragon'), p('.')),
      L(w('ti'), w('gjen'), wf('njeri', 'njeriun', 'the person'), p('.')),
      L(w('ti'), w('jep'), w('nje'), w('unaze'), p('.')),
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
      L(wf('nene', 'nena', 'the mother'), w('thote'), p(':')),
      L(w('nje'), w('bir'), wf('premto', 'premton', 'swears'), w('nje'), w('bese'), p('.')),
      L(w('i_art'), w('gjalle'), w('ose'), w('i_art'), wf('vdes', 'i vdekur', 'dead'), p(','), w('une'), w('sjell'), wf('bije', 'bijën', 'the daughter'), p('.')),
      L(wf('bije', 'bija', 'the daughter'), w('marto'), w('larg'), p('.')),
      L(w('por'), wf('bir', 'bijtë', 'the sons'), wf('vdes', 'vdesin', 'die'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nenën', 'the mother')), to: 'kostandin2', reveal: 'nene' },
      { text: L(w('ndihmo'), wf('nene', 'nenën', 'the mother')), to: 'kostandinPushim' },
      { text: L(w('ec'), wf('ne', 'në', 'to'), w('fshat')), to: 'fshatiBesa' },
    ],
  },

  kostandin2: {
    id: 'kostandin2',
    text: [
      L(wf('nene', 'nëna', 'the mother'), w('mallko'), wf('bir', 'birin', 'the son'), p('.')),
      L(wf('bir', 'biri', 'the son'), wf('zgjohu', 'zgjohet', 'wakes'), p('.')),
      L(wf('bir', 'biri', 'the son'), w('vjen'), w('nga'), w('varr'), p('!')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nenën', 'the mother')), to: 'kostandin3', reveal: 'nene' },
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
      'A son had sworn his mother a besa — dead or alive, he would bring her far-married daughter Doruntine home whenever she wished — and then he and all his brothers died in the war. At the lonely mother’s curse the dead Kostandin rose from his grave as a lugat, a revenant, and rode the night roads to keep his word: he found Doruntine at the Easter round-dance, set her on his horse, and brought her to the door — she half-seeing the grave-earth on his shoulders. He left her at the threshold and rode back to his grave. When mother and daughter spoke the truth aloud — that the dead brother had kept his besa — both fell dead in the same breath. There is no oath in the old country so strong that the grave itself can break it.',
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
      { text: L(w('ndihmo'), wf('nene', 'nenën', 'the mother')), to: 'bleta1', reveal: 'nene' },
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
      L(w('tomor'), w('dhe'), w('shpirag'), wf('lufto', 'luftojnë', 'fight'), w('per'), wf('bukura', 'Bukurën', 'the Beauty'), p('.')),
      L(w('tomor'), w('ka'), w('nje'), w('kose'), p('.')),
      L(w('shpirag'), w('ka'), w('nje'), w('shkop'), p('.')),
      L(wf('bukura', 'Bukura', 'the Beauty'), w('vdes'), w('dhe'), wf('lot', 'lotët', 'the tears'), wf('behet', 'bëhen', 'become'), w('nje'), w('lume'), p('.')),
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
      L(w('ketu'), w('eshte'), w('nje'), w('kulle'), p('.')),
      L(wf('ne', 'në', 'in'), w('kulle'), w('nje'), w('trim'), w('ka'), w('nente'), w('plage'), p('.')),
      L(w('nje'), w('motra'), w('jep'), w('uje'), wf('trim', 'trimit', 'to the hero'), p('.')),
      L(wf('flok', 'flokët', 'the hair'), w('e_link'), wf('motra', 'motrës', 'the sister'), wf('ka', 'kanë', 'have'), w('gjak'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('motra', 'motrën', 'the sister')), to: 'balozMotra', reveal: 'motra' },
      { text: L(w('fle'), w('ketu')), to: 'bregFle' },
    ],
  },

  balozMotra: {
    id: 'balozMotra',
    text: [
      L(wf('motra', 'motra', 'the sister'), w('thote'), p(':')),
      L(w('nente'), wf('vit', 'vjet', 'years'), wf('trim', 'trimi', 'the hero'), w('rri'), wf('ne', 'në', 'in'), w('kulle'), p('.')),
      L(w('une'), w('jam'), wf('vetem', 'vetëm', 'alone'), w('me'), wf('trim', 'trimin', 'the hero'), p('.')),
      L(w('nente'), wf('vit', 'vjet', 'years'), w('une'), w('jep'), w('uje'), w('dhe'), w('buke'), wf('trim', 'trimit', 'to the hero'), p('.')),
      L(w('une'), wf('vajto', 'vajtoj', 'mourn'), wf('trim', 'trimin', 'the hero'), p('.')),
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
      { text: L(w('tund'), wf('djep', 'djepin', 'the cradle')), to: 'zanaProva2', reveal: 'femije' },
      { text: L(w('ik'), w('shpejt')), to: 'lumiHumbur' },
    ],
  },

  zanaProva2: {
    id: 'zanaProva2',
    text: [
      L(w('naten'), w('mbaroi'), w('dhe'), w('vjen'), w('dite'), p('.')),
      L(wf('zane', 'zana', 'the fairy'), w('vjen'), w('dhe'), w('thote'), p(':')),
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
      'By the boulder the Zanas offered you what they once offered the young Mujo — wealth, knowledge, or a hero’s strength. You reached for the gold. You went home the richest man in the valley, but no dragua — and the Kulshedra kept the water, for only a hero’s strength could ever have freed it.',
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
      'By the boulder the Zanas offered you wealth, knowledge, or a hero’s strength, and you chose knowledge. You went home the wisest man in the valley — wise enough, at last, to understand exactly why only a dragua’s strength could have broken the drought, and that you had held that very choice in your hand and let it pass. Some gifts are a quiet kind of grief.',
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
      L(wf('shqiponje', 'shqiponja', 'the eagle'), w('do'), w('buke'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke')), requires: 'buke', consumes: 'buke', to: 'ngjitja3', reveal: 'buke' },
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
      { text: L(w('ngjit'), wf('pus', 'pusin', 'the well')), to: 'siperfaqja' },
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
      L(w('nje'), w('pus'), w('eshte'), w('i_art'), w('thate'), p('.')),
      L(wf('femije', 'fëmijët', 'the children'), wf('bej', 'bëjnë', 'make'), w('nje'), w('dordolec'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('shtepi'), w('dhe'), w('nje'), w('oda'), p('.')),
      L(w('nje'), w('rruge'), wf('shko', 'shkon', 'goes'), w('larg'), p('.')),
      L(w('sot'), wf('fshat', 'fshati', 'the village'), wf('bej', 'bën', 'makes'), w('nje'), w('feste'), p('.')),
      L(wf('vajze', 'vajzat', 'the girls'), wf('bej', 'bëjnë', 'make'), w('nje'), w('kukull'), w('balte'), p('.')),
      L(w('nje'), w('rruge'), wf('zbrit', 'zbret', 'goes down'), wf('poshte', 'poshtë', 'down'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river'), p('.')),
      L(w('nje'), w('plak'), w('rri'), w('ketu'), w('dhe'), wf('shiko', 'shikon', 'looks'), w('ti'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('plak', 'plakun', 'the old man')), to: 'sheshiPlak', reveal: 'plak' },
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('shtepi')), to: 'plaka', reveal: 'shtepi' },
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('oda')), to: 'oda1', reveal: 'oda' },
      { text: L(w('ndihmo'), wf('femije', 'fëmijët', 'the children')), to: 'dordolec1', reveal: 'dordolec' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pus')), to: 'pusiThate', reveal: 'thate' },
      { text: L(wf('bej', 'bëj', 'make'), w('nje'), w('feste')), to: 'veraDite1', reveal: 'feste' },
      { text: L(w('ndihmo'), wf('vajze', 'vajzat', 'the girls')), to: 'nenaDiell1', reveal: 'kukull' },
      { text: L(w('zbrit'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi', reveal: 'lume' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes' },
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
      { text: L(w('prit'), w('naten')), to: 'xhind1', reveal: 'xhind' },
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
      'On the mountain you met a Peri — one of the white-clad fairies of the heights, close to but distinct from the warlike Zana. The perí prize bread above all things and watch how mortals treat it: you broke yours and gave a share to the hungry fairy, and for that she let her grace fall on you, the road open and her good will, which is worth having and dangerous to lose. Honour your bread, and the white fairies honour you.',
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

  // === NËNA E DIELLIT — the funeral of the Sun's Mother (spring renewal) ======
  nenaDiell1: {
    id: 'nenaDiell1',
    text: [
      L(wf('vajze', 'vajzat', 'the girls'), wf('bej', 'bëjnë', 'make'), w('nje'), w('kukull'), w('balte'), p('.')),
      L(wf('kukull', 'kukulla', 'the doll'), w('eshte'), wf('nene', 'Nëna', 'Mother'), w('e_link'), wf('diell', 'Diellit', 'the Sun'), p('.')),
      L(wf('vajze', 'vajzat', 'the girls'), wf('kendo', 'këndojnë', 'sing'), w('dhe'), wf('vajto', 'vajtojnë', 'weep'), p('.')),
    ],
    options: [
      { text: L(w('varros'), wf('nene', 'Nënën', 'the Mother'), w('e_link'), wf('diell', 'Diellit', 'the Sun')), to: 'nenaDiellFund', reveal: 'kukull' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
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
      'In the dead of the twelve dark nights between Christmas and Epiphany, the karkanxholl walks — a small iron-shirted revenant, kin to the Greek kallikantzaros, dragging its chains through the snow. It knocks, and it calls the sleepers by name; whoever answers it is cursed or carried off. You held your tongue and gave it nothing, and at cock-crow it went back into the dark. (Only a dhampir, the child such a creature fathers, can see one and fight it; the rest of us keep silent and keep the door barred.)',
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
      'You believed her — the butter was on the wolf’s own mouth, after all — and the wolf was driven off a thief while the fox licked her whiskers. So it goes in the tales of Kuma Lisa: she eats the winter store, blames her trusting partner, and the credulous take her side every time. No one died; but a guiltless beast was wronged, and somewhere a fox is laughing.',
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
      'The Krajl took Muji of Jutbina and threw him in a tower, and for once the elder kreshnik could not free himself — so Halili, the swift, hot‑blooded younger brother who lives forever in Muji’s shadow, rode alone into the Krajl’s land, broke into the prison, fought his way through, and carried his brother home. In the most famous song it is the elder Muji who avenges the younger Halili; but the highland lays also tell it the other way, when Muji is taken and only Halili can bring him back — a kreshnik in his own right at last.',
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
      L(w('ti'), w('ec'), w('mbi'), wf('rreze', 'rrezet', 'the rays'), w('e_link'), wf('diell', 'diellit', 'the Sun'), p('.')),
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
      L(wf('liber', 'libri', 'the book'), w('thote'), p(':'), w('rri'), w('zgjuar'), w('tre'), wf('naten', 'net', 'nights'), p('.')),
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
      L(w('ti'), w('ec'), wf('rruge', 'rrugës', 'the lane'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('kulle'), w('te_link'), wf('lart', 'lart', 'high'), p('.')),
      L(w('nje'), w('njeri'), w('rri'), w('brenda'), p('.')),
      L(w('ketu'), wf('rri', 'rrinë', 'stand'), wf('shtepi', 'shtëpitë', 'the homes'), p('.')),
      L(wf('ne', 'në', 'in'), w('nje'), w('shtepi'), w('nje'), w('djep'), w('ka'), w('nje'), w('femije'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('pallat'), w('i_art'), w('zi'), p('.')),
      L(wf('ne', 'në', 'in'), w('pallat'), wf('vajze', 'vajzat', 'the girls'), wf('luan', 'luajnë', 'plays'), wf('ne', 'në', 'in'), w('nje'), w('kopsht'), w('mermer'), p('.')),
      L(w('nje'), w('kishe'), w('rri'), wf('lart', 'lart', 'high'), w('mbi'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(w('nje'), w('rruge'), wf('zbrit', 'zbret', 'goes down'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river'), p('.')),
    ],
    options: [
      { text: L(w('hyr'), wf('ne', 'në', 'to'), w('kulle')), to: 'kulle1', reveal: 'kulle' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('shtepi')), to: 'fshatiJeta', reveal: 'shtepi' },
      { text: L(w('sheh'), wf('djep', 'djepin', 'the cradle')), to: 'djepi1', reveal: 'djep' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('pallat')), to: 'pallatiZi', reveal: 'pallat' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('kopsht')), to: 'kopshtMermer1', reveal: 'mermer' },
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
      L(w('e_art'), wf('bardhe', 'Bardha', 'White'), w('jep'), w('bekim'), p('.')),
    ],
    options: [
      { text: L(w('jep'), w('buke'), wf('ora', 'Orave', 'to the Fates')), to: 'djepiFund', reveal: 'bekim' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes' },
    ],
  },

  djepiFund: {
    id: 'djepiFund',
    end: 'secret',
    title: 'The Three Fates at the Cradle',
    blurb:
      'On the third night after a child is born, the old people say, the three fate-women — the Fatí, the northern Orë — come to the cradle to settle its whole life: e Bardha, the White, deals out good fortune; e Verdha, the Yellow, ill luck; e Zeza, the Black, the hour of death. So the house is swept and bread set out for them, that they go away pleased and bless the newborn rather than curse it. You kept the custom — laid out the bread — and the White Fate smiled on the cradle; the child will carry a white-faced Ora at its shoulder all its days, and meet its share of luck.',
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
      L(w('ketu'), wf('rri', 'rrinë', 'stand'), wf('shtepi', 'shtëpitë', 'the homes'), p('.')),
      L(w('nje'), w('vatra'), w('eshte'), w('ketu'), p('.')),
      L(w('nje'), w('nene'), wf('bej', 'bën', 'makes'), w('nje'), w('qilim'), p('.')),
      L(w('nje'), w('bari'), wf('rri', 'rri', 'sits'), w('me'), wf('dhi', 'dhitë', 'goats'), p('.')),
      L(w('nje'), w('gjysmegjel'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('femije'), w('eshte'), w('i_art'), w('bukur'), p('.')),
      L(w('nje'), w('grua'), wf('bej', 'bën', 'bakes'), w('buke'), p('.')),
      L(wf('poshte', 'poshtë', 'below'), wf('shko', 'shkon', 'goes'), w('nje'), w('rruge'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('vatra')), to: 'vatra', reveal: 'vatra' },
      { text: L(w('degjo'), wf('nene', 'nënën', 'the woman')), to: 'qilim', reveal: 'qilim' },
      { text: L(w('ndihmo'), w('bari')), to: 'bariu', reveal: 'bari' },
      { text: L(w('ndihmo'), w('gjysmegjel')), to: 'gjysmegjel1', reveal: 'gjysmegjel' },
      { text: L(w('sheh'), wf('femije', 'fëmijën', 'the child')), to: 'syriKeq1', reveal: 'femije' },
      { text: L(wf('bej', 'bëj', 'bake'), w('buke')), to: 'breshka1', reveal: 'buke' },
      { text: L(w('zbrit'), wf('tek', 'te', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi', reveal: 'lume' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
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
    ],
    options: [
      { text: L(w('degjo'), wf('bari', 'bariun', 'the shepherd')), to: 'fshatiJeta', reveal: 'bari' },
      { text: L(w('kthehu')), to: 'fshatiJeta' },
    ],
  },

  // FOLK TALE — Gjysmëkokoshi, the Half-Rooster: the king seized his coin, so the
  // half-bird sets off to the palace, swallowing helpers to win it back.
  gjysmegjel1: {
    id: 'gjysmegjel1',
    text: [
      L(w('nje'), w('gjysmegjel'), w('rri'), w('ketu'), p('.')),
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
      'Gjysmëkokoshi, the Half-Rooster — one leg, one wing, half a bird and all of him cunning — is the hero of the oldest Albanian children’s tale. When the king seized the coin he had found, he set off crowing to the palace, and on the road he swallowed whole a frog, a fox, a wolf and a mouse, carrying them in his belly. At court the king tried to be rid of him, and one by one he loosed them: the frog, whose pondful of water drowned the fire they lit beneath him; the wolf among the king’s horses; the fox among the king’s geese; and the mouse to gnaw open the gold-chest — out of which the Half-Rooster swallowed back his coin and a bellyful more, and hopped home crowing. The smallest and the half-made outwits the mighty: so the grandmothers tell it by the hearth.',
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
      'You carried the besa between the towers and did what the Kanun honours above revenge — falja e gjakut, the forgiving of blood. The man who had not stepped out of his kullë in years, for fear of the gun, walked into the lane a free man, and two families that had been counting their dead stopped counting. A life taken can never be given back; but the blood can be forgiven, and the old people know that is the harder and the higher thing.',
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
      L(w('naten'), w('vjen'), p('.')),
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
      L(wf('nene', 'nena', 'the mother'), w('ka'), w('nje'), w('femije'), w('te_link'), w('vogel'), p('.')),
      L(wf('mur', 'muri', 'the wall'), w('merr'), wf('nene', 'nenën', 'the mother'), wf('ne', 'në', 'in'), w('gur'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nenën', 'the mother')), to: 'kalaGji', reveal: 'nene' },
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
      'Out of the eclipse came E Bija e Hënës dhe e Diellit — the drop of the sky, the lightning-daughter of the Moon and the Sun, a star on her brow and a moon on her breast. Her bolt split the dark and struck the crowned head from the Kulshedra; the Sun she had freed climbed back into heaven, and the rain fell on a world made new.',
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
      { text: L(w('shko'), wf('ne', 'në', 'to'), wf('lume', 'lumën', 'the river')), to: 'udhaSyri', reveal: 'lume' },
      { text: L(w('kerko'), wf('lubia', 'lubinë', 'the she-hydra')), to: 'lubia1', reveal: 'lubia' },
      { text: L(w('degjo'), wf('ujk', 'ujkun', 'the wolf')), requires: 'ujk', to: 'ujkuUje' },
      { text: L(w('fle'), w('ketu')), to: 'gjumi' },
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
      L(w('eshte'), w('erret'), p('.')),
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
      L(wf('fshat', 'fshati', 'the village'), w('ka'), w('uje'), w('perseri'), p('.')),
    ],
    options: [],
  },

  udhaSyri: {
    id: 'udhaSyri',
    text: [
      L(w('nje'), w('plak'), w('jep'), w('nje'), w('gomar'), w('me'), w('zjarr'), wf('gjarper', 'gjarprit', 'to the serpent'), p('.')),
      L(wf('gjarper', 'gjarpri', 'the serpent'), w('ha'), w('gomar'), w('dhe'), w('vdes'), p('.')),
      L(wf('sy', 'syri', 'the eye'), w('i_link'), wf('gjarper', 'gjarprit', 'the serpent'), w('bie'), w('dhe'), w('behet'), w('uje'), p('.')),
    ],
    options: [
      { text: L(w('pi'), w('uje')), to: 'syriFund', reveal: 'uje' },
      { text: L(w('ik'), w('shpejt')), to: 'ura' },
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
      L(w('ti'), w('kalo'), wf('ure', 'urën', 'the bridge'), p('.')),
    ],
    options: [
      { text: L(w('kalo'), wf('ure', 'urën', 'the bridge')), to: 'lumi', reveal: 'ure' },
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
      L(w('ti'), w('ngjit'), w('lart'), p('.')),
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
      L(wf('qen', 'qeni', 'the dog'), w('ka'), w('tre'), w('koke'), p('.')),
      L(wf('qen', 'qeni', 'the dog'), w('nuk'), w('fle'), p('.')),
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
      L(wf('toke', 'toka', 'the ground'), w('nuk'), w('eshte'), w('e_art'), w('thate'), p('.')),
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
      L(w('ketu'), w('nje'), w('nene'), w('kerko'), w('nje'), w('femije'), p('.')),
      L(wf('nene', 'nena', 'the mother'), w('eshte'), w('e_art'), wf('keq', 'keqe', 'bad'), p('.')),
      when('ora', L(wf('ora', 'Ora', 'the Ora'), w('thote'), p(':'), wf('nene', 'nena', 'the mother'), w('eshte'), wf('nene', 'nëna', 'the mother'), w('e_link'), wf('naten', 'natës', 'the night'), p('.'))),
      when('ujk', L(wf('ujk', 'ujku', 'the wolf'), wf('sulmo', 'sulmon', 'attacks'), wf('nene', 'nenën', 'the mother'), p('.'))),
      when('ujk', L(wf('nene', 'nena', 'the mother'), wf('ik', 'ikën', 'flees'), p('.'))),
    ],
    options: [
      { text: L(w('ndihmo'), wf('nene', 'nenën', 'the mother')), unless: 'ujk', to: 'nenaShtrige', reveal: 'nene' },
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
      L(wf('nene', 'nena', 'the mother'), w('eshte'), wf('nene', 'nëna', 'the mother'), w('e_link'), wf('naten', 'natës', 'the night'), p('.')),
      L(wf('naten', 'nata', 'the night'), w('te_obj'), w('merr'), p('.')),
      L(w('loja'), w('mbaroi'), p('.')),
    ],
    options: [],
  },

  ktheu3: {
    id: 'ktheu3',
    text: [
      L(w('ti'), w('sheh'), w('nje'), w('kala'), w('dhe'), w('nje'), w('fshat'), p('.')),
      L(w('ti'), w('je'), w('ketu'), w('perseri'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('fshat')), to: 'udhaKthimit' },
    ],
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
      L(wf('vella', 'vëllezërit', 'the brothers'), wf('bej', 'bëjnë', 'make'), w('nje'), w('mur'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('kala')), to: 'kala1', reveal: 'kala' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('fshat')), to: 'shtepia' },
    ],
  },

  kalaGji: {
    id: 'kalaGji',
    text: [
      L(wf('nene', 'nena', 'the mother'), w('thote'), p(':')),
      L(w('une'), w('jam'), w('ne'), w('mur'), p('.')),
      L(w('por'), w('gji'), p(','), w('sy'), p(','), w('dore'), w('dhe'), w('kembe'), w('rri'), w('jashte'), p('.')),
      L(w('sy'), w('sheh'), wf('femije', 'fëmijën', 'the child'), p('.')),
      L(w('dore'), w('mban'), wf('femije', 'fëmijën', 'the child'), p('.')),
      L(w('kembe'), w('tund'), wf('djep', 'djepin', 'the cradle'), p('.')),
      L(w('gji'), w('jep'), w('qumesht'), wf('femije', 'fëmijës', 'to the child'), p('.')),
      L(w('qumesht'), w('rri'), w('mbi'), wf('mur', 'murin', 'the wall'), p('.')),
    ],
    options: [
      { text: L(w('degjo'), wf('nene', 'nenën', 'the mother')), to: 'kala2' },
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
    ],
    options: [
      { text: L(w('kendo'), w('me'), wf('femije', 'fëmijët', 'the children')), to: 'dordolec2', reveal: 'dordolec' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
    ],
  },

  dordolec2: {
    id: 'dordolec2',
    text: [
      L(wf('femije', 'fëmijët', 'the children'), wf('kendo', 'këndojnë', 'sing'), w('dhe'), wf('hidh', 'hedhin', 'throw'), w('uje'), p('.')),
      L(w('ti'), w('sheh'), wf('mal', 'malin', 'the mountain'), w('e_link'), wf('diell', 'diellit', 'the sun'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('mal')), to: 'dordolecFund', reveal: 'mal' },
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
      'You waited for Shëngjergj — Saint George’s Eve, the one night a Bolla unseals its eyes to look on the world and devour — and you struck before it could look on you. The old people say a Bolla left to live grows to a bullar, then sprouts wings, then becomes a Kulshedra to swallow the springs. You killed the dragon while it was still small: a drought that would have come in your grandchildren’s day will now never come at all.',
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
      L(w('ne'), wf('shpelle', 'shpellën', 'the cave'), w('rri'), w('nje'), w('katallan'), p('.')),
      L(wf('katallan', 'katallani', 'the giant'), w('ka'), w('nje'), w('sy'), p('.')),
      L(wf('katallan', 'katallani', 'the giant'), w('nuk'), w('ka'), w('gju'), p('.')),
      L(w('nje'), w('udhetar'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('zjarr'), w('rri'), w('ketu'), p('.')),
      L(w('nje'), w('gur'), w('e_art'), w('madh'), w('mbyll'), wf('dere', 'derën', 'the door'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('udhetar', 'udhëtarin', 'the traveller')), to: 'katallanRob', reveal: 'udhetar' },
      { text: L(w('sheh'), wf('zjarr', 'zjarrin', 'the fire')), to: 'katallanZjarr', reveal: 'zjarr' },
      { text: L(w('prek'), wf('gur', 'gurin', 'the stone')), to: 'katallanGur', reveal: 'gur' },
      { text: L(w('lufto'), wf('katallan', 'katallanin', 'the giant')), to: 'katallanVdes' },
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
    ],
    options: [
      { text: L(w('godit'), w('me'), w('hu')), to: 'katallanVerbim', reveal: 'hu' },
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
      'Two houses were locked in gjakmarrja — blood for blood, koka për kokë, head for head — and the road would not open until it ended. You did what the pleqësia of elders do under the Kanun: you brokered the besa, and pleaded the pardon, the falja e gjakut, until the killer and the avenger drank together and became, by the old blood-brother rite, new brothers. At Verrat e Llukës in 1990 a thousand such feuds were forgiven in a day. A besa kept is worth more than a head taken.',
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
      'You found Zuku Bajraktar — a kreshnik, one of the giant border-warriors of the old highland songs, so strong his own mother, in terror, had him blinded — stumbling sightless on the drought-cracked mountain. As an Ora once did in the old song, you healed his eyes with her mountain herb; and seeing again, he swore you his besa. Now the blinded hero rides at your side, and there is no Baloz nor Kulshedra that two such men cannot bring down.',
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
      'You heeded the old man and never set foot in the cavern. In the Gjakova tale no one has gone down to that buried city for longer than anyone can remember — the gold of an Ora is not for the taking — cursed is the house raised on a guardian\u2019s gold, the village that drinks from it sickened. You walked home poor, but clean, your fate-spirit unoffended. The old people say it is always the wise who leave the serpent\u2019s gold in the dark.',
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
      'You demanded your cauldron back. Nastradin Hoxha only spread his hands: last time it gave birth, and you pocketed the little pot gladly enough — so if a cauldron can give birth, surely it can also die. You had no answer to that, having kept the child, and you went home one cauldron poorer and one parable wiser.',
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
      { text: L(w('fle'), w('ketu')), to: 'besaFire' },
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
      L(w('ti'), wf('hyr', 'hyn', 'enter'), wf('ne', 'në', 'to'), w('nje'), w('oda'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('jep'), w('buke'), w('dhe'), w('kripe'), p('.')),
      L(w('ti'), w('je'), w('nje'), w('mik'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), w('si'), w('je'), p('?'), w('kush'), w('je'), w('ti'), p('?')),
      L(w('une'), wf('thote', 'them', 'say'), p(':'), w('une'), w('jam'), w('nje'), w('udhetar'), p('.'), w('faleminderit'), p('.')),
      L(wf('plak', 'plaku', 'the old man'), w('thote'), p(':'), wf('vjen', 'eja', 'come'), p(','), w('ha'), w('buke'), w('edhe'), w('kripe'), p('!')),
      L(w('nese'), w('ti'), w('je'), w('nje'), w('mik'), p(','), wf('plak', 'plaku', 'the old man'), w('na'), w('jep'), w('buke'), p('.')),
      L(w('tani'), w('eshte'), wf('ne', 'në', 'in'), w('rregull'), p('.')),
      L(w('ketu'), wf('rri', 'rrinë', 'rest'), wf('udhetar', 'udhëtarë', 'travellers'), p('.')),
      L(w('ketu'), w('rri'), w('nje'), w('liber'), p('.')),
    ],
    options: [
      { text: L(w('ha'), w('buke')), to: 'oda2', reveal: 'mik' },
      { text: L(w('degjo'), wf('udhetar', 'udhëtarët', 'the travellers')), to: 'udhetaret', reveal: 'udhetar' },
      { text: L(w('degjo'), wf('plak', 'plakun', 'the old man')), to: 'odaPlak', reveal: 'plak' },
      { text: L(w('sheh'), wf('liber', 'librin', 'the book')), to: 'libriDiell', reveal: 'liber' },
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
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('nuk'), w('ka'), w('femije'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), w('lut'), wf('diell', 'diellin', 'the Sun'), p('.')),
      L(wf('mbreteresha', 'mbretëresha', 'the queen'), wf('premto', 'premton', 'promises'), wf('bije', 'bijën', 'the daughter'), p('.')),
      L(wf('vajze', 'vajza', 'the maiden'), w('eshte'), w('dymbedhjete'), wf('vit', 'vjet', 'years'), p('.')),
      L(w('diell'), w('merr'), wf('bije', 'bijën', 'the daughter'), p('.')),
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
      { text: L(w('degjo'), wf('plake', 'plakën', 'the old woman')), to: 'tregDragua', reveal: 'plake' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), w('oda')), to: 'oda1' },
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
      { text: L(w('kthehu')), to: 'udhetaret' },
    ],
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
      L(wf('djall', 'djalli', 'the devil'), wf('bej', 'bën', 'makes'), w('nje'), w('ujk'), p('.')),
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
      L(w('verbti'), w('nuk'), w('sheh'), p('.')),
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
      L(w('mujo'), w('fsheh'), wf('omer', 'omerin', 'Omer'), w('nga'), wf('nene', 'nënën', 'the mother'), p('.')),
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
      'Omer, Mujo\u2019s son, still only a child, rode against a church, was surrounded there, and fought to the death; Mujo buried him under a mountain fir, beneath a stone thirty men could not lift, and hid the death from the boy\u2019s mother. But Ajkuna — Omer’s mother, Mujo’s wife — learned of it, and her lament for Omer swelled into a cry for every mother who loses a son to war, and the mountains keened it back to her, until her own heart broke at the graveside and she lay down beside her son. It is the most beloved passage of the whole epic — the seam where the songs of war become the songs of grief.',
    text: [
      L(wf('nene', 'nëna', 'the mother'), w('ka'), w('lot'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('shko'), wf('ne', 'në', 'to'), w('varr'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), w('mallko'), wf('hene', 'hënën', 'the moon'), p('.')),
      L(wf('yll', 'yjet', 'the stars'), w('rri'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), wf('vajto', 'vajton', 'mourns'), wf('omer', 'omerin', 'Omer'), p('.')),
      L(wf('nene', 'nëna', 'the mother'), wf('vajto', 'vajton', 'mourns'), wf('bir', 'bijtë', 'the sons'), p('.')),
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
      'Prende — Zoja e Bukurisë, the Lady of Beauty, daughter of the sky-father; goddess of love and of the green that returns, whose day is Friday (e premte) and whose belt is the rainbow (ylberi). She is Aferdita, "the day is near" — the morning star, the planet Venus that rides up before the sun; and the swallows, the Lady’s Birds, draw her chariot, yoked to it by her rainbow-belt. You did her honour, and where she sets her foot the earth flowers and the springs remember how to run; she blessed your road and the freeing of the Beauty both.',
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
      'A sister at her sewing struck her brother Gjon dead with her scissors, by a terrible accident; and in her grief she became the cuckoo, who cries "Ku? Ku?" — "Where? Where?" — searching for him down all the years, while he became the little Gjon-bird who answers only "Gjon! Gjon!", his own name — she calling by day and he by night, so the two of them call across the woods and never once meet. (von Hahn 104)',
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
      { text: L(w('mashtro'), wf('arushe', 'arushën', 'the bear')), to: 'arusheNate', reveal: 'peme' },
      { text: L(wf('ngre', 'ngre', 'lift'), w('nje'), w('peme')), to: 'humbur' },
    ],
  },

  arusheNate: {
    id: 'arusheNate',
    text: [
      L(w('naten'), w('arushe'), w('do'), w('gjak'), p('.')),
      L(w('arushe'), w('godit'), w('ketu'), p('.')),
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
      'The little dervish could never beat the bear by strength, so he beat it by wit: he crushed a white cheese in his fist and swore it was a stone he had squeezed the water from; he shrugged off the bear\u2019s mightiest cuffs as mere fleabites; and at the last he coaxed the great beast into a cauldron and boiled it in milk. In the mountains the cunning man outlives the strong one. (Elsie 12)',
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
      L(w('dhampir'), w('sheh'), wf('lugat', 'lugatin', 'the revenant'), p('.')),
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
      'The lugat walks invisible, and only the dhampir can see it — the half-living son a revenant fathered on a widow, "the dhampir knows the lugat." (His own grave is found by leading a virgin boy on a white stallion through the churchyard, where the horse will balk.) He knew the undead thing by sight, wrestled it down in the dark, and unmade it; and the night road was clean again.',
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
    ],
    options: [
      { text: L(w('ndihmo'), wf('nene', 'nenën', 'the mother')), to: 'bletaFund', reveal: 'nene' },
      { text: L(wf('bej', 'bëj', 'make'), w('nje'), w('qilim')), to: 'merimangaFund', reveal: 'qilim' },
      { text: L(w('kthehu')), to: 'gjizar1' },
    ],
  },

  bletaFund: {
    id: 'bletaFund',
    end: 'secret',
    title: 'The Bee',
    blurb:
      'A dying mother left three daughters. The one who would not rise from her loom even to tend her dying mother she cursed to be the spider, weaving a web she can never finish; the idle one to be the cicada, who sings one bright summer and dies parched on a stem; but the dutiful daughter she blessed: "you shall be the light of the ancestors and the food of the living." So the bee makes honey to feed the living and wax to light the dead — and you must never blaspheme in a house that keeps a hive.',
    text: [
      L(wf('vajze', 'vajza', 'the daughter'), wf('behet', 'bëhet', 'becomes'), w('nje'), w('bleta'), p('.')),
      L(w('bleta'), w('jep'), w('drite'), p('.')),
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
      L(w('disa'), wf('thote', 'thonë', 'say'), p(':'), wf('kukudh', 'kukudhi', 'the miser-ghost'), w('eshte'), w('nje'), w('dreq'), p('.')),
      L(w('hardhi'), wf('vrit', 'vret', 'kills'), wf('kukudh', 'kukudhin', 'the miser-ghost'), p(','), wf('dreq', 'dreqin', 'the devil'), p('.')),
    ],
    options: [
      { text: L(w('hidh'), w('hardhi')), to: 'kukudhFund', reveal: 'hardhi' },
      { text: L(w('lufto'), wf('kukudh', 'kukudhin', 'the miser-ghost')), to: 'humbur', reveal: 'kukudh' },
      { text: L(w('ik'), w('shpejt')), to: 'udheNate' },
    ],
  },

  kukudhFund: {
    id: 'kukudhFund',
    end: 'secret',
    title: 'The Kukudh Strangled',
    blurb:
      'When a lugat is left too long unburned it hardens — around Mount Tomorr above all — into a kukudh: the restless soul of a miser, squat and goat-tailed and proof against any blade. Steel is wasted on it; the old people knew it could be killed only one way, strangled with a noose of green vine. You looped the vine about its neck and choked the miser\u2019s ghost still.',
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
      L(w('larg'), w('eshte'), w('nje'), w('fshat'), p('.')),
      L(wf('lart', 'lart', 'high'), w('eshte'), w('nje'), w('mal'), w('te_link'), w('shenjte'), p('.')),
      L(w('ketu'), w('eshte'), w('nje'), w('pyll'), w('dhe'), w('nje'), w('lume'), p('.')),
      L(wf('thote', 'thonë', 'they say'), p(':'), w('pas'), wf('mal', 'malit', 'the mountain'), p(','), w('aty'), w('larg'), p(','), w('eshte'), wf('det', 'deti', 'the sea'), p('.')),
      L(w('ti'), wf('mendoj', 'mendon', 'think'), p(':'), w('ku'), w('te_subj'), wf('shko', 'shkosh', 'go'), p('?')),
    ],
    options: [
      { text: L(w('ec'), wf('ne', 'në', 'to'), w('fshat')), to: 'fshatiSheshi' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('mal')), to: 'mali1', reveal: 'shenjte' },
      { text: L(w('ik'), wf('ne', 'në', 'to'), w('pyll')), to: 'pylliLoop', reveal: 'pyll' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('lume')), to: 'lumi', reveal: 'lume' },
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
      L(wf('lart', 'lart', 'high'), wf('shqiponje', 'shqiponjat', 'eagles'), wf('fluturo', 'fluturojnë', 'fly'), p('.')),
      L(wf('lart', 'lart', 'high'), w('vjen'), w('ere'), w('dhe'), w('bresher'), p('.')),
      L(w('nje'), w('bari'), wf('rri', 'rri', 'sits'), w('me'), w('nje'), w('dem'), w('te_link'), w('bardhe'), p('.')),
    ],
    options: [
      { text: L(w('fol'), w('me'), wf('bari', 'barin', 'the shepherd')), to: 'qiellDem1', reveal: 'bari' },
      { text: L(w('ngjit'), w('lart')), to: 'qiellErera1', reveal: 'ere' },
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
      'You climbed Tomorr the way the pilgrims still climb it, and gave the sky-father his due — the white bull carried to the summit, the offering the highlanders make to this day. Zojz, an old man white-bearded to his belt, the she-eagles wheeling about him and the winds for his servants, found no pride in you to burn. He blessed you, and the winds bore you home. The thunderbolt seeks the tall tree and the tall tower; it never finds the one who kneels.',
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
      'Before the all-seeing one you did the hardest thing the Kanun allows — falja e gjakut, the forgiving of blood: you let a feud die rather than feed it. And the sky opened. i Bukuri i Qiellit, the Beauty of the Sky — the Sun, Dielli, the eye that watches every deed — looked on you and was not ashamed. The Earth keeps her Beauty in the dark spring and the Sea keeps hers in the deep; this is the third and the highest, and you stood full in its light.',
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
      L(w('nje'), w('ylber'), w('rri'), wf('lart', 'lart', 'high'), p('.')),
    ],
    options: [
      { text: L(w('merr'), w('bekim')), to: 'prendeBekim', reveal: 'prende' },
      { text: L(w('kalo'), w('ylber')), to: 'ylberKaprcim', reveal: 'ylber' },
      { text: L(w('ngjit'), wf('ne', 'në', 'to'), w('qiell')), to: 'qiellDiell' },
    ],
  },

  qiellDiell: {
    id: 'qiellDiell',
    text: [
      L(wf('lart', 'lart', 'high'), w('eshte'), wf('diell', 'dielli', 'the sun'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('sheh'), w('ti'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('jep'), w('drite'), w('dhe'), w('fuqi'), p('.')),
      L(wf('diell', 'dielli', 'the sun'), w('sheh'), wf('bote', 'botën', 'the world'), p('.')),
      L(w('naten'), w('vjen'), wf('hene', 'hëna', 'the moon'), p('.')),
    ],
    options: [
      { text: L(w('rri'), w('ne'), w('drite')), to: 'diellApex', reveal: 'drite' },
      { text: L(w('kerko'), w('hene')), to: 'henaPaqe', reveal: 'hene' },
      { text: L(w('ik'), w('shpejt')), to: 'udhekryq' },
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
      'You bowed your head, and Zojz let you up into his court — where his daughter waited. Prende, Zoja e Bukurisë, the Lady of Beauty: the dawn-goddess whose day is Friday, whose belt is the rainbow, protector of women and giver of love and health. She laid her blessing on you, and you came down the mountain whole, and lucky, and loved. Not every gift of the sky is a thunderbolt.',
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
  // Every village sits above its water. A lane drops from the square to the
  // stream: the old BRIDGE (the Bridge of Arta — the walled bride), the water-
  // MILL (the fair measure), and the living SPRING where the women fill their
  // jugs now the well is dry. Reached by "zbrit te lumin" from the square.
  // =========================================================================
  fshatiLumi: {
    id: 'fshatiLumi',
    text: [
      L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('lume', 'lumi', 'the river'), p('.')),
      L(wf('uje', 'uji', 'the water'), wf('shko', 'shkon', 'goes'), wf('poshte', 'poshtë', 'down'), w('nga'), w('mal'), p('.')),
      L(w('nje'), w('ure'), w('e_art'), w('vjeter'), w('eshte'), w('mbi'), wf('lume', 'lumin', 'the river'), p('.')),
      L(w('nje'), w('mulli'), w('punon'), w('me'), w('uje'), p('.')),
      L(wf('grua', 'gratë', 'the women'), wf('merr', 'marrin', 'take'), w('uje'), wf('tek', 'te', 'at'), wf('krua', 'kroi', 'the spring'), p('.')),
      L(w('larg'), wf('je', 'janë', 'are'), wf('fushe', 'fushat', 'the fields'), p('.')),
      L(wf('lart', 'lart', 'up'), wf('shko', 'shkon', 'goes'), w('nje'), w('rruge'), wf('tek', 'te', 'to'), wf('shtepi', 'shtëpitë', 'the homes'), p('.')),
    ],
    options: [
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('ure')), to: 'uraArtes1', reveal: 'ure' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('mulli')), to: 'mulli1', reveal: 'mulli' },
      { text: L(w('shko'), wf('ne', 'në', 'to'), w('krua')), to: 'kroi1', reveal: 'krua' },
      { text: L(w('ngjit'), wf('tek', 'te', 'to'), wf('shtepi', 'shtëpitë', 'the homes')), to: 'fshatiJeta', reveal: 'shtepi' },
      { text: L(w('ec'), wf('rruge', 'rrugës', 'the lane')), to: 'fshatiLanes', reveal: 'rruge' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), to: 'fshatiSheshi' },
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
      L(w('ti'), w('je'), wf('tek', 'te', 'at'), w('ure'), p('.')),
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
    ],
    options: [
      { text: L(w('merr'), w('pak'), w('miell')), to: 'mulliFund', reveal: 'miell' },
      { text: L(w('merr'), w('shume'), w('miell')), to: 'mulliKeq', reveal: 'miell' },
      { text: L(w('kthehu'), wf('ne', 'në', 'to'), wf('lume', 'lumin', 'the river')), to: 'fshatiLumi' },
    ],
  },

  mulliFund: {
    id: 'mulliFund',
    end: 'good',
    title: 'The Fair Measure',
    blurb:
      'The mill grinds for the whole village, and the old measure is holy: you take your own share and no more, for the flour on the stone belongs to every house that carried its grain down to the river. You reached in and took only a little — the fair measure — and the miller and the mothers of the village blessed your hand. In the old country a heaped, honest measure fed a good name, and a thief at the mill was cursed to the third house.',
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
      L(w('nje'), w('vajze'), w('merr'), w('uje'), w('ketu'), p('.')),
      L(wf('vajze', 'vajza', 'the girl'), w('te_obj'), w('jep'), w('uje'), p('.')),
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
      'The well in the square is dead and dry, but below the village the old spring still runs cold and clear, and a girl filling her jug gave the thirsty stranger the first cup without being asked — for water is the first hospitality, older even than bread, and a spring that is honoured never fails. You drank, and thanked her and the spring; and the old people say the fairies of the water love a clean spring and a kind hand, and keep both.',
    text: [
      L(w('ti'), w('pi'), w('uje'), p('.')),
      L(w('ti'), wf('thote', 'thua', 'say'), p(':'), w('faleminderit'), p('.')),
      L(w('ti'), w('je'), w('i_art'), w('sigurt'), p('.')),
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
      L(w('ti'), w('je'), wf('tek', 'te', 'at'), wf('kishe', 'kisha', 'the church'), p('.')),
      L(wf('kishe', 'kisha', 'the church'), w('rri'), wf('lart', 'lart', 'high'), w('mbi'), wf('fshat', 'fshatin', 'the village'), p('.')),
      L(w('nje'), w('prift'), w('rri'), wf('tek', 'te', 'at'), w('dere'), p('.')),
      L(wf('prift', 'prifti', 'the priest'), w('jep'), w('nje'), w('bekim'), p('.')),
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
      L(w('eshte'), w('naten'), w('dhe'), w('eshte'), w('erret'), p('.')),
      L(w('nje'), w('grua'), wf('ndiz', 'ndez', 'lights'), w('nje'), w('qiri'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('ka'), w('lot'), w('per'), w('nje'), w('burre'), p('.')),
      L(wf('grua', 'gruaja', 'the woman'), w('thote'), p(':'), wf('burre', 'burri', 'the man'), w('im'), w('rri'), wf('ne', 'në', 'in'), w('varr'), p(','), w('por'), w('bese'), w('nuk'), wf('vdes', 'vdes', 'die'), p('.')),
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
      'You lit a candle at the graves, as the old country lights one for its dead on the eve of the feasts — bread and a little wine and a flame left on the stone, so the dead are not forgotten and the faith between the living and the dead is kept. For in these mountains a besa holds even past the grave: the given word does not die when the man does, and one who is called by it will rise, as Constantine rose from the earth to bring his sister home. You kept faith with the dead, and the dead keep faith with you.',
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
  lumiHumbur: L(w('degjo'), wf('lume', 'lumin', 'the river')), // listen to the river — it cannot answer
  botaHumbur: L(w('merr'), wf('bote', 'botën', 'the world')), // take the world — you cannot
  // village river & church quarters
  fshatiLumi: L(w('merr'), wf('lume', 'lumin', 'the river')), // take the river — you cannot
  uraArtes1: L(w('degjo'), wf('ure', 'urën', 'the bridge')), // listen to the bridge — it cannot answer
  uraArtes2: L(w('degjo'), wf('gur', 'gurin', 'the stone')), // listen to the stone — it cannot speak
  mulli1: L(w('merr'), wf('mulli', 'mullirin', 'the mill')), // take the mill — you cannot
  kroi1: L(w('merr'), wf('krua', 'kroin', 'the spring')), // take the spring — you cannot
  kisha1: L(w('degjo'), wf('varr', 'varret', 'the graves')), // listen to the graves — they cannot answer
  varret1: L(w('ndiz'), wf('bese', 'besën', 'the oath')), // light the oath — you cannot
  udhekryq: L(w('ngjit'), wf('lume', 'lumin', 'the river')), // climb the river — you cannot climb water
  qiell1: L(w('fol'), w('me'), wf('maja', 'majën', 'the summit')), // speak with the summit — it cannot answer
  qiell2: L(w('jep'), wf('diell', 'diellin', 'the Sun')), // give the Sun — you cannot
  qiellDem1: L(w('merr'), wf('mal', 'malin', 'the mountain')), // take the mountain — none here
  deti1: L(w('zbrit'), wf('ne', 'në', 'to'), wf('maja', 'majën', 'the summit')), // go down to the summit — you cannot (a summit is above)
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
  mujiZana2: L(w('zgjedh'), wf('nene', 'nenën', 'the mother')), // choose the mother — not a gift offered
  qiellErera1: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // lufto the mountain — you cannot
  qiellErera2: L(w('godit'), wf('mal', 'malin', 'the mountain')), // godit the mountain — you cannot
  qiellPrende: L(w('merr'), wf('ylber', 'ylberin', 'the rainbow')), // take the rainbow — you cannot grasp it
  qiellDiell: L(w('jep'), wf('mal', 'malin', 'the mountain')), // jep the mountain — you cannot
  plaka: L(w('merr'), wf('bukura', 'Bukurën', 'the Beauty')), // take the Beauty — none here (far, with the kulshedra)
  fshatiDil: L(w('sheh'), wf('fshat', 'fshatin', 'the village')), // see the village — none here
  pylli1: L(w('sheh'), wf('mal', 'malin', 'the mountain')), // see the mountain — none here (you are deep in forest)
  pylliThelle: L(w('sheh'), wf('fshat', 'fshatin', 'the village')), // see the village — none here
  udha: L(w('jep'), wf('lume', 'lumin', 'the river')), // give the river — you cannot
  lumi: L(w('sheh'), wf('ar', 'arin', 'the gold')), // see the gold — none here (the old man only speaks of it)
  veraDite1: L(w('ndiz'), wf('diell', 'diellin', 'the sun')), // light the sun — you cannot
  flocka1: L(w('meso'), wf('liqen', 'liqenin', 'the lake')), // teach the lake — you cannot
  ura: L(w('jep'), wf('lume', 'lumin', 'the river')), // give the river — you cannot
  zanaQumesht: L(w('tund'), wf('djep', 'djepin', 'the cradle')), // rock the cradle — none here
  zanaKripe: L(w('sheh'), wf('shtrige', 'shtrigën', 'the witch')), // see the witch — none here
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
  pylliLoop: L(w('ndiz'), wf('pyll', 'pyllin', 'the forest')), // light the forest — you cannot
  stihi1: L(w('merr'), wf('flake', 'flakën', 'the flame')), // take the flame — you cannot
  vajtim1: L(wf('bej', 'bëj', 'make'), wf('burre', 'burrin', 'the man')), // make the man — you cannot
  gjumi: L(w('lufto'), wf('toke', 'tokën', 'the ground')), // fight the ground — you cannot
  zjarriPyll: L(w('jep'), wf('zjarr', 'zjarrin', 'the fire')), // give the fire — you cannot
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
  sheshiPlak: L(w('ndihmo'), wf('pus', 'pusin', 'the well')), // help the well — it is not a person
  sheshiPlak2: L(w('lufto'), wf('vatra', 'vatrat', 'the hearths')), // fight the hearths — nonsense
  sheshiPlak3: L(w('ik'), wf('fund', 'fundin', 'the end')), // flee the end — you cannot
  qytetiUdhetar: L(w('ec'), wf('det', 'detin', 'the sea')), // walk the sea — you cannot
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
  syriKeq1: L(w('jep'), wf('nene', 'nenën', 'the mother')), // give the mother — you cannot
  breshka1: L(wf('bej', 'bëj', 'make'), wf('mik', 'mikun', 'guest')), // eat the guest — you cannot
  shtojzovalle1: L(w('degjo'), wf('hene', 'hënën', 'the moon')), // listen to the moon — it cannot answer
  shtojzovalle2: L(w('degjo'), wf('lot', 'lotët', 'the tears')), // listen to the tears — they cannot answer
  udhetaret: L(w('sheh'), wf('fshat', 'fshatin', 'the village')), // see the village — none here
  tregMal: L(w('ngjit'), wf('fshat', 'fshatin', 'the village')), // climb the village — none here
  tregDet: L(w('merr'), wf('fshat', 'fshatin', 'the village')), // take the village — none here
  tregMujo: L(w('lufto'), wf('fshat', 'fshatin', 'the village')), // fight the village — none here
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
  uraFshaj: L(w('jep'), wf('ure', 'urën', 'the bridge')), // give the bridge — you cannot
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
  ktheu2: L(w('hap'), wf('dere', 'derën', 'the door')), // open the door — none here
  ktheu3: L(w('zbrit'), wf('ne', 'në', 'to'), wf('pus', 'pusin', 'the well')), // descend into the well — none here
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
  gjizar1: L(w('premto'), wf('mal', 'malin', 'the mountain')), // swear the mountain — none here
  gjizar2: L(w('lufto'), wf('gjarper', 'gjarprin', 'the serpent')), // fight the serpent — not your fight
  gjizarUdha: L(w('jep'), wf('grua', 'gruan', 'the woman')), // give away the woman — you cannot
  gjizarPallat: L(w('merr'), wf('qiri', 'qirin', 'the candle')), // take the candle — not the bird
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
  gjak1: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // fight the mountain — none here
  gjak2: L(w('lufto'), wf('pyll', 'pyllin', 'the forest')), // fight the forest — none here
  zuku1: L(w('jep'), wf('kulle', 'kullën', 'the tower')), // jep the tower — you cannot
  zuku2: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  kordha1: L(w('fol'), wf('shpate', 'shpatën', 'the sword')), // speak with the sword — it cannot answer
  kordha2: L(w('fol'), wf('mal', 'malin', 'the mountain')), // speak with the mountain — none here
  shurdhi1: L(w('ngjit'), wf('re', 'renë', 'the cloud')), // climb the cloud — you cannot
  kali1: L(w('degjo'), wf('mal', 'malin', 'the mountain')), // degjo the mountain — you cannot
  thesarOra: L(w('degjo'), wf('zjarr', 'zjarrin', 'the fire')), // listen to the fire — it cannot answer
  thesar2: L(w('degjo'), wf('ar', 'arin', 'the gold')), // listen to the gold — it cannot answer
  nastradin2: L(w('kerko'), wf('femije', 'fëmijën', 'the child')), // search the child — none here
  besaBekim: L(w('ndiz'), wf('plake', 'plakën', 'the old woman')), // light the old woman — you cannot
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
  riddle1: L(w('sheh'), wf('gjarper', 'gjarprin', 'the serpent')), // see the serpent — none here
  cuckoo1: L(w('kerko'), wf('pyll', 'pyllin', 'the forest')), // search the forest — none here
  arushe1: L(w('lufto'), wf('fshat', 'fshatin', 'the village')), // fight the village — none here
  dhampir1: L(w('lufto'), wf('buke', 'bukën', 'the bread')), // fight the bread — you cannot
  bleta1: L(w('premto'), wf('ne', 'në', 'to'), wf('fshat', 'fshatin', 'the village')), // swear to the village — none here
  dallendyshe1: L(w('lufto'), wf('fshat', 'fshatin', 'the village')), // fight the village — none here
  kukudh1: L(w('vrit'), wf('buke', 'bukën', 'the bread')), // kill the bread — you cannot
  bijaHene1: L(w('ngjit'), wf('hene', 'hënën', 'the moon')), // climb the moon — you cannot
  agaYmer1: L(w('hyr'), wf('ne', 'në', 'to'), wf('trim', 'trimin', 'the hero')), // enter the hero — you cannot
  agaYmer2: L(w('degjo'), wf('plage', 'plagën', 'the wound')), // listen to the wound — you cannot
}

// (2) a categorically-impossible action on a PRESENT thing — shares a noun
// with the scene, so you can't dodge it by scanning for the noun.
const CONFUSERS2 = {
  maliHumbur: L(w('ngjit'), wf('udhekryq', 'udhëkryqin', 'the crossroads')), // climb the crossroads — you cannot
  lumiHumbur: L(w('degjo'), wf('uje', 'ujin', 'the water')), // listen to the water — it cannot answer
  botaHumbur: L(w('ngjit'), wf('udhekryq', 'udhëkryqin', 'the crossroads')), // climb the crossroads — you cannot
  // village river & church quarters
  fshatiLumi: L(w('merr'), wf('mal', 'malin', 'the mountain')), // take the mountain — you cannot
  uraArtes1: L(w('degjo'), wf('lume', 'lumin', 'the river')), // listen to the river — it cannot answer
  uraArtes2: L(w('merr'), wf('ure', 'urën', 'the bridge')), // take the bridge — you cannot
  mulli1: L(w('merr'), wf('lume', 'lumin', 'the river')), // take the river — you cannot
  kroi1: L(w('merr'), wf('lume', 'lumin', 'the river')), // take the river — you cannot
  kisha1: L(w('jep'), wf('kishe', 'kishën', 'the church')), // give the church — you cannot
  varret1: L(w('rri'), wf('ne', 'në', 'in'), wf('qiri', 'qiriun', 'the candle')), // stay in the candle — you cannot
  udhekryq: L(w('ngjit'), wf('udhekryq', 'udhëkryqin', 'the crossroads')), // climb the crossroads — you stand on it
  qiell1: L(w('fol'), wf('me', 'me', 'with'), wf('ere', 'erën', 'wind')), // speak with the wind — it cannot answer
  qiell2: L(w('godit'), wf('diell', 'diellin', 'the Sun')), // strike the Sun — you cannot
  qiellDem1: L(w('fol'), wf('me', 'me', 'with'), wf('maja', 'majën', 'the summit')), // speak with the summit — it cannot answer
  deti1: L(w('rri'), wf('ne', 'në', 'on'), wf('maja', 'majën', 'the summit')), // stay on the summit — none here
  detiThelle1: L(w('zbrit'), wf('ne', 'në', 'in'), wf('lume', 'lumin', 'the river')), // go down into the river — none here
  detiThelle2: L(w('zbrit'), wf('ne', 'në', 'in'), wf('lume', 'lumin', 'the river')), // go down into the river — none here
  jutbina: L(w('ngjit'), wf('lahute', 'lahutën', 'the lute')), // climb the lute — you cannot
  qiellErera1: L(w('godit'), wf('ere', 'erën', 'wind')), // strike the wind — you cannot grasp it
  qiellErera2: L(w('godit'), wf('zjarr', 'zjarrin', 'the fire')), // strike the fire — you cannot
  qiellPrende: L(w('merr'), wf('maja', 'majën', 'the summit')), // take the summit — none here
  qiellDiell: L(w('jep'), wf('diell', 'diellin', 'the Sun')), // give the Sun — you cannot
  start: L(w('ndiz'), wf('naten', 'natën', 'the night')), // light the night — you cannot
  plaka: L(w('degjo'), wf('kulshedra', 'kulshedrën', 'the she-dragon')), // listen to the she-dragon — none here
  fshatiDil: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // fight the mountain — none here, and you cannot
  pylli1: L(w('sheh'), wf('fshat', 'fshatin', 'the village')), // see the village — none here
  pylliThelle: L(w('sheh'), wf('plak', 'plakun', 'the old man')), // see the old man — none here
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
  zjarriPyll: L(w('prit'), wf('buke', 'bukën', 'the bread')), // wait for the bread — you cannot
  shtrigaNate: L(w('ndiz'), wf('zjarr', 'zjarrin', 'the fire')), // light the fire — none here
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
  uraFshaj: L(w('sheh'), wf('lume', 'lumin', 'the river')), // see the river — none here
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
  ktheu2: L(w('merr'), wf('ar', 'arin', 'the gold')), // take the gold — none here
  ktheu3: L(w('lufto'), wf('dragua', 'dragoin', 'the dragon')), // fight the dragon — none here
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
}

// (3) a third distractor — another impossible action (open/take/fight a present
// thing, or fly), distinct from the other two for that node.
const CONFUSERS3 = {
  maliHumbur: L(w('kthehu'), wf('re', 'renë', 'the cloud')), // return to the cloud — you cannot
  lumiHumbur: L(w('kthehu'), wf('uje', 'ujin', 'the water')), // return to the water — you cannot
  botaHumbur: L(w('degjo'), wf('bote', 'botën', 'the world')), // listen to the world — it cannot answer
  // village river & church quarters
  fshatiLumi: L(w('merr'), wf('fushe', 'fushat', 'the fields')), // take the fields — you cannot
  uraArtes2: L(w('degjo'), wf('buke', 'bukën', 'the bread')), // listen to the bread — it has nothing to say
  kisha1: L(w('jep'), wf('dere', 'derën', 'the door')), // give the door — you cannot
  udhekryq: L(w('ngjit'), wf('fshat', 'fshatin', 'the village')), // climb the village — you cannot
  qiell1: L(w('ngjit'), wf('shqiponje', 'shqiponjën', 'the eagle')), // climb the eagle — you cannot
  qiell2: L(w('jep'), wf('toke', 'tokën', 'the ground')), // give the ground — none here
  qiellDem1: L(w('ngjit'), wf('plak', 'plakun', 'the old man')), // climb the old man — you cannot
  detiThelle1: L(w('lufto'), wf('maja', 'majën', 'the summit')), // fight the summit — none here
  detiThelle2: L(w('merr'), wf('maja', 'majën', 'the summit')), // take the summit — none here
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
  tregDragua: L(w('degjo'), wf('dragua', 'dragoin', 'the dragon')), // listen to the dragon — only spoken of, not here to answer
  fshatiDil: L(w('premto'), wf('plak', 'plakun', 'the old man')), // swear to the old man — none here
  pylli1: L(w('fol'), w('me'), wf('plak', 'plakun', 'the old man')), // speak with the old man — none here
  pylliThelle: L(w('lufto'), wf('mal', 'malin', 'the mountain')), // fight the mountain — none here
  lumi: L(w('fle'), wf('ne', 'në', 'on'), wf('maja', 'majën', 'the summit')), // sleep on the summit — none here
  zanaQumesht: L(w('merr'), wf('djep', 'djepin', 'the cradle')), // take the cradle — none here
  zanaKripe: L(w('beso'), wf('shtrige', 'shtrigën', 'the witch')), // trust the witch — none here
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
// DEFS — a short Albanian "definition" (really an illustrative phrase) for each
// sense. Rendered with the same Token logic as the story, so any word inside a
// definition that you haven't discovered yet shows as its English gloss.
// Built from story-validated phrasings to keep the Albanian grammar correct.
// ---------------------------------------------------------------------------
export const DEFS = {
  udhekryq: L(w('ku'), wf('rruge', 'rrugët', 'roads')), // where the roads meet (restored)
  vatra: L(w('nje'), w('zjarr'), w('ne'), w('shtepi')), // a fire in a house (restored)
  qilim: L(w('nje'), w('gje'), w('ne'), w('shtepi')), // a thing in a house (restored)
  jutbina: L(w('nje'), w('vend')), // a place (restored)
  qytet: L(w('nje'), w('vend'), w('me'), w('shtepi')), // a place with houses
  treg: L(w('nje'), w('vend'), w('me'), w('ar')), //     a place with gold (the bazaar)
  pishtar: L(w('nje'), w('gje'), w('me'), w('drite')), // a thing with light (a torch)
  // --- the Sky realm ---
  qiell: L(w('ku'), w('rri'), w('diell')), //          where the sun stays
  zojz: L(w('nje'), w('perendi'), w('e_link'), wf('qiell', 'qiellit', 'the sky')), // a god of the sky
  dem: L(w('nje'), w('kafshe')), //                    an animal
  mekat: L(w('jo'), w('mire')), //                     not good
  shenjte: L(w('per'), w('perendi')), //               for god
  mjeker: L(wf('ne', 'në', 'on'), w('koke')), //                    on the head
  fal: L(w('jo'), w('lufto')), //                      not fight
  krenar: L(w('shume'), wf('lart', 'lart', 'high')), //                 very high
  bari: L(w('nje'), w('njeri')), //                    a person
  maja: L(wf('lart', 'lart', 'high'), wf('ne', 'në', 'on'), w('mal')), //            up on a mountain
  mbyll: L(w('jo'), w('hap')), //                      not open
  oda: L(w('brenda'), w('nje'), w('shtepi')), //       inside a house
  kulle: L(w('nje'), w('shtepi'), w('te_link'), wf('lart', 'lart', 'high')), // a tall house
  thelle: L(w('poshte'), w('larg')), //                far below
  flok: L(wf('ne', 'në', 'on'), w('koke')), //                      on the head
  shtojzovalle: L(w('nje'), w('zane'), w('te_link'), w('naten')), // a fairy of the night
  valle: L(w('nje'), w('gje'), w('me'), w('kendo')), //          a thing with singing
  udhetar: L(w('nje'), w('njeri'), w('qe'), w('ec')), //  a person who walks (from afar)
  gjysmegjel: L(w('nje'), w('zog'), w('te_link'), w('vogel')), // a small bird
  lahute: L(w('kendo'), w('per'), wf('trim', 'trima', 'heroes')), // sings for heroes
  // --- the village quarters (river & church) ---
  kishe: L(w('nje'), w('shtepi'), w('per'), w('perendi')), //   a house for god
  prift: L(w('nje'), w('njeri'), w('per'), w('perendi')), //    a person for god
  mjeshter: L(w('nje'), w('njeri'), w('qe'), wf('bej', 'bën', 'builds')), // a person who builds
  mulli: L(w('nje'), w('gje'), w('me'), w('uje')), //          a thing with water
  miell: L(w('nje'), w('gje'), w('per'), w('buke')), //        a thing for bread
  fushe: L(w('nje'), w('vend'), w('i_art'), w('madh')), //     a big place
  punon: L(w('bej'), w('nje'), w('gje')), //                   does a thing
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
  i_link: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  e_art: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  e_link: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  e_obj: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  e_conj: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  do_fut: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),

  // top-150 frequency fill — defined by role or simple synonym
  kohe: L(w('dite'), w('dhe'), w('naten')), //         day and night
  ne_we: L(w('une'), w('dhe'), w('ti')), //            I and you
  me_more: L(w('shume')), //                           much
  disa: L(w('jo'), w('shume')), //                     not many
  ndonje: L(w('ndoshta'), w('nje')), //                maybe one
  gjitha: L(w('gjithe')), //                           all
  cdo: L(w('gjithe')), //                              all
  pas: L(w('jo'), w('para')), //                       not before
  atehere: L(w('pas')), //                             after
  ndoshta: L(w('mund')), //                            can (be)
  shiko: L(w('sheh')), //                              see
  zoteri: L(w('nje'), w('burre')), //                  a man
  keto: L(w('gje'), w('ketu')), //                     things here
  ashtu: L(w('keshtu')), //                            thus
  qene: L(w('eshte')), //                              is
  tuaj: L(w('e_link'), w('ju')), //                    of you
  tyre: L(w('e_link'), w('ata')), //                   of them
  saj: L(w('e_link'), w('ajo')), //                    of her
  yt: L(w('e_link'), w('ti')), //                      of you
  kaq: L(w('shume')), //                               much
  aty: L(w('jo'), w('ketu')), //                       not here
  zot: L(w('nje'), w('perendi')), //                   a god
  dreq: L(w('jo'), w('mire')), //                      not good
  ma: L(w('mua')), //                                  me
  vend: L(w('ku'), w('ti'), w('rri')), //              where you stay
  // top 151-200 frequency fill
  deri: L(w('ne'), w('fund')), //                      to the end
  hajde: L(w('vjen')), //                              come (comes)
  prej: L(w('nga')), //                                from
  ia: L(w('ta')), //                                   it (to him)
  aq: L(w('shume')), //                                much
  sikur: L(w('si')), //                                like
  gati: L(w('tani'), w('mire')), //                    now good (ready)
  gjithcka: L(w('gjithe'), w('gje')), //               all things
  pune: L(w('nje'), w('gje')), //                      a thing (one does)
  as: L(w('jo'), w('dhe')), //                         not and (nor)
  cka: L(w('cfare')), //                               what
  pastaj: L(w('pas')), //                              after
  fund: L(w('jo'), w('me_more')), //                   no more
  thjesht: L(w('vetem')), //                           only
  akoma: L(w('perseri')), //                           again (still)
  here: L(w('nje'), w('kohe')), //                     a time
  vertet: L(w('sigurt')), //                           sure (truly)
  dikush: L(w('nje'), w('njeri')), //                  a person
  sigurisht: L(w('sigurt')), //                        sure(ly)
  epo: L(w('po_yes')), //                              well (yes)
  drejte: L(w('mire')), //                             good (right)
  asnje: L(w('jo'), w('nje')), //                      not one
  dashur: L(w('mik')), //                              friend (dear)
  ndodh: L(w('behet')), //                             becomes (happens)
  nevoje: L(w('do')), //                               wants (need)

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
  kalo: L(w('ec'), wf('ne', 'në', 'on'), w('ure')), //              walk on a bridge

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
  peshk: L(w('nje'), w('kafshe'), wf('ne', 'në', 'in'), w('uje')), // an animal in water (= fish)
  qengj: L(w('nje'), w('kafshe'), w('e_art'), w('vogel'), w('e_art'), wf('bardhe', 'bardhë', 'white')), // small white animal (= lamb)
  kashte: L(w('ushqim'), w('e_link'), w('dhi')), //               food of goats (= hay)
  kukull: L(w('nje'), w('femije'), w('e_link'), w('balte')), //   a child of clay (= a doll)
  varros: L(w('jep'), wf('dhe', 'dheut', 'to the earth')), //     give to the earth (= bury)
  balte: L(w('dhe'), w('me'), w('uje')), //                       earth with water (= clay)
  gjalpe: L(w('nje'), w('ushqim'), w('e_link'), w('qumesht')), // a food of milk (= butter)
  karkanxholl: L(w('nje'), w('lugat'), w('me'), w('hekur')), //   a revenant with iron
  troket: L(w('bie'), wf('ne', 'në', 'on'), w('dere')), //        strikes on the door (= knocks)
  kuzhinier: L(w('nje'), w('njeri'), w('e_link'), w('ushqim')), // a man of food (= a cook)
  mos: L(w('nuk')), //                                            not (= do not)
  jo: L(w('nuk')), //                                             not (= no)
  ushqim: L(w('nje'), w('gje'), w('qe'), w('ti'), w('ha')), //     a thing that you eat (= food)
  ze: L(w('nje'), w('gje'), w('qe'), wf('degjo', 'degjon', 'you hear')), // a thing you hear (= sound)
  pagezim: L(w('nje'), w('feste'), w('e_link'), w('femije')), //   a feast of a child (= a christening)
  goje: L(w('ti'), w('ha'), w('dhe'), w('flet')), //              you eat and speak (= the mouth)
  djathe: L(w('nje'), w('ushqim'), w('e_link'), w('qumesht')), // a food of milk (= cheese)
  shtrydh: L(w('mban'), w('me'), w('fuqi')), //                  holds with force (= squeezes)
  plesht: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), //   a small animal (= a flea)
  kerce: L(w('shko'), wf('lart', 'lart', 'up')), //               goes up (= leaps)
  ballokume: L(w('nje'), w('ushqim'), w('e_link'), w('feste')), // a food of the feast (= cake)
  flutur: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), //    a small animal (= a moth)
  dre: L(w('nje'), w('kafshe'), w('e_link'), w('pyll')), //       an animal of the forest (= a stag)
  kose: L(w('nje'), w('gje'), w('qe'), wf('pre', 'pret', 'cuts')), // a thing that cuts (= a scythe)
  shkop: L(w('nje'), w('dru')), //                                a wood (= a cudgel)
  gershere: L(w('nje'), w('gje'), w('e_link'), w('qep')), //      a thing of sewing (= scissors)
  qep: L(wf('bej', 'bën', 'makes'), w('rrobe')), //              makes clothes (= sews)
  rreze: L(w('nje'), w('gje'), w('e_link'), w('diell')), //       a thing of the Sun (= a ray)
  pallat: L(w('nje'), w('shtepi'), w('e_art'), w('madh')), //     a big house (= a palace)
  mbreteresha: L(w('grua'), w('e_link'), w('mbret')), //          woman of the king (= the queen)
  liber: L(w('nje'), w('gje'), w('me'), w('fjale')), //           a thing with words (= a book)
  laker: L(w('nje'), w('ushqim'), w('e_link'), w('kopsht')), //   a food of the garden (= cabbage)
  kopsht: L(w('nje'), w('toke'), w('e_link'), w('peme')), //      a land of plants (= a garden)
  shkolle: L(w('ku'), w('femije'), wf('meso', 'mësojnë', 'learn')), // where children learn (= a school)
  lut: L(w('kerko'), w('me'), w('zemer')), //                    asks with the heart (= prays)
  dymbedhjete: L(w('nente'), w('dhe'), w('tre')), //             nine and three (= twelve)
  thyhet: L(w('behet'), w('keq')), //                            comes apart (= breaks)
  etur: L(w('do'), w('uje')), //                                 wants water (= thirsty)
  atje: L(w('jo'), w('ketu')), //                                not here (= there)
  hip: L(w('shko'), wf('lart', 'lart', 'up')), //               goes up (= climbs)
  kafshe: L(w('nje'), w('gje'), w('e_art'), wf('gjalle', 'gjallë', 'living')), // a living thing (= an animal)
  mermer: L(w('nje'), w('gur'), w('e_art'), wf('bardhe', 'bardhë', 'white')), // a white stone (= marble)
  sherbetore: L(w('nje'), w('grua'), wf('qe', 'që', 'who'), wf('ndihmo', 'ndihmon', 'helps')), // a woman who helps (= a servant)
  pate: L(w('nje'), w('zog'), w('e_link'), wf('uje', 'ujit', 'water')), // a bird of water (= a goose)
  zgjuar: L(w('nuk'), w('fle')), //                              not asleep (= awake)
  zhytet: L(w('shko'), wf('poshte', 'poshtë', 'down'), wf('ne', 'në', 'in'), w('uje')), // goes down in water (= dives)
  aga: L(w('nje'), w('trim'), w('e_link'), w('jutbina')), //      a hero of Jutbina (= an aga)
  xhami: L(w('nje'), w('shtepi'), w('e_art'), w('shenjte')), //   a holy house (= a mosque)
  kafe: L(w('nje'), w('uje'), w('e_link'), w('zi')), //           a water of black (= coffee)
  krajl: L(w('nje'), w('mbret'), w('e_link'), w('toke')), //      a king of a land (the Slav king)
  rusha: L(w('nje'), w('vajze'), w('e_link'), w('krajl')), //     a girl of the Krajl
  kripe: L(w('per'), w('ushqim')), //                              for food
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
  zbrit: L(w('shko'), wf('poshte', 'poshtë', 'down')), //                             go down
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
  varr: L(w('nje'), w('vend'), w('per'), wf('vdes', 'i vdekur', 'dead')), // a place for the dead
  emer: L(w('nje'), w('fjale'), w('per'), wf('njeri', 'dikë', 'someone')), // a word for someone
  luan: L(w('nje'), w('femije'), wf('bej', 'bën', 'makes'), wf('loja', 'lojë', 'a game')), // a child plays
  vetem: L(w('pa'), w('tjeter')), //                               without another (= only / alone)
  zemer: L(w('eshte'), wf('ne', 'në', 'in'), w('gji')), //          [it] is in the breast
  bashke: L(w('jo'), wf('vetem', 'vetëm', 'alone')), //             not alone (= together)
  gjalle: L(w('nuk'), wf('vdes', 'i vdekur', 'dead')), //           not dead (= alive)
  nga: L(w('ku'), w('vjen')), //                                   where [it] comes (= from)
  sjell: L(w('vjen'), w('me'), wf('gje', 'një gjë', 'a thing')), // comes with a thing (= brings)
  marto: L(w('merr'), wf('nuse', 'nuse', 'a bride')), //            takes a bride (= marries)
  mallko: L(wf('thote', 'thotë', 'says'), w('fjale'), w('keq')), // says a bad word (= curses)
  le: L(w('nuk'), w('mban')), //                                  does not keep (= leaves behind)
  grua: L(w('nje'), w('nene'), w('ose'), w('vajze')), //          a mother or a maiden (= a woman)
  unaze: L(w('ar'), wf('ne', 'në', 'on'), w('dore')), //          gold on the hand (= a ring)
  fytyre: L(wf('ne', 'në', 'on'), w('koke')), //                  on the head (= the face)
  dru: L(w('nga'), w('peme')), //                                 from a tree (= wood)
  ku: L(wf('ne', 'në', 'in'), w('vend')), //                      in [what] place (= where?)
  mushkonje: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), // a small animal (an insect)
  bisht: L(w('nje'), w('gje'), w('e_link'), w('kafshe')), //      a thing of an animal (its tail)
  bretkose: L(w('nje'), w('kafshe'), wf('ne', 'në', 'in'), w('uje')), // an animal in the water (frog)
  dhelpra: L(w('nje'), w('kafshe'), w('e_art'), w('kuq')), //          a red animal (fox)
  mi: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), //         a small animal (mouse)
  rrobe: L(w('nje'), w('gje'), w('per'), wf('vesh', 'të veshur', 'to wear')), // a thing to wear (dress)
  krah: L(w('nje'), w('gje'), w('e_link'), w('shqiponje')), //     a thing of an eagle (wing)
  kuq: L(w('e_link'), w('gjak')), //                              of-blood (red)
  bri: L(w('nje'), w('gje'), w('e_link'), w('dash')), //          a thing of a ram (horn)
  gju: L(wf('ne', 'në', 'in'), w('kembe')), //                    in the leg (knee)
  zgjedh: L(w('merr'), w('nje')), //                              takes one (chooses)
  pasuri: L(w('shume'), w('ar')), //                              much gold (wealth)
  ngre: L(w('merr'), wf('lart', 'lart', 'high')), //              takes up high (= lifts)
  sot: L(w('dite'), w('tani')), //                                a day now (= today)
  vere: L(w('jo'), wf('ftohte', 'e ftohtë', 'cold')), //          not cold (= summer)
  feste: L(wf('njeri', 'njerëz', 'people'), wf('kendo', 'këndojnë', 'sing')), // people sing (= a festival)
  liqen: L(w('nje'), w('uje'), w('i_art'), w('madh')), //         a big water (= a lake)
  flocka: L(w('nje'), w('zane'), wf('ne', 'në', 'in'), w('liqen')), // a fairy in a lake
  meso: L(w('jep'), w('dije')), //                                gives knowledge (= teaches)
  burre: L(w('jo'), wf('grua', 'grua', 'a woman')), //            not a woman (= a man)
  gjeme: L(wf('burre', 'burrat', 'men'), wf('vajto', 'vajtojnë', 'mourn')), // men mourn (the wail)
  vajtim: L(wf('grua', 'gratë', 'women'), wf('vajto', 'vajtojnë', 'mourn')), // women mourn (the lament)
  stihi: L(w('nje'), wf('kulshedra', 'kulshedër', 'she-dragon'), w('me'), w('zjarr')), // a she-dragon with fire
  flake: L(w('e_link'), w('zjarr')), //                          of fire (= a flame)
  nxjerr: L(w('jep'), wf('jashte', 'jashtë', 'out')), //         gives out (= breathes)
  semure: L(w('behet'), w('keq')), //                            becomes bad (= falls sick)
  hudher: L(w('nje'), w('ushqim'), w('te_link'), wf('forte', 'fortë', 'strong')), //   a strong food (= garlic)
  peri: L(w('nje'), w('zane'), w('e_art'), wf('bardhe', 'bardhë', 'white')), //  a white fairy
  krua: L(w('uje'), wf('ne', 'në', 'in'), wf('mal', 'mal', 'a mountain')), // water in a mountain (= a spring)
  xhind: L(w('nje'), w('hije'), w('te_link'), w('naten')), //      a shadow of the night (= a jinn)
  prag: L(wf('ne', 'në', 'on'), w('dere')), //                    at the door (= the threshold)
  fjale: L(w('nje'), w('gje'), w('e_link'), w('gjuhe')), //        a thing of language (= a word)
  mbi: L(w('lart'), wf('ne', 'në', 'on')), //                       high on (= over)
  bie: L(w('shko'), wf('poshte', 'poshtë', 'down')), //                               go down
  pre: L(w('me'), w('shpate')), //                                 with a sword
  // qualities & connectors
  forte: L(w('me'), w('fuqi')), //                                 with power
  bukur: L(w('shume'), w('mire')), //                              very good
  keq: L(w('jo'), w('mire')), //                                   not good
  mire: L(w('jo'), w('keq')), //                                   not bad
  thate: L(w('pa'), w('uje')), //                                  without water
  lart: L(w('jo'), w('poshte')), //                               not below
  larg: L(w('jo'), w('ketu')), //                                 not here
  por: L(w('dhe'), w('jo')), //                                   and not
  po_yes: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), //      a small word
  po_prog: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  po_but: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  nuk: L(w('jo')), //                                              not
  per: L(w('te_subj')), //                                         to / for
  une: L(w('jo'), w('ti')), //                                    not you (= me)
  mua: L(w('une')), //                                            me (= I)
  do: L(w('kerko')), //                                            to seek
  fuqi: L(w('ti'), w('je'), w('i_art'), w('madh')), //             you are great
  hije: L(w('nje'), w('gje'), w('e_art'), w('erret')), //          a dark thing
  me: L(w('jo'), w('pa')), //                                      not without
  poshte: L(w('jo'), wf('lart', 'lart', 'high')), //                               not up
  prek: L(w('jo'), w('larg')), //                                 not far (right up close)
  shume: L(w('jo'), w('vogel')), //                               not small (in number)
  tani: L(w('kohe')), //                                           this time
  shtrige: L(w('nje'), w('plake'), w('e_art'), wf('keq', 'keqe', 'bad')), //       a bad old woman
  ora: L(w('nje'), w('hije'), w('e_art'), w('mire')), //           a good spirit
  det: L(w('nje'), w('lume'), w('i_art'), w('madh')), //           a big water
  ftohte: L(w('pa'), w('zjarr')), //                              without fire (cold)
  te_obj: L(w('nje'), w('fjale'), w('e_art'), w('vogel')),
  prit: L(w('jo'), w('ec')), //                                   do not walk (stay)
  tjeter: L(w('nje'), w('gje'), w('e_art'), w('ri')), //          a new one
  rrezik: L(w('ku'), w('ti'), w('mund'), w('te_subj'), w('vdes')), // where you can die
  // --- the Baloz branch ---
  baloz: L(w('nje'), w('gjarper'), w('te_link'), w('det')), //     a serpent of the sea
  motra: L(w('nje'), w('vajze')), //                              a maiden (your sister)
  plage: L(w('nje'), w('gje'), w('e_art'), wf('keq', 'keqe', 'bad')), //          a bad thing
  nente: L(w('shume')), //                                        many
  vajze: L(w('nje'), w('e_art'), w('bukur'), w('njeri')), //      a beautiful person
  fole: L(w('nje'), w('shtepi'), w('te_link'), w('shqiponje')), // a house of the eagle
  zog: L(w('nje'), w('e_art'), w('vogel'), w('shqiponje')), //    a small eagle
  dite: L(w('nje'), w('kohe'), w('me'), w('drite')), //           a time with light
  yll: L(w('nje'), wf('drite', 'dritë', 'light'), wf('ne', 'në', 'in'), w('qiell')), // a light in the sky
  pleq: L(wf('njeri', 'njerëz', 'people'), w('vjeter')), //       old people (= elders)
  gjinkalla: L(w('nje'), wf('gje', 'gjë', 'thing'), wf('qe', 'që', 'that'), w('kendo')), // a thing that sings
  burg: L(wf('njeri', 'njeriu', 'the person'), w('nuk'), w('dil'), w('jashte')), // cannot go out
  kafaz: L(w('nje'), wf('shtepi', 'shtëpi', 'house'), w('e_link'), w('zog')), // a house for a bird
  qiri: L(w('nje'), wf('gje', 'gjë', 'thing'), w('me'), wf('drite', 'dritë', 'light')), // a thing with light
  kapidan: L(w('nje'), w('trim'), w('e_link'), wf('krajl', 'krajlit', 'the Krajl')), // a warrior of the Krajl
  mejdan: L(w('nje'), wf('lufto', 'luftë', 'fight'), w('per'), w('nje'), w('trim')), // a fight for one hero (= a duel)
  hendek: L(w('uje'), wf('te_link', 'të', 'of'), w('nje'), w('pallat')), // the water of a palace (= a moat)
  hu: L(w('nje'), w('dru'), w('e_art'), w('forte')), // a hard stick (= a stake)
  peme: L(w('nje'), w('gje'), w('ne'), w('pyll')), //             a thing in the forest
  // --- the storm ---
  rrufe: L(w('drite'), w('ne'), w('re')), //                      light in a cloud
  re: L(w('nje'), w('gje'), wf('lart', 'lart', 'high')), //                        a thing up high
  ere: L(w('nje'), w('gje'), w('qe'), w('vjen'), w('larg')), //   a thing that comes from afar
  // --- the underworld rams & the twist ---
  dash: L(w('nje'), w('kafshe'), wf('ne', 'në', 'on'), w('mal')), //           an animal on the mountain
  bardhe: L(w('jo'), w('i_art'), w('zi')), //                     not black
  zi: L(w('jo'), w('i_art'), w('bardhe')), //                     not white
  jam: L(w('une'), w('je')), //                                   "I are" (= am)
  njeri: L(w('jo'), w('nje'), w('kafshe')), //                    not an animal
  vazhdon: L(w('jo'), w('mbaroi')), //                            not ended
  // --- the village & the besa ---
  premto: L(w('jep'), w('bese')), //                              give an oath
  bese: L(w('nje'), w('fjale'), w('e_art'), w('forte')), //       a strong word (a vow)
  lugat: L(w('nje'), w('hije'), w('te_link'), w('naten')), //     a shadow of the night
  vella: L(w('nje'), w('mik'), w('te_link'), w('shtepi')), //     a friend of the house (kin)
  bej: L(w('jo'), w('prit')), //                                  do not wait (act)
  vogel: L(w('jo'), w('i_art'), w('madh')), //                    not big
  diell: L(w('nje'), w('drite'), w('e_art'), w('madh')), //       a great light
  qen: L(w('nje'), w('kafshe'), w('ne'), w('shtepi')), //         an animal in the house
  ngadale: L(w('jo'), w('shpejt')), //                            not fast
  lot: L(w('uje'), w('te_link'), w('sy')), //                     water of the eyes
  dhi: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), //       a small animal
  ar: L(w('nje'), w('gur'), w('e_art'), w('bukur')), //           a beautiful metal (stone)
  hoxha: L(w('nje'), w('plak'), w('e_art'), w('mire')), //        a good old man
  kazan: L(w('nje'), w('gje'), w('te_link'), w('zjarr')), //      a thing of the fire
  // --- lore-review fixes ---
  lind: L(w('vjen'), wf('ne', 'në', 'to'), w('bote')), //                      to come into the world
  kemishe: L(w('nje'), w('gje'), w('te_link'), w('dragua')), //   a thing of the dragua (the caul)
  gji: L(w('ku'), w('eshte'), w('qumesht')), //                   where the milk is
  dore: L(w('nje'), w('gje'), w('te_link'), w('njeri')), //       a thing of a person
  djep: L(w('nje'), w('vend'), w('ku'), w('nje'), w('femije'), w('fle')), // a place where a child sleeps
  dije: L(w('nje'), w('fuqi'), w('te_link'), w('koke')), //       a power of the head (the mind)
  ose: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), //        a small word
  kembe: L(w('me'), w('kembe'), w('ti'), w('ec')), //             with legs you walk
  jashte: L(w('jo'), w('brenda')), //                            not inside
  // --- Sari Salltëk ---
  dervish: L(w('nje'), w('plak'), w('e_art'), w('mire')), //      a good old man (holy man)
  gjuhe: L(w('nje'), w('gje'), w('ne'), wf('koke', 'kokë', 'the head')), // a thing in the head
  shtate: L(w('shume')), //                                       many
  tund: L(w('luan')), //                                          moves, plays
  dordolec: L(w('nje'), w('femije'), w('me'), w('gjelber'), w('qe'), wf('thirr', 'thërret', 'calls'), w('shi')), // a child dressed in green who calls the rain
  shi: L(w('uje')), //                                          water (from the sky)
  vesh: L(w('mban')), //                                        wears, keeps on
  gjelber: L(w('e_link'), w('peme')), //                         of-plant (green)
  verdhe: L(w('e_link'), w('ar')), //                            of-gold (yellow)
  kendo: L(w('flet')), //                                       speaks/sings
  bolla: L(w('nje'), w('gjarper')), //                          a serpent
  shengjergj: L(w('nje'), w('dite')), //                        a day (feast)
  kurre: L(w('nuk')), //                                        not, never
  katallan: L(w('nje'), w('baloz')), //                         a giant
  godit: L(w('lufto')), //                                      strikes, fights
  verbo: L(w('mbyll'), w('sy')), //                             shut the eye
  gjak: L(w('vdes')), //                                          death (a blood-feud)
  dy: L(w('nje'), w('dhe'), w('nje')), //                         one and one
  bar: L(w('nje'), w('peme')), //                                a plant
  tre: L(w('dy'), w('dhe'), w('nje')), //                         two and one
  shurdhi: L(w('nje'), w('re'), w('dhe'), w('rrufe')), //         a cloud and thunder
  hekur: L(w('nje'), w('gur'), w('te_link'), w('forte')), //     a hard stone (metal)
  kale: L(w('nje'), w('kafshe')), //                             an animal
  ruan: L(w('mban')), //                                         keeps
  roje: L(w('nje'), w('njeri'), w('qe'), w('ruan')), //          a person who guards
  bekim: L(w('nje'), w('fuqi'), w('te_link'), w('ora')), //       a power of the Ora
  mujo: L(w('nje'), w('trim')), //                               a hero
  halil: L(w('nje'), w('trim')), //                              a hero
  tanusha: L(w('nje'), w('vajze')), //                           a maiden
  nuse: L(w('nje'), w('vajze')), //                              a bride
  fsheh: L(w('nuk'), w('sheh')), //                              is not seen
  djall: L(w('nje'), w('hije'), w('e_art'), w('keq')), //        a bad spirit
  perendi: L(w('nje'), w('fuqi'), w('e_art'), w('madh')), //     a great power
  verbti: L(w('nje'), w('perendi'), w('te_link'), w('zjarr')), //  a god of fire
  omer: L(w('nje'), w('bir'), w('te_link'), w('mujo')), //         a son of Mujo
  vajto: L(w('flet'), w('me'), w('lot')), //                       speaks with tears
  lubia: L(w('nje'), w('gjarper'), w('me'), w('shume'), w('koke')), // a serpent of many heads
  prende: L(w('nje'), w('perendi'), w('e_art'), w('bukur')), //     a beautiful goddess
  ylber: L(w('nje'), w('drite'), w('e_art'), w('bukur')), //      a beautiful light
  gjegjeza: L(w('nje'), w('fjale'), w('e_art'), w('vjeter')), //  an old saying
  samar: L(w('nje'), w('gje'), w('te_link'), w('gomar')), //      a thing of a donkey
  breshka: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), //   a small animal
  gjon: L(w('nje'), w('zog')), //                                a bird
  arushe: L(w('nje'), w('kafshe'), w('e_art'), w('madh')), //     a big animal
  mashtro: L(w('thote'), w('fjale'), w('e_art'), w('keq')), //    speaks false words
  dhampir: L(w('nje'), w('bir'), w('te_link'), w('lugat')), //    a son of a revenant
  bleta: L(w('nje'), w('kafshe'), w('e_art'), w('vogel')), //     a small animal
  merimanga: L(w('nje'), w('kafshe'), w('ne'), w('pyll')), //     an animal in the forest
  dallendyshe: L(w('nje'), w('zog')), //                          a bird
  kukudh: L(w('nje'), w('lugat'), w('e_art'), wf('keq', 'keqe', 'bad')), // a bad revenant
  hardhi: L(w('nje'), w('peme')), //                              a plant
  bresher: L(w('gur'), w('te_link'), w('re')), //                stones from the cloud
  pa: L(w('nuk'), w('me')), //                                   not with
  gomar: L(w('nje'), w('kafshe'), w('e_art'), w('madh')), //      a big animal
  hene: L(w('nje'), w('drite'), w('naten')), //                  a light at night
  bije: L(w('nje'), w('vajze'), w('te_link'), w('nene')), //      a maiden of a mother
  vit: L(w('shume'), w('dite')), //                              many days
  fol: L(w('thote'), w('fjale')), //                             says words
  shpirag: L(w('nje'), w('mal')), //                            a mountain
  bir: L(w('nje'), w('femije')), //                             a child
  mban: L(w('ka')), //                                          has, holds
  vitore: L(w('nje'), w('gjarper')), //                         a serpent
  sulmo: L(w('lufto')), //                                      fights
  // --- high-frequency spoken words (top-100 coverage) ---
  di: L(w('ke'), w('dije')), //                                 have knowledge (= know)
  duhet: L(w('mos'), w('prit')), //                             do not wait (= must)
  mendoj: L(wf('bej', 'bëj', 'make'), wf('ne', 'në', 'in'), w('koke')), // make in the head (= think)
  duket: L(w('ti'), w('sheh')), //                              you see (= seems)
  ai: L(w('nje'), w('burre')), //                              a man (= he)
  ajo: L(w('nje'), w('grua')), //                              a woman (= she)
  ata: L(wf('njeri', 'njerëz', 'people')), //                  people (= they)
  tij: L(w('e_link'), w('ai')), //                             of him (= his)
  ky: L(w('ketu')), //                                         here (= this)
  ju: L(w('ti'), w('dhe'), w('ti')), //                        you and you (= you plural)
  na: L(w('une'), w('dhe'), w('ti')), //                       me and you (= us)
  kush: L(w('cfare'), w('njeri')), //                          what person (= who)
  cfare: L(w('nje'), w('gje')), //                             a thing (= what)
  pse: L(w('per'), w('cfare')), //                             for what (= why)
  sa: L(w('shume'), w('ose'), w('pak')), //                    many or few (= how much)
  kur: L(wf('ne', 'në', 'in'), w('cfare'), w('kohe')), //      in what time (= when)
  nese: L(w('mund')), //                                       maybe (= if)
  sepse: L(w('per'), wf('ky', 'këtë', 'this')), //             for this (= because)
  edhe: L(w('dhe')), //                                        and (= also)
  apo: L(w('ose')), //                                         or
  si: L(w('sa'), w('mire')), //                                how well (= how)
  pra: L(w('keshtu')), //                                      thus (= so)
  keshtu: L(w('si'), w('ky')), //                              like this (= thus)
  gjithe: L(w('jo'), w('pak')), //                             not a little (= all)
  pak: L(w('jo'), w('shume')), //                             not many (= a little)
  para: L(w('jo'), w('tani')), //                             not now (= before)
  tek: L(wf('ne', 'në', 'in')), //                            in (= at)
  vertete: L(w('shume'), w('sigurt')), //                     very sure (= truly)
  dicka: L(w('nje'), w('gje')), //                            a thing (= something)
  asgje: L(w('nuk'), w('nje'), w('gje')), //                  not a thing (= nothing)
  ja: L(w('sheh'), w('ketu')), //                            see here (= behold)
  oh: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), //     a small word
  hej: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), //    a small word
  duke: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), //   a small word
  jete: L(w('jo'), wf('vdes', 'vdekur', 'dead')), //          not dead (= life)
  rregull: L(w('gjithe'), w('mire')), //                     all good (= order)
  faleminderit: L(w('nje'), w('fjale'), w('e_art'), w('mire')), // a good word (= thanks)
  se: L(w('qe')), //                                         that
  qe: L(w('se')), //                                         that (relative)
  gje: L(w('dicka')), //                                     something (= a thing)
  ta: L(w('nje'), w('fjale'), w('e_art'), w('vogel')), //    a small word
  im: L(w('e_link'), w('une')), //                          of me (= my)
}
