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

The export includes crossing-spanning features with `placeIds`, mesh rotation,
explicit physical relationships and provenance for descriptions seen from
another place. A crossing has no single `placeId`.

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

The default **Complete world survey** includes every charted element and every
region, including conditional fixtures, actors, observations, item actions and
source-tale references. Dashed translucent markers and possibility labels
separate alternative states from permanent landmarks. Layer controls and
region filters narrow the display explicitly. **Inspect one possibility** and
**Show in 3D** retain exact source-driven inspection, including mutually
exclusive dry/restored water states.

**Find anything in the world** searches the complete element inventory, even
when the canvas is filtered. The **Unlocated reference gallery** contains all
portable catalogue symbols and unknown, proposed or offstage references.
Its grid is display layout only; it never supplies canonical world coordinates.
Same-place actions are shown as counts on place labels and as exact choices in
the inspector, since coincident route endpoints do not make a visible line.

The inventory joins every public NPC registry entry, runtime route stop,
first-encounter portrait, portable item/companion, exact item action, source-tale
place, cast role and object. Registry plans and missing anchors remain visibly
unlocated. Source-tale locations retain their source timeline and do not become
claims that a historical event is currently happening. Item blurbs link to both
the portable reference and every evidenced action location.

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

Mentioning an NPC's name is not proof that the NPC stands at the observer's
location. Actor markers require explicit registry, runtime-route, portrait-location or
positive-presence evidence. They indicate possible encounters; absence and
identity-only story descriptions never establish present occupancy. Places shared by scenes in different narrative regions
retain those memberships without acquiring a second physical location.

A feature seen from another place records the exact source-to-landmark route.
The village well, hillside church and coastal village are built at their
canonical destinations. A bridge uses one mesh spanning the registered shores,
with its length, midpoint and rotation derived from that crossing. Source lines
from either shore link to the same bridge. Local relationship contracts check
that the inn bed is inside the inn, the well shaft descends below ground, and
the river lies below the bridge. When inspecting the bed its enclosing building
is translucent; below-ground inspection is labelled as a schematic cutaway.

Routes retain their exact incoming choice identity and canonical endpoints.
Projection entries, local transitions and physical journeys remain distinct;
a line across the chart must not turn a tale projection into a walkable road.
Named barrier crossings and distant-view endpoints remain tied to their
canonical registries, with reverse links to supporting descriptions where
applicable.

Each canonical physical place has an exact depiction profile. Reviewed local
features retain quotation, senses, conditions and schematic geometry. A nearby
view of the same landmark links to that one feature rather than duplicating it.
Where the prose supplies no fixed visible feature, a narrow source-limited
record explains why; the place, route and descriptions remain in the map.
Unknown departure endpoints retain their canonical departure provenance instead
of acquiring invented terrain.

## What validation establishes

Run the focused gate with:

```sh
node scripts/worldscene3daudit.mjs
```

It is also a required part of `npm run check`. The audit enumerates the
production story and verifies complete description coverage, exact source
content, valid scene and place identities, finite geometry, reciprocal
description links, exact route identities and endpoints, named crossing
coverage and registered sightline mappings. It also independently enumerates
the complete people/item/tale inventory, verifies every exact source field and
location disposition, checks each physical-place profile, and compares shared
registry import manifests to their actual source directories. The renderer is
exercised to prove every world/reference element reaches its draw and picking
path. Source-only references cannot be promoted to physical locations. Mutation regressions deliberately
remove or corrupt these records and require the validator to reject them.
Spatial checks evaluate the actual dimensions and transformed bridge vertices,
not just whether the model copied a declared blueprint. Context-only links do
not highlight a whole region as if the sentence had asserted its geometry.
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
