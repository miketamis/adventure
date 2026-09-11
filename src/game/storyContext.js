import { R, p, w, wf } from './content.js'
import { civilDayPartAtClock } from './environment.js'
import {
  ENVIRONMENT_DIMENSIONS,
  authoredEnvironmentDimensions,
  planEnvironmentNarration,
  normalizeEnvironmentNarrationSetting,
} from './environmentNarration.js'

export {
  ENVIRONMENT_DIMENSIONS,
  ENVIRONMENT_NARRATION_POLICY,
  ENVIRONMENT_NARRATION_SETTINGS,
  authoredEnvironmentDimensions,
  environmentNarrationSetting,
  planEnvironmentNarration,
} from './environmentNarration.js'

const TIME_OF_DAY = Object.freeze({
  morning: { id: 'mengjes', en: 'morning' },
  noon: { id: 'mesdite', en: 'noon' },
  afternoon: { id: 'pasdite', en: 'afternoon' },
  evening: { id: 'mbremje', en: 'evening' },
  night: { id: 'naten', al: 'natë', en: 'night' },
})

const SEASON = Object.freeze({
  spring: { id: 'pranvere', en: 'spring', descriptor: 'pranvere' },
  summer: { id: 'vere', en: 'summer', descriptor: 'vere' },
  autumn: { id: 'vjeshte', en: 'autumn', descriptor: 'vjeshte' },
  winter: { id: 'dimer', en: 'winter', descriptor: 'dimri' },
})

const WEATHER = Object.freeze({
  clear: {
    en: 'the sky is cloudless',
    tokens: (setting) => [
      wf('qiell', 'qielli', 'sky'),
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('eshte'), w('pa'), w('re'),
    ],
  },
  cloud: {
    en: 'the sky is cloudy',
    tokens: (setting) => [
      wf('qiell', 'qielli', 'sky'),
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('eshte'), w('me'), w('re'),
    ],
  },
  rain: {
    en: 'rain is falling',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('po_prog'), w('bie'), w('shi'),
    ],
  },
  storm: {
    en: 'there is a storm',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('ka'), w('stuhi'),
    ],
  },
  snow: {
    en: 'snow is falling',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('po_prog'), w('bie'), w('bore'),
    ],
  },
})

const timeAt = (clock) => TIME_OF_DAY[civilDayPartAtClock(clock)]

const wordFor = ({ id, al, en }) => al ? wf(id, al, en) : w(id)

const seasonDescriptor = (season) => wf(season.id, season.descriptor, season.en)

const normalizedOmissions = (dimensions) => {
  const declared = dimensions == null
    ? []
    : typeof dimensions === 'string'
      ? [dimensions]
      : [...dimensions]
  return new Set(declared.filter((dimension) => ENVIRONMENT_DIMENSIONS.includes(dimension)))
}

const contextTokens = (time, season, omitted) => {
  const hasTime = !omitted.has('time')
  const hasSeason = !omitted.has('season')
  if (hasTime && hasSeason) {
    return [w('ne'), wf('ky', 'këtë', 'this'), wordFor(time), seasonDescriptor(season)]
  }
  if (hasTime) return [w('ne'), wf('ky', 'këtë', 'this'), wordFor(time)]
  if (hasSeason) return [w('ne'), wf('ky', 'këtë', 'this'), w(season.id)]
  return []
}

const contextReading = (time, season, omitted) => {
  const hasTime = !omitted.has('time')
  const hasSeason = !omitted.has('season')
  if (hasTime && hasSeason) return `on this ${season.en} ${time.en}`
  if (hasTime) return `at this ${time.en}`
  if (hasSeason) return `this ${season.en}`
  return ''
}

const circumstanceTokens = (time, season, setting, omitted) => {
  const hasTime = !omitted.has('time')
  const hasSeason = !omitted.has('season')
  const tokens = setting === 'enclosed' ? [w('jashte'), w('eshte')] : [w('eshte')]
  if (hasTime && hasSeason) tokens.push(w('nje'), wordFor(time), seasonDescriptor(season))
  else if (hasTime) tokens.push(wordFor(time))
  else if (hasSeason) tokens.push(w(season.id))
  return tokens
}

const circumstanceReading = (time, season, setting, omitted) => {
  const hasTime = !omitted.has('time')
  const hasSeason = !omitted.has('season')
  const described = hasTime && hasSeason
    ? `a ${season.en} ${time.en}`
    : hasTime
      ? time.en
      : season.en
  return `It is ${described}${setting === 'enclosed' ? ' outside' : ''}.`
}

const TIME_TRANSITION = Object.freeze({
  mengjes: {
    en: 'morning begins',
    tokens: () => [wf('filloj', 'fillon', 'begins'), wf('mengjes', 'mëngjesi', 'morning')],
  },
  mesdite: {
    en: 'it is now noon',
    tokens: () => [w('tani'), w('eshte'), w('mesdite')],
  },
  pasdite: {
    en: 'it is now afternoon',
    tokens: () => [w('tani'), w('eshte'), w('pasdite')],
  },
  mbremje: {
    en: 'evening falls',
    tokens: () => [w('bie'), wf('mbremje', 'mbrëmja', 'evening')],
  },
  naten: {
    en: 'night falls',
    tokens: () => [w('bie'), wf('naten', 'nata', 'night')],
  },
})

