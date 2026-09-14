// Reconcile the deferred story-option English registry after choices move or
// new authored choices are inserted. Exact Albanian is the identity seal: an
// existing review may move only within the same story node, while a genuinely
// new static choice must carry an explicit R() (or choiceReading) English
// action before it can enter the internally reviewed corpus.
//
// The writer deliberately edits only affected one-line records. This preserves
// tranche ownership, editorial comments and the stable history of the large
// registry instead of regenerating every file for a small content change.
//
// Default: report/check only. Pass --write to update the registry files.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { HEART_LEVELS, ITEMS, STORY } from '../src/game/content.js'
import { albanianTextOf } from '../src/game/language.js'
import { OPTION_READINGS_A } from '../src/game/data/readings/optionsA.js'
import { OPTION_READINGS_B } from '../src/game/data/readings/optionsB.js'
import { OPTION_READINGS_C } from '../src/game/data/readings/optionsC.js'
import { OPTION_READINGS_STATIC } from '../src/game/data/readings/optionsStatic.js'

const tranches = [
  { name: 'OPTION_READINGS_A', path: new URL('../src/game/data/readings/optionsA.js', import.meta.url), values: OPTION_READINGS_A },
  { name: 'OPTION_READINGS_B', path: new URL('../src/game/data/readings/optionsB.js', import.meta.url), values: OPTION_READINGS_B },
  { name: 'OPTION_READINGS_C', path: new URL('../src/game/data/readings/optionsC.js', import.meta.url), values: OPTION_READINGS_C },
  { name: 'OPTION_READINGS_STATIC', path: new URL('../src/game/data/readings/optionsStatic.js', import.meta.url), values: OPTION_READINGS_STATIC },
]

const countPath = new URL('../src/game/data/readings/reviewedOptionReadings.js', import.meta.url)
const storyAddressPattern = /^(.+)\.options\[(\d+)]$/

const live = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, option] of (node.options || []).entries()) {
    // These runtime-generated actions carry their own audited readings and
    // must never shadow an address-pinned static review.
    if (option.contextGreeting || option.contextItemAction || option.contextObservation) continue
    live.push({
      address: `${nodeId}.options[${index}]`,
      group: `story:${nodeId}`,
      index,
      al: albanianTextOf(option.text),
      authoredEnglish: option.choiceReading || option.text?.reading || '',
    })
  }
}
for (const [id, item] of Object.entries(ITEMS)) {
  if (!Array.isArray(item?.use?.phrase) || item.use.phrase.length === 0) continue
  const address = `ITEMS.${id}.use.phrase`
  live.push({
    address,
    group: `static:${address}`,
    index: 0,
    al: albanianTextOf(item.use.phrase),
    authoredEnglish: item.use.phrase.choiceReading || item.use.phrase.reading || '',
  })
}
for (const [index, level] of Object.entries(HEART_LEVELS)) {
  if (!Array.isArray(level?.heal?.phrase) || level.heal.phrase.length === 0) continue
  const address = `HEART_LEVELS.${index}.heal.phrase`
  live.push({
    address,
    group: `static:${address}`,
    index: 0,
    al: albanianTextOf(level.heal.phrase),
    authoredEnglish: level.heal.phrase.choiceReading || level.heal.phrase.reading || '',
  })
}

const liveByAddress = new Map(live.map((entry) => [entry.address, entry]))
const liveByGroup = new Map()
for (const entry of live) {
  if (!liveByGroup.has(entry.group)) liveByGroup.set(entry.group, [])
  liveByGroup.get(entry.group).push(entry)
}

const groupOfAddress = (address) => {
  const storyMatch = storyAddressPattern.exec(address)
  return storyMatch ? `story:${storyMatch[1]}` : `static:${address}`
}

const indexOfAddress = (address) => {
  const storyMatch = storyAddressPattern.exec(address)
  return storyMatch ? Number(storyMatch[2]) : 0
}

const usedAddresses = new Set()
const matched = []
const removed = []
const conflicts = []
const preservedAuthoredDifferences = []
const matchedByGroup = new Map()

for (const [owner, tranche] of tranches.entries()) {
  for (const [oldAddress, review] of Object.entries(tranche.values)) {
    const group = groupOfAddress(oldAddress)
    const oldIndex = indexOfAddress(oldAddress)
    const exact = liveByAddress.get(oldAddress)
    const candidates = (liveByGroup.get(group) || [])
      .filter((entry) => entry.al === review.al && !usedAddresses.has(entry.address))
      .sort((left, right) =>
        Math.abs(left.index - oldIndex) - Math.abs(right.index - oldIndex) || left.index - right.index)
    const target = exact?.al === review.al && !usedAddresses.has(oldAddress) ? exact : candidates[0]
    if (!target) {
      removed.push({ owner, oldAddress })
      continue
    }
    if (target.authoredEnglish && target.authoredEnglish !== review.en) {
      // Existing address-pinned editorial English remains authoritative. A
      // differing source annotation is reported, but never silently churned.
      preservedAuthoredDifferences.push(
        `${oldAddress}: authored English “${target.authoredEnglish}” conflicts with preserved review “${review.en}”`,
      )
    }
    usedAddresses.add(target.address)
    const record = { owner, oldAddress, target, review }
    matched.push(record)
    if (!matchedByGroup.has(group)) matchedByGroup.set(group, [])
    matchedByGroup.get(group).push(record)
  }
}

