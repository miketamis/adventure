// Public editorial review for common conversational Albanian whose meaning or
// social force is easy to flatten in a bare word list. These records contain
// independently authored surfaces only; private conversations are never a
// runtime source or build dependency.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const COLLOQUIAL_TRAIN_POLICIES = Object.freeze({
  PRODUCTIVE: 'productive',
  CONTEXTUAL: 'contextual',
  STORY_ONLY: 'story-only',
})

export const COLLOQUIAL_REGISTERS = Object.freeze({
  EVERYDAY_STANDARD: 'everyday-standard',
  INFORMAL: 'informal-colloquial',
  REGIONAL: 'regional-colloquial',
  COARSE: 'coarse-colloquial',
})

export const COLLOQUIAL_PROSODY = Object.freeze({
  STABLE: 'stable',
  SENSITIVE: 'intonation-sensitive',
})

export const COLLOQUIAL_MEANING_MODES = Object.freeze({
  LITERAL: 'literal',
  IDIOMATIC: 'idiomatic',
  HYPERBOLIC: 'hyperbolic',
})

export const COLLOQUIAL_EARLY_HUB_MINIMUM = 2

const PRODUCTIVE = COLLOQUIAL_TRAIN_POLICIES.PRODUCTIVE
const CONTEXTUAL = COLLOQUIAL_TRAIN_POLICIES.CONTEXTUAL
const STORY_ONLY = COLLOQUIAL_TRAIN_POLICIES.STORY_ONLY
const STANDARD = COLLOQUIAL_REGISTERS.EVERYDAY_STANDARD
const INFORMAL = COLLOQUIAL_REGISTERS.INFORMAL
const REGIONAL = COLLOQUIAL_REGISTERS.REGIONAL
const COARSE = COLLOQUIAL_REGISTERS.COARSE
const STABLE = COLLOQUIAL_PROSODY.STABLE
const SENSITIVE = COLLOQUIAL_PROSODY.SENSITIVE
const LITERAL = COLLOQUIAL_MEANING_MODES.LITERAL
const IDIOMATIC = COLLOQUIAL_MEANING_MODES.IDIOMATIC
const HYPERBOLIC = COLLOQUIAL_MEANING_MODES.HYPERBOLIC

const review = ({
  id,
  al,
  en,
  register = INFORMAL,
  tone = 'neutral',
  prosody = STABLE,
  meaningMode = LITERAL,
  trainPolicy = CONTEXTUAL,
  dictionaryIds,
  focalSenseIds = dictionaryIds,
  contextSenseIds = [],
  blockedProductiveSenseIds = [],
  blockedStandaloneForms = [],
  phraseIds = [],
  groundingNodeIds,
  usageNote,
}) => ({
  id,
  al,
  en,
  register,
  tone,
  prosody,
  meaningMode,
  trainPolicy,
  dictionaryIds,
  focalSenseIds,
  contextSenseIds,
  blockedProductiveSenseIds,
  blockedStandaloneForms,
  phraseIds,
  groundingNodeIds,
  usageNote,
})

