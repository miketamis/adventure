// Release contract for whole-phrase training. These checks use only the public,
// independently authored curriculum and never private research inputs.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { DICT } from '../src/game/content.js'
import { audioSlug } from '../src/game/audio.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import {
  PHRASE_EXERCISE_MODES,
  buildPhraseQuestion,
  normalizePhraseAnswer,
  phraseAnswerIsCorrect,
  phraseRewardIds,
  phraseWords,
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
        targetId: target.id,
      })
      assert.equal(q.target.id, target.id)
      assert.equal(q.mode, mode)
      assert.deepEqual(q.answerWords, words)
    }
    for (const mode of ['arrange', 'cloze']) {
      const q = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
        rng: steadyRng,
        mode,
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
      targetId: target.id,
    })
    assert.equal(q.mode, mode)
    if (mode === 'match') {
      assert.equal(q.phrases.length, 3)
      assert.equal(new Set(q.left.map((entry) => entry.id)).size, 3)
      assert.equal(new Set(q.right.map((entry) => entry.id)).size, 3)
    }
  }
})

check('a first unlocked phrase still receives useful distractor words', () => {
  const target = EVERYDAY_PHRASE_DRILLS.find((entry) => phraseWords(entry.al).length >= 4)
  for (const mode of ['arrange', 'listen', 'cloze']) {
    const q = buildPhraseQuestion([target], {}, {}, {}, {
      rng: steadyRng,
      mode,
      targetId: target.id,
      distractorPool: EVERYDAY_PHRASE_DRILLS,
    })
    const answerTileCount = mode === 'cloze' ? 1 : phraseWords(target.al).length
    assert.ok(q.bank.length >= answerTileCount + 3, `${mode} did not add three distractors`)
    assert.equal(q.bank.filter((tile) => tile.answerIndex == null).length, 3)
  }
})

check('phrase completion atomically rewards every canonical learned sense', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.requires.length >= 4)
  const before = unlockedState([phrase])
  const after = reducer(before, {
    type: 'PRACTICE_PHRASE_RESULT',
    correct: true,
    phraseIds: [phrase.id],
    rewardIds: phrase.requires,
  })
  for (const id of new Set(phrase.requires)) {
    assert.equal(after.mana[id], 1, `${id} did not receive a token`)
    assert.equal(after.practiced[id], 1, `${id} did not receive practice credit`)
  }
  assert.equal(after.mana['invented-token'], undefined, 'caller forged a phrase reward')
  assert.equal(after.phrasePracticed[phrase.id], 1)
  assert.equal(after.hearts, before.hearts)
})

check('matching rewards its three canonical phrases once each', () => {
  const phrases = EVERYDAY_PHRASE_DRILLS.slice(0, 3)
  const before = unlockedState(phrases)
  const after = reducer(before, {
    type: 'PRACTICE_PHRASE_RESULT',
    correct: true,
    phraseIds: phrases.map((phrase) => phrase.id),
    rewardIds: phraseRewardIds(phrases),
  })
  for (const phrase of phrases) assert.equal(after.phrasePracticed[phrase.id], 1)
  for (const id of phraseRewardIds(phrases)) assert.equal(after.mana[id], 1)
})

check('wrong, locked and forged phrase results respect hearts and rewards', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS[0]
  const ready = unlockedState([phrase])
  const wrong = reducer(ready, {
    type: 'PRACTICE_PHRASE_RESULT',
    correct: false,
    phraseIds: [phrase.id],
    rewardIds: phrase.requires,
  })
  assert.equal(wrong.hearts, ready.hearts - 1)
  assert.equal(wrong.phraseMistakes[phrase.id], 1)
  assert.deepEqual(wrong.mana, ready.mana)
  assert.equal(reducer(newRun(), {
    type: 'PRACTICE_PHRASE_RESULT', correct: true, phraseIds: [phrase.id], rewardIds: phrase.requires,
  }).mana[phrase.requires[0]], undefined, 'locked phrase minted a token')
  assert.equal(reducer(ready, {
    type: 'PRACTICE_PHRASE_RESULT', correct: true, phraseIds: ['invented'],
  }), ready, 'invented phrase changed state')
  assert.equal(reducer(ready, {
    type: 'PRACTICE_PHRASE_RESULT',
    correct: true,
    phraseIds: [phrase.id],
    rewardIds: [...phrase.requires, 'invented-token'],
  }), ready, 'forged phrase reward changed state')
})

check('phrase progress survives safe save normalization', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS[0]
  const normalized = normalizeSavedState({
    phrasePracticed: { [phrase.id]: '4', __proto__: { poisoned: true } },
    phraseMistakes: { [phrase.id]: 2.9, constructor: 12 },
  }, newRun())
  assert.equal(normalized.phrasePracticed[phrase.id], 4)
  assert.equal(normalized.phraseMistakes[phrase.id], 2)
  assert.equal(normalized.phraseMistakes.constructor, Object)
  assert.equal(normalized.phrasePracticed.poisoned, undefined)
})

check('every reward id still belongs to the public dictionary', () => {
  for (const id of phraseRewardIds(EVERYDAY_PHRASE_DRILLS)) assert.ok(DICT[id], id)
})

console.log(`\n${9 - failures.length}/9 phrase-practice contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
