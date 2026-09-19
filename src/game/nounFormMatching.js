import { DICT } from './dictionary.js'
import { isTrainableSense } from './lexicalTrainability.js'

export const NOUN_FORM_MATCHING_VARIANT = Object.freeze({
  id: 'same-root-grammar-matching',
  label: 'One noun · match reviewed uses to grammatical jobs',
  pairCount: 5,
  boardPolicy: 'one reviewed noun root; five distinct contextual roles; no fluent English sentence gloss',
})

const ROLE_BANDS = Object.freeze([
  Object.freeze(['indefNom', 'indefAcc']),
  Object.freeze(['defNom']),
  Object.freeze(['defAcc']),
  Object.freeze(['indefDat', 'ablIndef', 'defDat']),
  Object.freeze(['plIndef', 'plDef', 'plDat', 'plAbl']),
])

const normalizedToken = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '')

const markedTargetIndex = (form) => {
  const expected = normalizedToken(form?.surface)
  const indices = String(form?.context?.al || '').split(/\s+/u).flatMap((token, index) =>
    normalizedToken(token) === expected ? [index] : [])
  return indices.length === 1 ? indices[0] : -1
}

const rowGate = (form, discovered) => {
  if (form?.wordClass !== 'noun' || !form.context?.al || !form.roleLabel) return null
  const requires = Array.isArray(form.context.requires) ? [...new Set(form.context.requires)] : null
  if (!requires || requires.some((id) => !DICT[id])) return null
  const missingIds = requires.filter((id) => id !== form.id && isTrainableSense(id) && !discovered.has(id))
  const targetTokenIndex = markedTargetIndex(form)
  if (missingIds.length || targetTokenIndex < 0) return null
  return {
    id: form.key,
    formKey: form.key,
    surface: form.surface,
    role: form.role,
    roleLabel: form.roleLabel,
    gloss: form.gloss,
    context: form.context.al,
    targetTokenIndex,
    requiredIds: requires.filter((id) => id !== form.id && isTrainableSense(id)),
  }
}

const chooseRows = (eligible, currentRound = 0) => {
  const chosen = []
  const usedKeys = new Set()
  const usedLabels = new Set()
  const add = (row) => {
    if (!row || usedKeys.has(row.formKey) || usedLabels.has(row.roleLabel)) return false
    chosen.push(row)
    usedKeys.add(row.formKey)
    usedLabels.add(row.roleLabel)
    return true
  }
  ROLE_BANDS.forEach((roles, bandIndex) => {
    const candidates = eligible.filter((row) => roles.includes(row.role))
    if (candidates.length) add(candidates[(currentRound + bandIndex) % candidates.length])
  })
  for (const row of eligible) {
    if (chosen.length >= NOUN_FORM_MATCHING_VARIANT.pairCount) break
    add(row)
  }
  return chosen.slice(0, NOUN_FORM_MATCHING_VARIANT.pairCount)
}

export function reviewedNounFormMatchingPlan(forms = [], discoveredIds = [], { currentRound = 0 } = {}) {
  const nounIds = [...new Set(forms.map(({ id }) => id).filter(Boolean))]
  if (nounIds.length !== 1) return null
  const discovered = new Set(discoveredIds || [])
  const eligible = forms.map((form) => rowGate(form, discovered)).filter(Boolean)
  const rows = chooseRows(eligible, currentRound)
  if (rows.length !== NOUN_FORM_MATCHING_VARIANT.pairCount) return null
  return Object.freeze({
    variant: NOUN_FORM_MATCHING_VARIANT,
    targetId: nounIds[0],
    rows: Object.freeze(rows.map(Object.freeze)),
    requiredIds: Object.freeze([...new Set(rows.flatMap(({ requiredIds }) => requiredIds))]),
  })
}
