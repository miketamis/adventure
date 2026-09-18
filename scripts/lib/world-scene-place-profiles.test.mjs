import assert from 'node:assert/strict'
import { STORY } from '../../src/game/content.js'
import { PLACE_NODES } from '../../src/components/nodePositions.js'
import {
  WORLD_SCENE_3D_PLACE_FEATURES,
  WORLD_SCENE_3D_PLACE_PROFILES,
} from '../../src/game/data/worldScene3dPlaceFeatures.js'
import { validateWorldScene3dPlaceProfiles } from '../../src/game/worldScene3dPlaceProfiles.js'

// Called by the existing whole-world release audit with its actual production
// model. These probes corrupt the exported model; they do not substitute a
// synthetic scene for production inventory coverage.
export function runWorldScenePlaceProfileAssertions(model) {
  assert.deepEqual(validateWorldScene3dPlaceProfiles(model), [], 'production physical-place profiles are incomplete or inconsistent')
  assert.deepEqual(model.placeProfiles.map(({ placeId }) => placeId).sort(),
    Object.keys(PLACE_NODES).sort(), 'every canonical charted place needs one visible profile')
  assert.equal(model.placeProfiles.length, WORLD_SCENE_3D_PLACE_PROFILES.length)
  for (const feature of WORLD_SCENE_3D_PLACE_FEATURES) {
    assert.ok(model.elements.some(({ id, kind, catalogue }) => id === `feature:${feature.id}` && kind === 'feature' && !catalogue),
      `${feature.id}: a registry entry without actual mapped geometry is not coverage`)
  }
  assert.ok(model.placeProfiles.some(({ disposition }) => disposition === 'source-limited'), 'unwitnessed terrain remains an explicit limitation')
  assert.ok(model.placeProfiles.filter(({ disposition }) => disposition === 'source-limited').every(({ featureIds, review }) => !featureIds.length && review?.evidence?.text),
    'a source limitation must stay evidence-backed and must not masquerade as physical geometry')

  const local = (changed, placeId) => changed.placeProfiles.find((profile) => profile.placeId === placeId)
  const gap = model.placeProfiles.find(({ disposition }) => disposition === 'source-limited').placeId
  const firstFeature = WORLD_SCENE_3D_PLACE_FEATURES[0]
  const firstFeatureId = `feature:${firstFeature.id}`
  const probes = [
    ['missing place inventory', (changed) => { delete changed.placeProfiles }],
    ['missing physical place', (changed) => { changed.placeProfiles = changed.placeProfiles.filter(({ placeId }) => placeId !== 'prespaPyll') }],
    ['duplicate physical place', (changed) => { changed.placeProfiles.push(structuredClone(local(changed, 'prespaPyll'))) }],
    ['invented uncharted destination', (changed) => { changed.placeProfiles.push({ ...structuredClone(local(changed, 'prespaPyll')), placeId: 'maroPrincesha' }) }],
    ['unknown physical place', (changed) => { changed.placeProfiles.push({ ...structuredClone(local(changed, 'prespaPyll')), placeId: 'invented-place' }) }],
    ['missing place marker', (changed) => { changed.elements = changed.elements.filter(({ id }) => id !== 'place:prespaPyll') }],
    ['missing rendered feature', (changed) => { changed.elements = changed.elements.filter(({ id }) => id !== firstFeatureId) }],
    ['catalogue-only geometry', (changed) => { changed.elements.find(({ id }) => id === firstFeatureId).catalogue = true }],
    ['missing crossing shores', (changed) => { changed.elements.find(({ id }) => id === 'feature:village-bridge').placeIds = [] }],
    ['crossing collapsed onto one shore', (changed) => { changed.elements.find(({ id }) => id === 'feature:village-bridge').placeId = 'start' }],
    ['wrong feature location', (changed) => { changed.elements.find(({ id }) => id === firstFeatureId).placeId = 'prespaPyll' }],
    ['unreviewed remote feature', (changed) => { local(changed, 'prespaPyll').featureIds.push('square-well') }],
    ['missing reciprocal view binding', (changed) => { const description = changed.descriptions.find(({ id }) => id === 'description:gjarperRefuz:2'); description.bindings = description.bindings.filter(({ type }) => type !== 'reviewed-place-view') }],
    ['missing reverse view link', (changed) => { const element = changed.elements.find(({ id }) => id === 'feature:place-bota2-palace'); element.descriptionIds = element.descriptionIds.filter((id) => id !== 'description:gjarperRefuz:2') }],
    ['missing forward view link', (changed) => { const description = changed.descriptions.find(({ id }) => id === 'description:gjarperRefuz:2'); description.elementIds = description.elementIds.filter((id) => id !== 'feature:place-bota2-palace') }],
    ['missing exact remote view', (changed) => { delete local(changed, 'gjarperRefuz').associations }],
    ['stale remote-view quote', (changed) => { local(changed, 'gjarperRefuz').associations[0].witness.text += ' invented' }],
    ['stale remote-view condition', (changed) => { local(changed, 'gjarperRefuz').associations[0].witness.conditions.all.push('fact:invented') }],
    ['unsupported remote-view sense', (changed) => { local(changed, 'gjarperRefuz').associations[0].witness.requires = ['not-a-sense'] }],
    ['unused remote association', (changed) => { local(changed, 'gjarperRefuz').associations[0].featureId = 'square-well' }],
    ['duplicate remote association', (changed) => { local(changed, 'gjarperRefuz').associations.push(structuredClone(local(changed, 'gjarperRefuz').associations[0])) }],
    ['missing gap owner', (changed) => { delete local(changed, gap).review.owner }],
    ['broad gap target', (changed) => { local(changed, gap).review.target = [gap, 'prespaPyll'] }],
    ['stale gap evidence', (changed) => { local(changed, gap).review.evidence.text += ' invented' }],
    ['stale gap evidence source', (changed) => { local(changed, gap).review.source.path = 'STORY.*.text[*]' }],
    ['missing gap context', (changed) => { delete local(changed, gap).review.context }],
    ['missing gap context line', (changed) => { local(changed, gap).review.context.scenes[0].lines.pop() }],
    ['stale gap context text', (changed) => { local(changed, gap).review.context.scenes[0].lines[0].text += ' invented' }],
    ['stale gap context conditions', (changed) => { local(changed, gap).review.context.scenes[0].lines[0].conditions.all.push('fact:unreviewed') }],
    ['stale gap node membership', (changed) => { local(changed, gap).review.context.nodeIds.push('pallatiZi') }],
    ['missing view provenance', (changed) => { delete local(changed, 'gjarperRefuz').associations[0].provenance }],
    ['changed view predecessor', (changed) => { local(changed, 'gjarperRefuz').associations[0].provenance.routes[0].nodeId = 'pallatiZi' }],
    ['changed view route target', (changed) => { local(changed, 'gjarperRefuz').associations[0].provenance.routes[0].to = 'pallatiZi' }],
    ['view invents direct physical path', (changed) => { local(changed, 'fshatiBesa').associations[0].provenance.kind = 'outgoing-approach' }],
    ['empty gap scope', (changed) => { local(changed, gap).review.scope = '' }],
    ['false geometry certification', (changed) => { local(changed, gap).disposition = 'depicted'; delete local(changed, gap).review }],
    ['unused source limitation', (changed) => { local(changed, 'prespaPyll').review = structuredClone(local(changed, gap).review) }],
    ['geometry hidden behind limitation', (changed) => { local(changed, gap).featureIds.push(firstFeature.id) }],
    ['duplicate feature reference', (changed) => { local(changed, 'prespaPyll').featureIds.push(local(changed, 'prespaPyll').featureIds[0]) }],
    ['missing profile feature references', (changed) => { local(changed, 'prespaPyll').featureIds = null }],
    ['changed reviewed material', (changed) => { changed.elements.find(({ id }) => id === firstFeatureId).color = '#000000' }],
    ['changed reviewed depiction', (changed) => { changed.elements.find(({ id }) => id === firstFeatureId).depiction = 'invented-castle' }],
  ]
  for (const [label, mutate] of probes) {
    const changed = structuredClone({ elements: model.elements, descriptions: model.descriptions, placeProfiles: model.placeProfiles })
    mutate(changed)
    assert.ok(validateWorldScene3dPlaceProfiles(changed).length > 0, `${label}: corrupt profile passed the release validator`)
  }
  // Change the live source while leaving model and reviewed records untouched:
  // this exercises the substantive context/edge checks rather than relying on
  // exported-record equality. Restore immediately before any other audit runs.
  const originalLines = STORY.behuriFund.text.length
  try {
    STORY.behuriFund.text.push(structuredClone(STORY.pallatiZi.text[0]))
    assert.ok(validateWorldScene3dPlaceProfiles(model).some((issue) => issue.includes(`STORY.behuriFund.text[${originalLines}]`) && issue.includes('new scene line')),
      'a new local castle description must invalidate the exact place limitation and identify its line')
  } finally { STORY.behuriFund.text.length = originalLines }
  const departure = STORY.gjarperOrigin.options[1], originalTo = departure.to
  try {
    departure.to = 'gjarperKulshedra'
    assert.ok(validateWorldScene3dPlaceProfiles(model).some((issue) => issue.includes('gjarperOrigin.options[1]') && issue.includes('changed')),
      'a changed canonical departure target must invalidate the unchanged palace-view quotation')
  } finally { departure.to = originalTo }
  const originalOptions = STORY.pallatiZi.options.length
  try {
    STORY.pallatiZi.options.push({ ...STORY.gjarperOrigin.options[1] })
    assert.ok(validateWorldScene3dPlaceProfiles(model).some((issue) => issue.includes('gjarperRefuz') && issue.includes('new or removed incoming choice')),
      'a new incoming departure must not inherit an unchecked palace identity')
  } finally { STORY.pallatiZi.options.length = originalOptions }
  assert.deepEqual(validateWorldScene3dPlaceProfiles(model), [], 'source corruption probes must restore canonical production data')
  return { places: model.placeProfiles.length, addedFeatures: WORLD_SCENE_3D_PLACE_FEATURES.length, corruptions: probes.length + 3 }
}
