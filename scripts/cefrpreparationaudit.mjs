// Release gate for the guided A1/A2 preparation curriculum.

import assert from 'node:assert/strict'
import { DICT, STORY } from '../src/game/content.js'
import { NPCS } from '../src/game/npcs.js'
import { PLAYABLE_FORM_INVENTORY } from '../src/game/formInventory.js'
import { CEFR_CAPSTONE_TASK_FAMILIES } from '../src/game/cefrProgression.js'
import { CEFR_TASKS } from '../src/game/cefrTasks.js'
import {
  CEFR_PREPARATION_ACTIVITIES,
  CEFR_PREPARATION_CAPABILITIES,
  CEFR_PREPARATION_EVIDENCE_CONTRACT,
  CEFR_PREPARATION_EXAMPLES,
  CEFR_PREPARATION_MECHANICS,
  CEFR_PREPARATION_SOURCE_REGISTRIES,
  CEFR_PREPARATION_STAGES,
  CEFR_TRAIN_WITH_MECHANIC_MAP,
  buildPreparationActivity,
  evaluatePreparationResponse,
  nextPreparationPrompt,
  preparationMechanicsForCapstone,
  preparationReadiness,
} from '../src/game/cefrPreparation.js'

const failures = []
const check = (label, fn) => {
  try {
    fn()
    console.log(`✓ ${label}`)
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
    console.error(`✗ ${label}: ${error.message}`)
  }
}

