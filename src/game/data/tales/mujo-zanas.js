// ===========================================================================
// TALE: Martesa e Gjeto Basho Mujit — The Marriage of Gjeto Basho Mujo ("Mujo
// and the Zanas") — see ../tales/_SCHEMA.md for the format contract. This file
// is owned by its tale: agents editing other tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — song no. 2 of the Kângë Kreshnikësh cycle,
// sung by the same singer (Mëhill Prêka of Curraj i Epërm) as mujo-strength and
// printed alongside it. English and Albanian run close to line-for-line (367
// lines each), so "paragraphs" here are 26 narrative strophes and a "sentence"
// is a punctuation-bounded verse unit of 1-6 lines; the Albanian third element
// is the verbatim verse group, lines joined with " / ". Mujo himself is the core
// NPC `mujo` (never duplicated); Halili appears here for the first time in the
// registry — no core entry for him exists yet, so he is defined in this tale's
// own npc file; a future tale that promotes him to core-world.js should link him
// from here instead of redefining him.
// ===========================================================================

export default {
  id: 'mujo-zanas',
  title: 'The Marriage of Gjeto Basho Mujo',
  source:
    'Sung by Mëhill Prëka of Curraj i Epërm (District of Tropoja); Hylli i Dritës, Shkodra 1924, p. 414 sq.; Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 1–10; repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve) I, ed. Q. Haxhihasani (Tirana 1966), pp. 51–59 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Hylli i Dritës, Shkodra, 1924; repr. Visaret e Kombit II, Tirana 1937; repr. Folklor shqiptar II, Epika legjendare I, Tirana 1966',
  },
  albanian: {
    title: '«Martesa e Gjeto Basho Mujit»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 1–10, in the embedded Albanian PDF Elsie & Mathie-Heck published beside their translation — the edition\'s Gheg orthography kept verbatim (already modern-alphabet; no transliteration needed), apostrophes marking the source\'s own elisions',
    local: 'docs/references/palaj-kurti-martesa-e-mujit.sq.txt',
  },
  discrepancies: [
    'THE KRAJL\'S TITLE (¶1.4): Elsie\'s English softens «Krajli» into "the Realm of the Christians" and "the king\'s daughter," losing the frontier cycle\'s own stock title for its standing antagonist king. The beats keep "the Krajl" as the in-world title — a KIND of king, not one man, like the kulshedra of the main quest: a different Krajl rules in Rusha\'s song and a different Krajl again later takes Mujo captive.',
    'THREE HUNDRED VS. THIRTY (¶1.5, ¶8.3): the song musters "treqind darsmorë" (three hundred wedding attendants) at the outset but only "tridhetë agët" (thirty Agas) are later found turned to stone — a formulaic inconsistency typical of the oral epic\'s stock numbers (three hundred for the grand muster, thirty for the company actually staged). The beats keep both figures exactly as the song states them rather than silently reconciling them.',
    '"HE-GOATS" VS. THE PLAIN «DHI» (¶16.5, ¶17.5): Elsie\'s translation renders «dhi» as "he-goats" throughout; the Albanian word is simply "goats," ungendered. The beats keep the plainer "wild goats."',
    'THE CLOSING PROVERB (¶26.4): the song\'s closing couplet — a zana is the sun, a woman only the moon; woe to the one who trusts a woman — is the zanas\' own stock boast about their besa\'s reliability, sung at the very moment they have just kept faith with Mujo, not a moral about women to be repeated straight. Read beside the lore card\'s own gloss ("it is the oath, not the gold, that saves them"), the beats keep it as the zanas\' closing self-praise for having kept their word.',
  ],
  paragraphs: [7, 4, 3, 2, 3, 2, 5, 4, 5, 4, 4, 4, 4, 9, 7, 6, 7, 7, 4, 5, 6, 5, 5, 4, 5, 4],
  cast: [
    { id: 'mujo', name: 'Mujo', note: 'kreshnik of Jutbina; wins a bride, loses her and his wedding train to the zanas, and wins them back by seizing the zanas\' own power', npc: 'mujo' },
    { id: 'bride', name: 'the Krajl\'s daughter', note: 'Mujo\'s unnamed bride, taken captive at the shady meadows and turned into his own agent inside the zanas\' cave', npc: 'nusjaKrajlit' },
    { id: 'krajli', name: 'the Krajl', note: 'the frontier king who gives Mujo his daughter, host of the wedding feast', npc: 'krajliDhendrit' },
    { id: 'dizdari', name: 'Dizdar Osman Aga', note: 'the one elder among the young Agas; his boast overrides Mujo\'s warning and dooms the wedding train', npc: 'dizdarOsmanAga' },
    { id: 'darsmoret', name: 'the wedding attendants', note: 'three hundred young Agas of Jutbina, turned to stone at the shady meadows and restored at the song\'s end', npc: 'darsmoretJutbines' },
    { id: 'zanat', name: 'the three zanas', note: 'the fierce trio of the Green Valleys, whose whole power is hidden in three golden-horned goats', npc: 'zanatLugjeve' },
    { id: 'zanaVogel', name: 'the little zana', note: 'the youngest of the three, the only merciful voice, who lets the secret slip and later swears Mujo the zanas\' besa', npc: 'zanaVogel' },
    { id: 'halili', name: 'Halili', note: 'Mujo\'s younger brother, called on by name to free the captive goats', npc: 'haliliZanas' },
    { id: 'gjahtaret', name: 'the hunters of Jutbina', note: 'three hundred hunters and a thousand hounds, mustered to take the golden-horned goats alive', npc: 'gjahtaretJutbines' },
  ],
  places: [
    { id: 'jutbina', emoji: '🏘️', name: 'the Plain of Jutbina', note: 'Mujo\'s home before, during, and after — the muster, the pen, the homecoming',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina, the kreshnik hub the game already names "where the lahutë sings the Songs of the Kreshnikë"', mold: 'jutbina already dwells Mujo and Halili and already leads (by night) into the Zana origin story — this tale is another chapter of the same hamlet\'s standing life: riders muster here, a pen of stolen goats stands here, and the whole company comes home here', sharedWith: ['mujo-strength', 'halil-marriage (mujo1/mujo2…)', 'the death-of-omer arc', 'binoshet (kopshtiZanave, a separate garden of many zanas above the hamlet)'] } },
    { id: 'mbreteria', emoji: '👑', name: 'the Krajl\'s realm', note: 'the Realm of the Christians across the frontier, where Mujo\'s bride and her father the Krajl live',
      anchor: { status: 'offstage', mirror: 'the Christian frontier kingdom of the frontier-warrior songs — never one place twice', mold: 'never staged as an explorable spot; the wedding feast (¶4) is narrated, not walked. NOT the Krajl of Rusha\'s tower (content.js rusha1/halil1) or the Krajl who later takes Mujo captive — krajl is a stock TITLE across the cycle, like kulshedra is a kind and not a name, so a different Krajl may rule off-stage in every song without contradiction' } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the high pasture\'s shady meadows', note: 'three broad meadows on the road to the frontier — the zanas\' resting place, and the site of the wedding train\'s disaster',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank', mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside (three-friends\' own words for this spot); this tale\'s shady meadows are exactly the kind of danger a bare crossing-place can hold — travelers who linger to sing or rest here may meet zanas at rest, which is why mujo-strength\'s own herding-boy tale keeps to the SAME flank without clashing', sharedWith: ['three-friends (reserved this spot for "muji-halili")', 'mujo-strength (its own bjeshka)', 'sari-salltek'] } },
    { id: 'lugjetVerdha', emoji: '🐐', name: 'the Green Valleys', note: 'a hidden fold of the same high pasture: a lightless beech gorge, a hidden spring, and the pastureland beyond where the zanas keep their golden-horned goats',
      anchor: { status: 'proposed', node: 'mali1', mirror: 'a hidden valley within the frontier massif — the far, unmapped side of the bare mountain flank (mali1) travelers already cross', mold: 'the zanas\' own hidden domain: impassable cliffs and a beech canopy no sunlight enters, opening onto pasture where three wild goats with horns of gold graze unseen — distinct from the mujiZana1 cradle-cliff (a different, gentler PAIR of zanas, a night-only vignette already staged) and from the open bjeshka flank itself (mali1\'s own shared "nobody owns it" mold): this is inside the mountain, a place travelers do not simply pass through', proposal: 'add a hidden gorge-and-fountain node off mali1, reached by day (unlike the night-only mujiZana1), opening onto a penned valley of golden-horned goats', sharedWith: ['mujo-strength (mujiZana1 — a different, gentler zana vignette off the same mountain, night-only, never this tale\'s daylight gorge)'], conflicts: 'NOT the dozen tales anchored to mali1\'s open bjeshka surface (ali-bajraktari, arnaut-osmani, gjeto-basho-muji, halil-marriage, kreshnik-epic, muji-e-behuri, mujo-avenges-halil, mujo-courser, sokol-halili, zuku-bajraktar, three-friends) — this place is a separate interior fold none of them ever stage a scene in, reached off that same flank rather than sharing its ground' } },
  ],
  items: [
    { id: 'dhite', emoji: '🐐', name: 'the three golden-horned goats', note: 'the zanas\' whole power, hidden in three wild goats no one had ever caught' },
  ],
  // PLAY PROJECTION — how the game stages this song (see _SCHEMA.md).
  // A wayside discovery, not the epic ridden: you come on the stone wedding at
  // dhia1 and seize the goat; the whole muster/hunt/ransom collapses into dhiaFund.
  play: {
    entry: 'zanasStrike',
    stance: 'witness',
    // witness: NO as/with
    role: 'You come upon a wedding party frozen to stone on the high pasture — the wild Zanas\' work — and hear how their whole strength lies hidden in three goats with horns of gold. You are not Mujo but a wanderer who chances on the same secret: that to seize a goat is to hold a Zana\'s power in your hands and force her to swear a binding besa. When you take the goat, it is the oath, never the gold, that wakes the stone wedding again.',
    from: 'dhia1',
    ending: 'dhiaFund',
    scenes: { dhia1: 'zanasStrike', dhiaFund: 'theHunt' },
    divergences: [
      { beat: 'zanasStrike', note: 'In the song the petrifaction is the mid-point of a long ride — Mujo\'s ignored warning, Dizdar Osman Aga\'s boast, the disaster. The game drops you in afterward as a stranger reading the stones, so the whole muster, feast and return home (beats opening through theyStop) are told as lore, not played.' },
      { beat: 'theHunt', note: 'The source takes a hostage siege: Mujo musters three hundred hunters and a thousand hounds, pens the golden-horned goats for three days, and holds them for ransom until the zanas yield. The game collapses this to a single act — you simply seize a goat — with no hunt-band, no pen, and no days-long stalemate on screen.' },
      { note: 'In the source it is the little zana alone who, weeping, takes Mujo by the hand and swears the besa that wakes the dead wedding. The game keeps the moral — the oath, not the gold — but hands the seizing to an anonymous witness, so the bride, Halili and Dizdar Osman Aga never step on screen.' },
    ],
  },
  beats: [
    {
      id: 'opening', title: 'A bride won across the border',
      note: 'Home from a raid into the Krajl\'s land with a bride already won, Mujo musters three hundred wedding riders under old Dizdar Osman Aga to go bring her back to Jutbina.',
      lines: [
        ['1.1', 'The song opens with a blessing: nothing we were, till God Himself gave us being.', "Të lumt na për t’madhin zot, / qi s’jem’ kenë e zoti na ka falë!"],
        ['1.2', 'Then light broke and the sun climbed the sky.', "Dritë ka dalë e dielli ka ra."],
        ['1.3', 'And what, the song asks, was Gjeto Basho Mujo doing then?', "Ça ka ba Gjeto Basho Muji?"],
        ['1.4', 'He had ridden into the Krajl\'s own land and won himself a bride there — the Krajl\'s own daughter.', "Se n’Krajli Muji paska dalë / Edhe ‘i nuse e paska zanë, / Zanë e paska t’binë e krajlit."],
        ['1.5', 'Back home in Jutbina he mustered three hundred wedding riders to go fetch her.', "Kur â dredhë Muji n’Jutbinë, / I ka mbledhë treqind darsmorë,"],
        ['1.6', 'Dressed in gold, their swords and lances all agleam, mounted on dapple-grey horses, every one of them a young aga.', "Veshë me ar, shpatat flori, / Shgjetë e mzdrakë krejt n’ari ngri, / Të tanë gjogat pullali, / Të tanë ishin agë të ri,"],
        ['1.7', 'All but their one elder guide: Dizdar Osman Aga.', "Posë nji plakut qi u ka pri, / Aj asht Dizdar Osman Aga."],
      ],
      cast: {
        mujo: ['jutbina', 'home from the Krajl\'s land, mustering three hundred wedding riders to fetch his chosen bride'],
        bride: ['mbreteria', 'the Krajl\'s daughter, promised to Mujo, awaiting the wedding train'],
        krajli: ['mbreteria', 'rules the Realm of the Christians; will host the wedding feast'],
        dizdari: ['jutbina', 'the one old man among the young Agas, chosen to lead the three hundred'],
        darsmoret: ['jutbina', 'three hundred young Agas, armed and gilded, saddling up for the ride'],
        zanat: ['bjeshka', 'rest by turns in the high pasture\'s shady meadows, not yet met'],
        zanaVogel: ['bjeshka', 'youngest of the three, not yet met'],
        halili: ['jutbina', 'Mujo\'s young brother, not yet called upon'],
        gjahtaret: ['jutbina', 'ordinary hunters of the district, not yet mustered'],
      },
      items: {
        dhite: ['lugjetVerdha', 'three wild goats with horns of gold ducats — the zanas\' whole power, hidden and unknown'],
      },
    },
    {
      id: 'warning', title: 'Sing there, and you die',
      note: 'Before they ride, Mujo warns the whole company: three broad meadows on the high pasture belong to three fierce zanas who take their rest there, and anyone caught singing, reveling or lingering on that ground forfeits any hope of getting past them unharmed.',
      lines: [
        ['2.1', 'Mujo stood and spoke to them: listen well, kinsmen of the wedding train.', "- Po ndigjoni, o krushq darsmorë, / Ka qitë Muji e u ka thanë,"],
        ['2.2', 'When you reach the crest of the high pasture, you\'ll cross three broad meadows.', "Kur të delni n’maje t’bjeshkës, / Aty janë tri mrize t’mdha,"],
        ['2.3', 'Take care there — no revelry, no striking up a song, and do not stop to rest.', "Njaty rueni se lodroni, / Njaty kangën mos e e kndoni, / Kini mêt e mos pushoni,"],
        ['2.4', 'Three fierce zanas may be resting there in the shade, taking their ease in the cool — and they let no one who disturbs them pass by alive.', "Se aty janë tri zana t’idhta, / Tu mrizue ndoshta qillojnë, / Tu u flladitë ndoshta qillojnë, / Me kalue shndosh nuk u lshojnë!"],
      ],
      cast: {
        mujo: ['jutbina', 'warns the wedding train before they ride: no song, no rest, no revelry at the three shady meadows'],
      },
    },
    {
      id: 'outbound', title: 'Silent across the meadows',
      note: 'Riding out at dawn they sing and revel — until the high pasture, where they fall silent, grip the reins, and cross without stopping, straight through to their host.',
      lines: [
        ['3.1', 'At the next white dawn the riders saddled their horses, struck up a song, and set off merrily for the Krajl\'s land.', "Paska dalë e bardha dritë, / Atllarët krushqit i shilojnë, / Kanë nisë kangën po e këndojnë, / Kanë nisë kualt e po i lodrojnë. / Tuj këndue e tuj lodrue, / Kanë marrë rrugën për Krajli."],
        ['3.2', 'But once they reached the high pasture\'s ridge, they fell silent, held the reins tight, and would not stop for anything.', "Kur kanë dalë n’at maje bjeshket, / Aty kangën e kanë ndalë, / Kualt për doret i kanë marrë, / Askërkund vend nuk kanë xanë."],
        ['3.3', 'They neither drank at the springs nor rested in the meadows, but pressed straight on to their host.', "As ndër gurra uj me pi, / As ndër mrize me pushue, / Por te miku fill po shkojnë."],
      ],
      cast: {
        darsmoret: ['mbreteria', 'ride out singing, then cross the shady meadows in silence, straight through to their host'],
        dizdari: ['mbreteria', 'leads the three hundred, holding to the warning — this once'],
      },
    },
    {
      id: 'feastDeparture', title: 'A feast, and the ride home',
      note: 'The Krajl welcomes them warmly with food, drink, dancing and song until midnight; at dawn they dress, mount, and set off for Jutbina with the bride among them.',
      lines: [
        ['4.1', 'How warmly the Krajl received them! There was food and drink for all, and dancing and song lasted until midnight.', "Sa mirë krajli qi i ka pritë! / Gjithsa mujn me ngranë me pi, / Valle e kangë deri n’mjesnatë."],
        ['4.2', 'When the white light of dawn returned, they dressed and buckled themselves well, and with the bride among them set off again for Jutbina.', "Kur ka kthy prap drita e bardhë, / Mirë janë mbathë, mirë janë shtërngue, / Me gjithë nuse janë fillue, / Janë fillue me kthye n’Jutbinë."],
      ],
      cast: {
        krajli: ['mbreteria', 'welcomes the wedding train warmly, feasts and dances them till midnight'],
        bride: ['mbreteria', 'joins the wedding train at dawn for the ride home'],
        darsmoret: ['mbreteria', 'dressed and mounted at dawn, set off for Jutbina with the bride'],
      },
    },
    {
      id: 'oldManPersuades', title: 'The old man\'s boast',
      note: 'Singing and dancing all the way, they reach the broad meadows again — where old Dizdar Osman Aga boasts that he has rested here with bride after bride, and no harm has ever come of it.',
      lines: [
        ['5.1', 'Neither their singing nor their dancing let up anywhere along the road — not until they reached the broad meadows once more.', "Kërkund kangën nuk p’e ndalin, / Kërkund vallen nuk p’e ndajnë, / Dersa kapën tu Mrizet e mdha,"],
        ['5.2', 'There the old man spoke up: listen, wedding kinsmen!', "Aty plaku u paska folë: / - Pa ndigjoni, krushq darsmorë!"],
        ['5.3', 'Many times, he said, I have led a bride\'s party, and every time we have rested on these very meadows, let the horses graze, sung in this shade, and refreshed ourselves at these springs — and never once has harm come to us.', "Un shumherë krushk qi jam kanë, / Me gji’ nuse ksajt kem’ ra, / Ktyne mrizeve kem’ pushue, / Gjithmonë gjogat i kem’ lodrue, / Nën kto hije kem’ këndue, / Ndër kto gurra jem’ freskue, / E kurrgja nu’ na ka gjetë!"],
      ],
      cast: {
        darsmoret: ['bjeshka', 'reach the broad meadows again, still singing and dancing'],
        dizdari: ['bjeshka', 'boasts that he has rested here with brides before and nothing has ever gone wrong'],
      },
    },
    {
      id: 'theyStop', title: 'They stop anyway',
      note: 'On the strength of the old man\'s word they all dismount, stretch out on the meadow, sing, dance, muddy the springs, and shoot their lances at a mark.',
      lines: [
        ['6.1', 'So they all dismounted at once and went no further, but stretched themselves out on the meadow.', "T’gjithë priherë kanë zdrypë prej gjogash, / Kurrnji gjurmë përtej s’e bajnë, / Janë shkepë mrizeve e pushojnë,"],
        ['6.2', 'They struck up their song and dancing, muddied the springs, and let their lances fly at targets.', "Kanë nisë kangën e po këndojnë, / Kanë nisë lodrën e po lodrojnë, / Kanë nisë gurrat e po i turbullojnë, / M’mezdrak shejet mirë po i rrxojnë."],
      ],
      cast: {
        darsmoret: ['bjeshka', 'dismount, stretch out on the meadow, sing, dance, muddy the springs, loose lances at a mark'],
        dizdari: ['bjeshka', 'lets them all stop, his boast overriding Mujo\'s warning'],
      },
    },
    {
      id: 'zanasStrike', title: 'Stone on the meadow',
      note: 'The peaks thunder, the wind howls, and the three zanas appear breathing fire — they turn every reveler to stone and every horse to a stump, then carry off the one figure untouched: the bride herself.',
      lines: [
        ['7.1', 'Blessed be to us by the great God! — the song\'s own refrain turns.', "Të lumt na për t’madhin zot!"],
        ['7.2', 'Suddenly the peaks thundered all around, the wind howled through the beech trees, and in less than a moment—', "Kanë krisë majet gjithkun për rreth, / Ka fishkllue fryma ndër aha, / Pak ka ngiatë, fort shum s’ka ngiatë,"],
        ['7.3', '—the three bitter zanas stood before them, baring their teeth at one another, breathing fire from their mouths.', "Qe kanë dalë tri zana t’idhuna, / T’i kanë ndeshun dhambët për dhambë, / T’tria qesin zjarm për gojet,"],
        ['7.4', 'Turning on the meadow, they made every wedding guest stone like the rock of the mountain and every horse a blasted stump — only the bride was spared.', "Fill kah mrizet janë drejtue, / I bajnë krushqt si gurët e bjeshkës, / I bajnë gjogat si cûjt e rrahit, / Vetëm nusja qi ka pshtue."],
        ['7.5', 'The zanas seized her by the hand and carried her straight to their cave, to stand there forever, never to rest, but to cook their food and fetch their water.', "E kin kapë zanat për doret, / Fill te shpella e paskan çue, / N’kamë me ndejë, kurr me pushue; / Po u gatue e u merr uj."],
      ],
      cast: {
        zanat: ['lugjetVerdha', 'appear thundering out of the peaks, turn every reveler to stone and every horse to a stump, then carry the untouched bride off to their own cave'],
        zanaVogel: ['lugjetVerdha', 'among her sisters as they seize the bride'],
        darsmoret: ['bjeshka', 'turned to stone on the meadow — thirty of the company, the song now says, rock among their shattered horses'],
        dizdari: ['bjeshka', 'turned to stone with his own company'],
        bride: ['lugjetVerdha', 'untouched, but seized and carried to the zanas\' cave to serve them'],
      },
    },
    {
      id: 'mujoFindsThem', title: 'Thirty Agas turned to rock',
      note: 'Word reaches Mujo and fury takes hold of him; he rides to the high pasture and finds thirty of his Agas turned to stone, their horses shattered beside them.',
      lines: [
        ['8.1', 'Word of it reached Gjeto Basho Mujo, and it struck him hard.', "Njatherë ndi Gjeto Bashe Muji. / Sa keq Mujit i ka ra!"],
        ['8.2', 'He leapt onto his courser\'s back and rode straight up the mountain.', "E i ka hypë gjogut në shpinë, / E ka marrë bjeshkën përpjetë,"],
        ['8.3', 'Coming out onto the pastures, he found thirty of his wedding kinsmen turned to stone, thirty Agas made rock, their horses shattered to stumps beside them.', "Ndër livadhe, kur ka dalë, / Tridhetë krushq t’ngritë i ka gjetë. / Tridhetë agët ishin ba gur / Me gjithë gjoga shpërda ashtit."],
        ['8.4', 'How grief pressed on Mujo! Nearly out of his senses, he did not slow his horse for a moment.', "Sa fort Muja asht ngushtue! / Gati mêç Muja ka dalë! / Aspak gjogun s’e ka ndalë,"],
      ],
      cast: {
        mujo: ['bjeshka', 'learns of the disaster, rides in fury to the high pasture, and finds thirty of his Agas turned to stone, their horses shattered to stumps'],
      },
    },
    {
      id: 'mujoSearches', title: 'The forest with no light',
      note: 'He searches every spring and meadow in vain, then pushes into a beech forest so dark no sun ever enters it — and there, at a hidden spring, he declares he has found the zanas’ own haunt.',
      lines: [
        ['9.1', 'Alone now, he searched the whole high pasture, begged the zanas\' own spring and meadows for a sign of them, but found them nowhere.', "Jeremitë e bjeshkës i ka marrë, / Jau lyp kronin zanave, / Jau lyp mrizet zanavet; / Kurkund m’to nu’ mujt m’u ndeshë."],
        ['9.2', 'At last he pushed into a stand of beech so deep no light and no sun ever reached it, and there he found a spring, its water clear as a teardrop.', "Kur ka hi fell m’ashtë të bjeshkës, / Kurku drita mos me u pa, / Kurku dielli mos me ra, / Aty gje nji gurrë me uj, / Ujë t’kulluet si lodja e synit."],
        ['9.3', 'He stopped to rest, dismounted, and looked all around the grove.', "A nalë Muji me pushue / Edhe gjogut m’i ka zdrypë. / Po e kundron ashtën për rreth."],
        ['9.4', 'No path led onward anywhere; sheer cliff rose above the grove, boulders lay tumbled below it, and the beeches grew so thick, branch on branch, that no ray of sun had ever slipped through.', "Kurkund rrugë pertej nuk ka, / Përmbi ashtë ish shkam i gjallë, / Për nan ashta të tanë rrëgallë. / Mërthye ahat degë me degë, / Rrezes s’diellit shtek s’i lanë."],
        ['9.5', 'Mujo spoke up: this must be the zanas\' own haunt.', "Ka qitë Muji e ka thanë: / - Logu i zanave ktu do t’jetë!"],
      ],
      cast: {
        mujo: ['lugjetVerdha', 'searches every spring and meadow in vain, then pushes into a lightless beech forest and finds a hidden spring — surely, he says, the zanas\' own haunt'],
      },
    },
    {
      id: 'waiting', title: 'Three days at the spring',
      note: 'He lets his horse graze and waits three full days by the fountain before a woman comes for water — the bride herself, though neither yet knows the other.',
      lines: [
        ['10.1', 'He turned his horse loose to graze in the grove, sat himself down by the spring, and waited for the zanas to come for water.', "Gjogut ashtën ja ka dhanë, / Për buzë kronit po rri pshtetë, / Zanat pret kur t’vinë për uj."],
        ['10.2', 'Three full days went by, and then a woman came with a jug.', "Tri dit plot kur kanë kalue, / Me ‘i bulirë nji grue po vjen."],
        ['10.3', 'Something about her puzzles him: what could bring a lone woman all the way out to this empty grove?', "Â bindë Muji me vetvedi: / - Zot, kjo grue ç’asht në jeremi?"],
        ['10.4', 'Good day, she greeted him; good day to you too, he answered — and Mujo asked the bride what she meant to do with this water.', "- Mirëset’ gjejë, Mujit i thotë. / - Mirësevjen, Muji i përgjegjë. / - Ç’do me ba, nuse, kta uj, / Muji nusen p’e pevetë."],
      ],
      cast: {
        mujo: ['lugjetVerdha', 'turns his horse loose to graze and waits three days by the spring'],
        bride: ['lugjetVerdha', 'comes at last for water and finds Mujo waiting, unrecognized'],
      },
    },
    {
      id: 'brideTellsHim', title: 'A stranger\'s tale, unknowing',
      note: 'Not knowing the stranger is Mujo, she tells him everything: the wedding train, the lovely resting-spot, the three fierce zanas, the stone company, and her own captivity as their servant.',
      lines: [
        ['11.1', 'Barely knowing where to begin, she starts in: the bridal party had ridden to collect her, and they were resting somewhere pretty when three bitter zanas showed themselves.', "- As vetë, djalë, nuk dij ka e çoj. / Kanë ardhë krushqit veç me m’marrë, / M’nji lamth t’bukur kur kem’ dalë, / Tri zana t’idhta aty kin ndollë."],
        ['11.2', 'Whether it was because we had sat at their table, or because the Agas had woken them from sleep, God knows — I myself don\'t know.', "A se ndeshem m’trevezë t’tyne, / A se gjumin agët ja xueren, / Zoti e di, un gja nuk dij,"],
        ['11.3', 'Only this I know: the peaks thundered, the wind howled through the beeches, and the three bitter zanas came out and breathed on the Agas where they sat in the shade, turned the horses to stumps, and in an instant made every one of them stone.', "Veç kanë krisë majet e bjeshkve, / Ka fishkllue frima npër ashtë / E janë dalë tri zana t’idhta, / Agët ndër hije i kanë hukatë. / Gjogat ashtit i kanë hukatë, / Të tanë gur priherë janë ba,"],
        ['11.4', 'They carried me off to their own den, to cook for them and keep them in water.', "Mue te bani i vet m’kanë çue, / Me gatue e me u mushë uj!"],
      ],
      cast: {
        bride: ['lugjetVerdha', 'tells the stranger everything — the meadows, the three zanas, the stone company, her own captivity — not knowing he is Mujo'],
      },
    },
    {
      id: 'mujoQuestions', title: 'You look just like him',
      note: 'He asks who she was promised to; she names Gjeto Basho Mujo, and — never having seen him — says the very stranger before her looks just like the hero she describes.',
      lines: [
        ['12.1', 'What man had you meant to marry, he asked her — and by what name did they call him?', "- Ç’burrë ke dashtë, bi-o, me marrë? / N’emen burrit si i kanë thanë?"],
        ['12.2', 'I left father, I left mother, I left sisters, I left brother, she answered, to marry a great hero — they call him Gjeto Basho Mujo.', "- Jam da babet, jam da nanet, / Jam da motret, jam da vllaut, / Për me marrë nji burrë kreshnik, / N’emën i thonë Gjeto Bashe Muji!"],
        ['12.3', 'Giving nothing away, Mujo puts one more question to her: could she pick her promised husband out by sight?', "Aspak Muji nuk po qeshë! / - Po me e pa, a thue e njef,"],
        ['12.4', 'Unlucky as she is, she admits she has no way to place his face, her own eyes never having fallen on him — yet by everything people say of him, the man in front of her could pass for Gjeto Basho Mujo himself.', "Nusen prap Muji p’e pvetë / - Un nuk kam e mjera si me e njoftë, / Se me sy kurr s’e kam pa, / Por si ç’kam ndie tuj kuvendë, / Krejt po m’duke Gjeto Bashe Muji!"],
      ],
      cast: {
        mujo: ['lugjetVerdha', 'asks who her intended was; keeps a straight face at her answer'],
        bride: ['lugjetVerdha', 'names her promised husband as Gjeto Basho Mujo — and says the stranger before her looks just like him'],
      },
    },
    {
      id: 'revealAndOath', title: 'It\'s me before you',
      note: 'Mujo laughs and reveals himself, then asks her to hear him out; she swears by sun, moon and heaven to obey him whatever it costs her.',
      lines: [
        ['13.1', 'At that Mujo burst out laughing.', "Sa t’madhe Muji paska qeshë!"],
        ['13.2', 'It is I myself standing before you, bride, he said — how well you have known me.', "- Paj njaj vetë, moj nuse jam, / Se mjaft mirë besa m’ke njoftë."],
        ['13.3', 'But if you are truly a woman of good family, he said, will you hear out one thing from me?', "Por, për n’kjosh ti grue fisit, / Për nji fjalë a po m’ndigjon?"],
        ['13.4', 'By the God who sits above sun and moon, she swore, by the Lord who rules earth and heaven and sends now cloud and now clear sky — whatever you tell me, Mujo, I will obey, though I know full well it may cost me my head!', "- Pasha zotin qi rri mbi hanë e diell, / Pasha t’lumin qi sundon tokë e qiell / E herë vranë e herë kthillë, / Gjithë si t’m’thuesh, Mujë, t’kam ndigjue, / Bash me e dijtë se kryet m’shkurtohet!"],
      ],
      cast: {
        mujo: ['lugjetVerdha', 'laughs, reveals himself, and asks her to hear him out'],
        bride: ['lugjetVerdha', 'swears by sun, moon, and heaven to obey him at any cost'],
      },
    },
    {
      id: 'instructions', title: 'Refuse the table',
      note: 'Mujo lays out the plan: tonight, at the zanas\' meal, refuse to eat until they swear — by their own meadows, peaks and springs — to reveal the secret of their power.',
      lines: [
        ['14.1', 'Then Mujo laid out his plan: tonight, when you go back to their lodging, go and put the zanas a question.', "Atherë Muji e paska msue: / - Kur t’shkojsh mbrama në konak, / Ke me qitë e me i pvetë zanat:"],
        ['14.2', 'Ask them: by the meadows where you take your rest, where does your power come from?', "- Pashi mrizet ku mrizoni, / At forcé ju kah ma kini?"],
        ['14.3', 'Will they really tell me their power, the bride asked him doubtfully?', "- Forcenë mue a ma kallxojnë, / Mujin nusja p’e pëvetë."],
        ['14.4', 'His answer leaves no room to argue: follow his instructions to the letter, nothing more.', "Sa mirë Muja po i përgjegjë: / - Ke me ba ti si t’ soj vetë."],
        ['14.5', 'Tonight, as the sun sinks behind the peaks and the moon shines through the beeches, the zanas will gather as always by the spring for their evening meal.', "Tash po merr dielli mbas majesh, / Tash po bje hana ndër aha, / Tash po mblidhen si për natë / N’dritë të hanës me ngranë te gurra."],
        ['14.6', 'When they draw near the table, don\'t join them at the food — they will pity you then, for they cannot eat without you serving them.', "Kur t’ aviten zanat n’tryezë, / Ti n’at bukë mos me u avitë, / Atherë zanvet ke m’ju dhimët, / Kurr pa ty buk s’kanë me ngranë."],
        ['14.7', 'Use that moment to speak with them, and they will be moved to tell you where their power lies.', "Qatherë, n’dijsh për me u kuvendë, / T’kanë kallxue ku e kanë forcenë!"],
        ['14.8', 'He gives her the exact words to invoke: this shared meal, the high ground they graze all summer, the pastures where they take their ease, the cooling springs, and every day she has already spent serving them — and then the demand itself, where is their power hidden?', "Pash ket bukë, zanve ke m’u thanë, / Pashi majet, ku veroni, / Pashi mrizet, ku pushoni, / Pashi gurrat ku flladiti, / Tash sa dit qi jam me ju, / Forcenë tuej pse s’ma kallzoni?"],
        ['14.9', 'If you come through it unfrozen, their own oaths will bind them to answer you — come find me at the spring again tomorrow.', "N’mujsh me pshtue pa t’ngafisë zanat, / Kurrkah beve s’kanë si u pshtojnë / E tu kroni Mujin nesër e gje!"],
      ],
      cast: {
        mujo: ['lugjetVerdha', 'lays out the plan: refuse the zanas\' table tonight until they swear away their power\'s secret'],
        bride: ['lugjetVerdha', 'takes the sworn words she is to say, and is told to return to the spring tomorrow'],
      },
    },
    {
      id: 'sheAsks', title: 'Not one bite',
      note: 'Back with the zanas, she serves their table but will not join the meal, and when pressed she recites Mujo\'s own sworn formula demanding to know where their power lies.',
      lines: [
        ['15.1', 'The bride turned back through the deep forest, and Mujo set off for the Green Valleys.', "Nusja merr ashtën e fellë, / Muji duel ndër Lugje t’verdha."],
        ['15.2', 'Back with the zanas at once, she was asked why she\'d been gone so long — only that the spring\'s water had run muddy, she told them.', "Fill te zanat nusja â vojtë. / - Ku u vonove kshtu, po e pvesin. / - Gjeta gurrat turbullue, / Nusja zanave po u përgjegj."],
        ['15.3', 'They laid the table and fell to eating and drinking; she brought them their water and broke their bread, but would not sit down to join the meal herself.', "Kin shtrue buken e po hanë, / Kin shtrue pijen e po pinë, / Nusja aspak n’trevesë s’po ulet / Po u sillë uj e po u then bukë."],
        ['15.4', 'The little zana asked her: sister, why aren\'t you eating with us — are you unwell, that you don\'t want any?', "Zana e vogël p’e pëvetë: / - Kunë, ça ke qi s’po ha bukë? / A mos je e ligë e s’don?"],
        ['15.5', 'I cannot eat, dear little one, she answered, for that bread is not mine to share — not until you tell me your power!', "- S’kam si ha, mori e mira e vogël, / Se ata bukë nuk asht për mue, / Forcenë tuej pa ma kallxue!"],
        ['15.6', 'But I am swearing you an oath now, she said — slave though I am, and zanas of the mountain though you are, free to turn me to stone for it—', "Por nji be jam tue jau lshue, / Un robinë, ju zana malit, / Sa herë t’dueni gurë me m’ba:"],
        ['15.7', '—invoking the summer heights, the meadows they rest on, and the springs they drink from, she presses them for the one thing she came to learn: where their power is kept.', "Pashi majet, ku valloni, / Pashi mrizet ku pushoni, / Pashi gurrat, ku uj pini, / Me m’kallxue forcenë ku e kini?"],
      ],
      cast: {
        bride: ['lugjetVerdha', 'back with the zanas, serves their table but will not sit to eat, and swears them Mujo\'s own oath-formula to learn their power'],
        mujo: ['lugjetVerdha', 'sets off toward the Green Valleys while she goes to press the zanas'],
        zanaVogel: ['lugjetVerdha', 'the one who asks why she won\'t eat'],
      },
    },
    {
      id: 'secretRevealed', title: 'Three goats, horns of gold',
      note: 'The zanas move to freeze her for asking, but the little zana intervenes and reveals the secret: their whole power lives in three wild goats with horns of gold, grazing the Green Valleys, never caught.',
      lines: [
        ['16.1', 'At once the zanas sprang to their feet, pointing at the bride to freeze her where she stood.', "Fluturim janë çue në kamë, / Nusezezën me e ngrafisun."],
        ['16.2', 'But the little zana rose just as quickly and pushed her way between them.', "Ish kenë çue zana ma e vogla, / Shpejt ndërmjet u paska hi."],
        ['16.3', 'God strike you, great zana, she cried — let\'s just tell the girl! What harm could she ever do us?', "Zoti të vraftë, moj zana e madhe, / Se na nuses po i kallxojmë! / Po kjo ne shka mund t’na bajnë?"],
        ['16.4', 'Listen to me, child of man, she said, turning to the bride, and revealed—', "Pa ndigjo, moj e bija e njerit, / I â sjellë nuses e po i thotë,"],
        ['16.5', '—we hold our power through three wild goats, their horns cast of gold ducats, that live in the Green Valleys; no one has ever laid a hand on them,', "Se na i kemi tri dhi t’egra, / I kanë brinat prej dukatit, / Ata rrinë ndër Lugje t’verdha; / Kurkush n’dorë, nu’ mund i shtje;"],
        ['16.6', 'for if anyone ever did catch them, our power would drain away to nothing.', "Se me dalë kush me na i xanë, / Grimë forcejet ne s’na jet!"],
      ],
      cast: {
        zanat: ['lugjetVerdha', 'spring up to freeze the bride for asking'],
        zanaVogel: ['lugjetVerdha', 'steps between them, pleads for the girl, and reveals the secret: three wild goats with golden horns, in the Green Valleys, never caught'],
      },
    },
    {
      id: 'backToMujo', title: 'The secret carried home',
      note: 'At dawn she carries the secret to Mujo at the spring; he laughs to see her safe, hears it out, and sends her back to act as though nothing has happened.',
      lines: [
        ['17.1', 'So the bride sat down to eat, and daylight came to part the dark.', "Njatherë nusja buk ka ngranë, / Ka nisë drita me da terrin,"],
        ['17.2', 'She went down to the spring and there found Mujo waiting.', "Nusja niset me ra n’krue / E tu kroni Mujin e ka gjetë."],
        ['17.3', 'Mujo laughed heartily: so, he said, you came through unfrozen.', "T’madhe Muja e paska qeshë: / - A thue pshtove pa t’ngrafisë?"],
        ['17.4', 'I did, she answered, but for nothing — you gained nothing by sending me to them.', "- Pshtue kam, pse pshtoj s’kam pasë, / Kot me to veç m’ke përplasë, / Se nuk ke kurrshka me u ba,"],
        ['17.5', 'They told me exactly this: we have three wild goats, their horns of gold ducats, that graze together in the Green Valleys, and no one has ever laid hand on them — catch them alive, and all our power would vanish.', "Se ata m’thanë:”Kem’ tri dhi t’egra, / I kanë brinat prej dukatit, / Madhojnë bashkë ndër Lugje t’verdha, / Askush n’dorë s’mundet me i shti.” / Se me dalë kush qi me i xanë gjallë, / T’tanë forceja u maron!"],
        ['17.6', 'Mujo told her: go back to the zanas once more, and act as if nothing at all has happened.', "Â sjellë Muja e po i thotë: / - Prap te zanat ke me shkue / Edhe hiq vesht mos me u ba,"],
        ['17.7', 'Safe and sound, he said, Mujo will bring you home again — and every one of the frozen Agas with you.', "Shndosh e mirë Muji t’ka xjerrë, / Me gjithë agë qi m’kane shtangue!"],
      ],
      cast: {
        bride: ['lugjetVerdha', 'eats at last, then carries the secret to Mujo at the spring'],
        mujo: ['lugjetVerdha', 'laughs to see her safe, hears the secret, and sends her back to feign that nothing happened'],
      },
    },
    {
      id: 'rallyHunters', title: 'Every hunter in the district',
      note: 'Mujo rides to Jutbina\'s market and musters every hunter of the district for that night — three hundred hunters and a thousand hounds between them — with one order: take the goats alive, or none of us sees Jutbina again.',
      lines: [
        ['18.1', 'He climbed onto his courser\'s back and rode straight for Jutbina, down to its market.', "Po i hypë Muja gjogut m’shpinë, / Fill n’Jutbinë Muji ka shkue, / N’treg t’Jutbinës kur ka ra,"],
        ['18.2', 'There he called out to the whole district: every man among you who counts himself a hunter, take up your hounds and gather them, come to my house tonight — I\'ll feed and water you well, for tomorrow we go hunting.', "Ja ka dhanë zanin Krahinës: / - Kushdo t’jeshë gjahtar në treg, / Merr langoj e mbledh zagarë, / Të tanë mrama n’shpi me m’ardhë, / Do t’u nap me hârë, me pi, / Për gjah neser duem me hi!"],
        ['18.3', 'Three hundred hunters gathered at once, with seven hundred hounds besides and three hundred hunting dogs more, and all of them came to Mujo\'s door.', "Shpejt janë mbledhë treqind gjahtarë, / Me shtatëqind e ma zagarë, / Me treqind e ma langoj, / Derën Mujit ja kanë msy."],
        ['18.4', 'Mujo gave them all a fine welcome.', "T’mirë konakun jau ka ba."],
        ['18.5', 'When the light of dawn came to part the sky, Mujo rose and spoke to them.', "Ka nisë drita për me da, / Ka qitë Muji e u ka thanë:"],
        ['18.6', 'Hear me, hunters: we must take these goats alive.', "- Pa ndigjoni, ju gjahtarë! / Gjallë me dorë dhitë do t’i xamë!"],
        ['18.7', 'Let no one make the mistake of hunting them down — wound even one, and none of us will see Jutbina again.', "Mos gabo kush m’to me gjue, / Se po batë e m’i varruet, / Kurrnja shndosh nuk kthen n’Jutbinë!"],
      ],
      cast: {
        mujo: ['jutbina', 'rides to Jutbina\'s market and calls every hunter of the district to muster that night, hounds in hand'],
        gjahtaret: ['jutbina', 'three hundred strong, with seven hundred hounds and three hundred hunting dogs, gather at Mujo\'s door and are fed and warned: take the goats alive, or none of us sees Jutbina again'],
      },
    },
    {
      id: 'theHunt', title: 'Three days, three nights',
      note: 'Mujo leads the hunters into the Green Valleys and rings the place round; three days and nights of hunting bring the wild goats out alive, and Mujo pens them at his own house.',
      lines: [
        ['19.1', 'With Mujo at their head they set out for the Green Valleys and ringed the whole place round.', "Muji para na u ka pri, / N’Lugje t’verdha paskan dalë. / Rrethojnë lugjet gjithë për rreth,"],
        ['19.2', 'Mujo himself went in first, with his three hundred hunting dogs, the hounds, and the hunters, while the rest lay in ambush all around.', "Muji vetë mbrendë paska hi / Me treqind e ma zagarë, / Me langoj e me gjahtarë, / Shokët për rreth pritat kanë xanë."],
        ['19.3', 'Seventy-two hours of continuous hunting pass before the men finally close their hands around the living goats.', "I kanë bue tri dit e net, / Mas tri ditsh e mas tri netsh, / Gjallë me dorë i paskan xanë"],
        ['19.4', 'Back in Jutbina, Mujo shut them in a pen of his own, and gave every hunter there a gift.', "E n’Jutbinë me to ka ra, / N’burgje t’veta i ka ndrye, / T’gjithve Muji dhanti u ka dhanë."],
      ],
      cast: {
        mujo: ['jutbina', 'leads the hunt into the Green Valleys, then pens the captured goats at his own house and rewards every hunter'],
        gjahtaret: ['jutbina', 'ring the Green Valleys for three days and nights, bring the wild goats out alive, and are sent home with gifts'],
      },
      items: {
        dhite: ['jutbina', 'penned alive at Mujo\'s own house'],
      },
    },
    {
      id: 'zanasSearch', title: 'The power gone silent',
      note: 'Robbed of their power, the zanas search every valley and cliff for their goats and hear nothing answer — until the bride, as told, delivers Mujo’s message: the goats are hostage for her and the frozen company.',
      lines: [
        ['20.1', 'With their power gone, the zanas searched and searched but could not find their goats.', "Forca zanat i ka lanë. / Ndiellin dhitë e nuk i gjejnë,"],
        ['20.2', 'They cried out to the valleys and called to the rocky cliffs, but heard not one bleat answer them anywhere.', "Fort po i lypin lugjeve, / Fort po u thrrasin qetave, / Kurkund zanin s’po jau ndiejnë."],
        ['20.3', 'At last one of them guessed it: someone has stolen our goats from us!', "Ka qitë njana e paska thanë: / - Dhitë dikush ne na i ka xanë!"],
        ['20.4', 'Then the bride spoke up to the great zana: listen to me, mountain zana—', "- Pa ndigjo, moj zana e shkamit, / Po i thotë nusja zanës ma t’madhe, / Falëmeshndet Muji t’ka çue"],
        ['20.5', '—Mujo sends you this word: for the bride you took from me, for the wedding kinsmen you froze, search no further for your wild goats — Mujo is holding them hostage.', "Per qat nuse qi m’ke marrë, / Prata krushq qi m’keni ndalë, / Dhitë e egra mos me i kërkue, / Jau ka ndalë Muji për peng!"],
      ],
      cast: {
        zanat: ['lugjetVerdha', 'find their power gone, search every valley and cliff for their goats, and hear no answer'],
        bride: ['lugjetVerdha', 'tells the great zana Mujo\'s message: the goats are held hostage for the bride and the frozen company'],
      },
    },
    {
      id: 'confrontation', title: 'At Mujo\'s own door',
      note: 'The zanas hurry to Jutbina and confirm at Mujo\'s door that he holds the goats; the mountain zana offers to free the whole company, return the horses, and send the bride home if he\'ll give the goats back.',
      lines: [
        ['21.1', 'Hearing this, the zanas set out at once for Jutbina, straight to Mujo\'s own door.', "Kur kanë ndi zanat kto fjalë, / Kanë marrë rrugen për Jutbinë, / Fill n’derë t’Mujit paskan shkue."],
        ['21.2', 'They put the accusation to him without any preamble: was it Mujo who made off with their goats?', "- Pa a ti, Mujë, ne dhitë na i xune?"],
        ['21.3', 'I have indeed taken them myself, he answered, and I\'ve shut them fast in my own pen.', "- Po un vetë dhitë jau ko’ xanë, / Mbrenda burgut lidhë jau kam!"],
        ['21.4', 'Then the mountain zana spoke to him: we yield to you, Gjeto Basho Mujo.', "Ça i ka thanë Muj it zana e shkamit? / - Ndore teje, Gjeto Bashe Muji,"],
        ['21.5', 'Either kill us here on your own hearth, or give the goats back to us — without them we have no way to live.', "Do na preve n’votër tande, / Do kto gja ne na i ke lshue, / Se pa to s’kem’ ku me u mbytë!"],
        ['21.6', 'We will turn every wedding guest back as you had them, send the horses back into your hands, and bring your bride home to you by carriage.', "Po t’i bajmë krushqt si i ke pasë, / Po jua napim gjogat n’dorë, / Po ta bijmë nusen n’koçi!..."],
      ],
      cast: {
        zanat: ['jutbina', 'hurry to Mujo\'s own door, confirm he holds the goats, and offer to free everyone and return the horses and the bride if he\'ll give them back'],
      },
    },
    {
      id: 'mujoRefuses', title: 'I\'ve never caught the like',
      note: 'Mujo cuts them off: the wedding company means nothing to him and he could find another bride anywhere, but the goats — a creature he has never caught before — he will not surrender, no matter how bitterly they weep.',
      lines: [
        ['22.1', 'Mujo cut the words off in her mouth.', "Jau kputë Muji fjalën n’gojë:"],
        ['22.2', 'He shrugs off the wedding party entirely — their fate means nothing to him — and adds that the bride herself is no loss either, since a man in his position could win a fresh one wherever he liked.', "- Pr ata krushq, qi ju po thoni, / Kërku ngusht vedin s’e dij, / As jam ngusht për nji baxhi, / Se gjaj nuse për gji’ vend,"],
        ['22.3', 'But this thing I will not let go — such a creature I have never caught before!', "Por ket gja nu’ muj me e lshue, / Se kso gjaje kurr s’ko’ xanë!"],
        ['22.4', 'At that the zanas broke into mourning and wailing, until even the stones and trees took pity on them.', "Kanë nisë vajin e po vajtojnë, / Kanë nisë gjamën e po gjamojnë / Me ju dhimët gurit e drunit."],
        ['22.5', 'But Mujo would not soften at all.', "Aspak Muji s’po ngushtohet!"],
      ],
      cast: {
        mujo: ['jutbina', 'cuts them off: the wedding company and the bride mean nothing to him, but the goats — a creature he has never caught before — he will not give up'],
        zanat: ['jutbina', 'break into mourning so bitter even the stones and trees pity them'],
      },
    },
    {
      id: 'littleZanaOath', title: 'A besa sworn in tears',
      note: 'The little zana alone breaks from her sisters, wipes her tears in her own hair, takes Mujo by the hand, and swears him a besa of safe passage forever — in bride-winning, in war with a Baloz, in revelry on their own pastures.',
      lines: [
        ['23.1', 'Then the little zana broke away from her sisters, wiped her tears with the hair at her own brow, and took Mujo by the hand.', "A shkepë shoqesh zana e vogël, / Tuj i shi lott me flokë të ballit, / Dorën Mujit t’ja ka marrë,"],
        ['23.2', 'She swore him a solemn oath by God.', "Besn e zotit ja ka dhanë:"],
        ['23.3', 'Whenever you go to win a bride, whenever you go to strike down a Baloz, whenever you ride out with your war-band—', "- Gjithku t’kesh nuse me marrë, / Gjithku t’kesh baloz me pre, / Gjithsaherë t’ delsh me çetue,"],
        ['23.4', '—whenever you wish to revel in these meadows, to sing here, to loose an arrow at a mark, to refresh yourselves at our springs, or rest in our shade—', "Gjithsa t’doni n’at log me lodrue, / Gjithsa t’doni n’at log me këndue, / Gjithsa t’doni shejin me e gjue, / Ndalnju gurrave me u freskue, / Ndalnju mrizave me pushue,"],
        ['23.5', '—we pledge you our solemn word: never will we stand against you.', "Besn e zotit jem’ tuj t’dhanë, / Kurrkuj gja nuk kem’ me i thanë!"],
      ],
      cast: {
        zanaVogel: ['jutbina', 'breaks from her sisters, wipes her tears in her own hair, takes Mujo\'s hand, and swears him a besa: safe passage forever in bride-winning, in battle with a Baloz, in revelry on their own pastures'],
      },
    },
    {
      id: 'mujoRelents', title: 'Words are words, pledges pledges',
      note: 'Moved at last, Mujo answers at once — a besa is a besa — and orders his brother Halili, named here for the first time, to open the pen and free the goats.',
      lines: [
        ['24.1', 'That oath moved Mujo to the heart.', "Mujin fort e ka ngushtue."],
        ['24.2', 'He did not weigh it long before giving his answer.', "Asht mendue, fort s’â mendue, / Fjaln e mbrame e paska folë:"],
        ['24.3', 'Zanas you are and zanas you shall remain, he told them — a besa is a besa, and a word is a word: your wild goats are yours again.', "- Zana jini e zana kjoshi! / Besa besë, e fjala fjalë, / Dhitë e egra u kjoshin falë!"],
        ['24.4', 'Bring the goats out of the pen, Halili, Mujo told the young man.', "“Xirjau dhitë, Halil, prej burgut.” / Muji djalit i ka thanë."],
      ],
      cast: {
        mujo: ['jutbina', 'moved by the oath, answers at once — a besa is a besa — and orders Halili to free the goats'],
        halili: ['jutbina', 'called on by name for the first time: opens the pen at his brother\'s word'],
      },
      items: {
        dhite: ['jutbina', 'freed from the pen at Mujo\'s own word'],
      },
    },
    {
      id: 'restoration', title: 'Stone into flesh again',
      note: 'The instant the goats are free, the zanas\' faces change; in a blink they vanish back to the high pastures and, deep in the Green Valleys, restore every petrified guest and every horse turned to a stump.',
      lines: [
        ['25.1', 'The instant the goats came out of the pen, the zanas\' very faces changed.', "Dhitë prej burgut kur janë dalë, / Sa shpejt zanat ftyrë kanë ndrrue!"],
        ['25.2', 'In the blink of an eye they were gone, back up to the high pastures.', "I kanë pa e s’i kanë pa, / Janë ba hije e dalë në bjeshkë."],
        ['25.3', 'There in the Green Valleys they sought out every man turned to stone and every horse turned to a stump.', "Kur kanë dalë ndër Lugje t’verdha, / Njerzt prej gurit po i kërkojnë, / Kualt prej cungut po i kërkojnë,"],
        ['25.4', 'They turned the wedding kinsmen back to what they had been, and brought the horses back to life.', "I bajnë krushqit si janë kenë, / Jau kthejnë gjogat si i kin pasë,"],
        ['25.5', 'They set the bride in a carriage, and led the whole company home to Jutbina themselves.', "Jau vndojnë nusen m’nji koçi, / Vetë u prijnë e i çojnë n’Jutbinë."],
      ],
      cast: {
        zanat: ['lugjetVerdha', 'faces changed the instant the goats are freed, vanish back to the high pastures, and there restore every petrified guest and every horse turned to a stump'],
        zanaVogel: ['lugjetVerdha', 'restores the company with her sisters'],
        darsmoret: ['lugjetVerdha', 'turned back to flesh, mounted once more on living horses'],
        dizdari: ['lugjetVerdha', 'restored with his whole company'],
        bride: ['lugjetVerdha', 'set in a carriage by the zanas themselves'],
      },
    },
    {
      id: 'homecoming', title: 'Word is word, pledge is pledge',
      note: 'The company reaches the Plain of Jutbina to singing and dancing, while from cliff to cliff the zanas call out their besa fulfilled — and close, as the song always does, with their own boast: a zana keeps her word; a woman is only a woman.',
      lines: [
        ['26.1', 'When they reached the Plain of Jutbina, the maidens broke into song, the wedding kinsmen into dance, and the mountain peaks rang with it all around.', "Kur kanë mrrijtë në Fushë t’Jutbinës, / Kanë nisë vashat kangën-o, / Kanë nisë krushqit vallen-o, / Kanë kërsitun majet-o,"],
        ['26.2', 'From cliff to cliff the zanas called out: zanas we are, and zanas we shall stay — a word is a word and a besa a besa, and we have brought back your bride and your Agas.', "Kah kndojnë zanat shkam e m’shkam: / - Zana jemi, zana kjoshim! / Besa besë e fjala fjalë, / Agë e nuse t’kjoshin falë!"],
        ['26.3', 'The great zana sang from one cliff, the little zana from another, and hand in hand they called out once more: zanas we are, and zanas we shall stay — a word is a word and a besa a besa.', "Zana e madhe kndon në mal, / Zana e vogël kndon në shkam / Dorë për dorë me zann e dytë: / - Zana jemi e zana kjoshim! / Besa besë e fjala fjalë,"],
        ['26.4', 'Their song draws the old line once more: an ordinary woman stays an ordinary woman and a zana stays a zana, one shining like the sun and the other only reflecting like the moon — pity the man who stakes his trust on a woman\'s word instead.', "Grueja grue e zana zanë, / Zana diell e grueja hanë, / Mjerë kush besë grues i ka xanë!"],
      ],
      cast: {
        darsmoret: ['jutbina', 'reach the Plain of Jutbina; the maidens sing and the company dances, the peaks ringing with it'],
        bride: ['jutbina', 'brought home at last, the wedding complete'],
        dizdari: ['jutbina', 'home again with his whole company'],
        mujo: ['jutbina', 'welcomes his bride and his wedding company home'],
        zanat: ['lugjetVerdha', 'call their besa out from cliff to cliff, sworn to Mujo forever after'],
        zanaVogel: ['lugjetVerdha', 'sings the closing pledge hand in hand with the great zana'],
      },
    },
  ],
}
