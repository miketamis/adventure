import { lazy } from 'react'

// A fulfilled import can render synchronously, including its first use. React's
// lazy wrapper alone still suspends once when given an already-resolved promise.
export function preloadedView(importModule) {
  let module = null
  let pending = null
  const load = () => {
    if (module) return Promise.resolve(module)
    if (!pending) pending = importModule().then((loaded) => {
      module = loaded
      return loaded
    }, (error) => {
      pending = null
      throw error
    })
    return pending
  }
  const LazyView = lazy(load)
  const View = (props) => {
    const Component = module?.default || LazyView
    return <Component {...props} />
  }
  View.preload = load
  View.peek = () => module
  return View
}

// Give the current interaction its paint first. Cancel work that has not begun
// when its source changes; long-running preparation yields between targets.
export function afterPaint(work) {
  let timer = null
  const frame = requestAnimationFrame(() => {
    timer = setTimeout(work, 0)
  })
  return () => {
    cancelAnimationFrame(frame)
    if (timer !== null) clearTimeout(timer)
  }
}
