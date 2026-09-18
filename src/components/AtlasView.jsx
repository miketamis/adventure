import { lazy, Suspense, useMemo, useState } from 'react'
import { VillageMap, buildGraph } from './WorldMapView.jsx'
import { environmentSnapshot, fireStateOf, liveNpcs } from '../game/gameState.js'
import { NODE_POS } from './nodePositions.js'
import { playerMapLabel } from './mapLabels.js'
import { chartDirection, distanceBand } from '../game/worldModel.js'
import { RICH_ENDING_BY_ID } from '../game/endingCatalog.js'

const WorldScene3dView = lazy(() => import('./WorldScene3dView.jsx'))

export default function AtlasView({ state }) {
  const [mode, setMode] = useState('3d')
  const graph = useMemo(buildGraph, [])
  const environment = environmentSnapshot(state)
  const objective = state.embodying && state.embodimentPaused ? state.embodimentFocusNode : null
  const roleDirections = useMemo(() => {
    const here = NODE_POS[state.nodeId]
    const there = objective && NODE_POS[objective]
    if (!here || !there) return null
    const dx = there[0] - here[0]
    const dy = there[1] - here[1]
    const direction = chartDirection(dx, dy)?.label
    const distance = distanceBand(Math.hypot(dx, dy)).replace('-', ' ')
    return direction
      ? `${direction} on the tale-chart, ${distance} from here`
      : 'at this same place on the tale-chart'
  }, [state.nodeId, objective])
  const known = useMemo(
    () => [...new Set([
      state.nodeId,
      ...Object.keys(state.visited || {}),
      ...Object.keys(state.heard || {}),
    ])],
    [state.nodeId, state.visited, state.heard],
  )

  return (
    <section className="card atlas-view" aria-labelledby="atlas-title">
      <header className="atlas-header">
        <h2 id="atlas-title">World map</h2>
        <p>
          Explore the mythic world and trace its story descriptions to the elements that build it.
        </p>
        <div className="atlas-mode" role="group" aria-label="Map display">
          <button className="btn" aria-pressed={mode === '3d'} onClick={() => setMode('3d')}>3D world & audit</button>
          <button className="btn" aria-pressed={mode === '2d'} onClick={() => setMode('2d')}>2D illustrated map</button>
        </div>
        {objective && (
          <p className="atlas-objective" role="status">
            🎭 Your character&apos;s tale waits at <b>{playerMapLabel(objective, RICH_ENDING_BY_ID)}</b>
            {roleDirections ? ` — ${roleDirections}.` : '.'} Look for its violet double ring.
          </p>
        )}
      </header>
      {mode === '3d' ? <Suspense fallback={<p role="status">Building the 3D world…</p>}>
        <WorldScene3dView state={state} />
      </Suspense> : <VillageMap state={state}
        g={graph}
        current={state.nodeId}
        objective={objective}
        follow
        player
        known={known}
        world={{ ...environment, fire: fireStateOf(state) }}
        npcs={liveNpcs(state)}
        rumors={Object.keys(state.heard || {}).filter((id) => !state.visited?.[id])}
      />}
    </section>
  )
}
