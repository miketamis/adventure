// Held-out A1/A2 transfer tasks.
//
// These records are assessment content, not Train content. The learner may
// reuse familiar language, but every stimulus is a fresh, independently
// authored combination. `scriptSq` is authoring/playback metadata: listening
// UIs must keep it hidden until the learner has submitted an attempt.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const CEFR_TASK_SCHEMA_VERSION = 1

export const CEFR_ACOUSTIC_VOICES = deepFreeze([
  'sq-AL-AnilaNeural',
  'sq-AL-IlirNeural',
])

export const CEFR_VOICES = deepFreeze({
  elira: { id: 'elira', character: 'Elira', presentation: 'warm adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-AnilaNeural' },
  gruaUji: { id: 'gruaUji', character: 'gruaja me ujë', presentation: 'clear adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-AnilaNeural' },
  bujtinari: { id: 'bujtinari', character: 'bujtinari', presentation: 'measured older adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-IlirNeural' },
  tregtari: { id: 'tregtari', character: 'tregtari', presentation: 'lively adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-IlirNeural' },
  sheruesi: { id: 'sheruesi', character: 'shëruesi', presentation: 'calm adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-IlirNeural' },
  plakuSheshit: { id: 'plakuSheshit', character: 'plaku i sheshit', presentation: 'projected older adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-IlirNeural' },
  plakuUdhes: { id: 'plakuUdhes', character: 'plaku i udhës', presentation: 'clear older adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-IlirNeural' },
  mihalGuri: { id: 'mihalGuri', character: 'Mihal Guri', presentation: 'steady adult voice', locale: 'sq-AL', synthesisVoice: 'sq-AL-IlirNeural' },
})

const STORY_ANCHOR_ALIASES = {
  bridge: 'start',
  inn: 'bujtina',
  market: 'tregtari',
  'healer-house': 'sheruesi',
  'village-square': 'fshatiSheshi',
  'east-road': 'udha',
  well: 'pusiThate',
  'bridge-worksite': 'uraArtes1',
  'village-gate': 'fshatiLanes',
  'dry-well': 'pusiThate',
  'Elira-house': 'fshatiJeta',
  'inn-kitchen': 'kafeja1',
  'forked-road': 'udhekryq',
  'west-road': 'udha',
  'north-path': 'udha',
  'river-crossing': 'fshatiLumi',
  'shepherd-path': 'bariu',
  shop: 'tregtari',
  'inn-yard': 'bujtina',
  'healer-garden': 'kopshtiBar',
  'courier-board': 'fshatiSheshi',
  'inn-supper': 'oda1',
  'inn-guest-room': 'gjumiBujtina',
}

const STORY_ANCHOR_LABELS = {
  bridge: 'bridge approach', start: 'bridge approach',
  inn: 'village inn', bujtina: 'village inn',
  market: 'market stall', tregtari: 'market stall',
  'healer-house': 'healer’s house', sheruesi: 'healer’s house',
  'village-square': 'village square', fshatiSheshi: 'village square',
  'east-road': 'east road', 'west-road': 'west road', 'north-path': 'north path', udha: 'open road',
  well: 'dry well', 'dry-well': 'dry well', pusiThate: 'dry well',
  'bridge-worksite': 'old bridge worksite', uraArtes1: 'old bridge worksite',
  'village-gate': 'village gate', fshatiLanes: 'village lanes',
  'Elira-house': 'Elira’s house', fshatiJeta: 'village homes',
  'inn-kitchen': 'inn hearth', kafeja1: 'inn hearth',
  'forked-road': 'crossroads', udhekryq: 'crossroads',
  'river-crossing': 'village riverside', fshatiLumi: 'village riverside',
  'shepherd-path': 'shepherd’s path', bariu: 'shepherd’s path',
  shop: 'market shop', 'inn-yard': 'inn yard',
  'healer-garden': 'healer’s garden', kopshtiBar: 'healer’s garden',
  'courier-board': 'village notice board',
  'inn-supper': 'inn supper room', oda1: 'inn supper room',
  'inn-guest-room': 'inn guest room', gjumiBujtina: 'inn guest room',
}

const NPC_ANCHOR_ALIASES = {
  Elira: 'elira',
  shëruesi: 'sheruesi',
  'plaku i sheshit': 'plakuSheshit',
  'plaku i udhës': 'plakuUdhes',
  Mihali: 'mihalGuri',
}

const NPC_ANCHOR_LABELS = {
  Elira: 'Elira', elira: 'Elira',
  gruaUji: 'the woman carrying water',
  bujtinari: 'the innkeeper', tregtari: 'the trader',
  shëruesi: 'the healer', sheruesi: 'the healer',
  'plaku i sheshit': 'the old man in the square', plakuSheshit: 'the old man in the square',
  'plaku i udhës': 'the old wayfarer', plakuUdhes: 'the old wayfarer',
  Mihali: 'Mihal Guri', mihalGuri: 'Mihal Guri',
}

const VOICE_ALIASES = {
  innkeeper: 'bujtinari', trader: 'tregtari', healer: 'sheruesi',
  courier: 'plakuSheshit', traveller: 'plakuUdhes', crier: 'plakuSheshit', mihal: 'mihalGuri',
}

const anchor = (location, npc, beat) => ({
  location: STORY_ANCHOR_ALIASES[location] || location,
  placeLabel: STORY_ANCHOR_LABELS[location] || 'village road',
  npc: NPC_ANCHOR_ALIASES[npc] || npc,
  npcLabel: NPC_ANCHOR_LABELS[npc] || 'a villager',
  beat,
})
const voice = (id, pace = 'slow-clear') => {
  const profile = CEFR_VOICES[VOICE_ALIASES[id] || id]
  return {
    ...profile,
    speakerIdentityId: profile.id,
    acousticVoiceId: profile.synthesisVoice,
    pace,
  }
}

const receptionRubric = (focus) => ({
  kind: 'deterministic-reception',
  focus,
  criteria: [
    'Credit only the authored accepted choice for each question.',
    'Do not expose the transcript, a translation, or a marked answer before submission.',
  ],
})

const performanceRubric = (focus, criticalEvidence) => ({
  kind: 'analytic-performance',
  focus,
  dimensions: ['taskFulfilment', 'comprehensibility', 'range', 'control', 'cohesion'],
  scale: [0, 1, 2, 3],
  passFloorEachDimension: 2,
  criticalEvidence,
  criteria: [
    'Meaning may be expressed with any intelligible Standard Albanian alternative.',
    'Basic form errors are acceptable when the intended message remains clear.',
    'Task fulfilment and comprehensibility cannot be averaged away.',
  ],
})

const question = (id, kind, prompt, choices, acceptedChoiceId, concepts, design = {}) => ({
  id,
  kind,
  prompt,
  choices: choices.map(([choiceId, labelSq]) => ({
    id: choiceId,
    labelSq,
    choiceCategory: design.choiceCategory || null,
  })),
  acceptedChoiceIds: [acceptedChoiceId],
  acceptedSemanticConcepts: concepts,
  ...design,
})

const rotate = (values, offset) => values.map((_, index) => values[(index + offset) % values.length])
const plausibleChoiceSet = (acceptedId, acceptedLabel, candidates, offset = 0) => {
  const distractors = rotate(candidates, offset)
    .filter((label) => normalizeForChoices(label) !== normalizeForChoices(acceptedLabel))
    .filter((label, index, labels) => labels.findIndex((other) => normalizeForChoices(other) === normalizeForChoices(label)) === index)
    .slice(0, 2)
    .map((label, index) => [`${acceptedId}-alternative-${index + 1}`, label])
  return [[acceptedId, acceptedLabel], ...distractors]
}

