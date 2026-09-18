// Pure, record-level validation of the reviewed place inventory. A profile
// cannot replace an actual mesh, invent a local object from a distant mention,
// or turn an explicit source limitation into a complete geometry claim.
import { STORY, lineOf } from './content.js'
import { albanianTextOf } from './language.js'
import { PLACE_NODES, PLACE_OF } from '../components/nodePositions.js'
import { routeForChoice } from './worldModel.js'
import { WORLD_BARRIERS } from './worldBarriers.js'
import { observationIdOfLine } from './observations.js'
import { WORLD_SCENE_3D_FEATURES } from './data/worldScene3dFeatures.js'
import {
  WORLD_SCENE_3D_PLACE_FEATURES,
  WORLD_SCENE_3D_PLACE_PROFILES,
} from './data/worldScene3dPlaceFeatures.js'

const list = (value) => value == null ? [] : [].concat(value)
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const hasExactKeys = (value, keys) => record(value) && equal(Object.keys(value).sort(), [...keys].sort())
const featureDefinitions = [...WORLD_SCENE_3D_FEATURES, ...WORLD_SCENE_3D_PLACE_FEATURES]
const featureById = new Map(featureDefinitions.map((feature) => [feature.id, feature]))
const profileById = new Map(WORLD_SCENE_3D_PLACE_PROFILES.map((profile) => [profile.placeId, profile]))

// This is a source-metadata projection, not a second evaluator for gameplay
// conditions. Negated conjunctions and observation gates remain verbatim.
function sourceConditions(entry) {
  const line = lineOf(entry)
  return {
    all: Array.isArray(entry) ? [] : list(entry.cond),
    negate: !Array.isArray(entry) && Boolean(entry.negate),
    none: Array.isArray(entry) ? [] : list(entry.none),
    observationId: observationIdOfLine(line),
  }
}

function crossingIncludes(feature, placeId) {
  const placement = feature?.placement
  if (!placement || !['crossing', 'crossing-center'].includes(placement.kind)) return false
  const crossing = WORLD_BARRIERS.find(({ id }) => id === placement.barrierId)?.crossings?.[placement.crossingIndex]
  return crossing?.edge.some((nodeId) => PLACE_OF[nodeId] === placeId) || false
}

