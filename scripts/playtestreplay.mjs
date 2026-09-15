import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { verifyStructuredReplay } from '../src/game/playtestReplay.js'

const args = process.argv.slice(2)
const jsonOutput = args.includes('--json')
const sessionIndex = args.indexOf('--session')
const requestedSession = sessionIndex >= 0 ? args[sessionIndex + 1] : null
const inputPath = args.find((arg, index) => !arg.startsWith('--') &&
  !(sessionIndex >= 0 && index === sessionIndex + 1))

if (!inputPath) {
  console.error('Usage: npm run analytics:replay -- <posthog-export.json|ndjson> [--session <id>] [--json]')
  process.exitCode = 1
} else {
  const source = await readFile(resolve(inputPath), 'utf8')
  let parsed
  try {
    const value = JSON.parse(source)
    parsed = Array.isArray(value) ? value : value.results || value.events || []
  } catch {
    parsed = source.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line))
  }
  if (requestedSession) {
    parsed = parsed.filter((row) => {
      const properties = typeof row.properties === 'string' ? JSON.parse(row.properties) : row.properties
      return properties?.analytics_session_id === requestedSession
    })
  }
  const replay = verifyStructuredReplay(parsed)
  if (jsonOutput) {
    console.log(JSON.stringify(replay, null, 2))
  } else {
    console.log(`Structured replay: ${replay.valid ? 'valid' : 'needs review'} · ${replay.runCount} run(s) · ${replay.eventCount} event(s)`)
    for (const run of replay.runs) {
      console.log(`\n${run.runId} · ${run.transitionCount} committed transition(s) · build ${run.buildCommits.join(', ') || 'unknown'}`)
      for (const entry of run.timeline) {
        const sequence = entry.sequence == null ? '—' : String(entry.sequence)
        const subject = entry.actionType || entry.questionId || entry.nodeId || ''
        const outcome = entry.correct == null ? '' : entry.correct ? 'correct' : 'wrong'
        console.log([sequence.padStart(4), entry.event, subject, outcome].filter(Boolean).join(' · '))
      }
    }
    if (replay.issues.length) {
      console.log('\nData-quality issues:')
      for (const entry of replay.issues) console.log(`- ${entry.type}: ${JSON.stringify(entry)}`)
      process.exitCode = 2
    }
  }
}
