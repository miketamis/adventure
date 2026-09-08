// Runtime world-state audit. This complements worldaudit/mapaudit by proving
// that the canonical structure is actually used by the reducer and survives
// save/restart boundaries.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { STORY } from '../src/game/content.js'
import {
  FESTIVAL_IDS,
  START_CLOCK,
  TIME_PHASES,
  applyWorldEffects,
  environmentSnapshot,
  hasRequiredItem,
  normalizeSavedState,
  phaseAtClock,
  phraseSenses,
  projectedClockForOption,
  reconcileWorldFacts,
  reducer,
  timePassageForOption,
  worldEffectsForEnding,
  WORLD_FACT_INCOMPATIBLE,
  WORLD_EFFECTS_BY_ENDING,
} from '../src/game/gameState.js'
import {
  WORLD_FACT_PRESENTATION,
  advanceToFestival,
  calendarAtClock,
  festivalIdsAtClock,
  hydrologyFromFacts,
  weatherAtClock,
  worldMemoriesFromFacts,
} from '../src/game/environment.js'
import { REGIONS } from '../src/game/regions.js'
import { isDistantLineVisible, sightlinesFrom, transitionInfo } from '../src/game/worldModel.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
  }
}

const stateAt = (nodeId, clock = START_CLOCK, extra = {}) => ({
  nodeId,
  clock,
  cameFrom: null,
  cameFromPhase: null,
  familiar: false,
  heard: {},
  rumor: false,
  trail: [],
  discovered: {},
  inventory: {},
  mana: {},
  practiced: {},
  visited: {},
  earned: {},
  eligible: {},
  attempts: {},
  dismissedTests: {},
  pendingTest: null,
  peak: 3,
  hearts: 3,
  healedAt: {},
  turn: 1,
  fixtures: {},
  npcStarted: {},
  worldFacts: {},
  view: 'story',
  ended: null,
  embodying: null,
  debug: false,
  loreFocus: null,
  ...extra,
})

check('ordinary choices use canonical route hours', () => {
  let compared = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || !STORY[option.to] || option.date || option.time || Number.isFinite(option.durationHours)) continue
      const start = 240
      assert.equal(projectedClockForOption(stateAt(from, start), option), start + transitionInfo(from, option).hours, `${from}->${option.to}`)
      compared++
    }
  }
  assert.ok(compared >= 750, `only ${compared} ordinary choices compared`)
})

check('phase and festival waits include the road before the wait', () => {
  let compared = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || (!option.time && !option.date) || Number.isFinite(option.durationHours)) continue
      const start = 255 // night: catches a target-night road that could otherwise collapse to one hour
      const routeHours = transitionInfo(from, { ...option, time: undefined, date: undefined }).hours
      assert.equal(transitionInfo(from, option).hours, routeHours, `${from}->${option.to}: route note hid travel time`)
      assert.ok(projectedClockForOption(stateAt(from, start), option) >= start + routeHours, `${from}->${option.to}: target wait replaced its journey`)
      compared++
    }
  }
  assert.ok(compared >= 10, `only ${compared} phase/calendar roads compared`)
})

