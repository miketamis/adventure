// Bibliographic integrity and optional live-link audit.
//
// Normal mode is deterministic and suitable for CI: it validates that every
// tale, folklore card, history card and corpus work exposes honest, structured
// source routes. `--check-links` additionally probes every unique external URL;
// only definitive 404/410 responses fail that network run, while authentication,
// rate limits and transient network failures stay visible as qualifications.
import { existsSync, readdirSync } from 'node:fs'
import { CORPUS, EXTRA_SOURCES, FOLKLORE, HISTORY } from '../src/game/folklore.js'
import { QUOTES, QUOTE_EVIDENCE_WORKS } from '../src/game/quotes.js'
import { SELECTED_WITNESS_REVIEWS } from '../src/game/data/tales/_sourceLedger.js'

export const TALE_REFERENCE_ROLES = Object.freeze([
  'selected-witness',
  'source-text',
  'facsimile',
  'translation',
  'catalog',
  'scholarship',
  'variant',
  'analogue',
  'context',
])

const tales = []
for (const file of readdirSync(new URL('../src/game/data/tales', import.meta.url))) {
  if (!file.endsWith('.js') || file.startsWith('_')) continue
  const tale = (await import(`../src/game/data/tales/${file}`)).default
  if (tale?.id) tales.push(tale)
}
const taleById = Object.fromEntries(tales.map((tale) => [tale.id, tale]))
const roleSet = new Set(TALE_REFERENCE_ROLES)
const exactRoles = new Set(['selected-witness', 'source-text', 'facsimile', 'translation'])
const errors = []
const qualifications = []
const corpusById = new Map(CORPUS.map((work) => [work.id, work]))

const validWebUrl = (value) => {
  try { return ['http:', 'https:'].includes(new URL(value).protocol) }
  catch { return false }
}
const isWikiFamily = (url) => {
  const host = new URL(url).hostname.toLowerCase()
  return /(^|\.)(wikipedia|wiktionary|wikibooks|wikisource)\.org$/.test(host)
}
const mergedEntrySources = (entry) => {
  const combined = [
    ...(entry.sources || []),
    ...(EXTRA_SOURCES[entry.id] || []),
    ...((taleById[entry.id]?.references || []).map((ref) => ({
      label: ref.citation,
      url: ref.url,
      role: ref.role,
    }))),
  ]
  const seen = new Set()
  return combined.filter((source) => {
    if (!source?.url || seen.has(source.url)) return false
    seen.add(source.url)
    return true
  })
}

// Quote URLs are source routes too. Keep their shape checks here as well as in
// quotecheck so the bibliographic/live-link audit cannot silently omit them.
const quoteExternalLinkRecords = []
for (const [quoteId, quote] of Object.entries(QUOTES)) {
  if (!Array.isArray(quote.evidence) || !quote.evidence.length) {
    errors.push(`quote:${quoteId}: evidence must be a non-empty array`)
    continue
  }
  for (const [index, evidence] of quote.evidence.entries()) {
    if (evidence?.kind !== 'url') continue
    const at = `quote:${quoteId}.evidence[${index}]`
    if (!evidence.label || typeof evidence.label !== 'string') errors.push(`${at}: URL evidence lacks a label`)
    if (!validWebUrl(evidence.url)) errors.push(`${at}: malformed external evidence URL`)
    else quoteExternalLinkRecords.push({ owner: `quote:${quoteId}`, label: evidence.label, url: evidence.url })
  }
}

const evidenceWorkRelationships = new Set([
  'full-work',
  'official-page-extract',
  'page-checked-extract',
  'page-checked-reproduction',
  'page-extract',
  'variant-extract',
  'variant-page-extract',
])
const quoteEvidenceWorkLinkRecords = []
for (const [file, work] of Object.entries(QUOTE_EVIDENCE_WORKS)) {
  const at = `quote-evidence-work:${file}`
  if (!file.startsWith('docs/references/') || !existsSync(file)) errors.push(`${at}: local evidence file is missing or outside docs/references`)
  if (!work?.id || typeof work.id !== 'string') errors.push(`${at}: id is missing`)
  if (!evidenceWorkRelationships.has(work?.relationship)) errors.push(`${at}: unknown relationship "${work?.relationship || ''}"`)
  if (!work?.corpusId && (!work?.title || !work?.url)) errors.push(`${at}: standalone extract requires title and URL`)
  if (work?.corpusId && !corpusById.has(work.corpusId)) errors.push(`${at}: unknown corpusId "${work.corpusId}"`)
  if (work?.corpusId && work.id !== work.corpusId) errors.push(`${at}: corpus-backed id must equal corpusId`)
  if (work?.url && !validWebUrl(work.url)) errors.push(`${at}: malformed external evidence URL`)
  else if (work?.url) quoteEvidenceWorkLinkRecords.push({ owner: `quote-work:${file}`, label: work.title || work.id, url: work.url })
}

