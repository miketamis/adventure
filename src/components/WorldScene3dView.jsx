import { worldLocationForState } from '../game/worldLocation.js'
import { hasCond, currentStoryState } from '../game/gameState.js'
import { visibleLines, lineOf, STORY } from '../game/content.js'
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildWorldScene3d, validateWorldScene3d, departureElementId } from '../game/worldScene3d.js'
import { PLACE_OF } from './nodePositions.js'
import {
  defaultCameraForScene, drawWorldScene3d, hitTestWorldScene3d,
  visibleWorldSceneElements,
  orbitWorldSceneCamera, panWorldSceneCamera, zoomWorldSceneCamera,
} from './worldScene3dRenderer.js'
import './worldScene3d.css'

const WorldNode3dView = lazy(() => import('./WorldNode3dView.jsx'))

const sourceAddress = (description) => description.nodeId && Number.isInteger(description.lineIndex)
  ? `STORY.${description.nodeId}.text[${description.lineIndex}]`
  : description.source?.path || description.source?.address || description.id
const pretty = (value) => typeof value === 'string' ? value : JSON.stringify(value, null, 2)
const matchingElements = (model, query, kind) => {
  const term = query.trim().toLocaleLowerCase()
  return model.elements.filter((element) => (kind === 'all' || (kind === 'reference' ? element.catalogue : element.kind === kind))
    && (!term || `${element.id} ${element.label} ${element.placeId || ''} ${(element.nodeIds || []).join(' ')} ${pretty(element.source || '')}`.toLocaleLowerCase().includes(term)))
}
const layerName = (kind) => ({ feature: 'Landmarks', actor: 'Characters', fixture: 'Fixtures',
  perception: 'Observations', environment: 'Environment', barrier: 'Crossings',
  'item-action': 'Items & companions', 'source-place': 'Source places', 'source-actor': 'Source cast',
  'source-item': 'Source objects', 'source-reference': 'Source-tale references' }[kind] || kind.replaceAll('-', ' '))

