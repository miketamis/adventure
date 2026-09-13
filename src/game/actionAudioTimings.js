import { audioSlug } from './audio.js'

let manifestPromise = null

export function actionTimingUrl() {
  const base = typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.BASE_URL
    : '/'
  return `${base}audio/action-timings.json`
}

function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = typeof fetch !== 'function'
      ? Promise.resolve(null)
      : fetch(actionTimingUrl())
        .then((response) => response.ok ? response.json() : null)
        .catch(() => null)
  }
  return manifestPromise
}

export async function actionAudioTiming(al) {
  const manifest = await loadManifest()
  const timing = manifest?.entries?.[audioSlug(al)] || null
  if (!timing || timing.method !== 'azure-word-boundary-correlated-to-stored-mp3') return null
  return timing
}
