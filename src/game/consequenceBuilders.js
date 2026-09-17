import { albanianTextOf } from './language.js'

const reading = (al, en) => ({
  ...(typeof al === 'string' && al.trim() ? { al: al.trim() } : {}),
  ...(typeof en === 'string' && en.trim() ? { en: en.trim() } : {}),
})

export function trainMissConsequence({
  source,
  questionKey,
  attemptedAl,
  attemptedEn,
  reasonCode,
  reason,
  correctAl,
  correctEn,
  reasoning,
  grammarGuide,
}) {
  return {
    source,
    eventId: `${source}:${questionKey}`,
    attempted: reading(attemptedAl, attemptedEn),
    reason: { code: reasonCode, text: reason },
    ...(correctAl || correctEn ? { correction: reading(correctAl, correctEn) } : {}),
    ...(reasoning ? { reasoning } : {}),
    ...(grammarGuide?.pattern ? {
      grammar: {
        id: grammarGuide.id,
        pattern: grammarGuide.pattern,
        target: {
          ...reading(grammarGuide.target?.al, grammarGuide.target?.learnerMeaning),
          tag: grammarGuide.target?.tag,
          role: grammarGuide.target?.role,
        },
        rows: grammarGuide.rows,
        peer: grammarGuide.peer,
        test: grammarGuide.test,
      },
    } : {}),
  }
}

export function storyConfuserConsequence({
  nodeId,
  turn,
  key,
  attemptId,
  tokens,
  english,
  greeting,
  correctGreeting,
  dynamicItem,
}) {
  const attemptSuffix = typeof attemptId === 'string' && attemptId ? `:${attemptId}` : ''
  const eventId = `confuser:${nodeId}:${turn}:${key}${attemptSuffix}`
  if (greeting) {
    return {
      source: 'story-confuser',
      eventId,
      attempted: reading(albanianTextOf(tokens), english),
      reason: {
        code: 'wrong-time-greeting',
        text: `This greeting does not fit the current ${greeting.period} context.`,
      },
      correction: reading(
        correctGreeting ? albanianTextOf(correctGreeting.text) : null,
        correctGreeting?.text?.optionReading,
      ),
    }
  }

  return {
    source: 'story-confuser',
    eventId,
    attempted: reading(albanianTextOf(tokens), english),
    reason: {
      code: dynamicItem ? 'impossible-item-action' : 'impossible-scene-action',
      text: dynamicItem
        ? 'That verb does not match what this carried object can do in the current scene.'
        : 'That action cannot happen in this exact scene: its target is absent, unable to respond, or cannot be used in the way the verb asks.',
    },
    reasoning: 'Choose an action supported by the people, objects and physical possibilities established in the current scene.',
  }
}

export function comprehensionMissConsequence(question, attemptedEnglish, attemptId = null) {
  const attemptSuffix = typeof attemptId === 'string' && attemptId ? `:${attemptId}` : ''
  return {
    source: 'comprehension',
    eventId: `comprehension:${question.id || question.albanian}:${attemptedEnglish}${attemptSuffix}`,
    attempted: reading(null, attemptedEnglish),
    reason: {
      code: 'reading-mismatch',
      text: 'The selected meaning does not match the Albanian line from the tale.',
    },
    correction: reading(question.albanian, question.correct),
  }
}
