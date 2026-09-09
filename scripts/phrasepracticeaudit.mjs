// Release contract for whole-phrase training. These checks use only the public,
// independently authored curriculum and never private research inputs.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { DICT } from '../src/game/content.js'
import { audioSlug } from '../src/game/audio.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import {
  phraseProductionFocusIds,
  phraseProductionFocuses,
} from '../src/game/phraseFocus.js'
import {
  PHRASE_NOUN_ROLES,
  phraseNounOccurrences,
  phraseNounRole,
} from '../src/game/phraseNounRoles.js'
import {
  PHRASE_PROGRESS_VERSION,
  PHRASE_INITIAL_REVIEW_GAP,
  emptyPhraseProductionProgress,
} from '../src/game/phraseProgression.js'
import {
  PHRASE_EXERCISE_MODES,
  PHRASE_SKILL_MAX_TIER,
  buildPhraseQuestion,
  containsExcludedPhraseWord,
  normalizePhraseAnswer,
  phraseAnswerDiagnostic,
  phraseAnswerResult,
  phraseAnswerIsCorrect,
  phraseQuestionWordKeys,
  phraseRewardIds,
  phraseWordKeys,
  phraseWords,
  trainQuestionWordKeys,
} from '../src/game/phrasePractice.js'

const failures = []
const check = (name, fn) => {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
    console.log(`✗ ${name}`)
  }
}
const steadyRng = () => 0.417
const tierForMode = Object.freeze({ cloze: 0, arrange: 1, type: 4, listen: 2, match: 2 })
const unlockedState = (phrases) => {
  const state = newRun()
  for (const id of phraseRewardIds(phrases)) state.discovered[id] = true
  return state
}

check('phrase tokenization keeps Albanian words and contractions, not punctuation', () => {
  assert.deepEqual(phraseWords("S'ka gjë. Shihemi nesër!"), ["S'ka", 'gjë', 'Shihemi', 'nesër'])
  assert.equal(normalizePhraseAnswer('  ÇFARË do të thotë?! '), 'çfarë do të thotë')
  assert.equal(phraseAnswerIsCorrect('s’ka gjë shihemi nesër', "S'ka gjë. Shihemi nesër."), true)
  assert.equal(phraseAnswerIsCorrect('cka gje', 'çka gjë'), false, 'diacritics were silently discarded')
  assert.equal(phraseAnswerIsCorrect('cka gje', 'çka gjë', 'beginner'), true, 'beginner diacritic leeway disappeared')
  assert.deepEqual(
    phraseAnswerResult('jam mire, falimendarit. po ti', 'Jam mirë, faleminderit. Po ti?', 'beginner'),
    { correct: true, usedLeeway: true },
    'bounded first-spelling leeway rejected the intended phrase',
  )
  assert.equal(
    phraseAnswerIsCorrect('jam mire, falimendarit. po ti', 'Jam mirë, faleminderit. Po ti?'),
    false,
    'mastered spelling silently kept beginner typo leeway',
  )
  assert.equal(
    phraseAnswerIsCorrect('jam mire pershendetje po ti', 'jam mirë faleminderit po ti', 'beginner'),
    false,
    'a different phrase passed as a beginner near-match',
  )
  assert.equal(
    phraseAnswerIsCorrect('jam mire po ti', 'jam mirë faleminderit po ti', 'beginner'),
    false,
    'a missing word passed as spacing tolerance',
  )
  assert.deepEqual(phraseWordKeys(" S’KA, GJE\u0308! "), ["s'ka", 'gjë'])
  assert.notDeepEqual(phraseWordKeys('cka gje'), phraseWordKeys('çka gjë'), 'Albanian letters were folded')

  const village = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === 'going-village')
  const nounMiss = phraseAnswerDiagnostic('po shkoj në fshati', village.al, village)
  assert.deepEqual(
    nounMiss,
    { kind: 'word', focusId: 'fshat', expectedSurface: 'fshat', expectedTag: 'indefAcc', answerSurface: 'fshati' },
    'a phrase noun error lost the exact expected and learner surfaces needed by remediation',
  )
  assert.equal(
    phraseNounRole(village.id, 'fshat'),
    'indefAcc',
    'the syncretic village surface lost its authored contextual noun role',
  )
})

