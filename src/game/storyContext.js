import { R, p, w, wf } from './content.js'
import { civilDayPartAtClock } from './environment.js'
import {
  ENVIRONMENT_DIMENSIONS,
  authoredEnvironmentDimensions,
  normalizeEnvironmentNarrationSetting,
} from './environmentNarration.js'

export {
  ENVIRONMENT_DIMENSIONS,
  ENVIRONMENT_NARRATION_POLICY,
  ENVIRONMENT_NARRATION_SETTINGS,
  authoredEnvironmentDimensions,
  environmentNarrationSetting,
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

// Ordinary play receives one compact scene sentence, not three status readouts.
// `setting` is explicit presentation context: outside weather is still stated
// in an enclosed place, but the sentence never pretends that the traveller can
// see it through an invented window or open door.  Existing `enclosed` callers
// remain supported while scene code migrates to the named setting.
export function environmentStoryLine(environment, { setting, enclosed = false, omit = [] } = {}) {
  const time = timeAt(environment?.clock ?? 0)
  const season = SEASON[environment?.season] || SEASON.spring
  const weather = WEATHER[environment?.weather] || WEATHER.clear
  const omitted = normalizedOmissions(omit)
  const resolvedSetting = normalizeEnvironmentNarrationSetting(setting, { enclosed })
  const includesCircumstance = !omitted.has('time') || !omitted.has('season')
  const includesWeather = !omitted.has('weather')
  if (!includesCircumstance && !includesWeather) return null

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

export function purseStoryLine(lek) {
  const balance = Number.isSafeInteger(lek) && lek > 0 ? lek : 0
  if (!balance) return null
  return R(
    `You have ${balance} lek.`,
    w('ti'), w('ke'), p(String(balance)), lekWord(balance), p('.'),
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
