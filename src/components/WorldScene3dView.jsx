import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildWorldScene3d, validateWorldScene3d } from '../game/worldScene3d.js'
import { PLACE_OF } from './nodePositions.js'
import {
  defaultCameraForScene, drawWorldScene3d, hitTestWorldScene3d,
  orbitWorldSceneCamera, panWorldSceneCamera, zoomWorldSceneCamera,
} from './worldScene3dRenderer.js'
import './worldScene3d.css'

const sourceAddress = (description) => description.nodeId && Number.isInteger(description.lineIndex)
  ? `STORY.${description.nodeId}.text[${description.lineIndex}]`
  : description.source?.path || description.source?.address || description.id
const pretty = (value) => typeof value === 'string' ? value : JSON.stringify(value, null, 2)

function downloadScene(model) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(model, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'aventura-world-3d-audit.json'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function WorldScene3dView({ state }) {
  const model = useMemo(() => buildWorldScene3d(), [])
  const elementsById = useMemo(() => new Map(model.elements.map((element) => [element.id, element])), [model])
  const initialId = `place:${PLACE_OF[state.nodeId]}`
  const initialRegion = elementsById.get(initialId)?.regionId || 'village'
  const [selectedId, setSelectedId] = useState(initialId)
  const [regionId, setRegionId] = useState(initialRegion)
  const [camera, setCamera] = useState(() => defaultCameraForScene(model, { regionId: initialRegion }))
  const [showRoutes, setShowRoutes] = useState(true)
  const [showSightlines, setShowSightlines] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [query, setQuery] = useState('')
  const [sourceScope, setSourceScope] = useState('selection')
  const [focusedDescriptionId, setFocusedDescriptionId] = useState(null)
  const [descriptionLimit, setDescriptionLimit] = useState(30)
  const [auditIssues, setAuditIssues] = useState(null)
  const canvasRef = useRef(null)
  const hitsRef = useRef([])
  const dragRef = useRef(null)
  const selected = elementsById.get(selectedId)
  const selectedRoutes = useMemo(() => {
    const places = new Set([selected?.placeId, ...(selected?.placeIds || [])].filter(Boolean).map((id) => `place:${id}`))
    return model.routes.filter((route) => places.has(route.fromElementId))
  }, [model, selected])
  const focusedDescription = model.descriptions.find(({ id }) => id === focusedDescriptionId)
  const regions = useMemo(() => [...new Set(model.elements.map((element) => element.regionId).filter(Boolean))].sort(), [model])
  const scopedElements = useMemo(() => model.elements.filter((element) =>
    !regionId || element.regionId === regionId || element.regionIds?.includes(regionId)), [model, regionId])
  const descriptions = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    return model.descriptions.filter((description) => {
      if (sourceScope.startsWith('kind:')) {
        if (description.source?.kind !== sourceScope.slice(5)) return false
      } else if (sourceScope !== 'selection' && sourceScope !== 'all' && description.classification !== sourceScope) return false
      return search
        ? `${description.nodeId || ''} ${description.text} ${description.reading || ''} ${description.id} ${description.source?.path || ''}`.toLocaleLowerCase().includes(search)
        : sourceScope === 'selection' ? description.elementIds.includes(selectedId) : true
    })
  }, [model, selectedId, query, sourceScope])

  const draw = useCallback(() => {
    if (!canvasRef.current) return
    hitsRef.current = drawWorldScene3d(canvasRef.current, model, {
      camera, selectedId, regionId: regionId || undefined,
      showRoutes, showSightlines, showLabels, focusedDescriptionId,
    })
  }, [model, camera, selectedId, regionId, showRoutes, showSightlines, showLabels, focusedDescriptionId])
  useEffect(() => {
    const frame = requestAnimationFrame(draw)
    const observer = new ResizeObserver(draw)
    if (canvasRef.current) observer.observe(canvasRef.current)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [draw])
  useEffect(() => { setDescriptionLimit(30) }, [query, selectedId, sourceScope])

  const selectElement = (id, focus = false) => {
    setSelectedId(id)
    if (focus) {
      setRegionId('')
      setCamera(defaultCameraForScene(model, { elementId: id }))
    }
  }
  const focusDescription = (description) => {
    setFocusedDescriptionId(description.id)
    const references = description.elementIds.filter((id) => elementsById.get(id)?.catalogue)
    const elementIds = references.length ? references : description.elementIds.filter((id) => elementsById.get(id)?.kind !== 'region')
    setSelectedId(elementIds.find((id) => elementsById.get(id)?.kind !== 'place') || elementIds[0])
    setRegionId('')
    setCamera(defaultCameraForScene(model, { elementIds }))
  }
  const fitWorld = () => {
    setRegionId('')
    setFocusedDescriptionId(null)
    setSelectedId(initialId)
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
      if (hit) { setFocusedDescriptionId(null); selectElement(hit.elementId || hit.id) }
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
    <div className="world3d-heading">
      <div><span className="world3d-eyebrow">WORLD BUILDER · STORY AUDIT</span><h3>A world you can trace</h3></div>
      <div className="world3d-actions">
        <button className="btn" onClick={() => setAuditIssues(validateWorldScene3d(model))}>Validate 3D mappings</button>
        <button className="btn" onClick={() => downloadScene(model)}>Export audit JSON</button>
      </div>
    </div>
    <p className="world3d-caption">An orbitable model of authored world possibilities. X/Z preserve chart placement; heights and shapes are schematic, not surveyed terrain. Every authored story line is indexed; a context link alone does not verify its physical claims. Conditional structures appear when inspecting their evidence.</p>
    <div className="world3d-coverage" aria-label="3D mapping coverage">
      <span><b>{model.statistics.places}</b> canonical places</span>
      <span><b>{model.statistics.reviewedFeatures}</b> reviewed structures</span>
      <span><b>{model.statistics.metadataDescriptions}</b> lines with world metadata</span>
      <button onClick={() => { setSourceScope('context-only'); setQuery('') }}><b>{model.statistics.contextOnlyDescriptions}</b> context-only lines to inspect</button>
    </div>
    {auditIssues !== null && <div className={`world3d-audit ${auditIssues.length ? 'has-issues' : ''}`} role="status">
      {auditIssues.length ? <><b>{auditIssues.length} mapping issues</b><ul>{auditIssues.map((issue, index) => <li key={index}>{pretty(issue)}</li>)}</ul></>
        : <><b>Structural checks passed.</b> Source coverage, geometry, and registered spatial contracts agree. Context-only prose still needs semantic review.</>}
    </div>}
    <div className="world3d-toolbar">
      <label>Region <select aria-label="3D map region" value={regionId} onChange={(event) => {
        setRegionId(event.target.value)
        setFocusedDescriptionId(null)
        setSelectedId(event.target.value ? `region:${event.target.value}` : initialId)
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
    <div className="world3d-layout">
      <div className="world3d-stage">
        <canvas ref={canvasRef} tabIndex={0} role="img" aria-label="Interactive 3D world. Arrow keys orbit; Shift and arrows pan; plus and minus zoom; Home fits the world. Use the element selector for accessible inspection."
          data-testid="world3d-canvas" onKeyDown={onKeyDown} onPointerDown={onPointerDown}
          onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { dragRef.current = null }}
          onContextMenu={(event) => event.preventDefault()} />
        <div className="world3d-stage-note">Drag to orbit · Shift-drag to pan · Select a landmark to inspect</div>
        <div className="world3d-legend"><span>● Physical place</span><span>━ Story route</span><span>┄ Tale projection / sightline</span></div>
      </div>
      <aside className="world3d-inspector" aria-label="3D element inspector">
        <span className="world3d-eyebrow">ELEMENT → STORY</span>
        <label className="world3d-select">Inspect element<select aria-label="Inspect 3D element" value={scopedElements.some(({ id }) => id === selectedId) ? selectedId : ''} onChange={(event) => { setFocusedDescriptionId(null); selectElement(event.target.value, true) }}>
          <option value="" disabled>Select an element</option>
          {scopedElements.map((element) => <option key={element.id} value={element.id}>{element.label || element.id} · {element.kind}</option>)}
        </select></label>
        {selected && <>
          <h4>{selected.label || selected.id}</h4>
          <code className="world3d-id">{selected.id}</code>
          <dl><dt>Element</dt><dd>{selected.kind} · {selected.geometry?.shape}</dd>
            <dt>{selected.catalogue ? 'Reference display position' : 'Position X / Y / Z'}</dt><dd>{selected.position?.map((value) => Math.round(value * 10) / 10).join(' / ')}</dd>
            <dt>Story links</dt><dd>{selected.descriptionIds?.length || 0} authored lines</dd></dl>
          <button className="btn" onClick={() => selectElement(selected.id, true)}>Focus this element</button>
          {selected.source && <details><summary>Construction source</summary><pre>{pretty(selected.source)}</pre></details>}
          {selected.placeIds?.length > 0 && <p className="world3d-small">Connects {selected.placeIds.map((id) => elementsById.get(`place:${id}`)?.label || id).join(' ↔ ')}</p>}
          {selected.relations?.length > 0 && <details open><summary>Checked spatial relationships</summary><pre>{pretty(selected.relations)}</pre></details>}
          {selected.interpretation && <p className="world3d-small">{selected.interpretation}</p>}
          {selectedRoutes.length > 0 && <details className="world3d-route-list"><summary>{selectedRoutes.length} outgoing story choices</summary>
            <div>{selectedRoutes.map((route) => <article key={route.id}>
              <code>{route.source.path}</code><p lang="sq">{route.text}</p>
              <span>{route.samePlace ? 'Same place' : route.projection ? 'Tale projection' : route.kind} → </span>
              <button className="world3d-binding" onClick={() => { setFocusedDescriptionId(null); selectElement(route.toElementId, true) }}>{elementsById.get(route.toElementId)?.label || route.to}</button>
            </article>)}</div>
          </details>}
        </>}
        <p className="world3d-small">Solid structures represent registered geometry. Context bindings identify where a line is told; they do not assert every mentioned object exists there.</p>
        <p className="world3d-small">{model.elements.length} elements · {model.descriptions.length} descriptions · {model.routes.length} route records</p>
      </aside>
    </div>
    <section className="world3d-sources" aria-label="Story description mappings">
      <div className="world3d-heading"><div><span className="world3d-eyebrow">STORY → ELEMENT</span><h3>Follow the evidence</h3></div>
        <label>Search all story descriptions<input type="search" placeholder="Albanian text, scene or source ID…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <label className="world3d-source-scope">Description scope <select aria-label="Description mapping scope" value={sourceScope} onChange={(event) => setSourceScope(event.target.value)}>
        <option value="selection">Selected element</option><option value="all">All descriptions</option>
        <option value="reviewed-geometry">Reviewed geometry</option><option value="canonical-metadata">World metadata</option><option value="context-only">Context only · needs interpretation</option>
        <option value="kind:item-blurb">Item descriptions</option><option value="kind:generated-environment">Generated environment narration</option>
      </select></label>
      {focusedDescription && <div className="world3d-focused" role="status">Inspecting <code>{sourceAddress(focusedDescription)}</code> · {focusedDescription.text}</div>}
      <p className="world3d-small">{query.trim() || sourceScope !== 'selection' ? `${descriptions.length} matching descriptions across the world model` : `${descriptions.length} lines linked to the selected element`}. Conditions are preserved so alternatives are not mistaken for simultaneous facts.</p>
      <div className="world3d-description-list">{descriptions.slice(0, descriptionLimit).map((description) => <article key={description.id} className={focusedDescriptionId === description.id ? 'is-focused' : ''}>
        <div className="world3d-source-address"><code>{sourceAddress(description)}</code><button className="btn" onClick={() => focusDescription(description)}>Show in 3D</button></div>
        <p lang={description.source?.kind === 'item-blurb' ? 'en' : 'sq'}>{description.text}</p>
        <span className="world3d-classification">{description.classification === 'reviewed-geometry' ? 'Reviewed geometry witness' : description.classification === 'canonical-metadata' ? 'Canonical world metadata' : 'Place context · physical meaning not validated'}</span>
        {description.reading && <p className="world3d-small">{description.reading}</p>}
        <div className="world3d-bindings">{description.elementIds.map((id) => <button key={id} className={`world3d-binding ${id === selectedId ? 'selected' : ''}`} onClick={() => { setFocusedDescriptionId(description.id); selectElement(id, true) }}>{id}</button>)}</div>
        <details><summary>Mapping evidence & conditions</summary><pre>{pretty({ bindings: description.bindings, conditions: description.conditions, source: description.source })}</pre></details>
      </article>)}</div>
      {descriptions.length > descriptionLimit && <button className="btn" onClick={() => setDescriptionLimit((value) => value + 30)}>Show 30 more descriptions</button>}
      {!descriptions.length && <p>No descriptions match this selection.</p>}
    </section>
  </div>
}
