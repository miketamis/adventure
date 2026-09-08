// Persistent-world and authored-delight coherence audit.
//
// This file deliberately inspects structured story contracts only. It does
// not guess intent from English blurbs or Albanian token surfaces: lasting
// facts, conditional gates, fixture states, and scene weather are all explicit
// data. The small review ledgers below exist only for semantics the engine
// cannot infer (which physical scene owns a resolved threat/building, and what
// sky a source-critical scene requires).

import { STORY } from '../src/game/content.js'
import {
  WEATHER_TYPES,
  WORLD_FACT_PRESENTATION,
  worldMemoriesFromFacts,
} from '../src/game/environment.js'
import { optionEffectsOf } from '../src/game/stateMechanics.js'
import {
  TIMED_WORLD_FIXTURES,
  parseFixtureCondition,
} from '../src/game/worldFixtures.js'

const asList = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const own = (object, key) => object != null && Object.hasOwn(object, key)

// These are the persistent threats and structures for which returning to the
// affected place must not restart unresolved prose. `gate` identifies the
// exact route that must be absent after the fact; `callbacks` identify the
// natural place(s) where a positive `fact:<id>` line or option should delight
// the returning player. This is deliberately compact: hydrology, calendar and
// climate effects already have generic consumers and need no hand-maintained
// site ownership here.
const OUTCOME_SITE_REVIEWS = Object.freeze([
  {
    fact: 'roadShtrigaBanished', kind: 'threat',
    gate: { from: 'lendina', to: 'shtrigaNate' }, callbacks: ['lendina'],
    note: 'The forest clearing owns the night-fire encounter and its safer return.',
  },
  {
    fact: 'krujeKulshedraDefeated', kind: 'threat',
    gate: { from: 'pusi', to: 'sari1' }, callbacks: ['pusi'],
    note: 'The underworld well is where the dervish offers the Kruje monster road.',
  },
  {
    fact: 'coastalBalozDefeated', kind: 'threat',
    gate: { from: 'bregu', to: 'balozMotra' }, callbacks: ['bregu'],
    note: 'The coast should remember that its yearly tribute has ended.',
  },
  {
    fact: 'gjakovaOraSlain', kind: 'threat',
    gate: { from: 'qyteti', to: 'thesar2' }, callbacks: ['qyteti'],
    note: 'The dead bazaar owns both its serpent guardian and the changed return.',
  },
  {
    fact: 'bollaSlain', kind: 'threat',
    gate: { from: 'lumi', to: 'bolla1' }, callbacks: ['lumi'],
    note: 'The river is the Bolla site and should not offer the slain serpent again.',
  },
  {
    fact: 'binoshetKulshedraDefeated', kind: 'threat',
    gate: { from: 'lumi', to: 'binoshetLumi' }, callbacks: ['lumi'],
    note: 'Zjerma\'s separate river Kulshedra must not be coupled to the local Bolla encounter.',
  },
  {
    fact: 'hailAverted', kind: 'threat',
    gate: { from: 'maliStuhi', to: 'shurdhi1' }, callbacks: ['maliStuhi'],
    note: 'The storm pass should remember the hail that was driven aside.',
  },
  {
    fact: 'lubiaDefeated', kind: 'threat',
    gate: { from: 'udhaThate', to: 'lubia1' }, callbacks: ['udhaThate'],
    note: 'The dry southern road owns the defeated Lubia and restored route.',
  },
  {
    fact: 'dervishBearDefeated', kind: 'threat',
    gate: { from: 'pylli1', to: 'arushe1' }, callbacks: ['pylliThelle', 'pylli1'],
    note: 'The forest should keep the bear dead while retaining a sourced trace.',
  },
  {
    fact: 'roadLugatDefeated', kind: 'threat',
    gate: { from: 'udheLugat', to: 'dhampir1' }, callbacks: ['udheLugat', 'udheNate'],
    note: 'The night road owns the half-vampire intervention and safer aftermath.',
  },
  {
    fact: 'tomorrKukudhDefeated', kind: 'threat',
    gate: { from: 'udheNate', to: 'kukudh1' }, callbacks: ['udheNate'],
    note: 'The ruined night shelter should remember its kukudh was destroyed.',
  },
  {
    fact: 'rozafaCastleRaised', kind: 'building',
    gate: { from: 'udhaKthimit', to: 'kalaMjegull' }, callbacks: ['maja'],
    note: 'The true return road must acknowledge the completed fortress rather than replay construction.',
  },
  {
    fact: 'artaBridgeRaised', kind: 'building',
    gate: { from: 'uraVellezerit', to: 'uraArtes1' }, callbacks: ['uraTjeter1'],
    note: 'The Arta worksite must show the raised bridge rather than restart construction.',
  },
  {
    fact: 'artaBridgeUnbuilt', kind: 'building',
    gate: { from: 'uraVellezerit', to: 'uraArtes1' }, callbacks: ['uraTjeter1'],
    note: 'The Arta worksite must show the lasting ford rather than restart construction.',
  },
  {
    fact: 'behuriKullaDestroyed', kind: 'building',
    gate: { from: 'odaJutbina', to: 'behuriJutbina' }, callbacks: ['odaJutbina'],
    note: 'Jutbina owns the frontier news and should not send Mujo to one ruined kulla twice.',
  },
  {
    fact: 'blueEyeChannelOpened', kind: 'waterwork',
    gate: { from: 'syriKanali', to: 'syriFund' }, callbacks: ['syriKanali', 'udhaSyri'],
    note: 'The completed channel stays open on return instead of becoming another eight-hour construction job.',
  },
  {
    fact: 'rainReturned', kind: 'waterwork',
    gate: { from: 'udhaThate', to: 'ujkuUje' }, callbacks: ['udhaThate'],
    note: 'Brother Wolf cannot summon the same rain twice, while the road remembers the returned water.',
  },
  {
    fact: 'zukuBesaAlly', kind: 'relationship',
    gate: { from: 'jutbina', to: 'zuku1' }, callbacks: ['jutbina'],
    note: 'Zuku remains a sworn friend and cannot be found blind and healed again after that friendship.',
  },
])

