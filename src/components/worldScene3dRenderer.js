// A small, dependency-free perspective renderer for the canonical scene model.
// Chart x/z are authoritative; object sizes and height are symbolic display
// dimensions, never terrain surveys or claims about geographic elevation.
const TAU = Math.PI * 2
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const finite = (value, fallback) => Number.isFinite(value) ? value : fallback
const REGION_COLORS = Object.freeze({
  sky: '#b9bfdc', mountain: '#aaa6bc', forest: '#568e78', river: '#64a8b2',
  castle: '#c3a188', lake: '#72a2c3', sea: '#5896b6', underworld: '#a18bb1',
  village: '#c8b480', princeland: '#c3a1a6',
})
const KIND_COLORS = Object.freeze({
  feature: '#b4c6bd', fixture: '#e6b977', perception: '#bd9ce1',
  environment: '#7dcad0', actor: '#eaa78d',
})
const meshCache = new WeakMap()
let referenceLayoutCache = { elements: [], display: [] }
const hasPosition = (element) => Array.isArray(element.position) && element.position.length === 3 && element.position.every(Number.isFinite)

// References have no geographic coordinates. Lay out a separate, compact
// gallery using display copies, including records with no authored geometry.
function referenceDisplayElements(elements) {
  if (elements.length === referenceLayoutCache.elements.length && elements.every((element, index) => element === referenceLayoutCache.elements[index])) return referenceLayoutCache.display
  const columns = Math.max(1, Math.ceil(Math.sqrt(elements.length * 1.5)))
  const rows = Math.ceil(elements.length / columns)
  const display = elements.map((element, index) => ({
    ...element,
    position: [(index % columns - (columns - 1) / 2) * 60, 8, (Math.floor(index / columns) - (rows - 1) / 2) * 54],
    geometry: { shape: element.geometry?.shape || 'box', size: element.geometry?.size || [12, 12, 12] },
    displayOnly: true,
  }))
  referenceLayoutCache = { elements, display }
  return display
}

function elementInRegion(element, regionId) {
  return !regionId || regionId === 'all' || element.regionId === regionId
    || element.regionIds?.includes(regionId)
}

function safeCamera(camera = {}) {
  return {
    target: (camera.target || [0, 0, 0]).map((n) => finite(n, 0)),
    yaw: finite(camera.yaw, -0.24),
    pitch: clamp(finite(camera.pitch, 0.92), 0.2, 1.48),
    distance: Math.max(10, finite(camera.distance, 2400)),
    zoom: clamp(finite(camera.zoom, 1), 0.25, 12),
  }
}

export function defaultCameraForScene(model, { regionId, elementId, elementIds, catalogueView = false, catalogueIds } = {}) {
  const elements = model.elements || []
  const focused = elementId && elements.find((element) => element.id === elementId)
  const referenceFocus = focused?.catalogue || (elementIds?.length && elementIds.every((id) => elements.find((element) => element.id === id)?.catalogue))
  const referenceIds = catalogueIds ?? (catalogueView ? null : elementIds || (elementId ? [elementId] : null))
  const referenceSet = referenceIds && new Set(referenceIds)
  const references = catalogueView || referenceFocus ? referenceDisplayElements(elements.filter((element) => element.catalogue
    && (!referenceSet || referenceSet.has(element.id)))) : null
  const basis = references || elements
  let scope = elementIds?.length ? basis.filter((element) => elementIds.includes(element.id)) : focused ? basis.filter((element) => element.id === focused.id)
    : references || elements.filter((element) => (
    elementInRegion(element, regionId) && element.kind !== 'region' && !element.catalogue
  ))
  scope = scope.filter(hasPosition)
  if (!scope.length) scope = references || elements.filter((element) => !element.catalogue && hasPosition(element))
  if (!scope.length) return safeCamera()
  const bounds = [[Infinity, -Infinity], [Infinity, -Infinity], [Infinity, -Infinity]]
  for (const element of scope) {
    element.position.forEach((value, axis) => {
      const size = element.geometry?.size || [0, 0, 0]
      const yaw = finite(element.geometry?.rotationY, 0)
      const radius = (axis === 0 ? Math.abs(Math.cos(yaw)) * size[0] + Math.abs(Math.sin(yaw)) * size[2]
        : axis === 2 ? Math.abs(Math.sin(yaw)) * size[0] + Math.abs(Math.cos(yaw)) * size[2] : size[1]) / 2
      bounds[axis][0] = Math.min(bounds[axis][0], value - radius)
      bounds[axis][1] = Math.max(bounds[axis][1], value + radius)
    })
  }
  const target = bounds.map(([min, max]) => (min + max) / 2)
  const span = Math.max(180, ...bounds.map(([min, max]) => max - min))
  return safeCamera({ target, yaw: -0.24, pitch: 0.92, distance: span * 1.55, zoom: 1 })
}