check('authored long waits advance the narrated interval', () => {
  const gjizarWait = STORY.gjizarUdha.options.find((option) => option.to === 'gjizarPallat')
  assert.equal(gjizarWait.durationHours, 2161)
  assert.equal(projectedClockForOption(stateAt('gjizarUdha', 240), gjizarWait), 240 + 2161)

  for (const from of ['maroIkja', 'maroMesnata']) {
    const weddingWait = STORY[from].options.find((option) => option.to === 'maroKrushqit')
    assert.equal(weddingWait.durationHours, 2 * 30 * 24, `${from}: the source's “about two months” preparation was not represented`)
  }
  const familyWait = STORY.maroKrushqit.options.find((option) => option.to === 'maroPallati')
  assert.equal(familyWait.durationHours, 2 * 30 * 24, 'Maro brought her family near without representing the source\'s approximate two-month wait')
  const needleWait = STORY.maroPallati.options.find((option) => option.to === 'maroGjilpera')
  assert.equal(needleWait.durationHours, 10 * 24, "the sorceress's source-specified ten days were collapsed")

  const maroStart = 240
  const maroArrival = projectedClockForOption(stateAt('maroIkja', maroStart), STORY.maroIkja.options[0])
  const familyArrival = projectedClockForOption(stateAt('maroKrushqit', maroArrival), familyWait)
  const needleReady = projectedClockForOption(stateAt('maroPallati', familyArrival), needleWait)
  assert.equal(needleReady - maroStart, (2 + 2) * 30 * 24 + 10 * 24)

  const vigilFirst = STORY.kopshtMermer2.options.find((option) => option.to === 'mermerZgjim')
  const vigilLast = STORY.mermerZgjim.options.find((option) => option.to === 'mermerTradheti')
  assert.equal(vigilFirst.durationHours, 17 * 24)
  assert.equal(vigilLast.durationHours, 7 * 24)
  const vigilHandoff = projectedClockForOption(stateAt('kopshtMermer2', 240), vigilFirst)
  const kingWakes = projectedClockForOption(stateAt('mermerZgjim', vigilHandoff), vigilLast)
  assert.equal(kingWakes - 240, 24 * 24, 'the marble king did not wake after the scroll\'s three days/nights plus three weeks')

  // Schirò's closing clock has three separate claims: Handa reaches
  // Bardhakuqja on the promised day; Zjerma sees the sword the following
  // dawn; only after the fire ordeal do Zjerma and Bardhakuqja spend three
  // tale-months with his mother and ride back to the river kingdom.
  const promisedInterval = 365 * 24 + 30 * 24 + 24
  const promiseDeparture = 243 // daytime, so the same hour 396 days later is also daytime
  const promisedRoute = [
    ['binoshetFund', 'binoshetKasollja'],
    ['binoshetKasollja', 'binoshetKopshtiZanave'],
    ['binoshetKopshtiZanave', 'binoshetGardhiHanda'],
    ['binoshetGardhiHanda', 'binoshetGardhiZjerma'],
    ['binoshetGardhiZjerma', 'binoshetZambak'],
    ['binoshetZambak', 'binoshetDasma'],
    ['binoshetDasma', 'binoshetKuvendi'],
    ['binoshetKuvendi', 'binoshetLuftaFillon'],
    ['binoshetLuftaFillon', 'binoshetLuftaZgjat'],
    ['binoshetLuftaZgjat', 'binoshetLuftaFund'],
    ['binoshetLuftaFund', 'binoshetKurora'],
    ['binoshetKurora', 'binoshetShpata'],
  ]
  const feast = STORY.binoshetDasma.options.find((option) => option.to === 'binoshetKuvendi')
  const roadToWar = STORY.binoshetKuvendi.options.find((option) => option.to === 'binoshetLuftaFillon')
  const firstCampaignMonth = STORY.binoshetLuftaFillon.options.find((option) => option.to === 'binoshetLuftaZgjat')
  const remainingCampaign = STORY.binoshetLuftaZgjat.options.find((option) => option.to === 'binoshetLuftaFund')
  const ordinaryRoadHours = transitionInfo('binoshetKuvendi', { ...roadToWar, durationHours: undefined }).hours
  assert.equal(feast.durationHours, 9 * 24, 'Binoshët no longer gives the feast its exact nine days')
  assert.equal(roadToWar.durationHours, ordinaryRoadHours, 'Binoshët council-to-war road no longer matches the mapped journey')
  assert.equal(firstCampaignMonth.durationHours + remainingCampaign.durationHours, 3 * 30 * 24, 'Binoshët no longer makes its approximate several-month campaign visible')
  assert.equal(feast.durationHours + roadToWar.durationHours + firstCampaignMonth.durationHours + remainingCampaign.durationHours, 2384)

  const deadlineWait = STORY.binoshetKurora.options.find((option) => option.to === 'binoshetShpata')
  const preDeadlineHours = promisedRoute.slice(0, -1).reduce((sum, [from, to]) => {
    const option = STORY[from].options.find((candidate) => candidate.to === to)
    return sum + projectedClockForOption(stateAt(from, 0), option)
  }, 0)
  assert.equal(deadlineWait.durationHours, promisedInterval - preDeadlineHours, 'the residual wait no longer lands on the exact promised day')

  let promisedClock = promiseDeparture
  for (const [from, to] of promisedRoute) {
    const option = STORY[from].options.find((candidate) => candidate.to === to)
    assert.ok(option, `${from}->${to}: Binoshët promised route is broken`)
    promisedClock = projectedClockForOption(stateAt(from, promisedClock), option)
  }
  assert.equal(promisedClock - promiseDeparture, promisedInterval, 'Handa did not reach Bardhakuqja after exactly one year, one month and one day')

  const eveningWait = STORY.binoshetShpata.options.find((option) => option.to === 'binoshetNata')
  const swordClock = projectedClockForOption(stateAt('binoshetShpata', promisedClock), eveningWait)
  assert.equal(phaseAtClock(swordClock), 'night', 'Handa was put to bed before evening on the promised day')
  assert.ok(swordClock > promisedClock && swordClock - promisedClock < 24, 'the promised-day welcome did not reach that evening')

  const dawnWait = STORY.binoshetNata.options.find((option) => option.to === 'binoshetZjarri')
  const ordinaryRecognitionRide = transitionInfo('binoshetNata', { ...dawnWait, durationHours: undefined, time: undefined }).hours
  assert.equal(dawnWait.durationHours, ordinaryRecognitionRide, 'Zjerma\'s dawn ride ignored the physical bridge distance')
  const recognitionClock = projectedClockForOption(stateAt('binoshetNata', swordClock), dawnWait)
  assert.equal(phaseAtClock(recognitionClock), 'dawn', 'Zjerma reached the sword-and-fire recognition before the following dawn')
  assert.ok(recognitionClock > swordClock && recognitionClock - swordClock <= 12, 'the following-dawn recognition was not the next dawn')

  const motherJourney = STORY.binoshetZjarri.options.find((option) => option.to === 'binoshetTeNena')
  const motherArrival = projectedClockForOption(stateAt('binoshetZjarri', recognitionClock), motherJourney)
  const crownReturn = STORY.binoshetTeNena.options.find((option) => option.to === 'binoshetDyKurorat')
  const ordinaryReturnHours = transitionInfo('binoshetTeNena', { ...crownReturn, durationHours: undefined }).hours
  assert.equal(crownReturn.durationHours, 3 * 30 * 24 + ordinaryReturnHours, 'the three-month stay or return journey was collapsed')
  assert.equal(projectedClockForOption(stateAt('binoshetTeNena', motherArrival), crownReturn) - motherArrival, 3 * 30 * 24 + ordinaryReturnHours)
})