// A resolved site can have perfectly gated entry and callback text while its
// ordinary time-of-day dressing still narrates the old crisis. At these
// reviewed nodes, every temporal line must explicitly exclude every resolving
// fact. This stays data-shaped: future sites can join without another one-off
// branch in the audit.
const RESOLVED_TEMPORAL_PROSE_REVIEWS = Object.freeze([
  {
    nodeId: 'uraTjeter1',
    facts: ['artaBridgeRaised', 'artaBridgeUnbuilt'],
    note: 'A standing bridge or lasting ford cannot fall and be rebuilt again as the clock turns.',
  },
])

// Source- or action-critical skies cannot be left to the deterministic daily
// climate roll. A STORY node's `sceneWeather` is the runtime override; this
// review maps only the scenes whose authored event requires an exact sky.
const CRITICAL_WEATHER_REVIEWS = Object.freeze({
  tomorProva: 'cloud',
  tomorStuhi: 'storm',
  maliStuhi: 'storm',
  shurdhi1: 'storm',
  shurdhiFund: 'cloud',
  qiellErera1: 'storm',
  qiellErera2: 'storm',
  verbti1: 'storm',
  verbtiFund: 'rain',
  dordolecFund: 'rain',
})

// A genuinely local-only fixture may be reviewed here, but only with a clear
// explanation of why persistence has no meaningful downstream expression.
// Keep the default empty: adding a new fixture should first prompt an authored
// callback outside its activation scene.
const LOCAL_ONLY_FIXTURE_REVIEWS = Object.freeze({})

const failures = []
const fail = (area, message) => failures.push(`[${area}] ${message}`)

function conditionRefsAt(nodeId) {
  const node = STORY[nodeId]
  const refs = []
  if (!node) return refs

  for (const [index, entry] of (node.text || []).entries()) {
    if (Array.isArray(entry) || !entry || typeof entry !== 'object') continue
    for (const condition of asList(entry.cond)) {
      refs.push({ condition, polarity: entry.negate ? 'negative' : 'positive', channel: 'text', index })
    }
    for (const condition of asList(entry.none)) {
      refs.push({ condition, polarity: 'negative', channel: 'text', index })
    }
  }

  for (const [index, option] of (node.options || []).entries()) {
    for (const condition of asList(option.requires)) {
      refs.push({ condition, polarity: 'positive', channel: 'option', index, to: option.to })
    }
    for (const condition of asList(option.unless)) {
      refs.push({ condition, polarity: 'negative', channel: 'option', index, to: option.to })
    }
  }
  return refs
}

// `option.secret` was once presentation metadata, but the current reducer and
// view give it no semantics. Letting authors use it creates a fake hidden path;
// real discoveries must use a supported condition, item capability, knowledge,
// world fact, interaction scope, or world state.
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, option] of (node.options || []).entries()) {
    if (own(option, 'secret')) {
      fail('option.secret', `${nodeId}.options[${index}] -> ${option.to} authors unsupported option.secret`)
    }
  }
}

