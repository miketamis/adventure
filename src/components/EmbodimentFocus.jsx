import { STORY } from '../game/content.js'
import {
  embodimentFocusState,
  hasRequiredItem,
  phaseAtClock,
  timeOfDay,
  worldClockOf,
} from '../game/gameState.js'
import { embodimentIdentity, embodimentQuest } from '../game/embodiment.js'
import { normalizeOptionEnglish, optionEnglishReadingOf } from '../game/data/readings/reviewedOptionReadings.js'
import { NODE_POS } from './nodePositions.js'
import { playerMapLabel } from './mapLabels.js'
import { chartDirection, distanceBand } from '../game/worldModel.js'

const objectiveAt = (state, quest, nodeId) => {
  const scene = STORY[nodeId]
  if (!scene) return normalizeOptionEnglish(quest.objective)
  const sceneState = embodimentFocusState(state, nodeId)
  const choices = (scene.options || [])
    .filter((option) => !option.confuser && quest.nodes.includes(option.to))
    .filter((option) => hasRequiredItem(sceneState, option))
    // Guidance must use the same address-pinned, editorial action shown on the
    // choice itself. Reassembling token glosses here produces English such as
    // “stay in feast for nine day” even when the reviewed action is correct.
    .map((option) => optionEnglishReadingOf(option.text))
    .filter(Boolean)
  if (choices.length === 1) return choices[0]
  if (choices.length > 1)
    return `Choose what comes next: ${choices.slice(0, 3).map((choice) => `“${choice}”`).join(' or ')}`
  return normalizeOptionEnglish(quest.objective)
}

export default function EmbodimentFocus({ state, dispatch }) {
  const quest = embodimentQuest(state.embodying)
  if (!quest || state.ended) return null

  const focusNode = quest.nodes.includes(state.embodimentFocusNode)
    ? state.embodimentFocusNode
    : quest.entryTo
  const onCourse = !state.embodimentPaused && state.nodeId === focusNode
  const identity = embodimentIdentity(state)
  const identityLead = quest.stance === 'companion'
    ? `You travel as ${identity}`
    : `You are ${identity}`

  // Ordinary play keeps only the control needed to step out of or back into
  // the role. The exact next action, map bearing, distance and parallel clock
  // are authoring diagnostics: showing an option's reviewed English here would
  // reveal its answer before the learner reaches that Albanian choice.
  if (!state.debug) {
    return (
      <aside
        id="embodiment-focus"
        className={'embodiment-focus compact' + (onCourse ? '' : ' off-course')}
        tabIndex={-1}
        aria-label={`${identityLead} tale controls`}
      >
        <div className="embodiment-focus-head" role="status" aria-live="polite">
          <span className="embodiment-focus-icon" aria-hidden="true">🎭</span>
          <b>{identityLead}.</b>
        </div>
        <div className="embodiment-focus-actions">
          {onCourse ? (
            <button className="btn" onClick={() => dispatch({ type: 'PAUSE_EMBODIMENT' })}>
              Explore public roads for now
            </button>
          ) : (
            <button className="btn primary" onClick={() => dispatch({ type: 'RESUME_EMBODIMENT' })}>
              Step back into the tale
            </button>
          )}
        </div>
      </aside>
    )
  }

  const focusState = embodimentFocusState(state, focusNode)
  const objective = objectiveAt(focusState, quest, focusNode)
  const talePhase = timeOfDay(focusState)
  const worldPhase = phaseAtClock(worldClockOf(state))
  const currentPos = NODE_POS[state.nodeId]
  const focusPos = NODE_POS[focusNode]
  const dx = currentPos && focusPos ? focusPos[0] - currentPos[0] : 0
  const dy = currentPos && focusPos ? focusPos[1] - currentPos[1] : 0
  const distance = Math.hypot(dx, dy)
  const band = distanceBand(distance)
  const direction = chartDirection(dx, dy)?.label
  const far = ['long', 'expedition'].includes(band)
  return (
    <aside
      id="embodiment-focus"
      className={'embodiment-focus' + (onCourse ? '' : ' off-course')}
      tabIndex={-1}
      aria-label={`${identityLead} tale focus`}
    >
      <div className="embodiment-focus-head" role="status" aria-live="polite">
        <span className="embodiment-focus-icon" aria-hidden="true">🎭</span>
        <span>
          <b>{identityLead}.</b>{' '}
          {onCourse
            ? <>You feel the tale pulling you onward. Your next step is: <em>{objective}</em></>
            : far
              ? <>You are far from your part in the tale. Head {direction ? `${direction} ` : ''}toward <b>{playerMapLabel(focusNode)}</b>. Your next step remains: <em>{objective}</em></>
              : <>The tale is waiting near <b>{playerMapLabel(focusNode)}</b>{direction ? `, ${direction}` : ''}. Your next step remains: <em>{objective}</em></>}
        </span>
      </div>
      <div className="embodiment-focus-actions">
        {onCourse ? (
          <button className="btn" onClick={() => dispatch({ type: 'PAUSE_EMBODIMENT' })}>
            🗺 Explore public roads for now
          </button>
        ) : (
          <button className="btn primary" onClick={() => dispatch({ type: 'RESUME_EMBODIMENT' })}>
            🎭 Step back into the tale
          </button>
        )}
        <span>
          {onCourse
            ? `This tale scene is at ${talePhase}; its hour and conditions will wait if you explore.`
            : `The waiting scene remains at ${talePhase} while the living world is ${worldPhase} and continues. ${band} from the waiting scene on the tale-chart.`}
        </span>
      </div>
    </aside>
  )
}