const additions = []
for (const target of live) {
  if (usedAddresses.has(target.address)) continue
  if (!String(target.authoredEnglish || '').trim()) {
    conflicts.push(`${target.address}: new static choice has no explicit R() or choiceReading English`)
    continue
  }
  const nearby = (matchedByGroup.get(target.group) || [])
    .slice()
    .sort((left, right) =>
      Math.abs(left.target.index - target.index) - Math.abs(right.target.index - target.index) ||
      left.target.index - right.target.index)
  // Brand-new nodes belong in the append-only static tranche. Choices added
  // inside an established node stay beside that node's nearest reviewed row.
  const owner = nearby[0]?.owner ?? tranches.length - 1
  additions.push({
    owner,
    target,
    review: { al: target.al, en: target.authoredEnglish, review: 'internal-editorial' },
  })
  usedAddresses.add(target.address)
}

const duplicateTargets = matched
  .map(({ target }) => target.address)
  .concat(additions.map(({ target }) => target.address))
  .filter((address, index, all) => all.indexOf(address) !== index)
if (duplicateTargets.length)
  conflicts.push(`duplicate rebuilt addresses: ${[...new Set(duplicateTargets)].join(', ')}`)

if (conflicts.length) {
  console.error(conflicts.join('\n'))
  process.exit(1)
}

const moved = matched.filter(({ oldAddress, target }) => oldAddress !== target.address)
const changed = moved.length + removed.length + additions.length
const write = process.argv.includes('--write')
const strictCheck = process.argv.includes('--check')

const recordLine = (address, review) =>
  `  ${JSON.stringify(address)}: { al: ${JSON.stringify(review.al)}, en: ${JSON.stringify(review.en)}, review: 'internal-editorial' },`

if (write) {
  for (const [owner, tranche] of tranches.entries()) {
    const path = fileURLToPath(tranche.path)
    let source = readFileSync(path, 'utf8')
    const movesByAddress = new Map(moved
      .filter((entry) => entry.owner === owner)
      .map(({ oldAddress, target }) => [oldAddress, target.address]))
    const removedAddresses = new Set(removed
      .filter((entry) => entry.owner === owner)
      .map(({ oldAddress }) => oldAddress))
    const foundMoves = new Set()
    const foundRemovals = new Set()
    // Resolve all address moves from the original lines in one pass. Sequential
    // string replacement would corrupt a shift such as 4 -> 5 -> 6 because the
    // second replacement could select the row moved by the first.
    source = source.split('\n').flatMap((line) => {
      const match = /^\s*("(?:[^"\\]|\\.)+")\s*:/.exec(line)
      if (!match) return [line]
      const address = JSON.parse(match[1])
      if (removedAddresses.has(address)) {
        foundRemovals.add(address)
        return []
      }
      const destination = movesByAddress.get(address)
      if (!destination) return [line]
      foundMoves.add(address)
      return [line.replace(match[1], JSON.stringify(destination))]
    }).join('\n')
    for (const address of movesByAddress.keys()) {
      if (!foundMoves.has(address)) throw new Error(`${tranche.name}: cannot find moved row ${address}`)
    }
    for (const address of removedAddresses) {
      if (!foundRemovals.has(address)) throw new Error(`${tranche.name}: cannot find removed row ${address}`)
    }
    const newRows = additions
      .filter((entry) => entry.owner === owner)
      .map(({ target, review }) => recordLine(target.address, review))
    if (newRows.length) {
      const closing = /\n}\)\s*$/
      if (!closing.test(source)) throw new Error(`${tranche.name}: cannot find object closing marker`)
      source = source.replace(closing, `\n${newRows.join('\n')}\n})\n`)
    }
    writeFileSync(path, source)
  }

  const desiredCount = live.length
  const countFile = fileURLToPath(countPath)
  const countSource = readFileSync(countFile, 'utf8')
  const nextCountSource = countSource.replace(
    /export const REVIEWED_OPTION_COUNT = \d+/,
    `export const REVIEWED_OPTION_COUNT = ${desiredCount}`,
  )
  if (nextCountSource === countSource && !countSource.includes(`REVIEWED_OPTION_COUNT = ${desiredCount}`))
    throw new Error('cannot update REVIEWED_OPTION_COUNT')
  writeFileSync(countFile, nextCountSource)
}

console.log(`reviewed static actions: ${live.length} current entries`)
console.log(`moved within their original node: ${moved.length}`)
console.log(`removed because their Albanian action no longer exists: ${removed.length}`)
console.log(`authored actions added to the deferred corpus: ${additions.length}`)
console.log(`existing editorial readings preserved over differing source annotations: ${preservedAuthoredDifferences.length}`)
if (!write && changed) console.log('run with --write after the story edit is final')
if (strictCheck && changed) {
  console.error('reviewed-option registry is stale; run node scripts/reviewedoptionreadingsync.mjs --write')
  process.exitCode = 1
}