// Every fact emitted by an ending must reach the generic ambient-memory UI.
// Exercise the exported consumer rather than merely checking that two object
// keys happen to match.
const factProducers = new Map()
for (const [nodeId, node] of Object.entries(STORY)) {
  if (!node.end) continue
  const effects = asList(node.worldEffects)
  if (new Set(effects).size !== effects.length) fail('world-fact', `${nodeId} repeats an ending world fact`)
  for (const fact of effects) {
    if (typeof fact !== 'string' || !fact) {
      fail('world-fact', `${nodeId} emits a malformed world fact`)
      continue
    }
    if (!factProducers.has(fact)) factProducers.set(fact, [])
    factProducers.get(fact).push(nodeId)
  }
}

for (const [fact, producers] of factProducers) {
  const presentation = WORLD_FACT_PRESENTATION[fact]
  if (!presentation) {
    fail('ambient-consumer', `${fact}, produced by ${producers.join(', ')}, has no WORLD_FACT_PRESENTATION`)
    continue
  }
  if (typeof presentation.icon !== 'string' || !presentation.icon.trim() ||
      typeof presentation.text !== 'string' || !presentation.text.trim() ||
      !Array.isArray(presentation.regions) || presentation.regions.length === 0) {
    fail('ambient-consumer', `${fact} has an incomplete ambient presentation`)
    continue
  }
  const memories = worldMemoriesFromFacts(
    { [fact]: { atClock: 7, source: `audit:${producers[0]}` } },
    presentation.regions[0],
  )
  if (!memories.some((memory) => memory.id === fact && memory.regional)) {
    fail('ambient-consumer', `${fact} does not reach the ambient world-memory consumer in its own region`)
  }
}

for (const fact of Object.keys(WORLD_FACT_PRESENTATION)) {
  if (!factProducers.has(fact)) fail('ambient-consumer', `${fact} has stale presentation data but no ending producer`)
}

// Threats and structures get a stronger place-specific contract: the exact
// entry edge must be negatively gated by its resolved fact, and at least one
// reviewed return site must contain a positive callback for that same fact.
const reviewedOutcomeFacts = new Set()
for (const review of OUTCOME_SITE_REVIEWS) {
  const { fact, kind, gate, callbacks, note } = review
  if (reviewedOutcomeFacts.has(fact)) fail('outcome-review', `${fact} appears more than once in OUTCOME_SITE_REVIEWS`)
  reviewedOutcomeFacts.add(fact)
  if (!['threat', 'building', 'waterwork', 'relationship'].includes(kind)) fail('outcome-review', `${fact} has invalid kind '${kind}'`)
  if (typeof note !== 'string' || note.trim().length < 40) fail('outcome-review', `${fact} needs a meaningful review note`)
  if (!factProducers.has(fact)) fail('outcome-review', `${fact} has no ending producer`)

  const fromNode = STORY[gate.from]
  const gatedOptions = (fromNode?.options || []).filter((option) => !option.confuser && option.to === gate.to)
  if (!fromNode) fail('outcome-gate', `${fact} names missing gate node ${gate.from}`)
  else if (gatedOptions.length !== 1) {
    fail('outcome-gate', `${fact} expected one playable ${gate.from} -> ${gate.to} route, found ${gatedOptions.length}`)
  } else if (!asList(gatedOptions[0].unless).includes(`fact:${fact}`)) {
    fail('outcome-gate', `${gate.from} -> ${gate.to} is not hidden after fact:${fact}`)
  }

  const callbackRefs = callbacks.flatMap((nodeId) => {
    if (!STORY[nodeId]) {
      fail('outcome-callback', `${fact} names missing callback node ${nodeId}`)
      return []
    }
    return conditionRefsAt(nodeId).filter((ref) =>
      ref.condition === `fact:${fact}` && ref.polarity === 'positive')
  })
  if (callbackRefs.length === 0) {
    fail('outcome-callback', `${fact} has no positive fact:${fact} prose/option callback at ${callbacks.join(' or ')}`)
  }
}

for (const review of RESOLVED_TEMPORAL_PROSE_REVIEWS) {
  const node = STORY[review.nodeId]
  if (!node) {
    fail('resolved-prose', `${review.nodeId} is missing`)
    continue
  }
  if (typeof review.note !== 'string' || review.note.trim().length < 40) {
    fail('resolved-prose', `${review.nodeId} needs a meaningful review note`)
  }
  for (const [index, entry] of (node.text || []).entries()) {
    if (Array.isArray(entry) || !entry || typeof entry !== 'object') continue
    const conditions = asList(entry.cond)
    const temporal = conditions.some((condition) =>
      ['dawn', 'day', 'dusk', 'night'].includes(condition) || condition?.startsWith?.('became:'))
    if (!temporal) continue
    const excluded = new Set(asList(entry.none))
    if (entry.negate) for (const condition of conditions) excluded.add(condition)
    for (const fact of review.facts) {
      if (!excluded.has(`fact:${fact}`)) {
        fail('resolved-prose', `${review.nodeId}.text[${index}] can replay after fact:${fact}`)
      }
    }
  }
}

