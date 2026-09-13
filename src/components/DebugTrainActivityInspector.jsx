import { buildDebugTrainActivity } from '../game/debugTrainActivity.js'

const show = (value) => value == null || value === '' ? 'absent' : String(value)
const json = (value) => JSON.stringify(value, null, 2)

function JsonDetails({ label, value, open = false }) {
  return (
    <details open={open}>
      <summary>{label}</summary>
      <pre>{json(value)}</pre>
    </details>
  )
}

function WordRecord({ word, targetId }) {
  const current = word.learner.capabilitySnapshot
  return (
    <details
      className={word.id === targetId ? 'debug-train-word target' : 'debug-train-word'}
      data-debug-train-word={word.id}
      open={word.id === targetId}
    >
      <summary>
        <b lang="sq">{word.surfacesInActivity.join(' / ')}</b>
        {' '}→ <code>{word.id}</code>
        {word.id === targetId && <span className="debug-train-target-badge">target</span>}
      </summary>
      <dl className="debug-train-facts">
        <div><dt>English sense</dt><dd>{word.dictionary.enAll || word.dictionary.en}</dd></div>
        <div><dt>Albanian definition</dt><dd lang="sq">{word.albanianDefinition?.rendered || 'missing'}</dd></div>
        <div><dt>Part / form track</dt><dd>{word.formTrack.wordClass} · {word.formTrack.coverage}</dd></div>
        <div><dt>Trainability</dt><dd>{word.trainability.trainable ? 'trainable' : 'not trainable'} · {word.trainability.kind} · {word.trainability.reason}</dd></div>
        <div><dt>Current stage</dt><dd>{show(current.currentStageId)} → {show(current.nextStageId)} · {current.next?.due ? 'due' : 'not due'}</dd></div>
        <div><dt>Player evidence</dt><dd>{word.learner.discovered ? 'saved' : 'not saved'} · {word.learner.tokens} tokens · {word.learner.practiceRewards} rewards</dd></div>
        <div><dt>Passive familiarity</dt><dd>{word.learner.passiveExposure.total} occurrences · {word.learner.passiveExposure.story} story · {word.learner.passiveExposure['phrase-co-exposure']} phrase co-exposure (never mastery)</dd></div>
        <div><dt>Reviewed material</dt><dd>{word.playableFormInventory.length} form rows · {word.reviewedFormTargets.length} exact role targets · {word.playableUsageBySurface.length} used surfaces</dd></div>
        <div><dt>Activity occurrences</dt><dd>{word.occurrenceCount}: {word.occurrences.map(({ source, role }) => `${source} (${role})`).join(' · ')}</dd></div>
      </dl>
      <div className="debug-train-table-wrap">
        <table data-debug-word-aspects>
          <thead><tr><th>Aspect</th><th>State</th><th>Evidence</th><th>Prerequisites</th><th>Scheduling contribution</th></tr></thead>
          <tbody>
            {current.aspects.map((row) => (
              <tr key={`${row.aspect.id}:${row.targetFormKey || 'lemma'}`}>
                <td>{row.aspect.label}<br /><code>{row.aspect.id}</code></td>
                <td>{row.status}{row.selected ? ' · selected' : ''}</td>
                <td>{row.wins || 0}/{row.winsRequired || 1} wins · {row.attempts || 0} attempts · due round {row.dueAfterRound || 0}</td>
                <td>{row.prerequisites?.length ? row.prerequisites.map((item) => `${item.aspectId} ${item.wins}/${item.winsRequired}`).join(' · ') : 'none'}</td>
                <td>{row.schedulingContribution || 'none'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="debug-train-json-grid">
        <JsonDetails label="Dictionary entry (raw)" value={word.dictionary} />
        <JsonDetails label="Albanian definition tokens (raw)" value={word.albanianDefinition} />
        <JsonDetails label="Trainability + context eligibility" value={{ trainability: word.trainability, reviewedContextEligibility: word.reviewedContextEligibility }} />
        <JsonDetails label="All playable/reviewed forms" value={{ formTrack: word.formTrack, playableFormInventory: word.playableFormInventory, reviewedFormTargets: word.reviewedFormTargets }} />
        <JsonDetails label="Every playable use we recorded" value={word.playableUsageBySurface} />
        <JsonDetails label="Canonical progression options" value={word.progressionOptions} />
        <JsonDetails label="Persisted + normalized player evidence" value={word.learner} />
        <JsonDetails label="Every occurrence in this activity" value={word.occurrences} />
      </div>
    </details>
  )
}

export default function DebugTrainActivityInspector({ question, state, currentPhase = null }) {
  const model = buildDebugTrainActivity(question, state, Date.now())
  return (
    <section className="card debug-train-inspector" data-debug-train-inspector aria-labelledby="debug-train-title">
      <header>
        <div>
          <span className="debug-train-only-badge">DEBUG ONLY · LIVE ACTIVITY</span>
          <h2 id="debug-train-title">Why this Train activity exists</h2>
        </div>
        <code>{model.question.key || 'no question key'}</code>
      </header>

      <p className="debug-train-reason"><b>Selected because:</b> {model.schedulerReason}</p>
      <dl className="debug-train-facts overview">
        <div><dt>Family</dt><dd>{model.family?.label || 'unknown'} (<code>{model.family?.id || model.question.kind}</code>)</dd></div>
        <div><dt>Exercise</dt><dd>{show(model.question.skill)} · {show(model.question.mode)} · tier {show(model.question.tier)} · {show(model.question.difficultyLabel)}</dd></div>
        <div><dt>Stage / variant</dt><dd>{show(model.question.wordStageId)} · {show(model.question.variantId)}</dd></div>
        <div><dt>Live phase</dt><dd>{currentPhase ? `${currentPhase.index + 1}/${currentPhase.total} · ${currentPhase.id}` : 'single-phase activity'}</dd></div>
        <div><dt>Target</dt><dd><code>{show(model.question.answerId || model.question.focusId)}</code> · form {show(model.question.targetFormKey)}</dd></div>
        <div><dt>Evidence rewarded</dt><dd>{model.question.rewardIds.length ? model.question.rewardIds.join(', ') : 'none'}</dd></div>
        <div><dt>Rules in force</dt><dd>round {model.currentRound} · previous words {model.relevantPersistedState.trainLastWords.join(', ') || 'none'}</dd></div>
      </dl>

      <details open className="debug-train-decision">
        <summary>Exact scheduler decision</summary>
        <p>
          This is the trace recorded while the real family scheduler and question builder made the choice.
          Rejected candidates, weights, random rolls, due plans, fallbacks, stage definition, and distractor policy remain visible below.
        </p>
        <pre>{json(model.selectionTrace)}</pre>
      </details>

      {model.distractorPlan && (
        <details open data-debug-distractor-plan>
          <summary>Learner-aware distractor decision</summary>
          <p>
            <b>{model.distractorPlan.targetDifficultyBand}</b> band · {model.distractorPlan.bandPolicy?.purpose}.{' '}
            {model.distractorPlan.calibration} Showing every selected row and the first 80 rejected candidates;
            the exact full trace remains in the scheduler JSON.
          </p>
          {model.distractorPlan.targetHardContrastReview && (
            <p>
              <b>Editorial registry:</b> {model.distractorPlan.targetHardContrastReview.source} ·{' '}
              {model.distractorPlan.targetHardContrastReview.status} ·{' '}
              {model.distractorPlan.targetHardContrastReview.reviewedLinkCount} link(s)
              {model.distractorPlan.targetHardContrastReview.reason
                ? ` · ${model.distractorPlan.targetHardContrastReview.reason}` : ''}
            </p>
          )}
          <div className="debug-train-table-wrap">
            <table>
              <thead>
                <tr><th>Option</th><th>Decision</th><th>Relation / confusability</th><th>Learner evidence</th><th>Validity</th></tr>
              </thead>
              <tbody>
                {[...(model.distractorPlan.selected || []), ...(model.distractorPlan.rejected || []).slice(0, 80)].map((row) => (
                  <tr key={`distractor:${row.id}`}>
                    <td><b lang="sq">{row.label}</b><br /><code>{row.id}</code><br />{row.source}</td>
                    <td>{row.selection.selected ? 'selected' : 'not selected'} · {row.selection.reason}</td>
                    <td>
                      {row.relation.type} · rank {show(row.relation.contrastRank)} · {row.relation.confusability.band} ({row.relation.confusability.score}) · spelling {row.relation.orthographicSimilarity}
                      {row.relation.editorialHardContrast && (
                        <><br /><b>Registry link:</b> {row.relation.editorialHardContrast.relation} · {row.relation.editorialHardContrast.reason} · source {row.relation.editorialHardContrast.source}</>
                      )}
                    </td>
                    <td>{row.learnerEvidence.familiarity} · {row.learnerEvidence.saved ? 'saved' : 'not saved'} · meaning wins {row.learnerEvidence.recognitionWins} · production wins {row.learnerEvidence.productiveWins} · passive {row.learnerEvidence.passiveExposure} (not mastery)</td>
                    <td>{row.validity.accepted ? 'valid' : row.validity.rejectionReasons.join('; ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}

      <details open>
        <summary>Every Albanian word occurrence shown or represented by this activity ({model.occurrences.length})</summary>
        <div className="debug-train-table-wrap">
          <table>
            <thead>
              <tr><th>Surface</th><th>Source</th><th>Role</th><th>Resolved sense</th><th>How resolved</th></tr>
            </thead>
            <tbody>
              {model.occurrences.map((occurrence, index) => (
                <tr key={`${occurrence.source}:${occurrence.index}:${occurrence.surface}:${index}`}>
                  <td lang="sq"><b>{occurrence.surface}</b></td>
                  <td>{occurrence.source}</td>
                  <td>{occurrence.role}</td>
                  <td>{occurrence.id || occurrence.candidateIds.join(' / ') || 'unmapped'}</td>
                  <td>{occurrence.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {model.unresolvedOccurrences.length > 0 && (
          <p className="debug-train-warning">
            {model.unresolvedOccurrences.length} occurrence(s) are ambiguous or unmapped. The inspector shows every candidate and does not guess.
          </p>
        )}
      </details>

      <div className="debug-train-word-list">
        <h3>Complete record for every resolved sense</h3>
        {model.words.map((word) => (
          <WordRecord word={word} targetId={model.question.answerId || model.question.focusId} key={word.id} />
        ))}
      </div>

      {model.phrases.length > 0 && (
        <details>
          <summary>Complete phrase records and all phrase-skill evidence</summary>
          <pre>{json(model.phrases)}</pre>
        </details>
      )}

      <div className="debug-train-json-grid final">
        <JsonDetails label="Exact exercise-family and scheduler registries" value={model.registries} />
        <JsonDetails label="Question metadata summary" value={model.question} />
        <JsonDetails label="Raw built question (every serialized field)" value={model.rawQuestion} />
        <JsonDetails label="Relevant persisted scheduler state" value={model.relevantPersistedState} />
      </div>
    </section>
  )
}
