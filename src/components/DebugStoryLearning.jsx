import { STORY_LEARNING_ENCOUNTERS } from '../game/storyLearning.js'
import { storyLearningTaskForState } from '../game/gameState.js'

// This inspection consumes the same bindings and episode the story reducer
// uses. It does not reconstruct eligibility or award curriculum evidence.
export default function DebugStoryLearning({ state }) {
  if (!state.debug) return null
  const encounters = Object.values(STORY_LEARNING_ENCOUNTERS)
  const current = storyLearningTaskForState(state)
  return (
    <section className="dbg-learning-section" aria-labelledby="story-learning-debug-title">
      <h3 id="story-learning-debug-title">Learning in the story</h3>
      <p className="dbg-note">
        These public story encounters practise specific A1/A2 skills. Exact completion replaces
        the word-token cost of the bound action. Source discovery, money, physical conditions
        and the action’s recorded speech still apply. These receipts never establish held-out
        readiness or an overall CEFR level.
      </p>
      <div className="dbg-table-wrap">
        <table>
          <thead><tr><th>Encounter</th><th>Alignment</th><th>Preparation mechanics</th><th>Live context</th></tr></thead>
          <tbody>{encounters.map((entry) => {
            const task = storyLearningTaskForState(state, entry.id)
            const status = !task ? 'outside this context'
              : !task.sourceAvailable ? 'source not visible'
                : task.episode?.phase || (task.availability.ok ? 'ready' : `blocked: ${task.availability.reason}`)
            return (
              <tr key={entry.id}>
                <td><code>{entry.id}</code></td>
                <td>{entry.levelAlignment} · {entry.mode}</td>
                <td>{entry.preparationMechanicIds.join(', ')}</td>
                <td>{status}</td>
              </tr>
            )
          })}</tbody>
        </table>
      </div>
      <details>
        <summary>Canonical practice receipts and current permission</summary>
        <pre>{JSON.stringify({
          version: state.storyLearningVersion,
          evidence: state.storyLearningEvidence,
          scene: state.storyLearningScene,
          activeEncounterId: current?.id || null,
        }, null, 2)}</pre>
      </details>
    </section>
  )
}
