// QUOTE PROOF CHECK — verifies the story's folk-quote lines against the quote
// register (src/game/quotes.js) and the locally held source material in
// docs/references/. The checker deliberately distinguishes exact evidence,
// related variants, external citations, and oral attribution.
//
//   Run:    node scripts/quotecheck.mjs            (verify; exit 1 on failure)
//   Ledger: node scripts/quotecheck.mjs --report   (also rewrite docs/quote-proofs.md)
//
// What is checked, per Q() line in the story:
//   1. its quoteId resolves in QUOTES (content.js already throws otherwise —
//      re-checked here so the script stands alone)
//   2. the line's Albanian really contains the register's `game` wording, so
//      the register can't drift away from the story it documents
// and per register entry:
//   3. every entry is used by at least one story line (no stale proofs)
//   4. every local evidence file is bound to its declared work, and exact
//      corpus evidence agrees with the quote's declared CORPUS source
//   5. every corpus evidence `match` is found in its local file and is
//      materially related to the registered wording (not an arbitrary hit)
//   6. adapted wording is completely covered by explicit game/source
//      alignments whose source fragments occur in the quote's proof files
//   7. the English for the displayed quote is complete, standalone, and kept
//      separate from the fuller source-context translation
//   8. a stable review seal binds every quote, alignment, and work record
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, sep } from 'node:path'
import { STORY, DICT } from '../src/game/content.js'
import {
  QUOTES,
  QUOTE_EVIDENCE_WORKS,
  QUOTE_FIDELITY_REVIEW_HASH,
  quoteTier,
} from '../src/game/quotes.js'
import { CORPUS, REPO_BLOB } from '../src/game/folklore.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const REPORT = process.argv.includes('--report')
const VALID_FIDELITIES = new Set(['verbatim', 'inflected', 'adapted'])
const VALID_RELATIONSHIPS = new Set([
  'full-work',
  'page-checked-extract',
  'page-checked-reproduction',
  'official-page-extract',
  'page-extract',
  'variant-extract',
  'variant-page-extract',
])

const gameTranslationIssues = (value) => {
  const text = typeof value === 'string' ? value : ''
  const issues = []
  if (!text.trim()) return ['is missing']
  if (text !== text.trim()) issues.push('has outer whitespace')
  if (/\r|\n/.test(text)) issues.push('must stay on one line')
  const firstCased = text.match(/[A-Za-z]/)?.[0]
  if (firstCased && firstCased !== firstCased.toUpperCase()) issues.push('does not begin with a capitalized English word')
  if (!/[.!?…][”"']?$/.test(text)) issues.push('has no terminal punctuation')
  if (/[,;:][”"']?$/.test(text)) issues.push('ends as a dangling source fragment')
  if (/[()[\]]/.test(text)) issues.push('contains editorial parenthetical/bracket context')
  if (/\s{2,}/.test(text)) issues.push('contains repeated whitespace')
  return issues
}

// ── the Albanian surface of a token line, as the player sees it ─────────────
const albanianOf = (line) =>
  line
    .map((t) => t.al ?? (t.id ? DICT[t.id]?.al : t.en) ?? '')
    .join(' ')

// Loose-but-honest normalization for containment checks: case and punctuation
// (and the apostrophe variants ’ vs ') are display concerns; letters are not.
const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,:;!?…"„“«»()\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const tokensOf = (s) => normalize(s).split(' ').filter(Boolean)
const comparisonTokensOf = (s) =>
  tokensOf(s).map((token) => token.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))

const containsTokenRun = (haystack, needle) => {
  const hay = Array.isArray(haystack) ? haystack : tokensOf(haystack)
  const need = Array.isArray(needle) ? needle : tokensOf(needle)
  if (!need.length || need.length > hay.length) return false
  return hay.some((_, start) => need.every((token, offset) => hay[start + offset] === token))
}

const longestCommonSubsequence = (a, b) => {
  let previous = new Array(b.length + 1).fill(0)
  for (const left of a) {
    const next = [0]
    for (let j = 1; j <= b.length; j++)
      next[j] = left === b[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], next[j - 1])
    previous = next
  }
  return previous[b.length]
}

const longestCommonRun = (a, b) => {
  let best = 0
  let previous = new Array(b.length + 1).fill(0)
  for (const left of a) {
    const next = new Array(b.length + 1).fill(0)
    for (let j = 1; j <= b.length; j++) {
      if (left === b[j - 1]) next[j] = previous[j - 1] + 1
      best = Math.max(best, next[j])
    }
    previous = next
  }
  return best
}

// An evidence excerpt may include OCR noise or surrounding words, but it must
// share both order and a multi-word run with the quote/original. This prevents
// a coincidental one-word hit elsewhere in the correct book from passing.
const materiallyRelated = (evidence, candidates) => {
  const ev = comparisonTokensOf(evidence)
  if (!ev.length) return false
  return candidates.some((candidate) => {
    const claim = comparisonTokensOf(candidate)
    if (containsTokenRun(claim, ev) || containsTokenRun(ev, claim)) return true
    const ordered = longestCommonSubsequence(ev, claim)
    const required = ev.length <= 2 ? ev.length : Math.max(3, Math.ceil(ev.length * 0.55))
    return ordered >= required && longestCommonRun(ev, claim) >= Math.min(2, ev.length)
  })
}

const stableValue = (value) => {
  if (Array.isArray(value)) return value.map(stableValue)
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]))
  return value
}

