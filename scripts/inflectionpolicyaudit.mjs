// Strict contract for the first safe non-noun morphology coverage floor.
// It does not pretend to contain complete conjugations: every changing surface
// already authored in playable content must be declared, sense-pinned and
// reachable in Train; broader paradigms require separate linguistic review.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { DICT, FORM_FREQ, HEART_LEVELS, ITEMS, STORY } from '../src/game/content.js'
import { SEASONS, WEATHER_TYPES } from '../src/game/environment.js'
import {
  PLAYABLE_FORM_INVENTORY,
  formTrackForSense,
  playableFormUsage,
  trainingForms,
} from '../src/game/formInventory.js'
import { WORD_CLASS, wordClassOf } from '../src/game/wordClassPolicy.js'
import { NOUN_PARADIGM_BACKLOG_IDS } from '../src/game/nounRegistry.js'
import { REVIEWED_GENERATED_FORM_SURFACES } from '../src/game/gameState.js'
import { FORMS_UNLOCK_THRESHOLD, formsUnlocked } from '../src/game/formInventory.js'
import { completedWordProgress } from '../src/game/wordProgression.js'
import {
  ENVIRONMENT_DIMENSIONS,
  ENVIRONMENT_NARRATION_SETTINGS,
  environmentStoryLine,
  purseStoryLine,
} from '../src/game/storyContext.js'

const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
const tokensOf = (entry) => Array.isArray(entry) ? entry : entry?.line || []
const knownClasses = new Set(Object.values(WORD_CLASS))
const counts = Object.fromEntries([...knownClasses].map((name) => [name, { senses: 0, variants: 0 }]))

// Independently reconstruct the entire playable lexical surface set. Do not
// call an inventory helper here: this comparison is what catches a future
// playable language source that the production inventory forgot to harvest.
const independentlyUsed = new Map(Object.keys(DICT).map((id) => [id, new Set()]))
let generatedEnvironmentCases = 0
let generatedPurseCases = 0
const collect = (tokens, location) => {
  assert.ok(tokens == null || Array.isArray(tokens), `${location}: output is not a token line`)
  for (const [index, token] of (tokens || []).entries()) {
    if (!token?.id) continue
    assert.ok(DICT[token.id], `${location}: unknown dictionary sense ${token.id}`)
    const declaration = (DICT[token.id].forms || []).find((form) => lower(form.al) === lower(token.al))
    if (declaration?.trainable === false) {
      assert.match(declaration.tag, /Fragment$/, `${location}: non-trainable ${token.al} needs a fragment tag`)
      assert.equal(lower(tokens[index - 1]?.al || ''), 'mos', `${location}: ${token.al} escaped its reviewed negative-imperative context`)
    }
    independentlyUsed.get(token.id).add(lower(token.al))
  }
}
for (const [nodeId, node] of Object.entries(STORY)) {
  node.text.forEach((entry, index) => collect(tokensOf(entry), `STORY.${nodeId}.text[${index}]`))
  node.options.forEach((option, index) => collect(option.text, `STORY.${nodeId}.options[${index}]`))
}
for (const [itemId, item] of Object.entries(ITEMS)) {
  for (const [actionId, action] of Object.entries(item)) {
    if (Array.isArray(action?.phrase)) collect(action.phrase, `ITEMS.${itemId}.${actionId}.phrase`)
  }
}
for (const [heartCount, level] of Object.entries(HEART_LEVELS)) {
  collect(tokensOf(level.line), `HEART_LEVELS.${heartCount}.line`)
  collect(tokensOf(level.heal?.phrase), `HEART_LEVELS.${heartCount}.heal.phrase`)
}
for (const setting of ENVIRONMENT_NARRATION_SETTINGS) {
  for (const season of SEASONS) {
    for (const weather of WEATHER_TYPES) {
      for (let clock = 0; clock < 24; clock++) {
        for (let mask = 0; mask < 2 ** ENVIRONMENT_DIMENSIONS.length; mask++) {
          const omit = ENVIRONMENT_DIMENSIONS.filter((_, index) => mask & (1 << index))
          collect(
            tokensOf(environmentStoryLine({ clock, season, weather }, { setting, omit })),
            `environment:${setting}:${season}:${weather}:${clock}:omit-${mask}`,
          )
          generatedEnvironmentCases++
        }
      }
    }
  }
}
for (const balance of [1, Number.MAX_SAFE_INTEGER]) {
  collect(tokensOf(purseStoryLine(balance)), `purse:${balance}`)
  generatedPurseCases++
}
assert.equal(generatedEnvironmentCases, 7680, 'generated environment state enumeration drifted')
assert.equal(generatedPurseCases, 2, 'generated purse boundary enumeration drifted')

