// Static-source guard for the two public dictionary ledgers.
//
// JavaScript accepts duplicate object keys and silently keeps the last value,
// so inspecting the imported DICT/DEFS objects cannot reveal that an earlier
// entry was overwritten. This audit reads the authored object literals and
// rejects repeated top-level keys before runtime erases the evidence.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = new URL('../', import.meta.url)

function topLevelProperties(source, exportName) {
  const marker = new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*\\{`, 'm')
  const match = marker.exec(source)
  if (!match) throw new Error(`Could not locate exported object ${exportName}`)

  const open = source.indexOf('{', match.index)
  const entries = []
  let depth = 0
  let line = source.slice(0, open).split('\n').length
  let expectProperty = false
  let quote = null
  let blockComment = false

  for (let index = open; index < source.length; index += 1) {
    const char = source[index]
    const next = source[index + 1]

    if (char === '\n') {
      line += 1
      continue
    }

    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false
        index += 1
      }
      continue
    }

    if (quote) {
      if (char === '\\') index += 1
      else if (char === quote) quote = null
      continue
    }

    if (char === '/' && next === '*') {
      blockComment = true
      index += 1
      continue
    }
    if (char === '/' && next === '/') {
      const newline = source.indexOf('\n', index)
      if (newline === -1) break
      index = newline - 1
      continue
    }
    if (depth === 1 && expectProperty) {
      if (/\s/.test(char)) continue
      const property = /^(?:([A-Za-z_$][\w$]*)|(['"])((?:\\.|(?!\2).)*)\2)\s*:/.exec(source.slice(index))
      if (property) {
        entries.push({ key: property[1] || property[3], line })
        expectProperty = false
        index += property[0].length - 1
        continue
      }
      // A spread or another unsupported top-level construct is not a property
      // declaration. Resume at the next root comma without mistaking values
      // for keys.
      expectProperty = false
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char
      continue
    }

    if (char === '{') {
      depth += 1
      if (depth === 1) expectProperty = true
    }
    else if (char === '}') {
      depth -= 1
      if (depth === 0) return entries
    } else if (char === ',' && depth === 1) {
      expectProperty = true
    }
  }

  throw new Error(`Could not find the closing brace for exported object ${exportName}`)
}

function duplicateProperties(file, exportName) {
  const path = fileURLToPath(new URL(file, ROOT))
  const source = readFileSync(path, 'utf8')
  const entries = topLevelProperties(source, exportName)
  const owners = new Map()
  for (const entry of entries) {
    const rows = owners.get(entry.key) || []
    rows.push(entry.line)
    owners.set(entry.key, rows)
  }
  return {
    count: entries.length,
    duplicates: [...owners].filter(([, lines]) => lines.length > 1),
  }
}

const ledgers = [
  ['src/game/dictionary.js', 'DICT'],
  ['src/game/content.js', 'DEFS'],
]

const failures = []
let total = 0
for (const [file, exportName] of ledgers) {
  const result = duplicateProperties(file, exportName)
  total += result.count
  for (const [key, lines] of result.duplicates) {
    failures.push(`${exportName}.${key} is declared more than once in ${file} (lines ${lines.join(', ')})`)
  }
}

if (failures.length) {
  console.error(`Dictionary source integrity failed (${failures.length}):`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`✓ ${total} authored DICT/DEFS entries have unique top-level keys.`)
