// Explicit part-of-speech review for dictionary senses which function as
// nouns. This registry is intentionally independent of nounForms.js: a missing
// declension must remain visible as curriculum debt instead of making the sense
// silently stop being a noun.

const idSet = (value) => new Set(value.trim().split(/\s+/).filter(Boolean))

// These ids have a complete, role-labelled paradigm today. The morphology
// audit compares this independent list with NOUN_FORMS in both directions, so a
// newly added/removed paradigm cannot quietly change part-of-speech policy.
export const REVIEWED_NOUN_PARADIGM_IDS = idSet(`
  aga ahur anije ar arushe baba baloz batanije besim bije
  bir bote burim burre cader cakmak cete dallendyshe darke dash
  dem dere dervish det dhe_earth dhelpra dhi diell dite djale
  djall djep dore dre dreq dritare drite e_vertete ere ere_smell
  erresire familje femije fillim flake fshat fund fuqi furre gjak
  gjarper gje gjendje grua gur hekur hendek hene hije histori
  kale kanal kapidan karkanxholl katallan kazan kembe kemishe kenaqesi kishe
  koke krah krah_arm krajl krua kukudh kulle kuptim kuzhinier lahute
  liber lot luan_noun lugat lume magjistare mal mbret mbreteresha meme
  mik mike mjeshter moment motra mulli mur nder nene njeri
  nuse oda pallat para_money pate peme pende pije plak plake
  porta pranga prift prind pune pus qen qengj qilim qumesht
  qytet rast roje rrobe rruge sane sapun sherbetore shishe shpate
  shpelle shqiponje shtepi shtrige sqep sy tabak takim telashe thua
  tiger toke tomorr treg trim trup udhetar uje ujk ure
  urime vajze varr vella vend vit vitore zane zjarr zog
`)

// Every reviewed noun candidate without a complete paradigm is named here.
// The groups describe the remaining editorial work; they are not declension
// guesses and do not make these surfaces eligible for noun-role questions.
export const NOUN_PARADIGM_BACKLOG = Object.freeze({
  common: idSet(`
    agim ane are arme argjend armik arsye balle ballokume balte bar bari
    barut bekim berber bese bilete birre bisht bleta bolla bore bresher
    bretkose bri buke bujtine burg burrneshe celes caj dashje dasme
    dem_harm dhampir dhimbje dije ditelindje djathe djalosh dimer dordolec
    dru drithe dylle dyqan emer enderr fakt faj fat feste fe fik filxhan
    fitil fjale flori flutur fole force frike fryme fatura furke
    fushe fytyre gabim gardh gershere gjalpe gjilpere gjinkalla
    gjume gjysme gjysmegjel gji gju gjuhe gjegjeza goje gomar gozhde
    han hardhi harte here hotel hoxha hu hudher hyrje ide jave jete kafaz
    kafene kafe kafshe kala karroce kashte kenge kepuce keshille kopsht
    kohe kose kripe kujdes kukull kungull kurban kuror kurth kusur
    laker lajm lek lekure leng lidhje li liqen litar lloj luge lufte
    lule maja mami mejdan mengjes menyre merimanga mermer mesdite
    mesnate mjalte mi miell mish mjeker mjek mjegull mundim mundesi muaj
    mushkonje muzg nevoje njerke ore pagezim pasdite pasuri pe
    perendi perralle pershendetje peshk pjese pishtar plage plis
    plumb pluhur polici premte princ problem prove pyetje pyll qiri
    qiell qoshe raki re rendesi restorant rregull rreze rrufe samar shaka
    shenje shendet sherues shesh shkolle shkop shok shpetim shi shqiptar
    shpirt shtojzovalle shtrat stuhi teqe thes thike thesar
    thuper top tregtar tym udhe udhekryq unaze ushqim vajtim valle vatra
    vdekje vere vese vrime xhami xhind xhublete yll ylber zambak ze zemer
    zhurme zili zonje zot
    breshka brum dalje dashuri dhome dragua durim fatkeqesi gjel gjeme
    kulshedra kurbet mbremje mbreteri mekat mend plesht prag pranvere
    pushim sofer sokol vjeshte zoteri
  `),
  // Some dictionary senses are already definite/plural/familiar surfaces or
  // are lexicalized formulas. They need sense-merging or lemma review before a
  // paradigm can be authored safely.
  surfaceOrLemmaReview: idSet(`
    babi bukura burra eshtra flok gra gjethe loja mama minuta morra naten
    perime pleq rroba teto
  `),
  // Proper names and personified titles inflect in Albanian too, but their
  // useful case inventory and whether to teach it require separate review.
  properNamesAndTitles: idSet(`
    ali aliPasha argjiro arta bardhakuqja barkulku behuri doruntine elira
    flocka gjergj gjizar gjirokaster gjakove gjon halil handa jutbina kico
    kostandin kotor kruje kumaLisa lena lezhe lilo lubia maro mehill mihal
    mujo nereida omer ora osman osmani osum pano peri prespa prende rozafa
    rusha sariSalltek shengjergj shpirag shurdhi skender stihi tanusha tomor
    verbti ymer zadran zjerma zojz zuku
  `),
})

export const NOUN_PARADIGM_BACKLOG_IDS = new Set(
  Object.values(NOUN_PARADIGM_BACKLOG).flatMap((ids) => [...ids]),
)

export const NOUN_SENSE_IDS = new Set([
  ...REVIEWED_NOUN_PARADIGM_IDS,
  ...NOUN_PARADIGM_BACKLOG_IDS,
])

export const nounBacklogGroup = (id) =>
  Object.entries(NOUN_PARADIGM_BACKLOG).find(([, ids]) => ids.has(id))?.[0] || null
