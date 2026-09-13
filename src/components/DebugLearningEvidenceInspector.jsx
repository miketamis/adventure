import { buildLearningEvidenceInspector } from '../game/debugLearningEvidence.js'
export { buildLearningEvidenceInspector } from '../game/debugLearningEvidence.js'

const json = (value) => JSON.stringify(value, null, 2)
const show = (value) => value == null ? 'absent' : String(value)

function CapabilityRows({ capabilities }) {
  return (
    <tbody>
      {Object.entries(capabilities).map(([id, result]) => (
        <tr key={id}>
          <th>{id}</th>
          <td>{result.status}</td>
          <td>{result.gaps.length ? result.gaps.join('; ') : 'none'}</td>
          <td>{result.due ? 'due' : 'not due'}</td>
          <td>{show(result.remediation)}</td>
          <td>{result.lastAttempt ? `${result.lastAttempt.key} @ ${result.lastAttempt.round}` : 'absent'}</td>
        </tr>
      ))}
    </tbody>
  )
}

const temporalSummary = (record) => {
  const temporal = record?.temporal
  if (!temporal) return 'no temporal record'
  return `${temporal.correct}/${temporal.attempts} correct · ${temporal.lapses} lapses · last ${temporal.lastAttemptAtMs || 'never'} · due ${temporal.dueAtMs || 'now'} · interval ${temporal.reviewIntervalMs}ms`
}

