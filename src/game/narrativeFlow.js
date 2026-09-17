// Reviewed cases where two consecutive choices formerly acted like a single
// “continue” corridor at one place. Every production record here is a positive
// agency restoration; the release audit separately owns any narrow waiver.
export const REVIEWED_NARRATIVE_CORRIDORS = Object.freeze([
  Object.freeze({
    id: 'opening-social-check-in',
    nodes: ['bisedaUra1', 'bisedaUra2', 'bisedaUra3'],
    category: 'information-dialogue',
    disposition: 'agency-restored',
    agencyAt: ['bisedaUra1', 'bisedaUra2'],
    reason: 'The traveller may politely end either introductory question and return to the bridge instead of being marched through a compulsory interview.',
  }),
  Object.freeze({
    id: 'zana-two-gifts',
    nodes: ['zanaQumesht', 'zanaKripe', 'zanaFole'],
    category: 'reward-collection',
    disposition: 'agency-restored',
    agencyAt: ['zanaQumesht', 'zanaKripe'],
    reason: 'Milk and salt are separate offered gifts; the traveller may accept or leave each one, and the inventory consequence records that decision.',
  }),
  Object.freeze({
    id: 'tomor-sword-and-warning',
    nodes: ['tomor2', 'tomorBekim', 'tomor3'],
    category: 'reward-and-information',
    disposition: 'agency-restored',
    agencyAt: ['tomor2', 'tomorBekim'],
    reason: 'The traveller may leave the sword and may descend without asking for Tomorr’s fuller warning; neither reward nor exposition is a compulsory click corridor.',
  }),
  Object.freeze({
    id: 'beauty-rescue-and-first-reveal',
    nodes: ['bukura1', 'bukuraLirim', 'bukuraThellesi'],
    category: 'rescue-and-information',
    disposition: 'agency-restored',
    agencyAt: ['bukura1', 'bukuraLirim'],
    reason: 'The traveller chooses whether to attempt the rescue and, after cutting the iron, whether to stay for the captive’s explanation or flee the underworld.',
  }),
  Object.freeze({
    id: 'beauty-warning-to-battle',
    nodes: ['bukuraThellesi', 'bukura2', 'kulshedra1'],
    category: 'information-to-combat',
    disposition: 'agency-restored',
    agencyAt: ['bukuraThellesi'],
    reason: 'After learning the danger, the traveller may flee instead of being forced from explanation into the Kulshedra encounter.',
  }),
  Object.freeze({
    id: 'tomor-warning-and-descent',
    nodes: ['tomorBekim', 'tomor3', 'tomorZbritje'],
    category: 'information-and-travel',
    disposition: 'agency-restored',
    agencyAt: ['tomorBekim'],
    reason: 'The traveller chooses between hearing the detailed many-headed warning and beginning the explicitly narrated descent immediately.',
  }),
  Object.freeze({
    id: 'beauty-rescue-dialogue-run',
    nodes: ['bukuraLirim', 'bukuraThellesi', 'bukura2'],
    category: 'information-dialogue',
    disposition: 'agency-restored',
    agencyAt: ['bukuraLirim', 'bukuraThellesi'],
    reason: 'Both dialogue boundaries let the traveller abandon the dangerous underworld rescue; the character reveal is never a compulsory sequence of continue buttons.',
  }),
  Object.freeze({
    id: 'elira-errand-turn-in-and-follow',
    nodes: ['eliraBanore', 'eliraPorosiaDorezuar', 'sofraMikut'],
    category: 'transaction-and-travel',
    disposition: 'agency-restored',
    agencyAt: ['eliraPorosiaDorezuar'],
    reason: 'Handing Elira the requested food resolves in the village square; afterward the traveller may accompany her to the guest-room or remain in the square instead of being moved by the hand-in action.',
  }),
  Object.freeze({
    id: 'market-answer-and-departure',
    nodes: ['porosiaBlerje', 'porosiaBlerjePergjigje', 'pusiThate'],
    category: 'information-dialogue',
    disposition: 'agency-restored',
    agencyAt: ['porosiaBlerjePergjigje'],
    reason: 'Answering the child about the purchased food resolves at the market; afterward the traveller may leave for the square or remain at the market instead of being relocated by the spoken answer.',
  }),
])

