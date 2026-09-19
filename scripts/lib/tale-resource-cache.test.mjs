import assert from 'node:assert/strict'
import { createTaleResourceCache } from '../../src/game/taleResourceCache.js'

export async function runTaleResourceCacheAssertions() {
  let loads = 0
  let finish
  const tale = { id: 'requested-tale', references: [{ citation: 'Reviewed source', url: 'https://example.test/source' }] }
  const resource = createTaleResourceCache({
    'requested-tale': () => { loads++; return new Promise((resolve) => { finish = resolve }) },
    unrelated: () => assert.fail('warming one role fetched an unrelated tale'),
  })
  assert.equal(resource.peek(tale.id), null)
  assert.equal(resource.has(tale.id), true)
  assert.equal(resource.has('constructor'), false)
  const first = resource.load(tale.id)
  const second = resource.load(tale.id)
  assert.strictEqual(second, first, 'confirmation and source notes started duplicate downloads')
  await Promise.resolve()
  assert.equal(loads, 1)
  assert.equal(resource.peek(tale.id), null, 'incomplete sources became synchronously available')
  finish({ default: tale })
  assert.strictEqual(await first, tale)
  assert.strictEqual(resource.peek(tale.id), tale, 'prepared source is not available during first render')
  assert.strictEqual(await resource.load(tale.id), tale)
  assert.equal(loads, 1)
  await assert.rejects(resource.load('missing'), /unavailable/)

  let attempt = 0
  const retry = createTaleResourceCache({
    'requested-tale': async () => {
      if (++attempt === 1) throw new Error('network failure')
      if (attempt === 2) return { default: { id: 'wrong-tale' } }
      return { default: tale }
    },
  })
  await assert.rejects(retry.load(tale.id), /network failure/)
  assert.equal(retry.peek(tale.id), null)
  await assert.rejects(retry.load(tale.id), /does not match/)
  assert.equal(retry.peek(tale.id), null, 'a mismatched tale polluted the requested role')
  assert.strictEqual(await retry.load(tale.id), tale)
  assert.equal(attempt, 3)
}