export function orbitWorldSceneCamera(camera, dx, dy) {
  const next = safeCamera(camera)
  next.yaw = ((next.yaw - dx * 0.007) % TAU + TAU) % TAU
  next.pitch = clamp(next.pitch + dy * 0.006, 0.2, 1.48)
  return next
}

export function zoomWorldSceneCamera(camera, factor) {
  const next = safeCamera(camera)
  next.zoom = clamp(next.zoom * finite(factor, 1), 0.25, 12)
  return next
}

export function panWorldSceneCamera(camera, dx, dy, width, height) {
  const next = safeCamera(camera)
  const units = next.distance / (Math.max(1, Math.min(width, height)) * 1.04 * next.zoom)
  const along = -dy * units / Math.max(0.2, Math.sin(next.pitch))
  next.target = [
    next.target[0] - dx * units * Math.cos(next.yaw) + along * Math.sin(next.yaw),
    next.target[1],
    next.target[2] + dx * units * Math.sin(next.yaw) + along * Math.cos(next.yaw),
  ]
  return next
}

function makeProjector(camera, width, height) {
  const view = safeCamera(camera)
  const sinYaw = Math.sin(view.yaw), cosYaw = Math.cos(view.yaw)
  const sinPitch = Math.sin(view.pitch), cosPitch = Math.cos(view.pitch)
  const focalLength = Math.min(width, height) * 1.04 * view.zoom
  return (point) => {
    const x = point[0] - view.target[0], y = point[1] - view.target[1], z = point[2] - view.target[2]
    const radial = x * sinYaw + z * cosYaw
    const depth = view.distance - radial * cosPitch - y * sinPitch
    if (!Number.isFinite(depth) || depth <= 1) return null
    const scale = focalLength / depth
    return { x: width / 2 + (x * cosYaw - z * sinYaw) * scale,
      y: height / 2 - (y * cosPitch - radial * sinPitch) * scale, depth, scale }
  }
}

/** Project a world point to CSS canvas pixels. Depth is distance from the eye. */
export function projectWorldScenePoint(point, camera, width, height) {
  return makeProjector(camera, width, height)(point)
}

function polygonNormal(vertices) {
  const a = vertices[1].map((value, i) => value - vertices[0][i])
  const b = vertices[2].map((value, i) => value - vertices[0][i])
  const normal = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const length = Math.hypot(...normal) || 1
  return normal.map((value) => value / length)
}

export function worldScene3dMesh(element) {
  if (!hasPosition(element)) return []
  if (meshCache.has(element)) return meshCache.get(element)
  const [width, height, depth] = element.geometry?.size || [16, 12, 16]
  const [x, y, z] = element.position
  const w = width / 2, h = height / 2, d = depth / 2
  const shape = element.geometry?.shape || 'box'
  let polygons
  if (shape === 'plane' && element.kind !== 'region') {
    polygons = [[[-w, 0, -d], [-w, 0, d], [w, 0, d], [w, 0, -d]]]
  } else if (['cylinder', 'cone', 'pyramid'].includes(shape) || element.kind === 'region') {
    const sides = shape === 'pyramid' ? 4 : element.kind === 'region' ? 16 : 8
    const ring = Array.from({ length: sides }, (_, i) => [
      Math.cos(i * TAU / sides) * w, -h, Math.sin(i * TAU / sides) * d,
    ])
    if (shape === 'cone' || shape === 'pyramid') {
      polygons = ring.map((vertex, i) => [vertex, [0, h, 0], ring[(i + 1) % sides]])
      polygons.push(ring)
    } else {
      const top = ring.map(([rx, , rz]) => [rx, h, rz])
      polygons = ring.map((vertex, i) => [vertex, top[i], top[(i + 1) % sides], ring[(i + 1) % sides]])
      polygons.push(top.slice().reverse(), ring)
    }
  } else {
    const v = [[-w, -h, -d], [w, -h, -d], [w, -h, d], [-w, -h, d],
      [-w, h, -d], [w, h, -d], [w, h, d], [-w, h, d]]
    polygons = [[0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0], [4, 7, 6, 5], [0, 1, 2, 3]]
      .map((indices) => indices.map((index) => v[index]))
  }
  const yaw = finite(element.geometry?.rotationY, 0)
  const mesh = polygons.map((vertices) => {
    const rotated = vertices.map(([vx, vy, vz]) => [
      x + vx * Math.cos(yaw) + vz * Math.sin(yaw), y + vy,
      z - vx * Math.sin(yaw) + vz * Math.cos(yaw),
    ])
    return { vertices: rotated, normal: polygonNormal(rotated) }
  })
  meshCache.set(element, mesh)
  return mesh
}

