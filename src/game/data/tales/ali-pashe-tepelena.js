// ===========================================================================
// TALE: Ali Pashë Tepelena — the Lion of Ioannina — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// This is a LEGEND, not a wonder-tale: no Elsie folktale/legend page covers
// this figure (he is absent from index_legends.html), so the folklore card
// itself cites Wikipedia — the source read here. The full modern biography
// runs to dozens of paragraphs of Ottoman administrative and diplomatic
// history (klepht politics, Filiki Eteria maneuvering, French/Venetian/
// British treaty detail) with no footprint anywhere in this game's world;
// what follows is condensed to the arc folk memory actually keeps, and that
// the FOLKLORE card itself names: the tyrant and the state-builder, the
// blood feud, Byron's fascination, and the old lion run down on his own
// lake. See `discrepancies` for exactly what was set aside and why.
// ===========================================================================

export default {
  id: 'ali-pashe-tepelena',
  title: 'Ali Pashë Tepelena — the Lion of Ioannina',
  source:
    'Wikipedia, "Ali Pasha of Yanina" (en.wikipedia.org, retrieved 2026-07-15) — the source folklore.js itself cites; read alongside contemporary eyewitness colour from John Cam Hobhouse\'s A Journey through Albania (1813) and W. M. Leake\'s Travels in Northern Greece (1835), and Henry N. Brailsford\'s Macedonia: Its Races and Their Future (1906); all lines are my own paraphrase, condensed from a much longer biographical record',
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: {
    region: 'South Albania (Tosk) — born at Tepelenë on the Vjosë; his court and death both at Ioannina in Epirus, then reckoned part of the same Ottoman "Albania" his own letters claimed, today across the border in Greece',
    collector: 'a historical figure, not a collected folk-informant — the English record here follows Wikipedia\'s consolidated modern biography',
    published: 'events 1740–1822; this retelling condensed from the English Wikipedia article as retrieved 2026-07-15',
  },
  // the ALBANIAN ORIGINAL — genuinely absent for the biographical arc as a
  // whole (see `why`); ONE beat (`eufrozina`) nonetheless carries real,
  // verbatim Albanian verse, because a real connected source for that one
  // episode does exist — see that beat's lines and the note below.
  albanian: {
    status: 'missing',
    why: 'Grepped every local Albanian corpus for "Ali Pash", "Tepelen", "Janinë/Janina", "Kardhiq", "Hormovë": pralla-popullore-shqiptare-1954.sq.txt (the 1954 Tirana corpus, 50 tales — zero hits), dozon-manuel-langue-chkipe.fr-sq.txt (two folk-song fragments mentioning "Tepelen" with an editor\'s footnote SPECULATING a link to "l\'époque d\'Ali-Pacha" — a guess, not a narrative), hahn-albanesische-studien.de-sq.txt (German geographic/ethnographic prose mentioning "Ali Pascha von Tepelen" only in passing, no narrative), jarnik-zur-albanischen-sprachenkunde.de-sq.txt, meyer-kurzgefasste-grammatik.de-sq.txt, lambertz-albanische-marchen.de-sq.txt, ymer-age-ulqini.sq.txt, kanuni-leke-dukagjinit.sq.txt, vajtimi-i-ajkunes.sq.txt — zero connected narrative in any of them. The one substantial find: Gjergj Fishta\'s Lahuta e Malcis (1937), Kangë e Gjashtëmbëdhetët, a ~35-line sung ballad about a girl of Janina, Eufrozina, and "Ali pashë Tepelena" (the poem\'s own footnote confirms the identification: "Janinë: qyteti i Ali Pashës-Tepelena"). That is a LITERARY 1937 verse elaboration of the historical "Kyra Frosini" drowning-legend, not a folk-collected line-by-line source for the wider biography — but it IS a real, connected, verbatim Albanian telling of ONE episode, so it is used as such on the `eufrozina` beat (see docs/references/fishta-eufrozina-ali-pashe.sq.txt for the full extract with provenance). No comparable Albanian original covers the rest of the tale\'s arc, so the tale\'s overall status stays `missing` rather than presenting one borrowed episode as if it translated a continuous English source it does not.',
  },
  discrepancies: [
    'BIRTH YEAR: the FOLKLORE card fixes "1740–1822" and this tale follows it as the game\'s own canon. Wikipedia\'s infobox instead gives "1743 – 24 January 1822," and its own body text calls him "78 or 79" at death — which fits 1743 better than 1740. Record-keeping this far back and this contested is simply unsettled; the beats use 1740 throughout to match the card already fixed in folklore.js.',
    'HOW HE TOOK IOANNINA (¶9.4): Wikipedia itself records two incompatible accounts of the 1788 appointment — that Ali ringed the city with troops and produced a forged Sultan\'s decree before the Porte could object, OR that the city\'s own notables petitioned the Sultan on his behalf. Nothing settles which is true; the beat keeps both readings rather than picking one.',
    'HOW HE DIED (¶20.2-20.3): Wikipedia records at least four differing accounts of the final gunfight. The earliest-recorded names the Ottoman official Kiose Mehmed Pasha: Ali refuses to admit him until he has read the execution document himself, the official pushes past him regardless and gunfire breaks out, Ali is mortally wounded and beheaded, and his last request to his bodyguard — that his wife Kyra be killed rather than taken — goes unanswered. Three later, vaguer versions also circulate (a straightforward arrest-and-resist ending in a shot through the heart; a balcony ambush followed by gunfire through the wooden floor; and a document-refusal-and-crossfire version that ends with him shot through the floorboards, which Wikipedia itself flags as "recorded at the monastery thirty years later... the one most widely told today"). These beats follow the FIRST, earliest-recorded Kiose Mehmed Pasha account — the one with the document-reading refusal and the unanswered last request for Kyra — not the later "most widely told" floorboards version a previous version of this note wrongly named.',
    'EUFROZINA IS NOT KIRA VASILIKI: two different women appear in this tale and must not be conflated. Kira Vasiliki (¶15) is Ali\'s real, historically documented favourite wife, first pardoned by him as a child and later married into his household — her story is one of the tale\'s few notes of mercy. Eufrozina (¶11) is a separate figure from a separate source (Fishta\'s 1937 verse, elaborating the historical "Kyra Frosini" drowning-legend) — a girl who refused Ali outright and drowned herself rather than be taken. The cast and NPC registry keep them as two people throughout.',
    'THE NAME "ALI PASHA" IS NOT UNIQUE: Gjergj Fishta\'s own epic (Lahuta e Malcis) also sings of an unrelated 19th-century northern chieftain, "Ali Pashë Gucia" (Kangë e Tetët, League of Prizren era) and of "Mehmet Ali Pasha," the Ottoman commander who fought him. Neither belongs to this tale; see the aliPasha NPC entry\'s own note.',
    'SCOPE (all of ¶¶): the full Wikipedia article runs to dozens of further paragraphs on Filiki Eteria maneuvering, klepht and armatole politics, and French/Venetian/British treaty history that shaped events around Ali without shaping the LEGEND of him — none of it survives in folk memory as "his" story the way the blood feud, Byron\'s visit, or the lake death do, and none of it has any footprint in this game\'s world. It is set aside here, not silently — this note records the omission.',
  ],
  // sentence counts of this tale's 21 paragraphs (my own condensed English
  // telling — see `source`; there is no separate original translation to
  // paraphrase FROM, so the paragraph text and the beat lines' English are
  // the same wording, exactly as ura-e-artes.js already does when no English
  // translation of its own source exists)
  paragraphs: [5, 4, 3, 4, 4, 4, 4, 4, 5, 5, 9, 6, 4, 4, 2, 7, 4, 4, 3, 6, 6],
  cast: [
    { id: 'aliPasha', name: 'Ali Pashë Tepelena', note: 'bandit, then Pasha of Ioannina — ruthless, cunning, and driven by one old debt', npc: 'aliPasha' },
    { id: 'hamko', name: 'Hamko', note: 'his mother — widowed young, and the one who taught him never to forgive', npc: 'hamko' },
    { id: 'kurtPasha', name: 'Ahmet Kurt Pasha', note: 'the rival Pasha of Berat who made and unmade Ali\'s early career', npc: 'kurtPasha' },
    { id: 'muhtarPasha', name: 'Muhtar Pasha', note: 'Ali\'s eldest son and general, until the final siege', npc: 'muhtarPasha' },
    { id: 'kiraVasiliki', name: 'Kira Vasiliki', note: 'Ali\'s favourite wife — once a child pleading for her father\'s life', npc: 'kiraVasiliki' },
    { id: 'hurshidPasha', name: 'Hurshid Pasha', note: 'the Ottoman commander who finally trapped Ali', npc: 'hurshidPasha' },
    { id: 'theEnglishTravellers', name: 'the English travellers', note: 'Byron and Hobhouse, guests at Ali\'s court in 1809', npc: 'theEnglishTravellers' },
    { id: 'theSouliotes', name: 'the Souliotes', note: 'the mountain confederacy Ali fought for decades, then used against him', npc: 'theSouliotes' },
    { id: 'eufrozina', name: 'Eufrozina e Janinës', note: 'a girl of Janina who chose the lake over the Pasha', npc: 'eufrozina' },
    { id: 'kardhiqFolk', name: 'the people of Kardhiq', note: 'the village that humiliated Ali\'s mother, and paid for it thirty years later', npc: 'kardhiqFolk' },
    { id: 'theSultan', name: 'the Sultan', note: 'the Ottoman court in Constantinople — patron, then executioner', npc: 'theSultan' },
  ],
  // anchor = the game location this tale place inhabits, under THE SHARING
  // RULE (see _SCHEMA.md). This tale is SOUTHERN — mirrors must not borrow
  // the north's Rozafa/Shkodra material. Ioannina/Epirus itself has no
  // dedicated node on this Albania-only map, so its places are PROPOSED at
  // the nearest existing southern spot, exactly as three-friends already
  // stages Berat at shpirag1 and sari-salltek stages Krujë at fshatiSheshi —
  // temporary jump-to points, not claims that the borrowed node IS this
  // place.
  places: [
    { id: 'tepelena', emoji: '🏠', name: 'the family household at Tepelenë', note: 'Ali\'s birthplace and lifelong second seat',
      anchor: { status: 'proposed', node: 'fshatiSheshi',
        mirror: 'Tepelenë on the Vjosë, South Albania — the Meçohysaj family\'s own town',
        mold: 'a local bey\'s fortified household at the square\'s edge — one more of the many households this shared southern square hosts across different tales (Krujë\'s prince, the quince-orchard king), none contradicting the others since each is understood as its own town temporarily sharing the one drawn square',
        conflicts: 'NOT fshatiJeta — that is the Kordha widow\'s own bare, sold-bare cottage (three-friends); a bey\'s fortified household, however reduced by feud, is not that same poor hearth',
        proposal: 'draw the Meçohysaj household — a fortified kulla, not a poor cottage — at the square\'s edge once a dedicated southern-town node exists' } },
    { id: 'mountainBands', emoji: '⛰️', name: 'the mountain passes', note: 'the wild highlands where bandit bands, and later the Souliote confederacy, held their ground',
      anchor: { status: 'proposed', node: 'mali1',
        mirror: 'the mountain passes of Epirus and inner Albania — Berat\'s hinterland, and further south, Suli\'s own crags',
        mold: 'a bare flank shared by every tale that needs a mountain (Tomorr\'s own massif, claimed by no single story) — here it stands for the wild passes where a young bandit made his name, and decades later where the Souliote clans made their last stand',
        conflicts: 'NOT Tomorr\'s own summit-duel (tomor-shpirag), Mujo\'s Jutbina shelf (muji-halili), or Krujë\'s own crag (sari-salltek) — every tale keeps its own summit on this shared hub',
        proposal: 'draw the Suli crags and the Berat passes as their own nodes off this shared hub' } },
    { id: 'ioanninaCourt', emoji: '🏰', name: 'the court at Ioannina', note: 'his capital, his palace, and — at the end — his siege',
      anchor: { status: 'proposed', node: 'shpirag1',
        mirror: 'Ioannina Castle on its lake, Ali\'s real capital — not the same city as Berat, but the nearest drawn walled southern city to jump to; NOT an arbitrary borrowing, either — Berat really was one of Ali\'s own conquests, ruled after him by his son Muhtar as its Pasha',
        mold: 'a walled royal city, its lord\'s court hosting scheming, songs, and foreign envoys alike',
        conflicts: 'NOT the SAME city or the SAME king as three-friends\' moat-king — that wager-king, his moat, and his daughter belong entirely to that story\'s own era and stay untouched; this is a real, different, later ruler temporarily jumped-to at the nearest drawn walled southern city until Ioannina itself is drawn',
        proposal: 'draw Ioannina\'s own citadel on its lake as its own node' } },
    { id: 'lakeIsland', emoji: '🌊', name: 'the island in the lake', note: 'the monastery where Ali surrendered — and, long before, where a girl of Janina chose to drown',
      anchor: { status: 'proposed', node: 'detiThelle1',
        mirror: 'the island of St Panteleimon in Lake Pamvotis at Ioannina — an inland lake, not the open sea, but the nearest drawn spot that already keeps this exact mold',
        mold: 'the deep keeps what the world throws in — the sabre lay on E Bukura e Detit\'s floor in one story, and this water keeps what it is given too: a girl who chose it over the Pasha, and, in the end, the Pasha himself',
        conflicts: 'NOT the same sea-floor as the sabre (three-friends) or E Bukura e Detit\'s own palace (bukuraDetit) — a separate, inland, southern lake, not yet drawn on this map; borrowed only because the mold already fits',
        proposal: 'draw Lake Pamvotis and its island monastery as their own node' } },
    { id: 'road', emoji: '🛤️', name: 'the open road', note: 'the mountain road up from the coast — where the English travellers came in',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller\'s setting-out — roads accumulate stories, they never clash' } },
    { id: 'kardhiqOffstage', emoji: '⛓️', name: 'Kardhiq and Hormovë', note: 'the two villages that wronged Ali\'s family, and paid for it in two instalments decades apart',
      anchor: { status: 'offstage', mirror: 'Kardhiq and Hormovë, real hill villages near Gjirokastër',
        mold: 'never staged as a scene — armies march there and back, and what happens there happens off the board entirely' } },
    { id: 'europeOffstage', emoji: '👑', name: 'the wider world', note: 'Constantinople, Parga, Preveza, Venice, Napoleon\'s France, Byron\'s England — everywhere the story\'s foreign powers live',
      anchor: { status: 'offstage', mirror: 'the courts and capitals beyond the mountains',
        mold: 'kings, sultans and poets who send letters, fleets and envoys but are never staged as a scene themselves',
        sharedWith: ['the three-friends "kingsRealms" pattern — an offstage collective of distant powers, not a place any tale needs drawn'] } },
  ],
  items: [
    { id: 'firmani', emoji: '📜', name: 'the Sultan\'s decree', note: 'first the (perhaps forged) document that won him Ioannina; last, the false promise of pardon that ended him' },
    { id: 'thesari', emoji: '💰', name: 'the treasury', note: 'surrendered as his last bargaining chip — and, they say, never all accounted for' },
  ],
  // EMBODIED projection — staged from scratch as a compact three-node arc at the
  // very end of the life: besieged on the lake island, the false pardon in hand,
  // the last choice. See the STORY nodes aliPashaLiqen / aliPashaVdes / aliPashaRob.
  play: {
    entry: 'island',
    stance: 'embodied',
    as: 'aliPasha',
    role:
      'You are Ali Pashë Tepelena, the old Lion of Ioannina, in your last act. The Sultan has declared you an outlaw and his army has run you down; you are besieged on the monastery island in your own lake — the water that once closed over a girl who chose it rather than obey you. A delegation crosses claiming to carry the Sultan\'s pardon, but you drowned too many rivals here to trust a paper now. Fight the siege to its end and die unbroken, gun in hand, as the Lion did — or trust the false pardon, lay down your arms, and be killed all the same, on a lie.',
    enter:
      'the Sultan\'s army has run you down and you are besieged on the monastery island in your own lake; his men have crossed the water carrying what they call his pardon',
    from: 'aliPashaLiqen',
    ending: 'aliPashaVdes',
    scenes: {
      aliPashaLiqen: 'island',
      aliPashaVdes: 'death',
      aliPashaRob: 'death',
    },
    divergences: [
      { beat: 'death', note: 'Built from scratch as the canonical end: the delegation with the (false) firman, Ali\'s refusal to trust the paper, and the gunfight in which he dies unbroken are the SECRET ending "The Lion Dies Unbroken" (aliPashaVdes) — following the earliest-recorded Kiose Mehmed Pasha account the beats already fix. The whole preceding life (the vow, Hormovë and Kardhiq, the thirty-four-year rule, Byron, Eufrozina, Suli) is compressed into the role and the island setup rather than staged.' },
      { beat: 'island', note: 'The truce, the crossing to St. Panteleimon\'s island, and the treasury surrendered as a show of good faith are folded into the single entry beat at aliPashaLiqen, where the leverage is already spent and only the last choice remains.' },
      { note: 'The BAD ending "The False Pardon Trusted" (aliPashaRob) is the path history denied him the dignity of avoiding — he is taken unresisting on a false besë and shot anyway, his head sent to the Sultan\'s gate beside his sons\'. It is invented as the un-heroic counterfactual, exactly as argjiro-gjirokastra and legjenda-e-prespes add the road their heroes never take. The arc is co-located at the sea hub deti1 under the sharing rule (Lake Pamvotis is an inland southern lake the map has not yet drawn), the same jump the tale\'s lakeIsland place already proposes.' },
    ],
  },
  beats: [
    {
      id: 'ancestry', title: 'A rough sort of lordship',
      note: 'An overview of the man he became, then a rewind to where it started: a minor bey\'s family at Tepelenë, more warband than court, and a father killed by rivalry before Ali turned ten.',
      lines: [
        ['1.1', 'Ali Pasha Tepelena ruled from Ioannina for over three decades, carving out of the Ottoman Empire a state so independent in all but name that Europeans simply called it "Albania."'],
        ['1.2', 'Born around 1740 in the southern Albanian town of Tepelenë, he died in 1822, in his late seventies or early eighties depending on which record is trusted.'],
        ['1.3', 'Contemporaries called him the Lion of Ioannina, or simply the Lion of Albania.'],
        ['1.4', 'Folk memory never settled on one verdict: the same man who built roads, courts, and schools also burned whole villages and drowned rivals in his own lake.'],
        ['1.5', 'Byron came to marvel at him; the Sultan came, in the end, to kill him.'],
        ['2.1', 'His family, the Meçohysaj, had held a rough sort of lordship over Tepelenë for generations — more warband than court.'],
        ['2.2', 'His great-grandfather had been a noted brigand and chieftain; his grandfather Muhtar Bey fought now for the Sultan, now against him, and died fighting at Corfu.'],
        ['2.3', 'Ali\'s own father, Veli Bey, ruled Tepelenë only by killing a rival cousin to take his post.'],
        ['2.4', 'Veli Bey did not hold it long — he was assassinated when Ali was about ten years old.'],
      ],
      cast: {
        aliPasha: ['tepelena', 'not yet born — the family history that shapes him comes first'],
        hamko: ['tepelena', 'not yet married into the family whose fortunes she will one day hold together'],
        kurtPasha: ['mountainBands', 'rules the passes around Berat, not yet Ali\'s rival'],
        muhtarPasha: ['tepelena', 'not yet born'],
        kiraVasiliki: ['ioanninaCourt', 'not yet born'],
        hurshidPasha: ['europeOffstage', 'an Ottoman officer\'s career not yet begun'],
        theEnglishTravellers: ['europeOffstage', 'not yet born — the visit is decades away'],
        theSouliotes: ['mountainBands', 'an independent confederacy in the crags, ruling itself'],
        eufrozina: ['ioanninaCourt', 'not yet born'],
        kardhiqFolk: ['kardhiqOffstage', 'an ordinary hill village, not yet marked for vengeance'],
        theSultan: ['europeOffstage', 'the distant Ottoman court, not yet aware of this family'],
      },
    },
    {
      id: 'hamko', title: 'Hamko takes command',
      note: 'Ali\'s mother refuses to let her husband\'s death end the family, takes the band\'s command herself, and — it is said — poisons a rival branch to keep her son\'s inheritance whole.',
      lines: [
        ['3.1', 'Ali\'s mother, Hamko, refused to let her husband\'s death end the family\'s fortunes and took the band\'s command herself.'],
        ['3.2', 'To keep her son\'s inheritance whole, she is said to have poisoned a rival branch of the family — a half-brother of Ali\'s and his mother both.'],
        ['3.3', 'It was Hamko, more than anyone, who shaped the boy: fierce, watchful, and unwilling ever to forgive a debt.'],
      ],
      cast: {
        aliPasha: ['tepelena', 'a young boy, raised now on his mother\'s own hardness'],
        hamko: ['tepelena', 'takes her dead husband\'s command; secures her son\'s inheritance by any means it takes'],
      },
    },
    {
      id: 'humiliation', title: 'The debt is born',
      note: 'Driven out of Tepelenë by a confederacy of jealous neighbors, the family is ambushed by the men of Hormovë and Kardhiq; Hamko and Ali\'s sister are captured and publicly humiliated. Ali swears the vow that will outlast every other ambition of his life.',
      lines: [
        ['4.1', 'The neighboring villages soon banded together against a widow ruling alone and drove Hamko\'s family out of Tepelenë entirely.'],
        ['4.2', 'Fleeing, they were ambushed and beaten by the men of two villages, Hormovë and Kardhiq.'],
        ['4.3', 'Hamko and Ali\'s young sister were captured, assaulted, and then paraded through the streets in humiliation, one of them forced to carry a man on her back like a mule.'],
        ['4.4', 'Ali\'s sister never let him forget the shame of that day, and from it he swore the vow that would outlast every other ambition of his life: Hormovë and Kardhiq would pay in blood.'],
      ],
      cast: {
        aliPasha: ['kardhiqOffstage', 'a boy present at his family\'s ruin; swears the debt he will spend his whole life collecting'],
        hamko: ['kardhiqOffstage', 'captured, assaulted, and paraded in humiliation by the men of Hormovë and Kardhiq'],
        kardhiqFolk: ['kardhiqOffstage', 'ambush and humiliate the fleeing family — the debt that will come due in thirty years'],
      },
    },
    {
      id: 'marriage', title: 'A household rebuilt',
      note: 'The family claws back some standing. Hamko arranges Ali\'s marriage to Emine of Gjirokastër; two sons are born who will ride at his side for life, and his sister is married off with a fortress for her dowry.',
      lines: [
        ['5.1', 'Once the family had clawed back some standing, Hamko arranged a marriage for her son to Emine, whose father held the title of Kaplan Pasha in Gjirokastër.'],
        ['5.2', 'Emine bore him two sons, Muhtar and Veli, who would ride at his side for the rest of his life.'],
        ['5.3', 'A third son, Selim, was born years later to one of Ali\'s slaves.'],
        ['5.4', 'Shainitza, Ali\'s own sister, was wed to a nobleman of Gjirokastër; as her dowry, Ali raised for her a fortified tower at Libohovë.'],
      ],
      cast: {
        aliPasha: ['tepelena', 'married by his mother\'s arrangement to Emine of Gjirokastër'],
        hamko: ['tepelena', 'arranges her son\'s marriage; rebuilds the family\'s standing'],
        muhtarPasha: ['tepelena', 'born to Ali and Emine — his father\'s general-to-be'],
      },
    },
    {
      id: 'bandit', title: 'The young bandit',
      note: 'Ali makes his name as a mountain bandit until Ahmet Kurt Pasha of Berat is sent to bring him to heel. A refused marriage offer for Kurt\'s own daughter turns a working arrangement into a lasting rivalry; Ali joins the Bektashi order.',
      lines: [
        ['6.1', 'As a young man Ali made his name as a mountain bandit, robbing and raiding until the Ottoman governor of Berat, Ahmet Kurt Pasha, was sent to bring him to heel.'],
        ['6.2', 'Kurt captured him at least once, and for a time Ali served in his camp — until Kurt refused to marry his own daughter to Ali and gave her to a rival instead.'],
        ['6.3', 'The insult festered into a rivalry that would last for years.'],
        ['6.4', 'Around this time Ali also joined the Bektashi order of dervishes, a loyalty he would keep, more or less sincerely, for the rest of his life.'],
      ],
      cast: {
        aliPasha: ['mountainBands', 'makes his name as a bandit; captured and then employed by Kurt Pasha; joins the Bektashi order'],
        kurtPasha: ['mountainBands', 'captures the young Ali, employs him, then refuses him his daughter\'s hand'],
      },
    },
    {
      id: 'base', title: 'Building a base',
      note: 'Made an Ottoman deputy over the mountain passes, Ali uses the post exactly as his mother would have — rewarding his own men and squeezing money from anyone who crosses him, as the Missolonghi affair shows.',
      lines: [
        ['7.1', 'The Ottomans eventually made Ali a deputy over the mountain passes, charged with policing the very banditry he had practiced himself.'],
        ['7.2', 'He used the post exactly as his mother would have: to reward his own men and squeeze money from anyone who crossed him.'],
        ['7.3', 'Once in Missolonghi chasing a debt, Ali could not find the man who owed it, so instead he took a number of Venetian subjects hostage — the town\'s own consul among them — until the local leaders promised to cover the debt themselves; he also carried off five hundred barrels of goods meant for the Ionian Islands, calling them a "guarantee" he never gave back.'],
        ['7.4', 'In five months in that post he built more wealth than most pashas saw in a lifetime.'],
      ],
      cast: {
        aliPasha: ['mountainBands', 'appointed deputy over the passes; builds a fortune through protection, extortion, and the odd hostage-taking'],
      },
    },
    {
      id: 'rivalry', title: 'War with Kurt Pasha',
      note: 'Rivalry with Ahmet Kurt Pasha breaks into open war across Epirus and Thessaly. Neither man can finish the other — but Ali comes out of it with a private understanding with Venice that Kurt never had.',
      lines: [
        ['8.1', 'War with Ahmet Kurt Pasha broke out again in earnest, each man marching armies across Epirus and Thessaly to bleed the other\'s towns of tribute.'],
        ['8.2', 'Kurt besieged Ali in Tepelenë itself, and Ali broke out through the siege lines rather than be trapped.'],
        ['8.3', 'Neither side could finish the other, but Ali came out of it with something Kurt never had: a private understanding with Venice, bought with a declaration of friendship the Sublime Porte would have called treason.'],
        ['8.4', 'The Venetians, in turn, spoke for him at Constantinople.'],
      ],
      cast: {
        aliPasha: ['mountainBands', 'wars with Kurt Pasha to a standstill; wins Venice\'s quiet backing instead'],
        kurtPasha: ['mountainBands', 'besieges Ali at Tepelenë; cannot finish him'],
      },
    },
    {
      id: 'hormoveIoannina', title: 'The first instalment, and a throne',
      note: 'Long before ruling anything, Ali pays the first part of the old debt: Hormovë is lulled into false safety, then destroyed, its leader roasted alive. The terror wins him Gjirokastër\'s submission — and, by 1788, the governorship of Ioannina itself.',
      lines: [
        ['9.1', 'Before he ever ruled anything, Ali paid his first instalment on the old vow: he lulled Hormovë into believing itself safe, then fell on it with a thousand men.'],
        ['9.2', 'The vow was paid at last: every man in Hormovë was cut down, the women and children were carried off to be sold as slaves, and the man who led them was strapped to a spit and roasted over the flames.'],
        ['9.3', 'The terror worked exactly as intended — the neighboring towns submitted rather than share Hormovë\'s fate — and it was on the strength of that terror that Ali was made governor of Ioannina.'],
        ['9.4', 'Exactly how he took the post is disputed: some say he ringed the city with soldiers and produced a forged decree before the Porte could object; others say the notables of Ioannina simply petitioned the Sultan to give it to him.'],
        ['9.5', 'Either way, by March of 1788 Ali Pasha ruled Ioannina, and would go on ruling it for thirty-four years.'],
      ],
      cast: {
        aliPasha: ['ioanninaCourt', 'destroys Hormovë as the first instalment of his mother\'s debt, then rules Ioannina as its Pasha'],
        theSultan: ['europeOffstage', 'confirms or is presented with Ali\'s appointment — the truth of the decree never fully settled'],
      },
      items: { firmani: ['aliPasha', 'the decree that made him Pasha of Ioannina — true, or forged, no one after was sure'] },
    },
    {
      id: 'rule', title: 'Rule as Pasha',
      note: 'Ioannina grows into a hub of trade and learning under his hand, its court open to whoever is useful to him. He crushes rivals without hesitation, and the prosperous Aromanian town of Moscopolë is raided and destroyed on his suspicion of Russian sympathies.',
      lines: [
        ['10.1', 'As Pasha, Ali set about building something close to an independent country: Ioannina grew into a hub of trade and learning, its schools among the finest in the Greek-speaking world, while Muslims, Christians, Albanians and Greeks all found a place at his court if they were useful to him.'],
        ['10.2', 'He crushed rivals without hesitation and reserved his harshest cruelty for whichever wealthy landowner or unruly clan threatened his own control.'],
        ['10.3', 'The prosperous Aromanian trading town of Moscopolë, suspected of Russian sympathies, was raided and destroyed on his order in 1788, scattering its people across the Balkans and beyond.'],
        ['10.4', 'He replaced the Christian militia captains across his lands with his own Albanian officers wherever he could, turning old rivals into his own instruments.'],
        ['10.5', 'His policy, in the end, was simple: whoever offered him the most advantage at any given moment had his loyalty until someone offered more.'],
      ],
      cast: {
        aliPasha: ['ioanninaCourt', 'builds a near-independent state at Ioannina; crushes rivals; destroys Moscopolë'],
      },
    },
    {
      id: 'eufrozina', title: 'The lake\'s first silence',
      note: 'A girl of Janina named Eufrozina catches Ali\'s eye from his own balcony. Fetched to a raft at the lake\'s centre and given the choice between the Pasha and the water, she refuses him outright, then feigns agreement — and drowns herself rather than be taken.',
      lines: [
        ['11.1', 'Among the stories the mountains still sing of him is one about a girl of Ioannina named Eufrozina, said to be the fairest in all Albania and lovely enough that even the mountain fairies envied her.', "Por, si ka nji vajzë n'Janinë, kurkund shoqen s'i a kë pa, kah bje diell e serotinë: synin diell, ballin si hana, ardhun shtatit si silvija. Eufrozinë e quejti nana, augur t'mirë m'e pasë Shqypnija."],
        ['11.2', 'Ali Pasha saw her from his balcony and wanted her, and sent his servant to fetch her to him.', "Atë e patka aj Ali Pasha, dalë si vida në balkue, edhë fort pelqye i asht vasha: çon Harapin m'e kerkue."],
        ['11.3', 'The servant came to her door and told her to hurry — the Pasha had asked for her.', "Vjen Harapi e i thotë te dera: shpejt tash, vashë, ti ktu me zdrypun e me mue me ardhë nji hera; persë Pasha të ka lypun."],
        ['11.4', 'She answered him back without fear: let Ali Pashë Tepelena take her head, as he had taken so many others\' — she would live, but never surrender her faith or her honor.', "T'u thafët goja! shka po thue? I a kthen vasha fjalen marë; se un nji vajz—o kam qillue: s'diej me folë me Pashallarë, jo, po, Ali pashë Tepelena mundet kryet aj me m'a prë, si i ka prë kushdi sa krena; gjallë por s'lëshoj un erz as fé."],
        ['11.5', 'Furious, Ali sent the servant back with an ultimatum: come to him now, or be drowned that same night at the bottom of the lake.', "Asht mushë Pasha me mëni, prap harapin çon e e thrret: pa ndigjo harap i zi, se dy herë Pasha nuk flet: a se vjen ktu sande goca, a se ndryshe n'fund t'liqënit t'a baj gjumin me bretkoca. More vesht, bre qën i qënit?"],
        ['11.6', 'That night the servant rowed her out to a raft waiting at the lake\'s very centre, and gave her the same choice one last time.', "I shkon naten vashës harapi, edhë e mërr e e çon m'liqë, ku tue pritun ishte trapi, per me i bartë neper kurrnë. N'mes të liqënit si kan dalë, aty trapi vend ka zanun, edhë nisë harapi fjalë, nisë aj vashës kështu me i thanun: nuk ka tjeter, tash, lum vasha: e s'jam nieri fjalës qi i luej: a me shkue sande te Pasha: a shi ktu me t'mytë ty n'ujë."],
        ['11.7', 'Smiling, she told him she would go to the Pasha after all — but first she wished to put on finer clothes.', "Jo, po, i thotë vasha tue qeshë, se un te Pasha due me shkue; por due t'shkoj nji herë me u veshë, pse sido ktu kam qillue."],
        ['11.8', 'And with that, she threw herself from the raft into the water and vanished into the depths, before the servant could stop her.', "E kështu tue i thanë harapit, atij qënit, t'birit t'qënit, mërr e hidhet n'ujë prej trapit, edhë zhduket n'fund t'liqënit."],
        ['11.9', 'Word of it spread through the whole country: how many girls Albania had, the old song says, who would trade their own lives for their honor.', "Doli fjala neper dhë: njekso varzash ka n'Shqypni, qi per erz edhe per fë t'rijt e jeten i bajn fli."],
      ],
      cast: {
        aliPasha: ['ioanninaCourt', 'sees Eufrozina from his own balcony and sends for her'],
        eufrozina: ['lakeIsland', '☠ refuses the Pasha outright, then drowns herself in the lake rather than be taken'],
      },
      exit: ['eufrozina'],
    },
    {
      id: 'souliotes', title: 'Suli will not pay',
      note: 'For decades the mountain confederacy of Souli resists him outright. Unable to win by force, Ali starves them out; a monk\'s last stand blows the powder magazine, and the women of Zalongo are remembered dancing off a cliff rather than be taken.',
      lines: [
        ['12.1', 'For decades the Souliotes, a fiercely independent Christian Albanian confederacy in the mountains south of Ioannina, refused to pay him anything but resistance.'],
        ['12.2', 'Ali attacked them outright in 1792 and again through the 1800s, and each time they beat his armies back from their crags.'],
        ['12.3', 'Unable to win by force, he starved them out instead, ringing their stronghold with a dozen forts until, in 1803, their supplies gave out.'],
        ['12.4', 'As his soldiers came to take their arsenal, a monk called Samuel and five companions set fire to the powder magazine rather than surrender it, killing themselves and the soldiers with them.'],
        ['12.5', 'Days later, cornered above a ravine at Zalongo, a band of Souliote women is remembered dancing hand in hand to its edge, singing, and stepping off into the gorge one by one rather than be taken.'],
        ['12.6', 'Those who surrendered fared no better — the men tortured to death, impaled, or burned, and the women and children carried off into slavery in Ottoman harems.'],
      ],
      cast: {
        aliPasha: ['mountainBands', 'fails Suli by direct assault for years, then starves the confederacy into ruin'],
        theSouliotes: ['mountainBands', 'beaten back for years, then starved out; the magazine blown, the women of Zalongo dead at the cliff\'s edge, survivors enslaved'],
      },
    },
    {
      id: 'fame', title: 'The Lion\'s name',
      note: 'His court at Ioannina grows famous across Europe. The 1798 massacre at Preveza shows the world his ruthlessness, and the Porte itself names him "Aslan" — the Lion — for service on the Danube.',
      lines: [
        ['13.1', 'Ali\'s court at Ioannina grew famous across Europe long before Souli fell — a magnet for French and British agents, Venetian merchants, and anyone hoping to win his favor.'],
        ['13.2', 'When French troops held the coastal town of Preveza in 1798, Ali stormed it, executed three hundred captured Greeks before his own eyes, and marched the survivors to Ioannina carrying the salted heads of their own dead.'],
        ['13.3', 'For his service against a rebel governor on the Danube that same year, the Ottoman court itself gave him the title "Aslan" — the Lion.'],
        ['13.4', 'He played France and Britain against each other for the rest of his reign, welcoming Napoleon\'s envoys one year and Britain\'s the next, loyal to neither, useful to both.'],
      ],
      cast: {
        aliPasha: ['ioanninaCourt', 'wins the name "Aslan"; a cosmopolitan court courted by every foreign power'],
        theSultan: ['europeOffstage', 'names him "Aslan," the Lion, for service on the Danube'],
      },
    },
    {
      id: 'byron', title: 'The English travellers',
      note: 'In autumn 1809, Lord Byron and John Cam Hobhouse ride the mountain road to Ali\'s court. Byron\'s account in "Childe Harold" makes "Ali Pasha" a name known across Europe.',
      lines: [
        ['14.1', 'In the autumn of 1809, the young English poet Lord Byron and his companion John Cam Hobhouse rode up through the mountains to Ali\'s court at Tepelenë, and afterward to Ioannina.'],
        ['14.2', 'Byron wrote the visit into his poem "Childe Harold," calling Ali "a man of first abilities, who governs the whole of Albania."'],
        ['14.3', 'He was struck less by Ali\'s cruelty than by his charm, his soldiers\' wild dress, and the strange, glittering splendor of a court no Englishman had ever properly described before.'],
        ['14.4', 'It was through Byron, more than any historian, that "Ali Pasha" became a name known across Europe.'],
      ],
      cast: {
        theEnglishTravellers: ['road', 'ride the mountain road to Tepelenë, then on to Ioannina'],
        aliPasha: ['ioanninaCourt', 'receives Byron and Hobhouse as honored guests'],
      },
    },
    {
      id: 'vasiliki', title: 'A mercy, once',
      note: 'Not every story of the court is one of terror: Kira Vasiliki first comes before Ali as a child pleading for her father\'s life, and years later becomes his favorite wife.',
      lines: [
        ['15.1', 'Not every story of the court was one of terror: among Ali\'s household was a favorite wife named Kira Vasiliki, who had first come before him as a child of twelve, begging for her father\'s life.'],
        ['15.2', 'He granted the pardon, kept the girl in his harem as she grew, and years later married her outright, favoring her above all his other wives to the end of his life.'],
      ],
      cast: {
        kiraVasiliki: ['ioanninaCourt', 'pardoned as a child, raised in the household, later Ali\'s favorite wife'],
      },
    },
    {
      id: 'kardhiq', title: 'The debt paid in full',
      note: 'In 1811 Ali finally moves against Kardhiq itself. A long siege, a refused surrender, and the fall of the town lead to a massacre of hundreds of men in an inn courtyard — the debt from his boyhood paid in full, three decades late.',
      lines: [
        ['16.1', 'The old debt from his mother\'s humiliation had never been paid in full, and in 1811 Ali finally moved against Kardhiq itself, the second of the two villages that had wronged his family decades before.'],
        ['16.2', 'He surrounded the town with as many as fifteen thousand men and starved it through a long siege.'],
        ['16.3', 'When Kardhiq\'s men offered to surrender if they were allowed to flee to Corfu, Ali refused the terms and pressed the siege until the town fell in February 1812.'],
        ['16.4', 'He personally oversaw the sorting of the survivors, choosing who would be enslaved and who imprisoned.'],
        ['16.5', 'A month after that, under the pretext of a hearing, some seven to eight hundred of the town\'s men were packed into a big inn\'s courtyard, the gates locked behind them, and gunned down without warning.'],
        ['16.6', 'He had the hair cut from the slain men\'s heads gathered up and sent north as a gift for his sister, meant to fill the pillows on her own divan.'],
        ['16.7', 'At the site of the killing he raised a stone marker, warning anyone who might someday think to wrong his family as Kardhiq once had.'],
      ],
      cast: {
        aliPasha: ['kardhiqOffstage', 'besieges, then massacres Kardhiq — his mother\'s debt paid in full, thirty years late'],
        kardhiqFolk: ['kardhiqOffstage', '☠ besieged, starved, sorted into slavery or prison, then hundreds shot down in an inn courtyard'],
      },
      exit: ['kardhiqFolk'],
    },
    {
      id: 'parga', title: 'The last conquest', title2: undefined,
      note: 'Ali buys out Parga, his last real triumph — but the Sultan has grown wary of a subject who rules a quarter of the Balkans as his own. Accused of ordering an assassination, Ali is declared an outlaw in 1820.',
      lines: [
        ['17.1', 'In 1817, after years of negotiation, Ali finally bought out the last independent town on his coast, Parga, paying its people to leave for Corfu rather than live under him — his last real conquest, and by most accounts his last triumph.'],
        ['17.2', 'By then, though, the Sultan in Constantinople had grown wary of a subject who ruled a quarter of the Balkans as if it were his own kingdom.'],
        ['17.3', 'In 1820 Ali was accused of sending assassins after a rival who had defected to the capital, and the Porte declared him an outlaw, stripping him of Ioannina and Delvina.'],
        ['17.4', 'Given forty days to present himself in Constantinople and answer for it, Ali did not go, and the Sultan\'s armies began to march.'],
      ],
      cast: {
        aliPasha: ['ioanninaCourt', 'buys out Parga, his last triumph; then declared an outlaw and stripped of his own pashaliks'],
        theSultan: ['europeOffstage', 'declares Ali an outlaw and sends armies to bring him down'],
      },
    },
    {
      id: 'siege', title: 'The alliance comes apart',
      note: 'Ali fortifies Ioannina, but his allies desert one by one — including his own son Muhtar. The Souliotes, once broken by Ali, are recalled by the Sultan\'s men to fight against him. Ali burns his own city and withdraws into the citadel.',
      lines: [
        ['18.1', 'Ali fortified Ioannina with eight thousand men and waited, but his alliance came apart around him almost at once.'],
        ['18.2', 'One by one his own captains changed sides for pardons and promises, and even his sons abandoned his cause: Muhtar surrendered Berat, and his youngest son Selim was captured at Gjirokastër.'],
        ['18.3', 'In a final bitter twist, the Souliotes he had once broken and exiled were invited home by the Sultan\'s men and returned to fight against him.'],
        ['18.4', 'As the siege dragged through a hard winter, Ali burned much of his own city rather than leave it to his enemies, and withdrew into the citadel with what little remained of his household guard.'],
      ],
      cast: {
        aliPasha: ['ioanninaCourt', 'besieged in his own capital; burns the city and withdraws into the citadel'],
        muhtarPasha: ['europeOffstage', 'surrenders Berat to the Sultan\'s forces on the promise of a pardon, and passes into Ottoman custody'],
        theSouliotes: ['ioanninaCourt', 'recalled from exile by the Sultan\'s men; fight their old enemy one last time, on the other side'],
        hurshidPasha: ['ioanninaCourt', 'commands the Ottoman siege; picks off Ali\'s alliance captain by captain'],
      },
    },
    {
      id: 'island', title: 'A truce, and a treasury given up',
      note: 'Besieged in his own tower, Ali agrees to a truce and crosses to the monastery island in the lake — the very water that once closed over Eufrozina. Surrendering his treasury as a show of good faith, he gives up his last leverage.',
      lines: [
        ['19.1', 'Besieged in his own tower, Ali agreed at last to a truce, on the promise that his case would be carried to the Sultan himself.'],
        ['19.2', 'Taking only his wife and a handful of guards, he abandoned the citadel and rowed across to St. Panteleimon\'s monastery, on its island out in Ioannina\'s lake.'],
        ['19.3', 'As a show of good faith he surrendered his treasury to the Ottoman commander, Hurshid Pasha — and in doing so gave up the only leverage he had left.'],
      ],
      cast: {
        aliPasha: ['lakeIsland', 'crosses to the monastery island under truce; surrenders his treasury to Hurshid Pasha'],
        kiraVasiliki: ['lakeIsland', 'crosses with her husband to the island'],
        hurshidPasha: ['lakeIsland', 'accepts Ali\'s surrendered treasury — his last leverage spent'],
      },
      items: { thesari: ['hurshidPasha', 'surrendered as a show of good faith — Ali\'s last bargaining chip, now gone'] },
    },
    {
      id: 'death', title: 'The Lion of Ioannina',
      note: 'Weeks later, a delegation crosses to the island claiming the Sultan\'s pardon. A dispute over the document turns to gunfire; Ali is mortally wounded, beheaded, and his head displayed in Ioannina and then Constantinople beside his sons\' and a grandson\'s.',
      lines: [
        ['20.1', 'Weeks later, in January 1822, a delegation crossed to the island claiming to carry the Sultan\'s pardon.'],
        ['20.2', 'When Ali asked to read the document before admitting them, the officer in charge refused to wait, and gunfire broke out between them.'],
        ['20.3', 'Ali was shot and mortally wounded in the fighting; his own guards could not save him, and his last request — that his wife be killed rather than fall into enemy hands — went unanswered.'],
        ['20.4', 'His head was cut from his body, carried through the streets of Ioannina on a silver platter to prove the Lion was truly dead, and then sent on to Constantinople.'],
        ['20.5', 'Once in Constantinople, his head went up at the gates of the Sultan\'s own palace — alongside three sons\' heads and a grandson\'s, all four put to death within that same year.'],
        ['20.6', 'His headless body was buried with full honors in a mausoleum at Ioannina, in the same tomb as his first wife, Emine.'],
      ],
      cast: {
        aliPasha: ['lakeIsland', '☠ shot in a gunfight over the Sultan\'s false pardon; beheaded, his head displayed in Ioannina and then Constantinople'],
        kiraVasiliki: ['lakeIsland', 'her husband\'s last request — that she be killed rather than captured — goes unanswered'],
        hurshidPasha: ['lakeIsland', 'oversees the killing and the display of the head'],
        theSultan: ['europeOffstage', 'receives Ali\'s head at the palace gates, alongside three sons\' and a grandson\'s'],
        muhtarPasha: ['europeOffstage', '☠ the pardon that bought his surrender at Berat holds no better than his father\'s — put to death within the year, his head sent on to join Ali\'s at the Sultan\'s gate'],
      },
      items: { firmani: ['hurshidPasha', 'the promised pardon — false, or never delivered; either way, it killed him'] },
      exit: ['aliPasha', 'muhtarPasha'],
    },
    {
      id: 'legacy', title: 'What the lake keeps',
      note: 'No independent nation survived him, but his revolt cracked the door the Greek uprising walked through a year later. Within his own lands he curbed the blood feud that had shaped his whole life. The lake island is a museum now, and the water that took Eufrozina is remembered as having taken the Lion too.',
      lines: [
        ['21.1', 'Ali Pasha never built the independent nation some hoped he might; his revolt against the Sultan, more than any plan of his own, cracked the door through which the Greek uprising walked a year later.'],
        ['21.2', 'Within his own lands he tried to curb the very blood-feud custom that had shaped his whole life, replacing the killing of gjakmarrje with fines, exile, or the executioner\'s own hand — a tyrant\'s justice, but a rule of law all the same.'],
        ['21.3', 'Albanian memory has never fully decided what to make of him: to some, an opportunist who sold his loyalty to whoever paid best; to others, the first Albanian ruler since Skanderbeg to hold anything like a state of his own.'],
        ['21.4', 'The monastery on the lake island where he died is a museum today, its bullet-scarred walls still standing.'],
        ['21.5', 'And the villagers by the lake still say that the water that once closed over a girl who chose to drown rather than obey him closed, in the end, over the old Lion himself.'],
        ['21.6', 'Some of his treasure, they say, he hid before the end — and it has never been found.'],
      ],
      cast: {
        theSultan: ['europeOffstage', 'inherits a revolt that becomes, within a year, the Greek uprising Ali never intended to start'],
      },
      items: { thesari: ['lakeIsland', 'most of it accounted for — but the legend of a hidden remainder never quite dies'] },
    },
  ],
}
