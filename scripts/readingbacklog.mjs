// Print a bounded, copy-ready tranche of story lines that still need a
// reviewed whole-line English reading. Addresses and Albanian text are exact;
// the draft field is only an interlinear aid and must be rewritten by an
// editor before it is placed in src/game/data/readings/*.js.
import { STORY, lineOf } from '../src/game/content.js'
import { REVIEWED_READINGS } from '../src/game/data/readings/reviewedReadings.js'
import {
  albanianTextOf,
  attachReviewedEnglishReadings,
  englishReadingOf,
  hasAuthoredEnglishReading,
} from '../src/game/language.js'

attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)

const valueOf = (name, fallback) => {
  const raw = process.argv.find((arg) => arg.startsWith(`--${name}=`))
  return raw ? Number(raw.slice(name.length + 3)) : fallback
}

const from = valueOf('from', 1)
const to = valueOf('to', Number.POSITIVE_INFINITY)
const stringValueOf = (name) => {
  const raw = process.argv.find((arg) => arg.startsWith(`--${name}=`))
  return raw ? raw.slice(name.length + 3) : null
}
const startNode = stringValueOf('start-node')
const endNode = stringValueOf('end-node')
if (!Number.isInteger(from) || from < 1 || to < from)
  throw new Error('Use a positive inclusive range, for example --from=1 --to=625')

let position = 0
let insideNodeRange = !startNode
let printed = 0
for (const [nodeId, node] of Object.entries(STORY)) {
  if (nodeId === startNode) insideNodeRange = true
  for (const [index, entry] of (node.text || []).entries()) {
    const line = lineOf(entry)
    if (hasAuthoredEnglishReading(line)) continue
    position++
    if (!insideNodeRange || position < from || position > to) continue
    printed++
    const address = `${nodeId}.text[${index}]`
    console.log(
      `${JSON.stringify(address)}: { al: ${JSON.stringify(albanianTextOf(line))}, en: "" },` +
      ` // draft only: ${englishReadingOf(line)}`,
    )
  }
  if (insideNodeRange && nodeId === endNode) break
}

console.error(
  startNode || endNode
    ? `Printed ${printed} remaining readings from ${startNode || 'the first node'} through ${endNode || 'the final node'}.`
    : position === 0
      ? 'Printed 0 remaining readings.'
      : `Printed remaining-reading positions ${from}–${Math.min(to, position)} of ${position}.`,
)
