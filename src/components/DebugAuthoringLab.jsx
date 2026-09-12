import { useMemo, useState } from 'react'
import {
  authoringSceneSnapshot,
  authoringSchemaIssues,
  cloneAuthoringState,
  compareAuthoringReplay,
  simulateAuthoringChoice,
} from '../game/storyAuthoring.js'
import { WORLD_ENTITIES, perceivableEntitiesAt } from '../game/worldEntities.js'
import { npcNodeOf, storyClockOf } from '../game/gameState.js'

const stateJson = (value) => JSON.stringify(value, null, 2)

export default function DebugAuthoringLab({ state }) {
  const [base, setBase] = useState(() => cloneAuthoringState(state))
  const [sandbox, setSandbox] = useState(() => cloneAuthoringState(state))
  const [steps, setSteps] = useState([])
  const [events, setEvents] = useState([])
  const [vocabularyAssist, setVocabularyAssist] = useState(true)
  const snapshot = useMemo(() => authoringSceneSnapshot(sandbox), [sandbox])
  const issues = useMemo(() => authoringSchemaIssues(), [])
  const perceivable = useMemo(() => perceivableEntitiesAt(sandbox, sandbox.nodeId, {
    npcNodeOf,
    clock: storyClockOf(sandbox),
  }), [sandbox])
  const replay = useMemo(() => compareAuthoringReplay(base, steps, { vocabularyAssist }), [base, steps, vocabularyAssist])

  const reset = () => {
    const next = cloneAuthoringState(state)
    setBase(next)
    setSandbox(next)
    setSteps([])
    setEvents([])
  }

  const choose = (optionIndex) => {
    const result = simulateAuthoringChoice(sandbox, optionIndex, { vocabularyAssist })
    if (!result.ok) {
      setEvents((current) => [...current, { from: sandbox.nodeId, optionIndex, blocked: result.reason }])
      setSandbox(result.state || sandbox)
      return
    }
    setSteps((current) => [...current, { from: sandbox.nodeId, optionIndex }])
    setEvents((current) => [...current, result.event])
    setSandbox(result.state)
  }

  if (!snapshot) return <p className="dbg-note">The current state does not point to a story node.</p>

  return (
    <div className="dbg-authoring">
      <div className="dbg-card dbg-authoring-head">
        <div className="dbg-card-head">
          <b>Independent authoring sandbox</b>
          <span className={'dbg-tag ' + (issues.length ? 'bad' : 'good')}>
            {issues.length ? `${issues.length} schema issues` : 'schema valid'}
          </span>
          <span className={'dbg-tag ' + (replay.equal ? 'good' : 'bad')}>
            replay {replay.equal ? 'deterministic' : 'diverged'}
          </span>
        </div>
        <p className="dbg-note">
          This is a disposable copy of the state captured when this tab opened. Choices below run through the real
          reducer and canonical effects, but never change the player&rsquo;s run.
        </p>
        <label className="dbg-authoring-toggle">
          <input type="checkbox" checked={vocabularyAssist}
            onChange={(event) => setVocabularyAssist(event.target.checked)} />
          Author assist: satisfy vocabulary costs; world, quest, item and timing gates still apply
        </label>
        <button className="btn" type="button" onClick={reset}>Reset sandbox from current game state</button>
      </div>

      <div className="dbg-authoring-grid">
        <div className="dbg-card">
          <div className="dbg-card-head"><b>Live node · <code>{snapshot.nodeId}</code></b></div>
          <div className="dbg-lines">
            {snapshot.lines.map((line, index) => (
              <div className="dbg-line" key={`${line.albanian}-${index}`}>
                <span className="dbg-al">{line.albanian}</span>
                <span className="dbg-en">{line.english}</span>
              </div>
            ))}
          </div>
          <div className="dbg-authoring-options">
            {snapshot.options.map((option) => (
              <button className="btn dbg-authoring-choice" type="button" key={option.index}
                onClick={() => choose(option.index)}>
                <span>{option.albanian}</span>
                <small>{option.english}</small>
                <code>{option.action.intent} · {option.action.to || 'no destination'}{option.enabled ? '' : ' · currently locked'}</code>
              </button>
            ))}
          </div>
        </div>

        <div className="dbg-card">
          <div className="dbg-card-head"><b>Canonical state</b><span className="dbg-tag node">read-only copy</span></div>
          <pre className="dbg-authoring-json">{stateJson(snapshot.state)}</pre>
          <div className="dbg-card-head"><b>Perceivable entities here</b><span className="dbg-tag node">{perceivable.length}</span></div>
          <div className="dbg-authoring-entities">
            {perceivable.map((entry) => (
              <span className="dbg-tag node" key={entry.id} title={`${entry.kind}: ${entry.affordances.join(', ')}`}>
                {entry.name} · {entry.kind}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="dbg-card">
        <div className="dbg-card-head">
          <b>Route transcript</b>
          <span className="dbg-tag node">{events.length} attempted steps</span>
          <span className="dbg-tag node">{Object.keys(WORLD_ENTITIES).length} typed entities</span>
        </div>
        {events.length === 0 && <p className="dbg-note">Choose an option above to simulate the route.</p>}
        {events.map((event, index) => (
          <div className="dbg-authoring-event" key={`${event.from}-${index}`}>
            <code>{index + 1}. {event.from}[{event.optionIndex}] {event.to ? `→ ${event.to}` : ''}</code>
            <span>{event.choice || event.blocked}</span>
            {event.blocked && <strong>Blocked: {event.blocked}</strong>}
          </div>
        ))}
      </div>
    </div>
  )
}
