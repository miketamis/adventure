import { STORY, lineOf } from './content.js'

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
export function stableShuffle(arr, seedStr) {
  let seed = [...seedStr].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
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

const lineEnglish = (line) =>
  line.filter((t) => t.id && !t.paren).map((t) => t.en).join(' ').replace(/\s+([.!?:,;])/g, '$1').trim()
const lineAlbanian = (line) =>
  line.map((t) => (t.paren ? t.en : t.al)).join(' ').replace(/\s+([.!?:,;])/g, '$1').trim()
const isContent = (line) => line.filter((t) => t.id).length >= 2 // >=2 real words
const richness = (line) => line.filter((t) => t.id && !NON_NOUNS.has(t.id)).length // nouns/verbs

// pool of every ending's content lines (English), for plausible distractors — built once
let _answerPool = null
const answerPool = () => {
  if (!_answerPool) {
    const set = new Set()
    for (const n of Object.values(STORY)) {
      if (!n.end) continue
      for (const l of n.text.map(lineOf).filter(isContent)) set.add(lineEnglish(l))
    }
    _answerPool = [...set]
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

// NEAR-MISS distractors — the test should be genuinely failable. Two makers:
// (1) SWAP two content words of the correct answer ("the wolf eats the man" →
//     "the man eats the wolf") — grammatical, plausible, and only real
//     comprehension of the Albanian word order tells them apart;
// (2) a TOPICAL pool line that shares a content word with the answer, so the
//     odd option can't be eliminated by topic alone.
const STOPWORDS = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'to', 'in', 'on', 'at', 'and', 'or', 'with', 'for', 'you', 'your', 'it', 'its', 'i', 'my', 'me', 'he', 'she', 'they', 'this', 'that', 'not', 'no'])
const stripPunct = (w) => w.replace(/[.,!?:;]+$/, '')
const contentWords = (s) => s.split(' ').map(stripPunct).filter((w) => w && !STOPWORDS.has(w.toLowerCase()))
function swapWordsDistractor(correct, seed) {
  const toks = correct.split(' ')
  const idx = []
  for (let i = 0; i < toks.length; i++) {
    const w = stripPunct(toks[i])
    if (w && !STOPWORDS.has(w.toLowerCase())) idx.push(i)
  }
  const pairs = []
  for (let a = 0; a < idx.length; a++)
    for (let b = a + 1; b < idx.length; b++)
      if (stripPunct(toks[idx[a]]).toLowerCase() !== stripPunct(toks[idx[b]]).toLowerCase()) pairs.push([idx[a], idx[b]])
  if (!pairs.length) return null
  const [i1, i2] = stableShuffle(pairs, seed)[0]
  const tail = (w) => (w.match(/[.,!?:;]+$/) || [''])[0]
  const out = [...toks]
  const w1 = stripPunct(out[i1])
  const w2 = stripPunct(out[i2])
  out[i1] = w2 + tail(toks[i1])
  out[i2] = w1 + tail(toks[i2])
  const swapped = out.join(' ')
  return swapped === correct ? null : swapped
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
    if (!isContent(l)) continue
    const k = lineAlbanian(l)
    if (seen.has(k) || !k) continue
    seen.add(k)
    candidates.push(l)
  }
  if (!candidates.length) return null
  const chosen = stableShuffle(candidates, seedKey).slice(0, count)
  const pool = answerPool()
  const qs = chosen
    .map((line, i) => {
      const correct = lineEnglish(line)
      const wc = correct.split(' ').length
      const cw = new Set(contentWords(correct).map((w) => w.toLowerCase()))
      const distractors = []
      // 1: the word-order flip of the answer itself
      const swapped = swapWordsDistractor(correct, seedKey + correct + i)
      if (swapped) distractors.push(swapped)
      // 2: a same-topic line (shares a content word), else a near-length line
      const p = pool.filter((s) => s !== correct && !distractors.includes(s))
      const topical = p.filter((s) => contentWords(s).some((w) => cw.has(w.toLowerCase())))
      const near = p.filter((s) => Math.abs(s.split(' ').length - wc) <= 2)
      for (const src of [topical, near, p]) {
        if (distractors.length >= 2) break
        for (const s of stableShuffle(src, seedKey + correct + i)) {
          if (distractors.length >= 2) break
          if (s !== correct && !distractors.includes(s)) distractors.push(s)
        }
      }
      if (distractors.length < 2) return null
      return { albanian: lineAlbanian(line), correct, options: stableShuffle([correct, ...distractors], seedKey + i) }
    })
    .filter(Boolean)
  return qs.length ? qs : null
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
  // fallback for endings with a thin path: the ending's own lines
  for (const l of node.text.map(lineOf).sort((a, b) => richness(b) - richness(a))) ordered.push(l)
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
