import { audioSlug } from './audio.js'

let manifestPromise = null
export const ACTION_TIMING_FETCH_TIMEOUT_MS = 5000

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
      : new Promise((resolve) => {
        let settled = false
        const controller = typeof AbortController === 'function' ? new AbortController() : null
        const finish = (value) => {
          if (settled) return
          settled = true
          clearTimeout(timeoutId)
          resolve(value)
        }
        const timeoutId = setTimeout(() => {
          controller?.abort()
          finish(null)
        }, ACTION_TIMING_FETCH_TIMEOUT_MS)
        Promise.resolve(fetch(actionTimingUrl(), controller ? { signal: controller.signal } : undefined))
          .then((response) => response.ok ? response.json() : null)
          .then(finish, () => finish(null))
      })
  }
  return manifestPromise
}

export async function actionAudioTiming(al) {
  const manifest = await loadManifest()
  if (manifest?.method !== 'azure-word-boundary-correlated-to-stored-mp3') return null
  const timing = manifest?.entries?.[audioSlug(al)] || null
  if (!timing) return null
  return timing
}
