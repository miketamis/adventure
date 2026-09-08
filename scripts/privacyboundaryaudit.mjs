// Guard the repository boundary around private conversation research.
//
// The game may use independently authored language informed by aggregate
// findings, but raw exports, screenshots and identifying chat metadata must
// never become tracked content or a build dependency.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)

const forbiddenRoots = ['chatScreenshot/', '.private/']
const trackedPrivate = tracked.filter((file) => forbiddenRoots.some((prefix) => file === prefix.slice(0, -1) || file.startsWith(prefix)))
assert.deepEqual(trackedPrivate, [], `private research paths are tracked: ${trackedPrivate.join(', ')}`)

const ignoreFile = await readFile(new URL('../.gitignore', import.meta.url), 'utf8')
for (const path of forbiddenRoots) {
  assert.ok(ignoreFile.split(/\r?\n/).includes(path), `${path} must remain explicitly ignored`)
}

// These patterns target identifying export structure, not ordinary dialogue.
// Policy prose such as AGENTS.md may name the class of data it forbids, so the
// audit looks for timestamps and phone-shaped payloads rather than keywords.
const exportTimestamp = /\[\d{1,2}:\d{2},\s*\d{1,2}\/\d{1,2}\/\d{2,4}\]/
const internationalPhone = /(?:\+|00)\d{1,3}[\s.-](?:\d[\s.-]*){7,}/
const textExtensions = /\.(?:c?js|mjs|jsx|json|md|txt|css|html|svg|yml|yaml)$/i
const leaks = []

for (const file of tracked.filter((name) => textExtensions.test(name))) {
  const contents = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
  if (exportTimestamp.test(contents) || internationalPhone.test(contents)) leaks.push(file)
}

assert.deepEqual(leaks, [], `possible private chat metadata in tracked files: ${leaks.join(', ')}`)

console.log(`✅ privacy boundary: ${tracked.length} tracked files checked; private research roots remain ignored`)
