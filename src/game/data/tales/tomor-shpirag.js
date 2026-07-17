// ===========================================================================
// TALE: Baba Tomor and Shpirag — the giants who fought over the Beauty — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// The game ALREADY stages this legend's ending directly: shpirag1 narrates
// the whole fight in miniature, and shpiragFund is the secret ending "The
// Tears of the Earth" (see src/game/content.js). Baba Tomor also ALREADY
// lives on as a helper god across tomor1/tomor2/tomor3/majaEagle/tomorBekim,
// arming wandering heroes against the Kulshedra — this tale's beats are the
// deep-myth ORIGIN of that eternal mountain-figure, not a replacement for him.
// ===========================================================================

export default {
  id: 'tomor-shpirag',
  title: 'Baba Tomor and Shpirag — the giants who fought over the Beauty',
  source:
    'Maximilian Lambertz, "Die Mythologie der Albaner", in Wörterbuch der Mythologie (Stuttgart 1973), pp. 504-505 · read in R. Elsie\'s translation (legend_01.html, albanianliterature.net); all lines paraphrased',
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: {
    region: 'South-Central Albania (Berat / Mount Tomorr) — a place-origin legend of the Tomorr massif',
    collector: 'Maximilian Lambertz, synthesizing the peasantry\'s oral belief around Mount Tomorr for a scholarly mythology dictionary',
    published: 'Stuttgart, 1973 (Wörterbuch der Mythologie); Elsie\'s English translation posted at albanianliterature.net',
  },
  // NO ALBANIAN ORIGINAL FOUND for this specific telling — see `why` below.
  albanian: {
    status: 'missing',
    why:
      'Searched exhaustively for an Albanian original of THIS telling (Baba Tomor & Shpirag fighting over E Bukura e Dheut, as synthesized by Lambertz for Wörterbuch der Mythologie 1973 and translated by Elsie) and found none. Local corpora: pralla-popullore-shqiptare-1954 (grep tomor/tomorr/shpirag — 0 hits), Dozon\'s Manuel, Jarník, Meyer\'s Kurzgefasste Grammatik — nothing. Von Hahn\'s Albanesische Studien only uses "Tomoros/Tomorus" as a geographic/etymological landmark, never narrating this legend. Fishta\'s Lahuta e Malcís mentions "mal t\' Tomorrit" twice (as a Kreshnik-epic simile, not this story). The one local hit that matters is docs/references/lambertz-albanische-marchen.de-sq.txt — Fishta & Lambertz, Albanische Märchen (Wien 1958), the SAME work English Wikipedia\'s "Baba Tomor" article cites: its pp. 42-43 footnote (raw OCR + full provenance saved to docs/references/lambertz-baba-tomor-shpirag.de.txt) prints, IN GERMAN ONLY, an oral account Lambertz heard in Berat, noting it was separately versified in ALBANIAN by the Elbasan poet Lip Papajanni — but that verse is never quoted there and has not been located anywhere else (checked archive.org full-text, Google Books, HathiTrust; Çajupi\'s famous "Baba Tomori" 1902 is a different, later patriotic dialogue-poem, not this narrative). Web search (2026-07-15) surfaces only a DIFFERENT modern oral variant (standard.al 2015; rrugapress.al; forum-al.com), where Tomorr and Shpirag are BROTHERS rivalling over a Zana named Kala, with no eagles/wind/mule/scythe/cudgel and God turning all three to stone for the fratricide — a distinct local legend for the same landscape, not a variant of Elsie/Lambertz\'s telling, so per the schema\'s rule it is declared missing rather than mined for lines. Nothing found may feed the Q() quote system; back-translating Elsie\'s or Lambertz\'s prose is forbidden.',
    local: 'docs/references/lambertz-baba-tomor-shpirag.de.txt',
  },
  // open calls the beats had to decide — quoted variants, and how the beats
  // reconcile this legend's mythic "deaths" with figures who are ALREADY
  // alive elsewhere in this game's standing world
  discrepancies: [
    'A DIFFERENT LAMBERTZ TELLING, NO MUTUAL DEATH (docs/references/lambertz-baba-tomor-shpirag.de.txt): the earlier 1958 Lambertz footnote (a variant heard in Berat) has Shpirag FLEE and Tomor alone survive as victor — no mutual death, no drowning, no Osum river — and adds a great walnut tree that helps Tomor by pelting Shpirag with nuts (stone nut-prints shown at Sinja beside the mule\'s hoofprint). Elsie\'s 1973 telling (this tale\'s actual source, a later and fuller Lambertz text) has both giants slay each other and the Beauty drown in her tears to make the Osum — the beats follow Elsie; the walnut tree is not used anywhere here.',
    'A DIFFERENT MODERN VARIANT, BROTHERS NOT RIVALS (web search 2026-07-15: standard.al, rrugapress.al, forum-al.com): Tomorr and Shpirag as brothers dueling over one Zana ("Kala"), all three turned to stone by God as punishment. This is a separate local legend for the same two mountains, not a variant of the Lambertz/Elsie telling this tale follows, and none of its details (brothers, punishment, the name Kala) are used here.',
    'BABA TOMOR\'S "DEATH" (¶2.13) vs. the main quest: read plainly, Elsie\'s English ends Baba Tomor\'s story for good ("the two giants ultimately slew one another"), yet the game\'s own tomor1/tomor2/tomor3/majaEagle/tomorBekim already show him alive, arming wandering heroes on these very slopes. The beats follow Elsie literally — he dies of Shpirag\'s cudgel — but read that death AS his becoming the mountain forever, the same resolution the game already gives Shpirag ("the petrified rival of a finished war", per the goose-girl tale\'s own note): the peak itself is what remains, and it is the peak that still speaks, still arms, still receives the region\'s oldest oath.',
    'THE BEAUTY\'S DROWNING (¶2.13) vs. her registry seriality: taken as a permanent death this would break E Bukura e Dheut\'s established nature (her core registry entry: "the lore itself hands her to hero after hero... no tale may claim her permanently gone"). The beats keep Elsie\'s image — she weeps herself to death in THIS telling — as this era\'s ending only, exactly as Kordha\'s winning of her is its own separate era (see three-friends\' own palace mold); nothing here shows her return, but nothing here forecloses it either.',
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md).
  // You become "a giant" at the summit; your first move names which one you are,
  // and both giants always fall (the legend is fixed) — only which mountain
  // remains is yours. The canonical spine here is Baba Tomor (the good ending).
  play: {
    entry: 'tomorr',
    stance: 'embodied',
    as: 'babaTomor',
    role:
      'You are one of two giants facing each other over Berat. Your first move — take the Earthly Beauty to wife and guard the city, or reach for the city you both covet — decides which of them you are, and which mountain you leave behind. Either way both giants fall and the Beauty weeps herself into the Osum; the legend is fixed, only who you become is yours.',
    enter:
      'two mountains stand facing each other over the city, and you are one of the giants — your very first move will name you Tomor who guards it or Shpirag who covets it',
    from: 'tsHyrje',
    ending: 'tsFundTomor',
    scenes: {
      tsHyrje: 'tomorr',
      tsNuse: 'bride',
      tsRoje: 'watch',
      tsZgjim: 'chance',
      tsShpeto: 'safety',
      tsBeteje: 'battle',
      tsFundTomor: 'end',
    },
    divergences: [
      { beat: 'tomorr', note: 'You embody "a giant" and your first choice assigns which one — the folktale fixes each (Baba Tomor already has the Beauty to wife and guards Berat; Shpirag covets the city). The game lets you take either role but never changes the outcome — both fall, the Beauty weeps the Osum — only which mountain remains is yours.' },
      { beat: 'bride', note: "The day/night cycle is made the engine: the tale's line that the Beauty stays with her sea-sister by day and is carried up the mountain by the wind each evening becomes the felt clock (mountain by night, sea by day), and the rival's raid lands at dawn — the hour the four eagles wake the old man." },
      { beat: 'end', note: "Baba Tomor's death is read as his becoming the holy mountain forever — the same peak that still arms wandering heroes and receives the region's oldest oath elsewhere in the game — rather than a plain end; the tale's own note reconciles the mythic death with his standing helper-presence." },
      { beat: 'end', note: "The Beauty's drowning is kept as this era's ending only, not a permanent death — E Bukura e Dheut is handed hero to hero across the game (three-friends wins her; the Sun-quest and the underworld hold her too), so nothing here forecloses her return." },
      { note: 'The mule and its stone hoofprint at Sinja (an offstage detail in the source) are kept in the tale record but not staged as a node — no scene is built for one remembered hoofprint.' },
    ],
  },
  // sentence counts of the original's 2 paragraphs (Elsie's translation: the
  // scholarly framing paragraph, then the narrative "essence of the legend")
  paragraphs: [8, 13],
  cast: [
    { id: 'babaTomor', name: 'Baba Tomor', note: 'the old sky-father of the mountain, E Bukura e Dheut\'s husband by night', npc: 'babaTomor' },
    { id: 'beauty', name: 'E Bukura e Dheut', note: 'the Earthly Beauty, kept as Tomor\'s night-time bride', npc: 'bukuraDheut' },
    { id: 'seaSister', name: 'E Bukura e Detit', note: 'her sister, keeper of the deep, where the Beauty spends her days', npc: 'bukuraDetit' },
    { id: 'shpirag', name: 'Shpirag', note: 'the rival giant of the mountain across the valley', npc: 'shpiragu' },
    { id: 'shqiponjat', name: 'katër shqiponjat', note: 'the four she-eagles who keep Tomor\'s snow-line and sound the alarm', npc: 'shqiponjatTomorit' },
    { id: 'era', name: 'era e lindjes', note: 'the East Wind, Tomor\'s faithful servant, who ferries the Beauty', npc: 'eraLindjes' },
  ],
  // anchor = the game location this tale place inhabits. REUSE over invention,
  // under THE SHARING RULE. status: existing / proposed / offstage — see
  // ../tales/_SCHEMA.md. mirror = the real-world place behind it (SOUTHERN).
  places: [
    { id: 'tomorHome', emoji: '⛰️', name: "Baba Tomor's mountain", note: "the old god's own slopes, where the four eagles keep watch",
      anchor: { status: 'existing', node: 'tomor1', mirror: "Mount Tomorr's peak above Berat, the region's holiest mountain",
        mold: 'the sky-father\'s own ground: he already arms wandering heroes here with a blessed sword against the Kulshedra and tests them with the black and white ram (tomor1-tomor3, majaEagle, tomorBekim) — this legend is the deep-myth FIRST waking that made him the mountain forever; nothing here contradicts his living presence in the main quest, since his "death" IS his becoming the peak',
        sharedWith: ['the main quest\'s Tomorr arc'] } },
    { id: 'shpiragMountain', emoji: '🗻', name: 'Mount Shpirag', note: 'the rival mountain across the valley — the duel, and the wounds it left',
      anchor: { status: 'existing', node: 'shpirag1', mirror: 'Mount Shpirag, the furrowed ridge west of Berat',
        mold: 'the ridge where the old war is still read in the rock and the Osum begins below — already the game\'s own scene and its "shpiragFund" secret ending; the same spot three-friends proposes to build Berat\'s walls upon, since Berat truly sits in the gorge between these two mountains — a lookout and a city at its foot do not clash',
        sharedWith: ['three-friends'] } },
    { id: 'beratCity', emoji: '🏰', name: 'Berat, the jealously-guarded city', note: "the city Tomor watches over from his mountain, and that Shpirag tries to seize",
      anchor: { status: 'proposed', node: 'shpirag1', mirror: 'Kalaja e Beratit, the city of a thousand windows, in the Osum gorge',
        mold: "the walled city three-friends already proposes to build at this same node's foot; Tomor's jealous watch over Berat and Ylli's moat-wager city can be the very same walls, seen from two different eras of the same place",
        conflicts: 'not a separate spot from shpiragMountain — Berat sits AT its foot, so the two share one node by design, not by coincidence',
        proposal: "draw the walled city below the ridge, per three-friends' own proposal (Kalaja e Beratit at Tomorr's foot)" } },
    { id: 'seaHome', emoji: '🌊', name: "E Bukura e Detit's deep court", note: 'where the Earthly Beauty spends her days',
      anchor: { status: 'existing', node: 'detiThelle1', mirror: 'the Adriatic deep',
        mold: "the sisters' own court in the deep; by day the Earthly Beauty visits here, and the same vast water keeps whatever else sinks into it without clashing (three-friends' sabre lay on this same floor)",
        sharedWith: ['three-friends', 'bukura-e-detit'] } },
    { id: 'river', emoji: '💧', name: 'the river Osum', note: "born of the Beauty's tears, running from the mountains to the sea",
      anchor: { status: 'existing', node: 'lumi', mirror: 'the river Osum, which really does run past Berat down from the Tomorr massif to the sea',
        mold: "the game's own river hub already runs \"from Tomorr down to the sea\" by its own design comment — here it carries a goddess's tears; any tale may add to what this river carries without conflict" } },
    { id: 'sinja', emoji: '🐴', name: 'the village of Sinja', note: "where the mule's hoofprint is still shown in the rock",
      anchor: { status: 'offstage', mirror: 'the real village of Sinja near Berat, where a stone hoofprint is still pointed out to visitors',
        mold: 'a detail the legend keeps but the map never stages — no scene is needed for one remembered hoofprint' } },
  ],
  items: [
    { id: 'kosa', emoji: '🌾', name: "Tomor's scythe", note: "the blade that gouged the long furrows still read down Shpirag's flank" },
    { id: 'shkopi', emoji: '🪵', name: "Shpirag's cudgel", note: "the club that cratered Tomor's own slopes before he fell" },
    { id: 'mula', emoji: '🐴', name: "Tomor's mule", note: 'carried him to the battle; her hoofprint is the stone still shown near Sinja' },
  ],
  beats: [
    {
      id: 'tomorr', title: 'The old man of the mountain',
      note: 'The mountain itself, given a face: an old god with a white beard and four eagles, sworn by across the region and climbed by both faiths every August. A scholar\'s note, then the story proper begins.',
      lines: [
        ['1.1', "Baba Tomor — \"Father Tomor\" — is simply Mount Tomorr itself given a face: a central-Albanian range whose highest point tops out at 2,416 metres."],
        ['1.2', 'Popular belief in central Albania holds that the gods themselves live on that mountain.'],
        ['1.3', 'Local farmers swear by his name — «për Baba Tomor» — and reckon that oath weightier than one taken on either the Bible or the Qur\'an.'],
        ['1.4', "Both faiths keep the mountain holy: Christians once climbed it every 15 August for the Virgin's Assumption, and Bektashi pilgrims still climb it each 20-25 August in honour of Abbas Ali."],
        ['1.5', 'People picture him as a very old man, his white beard hanging all the way down to his belt.'],
        ['1.6', 'Four long-beaked she-eagles circle him always, settling now and then on his snow-covered shoulders.'],
        ['1.7', 'The scholar Maximilian Lambertz took him for a surviving fragment of some forgotten Illyrian god.'],
        ['1.8', 'What follows is the heart of the old story:'],
      ],
      cast: {
        babaTomor: ['tomorHome', 'the old man of the peak, snow-bearded, sworn by across the whole region'],
        shqiponjat: ['tomorHome', 'circle him always and perch along his snowy shoulders'],
        era: ['tomorHome', 'waits on him as his faithful servant, not yet sent anywhere'],
        beauty: ['seaHome', "keeps to her sister's house by day, as always — not yet named"],
        seaSister: ['seaHome', 'keeps her own court in the deep'],
        shpirag: ['shpiragMountain', 'holds the facing mountain, its slopes already grooved like streambeds — not yet named'],
      },
      items: {
        kosa: ['tomorHome', 'kept beside the old man, unused'],
        shkopi: ['shpiragMountain', "Shpirag's own club, unused"],
        mula: ['tomorHome', 'grazes near her master'],
      },
    },
    {
      id: 'bride', title: 'A bride kept above',
      note: 'The Earthly Beauty is named at last: Tomor\'s wife, ferried between her sister\'s deep court and his mountainside by his servant the wind.',
      lines: [
        ['2.1', 'Baba Tomor had made the Earthly Beauty his wife.'],
        ['2.2', "By day she stayed with her sister, the Beauty of the Sea, but every evening Tomor's own servant, the wind, lifted her back up the mountain to his side."],
      ],
      cast: {
        beauty: ['tomorHome', "named now: Tomor's wife, carried up to his side every evening"],
        era: ['tomorHome', 'ferries her up the slope each evening and down again each morning'],
      },
    },
    {
      id: 'watch', title: 'The jealous watch over Berat',
      note: 'From his heights Tomor keeps a jealous eye on Berat below. Across the valley, Shpirag\'s already-furrowed mountain faces him — and covets the same city.',
      lines: [
        ['2.3', 'From his heights Tomor looks down over Berat, the town he loves best and guards jealously.'],
        ['2.4', 'Facing him across the valley stands Mount Shpirag, its sides already scored with furrow-like streambeds.'],
      ],
      cast: {
        babaTomor: ['tomorHome', 'looks down jealously over Berat, the city he loves best'],
        shpirag: ['shpiragMountain', 'faces him across the valley, waiting for his own chance at that same city'],
      },
    },
    {
      id: 'chance', title: "Shpirag's chance",
      note: 'While Tomor lingers with his bride, Shpirag slips down toward Berat — but the four eagles will not let the theft go unanswered.',
      lines: [
        ['2.5', 'One day, while Tomor lingered in bed with the Earthly Beauty, Shpirag seized the chance and moved to take Berat for himself.'],
        ['2.6', 'His four guardian eagles wasted no time rousing him out of sleep.'],
        ['2.7', "The moment he heard of Shpirag's sly scheme, Tomor was up and out of bed."],
      ],
      cast: {
        shpirag: ['beratCity', 'slips down while the old man is distracted and moves to seize the city'],
        shqiponjat: ['tomorHome', 'sound the alarm and shake the old man out of his dreams'],
        babaTomor: ['tomorHome', "wakes and rises at once, told of Shpirag's scheme"],
      },
    },
    {
      id: 'safety', title: 'The Beauty sent to safety',
      note: "Before arming himself, Tomor's first thought is for the Beauty: the East Wind carries her home to her sister, out of danger.",
      lines: [
        ['2.8', "His very first thought was for the Earthly Beauty's safety, so he sent the East Wind at once to bear her home to her sister."],
      ],
      cast: {
        era: ['seaHome', "carries the Beauty home to her sister at the old man's first word"],
        beauty: ['seaHome', 'sent back to safety before the fighting starts'],
      },
    },
    {
      id: 'battle', title: 'To war on muleback',
      note: "Tomor rides out on his mule and lays into Shpirag with his scythe — wounds still read today as the furrows down Shpirag's flank, and a hoofprint still shown near Sinja.",
      lines: [
        ['2.9', 'Only then did he mount his mule and ride out to meet Shpirag in battle.'],
        ['2.10', "Tomor's scythe tore into Shpirag again and again — wounds still visible today as the long furrows down his slope."],
        ['2.11', "Near the village of Sinja, people say, you can still make out the print of his mule's hoof in the stone."],
      ],
      cast: {
        babaTomor: ['shpiragMountain', 'rides out on his mule to meet Shpirag in the field'],
        shpirag: ['shpiragMountain', 'comes back from Berat to meet him, cudgel in hand'],
      },
      items: {
        kosa: ['babaTomor', "swung again and again — the wounds it leaves are the furrows still read on Shpirag's flank"],
        mula: ['shpiragMountain', "carries him into the fight; her hoofprint stays stone-set near the village of Sinja"],
      },
    },
    {
      id: 'end', title: 'Both are lost',
      note: "Shpirag's cudgel craters Tomor's own heights before he himself is beaten. Both giants die of the wounds they gave each other, and the Beauty weeps herself into the river that still runs below.",
      lines: [
        ['2.12', "Shpirag fought back hard, battering Tomor's own heights with his cudgel — but in the end he was the one beaten."],
        ['2.13', 'Both giants died of what the other had done to him, and the maiden wept herself into the river Osum.'],
      ],
      cast: {
        shpirag: ['shpiragMountain', '☠ beaten at last by the scythe, after landing blows of his own'],
        babaTomor: ['shpiragMountain', '☠ struck down in turn by the cudgel — the wounded mountain is what remains of him'],
        beauty: ['seaHome', 'weeps without end at the news; her tears alone become the river Osum'],
      },
      items: {
        mula: ['sinja', 'her print alone stays behind in the stone near this village, long after the ride that made it'],
      },
    },
  ],
}
