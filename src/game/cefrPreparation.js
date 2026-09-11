// Guided preparation for the held-out CEFR capstones.
//
// The ordinary word and phrase ladders teach exact language. These activities
// teach the next layer: using already learned language to understand, respond,
// repair, recombine and relay. Capstone stimuli never appear here. UI code can
// render this registry directly and record its small evidence events locally.

import { DICT } from './dictionary.js'
import { CEFR_CAPSTONE_TASK_FAMILIES } from './cefrProgression.js'
import { PHRASE_STAGE_DEFINITIONS } from './phraseProgression.js'
import { WORD_CAPABILITY_DEFINITIONS } from './wordProgression.js'
import { CEFR_PREPARATION_VERSION } from './cefrPreparationEvidenceState.js'

export { CEFR_PREPARATION_VERSION }

// Guided examples are deterministic and must not teach a persistent story
// NPC's undiscovered name by accident. The adjacent current-story badge is
// state-aware; activity instructions use this fixed role label instead.
export const CEFR_PREPARATION_SCENARIO_COMPANION = 'the villager'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

const punctuation = (text) => ({ kind: 'punctuation', text })
const word = (senseId, surface = DICT[senseId]?.al) => {
  if (!DICT[senseId]) throw new Error(`Unknown preparation sense: ${senseId}`)
  return { kind: 'word', senseId, surface }
}

const renderAlbanian = (parts) => parts.map((part) =>
  part.kind === 'word' ? part.surface : part.text)
  .join(' ')
  .replace(/\s+([,.!?;:])/gu, '$1')
  .replace(/\s*\n\s*/gu, '\n')

// A preparation surface carries its dictionary bindings with it. This lets
// the audit and future UI use the exact same reviewed sense and form rather
// than attempting to recover them from a raw string.
const sq = (...parts) => ({
  kind: 'albanian',
  text: renderAlbanian(parts),
  tokens: parts.filter(({ kind }) => kind === 'word'),
})

const W = word
const P = punctuation

const COMMON_ANSWER_BOUNDARY = deepFreeze({
  beforeAttempt: ['Albanian task material', 'generic task instruction'],
  forbiddenBeforeAttempt: ['fluent English answer', 'English translation of an Albanian stimulus'],
  feedback: 'Show the relevant Albanian model and local word help only after an attempt.',
})

const activity = ({
  id,
  mechanicId,
  level,
  kind,
  nodeId,
  npcId = null,
  instruction,
  focusSenseIds,
  ...spec
}) => deepFreeze({
    id,
    mechanicId,
    level,
    kind,
    loreAnchor: { nodeId, ...(npcId ? { npcId } : {}) },
    instruction,
    focusSenseIds,
    answerBoundary: COMMON_ANSWER_BOUNDARY,
    ...spec,
})

export const CEFR_PREPARATION_CAPABILITIES = deepFreeze([
  'gist-then-detail',
  'focused-sound-to-spelling',
  'slot-recombination',
  'multiple-acceptable-replies',
  'meaning-driven-form-selection',
  'relationship-appropriate-register',
  'past-present-near-future-sequencing',
  'connectors-dhe-por-sepse',
  'local-record-replay-retry',
  'cue-faded-retelling-rehearsal',
  'adaptive-conversation-repair',
  'compensating-communication-strategies',
  'source-removed-audio-reconstruction',
  'scan-and-relay',
])

// Stage order is the curriculum order. A2 is deliberately downstream of the
// completed A1 level, not a difficulty guess based on lifetime token totals.
export const CEFR_PREPARATION_STAGES = deepFreeze([
  {
    id: 'a1-notice', level: 'A1', order: 0,
    label: 'Notice familiar language',
    outcome: 'Recognise a familiar message in continuous speech and short writing.',
  },
  {
    id: 'a1-respond', level: 'A1', order: 1,
    label: 'Respond with support',
    outcome: 'Choose, build and say a short response about an immediate need.',
  },
  {
    id: 'a1-repair', level: 'A1', order: 2,
    label: 'Keep the exchange moving',
    outcome: 'Ask for slower repetition and relay a visible fact to another person.',
  },
  {
    id: 'a2-understand', level: 'A2', order: 3,
    label: 'Find the point and the detail',
    outcome: 'Understand the main point first, then retrieve a practical detail.',
  },
  {
    id: 'a2-interact', level: 'A2', order: 4,
    label: 'Adapt and negotiate',
    outcome: 'Recombine slots, repair a turn and choose among several valid replies.',
  },
  {
    id: 'a2-connect', level: 'A2', order: 5,
    label: 'Connect events and reasons',
    outcome: 'Link past, present and near-future information with basic connectors.',
  },
  {
    id: 'a2-relay', level: 'A2', order: 6,
    label: 'Explain what matters',
    outcome: 'Scan or listen for the main point, relay it and agree on a next action.',
  },
])