export default function DebugLearningEvidenceInspector({ state, dispatch }) {
  const model = buildLearningEvidenceInspector(state, Date.now())
  return (
    <section className="dbg-learning-evidence" data-learning-evidence="live-current-save" aria-labelledby="dbg-live-evidence-title">
      <header>
        <div>
          <span className="dbg-learning-save-label">LIVE · current save · read only</span>
          <h3 id="dbg-live-evidence-title">Evidence inspector</h3>
        </div>
        <span className="dbg-learning-evidence-round">Train round {model.currentRound}</span>
      </header>
      <p>
        This panel reflects persisted player evidence. The interactive walkthrough below is deterministic and independent;
        changing it never changes this save.
      </p>
      <aside className="dbg-learning-telemetry" aria-labelledby="dbg-learning-telemetry-title">
        <h4 id="dbg-learning-telemetry-title">Optional local research log</h4>
        <p>
          {model.researchTelemetry.consent
            ? `${model.researchTelemetry.eventCount} compact non-content events retained locally. No answers, prompts, recordings, transcripts, names or private conversation text are stored.`
            : 'Off by default. Timing still supports your local review schedule; no optional research events are retained.'}
        </p>
        <button
          type="button"
          className="btn"
          aria-pressed={model.researchTelemetry.consent}
          onClick={() => dispatch({
            type: 'SET_LEARNING_RESEARCH_CONSENT',
            enabled: !model.researchTelemetry.consent,
          })}
        >
          {model.researchTelemetry.consent ? 'Withdraw consent and erase local events' : 'Consent to local non-content research log'}
        </button>
      </aside>

      <details open>
        <summary><b lang="sq">{model.phrase.al}</b> · phrase evidence</summary>
        <p>
          Mapping: {model.phrase.mapping.map(({ id, surface }) => `${surface} → ${id}`).join(' · ')}
        </p>
        <dl className="dbg-evidence-summary">
          <div><dt>Eligible</dt><dd>{String(model.phrase.eligible)}</dd></div>
          <div><dt>Current / next</dt><dd>{model.phrase.currentStageId} / {show(model.phrase.nextStageId)}</dd></div>
          <div><dt>Due</dt><dd>{String(model.phrase.due)}</dd></div>
          <div><dt>Wins</dt><dd>cloze {model.phrase.persisted.production.clozeWins}; arrange {model.phrase.persisted.production.arrangeWins}; independent {model.phrase.persisted.production.independentWins}; strict {model.phrase.persisted.production.strictWins}</dd></div>
          <div><dt>Proofs</dt><dd>cloze [{model.phrase.persisted.production.clozeProofs.join(', ')}]; spelling [{model.phrase.persisted.production.spellingProofs.join(', ')}]</dd></div>
          <div><dt>Spacing</dt><dd>gap {model.phrase.persisted.production.reviewGap}; due after {model.phrase.persisted.production.dueAfterRound}; {temporalSummary(model.phrase.persisted.production)}</dd></div>
          <div><dt>Remediation</dt><dd>{model.phrase.persisted.production.remediation ? json(model.phrase.persisted.production.remediation) : 'absent'}</dd></div>
          <div><dt>Last attempt / key</dt><dd>{show(model.phrase.persisted.production.lastAttemptKey)} @ {model.phrase.persisted.production.lastAttemptRound}; global {show(model.phrase.persisted.lastQuestionKey)}</dd></div>
          <div><dt>Listening</dt><dd>tier {model.phrase.persisted.listening.tier}; {temporalSummary(model.phrase.persisted.listening)}; {model.phrase.persisted.listening.adaptation.uncertainty} uncertainty</dd></div>
          <div><dt>Matching</dt><dd>tier {model.phrase.persisted.matching.tier}; {temporalSummary(model.phrase.persisted.matching)}; {model.phrase.persisted.matching.adaptation.uncertainty} uncertainty</dd></div>
        </dl>
        <details><summary>Raw normalized phrase evidence JSON</summary><pre>{json(model.phrase.persisted)}</pre></details>
        <details><summary>Derived phrase plan / snapshot JSON</summary><pre>{json(model.phrase.snapshot)}</pre></details>
      </details>

      {model.words.map((word) => (
        <details key={word.id} data-learning-word={word.id}>
          <summary><b lang="sq">{word.surface}</b> → <code>{word.id}</code> · {word.currentStageId || word.snapshot.trainability.kind}</summary>
          <p>
            {word.persisted.saved ? 'saved' : 'not saved'} · {word.persisted.tokens} tokens · {word.persisted.practiceRewards} rewards ·{' '}
            {word.snapshot.hasReviewedFormLane ? `${word.reviewedForms.length} exact reviewed form/role targets` : 'form lane inapplicable'}
          </p>
          <p><b>Passive familiarity only:</b> {word.persisted.passiveExposure.total} visible occurrences ({word.persisted.passiveExposure.story} story; {word.persisted.passiveExposure['phrase-co-exposure']} phrase co-exposure). This never unlocks an aspect or CEFR evidence.</p>
          <p>Derived current / next: <b>{show(word.currentStageId)}</b> / <b>{show(word.nextStageId)}</b></p>
          <table data-learning-aspect-matrix>
            <thead><tr><th>Independent aspect</th><th>Status</th><th>Evidence</th><th>Eligible / due</th><th>Prerequisites</th><th>Selection</th></tr></thead>
            <tbody>
              {word.snapshot.aspects.map((row) => (
                <tr key={`${row.aspect.id}:${row.targetFormKey || 'lemma'}`}>
                  <th>{row.aspect.label}<br /><code>{row.aspect.id}</code></th>
                  <td>{row.status}</td>
                  <td>{row.wins || 0}/{row.winsRequired || 1} wins; {row.attempts || 0} attempts</td>
                  <td>{row.eligible ? 'eligible' : 'not eligible'}; {row.selected && word.snapshot.next?.due ? 'due' : 'not due'}</td>
                  <td>{row.prerequisites?.length ? row.prerequisites.map((item) => `${item.aspectId} ${item.wins}/${item.winsRequired}`).join(' · ') : 'none'}</td>
                  <td>{row.schedulingContribution || 'none'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead><tr><th>Capability</th><th>Status</th><th>Gap</th><th>Due</th><th>Remediation</th><th>Last attempt</th></tr></thead>
            <CapabilityRows capabilities={word.snapshot.capabilities} />
          </table>
          <details><summary>Raw normalized word evidence JSON</summary><pre>{json(word.persisted)}</pre></details>
          <details><summary>Derived word plan / snapshot JSON</summary><pre>{json(word.snapshot)}</pre></details>
        </details>
      ))}

      <aside data-learning-word="elira">
        <b>Elira:</b> {model.identityExample.status}. {model.identityExample.reason}
      </aside>
    </section>
  )
}