check('every multi-day or calendar jump has a sourced, semantically honest passage', () => {
  const validFidelity = new Set([
    'source-exact', 'source-exact-calendar-model', 'source-approximate', 'simulation-approximation',
    'map-derived', 'computed-deadline', 'calendar-exact', 'clock-exact',
  ])
  let covered = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if ((option.durationHours ?? 0) < 24 && !option.date) continue
      const passage = option.timePassage
      const edge = `${from}->${option.to}`
      assert.ok(passage, `${edge}: long/calendar jump has no player-facing time passage`)
      assert.ok(typeof passage.title === 'string' && passage.title.length > 0, `${edge}: passage has no title`)
      assert.ok(typeof passage.label === 'string' && passage.label.length > 0, `${edge}: passage has no semantic label`)
      assert.ok(Array.isArray(passage.segments) && passage.segments.length > 0, `${edge}: passage has no intervening moments`)
      assert.match(passage.source?.url || '', /^https:\/\//, `${edge}: passage has no linked source`)
      for (const segment of passage.segments) {
        assert.ok(segment.label && segment.detail, `${edge}: incomplete passage segment`)
        assert.ok(validFidelity.has(segment.fidelity), `${edge}: unknown fidelity '${segment.fidelity}'`)
      }
      if (Number.isFinite(option.durationHours)) {
        assert.ok(passage.segments.every((segment) => Number.isFinite(segment.hours) && segment.hours >= 0), `${edge}: timed segment has no mechanical hour allocation`)
        assert.equal(
          passage.segments.reduce((sum, segment) => sum + segment.hours, 0),
          option.durationHours,
          `${edge}: passage segments do not sum to durationHours`,
        )
      }
      covered++
    }
  }
  assert.equal(covered, 17, `expected 13 multi-day jumps and 4 calendar waits, found ${covered}`)

  const feast = STORY.binoshetDasma.options.find((option) => option.to === 'binoshetKuvendi')
  const firstCampaignMonth = STORY.binoshetLuftaFillon.options.find((option) => option.to === 'binoshetLuftaZgjat')
  const remainingCampaign = STORY.binoshetLuftaZgjat.options.find((option) => option.to === 'binoshetLuftaFund')
  assert.match(feast.timePassage.label, /nine complete days/i)
  assert.equal(feast.timePassage.segments.reduce((sum, segment) => sum + segment.hours, 0), 9 * 24)
  assert.match(firstCampaignMonth.timePassage.label, /several months/i)
  assert.match(remainingCampaign.timePassage.label, /several months/i)
  assert.doesNotMatch(`${firstCampaignMonth.timePassage.label} ${remainingCampaign.timePassage.label}`, /three months/i)
  assert.match(`${firstCampaignMonth.timePassage.estimateNote} ${remainingCampaign.timePassage.estimateNote}`, /witness/i)

  // “Three months” is exact in both witnesses; 90 dated days is our calendar
  // model. The badge must disclose both truths instead of calling the derived
  // dates source-exact.
  const exactMonthModels = [
    STORY.binoshetTeNena.options.find((option) => option.to === 'binoshetDyKurorat'),
    STORY.gjizarUdha.options.find((option) => option.to === 'gjizarPallat'),
  ]
  for (const option of exactMonthModels) {
    const monthSegment = option.timePassage.segments.find((segment) => /month/i.test(segment.label))
    assert.equal(monthSegment.fidelity, 'source-exact-calendar-model')
    assert.match(option.timePassage.estimateNote, /30 days|30-day/i)
  }

  const birdFlight = STORY.maroZogu.options.find((option) => option.to === 'maroKopshti')
  const birdStart = stateAt('maroZogu', 13)
  const birdPassage = timePassageForOption(birdStart, birdFlight)
  assert.ok(birdPassage.elapsedHours > birdFlight.durationHours, 'daylight wait after the three-day model was hidden')
  assert.equal(phaseAtClock(birdPassage.toClock), 'day')

  const festival = STORY.fshatiSheshi.options.find((option) => option.date === 'ditaVeres')
  const lateFestivalStart = stateAt('fshatiSheshi', 39)
  const festivalPassage = timePassageForOption(lateFestivalStart, festival)
  assert.equal(festivalPassage.toClock, projectedClockForOption(lateFestivalStart, festival))
  assert.ok(festivalPassage.elapsedHours > 300 * 24, 'next-year festival wait did not disclose its full elapsed span')

  const speechIds = phraseSenses(feast.text)
  const advanced = reducer(stateAt('binoshetDasma', 240, {
    discovered: Object.fromEntries(speechIds.map((id) => [id, true])),
    mana: Object.fromEntries(speechIds.map((id) => [id, 1])),
  }), {
    type: 'CHOOSE', option: feast, targetNode: STORY.binoshetKuvendi,
  })
  assert.equal(advanced.nodeId, 'binoshetKuvendi')
  assert.equal(advanced.timePassage?.fromClock, 240)
  assert.equal(advanced.timePassage?.toClock, 240 + feast.durationHours)
  assert.equal(reducer(advanced, {
    type: 'DISMISS_TIME_PASSAGE',
    passageId: advanced.timePassage.id,
    expectedStep: advanced.timePassage.step,
  }).timePassage, null)
})

