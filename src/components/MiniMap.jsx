import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { buildWorldNodeScene } from '../game/worldScene3dNodes.js'
import { drawWorldNodeScene, nodeSceneCamera, turnWorldNodeCamera } from './worldScene3dNodeRenderer.js'

// Mounted only in debug mode. Use the live story projection so observations,
// inventory, tale time and movement agree with the scene the player is reading.
function CurrentScene({ state, expanded, onExpand, onHide }) {
  const scene = useMemo(() => buildWorldNodeScene(state.nodeId, { state }), [state])
  const origin = JSON.stringify([scene.nodeId, scene.camera])
  const [look, setLook] = useState(null)
  const camera = look?.origin === origin ? look.camera : nodeSceneCamera(scene)
  const canvasRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    let frame
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => drawWorldNodeScene(canvas, scene, { camera }))
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(canvas)
    schedule()
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [scene, camera])

  const turn = (dx, dy = 0) => setLook((previous) => ({
    origin,
    camera: turnWorldNodeCamera(previous?.origin === origin ? previous.camera : nodeSceneCamera(scene), dx, dy),
  }))
  const endDrag = () => { dragRef.current = null }

  return <>
    <div className="minimap-bar">
      <span className="minimap-title" title={scene.label}>360° · {scene.label}</span>
      <button className="minimap-btn" title="Reset 360° view" aria-label="Reset 360° view"
        onClick={() => setLook(null)}>↺</button>
      <button className="minimap-btn" title={expanded ? 'Restore' : 'Full screen'}
        aria-label={expanded ? 'Restore 360° view' : 'Expand 360° view'}
        onClick={onExpand}>{expanded ? '⤡' : '⤢'}</button>
      <button className="minimap-btn" title="Hide 360° view" aria-label="Hide 360° view"
        onClick={onHide}>✕</button>
    </div>
    <div className="minimap-body">
      <canvas ref={canvasRef} className="minimap-scene" data-testid="minimap-scene"
        data-node-id={scene.nodeId} tabIndex={0} role="img"
        aria-label={`360-degree view at ${scene.label}. Drag or use arrow keys to look around.`}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return
          event.currentTarget.focus({ preventScroll: true })
          event.currentTarget.setPointerCapture(event.pointerId)
          dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current
          if (!drag || drag.id !== event.pointerId) return
          turn(event.clientX - drag.x, event.clientY - drag.y)
          dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
        }}
        onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
        onKeyDown={(event) => {
          const direction = { ArrowLeft: [-25, 0], ArrowRight: [25, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[event.key]
          if (!direction) return
          event.preventDefault()
          turn(...direction)
        }} />
    </div>
    <div className="minimap-hint">Drag or use arrow keys to look around{scene.localOnly ? ' · Unlocated scene' : ''}</div>
  </>
}

export function MiniMap({ state }) {
  const [open, setOpen] = useState(true)
  const [expanded, setExpanded] = useState(false)
  if (!open) return <button className="minimap-launch" title="Show current 360° view"
    aria-label="Show current 360° view" onClick={() => setOpen(true)}>360°</button>

  return <section className={'minimap' + (expanded ? ' expanded' : '')}
    aria-label="Current location 360° view" data-performance-surface="debug-minimap">
    <CurrentScene state={state} expanded={expanded} onExpand={() => setExpanded((value) => !value)}
      onHide={() => { setExpanded(false); setOpen(false) }} />
  </section>
}

// Scene presentation consumes more than location: keep every world/visibility
// input current without rebuilding geometry for unrelated Train or tab state.
const sameMapState = (left, right) => (
  left.nodeId === right.nodeId &&
  left.cameFrom === right.cameFrom &&
  left.cameFromPhase === right.cameFromPhase &&
  left.choiceIndex === right.choiceIndex &&
  left.turn === right.turn &&
  left.clock === right.clock &&
  left.conditionClock === right.conditionClock &&
  left.embodying === right.embodying &&
  left.embodimentClock === right.embodimentClock &&
  left.embodimentPaused === right.embodimentPaused &&
  left.embodimentFocusNode === right.embodimentFocusNode &&
  left.worldFacts === right.worldFacts &&
  left.fixtures === right.fixtures &&
  left.npcStarted === right.npcStarted &&
  left.npcPortraitsSeen === right.npcPortraitsSeen &&
  left.activeNpcPortraits === right.activeNpcPortraits &&
  left.heard === right.heard &&
  left.visited === right.visited &&
  left.familiar === right.familiar &&
  left.rumor === right.rumor &&
  left.inventory === right.inventory &&
  left.flags === right.flags &&
  left.knowledge === right.knowledge &&
  left.observations === right.observations &&
  left.quests === right.quests &&
  left.rendezvous === right.rendezvous &&
  left.interactions === right.interactions &&
  left.discovered === right.discovered &&
  left.hearts === right.hearts &&
  left.healedAt === right.healedAt &&
  left.healthNarration === right.healthNarration &&
  left.inventoryNarration === right.inventoryNarration &&
  left.ended === right.ended
)

export default memo(MiniMap, (before, after) => sameMapState(before.state, after.state))
