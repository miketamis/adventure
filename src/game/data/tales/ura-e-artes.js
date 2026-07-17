// ===========================================================================
// TALE: Ura e Artës — the Bridge of Arta (the walled-up wife) — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// The game stages this legend as a full embodied arc (src/game/content.js):
// uraTjeter1 (the worksite as a passing traveller sees it — built by day,
// downed by night) → uraVellezerit (talking to Pano and Mihal, who tell the
// engine of the tale and that their youngest brother is not here; declaring
// «unë jam Kiço, vëllai juaj» is the become-threshold) → uraArtes1 (the
// gathering — you are Kiço) → uraArtes2 (the old wayfarer's
// price and the besa of silence) → uraNata (the night at home; your brothers
// whisper to their wives; the hinge) → uraMengjes (the mother sends the three
// brides in turn) → uraGropa (the ring-lie at the pit; the last-chance mercy)
// → uraMurim (the walling and the verbatim curse) → uraArtesMur (the jamanet:
// breast, spring, fig — the bridge stands and trembles), with uraArtesShpëtim
// as the mercy ending from either hinge. These beats are the canon under it.
//
// No Elsie page exists for this legend (it is not in his Legends index) — the
// FOLKLORE card instead cites Wikipedia (Kadare's novel, thin on the folk
// tale itself) and an ArchiWik essay (a scholarly synopsis of the WIDER
// walled-bride ballad family, centred on the Serbian "Building of Skadar" /
// Rozafa version, with only two sentences on "the Bridge of Arta" variant
// specifically). Neither is a full telling of THIS legend, so the numbered
// English translation below is my own paraphrase built directly from the
// Albanian ballad itself — read in the original, not from any English source.
// ===========================================================================

