import { DICT, STORY, lineOf } from './content.js'
import { VERB_IDS, albanianTextOf, englishReadingIssues, englishReadingOf, englishReadingRevision, isComprehensionReadyLine } from './language.js'

// ---------------------------------------------------------------------------
// THE COMPREHENSION GATE — question building for achievements.
// An achievement is unlocked only through a HARD comprehension test: an
// Albanian line from the story the player just lived, three English readings
// (the real one and two near misses), and EVERY question must be answered
// correctly. The `attempt` count salts both which lines are asked and how the
// distractors shuffle, so a failed test can't be beaten by memorising the
// previous attempt's answers.
// Pure content logic — shared by the ending screen, the area banner and the
// Achievements codex (which is why it lives here and not in StoryView).
// ---------------------------------------------------------------------------

// sense ids that are NOT nouns (verbs, particles, adjectives, adverbs, numbers).
// Used here to rank lines by substance; StoryView also uses it to pick a real
// "thing" from a scene for item-combo distractors and sentence-gated directions.
export const NON_NOUNS = new Set([
  'ti', 'je', 'ne', 'nje', 'dhe', 'ka', 'ke', 'mund', 'eshte', 'te_link', 'te_subj', 'te_obj', 'deri',
  'i_art', 'e_art', 'me', 'por', 'nuk', 'pa', 'ku', 'qe', 'do', 'per', 'une', 'jam', 'ose', 'jo',
  'sheh', 'ec', 'fle', 'hap', 'ik', 'jep', 'pi', 'behet', 'vjen', 'zgjohu', 'rri', 'ndiz', 'ha',
  'mbaroi', 'humbet', 'merr', 'kerko', 'gjen', 'kalo', 'shko', 'prit', 'lufto', 'vrit', 'shpeto',
  'ngjit', 'zbrit', 'fluturo', 'degjo', 'flet', 'thote', 'ndihmo', 'beso', 'hyr', 'dil', 'thirr',
  'hidh', 'kthehu', 'prek', 'vdes', 'bie', 'pre', 'luan', 'bej', 'mbyll', 'vazhdon', 'lind', 'fol',
  'premto', 'shkimet', 'mplaket', 'trashegohet', 'e_conj', 'o',
  'lan', 'thyen', 'leh', 'kafshon', 'vonon', 'harron', 'mbare', 'me_obj', 'piqet', 'rron',
  'tona', 'djathte', 'lumte',
  'madh', 'vogel', 'erret', 'sigurt', 'ri', 'vjeter', 'uritur', 'shpejt', 'qete', 'perseri',
  'forte', 'bukur', 'keq', 'thate', 'lart', 'mire', 'ngadale', 'poshte', 'larg', 'jashte', 'tani',
  'ngrohte', 'ftohte', 'ketu', 'brenda', 'bardhe', 'zi', 'shume', 'tjeter', 'nente', 'shtate',
  'lodhur', 'shendoshe',
])

// shuffle deterministically from a seed so a question's option order is stable
// while it's on screen but scrambled (real answers are never simply first)
const stableSeed = (seedStr) => [...seedStr].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

