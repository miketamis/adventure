// A deterministic, year-aware calendar for the story world. The game begins
// on the eve of Dita e Veres so the first annual rite is reachable naturally,
// while later choices can explicitly wait for another named feast-day.
export const CALENDAR_EPOCH = Object.freeze({ year: 2026, month: 3, day: 13 })
export const SEASONS = Object.freeze(['spring', 'summer', 'autumn', 'winter'])
export const WEATHER_TYPES = Object.freeze(['clear', 'cloud', 'rain', 'storm', 'snow'])

// The story clock starts its 24-hour cycle at dawn. Keep that useful narrative
// convention internal, while every authored/displayed `atHour` is an ordinary
// civil hour: internal 0 is 06:00 and internal 18 is civil midnight. One shared
// conversion prevents the UI, festival calendar and exact-hour choices from
// each inventing a different meaning for "00:00".
export const CIVIL_HOURS_PER_DAY = 24
export const CIVIL_DAWN_HOUR = 6
export const isCivilHour = (hour) => Number.isInteger(hour) && hour >= 0 && hour < CIVIL_HOURS_PER_DAY
const positiveModulo = (value, divisor) => ((value % divisor) + divisor) % divisor
export const internalHourAtClock = (clock = 0) => positiveModulo(Math.floor(clock), CIVIL_HOURS_PER_DAY)
export const civilHourAtClock = (clock = 0) =>
  positiveModulo(internalHourAtClock(clock) + CIVIL_DAWN_HOUR, CIVIL_HOURS_PER_DAY)
export const civilDayOffsetAtClock = (clock = 0) =>
  Math.floor((Math.floor(clock) + CIVIL_DAWN_HOUR) / CIVIL_HOURS_PER_DAY)
export const internalHourForCivilHour = (civilHour) => isCivilHour(civilHour)
  ? positiveModulo(civilHour - CIVIL_DAWN_HOUR, CIVIL_HOURS_PER_DAY)
  : null

