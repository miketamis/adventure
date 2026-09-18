// Story validation + depth stats. Run: node scripts/storystats.mjs
import { STORY, START_NODE, DICT, DEFS, ITEMS, lineOf, moneyOutcomeLinesOf } from '../src/game/content.js'
import { RICH_ENDING_BY_ID } from '../src/game/endingCatalog.js'
import { CONVERSATION_HUBS } from '../src/game/conversationHub.js'
import { GROUNDED_DIRECTION_CONTRACTS } from '../src/game/groundedDirections.js'
import {
  ORDINARY_RESULT_CATEGORIES,
  REVIEWED_UNGATED_AGENCY_CHOICES,
  REVIEWED_UNGATED_RESULT_CHOICES,
} from '../src/game/narrativeFlow.js'
import {
  authoredStoryConfusers,
  confuserLegibility,
  confuserPrerequisiteSenseIds,
  storyConfuserCandidates,
} from '../src/game/storyConfusers.js'
import {
  auditExceptionClaimKey,
  auditExceptionRegistryIssues,
  auditExceptionTargetsFor,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './lib/audit-exceptions.mjs'
import { proveOrdinaryTalePauses } from './lib/tale-pause-affordance-tests.mjs'

const nodes = STORY
const ids = Object.keys(nodes)
const endings = ids.filter((id) => nodes[id].end)

// ---- link integrity ---------------------------------------------------------
const edges = (id) => (nodes[id].options || []).filter((o) => o.to).map((o) => o.to)
const deadLinks = []
for (const id of ids) for (const to of edges(id)) if (!nodes[to]) deadLinks.push(`${id} -> ${to}`)

// ---- reachability (follow every real edge; gates are satisfiable) -----------
const reachable = new Set([START_NODE])
const stack = [START_NODE]
while (stack.length) {
  const id = stack.pop()
  for (const to of edges(id)) if (nodes[to] && !reachable.has(to)) { reachable.add(to); stack.push(to) }
}
const unreachable = ids.filter((id) => !reachable.has(id))
const deadEnds = ids.filter((id) => !nodes[id].end && edges(id).length === 0)

// ---- vocabulary coverage ----------------------------------------------------
const usedSenses = new Set()
const missingDict = new Set()
const collect = (toks) => { for (const t of toks || []) if (t.id) { usedSenses.add(t.id); if (!DICT[t.id]) missingDict.add(t.id) } }
for (const id of ids) {
  for (const e of nodes[id].text) collect(lineOf(e))
  for (const o of nodes[id].options) {
    collect(o.text)
    for (const outcome of moneyOutcomeLinesOf(o)) collect(outcome)
  }
}
for (const it of Object.values(ITEMS)) if (it.use) collect(it.use.phrase)
const missingDefs = [...usedSenses].filter((s) => !DEFS[s])

// ---- confuser coverage (non-ending nodes with no confuser option) -----------
const noConfuser = ids.filter((id) => !nodes[id].end && !(nodes[id].options || []).some((o) => o.confuser))

// ---- depth: shortest path (steps) from start to each node -------------------
const dist = { [START_NODE]: 0 }
const q = [START_NODE]
while (q.length) {
  const id = q.shift()
  for (const to of edges(id)) if (nodes[to] && dist[to] === undefined) { dist[to] = dist[id] + 1; q.push(to) }
}
const endingDepths = endings.map((id) => dist[id]).filter((d) => d !== undefined).sort((a, b) => a - b)
const avg = endingDepths.length ? (endingDepths.reduce((a, b) => a + b, 0) / endingDepths.length) : 0
const median = endingDepths.length ? endingDepths[Math.floor(endingDepths.length / 2)] : 0

// This is an open-world anthology: a mill shift or roadside haunting is
// intentionally shorter than an embodied epic. Short depth is therefore a
// review trigger, not an invitation to pad folklore. Every non-bad endpoint at
// the three-step floor needs an explicit structural reason and still needs a
// substantive ending (>=2 lines and >=30 words of explanatory blurb).
const compactNonBad = endings.filter((id) => nodes[id].end !== 'bad' && dist[id] <= 3)
const compactEndingException = (nodeId, rationale) => ({
  id: `compact-ending-${nodeId.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`,
  rule: 'non-bad-ending-below-depth-floor',
  targets: [nodeId],
  rationale,
  evidence: `STORY.${nodeId} is a reachable non-bad ending at depth ${dist[nodeId]}; storystats also requires at least two lines and a 30-word ending blurb.`,
  owner: 'story-editorial',
  reviewTrigger: `Re-review whenever STORY.${nodeId}, its incoming route depth, ending type, prose, or ending blurb changes.`,
  scope: { kind: 'exact-targets', maximumTargets: 1 },
})
const COMPACT_ENDING_EXCEPTIONS = defineAuditExceptionRegistry({
  rules: {
    'non-bad-ending-below-depth-floor': { targetKind: 'story ending node id' },
  },
  entries: [
    compactEndingException('besaFire', 'The opening tutorial pays off one explicit promise by keeping the besa and tending the first fire; adding unrelated travel would dilute that compact choice.'),
    compactEndingException('kroiFund', 'This single-site village-spring custom resolves the exact offering made at the water; another travel beat would not deepen its local consequence.'),
    compactEndingException('mulliFund', 'This single-shift mill-work vignette completes the accepted labour and its consequence at the mill without pretending to be a longer journey.'),
    compactEndingException('shtrigaIkur', 'This time-gated roadside banishment resolves the danger established at the same clearing; extra route padding would weaken the immediate aftermath.'),
  ],
})
const reviewedCompactEndingIds = new Set(auditExceptionTargetsFor(
  COMPACT_ENDING_EXCEPTIONS,
  'non-bad-ending-below-depth-floor',
))
const unreviewedCompact = compactNonBad.filter((id) => !reviewedCompactEndingIds.has(id))
const staleCompactReviews = [...reviewedCompactEndingIds].filter((id) => !nodes[id]?.end || nodes[id].end === 'bad' || dist[id] > 3)
const abruptCompact = compactNonBad.filter((id) =>
  (nodes[id].text || []).length < 2 || String(RICH_ENDING_BY_ID[id]?.blurb || '').trim().split(/\s+/).length < 30)
const compactExceptionIssues = [
  ...auditExceptionRegistryIssues(COMPACT_ENDING_EXCEPTIONS, {
    validTargetsByRule: { 'non-bad-ending-below-depth-floor': new Set(compactNonBad) },
  }),
  ...auditExceptionUsageIssues(COMPACT_ENDING_EXCEPTIONS, new Set(compactNonBad.map((nodeId) =>
    auditExceptionClaimKey('non-bad-ending-below-depth-floor', nodeId)))),
]

// ---- deepest structural route from start ------------------------------------
// Exact longest-simple-path search is exponential on an open-world graph: each
// return route creates another permutation for the DFS. Collapse cycles into
// strongly connected components, then measure the longest weighted path in the
// resulting DAG. The SCC weights make this an honest upper bound on distinct
// scenes along one route (not a claim that every scene inside a cycle can be
// visited once in a single traversal), and keep this release audit O(V + E).
const adjacency = Object.fromEntries(ids.map((id) => [id, edges(id).filter((to) => nodes[to])]))
const reverse = Object.fromEntries(ids.map((id) => [id, []]))
for (const [from, tos] of Object.entries(adjacency)) for (const to of tos) reverse[to].push(from)

const finishOrder = []
const ordered = new Set()
function orderDfs(id) {
  if (ordered.has(id)) return
  ordered.add(id)
  for (const to of adjacency[id]) orderDfs(to)
  finishOrder.push(id)
}
for (const id of ids) orderDfs(id)

const componentOf = {}
const components = []
function componentDfs(id, componentId) {
  if (componentOf[id] !== undefined) return
  componentOf[id] = componentId
  components[componentId].push(id)
  for (const from of reverse[id]) componentDfs(from, componentId)
}
for (const id of finishOrder.reverse()) {
  if (componentOf[id] !== undefined) continue
  components.push([])
  componentDfs(id, components.length - 1)
}

const componentEdges = components.map(() => new Set())
const componentIndegree = components.map(() => 0)
for (const [from, tos] of Object.entries(adjacency)) {
  const fromComponent = componentOf[from]
  for (const to of tos) {
    const toComponent = componentOf[to]
    if (fromComponent === toComponent || componentEdges[fromComponent].has(toComponent)) continue
    componentEdges[fromComponent].add(toComponent)
    componentIndegree[toComponent] += 1
  }
}
const componentQueue = componentIndegree.flatMap((degree, id) => degree === 0 ? [id] : [])
const componentDepth = components.map(() => Number.NEGATIVE_INFINITY)
componentDepth[componentOf[START_NODE]] = components[componentOf[START_NODE]].length
for (let cursor = 0; cursor < componentQueue.length; cursor++) {
  const from = componentQueue[cursor]
  for (const to of componentEdges[from]) {
    const candidate = componentDepth[from] + components[to].length
    if (candidate > componentDepth[to]) {
      componentDepth[to] = candidate
    }
    componentIndegree[to] -= 1
    if (componentIndegree[to] === 0) componentQueue.push(to)
  }
}
const deepestComponent = componentDepth.reduce((best, depth, id) =>
  depth > componentDepth[best] ? id : best, componentOf[START_NODE])
const structuralRouteUpperBound = componentDepth[deepestComponent]
const structuralRouteEnd = components[deepestComponent].slice().sort()[0]
const reachableCycles = components.filter((component) =>
  component.length > 1 && component.some((id) => reachable.has(id))).length

// ---- sentence-gated directions (the reveal mechanic) ------------------------
const NON_NOUNS = new Set(['ti','je','ne','nje','dhe','ka','ke','mund','eshte','te_link','te_subj','te_obj','i_art','e_art','me','por','nuk','pa','ku','qe','do','per','une','jam','ose','jo','sheh','ec','fle','hap','ik','jep','pi','behet','vjen','zgjohu','rri','ndiz','ha','mbaroi','humbet','merr','kerko','gjen','kalo','shko','prit','lufto','vrit','shpeto','ngjit','zbrit','fluturo','degjo','flet','thote','ndihmo','beso','hyr','dil','thirr','hidh','kthehu','prek','vdes','bie','pre','luan','bej','mbyll','vazhdon','lind','fol','premto','madh','vogel','erret','sigurt','ri','vjeter','uritur','shpejt','qete','perseri','forte','bukur','keq','thate','lart','mire','ngadale','poshte','larg','jashte','tani','ngrohte','ftohte','ketu','brenda','bardhe','zi','shume','tjeter','nente','shtate'])
const phraseNoun = (toks) => { const n = toks.filter((t) => t.id && !NON_NOUNS.has(t.id)).map((t) => t.id); return n.length ? n[n.length - 1] : null }
const nonEnd = ids.filter((id) => !nodes[id].end)
// authored reveal gates: options that carry an explicit reveal:'<senseId>'
const revealGates = []
const brokenGates = []
for (const id of nonEnd)
  for (const o of nodes[id].options || []) {
    if (!o.reveal) continue
    revealGates.push(id)
    if (!nodes[id].text.some((e) => lineOf(e).some((t) => t.id === o.reveal)))
      brokenGates.push(`${id}: reveal '${o.reveal}' not found in node text`)
  }
const gatedNodes = [...new Set(revealGates)]

// GOAL LINT (gating is explicitly authored, so we verify the design goals here instead of in
// the engine): (1) every non-ending node keeps an UNGATED real choice or the
// proven ordinary Pause control, so leaving never requires decoding a sentence;
// (2) MOST story options gate. Pause preserves the tale rather than resolving it.
// Also flag a reveal that points at a word missing from the node (a typo, gated forever).
let totalReal = 0, gatedReal = 0, gateableTotal = 0, gateableGated = 0
const sentenceOnlyNodes = []
const ungatedOnly = []
for (const id of nonEnd) {
  const real = (nodes[id].options || []).filter((o) => !o.confuser)
  if (!real.length) continue
  const ungated = real.filter((o) => !o.reveal).length
  totalReal += real.length
  gatedReal += real.length - ungated
  if (ungated === 0) sentenceOnlyNodes.push(id)
  if (ungated === real.length && real.length > 1) ungatedOnly.push(id) // a multi-option node gating nothing
  const textIds = new Set(nodes[id].text.flatMap((e) => lineOf(e)).map((t) => t.id).filter(Boolean))
  for (const o of real) { const n = phraseNoun(o.text); if (n && textIds.has(n)) { gateableTotal++; if (o.reveal) gateableGated++ } }
}
const provenPauseNodes = proveOrdinaryTalePauses(sentenceOnlyNodes)
const noUngated = sentenceOnlyNodes.filter((id) => !provenPauseNodes.has(id))

// An ordinary result may intentionally expose all of its next routes: the
// purchase, gift, stay or cure has already been decoded and committed. Keep
// those decisions in exact structured records so a new option, destination,
// reveal gate, source edge or result category cannot inherit a broad bypass.
const ungatedResultReviewErrors = []
const ungatedResultReviewByNode = new Map()
const ungatedResultReviewIds = new Set()
const ungatedResultReviewScopes = new Set()
const ungatedResultCategories = new Set(Object.values(ORDINARY_RESULT_CATEGORIES))
const ungatedResultPurposes = new Set(['accept', 'browse', 'return', 'stay', 'travel'])
const requiredUngatedResultFields = [
  'id', 'rule', 'category', 'sourceNode', 'resultNode',
  'rationale', 'evidence', 'owner', 'reviewTrigger',
]
for (const review of REVIEWED_UNGATED_RESULT_CHOICES) {
  const label = `ungated-result review ${review?.id || '(missing id)'}`
  for (const field of requiredUngatedResultFields) {
    if (typeof review?.[field] !== 'string' || !review[field].trim()) {
      ungatedResultReviewErrors.push(`${label}: missing ${field}`)
    }
  }
  if (review?.rule !== 'ungated-result-agency') ungatedResultReviewErrors.push(`${label}: wrong rule`)
  if (!ungatedResultCategories.has(review?.category)) ungatedResultReviewErrors.push(`${label}: unknown category`)
  if ((review?.rationale || '').length < 100) ungatedResultReviewErrors.push(`${label}: rationale is not concrete enough`)
  if ((review?.evidence || '').length < 80) ungatedResultReviewErrors.push(`${label}: evidence is not concrete enough`)
  if ((review?.reviewTrigger || '').length < 50) ungatedResultReviewErrors.push(`${label}: review trigger is not concrete enough`)
  if (ungatedResultReviewIds.has(review?.id)) ungatedResultReviewErrors.push(`${label}: duplicate id`)
  ungatedResultReviewIds.add(review?.id)

  const scope = `${review?.category}:${review?.sourceNode}->${review?.resultNode}`
  if (ungatedResultReviewScopes.has(scope)) ungatedResultReviewErrors.push(`${label}: duplicate scope ${scope}`)
  ungatedResultReviewScopes.add(scope)
  if (ungatedResultReviewByNode.has(review?.resultNode)) {
    ungatedResultReviewErrors.push(`${label}: result node ${review?.resultNode} already has a review`)
  }
  ungatedResultReviewByNode.set(review?.resultNode, review)

  const source = nodes[review?.sourceNode]
  const result = nodes[review?.resultNode]
  if (!source) ungatedResultReviewErrors.push(`${label}: missing source node ${review?.sourceNode}`)
  if (!result || result.end) ungatedResultReviewErrors.push(`${label}: missing or ending result node ${review?.resultNode}`)
  const incoming = (source?.options || []).filter((option) => !option.confuser && option.to === review?.resultNode)
  if (incoming.length !== 1) ungatedResultReviewErrors.push(`${label}: exact reviewed incoming edge changed`)

  if (!Array.isArray(review?.options) || review.options.length < 2) {
    ungatedResultReviewErrors.push(`${label}: option scope must pin at least two choices`)
    continue
  }
  const liveOptions = (result?.options || []).filter((option) => !option.confuser)
  if (liveOptions.length !== review.options.length) {
    ungatedResultReviewErrors.push(`${label}: choice count grew or shrank (${liveOptions.length} != ${review.options.length})`)
  }
  review.options.forEach((expected, index) => {
    if (Object.keys(expected || {}).sort().join(',') !== 'purpose,to') {
      ungatedResultReviewErrors.push(`${label}[${index}]: review must pin only exact destination and purpose`)
    }
    if (!ungatedResultPurposes.has(expected?.purpose)) ungatedResultReviewErrors.push(`${label}[${index}]: unknown purpose`)
    const actual = liveOptions[index]
    if (!actual) return
    if (actual.reveal != null) ungatedResultReviewErrors.push(`${label}[${index}]: choice gained a reveal gate`)
    if (actual.to !== expected?.to) ungatedResultReviewErrors.push(`${label}[${index}]: destination changed`)
  })
}

// Riddle answers and mutually-exclusive resolution buttons should all remain
// visible. They are deliberately not sentence-reveal puzzles on top of the
// comprehension/state puzzle already being resolved.
const kebabNodeId = (nodeId) => nodeId.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const ungatedChoiceReview = ({ nodeId, rationale, evidence, witnesses, destinations, contract = null, owner = 'story-design' }) => Object.freeze({
  nodeId,
  rationale,
  evidence,
  witnesses: Object.freeze(witnesses),
  destinations: Object.freeze(destinations),
  contract: contract ? Object.freeze(contract) : null,
  owner,
})
const UNGATED_CHOICE_REVIEWS = Object.freeze([
  ungatedChoiceReview({
    nodeId: 'bisedaUra1',
    rationale: 'The opening social exchange must let the learner either answer the greeting or politely end the conversation; hiding the refusal would turn optional dialogue into compulsory progression.',
    evidence: 'The woman visibly asks how the traveller is, and the live choices contrast “jam mirë” with “tani jo”; they lead respectively into the next question and back to the bridge.',
    witnesses: ['jam mirë', 'tani jo'],
    destinations: ['bisedaUra2', 'start'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'bisedaUra2',
    rationale: 'A destination question is still a voluntary conversation turn, so the learner must be able to name the village or excuse themself without first unlocking either response.',
    evidence: 'The visible prompt asks “ku po shkon”, while “po shkoj në fshat” continues the exchange and “tani jo” returns to the bridge rather than faking a second answer.',
    witnesses: ['po shkoj në fshat', 'tani jo'],
    destinations: ['bisedaUra3', 'start'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'zanaQumesht',
    rationale: 'Milk is an offered physical gift with an inventory consequence, and accepting or refusing that gift must remain a genuine choice rather than a vocabulary-gated forced acceptance.',
    evidence: 'The scene says the Zana gives milk from three goats, and the opposing visible actions “merr qumësht” and “mos e merr qumështin” both continue to the salt offer.',
    witnesses: ['merr qumësht', 'mos e merr qumështin'],
    destinations: ['zanaKripe', 'zanaKripe'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'zanaKripe',
    rationale: 'This gift scene combines the salt decision with an explicit invitation and a return route; all four intentions must remain visible so inventory, travel, and refusal stay independently player-owned.',
    evidence: 'The node visibly offers “merr kripë” and “mos e merr kripën”, then separately offers “shko me zanën te foleja” and “kthehu” to distinguish the gift from departure.',
    witnesses: ['merr kripë', 'shko me zanën te foleja'],
    destinations: ['zanaKripe', 'zanaKripe', 'zanaFole', 'zana1'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'tomor2',
    rationale: 'Tomorr explicitly offers a sword whose possession changes the later danger, so taking it and declining it must remain equally visible acts instead of making acceptance the hidden default.',
    evidence: 'The scene states “Tomor jep një shpatë”; the exact responses “merr shpatë” and “mos e merr shpatën” both proceed to the warning while preserving the inventory difference.',
    witnesses: ['merr shpatë', 'mos e merr shpatën'],
    destinations: ['tomorBekim', 'tomorBekim'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'tomorBekim',
    rationale: 'After the initial warning is visible, hearing the full omen and beginning the descent are distinct information-versus-travel decisions; neither may be concealed behind the other.',
    evidence: 'Tomorr has already described the white and black rams, and the live choices “dëgjo Tomor” and “zbrit nga mali” route to the detailed warning or the physical descent.',
    witnesses: ['dëgjo Tomor', 'zbrit nga mali'],
    destinations: ['tomor3', 'tomorZbritje'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'bukura1',
    rationale: 'The captive and the Kulshedra danger are already established before the decision, so attempting the rescue and fleeing are consequence-distinct actions that must both remain immediately available.',
    evidence: 'The prose says the Kulshedra holds Bukura here, while “shpëto Bukurën” enters the iron-cutting scene and “ik shpejt” leaves for the authored bad outcome.',
    witnesses: ['shpëto Bukurën', 'ik shpejt'],
    destinations: ['bukuraLirim', 'humbur'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'bukuraLirim',
    rationale: 'Once the rescue action has visibly broken the iron, listening to the freed captive and fleeing the underworld are new voluntary decisions, not another test of the completed rescue phrase.',
    evidence: 'The result states “hekuri bie”; its exact continuations “dëgjo Bukurën” and “ik shpejt” lead to her explanation or the escape outcome from the same physical beat.',
    witnesses: ['hekuri bie', 'dëgjo Bukurën'],
    destinations: ['bukuraThellesi', 'humbur'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'bukuraThellesi',
    rationale: 'Bukura has supplied the actionable information about herself, the water, and the robe; continuing her explanation or abandoning the danger must remain an explicit player decision.',
    evidence: 'The visible account includes “kulshedra ka mua dhe ujë”, and the alternatives “dëgjo Bukurën” and “ik shpejt” lead to the next warning or the escape outcome.',
    witnesses: ['kulshedra ka mua dhe ujë', 'ik shpejt'],
    destinations: ['bukura2', 'humbur'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'kalaMengjes',
    rationale: 'At dawn the road already supplies an ordinary route to the castle, while the zero-time road inspection is an optional perception beat; neither action should be hidden behind vocabulary from the other.',
    evidence: 'The visible choices “shko në kala” and “shiko rrugën” preserve immediate onward travel and a same-place closer look at the damp dawn road before Rozafa reaches the builders.',
    witnesses: ['shko në kala', 'shiko rrugën'],
    destinations: ['kalaNgjitje', 'kalaMengjes'],
    owner: 'world-presentation',
  }),
  ungatedChoiceReview({
    nodeId: 'eliraPorosiaDorezuar',
    rationale: 'Handing over the requested bread and salt completes the errand in the square; accompanying Elira to the guest room and remaining outside are separate post-task choices.',
    evidence: 'Elira visibly receives both goods and says the room is ready, after which “shko me të në odën” travels with her while “rri në shesh” preserves the current location.',
    witnesses: ['shko me të në odën', 'rri në shesh'],
    destinations: ['sofraMikut', 'fshatiSheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'porosiaBlerjePergjigje',
    rationale: 'The child has already acknowledged the spoken answer at the market, so leaving toward the well and staying among the stalls are ordinary post-conversation movements.',
    evidence: 'The child visibly replies “mirë”, then “dil nga tregu” goes to the dry well and “rri në treg” remains in the village market with no new answer to decode.',
    witnesses: ['dil nga tregu', 'rri në treg'],
    destinations: ['pusiThate', 'pazariFshatit'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'lemoshaBuke',
    rationale: 'Giving the loaf has already completed the charitable action, so crossing the square to the trader and remaining beside the grateful man are ordinary next-position choices.',
    evidence: 'The result visibly says the man eats the bread and thanks the traveller; “shko te tregtari” and “rri në shesh” then preserve two distinct same-square continuations.',
    witnesses: ['shko te tregtari', 'rri në shesh'],
    destinations: ['tregtari', 'sheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'blerjaBuke',
    rationale: 'The bread purchase and payment are complete before this screen, so browsing with the trader or returning to the square must not require rediscovering the object just bought.',
    evidence: 'The result states the traveller pays one hundred lek and receives bread; “rri me tregtarin” stays at the stall while “kthehu në shesh” leaves it.',
    witnesses: ['rri me tregtarin', 'kthehu në shesh'],
    destinations: ['tregtari', 'sheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'blerjaKripe',
    rationale: 'The salt purchase and payment are already resolved, so remaining at the trader or stepping back into the square are navigation choices rather than a second lexical gate.',
    evidence: 'The prose visibly joins the one-hundred-lek payment to receiving the salt; “rri me tregtarin” and “kthehu në shesh” then lead to the stall or square.',
    witnesses: ['rri me tregtarin', 'kthehu në shesh'],
    destinations: ['tregtari', 'sheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'blerjaLahuta',
    rationale: 'Buying the lahuta has completed the costly transaction, leaving a real choice between inspecting other practical goods and departing the shop for the square.',
    evidence: 'The result names the five-thousand-lek payment and received instrument; “shiko gjëra të tjera” opens the goods shelf while “kthehu në shesh” exits.',
    witnesses: ['shiko gjëra të tjera', 'kthehu në shesh'],
    destinations: ['sendetDites', 'sheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'gjumiBujtina',
    rationale: 'The paid night has already advanced time and restored the traveller, so accepting the visibly prepared morning coffee and leaving the inn are independent dawn choices.',
    evidence: 'The scene explicitly says it is dawn and the woman makes coffee; “dua kafenë” accepts that offer while “kthehu në shesh” leaves for the city square.',
    witnesses: ['dua kafenë', 'kthehu në shesh'],
    destinations: ['kafeja1', 'sheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'sherimiBar',
    rationale: 'Taking the paid spoonful has completed the healing consequence, so returning to the healer and walking back to the square are ordinary movements after care.',
    evidence: 'The prose visibly names the medicine, spoon, and recovery; “kthehu te shtëpia e shëruesit” stays with the healer while “kthehu në shesh” departs.',
    witnesses: ['kthehu te shtëpia e shëruesit', 'kthehu në shesh'],
    destinations: ['sheruesi', 'sheshi'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'vatraGjarpri',
    rationale: 'The milk offering and healing have visibly resolved at the hearth, so staying by the fire or returning to the adjoining family room must remain separate location choices.',
    evidence: 'The serpent visibly drinks the milk and the scene says the room is beside the hearth; “rri pranë vatrës” stays while “kthehu në dhomë” moves next door.',
    witnesses: ['rri pranë vatrës', 'kthehu në dhomë'],
    destinations: ['vatra', 'fshatiJeta'],
    owner: 'narrative-flow',
  }),
  ungatedChoiceReview({
    nodeId: 'shpellaRruget',
    rationale: 'The three-way cave junction is itself a spatial comprehension problem, so all directions must remain simultaneously visible rather than hiding two routes behind a sentence reveal.',
    evidence: 'The prose establishes left, middle, and right roads in darkness; the actions “shko majtas” and “shko djathtas” visibly bracket the separate middle-road choice.',
    witnesses: ['shko majtas', 'shko djathtas'],
    destinations: ['botaHumbur', 'qyteti', 'shpellaHyrje'],
    contract: {
      kind: 'question-options',
      promptWitnesses: ['tri rrugë në errësirë'],
      optionSurfaces: ['shko majtas', 'shko në rrugën e mes', 'shko djathtas'],
    },
  }),
  ungatedChoiceReview({
    nodeId: 'tsBeteje',
    rationale: 'This embodied mountain battle must keep its state-specific resolution and retreat paths available together: Tomorr can watch the mountains, while Shpirag can fight with the cudgel or withdraw before committing.',
    evidence: 'The scene visibly establishes “qyteti është poshtë” and “katër shqiponjat janë lart”; the authored actions “sheh malet”, “lufto me shkopin”, and “kthehu te mali tjetër” pin the two resolutions and the retreat.',
    witnesses: ['qyteti është poshtë', 'katër shqiponjat janë lart'],
    destinations: ['tsFundTomor', 'shpiragFund', 'shpirag1'],
    contract: {
      kind: 'question-options',
      promptWitnesses: ['qyteti është poshtë', 'katër shqiponjat janë lart'],
      optionSurfaces: ['sheh malet', 'lufto me shkopin', 'kthehu te mali tjetër'],
    },
  }),
  ungatedChoiceReview({
    nodeId: 'djepi3',
    rationale: 'The Ora question is a three-answer comprehension riddle with an explicit exit, so every named answer must be visible together for the learner to compare the alternatives fairly.',
    evidence: 'The prompt asks which sister gives the ending, and the visible answer surfaces include “e Zeza” and “e Verdha” alongside the repeat answer and road return.',
    witnesses: ['e Zeza', 'e Verdha'],
    destinations: ['djepiFund', 'djepiKeq', 'djepi3', 'fshatiLanes'],
    contract: {
      kind: 'question-options',
      promptWitnesses: ['cila nga ne jep fund'],
      optionSurfaces: ['e Zeza', 'e Verdha', 'e Bardha', 'kthehu në rrugën'],
    },
  }),
  ungatedChoiceReview({
    nodeId: 'bisedaUra3',
    rationale: 'Elira’s invitation opens a player-led conversation hub: accepting, deferring, asking practical follow-ups, requesting water, or leaving are distinct intentions that must remain mutually available.',
    evidence: 'The scene asks whether to come now or meet later, while visible choices include “po vij tani” and “Prit pak kam një pyetje” among the complete eight-option response set.',
    witnesses: ['po vij tani', 'Prit pak'],
    destinations: ['bisedaFollowAgree', 'bisedaKroi', 'bisedaUra3', 'bisedaUra3', 'bisedaUra3', 'bisedaUra3', 'bisedaUra3', 'start'],
    contract: { kind: 'conversation-hub', id: 'bridge-core' },
  }),
  ungatedChoiceReview({
    nodeId: 'bisedaUraPlan',
    rationale: 'After Elira repeats the plan and asks for a decision, accompanying her now and arranging a later meeting are the two complete, consequence-distinct answers.',
    evidence: 'The prompt visibly asks “a ke vendosur”; “po vij me ty” commits to following, while “takohemi më vonë” routes to the deferred appointment response.',
    witnesses: ['po vij me ty', 'takohemi më vonë'],
    destinations: ['bisedaFollowAgree', 'bisedaKroi'],
  }),
  ungatedChoiceReview({
    nodeId: 'bisedaShesh',
    rationale: 'Elira’s bridge crossing has visible state-dependent follow, wait, and catch-up responses; these are timing and movement decisions, not alternative hidden vocabulary answers.',
    evidence: 'The scene shows Elira waiting or having continued toward the village, and its visible actions include “prit pak” and “kalo urën” for delay or crossing.',
    witnesses: ['prit pak', 'kalo urën'],
    destinations: ['fshatiLumi', 'fshatiLumi', 'bisedaShesh', 'fshatiLumi'],
  }),
  ungatedChoiceReview({
    nodeId: 'bisedaKroi',
    rationale: 'The proposed tomorrow meeting needs a genuine confirmation, an immediate counter-plan, and a name question; gating one would prescribe the social response rather than test comprehension.',
    evidence: 'Elira visibly proposes tomorrow at nine in the square; “po nesër” confirms, “jo po vij me ty tani” changes the plan, and the third route asks her name.',
    witnesses: ['po nesër', 'po vij me ty tani'],
    destinations: ['start', 'bisedaFollowAgree', 'bisedaUraPlan'],
  }),
  ungatedChoiceReview({
    nodeId: 'bisedaFollowAgree',
    rationale: 'After Elira explicitly invites the traveller to come with her, confirming the departure and changing to a later meeting are both legitimate responses to the same offer.',
    evidence: 'The scene states “eja me mua” and that she waits nearby; “Në rregull” continues toward departure while “Takohemi më vonë” defers the plan.',
    witnesses: ['Në rregull', 'Takohemi më vonë'],
    destinations: ['bisedaShesh', 'bisedaKroi'],
  }),
  ungatedChoiceReview({
    nodeId: 'eliraBreg',
    rationale: 'At the riverbank the learner can ask Elira’s name, accept or decline her errand, climb onward, or remain by the water; those speech and movement intentions must not mask one another.',
    evidence: 'Elira visibly requests bread and salt, and the option set includes “si quhesh” and “po mund të të ndihmoj” alongside refusal and two location choices.',
    witnesses: ['si quhesh', 'po mund të të ndihmoj'],
    destinations: ['eliraEmriBreg', 'eliraEmriBreg', 'fshatiLumi', 'fshatiSheshi', 'fshatiLumi'],
  }),
  ungatedChoiceReview({
    nodeId: 'eliraEmriBreg',
    rationale: 'Once Elira has supplied her name and repeated the errand, accepting, declining, climbing to the village, and staying by the river are independent next actions.',
    evidence: 'The scene explicitly says “unë quhem Elira”; its visible responses include “po mund të të ndihmoj” and “tani jo më fal” before the two movement alternatives.',
    witnesses: ['po mund të të ndihmoj', 'tani jo'],
    destinations: ['eliraBreg', 'fshatiLumi', 'fshatiSheshi', 'fshatiLumi'],
  }),
  ungatedChoiceReview({
    nodeId: 'eliraShesh',
    rationale: 'Elira’s square encounter varies with punctuality, but asking her name, apologising, accepting the errand, and declining it remain distinct conversational intentions.',
    evidence: 'The projected dialogue can acknowledge arrival or lateness, while the exact responses “si quhesh” and “më fal kam gabuar” remain visible with accept and decline.',
    witnesses: ['si quhesh', 'më fal'],
    destinations: ['eliraEmriShesh', 'eliraShesh', 'fshatiSheshi', 'fshatiSheshi'],
  }),
  ungatedChoiceReview({
    nodeId: 'eliraEmriShesh',
    rationale: 'After learning Elira’s name, the errand request has two complete social answers; both acceptance and polite refusal must be available without another reveal gate.',
    evidence: 'The scene names Elira and asks for help with bread and salt; “po mund të të ndihmoj” accepts and “tani jo më fal” declines before both return to the square.',
    witnesses: ['po mund të të ndihmoj', 'tani jo'],
    destinations: ['fshatiSheshi', 'fshatiSheshi'],
  }),
  ungatedChoiceReview({
    nodeId: 'eliraBanore',
    rationale: 'Elira’s resident hub must expose state-dependent errand replies, turn-in, social small talk, optional conversation, and departure without imposing a fixed order on those intentions.',
    evidence: 'The node visibly tracks missing or delivered bread and salt, while its exact action bank contains “jepja bukën dhe kripën” and “a mund të flasim pak” among thirteen routes.',
    witnesses: ['jepja bukën dhe kripën', 'a mund të flasim pak'],
    destinations: ['fshatiSheshi', 'fshatiSheshi', 'fshatiSheshi', 'porosiaShesh', 'eliraPorosiaDorezuar', 'fshatiSheshi', 'fshatiSheshi', 'fshatiSheshi', 'fshatiSheshi', 'sofraMikut', 'fshatiSheshi', 'eliraBiseda', 'eliraBanore'],
  }),
  ungatedChoiceReview({
    nodeId: 'porosiaShesh',
    rationale: 'This errand briefing is an optional information hub: the learner may leave to act, ask who is coming, request directions, locate the guest room, or ask for slower repetition.',
    evidence: 'Elira visibly requests bread and salt, and “ku është tregu” receives grounded route information while “shihemi më vonë” exits to the square without forcing questions.',
    witnesses: ['ku është tregu', 'shihemi më vonë'],
    destinations: ['fshatiSheshi', 'porosiaShesh', 'porosiaShesh', 'porosiaShesh', 'porosiaShesh'],
    contract: { kind: 'conversation-hub', id: 'elira-errand' },
  }),
  ungatedChoiceReview({
    nodeId: 'porosiaBlerje',
    rationale: 'After the bread-and-salt purchase, answering the child and leaving the market are separate speech and movement actions; the purchase must not force an unsolicited reply.',
    evidence: 'The result visibly says the trader hands over a receipt before the child asks what was bought; “bukë dhe kripë për mikun” answers and “dil nga tregu” leaves.',
    witnesses: ['bukë dhe kripë për mikun', 'dil nga tregu'],
    destinations: ['porosiaBlerjePergjigje', 'pusiThate'],
  }),
  ungatedChoiceReview({
    nodeId: 'sofraMikut',
    rationale: 'At the guest-room door, inviting the hungry traveller to eat and returning to the square are consequence-distinct hospitality choices rather than successive compulsory dialogue.',
    evidence: 'The guest visibly says he is hungry and thirsty; “hajde ha bukë me ne” continues the welcome while “kthehu në shesh” declines to host and leaves.',
    witnesses: ['hajde', 'kthehu në shesh'],
    destinations: ['sofraMikut2', 'fshatiSheshi'],
  }),
  ungatedChoiceReview({
    nodeId: 'punaKripe',
    rationale: 'The salt-pan labour and wage have already been shown, so stopping at the works and returning toward the village are ordinary post-payment location choices.',
    evidence: 'The prose visibly says the men pay eight hundred lek after the salt work; “lër punën” returns to the pans while “kthehu në fshat” takes the coast route.',
    witnesses: ['lër punën', 'kthehu në fshat'],
    destinations: ['kripore1', 'deti1'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'shitjaCaj',
    rationale: 'The tea sale and five-hundred-lek payment are complete, leaving a simple choice between returning to the trader and crossing into the square.',
    evidence: 'The result visibly says “shet çaj” and names the payment, then offers “kthehu” to the trader and the more specific “kthehu në shesh” to the adjacent square.',
    witnesses: ['shet çaj', 'kthehu në shesh'],
    destinations: ['tregtari', 'sheshi'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'kengaJutbina',
    rationale: 'The performance and wage have resolved among the Kreshnik towers, so staying in Jutbina and climbing back toward the summit are ordinary post-song travel choices.',
    evidence: 'The scene visibly says Mujo and Halili listen and the men pay eight hundred lek; “kthehu” stays in Jutbina while “kthehu në majë” takes the mountain road.',
    witnesses: ['Mujo', 'kthehu në majë'],
    destinations: ['jutbina', 'maja'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'punaBariu',
    rationale: 'Guarding the goats and receiving the wage are complete before this decision, so remaining with the shepherd and returning to the village must both stay visible.',
    evidence: 'The result says “ruan dhitë” before the shepherd pays eight hundred lek; “kthehu” returns to him while “kthehu në fshat” takes the nearby village route.',
    witnesses: ['ruan dhitë', 'kthehu në fshat'],
    destinations: ['bariu', 'fshatiJeta'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'kengaLahute',
    rationale: 'The lahuta song and wage have already resolved at the travellers’ fire, so staying with the listeners and leaving for the oda are independent post-performance actions.',
    evidence: 'The prose visibly says the traveller “këndon me lahutën” before the men pay eight hundred lek; “kthehu” returns while “lër udhëtarët” leaves for the oda.',
    witnesses: ['këndon me lahutën', 'lër udhëtarët'],
    destinations: ['udhetaret', 'oda1'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'punaMulli',
    rationale: 'The flour work and wage are explicitly complete, leaving a real choice between ending the shift inside the mill and stepping back to the river outside.',
    evidence: 'The result shows flour sacks and the old man paying eight hundred lek; “lër punën” returns inside the mill while “kthehu në lumin” moves outside.',
    witnesses: ['lër punën', 'kthehu në lumin'],
    destinations: ['mulli1', 'fshatiLumi'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'punaTabak',
    rationale: 'The tannery work and wage have already been narrated, so remaining by the hides and returning to the river are consequence-distinct post-shift movements.',
    evidence: 'The scene says the tanner pays eight hundred lek after the cold-water work; “dil nga uji” returns to the tannery and “kthehu te lumi” leaves for the river.',
    witnesses: ['dil nga uji', 'kthehu te lumi'],
    destinations: ['tabaket1', 'fshatiLumi'],
    contract: { kind: 'earned-payment' },
  }),
  ungatedChoiceReview({
    nodeId: 'uraArtes2',
    rationale: 'The old man’s bridge demand creates three morally distinct responses—swear, leave, or refuse—and all must remain visible so the scene does not prescribe the oath.',
    evidence: 'The scene visibly asks whether the brothers promise besa, while “Premto besë” repeats locally, “shko në shtëpi” advances the night, and “jo” opens the rescue path.',
    witnesses: ['Premto besë', 'shko në shtëpi'],
    destinations: ['uraArtes2', 'uraNata', 'uraArtesShpetim'],
  }),
  ungatedChoiceReview({
    nodeId: 'rrugaOdes',
    rationale: 'This quiet junction exists to apply remembered directions through physical movement, so left, right, and return-to-square routes must be simultaneously legible.',
    evidence: 'The prose explicitly says the road divides left or right and nobody speaks here; “shko majtas” and “shko djathtas” lead to distinct places beside the square return.',
    witnesses: ['shko majtas', 'shko djathtas'],
    destinations: ['fshatiJeta', 'oda1', 'fshatiSheshi'],
    contract: { kind: 'grounded-direction-step', id: 'elira-guest-room' },
  }),
  ungatedChoiceReview({
    nodeId: 'gruaUji1',
    rationale: 'Mira’s riverbank scene is a player-led information hub about her name, the broken well, the child, the spring, and possible help, with an ordinary goodbye always available.',
    evidence: 'She visibly stands with the wet bucket, while the exact questions “pse nuk e përdor pusin” and “ku është kroi” coexist with help, name, child, and farewell choices.',
    witnesses: ['pse nuk e përdor pusin', 'ku është kroi'],
    destinations: ['gruaUji1', 'gruaUji1', 'gruaUji1', 'gruaUji1', 'gruaUji1', 'fshatiLumi'],
    contract: { kind: 'conversation-hub', id: 'water-carrier-bank' },
  }),
  ungatedChoiceReview({
    nodeId: 'eliraBiseda',
    rationale: 'Elira’s optional conversation hub lets the learner choose among wellbeing, work, schedule, repair, sleep, and whereabouts topics before ending the exchange.',
    evidence: 'Elira visibly stops and listens; “Ç\'kemi” opens the wellbeing reply while “kur mund të të gjej këtu” asks her schedule, alongside four other topics and farewell.',
    witnesses: ["Ç'kemi", 'kur mund të të gjej këtu'],
    destinations: ['eliraBiseda', 'eliraBiseda', 'eliraBiseda', 'eliraBiseda', 'eliraBiseda', 'eliraBiseda', 'fshatiSheshi'],
    contract: { kind: 'conversation-hub', id: 'elira-neighbour' },
  }),
  ungatedChoiceReview({
    nodeId: 'vajzaKroiBiseda',
    rationale: 'The girl’s spring conversation offers three independent practical questions about temperature, routine, and distance, followed by an explicit return to the spring.',
    evidence: 'She visibly sets her bucket down to listen; “a është uji i ftohtë” and “a vjen këtu çdo ditë” receive different facts before the separate farewell route.',
    witnesses: ['a është uji i ftohtë', 'a vjen këtu çdo ditë'],
    destinations: ['vajzaKroiBiseda', 'vajzaKroiBiseda', 'vajzaKroiBiseda', 'kroi1'],
    contract: { kind: 'conversation-hub', id: 'spring-girl' },
  }),
  ungatedChoiceReview({
    nodeId: 'plakaPyllitBiseda',
    rationale: 'The forest woman’s hub exposes distinct questions about cold, destination, and solitude, plus a nighttime farewell; no authored order is required among them.',
    evidence: 'The old woman visibly stops beneath the trees, and “a ke ftohtë” and “ku po shkon” ask different grounded questions before “natën e mirë” exits.',
    witnesses: ['a ke ftohtë', 'ku po shkon'],
    destinations: ['plakaPyllitBiseda', 'plakaPyllitBiseda', 'plakaPyllitBiseda', 'pylliLoop'],
    contract: { kind: 'conversation-hub', id: 'forest-guest' },
  }),
  ungatedChoiceReview({
    nodeId: 'sheshiPlak',
    rationale: 'The old man is a broad optional knowledge and conversation-repair hub; the learner must choose which water, village, folklore, or clarification topic to pursue and when to leave.',
    evidence: 'He visibly holds his stick beside the well, while “ku mund të gjej ujë” and “Çfarë duhet të di për pyllin natën” query distinct facts among thirteen visible routes.',
    witnesses: ['ku mund të gjej ujë', 'Çfarë duhet të di për pyllin natën'],
    destinations: ['sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'sheshiPlak', 'fshatiSheshi'],
    contract: { kind: 'conversation-hub', id: 'square-elder' },
  }),
  ungatedChoiceReview({
    nodeId: 'bariuBiseda',
    rationale: 'The shepherd conversation offers independent questions about his current work, flock size, need for help, and return time before the player ends the exchange.',
    evidence: 'The shepherd visibly stands among the goats; “sa dhi ke” asks quantity and “a ke nevojë për ndihmë” asks for the task, beside schedule and farewell options.',
    witnesses: ['sa dhi ke', 'a ke nevojë për ndihmë'],
    destinations: ['bariuBiseda', 'bariuBiseda', 'bariuBiseda', 'bariuBiseda', 'bariu'],
    contract: { kind: 'conversation-hub', id: 'village-shepherd' },
  }),
  ungatedChoiceReview({
    nodeId: 'tregtariBiseda',
    rationale: 'The trader’s optional advice hub answers different needs—cheaper goods, road supplies, and opening time—before returning the player to the shop.',
    evidence: 'The trader visibly sets down his money bag to listen; “a keni diçka më të lirë” and “kur hapet dyqani” request distinct advice before the farewell route.',
    witnesses: ['a keni diçka më të lirë', 'kur hapet dyqani'],
    destinations: ['tregtariBiseda', 'tregtariBiseda', 'tregtariBiseda', 'tregtari'],
    contract: { kind: 'conversation-hub', id: 'gjakova-trader' },
  }),
  ungatedChoiceReview({
    nodeId: 'sheruesiBiseda',
    rationale: 'The healer’s aftercare hub separates return timing, work safety, bandage care, and optional night folklore, while preserving a clear route back to the clinic.',
    evidence: 'The healer visibly washes his hands and listens; “kur duhet të kthehem” and “a duhet ta mbaj fashën” ask distinct medical questions before farewell.',
    witnesses: ['kur duhet të kthehem', 'a duhet ta mbaj fashën'],
    destinations: ['sheruesiBiseda', 'sheruesiBiseda', 'sheruesiBiseda', 'sheruesiBiseda', 'sheruesi'],
    contract: { kind: 'conversation-hub', id: 'gjakova-healer' },
  }),
  ungatedChoiceReview({
    nodeId: 'bujtinariBiseda',
    rationale: 'The innkeeper’s practical hub lets the learner ask separately about hot water, breakfast time, leaving a bag, and carrying it, then end the conversation.',
    evidence: 'The woman visibly places the keys beside the fire; “a ka ujë të ngrohtë” and “a mund të lë çantën time këtu” request different services before farewell.',
    witnesses: ['a ka ujë të ngrohtë', 'a mund të lë çantën time këtu'],
    destinations: ['bujtinariBiseda', 'bujtinariBiseda', 'bujtinariBiseda', 'bujtinariBiseda', 'bujtina'],
    contract: { kind: 'conversation-hub', id: 'gjakova-innkeeper' },
  }),
  ungatedChoiceReview({
    nodeId: 'dordolecBiseda',
    rationale: 'The children’s conversation mixes activity, participation, weather reasoning, and colloquial repair questions; the learner chooses a topic and can leave at any time.',
    evidence: 'The children visibly stop and turn toward the traveller, while “çfarë po bëni” and “pse kërkoni shi” open different replies among six routes including farewell.',
    witnesses: ['çfarë po bëni', 'pse kërkoni shi'],
    destinations: ['dordolecBiseda', 'dordolecBiseda', 'dordolecBiseda', 'dordolecBiseda', 'dordolecBiseda', 'dordolec1'],
    contract: { kind: 'conversation-hub', id: 'rain-children' },
  }),
  ungatedChoiceReview({
    nodeId: 'dasmaBiseda',
    rationale: 'The wedding guest offers three independent social questions about timing, the bride, and joining the dance, followed by an ordinary return to the celebration.',
    evidence: 'A woman visibly approaches from the wedding to listen; “a ka filluar dasma” and “a mund të hyj në valle” seek different information before farewell.',
    witnesses: ['a ka filluar dasma', 'a mund të hyj në valle'],
    destinations: ['dasmaBiseda', 'dasmaBiseda', 'dasmaBiseda', 'dasma1'],
    contract: { kind: 'conversation-hub', id: 'village-wedding' },
  }),
  ungatedChoiceReview({
    nodeId: 'kroiGrate2',
    rationale: 'The spring greeting scene asks the learner to select a time-appropriate salutation while retaining the option to remain silent at the spring; every greeting must be comparable at once.',
    evidence: 'The women visibly use morning, daytime, and evening greetings, and the action set includes “mirëmëngjes” beside “rri te kroi” plus the other two salutations.',
    witnesses: ['mirëmëngjes', 'rri te kroi'],
    destinations: ['kroi1', 'kroiGrate2', 'kroiGrate2', 'kroiGrate2'],
  }),
])

const normalizedSurface = (value) => String(value || '').normalize('NFC').replace(/\s+/g, ' ').trim()
const surfaceOfEntries = (entries) => normalizedSurface((entries || [])
  .flatMap((entry) => lineOf(entry))
  .map((token) => token?.al || '')
  .join(' '))
const visibleSurfaceOf = (node) => normalizedSurface([
  ...(node?.text || []).flatMap((entry) => lineOf(entry)),
  ...(node?.options || []).flatMap((option) => lineOf(option.text)),
].map((token) => token?.al || '').join(' '))
const reviewQualityFailures = []
const reviewNodes = new Set()
const reviewByNode = new Map()
const rationales = new Set()
const evidenceStatements = new Set()
const forbiddenSelfEvidence = [
  /derived ungated-only set/i,
  /storystats verifies/i,
  /general reveal-gating target/i,
  /exempt from/i,
  /this exact decision point/i,
]
const proseQualityIssues = (review, label) => {
  const issues = []
  if ((review?.rationale?.trim().length || 0) < 120) issues.push(`${label}: rationale is too thin`)
  if ((review?.evidence?.trim().length || 0) < 120) issues.push(`${label}: evidence is too thin`)
  if (forbiddenSelfEvidence.some((pattern) => pattern.test(review?.rationale || '') || pattern.test(review?.evidence || ''))) {
    issues.push(`${label}: rationale or evidence is self-referential boilerplate`)
  }
  return issues
}
if (!proseQualityIssues({ rationale: 'short', evidence: 'short' }, 'thin-review-fixture')
  .some((issue) => issue.includes('too thin'))) {
  reviewQualityFailures.push('ungated review quality regression: thin prose no longer fails closed')
}
if (!proseQualityIssues({
  rationale: 'This exact decision point is exempt from the general reveal-gating target because the generated registry says so.'.repeat(2),
  evidence: 'STORY.fixture is in the derived ungated-only set; storystats verifies it and therefore this is evidence.'.repeat(2),
}, 'self-evidence-fixture').some((issue) => issue.includes('self-referential'))) {
  reviewQualityFailures.push('ungated review quality regression: self-referential evidence no longer fails closed')
}
for (const review of UNGATED_CHOICE_REVIEWS) {
  const label = `ungated choice review ${review?.nodeId || '(missing node)'}`
  if (reviewNodes.has(review?.nodeId)) reviewQualityFailures.push(`${label}: duplicate node`)
  reviewNodes.add(review?.nodeId)
  reviewByNode.set(review?.nodeId, review)
  reviewQualityFailures.push(...proseQualityIssues(review, label))
  if (rationales.has(review?.rationale)) reviewQualityFailures.push(`${label}: duplicates another rationale`)
  if (evidenceStatements.has(review?.evidence)) reviewQualityFailures.push(`${label}: duplicates another evidence statement`)
  rationales.add(review?.rationale)
  evidenceStatements.add(review?.evidence)
  if (!Array.isArray(review?.witnesses) || review.witnesses.length < 2 || new Set(review.witnesses).size !== review.witnesses.length) {
    reviewQualityFailures.push(`${label}: needs at least two distinct source witnesses`)
  }
  const node = nodes[review?.nodeId]
  if (!node || node.end) {
    reviewQualityFailures.push(`${label}: target is missing or is an ending`)
    continue
  }
  const visibleSurface = visibleSurfaceOf(node)
  for (const witness of review.witnesses || []) {
    if (!visibleSurface.includes(normalizedSurface(witness))) {
      reviewQualityFailures.push(`${label}: source witness is no longer visible: ${witness}`)
    }
    if (!(review.evidence || '').includes(witness)) {
      reviewQualityFailures.push(`${label}: evidence does not identify its source witness: ${witness}`)
    }
  }
  const liveDestinations = (node.options || []).filter((option) => !option.confuser).map((option) => option.to)
  if (JSON.stringify(liveDestinations) !== JSON.stringify(review.destinations)) {
    reviewQualityFailures.push(`${label}: exact non-confuser destinations changed`)
  }
  const contract = review.contract
  if (contract?.kind === 'conversation-hub') {
    const hub = CONVERSATION_HUBS[contract.id]
    if (!hub || hub.nodeId !== review.nodeId) {
      reviewQualityFailures.push(`${label}: conversation hub ${contract.id} no longer owns this node`)
    }
  } else if (contract?.kind === 'earned-payment') {
    const incomingPayments = Object.entries(nodes).flatMap(([sourceNodeId, source]) =>
      (source.options || []).map((option) => ({ sourceNodeId, option })))
      .filter(({ option }) => option.to === review.nodeId && option.lek > 0 && moneyOutcomeLinesOf(option).length > 0)
    if (incomingPayments.length === 0) {
      reviewQualityFailures.push(`${label}: no incoming positive money transaction narrates this result`)
    }
    if (new Set(liveDestinations).size < 2) {
      reviewQualityFailures.push(`${label}: paid result no longer restores two consequence-distinct destinations`)
    }
  } else if (contract?.kind === 'grounded-direction-step') {
    const grounded = Object.values(GROUNDED_DIRECTION_CONTRACTS).find(({ id }) => id === contract.id)
    if (!grounded?.route.some((step) => step.nodeId === review.nodeId && liveDestinations.includes(step.to))) {
      reviewQualityFailures.push(`${label}: grounded-direction contract ${contract.id} no longer owns a live route step here`)
    }
  } else if (contract?.kind === 'question-options') {
    const promptSurface = surfaceOfEntries(node.text)
    for (const promptWitness of contract.promptWitnesses || []) {
      if (!promptSurface.includes(normalizedSurface(promptWitness))) {
        reviewQualityFailures.push(`${label}: question prompt witness is no longer visible: ${promptWitness}`)
      }
    }
    const liveOptionSurfaces = (node.options || [])
      .filter((option) => !option.confuser)
      .map((option) => surfaceOfEntries([option.text]))
    if (JSON.stringify(liveOptionSurfaces) !== JSON.stringify(contract.optionSurfaces)) {
      reviewQualityFailures.push(`${label}: exact visible answer-option structure changed`)
    }
  } else if (contract != null) {
    reviewQualityFailures.push(`${label}: unknown executable evidence contract ${String(contract.kind)}`)
  }
}
for (const [nodeId, agencyReview] of Object.entries(REVIEWED_UNGATED_AGENCY_CHOICES)) {
  const local = reviewByNode.get(nodeId)
  if (!local) {
    reviewQualityFailures.push(`${nodeId}: canonical agency review has no explicit ungated exception review`)
  } else if (JSON.stringify(local.destinations) !== JSON.stringify(agencyReview.options.map(({ to }) => to))) {
    reviewQualityFailures.push(`${nodeId}: explicit review destinations drifted from the canonical agency review`)
  }
}
for (const resultReview of REVIEWED_UNGATED_RESULT_CHOICES) {
  const local = reviewByNode.get(resultReview.resultNode)
  if (!local) {
    reviewQualityFailures.push(`${resultReview.resultNode}: canonical result review has no explicit ungated exception review`)
  } else if (JSON.stringify(local.destinations) !== JSON.stringify(resultReview.options.map(({ to }) => to))) {
    reviewQualityFailures.push(`${resultReview.resultNode}: explicit review destinations drifted from the canonical result review`)
  }
}

const ungatedNodeException = ({ nodeId, rationale, evidence, owner }) => ({
  id: `ungated-node-${kebabNodeId(nodeId)}`,
  rule: 'multi-option-node-without-reveal',
  targets: [nodeId],
  rationale,
  evidence,
  owner,
  reviewTrigger: `Re-review whenever STORY.${nodeId}, its non-confuser option count, destinations, purposes, or reveal metadata changes.`,
  scope: { kind: 'exact-targets', maximumTargets: 1 },
})
const UNGATED_CHOICE_EXCEPTIONS = defineAuditExceptionRegistry({
  rules: {
    'multi-option-node-without-reveal': { targetKind: 'non-ending story node id' },
  },
  entries: UNGATED_CHOICE_REVIEWS.map(ungatedNodeException),
})
const reviewedUngatedChoiceIds = new Set(auditExceptionTargetsFor(
  UNGATED_CHOICE_EXCEPTIONS,
  'multi-option-node-without-reveal',
))
const unreviewedUngatedOnly = ungatedOnly.filter((id) => !reviewedUngatedChoiceIds.has(id))
const staleUngatedReviews = [...reviewedUngatedChoiceIds].filter((id) => !ungatedOnly.includes(id))
for (const issue of auditExceptionRegistryIssues(UNGATED_CHOICE_EXCEPTIONS, {
  validTargetsByRule: { 'multi-option-node-without-reveal': new Set(ungatedOnly) },
})) ungatedResultReviewErrors.push(`shared exception registry: ${issue}`)
for (const issue of auditExceptionUsageIssues(UNGATED_CHOICE_EXCEPTIONS, new Set(ungatedOnly.map((nodeId) =>
  auditExceptionClaimKey('multi-option-node-without-reveal', nodeId))))) {
  ungatedResultReviewErrors.push(`shared exception usage: ${issue}`)
}
ungatedResultReviewErrors.push(...reviewQualityFailures)

// ---- distractor legibility ---------------------------------------------------
// Impossible actions test comprehension; they must never be the first surface
// from which a learner can discover a word. The canonical runtime registry hides
// each authored confuser until every trainable sense in it is already discovered.
// Audit both sides of that boundary across the whole bank: one missing discovery
// keeps the action absent, while the complete set makes the exact action eligible.
const confuserLegibilityErrors = []
let discoveryGatedConfusers = 0
const confuserState = (nodeId, discovered) => ({
  nodeId,
  discovered,
  inventory: {},
  hearts: 3,
  healedAt: {},
  embodying: null,
  ended: null,
  timePassage: null,
  pendingEmbodiment: null,
})
for (const id of ids) {
  for (const candidate of authoredStoryConfusers(nodes[id])) {
    const required = confuserPrerequisiteSenseIds(candidate.tokens)
    const readyDiscoveries = Object.fromEntries(required.map((senseId) => [senseId, true]))
    const readyState = confuserState(id, readyDiscoveries)
    if (!confuserLegibility(readyState, candidate.tokens).legible) {
      confuserLegibilityErrors.push(`${id}/${candidate.key}: complete discovery set is still illegible`)
      continue
    }
    if (!storyConfuserCandidates(readyState).some((entry) => entry.key === candidate.key)) {
      confuserLegibilityErrors.push(`${id}/${candidate.key}: complete discovery set did not reveal the confuser`)
    }
    if (required.length === 0) continue
    discoveryGatedConfusers++
    const missingId = required[0]
    const missingState = confuserState(id,
      Object.fromEntries(required.slice(1).map((senseId) => [senseId, true])))
    if (storyConfuserCandidates(missingState).some((entry) => entry.key === candidate.key)) {
      confuserLegibilityErrors.push(`${id}/${candidate.key}: visible before '${missingId}' was discovered`)
    }
  }
}

// ---- distractor plausibility -------------------------------------------------
// A good distractor is legible but CLEARLY impossible. "ngjit" (climb) on a
// climbable thing (mountain/tree/well/tower/wall/nest/house/summit/horse/...) reads
// as a plausible near-answer, not an absurdity — so it's banned. Use a clearly-
// impossible verb instead (give/take/listen-to/fight/speak-with the X).
const CLIMBABLE = new Set(['peme', 'mal', 'maja', 'pus', 'fole', 'kulle', 'shtepi', 'mur', 'kale', 'dhi', 'dash', 'gur'])
const leadId = (toks) => {
  for (const t of toks || []) if (t.id && !['ne', 'me', 'i_art', 'e_art', 'te_link', 'nje', 'dhe', 'per', 'ti', 'je'].includes(t.id)) return t.id
  return null
}
const climbDistractors = []
for (const id of ids) {
  if (nodes[id].end) continue
  for (const o of (nodes[id].options || []).filter((o) => o.confuser)) {
    if (leadId(o.text) === 'ngjit' && o.text.some((t) => t.id && CLIMBABLE.has(t.id)))
      climbDistractors.push(`${id}: "${o.text.map((t) => t.al || t.en).join(' ')}" — climb a climbable thing reads as a real answer`)
  }
}

// ---- report -----------------------------------------------------------------
const ok = (b) => (b ? '✅' : '❌')
console.log('=== Aventura Shqip — story stats ===')
console.log(`nodes:            ${ids.length}`)
console.log(`endings:          ${endings.length}  (${endings.filter((e)=>nodes[e].end==='good').length} good / ${endings.filter((e)=>nodes[e].end==='secret').length} secret / ${endings.filter((e)=>nodes[e].end==='bad').length} bad)`)
console.log(`vocabulary used:  ${usedSenses.size} senses`)
console.log('')
console.log(`${ok(!deadLinks.length)} dead links:      ${deadLinks.length}` + (deadLinks.length ? '\n   ' + deadLinks.join('\n   ') : ''))
console.log(`${ok(!unreachable.length)} unreachable:     ${unreachable.length}` + (unreachable.length ? '\n   ' + unreachable.join(', ') : ''))
console.log(`${ok(!deadEnds.length)} non-end deadends:${deadEnds.length}` + (deadEnds.length ? '\n   ' + deadEnds.join(', ') : ''))
console.log(`${ok(!missingDict.size)} missing DICT:    ${missingDict.size}` + (missingDict.size ? '\n   ' + [...missingDict].join(', ') : ''))
console.log(`${ok(!missingDefs.length)} missing DEFS:    ${missingDefs.length}` + (missingDefs.length ? '\n   ' + missingDefs.join(', ') : ''))
console.log(`${ok(!noConfuser.length)} no-confuser nodes:${noConfuser.length}` + (noConfuser.length ? '\n   ' + noConfuser.join(', ') : ''))
console.log('')
console.log('--- DEPTH (steps from start) ---')
console.log(`ending depths:    [${endingDepths.join(', ')}]`)
console.log(`  shortest ending: ${endingDepths[0]}`)
console.log(`  median ending:   ${median}`)
console.log(`  average ending:  ${avg.toFixed(1)}   (anthology context; not a per-ending target)`)
console.log(`  deepest ending:  ${endingDepths[endingDepths.length - 1]}`)
console.log(`deepest SCC route upper bound: ${structuralRouteUpperBound} scenes -> ${structuralRouteEnd} (${reachableCycles} reachable cyclic regions collapsed)`)
console.log(`${ok(!unreviewedCompact.length && !staleCompactReviews.length && !abruptCompact.length && !compactExceptionIssues.length)} compact non-bad endings reviewed: ${compactNonBad.length}` +
  (unreviewedCompact.length ? `\n   UNREVIEWED: ${unreviewedCompact.join(', ')}` : '') +
  (staleCompactReviews.length ? `\n   STALE REVIEWS: ${staleCompactReviews.join(', ')}` : '') +
  (abruptCompact.length ? `\n   TOO ABRUPT: ${abruptCompact.join(', ')}` : '') +
  (compactExceptionIssues.length ? `\n   MALFORMED EXCEPTIONS:\n   ${compactExceptionIssues.join('\n   ')}` : ''))
console.log('')
console.log('--- DESIGNED REVEAL GATES (authored sentence-unlocks) ---')
console.log(`${ok(!brokenGates.length)} authored reveal gates: ${revealGates.length} on ${gatedNodes.length} nodes`)
if (brokenGates.length) console.log('   BROKEN:\n   ' + brokenGates.join('\n   '))
console.log(`${ok(!noUngated.length)} every node keeps an ungated choice or proven ordinary Pause:${noUngated.length ? ' VIOLATIONS -> ' + noUngated.join(', ') : ` yes (${provenPauseNodes.size} real-route Pause proofs)`}`)
console.log(`${ok(!unreviewedUngatedOnly.length && !staleUngatedReviews.length && !ungatedResultReviewErrors.length)} multi-option nodes with no reveal gate are reviewed: ${ungatedOnly.length}` +
  (unreviewedUngatedOnly.length ? `\n   UNREVIEWED: ${unreviewedUngatedOnly.join(', ')}` : '') +
  (staleUngatedReviews.length ? `\n   STALE REVIEWS: ${staleUngatedReviews.join(', ')}` : '') +
  (ungatedResultReviewErrors.length ? `\n   MALFORMED UNGATED REVIEWS:\n   ${ungatedResultReviewErrors.join('\n   ')}` : ''))
console.log(`   options gated: ${gatedReal}/${totalReal} (${(100*gatedReal/totalReal).toFixed(0)}% of all); of options that act on something described in the scene, ${gateableGated}/${gateableTotal} (${(100*gateableGated/gateableTotal).toFixed(0)}%) gated`)
console.log('')
console.log('--- DISTRACTOR LEGIBILITY (confusers built from already-discovered words) ---')
const confuserLegibilityDetail = confuserLegibilityErrors.length
  ? ' VIOLATIONS -> ' + confuserLegibilityErrors.length + '\n   ' +
    confuserLegibilityErrors.slice(0, 30).join('\n   ') +
    (confuserLegibilityErrors.length > 30 ? `\n   ... and ${confuserLegibilityErrors.length - 30} more` : '')
  : ` yes (${discoveryGatedConfusers} authored confusers fail closed until their vocabulary is discovered)`
console.log(`${ok(!confuserLegibilityErrors.length)} every presented confuser uses only already-discovered words:${confuserLegibilityDetail}`)
console.log(`${ok(!climbDistractors.length)} no "climb a climbable thing" distractor:${climbDistractors.length ? ' VIOLATIONS -> ' + climbDistractors.length + '\n   ' + climbDistractors.join('\n   ') : ' yes'}`)

if (deadLinks.length || unreachable.length || deadEnds.length || missingDict.size || missingDefs.length || noConfuser.length ||
    brokenGates.length || noUngated.length || unreviewedCompact.length || staleCompactReviews.length || abruptCompact.length || compactExceptionIssues.length ||
    unreviewedUngatedOnly.length || staleUngatedReviews.length || ungatedResultReviewErrors.length || confuserLegibilityErrors.length || climbDistractors.length) {
  process.exitCode = 1
}
