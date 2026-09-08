// Verify that sentence-gated options identify the same authored sentence in
// runtime and static analysis. Run with --strict to make unresolved ambiguity
// a certification failure, or --json for a machine-readable review queue.
import { STORY, lineOf } from '../src/game/content.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'

const strict = process.argv.includes('--strict')
const json = process.argv.includes('--json')
const findings = []
let gates = 0

for (const [nodeId, node] of Object.entries(STORY)) {
  const lines = (node.text || []).map(lineOf)
  for (const [optionIndex, option] of (node.options || []).entries()) {
    if (!option.reveal) continue
    gates++
    const resolution = resolveRevealLine(lines, option)
    if (resolution.status === 'unique' || resolution.status === 'selected') continue
    findings.push({
      nodeId,
      optionIndex,
      target: option.to,
      sense: option.reveal,
      status: resolution.status,
      matchingAuthoredLines: resolution.matches.map(({ index }) => index + 1),
    })
  }
}

if (json) {
  console.log(JSON.stringify({ gates, findings }, null, 2))
} else {
  for (const finding of findings) {
    const matches = finding.matchingAuthoredLines.length
      ? `authored lines ${finding.matchingAuthoredLines.join(', ')}`
      : 'no authored line'
    console.log(
      `✗ ${finding.nodeId} option ${finding.optionIndex} → ${finding.target}: ` +
      `reveal '${finding.sense}' is ${finding.status} (${matches})`,
    )
  }
  console.log(`\n${gates - findings.length}/${gates} reveal gates select one stable authored sentence.`)
  if (findings.length) {
    console.log(`${findings.length} need semantic review; use 1-based revealOccurrence after reading the candidate lines.`)
  }
}

if (strict && findings.length) process.exitCode = 1