const SEASON_TRANSITION = Object.freeze({
  pranvere: { en: 'spring begins', tokens: () => [wf('filloj', 'fillon', 'begins'), wf('pranvere', 'pranvera', 'spring')] },
  vere: { en: 'summer begins', tokens: () => [wf('filloj', 'fillon', 'begins'), wf('vere', 'vera', 'summer')] },
  vjeshte: { en: 'autumn begins', tokens: () => [wf('filloj', 'fillon', 'begins'), wf('vjeshte', 'vjeshta', 'autumn')] },
  dimer: { en: 'winter begins', tokens: () => [wf('filloj', 'fillon', 'begins'), wf('dimer', 'dimri', 'winter')] },
})

const WEATHER_TRANSITION = Object.freeze({
  clear: {
    en: 'there are no more clouds',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('tani'), w('nuk'), w('ka'), w('me_more'), w('re'),
    ],
  },
  cloud: {
    en: 'there are clouds now',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      w('tani'), w('ka'), w('re'),
    ],
  },
  rain: {
    en: 'it starts to rain',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      wf('filloj', 'fillon', 'begins'), w('te_subj'), wf('bie', 'bjerë', 'fall'), w('shi'),
    ],
  },
  storm: {
    en: 'a storm begins',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      wf('filloj', 'fillon', 'begins'), w('nje'), w('stuhi'),
    ],
  },
  snow: {
    en: 'it starts to snow',
    tokens: (setting) => [
      ...(setting === 'enclosed' ? [w('jashte')] : []),
      wf('filloj', 'fillon', 'begins'), w('te_subj'), wf('bie', 'bjerë', 'fall'), w('bore'),
    ],
  },
})

const environmentTransitionLine = (time, season, weatherKey, setting, omitted) => {
  const clauses = []
  if (!omitted.has('time')) clauses.push(TIME_TRANSITION[time.id] || TIME_TRANSITION.naten)
  if (!omitted.has('season')) clauses.push(SEASON_TRANSITION[season.id] || SEASON_TRANSITION.pranvere)
  if (!omitted.has('weather')) clauses.push(WEATHER_TRANSITION[weatherKey] || WEATHER_TRANSITION.clear)
  const tokens = []
  clauses.forEach((clause, index) => {
    if (index > 0) tokens.push(w('dhe'))
    if (index === 0 && setting === 'enclosed') tokens.push(w('jashte'))
    tokens.push(...clause.tokens('outdoor'))
  })
  const reading = clauses.map((clause) => clause.en).join(' and ') +
    (setting === 'enclosed' ? ' outside' : '')
  return R(`${reading[0].toUpperCase()}${reading.slice(1)}.`, ...tokens, p('.'))
}

// Ordinary play receives one compact scene sentence, not three status readouts.
// `setting` is explicit presentation context: outside weather is still stated
// in an enclosed place, but the sentence never pretends that the traveller can
// see it through an invented window or open door.  Existing `enclosed` callers
// remain supported while scene code migrates to the named setting.
export function environmentStoryLine(environment, {
  setting,
  enclosed = false,
  omit = [],
  transitionFrom,
} = {}) {
  const time = timeAt(environment?.clock ?? 0)
  const season = SEASON[environment?.season] || SEASON.spring
  const weather = WEATHER[environment?.weather] || WEATHER.clear
  const omitted = normalizedOmissions(omit)
  const resolvedSetting = normalizeEnvironmentNarrationSetting(setting, { enclosed })
  const includesCircumstance = !omitted.has('time') || !omitted.has('season')
  const includesWeather = !omitted.has('weather')
  if (!includesCircumstance && !includesWeather) return null
  const includedDimensions = ENVIRONMENT_DIMENSIONS.filter((dimension) => !omitted.has(dimension))
  const isEstablishedTransition = transitionFrom != null && includedDimensions.every(
    (dimension) => typeof transitionFrom?.[dimension] === 'string',
  )
  if (isEstablishedTransition) {
    return environmentTransitionLine(
      time,
      season,
      environment?.weather || 'clear',
      resolvedSetting,
      omitted,
    )
  }

  if (!includesWeather) {
    return R(
      circumstanceReading(time, season, resolvedSetting, omitted),
      ...circumstanceTokens(time, season, resolvedSetting, omitted), p('.'),
    )
  }

  const context = contextTokens(time, season, omitted)
  const weatherTokens = weather.tokens(resolvedSetting)
  const readingContext = contextReading(time, season, omitted)
  const weatherReading = `${weather.en[0].toUpperCase()}${weather.en.slice(1)}`
  if (!context.length) return R(`${weatherReading}.`, ...weatherTokens, p('.'))
  return R(
    `${readingContext[0].toUpperCase()}${readingContext.slice(1)}, ${weather.en}.`,
    ...context, p(','), ...weatherTokens, p('.'),
  )
}

