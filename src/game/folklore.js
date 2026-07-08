// A library of every Albanian folklore figure/tale/legend the game references.
// Each entry is one library card. `sources` links come straight from docs/albanian-folklore.md.
//
// `category` is EXACTLY one of:
//   'Deity' | 'Creature' | 'Fairy' | 'Legend' | 'Folktale' | 'Epic' | 'Custom'
//
// Summaries describe the REAL tale/figure as told in the folklore doc, so a
// reviewer can check the game's endings against the canon.

export const FOLKLORE = [
  // ── Deities ──────────────────────────────────────────────────────────────
  {
    id: 'zojz',
    title: 'Zojz — the sky-father',
    category: 'Deity',
    summary:
      'The supreme Albanian sky-and-thunder god, whose name is the reflex of Proto-Indo-European *Dyēus, making him a true cognate of Zeus and Jupiter. He dwells on the highest, least-accessible peaks and hurls lightning; he is reconstructed by scholars (often identified with the white-bearded father-god of Mount Tomorr, served by she-eagles and the winds). The thunderbolt seeks the tall tree and the proud.',
    sources: [
      { label: 'Zojz (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zojz_(deity)' },
      { label: 'Tomorr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Tomorr' },
    ],
    related: ['hena', 'prende', 'i-verbti', 'shurdhi', 'tomor-shpirag'],
  },
  {
    id: 'dielli',
    title: 'Dielli — the Sun / i Bukuri i Qiellit',
    category: 'Deity',
    summary:
      'The male solar deity, "god of light, sky and weather, giver of life… the all-seeing eye," the central object of veneration sworn by in oaths. In folktale the Beauty of the Sky (i Bukuri i Qiellit) is the masculine Sun — the highest of the three Beauties — the open-day counterpart to the Earthly Beauty (in the dark spring) and the Beauty of the Sea (in the deep). Festivals and fires track the strengthening of the Sun.',
    sources: [
      { label: 'Dielli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dielli_(Albanian_paganism)' },
    ],
    related: ['maiden-promised-sun', 'nena-e-diellit', 'hena', 'bija-hene-diell', 'dita-e-veres', 'dodola'],
  },
  {
    id: 'hena',
    title: 'Hëna — the Moon',
    category: 'Deity',
    summary:
      'The female Moon deity, counterpart and (in many tales) wife or sister of the Sun; together Sun and Moon form a celestial pair that dominates traditional Albanian tattooing and gravestones. As a married pair they parent E Bija e Hënës dhe e Diellit, the lightning-maiden. The Moon is the cool night-eye that watches but does not judge; people sowed by the waxing moon and reaped by the full.',
    sources: [
      { label: 'Hëna (Wikipedia)', url: 'https://en.wikipedia.org/wiki/H%C3%ABna_(Albanian_paganism)' },
    ],
    related: ['dielli', 'bija-hene-diell', 'shtojzovalle', 'zojz'],
  },
  {
    id: 'prende',
    title: 'Prende — Zoja e Bukurisë, the Lady of Beauty',
    category: 'Deity',
    summary:
      'Goddess of love, beauty and the dawn, "Zoja e Bukurisë," remembered as daughter of the sky-father; her day is Friday (e premte) and the rainbow (ylberi) is her belt. Often identified with E Bukura e Dheut as a Persephone-like figure of love, fertility and the spring cycle. Folk belief holds that whoever jumps over the rainbow — Prende\'s belt — changes sex.',
    sources: [
      { label: 'Prende (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Prende' },
    ],
    related: ['bukura-e-dheut', 'zojz', 'tomor-shpirag', 'dita-e-veres'],
  },
  {
    id: 'i-verbti',
    title: 'i Verbti — the Blind One',
    category: 'Deity',
    summary:
      'A fire-, wind- and thunderstorm god ("the Blind One," also Shën Verbti); in Zadrima he fans flame and moves water, in the northern Alps he rides the storm clouds. A moral god who punishes uncleanliness and foul speech. Christianity demonised him — it was said that to invoke him wrongly would blind you with fire — yet folk belief held him more powerful than the Christian God. The wise cover their faces and let him pass.',
    sources: [
      { label: 'i Verbti (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Verbt' },
    ],
    related: ['shurdhi', 'zojz', 'drangue'],
  },
  {
    id: 'shurdhi',
    title: 'Shurdhi — the storm-and-hail god',
    category: 'Deity',
    summary:
      'A northern weather-and-storm god who hurls thunder and lightning and brings crop-killing hailstorms, travelling on storm clouds; closely parallel to i Verbti. He is no giver of gentle rain. People drove him off not with prayer but with noise — banging iron and firing guns into the sky — to turn the hail aside.',
    sources: [
      { label: 'Shurdh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Shurdh' },
    ],
    related: ['i-verbti', 'zojz', 'drangue'],
  },
  {
    id: 'nena-e-diellit',
    title: 'Nëna e Diellit — the Mother of the Sun',
    category: 'Deity',
    summary:
      'A mother-goddess of the sky, fields and herds. In a spring rite near Pentecost the girls of a village mould a clay doll, name her the Sun\'s Mother, and carry her out to bury her with real weeping and lament ("Mother, oh Mother, the Sun came and did not find you") — staging the goddess\'s own death and burial so that, mourned and laid to rest, she returns green with the turning year.',
    sources: [
      { label: 'Dielli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dielli_(Albanian_paganism)' },
    ],
    related: ['dielli', 'dita-e-veres', 'dodola', 'maiden-promised-sun'],
  },
  {
    id: 'bija-hene-diell',
    title: 'E Bija e Hënës dhe e Diellit — Daughter of the Moon and Sun',
    category: 'Deity',
    summary:
      'The "Daughter of the Moon and Sun," a lightning-maiden (pika e qiellit, "drop of the sky") born of the married Sun and Moon. She descends to strike down pride and evil; in the tale retold by Mitrush Kuteli (Tregime të moçme shqiptare, 1965) she does not slay with a bolt but freezes the Kulshedra with a single glance, and it withdraws forever into the depths of the earth — her victory dramatizing the supremacy of sky over the chthonic dark. (The "star on the brow" maiden and the eclipse-swallowing belong to other tales — the ATU 707 star-children and the Kulshedra respectively — not to her.)',
    sources: [
      {
        label: 'E Bija e Hënës dhe e Diellit (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/E_Bija_e_H%C3%ABn%C3%ABs_dhe_e_Diellit',
      },
    ],
    related: ['dielli', 'hena', 'drangue'],
  },

  // ── The three Beauties ───────────────────────────────────────────────────
  {
    id: 'bukura-e-dheut',
    title: 'E Bukura e Dheut — the Beauty of the Earth',
    category: 'Fairy',
    summary:
      'The most important figure of Albanian folktale: at once a crafty otherworld fairy and a chthonic goddess of the underworld and of springtime — an Albanian Persephone, sometimes linked by scholars (Elsie) to the dawn/love goddess Prende. She lives in a mystical underworld palace; the hero\'s quest to find or rescue her is the most frequent motif in the tales (and the spine of Aventura Shqip). Her hand is won by the one who heeds her trials, not the one who grabs.',
    sources: [
      { label: 'E Bukura e Dheut (Wikipedia)', url: 'https://en.wikipedia.org/wiki/E_Bukura_e_Dheut' },
    ],
    related: ['bukura-e-detit', 'prende', 'tomor-shpirag', 'scurfhead', 'three-friends', 'snake-bridegroom'],
  },
  {
    id: 'bukura-e-detit',
    title: 'E Bukura e Detit — the Beauty of the Sea',
    category: 'Fairy',
    summary:
      'The Beauty of the Sea, sister of the Earthly and Sky Beauties and the third of the tripartite Beauties — a sea-fairy of beauty, danger and mystery, kin to the water-nymphs (perria e detit, floçka, zana e ujit). (The "won by a single strand of her golden hair, then a faithful wife" motif belongs to her sister E Bukura e Dheut, not to the Sea Beauty.)',
    sources: [
      { label: 'E Bukura e Detit (Wikipedia)', url: 'https://en.wikipedia.org/wiki/E_Bukura_e_Detit' },
    ],
    related: ['bukura-e-dheut', 'flocka', 'gjizar'],
  },

  // ── Guardian & fairy beings ──────────────────────────────────────────────
  {
    id: 'mujo-strength',
    title: 'The making of Mujo — the Zanas\' gift of strength',
    category: 'Epic',
    summary:
      'How the frontier-warrior Mujo got his strength: lost in a thunderstorm he finds two cradles by a great boulder and rocks the unseen children to sleep all night. At dawn their mothers, the Zana mountain-fairies, reveal themselves and offer him a choice — wealth, knowledge, or a hero\'s strength. He chooses strength and they suckle him, granting power otherwise found only in a Drangue; thereafter the Zanas are his sworn sisters and protectors.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
      { label: 'Zana (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zana_(mythology)' },
    ],
    related: ['kreshnik-epic', 'mujo-zanas', 'mujo-courser', 'zuku-bajraktar', 'mujo-avenges-halil'],
  },
  {
    id: 'ora',
    title: 'Ora — the personal fate-spirit & the three Fates',
    category: 'Fairy',
    summary:
      'Every Albanian is born with an Ora, a female guardian-and-fate-weaver assigned for life — a personal fortuna who can take any form (bird, beast, woman, serpent). The Dukagjin highlands speak of three Fates: e Bardha ("the White," good luck), e Verdha ("the Yellow," bad luck and spells), and e Zeza ("the Black," who decides death). Three nights after a birth they convene at the cradle to fix the child\'s destiny; families set out bread so the Fates bless rather than curse. Treasures, too, have a protective Ora, often in serpent form.',
    sources: [
      { label: 'Ora (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ora_(mythology)' },
    ],
    related: ['shtojzovalle', 'vitore', 'gjakova-cavern', 'zuku-bajraktar', 'hospitality'],
  },
  {
    id: 'shtojzovalle',
    title: 'Shtojzovalle — the airy moonlight fairies',
    category: 'Fairy',
    summary:
      'Small, beautiful woodland fey of both sexes ("may God increase their dance") who dance under the moonlight and spin the thread of human life. Normally invisible — seen only by lifting an unseen veil from your eyes — they are dangerous: step on one and you may be devoured, join their round and you dance on, and a fairy\'s tear falling on a mortal is death. A man can keep a shtojzovalle bride only by giving her his own clothes to wear, and only by treating her with unfailing gentleness.',
    sources: [
      { label: 'Zana (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zana_(mythology)' },
    ],
    related: ['hena', 'peri', 'ora', 'dita-e-veres'],
  },
  {
    id: 'flocka',
    title: 'Floçka — the water-maiden',
    category: 'Fairy',
    summary:
      'Long-haired female water-spirits of springs, lakes and hidden mountain tarns (named for flokë, "hair"), protectors of the waters who can pull the unwary under; they are said not to speak Albanian, though a mortal can teach them (a Kelmendi/Shkodër tradition). In one tale (the Legend of the Gërzheta) a Floçka is caught and kept by a man, bound to his house by a besa and silent for years, and the day the oath breaks she slips back beneath the water — the rare power won not by the sword but by a word.',
    sources: [
      { label: 'Floçka — long-haired water-spirits (Wikipedia draft)', url: 'https://en.wikipedia.org/wiki/Draft:Flo%C3%A7ka' },
    ],
    related: ['snake-bridegroom', 'syri-kalter', 'bukura-e-detit'],
  },
  {
    id: 'peri',
    title: 'Peri — the borrowed word for fairy',
    category: 'Fairy',
    summary:
      'Peri (from Turkish peri, ultimately Persian pari) is a borrowed word for fairy, used in Albanian folklore largely as a synonym or coastal variant of the native zana/orë rather than a distinct endemic mountain spirit. As with the fairies generally, folk belief warns that the perí reward those who honour bread and hospitality and punish those who waste it — a bread-and-grace motif shared with the zana/orë lore, not unique to them.',
    sources: [
      { label: 'Zana (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zana_(mythology)' },
    ],
    related: ['shtojzovalle', 'hospitality', 'wolf'],
  },
  {
    id: 'vitore',
    title: 'Vitore — the household serpent',
    category: 'Creature',
    summary:
      'A household divine serpent tied to destiny, fortune and the souls of the ancestors. When the Vitorja dwells in a house\'s walls it brings good luck and its hissing announces important events; the family treats it with great respect, for to kill it is to court ruin. Its name is read as "she who spins" (from the loom), tying the house-serpent to the weaving of fate. A greedy family that killed such a serpent to seize its gold saw their house burn and their line fail.',
    sources: [
      { label: 'Vitore (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vitore' },
    ],
    related: ['ora', 'gjakova-cavern', 'bolla', 'stihi', 'snake-bridegroom'],
  },

  // ── The eternal duel & serpent-monsters ──────────────────────────────────
  {
    id: 'drangue',
    title: 'Drangue — the storm-hero',
    category: 'Creature',
    summary:
      'A semi-human winged divine hero, the archetype of light and good, and the eternal foe of the Kulshedra. Babies destined to become drangue are born with a caul and wings under the arms; they wield thunder and lightning, hurling "thunder-stones" (kokrra rrufeje), uprooted trees and boulders at the dragon during storms (the rumble of a thunderstorm is the Drangue fighting in the clouds). The protector of the community and the crops; he almost always wins, and the rains return.',
    sources: [
      { label: 'Drangue (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Drangue' },
    ],
    related: ['kulshedra', 'bolla', 'wolf', 'bija-hene-diell', 'i-verbti', 'shurdhi'],
  },
  {
    id: 'kulshedra',
    title: 'Kulshedra — the drought-dragon',
    category: 'Creature',
    summary:
      'A huge, multi-headed, fire-spitting female serpent-dragon (also Kuçedra), the archetype of darkness, drought and disaster. She withholds rain and hoards water, causing drought, and demands human sacrifice — often a maiden — to release the springs; she spits fire and causes storms, floods, hail and earthquakes. She is the mature form of the Bolla. A sea-form (Kuçedra e Detit) brews the storms that break ships.',
    sources: [
      { label: 'Kulshedra (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kulshedra' },
    ],
    related: ['drangue', 'bolla', 'lubia', 'stihi', 'sari-salltek', 'scurfhead'],
  },
  {
    id: 'bolla',
    title: 'Bolla — the blind St-George serpent',
    category: 'Creature',
    summary:
      'A serpentine dragon, the first stage of the snake\'s life-cycle that ends in the Kulshedra. A snake unseen by humans for years becomes a Bolla, which sleeps with its eyes shut all year and opens them only on St George\'s Day (Shëngjergj); anyone it sees is devoured. Saint George cursed it to be forever blind except on his feast day. Left to live, it grows to a bullar, then sprouts wings, then becomes a Kulshedra.',
    sources: [
      { label: 'Kulshedra (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kulshedra' },
    ],
    related: ['kulshedra', 'drangue', 'vitore', 'lubia'],
  },
  {
    id: 'lubia',
    title: 'Lubia — the southern she-demon',
    category: 'Creature',
    summary:
      'A water-and-storm she-demon of the south, the southern sister of the Kulshedra: a many-headed serpent (seven to a hundred heads, which regrow when cut, like the Hydra). She dwells in a vegetable garden, dries up the springs, and has a monstrous appetite — especially for little girls — so a maiden must be given before the waters return. Like Herakles with the Hydra, a hero must sear each neck with fire as he strikes so no head can grow back.',
    sources: [
      {
        label: 'Albanian legendary creatures (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Category:Albanian_legendary_creatures',
      },
    ],
    related: ['kulshedra', 'bolla', 'three-friends', 'sari-salltek', 'syri-kalter'],
  },
  {
    id: 'stihi',
    title: 'Stihí — the fire-breathing treasure-guardian',
    category: 'Creature',
    summary:
      'A fire-breathing guardian demon, female in Tosk and Arbëresh belief, set to guard treasure and hidden places — close kin to the Kulshedra. Her name comes from stuhí ("storm/gale"), from Greek stoicheíon ("element/elemental spirit"). A hoard kept by a Stihi is no more for the taking than the lightning is; only those who leave her cave empty-handed leave it alive.',
    sources: [
      {
        label: 'Albanian legendary creatures (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Category:Albanian_legendary_creatures',
      },
    ],
    related: ['kulshedra', 'gjakova-cavern', 'vitore'],
  },

  // ── Witches, undead, giants ──────────────────────────────────────────────
  {
    id: 'shtriga',
    title: 'Shtriga — the vampiric night-witch',
    category: 'Creature',
    summary:
      'A vampiric night-witch, usually an old (or childless, envious) woman, who sucks the blood and life of sleepers — especially infants — and then turns into a flying insect (moth, fly or bee). She may lure a kind traveller off the night road with a feigned "lost child." To repel her: throw a pinch of salt into the fire (with garlic and incantations), which makes her shriek, shrink to a moth, and flee before dawn.',
    sources: [
      { label: 'Shtriga (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Shtriga' },
    ],
    related: ['evil-eye', 'kukudh', 'dhampir'],
  },
  {
    id: 'karkanxholl',
    title: 'Karkanxholl — the chain-dragging Christmastide revenant',
    category: 'Creature',
    summary:
      'An iron-shirted goblin-revenant that roams the twelve dark nights between Christmas and Epiphany, dragging chains through the snow and breathing a deadly breath — a borrowing/areal parallel of the Greek kallikantzaros, not a native undead. It knocks in the night, and whoever opens is cursed or carried off; the wise keep the door barred, and only a dhampir can see and fight one.',
    sources: [
      { label: 'Lugat (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lugat' },
    ],
    related: ['kukudh', 'dhampir', 'constantine-doruntine'],
  },
  {
    id: 'kukudh',
    title: 'Kukudh — the strangled miser-revenant',
    category: 'Creature',
    summary:
      'The word covers three regionally distinct beings, not one: the hardened stage of a lugat left too long unburned (around Mount Tomorr above all); the restless soul of a miser haunting his house; and, in the south, a blind female plague-demon. In the revenant sense it is pictured short and stocky with a goat\'s tail, invulnerable to any blade, killable only by strangling with a noose of vine.',
    sources: [
      { label: 'Lugat (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lugat' },
    ],
    related: ['karkanxholl', 'dhampir', 'shtriga'],
  },
  {
    id: 'dhampir',
    title: 'Dhampir — the one who sees the undead',
    category: 'Creature',
    summary:
      'The half-living son a lugat or karkanxholl fathers on a widow — the only one who can see and destroy the otherwise-invisible undead ("the dhampir knows the lugat"). He knows the undead thing by sight, wrestles it down in the dark, and unmakes it. A dhampir\'s own grave is found by leading a virgin boy on a white stallion through the graveyard, where the horse balks.',
    sources: [
      { label: 'Lugat (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lugat' },
    ],
    related: ['karkanxholl', 'kukudh', 'shtriga', 'constantine-doruntine'],
  },
  {
    id: 'xhindi',
    title: 'Xhindi — the jinn of the threshold',
    category: 'Creature',
    summary:
      'Invisible spirits (from Arabic jinn, absorbed in the Ottoman centuries) that haunt thresholds, the hearth-ash, water and lonely places in the dead of night. Easily offended, able to help or harm: an unclean or careless foot among them — pouring water out at a threshold after dark, treading where you cannot see — brings sickness, fever or a wasting on the house. The wise move gently at the threshold and the water after dark.',
    sources: [
      {
        label: 'Albanian legendary creatures (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Category:Albanian_legendary_creatures',
      },
    ],
    related: ['hospitality', 'evil-eye'],
  },
  {
    id: 'katallan',
    title: 'Katallan — the one-eyed giant',
    category: 'Creature',
    summary:
      'A one-eyed giant/cyclops of the heroic tales, a brute who blocks the hero\'s path and eats travellers who stray into his cave (the Albanian counterpart of Homer\'s Cyclops). He is never beaten by strength, only by the cunning that puts out his single eye while he sleeps and then escapes the cave clinging to the belly of his own ram.',
    sources: [
      {
        label: 'Albanian legendary creatures (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Category:Albanian_legendary_creatures',
      },
    ],
    related: ['scurfhead', 'bear-dervish', 'hospitality', 'evil-eye'],
  },
  {
    id: 'wolf',
    title: 'The wolf — companion or grave (Të hângtë ujku!)',
    category: 'Creature',
    summary:
      'The wolf (ujku) is both a protective totem and a creature of the grave. It is the one beast that can force a lugat back into its grave — so the curse "Të hângtë ujku!" ("May the wolf eat you!") wishes a man an eaten corpse that can never rise as undead — while children were named Ujk/Ujkan and wolf-parts worn as apotropaic charms. A beggar in a wolf\'s skin, refused alms, could curse a miser\'s herds.',
    sources: [
      { label: 'Lugat — the wolf drives the lugat back into its grave (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lugat' },
    ],
    related: ['creation-wolf', 'lugat', 'kuma-lisa'],
  },
  {
    id: 'creation-wolf',
    title: 'Why the Wolf Devours (von Hahn 105)',
    category: 'Folktale',
    summary:
      'An etiological myth: the Devil moulded a wolf out of dough but could not give it life and begged God to. God breathed it alive with the words "devour your creator" — and the wolf turned at once and ate the Devil. That is why the wolf devours, and why the worst curse a mouth can carry is "Të hângtë ujku!" — may the wolf eat you.',
    sources: [
      {
        label: 'von Hahn, Griechische und albanesische Märchen (Internet Archive)',
        url: 'https://archive.org/stream/GriechischeUndAlbanesischeMarchenJohannGeorgVonHahn/GriechischeUndAlbanesischeMarchen-JohannGeorgVonHahn_djvu.txt',
      },
    ],
    related: ['wolf', 'cuckoo', 'swallow'],
  },

  // ── The great legends ────────────────────────────────────────────────────
  {
    id: 'rozafa',
    title: 'Rozafa — the walled-up wife',
    category: 'Legend',
    summary:
      'The most famous Albanian immurement legend (attested 1505), attached to Rozafa Castle at Shkodër. Three brothers cannot make their castle stand until a life is walled into the foundation; they swear a besa to say nothing to their wives and that whoever brings the next meal will be the sacrifice. Only the youngest keeps his oath, so his wife Rozafa comes. Accepting her fate, she asks that the wall leave open her right breast to nurse her infant son, right eye to see him, right hand to caress him, right foot to rock his cradle. The castle stands; people say her milk still seeps from the white stones. A hymn to the besa.',
    sources: [
      { label: 'Rozafa Castle (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Rozafa_Castle' },
    ],
    related: ['besa', 'tomor-shpirag', 'constantine-doruntine', 'ura-e-artes'],
    texts: [
      { label: 'Legjenda e Rozafës (Mitrush Kuteli) — full prose', lang: 'sq',
        url: 'https://www.voal.ch/legjenda-e-rozafes-nga-mitrush-kuteli/kulture/letersi/' },
    ],
  },
  {
    id: 'constantine-doruntine',
    title: 'Constantine and Doruntine — the besa beyond death',
    category: 'Legend',
    summary:
      'Doruntine is the only daughter among thirteen children. When a prince from a far country asks for her, the youngest brother Kostandin gives his mother his besa: "Be I dead or living, I\'ll return you Doruntine." War kills all twelve brothers. On a feast day the grieving mother curses her dead son for breaking his word; the curse raises Kostandin from the grave as a lugat, who rides through the night, brings Doruntine home on his horse, leaves her at the door and returns to his grave. When the truth is spoken, both mother and daughter fall dead. The moral: an Albanian will rise even from the grave to keep his besa.',
    sources: [
      {
        label: 'Constantin and Doruntinë (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Constantin_and_Doruntin%C3%AB',
      },
    ],
    related: ['besa', 'rozafa', 'aga-ymer', 'dhampir', 'karkanxholl', 'vajtim', 'kostandini-i-vogel'],
    texts: [
      { label: 'Besa e Kostandinit — full ballad/prose', lang: 'sq',
        url: 'https://www.voal.ch/besa-e-kostandinit-balade-popullore-shqiptare/kulture/letersi/' },
    ],
  },
  {
    id: 'gjergj-elez-alia',
    title: 'Gjergj Elez Alia — the wounded hero and the Baloz',
    category: 'Legend',
    summary:
      'A hero lies bedridden nine years with nine wounds, tended by his devoted sister. From the sea rises Balozi i Zi, the Black Baloz, a giant sea-monster that lays a heavy tribute on the coast — a maiden and a roast from every household — and at last demands Gjergj\'s own sister. Hearing this, the dying hero rises, arms himself, meets the Baloz, dodges its hurled stone and beheads it, freeing his people. He rides home; as brother and sister embrace with joy, both their hearts stop at once and they die together, buried in a single grave.',
    sources: [
      { label: 'Gjergj Elez Alia (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Gjergj_Elez_Alia' },
      { label: 'Baloz (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Baloz' },
    ],
    related: ['besa', 'vajtim', 'sari-salltek'],
  },
  {
    id: 'sari-salltek',
    title: 'Sari Salltëk — the dragon-slaying dervish',
    category: 'Legend',
    summary:
      'A St-George–type legend venerated by Bektashis and Christians alike. The wandering Bektashi dervish Sari Salltëk saves a princess from a seven-headed Kulshedra terrorising Krujë, pursues it into its cave, beheads it with a wooden sword, and pockets its seven tongues as proof against a false claimant who tries to steal the glory. He refuses the princess\'s hand; he is said to have seven graves in seven lands.',
    sources: [
      { label: 'Sari Saltik (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Sari_Saltik' },
    ],
    related: ['kulshedra', 'gjergj-elez-alia', 'syri-kalter', 'lubia', 'sons-of-eagle'],
  },
  {
    id: 'tomor-shpirag',
    title: 'Baba Tomor and Shpirag — the giants who fought over the Beauty',
    category: 'Legend',
    summary:
      'A place-origin legend: the mountains Tomorr and Shpirag were once giants who fought to the death over E Bukura e Dheut. White-bearded Baba Tomor (attended by four she-eagles) and Shpirag wounded each other mortally — Tomor\'s scythe gouged the long furrows down Shpirag\'s flank, Shpirag\'s cudgel cratered Tomor — and the Earthly Beauty drowned in her own tears, which became the river Osum. Their wounds can still be read in the mountains\' torn sides.',
    sources: [
      { label: 'Tomorr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Tomorr' },
    ],
    related: ['bukura-e-dheut', 'rozafa', 'prende', 'zojz'],
  },
  {
    id: 'syri-kalter',
    title: 'Syri i Kaltër — the Blue Eye spring',
    category: 'Legend',
    summary:
      'A place-origin legend near Saranda: a man-eating serpent/dragon on Mount Sopot is destroyed when an old man feeds it a burning straw-laden donkey; writhing, the monster\'s huge eye falls out and gushes water — the deep-blue spring, Syri i Kaltër, that "still cries" today. Sometimes the drought breaks not by the hero\'s sword but by the patient miracle of a spring that never runs dry.',
    sources: [
      { label: 'Blue Eye (spring) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Blue_Eye_(spring)' },
    ],
    related: ['sari-salltek', 'lubia', 'flocka'],
  },
  {
    id: 'sons-of-eagle',
    title: 'Sons of the Eagle — why Albanians are Shqiptarë',
    category: 'Legend',
    summary:
      'The national origin legend. A youth hunting in the mountains sees a great eagle carry a snake to its crag; while the eagle is away the snake rears to strike the eaglet in the nest, and the boy kills it and saves the chick. The grateful eagle grants him "the sharpness of my eyes and the strength of my wings," and he grows into a mighty hero-king. His people call him Shqiptar, "Son of the Eagle," and his land Shqipëria, "Land of the Eagles." (A poetic folk etymology, not historical philology.)',
    sources: [
      { label: 'The Tale of the Eagle (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Tale_of_the_Eagle' },
    ],
    related: ['scurfhead', 'sari-salltek', 'gjizar'],
  },

  // ── The heroic epic (Kângë Kreshnikësh) ──────────────────────────────────
  {
    id: 'kreshnik-epic',
    title: 'The Kângë Kreshnikësh — the frontier-warrior epic',
    category: 'Epic',
    summary:
      'Albania\'s great oral epic cycle, the "Songs of the Frontier Warriors": heroic songs of the kreshnikë, the giant border-warriors of the highlands. Its heroes are the brothers Gjeto Basho Muji and Sokol Halili, agas of Jutbina (Udbina), whose standing enemy is the Krajl (Slav king); their world is thick with Zana and Ora. The lays tell of duels, sieges, raids and rescues — when Muji is taken and thrown in a tower, the swift younger Halili rides alone into the Krajl\'s land, breaks into the prison and carries his brother home.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
    ],
    related: ['mujo-strength', 'mujo-zanas', 'mujo-courser', 'halil-marriage', 'mujo-avenges-halil', 'death-of-omer'],
  },
  {
    id: 'mujo-zanas',
    title: 'Mujo and the Zanas — the golden-horned goats',
    category: 'Epic',
    summary:
      'A song of the cycle: evil Zana petrify Mujo\'s wedding party to stone. Their power is hidden in goats with golden horns; by seizing the goats Mujo holds the Zanas\' very strength in his hands and forces them to swear a binding besa — to free the guests and never harm them again. Bound by the oath no Zana dares break, the stone wedding draws breath once more. It is the oath, not the gold, that saves them.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
      { label: 'Zana (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zana_(mythology)' },
    ],
    related: ['kreshnik-epic', 'mujo-strength', 'mujo-courser'],
  },
  {
    id: 'mujo-courser',
    title: 'Mujo\'s courser — the oracular warhorse',
    category: 'Epic',
    summary:
      'Mujo\'s steel-grey warhorse of the frontier songs: an oracular courser that foretells the future, grieves for a fallen rider, runs swift as the wind, and warns its rider of every danger before it comes. It shies from a cruel or unworthy hand and is won not by force but by being spoken to gently and earning its trust.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
    ],
    related: ['kreshnik-epic', 'mujo-strength', 'mujo-zanas'],
  },
  {
    id: 'halil-marriage',
    title: 'The Marriage of Halili — the bride-raid for Tanusha',
    category: 'Epic',
    summary:
      'Goaded that his young brother is still unwed, Mujo sends Halil to carry off Tanusha, daughter of the Krajl of Kotor — guarded on the road by the Sun, the Moon and the Zana. Halil reaches the Danube and disguises himself among her three hundred maidens; Tanusha knows him by a ring bearing his likeness, but the affair is found out and the king jails him. From his cell Halil sings on the lahutë; the song summons Mujo and the thirty agas, who storm the hall (Halil cuts down the king) and carry home both Halil and his bride — one of the rare frontier songs that ends in a wedding, not a grave.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
    ],
    related: ['kreshnik-epic', 'zuku-bajraktar', 'mujo-avenges-halil', 'death-of-omer'],
  },
  {
    id: 'zuku-bajraktar',
    title: 'Zuku Bajraktar — the standard-bearer and the bride won by besa',
    category: 'Epic',
    summary:
      'Zuk the standard-bearer is the hero of two distinct frontier songs. In "Zuku Bajraktar" (Palaj–Kurti no. 11) his own mother, in league with a Baloz her son had captured, has the too-strong Zuk blinded; an Ora heals his eyes with a mountain herb and he returns to slay the Baloz and burn the traitress. In "Zuku Captures Rusha" (no. 18) he rides into the Krajl\'s tower for Rusha across the frontier and will not carry her off until she swears him a besa that she comes of her free will — a bride won not by the sword but by the sworn word, for a maiden taken by force is a war, not a wedding.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
    ],
    related: ['besa', 'halil-marriage', 'mujo-strength', 'ora', 'aga-ymer'],
  },
  {
    id: 'mujo-avenges-halil',
    title: 'The blood answered — the brother\'s vengeance',
    category: 'Epic',
    summary:
      'Brother-vengeance runs all through the frontier cycle: a kreshnik treacherously killed must be answered in blood by his own. In the canonical lay (Palaj–Kurti no. 23, "Halili merr gjakun e Mujit") it is young Halili who avenges his elder brother Mujo of Jutbina, hunting the killer down; elsewhere Halili\'s own death is answered in turn. In the highland code a brother\'s blood, treacherously spilled, is the one debt that must be paid.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
    ],
    related: ['kreshnik-epic', 'halil-marriage', 'death-of-omer', 'kanun-blood-feud', 'mujo-strength'],
  },
  {
    id: 'death-of-omer',
    title: 'The Death of Omer & Ajkuna\'s Lament',
    category: 'Epic',
    summary:
      'Omer, Mujo\'s son, barely thirteen, is cornered in a churchyard and fights to the death; Mujo buries him under a mountain fir beneath a stone thirty men could not lift, and hides the death from the boy\'s mother. But Ajkuna — Omer\'s mother, Mujo\'s wife — learns of it, and her lament swells into a cry for every mother who loses a son to war, the mountains keening it back, until her own heart breaks at the graveside. It is the most beloved passage of the epic — the seam where the songs of war become the songs of grief.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
      { label: 'Vajtim and Gjëmë (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vajtim_and_Gj%C3%ABm%C3%AB' },
    ],
    related: ['kreshnik-epic', 'vajtim', 'halil-marriage', 'mujo-avenges-halil'],
    texts: [
      { label: 'Vajtimi i Ajkunës — full verse (Wikibooks, CC-BY-SA)', lang: 'sq',
        url: 'https://sq.wikibooks.org/wiki/Vajtimi_i_Ajkun%C3%ABs',
        local: 'docs/references/vajtimi-i-ajkunes.sq.txt' },
    ],
  },
  {
    id: 'aga-ymer',
    title: 'Aga Ymer of Ulcinj — the returning husband',
    category: 'Epic',
    summary:
      'An Albanian "returning husband" tale (the Odyssey / besa motif). Held captive abroad for nine years, Aga Ymer of Ulcinj is freed at last only on his besa to return. He reaches his door just as his faithful wife — who swore to wait nine years and nine days — is about to be wed to another; an old scar on his arm proves who he is. Then, his word unbroken, he mounts and rides all the way back to his chains — and the captor-king, awed that a man would ride back to prison to keep his word, sets him free for good. Not even a homecoming outweighs a sworn besa.',
    sources: [
      {
        label: 'Kângë Kreshnikësh (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors',
      },
    ],
    related: ['besa', 'constantine-doruntine', 'zuku-bajraktar', 'kostandini-i-vogel'],
    texts: [
      { label: 'Ymer Agë Ulqini — full song (Wikibooks, CC-BY-SA)', lang: 'sq',
        url: 'https://sq.wikibooks.org/wiki/Ymer_Ag%C3%AB_Ulqini',
        local: 'docs/references/ymer-age-ulqini.sq.txt' },
    ],
  },

  // ── The folktales ────────────────────────────────────────────────────────
  {
    id: 'scurfhead',
    title: 'The Scurfhead (Qerosi) — the dragon, the underworld, the eagle',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 2, source of the game\'s climax. A despised youngest son wounds a dragon eating the king\'s quinces and chases it into a hole in the ground, descending on a white-and-black rope. Below he finds the three Earthly Beauties; the dragon owns the water and takes a maiden a day, so he slays it at the well and the water gushes forth crimson with its blood. Betrayed and abandoned below by his brothers, he saves a nest of eaglets from a snake; the grateful mother eagle bears him to the surface — fed bread, mutton and water on the long flight up (the "hero feeds the eagle his own flesh" motif belongs to other versions, ATU 301, which the game borrows for "Flesh for the Eagle").',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['kulshedra', 'bukura-e-dheut', 'sons-of-eagle', 'gjizar', 'three-friends', 'katallan'],
  },
  {
    id: 'three-friends',
    title: 'The Three Friends and the Earthly Beauty (Kordha, Ylli, Deti)',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 3: a blood-brotherhood and Kulshedra-slaying quest. A widow\'s son polishes his dead father\'s rusted sabre and renames himself Kordha ("the Sabre"); he swears brotherhood with Ylli ("the Star," whose strength leaps a castle moat carrying all three) and Deti ("the Sea," who dives to any floor). They vow that if one is in danger all will know. Kordha takes the deadly road to the Earthly Beauty, slays Kulshedra, and passes her tests by being clever — drinking the spring with his hands not his knees, picking the apple by hand not teeth. His own life is hidden in his blade (an "external soul"); should he tell where, an enemy could steal it and cast it in the sea.',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['bukura-e-dheut', 'lubia', 'scurfhead'],
  },
  {
    id: 'snake-bridegroom',
    title: 'The Snake and the King\'s Daughter — the serpent bridegroom',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 13 (ATU 425). A childless old woman raises a snake as her son; with a magic ring he meets the king\'s impossible bridal conditions and weds the princess. By night the snake sheds his skin to become a youth named Swift, on the vow that she never tell — but the secret is goaded out and he vanishes, carried off by a Kulshedra beyond the sea. Because she had never wronged him she can follow: she walks the world in iron shoes asking the Sun, Moon and Wind, and frees him not by force but by wit (answering the Kulshedra\'s impossible chores with cleverer tricks). It is the long faithful search, never mere silence, that frees the snake-husband.',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['bukura-e-dheut', 'flocka', 'goose-girl', 'vitore'],
  },
  {
    id: 'gjizar',
    title: 'Gjizar the Nightingale',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 14 (ATU 550). A king wants Gjizar the nightingale to sing in his mosque, but the bird sings only in the palace of the Earthly Beauty, far down the road of no return. The youngest son, helped by a hungry woman he fed and her eagle, reaches the hall and — while the Beauty sleeps and the candle burns — slips the caged nightingale away quietly. His brothers betray him, taking the cage and leaving him in a well, but the bird falls silent in their false hands and will not sing; the Beauty follows it, the truth comes out, and Gjizar sings the moment it is the true winner\'s again. A nightingale sings only for the one who truly won it.',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['scurfhead', 'sons-of-eagle', 'bukura-e-detit', 'goose-girl'],
  },
  {
    id: 'maiden-promised-sun',
    title: 'The Maiden Who Was Promised to the Sun',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 22. A childless queen begs Dielli the Sun for a daughter and vows the child to him at twelve; the Sun duly carries her off to his house in the sky. A Kulshedra in his house wants to eat her — the Sun tests it ("If you were hungry, what would you eat?" "I\'d eat her") and so sends a stag, not the dragon, to bear her safely home. In this tale the Sun is no tyrant but her protector; the only way to lose her is to overrule him and keep the Kulshedra, or to let her climb down from the tree before the stag comes.',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['dielli', 'goose-girl', 'nena-e-diellit'],
  },
  {
    id: 'goose-girl',
    title: 'The Goose-Girl and the Marble King',
    category: 'Folktale',
    summary:
      'The disenchantment-vigil that forms the SECOND HALF of Elsie tale 22 ("The Maiden Promised to the Sun"). A locked garden shuts a girl in among people and beasts of marble with a marble king whose scroll promises life to whoever keeps a three-week vigil. Worn out at the last, she buys a maidservant to watch while she sleeps; the servant steals her place, dressing in her clothes and telling the woken king she kept watch, and he marries her. Demoted to goose-girl, the true heroine weeps her tale aloud in her hut until the king overhears, learns the truth, and takes her for his wife. (Its "goose-girl" name is only a surface echo — this is the enchanted-spouse vigil family, ATU 425/410, with a substituted-bride motif, not the Falada tale ATU 533.)',
    sources: [
      {
        label: 'Elsie, Albanian Folktales and Legends — tale 22 (the marble-king/goose-girl vigil is its second half)',
        url: 'http://www.albanianliterature.net/folktales/tale_22.html',
      },
    ],
    related: ['maiden-promised-sun', 'snake-bridegroom', 'gjizar'],
  },
  {
    id: 'half-rooster',
    title: 'The Half-Rooster (Gjysmëkokoshi)',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 15 (ATU 715, "Half-Chick"). The Half-Rooster — one leg, one wing, half a bird and all cunning — sets off to the palace when the king seizes a coin he found. On the road he swallows whole a frog, a fox, a wolf and a mouse. At court the king tries to be rid of him, and one by one he looses them: the frog drowns the fire lit beneath him, the wolf savages the king\'s horses, the fox the king\'s geese, the mouse gnaws open the gold-chest — out of which he swallows back his coin and more, and hops home crowing. The smallest and half-made outwits the mighty.',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['kuma-lisa', 'bear-dervish', 'nastradin'],
  },
  {
    id: 'bear-dervish',
    title: 'The Bear and the Dervish',
    category: 'Folktale',
    summary:
      'Elsie\'s tale 12, the genuinely native "human-outwits-the-beast" register. A weak little dervish cannot beat a sheep-stealing bear by strength, so he beats it by wit: he crushes a white cheese in his fist and swears it is a stone he squeezed water from, shrugs off the bear\'s mightiest cuffs as mere fleabites, and at last coaxes the great beast into a cauldron and boils it in milk. In the mountains the cunning man outlives the strong one.',
    sources: [
      {
        label: 'Albanian Folktales and Legends — Robert Elsie',
        url: 'http://books.elsie.de/b073_albanian-folktales-and-legends/',
      },
    ],
    related: ['half-rooster', 'katallan', 'nastradin', 'kuma-lisa'],
  },
  {
    id: 'kuma-lisa',
    title: 'Kuma Lisa — the trickster she-fox',
    category: 'Folktale',
    summary:
      'Kuma Lisa, the she-fox of a hundred Balkan tales. The fox and the wolf lay up a pot of butter for the winter, but all autumn the fox slips away ("I\'ve been asked to a christening") and licks the pot lower each visit; when it is empty she smears the last on the sleeping wolf\'s mouth and cries thief. The "planted butter" is her oldest trick, and she wins only over those who believe her — the credulous take her side and a guiltless beast is wronged, while the wary see through her and the fox slinks off hungry.',
    sources: [
      {
        label: 'Albanian Literature: Folktales',
        url: 'http://www.albanianliterature.net/folktales/',
      },
    ],
    related: ['nastradin', 'wolf', 'half-rooster', 'bear-dervish'],
  },
  {
    id: 'cuckoo',
    title: 'The Origin of the Cuckoo — Gjon and the Cuckoo (von Hahn 104)',
    category: 'Folktale',
    summary:
      'An etiological myth. A sister at her sewing accidentally strikes her brother Gjon dead with her scissors; in her grief she becomes the cuckoo, who cries "Ku? Ku?" ("Where? Where?") searching for him down the years, while he becomes the little Gjon-bird who answers only his own name "Gjon! Gjon!" — she calling by day and he by night, so the two call across the woods and never once meet.',
    sources: [
      {
        label: 'von Hahn, Griechische und albanesische Märchen (Internet Archive)',
        url: 'https://archive.org/stream/GriechischeUndAlbanesischeMarchenJohannGeorgVonHahn/GriechischeUndAlbanesischeMarchen-JohannGeorgVonHahn_djvu.txt',
      },
    ],
    related: ['creation-wolf', 'swallow', 'bee-spider-cicada'],
  },
  {
    id: 'bee-spider-cicada',
    title: 'The Bee, the Spider and the Cicada',
    category: 'Folktale',
    summary:
      'An etiological fable. A dying mother\'s three daughters: the one who would not leave her loom even to tend her dying mother is cursed to be the spider, weaving a web she can never finish; the idle, frivolous one to be the cicada, who sings one bright summer and dies parched on a stem; but the dutiful daughter is blessed — "you shall be the light of the ancestors and the food of the living." So the bee makes honey to feed the living and wax to light the dead, and one must never blaspheme in a house that keeps a hive.',
    sources: [
      {
        label: 'Albanian Literature: Folktales',
        url: 'http://www.albanianliterature.net/folktales/',
      },
    ],
    related: ['swallow', 'cuckoo', 'tortoise'],
  },
  {
    id: 'swallow',
    title: 'The Swallow (dallëndyshja)',
    category: 'Folktale',
    summary:
      'An etiological tale. A serpent threatens to sink a ship unless it learns whose blood is sweetest, so it can feed on the best of creatures — and the answer is man\'s. But the swallow bites out the prying mosquito\'s tongue before it can tell, so the serpent never learns and mankind is spared. In its fury the cheated serpent strikes at the fleeing swallow and tears her tail into the fork she has worn ever since. Ever after the swallow nests at the head of the house, the friend of man, and it is a sin to harm her.',
    sources: [
      {
        label: 'Albanian Literature: Folktales',
        url: 'http://www.albanianliterature.net/folktales/',
      },
    ],
    related: ['creation-wolf', 'cuckoo', 'bee-spider-cicada', 'tortoise'],
  },
  {
    id: 'tortoise',
    title: 'Why the Tortoise Carries her House',
    category: 'Folktale',
    summary:
      'An etiological tale of hospitality. A stingy wife who would not give a crust to a hungry traveller (some say to God in a beggar\'s shape) was cursed to wear her baking-pan upon her back and carry her house with her wherever she goes, slow and shut-in, for all time. So the tortoise (breshka) answers the old riddle "I have a packsaddle but I\'m no donkey," and the inhospitable are remembered — bread refused is a roof lost; she who gives bread keeps her own roof and her name.',
    sources: [
      {
        label: 'Albanian proverbs (Wikiquote)',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
      },
    ],
    related: ['hospitality', 'bee-spider-cicada', 'swallow'],
  },
  {
    id: 'nastradin',
    title: 'Nastradin Hoxha — the trickster sage',
    category: 'Folktale',
    summary:
      'The great comic figure of Albanian (and pan-Balkan) oral tradition — the Albanian Nasreddin Hodja, the wise-fool whose absurd logic skewers the powerful. He returns a borrowed cauldron with a small pot inside ("it gave birth"), then keeps it and reports "the cauldron died" — if it can give birth, it can die. As a judge he settles a cook\'s demand to be paid for the smell of his soup by ringing a coin beside the cook\'s ear: the sound of the coin pays for the smell of the food. A debt of nothing, settled with a coin of nothing.',
    sources: [
      { label: 'Nasreddin (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Nasreddin' },
    ],
    related: ['kuma-lisa', 'half-rooster', 'bear-dervish'],
  },

  // ── Worldview, custom & calendar ─────────────────────────────────────────
  {
    id: 'besa',
    title: 'Besa — the sworn word of honour',
    category: 'Custom',
    summary:
      'The sacred pledge of faith, held inviolable and above life itself, sworn "by sun, moon, sky and earth, by fire, stone and thunderstone, by mountain, water and snake." It powers Rozafa and Constantine & Doruntine and the whole moral universe of the songs. Among the kreshnikë a besa binds even across the battle-line: beat a champion in fair single combat (a mejdan, sacred one-against-one), and if he asks your besa and you give it, a foe becomes a friend. To break a given besa — or to win by numbers what your own arm could not — is the one thing the songs leave a name out for.',
    sources: [
      { label: 'Besa (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Besa_(Albanian_culture)' },
    ],
    related: ['constantine-doruntine', 'rozafa', 'aga-ymer', 'zuku-bajraktar', 'gjergj-elez-alia', 'hospitality', 'kanun-blood-feud'],
  },
  {
    id: 'hospitality',
    title: 'Mikpritja — sacred hospitality',
    category: 'Custom',
    summary:
      '"The house of the Albanian belongs to God and the guest." A guest is sent by God and is offered bread, salt and heart, fire and a bed at any hour; to feed a traveller is a besa sacred above all, and to shed a guest\'s blood can never be pardoned. A cold stranger at the night-fire may be an Ora in an old woman\'s shape who blesses the hospitable; the wise rest by her fire and wake safe at dawn.',
    sources: [
      { label: 'Besa (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Besa_(Albanian_culture)' },
    ],
    related: ['besa', 'peri', 'tortoise', 'xhindi', 'ora', 'katallan'],
  },
  {
    id: 'kanun-blood-feud',
    title: 'Gjakmarrja & falja e gjakut — the blood-feud and its forgiving',
    category: 'Custom',
    summary:
      'The Kanun of Lekë Dukagjini regulated rather than commanded vengeance — blood for blood, koka për kokë, head for head — and those "in blood" shut themselves in the fortified kullë. But the code honours above revenge the falja e gjakut, the forgiving of blood, brokered by elders (pleqësia) and priests until killer and avenger drink together and become new brothers. Kosovo\'s great reconciliation campaign of 1990–92, led by the folklorist Anton Çetta and drawing hundreds of thousands to the rally at Verrat e Llukës, forgave over a thousand feuds. A besa kept is worth more than a head taken; forgiving the blood is the harder and higher thing.',
    sources: [
      { label: 'Kanun (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kanun_(Albania)' },
      { label: 'Albanian blood feud (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_blood_feud' },
    ],
    related: ['besa', 'mujo-avenges-halil', 'vajtim'],
  },
  {
    id: 'evil-eye',
    title: 'Syri i keq — the evil eye',
    category: 'Custom',
    summary:
      'The belief that an envious or even loving gaze can sicken what it praises — a child too openly admired draws the syri i keq. A wise mouth says "mashallah" over a fair child; a wise hand hangs garlic, a blue bead or a thread of red to turn the eye aside, and a little of the praiser\'s own spittle breaks it. The same salt-and-fire logic that wards the Shtriga protects against the eye; one never praises a child, a bride or a fat lamb without a charm.',
    sources: [
      { label: 'Shtriga (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Shtriga' },
    ],
    related: ['shtriga', 'xhindi', 'katallan'],
  },
  {
    id: 'vajtim',
    title: 'Vajtim & gjëmë — the laments for the dead',
    category: 'Custom',
    summary:
      'Albanian mourning as a sung art. The vajtim is women\'s sung lament, "praising the dead in verse with a heart-breaking voice" — the oldest rite the Illyrians left carved on their gravestones. The gjëmë (e burrave) is the men\'s funeral wailing of the Dukagjin and Gjakova highlands: a quorum of ten or more men ranged in a line strike their chests and scratch their faces, crying the dead man\'s deeds. To mourn rightly is itself a besa kept with the dead.',
    sources: [
      { label: 'Vajtim and Gjëmë (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vajtim_and_Gj%C3%ABm%C3%AB' },
    ],
    related: ['death-of-omer', 'constantine-doruntine', 'gjergj-elez-alia', 'kanun-blood-feud'],
  },
  {
    id: 'dita-e-veres',
    title: 'Dita e Verës — the Day of Summer',
    category: 'Custom',
    summary:
      'The chief Albanian festival, the old New Year (Kryeviti) held on 14 March at the spring equinox — the oldest feast of the pagan calendar, marking the end of winter and the strengthening of the Sun. Customs: baking the round corn-flour ballokume cookie, wearing the red-and-white "Verore" wool bracelet, and bonfires on high places that families leap to be cleansed for the new year. On the holy mountain the Zana of the heights shows herself, as on this one day alone. One of the oldest surviving Albanian festivals, a national public holiday since 2004 (it is not itself UNESCO-inscribed — the related "1st of March / Martenitsa" thread-custom on the UNESCO list is a separate, non-Albanian nomination).',
    sources: [
      { label: 'Dita e Verës (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dita_e_Ver%C3%ABs' },
    ],
    related: ['dielli', 'nena-e-diellit', 'dodola', 'shtojzovalle', 'prende'],
  },
  {
    id: 'dodola',
    title: 'The Dordolec / Dodola — the rain-caller',
    category: 'Custom',
    summary:
      'A surviving imitative-magic rain rite for drought: a child (the dordolec) is dressed head to foot in green leaves and branches — elder, fern, oak — and led singing and dancing from house to house, where people pour water over them to call down the rain, an invocation of the Sky and Sun (turned toward the holy Sun-mountain). Sometimes a drought breaks not by a hero\'s sword but by the village\'s own song.',
    sources: [
      { label: 'Dodola and Perperuna (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dodola_and_Perperuna' },
    ],
    related: ['dielli', 'nena-e-diellit', 'dita-e-veres'],
  },

  // ── Place-bound legend (Durham\'s cavern) ─────────────────────────────────
  {
    id: 'gjakova-cavern',
    title: 'The Gjakova cavern — the dead city guarded by Oras',
    category: 'Legend',
    summary:
      'From Edith Durham\'s High Albania (1909): a magic cavern on the road to Prizren running miles underground "even beneath the Drin," holding a dead city whose bazaar is stocked with fruit, flesh, fish, jewels and fair raiment, guarded by Oras in serpent-shape. The cavern is pitch dark — you must bring a torch to see the bazaar at all. Touch one single thing and "his torch at once goes out, serpents spring up and devour him in the darkness." No man has carried out so much as a coin; the wise walk out exactly as they came in, empty-handed and alive.',
    sources: [
      {
        label: 'Ora (Wikipedia)',
        url: 'https://en.wikipedia.org/wiki/Ora_(mythology)',
      },
    ],
    related: ['ora', 'vitore', 'stihi'],
  },

  // ══ ADDED 2026-07-08 (research pass — gap analysis + corpus build) ══════════
  // Deities / spirits
  {
    id: 'enji',
    title: 'Enji / En — the fire-god',
    category: 'Deity',
    summary:
      'The Illyrian-Albanian god of fire, whose reconstructed name is preserved in the weekday e enjte ("Thursday") — from Proto-Indo-European *h₁n̥gʷnis, a cognate of Sanskrit Agni and Latin ignis. Reconstructed (chiefly by Karl Treimer) as a major fire god, possibly the most prominent of the pantheon in Roman times, when the weekday names formed; the Sun-god Dielli dominated sky-worship. His cult, worshipped at the hearth and in ritual fires, was demonised under Christianity and largely absorbed into i Verbti. The living fire was never to be cursed, spat on, or put out with water.',
    sources: [
      { label: 'Enji (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Enji_(deity)' },
      { label: 'Fire worship (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Fire_worship' },
    ],
    related: ['i-verbti', 'dielli', 'shurdhi', 'nena-e-vatres', 'nata-e-buzmit'],
  },
  {
    id: 'perendi',
    title: 'Perëndi — the sky-god / God',
    category: 'Deity',
    summary:
      'The ordinary Albanian word for "God," "deity" and "the heavens/sky." Its origin is debated — proposals derive it from Latin imperantem ("the one commanding"), from a PIE compound *per-en- "to strike" + "sky/god" (which would make it a pagan sky-and-thunder father), or from the verb perëndoj "to set (of the sun)". Under any reading the sky was sworn by (për qiell) and the weather read as the divine mood; the everyday word outlived whatever pagan person once stood behind it.',
    sources: [
      { label: 'Perëndi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Per%C3%ABndi' },
      { label: 'perëndi (Wiktionary)', url: 'https://en.wiktionary.org/wiki/per%C3%ABndi' },
    ],
    related: ['zojz', 'dielli', 'hena'],
  },
  {
    id: 'nena-e-vatres',
    title: 'Nëna e Vatrës — the Mother of the Hearth',
    category: 'Deity',
    summary:
      'The personified protector-spirit of the domestic hearth-fire, the ancestor cult and the life of the family — sometimes regarded as a goddess (an Albanian Hestia/Vesta), though more a hearth-spirit than a firmly named deity. The hearth (vatra) was the sacred centre of the house; food and drink were offered into the flames for her. She is ambivalent, not purely kind: folk belief imagines her as an old woman by the fire who, if children come to the hearth at night, plucks out their eyes with her comb — and she is sometimes identified with the fate-spirits (mira).',
    sources: [
      { label: 'Nëna e Vatrës (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' },
      { label: 'Vatër / hearth cult (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vat%C3%ABr' },
    ],
    related: ['vitore', 'gjarpri-i-shtepise', 'enji', 'nata-e-buzmit', 'dielli'],
  },
  {
    id: 'fatia-mira',
    title: 'Fatia & Mira — the Fates of the south',
    category: 'Fairy',
    summary:
      'The three fate-women of Tosk southern Albania — the Albanian Moirai/Parcae. On the third night after a child is born they come riding butterflies to the cradle and fix its destiny once and for all. (In Tosk usage Fati and Mira are largely interchangeable names for the fate-woman, not a clean good-Mira / ill-Fatia pair.) What they decree cannot be undone; the southern counterpart to the northern Ora.',
    sources: [
      { label: 'Fatia (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Fatia' },
    ],
    related: ['ora', 'vitore', 'bija-hene-diell'],
  },
  {
    id: 'zana-e-malit',
    title: 'Zana e Malit — the mountain fairy',
    category: 'Fairy',
    summary:
      'The nymph of the highland peaks — cognate with the Illyrian goddess Thana / Roman Diana. Every mountain has its own zana who guards its springs, game and forest; her strength lives in three golden-horned wild goats, and her gaze can turn the intruder to stone. She grants the kreshnik heroes (Mujo) their more-than-human strength — but woe to whoever spies on her bathing.',
    sources: [
      { label: 'Zana e malit (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zana_e_malit' },
    ],
    related: ['ora', 'shtojzovalle', 'mujo-strength', 'mujo-zanas', 'bukura-e-dheut'],
  },
  {
    id: 'gjarpri-i-shtepise',
    title: 'Gjarpri i Shtëpisë — the house serpent',
    category: 'Creature',
    summary:
      'The guardian-serpent believed to live in the foundations or wall of every house, embodying the ancestral souls and the luck of the lineage. To kill it is to kill the household; it is fed milk and never harmed. Close kin to the Vitore, but where the Vitore is the personal fortune-genius, the house serpent is the ancestor keeping watch over the hearth.',
    sources: [
      { label: 'Vitore / house serpent (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vitore' },
      { label: 'Albanian folk beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' },
    ],
    related: ['vitore', 'nena-e-vatres', 'bolla'],
  },
  {
    id: 'djalli',
    title: 'Djalli / Dreqi — the Devil',
    category: 'Creature',
    summary:
      'The personification of evil and a fire-demon of the folk-Christian imagination — Djalli (from Latin diabolus) or Dreqi (from Latin draco, "dragon"). The trickster-antagonist of a thousand tales, forever tempting and bargaining, and forever bested not by force but by wit, faith or a pure heart. To name him at night was to summon him; the wise said "qoftelargu" ("may-he-be-far", the far-off one) instead.',
    sources: [
      { label: 'Djall (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Djall' },
    ],
    related: ['xhindi', 'karkanxholl', 'kulshedra'],
  },

  // Creatures the STORY leans on heavily (baloz, lugat) but had no card
  {
    id: 'baloz',
    title: 'Balozi i Zi — the Black Baloz of the sea',
    category: 'Creature',
    summary:
      'The armoured sea-monster the colour of soot who rises from the deep to demand tribute — gold, then flocks, then the maidens of the land — and whom no ordinary man can face. He is the standing enemy of the frontier heroes: Gjergj Elez Alia rises from nine years of wounds to cut him down, and Mujo and Halili meet him on the shore. The sea gives him up and the sea takes him back.',
    sources: [
      { label: 'Baloz (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Baloz' },
    ],
    related: ['gjergj-elez-alia', 'kreshnik-epic', 'kulshedra', 'bukura-e-detit'],
  },
  {
    id: 'lugat',
    title: 'Lugati — the restless undead',
    category: 'Creature',
    summary:
      'A revenant made when someone dies badly — suddenly, unshriven, or steeped in sin — who rises wrapped in his own grave-skin and rides the night wind to smother the sleeping. Left thirty years he "graduates" into a bodiless kukudh that no longer needs its grave. Iron, salt and the crowing cock hold him off; the wolf is his one true predator, and to be told "may the wolf eat you" is to be promised you will never walk after death.',
    sources: [
      { label: 'Lugat (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lugat' },
    ],
    related: ['wolf', 'shtriga', 'dhampir', 'kukudh'],
  },

  // Legends
  {
    id: 'skanderbeg-legjenda',
    title: 'Legjendat e Skënderbeut — the legends of Skanderbeg',
    category: 'Legend',
    summary:
      'The folk cycle around Gjergj Kastrioti Skënderbeu (1405–1468), the national hero who held the Ottomans off for a quarter-century. In legend he breaks the siege of Krujë by tying lit candles to a herd of goats so the enemy sees a great host on the ramparts — hence the goat-horned helmet. He died at Lezhë in 1468, and when the Ottomans retook Krujë ten years later (1478) they dug up his bones for talismans of his courage. When he died, they say, Albania fell. (The goat-candle ruse and the horned helmet are commemorative folk legend, not documented event-history.)',
    sources: [
      { label: 'Skanderbeg (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Skanderbeg' },
      { label: 'Scanderbeg & Ballaban (Elsie, legend)', url: 'http://albanianliterature.net/legends/legend_07.html' },
    ],
    related: ['sons-of-eagle', 'rozafa', 'kanuni', 'besa'],
    texts: [
      { label: 'Naim Frashëri, Historia e Skënderbeut (1898) — full verse epic', lang: 'sq',
        url: 'https://wikisource.org/wiki/Historia_e_Sk%C3%ABnderbeut',
        local: 'docs/references/naim-historia-e-skenderbeut.sq.txt' },
    ],
  },
  {
    id: 'ura-e-artes',
    title: 'Ura e Artës — the Bridge of Arta',
    category: 'Legend',
    summary:
      'The bridge-form of the walled-up-wife ballad: however high the master-builders raise the great bridge, by night it falls, until a voice tells them it will only stand once a living wife is immured in its pier. The youngest, most-loved bride is tricked into the wall; she asks that one breast be left free to suckle her infant, and curses then blesses the bridge so it will "tremble as my heart trembles" yet never fall again. The Balkan-wide sister of Rozafa — castle there, bridge here.',
    sources: [
      { label: 'The Walled-Up Wife / Bridge (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Three-Arched_Bridge' },
      { label: 'Ballad of the Walled-Up Wife (ArchiWik)', url: 'https://www.archiwik.org/index.php/Ballad_of_The_Walled-Up_Wife' },
    ],
    related: ['rozafa', 'besa', 'constantine-doruntine'],
    texts: [
      { label: 'Balada e murimit — two full Çam variants', lang: 'sq',
        url: 'https://fatmirt.blogspot.com/2019/09/balada-e-murimit.html' },
    ],
  },
  {
    id: 'kostandini-i-vogel',
    title: 'Kostandini i Vogël — Little Constantine, the returning captive',
    category: 'Legend',
    summary:
      'The ballad of the husband carried off to long war-captivity who comes home after years — grey, unrecognised, testing his faithful wife at her own re-wedding before he reveals himself by a hidden token. The Albanian Odysseus, sung in the north as Aga Ymeri and among the Arbëreshë as Kostandini i Vogëlith; a besa-tale of the word kept across impossible distance and time. Distinct from Constantine & Doruntine (brother, not husband).',
    sources: [
      { label: 'Little Constantine (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Little_Constantine' },
    ],
    related: ['aga-ymer', 'constantine-doruntine', 'besa'],
    texts: [
      { label: 'Ymer Agë Ulqini — full song (Wikibooks, CC-BY-SA)', lang: 'sq',
        url: 'https://sq.wikibooks.org/wiki/Ymer_Ag%C3%AB_Ulqini',
        local: 'docs/references/ymer-age-ulqini.sq.txt' },
    ],
  },
  {
    id: 'ali-pashe-tepelena',
    title: 'Ali Pashë Tepelena — the Lion of Ioannina',
    category: 'Legend',
    summary:
      'The Albanian pasha (1740–1822) who carved a near-independent state out of the Ottoman Empire from his court at Ioannina and became a Balkan legend in his own lifetime — the "Muslim Bonaparte," ruthless, cunning and magnetic, courted by Byron and the Great Powers. Folk memory keeps both the tyrant and the state-builder: the blood-feuds, the bravi, and the old lion finally run down and killed on the island of his lake.',
    sources: [
      { label: 'Ali Pasha of Ioannina (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ali_Pasha_of_Ioannina' },
    ],
    related: ['kanuni', 'kanun-blood-feud', 'besa'],
  },
  {
    id: 'tomorri-pilgrimage',
    title: 'Mali i Tomorrit — the sacred mountain & pilgrimage',
    category: 'Legend',
    summary:
      'Baba Tomor is not only the giant of the myth but a living holy mountain: each August (20–25) thousands climb to the Kulmak tekke on Tomorr for the great Bektashi pilgrimage, tracing the hoofprint left in the rock by the white horse of Abaz Ali and sharing the kurban — the sacrificed lamb — among all comers. Pagan mountain-cult, Christian saint and Muslim dervish are layered on one peak; the oldest surviving folk-pilgrimage of the Albanians.',
    sources: [
      { label: 'Tomorr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Tomorr' },
    ],
    related: ['tomor-shpirag', 'kurbani', 'sari-salltek', 'prende'],
  },
  {
    id: 'rrapi',
    title: 'Rrapi — the plane tree of assembly',
    category: 'Custom',
    summary:
      'The great plane tree (rrapi) under which the men of a district gathered to hold the assembly, judge disputes by the Kanun, swear the besa and hear the epic sung — the open-air oda of the whole tribe. The most famous, the Plane Tree of Mashkullorë, is fixed in oral verse as the seat of communal justice and gathering; to speak "beneath the plane tree" was to speak in the presence of the whole community.',
    sources: [
      { label: 'At the Plane Tree of Mashkullorë (Elsie, oral verse)', url: 'http://albanianliterature.net/oralverse/verse_01.html' },
    ],
    related: ['oda-e-burrave', 'besa', 'kanuni', 'hospitality'],
  },

  // Folktales
  {
    id: 'binoshet',
    title: 'Binoshët — the Twins (Zjerma & Handa)',
    category: 'Folktale',
    summary:
      'The Arbëresh wonder-tale (Schirò, 1923) of twin brothers born with the sun and the moon on their brows, who set out with silver swords and drangue-fighting hounds. One slays the Kulshedra and frees the waters; the other wins the Earthly Beauty. When one is turned to stone, the twin so alike that even the wife is fooled brings him back — the ATU 303 "Two Brothers" fused with the dragon-slayer.',
    sources: [
      { label: 'The Twins (Albanian tale) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Twins_(Albanian_tale)' },
    ],
    related: ['bukura-e-dheut', 'kulshedra', 'drangue', 'bija-hene-diell'],
  },

  // Epic — kreshnik songs not previously carded
  {
    id: 'arnaut-osmani',
    title: 'Arnaut Osmani — the coals of besa',
    category: 'Epic',
    summary:
      'A song of the Kângë Kreshnikësh: to free his comrades held by the king, Arnaut Osmani lets burning coals be heaped on his bare chest and does not flinch — proving the more-than-human endurance of the frontier warrior and the price of the sworn word. The body may burn; the besa does not break.',
    sources: [
      { label: 'Kângë Kreshnikësh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kang%C3%AB_Kreshnik%C3%ABsh' },
    ],
    related: ['kreshnik-epic', 'zuku-bajraktar', 'besa'],
  },
  {
    id: 'muji-e-behuri',
    title: 'Mujo e Behuri — the duel over the pact',
    category: 'Epic',
    summary:
      'A core Mujo song (Palaj–Kurti, Visaret e Kombit II): Mujo faces the rival lord Behur over a broken agreement, and the quarrel of honour becomes a single combat that only one will leave. Domestic pact and martial law of the border collide, as they always do in the kreshnik world.',
    sources: [
      { label: 'Kângë Kreshnikësh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kang%C3%AB_Kreshnik%C3%ABsh' },
    ],
    related: ['mujo-strength', 'mujo-courser', 'kreshnik-epic'],
  },
  {
    id: 'halil-garria',
    title: 'Kënga e Halil Garrisë — the oath beyond death',
    category: 'Epic',
    summary:
      'A besa-ballad recorded by Gjergj Fishta at Gomsiqe (published in Hylli i Dritës, 1924): a sworn word must be honoured even from the grave, the northern highland cousin of Constantine & Doruntine. The dead keep their promises; only the living forget.',
    sources: [
      { label: 'Kënga e Halil Garrisë (analysis)', url: 'https://www.fjalaelire.com/post/k%C3%ABnga-e-halil-garris%C3%AB-dhe-disa-probleme' },
    ],
    related: ['constantine-doruntine', 'kostandini-i-vogel', 'besa'],
  },

  // Customs / calendar
  {
    id: 'nata-e-buzmit',
    title: 'Nata e Buzmit — the night of the Yule log',
    category: 'Custom',
    summary:
      'On the eve of the winter solstice / Christmas the great oak log — the buzmi — is carried in, blessed, and set to burn on the hearth through the longest night, its sparks struck up "so many lambs, so many kids, so much wheat" for the year to come. A Sun-cult and hearth-cult rite kept by highland Christians, Muslims, Arbëreshë and Arvanites alike; the fire that helps the weakened Sun be reborn.',
    sources: [
      { label: 'Nata e Buzmit / Albanian paganism (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' },
    ],
    related: ['dita-e-veres', 'dielli', 'enji', 'nena-e-vatres'],
  },
  {
    id: 'kanuni',
    title: 'Kanuni i Lekë Dukagjinit — the code of the mountains',
    category: 'Custom',
    summary:
      'The oral customary law of the northern highlands, ascribed to the 15th-century chief Lekë Dukagjini and written down at last by the priest Shtjefën Gjeçovi (published 1933) in 1,262 articles. It governs the whole of highland life — besa, hospitality, marriage, property, the church, and the blood-feud — on the principle that a man\'s honour and his given word outweigh his life. The umbrella under which besa, mikpritja and gjakmarrja all sit.',
    sources: [
      { label: 'Kanun (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kanun_(Albania)' },
      { label: 'Code of Lekë Dukagjini (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Code_of_Lek%C3%AB_Dukagjini' },
    ],
    related: ['besa', 'hospitality', 'kanun-blood-feud', 'oda-e-burrave'],
  },
  {
    id: 'oda-e-burrave',
    title: 'Oda e Burrave — the men\'s guest-room',
    category: 'Custom',
    summary:
      'The great guest-room of the tower-house (kulla) where the men of the house receive travellers and where, through the long nights, law, history and the epic are handed down — the physical institution of Albanian hospitality and oral tradition. A guest in the oda is sacred and untouchable; under its roof the lahutar sings the kreshnik songs and the old settle disputes by the Kanun.',
    sources: [
      { label: 'Oda (Albania) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Oda_(Albania)' },
    ],
    related: ['hospitality', 'besa', 'kanuni', 'kreshnik-epic', 'rrapi'],
  },
  {
    id: 'gjama-e-burrave',
    title: 'Gjama e Burrave — the men\'s lament',
    category: 'Custom',
    summary:
      'The men-only funeral rite of the Dukagjin and Gjakovë highlands: a gathering of men beat their breasts, rake their faces with their nails and cry out the dead man\'s name in a slow synchronised wail — the male counterpart to the women\'s vajtim. Held to be of Illyrian antiquity and now safeguarded as intangible heritage; the loudest grief a mountain man is ever allowed.',
    sources: [
      { label: 'Vajtim and Gjëmë (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vajtim_and_Gj%C3%ABm%C3%AB' },
    ],
    related: ['vajtim', 'kanuni'],
  },
  {
    id: 'dita-e-shen-gjergjit',
    title: 'Dita e Shën Gjergjit — St George\'s Day',
    category: 'Custom',
    summary:
      'Shëngjergji (6 May), the pastoral spring feast that opens the herding year: fires are lit, house and byre and field are blessed with green branches and running water, the flocks go up to the summer pastures, and sweethearts exchange greenery. A pre-Christian rite of renewal wearing a saint\'s name — distinct from the equinoctial Dita e Verës that begins the season.',
    sources: [
      { label: 'St George\'s Day / Shëngjergji', url: 'https://en.wikipedia.org/wiki/Saint_George%27s_Day' },
    ],
    related: ['dita-e-veres', 'dielli', 'dodola'],
  },
  {
    id: 'kurbani',
    title: 'Kurbani — the votive sacrifice',
    category: 'Custom',
    summary:
      'The vow-offering of a lamb or ram, killed for a saint or a holy place and shared out among kin, neighbours and the poor — never sold. Older than either faith that later claimed it, it survives at the Tomorr pilgrimage, at Eid, and at any threshold of the year or the family where thanks or a plea must be made flesh. To give the kurban is to bind the family\'s luck to the giving.',
    sources: [
      { label: 'Albanian paganism — kurban (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' },
    ],
    related: ['tomorri-pilgrimage', 'hospitality', 'nata-e-buzmit'],
  },

  // ══ Living customs (research pass 2, 2026-07-08) ═════════════════════════════
  {
    id: 'burrnesha',
    title: 'Burrnesha — the sworn virgin (vajza e betuar)',
    category: 'Custom',
    summary:
      'Under the Kanun a woman could swear a lifelong oath of celibacy before the village elders and thereafter live socially as a man — heading the household, carrying a rifle, sitting in the men\'s oda, taking a man\'s name and dress. The vow was sworn most often when a family had no male heir to carry its name, to let a daughter escape a betrothal she had not chosen without dishonouring either house, or to take a dead father\'s or brother\'s place and so hold or end a feud. It was irreversible and never about desire — it was the one legitimate door out of a woman\'s fixed role, and a burrneshë was addressed and buried as a man.',
    sources: [
      { label: 'Sworn virgin (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Sworn_virgin' },
      { label: 'Antonia Young, Women Who Become Men (2000)', url: 'https://www.google.com/books/edition/Women_Who_Become_Men/9tR8SmO1G_gC' },
    ],
    related: ['kanuni', 'kanun-blood-feud', 'besa', 'oda-e-burrave', 'hospitality'],
  },
  {
    id: 'stani',
    title: 'Stani & bjeshka — the sheepfold and the summer pasture',
    category: 'Custom',
    summary:
      'Highland life ran on transhumance: at the opening of the herding year the flocks were driven up from the winter lowland grazing (vërri) to the cool summer pastures (bjeshkët) of the Alps and brought down again in autumn. Up on the bjeshkë the shepherds lived at the stan — a stone-and-wood dairy hut and fold where the day\'s milk was turned into white cheese (djathë), curd (gjizë) and butter. The drive up opens on Dita e Shën Gjergjit, the feast that begins the shepherd\'s year; Balkan transhumance is inscribed on UNESCO\'s heritage list.',
    sources: [
      { label: 'Transhumance — UNESCO ICH', url: 'https://ich.unesco.org/en/RL/transhumance-the-seasonal-droving-of-livestock-01470' },
      { label: 'Transhumance (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Transhumance' },
    ],
    related: ['dita-e-shen-gjergjit', 'kurbani', 'ora'],
  },
  {
    id: 'dasma',
    title: 'Dasma — the wedding and the bride\'s journey',
    category: 'Custom',
    summary:
      'The traditional dasma ran three days or more, ending when the krushqit — the groom\'s wedding party — rode to the bride\'s father\'s house to fetch her and bring her back veiled, a flag (flamuri) carried at the head of the procession. The bride left with her pajë (dowry) and departed in ritual sorrow, wept and wept over, for she was passing forever out of her father\'s household; in the highlands she sat veiled, silent and still for days among her new kin. Styles differ sharply — the Gheg highlands mark the leave-taking with laments close to funeral vajtim, while Labëria in the south sings the wedding in UNESCO-listed iso-polyphony.',
    sources: [
      { label: 'Albanian folk iso-polyphony — UNESCO ICH', url: 'https://ich.unesco.org/en/RL/albanian-folk-iso-polyphony-00155' },
      { label: 'Marriage customs / Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Culture_of_Albania' },
    ],
    related: ['paja', 'kanuni', 'vajtim', 'besa'],
  },
  {
    id: 'paja',
    title: 'Paja — the bride\'s dowry and trousseau',
    category: 'Custom',
    summary:
      'The pajë (in the south prikë) was everything the bride brought into the marriage — woven and embroidered cloth, bedding, stockings and shirts she had made herself over years, packed in a carved wooden chest (sënduku i pajës). Its display before the groom\'s kin was a public reckoning of the bride\'s industry and her family\'s standing. In many regions a symbolic bride-gift also passed the other way; the pajë was hers, the one property a woman carried in her own right across the threshold.',
    sources: [
      { label: 'Margaret Hasluck, The Unwritten Law in Albania (1954)', url: 'https://archive.org/details/unwrittenlawinal0000marg' },
      { label: 'Culture of Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Culture_of_Albania' },
    ],
    related: ['dasma', 'kanuni'],
  },
  {
    id: 'mikpritja-oda',
    title: 'Konaku & kafeja — receiving the guest in the oda',
    category: 'Custom',
    summary:
      'Beyond the principle that "the house belongs to God and the guest," the welcome had a fixed shape: the guest was led to the kryet e vendit, the seat of honour at the head of the oda, and served coffee and a glass of raki, then a meal and tobacco, always in order of seniority. Lodged overnight (konak) he received "bread, salt and heart," and at leaving was escorted to the edge of the host\'s ground (përcjellja). The Kanun binds the host to defend a guest with his own life even if the guest proves to be his blood-enemy — under that roof the guest is untouchable, and a host who lets him come to harm is dishonoured forever.',
    sources: [
      { label: 'Besa (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Besa_(Albanian_culture)' },
      { label: 'The Code of Lekë Dukagjini (Fox tr., archive.org)', url: 'https://archive.org/details/the-code-of-leke-dukagjini' },
    ],
    related: ['hospitality', 'oda-e-burrave', 'besa', 'kanuni', 'kanun-blood-feud'],
  },
  {
    id: 'vellameri',
    title: 'Vëllamëria & probatimi — sworn blood-brotherhood',
    category: 'Custom',
    summary:
      'Two unrelated men could make themselves lifelong kin as sworn brothers (vëllam, native; probatin, from Slavic pobratim). In the rite Durham recorded, each tied a string tight round his little finger till it swelled, pricked it, and let a drop of blood fall on a lump of sugar which the other then ate — among Christians the drops went instead into a shared glass of raki, drunk together — swearing "jemi një gjak," we are one blood. Thereafter they owed each other a brother\'s defence and a brother\'s share in a feud, and their descendants could never intermarry, the union counting as incest "for more than a hundred years." It was used to seal an alliance or turn an enmity into kinship; women had a thinner-attested parallel, motërzimi.',
    sources: [
      { label: 'Durham, High Albania (1909) — ch. II', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' },
      { label: 'Pobratim / blood brother (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pobratim' },
    ],
    related: ['besa', 'kanuni', 'kanun-blood-feud', 'hospitality'],
  },
  {
    id: 'lindja-besiku',
    title: 'Lindja & besiku — birth, the Fates, and the cradle',
    category: 'Custom',
    summary:
      'On the third night after a birth the Fatia/Mira — the three Fates, close kin to the Ora — were believed to come and fix the child\'s whole destiny, so the house was kept quiet and welcoming to please them. Mother and newborn were most open to the evil eye and the child-eating Shtriga through the vulnerable first forty days, so a blue bead, garlic, a red thread or a coin was pinned to the cradle and no one praised the baby aloud without adding "mashallah." The child was laid in the besik, a wooden rocking cradle, and lulled with a nina-nana; naming often waited, and plain or "ugly" names were sometimes given to make the child worthless in envious eyes.',
    sources: [
      { label: 'Albanian folk beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' },
      { label: 'Ora (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ora_(mythology)' },
    ],
    related: ['ora', 'fatia-mira', 'evil-eye', 'vitore', 'shtriga'],
  },
  {
    id: 'besa-truce',
    title: 'Besa-besë — the truce of the given word',
    category: 'Custom',
    summary:
      'In everyday practice the besa was not only a lifelong oath but a working truce: a family "in blood" could grant an enemy a besa — a guaranteed span of safety — so he could reap his harvest, go to market, or attend a wedding or funeral without fear of the gun. The narrowest is the short truce right after a killing (often a 24-hour besa, under which the killer is even bound to attend the funeral and break bread); a longer besa, usually about a month and renewable, is brokered through the elders. Widest is the besa e katundit, sworn by a whole village so foes can meet in peace at a festival — Durham in 1908 heard "a week\'s besa had been sworn for the festival, so that all blood foes could meet as friends." To strike inside a besa was the blackest dishonour; it is what made a feud livable.',
    sources: [
      { label: 'Durham, High Albania (1909)', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' },
      { label: 'Besa (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Besa_(Albanian_culture)' },
    ],
    related: ['besa', 'kanun-blood-feud', 'kanuni', 'hospitality'],
  },
  {
    id: 'emri-tabu',
    title: 'Tabuja e emrit — the taboo on names',
    category: 'Custom',
    summary:
      'Albanian custom hedged dangerous names with avoidance. A highland wife did not speak her husband\'s name or his close kin\'s aloud, calling him only "i zoti i shtëpisë," the man of the house. The wolf was not named directly after dark for fear of summoning it — the old wished instead "mbylltë Zoti gojën," may God shut its mouth — and the same logic gave children plain or "ugly" protective names, since a child not worth envying is one the evil eye and the child-eating spirits pass over. (The apotropaic wolf-name Ujk/Ujkan exists in Albanian as a plausible parallel to the well-documented Serbian Vuk, though its protective use is more thinly attested.)',
    sources: [
      { label: 'Durham, High Albania (1909)', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' },
      { label: 'Vuk (name) — apotropaic naming (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vuk_(name)' },
    ],
    related: ['evil-eye', 'lindja-besiku', 'ora', 'wolf'],
  },

  // ══ Completeness pass additions (2026-07-08) ══
  {
    id: 'xhubleta',
    title: 'Xhubleta — the highland bell-dress',
    category: 'Custom',
    summary:
      'The undulating, bell-shaped felt-and-wool skirt-dress of the northern Alps, built from strips of woven shajak and embroidered with sun, moon, star, eagle and serpent motifs of pagan origin; predominantly black, worn from puberty as a mark of a woman’s status. In 2022 UNESCO inscribed it on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding, its craft now endangered.',
    sources: [
      { label: 'Xhubleta — UNESCO ICH', url: 'https://ich.unesco.org/en/USL/xhubleta-skills-craftsmanship-and-forms-of-usage-01880' },
      { label: 'Xhubleta (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Xhubleta' },
    ],
    related: ['dielli', 'hena', 'vitore', 'dasma', 'burrnesha'],
  },
  {
    id: 'lahuta-cifteli',
    title: 'Lahuta & çifteli — the epic and folk lutes',
    category: 'Custom',
    summary:
      'The lahutë is the single-stringed bowed lute over which the lahutar chants the Këngë Kreshnike — the memorized oral epic of Muji and Halili, the same living tradition Parry and Lord recorded to illuminate Homer. In 2025 UNESCO inscribed the art of the lahuta on the Urgent-Safeguarding list. Its plucked two-string cousin the çifteli is the everyday voice of Gheg song at weddings across Albania and Kosovo.',
    sources: [
      { label: 'Art of the lahuta — UNESCO ICH (2025)', url: 'https://ich.unesco.org/en/USL/art-of-playing-singing-and-making-the-lahuta-02310' },
      { label: 'Çifteli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/%C3%87ifteli' },
    ],
    related: ['kreshnik-epic', 'gjeto-basho-muji', 'oda-e-burrave', 'gjergj-elez-alia'],
  },
  {
    id: 'kulla',
    title: 'Kulla — the highland tower-house',
    category: 'Custom',
    summary:
      'The fortified stone tower-house of the northern and Kosovar highlands, above all Dukagjin — thick masonry, small high windows, a single guarded door, a windowless ground floor for livestock and a top-floor men’s oda. Under the Kanun it was home and inviolable refuge alike: a man “in blood” could shut himself inside for years, untouchable within its walls.',
    sources: [
      { label: 'Kulla / tower houses (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kulla' },
      { label: 'Elsie, The Tribes of Albania', url: 'https://archive.org/details/tribesofalbaniah0000elsi' },
    ],
    related: ['oda-e-burrave', 'kanuni', 'kanun-blood-feud', 'mikpritja-oda'],
  },
  {
    id: 'valle',
    title: 'Vallja — the chain dance',
    category: 'Custom',
    summary:
      'The communal open- or closed-circle chain dance of weddings and festivals, led by a first dancer who improvises while the line follows. “K’cimi dancing of Tropojë” — a springtime men’s drum-dance evoking the mountains and the eagle — was inscribed on UNESCO’s Representative List in 2024; the martial sword-and-musket vallja e Rugovës of Kosovo is under state protection but is not itself UNESCO-listed.',
    sources: [
      { label: 'K’cimi dancing of Tropojë — UNESCO ICH (2024)', url: 'https://ich.unesco.org/en/RL/k-cimi-dancing-of-tropoje-01881' },
      { label: 'Rugova (sword dance) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Rugova_(sword_dance)' },
    ],
    related: ['dasma', 'dita-e-veres', 'lahuta-cifteli'],
  },
  {
    id: 'sulltan-nevruzi',
    title: 'Sulltan Nevruzi — the Bektashi New Year',
    category: 'Custom',
    summary:
      'Held on 22 March, the holiest day of the Bektashi order (whose world headquarters, the Kryegjyshata, stands in Tirana), commemorating the birth of Imam Ali and the coming of spring. Bektashis bake a pie of twelve wild spring herbs with a coin hidden inside; declared a public holiday in 1996, it ties Albania into the wider Nowruz world and complements the pagan Dita e Verës.',
    sources: [
      { label: 'Nevruz in Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Nevruz_in_Albania' },
      { label: 'Bektashism in Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Bektashism_in_Albania' },
    ],
    related: ['dita-e-veres', 'tomorri-pilgrimage', 'kurbani', 'nata-e-buzmit'],
  },
  {
    id: 'shen-kolli',
    title: 'Shën Kolli — the feast of St Nicholas',
    category: 'Custom',
    summary:
      'After the Virgin, St Nicholas (Shën Kolli) was the most venerated saint of Albanian tradition — honoured by Catholics, Orthodox and even Muslims, patron of many northern tribes. His winter feast on the eve of 6 December is a great folk night: candles lit, lamb or pork roasted after midnight, blessed bread shared, raki toasted. Catholics swore by him: “Pasha Shejnti Shën’Kollin!”',
    sources: [
      { label: 'St Nicholas Center — Albania', url: 'https://www.stnicholascenter.org/around-the-world/customs/albania' },
      { label: 'Nata e Buzmit / midwinter (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' },
    ],
    related: ['nata-e-buzmit', 'mikpritja-oda', 'kurbani'],
  },
  {
    id: 'tatuazhi',
    title: 'Tatuazhi tradicional — the highland tattoos',
    category: 'Custom',
    summary:
      'The old body-marking of Catholic highland women (and some men) of northern Albania and Kosovo, pricked into hands, forearms and brow with soot mixed in milk or honey. Its motifs are suns and stars (Dielli), crescent moons (Hëna) and crosses — protective celestial marks in the old light-against-dark dualism, later fused with Christian faith and read as a badge against assimilation. It reaches back to Illyrian antiquity and was recorded by Edith Durham.',
    sources: [
      { label: 'Albanian traditional tattooing (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_traditional_tattooing' },
      { label: 'Durham, High Albania (PD)', url: 'https://archive.org/details/highalbania00durhuoft' },
    ],
    related: ['dielli', 'hena', 'evil-eye', 'xhubleta'],
  },
  {
    id: 'plisi',
    title: 'Plisi / qeleshja — the white felt cap',
    category: 'Custom',
    summary:
      'The brimless white felt skullcap hand-felted from sheep’s wool (its name from lesh, wool) — the most iconic piece of Albanian men’s dress, worn across Albania, Kosovo, North Macedonia and Montenegro and traced by scholars to a like Illyrian cap. Its profile marks the region: hemispherical in the northern Alps, truncated around Kukës, taller toward Gjirokastër. It is not UNESCO-listed despite campaigns.',
    sources: [
      { label: 'Qeleshe (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Qeleshe' },
      { label: 'Albanian traditional clothing (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_traditional_clothing' },
    ],
    related: ['xhubleta', 'oda-e-burrave', 'burrnesha'],
  },
  {
    id: 'sofra',
    title: 'Sofra — the round meal-table',
    category: 'Custom',
    summary:
      'The low round communal table (and the meal ritual around it) at which the household and its guests gather seated on the floor to eat from shared dishes. It is the physical stage of Albanian hospitality — governed by besa and the Kanun’s “the house belongs to God and the guest” — where refusing offered food is an insult and raki toasts open the meal. To be welcomed to a family’s sofra is to be taken under its protection.',
    sources: [
      { label: 'Sofra (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Sofra' },
      { label: 'Elsie, The Tribes of Albania', url: 'https://archive.org/details/tribesofalbaniah0000elsi' },
    ],
    related: ['mikpritja-oda', 'hospitality', 'oda-e-burrave', 'besa'],
  },
  {
    id: 'plakat-e-marsit',
    title: 'Plakat e Marsit — the old woman’s days of March',
    category: 'Custom',
    summary:
      'A weather legend distinct from Dita e Verës: an old woman driving her flock up in an early warm spell mocks and curses winter, and March “borrows” three cold days to freeze her and her animals to stone (a weeping rock is shown on Tomorr). It explains the violent late-winter cold snaps — “po shkunden plakat,” the old women are shaking things up — around the March turn; keep separate from the solar festival Dita e Verës, with which it is often conflated.',
    sources: [
      { label: 'Plakat e Marsit — göjedhëna (Radi & Radi)', url: 'https://www.radiandradi.com/plakat-e-marsit-nje-gojedhena-e-bukur-e-malit-pse-moti-terbohet-keq/' },
      { label: 'Dita e Verës — for the contrast (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dita_e_Ver%C3%ABs' },
    ],
    related: ['dita-e-veres', 'tomor-shpirag', 'dielli'],
  },
  {
    id: 'xhuxhmaxhuxhe',
    title: 'Xhuxhmaxhuxët — the dwarves',
    category: 'Creature',
    summary:
      'The diminutive earth-spirits or dwarves of Albanian folktale — sometimes helpful, sometimes malicious — dwelling underground or in the wild and appearing as tiny magical folk who set tasks or reward the kind. They stand among the “little people” of the tradition beside the airy shtojzovalle and the mountain zana.',
    sources: [
      { label: 'Albanian mythology (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_mythology' },
      { label: 'Elsie, Albanian Folktales and Legends', url: 'http://www.albanianliterature.net/folktales/index.html' },
    ],
    related: ['shtojzovalle', 'zana-e-malit', 'ora', 'peri'],
  },
  {
    id: 'rmora',
    title: 'Rëmora — the ship-stopping sea power',
    category: 'Creature',
    summary:
      'In Albanian coastal belief the rëmora is a mysterious force or sea-creature that halts a ship dead in the water, its name and motif shared with the classical remora legend. It belongs to the sparse but real body of Albanian sea-lore alongside e Bukura e Detit and the Baloz.',
    sources: [
      { label: 'Albanian mythology (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_mythology' },
      { label: 'Tirta, Mitologjia ndër shqiptarë (catalog)', url: 'https://search.worldcat.org/search?q=Tirta+Mitologjia+nder+shqiptare' },
    ],
    related: ['bukura-e-detit', 'baloz', 'kulshedra'],
  },
  {
    id: 'e-verdha-e-dheut',
    title: 'E Verdha e Dheut — the Yellow One of the Earth',
    category: 'Creature',
    summary:
      'A sickness-demon or malign earth-force of folk belief, “the Yellow/Sallow One of the Earth,” blamed for jaundice-like wasting illness and warded off with charms and ritual. She sits among the disease-personifications beside the shtriga and the evil eye.',
    sources: [
      { label: 'Albanian mythology (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_mythology' },
      { label: 'Tirta, Mitologjia ndër shqiptarë (catalog)', url: 'https://search.worldcat.org/search?q=Tirta+Mitologjia+nder+shqiptare' },
    ],
    related: ['shtriga', 'syri-kalter', 'kukudh'],
  },
  {
    id: 'argjiro-gjirokastra',
    title: 'Legjenda e Argjiros — Princess Argjiro of Gjirokastër',
    category: 'Legend',
    summary:
      'In Gjirokastër’s most famous legend, the noblewoman Argjiro, defending the castle in its last siege, leaps from the walls clutching her infant son rather than fall alive into enemy hands; folk tradition says the city was named for her. Historians note the name predates the Ottoman era (more plausibly Greek “silver castle”), so the naming is legend — immortalized in Ismail Kadare’s poem Princesha Argjiro and his Chronicle in Stone.',
    sources: [
      { label: 'Princess Argjiro (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Princess_Argjiro' },
      { label: 'Gjirokastra Foundation — history', url: 'https://gjirokastra.org/gjirokastra/?page_id=2249' },
    ],
    related: ['rozafa', 'ali-pashe-tepelena', 'ura-e-artes'],
  },
  {
    id: 'legjenda-e-prespes',
    title: 'Legjenda e Prespës — the drowned city of Prespa',
    category: 'Legend',
    summary:
      'The Albanian legend of Lake Prespa: a prince falls for a water-nymph (zanë) and, seizing and forcing her to marry against her warnings, brings a catastrophic downpour that floods the whole town and drowns every soul, leaving the lake behind. It is the strongest genuinely Albanian “drowned settlement” legend, paralleled by an Ohrid tradition of a sunken Illyrian city.',
    sources: [
      { label: 'Legjenda e Prespës dhe Ohrit (Lake Ohrid blog)', url: 'http://lakeohrid.blogspot.com/2017/08/legjenda-e-prespes-dhe-ohritthe-legend.html' },
      { label: 'Lake Prespa (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lake_Prespa' },
    ],
    related: ['tomor-shpirag', 'maiden-promised-sun', 'flocka'],
  },
  {
    id: 'gjeto-basho-muji',
    title: 'Gjeto Basho Muji — the founding hero',
    category: 'Epic',
    summary:
      'Gjeto Basho Muji (Muji of Jutbina/Udbina) is the pre-eminent hero of the Këngë Kreshnike — a herdsman granted more-than-human strength by the zana whose milk he suckled, who leads the thirty agas of the frontier stronghold. The whole cycle is built around him: his making, marriage, feats, wounding and death. He personifies the epic’s faith, manliness and endurance.',
    sources: [
      { label: 'Muji (Albanian mythology) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Muji_(Albanian_mythology)' },
      { label: 'Kângë Kreshnikësh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/K%C3%A2ng%C3%AB_Kreshnik%C3%ABsh' },
    ],
    related: ['mujo-strength', 'mujo-zanas', 'mujo-courser', 'muji-e-behuri', 'kreshnik-epic', 'sokol-halili'],
  },
  {
    id: 'sokol-halili',
    title: 'Sokol Halili — Muji’s brother',
    category: 'Epic',
    summary:
      'Sokol Halili is Muji’s younger brother and inseparable comrade — youthful, dashing and impetuous to Muji’s brute strength, the pair likened by scholars to the Dioscuri for their loyalty. He rescues and later avenges Muji across the cycle (the Marriage of Halili, his strength, his death). He is the second of the two protagonists around whom the whole epic turns.',
    sources: [
      { label: 'Kângë Kreshnikësh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/K%C3%A2ng%C3%AB_Kreshnik%C3%ABsh' },
      { label: 'Muji (Albanian mythology) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Muji_(Albanian_mythology)' },
    ],
    related: ['halil-marriage', 'halil-garria', 'mujo-avenges-halil', 'gjeto-basho-muji'],
  },
  {
    id: 'ali-bajraktari',
    title: 'Ali Bajraktari (Besa) — the oath kept',
    category: 'Epic',
    summary:
      'Ali Bajraktar is the hero of two Palaj–Kurti songs, “Ali Bajraktari / Besa” (no. 13) and “The Wedding of Ali Bajraktari” (no. 14), whose marriage plot hinges on a besa sworn and kept even at the cost of one’s life. They are among the clearest expressions of the besa code within the frontier epic.',
    sources: [
      { label: 'Kângë Kreshnikësh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/K%C3%A2ng%C3%AB_Kreshnik%C3%ABsh' },
      { label: 'Besa (Albanian culture) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Besa_(Albanian_culture)' },
    ],
    related: ['kreshnik-epic', 'gjeto-basho-muji', 'besa'],
  },

  // ══ Living customs & superstitions (2026-07-08) ══
  {
    id: 'sunet',
    title: 'Synetia — the circumcision feast',
    category: 'Custom',
    summary:
      'The circumcision of a boy (usually about 5–10) is one of the biggest rites of Muslim Albanian family life — the majority community in Albania and Kosovo. Beyond the act itself (today usually done at a clinic), it is the occasion for a large feast: the boy is dressed up and celebrated and receives money and gifts from every guest; in conservative pockets whole villages still hold mass circumcisions with multi-day feasts.',
    sources: [
      { label: 'Albanian circumcision tradition (albanianblogger)', url: 'https://albanianblogger.com/albanian-circumcision-tradition/' },
      { label: 'Kosovo hamlet clings to mass circumcision (AFP/Yahoo)', url: 'https://sg.news.yahoo.com/kosovo-hamlet-clings-tradition-mass-circumcision-052348750.html' },
    ],
    related: ['dasma', 'fejesa', 'sulltan-nevruzi', 'mikpritja-oda'],
  },
  {
    id: 'bajrami',
    title: 'Bajrami — Fitër & Kurban Bajram (Eid)',
    category: 'Custom',
    summary:
      'The two Eids are the central Muslim feasts and, in practice, national celebrations. Fitër Bajram ("the Big Bajram") ends Ramadan with sweets and door-to-door family visiting, starting with the eldest and met everywhere with coffee and hospitality; Kurban Bajram centres on a sacrificed sheep whose meat is shared with neighbours and the poor. Children are given money at both, and non-Muslim neighbours routinely exchange greetings and visit.',
    sources: [
      { label: 'What is Bajram? (albaniannight)', url: 'https://albaniannight.com/what-is-bajram-7-facts-about-the-famous-albanian-holiday/' },
      { label: 'Eid among Albanians (Votra Magazine)', url: 'https://www.votramagazine.com/eid-among-albanians-a-tapestry-of-tradition-and-unity/' },
    ],
    related: ['kurbani', 'ramazani', 'harmonia-fetare', 'sulltan-nevruzi'],
  },
  {
    id: 'ramazani',
    title: 'Ramazani — the fast, syfyr & iftar',
    category: 'Custom',
    summary:
      'During the holy month observant Muslims fast dawn-to-dusk, taking syfyr (the pre-dawn meal) and breaking the fast at sunset with iftar, usually shared with family and friends; mosques host communal iftars and charity (sadaka) to the poor increases. Reflecting Albania’s interfaith character, Christians both host iftars for fasting friends and attend them as social gatherings.',
    sources: [
      { label: 'The Holy Month of Ramazan in Albania (Visit Tirana)', url: 'https://www.visit-tirana.com/news/the-holy-month-of-ramazan-in-albania/' },
      { label: 'Ramadan in Kosovo (Eurasia Review)', url: 'https://www.eurasiareview.com/14082011-ramadan-in-kosovo/' },
    ],
    related: ['bajrami', 'harmonia-fetare', 'kurbani'],
  },
  {
    id: 'pashket',
    title: 'Pashkët — Easter and the red eggs',
    category: 'Custom',
    summary:
      'Easter is the central Christian feast, kept on two dates — Catholic (Gregorian) and Orthodox (Julian), Albania’s "two Easters". Its most recognisable custom is the red-dyed egg, its shell the tomb and its red the blood and victory of Christ; families crack eggs against each other, share Easter bread and lamb, and greetings and visits cross confessional lines so Easter is partly a shared social occasion.',
    sources: [
      { label: 'Albania has "two Easters" (Visit Tirana)', url: 'https://www.visit-tirana.com/news/albania-has-two-easters-here-is-how-we-celebrate-them/' },
      { label: 'Easter in Albania (RTSH)', url: 'https://rtsh.al/rti/en/easter-in-albania-a-celebration-of-faith-family-and-interfaith-harmony/' },
    ],
    related: ['krishtlindjet', 'harmonia-fetare', 'shen-kolli'],
  },
  {
    id: 'krishtlindjet',
    title: 'Krishtlindjet — Christmas',
    category: 'Custom',
    summary:
      'Christian families keep Christmas with Midnight Mass, a meatless (often fish) Christmas-Eve fast breaking into a large Christmas-Day meal, and bakllava as a signature dessert; Catholics keep the tree from the Immaculate Conception (8 Dec) to Epiphany (6 Jan). Children receive gifts and carolling occurs, and — as with the other feasts — Christmas has become a broadly shared festive season marked across confessions.',
    sources: [
      { label: 'Christmas in Albania (Tirana Times)', url: 'https://www.tiranatimes.com/christmas-in-albania_101083/' },
      { label: 'How Christmas is celebrated in Albania (Illyria)', url: 'https://www.illyria.com/how-christmas-is-celebrated-in-my-homeland-albania/' },
    ],
    related: ['pashket', 'shen-kolli', 'nata-e-buzmit', 'harmonia-fetare'],
  },
  {
    id: 'harmonia-fetare',
    title: 'Harmonia fetare — interfaith visiting',
    category: 'Custom',
    summary:
      'Albanians are famous for a lived religious tolerance: neighbours, friends and even mixed families mark each other’s holidays — Muslims wishing Christians well and visiting at Easter and Christmas, Christians reciprocating at Bajram and attending iftars, mixed households keeping both calendars. The guiding sentiment, "the religion of the Albanian is Albanianism" (Pashko Vasa), treats faith as a private matter that does not divide social life — a point of national self-identity praised internationally.',
    sources: [
      { label: 'Religion in Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Religion_in_Albania' },
      { label: 'Interfaith harmony at Easter (RTSH)', url: 'https://rtsh.al/rti/en/easter-in-albania-a-celebration-of-faith-family-and-interfaith-harmony/' },
    ],
    related: ['bajrami', 'pashket', 'krishtlindjet', 'besa', 'mikpritja-oda'],
  },
  {
    id: 'kafeja',
    title: 'Kafeja turke — coffee culture and the café',
    category: 'Custom',
    summary:
      'Coffee is the everyday social ritual of Albanian life. At home it is kafe turke, ground fine and boiled in a small copper xhezve; out, the café (kafe) is the central social institution where friends, business and gossip unfold over hours in the avash-avash ("slowly, slowly") style — a single cup can anchor a whole afternoon. Offering coffee to a guest is inseparable from hospitality.',
    sources: [
      { label: 'Albanian coffee (albaniaturism)', url: 'https://albaniaturism.com/albanian-coffee/' },
      { label: 'Coffee culture in Albania (lostinalbania)', url: 'https://lostinalbania.com/coffee-culture-in-albania/' },
    ],
    related: ['mikpritja-oda', 'hospitality', 'sofra', 'fall-kafeja', 'rakia-gezuar'],
  },
  {
    id: 'rakia-gezuar',
    title: 'Rakia & "Gëzuar!" — the toast of welcome',
    category: 'Custom',
    summary:
      'Home-distilled grape (or plum) spirit, raki, is the drink of welcome, celebration and mourning alike; offering it signals trust and open-hearted hospitality, and declining without reason can read as a mild slight. Toasts are made with eye contact and "Gëzuar!" ("cheers"), often extended — për familjen (to the family), për ata që mungojnë (to those who are absent). In the north and centre coffee and raki are taken together.',
    sources: [
      { label: 'Albanian raki (albaniaturism)', url: 'https://albaniaturism.com/albanian-raki/' },
      { label: 'Albanian drinks (albanianregistry)', url: 'https://albanianregistry.org/blog/albania-drink' },
    ],
    related: ['mikpritja-oda', 'hospitality', 'kafeja', 'sofra'],
  },
  {
    id: 'fejesa',
    title: 'Fejesa — the betrothal',
    category: 'Custom',
    summary:
      'The formal engagement, held weeks or months before the wedding, is a public commitment binding two families, not just the couple. The groom’s father leads a delegation to the bride’s home with gifts and a formal request for her hand; sweets are standard and in the north raki is exchanged between the fathers to seal it. Engagement rings are worn on the right hand and moved to the left at the wedding; the bride receives gold, and the two families become krushqit (in-laws), a bond of real weight.',
    sources: [
      { label: 'Albanian weddings — traditions (albanianregistry)', url: 'https://albanianregistry.org/blog/albanian-wedding' },
      { label: 'Albanian wedding traditions (albanianblogger)', url: 'https://albanianblogger.com/albanian-weddings-traditions-guide/' },
    ],
    related: ['dasma', 'paja', 'nata-e-kenases', 'besa'],
  },
  {
    id: 'nata-e-kenases',
    title: 'Nata e kënasë — the henna night',
    category: 'Custom',
    summary:
      'Held the night before the wedding at the bride’s home, this women-only gathering has an older woman from the groom’s side apply henna to the bride’s hands (and sometimes feet), symbolising fertility, protection and the passage between households. Women sing traditional songs — some joyful, some mournful — and the bride’s female relatives often weep openly. It is called the wedding ritual that has survived most intact, in homeland and diaspora alike.',
    sources: [
      { label: 'Albanian wedding henna night (albanianblogger)', url: 'https://albanianblogger.com/albanian-weddings-traditions-guide/' },
      { label: 'The Kosovar henna night (J. of Kosovo Music & Culture 2025)', url: 'https://kosovomusicculture.com/index.php/jkmc/article/download/20/10' },
    ],
    related: ['dasma', 'fejesa', 'vajtim', 'paja'],
  },
  {
    id: 'te-dyzetat',
    title: 'Të dyzetat — the forty days & death commemoration',
    category: 'Custom',
    summary:
      'Distinct from the death laments, this is the cycle of commemoration after burial. Mourners come to të pamet (condolence visits) where the household serves Turkish coffee continuously; memorial meals are held at the 7th day, the 40th (të dyzetat — the largest), six months, one year (të përvjetmit) and sometimes three. A candle and glass of water may be kept forty days for the soul’s journey, close family wear black for a year or longer, and sweets — halva above all — are shared "për shpirt" (for the soul).',
    sources: [
      { label: 'Albanian funeral traditions (Frazer)', url: 'https://web.frazerconsultants.com/cultural-spotlight-albanian-funeral-traditions/' },
      { label: 'The funeral ceremony — Albanian ICH registry', url: 'https://regjistritkj.al/en/riti-i-ceremonise-mortore/' },
    ],
    related: ['vajtim', 'gjama-e-burrave', 'mikpritja-oda', 'kurbani'],
  },
  {
    id: 'kurbeti',
    title: 'Kurbeti — labour migration and the return',
    category: 'Custom',
    summary:
      'Kurbet (from Turkish gurbet, "out in the world") is the centuries-old pattern of going abroad to earn while the family stays "here," steeped in themes of sacrifice, longing and eventual return, and sung in whole cycles of kurbet songs. Today it means mass emigration to Greece, Italy, Germany and beyond, remittances forming a large share of GDP, and the ritual summer return of the diaspora — packed villages, weddings timed to the holidays, houses built with money sent home.',
    sources: [
      { label: 'Albanian diaspora (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_diaspora' },
      { label: 'The Balkan Gurbet (Springer)', url: 'https://link.springer.com/chapter/10.1007/978-3-319-13719-3_2' },
    ],
    related: ['besa', 'mikpritja-oda', 'vajtim'],
  },
  {
    id: 'pagezimi',
    title: 'Pagëzimi & kumbaria — baptism and godparenthood',
    category: 'Custom',
    summary:
      'For Christian Albanians infant baptism is the central early-life rite, and the godparent (kumbar) bond it creates is lifelong and near-familial — a real social obligation between two families, historically deep in Albanian Catholicism (which even kept a lay baptismal formula for when no priest could be reached). The baptism doubles as the naming of the child and the gathering of the extended family.',
    sources: [
      { label: 'Baptism — Orthodox Church of Albania', url: 'https://orthodoxalbania.org/2026/en/2015/05/13/baptism/' },
      { label: 'Catholic Church in Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Catholic_Church_in_Albania' },
    ],
    related: ['lindja-besiku', 'vellameri', 'shen-kolli'],
  },
  {
    id: 'syri-apparati',
    title: 'Dordoleci & syni — the evil-eye apparatus',
    category: 'Custom',
    summary:
      'The most visibly practiced Albanian superstition today. To deflect syri i keq (envy that spoils what it looks at), Albanians hang a dordolec — a scarecrow or stuffed figure, and increasingly a teddy bear, doll or inflatable animal — on new and unfinished buildings, cranes and luxury blocks, alongside garlic, horseshoes, red cloth and the blue nazar bead in cars and on babies. The envious gaze is meant to fixate on the odd object instead of the property; explicitly a practice that has come back into fashion with post-communist wealth, not a fading one.',
    sources: [
      { label: 'The dordolec & the evil eye (Michael Harrison)', url: 'https://michaelharrison.org.uk/2013/05/the-dordolec-the-evil-eye-and-superstition-in-albania/' },
      { label: 'Teddy bears ward off the evil eye (Matador)', url: 'https://matadornetwork.com/abroad/teddy-bears-and-talismans-warding-off-the-evil-eye-in-albania/' },
    ],
    related: ['evil-eye', 'emri-tabu', 'lindja-besiku', 'kurbani', 'besime-popullore'],
  },
  {
    id: 'mashallah-ptu',
    title: 'Mashallah & pështyj — praising safely',
    category: 'Custom',
    summary:
      'Because a compliment can carry the evil eye, Albanians neutralise praise — of babies, brides and possessions above all — by saying "mashallah" ("God has willed it") straight after admiring, and by spitting three times without saliva ("ptu ptu ptu") so the admiration cannot "stick". It is the everyday verbal-and-gestural layer of the evil-eye belief, performed reflexively even by the non-religious and by Christians, across Albania and Kosovo.',
    sources: [
      { label: 'Nazar (amulet) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Nazar_(amulet)' },
      { label: '21 superstitions in Albania (Magic Towns)', url: 'https://magictowns.al/21-interesting-superstitions-in-albania/' },
    ],
    related: ['evil-eye', 'syri-apparati', 'lindja-besiku'],
  },
  {
    id: 'plumbi-frika',
    title: 'Të prishunit e plumbit — lead-pouring against fright',
    category: 'Custom',
    summary:
      'A folk-healing divination (molybdomancy) still performed by older women on children and pregnant women thought to suffer frika (a fright-induced malaise) or the evil eye: molten lead is poured into cold water over the afflicted person’s head, and the hardened shapes both diagnose the cause and are believed to draw the fear out. It is argued to have Illyrian roots; still practiced but fading, and now flagged by doctors as a lead-poisoning risk.',
    sources: [
      { label: 'Molybdomancy (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Molybdomancy' },
      { label: 'Albanian paganism (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' },
    ],
    related: ['evil-eye', 'syri-apparati', 'shtriga'],
  },
  {
    id: 'fall-kafeja',
    title: 'Fall me kafe — reading the coffee grounds',
    category: 'Custom',
    summary:
      'Reading the future in the sediment of Turkish coffee (fall / të parit e filxhanit) is a routine, sociable ritual: the cup is inverted onto the saucer to cool, then turned and "read" by the shapes of the grounds relative to the handle (love in one quadrant, the far future in another). Tuesday and Friday are the auspicious reading days; Sunday is avoided. Done casually and half-jokingly by women across all backgrounds, it survives even where belief is loose.',
    sources: [
      { label: 'Albanian art of coffee-ground reading (Orange Tours)', url: 'https://orangetours.pl/en/albanian-art-of-coffee-ground-reading-magic-hidden-in-a-coffee-cup/' },
      { label: 'Tasseography (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Tasseography' },
    ],
    related: ['kafeja', 'fatia-mira', 'ora', 'e-marta'],
  },
  {
    id: 'e-marta',
    title: 'E marta, dita ters — unlucky Tuesday',
    category: 'Custom',
    summary:
      'Tuesday (e martë) is widely held unlucky — a bad day to start anything important: to set out on a journey, marry, sign, or begin serious work — the folk reasoning being that Tuesday holds a sahat ters, an "unlucky hour". Many older women will not do housework or laundry on a Tuesday (though it is, paradoxically, a favoured day for coffee and lead divination). Still invoked, if lightly, and softening in the cities.',
    sources: [
      { label: 'Best of Albanian superstitions (Albania360)', url: 'https://albania360.com/things-to-do/best-of-albanian-superstitions-for-relationships-marriage-and-money/' },
    ],
    related: ['fall-kafeja', 'besime-popullore', 'dita-e-veres'],
  },
  {
    id: 'nusja-omens',
    title: 'Nusja e re — the bride’s luck-rites',
    category: 'Custom',
    summary:
      'Wedding-arrival rituals still enacted when a bride enters her husband’s home: the mother-in-law waits with honey and smears it on the doorframe (or feeds the bride a spoonful) so the household will be "sweet"; leaving her own home the bride discreetly throws an egg behind her; and some brides carry a charm against the evil eye on their exposed, envied wedding day. The groom’s family should not glimpse the bride prematurely, lest her radiance fade.',
    sources: [
      { label: 'Best of Albanian superstitions (Albania360)', url: 'https://albania360.com/things-to-do/best-of-albanian-superstitions-for-relationships-marriage-and-money/' },
      { label: 'Superstitions in Albania (Go As Local)', url: 'https://goaslocal.com/superstitions-in-albania/' },
    ],
    related: ['dasma', 'nata-e-kenases', 'evil-eye', 'paja'],
  },
  {
    id: 'barra-besime',
    title: 'Barra — pregnancy beliefs',
    category: 'Custom',
    summary:
      'Two strongly-held, still-current pregnancy beliefs. An unsatisfied craving marks the baby with a birthmark shaped like the craved food — so a pregnant woman’s cravings are indulged at all costs. And there is a reluctance to prepare for or celebrate the baby before it is safely born: gifts and purchases wait until after the birth, and older women resist bringing baby things into the house — part superstition, part refusal to "assume a good outcome". Both are near-universal in Albania and Kosovo.',
    sources: [
      { label: '13 Albanian superstitions (Health for Albania)', url: 'https://healthforalbania.wordpress.com/2014/06/14/13-albanian-superstitions/' },
      { label: 'Albanian gifts: a diaspora guide (albanianregistry)', url: 'https://albanianregistry.org/blog/albania-gifts' },
    ],
    related: ['lindja-besiku', 'evil-eye', 'fatia-mira'],
  },
  {
    id: 'pragu',
    title: 'Pragu — the threshold taboos',
    category: 'Custom',
    summary:
      'The doorway/threshold (pragu) is a charged boundary: you must not shake hands, greet, hug or pass any object across it — do it inside or outside, never on the line — or you invite a quarrel, sever a friendship, or let spirits in. A related returning-taboo: if you leave the house and must turn back for something, sit down briefly before setting out again, or the trip is jinxed. It is genuinely observed in daily etiquette, especially with older hosts.',
    sources: [
      { label: 'Albanian social etiquette (AlbaniaVisit)', url: 'https://albaniavisit.com/travel-guide/albanian-social-etiquette-guide/' },
      { label: 'Best of Albanian superstitions (Albania360)', url: 'https://albania360.com/things-to-do/best-of-albanian-superstitions-for-relationships-marriage-and-money/' },
    ],
    related: ['mikpritja-oda', 'hospitality', 'besime-popullore', 'vitore'],
  },
  {
    id: 'besime-popullore',
    title: 'Besime popullore — everyday omens & taboos',
    category: 'Custom',
    summary:
      'The living layer of small omens said reflexively: an itchy palm means money is on the move, a random sneeze that someone is talking of you, hiccups that someone is saying your name, hot/ringing ears that you are being discussed, a dropped knife that a male guest is coming (a spoon a female one). And the household taboos still kept: no whistling indoors (it whistles money away and calls the devil), no cutting nails at night, no umbrella opened inside, hand a knife by laying it down not passing it, no handbag on the floor (money "flies"), no sweeping after dark. An owl or a howling dog by the house foretells a death, and a broken mirror brings seven years’ bad luck — while, in an Albanian inversion, spilled sugar or coffee is good luck. Most are pan-Balkan, but all are genuinely still said.',
    sources: [
      { label: '21 superstitions in Albania (Magic Towns)', url: 'https://magictowns.al/21-interesting-superstitions-in-albania/' },
      { label: '13 Albanian superstitions (Health for Albania)', url: 'https://healthforalbania.wordpress.com/2014/06/14/13-albanian-superstitions/' },
    ],
    related: ['evil-eye', 'emri-tabu', 'syri-apparati', 'pragu', 'e-marta'],
  },
]

// Map every ending node id (from content.js) to the FOLKLORE entry id it draws from.
// Endings that share a tale point to the same folklore id.
export const ENDING_LORE = {
  // Custom / besa / hospitality / feud / evil eye
  syriKeqFund: 'evil-eye',
  besaFire: 'hospitality',
  breshkaMire: 'tortoise',
  breshkaFund: 'tortoise',
  riddleFund: 'tortoise',
  mejdanKeq: 'besa',
  besaVella: 'besa',
  besaThyer: 'besa',
  vajtimFund: 'vajtim',
  veraDiteFund: 'dita-e-veres',
  kulleFal: 'kanun-blood-feud',
  kulleGjak: 'kanun-blood-feud',
  gjakFund: 'kanun-blood-feud',
  diellShenjt: 'dielli',
  dordolecFund: 'dodola',

  // Aga Ymer (returning husband)
  agaYmerStay: 'aga-ymer',
  agaYmerFund: 'aga-ymer',

  // Stihi / treasure guardians / Durham cavern
  stihiDjeg: 'stihi',
  stihiFund: 'stihi',
  thesarKthyer: 'gjakova-cavern',
  gjarperNgrene: 'gjakova-cavern',
  thesarLeave: 'gjakova-cavern',
  gjarperVrare: 'vitore',

  // Mujo / Halil / kreshnik epic
  mujoHakFund: 'mujo-avenges-halil',
  mujoHakKeq: 'mujo-avenges-halil',
  mujiFund: 'mujo-strength',
  mujiPasuri: 'mujo-strength',
  mujiDije: 'mujo-strength',
  zanaGold: 'mujo-strength',
  zanaDije: 'mujo-strength',
  dhiaFund: 'mujo-zanas',
  kaliFund: 'mujo-courser',
  halilFund: 'kreshnik-epic',
  halilKeq: 'kreshnik-epic',
  mujoFund: 'halil-marriage',
  rushaFund: 'zuku-bajraktar',
  rushaKeq: 'zuku-bajraktar',
  zukuFund: 'zuku-bajraktar',
  omerFund: 'death-of-omer',

  // Beauties of Sea / Earth / Sky
  detiNuse: 'bukura-e-detit',
  detiUp: 'bukura-e-detit',
  detiNgrene: 'bukura-e-detit',
  detiStuhi: 'kulshedra',
  portaVdes: 'bukura-e-dheut',
  diellApex: 'dielli',
  henaPaqe: 'hena',

  // The main spine: drought, Kulshedra, dragua, underworld, eagle
  shtepia: 'scurfhead',
  mishiVetes: 'scurfhead',
  dranguasi: 'drangue',
  ujkuUje: 'drangue',
  djegur: 'kulshedra',
  bijaHeneFund: 'bija-hene-diell',
  syriFund: 'syri-kalter',
  bollaFund: 'bolla',
  lubiaFund: 'lubia',

  // Rozafa
  murosur: 'rozafa',

  // Ora / Fates
  oraBardhe: 'ora',
  oraZeze: 'ora',
  oraVerdhe: 'ora',
  djepiFund: 'ora',

  // Wolf
  eaten: 'wolf',
  ujkuFund: 'creation-wolf',

  // Shtojzovalle
  shtojzovalleVallja: 'shtojzovalle',
  shtojzovalleLot: 'shtojzovalle',
  shtojzovalleNuse: 'shtojzovalle',
  shtojzovalleBekim: 'shtojzovalle',

  // Floçka / Peri / Xhindi
  flockaFund: 'flocka',
  periFund: 'peri',
  periKeq: 'peri',
  xhindFund: 'xhindi',
  xhindKeq: 'xhindi',

  // Shtriga
  shtrigaIkur: 'shtriga',
  nenaShtrige: 'shtriga',

  // Sons of the Eagle / Sari Salltëk
  shqipeFund: 'sons-of-eagle',
  sariFund: 'sari-salltek',

  // Snake bridegroom
  gjarperBurrVdes: 'snake-bridegroom',
  gjarperRefuz: 'snake-bridegroom',
  gjarperKulVdes: 'snake-bridegroom',
  gjarperBurrFund: 'snake-bridegroom',

  // Nastradin Hoxha
  nastradinFund: 'nastradin',
  nastradinUrte: 'nastradin',
  nastradinGjyqFund: 'nastradin',
  nastradinGjyqKeq: 'nastradin',

  // Constantine & Doruntine
  kostandinFund: 'constantine-doruntine',
  kostandinPushim: 'constantine-doruntine',

  // Gjizar the Nightingale
  gjizarKap: 'gjizar',
  gjizarPus: 'gjizar',
  gjizarFund: 'gjizar',

  // Tomor & Shpirag
  shpiragFund: 'tomor-shpirag',

  // Gjergj Elez Alia / the Baloz
  balozFitore: 'gjergj-elez-alia',
  bregFle: 'gjergj-elez-alia',
  bregHumb: 'gjergj-elez-alia',

  // Nëna e Diellit
  nenaDiellFund: 'nena-e-diellit',

  // Karkanxholl / Kukudh / Dhampir
  karkanxhollFund: 'karkanxholl',
  karkanxhollKeq: 'karkanxholl',
  kukudhFund: 'kukudh',
  dhampirFund: 'dhampir',

  // Kuma Lisa the fox
  dhelpraFund: 'kuma-lisa',
  dhelpraKeq: 'kuma-lisa',

  // The Maiden Promised to the Sun / Goose-Girl & marble king
  pallatiKthim: 'maiden-promised-sun',
  diellKulVdes: 'maiden-promised-sun',
  pemaVdes: 'maiden-promised-sun',
  mbretiDrejtesi: 'goose-girl',
  patatHesht: 'goose-girl',
  mermerSli: 'goose-girl',

  // Half-Rooster
  gjysmegjelFund: 'half-rooster',

  // Bear & Dervish / Cuckoo / Bee-Spider / Swallow
  arusheFund: 'bear-dervish',
  cuckooFund: 'cuckoo',
  bletaFund: 'bee-spider-cicada',
  merimangaFund: 'bee-spider-cicada',
  dallendysheFund: 'swallow',

  // Katallan
  katallanFund: 'katallan',
  katallanVdes: 'katallan',

  // Shurdhi / i Verbti / Zojz / Prende (the mountain-of-the-sky-father climax)
  shurdhiFund: 'shurdhi',
  ereHumbur: 'shurdhi',
  verbtiFund: 'i-verbti',
  verbtiVdes: 'i-verbti',
  qiellVerbuar: 'i-verbti',
  zojzBekim: 'zojz',
  zojzRrufe: 'zojz',
  demKeq: 'zojz',
  prendeFund: 'prende',
  prendeBekim: 'prende',
  ylberKaprcim: 'prende',

  // The Three Friends (Kordha / Ylli / Deti)
  kordhaMoatVdes: 'three-friends',
  kordhaZjarr: 'three-friends',
  kordhaProvaVdes: 'three-friends',
  kordhaFund: 'three-friends',
  kordhaDeti: 'three-friends',
}

// ── AREA FACTOIDS ────────────────────────────────────────────────────────────
// A factoid you earn NOT by reaching one story node, but by exploring a whole
// region of the world (see src/game/regions.js). Once you've visited `threshold`
// of a region's nodes, a banner offers a comprehension test drawn from `quizNodes`;
// pass it and you earn the factoid (all hearts restored) — the deeper folklore
// summary + reference links come from the FOLKLORE card `lore`.
//   region:    a region key from REGIONS in src/game/regions.js
//   threshold: fraction (0–1) of that region's nodes you must have visited
//   quizNodes: story nodes whose lines seed the comprehension quiz
//   lore:      FOLKLORE id supplying the summary + source links
export const AREA_FACTOIDS = [
  {
    id: 'area-tomorr',
    region: 'mountain',
    title: 'Mount Tomorr — the sky-father’s mountain',
    blurb:
      'You have walked Mount Tomorr end to end — the trailhead, the storm on its shoulders, the white-bull offering carried to the summit where Zojz the sky-father sits, white-bearded, the she-eagles wheeling about him and the winds for his servants. The highlanders still climb it on pilgrimage; the thunderbolt still seeks the proud and the tall. You have come to know the holy mountain.',
    threshold: 0.6,
    quizNodes: ['mali1', 'tomor1', 'maja'],
    lore: 'zojz',
  },
  {
    id: 'area-river',
    region: 'river',
    title: 'The river & the Zana',
    blurb:
      'You have followed the river through its whole quarter — the dry bed running down from Tomorr, the bridge, the pools where the Zana keep their vigil. The Zana are the fierce mountain-fairies who suckled the hero Mujo to a strength greater than a drangue’s, who bless the one who honours them and blind the one who does not. You have come to know the river and its fairies.',
    threshold: 0.6,
    quizNodes: ['lumi', 'zana1', 'ura'],
    lore: 'peri',
  },
  {
    id: 'area-forest',
    region: 'forest',
    title: 'The great forest',
    blurb:
      'You have wandered the great forest from edge to edge — the trees, the night-fire, the sleep and the waking. It is here, at a stranger’s fire, that the Ora comes: the fate-spirit who guards a life and rewards the sacred besa of hospitality, for a guest is sent by God. You have come to know the wild wood and what walks in it.',
    threshold: 0.6,
    quizNodes: ['pylli1', 'zjarriPyll', 'pylliLoop'],
    lore: 'ora',
  },
]

// ── The primary-source CORPUS ────────────────────────────────────────────────
// The real books and collections behind the library. Downloaded public-domain
// full texts live in docs/references/ (see that folder's README); `local` is the
// repo-relative path, opened via GitHub in the Debug → 📚 Sources panel.
//   lang:    'sq' Albanian · 'de'/'fr'/'en' · combos e.g. 'de+sq' bilingual
//   kind:    'epic' | 'anthology' | 'tales' | 'grammar' | 'ethnography' | 'portal'
//   license: 'Public domain' | 'CC-BY-SA' | 'Copyright uncertain' | '© in copyright'
//   online:  [{label,url,fmt}]  fmt: 'txt'|'pdf'|'html'|'catalog'
//   local:   downloaded plain-text copy (repo path) or null
//   covers:  FOLKLORE ids this source documents
export const REPO_BLOB = 'https://github.com/miketamis/adventure/blob/main/'

export const CORPUS = [
  // ── Albanian-language full texts we hold locally ──
  {
    id: 'src-fishta-lahuta',
    title: 'Lahuta e Malcís',
    author: 'Gjergj Fishta', year: '1937 (Rome 1958)', lang: 'sq', kind: 'epic',
    license: 'Public domain',
    summary:
      'The Albanian national epic — 30 songs, 17,000+ Gheg verses of the highland wars, shot through with the zana, the ora, the besa and the Kanun. The single cleanest Albanian-language full text in the corpus.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/lahuta-e-malcis-rome-1958-hr-150', fmt: 'html' },
      { label: 'plain text (_djvu.txt)', url: 'https://archive.org/download/lahuta-e-malcis-rome-1958-hr-150/lahuta-e-malcis-rome-1958-hr-150_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/fishta-lahuta-e-malcis.sq.txt',
    covers: ['kreshnik-epic', 'zana-e-malit', 'ora', 'besa', 'kanuni', 'kanun-blood-feud'],
  },
  {
    id: 'src-naim-skenderbeu',
    title: 'Historia e Skënderbeut',
    author: 'Naim Frashëri', year: '1898', lang: 'sq', kind: 'epic',
    license: 'Public domain',
    summary:
      'The Rilindja verse-epic of Skanderbeg in ~11,500 lines — the closest thing to a canonical Albanian Skanderbeg text, and a touchstone of the national legend.',
    online: [
      { label: 'Wikisource — full text', url: 'https://wikisource.org/wiki/Historia_e_Sk%C3%ABnderbeut', fmt: 'html' },
    ],
    local: 'docs/references/naim-historia-e-skenderbeut.sq.txt',
    covers: ['skanderbeg-legjenda', 'sons-of-eagle'],
  },
  {
    id: 'src-ymer-ulqini',
    title: 'Ymer Agë Ulqini (këngë)',
    author: 'oral tradition (Krajë)', year: 'trad.', lang: 'sq', kind: 'epic',
    license: 'CC-BY-SA',
    summary:
      'The full highland song of the husband home from nine years\' captivity, reaching his door on the eve of his wife\'s re-wedding — the northern "returning captive" ballad.',
    online: [
      { label: 'sq.wikibooks — full song', url: 'https://sq.wikibooks.org/wiki/Ymer_Ag%C3%AB_Ulqini', fmt: 'html' },
    ],
    local: 'docs/references/ymer-age-ulqini.sq.txt',
    covers: ['aga-ymer', 'kostandini-i-vogel', 'besa'],
  },
  {
    id: 'src-vajtimi-ajkunes',
    title: 'Vajtimi i Ajkunës',
    author: 'oral tradition', year: 'trad.', lang: 'sq', kind: 'epic',
    license: 'CC-BY-SA',
    summary:
      'Ajkuna\'s lament for her son Omer from the kreshnik cycle — the mother\'s grief that "the sun rose and gave no warmth." A rare clean Albanian full text of a frontier-warrior song.',
    online: [
      { label: 'sq.wikibooks — full verse', url: 'https://sq.wikibooks.org/wiki/Vajtimi_i_Ajkun%C3%ABs', fmt: 'html' },
    ],
    local: 'docs/references/vajtimi-i-ajkunes.sq.txt',
    covers: ['death-of-omer', 'mujo-strength', 'kreshnik-epic', 'vajtim'],
  },
  // ── Bilingual (Albanian originals + scholarly translation), held locally ──
  {
    id: 'src-dozon-manuel',
    title: 'Manuel de la langue chkipe ou albanaise',
    author: 'Auguste Dozon', year: '1878', lang: 'fr+sq', kind: 'grammar',
    license: 'Public domain',
    summary:
      'Dozon\'s chrestomathy carries the ALBANIAN ORIGINALS of the tales he translated in Contes albanais — the Tosk source texts of "The Snake and the King\'s Daughter," the Earthly Beauty tales and more.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/manueldelalangue00dozouoft', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/manueldelalangue00dozouoft/manueldelalangue00dozouoft_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
    covers: ['bukura-e-dheut', 'snake-bridegroom', 'three-friends', 'half-rooster'],
  },
  {
    id: 'src-hahn-studien',
    title: 'Albanesische Studien',
    author: 'Johann Georg von Hahn', year: '1854', lang: 'de+sq', kind: 'grammar',
    license: 'Public domain',
    summary:
      'The founding work of Albanology — grammar, Albanian language-samples ("Sprachproben") and an Albanian–German lexicon. The earliest scholarly window on the living tradition.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/bub_gb_IPIGAAAAQAAJ', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/bub_gb_IPIGAAAAQAAJ/bub_gb_IPIGAAAAQAAJ_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/hahn-albanesische-studien.de-sq.txt',
    covers: ['creation-wolf', 'cuckoo', 'scurfhead'],
  },
  {
    id: 'src-jarnik',
    title: 'Zur albanischen Sprachenkunde',
    author: 'Jan Urban Jarník', year: '1881', lang: 'de+sq', kind: 'grammar',
    license: 'Public domain',
    summary:
      'Gheg tales and language material from the Shkodër region with interlinear German glosses — a bilingual field record of northern folk narrative.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/zuralbanischens00jarngoog', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/zuralbanischens00jarngoog/zuralbanischens00jarngoog_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/jarnik-zur-albanischen-sprachenkunde.de-sq.txt',
    covers: ['bukura-e-dheut', 'katallan'],
  },
  {
    id: 'src-lambertz',
    title: 'Albanische Märchen',
    author: 'Maximilian Lambertz', year: '1922', lang: 'de+sq', kind: 'tales',
    license: 'Public domain',
    summary:
      'A bilingual folktale collection with the Albanian source texts — Lambertz also gathered the highland Drangue-vs-Kulshedra belief-legends that anchor the eternal duel.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/albanischemarchenlambertz', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/albanischemarchenlambertz/albanischemarchenlambertz_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/lambertz-albanische-marchen.de-sq.txt',
    covers: ['kulshedra', 'drangue', 'bukura-e-dheut', 'binoshet'],
  },
  {
    id: 'src-meyer-grammatik',
    title: 'Kurzgefasste albanesische Grammatik mit Lesestücken',
    author: 'Gustav Meyer', year: '1888', lang: 'de+sq', kind: 'grammar',
    license: 'Public domain',
    summary:
      'Meyer\'s reader carries three Tosk fairy tales from Korça, the Prodigal Son in six Albanian dialects (incl. two Arbëresh), wedding songs, and a full glossary — a dialect cross-section of the folk voice.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/kurzgefasstealb00meyegoog', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/kurzgefasstealb00meyegoog/kurzgefasstealb00meyegoog_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/meyer-kurzgefasste-grammatik.de-sq.txt',
    covers: ['bukura-e-dheut'],
  },
  // ── Translation-only, public domain, held locally ──
  {
    id: 'src-hahn-marchen',
    title: 'Griechische und albanesische Märchen',
    author: 'Johann Georg von Hahn', year: '1864', lang: 'de', kind: 'tales',
    license: 'Public domain',
    summary:
      'Von Hahn\'s German translations — the Albanian tales are Nos. 95–114, the reference numbering scholars still cite (e.g. No. 104 the Cuckoo, No. 105 Why the Wolf Devours).',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/griechischeunda00hahngoog', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/griechischeunda00hahngoog/griechischeunda00hahngoog_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/hahn-griechische-albanesische-marchen.de.txt',
    covers: ['creation-wolf', 'cuckoo', 'three-friends', 'bukura-e-dheut'],
  },
  {
    id: 'src-dozon-contes',
    title: 'Contes albanais',
    author: 'Auguste Dozon', year: '1881', lang: 'fr', kind: 'tales',
    license: 'Public domain',
    summary:
      'The first Western folktale collection devoted to Albania — French translations of tales gathered around Janina/Epirus. Its Albanian originals are in Dozon\'s Manuel (above).',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/contesalbanais00unse_0', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/contesalbanais00unse_0/contesalbanais00unse_0_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/dozon-contes-albanais.fr.txt',
    covers: ['half-rooster', 'snake-bridegroom', 'three-friends', 'gjizar'],
  },
  {
    id: 'src-durham',
    title: 'High Albania and its Customs in 1908',
    author: 'M. Edith Durham', year: '1910', lang: 'en', kind: 'ethnography',
    license: 'Public domain',
    summary:
      'Durham\'s eyewitness ethnography of the northern highlands — the Kanun, besa and blood-feud, the ora and zana, and the Gjakova dead-city cavern all come to us partly through her. The single richest English source for the custom-lore.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/highalbaniaitscu00durh', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/highalbaniaitscu00durh/highalbaniaitscu00durh_djvu.txt', fmt: 'txt' },
      { label: 'UPenn — free HTML (1909 ed.)', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html', fmt: 'html' },
    ],
    local: 'docs/references/durham-high-albania-1908.en.txt',
    covers: ['gjakova-cavern', 'kanun-blood-feud', 'kanuni', 'besa', 'hospitality', 'ora', 'zana-e-malit', 'rozafa'],
  },
  {
    id: 'src-garnett',
    title: 'The Women of Turkey and their Folk-lore',
    author: 'Lucy M. J. Garnett', year: '1890', lang: 'en', kind: 'ethnography',
    license: 'Public domain',
    summary:
      'A Victorian folklorist\'s survey with a dedicated section on Albanian women\'s folk-poesy, laments, witchcraft and the evil eye — an early English record of the shtriga and syri i keq.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/womenofturkeythe01garn', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/womenofturkeythe01garn/womenofturkeythe01garn_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/garnett-women-of-turkey.en.txt',
    covers: ['shtriga', 'evil-eye', 'vajtim'],
  },
  {
    id: 'src-wheeler',
    title: 'Albanian Wonder Tales',
    author: 'Post Wheeler', year: '1936', lang: 'en', kind: 'tales',
    license: 'Copyright uncertain (freely readable on archive.org)',
    summary:
      'Ten English retellings incl. "The Boy who was Brother to the Drague," "The Girl who took a Snake for Husband" and "Gizari the Nightingale." 1936 falls in the US renewal window — treat copyright as uncertain; linked and mirrored, not asserted as public domain.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/in.ernet.dli.2015.89271', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/stream/in.ernet.dli.2015.89271/2015.89271.Albanian-Wonder-Tales_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/wheeler-albanian-wonder-tales.en.txt',
    covers: ['gjizar', 'snake-bridegroom', 'drangue', 'scurfhead'],
  },
  // ── Prestige Albanian originals NOT cleanly digitized — link only ──
  {
    id: 'src-mitko-bleta',
    title: 'Bleta shqiptare (Αλβανικη μελισσα)',
    author: 'Thimi Mitko', year: '1878', lang: 'sq', kind: 'anthology',
    license: 'Public domain (no free full text located)',
    summary:
      '505 folk songs and 39 tales/sayings of the Tosk south — the first great Albanian folklore anthology. No clean free scan exists online; recorded here as a catalog pointer.',
    online: [
      { label: 'Google Books (metadata)', url: 'https://books.google.com/books/about/Bleta_shqiptare.html?id=thhj0AEACAAJ', fmt: 'catalog' },
    ],
    local: null,
    covers: ['bukura-e-dheut', 'kuma-lisa', 'nastradin'],
  },
  {
    id: 'src-dine-valet',
    title: 'Valët e Detit',
    author: 'Spiro Dine', year: '1908', lang: 'sq', kind: 'anthology',
    license: 'Public domain (page-image scan)',
    summary:
      'The longest Albanian book of its day (~894 pp); its second half is a vast folklore collection of songs and tales. The full scan is online at the National Library of Albania as page images (IIIF viewer, no plain-text/PDF), so it is linked rather than held as text.',
    online: [
      { label: 'BKSH digital library — full 894-page scan', url: 'https://bibliotekadigjitale.bksh.al/?manifest=https://bibliotekadigjitale.bksh.al/iiif/Manifester/IIIF/libra1!HASHd86a.dir', fmt: 'html' },
      { label: 'exlibris.al (study)', url: 'https://exlibris.al/emil-lafe-valet-e-detit-nje-permendore-e-folklorit-shqiptar/', fmt: 'catalog' },
    ],
    local: null,
    covers: ['bukura-e-dheut', 'dielli', 'hena'],
  },
  {
    id: 'src-visaret-kombit',
    title: 'Visaret e Kombit II — Kângë kreshnikësh dhe legjenda',
    author: 'Bernardin Palaj & Donat Kurti', year: '1937', lang: 'sq', kind: 'epic',
    license: 'Public domain (catalog only)',
    summary:
      'THE canonical printed corpus of the frontier-warrior epic — 34 songs / 8,199 Gheg verses of the Mujo–Halil cycle. Digitized only as an image catalog at Shkodra University (no PDF exposed); the source behind Gjergj Elez Alia, Arnaut Osmani, Mujo e Behuri and the rest.',
    online: [
      { label: 'Shkodra digital archive (catalog)', url: 'https://adsh.unishk.edu.al/index.php/items/show/526', fmt: 'catalog' },
    ],
    local: null,
    covers: ['kreshnik-epic', 'gjergj-elez-alia', 'arnaut-osmani', 'muji-e-behuri', 'mujo-strength', 'halil-marriage', 'death-of-omer'],
  },
  {
    id: 'src-pedersen',
    title: 'Albanesische Texte mit Glossar',
    author: 'Holger Pedersen', year: '1895', lang: 'sq+de', kind: 'anthology',
    license: 'Public domain (no free full text located)',
    summary:
      'Albanian folk-narrative texts with a German glossary — a key linguistic-folkloric record. No verified free download; BnF catalog pointer.',
    online: [
      { label: 'BnF catalogue', url: 'https://catalogue.bnf.fr/ark:/12148/cb31072424j', fmt: 'catalog' },
    ],
    local: null,
    covers: ['bukura-e-dheut', 'kulshedra'],
  },
  // ── Modern / in-copyright — linked, never ingested ──
  {
    id: 'src-elsie-folktales',
    title: 'Albanian Folktales and Legends + albanianliterature.net',
    author: 'Robert Elsie (ed./tr.)', year: '2001', lang: 'en', kind: 'tales',
    license: '© in copyright (freely readable)',
    summary:
      'Elsie\'s English translations and his vast albanianliterature.net archive are the go-to modern reference — "Gjizar the Nightingale," the frontier-warrior songs, the legends. In copyright; linked, not ingested.',
    online: [
      { label: 'Folktales index (Elsie)', url: 'http://www.albanianliterature.net/folktales/', fmt: 'html' },
      { label: 'Songs of the Frontier Warriors / oral verse', url: 'http://www.albanianliterature.net/oralverse/', fmt: 'html' },
      { label: 'archive.org mirror (free)', url: 'https://archive.org/details/albfolk', fmt: 'html' },
    ],
    local: null,
    covers: ['gjizar', 'kreshnik-epic', 'scurfhead', 'three-friends', 'rrapi', 'skanderbeg-legjenda'],
  },
  {
    id: 'src-kuteli',
    title: 'Tregime të moçme shqiptare',
    author: 'Mitrush Kuteli', year: '1965', lang: 'sq', kind: 'tales',
    license: '© in copyright (until ~2037)',
    summary:
      'The standard modern literary retelling of the legend/epic cycle (Rozafa, Muji e Halili, the Beauty of the Earth) — the version most Albanians know. In copyright; the Rozafa and Kostandin full texts linked on the entries are Kuteli\'s.',
    online: [
      { label: 'Open Library (catalog)', url: 'https://openlibrary.org/works/OL603209W/', fmt: 'catalog' },
    ],
    local: null,
    covers: ['rozafa', 'constantine-doruntine', 'tomor-shpirag', 'kreshnik-epic'],
  },
  {
    id: 'src-tirta',
    title: 'Mitologjia ndër shqiptarë',
    author: 'Mark Tirta', year: '2004', lang: 'sq', kind: 'anthology',
    license: '© in copyright',
    summary:
      'The authoritative modern encyclopedia of Albanian mythology and folk belief — the scholarly arbiter for the deities, spirits and calendar customs. In copyright; catalog pointer.',
    online: [
      { label: 'WorldCat (catalog)', url: 'https://search.worldcat.org/search?q=Mitologjia+nd%C3%ABr+shqiptar%C3%AB+Tirta', fmt: 'catalog' },
    ],
    local: null,
    covers: ['zojz', 'enji', 'perendi', 'nena-e-vatres', 'dielli', 'hena', 'ora', 'zana-e-malit'],
  },
  // ── Digital portals ──
  {
    id: 'src-wikisource-sq',
    title: 'Wikisource — Albanian texts',
    author: 'Wikimedia', year: '—', lang: 'sq', kind: 'portal',
    license: 'CC-BY-SA / Public domain',
    summary:
      'There is no sq.wikisource; Albanian public-domain texts live under the multilingual wikisource "Sq Shqip (Albanian)" category, and folk songs under sq.wikibooks / sq.wikipedia. Thin and scattered, but the home of Naim\'s Skanderbeu and the two kreshnik songs above.',
    online: [
      { label: 'wikisource — Sq Shqip (Albanian)', url: 'https://wikisource.org/wiki/Category:Sq_Shqip_(Albanian)', fmt: 'portal' },
      { label: 'sq.wikipedia — këngë popullore', url: 'https://sq.wikipedia.org/wiki/Kategoria:K%C3%ABng%C3%AB_popullore_shqiptare', fmt: 'portal' },
    ],
    local: null,
    covers: ['skanderbeg-legjenda', 'aga-ymer', 'death-of-omer'],
  },

  // ══ Research pass 2 — law, history & travelogues (2026-07-08) ════════════════
  {
    id: 'src-kanun-leke',
    title: 'Kanuni i Lekë Dukagjinit',
    author: 'coll. Shtjefën Gjeçovi', year: '1913–1933', lang: 'sq', kind: 'customary law',
    license: 'Public domain',
    summary:
      'The customary law of the northern highlands — ~1,262 articles on besa, hospitality, the household, marriage and the blood-feud — collected by the Franciscan Gjeçovi and published in full in 1933. The single most important Albanian-language source for the whole law/custom layer; held locally.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/kanuniilekedukagjinit', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/kanuniilekedukagjinit/Kanuni%20i%20Leke%20Dukagjinit_djvu.txt', fmt: 'txt' },
      { label: 'PDF', url: 'https://archive.org/download/kanuniilekedukagjinit/Kanuni%20i%20Leke%20Dukagjinit.pdf', fmt: 'pdf' },
    ],
    local: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
    covers: ['kanuni', 'kanun-blood-feud', 'besa', 'hospitality', 'oda-e-burrave', 'vellameri', 'burrnesha', 'mikpritja-oda', 'besa-truce'],
    coversHist: ['gjakmarrja'],
  },
  {
    id: 'src-code-leke-fox',
    title: 'The Code of Lekë Dukagjini (English translation)',
    author: 'tr. Leonard Fox', year: '1989', lang: 'en', kind: 'customary law',
    license: '© in copyright (freely readable scan)',
    summary:
      'Leonard Fox\'s facing-page English translation of Gjeçovi\'s Kanun — the standard way into the code for non-Albanian readers. Linked, not ingested.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/the-code-of-leke-dukagjini', fmt: 'html' },
    ],
    local: null,
    covers: ['kanuni', 'kanun-blood-feud', 'besa', 'hospitality'],
    coversHist: ['gjakmarrja'],
  },
  {
    id: 'src-noli-scanderbeg',
    title: 'George Castrioti Scanderbeg (1405–1468)',
    author: 'Fan S. Noli', year: '1947', lang: 'en', kind: 'history',
    license: 'Public domain',
    summary:
      'Bishop Fan Noli\'s English biography of Skanderbeg — a full narrative of the revolt, the League of Lezhë and the sieges of Krujë. The best free English source for the historical Skanderbeg; held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/stream/georgecastriotis00noli/georgecastriotis00noli_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/noli-scanderbeg.en.txt',
    covers: ['skanderbeg-legjenda', 'sons-of-eagle'],
    coversHist: ['skanderbeg-revolt-kruje', 'league-of-lezhe', 'sieges-of-kruje', 'death-of-skanderbeg'],
  },
  {
    id: 'src-durham-scutari',
    title: 'The Struggle for Scutari',
    author: 'M. Edith Durham', year: '1914', lang: 'en', kind: 'history',
    license: 'Public domain',
    summary:
      'Durham\'s eyewitness account of the 1912–13 siege of Shkodra and the birth of the Albanian state — the northern counterpart to her High Albania, rich on the Bushati city and the fortress of Rozafa. Held locally.',
    online: [
      { label: 'archive.org — details', url: 'https://archive.org/details/struggleforscuta00durhuoft', fmt: 'html' },
      { label: 'plain text', url: 'https://archive.org/download/struggleforscuta00durhuoft/struggleforscuta00durhuoft_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/durham-struggle-for-scutari.en.txt',
    covers: ['rozafa'],
    coversHist: ['bushati-pashalik-shkodra', 'independence-1912'],
  },
  {
    id: 'src-nopcsa',
    title: 'Aus Šala und Klementi (North Albanian highland ethnography)',
    author: 'Baron Franz Nopcsa', year: '1910', lang: 'de', kind: 'ethnography',
    license: 'Public domain',
    summary:
      'The geologist-explorer Nopcsa\'s close ethnography of the Shala and Kelmendi tribes — kulla, feud, besa, dress and daily highland life recorded first-hand before 1914. Held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/download/ausalaundklement00nopc/ausalaundklement00nopc_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/nopcsa-aus-shala-und-klementi.de.txt',
    covers: ['kanuni', 'kanun-blood-feud', 'burrnesha', 'vellameri', 'gjama-e-burrave'],
    coversHist: ['nora-of-kelmendi', 'gjakmarrja'],
  },
  {
    id: 'src-hobhouse',
    title: 'A Journey through Albania (with Lord Byron)',
    author: 'John Cam Hobhouse', year: '1813', lang: 'en', kind: 'travelogue',
    license: 'Public domain',
    summary:
      'Byron\'s travelling companion on their 1809 visit to the court of Ali Pasha at Tepelena and Ioannina — the fullest first-hand English picture of the "Lion" and the southern Albanian world. Held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/download/journeythroughal01brou/journeythroughal01brou_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/hobhouse-journey-through-albania.en.txt',
    covers: ['ali-pashe-tepelena'],
    coversHist: ['ali-pasha-ioannina'],
  },
  {
    id: 'src-hecquard',
    title: 'Histoire et description de la Haute Albanie ou Guégarie',
    author: 'Hyacinthe Hecquard', year: '1858', lang: 'fr', kind: 'ethnography',
    license: 'Public domain',
    summary:
      'The French consul\'s history and description of Gheg northern Albania — tribes, the Kanun, customs and legends of the Malësia, a mid-19th-century counterpart to Durham. Held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/download/bnf-bpt6k6535472n/bnf-bpt6k6535472n_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/hecquard-haute-albanie.fr.txt',
    covers: ['kanuni', 'kanun-blood-feud', 'besa', 'gjama-e-burrave'],
    coversHist: ['gjakmarrja'],
  },
  {
    id: 'src-brailsford',
    title: 'Macedonia: Its Races and Their Future',
    author: 'Henry Noel Brailsford', year: '1906', lang: 'en', kind: 'ethnography',
    license: 'Public domain',
    summary:
      'A sharp journalist\'s survey of the late-Ottoman Balkans including the Albanians — the League-of-Prizren aftermath, the tribes and the feud, on the eve of independence. Held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/download/bub_gb_nsbQAAAAMAAJ/bub_gb_nsbQAAAAMAAJ_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/brailsford-macedonia.en.txt',
    covers: ['kanun-blood-feud'],
    coversHist: ['league-of-prizren', 'ottoman-order'],
  },
  {
    id: 'src-leake',
    title: 'Travels in Northern Greece, vol. I',
    author: 'William Martin Leake', year: '1835', lang: 'en', kind: 'travelogue',
    license: 'Public domain',
    summary:
      'The antiquarian-soldier\'s detailed travels through Epirus and southern Albania in Ali Pasha\'s day — topography, antiquities (Apollonia, Butrint) and the peoples of the coast. Held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/download/travelsinnorthe01leak/travelsinnorthe01leak_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/leake-travels-northern-greece-1.en.txt',
    covers: ['syri-kalter'],
    coversHist: ['apollonia-butrint', 'ali-pasha-ioannina', 'via-egnatia'],
  },
  {
    id: 'src-meyer-marchen',
    title: 'Albanische Märchen (tale collection)',
    author: 'Gustav Meyer', year: '1884', lang: 'de', kind: 'tales',
    license: 'Public domain',
    summary:
      'Meyer\'s dedicated collection of Tosk fairy tales in German translation — a scholarly folktale corpus distinct from his 1888 grammar-reader. Held locally.',
    online: [
      { label: 'archive.org — plain text', url: 'https://archive.org/download/albanischemarchen/albanischemarchen_djvu.txt', fmt: 'txt' },
    ],
    local: 'docs/references/meyer-albanische-marchen-1884.de.txt',
    covers: ['bukura-e-dheut', 'kulshedra', 'snake-bridegroom'],
  },
  {
    id: 'src-durham-tribal',
    title: 'Some Tribal Origins, Laws and Customs of the Balkans',
    author: 'M. Edith Durham', year: '1928', lang: 'en', kind: 'ethnography',
    license: 'Public domain (archive.org borrow-only)',
    summary:
      'Durham\'s comparative study of Balkan tribal law — blood-brotherhood, the feud and sworn custom. Borrow-only on archive.org, so linked rather than held.',
    online: [
      { label: 'archive.org (borrow)', url: 'https://archive.org/details/sometribalorigin0000durh', fmt: 'html' },
    ],
    local: null,
    covers: ['vellameri', 'kanuni', 'kanun-blood-feud'],
  },
  {
    id: 'src-milman-parry',
    title: 'Milman Parry Collection — Lord Albanian Collection (1937)',
    author: 'Albert B. Lord (fieldwork)', year: '1937', lang: 'sq', kind: 'audio archive',
    license: 'Access-gated (Harvard)',
    summary:
      'Albert Lord\'s 1937 Albanian field recordings of sung oral epic — the actual VOICE of the lahutar tradition behind the Kângë Kreshnikësh. Catalog/audio access via Harvard; the one place to hear, not just read, the epic.',
    online: [
      { label: 'Milman Parry Collection portal', url: 'https://mpc.chs.harvard.edu/', fmt: 'portal' },
    ],
    local: null,
    covers: ['kreshnik-epic', 'mujo-strength', 'death-of-omer'],
  },
  {
    id: 'src-konica-albania',
    title: 'Albania (the review of Faik Konica)',
    author: 'Faik Konica (ed.)', year: '1897–1909', lang: 'sq+fr', kind: 'periodical',
    license: 'Public domain (scan on Scribd)',
    summary:
      'Konica\'s influential Rilindja review, printed in Brussels and London — a central organ of the national awakening. Digitized run (1898–99) available online; linked.',
    online: [
      { label: 'Scribd — bound run 1898–99', url: 'https://www.scribd.com/doc/76036511/', fmt: 'pdf' },
    ],
    local: null,
    covers: ['sons-of-eagle'],
    coversHist: ['rilindja-awakening'],
  },
  {
    id: 'src-hylli-drites',
    title: 'Hylli i Dritës (the Franciscan review)',
    author: 'Shkodra Franciscans (Fishta et al.)', year: '1913–1944', lang: 'sq', kind: 'periodical',
    license: 'Public domain (catalog)',
    summary:
      'The Shkodra Franciscan journal where Palaj, Fishta and Gjeçovi FIRST printed the Kângë Kreshnikësh and the Kanun. Fully digitized at the Marin Barleti library (Cloudflare-gated; browse, don\'t machine-fetch).',
    online: [
      { label: 'Biblioteka Marin Barleti, Shkodra', url: 'https://www.bibliotekashkoder.com/', fmt: 'portal' },
      { label: 'BKSH e-Albanica (1921–1944)', url: 'https://www.bksh.al/', fmt: 'portal' },
    ],
    local: null,
    covers: ['kreshnik-epic', 'kanuni'],
  },
  {
    id: 'src-adriatic-review',
    title: 'The Adriatic Review',
    author: 'Vatra / Fan Noli (ed.)', year: '1918–1919', lang: 'en', kind: 'periodical',
    license: 'Public domain',
    summary:
      'The Boston Vatra federation\'s English-language review under Fan Noli — Albanian history, folklore and the independence cause for a diaspora audience. Complete run free on HathiTrust.',
    online: [
      { label: 'HathiTrust — full run', url: 'https://catalog.hathitrust.org/Record/000506617', fmt: 'html' },
      { label: 'Online Books Page (Penn)', url: 'https://onlinebooks.library.upenn.edu/webbin/serial?id=adriaticrev', fmt: 'html' },
    ],
    local: null,
    covers: ['sons-of-eagle', 'skanderbeg-legjenda'],
    coversHist: ['rilindja-awakening', 'independence-1912'],
  },
]

// ── The HISTORY / Chronicle layer ────────────────────────────────────────────
// Real, datable, place-anchored events — kept SEPARATE from the mythology in
// FOLKLORE. Rendered in Debug → 📜 History. `related` points at FOLKLORE ids;
// CORPUS entries point back here via `coversHist`.
//   era:   the date/period (specific where possible)
//   place: a map-anchorable location (Krujë / Shkodra / Vlora / the highlands …)
export const HISTORY = [
  {
    id: 'illyrian-kingdom-teuta',
    title: 'Queen Teuta and the Illyrian Kingdom',
    era: 'c. 231–228 BC',
    place: 'Rhizon & the Adriatic coast',
    summary:
      'After King Agron died in 231 BC, Teuta ruled the Ardiaean kingdom as regent, pressing an aggressive Adriatic expansion backed by Illyrian sea-raiding. When Illyrians killed a Roman envoy, Rome declared war in 229 BC and sent some 200 ships and 20,000 men across the sea. Teuta withdrew to the fortress of Rhizon and surrendered in 228 BC, keeping a reduced realm north of Lissus. She is the archetypal warrior-queen of Illyrian antiquity.',
    sources: [
      { label: 'Teuta (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Teuta' },
      { label: 'Illyrian Wars (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Illyrian_Wars' },
    ],
    related: ['sons-of-eagle'],
  },
  {
    id: 'apollonia-butrint',
    title: 'The Greek-Illyrian cities: Apollonia and Butrint',
    era: 'c. 600 BC onward',
    place: 'Apollonia (Fier) & Butrint (Sarandë)',
    summary:
      'Apollonia, a Corinthian-Corcyraean colony on the Illyrian coast, grew into a wealthy port and seat of learning where the young Octavian studied. Butrint, a sanctuary of Asclepius and later a Roman colony, controlled the strait facing Corfu and left a theatre and baptistery still standing. Both were hinges between the Greek, Illyrian and Roman worlds; Butrint is today a UNESCO World Heritage site.',
    sources: [
      { label: 'Apollonia (Illyria) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Apollonia_(Illyria)' },
      { label: 'Butrint (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Butrint' },
    ],
    related: ['bukura-e-detit', 'syri-kalter'],
  },
  {
    id: 'roman-conquest-illyria',
    title: 'The Roman conquest of Illyria',
    era: '168 BC',
    place: 'Scodra (Shkodra)',
    summary:
      'The last Ardiaean king, Gentius, allied with Macedon against Rome and was defeated in 168 BC when a Roman army under Lucius Anicius Gallus took his capital Scodra in a swift campaign. Gentius was paraded in a Roman triumph and Illyrian lands were absorbed toward the province of Illyricum, ending native statehood for over a millennium. Shkodra remained a key stronghold city ever after.',
    sources: [
      { label: 'Gentius (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Gentius' },
      { label: 'Illyria (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Illyria' },
    ],
    related: ['rozafa', 'sons-of-eagle'],
  },
  {
    id: 'via-egnatia',
    title: 'The Via Egnatia',
    era: 'c. 2nd century BC',
    place: 'Durrës → Apollonia → Ohrid → Byzantium',
    summary:
      'Ordered by the proconsul Gnaeus Egnatius, the Via Egnatia was the great Roman highway linking the Adriatic to Byzantium, beginning at the twin ports of Dyrrachium and Apollonia. It climbed the Shkumbin valley over the Candavian mountains to Ohrid and ran on some 1,120 km, carrying armies, pilgrims and emperors between West and East and making the Albanian lowlands a permanent corridor between worlds.',
    sources: [
      { label: 'Via Egnatia (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Via_Egnatia' },
    ],
    related: [],
  },
  {
    id: 'principality-arbanon',
    title: 'The Principality of Arbanon',
    era: '1190 – c. 1216',
    place: 'Krujë',
    summary:
      'Established in 1190 by the archon Progon around Krujë, Arbanon was the first Albanian state recorded in history, ruled by the native Progoni family. Under Progon\'s sons it stretched from the Shkumbin to the Drin and won wide autonomy from Byzantium — full autonomy after 1204 — before Krujë fell to Epirus around 1216. It is the medieval ancestor-state to which later Albanian nationhood looks back.',
    sources: [
      { label: 'Principality of Arbanon (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Principality_of_Arbanon' },
    ],
    related: ['sons-of-eagle'],
  },
  {
    id: 'skanderbeg-revolt-kruje',
    title: 'Skanderbeg\'s revolt and the seizure of Krujë',
    era: '28 November 1443',
    place: 'Krujë',
    summary:
      'Gjergj Kastrioti "Skanderbeg," a former Ottoman commander, deserted Sultan Murad II\'s army during the Battle of Niš and rode for his ancestral Krujë. Using a forged sultanic order he took the citadel on 28 November 1443 and raised the red flag with the black double-headed eagle, opening 25 years of resistance. Krujë became the heart of that resistance and the emblematic eagle\'s-nest fortress of Albanian history.',
    sources: [
      { label: 'Skanderbeg (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Skanderbeg' },
      { label: 'Noli, Scanderbeg (full text, PD)', url: 'https://archive.org/stream/georgecastriotis00noli/georgecastriotis00noli_djvu.txt' },
    ],
    related: ['skanderbeg-legjenda', 'sons-of-eagle', 'besa'],
  },
  {
    id: 'league-of-lezhe',
    title: 'The League of Lezhë',
    era: '2 March 1444',
    place: 'Lezhë',
    summary:
      'At Lezhë the Albanian chieftains bound themselves into a united front against the Ottomans and proclaimed Skanderbeg commander of their combined army of some 8,000 warriors — the first time the fractious highland lords set aside their rivalries under one leader, an act sealed in the telling by besa. The League gave the revolt a coalition army and a political centre, in the same town where Skanderbeg would die.',
    sources: [
      { label: 'League of Lezhë (Wikipedia)', url: 'https://en.wikipedia.org/wiki/League_of_Lezh%C3%AB' },
    ],
    related: ['skanderbeg-legjenda', 'besa', 'sons-of-eagle'],
  },
  {
    id: 'sieges-of-kruje',
    title: 'The sieges of Krujë',
    era: '1450; 1466–67',
    place: 'Krujë',
    summary:
      'Krujë withstood repeated Ottoman assaults that made its walls legendary. The great siege of 1450 failed after months of costly attacks; in 1466–67 Mehmed II — the conqueror of Constantinople — led a huge army in person and built the fortress of Elbasan to cut supply lines, yet the siege collapsed amid winter, disease and Albanian raids that killed his commander Ballaban. A small mountain citadel had twice defied the empire\'s full might.',
    sources: [
      { label: 'Albanian–Ottoman Wars (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian%E2%80%93Ottoman_Wars_(1432%E2%80%931479)' },
    ],
    related: ['skanderbeg-legjenda', 'sons-of-eagle'],
  },
  {
    id: 'death-of-skanderbeg',
    title: 'The death of Skanderbeg',
    era: '17 January 1468',
    place: 'Lezhë',
    summary:
      'Skanderbeg died of malaria at Lezhë while preparing further resistance, ending a quarter-century that had kept the Ottomans out of the Albanian highlands. His death exposed how much the coalition had depended on one man: within a decade the strongholds fell. Legend holds that Ottoman soldiers later dug up his bones to wear as talismans of his courage. He is Albania\'s supreme national hero.',
    sources: [
      { label: 'Skanderbeg (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Skanderbeg' },
      { label: 'Noli, Scanderbeg (PD)', url: 'https://archive.org/stream/georgecastriotis00noli/georgecastriotis00noli_djvu.txt' },
    ],
    related: ['skanderbeg-legjenda', 'sons-of-eagle', 'besa'],
  },
  {
    id: 'arberesh-exodus',
    title: 'The Arbëresh exodus and the Arvanites',
    era: 'from 1468',
    place: 'Albania & Morea → Italy & Greece',
    summary:
      'After Skanderbeg\'s death and the fall of the strongholds, tens of thousands of Albanians fled the Ottoman advance by sea. Naples granted Skanderbeg\'s kin and other refugees the right to found villages in Calabria, Sicily and Apulia, where the Arbëresh still speak an archaic Albanian and keep Byzantine-rite churches. In parallel, Albanian Arvanites migrated across central Greece under Venetian service. This diaspora is the "kin across the sea."',
    sources: [
      { label: 'Arbëreshë people (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Arb%C3%ABresh%C3%AB_people' },
      { label: 'Arvanites (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Arvanites' },
    ],
    related: ['skanderbeg-legjenda', 'besa', 'sons-of-eagle'],
  },
  {
    id: 'ottoman-order',
    title: 'The Ottoman order: timar and sanjak',
    era: 'late 15th – 19th c.',
    place: 'the sanjaks of Shkodra, Vlora, Elbasan …',
    summary:
      'Once resistance collapsed, Albanian lands were reorganized into Ottoman sanjaks governed under the timar system, in which sipahi cavalrymen held land-grants for military service. Because a timar was far easier to secure as a Muslim, the system quietly pressured the landholding elite toward Islam. Recorded in detailed defter tax registers, this grid set the framework for four centuries of rule and the frontier world the kreshnik songs remember.',
    sources: [
      { label: 'Ottoman Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ottoman_Albania' },
    ],
    related: ['kanun-blood-feud', 'kreshnik-epic'],
  },
  {
    id: 'devshirme-boy-levy',
    title: 'The devshirme and the Janissaries',
    era: '15th–17th c.',
    place: 'the Christian highlands → Istanbul',
    summary:
      'Under the devshirme the Ottomans periodically levied Christian boys from Balkan villages — Albanians prominent among them — converting them to Islam and training them for the sultan\'s service, above all the elite Janissary infantry. Some rose to the empire\'s highest offices; many families maimed or married off sons early to escape it, and in 1565 Albanians revolted and killed the recruiting officials. The levy tore boys from the frontier into the imperial machine — the soil the kreshnik border-world grew from.',
    sources: [
      { label: 'Devshirme (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Devshirme' },
    ],
    related: ['kreshnik-epic', 'mujo-strength', 'besa'],
  },
  {
    id: 'conversion-and-bektashi',
    title: 'Conversion, crypto-Christians and the Bektashi',
    era: '17th–19th c.',
    place: 'central & southern Albania',
    summary:
      'Over the Ottoman centuries much of Albania converted to Islam — sometimes openly for tax and status, sometimes as laramanë "crypto-Christians" who kept two faiths in secret. The tolerant, syncretic Bektashi order spread widely, became the faith of the Janissaries until their abolition in 1826, and grew into the largest current in the south, its leaders later voices of the national awakening. This layered religious world underlies the map\'s shrines and pilgrimages.',
    sources: [
      { label: 'Bektashi Order (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Bektashi_Order' },
      { label: 'Islam in Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Islam_in_Albania' },
    ],
    related: ['tomorri-pilgrimage', 'sari-salltek', 'kurbani'],
  },
  {
    id: 'nora-of-kelmendi',
    title: 'Nora of Kelmendi and the highland revolts',
    era: 'c. 1637–1639',
    place: 'Kelmend, the Malësia',
    summary:
      'The Catholic Kelmendi tribe of the far north fought a long struggle against the Ottomans, allied with Montenegro and famed as the most stubborn of the mountain clans. From this conflict comes the semi-legendary Nora of Kelmendi — "the Helen of Albania" — a noblewoman said to have led women in arms and slain the Bosnian commander in single combat. The fierce highland resistance is history; Nora herself is the legend it spawned.',
    sources: [
      { label: 'Nora of Kelmendi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Nora_of_Kelmendi' },
      { label: 'Durham, High Albania (PD)', url: 'https://archive.org/details/highalbania0000durh' },
    ],
    related: ['kreshnik-epic', 'kanun-blood-feud', 'besa'],
  },
  {
    id: 'voskopoje-enlightenment',
    title: 'Voskopojë (Moschopolis): the Enlightenment city',
    era: 'peak mid-18th c.; ruined 1769',
    place: 'Voskopojë, west of Korçë',
    summary:
      'At its height the Aromanian town of Voskopojë was one of the great cultural centres of the Ottoman Balkans — home to the New Academy (1744), scores of churches, and the first printing press in the Balkans outside Istanbul, a cosmopolitan hub of Greek, Aromanian and Albanian learning. Raids devastated it in 1769 and it was largely abandoned by 1788. Its ruin marks the loss of a homegrown Balkan Enlightenment.',
    sources: [
      { label: 'Moscopole (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Moscopole' },
    ],
    related: [],
  },
  {
    id: 'bushati-pashalik-shkodra',
    title: 'The Bushati pashalik of Shkodra',
    era: 'c. 1757 – 1831',
    place: 'Shkodra',
    summary:
      'The Bushatlli family built a near-independent hereditary pashalik in the north, ruling from the great fortress above Shkodra for three generations. Kara Mahmud Bushati defied Istanbul and beat back Montenegrin and Austrian pressure before dying on campaign in 1796; the dynasty\'s autonomy ended in 1831 when the reforming sultan reasserted control. Shkodra under the Bushatis is the northern counterpart to Ali Pasha\'s southern realm.',
    sources: [
      { label: 'Pashalik of Scutari (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pashalik_of_Scutari' },
      { label: 'Durham, Struggle for Scutari (PD)', url: 'https://archive.org/details/struggleforscuta00durhuoft' },
    ],
    related: ['rozafa', 'sons-of-eagle'],
  },
  {
    id: 'ali-pasha-ioannina',
    title: 'Ali Pasha of Tepelena and Ioannina',
    era: 'c. 1743 – 24 January 1822',
    place: 'Tepelena & Ioannina',
    summary:
      'Ali Pasha, the "Lion of Ioannina," rose from a Tepelena chieftain\'s son to rule a near-sovereign pashalik across southern Albania and much of mainland Greece. From his lakeside court he played the great powers against one another, receiving envoys and travellers — Byron among them — while ruling with cunning and terror. Declared a rebel in 1820, he was besieged, lured out with a false pardon, and shot and beheaded on the island in Lake Pamvotis in 1822.',
    sources: [
      { label: 'Ali Pasha of Yanina (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ali_Pasha_of_Yanina' },
      { label: 'Hobhouse, Journey through Albania (PD)', url: 'https://archive.org/details/journeythroughal01brou' },
    ],
    related: ['ali-pashe-tepelena', 'sons-of-eagle', 'besa'],
  },
  {
    id: 'rilindja-awakening',
    title: 'The Rilindja: the national awakening',
    era: 'c. 1830s – 1912',
    place: 'Korçë, Manastir & the émigré presses',
    summary:
      'The Rilindja ("Rebirth") was the 19th-century cultural and political awakening that forged a modern Albanian identity across religious lines. Writers such as Naim and Sami Frashëri, the Arbëresh Jeronim de Rada and Pashko Vasa promoted a shared language and history, culminating in the 1908 Congress of Manastir which fixed a single Latin alphabet. Korçë opened the first Albanian-language school in 1887; scattered clans and creeds became a nation-in-waiting.',
    sources: [
      { label: 'Albanian National Awakening (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_National_Awakening' },
      { label: 'Congress of Manastir (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Congress_of_Manastir' },
    ],
    related: ['sons-of-eagle', 'skanderbeg-legjenda'],
  },
  {
    id: 'league-of-prizren',
    title: 'The League of Prizren',
    era: '1878 – 1881',
    place: 'Prizren (Kosovo)',
    summary:
      'Founded at Prizren in June 1878 as the Treaty of San Stefano threatened to partition Albanian lands among neighbouring states, the League demanded that all Albanian-inhabited territories be united in a single autonomous province. It briefly fielded armed forces and became the first pan-Albanian political body, welding tribal and religious factions into a national movement before the Ottomans suppressed it in 1881. Defeated, it still made "Albania" a political claim.',
    sources: [
      { label: 'League of Prizren (Wikipedia)', url: 'https://en.wikipedia.org/wiki/League_of_Prizren' },
    ],
    related: ['sons-of-eagle', 'besa'],
  },
  {
    id: 'mic-sokoli',
    title: 'Mic Sokoli and the Battle of Slivova',
    era: '1881',
    place: 'Slivova, near Prishtina',
    summary:
      'Mic Sokoli (1839–1881) was a highland fighter of the League of Prizren era, remembered for a single legendary act: at the Battle of Slivova, as his comrades were pinned down by an Ottoman cannon, he is said to have thrown his own chest against its muzzle to silence it, dying so the attack could succeed. The battle is history; the chest-on-the-cannon deed is the commemorated legend.',
    sources: [
      { label: 'Mic Sokoli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Mic_Sokoli' },
    ],
    related: ['besa', 'sons-of-eagle', 'kreshnik-epic'],
  },
  {
    id: 'independence-1912',
    title: 'Independence at Vlora',
    era: '28 November 1912',
    place: 'Vlora',
    summary:
      'With the Balkan Wars dismembering Ottoman Rumelia, a national assembly gathered at Vlora and, led by Ismail Qemali, proclaimed Albania\'s independence on 28 November 1912. Qemali and Luigj Gurakuqi raised the red-and-black flag from the balcony of the assembly house, and a provisional government followed. The Great Powers recognized Albania at the London Conference; Vlora\'s declaration is the foundation date of the modern state.',
    sources: [
      { label: 'Albanian Declaration of Independence (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_Declaration_of_Independence' },
    ],
    related: ['sons-of-eagle', 'dita-e-veres'],
  },
  {
    id: 'shote-azem-galica',
    title: 'Shote and Azem Galica and the Kaçak resistance',
    era: 'c. 1919–1927',
    place: 'Drenica (Kosovo)',
    summary:
      'After 1912 left much Albanian land outside the new state, the Kaçak guerrilla movement fought Serbian and Yugoslav rule in Kosovo. Azem Galica led the rising from 1919 until he was mortally wounded in 1924; his wife Shote Galica fought beside him in men\'s dress, led bands after his death, and became a rare celebrated woman-warrior of the modern era before dying in 1927. Together they carry the highland warrior tradition into the 20th century.',
    sources: [
      { label: 'Azem Galica (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Azem_Galica' },
      { label: 'Shote Galica (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Shote_Galica' },
    ],
    related: ['kreshnik-epic', 'besa', 'sons-of-eagle'],
  },
  {
    id: 'gjakmarrja',
    title: 'Gjakmarrja — the blood feud as a lived law',
    era: '15th-c. custom, written 1913–1933; resurgent 1990s',
    place: 'the northern highlands & Kosovo',
    summary:
      'The Kanun did not command vengeance but bound and slowed it: a killing left blood "owed" by the whole male line of the killer (koka për kokë, head for head), while women, children, guests and priests stayed untouchable. A man in blood shut himself in the fortified kullë, and only women and priests could cross the feud line to carry word and fetch the pleqësia, the council of elders. A besa — a truce of a day, or the besë e madhe of a season — let him harvest, travel or bury his dead in safety. Higher than any revenge the code set the falja e gjakut, the forgiveness of blood, brokered by elders and a guarantor until the two houses became sworn brothers. When the feud revived after communism, Kosovo answered with the great reconciliation campaign of 1990–92 under the folklorist Anton Çetta, ending over a thousand feuds, most famously before a vast crowd at Verrat e Llukës.',
    sources: [
      { label: 'Kanuni i Lekë Dukagjinit (Albanian full text, PD)', url: 'https://archive.org/details/kanuniilekedukagjinit' },
      { label: 'Durham, High Albania — "The Land and the Law"', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' },
      { label: 'Reconciliation Movement of 1990 (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Reconciliation_Movement_in_1990' },
    ],
    related: ['kanun-blood-feud', 'kanuni', 'besa', 'besa-truce', 'vajtim', 'oda-e-burrave'],
  },
  {
    id: 'meshari-buzuku',
    title: 'Meshari i Gjon Buzukut — Buzuku’s Missal',
    era: '1555',
    place: 'northern Albania',
    summary:
      'Printed in 1555 by the priest Gjon Buzuku, the Meshari (Missal) is the oldest known book written in Albanian — a partial translation of the Catholic liturgy that anchors the recorded history of the language. It heads the early canon later joined by Frang Bardhi’s dictionary and Pjetër Bogdani’s Cuneus Prophetarum.',
    sources: [
      { label: 'Meshari (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Meshari' },
      { label: 'Gjon Buzuku (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Gjon_Buzuku' },
    ],
    related: ['voskopoje-enlightenment', 'rilindja-awakening'],
  },
  {
    id: 'frasheri-brothers',
    title: 'Vëllezërit Frashëri — the Frashëri brothers',
    era: '19th c.',
    place: 'Frashër & Istanbul',
    summary:
      'Naim, Sami and Abdyl Frashëri were the intellectual engine of the Rilindja: Naim the national poet (Históri e Skënderbeut, Bagëti e Bujqësia), Sami the encyclopaedist and theorist of independence (Shqipëria — çka qenë, ç’është e çdo të bëhetë), and Abdyl a leader of the League of Prizren. Bektashi by background, they fused folklore, language and nationhood.',
    sources: [
      { label: 'Naim Frashëri (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Naim_Frash%C3%ABri' },
      { label: 'Sami Frashëri (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Sami_Frash%C3%ABri' },
    ],
    related: ['rilindja-awakening', 'league-of-prizren', 'conversion-and-bektashi', 'skanderbeg-legjenda'],
  },
  {
    id: 'gjergj-fishta',
    title: 'Gjergj Fishta — the Highland Lute poet',
    era: '1871–1940',
    place: 'Shkodër',
    summary:
      'Franciscan friar and poet whose epic Lahuta e Malcís (“The Highland Lute,” 1937) wove the northern highlanders’ struggles into a national epic in the voice of the lahutar. Called the “Albanian Homer,” he first printed the Këngë Kreshnike in Hylli i Dritës; suppressed under communism, he was rehabilitated after 1990.',
    sources: [
      { label: 'Gjergj Fishta (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Gjergj_Fishta' },
      { label: 'The Highland Lute (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Highland_Lute' },
    ],
    related: ['rilindja-awakening', 'kreshnik-epic', 'lahuta-cifteli', 'kanuni'],
  },
  {
    id: 'congress-of-manastir',
    title: 'Kongresi i Manastirit — the Congress of Monastir',
    era: '1908',
    place: 'Manastir (Bitola)',
    summary:
      'Convened in Manastir in November 1908, this congress of delegates from across the Albanian lands standardised a single Latin-based alphabet, replacing the competing Ottoman-Arabic, Greek and rival Latin scripts. It unified the written language and became a cornerstone of the national movement, commemorated each 22 November.',
    sources: [
      { label: 'Congress of Manastir (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Congress_of_Manastir' },
      { label: 'Skendi, The Albanian National Awakening', url: 'https://archive.org/details/albaniannational0000sken' },
    ],
    related: ['rilindja-awakening', 'league-of-prizren', 'independence-1912', 'frasheri-brothers'],
  },
  {
    id: 'ded-gjo-luli',
    title: 'Ded Gjo Luli dhe Kryengritja e Malësisë — the Highland Revolt',
    era: '1911',
    place: 'Malësia e Madhe',
    summary:
      'In April 1911 the Catholic highlander Ded Gjo Luli led the Malësia e Madhe uprising against the Ottomans and raised the Albanian flag over Deçiç — the first time it had flown in battle in over 400 years. The revolt and its Greçë Memorandum of demands fed directly into the general Albanian Revolt of 1912.',
    sources: [
      { label: 'Ded Gjo Luli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ded_Gjo_Luli' },
      { label: 'Malësori uprising 1911 (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Mal%C3%ABsori_uprising' },
    ],
    related: ['independence-1912', 'league-of-prizren', 'mic-sokoli', 'nora-of-kelmendi'],
  },
  {
    id: 'isa-boletini',
    title: 'Isa Boletini — the Kosovo guerrilla leader',
    era: '1911–1912',
    place: 'Kosovo & Vlora',
    summary:
      'A Kosovar Albanian guerrilla commander who led the 1910–12 uprisings against the Ottomans and stood at Vlora in November 1912 among those who declared independence. He later fell defending the nation’s borders, becoming an enduring symbol of the Kosovo Albanian national struggle.',
    sources: [
      { label: 'Isa Boletini (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Isa_Boletini' },
      { label: 'Elsie, Biographical Dictionary of Albanian History', url: 'https://archive.org/details/biographicaldict0000elsi' },
    ],
    related: ['independence-1912', 'league-of-prizren', 'shote-azem-galica'],
  },
  {
    id: 'kongresi-i-lushnjes',
    title: 'Kongresi i Lushnjës — the Congress of Lushnjë',
    era: '1920',
    place: 'Lushnjë',
    summary:
      'Meeting in January 1920 as post-WWI great powers debated partitioning Albania, this congress rejected all partition plans, reaffirmed independence, formed a national government and moved the capital to Tirana. It stabilised the state at its most vulnerable moment and fixed Tirana as the permanent capital.',
    sources: [
      { label: 'Congress of Lushnjë (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Congress_of_Lushnj%C3%AB' },
      { label: 'Britannica — Albania: history', url: 'https://www.britannica.com/place/Albania' },
    ],
    related: ['independence-1912', 'lufta-e-vlores'],
  },
  {
    id: 'lufta-e-vlores',
    title: 'Lufta e Vlorës — the Vlora War',
    era: '1920',
    place: 'Vlora',
    summary:
      'In the summer of 1920 Albanian irregulars besieged and expelled the Italian occupation force from Vlora, which Italy had held since WWI and meant to annex. The victory secured Albania’s southern port and sovereignty, coming weeks after the Congress of Lushnjë reaffirmed independence — a foundational event of the modern state.',
    sources: [
      { label: 'Vlora War (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Vlora_War' },
      { label: 'Congress of Lushnjë (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Congress_of_Lushnj%C3%AB' },
    ],
    related: ['independence-1912', 'kongresi-i-lushnjes', 'shote-azem-galica'],
  },
  {
    id: 'king-zog',
    title: 'Ahmet Zogu — President and King Zog I',
    era: '1925–1939',
    place: 'Tirana',
    summary:
      'After the turmoil of the early 1920s and the ousting of Fan Noli’s June 1924 revolution, Ahmet Zogu made Albania a republic in 1925 and proclaimed himself King Zog I in 1928. His centralising monarchy drew the country ever deeper into Italian dependence, which ended when Mussolini invaded in April 1939 and Zog fled into exile.',
    sources: [
      { label: 'Zog I (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zog_I' },
      { label: 'Fan Noli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Fan_Noli' },
    ],
    related: ['lufta-e-vlores', 'kongresi-i-lushnjes', 'independence-1912', 'italian-invasion-wwii'],
  },
  {
    id: 'bajram-curri',
    title: 'Bajram Curri — the northern nationalist commander',
    era: '1862–1925',
    place: 'Gjakovë highlands',
    summary:
      'A guerrilla and political leader of the Gjakovë highlands who fought in the 1910–12 uprisings, defended Albanian and Kosovar interests at independence, and backed Fan Noli’s 1924 revolution. Hunted by Zog’s forces, he died besieged in a cave near Dragobia in 1925; a town now bears his name.',
    sources: [
      { label: 'Bajram Curri (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Bajram_Curri' },
      { label: 'Elsie, Biographical Dictionary of Albanian History', url: 'https://archive.org/details/biographicaldict0000elsi' },
    ],
    related: ['independence-1912', 'shote-azem-galica', 'king-zog', 'mic-sokoli'],
  },
  {
    id: 'prenk-bibe-doda',
    title: 'Prenk Bibë Doda dhe Mirdita — the Mirdita principality',
    era: '19th–20th c.',
    place: 'Mirdita',
    summary:
      'Hereditary Kapedan of the Catholic tribal region of Mirdita, Prenk Bibë Doda led its semi-autonomous Ottoman-era statelet, joined the national movement around independence, and was assassinated in 1919 amid the struggles over Albania’s shape. Mirdita’s self-governing, Kanun-ruled polity is a distinctive strand of the northern story.',
    sources: [
      { label: 'Prënk Bibë Doda (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pr%C3%ABnk_Bib%C3%AB_Doda' },
      { label: 'Mirdita (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Mirdita' },
    ],
    related: ['kanuni', 'independence-1912', 'bushati-pashalik-shkodra'],
  },
  {
    id: 'italian-invasion-wwii',
    title: 'Pushtimi italian dhe Lufta — the Italian invasion & WWII',
    era: '1939–1944',
    place: 'all Albania',
    summary:
      'Italy invaded on 7 April 1939, driving out King Zog; after 1943 the Germans took over. Albanian partisan and nationalist bands (Balli Kombëtar and the communist-led LANÇ) fought the occupiers, and the country was liberated in November 1944 — the outcome of which was the communist takeover under Enver Hoxha.',
    sources: [
      { label: 'Italian invasion of Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Italian_invasion_of_Albania' },
      { label: 'Albanian resistance in WWII (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_resistance_during_World_War_II' },
    ],
    related: ['king-zog', 'lufta-e-vlores', 'shote-azem-galica'],
  },
]

// ── RANK: how Albanian / how well-known / how culturally important ───────────
// Each entry (FOLKLORE + HISTORY) scored on three axes, 1–5, from a single
// calibrated rubric (see docs). alb = how distinctively Albanian (endemic vs
// shared vs borrowed); know = how many Albanians would recognise it today;
// imp = cultural importance/centrality. Rendered as meters in the Debug tab,
// sortable. RANK[id] = [alb, know, imp].
export const RANK = {
  'zojz': [5, 1, 3],
  'dielli': [4, 3, 4],
  'hena': [4, 3, 3],
  'prende': [4, 2, 3],
  'i-verbti': [4, 1, 2],
  'shurdhi': [4, 1, 2],
  'nena-e-diellit': [4, 1, 2],
  'bija-hene-diell': [5, 2, 3],
  'enji': [5, 1, 2],
  'perendi': [4, 3, 3],
  'nena-e-vatres': [4, 1, 2],
  'bukura-e-dheut': [5, 4, 4],
  'bukura-e-detit': [4, 3, 3],
  'ora': [4, 4, 4],
  'shtojzovalle': [4, 2, 2],
  'flocka': [3, 2, 2],
  'peri': [3, 2, 2],
  'fatia-mira': [3, 2, 3],
  'zana-e-malit': [4, 4, 4],
  'vitore': [4, 2, 3],
  'drangue': [4, 3, 4],
  'kulshedra': [5, 5, 4],
  'bolla': [4, 3, 3],
  'lubia': [3, 2, 3],
  'stihi': [3, 2, 2],
  'shtriga': [3, 3, 3],
  'karkanxholl': [2, 2, 2],
  'kukudh': [2, 2, 2],
  'dhampir': [3, 2, 2],
  'xhindi': [2, 3, 2],
  'katallan': [3, 2, 2],
  'wolf': [4, 4, 3],
  'gjarpri-i-shtepise': [4, 3, 3],
  'djalli': [2, 5, 3],
  'baloz': [3, 2, 3],
  'lugat': [3, 2, 2],
  'creation-wolf': [4, 3, 3],
  'scurfhead': [4, 3, 3],
  'three-friends': [4, 2, 3],
  'snake-bridegroom': [3, 2, 2],
  'gjizar': [3, 2, 2],
  'maiden-promised-sun': [4, 3, 3],
  'goose-girl': [2, 2, 2],
  'half-rooster': [2, 3, 2],
  'bear-dervish': [3, 2, 2],
  'kuma-lisa': [3, 3, 2],
  'cuckoo': [4, 3, 3],
  'bee-spider-cicada': [3, 2, 2],
  'swallow': [3, 3, 2],
  'tortoise': [2, 2, 2],
  'nastradin': [2, 5, 4],
  'binoshet': [4, 2, 3],
  'mujo-strength': [4, 3, 3],
  'kreshnik-epic': [5, 4, 5],
  'mujo-zanas': [4, 2, 3],
  'mujo-courser': [4, 2, 3],
  'halil-marriage': [4, 3, 3],
  'zuku-bajraktar': [4, 2, 3],
  'mujo-avenges-halil': [4, 3, 3],
  'death-of-omer': [4, 4, 4],
  'aga-ymer': [3, 3, 3],
  'arnaut-osmani': [4, 2, 3],
  'muji-e-behuri': [4, 2, 3],
  'halil-garria': [3, 2, 3],
  'rozafa': [5, 5, 5],
  'constantine-doruntine': [5, 4, 4],
  'gjergj-elez-alia': [4, 4, 4],
  'sari-salltek': [2, 3, 3],
  'tomor-shpirag': [4, 4, 3],
  'syri-kalter': [3, 4, 3],
  'sons-of-eagle': [5, 5, 5],
  'gjakova-cavern': [3, 1, 2],
  'skanderbeg-legjenda': [5, 5, 5],
  'ura-e-artes': [3, 3, 3],
  'kostandini-i-vogel': [3, 3, 3],
  'ali-pashe-tepelena': [4, 4, 4],
  'tomorri-pilgrimage': [5, 4, 4],
  'besa': [5, 5, 5],
  'hospitality': [5, 5, 5],
  'kanun-blood-feud': [5, 5, 5],
  'evil-eye': [3, 4, 3],
  'vajtim': [4, 4, 4],
  'dita-e-veres': [5, 5, 4],
  'dodola': [3, 2, 2],
  'rrapi': [4, 2, 2],
  'nata-e-buzmit': [3, 3, 3],
  'kanuni': [5, 5, 5],
  'oda-e-burrave': [4, 3, 4],
  'gjama-e-burrave': [5, 3, 4],
  'dita-e-shen-gjergjit': [3, 3, 3],
  'kurbani': [2, 4, 3],
  'burrnesha': [5, 4, 4],
  'stani': [1, 3, 2],
  'dasma': [3, 5, 3],
  'paja': [2, 3, 2],
  'mikpritja-oda': [4, 4, 4],
  'vellameri': [3, 3, 3],
  'lindja-besiku': [3, 3, 2],
  'besa-truce': [5, 4, 4],
  'emri-tabu': [2, 2, 2],
  'illyrian-kingdom-teuta': [4, 5, 4],
  'apollonia-butrint': [2, 4, 3],
  'roman-conquest-illyria': [3, 3, 3],
  'via-egnatia': [1, 2, 2],
  'principality-arbanon': [4, 2, 3],
  'skanderbeg-revolt-kruje': [5, 5, 5],
  'league-of-lezhe': [5, 4, 5],
  'sieges-of-kruje': [5, 3, 4],
  'death-of-skanderbeg': [5, 5, 5],
  'arberesh-exodus': [4, 4, 4],
  'ottoman-order': [3, 2, 3],
  'devshirme-boy-levy': [3, 3, 3],
  'conversion-and-bektashi': [3, 3, 3],
  'nora-of-kelmendi': [4, 3, 3],
  'voskopoje-enlightenment': [3, 3, 3],
  'bushati-pashalik-shkodra': [4, 2, 3],
  'ali-pasha-ioannina': [4, 4, 4],
  'rilindja-awakening': [5, 4, 5],
  'league-of-prizren': [4, 4, 5],
  'mic-sokoli': [4, 2, 2],
  'independence-1912': [5, 5, 5],
  'shote-azem-galica': [4, 4, 3],
  'gjakmarrja': [5, 4, 4],
  'xhubleta': [5, 4, 4],
  'lahuta-cifteli': [5, 4, 5],
  'kulla': [5, 3, 4],
  'valle': [4, 4, 3],
  'sulltan-nevruzi': [3, 3, 3],
  'shen-kolli': [3, 3, 3],
  'tatuazhi': [4, 3, 3],
  'plisi': [5, 4, 4],
  'sofra': [3, 4, 3],
  'plakat-e-marsit': [4, 3, 2],
  'xhuxhmaxhuxhe': [2, 3, 2],
  'rmora': [3, 1, 1],
  'e-verdha-e-dheut': [3, 1, 2],
  'argjiro-gjirokastra': [4, 4, 3],
  'legjenda-e-prespes': [3, 2, 2],
  'gjeto-basho-muji': [5, 4, 5],
  'sokol-halili': [5, 4, 4],
  'ali-bajraktari': [4, 2, 3],
  'meshari-buzuku': [5, 4, 4],
  'frasheri-brothers': [5, 5, 5],
  'gjergj-fishta': [5, 4, 5],
  'congress-of-manastir': [5, 4, 5],
  'ded-gjo-luli': [4, 3, 3],
  'isa-boletini': [4, 4, 4],
  'kongresi-i-lushnjes': [4, 3, 4],
  'lufta-e-vlores': [4, 4, 4],
  'king-zog': [4, 5, 4],
  'bajram-curri': [4, 3, 3],
  'prenk-bibe-doda': [4, 2, 3],
  'italian-invasion-wwii': [3, 5, 4],
  'sunet': [3, 5, 4],
  'bajrami': [3, 5, 4],
  'ramazani': [2, 5, 3],
  'pashket': [2, 5, 3],
  'krishtlindjet': [2, 5, 3],
  'harmonia-fetare': [5, 5, 5],
  'kafeja': [3, 5, 4],
  'rakia-gezuar': [3, 5, 3],
  'fejesa': [3, 5, 3],
  'nata-e-kenases': [3, 4, 3],
  'te-dyzetat': [3, 5, 4],
  'kurbeti': [4, 5, 4],
  'pagezimi': [3, 4, 3],
  'syri-apparati': [5, 5, 3],
  'mashallah-ptu': [3, 5, 3],
  'plumbi-frika': [4, 3, 2],
  'fall-kafeja': [3, 5, 3],
  'e-marta': [4, 4, 2],
  'nusja-omens': [4, 3, 2],
  'barra-besime': [3, 5, 3],
  'pragu': [3, 4, 2],
  'besime-popullore': [3, 5, 3],
}

// Additional reference sources gathered in the ranking/verification pass,
// merged with each entry's own  in the Debug library (deduped by url).
export const EXTRA_SOURCES = {
  'zojz': [{ label: 'Albanian paganism — Sky/Zojz (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }, { label: 'Elsie, Dictionary of Albanian Religion, Mythology and Folk Culture (2001)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: '*Dyēus — PIE sky-father cognate set (Wikipedia)', url: 'https://en.wikipedia.org/wiki/*Dy%C4%93us' }],
  'dielli': [{ label: 'Albanian paganism — Dielli (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }, { label: 'Nëna e Diellit — the Sun-veneration cycle (Wikipedia)', url: 'https://en.wikipedia.org/wiki/N%C3%ABna_e_Diellit' }],
  'hena': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'E Bija e Hënës dhe e Diellit — the Moon–Sun pair\'s daughter (Wikipedia)', url: 'https://en.wikipedia.org/wiki/E_Bija_e_H%C3%ABn%C3%ABs_dhe_e_Diellit' }],
  'prende': [{ label: 'Elsie, Dictionary (s.v. Prende/Premte)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Elsie, Dictionary of Albanian Religion, Mythology and Folk Culture (PDF) — \'Prende\'', url: 'https://albanianstudies.org/wp-content/uploads/2015/09/2001-Elsie-Dictionary-of-Albanian-Religion-Mythology-and-Folk-Culture.pdf' }],
  'i-verbti': [{ label: 'Elsie, Dictionary (s.v. Verbt, i)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Zibelthiurdos — Thracian parallel to Shurdhi/Verbti (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zibelthiurdos' }],
  'shurdhi': [{ label: 'Elsie, Dictionary (s.v. Shurdhi)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Zibelthiurdos — Thracian storm-god parallel (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zibelthiurdos' }],
  'nena-e-diellit': [{ label: 'Tirta, Mitologjia ndër shqiptarë (2004)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }, { label: 'Hëna (Albanian paganism) — celestial-mother context (Wikipedia)', url: 'https://en.wikipedia.org/wiki/H%C3%ABna_(Albanian_paganism)' }],
  'bija-hene-diell': [{ label: 'Kuteli, \'Bija e Hënës dhe e Diellit\' — full tale text', url: 'https://www.voal.ch/bija-e-henes-dhe-e-diellit-nga-mitrush-kuteli/kulture/letersi/' }, { label: 'ATU 707 — the star/crescent-brow motif\'s real home (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Youth_and_the_Maiden_with_Stars_on_their_Foreheads_and_Crescents_on_their_Breasts' }],
  'bukura-e-dheut': [{ label: 'Elsie, Albanian Folktales and Legends', url: 'https://www.albanianliterature.net/authors/folklore/index.html' }, { label: 'Elsie, Dictionary of Albanian Religion & Mythology — \'Bukura e Dheut\'', url: 'https://archive.org/details/dictionaryofalba0000elsi' }],
  'bukura-e-detit': [{ label: 'Elsie, Albanian Folktales and Legends', url: 'https://www.albanianliterature.net/authors/folklore/index.html' }],
  'mujo-strength': [{ label: 'The Marriage of Mujo (Elsie/Mathie-Heck, oralverse 1)', url: 'http://www.albanianliterature.net/oralverse/verse_09_01.html' }, { label: 'Elsie & Mathie-Heck, Songs of the Frontier Warriors (Bolchazy-Carducci 2004)', url: 'https://www.bolchazy.com/Songs-of-the-Frontier-Warriors-The-Albanian-Epic-Kenge-Kreshnikesh-P3350' }],
  'ora': [{ label: 'Doja, \'Mythology and Destiny\' (Anthropos 2005)', url: 'https://www.jstor.org/stable/40466705' }, { label: 'Elsie, Dictionary of Albanian Religion, Mythology and Folk Culture (PDF) — \'Ora\'/\'Fate\'', url: 'https://albanianstudies.org/wp-content/uploads/2015/09/2001-Elsie-Dictionary-of-Albanian-Religion-Mythology-and-Folk-Culture.pdf' }],
  'shtojzovalle': [{ label: 'Elsie, Dictionary (s.v. Shtojzovalle)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'shtojzovalle — etymology (Wiktionary)', url: 'https://en.wiktionary.org/wiki/shtojzovalle' }],
  'flocka': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Floçka — long-haired water-spirits (Wikipedia draft)', url: 'https://en.wikipedia.org/wiki/Draft:Flo%C3%A7ka' }],
  'peri': [{ label: 'Elsie, Dictionary (s.v. Peri)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Albanian paganism — perria e detit; Turkish-derived fairy term (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }],
  'vitore': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology (Vitore)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Doja, \'Mythology and Destiny\' (Anthropos 2005) — Vitore as \'the woman who spins\' destiny', url: 'https://shs.hal.science/halshs-00425170/file/Mythology_and_Destiny.pdf' }],
  'drangue': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Albanian folk beliefs — drangue/kulshedra dualism, thunder-stone (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }],
  'kulshedra': [{ label: 'Doja, \'Mythology and Destiny\' (Anthropos 2005)', url: 'https://www.jstor.org/stable/40466542' }, { label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Albanian paganism — kulshedra as chthonic/storm force (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }],
  'bolla': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology — \'Bolla\'', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Albanian paganism — serpent lore (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }],
  'lubia': [{ label: 'Ljubi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ljubi' }, { label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }],
  'stihi': [{ label: 'Stihi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Stihi' }, { label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'stihi / stoikheion (Wiktionary)', url: 'https://en.wiktionary.org/wiki/stihi' }],
  'shtriga': [{ label: 'Durham, High Albania (1909) — Project Gutenberg', url: 'https://www.gutenberg.org/ebooks/45072' }, { label: 'Strix (mythology) — Latin striga source (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Strix_(mythology)' }],
  'karkanxholl': [{ label: 'Karkanxholl (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Karkanxholl' }, { label: 'Kallikantzaros — Albanian karkanxholl, the twelve days (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kallikantzaros' }],
  'kukudh': [{ label: 'Kukudh (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kukudh' }, { label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }],
  'dhampir': [{ label: 'Dhampir (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Dhampir' }],
  'xhindi': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Jinn — Islamic origin, Ottoman transmission (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Jinn' }],
  'katallan': [{ label: 'List of Albanian mythological figures (Wikipedia)', url: 'https://en.wikipedia.org/wiki/List_of_Albanian_mythological_figures' }, { label: 'Elsie, Albanian Folktales and Legends', url: 'http://www.albanianliterature.net/folktales/index.html' }, { label: 'Polyphemus — ATU 1137 blinded-ogre motif (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Polyphemus' }, { label: 'Almogavars — \'Katallani\' the one-eyed monster; \'Daedalus dhe Katallani\' (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Almogavars' }],
  'wolf': [{ label: 'Albanian paganism — wolf totem (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }, { label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Lugat — the wolf drives the lugat back into its grave (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lugat' }],
  'creation-wolf': [{ label: 'von Hahn 105 \'Erschaffung des Wolfes\' — full text (Zeno.org)', url: 'http://www.zeno.org/M%C3%A4rchen/M/Albanien/Johann+Georg+von+Hahn:+Griechische+und+Albanesische+M%C3%A4rchen/105.+Erschaffung+des+Wolfes' }, { label: 'von Hahn 105 \'Erschaffung des Wolfes\' — full text (Märchenbasar)', url: 'https://maerchenbasar.de/erschaffung-des-wolfes/' }],
  'rozafa': [{ label: 'The Legend of Rozafat Castle (Elsie, legend 06)', url: 'http://www.albanianliterature.net/legends/legend_06.html' }, { label: 'Dundes (ed.), The Walled-Up Wife: A Casebook', url: 'https://www.google.com/books/edition/The_Walled_Up_Wife/nq0aVj2Qff8C' }],
  'constantine-doruntine': [{ label: 'The Ballad of Constantine and Dhoqina (Elsie/Mathie-Heck, oralverse)', url: 'http://www.albanianliterature.net/oralverse/verse_04.html' }, { label: 'The Dead Brother\'s Song — Balkan type of which this is the Albanian form (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Dead_Brother%27s_Song' }],
  'gjergj-elez-alia': [{ label: 'Gjergj Elez Alia (Elsie/Mathie-Heck, oralverse 6)', url: 'http://www.albanianliterature.net/oralverse/verse_09_06.html' }, { label: 'Gjergj Elez Alia — Albanian text (Visaret e Kombit PDF)', url: 'http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_06.pdf' }, { label: '\'Kanga e Gjergj Elez Alisë\', comm. Ullmar Qvick (Radi & Radi)', url: 'https://www.radiandradi.com/kanga-e-gjergj-elez-alise-me-komente-te-ullmar-qvick/' }],
  'sari-salltek': [{ label: 'Sari Salltëk (Elsie, legend 02)', url: 'http://www.albanianliterature.net/legends/legend_02.html' }, { label: 'Elsie, The Albanian Bektashi: History & Culture of a Dervish Order', url: 'https://catalog.libraries.psu.edu/catalog/27978534' }, { label: 'Sarı Saltık — seven graves; dragon-of-Krujë legend (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Sar%C4%B1_Salt%C4%B1k' }],
  'tomor-shpirag': [{ label: 'E Bukura e Dheut — the Beauty the giants fought over (Wikipedia)', url: 'https://en.wikipedia.org/wiki/E_Bukura_e_Dheut' }, { label: 'Baba Tomor — the giants\' place-myth (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Baba_Tomor' }],
  'syri-kalter': [{ label: 'Blue Eye (spring) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Blue_Eye_(spring)' }, { label: 'Elsie — Albanian legends index (dragon-eye spring motifs)', url: 'http://www.albanianliterature.net/legends/' }],
  'sons-of-eagle': [{ label: 'Albanian legends index (Elsie)', url: 'http://www.albanianliterature.net/legends/' }, { label: 'Shqiptar — etymology: von Hahn \'to speak clearly\' vs Camarda \'eagle\' (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Shqiptar' }],
  'kreshnik-epic': [{ label: 'Songs of the Frontier Warriors — Elsie/Mathie-Heck (oralverse index)', url: 'http://www.albanianliterature.net/oralverse/verse_09.html' }, { label: 'Neziri & Scaldaferri, New Research on Albanian Epic Songs (Harvard Classics@)', url: 'https://classics-at.chs.harvard.edu/classics14-neziri-and-scaldaferri/' }],
  'mujo-zanas': [{ label: 'Songs of the Frontier Warriors (Elsie/Mathie-Heck)', url: 'http://www.albanianliterature.net/oralverse/verse_09.html' }],
  'mujo-courser': [{ label: 'Mujo\'s Courser (Elsie/Mathie-Heck, oralverse 8)', url: 'http://www.albanianliterature.net/oralverse/verse_09_08.html' }, { label: 'Songs of the Frontier Warriors — \'Mujo\'s Horse\' (Palaj-Kurti #9)', url: 'https://www.bolchazy.com/Songs-of-the-Frontier-Warriors-The-Albanian-Epic-Kenge-Kreshnikesh-P3350' }],
  'halil-marriage': [{ label: 'The Marriage of Halili (Elsie/Mathie-Heck, oralverse 5)', url: 'http://www.albanianliterature.net/oralverse/verse_09_05.html' }, { label: 'Songs of the Frontier Warriors — \'The Marriage of Halili\' (Palaj-Kurti #4)', url: 'https://www.bolchazy.com/Songs-of-the-Frontier-Warriors-The-Albanian-Epic-Kenge-Kreshnikesh-P3350' }],
  'zuku-bajraktar': [{ label: 'Zuku Bajraktar (Elsie/Mathie-Heck, oralverse 10)', url: 'http://www.albanianliterature.net/oralverse/verse_09_10.html' }, { label: 'Zuku Bajraktar — Albanian text (Visaret e Kombit PDF)', url: 'http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_10.pdf' }, { label: 'Kângë Kreshnikësh — \'Zuku Bajraktar\' (#11) vs \'Zuku Captures Rusha\' (#18) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/K%C3%A2ng%C3%AB_Kreshnik%C3%ABsh' }],
  'mujo-avenges-halil': [{ label: 'Songs of the Frontier Warriors (Elsie/Mathie-Heck)', url: 'http://www.albanianliterature.net/oralverse/verse_09.html' }, { label: 'Kângë Kreshnikësh — \'Halili merr gjakun e Mujit\' #23 (Wikipedia)', url: 'https://en.wikipedia.org/wiki/K%C3%A2ng%C3%AB_Kreshnik%C3%ABsh' }],
  'death-of-omer': [{ label: 'The Death of Omer (Elsie/Mathie-Heck, oralverse 19)', url: 'http://www.albanianliterature.net/oralverse/verse_09_19.html' }, { label: 'Ajkuna\'s Lament (Elsie/Mathie-Heck, oralverse 20)', url: 'http://www.albanianliterature.net/oralverse/verse_09_20.html' }, { label: 'Songs of the Frontier Warriors — \'Death of Omer\' (#29) & \'Ajkuna Mourns Omer\' (#30)', url: 'https://www.bolchazy.com/Songs-of-the-Frontier-Warriors-The-Albanian-Epic-Kenge-Kreshnikesh-P3350' }],
  'aga-ymer': [{ label: 'Little Constantine / returning-husband type (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Little_Constantine' }, { label: 'Elsie, \'Ymer Aga of Ulqin\' — oralverse #21', url: 'http://www.albanianliterature.net/oralverse/verse_09_21.html' }],
  'scurfhead': [{ label: '\'The Scurfhead\' — full text (Elsie tale 2)', url: 'http://www.albanianliterature.net/folktales/tale_02.html' }, { label: 'ATU 301 tale-type', url: 'https://en.wikipedia.org/wiki/The_Three_Stolen_Princesses' }, { label: 'Elsie, Albanian Folktales and Legends — full book PDF (tale 2)', url: 'http://www.aunix.net.au/robxenos/Albanian%20Folk%20Tales%20and%20Legends.pdf' }, { label: 'ATU 301 — Ashliman type index', url: 'https://sites.pitt.edu/~dash/type0301.html' }],
  'three-friends': [{ label: '\'The Three Friends and the Earthly Beauty\' — full text (Elsie tale 3)', url: 'http://www.albanianliterature.net/folktales/tale_03.html' }, { label: 'ATU 302 \'The Ogre\'s Heart in the Egg\' (external-soul type)', url: 'https://en.wikipedia.org/wiki/The_Death_of_Koschei_the_Deathless' }, { label: 'ATU 302 \'The Ogre\'s Heart in the Egg\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type0302.html' }],
  'snake-bridegroom': [{ label: '\'The Snake and the King\'s Daughter\' — full text (Elsie tale 13)', url: 'http://www.albanianliterature.net/folktales/tale_13.html' }, { label: 'ATU 425 \'The Search for the Lost Husband\'', url: 'https://en.wikipedia.org/wiki/The_Search_for_the_Lost_Husband' }, { label: 'ATU 425 \'The Search for the Lost Husband\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type0425.html' }],
  'gjizar': [{ label: '\'Gjizar the Nightingale\' — full text (Elsie tale 14)', url: 'http://www.albanianliterature.net/folktales/tale_14.html' }, { label: 'ATU 550 Golden-Bird type', url: 'https://en.wikipedia.org/wiki/The_Golden_Bird' }, { label: 'ATU 550 \'Bird, Horse and Princess\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type0550.html' }],
  'maiden-promised-sun': [{ label: '\'The Maiden who was Promised to the Sun\' — full text (Elsie tale 22)', url: 'http://www.albanianliterature.net/folktales/tale_22.html' }, { label: 'Elsie, Albanian Folktales and Legends — tale 22 full text', url: 'http://www.aunix.net.au/robxenos/Albanian%20Folk%20Tales%20and%20Legends.pdf' }],
  'goose-girl': [{ label: 'Elsie tale 22 (the marble-king vigil source)', url: 'http://www.albanianliterature.net/folktales/tale_22.html' }, { label: 'ATU 533 \'The Goose Girl\' type', url: 'https://en.wikipedia.org/wiki/The_Goose_Girl' }, { label: 'ATU 425 enchanted-spouse vigil family — Ashliman', url: 'https://sites.pitt.edu/~dash/type0425.html' }],
  'half-rooster': [{ label: '\'Half Rooster\' — full text (Elsie tale 15)', url: 'http://www.albanianliterature.net/folktales/tale_15.html' }, { label: 'ATU 715 \'Half-Chick\' type', url: 'https://en.wikipedia.org/wiki/Half-Chick' }, { label: 'ATU 715 \'Demi-coq / Half-Chick\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type0715.html' }],
  'bear-dervish': [{ label: '\'The Bear and the Dervish\' — full text (Elsie tale 12)', url: 'http://www.albanianliterature.net/folktales/tale_12.html' }, { label: 'ATU 1640 \'The Brave Little Tailor\'', url: 'https://en.wikipedia.org/wiki/The_Valiant_Little_Tailor' }, { label: 'ATU 1640 \'The Brave Tailor\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type1640.html' }],
  'kuma-lisa': [{ label: 'von Hahn 89 (the planted-butter tale, Zeno.org)', url: 'http://www.zeno.org/M%C3%A4rchen/M/Albanien/Johann+Georg+von+Hahn:+Griechische+und+Albanesische+M%C3%A4rchen' }, { label: 'ATU 15 \'The Theft of Butter by Playing Godfather\'', url: 'https://en.wikipedia.org/wiki/The_Fox_and_the_Wolf' }, { label: 'ATU 15 \'Fox Steals the Butter\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type0015.html' }, { label: 'Kuma Lisa (Godmother Fox) — Slavic/Balkan trickster (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Kuma_Lisa' }],
  'cuckoo': [{ label: 'von Hahn 104 \'Entstehung des Kuckucks\' — full text (Zeno.org)', url: 'http://www.zeno.org/M%C3%A4rchen/M/Albanien/Johann+Georg+von+Hahn:+Griechische+und+Albanesische+M%C3%A4rchen/104.+Entstehung+des+Kuckucks' }, { label: 'von Hahn 104 \'Entstehung des Kuckucks\' — full text (Märchenbasar)', url: 'https://maerchenbasar.de/entstehung-des-kuckucks/' }],
  'bee-spider-cicada': [{ label: 'Albanian folk beliefs — bee reverence (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }, { label: 'Albanian folklore — bee/insect etiological beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folklore' }],
  'swallow': [{ label: 'Albanian folk beliefs — swallow reverence (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }],
  'tortoise': [{ label: 'Elsie, Albanian Folktales index (origin-of-animals)', url: 'http://www.albanianliterature.net/folktales/' }, { label: 'ATU 751 \'The Greedy Peasant Woman\' — Ashliman', url: 'https://sites.pitt.edu/~dash/type0751.html' }],
  'nastradin': [{ label: 'Nasreddin Hodja tales — Ashliman collection', url: 'https://sites.pitt.edu/~dash/nasreddin.html' }],
  'besa': [{ label: 'The Code of Lekë Dukagjinit (Gjeçovi/Fox) — archive.org', url: 'https://archive.org/details/kanuni-i-leke-dukagjinit' }, { label: 'Durham, High Albania (1909) full text', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' }, { label: 'Kanun of Lekë Dukagjinit, Book Eight \'Besa\' (Fox trans.)', url: 'https://archive.org/details/the-code-of-leke-dukagjini' }],
  'hospitality': [{ label: 'The Code of Lekë Dukagjinit (Fox) — the guest, archive.org', url: 'https://archive.org/details/kanuni-i-leke-dukagjinit' }, { label: 'Durham, High Albania (1909) full text', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' }, { label: 'Kanun of Lekë Dukagjinit, Book Eight — \'the house belongs to God and the guest\' (Fox)', url: 'https://archive.org/details/the-code-of-leke-dukagjini' }],
  'kanun-blood-feud': [{ label: 'Hasluck, The Unwritten Law in Albania (1954)', url: 'https://archive.org/details/unwrittenlawinal0000marg' }, { label: 'The Code of Lekë Dukagjinit (Fox) — Book on blood', url: 'https://archive.org/details/kanuni-i-leke-dukagjinit' }, { label: 'Reconciliation Movement in 1990 — Çetta, Verrat e Llukës, ~1,200 feuds (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Reconciliation_Movement_in_1990' }],
  'evil-eye': [{ label: 'Albanian folk beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }, { label: 'Durham, High Albania — \'mashallah\', blue bead and thread (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'vajtim': [{ label: 'Albanian Register of Intangible Cultural Heritage (national)', url: 'https://regjistritkj.al/en/' }, { label: 'Elsie, Albanian Oral Verse — laments', url: 'http://albanianliterature.net/oralverse/index.html' }],
  'dita-e-veres': [{ label: 'UNESCO ICH — Cultural practices associated to the 1st of March', url: 'https://ich.unesco.org/en/RL/cultural-practices-associated-to-the-1st-of-march-01287' }, { label: 'UNESCO ICH — Albania country page (5 elements; Dita e Verës absent)', url: 'https://ich.unesco.org/en/state/albania-AL' }],
  'dodola': [{ label: 'Albanian paganism — rain rites (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }],
  'gjakova-cavern': [{ label: 'Durham, High Albania (1909) — full text (Internet Archive)', url: 'https://archive.org/details/highalbania00durhuoft' }, { label: 'Durham, High Albania (1909) — full text (cavern passage), Gutenberg', url: 'https://www.gutenberg.org/ebooks/47554' }],
  'enji': [{ label: 'Albanian paganism — Enji/Zjarri fire cult (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }, { label: '*H₁n̥gʷnis — PIE fire deity, cognate set Agni/ignis (Wikipedia)', url: 'https://en.wikipedia.org/wiki/*H%E2%82%81n%CC%A5g%CA%B7nis' }],
  'perendi': [{ label: 'Albanian paganism — Perëndi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_paganism' }],
  'nena-e-vatres': [{ label: 'Elsie, Dictionary (hearth/fire)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Nëna e Vatrës — characterization & ambivalence (Wikipedia)', url: 'https://en.wikipedia.org/wiki/N%C3%ABna_e_Vatr%C3%ABs' }],
  'fatia-mira': [{ label: 'Elsie, Dictionary (s.v. Fati, Miren)', url: 'https://archive.org/details/dictionaryofalba0000elsi' }, { label: 'Elsie, Dictionary of Albanian Religion, Mythology and Folk Culture (PDF) — \'Fatia\'/\'Mira\'', url: 'https://albanianstudies.org/wp-content/uploads/2015/09/2001-Elsie-Dictionary-of-Albanian-Religion-Mythology-and-Folk-Culture.pdf' }],
  'zana-e-malit': [{ label: 'Doja, \'Mythology and Destiny\' (Anthropos 2005)', url: 'https://www.jstor.org/stable/40466705' }, { label: 'Zana (mythology) — Thana/Diana etymology, golden-horned goats, Muji (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Zana_(mythology)' }, { label: 'Doja, \'Mythology and Destiny\' (Anthropos 2005, JSTOR 40466549)', url: 'https://shs.hal.science/halshs-00425170/file/Mythology_and_Destiny.pdf' }],
  'gjarpri-i-shtepise': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }],
  'djalli': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }],
  'baloz': [{ label: 'Elsie, Songs of the Frontier Warriors (oral verse)', url: 'http://www.albanianliterature.net/oralverse/verse_01.html' }, { label: 'Kângë Kreshnikësh — Baloz in the frontier cycle (Wikipedia)', url: 'https://en.wikipedia.org/wiki/K%C3%ABng%C3%AB_Kreshnik%C3%ABsh' }, { label: 'Gjergj Elez Alia — hero rises after nine years to cut down Balozi i Zi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Gjergj_Elez_Alia' }],
  'lugat': [{ label: 'Elsie, Dictionary of Albanian Religion & Mythology', url: 'https://archive.org/details/dictionaryofalba0000elsi' }],
  'skanderbeg-legjenda': [{ label: 'Scanderbeg and Ballaban (Elsie, legend 07)', url: 'http://www.albanianliterature.net/legends/legend_07.html' }, { label: 'Barleti, Historia de vita et gestis Scanderbegi — source of the legends (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Marin_Barleti' }],
  'ura-e-artes': [{ label: 'Dundes (ed.), The Walled-Up Wife: A Casebook', url: 'https://www.google.com/books/edition/The_Walled_Up_Wife/nq0aVj2Qff8C' }, { label: 'Bridge of Arta — the Greek walled-wife ballad (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Bridge_of_Arta' }],
  'ali-pashe-tepelena': [{ label: 'Byron, Childe Harold\'s Pilgrimage, Canto II (Ali Pasha) — Gutenberg', url: 'https://www.gutenberg.org/files/5131/5131-h/5131-h.htm' }, { label: 'K. E. Fleming, The Muslim Bonaparte (Princeton)', url: 'https://press.princeton.edu/books/paperback/9780691001944/the-muslim-bonaparte' }],
  'tomorri-pilgrimage': [{ label: 'Elsie, The Albanian Bektashi — Abbas Ali cult on Tomorr', url: 'https://catalog.libraries.psu.edu/catalog/27978534' }, { label: 'Bektashism in Albania — the mountain cult of Tomorr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Bektashism_in_Albania' }],
  'rrapi': [{ label: 'Durham, High Albania — open-air assemblies and judgment under the tree (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'binoshet': [{ label: 'ATU 303 \'The Twins or Blood Brothers\'', url: 'https://en.wikipedia.org/wiki/The_Two_Brothers_(fairy_tale)' }, { label: 'The Twins (folktale) — correct URL (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Twins_(folktale)' }, { label: '\'The Twins\' — full English text of the Arbëresh tale', url: 'https://europeanfolktales.com/the-twins-albanian-folktale/' }],
  'arnaut-osmani': [{ label: 'Arnaut Osmani (Elsie/Mathie-Heck, oralverse 13)', url: 'http://www.albanianliterature.net/oralverse/verse_09_13.html' }, { label: 'Arnaut Osman — hero shared across Albanian/Bosniak/Serbian epic (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Arnaut_Osman' }],
  'muji-e-behuri': [{ label: 'Mujo and Behuri (Elsie/Mathie-Heck, oralverse 7)', url: 'http://www.albanianliterature.net/oralverse/verse_09_07.html' }, { label: 'Mujo and Behuri — Albanian text (Visaret e Kombit PDF)', url: 'http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_07.pdf' }, { label: 'Songs of the Frontier Warriors — \'Mujo and Behuri\' (Palaj-Kurti #6)', url: 'https://www.bolchazy.com/Songs-of-the-Frontier-Warriors-The-Albanian-Epic-Kenge-Kreshnikesh-P3350' }],
  'halil-garria': [{ label: 'Constantin and Doruntinë — returning-dead type (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Constantin_and_Doruntin%C3%AB' }, { label: 'Timo Mërkuri, \'Kënga e Halil Garrisë dhe disa probleme\' (Zemra Shqiptare)', url: 'https://www.zemrashqiptare.net/news/55566/timo-merkuri-kenga-e-halil-garrise-dhe-disa-probleme.html' }],
  'nata-e-buzmit': [{ label: 'Yule log / badnjak — Balkan cognate custom (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Badnjak_(Slavic)' }],
  'kanuni': [{ label: 'Kanuni i Lekë Dukagjinit (Gjeçovi/Fox bilingual) — archive.org', url: 'https://archive.org/details/kanuni-i-leke-dukagjinit' }, { label: 'Elsie, \'Northern Albanian Culture and the Kanun\' (PDF)', url: 'http://www.elsie.de/pdf/articles/A2012KanunLeiden.pdf' }],
  'oda-e-burrave': [{ label: 'Durham, High Albania (1909) — the oda/kulla', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' }, { label: 'Durham, High Albania — the oda/kulla and nighttime singing of the epic (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'gjama-e-burrave': [{ label: 'Albanian Register of Intangible Cultural Heritage — Gjama e Burrave (national)', url: 'https://regjistritkj.al/en/' }],
  'dita-e-shen-gjergjit': [{ label: 'Đurđevdan / St George\'s Day Balkan customs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/%C4%90ur%C4%91evdan' }, { label: 'Durham, High Albania — St George\'s Day, flocks to pasture, green branches (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'kurbani': [{ label: 'Eid al-Adha / Kurban (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Eid_al-Adha' }, { label: 'Sara Kuehn, Tomor Pilgrimage (Bektashi kurban, ~5,000/year)', url: 'https://www.sarakuehn.com/tomor-pilgrimage-albania' }],
  'burrnesha': [{ label: 'Durham, High Albania (1909) — \'Albanian virgins\'', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' }, { label: 'Durham, High Albania — the Avowed/Sworn Virgin living as a man (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'stani': [{ label: 'Durham, High Albania (1909) — highland pastoral life', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' }, { label: 'Durham, High Albania — the stan, bjeshkë, cheese and curd (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'dasma': [{ label: 'Hasluck, The Unwritten Law in Albania (1954) — marriage', url: 'https://archive.org/details/unwrittenlawinal0000marg' }],
  'paja': [{ label: 'Durham, High Albania — the bride\'s chest and displayed handwork (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'mikpritja-oda': [{ label: 'Durham, High Albania (1909) full text', url: 'https://digital.library.upenn.edu/women/durham/albania/albania.html' }],
  'vellameri': [{ label: 'Hasluck, The Unwritten Law in Albania (1954) — sworn kinship', url: 'https://archive.org/details/unwrittenlawinal0000marg' }, { label: 'Proto-Slavic *pobratimъ — source of Alb. probatin (Wiktionary)', url: 'https://en.m.wiktionary.org/wiki/Reconstruction:Proto-Slavic/pobratim%D1%8A' }],
  'lindja-besiku': [{ label: 'Durham, High Albania — first-forty-days vulnerability, cradle charms (PDF)', url: 'https://plisi.org/biblio/libra/durham/high-albania.pdf' }],
  'besa-truce': [{ label: 'Hasluck, The Unwritten Law in Albania (1954) — besa/truce', url: 'https://archive.org/details/unwrittenlawinal0000marg' }],
  'emri-tabu': [{ label: 'Albanian folk beliefs — name avoidance, wolf euphemism \'mbylltë Zoti gojën\' (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }],
  'bajrami': [{ label: 'Eid al-Fitr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Eid_al-Fitr' }, { label: 'Islam in Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Islam_in_Albania' }],
  'ramazani': [{ label: 'Ramadan (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ramadan' }],
  'kafeja': [{ label: 'Turkish coffee — UNESCO ICH intangible heritage', url: 'https://ich.unesco.org/en/RL/turkish-coffee-culture-and-tradition-00645' }, { label: 'Culture of Albania (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Culture_of_Albania' }],
  'rakia-gezuar': [{ label: 'Rakia (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Rakia' }],
  'syri-apparati': [{ label: 'Nazar (amulet) (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Nazar_(amulet)' }, { label: 'Evil eye (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Evil_eye' }],
  'mashallah-ptu': [{ label: 'Mashallah (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Mashallah_(expression)' }],
  'fall-kafeja': [{ label: 'Fortune-telling / Balkan coffee reading (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Coffee_reading' }],
  'e-marta': [{ label: 'Albanian folk beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }],
  'nusja-omens': [{ label: 'Culture of Albania — marriage customs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Culture_of_Albania' }],
  'barra-besime': [{ label: 'Maternal impression — the craving-birthmark belief (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Maternal_impression' }],
  'pragu': [{ label: 'Albanian folk beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }],
  'besime-popullore': [{ label: 'Albanian folk beliefs (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Albanian_folk_beliefs' }],
  'illyrian-kingdom-teuta': [{ label: 'Polybius, Histories Bk. II (Teuta & the Illyrian War, PD)', url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/2*.html' }, { label: 'Britannica: Teuta', url: 'https://www.britannica.com/biography/Teuta' }, { label: 'Polybius, Histories Bk. II (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0234:book=2' }, { label: 'Appian, The Illyrian Wars (Livius)', url: 'https://www.livius.org/sources/content/appian/appian-the-illyrian-wars/' }],
  'apollonia-butrint': [{ label: 'UNESCO World Heritage: Butrint (site 570)', url: 'https://whc.unesco.org/en/list/570/' }, { label: 'Butrint — ICOMOS evaluation & OUV (UNESCO)', url: 'https://whc.unesco.org/en/list/570/documents/' }, { label: 'Leake, Travels in Northern Greece (Apollonia & Butrint)', url: 'https://archive.org/details/travelsinnorther01leak' }],
  'roman-conquest-illyria': [{ label: 'Livy, History of Rome Bk. 44 (defeat of Gentius, PD)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144' }, { label: 'Britannica: Gentius', url: 'https://www.britannica.com/biography/Gentius' }, { label: 'Livy, History of Rome Bk. 44 (Gentius, Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=44' }],
  'via-egnatia': [{ label: 'Britannica: Via Egnatia', url: 'https://www.britannica.com/topic/Via-Egnatia' }, { label: 'Via Egnatia — route, milestones, Egnatius inscription (Livius)', url: 'https://www.livius.org/articles/place/via-egnatia/' }, { label: 'Strabo, Geography Bk. 7 — the Egnatian Way (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0198:book=7' }],
  'principality-arbanon': [{ label: 'Britannica: Albania — Medieval period', url: 'https://www.britannica.com/place/Albania/The-medieval-period' }],
  'skanderbeg-revolt-kruje': [{ label: 'Barleti, History of Scanderbeg (1596 Eng. tr., EEBO/PD)', url: 'https://quod.lib.umich.edu/e/eebo/A05070.0001.001' }, { label: 'Noli, George Castrioti Scanderbeg (PD)', url: 'https://archive.org/details/georgecastriotis00noli' }],
  'league-of-lezhe': [{ label: 'Britannica: Skanderbeg', url: 'https://www.britannica.com/biography/Skanderbeg' }, { label: 'Setton, The Papacy and the Levant vol. II (on Barleti\'s reliability)', url: 'https://archive.org/details/papacylevant1204volu02sett' }],
  'sieges-of-kruje': [{ label: 'Britannica: Skanderbeg (sieges of Krujë)', url: 'https://www.britannica.com/biography/Skanderbeg' }, { label: 'Babinger, Mehmed the Conqueror and His Time (Krujë campaigns, Elbasan)', url: 'https://archive.org/details/mehmedconquerorh0000babi' }],
  'death-of-skanderbeg': [{ label: 'Noli, George Castrioti Scanderbeg (death at Lezhë, PD)', url: 'https://archive.org/details/georgecastriotis00noli' }, { label: 'Britannica: Skanderbeg', url: 'https://www.britannica.com/biography/Skanderbeg' }, { label: 'Gibbon, Decline and Fall ch. 67 (Scanderbeg, Gutenberg)', url: 'https://www.gutenberg.org/files/25717/25717-h/25717-h.htm' }],
  'arberesh-exodus': [{ label: 'Britannica: Albanian language (Arbëreshë)', url: 'https://www.britannica.com/topic/Albanian-language' }, { label: 'Elsie — albanianhistory.net (Arbëresh settlement documents)', url: 'http://www.albanianhistory.net/' }],
  'ottoman-order': [{ label: 'Britannica: Timar', url: 'https://www.britannica.com/topic/timar' }, { label: 'İnalcık, The Ottoman Empire: The Classical Age 1300–1600 (timar & defter)', url: 'https://archive.org/details/ottomanempirecla0000inal' }],
  'devshirme-boy-levy': [{ label: 'Britannica: Devshirme', url: 'https://www.britannica.com/topic/devshirme' }, { label: 'Britannica: Janissary', url: 'https://www.britannica.com/topic/Janissary' }],
  'conversion-and-bektashi': [{ label: 'Britannica: Bektashi', url: 'https://www.britannica.com/topic/Bektashi' }, { label: 'Skendi, \'Crypto-Christianity in the Balkan Area under the Ottomans\' (laramanë, JSTOR)', url: 'https://www.jstor.org/stable/2493645' }],
  'nora-of-kelmendi': [{ label: 'Elsie, The Tribes of Albania (Kelmendi history)', url: 'https://archive.org/details/tribesofalbaniah0000elsi' }],
  'voskopoje-enlightenment': [{ label: 'Britannica: Aromani (Vlachs)', url: 'https://www.britannica.com/topic/Aromani' }],
  'bushati-pashalik-shkodra': [{ label: 'Britannica — Albania: the Ottoman period (Bushati & pashaliks)', url: 'https://www.britannica.com/place/Albania/The-Ottoman-period' }],
  'ali-pasha-ioannina': [{ label: 'Leake, Travels in Northern Greece (PD)', url: 'https://archive.org/details/travelsinnorther01leak' }, { label: 'Britannica — Ali Paşa Tepelenë', url: 'https://www.britannica.com/biography/Ali-Pasa-Tepelene' }],
  'rilindja-awakening': [{ label: 'Britannica: Albanian language (Congress of Manastir)', url: 'https://www.britannica.com/topic/Albanian-language' }, { label: 'Skendi, The Albanian National Awakening 1878–1912 (Princeton 1967)', url: 'https://archive.org/details/albaniannational0000sken' }],
  'league-of-prizren': [{ label: 'Skendi, The Albanian National Awakening', url: 'https://archive.org/details/albaniannational0000sken' }, { label: 'Britannica: League of Prizren', url: 'https://www.britannica.com/event/League-of-Prizren' }, { label: 'Elsie — 1878 Resolutions of the League of Prizren (primary text)', url: 'http://www.albanianhistory.net/1878_League-of-Prizren/index.html' }],
  'mic-sokoli': [{ label: 'Skendi, The Albanian National Awakening (1881 resistance)', url: 'https://archive.org/details/albaniannational0000sken' }],
  'independence-1912': [{ label: 'Skendi, The Albanian National Awakening (1912 Vlora)', url: 'https://archive.org/details/albaniannational0000sken' }, { label: 'Britannica: Albania — Independence', url: 'https://www.britannica.com/place/Albania/Independence' }, { label: 'Elsie — 1912 Declaration of Independence (primary text)', url: 'http://www.albanianhistory.net/1912_Independence/index.html' }],
  'shote-azem-galica': [{ label: 'Elsie, Biographical Dictionary of Albanian History (Galica)', url: 'https://archive.org/details/biographicaldict0000elsi' }, { label: 'Vickers, The Albanians: A Modern History (Kaçak movement)', url: 'https://archive.org/details/albaniansmodernh0000vick' }],
  'gjakmarrja': [{ label: 'Durham, High Albania — \'The Land and the Law\' (PD)', url: 'https://archive.org/details/highalbania0000durh' }, { label: 'Elsie, \'Northern Albanian Culture and the Kanun\' (PDF)', url: 'http://www.elsie.de/pdf/articles/A2012KanunLeiden.pdf' }],
}