for (const tale of tales) {
  const refs = tale.references || []
  if (!refs.length) errors.push(`${tale.id}: no clickable tale references`)
  const seen = new Set()
  for (const [index, ref] of refs.entries()) {
    const at = `${tale.id}.references[${index}]`
    if (!roleSet.has(ref?.role)) errors.push(`${at}: unknown role "${ref?.role || ''}"`)
    if (!ref?.citation || ref.citation.trim().length < 12) errors.push(`${at}: citation is missing or too vague`)
    if (!validWebUrl(ref?.url)) errors.push(`${at}: URL is not HTTP(S)`)
    else {
      if (seen.has(ref.url)) errors.push(`${at}: duplicate URL within tale`)
      seen.add(ref.url)
      if (!ref.url.startsWith('https://')) qualifications.push(`${at}: host is linked over HTTP`)
    }
  }
  if (refs.length && !refs.some((ref) => exactRoles.has(ref.role))) {
    errors.push(`${tale.id}: references name no selected witness, source text, facsimile, or translation`)
  }
  if (tale.albanian?.external && !refs.some((ref) => ref.url === tale.albanian.external)) {
    errors.push(`${tale.id}: albanian.external is not exposed in references`)
  }
  const review = SELECTED_WITNESS_REVIEWS[tale.id]
  for (const evidence of review?.evidence || []) if (validWebUrl(evidence) && !refs.some((ref) => ref.url === evidence)) {
    errors.push(`${tale.id}: selected-witness review URL is not exposed in references: ${evidence}`)
  }
}

const knowledgeEntries = [...FOLKLORE, ...HISTORY]
const entrySourceCounts = []
for (const entry of knowledgeEntries) {
  const sources = mergedEntrySources(entry)
  const corpusCoverage = CORPUS.filter((corpus) =>
    (corpus.covers || []).includes(entry.id) || (corpus.coversHist || []).includes(entry.id))
  entrySourceCounts.push({ id: entry.id, count: sources.length })
  if (!sources.length && !corpusCoverage.length) errors.push(`${entry.id}: lore/history entry has no clickable sources`)
  for (const [index, source] of sources.entries()) {
    if (!source.label || !validWebUrl(source.url)) errors.push(`${entry.id}.sources[${index}]: malformed source link`)
  }
  if (sources.length && !corpusCoverage.length && sources.every((source) => isWikiFamily(source.url))) {
    qualifications.push(`${entry.id}: only wiki-family references are currently exposed`)
  }
}

for (const corpus of CORPUS) {
  const links = corpus.online || []
  if (!corpus.local && !links.length) errors.push(`${corpus.id}: corpus work has neither a local witness nor an external link`)
  const seen = new Set()
  for (const [index, link] of links.entries()) {
    const at = `${corpus.id}.online[${index}]`
    if (!link?.label || !validWebUrl(link?.url)) errors.push(`${at}: malformed source link`)
    else {
      if (seen.has(link.url)) errors.push(`${at}: duplicate URL within corpus record`)
      seen.add(link.url)
      if (!link.url.startsWith('https://')) qualifications.push(`${at}: host is linked over HTTP`)
    }
  }
}

