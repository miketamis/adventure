# World structure contract

This document defines what the game means by “the world map.” It is an
acceptance contract for story writing, map drawing, time, and folklore work;
the automated world audit checks the parts that can be checked mechanically.

## What the map represents

The playable world is a **mythic composite of Albanian places**, not a literal
road map of modern Albania. Its real locations and source regions remain named
in each tale's `origin` and place `mirror` records. The playable chart brings
those traditions into one continuous journey without pretending that Tomorr,
Gjirokastër, Prespa, Tirana, Rozafa, and Jutbina have their real-world distances
or relative bearings.

The chart has two stable narrative axes:

- left/right runs from the great forest toward the sea;
- up/down runs from sky and high mountain through the lived world into the
  world below.

“Up” and “down” therefore mean ascent and descent, not north and south. A
compass must not be placed on this chart. Cardinal claims belong only in tale
provenance or in a deliberately separate real-Albania reference map.

The map currently resolves 552 scenes to 199 authored physical places, but
those numbers do not define the public road network. They also include sealed
chambers, ending locations, and private tale projections. While the player is
embodying a character, “open-world access” means the exact 55 public physical
places represented by 56 safe travel nodes in `PUBLIC_FREE_ROAM_PLACES` and
`PUBLIC_FREE_ROAM_NODES`. Another role, an ending, a state-changing local act,
or a private scene at the same coordinate is not public merely because it is
drawn on the chart. The release audit independently derives this network from
the crossroads and requires every role to cover it exactly.

## One reconstructible topology

`NODE_AT` is the authoritative placement ledger. Every story scene resolves to
one physical place. An alias means that no journey occurred: the new scene is
another event in the same room, yard, road, or landmark. A distinct coordinate
means that the player changed place.

Every playable option must resolve to one of these transition classes:

1. **local** — another event at the same authored place (an exact alias, never
   merely a nearby coordinate);
2. **journey** — movement between two chart positions, with a chart direction,
   exact two-axis vector, distance band, and duration;
3. **realm** — a narrated threshold such as climbing into the sky or descending
   into the world below;
4. **wander** — deliberately uncertain travel whose uncertainty is part of the
   prose, with a recorded reason;
5. **scene shift** — a compressed narrative relocation, allowed only when the
   transition record explains it;
6. **projection** — entry into an embodied tale setting; its vector locates the
   setting on the chart but is explicitly not a walked road.

The game must show the route contract beside every place-changing choice.
Direction and distance bands orient the player; the exact forest/sea-road and
height/depth deltas make the placement unambiguous. A player accumulating those
vectors from any chosen origin must reproduce the debug map's relative layout.
Generated route guidance is part of the description, not hidden debug
information. `node scripts/worldreconstruct.mjs` performs that reconstruction
without reading absolute positions as its traversal source and prints the full
normalized chart.

Rivers, sea, vertical realms, and other barriers are topology, not decoration.
A route may cross a barrier only at a named crossing or by an explicitly
narrated mode of passage. No forest/village shortcut may silently bypass the
old bridge.

## Density and place identity

Density is counted by physical place and authored happening, not merely by the
number of scene objects. Several dialogue or consequence scenes may share a
place when a location card separates them into clear happenings. A large stack
without such a card is an error.

The audit reports both extremes:

- overloaded places that conceal too many unrelated events in one dot;
- regions or routes with too little local identity to feel inhabited.

The current content floor is seven scenes across at least three places in each
non-sky region. More than eight scenes at one physical place requires a
location card and a written reason that they truly occur at one site. This
keeps compact epilogues honest without padding them, and keeps long continuous
events such as an oda evening or a mill vigil readable without inventing false
geography.

Regional totals are supplemented by deterministic walking-scale checks:

- within an 80-unit radius, a neighborhood may contain at most ten places and
  32 scenes;
- a place more than 300 units from its nearest neighbor requires a location
  card with a spacing reason, and a gap over 400 units is an error;
- a nonterminal leaf route longer than 600 units requires the same explicit
  review;
- every place holding five or more scenes needs a complete location card that
  assigns every scene to exactly one named happening;
- an un-carded, nonterminal place needs at least ten distinct description
  tokens as a minimum identity signal;
- no region may hold more than 35% of all scenes, and the ratio between the
  richest and sparsest populated regions may not exceed 2.5 scenes-per-place.

These are chart-scale guardrails, not a proof of literary richness. Scene count
does not measure play time, and vocabulary count does not replace editorial
judgment. The reconstruction report publishes the thresholds, densest
neighborhoods, widest gaps, and regional ratios so changes are reviewable. A
remote destination supported by the tale should be documented; it must not be
filled with invented lore merely to improve a number.

An exception is never a bare allowlist entry. It records the place, reason, and
the invariant that keeps the exception honest. Adding scenes to a rich region
does not repair a thin region; new work should preferentially deepen the least
represented playable places.

## Time, weather, and lasting change

The living-world clock is continuous and never rewinds. An embodied character
tale also owns a second, explicit tale clock. While the player acts inside that
tale, one projected elapsed interval advances both clocks by exactly the same
amount. If the player steps onto the public roads, the tale clock, its arrival
context, conditional prose, fire state, and staged NPC positions wait at the
focus scene while the living-world clock, weather, routes, fire, and travelling
people continue. Resume restores that exact waiting scene; detour time is not
replayed or added a second time. On-course always means the current scene is the
recorded focus scene, never merely another node owned by the same tale.

