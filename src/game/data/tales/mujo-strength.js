// ===========================================================================
// TALE: Fuqija e Mujit — The Strength of Mujo — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — song no. 1 of the Kângë Kreshnikësh
// cycle, the very tale the whole cycle presupposes. English and Albanian run
// close to line-for-line (114 lines each), so "paragraphs" here are 16
// narrative strophes and a "sentence" is a punctuation-bounded verse unit of
// 1–6 lines; the Albanian third element is the verbatim verse group, lines
// joined with " / ". The game ALREADY STAGES this exact song as the night
// vignette off Jutbina (jutbina → mujiZana1 → mujiZana2 → mujiFund/
// mujiPasuri/mujiDije) with Mujo as the player's own stand-in — the beats
// anchor onto it, and Mujo himself is the core NPC `mujo` (never duplicated).
// ===========================================================================

export default {
  id: 'mujo-strength',
  title: 'The Strength of Mujo',
  source:
    'Sung by Mëhill Prêka of Curraj i Epërm (District of Tropoja); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 63–66, repr. Folklor shqiptar II, Epika legjendare I, ed. Q. Haxhihasani (Tirana 1966), pp. 104–106 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Fuqija e Mujit»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 63–66, in the embedded Albanian PDF Elsie & Mathie-Heck published beside their translation — the edition\'s Gheg orthography kept verbatim (already modern-alphabet; no transliteration needed), apostrophes marking the source\'s own elisions',
    local: 'docs/references/palaj-kurti-fuqia-e-mujit.sq.txt',
  },
  discrepancies: [
    'THE QUESTION AT THE CLIFF (¶3.2): AL «Ty, qysh të thonë, Mujon e kanë pvetë» literally asks his NAME — "what do they call you?" — where Elsie\'s English gives "What are you doing?" Mujo\'s reply (¶4) answers the practical question, not a name, so the beats keep Elsie\'s sense of "what troubles you here" rather than a literal name-ask.',
    'THE DANGER OF MORE MILK (¶11.2): AL «E batisë dyrnjanë anëmanë» pictures Mujo FLOODING the world on every side (batisë = to submerge); Elsie\'s translation instead pictures him gripping the whole earth and crushing it flat, a squeezing image rather than a drowning one. Beats follow the Albanian\'s flood.',
    'THE BLOW THAT KILLS (¶15.1): Elsie\'s translation adds a small vivid detail found nowhere in the Albanian: a mere touch of his smallest finger would finish a man off. The Albanian is plainer — it simply says the herdsmen dared not speak because whomever he struck, he left dead on the ground, with no such finger-image. Beats keep the plainer Albanian.',
  ],
  // 16 strophes of the English translation; sentence counts per strophe
  // (verse units — EN and AL run close to line-for-line, 114 lines each)
  paragraphs: [4, 4, 4, 4, 7, 2, 7, 4, 4, 6, 2, 4, 2, 3, 3, 2],
  cast: [
    { id: 'mujo', name: 'Mujo', note: 'the hired cowherd who becomes Jutbina\'s first kreshnik', npc: 'mujo' },
    { id: 'zanat', name: 'the two zanas', note: 'mountain-fairy mothers of the twin cradles; nurse Mujo to a hero\'s strength', npc: 'zanatShkembit' },
    { id: 'femijet', name: 'the two infants', note: 'the zanas\' crying children — the good turn Mujo does without being asked', npc: 'femijetZanave' },
    { id: 'baba', name: 'Mujo\'s father', note: 'sends the boy out to earn wages under a lord', npc: 'babaMujit' },
    { id: 'zotnia', name: 'the lord', note: 'hires Mujo as a cowherd; loses him for good after the wrestling', npc: 'zotniaMujit' },
    { id: 'nena', name: 'Mujo\'s mother', note: 'waits at Jutbina; the song closes on his homecoming to her', npc: 'nenaMujit' },
    { id: 'cobanija', name: 'the other herdsmen', note: 'used to besting Mujo at wrestling on the plain — until they aren\'t', npc: 'cobanijaJutbines' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over invention,
  // under THE SHARING RULE. This is a NORTHERN (Gheg) frontier song: mirrors
  // are Jutbina and its own highland pastures, never a southern legend-site.
  places: [
    { id: 'bjeshka', emoji: '⛰️', name: 'the high pastures', note: 'the bare mountain flank the lord\'s cattle graze, day after day',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside (three-friends\' own words for this spot); this tale is exactly the "muji-halili" use three-friends already set aside a place for',
        sharedWith: ['three-friends (reserved this spot for "muji-halili")', 'sari-salltek (the map\'s one shared "a mountain, when a tale needs one" hub)'] } },
    { id: 'shkembi', emoji: '🌑', name: 'the cliff of the twin cradles', note: 'a boulder under a cliff wall, where two zana infants wail through the night',
      anchor: { status: 'existing', node: 'mujiZana1', mirror: 'a cliffside refuge in the high pastures above Jutbina, reached only by searching the dark',
        mold: 'the game already stages exactly this scene, night-only, off Jutbina: two cradles, a great stone, the choice of gifts, the milk, the boulder lifted higher with each drink (mujiZana1 → mujiZana2 → mujiFund/mujiPasuri/mujiDije) — this tale IS that vignette, keyframed',
        sharedWith: ['the staged Jutbina night arc'] } },
    { id: 'jutbina', emoji: '🏘️', name: 'the Plain of Jutbina', note: 'the frontier hamlet\'s towers and open plain, Mujo\'s home before and after',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina, the kreshnik hub the game already names "where the lahutë sings the Songs of the Kreshnikë"',
        mold: 'jutbina already dwells Mujo and Halili and already leads (by night) into this very origin story — this tale is the hamlet\'s own founding memory: the boy who left a cowherd and came home a hero',
        sharedWith: ['halil-marriage (mujo1/mujo2…)', 'the death-of-omer arc (omer1/omer2…)', 'binoshet (kopshtiZanave, a separate garden of many zanas above the hamlet)'] } },
  ],
  items: [
    { id: 'guri', emoji: '🪨', name: 'the thousand-okë stone', note: 'the boulder Mujo lifts a little higher with every drink of zana milk' },
    { id: 'djepat', emoji: '🛏️', name: 'the two cradles', note: 'left crying at the cliff\'s foot; Mujo rocks them till the zanas come' },
  ],
  // play = how the game STAGES this song (Beats debug view). The 16-strophe
  // song is compressed into the night vignette off Jutbina: you ARE the young
  // Mujo, rocking the two Zana cradles till dawn, then choosing your gift.
  play: {
    entry: 'lostCattle',
    stance: 'embodied',
    as: 'mujo',
    role:
      'You are the young Mujo, a hired cowherd whose cattle have strayed in the dark. Sheltering against a cliff you find two cradles wailing, and you rock the Zana infants to sleep though no one asked you. When their fairy mothers appear, bright as daylight, they offer you a gift for the kindness — strength, riches, or wisdom. Drink their milk and lift the golden stone and you rise the strongest of the Kreshnikë.',
    enter: 'a night by the cliff, your cattle lost, and two cradles crying at your feet',
    from: 'mujiZana1',
    ending: 'mujiFund',
    scenes: {
      mujiZana1: 'lostCattle', mujiZana2: 'offerMenu', mujiFund: 'fourthMilk',
    },
    divergences: [
      { beat: 'fourthMilk', note: 'The song feeds Mujo the milk four times, and he lifts a plain thousand-okë boulder in rising stages — ankle, knee, waist, shoulder. The game folds all four drinks into one moment: you drink once and heave a single golden stone (gur i artë) clear off the ground.' },
      { beat: 'offerMenu', note: 'The zanas name four gifts — strength, battle-prowess, riches, wisdom — and Mujo, mocked by the herdsmen, asks only for strength without hesitating. The game offers three (folding battle into strength) and makes it a real branching choice, with gold and bird-speech as secret "wrong" endings the song never entertains.' },
      { note: 'The staged vignette ends at the cliff the instant strength is granted. The song runs on: the dawn and the found cattle, the wrestling on the Plain of Jutbina where Mujo hurls the strongest herdsman five rope-lengths, his walking free of the lord, the homecoming to his mother, and the blood-brother oath — none of it played.' },
    ],
  },
  beats: [
    {
      id: 'cowherd', title: 'A boy sent out to earn his keep',
      note: 'While Mujo is still young his father sends him to a local lord, who sets him to herd cattle on the high pastures — the same bare round of grazing, fountains, and shade, day after day.',
      lines: [
        ['1.1', 'A blessing on the Lord: we were nothing before His hand made us.', "Lum e lum për t'lumin zot, / Nu' jem' kanë e zoti na ka dhanë!"],
        ['1.2', 'When Mujo was still a boy, his father sent him off to earn wages under a local lord, who put him to work herding cattle.', "Kur ish kanë Muja djalë i ri, / Ma kish çue baba n'rrogë tu nji zotni. / Çoban lopësh zotnija e ka ba."],
        ['1.3', 'Every day he ranged the high pastures, cooled himself at the mountain springs, and rested in the shade.', "Për gjithë ditë bjeshkët Muja tu i kërkue, / Për gjithë ditë ndër gurra tu u freskue. / Për gjithë ditë ndër mriza tuj pushue:"],
        ['1.4', 'He left no trail or path untried, always driving the cattle on to fresh grazing.', "Rrugë as shtek pa njoftë nuk ka lanë, / M'i çon lopët gjithherë ku s'in kanë."],
      ],
      cast: {
        mujo: ['bjeshka', 'a hired cowherd, working the same mountain ground morning after morning'],
        baba: ['jutbina', 'sent his son out to earn wages under a local lord'],
        zotnia: ['jutbina', 'employs Mujo as a cowherd'],
        nena: ['jutbina', 'waits at home while her son works the mountain'],
        cobanija: ['jutbina', 'the lord\'s other herdsmen, not yet crossed with Mujo'],
        zanat: ['shkembi', 'mountain-fairy mothers, not yet met'],
        femijet: ['shkembi', 'their two infants, not yet met'],
      },
    },
    {
      id: 'lostCattle', title: 'A night, a cliff, two crying cradles',
      note: 'One night Mujo\'s herd strays out of reach, leaving him unable to head home. He takes shelter against a cliffside, discovers a pair of cradles close by, both wailing, and settles them to sleep with his own hands.',
      lines: [
        ['2.1', 'On one such night, though, his herd wandered off entirely, and he had no way to head home without them.', "'I natë lopët çobanit i paskan hupë / E tu shpija nu' ka mujtë me dredhë."],
        ['2.2', 'A rock wall stopped him in his tracks, so there was nothing for it but to halt and settle down there for the night.', "Buzë nji shkambit m'u ndalë asht ngushtue, / Asht ulë djali aty për me fjetë,"],
        ['2.3', 'Nearby lay two cradles, and from both of them came a wailing.', "Paj dy djepa aty kin qillue, / E kanë marrë brimën e tuj kajtë."],
        ['2.4', 'Mujo went to look at them, went to soothe them, and rocking them gently, lulled the pair to sleep.', "M'asht avitë Muja me i shikjue, / M'asht avitë Muja me i pajtue. / Po i pajton tuj i përkundë / E t'dy djepat i ka vu në gjumë."],
      ],
      cast: {
        mujo: ['shkembi', 'shelters at the cliff after losing his cattle; rocks two crying cradles to sleep'],
      },
      items: {
        djepat: ['shkembi', 'two cradles, both crying, now quiet under Mujo\'s hand'],
      },
    },
    {
      id: 'whoGoesThere', title: 'Two zanas, white as light',
      note: 'Two zanas appear, bright as daylight, and press him with questions. Mujo answers plainly: a hired hand, his cattle lost, he only meant to comfort the crying children — and asks in turn who they are.',
      lines: [
        ['3.1', 'White as daylight, two zanas then appeared.', "Bardhë si drita dy zana atherë kanë ardhë."],
        ['3.2', 'What are you doing here, they asked Mujo.', "- Ty, qysh të thonë, Mujon e kanë pvetë."],
        ['3.3', '"Lord, what has brought you to this place, and what has led you astray?"', "Zo', ç'të ka pru n'ket vend e shka t'ka tretë!"],
        ['3.4', 'Hear then what Mujo answered them.', "Kqyre Muja atherë shka u ka thanë:"],
        ['4.1', '"I\'m a hired hand set to herding cattle; every day I\'ve searched these high pastures;', "- Rrogtar lopësh un kam qillue, / Për gjithë ditë kto bjeshkë i kam kërkue;"],
        ['4.2', 'today misfortune found me: my cattle are lost, and nowhere could I find them;', "Mue rreziku sot ka ardhë me më ndeshë, / M'kanë hupë lopët e askund s'kam mujtë me i gjetë;"],
        ['4.3', 'night caught me here, and I lay down to sleep; I couldn\'t close my eyes for the crying I heard — it was these two infants weeping, and their wailing gave me no peace anywhere, so I took pity and rushed to comfort them, and settled them a little into sleep."', "Ktu m'xu nata e u ugja për me fjet, / S'mbylla sy prej vajit qi kam ndie, / Ishin kanë tuj kajtë këta dy fmij, / Kurrkund çajre fmija nu' m'kanë lanë. / M'u kanë dhimtë e jam hudhë me i pajtue, / I pajtova e sa grima n'gjumë i kam vdue."],
        ['4.4', '"But you, my lords — what are you, shining with all this light?"', "Po zo', shka jeni me gjithë ket dritë?"],
      ],
      cast: {
        mujo: ['shkembi', 'answers the zanas plainly, then asks who they are'],
        zanat: ['shkembi', 'appear at the cradles, bright as daylight, and question him'],
      },
    },
    {
      id: 'offerMenu', title: 'What favor do you ask?',
      note: 'The zanas name themselves — wanderers who help mankind — and offer Mujo his choice of reward for the night\'s kindness: strength, battle-prowess, riches, or wisdom.',
      lines: [
        ['5.1', '"We are the zanas, Mujo, out wandering, going about the world to help mankind.', "- Zana jemi, Mujo, tuj shetitë, / Tuj u sjellë na njerzvet me u ndimue."],
        ['5.2', 'What honor do you ask of us, Mujo, for rocking our two cradles to sleep?', "Ti çfarë ndere, Mujo, po na lypë, / Qi dy djepat na i ke vu në gjumë?"],
        ['5.3', 'Do you wish for strength, Mujo, to stand your ground?', "A don forcë, Mujo, me qindrue?"],
        ['5.4', 'Do you wish for prowess, Mujo, to fight in battle?', "A don luftë, Mujo, me luftue?"],
        ['5.5', 'Do you wish for riches, Mujo, or goods?', "A don gja, Mujo, a don mall?"],
        ['5.6', 'Do you wish for wisdom, Mujo, or tongues?"', "A don dije, Mujo, a don gjuhë?"],
        ['5.7', '"Ask for whatever you want," they told Mujo.', "Lyp shka t'duesh, Mujos te i kanë thanë."],
      ],
      cast: {
        zanat: ['shkembi', 'name themselves and lay out the choice: strength, battle, riches, or wisdom'],
      },
    },
    {
      id: 'wish', title: 'Only strength, to answer the mockers',
      note: 'Mujo asks for nothing but strength — the other herdsmen have long mocked him, and he wants only to get the better of them.',
      lines: [
        ['6.1', 'Hear then what Mujo spoke up and said.', "Kqyr Muji atherë ç'ka qitë e ka thanë:"],
        ['6.2', '"The other herdsmen mock me often, showing me nothing but spite — so it\'s only strength I want, to get the better of them."', "- Shpesh po m'ngucin çobanija, / Shum inad çobajt si më kanë, / Paj me forcë me jau kalue un due."],
      ],
      cast: {
        mujo: ['shkembi', 'asks only for strength enough to answer the herdsmen\'s mockery'],
      },
    },
    {
      id: 'firstMilk', title: 'Three drops, and the first stone',
      note: 'The zanas nurse him three drops of their milk; strong enough now to shake cliffs, he still raises the thousand-okë stone no higher than his ankle.',
      lines: [
        ['7.1', 'The zanas then said to one another:', "Njana shoqes zanat atherë i kanë thanë:"],
        ['7.2', '"Let\'s give Mujo milk from our breast."', "- Tamël gjiut Mujit për me i dhanë."],
        ['7.3', 'They gave him breast-milk to drink, and three drops were enough to fill him.', "Tamël gjiut i kanë dhanë me pi, / Me tri pika djalin ma kanë ngi"],
        ['7.4', 'Such strength did God grant him that he could shake the greatest cliffs.', "E i ka falë zoti kaq fuqi / Sa me e luejtë shkambin ma t'madhin."],
        ['7.5', '"Take hold of that stone," the zanas told him.', "- Kape gurin, zanat i kanë thanë."],
        ['7.6', 'The stone weighed more than a thousand okë.', "Nji mi okësh e ma guri ish' kanë."],
        ['7.7', 'He took hold of the thousand-okë stone, strained with both hands to lift it, and raised it no higher than his ankle.', "E ka kapë gurin nji mi okësh, / Badihava peshue me duer e ka, / Der n'nye t'kamës veç e nu' mujt ma."],
      ],
      cast: {
        mujo: ['shkembi', 'drinks the zanas\' milk for the first time; lifts the stone only to the ankle'],
        zanat: ['shkembi', 'give him the first three drops, then set him the stone'],
      },
      items: {
        guri: ['shkembi', 'a thousand-okë stone, raised no higher than an ankle'],
      },
    },
    {
      id: 'secondMilk', title: 'To the knee',
      note: 'More milk, and the stone rises to Mujo\'s knee before he sets it down again.',
      lines: [
        ['8.1', 'The zanas said to each other again:', "Njana shoqes zanat atherë i kanë thanë:"],
        ['8.2', '"Let\'s give Mujo more of the milk."', "- Edhe do tamël Mujos me ja dhanë."],
        ['8.3', 'Mujo took the milk and drank it, then took hold of the stone again to lift it,', "E ka marrë tamlin Muji e e ka pi. / E ka kapë gurin me e peshue,"],
        ['8.4', 'this time raising it up to his knee, before letting it drop back to rest on the ground.', "Deri në gju ai gurin e ka çue; / E ka ugjë prap n'tokë e ka pushue."],
      ],
      cast: {
        mujo: ['shkembi', 'drinks a second time; raises the stone to the knee'],
        zanat: ['shkembi', 'offer him the milk a second time'],
      },
      items: {
        guri: ['shkembi', 'raised to the knee, then set back down'],
      },
    },
    {
      id: 'thirdMilk', title: 'To the waist',
      note: 'A third helping of milk, and the stone rises to Mujo\'s waist.',
      lines: [
        ['9.1', 'See how kindly the zanas spoke then:', "Kqyre zana sa mirë ka thanë:"],
        ['9.2', '"Let\'s give a little more breast to Mujo."', "- Edhe pak gji Mujos me ja dhanë."],
        ['9.3', 'They gave him the breast again to drink, granting him just as much strength as God allowed,', "I ka dhanë prap gji për me pi, / Sa don zoti t'i ka dhanë fuqi"],
        ['9.4', 'and he took hold of the stone once more, raising it this time up to his waist.', "E e ka marrë gurin me e peshue / Deri në shogë gurin e ka çue."],
      ],
      cast: {
        mujo: ['shkembi', 'drinks a third time; raises the stone to the waist'],
        zanat: ['shkembi', 'offer him the milk a third time'],
      },
      items: {
        guri: ['shkembi', 'raised to the waist'],
      },
    },
    {
      id: 'fourthMilk', title: 'Strength of a drangue',
      note: 'A fourth and final drink turns Mujo\'s strength into something like a drangue\'s — the storm-hero\'s own power — and he lifts the whole thousand-okë stone clear to his shoulder.',
      lines: [
        ['10.1', 'The zanas watched him closely, weighing what they saw, and said to one another again:', "E kanë pa zanat, e kanë kqyrë, / Njana tjetrës prap te i ka thanë:"],
        ['10.2', '"We must give Mujo the breast once more."', "- Opet Muji gji lypet me i dhanë."],
        ['10.3', 'Mujo took the breast and drank,', "E ka marrë Muji gji me pi,"],
        ['10.4', 'and such was the strength God granted him this time that he became like a drangue.', "O se ç'po i ep edhe zoti fuqi, / Kenka ba si me kanë drangue."],
        ['10.5', 'Again he took hold of the stone to lift it,', "Ka marrë gurin me e peshue,"],
        ['10.6', 'and this time raised the thousand-okë stone clear up to his shoulder.', "N'cep të krahit Muji e ka vdue. / Nji mi okësh gurit i ka qindrue."],
      ],
      cast: {
        mujo: ['shkembi', 'drinks a fourth time and becomes drangue-strong; shoulders the whole stone'],
        zanat: ['shkembi', 'give him the last of their milk'],
      },
      items: {
        guri: ['shkembi', 'shouldered whole — a thousand okë held aloft'],
      },
    },
    {
      id: 'bloodBrothers', title: 'No more milk, but a blood bond',
      note: 'The zanas decide he has strength enough — one more drink and he\'d flood the whole world. Instead they talk with him gently under the moon and ask him to be their blood brother; Mujo swears to come to their aid whenever they call.',
      lines: [
        ['11.1', 'What did the zanas say to one another then?', "Njena shoqes zana çka i ka thanë?"],
        ['11.2', '"No more of the breast for Mujo — for if we gave it again, he would flood the whole world on every side."', "- Tjetër gji Mujit mos me i dhane. / Pse, tjetër gji Mujit për me i dhanë, / E batisë dyrnjanë anëmanë,"],
        ['12.1', 'Then the zanas kept drawing Mujo into talk, however softly they spoke — the moon looking on above their heads, the cliffside shadow stretching longer, so warmly did they sit and speak with him.', "Atherë zanat Mujin po e zhgjertojnë, / Se sa t'vogël qi po flasin, / Përmbi krye hana tuj i shikjue, / Për mbas shkambit hija tu u zgjatue, / Sa miqsisht me te kanë kuvendue."],
        ['12.2', 'Hear what the zanas said to Mujo!', "Kqyre zanat Mujit shka i kanë thanë!"],
        ['12.3', '"We want to take you as our blood brother, Mujo — speak now, what do you say?"', "- Probatin na, Mujo, duem me të xanë. / Fol ti, Mujo, tash qysh po thue?"],
        ['12.4', '"Whenever I am pressed, zanas, come to my aid!"', "- Tu t'jem ngusht, zana, me m'ndimue!"],
      ],
      cast: {
        zanat: ['shkembi', 'decide he has strength enough, then bind him their blood brother under the moon'],
        mujo: ['shkembi', 'accepts the bond: he will call on them whenever he is pressed'],
      },
    },
    {
      id: 'dawnReturn', title: 'Dawn, and the cattle found',
      note: 'God brings the dawn; Mujo rises at once, finds his cattle, and heads back.',
      lines: [
        ['13.1', 'God granted the dawn to come, and in an instant Mujo was on his feet.', "E ka falë zoti sabahin, / Ferk e ferk Muji kanka çue,"],
        ['13.2', 'He found his cattle and made his way back.', "I ka gjetë lopët e në shpi ka shkue."],
      ],
      cast: {
        mujo: ['bjeshka', 'rises at dawn, finds the cattle, and turns for home'],
      },
    },
    {
      id: 'jutbinaTest', title: 'Five rope-lengths into the air',
      note: 'On the Plain of Jutbina the other herdsmen are gathered as always, ready to best him at wrestling — but this time Mujo seizes the strongest by the hand and hurls him five rope-lengths into the air.',
      lines: [
        ['14.1', 'When Mujo came down onto the Plain of Jutbina, he found his fellow herdsmen all gathered there, used to besting him at wrestling.', "N'Fushë t'Jutbinës Muji kur â ra, / Bytym shokët e mbledhun i ka pa, / Se me Mujin aty in kenë msue, / Me ja mujtë Mujit tuj ladrue."],
        ['14.2', 'See now what Mujo did!', "Kqyre seri Muji shka ka ba!"],
        ['14.3', 'He set upon the herdsmen at their own wrestling, seized the strongest of them by the hand, and sent him flying five rope-lengths into the air.', "Ja ka nisë me çobaj me ladrue. / Send ma t'fortin me dorë e ka kapë, / Pesë konopë përpjetë i ka dhanë."],
      ],
      cast: {
        mujo: ['jutbina', 'throws the strongest herdsman five rope-lengths into the air'],
        cobanija: ['jutbina', 'gathered as always to test him — and are answered for good'],
      },
    },
    {
      id: 'silenced', title: 'None dared speak',
      note: 'None of the herdsmen dares protest — a touch from Mujo now leaves a man dead on the ground. He walks away from the lord\'s service for good and turns for home, to see his mother.',
      lines: [
        ['15.1', 'None of them dared say a word after that, for — so it\'s told — whomever he struck, he left lying dead on the ground.', "Askurrkush me folë nuk po flet, / Se, me thue kur po i bjen, / Dekun n'tokë gjinden po i qet."],
        ['15.2', 'So it\'s said Mujo turned his back on the lord\'s service, and the man walked away from it for good.', "Prej zotnisë, tha, Muji asht largue. / Prej zotnisë, tha, burri kur asht da."],
        ['15.3', 'He made his way home instead, they say, to see his mother.', "Ka dredhë n'shpi, tha, nanën për me e pa."],
      ],
      cast: {
        mujo: ['jutbina', 'leaves the lord\'s service for good; turns for home to see his mother'],
        cobanija: ['jutbina', 'silenced — none dares try him again'],
        zotnia: ['jutbina', 'loses his cowherd for good, and never appears again'],
      },
    },
    {
      id: 'legend', title: 'Every battle, with honor',
      note: 'From that day, so the song says, Mujo took up work and took up fighting both — and from every battle he entered, he always came away with honor. This is the strength the whole kreshnik cycle remembers him by.',
      lines: [
        ['16.1', 'There, so they tell it, Mujo took up his work, and there he took up fighting,', "Tha, ja ka nisë Muji tuj punue, / Tha, ja ka nisë Muji tuj luftue"],
        ['16.2', 'and from every battle Mujo ever entered, he always came away with honor.', "E n'sa lufta Muji si po bjen, / Ai gjithëherë me nderë si po del."],
      ],
      cast: {
        mujo: ['jutbina', 'home with his mother, strength proven — the frontier\'s first kreshnik'],
        nena: ['jutbina', 'has her son home again'],
      },
    },
  ],
}
