import assert from 'node:assert/strict'
import { decodeActionTimingManifest, encodeActionTimingManifest } from '../../src/game/actionTimingStorage.js'

export function runActionTimingStorageAssertions(canonical, stored) {
  const original = structuredClone(canonical)
  const encoded = encodeActionTimingManifest(canonical)
  assert.equal(encoded.version, 2)
  assert.deepEqual(decodeActionTimingManifest(encoded), original, 'storage must preserve every hash, duration, offset, word/syllable interval and confidence exactly')
  assert.deepEqual(decodeActionTimingManifest(original), original, 'previous deployments’ v1 cache remains readable')
  assert.deepEqual(canonical, original, 'encoding must not mutate canonical evidence')
  assert.equal(JSON.stringify(encodeActionTimingManifest(decodeActionTimingManifest(encoded))), JSON.stringify(encoded), 'storage is idempotent')
  assert.equal(stored.version, 2, 'the generated archive must use the compact storage format')
  assert.deepEqual(stored, encoded, 'the committed archive is the deterministic encoding of its canonical manifest')
  const slug = Object.keys(encoded.entries)[0]
  const sample = () => ({ ...encoded, entries: { [slug]: structuredClone(encoded.entries[slug]) } })
  const cases = [
    ['unknown version', (m) => { m.version = 3 }],
    ['unknown method', (m) => { m.method = 'invented' }],
    ['unknown manifest field', (m) => { m.extra = true }],
    ['unknown entry field', (m, e) => { e.extra = true }],
    ['unknown word field', (m, e, w) => { w.extra = true }],
    ['unknown enum', (m, e, w) => { w.syllableTiming = 2 }],
    ['string enum in v2', (m, e, w) => { w.syllableTiming = 'unavailable' }],
    ['numeric enum in v1', (m) => { m.version = 1 }],
    ['missing enum', (m, e, w) => { delete w.syllableTiming }],
    ['missing interval', (m, e, w) => { delete w.endMs }],
    ['nonfinite confidence', (m, e, w) => { w.confidence = Number.NaN }],
    ['fractional character boundary', (m, e, w) => { w.charStart = 0.5 }],
    ['malformed audio hash', (m, e) => { e.audioSha256 = 'not-a-hash' }],
    ['malformed word array', (m, e) => { e.words = {} }],
    ['sparse words', (m, e) => { delete e.words[0] }],
    ['extra word-array property', (m, e) => { e.words.extra = true }],
    ['malformed syllables', (m, e, w) => { w.syllables = null }],
    ['unknown syllable field', (m, e, w) => { w.syllables = [{ text: w.text, startMs: w.startMs, endMs: w.endMs, confidence: w.confidence, extra: true }] }],
    ['inherited entries', (m) => { m.entries = Object.create(m.entries) }],
    ['symbol entry', (m) => { m.entries[Symbol('hidden')] = {} }],
    ['accessor entry', (m) => { Object.defineProperty(m.entries, slug, { enumerable: true, get: () => encoded.entries[slug] }) }],
  ]
  for (const [label, mutate] of cases) {
    const m = sample(), entry = m.entries[slug]
    mutate(m, entry, entry.words[0])
    assert.throws(() => decodeActionTimingManifest(m), /Invalid action timing storage/, label)
  }
  for (const bad of [null, [], {}, { version: 2 }]) assert.throws(() => decodeActionTimingManifest(bad), /Invalid action timing storage/)
  assert.throws(() => encodeActionTimingManifest(encoded), /Invalid action timing storage/, 'do not encode encoded data twice')
  const decoded = decodeActionTimingManifest(encoded)
  assert.notEqual(decoded.entries[slug].words, encoded.entries[slug].words)
  assert.notEqual(decoded.entries[slug].words[0].syllables, encoded.entries[slug].words[0].syllables)
  return { corruptions: cases.length + 5 }
}