check('beginner leeway never turns a reviewed noun-form substitution into mastery', () => {
  const normalized = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
  const beginnerLetters = (value) => normalized(value).replace(/ë/g, 'e').replace(/ç/g, 'c')
  let guardedAlternatives = 0
  let nounOccurrences = 0

  for (const phrase of EVERYDAY_PHRASE_DRILLS) {
    const words = phraseWords(phrase.al)
    const occurrences = phraseNounOccurrences(phrase)
    const independentlyMapped = words.flatMap((word, index) => phrase.requires
      .filter((id) => DICT[id]?.formTrack === 'noun' && DICT[id].forms.some((form) =>
        normalized(form.al) === normalized(word)))
      .map((id) => `${index}:${id}`))
    assert.deepEqual(
      occurrences.map(({ id, index }) => `${index}:${id}`),
      independentlyMapped,
      `${phrase.id}: lazy noun-role ledger is missing or adding a phrase noun`,
    )
    for (const occurrence of occurrences) {
      nounOccurrences += 1
      const tag = phraseNounRole(phrase.id, occurrence.id)
      assert.ok(tag, `${phrase.id}/${occurrence.id}: missing reviewed contextual noun role`)
      assert.ok(
        DICT[occurrence.id].forms.some((form) =>
          form.tag === tag && normalized(form.al) === normalized(occurrence.word)),
        `${phrase.id}/${occurrence.id}: ${occurrence.word} is not the declared ${tag} form`,
      )

      const alternatives = [...new Set(DICT[occurrence.id].forms.map((form) => form.al))]
        .filter((surface) =>
          normalized(surface) !== normalized(occurrence.word) &&
          beginnerLetters(surface) !== beginnerLetters(occurrence.word))
      for (const surface of alternatives) {
        const attempt = [...words]
        attempt[occurrence.index] = surface
        assert.equal(
          phraseAnswerIsCorrect(attempt.join(' '), phrase.al, 'beginner', {
            target: phrase,
            typeScope: 'phrase',
          }),
          false,
          `${phrase.id}: accepted ${surface} in place of ${occurrence.word}`,
        )
        guardedAlternatives += 1
      }

      const different = alternatives[0]
      if (different) {
        const attempt = [...words]
        attempt[occurrence.index] = different
        const diagnostic = phraseAnswerDiagnostic(attempt.join(' '), phrase.al, phrase)
        assert.equal(diagnostic.kind, 'word', `${phrase.id}/${occurrence.id}: noun miss became broad`)
        assert.equal(diagnostic.focusId, occurrence.id, `${phrase.id}/${occurrence.id}: wrong diagnostic noun`)
        assert.equal(diagnostic.expectedTag, tag, `${phrase.id}/${occurrence.id}: diagnostic lost contextual role`)
      }
    }
  }

  assert.ok(nounOccurrences >= 25, 'noun-bearing phrase coverage unexpectedly shrank')
  assert.equal(
    nounOccurrences,
    Object.values(PHRASE_NOUN_ROLES).reduce((total, roles) => total + Object.keys(roles).length, 0),
    'reviewed noun-role ledger contains a stale row',
  )
  assert.ok(guardedAlternatives >= 200, 'reviewed alternate-form regression coverage unexpectedly shrank')

  const village = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === 'going-village')
  const focusContext = { target: village, typeScope: 'word', focusId: 'fshat' }
  assert.equal(phraseAnswerIsCorrect('fshati', 'fshat', 'beginner', focusContext), false)
  assert.equal(phraseAnswerIsCorrect('fsht', 'fshat', 'beginner', focusContext), true)
  const work = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === 'at-work')
  assert.equal(
    phraseAnswerIsCorrect('jam në pune', work.al, 'beginner', { target: work, typeScope: 'phrase' }),
    true,
    'noun-form guard removed intended ë/ç tolerance',
  )
})