// Ordinary service and social results restore agency immediately. The audit
// derives these categories from canonical option effects (money, healing,
// quest and transfer semantics) and accepts explicit `ordinaryResultCategory`
// metadata for dialogue/information boundaries that have no mechanical effect.
// The release audit owns the narrow exception contract for an indivisible
// physical beat; endings are outside this result-category contract by design.
export const ORDINARY_RESULT_CATEGORIES = Object.freeze({
  SHOPPING: 'shopping',
  DIALOGUE: 'dialogue',
  INFORMATION: 'information',
  REWARD: 'reward',
  TASK: 'task',
  HEALING: 'healing',
  LODGING: 'lodging',
  GIFT: 'gift',
})

// Result screens do not create a second vocabulary puzzle merely to leave the
// completed beat. These reviews are deliberately separate from the corridor
// reviews below: each record pins the exact incoming result, category, and
// complete set of genuine ungated continuations. Adding, removing, gating, or
// redirecting an option invalidates the record instead of silently widening it.
export const REVIEWED_UNGATED_RESULT_CHOICES = Object.freeze([
  Object.freeze({
    id: 'bread-alms-result-keeps-square-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.GIFT,
    sourceNode: 'sheshi',
    resultNode: 'lemoshaBuke',
    rationale: 'Giving away the loaf has already completed its vocabulary-gated action; the player must then be free either to cross the same square to the trader or remain where the grateful man is eating.',
    evidence: 'The result visibly shows the man eating the given bread at the square, while its two continuations remain ordinary same-square positioning choices with distinct destinations.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the bread gift, square location, trader route, stay route, or either destination changes',
    options: Object.freeze([
      Object.freeze({ to: 'tregtari', purpose: 'travel' }),
      Object.freeze({ to: 'sheshi', purpose: 'stay' }),
    ]),
  }),
  Object.freeze({
    id: 'bread-purchase-result-keeps-market-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.SHOPPING,
    sourceNode: 'tregtari',
    resultNode: 'blerjaBuke',
    rationale: 'The loaf purchase is already complete and charged before this screen; staying at the stall or stepping back into the square are ordinary post-transaction choices, not another test of the bought noun.',
    evidence: 'The result joins the exact bread payment to the acquired loaf and the trader’s thanks, then offers only the trader and square routes from that same market stall.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the bread transaction, trader location, square exit, option count, or either destination changes',
    options: Object.freeze([
      Object.freeze({ to: 'tregtari', purpose: 'stay' }),
      Object.freeze({ to: 'sheshi', purpose: 'return' }),
    ]),
  }),
  Object.freeze({
    id: 'salt-purchase-result-keeps-market-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.SHOPPING,
    sourceNode: 'tregtari',
    resultNode: 'blerjaKripe',
    rationale: 'The salt purchase is already complete and charged before this screen; staying at the stall or stepping back into the square are ordinary post-transaction choices, not another test of the bought noun.',
    evidence: 'The result joins the exact salt payment to the acquired salt and the trader’s thanks, then offers only the trader and square routes from that same market stall.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the salt transaction, trader location, square exit, option count, or either destination changes',
    options: Object.freeze([
      Object.freeze({ to: 'tregtari', purpose: 'stay' }),
      Object.freeze({ to: 'sheshi', purpose: 'return' }),
    ]),
  }),
  Object.freeze({
    id: 'lahuta-purchase-result-keeps-shop-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.SHOPPING,
    sourceNode: 'tregtari2',
    resultNode: 'blerjaLahuta',
    rationale: 'Buying the lahuta has already resolved the expensive shop action; browsing the remaining practical goods or leaving for the square are the next independent choices and must not depend on rediscovering the purchase.',
    evidence: 'The result joins the exact lahuta payment to the instrument and the trader’s invitation to sing, then offers the shop shelf and square as two consequence-distinct destinations.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the lahuta transaction, practical-goods shelf, square exit, option count, or either destination changes',
    options: Object.freeze([
      Object.freeze({ to: 'sendetDites', purpose: 'browse' }),
      Object.freeze({ to: 'sheshi', purpose: 'return' }),
    ]),
  }),
  Object.freeze({
    id: 'inn-night-result-keeps-morning-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.LODGING,
    sourceNode: 'bujtina',
    resultNode: 'gjumiBujtina',
    rationale: 'The paid sleep has already advanced the clock and restored health; at dawn the player may accept the coffee visibly being made or leave for the square without another reveal gate trapping the morning exit.',
    evidence: 'The result visibly establishes dawn in the room and the woman making coffee, while the two exact continuations either accept that offered drink or return to the city square.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the paid night no longer ends at dawn, coffee is not visibly offered, or either continuation changes',
    options: Object.freeze([
      Object.freeze({ to: 'kafeja1', purpose: 'accept' }),
      Object.freeze({ to: 'sheshi', purpose: 'return' }),
    ]),
  }),
  Object.freeze({
    id: 'healing-result-keeps-clinic-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.HEALING,
    sourceNode: 'kopshtiBar',
    resultNode: 'sherimiBar',
    rationale: 'Taking the paid medicine has already completed the healing action; staying with the healer for further care or returning to the square are ordinary next movements and should not be hidden behind the remedy just consumed.',
    evidence: 'The result visibly names the healer, medicine, spoon, and recovery before offering exactly one same-clinic return and one route back to the square.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the medicine no longer heals here, the healer or square route changes, or the result gains another option',
    options: Object.freeze([
      Object.freeze({ to: 'sheruesi', purpose: 'stay' }),
      Object.freeze({ to: 'sheshi', purpose: 'return' }),
    ]),
  }),
  Object.freeze({
    id: 'serpent-offering-result-keeps-house-agency-visible',
    rule: 'ungated-result-agency',
    category: ORDINARY_RESULT_CATEGORIES.HEALING,
    sourceNode: 'vatra',
    resultNode: 'vatraGjarpri',
    rationale: 'Giving the serpent milk has already consumed the gift and resolved the healing consequence; the player may then remain beside the hearth or step back into the adjoining family room without repeating that gate.',
    evidence: 'The result visibly shows the serpent drinking the milk at the hearth and names the house before offering exactly the hearth and family-room destinations.',
    owner: 'narrative-flow',
    reviewTrigger: 'when the milk offering, hearth location, adjoining room, healing consequence, or either continuation changes',
    options: Object.freeze([
      Object.freeze({ to: 'vatra', purpose: 'stay' }),
      Object.freeze({ to: 'fshatiJeta', purpose: 'return' }),
    ]),
  }),
])

