import { albanianTextOf, alignedEnglishOf } from '../../language.js'

// Runtime formatting stays separate from the large address-pinned editorial
// registry. Reducer-side canonical action validation may use these helpers,
// while the complete reviewed corpus remains behind StoryView's lazy boundary.
const terminalPunctuation = /[.!?…][”»"]?$/

export function normalizeOptionEnglish(text, albanian = '') {
  let out = String(text || '').replace(/\s+/g, ' ').trim()
  if (!out) return ''
  out = out.replace(/[A-Za-z]/, (letter) => letter.toUpperCase())
  if (!terminalPunctuation.test(out)) {
    const al = String(albanian || '').trim()
    out += al.endsWith('?') ? '?' : al.endsWith('!') ? '!' : '.'
  }
  return out
}

export function optionEnglishReadingOf(tokens) {
  if (tokens?.optionReading) return tokens.optionReading
  return normalizeOptionEnglish(alignedEnglishOf(tokens), albanianTextOf(tokens))
}

// Dynamic item distractors are intentionally absurd, but never malformed.
// The action is constrained to one verb plus one known item, so the audit can
// exhaust every possible rendering without pretending these generated traps
// received the same address-pinned review as static story actions.
export function dynamicItemConfuserEnglish(item, action) {
  const name = String(item?.name || '').trim()
  if (!name) throw new Error('Dynamic item confuser has no item name')
  if (!['drink', 'fight'].includes(action))
    throw new Error(`Dynamic item confuser has unsupported action: ${action}`)
  const object = /^(?:a|an|the)\b/i.test(name)
    ? name
    : `the ${name[0].toLocaleLowerCase('en')}${name.slice(1)}`
  return `${action === 'fight' ? 'Fight' : 'Drink'} ${object}.`
}
