// One canonical payload for the repository's projection/integration review.
// Keep this in a shared module: beatscoverage and lorecertainty must fingerprint
// exactly the same player-facing lore, not two subtly different subsets.
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const INTEGRATION_SOURCE_FILES = Object.freeze({
  appShell: '../src/App.jsx',
  achievementsRenderer: '../src/components/AchievementsView.jsx',
  atlasRenderer: '../src/components/AtlasView.jsx',
  comprehensionRenderer: '../src/components/ComprehensionTest.jsx',
  comprehensionModel: '../src/game/comprehension.js',
  contentModel: '../src/game/content.js',
  debugWorldRenderer: '../src/components/DebugView.jsx',
  embodimentConfirmRenderer: '../src/components/EmbodimentConfirm.jsx',
  embodimentFocusRenderer: '../src/components/EmbodimentFocus.jsx',
  embodimentModel: '../src/game/embodiment.js',
  environmentModel: '../src/game/environment.js',
  factoidLoreRenderer: '../src/components/FactoidLore.jsx',
  gameStateModel: '../src/game/gameState.js',
  guideRenderer: '../src/components/GuideView.jsx',
  languageModel: '../src/game/language.js',
  liveNpcModel: '../src/game/npcs.js',
  mapGlyphs: '../src/components/mapGlyphs.jsx',
  mapLabels: '../src/components/mapLabels.js',
  miniMap: '../src/components/MiniMap.jsx',
  nodePositions: '../src/components/nodePositions.js',
  placeMetadata: '../src/components/placeMeta.js',
  quoteRegister: '../src/game/quotes.js',
  regionModel: '../src/game/regions.js',
  releaseErrorBoundary: '../src/components/ReleaseErrorBoundary.jsx',
  revealResolver: '../src/game/revealResolver.js',
  revealVisibility: '../src/game/revealVisibility.js',
  storyRenderer: '../src/components/StoryView.jsx',
  timePassageRenderer: '../src/components/TimePassage.jsx',
  tokenRenderer: '../src/components/Token.jsx',
  worldContextRenderer: '../src/components/WorldContext.jsx',
  worldMapRenderer: '../src/components/WorldMapView.jsx',
  worldModel: '../src/game/worldModel.js',
})

const integrationSources = Object.fromEntries(Object.entries(INTEGRATION_SOURCE_FILES).map(
  ([name, path]) => [name, { path, source: readFileSync(new URL(path, import.meta.url), 'utf8') }],
))

const stable = (value) => {
  if (Array.isArray(value)) return value.map(stable)
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, stable(value[key])]),
  )
  return value
}

const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const mappedBeatIds = (mapped) => Array.isArray(mapped) ? mapped : [mapped]

// Canonical, per-item payloads for projection dispositions. The stored
// digest for an omission binds the exact source beat plus the precise way the
// current projection does (or does not) expose it. A proposed-place digest
// binds the complete anchor claim and the projection scope in which it remains
// unbuilt. Including the unique tale/item ids makes copied review hashes fail.
export const omissionReviewContextPayload = (tale, beatId) => {
  const beat = (tale?.beats || []).find((item) => item.id === beatId)
  const ordered = (tale?.beats || []).map((item) => item.id)
  const entryIndex = ordered.indexOf(tale?.play?.entry)
  const finaleId = tale?.play?.finale || ordered.at(-1)
  const finaleIndex = ordered.indexOf(finaleId)
  const sceneNodes = Object.entries(tale?.play?.scenes || {})
    .filter(([, mapped]) => mappedBeatIds(mapped).includes(beatId))
    .map(([node]) => node)
    .sort()
  const learnRoutes = tale?.play?.learn?.[beatId] || []
  const divergenceNotes = (tale?.play?.divergences || [])
    .filter((item) => item.beat === beatId)
    .map((item) => item.note)
  return stable({
    schema: 1,
    kind: 'omitted-source-beat',
    taleId: tale?.id,
    beat: beat ? { id: beat.id, title: beat.title, note: beat.note, lines: beat.lines } : null,
    projection: {
      declared: tale?.play ? 'play' : tale?.projection?.status || 'undeclared',
      entry: tale?.play?.entry,
      finale: finaleId,
      stance: tale?.play?.stance,
      role: tale?.play?.role,
      inPlayableSpan: entryIndex !== -1 && finaleIndex !== -1 && entryIndex <= ordered.indexOf(beatId) && ordered.indexOf(beatId) <= finaleIndex,
      representation: sceneNodes.length ? 'enacted' : learnRoutes.length ? 'learned' : 'not-enacted-or-learned',
      sceneNodes,
      learnRoutes,
      divergenceNotes,
    },
  })
}

export const placeReviewContextPayload = (tale, placeId) => {
  const place = (tale?.places || []).find((item) => item.id === placeId)
  const anchor = place?.anchor
  return stable({
    schema: 1,
    kind: 'proposed-unbuilt-place',
    taleId: tale?.id,
    place: place ? {
      id: place.id,
      name: place.name,
      note: place.note,
      anchor: anchor ? {
        status: anchor.status,
        node: anchor.node,
        mirror: anchor.mirror,
        mold: anchor.mold,
        proposal: anchor.proposal,
        conflicts: anchor.conflicts,
        sharedWith: anchor.sharedWith,
      } : null,
    } : null,
    projection: {
      declared: tale?.play ? 'play' : tale?.projection?.status || 'undeclared',
      entry: tale?.play?.entry,
      finale: tale?.play?.finale || tale?.beats?.at(-1)?.id,
      stance: tale?.play?.stance,
      role: tale?.play?.role,
      buildStatus: anchor?.status,
      nearestBuiltNode: anchor?.node,
    },
  })
}

export const omissionReviewContextHash = (tale, beatId) =>
  sha256(JSON.stringify(omissionReviewContextPayload(tale, beatId)))

export const placeReviewContextHash = (tale, placeId) =>
  sha256(JSON.stringify(placeReviewContextPayload(tale, placeId)))

export const projectionReviewPayload = ({
  story,
  items,
  tales,
  folklore,
  endingLore,
  history,
  corpus,
  quotes,
  achievements,
  fates,
  worldFactPresentation,
  npcRegistry,
  reviewedReadings,
  reviewedOptionReadings,
  omissions,
  omissionReviews,
  placeReviews,
}) => stable({
  // Full records are intentional. Lore contradictions have appeared outside the
  // narrow beat/play fields: in discrepancies, cast notes, NPC backstories,
  // library cards, ending cards, item blurbs and bespoke map renderers. All of
  // those now fail closed.
  story,
  items,
  tales,
  folklore,
  endingLore,
  history,
  corpus,
  quotes,
  achievements,
  fates,
  worldFactPresentation,
  npcRegistry,
  reviewedReadings,
  reviewedOptionReadings,
  integrationSources,
  omissions,
  omissionReviews,
  placeReviews,
})
