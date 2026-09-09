const lower = (value) => value.toLocaleLowerCase('sq')

export const formPracticeKey = (id, surface) => `${id}::${encodeURIComponent(lower(surface))}`

export const formPracticeCount = (record, id, surface) =>
  record?.[formPracticeKey(id, surface)] || 0

// Exhaust the least-seen layer before repeating a form. Story frequency breaks
// ties so the first questions remain useful and familiar, but it can never
// starve a rarer reviewed form forever.
export function pickLeastPracticedForm(forms, id, practiced = {}, random = Math.random) {
  if (!forms.length) return null
  const least = Math.min(...forms.map((form) => formPracticeCount(practiced, id, form.al)))
  const candidates = forms.filter((form) => formPracticeCount(practiced, id, form.al) === least)
  const weights = candidates.map((form) => 1 + Math.log2((form.count || 0) + 1))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let cursor = random() * total
  for (let index = 0; index < candidates.length; index += 1) {
    cursor -= weights[index]
    if (cursor <= 0) return candidates[index]
  }
  return candidates[candidates.length - 1]
}