// Digits keep arbitrary earned balances exact; prices elsewhere in the story
// teach the common spoken number words. The currency itself remains a normal,
// discoverable Albanian token rather than returning as a HUD counter.
const lekWord = (balance) => balance === 1 ? w('lek') : wf('lek', 'lekë', 'lek')

export function purseStoryLine(lek, { includeEmpty = false } = {}) {
  const balance = Number.isSafeInteger(lek) && lek > 0 ? lek : 0
  if (!balance) {
    return includeEmpty
      ? R('You have no money on you.', w('ti'), w('nuk'), w('ke'), w('para_money'), w('me'), wf('vete', 'vete', 'self'), p('.'))
      : null
  }
  return R(
    `You have ${balance} lek.`,
    w('ti'), w('ke'), p(String(balance)), lekWord(balance), p('.'),
  )
}

const catalogToken = (item, fallbackId) => {
  const wordId = item?.word || fallbackId
  // A catalog label may be a multiword display name ("çaj mali") while the
  // item points at one trainable headword (çaj). Do not forge that whole label
  // as an inflected surface of the headword; use the reviewed lemma unless the
  // catalog supplies one genuine single-word form.
  return item?.al && !/\s/u.test(item.al)
    ? wf(wordId, item.al, item.name?.toLowerCase() || wordId)
    : w(wordId)
}

const listedCatalogTokens = (catalog, ids) => ids.flatMap((id, index) => [
  ...(index > 0 ? [w('dhe')] : []),
  catalogToken(catalog[id], id),
])

export function heldItemsStoryLine(catalog, ids) {
  const held = [...new Set(ids || [])].filter((id) => catalog?.[id])
  if (!held.length) return null
  const names = held.map((id) => catalog[id].name || id)
  return R(
    `You have ${names.join(' and ')} with you.`,
    wf('me', 'Me', 'with'), wf('vete', 'vete', 'self'), w('ke'),
    ...listedCatalogTokens(catalog, held), p('.'),
  )
}

export function removedItemsStoryLine(catalog, ids) {
  const removed = [...new Set(ids || [])].filter((id) => catalog?.[id])
  if (!removed.length) return null
  const names = removed.map((id) => catalog[id].name || id)
  const removedTokens = removed.length === 1
    ? [...listedCatalogTokens(catalog, removed), w('me'), wf('vete', 'vete', 'self')]
    : [
        w('me'), wf('vete', 'vete', 'self'),
        ...removed.flatMap((id, index) => [
          ...(index > 0 ? [p(',')] : []),
          w('as'), catalogToken(catalog[id], id),
        ]),
      ]
  return R(
    `You no longer have ${names.join(' or ')} with you.`,
    w('ti'), w('nuk'), w('ke'), w('me_more'),
    ...removedTokens, p('.'),
  )
}

export function companionStoryLine(catalog, ids) {
  const companions = [...new Set(ids || [])].filter((id) => catalog?.[id])
  if (!companions.length) return null
  const plural = companions.length > 1
  const names = companions.map((id) => catalog[id].name || id)
  return R(
    `${names.join(' and ')} ${plural ? 'walk' : 'walks'} with you.`,
    wf('me', 'Me', 'with'), wf('ti', 'ty', 'you'),
    wf('ec', plural ? 'ecin' : 'ecën', plural ? 'walk' : 'walks'),
    ...listedCatalogTokens(catalog, companions), p('.'),
  )
}

export function departedCompanionStoryLine(catalog, ids) {
  const companions = [...new Set(ids || [])].filter((id) => catalog?.[id])
  if (!companions.length) return null
  const plural = companions.length > 1
  const names = companions.map((id) => catalog[id].name || id)
  return R(
    `${names.join(' and ')} ${plural ? 'are' : 'is'} no longer walking with you.`,
    ...listedCatalogTokens(catalog, companions), w('nuk'),
    wf('ec', plural ? 'ecin' : 'ecën', plural ? 'walk' : 'walks'), w('me_more'),
    w('me'), wf('ti', 'ty', 'you'), p('.'),
  )
}

// A money-changing choice owns the action sentence (who paid whom and why),
// while this shared generator owns the live balance. Joining them prevents the
// next scene from saying "you have 800" before it explains where the money
// came from, and it remains exact when the player already had money.
export function moneyTransactionStoryLine(actionLine, lek) {
  if (!Array.isArray(actionLine)) return purseStoryLine(lek)
  const balance = Number.isSafeInteger(lek) && lek > 0 ? lek : 0
  const balanceTokens = balance
    ? [wf('tani', 'Tani', 'now'), w('ke'), p(String(balance)), lekWord(balance), p('.')]
    : [wf('tani', 'Tani', 'now'), w('nuk'), w('ke'), w('para_money'), w('me'), wf('vete', 'vete', 'self'), p('.')]
  const balanceReading = balance
    ? `You now have ${balance} lek.`
    : 'You now have no money on you.'
  const actionReading = actionLine.reading || ''
  return R(
    `${actionReading}${actionReading ? ' ' : ''}${balanceReading}`,
    ...actionLine,
    ...balanceTokens,
  )
}
