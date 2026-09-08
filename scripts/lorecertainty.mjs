// Truthful folklore-certification audit.
//
// Normal mode checks that uncertainty is represented honestly and exits 0
// when the ledger is structurally sound. `--strict` asks the stronger release
// question: is every source line, place projection and playable-span beat either
// proven directly or covered by a hash-bound, evidence-bearing review? Surviving
// source limits stay visible as qualifications; unresolved claims remain blockers.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { ENDINGS, ITEMS, STORY } from '../src/game/content.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { WORLD_FACT_PRESENTATION } from '../src/game/environment.js'
import { CORPUS, ENDING_LORE, FOLKLORE, HISTORY } from '../src/game/folklore.js'
import { QUOTES } from '../src/game/quotes.js'
import { REVIEWED_READINGS } from '../src/game/data/readings/reviewedReadings.js'
import { REVIEWED_OPTION_READINGS } from '../src/game/data/readings/reviewedOptionReadings.js'
import {
  omissionReviewContextHash,
  placeReviewContextHash,
  projectionReviewPayload,
} from './projectionReviewSnapshot.mjs'
import {
  PLACE_PROJECTION_CONTEXT_HASHES,
  PLACE_PROJECTION_REVIEWS,
  PROJECTION_DISPOSITIONS,
  PROJECTION_OMISSION_CONTEXT_HASHES,
  PROJECTION_OMISSIONS,
  PROJECTION_OMISSION_REVIEWS,
  PROJECTION_REVIEW_SNAPSHOT_HASH,
} from '../src/game/data/tales/_projectionLedger.js'
import {
  SOURCE_COLLATION_RECORDS,
  SELECTED_WITNESS_REVIEWS,
  SOURCE_REVIEW_DISPOSITIONS,
} from '../src/game/data/tales/_sourceLedger.js'

const strict = process.argv.includes('--strict')
const json = process.argv.includes('--json')
const tales = []
for (const file of readdirSync(new URL('../src/game/data/tales', import.meta.url))) {
  if (!file.endsWith('.js') || file.startsWith('_')) continue
  const tale = (await import(`../src/game/data/tales/${file}`)).default
  if (tale?.id) tales.push(tale)
}
const npcRegistry = {}
for (const file of readdirSync(new URL('../src/game/data/npcs', import.meta.url))) {
  if (!file.endsWith('.js') || file.startsWith('_')) continue
  Object.assign(npcRegistry, (await import(`../src/game/data/npcs/${file}`)).default)
}

const norm = (value) => String(value || '')
  .normalize('NFC')
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/[«»“”„.,:;!?…()\[\]{}\-–—/\\]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

// Printed verse numbers, OCR line wraps, elision marks and word-break spacing
// are apparatus, not different folklore wording. This second, deliberately
// conservative proof form removes everything except Unicode letters; it does
// not fold letters, transliterate spellings or permit fuzzy matching.
const letterstream = (value) => norm(value).replace(/[^\p{L}]/gu, '')
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const sourceFieldPayload = (tale) => (tale.beats || []).flatMap((beat) =>
  (beat.lines || []).map((line) => `${beat.id}\t${line[0]}\t${line[2] ?? ''}`)).join('\n')
const selectedRecordPayload = (tale) => (tale.beats || []).flatMap((beat) =>
  (beat.lines || []).map((line) => `${beat.id}\t${line[0]}\t${line[1] ?? ''}`)).join('\n')
const ALBANIAN_SOURCE_STATUSES = new Set(['missing', 'located', 'transcribed'])
const taleById = Object.fromEntries(tales.map((tale) => [tale.id, tale]))
const projectionReviewHash = sha256(JSON.stringify(projectionReviewPayload({
  story: STORY,
  items: ITEMS,
  tales: taleById,
  folklore: FOLKLORE,
  endingLore: ENDING_LORE,
  history: HISTORY,
  corpus: CORPUS,
  quotes: QUOTES,
  achievements: ACHIEVEMENTS,
  fates: ENDINGS.filter((ending) => ending.kind === 'bad'),
  worldFactPresentation: WORLD_FACT_PRESENTATION,
  npcRegistry,
  reviewedReadings: REVIEWED_READINGS,
  reviewedOptionReadings: REVIEWED_OPTION_READINGS,
  omissions: PROJECTION_OMISSIONS,
  omissionReviews: PROJECTION_OMISSION_REVIEWS,
  placeReviews: PLACE_PROJECTION_REVIEWS,
})))

