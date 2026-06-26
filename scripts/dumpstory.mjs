// Dump each node's rendered Albanian + English gloss for lore review.
// Run: node scripts/dumpstory.mjs
import { STORY, START_NODE, lineOf } from '../src/game/content.js'

const al = (toks) => toks.map((t) => t.al ?? t.en).join(' ').replace(/ ([.,!?:;])/g, '$1')
const en = (toks) => toks.map((t) => t.en).join(' ').replace(/ ([.,!?:;])/g, '$1')

const lines = []
for (const [id, n] of Object.entries(STORY)) {
  const tag = n.end ? `[END:${n.end}]` : ''
  lines.push(`\n### ${id} ${tag}${n.title ? ' — ' + n.title : ''}`)
  for (const e of n.text) {
    const cond = Array.isArray(e) ? '' : ` [${e.negate ? 'unless' : 'when'}:${e.cond}]`
    const line = lineOf(e)
    lines.push(`  AL:${cond} ${al(line)}`)
    lines.push(`  EN:${cond} ${en(line)}`)
  }
  if (n.blurb) lines.push(`  BLURB: ${n.blurb}`)
  for (const o of n.options || []) {
    if (o.confuser) continue
    const gate = [o.requires && `req:${o.requires}`, o.consumes && `use:${o.consumes}`, o.grant && `get:${o.grant}`, o.secret && 'secret'].filter(Boolean).join(',')
    lines.push(`  > "${en(o.text)}" -> ${o.to}${gate ? ' ['+gate+']' : ''}`)
  }
}
console.log(`START = ${START_NODE}`)
console.log(lines.join('\n'))
