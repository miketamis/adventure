// Validate the held-out CEFR transfer bank used by the implemented internal
// readiness gate. Learner self-review, piloting and external standard-setting
// remain explicit boundaries on what that implementation can claim.

import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { DICT, STORY } from '../src/game/content.js'
import { CEFR_CAPSTONE_TASK_FAMILIES, CEFR_LEVEL_GATES } from '../src/game/cefrProgression.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { PLAYABLE_FORM_INVENTORY } from '../src/game/formInventory.js'
import {
  CEFR_ACOUSTIC_VOICES,
  CEFR_AUTHORED_TASK_COUNTS,
  CEFR_TASK_SCHEMA_VERSION,
  CEFR_TASKS,
  CEFR_TASKS_BY_FAMILY,
  CEFR_VOICES,
  cefrTasksFor,
} from '../src/game/cefrTasks.js'

const failures = []
const strict = process.argv.includes('--strict')
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
  .toLocaleLowerCase('sq')
  .normalize('NFC')
  .replace(/[.!?,:;—–\-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const sqStringsOf = (value, key = '') => {
  if (typeof value === 'string') return /(?:Sq|scriptSq|textSq|sourceSq|speakerSq|followUpSq)$/.test(key) ? [value] : []
  if (Array.isArray(value)) return value.flatMap((entry) => sqStringsOf(entry, key))
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([childKey, child]) => sqStringsOf(child, childKey))
}

const allKeysOf = (value) => {
  if (Array.isArray(value)) return value.flatMap(allKeysOf)
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([key, child]) => [key, ...allKeysOf(child)])
}

const minimumFamilyCounts = Object.fromEntries(Object.entries(CEFR_CAPSTONE_TASK_FAMILIES)
  .map(([familyId, family]) => [familyId, family.minimumForms]))

check('schema, family keys, minimum counts and IDs are stable', () => {
  assert.equal(CEFR_TASK_SCHEMA_VERSION, 1)
  assert.deepEqual(Object.keys(CEFR_TASKS_BY_FAMILY).sort(), Object.keys(CEFR_CAPSTONE_TASK_FAMILIES).sort())
  assert.equal(CEFR_TASKS.length, Object.values(CEFR_AUTHORED_TASK_COUNTS).reduce((sum, count) => sum + count, 0))
  for (const [familyId, minimumCount] of Object.entries(minimumFamilyCounts)) {
    const count = CEFR_AUTHORED_TASK_COUNTS[familyId]
    assert.ok(count >= minimumCount, `${familyId} has ${count}; needs at least ${minimumCount}`)
    assert.deepEqual(
      CEFR_TASKS_BY_FAMILY[familyId].map(({ id }) => id),
      Array.from({ length: count }, (_, index) => `${familyId}-${String(index + 1).padStart(2, '0')}`),
      `${familyId} ID sequence drifted`,
    )
  }
  assert.deepEqual(cefrTasksFor({ level: 'A1' }), CEFR_TASKS.filter(({ level }) => level === 'A1'))
})

check('performance families keep enough reserve forms for formative misses', () => {
  for (const [familyId, family] of Object.entries(CEFR_CAPSTONE_TASK_FAMILIES)) {
    if (['listening', 'reading'].includes(family.mode)) continue
    const passingNeeded = CEFR_LEVEL_GATES[family.level].performance.minimumPassingTasksPerMode
    assert.ok(CEFR_AUTHORED_TASK_COUNTS[familyId] >= passingNeeded * 2, `${familyId} has no two-times performance reserve`)
  }
})

