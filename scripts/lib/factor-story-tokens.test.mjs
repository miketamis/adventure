import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { runInNewContext } from 'node:vm'
import { parseAst } from 'vite'
import { factorStoryTokens } from './factor-story-tokens.mjs'

const ID = 'reviewed-lexical-entry-with-a-long-name'
const SURFACE = 'sipërfaqe-e-rishikuar'
const GLOSS = 'a distinct reviewed meaning with exact spacing'
const literalCall = `wf(${JSON.stringify(ID)}, ${JSON.stringify(SURFACE)}, ${JSON.stringify(GLOSS)})`
const calls = (call = literalCall, count = 8) => Array.from({ length: count }, () => call).join(',\n')

// This helper deliberately observes argument arity and dictionary access. The
// production module has its own complete export-parity contract; these small
// fixtures isolate JavaScript behavior a value-only graph comparison misses.
const helper = `
const trace = [];
const dictionary = { meaning: 'initial default', tag: undefined };
export const wf = function (id, al, en) {
  trace.push(['wf', id, arguments.length, en === undefined ? 'undefined' : en === null ? 'null' : en]);
  return { id, al, en: en ?? dictionary.meaning, formTag: dictionary.tag };
};
`

const evaluate = (code, probe) => JSON.parse(runInNewContext(
  `"use strict";\n${code.replace(/\bexport\s+(?=(?:const\s+wf|function\s+wf)\b)/, '')}\nJSON.stringify(${probe})`,
  {}, { timeout: 2000 },
))