const A1_ACTIVITIES = [
  activity({
    id: 'a1-audio-destination', mechanicId: 'a1-audio-meaning', level: 'A1',
    kind: 'listen-choice', nodeId: 'start', npcId: 'elira',
    instruction: 'Listen once, then choose the destination.',
    focusSenseIds: ['shko', 'fshat'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('po_prog'), W('shko', 'shkoj'), W('ne', 'në'), W('fshat'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
    },
    prompt: sq(W('ku'), W('po_prog'), W('shko', 'shkoj'), P('?')),
    options: [
      { id: 'village', text: sq(W('ne', 'Në'), W('fshat'), P('.')) },
      { id: 'bridge', text: sq(W('tek', 'Te'), W('ure', 'ura'), P('.')) },
    ],
    response: { kind: 'single-choice', correctOptionId: 'village' },
  }),
  activity({
    id: 'a1-audio-water-build', mechanicId: 'a1-audio-construction', level: 'A1',
    kind: 'listen-arrange', nodeId: 'kroi1', npcId: 'gruaUji',
    instruction: 'Listen, then put the heard words in order.',
    focusSenseIds: ['dua', 'uje', 'lutem'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('dua'), W('uje'), P(','), W('lutem', 'të lutem'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
    },
    tiles: [
      { id: 'water', text: sq(W('uje')) },
      { id: 'please', text: sq(W('lutem', 'të lutem')) },
      { id: 'want', text: sq(W('dua')) },
      { id: 'bread-distractor', text: sq(W('buke')) },
    ],
    response: { kind: 'ordered-tiles', correctIds: ['want', 'water', 'please'] },
  }),
  activity({
    id: 'a1-dictate-village-destination', mechanicId: 'a1-focused-dictation', level: 'A1',
    kind: 'listen-focused-dictation', nodeId: 'start', npcId: 'elira',
    instruction: 'Listen to the whole line, then type only the missing place word.',
    focusSenseIds: ['fshat'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('sot', 'Sot'), W('po_prog'), W('shko', 'shkoj'), W('ne', 'në'), W('fshat'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
    },
    maskedTranscript: [sq(W('sot', 'Sot'), W('po_prog'), W('shko', 'shkoj'), W('ne', 'në')), { kind: 'blank', id: 'heard-place' }, sq(P('.'))],
    target: { id: 'heard-place', senseId: 'fshat', surface: 'fshat' },
    response: {
      kind: 'focused-dictation', accepted: ['fshat'], exactDiacritics: true,
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a1-dictate-market-bread', mechanicId: 'a1-focused-dictation', level: 'A1',
    kind: 'listen-focused-dictation', nodeId: 'pazariFshatit',
    instruction: 'Listen to the whole request, then type only the missing item word.',
    focusSenseIds: ['buke'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('dua', 'Dua'), W('nje', 'një'), W('buke'), P(','), W('lutem', 'ju lutem'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
    },
    maskedTranscript: [sq(W('dua', 'Dua'), W('nje', 'një')), { kind: 'blank', id: 'heard-item' }, sq(P(','), W('lutem', 'ju lutem'), P('.'))],
    target: { id: 'heard-item', senseId: 'buke', surface: 'bukë' },
    response: {
      kind: 'focused-dictation', accepted: ['bukë'], exactDiacritics: true,
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a1-read-bread-price', mechanicId: 'a1-read-and-act', level: 'A1',
    kind: 'read-choice', nodeId: 'pazariFshatit',
    instruction: 'Read the stall card and choose the price.',
    focusSenseIds: ['buke', 'kushton', 'tete', 'lek'],
    source: sq(W('buke', 'Buka'), W('kushton'), W('tete'), W('lek', 'lekë'), P('.')),
    prompt: sq(W('sa', 'Sa'), W('kushton'), W('buke', 'buka'), P('?')),
    options: [
      { id: 'eight', text: sq(W('tete'), W('lek', 'lekë'), P('.')) },
      { id: 'ten', text: sq(W('dhjete'), W('lek', 'lekë'), P('.')) },
    ],
    response: { kind: 'single-choice', correctOptionId: 'eight' },
  }),
  activity({
    id: 'a1-destination-reply', mechanicId: 'a1-choice-dialogue', level: 'A1',
    kind: 'reply-choice', nodeId: 'bisedaUra1', npcId: 'elira',
    instruction: `Answer ${CEFR_PREPARATION_SCENARIO_COMPANION}’s question.`,
    focusSenseIds: ['ku', 'shko', 'fshat'],
    prompt: sq(W('ku', 'Ku'), W('po_prog'), W('shko', 'shkon'), P('?')),
    options: [
      { id: 'village', text: sq(W('po_prog'), W('shko', 'shkoj'), W('ne', 'në'), W('fshat'), P('.')) },
      { id: 'water', text: sq(W('dua'), W('uje'), P('.')) },
    ],
    response: { kind: 'single-choice', correctOptionId: 'village' },
  }),
  activity({
    id: 'a1-need-substitution', mechanicId: 'a1-slot-recombination', level: 'A1',
    kind: 'slot-frame', nodeId: 'pazariFshatit',
    instruction: 'Change the item while keeping the useful request frame.',
    visibleGoal: 'Make the new request ask for cheese.',
    focusSenseIds: ['dua', 'uje', 'buke', 'djathe', 'lutem'],
    frame: [sq(W('dua')), { kind: 'slot', id: 'item' }, sq(P(','), W('lutem', 'të lutem'), P('.'))],
    slots: {
      item: [
        { id: 'water', text: sq(W('uje')) },
        { id: 'bread', text: sq(W('buke')) },
        { id: 'cheese', text: sq(W('djathe')) },
      ],
    },
    challenge: { selections: { item: 'cheese' } },
    response: { kind: 'slot-selection', correctSelections: { item: 'cheese' } },
  }),
  activity({
    id: 'a1-bridge-recording', mechanicId: 'a1-record-replay', level: 'A1',
    kind: 'local-audio-cycle', nodeId: 'start', npcId: 'elira',
    instruction: 'Listen, record yourself, replay it, then retry or mark it ready.',
    focusSenseIds: ['ku', 'eshte', 'ure'],
    model: sq(W('ku'), W('eshte'), W('ure', 'ura'), P('?')),
    cycle: ['listen-to-model', 'record-locally', 'replay-own-audio', 'retry-or-self-check'],
    privacy: { persistRecording: false, uploadRecording: false, inference: 'none' },
    response: {
      kind: 'local-audio-cycle',
      required: ['recorded', 'replayed', 'selfCheck'],
      acceptedSelfChecks: ['ready'],
      retryAlwaysAvailable: true,
    },
  }),
  activity({
    id: 'a1-focused-village-spelling', mechanicId: 'a1-phrase-composition', level: 'A1',
    kind: 'focused-spelling', nodeId: 'start', npcId: 'elira',
    instruction: 'Type only the missing destination word.',
    visibleGoal: 'Destination: the village.',
    focusSenseIds: ['fshat'],
    frame: [sq(W('po_prog'), W('shko', 'shkoj'), W('ne', 'në')), { kind: 'blank', id: 'destination' }, sq(P('.'))],
    response: { kind: 'typed-exact', accepted: ['fshat'] },
  }),
  activity({
    id: 'a1-village-phrase-arrangement', mechanicId: 'a1-phrase-composition', level: 'A1',
    kind: 'sentence-arrangement', nodeId: 'start', npcId: 'elira',
    instruction: 'Build the complete Albanian sentence.',
    visibleGoal: 'Build: “I am going to the village.”',
    focusSenseIds: ['po_prog', 'shko', 'ne', 'fshat'],
    tiles: [
      { id: 'village', text: sq(W('fshat')) },
      { id: 'going', text: sq(W('po_prog'), W('shko', 'shkoj')) },
      { id: 'to', text: sq(W('ne', 'në')) },
      { id: 'bridge-distractor', text: sq(W('ure')) },
    ],
    response: { kind: 'ordered-tiles', correctIds: ['going', 'to', 'village'] },
  }),
  activity({
    id: 'a1-two-sentence-recombination', mechanicId: 'a1-phrase-composition', level: 'A1',
    kind: 'sentence-recombination', nodeId: 'fshatiSheshi', npcId: 'elira',
    instruction: 'Combine the two learned ideas into a short note.',
    visibleGoal: 'Include both ideas: “I am in the village” and “I want water.”',
    focusSenseIds: ['jam', 'fshat', 'dua', 'uje'],
    ideaCards: [
      { id: 'place', text: sq(W('jam'), W('ne', 'në'), W('fshat'), P('.')) },
      { id: 'need', text: sq(W('dua'), W('uje'), P('.')) },
    ],
    response: {
      kind: 'ordered-tiles',
      correctIds: ['place', 'need'],
      acceptedOrders: [['place', 'need'], ['need', 'place']],
    },
  }),
  activity({
    id: 'a1-inn-reply-set', mechanicId: 'a1-multiple-replies', level: 'A1',
    kind: 'accepted-reply-set', nodeId: 'bujtina',
    instruction: 'Accept the offered room with any natural reply.',
    focusSenseIds: ['dua', 'dhome', 'po_yes', 'faleminderit'],
    prompt: sq(W('a_q', 'A'), W('do'), W('nje', 'një'), W('dhome'), P('?')),
    options: [
      { id: 'yes-room', intent: 'accept-room', text: sq(W('po_yes', 'Po'), P(','), W('dua'), W('nje', 'një'), W('dhome'), P('.')) },
      { id: 'yes-thanks', intent: 'accept-room', text: sq(W('po_yes', 'Po'), P(','), W('faleminderit'), P('.')) },
      { id: 'no-water', intent: 'different-need', text: sq(W('jo', 'Jo'), P(','), W('dua'), W('uje'), P('.')) },
    ],
    response: { kind: 'multiple-acceptable-choice', acceptedOptionIds: ['yes-room', 'yes-thanks'], requiredIntent: 'accept-room' },
  }),
  activity({
    id: 'a1-slower-repetition', mechanicId: 'a1-conversation-repair', level: 'A1',
    kind: 'branching-repair', nodeId: 'bisedaUraPlan', npcId: 'elira',
    instruction: `Respond, or ask ${CEFR_PREPARATION_SCENARIO_COMPANION} to repeat more slowly.`,
    focusSenseIds: ['perserit', 'ngadale', 'lutem', 'vjen', 'treg'],
    opening: sq(W('a_q', 'A'), W('do_fut'), W('te_subj'), W('vjen', 'vish'), W('ne', 'në'), W('treg'), P('?')),
    replyOptions: [
      { id: 'accept', intent: 'accept', text: sq(W('po_yes', 'Po'), P(','), W('vjen', 'vij'), P('.')) },
      { id: 'decline', intent: 'decline', text: sq(W('jo', 'Jo'), P(','), W('nuk'), W('vjen', 'vij'), P('.')) },
      { id: 'repair', intent: 'repair', text: sq(W('perserit', 'Përsërite'), W('me_more', 'më'), W('ngadale'), P(','), W('lutem', 'të lutem'), P('.')) },
    ],
    initialReplyOptionIds: ['accept', 'decline', 'repair'],
    branches: {
      accept: { nextPrompt: sq(W('mire', 'Mirë'), P('.'), W('takohem', 'Takohemi'), W('ne', 'në'), W('treg'), P('.')), completes: true },
      decline: { nextPrompt: sq(W('mire', 'Mirë'), P('.'), W('takohem', 'Takohemi'), W('ketu'), P('.')), completes: true },
      repair: {
        nextPrompt: sq(W('vjen', 'Vjen'), W('ne', 'në'), W('treg'), P('?')),
        nextReplyOptionIds: ['accept', 'decline'],
        completes: false,
        simplified: true,
      },
    },
    response: { kind: 'branch-by-intent', retryAfterRepair: true },
  }),
  activity({
    id: 'a1-market-price-relay', mechanicId: 'a1-scan-relay', level: 'A1',
    kind: 'scan-and-relay', nodeId: 'pazariFshatit', npcId: 'elira',
    instruction: `Find the price on the card, then tell ${CEFR_PREPARATION_SCENARIO_COMPANION}.`,
    focusSenseIds: ['buke', 'tete', 'lek'],
    source: sq(W('buke', 'BUKË'), P(':'), W('tete', 'TETË'), W('lek', 'LEKË')),
    sourceHolder: 'stall-card',
    recipient: { npcId: 'elira', cannotSeeSource: true },
    prompt: sq(W('sa', 'Sa'), W('kushton'), W('buke', 'buka'), P('?')),
    factOptions: [
      { id: 'eight', text: sq(W('tete'), W('lek', 'lekë'), P('.')) },
      { id: 'ten', text: sq(W('dhjete'), W('lek', 'lekë'), P('.')) },
    ],
    relayOptions: [
      { id: 'relay-eight', concept: 'price-eight', text: sq(W('buke', 'Buka'), W('kushton'), W('tete'), W('lek', 'lekë'), P('.')) },
      { id: 'relay-ten', concept: 'price-ten', text: sq(W('buke', 'Buka'), W('kushton'), W('dhjete'), W('lek', 'lekë'), P('.')) },
    ],
    response: { kind: 'scan-and-relay', correctFactId: 'eight', acceptedRelayIds: ['relay-eight'] },
  }),
]

const A2_ACTIVITIES = [
  activity({
    id: 'a2-weather-market-gist', mechanicId: 'a2-gist-detail', level: 'A2',
    kind: 'gist-then-detail', nodeId: 'fshatiSheshi', npcId: 'elira',
    instruction: 'Listen for the main point first. The detail question opens afterwards.',
    focusSenseIds: ['mengjes', 'shi', 'bie', 'treg', 'hap', 'mesdite'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('ne', 'Në'), W('mengjes'), W('bie'), W('shi'), P('.'), W('treg', 'Tregu'), W('hap', 'hapet'), W('ne', 'në'), W('mesdite'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-both-responses',
    },
    rounds: [
      {
        id: 'gist', kind: 'gist', unlock: 'initial',
        prompt: sq(W('cfare', 'Çfarë'), W('ndodh'), P('?')),
        options: [
          { id: 'late-market', text: sq(W('treg', 'Tregu'), W('hap', 'hapet'), W('vone'), P('.')) },
          { id: 'closed-road', text: sq(W('rruge', 'Rruga'), W('eshte'), W('mbyllur'), P('.')) },
        ],
        correctOptionId: 'late-market',
      },
      {
        id: 'detail', kind: 'detail', unlock: 'after-gist-response',
        prompt: sq(W('kur', 'Kur'), W('hap', 'hapet'), W('treg', 'tregu'), P('?')),
        options: [
          { id: 'noon', text: sq(W('ne', 'Në'), W('mesdite'), P('.')) },
          { id: 'morning', text: sq(W('ne', 'Në'), W('mengjes'), P('.')) },
        ],
        correctOptionId: 'noon',
      },
    ],
    response: { kind: 'ordered-rounds', requiredRoundIds: ['gist', 'detail'] },
  }),
  activity({
    id: 'a2-delayed-market-message', mechanicId: 'a2-delayed-audio-reconstruction', level: 'A2',
    kind: 'source-removed-audio-reconstruction', nodeId: 'pazariFshatit',
    instruction: 'Hear the market message, let it disappear, then rebuild it from memory.',
    focusSenseIds: ['treg', 'hap', 'mesdite'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('ne', 'Në'), W('mesdite'), W('treg', 'tregu'), W('hap', 'hapet'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
    },
    memoryDelay: {
      sourceRemovedAfterPlayback: true,
      replayBeforeCommit: false,
      interveningCue: { kind: 'visual-cue', id: 'market-bell', symbol: '🔔' },
      minimumInterveningCueCount: 1,
    },
    chunks: [
      { id: 'noon', text: sq(W('ne', 'Në'), W('mesdite')) },
      { id: 'market-opens', text: sq(W('treg', 'tregu'), W('hap', 'hapet'), P('.')) },
      { id: 'morning-distractor', text: sq(W('ne', 'Në'), W('mengjes')) },
      { id: 'market-closes-distractor', text: sq(W('treg', 'tregu'), W('eshte'), W('mbyllur'), P('.')) },
    ],
    response: {
      kind: 'delayed-ordered-chunks',
      correctIds: ['noon', 'market-opens'],
      requiredSignals: ['played', 'delayCompleted'],
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-delayed-river-message', mechanicId: 'a2-delayed-audio-reconstruction', level: 'A2',
    kind: 'source-removed-audio-reconstruction', nodeId: 'fshatiLumi', npcId: 'elira',
    instruction: 'Hear the road warning, inspect the river, then rebuild the warning from memory.',
    focusSenseIds: ['rruge', 'mbyllur', 'ure', 'hapur'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('rruge', 'Rruga'), W('eshte'), W('mbyllur'), P(','), W('por'), W('ure', 'ura'), W('eshte'), W('hapur'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
    },
    memoryDelay: {
      sourceRemovedAfterPlayback: true,
      replayBeforeCommit: false,
      interveningCue: { kind: 'visual-cue', id: 'river-current', symbol: '🌊' },
      minimumInterveningCueCount: 1,
    },
    chunks: [
      { id: 'road-closed', text: sq(W('rruge', 'Rruga'), W('eshte'), W('mbyllur')) },
      { id: 'contrast', text: sq(P(','), W('por')) },
      { id: 'bridge-open', text: sq(W('ure', 'ura'), W('eshte'), W('hapur'), P('.')) },
      { id: 'bridge-closed-distractor', text: sq(W('ure', 'ura'), W('eshte'), W('mbyllur'), P('.')) },
    ],
    response: {
      kind: 'delayed-ordered-chunks',
      correctIds: ['road-closed', 'contrast', 'bridge-open'],
      requiredSignals: ['played', 'delayCompleted'],
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-bridge-notice-scan', mechanicId: 'a2-scan-information', level: 'A2',
    kind: 'scan-then-act', nodeId: 'start', npcId: 'elira',
    instruction: 'Scan the notice for the usable route and relay it.',
    focusSenseIds: ['ure', 'mbyllur', 'mengjes', 'rruge', 'majtas'],
    source: sq(W('ure', 'Ura'), W('eshte'), W('mbyllur'), W('ne', 'në'), W('mengjes'), P('.'), W('shko', 'Shko'), W('nga'), W('rruge', 'rruga'), W('majtas'), P('.')),
    prompts: [
      { id: 'status', text: sq(W('cfare', 'Çfarë'), W('eshte'), W('mbyllur'), P('?')), correctConcept: 'bridge-closed' },
      { id: 'route', text: sq(W('nga', 'Nga'), W('duhet'), W('te_subj'), W('shko', 'shkosh'), P('?')), correctConcept: 'left-road' },
    ],
    answerCards: [
      { id: 'bridge-closed', text: sq(W('ure', 'Ura'), P('.')) },
      { id: 'market-closed', text: sq(W('treg', 'Tregu'), P('.')) },
      { id: 'left-road', text: sq(W('nga'), W('rruge', 'rruga'), W('majtas'), P('.')) },
      { id: 'right-road', text: sq(W('nga'), W('rruge', 'rruga'), W('djathtas'), P('.')) },
    ],
    response: { kind: 'fact-map', correctByPrompt: { status: 'bridge-closed', route: 'left-road' } },
  }),
  activity({
    id: 'a2-meeting-branch-repair', mechanicId: 'a2-branching-repair', level: 'A2',
    kind: 'branching-repair', nodeId: 'fshatiSheshi', npcId: 'elira',
    instruction: 'Arrange the meeting; ask for repetition if the first turn is unclear.',
    focusSenseIds: ['takohem', 'neser', 'ore', 'nente', 'perserit', 'ngadale'],
    opening: sq(W('kur', 'Kur'), W('takohem', 'takohemi'), P('?')),
    replyOptions: [
      { id: 'time', intent: 'propose-time', text: sq(W('neser', 'Nesër'), W('ne', 'në'), W('ore', 'orën'), W('nente'), P('.')) },
      { id: 'repair', intent: 'repair', text: sq(W('perserit', 'Përsërite'), W('me_more', 'më'), W('ngadale'), P(','), W('lutem', 'të lutem'), P('.')) },
      { id: 'confirm-well', intent: 'confirm-place', text: sq(W('po_yes', 'Po'), P(','), W('takohem', 'takohemi'), W('tek', 'te'), W('pus', 'pusi'), P('.')) },
      { id: 'change-to-bridge', intent: 'change-place', text: sq(W('jo', 'Jo'), P(','), W('takohem', 'takohemi'), W('tek', 'te'), W('ure', 'ura'), P('.')) },
    ],
    initialReplyOptionIds: ['time', 'repair'],
    branches: {
      'propose-time': {
        nextPrompt: sq(W('ne', 'Në'), W('shesh'), W('ka'), W('shume'), W('njeri', 'njerëz'), P('.'), W('takohem', 'Takohemi'), W('tek', 'te'), W('pus', 'pusi'), P('?')),
        nextReplyOptionIds: ['confirm-well', 'change-to-bridge'],
        completes: false,
      },
      repair: {
        nextPrompt: sq(W('neser', 'Nesër'), P(','), W('ne', 'në'), W('cfare', 'çfarë'), W('ore', 'ore'), P('?')),
        nextReplyOptionIds: ['time'],
        completes: false,
        simplified: true,
      },
      'confirm-place': { completes: true },
      'change-place': { completes: true },
    },
    response: { kind: 'branch-by-intent', retryAfterRepair: true, minimumTurns: 2 },
  }),
  activity({
    id: 'a2-point-and-ask-lighter', mechanicId: 'a2-communication-strategies', level: 'A2',
    kind: 'strategy-and-recovery', nodeId: 'tregtari',
    instruction: 'When the item word is missing, point, ask for its name, then use the answer.',
    focusSenseIds: ['si', 'quhem', 'kjo', 'cakmak'],
    missingWordContext: {
      availableReferent: { kind: 'world-object', itemId: 'cakmak', canPoint: true },
      knowledgeState: 'word-not-retrievable',
    },
    strategyOptions: [
      { id: 'point-and-name', strategy: 'point-and-ask-name', text: sq(W('si', 'Si'), W('quhem', 'quhet'), W('kjo'), P('?')) },
      { id: 'guess-bread', strategy: 'guess', text: sq(W('a_q', 'A'), W('eshte'), W('buke'), P('?')) },
      { id: 'ask-bridge', strategy: 'change-topic', text: sq(W('ku', 'Ku'), W('eshte'), W('ure', 'ura'), P('?')) },
    ],
    recovery: {
      revealAfterStrategy: 'point-and-name',
      source: sq(W('quhem', 'Quhet'), W('cakmak'), P('.')),
      options: [
        { id: 'request-lighter', text: sq(W('dua', 'Dua'), W('cakmak', 'çakmakun'), P(','), W('lutem', 'ju lutem'), P('.')) },
        { id: 'request-bread', text: sq(W('dua', 'Dua'), W('buke'), P(','), W('lutem', 'ju lutem'), P('.')) },
      ],
    },
    response: {
      kind: 'strategy-and-recovery',
      acceptedStrategyIds: ['point-and-name'],
      acceptedRecoveryIds: ['request-lighter'],
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-ask-slower-road-warning', mechanicId: 'a2-communication-strategies', level: 'A2',
    kind: 'strategy-and-recovery', nodeId: 'fshatiSheshi', npcId: 'plakuSheshit',
    instruction: 'When noise hides a warning, ask for slower speech, then act on the clearer message.',
    focusSenseIds: ['kuptoj', 'ngadale', 'lutem', 'rruge', 'mbyllur', 'shko', 'ure'],
    stimulus: {
      channel: 'continuous-audio',
      transcript: sq(W('rruge', 'Rruga'), W('prane', 'pranë'), W('lume', 'lumit'), W('eshte'), W('mbyllur'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-response',
      interference: 'market-noise',
    },
    strategyOptions: [
      { id: 'slower-respectful', strategy: 'ask-slower', text: sq(W('nuk', 'Nuk'), W('kuptoj'), P('.'), W('me_more', 'Më'), W('ngadale'), P(','), W('lutem', 'ju lutem'), P('.')) },
      { id: 'short-slower', strategy: 'ask-slower', text: sq(W('me_more', 'Më'), W('ngadale'), P(','), W('lutem', 'ju lutem'), P('.')) },
      { id: 'pretend-understood', strategy: 'pretend-understood', text: sq(W('po_yes', 'Po'), P(','), W('kuptoj'), P('.')) },
    ],
    recovery: {
      revealAfterStrategies: ['slower-respectful', 'short-slower'],
      source: sq(W('rruge', 'Rruga'), W('eshte'), W('mbyllur'), P('.'), W('shko', 'Shko'), W('nga'), W('ure', 'ura'), P('.')),
      sourceReveal: 'after-strategy',
      options: [
        { id: 'use-bridge', text: sq(W('shko', 'Shko'), W('nga'), W('ure', 'ura'), P('.')) },
        { id: 'use-road', text: sq(W('shko', 'Shko'), W('nga'), W('rruge', 'rruga'), P('.')) },
      ],
    },
    response: {
      kind: 'strategy-and-recovery',
      acceptedStrategyIds: ['slower-respectful', 'short-slower'],
      acceptedRecoveryIds: ['use-bridge'],
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-register-familiar-companion', mechanicId: 'a2-register-pragmatics', level: 'A2',
    kind: 'relationship-sensitive-reply', nodeId: 'start', npcId: 'elira',
    instruction: 'Call a close friend whom you already address as ti, using a matching familiar request.',
    focusSenseIds: ['ti', 'ju', 'vjen', 'lutem'],
    relationshipCue: { familiarity: 'close-friend-already-addressed-as-ti', audienceSize: 1, expectedRegister: 'familiar-singular' },
    options: [
      { id: 'familiar-verb-first', register: 'familiar-singular', text: sq(W('vjen', 'Eja'), P(','), W('lutem', 'të lutem'), P('.')) },
      { id: 'familiar-please-first', register: 'familiar-singular', text: sq(W('lutem', 'Të lutem'), P(','), W('vjen', 'eja'), P('.')) },
      { id: 'respectful', register: 'respectful-or-plural', text: sq(W('vjen', 'Ejani'), P(','), W('lutem', 'ju lutem'), P('.')) },
      { id: 'mixed', register: 'mismatched', text: sq(W('vjen', 'Ejani'), P(','), W('lutem', 'të lutem'), P('.')) },
    ],
    registerContrast: [
      { register: 'familiar-singular', pronoun: sq(W('ti')), imperative: sq(W('vjen', 'eja')), politeness: sq(W('lutem', 'të lutem')) },
      { register: 'respectful-or-plural', pronoun: sq(W('ju')), imperative: sq(W('vjen', 'ejani')), politeness: sq(W('lutem', 'ju lutem')) },
    ],
    response: {
      kind: 'register-appropriate-choice',
      acceptedOptionIds: ['familiar-verb-first', 'familiar-please-first'],
      expectedRegister: 'familiar-singular',
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-register-respectful-elder', mechanicId: 'a2-register-pragmatics', level: 'A2',
    kind: 'relationship-sensitive-reply', nodeId: 'fshatiSheshi', npcId: 'plakuSheshit',
    instruction: 'Call the square elder over with a matching respectful request.',
    focusSenseIds: ['ti', 'ju', 'vjen', 'lutem'],
    relationshipCue: { familiarity: 'older-stranger', audienceSize: 1, expectedRegister: 'respectful-or-plural' },
    options: [
      { id: 'respectful-verb-first', register: 'respectful-or-plural', text: sq(W('vjen', 'Ejani'), P(','), W('lutem', 'ju lutem'), P('.')) },
      { id: 'respectful-please-first', register: 'respectful-or-plural', text: sq(W('lutem', 'Ju lutem'), P(','), W('vjen', 'ejani'), P('.')) },
      { id: 'familiar', register: 'familiar-singular', text: sq(W('vjen', 'Eja'), P(','), W('lutem', 'të lutem'), P('.')) },
      { id: 'mixed', register: 'mismatched', text: sq(W('vjen', 'Eja'), P(','), W('lutem', 'ju lutem'), P('.')) },
    ],
    registerContrast: [
      { register: 'familiar-singular', pronoun: sq(W('ti')), imperative: sq(W('vjen', 'eja')), politeness: sq(W('lutem', 'të lutem')) },
      { register: 'respectful-or-plural', pronoun: sq(W('ju')), imperative: sq(W('vjen', 'ejani')), politeness: sq(W('lutem', 'ju lutem')) },
    ],
    response: {
      kind: 'register-appropriate-choice',
      acceptedOptionIds: ['respectful-verb-first', 'respectful-please-first'],
      expectedRegister: 'respectful-or-plural',
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-form-who-goes', mechanicId: 'a2-meaning-switch-forms', level: 'A2',
    kind: 'meaning-switch-form', nodeId: 'start', npcId: 'elira',
    instruction: 'Choose the verb form that makes the shown traveller the one moving now.',
    focusSenseIds: ['shko'],
    worldCue: { actor: 'traveller-self', time: 'present-progressive', destination: 'village' },
    frame: [sq(W('une', 'Unë'), W('po_prog')), { kind: 'blank', id: 'movement-form' }, sq(W('ne', 'në'), W('fshat'), P('.'))],
    options: [
      { id: 'first-singular-present', surface: 'shkoj', text: sq(W('shko', 'shkoj')) },
      { id: 'second-singular-present', surface: 'shkon', text: sq(W('shko', 'shkon')) },
      { id: 'first-plural-present', surface: 'shkojmë', text: sq(W('shko', 'shkojmë')) },
      { id: 'third-singular-past', surface: 'shkoi', text: sq(W('shko', 'shkoi')) },
    ],
    response: {
      kind: 'meaning-switch-choice', correctOptionId: 'first-singular-present', switchDimension: 'actor',
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-form-when-he-goes', mechanicId: 'a2-meaning-switch-forms', level: 'A2',
    kind: 'meaning-switch-form', nodeId: 'fshatiSheshi', npcId: 'elira',
    instruction: 'Choose the verb form for a completed journey yesterday; the traveller is here now.',
    focusSenseIds: ['shko'],
    worldCue: { actor: 'one-other-traveller', time: 'completed-yesterday-now-here', destination: 'village' },
    frame: [sq(W('dje', 'Dje'), W('ai')), { kind: 'blank', id: 'movement-form' }, sq(W('ne', 'në'), W('fshat'), P('.'), W('tani', 'Tani'), W('eshte'), W('ketu'), P('.'))],
    options: [
      { id: 'first-singular-present', surface: 'shkoj', text: sq(W('shko', 'shkoj')) },
      { id: 'second-singular-present', surface: 'shkon', text: sq(W('shko', 'shkon')) },
      { id: 'first-plural-present', surface: 'shkojmë', text: sq(W('shko', 'shkojmë')) },
      { id: 'third-singular-past', surface: 'shkoi', text: sq(W('shko', 'shkoi')) },
    ],
    response: {
      kind: 'meaning-switch-choice', correctOptionId: 'third-singular-past', switchDimension: 'time',
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-reason-slot-frame', mechanicId: 'a2-slot-recombination', level: 'A2',
    kind: 'multi-slot-frame', nodeId: 'pazariFshatit',
    instruction: 'Build a new reasoned plan by changing both slots.',
    visibleGoal: 'Avoid the market; give rain as the reason.',
    focusSenseIds: ['shko', 'treg', 'fshat', 'sepse', 'shi', 'bie'],
    frame: [sq(W('nuk', 'Nuk'), W('shko', 'shkoj'), W('ne', 'në')), { kind: 'slot', id: 'place' }, sq(W('sepse')), { kind: 'slot', id: 'reason' }, sq(P('.'))],
    slots: {
      place: [
        { id: 'market', text: sq(W('treg')) },
        { id: 'village', text: sq(W('fshat')) },
      ],
      reason: [
        { id: 'rain', text: sq(W('bie'), W('shi')) },
        { id: 'far', text: sq(W('jam'), W('larg')) },
      ],
    },
    challenge: { selections: { place: 'market', reason: 'rain' } },
    response: { kind: 'slot-selection', correctSelections: { place: 'market', reason: 'rain' } },
  }),
  activity({
    id: 'a2-help-reply-set', mechanicId: 'a2-multiple-replies', level: 'A2',
    kind: 'accepted-reply-set', nodeId: 'start', npcId: 'elira',
    instruction: 'Choose any complete, relevant reply; more than one is correct.',
    focusSenseIds: ['mund', 'ndihmo', 'ure', 'neser', 'vjen'],
    prompt: sq(W('a_q', 'A'), W('mund'), W('te_subj'), W('me_obj', 'më'), W('ndihmo', 'ndihmosh'), W('tek', 'te'), W('ure', 'ura'), W('neser'), P('?')),
    options: [
      { id: 'accept', intent: 'accept-help', text: sq(W('po_yes', 'Po'), P(','), W('vjen', 'vij'), W('neser'), P('.')) },
      { id: 'accept-can', intent: 'accept-help', text: sq(W('po_yes', 'Po'), P(','), W('mund'), W('te_subj'), W('vjen', 'vij'), P('.')) },
      { id: 'decline', intent: 'decline-with-apology', text: sq(W('me_obj', 'Më'), W('fal'), P(','), W('nuk'), W('mund'), W('te_subj'), W('vjen', 'vij'), W('neser'), P('.')) },
      { id: 'unrelated', intent: 'unrelated', text: sq(W('dua'), W('buke'), P('.')) },
    ],
    response: {
      kind: 'multiple-acceptable-choice',
      acceptedOptionIds: ['accept', 'accept-can', 'decline'],
      acceptedIntents: ['accept-help', 'decline-with-apology'],
    },
  }),
  activity({
    id: 'a2-journey-time-sequence', mechanicId: 'a2-temporal-sequencing', level: 'A2',
    kind: 'temporal-sequence', nodeId: 'bujtina', npcId: 'elira',
    instruction: 'Put the journey in past, present, then near-future order.',
    focusSenseIds: ['dje', 'vjen', 'sot', 'jam', 'neser', 'do_fut', 'shko'],
    cards: [
      { id: 'present', time: 'present', text: sq(W('sot', 'Sot'), W('jam'), W('ne', 'në'), W('bujtine'), P('.')) },
      { id: 'future', time: 'near-future', text: sq(W('neser', 'Nesër'), W('do_fut'), W('te_subj'), W('shko', 'shkoj'), W('ne', 'në'), W('treg'), P('.')) },
      { id: 'past', time: 'past', text: sq(W('dje', 'Dje'), W('vjen', 'erdha'), W('ne', 'në'), W('fshat'), P('.')) },
    ],
    response: { kind: 'ordered-tiles', correctIds: ['past', 'present', 'future'] },
  }),
  activity({
    id: 'a2-basic-connectors', mechanicId: 'a2-connector-links', level: 'A2',
    kind: 'connector-slots', nodeId: 'bujtina',
    instruction: 'Choose the connector that expresses addition, contrast or reason.',
    focusSenseIds: ['dhe', 'por', 'sepse'],
    sentences: [
      {
        id: 'addition', relation: 'addition',
        frame: [sq(W('dua', 'Dua'), W('buke')), { kind: 'slot', id: 'connector' }, sq(W('uje'), P('.'))],
        correctSenseId: 'dhe',
      },
      {
        id: 'contrast', relation: 'contrast',
        frame: [sq(W('dua', 'Dua'), W('te_subj'), W('vjen', 'vij'), P(',')), { kind: 'slot', id: 'connector' }, sq(W('jam'), W('larg'), P('.'))],
        correctSenseId: 'por',
      },
      {
        id: 'reason', relation: 'reason',
        frame: [sq(W('nuk', 'Nuk'), W('vjen', 'vij')), { kind: 'slot', id: 'connector' }, sq(W('bie'), W('shi'), P('.'))],
        correctSenseId: 'sepse',
      },
    ],
    connectorOptions: [
      { id: 'dhe', text: sq(W('dhe')) },
      { id: 'por', text: sq(W('por')) },
      { id: 'sepse', text: sq(W('sepse')) },
    ],
    response: { kind: 'connector-map', correctBySentence: { addition: 'dhe', contrast: 'por', reason: 'sepse' } },
  }),
  activity({
    id: 'a2-journey-recording', mechanicId: 'a2-record-replay', level: 'A2',
    kind: 'local-audio-cycle', nodeId: 'bujtina', npcId: 'elira',
    instruction: 'Answer all three Albanian prompts, replay your recording, then revise once if needed.',
    focusSenseIds: ['ku', 'jam', 'dje', 'tani', 'neser', 'shko'],
    prompts: [
      sq(W('ku', 'Ku'), W('jam', 'ishe'), W('dje'), P('?')),
      sq(W('ku', 'Ku'), W('je'), W('tani'), P('?')),
      sq(W('ku', 'Ku'), W('do_fut'), W('te_subj'), W('shko', 'shkosh'), W('neser'), P('?')),
    ],
    cycle: ['plan-three-ideas', 'record-locally', 'replay-own-audio', 'retry-once-or-self-check'],
    privacy: { persistRecording: false, uploadRecording: false, inference: 'none' },
    response: {
      kind: 'local-audio-cycle',
      required: ['recorded', 'replayed', 'selfCheck'],
      acceptedSelfChecks: ['ready'],
      retryAlwaysAvailable: true,
      selfCheckCriteria: ['past-answer', 'present-answer', 'near-future-answer', 'intelligible-to-self'],
    },
  }),
  activity({
    id: 'a2-retell-bolla-warning', mechanicId: 'a2-faded-retelling', level: 'A2',
    kind: 'cue-faded-local-retelling', nodeId: 'bolla1',
    instruction: 'Witness the warning, tell it once with cue cards, then tell it again from scene cues.',
    focusSenseIds: ['bolla', 'fle', 'lume', 'rruge', 'mbyllur', 'por', 'ure', 'hapur'],
    stimulus: {
      channel: 'continuous-audio',
      role: 'witness-event',
      transcript: sq(W('bolla', 'Bolla'), W('fle'), W('ne', 'në'), W('lume', 'lumë'), P('.'), W('rruge', 'Rruga'), W('eshte'), W('mbyllur'), P(','), W('por'), W('ure', 'ura'), W('eshte'), W('hapur'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-second-retelling',
    },
    rounds: [
      {
        id: 'supported', support: 'albanian-cue-cards',
        cueCards: [
          { id: 'bolla-sleeps-in-river', text: sq(W('bolla'), W('fle'), W('ne', 'në'), W('lume', 'lumë')) },
          { id: 'road-is-closed', text: sq(W('rruge', 'rruga'), W('mbyllur')) },
          { id: 'bridge-is-open', text: sq(W('ure', 'ura'), W('hapur')) },
        ],
      },
      {
        id: 'faded', support: 'scene-cues-only',
        cues: [
          { kind: 'visual-cue', id: 'serpent', symbol: '🐉' },
          { kind: 'visual-cue', id: 'river', symbol: '🌊' },
          { kind: 'visual-cue', id: 'blocked-road', symbol: '⛔' },
          { kind: 'visual-cue', id: 'open-bridge', symbol: '🌉' },
        ],
      },
    ],
    cycle: ['witness-once', 'record-supported', 'replay-supported', 'remove-word-cues', 'record-faded', 'replay-faded', 'retry-or-self-check'],
    privacy: { persistRecording: false, uploadRecording: false, inference: 'none' },
    response: {
      kind: 'faded-local-audio-cycle',
      requiredRoundIds: ['supported', 'faded'],
      acceptedSelfChecks: ['ready'],
      requiredCriteriaByRound: {
        supported: ['bolla-sleeps-in-river', 'road-is-closed', 'bridge-is-open'],
        faded: ['bolla-sleeps-in-river', 'road-is-closed', 'bridge-is-open'],
      },
      retryAlwaysAvailable: true,
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-retell-rainy-market', mechanicId: 'a2-faded-retelling', level: 'A2',
    kind: 'cue-faded-local-retelling', nodeId: 'pazariFshatit',
    instruction: 'Hear the market update, tell it with word cues, then tell it again from the scene alone.',
    focusSenseIds: ['sot', 'bie', 'shi', 'treg', 'hap', 'mesdite'],
    stimulus: {
      channel: 'continuous-audio',
      role: 'witness-event',
      transcript: sq(W('sot', 'Sot'), W('bie'), W('shi'), P('.'), W('treg', 'Tregu'), W('hap', 'hapet'), W('ne', 'në'), W('mesdite'), P('.')),
      beforeAttempt: 'audio-only',
      transcriptReveal: 'after-second-retelling',
    },
    rounds: [
      {
        id: 'supported', support: 'albanian-cue-cards',
        cueCards: [
          { id: 'it-is-raining-today', text: sq(W('sot'), W('shi')) },
          { id: 'market-opens-at-noon', text: sq(W('treg', 'tregu'), W('mesdite')) },
        ],
      },
      {
        id: 'faded', support: 'scene-cues-only',
        cues: [
          { kind: 'visual-cue', id: 'rain-now', symbol: '🌧️' },
          { kind: 'visual-cue', id: 'market-bell', symbol: '🔔' },
          { kind: 'visual-cue', id: 'noon', symbol: '🕛' },
        ],
      },
    ],
    cycle: ['witness-once', 'record-supported', 'replay-supported', 'remove-word-cues', 'record-faded', 'replay-faded', 'retry-or-self-check'],
    privacy: { persistRecording: false, uploadRecording: false, inference: 'none' },
    response: {
      kind: 'faded-local-audio-cycle',
      requiredRoundIds: ['supported', 'faded'],
      acceptedSelfChecks: ['ready'],
      requiredCriteriaByRound: {
        supported: ['it-is-raining-today', 'market-opens-at-noon'],
        faded: ['it-is-raining-today', 'market-opens-at-noon'],
      },
      retryAlwaysAvailable: true,
      evidencePolicy: {
        freshPassAttemptMode: 'fresh-hidden',
        supportedAttemptMode: 'supported-visible',
        supportedCorrectOutcome: 'practice-only',
      },
    },
  }),
  activity({
    id: 'a2-message-reconstruction', mechanicId: 'a2-message-replies', level: 'A2',
    kind: 'message-reconstruction', nodeId: 'fshatiSheshi', npcId: 'elira',
    instruction: 'Rebuild the note, then choose any reply that fits the change.',
    visibleGoal: 'The note arranges tomorrow’s meeting at nine by the well.',
    focusSenseIds: ['takohem', 'neser', 'ore', 'nente', 'pus', 'mire'],
    messageTiles: [
      { id: 'meeting', text: sq(W('takohem', 'Takohemi')) },
      { id: 'tomorrow', text: sq(W('neser')) },
      { id: 'time', text: sq(W('ne', 'në'), W('ore', 'orën'), W('nente')) },
      { id: 'place', text: sq(W('tek', 'te'), W('pus', 'pusi'), P('.')) },
    ],
    replyOptions: [
      { id: 'accept', intent: 'confirm', text: sq(W('mire', 'Mirë'), P(','), W('takohem', 'takohemi'), W('tek', 'te'), W('pus', 'pusi'), P('.')) },
      { id: 'ask-place', intent: 'clarify', text: sq(W('ku', 'Ku'), W('takohem', 'takohemi'), P('?')) },
      { id: 'unrelated', intent: 'unrelated', text: sq(W('buke', 'Buka'), W('kushton'), W('tete'), W('lek', 'lekë'), P('.')) },
    ],
    response: {
      kind: 'reconstruct-and-reply',
      correctMessageIds: ['meeting', 'tomorrow', 'time', 'place'],
      acceptedMessageOrders: [
        ['meeting', 'tomorrow', 'time', 'place'],
        ['meeting', 'tomorrow', 'place', 'time'],
        ['meeting', 'time', 'tomorrow', 'place'],
        ['meeting', 'time', 'place', 'tomorrow'],
        ['meeting', 'place', 'tomorrow', 'time'],
        ['meeting', 'place', 'time', 'tomorrow'],
        ['tomorrow', 'meeting', 'time', 'place'],
        ['tomorrow', 'meeting', 'place', 'time'],
      ],
      acceptedReplyIds: ['accept', 'ask-place'],
    },
  }),
  activity({
    id: 'a2-connected-note-builder', mechanicId: 'a2-paragraph-assembly', level: 'A2',
    kind: 'guided-paragraph-assembly', nodeId: 'bujtina', npcId: 'elira',
    instruction: 'Build a short connected note from the event, situation, reason and plan.',
    focusSenseIds: ['dje', 'prit', 'sot', 'jam', 'por', 'sepse', 'neser', 'shko'],
    clauseCards: [
      { id: 'past', role: 'past-event', text: sq(W('dje', 'Dje'), W('prit', 'prita'), W('tek', 'te'), W('ure', 'ura'), P('.')) },
      { id: 'present', role: 'present-state', text: sq(W('sot', 'Sot'), W('jam'), W('ne', 'në'), W('fshat'), P('.')) },
      { id: 'problem', role: 'reason', text: sq(W('bie', 'Bie'), W('shi'), P('.')) },
      { id: 'future', role: 'near-future', text: sq(W('neser', 'Nesër'), W('do_fut'), W('te_subj'), W('shko', 'shkoj'), W('ne', 'në'), W('treg'), P('.')) },
    ],
    connectorOptions: [
      { id: 'dhe', text: sq(W('dhe')) },
      { id: 'por', text: sq(W('por')) },
      { id: 'sepse', text: sq(W('sepse')) },
    ],
    requiredLinks: [
      { between: ['past', 'present'], allowedSenseIds: ['dhe', 'por'] },
      { between: ['present', 'problem'], allowedSenseIds: ['sepse'] },
      { between: ['problem', 'future'], allowedSenseIds: ['por', 'dhe'] },
    ],
    response: {
      kind: 'paragraph-plan',
      requiredRoles: ['past-event', 'present-state', 'reason', 'near-future'],
      requiredConnectorSenseIds: ['sepse'],
      minimumDistinctConnectors: 2,
    },
  }),
  activity({
    id: 'a2-road-main-point-relay', mechanicId: 'a2-main-point-relay', level: 'A2',
    kind: 'main-point-relay-and-agree', nodeId: 'fshatiLumi', npcId: 'elira',
    instruction: 'Identify the warning, relay the usable route, then agree on the next action.',
    focusSenseIds: ['shi', 'rruge', 'lume', 'mbyllur', 'ure', 'hapur', 'shko'],
    source: sq(W('bie', 'Bie'), W('shi'), W('dhe'), W('rruge', 'rruga'), W('prane', 'pranë'), W('lume', 'lumit'), W('eshte'), W('mbyllur'), P('.'), W('ure', 'Ura'), W('eshte'), W('hapur'), P('.')),
    sourceHolder: 'road-keeper',
    recipient: { npcId: 'elira', cannotHearSource: true },
    steps: [
      { id: 'main-point', prompt: sq(W('cfare', 'Çfarë'), W('ndodh'), W('me'), W('rruge', 'rrugën'), P('?')) },
      { id: 'relay', prompt: sq(W('nga', 'Nga'), W('mund'), W('te_subj'), W('shko', 'shkojmë'), P('?')) },
      { id: 'agreement', prompt: sq(W('a_q', 'A'), W('shko', 'shkojmë'), W('nga'), W('ure', 'ura'), P('?')) },
    ],
    responseOptions: [
      { id: 'road-closed', concept: 'warning', text: sq(W('rruge', 'Rruga'), W('eshte'), W('mbyllur'), P('.')) },
      { id: 'bridge-open', concept: 'route', text: sq(W('ure', 'Ura'), W('eshte'), W('hapur'), P('.')) },
      { id: 'agree-bridge', concept: 'agreement', text: sq(W('po_yes', 'Po'), P(','), W('shko', 'shkojmë'), W('nga'), W('ure', 'ura'), P('.')) },
      { id: 'repair', concept: 'repair', text: sq(W('perserit', 'Përsërite'), P(','), W('lutem', 'të lutem'), P('.')) },
    ],
    response: {
      kind: 'relay-and-agree',
      correctByStep: { 'main-point': 'road-closed', relay: 'bridge-open', agreement: 'agree-bridge' },
      repairOptionId: 'repair',
      repairChangesPrompt: true,
    },
  }),
]

export const CEFR_PREPARATION_ACTIVITIES = deepFreeze([...A1_ACTIVITIES, ...A2_ACTIVITIES])

const activitiesForMechanic = (mechanicId) =>
  CEFR_PREPARATION_ACTIVITIES.filter((entry) => entry.mechanicId === mechanicId)

export const CEFR_PREPARATION_MECHANICS = deepFreeze({
  'a1-audio-meaning': {
    id: 'a1-audio-meaning', level: 'A1', stageId: 'a1-notice', order: 0,
    label: 'Hear a familiar message', capabilities: [],
    readiness: { wordCapabilityId: 'meaning-recognition', prerequisiteMechanicIds: [] },
  },
  'a1-audio-construction': {
    id: 'a1-audio-construction', level: 'A1', stageId: 'a1-notice', order: 1,
    label: 'Build what you hear', capabilities: [],
    readiness: { wordCapabilityId: 'controlled-retrieval-supported', prerequisiteMechanicIds: ['a1-audio-meaning'] },
  },
  'a1-focused-dictation': {
    id: 'a1-focused-dictation', level: 'A1', stageId: 'a1-notice', order: 2,
    label: 'Write one word from continuous speech', capabilities: ['focused-sound-to-spelling'],
    readiness: { wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a1-audio-construction'] },
    mastery: {
      completionPolicy: 'all-authored-activities', minimumDistinctActivities: 2,
      minimumDistinctContexts: 2, contextKey: 'loreAnchor.nodeId',
    },
  },
  'a1-read-and-act': {
    id: 'a1-read-and-act', level: 'A1', stageId: 'a1-notice', order: 3,
    label: 'Read and act', capabilities: [],
    readiness: { wordCapabilityId: 'meaning-recognition', prerequisiteMechanicIds: ['a1-audio-meaning'] },
  },
  'a1-choice-dialogue': {
    id: 'a1-choice-dialogue', level: 'A1', stageId: 'a1-respond', order: 4,
    label: 'Choose a relevant reply', capabilities: ['multiple-acceptable-replies'],
    readiness: { wordCapabilityId: 'controlled-retrieval-expanded', prerequisiteMechanicIds: ['a1-read-and-act'] },
  },
  'a1-slot-recombination': {
    id: 'a1-slot-recombination', level: 'A1', stageId: 'a1-respond', order: 5,
    label: 'Change one useful slot', capabilities: ['slot-recombination'],
    readiness: { wordCapabilityId: 'controlled-retrieval-expanded', prerequisiteMechanicIds: ['a1-choice-dialogue'] },
  },
  'a1-record-replay': {
    id: 'a1-record-replay', level: 'A1', stageId: 'a1-respond', order: 6,
    label: 'Listen, record, replay, retry', capabilities: ['local-record-replay-retry'],
    readiness: { wordCapabilityId: 'controlled-retrieval-expanded', prerequisiteMechanicIds: ['a1-choice-dialogue'] },
  },
  'a1-phrase-composition': {
    id: 'a1-phrase-composition', level: 'A1', stageId: 'a1-respond', order: 7,
    label: 'Spell, arrange and recombine', capabilities: ['slot-recombination'],
    readiness: { wordCapabilityId: 'contextual-typed-recall', prerequisiteMechanicIds: ['a1-slot-recombination'] },
  },
  'a1-multiple-replies': {
    id: 'a1-multiple-replies', level: 'A1', stageId: 'a1-respond', order: 8,
    label: 'Recognise more than one good reply', capabilities: ['multiple-acceptable-replies'],
    readiness: { wordCapabilityId: 'controlled-retrieval-expanded', prerequisiteMechanicIds: ['a1-choice-dialogue'] },
  },
  'a1-conversation-repair': {
    id: 'a1-conversation-repair', level: 'A1', stageId: 'a1-repair', order: 9,
    label: 'Ask for slower repetition', capabilities: ['adaptive-conversation-repair'],
    readiness: { wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a1-record-replay', 'a1-multiple-replies'] },
  },
  'a1-scan-relay': {
    id: 'a1-scan-relay', level: 'A1', stageId: 'a1-repair', order: 10,
    label: 'Find and relay one fact', capabilities: ['scan-and-relay'],
    readiness: { wordCapabilityId: 'reviewed-form-awareness', prerequisiteMechanicIds: ['a1-read-and-act', 'a1-conversation-repair'] },
  },
  'a2-gist-detail': {
    id: 'a2-gist-detail', level: 'A2', stageId: 'a2-understand', order: 11,
    label: 'Main point before detail', capabilities: ['gist-then-detail'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'reviewed-form-awareness', prerequisiteMechanicIds: [] },
  },
  'a2-delayed-audio-reconstruction': {
    id: 'a2-delayed-audio-reconstruction', level: 'A2', stageId: 'a2-understand', order: 12,
    label: 'Rebuild a message after its source disappears', capabilities: ['source-removed-audio-reconstruction'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a2-gist-detail'] },
    mastery: {
      completionPolicy: 'all-authored-activities', minimumDistinctActivities: 2,
      minimumDistinctContexts: 2, contextKey: 'loreAnchor.nodeId',
    },
  },
  'a2-scan-information': {
    id: 'a2-scan-information', level: 'A2', stageId: 'a2-understand', order: 13,
    label: 'Scan a practical notice', capabilities: ['scan-and-relay'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-form-selection', prerequisiteMechanicIds: ['a2-gist-detail'] },
  },
  'a2-branching-repair': {
    id: 'a2-branching-repair', level: 'A2', stageId: 'a2-interact', order: 14,
    label: 'Repair and continue a branch', capabilities: ['adaptive-conversation-repair'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a2-gist-detail'] },
  },
  'a2-communication-strategies': {
    id: 'a2-communication-strategies', level: 'A2', stageId: 'a2-interact', order: 15,
    label: 'Repair a missing word and recover', capabilities: ['compensating-communication-strategies'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'controlled-retrieval-expanded', prerequisiteMechanicIds: ['a2-branching-repair'] },
    mastery: {
      completionPolicy: 'all-authored-activities', minimumDistinctActivities: 2,
      minimumDistinctContexts: 2, contextKey: 'loreAnchor.nodeId',
    },
  },
  'a2-meaning-switch-forms': {
    id: 'a2-meaning-switch-forms', level: 'A2', stageId: 'a2-interact', order: 16,
    label: 'Change who or when through form', capabilities: ['meaning-driven-form-selection'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-form-selection', prerequisiteMechanicIds: ['a2-scan-information'] },
    mastery: {
      completionPolicy: 'all-authored-activities', minimumDistinctActivities: 2,
      minimumDistinctContexts: 2, contextKey: 'loreAnchor.nodeId',
      transferDimensions: ['actor', 'time'],
    },
  },
  'a2-register-pragmatics': {
    id: 'a2-register-pragmatics', level: 'A2', stageId: 'a2-interact', order: 17,
    label: 'Match ti or ju to the relationship', capabilities: ['relationship-appropriate-register'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-form-selection', prerequisiteMechanicIds: ['a2-communication-strategies', 'a2-meaning-switch-forms'] },
    mastery: {
      completionPolicy: 'all-authored-activities', minimumDistinctActivities: 2,
      minimumDistinctContexts: 2, contextKey: 'loreAnchor.nodeId',
      transferDimensions: ['familiar-singular', 'respectful-or-plural'],
    },
  },
  'a2-slot-recombination': {
    id: 'a2-slot-recombination', level: 'A2', stageId: 'a2-interact', order: 18,
    label: 'Recombine intent and reason', capabilities: ['slot-recombination'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a2-branching-repair'] },
  },
  'a2-multiple-replies': {
    id: 'a2-multiple-replies', level: 'A2', stageId: 'a2-interact', order: 19,
    label: 'Use different valid replies', capabilities: ['multiple-acceptable-replies'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a2-branching-repair'] },
  },
  'a2-temporal-sequencing': {
    id: 'a2-temporal-sequencing', level: 'A2', stageId: 'a2-connect', order: 20,
    label: 'Past, present and near future', capabilities: ['past-present-near-future-sequencing'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-form-selection', prerequisiteMechanicIds: ['a2-slot-recombination'] },
  },
  'a2-connector-links': {
    id: 'a2-connector-links', level: 'A2', stageId: 'a2-connect', order: 21,
    label: 'Connect with dhe, por and sepse', capabilities: ['connectors-dhe-por-sepse'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'word-form-construction', prerequisiteMechanicIds: ['a2-temporal-sequencing'] },
  },
  'a2-record-replay': {
    id: 'a2-record-replay', level: 'A2', stageId: 'a2-connect', order: 22,
    label: 'Record a connected answer', capabilities: ['local-record-replay-retry'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-typed-recall', prerequisiteMechanicIds: ['a2-temporal-sequencing'] },
  },
  'a2-faded-retelling': {
    id: 'a2-faded-retelling', level: 'A2', stageId: 'a2-connect', order: 23,
    label: 'Retell immediately with less support', capabilities: ['cue-faded-retelling-rehearsal', 'local-record-replay-retry'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-typed-recall', prerequisiteMechanicIds: ['a2-delayed-audio-reconstruction', 'a2-record-replay'] },
    mastery: {
      completionPolicy: 'all-authored-activities', minimumDistinctActivities: 2,
      minimumDistinctContexts: 2, contextKey: 'loreAnchor.nodeId',
      repetitionsPerActivity: 2, finalSupport: 'scene-cues-only',
    },
  },
  'a2-message-replies': {
    id: 'a2-message-replies', level: 'A2', stageId: 'a2-connect', order: 24,
    label: 'Reconstruct and answer a message', capabilities: ['multiple-acceptable-replies'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-typed-recall', prerequisiteMechanicIds: ['a2-multiple-replies', 'a2-connector-links'] },
  },
  'a2-paragraph-assembly': {
    id: 'a2-paragraph-assembly', level: 'A2', stageId: 'a2-connect', order: 25,
    label: 'Build a connected note', capabilities: ['past-present-near-future-sequencing', 'connectors-dhe-por-sepse'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'contextual-typed-recall', prerequisiteMechanicIds: ['a2-connector-links', 'a2-message-replies'] },
  },
  'a2-main-point-relay': {
    id: 'a2-main-point-relay', level: 'A2', stageId: 'a2-relay', order: 26,
    label: 'Relay the point and agree', capabilities: ['gist-then-detail', 'scan-and-relay', 'adaptive-conversation-repair'],
    readiness: { prerequisiteLevel: 'A1', wordCapabilityId: 'strict-spaced-recall', prerequisiteMechanicIds: ['a2-scan-information', 'a2-paragraph-assembly', 'a2-record-replay'] },
  },
})

// Every exact `trainWith` label in the capstone contract resolves here. Several
// labels intentionally converge on one richer activity: this is an adapter
// from editorial capstone terminology to actual production mechanics, not a
// second implementation of the curriculum.
export const CEFR_TRAIN_WITH_MECHANIC_MAP = deepFreeze({
  'continuous phrase audio': ['a1-audio-meaning', 'a1-focused-dictation', 'a2-gist-detail', 'a2-delayed-audio-reconstruction'],
  'word audio': ['a1-audio-meaning'],
  'listening construction': ['a1-audio-construction', 'a1-focused-dictation', 'a2-delayed-audio-reconstruction'],
  'story reading': ['a1-read-and-act', 'a2-scan-information'],
  'dictionary definitions': ['a1-read-and-act'],
  'short grounded phrases': ['a1-read-and-act', 'a1-phrase-composition'],
  'choice dialogue': ['a1-choice-dialogue', 'a2-register-pragmatics'],
  'listen-and-repeat': ['a1-record-replay', 'a2-faded-retelling'],
  'conversation repair': ['a1-conversation-repair', 'a2-branching-repair', 'a2-communication-strategies'],
  'substitution frames': ['a1-slot-recombination'],
  'listen-record-replay': ['a1-record-replay', 'a2-faded-retelling'],
  'pronunciation comparison': ['a1-record-replay'],
  'phrase construction': ['a1-phrase-composition'],
  'short reply frames': ['a1-multiple-replies'],
  'focus spelling': ['a1-phrase-composition', 'a1-focused-dictation'],
  'whole phrase recall': ['a1-phrase-composition'],
  'sentence recombination': ['a1-slot-recombination', 'a1-phrase-composition'],
  'information matching': ['a1-read-and-act', 'a1-scan-relay'],
  'time, place and price phrases': ['a1-read-and-act', 'a1-scan-relay'],
  'tiered listening construction': ['a1-audio-construction', 'a1-focused-dictation', 'a2-gist-detail', 'a2-delayed-audio-reconstruction'],
  'gist-before-detail practice': ['a2-gist-detail'],
  'scan-for-information tasks': ['a2-scan-information'],
  'short correspondence': ['a2-message-replies'],
  'branching intent practice': ['a2-branching-repair', 'a2-communication-strategies', 'a2-register-pragmatics'],
  'repair phrases': ['a1-conversation-repair', 'a2-branching-repair', 'a2-communication-strategies'],
  'slot recombination': ['a2-slot-recombination'],
  'sentence frames': ['a2-meaning-switch-forms', 'a2-slot-recombination', 'a2-paragraph-assembly'],
  'connector practice': ['a2-connector-links'],
  'past/present/future recombination': ['a2-meaning-switch-forms', 'a2-temporal-sequencing', 'a2-paragraph-assembly'],
  'record-and-replay': ['a2-record-replay', 'a2-faded-retelling'],
  'message reconstruction': ['a2-delayed-audio-reconstruction', 'a2-message-replies'],
  'multiple acceptable replies': ['a2-register-pragmatics', 'a2-multiple-replies', 'a2-message-replies'],
  'guided paragraph assembly': ['a2-paragraph-assembly'],
  connectors: ['a2-connector-links', 'a2-paragraph-assembly'],
  'past/present/future sequencing': ['a2-temporal-sequencing'],
  'identify the main point': ['a2-gist-detail', 'a2-main-point-relay'],
  'fact selection': ['a2-scan-information', 'a2-main-point-relay'],
  'ask-for-repetition and agreement phrases': ['a2-branching-repair', 'a2-communication-strategies', 'a2-main-point-relay'],
})

export const CEFR_PREPARATION_EVIDENCE_CONTRACT = deepFreeze({
  version: CEFR_PREPARATION_VERSION,
  shape: {
    achievedLevels: ['A1'],
    wordCapabilities: {
      '<senseId>': {
        capabilities: {
          '<WORD_CAPABILITY_DEFINITIONS.id>': { status: 'passed | pending | inapplicable | not-trainable' },
        },
      },
    },
    mechanicPasses: { '<mechanicId>': ['<distinct activity id>'] },
  },
  principles: [
    'Only semantic capabilities derived from exact saved evidence for each activity focus may satisfy its lexical prerequisite.',
    'A named capability also requires every earlier applicable capability in the shared lexical progression; an inapplicable form lane never skips meaning or controlled retrieval.',
    'Conditional reviewed-form capabilities may be inapplicable; ordinary lexical and production capabilities must be explicitly passed.',
    'Only distinct passed preparation activities satisfy a mechanic; lifetime token totals do not count.',
    'Transfer mechanics declare their minimum distinct activities and contexts; every authored transfer mechanic currently requires all of its activities.',
    'Source-removed reconstruction and cue-faded retelling are immediate guided rehearsal; they never claim elapsed or changed-context transfer evidence.',
    'An attempt made after its transcript or answer support is revealed is useful practice but cannot award the same persisted preparation pass as a fresh hidden attempt.',
    'A2 preparation remains locked until the A1 level gate is achieved.',
    'Preparation evidence never counts as held-out capstone evidence.',
    'Recording completion proves a local practice cycle, not pronunciation quality.',
  ],
})

const safePassedActivities = (evidence, mechanicId) => [...new Set(
  Array.isArray(evidence?.mechanicPasses?.[mechanicId])
    ? evidence.mechanicPasses[mechanicId].filter((id) => typeof id === 'string')
    : [],
)]

const focusIdsForMechanic = (mechanicId) => [...new Set(
  activitiesForMechanic(mechanicId).flatMap(({ focusSenseIds }) => focusSenseIds),
)]

const CONDITIONAL_FORM_CAPABILITIES = new Set(WORD_CAPABILITY_DEFINITIONS
  .filter(({ conditional }) => conditional === 'reviewed-form-lane')
  .map(({ id }) => id))

const capabilityStatus = (evidence, senseId, capabilityId) =>
  evidence?.wordCapabilities?.[senseId]?.capabilities?.[capabilityId]?.status || 'pending'

const capabilitySatisfiesReadiness = (capabilityId, status) => status === 'passed' ||
  (status === 'inapplicable' && CONDITIONAL_FORM_CAPABILITIES.has(capabilityId))

const capabilitiesThrough = (capabilityId) => {
  const index = WORD_CAPABILITY_DEFINITIONS.findIndex(({ id }) => id === capabilityId)
  return index < 0 ? [] : WORD_CAPABILITY_DEFINITIONS.slice(0, index + 1)
}

export function preparationReadiness(mechanicId, evidence = {}) {
  const mechanic = CEFR_PREPARATION_MECHANICS[mechanicId]
  if (!mechanic) return { mechanicId, ready: false, complete: false, reasons: ['unknown-mechanic'] }

  const reasons = []
  const requiredLevel = mechanic.readiness.prerequisiteLevel
  if (requiredLevel && !(evidence.achievedLevels || []).includes(requiredLevel)) {
    reasons.push(`requires-level:${requiredLevel}`)
  }

  for (const prerequisiteId of mechanic.readiness.prerequisiteMechanicIds) {
    const requiredActivities = activitiesForMechanic(prerequisiteId).map(({ id }) => id)
    const passed = new Set(safePassedActivities(evidence, prerequisiteId))
    if (!requiredActivities.length || !requiredActivities.every((id) => passed.has(id))) {
      reasons.push(`requires-mechanic:${prerequisiteId}`)
    }
  }

  const requiredCapabilityId = mechanic.readiness.wordCapabilityId
  for (const senseId of focusIdsForMechanic(mechanicId)) {
    const unmet = capabilitiesThrough(requiredCapabilityId).find(({ id }) => {
      const status = capabilityStatus(evidence, senseId, id)
      return !capabilitySatisfiesReadiness(id, status)
    })
    if (unmet) {
      reasons.push(`requires-capability:${senseId}:${unmet.id}:${capabilityStatus(evidence, senseId, unmet.id)}`)
    }
  }

  const activityIds = activitiesForMechanic(mechanicId).map(({ id }) => id)
  const passedActivities = new Set(safePassedActivities(evidence, mechanicId))
  const complete = activityIds.length > 0 && activityIds.every((id) => passedActivities.has(id))
  return {
    mechanicId,
    ready: reasons.length === 0,
    complete,
    reasons,
    requiredActivityIds: activityIds,
    passedActivityIds: activityIds.filter((id) => passedActivities.has(id)),
  }
}

export function preparationPlan(level, evidence = {}) {
  return Object.values(CEFR_PREPARATION_MECHANICS)
    .filter((mechanic) => mechanic.level === level)
    .sort((a, b) => a.order - b.order)
    .map((mechanic) => ({
      mechanic,
      activities: activitiesForMechanic(mechanic.id),
      readiness: preparationReadiness(mechanic.id, evidence),
    }))
}

export function preparationActivitiesFor({ level, mechanicId, stageId } = {}) {
  return CEFR_PREPARATION_ACTIVITIES.filter((entry) =>
    (!level || entry.level === level) &&
    (!mechanicId || entry.mechanicId === mechanicId) &&
    (!stageId || CEFR_PREPARATION_MECHANICS[entry.mechanicId]?.stageId === stageId))
}

export function buildPreparationActivity(activityId) {
  return CEFR_PREPARATION_ACTIVITIES.find(({ id }) => id === activityId) || null
}

const normalizeAnswer = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/[.,!?;:]/gu, '')
  .replace(/\s+/gu, ' ')
  .trim()

const equalList = (received, expected) => Array.isArray(received) &&
  received.length === expected.length && received.every((value, index) => value === expected[index])

const equalMap = (received, expected) => received && Object.entries(expected)
  .every(([key, value]) => received[key] === value)

// Controlled preparation can be scored deterministically. Open production is
// deliberately not inferred here: a recording passes only when the learner
// records, replays and explicitly self-checks it, and it remains practice
// evidence rather than pronunciation or CEFR evidence.
export function evaluatePreparationResponse(activityId, answer = {}) {
  const entry = buildPreparationActivity(activityId)
  if (!entry) return { passed: false, reason: 'unknown-activity' }
  const response = entry.response
  let passed = false

  switch (response.kind) {
    case 'single-choice':
      passed = answer.optionId === response.correctOptionId
      break
    case 'multiple-acceptable-choice':
      passed = response.acceptedOptionIds.includes(answer.optionId)
      break
    case 'ordered-tiles':
      passed = (response.acceptedOrders || [response.correctIds])
        .some((accepted) => equalList(answer.orderedIds, accepted))
      break
    case 'slot-selection':
      passed = equalMap(answer.selections, response.correctSelections)
      break
    case 'typed-exact':
      passed = response.accepted.some((accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer.text))
      break
    case 'focused-dictation':
      passed = response.accepted.some((accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer.text))
      break
    case 'meaning-switch-choice':
      passed = answer.optionId === response.correctOptionId
      break
    case 'register-appropriate-choice':
      passed = response.acceptedOptionIds.includes(answer.optionId)
      break
    case 'delayed-ordered-chunks':
      passed = response.requiredSignals.every((signal) => answer[signal] === true) &&
        equalList(answer.orderedIds, response.correctIds)
      break
    case 'local-audio-cycle':
      passed = Boolean(answer.recorded && answer.replayed && response.acceptedSelfChecks.includes(answer.selfCheck))
      break
    case 'faded-local-audio-cycle':
      passed = response.requiredRoundIds.every((roundId) => {
        const round = answer.byRound?.[roundId]
        const requiredCriteria = response.requiredCriteriaByRound?.[roundId] || []
        return Boolean(
          round?.recorded &&
          round?.replayed &&
          response.acceptedSelfChecks.includes(round.selfCheck) &&
          Array.isArray(round.ideaChecks) &&
          requiredCriteria.every((criterionId) => round.ideaChecks.includes(criterionId)),
        )
      })
      break
    case 'branch-by-intent': {
      const optionIds = Array.isArray(answer.optionIds)
        ? answer.optionIds
        : (answer.optionId ? [answer.optionId] : [])
      let allowedOptionIds = entry.initialReplyOptionIds || entry.replyOptions.map(({ id }) => id)
      let branch = null
      for (let index = 0; index < optionIds.length; index += 1) {
        const optionId = optionIds[index]
        if (!allowedOptionIds.includes(optionId)) {
          return { passed: false, reason: 'reply-not-available' }
        }
        const option = entry.replyOptions.find(({ id }) => id === optionId)
        branch = option ? entry.branches[option.intent] : null
        if (!branch) return { passed: false, reason: 'unknown-reply' }
        if (branch.completes) {
          const isFinalChoice = index === optionIds.length - 1
          const enoughTurns = optionIds.length >= (response.minimumTurns || 1)
          return {
            passed: isFinalChoice && enoughTurns,
            reason: isFinalChoice && enoughTurns ? 'complete-branch' : 'incomplete-branch',
          }
        }
        allowedOptionIds = branch.nextReplyOptionIds || entry.replyOptions.map(({ id }) => id)
      }
      return {
        passed: false,
        reason: branch ? 'continue-branch' : 'unknown-reply',
        nextPrompt: branch?.nextPrompt || null,
        nextReplyOptionIds: branch?.nextReplyOptionIds || [],
        simplified: Boolean(branch?.simplified),
      }
    }
    case 'scan-and-relay':
      passed = answer.factId === response.correctFactId && response.acceptedRelayIds.includes(answer.relayId)
      break
    case 'strategy-and-recovery':
      passed = response.acceptedStrategyIds.includes(answer.strategyId) &&
        response.acceptedRecoveryIds.includes(answer.recoveryId)
      break
    case 'ordered-rounds':
      passed = response.requiredRoundIds.every((roundId) => {
        const round = entry.rounds.find(({ id }) => id === roundId)
        return answer.byRound?.[roundId] === round?.correctOptionId
      })
      break
    case 'fact-map':
    case 'connector-map':
      passed = equalMap(answer.byPrompt || answer.bySentence, response.correctByPrompt || response.correctBySentence)
      break
    case 'reconstruct-and-reply':
      passed = (response.acceptedMessageOrders || [response.correctMessageIds])
        .some((accepted) => equalList(answer.messageIds, accepted)) && response.acceptedReplyIds.includes(answer.replyId)
      break
    case 'paragraph-plan':
      passed = response.requiredRoles.every((role) => answer.roles?.includes(role)) &&
        response.requiredConnectorSenseIds.every((id) => answer.connectorSenseIds?.includes(id)) &&
        new Set(answer.connectorSenseIds || []).size >= response.minimumDistinctConnectors
      break
    case 'relay-and-agree':
      passed = equalMap(answer.byStep, response.correctByStep)
      break
    default:
      return { passed: false, reason: 'unsupported-response-kind' }
  }

  if (passed && response.evidencePolicy) {
    const requiredMode = response.evidencePolicy.freshPassAttemptMode
    if (answer.attemptMode !== requiredMode) {
      const supported = answer.attemptMode === response.evidencePolicy.supportedAttemptMode
      return {
        passed: false,
        correct: true,
        evidence: supported ? response.evidencePolicy.supportedCorrectOutcome : 'none',
        reason: supported ? 'supported-practice-only' : 'attempt-mode-required',
      }
    }
  }
  return { passed, reason: passed ? 'correct' : 'try-again' }
}

export function nextPreparationPrompt(activityId, optionId) {
  const entry = buildPreparationActivity(activityId)
  if (entry?.response.kind !== 'branch-by-intent') return null
  const option = entry.replyOptions.find(({ id }) => id === optionId)
  return option ? entry.branches[option.intent]?.nextPrompt || null : null
}

export const CEFR_PREPARATION_EXAMPLES = deepFreeze({
  'a1-audio-meaning': { activityId: 'a1-audio-destination', answer: { optionId: 'village' } },
  'a1-audio-construction': { activityId: 'a1-audio-water-build', answer: { orderedIds: ['want', 'water', 'please'] } },
  'a1-focused-dictation': { activityId: 'a1-dictate-market-bread', answer: { text: 'bukë', attemptMode: 'fresh-hidden' } },
  'a1-read-and-act': { activityId: 'a1-read-bread-price', answer: { optionId: 'eight' } },
  'a1-choice-dialogue': { activityId: 'a1-destination-reply', answer: { optionId: 'village' } },
  'a1-slot-recombination': { activityId: 'a1-need-substitution', answer: { selections: { item: 'cheese' } } },
  'a1-record-replay': { activityId: 'a1-bridge-recording', answer: { recorded: true, replayed: true, selfCheck: 'ready' } },
  'a1-phrase-composition': { activityId: 'a1-focused-village-spelling', answer: { text: 'fshat' } },
  'a1-multiple-replies': { activityId: 'a1-inn-reply-set', answer: { optionId: 'yes-thanks' } },
  'a1-conversation-repair': { activityId: 'a1-slower-repetition', answer: { optionId: 'repair' }, expectedNextText: 'Vjen në treg?' },
  'a1-scan-relay': { activityId: 'a1-market-price-relay', answer: { factId: 'eight', relayId: 'relay-eight' } },
  'a2-gist-detail': { activityId: 'a2-weather-market-gist', answer: { byRound: { gist: 'late-market', detail: 'noon' } } },
  'a2-delayed-audio-reconstruction': { activityId: 'a2-delayed-market-message', answer: { played: true, delayCompleted: true, orderedIds: ['noon', 'market-opens'], attemptMode: 'fresh-hidden' } },
  'a2-scan-information': { activityId: 'a2-bridge-notice-scan', answer: { byPrompt: { status: 'bridge-closed', route: 'left-road' } } },
  'a2-branching-repair': { activityId: 'a2-meeting-branch-repair', answer: { optionIds: ['time', 'confirm-well'] } },
  'a2-communication-strategies': { activityId: 'a2-ask-slower-road-warning', answer: { strategyId: 'slower-respectful', recoveryId: 'use-bridge', attemptMode: 'fresh-hidden' } },
  'a2-meaning-switch-forms': { activityId: 'a2-form-who-goes', answer: { optionId: 'first-singular-present', attemptMode: 'fresh-hidden' } },
  'a2-register-pragmatics': { activityId: 'a2-register-familiar-companion', answer: { optionId: 'familiar-verb-first', attemptMode: 'fresh-hidden' } },
  'a2-slot-recombination': { activityId: 'a2-reason-slot-frame', answer: { selections: { place: 'market', reason: 'rain' } } },
  'a2-multiple-replies': { activityId: 'a2-help-reply-set', answer: { optionId: 'accept-can' } },
  'a2-temporal-sequencing': { activityId: 'a2-journey-time-sequence', answer: { orderedIds: ['past', 'present', 'future'] } },
  'a2-connector-links': { activityId: 'a2-basic-connectors', answer: { bySentence: { addition: 'dhe', contrast: 'por', reason: 'sepse' } } },
  'a2-record-replay': { activityId: 'a2-journey-recording', answer: { recorded: true, replayed: true, selfCheck: 'ready' } },
  'a2-faded-retelling': {
    activityId: 'a2-retell-bolla-warning',
    answer: {
      attemptMode: 'fresh-hidden',
      byRound: {
        supported: {
          recorded: true,
          replayed: true,
          selfCheck: 'ready',
          ideaChecks: ['bolla-sleeps-in-river', 'road-is-closed', 'bridge-is-open'],
        },
        faded: {
          recorded: true,
          replayed: true,
          selfCheck: 'ready',
          ideaChecks: ['bolla-sleeps-in-river', 'road-is-closed', 'bridge-is-open'],
        },
      },
    },
  },
  'a2-message-replies': { activityId: 'a2-message-reconstruction', answer: { messageIds: ['meeting', 'tomorrow', 'time', 'place'], replyId: 'accept' } },
  'a2-paragraph-assembly': { activityId: 'a2-connected-note-builder', answer: { roles: ['past-event', 'present-state', 'reason', 'near-future'], connectorSenseIds: ['dhe', 'sepse'] } },
  'a2-main-point-relay': { activityId: 'a2-road-main-point-relay', answer: { byStep: { 'main-point': 'road-closed', relay: 'bridge-open', agreement: 'agree-bridge' } } },
})

// This derived view is useful to a debug graph and guarantees that an
// editorial capstone label never has to know about a UI implementation.
export function preparationMechanicsForCapstone(familyId) {
  const family = CEFR_CAPSTONE_TASK_FAMILIES[familyId]
  if (!family) return []
  return [...new Set(family.trainWith.flatMap((label) => CEFR_TRAIN_WITH_MECHANIC_MAP[label] || []))]
    .map((id) => CEFR_PREPARATION_MECHANICS[id])
    .filter((mechanic) => mechanic && (family.level === 'A2' || mechanic.level === 'A1'))
    .sort((a, b) => a.order - b.order)
}

// This is a direct view over the production registries. Debug and audits can
// display the real semantic word gates and phrase stages without translating
// them back into numeric tiers or maintaining a second threshold table.
export const CEFR_PREPARATION_SOURCE_REGISTRIES = deepFreeze({
  wordCapabilities: WORD_CAPABILITY_DEFINITIONS,
  phraseStages: Object.values(PHRASE_STAGE_DEFINITIONS).flat(),
})