check('consecutive phrase rounds share no Albanian words, including matching rounds', () => {
  const previous = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
    rng: steadyRng,
    mode: 'match',
    tier: tierForMode.match,
  })
  assert.equal(previous.mode, 'match')
  const previousWords = phraseQuestionWordKeys(previous)
  assert.deepEqual(
    previousWords,
    [...new Set(previous.phrases.flatMap((phrase) => phraseWordKeys(phrase.al)))],
    'matching did not contribute every phrase',
  )

  for (const mode of PHRASE_EXERCISE_MODES) {
    const next = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
      rng: steadyRng,
      mode,
      tier: tierForMode[mode],
      excludeWords: previousWords,
      distractorPool: EVERYDAY_PHRASE_DRILLS,
    })
    assert.ok(next, `${mode} found no non-repeating question`)
    assert.equal(next.mode, mode, `${mode} was not generated`)
    const repeated = phraseQuestionWordKeys(next).filter((word) => previousWords.includes(word))
    assert.deepEqual(repeated, [], `${mode} repeated ${repeated.join(', ')}`)
    for (const tile of next.bank || []) {
      assert.ok(!previousWords.includes(phraseWordKeys(tile.text)[0]), `${mode} repeated ${tile.text} in its bank`)
    }
  }
})

check('word, context and endings rounds carry the same no-repeat boundary', () => {
  assert.deepEqual(
    trainQuestionWordKeys({ kind: 'normal', lexicalSurfaces: ['MIRË!'] }),
    ['mirë'],
  )
  assert.deepEqual(
    trainQuestionWordKeys({ kind: 'ctx', lexicalSurfaces: ["S’KA gje\u0308."] }),
    ["s'ka", 'gjë'],
  )
  assert.deepEqual(
    trainQuestionWordKeys({ kind: 'forms', lexicalSurfaces: ['vajzë', 'VAJZE\u0308N'] }),
    ['vajzë', 'vajzën'],
  )
  assert.equal(containsExcludedPhraseWord('Jam mirë.', ['JAM']), true)
  assert.equal(containsExcludedPhraseWord('Jam mirë.', ['mirë']), true)
  assert.equal(containsExcludedPhraseWord('çka', ['cka']), false, 'Albanian diacritics were folded')

  const practiceSource = fs.readFileSync('src/components/PracticeView.jsx', 'utf8')
  assert.match(practiceSource, /const excludeWords = previousQuestionWords\.current\.length/)
  assert.match(practiceSource, /excludeWords,/)
  assert.match(practiceSource, /previousQuestionWords\.current = trainQuestionWordKeys\(nextQuestion\)/)
  assert.match(practiceSource, /buildQuestion\(discoveredIds, state\.mana, excludeWords\)/)
  assert.match(practiceSource, /buildFormsQuestion\([\s\S]+excludeWords/)
  assert.match(
    practiceSource,
    /nextQuestion = \{ kind: TRAIN_SCHEDULER_SAFEGUARDS\.exhaustedPoolOutcome \}/,
    'an exhausted schedule did not pause without repeating a word',
  )
  assert.doesNotMatch(practiceSource, /buildQuestion\(discoveredIds, state\.mana\)\s*$/m)

  const questionSource = fs.readFileSync('src/components/PhrasePracticeQuestion.jsx', 'utf8')
  assert.match(
    questionSource,
    /phraseAnswerResult\(typed, q\.typingAnswer, q\.answerTolerance, q\)/,
    'typing omitted the noun-aware tolerance context',
  )
  assert.match(questionSource, /q\.mode === 'cloze'[\s\S]+className="answers phrase-cloze-answers"/)
  assert.match(questionSource, /onClick=\{\(\) => chooseCloze\(tile\)\}/)
  assert.doesNotMatch(questionSource, /const needed = q\.mode === 'cloze'/)
})

check(`all ${EVERYDAY_PHRASE_DRILLS.length} phrases build valid construction, listening and cloze rounds`, () => {
  for (const target of EVERYDAY_PHRASE_DRILLS) {
    const words = phraseWords(target.al)
    assert.ok(words.length >= 2, `${target.id} is single-word vocabulary, not a phrase`)
    assert.deepEqual(phraseRewardIds([target]), [...new Set(target.requires)], `${target.id} rewards drifted`)
    for (const word of words) {
      assert.ok(fs.existsSync(`public/audio/${audioSlug(word)}.mp3`), `${target.id} lacks audio for ${word}`)
    }
    assert.ok(fs.existsSync(`public/audio/${audioSlug(target.al)}.mp3`), `${target.id} lacks continuous phrase audio`)
    for (const mode of ['listen', 'type']) {
      const q = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
        rng: steadyRng,
        mode,
        tier: tierForMode[mode],
        targetId: target.id,
      })
      assert.equal(q.target.id, target.id)
      assert.equal(q.mode, mode)
      assert.deepEqual(q.answerWords, words)
    }
    const spelling = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
      rng: steadyRng,
      mode: 'type',
      tier: 2,
      targetId: target.id,
    })
    assert.equal(spelling.typeScope, 'word', `${target.id} skipped individual-word spelling`)
    assert.ok(target.requires.includes(spelling.focusId), `${target.id} spelling focus is not canonical`)
    assert.deepEqual(spelling.rewardIds, [spelling.focusId], `${target.id} spelling rewarded other words`)
    assert.equal(spelling.typingAnswer, spelling.answerWords[spelling.blankIndex], `${target.id} spells a lemma outside its phrase`)
    assert.equal(phraseWords(spelling.typingAnswer).length, 1, `${target.id} word spelling asks for several words`)
    assert.equal(spelling.typingCue, target.en, `${target.id} word spelling lost its phrase cue`)
    for (const mode of ['arrange', 'cloze']) {
      const q = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
        rng: steadyRng,
        mode,
        tier: tierForMode[mode],
        targetId: target.id,
      })
      assert.equal(q.mode, mode)
      assert.ok(q.bank.length > (mode === 'cloze' ? 1 : words.length), `${target.id} ${mode} lacks distractors`)
      const answerTiles = q.bank.filter((tile) => tile.answerIndex != null)
      assert.equal(answerTiles.length, mode === 'cloze' ? 1 : words.length)
      if (mode === 'cloze') assert.equal(answerTiles[0].text, q.correctWord)
    }
  }
})