check('every task agrees with its declared family, level and mode', () => {
  const ids = new Set()
  for (const task of CEFR_TASKS) {
    assert.ok(!ids.has(task.id), `duplicate task ID ${task.id}`)
    ids.add(task.id)
    const family = CEFR_CAPSTONE_TASK_FAMILIES[task.familyId]
    assert.ok(family, `${task.id} has unknown family ${task.familyId}`)
    assert.equal(task.level, family.level, `${task.id} has wrong level`)
    assert.equal(task.mode, family.mode, `${task.id} has wrong mode`)
    assert.equal(task.heldOut, true, `${task.id} is not held out`)
    assert.ok(task.prompt.length >= 25, `${task.id} prompt is underspecified`)
    assert.ok(task.stimulus && typeof task.stimulus === 'object', `${task.id} stimulus missing`)
    assert.ok(task.storyAnchor.location && task.storyAnchor.npc, `${task.id} lacks a world anchor`)
    assert.ok(task.storyAnchor.placeLabel && task.storyAnchor.placeLabel !== 'village road', `${task.id} lacks a reviewed player-facing place label`)
    assert.ok(task.storyAnchor.npcLabel && task.storyAnchor.npcLabel !== 'a villager', `${task.id} lacks a reviewed player-facing NPC label`)
    assert.ok(task.storyAnchor.beat.length >= 30, `${task.id} has a thin story beat`)
    assert.ok(task.topic, `${task.id} lacks a topic`)
    assert.equal(task.response.attemptBeforeReveal, true, `${task.id} can reveal before an attempt`)
  }
})

