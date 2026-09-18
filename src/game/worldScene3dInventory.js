// Debug-only inventory of canonical people, objects and source-tale records.
// The data adapters below carry source statements and possible locations. They
// never infer a noun's shape, pretend planning prose is a place, or assert that
// alternatives from different times are present together.
import { ITEMS, STORY, itemHasAffordance, itemHasTag } from './content.js'
import { albanianTextOf } from './language.js'
import { NPCS } from './npcs.js'
import { NPC_REGISTRY, NPC_REGISTRY_SOURCES } from './npcRegistryData.js'
import { TALES, TALES_SOURCES } from './taleRegistryData.js'
import { NPC_FIRST_ENCOUNTERS } from './worldScene3dPortraitData.js'
import { npcIdentityConditionId } from './npcIdentity.js'
import { optionEffectsOf } from './stateMechanics.js'
import { framesOf } from './taleLib.js'
import { NODE_POS, PLACE_OF } from '../components/nodePositions.js'
import { NODE_REGION } from './regions.js'

const list = (value) => value == null ? [] : [].concat(value)
const unique = (values) => [...new Set(values)]
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right)
const copy = (value) => JSON.parse(JSON.stringify(value))
const placeOf = (nodeId) => PLACE_OF[nodeId] && NODE_POS[PLACE_OF[nodeId]] ? PLACE_OF[nodeId] : null
const emptyConditions = () => ({ all: [], negate: false, none: [], observationId: null })
const source = (file, authority, key, path, kind, extra = {}) => ({ file, authority, key, path, kind, ...extra })
const npcSource = (npcId, field) => source(NPC_REGISTRY_SOURCES[npcId], 'NPC_REGISTRY', npcId,
  `NPC_REGISTRY.${npcId}${field ? `.${field}` : ''}`, `inventory-npc${field ? `-${field}` : ''}`, { npcId, ...(field ? { field } : {}) })
const taleSource = (taleId, collection, index, field = null) => source(TALES_SOURCES[taleId], 'TALES', taleId,
  `TALES[${JSON.stringify(taleId)}].${collection}[${index}]${field ? `.${field}` : ''}`, `tale-${collection.replace(/s$/, '')}`,
  { taleId, collection, index, ...(field ? { field } : {}) })
const statement = (id, text, origin, extra = {}) => ({ id, text, source: origin, conditions: emptyConditions(), ...extra })

/** Authoritative, non-geometric source inventory. Exported for independent
 * directory/registry coverage audits; building a scene is not its oracle. */