export function validateWorldScene3dPlaceProfiles(model) {
  const issues = []
  const problem = (id, message) => issues.push(`${id}: ${message}`)
  const elements = new Map((Array.isArray(model?.elements) ? model.elements : []).map((element) => [element.id, element]))
  const descriptions = new Map((Array.isArray(model?.descriptions) ? model.descriptions : []).map((description) => [description.id, description]))
  const profiles = Array.isArray(model?.placeProfiles) ? model.placeProfiles : []
  if (!Array.isArray(model?.placeProfiles)) problem('place-profiles', 'complete reviewed place profiles are missing')

  function checkWitness(witness, target, { placeId, requireTokens = true } = {}) {
    if (!record(witness) || !nonempty(witness.nodeId) || !Number.isInteger(witness.lineIndex) || witness.lineIndex < 0) {
      problem(target, 'review evidence must identify one exact story line')
      return
    }
    const entry = STORY[witness.nodeId]?.text?.[witness.lineIndex]
    if (!entry) { problem(target, 'review evidence points to a missing story line'); return }
    const line = lineOf(entry)
    if (witness.text !== albanianTextOf(line) || !equal(witness.conditions, sourceConditions(entry))) problem(target, 'exact review evidence text or conditions are stale')
    if (placeId && PLACE_OF[witness.nodeId] !== placeId) problem(target, 'local review evidence belongs to another canonical physical place')
    if (requireTokens) {
      const tokenIds = new Set(line.filter((token) => token.id).map((token) => token.id))
      if (!Array.isArray(witness.requires) || !witness.requires.length || new Set(witness.requires).size !== witness.requires.length
        || witness.requires.some((id) => !nonempty(id) || !tokenIds.has(id))) problem(target, 'physical witness lacks exact non-duplicate supporting senses')
    }
  }

  if (featureById.size !== featureDefinitions.length) problem('place-features', 'duplicate reviewed feature identity')
  if (profileById.size !== WORLD_SCENE_3D_PLACE_PROFILES.length) problem('place-profiles', 'duplicate canonical profile identity')
  for (const placeId of Object.keys(PLACE_NODES)) {
    if (!profileById.has(placeId)) problem(`place:${placeId}`, 'canonical place has no reviewed depiction profile')
  }

  const seen = new Set(), usedFeatures = new Set(), seenReviewIds = new Set()
  for (const profile of profiles) {
    const target = `place-profile:${profile?.placeId || '?'}`
    if (!record(profile) || !nonempty(profile.placeId)) { problem(target, 'malformed place profile'); continue }
    if (seen.has(profile.placeId)) problem(target, 'duplicate place profile')
    seen.add(profile.placeId)
    const definition = profileById.get(profile.placeId)
    if (!definition || !PLACE_NODES[profile.placeId]) { problem(target, 'profile does not belong to a canonical charted place'); continue }
    // Equality is per reviewed record, with independent live source checks
    // below. There is no project-wide seal to renew when prose changes.
    if (!equal(profile, definition)) problem(target, 'reviewed profile fields are missing, stale or outside their bounded scope')
    const marker = elements.get(`place:${profile.placeId}`)
    if (!marker || marker.kind !== 'place' || marker.placeId !== profile.placeId) problem(target, 'profile has no actual canonical place marker')
    if (!nonempty(profile.rationale)) problem(target, 'place depiction needs a concrete reviewed rationale')
    if (!Array.isArray(profile.featureIds) || new Set(profile.featureIds).size !== profile.featureIds.length
      || profile.featureIds.some((id) => !nonempty(id))) { problem(target, 'feature references must be a non-duplicate array'); continue }
    const associations = profile.associations ?? []
    if (!Array.isArray(associations)) { problem(target, 'cross-place associations must be an array'); continue }
    const associationIds = new Set()
    for (const association of associations) {
      if (!hasExactKeys(association, ['featureId', 'kind', 'rationale', 'witness', 'provenance'])
        || association.kind !== 'visible-from' || !nonempty(association.rationale)) {
        problem(target, 'cross-place view needs exact kind, feature, local witness and rationale'); continue
      }
      if (associationIds.has(association.featureId)) problem(target, 'duplicate cross-place view association')
      associationIds.add(association.featureId)
      const feature = featureById.get(association.featureId)
      if (!profile.featureIds.includes(association.featureId) || !feature) problem(target, 'cross-place view association is unused or targets an unknown feature')
      if (feature && (PLACE_OF[feature.nodeId] === profile.placeId || crossingIncludes(feature, profile.placeId))) problem(target, 'cross-place view exception is stale because the feature is already local or spans this shore')
      const provenance = association.provenance
      if (!hasExactKeys(provenance, ['kind', 'routes', 'limitation']) || !['incoming-departure', 'outgoing-approach', 'semantic-view'].includes(provenance?.kind)
        || !Array.isArray(provenance?.routes) || !provenance.routes.length || !nonempty(provenance?.limitation)) {
        problem(target, `view of ${association.featureId} needs bounded exact route provenance`)
      } else {
        const routeIds = new Set()
        if (provenance.kind === 'incoming-departure' || provenance.kind === 'semantic-view') {
          const sourceNodes = new Set(provenance.routes.map(({ nodeId }) => nodeId))
          const actualIncoming = Object.entries(STORY).flatMap(([nodeId, node]) => (node.options || []).flatMap((option, optionIndex) =>
            !option.confuser && option.to === association.witness?.nodeId && (provenance.kind === 'incoming-departure' || sourceNodes.has(nodeId))
              ? [`${nodeId}:${optionIndex}`] : [])).sort()
          const reviewedIncoming = provenance.routes.map(({ nodeId, optionIndex }) => `${nodeId}:${optionIndex}`).sort()
          if (!equal(actualIncoming, reviewedIncoming)) problem(target, `view of ${association.featureId} has a new or removed incoming choice; review its exact departure/observer context`)
        }
        for (const reviewed of provenance.routes) {
          const routeTarget = `${target}:${reviewed?.nodeId}.options[${reviewed?.optionIndex}]`
          if (!hasExactKeys(reviewed, ['nodeId', 'optionIndex', 'to', 'text', 'requires', 'unless', 'fromPlace', 'toPlace', 'kind'])
            || !Number.isInteger(reviewed?.optionIndex) || reviewed.optionIndex < 0) {
            problem(routeTarget, 'view route must identify one exact canonical choice'); continue
          }
          const routeId = `${reviewed.nodeId}:${reviewed.optionIndex}`
          if (routeIds.has(routeId)) problem(routeTarget, 'duplicate view route witness')
          routeIds.add(routeId)
          const option = STORY[reviewed.nodeId]?.options?.[reviewed.optionIndex]
          const canonical = option && routeForChoice(reviewed.nodeId, option)
          if (!option || option.confuser || !canonical?.valid || !canonical.spatial || canonical.samePlace || canonical.projection) {
            problem(routeTarget, 'view provenance no longer follows a real physical choice'); continue
          }
          const actual = { nodeId: reviewed.nodeId, optionIndex: reviewed.optionIndex, to: option.to,
            text: albanianTextOf(option.text), requires: list(option.requires), unless: list(option.unless),
            fromPlace: canonical.fromPlace, toPlace: canonical.toPlace, kind: canonical.kind }
          if (!equal(reviewed, actual)) problem(routeTarget, 'exact view route target, wording, requirements or canonical physical relation changed')
          const featurePlace = feature && PLACE_OF[feature.nodeId]
          if (provenance.kind === 'incoming-departure' && (canonical.fromPlace !== featurePlace || canonical.toPlace !== profile.placeId)) problem(routeTarget, 'departure does not leave this exact feature place for the observer')
          if (provenance.kind === 'outgoing-approach' && (canonical.fromPlace !== profile.placeId || canonical.toPlace !== featurePlace)) problem(routeTarget, 'approach does not reach this exact feature place from the observer')
          if (provenance.kind === 'semantic-view' && canonical.toPlace !== profile.placeId) problem(routeTarget, 'semantic view route does not establish the observer location; it cannot prove an invented path to the landmark')
        }
      }
      checkWitness(association.witness, `${target}:${association.featureId}`, { placeId: profile.placeId })
      const witness = association.witness
      const descriptionId = `description:${witness?.nodeId}:${witness?.lineIndex}`
      const elementId = `feature:${association.featureId}`
      const description = descriptions.get(descriptionId), element = elements.get(elementId)
      const expectedBinding = { elementId, type: 'reviewed-place-view', evidence: {
        placeId: profile.placeId, featureId: association.featureId,
        source: { file: 'src/game/content.js', authority: 'STORY', kind: 'story-line', nodeId: witness?.nodeId,
          lineIndex: witness?.lineIndex, path: `STORY.${witness?.nodeId}.text[${witness?.lineIndex}]` },
        rationale: association.rationale,
      } }
      if (!description?.bindings?.some((binding) => equal(binding, expectedBinding))
        || !description?.elementIds?.includes(elementId) || !element?.descriptionIds?.includes(descriptionId)) problem(target, `view of ${association.featureId} lacks exact reciprocal source-to-mesh bindings`)
      if (description && (description.text !== witness?.text || !equal(description.conditions, witness?.conditions))) problem(target, `exported view source for ${association.featureId} differs from the exact local witness`)
    }
    for (const featureId of profile.featureIds) {
      const feature = featureById.get(featureId)
      const element = elements.get(`feature:${featureId}`)
      if (!feature || !element || element.kind !== 'feature' || element.featureId !== featureId || element.catalogue) {
        problem(target, `referenced physical feature ${featureId} is missing from the actual world`)
        continue
      }
      usedFeatures.add(featureId)
      if (feature.placement && ['crossing', 'crossing-center'].includes(feature.placement.kind)) {
        const crossing = WORLD_BARRIERS.find(({ id }) => id === feature.placement.barrierId)?.crossings?.[feature.placement.crossingIndex]
        const expectedPlaces = [...new Set(crossing?.edge.map((nodeId) => PLACE_OF[nodeId]) || [])]
        if (element.placeId !== null || !expectedPlaces.length || !equal(element.placeIds, expectedPlaces)) problem(target, `crossing feature ${featureId} does not preserve its exact canonical shores`)
      } else if (element.placeId !== PLACE_OF[feature.nodeId]) problem(target, `feature ${featureId} is assigned to the wrong physical place`)
      if (PLACE_OF[feature.nodeId] !== profile.placeId && !crossingIncludes(feature, profile.placeId) && !associationIds.has(featureId)) problem(target, `feature ${featureId} is remote without an exact reviewed local view`)
    }
    if (profile.disposition === 'depicted') {
      if (!profile.featureIds.length || profile.review) problem(target, 'depicted place needs physical geometry and may not carry an unused source limitation')
    } else if (profile.disposition === 'source-limited') {
      if (profile.featureIds.length || associations.length) problem(target, 'source limitation cannot grow to cover already depicted geometry or remote views')
      const review = profile.review
      const requiredKeys = ['id', 'rule', 'target', 'owner', 'scope', 'reviewTrigger', 'rationale', 'source', 'evidence', 'context']
      if (!hasExactKeys(review, requiredKeys) || requiredKeys.filter((key) => !['source', 'evidence', 'context'].includes(key)).some((key) => !nonempty(review?.[key]))) {
        problem(target, 'source limitation needs a stable rule and target, rationale, evidence/source, owner, review trigger and bounded scope')
        continue
      }
      if (review.id !== `fixed-feature-gap:${profile.placeId}` || review.rule !== 'no-invented-fixed-feature' || review.target !== profile.placeId) problem(target, 'source limitation identity or exact target differs')
      if (seenReviewIds.has(review.id)) problem(target, 'duplicate source limitation review')
      seenReviewIds.add(review.id)
      if (review.rationale !== profile.rationale) problem(target, 'source limitation rationale differs from its visible profile')
      const expectedSource = { file: 'src/game/content.js', nodeId: review.evidence?.nodeId, lineIndex: review.evidence?.lineIndex,
        path: `STORY.${review.evidence?.nodeId}.text[${review.evidence?.lineIndex}]` }
      if (!equal(review.source, expectedSource)) problem(target, 'source limitation source does not identify its exact evidence line')
      checkWitness(review.evidence, target, { placeId: profile.placeId, requireTokens: false })
      const context = review.context, canonicalNodes = PLACE_NODES[profile.placeId]
      if (!hasExactKeys(context, ['nodeIds', 'scenes']) || !Array.isArray(context?.nodeIds) || !Array.isArray(context?.scenes)) {
        problem(target, 'source limitation is missing its exact per-place scene context')
      } else {
        if (!equal(context.nodeIds, canonicalNodes)) problem(target, 'source limitation canonical node membership changed; review this exact place')
        const sceneIds = new Set()
        for (const scene of context.scenes) {
          const sceneTarget = `${target}:STORY.${scene?.nodeId}`
          if (!hasExactKeys(scene, ['nodeId', 'lines']) || !nonempty(scene?.nodeId) || !Array.isArray(scene?.lines)) {
            problem(sceneTarget, 'malformed source limitation scene context'); continue
          }
          if (sceneIds.has(scene.nodeId)) problem(sceneTarget, 'duplicate source limitation scene context')
          sceneIds.add(scene.nodeId)
          if (!canonicalNodes.includes(scene.nodeId)) { problem(sceneTarget, 'source limitation scene lies outside the exact place'); continue }
          const actualLines = STORY[scene.nodeId]?.text || []
          for (let index = 0; index < Math.max(actualLines.length, scene.lines.length); index++) {
            const lineTarget = `${sceneTarget}.text[${index}]`, snapshot = scene.lines[index], entry = actualLines[index]
            if (!snapshot) { problem(lineTarget, 'new scene line has no local feature limitation review'); continue }
            if (!entry) { problem(lineTarget, 'source limitation context contains a removed scene line'); continue }
            if (!hasExactKeys(snapshot, ['lineIndex', 'text', 'conditions']) || snapshot.lineIndex !== index) problem(lineTarget, 'source limitation context line identity is missing, duplicated or reordered')
            if (snapshot.text !== albanianTextOf(lineOf(entry)) || !equal(snapshot.conditions, sourceConditions(entry))) problem(lineTarget, 'local scene text or conditions changed; review this exact feature limitation')
          }
        }
        for (const nodeId of canonicalNodes) if (!sceneIds.has(nodeId)) problem(`${target}:STORY.${nodeId}`, 'canonical scene is absent from the local feature limitation context')
      }
      if (featureDefinitions.some((feature) => PLACE_OF[feature.nodeId] === profile.placeId)) problem(target, 'source limitation is unused because this place now has reviewed local geometry')
    } else problem(target, 'unsupported place depiction disposition')
  }
  for (const profile of WORLD_SCENE_3D_PLACE_PROFILES) if (!seen.has(profile.placeId)) problem(`place-profile:${profile.placeId}`, 'reviewed place profile is missing from the model')
  for (const feature of featureDefinitions) {
    if (!usedFeatures.has(feature.id)) problem(`feature:${feature.id}`, 'reviewed physical feature is orphaned from the place inventory')
  }
  for (const feature of WORLD_SCENE_3D_PLACE_FEATURES) {
    const target = `feature:${feature.id}`
    if (!Array.isArray(feature.witnesses) || !feature.witnesses.length) problem(target, 'place feature needs a reviewed physical source')
    for (const witness of feature.witnesses || []) checkWitness(witness, target, { placeId: PLACE_OF[feature.nodeId] })
    if (!/^#[\da-fA-F]{6}$/.test(feature.color) || !nonempty(feature.depiction)) problem(target, 'place depiction needs explicit reviewed material color and depiction type')
    const element = elements.get(target)
    if (element && (element.color !== feature.color || element.depiction !== feature.depiction)) problem(target, 'rendered feature material or depiction differs from its reviewed profile')
  }
  return issues
}