function downloadScene(model) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(model, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'aventura-world-3d-audit.json'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function WorldScene3dView({ state }) {
  const [mode, setMode] = useState('world')
  return <>
    <div className="atlas-mode" role="group" aria-label="3D audit display">
      <button className="btn" aria-pressed={mode === 'world'} onClick={() => setMode('world')}>World survey</button>
      <button className="btn" aria-pressed={mode === 'nodes'} onClick={() => setMode('nodes')}>Node scene renders</button>
    </div>
    {mode === 'nodes' ? <Suspense fallback={<p role="status">Building the node scene…</p>}><WorldNode3dView state={state} /></Suspense>
      : <WorldAtlasScene3dView state={state} />}
  </>
}

function WorldAtlasScene3dView({ state }) {
  const model = useMemo(() => buildWorldScene3d(), [])
  const elementsById = useMemo(() => new Map(model.elements.map((element) => [element.id, element])), [model])
  const location = worldLocationForState(state)
  const initialId = departureElementId(state.nodeId) || `place:${PLACE_OF[state.nodeId]}`
  const initialRegion = ''
  const initialCatalogueView = Boolean(elementsById.get(initialId)?.catalogue)
  const worldFocusId = initialCatalogueView
    ? (location.originPlaceId && elementsById.has(`place:${location.originPlaceId}`)
      ? `place:${location.originPlaceId}` : model.elements.find(({ kind }) => kind === 'place')?.id || '')
    : initialId
  const currentLines = useMemo(() => {
    const projected = currentStoryState(state)
    return new Set(visibleLines(STORY[state.nodeId], (id) => hasCond(projected, id)))
  }, [state])
  const [selectedId, setSelectedId] = useState(initialId)
  const [regionId, setRegionId] = useState(initialRegion)
  const [camera, setCamera] = useState(() => defaultCameraForScene(model, initialCatalogueView
    ? { catalogueView: true, elementId: initialId } : { regionId: initialRegion }))
  const [showRoutes, setShowRoutes] = useState(true)
  const [showSightlines, setShowSightlines] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [surveyMode, setSurveyMode] = useState('all')
  const [catalogueView, setCatalogueView] = useState(initialCatalogueView)
  const layerKinds = useMemo(() => [...new Set(model.elements.filter((element) => !element.catalogue && !['region', 'place'].includes(element.kind)).map(({ kind }) => kind))].sort(), [model])
  const [enabledKinds, setEnabledKinds] = useState(() => [...new Set(model.elements.map(({ kind }) => kind))])
  const [elementQuery, setElementQuery] = useState('')
  const [elementKind, setElementKind] = useState('all')
  const [elementLimit, setElementLimit] = useState(24)
  const [query, setQuery] = useState('')
  const [sourceScope, setSourceScope] = useState('selection')
  const [focusedDescriptionId, setFocusedDescriptionId] = useState(null)
  const [descriptionLimit, setDescriptionLimit] = useState(30)
  const [auditIssues, setAuditIssues] = useState(null)
  const canvasRef = useRef(null)
  const hitsRef = useRef([])
  const dragRef = useRef(null)
  const selected = elementsById.get(selectedId)
  const placeProfile = model.placeProfiles?.find(({ placeId }) => placeId === selected?.placeId)
  const coverageLabels = { npcs: 'registered characters', portraits: 'first-encounter portraits', items: 'portable items & companions',
    itemActions: 'item action sources', carriedItemUses: 'carried-item uses', talePlaces: 'source-tale places', taleCast: 'source-tale cast roles', taleItems: 'source-tale objects' }
  const selectedRoutes = useMemo(() => {
    const places = new Set([selected?.placeId, ...(selected?.placeIds || [])].filter(Boolean).map((id) => `place:${id}`))
    return model.routes.filter((route) => places.has(route.fromElementId))
  }, [model, selected])
  const focusedDescription = model.descriptions.find(({ id }) => id === focusedDescriptionId)
  const regions = useMemo(() => [...new Set(model.elements.map((element) => element.regionId).filter(Boolean))].sort(), [model])
  const searchableElements = useMemo(() => matchingElements(model, elementQuery, elementKind), [model, elementQuery, elementKind])
  const catalogueIds = useMemo(() => focusedDescription?.elementIds.some((id) => elementsById.get(id)?.catalogue)
    ? focusedDescription.elementIds.filter((id) => elementsById.get(id)?.catalogue)
    : searchableElements.filter((element) => element.catalogue).map(({ id }) => id), [focusedDescription, elementsById, searchableElements])
  const visibleElements = useMemo(() => visibleWorldSceneElements(model, {
    regionId: regionId || undefined, selectedId, focusedDescriptionId, surveyMode, catalogueView, catalogueIds, enabledKinds,
  }), [model, regionId, selectedId, focusedDescriptionId, surveyMode, catalogueView, catalogueIds, enabledKinds])
  const descriptions = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    return model.descriptions.filter((description) => {
      if (departureElementId(state.nodeId) && sourceScope === 'selection'
        && description.source?.kind === 'story-line' && description.nodeId === state.nodeId && Number.isInteger(description.lineIndex)
        && !currentLines.has(lineOf(STORY[state.nodeId].text[description.lineIndex]))) return false
      if (sourceScope.startsWith('kind:')) {
        if (description.source?.kind !== sourceScope.slice(5)) return false
      } else if (sourceScope !== 'selection' && sourceScope !== 'all' && description.classification !== sourceScope) return false
      return search
        ? `${description.nodeId || ''} ${description.text} ${description.reading || ''} ${description.id} ${description.source?.path || ''}`.toLocaleLowerCase().includes(search)
        : sourceScope === 'selection' ? description.elementIds.includes(selectedId) : true
    })
  }, [model, selectedId, query, sourceScope, state.nodeId, currentLines])

  const draw = useCallback(() => {
    if (!canvasRef.current) return
    hitsRef.current = drawWorldScene3d(canvasRef.current, model, {
      camera, selectedId, regionId: regionId || undefined,
      showRoutes, showSightlines, showLabels, focusedDescriptionId,
      surveyMode, catalogueView, catalogueIds, enabledKinds,
    })
  }, [model, camera, selectedId, regionId, showRoutes, showSightlines, showLabels, focusedDescriptionId, surveyMode, catalogueView, catalogueIds, enabledKinds])
  useEffect(() => {
    const frame = requestAnimationFrame(draw)
    const observer = new ResizeObserver(draw)
    if (canvasRef.current) observer.observe(canvasRef.current)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [draw])
  useEffect(() => { setDescriptionLimit(30) }, [query, selectedId, sourceScope])
  useEffect(() => {
    setSelectedId(initialId)
    setRegionId(initialRegion)
    setCatalogueView(initialCatalogueView)
    setSurveyMode('all')
    setElementQuery('')
    setElementKind('all')
    setSourceScope('selection')
    setQuery('')
    setEnabledKinds([...new Set(model.elements.map(({ kind }) => kind))])
    setCamera(defaultCameraForScene(model, initialCatalogueView
      ? { catalogueView: true, elementId: initialId } : { regionId: initialRegion }))
    setFocusedDescriptionId(null)
  }, [state.nodeId, state.cameFrom, state.choiceIndex, initialId, initialRegion, initialCatalogueView, model])
  useEffect(() => {
    if (sourceScope === 'selection' && departureElementId(state.nodeId)
      && focusedDescription?.source?.kind === 'story-line' && focusedDescription.nodeId === state.nodeId
      && Number.isInteger(focusedDescription.lineIndex)
      && !currentLines.has(lineOf(STORY[state.nodeId].text[focusedDescription.lineIndex]))) setFocusedDescriptionId(null)
  }, [state.nodeId, currentLines, focusedDescription, sourceScope])
  useEffect(() => { setElementLimit(24) }, [elementQuery, elementKind])

  const selectElement = (id, focus = false) => {
    setSelectedId(id)
    const element = elementsById.get(id)
    setCatalogueView(Boolean(element?.catalogue))
    if (element && !enabledKinds.includes(element.kind)) setEnabledKinds((current) => [...current, element.kind])
    if (focus) {
      setFocusedDescriptionId(null)
      setRegionId('')
      if (element?.catalogue) { setElementQuery(''); setElementKind('reference') }
      setCamera(defaultCameraForScene(model, { elementId: id, catalogueView: Boolean(element?.catalogue) }))
    }
  }
  const focusDescription = (description, referencesOnly = false, targetId = null) => {
    setSurveyMode('evidence')
    setFocusedDescriptionId(description.id)
    const references = description.elementIds.filter((id) => elementsById.get(id)?.catalogue)
    const charted = description.elementIds.filter((id) => {
      const element = elementsById.get(id)
      return element && !element.catalogue && element.kind !== 'region'
    })
    const elementIds = targetId ? [targetId] : referencesOnly || !charted.length ? references : charted
    const referenceView = elementIds.length > 0 && elementIds.every((id) => elementsById.get(id)?.catalogue)
    setCatalogueView(referenceView)
    setSelectedId(elementIds.find((id) => elementsById.get(id)?.kind !== 'place') || elementIds[0])
    setRegionId('')
    setCamera(defaultCameraForScene(model, { elementIds, catalogueView: referenceView, catalogueIds: references }))
  }
  const filterElements = (nextQuery, nextKind) => {
    setElementQuery(nextQuery)
    setElementKind(nextKind)
    if (catalogueView) {
      setFocusedDescriptionId(null)
      const nextIds = matchingElements(model, nextQuery, nextKind).filter((element) => element.catalogue).map(({ id }) => id)
      setCamera(defaultCameraForScene(model, { catalogueView: true, catalogueIds: nextIds }))
    }
  }
  const fitWorld = () => {
    setRegionId('')
    setFocusedDescriptionId(null)
    setSelectedId(worldFocusId)
    setCatalogueView(false)
    setSurveyMode('all')
    setEnabledKinds([...new Set(model.elements.map(({ kind }) => kind))])
    setCamera(defaultCameraForScene(model))
  }
  const onPointerDown = (event) => {
    if (dragRef.current) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, pan: event.shiftKey || event.button === 2 }
  }
  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y
    if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true
    if (!drag.moved) return
    drag.x = event.clientX
    drag.y = event.clientY
    const bounds = event.currentTarget.getBoundingClientRect()
    setCamera((value) => drag.pan
      ? panWorldSceneCamera(value, dx, dy, bounds.width, bounds.height)
      : orbitWorldSceneCamera(value, dx, dy))
  }
  const onPointerUp = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    if (!drag.moved) {
      const bounds = event.currentTarget.getBoundingClientRect()
      const hit = hitTestWorldScene3d(hitsRef.current, event.clientX - bounds.left, event.clientY - bounds.top)
      if (hit) { setFocusedDescriptionId(null); selectElement(hit.elementId || hit.id, Boolean(hit.element.catalogue)) }
    }
  }
  const onKeyDown = (event) => {
    const directions = { ArrowLeft: [-30, 0], ArrowRight: [30, 0], ArrowUp: [0, -30], ArrowDown: [0, 30] }
    if (directions[event.key]) {
      event.preventDefault()
      const [dx, dy] = directions[event.key]
      const bounds = event.currentTarget.getBoundingClientRect()
      setCamera((value) => event.shiftKey
        ? panWorldSceneCamera(value, dx, dy, bounds.width, bounds.height)
        : orbitWorldSceneCamera(value, dx, dy))
    } else if (['+', '=', '-'].includes(event.key)) {
      event.preventDefault()
      setCamera((value) => zoomWorldSceneCamera(value, event.key === '-' ? 1 / 1.25 : 1.25))
    } else if (event.key === 'Home') {
      event.preventDefault()
      fitWorld()
    }
  }

  return <div className="world3d" data-testid="world3d-view">
    {location.kind !== 'charted' && <p role="status">Current location is uncharted.{location.siteLabel ? ` Story setting: ${location.siteLabel}. No world coordinates or route mesh are assigned.` : <>{location.originPlaceId ? ` Departure origin: ${elementsById.get(`place:${location.originPlaceId}`)?.label || location.originPlaceId}.` : ' The departure origin is unknown.'} This reference has no physical destination or route mesh.</>}</p>}
    <div className="world3d-heading">
      <div><span className="world3d-eyebrow">WORLD BUILDER · STORY AUDIT</span><h3>A world you can trace</h3></div>
      <div className="world3d-actions">
        <button className="btn" onClick={() => setAuditIssues(validateWorldScene3d(model))}>Validate 3D mappings</button>
        <button className="btn" onClick={() => downloadScene(model)}>Export audit JSON</button>
      </div>
    </div>
    <p className="world3d-caption">The complete world survey shows registered places, landmarks and possible encounters. Translucent markers represent alternatives, not simultaneous events. X/Z preserve chart placement; shapes and heights are schematic. Uncharted people, objects and source locations have a separate reference gallery.</p>
    <div className="world3d-coverage" aria-label="3D mapping coverage">
      <span><b>{model.statistics.places}</b> canonical places</span>
      <span><b>{model.statistics.reviewedFeatures}</b> reviewed features</span>
      <span><b>{model.statistics.metadataDescriptions}</b> lines with world metadata</span>
      <button onClick={() => { setSourceScope('context-only'); setQuery('') }}><b>{model.statistics.contextOnlyDescriptions}</b> context-only lines to inspect</button>
    </div>
    {model.inventory && <details className="world3d-completeness" open>
      <summary>World inventory coverage</summary>
      <div className="world3d-coverage-table">{Object.entries(coverageLabels).map(([key, label]) => <span key={key}>
        <b>{model.inventory.coverage[key]}</b> {label}
      </span>)}</div>
      <p className="world3d-small">{model.inventory.coverage.records} registered records link to map elements; {model.inventory.coverage.unlocatedRecords} retain an explicitly unlocated reference. Source references preserve their tale and time context.</p>
      <p className="world3d-small">{model.placeProfiles.filter(({ disposition }) => disposition === 'depicted').length} places have reviewed landmark depictions. {model.placeProfiles.filter(({ disposition }) => disposition === 'source-limited').length} have an explicit source limitation; their locations, prose and routes remain mapped.</p>
    </details>}
    {auditIssues !== null && <div className={`world3d-audit ${auditIssues.length ? 'has-issues' : ''}`} role="status">
      {auditIssues.length ? <><b>{auditIssues.length} mapping issues</b><ul>{auditIssues.map((issue, index) => <li key={index}>{pretty(issue)}</li>)}</ul></>
        : <><b>Structural checks passed.</b> Source coverage, geometry, and registered spatial contracts agree. Context-only prose still needs semantic review.</>}
    </div>}
    <div className="world3d-toolbar">
      <label>View <select aria-label="3D survey mode" value={catalogueView ? 'references' : surveyMode} onChange={(event) => {
        const references = event.target.value === 'references'
        setCatalogueView(references)
        setFocusedDescriptionId(null)
        setSurveyMode(references ? 'all' : event.target.value)
        setRegionId('')
        setSelectedId(references ? '' : worldFocusId)
        setCamera(defaultCameraForScene(model, { catalogueView: references,
          catalogueIds: searchableElements.filter((element) => element.catalogue).map(({ id }) => id) }))
      }}><option value="all">Complete world survey</option><option value="evidence">Inspect one possibility</option><option value="references">Unlocated reference gallery</option></select></label>
      <label>Region <select aria-label="3D map region" value={regionId} onChange={(event) => {
        setRegionId(event.target.value)
        setCatalogueView(false)
        setFocusedDescriptionId(null)
        setSelectedId(event.target.value ? `region:${event.target.value}` : worldFocusId)
        setCamera(defaultCameraForScene(model, { regionId: event.target.value || undefined }))
      }}><option value="">Whole world</option>{regions.map((id) => <option key={id} value={id}>{id}</option>)}</select></label>
      <button className="btn" onClick={fitWorld}>Fit world</button>
      <button className="btn" onClick={() => { setFocusedDescriptionId(null); selectElement(initialId, true) }}>Current place</button>
      <button className="btn" aria-label="Zoom in 3D map" onClick={() => setCamera((value) => zoomWorldSceneCamera(value, 1.3))}>＋</button>
      <button className="btn" aria-label="Zoom out 3D map" onClick={() => setCamera((value) => zoomWorldSceneCamera(value, 1 / 1.3))}>−</button>
      <label><input type="checkbox" checked={showRoutes} onChange={(event) => setShowRoutes(event.target.checked)} /> Routes</label>
      <label><input type="checkbox" checked={showSightlines} onChange={(event) => setShowSightlines(event.target.checked)} /> Sightlines</label>
      <label><input type="checkbox" checked={showLabels} onChange={(event) => setShowLabels(event.target.checked)} /> Labels</label>
    </div>
    {!catalogueView && <fieldset className="world3d-layers"><legend>Map layers</legend>{layerKinds.map((kind) => <label key={kind}>
      <input type="checkbox" checked={enabledKinds.includes(kind)} onChange={(event) => setEnabledKinds((current) => event.target.checked ? [...current, kind] : current.filter((value) => value !== kind))} />
      {layerName(kind)} <span>{model.elements.filter((element) => element.kind === kind && !element.catalogue).length}</span>
    </label>)}</fieldset>}
    <p className="world3d-small" data-testid="world3d-visibility-count">{visibleElements.length} elements in this view · {model.elements.length} indexed in the complete inventory. Region and layer filters only affect the view.</p>
    <div className="world3d-layout">
      <div className="world3d-stage">
        <canvas ref={canvasRef} tabIndex={0} role="img" aria-label="Interactive 3D world. Arrow keys orbit; Shift and arrows pan; plus and minus zoom; Home fits the world. Use the element selector for accessible inspection."
          data-testid="world3d-canvas" onKeyDown={onKeyDown} onPointerDown={onPointerDown}
          onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { dragRef.current = null }}
          onContextMenu={(event) => event.preventDefault()} />
        <div className="world3d-stage-note">Drag to orbit · Shift-drag to pan · Select {catalogueView ? 'a reference' : 'a landmark'} to inspect</div>
        <div className="world3d-legend">{catalogueView ? <span>◇ Unlocated references · gallery positions are layout only</span>
          : <><span>● Physical place</span><span>━ Story route</span><span>◌ Possible encounter / state</span></>}</div>
      </div>
      <aside className="world3d-inspector" aria-label="3D element inspector">
        <span className="world3d-eyebrow">ELEMENT → STORY</span>
        <label className="world3d-select">Inspect element<select aria-label="Inspect 3D element" value={selectedId} onChange={(event) => { setFocusedDescriptionId(null); selectElement(event.target.value, true) }}>
          <option value="" disabled>Select an element</option>
          {model.elements.map((element) => <option key={element.id} value={element.id}>{element.label || element.id} · {element.kind}</option>)}
        </select></label>
        {selected && <>
          <h4>{selected.label || selected.id}</h4>
          <code className="world3d-id">{selected.id}</code>
          <dl><dt>Element</dt><dd>{selected.kind} · {selected.geometry?.shape}</dd>
            <dt>{selected.catalogue ? 'Reference display position' : 'Position X / Y / Z'}</dt><dd>{selected.catalogue ? 'Unlocated · gallery layout only' : selected.position?.map((value) => Math.round(value * 10) / 10).join(' / ')}</dd>
            <dt>Story links</dt><dd>{selected.descriptionIds?.length || 0} authored lines</dd></dl>
          <button className="btn" onClick={() => selectElement(selected.id, true)}>Focus this element</button>
          {selected.source && <details><summary>Construction source</summary><pre>{pretty(selected.source)}</pre></details>}
          {selected.placeIds?.length > 0 && <p className="world3d-small">Connects {selected.placeIds.map((id) => elementsById.get(`place:${id}`)?.label || id).join(' ↔ ')}</p>}
          {selected.relations?.length > 0 && <details open><summary>Checked spatial relationships</summary><pre>{pretty(selected.relations)}</pre></details>}
          {selected.interpretation && <p className="world3d-small">{selected.interpretation}</p>}
          {placeProfile && <details className="world3d-place-profile" open><summary>Place depiction · {placeProfile.disposition}</summary>
            <p className="world3d-small">{placeProfile.rationale}</p>
            {placeProfile.featureIds.map((featureId) => <button key={featureId} className="world3d-binding" onClick={() => selectElement(`feature:${featureId}`, true)}>{elementsById.get(`feature:${featureId}`)?.label || featureId}</button>)}
            {placeProfile.associations?.map((association) => <details key={association.featureId}><summary>View of {elementsById.get(`feature:${association.featureId}`)?.label || association.featureId}</summary><p className="world3d-small">{association.rationale}</p><pre>{pretty(association)}</pre></details>)}
            {placeProfile.review && <details><summary>Exact source limitation</summary><pre>{pretty(placeProfile.review)}</pre></details>}
          </details>}
          {selected.inventoryRecordIds?.length > 0 && <details><summary>Inventory provenance ({selected.inventoryRecordIds.length})</summary>
            <pre>{pretty(model.inventory.records.filter(({ id }) => selected.inventoryRecordIds.includes(id)))}</pre>
          </details>}
          {selectedRoutes.length > 0 && <details className="world3d-route-list"><summary>{selectedRoutes.length} outgoing story choices</summary>
            <div>{selectedRoutes.map((route) => <article key={route.id}>
              <code>{route.source.path}</code><p lang="sq">{route.text}</p>
              <span>{route.samePlace ? 'Same place' : route.projection ? 'Tale projection' : route.kind} → </span>
              <button className="world3d-binding" onClick={() => { setFocusedDescriptionId(null); selectElement(route.toElementId || departureElementId(route.to), true) }}>{elementsById.get(route.toElementId || departureElementId(route.to))?.label || route.to}</button>
            </article>)}</div>
          </details>}
        </>}
        <p className="world3d-small">Solid structures represent registered geometry. Context bindings identify where a line is told; they do not assert every mentioned object exists there.</p>
        <p className="world3d-small">{model.elements.length} elements · {model.descriptions.length} descriptions · {model.routes.length} route records</p>
      </aside>
    </div>
    <section className="world3d-inventory" aria-label="Complete map inventory">
      <div className="world3d-heading"><div><span className="world3d-eyebrow">EVERY ELEMENT</span><h3>Find anything in the world</h3></div>
        <label>Search map elements<input type="search" value={elementQuery} onChange={(event) => filterElements(event.target.value, elementKind)} placeholder="Person, place, item, scene or source…" /></label>
      </div>
      <label className="world3d-source-scope">Element type <select aria-label="Map element type" value={elementKind} onChange={(event) => filterElements(elementQuery, event.target.value)}>
        <option value="all">Everything</option><option value="reference">Unlocated references</option>
        {[...new Set(model.elements.filter((element) => !element.catalogue).map(({ kind }) => kind))].sort().map((kind) => <option key={kind} value={kind}>{layerName(kind)}</option>)}
      </select></label>
      <p className="world3d-small">{searchableElements.length} matching elements across all regions, including hidden layers and unlocated references.</p>
      <div className="world3d-inventory-list">{searchableElements.slice(0, elementLimit).map((element) => <button key={element.id} onClick={() => { setFocusedDescriptionId(null); selectElement(element.id, true) }}>
        <strong>{element.label || element.id}</strong><span>{element.catalogue ? 'Unlocated reference' : layerName(element.kind)} · {element.id}</span>
      </button>)}</div>
      {searchableElements.length > elementLimit && <button className="btn" onClick={() => setElementLimit((value) => value + 24)}>Show 24 more elements</button>}
      {!searchableElements.length && <p>No map elements match this search.</p>}
    </section>
    <section className="world3d-sources" aria-label="Story description mappings">
      <div className="world3d-heading"><div><span className="world3d-eyebrow">STORY → ELEMENT</span><h3>Follow the evidence</h3></div>
        <label>Search all story descriptions<input type="search" placeholder="Albanian text, scene or source ID…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <label className="world3d-source-scope">Description scope <select aria-label="Description mapping scope" value={sourceScope} onChange={(event) => setSourceScope(event.target.value)}>
        <option value="selection">Selected element</option><option value="all">All descriptions</option>
        <option value="reviewed-geometry">Reviewed geometry</option><option value="canonical-metadata">World metadata</option><option value="context-only">Context only · needs interpretation</option>
        <option value="kind:item-blurb">Item descriptions</option><option value="kind:generated-environment">Generated environment narration</option>
        <option value="kind:npc-portrait">Character portraits</option><option value="kind:item-action">Item actions</option>
      </select></label>
      {focusedDescription && <div className="world3d-focused" role="status">Inspecting <code>{sourceAddress(focusedDescription)}</code> · {focusedDescription.text}</div>}
      <p className="world3d-small">{query.trim() || sourceScope !== 'selection' ? `${descriptions.length} matching descriptions across the world model` : `${descriptions.length} lines linked to the selected element`}. Conditions are preserved so alternatives are not mistaken for simultaneous facts.</p>
      <div className="world3d-description-list">{descriptions.slice(0, descriptionLimit).map((description) => <article key={description.id} className={focusedDescriptionId === description.id ? 'is-focused' : ''}>
        <div className="world3d-source-address"><code>{sourceAddress(description)}</code><button className="btn" onClick={() => focusDescription(description)}>Show in 3D</button></div>
        {description.elementIds.some((id) => elementsById.get(id)?.catalogue)
          && description.elementIds.some((id) => !elementsById.get(id)?.catalogue && elementsById.get(id)?.kind !== 'region')
          && <button className="btn" onClick={() => focusDescription(description, true)}>Show unlocated references</button>}
        <p lang={description.language || (description.source?.kind === 'item-blurb' ? 'en' : 'sq')}>{description.text}</p>
        <span className="world3d-classification">{description.classification === 'reviewed-geometry' ? 'Reviewed geometry witness' : description.classification === 'canonical-metadata' ? 'Canonical world metadata' : 'Place context · physical meaning not validated'}</span>
        {description.reading && <p className="world3d-small">{description.reading}</p>}
        <div className="world3d-bindings">{description.elementIds.map((id) => <button key={id} className={`world3d-binding ${id === selectedId ? 'selected' : ''}`} onClick={() => focusDescription(description, false, id)}>{id}</button>)}</div>
        <details><summary>Mapping evidence & conditions</summary><pre>{pretty({ bindings: description.bindings, conditions: description.conditions, source: description.source })}</pre></details>
      </article>)}</div>
      {descriptions.length > descriptionLimit && <button className="btn" onClick={() => setDescriptionLimit((value) => value + 30)}>Show 30 more descriptions</button>}
      {!descriptions.length && <p>No descriptions match this selection.</p>}
    </section>
  </div>
}
