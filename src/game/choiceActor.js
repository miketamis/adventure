import {
  SPEECH_CHOICE_ACTS,
  isDirectUtteranceChoice,
  nonPlayerSpeechSubjectIds,
} from './speechChoices.js'

// A choice card belongs to the player. It may show the exact words the player
// elects to say, or summarize an action the player elects to perform. It may
// not present an autonomous NPC, companion, prop, or place event as though the
// player controlled that actor. This contract deliberately applies to
// confusers too: an impossible action can test meaning, but it must still be
// an action the player is trying to perform.
export const CHOICE_ACTOR_MODES = Object.freeze([
  'player-action',
  'player-utterance',
])

// Reviewed English is editorial/debug metadata, never learner-facing answer
// text. Its imperative lead gives the actor audit a grammar-independent way
// to distinguish a player command from a finite third-person event across the
// full historical option bank.
const PLAYER_ACTION_OPENING = /^(?:accept|agree|answer|ask|bake|bandage|beg|bind|blind|breathe|bring|browse|build|bury|buy|call|carry|catch|choose|climb|close|collect|come|continue|cross|cut|dance|defend|demand|descend|describe|dig|divide|do|drink|dry|dress|eat|end|enter|extinguish|fall|fight|fill|find|finish|flee|fly|follow|forgive|free|gather|get|give|go|greet|guard|hand|head|hear|help|hide|hold|inspect|join|jump|keep|kill|knock|laugh|leave|leap|let|light|lift|listen|look|lower|make|marry|milk|mourn|open|offer|pass|pay|perform|pick|play|plead|pledge|pray|promise|pull|push|put|read|receive|refuel|refuse|release|remain|remember|remove|repeat|rest|return|ride|rise|rock|run|save|search|see|sell|set|sew|shake|show|sing|sit|sleep|smile|sow|speak|spin|squeeze|stand|stay|step|stop|strike|swear|swim|take|talk|teach|tell|throw|tie|touch|travel|trick|trust|turn|understand|unlock|use|wait|wake|walk|wash|watch|wear|weep|work|write)\b/iu