export function assertStoryTokenFactoringContracts(factor = factorStoryTokens, parse = parseAst) {
  let checks = 0
  const check = (name, body) => {
    try { body() } catch (error) {
      error.message = `${name}: ${error.message}`
      throw error
    }
    checks += 1
  }
  const transform = (code, options) => {
    const result = factor(code, parse(code), options)
    assert.equal(typeof result?.code, 'string', 'transform must return source text')
    assert.equal(typeof result?.stats, 'object', 'transform must report its work')
    parse(result.code)
    return result
  }
  const equivalent = (code, probe, { profitable = true } = {}) => {
    const output = transform(code)
    if (profitable) {
      assert.ok(output.stats.factories > 0, 'fixture did not exercise factoring')
      assert.ok(output.stats.replacedCalls > 0, 'fixture did not replace any calls')
      assert.ok(output.stats.estimatedSavingsBytes > 0, 'factoring reports no saving')
    }
    const expected = evaluate(code, probe)
    assert.deepEqual(evaluate(output.code, probe), expected,
      'transformed execution changed its observable result')
    return { ...output, expected }
  }

  check('fresh allocation, property shape and repeat invocation', () => {
    const code = `${helper}
      const make = () => [${calls()}];
      const first = make(), second = make();
      const shape = token => ({
        keys: Reflect.ownKeys(token),
        plain: Object.getPrototypeOf(token) === Object.prototype,
        descriptors: Object.entries(Object.getOwnPropertyDescriptors(token)).map(([key, value]) =>
          [key, value.value === undefined ? '<undefined>' : value.value,
            value.writable, value.enumerable, value.configurable]),
      });
      const originalShape = shape(first[0]);
      first[0].al = 'mutation only here';
      first[0].privateMutation = true;
      const result = {
        originalShape,
        allDistinct: new Set([...first, ...second]).size === first.length + second.length,
        otherSurface: first[1].al,
        laterSurface: second[0].al,
        leakedMutation: first.slice(1).some(token => 'privateMutation' in token)
          || second.some(token => 'privateMutation' in token),
        trace,
      };`
    const { expected } = equivalent(code, 'result')
    assert.equal(expected.allDistinct, true)
    assert.equal(expected.leakedMutation, false)
    assert.equal(expected.otherSurface, SURFACE)
    assert.equal(expected.laterSurface, SURFACE)
    assert.deepEqual(expected.originalShape.keys, ['id', 'al', 'en', 'formTag'])
    assert.deepEqual(expected.originalShape.descriptors.at(-1), ['formTag', '<undefined>', true, true, true])
    assert.equal(expected.originalShape.plain, true)
  })

  check('literal tuples preserve arity, null, meaning and Unicode', () => {
    const tuples = [
      [JSON.stringify(ID), JSON.stringify(SURFACE)],
      [JSON.stringify(ID), JSON.stringify(SURFACE), 'null'],
      [JSON.stringify(ID), JSON.stringify(SURFACE), JSON.stringify(GLOSS)],
      [JSON.stringify(ID), JSON.stringify(SURFACE), JSON.stringify(`${GLOSS} `)],
      [JSON.stringify(ID), JSON.stringify(SURFACE), JSON.stringify('another declared sense')],
      [JSON.stringify(ID), JSON.stringify('ë'), JSON.stringify(GLOSS)],
      [JSON.stringify(ID), JSON.stringify('e\u0308'), JSON.stringify(GLOSS)],
    ]
    const code = `${helper}\nconst result = [${tuples.map(args => `[${calls(`wf(${args.join(', ')})`)}]`).join(',')}];`
    const { expected } = equivalent(code, '({ result, trace })')
    assert.equal(expected.trace[0][2], 2)
    assert.equal(expected.trace[8][2], 3)
    assert.equal(expected.trace[8][3], 'null')
    assert.notEqual(expected.result[2][0].en, expected.result[3][0].en)
    assert.notEqual(expected.result[5][0].al, expected.result[6][0].al)
  })

  check('escaped literals retain their evaluated exact values', () => {
    const escaped = `wf(${JSON.stringify(ID)}, "sip\\u00ebrfaqe-e-rishikuar", ${JSON.stringify(GLOSS)})`
    const code = `${helper}\nconst result = [${calls(literalCall, 4)}, ${calls(escaped, 4)}];`
    const { expected } = equivalent(code, '({ result, trace })')
    assert.ok(expected.result.every(token => token.al === SURFACE))
  })

  check('dynamic and unsupported call forms remain intact beside real groups', () => {
    const untouched = [
      'wf(id, al, gloss)',
      `wf(${JSON.stringify(ID)}, ${JSON.stringify(SURFACE)}, undefined)`,
      `wf(${JSON.stringify(ID)}, ${JSON.stringify(SURFACE)}, void 0)`,
      'wf(...args)',
      'object.wf(...args)',
      'wf.call(null, ...args)',
      'wf?.(...args)',
      'new wf(...args)',
      `wf(${JSON.stringify(ID)}, ${JSON.stringify(SURFACE)}, ${JSON.stringify(GLOSS)}, 'extra')`,
      `wf(1, ${JSON.stringify(SURFACE)}, ${JSON.stringify(GLOSS)})`,
      `wf(${JSON.stringify(ID)}, \`literal-template\`, ${JSON.stringify(GLOSS)})`,
    ]
    const code = `${helper}
      const id = ${JSON.stringify(ID)}, al = ${JSON.stringify(SURFACE)}, gloss = ${JSON.stringify(GLOSS)};
      const args = [id, al, gloss], object = { wf };
      const dynamic = (id, al, gloss) => wf(id, al, gloss);
      const result = [${calls()}, ${untouched.join(',')}];
      result.push(dynamic(id, al, gloss));`
    const { code: output, expected } = equivalent(code, '({ result, trace })')
    for (const call of untouched) assert.ok(output.includes(call), `unsupported form changed: ${call}`)
    assert.equal(expected.trace.length, 8 + untouched.length + 1)
  })

  check('runtime calls preserve side effects, short circuiting and order', () => {
    const code = `${helper}
      const mark = value => (trace.push(['mark', value]), value);
      const run = enabled => {
        trace.push(['enter', enabled]);
        const selected = enabled ? [${calls()}] : [];
        false && ${literalCall};
        true || ${literalCall};
        const mixed = (mark('before'), ${literalCall}, mark('between'), ${literalCall}, mark('after'));
        trace.push(['exit', enabled]);
        return { selected, mixed };
      };
      const afterInitialization = trace.slice();
      const result = [run(false), run(true)];`
    const { expected } = equivalent(code, '({ afterInitialization, result, trace })')
    assert.deepEqual(expected.afterInitialization, [], 'factories must not evaluate tokens at declaration')
    assert.equal(expected.trace.filter(entry => entry[0] === 'wf').length, 12)
    assert.deepEqual(expected.trace.slice(0, 7).map(entry => entry.slice(0, 2)), [
      ['enter', false], ['mark', 'before'], ['wf', ID], ['mark', 'between'],
      ['wf', ID], ['mark', 'after'], ['exit', false],
    ])
  })

  check('dictionary defaults and form data are read on each invocation', () => {
    const defaultCall = `wf(${JSON.stringify(ID)}, ${JSON.stringify(SURFACE)})`
    const code = `${helper}
      const make = () => [${calls(defaultCall)}];
      const before = make();
      dictionary.meaning = 'changed default'; dictionary.tag = 'changed form tag';
      const after = make();`
    const { expected } = equivalent(code, '({ before, after, trace })')
    assert.equal(expected.before[0].en, 'initial default')
    assert.equal(expected.after[0].en, 'changed default')
    assert.equal(expected.after[0].formTag, 'changed form tag')
  })

  check('helper validation and errors stay at the original evaluation point', () => {
    const errorsHelper = `
      const trace = [];
      const dictionary = { [${JSON.stringify(ID)}]: { al: ${JSON.stringify(SURFACE)}, en: ${JSON.stringify(GLOSS)} } };
      export const wf = (id, al, en) => {
        trace.push(['lookup', id]);
        const entry = dictionary[id];
        if (!entry) throw new TypeError('unknown dictionary id: ' + id);
        if (en != null && en !== entry.en) throw new RangeError('undeclared sense: ' + en);
        if (al !== entry.al) throw new SyntaxError('unreviewed surface: ' + al);
        return { id, al, en: en ?? entry.en, formTag: undefined };
      };`
    const failedCalls = [
      `wf('unknown-lexical-entry-with-a-long-name', ${JSON.stringify(SURFACE)}, ${JSON.stringify(GLOSS)})`,
      `wf(${JSON.stringify(ID)}, ${JSON.stringify(SURFACE)}, 'undeclared exact meaning')`,
      `wf(${JSON.stringify(ID)}, 'an unreviewed surface', ${JSON.stringify(GLOSS)})`,
    ]
    const code = `${errorsHelper}
      const capture = (name, operation) => {
        trace.push(['before', name]);
        try { operation(); trace.push(['unexpected success', name]); }
        catch (error) { trace.push(['caught', error.name, error.message]); }
        trace.push(['after', name]);
      };
      const operations = [${failedCalls.map((call, index) => `() => capture(${index}, () => [${calls(call)}])`).join(',')}];
      const beforeExecution = trace.slice();
      operations.forEach(operation => operation());
      const make = () => [${calls()}];
      capture('valid', make);
      delete dictionary[${JSON.stringify(ID)}];
      capture('removed later', make);`
    const { expected } = equivalent(code, '({ beforeExecution, trace })')
    assert.deepEqual(expected.beforeExecution, [])
    assert.equal(expected.trace.filter(entry => entry[0] === 'caught').length, 4)
    assert.deepEqual(expected.trace.slice(0, 4), [
      ['before', 0], ['lookup', 'unknown-lexical-entry-with-a-long-name'],
      ['caught', 'TypeError', 'unknown dictionary id: unknown-lexical-entry-with-a-long-name'], ['after', 0],
    ])
    assert.deepEqual(expected.trace.at(-2), ['caught', 'TypeError', `unknown dictionary id: ${ID}`])
  })

  check('unbound or differently bound modules are identity operations', () => {
    const inputs = [
      `const wf = value => value; const result = [${calls()}];`,
      `import { wf } from './other-module.js'; const result = [${calls()}];`,
      `import wf from './other-module.js'; const result = [${calls()}];`,
      'const unrelated = { wf: 1 };',
    ]
    for (const code of inputs) {
      const output = transform(code)
      assert.equal(output.code, code)
      assert.equal(output.stats.factories, 0)
      assert.equal(output.stats.replacedCalls, 0)
      assert.equal(output.stats.reason, 'no-canonical-binding')
    }
  })

  check('shadow bindings fail closed without guessing identifier meaning', () => {
    const bindings = [
      'function nested(wf) { return wf; }',
      'function nested({ wf }) { return wf; }',
      'function nested({ other: wf }) { return wf; }',
      'function nested({ wf = null }) { return wf; }',
      'function nested([wf]) { return wf; }',
      'function nested(...wf) { return wf; }',
      'function nested() { var wf; return wf; }',
      '{ let wf; }',
      '{ const { other: wf } = {}; }',
      '{ const [wf] = []; }',
      '{ const { ...wf } = {}; }',
      'try {} catch (wf) {}',
      'try {} catch ({ wf }) {}',
      'const named = function wf() {};',
      'const named = class wf {};',
      'function nested() { function wf() {} }',
      'function nested() { class wf {} }',
    ]
    for (const binding of bindings) {
      const code = `${helper}\n${binding}\nconst result = [${calls()}];`
      assert.throws(() => transform(code), /wf.*(?:scope|bind|shadow)|(?:scope|bind|shadow).*wf/i,
        `scope safety missed ${binding}`)
    }
  })

  check('unrelated property names and import names do not become bindings', () => {
    const code = `import { wf as externalWf } from './other-module.js';\n${helper}
      const { wf: external } = { wf: 42 };
      const object = { wf() { return 'method'; }, get value() { return this.wf(); } };
      const result = [${calls()}];`
    const output = transform(code)
    assert.ok(output.stats.factories > 0)
    assert.ok(output.code.includes('import { wf as externalWf }'))
    assert.ok(output.code.includes('const { wf: external }'))
    assert.ok(output.code.includes("wf() { return 'method'; }"))
  })

  check('generated names cannot capture local identifiers', () => {
    const code = `${helper}\nconst make = () => [${calls()}];`
    const first = transform(code)
    const topNames = ast => ast.body.flatMap(statement =>
      statement.type === 'VariableDeclaration' ? statement.declarations.map(entry => entry.id.name).filter(Boolean)
        : statement.type === 'FunctionDeclaration' ? [statement.id.name] : [])
    const originalNames = new Set(topNames(parse(code)))
    const generatedNames = topNames(parse(first.code)).filter(name => !originalNames.has(name))
    assert.ok(generatedNames.length > 0, 'no generated factory declaration inspected')
    const collisions = generatedNames.map(name => `const ${name} = 'local sentinel';`).join('\n')
    const collidingCode = `${helper}
      function make() { ${collisions} return [${calls()}]; }
      const result = make();`
    const output = equivalent(collidingCode, '({ result, trace })')
    for (const name of generatedNames) assert.ok(output.code.includes(`const ${name} = 'local sentinel'`))
  })

  check('declaration insertion preserves early calls and helper initialization', () => {
    const beforeBuilder = `const beforeBuilder = () => [${calls()}];\n${helper}
      const before = beforeBuilder();
      const after = [${calls()}];`
    const deferred = equivalent(beforeBuilder, '({ before, after, trace })')
    assert.equal(deferred.stats.earlyCalls, 8)
    assert.ok(deferred.code.includes(`const beforeBuilder = () => [${calls()}]`))

    const multiple = `export const wf = (id, al, en) => ({ id, al, en }), eager = [${calls()}];`
    assert.throws(() => transform(multiple), /sole.*wf|wf.*(?:sole|declar)/i,
      'factories inserted after a multi-declarator export could introduce a new TDZ')

    const noSemicolon = helper.trim().replace(/;$/, '')
    equivalent(`${noSemicolon}\n// keep the next statement independent\nconst result = [${calls()}];`,
      '({ result, trace })')
  })

  check('only the canonical const helper is supported', () => {
    // Although the literal calls are textually after the helper declaration,
    // a hoisted builder executes them earlier. Text offsets alone cannot prove
    // initialization order. Keep the declared const-only input contract even
    // when generated factory declarations themselves are hoisted.
    const code = `
      const trace = [];
      const early = run();
      export function wf(id, al, en) {
        trace.push([id, al, en]);
        return { id, al, en, formTag: undefined };
      }
      function run() { return [${calls()}]; }
      const later = run();`
    const original = evaluate(code, '({ early, later, trace })')
    assert.equal(original.early.length, 8)
    assert.equal(original.trace.length, 16)
    assert.throws(() => transform(code), /sole exported const wf/i,
      'the unsupported hoisted wf binding must fail closed')
  })

  check('early caught helper TDZ retains its exact error identity', () => {
    const code = `
      const early = run();
      ${helper}
      function run() {
        try { return { tokens: [${calls()}] }; }
        catch (error) { return { error: { name: error.name, message: error.message } }; }
      }
      const later = run();`
    const { expected } = equivalent(code, '({ early, later, trace })')
    assert.deepEqual(expected.early.error, {
      name: 'ReferenceError', message: "Cannot access 'wf' before initialization",
    })
    assert.equal(expected.later.tokens.length, 8)
    assert.equal(expected.trace.length, 8, 'failed early evaluation must not execute wf')
  })

  check('deterministic output, idempotence and profitability limits', () => {
    const code = `${helper}\nconst result = [${calls()}];`
    const first = transform(code), repeated = transform(code), second = transform(first.code)
    assert.deepEqual(repeated, first)
    assert.equal(second.code, first.code)
    assert.equal(second.stats.factories, 0)
    assert.equal(second.stats.replacedCalls, 0)
    for (const options of [{ minOccurrences: 100 }, { minSavingsBytes: 1_000_000 }]) {
      const skipped = transform(code, options)
      assert.equal(skipped.code, code)
      assert.equal(skipped.stats.factories, 0)
      assert.equal(skipped.stats.reason, 'no-profitable-groups')
    }
    assert.equal(transform(`${helper}\nconst result = ${literalCall};`).code,
      `${helper}\nconst result = ${literalCall};`)
    for (const options of [
      { minOccurrences: 1 }, { minOccurrences: 2.5 },
      { minSavingsBytes: 0 }, { minSavingsBytes: -1 },
    ]) assert.throws(() => transform(code, options), /threshold|repeated|positive/i)
  })

  return { checks }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = assertStoryTokenFactoringContracts()
  console.log(`Story token factoring: ${result.checks} allocation, evaluation and scope contracts passed.`)
}
