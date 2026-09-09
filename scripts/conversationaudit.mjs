// Release check for the practical-language promise.
//
// This deliberately uses only synthetic curriculum targets from public source
// code. Private research transcripts must never become a build dependency.
// Run: node scripts/conversationaudit.mjs [--strict]

import { readFileSync } from 'node:fs'
import { DICT, START_NODE, STORY, lineOf } from '../src/game/content.js'
import { albanianTextOf } from '../src/game/language.js'
import { environmentStoryLine } from '../src/game/storyContext.js'
import {
  EVERYDAY_CAN_DO_GROUPS,
  EVERYDAY_CORE_SENSE_IDS,
  EVERYDAY_PHRASE_DRILLS,
  FIRST_MINUTES_PHRASES,
  FIRST_SESSION_PHRASES,
  RECYCLED_EARLY_CHUNKS,
} from '../src/game/everydayAlbanian.js'

const strict = process.argv.includes('--strict')
const normalize = (value) => String(value || '')
  .toLocaleLowerCase('sq')
  .replace(/[“”«»]/g, '')
  .replace(/[’‘]/g, "'")
  .replace(/\s+/g, ' ')
  .trim()
const wordsOnly = (value) => normalize(value)
  .replace(/[^a-zA-ZçÇëË'\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const depths = new Map([[START_NODE, 0]])
const queue = [START_NODE]
for (let cursor = 0; cursor < queue.length; cursor++) {
  const id = queue[cursor]
  const nextDepth = depths.get(id) + 1
  for (const option of STORY[id]?.options || []) {
    if (option.confuser || !option.to || depths.has(option.to)) continue
    depths.set(option.to, nextDepth)
    queue.push(option.to)
  }
}

const appearances = []
for (const [nodeId, node] of Object.entries(STORY)) {
  const depth = depths.get(nodeId) ?? Infinity
  for (const [index, entry] of (node.text || []).entries()) {
    appearances.push({
      address: `${nodeId}.text[${index}]`,
      nodeId,
      depth,
      interactive: false,
      al: normalize(albanianTextOf(lineOf(entry))),
    })
  }
  for (const [index, option] of (node.options || []).entries()) {
    if (option.confuser) continue
    appearances.push({
      address: `${nodeId}.options[${index}]`,
      nodeId,
      depth,
      interactive: true,
      al: normalize(albanianTextOf(option.text)),
    })
  }
}

// The changing environmental sentence is generated from public game state
// rather than copied into hundreds of scene records. Enumerate its canonical
// combinations here so phrase grounding covers what the player actually reads.
for (const [time, clock] of Object.entries({ morning: 0, noon: 6, afternoon: 7, evening: 13, night: 18 })) {
  for (const season of ['spring', 'summer', 'autumn', 'winter']) {
    for (const weather of ['clear', 'cloud', 'rain', 'storm', 'snow']) {
      appearances.push({
        address: `storyContext.${time}.${season}.${weather}`,
        nodeId: 'storyContext',
        depth: 0,
        interactive: false,
        al: normalize(albanianTextOf(environmentStoryLine({ clock, season, weather }))),
      })
    }
  }
}

const failures = []

// The public curriculum summary is part of the product promise. Keep its
// machine-readable count block tied to the real registries so documentation
// cannot quietly describe an older learning system.
const curriculumDoc = readFileSync(new URL('../docs/everyday-albanian-curriculum.md', import.meta.url), 'utf8')
const documentedCounts = {
  opening: FIRST_MINUTES_PHRASES.length,
  session: FIRST_SESSION_PHRASES.length,
  core: EVERYDAY_CORE_SENSE_IDS.length,
  phrases: EVERYDAY_PHRASE_DRILLS.length,
  groups: EVERYDAY_CAN_DO_GROUPS.length,
}
for (const [key, count] of Object.entries(documentedCounts)) {
  if (!curriculumDoc.includes(`<!-- curriculum:${key}=${count} -->`)) {
    failures.push(`curriculum documentation count drift: ${key} should be ${count}`)
  }
}
for (const target of FIRST_MINUTES_PHRASES) {
  const needle = normalize(target.al)
  const hits = appearances.filter((entry) => entry.al.includes(needle))
  const earliest = hits.reduce((best, entry) => Math.min(best, entry.depth), Infinity)
  if (!hits.length) failures.push(`missing first-minutes phrase: ${target.al}`)
  else if (earliest > target.maxDepth)
    failures.push(`${target.al} first appears at depth ${earliest}, target <= ${target.maxDepth}`)
  if (target.interactive && !hits.some((entry) => entry.interactive && entry.depth <= target.maxDepth))
    failures.push(`${target.al} is not speakable by depth ${target.maxDepth}`)
}

for (const target of FIRST_SESSION_PHRASES) {
  const needle = normalize(target.al)
  const hits = appearances.filter((entry) => entry.al.includes(needle))
  const earliest = hits.reduce((best, entry) => Math.min(best, entry.depth), Infinity)
  if (!hits.length) failures.push(`missing first-session phrase: ${target.al}`)
  else if (earliest > target.maxDepth)
    failures.push(`${target.al} first appears at depth ${earliest}, target <= ${target.maxDepth}`)
}

const phraseDrillIds = new Set()
const phraseDrillAlbanian = new Set()
const phraseDrillEnglish = new Set()
for (const entry of EVERYDAY_PHRASE_DRILLS) {
  if (phraseDrillIds.has(entry.id)) failures.push(`duplicate phrase-drill id: ${entry.id}`)
  if (phraseDrillAlbanian.has(entry.al)) failures.push(`duplicate phrase-drill Albanian: ${entry.al}`)
  if (phraseDrillEnglish.has(entry.en)) failures.push(`duplicate phrase-drill English: ${entry.en}`)
  phraseDrillIds.add(entry.id)
  phraseDrillAlbanian.add(entry.al)
  phraseDrillEnglish.add(entry.en)
  if (!appearances.some((appearance) => appearance.al.includes(normalize(entry.al))))
    failures.push(`phrase drill is not grounded in the story: ${entry.al}`)
  if (!entry.requires?.length) failures.push(`phrase drill has no required senses: ${entry.id}`)
  for (const id of entry.requires || []) if (!DICT[id])
    failures.push(`${entry.id} requires unknown sense: ${id}`)
}

const canDoIds = new Set()
for (const group of EVERYDAY_CAN_DO_GROUPS) {
  if (canDoIds.has(group.id)) failures.push(`duplicate can-do group id: ${group.id}`)
  canDoIds.add(group.id)
  if (!group.label || !Number.isInteger(group.minimum) || group.minimum < 1)
    failures.push(`incomplete can-do group: ${group.id || '(no id)'}`)
  if (group.drillIds.length < group.minimum)
    failures.push(`${group.id} has ${group.drillIds.length} drills, target >= ${group.minimum}`)
  if (new Set(group.drillIds).size !== group.drillIds.length)
    failures.push(`${group.id} repeats a phrase-drill id`)
  for (const id of group.drillIds) if (!phraseDrillIds.has(id))
    failures.push(`${group.id} names unknown phrase drill: ${id}`)
}

for (const target of RECYCLED_EARLY_CHUNKS) {
  const needle = wordsOnly(target.al)
  const count = appearances.filter((entry) => wordsOnly(entry.al).includes(needle)).length
  if (count < target.minimum)
    failures.push(`${target.al} appears ${count} time(s), target >= ${target.minimum}`)
}

const missingCoreIds = EVERYDAY_CORE_SENSE_IDS.filter((id) => !DICT[id])
if (missingCoreIds.length) failures.push(`practice priority contains unknown senses: ${missingCoreIds.join(', ')}`)
if (new Set(EVERYDAY_CORE_SENSE_IDS).size !== EVERYDAY_CORE_SENSE_IDS.length)
  failures.push('practice priority contains duplicate sense ids')

const reachedTargets = FIRST_MINUTES_PHRASES.length - failures.filter((line) =>
  line.startsWith('missing first-minutes') || line.includes('first appears at depth') || line.includes('is not speakable'),
).length
console.log('=== Everyday Albanian curriculum ===')
console.log(`opening targets: ${reachedTargets}/${FIRST_MINUTES_PHRASES.length}`)
console.log(`first-session targets: ${FIRST_SESSION_PHRASES.length}`)
console.log(`practice-priority senses: ${EVERYDAY_CORE_SENSE_IDS.length}`)
console.log(`whole-phrase drills: ${EVERYDAY_PHRASE_DRILLS.length}`)
console.log(`story-grounded can-do groups: ${EVERYDAY_CAN_DO_GROUPS.length}`)
console.log(`recycled early chunks: ${RECYCLED_EARLY_CHUNKS.length}`)

if (failures.length) {
  console.log(`\n❌ ${failures.length} conversation-curriculum failure(s)`)
  for (const failure of failures) console.log(`  - ${failure}`)
  if (strict) process.exitCode = 1
} else {
  console.log('\n✅ practical conversation is early, speakable, recycled and practice-weighted')
}