export function stableShuffle(arr, seedStr) {
  let seed = stableSeed(seedStr)
  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const gcd = (a, b) => {
  while (b) [a, b] = [b, a % b]
  return a
}

// Visit a deterministic permutation without allocating and shuffling an entire
// 2,000-line answer pool merely to take two distractors. A coprime stride walks
// every index exactly once, while callers can stop after they have enough.
const visitStable = (arr, seedStr, visit) => {
  if (!arr.length) return
  const seed = stableSeed(seedStr)
  const start = seed % arr.length
  let stride = arr.length === 1 ? 1 : ((seed >>> 11) % (arr.length - 1)) + 1
  while (gcd(stride, arr.length) !== 1) stride = stride % arr.length + 1
  for (let i = 0; i < arr.length; i++) {
    if (visit(arr[(start + i * stride) % arr.length]) === false) break
  }
}

const lineEnglish = englishReadingOf
const lineAlbanian = albanianTextOf
const isContent = (line) => line.filter((t) => t.id).length >= 2 // >=2 real words
const richness = (line) => line.filter((t) => t.id && !NON_NOUNS.has(t.id)).length // nouns/verbs

// pool of every ending's content lines (English), for plausible distractors — built once
let _answerPool = null
let _answerPoolRevision = -1
const answerPool = () => {
  const revision = englishReadingRevision()
  if (!_answerPool || _answerPoolRevision !== revision) {
    const set = new Set()
    for (const n of Object.values(STORY)) {
      for (const l of n.text.map(lineOf).filter((line) => isContent(line) && isComprehensionReadyLine(line)))
        set.add(lineEnglish(l))
    }
    _answerPool = [...set]
    _answerPoolRevision = revision
  }
  return _answerPool
}

// reverse adjacency: which nodes lead INTO each node (to draw path questions) — built once
let _preds = null
const predsOf = (id) => {
  if (!_preds) {
    _preds = {}
    for (const n of Object.values(STORY))
      for (const o of n.options || []) if (o.to) (_preds[o.to] = _preds[o.to] || []).push(n.id)
  }
  return _preds[id] || []
}

// NEAR-MISS distractors — the test should be genuinely failable without ever
// presenting malformed English as if it were a legitimate reading. Candidates
// are natural readings of other real game lines, preferring the same topic and
// a similar length. (The old word-swap maker could output nonsense such as
// “the mother quickly comes”; it has intentionally been removed.)
const STOPWORDS = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'to', 'in', 'on', 'at', 'and', 'or', 'with', 'for', 'you', 'your', 'it', 'its', 'i', 'my', 'me', 'he', 'she', 'they', 'this', 'that', 'not', 'no'])
const stripPunct = (w) => w.replace(/[.,!?:;]+$/, '')
const contentWords = (s) => s.split(' ').map(stripPunct).filter((w) => w && !STOPWORDS.has(w.toLowerCase()))

let _sentencePoolsRevision = -1
let _sentencePools = new Map()
const sentencePoolsFor = (correct) => {
  const revision = englishReadingRevision()
  if (_sentencePoolsRevision !== revision) {
    _sentencePoolsRevision = revision
    _sentencePools = new Map()
  }
  if (_sentencePools.has(correct)) return _sentencePools.get(correct)
  const wc = correct.split(' ').length
  const cw = new Set(contentWords(correct).map((word) => word.toLowerCase()))
  const pool = answerPool().filter((sentence) => sentence !== correct)
  const topical = pool.filter((sentence) => contentWords(sentence).some((word) => cw.has(word.toLowerCase())))
  const near = pool.filter((sentence) => Math.abs(sentence.split(' ').length - wc) <= 2)
  const result = [
    topical.filter((sentence) => Math.abs(sentence.split(' ').length - wc) <= 4),
    topical,
    near,
    pool,
  ]
  _sentencePools.set(correct, result)
  return result
}

// If a path has fewer than four reviewed whole-line readings, the remaining
// questions assess concrete words the player encountered on that same path.
// This is intentionally safer than asserting that a concatenation of token
// glosses is a valid English sentence. Context-sensitive particles and
// homographs are excluded from isolated-word questions.
const WORD_GRAMMAR_IDS = new Set([
  'ti', 'une', 'ai', 'ajo', 'ata', 'ju', 'ne_we', 'ky', 'kjo', 'kush', 'qe', 'se',
  'ne', 'tek', 'nen', 'mbi', 'nga', 'prej', 'per', 'para', 'pas', 'deri', 'me', 'pa',
  'dhe', 'e_conj', 'por', 'ose', 'as', 'jo', 'nuk', 'mos', 'do_fut', 'te_subj',
  'te_obj', 'e_obj', 'me_obj', 'na_obj', 'ju_obj', 'i_obj', 'i_art', 'e_art',
  'i_link', 'e_link', 'te_link', 'nje', 'im', 'yt', 'tij', 'saj', 'tone', 'yne',
  'tona', 'tuaj', 'juaj', 'tyre', 'vetem', 'ende', 'tani', 'pastaj', 'atje', 'ketu',
  'shume', 'pak', 'disa', 'tjeter', 'dy', 'tre', 'kater', 'pese', 'gjashte',
  'shtate', 'tete', 'nente', 'dhjete', 'dymbedhjete', 'dyzet', 'njeqind',
])

