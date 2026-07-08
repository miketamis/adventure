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
      'The "Daughter of the Moon and Sun," a lightning-maiden (pika e qiellit, "drop of the sky") born of the married Sun and Moon, with a star on her brow and a moon on her breast. She descends to strike down pride and evil — her bolt splits the dark and strikes the crowned head from the Kulshedra, helping a hero break a drought (recorded by Mitrush Kuteli, 1965). She can "swallow" or free the Sun in an eclipse.',
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
      'The most important figure of Albanian folktale: at once a crafty otherworld fairy and a chthonic goddess of the underworld and of springtime — an Albanian Persephone, often identified with Prende. She lives in a mystical underworld palace; the hero\'s quest to find or rescue her is the most frequent motif in the tales (and the spine of Aventura Shqip). Her hand is won by the one who heeds her trials, not the one who grabs.',
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
      'The Beauty of the Sea, sister of the Earthly Beauty — a sea-fairy of beauty, danger and mystery who can carry a fallen hero up from the deep into the light. The old tales teach she is won not by seizing her gold or forcing her hand, but by taking a single strand of her golden hair, by which gentlest claim she becomes a faithful wife.',
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
      'A female water-spirit of springs, lakes and hidden mountain tarns (named for long flowing hair) who can pull the unwary under. In the tales a Floçka does not know human speech until a mortal teaches it; she may be caught and kept by a man, bound to his house by a besa and silent for years, and the day the oath is broken she slips back beneath the water. She is the rare power won not by the sword but by a word.',
    sources: [
      { label: 'Ora (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Ora_(mythology)' },
    ],
    related: ['snake-bridegroom', 'syri-kalter', 'bukura-e-detit'],
  },
  {
    id: 'peri',
    title: 'Peri — the white-clad fairies of the heights',
    category: 'Fairy',
    summary:
      'White-clad mountain spirits, close to but distinct from the warlike Zana, who can punish trespassers. The perí prize bread above all things and watch how mortals treat it: share your bread with a hungry fairy and she lets her grace and good will fall on you; waste it, throw a crust to the ground, and the perí bend the squanderer into a crooked hunchback and wither the careless hand.',
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
    title: 'Karkanxholl — the chain-dragging January revenant',
    category: 'Creature',
    summary:
      'An iron-shirted undead that roams in the dead of winter — the twelve dark nights between Christmas and Epiphany — dragging chains through the snow and breathing a deadly breath (a cognate of the Greek kallikantzaros). It knocks and calls sleepers by name; whoever answers is cursed or carried off. The wise hold their tongue and keep the door barred; only a dhampir can see and fight one.',
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
      'The worse, hardened stage of a lugat left too long unburned — around Mount Tomorr above all — and also the restless soul of a miser haunting his house. Pictured as short and stocky with a goat\'s tail, it is invulnerable to any blade and can be killed only one way: strangled with a noose of green vine. (In the south, instead, a blind female plague-demon.)',
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
      'The wolf of the pastoral curse "Të hângtë ujku!" ("May the wolf eat you!"). A starving wolf is all teeth; the only thing that gentles it is bread, shared not withheld — with a loaf in hand you may win a companion, with empty fists you lose. In some tales a wolf is no wolf at all but a drangue in a wolf\'s hide, a storm-hero who sheds its shape to battle the Kulshedra in the clouds.',
    sources: [
      { label: 'Drangue (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Drangue' },
    ],
    related: ['creation-wolf', 'drangue', 'peri', 'kuma-lisa'],
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
    related: ['besa', 'tomor-shpirag', 'constantine-doruntine'],
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
    related: ['besa', 'rozafa', 'aga-ymer', 'dhampir', 'karkanxholl', 'vajtim'],
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
      { label: 'Tomorr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Tomorr' },
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
      { label: 'Tomorr (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Tomorr' },
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
      'Zuku Bajraktar (Zuk the standard-bearer), a kreshnik of the highland songs so strong his own terrified mother had him blinded — healed of his blindness by an Ora\'s mountain herb, he rides on at the hero\'s side. In the bride-raid lay a warrior rides into the Krajl\'s tower for Rusha, the Krajl\'s daughter across the frontier, and will not carry her off until she swears him a besa that she comes of her free will: a bride won not by the sword but by the sworn word. A maiden taken by force is a war, not a wedding.',
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
    title: 'Mujo Avenges Halili — the blood answered',
    category: 'Epic',
    summary:
      'The most famous of the frontier songs: a Slav captain kills young Halili by treachery, and his elder brother Mujo of Jutbina will not rest while the blood lies unanswered. He hunts the captain down and cuts him to the ground over Halili\'s own grave, so the debt is paid where the boy lies buried. In the highland code a brother\'s blood, treacherously spilled, is the one debt that must be answered.',
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
    related: ['besa', 'constantine-doruntine', 'zuku-bajraktar'],
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
      'A patient-heroine tale (the Goose-Girl, ATU 533, joined in the game to the marble-king vigil of tale 22). A locked garden shuts a girl in among people and beasts of marble with a marble king whose scroll promises life to whoever keeps a three-week vigil. Worn out at the last, she buys a maidservant to watch while she sleeps; the servant steals her place, dressing in her clothes and telling the waking king she kept watch, and he marries her. Demoted to goose-girl, the true heroine weeps her tale aloud in her hut until the king overhears, learns the truth, and takes her for his wife. A truth never spoken aloud changes nothing.',
    sources: [
      {
        label: 'von Hahn, Griechische und albanesische Märchen (Internet Archive)',
        url: 'https://archive.org/stream/GriechischeUndAlbanesischeMarchenJohannGeorgVonHahn/GriechischeUndAlbanesischeMarchen-JohannGeorgVonHahn_djvu.txt',
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
      'The Kanun of Lekë Dukagjini regulated rather than commanded vengeance — blood for blood, koka për kokë, head for head — and those "in blood" shut themselves in the fortified kullë. But the code honours above revenge the falja e gjakut, the forgiving of blood, brokered by elders (pleqësia) and priests until killer and avenger drink together and become new brothers. At Verrat e Llukës in 1990 a thousand feuds were forgiven in a day. A besa kept is worth more than a head taken; forgiving the blood is the harder and higher thing.',
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
      'The chief Albanian festival, the old New Year (Kryeviti) held on 14 March at the spring equinox — the oldest feast of the pagan calendar, marking the end of winter and the strengthening of the Sun. Customs: baking the round corn-flour ballokume cookie, wearing the red-and-white "Verore" wool bracelet, and bonfires on high places that families leap to be cleansed for the new year. On the holy mountain the Zana of the heights shows herself, as on this one day alone. A UNESCO-listed heritage.',
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
