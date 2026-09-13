import {
  ACTIVITY_COVERAGE_RESEARCHED_ON,
  ACTIVITY_EQUIVALENCE_CALIBRATION,
  ACTIVITY_EQUIVALENCE_LEVELS,
  learningActivityEquivalenceMatrix,
  learningActivityProductionInventory,
} from '../game/learningActivityCoverage.js'

const registryLabel = Object.freeze({
  'train-family': 'Train family',
  'train-policy': 'Train scheduler policy',
  'word-learning-aspect': 'Word aspect',
  'phrase-stage': 'Phrase stage',
  'cefr-preparation-mechanic': 'Preparation mechanic',
  'cefr-capstone-family': 'Held-out readiness family',
})

const resolvedLabel = ({ reference, value }) => {
  if (!value) return `${reference.id} — missing`
  if (reference.registry === 'cefr-preparation-mechanic') {
    return `${value.label} · ${value.level} · ${value.stageId}`
  }
  if (reference.registry === 'cefr-capstone-family') return `${reference.id} · ${value.level} ${value.mode}`
  if (reference.registry === 'word-learning-aspect') return `${value.label} · ${value.dimension} · ${value.scope}`
  if (reference.registry === 'train-policy') return 'Live weighted routing, spacing and targeting policy'
  return value.label ? `${value.label} · ${reference.id}` : reference.id
}

export default function DebugLearningActivityCoverage() {
  const rows = learningActivityEquivalenceMatrix()
  const inventory = learningActivityProductionInventory()
  const counts = Object.fromEntries(Object.keys(ACTIVITY_EQUIVALENCE_LEVELS).map((level) => [
    level,
    rows.filter((row) => row.level === level).length,
  ]))

  return (
    <section className="dbg-cefr-preparation dbg-learning" aria-labelledby="debug-activity-coverage-title">
      <header className="dbg-cefr-header">
        <div>
          <p className="dbg-learning-kicker">Debug-only researched capability map · production registry references</p>
          <h3 id="debug-activity-coverage-title">Activity capability equivalence</h3>
          <p>
            This is a comparison of learning purposes, not a screen-cloning checklist. Every claimed equivalent below
            resolves to the same registry object used by Train or the A1–A2 path; no thresholds are copied here.
          </p>
        </div>
        <span className="dbg-learning-status current">researched {ACTIVITY_COVERAGE_RESEARCHED_ON}</span>
      </header>

      <div className="dbg-stats" aria-label="Coverage and production inventory">
        <span><b>{rows.length}</b> documented capabilities</span>
        <span><b>{counts.direct}</b> direct</span>
        <span><b>{counts.composed}</b> composed</span>
        <span><b>{counts.principledAlternative}</b> principled alternatives</span>
        <span><b>{counts.missingCandidate}</b> useful missing candidates</span>
        <span><b>{counts.notAppropriate}</b> not appropriate</span>
        <span><b>{inventory.trainFamilies.length}</b> Train families</span>
        <span><b>{inventory.wordAspects.length}</b> word aspects</span>
        <span><b>{inventory.preparationMechanics.length}</b> preparation mechanics</span>
        <span><b>{inventory.preparationActivities.length}</b> authored preparation activities</span>
      </div>

      <p className="dbg-learning-caveat">
        <b>Calibration boundary:</b> {ACTIVITY_EQUIVALENCE_CALIBRATION}{' '}
        <b>Editorial result:</b> the matrix separates working equivalents from useful missing candidates and
        language-inappropriate clones. Focused dictation, record/replay, world-bound dialogue, adaptive aspect
        practice and held-out A2 tasks preserve the no-text-to-speech, no-fake-pronunciation-score and lore-grounding boundaries.
      </p>

      <div className="dbg-cefr-table-scroll" tabIndex="0" role="region" aria-label="Scrollable activity capability equivalence matrix">
        <table>
          <caption>Officially documented capability → live production equivalents</caption>
          <thead>
            <tr>
              <th scope="col">Capability</th>
              <th scope="col">Coverage</th>
              <th scope="col">Live production references</th>
              <th scope="col">Design disposition</th>
              <th scope="col">Official observations</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr data-activity-capability={row.id} data-equivalence-level={row.level} key={row.id}>
                <th scope="row">{row.label}<span><code>{row.id}</code></span></th>
                <td>{ACTIVITY_EQUIVALENCE_LEVELS[row.level] || row.level}</td>
                <td>
                  {row.equivalents.map((entry) => (
                    <span key={`${entry.reference.registry}:${entry.reference.id}`}>
                      <b>{registryLabel[entry.reference.registry] || entry.reference.registry}:</b>{' '}
                      {resolvedLabel(entry)}
                    </span>
                  ))}
                </td>
                <td>{row.note}<span>{row.calibration}</span></td>
                <td>
                  {row.sources.map((source) => (
                    <span key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
