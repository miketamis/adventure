// Release gate for the learner-facing Albanian dictionary. Definitions are not
// placeholders: they are teaching text shown both in the Dictionary and when a
// player focuses or hovers a saved word.
import assert from 'node:assert/strict'
import { DEFS, DICT } from '../src/game/content.js'
import { WORD_CLASS, wordClassOf } from '../src/game/wordClassPolicy.js'
import {
  DEFINITION_REVIEW_TRANCHES,
  EDITORIALLY_REVIEWED_DEFINITIONS,
  EDITORIALLY_REVIEWED_GLOSSES,
} from './definitionreviewledger.mjs'

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
// A compact example can be the clearest definition for grammar-heavy forms.
// Ordinary nouns, verbs and adjectives must explain their meaning instead of
// turning a dictionary card into a fill-in-the-blank question.
const contextualGrammarDefinitionIds = new Set([
  'behet', 'duhet', 'eshte', 'jam', 'je', 'ka', 'ke', 'mund',
])
const normalizeReviewText = (value) => String(value).normalize('NFC')
const renderDefinition = (tokens) => normalizeReviewText(tokens
  .map((token) => token.paren ? token.en : token.al)
  .join(' ')
  .replace(/\s+([,.;!?])/g, '$1'))
const foldedInitial = (value) => normalizeReviewText(value)
  .normalize('NFD')
  .replace(/\p{M}/gu, '')
  .toLocaleLowerCase('sq')
  .match(/[a-z]/u)?.[0] || ''
