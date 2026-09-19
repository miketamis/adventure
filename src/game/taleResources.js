import { createTaleResourceCache } from './taleResourceCache.js'

const modules = import.meta.glob('./data/tales/[!_]*.js')
const resources = createTaleResourceCache(Object.fromEntries(Object.entries(modules).map(([path, load]) => [
  path.slice(path.lastIndexOf('/') + 1, -3), load,
])))

export const hasTale = resources.has
export const peekTale = resources.peek
export const loadTale = resources.load