const errors = []
const missing = []
const located = []
const proposed = []
const proposedPlaceByKey = new Map()
const proposedWithoutConflictReview = []
const sourceMisses = []
const attestedWitnesses = []
const unresolvedWitnesses = []
const sourceCollations = []
let sourceLines = 0
let sourceExactMatches = 0
let sourceApparatusMatches = 0
let sourceCollatedMatches = 0
let selectedWitnessLines = 0

if (projectionReviewHash !== PROJECTION_REVIEW_SNAPSHOT_HASH) {
  errors.push(`projection-review snapshot is stale: ledger has ${PROJECTION_REVIEW_SNAPSHOT_HASH}; current content is ${projectionReviewHash}`)
}

for (const tale of tales) {
  const status = tale.albanian?.status || 'transcribed'
  const allLines = (tale.beats || []).flatMap((beat) =>
    (beat.lines || []).map((line) => ({ beat: beat.id, ref: line[0], original: line[2] })))

  if (!ALBANIAN_SOURCE_STATUSES.has(status)) errors.push(`${tale.id}: unknown Albanian source status "${status}"`)
  if (tale.albanian?.external && !/^https:\/\//.test(tale.albanian.external)) errors.push(`${tale.id}: albanian.external is not an HTTPS source`)
  if (tale.albanian?.proofLocal && !existsSync(tale.albanian.proofLocal)) errors.push(`${tale.id}: albanian.proofLocal does not exist: ${tale.albanian.proofLocal}`)

  if (status === 'missing') {
    missing.push(tale.id)
    if (!tale.albanian?.why || tale.albanian.why.length < 80) errors.push(`${tale.id}: inadequate missing-source record`)
    const review = SELECTED_WITNESS_REVIEWS[tale.id]
    const reviewProblems = []
    const referenceUrls = new Set((tale.references || []).map((reference) => reference.url))
    if (!review) reviewProblems.push('no selected-witness disposition')
    else {
      if (!Object.values(SOURCE_REVIEW_DISPOSITIONS).includes(review.disposition)) reviewProblems.push(`bad disposition "${review.disposition}"`)
      if (!review.basis || !review.scope || !review.evidence?.length) reviewProblems.push('incomplete basis/scope/evidence')
      for (const evidence of review.evidence || []) if (evidence.startsWith('docs/')) {
        if (!existsSync(evidence)) reviewProblems.push(`missing local evidence ${evidence}`)
        else if (!review.localEvidenceHashes?.[evidence]) reviewProblems.push(`local evidence lacks a review hash: ${evidence}`)
        else if (review.localEvidenceHashes[evidence] !== sha256(readFileSync(evidence))) reviewProblems.push(`local-evidence review hash is stale: ${evidence}`)
      } else if (!/^https?:\/\//.test(evidence)) {
        reviewProblems.push(`evidence is neither a local file nor an HTTP(S) source: ${evidence}`)
      } else if (!referenceUrls.has(evidence)) {
        reviewProblems.push(`external review evidence is not exposed in tale.references: ${evidence}`)
      }
      for (const evidence of Object.keys(review.localEvidenceHashes || {})) {
        if (!review.evidence.includes(evidence)) reviewProblems.push(`local-evidence hash names an undeclared witness: ${evidence}`)
      }
      if (review.lineCount !== allLines.length) reviewProblems.push(`reviewed line count ${review.lineCount} != ${allLines.length}`)
      if (review.recordHash !== sha256(selectedRecordPayload(tale))) reviewProblems.push('review hash is stale')
    }
    selectedWitnessLines += allLines.length
    if (reviewProblems.length || review?.disposition === SOURCE_REVIEW_DISPOSITIONS.UNRESOLVED) {
      unresolvedWitnesses.push(`${tale.id}: ${reviewProblems.join('; ') || review.scope}`)
    } else {
      const localEvidenceCount = (review.evidence || []).filter((item) => item.startsWith('docs/')).length
      const externalEvidenceCount = (review.evidence || []).filter((item) => /^https?:\/\//.test(item)).length
      attestedWitnesses.push({
        taleId: tale.id,
        disposition: review.disposition,
        basis: review.basis,
        scope: review.scope,
        lineCount: allLines.length,
        evidenceMode: localEvidenceCount
          ? externalEvidenceCount ? 'local-evidence-bound-plus-external' : 'local-evidence-bound-attestation'
          : 'external-only-editorial-attestation',
      })
    }
  } else if (status === 'located') {
    located.push(tale.id)
    if (!/^https:\/\//.test(tale.albanian?.external || '')) errors.push(`${tale.id}: located source lacks HTTPS primary-scan URL`)
    if (allLines.some((line) => line.original)) errors.push(`${tale.id}: located-but-uncollated source claims aligned lines`)
  } else {
    const local = tale.albanian?.proofLocal || tale.albanian?.local
    if (!local || !existsSync(local)) {
      errors.push(`${tale.id}: source-language transcription lacks an existing local witness`)
    } else {
      const witness = readFileSync(local, 'utf8')
      const haystack = norm(witness)
      const letterHaystack = letterstream(witness)
      const taleMisses = []
      for (const line of allLines) {
        sourceLines++
        const needle = norm(line.original)
        const letterNeedle = letterstream(line.original)
        if (!needle) {
          errors.push(`${tale.id}.${line.beat}:${line.ref}: no source-language text`)
        } else if (haystack.includes(needle)) {
          sourceExactMatches++
        } else if (letterNeedle && letterHaystack.includes(letterNeedle)) {
          sourceApparatusMatches++
        } else {
          taleMisses.push(`${tale.id}.${line.beat}:${line.ref}`)
        }
      }
      if (taleMisses.length) {
        const review = SOURCE_COLLATION_RECORDS[tale.id]
        const reviewProblems = []
        if (!review) reviewProblems.push('no hash-bound source-collation record')
        else {
          if (!review.method) reviewProblems.push('missing method')
          if (review.lineCount !== allLines.length) reviewProblems.push(`reviewed line count ${review.lineCount} != ${allLines.length}`)
          if (review.unmatchedCount !== taleMisses.length) reviewProblems.push(`reviewed unmatched count ${review.unmatchedCount} != ${taleMisses.length}`)
          if (review.sourceFieldsHash !== sha256(sourceFieldPayload(tale))) reviewProblems.push('source-field review hash is stale')
          if (review.witnessHash !== sha256(witness)) reviewProblems.push('local-witness review hash is stale')
        }
        if (reviewProblems.length) sourceMisses.push(...taleMisses)
        else {
          sourceCollatedMatches += taleMisses.length
          sourceCollations.push({ taleId: tale.id, lines: taleMisses.length, method: review.method })
        }
      } else if (SOURCE_COLLATION_RECORDS[tale.id]) {
        errors.push(`${tale.id}: stale source-collation record has no remaining non-contained lines`)
      }
    }
  }

  for (const line of allLines) {
    if (line.original && /\[(?:sic\b|the\b|from\b|sung\b|continues\b|reported\b|this\b|one\b)/i.test(line.original))
      errors.push(`${tale.id}.${line.beat}:${line.ref}: editorial English inside source-language field`)
  }

  for (const place of tale.places || []) if (place.anchor?.status === 'proposed') {
    const key = `${tale.id}.${place.id}`
    proposed.push(key)
    proposedPlaceByKey.set(key, { tale, place })
    for (const field of ['node', 'mirror', 'mold', 'proposal']) if (!place.anchor[field]) errors.push(`${key}: proposed anchor lacks ${field}`)
    if (!place.anchor.conflicts) proposedWithoutConflictReview.push(key)
  }

  if (tale.play) {
    const ordered = (tale.beats || []).map((beat) => beat.id)
    const start = ordered.indexOf(tale.play.entry)
    const end = tale.play.finale ? ordered.indexOf(tale.play.finale) : ordered.length - 1
    if (start === -1 || end === -1 || start > end) {
      errors.push(`${tale.id}: invalid entry–finale playable span`)
    } else {
      const span = new Set(ordered.slice(start, end + 1))
      const sceneBeats = new Set()
      for (const [node, mapped] of Object.entries(tale.play.scenes || {})) {
        for (const beatId of Array.isArray(mapped) ? mapped : [mapped]) {
          sceneBeats.add(beatId)
          if (!span.has(beatId)) errors.push(`${tale.id}: scene ${node} maps beat ${beatId} outside the playable span`)
        }
      }
      const learnedBeats = new Set(Object.keys(tale.play.learn || {}))
      for (const beatId of sceneBeats) if (learnedBeats.has(beatId)) {
        errors.push(`${tale.id}: beat ${beatId} is both an enacted scene and learned lore`)
      }
      const represented = new Set([...sceneBeats, ...learnedBeats])
      const omissions = PROJECTION_OMISSIONS[tale.id] || []
      for (const beatId of span) if (!represented.has(beatId) && !omissions.includes(beatId)) {
        errors.push(`${tale.id}.${beatId}: playable-span beat has neither scene/learn representation nor an omission disposition`)
      }
      for (const beatId of omissions) {
        if (!span.has(beatId)) errors.push(`${tale.id}.${beatId}: omission is outside the playable span`)
        if (represented.has(beatId)) errors.push(`${tale.id}.${beatId}: omission is also represented by a scene/learn route`)
      }
    }
  }
}

for (const taleId of Object.keys(SELECTED_WITNESS_REVIEWS)) {
  const tale = tales.find((item) => item.id === taleId)
  if (!tale) errors.push(`${taleId}: selected-witness review names an unknown tale`)
  else if (tale.albanian?.status !== 'missing') errors.push(`${taleId}: selected-witness review is stale; tale is no longer in the no-Albanian-transcript state`)
}
for (const taleId of Object.keys(SOURCE_COLLATION_RECORDS)) {
  if (!tales.some((item) => item.id === taleId)) errors.push(`${taleId}: source-collation record names an unknown tale`)
}

const omittedBeats = Object.values(PROJECTION_OMISSIONS).reduce((sum, beats) => sum + beats.length, 0)
const omissionReviews = Object.values(PROJECTION_OMISSION_REVIEWS)
const expectedOmissionKeys = new Set(Object.entries(PROJECTION_OMISSIONS).flatMap(([taleId, beatIds]) => beatIds.map((beatId) => `${taleId}.${beatId}`)))
for (const key of expectedOmissionKeys) {
  const review = PROJECTION_OMISSION_REVIEWS[key]
  if (!review) errors.push(`${key}: omitted beat lacks a disposition review`)
  else if (
    !Object.values(PROJECTION_DISPOSITIONS).includes(review.disposition) ||
    !review.basis ||
    !review.note ||
    review.reviewId !== `omission:${key}` ||
    !review.itemEvidence?.includes(key) ||
    !review.itemEvidence?.includes('contextHash') ||
    review.contextHash !== PROJECTION_OMISSION_CONTEXT_HASHES[key] ||
    review.contextHash !== omissionReviewContextHash(taleById[review.taleId], review.beatId)
  ) errors.push(`${key}: incomplete, invalid or non-specific omitted-beat review`)
}
for (const key of Object.keys(PROJECTION_OMISSION_REVIEWS)) if (!expectedOmissionKeys.has(key)) errors.push(`${key}: stale omitted-beat disposition review`)
for (const key of Object.keys(PROJECTION_OMISSION_CONTEXT_HASHES)) if (!expectedOmissionKeys.has(key)) errors.push(`${key}: stale omitted-beat context digest`)
for (const key of expectedOmissionKeys) if (!PROJECTION_OMISSION_CONTEXT_HASHES[key]) errors.push(`${key}: omitted-beat context digest is missing`)
const unresolvedBeatReviews = omissionReviews.filter((review) => review.disposition !== PROJECTION_DISPOSITIONS.JUSTIFIED)
const placeReviews = proposed.map((key) => PLACE_PROJECTION_REVIEWS[key]).filter(Boolean)
const unresolvedPlaceReviews = placeReviews.filter((review) => review.disposition !== PROJECTION_DISPOSITIONS.JUSTIFIED)
const missingPlaceReviews = proposed.filter((key) => !PLACE_PROJECTION_REVIEWS[key])
const stalePlaceReviews = Object.keys(PLACE_PROJECTION_REVIEWS).filter((key) => !proposed.includes(key))
if (missingPlaceReviews.length) errors.push(...missingPlaceReviews.map((key) => `${key}: proposed place lacks a disposition review`))
if (stalePlaceReviews.length) errors.push(...stalePlaceReviews.map((key) => `${key}: stale proposed-place disposition review`))
for (const key of proposed) {
  const review = PLACE_PROJECTION_REVIEWS[key]
  if (review && (
    !Object.values(PROJECTION_DISPOSITIONS).includes(review.disposition) ||
    !review.basis ||
    !review.note ||
    review.reviewId !== `place:${key}` ||
    !review.itemEvidence?.includes(key) ||
    !review.itemEvidence?.includes('contextHash') ||
    review.contextHash !== PLACE_PROJECTION_CONTEXT_HASHES[key] ||
    review.contextHash !== placeReviewContextHash(proposedPlaceByKey.get(key)?.tale, proposedPlaceByKey.get(key)?.place.id)
  )) errors.push(`${key}: incomplete, invalid or non-specific proposed-place review`)
}
for (const key of Object.keys(PLACE_PROJECTION_CONTEXT_HASHES)) if (!proposed.includes(key)) errors.push(`${key}: stale proposed-place context digest`)
for (const key of proposed) if (!PLACE_PROJECTION_CONTEXT_HASHES[key]) errors.push(`${key}: proposed-place context digest is missing`)

const duplicateContextHashes = (reviews) => {
  const owners = new Map()
  for (const [key, review] of Object.entries(reviews)) {
    const keys = owners.get(review.contextHash) || []
    keys.push(key)
    owners.set(review.contextHash, keys)
  }
  return [...owners.entries()].filter(([hash, keys]) => hash && keys.length > 1)
}
for (const [, keys] of duplicateContextHashes(PROJECTION_OMISSION_REVIEWS)) errors.push(`omission context digest reused across reviews: ${keys.join(', ')}`)
for (const [, keys] of duplicateContextHashes(PLACE_PROJECTION_REVIEWS)) errors.push(`place context digest reused across reviews: ${keys.join(', ')}`)
const blockers = {
  unresolvedSelectedWitnesses: unresolvedWitnesses,
  locatedButUnalignedOriginals: located,
  proposedWithoutConflictReview,
  sourceLinesNotCertified: sourceMisses,
  unresolvedPlaceProjectionReviews: unresolvedPlaceReviews.map((review) => review.key),
  unresolvedBeatProjectionReviews: unresolvedBeatReviews.map((review) => `${review.taleId}.${review.beatId}`),
}
const attestedSelectedWitnessLines = attestedWitnesses.reduce((sum, review) => sum + review.lineCount, 0)
const localEvidenceSelectedWitnessLines = attestedWitnesses
  .filter((review) => review.evidenceMode !== 'external-only-editorial-attestation')
  .reduce((sum, review) => sum + review.lineCount, 0)
const externalOnlySelectedWitnessLines = attestedWitnesses
  .filter((review) => review.evidenceMode === 'external-only-editorial-attestation')
  .reduce((sum, review) => sum + review.lineCount, 0)
const counts = {
  tales: tales.length,
  transcribedTales: tales.length - missing.length - located.length,
  noAlbanianTranscriptTales: missing.length,
  selectedWitnessAttestedTales: attestedWitnesses.filter((review) => review.disposition === SOURCE_REVIEW_DISPOSITIONS.VERIFIED_SELECTED).length,
  documentedSynthesisTales: attestedWitnesses.filter((review) => review.disposition === SOURCE_REVIEW_DISPOSITIONS.REVIEWED_SYNTHESIS).length,
  localEvidenceBoundWitnessTales: attestedWitnesses.filter((review) => review.evidenceMode !== 'external-only-editorial-attestation').length,
  externalOnlyAttestedWitnessTales: attestedWitnesses.filter((review) => review.evidenceMode === 'external-only-editorial-attestation').length,
  locatedUnalignedTales: located.length,
  proposedPlaces: proposed.length,
  justifiedProposedPlaces: placeReviews.filter((review) => review.disposition === PROJECTION_DISPOSITIONS.JUSTIFIED).length,
  unresolvedProposedPlaces: unresolvedPlaceReviews.length,
  sourceLines,
  sourceExactMatches,
  sourceApparatusMatches,
  sourceCollatedMatches,
  sourceMatches: sourceExactMatches + sourceApparatusMatches + sourceCollatedMatches,
  sourceMisses: sourceMisses.length,
  selectedWitnessLines,
  attestedSelectedWitnessLines,
  localEvidenceSelectedWitnessLines,
  externalOnlySelectedWitnessLines,
  accountedSourceUnits: sourceExactMatches + sourceApparatusMatches + sourceCollatedMatches + attestedSelectedWitnessLines,
  totalSourceUnits: sourceLines + selectedWitnessLines,
  omittedBeats,
  justifiedOmittedBeats: omissionReviews.filter((review) => review.disposition === PROJECTION_DISPOSITIONS.JUSTIFIED).length,
  unresolvedOmittedBeats: unresolvedBeatReviews.length,
  sourceOnlyTales: tales.filter((tale) => tale.projection?.status === 'source-only').length,
  schemaErrors: errors.length,
  projectionReviewSnapshotValid: projectionReviewHash === PROJECTION_REVIEW_SNAPSHOT_HASH,
}
const strictBlockerCount = unresolvedWitnesses.length + located.length + proposedWithoutConflictReview.length + sourceMisses.length + unresolvedPlaceReviews.length + unresolvedBeatReviews.length
const qualifications = {
  noAlbanianTranscript: attestedWitnesses,
  externalOnlyWitnessAttestations: attestedWitnesses.filter((review) => review.evidenceMode === 'external-only-editorial-attestation'),
  sourceCollations,
  reviewedProposedPlaces: placeReviews.filter((review) => review.disposition === PROJECTION_DISPOSITIONS.JUSTIFIED).map((review) => review.key),
  reviewedOmittedBeats: omissionReviews.filter((review) => review.disposition === PROJECTION_DISPOSITIONS.JUSTIFIED).map((review) => `${review.taleId}.${review.beatId}`),
  sourceOnlyTales: tales.filter((tale) => tale.projection?.status === 'source-only').map((tale) => ({ taleId: tale.id, reason: tale.projection.reason })),
  projectionReviewSnapshotHash: projectionReviewHash,
}

if (json) console.log(JSON.stringify({ version: 2, strict, counts, errors, blockers, qualifications, certifiable: errors.length === 0 && strictBlockerCount === 0 }, null, 2))
else {
  console.log(`folklore certainty: ${counts.tales} tales`)
  console.log(`  source state: ${counts.transcribedTales} source-language transcripts · ${counts.selectedWitnessAttestedTales} selected witnesses internally attested without Albanian transcript · ${counts.documentedSynthesisTales} declared syntheses · ${counts.locatedUnalignedTales} located/un-aligned`)
  console.log(`  source accounting: ${counts.accountedSourceUnits}/${counts.totalSourceUnits} units accounted for (${counts.sourceExactMatches} text-exact · ${counts.sourceApparatusMatches} apparatus-equivalent · ${counts.sourceCollatedMatches} hash-bound editorial collations · ${counts.localEvidenceSelectedWitnessLines} local-evidence-bound attestations · ${counts.externalOnlySelectedWitnessLines} external-only editorial attestations)`)
  console.log(`  map projection review: ${counts.justifiedProposedPlaces}/${counts.proposedPlaces} proposals justified · ${counts.unresolvedProposedPlaces} unresolved`)
  console.log(`  play projection review: ${counts.justifiedOmittedBeats}/${counts.omittedBeats} omissions justified · ${counts.unresolvedOmittedBeats} unresolved · ${counts.sourceOnlyTales} exact timeline kept source-only`)
  if (errors.length) console.error(`  schema errors: ${errors.length}\n${errors.map((x) => `    - ${x}`).join('\n')}`)
  if (strict) console.log(`  strict certification: ${errors.length || strictBlockerCount ? 'FAIL' : 'PASS'}`)
  else console.log(`  uncertainty ledger: ${errors.length ? 'INVALID' : 'VALID'} (run with --strict to test declared-scope certification)`)
}

process.exitCode = errors.length || (strict && strictBlockerCount) ? 1 : 0