check('dawn narration is reached at dawn', () => {
  for (const option of STORY.udheLugat.options.filter((candidate) => candidate.to === 'udheOra')) {
    const arrival = projectedClockForOption(stateAt('udheLugat', 20), option)
    assert.equal(phaseAtClock(arrival), 'dawn', 'the Ora scene claimed daybreak before dawn')
    assert.ok(arrival > 20)
  }
  for (const option of STORY.ngjitja2.options.filter((candidate) => candidate.to === 'ngjitja3')) {
    const arrival = projectedClockForOption(stateAt('ngjitja2', 20), option)
    assert.equal(phaseAtClock(arrival), 'dawn', 'the eagle ascent claimed the night ended before dawn')
    assert.ok(arrival > 20)
  }
  const millWait = STORY.xhindMulli.options.find((candidate) => candidate.to === 'xhindMulliFund')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('xhindMulli', 20), millWait)), 'dawn')
  const allNightSong = STORY.lahuta1.options.find((candidate) => candidate.to === 'lahutaFund')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('lahuta1', 20), allNightSong)), 'dawn')
  const flaxLitany = STORY.maroLitani2.options.find((candidate) => candidate.to === 'maroLitani3')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('maroLitani2', 20), flaxLitany)), 'dawn')
  const morningStar = STORY.uji.options.find((candidate) => candidate.to === 'prende1')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('uji', 5), morningStar)), 'dawn')
})