check('all five suitable phrase exercise families are generated', () => {
  const target = EVERYDAY_PHRASE_DRILLS.find((entry) => phraseWords(entry.al).length >= 4)
  for (const mode of PHRASE_EXERCISE_MODES) {
    const q = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, { [target.id]: 3 }, {}, {
      rng: steadyRng,
      mode,
      tier: tierForMode[mode],
      targetId: target.id,
    })
    assert.equal(q.mode, mode)
    if (mode === 'match') {
      assert.equal(q.phrases.length, 4)
      assert.equal(new Set(q.left.map((entry) => entry.id)).size, 4)
      assert.equal(new Set(q.right.map((entry) => entry.id)).size, 4)
    }
  }
})

check('a first unlocked phrase still receives useful distractor words', () => {
  const target = EVERYDAY_PHRASE_DRILLS.find((entry) => phraseWords(entry.al).length >= 4)
  for (const mode of ['arrange', 'listen', 'cloze']) {
    const q = buildPhraseQuestion([target], {}, {}, {}, {
      rng: steadyRng,
      mode,
      tier: tierForMode[mode],
      targetId: target.id,
      distractorPool: EVERYDAY_PHRASE_DRILLS,
    })
    const answerTileCount = mode === 'cloze' ? 1 : phraseWords(target.al).length
    assert.ok(q.bank.length >= answerTileCount + 3, `${mode} did not add three distractors`)
    assert.ok(q.bank.filter((tile) => tile.answerIndex == null).length >= 3)
  }
})

const finish = (state, question, overrides = {}) => reducer(state, {
  type: 'PRACTICE_PHRASE_RESULT',
  correct: true,
  phraseIds: question.phraseIds,
  rewardIds: question.rewardIds,
  skill: question.skill,
  tier: question.tier,
  questionKey: question.questionKey,
  mode: question.mode,
  typeScope: question.typeScope,
  focusId: question.focusId || null,
  diagnostic: null,
  ...overrides,
})