const rawLinkRecords = [
  ...tales.flatMap((tale) => (tale.references || []).map((ref) => ({ owner: `tale:${tale.id}`, ...ref }))),
  ...Object.entries(SELECTED_WITNESS_REVIEWS).flatMap(([taleId, review]) =>
    (review.evidence || [])
      .filter(validWebUrl)
      .map((url) => ({ owner: `witness-attestation:${taleId}`, label: `${taleId} selected-witness attestation`, url }))),
  ...knowledgeEntries.flatMap((entry) => mergedEntrySources(entry).map((source) => ({ owner: `entry:${entry.id}`, ...source }))),
  ...CORPUS.flatMap((corpus) => (corpus.online || []).map((source) => ({ owner: `corpus:${corpus.id}`, ...source }))),
  ...quoteExternalLinkRecords,
  ...quoteEvidenceWorkLinkRecords,
]
const seenOwnerUrls = new Set()
const allLinkRecords = rawLinkRecords.filter((record) => {
  const key = `${record.owner}\0${record.url}`
  if (seenOwnerUrls.has(key)) {
    errors.push(`${record.owner}: duplicate ownership record for ${record.url}`)
    return false
  }
  seenOwnerUrls.add(key)
  return true
})
const uniqueUrls = [...new Set(allLinkRecords.map((record) => record.url).filter(validWebUrl))]
const ownersByUrl = new Map(uniqueUrls.map((url) => [
  url,
  [...new Set(allLinkRecords.filter((record) => record.url === url).map((record) => record.owner))].sort(),
]))

const guardedStatuses = new Set([401, 403, 406, 418, 429, 451])
const guardedReason = (status) => ({
  401: 'authentication-required',
  403: 'forbidden-or-bot-blocked',
  406: 'automated-client-rejected',
  418: 'automated-client-rejected',
  429: 'rate-limited',
  451: 'legally-restricted',
})[status] || 'access-controlled'
const networkErrorCode = (error) => {
  const candidates = [error?.cause?.code, error?.code, error?.cause?.name, error?.name]
  return candidates.find((value) => typeof value === 'string' && value) || String(error)
}
const unavailableReason = (error) => {
  const code = networkErrorCode(error)
  if (['UND_ERR_CONNECT_TIMEOUT', 'ETIMEDOUT', 'AbortError'].includes(code)) return 'timeout'
  if (['ECONNRESET', 'UND_ERR_SOCKET'].includes(code)) return 'connection-reset'
  if (/CERT|TLS|SSL|SIGNATURE/i.test(code)) return 'tls-or-certificate'
  if (/ENOTFOUND|EAI_AGAIN|DNS/i.test(code)) return 'dns'
  return 'network-other'
}

const classifyResponse = (url, result) => {
  if ([404, 410].includes(result.status)) return { url, state: 'broken', ...result }
  if (result.status >= 200 && result.status < 400) return { url, state: 'reachable', ...result }
  if (guardedStatuses.has(result.status)) {
    return { url, state: 'guarded', accessReason: guardedReason(result.status), ...result }
  }
  return { url, state: 'server-response', ...result }
}

const checkOne = async (url) => {
  const headers = { 'user-agent': 'LanguageAdventure-SourceAudit/1.0 (+bibliographic link verification)' }
  const attempt = async (method) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)
    try {
      const response = await fetch(url, { method, redirect: 'follow', headers, signal: controller.signal })
      const result = { status: response.status, finalUrl: response.url, method }
      if (response.body) await response.body.cancel()
      return result
    } finally { clearTimeout(timer) }
  }
  try {
    let result = await attempt('HEAD')
    // Some healthy archives and publishers reject HEAD while serving GET.
    // Retry every non-success response, but retain a guarded HEAD response if
    // the fuller probe itself times out: an explicit 401/403/429 is stronger
    // evidence of a live, access-controlled server than the failed retry.
    if (result.status >= 400) {
      const head = result
      try {
        result = await attempt('GET')
      } catch (error) {
        const errorCode = networkErrorCode(error)
        if (guardedStatuses.has(head.status)) {
          return {
            url,
            state: 'guarded',
            accessReason: guardedReason(head.status),
            ...head,
            getError: errorCode,
          }
        }
        return {
          url,
          state: 'unavailable',
          reason: unavailableReason(error),
          error: errorCode,
          priorStatus: head.status,
        }
      }
    }
    return classifyResponse(url, result)
  } catch (error) {
    return {
      url,
      state: 'unavailable',
      reason: unavailableReason(error),
      error: networkErrorCode(error),
    }
  }
}