function shade(hex, amount, alpha = 1) {
  const safeHex = /^#[\da-f]{6}$/i.test(hex) ? hex.slice(1) : '92b2aa'
  const channels = [0, 2, 4].map((index) => clamp(Math.round(parseInt(safeHex.slice(index, index + 2), 16) * amount), 0, 255))
  return `rgba(${channels.join(',')},${alpha})`
}

function tracePolygon(context, points) {
  context.beginPath()
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y)
    else context.lineTo(point.x, point.y)
  })
  context.closePath()
}

function pointInPolygon(x, y, polygon) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j]
    if (((a.y > y) !== (b.y > y)) && x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) inside = !inside
  }
  return inside
}

/** Nearer geometry wins; small markers also have a usable minimum hit radius. */
export function hitTestWorldScene3d(hits, x, y) {
  const priority = (hit) => hit.transparent ? 2 : hit.element.kind === 'place' ? 1 : 0
  const ordered = hits.filter((hit) => hit.element.kind !== 'region')
    .sort((a, b) => priority(a) - priority(b) || a.depth - b.depth)
  const exact = ordered.find((hit) => hit.polygons.some((polygon) => pointInPolygon(x, y, polygon)))
  if (exact) return exact
  return ordered.find((hit) => Math.hypot(hit.x - x, hit.y - y) <= hit.radius)
    || hits.find((hit) => hit.element.kind === 'region' && hit.polygons.some((polygon) => pointInPolygon(x, y, polygon)))
    || null
}

/** Survey mode shows labelled possibilities; evidence mode isolates a witness. */
export function visibleWorldSceneElements(model, options = {}) {
  const elements = model.elements || []
  if (options.catalogueView) return elements.filter((element) => element.catalogue
    && (!options.catalogueIds || options.catalogueIds.includes(element.id)))
  const selected = elements.find((element) => element.id === options.selectedId)
  const focusedReferences = options.focusedDescriptionId
    ? elements.filter((element) => element.catalogue && element.descriptionIds?.includes(options.focusedDescriptionId))
    : []
  // Reference-shelf coordinates are layout only. Never mix these symbols with
  // physical world geometry, or let them expand the overview camera bounds.
  if (options.surveyMode !== 'all' && options.focusedDescriptionId && focusedReferences.length
    && (!selected || selected.catalogue)) return focusedReferences
  if (options.surveyMode !== 'all' && !options.focusedDescriptionId && selected?.catalogue) return [selected]
  const selectedPlace = selected?.placeId
  const visible = elements.filter((element) => {
    if (element.catalogue) return false
    if (!elementInRegion(element, options.regionId)) return false
    if (options.surveyMode === 'all') return !options.enabledKinds
      || ['region', 'place'].includes(element.kind) || options.enabledKinds.includes(element.kind)
    const focused = element.id === options.selectedId
      || (options.focusedDescriptionId && element.descriptionIds?.includes(options.focusedDescriptionId))
    if (element.conditional) return options.focusedDescriptionId
      ? Boolean(element.descriptionIds?.includes(options.focusedDescriptionId))
      : element.id === options.selectedId
    return !['environment', 'perception', 'actor'].includes(element.kind) || options.showDetailMarkers
      || focused || (selectedPlace && element.placeId === selectedPlace)
  })
  const ids = new Set(visible.map(({ id }) => id))
  for (const element of visible.slice()) {
    for (const relation of element.relations || []) {
      if (relation.kind !== 'inside') continue
      const id = relation.targetId.startsWith('feature:') ? relation.targetId : `feature:${relation.targetId}`
      const container = elements.find((candidate) => candidate.id === id)
      if (container && !ids.has(id)) { visible.push(container); ids.add(id) }
    }
  }
  return visible
}