check('production requires two focuses, ordering, every focus spelling, then full writing', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === 'going-village')
  let state = unlockedState([phrase])
  const question = () => buildPhraseQuestion([phrase], state.mana, state.phrasePracticed, state.phraseMistakes, {
    rng: steadyRng,
    distractorPool: EVERYDAY_PHRASE_DRILLS,
    mastery: {
      listening: state.phraseListeningMastery,
      matching: state.phraseMatchingMastery,
    },
    productionProgress: state.phraseProductionProgress,
    currentRound: state.trainRound,
  })
  const waitForPhrase = () => {
    let next = question()
    while (!next || next.skill !== 'production') {
      if (next) state = finish(state, next)
      else state = reducer(state, {
          type: 'TRAIN_ROUND_COMPLETE',
          questionKey: `disjoint:${state.trainRound}`,
          wordKeys: ['ndryshe'],
        })
      next = question()
    }
    return next
  }

  const expectedTiers = [0, 0, 1, 2, 2, 3, 4]
  const focusesSeen = { cloze: [], spelling: [] }
  for (const expectedTier of expectedTiers) {
    const q = waitForPhrase()
    assert.equal(q.skill, 'production')
    assert.equal(q.tier, expectedTier)
    if (expectedTier === 0) focusesSeen.cloze.push(q.focusId)
    if (expectedTier === 2) focusesSeen.spelling.push(q.focusId)
    if ([0, 2].includes(expectedTier)) {
      assert.deepEqual(q.rewardIds, [q.focusId], 'focused proof rewarded the whole phrase')
    }
    state = finish(state, q)
  }
  assert.deepEqual(focusesSeen.cloze, ['shko', 'fshat'])
  assert.deepEqual(focusesSeen.spelling, ['shko', 'fshat'])
  assert.equal(state.phraseMastery[phrase.id], PHRASE_SKILL_MAX_TIER.production)
  assert.equal(state.phraseProductionProgress[phrase.id].strictWins, 1)
  assert.equal(state.phraseProductionProgress[phrase.id].reviewGap, PHRASE_INITIAL_REVIEW_GAP * 2)
})

check('listening and matching tighten on independent axes without lowering production', () => {
  const phrases = EVERYDAY_PHRASE_DRILLS.slice(0, 6)
  const target = phrases[0]
  let state = unlockedState(phrases)
  for (const phrase of phrases) {
    const focusIds = phraseProductionFocusIds(phrase)
    state.phraseProductionProgress[phrase.id] = {
      ...emptyPhraseProductionProgress(),
      clozeWins: 2,
      clozeProofs: focusIds,
      arrangeWins: 1,
      spellingProofs: focusIds,
      independentWins: 1,
      dueAfterRound: 999,
    }
    state.phraseMastery[phrase.id] = 4
  }
  const make = (mode) => buildPhraseQuestion(phrases, state.mana, state.phrasePracticed, state.phraseMistakes, {
    rng: steadyRng,
    mode,
    targetId: target.id,
    distractorPool: EVERYDAY_PHRASE_DRILLS,
    mastery: {
      listening: state.phraseListeningMastery,
      matching: state.phraseMatchingMastery,
    },
    productionProgress: state.phraseProductionProgress,
    currentRound: state.trainRound,
  })

  for (const [tier, extras] of [[0, 2], [1, 3], [2, 5]]) {
    const listen = make('listen')
    assert.equal(listen.tier, tier)
    assert.equal('showEnglishCue' in listen, false, 'listening exposed an English-cue switch')
    assert.equal(listen.bank.filter((tile) => tile.answerIndex == null).length, extras)
    state = finish(state, listen)
    assert.equal(state.phraseMastery[target.id], 4, 'listening lowered production mastery')
  }
  assert.equal(state.phraseListeningMastery[target.id], PHRASE_SKILL_MAX_TIER.listening)

  for (const [tier, pairs] of [[0, 2], [1, 3], [2, 4]]) {
    state = {
      ...state,
      phraseMatchingMastery: Object.fromEntries(phrases.map((phrase) => [phrase.id, tier])),
    }
    const match = make('match')
    assert.equal(match.tier, tier)
    assert.equal(match.phrases.length, pairs)
    assert.deepEqual(match.phraseIds, match.phrases.map((phrase) => phrase.id))
    assert.deepEqual(match.rewardIds, phraseRewardIds(match.phrases))
    state = finish(state, match)
    for (const id of match.phraseIds) {
      assert.equal(
        state.phraseMatchingMastery[id],
        Math.min(PHRASE_SKILL_MAX_TIER.matching, tier + 1),
        `${id} appeared on the board without matching progress`,
      )
    }
    assert.equal(state.phraseMastery[target.id], 4, 'matching lowered production mastery')
  }
  assert.equal(state.phraseMatchingMastery[target.id], PHRASE_SKILL_MAX_TIER.matching)

  const mixedMastery = {
    matching: Object.fromEntries(phrases.map((phrase, index) => [phrase.id, index === 0 ? 1 : 0])),
  }
  const undersized = buildPhraseQuestion(phrases, {}, {}, {}, {
    rng: steadyRng,
    mode: 'match',
    targetId: target.id,
    mastery: mixedMastery,
    productionProgress: state.phraseProductionProgress,
    currentRound: state.trainRound,
  })
  assert.equal(undersized, null, 'a forced one-card matching board escaped the scheduler')
})

