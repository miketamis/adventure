// NPCs new to "The Marriage of Halili" (Martesa e Halilit) — see
// ../npcs/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it. Mujo himself is NOT
// duplicated here — he is the core NPC `mujo` in core-world.js. Their mother
// is NOT duplicated either — she is `nenaMujit`, defined in
// ../npcs/tale-mujo-strength.js (still waiting at Jutbina for both her sons),
// reused here by npc id exactly as bukuraDheut is reused across tales.
// ===========================================================================

export default {
  // halili — Sokol Halili — is the shared canonical figure in core-kreshnik.js;
  // this, his signature tale, reuses it by the cast npc link.
  tanusha: {
    name: 'Tanusha', glyph: '🌹', kind: 'human',
    role: "the Krajl's daughter of New Kotor, Halili's bride",
    backstory:
      "The only child of the Krajl of New Kotor. Halili glimpsed her once during a truce with the Realm of the Christians and could love no one else afterward; she proves quick enough to hide him among her own three hundred maidens and clever enough to talk her own father past him twice. NOT E Bukura e Dheut (the serial won-bride of the three-friends tale, a mythic figure the lore hands to hero after hero and who outlasts every era) — Tanusha is a mortal princess with a mortal mother and father who loses her, and the song's maids call her \"Earthly Beauty\" only as their own praise-word for a fair face, not the mythic name.",
    folklore: ['halil-marriage'],
    location: { status: 'placed', node: 'mujo3' },
    tales: { 'halil-marriage': 'tanusha' },
  },
  krajliKotor: {
    name: 'Krajli i Kotorës së Re', glyph: '👑', kind: 'human',
    role: 'the Captain King of New Kotor, Tanusha\'s father',
    backstory:
      "Rules New Kotor across the frontier river from Jutbina — Tanusha's father, easily talked past a stranger twice by his own daughter's cover story, and just as quickly murderous once the trick comes out. He jails Halili and dies at his own stake, cut down by the very man he condemned. A Krajl is a KIND, not a name, like Baloz or Kulshedra: NOT the Krajl who jails Mujo in the jutbina halil1/halilFund vignette (there Halili rides free to spring his brother; the roles are reversed here, and this Krajl does not survive it), and NOT Rusha's father in the rusha1/rushaFund scenes (a different frontier, a different daughter, a different fate) — every Krajl the songs sing of is his own man.",
    folklore: ['halil-marriage'],
    location: { status: 'placed', node: 'mujo4' },
    tales: { 'halil-marriage': 'krajli' },
  },
  mbreteresha: {
    name: 'mbretëresha e Kotorës', glyph: '🐍', kind: 'human',
    role: "the queen of New Kotor, Tanusha's mother",
    backstory:
      "Wakes from a black-wolf nightmare and will not rest until she has seen her daughter; talks her way into the locked kulla with a mother's own tenderness and comes out the informer who dooms both lovers. The song itself calls her, the instant the mask drops, \"no mother… a dragua-slaying monster\" — whether that is only the old singers' way of naming a mother turned monstrously against her own child, or something stranger the song never explains, is kept exactly as ambiguous as it is sung.",
    folklore: ['halil-marriage'],
    location: { status: 'placed', node: 'mujo4' },
    tales: { 'halil-marriage': 'mbreteresha' },
  },
  oraDanubes: {
    name: 'ora e kufirit', glyph: '🌫️', kind: 'mythic',
    role: 'the mountain ora who watches the frontier crossing',
    backstory:
      'Has shadowed Halili unseen since the Green Valleys, "cherished like her own eyesight," and shows herself only once, at the foot of a cliff above the Danube, to name the river and point him across to the camp. NOT plakaPyllit (the cold old woman of the village\'s own night forest — the tales hold she MAY be an Ora, or may be a Shtriga, and no story has ever settled it) — this Ora keeps the frontier crossing alone, unnamed, and is never seen again once Halili is safely pointed on.',
    folklore: ['halil-marriage', 'ora'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'halil-marriage': 'ora' },
  },
  dhitZanat: {
    name: "tri dhitë e egra", glyph: '🐐', kind: 'collective',
    role: 'three wild goats of the high pastures who speak for the sun, the moon, and the zana',
    backstory:
      "Cliff-dwelling goats who share the high pastures with the zana and give voice, mid-journey, to the promise every kreshnik travels under: the sun watches by day, the moon by night, the zana keep the honour of his weapons. Their talking badly startles Halili before he understands what he is hearing. NOT zanatShkembit (mujo-strength's own pair of zana mothers at the cradle-cliff, met by Mujo himself on a different night for a different favour) — these are goats who merely keep zana company, not zana themselves, and never reappear once Halili rides on.",
    folklore: ['halil-marriage'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'halil-marriage': 'dhia' },
  },
  // agatJutbines — the Agas of Jutbina — is the shared canonical figure in core-kreshnik.js.
  jovani: {
    name: 'Jovani', glyph: '🤝', kind: 'human',
    role: 'the New Kotor man who stops for a stranger weeping in the street',
    backstory:
      "A local of New Kotor with no stake in the frontier's quarrel, who does the one thing none of Tanusha's own townsfolk dare under the Krajl's watchmen: stops, asks what has happened, and walks her to someone who can actually help. He does not know the way to Jutbina himself, but he knows who does — and that is enough.",
    folklore: ['halil-marriage'],
    location: { status: 'placed', node: 'mujo4' },
    tales: { 'halil-marriage': 'jovani' },
  },
  gruaJaKrahines: {
    name: 'gruaja e krahinës në Kotor', glyph: '🗝️', kind: 'human',
    role: 'an Albanian countrywoman settled in New Kotor, the last link in the chain to Mujo',
    backstory:
      "Keeps a newly built kulla at the edge of New Kotor — a woman of the krahina living inside the Krajl's own town — and is the one who finally gets word out: a hired, trusted rider sent through the night, reaching Mujo by morning. Without her, Tanusha's message never leaves Kotor at all, and Halili sings his last song for nothing.",
    folklore: ['halil-marriage'],
    location: { status: 'placed', node: 'mujo4' },
    tales: { 'halil-marriage': 'gruaja' },
  },
}
