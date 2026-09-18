# Auditing the world in 360°

In Debug → Map → Node scene renders, choose any story node. Drag the scene to look around from the player's position, or select the full 360° × 180° panorama. The camera can look upward and downward. External orbit inspection is labelled separately and Reset viewpoint returns to the player's eye.

Every authored story line has an exact reviewed record in `src/game/data/worldScene3dNodeClaims/`. The record pins its source node, line, Albanian text, visibility conditions, physical objects, quantities, states and relationships. Nonvisual, reported, historical and absent details receive explicit dispositions: a character recalling a castle does not place a castle in the room. Object selection links back to those same source records; selecting prose highlights the corresponding geometry.

Current-run views use the production story presentation contract. Authored previews use a minimal explicit condition assignment; Inspect this condition selects a source witness without changing the saved game. Alternatives remain visible in the source list. If a node has no baseline physical detail, a labelled representative source branch supplies its initial view.

The flat atlas supplies the horizontal world frame. Source-backed viewpoint refinements put the player above a tree, inside a well, at a window or below water. These refinements retain the atlas location and expose the exact source witness. Uncharted endings use a clearly labelled local frame; they never acquire invented world coordinates. Dimensions and unstated local spacing are illustrative, not canonical measurements. Representative plural counts are distinguished from authored exact quantities. The inspector reports physical attributes that change geometry separately from metadata.

Export 360° PNG saves the selected node. Render all nodes & export ZIP renders one full spherical panorama per authored node and includes contact sheets and an audit manifest with cameras, source conditions, objects, reciprocal links and limitations. The batch can be cancelled. Conditional alternatives can be rendered individually through their source witnesses.

`npm run check` reaches the node/source/renderer checks through `scripts/worldscene3daudit.mjs`. The checks enumerate the production story, validate every exact source and model, build every node and every source witness, test corruption rejection, exercise perspective/panorama geometry, and run browser export and debug-boundary checks. A render is evidence for comparison; it does not certify narrative truth merely because a mesh exists.