// Core state deliberately avoids importing the large lazy Train inventory.
// Prove its tiny generated-surface allow-list is neither stale nor permissive:
// it must equal precisely the non-lemma playable surfaces which are absent
// from both authored FORM_FREQ evidence and a reviewed dictionary paradigm.
const generatedOnlyPairs = []
for (const [id, entry] of Object.entries(DICT)) {
  const lemma = lower(entry.al)
  const paradigm = new Set((entry.forms || []).map((form) => lower(form.al)))
  for (const surface of independentlyUsed.get(id)) {
    if (surface !== lemma && !FORM_FREQ[id]?.has(surface) && !paradigm.has(surface)) {
      generatedOnlyPairs.push(`${id}:${surface}`)
    }
  }
}
const allowedGeneratedPairs = Object.entries(REVIEWED_GENERATED_FORM_SURFACES)
  .flatMap(([id, surfaces]) => surfaces.map((surface) => `${id}:${lower(surface)}`))
assert.deepEqual(
  allowedGeneratedPairs.sort(),
  generatedOnlyPairs.sort(),
  'core generated-form allow-list drifted from independently enumerated playable surfaces',
)

for (const [id, entry] of Object.entries(DICT)) {
  const usage = playableFormUsage(id)
  const inventoryUsage = new Set(usage.keys())
  assert.deepEqual(
    [...inventoryUsage].sort(),
    [...independentlyUsed.get(id)].sort(),
    `${id}: production form inventory omitted or invented a playable surface`,
  )
  const lemma = lower(entry.al)
  const usedVariants = [...usage.keys()].filter((surface) => surface !== lemma)
  const expectedClass = wordClassOf(id, entry, { hasAttestedVariant: usedVariants.length > 0 })
  const track = formTrackForSense(id)
  const inventory = PLAYABLE_FORM_INVENTORY[id]
  const quiz = trainingForms(id)
  assert.ok(inventory?.length, `${id}: no form-inventory lemma row`)
  assert.ok(knownClasses.has(track.wordClass), `${id}: unknown word class ${track.wordClass}`)
  assert.equal(track.wordClass, expectedClass, `${id}: unstable word-class classification`)
  assert.equal(track.hasNounRoleStep, entry.formTrack === 'noun', `${id}: noun remediation boundary drifted`)

  const inventorySurfaces = new Set(inventory.map((form) => lower(form.al)))
  const quizSurfaces = new Set(quiz.map((form) => lower(form.al)))
  assert.ok(inventorySurfaces.has(lemma), `${id}: lemma absent from inventory`)
  for (const surface of usedVariants) {
    assert.ok(inventorySurfaces.has(surface), `${id}/${surface}: playable surface is undeclared`)
    const declaration = (entry.forms || []).find((form) => lower(form.al) === surface)
    if (declaration?.trainable === false) {
      assert.match(declaration.tag, /Fragment$/, `${id}/${surface}: non-trainable surface lacks an explicit fragment tag`)
    } else {
      assert.ok(quizSurfaces.has(surface), `${id}/${surface}: playable surface is not quiz-reachable for its sense`)
    }
  }
  if (usedVariants.length) {
    assert.equal(
      formsUnlocked({
        practiced: { [id]: FORMS_UNLOCK_THRESHOLD },
        wordProgress: { [id]: completedWordProgress() },
      }, id),
      true,
      `${id}: reviewed playable forms cannot pass the production unlock gate`,
    )
    assert.equal(
      formsUnlocked({ practiced: { [id]: FORMS_UNLOCK_THRESHOLD } }, id),
      false,
      `${id}: lifetime rewards bypassed the lexical-production gate`,
    )
  }
  for (const form of entry.forms || []) {
    assert.ok(inventorySurfaces.has(lower(form.al)), `${id}/${form.al}: dictionary form is undeclared`)
    if (form.trainable === false) {
      assert.match(form.tag, /Fragment$/, `${id}/${form.al}: non-trainable form lacks an explicit fragment tag`)
      assert.equal(quizSurfaces.has(lower(form.al)), false, `${id}/${form.al}: bound fragment leaked into Train`)
    } else {
      assert.ok(quizSurfaces.has(lower(form.al)), `${id}/${form.al}: dictionary form is not quiz-reachable`)
    }
  }

  if (track.wordClass === WORD_CLASS.NON_INFLECTING) {
    assert.equal(usedVariants.length, 0, `${id}: changing playable surface classified as non-inflecting`)
    assert.equal(entry.forms?.length || 0, 0, `${id}: declared forms classified as non-inflecting`)
  }
  if (track.wordClass === WORD_CLASS.NOUN) {
    if (entry.formTrack === 'noun') {
      assert.equal(track.coverage, 'reviewed-paradigm', `${id}: reviewed noun coverage drifted`)
      assert.ok(inventory.every((form) => form.source === 'paradigm'), `${id}: noun form leaked from contextual harvesting`)
    } else {
      assert.ok(NOUN_PARADIGM_BACKLOG_IDS.has(id), `${id}: declared noun has neither a paradigm nor backlog entry`)
      assert.equal(track.coverage, 'noun-paradigm-backlog', `${id}: unfinished noun overclaims a reviewed paradigm`)
      assert.equal(track.hasNounRoleStep, false, `${id}: unfinished noun entered noun-role practice`)
    }
  } else if (usedVariants.length) {
    assert.equal(track.coverage, 'reviewed-playable-surfaces', `${id}: non-noun coverage overclaims a full paradigm`)
  }

  counts[track.wordClass].senses += 1
  counts[track.wordClass].variants += inventory.filter((form) => lower(form.al) !== lemma).length
}

