// ===========================================================================
// NPC ROUTES — people who WALK the world on the clock, scene to scene, so the
// player can meet them (or miss them, or watch them from across the water).
//
// An NPC's position is DERIVED from the world clock (like the campfire's burn),
// never ticked or stored: route[floor(clock / stepHours) % route.length]. The
// clock drifts +1 hour per story choice, so an NPC with stepHours 2 moves half
// as fast as the player — you can catch up to someone you saw ahead of you.
// `time:` rest-jumps move them far (sleep until dawn and she is long gone).
//
// Fields:
//   route        — the walk, one node per step. EVERY consecutive pair (and the
//                  loop's wrap-around) must be a real story edge: NPCs walk the
//                  same roads the player does, never teleport. Enforced by
//                  scripts/mapaudit.mjs.
//   stepHours    — hours spent on each route node (default 2).
//   activePhases — time-of-day phases the NPC is out and about; any other hour
//                  they are offstage (home, asleep). Omit for always-on.
//   once         — instead of looping forever, the route runs ONCE, triggered
//                  by entering a node that carries `startsNpc: '<id>'`; the NPC
//                  is gone after the last step. Use sparingly (a procession,
//                  a funeral) — a looping NPC can never be missed for good,
//                  a one-shot can. Loop is the default.
//   name, glyph  — for the debug map and tooltips.
//
// PRESENCE IS A VIRTUAL ITEM, through the same has() machinery as time phases
// and the campfire:
//   npc:<id>            — the NPC stands where the player stands
//   npcAt:<id>:<node>   — the NPC is at that node (off-node visibility: "at
//                         the spring a woman draws water" seen from the river;
//                         accepts <a>|<b> alternatives)
// Both work in when()/unless() story lines and options' requires/unless.
// ===========================================================================

// THE TIMETABLE TRICK: when route.length × stepHours = 24, the modulo lands on
// the same route index at the same hour of EVERY day — a fixed daily schedule
// (the old man is in the square each morning, in the oda each evening, forever).
// Repeating a node in the route is dwell time; mapaudit skips same-node steps.

export const NPCS = {
  // The water-carrier: the dry well made her. Every daylight hour she walks
  // spring → river bank → up to the square with the full jugs, and back down
  // with the empty ones. At night she is home — "natën kroi është i qetë".
  gruaUji: {
    name: 'gruaja me ujë',
    glyph: '🏺',
    route: ['kroi1', 'fshatiLumi', 'fshatiSheshi', 'fshatiLumi'],
    stepHours: 2,
    activePhases: ['dawn', 'day', 'dusk'],
  },

  // The wedding train: krushqit ride out over the tanners' bridge and bring the
  // bride in on horseback — up through the river-quarter to the square, the long
  // feast at the wedding-house, then out again (an old dasma runs for days, and
  // the riding never stops). Seen from the river bank as they cross above you.
  krushqit: {
    name: 'krushqit me nusen',
    glyph: '🐎',
    route: ['start', 'fshatiLumi', 'fshatiSheshi', 'dasma1', 'dasma1', 'fshatiSheshi', 'fshatiLumi'],
    stepHours: 2,
    activePhases: ['dawn', 'day', 'dusk'],
  },

  // The cold old woman of the forest — the guest at the night fire (an Ora in
  // an old woman's shape, the tales hold; wait beside her too long and she may
  // prove a Shtriga instead). Her night, every night (8 × 3h timetable): at
  // nightfall she comes out of the deep wood to the road-end clearing and stays
  // through the evening — if a fire burns there the light draws her to sit, and
  // the guest arc opens (lendina gates it on npc: + fireLive). In the dead of
  // night she walks back into the dark trees.
  plakaPyllit: {
    name: 'plaka e ftohtë',
    glyph: '👵',
    route: ['pylliLoop', 'pylliLoop', 'pylliLoop', 'pylliLoop', 'pylliLoop', 'lendina', 'lendina', 'pylliLoop'],
    stepHours: 3,
    activePhases: ['night'],
  },

  // The Xhindët: the unseen ones keep to the dark hours — out of the dry well's
  // mouth, across the sleeping square, down the lanes and back. The village
  // never sees them; a night-walking stranger might.
  xhindet: {
    name: 'Xhindët',
    glyph: '👣',
    route: ['pusiThate', 'fshatiSheshi', 'fshatiLanes', 'fshatiSheshi'],
    stepHours: 2,
    activePhases: ['night'],
  },

  // The old man of the square keeps a fixed day (8 × 3h = 24h timetable):
  // mornings watching the dry well from the square, every evening in the oda
  // among the men — find him at the same place at the same hour, any day.
  plakuSheshit: {
    name: 'plaku i sheshit',
    glyph: '👴',
    route: ['fshatiSheshi', 'fshatiSheshi', 'fshatiSheshi', 'fshatiSheshi', 'oda1', 'oda1', 'oda1', 'oda1'],
    stepHours: 3,
  },

  // The shepherd's day (24h timetable + nights offstage): at the homes around
  // first light, out at the pasture with the goats through the working day
  // (his guard-the-flock wage lives there), home again at dusk.
  bari: {
    name: 'bariu me dhitë',
    glyph: '🐐',
    route: ['fshatiJeta', 'bariu', 'bariu', 'bariu', 'fshatiJeta', 'fshatiJeta', 'fshatiJeta', 'fshatiJeta'],
    stepHours: 3,
    activePhases: ['dawn', 'day', 'dusk'],
  },

  // The dordolec gang: the children roam between the square and the back lanes
  // with their rain-child game — help them wherever you catch them.
  femijet: {
    name: 'fëmijët me dordolecin',
    glyph: '🧒',
    route: ['fshatiSheshi', 'fshatiLanes'],
    stepHours: 2,
    activePhases: ['dawn', 'day', 'dusk'],
  },
}
