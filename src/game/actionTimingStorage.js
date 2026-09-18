// Storage v2 abbreviates only this repeated editorial enum. Canonical v1
// timestamps, waveform evidence, hashes and syllable intervals remain exact.
export const ACTION_TIMING_METHOD = 'azure-word-boundary-correlated-to-stored-mp3'
const modes = ['unavailable', 'word-boundary-is-single-syllable']
const fields = {
  manifest: ['version', 'method', 'entries'],
  entry: ['transcript', 'audioSha256', 'storedDurationMs', 'referenceDurationMs', 'alignmentOffsetMs', 'alignmentCorrelation', 'words'],
  word: ['text', 'charStart', 'charEnd', 'startMs', 'endMs', 'confidence', 'syllables', 'syllableTiming'],
  syllable: ['text', 'startMs', 'endMs', 'confidence'],
}
function invalid() { throw new TypeError('Invalid action timing storage') }
function record(value, keys) {
  if (!value || ![Object.prototype, null].includes(Object.getPrototypeOf(value)) ||
      Reflect.ownKeys(value).some((key) => typeof key !== 'string' || !Object.hasOwn(Object.getOwnPropertyDescriptor(value, key), 'value')) ||
      (keys && (Reflect.ownKeys(value).length !== keys.length || keys.some((key) => !Object.hasOwn(value, key))))) invalid()
  return value
}
function array(value) {
  if (!Array.isArray(value) || Reflect.ownKeys(value).length !== value.length + 1) invalid()
  for (let i = 0; i < value.length; i++) if (!Object.hasOwn(value, i)) invalid()
  return value
}
function boundary(value, keys) {
  record(value, keys)
  if (typeof value.text !== 'string' || !value.text ||
      ![value.startMs, value.endMs, value.confidence].every(Number.isFinite)) invalid()
}
function mapManifest(manifest, version, mapMode) {
  record(manifest, fields.manifest)
  if (manifest.method !== ACTION_TIMING_METHOD) invalid()
  record(manifest.entries)
  return { ...manifest, version, entries: Object.fromEntries(Object.entries(manifest.entries).map(([slug, entry]) => {
    record(entry, fields.entry)
    if (!slug || typeof entry.transcript !== 'string' || !entry.transcript ||
        typeof entry.audioSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(entry.audioSha256) ||
        ![entry.storedDurationMs, entry.referenceDurationMs, entry.alignmentOffsetMs, entry.alignmentCorrelation].every(Number.isFinite)) invalid()
    return [slug, { ...entry, words: array(entry.words).map((word) => {
      boundary(word, fields.word)
      if (!Number.isSafeInteger(word.charStart) || !Number.isSafeInteger(word.charEnd)) invalid()
      const syllables = array(word.syllables).map((syllable) => {
        boundary(syllable, fields.syllable)
        return { ...syllable }
      })
      return { ...word, syllables, syllableTiming: mapMode(word.syllableTiming) }
    }) }]
  })) }
}

export function decodeActionTimingManifest(stored) {
  if (![1, 2].includes(stored?.version)) invalid()
  return mapManifest(stored, 1, (mode) => {
    if (stored.version === 1) {
      if (!modes.includes(mode)) invalid()
      return mode
    }
    if (mode !== 0 && mode !== 1) invalid()
    return modes[mode]
  })
}

export function encodeActionTimingManifest(manifest) {
  if (manifest?.version !== 1) invalid()
  return mapManifest(manifest, 2, (mode) => {
    const encoded = modes.indexOf(mode)
    if (encoded < 0) invalid()
    return encoded
  })
}
