import assert from 'node:assert/strict'
import { buildWorldNodeScene as buildScene } from '../../src/game/worldScene3dNodes.js'
import { buildAssetParts } from '../../src/game/worldScene3dAssets.js'
import { compileWorldNodeGeometry } from '../../src/components/worldScene3dNodeRenderer.js'
import { newRun } from '../../src/game/gameState.js'

const object = (scene, key) => scene.objects.find((entry) => entry.key === key)
const xzDistance = (a, b) => Math.hypot(a[0] - b[0], a[2] - b[2])
const relativeXZ = (subject, target) => {
  const dx = subject.position[0] - target.position[0], dz = subject.position[2] - target.position[2], angle = target.rotationY
  return [Math.cos(angle) * dx - Math.sin(angle) * dz, Math.sin(angle) * dx + Math.cos(angle) * dz]
}
const requiredObject = (scene, key) => {
  const result = object(scene, key)
  assert.ok(result, `${scene.nodeId}: source-established ${key} is missing`)
  return result
}
// Exact visible-encounter regressions below need an unobstructed body sample,
// not merely an object carrying an "inside" relation. Other scenes legitimately
// describe somebody behind a door and are not assigned this requirement.
const visibleBodySample = (scene, target) => {
  const subtract = (a, b) => a.map((value, axis) => value - b[axis])
  const dot = (a, b) => a.reduce((sum, value, axis) => sum + value * b[axis], 0)
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const structures = new Set(['house', 'hut', 'palace', 'interior', 'tower', 'mill', 'church', 'mosque', 'fortress', 'castle', 'cave', 'mountain', 'cliff', 'wall', 'rock', 'stone', 'teqe', 'village'])
  const triangles = compileWorldNodeGeometry({ objects: scene.objects.filter((entry) => structures.has(entry.asset) && entry.id !== target.id) }).faces
    .flatMap(({ vertices }) => vertices.slice(1, -1).map((vertex, index) => [vertices[0], vertex, vertices[index + 2]]))
  const blocks = (point, [a, b, c]) => {
    const direction = subtract(point, scene.camera.eye), first = subtract(b, a), second = subtract(c, a), p = cross(direction, second), determinant = dot(first, p)
    if (Math.abs(determinant) < 1e-9) return false
    const origin = subtract(scene.camera.eye, a), u = dot(origin, p) / determinant
    if (u < 0 || u > 1) return false
    const q = cross(origin, first), v = dot(direction, q) / determinant, distance = dot(second, q) / determinant
    return v >= 0 && u + v <= 1 && distance > 1e-4 && distance < .999
  }
  return compileWorldNodeGeometry({ objects: [target] }).faces.filter(({ partId }) => /head|torso|body/.test(partId)).some(({ vertices }) => {
    const sample = vertices[0].map((_, axis) => vertices.reduce((sum, vertex) => sum + vertex[axis], 0) / vertices.length)
    return triangles.every((triangle) => !blocks(sample, triangle))
  })
}