const cleanWordGloss = (value) => String(value || '')
  .replace(/\s+\((?:object|buddy)\)$/i, '')
  .replace(/\s+/g, ' ')
  .trim()

const wordCandidate = (token) => {
  if (!token?.id || token.paren || WORD_GRAMMAR_IDS.has(token.id)) return null
  const albanian = String(token.al || '').trim()
  const correct = cleanWordGloss(token.en)
  if (!albanian || !correct || correct.includes('/') || correct.split(/\s+/).length > 5) return null
  if (albanian.toLocaleLowerCase('sq') === correct.toLocaleLowerCase('en')) return null
  if (/^(?:of|to|in|on|at|from|for|the|a|an)$/i.test(correct)) return null
  if (englishReadingIssues(correct).length) return null
  return {
    albanian,
    correct,
    tokenId: token.id,
    nounLike: Boolean(DICT[token.id]?.forms) || (!NON_NOUNS.has(token.id) && !VERB_IDS.has(token.id)),
  }
}

const unambiguousWordCandidates = (tokens) => {
  const groups = new Map()
  for (const token of tokens) {
    const candidate = wordCandidate(token)
    if (!candidate) continue
    const key = candidate.albanian.toLocaleLowerCase('sq')
    if (!groups.has(key)) groups.set(key, new Map())
    groups.get(key).set(candidate.correct.toLocaleLowerCase('en'), candidate)
  }
  return [...groups.values()].filter((readings) => readings.size === 1).map((readings) => [...readings.values()][0])
}

let _wordAnswerPool = null
let _storySurfaceMeanings = null
const storySurfaceMeanings = () => {
  if (!_storySurfaceMeanings) {
    _storySurfaceMeanings = new Map()
    for (const node of Object.values(STORY)) {
      for (const entry of node.text) {
        for (const token of lineOf(entry)) {
          if (!token?.id || !token.al || !token.en) continue
          const surface = token.al.toLocaleLowerCase('sq')
          if (!_storySurfaceMeanings.has(surface)) _storySurfaceMeanings.set(surface, new Set())
          _storySurfaceMeanings.get(surface).add(cleanWordGloss(token.en).toLocaleLowerCase('en'))
        }
      }
    }
  }
  return _storySurfaceMeanings
}

const wordAnswerPool = () => {
  if (!_wordAnswerPool) {
    const tokens = Object.values(STORY).flatMap((node) => node.text.flatMap((entry) => lineOf(entry)))
    for (const [id, entry] of Object.entries(DICT)) tokens.push({ id, al: entry.al, en: entry.en })
    _wordAnswerPool = unambiguousWordCandidates(tokens)
  }
  return _wordAnswerPool
}

const wordQuestionsFromLines = (orderedLines, seedKey, count, usedAlbanian = new Set()) => {
  if (count <= 0) return []
  const globalPool = wordAnswerPool()
  const globallyUnambiguous = new Set(
    [...storySurfaceMeanings()].filter(([, meanings]) => meanings.size === 1).map(([surface]) => surface),
  )
  const encountered = unambiguousWordCandidates(orderedLines.flat())
    .filter((candidate) => globallyUnambiguous.has(candidate.albanian.toLocaleLowerCase('sq')))
    .filter((candidate) => !usedAlbanian.has(candidate.albanian.toLocaleLowerCase('sq')))
  const choices = stableShuffle(encountered, `${seedKey}:words`).slice(0, count)
  return choices.map((candidate, index) => {
    const localDistractors = encountered.filter((other) =>
      other.correct !== candidate.correct && other.tokenId !== candidate.tokenId && other.nounLike === candidate.nounLike)
    const sameLength = globalPool.filter((other) =>
      other.correct !== candidate.correct
      && other.tokenId !== candidate.tokenId
      && other.nounLike === candidate.nounLike
      && other.correct.split(/\s+/).length === candidate.correct.split(/\s+/).length)
    const distractors = []
    for (const pool of [localDistractors, sameLength, globalPool]) {
      visitStable(pool, `${seedKey}:word:${candidate.albanian}:${index}`, (other) => {
        if (other.correct !== candidate.correct && other.tokenId !== candidate.tokenId && !distractors.includes(other.correct)) distractors.push(other.correct)
        return distractors.length < 2
      })
      if (distractors.length >= 2) break
    }
    if (distractors.length < 2) return null
    return {
      kind: 'word',
      senseId: candidate.tokenId,
      prompt: 'What does this Albanian word mean here?',
      albanian: candidate.albanian,
      correct: candidate.correct,
      options: stableShuffle([candidate.correct, ...distractors], `${seedKey}:word-options:${index}`),
    }
  }).filter(Boolean)
}

