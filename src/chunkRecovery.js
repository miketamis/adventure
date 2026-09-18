import { lazy } from 'react'

// Every playable view is a hash-named chunk fetched on demand. A GitHub Pages
// deploy replaces those files, so a tab opened before the deploy asks for a
// chunk the new build no longer serves and the import rejects — the recovery
// card the release boundary then shows is the symptom playtesters hit. The
// build writes its commit to version.json; when the deployed commit has moved
// past this tab's build, a reload pulls the new index and its renamed chunks.
// Saved progress lives in localStorage, so the reload resumes the same view.
const BUILD_COMMIT = typeof __BUILD_COMMIT__ === 'string' ? __BUILD_COMMIT__ : 'development'
const RELOAD_MARK_KEY = 'aventura.chunk-reload.v1'

const deployedBuildMoved = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}version.json`, { cache: 'no-store' })
    if (!response.ok) return false
    const { commit } = await response.json()
    return typeof commit === 'string' && commit !== BUILD_COMMIT
  } catch {
    return false
  }
}

// Reload at most once per build so a genuinely broken chunk — one the current
// build never shipped — cannot spin the tab in a reload loop.
const reloadForFreshBuild = () => {
  try {
    if (window.sessionStorage.getItem(RELOAD_MARK_KEY) === BUILD_COMMIT) return false
    window.sessionStorage.setItem(RELOAD_MARK_KEY, BUILD_COMMIT)
  } catch {
    /* a blocked store still lets the reload below run */
  }
  window.location.reload()
  return true
}

const recoverIfBuildMoved = async () => (await deployedBuildMoved()) && reloadForFreshBuild()

// Retry a failed view import once for a transient network blip. If it fails
// again, reload when a newer build is live; otherwise let the error boundary
// present its recovery card.
export const importChunk = (load) => load().catch(() => load().catch(async (error) => {
  if (await recoverIfBuildMoved()) return new Promise(() => {})
  throw error
}))

export const lazyView = (load) => lazy(() => importChunk(load))

// Vite raises vite:preloadError when a module preload cannot load, which a
// deploy makes happen for any on-demand import. Drive the same guarded reload
// so on-demand data and modals recover too, not just the routed views. The
// event is left un-prevented, so each import still rejects into its own handler.
export const installChunkRecovery = () => {
  if (typeof window === 'undefined') return
  window.addEventListener('vite:preloadError', () => { void recoverIfBuildMoved() })
}
