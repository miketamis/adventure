import { AUDIO_PRELOAD_POLICY, audioSlug, isMuted, preloadAudioSurfaces } from './game/audio.js'
import { actionAudioTiming } from './game/actionAudioTimings.js'

// Injectable boundaries keep the background loader testable without mounting
// karaoke or playing any audio. Production always uses the exact recorded
// surface and the same manifest loader as accepted-action playback.
export function createActionPlaybackPrewarmer({
  loadKaraoke = () => import('./components/ActionKaraoke.jsx'),
  loadTiming = actionAudioTiming,
  preloadAudio = preloadAudioSurfaces,
  muted = isMuted,
} = {}) {
  let karaokePromise = null
  return async (surfaces) => {
    if (muted() || !Array.isArray(surfaces)) return false
    const selected = new Map()
    for (const surface of surfaces) {
      if (typeof surface !== 'string' || !surface) continue
      const key = audioSlug(surface)
      if (!selected.has(key)) selected.set(key, surface)
      if (selected.size >= AUDIO_PRELOAD_POLICY.maxSurfacesPerRequest) break
    }
    if (!selected.size) return false
    const phrases = [...selected.values()]
    try {
      preloadAudio(phrases)
      if (!karaokePromise) {
        karaokePromise = Promise.resolve().then(loadKaraoke).catch((error) => {
          karaokePromise = null
          throw error
        })
      }
      // All action timings share one cached manifest. Looking up just the
      // first imminent phrase warms that complete validated source once.
      await Promise.all([karaokePromise, loadTiming(phrases[0])])
      return true
    } catch {
      return false
    }
  }
}

export const prewarmActionPlayback = createActionPlaybackPrewarmer()
