import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildWorldNodeScene, buildWorldNodeSceneIndex } from '../game/worldScene3dNodes.js'
import {
  nodeSceneCamera, turnWorldNodeCamera, lookWorldNodeDirection, orbitWorldNodeCamera,
  drawWorldNodeScene, hitTestWorldNodeScene, renderWorldNodePanorama,
} from './worldScene3dNodeRenderer.js'
import { worldScene3dAssetAttributeReview } from '../game/worldScene3dAssets.js'
import './worldNode3d.css'

const directions = ['Forward', 'Right', 'Behind', 'Left']
const sourceAddress = (description) => description.source?.path || description.id
const conditionText = (conditions) => JSON.stringify(conditions, null, 2)
const download = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
const canvasBlob = (canvas) => new Promise((resolve, reject) => canvas.toBlob((blob) =>
  blob ? resolve(blob) : reject(new Error('The browser could not export this render.')), 'image/png'))
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

// A stored ZIP needs no network library. PNG data is already compressed.
const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index
  for (let bit = 0; bit < 8; bit += 1) value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0)
  return value >>> 0
})
const crc32 = (bytes) => {
  let value = 0xffffffff
  for (const byte of bytes) value = (value >>> 8) ^ crcTable[(value ^ byte) & 255]
  return (value ^ 0xffffffff) >>> 0
}
function zipArchive(files) {
  const encoder = new TextEncoder(), parts = [], directory = []
  let offset = 0, directorySize = 0
  for (const { name, bytes } of files) {
    const filename = encoder.encode(name), crc = crc32(bytes)
    const header = new Uint8Array(30 + filename.length), local = new DataView(header.buffer)
    local.setUint32(0, 0x04034b50, true)
    local.setUint16(4, 20, true)
    local.setUint16(6, 0x0800, true)
    local.setUint16(12, 33, true)
    local.setUint32(14, crc, true)
    local.setUint32(18, bytes.length, true)
    local.setUint32(22, bytes.length, true)
    local.setUint16(26, filename.length, true)
    header.set(filename, 30)
    const central = new Uint8Array(46 + filename.length), entry = new DataView(central.buffer)
    entry.setUint32(0, 0x02014b50, true)
    entry.setUint16(4, 20, true)
    entry.setUint16(6, 20, true)
    entry.setUint16(8, 0x0800, true)
    entry.setUint16(14, 33, true)
    entry.setUint32(16, crc, true)
    entry.setUint32(20, bytes.length, true)
    entry.setUint32(24, bytes.length, true)
    entry.setUint16(28, filename.length, true)
    entry.setUint32(42, offset, true)
    central.set(filename, 46)
    parts.push(header, bytes)
    directory.push(central)
    offset += header.length + bytes.length
    directorySize += central.length
  }
  const end = new Uint8Array(22), footer = new DataView(end.buffer)
  footer.setUint32(0, 0x06054b50, true)
  footer.setUint16(8, files.length, true)
  footer.setUint16(10, files.length, true)
  footer.setUint32(12, directorySize, true)
  footer.setUint32(16, offset, true)
  return new Blob([...parts, ...directory, end], { type: 'application/zip' })
}

function renderManifest(scene) {
  return {
    version: scene.version, nodeId: scene.nodeId, label: scene.label, location: scene.location, mode: scene.mode,
    camera: scene.camera, localOnly: scene.localOnly, viewpoint: scene.viewpoint, viewer: scene.viewer, narrativeDomain: scene.narrativeDomain, representativeDescriptionId: scene.representativeDescriptionId, environment: scene.environment, coverage: scene.coverage,
    limitations: scene.limitations, objects: scene.objects.map((object) => ({ ...object, visualTreatment: worldScene3dAssetAttributeReview(object.asset, object.attributes || {}) })),
    descriptions: scene.descriptions, provenance: scene.provenance, states: scene.states, relations: scene.relations,
  }
}

const dispositionLabel = (description) => ({
  modeled: 'Modeled physical detail', 'physical-modeled': 'Modeled physical detail',
  physical: 'Physical detail', 'non-visual': 'Nonvisual narration',
  nonvisual: 'Nonvisual narration', reported: 'Reported or remembered',
  mixed: 'Physical detail with nonvisual narration', environment: 'Environmental condition',
  historical: 'Historical description', offstage: 'Outside this scene', abstract: 'Abstract narration',
  absence: 'Explicit absence', unreviewed: 'Source awaiting physical review',
  'reported-reference': 'Reported or remembered', unmodeled: 'Physical detail awaiting a model',
}[description.disposition] || description.disposition || 'Unclassified source')