check('night narration is reached at night', () => {
  const serpentWedding = STORY.gjarperOrigin.options.find((option) => option.to === 'gjarperBurr1')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('gjarperOrigin', 5), serpentWedding)), 'night')
  for (const option of STORY.skender1.options.filter((candidate) => !candidate.confuser)) {
    assert.equal(phaseAtClock(projectedClockForOption(stateAt('skender1', 5), option)), 'night')
  }
  const coffeeTalk = STORY.kafeneja.options.find((option) => option.to === 'kafeneja2')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('kafeneja', 5), coffeeTalk)), 'night')
  const mountainWatch = STORY.tsNuse.options.find((option) => option.to === 'tsRoje')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('tsNuse', 5), mountainWatch)), 'night')
  const fates = STORY.djepi1.options.find((option) => option.to === 'djepi2')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('djepi1', 5), fates)), 'night')
  const revenant = STORY.udheNate.options.find((option) => option.to === 'udheLugat')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('udheNate', 5), revenant)), 'night')
})

check('the spring greeting follows the current phase', () => {
  const greetingByPhase = (nodeId) => Object.fromEntries(
    STORY[nodeId].text
      .filter((entry) => entry?.cond && TIME_PHASES.includes(entry.cond))
      .map((entry) => [entry.cond, entry.line.find((token) => ['mirmengjes', 'mirdita', 'mirembrema'].includes(token.id))?.id])
      .filter(([, greeting]) => greeting),
  )
  assert.deepEqual(greetingByPhase('kroiGrate2'), { dawn: 'mirmengjes', day: 'mirdita', dusk: 'mirembrema' })
  for (const nodeId of ['tregtari', 'sheruesi', 'udhetariHuaj']) {
    assert.deepEqual(greetingByPhase(nodeId), {
      dawn: 'mirmengjes',
      day: 'mirdita',
      dusk: 'mirembrema',
      night: 'mirembrema',
    }, `${nodeId}: greeting does not match the live clock`)
  }
})

check('embodiment starts after declared backstory spans', () => {
  for (const nodeId of ['aliBajr1', 'halilGarria1', 'osmaniBurg', 'balozMotra', 'uraVellezerit', 'uraArtes1']) {
    const elapsed = STORY[nodeId].text.find((line) => Array.isArray(line) && line.some((token) => token.al === 'kanë kaluar'))
    assert.ok(elapsed, `${nodeId}: elapsed backstory reads as an unadvanced active wait`)
  }
})

check('arrival-sensitive night gates close before dawn', () => {
  const option = { text: [], to: 'start', requires: 'night' }
  assert.equal(hasRequiredItem(stateAt('start', 22), option), true)
  assert.equal(hasRequiredItem(stateAt('start', 23), option), false)
})

check('festival waits satisfy date and phase together', () => {
  // Clock 39 is the night of the opening Dita e Veres. A request for that
  // festival by day must move to the next valid annual observance, not dawn
  // after the feast has already ended.
  const clock = projectedClockForOption(stateAt('fshatiSheshi', 39), {
    text: [],
    to: 'veraDite1',
    date: 'ditaVeres',
    time: 'day',
  })
  assert.equal(festivalIdsAtClock(clock).includes('ditaVeres'), true)
  assert.equal(phaseAtClock(clock), 'day')
  assert.ok(clock > 39)

  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.date) assert.ok(FESTIVAL_IDS.includes(option.date), `${from}->${option.to}: unknown festival ${option.date}`)
      if (option.time) assert.ok(TIME_PHASES.includes(option.time), `${from}->${option.to}: unknown phase ${option.time}`)
      if (option.durationHours != null) {
        assert.ok(Number.isFinite(option.durationHours) && option.durationHours >= 0, `${from}->${option.to}: invalid duration`)
      }
      if (!option.date) continue
      for (const start of [0, 39, 365 * 24 + 23]) {
        const arrival = projectedClockForOption(stateAt(from, start), option)
        assert.ok(festivalIdsAtClock(arrival).includes(option.date), `${from}->${option.to}: missed ${option.date}`)
        if (option.time) assert.equal(phaseAtClock(arrival), option.time, `${from}->${option.to}: wrong arrival phase`)
      }
    }
  }
})

