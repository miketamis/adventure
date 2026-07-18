// QUOTE PROOF CHECK — machine-verifies the story's folk-quote lines against
// the quote register (src/game/quotes.js) and the downloaded primary sources
// (docs/references/). The register CLAIMS; this script PROVES.
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
//   4. every corpus evidence `match` is FOUND in its local file — compared
//      whitespace-insensitively so OCR line breaks don't matter — and the
//      file:line of the hit is reported (this is the proof)
//   5. entries whose best evidence is only 'url' or 'oral' are listed
//      honestly as link-verified / unattested rather than proven
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { STORY, DICT } from '../src/game/content.js'
import { QUOTES, quoteTier } from '../src/game/quotes.js'
import { CORPUS, REPO_BLOB } from '../src/game/folklore.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const REPORT = process.argv.includes('--report')

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
  const idx = entry.sq.indexOf(squash(needle))
  if (idx === -1) return null
  let pos = entry.map[idx]
  while (pos < raw.length && /\s/.test(raw[pos])) pos++ // step past a leading collapsed space
  return raw.slice(0, pos).split('\n').length
}

// ── collect every Q() line in the story ─────────────────────────────────────
const sites = [] // { nodeId, quoteId, albanian }
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const entry of node.text || []) {
    const line = Array.isArray(entry) ? entry : entry.line
    if (line?.quoteId) sites.push({ nodeId, quoteId: line.quoteId, albanian: albanianOf(line) })
  }
}

const fails = []
const warns = []

// story line ↔ register consistency
for (const s of sites) {
  const q = QUOTES[s.quoteId]
  if (!q) {
    fails.push(`node ${s.nodeId}: Q('${s.quoteId}') has no register entry`)
    continue
  }
  if (!normalize(s.albanian).includes(normalize(q.game)))
    fails.push(
      `node ${s.nodeId}: story line does not contain the registered wording for '${s.quoteId}'\n` +
        `    line:       ${s.albanian}\n    registered: ${q.game}`,
    )
}

// register completeness + evidence sanity
const used = new Set(sites.map((s) => s.quoteId))
const corpusIds = new Set(CORPUS.map((c) => c.id))
const fileCache = new Map()
const proofs = {} // quoteId -> [{file, line, match} | {url,label} | {oral}]

for (const [id, q] of Object.entries(QUOTES)) {
  if (!used.has(id)) warns.push(`register entry '${id}' is not used by any story line`)
  if (!q.label || !q.game || !q.original || !q.translation || !q.fidelity)
    fails.push(`register entry '${id}' is missing a required field`)
  if (q.source && !corpusIds.has(q.source))
    fails.push(`register entry '${id}': source '${q.source}' is not a CORPUS id`)
  if (!q.evidence?.length) {
    fails.push(`register entry '${id}' has no evidence at all`)
    continue
  }
  proofs[id] = []
  for (const ev of q.evidence) {
    if (ev.kind === 'corpus') {
      const path = join(ROOT, ev.file)
      let raw
      try {
        raw = fileCache.get(path) ?? readFileSync(path, 'utf8')
        fileCache.set(path, raw)
      } catch {
        fails.push(`'${id}': corpus file not found: ${ev.file}`)
        continue
      }
      const line = findInFile(raw, ev.match)
      if (line == null) fails.push(`'${id}': proof string NOT FOUND in ${ev.file}:\n    "${ev.match}"`)
      else proofs[id].push({ kind: 'corpus', file: ev.file, line, match: ev.match, variant: !!ev.variant, note: ev.note })
    } else if (ev.kind === 'url') {
      if (!/^https?:\/\//.test(ev.url || '')) fails.push(`'${id}': url evidence without a valid url`)
      else proofs[id].push({ kind: 'url', url: ev.url, label: ev.label, quote: ev.quote, note: ev.note })
    } else if (ev.kind === 'oral') {
      if (!ev.note) fails.push(`'${id}': oral evidence must carry a note explaining the attestation`)
      else proofs[id].push({ kind: 'oral', note: ev.note })
    } else {
      fails.push(`'${id}': unknown evidence kind '${ev.kind}'`)
    }
  }
}

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
    `  ${mark} ${id}` + (p ? ` — ${p.file.replace('docs/references/', '')}:${p.line}${p.variant ? ' (formula variant)' : ''}` : ''),
  )
}
if (warns.length) console.log('\nwarnings:\n' + warns.map((w) => '  ⚠ ' + w).join('\n'))
if (fails.length) {
  console.error('\nFAILURES:\n' + fails.map((f) => '  ✗ ' + f).join('\n'))
  process.exit(1)
}
console.log('\nall quote proofs verified ✓')

// ── the human-readable ledger ────────────────────────────────────────────────
if (REPORT) {
  const nodesOf = (id) => sites.filter((s) => s.quoteId === id).map((s) => s.nodeId)
  const TIER_TEXT = {
    corpus: '**✓ corpus-verified** — the original is machine-checked against the downloaded primary source below',
    variant: '**≈ formula-verified** — the corpus attests the formula; the exact wording rests on the linked source',
    external: '**↗ link-verified** — quoted from a printed source we link but do not hold locally',
    oral: '**~ oral tradition** — a formula of the living language, not located in print (the weakest tier)',
  }
  const lines = []
  lines.push('# Quote proofs — the folk-quote ledger')
  lines.push('')
  lines.push('<!-- GENERATED by `node scripts/quotecheck.mjs --report` — do not edit by hand. -->')
  lines.push('')
  lines.push('Every `Q()` line in the story — a line presented to the player as *the real*')
  lines.push('*thing, quoted from the folk sources* — is registered in [`src/game/quotes.js`](../src/game/quotes.js)')
  lines.push('and verified by [`scripts/quotecheck.mjs`](../scripts/quotecheck.mjs). This ledger is the')
  lines.push('generated, human-readable form of that register: what the game says, what the')
  lines.push('source says, and where to check it.')
  lines.push('')
  const counts = Object.entries(tally).map(([k, v]) => `${v} ${k}`).join(' · ')
  lines.push(`**${sites.length} quoted lines** (${used.size} distinct quotes): ${counts}.`)
  lines.push('')
  for (const [id, q] of Object.entries(QUOTES)) {
    lines.push(`## \`${id}\` — ${q.label}`)
    lines.push('')
    lines.push(`> **${q.game}**`)
    lines.push('')
    lines.push(`- **Original:** ${q.original}`)
    lines.push(`- **Translation:** ${q.translation}`)
    lines.push(`- **Fidelity:** ${q.fidelity}`)
    lines.push(`- **Proof:** ${TIER_TEXT[tierOf(id)]}`)
    for (const p of proofs[id] || []) {
      if (p.kind === 'corpus')
        lines.push(
          `  - [\`${p.file}\`](${REPO_BLOB}${p.file}#L${p.line}) line ${p.line}${p.variant ? ' *(formula variant)*' : ''}: \`${p.match}\`` +
            (p.note ? ` — ${p.note}` : ''),
        )
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