export default function WorldNode3dView({ state }) {
  const index = useMemo(() => buildWorldNodeSceneIndex(), [])
  const [nodeId, setNodeId] = useState(state.nodeId)
  const [query, setQuery] = useState('')
  const [selectedDescriptionId, setSelectedDescriptionId] = useState(null)
  const [selectedElementId, setSelectedElementId] = useState(null)
  const [viewMode, setViewMode] = useState('first-person')
  const [projection, setProjection] = useState('look')
  const [camera, setCamera] = useState(null)
  const [exportState, setExportState] = useState(null)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null), hitsRef = useRef([]), dragRef = useRef(null)
  const batchRef = useRef(null)
  const scene = useMemo(() => buildWorldNodeScene(nodeId, {
    ...(nodeId === state.nodeId ? { state } : {}), selectedDescriptionId,
  }), [nodeId, state, selectedDescriptionId])
  const selectedObject = scene.objects.find(({ id }) => id === selectedElementId)
  const selectedAttributeReview = selectedObject ? worldScene3dAssetAttributeReview(selectedObject.asset, selectedObject.attributes) : null
  const matchingNodes = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    return index.filter((node) => !term || `${node.nodeId} ${node.label} ${node.placeId || ''}`.toLocaleLowerCase().includes(term))
  }, [index, query])
  const selectedSource = scene.descriptions.find(({ id }) => id === selectedDescriptionId)

  useEffect(() => {
    setNodeId(state.nodeId)
    setSelectedDescriptionId(null)
    setSelectedElementId(null)
    setCamera(null)
    setViewMode('first-person')
    setProjection('look')
  }, [state.nodeId, state.cameFrom, state.choiceIndex])
  useEffect(() => () => { if (batchRef.current) batchRef.current.cancelled = true }, [])
  const draw = useCallback(() => {
    if (!canvasRef.current) return
    if (projection === 'panorama') {
      hitsRef.current = []
      renderWorldNodePanorama(canvasRef.current, scene, { width: 1024, height: 512, pixelRatio: 1, selectedElementId, selectedDescriptionId })
      return
    }
    hitsRef.current = drawWorldNodeScene(canvasRef.current, scene, {
      camera: camera || nodeSceneCamera(scene, { viewMode }), selectedElementId,
      selectedDescriptionId, selectedClaimId: selectedDescriptionId, labels: true,
    })
  }, [scene, camera, viewMode, selectedElementId, selectedDescriptionId, projection])
  useEffect(() => {
    const frame = requestAnimationFrame(draw)
    const observer = new ResizeObserver(draw)
    if (canvasRef.current) observer.observe(canvasRef.current)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [draw])

  const inspectNode = (id) => {
    setNodeId(id)
    setSelectedDescriptionId(null)
    setSelectedElementId(null)
    setViewMode('first-person')
    setProjection('look')
    setCamera(null)
  }
  const inspectDescription = (description) => {
    if (description.nodeId && description.nodeId !== nodeId) setNodeId(description.nodeId)
    setSelectedDescriptionId(description.id)
    setSelectedElementId(null)
    setCamera(null)
  }
  const turn = (dx, dy = 0) => setCamera((previous) => (viewMode === 'orbit' ? orbitWorldNodeCamera : turnWorldNodeCamera)(
    previous || nodeSceneCamera(scene, { viewMode }), dx, dy))
  const onPointerDown = (event) => {
    if (projection === 'panorama') return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
  }
  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y
    if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true
    if (!drag.moved) return
    drag.x = event.clientX; drag.y = event.clientY
    turn(dx, dy)
  }
  const onPointerUp = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    if (drag.moved) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const hit = hitTestWorldNodeScene(hitsRef.current, event.clientX - bounds.left, event.clientY - bounds.top)
    if (hit) setSelectedElementId(hit.objectId || hit.elementId || hit.id)
  }
  const exportCurrent = async () => {
    try {
      setError(null)
      const panorama = document.createElement('canvas')
      await renderWorldNodePanorama(panorama, scene, { width: 1024, height: 512, pixelRatio: 1, selectedElementId, selectedDescriptionId })
      download(await canvasBlob(panorama), `${nodeId}-${selectedDescriptionId ? 'witness' : scene.mode}-360.png`)
    } catch (caught) { setError(caught.message) }
  }
  const exportAll = async () => {
    if (batchRef.current) return
    const batch = { cancelled: false }
    batchRef.current = batch
    setError(null)
    setExportState({ done: 0, total: index.length, status: 'rendering' })
    const files = [], manifest = []
    const panorama = document.createElement('canvas'), sheet = document.createElement('canvas')
    const width = 1024, height = 512, thumbnailWidth = 384, thumbnailHeight = 192, caption = 28
    sheet.width = thumbnailWidth * 3; sheet.height = (thumbnailHeight + caption) * 4
    const sheetContext = sheet.getContext('2d')
    let sheetNumber = 0, sheetNodes = []
    const saveSheet = async () => {
      if (!sheetNodes.length) return
      files.push({ name: `contact-sheets/sheet-${String(++sheetNumber).padStart(2, '0')}.png`, bytes: new Uint8Array(await (await canvasBlob(sheet)).arrayBuffer()) })
      sheetNodes = []
      sheetContext.clearRect(0, 0, sheet.width, sheet.height)
    }
    try {
      for (const node of index) {
        if (batch.cancelled) break
        // Authored baseline is deliberately independent of this saved run.
        // Conditional evidence stays indexed, never treated as reachable state.
        const rendered = buildWorldNodeScene(node.nodeId)
        await renderWorldNodePanorama(panorama, rendered, { width, height, pixelRatio: 1 })
        files.push({ name: `nodes/${node.nodeId}.png`, bytes: new Uint8Array(await (await canvasBlob(panorama)).arrayBuffer()) })
        const tile = sheetNodes.length
        const x = tile % 3 * thumbnailWidth, y = Math.floor(tile / 3) * (thumbnailHeight + caption)
        sheetContext.drawImage(panorama, x, y, thumbnailWidth, thumbnailHeight)
        sheetContext.fillStyle = '#0d1a23'; sheetContext.fillRect(x, y + thumbnailHeight, thumbnailWidth, caption)
        sheetContext.fillStyle = '#dbe8df'; sheetContext.font = '12px system-ui'; sheetContext.textBaseline = 'middle'
        sheetContext.fillText(`${node.nodeId} · 360°`, x + 8, y + thumbnailHeight + caption / 2, thumbnailWidth - 16)
        sheetNodes.push(node.nodeId)
        manifest.push({ ...renderManifest(rendered), image: `nodes/${node.nodeId}.png`, projection: 'equirectangular-360', width, height,
          contactSheet: `contact-sheets/sheet-${String(sheetNumber + 1).padStart(2, '0')}.png`, contactTile: tile })
        if (sheetNodes.length === 12) await saveSheet()
        setExportState({ done: manifest.length, total: index.length, status: 'rendering' })
        await nextFrame()
      }
      if (batch.cancelled) {
        setExportState({ done: manifest.length, total: index.length, status: 'cancelled' })
        return
      }
      await saveSheet()
      files.push({ name: 'scene-audit.json', bytes: new TextEncoder().encode(JSON.stringify({
        format: 'aventura-node-renders-v1', nodeCount: manifest.length, complete: manifest.length === index.length,
        interpretation: 'Every authored node, a full 360° equirectangular panorama from its canonical eye position. Each initial view uses a disclosed minimal authored condition case; inspect other witnesses separately in the app. Unlocated nodes use a labeled local coordinate frame and never claim world coordinates.',
        nodes: manifest,
      }, null, 2)) })
      download(zipArchive(files), 'aventura-all-node-renders.zip')
      setExportState({ done: manifest.length, total: index.length, status: 'complete' })
    } catch (caught) {
      setError(caught.message)
      setExportState({ done: manifest.length, total: index.length, status: 'failed' })
    } finally { batchRef.current = null }
  }

  return <section className="worldnode world3d" data-testid="world-node-view" aria-label="Story node scene renders">
    <div className="worldnode-heading"><div><span className="world3d-eyebrow">AT THE PLAYER’S POSITION</span><h3>Compare the scene with its words</h3></div>
      <button className="btn" onClick={() => inspectNode(state.nodeId)}>Current story node</button></div>
    <p className="world3d-caption">Look through 360° from each story location and compare its modeled objects with the exact prose. A conditional witness is an authored possibility; inspecting it does not change or prove a playable state.</p>
    <div className="worldnode-picker">
      <label>Find a story node<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Scene ID or place…" /></label>
      <label>Story node<select aria-label="Story node render" value={nodeId} onChange={(event) => inspectNode(event.target.value)}>
        {!matchingNodes.some((node) => node.nodeId === nodeId) && <option value={nodeId}>{nodeId} · selected</option>}
        {matchingNodes.map((node) => <option key={node.nodeId} value={node.nodeId}>{node.label}</option>)}
      </select></label>
      <span>{matchingNodes.length} of {index.length} story nodes</span>
    </div>
    <div className="worldnode-mode" role="status">
      <b>{scene.mode === 'live' ? 'Current run' : scene.mode === 'witness' ? 'Conditional witness' : scene.representativeDescriptionId ? 'Representative authored condition' : 'Authored baseline'}</b>
      <span>{scene.location.kind === 'charted' ? `${scene.label} · eye at ${scene.location.placeId}` : 'Unlocated local 360° — no world coordinates'}</span>
      {selectedSource && <code>{sourceAddress(selectedSource)}</code>}
      {scene.representativeDescriptionId && <span>Initial case: <code>{scene.representativeDescriptionId}</code>. This is an authored possibility, not a reached gameplay state.</span>}
      {scene.viewpoint && <span>{scene.viewpoint.kind} · {scene.viewpoint.witness}</span>}
      {scene.narrativeDomain && <span>Embodied tale scene: {scene.narrativeDomain}</span>}
      {selectedDescriptionId && <button className="btn" onClick={() => { setSelectedDescriptionId(null); setSelectedElementId(null); setCamera(null) }}>Return to initial view</button>}
    </div>
    <div className="worldnode-toolbar">
      <label>Projection<select aria-label="Node scene projection" value={projection} onChange={(event) => setProjection(event.target.value)}>
        <option value="look">Interactive 360° look</option><option value="panorama">Full 360° panorama</option>
      </select></label>
      {projection === 'look' && <><label>Camera<select aria-label="Node camera mode" value={viewMode} onChange={(event) => { setViewMode(event.target.value); setCamera(null) }}>
        <option value="first-person">360° player viewpoint</option><option value="orbit">Inspect from outside</option>
      </select></label>
      <button className="btn" onClick={() => turn(-35)}>Look left</button><button className="btn" onClick={() => turn(35)}>Look right</button>
      {directions.map((direction, position) => <button className="btn" key={direction} onClick={() => {
        setViewMode('first-person'); setCamera(lookWorldNodeDirection(nodeSceneCamera(scene, { viewMode: 'first-person' }), position))
      }}>{direction}</button>)}
      <button className="btn" onClick={() => { setViewMode('first-person'); setCamera(null) }}>Reset viewpoint</button></>}
      <button className="btn" onClick={exportCurrent}>Export 360° PNG</button>
    </div>
    <div className="worldnode-comparison">
      <div className="worldnode-visual">
        <canvas className={projection === 'panorama' ? 'is-panorama' : ''} ref={canvasRef} data-testid="world-node-canvas" tabIndex={0} role="img" aria-label="360-degree 3D scene from the story node. Arrow keys look around; drag to look; click an object to inspect its sources."
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { dragRef.current = null }}
          onKeyDown={(event) => {
            if (projection === 'panorama') return
            const delta = { ArrowLeft: [-35, 0], ArrowRight: [35, 0], ArrowUp: [0, -25], ArrowDown: [0, 25] }[event.key]
            if (delta) { event.preventDefault(); turn(...delta) }
            if (event.key === 'Home') { event.preventDefault(); setCamera(null) }
          }} />
        <p className="worldnode-camera-note">{projection === 'panorama' ? `A full 360° × 180° panorama ${scene.location.kind === 'charted' ? 'at the canonical scene position' : 'in an unlocated local frame'}. Use the object selector to trace sources.`
          : `${viewMode === 'first-person' ? (scene.location.kind === 'charted' ? 'The eye stays at the canonical scene position.' : 'The eye stays in an unlocated local frame; no world coordinates are asserted.') : 'External inspection changes the camera, not the objects.'} Drag through 360° · click to trace an object`}</p>
        <label className="worldnode-object-picker">Inspect a modeled object<select aria-label="Node scene object" value={selectedElementId || ''} onChange={(event) => setSelectedElementId(event.target.value || null)}>
          <option value="">Select an object</option>{scene.objects.map((object) => <option key={object.id} value={object.id}>{object.label || object.id}</option>)}
        </select></label>
        {selectedObject && <div className="worldnode-object" data-testid="world-node-object">
          <h4>{selectedObject.label || selectedObject.id}</h4><code>{selectedObject.id}</code>
          <p>{selectedObject.asset} · {selectedObject.position?.join(' / ')}</p>
          <p>{selectedObject.countExact === false ? `Representative group of ${selectedObject.sourceCount}; the prose does not give an exact count.` : `Authored count: ${selectedObject.sourceCount || 1}.`} Placement and dimensions are illustrative unless the source specifies them.</p>
          {selectedObject.attributes?.headCountExact === false && <p>The pictured heads represent an unspecified plurality; their number is illustrative.</p>}
          {selectedAttributeReview && <div className="worldnode-attribute-review" data-testid="world-node-attribute-review">
            <b>Visual treatment</b>
            <p>{selectedAttributeReview.rendered.length ? `Rendered attributes: ${selectedAttributeReview.rendered.map(({ property }) => property).join(', ')}.` : 'This object uses its base composed mesh.'}</p>
            {!!selectedAttributeReview.unsupported.length && <p className="worldnode-unmodeled">Not yet visually modeled: {selectedAttributeReview.unsupported.map(({ property }) => property).join(', ')}. These remain source claims, not visual proof.</p>}
            {!!selectedAttributeReview.metadataOnly.length && <p>Metadata without an additional mesh change: {selectedAttributeReview.metadataOnly.map(({ property }) => property).join(', ')}.</p>}
          </div>}
          <b>Exact source descriptions</b>
          {(selectedObject.sourceDescriptions || scene.descriptions.filter((description) => selectedObject.descriptionIds?.includes(description.id) || selectedObject.claimIds?.includes(description.id)))
            .map((description) => <div key={description.id} className="worldnode-object-source">
              <button className="world3d-binding" onClick={() => inspectDescription(description)}>{sourceAddress(description)}</button>
              <p lang="sq">{description.text}</p>
              {description.nodeId !== nodeId && <span>Established in {description.nodeId}; selecting its source opens that scene.</span>}
            </div>)}
          <details><summary>Object construction</summary><pre>{JSON.stringify(selectedObject, null, 2)}</pre></details>
        </div>}
        {!!scene.limitations?.length && <details className="worldnode-limitations"><summary>What this scene establishes</summary><ul>{scene.limitations.map((limit, position) => <li key={position}>{limit}</li>)}</ul></details>}
      </div>
      <div className="worldnode-prose" aria-label="Prose beside the node render">
        <h4>{scene.nodeId} · exact scene prose</h4>
        <p className="world3d-small">Highlighted sources support the selected object. Inactive conditions stay separate until inspected.</p>
        {scene.descriptions.map((description) => {
          const linked = selectedObject && (selectedObject.descriptionIds?.includes(description.id) || selectedObject.claimIds?.includes(description.id))
          const physical = description.physicalClaims || []
          const unsupported = physical.flatMap((object) => worldScene3dAssetAttributeReview(object.asset, object.attributes || {}).unsupported.map(({ property }) => `${object.label}: ${property}`))
          return <article key={description.id} className={`${description.active ? 'is-active' : 'is-inactive'}${linked || selectedDescriptionId === description.id ? ' is-selected' : ''}`} data-description-id={description.id}>
            <div className="worldnode-source"><code>{sourceAddress(description)}</code><span>{description.active ? 'Active scene prose' : 'Separate authored condition'}</span></div>
            <p lang="sq">{description.text}</p>
            {description.reading && <p className="worldnode-reading">{description.reading}</p>}
            <strong className="worldnode-disposition">{dispositionLabel(description)}</strong>
            {description.rationale && <p className="world3d-small">{description.rationale}</p>}
            {physical.length > 0 && <div className="worldnode-claims">{physical.map((object) => <span key={object.id || object.key}>{object.label || object.asset || object.id || object.key}</span>)}</div>}
            {unsupported.length > 0 && <p className="worldnode-unmodeled">Not yet visually modeled: {unsupported.join('; ')}.</p>}
            <button className="btn" onClick={() => inspectDescription(description)}>{description.active ? 'Highlight this description' : 'Inspect this condition'}</button>
            <details><summary>Source and conditions</summary><pre>{conditionText({ source: description.source, conditions: description.conditions,
              disposition: description.disposition, states: description.states, relations: description.relations })}</pre></details>
          </article>
        })}
      </div>
    </div>
    <section className="worldnode-export" aria-label="Export every story node render">
      <h4>Render every story location in 360°</h4><p>Export one 1024 × 512 full-sphere panorama for each of the {index.length} nodes, contact sheets, and a JSON manifest mapping every rendered object to its source. Each initial view uses a disclosed authored condition case; its selected case and every alternative remain identified in the manifest.</p>
      <button className="btn" disabled={exportState?.status === 'rendering'} onClick={exportAll}>Render all {index.length} nodes & export ZIP</button>
      {exportState?.status === 'rendering' && <button className="btn" onClick={() => { if (batchRef.current) batchRef.current.cancelled = true }}>Cancel batch render</button>}
      {exportState && <div role="status" data-testid="world-node-export-progress"><progress max={exportState.total} value={exportState.done} />{exportState.done} / {exportState.total} · {exportState.status}</div>}
      {error && <p role="alert">{error}</p>}
    </section>
  </section>
}