check('folk-calendar observances use the right civil and Orthodox dates', () => {
  const openingFestival = calendarAtClock(24)
  assert.deepEqual([openingFestival.year, openingFestival.month, openingFestival.day], [2026, 3, 14])
  assert.ok(openingFestival.festivals.includes('ditaVeres'))

  // Rusicat is Orthodox Mid-Pentecost (the 25th day counting Pascha), not
  // Western Pentecost. Orthodox Pascha was 12 Apr 2026, so this is Wed 6 May.
  const rusicaClock = advanceToFestival(0, 'nenaDiellit', 'day')
  const rusica = calendarAtClock(rusicaClock)
  assert.deepEqual([rusica.year, rusica.month, rusica.day, rusica.weekday], [2026, 5, 6, 'wednesday'])

  const shengjergj = calendarAtClock(advanceToFestival(0, 'shengjergj', 'day'))
  assert.deepEqual([shengjergj.month, shengjergj.day], [5, 6])
  assert.equal(advanceToFestival(123, 'not-a-festival', 'day'), 123)
  assert.equal(advanceToFestival(123, 'ditaVeres', 'not-a-phase'), 123)

  // A request made after the target phase on the feast must advance to the
  // next annual observance, never spill into a non-festival morning.
  const feastNight = advanceToFestival(0, 'ditaVeres', 'night')
  const nextFeastDay = advanceToFestival(feastNight, 'ditaVeres', 'day')
  assert.ok(nextFeastDay - feastNight > 300 * 24)
  assert.ok(festivalIdsAtClock(nextFeastDay).includes('ditaVeres'))
})

check('calendar and weather are deterministic', () => {
  const facts = { rainReturned: { atClock: 100, source: 'audit' } }
  assert.deepEqual(environmentSnapshot(stateAt('start', 106, { worldFacts: facts })), environmentSnapshot(stateAt('start', 106, { worldFacts: facts })))
  assert.equal(weatherAtClock(106, facts, 'forest'), 'rain')
  assert.equal(weatherAtClock(106, facts, 'underworld'), 'clear')

  // Hail-averted records one saved storm, not a permanent end to weather.
  let storm = null
  for (let clock = 0; clock < 4 * 366 * 24; clock += 24) {
    if (weatherAtClock(clock, {}, 'village') === 'storm') { storm = clock; break }
  }
  assert.notEqual(storm, null)
  assert.equal(weatherAtClock(storm, { hailAverted: { atClock: storm, source: 'audit' } }, 'village'), 'cloud')
  let laterStorm = null
  for (let clock = storm + 24; clock < storm + 4 * 366 * 24; clock += 24) {
    if (weatherAtClock(clock, {}, 'village') === 'storm') { laterStorm = clock; break }
  }
  assert.notEqual(laterStorm, null)
  assert.equal(weatherAtClock(laterStorm, { hailAverted: { atClock: storm, source: 'audit' } }, 'village'), 'storm')

  // Surface weather must genuinely evolve with the calendar rather than only
  // printing a changing date beside a frozen condition. Conversely, a save in
  // the world below must never acquire surface rain or snow.
  for (const region of REGIONS) {
    const year = new Set()
    for (let day = 0; day < 366; day++) {
      const midnight = day * 24
      const opening = weatherAtClock(midnight, {}, region.key)
      assert.equal(weatherAtClock(midnight + 23, {}, region.key), opening, `${region.key}: unsourced weather changed within one civil day`)
      year.add(opening)
    }
    if (region.key === 'underworld') assert.deepEqual([...year], ['clear'])
    else assert.ok(year.size >= 4, `${region.key}: only ${year.size} weather states occur in a full year`)
  }
})

