// Reviewed cases where two consecutive choices formerly acted like a single
// “continue” corridor at one place. Most now restore a meaningful decision at
// the named node(s). A continuous-beat exception is deliberately rare and must
// describe why stopping between the two actions would be less coherent.
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
    id: 'kulshedra-finishing-blow',
    nodes: ['kulshLufte2', 'fitorja', 'springReturn'],
    category: 'combat-resolution',
    disposition: 'continuous-beat',
    reason: 'Cutting the final head, seeing the Kulshedra fall and watching the released water run are one immediate physical consequence; an unrelated action cannot plausibly intervene between blow and result.',
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
      Object.freeze({ to: 'zanaFole', purpose: 'accept' }),
      Object.freeze({ to: 'zanaFole', purpose: 'decline' }),
    ]),
    reason: 'Salt is a separate offered gift, so the learner must be free to accept or decline it without a reveal gate silently deciding what enters the inventory.',
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
})
