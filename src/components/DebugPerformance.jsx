import { useEffect, useMemo, useState } from 'react'
import {
  getPerformanceSnapshot,
  performanceBand,
  resetPerformanceMonitoring,
} from '../performance.js'

const milliseconds = (value) => `${Number(value || 0).toFixed(1)} ms`
const scoreClass = (duration, budget) => duration > budget ? 'bad' : duration > budget * 0.75 ? 'warn' : 'good'

export default function DebugPerformance() {
  const [snapshot, setSnapshot] = useState(getPerformanceSnapshot)

  useEffect(() => {
    const refresh = () => setSnapshot(getPerformanceSnapshot())
    refresh()
    const interval = window.setInterval(refresh, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const slowestInteractions = useMemo(() => [...snapshot.interactions]
    .sort((left, right) => right.durationMs - left.durationMs)
    .slice(0, 20), [snapshot])
  const slowestOperations = useMemo(() => [...snapshot.operationGroups]
    .sort((left, right) => right.maxMs - left.maxMs)
    .slice(0, 20), [snapshot])
  const coverageBySurface = useMemo(() => {
    const rows = new Map()
    for (const surface of snapshot.surfacesSeen) {
      rows.set(surface, { surface, controls: 0, exercised: 0 })
    }
    for (const control of snapshot.coverage) {
      const row = rows.get(control.surface) || { surface: control.surface, controls: 0, exercised: 0 }
      row.controls += 1
      if (control.interactions > 0) row.exercised += 1
      rows.set(control.surface, row)
    }
    return [...rows.values()].sort((left, right) => left.surface.localeCompare(right.surface))
  }, [snapshot])
  const maximumLongTask = Math.max(0, ...snapshot.longTasks.map(({ durationMs }) => durationMs))

  const reset = () => {
    resetPerformanceMonitoring({ keepCoverage: false })
    setSnapshot(getPerformanceSnapshot())
  }

  return (
    <section className="debug-performance" data-performance-surface="debug-performance" aria-labelledby="debug-performance-title">
      <header className="debug-performance-header">
        <div>
          <h3 id="debug-performance-title">Interaction performance</h3>
          <p>
            Browser input-to-next-paint, React commits, reducers, persistence and long tasks from every
            delegated control. Labels use code-owned IDs and classes only; visible answers and typed text are never read.
          </p>
        </div>
        <button type="button" className="btn" data-performance-id="performance-reset" onClick={reset}>
          Reset measurements
        </button>
      </header>

      <div className="debug-performance-summary">
        <div><span>Observed interactions</span><b>{snapshot.interactions.length}</b></div>
        <div className={scoreClass(snapshot.vitals.inpMs, snapshot.budgets.slowInteractionMs)}>
          <span>Session INP estimate</span><b>{milliseconds(snapshot.vitals.inpMs)}</b>
        </div>
        <div className={scoreClass(maximumLongTask, snapshot.budgets.browserLongTaskMaxMs)}>
          <span>Worst long task</span><b>{milliseconds(maximumLongTask)}</b>
        </div>
        <div><span>Layout shift</span><b>{snapshot.vitals.cls.toFixed(3)}</b></div>
      </div>

      <h4>Surface latency</h4>
      {snapshot.interactionSurfaces.length ? (
        <div className="debug-performance-table-wrap">
          <table>
            <thead><tr><th>Surface</th><th>Samples</th><th>p50</th><th>p75</th><th>p95</th><th>Worst</th></tr></thead>
            <tbody>
              {snapshot.interactionSurfaces.map((row) => (
                <tr key={row.id} className={scoreClass(row.p95Ms, snapshot.budgets.slowInteractionMs)}>
                  <td><code>{row.id}</code></td>
                  <td>{row.count}</td>
                  <td>{milliseconds(row.p50Ms)}</td>
                  <td>{milliseconds(row.p75Ms)}</td>
                  <td>{milliseconds(row.p95Ms)}</td>
                  <td>{milliseconds(row.maxMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="dbg-note">Use the game controls to collect interaction samples.</p>}

      <h4>Slowest controls</h4>
      {slowestInteractions.length ? (
        <div className="debug-performance-table-wrap">
          <table>
            <thead><tr><th>Surface / control</th><th>Event</th><th>Total</th><th>Input</th><th>Handler</th><th>Paint</th><th>Source</th></tr></thead>
            <tbody>
              {slowestInteractions.map((row) => (
                <tr key={row.id} className={performanceBand(row.durationMs)}>
                  <td><code>{row.surface}/{row.control}</code></td>
                  <td>{row.type}</td>
                  <td>{milliseconds(row.durationMs)}</td>
                  <td>{milliseconds(row.inputDelayMs)}</td>
                  <td>{milliseconds(row.processingMs)}</td>
                  <td>{milliseconds(row.presentationDelayMs)}</td>
                  <td>{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="dbg-note">No interaction samples yet.</p>}

      <h4>Application operations</h4>
      {slowestOperations.length ? (
        <div className="debug-performance-table-wrap">
          <table>
            <thead><tr><th>Operation</th><th>Samples</th><th>p95</th><th>Worst</th></tr></thead>
            <tbody>
              {slowestOperations.map((row) => (
                <tr key={row.id} className={scoreClass(row.maxMs, snapshot.budgets.browserSteadyOperationMaxMs)}>
                  <td><code>{row.id}</code></td><td>{row.count}</td><td>{milliseconds(row.p95Ms)}</td><td>{milliseconds(row.maxMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="dbg-note">No instrumented operations yet.</p>}

      <h4>Control coverage</h4>
      <div className="debug-performance-table-wrap">
        <table>
          <thead><tr><th>Surface</th><th>Control groups seen</th><th>Groups exercised</th></tr></thead>
          <tbody>
            {coverageBySurface.map((row) => (
              <tr key={row.surface}>
                <td><code>{row.surface}</code></td><td>{row.controls}</td><td>{row.exercised}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