export function worldScene3dInventorySources() {
  const records = []
  for (const [npcId, npc] of Object.entries(NPC_REGISTRY)) {
    const declarations = []
    const declare = (nodeId, field, authority = 'NPC_REGISTRY') => {
      if (!nodeId) return
      declarations.push({ nodeId, placeId: placeOf(nodeId), field, authority,
        source: authority === 'NPCS'
          ? source('src/game/npcs.js', 'NPCS', npcId, `NPCS.${npcId}.${field}`, 'inventory-npc-route', { npcId, field })
          : npcSource(npcId, field),
      })
    }
    if (npc.location?.status === 'placed') declare(npc.location.node, 'location.node')
    if (npc.location?.status === 'walking') {
      for (const [index, nodeId] of list(npc.location.route).entries()) declare(nodeId, `location.route[${index}]`)
    }
    for (const [index, nodeId] of list(npc.location?.encounters).entries()) declare(nodeId, `location.encounters[${index}]`)
    for (const [index, nodeId] of list(NPCS[npcId]?.route).entries()) declare(nodeId, `route[${index}]`, 'NPCS')
    const portrait = NPC_FIRST_ENCOUNTERS[npcId]
    if (portrait && !portrait.depiction) declarations.push({ nodeId: portrait.nodeId, placeId: placeOf(portrait.nodeId), field: 'nodeId', authority: 'NPC_FIRST_ENCOUNTERS',
      source: source(`src/game/data/npcAppearances/${portrait.sourcePartition}.js`, 'NPC_FIRST_ENCOUNTERS', npcId,
        `NPC_FIRST_ENCOUNTERS.${npcId}.nodeId`, 'inventory-npc-encounter', { npcId }) })
    records.push({
      id: `npc:${npcId}`, category: 'npc', label: npc.name, entityId: `npc:${npcId}`,
      source: npcSource(npcId), authorityScope: 'world-registry',
      metadata: copy({ npcId, name: npc.name, glyph: npc.glyph, kind: npc.kind, location: npc.location, identity: npc.identity, runtime: NPCS[npcId] || null }),
      declarations, statements: ['role', 'backstory', ...(npc.location?.plan ? ['location.plan'] : [])].map((field) =>
        statement(`description:npc:${npcId}:${field}`, field === 'location.plan' ? npc.location.plan : npc[field], npcSource(npcId, field))),
    })
  }

  for (const [npcId, portrait] of Object.entries(NPC_FIRST_ENCOUNTERS)) {
    const file = `src/game/data/npcAppearances/${portrait.sourcePartition}.js`
    const identityCondition = npcIdentityConditionId(npcId)
    // A narrated portrait's node is its listening context, never an actor location.
    const declarations = portrait.depiction ? [] : [{ nodeId: portrait.nodeId, placeId: placeOf(portrait.nodeId), authority: 'NPC_FIRST_ENCOUNTERS', field: 'nodeId',
      source: source(file, 'NPC_FIRST_ENCOUNTERS', npcId, `NPC_FIRST_ENCOUNTERS.${npcId}.nodeId`, 'inventory-npc-encounter', { npcId }) }]
    records.push({
      id: `portrait:${npcId}`, category: 'npc-portrait', label: `${NPC_REGISTRY[npcId]?.name || npcId}: ${portrait.depiction ? 'narrated portrait' : 'first encounter'}`,
      entityId: `npc:${npcId}`, source: source(file, 'NPC_FIRST_ENCOUNTERS', npcId, `NPC_FIRST_ENCOUNTERS.${npcId}`, 'npc-portrait', { npcId }),
      authorityScope: portrait.depiction ? 'narrated-portrait' : 'runtime-portrait', metadata: copy({ npcId, nodeId: portrait.nodeId, depiction: portrait.depiction, sourcePartition: portrait.sourcePartition, details: portrait.details,
        practicalWordIds: portrait.practicalWordIds, embedded: portrait.embedded, presence: portrait.presence, placement: portrait.placement }),
      declarations,
      statements: portrait.portraitLines.map((variant, variantIndex) => statement(
        `description:portrait:${npcId}:${variantIndex}`, albanianTextOf(variant.line),
        source(file, 'NPC_FIRST_ENCOUNTERS', npcId, `NPC_FIRST_ENCOUNTERS.${npcId}.portraitLines[${variantIndex}].line`, 'npc-portrait', { npcId, variantIndex }),
        { nodeId: portrait.nodeId, ...(portrait.depiction ? { depiction: portrait.depiction } : {}), reading: variant.line.reading || null, tokenIds: variant.line.filter((token) => token.id).map((token) => token.id),
          conditions: { all: [...variant.required, ...(portrait.presence === 'runtime' ? [`npc:${npcId}`] : []), ...(identityCondition && variant.known === true ? [identityCondition] : [])],
            negate: false, none: [...variant.excluded, ...(identityCondition && variant.known === false ? [identityCondition] : [])], observationId: null },
          portraitConditions: { required: [...variant.required], excluded: [...variant.excluded], known: variant.known, presence: portrait.presence,
            firstEncounter: true, persistedLedger: 'npcPortraitsSeen/activeNpcPortraits', placement: portrait.placement },
        },
      )),
    })
  }

  for (const item of Object.values(ITEMS)) {
    records.push({ id: `item:${item.id}`, category: 'item', label: item.name, entityId: `item:${item.id}`,
      source: source('src/game/content.js', 'ITEMS', item.id, `ITEMS.${item.id}`, 'inventory-item', { itemId: item.id }),
      authorityScope: 'inventory-catalogue', metadata: copy({ itemId: item.id, kind: item.kind, tags: item.tags, companion: Boolean(item.companion), currency: Boolean(item.currency) }),
      declarations: [], statements: [], existingDescriptionIds: [`description:item:${item.id}:blurb`],
    })
    if (item.use) records.push({ id: `item-use:${item.id}`, category: 'item-use', label: `${item.name}: carried use`, entityId: `item:${item.id}`,
      source: source('src/game/content.js', 'ITEMS', item.id, `ITEMS.${item.id}.use`, 'item-use', { itemId: item.id }),
      authorityScope: 'player-action', metadata: copy({ itemId: item.id, use: item.use, locationPolicy: 'carried-by-player; no fixed physical place' }), declarations: [],
      statements: [statement(`description:item-use:${item.id}`, albanianTextOf(item.use.phrase),
        source('src/game/content.js', 'ITEMS', item.id, `ITEMS.${item.id}.use.phrase`, 'item-use', { itemId: item.id }),
        { tokenIds: item.use.phrase.filter((token) => token.id).map((token) => token.id), conditions: { ...emptyConditions(), all: [item.id] } })],
    })
  }
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of (node.options || []).entries()) {
      if (option.confuser) continue
      const effects = optionEffectsOf(option)
      for (const item of Object.values(ITEMS)) {
        const relevantEffects = effects.filter((effect) => effect?.id === item.id &&
          (effect.type === 'inventory' || (effect.type === 'resource' && item.currency)))
        const requirements = list(option.requires).filter((condition) => condition === item.id ||
          (condition.startsWith('itemTag:') && itemHasTag(item, condition.slice(8))) ||
          (condition.startsWith('affords:') && itemHasAffordance(item, condition.slice(8))))
        if (!relevantEffects.length && !requirements.length) continue
        const origin = source('src/game/content.js', 'STORY', nodeId, `STORY.${nodeId}.options[${optionIndex}]`, 'item-action', { nodeId, optionIndex, itemId: item.id })
        const roles = unique([...relevantEffects.map((effect) => effect.delta > 0 ? 'acquire' : effect.delta < 0 ? 'spend' : 'resource-set'), ...(requirements.length ? ['required-carried-item'] : [])])
        records.push({ id: `item-action:${nodeId}:${optionIndex}:${item.id}`, category: 'item-action', label: `${item.name}: ${albanianTextOf(option.text)}`,
          entityId: `item:${item.id}`, source: origin, authorityScope: 'player-action',
          metadata: copy({ itemId: item.id, nodeId, optionIndex, to: option.to, roles, requirements, effects: relevantEffects, requires: list(option.requires), unless: list(option.unless) }),
          declarations: [{ nodeId, placeId: placeOf(nodeId), authority: 'STORY', field: `options[${optionIndex}]`, source: origin }],
          statements: [statement(`description:item-action:${nodeId}:${optionIndex}:${item.id}`, albanianTextOf(option.text), origin,
            { nodeId, tokenIds: option.text.filter((token) => token.id).map((token) => token.id),
              conditions: { all: list(option.requires), negate: false, none: list(option.unless), observationId: null } })],
        })
      }
    }
  }

  for (const [taleId, tale] of Object.entries(TALES)) {
    const frames = framesOf(tale)
    const placeById = new Map(tale.places.map((place, index) => [place.id, { place, index }]))
    const resolve = (placeId) => {
      const entry = placeById.get(placeId)
      if (!entry) return { sourcePlaceId: placeId, status: 'unknown', nodeId: null, placeId: null }
      const { place, index } = entry
      return { sourcePlaceId: placeId, status: place.anchor.status, nodeId: place.anchor.status === 'existing' ? place.anchor.node : null,
        placeId: place.anchor.status === 'existing' ? placeOf(place.anchor.node) : null, source: taleSource(taleId, 'places', index, 'anchor') }
    }
    const sourceLocations = (states) => unique(states.map(({ sourcePlaceId }) => sourcePlaceId)).map(resolve)
    for (const [index, place] of tale.places.entries()) {
      records.push({ id: `tale-place:${taleId}:${place.id}`, category: 'tale-place', label: `${place.name} · ${tale.title}`,
        source: taleSource(taleId, 'places', index), authorityScope: 'source-timeline', metadata: copy({ taleId, place }),
        declarations: [resolve(place.id)],
        statements: ['name', 'note', 'anchor.mirror', 'anchor.mold', 'anchor.conflicts', 'anchor.proposal'].flatMap((field) => {
          const text = field.startsWith('anchor.') ? place.anchor[field.slice(7)] : place[field]
          return typeof text === 'string' && text ? [statement(`description:tale-place:${taleId}:${place.id}:${field}`, text, taleSource(taleId, 'places', index, field))] : []
        }),
      })
    }
    for (const [index, cast] of tale.cast.entries()) {
      const npcId = cast.npc || Object.keys(NPC_REGISTRY).find((id) => NPC_REGISTRY[id].tales?.[taleId] === cast.id) || null
      const states = frames.flatMap((frame) => frame.cast[cast.id] ? [{ beatId: frame.beat.id, sourcePlaceId: frame.cast[cast.id].at, doing: frame.cast[cast.id].doing }] : [])
      records.push({ id: `tale-cast:${taleId}:${cast.id}`, category: 'tale-cast', label: `${cast.name} · ${tale.title}`,
        entityId: npcId ? `npc:${npcId}` : null, source: taleSource(taleId, 'cast', index), authorityScope: 'source-timeline',
        metadata: copy({ taleId, cast, npcId, states }), declarations: sourceLocations(states),
        statements: [statement(`description:tale-cast:${taleId}:${cast.id}`, [cast.name, cast.note].filter(Boolean).join(' — '), taleSource(taleId, 'cast', index))],
      })
    }
    for (const [index, item] of (tale.items || []).entries()) {
      const states = frames.flatMap((frame) => {
        const state = frame.items[item.id]
        if (!state) return []
        const carried = frame.cast[state.at]
        return [{ beatId: frame.beat.id, at: state.at, sourcePlaceId: placeById.has(state.at) ? state.at : carried?.at || null,
          carriedBy: placeById.has(state.at) ? null : state.at, doing: state.doing }]
      })
      records.push({ id: `tale-item:${taleId}:${item.id}`, category: 'tale-item', label: `${item.name} · ${tale.title}`,
        source: taleSource(taleId, 'items', index), authorityScope: 'source-timeline', metadata: copy({ taleId, item, states }), declarations: sourceLocations(states),
        statements: [statement(`description:tale-item:${taleId}:${item.id}`, [item.name, item.note].filter(Boolean).join(' — '), taleSource(taleId, 'items', index))],
      })
    }
  }
  return records
}

