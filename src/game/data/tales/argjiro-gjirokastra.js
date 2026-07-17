// ===========================================================================
// TALE: Legjenda e Argjiros — Princess Argjiro of Gjirokastër — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// No Elsie page exists for this legend — it is not in his Legends index
// (checked index_legends.html: Baba Tomor, Sari Salltëk, Aga Ymeri, Gjergj
// Elez Alia, Mujo & Halili, Rozafat, Scanderbeg & Ballaban, Shega &
// Vllastar, "The Lover's Grave", Ali Dost Dede OF Gjirokastra [a different,
// unrelated legend], Jabal-i Alhama, and the Kelmendi/Kastrati/Hoti/Triepshi
// founding legends — no Argjiro). The FOLKLORE card's own two citations
// (Wikipedia, the Gjirokastra Foundation) are themselves thin encyclopedia
// paragraphs, not a folk telling. The fuller Albanian folk text used below —
// a short, stable prose legend that several independent Albanian sites
// repeat almost word-for-word — was found by direct web search and is NOT
// from any Elsie or classic folk-tale-collection source; see albanian.source
// and docs/references/argjiro-legjenda-gjirokastres.sq.txt for full
// provenance. The numbered English telling below is my own paraphrase of
// that Albanian text, not a translation of anyone else's English.
// ===========================================================================

