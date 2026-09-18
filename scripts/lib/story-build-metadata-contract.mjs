import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import * as directionConditions from '../../src/game/groundedDirectionConditions.js'
import { authoredPlayerAction } from '../../src/game/playerActionRuntime.js'

const visit = (node, callback) => {
  if (!node || typeof node !== 'object') return
  callback(node)
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((child) => visit(child, callback))
    else if (value && typeof value.type === 'string') visit(value, callback)
  }
}

export function assertConversationPurposeDeferral(content, transformer, parseAst, bootstrapSource = null) {
  const declarations = [], prerequisites = [], purposes = []
  visit(parseAst(content), (node) => {
    if (node.type === 'VariableDeclarator' && /^ELIRA_ERRAND_.*FLAGS?$/.test(node.id?.name || '')) {
      prerequisites.push(`const ${content.slice(node.start, node.end)};`)
    }
    if (node.type !== 'VariableDeclarator' || node.init?.callee?.name !== 'defineConversationHub') return
    declarations.push(`const ${content.slice(node.start, node.end)};`)
    const questions = node.init.arguments[0].properties.find((property) => property.key?.name === 'questions').value
    for (const question of questions.properties) {
      const purpose = question.value.properties.find((property) => (property.key?.name || property.key?.value) === 'purpose')
      if (purpose) purposes.push(purpose.value.value)
    }
  })
  assert.ok(declarations.length > 0 && purposes.length > 0, 'no source conversation notes exercised')
  const transformed = transformer.transform.call({ parse: parseAst }, declarations.join('\n'), '/src/game/content.js').code
  for (const purpose of purposes) {
    assert.ok(!transformed.includes(purpose), `conversation purpose was not stripped: ${purpose}`)
    if (bootstrapSource != null) assert.ok(!bootstrapSource.includes(purpose), `audit-only purpose reached bootstrap: ${purpose}`)
  }
  const runtime = readFileSync(new URL('../../src/game/conversationHub.js', import.meta.url), 'utf8')
    .replace(/^import .*\n/gm, '').replace(/^export /gm, '')
  const probe = `Object.values(HUBS).map(hub => ({
    ...hub,
    questions: Object.fromEntries(Object.entries(hub.questions).map(([id, {purpose, ...spec}]) => [id, spec])),
    options: Object.keys(hub.questions).flatMap(id => [
      conversationQuestionOption(hub, id, [{al:'pyet'}]),
      conversationQuestionOption(hub, id, [{al:'pyet'}], {repeatAfterOtherTopic:true, requires:'flag:ready'}),
      conversationResponseLine(hub, id, [{al:'po'}]),
    ]),
    exit: conversationExitOption(hub, [{al:'mirupafshim'}]),
  }))`
  const evaluate = (code) => JSON.parse(JSON.stringify(runInNewContext(`${runtime}\n${prerequisites.join('\n')}\n${code}\n${probe}`,
    { ...directionConditions, authoredPlayerAction })))
  assert.deepEqual(evaluate(transformed), evaluate(declarations.join('\n')),
    'purpose stripping changed actual hub identities, speech, conditions, effects, or option behavior')

  const fixture = `const defineConversationHub = value => value;
    const unrelated = {purpose:'runtime purpose', nested:{purpose:'nested purpose'}};
    const hub = defineConversationHub({purpose:'top-level purpose', questions:{
      first:{purpose:'source first', speechAct:'say'},
      last:{speechAct:'ask', purpose:'source last'},
      only:{purpose:'source only'},
      purpose:{purpose:'source named purpose', metadata:{purpose:'nested topic runtime purpose'}},
      fallback:{speechAct:'tell'},
    }});
    const probe = {unrelated, hub};`
  const output = transformer.transform.call({ parse: parseAst }, fixture, '/src/game/content.js').code
  const result = JSON.parse(JSON.stringify(runInNewContext(`${output}\nprobe`)))
  assert.deepEqual(result, { unrelated: { purpose: 'runtime purpose', nested: { purpose: 'nested purpose' } },
    hub: { purpose: 'top-level purpose', questions: {
      first: { speechAct: 'say' }, last: { speechAct: 'ask' }, only: {},
      purpose: { metadata: { purpose: 'nested topic runtime purpose' } }, fallback: { speechAct: 'tell' },
    } } })
  assert.equal(transformer.transform.call({ parse: parseAst }, fixture, '/src/game/other.js'), null,
    'conversation stripping escaped its content-module boundary')
  for (const call of [
    'defineConversationHub(config)', 'defineConversationHub({}, {})', 'defineConversationHub({})',
    'defineConversationHub({questions: other})', 'defineConversationHub({questions:{...other}})',
    'defineConversationHub({questions:{q:other}})',
    'defineConversationHub({questions:{q:{purpose: buildPurpose()}}})',
    'defineConversationHub({questions:{q:{purpose:""}}})',
    'defineConversationHub({questions:{q:{purpose:1}}})',
    'defineConversationHub({questions:{q:{purpose:"a",purpose:"b"}}})',
    'defineConversationHub({questions:{q:{["purpose"]:"a"}}})',
    'defineConversationHub({questions:{q:{get purpose(){return "a"}}}})',
    'defineConversationHub({questions:{q:{...spec,purpose:"a"}}})',
  ]) assert.throws(() => transformer.transform.call({ parse: parseAst }, call, '/src/game/content.js'),
    /defineConversationHub.*requires/)
  return { hubs: declarations.length, purposes: purposes.length }
}
