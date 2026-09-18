import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { ITEMS, STORY, itemHasAffordance, itemHasTag } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { NPCS } from '../../src/game/npcs.js'
import { NPC_REGISTRY, NPC_REGISTRY_SOURCE_FILES, NPC_REGISTRY_SOURCES } from '../../src/game/npcRegistryData.js'
import { TALES, TALES_SOURCE_FILES, TALES_SOURCES } from '../../src/game/taleRegistryData.js'
import { NPC_FIRST_ENCOUNTERS, NPC_PORTRAIT_SOURCE_FILES } from '../../src/game/worldScene3dPortraitData.js'
import { PLACE_OF } from '../../src/components/nodePositions.js'
import { visibleWorldSceneElements } from '../../src/components/worldScene3dRenderer.js'
import { optionEffectsOf } from '../../src/game/stateMechanics.js'
import { validateWorldScene3dInventory } from '../../src/game/worldScene3dInventory.js'

const list = (value) => value == null ? [] : [].concat(value)
const sorted = (values) => [...values].sort()
const sourceFiles = (directory) => readdirSync(new URL(`../../src/game/data/${directory}/`, import.meta.url))
  .filter((name) => name.endsWith('.js') && !name.startsWith('_')).map((name) => `src/game/data/${directory}/${name}`)

