import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { createActionPlaybackPrewarmer } from '../../src/prewarmActionPlayback.js'

test('silent preloads are bounded, deduplicated, and reused without interrupting or completing playback', async () => {
  const originalAudio = globalThis.Audio
  const originalSetTimeout = globalThis.setTimeout
  const originalClearTimeout = globalThis.clearTimeout
  const recordings = []
  const timers = new Map()
  let timerId = 0
  class Recording {
    constructor(src) {
      this.src = src
      this.duration = Number.NaN
      this.currentTime = 0
      this.playCalls = 0
      this.pauseCalls = 0
      recordings.push(this)
    }
    load() { if (this.src) this.duration = 9 }
    play() { this.playCalls++; return Promise.resolve() }
    pause() { this.pauseCalls++ }
    removeAttribute(name) { if (name === 'src') this.src = '' }
  }
  globalThis.Audio = Recording
  globalThis.setTimeout = (callback, delay) => { timers.set(++timerId, { callback, delay }); return timerId }
  globalThis.clearTimeout = (id) => timers.delete(id)
  const audio = await import('../../src/game/audio.js?prewarm-cache-test')
  try {
    audio.setMuted(false)
    const surfaces = ['eja këtu', 'Eja këtu', ...Array.from({ length: 20 }, (_, index) => `audit phrase ${index}`)]
    assert.equal(audio.preloadAudioSurfaces(surfaces), audio.AUDIO_PRELOAD_POLICY.maxSurfacesPerRequest)
    assert.equal(recordings.length, audio.AUDIO_PRELOAD_POLICY.maxSurfacesPerRequest)
    assert.ok(recordings.every((recording) => recording.playCalls === 0 && !recording.onended))
    assert.equal(audio.preloadAudioSurfaces(surfaces), 0)
    const active = recordings[0]
    let settled = false
    const playback = audio.playActionPhrase('Eja këtu').then((completed) => { settled = true; return completed })
    assert.equal(recordings.length, audio.AUDIO_PRELOAD_POLICY.maxSurfacesPerRequest)
    assert.equal(active.playCalls, 1)
    assert.deepEqual([...timers.values()].map(({ delay }) => delay), [9_000 + audio.AUDIO_PLAYBACK_POLICY.endGraceMs],
      'preloaded metadata retained the five-second network watchdog for a longer recording')
    await Promise.resolve()
    assert.equal(settled, false, 'preloading or metadata alone completed the clip')
    for (let index = 0; index < 80; index += 6) {
      audio.preloadAudioSurfaces(Array.from({ length: 6 }, (_, offset) => `different audit phrase ${index + offset}`))
    }
    assert.equal(recordings.filter(({ src }) => src).length, audio.AUDIO_PRELOAD_POLICY.maxCachedSurfaces)
    assert.equal(active.pauseCalls, 0, 'warming another scene interrupted accepted speech')
    assert.ok(active.src, 'cache eviction released the active recording')
    assert.equal(audio.preloadAudioSurfaces(['eja këtu']), 0, 'the active recording disappeared from the cache')
    active.onended()
    assert.equal(await playback, true)
    assert.equal(timers.size, 0)
    audio.setMuted(true)
    const count = recordings.length
    assert.equal(audio.preloadAudioSurfaces(['muted warmup']), 0)
    assert.equal(recordings.length, count)
  } finally {
    audio.setMuted(true)
    if (originalAudio === undefined) delete globalThis.Audio
    else globalThis.Audio = originalAudio
    globalThis.setTimeout = originalSetTimeout
    globalThis.clearTimeout = originalClearTimeout
  }
})

test('preload constructor failures stay silent and do not block a later retry', async () => {
  const originalAudio = globalThis.Audio
  const audio = await import('../../src/game/audio.js?prewarm-failure-test')
  let attempts = 0
  globalThis.Audio = class {
    constructor() { attempts++; if (attempts === 1) throw new Error('unavailable') }
    load() {}
  }
  try {
    audio.setMuted(false)
    assert.equal(audio.preloadAudioSurfaces(['retry this phrase']), 0)
    assert.equal(audio.preloadAudioSurfaces(['retry this phrase']), 1)
    assert.equal(attempts, 2)
  } finally {
    audio.setMuted(true)
    if (originalAudio === undefined) delete globalThis.Audio
    else globalThis.Audio = originalAudio
  }
})

test('action preparation shares code loading, bounds exact surfaces, and respects mute', async () => {
  let muted = true
  let codeLoads = 0
  const warmed = []
  const timingLookups = []
  const prepare = createActionPlaybackPrewarmer({
    muted: () => muted,
    loadKaraoke: async () => { codeLoads++ },
    loadTiming: async (surface) => { timingLookups.push(surface) },
    preloadAudio: (surfaces) => warmed.push(surfaces),
  })
  const surfaces = ['eja këtu', 'Eja këtu', ...Array.from({ length: 10 }, (_, index) => `exact phrase ${index}`)]
  assert.equal(await prepare(surfaces), false)
  assert.equal(codeLoads, 0)
  assert.deepEqual(warmed, [])
  assert.deepEqual(timingLookups, [])
  muted = false
  await Promise.all([prepare(surfaces), prepare(surfaces)])
  assert.equal(codeLoads, 1)
  assert.deepEqual(warmed[0], ['eja këtu', 'exact phrase 0', 'exact phrase 1', 'exact phrase 2', 'exact phrase 3', 'exact phrase 4'])
  assert.deepEqual(timingLookups, ['eja këtu', 'eja këtu'])
  assert.equal(await prepare([]), false)
})

test('a failed background component load is contained and retryable', async () => {
  let attempts = 0
  const prepare = createActionPlaybackPrewarmer({
    muted: () => false,
    loadKaraoke: async () => { if (++attempts === 1) throw new Error('download failed') },
    loadTiming: async () => null,
    preloadAudio: () => {},
  })
  assert.equal(await prepare(['exact phrase']), false)
  assert.equal(await prepare(['exact phrase']), true)
  assert.equal(attempts, 2)
})

test('a failed speculative manifest request can retry and then shares validated timings', async () => {
  const originalFetch = globalThis.fetch
  const stored = JSON.parse(readFileSync(new URL('../../public/audio/action-timings.json', import.meta.url), 'utf8'))
  let requests = 0
  globalThis.fetch = async () => ({
    ok: ++requests > 1,
    json: async () => stored,
  })
  try {
    const timings = await import('../../src/game/actionAudioTimings.js?prewarm-retry-test')
    assert.equal(await timings.actionAudioTiming('eja këtu'), null)
    await timings.actionAudioTiming('eja këtu')
    await timings.actionAudioTiming('eja këtu')
    assert.equal(requests, 2, 'a failed warmup permanently cached failure or a successful manifest was reloaded')
  } finally {
    if (originalFetch === undefined) delete globalThis.fetch
    else globalThis.fetch = originalFetch
  }
})
