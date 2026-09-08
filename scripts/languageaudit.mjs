// PLAYER-FACING LANGUAGE AUDIT
//
// This certifies the boundaries we can prove mechanically:
//   * every assessed sentence has an authored whole-line reading (or is an
//     exact registered quotation with a reviewed translation)
//   * every generated achievement attempt has four answerable questions
//   * all options are unique, grammatical teaching units from reviewed lines
//     or unambiguous words actually represented in the story dictionary
//   * quote translations and token/form glosses retain their required metadata
//
// It deliberately does NOT call a literal-gloss fallback "reviewed English".
// Those lines remain visible reading aids and are counted as editorial backlog.
// Run: node scripts/languageaudit.mjs

import { createHash } from 'node:crypto'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { testFor } from '../src/game/comprehension.js'
import { DICT, HEART_LEVELS, ITEMS, STORY, lineOf } from '../src/game/content.js'
import { REVIEWED_READINGS } from '../src/game/data/readings/reviewedReadings.js'
import {
  attachReviewedOptionReadings,
  dynamicItemConfuserEnglish,
  OPTION_READING_REVIEW_HASH,
  optionReviewPayload,
  REVIEWED_OPTION_COUNT,
  REVIEWED_OPTION_READINGS,
} from '../src/game/data/readings/reviewedOptionReadings.js'
import {
  attachReviewedEnglishReadings,
  albanianTextOf,
  alignedEnglishOf,
  englishReadingIssues,
  englishReadingOf,
  hasAuthoredEnglishReading,
  isComprehensionReadyLine,
  isExactSourceQuoteLine,
} from '../src/game/language.js'

attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)
attachReviewedOptionReadings(STORY, ITEMS, HEART_LEVELS)

const STRICT = process.argv.includes('--strict')
const LIST_BACKLOG = process.argv.includes('--list-backlog')

const lines = []
const options = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, entry] of (node.text || []).entries()) lines.push({ nodeId, index, line: lineOf(entry) })
  for (const [index, option] of (node.options || []).entries())
    options.push({ address: `${nodeId}.options[${index}]`, option })
}
const optionCount = options.length

const failures = []
const fail = (message) => failures.push(message)
const assert = (condition, message) => { if (!condition) fail(message) }

for (const [address, review] of Object.entries(REVIEWED_READINGS)) {
  assert(review && typeof review === 'object', `${address}: registry review must be an object`)
  assert(Boolean(String(review?.al || '').trim()), `${address}: registry review has no pinned Albanian source`)
  assert(Boolean(String(review?.en || '').trim()), `${address}: registry review has no English reading`)
  assert(review?.al === review?.al?.trim(), `${address}: pinned Albanian has outer whitespace`)
  assert(review?.en === review?.en?.trim(), `${address}: English reading has outer whitespace`)
  assert(!/\s{2,}/.test(review?.en || ''), `${address}: English reading contains repeated whitespace`)
  const openingQuotes = (review?.en?.match(/“/g) || []).length
  const closingQuotes = (review?.en?.match(/”/g) || []).length
  assert(openingQuotes === closingQuotes, `${address}: English reading has unbalanced curly quotation marks`)
}

const optionReviewHash = 'sha256:' + createHash('sha256')
  .update(JSON.stringify(optionReviewPayload()))
  .digest('hex')
assert(
  optionReviewHash === OPTION_READING_REVIEW_HASH,
  `option-reading review seal mismatch: recorded ${OPTION_READING_REVIEW_HASH}, current ${optionReviewHash}`,
)
assert(
  Object.keys(REVIEWED_OPTION_READINGS).length === REVIEWED_OPTION_COUNT,
  `option-reading registry has ${Object.keys(REVIEWED_OPTION_READINGS).length} entries instead of ${REVIEWED_OPTION_COUNT}`,
)
assert(
  !Object.values(REVIEWED_OPTION_READINGS).some((review) => review?.review === 'candidate'),
  'option-reading registry still contains candidate entries',
)

