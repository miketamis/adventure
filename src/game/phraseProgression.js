// Small, dependency-free phrase mastery contract. Keep this separate from the
// question generator so the synchronous save/reducer path does not pull Train's
// dictionary-heavy implementation into the initial application bundle.

export const PHRASE_SKILL_MAX_TIER = Object.freeze({
  production: 4,
  listening: 2,
  matching: 2,
})

export function phraseSkillTier(value, skill = 'production') {
  const max = PHRASE_SKILL_MAX_TIER[skill] ?? 0
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isSafeInteger(numeric) ? Math.max(0, Math.min(max, numeric)) : 0
}