const reviewedCorpusIds = new Set(
  Object.values(QUOTE_EVIDENCE_WORKS).flatMap((work) => (work.corpusId ? [work.corpusId] : [])),
)
const reviewedCorpusWorks = CORPUS.filter((work) => reviewedCorpusIds.has(work.id)).sort((a, b) =>
  a.id.localeCompare(b.id),
)
const REVIEW_HASH =
  'sha256:' +
  createHash('sha256')
    .update(
      JSON.stringify(
        stableValue({ corpusWorks: reviewedCorpusWorks, evidenceWorks: QUOTE_EVIDENCE_WORKS, quotes: QUOTES }),
      ),
    )
    .digest('hex')

const safeProofPath = (file) => {
  if (typeof file !== 'string' || !file.startsWith('docs/references/') || file.includes('\\')) return null
  const referencesRoot = resolve(ROOT, 'docs/references')
  const path = resolve(ROOT, file)
  return path.startsWith(referencesRoot + sep) ? path : null
}

// Whitespace-collapse only (keeps case + punctuation) — for matching a proof
// string against an OCR'd source file where line breaks fall anywhere.
const squash = (s) => s.replace(/\s+/g, ' ')

// 1-indexed line number where the (squashed) needle starts inside the raw file.
// Built on a squashed-copy-with-index-map so whitespace runs of any length map
// back to the exact raw position of the match's first real character.
const squashCache = new Map()
const findInFile = (raw, needle) => {
  let entry = squashCache.get(raw)
  if (!entry) {
    let sq = ''
    const map = []
    let inWs = false
    for (let i = 0; i < raw.length; i++) {
      if (/\s/.test(raw[i])) {
        if (!inWs) {
          sq += ' '
          map.push(i)
        }
        inWs = true
      } else {
        sq += raw[i]
        map.push(i)
        inWs = false
      }
    }
    entry = { sq, map }
    squashCache.set(raw, entry)
  }
  const target = squash(needle).trim()
  const isWord = (character) => !!character && /[\p{L}\p{N}]/u.test(character)
  let idx = entry.sq.indexOf(target)
  while (idx !== -1) {
    const startsInsideWord = isWord(target[0]) && isWord(entry.sq[idx - 1])
    const endsInsideWord = isWord(target.at(-1)) && isWord(entry.sq[idx + target.length])
    if (!startsInsideWord && !endsInsideWord) break
    idx = entry.sq.indexOf(target, idx + 1)
  }
  if (idx === -1) return null
  let pos = entry.map[idx]
  while (pos < raw.length && /\s/.test(raw[pos])) pos++ // step past a leading collapsed space
  return raw.slice(0, pos).split('\n').length
}

