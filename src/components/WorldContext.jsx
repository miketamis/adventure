import { environmentSnapshot } from '../game/gameState.js'
import { festivalLabel } from '../game/environment.js'
import { NODE_REGION, REGIONS } from '../game/regions.js'
import { isEnclosedScene, sightlinesFrom } from '../game/worldModel.js'

const WEATHER = {
  clear: ['☀️', 'clear'],
  cloud: ['☁️', 'cloudy'],
  rain: ['🌧️', 'rain'],
  storm: ['⛈️', 'storm'],
  snow: ['🌨️', 'snow'],
}

const PHASE = {
  dawn: 'dawn',
  day: 'day',
  dusk: 'dusk',
  night: 'night',
}

const MONTH = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export default function WorldContext({ state, worldClock = state.clock }) {
  const environment = environmentSnapshot(state)
  const isTaleScene = Number.isFinite(state.conditionClock)
  const worldEnvironment = isTaleScene
    ? environmentSnapshot({ ...state, clock: worldClock, conditionClock: undefined })
    : environment
  const { calendar, phase, season, weather, memories } = environment
  const regionKey = NODE_REGION[state.nodeId] || 'village'
  const region = REGIONS.find((entry) => entry.key === regionKey)
  // The clock still advances underground, but calling its deterministic
  // sentinel weather "sunny" would put a visible sky inside a sealed cavern.
  const enclosedBelow = isEnclosedScene(state.nodeId)
  const placeLabel = state.nodeId === 'humbur' ? "the Ora's darkness" : region?.label || 'the lived village'
  const weatherUi = enclosedBelow ? ['🪨', 'sheltered below'] : WEATHER[weather] || ['◌', weather]
  const visible = sightlinesFrom(state.nodeId, environment)
    .filter((line) => line.visible && line.key !== regionKey)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
  const localMemory = memories.find((memory) => memory.regional) || memories[0]

  return (
    <section className="world-context" aria-label={isTaleScene ? 'Tale scene conditions' : 'Live world conditions'}>
      <div className="world-context-row">
        <span title="The playable map is a mythic tale-chart, not a compass map">
          🗺 <b>{placeLabel}</b>
        </span>
        <span>
          {weatherUi[0]} {weatherUi[1]} · {PHASE[phase] || phase}
        </span>
        <span>
          {MONTH[calendar.month - 1]} {calendar.day}, {calendar.year} · {season}
        </span>
        {localMemory && (
          <span title="A completed tale has permanently changed this world">
            {localMemory.icon} {localMemory.text}
          </span>
        )}
      </div>
      {isTaleScene && (
        <p className="world-tale-time">
          <b>Tale time:</b> {phase} on {MONTH[calendar.month - 1]} {calendar.day}, {calendar.year} at {String(calendar.hour).padStart(2, '0')}:00.
          {' '}These conditions wait during a detour. <b>Living world:</b> {worldEnvironment.phase} on{' '}
          {MONTH[worldEnvironment.calendar.month - 1]} {worldEnvironment.calendar.day}, {worldEnvironment.calendar.year} at{' '}
          {String(worldEnvironment.calendar.hour).padStart(2, '0')}:00, continuing forward.
        </p>
      )}
      {calendar.festivals.length > 0 && (
        <p className="world-festival">Today: {calendar.festivals.map(festivalLabel).join(' · ')}</p>
      )}
      <p className="world-horizon">
        <b>Horizon:</b>{' '}
        {visible.length > 0
          ? visible.map((line) => `${line.direction?.label || 'along the chart'}, ${line.label}`).join('; ') + '.'
          : enclosedBelow
            ? 'rock and earth seal away every surface horizon.'
            : `the ${weatherUi[1]} ${phase} closes the distant view.`}
      </p>
      {memories.length > 0 && (
        <details className="world-memories">
          <summary>World memory ({memories.length})</summary>
          <ul>
            {memories.map((memory) => (
              <li key={memory.id}>{memory.icon} {memory.text}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}
