// ===========================================================================
// TALE: Muji i varruem — Mujo Wounded — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other
// tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — song no. 22 of the Kângë Kreshnikësh
// cycle (the folklore card "gjeto-basho-muji" is the hero's own founding
// summary card; his making is mujo-strength.js and his bride's abduction is
// mujo-zanas.js elsewhere in this registry, so this tale tells the arc those
// two leave untold — the wounding and the homecoming — the one about Muji
// himself that best answers "wounding and death" in the lore card's own
// summary). English and Albanian run close to line-for-line (80 lines each),
// so "paragraphs" here are 10 narrative strophes and a "sentence" is a
// punctuation-bounded verse unit of 1–3 lines; the Albanian third element is
// the verbatim verse group, lines joined with " / ". Mujo himself is the
// core NPC `mujo` (never duplicated); his courser, Zuku Bajraktari, and the
// "thirty Agas" collective are all reused from tale-muji-e-behuri.js's own
// registry entries rather than duplicated again here.
// ===========================================================================

export default {
  id: 'gjeto-basho-muji',
  title: 'Mujo Wounded',
  source:
    'Sung by Dedë Zefi of Curraj i Epërm (District of Tropoja); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 231–233, repr. Folklor shqiptar II, Epika legjendare I, ed. Q. Haxhihasani (Tirana 1966), pp. 253–254 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Muji i varruem»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 231–233, in the embedded Albanian PDF Elsie & Mathie-Heck published beside their translation — the edition\'s Gheg orthography kept verbatim (already modern-alphabet; no transliteration needed), apostrophes marking the source\'s own elisions; the Wayback capture of this one PDF 404s, so it was fetched directly from the live site with SSL verification disabled (the schema\'s documented workaround for this site\'s broken certificate)',
    local: 'docs/references/palaj-kurti-muji-i-varruem.sq.txt',
  },
  discrepancies: [
    'CLOTH, NOT HIDES (¶8.2): the Albanian pictures «shtatëdhjetë kut pëlhurë» — seventy ELLS OF CLOTH (kut = a measure, pëlhurë = fabric) spread over the courser\'s back as an improvised saddle-blanket for the weakened Mujo; Elsie\'s English gives "Seventy hides did they put on it." The beats follow the Albanian\'s cloth.',
    'NINE DROPS, NOT FAINTING (¶4.2): Osmani\'s curse in the Albanian pictures Mujo\'s nine wounds bringing nine DROPS down on him («e nandë varrë nandë pikë t\'u çojshin» — blood falling drop by drop); Elsie\'s English softens this to "your nine wounds cause you fainting." The beats keep the Albanian\'s nine drops.',
    'NO HEARTH IN THE ALBANIAN (¶3.5): Elsie\'s English has Mujo say "At my hearth my wife lies pregnant" — the Albanian is plainer, with no hearth at all: «se e kam lanë nji nuse me barrë» ("for I have left a wife with child"). The beats keep the plainer Albanian.',
  ],
  // 10 strophes of the English translation; sentence counts per strophe
  // (verse units — EN and AL run close to line-for-line, 80 lines each)
  paragraphs: [6, 6, 6, 4, 4, 4, 7, 3, 6, 10],
  cast: [
    { id: 'mujo', name: 'Gjeto Basho Mujo', note: 'the aga of Jutbina, shot down on a day his own courser warned him of', npc: 'mujo' },
    { id: 'osmani', name: 'Arnaut Osmani', note: 'the companion who mocks the omen, then gloats over Mujo\'s dying body', npc: 'arnautOsmaniMejdanit' },
    { id: 'gjogu', name: 'Mujo\'s courser', note: 'the oracular grey that refuses its feed, then grieves itself hoarse', npc: 'gjogu' },
    { id: 'zuku', name: 'Zuku Bajraktari', note: 'tries and fails to catch the grieving courser', npc: 'zuku' },
    { id: 'zanat', name: 'the three zanas', note: 'fly to Mujo\'s side and revive him, paying his old blood-oath once more', npc: 'zanatShpetimit' },
    { id: 'bariu', name: 'the shepherd', note: 'tells the disguised, riding-home Mujo that Jutbina already mourns him', npc: 'bariuUdhes' },
    { id: 'agat', name: 'the thirty Agas', note: 'gathered at Jutbina, feed the coursers at dawn, and welcome Mujo home at dusk', npc: 'agetMujit' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over
  // invention, under THE SHARING RULE. This is a NORTHERN (Gheg) frontier
  // song: mirrors are Jutbina and its own highland pastures, matching
  // mujo-strength.js's own choices exactly (this song is one more day on
  // the same plain and the same mountainside).
  places: [
    { id: 'jutbina', emoji: '🏘️', name: 'the Plain of Jutbina', note: 'the frontier hamlet\'s towers and open plain, where the day opens and closes',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina, the kreshnik hub the game already names "where the lahutë sings the Songs of the Kreshnikë"',
        mold: 'jutbina already dwells Mujo and hosts the frontier songs\' own comings and goings (mujo-strength\'s own words) — this tale keyframes one more day on the same plain: the dawn omen, and the dusk reckoning',
        sharedWith: ['mujo-strength', 'muji-e-behuri', 'mujo-courser'] } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the high pastures', note: 'the bare mountain flank between Jutbina and the twin trees, where the duel, the grief, and the revival all happen',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside (three-friends\' and mujo-strength\'s own words for this spot); this tale stages its duel, its grieving courser, and its revival on the same highland shelf mujo-strength already claimed for Jutbina\'s own use',
        sharedWith: ['mujo-strength (as "bjeshka")', 'three-friends (as "mountain", reserved for "muji-halili")', 'sari-salltek'] } },
  ],
  items: [
    { id: 'armet', emoji: '🗡️', name: 'Mujo\'s arms and clothes', note: 'the death-bequest he asks Osmani to carry home for his unborn son — never surrendered, because Mujo lives after all' },
    { id: 'pelhura', emoji: '🧵', name: 'seventy ells of cloth', note: 'spread over the courser\'s back so the weakened, revived Mujo can ride home' },
  ],
  // PLAY PROJECTION — how the game stages this tale (see _SCHEMA.md).
  // A KRESHNIK SONG heard at Jutbina, not a scene: bare witness — entry + role
  // only, no from/ending/scenes, no as/with (the deeds stay inside the song).
  play: {
    entry: 'wounded',
    stance: 'embodied',
    as: 'mujo',
    role:
      'You are Gjeto Basho Mujo, felled at the twin trees — nine shots in you and your oracular grey courser weeping over you, refusing its oats. Then three Zanas come down off the peaks with milk and strength. Drink, and rise whole to pay your old blood-oath once more — ride home and cut down the man who gloated over a dying hero — or turn from the wound and flee, and let the men make the death-wail over you.',
    enter:
      'nine shots have felled you at the twin trees and your grey courser weeps over you, refusing its oats — and three Zanas are coming down off the peaks with milk and strength',
    from: 'gbMuji1',
    ending: 'gbMujiFund',
    scenes: {
      gbMuji1: 'wounded',
      gbMujiFund: 'revival',
      gbMujiVdes: 'grievingCourser',
    },
    divergences: [
      { beat: 'revival', note: 'You embody Mujo at the wound, and the CHOICE is his revival: take the Zanas\' milk and rise to pay the old blood-oath once more (the canonical good ending), or refuse the mountain\'s healing and flee, and the men make the gjâmë over you (the added secret death the song\'s hero never suffers).' },
      { beat: 'reckoning', note: 'The full song\'s last-wish, the taunt of Arnaut Osmani, the grieving courser, the ride home and the shepherd\'s news are compressed into the revival-and-vengeance beat; the nine unnamed Slav raiders at the twin trees are the one enemy you strike down on rising.' },
      { beat: 'omen', note: "The courser refusing its oats as an omen is kept in the setup; the Zanas' mercy reads against Mujo's founding strength-lore (mujo-strength) — the mountain does not let its hero die of nine wounds while the Zanas keep the peaks." },
    ],
  },
  beats: [
    {
      id: 'omen', title: 'The courser will not eat',
      note: 'At dawn the thirty Agas of Jutbina set out oats for their coursers. Mujo\'s own will not touch the feed — a sign, he says, of a coming duel and misfortune both. Arnaut Osmani mocks him for reading omens into a horse\'s temper.',
      lines: [
        ['1.1', 'Thirty Agas were gathered together at Jutbina, putting oats out for their coursers.', "Janë bashkue tridhetë agët e Jutbinës, / Tagji gjogave qi po u qesin,"],
        ['1.2', 'But Mujo\'s grey would not touch the feed — it only stamped and struck the paving stones with its hooves.', "Gjogu i Mujës tagjinë s'e kërkon, / Por po rreh shkelma në kalldram."],
        ['1.3', 'So Mujo turned to his companions and told them:', "Shokve Muja te u ka thanë:"],
        ['1.4', '"Whenever my horse behaves this way, it has always meant a day for me to go out and duel — but this time, it seems, only trouble is waiting for me."', "- Sa herë gjogu qeshtu qi m'ka ba, / Ditë mejdanit at ditë un kam pasë, / Por bela e madhe at ditë më ka gjetë."],
        ['1.5', 'At that, Arnaut Osmani spoke up:', "Atherë foli Arnaut Osmani:"],
        ['1.6', '"You\'re only getting old and losing your nerve, Mujo — your horse understands nothing at all."', "- Tuj u plakë, tha, Mujo, e tuj u tutë, / Se gjogu i yt kurrgja nuk din."],
      ],
      cast: {
        mujo: ['jutbina', 'reads the courser\'s refusal as an omen of a hard day ahead'],
        osmani: ['jutbina', 'mocks the omen — Mujo is only growing old, he says'],
        gjogu: ['jutbina', 'refuses the oats set out for it, stamping the paving stones'],
        zuku: ['jutbina', 'gathered with the other Agas, not yet needed'],
        agat: ['jutbina', 'the thirty Agas, feeding their own coursers alongside Mujo'],
        zanat: ['bjeshka', 'three zanas of the high pastures, not yet called on'],
        bariu: ['bjeshka', 'grazes his flock on the high pastures, not yet met'],
      },
      items: { armet: ['mujo', 'Mujo\'s own arms and clothes, worn as always'] },
    },
    {
      id: 'wounded', title: 'Nine shots at the twin trees',
      note: 'Stung by the taunt, Mujo rides out to the twin trees anyway. Nine rifles fire on him there; the ninth bullet finds his heart, and his companions come running to a man nearly dead.',
      lines: [
        ['2.1', 'The words cut Mujo to the quick.', "Sa keq Mujos te i ka ardhë!"],
        ['2.2', 'At once he sprang onto his courser\'s back.', "Vrik në shpinë gjogut te i ka ra,"],
        ['2.3', 'and rode out toward the twin trees.', "Kenka dalë tu lisat binakë,"],
        ['2.4', 'There nine rifles fired on him — nine bullets struck his body, and the ninth one found his heart.', "Nandë pushkë të flakës, tha, kenkan kallë, / Nandë, tha, n'shtat tek e kanë marrë, / Të nandta n'zemër ma kanë prekë,"],
        ['2.5', 'Barely a spark of life was left in him.', "Sall pak gjallë, tha, Muji kanka mbetë."],
        ['2.6', 'His companions came running to his side.', "Aty shokët paskan dalë me t'shpejtë."],
      ],
      cast: {
        mujo: ['bjeshka', 'rides to the twin trees and is shot nine times — the ninth wound in the heart'],
        osmani: ['bjeshka', 'among the companions who come running to him'],
        gjogu: ['bjeshka', 'carried Mujo out to the twin trees'],
      },
    },
    {
      id: 'lastWish', title: 'One last favor',
      note: 'Dying, Mujo names Osmani his heir\'s courier: carry his arms, his clothes, and his courser home, for he leaves a wife with child — and if it\'s a son, let him find his father\'s weapons waiting.',
      lines: [
        ['3.1', 'Then Gjeto Basho Mujo found his voice and spoke:', "Atherë foli Gjeto Bashe Muja:"],
        ['3.2', '"Are you listening, Arnaut Osmani — you were always the first among my companions,"', "- A merr vesht, Arnaut Osmani? / Ma i pari shoq ti m'ke qillue,"],
        ['3.3', '"and I have one last favor to leave with you:"', "Amanet ty po ta la,"],
        ['3.4', '"carry my weapons and my clothes back home, and bring my warhorse with you too,"', "Armë e petka n'shpi me m'i çue, / Me ma çue gjogun e mejdanit,"],
        ['3.5', '"for I have left a wife behind, carrying a child,"', "Se e kam lanë nji nuse me barrë"],
        ['3.6', '"and if God grants that it\'s a son, let him find my weapons and clothes ready and waiting for him."', "E me dashtë zoti nji djalë me m'ja falë, / Armë e petka gatshëm qi t'i gjejë."],
      ],
      cast: {
        mujo: ['bjeshka', 'names his dying wish to Osmani'],
        osmani: ['bjeshka', 'hears Mujo\'s last request'],
      },
    },
    {
      id: 'taunt', title: 'Osmani\'s answer',
      note: 'Osmani refuses outright — he curses Mujo instead, and claims his arms, his courser, and his bride for himself. That year, the song says, Mujo\'s life came to its end.',
      lines: [
        ['4.1', 'Arnaut Osmani answered him:', "Atherë foli Arnaut Osmani:"],
        ['4.2', '"May a daughter be born to you instead, and may your nine wounds drip their nine drops down on you —"', "- Ty te shpija, tha, 'i çikë të leftë / E nandë varrë nandë pikë t'u çojshin,"],
        ['4.3', '"I\'ll take your weapons and clothes gladly for myself, I\'ll saddle your courser, and I\'ll marry your bride besides, Mujo!"', "Armë e petka ty, Muj, t'i gzosha, / Gjogun tand, Muj, ta shilosha / Dhe nusen ta martosha!"],
        ['4.4', 'That very year, so it is told, Mujo\'s life came to its end.', "- Qat vjetë Muji jetë paska ndrrue!"],
      ],
      cast: {
        osmani: ['bjeshka', 'refuses the dying wish outright and claims Mujo\'s life for his own gain'],
        mujo: ['bjeshka', 'falls still — his life, the song says, at its end'],
      },
    },
    {
      id: 'grievingCourser', title: 'The grief-mad courser',
      note: 'Zuku Bajraktari tries to catch the courser, but the grieving animal has bolted loose and neighs so loudly it deafens the whole mountainside.',
      lines: [
        ['5.1', 'And what became of Zuku Bajraktari in all this?', "Ça ka ba Zuku Bajraktari?"],
        ['5.2', 'He did his best to catch hold of the courser,', "Sa fort gjogun te e ka ndjellë,"],
        ['5.3', 'but the horse had already broken free of Mujo\'s hand, and no one could get near enough to seize it,', "Gjogu mêç Mujos te i ka dalë, / S'â dalë kush gjogun n'dorë me e shti."],
        ['5.4', 'so loudly did it neigh that the whole mountainside rang deaf with the sound.', "Sa t'madhe gjogu po hingllon, / Tana bjeshkët gjogu po i shurdhon."],
      ],
      cast: {
        zuku: ['bjeshka', 'tries and fails to catch the bolting courser'],
        gjogu: ['bjeshka', 'bolts free in grief, neighing loud enough to deafen the mountain'],
      },
    },
    {
      id: 'zanasHear', title: 'What is this uproar?',
      note: 'The blessed ones of the night hear the courser\'s cry. One zana asks another what the noise means; word comes back that the Slavs have killed Mujo — and the courser\'s grief is the proof. They resolve to fly to him.',
      lines: [
        ['6.1', 'The blessed ones of the night heard that cry.', "Paskan ndie t'lumet e natës,"],
        ['6.2', 'One zana called across the cliff to another: "What is this uproar out on the mountainside?"', "Zana zanës në shkamb te i ka thanë: / - Ç'â kjo brimë, mori shoqe, n'kto bjeshkë?"],
        ['6.3', '"The Slavs have cut down Gjeto Basho Mujo, and his courser has broken loose in its grief."', "- Kanë vra shkjetë Gjeto Bashe Mujin. / Gjogu mêç, moj shoqe, te i ka dalë."],
        ['6.4', '"Shall we go and bring him back to life?"', "A po vijni t'shkojmë për me e shndoshë?"],
      ],
      cast: {
        zanat: ['bjeshka', 'hear the courser\'s cry and resolve to fly to Mujo\'s side'],
      },
    },
    {
      id: 'revival', title: 'The old oath paid',
      note: 'Three zanas reach Mujo, bind his nine wounds one by one, and breathe life back into him. He rises to his feet and calls his courser, which gallops back to him weeping.',
      lines: [
        ['7.1', 'Three zanas rose up in flight at once and hurried straight to Mujo,', "Tri zana fluturim janë çue / E me t'shpejtë tu Muja paskan shkue,"],
        ['7.2', 'binding his wounds, one after another,', "Gjithë me rend varrët tue ja lidhë,"],
        ['7.3', 'and breathing their own breath into him, one after another.', "Gjithë me rend me gojë tuj hukatë."],
        ['7.4', 'Mujo began to draw breath once more,', "Ka nisë Muja frymë për me marrë,"],
        ['7.5', 'and they raised him back onto his feet.', "Halla, n'kambë Muji kenka çue"],
        ['7.6', 'Mujo called out to his courser, and the horse knew his voice at once,', "Edhe gjogun Muji ma ka ndjellë, / Mirë në za gjogu ma ka njoftë"],
        ['7.7', 'galloping to him so fast that tears ran down its face.', "E sa shpejt aty te i ka ardhë, / Lott për faqe gjogut in tuj i shkue."],
      ],
      cast: {
        mujo: ['bjeshka', 'revived — his wounds bound, his breath restored, back on his feet'],
        zanat: ['bjeshka', 'bind Mujo\'s wounds one by one and breathe him back to life'],
        gjogu: ['bjeshka', 'gallops back to Mujo\'s call, weeping to find him alive'],
      },
    },
    {
      id: 'homeward', title: 'Seventy ells of cloth',
      note: 'Too weak to mount on his own, Mujo is helped onto his courser, which kneels for him; the zanas spread cloth across its back and send him riding for home.',
      lines: [
        ['8.1', 'Mujo hadn\'t the strength to climb into the saddle, so the courser folded down onto both knees before him.', "Nuk ka mujtë Muji n'gjog për me hipë / E n'dy gjuj gjogu iu ka ulë,"],
        ['8.2', 'They laid seventy ells of cloth across its back,', "Ja kanë shtrue shtatdhetë kut pëlhurë"],
        ['8.3', 'and the zanas lifted Mujo up onto his fine horse, and he set off on the road for home.', "E m'gjog zanat Mujin ma kanë ulë / E prej shpije Muji â fillue."],
      ],
      cast: {
        mujo: ['bjeshka', 'set on the courser\'s back, still too weak to mount alone'],
        zanat: ['bjeshka', 'lift Mujo onto the cloth-covered courser and send him home'],
        gjogu: ['bjeshka', 'kneels for Mujo, then carries him homeward'],
      },
      items: { pelhura: ['gjogu', 'spread across the courser\'s back so Mujo can ride'] },
    },
    {
      id: 'shepherd', title: 'The shepherd\'s news',
      note: 'On the road Mujo meets a shepherd who doesn\'t recognize him and reports his own death as news from Jutbina — along with word of a newborn son. Mujo reveals who he is.',
      lines: [
        ['9.1', 'Somewhere along the way, Mujo happened upon a shepherd.', "N'nji farë vendi Muji kur ka shkue, / Paska hasë Muji n'nji çoban."],
        ['9.2', '"Any word, shepherd, out of Jutbina?" he asked.', "- Fjalë a gja, tha, çoban prej Jutbine?"],
        ['9.3', '"A black day for all of Jutbina," the shepherd told him, "the Slavs have cut down Gjeto Basho Mujo,"', "- E zezë dita, thotë, e gjithë Jutbinës, / Se kanë pre shkjetë Gjeto Bashe Mujin."],
        ['9.4', '"though a son has just been born to him at home."', "Veç te shpija, thotë, 'i djalë i ka le."],
        ['9.5', '"A blessing on your tongue for the news, shepherd —"', "- Ty t'lumt goja, çoban, ça po thue,"],
        ['9.6', '"for I myself am Gjeto Basho Mujo."', "Se vetë jam Gjeto Bashe Muji."],
      ],
      cast: {
        mujo: ['bjeshka', 'meets a shepherd and learns Jutbina already mourns him — and that a son has been born'],
        bariu: ['bjeshka', 'reports Mujo\'s death as news, not knowing who he\'s speaking to'],
      },
    },
    {
      id: 'reckoning', title: 'The one who would not dance',
      note: 'Mujo reaches Jutbina to a joyful welcome — every Aga\'s courser dances but Osmani\'s own, who alone won\'t move. Mujo cannot bear it: he cuts him down on the spot for the words he spoke over a dying man.',
      lines: [
        ['10.1', 'Mujo came down onto the Plain of Jutbina', "N'fushë t'Jutbinës Muji kenka shkue"],
        ['10.2', 'and found all his companions gathered there together.', "E gjithë shokët m'i ka gjetë bashkue,"],
        ['10.3', 'Every one of them sprang up onto their feet at once,', "Tha, gjithë përiherë n'kambë iu kanë çue,"],
        ['10.4', 'and set their coursers prancing for joy —', "Tha, gjithë me rend gjogun ja kanë lodrue,"],
        ['10.5', 'only Arnaut would not move.', "Tha, Arnauti hiç nuk po luen."],
        ['10.6', 'Mujo could not contain his fury, seeing it.', "Fort me te Muji â ngushtue."],
        ['10.7', 'Mujo sprang up and swung down off his courser at once.', "Halla, n'kambë Muji kenka çue,"],
        ['10.8', 'He swung his sabre down across Osmani\'s neck.', "Tha, shpatë në qafë Muji te i ka ra,"],
        ['10.9', 'and sent his head tumbling to the ground:', "Tha, kryet në tokë Muji ja ka qitë:"],
        ['10.10', '"You spoke evil of me on the very day of my death!"', "- Fjalët e këqija në ditë t'dekës m'i ke pa' thanë!"],
      ],
      cast: {
        mujo: ['jutbina', 'rides home to Jutbina and kills Osmani for his treachery'],
        agat: ['jutbina', 'spring to their feet and set their coursers dancing at Mujo\'s return'],
        osmani: ['jutbina', '☠ struck down on the spot for gloating over a dying man'],
        gjogu: ['jutbina', 'carries Mujo home to the Plain'],
      },
      items: { armet: ['mujo', 'never surrendered — Mujo carries his own arms home himself'] },
      exit: ['osmani'],
    },
  ],
}
