// The full audit atlas augments the shared story geometry with source-era
// inventory. Keeping this adapter separate lets the live view defer the lore
// catalogue while both views retain the same source and placement builders.
import { buildWorldScene3dCore, validateWorldScene3dCore } from './worldScene3dCore.js'
import { buildWorldScene3dInventory, validateWorldScene3dInventory } from './worldScene3dInventory.js'
export {
  WORLD_SCENE_3D_VERSION, WORLD_SCENE_3D_COORDINATES, WORLD_SCENE_3D_ENVIRONMENT_CASES,
  departureElementId, worldScene3dLineConditions, worldScene3dApproachConditionConflicts,
} from './worldScene3dCore.js'

export function buildWorldScene3d() {
  return buildWorldScene3dCore(buildWorldScene3dInventory())
}

export function validateWorldScene3d(model) {
  return validateWorldScene3dCore(model, buildWorldScene3dInventory(),
    model && Array.isArray(model.elements) && Array.isArray(model.descriptions)
      ? validateWorldScene3dInventory(model) : [])
}
