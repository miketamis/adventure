// NPCs: the Bear and the Dervish (bear-dervish) cast — see ../npcs/_SCHEMA.md
// for the format contract. One file per area/tale so parallel agents never
// collide. The shepherd is NOT here: the tale reuses the core village shepherd
// (bari, core-village.js) via the tale file's cast[].npc link — one pasture,
// one flock, one shepherd.

export default {
  // ── The Bear and the Dervish (bear-dervish) ───────────────────────────────
  dervishi: {
    name: 'dervishi', glyph: '🧙', kind: 'human',
    role: 'the weak little dervish of the wood\'s edge, who kills by wit',
    backstory: 'A wandering holy man with no strength at all — every deed of his a bluff: he ground palmed curd as "stone", roped a forest he never meant to pull, pondered carrying off a spring cliff-and-all, took axe-blows for fleabites (warned by the bear\'s own sister), and boiled the sheep-thief in the milk it fetched itself. Afterwards he sold a wolf for a shepherd, pocketed a robber-band\'s every hise, and one cry from his hut brought the whole village down on his hunters. The game\'s forest-edge staging (arushe1…arusheFund) is his tale mid-play. NOT a kreshnik and no saint of the teqe by the church — the parish priest met him as a stranger.',
    folklore: ['bear-dervish'],
    location: { status: 'placed', node: 'arushe1' },
    tales: { 'bear-dervish': 'dervish' },
  },
  arusha: {
    name: 'arusha', glyph: '🐻', kind: 'creature',
    role: 'the sheep-stealing bear of the forest edge — strong, credulous, treacherous',
    backstory: 'Five or six dhen a day it lifted from the village flock, until a dervish crushed a "stone" to flour before its eyes. It swore vëllamë, hauled the ox, the branches and the water-skin, begged off the wrestle it asked for — then whetted an axe against its own sworn guest, and ended shoved into the boiling milk-cauldron of its own house. The staged bet at the wood\'s edge (arushe1…arusheFund) plays its whole fall. A beast of the beast-tale register: it keeps a house, a mother and a sister, and is kin to no bear of any other lore.',
    folklore: ['bear-dervish'],
    location: { status: 'placed', node: 'arushe1' },
    tales: { 'bear-dervish': 'bear' },
  },
  nenaAriut: {
    name: 'nëna e ariut', glyph: '🐾', kind: 'creature',
    role: 'the bear\'s mother, at the den-house hearth',
    backstory: 'She keeps the den-house of the wood: the sufra, the hearth, the corner where the axe hangs. Told to whet it for the guest, she whetted it and asked nothing. The tale leaves her alive at a cold hearth beside her son\'s cauldron. Distinct from her daughter — the mother obeys; the daughter warns.',
    folklore: ['bear-dervish'],
    location: { status: 'planning', plan: 'the bear\'s den-house at the arusheNate staging, when its interior is drawn' },
    tales: { 'bear-dervish': 'bearMother' },
  },
  motraAriut: {
    name: 'motra e ariut', glyph: '🌿', kind: 'creature',
    role: 'the bear\'s sister — the one mercy in the den-house',
    backstory: 'Set to whetting the axe with her mother, she heard what it was for, went herself to the guest and told him "kështu dhe kështu" — the tale\'s single act of grace, and the reason the blows found an empty bed. Why she chose the stranger over her brother, the teller never says. Distinct from her mother, who whetted and kept silent.',
    folklore: ['bear-dervish'],
    location: { status: 'planning', plan: 'the bear\'s den-house at the arusheNate staging, when its interior is drawn' },
    tales: { 'bear-dervish': 'bearSister' },
  },
  ujkuGrykes: {
    name: 'ujku i grykës', glyph: '🐺', kind: 'creature',
    role: 'the den-wolf of the deep wood\'s defile, once sold as a shepherd',
    backstory: 'He snatched a sleeping traveller\'s kid from the wolves\' defile — and came out of his den into a pair of hung trousers. Trussed and sold to a priest as "a very good shepherd, no wages beyond his food", he ate the parish pen bare in one night and was gone by light, back to the gorge fed for a week. Of the devouring kind the creation myth explains; NOT ujku Nikollë the honey-partner (kuma-lisa), NOT the belly-riding road-wolf (half-rooster), and whether he is the hungry prowler of the deep forest (the shokuUjk arc) no tale has settled.',
    folklore: ['bear-dervish', 'wolf'],
    location: { status: 'planning', plan: 'the proposed den-gorge off the deep forest (nearest spot today: pylliThelle)' },
    tales: { 'bear-dervish': 'wolf' },
  },
  prifti: {
    name: 'prifti i kishës', glyph: '✝️', kind: 'human',
    role: 'the parish priest at the church door above the village',
    backstory: 'The blessing-priest of the game\'s own church — «një prift rri te derë. prifti jep një bekim.» The tale adds his worst week: coming out of Sunday service he bought a shepherd carried in a pair of trousers, opened his shutters on a bare pen, slung a rifle, marched a posse of untied thieves to a hut at the wood\'s edge — and was thrashed by his own village for storming its dervish. He blesses at the door still; «bekim është një» survives him. No part of the Kostandini legend whose stone stands below his church.',
    folklore: ['bear-dervish'],
    location: { status: 'placed', node: 'kisha1' },
    tales: { 'bear-dervish': 'priest' },
  },
  hajdutet: {
    name: 'hajdutët e udhës', glyph: '🪙', kind: 'collective',
    role: 'the road-thieves who could not divide their own loot',
    backstory: 'They stole a purse of paratë and deadlocked over the shares — so they handed the split to a passing holy man, "si dervishi që qe". Tied to the lis-trunk at the roadside, they watched every hise go into one xhep; untied into the priest\'s posse, they were beaten a second time at the hunt\'s end. Ordinary road-robbers of the comic register — no kin to any army, posse or band of the hero-songs.',
    folklore: ['bear-dervish'],
    location: { status: 'planning', plan: 'the roadside lis on the tanners\'-bridge road (start), where the tying is to be staged' },
    tales: { 'bear-dervish': 'thieves' },
  },
  fshataretDervishit: {
    name: 'fshati i dervishit', glyph: '🏘️', kind: 'collective',
    role: 'the village that comes when the dervish calls',
    backstory: 'The lanes and square below the church — the people whose flock the dervish freed of the bear. When a rifle-swinging posse fell on his hut at the wood\'s edge, one cry emptied the square: they seized priest and thieves alike and thrashed them, asking after right and wrong no earlier than the tale does. Distinct from the children (femijet) and the wedding train (krushqit) — this is the village as one body, staged only at the finale\'s rush.',
    folklore: ['bear-dervish'],
    location: { status: 'planning', plan: 'the village-life quarter (fshatiSheshi); staged only at the finale rush to the wood\'s edge' },
    tales: { 'bear-dervish': 'villagers' },
  },
}