const sourceLocationElementId = (record, declaration) => {
  if (record.category === 'npc' || record.category === 'npc-portrait') return `actor:${record.metadata.npcId}:${declaration.placeId}`
  if (record.category === 'item-action') return `item-action:${record.metadata.itemId}:${declaration.placeId}`
  if (record.category === 'tale-place') return `place:${declaration.placeId}`
  return `source:${record.id}:${declaration.placeId}`
}
const recordElementIds = (record) => {
  if (record.category === 'item' || record.category === 'item-use') return [`item:${record.metadata.itemId}`]
  const charted = record.declarations.filter(({ placeId }) => placeId)
  const ids = unique(charted.map((declaration) => sourceLocationElementId(record, declaration)))
  // Unknown/proposed/offstage source positions always retain an explicit
  // reference record even if another moment of this same entity is charted.
  if (!charted.length || record.declarations.some(({ placeId }) => !placeId)) ids.push(`reference:${record.id}`)
  return ids
}
const recordDisposition = (record) => {
  const charted = record.declarations.some(({ placeId }) => placeId)
  const unlocated = record.declarations.some(({ placeId }) => !placeId) || !record.declarations.length
  return charted ? (unlocated ? 'charted-and-unlocated' : 'charted') : 'unlocated-reference'
}
const markerOffset = (id) => {
  let hash = 0
  for (const letter of id) hash = (hash * 31 + letter.charCodeAt(0)) >>> 0
  return [((hash % 5) - 2) * 7, 7, ((Math.floor(hash / 5) % 5) - 2) * 7]
}
const positionAt = (placeId, offset) => [NODE_POS[placeId][0] + offset[0], offset[1], NODE_POS[placeId][1] + offset[2]]
const descriptionOf = (record, item) => ({
  id: item.id, nodeId: item.nodeId || null, lineIndex: null, placeId: item.depiction ? null : placeOf(item.nodeId),
  regionId: !item.depiction && item.nodeId ? NODE_REGION[item.nodeId] || null : null,
  text: item.text, source: item.source, language: ['npc-portrait', 'item-action', 'item-use'].includes(record.category) ? 'sq' : 'en', reading: item.reading || null, tokenIds: item.tokenIds || [], conditions: item.conditions,
  role: item.depiction ? 'narrated-portrait' : record.category === 'npc-portrait' ? 'first-encounter-portrait' : 'reference-catalogue', environmentDimensions: [], observationId: null, npcIdentity: null,
  elementIds: [], bindings: [], classification: 'canonical-metadata', inventoryRecordId: record.id, authorityScope: record.authorityScope,
  ...(item.portraitConditions ? { portraitConditions: item.portraitConditions } : {}),
  ...(item.depiction ? { depiction: item.depiction } : {}),
})