check('ending effects are attributable and idempotent', () => {
  assert.ok(Object.keys(WORLD_EFFECTS_BY_ENDING).length >= 12)
  const first = applyWorldEffects({}, ['riverRestored'], 90, 'audit-ending')
  const again = applyWorldEffects(first, ['riverRestored'], 140, 'other-ending')
  assert.strictEqual(again, first)
  assert.deepEqual(first.riverRestored, { atClock: 90, source: 'audit-ending' })

  const binoshet = applyWorldEffects({}, WORLD_EFFECTS_BY_ENDING.binoshetDyKurorat, 100, 'binoshetDyKurorat')
  assert.deepEqual(worldEffectsForEnding('binoshetFund'), WORLD_EFFECTS_BY_ENDING.binoshetDyKurorat, 'oldest Binoshët save no longer receives the completed arc effects')
  assert.deepEqual(worldEffectsForEnding('binoshetShpata'), WORLD_EFFECTS_BY_ENDING.binoshetDyKurorat, 'former Binoshët ending save no longer receives the completed arc effects')
  assert.ok(binoshet.binoshetKulshedraDefeated && binoshet.binoshetRiverRestored)
  assert.ok(binoshet.binoshetBardhakuqjaFreed && binoshet.binoshetKingdomRestored)
  assert.equal(hydrologyFromFacts(binoshet).riversRestored, false, "Binoshët's tale-city changed the main river")
  assert.equal(binoshet.kulshedraDefeated, undefined, "Binoshët's Kulshedra overwrote the main quest monster")
})

check('alternate endings cannot leave contradictory world memories', () => {
  for (const [id, conflicts] of Object.entries(WORLD_FACT_INCOMPATIBLE)) {
    for (const other of conflicts) {
      assert.ok(WORLD_FACT_INCOMPATIBLE[other]?.includes(id), `${id}/${other}: conflict is not symmetric`)
    }
  }
  for (const [ending, effects] of Object.entries(WORLD_EFFECTS_BY_ENDING)) {
    for (const id of effects) {
      assert.equal(
        effects.some((other) => WORLD_FACT_INCOMPATIBLE[id]?.includes(other)),
        false,
        `${ending}: one ending applies mutually exclusive facts together`,
      )
    }
  }

  const preserved = applyWorldEffects({}, ['prespaTownPreserved'], 40, 'prespaLiri')
  const flooded = applyWorldEffects(preserved, ['prespaFlooded', 'prespaLakeFormed'], 80, 'prespaFund')
  assert.equal(flooded.prespaTownPreserved, undefined)
  assert.ok(flooded.prespaFlooded && flooded.prespaLakeFormed)

  const preservedAgain = applyWorldEffects(flooded, ['prespaTownPreserved'], 120, 'prespaLiri')
  assert.ok(preservedAgain.prespaTownPreserved)
  assert.equal(preservedAgain.prespaFlooded, undefined)
  assert.equal(preservedAgain.prespaLakeFormed, undefined)

  const repaired = reconcileWorldFacts({
    prespaTownPreserved: { atClock: 40, source: 'old-save' },
    prespaFlooded: { atClock: 80, source: 'old-save' },
    prespaLakeFormed: { atClock: 80, source: 'old-save' },
  })
  assert.equal(repaired.prespaTownPreserved, undefined)
  assert.ok(repaired.prespaFlooded && repaired.prespaLakeFormed)
})

check('every authored world effect has a specific ambient consumer', () => {
  const authored = [...new Set(Object.values(WORLD_EFFECTS_BY_ENDING).flat())].sort()
  const presented = Object.keys(WORLD_FACT_PRESENTATION).sort()
  assert.deepEqual(presented, authored)
  const validRegions = new Set(REGIONS.map((region) => region.key))
  const texts = new Set()
  for (const id of authored) {
    const presentation = WORLD_FACT_PRESENTATION[id]
    assert.ok(presentation.text && presentation.icon, `${id}: missing visible memory text/icon`)
    assert.ok(Array.isArray(presentation.regions) && presentation.regions.length > 0, `${id}: no affected region`)
    assert.ok(presentation.regions.every((region) => validRegions.has(region)), `${id}: invalid region`)
    assert.ok(!texts.has(presentation.text), `${id}: duplicate generic memory text`)
    texts.add(presentation.text)
  }
  const facts = Object.fromEntries(authored.map((id, index) => [id, { atClock: index, source: 'audit' }]))
  const memories = worldMemoriesFromFacts(facts, 'village')
  assert.deepEqual(new Set(memories.map((memory) => memory.id)), new Set(authored))
  assert.ok(memories.some((memory) => memory.regional))

  // Guard the final integration point as well as the data mapping: all mapped
  // memories must actually reach the live story UI and its expandable ledger.
  const component = readFileSync(fileURLToPath(new URL('../src/components/WorldContext.jsx', import.meta.url)), 'utf8')
  assert.match(component, /memories\.find/)
  assert.match(component, /memories\.map/)
})