// Grounding names the intended public interaction node; the audit resolves
// its live surfaces by content, without coupling the review to mutable line
// order or array indexes.
export const COLLOQUIAL_EXPRESSION_REVIEWS = deepFreeze([
  review({
    id: 'talking-nonsense', al: 'Po flet kot.', en: 'You are talking nonsense.',
    tone: 'blunt', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['po_prog', 'flet', 'kot'], focalSenseIds: ['kot'],
    phraseIds: ['talking-nonsense'], groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A blunt contradiction among people already speaking freely; it is not a polite opening with a stranger.',
  }),
  review({
    id: 'what-doing-informal', al: 'Ça po bën?', en: 'What are you doing?',
    tone: 'friendly', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['cfare', 'po_prog', 'bej'], focalSenseIds: ['cfare'],
    blockedStandaloneForms: [{ id: 'cfare', al: 'ça' }],
    groundingNodeIds: ['eliraBiseda'],
    usageNote: 'Common informal shortening of çfarë; use the full form in careful or formal speech.',
  }),
  review({
    id: 'whats-up', al: "Ç'kemi?", en: 'How are things?',
    tone: 'friendly', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['ckemi'], focalSenseIds: ['ckemi'],
    phraseIds: ['whats-up-today'], groundingNodeIds: ['eliraBiseda'],
    usageNote: 'An informal social greeting for someone the speaker can address casually.',
  }),
  review({
    id: 'come-on-man', al: 'Hajt, mo.', en: 'Come on, man.',
    register: REGIONAL, tone: 'exasperated', prosody: SENSITIVE, trainPolicy: STORY_ONLY,
    dictionaryIds: ['hajde', 'mo_discourse'], focalSenseIds: ['mo_discourse'],
    blockedProductiveSenseIds: ['mo_discourse'], blockedStandaloneForms: [{ id: 'hajde', al: 'hajt' }],
    groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A familiar clipped appeal whose warmth or irritation depends strongly on voice and relationship.',
  }),
  review({
    id: 'well-go-on', al: 'Hë, hë.', en: 'Well, go on.',
    tone: 'prompting', prosody: SENSITIVE, trainPolicy: STORY_ONLY,
    dictionaryIds: ['he_repeated'], focalSenseIds: ['he_repeated'], blockedProductiveSenseIds: ['he_repeated'],
    groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'The repeated interjection can encourage, doubt, or hurry someone; the intended reading here depends on delivery.',
  }),
  review({
    id: 'what-happened', al: 'Çfarë ndodhi?', en: 'What happened?',
    register: STANDARD, tone: 'concerned', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['cfare', 'ndodh'], focalSenseIds: ['cfare', 'ndodh'],
    phraseIds: ['what-happened-short'], groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A neutral everyday request for an account of a completed event.',
  }),
  review({
    id: 'who-knows', al: 'Kushedi.', en: 'Who knows.',
    tone: 'uncertain', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['kushedi'], focalSenseIds: ['kushedi'], contextSenseIds: ['kushedi'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'Signals uncertainty rather than a literal request to identify a person who knows.',
  }),
  review({
    id: 'supposedly', al: 'Gjoja.', en: 'Supposedly.',
    tone: 'skeptical', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['gjoja'], focalSenseIds: ['gjoja'], contextSenseIds: ['gjoja'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'Marks a claim as doubtful, merely alleged, or pretended; it needs a surrounding claim to identify that stance.',
  }),
  review({
    id: 'leave-it', al: 'Lëre.', en: 'Leave it.',
    tone: 'firm', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['le'], focalSenseIds: ['le'],
    phraseIds: ['leave-it-completely'], groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A direct informal command whose object must already be clear from the situation.',
  }),
  review({
    id: 'leave-it-completely', al: 'Lëre fare.', en: 'Forget it.',
    tone: 'exasperated', meaningMode: IDIOMATIC, trainPolicy: PRODUCTIVE,
    dictionaryIds: ['le', 'fare'], focalSenseIds: ['le', 'fare'],
    phraseIds: ['leave-it-completely'], groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A firm dismissal of the matter, stronger than the literal instruction to leave an object in place.',
  }),
  review({
    id: 'seriously-question', al: 'Seriozisht?', en: 'Seriously?',
    tone: 'surprised', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['seriozisht'], focalSenseIds: ['seriozisht'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A common reaction asking whether the preceding claim is genuinely meant.',
  }),
  review({
    id: 'normal-response', al: 'Normal!', en: 'Of course!',
    tone: 'assured', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['normal_response'], focalSenseIds: ['normal_response'], contextSenseIds: ['normal_response'],
    groundingNodeIds: ['vajzaKroiBiseda'],
    usageNote: 'A conversational response meaning that the answer is obvious or expected, not the adjective describing normality.',
  }),
  review({
    id: 'exactly-fiks', al: 'fiks', en: 'exactly',
    tone: 'precise', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['fiks'], focalSenseIds: ['fiks'], contextSenseIds: ['fiks'],
    phraseIds: ['breakfast-exact'], groundingNodeIds: ['bujtinariBiseda'],
    usageNote: 'An informal exact confirmation, grounded here by a specific time rather than taught as a bare synonym list.',
  }),
  review({
    id: 'forget-the-whole-thing', al: 'Vari leshtë.', en: 'Forget the whole thing.',
    register: COARSE, tone: 'rude', meaningMode: IDIOMATIC, trainPolicy: STORY_ONLY,
    dictionaryIds: ['vari_leshte'], focalSenseIds: ['vari_leshte'], blockedProductiveSenseIds: ['vari_leshte'],
    groundingNodeIds: ['kafeneja2'],
    usageNote: 'A coarse dismissive euphemism; recognise its force, but do not present it as a safe phrase for the learner to produce.',
  }),
  review({
    id: 'like-we-care', al: 'Na plasi.', en: 'Like we care.',
    register: COARSE, tone: 'sarcastic-dismissal', meaningMode: IDIOMATIC, trainPolicy: STORY_ONLY,
    dictionaryIds: ['na_plasi'], focalSenseIds: ['na_plasi'], blockedProductiveSenseIds: ['na_plasi'],
    groundingNodeIds: ['kafeneja2'],
    usageNote: 'A sarcastic dismissal that can sound openly contemptuous; it belongs to recognition in a clearly characterised exchange.',
  }),
  review({
    id: 'died-laughing', al: 'Vdiqa së qeshuri.', en: 'I died laughing.',
    tone: 'amused', meaningMode: HYPERBOLIC, trainPolicy: STORY_ONLY,
    dictionaryIds: ['vdiqa_hyperbole'], focalSenseIds: ['vdiqa_hyperbole'], blockedProductiveSenseIds: ['vdiqa_hyperbole'],
    groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A comic exaggeration in this scene, not a literal report of death and not beginner-safe independent production.',
  }),
  review({
    id: 'went-crazy', al: 'U çmenda.', en: 'I lost my mind.',
    tone: 'overwhelmed', meaningMode: HYPERBOLIC, trainPolicy: STORY_ONLY,
    dictionaryIds: ['u_cmenda_hyperbole'], focalSenseIds: ['u_cmenda_hyperbole'], blockedProductiveSenseIds: ['u_cmenda_hyperbole'],
    groundingNodeIds: ['kafeneja2'],
    usageNote: 'An emotional exaggeration in this scene, not a literal diagnosis and not a neutral phrase to prompt from English.',
  }),
  review({
    id: 'stop-bothering-me', al: 'Mos më ça kokën.', en: 'Stop bothering me.',
    register: COARSE, tone: 'rude', meaningMode: IDIOMATIC, trainPolicy: STORY_ONLY,
    dictionaryIds: ['mos_me_ca_koken'], focalSenseIds: ['mos_me_ca_koken'], blockedProductiveSenseIds: ['mos_me_ca_koken'],
    groundingNodeIds: ['kafeneja2'],
    usageNote: 'A rude idiom telling someone to stop pestering the speaker; recognition must not be mistaken for a polite request.',
  }),
  review({
    id: 'no-problem', al: "S'ka gjë.", en: 'No problem.',
    tone: 'reassuring', meaningMode: IDIOMATIC, trainPolicy: CONTEXTUAL,
    dictionaryIds: ['ka', 'gje'], focalSenseIds: ['ka', 'gje'],
    groundingNodeIds: ['bariuBiseda'],
    usageNote: 'A reassuring response in context; the contraction is more useful as a complete social chunk than as isolated pieces.',
  }),
  review({
    id: 'what-do-you-mean', al: 'Çfarë do të thuash?', en: 'What do you mean?',
    tone: 'clarifying', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['cfare', 'do', 'te_subj', 'thote'], focalSenseIds: ['cfare', 'thote'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A neutral request for clarification when the preceding statement is unclear.',
  }),
  review({
    id: 'meaning-clarification', al: 'Si domethënë?', en: 'What do you mean?',
    tone: 'clarifying', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['si', 'domethene'], focalSenseIds: ['domethene'], contextSenseIds: ['domethene'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A compact conversational repair whose function is clear only after another speaker has said something puzzling.',
  }),
  review({
    id: 'wait-a-moment', al: 'Prit pak.', en: 'Wait a moment.',
    tone: 'neutral', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['prit', 'pak'], focalSenseIds: ['prit', 'pak'],
    phraseIds: ['wait-have-question'], groundingNodeIds: ['eliraBiseda'],
    usageNote: 'A direct but ordinary request for a short pause; të lutem can soften it further.',
  }),
  review({
    id: 'dont-worry', al: 'Mos u shqetëso.', en: "Don't worry.",
    tone: 'reassuring', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['mos', 'shqetesohem'], focalSenseIds: ['shqetesohem'],
    blockedStandaloneForms: [{ id: 'shqetesohem', al: 'u shqetëso' }],
    groundingNodeIds: ['eliraBiseda'],
    usageNote: 'A reassuring negative command learned as a whole situation; its reflexive fragment is not a standalone word answer.',
  }),
  review({
    id: 'you-are-right', al: 'Ke të drejtë.', en: "You're right.",
    tone: 'agreeing', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['ke', 'drejte'], focalSenseIds: ['drejte'],
    phraseIds: ['agree-help'], groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A common explicit agreement with another speaker before deciding what to do next.',
  }),
  review({
    id: 'why-not', al: 'Pse jo?', en: 'Why not?',
    tone: 'agreeing', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['pse', 'jo'], focalSenseIds: ['pse', 'jo'],
    groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A willing or curious response in this context, not a literal request for a hidden negative reason.',
  }),
  review({
    id: 'well-all-right', al: 'Epo mirë.', en: 'Well, all right.',
    tone: 'reluctant-agreement', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['epo', 'mire'], focalSenseIds: ['epo', 'mire'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A discourse-led acceptance that can sound willing or reluctant depending on the preceding proposal.',
  }),
  review({
    id: 'anyway-nevermind', al: 'Nejse.', en: 'Anyway.',
    tone: 'topic-closing', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['nejse'], focalSenseIds: ['nejse'],
    groundingNodeIds: ['eliraBiseda'],
    usageNote: 'Closes or redirects the current topic rather than adding a cause, result, or exact confirmation.',
  }),
  review({
    id: 'yes-exactly', al: 'Po pra.', en: 'Yes, exactly.',
    tone: 'confirming', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['po_yes', 'pra'], focalSenseIds: ['pra'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'Confirms a conclusion already reached in the exchange; pra gets its force from what the other speaker has just understood.',
  }),
  review({
    id: 'there-you-are', al: 'Ja pra.', en: 'There you are.',
    tone: 'presenting', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['ja', 'pra'], focalSenseIds: ['ja', 'pra'],
    groundingNodeIds: ['bujtinariBiseda'],
    usageNote: 'Draws attention to the place or answer just indicated; without that visible referent it is too open-ended for productive recall.',
  }),
  review({
    id: 'really-mean-it', al: 'Me gjithë mend?', en: 'Seriously?',
    tone: 'surprised', meaningMode: IDIOMATIC, trainPolicy: PRODUCTIVE,
    dictionaryIds: ['me', 'gjithe', 'mend'], focalSenseIds: ['mend'],
    phraseIds: ['really-mean-it'], groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A safe request to confirm that a surprising claim is genuinely meant, taught as a complete expression rather than word by word.',
  }),
  review({
    id: 'just-joking', al: 'Po bëj shaka.', en: 'I am joking.',
    tone: 'playful', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['po_prog', 'bej', 'shaka'], focalSenseIds: ['shaka'],
    phraseIds: ['just-joking'], groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'A useful, non-hostile way to identify a playful remark and repair the exchange before teasing is taken literally.',
  }),
  review({
    id: 'understand-now', al: 'Tani e kuptova.', en: 'Now I understand.',
    tone: 'acknowledging', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['tani', 'e_obj', 'kuptoj'], focalSenseIds: ['kuptoj'],
    phraseIds: ['understand-now'], groundingNodeIds: ['sheshiPlak'],
    usageNote: 'Closes a successful explanation or repetition by acknowledging that the previously unclear point is now understood.',
  }),
  review({
    id: 'no-worries-reassurance', al: 'Pa merak.', en: 'No worries.',
    tone: 'reassuring', meaningMode: IDIOMATIC, trainPolicy: PRODUCTIVE,
    dictionaryIds: ['pa', 'merak'], focalSenseIds: ['merak'], contextSenseIds: ['merak'],
    phraseIds: ['no-worries'], groundingNodeIds: ['bujtinariBiseda'],
    usageNote: 'A warm reassurance that the listener need not worry, taught as a complete social response rather than a literal preposition-and-noun gloss.',
  }),
  review({
    id: 'thank-goodness', al: 'Shyqyr.', en: 'Thank goodness.',
    tone: 'relieved', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['shyqyr'], focalSenseIds: ['shyqyr'], contextSenseIds: ['shyqyr'],
    phraseIds: ['thank-goodness-water-returned'], groundingNodeIds: ['sheshiPlak'],
    usageNote: 'Expresses relief after a welcome outcome; the longer reviewed phrase supplies that outcome instead of prompting the interjection in isolation.',
  }),
  review({
    id: 'emotional-appeal', al: 'Aman!', en: 'Please!',
    tone: 'exasperated-appeal', prosody: SENSITIVE, trainPolicy: STORY_ONLY,
    dictionaryIds: ['aman_appeal'], focalSenseIds: ['aman_appeal'], blockedProductiveSenseIds: ['aman_appeal'],
    groundingNodeIds: ['dordolecBiseda'],
    usageNote: 'An emotional appeal whose warmth, pleading, or irritation depends on voice and relationship, so it remains receptive story language.',
  }),
  review({
    id: 'emotional-reaction', al: 'Obobo!', en: 'Oh no!',
    tone: 'dismayed', prosody: SENSITIVE, trainPolicy: STORY_ONLY,
    dictionaryIds: ['obobo'], focalSenseIds: ['obobo'], blockedProductiveSenseIds: ['obobo'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'A strong reaction that can signal dismay or amazement according to delivery; this scene fixes one reading without making it a production target.',
  }),
  review({
    id: 'enough-now', al: 'Boll më.', en: 'Enough now.',
    tone: 'firm', trainPolicy: CONTEXTUAL,
    dictionaryIds: ['boll', 'me_more'], focalSenseIds: ['boll'], contextSenseIds: ['boll'],
    groundingNodeIds: ['kafeneja2'],
    usageNote: 'Ends an action or topic firmly in a familiar exchange; the reviewed context teaches boll without presenting the abrupt whole line as a neutral opening.',
  }),
  review({
    id: 'all-right-repeated', al: 'Mirë, mirë.', en: 'All right, all right.',
    tone: 'impatient-acknowledgement', prosody: SENSITIVE, trainPolicy: STORY_ONLY,
    dictionaryIds: ['mire'], focalSenseIds: ['mire'],
    groundingNodeIds: ['sheshiPlak'],
    usageNote: 'The repetition may reassure, concede, or show impatience depending on delivery, so it remains a receptive story cue rather than a production target.',
  }),
  review({
    id: 'certainly', al: 'Patjetër.', en: 'Of course.',
    register: STANDARD, tone: 'welcoming', trainPolicy: PRODUCTIVE,
    dictionaryIds: ['patjeter'], focalSenseIds: ['patjeter'],
    groundingNodeIds: ['dasmaBiseda'],
    usageNote: 'A safe affirmative response showing ready agreement; as a single word it belongs in lexical practice rather than a phrase-construction exercise.',
  }),
])