// Turn an ORDERED list of story lines (most substantial first) into `count`
// comprehension questions with near-miss distractors. `seedKey` carries the
// attempt number, so a retake draws a different hand: the question lines are
// picked by shuffling a window of the best candidates, not by taking the top
// slice — memorising one attempt's answers doesn't pass the next.
function comprehensionFromLines(orderedLines, seedKey, count = 3) {
  const seen = new Set()
  const candidates = []
  for (const l of orderedLines) {
    if (candidates.length >= count + 4) break
    if (!isContent(l) || !isComprehensionReadyLine(l)) continue
    const k = lineAlbanian(l)
    if (seen.has(k) || !k) continue
    seen.add(k)
    candidates.push(l)
  }
  const chosen = stableShuffle(candidates, seedKey).slice(0, count)
  const qs = chosen
    .map((line, i) => {
      const correct = lineEnglish(line)
      const distractors = []
      // Same-topic lines first (shared content vocabulary), then near-length
      // real readings. Both are grammatically independent sentences.
      for (const src of sentencePoolsFor(correct)) {
        if (distractors.length >= 2) break
        visitStable(src, seedKey + correct + i, (s) => {
          if (s !== correct && !distractors.includes(s)) distractors.push(s)
          return distractors.length < 2
        })
      }
      if (distractors.length < 2) return null
      return {
        kind: 'sentence',
        prompt: 'Which English reading matches this Albanian sentence?',
        albanian: lineAlbanian(line),
        correct,
        options: stableShuffle([correct, ...distractors], seedKey + i),
      }
    })
    .filter(Boolean)
  const usedAlbanian = new Set(qs.map((question) => question.albanian.toLocaleLowerCase('sq')))
  qs.push(...wordQuestionsFromLines(orderedLines, seedKey, count - qs.length, usedAlbanian))
  return qs.length === count ? qs : null
}

// the test for an ENDING achievement. THE JOURNEY IS THE TEST: questions come
// from the path that led here (up to three hops back), not from the ending
// text — which stays HIDDEN until the test is passed, so understanding can't
// be cribbed off the page.
function endingComprehension(nodeId, attempt) {
  const node = STORY[nodeId]
  if (!node) return null
  const ordered = []
  const visited = new Set([nodeId])
  let frontier = [nodeId]
  for (let hop = 0; hop < 3; hop++) {
    const next = []
    for (const id of frontier) {
      for (const pid of predsOf(id)) {
        if (visited.has(pid)) continue
        visited.add(pid)
        next.push(pid)
        for (const l of STORY[pid].text.map(lineOf).sort((a, b) => richness(b) - richness(a))) ordered.push(l)
      }
    }
    frontier = next
  }
  // The ending remains hidden until this gate is passed. Never draw from its
  // own text: even an isolated-word question must come from earlier scenes,
  // not reveal the outcome the player is trying to unlock.
  return comprehensionFromLines(ordered, nodeId + ':a' + attempt, 4)
}

// the test for an AREA achievement: drawn from the region's key scenes (quizNodes).
function areaComprehension(ach, attempt) {
  const lines = []
  for (const id of ach.quizNodes || []) {
    if (STORY[id]) for (const l of STORY[id].text.map(lineOf)) lines.push(l)
  }
  lines.sort((a, b) => richness(b) - richness(a))
  return comprehensionFromLines(lines, ach.id + ':a' + attempt, 4)
}

// the gate for any achievement, salted by how many attempts have failed before
export const testFor = (ach, attempt = 0) =>
  ach.kind === 'area' ? areaComprehension(ach, attempt) : endingComprehension(ach.id, attempt)
