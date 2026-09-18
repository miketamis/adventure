# Auditable 3D world map

The debug map includes a 3D view of the same physical places, story routes,
barriers and registered distant views used by the game. It is an authoring and
inspection surface. Full English readings, source identifiers and the map
remain outside ordinary play.

Open the debug map and select its 3D view. Drag to orbit, Shift-drag to pan,
or use the focused canvas's arrow keys, Shift-arrow keys and plus/minus keys.
The element selector offers the same inspection without pointer hit testing.
Select a structure to read its source lines, or search the description index
and choose **Show in 3D**. **Validate 3D mappings** runs the shared model
validator; **Export audit JSON** downloads the exact inspected scene contract.

## One model for drawing and checking

`src/game/worldScene3d.js` owns the scene model. The renderer consumes its
elements and routes; `scripts/worldscene3daudit.mjs` checks that same model
against the canonical story and world registries. Geometry must never become
a second authority for the player's location, route availability, inventory,
NPC presence or weather.

The horizontal coordinates preserve the existing mythic chart exactly:
scene X is chart X and scene Z is chart Y. Scene Y supplies illustrative relief.
It is not a surveyed altitude. Forestward/sea-roadward and highward/deepward
retain their existing chart meanings; this view does not introduce compass
directions or claim real Albanian geographic distances. Building shapes,
sizes, spacing within a place and terrain relief are schematic.

## Description-to-element links

Every authored `STORY[nodeId].text[lineIndex]` entry receives a description
record with its exact Albanian text, reviewed English reading, scene identity,
conditions and links to model elements. Conditional and alternate lines are
included even when they are not currently visible. Each linked element stores
the reciprocal description IDs, so an author can inspect either direction.
The source locator uses the compiled story entry, including installed
observation and portrait lines, rather than a fragile physical source-file line
number.

The overview hides conditional depictions. Selecting an exact conditional
element or its source description reveals that authored possibility. For
example, the dry river and restored water are separately inspectable and are
never shown together merely because their shared place is selected. This is
an atlas of authored possibilities, not a simulation of the current save.

The index also includes the canonical item catalogue blurbs and the generated
environment narration templates. Item symbols are explicitly unlocated:
their gallery position does not claim that the item is lying in that place.
Selecting an item or template opens an isolated reference view, with physical
places hidden; catalogue symbols never appear in the whole-world overview.
Generated narration is indexed as one template per time-of-day, season or
weather value, for both indoor/outdoor settings and opening/transition wording.
The runtime may combine these dimensions into one sentence. Its shared
narration policy still decides which dimensions have changed and whether to
say the sentence; the atlas does not invent a new narration schedule.

A **context** link locates the sentence in its canonical physical place. It
does not claim that every noun or assertion in that sentence has been modeled
as an object. This distinction matters for dialogue, remembered events,
internal thoughts and reported lore.

Stronger links identify authored structural features or consume explicit
world metadata: environment dimensions, observation reveals, fixtures and
registered sightlines. These records retain their source and relationship
type. A reviewed feature pins its exact witness text, required vocabulary
senses and source conditions, so a changed claim requires review of that
specific feature. The renderer and inspector must preserve the distinction between a
reviewed feature and a context-only line. A sentence being indexed is not
evidence that its physical meaning has been independently reviewed.

Routes retain their exact incoming choice identity and canonical endpoints.
Projection entries, local transitions and physical journeys remain distinct;
a line across the chart must not turn a tale projection into a walkable road.
Named barrier crossings and distant-view endpoints remain tied to their
canonical registries, with reverse links to supporting descriptions where
applicable.

## What validation establishes

Run the focused gate with:

```sh
node scripts/worldscene3daudit.mjs
```

It is also a required part of `npm run check`. The audit enumerates the
production story and verifies complete description coverage, exact source
content, valid scene and place identities, finite geometry, reciprocal
description links, exact route identities and endpoints, named crossing
coverage and registered sightline mappings. Mutation regressions deliberately
remove or corrupt these records and require the validator to reject them.
Failures identify the affected record; no manually renewed content hash or
blanket exception can make a mismatch pass.

These checks establish agreement between declared story/world contracts and
the actual model rendered in the 3D view. They do not establish that arbitrary
Albanian prose accurately describes a real building, that schematic meshes
have physically correct dimensions, or that an unregistered spatial claim is
true. Sightline checks use the game's shared visibility contract, not a
physical ray-tracing simulation. Existing causality, action-presupposition,
world, map, environment, observation and lore gates continue to supply their
own substantive checks.

## Editing the world

1. Change places and aliases in the canonical placement registry, routes in
   the story and their shared world contracts, and conditions in their owning
   registries.
2. Add or update the precise structural feature mapping when a description
   makes a claim represented by a modeled feature. Keep its rationale and
   source narrow; do not promote a context link to an asserted object merely
   to improve a coverage count.
3. Inspect both the description and its linked element in the 3D debug map.
   Check conditional alternatives and shared-place scenes as separate
   descriptions rather than assuming they are simultaneous.
4. Run the focused gate, the relevant existing story/world gates and the full
   release check. Geometry-only changes need visual inspection as well.

A new sentence automatically receives a context mapping so it can be found
and reviewed. That automatic mapping deliberately does not certify a new
object, spatial relation or literary claim. Extend the explicit feature
contract and its regression checks when the new claim should be validated.
