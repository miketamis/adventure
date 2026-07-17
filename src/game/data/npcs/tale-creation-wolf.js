// NPCs: the wolf-creation myth (creation-wolf) cast — see ../npcs/_SCHEMA.md
// for the format contract. One file per area/tale so parallel agents never
// collide. The teller is the REUSED core NPC plakuSheshit (linked from the
// tale file's cast); only the myth's own figures live here.

export default {
  // ── Why the Wolf Devours (creation-wolf) — the myth's figures ────────────
  zoti: {
    name: 'Zoti', glyph: '🌬️', kind: 'mythic',
    role: 'our Lord (Zoti, Perëndia) — the maker in the folk myth-notes',
    backstory: 'The God of the tellings: he shapes the first man and woman, lets the Devil try his hand for sport, and — tired of watching the vain blowing — strikes the dough-wolf alive with a switch and the words "devour your creator." He is Zoti/Perëndia of the myth-notes, NOT Dielli the Sun (the sworn-by eye with his own compound) and NOT Baba Tomor (the mountain-father of the southern legend); the three must never be fused.',
    folklore: ['creation-wolf'],
    location: { status: 'planning', plan: 'never drawn — staged only inside tellings (here: the wolf\'s own telling at ujkuLind1); if heaven is ever drawn it sits above the Sun\'s plateau, and is not the Sun\'s compound' },
    tales: { 'creation-wolf': 'zoti' },
  },
  djalli: {
    name: 'Djalli', glyph: '😈', kind: 'mythic',
    role: 'the Devil of the myth-notes — maker of exactly one creature',
    backstory: 'He stood by at the making of man, called it a cheap trick, and kneaded a wolf of dough to prove himself the better maker. No breath of his could bring it to life; God\'s word did — and the wolf\'s first meal was its maker. The devil of the tales is a figure every telling re-makes, not one biography: the neighbouring myth-note (Hahn 106) keeps a devil chained to a rock and gnawing, and being eaten here binds neither.',
    folklore: ['creation-wolf'],
    location: { status: 'planning', plan: 'staged only inside the telling at ujkuLind1 — devoured at the world\'s first morning in this myth' },
    tales: { 'creation-wolf': 'djalli' },
  },
  ujkuPare: {
    name: 'Ujku i Parë', glyph: '🐺', kind: 'creature',
    role: 'the first wolf — the Devil\'s dough, alive at God\'s word',
    backstory: 'Kneaded of dough by the Devil, struck in the side by the Lord\'s switch (the kink every wolf carries since), and given life with "devour your creator" — obeyed at once. Every devouring wolf is of his kind, and the curse «Haje, ujk, e plase, Shën Mëhill!» calls on that kind; the hungry wolf of the deep forest (pylliThelle) inherits his appetite but is NOT named as him — the fed one may even prove a drangue in a wolf\'s hide (the ujkuUje ending) without contradiction.',
    folklore: ['creation-wolf', 'wolf'],
    location: { status: 'planning', plan: 'lives inside the telling at ujkuLind1; his kind haunts pylliThelle' },
    tales: { 'creation-wolf': 'ujku' },
  },
  ciftiPare: {
    name: 'çifti i parë', glyph: '👫', kind: 'collective',
    role: 'the first man and woman — the handiwork the Devil sneered at',
    backstory: 'Shaped by our Lord at the world\'s first morning, present and silent through the whole wager — the tale keeps them only long enough to be boasted against, then loses sight of them in the new world. Every teller at every oda fire is their child.',
    folklore: ['creation-wolf'],
    location: { status: 'planning', plan: 'the world\'s first morning — never drawn; staged only inside the telling at ujkuLind1' },
    tales: { 'creation-wolf': 'ciftiPare' },
  },
  shenMehilli: {
    name: 'Shën Mëhilli', glyph: '⚔️', kind: 'mythic',
    role: 'Archangel Michael — named in the curse, explained by no one',
    backstory: 'The curse calls on him — «Haje, ujk, e plase, Shën Mëhill!» — yet he does nothing in the tale, and von Hahn\'s note ends by admitting that what the archangel had to do with it, nobody could say. He stands in the registry exactly as he stands in the curse: invoked, never staged. (Wider lore makes Michael a taker of souls, which may be the curse\'s missing logic — but no Albanian telling on record says so, and neither do we.)',
    folklore: ['creation-wolf'],
    location: { status: 'planning', plan: 'heaven — offstage by the tale\'s own admission' },
    tales: { 'creation-wolf': 'shenMehilli' },
  },
}
