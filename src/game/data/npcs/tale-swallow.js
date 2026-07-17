// NPCs: The Swallow (dallëndyshja) cast — see ../npcs/_SCHEMA.md for the
// format contract. One file per area/tale so parallel agents never collide.

export default {
  // ── The Swallow (dallëndyshja) — the tale's own figures ───────────────────
  dallendyshja: {
    name: 'Dallëndyshja', glyph: '🐦', kind: 'mythic',
    role: 'the swallow who saved mankind — friend of every house',
    backstory: 'Aboard a storm-holed ship she alone kept the mosquito from naming man’s blood to the serpent that would have fed on him ever after: one snap of her beak took the tongue mid-word. The cheated serpent cursed her nests forever; she answered by building hers at the very head of man, where no one has ever torn one down since. The game’s own back-lane vignette (dallendyshe1 → dallendysheFund) remembers one blow more than any printed telling does: the serpent’s strike as she fled, which forked her tail into the shape she still wears. NOT the cuckoo (Qyqja) or her brother the gjon-bird — grief made them; the swallow earned her mark by an act of courage, and it is a sin to harm her nest to this day.',
    folklore: ['swallow'],
    location: { status: 'placed', node: 'dallendysheFund' },
    tales: { swallow: 'dallendyshja' },
  },
  mushkonja: {
    name: 'Mushkonja', glyph: '🦟', kind: 'creature',
    role: 'the mosquito who found whose blood was sweetest — and never got to say',
    backstory: 'Sent up by the serpent’s bargain, she tasted beast, bird and man before the truth she’d hunted for was cut out of her own mouth, half-spoken. Every mosquito since carries her sentence: a thin buzz, «cëz», is the only sound left to her — the word she is still, forever, trying to finish.',
    folklore: ['swallow'],
    location: { status: 'placed', node: 'dallendyshe1' },
    tales: { swallow: 'mushkonja' },
  },
  gjarpriAnijes: {
    name: 'Gjarpri i anijes', glyph: '🐍', kind: 'creature',
    role: 'the serpent that priced a sinking ship at the sweetest blood alive',
    backstory: 'A single sea-crossing serpent, not the underworld’s threshold-guardian (gjarpri, a different creature entirely — a kulshedra or gjarpër is a KIND, not a name) and not any house-snake’s vitore: this one coiled itself into a ship’s hull to buy time, named its own price — the sweetest blood there is — and was cheated of the answer by a swallow’s beak. It struck at her as she fled and has held its grudge against man ever since; every plain serpent’s bite is said to carry that same old temper.',
    folklore: ['swallow'],
    location: { status: 'planning', plan: 'gone back to the water once the ship was safe — lives only inside the telling at dallendyshe1 (the back lane’s own vignette); no serpent of a single sea-crossing keeps a fixed place on the map' },
    tales: { swallow: 'gjarpri' },
  },
  udhetaretAnijes: {
    name: 'udhëtarët e anijes', glyph: '⛵', kind: 'collective',
    role: 'the captain and passengers whose lives hung on the wager',
    backstory: 'A shipful of ordinary people, mid-crossing, saved twice over without ever knowing it: once by the serpent’s plug in the hull, and once more by the swallow, who kept the serpent from ever learning that their blood — man’s blood — was the sweetest of all. They sailed on to wherever they were bound and never learned the second rescue happened.',
    folklore: ['swallow'],
    location: { status: 'planning', plan: 'aboard the tale’s own steamship, never staged on the map — the game folds their entire crossing into the back lane’s overheard vignette (dallendyshe1)' },
    tales: { swallow: 'udhetaret' },
  },
}