export default {
  id: 'argjiro-gjirokastra',
  title: 'Legjenda e Argjiros — Princess Argjiro of Gjirokastër',
  source:
    'No Elsie page or folk-tale-collection text exists for this legend. Used here: the "Legjenda e Argjirosë" prose legend kept by the Gjirokastër Castle heritage blog (elisabetamosho.wordpress.com, 14 Dec 2016), cross-checked nearly word-for-word against bordo.al (26 Jun 2019) and its reprints (actvusa.com 2023, observerkult.com 2025); the etymology-debate paragraph is separately drawn from the Gjirokastra Conservation and Development Organization\'s own published city history (gjirokastra.org) — the same body Wikipedia cites for the leap story · read in the Albanian originals directly; all lines are my own paraphrase',
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: {
    region: 'South Albania (Gjirokastër, in the Drino valley near the modern Greek border) — the "City of Stone"',
    collector: 'no single named collector; a stable popular prose legend attached to Gjirokastër Castle itself, told to visitors and repeated across Albanian culture sites',
    published: 'earliest dated copy found: elisabetamosho.wordpress.com, 14 Dec 2016; widely repeated 2019–2025 (bordo.al, actvusa.com, observerkult.com); the etymology material comes from gjirokastra.org\'s own undated history page',
  },
  // the ALBANIAN ORIGINAL — see docs/references/argjiro-legjenda-gjirokastres.sq.txt
  // for the full raw extraction, both sources, and everything NOT used here.
  albanian: {
    title: '«Legjenda e Argjirosë»',
    source:
      'Primary: "Legjenda e Argjirosë," elisabetamosho.wordpress.com (Gjirokastër Castle heritage blog), 14 Dhjetor 2016 — cross-checked against the identical text syndicated by bordo.al/Busull, 26 Qershor 2019 ("Të njohim Shqipërinë: Legjenda e Kalasë së Gjirokastrës!"), reprinted crediting bordo.al by actvusa.com (30 Aug 2023) and observerkult.com (26 Jan 2025); all four agree almost verbatim. The etymology paragraph is drawn separately from "Një histori e shkurtër e Gjirokastrës," Organizata për Ruajtjen dhe Zhvillimin e Gjirokastrës (gjirokastra.org, accessed 2026-07-15). Missing diacritics silently restored (keshtjella→kështjella, gjalle→gjallë); nothing reworded or invented.',
    local: 'docs/references/argjiro-legjenda-gjirokastres.sq.txt',
  },
  discrepancies: [
    'WIFE OR SISTER? (¶1.3): the folk legend used as this tale\'s spine calls Argjiro the city\'s own ruler, married to its prince. The Gjirokastra Conservation and Development Organization\'s history page — and the academic source (Mezini & Pojani 2015) Wikipedia quotes from it — instead call her "motra e zotit të qytetit", the city lord\'s SISTER. Both readings circulate in real sources; these beats follow the fuller folk telling (wife) as primary and record the sister-reading here rather than silently picking one as if it were settled.',
    'THE GREEK LITERARY VARIANT (Kostas Krystallis, 1893): English Wikipedia also carries a wholly separate Greek short novel, "Argyro the Single-Breasted" (Αργυρώ η Μονοβύζα) — there the castle falls, but the son escapes to Sofratikë and then Kastaniani, is murdered by traitors, and Argyro (who does NOT die) retakes the city in revenge. No leap, no death, no milk-stone. This is a 19th-century Greek author\'s own literary elaboration with no Albanian original to quote, not a variant of the oral legend told here — per the schema\'s own rule on diverging variants, it is recorded here rather than mined for lines.',
    'THE "THREE SISTERS" FOUNDING MYTH (Alexandros Georgitsis, 1885, via Wikipedia): a separate Greek antiquarian tradition makes Argyro one of three royal sisters — Gianno, Leno, Argyro — each the eponymous founder of a different town (Gjirokastër, Tepelenë, and a third). This is a RIVAL etiological myth for the same name, not a variant of the siege-and-leap legend, and is likewise not used here.',
    'THE DATE OF THE FALL: the Gjirokastra Foundation\'s separate English-language visitor page (gjirokastra.org/gjirokastra/?page_id=2249 — the FOLKLORE card\'s own second citation) dates the Ottoman capture "by 1420" and adds a THIRD etymology (the "Argyers," an ancient tribe of the Drino valley, distinct from the Albanian page\'s "Argjirët"). No Albanian text found gives an exact year for Argjiro\'s own siege, so these beats leave the date unstated rather than assert an unsourced one.',
  ],
  // sentence counts of my own English paraphrase's 4 paragraphs (17 sentences
  // total, all with a genuine Albanian-original pairing — see albanian.local)
  paragraphs: [3, 6, 3, 5],
  cast: [
    { id: 'argjiro', name: 'Princesha Argjiro', note: 'noblewoman of Gjirokastër; leaps from the tower rather than be taken alive', npc: 'argjiro' },
    { id: 'infant', name: 'her infant son', note: 'unnamed; carried in the leap, saved by the milk-stone', npc: 'djaliArgjiro' },
    { id: 'turqit', name: 'the besieging Turks', note: 'take the castle by an unnamed traitor\'s treachery, never by the wall', npc: 'turqitRrethues' },
  ],
  // anchor = the game location this tale place inhabits. THE SHARING RULE:
  // two stories may occupy one spot only if both can be talking about the
  // same place/figures. This tale is SOUTHERN, but a REAL, SPECIFIC, and
  // DIFFERENT southern city from Berat (already claimed at shpirag1 by
  // three-friends AND tomor-shpirag) and from Shkodra's Rozafa (north) — see
  // `conflicts` below for exactly why neither existing castle spot will do.
  places: [
    { id: 'castle', emoji: '🏰', name: 'Kalaja e Gjirokastrës (Kalaja e Argjirosë)', note: "the hilltop fortress over the Drino valley, and the rock at its foot where she fell",
      anchor: { status: 'offstage',
        mirror: "Gjirokastra's real citadel — the \"City of Stone,\" one of the largest castles in the Balkans, on its limestone crag over the Drino valley in Albania's deep south, near the modern Greek border; the rock below its walls is still shown to visitors as Shkëmbi i Argjiros, Argjiro's Rock",
        mold: "a real, specific, still-standing southern castle — its own city, its own siege, its own name-legend. No node exists for it: the game's southern reach currently stops at Mount Tomorr/Shpirag (already Berat's own moat-city, per three-friends and tomor-shpirag), and Gjirokastër lies much further south down the Drino valley, nowhere near Shpirag's foot — conflating the two would put two different real cities on one pin. If ever drawn, it wants its OWN new southward branch off the Tomorr cluster (nearest node today: shpirag1), not a reuse of an existing one.",
        conflicts: "NOT shpirag1/beratCity (three-friends, tomor-shpirag) — that pin is committed to Berat specifically, at Shpirag's actual foot; Gjirokastër is a different city, far enough south that forcing it onto the same spot would misstate two real places as one. NOT kalaRozafa (rozafa.js) — wrong region entirely (Shkodra, the north) and a wholly different walling legend (three brothers, a wife bricked in alive over years, not a single leap) whose castle-kings must never be conflated with Argjiro's." } },
  ],
  items: [
    { id: 'guriQumesht', emoji: '🪨', name: 'the milk-stone', note: "the rock where she fell; wept milk to keep her infant son alive" },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md), BUILT
  // FROM SCRATCH (nodes argjiroKala → argjiroFund / argjiroRob). You are Princess
  // Argjiro; the enemy besieges your castle and it falls by betrayal from within. The
  // CHOICE: leap from the highest tower with your infant son (you die on the rock but
  // he lives, the stone weeps milk, and the city takes your name — the good ending) or
  // wait and be taken alive (the bad ending — no leap, no name). become:'argjiro-
  // gjirokastra' on the summit vista (maja "sheh kalanë"); co-located on maja.
  play: {
    entry: 'siege',
    stance: 'embodied',
    as: 'argjiro',
    role:
      'You are Princess Argjiro, who ruled Gjirokastër as the prince\'s wife and took up the castle\'s own defense when the Ottoman host laid siege. The walls hold, but the gate does not — the city falls by betrayal from within. Now, rather than be taken alive, climb the highest tower and leap with your infant son held against you: you will die on the rock, but he will live, the stone will weep milk to feed him, and the city will carry your name forever — or wait, and be taken.',
    enter:
      'the enemy has laid siege to your castle, and though the walls hold, the gate has been opened by betrayal from within — and it is your own defense that has failed',
    from: 'argjiroKala',
    ending: 'argjiroFund',
    scenes: {
      argjiroKala: 'siege',
      argjiroFund: 'miracle',
    },
    divergences: [
      { beat: 'leap', note: 'Built from scratch. The legend fixes the leap — that is why the city is called Gjirokastër, Argjiro\'s castle. The game makes it a real choice and adds the path she never takes: wait, and be taken alive (the bad ending "Taken Alive"), where no rock weeps milk and the fortress keeps some other name. The heroic canonical leap is the good ending, sacrifice and all.' },
      { beat: 'miracle', note: 'The rock that weeps milk to keep the fallen princess\'s infant son alive is staged as the good ending\'s turn; the whole first movement (her rule as the prince\'s wife, the siege, the betrayal) is compressed into the setup at the castle.' },
      { beat: 'debate', note: "The historians' caveat is honoured in the tale record, not the game: the name Gjirokastër is attested from Byzantine times (Kantakouzenos, 1336) long before any Ottoman siege, and is better traced to argyrokastron, \"silver castle\" (the grey stone shimmering like silver in the rain), or to a local tribe, the Argjirët — so the princess-legend is a beloved folk etymology, not the true source. The lake ending is co-located on the summit (maja) since the map has not reached the far-southern Drino valley where Gjirokastër truly stands." },
    ],
  },
  beats: [
    {
      id: 'rule', title: "A princess's city",
      note: "Gjirokastër's castle carries her name to this day. Tradition holds Argjiro ruled the city in the 1300s, married to its own prince — long before any Turk came near its walls.",
      lines: [
        ['1.1', "The fortress above the city carries a second name to this day: Kalaja e Argjirosë, Argjiro's Castle.", "Kështjella njihet dhe me emrin kalaja e Argjirosë."],
        ['1.2', 'Tradition holds that a noblewoman named Argjiro ruled the city of Gjirokastër in the fourteenth century.', "Princesha Argjiro mendohet të ketë qenë sundimtarja e qytetit të Gjirokastrës gjatë shekullit XIV."],
        ['1.3', "She held that rule as wife to the city's own prince.", "Ajo ishte e martuar me princin e këtij qyteti."],
      ],
      cast: {
        argjiro: ['castle', "rules Gjirokastër at her prince's side"],
        infant: ['castle', 'not yet born'],
        turqit: ['castle', 'far off, no threat yet to this city'],
      },
      items: { guriQumesht: ['castle', 'an ordinary rock at the foot of the crag, its wonder still to come'] },
    },
    {
      id: 'siege', title: 'The wall holds, the gate does not',
      note: 'When the Ottomans besiege the castle, Argjiro herself takes up its defense. The wall holds against them — so they buy with treachery what they cannot win by force.',
      lines: [
        ['2.1', 'When the Ottoman Turks laid siege to the castle, Princess Argjiro herself took up its defense.', "Princesha Argjiro luftoi me turqit kur ata rrethuan kalanë e Gjirokastrës."],
        ['2.2', 'Even so the city fell — taken not by force of arms but by an act of betrayal from within.', "Megjithatë, turqit e morën Gjirokastrën me tradhëti."],
      ],
      cast: {
        argjiro: ['castle', 'leads the defense; the walls hold until they are opened, not broken'],
        turqit: ['castle', 'ring the castle, then take it through an unnamed traitor rather than the wall'],
        infant: ['castle', 'in his mother\'s keeping through the siege'],
      },
    },
    {
      id: 'leap', title: 'The first road they ever walked together',
      note: 'Rather than fall alive into the enemy\'s hands, Argjiro climbs the fortress\'s highest tower, her infant son in her arms — the very first journey the two had ever made together — and leaps.',
      lines: [
        ['2.3', 'Rather than be taken alive, Argjiro climbed the fortress\'s highest tower and leapt, her infant son held against her.', "Prandaj princesha Argjiro për të mos rënë e gjallë në duart e turqve, u hodh nga kulla më e lartë e kalasë bashkë me djalin e saj foshnjë."],
        ['2.4', 'It was, of all things, the very first journey she had ever made carrying her son anywhere.', "Në fakt kjo ishte rruga e parë që ajo e bënte me djalin e saj."],
      ],
      cast: {
        argjiro: ['castle', 'climbs the highest tower with her son and leaps, rather than be taken'],
        infant: ['castle', 'carried in the leap, on the first journey mother and son ever shared'],
        turqit: ['castle', 'take the empty castle below'],
      },
    },
    {
      id: 'miracle', title: 'The rock that wept milk',
      note: 'She is broken on the rock below — but her son lives, and the stone itself begins to weep milk, as if moved to keep him alive.',
      lines: [
        ['2.5', 'She struck the rock below and was broken by the fall, yet the boy lived — and the stone itself, as if moved to bless him, began to weep milk.', "Ajo ra drejt te një shkëmb dhe u coptua, por djali i saj mbeti gjallë, dhe për ta bekuar filloi të pikojë qumësht."],
        ['2.6', 'That milk from the stone, the legend says, is what kept the infant alive.', "Sipas legjendës thuhet se foshnja mbeti gjallë nga guri që pikonte qumësht."],
      ],
      cast: {
        argjiro: ['castle', '☠ broken on the rock below the wall'],
        infant: ['castle', 'lives, kept by the milk that begins to flow from the stone beneath his mother'],
        turqit: ['castle', 'hold the empty city, the leap already made'],
      },
      items: { guriQumesht: ['castle', 'begins to weep milk, and does not stop until the infant is safe'] },
      exit: ['argjiro'],
    },
    {
      id: 'name', title: 'A name that outlives the siege',
      note: 'The legend says the city itself takes her name — and poets have sung her ever since.',
      lines: [
        ['3.1', "And so, the legend concludes, Gjirokastër itself takes its very name from hers.", "Legjenda thotë që emri i Gjirokastrës vjen pikërisht nga emri i princeshës."],
        ['3.2', 'The brave princess has since been much sung of by the country\'s poets —', "Prej princeshës trime poeti e këndon shumë atë."],
        ['3.3', '— one writer going so far as to liken her to the morning star and to the sun itself.', "Shkrimtari e krahason princeshën Argjiro me yllin dhe me diellin."],
      ],
      cast: {
        infant: ['castle', 'grows up on the stone\'s milk; no telling says what became of him after'],
        turqit: ['castle', 'hold the city that now carries her name'],
      },
    },
    {
      id: 'debate', title: 'What the historians say',
      note: 'Scholars push back on the legend itself: the city\'s name is on record from Byzantine times, centuries before any Ottoman siege — so two more sober theories compete for the honor, and the earliest hard record of the name predates Argjiro by generations.',
      lines: [
        ['4.1', 'Yet the name Gjirokastër itself, scholars point out, actually carries one mythical explanation and two rather more historical ones.', "Prejardhja e emrit të Gjirokastrës ka një shpjegim mitik dhe dy të tjerë me natyrë më historike."],
        ['4.2', 'The princess\'s story cannot really be the source, they note, since the town\'s name is already on record from Byzantine times — long before any Ottoman siege.', "(Por kjo duket e pamundur mbasi emri i qytetit përmendet që në kohën e Bizantit, pra para pushtimit osman)."],
        ['4.3', "A less poetic theory instead traces the name to the Greek word for silver — argjirokastron — a nod to how the town's grey stone walls, lanes and roofs shimmer like silver metal whenever the rain wets them.", "Sipas një shpjegimi tjetër më pak poetik, qyteti e ka marrë emrin sipas fjalës greke argjend, argjirokastron, që lidhet me ngjyrën e përhime të mureve, rrugëve dhe çative prej guri, të cilat vezullojnë si argjend kur lagen nga shiu."],
        ['4.4', 'A third theory ties the same name to a local tribe once settled near the town, the Argjirët.', "Një shpjegim tjetër lidhet me emrin e një fisi vendas që jetonte pranë Gjirokastrës: Argjirët."],
        ['4.5', 'The earliest historical mention of any kind comes from the year 1336, when the Byzantine chronicler John Kantakouzenos wrote of a place called Argjirokastron.', "Për herë të parë burimet historike e përmendin qytetin me 1336, kur kronisti bizantin Johan Kantakuzeni shkruan për Argjirokastron."],
      ],
      cast: {
        infant: ['castle', 'lives on in the story only as "her son" — the debate has moved past him entirely'],
        turqit: ['castle', 'long gone; the argument outlasted the army'],
      },
    },
  ],
}