const normalizeForChoices = (value) => String(value || '')
  .toLocaleLowerCase('sq')
  .normalize('NFC')
  .replace(/[.!?,:;—–\-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

// These are post-attempt semantic examples, never a pre-attempt model answer.
// Each requirement keeps at least two ways to communicate the same intent so
// free response is not reduced to exact-string recall.
export const CEFR_SEMANTIC_ALTERNATIVES_SQ = deepFreeze({
  'identity:name': ['Quhem …', 'Unë jam …'],
  'identity:origin': ['Jam nga …', 'Vij nga …'],
  'home:location': ['Jetoj në …', 'Shtëpia ime është në …'],
  'person:name': ['Ai quhet …', 'Ajo quhet …'],
  'person:relationship': ['Është miku im.', 'Është motra ime.'],
  'person:familiar-fact': ['Ai punon në treg.', 'Ajo jeton në fshat.'],
  'person:familiar': ['Miku im është këtu.', 'Motra ime jeton në fshat.'],
  'need:room': ['Më duhet një dhomë.', 'Dua një dhomë, ju lutem.'],
  'duration:nights': ['Për një natë.', 'Për dy net.'],
  'purchase:item': ['Dua bukë, ju lutem.', 'Dua sapun, ju lutem.'],
  'purchase:quantity': ['Një, ju lutem.', 'Dy, ju lutem.'],
  'health:condition': ['Nuk jam mirë.', 'Jam i lodhur.'],
  'health:pain-location': ['Më dhemb koka.', 'Më dhemb dora.'],
  'social:greeting': ['Përshëndetje!', 'Mirë se erdhe!'],
  'location:current': ['Jam në bujtinë.', 'Jam te ura.'],
  'feeling:current': ['Jam mirë.', 'Jam i lodhur.'],
  'social:thanks': ['Faleminderit!', 'Faleminderit shumë!'],
  'meeting:time': ['Në orën katër.', 'Nesër në mëngjes.'],
  'meeting:place': ['Takohemi te pusi.', 'Takohemi në shesh.'],
  'social:closing': ['Shihemi!', 'Mirupafshim!'],
  'need:immediate': ['Më duhet ujë.', 'Dua bukë, ju lutem.'],
  'journey:destination': ['Po shkoj në treg.', 'Po nisem për në qytet.'],
  'need:two-items': ['Më duhen bukë dhe ujë.', 'Dua kripë dhe sapun.'],
  'time:return': ['Kthehem në mbrëmje.', 'Do të vij pasdite.'],
  'time:08:00': ['Tregu hapet në orën tetë.', 'Në orën tetë.'],
  'price:90-leke': ['Dhoma kushton 90 lekë.', '90 lekë.'],
  'meeting-place:well': ['Takimi është te pusi.', 'Te pusi.'],
  'purchase:item-and-quantity': ['Dua dy shishe ujë, ju lutem.', 'Më duhen dy shishe ujë.'],
  'purchase:resolve-limited-stock': ['Po, dy janë mirë.', 'Jo, dua vetëm një.'],
  'social:politeness': ['Të lutem.', 'Faleminderit.'],
  'lodging:room-duration': ['Më duhet një dhomë për dy net.', 'Dua të fle këtu sonte.'],
  'lodging:priority': ['Dua ujë të ngrohtë.', 'Dua një dhomë të qetë.'],
  'lodging:decision': ['Marr dhomën e vogël.', 'Do të fle në odë.'],
  'directions:two-steps': ['Shko drejt, pastaj majtas.', 'Kalo urën dhe shko djathtas.'],
  'directions:landmark': ['Pranë pusit.', 'Te ura e vjetër.'],
  'directions:bridge-yes-no': ['Po, kalo urën.', 'Jo, mos shko te ura.'],
  'health:two-symptoms': ['Jam i lodhur dhe më dhemb koka.', 'Nuk jam mirë dhe kam dhimbje.'],
  'health:onset': ['Dje në mëngjes.', 'Sot pasdite.'],
  'repair:check-instruction': ['Mund ta thuash përsëri?', 'Duhet ta marr pas darkës?'],
  'invitation:decision': ['Po, do të vij.', 'Jo, nuk mund të vij.'],
  'invitation:reason': ['Sepse jam në punë.', 'Sepse jam i sëmurë.'],
  'invitation:contribution': ['Do të sjell bukë.', 'Mund të sjell ujë.', 'Nuk mund të sjell asgjë.'],
  'meeting:new-time': ['Takohemi në orën pesë.', 'Takohemi nesër në mëngjes.'],
  'meeting:new-place': ['Takohemi te pusi.', 'Takohemi në bujtinë.'],
  'meeting:confirmation': ['Po, në rregull.', 'Mirë, shihemi atje.'],
  'portrait:people': ['Kam një motër dhe një vëlla.', 'Jetoj me familjen time.'],
  'portrait:home': ['Jetoj pranë tregut.', 'Shtëpia ime është në fshat.'],
  'portrait:routine-series': ['Në mëngjes punoj, pastaj ha.', 'Në mbrëmje ha dhe fle.'],
  'cohesion:basic-connectors': ['… dhe …', '… por …'],
  'portrait:work-or-skill': ['Punoj në treg.', 'Di të bëj bukë.'],
  'portrait:work-series': ['Së pari marr ujin, pastaj bëj bukën.', 'Hap derën dhe pastaj filloj punën.'],
  'reason:simple': ['Sepse duhet të ndihmoj.', 'Sepse kjo punë është e mirë.'],
  'time:past-event': ['Dje isha te ura.', 'Në mëngjes isha në treg.'],
  'journey:conditions': ['Rruga ishte e gjatë.', 'Binte shi në mal.'],
  'time:next-plan': ['Nesër do të fle.', 'Pastaj do të kthehem në fshat.'],
  'social:concern': ['Më vjen keq.', 'A je mirë tani?'],
  'exchange:local-news': ['Ura është hapur.', 'Sot tregu është plot.'],
  'help:offer': ['Mund të të ndihmoj.', 'Do të vij me ty.'],
  'social:apology': ['Më fal.', 'Më vjen keq.'],
  'reason:absence': ['Isha në punë.', 'Sepse isha i sëmurë.'],
  'help:accepted-part': ['Po, do të sjell ujin.', 'Mund të sjell një fashë.'],
  'help:limit': ['Kam vetëm një fashë.', 'Nuk mund të vij tani.'],
  'time:arrival': ['Vij në orën pesë.', 'Vij atje në mesditë.'],
  'meeting:request-confirmation': ['A je dakord?', 'A mund të vish?'],
  'meeting:responsive-turn': ['Po, shihemi nesër.', 'Jo, takohemi pasdite.'],
  'account:past-event': ['Dje isha te ura.', 'Në mëngjes isha në pyll.'],
  'account:present-state': ['Tani jam në bujtinë.', 'Tani rruga është hapur.'],
  'account:problem': ['Kam një problem.', 'Nuk kam ujë.'],
  'account:next-action': ['Pastaj do të shkoj në treg.', 'Nesër do të kthehem.'],
  'cohesion:two-connectors': ['… dhe … por …', '… sepse … pastaj …'],
  'lodging:past-problem': ['Mbrëmë dhoma ishte e ftohtë.', 'Nuk kishte ujë të ngrohtë.'],
  'lodging:present-effect': ['Tani jam i lodhur.', 'Nuk jam mirë sot.'],
  'lodging:solution': ['Dua një batanije tjetër.', 'Më duhet ujë i ngrohtë.'],
  'time:requested-action': ['Sot pasdite.', 'Para mbrëmjes.'],
  'account:action-series': ['Në mëngjes isha në punë, pastaj isha në treg.', 'Në fillim isha me Elirën, pastaj isha në rrugë.'],
  'account:person-interaction': ['Isha me Elirën te ura.', 'Isha me tregtarin në treg.'],
  'account:setting': ['Binte shi në mëngjes.', 'Rruga ishte e gjatë.'],
  'account:plan-and-reason': ['Sonte fle sepse jam i lodhur.', 'Do të shkoj në bujtinë sepse bie shi.'],
  'care:dose-after-dinner': ['Një lugë pas darkës.', 'Ilaçin pas darkës.'],
  'care:return-if-unwell': ['Nëse fëmija nuk është mirë, ejani nesër.', 'Nëse fëmija është i sëmurë, ejani përsëri.'],
  'collaboration:responsibility': ['Unë do të vij me të.', 'Ti e sjell nesër.'],
  'road:horses-closed-until-tomorrow': ['Kuajt nuk kalojnë deri nesër.', 'Ura është mbyllur për kuajt.'],
  'road:pedestrians-north-one-by-one': ['Njerëzit kalojnë një nga një.', 'Mund të kalojmë në këmbë.'],
  'collaboration:crossing-plan': ['Kalojmë në këmbë.', 'Presim këtu deri nesër.'],
  'market:closes-noon': ['Tregu mbyllet në mesditë.', 'Në mesditë tregu është mbyllur.'],
  'market:collect-before-ten': ['Shko te Elira para orës dhjetë.', 'Merr gjërat te Elira para orës dhjetë.'],
  'collaboration:collector': ['Unë do të shkoj.', 'Ti merr gjërat.'],
  'meeting:tonight-cancelled': ['Elira nuk vjen sonte.', 'Sonte nuk ka takim.'],
  'meeting:tomorrow-nine-well': ['Nesër në orën nëntë te pusi.', 'Takimi është nesër në orën nëntë te pusi.'],
  'meeting:reply-before-dinner': ['Thuaj po ose jo para darkës.', 'Thuaji sot para mbrëmjes.'],
  'collaboration:meeting-reply': ['Po, do të vijmë.', 'Jo, takohemi më vonë.'],
  'direction:right': ['Shko djathtas.', 'Djathtas.'],
  'lodging:ready-after-six': ['Dhoma është e lirë pas orës gjashtë.', 'Pas orës gjashtë.'],
  'lodging:key-at-door': ['Çelësi është te dera.', 'Te dera.'],
  'collaboration:key-collector': ['Unë marr çelësin.', 'Ti merr çelësin.'],
  'weather:rain-tonight': ['Sonte bie shi.', 'Ka shi sonte.'],
  'meeting:tomorrow-morning-well': ['Nesër në mëngjes te pusi.', 'Takimi është nesër në mëngjes te pusi.'],
})

const requirement = (id, prompt, concepts, alternativesSq = []) => ({
  id,
  prompt,
  required: true,
  acceptedSemanticConcepts: concepts,
  acceptedAlternativesSq: [...new Set([
    ...alternativesSq,
    ...concepts.flatMap((concept) => CEFR_SEMANTIC_ALTERNATIVES_SQ[concept] || []),
  ])],
})

const listening = ({ id, level, topic, location, npc, speaker, scriptSq, questions }) => ({
  id,
  familyId: `${level.toLowerCase()}-unseen-listening`,
  level,
  mode: 'listening',
  heldOut: true,
  topic,
  storyAnchor: anchor(location, npc, `Hear a new ${topic} message and act on it.`),
  stimulus: {
    kind: 'continuous-audio',
    scriptSq,
    preAttemptSurface: 'audio-only',
    transcriptReveal: 'after-final-attempt',
    replayPolicy: level === 'A1' ? 'up-to-three' : 'up-to-two',
  },
  prompt: level === 'A1'
    ? 'Listen to the person, then choose the fact or action you heard.'
    : 'Listen for the main point first, then answer one detail question.',
  voice: voice(speaker, level === 'A1' ? 'slow-clear' : 'natural-clear'),
  questions,
  response: { kind: 'choice', attemptBeforeReveal: true },
  rubric: receptionRubric(level === 'A1' ? `Recognise the concrete ${topic} fact.` : `Recover the gist and one useful ${topic} detail.`),
})

const reading = ({ id, level, textType, topic, location, npc, textSq, questions }) => ({
  id,
  familyId: `${level.toLowerCase()}-unseen-reading`,
  level,
  mode: 'reading',
  heldOut: true,
  topic,
  textType,
  storyAnchor: anchor(location, npc, `Use an unfamiliar ${textType} to make a world decision.`),
  stimulus: { kind: 'written-text', textSq, preAttemptSurface: 'albanian-only' },
  prompt: level === 'A1'
    ? 'Read the Albanian text and choose the fact you need.'
    : 'Read for the main purpose, then find one useful detail.',
  voice: null,
  questions,
  response: { kind: 'choice', attemptBeforeReveal: true },
  rubric: receptionRubric(level === 'A1' ? `Locate one concrete fact in this ${textType}.` : `Identify the purpose and retrieve a detail from this ${textType}.`),
})

const performance = ({
  id, familyId, level, mode, topic, location, npc, stimulus, prompt, requirements,
  response, focus, criticalEvidence, speaker = null,
}) => ({
  id,
  familyId,
  level,
  mode,
  heldOut: true,
  topic,
  storyAnchor: anchor(location, npc, focus),
  stimulus,
  prompt,
  voice: speaker
    ? voice(speaker, 'supportive-natural')
    : (mode.startsWith('spoken')
        ? { id: 'learner', speakerIdentityId: 'learner', acousticVoiceId: null, character: 'Learner', presentation: 'learner recording', locale: 'sq-AL' }
        : null),
  requirements,
  response: { attemptBeforeReveal: true, ...response },
  rubric: performanceRubric(focus, criticalEvidence),
})

const A1_LISTENING = [
  listening({
    id: 'a1-unseen-listening-01', level: 'A1', topic: 'destination', location: 'bridge', npc: 'Elira', speaker: 'elira',
    scriptSq: 'Jam Elira. Po shkoj te ura e vjetër.',
    questions: [question('place', 'detail', 'Ku po shkon Elira?', [['bridge', 'Te ura e vjetër'], ['inn', 'Në një bujtinë'], ['market', 'Te tregu']], 'bridge', ['destination:old-bridge'])],
  }),
  listening({
    id: 'a1-unseen-listening-02', level: 'A1', topic: 'price', location: 'inn', npc: 'bujtinari', speaker: 'innkeeper',
    scriptSq: 'Dhoma e vogël kushton dyzet lekë.',
    questions: [question('price', 'detail', 'Sa kushton dhoma?', [['forty', 'Dyzet lekë'], ['thirty', 'Tridhjetë lekë'], ['hundred', 'Njëqind lekë']], 'forty', ['price:40-leke'])],
  }),
  listening({
    id: 'a1-unseen-listening-03', level: 'A1', topic: 'opening-time', location: 'market', npc: 'tregtari', speaker: 'trader',
    scriptSq: 'Tregu hapet në orën tetë të mëngjesit.',
    questions: [question('time', 'detail', 'Kur hapet tregu?', [['eight', 'Në orën tetë'], ['nine', 'Në orën nëntë'], ['noon', 'Në mesditë']], 'eight', ['time:08:00'])],
  }),
  listening({
    id: 'a1-unseen-listening-04', level: 'A1', topic: 'immediate-need', location: 'healer-house', npc: 'shëruesi', speaker: 'healer',
    scriptSq: 'Më duhet ujë i ngrohtë për ilaçin.',
    questions: [question('need', 'detail', 'Çfarë duhet për ilaçin?', [['water', 'Ujë i ngrohtë'], ['bread', 'Bukë e ngrohtë'], ['blanket', 'Një batanije']], 'water', ['need:warm-water'])],
  }),
  listening({
    id: 'a1-unseen-listening-05', level: 'A1', topic: 'recipient', location: 'village-square', npc: 'plaku i sheshit', speaker: 'courier',
    scriptSq: 'Kjo është për Elirën, te shtëpia pranë pusit.',
    questions: [question('person', 'detail', 'Për kë është letra?', [['elira', 'Për Elirën'], ['mihal', 'Për Mihalin'], ['healer', 'Për shëruesin']], 'elira', ['recipient:Elira'])],
  }),
  listening({
    id: 'a1-unseen-listening-06', level: 'A1', topic: 'journey', location: 'east-road', npc: 'plaku i udhës', speaker: 'traveller',
    scriptSq: 'Sot nisem për Korçë me kalin tim.',
    questions: [question('destination', 'detail', 'Për ku niset udhëtari?', [['korce', 'Për Korçë'], ['village', 'Për në fshat'], ['market', 'Për në treg']], 'korce', ['destination:Korce'])],
  }),
  listening({
    id: 'a1-unseen-listening-07', level: 'A1', topic: 'meal-location', location: 'inn', npc: 'bujtinari', speaker: 'innkeeper',
    scriptSq: 'Mëngjesi është gati në odën e madhe.',
    questions: [question('room', 'detail', 'Ku është gati mëngjesi?', [['great-room', 'Në odën e madhe'], ['guest-room', 'Në dhomën e miqve'], ['outside', 'Jashtë']], 'great-room', ['location:great-room'])],
  }),
  listening({
    id: 'a1-unseen-listening-08', level: 'A1', topic: 'meeting', location: 'well', npc: 'Elira', speaker: 'elira',
    scriptSq: 'Të pres pranë pusit në mesditë.',
    questions: [question('meeting-place', 'detail', 'Ku duhet të shkosh?', [['well', 'Pranë pusit'], ['bridge', 'Te ura'], ['inn', 'Në një bujtinë']], 'well', ['meeting-place:well'])],
  }),
  listening({
    id: 'a1-unseen-listening-09', level: 'A1', topic: 'food', location: 'market', npc: 'tregtari', speaker: 'trader',
    scriptSq: 'Sot kam bukë dhe djathë të bardhë.',
    questions: [question('item', 'detail', 'Çfarë ka tregtari?', [['cheese', 'Djathë të bardhë'], ['medicine', 'Ilaç'], ['soap', 'Sapun']], 'cheese', ['stock:white-cheese'])],
  }),
  listening({
    id: 'a1-unseen-listening-10', level: 'A1', topic: 'object-location', location: 'bridge-worksite', npc: 'Mihali', speaker: 'mihal',
    scriptSq: 'Çekiçin e kam në shportë të vogël.',
    questions: [question('place', 'detail', 'Ku është çekiçi?', [['basket', 'Në shportë'], ['bag', 'Në çantë'], ['door', 'Te dera']], 'basket', ['object-location:basket'])],
  }),
  listening({
    id: 'a1-unseen-listening-11', level: 'A1', topic: 'care-instruction', location: 'healer-house', npc: 'shëruesi', speaker: 'healer',
    scriptSq: 'Merr një lugë me ilaç pas bukës.',
    questions: [question('action', 'detail', 'Çfarë duhet të marrësh?', [['spoon', 'Një lugë me ilaç'], ['water', 'Një shishe me ujë'], ['bandage', 'Një fashë']], 'spoon', ['instruction:one-spoon-medicine'])],
  }),
  listening({
    id: 'a1-unseen-listening-12', level: 'A1', topic: 'closing-time', location: 'village-gate', npc: 'plaku i sheshit', speaker: 'crier',
    scriptSq: 'Sonte porta e fshatit mbyllet në orën nëntë.',
    questions: [question('time', 'detail', 'Kur mbyllet porta?', [['nine', 'Në orën nëntë'], ['seven', 'Në orën shtatë'], ['noon', 'Në mesditë']], 'nine', ['time:21:00'])],
  }),
]

const A1_READING = [
  reading({ id: 'a1-unseen-reading-01', level: 'A1', textType: 'door-sign', topic: 'lodging', location: 'inn', npc: 'bujtinari', textSq: 'DHOMË E LIRË', questions: [question('purpose', 'detail', 'Çfarë mund të gjesh këtu?', [['room', 'Një dhomë'], ['medicine', 'Ilaç'], ['bridge', 'Një urë']], 'room', ['service:lodging'])] }),
  reading({ id: 'a1-unseen-reading-02', level: 'A1', textType: 'price-tag', topic: 'price', location: 'market', npc: 'tregtari', textSq: 'Bukë: 30 lekë', questions: [question('price', 'detail', 'Sa kushton buka?', [['thirty', '30 lekë'], ['forty', '40 lekë'], ['seventy', '70 lekë']], 'thirty', ['price:30-leke'])] }),
  reading({ id: 'a1-unseen-reading-03', level: 'A1', textType: 'meeting-note', topic: 'meeting', location: 'bridge', npc: 'Elira', textSq: 'Të pres te ura në orën pesë. — Elira', questions: [question('place', 'detail', 'Ku të pret Elira?', [['bridge', 'Te ura'], ['well', 'Te pusi'], ['inn', 'Në një bujtinë']], 'bridge', ['meeting-place:bridge'])] }),
  reading({ id: 'a1-unseen-reading-04', level: 'A1', textType: 'warning-sign', topic: 'water', location: 'dry-well', npc: 'plaku i sheshit', textSq: 'PUSI ËSHTË I THATË', questions: [question('status', 'detail', 'Çfarë problemi ka?', [['dry', 'Nuk ka ujë'], ['cold', 'Uji është i ftohtë'], ['far', 'Pusi është larg']], 'dry', ['problem:well-dry'])] }),
  reading({ id: 'a1-unseen-reading-05', level: 'A1', textType: 'opening-notice', topic: 'opening-time', location: 'market', npc: 'tregtari', textSq: 'Tregu hapet çdo ditë në orën shtatë.', questions: [question('time', 'detail', 'Kur hapet tregu?', [['seven', 'Në orën shtatë'], ['eight', 'Në orën tetë'], ['ten', 'Në orën dhjetë']], 'seven', ['time:07:00'])] }),
  reading({ id: 'a1-unseen-reading-06', level: 'A1', textType: 'door-note', topic: 'whereabouts', location: 'Elira-house', npc: 'Elira', textSq: 'Jam te shëruesi. Kthehem pasdite. — Elira', questions: [question('place', 'detail', 'Ku është Elira tani?', [['healer', 'Te shëruesi'], ['market', 'Në treg'], ['bridge', 'Te ura']], 'healer', ['location:healer'])] }),
  reading({ id: 'a1-unseen-reading-07', level: 'A1', textType: 'meal-list', topic: 'food', location: 'inn-kitchen', npc: 'bujtinari', textSq: 'Për darkë: bukë, djathë dhe çaj mali.', questions: [question('drink', 'detail', 'Çfarë do të pini?', [['tea', 'Çaj mali'], ['coffee', 'Kafe'], ['water', 'Vetëm ujë']], 'tea', ['drink:mountain-tea'])] }),
  reading({ id: 'a1-unseen-reading-08', level: 'A1', textType: 'direction-sign', topic: 'directions', location: 'forked-road', npc: 'plaku i udhës', textSq: 'FSHATI: MAJTAS', questions: [question('direction', 'detail', 'Nga duhet të shkosh për në fshat?', [['left', 'Majtas'], ['right', 'Djathtas'], ['back', 'Prapa']], 'left', ['direction:left'])] }),
  reading({ id: 'a1-unseen-reading-09', level: 'A1', textType: 'room-card', topic: 'lodging', location: 'inn', npc: 'Mihali', textSq: 'Dhoma e Mihalit — 3', questions: [question('number', 'detail', 'Cili është numri i dhomës?', [['three', '3'], ['two', '2'], ['five', '5']], 'three', ['room-number:3'])] }),
  reading({ id: 'a1-unseen-reading-10', level: 'A1', textType: 'price-tag', topic: 'shopping', location: 'market', npc: 'tregtari', textSq: 'Sapun: 25 lekë', questions: [question('item', 'detail', 'Çfarë kushton 25 lekë?', [['soap', 'Sapuni'], ['bread', 'Buka'], ['salt', 'Kripa']], 'soap', ['item:soap'])] }),
  reading({ id: 'a1-unseen-reading-11', level: 'A1', textType: 'appointment-note', topic: 'appointment', location: 'healer-house', npc: 'shëruesi', textSq: 'Shëruesi të pret nesër në mëngjes.', questions: [question('time', 'detail', 'Kur duhet të vish?', [['tomorrow-morning', 'Nesër në mëngjes'], ['tonight', 'Sonte'], ['today-noon', 'Sot në mesditë']], 'tomorrow-morning', ['appointment:tomorrow-morning'])] }),
  reading({ id: 'a1-unseen-reading-12', level: 'A1', textType: 'warning-sign', topic: 'safety', location: 'bridge', npc: 'Mihali', textSq: 'KUJDES: MOS KALO URËN', questions: [question('action', 'detail', 'Çfarë duhet të bësh?', [['stop', 'Mos kalo urën'], ['quickly', 'Kalo shpejt'], ['right', 'Shko djathtas']], 'stop', ['action:do-not-cross'])] }),
]

const A1_PERFORMANCE = [
  performance({
    id: 'a1-live-dialogue-01', familyId: 'a1-live-dialogue', level: 'A1', mode: 'spokenInteraction', topic: 'identity', location: 'bridge', npc: 'Elira', speaker: 'elira',
    stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Përshëndetje, unë jam Elira. Po ti, si quhesh?', afterConcept: 'name', followUpSq: 'Mirë se erdhe. Nga cili vend je?' }] },
    prompt: 'Answer both of Elira’s questions aloud.',
    requirements: [requirement('name', 'Say your name.', ['identity:name'], ['Quhem …', 'Unë jam …']), requirement('origin', 'Say where you are from.', ['identity:origin'], ['Jam nga …'])],
    response: { kind: 'recorded-dialogue', minimumTurns: 2, replayOwnAudio: true }, focus: 'Exchange a name and place of origin with Elira.', criticalEvidence: ['a name', 'a place of origin'],
  }),
  performance({
    id: 'a1-live-dialogue-02', familyId: 'a1-live-dialogue', level: 'A1', mode: 'spokenInteraction', topic: 'lodging', location: 'inn', npc: 'bujtinari', speaker: 'innkeeper',
    stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Mirë se erdhe në bujtinë. Çfarë kërkon për sonte?', afterConcept: 'room-request', followUpSq: 'Mirë, për sa net?' }] },
    prompt: 'Ask for a room and answer the follow-up aloud.', requirements: [requirement('room', 'Ask for a room.', ['need:room'], ['Më duhet një dhomë.', 'Dua një dhomë, ju lutem.']), requirement('nights', 'Give a number of nights.', ['duration:nights'], ['Për një natë.', 'Për dy net.'])],
    response: { kind: 'recorded-dialogue', minimumTurns: 2, replayOwnAudio: true }, focus: 'Make a simple room request and state its duration.', criticalEvidence: ['room request', 'number of nights'],
  }),
  performance({
    id: 'a1-live-dialogue-03', familyId: 'a1-live-dialogue', level: 'A1', mode: 'spokenInteraction', topic: 'shopping', location: 'market', npc: 'tregtari', speaker: 'trader',
    stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Përshëndetje. Çfarë dëshiron të marrësh?', afterConcept: 'item-request', followUpSq: 'Sa të duhen, një apo dy?' }] },
    prompt: 'Buy one ordinary item and answer the quantity question.', requirements: [requirement('item', 'Request an item politely.', ['purchase:item'], ['Dua bukë, ju lutem.', 'Dua sapun, ju lutem.']), requirement('quantity', 'State one or two.', ['purchase:quantity'], ['Një, ju lutem.', 'Dy, ju lutem.'])],
    response: { kind: 'recorded-dialogue', minimumTurns: 2, replayOwnAudio: true }, focus: 'Complete a two-turn market purchase.', criticalEvidence: ['an item', 'a quantity'],
  }),
  performance({
    id: 'a1-live-dialogue-04', familyId: 'a1-live-dialogue', level: 'A1', mode: 'spokenInteraction', topic: 'health', location: 'healer-house', npc: 'shëruesi', speaker: 'healer',
    stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Nuk je mirë. Si je sot?', afterConcept: 'condition', followUpSq: 'Më trego, ku të dhemb?' }] },
    prompt: 'Tell the healer how you feel and where it hurts.', requirements: [requirement('condition', 'State that you are not well or are tired.', ['health:condition'], ['Nuk jam mirë.', 'Jam i lodhur.', 'Jam e lodhur.']), requirement('pain', 'Name where it hurts.', ['health:pain-location'], ['Më dhemb koka.', 'Më dhemb dora.'])],
    response: { kind: 'recorded-dialogue', minimumTurns: 2, replayOwnAudio: true }, focus: 'Answer two simple questions about immediate health.', criticalEvidence: ['condition', 'pain location'],
  }),
  performance({
    id: 'a1-spoken-portrait-01', familyId: 'a1-spoken-portrait', level: 'A1', mode: 'spokenProduction', topic: 'self-and-home', location: 'inn-guest-room', npc: 'bujtinari',
    stimulus: { kind: 'visual-prompt', cues: ['your name', 'your home town or country', 'where you live now'] }, prompt: 'Record a short introduction for the inn guest book.',
    requirements: [requirement('name', 'Introduce yourself.', ['identity:name']), requirement('origin', 'Say where you are from.', ['identity:origin']), requirement('home', 'Say where you live.', ['home:location'])],
    response: { kind: 'recorded-monologue', minimumSeconds: 20, targetSeconds: 30, replayOwnAudio: true }, focus: 'Introduce yourself and describe where you live.', criticalEvidence: ['identity', 'origin', 'current home'],
  }),
  performance({
    id: 'a1-spoken-portrait-02', familyId: 'a1-spoken-portrait', level: 'A1', mode: 'spokenProduction', topic: 'familiar-person', location: 'inn-guest-room', npc: 'Elira',
    stimulus: { kind: 'visual-prompt', cues: ['a person’s name', 'your relationship', 'one simple fact about that person'] }, prompt: 'Tell Elira about one person you know.',
    requirements: [requirement('person', 'Name a familiar person.', ['person:name']), requirement('relationship', 'State who the person is to you.', ['person:relationship']), requirement('fact', 'Give one fact about the person.', ['person:familiar-fact'])],
    response: { kind: 'recorded-monologue', minimumSeconds: 20, targetSeconds: 30, replayOwnAudio: true }, focus: 'Describe a familiar person in simple connected speech.', criticalEvidence: ['person', 'relationship', 'one fact'],
  }),
  performance({
    id: 'a1-written-exchange-01', familyId: 'a1-written-exchange', level: 'A1', mode: 'writtenInteraction', topic: 'arrival', location: 'inn', npc: 'bujtinari', stimulus: { kind: 'incoming-note', textSq: 'Mirë se erdhe! A je në bujtinë tani?' }, prompt: 'Write a short reply to the innkeeper.',
    requirements: [requirement('greeting', 'Return the greeting.', ['social:greeting'], ['Përshëndetje!', 'Faleminderit!']), requirement('location', 'Say whether you are at the inn.', ['location:current']), requirement('feeling', 'Add how you feel.', ['feeling:current'])], response: { kind: 'free-text', minimumWords: 8 }, focus: 'Reply with a greeting, location and feeling.', criticalEvidence: ['social reply', 'location', 'feeling'],
  }),
  performance({
    id: 'a1-written-exchange-02', familyId: 'a1-written-exchange', level: 'A1', mode: 'writtenInteraction', topic: 'thanks', location: 'market', npc: 'tregtari', stimulus: { kind: 'incoming-note', textSq: 'Kam një shportë për ty në treg.' }, prompt: 'Thank the trader and say when you will collect the basket.',
    requirements: [requirement('thanks', 'Thank the trader.', ['social:thanks'], ['Faleminderit!', 'Faleminderit shumë!']), requirement('time', 'Give a simple collection time.', ['meeting:time'])], response: { kind: 'free-text', minimumWords: 8 }, focus: 'Respond with thanks and a simple plan.', criticalEvidence: ['thanks', 'collection time'],
  }),
  performance({
    id: 'a1-written-exchange-03', familyId: 'a1-written-exchange', level: 'A1', mode: 'writtenInteraction', topic: 'meeting', location: 'village-square', npc: 'Elira', stimulus: { kind: 'incoming-note', textSq: 'Jam te pusi. Ku je ti?' }, prompt: 'Tell Elira where you are and suggest a meeting place.',
    requirements: [requirement('location', 'State your current location.', ['location:current']), requirement('meeting', 'Give a meeting place.', ['meeting:place']), requirement('closing', 'Close politely.', ['social:closing'], ['Shihemi!', 'Mirupafshim!'])], response: { kind: 'free-text', minimumWords: 8 }, focus: 'Exchange a location and arrange a simple meeting.', criticalEvidence: ['current location', 'meeting place'],
  }),
  performance({
    id: 'a1-free-writing-01', familyId: 'a1-free-writing', level: 'A1', mode: 'writtenProduction', topic: 'guest-note', location: 'inn-guest-room', npc: 'bujtinari', stimulus: { kind: 'scene-prompt', cues: ['introduce yourself', 'name a familiar person', 'say where you are', 'state one need'] }, prompt: 'Write three or more simple sentences for the innkeeper.',
    requirements: [requirement('identity', 'Introduce yourself.', ['identity:name']), requirement('person', 'Mention a familiar person.', ['person:familiar']), requirement('place', 'Name your current place.', ['location:current']), requirement('need', 'State one immediate need.', ['need:immediate'])], response: { kind: 'free-text', minimumWords: 20, minimumSentences: 3 }, focus: 'Write simple sentences about self, person, place and need.', criticalEvidence: ['self', 'familiar person', 'place', 'need'],
  }),
  performance({
    id: 'a1-free-writing-02', familyId: 'a1-free-writing', level: 'A1', mode: 'writtenProduction', topic: 'market-plan', location: 'market', npc: 'Elira', stimulus: { kind: 'scene-prompt', cues: ['say where you are going', 'name two things you need', 'say when you will return'] }, prompt: 'Leave Elira a three-sentence note before you go.',
    requirements: [requirement('destination', 'Say where you are going.', ['journey:destination']), requirement('items', 'Name two needed items.', ['need:two-items']), requirement('return', 'Give a return time.', ['time:return'])], response: { kind: 'free-text', minimumWords: 20, minimumSentences: 3 }, focus: 'Write a short practical note about a journey and needs.', criticalEvidence: ['destination', 'two items', 'return time'],
  }),
  performance({
    id: 'a1-simple-relay-01', familyId: 'a1-simple-relay', level: 'A1', mode: 'mediation', topic: 'opening-time', location: 'market', npc: 'Elira', stimulus: { kind: 'source-and-listener', sourceSq: 'TREGU HAPET NË ORËN TETË', listenerNeed: 'Elira cannot see the notice.' }, prompt: 'Tell Elira when the market opens.',
    requirements: [requirement('time', 'Relay the opening time.', ['time:08:00'], ['Tregu hapet në orën tetë.', 'Në orën tetë.'])], response: { kind: 'short-relay', deterministicSemanticCheck: true }, focus: 'Relay one visible time to a person who cannot see it.', criticalEvidence: ['opening time'],
  }),
  performance({
    id: 'a1-simple-relay-02', familyId: 'a1-simple-relay', level: 'A1', mode: 'mediation', topic: 'price', location: 'inn', npc: 'Elira', stimulus: { kind: 'source-and-listener', sourceSq: 'DHOMA: 40 LEKË', listenerNeed: 'Elira is carrying the bags and cannot read the board.' }, prompt: 'Tell Elira the room price.',
    requirements: [requirement('price', 'Relay the room price.', ['price:40-leke'], ['Dhoma kushton dyzet lekë.', 'Dyzet lekë.'])], response: { kind: 'short-relay', deterministicSemanticCheck: true }, focus: 'Relay one visible price to a companion.', criticalEvidence: ['room price'],
  }),
  performance({
    id: 'a1-simple-relay-03', familyId: 'a1-simple-relay', level: 'A1', mode: 'mediation', topic: 'meeting-place', location: 'village-square', npc: 'Elira', stimulus: { kind: 'source-and-listener', sourceSq: 'TAKIMI ËSHTË TE PUSI', listenerNeed: 'Elira asks where the meeting is.' }, prompt: 'Tell Elira the meeting place.',
    requirements: [requirement('place', 'Relay the meeting place.', ['meeting-place:well'], ['Takimi është te pusi.', 'Te pusi.'])], response: { kind: 'short-relay', deterministicSemanticCheck: true }, focus: 'Relay one visible place to another character.', criticalEvidence: ['meeting place'],
  }),
]

const A2_LISTENING_ROWS = [
  ['01', 'road-conditions', 'west-road', 'plaku i udhës', 'traveller', 'Shiu ka mbyllur rrugën për në Korçë. Shko nga mulliri; rruga është e gjatë, por e sigurt.', 'avoid-closed-road', 'Rruga për në Korçë është mbyllur', 'route', 'Nga mulliri'],
  ['02', 'road-conditions', 'bridge', 'Mihali', 'mihal', 'Ura nuk është e sigurt tani. Njerëzit duhet të presin deri në mesditë.', 'delay-carts', 'Njerëzit nuk mund të kalojnë tani', 'time', 'Deri në mesditë'],
  ['03', 'road-conditions', 'north-path', 'Elira', 'elira', 'Pema është në rrugë para teje. Merr rrugën majtas.', 'path-obstacle', 'Pema është në rrugë', 'direction', 'Majtas'],
  ['04', 'road-conditions', 'river-crossing', 'plaku i sheshit', 'courier', 'Lumi është i madh sepse bie shi dhe ura është mbyllur. Takohemi te mulliri.', 'crossing-closed', 'Ura është mbyllur', 'meeting-place', 'Te mulliri'],
  ['05', 'weather', 'village-square', 'plaku i sheshit', 'crier', 'Sonte vjen një stuhi me shumë shi. Sill kafshët brenda para natës.', 'storm-preparation', 'Fshati duhet të bëhet gati për shi', 'action', 'Kafshët'],
  ['06', 'weather', 'shepherd-path', 'Elira', 'elira', 'Nesër në mëngjes ka mjegull. Në mesditë nuk ka mjegull.', 'fog-clears', 'Në mëngjes ka mjegull', 'time', 'Në mesditë'],
  ['07', 'weather', 'inn', 'bujtinari', 'innkeeper', 'Sonte është shumë ftohtë. Në dhomën e miqve ka një batanije tjetër.', 'cold-night', 'Miqve u duhet një batanije', 'object-location', 'Në dhomën e miqve'],
  ['08', 'weather', 'market', 'Elira', 'elira', 'Tani nuk ka stuhi. Tregu hapet sot në orën tetë.', 'normal-opening', 'Tregu hapet sot', 'opening-status', 'Në orën tetë'],
  ['09', 'market-commerce', 'market', 'tregtari', 'trader', 'Buka kushton dyzet lekë në mëngjes. Në mesditë kushton tridhjetë lekë.', 'price-change', 'Buka kushton më pak në mesditë', 'later-price', 'Tridhjetë lekë'],
  ['10', 'market-commerce', 'inn-yard', 'plaku i sheshit', 'crier', 'Sot bie shi. Tregu nuk është në shesh; është në odë.', 'market-moved', 'Tregu është në një vend tjetër', 'new-place', 'Në odë'],
  ['11', 'market-commerce', 'shop', 'tregtari', 'trader', 'Ti do kripë dhe sapun. Sot ka vetëm sapun; kripa vjen nesër.', 'partial-order', 'Sot mungon kripa', 'missing-item', 'Kripa'],
  ['12', 'market-commerce', 'village-square', 'plaku i sheshit', 'crier', 'Tregtari ka një çekiç të ri sot. Merre në mëngjes.', 'blacksmith-visit', 'Tregtari ka një çekiç të ri', 'deadline', 'Në mëngjes'],
  ['13', 'lodging', 'inn', 'bujtinari', 'innkeeper', 'Dhoma e vogël kushton njëqind lekë për natë. Mëngjesi është gati në orën tetë.', 'room-offer', 'Ka një dhomë për njëqind lekë', 'breakfast-time', 'Në orën tetë'],
  ['14', 'lodging', 'inn', 'bujtinari', 'innkeeper', 'Sonte nuk ka dhomë të lirë. Ka një shtrat në odën e madhe.', 'alternative-bed', 'Ka një vend tjetër për të fjetur', 'place', 'Në odën e madhe'],
  ['15', 'lodging', 'inn', 'Elira', 'elira', 'Nesër, para se të shkosh në treg, vendos çelësin te dera.', 'key-return', 'Çelësi duhet të jetë te dera', 'key-place', 'Te dera'],
  ['16', 'lodging', 'inn-kitchen', 'bujtinari', 'innkeeper', 'Uji i ngrohtë do të jetë gati pas një ore.', 'hot-water-delay', 'Uji i ngrohtë nuk është gati', 'wait', 'Një orë'],
  ['17', 'feast-social', 'village-square', 'plaku i sheshit', 'crier', 'Ka një festë nesër në shesh. Çdo familje sjell bukë.', 'feast-invitation', 'Fshati ka një festë', 'contribution', 'Bukë'],
  ['18', 'feast-social', 'Elira-house', 'Elira', 'elira', 'Sonte nuk mund të ha me ju. Ejani nesër në shtëpinë time në mbrëmje.', 'changed-invitation', 'Darka është nesër në mbrëmje', 'time', 'Nesër në mbrëmje'],
  ['19', 'feast-social', 'inn-yard', 'Elira', 'elira', 'Fëmijët hanë në odë para njerëzve të tjerë.', 'event-order', 'Fëmijët hanë më herët', 'children-place', 'Në odë'],
  ['20', 'feast-social', 'inn', 'bujtinari', 'innkeeper', 'Për darkë ka vend për gjashtë njerëz. Tani jemi katër.', 'guest-capacity', 'Ka ende vend në darkë', 'open-places', 'Dy vende'],
  ['21', 'meeting-plans', 'village-square', 'Elira', 'elira', 'Mos më prit te ura. Takohemi te pusi në orën katër.', 'meeting-moved', 'Takimi nuk është te ura', 'new-place', 'Te pusi'],
  ['22', 'meeting-plans', 'healer-house', 'shëruesi', 'healer', 'Nuk mund të të ndihmoj në orën tetë. Eja në orën nëntë.', 'appointment-delayed', 'Duhet të vish më vonë', 'new-time', 'Në orën nëntë'],
  ['23', 'meeting-plans', 'east-road', 'plaku i sheshit', 'courier', 'Plaku i udhës nuk arrin nesër në mëngjes. Ai do të jetë këtu në mbrëmje.', 'arrival-delayed', 'Plaku i udhës vjen më vonë', 'new-time', 'Nesër në mbrëmje'],
  ['24', 'meeting-plans', 'market', 'Elira', 'elira', 'Do të pres në treg deri në mesditë. Pastaj jam në bujtinë.', 'two-stage-plan', 'Pastaj jam në bujtinë', 'later-place', 'Në bujtinë'],
]

const A2_LISTENING_DETAIL_DESIGN = {
  '01': ['Which route should the traveller take?', 'route'],
  '02': ['Until when must people wait?', 'time'],
  '03': ['Which direction avoids the tree?', 'direction'],
  '04': ['Where should everyone meet?', 'place'],
  '05': ['What must be brought inside?', 'living-thing'],
  '06': ['When will the sky be clear?', 'time'],
  '07': ['Where is the extra blanket?', 'place'],
  '08': ['When does the market open?', 'time'],
  '09': ['What is the later bread price?', 'price'],
  '10': ['Where is the market today?', 'place'],
  '11': ['Which item is unavailable today?', 'item'],
  '12': ['When should the tool be collected?', 'time'],
  '13': ['At what time is breakfast ready?', 'time'],
  '14': ['Where can the guest sleep?', 'sleep-place'],
  '15': ['Where should the key be left?', 'place'],
  '16': ['How long until the water is ready?', 'duration'],
  '17': ['What should each family bring?', 'item'],
  '18': ['When is the replacement dinner?', 'time'],
  '19': ['Where do the children eat?', 'meal-place'],
  '20': ['How many dinner places remain?', 'count'],
  '21': ['Where is the new meeting place?', 'place'],
  '22': ['What is the new appointment time?', 'time'],
  '23': ['When will the traveller arrive?', 'time'],
  '24': ['Where will the speaker be later?', 'place'],
}

const A2_DETAIL_EXTRA_CHOICES = {
  direction: ['Majtas', 'Djathtas', 'Drejt'],
  duration: ['Një orë', 'Dy orë', 'Tri orë'],
  count: ['Një vend', 'Dy vende', 'Tri vende'],
  item: ['Bukë', 'Ujë', 'Kripa', 'Sapuni', 'Një batanije'],
  'living-thing': ['Kafshët', 'Fëmijët', 'Kuajt'],
  place: ['Te ura', 'Te pusi', 'Te mulliri', 'Në treg', 'Në bujtinë', 'Në odë'],
  route: ['Nga mulliri', 'Nga pylli', 'Nga ura e madhe'],
  'sleep-place': ['Në odën e madhe', 'Në dhomën e miqve', 'Në një bujtinë'],
  'meal-place': ['Në odë', 'Në treg', 'Te pusi'],
  price: ['Tridhjetë lekë', 'Dyzet lekë', 'Njëqind lekë'],
  time: ['Në mëngjes', 'Në mesditë', 'Në mbrëmje', 'Në orën tetë', 'Në orën nëntë'],
}

const detailCandidates = (rows, design, category) => [
  ...rows.filter((row) => design[row[0]][1] === category).map((row) => row[9]),
  ...(A2_DETAIL_EXTRA_CHOICES[category] || []),
]
const gistCandidates = (rows, group) => rows.filter((row) => row[1] === group).map((row) => row[7])

const A2_LISTENING_DATA = A2_LISTENING_ROWS.map(([number, topic, location, npc, speaker, scriptSq, gistId, gistLabel, detailId, detailLabel]) => listening({
  id: `a2-unseen-listening-${number}`, level: 'A2', topic, location, npc, speaker, scriptSq,
  questions: [
    question('gist', 'gist', 'What is the main point of the message?', plausibleChoiceSet(gistId, gistLabel, gistCandidates(A2_LISTENING_ROWS, topic), Number(number)), gistId, [`gist:${gistId}`], { choiceCategory: `message:${topic}`, distractorPolicy: 'same-topic-peer' }),
    question('detail', 'detail', A2_LISTENING_DETAIL_DESIGN[number][0], plausibleChoiceSet(detailId, detailLabel, detailCandidates(A2_LISTENING_ROWS, A2_LISTENING_DETAIL_DESIGN, A2_LISTENING_DETAIL_DESIGN[number][1]), Number(number)), detailId, [`detail:${detailId}`], { choiceCategory: A2_LISTENING_DETAIL_DESIGN[number][1], distractorPolicy: 'same-semantic-category' }),
  ],
}))

const A2_READING_ROWS = [
  ['01', 'inn-tariff', 'lodging', 'inn', 'bujtinari', 'DHOMË E VOGËL\n1 natë: 300 lekë\nMëngjesi: 30 lekë\nUji i ngrohtë është gati.', 'compare-costs', 'Këtu ka dhomë dhe mëngjes', 'breakfast', 'Tridhjetë lekë'],
  ['02', 'inn-tariff', 'lodging', 'inn', 'bujtinari', 'ODA E MADHE\nShtrat: 100 lekë\nDarkë: 40 lekë\nFëmijët: 0 lekë', 'family-lodging', 'Këtu ka shtrat dhe darkë', 'dinner-price', 'Dyzet lekë'],
  ['03', 'inn-tariff', 'lodging', 'inn', 'bujtinari', 'TRI NET\n800 lekë\nVendos çelësin te dera kur ikën.', 'long-stay', 'Tri net kushtojnë 800 lekë', 'key', 'Te dera'],
  ['04', 'inn-tariff', 'lodging', 'inn', 'bujtinari', 'SOT\nDhoma e madhe nuk është e lirë.\nDhoma e vogël është e lirë në orën gjashtë.', 'room-availability', 'Një dhomë është e lirë më vonë', 'time', 'Në orën gjashtë'],
  ['05', 'stall-list', 'shopping', 'market', 'tregtari', 'BUKË 30 LEKË\nDJATHË 40 LEKË\nKRIPË 20 LEKË', 'market-prices', 'Këtu ka bukë, djathë dhe kripë', 'cheapest', 'Kripa'],
  ['06', 'stall-list', 'shopping', 'market', 'tregtari', 'SOT KEMI\nSapun dhe qirinj.\nKripa vjen nesër.', 'stock-list', 'Sot ka sapun, por jo kripë', 'tomorrow', 'Kripa'],
  ['07', 'stall-list', 'shopping', 'market', 'tregtari', 'PËR BUJTINË\n2 bukë\n1 shportë\n3 shishe ujë', 'inn-order', 'Këto gjëra janë për një bujtinë', 'water-count', 'Tri shishe'],
  ['08', 'stall-list', 'shopping', 'market', 'tregtari', 'TREGU MBYLLET NË MESDITË.\nPastaj shko në bujtinë.', 'stall-closing', 'Në mesditë duhet të shkosh në bujtinë', 'later-place', 'Në bujtinë'],
  ['09', 'route-notice', 'directions', 'forked-road', 'Mihali', 'RRUGA ËSHTË MBYLLUR.\nPër në fshat shko nga pylli.', 'detour', 'Duhet të marrësh një rrugë tjetër', 'route', 'Nga pylli'],
  ['10', 'route-notice', 'directions', 'bridge', 'Mihali', 'URA HAPET VETËM PËR NJERËZIT.\nKuajt presin te mulliri.', 'limited-crossing', 'Vetëm njerëzit mund të kalojnë', 'horses', 'Te mulliri'],
  ['11', 'route-notice', 'directions', 'east-road', 'plaku i sheshit', 'KORÇË: 2 ORË\nFSHATI: 40 MINUTA\nBURIMI: 10 MINUTA', 'travel-times', 'Koha e rrugës për tri vende', 'nearest', 'Burimi'],
  ['12', 'route-notice', 'directions', 'river-crossing', 'Mihali', 'MOS KALO LUMIN NË MBRËMJE.\nUra e madhe është e hapur.', 'safety-route', 'Duhet të kalosh nga ura e madhe', 'safe-crossing', 'Ura e madhe'],
  ['13', 'invitation', 'social-event', 'Elira-house', 'Elira', 'Eja për darkë nesër në orën shtatë, në shtëpinë time. Sill vetëm një gotë.', 'dinner-invite', 'Ka darkë te Elira nesër', 'bring', 'Një gotë'],
  ['14', 'invitation', 'social-event', 'village-square', 'Elira', 'Nesër ka festë te ura. Ushqimi është gati në orën një.', 'bridge-celebration', 'Fshati ka festë te ura', 'food-time', 'Në orën një'],
  ['15', 'invitation', 'social-event', 'inn', 'bujtinari', 'Eja nesër për çaj në odën e madhe. Thuaj po ose jo para mbrëmjes.', 'tea-invite', 'Në bujtinë ka çaj nesër', 'reply-deadline', 'Para mbrëmjes'],
  ['16', 'invitation', 'social-event', 'healer-garden', 'shëruesi', 'Nesër shkojmë pranë burimit. Eja herët dhe merr ujë me vete.', 'spring-walk', 'Shëruesi do të shkojë te burimi me njerëzit', 'bring', 'Ujë'],
  ['17', 'personal-letter', 'news', 'inn', 'Mihali', 'E dashur Elira, isha në qytet. Rruga ishte e gjatë, por pa shi. Kthehem pas tri ditësh dhe sjell ilaçin.', 'travel-news', 'Mihali tregon për rrugën e tij', 'return', 'Pas tri ditësh'],
  ['18', 'personal-letter', 'news', 'Elira-house', 'Elira', 'Përshëndetje, sot punoj te ura me Mihalin. Nuk vij për bukë. Takohemi në bujtinë sonte. — Elira', 'changed-plan', 'Elira nuk vjen për bukë', 'meeting', 'Në bujtinë'],
  ['19', 'personal-letter', 'news', 'healer-house', 'shëruesi', 'Elira, faleminderit për ujin. Fëmija është mirë tani. Na duhet edhe një batanije për natën.', 'health-update', 'Fëmija është mirë tani', 'need', 'Një batanije'],
  ['20', 'personal-letter', 'news', 'inn', 'bujtinari', 'Motra ime, jam në punë. Jam i lodhur, por puna shkon mirë. Vij të të shoh pas tri ditësh.', 'work-news', 'Ai është i lodhur nga puna', 'return', 'Pas tri ditësh'],
  ['21', 'appointment-note', 'appointment', 'healer-house', 'shëruesi', 'MIHALI\nNESËR, ORA 10\nSILL FASHË DHE ILAÇ', 'healer-visit', 'Takimi me shëruesin është nesër', 'bring', 'Fashë dhe ilaç'],
  ['22', 'appointment-note', 'appointment', 'village-square', 'Elira', 'TAKIM ME ELIRËN\nSOT, ORA 4\nTE PUSI, JO TE URA', 'meeting-change', 'Takimi me Elirën është sot', 'place', 'Te pusi'],
  ['23', 'appointment-note', 'appointment', 'bridge-worksite', 'Mihali', 'PUNA TE URA\nNESËR PAS MËNGJESIT\nMERR ÇEKIÇIN DHE LITARIN', 'work-appointment', 'Puna te ura është nesër', 'tools', 'Çekiçin dhe litarin'],
  ['24', 'appointment-note', 'appointment', 'inn-yard', 'plaku i sheshit', 'MIHALI VJEN NESËR NË MESDITË.\nGJËRAT JANË NË BUJTINË.', 'arrival', 'Mihali vjen nesër', 'pickup-place', 'Në bujtinë'],
]

const A2_READING_DETAIL_DESIGN = {
  '01': ['How much does breakfast cost?', 'price'],
  '02': ['How much does dinner cost?', 'price'],
  '03': ['Where must the key be left?', 'place'],
  '04': ['When is the small room available?', 'time'],
  '05': ['Which listed item costs least?', 'item'],
  '06': ['Which item arrives tomorrow?', 'item'],
  '07': ['How many water bottles are needed?', 'quantity'],
  '08': ['Where should the reader go after noon?', 'place'],
  '09': ['Which route leads to the village?', 'route'],
  '10': ['Where must the horses wait?', 'place'],
  '11': ['Which destination is nearest?', 'destination'],
  '12': ['Which crossing remains open?', 'crossing'],
  '13': ['What should the guest bring?', 'item'],
  '14': ['At what time is the food ready?', 'time'],
  '15': ['When should the guest reply?', 'time'],
  '16': ['What should the guest bring?', 'item'],
  '17': ['After how many days will Mihali return?', 'time'],
  '18': ['Where will Elira meet you?', 'place'],
  '19': ['Which additional item is needed?', 'item'],
  '20': ['When will the writer visit?', 'time'],
  '21': ['What should Mihali bring?', 'item-pair'],
  '22': ['Where is the meeting with Elira?', 'place'],
  '23': ['Which tools are needed at the bridge?', 'item-pair'],
  '24': ['Where are Mihali’s things waiting?', 'place'],
}

const A2_READING_EXTRA_CHOICES = {
  price: ['Tridhjetë lekë', 'Dyzet lekë', 'Njëqind lekë'],
  place: ['Te dera', 'Te ura', 'Te pusi', 'Te mulliri', 'Në treg', 'Në bujtinë'],
  time: ['Në mëngjes', 'Në mesditë', 'Në mbrëmje', 'Në orën një', 'Në orën gjashtë', 'Pas tri ditësh'],
  item: ['Bukë', 'Ujë', 'Kripa', 'Sapuni', 'Një gotë', 'Një batanije'],
  quantity: ['Një shishe', 'Dy shishe', 'Tri shishe'],
  route: ['Nga pylli', 'Nga ura e madhe', 'Nga mulliri'],
  crossing: ['Ura e madhe', 'Ura e vjetër', 'Lumi'],
  destination: ['Burimi', 'Fshati', 'Korçë'],
  'item-pair': ['Fashë dhe ilaç', 'Çekiçin dhe litarin', 'Bukë dhe ujë'],
}

const readingDetailCandidates = (category) => [
  ...A2_READING_ROWS.filter((row) => A2_READING_DETAIL_DESIGN[row[0]][1] === category).map((row) => row[9]),
  ...(A2_READING_EXTRA_CHOICES[category] || []),
]

const A2_READING_DATA = A2_READING_ROWS.map(([number, textType, topic, location, npc, textSq, gistId, gistLabel, detailId, detailLabel]) => reading({
  id: `a2-unseen-reading-${number}`, level: 'A2', textType, topic, location, npc, textSq,
  questions: [
    question('gist', 'gist', 'What is the main message of this text?', plausibleChoiceSet(gistId, gistLabel, gistCandidates(A2_READING_ROWS, textType), Number(number)), gistId, [`gist:${gistId}`], { choiceCategory: `message:${textType}`, distractorPolicy: 'same-text-type-peer' }),
    question('detail', 'detail', A2_READING_DETAIL_DESIGN[number][0], plausibleChoiceSet(detailId, detailLabel, readingDetailCandidates(A2_READING_DETAIL_DESIGN[number][1]), Number(number)), detailId, [`detail:${detailId}`], { choiceCategory: A2_READING_DETAIL_DESIGN[number][1], distractorPolicy: 'same-semantic-category' }),
  ],
}))

const A2_PERFORMANCE = [
  performance({ id: 'a2-live-dialogue-01', familyId: 'a2-live-dialogue', level: 'A2', mode: 'spokenInteraction', topic: 'purchase', location: 'market', npc: 'tregtari', speaker: 'trader', stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Sa shishe ujë kërkon sot?', afterConcept: 'item-and-quantity', followUpSq: 'Kam vetëm dy. A janë mirë?', supportiveTwist: 'limited-stock' }] }, prompt: 'Complete the purchase and respond to the stock problem.', requirements: [requirement('order', 'Request a quantity of water bottles.', ['purchase:item-and-quantity']), requirement('response', 'Accept the amount or ask for an alternative.', ['purchase:resolve-limited-stock']), requirement('politeness', 'Use a polite turn.', ['social:politeness'])], response: { kind: 'recorded-dialogue', minimumTurns: 4, maximumTurns: 6, replayOwnAudio: true }, focus: 'Resolve an ordinary purchase when stock changes.', criticalEvidence: ['item and quantity', 'response to limited stock', 'politeness'] }),
  performance({ id: 'a2-live-dialogue-02', familyId: 'a2-live-dialogue', level: 'A2', mode: 'spokenInteraction', topic: 'room-request', location: 'inn', npc: 'bujtinari', speaker: 'innkeeper', stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Çfarë dhome të duhet?', afterConcept: 'room-needs', followUpSq: 'Dhoma e qetë nuk ka ujë të ngrohtë. Çfarë zgjedh?', supportiveTwist: 'trade-off' }] }, prompt: 'Explain your room needs and choose between the two options.', requirements: [requirement('needs', 'State room and duration needs.', ['lodging:room-duration']), requirement('priority', 'Explain which feature matters.', ['lodging:priority']), requirement('decision', 'Choose and confirm a room.', ['lodging:decision'])], response: { kind: 'recorded-dialogue', minimumTurns: 4, maximumTurns: 6, replayOwnAudio: true }, focus: 'Negotiate a simple room request with one trade-off.', criticalEvidence: ['room need', 'priority', 'decision'] }),
  performance({ id: 'a2-live-dialogue-03', familyId: 'a2-live-dialogue', level: 'A2', mode: 'spokenInteraction', topic: 'directions', location: 'forked-road', npc: 'plaku i udhës', speaker: 'traveller', stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Si shkoj te shëruesi?', afterConcept: 'route', followUpSq: 'A kaloj nga ura?', supportiveTwist: 'clarify-route' }] }, prompt: 'Give a short route and clarify whether the traveller uses the bridge.', requirements: [requirement('route', 'Give at least two route steps.', ['directions:two-steps']), requirement('landmark', 'Name one landmark.', ['directions:landmark']), requirement('clarification', 'Answer the bridge question directly.', ['directions:bridge-yes-no'])], response: { kind: 'recorded-dialogue', minimumTurns: 4, maximumTurns: 6, replayOwnAudio: true }, focus: 'Give and clarify usable directions.', criticalEvidence: ['two route steps', 'landmark', 'clarification'] }),
  performance({ id: 'a2-live-dialogue-04', familyId: 'a2-live-dialogue', level: 'A2', mode: 'spokenInteraction', topic: 'healer-visit', location: 'healer-house', npc: 'shëruesi', speaker: 'healer', stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Ku të dhemb?', afterConcept: 'symptoms', followUpSq: 'Kur filloi? Merr një lugë ilaç pas darkës.', supportiveTwist: 'time-of-onset-and-instruction' }] }, prompt: 'Describe the problem, say when it began, and check the instruction.', requirements: [requirement('symptoms', 'Describe at least two simple symptoms.', ['health:two-symptoms']), requirement('onset', 'Say when they began.', ['health:onset']), requirement('check', 'Repeat or clarify one instruction.', ['repair:check-instruction'])], response: { kind: 'recorded-dialogue', minimumTurns: 4, maximumTurns: 6, replayOwnAudio: true }, focus: 'Handle a routine healer visit and verify advice.', criticalEvidence: ['symptoms', 'time of onset', 'instruction check'] }),
  performance({ id: 'a2-live-dialogue-05', familyId: 'a2-live-dialogue', level: 'A2', mode: 'spokenInteraction', topic: 'invitation', location: 'Elira-house', npc: 'Elira', speaker: 'elira', stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'A vjen për darkë sonte?', afterConcept: 'accept-or-decline', followUpSq: 'A vjen me bukë ose ujë?', supportiveTwist: 'contribution' }] }, prompt: 'Accept or decline with a reason, then answer the request.', requirements: [requirement('decision', 'Accept or decline clearly.', ['invitation:decision']), requirement('reason', 'Give a simple reason.', ['invitation:reason']), requirement('contribution', 'Offer or decline one contribution.', ['invitation:contribution'])], response: { kind: 'recorded-dialogue', minimumTurns: 4, maximumTurns: 6, replayOwnAudio: true }, focus: 'Respond to an invitation and negotiate a contribution.', criticalEvidence: ['decision', 'reason', 'contribution'] }),
  performance({ id: 'a2-live-dialogue-06', familyId: 'a2-live-dialogue', level: 'A2', mode: 'spokenInteraction', topic: 'changed-meeting', location: 'village-square', npc: 'Elira', speaker: 'elira', stimulus: { kind: 'branching-dialogue', turns: [{ speakerSq: 'Nuk mund të vij në orën katër. Kur je i lirë?', afterConcept: 'new-time', followUpSq: 'Sheshi do të jetë plot. Ku takohemi?', supportiveTwist: 'new-place' }] }, prompt: 'Move the meeting to a workable time and place.', requirements: [requirement('time', 'Suggest a new time.', ['meeting:new-time']), requirement('place', 'Suggest a new place.', ['meeting:new-place']), requirement('confirm', 'Confirm the final arrangement.', ['meeting:confirmation'])], response: { kind: 'recorded-dialogue', minimumTurns: 4, maximumTurns: 6, replayOwnAudio: true }, focus: 'Renegotiate a changed meeting and confirm the final arrangement.', criticalEvidence: ['new time', 'new place', 'confirmation'] }),
  performance({ id: 'a2-spoken-portrait-01', familyId: 'a2-spoken-portrait', level: 'A2', mode: 'spokenProduction', topic: 'family-home-routine', location: 'inn-supper', npc: 'plaku i sheshit', stimulus: { kind: 'fresh-topic-card', cues: ['family or people you live with', 'your home', 'a normal morning and evening'] }, prompt: 'Speak to the guests for about one minute.', requirements: [requirement('people', 'Describe family or household.', ['portrait:people']), requirement('home', 'Describe living conditions.', ['portrait:home']), requirement('routine', 'Give at least three routine actions.', ['portrait:routine-series']), requirement('connectors', 'Link ideas with simple connectors.', ['cohesion:basic-connectors'], ['dhe', 'por', 'sepse'])], response: { kind: 'recorded-monologue', minimumSeconds: 45, targetSeconds: 60, maximumSeconds: 75, replayOwnAudio: true }, focus: 'Give a connected description of home, people and routine.', criticalEvidence: ['people', 'home', 'routine series', 'connectors'] }),
  performance({ id: 'a2-spoken-portrait-02', familyId: 'a2-spoken-portrait', level: 'A2', mode: 'spokenProduction', topic: 'work-and-craft', location: 'bridge-worksite', npc: 'Mihali', stimulus: { kind: 'fresh-topic-card', cues: ['work or a learned skill', 'tools or place', 'what you do first and next', 'why it matters'] }, prompt: 'Explain your work or a skill to Mihali.', requirements: [requirement('work', 'Name work or a learned skill.', ['portrait:work-or-skill']), requirement('series', 'Describe a short sequence.', ['portrait:work-series']), requirement('reason', 'Give one simple reason.', ['reason:simple'])], response: { kind: 'recorded-monologue', minimumSeconds: 45, targetSeconds: 60, maximumSeconds: 75, replayOwnAudio: true }, focus: 'Describe work or a craft as a connected series.', criticalEvidence: ['work or skill', 'sequence', 'reason'] }),
  performance({ id: 'a2-spoken-portrait-03', familyId: 'a2-spoken-portrait', level: 'A2', mode: 'spokenProduction', topic: 'recent-journey', location: 'inn-supper', npc: 'Elira', stimulus: { kind: 'fresh-topic-card', cues: ['where you went', 'what the road or weather was like', 'one event', 'what you will do next'] }, prompt: 'Tell Elira about a recent journey and your next plan.', requirements: [requirement('past', 'Describe the recent journey or event.', ['time:past-event']), requirement('conditions', 'Mention road or weather conditions.', ['journey:conditions']), requirement('next', 'State a next plan.', ['time:next-plan']), requirement('connectors', 'Connect the sequence.', ['cohesion:basic-connectors'], ['dhe', 'por', 'sepse', 'pastaj'])], response: { kind: 'recorded-monologue', minimumSeconds: 45, targetSeconds: 60, maximumSeconds: 75, replayOwnAudio: true }, focus: 'Connect a recent event, present result and next plan.', criticalEvidence: ['past event', 'conditions', 'next plan'] }),
  performance({ id: 'a2-written-exchange-01', familyId: 'a2-written-exchange', level: 'A2', mode: 'writtenInteraction', topic: 'news-and-feelings', location: 'courier-board', npc: 'Elira', stimulus: { kind: 'incoming-note', textSq: 'Isha në qytet, por nuk e kam çantën time. Jam mirë. Si jeni ju?' }, prompt: 'Reply with concern, local news and one practical offer.', requirements: [requirement('feeling', 'Respond to the news with an appropriate feeling.', ['social:concern']), requirement('news', 'Give one piece of local news.', ['exchange:local-news']), requirement('offer', 'Offer one practical action.', ['help:offer'])], response: { kind: 'free-text-exchange', minimumWords: 25, requiredTurns: 1 }, focus: 'Respond to news and offer useful help.', criticalEvidence: ['response to feeling', 'local news', 'offer'] }),
  performance({ id: 'a2-written-exchange-02', familyId: 'a2-written-exchange', level: 'A2', mode: 'writtenInteraction', topic: 'apology', location: 'inn', npc: 'bujtinari', stimulus: { kind: 'incoming-note', textSq: 'Të prita te dera e dhomës, por nuk erdhe.' }, prompt: 'Apologise, give a reason and propose a new time.', requirements: [requirement('apology', 'Apologise clearly.', ['social:apology'], ['Më fal.', 'Më vjen keq.']), requirement('reason', 'Give a reason.', ['reason:absence']), requirement('new-time', 'Suggest a new time.', ['meeting:new-time'])], response: { kind: 'free-text-exchange', minimumWords: 25, requiredTurns: 1 }, focus: 'Repair a missed arrangement in writing.', criticalEvidence: ['apology', 'reason', 'new time'] }),
  performance({ id: 'a2-written-exchange-03', familyId: 'a2-written-exchange', level: 'A2', mode: 'writtenInteraction', topic: 'need-and-reply', location: 'healer-house', npc: 'shëruesi', stimulus: { kind: 'incoming-note', textSq: 'Më duhen ujë i pastër dhe një fashë para mbrëmjes. A mund të më ndihmosh?' }, prompt: 'Answer what you can do, what you cannot do, and when you will arrive.', requirements: [requirement('accept', 'Accept at least one part.', ['help:accepted-part']), requirement('limit', 'State one limit or problem.', ['help:limit']), requirement('arrival', 'Give an arrival time.', ['time:arrival'])], response: { kind: 'free-text-exchange', minimumWords: 25, requiredTurns: 1 }, focus: 'Negotiate a practical request in writing.', criticalEvidence: ['accepted task', 'limit', 'arrival time'] }),
  performance({ id: 'a2-written-exchange-04', familyId: 'a2-written-exchange', level: 'A2', mode: 'writtenInteraction', topic: 'changed-plan', location: 'courier-board', npc: 'Elira', stimulus: { kind: 'incoming-note', textSq: 'Takimi te ura nuk bëhet dot. A je i lirë nesër?' }, prompt: 'Propose a new place and time, ask for confirmation, then answer a short follow-up.', requirements: [requirement('place', 'Propose a new meeting place.', ['meeting:new-place']), requirement('time', 'Propose a new time.', ['meeting:new-time']), requirement('confirm', 'Ask for confirmation.', ['meeting:request-confirmation']), requirement('follow-up', 'Respond to the generated acceptance or counter-offer.', ['meeting:responsive-turn'])], response: { kind: 'free-text-exchange', minimumWords: 25, requiredTurns: 2 }, focus: 'Conduct a responsive two-turn meeting arrangement.', criticalEvidence: ['new place', 'new time', 'confirmation', 'responsive second turn'] }),
  performance({ id: 'a2-free-writing-01', familyId: 'a2-free-writing', level: 'A2', mode: 'writtenProduction', topic: 'road-account', location: 'inn', npc: 'Elira', stimulus: { kind: 'scene-prompt', cues: ['what happened on the road', 'where you are now', 'the present problem', 'what you will do next'] }, prompt: 'Write Elira a connected account of 50–80 words.', requirements: [requirement('past', 'Describe a past road event.', ['account:past-event']), requirement('present', 'Describe the current situation.', ['account:present-state']), requirement('problem', 'Explain one problem.', ['account:problem']), requirement('next', 'State a next action.', ['account:next-action']), requirement('links', 'Use at least two basic connectors.', ['cohesion:two-connectors'], ['dhe', 'por', 'sepse', 'pastaj'])], response: { kind: 'free-text', minimumWords: 50, maximumWords: 80, minimumSentences: 5 }, focus: 'Write a connected past-present-next journey account.', criticalEvidence: ['past event', 'present state', 'problem', 'next action', 'connectors'] }),
  performance({ id: 'a2-free-writing-02', familyId: 'a2-free-writing', level: 'A2', mode: 'writtenProduction', topic: 'inn-problem', location: 'inn-guest-room', npc: 'bujtinari', stimulus: { kind: 'scene-prompt', cues: ['what was wrong last night', 'how it affects you now', 'what solution you want', 'when it should happen'] }, prompt: 'Write the innkeeper a clear 50–80 word note.', requirements: [requirement('past-problem', 'Describe what was wrong.', ['lodging:past-problem']), requirement('effect', 'State the present effect or feeling.', ['lodging:present-effect']), requirement('solution', 'Request a reasonable solution.', ['lodging:solution']), requirement('time', 'Give a useful time.', ['time:requested-action']), requirement('links', 'Use simple connectors.', ['cohesion:two-connectors'], ['dhe', 'por', 'sepse'])], response: { kind: 'free-text', minimumWords: 50, maximumWords: 80, minimumSentences: 5 }, focus: 'Explain a lodging problem and request a solution.', criticalEvidence: ['problem', 'effect', 'solution', 'time', 'connectors'] }),
  performance({ id: 'a2-free-writing-03', familyId: 'a2-free-writing', level: 'A2', mode: 'writtenProduction', topic: 'village-day', location: 'courier-board', npc: 'Elira', stimulus: { kind: 'scene-prompt', cues: ['morning work', 'one person you met', 'weather or place', 'evening plan and reason'] }, prompt: 'Write Elira a 50–80 word account of your village day.', requirements: [requirement('routine', 'Describe at least two actions in order.', ['account:action-series']), requirement('person', 'Mention one person and interaction.', ['account:person-interaction']), requirement('setting', 'Mention weather or place.', ['account:setting']), requirement('plan', 'Give an evening plan and reason.', ['account:plan-and-reason']), requirement('links', 'Use simple connectors.', ['cohesion:two-connectors'], ['dhe', 'por', 'sepse', 'pastaj'])], response: { kind: 'free-text', minimumWords: 50, maximumWords: 80, minimumSentences: 5 }, focus: 'Write a connected everyday account with a reasoned plan.', criticalEvidence: ['action sequence', 'person', 'setting', 'plan and reason'] }),
  performance({ id: 'a2-practical-relay-01', familyId: 'a2-practical-relay', level: 'A2', mode: 'mediation', topic: 'healer-instruction', location: 'healer-house', npc: 'Elira', stimulus: { kind: 'source-and-collaboration', sourceSq: 'Jepi fëmijës një lugë ilaç pas darkës. Nëse fëmija nuk është mirë në mëngjes, ejani përsëri këtu.', listenerNeed: 'Elira heard only the first words and asks what matters.' }, prompt: 'Relay the main instruction, then agree on who will return if needed.', requirements: [requirement('dose', 'Relay the dose and time.', ['care:dose-after-dinner'], ['Një lugë pas darkës.']), requirement('condition', 'Relay the condition for returning.', ['care:return-if-unwell']), requirement('agreement', 'Agree who will act.', ['collaboration:responsibility'])], response: { kind: 'relay-and-reply', minimumTurns: 2 }, focus: 'Relay a healer’s main instruction and agree on responsibility.', criticalEvidence: ['dose and time', 'return condition', 'responsibility'] }),
  performance({ id: 'a2-practical-relay-02', familyId: 'a2-practical-relay', level: 'A2', mode: 'mediation', topic: 'road-warning', location: 'bridge', npc: 'Elira', stimulus: { kind: 'source-and-collaboration', sourceSq: 'Ura mbyllet për kuajt deri nesër. Njerëzit kalojnë një nga një në këmbë.', listenerNeed: 'Elira is holding the horse and cannot read the notice.' }, prompt: 'Tell Elira what is possible and decide how you will cross.', requirements: [requirement('main-point', 'Relay the restriction for horses.', ['road:horses-closed-until-tomorrow']), requirement('exception', 'Relay how people may cross.', ['road:pedestrians-north-one-by-one']), requirement('decision', 'Agree on a safe next step.', ['collaboration:crossing-plan'])], response: { kind: 'relay-and-reply', minimumTurns: 2 }, focus: 'Relay a route restriction and collaborate on a safe plan.', criticalEvidence: ['horse restriction', 'people-on-foot exception', 'safe plan'] }),
  performance({ id: 'a2-practical-relay-03', familyId: 'a2-practical-relay', level: 'A2', mode: 'mediation', topic: 'market-announcement', location: 'village-square', npc: 'bujtinari', stimulus: { kind: 'source-and-collaboration', sourceSq: 'Sot bie shi, dhe tregu mbyllet në mesditë. Gjërat për bujtinë janë te Elira. Shko te Elira para orës dhjetë.', listenerNeed: 'The innkeeper is serving guests and asks for the important part.' }, prompt: 'Relay the deadline and agree who will collect the goods.', requirements: [requirement('change', 'Relay the early market closing.', ['market:closes-noon']), requirement('deadline', 'Relay the collection deadline and place.', ['market:collect-before-ten']), requirement('agreement', 'Agree who will collect the goods.', ['collaboration:collector'])], response: { kind: 'relay-and-reply', minimumTurns: 2 }, focus: 'Relay a changed market plan and assign the practical action.', criticalEvidence: ['closing change', 'collection deadline and place', 'collector'] }),
  performance({ id: 'a2-practical-relay-04', familyId: 'a2-practical-relay', level: 'A2', mode: 'mediation', topic: 'changed-meeting', location: 'village-square', npc: 'plaku i sheshit', stimulus: { kind: 'source-and-collaboration', sourceSq: 'Elira nuk vjen dot sonte. Ajo do të vijë nesër në orën nëntë te pusi. Thuaji po ose jo para darkës.', listenerNeed: 'The old man in the square asks what Elira changed and what reply to send.' }, prompt: 'Relay the new arrangement and decide what reply to send.', requirements: [requirement('change', 'Relay that tonight is cancelled.', ['meeting:tonight-cancelled']), requirement('proposal', 'Relay the new time and place.', ['meeting:tomorrow-nine-well']), requirement('deadline', 'Relay the reply deadline.', ['meeting:reply-before-dinner']), requirement('reply', 'Agree on an acceptance or counter-offer.', ['collaboration:meeting-reply'])], response: { kind: 'relay-and-reply', minimumTurns: 2 }, focus: 'Relay a changed meeting and collaborate on the reply.', criticalEvidence: ['cancellation', 'new time and place', 'reply deadline', 'joint reply'] }),
]

const PERFORMANCE_BY_ID = Object.fromEntries([...A1_PERFORMANCE, ...A2_PERFORMANCE]
  .map((task) => [task.id, task]))
const reserve = (baseId, id, topic, location, npc, stimulus, prompt, overrides = {}) => {
  const base = PERFORMANCE_BY_ID[baseId]
  const {
    focus = base.rubric.focus,
    criticalEvidence = base.rubric.criticalEvidence,
    ...recordOverrides
  } = overrides
  return {
    ...base,
    ...recordOverrides,
    id,
    reserveOf: baseId,
    topic,
    storyAnchor: anchor(location, npc, `Reserve held-out form: ${prompt}`),
    stimulus,
    prompt,
    rubric: performanceRubric(focus, criticalEvidence),
  }
}

// Enough independent forms remain after formative misses for every
// performance mode to reach its non-compensatory gate.
const CEFR_RESERVE_PERFORMANCE = [
  reserve('a1-spoken-portrait-01', 'a1-spoken-portrait-03', 'self-and-home', 'fshatiJeta', 'Elira', { kind: 'visual-prompt', cues: ['your name', 'where you are from', 'where you live now'] }, 'Leave Elira a short spoken introduction about yourself and home.'),
  reserve('a1-spoken-portrait-02', 'a1-spoken-portrait-04', 'person-and-place', 'fshatiSheshi', 'Elira', { kind: 'visual-prompt', cues: ['one familiar person', 'your relationship', 'one fact'] }, 'Tell Elira about someone she may meet.'),
  reserve('a1-written-exchange-03', 'a1-written-exchange-04', 'simple-plan', 'fshatiSheshi', 'Elira', { kind: 'incoming-note', textSq: 'Jam në shesh tani. Ku je ti?' }, 'Reply with your place, a meeting place and a polite closing.'),
  reserve('a1-free-writing-01', 'a1-free-writing-03', 'guest-note', 'fshatiJeta', 'Elira', { kind: 'scene-prompt', cues: ['introduce yourself', 'a familiar person', 'where you are', 'one need'] }, 'Write at least three simple sentences for Elira.'),
  reserve('a1-free-writing-02', 'a1-free-writing-04', 'market-plan', 'fshatiSheshi', 'Elira', { kind: 'scene-prompt', cues: ['where you are going', 'two things you need', 'when you will return'] }, 'Write a short three-sentence note before you go.'),
  reserve('a1-simple-relay-03', 'a1-simple-relay-04', 'direction', 'forked-road', 'plaku i udhës', { kind: 'source-and-listener', sourceSq: 'FSHATI: DJATHTAS', listenerNeed: 'The old wayfarer asks which road the sign shows.' }, 'Tell the old wayfarer which way leads to the village.', {
    requirements: [requirement('direction', 'Relay the direction on the sign.', ['direction:right'])],
    focus: 'Relay one visible direction to another character.',
    criticalEvidence: ['direction to the village'],
  }),
  reserve('a2-spoken-portrait-01', 'a2-spoken-portrait-04', 'market-household', 'market', 'tregtari', { kind: 'fresh-topic-card', cues: ['people in your household', 'your home', 'a normal morning and evening', 'simple connectors'] }, 'Describe your household and routine in a short connected talk.'),
  reserve('a2-spoken-portrait-02', 'a2-spoken-portrait-05', 'inn-work', 'inn-supper', 'plaku i sheshit', { kind: 'fresh-topic-card', cues: ['work or a learned skill', 'the place or tools', 'what comes first and next', 'why it matters'] }, 'Explain a useful kind of work to the inn guests.'),
  reserve('a2-spoken-portrait-03', 'a2-spoken-portrait-06', 'recent-journey', 'healer-house', 'shëruesi', { kind: 'fresh-topic-card', cues: ['a recent journey', 'the road or weather', 'one event', 'your next plan'] }, 'Give the healer a short account of a recent journey.'),
  reserve('a2-written-exchange-03', 'a2-written-exchange-05', 'market-help', 'market', 'tregtari', { kind: 'incoming-note', textSq: 'Jam në treg dhe nuk mund të vij. Më duhen ujë i pastër dhe një fashë. A mund të më ndihmosh?' }, 'Reply with what you can do, one limit and a time.'),
  reserve('a2-written-exchange-04', 'a2-written-exchange-06', 'changed-plan', 'Elira-house', 'Elira', { kind: 'incoming-note', textSq: 'Sonte nuk mund të takohemi te ura. Ku dhe kur takohemi?' }, 'Propose a new place and time, ask for confirmation, then answer the reply.'),
  reserve('a2-free-writing-01', 'a2-free-writing-04', 'road-account', 'market', 'tregtari', { kind: 'scene-prompt', cues: ['a past road event', 'where you are now', 'a present problem', 'your next action'] }, 'Write a connected 50–80 word journey account.'),
  reserve('a2-free-writing-02', 'a2-free-writing-05', 'inn-problem', 'village-square', 'Elira', { kind: 'scene-prompt', cues: ['a problem last night', 'how it affects you now', 'the solution you want', 'when you need it'] }, 'Write a connected 50–80 word lodging request.'),
  reserve('a2-free-writing-03', 'a2-free-writing-06', 'village-day', 'healer-house', 'shëruesi', { kind: 'scene-prompt', cues: ['two actions in order', 'a person you met', 'the weather or place', 'an evening plan and reason'] }, 'Write a connected 50–80 word account of a village day.'),
  reserve('a2-practical-relay-03', 'a2-practical-relay-05', 'lodging-note', 'inn', 'bujtinari', { kind: 'source-and-collaboration', sourceSq: 'DHOMA ËSHTË E LIRË PAS ORËS GJASHTË. ÇELËSI ËSHTË TE DERA.', listenerNeed: 'The innkeeper asks you and Elira to repeat the room facts and choose who takes the key.' }, 'Relay both facts and agree who will collect the key.', {
    requirements: [
      requirement('time', 'Relay when the room is ready.', ['lodging:ready-after-six']),
      requirement('place', 'Relay where the key is.', ['lodging:key-at-door']),
      requirement('agreement', 'Agree who will collect the key.', ['collaboration:key-collector']),
    ],
    focus: 'Relay two lodging facts and agree who takes the key.',
    criticalEvidence: ['room time', 'key place', 'collector'],
  }),
  reserve('a2-practical-relay-04', 'a2-practical-relay-06', 'weather-plan', 'village-square', 'plaku i sheshit', { kind: 'source-and-collaboration', sourceSq: 'SONTE BIE SHI. TAKIMI ËSHTË NESËR NË MËNGJES TE PUSI.', listenerNeed: 'The old man in the square asks what changed and what reply to send.' }, 'Relay the weather and new meeting, then agree on a reply.', {
    requirements: [
      requirement('weather', 'Relay tonight’s weather.', ['weather:rain-tonight']),
      requirement('meeting', 'Relay the new meeting time and place.', ['meeting:tomorrow-morning-well']),
      requirement('reply', 'Agree on an acceptance or counter-offer.', ['collaboration:meeting-reply']),
    ],
    focus: 'Relay the weather and replacement meeting, then agree on a reply.',
    criticalEvidence: ['weather', 'new meeting', 'joint reply'],
  }),
]

export const CEFR_TASKS = deepFreeze([
  ...A1_LISTENING,
  ...A1_READING,
  ...A1_PERFORMANCE,
  ...A2_LISTENING_DATA,
  ...A2_READING_DATA,
  ...A2_PERFORMANCE,
  ...CEFR_RESERVE_PERFORMANCE,
])

export const CEFR_TASKS_BY_FAMILY = deepFreeze(Object.fromEntries(
  [...new Set(CEFR_TASKS.map(({ familyId }) => familyId))]
    .map((familyId) => [familyId, CEFR_TASKS.filter((task) => task.familyId === familyId)]),
))

export const CEFR_AUTHORED_TASK_COUNTS = deepFreeze(Object.fromEntries(
  Object.entries(CEFR_TASKS_BY_FAMILY).map(([familyId, tasks]) => [familyId, tasks.length]),
))

export function cefrTasksFor({ level, familyId, mode } = {}) {
  return CEFR_TASKS.filter((task) =>
    (!level || task.level === level) &&
    (!familyId || task.familyId === familyId) &&
    (!mode || task.mode === mode))
}
