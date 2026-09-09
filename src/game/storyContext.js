import { R, p, w, wf } from './content.js'
import { civilDayPartAtClock } from './environment.js'

const TIME_OF_DAY = Object.freeze({
  morning: { id: 'mengjes', en: 'morning' },
  noon: { id: 'mesdite', en: 'noon' },
  afternoon: { id: 'pasdite', en: 'afternoon' },
  evening: { id: 'mbremje', en: 'evening' },
  night: { id: 'naten', al: 'natë', en: 'night' },
})

const SEASON = Object.freeze({
  spring: { id: 'pranvere', en: 'spring' },
  summer: { id: 'vere', en: 'summer' },
  autumn: { id: 'vjeshte', en: 'autumn' },
  winter: { id: 'dimer', en: 'winter' },
})

const WEATHER = Object.freeze({
  clear: {
    en: 'there are no clouds',
    tokens: () => [w('nuk'), w('ka'), w('re')],
  },
  cloud: {
    en: 'there are clouds',
    tokens: () => [w('ka'), w('re')],
  },
  rain: {
    en: 'it is raining',
    tokens: () => [w('po_prog'), w('bie'), w('shi')],
  },
  storm: {
    en: 'there is a storm',
    tokens: () => [w('ka'), w('stuhi')],
  },
  snow: {
    en: 'it is snowing',
    tokens: () => [w('po_prog'), w('bie'), w('bore')],
  },
})

const timeAt = (clock) => TIME_OF_DAY[civilDayPartAtClock(clock)]

const wordFor = ({ id, al, en }) => al ? wf(id, al, en) : w(id)

// Ordinary play receives this information in the same interactive prose as
// health, carried items and every other fact the traveller can act upon. An
// enclosed scene reports only the time outside: inventing sunshine or snow in
// a sealed cavern would make a technically correct clock feel physically false.
export function environmentStoryLine(environment, { enclosed = false } = {}) {
  const time = timeAt(environment?.clock ?? 0)
  if (enclosed) {
    return R(
      `Outside, it is ${time.en}.`,
      w('jashte'), p(','), w('eshte'), wordFor(time), p('.'),
    )
  }

  const season = SEASON[environment?.season] || SEASON.spring
  const weather = WEATHER[environment?.weather] || WEATHER.clear
  return R(
    `It is ${time.en}. It is ${season.en}. ${weather.en[0].toUpperCase()}${weather.en.slice(1)}.`,
    w('eshte'), wordFor(time), p('.'),
    w('eshte'), w(season.id), p('.'),
    ...weather.tokens(), p('.'),
  )
}

// Digits keep arbitrary earned balances exact; prices elsewhere in the story
// teach the common spoken number words. The currency itself remains a normal,
// discoverable Albanian token rather than returning as a HUD counter.
export function purseStoryLine(lek) {
  const balance = Number.isSafeInteger(lek) && lek > 0 ? lek : 0
  if (!balance) return null
  return R(
    `You have ${balance} lek.`,
    w('ti'), w('ke'), p(String(balance)), w('lek'), p('.'),
  )
}
