// HAND-AUTHORED "what can happen here" — the location card shown when you
// click a shared place on the World map. Keyed by the place's ANCHOR node
// (see NODE_AT in nodePositions.js). Each happening groups the scenes of one
// story-thread that plays out at this physical spot, in play order.
// Places without an entry fall back to one derived row per scene.
// mapaudit validates: every key is a real place anchor, every node belongs to
// that place, and no node appears in two happenings.
export const PLACE_META = {
  plaka: {
    name: 'kulla e Aga Ymerit',
    happenings: [
      { title: 'the old woman at the gate', nodes: ['plaka'] },
      { title: "Aga Ymer's seven years", nodes: ['agaYmer1', 'agaYmer2', 'agaYmerStay', 'agaYmerFund'] },
    ],
  },
  libriDiell: {
    name: 'oda e miqve — the guest-room',
    happenings: [
      { title: 'the book of the Sun', nodes: ['libriDiell'] },
      { title: "the old man's welcome", nodes: ['oda1', 'odaPlak', 'oda2'] },
      { title: 'a song for the lord of the house', nodes: ['kengaLahute'] },
      { title: "the travellers' tales", nodes: ['udhetaret', 'udhetaretBisede', 'udhetaretBisede2', 'tregMal', 'tregDet', 'tregMujo', 'tregDragua'] },
      { title: 'the sworn virgin', nodes: ['burrnesha1', 'burrneshaFund'] },
      { title: "Skanderbeg's goats", nodes: ['skender1', 'skender2', 'skenderFund'] },
      { title: 'the lute plays all night', nodes: ['lahuta1', 'lahutaFund'] },
    ],
  },
  gjizar2: {
    name: 'rrugica e pasme — the back lane',
    happenings: [
      { title: "the king's golden chick", nodes: ['gjizar2', 'gjizarUdha', 'gjizarPallat', 'gjizarKap', 'gjizarTradheti', 'gjizarPus', 'gjizarFund'] },
      { title: 'Gjon the cuckoo', nodes: ['cuckoo1', 'cuckooFund'] },
      { title: 'the swallow and the serpent', nodes: ['dallendyshe1', 'dallendysheFund'] },
    ],
  },
  tregtari: {
    name: "pazari — the trader's stall",
    happenings: [
      { title: 'trade with the merchant', nodes: ['tregtari', 'tregtari2'] },
      { title: 'buy bread and salt', nodes: ['blerjaBuke', 'blerjaKripe'] },
      { title: 'sell mountain tea', nodes: ['shitjaCaj'] },
      { title: 'the lahuta on the wall', nodes: ['blerjaLahuta'] },
      { title: 'plis and xhubleta', nodes: ['plisiFund', 'xhubletaFund'] },
    ],
  },
  bujtina: {
    name: 'bujtina — the inn',
    happenings: [
      { title: 'a bed for the night', nodes: ['bujtina', 'gjumiBujtina'] },
      { title: 'coffee with the innkeeper', nodes: ['kafeja1', 'kafejaFund'] },
      { title: 'the fortune in the cup', nodes: ['fallFund'] },
      { title: 'raki and a toast', nodes: ['gezuarFund'] },
    ],
  },
  kalaMur: {
    name: 'kalaja e Rozafës',
    happenings: [
      { title: 'the wall that will not hold', nodes: ['kalaMjegull', 'kalaPlak'] },
      { title: 'the climb, the plea, the walling of Rozafa', nodes: ['kalaNgjitje', 'kalaLutje', 'kalaMur'] },
    ],
  },
  uraArtes1: {
    name: 'ura e Artës — the masons\' yard',
    happenings: [
      { title: 'the bridge that falls each night', nodes: ['uraTjeter1', 'uraVellezerit', 'uraArtes1'] },
      { title: 'the old wayfarer names the price', nodes: ['uraArtes2'] },
      { title: 'the ring in the pit, the walling of the bride', nodes: ['uraGropa', 'uraMurim'] },
    ],
  },
  uraNata: {
    name: 'shtëpia e tre vëllezërve — the brothers\' house',
    happenings: [
      { title: 'the besa of silence, kept or broken', nodes: ['uraNata'] },
      { title: 'the bread and the three brides', nodes: ['uraMengjes'] },
    ],
  },
  fshatiSheshi: {
    name: 'sheshi i fshatit — the square',
    happenings: [
      { title: 'the village square', nodes: ['fshatiSheshi'] },
      { title: 'the wedding and the round-dance', nodes: ['dasma1', 'dasmaFund', 'valleFund'] },
      { title: "the old man's bench", nodes: ['sheshiPlak', 'sheshiPlak2', 'sheshiPlak3'] },
    ],
  },
  kopshtMermer1: {
    name: 'kopshti i mermertë — the marble garden',
    happenings: [
      { title: "the marble king's garden", nodes: ['kopshtMermer1', 'kopshtMermer2'] },
      { title: 'the night watch', nodes: ['mermerZgjim', 'mermerTradheti', 'mermerSli'] },
      { title: 'the goose-girl and the king', nodes: ['patatGruaja', 'mbretiDrejtesi', 'patatHesht'] },
    ],
  },
  tomor1: {
    name: 'Baba Tomorr',
    happenings: [
      { title: "the mountain-father's trials", nodes: ['tomor1', 'tomor2', 'tomor3', 'tomorProva', 'tomorStuhi'] },
      { title: 'the eagles of the summit', nodes: ['majaEagle'] },
      { title: 'the blessing', nodes: ['tomorBekim'] },
      { title: 'the giant and the Beauty', nodes: ['tsHyrje', 'tsNuse', 'tsRoje', 'tsZgjim', 'tsShpeto', 'tsFundTomor'] },
    ],
  },
  shpirag1: {
    name: 'Mount Shpirag — Berat in the gorge',
    happenings: [
      { title: 'the rival giant', nodes: ['shpirag1', 'tsRast'] },
      { title: 'the duel of the mountains', nodes: ['tsBeteje', 'shpiragFund'] },
    ],
  },
  bota2: {
    name: "shpella e gjarprit — the serpent's cave",
    happenings: [
      { title: 'the great serpent', nodes: ['bota2', 'gjarpri'] },
      { title: 'the serpent bridegroom', nodes: ['gjarperBurr1', 'gjarperBurrVdes', 'gjarperBurr2', 'gjarperKerkim', 'gjarperOrigin'] },
    ],
  },
  pusi2: {
    name: "fundi i pusit — the well's bottom",
    happenings: [
      { title: 'the eagle in the well', nodes: ['pusi2', 'shqiponja1', 'rene'] },
      { title: 'the climb to the light', nodes: ['ngjitja1', 'ngjitja2', 'ngjitja3', 'mishiVetes'] },
    ],
  },
  nastradin1: {
    name: "oborri i hoxhës — Nastradin's yard",
    happenings: [
      { title: 'the borrowed cauldron', nodes: ['nastradin1', 'nastradinFund', 'nastradin2', 'nastradinUrte'] },
      { title: 'the smell of the food', nodes: ['nastradinGjyq1', 'nastradinGjyqFund', 'nastradinGjyqKeq'] },
    ],
  },
  katallan1: {
    name: 'shpella e katallanit — the cyclops cave',
    happenings: [
      { title: 'the cave and the captive', nodes: ['katallan1', 'katallanRob', 'katallanGur', 'katallanZjarr'] },
      { title: 'the blinding of the giant', nodes: ['katallanVerbim', 'katallanFund', 'katallanVdes'] },
    ],
  },
  kordha2: {
    name: "pallati i të Bukurës — the Beauty's palace",
    happenings: [
      { title: 'the palace of the Beauty of the Earth', nodes: ['kordha2', 'kordhaPallat', 'kordhaZjarr'] },
      { title: "the she-dragon's trials", nodes: ['kordhaProva', 'kordhaProvaVdes'] },
      { title: 'the sword and the sea', nodes: ['kordhaFund', 'kordhaDeti'] },
    ],
  },
  pylli1: {
    name: 'buza e pyllit të madh — the forest edge',
    happenings: [
      { title: 'into the great forest', nodes: ['pylli1'] },
      { title: 'the dervish and the bear', nodes: ['arushe1', 'arushe2', 'arushePeme', 'arusheNate', 'arusheFund'] },
    ],
  },
  udha: {
    name: 'udha buzë lumit — the riverside road',
    happenings: [
      { title: 'the road by the river', nodes: ['udha', 'udheNate', 'udheOra'] },
      { title: 'the revenant at night', nodes: ['udheLugat'] },
      { title: 'the miser-ghost', nodes: ['kukudh1', 'kukudhFund'] },
    ],
  },
  shtojzovalle1: {
    name: "lëndina e shtojzovalleve — the moon-dancers' glade",
    happenings: [
      { title: 'the dance in the moonlight', nodes: ['shtojzovalle1', 'shtojzovalle2', 'shtojzovalleVallja', 'shtojzovalleLot', 'shtojzovalleBekim'] },
      { title: "the maiden's shirt", nodes: ['shtojzovalleNuse'] },
    ],
  },
  lumiMjeshter: {
    name: 'mulliri — the mill',
    happenings: [
      { title: 'the master of the mill', nodes: ['lumiMjeshter', 'lumiMjeshter2'] },
      { title: 'work at the millstones', nodes: ['mulli1', 'punaMulli', 'mulliFund', 'mulliKeq'] },
      { title: "the xhindet's night mill (Maro Përhitura)", nodes: ['maroMulli1', 'maroXhindet1', 'maroLitani1', 'maroLitani2', 'maroLitani3', 'maroShtremberDore', 'maroNataHumbur', 'maroDoraShtember', 'maroDoraFalje', 'maroShtrember'] },
    ],
  },
  maroShtepi: {
    name: 'shtëpia e njerkës — the poor house',
    happenings: [
      { title: 'the njerka and her daughters', nodes: ['maroShtepi', 'maroNjerka'] },
      { title: 'answering to the name (Maro Përhitura)', nodes: ['maroNisja', 'maroLiloNis', 'maroLiloKthim'] },
      { title: 'the news, the wedding train, the fork', nodes: ['maroLajmi', 'maroIkja', 'maroKrushqit', 'maroPrincesha'] },
    ],
  },
  maroTetua: {
    name: 'shtëpia e tetos — the auntie\'s house',
    happenings: [
      { title: 'the magjistare and the pumpkin coach (Maro Përhitura)', nodes: ['maroTetua'] },
    ],
  },
  maroHani: {
    name: 'hani i princit — the feast-inn',
    happenings: [
      { title: 'the shoe cut to a dream (Maro Përhitura)', nodes: ['maroHani', 'maroMesnata'] },
    ],
  },
  maroPallati: {
    name: 'pallati i princit — another land',
    happenings: [
      { title: 'the needle and the bird (Maro Përhitura)', nodes: ['maroPallati', 'maroLindja', 'maroZogu', 'maroKopshti', 'maroFundi', 'maroCiuCiu'] },
    ],
  },
  mejdan1: {
    name: 'mejdani — the duelling ground',
    happenings: [
      { title: 'the duel on the mejdan', nodes: ['mejdan1', 'mejdan2', 'mejdanKeq'] },
      { title: 'the besa between rivals', nodes: ['besaVella', 'besaThyer'] },
    ],
  },
  mujiZana1: {
    name: "livadhi i zanave — the zanas' meadow",
    happenings: [
      { title: "Muji and the zanas' gifts", nodes: ['mujiZana1', 'mujiZana2', 'mujiFund', 'mujiPasuri', 'mujiDije'] },
    ],
  },
}