// These decision points deliberately keep every real response visible. They
// are agency boundaries, not sentence-reveal puzzles: hiding the refusal,
// escape, descent or request-to-listen would turn a choice back into a forced
// corridor. Destinations and purposes are pinned so the review cannot survive
// an unrelated rewrite of the options it is meant to justify.
export const REVIEWED_UNGATED_AGENCY_CHOICES = Object.freeze({
  bisedaUra1: Object.freeze({
    corridors: ['opening-social-check-in'],
    options: Object.freeze([
      Object.freeze({ to: 'bisedaUra2', purpose: 'answer' }),
      Object.freeze({ to: 'start', purpose: 'exit' }),
    ]),
    reason: 'The first human exchange must let the learner answer the greeting or politely end the conversation; the exit cannot depend on decoding the answer it declines.',
  }),
  bisedaUra2: Object.freeze({
    corridors: ['opening-social-check-in'],
    options: Object.freeze([
      Object.freeze({ to: 'bisedaUra3', purpose: 'answer' }),
      Object.freeze({ to: 'start', purpose: 'exit' }),
    ]),
    reason: 'The destination question must preserve a real reply and a polite exit, so declining the conversation remains available instead of becoming hidden progression.',
  }),
  zanaQumesht: Object.freeze({
    corridors: ['zana-two-gifts'],
    options: Object.freeze([
      Object.freeze({ to: 'zanaKripe', purpose: 'accept' }),
      Object.freeze({ to: 'zanaKripe', purpose: 'decline' }),
    ]),
    reason: 'Milk is an offered gift with a real inventory consequence; taking it and explicitly declining it must remain equally available acts of agency.',
  }),
  zanaKripe: Object.freeze({
    corridors: ['zana-two-gifts'],
    options: Object.freeze([
      Object.freeze({ to: 'zanaKripe', purpose: 'accept' }),
      Object.freeze({ to: 'zanaKripe', purpose: 'decline' }),
      Object.freeze({ to: 'zanaFole', purpose: 'travel' }),
      Object.freeze({ to: 'zana1', purpose: 'exit' }),
    ]),
    reason: 'Salt is a separate offered gift, so accepting or declining resolves in place; only afterward does the traveller independently choose whether to climb with the Zana or turn back.',
  }),
  tomor2: Object.freeze({
    corridors: ['tomor-sword-and-warning'],
    options: Object.freeze([
      Object.freeze({ to: 'tomorBekim', purpose: 'accept' }),
      Object.freeze({ to: 'tomorBekim', purpose: 'decline' }),
    ]),
    reason: 'Tomorr offers the sword rather than imposing it; both accepting the weapon and leaving it behind must remain visible before the warning continues.',
  }),
  bukura1: Object.freeze({
    corridors: ['beauty-rescue-and-first-reveal'],
    options: Object.freeze([
      Object.freeze({ to: 'bukuraLirim', purpose: 'rescue' }),
      Object.freeze({ to: 'humbur', purpose: 'flee' }),
    ]),
    reason: 'Meeting the captive is the rescue commitment: the traveller must be able to attempt the rescue or flee the underworld before taking that risk.',
  }),
  bukuraThellesi: Object.freeze({
    corridors: ['beauty-warning-to-battle', 'beauty-rescue-dialogue-run'],
    options: Object.freeze([
      Object.freeze({ to: 'bukura2', purpose: 'listen' }),
      Object.freeze({ to: 'humbur', purpose: 'flee' }),
    ]),
    reason: 'After the captive identifies herself, listening to the dangerous explanation is optional; fleeing remains a visible alternative before the battle route.',
  }),
  tomorBekim: Object.freeze({
    corridors: ['tomor-sword-and-warning', 'tomor-warning-and-descent'],
    options: Object.freeze([
      Object.freeze({ to: 'tomor3', purpose: 'listen' }),
      Object.freeze({ to: 'tomorZbritje', purpose: 'descend' }),
    ]),
    reason: 'The traveller may listen for Tomorr’s fuller warning or begin the physical descent immediately; exposition is useful but never a compulsory click.',
  }),
  bukuraLirim: Object.freeze({
    corridors: ['beauty-rescue-and-first-reveal', 'beauty-rescue-dialogue-run'],
    options: Object.freeze([
      Object.freeze({ to: 'bukuraThellesi', purpose: 'listen' }),
      Object.freeze({ to: 'humbur', purpose: 'flee' }),
    ]),
    reason: 'Freeing the captive does not trap the traveller in dialogue: listening to her story and fleeing the underworld remain visible, distinct choices.',
  }),
  eliraPorosiaDorezuar: Object.freeze({
    corridors: ['elira-errand-turn-in-and-follow'],
    options: Object.freeze([
      Object.freeze({ to: 'sofraMikut', purpose: 'travel' }),
      Object.freeze({ to: 'fshatiSheshi', purpose: 'stay' }),
    ]),
    reason: 'The completed delivery must leave both physical intentions visible: the traveller may deliberately follow Elira to the guest-room or stay in the square and continue exploring the open world.',
  }),
  porosiaBlerjePergjigje: Object.freeze({
    corridors: ['market-answer-and-departure'],
    options: Object.freeze([
      Object.freeze({ to: 'pusiThate', purpose: 'exit' }),
      Object.freeze({ to: 'pazariFshatit', purpose: 'stay' }),
    ]),
    reason: 'Once the child has answered, leaving for the well and staying at the market are equally immediate navigation intentions; neither should be hidden behind decoding unrelated response prose or forced by the conversation.',
  }),
})
