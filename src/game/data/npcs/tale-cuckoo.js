// NPCs: the cuckoo origin-myth (cuckoo) cast — see ../npcs/_SCHEMA.md for the
// format contract. One file per area/tale so parallel agents never collide.

export default {
  // ── The Origin of the Cuckoo (von Hahn 104) — the tale's own figures ──────
  qyqjaMotra: {
    name: 'Qyqja, motra e Gjonëve', glyph: '🐦', kind: 'mythic',
    role: 'the sister whose scissors slipped — the cuckoo who asks «Ku? Ku?» by day',
    backstory: 'She sat so deep in her needlework that she never saw her brother step to her shoulder; the blades flew out mid-stroke and struck his heart. No one cursed her — grief alone changed her: all day the cuckoo asks the woods «Ku? Ku?» (where? where?), and the answer only ever comes by night, when she cannot fly to it, so brother and sister never once meet. Elbasan tells her other ending too: she became the blue lul\' e qyqes, and a woman who sings the flower the old charm may feel the little head lie down in her palms. Folk speech keeps her name for the bereft and utterly alone — «qyqe» — and Fishta\'s gloss holds: the qyqja mourns forever. NOT the swallow-sister (dallëndyshja), and none of the bee tale\'s cursed sisters — her mark is bereavement, not punishment.',
    folklore: ['cuckoo'],
    location: { status: 'placed', node: 'lendina' },
    tales: { cuckoo: 'qyqja' },
  },
  gjonZogu: {
    name: 'Gjoni, zogu i natës', glyph: '🦉', kind: 'mythic',
    role: 'the surviving brother — the little gjon-bird that cries the shared name at night',
    backstory: 'Two brothers in that house carried the one name, Gjon; the scissors took one of them. Grief made the survivor the small night-bird Albanians call gjoni, and every night since he calls the name — his brother\'s, which is also his own: «Gjon! Gjon!» His sister asks by day and he answers by night, so the two calls cross the same woods forever and never meet — the world\'s own clock (ditë/natë) is the wall between them. Distinct from every ill-omened night-caller of the forest: the gjon is no lugat\'s voice — it is the sound of a brother still being missed.',
    folklore: ['cuckoo'],
    location: { status: 'placed', node: 'pylli1' },
    tales: { cuckoo: 'gjoni' },
  },
  gjoniVrare: {
    name: 'Gjoni tjetër, i vrari', glyph: '🪦', kind: 'human',
    role: 'the other Gjon — the brother the flying scissors killed',
    backstory: 'He bore the same name as his brother and died of his sister\'s absorbed hands: he stepped up to her shoulder while she sewed, unseen, and the blades caught him square in the heart. The Elbasan telling knew only that he "was murdered — the circumstances not to be learned"; the Rica telling gave the death its scissors, and the flower-song remembers it bloodier still — «gjak në lugë, mish në kupë», slaughtered like an ox. He is the tale\'s absence: everyone left alive became a voice or a flower that does nothing but look for him.',
    folklore: ['cuckoo'],
    location: { status: 'planning', plan: 'dead before the transformations — lives only inside the telling at cuckoo1 (the back lane\'s own story)' },
    tales: { cuckoo: 'gjoniVrare' },
  },
  grateLendines: {
    name: 'gratë me lulen e qyqes', glyph: '🌼', kind: 'collective',
    role: 'the village women who sing the old charm to the cuckoo-flower',
    backstory: 'When one of them finds the blue lul\' e qyqes in the open grass she does not pick it: she kneels and sings it the charm — the flower\'s own name three times, then the terrible questions («Pe Gjonin, tyt vëlla…») — and holds out both flat palms, and the flower lays its little head on them of itself. A living rite of the fields, not a haunting: ordinary women keeping one old kindness toward a grieving sister. Distinct from the krushqit (a wedding procession on the road) and from any graveside mourner — their song comforts a flower, not a grave.',
    folklore: ['cuckoo'],
    location: { status: 'placed', node: 'lendina' },
    tales: { cuckoo: 'grate' },
  },
}