check('wrong, stale, locked and forged tier results respect hearts and rewards', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.requires.length >= 2)
  const ready = unlockedState([phrase])
  const q = buildPhraseQuestion([phrase], {}, {}, {}, {
    rng: steadyRng, targetId: phrase.id, distractorPool: EVERYDAY_PHRASE_DRILLS,
  })
  const wrong = finish(ready, q, { correct: false })
  assert.equal(wrong.hearts, ready.hearts - 1)
  assert.equal(wrong.phraseMistakes[phrase.id], 1)
  assert.deepEqual(wrong.mana, ready.mana)
  assert.equal(finish(newRun(), q).mana[q.rewardIds[0]], undefined, 'locked phrase minted a token')
  const completed = finish(ready, q)
  assert.equal(finish(completed, q), completed, 'stale lower-tier result changed state')
  assert.equal(finish(ready, q, { tier: 4 }), ready, 'forged future tier changed state')
  assert.equal(finish(ready, q, { rewardIds: phrase.requires }), ready, 'first gap rewarded the whole phrase')
  assert.equal(finish(ready, q, { phraseIds: ['invented'] }), ready, 'invented phrase changed state')
  assert.equal(
    finish(ready, q, { rewardIds: [...q.rewardIds, 'invented-token'] }),
    ready,
    'forged phrase reward changed state',
  )
})

check('per-skill phrase tiers survive safe save normalization and clamp forged values', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS[0]
  const focusIds = phraseProductionFocusIds(phrase)
  const normalized = normalizeSavedState({
    phrasePracticed: { [phrase.id]: '4', __proto__: { poisoned: true } },
    phraseMistakes: { [phrase.id]: 2.9, constructor: 12 },
    phraseListeningMastery: { [phrase.id]: 999, invented: 2 },
    phraseMatchingMastery: { [phrase.id]: 2.9, constructor: 2 },
  }, newRun())
  assert.equal(normalized.phrasePracticed[phrase.id], 4)
  assert.equal(normalized.phraseMistakes[phrase.id], 2)
  assert.equal(normalized.phraseMastery[phrase.id], undefined, 'old exposure migrated into production')
  assert.equal(normalized.phraseListeningMastery[phrase.id], 2)
  assert.equal(normalized.phraseMatchingMastery[phrase.id], 2)
  assert.equal(normalized.phraseListeningMastery.invented, undefined)
  assert.equal(normalized.phraseMistakes.constructor, Object)
  assert.equal(normalized.phrasePracticed.poisoned, undefined)

  const v2 = normalizeSavedState({
    phraseProgressVersion: PHRASE_PROGRESS_VERSION,
    phraseProductionProgress: {
      [phrase.id]: {
        ...emptyPhraseProductionProgress(),
        clozeWins: 2,
        clozeProofs: focusIds,
        arrangeWins: 1,
      },
    },
  }, newRun())
  assert.equal(v2.phraseMastery[phrase.id], 2, 'reviewed v2 evidence did not survive normalization')
})

check('every reward id still belongs to the public dictionary', () => {
  for (const id of phraseRewardIds(EVERYDAY_PHRASE_DRILLS)) assert.ok(DICT[id], id)
})

console.log(`\n${12 - failures.length}/12 phrase-practice contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
