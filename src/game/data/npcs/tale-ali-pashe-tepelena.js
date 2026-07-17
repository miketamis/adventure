// NPCs: Ali Pashë Tepelena (the Lion of Ioannina) cast — see ../npcs/_SCHEMA.md
// for the format contract. One file per area/tale so parallel agents never
// collide. None of this cast exists in core-village.js/core-world.js — Ali
// Pasha and his household are historical (Ottoman-era, 1740-1822), not part
// of the mythic core cast, so this is his tale's own file in full.
//
// NAME COLLISION WARNING: the epic Lahuta e Malcis also has an "Ali Pashë
// Gucia" (a 19th-c. northern chieftain of the League of Prizren era, in its
// own Kangë e Tetët) and a "Mehmet Ali Pasha" (the Ottoman commander who
// fought the League at Gjakovë). Neither is this Ali Pasha. Ali Pashë
// Tepelena/i Janinës is the historical Pasha of Ioannina (d. 1822); do not
// conflate the three "Ali Pasha"s across any tale.

export default {
  aliPasha: {
    name: 'Ali Pashë Tepelena', glyph: '🦁', kind: 'human',
    role: 'the Pasha who ruled a near-independent state from Ioannina, 1788-1822',
    backstory: 'Born around 1740 at Tepelenë to a minor bey\'s family, orphaned young and raised by a mother who taught him never to forgive a debt, Ali rose from mountain banditry to become Pasha of Ioannina and, in all but name, ruler of a country of his own — courted by Napoleon and Byron alike, ruthless to any rival, and driven his whole life by one unpaid debt: the humiliation done his mother and sister as a boy, finally repaid in full on the village of Kardhiq in 1811-12. Besieged by the Sultan\'s own armies in his old age, he was killed under a false promise of pardon on an island in his own lake in 1822, his head displayed in two capitals. NOT "Ali Pashë Gucia" of the League of Prizren era (Lahuta e Malcis, Kangë e Tetët) — a different man, a different century, sharing only the name.',
    folklore: ['ali-pashe-tepelena', 'kanuni', 'kanun-blood-feud', 'besa'],
    location: { status: 'planning', plan: 'moves across the whole tale — born and raised at the proposed Tepelenë household (nearest spot today: fshatiSheshi), wild years on the shared mountain-hub (mali1), his court and its long siege at the proposed Ioannina (nearest spot today: shpirag1), and his end at the proposed lake island (nearest spot today: detiThelle1)' },
    tales: { 'ali-pashe-tepelena': 'aliPasha' },
  },
  hamko: {
    name: 'Hamko', glyph: '🗡️', kind: 'human',
    role: 'Ali Pasha\'s mother — widowed young, and unforgiving',
    backstory: 'Widowed when Ali was about ten, Hamko held her husband\'s band together herself, is said to have poisoned a rival branch of the family to keep her son\'s inheritance whole, and after Hormovë and Kardhiq\'s men captured and humiliated her and her daughter, raised Ali on one unfinished debt. She lived to see only the first installment of it paid.',
    folklore: ['ali-pashe-tepelena', 'kanun-blood-feud'],
    location: { status: 'planning', plan: 'the proposed Tepelenë household (nearest spot today: fshatiSheshi)' },
    tales: { 'ali-pashe-tepelena': 'hamko' },
  },
  kurtPasha: {
    name: 'Ahmet Kurt Pasha', glyph: '⚔️', kind: 'human',
    role: 'the rival Pasha of Berat who made and then unmade Ali\'s early career',
    backstory: 'The Ottoman governor sent to bring the young bandit Ali to heel, Kurt captured him, employed him, then refused him his own daughter\'s hand in marriage — the insult that turned a working arrangement into a years-long rivalry of raids, sieges, and broken alliances neither man ever fully won.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'the shared mountain-hub and the proposed Ioannina court, wherever the rivalry with Ali takes him (nearest spots today: mali1, shpirag1)' },
    tales: { 'ali-pashe-tepelena': 'kurtPasha' },
  },
  muhtarPasha: {
    name: 'Muhtar Pasha', glyph: '🐎', kind: 'human',
    role: 'Ali\'s eldest son — his general for thirty years, until the end',
    backstory: 'Ali\'s first son by Emine, raised to command armies at his father\'s side from the Preveza campaign onward and eventually made Pasha of Berat in his own right — until the Sultan\'s siege of 1820 gave him the choice of his father\'s ruin or a pardon, and he surrendered Berat for the promise of one. The promise held no better for him than it did for his father: he was executed along with his brothers within the year, his head sent to join Ali\'s at the Sultan\'s gate in Constantinople.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'wherever his father campaigns; surrenders Berat and passes offstage into Ottoman custody (nearest spot today: europeOffstage), where his father\'s own siege and death play out at the proposed Ioannina court (shpirag1)' },
    tales: { 'ali-pashe-tepelena': 'muhtarPasha' },
  },
  kiraVasiliki: {
    name: 'Kira Vasiliki', glyph: '🌹', kind: 'human',
    role: 'Ali\'s favorite wife — once a child pleading for her father\'s life',
    backstory: 'She first came before Ali at twelve, begging pardon for her condemned father; he granted it, raised her in his household, and married her years later, favoring her above every other wife to the end of his reign — the one figure in his story who seems to have been shown mercy rather than needed it.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'the proposed Ioannina court (nearest spot today: shpirag1)' },
    tales: { 'ali-pashe-tepelena': 'kiraVasiliki' },
  },
  hurshidPasha: {
    name: 'Hurshid Pasha', glyph: '🏹', kind: 'human',
    role: 'the Ottoman commander who besieged and finally trapped Ali',
    backstory: 'Sent by the Sultan to finish the siege of Ioannina after his predecessor\'s failures, Hurshid Pasha starved and bribed Ali\'s alliance apart, accepted his surrender of the citadel on a promised safe-conduct to the Sultan, took his treasury as a "guarantee," and, whether or not he ever truly meant to honor the promise, was the man in whose custody Ali died.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'the proposed Ioannina court under siege, then the proposed lake island (nearest spots today: shpirag1, detiThelle1)' },
    tales: { 'ali-pashe-tepelena': 'hurshidPasha' },
  },
  theEnglishTravellers: {
    name: 'udhëtarët anglezë', glyph: '📜', kind: 'collective',
    role: 'Lord Byron and John Cam Hobhouse, guests at Ali\'s court in 1809',
    backstory: 'The young English poet and his companion rode up to Tepelenë and on to Ioannina in the autumn of 1809, were received as honored guests, and left with a fascination that Byron wrote straight into "Childe Harold" — the verses that first made "Ali Pasha" a name known across Europe.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'arrive by the open road (start), stay briefly at the proposed Ioannina court (nearest spot today: shpirag1), then depart the tale for home' },
    tales: { 'ali-pashe-tepelena': 'theEnglishTravellers' },
  },
  theSouliotes: {
    name: 'Suliotët', glyph: '🏔️', kind: 'collective',
    role: 'the mountain confederacy that resisted Ali for decades, then was used against him',
    backstory: 'A fiercely independent Christian Albanian confederacy in the crags south of Ioannina, the Souliotes beat back Ali\'s armies for years until starvation broke their stronghold in 1803; exiled to Corfu and Parga, they were recalled by the Sultan\'s men during the final siege of 1820-22 and fought their old enemy one last time — on the other side.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'their mountain stronghold on the shared mountain-hub (nearest spot today: mali1), later recalled to the proposed Ioannina siege (shpirag1)' },
    tales: { 'ali-pashe-tepelena': 'theSouliotes' },
  },
  eufrozina: {
    name: 'Eufrozina e Janinës', glyph: '🌊', kind: 'human',
    role: 'the girl of Janina who chose the lake over the Pasha',
    backstory: 'Said to be the fairest girl in Albania, wanted by Ali Pasha and fetched by his servant to a raft in the middle of the lake — she refused him outright, then feigned agreement only to throw herself into the water and drown rather than go to him. Sung by Gjergj Fishta (Lahuta e Malcis, Kangë e Gjashtëmbëdhetët) as a verse elaboration of the historical "Kyra Frosini" drowning-legend attached to Ali Pasha at Lake Pamvotis; treated here as her own figure, not a folk-collected tale but a literary retelling this game keeps faithfully.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'the proposed lake island (nearest spot today: detiThelle1)' },
    tales: { 'ali-pashe-tepelena': 'eufrozina' },
  },
  kardhiqFolk: {
    name: 'njerëzit e Kardhiqit', glyph: '⛓️', kind: 'collective',
    role: 'the village that humiliated Ali\'s mother, and paid for it thirty years later',
    backstory: 'Alongside neighboring Hormovë, the men of Kardhiq ambushed and humiliated Ali\'s mother and sister when Ali was a boy; the debt went unpaid for decades until 1811-12, when Ali besieged, starved, and finally massacred hundreds of the village\'s men after a false promise of surrender terms.',
    folklore: ['ali-pashe-tepelena', 'kanun-blood-feud'],
    location: { status: 'planning', plan: 'Kardhiq itself, never staged as a scene — offstage, reached only by armies marching to and from it' },
    tales: { 'ali-pashe-tepelena': 'kardhiqFolk' },
  },
  theSultan: {
    name: 'Sulltani i Stambollit', glyph: '👳', kind: 'collective',
    role: 'the Ottoman court in Constantinople — patron, then executioner',
    backstory: 'The distant authority Ali served, bribed, defied, and was finally destroyed by: Selim III and then Mahmud II confirmed his pashaliks in turn, gave him the title "Aslan" (the Lion) for service against a Danube rebel, and at last declared him an outlaw in 1820 when his independence grew too large to tolerate.',
    folklore: ['ali-pashe-tepelena'],
    location: { status: 'planning', plan: 'offstage in Constantinople — never staged as a scene, present only through firmans, armies, and envoys' },
    tales: { 'ali-pashe-tepelena': 'theSultan' },
  },
}
