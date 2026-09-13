const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const REVIEWED_FORM_ODD_ONE_OUT_VARIANT = deepFreeze({
  id: 'reviewed-form-odd-one-out',
  label: 'Find the noun form that does not belong',
  choiceRange: [4, 4],
  matchingOptions: 3,
  oddOptions: 1,
  subvariants: [
    { id: 'number-odd-one-out', contrast: 'number', labels: ['singular', 'plural'] },
    { id: 'definiteness-odd-one-out', contrast: 'definiteness', labels: ['indefinite', 'definite'] },
  ],
})

const SINGULAR_ROLES = new Set([
  'indefNom', 'indefAcc', 'indefDat', 'ablIndef',
  'defNom', 'defAcc', 'defDat', 'defDatTosk', 'voc',
])
const PLURAL_ROLES = new Set(['plIndef', 'plDef', 'plDat', 'plAbl'])
const lower = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')

export const reviewedFormNumber = (role) =>
  SINGULAR_ROLES.has(role) ? 'singular' : PLURAL_ROLES.has(role) ? 'plural' : null

const DEFINITE_ROLES = new Set(['defNom', 'defAcc', 'defDat', 'defDatTosk', 'plDef', 'plDat'])
const INDEFINITE_ROLES = new Set(['indefNom', 'indefAcc', 'indefDat', 'ablIndef', 'plIndef', 'plAbl'])
export const reviewedFormDefiniteness = (role) =>
  DEFINITE_ROLES.has(role) ? 'definite' : INDEFINITE_ROLES.has(role) ? 'indefinite' : null

const CONTRASTS = Object.freeze([
  { id: 'definiteness-odd-one-out', dimension: 'definiteness', classify: reviewedFormDefiniteness },
  { id: 'number-odd-one-out', dimension: 'number', classify: reviewedFormNumber },
])

// A surface is usable only when every reviewed role carrying that spelling
// agrees on the selected dimension. Albanian syncretism is real; a spelling
// spanning both categories must never be scored as an unambiguous exception.
const planForContrast = (forms, target, contrast) => {
  if (!target || target.wordClass !== 'noun') return null
  const bySurface = new Map()
  for (const form of forms) {
    if (form.wordClass !== 'noun') continue
    const category = contrast.classify(form.role)
    if (!category) continue
    const key = lower(form.surface)
    const row = bySurface.get(key) || { surface: form.surface, forms: [], categories: new Set() }
    row.forms.push(form)
    row.categories.add(category)
    bySurface.set(key, row)
  }
  const targetRow = bySurface.get(lower(target.surface))
  const targetCategory = contrast.classify(target.role)
  if (!targetCategory || !targetRow || targetRow.categories.size !== 1 || !targetRow.categories.has(targetCategory)) return null

  const labels = contrast.dimension === 'number' ? ['singular', 'plural'] : ['indefinite', 'definite']
  const matchingCategory = labels.find((label) => label !== targetCategory)
  const matchingRows = [...bySurface.values()].filter((row) =>
    lower(row.surface) !== lower(target.surface) &&
    row.categories.size === 1 &&
    row.categories.has(matchingCategory),
  )
  if (matchingRows.length < REVIEWED_FORM_ODD_ONE_OUT_VARIANT.matchingOptions) return null

  return {
    variantId: REVIEWED_FORM_ODD_ONE_OUT_VARIANT.id,
    subvariantId: contrast.id,
    dimension: contrast.dimension,
    target,
    targetCategory,
    matchingCategory,
    prompt: `Which Albanian noun form is not ${matchingCategory}?`,
    answerValue: target.key,
    rows: [
      { value: target.key, surface: target.surface, role: target.role, category: targetCategory, odd: true },
      ...matchingRows.slice(0, REVIEWED_FORM_ODD_ONE_OUT_VARIANT.matchingOptions).map((row) => ({
        value: row.forms[0].key,
        surface: row.surface,
        role: row.forms[0].role,
        category: matchingCategory,
        odd: false,
      })),
    ],
  }
}

export function reviewedFormOddOneOutPlans(forms = [], target = null) {
  return CONTRASTS.map((contrast) => planForContrast(forms, target, contrast)).filter(Boolean)
}

export function reviewedFormOddOneOutPlan(forms = [], target = null, { currentRound = 0 } = {}) {
  const plans = reviewedFormOddOneOutPlans(forms, target)
  return plans.length ? plans[Math.max(0, currentRound) % plans.length] : null
}