/** No runtime state is imported. The result enumerates authored possibilities
 * once when the lazy atlas opens; it is never a current-presence projection. */
export function buildWorldScene3dInventory() {
  const sources = worldScene3dInventorySources()
  const elements = new Map()
  const descriptions = []
  const bindings = []
  const records = []
  const shelfX = Math.min(...Object.values(NODE_POS).map(([x]) => x)) - 170
  const shelfZ = Math.min(...Object.values(NODE_POS).map(([, z]) => z))
  let shelfIndex = 0
  for (const record of sources) {
    const elementIds = recordElementIds(record)
    const descriptionIds = [...record.statements.map(({ id }) => id), ...(record.existingDescriptionIds || [])]
    records.push({ ...record, disposition: recordDisposition(record), elementIds, descriptionIds })
    for (const id of elementIds) {
      if (id.startsWith('place:') || id.startsWith('item:') || elements.has(id)) continue
      const declaration = record.declarations.find((entry) => entry.placeId && sourceLocationElementId(record, entry) === id)
      const placeId = declaration?.placeId || null
      const npcId = record.metadata.npcId
      const runtimeActor = id.startsWith('actor:') && NPCS[npcId]
      const catalogue = !placeId
      const markerSource = runtimeActor
        ? { file: 'src/game/worldEntities.js', authority: 'WORLD_ENTITIES', key: `npc:${npcId}` }
        : record.source
      let position
      if (placeId) position = positionAt(placeId, runtimeActor ? [8, 6, -9] : markerOffset(id))
      else {
        position = [shelfX - (shelfIndex % 12) * 20, 8, shelfZ + Math.floor(shelfIndex / 12) * 20]
        shelfIndex++
      }
      elements.set(id, {
        id, kind: catalogue ? 'catalogue' : id.startsWith('actor:') ? 'actor' : id.startsWith('item-action:') ? 'item-action' : 'source-reference',
        label: runtimeActor ? NPCS[npcId].name : record.category === 'npc' ? NPC_REGISTRY[npcId].name : record.label,
        placeId, regionId: placeId ? NODE_REGION[placeId] || null : null, position,
        geometry: { shape: id.startsWith('actor:') ? 'cylinder' : 'box', size: id.startsWith('actor:') ? [4, 12, 4] : [5, 6, 5] },
        ...(catalogue ? { catalogue: true } : {}), descriptionIds: [], source: markerSource, entityId: record.entityId || null,
        authorityScope: record.authorityScope, inventoryRecordIds: [], conditional: true,
        interpretation: catalogue
          ? record.authorityScope === 'narrated-portrait'
            ? 'A portrait described in a song. Its rendering scene is a listening context, not a physical encounter; source place and beats remain reference metadata.'
            : 'Unlocated source/reference symbol. Planning, proposed and offstage records do not assert a physical chart location.'
          : record.authorityScope === 'source-timeline'
            ? 'Source-tale location reference across alternative beats, including backstory. This is not a simultaneous living actor or an assertion that this source event is playable.'
            : record.category === 'item-action'
              ? 'A possible item action at its exact source place. The item may be acquired, spent or carried here; it is not permanent scene furniture.'
              : 'A declared encounter or possible route stop. Identity and time alternatives remain source metadata; this marker does not assert present occupancy.',
      })
    }
    for (const elementId of elementIds) {
      const element = elements.get(elementId)
      if (element && !element.inventoryRecordIds.includes(record.id)) element.inventoryRecordIds.push(record.id)
    }
    for (const item of record.statements) descriptions.push(descriptionOf(record, item))
    for (const descriptionId of descriptionIds) for (const elementId of elementIds) {
      const binding = { descriptionId, elementId, type: 'inventory-source', evidence: { recordId: record.id, authorityScope: record.authorityScope, source: record.source } }
      bindings.push(binding)
    }
  }
  // Item blurbs should expose all known action locations, rather than ending
  // at an unlocated shelf. Their entity catalogue still preserves portability.
  for (const record of records.filter(({ category }) => category === 'item-action')) {
    const itemRecord = records.find(({ id }) => id === `item:${record.metadata.itemId}`)
    for (const elementId of record.elementIds) {
      if (!itemRecord.elementIds.includes(elementId)) itemRecord.elementIds.push(elementId)
      bindings.push({ descriptionId: `description:item:${record.metadata.itemId}:blurb`, elementId, type: 'inventory-item-location',
        evidence: { recordId: record.id, itemId: record.metadata.itemId, source: record.source } })
    }
  }
  return { elements: [...elements.values()], descriptions, bindings, records, coverage: inventoryCoverage(records) }
}