export default {
  id: 'ura-e-artes',
  title: 'Ura e Artës — the Bridge of Arta',
  source:
    'Çam ballad «Urën e Artës ndërtojmë» (Rokë-Llur, Filipjadhë; collected Fier, 1954; printed in Këngë popullore nga Çamëria, Instituti i Kulturës Popullore, Tiranë 1983, p. 401), reproduced by Timo Mërkuri, "Balada e murimit" (fatmirt.blogspot.com, 4 Sept 2019) · read in the Albanian original directly — no English translation of this ballad exists; all lines are my own paraphrase',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // Çamëria/Epirus, now in Greece: the Balkan south, sister-region to (but
  // distinct from) the Tosk south of Albania proper; NOT the north (Rozafa's
  // Shkodra).
  origin: {
    region: 'Çamëria / Epirus (southern Albanian-speaking lands, now in Greece) — the town of Arta on the Arachthos river, near the brothers\' home village of Lluri (Filiates district)',
    collector: 'sung ballad collected from Rokë (Llur, Filipjadhë) at Fier, 1954; a second Çam variant collected from Mazrek (Margëlliç) at Vlorë, 1954 — both printed together',
    published: 'Këngë popullore nga Çamëria, Instituti i Kulturës Popullore, Tiranë 1983, p. 401 (also on sq.wikipedia, "Ura e Nartës")',
  },
  // the ALBANIAN ORIGINAL — the ballad's own verses, verbatim (Çam dialect,
  // already in standard-alphabet spelling; only the blog's every-5-line
  // editorial verse-count markers are stripped — see the local file's header)
  albanian: {
    title: '«Urën e Artës ndërtojmë»',
    source:
      'Çam variant, collected Rokë-Llur (Filipjadhë), Fier 1954; printed in Këngë popullore nga Çamëria, Instituti i Kulturës Popullore, Tiranë 1983, p. 401 (also on sq.wikipedia "Ura e Nartës"); text as reproduced by Timo Mërkuri, "Balada e murimit" (fatmirt.blogspot.com, 4 Sept 2019) — the editor\'s own footnote calls this the variant "closer to standard Albanian," and it is the fuller of the two Çam texts printed there',
    local: 'docs/references/cam-balada-murimit-ura-e-artes.sq.txt',
  },
  discrepancies: [
    'THE MESSENGER\'S FORM (¶2.1): the Çam ballad quoted here — like its sister Mazrek variant — sends «një plak» (an old man) to name the bridge\'s price. Timo Mërkuri\'s own prose introduction to both variants instead follows the better-known GREEK original, where a talking bird delivers the same warning. Both forms are well attested across the wider walled-bride tradition (ArchiWik: "some kind of supernatural element such as a fairy, or angel... in others, the mason dreams it"), so this is a difference of messenger-SHAPE, not a contradiction. The staged scenes follow the ballad\'s own old wayfarer (uraArtes2: «një plak vjen rrugës» — gone the moment his word is spoken); the Greek tradition\'s bird survives as a wordless omen, startling off the bridge as the bride arrives (uraGropa).',
    'THE CURSE-THEN-BLESSING (¶7.11-13): Mërkuri\'s prose synopsis states the bride "first pleads, then begins to curse the bridge and the travellers who would walk over it, but afterward changes the curse" into a blessing — the two-step shape behind the FOLKLORE card\'s own "curses then blesses." The ballad text itself never splits it that way: her one line — «të dridhesh si dridhem unë» — moves straight from grief to a single sympathetic tremor, with no separate destructive curse first. These beats follow the ballad\'s own single utterance, which the game\'s staged uraArtesMur ending already renders the same way ("trembles yet").',
    'BIRTH ORDER (¶1.1): the primary variant quoted here ("Urën e Artës ndërtojmë," Rokë-Llur/Fier 1954) introduces the three brothers simply as "Panua, Mihal Guri, Kiçua i vogël," without stating who is eldest beyond marking Kiço the youngest. The second Çam variant printed alongside it ("Ura e Artës kur ishte bënë," Mazrek/Vlorë 1954) is explicit — "Mihë Guri të madhit" (to the eldest, Mihal Guri), "të mesmit Pani" (to the middle, Pano), "i vogli Kiçi" (the little one, Kiço) — and the two variants otherwise agree in full, so these beats take that ordering as settled.',
    'WHAT THE STAGED ARC STILL COMPRESSES (place: bridge): the rebuilt arc (uraArtes1 → uraArtes2 → uraNata → uraMengjes → uraGropa → uraMurim → endings) now stages the three named brothers, the besa kept and broken, the mother\'s testing of the three brides with both excuses, the ring-lie, the walling, the verbatim curse and the jamanet. What remains compressed: the forty apprentices are one scene line, the black bull and black ram are named in the old man\'s price but never staged as animals, and the mother-in-law is rendered simply as «nëna» (the game\'s existing word) rather than a named vjehrra.',
  ],
  // sentence counts of the 8 paragraphs of my own English paraphrase, built
  // directly from the 91-line ballad (docs/references/cam-balada-murimit-...)
  paragraphs: [4, 8, 7, 2, 12, 10, 13, 12],
  cast: [
    { id: 'mihalGuri', name: 'Mihal Guri', note: 'eldest of the three brother-masons; breaks the besa to warn his own wife', npc: 'mihalGuri' },
    { id: 'pano', name: 'Pano', note: 'middle brother-mason; breaks the besa to warn his own wife', npc: 'pano' },
    { id: 'kico', name: 'Kiço', note: 'youngest brother-mason; keeps the besa, and so dooms his own unwarned wife', npc: 'kico' },
    { id: 'bride', name: 'the youngest bride', note: 'Kiço\'s wife, walled alive into the pier; curses then blesses the bridge', npc: 'nusaVogel' },
    { id: 'motherInLaw', name: 'the mother-in-law', note: 'sends the three brides out in turn with the masters\' midday bread', npc: 'vjehrra' },
    { id: 'eldestBride', name: 'the eldest bride', note: 'Mihal Guri\'s wife; excuses herself with a feverish child', npc: 'nusaMadhe' },
    { id: 'middleBride', name: 'the middle bride', note: 'Pano\'s wife; excuses herself with her hands in the dough', npc: 'nusaMesme' },
    { id: 'oldMan', name: 'the old wayfarer', note: 'names the bridge\'s price, then is never seen again', npc: 'plakuUdhes' },
    { id: 'apprentices', name: 'the forty apprentices', note: 'the workforce under the three brothers', npc: 'pentoretArtes' },
    { id: 'infant', name: 'the little boy', note: 'Kiço and the bride\'s infant son; later raised on the spring\'s water', npc: 'djaliKicos' },
  ],
  // anchor = the game location this tale place inhabits. THE SHARING RULE:
  // two stories may occupy one spot only if both can be talking about the
  // same place/figures. This tale is SOUTHERN (Çamëria/Epirus) — mirrors must
  // not borrow the north's Rozafa material.
  places: [
    { id: 'bridge', emoji: '🌉', name: 'the bridge of Arta', note: 'the worksite where the bridge rises by day, falls by night, then finally stands for good',
      anchor: { status: 'existing', node: 'uraArtes1',
        mirror: 'Ura e Artës (Greek: Γεφύρι της Άρτας) — the stone bridge over the Arachthos river a kilometre west of Arta, in Çamëria/Epirus; the standing bridge dates to Ottoman-era (re)building, 1602–1613',
        mold: 'a bridge that falls every night until a life is walled into its pier: the masters swear a besa of silence, the wife who brings the midday bread is trapped and immured, and cries out against the bridge before her final blessing. The staged scene here (uraArtes1 → uraArtes2 → uraArtesShpëtim/uraArtesMur) already tells this compressed to one generic "mjeshtër" and one "nusja," and already follows the Greek/essay tradition\'s talking bird rather than the Çam ballad\'s old wayfarer for the omen — a difference of messenger-form only (both readings are attested across the tradition), not a contradiction; these beats keep the fuller three-brother telling and its old wayfarer as canon underneath it.',
        conflicts: 'NOT kalaRozafa — the same walled-bride ballad-family, but a DIFFERENT structure (a bridge, not a castle), a DIFFERENT family of three brothers, and a DIFFERENT region (Çamëria/Epirus in the south, not Shkodra in the north); the two immured brides must never be treated as one and the same.' } },
    { id: 'household', emoji: '🏠', name: 'the brothers\' household', note: 'where the three brides live under one roof with the mother-in-law and the little boy',
      anchor: { status: 'existing', node: 'uraNata',
        mirror: 'a household among old Tirana\'s mëhalla, standing in for the brothers\' home in Lluri, near Filiates in Çamëria',
        mold: 'one household among the mëhalla\'s many homes (Nastradin\'s own house already stands here on the same terms) — three wives, a mother-in-law, and an infant, claiming nothing any other proposed hearth here claims. STAGED: uraNata (the night of the besa, the brothers whispering to their wives) and uraMengjes (the mother sending the three brides out in turn), one hearth up the lane from fshatiJeta',
        conflicts: 'NOT the three-friends widow\'s cottage (one room, one son, everything long sold) and NOT the snake-bridegroom crone\'s hut (a snake and a cat) — different doors onto the same many-household quarter' } },
    { id: 'road', emoji: '🛤️', name: 'the open road', note: 'where the old wayfarer passes, once, on his way to the bridge',
      anchor: { status: 'existing', node: 'start',
        mirror: 'the road out of old Tirana at the tanners\' bridge — the game\'s own travel spine, standing in for the road to Arta',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['the whole travel spine (three-friends\' own "road" place anchors here too, on the same terms)'] } },
    { id: 'arta', emoji: '🏛️', name: 'the town of Arta', note: 'the real town on the Arachthos river — never staged directly',
      anchor: { status: 'offstage',
        mirror: 'Arta, Epirus (Greece) — the historical town the bridge serves, on the old road the Ottoman sultans widened for their armies',
        mold: 'never staged — the game\'s bridge scene stands in for the whole town; if ever drawn, the real bridge still stands with four great arches and three lesser ones, and Ali Pasha\'s plane tree is still said to lean over its eastern bank, where locals are said to lower their eyes and their voices when they cross, out of respect for the sacrifice that let it stand' } },
  ],
  items: [
    { id: 'unaza', emoji: '💍', name: 'the ring', note: 'Kiço\'s lie — a ring he claims has fallen into the pit, the pretext that lures his wife down to her death' },
    { id: 'fiku', emoji: '🌳', name: 'the white fig tree', note: 'grown from her dying wish, over the pier; its first fruit is saved for her son' },
    { id: 'kroiArgjendte', emoji: '💧', name: 'the silver spring', note: 'flows from the wall where her breast was left free; raises her son and heals the sick ever after' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). ROZAFA'S
  // TWIN, deliberately its MERCY counterpoint: you become Kiço the youngest brother;
  // the besa choice is warn your wife (mercy — the bridge stays unbuilt, the GOOD
  // ending here) or keep silent (your own wife walled, the bridge of Arta stands).
  // At Rozafa the same silence is the honourable good ending — the game stages both
  // readings of the walling legend. Day/night = the build-by-day / fall-by-night engine.
  play: {
    entry: 'gathering',
    stance: 'embodied',
    as: 'kico',
    role:
      'You are Kiço, the youngest of three brothers raising the bridge of Arta — and it will not stand until a living soul is walled into its foundation. The old man\'s besa binds you all to say nothing and let the wall take whichever wife brings tomorrow\'s bread first — and it will be yours. Warn her and spare her though the bridge never stands, or keep your word and give her to the stone.',
    enter:
      'you and your brothers are raising the bridge of Arta and it will not stand; an old man is about to name the price — a wife walled alive — and it is your own wife the wall means to take',
    from: 'uraArtes1',
    ending: 'uraArtesMur',
    scenes: {
      uraTjeter1: 'gathering',
      uraVellezerit: 'gathering',
      uraArtes1: 'gathering',
      uraArtes2: 'prophecy',
      uraNata: 'besa',
      uraMengjes: 'errand',
      uraGropa: 'ringTrick',
      uraMurim: 'walling',
      uraArtesMur: 'blessing',
    },
    divergences: [
      { beat: 'gathering', note: "The ballad has all three brothers building from its first line. The game's staging empties the youngest's place until the player claims it: visited un-embodied (uraTjeter1/uraVellezerit), the yard shows only Pano and Mihal, who say their little brother Kiço is not here — and answering their 'who are you?' with «unë jam Kiço, vëllai juaj» is the become-threshold that steps you into the mold. Once embodied, the tale proceeds with its three brothers as sung." },
      { beat: 'besa', note: "You embody Kiço, and the besa choice assigns the tale's moral to YOUR hand — but with the opposite valence to Rozafa: here warning your wife (mercy) is the GOOD ending and keeping the besa (your own wife walled) is the BAD one, where at Rozafa keeping the same silence is the honourable good ending. The game deliberately stages both readings of the same Balkan walling legend. Two mercy exits reach the good ending: break the silence in the night as your brothers did, or cry out at the pit's very edge." },
      { beat: 'ringTrick', note: "Fully staged: the mother sends the three brides in turn (the elder begging off with a sick child, the middle with her bread-making), your own promise to settle the boy frees your wife to go, and the ring-lie at the pit is the player's own spoken option. A bird startling off the bridge as she arrives nods to the Greek tradition's talking-bird omen without contradicting the Çam ballad's old wayfarer." },
      { beat: 'blessing', note: "The bride's curse is slotted verbatim as a Q() inscription — «të dridhesh si dridhem unë» — and her dying wishes play as the walling ending's text: the breast left free outside the wall, the silver spring that raises her son and gives life, the white fig tree over the pier, the bridge that stands and trembles. The build-by-day / fall-by-night rhythm is played on the world clock, from the tale's own 'all day we build, all night it falls.'" },
    ],
  },
  beats: [
    {
      id: 'gathering', title: 'Three brothers at the river',
      note: 'Three brothers from Lluri, with forty apprentices under them, labor to raise a bridge at Arta — but every night undoes what the day built, and at last they cry out to the bridge itself to name its price.',
      lines: [
        ['1.1', 'Three brothers from the village of Lluri — Mihal Guri, Pano, and little Kiço, bright as morning light — set out together to build.', "Tre vëllezer kaha Lluri: ki Panua, ki Mihal Guri, Kiçua i vogël si nuri,"],
        ['1.2', '"The three of us brothers," they say, "with forty apprentices under us, are raising the bridge of Arta."', "- Të tre vëllezer që jemi, dizet pëntorë i kemi, urën e Artës ndërtojmë,"],
        ['1.3', '"Day and night we never rest, yet still it will not stand on its feet."', "natë e ditë nuk pëshojmë, dot në këmbë s'e qëndrojmë."],
        ['1.4', '"O cursed bridge," they cry, "what ransom do you want of us — only tell us!"', "Urë, moj urë e mallkuar, ç'fal të kemi, ja na thuaj?"],
      ],
      cast: {
        mihalGuri: ['bridge', 'eldest of the three, drives the work by day'],
        pano: ['bridge', 'labors alongside his brothers'],
        kico: ['bridge', 'youngest of the three, labors alongside his brothers'],
        apprentices: ['bridge', 'forty strong, building by day what falls by night'],
        bride: ['household', 'keeps house with her infant son, not yet sent for'],
        motherInLaw: ['household', 'keeps the household, not yet called to send anyone'],
        eldestBride: ['household', 'Mihal Guri\'s wife, keeps house'],
        middleBride: ['household', 'Pano\'s wife, keeps house'],
        infant: ['household', 'too small yet to be left alone'],
        oldMan: ['road', 'wanders toward Arta, not yet arrived'],
      },
      items: { unaza: ['kico', 'a ring on his hand, its lie not yet told'] },
    },
    {
      id: 'prophecy', title: 'The old wayfarer\'s price',
      note: 'An old man passing the failing worksite tells the brothers what the bridge truly wants: a living soul, a black bull and a black ram, laid in the foundation, so that all — sick or well — may cross it safe.',
      lines: [
        ['2.1', 'An old man comes walking by and speaks to them:', "Ati shkon një plak e u thotë:"],
        ['2.2', '"Toil away today and tomorrow as you please,"', "- Pënofshi sot edhe mot,"],
        ['2.3', '"but this bridge will never hold unless a living soul is set inside it,"', "po ura s'u qëndron dot, pa vënë një shpirt në botë,"],
        ['2.4', '"together with a black bull and a black ram —"', "e një dem të zi t'e vini, e një dash të zi t'e vini,"],
        ['2.5', '"laid there in the foundation."', "atje nek bëni themelin,"],
        ['2.6', '"Only so will the bridge be set right,"', "Kushtu ndreqetë kjo urë,"],
        ['2.7', '"so that everyone may cross safely over it,"', "të shkojnë gjithë në urë,"],
        ['2.8', '"and the river\'s waters bring no harm to any who pass, sick or well."', "ujt' e lumit - mos t'i njumë të shendosh' e të sumurë."],
      ],
      cast: {
        oldMan: ['bridge', 'arrives, and names the bridge\'s price'],
        mihalGuri: ['bridge', 'hears the old man out'],
        pano: ['bridge', 'hears the old man out'],
        kico: ['bridge', 'hears the old man out'],
      },
    },
    {
      id: 'besa', title: 'A besa of silence — and one who breaks it',
      note: 'The old man binds the brothers to silence: whichever wife brings tomorrow\'s bread first must be walled in with the bull and the ram. Kiço keeps the oath and tells his wife nothing; his elder brothers do not.',
      lines: [
        ['3.1', '"And if you heed an old man\'s word," he warns them,', "Në kloft' se plakun dëgjoni,"],
        ['3.2', '"tell your wives nothing of it."', "nuseve mos u rrëftoni,"],
        ['3.3', '"Bind yourselves to this in strictest good faith:"', "t'a bëni me besa-besë,"],
        ['3.4', '"whichever of them brings tomorrow\'s midday bread first,"', "kush t'e sellë bukën nestër,"],
        ['3.5', '"wall her alive into the foundation,"', "ne themeli ta mbëloni,"],
        ['3.6', '"and wall in the bull with her,"', "edhe demin t'e mbëloni,"],
        ['3.7', '"and wall in the ram."', "edhe dashin t'e mbëloni."],
        ['4.1', 'Little Kiço kept the oath and told his wife nothing;', "Kiçua i vogël ish me besë,"],
        ['4.2', 'Pano and Mihal Guri broke it, and warned their own wives in secret.', "Panua e Mihua të pabesë."],
      ],
      cast: {
        oldMan: ['road', 'gone as soon as his word was spoken'],
        mihalGuri: ['household', 'goes home and warns his own wife in secret'],
        pano: ['household', 'goes home and warns his own wife in secret'],
        kico: ['household', 'goes home and, faithful to the besa, says nothing at all'],
      },
    },
    {
      id: 'errand', title: 'Bread for the masters',
      note: 'At sunrise the mother-in-law sends the eldest bride out with the bread; she begs off with a feverish child. She turns to the middle bride, who begs off with her hands in the dough. Only the unwarned youngest bride is left to go.',
      lines: [
        ['5.1', 'The next morning the brothers\' mother tells the eldest bride:', "Thotë vjehrra nuses madhe:"],
        ['5.2', '"Get up, eldest daughter, and carry the bread out to the masters."', "- Ngreu ti, oj nusa e madhe, shperu bukën ustallarve."],
        ['5.3', 'She answers, "Mother, why choose me — let the middle bride carry it out instead,"', "- Vjehrrë, o vjehrrë, ku ma gjete, le ta shperë nusa e mesme,"],
        ['5.4', '"for my little one is burning with fever."', "se e kam djalin me ethe."],
        ['5.5', 'The mother turns to the middle bride with the same order:', "Thotë vjehrra nuses mesme:"],
        ['5.6', '"Get up, and carry the bread out to the masters,"', "- Ngreu ti, oj nusa e mesme, shperu bukën ustallarëve,"],
        ['5.7', 'and she too begs off: "Wait, mother, I still have work — my hands are deep in the dough."', "Dale, nanë, se kam pak punë, se kam duartë me brumë."],
        ['5.8', 'So the mother turns at last to the youngest bride:', "I thotë vjehrra nuses vogël:"],
        ['5.9', '"Get up, youngest daughter, and carry the bread out to the masters."', "- Ngrehu ti, oj nusa e vogël, shperu bukën ustallarëve."],
        ['5.10', '"Wait, mother, just a little — let me first put my boy down to sleep,"', "Dale nanë, se kam pak punë, sa të vë djalin në gjumë."],
        ['5.11', 'but her husband tells her, "Go on — I will settle him myself."', "- Ikë ti, se e vë unë."],
        ['5.12', '"Very well then, mother, I am going," she says.', "- Mirë nane, vete unë."],
      ],
      cast: {
        motherInLaw: ['household', 'sends the brides out in turn'],
        eldestBride: ['household', 'excuses herself — a child burning with fever'],
        middleBride: ['household', 'excuses herself — her hands deep in the dough'],
        bride: ['household', 'agrees to go, once her husband promises to settle their son'],
        infant: ['household', 'settled to sleep by his father\'s promise'],
        mihalGuri: ['bridge', 'back at the worksite, waiting'],
        pano: ['bridge', 'back at the worksite, waiting'],
        kico: ['bridge', 'back at the worksite, waiting — and dreading who is coming'],
      },
    },
    {
      id: 'ringTrick', title: 'The ring in the pit',
      note: 'The bride sets out for the bridge with the bread and greets the masters cheerfully. Alone in his grief, Kiço confesses the truth under his breath, then lies to her: his ring has fallen into the pit. She climbs down to fetch it for him.',
      lines: [
        ['6.1', 'The bride sets out for the bridge with the bread:', "U nis nusa për në urë:"],
        ['6.2', '"Good work to you, masters!" she calls out.', "Puna e mbarë, o ustallarë!"],
        ['6.3', '"May it go as well for you, our sister," Pano and Mihal Guri answer her.', "- Mbarë paç kunata jonë, - i tha Panua me Mihalë."],
        ['6.4', 'But little Kiço says under his breath,', "Thotë Kiçua i vogëli:"],
        ['6.5', '"Wife, if only you knew it — the whole world has gone dark for me."', "- Grua, kur të paçë me si, i tërë dheu m'u nxi."],
        ['6.6', '"Three years now we have labored and still cannot finish this bridge —"', "Kemi tre vjet që pënojnë, e dot urën s'e mbarojmë:"],
        ['6.7', '"all day we build it, and all night it falls back down."', "gjithë ditënë pënojmë, gjithë natën n'e rrëzojmë."],
        ['6.8', '"What is it, husband," she asks, "that you weep such tears and stare so into the pit?"', "Sh'ke, imzot, që klan me lot, pse vëzhdrin ashtu në gropë?"],
        ['6.9', '"My ring has slipped from my hand — down into the pit, down toward the river."', "- Më ra ognaza në gropë, më ra ognaza në lumë."],
        ['6.10', '"That ring! Let me climb down and find it for you," she says.', "- Atë ognazë ta marrte unë!"],
      ],
      cast: {
        bride: ['bridge', 'arrives with the bread, then climbs down after the ring'],
        kico: ['bridge', 'grieves under his breath, then tells her the ring has fallen'],
        mihalGuri: ['bridge', 'answers her greeting'],
        pano: ['bridge', 'answers her greeting'],
      },
      items: { unaza: ['bridge', 'the lie that draws her down into the foundation'] },
    },
    {
      id: 'walling', title: 'Stones on the bride',
      note: 'The moment she is down, they wall her in with stones. She cries out against the cruelty of it — no sickness, no wound, ever excused this — then turns her grief on the bridge itself, that it tremble as she now trembles.',
      lines: [
        ['7.1', 'The moment the bride had climbed down into the foundation,', "Po nusa sa ishte ulë,"],
        ['7.2', 'they began throwing stones down upon her.', "nisin që t'i hedhin gurë."],
        ['7.3', 'The bride cries out, "Husband, why do you hurl stones down on me,"', "Nusa u thotë: Pse, o burrë, përsiper me hidhni gurë,"],
        ['7.4', '"when I have never once fallen sick,"', "pa u bënë sumurë kurrë,"],
        ['7.5', '"when no leg of mine, no arm,"', "pa thertur as këmbë, as dorë,"],
        ['7.6', '"no leg, no head of mine has ever been cut,"', "pa thertur as këmbë, as kokë,"],
        ['7.7', '"that you should bury me alive in this world?"', "më vë të gjallë në botë?"],
        ['7.8', 'But they go on walling her feet into the bridge with stone.', "Po ata të këmba n'urë po e bëlojnë me gurë."],
        ['7.9', '"You wretched man, you cruel husband,"', "More burrë, a i ziu burrë,"],
        ['7.10', '"you are making a pillar of me in this bridge."', "po më bën direk në urë."],
        ['7.11', '"O bridge, you black bridge,"', "O moj urë, e zeza urë,"],
        ['7.12', '"when the sick and the suffering pass over you,"', "kur të shkojnë të sëmurë,"],
        ['7.13', '"may you tremble just as I tremble now."', "të dridhesh si dridhem unë."],
      ],
      cast: {
        bride: ['bridge', 'walled alive into the pier, cries out and turns her grief on the bridge itself'],
        mihalGuri: ['bridge', 'walls her in with stone'],
        pano: ['bridge', 'walls her in with stone'],
        kico: ['bridge', 'walls her in with stone, weeping'],
      },
    },
    {
      id: 'blessing', title: 'A dying wish, a silver spring',
      note: 'Before her voice is lost she leaves her last wishes: a white fig tree for her son\'s first fruit, and her own breast left free outside the stone. They grant it — and where her breast is left bare, a silver spring begins to flow, to raise the boy and heal the sick ever after. The bridge stands, unshaken, from that day on.',
      lines: [
        ['8.1', '"Husband, I will tell you one more thing:"', "Burrë, do të them një fjalë:"],
        ['8.2', '"take this as my dying trust, held for our son —"', "jamanet të zinë djalë,"],
        ['8.3', '"here, where I am placed,"', "kutu nek do vihem unë,"],
        ['8.4', '"a white fig tree will grow,"', "do bijë një fik i bardhë,"],
        ['8.5', '"and when its first fruit ripens,"', "kur të bijë kokrrën e parë,"],
        ['8.6', '"give it to my son to eat."', "t'ia ipni djalit t'e hajë."],
        ['8.7', '"And this too I leave in your keeping, my husband\'s brothers:"', "Jamanet dhe ju kunetë,"],
        ['8.8', '"leave my breast free, outside the wall."', "gjoksin të m'e lini jashtë."],
        ['8.9', 'They left her breast free, outside the stone,', "Gjoksin jashtë ja kanë lënë,"],
        ['8.10', 'and there a silver spring began to flow —', "rrodhi një krua i ergjëndë,"],
        ['8.11', 'it raised her son and made him grow tall,', "djalin e rritte e madhonte,"],
        ['8.12', 'and it healed every sick person who came to it.', "të sumurët i shëronte."],
      ],
      cast: {
        bride: ['bridge', '☠ immured for good — her breast left free, feeding the spring that outlives her'],
        infant: ['bridge', 'brought to the wall to nurse, and later to the spring'],
        mihalGuri: ['bridge', 'finishes the bridge at last, the price finally paid'],
        pano: ['bridge', 'finishes the bridge at last'],
        kico: ['bridge', 'stays by the wall long after his brothers leave it'],
        motherInLaw: ['household', 'grieves for the daughter-in-law she sent'],
        eldestBride: ['household', 'grieves alongside the mother-in-law'],
        middleBride: ['household', 'grieves alongside the mother-in-law'],
        apprentices: ['bridge', 'finish the work the bridge finally allows to stand'],
      },
      items: {
        fiku: ['bridge', 'grows over the pier, its first fruit kept for her son'],
        kroiArgjendte: ['bridge', 'flows from the wall, raising the boy and healing the sick'],
      },
      exit: ['bride'],
    },
  ],
}
