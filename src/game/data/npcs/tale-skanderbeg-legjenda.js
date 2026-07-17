// NPCs: the Skanderbeg-and-Ballaban legend cast — see ../npcs/_SCHEMA.md for
// the format contract. Skanderbeg has no core entry yet (this IS his story),
// so the whole cast lives here, tale-owned, never a walking/placed figure —
// the war is a chronicle told, not a map the player walks.

export default {
  skenderbeu: {
    name: 'Skënderbeu', glyph: '🗡️', kind: 'human',
    role: 'the national hero who held the Ottoman empire off for a quarter-century',
    backstory: 'Gjergj Kastrioti (1405–1468), sent as a boy hostage to the Sultan\'s court, raised Ottoman and renamed Skënderbeu ("Lord Alexander"), until he broke from the army at Niš in 1443, rode home, and took Krujë by a forged order. For twenty-five years he broke invasion after invasion — Murad\'s, then Mehmed\'s — until his death at Lezhë in 1468. The goat-candle ruse that lifts the siege of Krujë (already sung by the traveller at udhetaret → skender1 → skenderFund) is a DIFFERENT legend of the same man; this is the river-and-Ballaban battle, a separate episode of the same national war, not a retelling of it.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'never staged as a walking figure; the goat-candle Krujë vignette already speaks his name at udhetaret (skender1→skenderFund) — this tale\'s river battle stays off the map, a chronicle told, not walked' },
    tales: { 'skanderbeg-legjenda': 'skanderbeg' },
  },
  sulltanMurati: {
    name: 'Sulltan Murati II', glyph: '👑', kind: 'human',
    role: 'the elder Sultan, broken invasion after invasion',
    backstory: 'The Ottoman Sultan who sent army after army into Albania and lost every one to Skanderbeg; he died lamenting that he had conquered Bulgaria, Serbia, Greece and the wide plains beyond the Danube, yet never little Albania. Dead before this tale\'s battle begins — his son Mehmed inherits both the throne and the grudge.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'never staged; reigns and dies entirely offstage, in the empire\'s own house' },
    tales: { 'skanderbeg-legjenda': 'murati' },
  },
  sulltanMehmeti: {
    name: 'Sulltan Mehmeti II', glyph: '☪️', kind: 'human',
    role: 'the Conqueror of Constantinople, crueler than his father',
    backstory: 'Murad\'s son and heir, who took Constantinople in 1453 and styled himself "the Conqueror" before turning his huge new army on Albania as his dying father had begged him to. He buys Ballaban\'s betrayal with gold and a pashalik, watches the battle from his hilltop tent, and flees in panic the moment Skanderbeg\'s reinforcements arrive.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'never staged; his camp is the offstage hilltop tent across the river from Skanderbeg\'s' },
    tales: { 'skanderbeg-legjenda': 'mehmeti' },
  },
  ballabani: {
    name: 'Ballaban Badheri', glyph: '🐕', kind: 'human',
    role: 'the Albanian turncoat pasha who wagers his head on bringing Skanderbeg\'s',
    backstory: 'An Albanian-born warrior who renounced his own blood to fight for the Ottomans, was first to plant the crescent flag on Constantinople\'s walls, and was made a pasha for it. He alone steps forward to hunt Skanderbeg for nine hundred thousand ducats of gold and a pashalik over Albania — is wounded, disarmed, marked with a cut ear and sent home in disgrace, then beheaded by his own Sultan for failing.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'never staged; rides with the Ottoman host to the offstage river, dies at the offstage hilltop tent' },
    tales: { 'skanderbeg-legjenda': 'ballaban' },
  },
  lajmetariTurk: {
    name: 'lajmëtari i sulltanit', glyph: '🏳️', kind: 'human',
    role: 'the herald who carries the parley out and the report back',
    backstory: 'One of the Sultan\'s many riders, sent under a white flag to ask Skanderbeg where he will give battle, and sent back with a truthful account of the Albanians\' sword-dance and their fearless chieftain — an account that only enrages Mehmed further. A single-scene messenger, not to be confused with any other tale\'s herald.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'rides the offstage road between the river camp and the hilltop tent; never a fixed figure' },
    tales: { 'skanderbeg-legjenda': 'lajmetari' },
  },
  malesoretVeriut: {
    name: 'malësorët e Dukagjinit e Livetës', glyph: '⛰️', kind: 'collective',
    role: 'the two thousand highlanders who break the encirclement',
    backstory: 'Two thousand mountaineers dressed all in white, led down at the battle\'s worst moment by Dukagjin and Liveta — likely kin of the same Dukagjini lineage the Kanun bears (Lekë Dukagjini, a real ally of Skanderbeg, later credited with codifying the highland law already quoted at the oda\'s threshold). They arrive like a "white avalanche," guard Skanderbeg\'s back, and turn the field.',
    folklore: ['skanderbeg-legjenda', 'kanuni'],
    location: { status: 'planning', plan: 'muster offstage in the highlands, descend to the offstage river for the battle\'s climax only' },
    tales: { 'skanderbeg-legjenda': 'malesoret' },
  },
  ushtriaSkenderbeut: {
    name: 'ushtria e Skënderbeut', glyph: '⚔️', kind: 'collective',
    role: 'his small, hopelessly outnumbered band',
    backstory: 'The handful who camp with Skanderbeg by the river, feast as if at a wedding rather than dread the coming battle, hold the ford against the whole Ottoman host, and dance the sword-dance the herald reports back to Mehmed word for word.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'camped at the offstage river through the whole tale' },
    tales: { 'skanderbeg-legjenda': 'ushtriaShqiptare' },
  },
  ushtriaOsmane: {
    name: 'ushtria e madhe osmane', glyph: '🏹', kind: 'collective',
    role: 'the Sultan\'s vast host — janissaries, Tatar archers, shield-bearers',
    backstory: 'The empire\'s full weight, sent against Albania invasion after invasion under Murad and then Mehmed: the nine trumpets of the Janissary ortë, the Tatar archers who black out the sky with arrows, the shield-bearers who tremble at Skanderbeg\'s name and let Ballaban alone step forward. Broken every single time it comes.',
    folklore: ['skanderbeg-legjenda'],
    location: { status: 'planning', plan: 'marches from the offstage empire to the offstage hilltop, breaks at the offstage river, every time' },
    tales: { 'skanderbeg-legjenda': 'ushtriaOsmane' },
  },
}