export function inventoryCoverage(records) {
  const count = (category) => records.filter((record) => record.category === category).length
  return {
    records: records.length, npcs: count('npc'), portraits: count('npc-portrait'), portraitDescriptions: records.filter(({ category }) => category === 'npc-portrait').reduce((n, record) => n + record.statements.length, 0),
    items: count('item'), itemActions: count('item-action'), carriedItemUses: count('item-use'),
    talePlaces: count('tale-place'), taleCast: count('tale-cast'), taleItems: count('tale-item'),
    chartedRecords: records.filter(({ disposition }) => ['charted', 'charted-and-unlocated'].includes(disposition)).length,
    unlocatedRecords: records.filter(({ disposition }) => ['unlocated-reference', 'charted-and-unlocated'].includes(disposition)).length,
    expectedRecordIds: records.map(({ id }) => id),
  }
}

/** The validator enumerates canonical source inventory directly, then checks
 * the submitted scene's identity, exact statements, conditions, declared
 * places and reciprocal evidence. It never accepts the builder's totals as
 * proof or invokes buildWorldScene3dInventory() to manufacture an oracle. */
export function validateWorldScene3dInventory(model) {
  const issues = []
  const problem = (id, message) => issues.push(`${id}: ${message}`)
  const inventory = model?.inventory || model
  const actualRecords = inventory?.records
  if (!Array.isArray(actualRecords)) return ['world-inventory: canonical inventory records are missing']
  const sourceRecords = worldScene3dInventorySources()
  const records = new Map()
  for (const record of actualRecords) {
    if (!record?.id || records.has(record.id)) problem(record?.id || 'world-inventory', 'missing or duplicate inventory record identity')
    else records.set(record.id, record)
  }
  const elements = new Map((model.elements || []).map((element) => [element.id, element]))
  const descriptions = new Map((model.descriptions || []).map((description) => [description.id, description]))
  const expectedIds = new Set(sourceRecords.map(({ id }) => id))
  const expectedBindings = new Map()
  const requireBinding = (descriptionId, elementId, type, evidence) => {
    const key = `${descriptionId}|${type}|${elementId}|${evidence.recordId}`
    expectedBindings.set(key, evidence)
    const description = descriptions.get(descriptionId)
    const actual = description?.bindings?.find((binding) => binding.elementId === elementId && binding.type === type && binding.evidence?.recordId === evidence.recordId)
    if (!actual || !same(actual.evidence, evidence)) problem(descriptionId, `missing or stale ${type} evidence for ${elementId}`)
    if (!description?.elementIds?.includes(elementId) || !elements.get(elementId)?.descriptionIds?.includes(descriptionId)) problem(descriptionId, `inventory source link to ${elementId} is not reciprocal`)
  }
  for (const expected of sourceRecords) {
    const actual = records.get(expected.id)
    if (!actual) { problem(expected.id, 'canonical inventory record is missing'); continue }
    for (const field of ['category', 'label', 'entityId', 'source', 'authorityScope', 'metadata', 'declarations', 'statements', 'existingDescriptionIds']) {
      if (!same(actual[field], expected[field])) problem(expected.id, `canonical ${field} differs from its exact source`)
    }
    if (actual.disposition !== recordDisposition(expected)) problem(expected.id, 'charted/unlocated disposition differs from source location evidence')
    const baseIds = recordElementIds(expected)
    const actionLocations = expected.category === 'item' ? unique(sourceRecords.filter((record) => record.category === 'item-action' && record.metadata.itemId === expected.metadata.itemId).flatMap(recordElementIds)) : []
    const elementIds = unique([...baseIds, ...actionLocations])
    if (!same(actual.elementIds, elementIds)) problem(expected.id, 'element coverage omits or invents a declared location')
    const descriptionIds = [...expected.statements.map(({ id }) => id), ...(expected.existingDescriptionIds || [])]
    if (!same(actual.descriptionIds, descriptionIds)) problem(expected.id, 'description coverage differs from its source fields')
    for (const elementId of elementIds) {
      const element = elements.get(elementId)
      if (!element) { problem(expected.id, `mapped element ${elementId} is missing`); continue }
      const declaration = expected.declarations.find((entry) => entry.placeId && sourceLocationElementId(expected, entry) === elementId)
      if (elementId.startsWith('reference:')) {
        if (element.kind !== 'catalogue' || !element.catalogue || element.placeId != null || element.regionId != null) problem(elementId, 'unlocated reference was promoted to a physical place')
      } else if (declaration) {
        if (element.placeId !== declaration.placeId || element.regionId !== NODE_REGION[declaration.placeId]) problem(elementId, 'geometry is attached to the wrong canonical place')
        if (elementId.startsWith('actor:')) {
          const offset = NPCS[expected.metadata.npcId] ? [8, 6, -9] : markerOffset(elementId)
          if (!same(element.position, positionAt(declaration.placeId, offset))) problem(elementId, 'actor marker position differs from its declared place')
          if (element.kind !== 'actor') problem(elementId, 'declared encounter is missing actor geometry')
        } else if (elementId.startsWith('item-action:') || elementId.startsWith('source:')) {
          if (!same(element.position, positionAt(declaration.placeId, markerOffset(elementId)))) problem(elementId, 'source marker position differs from its declared place')
          if (element.kind !== (elementId.startsWith('item-action:') ? 'item-action' : 'source-reference')) problem(elementId, 'item/source marker kind loses its authority boundary')
        }
      }
    }
    for (const item of expected.statements) {
      const description = descriptions.get(item.id)
      if (!description) { problem(item.id, 'canonical inventory description is missing'); continue }
      const expectedDescription = descriptionOf(expected, item)
      for (const field of ['nodeId', 'lineIndex', 'placeId', 'regionId', 'text', 'source', 'language', 'reading', 'tokenIds', 'conditions', 'role', 'environmentDimensions', 'observationId', 'npcIdentity', 'inventoryRecordId', 'authorityScope', 'portraitConditions', 'depiction']) {
        if (!same(description[field], expectedDescription[field])) problem(item.id, `canonical description ${field} is stale`)
      }
    }
    for (const descriptionId of descriptionIds) for (const elementId of baseIds) requireBinding(descriptionId, elementId, 'inventory-source',
      { recordId: expected.id, authorityScope: expected.authorityScope, source: expected.source })
    if (expected.category === 'item-action') for (const elementId of baseIds) requireBinding(`description:item:${expected.metadata.itemId}:blurb`, elementId, 'inventory-item-location',
      { recordId: expected.id, itemId: expected.metadata.itemId, source: expected.source })
  }
  // Enumerate the source owner of each generated marker independently of the
  // submitted scene. Shared actor/action markers retain every source record.
  const ownedElements = new Map()
  for (const record of sourceRecords) for (const id of recordElementIds(record)) {
    if (id.startsWith('place:') || id.startsWith('item:')) continue
    if (!ownedElements.has(id)) ownedElements.set(id, { record, recordIds: [] })
    ownedElements.get(id).recordIds.push(record.id)
  }
  const shelfX = Math.min(...Object.values(NODE_POS).map(([x]) => x)) - 170
  const shelfZ = Math.min(...Object.values(NODE_POS).map(([, z]) => z))
  let shelfIndex = 0
  for (const [id, { record, recordIds }] of ownedElements) {
    const element = elements.get(id)
    const declaration = record.declarations.find((entry) => entry.placeId && sourceLocationElementId(record, entry) === id)
    const placeId = declaration?.placeId || null
    const npcId = record.metadata.npcId
    const runtimeActor = id.startsWith('actor:') && NPCS[npcId]
    const catalogue = !placeId
    const position = placeId
      ? positionAt(placeId, runtimeActor ? [8, 6, -9] : markerOffset(id))
      : [shelfX - (shelfIndex % 12) * 20, 8, shelfZ + Math.floor(shelfIndex / 12) * 20]
    if (catalogue) shelfIndex++
    if (!element) { problem(id, 'canonical inventory marker is missing'); continue }
    const expected = {
      kind: catalogue ? 'catalogue' : id.startsWith('actor:') ? 'actor' : id.startsWith('item-action:') ? 'item-action' : 'source-reference',
      label: runtimeActor ? NPCS[npcId].name : record.category === 'npc' ? NPC_REGISTRY[npcId].name : record.label,
      placeId, regionId: placeId ? NODE_REGION[placeId] || null : null, position,
      geometry: { shape: id.startsWith('actor:') ? 'cylinder' : 'box', size: id.startsWith('actor:') ? [4, 12, 4] : [5, 6, 5] },
      source: runtimeActor ? { file: 'src/game/worldEntities.js', authority: 'WORLD_ENTITIES', key: `npc:${npcId}` } : record.source,
      entityId: record.entityId || null, authorityScope: record.authorityScope, inventoryRecordIds: recordIds, conditional: true,
    }
    for (const [field, value] of Object.entries(expected)) if (!same(element[field], value)) problem(id, `inventory marker ${field} differs from its canonical source`)
    if (Boolean(element.catalogue) !== catalogue) problem(id, 'reference catalogue classification differs from the source location')
    const interpretation = catalogue
      ? record.authorityScope === 'narrated-portrait'
        ? 'A portrait described in a song. Its rendering scene is a listening context, not a physical encounter; source place and beats remain reference metadata.'
        : 'Unlocated source/reference symbol. Planning, proposed and offstage records do not assert a physical chart location.'
      : record.authorityScope === 'source-timeline'
        ? 'Source-tale location reference across alternative beats, including backstory. This is not a simultaneous living actor or an assertion that this source event is playable.'
        : record.category === 'item-action'
          ? 'A possible item action at its exact source place. The item may be acquired, spent or carried here; it is not permanent scene furniture.'
          : 'A declared encounter or possible route stop. Identity and time alternatives remain source metadata; this marker does not assert present occupancy.'
    // Older explicitly witnessed runtime actors keep their already-reviewed
    // interpretation; new inventory metadata adds the broader declaration.
    const existingRuntimeInterpretation = runtimeActor && element.interpretation === 'A possible canonical NPC route stop, not an assertion that the actor is here in every state.'
    if (element.interpretation !== interpretation && !existingRuntimeInterpretation) problem(id, 'inventory marker interpretation loses its presence/reference boundary')
  }
  for (const id of records.keys()) if (!expectedIds.has(id)) problem(id, 'inventory record has no canonical source')
  for (const description of descriptions.values()) for (const binding of description.bindings || []) {
    if (!binding.type?.startsWith('inventory-')) continue
    const key = `${description.id}|${binding.type}|${binding.elementId}|${binding.evidence?.recordId}`
    if (!expectedBindings.has(key) || !same(binding.evidence, expectedBindings.get(key))) problem(description.id, `inventory binding invents or alters evidence for ${binding.elementId}`)
  }
  if (!same(inventory.coverage, inventoryCoverage(actualRecords))) problem('world-inventory', 'inventory coverage counters or exact record identities are stale')
  return issues
}
