// Release gate for the learner-facing Albanian dictionary. Definitions are not
// placeholders: they are teaching text shown both in the Dictionary and when a
// player focuses or hovers a saved word.
import assert from 'node:assert/strict'
import { DEFS, DICT } from '../src/game/content.js'

const failures = []
const fail = (message) => failures.push(message)
const lexical = (tokens) => tokens.filter((token) => token.id)
const signature = (tokens) => lexical(tokens).map((token) => token.id).join(' ')
const bannedPlaceholders = new Set([
  'nje gje',
  'nje njeri',
  'nje vend',
  'nje fjale e_art vogel',
])
const definitionOwners = new Map()

for (const id of Object.keys(DICT)) {
  const tokens = DEFS[id]
  if (!Array.isArray(tokens) || tokens.length === 0) {
    fail(`${id}: missing Albanian definition`)
    continue
  }

  const words = lexical(tokens)
  if (words.length < 2) fail(`${id}: one-word alias is not a useful learner definition`)
  if (words.some((token) => token.id === id)) fail(`${id}: definition repeats its own headword`)
  if (bannedPlaceholders.has(signature(tokens))) fail(`${id}: generic placeholder “${signature(tokens)}”`)

  for (const token of words) {
    if (!DICT[token.id]) fail(`${id}: definition uses unknown sense ${token.id}`)
    if (!token.al || !token.en) fail(`${id}: definition token ${token.id} lacks Albanian or English text`)
  }

  const rendered = tokens
    .map((token) => token.paren ? token.en : token.al)
    .join(' ')
    .replace(/\s+([,.;!?])/g, '$1')
    .toLocaleLowerCase('sq')
  const owners = definitionOwners.get(rendered) || []
  owners.push(id)
  definitionOwners.set(rendered, owners)
}

for (const id of Object.keys(DEFS)) {
  if (!DICT[id]) fail(`${id}: definition has no matching dictionary sense`)
}

for (const [rendered, owners] of definitionOwners) {
  if (owners.length > 1) {
    fail(`${owners.join(', ')}: identical definition “${rendered}” does not distinguish these senses`)
  }
}

const oneWordTargets = new Map()
for (const [id, tokens] of Object.entries(DEFS)) {
  const words = lexical(tokens)
  if (words.length === 1) oneWordTargets.set(id, words[0].id)
}
for (const [id, target] of oneWordTargets) {
  if (oneWordTargets.get(target) === id) fail(`${id} ↔ ${target}: circular alias pair`)
}

if (failures.length) {
  console.error(`Dictionary definition quality failed (${failures.length}):`)
  for (const message of failures) console.error(`  - ${message}`)
  process.exit(1)
}

assert.equal(Object.keys(DEFS).length, Object.keys(DICT).length)
console.log(`✓ ${Object.keys(DICT).length} dictionary senses have complete, non-placeholder Albanian definitions.`)