for (const id of ['qendroj', 'largohem', 'gaboj', 'filloj', 'mbetem', 'vendos']) {
  assert.equal(formTrackForSense(id).wordClass, WORD_CLASS.VERB, `${id}: reviewed verb misclassified`)
}
assert.equal(
  formTrackForSense('rendesishem').wordClass,
  WORD_CLASS.ADJECTIVE,
  'rendesishem: reviewed adjective misclassified',
)

const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordForms/, 'Train does not consume the shared word-form family')
assert.match(practice, /const forms = trainingForms\(answerId\)/, 'form question builder bypasses the shared inventory')
assert.match(practice, /trainingForms\(id\)\.some/, 'form eligibility bypasses the shared inventory')
assert.match(practice, /q\.hasNounRoleStep\s*\?\s*buildNounEndingRefresher/s, 'noun correction is not guarded by word class')
assert.doesNotMatch(practice, /What does the ending do here\?/, 'general form quiz still calls every change a noun ending')
assert.ok(!existsSync(new URL('./gen_forms.mjs', import.meta.url)), 'unsafe heuristic noun generator still exists')
assert.ok(!existsSync(new URL('./data/forms_block.js', import.meta.url)), 'stale fabricated noun-form artifact still exists')

console.log('✓ every playable changing surface is sense-pinned; standalone forms are quiz-reachable and bound fragments stay contextual.')
console.log(`  independently compared ${generatedEnvironmentCases} generated environment states, ${generatedPurseCases} purse boundaries, all health lines/actions, story lines/options and item actions.`)
for (const [name, value] of Object.entries(counts)) console.log(`  ${name}: ${value.senses} senses; ${value.variants} non-lemma surfaces`)
console.log(`  coverage floor: ${formTrackForSense('troket').coverage}; complete non-noun paradigms remain future reviewed work.`)