// Fixture persistence must affect more than the button that stamps its clock.
// Consumers are structured `fixture:<id>:<stage-or-group>` conditions. A
// consumer is downstream only when it lives outside every activation node.
const fixtureActivationNodes = new Map()
const fixtureConsumerNodes = new Map()
for (const fixtureId of Object.keys(TIMED_WORLD_FIXTURES)) {
  fixtureActivationNodes.set(fixtureId, new Set())
  fixtureConsumerNodes.set(fixtureId, new Set())
}

for (const [nodeId, node] of Object.entries(STORY)) {
  for (const option of node.options || []) {
    for (const effect of optionEffectsOf(option)) {
      if (effect?.type === 'fixture' && fixtureActivationNodes.has(effect.id)) {
        fixtureActivationNodes.get(effect.id).add(nodeId)
      }
    }
  }
  for (const ref of conditionRefsAt(nodeId)) {
    const parsed = parseFixtureCondition(ref.condition)
    if (parsed) fixtureConsumerNodes.get(parsed.fixtureId)?.add(nodeId)
  }
}

for (const [fixtureId, fixture] of Object.entries(TIMED_WORLD_FIXTURES)) {
  const activationNodes = fixtureActivationNodes.get(fixtureId)
  const consumers = fixtureConsumerNodes.get(fixtureId)
  if (activationNodes.size === 0) fail('fixture', `${fixtureId} has no authored activation`)
  if (!activationNodes.has(fixture.nodeId)) {
    fail('fixture', `${fixtureId} is not activated at its registered node ${fixture.nodeId}`)
  }
  const downstream = [...consumers].filter((nodeId) => !activationNodes.has(nodeId))
  if (downstream.length === 0) {
    const justification = LOCAL_ONLY_FIXTURE_REVIEWS[fixtureId]
    if (typeof justification !== 'string' || justification.trim().length < 60) {
      fail('fixture-callback', `${fixtureId} has no fixture-state consumer outside activation node(s) ${[...activationNodes].join(', ') || '(none)'}`)
    }
  }
}
for (const fixtureId of Object.keys(LOCAL_ONLY_FIXTURE_REVIEWS)) {
  if (!TIMED_WORLD_FIXTURES[fixtureId]) fail('fixture-review', `${fixtureId} is a stale local-only fixture review`)
}

// First validate every authored override generically, then enforce the small
// source-critical registry. Exact equality prevents an atmospheric event from
// being technically tagged but visibly wrong.
for (const [nodeId, node] of Object.entries(STORY)) {
  if (node.sceneWeather != null && !WEATHER_TYPES.includes(node.sceneWeather)) {
    fail('scene-weather', `${nodeId} has invalid sceneWeather '${node.sceneWeather}'`)
  }
}
for (const [nodeId, expectedWeather] of Object.entries(CRITICAL_WEATHER_REVIEWS)) {
  if (!STORY[nodeId]) fail('weather-review', `${nodeId} is missing`)
  else if (!WEATHER_TYPES.includes(expectedWeather)) fail('weather-review', `${nodeId} reviews invalid weather '${expectedWeather}'`)
  else if (STORY[nodeId].sceneWeather !== expectedWeather) {
    fail('weather-review', `${nodeId} requires sceneWeather '${expectedWeather}', found '${STORY[nodeId].sceneWeather ?? '(none)'}'`)
  }
}

if (failures.length) {
  console.error(`❌ consequence coherence: ${failures.length} failure${failures.length === 1 ? '' : 's'}`)
  for (const failure of failures) console.error(`  ${failure}`)
  process.exitCode = 1
} else {
  console.log(`✅ consequence coherence: ${factProducers.size} ending facts reach ambient memory`)
  console.log(`✅ ${OUTCOME_SITE_REVIEWS.length} resolved sites gate old routes and reward return visits`)
  console.log(`✅ ${RESOLVED_TEMPORAL_PROSE_REVIEWS.length} resolved sites suppress contradictory clock-driven prose`)
  console.log(`✅ ${Object.keys(TIMED_WORLD_FIXTURES).length} timed fixtures have downstream state consumers`)
  console.log(`✅ ${Object.keys(CRITICAL_WEATHER_REVIEWS).length} critical scenes declare exact weather`)
}