const DIRECT_ENGLISH_OPENING = /^(?:i\b|i['’]m\b|i am\b|i will\b|i['’]ll\b|we\b|we['’]re\b|we will\b|we['’]ll\b|my\b|yes\b|no\b|hello\b|good(?:bye| morning| day| evening| night)\b|thank|thanks|please\b|sorry\b|what\b|who\b|where\b|when\b|why\b|how\b|do you\b|can you\b|can we\b|may i\b|will you\b|have you\b|are you\b|is there\b|of course\b|all right\b|not now\b)/iu
const QUOTED_SPEECH_SUMMARY = /^(?:say|tell|ask|answer|reply)\b[^\n]*["“”‘’]/iu
const SPEECH_WRAPPER_WITH_CONTENT = /^(?:thuaj|thuaji|pyet|trego|përgjigju)\b[^.!?;]*:/iu
const VOCATIVE_COMMAND_READING = /^[A-ZÇË][^,]{0,40},\s*(?:come|cross|do|go|leave|listen|look|run|stay|stop|take|tell|wait|walk)\b/u
const META_SPEECH_ACTION_READING = /^(?:ask|answer|call|greet|promise|speak|talk|tell)\b/iu

const DIRECT_OPENING_IDS = new Set([
  'une', 'ne_we', 'po_yes', 'jo', 'pershendetje', 'mirmengjes', 'mirdita',
  'mirembrema', 'natenmire', 'mirupafshim', 'faleminderit',
])
const FIRST_PERSON_FINITE_IDS = new Set([
  'jam', 'dua', 'kam', 'mendoj', 'kuptoj',
])

const readingOf = (option) => String(
  option?.choiceReading || option?.text?.optionReading || option?.text?.reading || '',
).trim()

const albanianSurfaceOf = (option) => (option?.text || [])
  .map((token) => String(token?.paren ? token?.en : token?.al || '').trim())
  .filter(Boolean)
  .join(' ')
  .replace(/\s+([.,!?:;])/g, '$1')
  .trim()

const tokenIdsOf = (option) => (option?.text || [])
  .map((token) => token?.id)
  .filter(Boolean)

function looksLikeUnmarkedUtterance(option, reading) {
  const ids = tokenIdsOf(option)
  const firstId = ids[0]
  const secondId = ids[1]
  const albanian = albanianSurfaceOf(option)
  if (DIRECT_ENGLISH_OPENING.test(reading)) return true
  if (QUOTED_SPEECH_SUMMARY.test(reading)) return true
  if (VOCATIVE_COMMAND_READING.test(reading)) return true
  const declaredSpeech = option?.intent === 'speech' || option?.playerIntents?.includes('speech')
  if (declaredSpeech
    && PLAYER_ACTION_OPENING.test(reading)
    && !META_SPEECH_ACTION_READING.test(reading)) return true
  if (SPEECH_WRAPPER_WITH_CONTENT.test(albanian)) return true
  if (DIRECT_OPENING_IDS.has(firstId)) return true
  if (FIRST_PERSON_FINITE_IDS.has(firstId)) return true
  if (firstId === 'nuk' && FIRST_PERSON_FINITE_IDS.has(secondId)) return true
  if (firstId === 'ma' && ids.includes('lut')) return true
  return (option?.text || []).some((token) => token?.paren && token?.en === '?')
}

export function choiceActorReview(option) {
  const declaredSpeechAct = option?.speechAct ?? option?.text?.speechAct
  if (declaredSpeechAct != null && !SPEECH_CHOICE_ACTS.includes(declaredSpeechAct)) {
    return Object.freeze({
      actor: null,
      mode: null,
      issue: `unknown speechAct '${String(declaredSpeechAct)}'`,
    })
  }
  const reading = readingOf(option)
  if (!reading) {
    return Object.freeze({
      actor: null,
      mode: null,
      issue: 'has no exact reviewed English action reading',
    })
  }
  if (isDirectUtteranceChoice(option)) {
    const nonPlayerSubjects = nonPlayerSpeechSubjectIds(option)
    if (nonPlayerSubjects.length) {
      return Object.freeze({
        actor: null,
        mode: null,
        issue: `speechAct assigns the spoken words to a non-player subject (${nonPlayerSubjects.join(', ')})`,
      })
    }
    return Object.freeze({ actor: 'player', mode: 'player-utterance', issue: null })
  }
  if (looksLikeUnmarkedUtterance(option, reading)) {
    return Object.freeze({
      actor: 'player',
      mode: null,
      issue: 'looks like the player\'s exact words but has no explicit speechAct',
    })
  }
  if (PLAYER_ACTION_OPENING.test(reading)) {
    return Object.freeze({ actor: 'player', mode: 'player-action', issue: null })
  }
  return Object.freeze({
    actor: null,
    mode: null,
    issue: 'does not express a player-controlled action or explicit player utterance',
  })
}

export function storyChoiceActorIssues(story) {
  const issues = []
  let choiceCount = 0
  let confuserCount = 0
  let utteranceCount = 0
  let actionCount = 0
  for (const [nodeId, node] of Object.entries(story || {})) {
    for (const [optionIndex, option] of (node?.options || []).entries()) {
      choiceCount += 1
      if (option?.confuser) confuserCount += 1
      const review = choiceActorReview(option)
      if (review.mode === 'player-utterance') utteranceCount += 1
      if (review.mode === 'player-action') actionCount += 1
      if (review.issue) {
        const reading = readingOf(option) || '(missing reviewed reading)'
        issues.push(`${nodeId}.options[${optionIndex}]: ${review.issue}: ${reading}`)
      }
    }
  }
  return Object.freeze({
    issues: Object.freeze(issues),
    choiceCount,
    confuserCount,
    utteranceCount,
    actionCount,
  })
}
