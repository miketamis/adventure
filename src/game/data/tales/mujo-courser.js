// ===========================================================================
// TALE: Gjogu i Mujit — Mujo's Courser — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other
// tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — song no. 8 of the Kângë Kreshnikësh
// cycle (Songs of the Frontier Warriors), and the origin story of Mujo's own
// oracle-marked warhorse, dreamed, stolen twice and won back twice. English
// and Albanian run close to line-for-line (412 lines each — see the header of
// the local reference file for the alignment spot-check), so "paragraphs"
// here are 17 narrative movements I have divided the verse into myself (the
// source page prints it as one continuous block, unlike Fuqija e Mujit's
// clearly numbered strophes), and a "sentence" is a punctuation-bounded verse
// unit of 1–6 lines; the Albanian third element is the verbatim verse group,
// lines joined with " / ". No scene for this song exists in the game yet —
// jutbina (the hamlet hub) already stages the halil-marriage chain
// (mujo1→mujo2-mujo4/mujoFund) and the death-of-omer chain (omer1-omerFund);
// this tale's own places are PROPOSED, a new chain to build off that same hub.
// ===========================================================================

export default {
  id: 'mujo-courser',
  title: 'Mujo\'s Courser',
  source:
    'Recorded in Shala (District of Shkodra); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 70–80, repr. Folklor shqiptar II, Epika legjendare I, ed. Q. Haxhihasani (Tirana 1966), pp. 109–118 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Shala, District of Shkodra',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Gjogu i Mujit»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 70–80, in the embedded Albanian PDF Robert Elsie published beside his translation (verse_09_AL/verse_09_AL_08.pdf) — the edition\'s Gheg orthography kept verbatim (â, ki\', kenka, kenkan, tuj, m\'i, po m\'jau ep, s\'po…), including a few printed oddities noted in the local file',
    local: 'docs/references/palaj-kurti-gjogu-i-mujit.sq.txt',
  },
  discrepancies: [
    'THE COURSER\'S TACK (¶3.7): the Albanian says plainly that no amount of grooming or harness tamed the courser — "Po as timar gjogun po ma ban" ("not even with tack does it bring the courser to heel"); Elsie narrows this to "But the steed would hold no rider." The beats follow the broader Albanian claim.',
    'THE RAGING HOOVES (¶9.8): the Albanian says the courser\'s kicks have actually killed — "E me shtjelma qi na vret" ("and with its lashing it kills us"); Elsie softens this to "With its hooves it kicks out wildly." The beats keep the stronger Albanian reading.',
    'THE KING\'S SIGH (¶17.7): Elsie\'s translation adds "the king said sighing" to the close; the Albanian simply has "Ka qitë krajli e ka thanë" — "the king spoke and said." A small flourish not in the original; the beats keep the plainer Albanian.',
  ],
  // 17 narrative movements of my own division (412 verse lines total, no
  // strophe breaks in the source); sentence counts per movement
  paragraphs: [8, 6, 12, 12, 9, 8, 14, 13, 16, 6, 7, 6, 7, 7, 13, 4, 7],
  cast: [
    { id: 'mujo', name: 'Mujo', note: 'the kreshnik of Jutbina, whose dream-born courser this song belongs to', npc: 'mujo' },
    { id: 'ajkuna', name: 'Ajkuna', note: 'Mujo\'s wife, who confirms the dream and raises the foal in secret for three years', npc: 'ajkuna' },
    { id: 'krajl', name: 'Krajlo Kapedani', note: 'the Captain King across the frontier, humiliated by the courser and driven to steal it', npc: 'krajloKapedani' },
    { id: 'osmani', name: 'Arnaut Osmani', note: 'Mujo\'s own neighbor at Jutbina and his son\'s godfather-to-be, who sells the plan for a king\'s purse', npc: 'arnautOsmaniGjogut' },
    { id: 'raspodini', name: 'Shepherd Raspodini', note: 'the real Slavic shepherd whose face and clothes Mujo takes to walk unknown into the Kingdom', npc: 'raspodini' },
    { id: 'rusha', name: 'Rusha', note: 'the Krajl\'s daughter, given to "Raspodini" as wedding escort and carried off with the whole train', npc: 'rushaKrajlise' },
    { id: 'galiqe', name: 'Galiqe Galani', note: 'a courtier who dismisses Mujo as no fighter, only a boy who tamed a pony', npc: 'galiqeGalani' },
    { id: 'halili', name: 'Halili', note: 'Mujo\'s younger brother at Jutbina, who receives the second captured bride at the tale\'s end', npc: 'halili' },
    { id: 'shkina', name: 'the Slavic woman', note: 'recognizes Mujo at the wedding feast and warns the escort, who only laugh her down', npc: 'shkina' },
    { id: 'escort', name: 'the three hundred escorts', note: 'the Krajl\'s armed wedding-train, captured whole when Mujo throws off his disguise', npc: 'shkjaKrushqit' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over invention,
  // under THE SHARING RULE. This is a NORTHERN (Gheg) frontier song: mirrors
  // are Jutbina and the frontier it faces, never a southern legend-site.
  places: [
    { id: 'home', emoji: '🏘️', name: 'Mujo\'s stable at Jutbina', note: 'the hamlet hearth where the courser is dreamed, born, raised and finally brought home',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina\'s own towers and plain — the hamlet the game already gives Mujo and Halili',
        mold: 'the hamlet\'s home ground: Mujo\'s own hearth and stable stand here (a narrow claim — one hearth, one stable — not the whole hamlet); this tale is the hamlet\'s own memory of where its warhorse came from',
        sharedWith: ['mujo-strength (the hamlet itself)', 'the halil-marriage chain (mujo1-mujo4/mujoFund)', 'the death-of-omer chain (omer1-omerFund)', 'kreshnik-epic, muji-e-behuri, mujo-avenges-halil, mujo-zanas, gjeto-basho-muji, ali-bajraktari and arnaut-osmani\'s own existing jutbina bookends, and zuku-bajraktar\'s proposed household kulla (siblings at the same hub-node, not shared scenes — each keeps its own household or its own doorway)'] } },
    { id: 'pazar', emoji: '🏪', name: 'Jutbina\'s own market', note: 'where a bridle and saddle are cut to fit the grown courser',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'a market row within the hamlet\'s own plain',
        mold: 'a working pazar for the frontier hamlet, trading tack, arms and goods for its own kreshnikë',
        conflicts: 'NOT the tregtari\'s stall (fshatiJeta, the southern village) — a different region\'s separate market; this frontier hamlet trades its own. No other tale proposes a jutbina market — this is a new sub-scene, sharing only the interim placeholder node with the hub\'s other not-yet-built proposals (ali-bajraktari\'s own "home"/"mbretnia", arnaut-osmani\'s "burgu", zuku-bajraktar\'s "kulla"/"ledina"/"oborriKadiut", this tale\'s own "fusha"/"osmani"/"krajlia") — each will get its own distinct node once drawn, none of them the same acreage today',
        proposal: 'add a small pazar scene off jutbina for the courser\'s bridle and saddle' } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the high pastures', note: 'where Mujo searches for the stolen courser and finds the shepherd Raspodini',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside (three-friends\' and mujo-strength\'s own words for this spot); this tale\'s own crossing is the search-and-kill of the shepherd Raspodini, a scene none of the other bjeshka tales stage',
        sharedWith: ['mujo-strength', 'three-friends', 'sari-salltek', 'ali-bajraktari', 'arnaut-osmani', 'gjeto-basho-muji', 'halil-marriage', 'kreshnik-epic', 'muji-e-behuri', 'mujo-avenges-halil', 'sokol-halili', 'zuku-bajraktar (mujo-zanas\'s own conflicts note already names this same roster, mujo-courser included)'] } },
    { id: 'fusha', emoji: '🌾', name: 'the frontier plain', note: 'the open ground where Mujo first shows the courser and later reveals himself to the wedding train',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'the open plain at the frontier between Jutbina and the Krajl\'s Kingdom',
        mold: 'an open border plain: first the ground where the Krajl\'s army fails to ring Mujo in, later the meadow where he halts the bridal train and throws off his disguise',
        conflicts: 'NOT zuku-bajraktar\'s proposed "ledina" (a meadow just outside the towers where the thirty Agas light a fire and drink of an ordinary evening) — that is an everyday gathering-spot close to the hamlet; this fusha is the frontier\'s own edge, a border ground for showing off a warhorse and for a bridal train\'s reveal, not a fireside',
        proposal: 'add a frontier-plain node off jutbina for the courser\'s first showing and the wedding-train\'s reveal' } },
    { id: 'osmani', emoji: '🏠', name: 'Arnaut Osmani\'s house', note: 'a neighboring household within Jutbina, where the theft is staged',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'a highland household inside Jutbina itself',
        mold: 'Osmani is Mujo\'s own neighbor and his son\'s godfather-to-be, not a foreign spy — the theft is staged in his own courtyard and stable, the door left ajar as agreed',
        conflicts: 'NOT Ali Bajraktari\'s own kulla (ali-bajraktari\'s "home") — its own conflicts note already names this exact place as a third, separate household within the same krahina; one widow\'s isolated kulla, one traitor neighbor\'s courtyard, neither the other\'s',
        proposal: 'add Osmani\'s household off jutbina — a courtyard and a stable with a door left standing open' } },
    { id: 'krajlia', emoji: '👑', name: 'the Krajl\'s Kingdom', note: 'the rival Kingdom across the frontier: the Krajl\'s court, his raging stable, his watch-tower, and the wedding-host\'s hall',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'the rival Christian Kingdom across the frontier — the kreshnik songs\' own standing enemy realm',
        mold: '"Krajl" and "Kapidan" are epic TITLES the songs give many different antagonists, not one ruler — this tale\'s Krajlo Kapedani is a distinct figure from the Krajl of the Zuku Bajraktar song (rusha1/rushaFund), the Krajl of New Kotor (halil-marriage), the captain of Mujo Avenges Halili (mejdan1/mujoHak1), ali-bajraktari\'s own king (proposed "mbretnia", also off jutbina — its own conflicts note already names this Krajlo Kapedani by name as a separate court), and Arnaut Osmani\'s own burgu (a twelve-Aga dungeon undone from inside, a different Krajl and a different shape of captivity entirely); none of them the same man or the same court',
        conflicts: 'NOT rusha1\'s tower, mejdan1/mujoHak1\'s court, ali-bajraktari\'s "mbretnia", or arnaut-osmani\'s "burgu" — those belong to other, already-staged or already-proposed kreshnik songs with their own Krajl and their own captain; this is a seventh, separate king\'s realm sharing only the same interim jutbina placeholder node until each gets its own',
        proposal: 'add a new node chain off jutbina (paralleling mujo2-mujo4/mujoFund) for the Krajl\'s court, his stable, his tower, and the wedding-host\'s hall down the frontier road' } },
  ],
  items: [
    { id: 'gjogu', emoji: '🐎', name: 'the courser', note: 'Mujo\'s dream-born, oracle-marked warhorse — stolen, disguised for, and won back twice over' },
  ],
  // EMBODIED projection — a compact staged arc off jutbina: you ARE Mujo, the
  // whole song's theft-and-disguise middle distilled to its one true stake —
  // the courser is held far off under an enemy's guard, and you either fight him
  // for it (the canonical win) or turn back and never win it (the path the song
  // never takes). Three dedicated nodes: mujoKale (the choice), mujoKaleFund
  // (the courser won), mujoKaleLarg (the horse left far).
  play: {
    entry: 'atCourt',
    stance: 'embodied',
    as: 'mujo',
    role: 'You are Gjeto Basho Mujo of Jutbina, and the grey courser you dreamed — white as snow with a star set on its brow, raised three years behind a locked door — has been stolen across the frontier and shut deep in an enemy\'s guarded stable, where it rages and will suffer no other hand. Fight your way to it and break his hold, and it is yours: the peerless warhorse that carries every later Kreshnik song. Or turn back and ride far, and leave it where it stands, guarded, and never won.',
    enter: 'the courser you dreamed and raised has been stolen far across the frontier, and an enemy holds it deep in his own guarded stable — the way to it runs through him',
    from: 'mujoKale',
    ending: 'mujoKaleFund',
    scenes: {
      mujoKale: 'atCourt',
      mujoKaleFund: 'reveal',
      mujoKaleLarg: 'return',
    },
    divergences: [
      { beat: 'atCourt', note: 'Built from scratch, and compressed: the song\'s whole first half — the dream, the foal born white with a star, the three years behind a locked door, the wild breaking-in, the showing-off on the Krajl\'s plain, and the kumbaria betrayal by which Arnaut Osmani sells the theft — is folded into the setup at the choice node, where the courser already stands stolen and guarded far off under the enemy\'s hand.' },
      { beat: 'reveal', note: 'The good ending, "The Courser Won," gives the song its canonical close in one stroke: Mujo breaks the enemy\'s hold by force and rides the grey courser home to Jutbina. The song\'s long masquerade middle — killing Raspodini for his face and clothes, walking unknown into the Kingdom, the twin escapes and the shame-driven return, the burned letters, the wedding-train reveal and the three hundred captive escorts — is all the price folded into that one fight.' },
      { beat: 'return', note: 'The secret ending, "The Horse That Stayed Far," is the path the song never takes: in the verse Mujo\'s shame at Jutbina\'s edge makes him wheel the courser back to the king (beat "return"), but the song then wins it back for good. Here that turning-back is made final — you ride far and leave the courser guarded in the enemy\'s stable, and never win it, so no later Kreshnik song is ridden on it.' },
    ],
  },
  beats: [
    {
      id: 'dream', title: 'A dream, and a foal born white as snow',
      note: 'In the dead of night Mujo dreams his mare is foaling a snow-white colt with a star on its brow; he wakes Ajkuna, and the dream proves true in the stable.',
      lines: [
        ['1.1', 'Deep in the night, with the moon not yet up, sleep brings Mujo a vision: his mare in the act of foaling.', 'Nata â shkue, hana s\'ka dalë, / Muji \'i andërr e ki\' andrrue, / Andërr paka hargelen tuj pjellë:'],
        ['1.2', 'The colt in his vision gleams snow-white, marked on the forehead with a star from God\'s own hand, its neck rising like a mountain crest, its legs fine as a deer\'s, its mane gentle as carded wool.', 'Ki\' ba mazin bardhë si bora, / Hyllin n\'ballë zoti i ki\' fale. / Qafa e tij si kreshta e bjeshkve. / Kambët e holla si t\'kaprrollit, / Qymja e tij si leshi i fjollit.'],
        ['1.3', 'What was it he told Ajkuna?', 'Çka ka qitë Ajkunes e i ka thanë?'],
        ['1.4', '"Ajkuna, on your feet — hurry to the stable. My sleep showed me the mare giving birth to a snow-white foal with a star marked on its head."', '- Çou, Ajkunë, shpejt n\'burg me ra / Se un \'i andërr e kam andrrue. / Andërr pa kam hargelen tuj pjellë. / Bardhë si bora mazin e ki\' ba. / Hyllin n\'ballë zoti m\'ja ka dhanë.'],
        ['1.5', 'At once Ajkuna is on her feet, torch in hand, out into a night still owned by the wandering oras.', 'Shpejt Ajkuna n\'kambë asht çue, / Po ma merr pishën në dorë, / M\'ish kenë nata natë me orë,'],
        ['1.6', 'As she reaches the stable door the foal calls out from within; her torch lights up a coat bright as snow on the peaks, and a white star traced clean across its brow.', 'Kur ka ra grueja n\'derë të burgut, / Hinglloi mazi mbrenda burgut, / M\'i ra drita qymes s\'shtatit, / Ndriti qymja si bora e malit, / Hyllin bardh shkrue n\'shtek te ballit.'],
        ['1.7', '"God be praised!" she calls, then backs out, drops the bar across the door, and rushes off to find Mujo in his room.', '"Marshalla!" Ajkuna foli / E prej burgut edhe doli, / Për mbas vedit derën e ndryni, / Fill tu Muja n\'odë i hini.'],
        ['1.8', '"Damn you, Mujo," she tells him, "your dream has come out exactly as you saw it — get up and see it yourself!"', '- Zoti t\'vraftë, Mujo, i ka thanë, / Si e ke pa, andrra ka dalë, / Çou e shif seri me sy!'],
      ],
      cast: {
        mujo: ['home', 'dreams his mare is foaling a snow-white colt with a star on its brow'],
        ajkuna: ['home', 'wakened at once; confirms the dream true in the stable'],
        krajl: ['krajlia', 'rules his own court across the frontier, not yet crossed with Mujo'],
        osmani: ['osmani', 'Mujo\'s own neighbor at Jutbina, not yet turned traitor'],
        raspodini: ['bjeshka', 'tends his flock on the high pastures, not yet met'],
        rusha: ['krajlia', 'the Krajl\'s daughter, unmarried in her father\'s court'],
        galiqe: ['krajlia', 'a courtier of the Krajl\'s court, not yet spoken'],
        halili: ['home', 'Mujo\'s brother, dwelling at Jutbina'],
        shkina: ['krajlia', 'a Slavic woman of the Krajl\'s people, not yet met'],
        escort: ['krajlia', 'the Krajl\'s people, not yet gathered as a wedding train'],
      },
      items: { gjogu: ['home', 'born this same night, white as snow, a star set on its brow'] },
    },
    {
      id: 'care', title: 'Three years behind a locked door',
      note: 'Mujo goes to admire the newborn foal, then sets Ajkuna\'s strict rules for raising it: wheat instead of barley, wine instead of water, three years shut from the daylight.',
      lines: [
        ['2.1', 'Mujo is up in an instant and down at the mare\'s stall, drinking in the sight of the foal —', 'Brraf në kambë Muji asht çue, / Tu hargelja kenka shkue, / Sa mirë mazin e ka shikjue,'],
        ['2.2', 'he pets it with real tenderness, then shuts the door fast behind him and goes back out to where Ajkuna waits.', 'Sa fort mazin e ka lmue! / Mbas për mbrapa derën e ka ndry. / Te Ajkuna kenka dalë.'],
        ['2.3', 'What instructions did he give his wife?', 'Ça ka qitë grues i ka thanë?'],
        ['2.4', '"Raise the foal properly — swap its barley ration for wheat, its water for wine, feed it three times each day, keep the stable door shut on it for three whole years, and never once let sunlight reach it."', '- Hysmet t\'mirë mazit me m\'i ba, / N\'vend t\'elbit, grunë ke me m\'i dhanë / E n\'vend t\'ujit venë ke me m\'i qitë, / Tri herë në ditë me ma kashagitë, / Për tri vjet jashtë mos me e qitë, / Për tri vjet mos të shofë kund dritë!'],
        ['2.5', 'Ajkuna carries out the charge exactly, keeping the foal close and cared-for; it takes to its feed eagerly enough,', 'Hysmet t\'mirë Ajkuna i ban, / Fort ma don e mirë ma mban, / Sa mirë mazi qi po han,'],
        ['2.6', 'and grows fast — before long, though, it starts to chafe against its confinement.', 'Sa shpejt mazi na asht rritë, / Fort po niska m\'u mërzitë.'],
      ],
      cast: {
        mujo: ['home', 'pets the newborn foal, then sets Ajkuna\'s strict rules for raising it'],
        ajkuna: ['home', 'feeds it wheat and wine three times daily, shuts it from the daylight three years'],
      },
      items: { gjogu: ['home', 'kept shut in for three years, on wheat and wine instead of barley and water'] },
    },
    {
      id: 'taming', title: 'Tack too small, a wild breaking-in',
      note: 'Grown too big for any ready tack, the foal gets a market-made bridle and saddle of gold and gems — then Mujo breaks it wild through the town before schooling it on the slopes.',
      lines: [
        ['3.1', 'The full three years run out; Mujo rises, ready at last to put a saddle on the foal, and speaks to it there in the darkened stable:', 'Kur janë mbushë plot tri vjet, / Në kambë Muji kenka çue, / Po don mazin me e shilue, / Llaf po ban n\'at burg të zi:'],
        ['3.2', '"Foal, will you carry me — down to a spring, across every plain and every mountain, to the edge of the Kingdom itself, out ahead of Jutbina\'s own agas?"', '- A don, maz, me ardhë me mue, / Me t\'shetitë der tu nji krue, / Me matë fusha e me matë bjeshka, / Për me dalë n\'shefi t\'Krajlisë, / Për me u pri agve t\'Jutbinës?'],
        ['3.3', 'He goes for its old bridle, but it comes nowhere near fitting the grown head — cut far too tight and small.', 'Po merr frenin e gjogatit, / Gja për krye freni s\'po i bjen, / Shkurt e ngusht freni po i bjen;'],
        ['3.4', 'The old saddle is no better — it sits nowhere near right on the broadened back, cut the same tight and small.', 'Po ma merr shalën e gjogatit, / Aspak shala s\'m\'i ka ra, / Shkurt e ngusht shala i ki\' ra.'],
        ['3.5', 'Mujo gives it only a short thought before acting — he takes the foal\'s lead in hand without further delay.', 'Pak rrin Muji e po mendon, / Por fort shum nuk po vonon / E për dore mazin ma merr.'],
        ['3.6', 'Down to the market he leads it, orders a bridle cut fresh to its head and a saddle fitted properly to its back — patent leather for the bridle,', 'N\'pazar Muji me te bjen / E për krye frenin ja pret, / Sa t\'mirë shalën n\'shpinë ja qet, / Ishte freni telatinit.'],
        ['3.7', 'silk brocade for the saddle, gemstones worked into every part of it, nine straps forged from choice metal out of Italy, gold for every horseshoe, steel nails driven into its hooves — yet no amount of tack or grooming brings the courser to heel.', 'Ishte shala prej brishimit, / Krejt me gurë prej xhevahirit, / Nandë kollanë mademesh ltinit, / Tanë patkojt-o prej florinit, / Mbërthye thundrash prej çelikut, / Po as timar gjogun po ma ban.'],
        ['3.8', '"Lord, stand by me," he says, and vaults onto its back — the courser will not be governed, kicking up stone and dust as it carries him headlong through the middle of town.', '"Ndimo, zot" e n\'shpinë m\'i kcen; / Nuk po mundet mazin me e zaptue, / Gur e pluhun mazi shkon tuj çue, / Përmjet shehrit po m\'i bjen,'],
        ['3.9', 'Panic spreads through the whole town; every house bolts itself shut.', 'Mera shehrit m\'i ka hi, / Tanë ndër shpija kenkan ndry,'],
        ['3.10', 'Eventually he gets the upper hand; he takes it up the steep road, breaking the cobblestones apart under its hooves, then brings it down onto open ground to put it through its paces properly,', 'Dikur mazin zapt e ka ba; / Përpjetë dromin ma ka marrë, / Tanë kalldramin po e thermon, / Fill kah fusha po ma çon / E me te mirë po lodron,'],
        ['3.11', 'one moment pressing it low to the earth, the next rearing it straight up, drilling it to clear five ropes in a single jump — a full three hours pass before he lets the exercise stop.', 'Tash e ulë ai urë për tokë, / Tash ma ngreh ai thikë përpjetë, / Pes konopë kcen përiherë; / Tre sahat lojën s\'ma dan.'],
        ['3.12', 'By the time he\'s ready to call a halt to it, the foal has settled somewhat.', 'Kur ka dashtë lojën me e ndalë, / Pak dallash mazi ka marrë,'],
      ],
      cast: {
        mujo: ['home', 'finds no tack fits the grown courser, has new tack cut at the market, breaks it wild through the streets, then schools it on the slopes'],
      },
      items: { gjogu: ['home', 'wild under the first rider, then broken and trained to leap, kneel, and saunter sideways'] },
    },
    {
      id: 'toKingdom', title: 'Six feet over the hedges',
      note: 'Mujo rides the trained courser onto the Krajl\'s own plain; when the king tries to ring him in and take him alive, Mujo calms the horse and gallops clean home.',
      lines: [
        ['4.1', 'Onto the Kingdom\'s own plain he rides it.', 'Në fushë t\'krajlive ma ka çue.'],
        ['4.2', 'Word of it reaches the shkjas, and real fear takes hold of them at such a display — it clears hedges two and three shoulders high, and the river itself in two or three leaps.', 'Kanë ndie shkjetë e fort na janë frigue, / Se lojë të madhe qi ka marrë, / Kcete gardhet dy tre supe, / Kcete lumin n\'dy tri pupa.'],
        ['4.3', 'News of it reaches Krajlo Kapedani, and he sounds the muster to call his own men together.', 'Ka marrë vesht Krajlo Kapedani, / Me kushtrim popullin ma mbledhë.'],
        ['4.4', 'What did the king announce?', 'Ç\'ka qitë krajli e ka thanë?'],
        ['4.5', '"Some challenger has ridden onto our plain, mounted on a splendid thirty-month courser — is there a single young man among you willing to face him?"', '- \'I mejdanxhi n\'at fushë ka dalë, / N\'gjog të trentë e me pashi, / A ka n\'ju kund djalë të ri, / Qi m\'i del atij mejdanxhi?'],
        ['4.6', 'Galiqe Galani spoke up then: "That\'s no true challenger, my king —', 'Aty foli Galiqe Galani: / - Mejdanxhi, krajl, s\'ka qillue.'],
        ['4.7', 'just Mujo out schooling that young colt of his — we\'ll have him bound and taken without any trouble."', 'Rishtas mazin Muji â tuj ma msue, / Kollaj rob na tash kem\' me e xanë.'],
        ['4.8', 'So what plan did the king settle on?', 'Ç\'mendoi krajli atherë me ba?'],
        ['4.9', 'He posts his army in a full circle, closing Mujo inside the ring, vowing "I\'ll seize him alive with my own two hands."', 'Rreth e rreth ushtrinë ma qet / Edhe n\'rreth Mujin ma shtjen, / Thotë "me dorë un gjallë po e kapi."'],
        ['4.10', 'But Mujo takes the measure of the trap right away, and starts settling the courser down, easing off its play so it can catch its breath.', 'Porse Muji m\'asht kujtue, / Ka nisë gjogun me e pajtue, / Me lanë lojën e me pushue.'],
        ['4.11', 'The moment the courser settles, Mujo swings its head back toward Jutbina and drives it into a dead run, until it\'s nothing but a blur of dust and haze.', 'Porsa lojën gjogu e ka ndalë, / Prej Jutbinet kryet ja ka dredhë, / Të fortin vrap mazit ja ka dhanë, / Tym e mjegull gjogun ma ka ba;'],
        ['4.12', 'Fear grips the shkjas; they abandon every ambush laid for him, and Mujo arrives back at Jutbina whole and untouched.', 'Mnera shkjevet m\'u ka hi, / T\'tana pritat na i kanë lshue, / Shndoshë e mirë n\'Jutbinë ka shkue.'],
      ],
      cast: {
        mujo: ['home', 'rides the trained courser onto the Krajl\'s own plain, then gallops it home unharmed'],
        krajl: ['fusha', 'rings his army around Mujo, meaning to take him alive — and fails'],
        galiqe: ['fusha', 'boasts that Mujo is no fighter, only a colt-breaker — wrongly'],
      },
      items: { gjogu: ['home', 'shows off its training before the Krajl\'s own people, then races home to Jutbina'] },
    },
    {
      id: 'reward', title: 'Three hundred purses',
      note: 'Furious at the humiliation, the Krajl offers three hundred purses for the courser — and Arnaut Osmani, Mujo\'s own neighbor at Jutbina, sneaks in by night to claim it.',
      lines: [
        ['5.1', 'So the king puts out his own proclamation: "Will no man come forward and win that foal off him? Three hundred purses to the one who manages it!"', 'Se ç\'ka qitë, tha, krajli e ka thanë: / - A del djalë kush mazn me ja marrë? / Treqin qese për maz i kjoshin dhanë!'],
        ['5.2', 'Curse the man — Arnaut Osmani —', 'Vrae zot at Arnaut Osmanin.'],
        ['5.3', 'no sooner had he caught wind of the offer than he crossed into the Kingdom at the stroke of midnight, found his way to the king\'s own door, and pressed himself flat to the ground before him.', 'Njato fjalë, tha, trimi kur m\'i ndie, / Npër mjesnatë n\'Krajli ka hi, / N\'derë të krajlit paska shkue, / Deri n\'tokë i kenka falë.'],
        ['5.4', 'What words did he offer the king?', 'Ç\'ka qitë krajlit e i ka thanë?'],
        ['5.5', '"Your name has reached me, my king — word is you\'ve promised handsome payment to whoever wins Mujo\'s foal away from him."', '- Nam të madh për ty kam ndie, / Pare t\'madhe thonë ke folë, / Për njate qi ja merr mazin Mujit.'],
        ['5.6', '"Meet that price, and I\'ll show you exactly how the foal can be won."', 'Si në daç ti paret me m\'i dhanë, / T\'kam msue mazin si me e marrë.'],
        ['5.7', 'What answer did the king give?', 'Ç\'ka qitë krajlj e ka thanë?'],
        ['5.8', '"Three hundred purses are yours, provided you can pry the foal loose from Mujo!"', '- Treqin qese t\'i paça dhanë, / Në dalsh Mujit mazin me ja marrë!'],
        ['5.9', 'Listen now to what Arnaut Osmani proposed!', 'Kqyr ça tha Arnaut Osmani!'],
      ],
      cast: {
        krajl: ['krajlia', 'offers three hundred purses for the courser'],
        osmani: ['krajlia', 'slips in by night and sells the king a plan for the reward'],
      },
    },
    {
      id: 'plot', title: 'The kumbaria plan',
      note: 'Osmani\'s plan: host a hair-cutting feast with Mujo as godfather, stable the horse himself with the door left ajar, and signal the hidden king to steal it while Mujo\'s hands are full of the child.',
      lines: [
        ['6.1', '"A week from today I\'ll hold my son\'s hair-cutting — Mujo, already promised as his godfather, will ride into my own courtyard, and I myself will step out to greet him."', '- Sot nji javë flokët ja marr djalit, / Kumar Mujin, qi p\'e kam, / N\'avlli Muji qi po m\'vjen, / Kam me dalë Mujin, kam me e ndeshë,'],
        ['6.2', '"I\'ll catch hold of the foal\'s bridle with my own hand, walk it well back into the stable, keep its reins and saddle right on it, and leave the stable door standing open."', 'Mirë për frenit mazin kam me e kapë, / Kthellë në burg vetë mazin kam m\'e shti, / Fre as shalë nuk po ja hjeki, / Dern e burgut nuk po e mbylli,'],
        ['6.3', '"You, my king, will come as far as my own garden — only be sure you stay well out of sight."', 'N\'baçe teme, krajl, ti ke me ardhë; / Kqyr veç mshehun ke me ndejë.'],
        ['6.4', '"The instant Mujo has the godchild in his arms, I\'ll let out a great laugh —"', 'Sa t\'marrë Muji famllin n\'dorë. / T\'madhe vet-o kam me qeshë,'],
        ['6.5', '"and that\'s your signal, my king — get to your feet, go straight into the stable, grab the foal by its bridle, and bring it out through the courtyard gate."', 'Atherë, krajl, ti n\'kambë m\'u çue, / Mbrenda burgut ke me hi, / Me ma kapë mazin për frenit, / Me ma qitë jashtë avullijet.'],
        ['6.6', '"Point it away from Jutbina, push it to a dead run, and you\'ll be back in the Kingdom whole and unharmed."', 'Me m\'ja dredhë kryet prej Krajlijet, / T\'madhin vrap mazit me ja dhanë. / Shnosh n\'Krajli ti ke me kthye,'],
        ['6.7', '"Let the whole of Jutbina ride after you — there\'ll be nothing they can do to stop you."', 'Pse tanë Jutbina mbrapa me t\'u vu, / Kurr ç\'me t\'ba s\'po kane.'],
        ['6.8', '"Stay well, Captain King!" — "And go well yourself, Arnaut Osmani!"', '- Tu mirë mbetsh, Krajl-o Kapidani! / - Tu mirë vosh, Arnaut Osmani!'],
      ],
      cast: {
        osmani: ['krajlia', 'lays out the kumbaria trap in full, down to the last detail'],
        krajl: ['krajlia', 'agrees, and readies himself to travel to Jutbina and hide'],
      },
    },
    {
      id: 'theft', title: 'Smoke and dust behind him',
      note: 'The plan runs exactly as plotted — Osmani laughs, the king slips into the stable, and gallops off with the courser while Mujo is still holding his godchild.',
      lines: [
        ['7.1', 'A full week runs out. The king gets himself dressed and shod, takes the road toward Jutbina, and settles into hiding at Osmani\'s own house.', 'Kenka mbushë, tha, plot nji javë, / Kenka veshë krajli, kenka mbathë, / Për Jutbinë rrugën e ka marrë, / Tu Arnauti, tha, kenka mshehë.'],
        ['7.2', 'Dawn light shows before the sun itself is up, and that same morning Mujo is on his feet —', 'Dritë ka dalë, dielli s\'ka ra. / N\'sabah Muji kenka çue,'],
        ['7.3', 'he saddles the foal himself, mounts up, and heads straight for Osmani\'s house.', 'Ka marrë mazin e ma ka shilue, / M\'i ka kcye, tha, mazit n\'shpinë, / Fill tu Arnauti paska shkue.'],
        ['7.4', 'Osmani steps out to greet him, takes hold of the foal\'s bridle, makes a show of admiring and petting it, then walks it into the stable.', 'Para Arnauti m\'i ka dalë, / Për frenit mazin po ja kapë, / Mirë po e don e fort po e lmon, / Mbrenda burgut po ma çon,'],
        ['7.5', 'He leaves the bridle and saddle right where they are, and the stable door unlatched behind him; the pair of them settle onto the cushions to drink coffee and smoke.', 'Fre as shalë nuk ja ka hjekë, / Dern e burgut nuk po e mbyllë. / Përmbi shilte vend kanë xanë, / Po pinë kafe, po pinë duhan.'],
        ['7.6', 'And what does Arnaut Osmani say?', 'Çka ka folë Arnaut Osmani?'],
        ['7.7', '"Bylykbashi Mujo — will you not hold your own godson at last?"', '- A ndigjove, Bylykbashe Muji, / A s\'po e merr ket famull n\'dorë?'],
        ['7.8', 'What was Mujo\'s reply?', 'Ç\'ka qitë Muji e ka thanë?'],
        ['7.9', '"Hand him over whenever you like," and with that the godchild is settled into his arms.', '- Gjithkur t\'dueni me ma dhanë. / Ma ka marrë at famull n\'dorë.'],
        ['7.10', 'Osmani lets out his loud laugh, and Krajlo Kapedani reads the sign perfectly.', 'T\'madhe qeshi Arnaut Osmani, / Mirë ma ndjeu Krajlo Kapidani.'],
        ['7.11', 'Up he gets and straight into the stable, where the foal stands ready in its tack; out to the courtyard he brings it.', 'Asht çue n\'kambë e n\'burg ka shkue, / Ma ka gjetë mazin t\'shilue, / N\'avlli mazin ma ka qitë,'],
        ['7.12', 'The king climbs onto its back, points it toward the Kingdom, and sets the whole plain churning with dust as the courser breaks into a dead run.', 'M\'shpinë, tha, krajli m\'i ka hipë, / Prej Krajlnisë kryet m\'ja ka dredhë, / Tym e mjegull fushën ma ka ba, / Vrap të madh gjogu m\'ka marrë.'],
        ['7.13', 'It dawns on Mujo what trick has been played; from inside the room, they say, he hears it happening, sets the godchild straight down, and leans his head out through the window.', 'Â kujtue Muji ç\'fjerë e ka xanë, / Ma ka ndie, tha, Muji n\'odë, / Ma ka lshue famllin për tokë, / N\'at dritore kryet ma qet.'],
        ['7.14', 'There\'s nothing left for his eyes to catch — the foal has already bounded off, trailing mist behind it, until mountain and plain vanish under smoke and fog, as though a snowstorm had blown through.', 'Gja me sy ai nuk po shef, / Pse përpara mazi kcen / E përmbrapa mjegull len, / Tim e mjegull bjeshkë e fushë i bani, / Si me kenë smet me borë.'],
      ],
      cast: {
        krajl: ['osmani', 'hides at Osmani\'s house in Jutbina until Mujo comes for the hair-cutting'],
        osmani: ['osmani', 'welcomes Mujo, stables the courser as agreed, and signals the king with a laugh'],
        mujo: ['osmani', 'rides to Osmani\'s for the kumbaria, unaware; holds the godchild while the courser is stolen away'],
      },
      items: { gjogu: ['krajlia', 'stolen from the stable and ridden hard back across the frontier'] },
    },
    {
      id: 'search', title: 'A shepherd\'s face, a shepherd\'s clothes',
      note: 'Mujo searches the high pastures and finds the Slavic shepherd Raspodini; he trades caps to match his face to the man\'s, then kills him and wears his clothes to walk into the Kingdom unknown.',
      lines: [
        ['8.1', 'Dread comes over Arnaut Osmani.', 'Mera i hini Arnaut Osmanit.'],
        ['8.2', 'Mujo is down at the stable in an instant, hunting everywhere for some sign of the foal — and it cuts him deeply to find the place empty.', 'Shpejt në aher Muji ka ra, / Shum po e lyp mazin me e pa, / Fort po i dhimbet mazi qi s\'e ka.'],
        ['8.3', 'He takes off on its trail, crying its name over one plain and the next, one mountain and the next, until he\'s climbing into the high pastures themselves.', 'Për mbrapan mazit i â vu, / Ma ka ndjellë fushë në fushë, / Ma ka ndjellë mal në mal, / E ka marrë bjeshkën përpjetë,'],
        ['8.4', 'Up there he crosses paths with a shepherd — none other than Raspodini himself.', 'Nji çoban aty m\'ka gjetë, / Ma ka gjetë at Çoban Raspodinin.'],
        ['8.5', '"Good to find you here," Mujo offers. "Good that you\'ve come," Raspo answers back, and the two of them settle down together.', '- Mirë se rrin, Muji i ka thanë. / - Mirë se vjen, Raspoja i ka thanë. / Kenkan ulë trimat e po rrinë.'],
        ['8.6', 'What does Mujo open with?', 'Ç\'ka qitë Muji e ka folë?'],
        ['8.7', '"Your name\'s reached my ears for a good while now, Raspo — people say the two of us could pass for kin. Do me the favor of that cap of yours."', '- Kah dit, Raspo, zanin ta kam ndie, / Se edhe n\'mue fort je tu m\'u gia, / Njat shishak o me ma dhanë.'],
        ['8.8', 'The shkja passes his cap across and takes Mujo\'s own headgear in trade.', 'At shishakun shkjau ja ka dhanë / Edhe shapkën ja ka marrë.'],
        ['8.9', 'Already Mujo could pass for the man\'s own brother.', 'Fort po i giet Raspodinit Muji,'],
        ['8.10', 'Right there Mujo pulls his sabre free and takes the shkja\'s head clean off.', 'Aty shpatën Muji e hjek / Edhe kryet shkjaut po m\'ja pret'],
        ['8.11', 'He pulls the man\'s clothes off him and puts them on his own body, where they sit well enough.', 'Edhe petkat po m\'ja zdeshë, / Mirë për shtat Muji po i veshë;'],
        ['8.12', 'The fit is near perfect — in Raspo\'s own clothes, Mujo could be mistaken for the man himself!', 'Sa mirë Mujit m\'i kanë ra, / Sa mirë Raspos i ka përgia,'],
        ['8.13', 'Staff and crook now in his grip, he makes his way directly to the king.', 'Shkop e krrabë n\'dorë i ka marrë, / Fill te krajli paska dalë,'],
      ],
      cast: {
        osmani: ['osmani', 'panics once the theft is done — and fades from the song for good'],
        mujo: ['bjeshka', 'searches the high pastures, trades caps with Raspodini, then kills him and takes his clothes'],
        raspodini: ['bjeshka', '☠ slain for his face and his clothes'],
      },
      exit: ['raspodini'],
    },
    {
      id: 'atCourt', title: 'Patience, or the wolf will get you',
      note: 'Disguised as Raspodini, Mujo praises the king\'s theft, learns the courser has gone half-wild in its stable, and talks his way into saddling it himself.',
      lines: [
        ['9.1', 'He drops into a bow before the king, forehead nearly to the floor.', 'Deri n\'tokë krajlit i â falë.'],
        ['9.2', 'How does the king greet him? "On your own, Raspo? What became of your flock?"', 'Ç\'ka ka qitë krajli e m\'i ka thanë? / - Vetëm gjanë, Raspo, si e ke lanë?'],
        ['9.3', 'How does Mujo answer that?', 'Ç\'ka qitë Muji e i ka thanë?'],
        ['9.4', '"Fine word of you reached me, my king — that you\'d got the better of Mujo and his foal. I\'ve come only to see the beast bring you luck."', '- \'I nam për ty, krajl, e kam ndie, / Mazin Mujit ja kishe marrë, / Kam ardhë mazin për hajr me t\'ba.'],
        ['9.5', 'How does the king respond?', 'Ça ka qitë krajli e ka thanë?'],
        ['9.6', '"Truth is, the animal\'s no use to me at all — I only wonder how Mujo gets by without it."', '- Kurrgja mazi nuk po m\'vijë, / Veç pa te Muja si të rrijë.'],
        ['9.7', '"From the day it came into my hands I\'ve had it locked away at the far end of the stable — nobody dares set foot near it."', 'Qysh at dit-o qi e kam marrë, / Thellë në burg-o qi e kam shti, / Kush tu ai s\'mundet me hi.'],
        ['9.8', '"Fury has taken hold of the beast — it has killed with its own kicking, and it bites besides; we can only shove its fodder through the bars to it."', 'Idhnim mazi qi ka marrë / E me shtjelma qi na vret / E me dhambë qi po na han, / Për prezorjet tagjinë po ja qesim.'],
        ['9.9', 'What does Mujo ask next?', 'Ç\'ka qitë Muji e kn thanë?'],
        ['9.10', '"Grant me leave, my king, to step down and look the foal over myself — I want to see with my own eyes that moon and star of its markings."', '- Izën, krajl, ti me ma dhanë, / Sa m\'u ulë mazin me e pa, / Hanë e hyll me pa si i ka.'],
        ['9.11', 'Leave is granted; Mujo throws the stable door open and lands a slap on the courser\'s flank.', 'Izën krajli ja ka dhanë, / Dern e burgut Muji e çil, / Shplakë n\'vithe Muji i bjen.'],
        ['9.12', '"Steady now, courser — devil take you!"', '- Duro, gjog, bisha të preftë!'],
        ['9.13', 'He wraps both arms around its neck to settle it, then walks the foal out into the courtyard himself.', 'N\'kike mazit po ja njet, / N\'avlli mazin po ma qet.'],
        ['9.14', 'What request does he put to the king?', 'Ç\'ka qitë krajlit e i ka thanë?'],
        ['9.15', '"By the very God who made you, my king, let me have its reins and saddle — watch how I\'ll bring this courser to order."', '- Pash \'i zot, krajl, qi t\'ka dhanë, / Fre e shalë ti me m\'i dhanë, / Terbjet gjogun si ta baj.'],
        ['9.16', 'The king consents, has the foal properly tacked up, and Mujo swings himself onto its back.', 'Edhe krajli ka ndigjue, / Mirë, tha, mazin ma ka shilue; / M\'i kcen Muja mazit n\'shpinë,'],
      ],
      cast: {
        mujo: ['krajlia', 'presents himself as Raspodini, praises the king\'s theft, and talks his way into saddling the raging courser'],
        krajl: ['krajlia', 'grants "Raspodini" leave to handle the courser, not knowing its true master\'s hand is on it'],
      },
      items: { gjogu: ['krajlia', 'calmed at once under the one hand it truly knows, saddled at the king\'s own order'] },
    },
    {
      id: 'secondEscape', title: 'Over the courtyard wall',
      note: 'Locked gates and guards do the king no good — Mujo spurs the courser clean over the courtyard wall and is gone before the king can even reach the tower roof.',
      lines: [
        ['10.1', 'But the king fears he\'ll bolt for Jutbina with it — he has the courtyard gates barred and posts a watch on the house.', 'Po dron krajli se e çon n\'Jutbinë, / M\'ja ka mbyllë dyert avullisë, / M\'ja ka vu, tha, rojën shpisë,'],
        ['10.2', 'None of it helps — in one motion Mujo spurs the courser hard and clears the courtyard wall clean, landing out on the open plain;', 'Por ç\'dobi se Muji meiherë, / Me dezgina gjogun ma ther, / Për maje avllisë e n\'fushë po del;'],
        ['10.3', 'he opens up across the wide plain, lets the courser run flat out, and disappears in a trail of dust and mist.', 'Ma ka marrë fushën e gjanë, / Vrap të madh gjogut i ka dhanë, / Tim e mjegull mbrapa ka lanë.'],
        ['10.4', 'What move does the king make now?', 'Ç\'ka qitë krajli edhe ka ba?'],
        ['10.5', 'Up he climbs onto the tower\'s parapet, spyglass in hand, and sweeps the whole length of the plain with it.', 'N\'beden t\'kullës, tha, paska hypë, / Ma ka marrë turbinë në dorë, / Për t\'gjatë fushën ma ka shikjue,'],
        ['10.6', 'Mujo comes into clear view, and the king is left cursing his own choice: "What possessed me to let that foal go?"', 'Sa mirë Mujin e ka hetue, / Fort me vedi qi asht pendue: / "Mazin un qysh me ja lshue?"'],
      ],
      cast: {
        krajl: ['krajlia', 'locks the gates and posts guards — too late; watches from the tower, regretting the gift'],
        mujo: ['fusha', 'clears the courtyard wall at a leap and gallops into the open valley'],
      },
      items: { gjogu: ['fusha', 'carries Mujo clear over the wall and away at a full gallop'] },
    },
    {
      id: 'return', title: 'A dishonest theft, undone',
      note: 'Shame catches up with Mujo at Jutbina\'s own edge; he turns the courser around and gives it back — only to learn the king has already chosen "Raspodini" as the wedding escort for his own daughter.',
      lines: [
        ['11.1', 'So what does Mujo do next?', 'Ç\'ka qitë Muji edhe ka ba?'],
        ['11.2', 'By the time he\'s at Jutbina\'s own edge, shame has caught up with him: "There\'s no honor," he says to himself, "in how I came by this foal."', 'Kur ka vojtë n\'shefi t\'Jutbinës, / I â dukë vetja për kori. / - Paburrnisht, tha, mazin e kam marrë.'],
        ['11.3', 'So he wheels the courser around again, brings it straight back to the king, and tells him:', 'Prap kryet gjogut ja ka dredhë, / Prap krajlit po m\'ja bjen, / Ka qitë krajlit e i ka thanë:'],
        ['11.4', '"No better foal exists than this one — wear it in good health and joy. My own flock is waiting, so I\'ll take my leave."', '- Ma t\'mirë mazin s\'ke pse e lyp, / Për hajr t\'kjoftë e mirë e gzosh, / Se te gjaja vetë po dal.'],
        ['11.5', 'The king\'s answer comes back: "Forget your flock, Raspo — the devil can have it, because you\'re not going anywhere."', 'Ka qite krajli e i ka thanë: / - Bisha, Raspo, i preftë të tana, / Jo te gjaja ti me shkue;'],
        ['11.6', '"You know very well my daughter\'s wedding is coming, and it\'s always been our way to pick out the best man going as escort."', 'Mirë e din se binë un do t\'martoj / E si zakonin qi e kem\' pasë, / Nji ma t\'mirin burrë për krushk me e gjetë,'],
        ['11.7', '"And the one I\'ve settled on is Shepherd Raspodini here — able with a blade, and no less able with his tongue."', 'Gjetë unë kam Raspodinin Çoban, / T\'zon për shpatë edhe për fjalë.'],
      ],
      cast: {
        mujo: ['krajlia', 'turns back at Jutbina\'s own edge, ashamed, and gives the courser back to the king'],
        krajl: ['krajlia', 'refuses to let "Raspodini" go — names him wedding escort for his own daughter\'s marriage instead'],
      },
      items: { gjogu: ['krajlia', 'returned to the king\'s hand, its theft undone by Mujo\'s own conscience'] },
    },
    {
      id: 'letters', title: 'Every warning burned',
      note: 'The real shepherds write the king letter after letter, warning him who "Raspodini" really is — every one lands in Mujo\'s own hands first, and every one goes into the fire.',
      lines: [
        ['12.1', 'The king\'s herdsmen put a warning down in writing, but the letter ends up in Mujo\'s own hands before the king ever sees it, and Mujo reads it through.', 'Çobât krajlit m\'i kanë shkrue, / N\'dorë të Mujit letra ka shkue, / Ka marrë Muji e e ka kndue.'],
        ['12.2', 'What does it warn?', 'Ç\'ka qitë letra e ka thanë:'],
        ['12.3', '"Our respects to you, Captain King — be on guard, for Gjeto Basho Mujo has slipped in among you disguised, wearing Raspodini\'s own clothes off his back."', '- T\'fala me shndet, Krajle Kapidan, / Qysh ta ruejsh at Gjeto Basho Mujin, / Se tevdil Muji t\'asht veshë, / Veshë m\'i ka petkat e Raspodinit,'],
        ['12.4', '"He\'s already killed Raspo for those clothes, and he\'s after your courser too — and we fear he means your own head next."', 'Se edhe Raspon na ka pre / Edhe gjogun po ta merr, / Se edhe kryet drue po ta pret.'],
        ['12.5', 'He goes over every word of it carefully, and once he\'s read it through, feeds it straight into the fire.', 'Sa mirë letrën po ma kndon, / Mirë po e kndon e n\'zjarm e lshon.'],
        ['12.6', 'Letter after letter the herdsmen keep sending, and each one finds its way to Mujo instead of the king — each one he reads, and each one follows the last into the flames.', 'Prap shum letra çobâjt shkruen, / T\'tana Mujit n\'dorë i shkuen, / T\'tana i kndon e n\'zjarm i lshon.'],
      ],
      cast: {
        mujo: ['krajlia', 'intercepts every warning letter the real shepherds send the king, and burns each one'],
      },
    },
    {
      id: 'weddingPrep', title: 'Three hundred escorts made ready',
      note: 'Three hundred escorts and their horses are made ready; unknowing, the king has "Raspodini" arm himself and saddle Mujo\'s own courser for the ride.',
      lines: [
        ['13.1', 'As the bride\'s wedding day draws close, a public crier calls the people together, and three hundred escorts are picked out by name.', 'Oroku nuses po m\'i vjen, / Me tallall popllin ma mbledh, / Treqind krushq me dorë po i zgjedh,'],
        ['13.2', 'Three hundred horses go out to them already saddled, three hundred fighting sabres besides, and every last thing is set in order.', 'Po m\'jau ep treqind kval shalet, / Po m\'jau ep treqind shpata mejdanit, / Të tana gati m\'i ka ba.'],
        ['13.3', 'What does the king now ask of "Raspodini"?', 'Ç\'ka qitë krajli Mujit e i ka thanë?'],
        ['13.4', '"On your feet, Shepherd Raspodini — arm and dress yourself properly, put on those fine garments, and get Mujo\'s own courser saddled."', '- Ngrehu \'i herë, Çoban Raspodini, / Mirë me u mbledhë e m\'u shtërngue, / Ato petka me i ternue, / Gjogun t\'Mujit me e shilue.'],
        ['13.5', 'Mujo is up without delay, and has the courser tacked up in fine order.', 'Sa shpejt Mujë kenka çue, / Sa mirë gjogun e kishte shilue,'],
        ['13.6', 'Weapons and a sabre come to him from the king\'s own hand; Mujo takes them in his right hand and buckles them on so they sit well.', 'Armët e shpatën krajli ja ka dhanë, / M\'i merr Muji me at dorë t\'djathtë, / Mirë për shtat ai m\'i ka njeshë,'],
        ['13.7', 'Then out he steps into the midst of the shkjas.', 'N\'mjedis t\'shkjeve edhe ka dalë.'],
      ],
      cast: {
        krajl: ['krajlia', 'gathers three hundred escorts and horses, and unknowingly orders "Raspodini" to saddle Mujo\'s own courser'],
        mujo: ['krajlia', 'arms himself and saddles his own stolen courser once more, this time by the king\'s own order'],
      },
      items: { gjogu: ['krajlia', 'saddled again for the wedding train — by the king\'s own command, and for Mujo\'s own hand'] },
    },
    {
      id: 'procession', title: 'Knee to knee with Gjeto Basho Mujo',
      note: 'Mujo leads the bridal train with Rusha at his side; a sharp-eyed Slavic woman recognizes him at the feast, but the escort laughs off her warning.',
      lines: [
        ['14.1', 'What does the king tell his daughter? "Up now, Rusha, pride of this house — put on your bridal clothes and join the escort without delay."', 'Ça i ka thanë krajli s\'bisë? / - Çou, moj Rushe, ndera e shpisë, / Çou, m\'i vesh petkat e nusisë / E ndër krushq ti shpejt me m\'dalë.'],
        ['14.2', 'Rusha does as her father says: inside she goes, dresses, and comes back out among the escorts.', 'Rusha babën e ka ndigjue, / Ka hi mbrendë e âsht ternue / E ndër krushq ajo ka dalë.'],
        ['14.3', 'The wedding party is off without further delay, Gjeto Basho Mujo out in front of them all, riding right alongside the king\'s own daughter, straight toward the host\'s own house.', 'Njatherë krushqit ma s\'janë ndalë, / M\'u ka pri Gjeto Bashe Muji, / Krah për krah me t\'binë e krajlit, / Fill te miku kenkan shkue,'],
        ['14.4', 'There they take their ease on the cushions, met and treated with real honor.', 'T\'tana ndër shilte kanë pushue. / Mirë i presin edhe i nderin.'],
        ['14.5', 'Mujo takes his coffee at an easy pace — while the shkja woman studies him with a very sharp eye.', 'Sa e gjerb kafen Muji dalëkadalë, / Sa mirë shkina e ka hetue!'],
        ['14.6', 'She looks the gathered shkjas over and turns to the escorts: "God strike you, men — how can you just sit there!"', 'Shkina shkjetë rreth i ka kqyrë / Edhe krushqvet u ka thanë: / - Pa u vra zoti, burra, mos u lashtë!'],
        ['14.7', '"Can you not see it\'s Gjeto Basho Mujo? That man has cost us more trouble than we can count — and there you sit, escorts, eating his bread and drinking with him, knee to knee!"', 'Si s\'po e njifni Gjeto Bashe Mujin, / Se shum sherrin burrit ja kem\' pa, / Me te hani krushq e me te pini, / Gju për gju, krushq me te po rrini!'],
      ],
      cast: {
        rusha: ['krajlia', 'dons her bridal garments at her father\'s word and joins the wedding train'],
        mujo: ['krajlia', 'leads the bridal train with Rusha at his side; sips his coffee calmly while the Slavic woman studies his face'],
        shkina: ['krajlia', 'recognizes Mujo at the feast and warns the escort — who laugh her down as a fool'],
        escort: ['krajlia', 'feast, sing and dance through the night, none the wiser'],
      },
    },
    {
      id: 'reveal', title: 'I am Gjeto Basho Mujo',
      note: 'On the road home Mujo halts the whole train in an open meadow and throws off his disguise — none of the three hundred dares lift a hand against him.',
      lines: [
        ['15.1', 'How does the escort answer her?', 'Çka kanë qitë krushqit e kanë thanë?'],
        ['15.2', '"Off with you, you addled old woman — trying to make this shkja into a Turk? His mother was never Turkish; he\'s a Slav same as the rest of us, born of a Slavic woman —', '- Hajt andej, mori shkina e marrë, / Ti shkjanë turk-o si po e ban, / Se ky s\'asht turk i turkinës, / Por asht shkjau, i biri i shkinës,'],
        ['15.3', 'this is Shepherd Raspodini, plain and simple, set to marry your own daughter come tomorrow."', 'Se ky asht Çoban Raspodini, / Qi binë tande nesër merr për grue.'],
        ['15.4', 'And with that the woman drops the subject.', 'Qatherë shkina fjalën e ka lanë.'],
        ['15.5', 'The feast rolls on — food, drink, song, dancing, games — clear through until daylight finally breaks the dark.', 'Paskan hangër e paskan pi, / Kanë nisë kangën e po kndojnë, / Kanë marrë vallen e po vallzojnë, / Kanë marrë lojën e po lodrojnë, / Derqi drita terrin ka da.'],
        ['15.6', 'The escorts pull themselves together and prepare to move on, Bylykbashi Mujo out ahead of the whole column, the king\'s daughter riding right beside him.', 'Sa mirë krushqit janë shtërngue, / Qaj ma i pari Bylykbashe Muji, / Krah për krah me t\'binë e krajlit,'],
        ['15.7', 'Once they\'ve crossed a wide meadow, Mujo calls the whole column to a stop and drives his spurs hard into the courser.', 'Kur kanë shkue n\'nji log të gjanë, / M\'i ka ndalë Muja të tanë, / M\'ka therë mazin në dezgina;'],
        ['15.8', 'Out in front of the shkjas the hero rides, and calls out to them:', 'Para shkjeve trimi ka dalë / E ka qitë e u ka thanë:'],
        ['15.9', '"Listen well, all three hundred of you shkjas — the reckoning is at hand: face me here on the dueling ground now, or march with me, every last one, straight to Jutbina —"', '- Po ndigjoni, more treqind shkje, / Ka ardhë dita për m\'u pre, / Ja n\'mejdan njitash me m\'dalë, / Ja n\'Jutbinë të tanë me ardhë,'],
        ['15.10', '"the goats\' shepherd Raspo was never here — you\'ve been standing before Gjeto Basho Mujo all along."', 'Se nuk jam un Raspoja i dhivet, / Por un jam Gjeto Basho Muji.'],
        ['15.11', 'Every shkja there, they say, lowers his head — not one utters a word, not one steps onto the dueling ground, not one lifts a hand to fight him.', 'Tanë, tha, shkjetë kryet e kanë ulë, / As kurrkush me gojë nuk ka folë, / As kurrnjâ n\'mejdan s\'ka dalë, / Kurrnjâ luftë me te s\'ka ngrehë.'],
        ['15.12', 'Mujo herds the whole column ahead of him, marches all three hundred escorts off as captives, and comes away with two brides for his trouble.', 'Tanë përpara Muji m\'i ven, / Treqind krushq rob m\'i xen / E dy nuse m\'i ka marrë,'],
        ['15.13', 'He keeps the king\'s daughter for his own house, hands the second bride over to Halili, and heads for Jutbina with the whole party in tow.', 'T\'binë e mbretit për vedi e ndalon, / Nusen Halilit po m\'ja çon, / Me te n\'Jutbinë po shkon.'],
      ],
      cast: {
        mujo: ['home', 'halts the whole train in an open meadow, spurs his courser round, and throws off his disguise, then leads the whole party home to Jutbina'],
        escort: ['home', 'bow their heads in silence — not one dares lift a hand against Gjeto Basho Mujo, then are marched captive to Jutbina'],
        rusha: ['home', 'kept for Mujo\'s own household; carried with the whole train to Jutbina'],
        halili: ['home', 'given the second captured bride, brought home with the train'],
      },
      items: { gjogu: ['home', 'carries Mujo and the whole captured train home to Jutbina at last'] },
    },
    {
      id: 'waitingKing', title: 'A dark wedding-night, and a bright one',
      note: 'The king waits alone for a wedding party that never comes, while nine days and nine nights of feasting fill Jutbina instead.',
      lines: [
        ['16.1', 'Alone in his palace the king waits, sure the wedding party is on its way.', 'Po pret krajli n\'at saraj, / Toj se krushqit për me ardhë.'],
        ['16.2', 'The wedding-night that should have shone stays dark instead; not a single escort ever shows.', 'Ishte errë ajo nata e bardhë, / Kurrnja krushqsh s\'i kite ardhë.'],
        ['16.3', 'Meanwhile the marriage is being celebrated at Jutbina instead — every soul in the hamlet has been summoned to it, and the merrymaking runs a full nine days and nights.', 'N\'at Jutbinë darsma po bahet, / Mbarë Jutbinën n\'darsëm e ki\' thirrë, / Banë danam nandë dit e net.'],
        ['16.4', 'Once that ninefold stretch of days and nights has run its course,', 'Mbas nandë ditsh e mbas nandë netsh,'],
      ],
      cast: {
        krajl: ['krajlia', 'waits alone in his own palace for a wedding party that never arrives'],
        mujo: ['home', 'feasts nine days and nine nights at Jutbina with the whole hamlet'],
        escort: ['home', 'held captive at Jutbina through the nine days\' feast'],
      },
    },
    {
      id: 'finalLetter', title: 'A finer son-in-law he could not ask',
      note: 'Mujo writes the king the plain truth of it, and the king can only sigh that he never had a cleverer son-in-law.',
      lines: [
        ['17.1', 'What is Mujo\'s next move?', 'Çka qitë Muji e ka ba?'],
        ['17.2', 'He sets down a letter in careful, fine script and has it carried straight to the king.', 'Hollë e imë nji letër e ki\' shkrue, / N\'dorë krajlit ja ka çue.'],
        ['17.3', 'The king takes it up and reads it through.', 'Ka marrë krajli e e ka kndue.'],
        ['17.4', 'What news does the letter carry?', 'Ç\'ka qitë letra e ki\' kallxue?'],
        ['17.5', '"Greetings to you and good health, Captain King — I hold three hundred of your shkjas captive now, along with two brides,"', '- T\'falë me shndet, ti Krajle Kapedan, / Treqind shkje rob t\'i kam xanë / E dy nuse t\'i kam marrë,'],
        ['17.6', '"The shepherd Raspo you thought you knew was never real — your daughter has married Mujo of Jutbina himself."', 'Se s\'jam kenë Raspoja i Krajlisë, / Por jam kenë Muji i Jutbinës.'],
        ['17.7', 'The king\'s own words come back: "A better son-in-law than this, I couldn\'t have found."', 'Ka qitë krajli e ka thanë: / - Ma t\'mirë mikun s\'kam ç\'e baj.'],
      ],
      cast: {
        mujo: ['home', 'writes the king the plain truth once the feast is done'],
        krajl: ['krajlia', 'reads it and resigns himself: no finer son-in-law could be found'],
      },
    },
  ],
}