check('every world anchor resolves to a real story node and NPC registry identity', () => {
  const npcDirectory = new URL('../src/game/data/npcs/', import.meta.url)
  const registryIds = new Set(readdirSync(npcDirectory)
    .filter((file) => file.endsWith('.js'))
    .flatMap((file) => [...readFileSync(new URL(file, npcDirectory), 'utf8').matchAll(/^  ([A-Za-z0-9_]+): \{/gm)]
      .map((match) => match[1])))
  for (const task of CEFR_TASKS) {
    assert.ok(STORY[task.storyAnchor.location], `${task.id} references unknown story node ${task.storyAnchor.location}`)
    assert.ok(registryIds.has(task.storyAnchor.npc), `${task.id} references unknown NPC ${task.storyAnchor.npc}`)
    assert.doesNotMatch(task.storyAnchor.placeLabel, /[a-z][A-Z]/, `${task.id} leaks a camelCase place ID to players`)
    assert.doesNotMatch(task.storyAnchor.npcLabel, /[a-z][A-Z]/, `${task.id} leaks a camelCase NPC ID to players`)
    if (task.voice && task.voice.id !== 'learner') {
      assert.equal(task.voice.id, task.storyAnchor.npc, `${task.id} voice identity does not match its anchored NPC`)
      assert.equal(task.voice.speakerIdentityId, task.voice.id, `${task.id} conflates speaker identity with its acoustic voice`)
      assert.equal(task.voice.acousticVoiceId, task.voice.synthesisVoice, `${task.id} acoustic voice alias drifted`)
    }
  }
})

check('reception forms have deterministic, non-leaking questions', () => {
  for (const task of CEFR_TASKS.filter(({ mode }) => ['listening', 'reading'].includes(mode))) {
    assert.equal(task.response.kind, 'choice', `${task.id} is not deterministically selectable`)
    assert.ok(task.questions.length >= 1, `${task.id} has no questions`)
    if (task.level === 'A2') {
      assert.deepEqual(task.questions.map(({ kind }) => kind), ['gist', 'detail'], `${task.id} must test gist then detail`)
    }
    for (const question of task.questions) {
      assert.ok(question.prompt.length >= 15, `${task.id}/${question.id} prompt is too short`)
      assert.ok(question.choices.length >= 3, `${task.id}/${question.id} lacks plausible options`)
      assert.ok(question.choices.every(({ labelSq }) => typeof labelSq === 'string' && labelSq.length > 0), `${task.id}/${question.id} has an empty Albanian choice`)
      assert.equal(new Set(question.choices.map(({ id }) => id)).size, question.choices.length, `${task.id}/${question.id} repeats a choice ID`)
      assert.equal(new Set(question.choices.map(({ labelSq }) => normalize(labelSq))).size, question.choices.length, `${task.id}/${question.id} repeats a visible choice`)
      assert.equal(question.acceptedChoiceIds.length, 1, `${task.id}/${question.id} needs one deterministic key`)
      assert.ok(question.choices.some(({ id }) => question.acceptedChoiceIds.includes(id)), `${task.id}/${question.id} key is absent from choices`)
      assert.ok(question.acceptedSemanticConcepts.length, `${task.id}/${question.id} has no semantic criterion`)
    }
    assert.equal(task.rubric.kind, 'deterministic-reception')
    assert.ok(task.rubric.focus.length >= 30, `${task.id} has no task-specific reception focus`)
  }
})

check('A2 distractors are task-relevant peers and detail prompts identify the requested fact', () => {
  const a2Reception = CEFR_TASKS.filter(({ level, mode }) => level === 'A2' && ['listening', 'reading'].includes(mode))
  const acceptedGistsByCategory = new Map()
  for (const task of a2Reception) {
    const gist = task.questions.find(({ kind }) => kind === 'gist')
    const accepted = gist.choices.find(({ id }) => gist.acceptedChoiceIds.includes(id))
    const labels = acceptedGistsByCategory.get(gist.choiceCategory) || new Set()
    labels.add(normalize(accepted.labelSq))
    acceptedGistsByCategory.set(gist.choiceCategory, labels)
  }

  const forbiddenFiller = new Set([
    'sot nuk ka problem',
    'nuk vjen njeri sot',
    'tregon për një mbret të vjetër',
    'këtu nuk ka rrugë',
  ])
  for (const task of a2Reception) {
    for (const question of task.questions) {
      assert.ok(question.choiceCategory, `${task.id}/${question.id} lacks a semantic choice category`)
      assert.ok(question.distractorPolicy, `${task.id}/${question.id} lacks an authored distractor policy`)
      assert.ok(question.choices.every(({ choiceCategory }) => choiceCategory === question.choiceCategory), `${task.id}/${question.id} mixes choice categories`)
      assert.ok(question.choices.every(({ labelSq }) => !forbiddenFiller.has(normalize(labelSq))), `${task.id}/${question.id} retains generic filler`)
      if (question.kind === 'detail') {
        assert.doesNotMatch(question.prompt, /Which detail (?:do you need to remember|helps you act)/i, `${task.id}/${question.id} uses an arbitrary detail prompt`)
        assert.ok(question.prompt.length >= 25, `${task.id}/${question.id} detail prompt is not task-specific`)
      } else {
        const peerAnswers = acceptedGistsByCategory.get(question.choiceCategory)
        for (const choice of question.choices.filter(({ id }) => !question.acceptedChoiceIds.includes(id))) {
          assert.ok(peerAnswers.has(normalize(choice.labelSq)), `${task.id}/${question.id} distractor is not a valid same-context peer answer`)
        }
      }
    }
  }
})

check('reviewed gist, relay and reserve meanings preserve the source facts', () => {
  const tasks = new Map(CEFR_TASKS.map((task) => [task.id, task]))
  const acceptedLabel = (taskId, kind) => {
    const question = tasks.get(taskId).questions.find((entry) => entry.kind === kind)
    return question.choices.find(({ id }) => question.acceptedChoiceIds.includes(id)).labelSq
  }

  assert.equal(acceptedLabel('a2-unseen-listening-13', 'gist'), 'Ka një dhomë për njëqind lekë')
  assert.equal(acceptedLabel('a2-unseen-listening-13', 'detail'), 'Në orën tetë')
  assert.equal(acceptedLabel('a2-unseen-listening-18', 'gist'), 'Darka është nesër në mbrëmje')
  assert.equal(acceptedLabel('a2-unseen-listening-24', 'gist'), 'Pastaj jam në bujtinë')
  assert.equal(acceptedLabel('a2-unseen-listening-24', 'detail'), 'Në bujtinë')
  assert.equal(acceptedLabel('a2-unseen-reading-11', 'gist'), 'Koha e rrugës për tri vende')

  const alternatives = (concept) => {
    const task = CEFR_TASKS.find((entry) => entry.requirements?.some((requirement) =>
      requirement.acceptedSemanticConcepts.includes(concept)))
    const requirement = task?.requirements.find((entry) => entry.acceptedSemanticConcepts.includes(concept))
    assert.ok(requirement, `missing reviewed alternatives for ${concept}`)
    return requirement.acceptedAlternativesSq.map(normalize)
  }
  for (const text of alternatives('market:collect-before-ten')) {
    assert.match(text, /elira/u, `market relay loses the collection place: ${text}`)
    assert.match(text, /dhjetë/u, `market relay loses the deadline: ${text}`)
  }
  for (const text of alternatives('meeting:tomorrow-nine-well')) {
    assert.match(text, /nëntë/u, `meeting relay loses the exact time: ${text}`)
    assert.match(text, /pusi/u, `meeting relay loses the place: ${text}`)
  }
  for (const text of alternatives('meeting:tomorrow-morning-well')) {
    assert.match(text, /mëngjes/u, `weather-plan relay loses the time: ${text}`)
    assert.match(text, /pusi/u, `weather-plan relay loses the place: ${text}`)
  }

  const healerRelay = tasks.get('a2-practical-relay-01')
  assert.match(healerRelay.stimulus.sourceSq, /fëmijës.+fëmija/u, 'healer instruction leaves the patient implicit')
  const reserveHelp = tasks.get('a2-written-exchange-05')
  assert.match(reserveHelp.stimulus.textSq, /ujë i pastër.+fashë/u, 'reserve help prompt does not state the inherited request')
  const reservePerson = tasks.get('a1-spoken-portrait-04')
  assert.ok(reservePerson.stimulus.cues.includes('your relationship'), 'reserve person prompt omits its relationship requirement')

  const purchase = tasks.get('a2-live-dialogue-01')
  assert.match(purchase.stimulus.turns[0].speakerSq, /shishe ujë/u, 'limited-stock follow-up has no stable item')
  assert.ok(alternatives('purchase:item-and-quantity').every((text) => /shishe ujë/u.test(text)),
    'purchase alternatives can make the fixed stock reply incoherent')
  const healerDialogue = tasks.get('a2-live-dialogue-04')
  assert.match(healerDialogue.stimulus.turns[0].followUpSq, /ilaç.+pas darkës/u,
    'healer dialogue asks the learner to check advice that was never given')
  assert.ok(alternatives('invitation:contribution').some((text) => /nuk mund/u.test(text)),
    'declining the invitation has no coherent contribution reply')
})

check('listening scripts remain audio-only until the attempt is finished', () => {
  const supportedAcousticVoices = new Set(CEFR_ACOUSTIC_VOICES)
  assert.deepEqual([...supportedAcousticVoices], ['sq-AL-AnilaNeural', 'sq-AL-IlirNeural'])
  for (const task of CEFR_TASKS.filter(({ mode }) => mode === 'listening')) {
    assert.equal(task.stimulus.kind, 'continuous-audio', `${task.id} is not continuous audio`)
    assert.equal(task.stimulus.preAttemptSurface, 'audio-only', `${task.id} exposes text before attempt`)
    assert.equal(task.stimulus.transcriptReveal, 'after-final-attempt', `${task.id} reveals its transcript too early`)
    assert.ok(task.stimulus.scriptSq.length >= 20, `${task.id} script is too short`)
    assert.equal(task.voice.locale, 'sq-AL', `${task.id} voice has wrong locale`)
    assert.ok(CEFR_VOICES[task.voice.id], `${task.id} uses an undeclared voice`)
    assert.ok(supportedAcousticVoices.has(task.voice.synthesisVoice), `${task.id} uses unsupported Albanian TTS ${task.voice.synthesisVoice}`)
  }
  assert.equal(new Set(Object.values(CEFR_VOICES).map(({ synthesisVoice }) => synthesisVoice)).size, 2, 'bank must use both supported acoustic voices')
})

check('the reception bank meets speaker, topic and text-type breadth', () => {
  const a1Listening = CEFR_TASKS_BY_FAMILY['a1-unseen-listening']
  const a1Reading = CEFR_TASKS_BY_FAMILY['a1-unseen-reading']
  const a2Listening = CEFR_TASKS_BY_FAMILY['a2-unseen-listening']
  const a2Reading = CEFR_TASKS_BY_FAMILY['a2-unseen-reading']
  assert.ok(new Set(a1Listening.map(({ voice }) => voice.id)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a1-unseen-listening'].minimumSpeakerIdentities)
  assert.ok(new Set(a1Listening.map(({ voice }) => voice.synthesisVoice)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a1-unseen-listening'].minimumAcousticVoices)
  assert.ok(new Set(a1Reading.map(({ textType }) => textType)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a1-unseen-reading'].minimumTextTypes)
  assert.ok(new Set(a2Listening.map(({ voice }) => voice.id)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a2-unseen-listening'].minimumSpeakerIdentities)
  assert.ok(new Set(a2Listening.map(({ voice }) => voice.synthesisVoice)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a2-unseen-listening'].minimumAcousticVoices)
  assert.ok(new Set(a2Listening.map(({ topic }) => topic)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a2-unseen-listening'].minimumTopicFamilies)
  assert.ok(new Set(a2Reading.map(({ textType }) => textType)).size >= CEFR_CAPSTONE_TASK_FAMILIES['a2-unseen-reading'].minimumTextTypes)
  assert.equal(new Set(a2Listening.map(({ topic }) => topic)).size, 6)
  assert.equal(new Set(a2Reading.map(({ textType }) => textType)).size, 6)
})

check('performance tasks carry meaningful response evidence and the shared gate rubric', () => {
  for (const task of CEFR_TASKS.filter(({ mode }) => !['listening', 'reading'].includes(mode))) {
    const family = CEFR_CAPSTONE_TASK_FAMILIES[task.familyId]
    const gate = CEFR_LEVEL_GATES[task.level]
    assert.ok(task.requirements.length >= 1, `${task.id} has no communicative requirement`)
    assert.equal(new Set(task.requirements.map(({ id }) => id)).size, task.requirements.length, `${task.id} repeats a requirement`)
    for (const requirement of task.requirements) {
      assert.equal(requirement.required, true, `${task.id}/${requirement.id} is optional`)
      assert.ok(requirement.prompt.length >= 10, `${task.id}/${requirement.id} is underspecified`)
      assert.ok(requirement.acceptedSemanticConcepts.length, `${task.id}/${requirement.id} has no semantic concept`)
      assert.ok(requirement.acceptedAlternativesSq.length >= 2, `${task.id}/${requirement.id} needs two post-attempt Albanian alternatives`)
      assert.equal(new Set(requirement.acceptedAlternativesSq.map(normalize)).size, requirement.acceptedAlternativesSq.length, `${task.id}/${requirement.id} repeats an alternative`)
    }
    assert.equal(task.rubric.kind, 'analytic-performance', `${task.id} has wrong rubric kind`)
    assert.deepEqual(task.rubric.dimensions, gate.performance.dimensions, `${task.id} rubric dimensions drifted`)
    assert.equal(task.rubric.passFloorEachDimension, gate.performance.passFloorEachDimension, `${task.id} pass floor drifted`)
    assert.ok(task.rubric.focus.length >= 35, `${task.id} has no task-specific focus`)
    assert.ok(task.rubric.criticalEvidence.length >= 1, `${task.id} has no critical evidence`)
    if (family.minimumTurns) assert.ok(task.response.minimumTurns >= family.minimumTurns, `${task.id} has too few turns`)
    if (family.minimumSeconds) assert.ok(task.response.minimumSeconds >= family.minimumSeconds, `${task.id} is too short`)
    if (family.minimumWords) assert.ok(task.response.minimumWords >= family.minimumWords, `${task.id} word target is too short`)
    if (family.requiresAudioCapture) {
      assert.match(task.response.kind, /^recorded-/, `${task.id} does not capture speech`)
      assert.equal(task.voice.locale, 'sq-AL', `${task.id} lacks Albanian voice metadata`)
    }
  }
})

check('reserve performance forms are independent and cover their stated cues', () => {
  const expectedRequirements = {
    'a1-spoken-portrait-03': ['name', 'origin', 'home'],
    'a1-spoken-portrait-04': ['person', 'relationship', 'fact'],
    'a1-written-exchange-04': ['location', 'meeting', 'closing'],
    'a1-free-writing-03': ['identity', 'person', 'place', 'need'],
    'a1-free-writing-04': ['destination', 'items', 'return'],
    'a1-simple-relay-04': ['direction'],
    'a2-spoken-portrait-04': ['people', 'home', 'routine', 'connectors'],
    'a2-spoken-portrait-05': ['work', 'series', 'reason'],
    'a2-spoken-portrait-06': ['past', 'conditions', 'next', 'connectors'],
    'a2-written-exchange-05': ['accept', 'limit', 'arrival'],
    'a2-written-exchange-06': ['place', 'time', 'confirm', 'follow-up'],
    'a2-free-writing-04': ['past', 'present', 'problem', 'next', 'links'],
    'a2-free-writing-05': ['past-problem', 'effect', 'solution', 'time', 'links'],
    'a2-free-writing-06': ['routine', 'person', 'setting', 'plan', 'links'],
    'a2-practical-relay-05': ['time', 'place', 'agreement'],
    'a2-practical-relay-06': ['weather', 'meeting', 'reply'],
  }
  const taskById = new Map(CEFR_TASKS.map((task) => [task.id, task]))
  const reserves = CEFR_TASKS.filter(({ reserveOf }) => reserveOf)
  assert.deepEqual(reserves.map(({ id }) => id).sort(), Object.keys(expectedRequirements).sort(), 'reserve form set drifted without editorial review')
  for (const task of reserves) {
    const base = taskById.get(task.reserveOf)
    assert.ok(base, `${task.id} references unknown base ${task.reserveOf}`)
    assert.equal(task.familyId, base.familyId, `${task.id} changed family from its base form`)
    assert.equal(task.level, base.level, `${task.id} changed level from its base form`)
    assert.equal(task.mode, base.mode, `${task.id} changed mode from its base form`)
    assert.notEqual(normalize(task.prompt), normalize(base.prompt), `${task.id} simply repeats its base prompt`)
    assert.notDeepEqual(task.stimulus, base.stimulus, `${task.id} simply repeats its base stimulus`)
    assert.deepEqual(task.requirements.map(({ id }) => id), expectedRequirements[task.id], `${task.id} requirements no longer match its reviewed prompt/cues`)
    assert.ok(task.rubric.criticalEvidence.length >= Math.min(2, task.requirements.length), `${task.id} has too little critical evidence for its requirements`)
    if (task.stimulus.cues) {
      assert.ok(task.stimulus.cues.length >= task.requirements.length - 1, `${task.id} has fewer cues than its requirements can support`)
    }
  }
})

check('held-out stimuli do not duplicate Train phrases or one another', () => {
  const drillTexts = new Set(EVERYDAY_PHRASE_DRILLS.map(({ al }) => normalize(al)))
  const seenStimuli = new Map()
  for (const task of CEFR_TASKS) {
    const stimulusTexts = sqStringsOf(task.stimulus).map(normalize).filter(Boolean)
    assert.ok(stimulusTexts.length || ['visual-prompt', 'fresh-topic-card', 'scene-prompt'].includes(task.stimulus.kind), `${task.id} has no Albanian stimulus or fresh prompt card`)
    for (const text of stimulusTexts) {
      assert.ok(!drillTexts.has(text), `${task.id} duplicates a Train phrase: ${text}`)
      const owner = seenStimuli.get(text)
      assert.ok(!owner, `${task.id} duplicates stimulus from ${owner}: ${text}`)
      seenStimuli.set(text, task.id)
    }
  }
})

check('task records contain no fluent answer fields, chat shorthand or private markers', () => {
  const forbiddenAnswerKeys = new Set(['en', 'english', 'translation', 'answerText', 'fullEnglish'])
  for (const task of CEFR_TASKS) {
    for (const key of allKeysOf(task)) assert.ok(!forbiddenAnswerKeys.has(key), `${task.id} contains forbidden answer key ${key}`)
    for (const text of sqStringsOf(task)) {
      assert.doesNotMatch(text, /\b(?:eshte|cfare|shtepi|miremengjes|falemnerit)\b/i, `${task.id} contains unreviewed compressed/ascii Albanian`)
    }
  }
  const source = readFileSync(new URL('../src/game/cefrTasks.js', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /WhatsApp|chatScreenshot|\.private\//i)
  assert.doesNotMatch(source, /\+355\s*\d/)
  assert.doesNotMatch(source, /\[\d{1,2}:\d{2},\s*\d{1,2}\/\d{1,2}\/\d{4}\]/)
})

const wordTokens = (value) => [...String(value || '').normalize('NFC').toLocaleLowerCase('sq').matchAll(/[\p{L}]+/gu)]
  .map((match) => match[0])
const taughtSurfaces = new Set()
const addTaughtSurface = (surface) => wordTokens(surface).forEach((token) => taughtSurfaces.add(token))
for (const entry of Object.values(DICT)) {
  addTaughtSurface(entry.al)
  for (const form of entry.forms || []) addTaughtSurface(form.al)
}
for (const forms of Object.values(PLAYABLE_FORM_INVENTORY)) for (const form of forms) addTaughtSurface(form.al)
// Only proper names and place names may bypass the taught-surface inventory.
// Digits and punctuation never enter `wordTokens`, so there is no hidden
// lexical allowlist for ordinary Albanian words.
const lexicalAllowlist = new Set(['elira', 'elirën', 'elirës', 'mihal', 'mihali', 'mihalin', 'mihalit', 'korçë'])
const lexicalUnknowns = new Map()
for (const task of CEFR_TASKS) {
  for (const text of sqStringsOf(task)) {
    for (const token of wordTokens(text)) {
      if (taughtSurfaces.has(token) || lexicalAllowlist.has(token)) continue
      const tasks = lexicalUnknowns.get(token) || new Set()
      tasks.add(task.id)
      lexicalUnknowns.set(token, tasks)
    }
  }
}
if (strict) {
  check('all Albanian task surfaces are taught before the held-out assessment', () => {
    assert.equal(lexicalUnknowns.size, 0, [...lexicalUnknowns].map(([token, tasks]) => `${token} (${[...tasks].join(', ')})`).join('; '))
  })
}

console.log('')
console.log('=== Held-out CEFR task bank ===')
for (const [familyId, count] of Object.entries(CEFR_AUTHORED_TASK_COUNTS)) console.log(`${familyId}: ${count}`)
console.log(`total: ${CEFR_TASKS.length} independently authored forms`)
console.log(`A2 listening breadth: ${new Set(CEFR_TASKS_BY_FAMILY['a2-unseen-listening'].map(({ topic }) => topic)).size} topics / ${new Set(CEFR_TASKS_BY_FAMILY['a2-unseen-listening'].map(({ voice }) => voice.id)).size} speaker identities / ${new Set(CEFR_TASKS_BY_FAMILY['a2-unseen-listening'].map(({ voice }) => voice.synthesisVoice)).size} acoustic voices`)
console.log(`A2 reading breadth: ${new Set(CEFR_TASKS_BY_FAMILY['a2-unseen-reading'].map(({ textType }) => textType)).size} text types`)
if (lexicalUnknowns.size) {
  console.log(`lexical prerequisites still to teach: ${lexicalUnknowns.size} surfaces`)
  console.log([...lexicalUnknowns].map(([token]) => token).sort((a, b) => a.localeCompare(b, 'sq')).join(', '))
  if (!strict) console.log('△ Run with --strict when the A2 teaching tranche lands; unknown task surfaces will then block release.')
} else {
  console.log('lexical prerequisites: every Albanian task surface is in the taught dictionary/form inventory')
}

if (failures.length) {
  console.error(`\n${failures.length} CEFR task-bank failure(s).`)
  process.exitCode = 1
} else {
  console.log('\n✓ Held-out A1/A2 task-bank contract is internally coherent.')
}