Gates are evaluated against the clock that owns their scene and against the
interval in which the action occurs, so a night-only act cannot silently
complete after night has ended. Map and atlas consumers always receive the raw
living-world state; story prose and choices receive the projected tale state.
Save migration validates both clocks, the public return footing, the focus, and
the focus-bound arrival snapshot, repairing stale or forged combinations to a
safe public road or the tale's non-terminal entry.

A choice that advances at least one day, or waits for a named calendar
observance, must carry an authored `timePassage`. The choice commits once: the
owning clock, weather, NPC movement, fire age, and world effects all reach the
same projected arrival state. A tale passage also advances the living world by
that exact elapsed delta and displays both date ranges. Before the destination scene is exposed, a persisted
interstitial shows the departure and arrival dates, a short sequence of
source-backed intervening moments, and a linked source. Its cycling sky is a
compressed visual cue, never hundreds of simulated reducer turns. The current
interstitial segment is saved too, so a reload resumes the same intervening
moment instead of replaying the sequence. Save migration reconstructs passage
copy from the canonical route and rejects impossible clock or route pairings.

Narrative time and road time remain separate in player-facing language. Exact
source units stay exact; vague units stay vague. A phrase such as “several
months” may use a disclosed numeric convention inside the living calendar, but
the UI must not replace it with a falsely exact day count. Every timed segment
records whether it is source-exact, source-approximate, a simulation estimate,
map-derived travel, or a computed tale deadline; timed segments must sum to the
mechanical `durationHours`. Reduced-motion users receive the same sequence and
dates without animation.

Embodiment also has an explicit state boundary. The traveller's item pack and
health wait outside the role; the tale begins with only its authored threshold
grants and full role health, and a surviving closure restores the exact pack and
traveller health. Tale-local grants, costs, damage, and comprehension penalties
remain inside that role. Learned language (`discovered` and `mana`), places
heard of or visited, achievements, and lasting world facts are intentionally
player/world memory rather than bodily possessions, so they remain global.

From the absolute clock the game derives:

- hour and phase (dawn, day, dusk, night);
- day and season;
- deterministic weather appropriate to the region and season.

Descriptions of the horizon are live observations. What can be seen depends on
place, chart distance, phase, weather, and realm. A distant landmark hidden by
night, cloud, forest, mountain, or depth must not be described as plainly
visible. The same sightline can return as the weather and hour change. Only
registered visual observations are weather-gated: Albanian `larg` also means an
action or person is away, and weather must never erase those non-visual facts.

Major endings may change the persistent world. Restored water, ended drought,
defeated threats, and comparable outcomes are stored as world facts when the
ending is reached and survive the return to play. Ambient conditions and later
descriptions must read those facts; an ending is not allowed to claim a
permanent restoration that the world immediately forgets. Mutually exclusive
alternate endings may coexist in the achievement collection, but never as
simultaneous facts in the live world; the most recently completed resolution
replaces its incompatible alternative.

## Folklore fidelity

The tale record and the playable projection are deliberately separate:

- `beats` records the sourced tale in full;
- `play` identifies the playable entry, stance, scene-to-beat mapping, and
  ending;
- `divergences` records every meaningful adaptation;
- each place records its real-world `mirror`, even when the playable chart uses
  a composite location;
- every Albanian quotation is registered with its exact fidelity and its
  available local, external, related-variant, or oral evidence;
- a missing Albanian original is stated as missing and never reconstructed.

Mechanical coverage cannot prove semantic fidelity. The release gate therefore
combines exact line coverage, quotation verification, valid scene-to-beat links,
documented divergences, and hash-bound internal comparison records for each
playable arc and its beat board. Those records document the repository's current
editorial decision; they are not evidence of external expert review. “No known
contradiction” is the honest standard; certainty is not.

## Release gate

A normal integrity build completes with:

```text
npm run check
```

That command runs story integrity, deep coherence, map topology, route and
sightline structure, runtime time/outcome invariants, tale-beat coverage,
quotation proofs, and the production build.

A declared-scope release claim has a deliberately stronger gate:

```text
npm run certify
```

It reruns the full check, then reports all four strict gates even if one fails. Any
unresolved structural warning, source claim, geographic collision, or projection
decision fails. Reviewed negative space does not: a place may remain narrated
offstage or proposed, and a source beat may remain in the full timeline rather
than receive a dedicated choice, when an evidence-bearing disposition explains
why the playable route stays faithful. Hash-bound source reviews likewise allow
an exact non-Albanian selected witness, a declared synthesis, or documented
hash-bound OCR/transliteration collation records without pretending those are something
else. A failing certification command alongside a passing normal check means
the game is mechanically healthy but still has measured unresolved debt.

Warnings are never accepted by the strict gate. A documented exception becomes
an accepted disposition only when its target, evidence, scope and reason are
machine-validated; a new contradiction may not be hidden by broadening a
threshold or adding an unexplained id to an allowlist.
