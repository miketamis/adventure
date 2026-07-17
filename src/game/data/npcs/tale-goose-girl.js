// NPCs: the goose-girl tale (goose-girl) NEW cast — see ../npcs/_SCHEMA.md for
// the format contract. One file per area/tale so parallel agents never collide.
// The maiden (vajzaDiellit) and the queen (mbretereshaZeze) belong to the
// maiden-promised-sun cast file, and the marble king (mbretiMermer) is CORE
// (core-world.js) — all three are linked from the tale's cast, not duplicated.

export default {
  // ── the goose-girl tale (goose-girl) — its own figures ────────────────────
  cupatMehalles: {
    name: 'çupat e mëhallës', glyph: '👭', kind: 'collective',
    role: 'the quarter\'s girls — the maiden\'s playmates',
    backstory: 'They heard the queen\'s daughter was home from the Sun\'s house and borrowed her from her mother within days («lë-na çupënë t\'a gëzojmë këtu e atje»). They led her to the locked garden, shoved its great door in a pack for nothing, watched it open for her alone and shut on her heels, and carried the kshu-kshu of it home heartsick. NOT the dordolec gang (femijet — the rain-game children who roam square and lanes): these are the palace lane\'s girls, and this one errand is their whole story.',
    folklore: ['goose-girl'],
    location: { status: 'placed', node: 'kopshtMermer1' },
    tales: { 'goose-girl': 'girls' },
  },
  njerezitMermerte: {
    name: 'njerëzit e mermertë', glyph: '🗿', kind: 'collective',
    role: 'the marble court — people and beasts frozen around their king',
    backstory: 'A whole court struck to something like marble, mid-gesture, around a king whose open scroll names the price of waking. The scroll promises only the king\'s own return («se to të ngjallem») and the telling never says the court woke with him — the game\'s garden keeps them stone, the almost-living. Distinct from Shpirag, the petrified rival of a finished war: these are not punished, only stopped, and their king at least has been woken.',
    folklore: ['goose-girl'],
    location: { status: 'placed', node: 'kopshtMermer2' },
    tales: { 'goose-girl': 'marbleFolk' },
  },
  shitesiHysmeqarkave: {
    name: 'shitësi i hysmeqarkave', glyph: '🧳', kind: 'human',
    role: 'the passing seller of maidservants',
    backstory: 'A trader who walks the lanes with people for wares and no fixed price — «sa të duash», whatever you care to give. One shovelful of gold thrown from a garden window bought a servant off his string, and he walked on out of the story without ever learning what he had sold her into. NOT the pazar\'s tregtari (bread, salt and fair prices at a standing stall): this one\'s stock walks behind him, and his stall is wherever he is hailed.',
    folklore: ['goose-girl'],
    location: { status: 'planning', plan: 'no standing spot — he passes below the garden window on the palace lane (fshatiLanes; the built mermerZgjim moment stages his one appearance) and moves on down the trading roads' },
    tales: { 'goose-girl': 'seller' },
  },
  hysmeqarka: {
    name: 'hysmeqarka', glyph: '👗', kind: 'human',
    role: 'the bought servant who stole the vigil\'s wage',
    backstory: 'Sold up a garden wall on a rope for a shovelful of gold, she was handed the last watch and the whole truth of the scroll — including what waking was worth. She kept the watch well enough, but stripped the sleeper\'s clothes, met the waking king in them, claimed the three weeks as her own, and was queen until a goose-girl\'s counted woes reached his ear. He had her killed and cut to pieces, the biggest piece this big («e bëri copëra, m\'e madhja copë ish kaqë»; Dozon\'s variant: «cingra mingra»). The tale\'s one liar, and its one death.',
    folklore: ['goose-girl'],
    location: { status: 'planning', plan: 'dead at the tale\'s end — her scenes live inside the built Act II (mermerZgjim → mermerTradheti → mbretiDrejtesi); no standing map spot' },
    tales: { 'goose-girl': 'servant' },
  },
}