for (const [address, review] of Object.entries(REVIEWED_OPTION_READINGS)) {
  assert(review && typeof review === 'object', `${address}: option review must be an object`)
  assert(Boolean(String(review?.al || '').trim()), `${address}: option review has no pinned Albanian`)
  assert(Boolean(String(review?.en || '').trim()), `${address}: option review has no English action`)
  assert(review?.al === review?.al?.trim(), `${address}: option Albanian has outer whitespace`)
  assert(review?.en === review?.en?.trim(), `${address}: option English has outer whitespace`)
  assert(review?.review === 'internal-editorial', `${address}: option is not internally line-reviewed`)
  assert(!/\s{2,}/.test(review?.en || ''), `${address}: option English contains repeated whitespace`)
  assert(/^[^A-Za-z]*[A-Z]/.test(review?.en || ''), `${address}: option English is not sentence-cased: ${review?.en}`)
  assert(/[.!?…][”»"]?$/.test(review?.en || ''), `${address}: option English has no terminal punctuation: ${review?.en}`)
  const openingQuotes = (review?.en?.match(/“/g) || []).length
  const closingQuotes = (review?.en?.match(/”/g) || []).length
  assert(openingQuotes === closingQuotes, `${address}: option English has unbalanced curly quotation marks`)
  for (const issue of englishReadingIssues(review?.en || ''))
    fail(`${address}: option English has ${issue}: ${review?.en}`)
}

// The same Albanian action should not acquire different English merely because
// it landed in another generated registry tranche. Two phrases genuinely
// depend on scene context; pin their complete allowed sets so this exception
// list cannot become a blanket bypass for future drift.
const CONTEXT_SENSITIVE_OPTION_READINGS = new Map([
  ['ec rrugës', new Set(['Walk along the road.', 'Walk along the lane.'])],
  ['merr diellin', new Set(['Take the sun.', 'Take the Sun.'])],
])
const optionEnglishByAlbanian = new Map()
for (const review of Object.values(REVIEWED_OPTION_READINGS)) {
  if (!optionEnglishByAlbanian.has(review.al)) optionEnglishByAlbanian.set(review.al, new Set())
  optionEnglishByAlbanian.get(review.al).add(review.en)
}
const sameSet = (left, right) => left?.size === right?.size && [...left].every((value) => right.has(value))
for (const [albanian, readings] of optionEnglishByAlbanian) {
  if (readings.size <= 1) continue
  const allowed = CONTEXT_SENSITIVE_OPTION_READINGS.get(albanian)
  assert(Boolean(allowed), `duplicate Albanian option has inconsistent English: ${albanian} -> ${[...readings].join(' / ')}`)
  if (allowed) assert(
    sameSet(readings, allowed),
    `context-sensitive option left its pinned English set: ${albanian} -> ${[...readings].join(' / ')}`,
  )
}
for (const [albanian, allowed] of CONTEXT_SENSITIVE_OPTION_READINGS) {
  const readings = optionEnglishByAlbanian.get(albanian)
  assert(
    sameSet(readings, allowed),
    `context-sensitive option exception is stale: ${albanian}`,
  )
}

for (const { address, option } of options) {
  const review = REVIEWED_OPTION_READINGS[address]
  assert(Boolean(review), `${address}: missing static option review`)
  assert(option.text?.optionReadingAddress === address, `${address}: reviewed action was not attached`)
  assert(option.text?.optionReadingAlbanian === review?.al, `${address}: attached Albanian pin differs from registry`)
  assert(option.text?.optionReading === review?.en, `${address}: attached English differs from registry`)
  assert(albanianTextOf(option.text) === review?.al, `${address}: live Albanian differs from registry`)
}

const STATIC_ACTIONS = [
  ...Object.entries(ITEMS)
    .filter(([, item]) => Array.isArray(item?.use?.phrase) && item.use.phrase.length)
    .map(([id, item]) => [`ITEMS.${id}.use.phrase`, item.use.phrase]),
  ...Object.entries(HEART_LEVELS)
    .filter(([, level]) => Array.isArray(level?.heal?.phrase) && level.heal.phrase.length)
    .map(([index, level]) => [`HEART_LEVELS.${index}.heal.phrase`, level.heal.phrase]),
]
for (const [address, phrase] of STATIC_ACTIONS) {
  const review = REVIEWED_OPTION_READINGS[address]
  assert(Boolean(review), `${address}: missing static action review`)
  assert(phrase.optionReadingAddress === address, `${address}: static action review was not attached`)
  assert(albanianTextOf(phrase) === review?.al, `${address}: static action Albanian differs from registry`)
  assert(phrase.optionReading === review?.en, `${address}: static action English differs from registry`)
}

const liquidItems = new Set(['qumesht', 'potion', 'cajMali'])
const dynamicConfuserReadings = []
for (const [id, item] of Object.entries(ITEMS)) {
  if (item.companion || item.currency) continue
  const reading = dynamicItemConfuserEnglish(item, liquidItems.has(id))
  dynamicConfuserReadings.push(reading)
  assert(/^(?:Fight|Drink) .+[.]$/.test(reading), `dynamic item confuser is malformed for ${id}: ${reading}`)
  for (const issue of englishReadingIssues(reading))
    fail(`dynamic item confuser for ${id} has ${issue}: ${reading}`)
}

const KNOWN_OPTION_REPAIRS = {
  'binoshetDasma.options[0]': 'Stay at the celebration for nine days.',
  'gjarperBurr1.options[0]': 'Stay calm.',
  'gjizarUdha.options[0]': 'Stay with the sisters for three months.',
  'ngjitja1.options[0]': 'Stay calm.',
  'karkanxholl1.options[0]': 'Stay calm.',
  'pallatRoje.options[0]': 'Why is the palace black?',
  'patatGruaja.options[1]': 'Stay calm.',
  'qeniGate.options[0]': 'The Ora helps you.',
  'kordha2.options[1]': 'Stay calm.',
  'uraVellezerit.options[0]': 'Say: “I am Kiço, your brother.”',
  'uraGropa.options[0]': 'Say: “My ring is down below.”',
  'xhindMulli.options[0]': 'Stay calm.',
}
for (const [address, expected] of Object.entries(KNOWN_OPTION_REPAIRS))
  assert(REVIEWED_OPTION_READINGS[address]?.en === expected, `${address}: known malformed option regression returned`)

const authored = lines.filter(({ line }) => String(line?.reading || '').trim())
const quoteLines = lines.filter(({ line }) => line?.quoteId)
const exactQuotes = quoteLines.filter(({ line }) => isExactSourceQuoteLine(line))
const reviewed = lines.filter(({ line }) => hasAuthoredEnglishReading(line))
const fallbacks = lines.filter(({ line }) => !hasAuthoredEnglishReading(line))
const blockedFallbacks = fallbacks.filter(({ line }) => englishReadingIssues(line).length)
const cleanWordGloss = (value) => String(value || '')
  .replace(/\s+\((?:object|buddy)\)$/i, '')
  .replace(/\s+/g, ' ')
  .trim()
const storyWordPairs = new Set()
const storyWordMeanings = new Map()
for (const { line } of lines) {
  for (const token of line) {
    if (!token.id || !token.al || !token.en) continue
    const surface = token.al.toLocaleLowerCase('sq')
    const gloss = cleanWordGloss(token.en)
    storyWordPairs.add(`${surface}\u0000${gloss}`)
    if (!storyWordMeanings.has(surface)) storyWordMeanings.set(surface, new Set())
    storyWordMeanings.get(surface).add(gloss.toLocaleLowerCase('en'))
  }
}

if (LIST_BACKLOG) {
  for (const { nodeId, index, line } of fallbacks) {
    const issues = englishReadingIssues(line)
    console.log([
      `${nodeId}.text[${index}]`,
      albanianTextOf(line),
      englishReadingOf(line),
      issues.length ? issues.join('; ') : 'editorial review pending',
    ].join('\t'))
  }
}

for (const { nodeId, index, line } of lines) {
  const where = `${nodeId}.text[${index}]`
  assert(Array.isArray(line) && line.length > 0, `${where}: missing token line`)
  assert(Boolean(albanianTextOf(line)), `${where}: empty Albanian rendering`)
  assert(Boolean(englishReadingOf(line)), `${where}: empty English reading`)
  if (line?.reading) {
    assert(line.reading === line.reading.trim(), `${where}: authored reading has outer whitespace`)
    for (const issue of englishReadingIssues(line.reading)) fail(`${where}: authored reading: ${issue}: ${line.reading}`)
  }
  if (line?.quoteId) {
    assert(Boolean(line.quoteGameTranslation), `${where}: ${line.quoteId} has no displayed-line English translation`)
    assert(Boolean(line.quoteSourceTranslation), `${where}: ${line.quoteId} has no source-context English translation`)
    assert(line.quoteTranslation === line.quoteGameTranslation, `${where}: compatibility translation leaked source context`)
    assert(Boolean(line.quoteGame), `${where}: ${line.quoteId} has no registered Albanian game text`)
  }
  if (isComprehensionReadyLine(line))
    assert(hasAuthoredEnglishReading(line), `${where}: an unreviewed fallback was marked quiz-ready`)
}

const massNouns = '(?:gold|darkness|power|blood|iron|milk|water|bread|meat|salt)'
for (const [id, entry] of Object.entries(DICT)) {
  if (new RegExp(`^(?:a|an) ${massNouns}$`, 'i').test(entry.en))
    fail(`DICT.${id}.en has an impossible count article: ${entry.en}`)
  for (const form of entry.forms || []) {
    if (new RegExp(`^(?:a|an) ${massNouns}$`, 'i').test(form.gloss))
      fail(`DICT.${id} form ${form.al} has an impossible count article: ${form.gloss}`)
  }
}

// The old fallback's trailing-s heuristic changed singular "dress" to a
// plural subject. Keep a concrete regression assertion even though fallbacks
// are no longer eligible quiz answers.
const dressPower = lines.find(({ line }) => albanianTextOf(line).toLocaleLowerCase('sq') === 'rroba ka fuqi.')
assert(Boolean(dressPower), 'regression fixture "rroba ka fuqi" is missing')
if (dressPower) assert(
  /^(?:The )?(?:dress|robe) has power\.$/.test(englishReadingOf(dressPower.line)),
  `singular dress agreement regressed: ${englishReadingOf(dressPower.line)}`,
)

const approvedSentencePairs = new Set(
  lines
    .filter(({ line }) => isComprehensionReadyLine(line))
    .map(({ line }) => `${albanianTextOf(line)}\u0000${englishReadingOf(line)}`),
)
const dictionaryEnglish = new Set(Object.values(DICT).map((entry) => entry.en))
const forbiddenQuizFragments = /\b(?:you beautiful are|dress have|brothers stays|stays and wait|says: opens)\b/i
const attemptsPerAchievement = 50
let questionCount = 0
let sentenceQuestions = 0
let wordQuestions = 0

for (const achievement of ACHIEVEMENTS) {
  for (let attempt = 0; attempt < attemptsPerAchievement; attempt++) {
    const questions = testFor(achievement, attempt)
    const where = `${achievement.id} attempt ${attempt}`
    assert(Array.isArray(questions), `${where}: no comprehension test generated`)
    if (!Array.isArray(questions)) continue
    assert(questions.length === 4, `${where}: generated ${questions.length} questions instead of 4`)
    for (const [index, question] of questions.entries()) {
      questionCount++
      const qwhere = `${where}, question ${index + 1}`
      assert(question.kind === 'sentence' || question.kind === 'word', `${qwhere}: unknown kind ${question.kind}`)
      assert(Boolean(question.prompt), `${qwhere}: missing plain-language prompt`)
      assert(Boolean(question.albanian), `${qwhere}: empty Albanian`)
      assert(Boolean(question.correct), `${qwhere}: empty correct answer`)
      assert(Array.isArray(question.options) && question.options.length === 3, `${qwhere}: must have exactly three options`)
      assert(new Set(question.options || []).size === 3, `${qwhere}: options are not unique`)
      assert(question.options?.includes(question.correct), `${qwhere}: correct answer is absent from options`)
      for (const option of question.options || []) {
        for (const issue of englishReadingIssues(option)) fail(`${qwhere}: option has ${issue}: ${option}`)
        if (forbiddenQuizFragments.test(option)) fail(`${qwhere}: legacy malformed option returned: ${option}`)
      }
      if (question.kind === 'sentence') {
        sentenceQuestions++
        assert(
          approvedSentencePairs.has(`${question.albanian}\u0000${question.correct}`),
          `${qwhere}: sentence answer is not an approved whole-line reading: ${question.correct}`,
        )
      } else {
        wordQuestions++
        // Contextual wf() glosses can be more precise than the base entry, so
        // require a concise independent phrase rather than base-gloss identity.
        assert(question.correct.split(/\s+/).length <= 5, `${qwhere}: isolated-word gloss is too long: ${question.correct}`)
        assert(!question.correct.includes('/'), `${qwhere}: isolated-word answer contains unresolved senses: ${question.correct}`)
        const surface = question.albanian.toLocaleLowerCase('sq')
        assert(
          storyWordPairs.has(`${surface}\u0000${question.correct}`),
          `${qwhere}: isolated-word pair was not encountered in a story line: ${question.albanian} = ${question.correct}`,
        )
        assert(storyWordMeanings.get(surface)?.size === 1, `${qwhere}: isolated Albanian surface is globally ambiguous: ${question.albanian}`)
        assert(surface !== question.correct.toLocaleLowerCase('en'), `${qwhere}: name/cognate answer gives itself away: ${question.correct}`)
      }
    }
  }
}

// Guard the concrete failure reported during this campaign.
const evilEye = ACHIEVEMENTS.find((achievement) => achievement.id === 'syriKeqFund')
if (evilEye) {
  const rendered = JSON.stringify(testFor(evilEye, 0))
  assert(!rendered.includes('His mother stays and wait.'), 'evil-eye quiz still emits "His mother stays and wait."')
  assert(!rendered.includes('You beautiful are.'), 'evil-eye quiz still emits "You beautiful are."')
}

const reviewedAligned = reviewed.filter(({ line }) => englishReadingOf(line) === alignedEnglishOf(line)).length
console.log(`World language surface: ${Object.keys(STORY).length} nodes, ${lines.length} story lines, ${optionCount} options.`)
console.log(`Reviewed whole-line English: ${reviewed.length} (${authored.length} authored; ${exactQuotes.length} exact source-quote translations).`)
console.log(`Deferred reviewed-reading registry: ${Object.keys(REVIEWED_READINGS).length} address-and-source-pinned entries.`)
console.log(`Reviewed action English: ${REVIEWED_OPTION_READINGS.size || Object.keys(REVIEWED_OPTION_READINGS).length}/${REVIEWED_OPTION_COUNT} static actions (${optionCount} story options + ${STATIC_ACTIONS.length} item/heal actions).`)
console.log(`Option review seal: ${optionReviewHash}; dynamic item distractor patterns checked: ${dynamicConfuserReadings.length}.`)
console.log(`Literal alignment happens to equal ${reviewedAligned} reviewed readings; equality is allowed only because review metadata exists.`)
console.log(`Editorial fallback backlog: ${fallbacks.length} lines (${blockedFallbacks.length} with known blocker signatures).`)
console.log(`Quote translations: ${quoteLines.length}/${quoteLines.length} registered; ${exactQuotes.length} are exact whole-line matches and ${quoteLines.length - exactQuotes.length} include extra framing.`)
console.log(`Comprehension simulation: ${ACHIEVEMENTS.length * attemptsPerAchievement} attempts, ${questionCount} questions (${sentenceQuestions} sentence; ${wordQuestions} word).`)
console.log(`Dictionary entries represented in the base answer lexicon: ${dictionaryEnglish.size}.`)

if (STRICT && fallbacks.length)
  fail(`strict publication gate: ${fallbacks.length} story lines still lack a reviewed whole-line reading`)

if (failures.length) {
  console.error(`\nLANGUAGE AUDIT FAILED (${failures.length})`)
  for (const message of failures.slice(0, 100)) console.error(`- ${message}`)
  if (failures.length > 100) console.error(`- … ${failures.length - 100} more`)
  process.exitCode = 1
} else {
  console.log(`\nLANGUAGE AUDIT PASSED: no unreviewed sentence or static action can be taught as correct English.${STRICT ? ' The reviewed-reading backlogs are empty.' : ''}`)
}
