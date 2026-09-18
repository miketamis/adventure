// EXPLICITLY AUTHORED "what can happen here" — the location card shown when you
// click a shared place on the World map. Keyed by the place's ANCHOR node
// (see NODE_AT in nodePositions.js). Each happening groups the scenes of one
// story-thread that plays out at this physical spot, in play order.
// Places without an entry fall back to one derived row per scene.
// mapaudit validates: every key is a real place anchor, every node belongs to
// that place, and no node appears in two happenings.
export const PLACE_META = {
  start: {
    name: 'ura para fshatit — the village bridgehead',
    happenings: [
      { title: 'the road, river and bridge into the village', nodes: ['start'] },
      { title: 'the first everyday conversation: greeting, movement, meeting place and time', nodes: ['bisedaUra1', 'bisedaUra2', 'bisedaUra3', 'bisedaUraPlan', 'bisedaFollowAgree', 'bisedaShesh', 'bisedaKroi'] },
    ],
  },
  lumi: {
    name: 'qyteti i lumit — the river city',
    continuityReason: 'The opening rescue and interrupted crowning occur here; after the complete hut, Field, hedge and kingdom journey, Handa returns on the promised day, Zjerma crosses the bridge at dawn for the sword-and-fire recognition, and the couple later return after three months with the twins’ mother.',
    densityReason: 'The river is a genuine shared encounter site: the twins’ saga, the visible Zana and the sleeping Bolla occur at different times on the same bank rather than in invented nearby places.',
    happenings: [
      { title: 'the dry river and its surrounding roads', nodes: ['lumi'] },
      { title: 'Bardhakuqja, the kulshedra and Wolfbelly', nodes: ['binoshetLumi', 'binoshetFund', 'binoshetHije'] },
      { title: 'Zjerma sees the night-long sword and Bardhakuqja crosses the fire', nodes: ['binoshetZjarri'] },
      { title: 'the river king gives Zjerma his staff and crown', nodes: ['binoshetDyKurorat'] },
      { title: 'the Zana beside the river', nodes: ['zana1'] },
      { title: 'the sleeping Bolla and Shëngjergj', nodes: ['bolla1', 'bolla2', 'bollaFund'] },
    ],
  },
  binoshetKasollja: {
    name: 'kasollja pranë përroit — the streamside hut',
    happenings: [
      { title: 'the warning Handa rejects and the counsel Zjerma receives', nodes: ['binoshetKasollja'] },
    ],
  },
  binoshetKopshtiZanave: {
    name: 'Fusha e Zonjave — the Field of the Ladies',
    happenings: [
      { title: 'white-clad maidens direct Handa and later Zjerma toward the Beauty’s cave', nodes: ['binoshetKopshtiZanave'] },
    ],
  },
  binoshetGardhiHanda: {
    name: 'gardhi dhe shpella — the hedge and the Beauty’s cave',
    happenings: [
      { title: 'Handa fails the three trials and turns to stone', nodes: ['binoshetGardhiHanda'] },
      { title: 'Zjerma passes the trials and binds the guardian', nodes: ['binoshetGardhiZjerma'] },
      { title: 'the white lily restores the petrified company', nodes: ['binoshetZambak'] },
      { title: 'Handa marries the Earthly Beauty and nine feast-days pass before Zjerma calls council', nodes: ['binoshetDasma', 'binoshetKuvendi'] },
    ],
  },
  binoshetKurora: {
    name: 'mbretëria e binoshëve — the twins’ ancestral kingdom',
    distributionReason: 'Schirò leaves the homeland unnamed, so it receives one dedicated castle-country marker: distant enough to preserve the months-long reconquest without falsely identifying it with another historical fortress.',
    continuityReason: 'The reconquest and the later three-month visit are two source-separated stays in the same restored ancestral kingdom, joined by the narrated journey to and return from Bardhakuqja’s river city.',
    happenings: [
      { title: 'a smaller company endures several months of war before Handa defeats the foreign king', nodes: ['binoshetLuftaFillon', 'binoshetLuftaZgjat', 'binoshetLuftaFund', 'binoshetKurora'] },
      { title: 'while Zjerma recovers, Handa keeps the promised day in the distant river city', nodes: ['binoshetShpata', 'binoshetNata'] },
      { title: 'Zjerma and Bardhakuqja stay three months with the twins’ mother', nodes: ['binoshetTeNena'] },
    ],
  },
  plaka: {
    name: 'kulla e Aga Ymerit',
    happenings: [
      { title: 'the old woman at the gate', nodes: ['plaka'] },
      { title: "Aga Ymer's seven years", nodes: ['agaYmer1', 'agaYmer2', 'agaYmerStay', 'agaYmerFund'] },
    ],
  },
  libriDiell: {
    name: 'oda e miqve — the guest-room',
    densityReason: 'One guest-room intentionally holds a whole evening of hospitality and eight separately listed, non-simultaneous conversations; the location card is its interior map.',
    happenings: [
      { title: 'bread and salt for the arriving guest', nodes: ['sofraMikut', 'sofraMikut2', 'sofraVendimPlaka', 'sofraVendimPusi'] },
      { title: 'the book of the Sun', nodes: ['libriDiell'] },
      { title: "the old man's welcome", nodes: ['oda1', 'odaPlak', 'oda2'] },
      { title: 'a song for the lord of the house', nodes: ['kengaLahute'] },
      { title: "the travellers' tales", nodes: ['udhetaret', 'tregMujo'] },
      { title: 'the sworn virgin', nodes: ['burrnesha1', 'burrneshaFund'] },
      { title: "Skanderbeg's goats", nodes: ['skender1', 'skender2', 'skenderFund', 'skenderKeq'] },
      { title: 'the lute plays all night', nodes: ['lahuta1', 'lahutaFund'] },
    ],
  },
  gjizar2: {
    name: 'rrugica e pasme — the back lane',
    happenings: [
      { title: "the king seeks Gjizar", nodes: ['gjizar2'] },
    ],
  },
  gjizarUdha: {
    name: 'udha që nuk kthehet — the road of no return',
    happenings: [
      { title: 'the wild woman and the helper households', nodes: ['gjizarUdha'] },
    ],
  },
  gjizarTradheti: {
    name: 'pusi i tradhtisë — the betrayal well',
    happenings: [
      { title: 'the rings and the brothers’ choice', nodes: ['gjizarTradheti', 'gjizarUnazatLena', 'gjizarVellezerRefuz', 'gjizarPus'] },
    ],
  },
  gjizarFund: {
    name: 'oborri i xhamisë — the mosque courtyard',
    happenings: [
      { title: 'Gjizar sings for the rightful winner', nodes: ['gjizarFund'] },
    ],
  },
  cuckoo1: {
    name: 'ara e qyqes — the cuckoo-field',
    happenings: [
      { title: 'Gjon the cuckoo', nodes: ['cuckoo1', 'cuckooFund', 'cuckooLule'] },
    ],
  },
  dallendyshe1: {
    name: 'streha e dallëndyshes — the swallow\'s eaves',
    happenings: [
      { title: 'the swallow and the serpent', nodes: ['dallendyshe1', 'dallendysheFund', 'dallendysheGjak'] },
    ],
  },
  sheshi: {
    name: 'sheshi i Gjakovës — the living city square',
    happenings: [
      { title: 'the market square, its healer direction and the old gate', nodes: ['sheshi', 'sheshiMjek', 'udhaShenja', 'udhaUdhetari'] },
      { title: 'bread and alms at the gate', nodes: ['lemoshaFund', 'lemoshaBuke'] },
    ],
  },
  tregtari: {
    name: "pazari — the trader's stall",
    happenings: [
      { title: 'trade and talk with the merchant', nodes: ['tregtari', 'tregtariBiseda'] },
      { title: 'buy bread and salt', nodes: ['blerjaBuke', 'blerjaKripe'] },
      { title: 'sell mountain tea', nodes: ['shitjaCaj'] },
    ],
  },
  tregtari2: {
    name: "dyqani — the trader's shop",
    happenings: [
      { title: 'haggle over the bigger numbers', nodes: ['tregtari2'] },
      { title: 'browse everyday goods for the road', nodes: ['sendetDites'] },
      { title: 'the lahuta on the wall', nodes: ['blerjaLahuta'] },
      { title: 'plis and xhubleta', nodes: ['plisiFund', 'xhubletaFund'] },
    ],
  },
  bujtina: {
    name: 'bujtina — the inn',
    happenings: [
      { title: 'a room and practical questions for the innkeeper', nodes: ['bujtina', 'bujtinariBiseda', 'gjumiBujtina'] },
      { title: 'coffee with the innkeeper', nodes: ['kafeja1', 'kafejaFund'] },
      { title: 'the fortune in the cup', nodes: ['fallFund'] },
      { title: 'raki and a toast', nodes: ['gezuarFund'] },
    ],
  },
  kalaMur: {
    name: 'kalaja e Rozafës',
    happenings: [
      { title: 'the wall that will not hold and the brothers\' vow', nodes: ['kalaMjegull', 'kalaPlak', 'kalaBesa'] },
      { title: 'the climb, the plea, the walling of Rozafa', nodes: ['kalaNgjitje', 'kalaLutje', 'kalaMur'] },
      { title: 'the brothers keep or break their word', nodes: ['kalaFundBesa', 'kalaFundTurp'] },
    ],
  },
  udhaKthimit: {
    name: 'udha nën Rozafë — the road below the castle',
    happenings: [
      { title: 'the homeward road and the castle vista', nodes: ['udhaKthimit'] },
    ],
  },
  kalaNate: {
    name: 'shtëpia e ndërtuesve — the builders\' house',
    happenings: [
      { title: "the builders' house before dawn", nodes: ['kalaNate', 'kalaMengjes'] },
    ],
  },
  uraArtes1: {
    name: 'ura e Artës — the masons\' yard',
    happenings: [
      { title: 'the bridge that falls each night', nodes: ['uraTjeter1', 'uraVellezerit', 'uraArtes1'] },
      { title: 'the old wayfarer names the price', nodes: ['uraArtes2'] },
      { title: 'the ring in the pit, the walling of the bride', nodes: ['uraGropa', 'uraMurim'] },
      { title: 'the bridge is saved or the oath is refused', nodes: ['uraArtesShpetim', 'uraArtesMur'] },
    ],
  },
  uraNata: {
    name: 'shtëpia e tre vëllezërve — the brothers\' house',
    happenings: [
      { title: 'the besa of silence, kept or broken', nodes: ['uraNata'] },
      { title: 'the bread and the three brides', nodes: ['uraMengjes'] },
    ],
  },
  fshatiLumi: {
    name: 'bregu i lumit — the village river bank',
    happenings: [
      { title: 'the bridge and river-quarter', nodes: ['fshatiLumi'] },
      { title: 'Elira waits, offers the errand, and starts uphill', nodes: ['eliraBreg', 'eliraEmriBreg'] },
      { title: 'the water-carrier stops beside the river', nodes: ['gruaUji1'] },
    ],
  },
  fshatiSheshi: {
    name: 'sheshi i fshatit — the square',
    densityReason: 'The square is the village crossroads: its everyday errand, bench talk and coffeehouse visits are separate moments at one open meeting place, not invented new locations.',
    happenings: [
      { title: 'the village square', nodes: ['fshatiSheshi'] },
      { title: 'birthday wishes at the family table', nodes: ['fshatiDitelindje', 'fshatiDitelindjeUrim'] },
      { title: 'meeting and catching up with Elira', nodes: ['eliraShesh', 'eliraEmriShesh', 'eliraBanore', 'eliraBiseda', 'eliraPorosiaDorezuar'] },
      { title: "Elira's bread-and-salt directions", nodes: ['porosiaShesh'] },
      { title: "the old man's bench", nodes: ['sheshiPlak'] },
      { title: 'coffee at the square', nodes: ['kafeneja', 'kafeneja2'] },
    ],
  },
  rrugaOdes: {
    name: 'rruga e odës — the guest-room road',
    happenings: [
      { title: 'the left-or-right turn from Elira’s directions', nodes: ['rrugaOdes'] },
    ],
  },
  pusiThate: {
    name: 'pusi i thatë — the dry well',
    happenings: [
      { title: 'the dry well and its deep shaft', nodes: ['pusiThate', 'pusiGuri'] },
      { title: "the market beside the well", nodes: ['pazariFshatit', 'porosiaBlerje', 'porosiaBlerjePergjigje'] },
    ],
  },
  dasma1: {
    name: 'oborri i dasmës — the wedding yard',
    happenings: [
      { title: 'the wedding, its neighbours and the round-dance', nodes: ['dasma1', 'dasmaBiseda', 'dasmaFund', 'valleFund'] },
    ],
  },
  mali3: {
    name: 'shtegu i lartë — the high mountain path',
    densityReason: 'The high path holds one continuous storm encounter: the traveller, Shurdhi, i Verbti and Mujo’s horse all remain on the same exposed mountainside while the player chooses whom to heed.',
    happenings: [
      { title: 'the last climb and the storm on the heights', nodes: ['mali3', 'maliStuhi'] },
      { title: 'Shurdhi and the hailstorm', nodes: ['shurdhi1', 'shurdhiFund'] },
      { title: "Mujo's wary horse accepts a listener and flees a grasping hand", nodes: ['kali1', 'kaliFund', 'kaliIkur'] },
      { title: 'i Verbti in the storm-fire', nodes: ['verbti1', 'verbtiFund', 'verbtiVdes'] },
    ],
  },
  vajtim1: {
    name: 'shtëpia e vajtimit — the lament house',
    happenings: [
      { title: 'the sickbed, the lahuta and the final lament', nodes: ['vajtim1', 'vajtimFund'] },
      { title: "the lahuta's account of Mujo's vengeance", nodes: ['mujoHak1', 'mujoHakFund', 'mujoHakKeq'] },
    ],
  },
  zanaProva: {
    name: 'prova e Zanës — the Zana’s river trial',
    happenings: [
      { title: 'the stone, the cradle and the offered gifts', nodes: ['zanaProva', 'zanaProva2'] },
      { title: 'the gift of strength and salt', nodes: ['zanaQumesht', 'zanaKripe'] },
      { title: 'gold or knowledge', nodes: ['zanaGold', 'zanaDije'] },
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
  maja: {
    name: 'Baba Tomorr',
    happenings: [
      { title: "the summit and the mountain-father's road", nodes: ['maja', 'tomor1', 'tomor2', 'tomor3'] },
      { title: 'the eagles of the summit', nodes: ['majaEagle'] },
      { title: 'the blessing', nodes: ['tomorBekim'] },
      { title: "the mountain-father's trials", nodes: ['tomorProva', 'tomorStuhi'] },
    ],
  },
  tsHyrje: {
    name: 'shpati i Tomorit — the giant’s slope',
    happenings: [
      { title: 'Tomor and the Beauty', nodes: ['tsHyrje', 'tsNuse', 'tsRoje', 'tsZgjim', 'tsShpeto'] },
    ],
  },
  shpirag1: {
    name: 'Mount Shpirag — the rival ridge',
    happenings: [
      { title: 'the rival giant', nodes: ['shpirag1'] },
    ],
  },
  tsRast: {
    name: 'rruga mbi Berat — the road above Berat',
    happenings: [
      { title: 'Shpirag descends for his cudgel', nodes: ['tsRast'] },
      { title: 'the duel of the mountains', nodes: ['tsBeteje', 'tsFundTomor', 'shpiragFund'] },
    ],
  },
  bota2: {
    name: "shpella e gjarprit — the serpent's cave",
    happenings: [
      { title: 'the great serpent', nodes: ['bota2', 'gjarpri'] },
      { title: 'the serpent bridegroom', nodes: ['gjarperBurr1', 'gjarperBurrVdes', 'gjarperBurr2', 'gjarperKerkim', 'gjarperOrigin'] },
    ],
  },
  bukura1: {
    name: 'pallati i Bukurës së Dheut — the Earthly Beauty’s court',
    continuityReason: 'The main descent and the Gjizar legend visit the same mythic court in serial tellings; their story graphs do not cross because neither episode occurs during the other.',
    happenings: [
      { title: 'the palace in the world below', nodes: ['bukura1', 'bukura2', 'bukuraThellesi', 'bukuraLirim'] },
      { title: 'Gjizar in the golden cage', nodes: ['gjizarPallat', 'gjizarKap'] },
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
  kordhaPallat: {
    name: "pallati i të Bukurës — the Beauty's palace",
    happenings: [
      { title: 'the palace of the Beauty of the Earth', nodes: ['kordhaPallat', 'kordhaZjarr'] },
      { title: "the she-dragon's trials", nodes: ['kordhaProva', 'kordhaProvaVdes'] },
      { title: 'the brothers choose their road', nodes: ['kordha2'] },
      { title: 'the sword and the sea', nodes: ['kordhaFund', 'kordhaDeti'] },
    ],
  },
  pylli1: {
    name: 'buza e pyllit të madh — the forest edge',
    happenings: [
      { title: 'into the great forest', nodes: ['pylli1'] },
      { title: "the three brothers and Kordha's oath", nodes: ['kordha1'] },
      { title: 'the dervish and the bear', nodes: ['arushe1', 'arushe2', 'arushePeme', 'arusheNate', 'arusheFund'] },
    ],
  },
  pylliHumbur: {
    name: 'rruga e humbur — the lost forest road',
    happenings: [
      { title: 'the road vanishes and the Ora offers her light', nodes: ['pylliHumbur', 'shtrigaLufta'] },
      { title: 'bread or salt is given before the traveller chooses light or darkness', nodes: ['oraPyllBuke', 'oraPyllKripe'] },
      { title: 'the Ora’s voice circles through every road', nodes: ['oraPyllVerdhe'] },
    ],
  },
  udha: {
    name: 'udha buzë lumit — the riverside road',
    densityReason: 'The road, night shelter and its successive revenant and miser-ghost encounters occupy one continuous roadside stopping place rather than invented destinations reached by listening.',
    happenings: [
      { title: 'the road by the river', nodes: ['udha', 'udheNate', 'udheOra'] },
      { title: 'the revenant at night', nodes: ['udheLugat', 'karkanxholl1', 'karkanxhollFund', 'karkanxhollKeq'] },
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
  mulli1: {
    name: 'mulliri — the working mill',
    distributionReason: 'The working mill, its night threshold, the women’s spring and Maro’s separate mill all cluster along the same watercourse; their distinct location cards preserve those neighboring social and story sites without spreading them artificially.',
    happenings: [
      { title: 'the master and work at the millstones', nodes: ['mulli1', 'lumiMjeshter', 'punaMulli', 'mulliFund', 'mulliKeq'] },
      { title: 'the unseen night workers', nodes: ['xhindMulli', 'xhindMulliFund', 'xhindMulliKeq'] },
    ],
  },
  kroi1: {
    name: 'kroi i fshatit — the village spring',
    densityReason: 'The water errand, women’s conversation and a drink from the spring are successive encounters at the same village water source.',
    happenings: [
      { title: 'water, everyday questions and the guest’s errand at the village spring', nodes: ['kroi1', 'vajzaKroiBiseda', 'kroiGrate', 'kroiGrate2', 'kroiFund'] },
    ],
  },
  maroMulli1: {
    name: 'mulliri i xhindëve — the night vigil',
    densityReason: 'All ten scenes form one continuous vigil on the same inner millstone floor; four listed beats keep the sequence readable without inventing false rooms.',
    happenings: [
      { title: 'Maro enters the occupied mill', nodes: ['maroMulli1', 'maroXhindet1'] },
      { title: 'the three-part litany', nodes: ['maroLitani1', 'maroLitani2', 'maroLitani3'] },
      { title: 'the crooked hand and its answers', nodes: ['maroShtremberDore', 'maroDoraShtember', 'maroDoraFalje', 'maroShtrember'] },
      { title: 'the vigil abandoned', nodes: ['maroNataHumbur'] },
    ],
  },
  maroShtepi: {
    name: 'shtëpia e njerkës — the poor house',
    continuityReason: 'These are successive tale-time visits to the same poor house; chronology deliberately prevents the player from reopening an earlier household beat after the midnight return.',
    happenings: [
      { title: 'the njerka and her daughters', nodes: ['maroShtepi', 'maroNjerka'] },
      { title: 'answering to the name (Maro Përhitura)', nodes: ['maroNisja', 'maroLiloNis', 'maroLiloKthim'] },
      { title: 'news of the prince', nodes: ['maroLajmi'] },
      { title: 'home after the midnight feast', nodes: ['maroKthyerShtepi'] },
      { title: 'the wedding party reaches the house', nodes: ['maroKrushqit'] },
    ],
  },
  maroIkja: {
    name: 'udha e mesnatës — the midnight road',
    happenings: [
      { title: 'the flight from the feast', nodes: ['maroIkja'] },
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
      { title: 'the birth, needle and bird', nodes: ['maroPallati', 'maroGjilpera', 'maroLindja', 'maroZogu'] },
    ],
  },
  maroKopshti: {
    name: 'korija e pallatit — the palace garden wood',
    happenings: [
      { title: 'the bird in the golden tree', nodes: ['maroKopshti', 'maroCiuCiu'] },
      { title: 'Maro restored', nodes: ['maroFundi'] },
    ],
  },
  prespaPyll: {
    name: 'pylli mbi Prespë — the Prespa lakeside wood',
    happenings: [
      { title: "Nereida's warning", nodes: ['prespaPyll', 'prespaLiri'] },
    ],
  },
  prespaFund: {
    name: 'qyteti nën Prespë — the town beneath the lake',
    happenings: [
      { title: 'the flood that became Lake Prespa', nodes: ['prespaFund'] },
    ],
  },
  aliPashaLiqen: {
    name: 'ishulli i liqenit — Ali Pasha\'s lake island',
    happenings: [
      { title: 'Ali Pasha of Tepelena', nodes: ['aliPashaLiqen', 'aliPashaVdes', 'aliPashaRob'] },
    ],
  },
  argjiroKala: {
    name: 'Kalaja e Argjirosë — Gjirokastër',
    happenings: [
      { title: "Argjiro's last choice", nodes: ['argjiroKala', 'argjiroFund', 'argjiroRob'] },
    ],
  },
  sari1: {
    name: 'shpella e Sari Salltëkut — the Krujë cave',
    distributionReason: 'This remote leaf is the dervish-led Krujë cave encounter: the accompanied ascent, battle, royal proof and explicit return to the well form one compressed witness tale rather than an ordinary through-road.',
    happenings: [
      { title: 'Sari Salltëk and the Kulshedra', nodes: ['sari1', 'sari2', 'sariFund'] },
    ],
  },
  jutbina: {
    name: 'Jutbina — the highland hamlet',
    happenings: [
      { title: 'the hamlet and its song', nodes: ['jutbina', 'kengaJutbina'] },
      { title: 'Halil Garria returns home', nodes: ['halilGarriaFund'] },
      { title: "Halili's summons and refusal", nodes: ['haliliDeka', 'haliliJeton'] },
    ],
  },
  odaJutbina: {
    name: 'oda e Jutbinës — the great guest-room',
    happenings: [
      { title: 'the guest-room', nodes: ['odaJutbina'] },
      { title: "Mujo's dawn coffee and Behuri muster", nodes: ['behuriJutbina'] },
    ],
  },
  gbMuji1: {
    name: 'dy lisat — Mujo beneath the twin trees',
    happenings: [
      { title: 'Gjeto Basho Muji wounded', nodes: ['gbMuji1', 'gbMujiFund', 'gbMujiVdes'] },
    ],
  },
  osmaniBurg: {
    name: "burgu i krajlit — the Krajl's prison",
    happenings: [
      { title: "Arnaut Osmani's captivity", nodes: ['osmaniBurg', 'osmaniVdekur', 'osmaniProvat', 'osmaniVallja', 'osmaniShpata', 'osmaniZbuluar', 'osmaniRob'] },
    ],
  },
  osmaniLiri: {
    name: 'udha e Jutbinës — the homeward road into Jutbina',
    happenings: [
      { title: "Arnaut Osmani brings the freed company home", nodes: ['osmaniLiri'] },
    ],
  },
  kreshnikRrembimi1: {
    name: 'dera e Halilit — Halili’s door in Jutbina',
    happenings: [
      { title: 'the Zanas bring news of captive Mujo at midnight', nodes: ['kreshnikRrembimi1', 'kreshnikRrembimiNisja', 'kreshnikRrembimiRefuz'] },
    ],
  },
  kreshnikRrembimiBurg: {
    name: "kulla e krajlit — the Krajl's prison tower",
    continuityReason: "This is the prison of Mujo's own rescue song, not Arnaut Osmani's group dungeon or Rusha's household tower; the separate marker preserves three incompatible captives and three different Krajls.",
    happenings: [
      { title: "Halili and Mujo's courser break the iron door", nodes: ['kreshnikRrembimiBurg'] },
    ],
  },
  kreshnikRrembimiFund: {
    name: 'udha e kthimit — the homeward approach to Jutbina',
    happenings: [
      { title: 'Halili brings Mujo home alive', nodes: ['kreshnikRrembimiFund', 'kreshnikRrembimiHumbur'] },
    ],
  },
  behuriNdarja: {
    name: 'bjeshka e kufirit — the frontier high pasture',
    happenings: [
      { title: 'two days of searching and the split of the companies', nodes: ['behuriNdarja', 'behuriKotorHumbur'] },
    ],
  },
  behuriBurimi: {
    name: 'burimi i Xhurit — the spring at Xhuri',
    happenings: [
      { title: "Mujo's Ora warns him away from Behuri's water", nodes: ['behuriBurimi', 'behuriBurimHumbur'] },
    ],
  },
  behuriKulla: {
    name: "kulla e Behurit — Behuri's fortified tower",
    continuityReason: "Behuri is a captain with his own tower, powder room and slain company; this is not any Krajl's prison, Rusha's home, or a generic Jutbina kulla.",
    happenings: [
      { title: 'the steel keys, thirty heads and the powder fuse', nodes: ['behuriKulla', 'behuriKullaHumbur'] },
    ],
  },
  behuriMejdan: {
    name: 'mejdani i Behurit — Behuri’s open duel ground',
    happenings: [
      { title: 'Mujo hears the Ora and asks for one last look at the sun', nodes: ['behuriMejdan', 'behuriMejdanKeshilla', 'behuriMejdanHumbur'] },
    ],
  },
  behuriFund: {
    name: 'udha e Jutbinës — the returning company',
    happenings: [
      { title: 'Mujo returns from Behuri’s ruined tower', nodes: ['behuriFund'] },
    ],
  },
  udhaSyri: {
    name: 'Syri i Kaltër — the Blue Eye spring',
    happenings: [
      { title: 'the serpent’s eye becomes a spring and water is channelled home', nodes: ['udhaSyri', 'syriKanali', 'syriFund'] },
    ],
  },
  halilGarria1: {
    name: 'udha e Garrisë — the rescue road',
    happenings: [
      { title: "Halil Garria's rescue", nodes: ['halilGarria1', 'halilGarriaKeq'] },
    ],
  },
  mujoKale: {
    name: 'roja e kalit — the guarded horse',
    happenings: [
      { title: "Mujo's courser", nodes: ['mujoKale', 'mujoKaleFund', 'mujoKaleLarg'] },
    ],
  },
  aliBajr1: {
    name: 'kulla e Ali Bajraktarit',
    happenings: [
      { title: "Ali Bajraktari's besa", nodes: ['aliBajr1', 'aliBajrFund', 'aliBajrKeq'] },
    ],
  },
  mejdan1: {
    name: 'mejdani — the duelling ground',
    happenings: [
      { title: 'the duel on the mejdan', nodes: ['mejdan1', 'mejdan2', 'mejdanKeq', 'haliliMejdan'] },
      { title: 'the besa between rivals', nodes: ['besaVella', 'besaThyer'] },
    ],
  },
  lendina: {
    name: 'lëndina e zjarrit — the forest clearing',
    happenings: [
      { title: 'the clearing and its sleeping-ground', nodes: ['lendina', 'gjumi', 'gjumiUjkShok'] },
      { title: 'the sacred guest at the fire', nodes: ['besaFire', 'besaBekim'] },
      { title: 'the witch at the fire', nodes: ['shtrigaNate', 'shtrigaIkur'] },
    ],
  },
  pylliThelle: {
    name: 'gryka e ujkut — the deep-forest den',
    happenings: [
      { title: 'the hungry wolf', nodes: ['pylliThelle', 'shokuUjk', 'eaten'] },
      { title: 'the wolf remembers its beginning', nodes: ['ujkuLind1', 'ujkuFund'] },
    ],
  },
  kulshedra1: {
    name: 'strofulla e kulshedrës — the she-dragon’s lair',
    happenings: [
      { title: 'the duel with the Kulshedra', nodes: ['kulshedra1', 'kulshLufte1', 'kulshLufte2', 'fitorja'] },
      { title: 'the lightning-maiden descends into the duel', nodes: ['bijaHene1', 'bijaHeneFund'] },
      { title: 'the dragua intervenes', nodes: ['dranguasi'] },
    ],
  },
  fshatiDil: {
    name: 'rruga e portës — the village outskirts',
    happenings: [
      { title: 'the frightened woman at the gate', nodes: ['fshatiDil', 'dilFrike'] },
      { title: 'the blood-feud on the road', nodes: ['gjak1', 'gjak2', 'gjakFund'] },
    ],
  },
  shqipe2: {
    name: 'foleja e shqiponjës — the eagle’s nest',
    happenings: [
      { title: 'the serpent and the chick', nodes: ['shqipe2', 'shqipe3'] },
      { title: 'the eagle’s bargain', nodes: ['shqipeBarter', 'shqipeKapur', 'shqipeFund'] },
    ],
  },
  kostandin1: {
    name: 'udha e varreve — the road of the dead',
    happenings: [
      { title: 'the mother’s oath', nodes: ['kostandin1', 'kostandin2'] },
      { title: 'the ride and homecoming', nodes: ['kostandin3', 'kostandinFund'] },
      { title: 'the road left undisturbed', nodes: ['kostandinPushim'] },
    ],
  },
  gjizar1: {
    name: 'piruni i tri rrugëve — the three-road fork',
    happenings: [
      { title: 'the three-road fork', nodes: ['gjizar1'] },
      { title: 'the bee, spider, and cicada', nodes: ['bleta1', 'bletaFund', 'merimangaFund', 'gjinkallaFund'] },
    ],
  },
  bregu: {
    name: 'kulla në breg — the shore tower',
    happenings: [
      { title: 'the wounded hero and his sister', nodes: ['bregu', 'balozMotra', 'balozTribut', 'balozZgjedh'] },
      { title: 'the night before the tribute', nodes: ['bregFle'] },
    ],
  },
  pallatiZi: {
    name: 'pallati i zi — the black palace',
    happenings: [
      { title: 'the locked gate and its guard', nodes: ['pallatiZi', 'pallatRoje'] },
      { title: 'the return to the palace', nodes: ['pallatiKthim'] },
    ],
  },
  djepi1: {
    name: 'shtëpia e djepit — the cradle house',
    happenings: [
      { title: 'the Fates arrive at the cradle', nodes: ['djepi1', 'djepi2'] },
      { title: 'the riddle and its judgment', nodes: ['djepi3', 'djepiKeq', 'djepiFund'] },
    ],
  },
  udhaThate: {
    name: 'shtrati i lumit të tharë — the dry riverbed',
    happenings: [
      { title: 'the dry road and the wolf', nodes: ['udhaThate', 'ujkuUje'] },
      { title: 'the Lubia in the riverbed', nodes: ['lubia1', 'lubiaKoke', 'lubiaFund'] },
    ],
  },
  mujo1: {
    name: 'kulla e Mujos — Mujo’s tower',
    happenings: [
      { title: 'the journey for Tanusha', nodes: ['mujo1', 'mujo2', 'mujo3'] },
      { title: 'captivity and rescue', nodes: ['mujo4', 'mujoFund'] },
      { title: "Omer's story in Mujo's tower", nodes: ['omer1', 'omer2', 'omerFund'] },
    ],
  },
  detiThelle1: {
    name: 'pragu i detit të thellë — the deep-sea threshold',
    distributionReason: 'This is intentionally wide water between the coast and the deep palace; its descent and storm scenes identify the crossing without padding the sea with invented stops.',
    happenings: [
      { title: 'the deep-water crossing', nodes: ['detiThelle1', 'detiStuhi'] },
    ],
  },
  flocka1: {
    name: 'bregu i liqenit të qetë — the still-lake shore',
    distributionReason: 'This lake is a deliberately distant shore branch reached from the river; the two-part Floçka encounter gives the destination local identity without invented transit scenes.',
    happenings: [
      { title: 'Floçka at the still lake', nodes: ['flocka1', 'flockaFund'] },
    ],
  },
  gjarperKulshedra: {
    name: 'bregu përtej detit — the far shore',
    distributionReason: 'This is the remote destination of the over-sea search; the three-scene Kulshedra climax is intentionally isolated rather than empty transit.',
    happenings: [
      { title: 'the Kulshedra beyond the sea', nodes: ['gjarperKulshedra', 'gjarperKulVdes', 'gjarperBurrFund'] },
    ],
  },
  mujiZana1: {
    name: "livadhi i zanave — the zanas' meadow",
    happenings: [
      { title: "Muji and the zanas' gifts", nodes: ['mujiZana1', 'mujiZana2', 'mujiFund', 'mujiPasuri', 'mujiDije'] },
    ],
  },
}
