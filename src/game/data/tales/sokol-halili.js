// ===========================================================================
// TALE: The Death of Halili (Deka e Halilit) — see ../tales/_SCHEMA.md for
// the format contract. This file is owned by its tale: agents editing other
// tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — one of the Kângë Kreshnikësh (Songs of
// the Frontier Warriors), 115 verses, sung by Shan Zefi of Curraj i Epërm.
// English and Albanian run close to verse-for-verse, so "paragraphs" here
// are 11 narrative beat-groups this author has divided the song into, and a
// "sentence" is a punctuation-bounded verse-group (1-8 lines); the Albanian
// third element is the verbatim verse-group, lines joined with " / ". Every
// English line below is this author's own paraphrase of Robert Elsie &
// Janice Mathie-Heck's translation — never a copy of their wording.
//
// This is the character card `sokol-halili`'s own centerpiece: the lore
// card's "his death" (its related tales already cover the rescue-and-lie
// pattern once each — `mujo-avenges-halil` = Halili avenges Mujo,
// `halil-marriage` = Mujo frees Halili — this song closes the arc the other
// way, Mujo avenging Halili, and neither brother rides home).
// ===========================================================================

export default {
  id: 'sokol-halili',
  title: 'The Death of Halili',
  source:
    'Sung by Shan Zefi of Curraj i Epërm, District of Tropoja; Visaret e Kombit, vol. II, ed. Bernardin Palaj & Donat Kurti (Tirana, 1937), pp. 227–230; repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve), Vëllimi i parë, ed. Qemal Haxhihasani (Tirana, 1966), pp. 250–252 · read in Robert Elsie & Janice Mathie-Heck\'s translation, "Death of Halili" (Songs of the Frontier Warriors / Kângë Kreshnikësh, Bolchazy-Carducci, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (1937); repr. Qemal Haxhihasani (1966)',
    published: 'Visaret e Kombit II (Tirana, 1937); Folklor shqiptar II (Tirana, 1966)',
  },
  // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
  // verse-group for that ¶.sentence (lightly cleaned; raw text in `local`).
  albanian: {
    title: '«Deka e Halilit»',
    source:
      'Sung by Shan Zefi of Curraj i Epërm (Tropoja); Visaret e Kombit II (Palaj & Kurti, Tirana 1937), pp. 227–230, repr. Folklor shqiptar II: Epika legjendare (Cikli i kreshnikëve), Vëllimi i parë (Haxhihasani, Tirana 1966), pp. 250–252. The Wayback mirror holds no snapshot of this song\'s facsimile (oralverse/verse_09_AL/verse_09_AL_21.pdf); fetched live from albanianliterature.net on 2026-07-15, since the neighbouring English page (verse_09_21.html) was already cached but its Albanian companion was not. Gheg spelling and elisions kept exactly as printed; the source\'s own every-fifth-line typesetting numerals (5, 10, 15…) are apparatus, not sung text, and have been dropped from the quotations below; one missing opening guillemet in a nested quotation (verse 28) has been supplied for clarity.',
    local: 'docs/references/palaj-kurti-deka-e-halilit.sq.txt',
  },
  discrepancies: [
    'MUJO\'S REBUKE OVER THE BODY (¶7.1, verse 52): «Zanat të keq, bir, më ke msue» resists a fully certain reading in this Gheg couplet — literally close to "you\'ve taught [me/the zanas] badly, son," paired with a line about sleeping through the whole battle. The English translation renders the general sense as a rebuke for setting a bad example; these beats follow that general sense (Mujo scolding what he still believes is only a sleeping brother) rather than pinning down the more obscure literal wording.',
  ],
  // 11 narrative beat-groups this author has divided the song\'s 115 verses
  // into; sentence counts per group
  paragraphs: [2, 1, 3, 1, 1, 1, 2, 3, 1, 4, 3],
  cast: [
    { id: 'halili', name: 'Sokol Halili', note: 'Mujo\'s young brother — rides out on a lie, and dies for it', npc: 'sokolHalili' },
    { id: 'mujo', name: 'Gjeto Basho Mujo', note: 'the elder kreshnik of Jutbina — avenges his brother in turn', npc: 'mujo' },
    { id: 'osmani', name: 'Arnaut Osmani', note: 'an Aga with a private grudge against Mujo; tells each brother the other is dead', npc: 'osmaniZilise' },
    { id: 'zadrani', name: 'Zadrani i Tetovës', note: 'kills Halili with a fair warning kept, then is killed by Mujo in turn', npc: 'zadraniTetoves' },
    { id: 'agallaret', name: 'the three hundred Agas', note: 'camped at Kunora, the raiding band Mujo and Halili ride with', npc: 'treqindAgallaret' },
    { id: 'zanat', name: 'the zana sisterhood', note: 'sworn to Mujo since the night they gave him his strength; answer his cry a second time', npc: 'zanatBesatare' },
  ],
  // anchor = the game location this tale place inhabits. This is a NORTHERN
  // (Gheg) frontier song set on the same massif every other Jutbina/kreshnik
  // tale already shares — every place below reuses that one hub (mali1)
  // rather than proposing new geography, per THE SHARING RULE.
  places: [
    { id: 'camp', emoji: '⛺', name: 'the camp at Kunora', note: 'the high pasture where three hundred Agas of Jutbina lie camped, Halili asleep among them',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank, at the specific camp (Kunora) mujo-avenges-halil already names',
        mold: 'the same standing war-camp mujo-avenges-halil already places here: three hundred Agas camped in the high pastures, ready to ride at a word. This song opens on an ordinary night in that camp, before anything has gone wrong.',
        conflicts: 'NOT halil-garria\'s proposed highland hamlet, ali-pashe-tepelena\'s Epirus passes, or legjenda-e-prespes\'s Lake Prespa — those three tales pin their own, not-yet-built elsewhere-places at this same node without claiming to BE the bare flank (each says so plainly in its own file); they are not co-tenants of THIS mold.',
        sharedWith: ['mujo-avenges-halil (the same Kunora camp, its own treqindAgallaret and zanatBesatare)', 'ali-bajraktari, arnaut-osmani, gjeto-basho-muji, halil-marriage, kreshnik-epic, mujo-strength, mujo-courser, muji-e-behuri, mujo-zanas, zuku-bajraktar (the same "grazing heights above Jutbina" bare flank)', 'three-friends, sari-salltek (the map\'s one shared "a mountain, when a tale needs one" hub — each stands in for a different elsewhere-summit, never a claim that those summits are each other)'] } },
    { id: 'valley', emoji: '⚔️', name: 'the Green Valleys', note: 'Lugjet e Verdha — the fold of the massif where the shkja are fought, and where both brothers meet their reckoning',
      anchor: { status: 'existing', node: 'mali1', mirror: 'a further, fought-over fold of the same frontier massif',
        mold: 'open, blood-soaked raiding-ground within reach of the Kunora camp — the song\'s whole battle, from Halili\'s charge to the last serpent found in Zadrani\'s belly, plays out on this one fold',
        conflicts: 'NOT mujo-zanas\'s own "lugjetVerdha" (a hidden, lightless beech gorge where the zanas pasture three golden-horned goats, a different fold of the same massif entirely) — the epic reuses "Lugjet e Verdha" for more than one valley across its own songs, the same way it reuses "Krajl" for more than one king; the two are never asked to be the same place.',
        sharedWith: ['the same bare-flank co-tenants as camp, above — this fold is a further reach of that one shared massif'] } },
  ],
  items: [
    { id: 'pushka', emoji: '🔫', name: 'the warning rifle', note: '"aimed however crookedly, it strikes true" — Zadrani\'s own weapon, turned first on Halili, then on Mujo himself' },
    { id: 'thika', emoji: '🗡️', name: 'the poisoned dagger', note: 'hidden in Mujo\'s own pocket all along, unknown to him until the zanas name it — the gift that finishes what the rifle-duel could not' },
  ],
  // EMBODIED projection: a compact two-choice arc staged at Jutbina, folding
  // the whole song onto young Halili's single fatal decision (haliliDeka →
  // haliliMejdan / haliliJeton). become:'sokol-halili' on the jutbina
  // "rri me halil" threshold.
  play: {
    entry: 'wake',
    stance: 'embodied',
    as: 'halili',
    role: 'You are young Sokol Halili at Jutbina, Mujo\'s brother, the whole frontier\'s second pillar. Arnaut Osmani — who bears Mujo a private grudge — comes to you with a lie: your brother lies dead, and a duel waits for you at the mejdan. What he does not say is that Zadran of Tetova waits there in ambush, and that Zadran kills with a fair warning kept. Believe the summons and ride out, and you die on the field for nothing while Mujo raises the death-wail — or weigh the man against his message, distrust a liar who keeps no besa, and stay among the towers alive.',
    enter: 'Arnaut Osmani, who bears Mujo a grudge, brings you a lie — your brother lies dead, and a duel waits at the mejdan — while Zadran of Tetova lies in wait there',
    from: 'haliliDeka',
    ending: 'haliliMejdan',
    scenes: {
      haliliDeka: 'wake',
      haliliMejdan: 'death',
      haliliJeton: 'zadrani',
    },
    divergences: [
      { beat: 'wake', note: 'Built from scratch as a compact two-choice arc: the whole 115-verse song is projected onto young Halili\'s single fatal decision. Only the opening is staged — Osmani\'s lie (beat "wake") that Mujo lies dead and a duel waits — and the player, embodying Halili, either believes it or does not. The ride through the blood and the accusations traded (beats "ride", "zadrani") are compressed into the choice itself.' },
      { beat: 'death', note: 'The canonical outcome is the secret ending "A Warning Kept": Halili rides out and Zadran of Tetova, who kills with a fair warning kept, shoots him dead (beat "death"), closed by Mujo\'s gjëmë back at Jutbina. The song\'s whole second movement — Mujo\'s own ride on the reversed lie, the three-day grapple, the poisoned dagger the zanas name, the three serpents cut from Zadran\'s belly (beats "reverseLie", "grapple", "dagger", "serpents") — is kept only in the beats, out of the playable arc.' },
      { beat: 'zadrani', note: 'The good ending "The Lie Refused" is the path «Deka e Halilit» never lets its boy take: distrust Osmani, who keeps no besa, stay among the towers, and live while Zadran waits out the day at the mejdan alone (beat "zadrani", the Zadran-encounter that here never happens). The song has no such turn — its Halili always rides — so this divergence is invented whole.' },
    ],
  },
  beats: [
    {
      id: 'wake', title: 'A kick and a lie',
      note: 'Three hundred Agas of Jutbina lie camped at Kunora, Halili deep asleep among them, while Mujo slips off alone to scout the pastures and tells his men to keep it secret. Arnaut Osmani wakes Halili instead — with a kick, and a lie: the shkja have already killed Mujo in the Green Valleys.',
      lines: [
        ['1.1', 'Three hundred Agas of Jutbina lay camped together, Halili deep in an exhausted sleep among them, when Mujo told his companions: say nothing to Halili of where I have gone once he wakes — I mean to go out and look over the high pastures myself.', "In mbledhë treqind agët e Jutbinës. / Gjumi i randë Halilin ma ka marrë / Edhe Muji shokve m'u ka thanë: / - Gjumi Halilit kur t'i dalë, / Ku â vojtë Muji mos i kallxoni; / Due me dalë në bjeshkë e me shikjue."],
        ['1.2', 'But Arnaut Osmani, who bore Mujo a private grudge, woke Halili instead with a hard kick and a lie: rise now, Halili, for Mujo has gone into the Green Valleys, the fighting has already broken out there, and the shkja have cut him down.', "Prit shka ban Arnaut Osmani! / Fort me shkelm Halilit qi po i bjen: / - Çou, Halil, kryet mos e çosh, / Se Muji â ra në Lugje t'verdha, / Kaherë Muji luftën e ka nisë / Edhe Mujin shkjetë ta kanë pre."],
      ],
      cast: {
        halili: ['camp', 'sleeps among the Agas until Osmani wakes him with a kick and a lie'],
        mujo: ['camp', 'slips off alone to scout the high pastures, telling no one where'],
        agallaret: ['camp', 'camped three hundred strong at Kunora for the night'],
        osmani: ['camp', 'wakes Halili the moment Mujo is out of sight'],
        zadrani: ['valley', 'a warrior of Tetova, not yet met'],
        zanat: ['valley', 'the zana sisterhood of the cliffs, sworn to Mujo, not yet called'],
      },
    },
    {
      id: 'ride', title: 'Three hundred through the blood',
      note: 'Halili springs up at once and rides hard into the Green Valleys, throwing himself alone into a battle already underway.',
      lines: [
        ['2.1', 'At once Halili sprang to his feet, leapt onto his courser, and rode hard into the Green Valleys, where he threw himself into the fighting, surrounded three hundred shkja single-handed, and cut down all three hundred — his courser wading through the blood behind him.', "Halla, në kambë Halili asht çue / E në shpinë gjogut i ka ra, / Në Lugje të verdha trimi kenka ra, / E ka ngrehë luftën e po lufton, / Treqind shkjeve rrethin jau ka qitë, / Treqind shkje djali i ka pre, / Gjogu not në gjak po i shkon."],
      ],
      cast: {
        halili: ['valley', 'rides straight into the fighting and cuts down three hundred shkja alone'],
      },
    },
    {
      id: 'zadrani', title: 'Zadrani of Tetova',
      note: 'A little further on Halili meets Zadrani, who accuses him of killing two cousins; each man blames the other for Mujo\'s supposed death, and Zadrani warns Halili off at gunpoint.',
      lines: [
        ['3.1', 'A short way on, Halili crosses paths with Zadrani of Tetova, who confronts him on the spot: run while there is time, cursed one — two of my own kinsmen have fallen to your blade in this same fight.', "Pak ma andejna kur â shkue, / Asht ndeshë në Zadranin e Tetovës. / Qai Zadrani Halilit po i thotë: / - Dredh, Halil, zoti të vraftë, / Dy kushrij në ket luftë qi i ke pre."],
        ['3.2', 'Halili threw the accusation straight back at him: it was you who killed Gjeto Basho Mujo.', "Halili Zadranit po i thotë: / - Ma ke pre Gjeto Basho Mujin."],
        ['3.3', 'Zadrani swore a great oath that Mujo had not set foot in the Green Valleys that day, and warned Halili to turn back — his rifle struck true however crookedly he aimed it, and it would kill him if he came any closer.', "Në të madhin zot be i ka ba, / Se «në Lugje t'verdha Muji sod s'â kenë.» / Prapu Halil, ma kndej mos hajde, / E kam pushkën habertare, / Shtrembët ta mbaj, Halil, ndrejtë të bjen!"],
      ],
      cast: {
        halili: ['valley', 'trades accusations with Zadrani, each blaming the other for a kinsman\'s death'],
        zadrani: ['valley', 'swears Mujo is untouched and warns Halili off at gunpoint'],
      },
      items: { pushka: ['zadrani', 'aimed however crookedly, it strikes true'] },
    },
    {
      id: 'death', title: 'Halili falls',
      note: 'Halili spurs on without checking his courser. Zadrani\'s rifle finds its mark, and the boy drops dead on the spot.',
      lines: [
        ['4.1', 'Halili spurred his courser straight on without checking — but Zadrani\'s rifle struck him at the neck of his cartridge-belt, and the boy dropped dead to the ground.', "Hiç Halili gjogun s'e ka ndalë. / E ka dredhë pushkën habertare, / Në qafë të sylahit Halilit po i bjen, / Dekun në tokë djali kenka ra."],
      ],
      cast: {
        halili: ['valley', 'shot through the cartridge-belt at the neck, dead before he strikes the ground'],
        zadrani: ['valley', 'fires the shot that kills Halili'],
      },
    },
    {
      id: 'lament', title: 'Zadrani\'s grief',
      note: 'Zadrani lays the body out properly and breaks into a lament of his own — not for Halili\'s death alone, but for what Mujo will do to him now.',
      lines: [
        ['5.1', 'And what does Zadrani of Tetova do next? He winds the body in a white shroud, settles it in the shade with the head and feet set straight, and breaks into real mourning of his own — pity him, he cries, for what Mujo will do once he learns of this.', "Prit çka ban Zadrani i Tetovës! / Ja ka vndue nji rubë të bardhë, / Nën nji hije djalin ma ka qitë, / Ja ka vu tu kambët e tu kryet, / E ka marrë vajin e po bërtet: / - Mjeri un, mjeri, Sokole Halili! / Zot, ku i pshtoj Gjeto Basho Mujit?"],
      ],
      cast: {
        zadrani: ['valley', 'shrouds Halili\'s body with real grief, already dreading what Mujo will do'],
        halili: ['valley', 'laid out in the shade, shrouded in white'],
      },
    },
    {
      id: 'reverseLie', title: 'The lie in reverse',
      note: 'Mujo comes back down among his companions — and Osmani, done with Halili, tells him the very same lie turned around: it is Halili who has gone off to the Green Valleys.',
      lines: [
        ['6.1', 'Mujo came back down among his companions — and Arnaut Osmani, who hated him, told him the opposite lie in turn: damn you, Mujo, where have you been? Halili has long since gone off to the Green Valleys.', "Tu shokët Muji kenka ra. / Prit çka i thotë Arnaut Osmani, / Inatçuer Mujin e ki' pasë: / - Ku je, Muj, zoti të vraftë, / Se kaherë Halili në Lugje t'verdha â ra."],
      ],
      cast: {
        mujo: ['camp', 'returns from scouting and is told, in turn, that Halili has gone to the Green Valleys'],
        osmani: ['camp', 'sends Mujo racing off exactly as he sent Halili'],
      },
    },
    {
      id: 'discovery', title: 'A hand comes away in blood',
      note: 'Mujo rides into the Green Valleys and comes on Halili — still thinking him only asleep, until his own hand tells him otherwise. Then he sights Zadrani through his field-glass.',
      lines: [
        ['7.1', 'Mujo pushes on into the Green Valleys, his courser splashing through spilled blood, and stumbles straight onto his own brother. Taking him for merely lazy, he barks at him to quit napping through an entire battle — some example this sets for the rest of the camp — then reaches down to shake him by the shoulder, and his hand comes back dark and wet.', "Në Lugje t'verdha Muji â ra, / Gjogu not për gjak po i shkon, / Me Halilin Muji asht ndeshë. / - Hajt, Halil, zoti të vraftë, / Zanat të keq, bir, më ke msue, / Tanë ket luftë gjumi për me t'marrë. / Ja ka çue dorën në krahnuer, / Rrash me gjak dora iu ka mbushë."],
        ['7.2', 'Raising the field-glass to his eye, he recognizes Zadrani at once and roars out in fury: children are easy prey — let him see what happens against Gjeto Basho Mujo instead!', "Ma ka vu turbinë në sy, / Mirë po e sheh Zadran e Tetovës, / Ja ka lshue nji za fort t'idhtë: / - Kollaj, thotë, me fmi me luftue, / Prit 'i herë Gjeto Basho Mujin!"],
      ],
      cast: {
        mujo: ['valley', 'finds what he thinks is a sleeping brother, learns the truth by the blood on his own hand, then sights Zadrani and roars a challenge'],
        halili: ['valley', 'found already dead — the brother Mujo scolded before he understood'],
        zadrani: ['valley', 'sighted through Mujo\'s field-glass, marked for the reckoning'],
      },
      exit: ['halili'],
    },
    {
      id: 'confront', title: 'Wait, shkja',
      note: 'Mujo closes the distance in an instant. Zadrani denies any blame for Halili and warns him off with the very same rifle — and both men fire and stand unharmed.',
      lines: [
        ['8.1', 'Mujo bore down on him like smoke and dust, closing the distance in an instant — wait, shkja, he shouted. Zadrani called back: turn back, Mujo, damn you, Halili\'s death is none of my doing.', "Tim e mjegull gjogun e ka ba, / Ngjet Zadranit Muji iu ka avitë. / Prit shka i thotë Zadrani i Tetovës! / - Prapu, Muj, bre zoti të vraftë, / Se Halilin çartë nuk ta kam."],
        ['8.2', 'Mujo swears by his own God that Zadrani will not get free of him now while he still draws breath. Zadrani calls on that same God right back and warns him not to come any nearer — however awkwardly he levels that rifle, it never misses its mark.', "- Pasha 'i zot, Zadran, qi më ka dhanë, / Kurr për të gjallë un ty nuk t'lshoj. / - Pasha 'i zot, Muj, qi më ka dhanë, / Ti ma kndejna, Muj, për me m'ardhë, / E kam pushkën, Muj, habertare, / Shtrembët ta mbaj e ndrejtë të bjen."],
        ['8.3', 'Mujo spurred on without flinching, and Zadrani\'s rifle struck him at the very same spot it had killed Halili — yet Mujo did not fall. He turned his own rifle on Zadrani and struck him back the same way.', "Hiç Muja gjogun s'e ka ndalë. / E ka dredhë pushkën habertare, / Në qafë të sylahit Mujos i ka ra, / Hiç Muji prej gjogut nuk rrxohet. / E ka dredhë Muji pushkën habertare / Në qafë të sylahit, tha, Muja i ka ra,"],
      ],
      cast: {
        mujo: ['valley', 'closes on Zadrani, takes the same rifle-shot that killed Halili, and does not fall'],
        zadrani: ['valley', 'denies any blame, then fires and is fired on in turn — and neither man goes down'],
      },
      items: { pushka: ['zadrani', 'fired at Mujo now, at the very same mark it struck Halili'] },
    },
    {
      id: 'grapple', title: 'Three days and three nights',
      note: 'Both still standing, the two seize each other by the throat and grapple three days and nights, until Zadrani, the stronger, throws Mujo to the ground.',
      lines: [
        ['9.1', 'Both men were still alive and standing, and they seized each other by the throat — three days and three nights they grappled there, until Zadrani, the stronger of the two, threw Mujo down to the ground.', "Të dy gjallë aty kenkan mbetë, / Të dy fytas qaty kenkan kapë. / Janë kapë tri dit e tri net. / Rrezik Muja e ki' pasë, / Zadrani Mujin e ka rrxue"],
      ],
      cast: {
        mujo: ['valley', 'grapples Zadrani three days and nights, and is finally thrown to the ground'],
        zadrani: ['valley', 'the stronger through three days\' grappling, throws Mujo down at last'],
      },
    },
    {
      id: 'dagger', title: 'A dagger already in his pocket',
      note: 'Beaten to the ground, Mujo begs three words in Turkish and cries out to the zana sisterhood — who tell him of a poisoned dagger, hidden in his own pocket all along, that he never knew he carried.',
      lines: [
        ['10.1', 'Mujo asks whether Zadrani will let him speak three Turkish words first. Zadrani tells him to say whatever he wants, Gjeto Basho Mujo.', "Edhe Muja Zadranit po i thotë: / - Tri fjalë turçe a po m'len me i thanë? / - Fol shka t'duesh, Gjeto Basho Muja!"],
        ['10.2', 'Mujo cried out to the zanas on the cliff: where are you, blessed ones of the night, who have been my own sworn sisters and helped me through every danger before this one — Zadrani is taking my very soul!', "Zanave në shkamb Muja m'u ka britë: / - Ju ku jeni të lumet e natës, / Qi probatesha juve u ko' pa' xanë, / Gjithë tu të bij ma ngusht e ma / Edhe ndimë kini me m'dhane, / Se Zadrani shpirtin po ma merr?"],
        ['10.3', 'The zanas called down from the cliff: put your hand in the pocket of your cloak — you\'ll find a poisoned dagger there. Drive it straight into his side, and Zadrani\'s own life will leave him with it.', "Tha, i ka britë zana prej shkambit: / - Shtjere dorën në xhep të dollamës, / Se aty gjen thikën e helmatisun! / Sall në bri Zadranit t'ja vndosh, / Se edhe shpirti Zadranin e lshon,"],
        ['10.4', 'He reached into his pocket, found the poisoned dagger, and drove it into Zadrani\'s side — and there, on top of Mujo, Zadrani breathed his last.', "Ma ka shti dorën në xhep, / Ma ka gjetë thikën e helmatisun / E në bri Zadranit ja vndon. / Përmbi Mujin shpirtin po e lshon."],
      ],
      cast: {
        mujo: ['valley', 'calls on the zana sisterhood in his own tongue, finds the hidden dagger, and drives it home'],
        zanat: ['valley', 'answer from the cliff and name the dagger already in Mujo\'s own pocket'],
        zadrani: ['valley', 'stabbed through the side with the zanas\' own poisoned dagger, and dies on top of Mujo'],
      },
      items: { thika: ['mujo', 'found in his own pocket at the zanas\' word, and driven into Zadrani\'s side'] },
    },
    {
      id: 'serpents', title: 'Three serpents',
      note: 'Too heavy to roll off, Zadrani\'s body pins Mujo until the zanas fly down to free him. Cutting the body open, Mujo finds the hidden reason it took so much to kill him — and closes the song mourning a reckoning he can no longer undo.',
      lines: [
        ['11.1', 'Mujo could not roll the body off himself — so heavy was Zadrani\'s weight that his own breath was being crushed from him — and he cried out to the zanas once more: I have killed Zadrani, but I cannot roll him off, and my own soul is going out under him.', "Tha, nuk po mund Muji me e rrotullue, / Sa burrë i madh qi ki' qillue! / Zanave Muja në shkamb u ka britë: / - Zadranin, zanë, e kam mbytë, / Po nuk po muj me e rrotullue / E nën te shpirti po më lshon."],
        ['11.2', 'Three zanas flew down at once and rolled Zadrani\'s body off him. Mujo cut the body open and found three serpents coiled inside its belly — two still asleep, and one already awake.', "Tri zanët fluturim janë çue / E Zadranin e kanë rrotullue. / Ma merr Muji Zadranin e ma çilë, / Tre gjarpij në bark ja ka gjetë, / Dy in kanë fjetë e nji veç çue."],
        ['11.3', 'Mujo cried out in sorrow: had I only known what kind of man you truly were, I would have forgiven you Halili\'s death, and the two of us together could have ruled over Turk and Christian alike.', "- Mjeri, mjeri, Muja tek ka ba, / Ta kish dijtë, se ksi burri je / E Halilin ty ta kishe falë, / Kim sundue turk edhe kaurr."],
      ],
      cast: {
        mujo: ['valley', 'freed by the zanas, cuts the body open, and mourns a reckoning he can no longer undo'],
        zanat: ['valley', 'fly down and roll Zadrani\'s body off Mujo'],
        zadrani: ['valley', 'cut open at last — three serpents in his belly, the secret of the strength that killed Halili and nearly killed Mujo too'],
      },
      exit: ['zadrani'],
    },
  ],
}
