// Pure, player-facing wording for generalized story mechanics. Keeping these
// translations out of StoryView lets audits exercise every engine reason even
// when shipped content does not happen to render one in a particular build.

export function formatRouteDuration(hours) {
  if (!Number.isSafeInteger(hours) || hours < 0) return 'an unknown time'
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  const remainder = hours % 24
  return remainder ? `${days}d ${remainder}h` : `${days}d`
}

export function formatCivilHour(hour) {
  return Number.isInteger(hour) && hour >= 0 && hour <= 23
    ? `${String(hour).padStart(2, '0')}:00`
    : null
}

// Whole-line English is editorial/debug metadata. Ordinary play must make the
// learner understand the Albanian sentence from its known words and context;
// showing the completed translation underneath would give that answer away.
// Keep the line key in the signature because StoryView uses stable synthetic
// keys for context lines as well as numeric keys for authored story lines.
export function storyReadingVisible(lineKey, debug = false) {
  return Boolean(debug)
}

// Complete action readings are answer keys too. The selectable Albanian and
// its discoverable word glosses remain available in ordinary play, while the
// fluent English action is reserved for the editorial/debug inspector.
export function optionReadingVisible(debug = false) {
  return Boolean(debug)
}

export function interactionLockText(availability) {
  if (availability?.ok !== false) return null
  if (availability.reason === 'cooldown') {
    return `ready in ${formatRouteDuration(availability.remainingHours)}`
  }
  if (availability.reason === 'invalid') return 'interaction is unavailable'
  if (availability.reason === 'unbound-tale') return 'available only inside its tale'
  if (availability.reason === 'unbound-scene') return 'available only inside its scene'

  const scope = availability.spec?.scope
  if (scope === 'day') return 'already done today'
  if (scope === 'scene') return 'already done here'
  if (scope === 'tale') return 'already done in this tale'
  return 'already done this run'
}

export function effectLockText(availability, itemLabel = (id) => id) {
  if (availability?.ok !== false) return null
  if (availability.reason === 'insufficient-lek') {
    return `need ${availability.need} more lek`
  }
  if (availability.reason === 'missing-item') {
    return `need ${availability.need} ${itemLabel(availability.itemId)}`
  }
  if (availability.reason === 'fixture-out-of-reach') return 'you must be beside it'
  if (availability.reason === 'invalid-effect') return 'action is unavailable'
  if (availability.reason !== 'fixture-state') return 'the world is not ready for that'

  if (availability.action === 'activate') return 'it is already lit'
  if (availability.action === 'extinguish') {
    return availability.fixtureStage == null ? 'it has not been lit' : 'it is already out'
  }
  if (availability.action === 'refuel' && availability.fixtureStage == null) {
    return 'light it before refuelling'
  }
  return 'it cannot be changed in its current state'
}

export function sceneAnnouncement({ ending, title, summary, loreHidden = false }) {
  if (!ending) return `New scene. ${summary}`
  const kind = ending === 'bad'
    ? 'Bad fate reached'
    : ending === 'secret'
      ? 'Secret ending reached'
      : 'Achievement ending reached'
  const named = title ? `${kind}: ${title}.` : `${kind}.`
  return loreHidden
    ? `${named} Complete the comprehension test to reveal its tale.`
    : `${named} ${summary}`
}