// ── collect every Q() line in the story ─────────────────────────────────────
const sites = [] // { nodeId, quoteId, quoteGame, quoteGameTranslation, quoteSourceTranslation, albanian }
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const entry of node.text || []) {
    const line = Array.isArray(entry) ? entry : entry.line
    if (line?.quoteId)
      sites.push({
        nodeId,
        quoteId: line.quoteId,
        quoteGame: line.quoteGame,
        quoteGameTranslation: line.quoteGameTranslation,
        quoteSourceTranslation: line.quoteSourceTranslation,
        albanian: albanianOf(line),
      })
  }
}

const fails = []

// Guard the two matching properties most likely to be weakened accidentally:
// whole-token story matching and rejection of an unrelated source passage.
if (containsTokenRun('një foobar këtu', 'foo')) fails.push('internal matcher accepted a partial-word story hit')
if (materiallyRelated('an entirely unrelated passage', ['bukë e kripë e zemër']))
  fails.push('internal matcher accepted an unrelated evidence passage')
if (!materiallyRelated('Per baba Tomor', ['Për Baba Tomor']))
  fails.push('internal matcher rejected an orthographic-diacritic source variant')

// story line ↔ register consistency
for (const s of sites) {
  const q = QUOTES[s.quoteId]
  if (!q) {
    fails.push(`node ${s.nodeId}: Q('${s.quoteId}') has no register entry`)
    continue
  }
  if (s.quoteGame !== q.game)
    fails.push(`node ${s.nodeId}: Q('${s.quoteId}') metadata is not the exact registered game string`)
  if (s.quoteGameTranslation !== q.gameTranslation)
    fails.push(`node ${s.nodeId}: Q('${s.quoteId}') displayed-line translation drifted from its register entry`)
  if (s.quoteSourceTranslation !== q.translation)
    fails.push(`node ${s.nodeId}: Q('${s.quoteId}') source-context translation drifted from its register entry`)
  if (!containsTokenRun(s.albanian, q.game))
    fails.push(
      `node ${s.nodeId}: story line does not contain the complete registered token sequence for '${s.quoteId}'\n` +
        `    line:       ${s.albanian}\n    registered: ${q.game}`,
    )
}

// register completeness + evidence sanity
const used = new Set(sites.map((s) => s.quoteId))
const corpusById = new Map(CORPUS.map((c) => [c.id, c]))
const fileCache = new Map()
const usedEvidenceFiles = new Set()
const proofs = {} // quoteId -> [{file, line, match, work} | {url,label} | {oral}]
const alignmentProofs = {} // quoteId -> [[{file, line}], ...]