let live = []
if (process.argv.includes('--check-links')) {
  const queue = [...uniqueUrls]
  const workers = Array.from({ length: Math.min(16, queue.length) }, async () => {
    const results = []
    while (queue.length) results.push(await checkOne(queue.shift()))
    return results
  })
  live = (await Promise.all(workers)).flat().map((result) => ({
    ...result,
    owners: ownersByUrl.get(result.url) || [],
  }))
  for (const result of live.filter((item) => item.state === 'broken')) errors.push(`definitively broken link (${result.status}): ${result.url}`)
}

const counts = {
  tales: tales.length,
  taleReferences: tales.reduce((sum, tale) => sum + (tale.references?.length || 0), 0),
  selectedWitnessReviewLinks: Object.values(SELECTED_WITNESS_REVIEWS)
    .reduce((sum, review) => sum + (review.evidence || []).filter(validWebUrl).length, 0),
  quoteExternalEvidenceLinks: quoteExternalLinkRecords.length,
  quoteExternalEvidenceUrls: new Set(quoteExternalLinkRecords.map((record) => record.url)).size,
  quoteEvidenceWorkLinks: quoteEvidenceWorkLinkRecords.length,
  knowledgeEntries: knowledgeEntries.length,
  knowledgeLinks: knowledgeEntries.reduce((sum, entry) => sum + mergedEntrySources(entry).length, 0),
  corpusWorks: CORPUS.length,
  corpusExternalLinks: CORPUS.reduce((sum, corpus) => sum + (corpus.online?.length || 0), 0),
  localCorpusWorks: CORPUS.filter((corpus) => corpus.local).length,
  corpusCoverageEdges: CORPUS.reduce((sum, corpus) => sum + (corpus.covers?.length || 0) + (corpus.coversHist?.length || 0), 0),
  uniqueExternalUrls: uniqueUrls.length,
}
const report = {
  certifiable: errors.length === 0,
  counts,
  errors,
  qualifications,
  sparseEntries: entrySourceCounts.filter((entry) => entry.count < 2),
  ...(live.length ? { live: {
    checkedAt: new Date().toISOString(),
    totals: Object.fromEntries([...new Set(live.map((item) => item.state))].sort().map((state) => [state, live.filter((item) => item.state === state).length])),
    broken: live.filter((item) => item.state === 'broken'),
    guarded: live.filter((item) => item.state === 'guarded'),
    serverResponses: live.filter((item) => item.state === 'server-response'),
    unavailable: live.filter((item) => item.state === 'unavailable'),
    unavailableByReason: Object.fromEntries(
      [...new Set(live.filter((item) => item.state === 'unavailable').map((item) => item.reason))]
        .sort()
        .map((reason) => [reason, live.filter((item) => item.state === 'unavailable' && item.reason === reason).length]),
    ),
  } } : {}),
}

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2))
else {
  console.log(`Source evidence: ${counts.tales} tales / ${counts.taleReferences} tale links (${counts.selectedWitnessReviewLinks} external witness-attestation links cross-checked); ${counts.knowledgeEntries} lore-history entries / ${counts.knowledgeLinks} links; ${counts.corpusWorks} corpus works / ${counts.corpusExternalLinks} external links (${counts.localCorpusWorks} held locally); ${counts.quoteExternalEvidenceLinks} quote-evidence links across ${counts.quoteExternalEvidenceUrls} URLs plus ${counts.quoteEvidenceWorkLinks} extract-work links.`)
  console.log(`Unique external URLs: ${counts.uniqueExternalUrls}.`)
  if (live.length) console.log(`Live link probe: ${Object.entries(report.live.totals).map(([state, count]) => `${count} ${state}`).join(', ')}.`)
  if (report.sparseEntries.length) console.log(`Qualifications: ${report.sparseEntries.length} lore/history entries expose fewer than two distinct links; citation count alone is not treated as proof quality.`)
  if (qualifications.length) console.log(`Evidence/access qualifications: ${qualifications.length} (use --json for the full list).`)
  for (const error of errors) console.error(`❌ ${error}`)
  if (!errors.length) console.log('✅ source registry structure is complete')
}
if (errors.length) process.exitCode = 1
