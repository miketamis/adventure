// Aggregate the independent release gates without hiding later evidence when
// an earlier strict gate fails. "Pass" means every claim is proven or explicitly
// reviewed inside the repository's declared source/adaptation scope; it is not
// a claim of metaphysical certainty or of access to manuscripts that do not
// survive in a usable form.
import { spawnSync } from 'node:child_process'

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const stages = [
  ['normal integrity and production build', ['run', 'check']],
  ['strict world structure', ['run', 'certify:world']],
  ['strict folklore evidence', ['run', 'certify:lore']],
  ['strict player-facing language', ['run', 'certify:language']],
  ['strict reveal semantics', ['run', 'certify:reveal']],
]

const failed = []
for (const [label, args] of stages) {
  console.log(`\n=== ${label} ===`)
  const result = spawnSync(npm, args, { stdio: 'inherit' })
  if (result.error || result.status !== 0) failed.push(label)
}

if (failed.length) {
  console.error(`\nDECLARED-SCOPE CERTIFICATION: FAIL (${failed.join('; ')})`)
  process.exitCode = 1
} else {
  console.log('\nDECLARED-SCOPE CERTIFICATION: PASS')
}