const plainLowercaseWord = /^\p{Ll}[\p{Ll}\p{M}'’-]*$/u

const withoutEnglishArticle = (value) => normalizeReviewText(value)
  .replace(/^(?:a|an|the)\s+/i, '')
const regularEnglishForms = (base) => {
  if (!/^[a-z]+$/u.test(base)) return new Set()
  const forms = new Set([`${base}s`, `${base}es`])
  forms.add(base.endsWith('e') ? `${base.slice(0, -1)}ing` : `${base}ing`)
  forms.add(base.endsWith('e') ? `${base}d` : `${base}ed`)
  if (base.endsWith('y')) forms.add(`${base.slice(0, -1)}ies`)
  return forms
}
const irregularEnglishFamilies = [
  ['be', 'am', 'is', 'are', 'was', 'were', 'been'],
  ['catch', 'catches', 'caught'],
  ['come', 'comes', 'came'],
  ['die', 'dies', 'dead'],
  ['give', 'gives', 'gave', 'given'],
  ['go', 'goes', 'went', 'gone'],
  ['have', 'has', 'had'],
  ['know', 'knows', 'knew', 'known'],
  ['leave', 'leaves', 'left'],
  ['see', 'sees', 'saw', 'seen'],
  ['take', 'takes', 'took', 'taken'],
  ['teach', 'teaches', 'taught'],
  ['write', 'writes', 'wrote', 'written'],
].map((family) => new Set(family))
const grammaticalEnglishVariant = (left, right) => {
  const a = withoutEnglishArticle(left).toLocaleLowerCase('en')
  const b = withoutEnglishArticle(right).toLocaleLowerCase('en')
  if (regularEnglishForms(a).has(b) || regularEnglishForms(b).has(a)) return true
  return irregularEnglishFamilies.some((family) => family.has(a) && family.has(b))
}
const definitionOwners = new Map()
const renderedDefinitions = new Map()

for (const id of Object.keys(DICT)) {
  const tokens = DEFS[id]
  if (!Array.isArray(tokens) || tokens.length === 0) {
    fail(`${id}: missing Albanian definition`)
    continue
  }

  const words = lexical(tokens)
  const wordClass = wordClassOf(id, DICT[id], {
    hasAttestedVariant: Boolean(DICT[id]?.forms?.length),
  })
  const hasBlank = tokens.some((token) => token.paren && String(token.en).includes('___'))
  if (
    hasBlank &&
    !contextualGrammarDefinitionIds.has(id) &&
    [WORD_CLASS.NOUN, WORD_CLASS.VERB, WORD_CLASS.ADJECTIVE].includes(wordClass)
  ) {
    fail(`${id}: ${wordClass} definition hides the headword in a blank instead of explaining it`)
  }
  if (words.length < 2) fail(`${id}: one-word alias is not a useful learner definition`)
  if (words.some((token) => token.id === id)) fail(`${id}: definition repeats its own headword`)
  if (bannedPlaceholders.has(signature(tokens))) fail(`${id}: generic placeholder “${signature(tokens)}”`)

  for (const token of tokens.filter((entry) => entry.paren)) {
    if (plainLowercaseWord.test(normalizeReviewText(token.en).trim())) {
      fail(`${id}: structural token “${token.en}” contains hidden lexical material; use a dictionary-backed w()/wf() token`)
    }
  }

  for (const token of words) {
    if (!DICT[token.id]) fail(`${id}: definition uses unknown sense ${token.id}`)
    if (!token.al || !token.en) fail(`${id}: definition token ${token.id} lacks Albanian or English text`)
  }

  const rendered = renderDefinition(tokens)
  renderedDefinitions.set(id, rendered)
  const duplicateKey = rendered.toLocaleLowerCase('sq')
  const owners = definitionOwners.get(duplicateKey) || []
  owners.push(id)
  definitionOwners.set(duplicateKey, owners)
}

for (const id of Object.keys(DEFS)) {
  if (!DICT[id]) fail(`${id}: definition has no matching dictionary sense`)
}

for (const [rendered, owners] of definitionOwners) {
  if (owners.length > 1) {
    fail(`${owners.join(', ')}: identical definition “${rendered}” does not distinguish these senses`)
  }
}

for (const [id, expected] of Object.entries(EDITORIALLY_REVIEWED_DEFINITIONS)) {
  if (!DICT[id]) {
    fail(`${id}: editorial definition review points to an unknown sense`)
    continue
  }
  const actual = renderedDefinitions.get(id)
  if (actual !== normalizeReviewText(expected)) {
    fail(`${id}: learner definition changed after editorial review; review it again and update definitionreviewledger.mjs`)
  }
}

for (const tranche of DEFINITION_REVIEW_TRANCHES) {
  const definitionIds = new Set(Object.keys(tranche.definitions))
  const glossIds = new Set(Object.keys(tranche.glosses))
  for (const id of new Set([...definitionIds, ...glossIds])) {
    if (!definitionIds.has(id) || !glossIds.has(id)) {
      fail(`${tranche.id}: ${id} must keep its definition and English gloss review in the same tranche`)
    }
    const entry = DICT[id]
    if (!entry) continue
    const initial = foldedInitial(entry.al)
    if (initial < tranche.first || initial > tranche.last) {
      fail(`${tranche.id}: ${id} (${entry.al}) belongs outside ${tranche.first.toUpperCase()}–${tranche.last.toUpperCase()}`)
    }
  }
}

for (const id of Object.keys(DICT)) {
  if (!Object.hasOwn(EDITORIALLY_REVIEWED_DEFINITIONS, id)) {
    fail(`${id}: learner definition has not received the required editorial review`)
  }
  if (!Object.hasOwn(EDITORIALLY_REVIEWED_GLOSSES, id)) {
    fail(`${id}: English sense label has not received the required editorial review`)
  }
}

for (const [id, expected] of Object.entries(EDITORIALLY_REVIEWED_GLOSSES)) {
  const entry = DICT[id]
  if (!entry) {
    fail(`${id}: editorial gloss review points to an unknown sense`)
    continue
  }
  const actual = { en: entry.en }
  if (entry.enAll) actual.enAll = entry.enAll
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${id}: English sense label changed after editorial review; review it again and update its definitionReviews tranche`)
  }
}

for (const [id, entry] of Object.entries(DICT)) {
  if (typeof entry.en !== 'string' || !entry.en.trim()) {
    fail(`${id}: learner-facing English sense label must be a non-empty string`)
  }
  if (!entry.enAll) continue
  if (typeof entry.enAll !== 'string') {
    fail(`${id}: enAll must be a slash-separated string`)
    continue
  }
  const rawMeanings = entry.enAll.split('/')
  const meanings = rawMeanings.map((meaning) => meaning.trim()).filter(Boolean)
  if (rawMeanings.some((meaning) => !meaning.trim()) || entry.enAll !== meanings.join(' / ')) {
    fail(`${id}: enAll must use non-empty meanings separated exactly by “ / ”`)
  }
  const normalizedMeanings = meanings.map((meaning) => normalizeReviewText(meaning).toLocaleLowerCase('en'))
  if (new Set(normalizedMeanings).size !== normalizedMeanings.length) {
    fail(`${id}: enAll repeats an English meaning`)
  }
  if (!meanings.includes(entry.en)) {
    fail(`${id}: enAll omits the default en label “${entry.en}”; w('${id}') would produce an undeclared learner answer`)
  }
  const maximum = id === 'ne' ? 5 : 4
  if (meanings.length > maximum) {
    fail(`${id}: learner-facing enAll lists ${meanings.length} readings; keep semantic meanings compact and leave tense/article variants on story tokens`)
  }
  for (let left = 0; left < meanings.length; left += 1) {
    for (let right = left + 1; right < meanings.length; right += 1) {
      const a = meanings[left]
      const b = meanings[right]
      if (withoutEnglishArticle(a) === withoutEnglishArticle(b)) {
        fail(`${id}: enAll uses article variants “${a}” / “${b}”; keep articles on contextual tokens`)
      } else if (grammaticalEnglishVariant(a, b)) {
        fail(`${id}: enAll uses grammatical variants “${a}” / “${b}”; keep tense/number variants on contextual tokens`)
      }
    }
  }
}

for (const id of Object.keys(EDITORIALLY_REVIEWED_DEFINITIONS)) {
  if (!Object.hasOwn(EDITORIALLY_REVIEWED_GLOSSES, id)) {
    fail(`${id}: definition review has no matching English gloss review`)
  }
}
for (const id of Object.keys(EDITORIALLY_REVIEWED_GLOSSES)) {
  if (!Object.hasOwn(EDITORIALLY_REVIEWED_DEFINITIONS, id)) {
    fail(`${id}: English gloss review has no matching definition review`)
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
const reviewedCount = Object.keys(EDITORIALLY_REVIEWED_DEFINITIONS).length
console.log(`  Editorial meaning review: ${reviewedCount}/${Object.keys(DICT).length} definitions and English sense labels sealed.`)
