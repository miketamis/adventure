import { memo, useMemo, useState } from 'react'
import { VillageMap, buildGraph } from './WorldMapView.jsx'
import { environmentSnapshot, fireStateOf, liveNpcs } from '../game/gameState.js'

// ===========================================================================
// MINIMAP — the debug World map, docked as a small panel on the right while you
// play. It reuses VillageMap (compact: no intro text; the toolbar is hidden
// until you expand). ⤢ blows it up to full screen; ✕ tucks it into a 🗺 button.
// Only mounted in debug mode, and only outside the full Debug tab (where the
// same map already fills the page).
// ===========================================================================
export function MiniMap({ state, dispatch }) {
  const g = useMemo(buildGraph, [])
  const [open, setOpen] = useState(true)
  const [expanded, setExpanded] = useState(false)
  // clicking "open in Story Graph" jumps to the full Debug tab
  const goGraph = () => { setExpanded(false); dispatch({ type: 'SET_VIEW', view: 'debug' }) }
  const environment = environmentSnapshot(state)
  const { phase, weather, season } = environment

  if (!open) {
    return (
      <button className="minimap-launch" title="Show the world map" onClick={() => setOpen(true)}>
        🗺
      </button>
    )
  }

  return (
    <div
      className={'minimap' + (expanded ? ' expanded' : '')}
      data-performance-surface="debug-minimap"
    >
      <div className="minimap-bar">
        <span className="minimap-title" title={[phase, weather, season].filter(Boolean).join(' · ')}>
          🗺 map · {phase}{weather ? ` · ${weather}` : ''}
        </span>
        <button className="minimap-btn" title={expanded ? 'Restore' : 'Full screen'}
                onClick={() => setExpanded((e) => !e)}>{expanded ? '⤡' : '⤢'}</button>
        <button className="minimap-btn" title="Hide map"
                onClick={() => { setExpanded(false); setOpen(false) }}>✕</button>
      </div>
      <div className="minimap-body">
        <VillageMap state={state} g={g} current={state.nodeId}
          objective={state.embodying && state.embodimentPaused ? state.embodimentFocusNode : null}
          goGraph={goGraph} compact follow
          world={{ ...environment, fire: fireStateOf(state) }} npcs={liveNpcs(state)}
          rumors={Object.keys(state.heard || {}).filter((id) => !state.visited?.[id])} />
      </div>
    </div>
  )
}

// The map contains thousands of SVG nodes. Train answers, dictionary changes,
// modal state and view switches do not alter it, so keep that tree out of those
// commits. Every canonical input that can change map content remains explicit
// in this comparator.
const sameMapState = (left, right) => (
  left.nodeId === right.nodeId &&
  left.cameFrom === right.cameFrom &&
  left.choiceIndex === right.choiceIndex &&
  left.clock === right.clock &&
  left.conditionClock === right.conditionClock &&
  left.embodying === right.embodying &&
  left.embodimentClock === right.embodimentClock &&
  left.embodimentPaused === right.embodimentPaused &&
  left.embodimentFocusNode === right.embodimentFocusNode &&
  left.worldFacts === right.worldFacts &&
  left.fixtures === right.fixtures &&
  left.npcStarted === right.npcStarted &&
  left.heard === right.heard &&
  left.visited === right.visited
)

export default memo(MiniMap, (before, after) => (
  before.dispatch === after.dispatch && sameMapState(before.state, after.state)
))