export async function runWorldSceneInventoryAssertions(model) {
  // Directory discovery is independent of the explicit shared imports. A new,
  // removed or renamed partition cannot silently disappear from either the
  // atlas or a browser registry while the current partitions keep passing.
  for (const [directory, manifest] of [['npcs', NPC_REGISTRY_SOURCE_FILES], ['tales', TALES_SOURCE_FILES], ['npcAppearances', NPC_PORTRAIT_SOURCE_FILES]]) {
    assert.deepEqual(sorted(manifest), sorted(sourceFiles(directory)), `${directory}: public registry import manifest omits or invents a partition`)
  }
  const independentNpcs = {}, independentTales = {}
  for (const file of sourceFiles('npcs')) {
    const partition = (await import(new URL(`../../${file}`, import.meta.url))).default
    for (const [id, value] of Object.entries(partition)) {
      assert.equal(Object.hasOwn(independentNpcs, id), false, `${id}: duplicate independent NPC partition identity`)
      independentNpcs[id] = value
      assert.equal(NPC_REGISTRY_SOURCES[id], file, `${id}: registry source points to another partition`)
    }
  }
  for (const file of sourceFiles('tales')) {
    const tale = (await import(new URL(`../../${file}`, import.meta.url))).default
    assert.equal(Object.hasOwn(independentTales, tale.id), false, `${tale.id}: duplicate independent tale partition identity`)
    independentTales[tale.id] = tale
    assert.equal(TALES_SOURCES[tale.id], file, `${tale.id}: tale source points to another partition`)
  }
  // Importing the actual portrait directory exercises self-registration too;
  // a manifest entry without its import cannot conceal an omitted portrait.
  for (const file of sourceFiles('npcAppearances')) await import(new URL(`../../${file}`, import.meta.url))
  assert.deepEqual(NPC_REGISTRY, independentNpcs, 'public NPC assembler differs from independent directory enumeration')
  assert.deepEqual(TALES, independentTales, 'public tale assembler differs from independent directory enumeration')
  assert.deepEqual(validateWorldScene3dInventory(model), [], 'complete canonical inventory must validate')

  const records = new Map(model.inventory.records.map((record) => [record.id, record]))
  const elements = new Map(model.elements.map((element) => [element.id, element]))
  const descriptions = new Map(model.descriptions.map((description) => [description.id, description]))
  const expectedIds = new Set()
  const requireRecord = (id, category) => {
    expectedIds.add(id)
    assert.equal(records.get(id)?.category, category, `${id}: source record missing or wrongly classified`)
    return records.get(id)
  }
  for (const [npcId, npc] of Object.entries(independentNpcs)) {
    const record = requireRecord(`npc:${npcId}`, 'npc')
    const declaredNodes = [...(npc.location?.status === 'placed' ? [npc.location.node] : []),
      ...(npc.location?.status === 'walking' ? npc.location.route : []), ...list(npc.location?.encounters), ...list(NPCS[npcId]?.route),
      ...(NPC_FIRST_ENCOUNTERS[npcId] && !NPC_FIRST_ENCOUNTERS[npcId].depiction ? [NPC_FIRST_ENCOUNTERS[npcId].nodeId] : [])]
    for (const nodeId of declaredNodes) {
      if (!PLACE_OF[nodeId]) continue
      assert.ok(record.elementIds.includes(`actor:${npcId}:${PLACE_OF[nodeId]}`), `${npcId}: declared encounter ${nodeId} disappeared from the map`)
    }
    if (!declaredNodes.length) {
      assert.deepEqual(record.elementIds, [`reference:npc:${npcId}`], `${npcId}: a prose plan cannot invent a charted actor`)
      assert.equal(elements.get(record.elementIds[0]).placeId, null)
    }
    for (const field of ['role', 'backstory']) assert.equal(descriptions.get(`description:npc:${npcId}:${field}`)?.text, npc[field])
  }
  let portraitLines = 0
  for (const [npcId, portrait] of Object.entries(NPC_FIRST_ENCOUNTERS)) {
    const record = requireRecord(`portrait:${npcId}`, 'npc-portrait')
    if (portrait.depiction) {
      assert.equal(record.authorityScope, 'narrated-portrait', `${npcId}: narration lost its authority scope`)
      assert.deepEqual(record.metadata.depiction, portrait.depiction, `${npcId}: narrated source provenance was dropped`)
      assert.deepEqual(record.declarations, [], `${npcId}: the listening scene became a physical declaration`)
      assert.deepEqual(record.elementIds, [`reference:portrait:${npcId}`], `${npcId}: narrated portrait creates actor geometry`)
      const reference = elements.get(record.elementIds[0])
      assert.equal(reference.kind, 'catalogue')
      assert.equal(reference.placeId, null)
      assert.equal(reference.regionId, null)
      assert.match(reference.interpretation, /not a physical encounter/)
      assert.ok(records.get(`npc:${npcId}`).declarations.every(({ authority }) => authority !== 'NPC_FIRST_ENCOUNTERS'),
        `${npcId}: depiction leaked into physical NPC placement`)
    }
    for (const [index, variant] of portrait.portraitLines.entries()) {
      portraitLines++
      const description = descriptions.get(`description:portrait:${npcId}:${index}`)
      assert.equal(description?.text, albanianTextOf(variant.line), `${npcId}: projected Albanian portrait disappeared`)
      assert.equal(description?.language, 'sq')
      assert.deepEqual(description?.portraitConditions?.required, variant.required)
      assert.deepEqual(description?.portraitConditions?.excluded, variant.excluded)
      assert.equal(description?.portraitConditions?.known, variant.known)
      assert.equal(description?.portraitConditions?.presence, portrait.presence)
      assert.equal(description?.portraitConditions?.firstEncounter, true)
      if (portrait.depiction) {
        assert.equal(description.nodeId, portrait.nodeId, `${npcId}: rendering context lost`)
        assert.equal(description.placeId, null, `${npcId}: rendering context became physical occupancy`)
        assert.equal(description.regionId, null)
        assert.equal(description.role, 'narrated-portrait')
        assert.deepEqual(description.depiction, portrait.depiction)
        assert.deepEqual(description.elementIds, record.elementIds)
        assert.deepEqual(visibleWorldSceneElements(model, { focusedDescriptionId: description.id }).map(({ id }) => id),
          record.elementIds, `${npcId}: focusing a song portrait renders physical scene geometry`)
      }
    }
  }
  assert.equal(model.inventory.coverage.portraitDescriptions, portraitLines)

  for (const item of Object.values(ITEMS)) {
    requireRecord(`item:${item.id}`, 'item')
    assert.ok(elements.has(`item:${item.id}`), `${item.id}: missing item catalogue identity`)
    if (item.use) requireRecord(`item-use:${item.id}`, 'item-use')
  }
  let actionCount = 0
  for (const [nodeId, node] of Object.entries(STORY)) for (const [optionIndex, option] of (node.options || []).entries()) {
    if (option.confuser) continue
    for (const item of Object.values(ITEMS)) {
      const affected = optionEffectsOf(option).some((effect) => effect?.id === item.id &&
        (effect.type === 'inventory' || (effect.type === 'resource' && item.currency)))
      const required = list(option.requires).some((condition) => condition === item.id ||
        (condition.startsWith('itemTag:') && itemHasTag(item, condition.slice(8))) ||
        (condition.startsWith('affords:') && itemHasAffordance(item, condition.slice(8))))
      if (!affected && !required) continue
      actionCount++
      const record = requireRecord(`item-action:${nodeId}:${optionIndex}:${item.id}`, 'item-action')
      assert.equal(record.metadata.nodeId, nodeId)
      assert.equal(record.metadata.to, option.to)
      if (PLACE_OF[nodeId]) assert.ok(record.elementIds.includes(`item-action:${item.id}:${PLACE_OF[nodeId]}`), `${record.id}: item action is not on its source place`)
      assert.deepEqual(record.metadata.requires, list(option.requires))
      assert.deepEqual(record.metadata.unless, list(option.unless))
    }
  }
  assert.equal(model.inventory.coverage.itemActions, actionCount)
  // These were concrete omissions before this change, including one tag-based
  // affordance. They must remain actual place markers, not shelf-only records.
  for (const id of ['actor:gjonMik:libriDiell', 'actor:vajzaKroi:kroi1', 'actor:kulshedraMadhe:kulshedra1',
    'item-action:ujk:pylliThelle', 'item-action:litar:pusiThate', 'item-action:shishe:kroi1']) assert.ok(elements.has(id), `${id}: concrete encounter/action map regression`)

  for (const [taleId, tale] of Object.entries(independentTales)) {
    for (const place of tale.places) {
      const record = requireRecord(`tale-place:${taleId}:${place.id}`, 'tale-place')
      if (place.anchor.status === 'existing' && PLACE_OF[place.anchor.node]) assert.deepEqual(record.elementIds, [`place:${PLACE_OF[place.anchor.node]}`])
      else {
        assert.deepEqual(record.elementIds, [`reference:tale-place:${taleId}:${place.id}`])
        assert.equal(elements.get(record.elementIds[0])?.placeId, null, `${record.id}: proposed or offstage place promoted to real geometry`)
      }
    }
    for (const cast of tale.cast) requireRecord(`tale-cast:${taleId}:${cast.id}`, 'tale-cast')
    for (const item of tale.items || []) requireRecord(`tale-item:${taleId}:${item.id}`, 'tale-item')
  }
  assert.deepEqual(sorted(records.keys()), sorted(expectedIds), 'inventory does not cover exactly every independent canonical source identity')

  let probes = 0
  const rejects = (label, change, fragment) => {
    const altered = structuredClone(model)
    change(altered)
    const issues = validateWorldScene3dInventory(altered)
    assert.ok(issues.length, `${label}: inventory corruption was accepted`)
    if (fragment) assert.ok(issues.some((issue) => issue.includes(fragment)), `${label}: failure did not identify ${fragment}: ${issues.slice(0, 4).join('; ')}`)
    probes++
  }
  const record = (scene, id) => scene.inventory.records.find((entry) => entry.id === id)
  const element = (scene, id) => scene.elements.find((entry) => entry.id === id)
  const description = (scene, id) => scene.descriptions.find((entry) => entry.id === id)
  rejects('missing NPC', (scene) => { scene.inventory.records = scene.inventory.records.filter(({ id }) => id !== 'npc:gjonMik') }, 'npc:gjonMik')
  rejects('invented NPC', (scene) => { scene.inventory.records.push({ ...scene.inventory.records[0], id: 'npc:invented-map-person' }) }, 'npc:invented-map-person')
  rejects('missing actor', (scene) => { scene.elements = scene.elements.filter(({ id }) => id !== 'actor:vajzaKroi:kroi1') }, 'actor:vajzaKroi:kroi1')
  rejects('altered actor place', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').placeId = 'start' }, 'actor:vajzaKroi:kroi1')
  rejects('altered actor position', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').position[0] += 10 }, 'actor:vajzaKroi:kroi1')
  rejects('invented actor authority', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').source.key = 'npc:elira' }, 'actor:vajzaKroi:kroi1')
  rejects('actor geometry altered', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').geometry.size[1] = 120 }, 'actor:vajzaKroi:kroi1')
  rejects('actor label altered', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').label = 'Another person' }, 'actor:vajzaKroi:kroi1')
  rejects('alternatives claim simultaneous presence', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').conditional = false }, 'actor:vajzaKroi:kroi1')
  rejects('marker source membership altered', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').inventoryRecordIds = [] }, 'actor:vajzaKroi:kroi1')
  rejects('planning NPC placed', (scene) => { element(scene, 'reference:npc:atiMaros').placeId = 'maroShtepi' }, 'reference:npc:atiMaros')
  rejects('reference shelf position altered', (scene) => { element(scene, 'reference:npc:atiMaros').position[0] += 99 }, 'reference:npc:atiMaros')
  rejects('source marker promoted to live world', (scene) => { const entry = scene.elements.find(({ kind }) => kind === 'source-reference'); entry.authorityScope = 'world-registry' }, 'authorityScope')
  rejects('source-tale explanation removed', (scene) => { const entry = scene.elements.find(({ kind }) => kind === 'source-reference'); entry.interpretation = 'A current actor lives here.' }, 'interpretation')
  rejects('portrait omitted', (scene) => { scene.descriptions = scene.descriptions.filter(({ id }) => id !== 'description:portrait:elira:0') }, 'description:portrait:elira:0')
  rejects('portrait prose altered', (scene) => { description(scene, 'description:portrait:elira:0').text += ' stale' }, 'description:portrait:elira:0')
  rejects('portrait English reading altered', (scene) => { description(scene, 'description:portrait:elira:0').reading = 'Another person arrives.' }, 'description:portrait:elira:0')
  rejects('portrait language altered', (scene) => { description(scene, 'description:portrait:elira:0').language = 'en' }, 'description:portrait:elira:0')
  rejects('portrait absence gate lost', (scene) => { description(scene, 'description:portrait:elira:0').conditions.none = [] }, 'description:portrait:elira:0')
  rejects('portrait first-encounter policy lost', (scene) => { description(scene, 'description:portrait:elira:0').portraitConditions.firstEncounter = false }, 'description:portrait:elira:0')
  rejects('narrated portrait promoted to physical actor', (scene) => {
    const entry = element(scene, 'reference:portrait:gjarpriShtratit')
    entry.kind = 'actor'; entry.catalogue = false; entry.placeId = PLACE_OF.mujoHak1
  }, 'reference:portrait:gjarpriShtratit')
  rejects('narrated source context erased', (scene) => { delete description(scene, 'description:portrait:gjarpriShtratit:0').depiction }, 'depiction')
  rejects('narrated description physically located', (scene) => { description(scene, 'description:portrait:gjarpriShtratit:0').placeId = PLACE_OF.mujoHak1 }, 'placeId')
  rejects('narrated source anchor forged', (scene) => { record(scene, 'portrait:gjarpriShtratit').metadata.depiction.placeId = 'kunora' }, 'metadata')
  rejects('missing item action', (scene) => { const id = scene.inventory.records.find(({ category }) => category === 'item-action').id; scene.inventory.records = scene.inventory.records.filter((entry) => entry.id !== id) }, 'canonical inventory record is missing')
  rejects('item action destination altered', (scene) => { scene.inventory.records.find(({ category }) => category === 'item-action').metadata.to = 'start' }, 'metadata')
  rejects('item action existence gated by wrong state', (scene) => { scene.descriptions.find(({ source }) => source.kind === 'item-action').conditions.all = ['fact:invented'] }, 'conditions')
  rejects('item blurb location binding lost', (scene) => { const entry = description(scene, 'description:item:shishe:blurb'); entry.bindings = entry.bindings.filter(({ type }) => type !== 'inventory-item-location') }, 'description:item:shishe:blurb')
  rejects('invented binding evidence', (scene) => { description(scene, 'description:portrait:elira:0').bindings.find(({ type }) => type.startsWith('inventory-')).evidence.source.file = 'not-source.js' }, 'description:portrait:elira:0')
  rejects('reverse inventory source link lost', (scene) => { element(scene, 'actor:vajzaKroi:kroi1').descriptionIds = [] }, 'not reciprocal')
  rejects('source location declaration altered', (scene) => { record(scene, 'tale-place:maro-perhitura:shkretetira').declarations[0].placeId = 'start' }, 'tale-place:maro-perhitura:shkretetira')
  rejects('unlocated disposition hidden', (scene) => { record(scene, 'tale-place:maro-perhitura:shkretetira').disposition = 'charted' }, 'tale-place:maro-perhitura:shkretetira')
  rejects('coverage record omitted', (scene) => { scene.inventory.coverage.expectedRecordIds.pop() }, 'coverage')
  return { probes, records: records.size, portraits: portraitLines, itemActions: actionCount }
}
