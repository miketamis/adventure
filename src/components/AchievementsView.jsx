import { useState } from 'react'
import { RICH_ENDINGS } from '../game/endingCatalog.js'
import { ACHIEVEMENTS, areaProgress } from '../game/achievements.js'
import { testFor } from '../game/comprehension.js'
import ComprehensionTest from './ComprehensionTest.jsx'
import FactoidLore from './FactoidLore.jsx'
import { embodimentIdentity } from '../game/embodiment.js'
import '../game/npcAppearanceRegistry.js'

// The player's ACHIEVEMENTS — the lore collection. Every achievement has three
// states here:
//   locked   — the deed not yet done: a hint (and, for areas, exploration
//              progress), the title still a mystery
//   eligible — the deed is done, the hard comprehension gate unpassed: the
//              test can be taken (and retaken) right here
//   earned   — gate passed: title, tale and the deeper lore payload
// Bad endings are "fates" (game overs) — recorded apart, no gate, no unlock.
const FATES = RICH_ENDINGS.filter((e) => e.kind === 'bad')
const ICON = { good: '🏆', secret: '✨', area: '📜' }

export default function AchievementsView({ state, dispatch, readingCorpusReady = false }) {
  const earned = state.earned || {}
  const eligible = state.eligible || {}
  const [open, setOpen] = useState(null) // id of the expanded earned achievement
  const [testing, setTesting] = useState(null) // { id, questions, attempt } of an open retake
  const [unavailableId, setUnavailableId] = useState(null)
  const [failedId, setFailedId] = useState(null) // row showing a just-failed note
  const activeIdentity = embodimentIdentity(state)
  const roleTestLocked = Boolean(activeIdentity)

  const got = ACHIEVEMENTS.filter((a) => earned[a.id]).length
  const fatesGot = FATES.filter((e) => earned[e.id]).length
  const taleAchievements = ACHIEVEMENTS.filter((a) => a.kind !== 'area')
  const areaAchievements = ACHIEVEMENTS.filter((a) => a.kind === 'area')
  const talesGot = taleAchievements.filter((a) => earned[a.id]).length
  const areasGot = areaAchievements.filter((a) => earned[a.id]).length
  const anthologyComplete = got === ACHIEVEMENTS.length

  // actionable first (deed done, gate unpassed), then earned, then still locked
  const rank = (a) => (eligible[a.id] && !earned[a.id] ? 0 : earned[a.id] ? 1 : 2)
  const ordered = [...ACHIEVEMENTS].sort((a, b) => rank(a) - rank(b))

  const startTest = (a) => {
    if (roleTestLocked || !readingCorpusReady) return
    const questions = testFor(a, state.attempts?.[a.id] || 0, state)
    if (!questions?.length) {
      setUnavailableId(a.id)
      return
    }
    setUnavailableId(null)
    setFailedId(null)
    setTesting({ id: a.id, questions, attempt: state.attempts?.[a.id] || 0 })
  }

  return (
    <section className="card endings" aria-labelledby="achievements-title">
      <div className="endings-head">
        <h2 id="achievements-title">🏆 Achievements</h2>
        <span className="endings-count">
          {got} / {ACHIEVEMENTS.length}
        </span>
      </div>
      <p className="hint">
        Each achievement is a piece of Albanian folklore, earned in two steps: do the deed —
        live a tale to its end, or explore a whole region — then pass the comprehension test.
        The test is strict: every answer must be right, and one wrong costs a ♥ and ends the
        attempt. The deed is never lost — retake the check here whenever you&apos;re ready.
        Story also keeps unpassed checks under “Revisit a reading”. Unlocking one restores all your hearts.
      </p>

      {!readingCorpusReady && <p className="hint" role="status">Preparing the reading checks…</p>}
      {roleTestLocked && (
        <p className="role-test-lock" role="status">
          🎭 You are {activeIdentity}. Finish this character&apos;s tale before taking an
          unrelated achievement test. Lore you already earned remains open to read.
        </p>
      )}

      <section className="collection-progress" aria-labelledby="collection-progress-title">
        <h3 id="collection-progress-title">The Living Chronicle</h3>
        <p>
          Complete every tale and regional discovery to finish the anthology. Bad fates are
          optional records, never required sacrifices.
        </p>
        <div className="collection-progress-grid">
          <label>
            <span>Tales <b>{talesGot}/{taleAchievements.length}</b></span>
            <progress value={talesGot} max={taleAchievements.length} />
          </label>
          <label>
            <span>Regions <b>{areasGot}/{areaAchievements.length}</b></span>
            <progress value={areasGot} max={areaAchievements.length} />
          </label>
          <label>
            <span>Optional fates <b>{fatesGot}/{FATES.length}</b></span>
            <progress value={fatesGot} max={FATES.length} />
          </label>
        </div>
        {anthologyComplete && (
          <div className="anthology-complete" role="status">
            <b>✦ The Living Chronicle is complete.</b>
            <p>
              You have lived every recoverable tale and learned every region in this telling of
              the world. The roads remain open: seasons, weather, people and the consequences of
              your choices continue to change around you.
            </p>
          </div>
        )}
      </section>

      <div className="ending-list">
        {ordered.map((a) => {
          const isEarned = !!earned[a.id]
          const isEligible = !!eligible[a.id]
          if (!isEarned && !isEligible) {
            const progress = a.kind === 'area' ? areaProgress(a, state.visited) : null
            return (
              <div className="ending-row locked" key={a.id}>
                <span className="ending-icon">🔒</span>
                <span className="ending-body">
                  <span className="ending-title">???</span>
                  <span className="ending-blurb">
                    {a.hint}
                    {progress && progress.total > 0 && ` — walked ${progress.seen} of ${progress.total} places`}
                  </span>
                </span>
              </div>
            )
          }
          if (!isEarned) {
            // The lived ending stays visible; this check earns its learning reward and source notes.
            const isTesting = testing?.id === a.id
            return (
              <div className="ending-row eligible" key={a.id}>
                <span className="ending-icon">🎯</span>
                <span className="ending-body">
                  <span className="ending-title">{a.title}</span>
                  <span className="ending-blurb">
                    {a.deed} — pass the reading check to unlock its source notes.
                    {failedId === a.id && ' Review the correction and retry when ready.'}
                    {unavailableId === a.id && ' A reading check is not available for the recorded passage yet; no evidence has been awarded.'}
                  </span>
                </span>
                {!isTesting && (
                  <button
                    className="btn primary"
                    disabled={roleTestLocked || !readingCorpusReady}
                    title={roleTestLocked ? `Finish ${activeIdentity}'s tale before taking this test` : undefined}
                    onClick={() => startTest(a)}
                  >
                    📖 Take the reading check →
                  </button>
                )}
                {isTesting && (
                  <ComprehensionTest
                    key={`${a.id}:${testing.attempt}`}
                    questions={testing.questions}
                    hearts={state.hearts}
                    onDone={(passed, miss, answers) => {
                      setTesting(null)
                      if (passed) {
                        dispatch({ type: 'EARN_ACHIEVEMENT', id: a.id, expectedAttempt: testing.attempt, answers })
                        setOpen(a.id)
                      } else {
                        dispatch({
                          type: 'COMP_WRONG', id: a.id, expectedAttempt: testing.attempt,
                          questionIndex: miss.questionIndex, attemptedEnglish: miss.attemptedEnglish,
                        })
                        setFailedId(a.id)
                      }
                    }}
                  />
                )}
              </div>
            )
          }
          const expanded = open === a.id
          return (
            <div className={'ending-row ' + a.kind} key={a.id}>
              <button
                className="ending-head-row"
                onClick={() => setOpen(expanded ? null : a.id)}
                aria-expanded={expanded}
              >
                <span className="ending-icon">{ICON[a.kind]}</span>
                <span className="ending-body">
                  <span className="ending-title">{a.title}</span>
                  <span className="ending-blurb">{a.blurb}</span>
                </span>
                <span className="ending-kind">{expanded ? '▾' : '▸'}</span>
              </button>
              {expanded && <FactoidLore loreId={a.lore} dispatch={dispatch} />}
            </div>
          )
        })}
      </div>

      <div className="endings-head fates-head">
        <h3>💀 Fates</h3>
        <span className="endings-count">
          {fatesGot} / {FATES.length}
        </span>
      </div>
      <p className="hint">
        The ways a run can end badly. A fate is game over — you keep your tokens and start again.
      </p>
      <div className="ending-list">
        {[...FATES].sort((a, b) => (earned[b.id] ? 1 : 0) - (earned[a.id] ? 1 : 0)).map((e) => {
          const seen = !!earned[e.id]
          return (
            <div className={'ending-row ' + (seen ? 'bad' : 'locked')} key={e.id}>
              <span className="ending-icon">{seen ? '💀' : '🔒'}</span>
              <span className="ending-body">
                <span className="ending-title">{seen ? e.title : '???'}</span>
                <span className="ending-blurb">{seen ? e.blurb : 'not yet met'}</span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