// Civil-language periods are intentionally finer than the simulation's four
// broad light phases. A 10:00 scene may be mechanically `day`, but people
// still call it morning and greet one another with mirëmëngjes. Keeping the
// shared civil-hour boundary here prevents prose and social choices from
// teaching contradictory answers.
export function civilDayPartAtClock(clock = 0) {
  const hour = civilHourAtClock(clock)
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour === 12) return 'noon'
  if (hour >= 13 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

export function greetingPeriodAtClock(clock = 0) {
  const part = civilDayPartAtClock(clock)
  if (part === 'morning') return 'morning'
  if (part === 'noon' || part === 'afternoon') return 'day'
  return part
}

export function phaseAtClock(clock = 0) {
  const hour = internalHourAtClock(clock)
  return hour < 3 ? 'dawn' : hour < 12 ? 'day' : hour < 15 ? 'dusk' : 'night'
}

export const phaseAtCivilHour = (civilHour) => {
  const internalHour = internalHourForCivilHour(civilHour)
  return internalHour == null ? null : phaseAtClock(internalHour)
}

// Earliest occurrence at or after `clock`. "At or after" is deliberate: a
// source-exact 48-hour route which already lands at its authored civil hour
// must remain 48 hours rather than silently becoming three days.
export function advanceToCivilHour(clock, civilHour) {
  if (!Number.isFinite(clock) || !isCivilHour(civilHour)) return clock
  const wholeClock = Math.floor(clock)
  const targetInternalHour = internalHourForCivilHour(civilHour)
  const delta = positiveModulo(targetInternalHour - internalHourAtClock(wholeClock), CIVIL_HOURS_PER_DAY)
  return wholeClock + delta
}

// Every lasting ending effect has a player-facing memory.  Keep these compact:
// they are ambient consequences, not a second ending blurb. `regions` says
// where the change is physically most noticeable; the complete ledger remains
// available everywhere so no completed deed turns into invisible save data.
export const WORLD_FACT_PRESENTATION = Object.freeze({
  prespaTownPreserved: { icon: '🏘️', text: "Prespa's town still stands above the water.", regions: ['lake'] },
  prespaFlooded: { icon: '🌊', text: "Prespa's lost town lies beneath the water.", regions: ['lake'] },
  prespaLakeFormed: { icon: '🌊', text: 'Lake Prespa fills its basin.', regions: ['lake'] },
  binoshetKulshedraDefeated: { icon: '⚔️', text: "The Kulshedra of Zjerma's city is dead.", regions: ['river'] },
  binoshetRiverRestored: { icon: '💧', text: "Zjerma's city river runs again.", regions: ['river'] },
  binoshetBardhakuqjaFreed: { icon: '🌿', text: "Bardhakuqja walks free in Zjerma's river city.", regions: ['river'] },
  binoshetKingdomRestored: { icon: '👑', text: "The twins' ancestral kingdom is restored under Handa's crown.", regions: ['castle'] },
  kulshedraDefeated: { icon: '⚔️', text: 'The Kulshedra below the world is dead.', regions: ['underworld', 'river'] },
  riverRestored: { icon: '💧', text: 'The freed river runs again.', regions: ['river', 'forest', 'village'] },
  droughtBroken: { icon: '🌧️', text: 'The long drought is broken.', regions: ['village', 'river', 'forest'] },
  villageWellsRestored: { icon: '🪣', text: 'Water has returned to the village wells.', regions: ['village'] },
  roadShtrigaBanished: { icon: '🌙', text: 'The night road is free of the Shtriga.', regions: ['forest', 'village'] },
  krujeKulshedraDefeated: { icon: '⚔️', text: "Krujë's Kulshedra will trouble the mountain no more.", regions: ['mountain', 'castle'] },
  rainReturned: { icon: '🌧️', text: 'The rain answered the call and returned.', regions: ['village', 'forest', 'river'] },
  fieldsWatered: { icon: '🌾', text: 'The fields are watered again.', regions: ['village'] },
  blueEyeOpened: { icon: '👁️', text: "The serpent's fallen eye runs as the Blue Eye spring.", regions: ['river'] },
  blueEyeChannelOpened: { icon: '⛏️', text: 'A hand-cut channel carries Blue Eye water toward the village.', regions: ['river', 'village'] },
  bollaSlain: { icon: '🐍', text: 'The Shëngjergj Bolla has been slain.', regions: ['river', 'village'] },
  futureDroughtPrevented: { icon: '💧', text: 'The Bolla can no longer hoard the coming waters.', regions: ['river', 'village'] },
  hailAverted: { icon: '⛈️', text: "Shurdhi's hail was turned aside.", regions: ['mountain', 'village'] },
  villageCropsProtected: { icon: '🌾', text: 'The village crops survived the hail.', regions: ['village'] },
  hearthsRelit: { icon: '🔥', text: 'Cold hearths burn again.', regions: ['village'] },
  lubiaDefeated: { icon: '⚔️', text: 'The southern Lubia is defeated.', regions: ['sea', 'lake'] },
  southernSpringsRestored: { icon: '💧', text: 'The southern springs run freely again.', regions: ['sea', 'lake'] },
  roadLugatDefeated: { icon: '🛤️', text: 'The Lugat no longer stalks the night road.', regions: ['forest', 'village'] },
  tomorrKukudhDefeated: { icon: '⛰️', text: "Tomorr's Kukudh has been driven away.", regions: ['mountain'] },
  tomorShpiragBattleScars: { icon: '⛰️', text: "Tomorr's craters and Shpirag's furrows mark the giants' last battle.", regions: ['mountain'] },
  osumBornFromBeautyTears: { icon: '💧', text: "The Osum runs below as the Earthly Beauty's tears.", regions: ['mountain', 'river'] },
  rozafaCastleRaised: { icon: '🏰', text: "Rozafa's castle wall stands and bears her name.", regions: ['castle'] },
  artaBridgeUnbuilt: { icon: '🌊', text: 'The bridge of Arta was never raised; travellers still ford the river.', regions: ['river'] },
  artaBridgeRaised: { icon: '🌉', text: 'The bridge of Arta stands over the river and trembles for its buried bride.', regions: ['river'] },
  swallowNestsProtected: { icon: '🪹', text: 'The swallow nests safely above human doorways.', regions: ['village'] },
  swallowHumanBloodRevealed: { icon: '🐍', text: 'The ship-serpent knows that human blood tastes sweetest.', regions: ['sea', 'village'] },
  zukuSightRestored: { icon: '👁️', text: "Three drops of a mountain flower restored Zuku Bajraktari's sight.", regions: ['mountain'] },
  zukuBesaAlly: { icon: '🤝', text: 'Zuku Bajraktari remembers you as a sworn friend.', regions: ['mountain'] },
  cuckooSisterBird: { icon: '🐦', text: "Gjon's grieving sister calls as the cuckoo by day.", regions: ['village', 'forest'] },
  cuckooSisterFlower: { icon: '🪻', text: "Gjon's grieving sister blooms as the blue cuckoo-flower.", regions: ['village', 'forest'] },
  coastalBalozDefeated: { icon: '⚔️', text: "The Baloz no longer comes ashore at Gjergj Elez Alia's coast.", regions: ['sea'] },
  argjiroMilkStone: { icon: '🥛', text: "Argjiro's stone still beads with milk for her surviving child.", regions: ['castle'] },
  gjirokasterArgjiroName: { icon: '🏰', text: "Gjirokastër's citadel is remembered as Argjiro's castle.", regions: ['castle'] },
  argjiroLegendUnmade: { icon: '🏳️', text: 'Argjiro was taken alive; no milk runs from the rock in this telling.', regions: ['castle'] },
  gjakovaOraSlain: { icon: '🐍', text: "The serpent-shaped ora of Gjakova's dead bazaar was slain.", regions: ['underworld'] },
  gjakovaCavernWaterFouled: { icon: '🩸', text: "Blood clouds the guarded water beneath Gjakova's cavern.", regions: ['underworld'] },
  dervishBearDefeated: { icon: '🐻', text: "The bear that hunted the dervish's parish is dead.", regions: ['forest', 'village'] },
  mujoFreedFromKrajl: { icon: '🐎', text: "Mujo is home in Jutbina; the Krajl's iron prison door lies broken.", regions: ['mountain'] },
  behuriKullaDestroyed: { icon: '🔥', text: "Behuri's kulla stands in ruins beyond the frontier pasture.", regions: ['mountain'] },
})

// Alternate tellings may all be remembered as achievements, but the living
// world can present only one outcome at a time. This complete, symmetric
// registry belongs beside the presentations it constrains; the reducer may
// consume it without knowing the lore behind each pair.
export const WORLD_FACT_INCOMPATIBLE = Object.freeze({
  prespaTownPreserved: Object.freeze(['prespaFlooded', 'prespaLakeFormed']),
  prespaFlooded: Object.freeze(['prespaTownPreserved']),
  prespaLakeFormed: Object.freeze(['prespaTownPreserved']),
  cuckooSisterBird: Object.freeze(['cuckooSisterFlower']),
  cuckooSisterFlower: Object.freeze(['cuckooSisterBird']),
  argjiroMilkStone: Object.freeze(['argjiroLegendUnmade']),
  gjirokasterArgjiroName: Object.freeze(['argjiroLegendUnmade']),
  argjiroLegendUnmade: Object.freeze(['argjiroMilkStone', 'gjirokasterArgjiroName']),
  swallowNestsProtected: Object.freeze(['swallowHumanBloodRevealed']),
  swallowHumanBloodRevealed: Object.freeze(['swallowNestsProtected']),
  artaBridgeUnbuilt: Object.freeze(['artaBridgeRaised']),
  artaBridgeRaised: Object.freeze(['artaBridgeUnbuilt']),
})

const DAY_MS = 24 * 60 * 60 * 1000
const EPOCH_MS = Date.UTC(CALENDAR_EPOCH.year, CALENDAR_EPOCH.month - 1, CALENDAR_EPOCH.day)
const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

function datePartsAtClock(clock = 0) {
  // A civil date rolls over at civil midnight (internal hour 18), not when the
  // dawn-based story cycle wraps six hours later.
  const dayOffset = civilDayOffsetAtClock(clock)
  const date = new Date(EPOCH_MS + dayOffset * DAY_MS)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const yearStart = Date.UTC(year, 0, 1)
  const dayOfYear = Math.floor((date.getTime() - yearStart) / DAY_MS) + 1
  return { date, year, month, day, dayOfYear, dayOffset }
}

// The Devoll/Korce burial of Nena e Diellit belongs to Rusicat: the Orthodox
// Mid-Pentecost Wednesday (the 25th day of Pascha, counting Pascha itself),
// not Western Pentecost. Calculate Orthodox Pascha in the Julian calendar,
// convert it to a UTC Gregorian date, then advance 24 elapsed days.
// Sources: doi.org/10.62800/NR.2024.3.02, and the 2026 Greek Orthodox
// Mid-Pentecost calendar (goarch.org: 6 May 2026).
function orthodoxEasterUtc(year) {
  const a = year % 4
  const b = year % 7
  const c = year % 19
  const d = (19 * c + 15) % 30
  const e = (2 * a + 4 * b - d + 34) % 7
  const month = Math.floor((d + e + 114) / 31)
  const day = ((d + e + 114) % 31) + 1

  // Julian calendar date -> Julian day number -> Gregorian Unix time.
  const shift = Math.floor((14 - month) / 12)
  const y = year + 4800 - shift
  const m = month + 12 * shift - 3
  const julianDayNumber = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083
  return new Date((julianDayNumber - 2440588) * DAY_MS)
}

function nenaDiellitUtc(year) {
  return new Date(orthodoxEasterUtc(year).getTime() + 24 * DAY_MS)
}

// One registry owns observance identity, player-facing labels and calendar
// rules. Fixed days, ranges (including year-crossing ranges) and dates derived
// from Orthodox Pascha are all expressions of the same calendar mechanic.
// Adding a living feast must not require matching hard-coded lists in the
// reducer and two separate views.
export const OBSERVANCES = Object.freeze({
  ditaVeres: Object.freeze({
    label: 'Dita e Verës',
    rule: Object.freeze({ kind: 'fixed', month: 3, day: 14 }),
  }),
  nenaDiellit: Object.freeze({
    label: 'Nëna e Diellit',
    rule: Object.freeze({ kind: 'orthodox-easter-offset', days: 24 }),
  }),
  shengjergjEve: Object.freeze({
    label: 'Shëngjergj eve',
    rule: Object.freeze({ kind: 'fixed', month: 5, day: 5 }),
  }),
  shengjergj: Object.freeze({
    label: 'Shëngjergj',
    rule: Object.freeze({ kind: 'fixed', month: 5, day: 6 }),
  }),
  twelveNights: Object.freeze({
    label: 'the Twelve Nights',
    rule: Object.freeze({
      kind: 'annual-range',
      start: Object.freeze({ month: 12, day: 25 }),
      end: Object.freeze({ month: 1, day: 5 }),
    }),
  }),
  tomorriPilgrimage: Object.freeze({
    label: 'the Tomorr pilgrimage',
    rule: Object.freeze({
      kind: 'annual-range',
      start: Object.freeze({ month: 8, day: 20 }),
      end: Object.freeze({ month: 8, day: 25 }),
    }),
  }),
})

export const FESTIVAL_IDS = Object.freeze(Object.keys(OBSERVANCES))
export const festivalLabel = (id) => OBSERVANCES[id]?.label || id

const monthDay = ({ month, day }) => month * 100 + day

function observanceMatches(observance, parts) {
  const rule = observance?.rule
  if (rule?.kind === 'fixed') return parts.month === rule.month && parts.day === rule.day
  if (rule?.kind === 'annual-range') {
    const current = monthDay(parts)
    const start = monthDay(rule.start)
    const end = monthDay(rule.end)
    return start <= end
      ? current >= start && current <= end
      : current >= start || current <= end
  }
  if (rule?.kind === 'orthodox-easter-offset') {
    const observed = new Date(orthodoxEasterUtc(parts.year).getTime() + rule.days * DAY_MS)
    return parts.date.getUTCMonth() === observed.getUTCMonth() && parts.date.getUTCDate() === observed.getUTCDate()
  }
  return false
}

export function seasonAtClock(clock = 0) {
  const { month } = datePartsAtClock(clock)
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

export function festivalIdsAtClock(clock = 0) {
  const parts = datePartsAtClock(clock)
  return Object.entries(OBSERVANCES)
    .filter(([, observance]) => observanceMatches(observance, parts))
    .map(([id]) => id)
}

export function calendarAtClock(clock = 0) {
  const { date, year, month, day, dayOfYear, dayOffset } = datePartsAtClock(clock)
  return {
    year,
    month,
    day,
    dayOfYear,
    dayOffset,
    hour: civilHourAtClock(clock),
    weekday: WEEKDAYS[date.getUTCDay()],
    season: seasonAtClock(clock),
    festivals: festivalIdsAtClock(clock),
  }
}

export const isFestivalAtClock = (clock, festivalId) =>
  festivalIdsAtClock(clock).includes(festivalId)

// Move to the next matching feast-day (and target phase, when supplied).
// Limiting the scan to two years catches malformed ids instead of letting an
// authoring error loop.
export function advanceToFestival(clock, festivalId, phase, atHour = null) {
  if (!FESTIVAL_IDS.includes(festivalId)) return clock
  if (phase && !['dawn', 'day', 'dusk', 'night'].includes(phase)) return clock
  if (atHour != null && !isCivilHour(atHour)) return clock
  if (phase && atHour != null && phaseAtCivilHour(atHour) !== phase) return clock
  let next = clock
  // Scan by the hour when a phase or civil hour is supplied. This guarantees
  // every constraint simultaneously: a missed hour on a one-day observance
  // reaches next year's occurrence rather than spilling into tomorrow.
  const step = phase || atHour != null ? 1 : 24
  const maxSteps = phase || atHour != null ? 733 * 24 : 733
  for (let i = 0; i <= maxSteps; i++, next += step) {
    if (isFestivalAtClock(next, festivalId) &&
        (!phase || phaseAtClock(next) === phase) &&
        (atHour == null || civilHourAtClock(next) === atHour)) return next
  }
  return clock
}

function factClock(fact) {
  if (typeof fact === 'number') return fact
  if (fact && typeof fact === 'object' && Number.isFinite(fact.atClock)) return fact.atClock
  return null
}

const hasFact = (worldFacts, id) => worldFacts?.[id] != null && worldFacts[id] !== false

// Weather is derived, never randomly stored, so a save always reopens under
// the same sky. World-changing endings may override the ordinary daily cycle.
const CLIMATE_OFFSET = Object.freeze({
  village: 0,
  forest: 7,
  river: 13,
  castle: 19,
  lake: 23,
  sea: 31,
  mountain: 37,
  sky: 43,
  princeland: 5,
})

export function weatherAtClock(clock = 0, worldFacts = {}, region = 'village') {
  // The world below has no visible sky. Surface rain still changes hydrology,
  // but describing rain or snow inside the cavern would be a geography error.
  if (region === 'underworld') return 'clear'
  const rainCalledAt = factClock(worldFacts.rainReturned)
  if (rainCalledAt != null && clock >= rainCalledAt && clock - rainCalledAt < 18) return 'rain'

  const { year, dayOfYear } = datePartsAtClock(clock)
  const season = seasonAtClock(clock)
  const baseRoll = Math.abs(Math.imul(year * 1000 + dayOfYear, 1103515245) + 12345)
  const roll = (baseRoll + (CLIMATE_OFFSET[region] || 0)) % 100
  let weather
  if (season === 'winter' && region === 'mountain') weather = roll < 46 ? 'snow' : roll < 60 ? 'storm' : roll < 82 ? 'cloud' : 'clear'
  else if (season === 'winter' && region === 'sea') weather = roll < 22 ? 'storm' : roll < 58 ? 'rain' : roll < 80 ? 'cloud' : 'clear'
  else if (season === 'winter') weather = roll < 22 ? 'snow' : roll < 44 ? 'rain' : roll < 70 ? 'cloud' : 'clear'
  else if (season === 'spring' && ['sea', 'lake', 'river'].includes(region)) weather = roll < 16 ? 'storm' : roll < 50 ? 'rain' : roll < 73 ? 'cloud' : 'clear'
  else if (season === 'spring') weather = roll < 12 ? 'storm' : roll < 42 ? 'rain' : roll < 68 ? 'cloud' : 'clear'
  else if (season === 'summer' && region === 'mountain') weather = roll < 14 ? 'storm' : roll < 25 ? 'rain' : roll < 36 ? 'cloud' : 'clear'
  else if (season === 'summer') weather = roll < 8 ? 'storm' : roll < 18 ? 'rain' : roll < 30 ? 'cloud' : 'clear'
  else if (region === 'sea') weather = roll < 22 ? 'storm' : roll < 52 ? 'rain' : roll < 75 ? 'cloud' : 'clear'
  else weather = roll < 15 ? 'storm' : roll < 45 ? 'rain' : roll < 70 ? 'cloud' : 'clear'

  // Turning aside Shurdhi's hail changes that storm, not the climate forever.
  // The deed stays in world memory, while later years may still have storms.
  const hailAvertedAt = factClock(worldFacts.hailAverted)
  if (weather === 'storm' && hailAvertedAt != null && clock >= hailAvertedAt && clock - hailAvertedAt < 24) return 'cloud'
  return weather
}

export function hydrologyFromFacts(worldFacts = {}) {
  // Binoshët's restored river belongs to its embodied tale-city; it must not
  // silently repair the still-dry river and wells of the main quest.
  const riversRestored = hasFact(worldFacts, 'riverRestored') || hasFact(worldFacts, 'droughtBroken')
  const villageWellsRestored = hasFact(worldFacts, 'villageWellsRestored') || hasFact(worldFacts, 'droughtBroken')
  const fieldsWatered = hasFact(worldFacts, 'fieldsWatered') || hasFact(worldFacts, 'rainReturned')
  return { riversRestored, villageWellsRestored, fieldsWatered }
}

export function worldMemoriesFromFacts(worldFacts = {}, region = 'village') {
  return Object.entries(worldFacts)
    .filter(([id, fact]) => hasFact(worldFacts, id) && WORLD_FACT_PRESENTATION[id] && fact !== false)
    .map(([id, fact]) => {
      const presentation = WORLD_FACT_PRESENTATION[id]
      return {
        id,
        ...presentation,
        atClock: factClock(fact),
        source: fact && typeof fact === 'object' ? fact.source || null : null,
        regional: presentation.regions.includes(region),
      }
    })
    .sort((a, b) => Number(b.regional) - Number(a.regional) || (b.atClock ?? -Infinity) - (a.atClock ?? -Infinity) || a.id.localeCompare(b.id))
}
