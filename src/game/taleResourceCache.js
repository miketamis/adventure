// The same exact tale record serves role confirmation and earned source notes.
// Cache successful imports synchronously for first render; failed warmups can
// be retried without publishing a role or changing any learner/world state.
export function createTaleResourceCache(loaders) {
  const ready = new Map()
  const pending = new Map()
  const has = (id) => typeof id === 'string' && Object.hasOwn(loaders, id)
  const peek = (id) => ready.get(id) || null
  const load = (id) => {
    if (ready.has(id)) return Promise.resolve(ready.get(id))
    if (!has(id)) return Promise.reject(new Error('The requested tale is unavailable.'))
    if (!pending.has(id)) {
      const request = Promise.resolve().then(loaders[id]).then((module) => {
        const tale = module?.default
        if (!tale || tale.id !== id) throw new Error('The requested tale record does not match.')
        ready.set(id, tale)
        pending.delete(id)
        return tale
      }).catch((error) => {
        pending.delete(id)
        throw error
      })
      pending.set(id, request)
    }
    return pending.get(id)
  }
  return { has, peek, load }
}