export function runWorldSceneSourceSemanticsAssertions() {
  const checkedScenes = new Set(), checkedNodes = new Set(), checkedRelations = new Set()
  let physicalChecks = 0
  const buildWorldNodeScene = (nodeId, options = {}) => {
    const scene = buildScene(nodeId, options)
    checkedNodes.add(nodeId)
    checkedScenes.add(JSON.stringify([nodeId, scene.mode, options.selectedDescriptionId || null, options.state?.worldFacts || null]))
    return scene
  }
  const relationship = (scene, subject, kind, target) => {
    checkedRelations.add(JSON.stringify([scene.nodeId, subject, kind, target]))
    return scene.relations.find((entry) => entry.subject === subject && entry.kind === kind && entry.target === target)
  }
  const assertPhysical = (condition, message) => {
    physicalChecks++
    assert.ok(condition, message)
  }

  // These checks assess the resulting physical moment, including competing
  // earlier lines, rather than only counting source links on authored records.
  const blueEye = buildWorldNodeScene('udhaSyri')
  assert.equal(object(blueEye, 'blue-eye-donkey'), undefined, 'Consumed donkey must not survive beside the dead serpent')
  assert.equal(object(blueEye, 'blue-eye-bait-fire'), undefined, 'Consumed donkey must not leave its separate carried fire floating in the air')
  assert.equal(requiredObject(blueEye, 'blue-eye-serpent').attributes.dead, true)
  assertPhysical(object(blueEye, 'blue-eye-spring'), 'Serpent outcome must retain the new spring')

  const dayRite = buildWorldNodeScene('dordolec1')
  assert.equal(requiredObject(dayRite, 'actor:rain-child').asset, 'human')
  assert.equal(requiredObject(dayRite, 'item:house-scarecrow').asset, 'scarecrow')
  const nightRite = buildWorldNodeScene('dordolec1', { selectedDescriptionId: 'description:dordolec1:3' })
  assert.equal(object(nightRite, 'actor:rain-child'), undefined, 'Night-time child absence must remain visible in the model')
  assert.equal(object(nightRite, 'group:rain-children'), undefined)
  assert.equal(requiredObject(nightRite, 'item:house-scarecrow').asset, 'scarecrow', 'The house effigy is not the absent child')

  for (const [nodeId, key, duplicate] of [
    ['plaka', 'feature:place-plaka-house', 'place:plaka:room'],
    ['kulle1', 'feature:place-kulle1-tower', 'place:kulle1:room'],
    ['uraNata', 'place:uraNata:room', 'place:uraNata:house'],
  ]) {
    const scene = buildWorldNodeScene(nodeId)
    const enclosing = requiredObject(scene, key)
    assertPhysical(xzDistance(enclosing.position, scene.camera.eye) < .01, `${nodeId}: enclosing structure must surround the actual eye, not stand ahead as an exterior`)
    assert.equal(object(scene, duplicate), undefined, `${nodeId}: overlapping duplicate enclosure must not return`)
    assert.equal(relationship(scene, 'viewer', 'inside', key)?.geometryStatus, 'modeled', `${nodeId}: source places the viewer inside the actual enclosure`)
  }

  const touchedBoulder = buildWorldNodeScene('katallanGur')
  const boulder = requiredObject(touchedBoulder, 'katallan-door-stone')
  assert.equal(boulder.attributes.blocksEntrance, true)
  assert.equal(relationship(touchedBoulder, boulder.key, 'at-entrance', 'katallan-cave')?.geometryStatus, 'modeled', 'Examining the immovable boulder must not move it away from the entrance')
  const boulderLocal = relativeXZ(boulder, requiredObject(touchedBoulder, 'katallan-cave'))
  assertPhysical(Math.abs(boulderLocal[0]) < .1 && boulderLocal[1] > 6, 'Immovable boulder must span the established cave entrance behind the viewer')
  const releasedMan = buildWorldNodeScene('kulleFal')
  assert.equal(relationship(releasedMan, 'actor:tower-man', 'outside', 'feature:place-kulle1-tower')?.geometryStatus, 'modeled', 'Reconciled man must actually leave the refuge')

  const departure = relativeXZ(requiredObject(releasedMan, 'actor:tower-man'), requiredObject(releasedMan, 'feature:place-kulle1-tower'))
  assertPhysical(departure[1] < -7, 'Reconciled man must be beyond the tower entrance, not inside an inherited room')

  const proof = buildWorldNodeScene('binoshetZjarri')
  const separating = relationship(proof, 'twins-separating-sword', 'between', 'actor:handa')
  assert.equal(separating?.secondTarget, 'actor:bardhakuqja', 'Between requires both source-established people')
  assert.equal(separating?.geometryStatus, 'modeled')
  const sword = requiredObject(proof, 'twins-separating-sword'), handa = requiredObject(proof, 'actor:handa'), bardhakuqja = requiredObject(proof, 'actor:bardhakuqja')
  const midpoint = handa.position.map((value, axis) => (value + bardhakuqja.position[axis]) / 2)
  assertPhysical(xzDistance(sword.position, midpoint) < .01, 'Separating sword must remain between both people after all actor movement is applied')

  const rockMilk = buildWorldNodeScene('argjiroFund')
  const milk = requiredObject(rockMilk, 'argjiro-milk')
  assert.equal(milk.asset, 'milk', 'Milk from the rock must not become generic landscape water')
  const milkParts = buildAssetParts(milk.asset, milk.attributes)
  // This variant uses axis-aligned streak/drop pieces; measure those actual
  // pieces rather than the conservative spherical staging envelope.
  const milkMin = [0, 1, 2].map((axis) => Math.min(...milkParts.map((part) => part.position[axis] - part.size[axis] / 2)))
  const milkMax = [0, 1, 2].map((axis) => Math.max(...milkParts.map((part) => part.position[axis] + part.size[axis] / 2)))
  assertPhysical(milkMax[0] - milkMin[0] < 1 && milkMax[2] - milkMin[2] < .3, 'Rock milk must be a localized flow, not a lake')
  assert.equal(relationship(rockMilk, 'argjiro-milk', 'emitted-by', 'argjiro-rock')?.geometryStatus, 'modeled')
  const milkSource = requiredObject(rockMilk, 'argjiro-rock')
  assertPhysical(xzDistance(milk.position, milkSource.position) < 1, 'Milk flow must remain attached to its source rock')
  const cauldron = buildWorldNodeScene('arusheNate')
  assert.equal(relationship(cauldron, 'fixture:bear-milk', 'inside', 'fixture:bear-cauldron')?.geometryStatus, 'modeled')
  const containedMilk = requiredObject(cauldron, 'fixture:bear-milk'), vessel = requiredObject(cauldron, 'fixture:bear-cauldron')
  assertPhysical(xzDistance(containedMilk.position, vessel.position) < .05, 'Milk surface must fill the same cauldron, not sit beside it')
  assert.equal(buildAssetParts(containedMilk.asset, containedMilk.attributes).some((part) => /cup|handle/.test(part.id)), false, 'Milk in a cauldron must not introduce an unstated second cup')
  const bridgeConversation = buildWorldNodeScene('bisedaUra1')
  assert.equal(requiredObject(bridgeConversation, 'feature:village-bridge').asset, 'bridge')
  assert.equal(requiredObject(bridgeConversation, 'world:central-river').asset, 'river', 'Dialogue at the bridge must retain the river below it')
  for (const nodeId of ['lumi', 'bolla1', 'bolla2', 'bollaFund']) {
    const scene = buildWorldNodeScene(nodeId)
    assert.equal(requiredObject(scene, 'river:main').attributes.dry, true, `${nodeId}: an unqualified river mention must not restore the dry river`)
  }
  const restored = buildWorldNodeScene('lumi', { selectedDescriptionId: 'description:lumi:2' })
  assert.equal(requiredObject(restored, 'river:main').attributes.dry, false)
  for (const riverRestored of [false, true]) {
    const state = { ...newRun(), nodeId: 'zana1', worldFacts: riverRestored ? { riverRestored: true } : {} }
    const guardian = buildWorldNodeScene('zana1', { state })
    assert.equal(requiredObject(guardian, 'river:main').attributes.dry, !riverRestored, 'The Zana guarding water must preserve the actual live river state')
    assert.equal(guardian.objects.filter((entry) => entry.key === 'zana-goats').length, 3, 'Both live river states retain the three source-established goats')
  }
  const restoredRoad = buildWorldNodeScene('udhaThate', { selectedDescriptionId: 'description:udhaThate:4' })
  assert.equal(requiredObject(restoredRoad, 'place:udhaThate:riverbed').attributes.dry, false)
  assert.equal(object(restoredRoad, 'place:udhaThate:water'), undefined, 'Restoration changes the existing channel rather than adding a second body of water')
  const hospitality = buildWorldNodeScene('breshka1')
  const home = requiredObject(hospitality, 'place:breshka1:house'), door = requiredObject(hospitality, 'place:breshka1:door')
  assert.equal(object(hospitality, 'place:breshka1:room'), undefined, 'Entering the warm house must not create a second independent room')
  assertPhysical(xzDistance(home.position, hospitality.camera.eye) < .01, 'The ongoing indoor scene must surround the viewer with the actual house')
  assert.equal(relationship(hospitality, 'viewer', 'inside', home.key)?.geometryStatus, 'modeled')
  const transformed = buildWorldNodeScene('breshkaFund')
  const carriedHouse = requiredObject(transformed, home.key), carriedDoor = requiredObject(transformed, door.key)
  assert.equal(relationship(transformed, 'viewer', 'inside', home.key), undefined, 'House above the transformed player overrides the former indoor viewpoint')
  assert.equal(relationship(transformed, 'actor:tortoise-house-guest', 'outside', home.key), undefined, 'A moving house must not drag the guest along through stale occupancy')
  const facing = transformed.camera.target.map((value, axis) => value - transformed.camera.eye[axis])
  const carriedDirection = carriedHouse.position.map((value, axis) => value - transformed.camera.eye[axis])
  assertPhysical(carriedDirection[0] * facing[0] + carriedDirection[2] * facing[2] < 0, 'The transformed house must ride behind the tortoise viewpoint on its back')
  assertPhysical(carriedHouse.scale[0] * 8 < 1.2 && carriedHouse.scale[0] * 8 > .5, 'The carried house must fit the transformed tortoise instead of becoming a ceiling across the landscape')
  assert.equal(relationship(transformed, carriedHouse.key, 'above', 'viewer')?.geometryStatus, 'modeled')
  assert.equal(relationship(transformed, carriedDoor.key, 'part-of', carriedHouse.key)?.geometryStatus, 'modeled')
  const originalDoorOffset = door.position.map((value, axis) => (value - home.position[axis]) / home.scale[axis])
  const carriedDoorOffset = carriedDoor.position.map((value, axis) => (value - carriedHouse.position[axis]) / carriedHouse.scale[axis])
  assertPhysical(originalDoorOffset.every((value, axis) => Math.abs(value - carriedDoorOffset[axis]) < .01), 'The same door must remain attached after the house moves above the player')
  const indoorCases = [
    ['odaPlak', 'place:libriDiell:room'], ['udhetaret', 'place:libriDiell:room'],
    ['kengaLahute', 'place:libriDiell:room'], ['oda2', 'place:libriDiell:room'],
    ['odaJutbina', 'jutbina-oda'], ['behuriJutbina', 'jutbina-oda'],
    ['nastradin1', 'place:nastradin1:room'], ['nastradin2', 'place:nastradin1:room'],
    ['nastradinFund', 'place:nastradin1:room'], ['nastradinGjyq1', 'place:nastradin1:room'],
    ['nastradinGjyqFund', 'place:nastradin1:room'], ['nastradinGjyqKeq', 'place:nastradin1:room'],
    ['osmaniBurg', 'osmani-cell'], ['osmaniVdekur', 'osmani-cell'],
    ['osmaniZbuluar', 'osmani-cell'], ['osmaniRob', 'osmani-cell'],
    ['diellOda', 'sun-oda'], ['kafeneja', 'place:kafeneja:cafe'], ['kafeneja2', 'place:kafeneja:cafe'],
    ['vatra', 'place:vatra:house'], ['vatraGjarpri', 'place:vatra:house'],
    ['tregtari2', 'merchant-shop-room'], ['djepi1', 'place:djepi1:house'],
    ['gjumiBujtina', 'inn-room'],
  ]
  for (const [nodeId, key] of indoorCases) {
    const scene = buildWorldNodeScene(nodeId), enclosure = requiredObject(scene, key)
    assert.equal(enclosure.attributes.interior, true, `${nodeId}: the entered room needs an enclosing roof`)
    assert.equal(relationship(scene, 'viewer', 'inside', key)?.geometryStatus, 'modeled', `${nodeId}: the same indoor viewpoint must persist through the local conversation`)
    assertPhysical(xzDistance(enclosure.position, scene.camera.eye) < .01, `${nodeId}: a facade ahead of the camera is not the source-established interior`)
  }
  const square = buildWorldNodeScene('fshatiSheshi')
  assert.equal(relationship(square, 'viewer', 'inside', 'place:kafeneja:cafe'), undefined, 'The café’s scoped indoor fixture must not enclose the shared outdoor square')
  const takenBread = buildWorldNodeScene('plaka', { selectedDescriptionId: 'description:plaka:9' })
  const breadHouse = requiredObject(takenBread, 'feature:place-plaka-house')
  const breadTable = relativeXZ(requiredObject(takenBread, 'place:plaka:table'), breadHouse)
  assertPhysical(Math.abs(breadTable[0]) < 4 && Math.abs(breadTable[1]) < 3.5, 'The bread table must remain inside Plaka’s actual house')
  assertPhysical(xzDistance(requiredObject(takenBread, 'item:old-woman-bread').position, takenBread.camera.eye) < 1, 'Bread taken from the table must be in the viewer’s hand')
  const cookingFire = requiredObject(hospitality, 'place:breshka1:fire')
  const cookingLocal = relativeXZ(cookingFire, home)
  assertPhysical(Math.abs(cookingLocal[0]) < 4 && Math.abs(cookingLocal[1]) < 3.5, 'The cooking fire must be within the entered house')
  const emberVertices = compileWorldNodeGeometry({ objects: [cookingFire] }).faces.filter(({ partId }) => partId === 'ember-bed').flatMap(({ vertices }) => vertices)
  const emberTop = Math.max(...emberVertices.map((point) => point[1]))
  for (const key of ['item:tortoise-house-meat', 'item:tortoise-house-bread']) {
    const food = requiredObject(hospitality, key)
    const foodVertices = compileWorldNodeGeometry({ objects: [food] }).faces.flatMap(({ vertices }) => vertices)
    const foodBottom = Math.min(...foodVertices.map((point) => point[1]))
    assertPhysical(Math.abs(foodBottom - emberTop) < .025 && xzDistance(food.position, cookingFire.position) < .55, 'Cooking food must rest on the same indoor fire’s ember bed')
  }
  assertPhysical(xzDistance(requiredObject(hospitality, 'item:tortoise-house-meat').position, requiredObject(hospitality, 'item:tortoise-house-bread').position) > .5, 'The two cooking foods must occupy distinct positions on the ember bed')
  const givenMeat = buildWorldNodeScene('breshkaMire')
  assert.equal(requiredObject(givenMeat, 'place:breshka1:door').attributes.open, true, 'The completed handover must have an accessible doorway')
  assert.equal(relationship(givenMeat, 'actor:tortoise-house-guest', 'holds', 'item:tortoise-house-meat')?.geometryStatus, 'modeled')
  assertPhysical(xzDistance(requiredObject(givenMeat, 'actor:tortoise-house-guest').position, requiredObject(givenMeat, 'item:tortoise-house-meat').position) < .6, 'The guest must actually hold the handed-over meat')
  const leftMill = buildWorldNodeScene('maroNataHumbur')
  assert.equal(requiredObject(leftMill, 'maro-night-mill').attributes.interior, false, 'Leaving the mill must stop rendering its enclosing interior')
  assert.equal(relationship(leftMill, 'viewer', 'inside', 'maro-night-mill'), undefined, 'The departed viewer must not retain the previous indoor footing')
  assertPhysical(xzDistance(requiredObject(leftMill, 'maro-night-mill').position, leftMill.camera.eye) > 5, 'The departed viewer must see the mill from outside rather than stand inside its shell')
  const nightVisitor = buildWorldNodeScene('udheNate', { selectedDescriptionId: 'description:udheNate:1' })
  const knockingPosition = relativeXZ(requiredObject(nightVisitor, 'creature:karkanxholl'), requiredObject(nightVisitor, 'place:udha:house'))
  assertPhysical(Math.abs(knockingPosition[0]) < .1 && knockingPosition[1] < -3.5, 'The knocking Karkanxholl must stand at the doorway outside the house wall')
  assert.equal(relationship(nightVisitor, 'creature:karkanxholl', 'at-entrance', 'place:udha:house')?.geometryStatus, 'modeled')
  const hearthGift = buildWorldNodeScene('vatraGjarpri'), hearthHouse = requiredObject(hearthGift, 'place:vatra:house')
  for (const key of ['animal:hearth-snake', 'item:hearth-milk']) {
    const point = relativeXZ(requiredObject(hearthGift, key), hearthHouse)
    assertPhysical(Math.abs(point[0]) < 4 && Math.abs(point[1]) < 3.5, 'The household milk gift and serpent must remain inside the house')
  }
  const halilPrison = buildWorldNodeScene('mujo4'), cell = requiredObject(halilPrison, 'halil-dark-cell')
  assert.equal(relationship(halilPrison, 'viewer', 'inside', cell.key), undefined, 'Halil’s imprisonment must not imprison the player')
  assert.equal(relationship(halilPrison, 'actor:halili', 'inside', cell.key)?.geometryStatus, 'modeled')
  const captive = relativeXZ(requiredObject(halilPrison, 'actor:halili'), cell)
  assertPhysical(Math.abs(captive[0]) < 5 && Math.abs(captive[1]) < 6, 'The captive must actually be within the depicted cell')
  const cameraSide = (scene, object) => {
    const dx = scene.camera.target[0] - scene.camera.eye[0], dz = scene.camera.target[2] - scene.camera.eye[2], length = Math.hypot(dx, dz)
    return (object.position[0] - scene.camera.eye[0]) * -dz / length + (object.position[2] - scene.camera.eye[2]) * dx / length
  }
  for (const nodeId of ['rrugaDetit', 'guriUdhes']) {
    const scene = buildWorldNodeScene(nodeId)
    assertPhysical(cameraSide(scene, requiredObject(scene, 'place:deti')) > 0, `${nodeId}: the sea described on the right must be physically right of the camera`)
    if (nodeId === 'rrugaDetit') assertPhysical(cameraSide(scene, requiredObject(scene, 'sea-route-mountain')) < 0, 'The route-marker mountain must be physically left of the camera')
  }
  const returnHome = buildWorldNodeScene('gjarperBurrFund')
  assert.equal(returnHome.location.placeId, 'gjarperKulshedra', 'The man returning home must not relocate the player from the Kulshedra’s shore')
  for (const key of ['actor:serpent-man', 'serpent-home', 'salt-water']) assert.equal(object(returnHome, key), undefined, `${key}: departed actors and offstage possessions must not remain beside the monster`)
  assertPhysical(object(returnHome, 'actor:kulshedra') && object(returnHome, 'husband-sea'), 'The freed man’s departure must retain the actual shore and Kulshedra')

  // This source entity is one physical panel of the mill. A second slab in
  // front of it would obstruct the people while still satisfying part-of text.
  const millMoment = buildWorldNodeScene('maroShtrember')
  const millShell = requiredObject(millMoment, 'maro-night-mill'), millWall = requiredObject(millMoment, 'maro-mill-wall')
  assert.equal(relationship(millMoment, millWall.key, 'part-of', millShell.key)?.geometryStatus, 'modeled')
  const shellParts = buildAssetParts(millShell.asset, millShell.attributes)
  assert.equal(shellParts.some(({ id }) => id === 'back-wall'), false, 'The independently inspectable wall must replace the duplicate shell panel')
  const referencePanel = buildAssetParts(millShell.asset, { ...millShell.attributes, sourceWallParts: [] }).find(({ id }) => id === 'back-wall')
  const wallPart = buildAssetParts(millWall.asset, millWall.attributes).find(({ id }) => id === 'masonry')
  const panelLocal = relativeXZ(millWall, millShell)
  assertPhysical(panelLocal.every((value, axis) => Math.abs(value / millShell.scale[axis ? 2 : 0] - referencePanel.position[axis ? 2 : 0]) < .01), 'The authored wall must occupy the mill’s actual back panel')
  assertPhysical(wallPart.size.every((value, axis) => Math.abs(value * millWall.scale[axis] - referencePanel.size[axis] * millShell.scale[axis]) < .01), 'The independently inspectable wall must have the actual panel’s dimensions')
  const mountedHorse = relativeXZ(requiredObject(millMoment, 'maro-return-horse'), millShell)
  assertPhysical(Math.abs(mountedHorse[0]) < 4 && Math.abs(mountedHorse[1]) < 3.5, 'Mounting the horse inside the mill must preserve the enclosing place')

  for (const nodeId of ['stihi1', 'stihiFund']) {
    const scene = buildWorldNodeScene(nodeId), cave = requiredObject(scene, 'place:stihi1:cave'), dragon = requiredObject(scene, 'creature:stihi')
    assert.equal(cave.attributes.interior, true, 'The explicitly occupied cave must have a real hollow chamber')
    assert.equal(cave.attributes.encloseViewer, false, 'Observing the Stihi inside must not put the player inside its cave')
    const viewerLocal = relativeXZ({ position: scene.camera.eye }, cave), dragonLocal = relativeXZ(dragon, cave)
    assertPhysical(viewerLocal[1] > 9 && Math.abs(dragonLocal[0]) < 12 && dragonLocal[1] < 9 && dragonLocal[1] > -23, 'The observer must remain beyond the entrance while the Stihi occupies the chamber')
    assert.equal(relationship(scene, dragon.key, 'inside', cave.key)?.geometryStatus, 'modeled')
    if (nodeId === 'stihi1') {
      const emittedFire = requiredObject(scene, 'effect:stihi-fire')
      assert.equal(relationship(scene, emittedFire.key, 'emitted-by', dragon.key)?.geometryStatus, 'modeled')
      assertPhysical(xzDistance(emittedFire.position, dragon.position) < 4, 'The Stihi’s emitted flame must follow its final indoor body placement')
    }
  }
  for (const nodeId of ['kisha1', 'kishaFund']) {
    const scene = buildWorldNodeScene(nodeId), church = requiredObject(scene, 'feature:square-church'), priest = requiredObject(scene, 'actor:priest')
    const viewerLocal = relativeXZ({ position: scene.camera.eye }, church), priestLocal = relativeXZ(priest, church), doorLocal = relativeXZ(requiredObject(scene, 'place:kisha1:door'), church)
    assert.equal(scene.viewpoint?.kind, 'building-approach', 'Being at the church must not silently place the viewer inside its nave')
    assertPhysical(viewerLocal[1] < priestLocal[1] && priestLocal[1] < doorLocal[1] && doorLocal[1] < 0, 'The church-door priest must stand visibly between the exterior observer and the door')
    assertPhysical(Math.abs(priestLocal[0] - viewerLocal[0]) < .1 && Math.hypot(scene.camera.target[0] - church.position[0], scene.camera.target[2] - church.position[2]) < .01, 'The exterior church approach must face the actual doorway without moving the registered church')
    assert.deepEqual([church.position[0], church.position[2]], [church.placement.anchorPosition[0], church.placement.anchorPosition[2]], 'The exterior viewpoint refines the eye, never the church’s canonical landmark position')
    assert.equal(relationship(scene, 'viewer', 'inside', church.key), undefined)
  }
  for (const selectedDescriptionId of [null, 'description:maroMulli1:8', 'description:maroMulli1:11']) {
    const scene = buildWorldNodeScene('maroMulli1', { selectedDescriptionId }), mill = requiredObject(scene, 'maro-night-mill'), stone = requiredObject(scene, 'maro-millstone')
    const stoneLocal = relativeXZ(stone, mill)
    assertPhysical(Math.abs(stoneLocal[0]) < 4 && Math.abs(stoneLocal[1]) < 3.5, 'The entered mill’s working stone must occupy its interior, not disappear behind an exterior wall')
    assert.equal(relationship(scene, stone.key, 'inside', mill.key)?.geometryStatus, 'modeled')
    const water = object(scene, 'maro-mill-water')
    if (water) {
      const waterTop = compileWorldNodeGeometry({ objects: [water] }).bounds.max[1]
      const stoneBottom = compileWorldNodeGeometry({ objects: [stone] }).bounds.min[1]
      assertPhysical(xzDistance(water.position, stone.position) < .01 && waterTop < stoneBottom, 'The water must remain beneath the stone after the stone moves into the mill')
      assert.equal(relationship(scene, water.key, 'under', stone.key)?.geometryStatus, 'modeled')
    }
  }
  for (const nodeId of ['djepi1', 'djepi2', 'djepi3', 'djepiKeq', 'djepiFund']) {
    const scene = buildWorldNodeScene(nodeId), house = requiredObject(scene, 'place:djepi1:house')
    for (const actor of scene.objects.filter((entry) => entry.key.startsWith('actor:cradle-ora-'))) {
      const local = relativeXZ(actor, house)
      assertPhysical(Math.abs(local[0]) < 4 && Math.abs(local[1]) < 3.5 && visibleBodySample(scene, actor), `${nodeId}: the Oracle speaking at the cradle must be visible within the same room`)
    }
  }
  for (const [nodeId, key] of [['sheshi', 'gjakova-women'], ['fshatiSheshi', 'actor:birthday-father'], ['maroLitani1', 'maro-giving-spirit'], ['maroLiloKthim', 'mill-return-men']]) {
    const scene = buildWorldNodeScene(nodeId), actors = scene.objects.filter((entry) => entry.key === key)
    assert.ok(actors.length, `${nodeId}: expected visible encounter participant is missing`)
    for (const actor of actors) assertPhysical(visibleBodySample(scene, actor), `${nodeId}: ${key} must not be hidden behind an unrelated building during the direct encounter`)
  }
  const enteredHome = buildWorldNodeScene('maroIkja', { selectedDescriptionId: 'description:maroIkja:2' }), observedHome = requiredObject(enteredHome, 'maro-poor-house')
  assert.equal(relationship(enteredHome, 'viewer', 'inside', observedHome.key)?.geometryStatus, 'modeled')
  assertPhysical(xzDistance(enteredHome.camera.eye, observedHome.position) < .01, 'The exact escape branch ends inside the house the followers identify')
  for (const follower of enteredHome.objects.filter((entry) => entry.key === 'maro-prince-men')) {
    const local = relativeXZ(follower, observedHome)
    assertPhysical(local[1] < -3.5, 'The followers who watch the player enter must remain outside, even when the house hides them')
  }
  return { scenes: checkedScenes.size, nodes: checkedNodes.size, relationAssertions: checkedRelations.size, physicalChecks }
}
