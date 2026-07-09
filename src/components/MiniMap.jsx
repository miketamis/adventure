import { useMemo, useState } from 'react'
import { VillageMap, buildGraph } from './DebugView.jsx'
import { fireStateOf, liveNpcs } from '../game/gameState.js'

// ===========================================================================
// MINIMAP — the debug World map, docked as a small panel on the right while you
// play. It reuses VillageMap (compact: no intro text; the toolbar is hidden
// until you expand). ⤢ blows it up to full screen; ✕ tucks it into a 🗺 button.
// Only mounted in debug mode, and only outside the full Debug tab (where the
// same map already fills the page).
// ===========================================================================
export default function MiniMap({ state, dispatch }) {
  const g = useMemo(buildGraph, [])
  const [open, setOpen] = useState(true)
  const [expanded, setExpanded] = useState(false)
  // clicking "open in Story Graph" jumps to the full Debug tab
  const goGraph = () => { setExpanded(false); dispatch({ type: 'SET_VIEW', view: 'debug' }) }

  if (!open) {
    return (
      <button className="minimap-launch" title="Show the world map" onClick={() => setOpen(true)}>
        🗺
      </button>
    )
  }

  return (
    <div className={'minimap' + (expanded ? ' expanded' : '')}>
      <div className="minimap-bar">
        <span className="minimap-title">🗺 map</span>
        <button className="minimap-btn" title={expanded ? 'Restore' : 'Full screen'}
                onClick={() => setExpanded((e) => !e)}>{expanded ? '⤡' : '⤢'}</button>
        <button className="minimap-btn" title="Hide map"
                onClick={() => { setExpanded(false); setOpen(false) }}>✕</button>
      </div>
      <div className="minimap-body">
        <VillageMap g={g} current={state.nodeId} goGraph={goGraph} compact follow world={{ fire: fireStateOf(state) }} npcs={liveNpcs(state)} />
      </div>
    </div>
  )
}