/** Layout-only reference copies; physical elements preserve canonical geometry. */
export function worldScene3dDisplayElements(model, options = {}) {
  const visible = visibleWorldSceneElements(model, options)
  return visible.some((element) => element.catalogue) ? referenceDisplayElements(visible) : visible.filter(hasPosition)
}

// A scene/region context link identifies where a sentence is told. Highlighting
// that whole region as an asserted object would erase the audit distinction.
export function highlightedWorldSceneElements(model, options = {}) {
  const description = model.descriptions?.find(({ id }) => id === options.focusedDescriptionId)
  return new Set([options.selectedId, ...(description?.bindings || [])
    .filter(({ type }) => !['scene-context', 'region-context'].includes(type))
    .map(({ elementId }) => elementId)].filter(Boolean))
}

/**
 * Draw the actual meshes, route links and authored sightlines. Returns picking
 * geometry in CSS pixels; callers own interaction and accessible DOM controls.
 */
export function drawWorldScene3d(canvas, model, options = {}) {
  const context = canvas.getContext('2d')
  if (!context) return []
  const rect = canvas.getBoundingClientRect()
  const width = Math.max(1, rect.width), height = Math.max(1, rect.height)
  const pixelRatio = Math.min(2, globalThis.devicePixelRatio || 1)
  if (canvas.width !== Math.round(width * pixelRatio) || canvas.height !== Math.round(height * pixelRatio)) {
    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
  }
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  context.clearRect(0, 0, width, height)
  const background = context.createLinearGradient(0, 0, width * 0.55, height)
  background.addColorStop(0, '#132432')
  background.addColorStop(0.62, '#0d1b29')
  background.addColorStop(1, '#172734')
  context.fillStyle = background
  context.fillRect(0, 0, width, height)
  const camera = safeCamera(options.camera || defaultCameraForScene(model, options))
  const project = makeProjector(camera, width, height)
  const elements = worldScene3dDisplayElements(model, options)
  const catalogueView = Boolean(options.catalogueView) || elements.some((element) => element.catalogue)
  const surveyView = options.surveyMode === 'all' && !catalogueView
  const ids = new Set(elements.map((element) => element.id))
  const highlighted = highlightedWorldSceneElements(model, options)
  const inspectedContainers = new Set(elements.filter((element) => highlighted.has(element.id))
    .flatMap((element) => (element.relations || []).filter(({ kind }) => kind === 'inside')
      .map(({ targetId }) => targetId.startsWith('feature:') ? targetId : `feature:${targetId}`)))
  const cutawayView = elements.some((element) => highlighted.has(element.id)
    && element.position[1] - (element.geometry?.size?.[1] || 0) / 2 < -3 && element.kind !== 'region')
  const hits = []
  const primitives = []

  for (const element of elements) {
    const center = project(element.position)
    if (!center) continue
    const active = highlighted.has(element.id)
    const featureColor = element.kind === 'feature' && element.geometry?.shape === 'cone' ? '#70ab8c'
      : element.kind === 'feature' && element.geometry?.shape === 'pyramid' ? '#aeb5c7' : null
    const color = element.color || element.geometry?.color || featureColor || KIND_COLORS[element.kind]
      || REGION_COLORS[element.regionId] || '#a3bbaa'
    // In a survey these meshes stand for authored possibilities, not a claim
    // that all actor stops, fixture states or conditional structures coexist.
    const possibility = surveyView && element.conditional
    const hit = { id: element.id, elementId: element.id, element, polygons: [], ...center, radius: 8,
      transparent: inspectedContainers.has(element.id) }
    for (const face of worldScene3dMesh(element)) {
      const projected = face.vertices.map(project)
      if (projected.some((point) => !point)) continue
      // Keep polygons crossing the viewport even when their centers are offscreen.
      if (projected.every((p) => p.x < -20) || projected.every((p) => p.x > width + 20)
        || projected.every((p) => p.y < -20) || projected.every((p) => p.y > height + 20)) continue
      hit.polygons.push(projected)
      const lighting = clamp(0.72 + face.normal[0] * -0.12 + face.normal[1] * 0.25 + face.normal[2] * -0.16, 0.48, 1.15)
      primitives.push({
        type: 'face', points: projected, depth: projected.reduce((sum, p) => sum + p.depth, 0) / projected.length,
        element, active, possibility, color: shade(active ? '#e9e1ad' : color,
          lighting * (element.kind === 'region' ? face.normal[1] > 0.5 ? 0.62 : 0.44 : 1),
          element.kind === 'region' ? 0.82 : inspectedContainers.has(element.id) ? 0.18 : possibility ? 0.48 : 1),
      })
    }
    if (hit.polygons.length) hits.push(hit)
  }

  const links = [
    ...(options.showRoutes === false ? [] : (model.routes || []).map((route) => ({ ...route, lineKind: 'route' }))),
    ...(options.showSightlines === false ? [] : (model.relations || []).filter((relation) => relation.kind === 'sightline')
      .map((relation) => ({ ...relation, lineKind: 'sightline' }))),
  ]
  for (const link of links) {
    if (!ids.has(link.fromElementId) || !ids.has(link.toElementId) || !link.points?.length) continue
    const points = link.points.map(project)
    if (points.some((point) => !point)) continue
    const active = highlighted.has(link.fromElementId) || highlighted.has(link.toElementId)
    for (let i = 1; i < points.length; i += 1) {
      primitives.push({ type: 'line', points: [points[i - 1], points[i]],
        depth: (points[i - 1].depth + points[i].depth) / 2, active, link })
    }
  }

  // Terrain slabs are the schematic support layer. Draw their complete meshes
  // first so a broad top face cannot cover a small place through painter-sort
  // imprecision. Below-ground features remain visible as an explicit cutaway.
  primitives.sort((a, b) => Number(b.element?.kind === 'region') - Number(a.element?.kind === 'region') || b.depth - a.depth)
  for (const primitive of primitives) {
    if (primitive.type === 'face') {
      tracePolygon(context, primitive.points)
      context.fillStyle = primitive.color
      context.fill()
      context.strokeStyle = primitive.active ? 'rgba(255,238,173,.72)'
        : primitive.element.kind === 'region' ? 'rgba(155,196,204,.15)' : 'rgba(11,24,31,.24)'
      context.lineWidth = primitive.active ? 1.2 : 0.65
      context.setLineDash(primitive.possibility ? [3, 3] : [])
      context.stroke()
      context.setLineDash([])
    } else {
      const sightline = primitive.link.lineKind === 'sightline'
      context.beginPath()
      context.moveTo(primitive.points[0].x, primitive.points[0].y)
      context.lineTo(primitive.points[1].x, primitive.points[1].y)
      context.strokeStyle = primitive.active ? sightline ? '#d6b4f0' : '#eddb9c'
        : sightline ? 'rgba(195,159,221,.30)' : 'rgba(143,178,179,.24)'
      context.lineWidth = primitive.active ? 2 : 0.8
      context.setLineDash(sightline ? [2, 5] : primitive.link.spatial === false ? [5, 5] : [])
      context.stroke()
      context.setLineDash([])
      if (primitive.active && !sightline) {
        const [from, to] = primitive.points
        const length = Math.hypot(to.x - from.x, to.y - from.y)
        if (length > 22) {
          const ux = (to.x - from.x) / length, uy = (to.y - from.y) / length
          const x = from.x + (to.x - from.x) * 0.7, y = from.y + (to.y - from.y) * 0.7
          context.beginPath()
          context.moveTo(x - ux * 5 - uy * 3, y - uy * 5 + ux * 3)
          context.lineTo(x, y)
          context.lineTo(x - ux * 5 + uy * 3, y - uy * 5 - ux * 3)
          context.stroke()
        }
      }
    }
  }

  const labels = []
  const localChoiceCounts = new Map()
  for (const route of model.routes || []) {
    if (route.samePlace) localChoiceCounts.set(route.fromElementId, (localChoiceCounts.get(route.fromElementId) || 0) + 1)
  }
  for (const hit of hits) {
    const active = highlighted.has(hit.id)
    const place = hit.element.kind === 'place'
    if (place || active || catalogueView || (surveyView && hit.element.kind !== 'region')) {
      const top = project([hit.element.position[0], hit.element.position[1] + (hit.element.geometry?.size?.[1] || 0) / 2, hit.element.position[2]])
      if (!top || top.x < -10 || top.x > width + 10 || top.y < -10 || top.y > height + 10) continue
      const radius = active ? 5 : 2.2
      context.beginPath()
      context.arc(top.x, top.y, radius, 0, TAU)
      context.fillStyle = active ? '#fff0b8' : '#dde9d9'
      context.fill()
      if (active) {
        context.beginPath()
        context.arc(top.x, top.y, 10, 0, TAU)
        context.strokeStyle = 'rgba(255,237,178,.7)'
        context.lineWidth = 1
        context.stroke()
      }
      if (active || options.showLabels !== false) labels.push({ hit, top, active })
    }
  }
  // Keep the place chart legible when every annotation layer is enabled.
  // Overlap only suppresses labels; the symbols and inventory remain complete.
  const labelPriority = (kind) => ({ place: 0, feature: 1, barrier: 2, actor: 3, fixture: 4 }[kind] ?? 5)
  labels.sort((a, b) => Number(b.active) - Number(a.active)
    || labelPriority(a.hit.element.kind) - labelPriority(b.hit.element.kind) || a.hit.depth - b.hit.depth)
  const occupied = []
  context.font = '500 11px system-ui, sans-serif'
  context.textBaseline = 'middle'
  for (const { hit, top, active } of labels) {
    const suffix = surveyView && hit.element.conditional ? ' · possible'
      : catalogueView ? ' · reference' : ''
    const localCount = localChoiceCounts.get(hit.id)
    const countLabel = surveyView && localCount ? ` · ${localCount} local choice${localCount === 1 ? '' : 's'}` : ''
    const ending = `${suffix}${countLabel}`
    let name = hit.element.label || hit.element.id
    const maxLabelWidth = Math.min(250, width - 8)
    const nameWidth = Math.max(0, maxLabelWidth - 16 - context.measureText(ending).width)
    if (context.measureText(name).width > nameWidth) {
      while (name.length && context.measureText(`${name}…`).width > nameWidth) name = name.slice(0, -1)
      name += '…'
    }
    const label = `${name}${ending}`
    const labelWidth = Math.min(maxLabelWidth, context.measureText(label).width + 16)
    const box = { x: clamp(top.x + 9, 4, Math.max(4, width - labelWidth - 4)), y: top.y - 9, w: labelWidth, h: 19 }
    if (!active && occupied.some((other) => box.x < other.x + other.w + 5 && box.x + box.w + 5 > other.x
      && box.y < other.y + other.h + 3 && box.y + box.h + 3 > other.y)) continue
    occupied.push(box)
    context.fillStyle = active ? '#34413e' : 'rgba(11,24,34,.83)'
    context.fillRect(box.x, box.y, box.w, box.h)
    context.fillStyle = active ? '#fff0b8' : '#cddedb'
    context.fillText(label, box.x + 8, box.y + 9.5, labelWidth - 16)
    hit.polygons.push([{ x: box.x, y: box.y }, { x: box.x + box.w, y: box.y },
      { x: box.x + box.w, y: box.y + box.h }, { x: box.x, y: box.y + box.h }])
  }
  const note = catalogueView ? 'UNLOCATED REFERENCE · symbolic catalogue geometry'
    : cutawayView ? 'CUTAWAY · below-ground geometry shown through the chart'
      : surveyView ? 'SURVEY · authored possibilities, not a simultaneous state' : null
  if (note) {
    context.font = '600 11px system-ui, sans-serif'
    context.textBaseline = 'middle'
    context.fillStyle = 'rgba(11,24,34,.92)'
    context.fillRect(10, 13, Math.min(width - 20, context.measureText(note).width + 16), 24)
    context.fillStyle = '#a8c7c0'
    context.fillText(note, 18, 25, Math.max(1, width - 36))
  }
  return hits
}