const normalize = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/[“”'.,!?;:\n]/gu, '')
  .replace(/\s+/gu, ' ')
  .trim()

const walk = (value, visit, path = '$') => {
  if (!value || typeof value !== 'object') return
  visit(value, path)
  if (Array.isArray(value)) value.forEach((child, index) => walk(child, visit, `${path}[${index}]`))
  else Object.entries(value).forEach(([key, child]) => walk(child, visit, `${path}.${key}`))
}

const albanianSurfaces = []
for (const entry of CEFR_PREPARATION_ACTIVITIES) {
  walk(entry, (value, path) => {
    if (value.kind === 'albanian') albanianSurfaces.push({ activityId: entry.id, path, value })
  })
}

check('A1 is ordered before A2 and every stage has a meaningful outcome', () => {
  assert.deepEqual(CEFR_PREPARATION_STAGES.map(({ order }) => order), CEFR_PREPARATION_STAGES.map((_, index) => index))
  let seenA2 = false
  for (const stage of CEFR_PREPARATION_STAGES) {
    if (stage.level === 'A2') seenA2 = true
    if (seenA2) assert.equal(stage.level, 'A2', `${stage.id} puts A1 after A2`)
    assert.ok(stage.label.length >= 8, `${stage.id} label is too thin`)
    assert.ok(stage.outcome.length >= 45, `${stage.id} has no concrete outcome`)
  }
})

check('every mechanic is playable, ordered and attached to a real stage', () => {
  const stageIds = new Set(CEFR_PREPARATION_STAGES.map(({ id }) => id))
  const orders = new Set()
  for (const [id, mechanic] of Object.entries(CEFR_PREPARATION_MECHANICS)) {
    assert.equal(mechanic.id, id)
    assert.ok(stageIds.has(mechanic.stageId), `${id} references missing stage ${mechanic.stageId}`)
    assert.ok(!orders.has(mechanic.order), `${id} repeats order ${mechanic.order}`)
    orders.add(mechanic.order)
    assert.ok(CEFR_PREPARATION_ACTIVITIES.some((activity) => activity.mechanicId === id), `${id} has no playable activity`)
    assert.ok(CEFR_PREPARATION_SOURCE_REGISTRIES.wordCapabilities.some(
      ({ id: capabilityId }) => capabilityId === mechanic.readiness.wordCapabilityId,
    ), `${id} references an unknown word capability`)
    if (mechanic.level === 'A2') assert.equal(mechanic.readiness.prerequisiteLevel, 'A1', `${id} can open before A1`)
    for (const prerequisite of mechanic.readiness.prerequisiteMechanicIds) {
      const prior = CEFR_PREPARATION_MECHANICS[prerequisite]
      assert.ok(prior, `${id} references unknown prerequisite ${prerequisite}`)
      assert.ok(prior.order < mechanic.order, `${id} depends on later ${prerequisite}`)
    }
  }
})

check('all eight required pre-capstone capabilities have concrete activities', () => {
  const implemented = new Set(Object.values(CEFR_PREPARATION_MECHANICS).flatMap(({ capabilities }) => capabilities))
  assert.deepEqual([...implemented].sort(), [...CEFR_PREPARATION_CAPABILITIES].sort())
  for (const capability of CEFR_PREPARATION_CAPABILITIES) {
    const mechanics = Object.values(CEFR_PREPARATION_MECHANICS).filter(({ capabilities }) => capabilities.includes(capability))
    assert.ok(mechanics.length, `${capability} has no mechanic`)
    assert.ok(mechanics.every((mechanic) => CEFR_PREPARATION_ACTIVITIES.some(({ mechanicId }) => mechanicId === mechanic.id)))
  }
})

check('every activity uses real lore anchors and a registered mechanic', () => {
  const ids = new Set()
  for (const entry of CEFR_PREPARATION_ACTIVITIES) {
    assert.ok(!ids.has(entry.id), `duplicate ${entry.id}`)
    ids.add(entry.id)
    const mechanic = CEFR_PREPARATION_MECHANICS[entry.mechanicId]
    assert.ok(mechanic, `${entry.id} has unknown mechanic ${entry.mechanicId}`)
    assert.equal(entry.level, mechanic.level, `${entry.id} level disagrees with mechanic`)
    assert.ok(STORY[entry.loreAnchor.nodeId], `${entry.id} has fictional node ${entry.loreAnchor.nodeId}`)
    if (entry.loreAnchor.npcId) assert.ok(NPCS[entry.loreAnchor.npcId], `${entry.id} has fictional NPC ${entry.loreAnchor.npcId}`)
    assert.ok(entry.instruction.length >= 20, `${entry.id} has no usable instruction`)
    assert.ok(entry.focusSenseIds.length, `${entry.id} has no exact lexical focus`)
    assert.ok(entry.response?.kind, `${entry.id} has no response contract`)
  }
})

check('every Albanian token is bound to a taught dictionary sense and reviewed surface', () => {
  assert.ok(albanianSurfaces.length >= 100, 'curriculum has too little concrete Albanian')
  for (const { activityId, path, value } of albanianSurfaces) {
    assert.equal(value.text, value.text.normalize('NFC'), `${activityId}${path} is not NFC`)
    assert.ok(value.tokens.length || /^[.,!?;:]+$/u.test(value.text), `${activityId}${path} has unbound language: ${value.text}`)
    for (const token of value.tokens) {
      assert.ok(DICT[token.senseId], `${activityId}${path} uses unknown ${token.senseId}`)
      const reviewed = PLAYABLE_FORM_INVENTORY[token.senseId] || []
      assert.ok(reviewed.some(({ al }) => normalize(al) === normalize(token.surface)),
        `${activityId}${path}: ${token.surface} is not a reviewed form of ${token.senseId}`)
    }
  }
})

check('focus evidence refers only to senses actually used by that mechanic', () => {
  for (const [mechanicId] of Object.entries(CEFR_PREPARATION_MECHANICS)) {
    const entries = CEFR_PREPARATION_ACTIVITIES.filter((entry) => entry.mechanicId === mechanicId)
    const used = new Set()
    for (const entry of entries) walk(entry, (value) => {
      if (value.kind === 'albanian') value.tokens.forEach(({ senseId }) => used.add(senseId))
    })
    for (const entry of entries) for (const id of entry.focusSenseIds) {
      assert.ok(used.has(id), `${entry.id} claims unused focus ${id}`)
    }
  }
})

check('listening hides transcripts and every task hides fluent English answers', () => {
  for (const entry of CEFR_PREPARATION_ACTIVITIES) {
    assert.ok(entry.answerBoundary.forbiddenBeforeAttempt.includes('fluent English answer'), `${entry.id} lacks answer boundary`)
    const serialized = JSON.stringify(entry)
    assert.doesNotMatch(serialized, /answerEnglish|translationEnglish|englishAnswer/i, `${entry.id} embeds an English answer field`)
    walk(entry, (value, path) => {
      if (value.channel !== 'continuous-audio') return
      assert.equal(value.beforeAttempt, 'audio-only', `${entry.id}${path} reveals listening text`)
      assert.match(value.transcriptReveal, /^after-/u, `${entry.id}${path} transcript is not delayed`)
      assert.equal(value.transcript.kind, 'albanian', `${entry.id}${path} has no token-bound transcript`)
    })
  }
})

check('deterministic composition tasks show the exact communicative target before scoring', () => {
  const idsRequiringVisibleGoal = [
    'a1-need-substitution',
    'a1-focused-village-spelling',
    'a1-village-phrase-arrangement',
    'a1-two-sentence-recombination',
    'a2-reason-slot-frame',
    'a2-message-reconstruction',
  ]
  for (const id of idsRequiringVisibleGoal) {
    const entry = buildPreparationActivity(id)
    assert.ok(entry.visibleGoal?.length >= 20, `${id} scores a target that is not shown to the learner`)
  }

  const recombination = buildPreparationActivity('a1-two-sentence-recombination')
  assert.equal(evaluatePreparationResponse(recombination.id, { orderedIds: ['place', 'need'] }).passed, true)
  assert.equal(evaluatePreparationResponse(recombination.id, { orderedIds: ['need', 'place'] }).passed, true,
    'the other coherent sentence order is incorrectly rejected')

  const message = buildPreparationActivity('a2-message-reconstruction')
  assert.equal(evaluatePreparationResponse(message.id, {
    messageIds: ['tomorrow', 'meeting', 'place', 'time'], replyId: 'accept',
  }).passed, true, 'a reviewed natural placement of time and place is incorrectly rejected')
})

check('gist precedes detail and detail stays gated by a gist response', () => {
  const tasks = CEFR_PREPARATION_ACTIVITIES.filter(({ kind }) => kind === 'gist-then-detail')
  assert.ok(tasks.length)
  for (const entry of tasks) {
    assert.deepEqual(entry.rounds.map(({ kind }) => kind), ['gist', 'detail'])
    assert.equal(entry.rounds[0].unlock, 'initial')
    assert.equal(entry.rounds[1].unlock, 'after-gist-response')
    assert.deepEqual(entry.response.requiredRoundIds, ['gist', 'detail'])
  }
})

check('record/replay/retry is local, non-persistent and makes no pronunciation inference', () => {
  const tasks = CEFR_PREPARATION_ACTIVITIES.filter(({ kind }) => kind === 'local-audio-cycle')
  assert.ok(tasks.some(({ level }) => level === 'A1'))
  assert.ok(tasks.some(({ level }) => level === 'A2'))
  for (const entry of tasks) {
    assert.equal(entry.privacy.persistRecording, false)
    assert.equal(entry.privacy.uploadRecording, false)
    assert.equal(entry.privacy.inference, 'none')
    assert.ok(entry.cycle.some((step) => step.includes('replay')))
    assert.equal(entry.response.retryAlwaysAvailable, true)
    assert.equal(evaluatePreparationResponse(entry.id, { recorded: true, replayed: false, selfCheck: 'ready' }).passed, false)
    assert.equal(evaluatePreparationResponse(entry.id, { recorded: true, replayed: true, selfCheck: 'ready' }).passed, true)
  }
})

check('conversation repair changes the next Albanian prompt', () => {
  const tasks = CEFR_PREPARATION_ACTIVITIES.filter(({ kind }) => kind === 'branching-repair')
  assert.ok(tasks.some(({ level }) => level === 'A1'))
  assert.ok(tasks.some(({ level }) => level === 'A2'))
  for (const entry of tasks) {
    const repair = entry.replyOptions.find(({ intent }) => intent === 'repair')
    assert.ok(repair, `${entry.id} has no repair turn`)
    const next = nextPreparationPrompt(entry.id, repair.id)
    assert.equal(next?.kind, 'albanian', `${entry.id} repair has no next prompt`)
    assert.notEqual(normalize(next.text), normalize(entry.opening.text), `${entry.id} only repeats the same prompt`)
    const result = evaluatePreparationResponse(entry.id, { optionId: repair.id })
    assert.equal(result.simplified, true, `${entry.id} repair is not supportive`)
  }
})

check('branching dialogue exposes only relevant replies and reaches a semantic completion', () => {
  const tasks = CEFR_PREPARATION_ACTIVITIES.filter(({ response }) => response.kind === 'branch-by-intent')
  for (const entry of tasks) {
    const optionIds = new Set(entry.replyOptions.map(({ id }) => id))
    const initialIds = entry.initialReplyOptionIds || [...optionIds]
    assert.ok(initialIds.length >= 2, `${entry.id} has no meaningful initial choice`)
    for (const id of initialIds) assert.ok(optionIds.has(id), `${entry.id} exposes unknown initial reply ${id}`)

    const visit = (path, allowedIds, seen = new Set()) => {
      const stateKey = `${path.join('>')}|${allowedIds.join(',')}`
      assert.ok(!seen.has(stateKey), `${entry.id} loops without a completing reply: ${stateKey}`)
      const nextSeen = new Set(seen).add(stateKey)
      let canComplete = false
      for (const id of allowedIds) {
        assert.ok(optionIds.has(id), `${entry.id} branch exposes unknown reply ${id}`)
        const result = evaluatePreparationResponse(entry.id, { optionIds: [...path, id] })
        if (result.passed) {
          canComplete = true
          continue
        }
        if (result.reason !== 'continue-branch') continue
        assert.equal(result.nextPrompt?.kind, 'albanian', `${entry.id}:${id} continues without an Albanian turn`)
        assert.ok(result.nextReplyOptionIds.length, `${entry.id}:${id} continues without relevant replies`)
        if (visit([...path, id], result.nextReplyOptionIds, nextSeen)) canComplete = true
      }
      return canComplete
    }

    assert.equal(visit([], initialIds), true, `${entry.id} has no completing path`)
  }

  const a2 = buildPreparationActivity('a2-meeting-branch-repair')
  assert.equal(evaluatePreparationResponse(a2.id, { optionIds: ['confirm-well'] }).passed, false,
    'the place answer leaked into the first turn')
  assert.equal(evaluatePreparationResponse(a2.id, { optionIds: ['time'] }).reason, 'continue-branch')
  assert.equal(evaluatePreparationResponse(a2.id, { optionIds: ['time', 'confirm-well'] }).passed, true)
  assert.equal(evaluatePreparationResponse(a2.id, { optionIds: ['repair', 'time', 'change-to-bridge'] }).passed, true)
})

check('reviewed preparation copy avoids known non-standard shortcuts', () => {
  for (const { activityId, path, value } of albanianSurfaces) {
    assert.doesNotMatch(value.text, /\bte pus(?:[.!?]|$)/iu, `${activityId}${path} needs the definite form “te pusi”`)
    assert.doesNotMatch(value.text, /\b(?:tetë|dhjetë) lek(?:[.!?]|$)/iu, `${activityId}${path} needs plural “lekë” after a number`)
    assert.doesNotMatch(value.text, /\bnuk mund nesër\b/iu, `${activityId}${path} omits the action after “nuk mund”`)
  }
})

check('multiple valid replies are explicit without treating an unrelated answer as correct', () => {
  const tasks = CEFR_PREPARATION_ACTIVITIES.filter(({ kind }) => kind === 'accepted-reply-set')
  assert.ok(tasks.some(({ level }) => level === 'A1'))
  assert.ok(tasks.some(({ level }) => level === 'A2'))
  for (const entry of tasks) {
    assert.ok(entry.response.acceptedOptionIds.length >= 2, `${entry.id} has only one accepted reply`)
    for (const id of entry.response.acceptedOptionIds) {
      assert.equal(evaluatePreparationResponse(entry.id, { optionId: id }).passed, true)
    }
    const unrelated = entry.options.find(({ intent }) => intent === 'unrelated' || intent === 'different-need')
    assert.equal(evaluatePreparationResponse(entry.id, { optionId: unrelated.id }).passed, false)
  }
})

check('temporal and connector practice covers the full A2 contract', () => {
  const temporal = CEFR_PREPARATION_ACTIVITIES.find(({ kind }) => kind === 'temporal-sequence')
  assert.deepEqual(new Set(temporal.cards.map(({ time }) => time)), new Set(['past', 'present', 'near-future']))
  const connectors = CEFR_PREPARATION_ACTIVITIES.find(({ kind }) => kind === 'connector-slots')
  assert.deepEqual(new Set(connectors.sentences.map(({ correctSenseId }) => correctSenseId)), new Set(['dhe', 'por', 'sepse']))
  assert.deepEqual(new Set(connectors.sentences.map(({ relation }) => relation)), new Set(['addition', 'contrast', 'reason']))
})

check('scan-and-relay separates source access from the person who needs the fact', () => {
  const tasks = CEFR_PREPARATION_ACTIVITIES.filter(({ kind }) =>
    ['scan-and-relay', 'main-point-relay-and-agree'].includes(kind))
  assert.ok(tasks.some(({ level }) => level === 'A1'))
  assert.ok(tasks.some(({ level }) => level === 'A2'))
  for (const entry of tasks) {
    assert.ok(entry.source?.kind === 'albanian', `${entry.id} has no source`)
    assert.ok(entry.recipient?.npcId && NPCS[entry.recipient.npcId], `${entry.id} has no real recipient`)
    assert.ok(entry.sourceHolder, `${entry.id} source ownership is unclear`)
    assert.notEqual(entry.sourceHolder, entry.recipient.npcId, `${entry.id} recipient already owns the source`)
  }
})

check('all 38 exact capstone trainWith labels resolve to implemented same-level preparation', () => {
  const labels = new Set(Object.values(CEFR_CAPSTONE_TASK_FAMILIES).flatMap(({ trainWith }) => trainWith))
  assert.deepEqual(new Set(Object.keys(CEFR_TRAIN_WITH_MECHANIC_MAP)), labels)
  for (const [familyId, family] of Object.entries(CEFR_CAPSTONE_TASK_FAMILIES)) {
    for (const label of family.trainWith) {
      const mechanicIds = CEFR_TRAIN_WITH_MECHANIC_MAP[label]
      assert.ok(mechanicIds.length, `${familyId}:${label} is not trained`)
      assert.ok(mechanicIds.some((id) => {
        const mechanic = CEFR_PREPARATION_MECHANICS[id]
        return mechanic && (mechanic.level === family.level || (family.level === 'A2' && mechanic.level === 'A1'))
      }), `${familyId}:${label} maps only beyond ${family.level}`)
    }
    assert.ok(preparationMechanicsForCapstone(familyId).length >= 2, `${familyId} has too little preparation`)
  }
})

check('preparation stimuli are not copied into the held-out capstone bank', () => {
  const capstoneStimuli = new Map()
  for (const task of CEFR_TASKS) {
    for (const key of ['scriptSq', 'textSq', 'sourceSq']) {
      if (task.stimulus?.[key]) capstoneStimuli.set(normalize(task.stimulus[key]), task.id)
    }
  }
  const trainingStimuli = []
  for (const entry of CEFR_PREPARATION_ACTIVITIES) {
    for (const key of ['source', 'opening', 'model']) if (entry[key]?.kind === 'albanian') trainingStimuli.push([entry.id, entry[key].text])
    if (entry.stimulus?.transcript?.kind === 'albanian') trainingStimuli.push([entry.id, entry.stimulus.transcript.text])
  }
  for (const [activityId, text] of trainingStimuli) {
    assert.ok(!capstoneStimuli.has(normalize(text)), `${activityId} duplicates held-out ${capstoneStimuli.get(normalize(text))}`)
  }
})

check('readiness uses semantic word capabilities, prior mechanics and A1-before-A2', () => {
  assert.ok(CEFR_PREPARATION_EVIDENCE_CONTRACT.principles.some((line) => line.includes('lifetime token totals')))
  const a1 = preparationReadiness('a1-audio-meaning', {})
  assert.equal(a1.ready, false)
  assert.ok(a1.reasons.every((reason) => reason.startsWith('requires-capability:')))

  const allPassedCapabilities = Object.fromEntries(Object.keys(DICT).map((id) => [id, {
    capabilities: Object.fromEntries(CEFR_PREPARATION_SOURCE_REGISTRIES.wordCapabilities.map(
      ({ id: capabilityId }) => [capabilityId, { status: 'passed' }],
    )),
  }]))
  const firstReady = preparationReadiness('a1-audio-meaning', { wordCapabilities: allPassedCapabilities })
  assert.equal(firstReady.ready, true)
  const a2WithoutA1 = preparationReadiness('a2-gist-detail', { wordCapabilities: allPassedCapabilities })
  assert.equal(a2WithoutA1.ready, false)
  assert.ok(a2WithoutA1.reasons.includes('requires-level:A1'))
  const a2WithA1 = preparationReadiness('a2-gist-detail', { wordCapabilities: allPassedCapabilities, achievedLevels: ['A1'] })
  assert.equal(a2WithA1.ready, true)

  const formConditional = structuredClone(allPassedCapabilities)
  for (const snapshot of Object.values(formConditional)) {
    snapshot.capabilities['reviewed-form-awareness'] = { status: 'inapplicable' }
  }
  assert.equal(preparationReadiness('a2-gist-detail', {
    wordCapabilities: formConditional,
    achievedLevels: ['A1'],
  }).ready, true, 'a non-inflecting focus was deadlocked by a conditional form gate')
  const untrainedNonInflecting = structuredClone(formConditional)
  const firstGistFocus = CEFR_PREPARATION_ACTIVITIES.find(
    ({ mechanicId }) => mechanicId === 'a2-gist-detail',
  ).focusSenseIds[0]
  untrainedNonInflecting[firstGistFocus].capabilities['meaning-recognition'] = { status: 'pending' }
  assert.equal(preparationReadiness('a2-gist-detail', {
    wordCapabilities: untrainedNonInflecting,
    achievedLevels: ['A1'],
  }).ready, false, 'an inapplicable form lane skipped an earlier meaning prerequisite')
  const blocked = structuredClone(allPassedCapabilities)
  blocked[firstGistFocus].capabilities['reviewed-form-awareness'] = { status: 'not-trainable' }
  assert.equal(preparationReadiness('a2-gist-detail', {
    wordCapabilities: blocked,
    achievedLevels: ['A1'],
  }).ready, false, 'a not-trainable lexical focus silently satisfied readiness')
})

check('every mechanic has a deterministic, executable example', () => {
  assert.deepEqual(Object.keys(CEFR_PREPARATION_EXAMPLES).sort(), Object.keys(CEFR_PREPARATION_MECHANICS).sort())
  for (const [mechanicId, example] of Object.entries(CEFR_PREPARATION_EXAMPLES)) {
    const entry = buildPreparationActivity(example.activityId)
    assert.equal(entry?.mechanicId, mechanicId, `${mechanicId} example uses the wrong activity`)
    const result = evaluatePreparationResponse(example.activityId, example.answer)
    if (example.expectedNextText) {
      assert.equal(result.nextPrompt?.text, example.expectedNextText, `${mechanicId} deterministic branch changed`)
      assert.equal(result.simplified, true)
    } else {
      assert.equal(result.passed, true, `${mechanicId} example does not pass: ${result.reason}`)
    }
  }
})

if (failures.length) {
  console.error(`\n${failures.length} CEFR preparation audit failure(s).`)
  process.exit(1)
}

console.log(`\nCEFR preparation audit passed: ${CEFR_PREPARATION_STAGES.length} stages, ${Object.keys(CEFR_PREPARATION_MECHANICS).length} mechanics, ${CEFR_PREPARATION_ACTIVITIES.length} activities, ${albanianSurfaces.length} token-bound Albanian surfaces, ${Object.keys(CEFR_TRAIN_WITH_MECHANIC_MAP).length} capstone training labels.`)