check('lasting outcomes survive return, continue, and hard restart', () => {
  const facts = { riverRestored: { atClock: 90, source: 'audit-ending' } }
  const endingState = stateAt('binoshetFund', 90, { worldFacts: facts, ended: 'good' })
  const returned = reducer(endingState, { type: 'RETURN_TO_WORLD' }).worldFacts
  assert.deepEqual(returned.riverRestored, facts.riverRestored)
  assert.ok(returned.binoshetKulshedraDefeated, 'migration-safe return did not apply the ending effect')
  assert.ok(returned.binoshetRiverRestored, 'migration-safe return did not preserve the tale-city outcome')
  assert.deepEqual(reducer(endingState, { type: 'CONTINUE' }).worldFacts.riverRestored, facts.riverRestored)
  assert.deepEqual(reducer(endingState, { type: 'RESET' }).worldFacts.riverRestored, facts.riverRestored)
})

check('old and partial saves are normalized before play', () => {
  const fresh = stateAt('start', START_CLOCK, { earned: { priorEnding: true }, debug: true })
  const normalized = normalizeSavedState({
    nodeId: 'start',
    clock: 'broken',
    turn: -4,
    hearts: 99,
    inventory: null,
    visited: [],
    worldFacts: 'broken',
    trail: ['lendina', 'missing-node', 'lendina', 'start'],
    fireLit: Infinity,
    view: 'unknown',
  }, fresh)
  assert.deepEqual(normalized.inventory, {})
  assert.deepEqual(normalized.visited, {})
  assert.deepEqual(normalized.worldFacts, {})
  assert.deepEqual(normalized.earned, { priorEnding: true })
  assert.deepEqual(normalized.trail, ['lendina'])
  assert.equal(normalized.clock, START_CLOCK)
  assert.equal(normalized.turn, 1)
  assert.equal(normalized.hearts, 3)
  assert.deepEqual(normalized.fixtures, {})
  assert.equal(normalized.view, 'story')
})

check('damage cannot push hearts below zero', () => {
  const state = stateAt('maroZogu', 100, { hearts: 0 })
  const option = { text: [], to: 'maroZogu', hearts: -1 }
  assert.equal(reducer(state, { type: 'CHOOSE', option, targetNode: STORY.maroZogu }).hearts, 0)
})

check('self-loops cannot farm permanent state without a cost or exit', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || option.to !== nodeId) continue
      if (option.grant && !option.consumes) {
        assert.ok(option.unless, `${nodeId}: repeatable self-loop grants '${option.grant}' forever`)
      }
      if ((option.hearts || 0) < 0) {
        assert.ok(option.unless, `${nodeId}: damage self-loop can repeat below the authored consequence`)
      }
    }
  }
  const waitForNight = STORY.tsNuse.options.find((option) => option.to === 'tsNuse' && option.time === 'night')
  assert.equal(waitForNight.unless, 'night')
})

check('distant prose responds to phase and weather', () => {
  const lakeSightline = ['larg', 'liqen']
  assert.equal(isDistantLineVisible('lumi', lakeSightline, { phase: 'day', weather: 'clear', season: 'spring' }), true)
  assert.equal(isDistantLineVisible('lumi', lakeSightline, { phase: 'day', weather: 'storm', season: 'spring' }), false)
  assert.equal(isDistantLineVisible('lumi', lakeSightline, { phase: 'night', weather: 'clear', season: 'spring' }), false)
  // A nearby named light remains perceptible after dark even when a distant,
  // unlit landform does not.
  assert.equal(isDistantLineVisible('start', ['larg', 'fshat', 'drite', 'vogel'], { phase: 'night', weather: 'clear', season: 'spring' }), true)
  const underground = sightlinesFrom('bota1', { phase: 'day', weather: 'clear', season: 'spring' })
  assert.equal(underground.some((sightline) => sightline.visible && sightline.key !== 'underworld'), false)
})

const failures = checks.filter((entry) => !entry.ok)
for (const entry of checks) console.log(`${entry.ok ? '✅' : '❌'} ${entry.name}${entry.error ? ` — ${entry.error}` : ''}`)
console.log(`\n${failures.length ? `❌ ${failures.length} state check(s) failed` : `✅ all ${checks.length} runtime world-state checks pass`}`)
process.exitCode = failures.length ? 1 : 0
