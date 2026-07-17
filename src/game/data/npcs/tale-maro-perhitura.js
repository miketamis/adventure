// NPCs: the Maro Përhitura tale cast — see ../npcs/_SCHEMA.md for the format
// contract. This file is owned by its tale: agents editing other tales must
// not touch it. The xhindet (cast id 'xhinerit') REUSE the existing
// core-village.js entry — not redefined here.
// ===========================================================================

export default {
  maro: {
    name: 'Maro', glyph: '🧹', kind: 'human',
    role: 'the ash-covered elder daughter — ground down by her stepmother, gilded by the xhindet, later a foreign prince\'s wife',
    backstory: 'Her mother dies within the year of her birth; her father remarries and dies in turn, leaving her to a stepmother\'s house where her two half-sisters dress fine while she is sent for the heaviest work in rags, fed only moldy bread. Sent alone to the night-mill to be rid of by the xhindet, she meets their questions with the whole patient toil of flax from seed to shirt and is gilded in gold instead of destroyed; a foreign prince dreams her face and finds her again by a golden slipper and a vanishing coach. She bears the prince a son; her stepmother\'s bought needle turns her into a bird until the prince himself draws it from her head.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'her arc runs across the beat anchors: the stepmother\'s house (proposed, fshatiJeta) → the mill (mulli1, existing) → the aunt\'s house (proposed, fshatiLanes) → the prince\'s inn (proposed, udhekryq) → the palace, offstage in another land' },
    tales: { 'maro-perhitura': 'maro' },
  },
  atiMaros: {
    name: 'i ati i Maros', glyph: '👨', kind: 'human',
    role: 'the widower who remarries, then dies — leaving Maro to the stepmother',
    backstory: 'A village man left alone with an infant daughter when his first wife dies within the year of Maro\'s birth. His friends press him to remarry rather than raise her alone, and he takes a second wife who tends the girl out of fear of him rather than love while he lives. His own death, some years on, hands the household over to that stepmother outright.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'lives and dies at the proposed household anchor (shtëpia, fshatiJeta)' },
    tales: { 'maro-perhitura': 'ati' },
  },
  njerkaMaros: {
    name: 'njerka e Maros', glyph: '🪞', kind: 'human',
    role: 'the stepmother who works Maro to the bone and twice tries to destroy her',
    backstory: 'Bears Lilo and Lena after marrying the widower; once he dies she rules the house outright, dresses her own daughters fine and sends Maro for every hard chore on moldy bread. Furious that suitors ask for Maro instead of her own girls, she sends her alone to the night-mill hoping the xhindet destroy her — and when it gilds her instead, sends Lilo the same way out of pure greed. Years later, once Maro is a princess, she bribes the court midwife and pays a great sorceress for a bewitched needle to turn her into a bird and put Lena in her bed. NOT the great sorceress herself (magjistrelaMadhe) — she only pays for the magic, and is buried alive for it in the end.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'rules the proposed household anchor (shtëpia, fshatiJeta) after the husband\'s death; later lives near the palace at Maro\'s own asking' },
    tales: { 'maro-perhitura': 'njerka' },
  },
  liloja: {
    name: 'Lilo', glyph: '🌀', kind: 'human',
    role: 'the stepmother\'s elder daughter — sent to the mill for gold, and twisted limb by limb instead',
    backstory: 'Dressed fine and left idle while Maro does the heavy work. Sent to the night-mill in Maro\'s place, she answers the xhindet\'s questions with insults instead of patience and is twisted hand, hand, foot and head before cockcrow; doctors, priests and bishops barely straighten her partway. Later married off to an officer, crooked as she remains.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'lives at the proposed household anchor (shtëpia, fshatiJeta); her mill night plays out at mulli1 (existing)' },
    tales: { 'maro-perhitura': 'lilo' },
  },
  lenaMaros: {
    name: 'Lena', glyph: '🍼', kind: 'human',
    role: 'the stepmother\'s youngest daughter — put in Maro\'s childbed while Maro flies off a bird',
    backstory: 'Too plain to find a husband of her own; laid in the princess\'s bed the instant Maro is turned into a bird, and passed off to the prince as his own changed wife. Has no milk for the newborn, and is finally exposed once the prince pulls the needle from the bird\'s head. Buried alive alongside her mother, the sorceress and the midwife.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'lives at the household anchor (shtëpia, fshatiJeta), later smuggled into the offstage palace for the birth' },
    tales: { 'maro-perhitura': 'lena' },
  },
  tetuaMagjistare: {
    name: 'tetua e Maros', glyph: '🔮', kind: 'mythic',
    role: 'Maro\'s aunt — her dead mother\'s sister, and a magjistare in her own right',
    backstory: 'Feeds and shelters Maro in secret whenever the stepmother starves her, at real risk of a beating if caught. A magjistare (enchantress): turns two mice into horses, four grasshoppers into coachmen and a great pumpkin into a golden coach so Maro can attend the prince\'s feast, dressing her in gold both nights on one condition — leave by half past eleven, for at the stroke of midnight everything reverts. NOT magjistrelaMadhe, the great sorceress the stepmother later pays to destroy Maro — this aunt\'s magic is family loyalty, kept apart from any trade in harm.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'keeps her own house at the proposed aunt\'s-house anchor (fshatiLanes)' },
    tales: { 'maro-perhitura': 'tetua' },
  },
  qeniMaros: {
    name: 'qeni i shtëpisë', glyph: '🐕', kind: 'creature',
    role: 'the household dog — announces the truth on the doorstep whether anyone wants to hear it or not',
    backstory: 'Sees Maro come home gilded in gold after the mill and barks it out before she can even knock; sees Lilo come home twisted on a miller\'s horse and barks that out too. Both times the stepmother curses the dog for lying, and both times the dog was exactly right.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'keeps the household\'s doorstep at the proposed shtëpia anchor (fshatiJeta)' },
    tales: { 'maro-perhitura': 'qeni' },
  },
  millonejte: {
    name: 'millonejtë', glyph: '🌾', kind: 'collective',
    role: 'the millers of mulli1 — gone by nightfall, when the xhindet come',
    backstory: 'Work the common stone by day, same as ever, and never stay after dark, for the xhindet gather there at night and no one dares steal from a mill the xhindet might be watching — they leave the door open and the queued grinding behind them without a second thought. Find Lilo twisted the morning after her own mill night and send her home on a horse.',
    folklore: ['maro-perhitura'],
    location: { status: 'placed', node: 'mulli1' },
    tales: { 'maro-perhitura': 'millonejte' },
  },
  princiEndrres: {
    name: 'princi i ëndrrës', glyph: '👑', kind: 'human',
    role: 'the foreign prince who dreamed his bride before he ever saw her',
    backstory: 'Rules his own land and has refused every princess ever shown him, until a nameless girl comes to him in a dream and he takes her measure in his sleep. Wakes to find the measurements true, has shoes and clothes cut to them, and holds a fifteen-night feast at a nearby city\'s inn for every unmarried girl of the district. Marks the golden stranger\'s house, returns two months later with a full wedding train, and — once he later draws a hidden needle from a bird\'s head — finds his true wife restored in his own hands.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'rules an offstage palace in another land; holds his feast at the proposed inn anchor (hani, udhekryq)' },
    tales: { 'maro-perhitura': 'princi' },
  },
  trimatPrincit: {
    name: 'trimat e princit', glyph: '🐎', kind: 'collective',
    role: 'the prince\'s riders — sent to follow the golden coach home',
    backstory: 'Ordered to saddle up and trail the mystery guest\'s coach on the second night of the feast; watch it vanish from before their own eyes at the stroke of midnight, then wait and mark first the aunt\'s house and then the ragged girl\'s own house, so the prince can find her again.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'ride with the prince from the proposed inn anchor (hani, udhekryq)' },
    tales: { 'maro-perhitura': 'trimat' },
  },
  magjistrelaMadhe: {
    name: 'magjistrela e madhe', glyph: '⚗️', kind: 'mythic',
    role: 'the great sorceress the stepmother pays to destroy Maro',
    backstory: 'Takes a hundred lira from the stepmother and ten days to work a bewitched needle that turns whoever it pricks into a bird at the instant of childbirth, and teaches the stepmother exactly how and when to use it, and what Lena is to say if the prince notices the change. NOT tetuaMagjistare, Maro\'s own aunt — this sorceress deals in destruction for a price, and is buried alive alongside the stepmother once the truth comes out.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'keeps her own trade in spellcraft somewhere in the district; never given a drawn spot of her own' },
    tales: { 'maro-perhitura': 'magjistrela' },
  },
  mamijaPabese: {
    name: 'mamia e pabesë', glyph: '👵', kind: 'human',
    role: 'the court midwife, bribed to keep silent at the birth',
    backstory: 'Delivers the prince\'s son and, bought off by the stepmother beforehand, says nothing while the stepmother sticks the bewitched needle into the new mother\'s head and lays her own daughter in the childbed instead. Exposed and buried alive with the other three once the prince learns the truth.',
    folklore: ['maro-perhitura'],
    location: { status: 'planning', plan: 'serves as the court\'s own midwife at the offstage palace' },
    tales: { 'maro-perhitura': 'mamia' },
  },
}