// Validate the evidence-file registry before trusting any quote that uses it.
for (const [file, work] of Object.entries(QUOTE_EVIDENCE_WORKS)) {
  const path = safeProofPath(file)
  if (!path) fails.push(`evidence-work entry has unsafe or out-of-scope path: ${file}`)
  else {
    try {
      const bytes = readFileSync(path)
      const raw = bytes.toString('utf8')
      fileCache.set(path, raw)
      const digest = createHash('sha256').update(bytes).digest('hex')
      if (!/^[a-f0-9]{64}$/.test(work?.proofSha256 || ''))
        fails.push(`evidence-work '${file}' is missing a valid proofSha256 content pin`)
      else if (digest !== work.proofSha256)
        fails.push(`evidence-work '${file}' content changed (expected ${work.proofSha256}, found ${digest})`)
    } catch {
      fails.push(`evidence-work entry points to a missing file: ${file}`)
    }
  }
  if (!work?.id || typeof work.id !== 'string') fails.push(`evidence-work '${file}' is missing its stable work id`)
  if (!VALID_RELATIONSHIPS.has(work?.relationship))
    fails.push(`evidence-work '${file}' has invalid relationship '${work?.relationship}'`)
  if (work?.url && !/^https?:\/\//.test(work.url)) fails.push(`evidence-work '${file}' has an invalid source URL`)

  if (work?.corpusId) {
    const corpus = corpusById.get(work.corpusId)
    if (!corpus) fails.push(`evidence-work '${file}' names unknown CORPUS source '${work.corpusId}'`)
    if (work.id !== work.corpusId)
      fails.push(`evidence-work '${file}' id '${work.id}' must equal its CORPUS id '${work.corpusId}'`)
    if (work.relationship === 'full-work' && corpus?.local !== file)
      fails.push(`evidence-work '${file}' claims full-work but CORPUS '${work.corpusId}' declares local '${corpus?.local}'`)
  } else {
    if (!work?.title || typeof work.title !== 'string') fails.push(`stand-alone evidence-work '${file}' is missing its title`)
    if (!/^https?:\/\//.test(work?.url || '')) fails.push(`stand-alone evidence-work '${file}' is missing its public source URL`)
    if (work?.relationship === 'full-work') fails.push(`stand-alone evidence-work '${file}' cannot claim the CORPUS-only full-work relationship`)
  }
}

for (const [id, q] of Object.entries(QUOTES)) {
  if (!used.has(id)) fails.push(`register entry '${id}' is not used by any story line`)
  if (!q.label || !q.game || !q.gameTranslation || !q.original || !q.translation || !q.fidelity)
    fails.push(`register entry '${id}' is missing a required field`)
  for (const issue of gameTranslationIssues(q.gameTranslation))
    fails.push(`register entry '${id}' gameTranslation ${issue}: ${JSON.stringify(q.gameTranslation)}`)
  if (!VALID_FIDELITIES.has(q.fidelity))
    fails.push(`register entry '${id}' has invalid fidelity '${q.fidelity}'`)
  if (q.source && !corpusById.has(q.source))
    fails.push(`register entry '${id}': source '${q.source}' is not a CORPUS id`)
  const transformationNotes = [q.note, ...(q.evidence || []).map((e) => e.note)].filter(
    (note) => typeof note === 'string' && note.trim().length >= 12,
  )
  if (q.fidelity === 'inflected' && !transformationNotes.length)
    fails.push(`'${id}': inflected wording needs a note explaining the transformation`)
  if (
    q.fidelity === 'verbatim' &&
    !containsTokenRun(q.original, q.game) &&
    !containsTokenRun(q.game, q.original) &&
    !transformationNotes.length
  )
    fails.push(`'${id}': verbatim wording differs from the displayed original without an orthography/selection note`)
  if (q.fidelity !== 'adapted' && q.alignment)
    fails.push(`'${id}': only adapted wording may carry an alignment table`)
  if (q.fidelity === 'adapted') {
    if (!Array.isArray(q.alignment) || !q.alignment.length) {
      fails.push(`'${id}': adapted wording needs a non-empty alignment table`)
    } else {
      const alignedGame = q.alignment.flatMap((part) => tokensOf(part?.game || ''))
      const game = tokensOf(q.game)
      if (alignedGame.length !== game.length || alignedGame.some((token, index) => token !== game[index]))
        fails.push(`'${id}': adapted alignment does not cover the complete game wording in order`)
      q.alignment.forEach((part, index) => {
        if (!part?.game || !part?.source)
          fails.push(`'${id}': alignment ${index + 1} is missing game or source wording`)
        if (typeof part?.relation !== 'string' || part.relation.trim().length < 12)
          fails.push(`'${id}': alignment ${index + 1} needs a specific transformation note`)
      })
    }
  }
  if (!q.evidence?.length) {
    fails.push(`register entry '${id}' has no evidence at all`)
    continue
  }
  proofs[id] = []
  for (const ev of q.evidence) {
    if (ev.kind === 'corpus') {
      const path = safeProofPath(ev.file)
      const work = QUOTE_EVIDENCE_WORKS[ev.file]
      usedEvidenceFiles.add(ev.file)
      if (!path) {
        fails.push(`'${id}': unsafe or out-of-scope corpus file: ${ev.file}`)
        continue
      }
      if (!work) fails.push(`'${id}': corpus file has no declared evidence-work binding: ${ev.file}`)
      else if (work.corpusId) {
        // A related variant can corroborate an oral/web wording without
        // pretending the book is the source of that exact wording.
        if (!ev.variant && q.source !== work.corpusId)
          fails.push(`'${id}': exact proof file belongs to '${work.corpusId}', but quote source is '${q.source}'`)
        if (ev.variant && q.source && q.source !== work.corpusId)
          fails.push(`'${id}': variant proof file belongs to '${work.corpusId}', conflicting with quote source '${q.source}'`)
      } else if (q.source) {
        fails.push(`'${id}': stand-alone proof file '${ev.file}' cannot substantiate declared CORPUS source '${q.source}'`)
      }
      let raw
      try {
        raw = fileCache.get(path) ?? readFileSync(path, 'utf8')
        fileCache.set(path, raw)
      } catch {
        fails.push(`'${id}': corpus file not found: ${ev.file}`)
        continue
      }
      if (!ev.match || typeof ev.match !== 'string') {
        fails.push(`'${id}': corpus evidence in ${ev.file} has no match string`)
        continue
      }
      const line = findInFile(raw, ev.match)
      if (line == null) fails.push(`'${id}': proof string NOT FOUND in ${ev.file}:\n    "${ev.match}"`)
      else {
        const candidates =
          q.fidelity === 'adapted' ? (q.alignment || []).map((part) => part.source) : [q.original, q.game]
        if (!materiallyRelated(ev.match, candidates))
          fails.push(`'${id}': proof string is present but not materially related to the claimed wording: ${ev.file}:${line}`)
        proofs[id].push({
          kind: 'corpus', file: ev.file, line, match: ev.match, variant: !!ev.variant, note: ev.note, work,
        })
      }
    } else if (ev.kind === 'url') {
      if (!/^https?:\/\//.test(ev.url || '')) fails.push(`'${id}': url evidence without a valid url`)
      else {
        if (!ev.label) fails.push(`'${id}': url evidence needs a source label`)
        if (ev.quote && !materiallyRelated(ev.quote, [q.original, q.game]))
          fails.push(`'${id}': quoted external excerpt is not materially related to the registered wording`)
        proofs[id].push({ kind: 'url', url: ev.url, label: ev.label, quote: ev.quote, note: ev.note })
      }
    } else if (ev.kind === 'oral') {
      if (!ev.note) fails.push(`'${id}': oral evidence must carry a note explaining the attestation`)
      else proofs[id].push({ kind: 'oral', note: ev.note })
    } else {
      fails.push(`'${id}': unknown evidence kind '${ev.kind}'`)
    }
  }

  if (q.source && !(proofs[id] || []).some((proof) => proof.kind === 'corpus' && proof.work?.corpusId === q.source))
    fails.push(`'${id}': declared CORPUS source '${q.source}' has no local evidence file bound to it`)

  if (q.fidelity === 'adapted' && Array.isArray(q.alignment)) {
    const corpusProofs = (proofs[id] || []).filter((proof) => proof.kind === 'corpus')
    const quotedExternalProofs = (proofs[id] || []).filter(
      (proof) => proof.kind === 'url' && typeof proof.quote === 'string' && proof.quote.trim(),
    )
    alignmentProofs[id] = []
    q.alignment.forEach((part, index) => {
      const localHits = corpusProofs.flatMap((proof) => {
        const path = safeProofPath(proof.file)
        const raw = path ? fileCache.get(path) : null
        const line = raw == null ? null : findInFile(raw, part.source)
        return line == null ? [] : [{ file: proof.file, line }]
      })
      const externalHits = quotedExternalProofs
        .filter((proof) => containsTokenRun(proof.quote, part.source))
        .map((proof) => ({ url: proof.url, label: proof.label }))
      const hits = [...localHits, ...externalHits]
      if (!hits.length)
        fails.push(`'${id}': alignment ${index + 1} source fragment NOT FOUND in a local proof or quoted external excerpt:\n    "${part.source}"`)
      alignmentProofs[id][index] = hits
    })
  }
}

// Regression fixtures for source-context leakage that previously reached the
// reading and comprehension layers. These exact short readings intentionally
// exclude omitted speakers, vocatives, legends, places, and later clauses.
const GAME_TRANSLATION_FIXTURES = {
  'formula e mbylljes (Dozon, 1879)': 'They grew old and had heirs.',
  'Ymer Aga — këngë popullore': 'Welcome, Aga Ymer!',
  'Legjenda e Prespës — lakeohrid.blogspot.com': 'If they married, a very great misfortune would happen.',
  'prespa-mbytja': 'It drowned the whole city, creating a lake.',
  'ali-bajr-besnik': 'For you have proved faithful.',
  'Deka e Halilit — këngë kreshnike': 'Turn back, Halil—may God strike you dead!',
  'Kostandini e Doruntina — legjendë': 'Where is the besa you gave me?',
  'doruntina-era': 'Why do I smell earth on you?',
  'doruntina-nuk-je-ti': 'You are not my daughter.',
  'Gjergj Elez Alia — këngë kreshnike': 'Your sister’s tears are falling on you!',
  'Vajtimi i Ajkunës — këngë kreshnike': 'The mountain birds have ceased their song.',
  'zuku-besa-zotit': 'The boy had given them his word before God.',
  'Pralla popullore shqiptare (1954)': 'Maro Përhitura comes dressed in gold.',
  'pralla-maro-tjerr': 'What is that you are spinning?',
  'porosia e tetos — Pralla popullore shqiptare (1954)': 'When midnight strikes, the horses become mice and the coach becomes a pumpkin.',
}
for (const [id, expected] of Object.entries(GAME_TRANSLATION_FIXTURES))
  if (QUOTES[id]?.gameTranslation !== expected)
    fails.push(`regression fixture '${id}' must keep displayed-line translation ${JSON.stringify(expected)}`)


for (const file of Object.keys(QUOTE_EVIDENCE_WORKS))
  if (!usedEvidenceFiles.has(file)) fails.push(`evidence-work '${file}' is not used by any quote record`)

if (QUOTE_FIDELITY_REVIEW_HASH !== REVIEW_HASH)
  fails.push(
    `quote/work review seal mismatch\n` +
      `    recorded: ${QUOTE_FIDELITY_REVIEW_HASH}\n` +
      `    current:  ${REVIEW_HASH}\n` +
      `    review the changed records, then update QUOTE_FIDELITY_REVIEW_HASH`,
  )

// ── report ───────────────────────────────────────────────────────────────────
const tierOf = (id) => quoteTier(QUOTES[id])
const tally = {}
for (const id of Object.keys(QUOTES)) tally[tierOf(id)] = (tally[tierOf(id)] || 0) + 1

console.log(`quote lines in story: ${sites.length}  (distinct quotes: ${used.size}, register entries: ${Object.keys(QUOTES).length})`)
console.log(`proof tiers: ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(' · ')}`)
for (const [id] of Object.entries(QUOTES)) {
  const p = (proofs[id] || []).find((e) => e.kind === 'corpus')
  const mark = { corpus: '✓', variant: '≈', external: '↗', oral: '~' }[tierOf(id)]
  console.log(
    `  ${mark} ${id}` + (p ? ` — ${p.file.replace('docs/references/', '')}:${p.line}${p.variant ? ' (related variant)' : ''}` : ''),
  )
}
if (fails.length) {
  console.error('\nFAILURES:\n' + fails.map((f) => '  ✗ ' + f).join('\n'))
  process.exit(1)
}
console.log(`review seal: ${REVIEW_HASH}`)
console.log('\nall quote register links, work bindings, and recorded transformations valid ✓')

// ── the human-readable ledger ────────────────────────────────────────────────
if (REPORT) {
  const nodesOf = (id) => sites.filter((s) => s.quoteId === id).map((s) => s.nodeId)
  const TIER_TEXT = {
    corpus: '**✓ local-source checked** — the cited excerpt is present in the locally held work; fidelity and any adaptation are recorded below',
    variant: '**≈ related variant checked** — the local work attests a related formula, not the exact game wording',
    external: '**↗ externally cited** — a source URL is recorded, but its wording is not machine-checked by this local audit',
    oral: '**~ oral attribution** — no local written witness has been identified; this is the weakest evidence tier',
  }
  const lines = []
  lines.push('# Quote proofs — the folk-quote ledger')
  lines.push('')
  lines.push('<!-- GENERATED by `node scripts/quotecheck.mjs --report` — do not edit by hand. -->')
  lines.push('')
  lines.push('Every `Q()` line in the story — wording visually presented as source-rooted folk material — is registered in [`src/game/quotes.js`](../src/game/quotes.js)')
  lines.push('and checked by [`scripts/quotecheck.mjs`](../scripts/quotecheck.mjs). The audit verifies byte-pinned local excerpts, work identity, wording relevance, and complete adaptation alignment; it does not pretend that a related variant proves exact wording. External and oral tiers remain explicit qualifications. This ledger is the')
  lines.push('generated, human-readable form of that register: what the game says, what the')
  lines.push('source says, and where to check it.')
  lines.push('')
  const counts = Object.entries(tally).map(([k, v]) => `${v} ${k}`).join(' · ')
  lines.push(`**${sites.length} quoted lines** (${used.size} distinct quotes): ${counts}.`)
  lines.push(`**Evidence register seal:** \`${REVIEW_HASH}\``)
  lines.push('')
  for (const [id, q] of Object.entries(QUOTES)) {
    lines.push(`## \`${id}\` — ${q.label}`)
    lines.push('')
    lines.push(`> **${q.game}**`)
    lines.push('')
    lines.push(`- **Displayed-line translation:** ${q.gameTranslation}`)
    lines.push(`- **Registered source wording/context:** ${q.original}`)
    lines.push(`- **Source wording/context translation:** ${q.translation}`)
    lines.push(`- **Fidelity:** ${q.fidelity}`)
    lines.push(`- **Proof:** ${TIER_TEXT[tierOf(id)]}`)
    if (q.note) lines.push(`- **Review note:** ${q.note}`)
    if (q.alignment?.length) {
      lines.push('- **Adaptation alignment:**')
      q.alignment.forEach((part, index) => {
        const hit = alignmentProofs[id]?.[index]?.[0]
        const location = hit?.file
          ? ` ([source line ${hit.line}](${REPO_BLOB}${hit.file}#L${hit.line}))`
          : hit?.url
            ? ` ([recorded external excerpt](${hit.url}))`
            : ''
        lines.push(`  - game \`${part.game}\` ← source \`${squash(part.source)}\`${location} — ${part.relation}`)
      })
    }
    for (const p of proofs[id] || []) {
      if (p.kind === 'corpus') {
        const corpusWork = p.work?.corpusId ? corpusById.get(p.work.corpusId) : null
        const workName = corpusWork?.title || p.work?.title || p.work?.id || 'UNBOUND WORK'
        const workUrl = p.work?.url || corpusWork?.online?.[0]?.url
        const workLabel = workUrl ? `[${workName}](${workUrl})` : `**${workName}**`
        lines.push(
          `  - [\`${p.file}\`](${REPO_BLOB}${p.file}#L${p.line}) line ${p.line}${p.variant ? ' *(related variant)*' : ''}; work: ${workLabel} (${p.work?.relationship || 'unbound'}): \`${squash(p.match)}\`` +
            (p.note ? ` — ${p.note}` : ''),
        )
      }
      if (p.kind === 'url') lines.push(`  - [${p.label}](${p.url})` + (p.quote ? `: “${p.quote}”` : '') + (p.note ? ` — ${p.note}` : ''))
      if (p.kind === 'oral') lines.push(`  - *oral:* ${p.note}`)
    }
    const where = nodesOf(id)
    lines.push(`- **Story node${where.length > 1 ? 's' : ''}:** ${where.map((n) => `\`${n}\``).join(', ')}`)
    lines.push('')
  }
  const out = join(ROOT, 'docs/quote-proofs.md')
  writeFileSync(out, lines.join('\n'))
  console.log(`ledger written: docs/quote-proofs.md (${Object.keys(QUOTES).length} entries)`)
}
