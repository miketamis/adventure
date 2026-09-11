import { useId } from 'react'

// Unmarked support stays dormant until a production prompt profile asks for
// it; adding the later stage does not require inventing another exercise UI.
export const CONTEXT_TARGET_PRESENTATION = Object.freeze({
  marked: 'marked',
  blank: 'blank',
  unmarked: 'unmarked',
})

function ContextLine({ line }) {
  const target = line.target || null
  const targetIndices = new Set(target?.indices || [])
  const words = line.words || null

  return (
    <div className={`contextual-completion-line${line.secondary ? ' secondary' : ''}`}>
      <span className="contextual-completion-line-label">{line.label}</span>
      <div className="contextual-completion-line-text" lang={line.lang}>
        {words ? words.map((word, index) => {
          const isTarget = targetIndices.has(index) || (
            target?.match != null && word === target.match
          )
          let rendered = word
          if (isTarget && target.presentation === CONTEXT_TARGET_PRESENTATION.marked) {
            rendered = (
              <mark className="contextual-completion-target" aria-label={`Target word: ${word}`}>
                {word}
              </mark>
            )
          } else if (isTarget && target.presentation === CONTEXT_TARGET_PRESENTATION.blank) {
            rendered = (
              <span className="contextual-completion-blank">
                <span className="sr-only">{target.accessibleLabel || 'missing word'}</span>
                <span aria-hidden="true">_____</span>
              </span>
            )
          }
          // `unmarked` deliberately renders the word with no visual or
          // accessible target disclosure.
          return <span key={`${line.id}-${index}`}>{index > 0 ? ' ' : ''}{rendered}</span>
        }) : line.text}
      </div>
    </div>
  )
}

export default function ContextualCompletion({
  instruction,
  directionLabel,
  badge,
  lines = [],
  answers = [],
  answerGroupLabel,
  answered,
  selectedAnswerId,
  correctAnswerIds = [],
  onAnswer,
  feedback,
  feedbackTone,
  className = '',
}) {
  const headingId = useId()
  const correctIds = new Set(correctAnswerIds)

  return (
    <div
      className={`contextual-completion ${className}`.trim()}
      role="group"
      aria-labelledby={headingId}
    >
      <div className="prompt">
        <h3 id={headingId}>{instruction}</h3>
        <span className="contextual-completion-meta">
          <span className="contextual-completion-direction">{directionLabel}</span>
          {badge && <span className="phrase-label">{badge}</span>}
        </span>
      </div>

      <div className="contextual-completion-lines">
        {lines.map((line) => <ContextLine line={line} key={line.id} />)}
      </div>

      <div className="answers contextual-completion-answers" role="group" aria-label={answerGroupLabel}>
        {answers.map((answer) => {
          let answerClass = 'answer'
          if (answered && correctIds.has(answer.id)) answerClass += ' correct'
          else if (answered && answer.id === selectedAnswerId) answerClass += ' wrong'
          return (
            <button
              type="button"
              className={answerClass}
              key={answer.id}
              lang={answer.lang}
              disabled={answered}
              aria-pressed={answer.id === selectedAnswerId}
              onClick={() => onAnswer(answer.id)}
            >
              {answer.label}
            </button>
          )
        })}
      </div>

      <div
        className={`feedback ${answered && feedbackTone ? feedbackTone : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {answered && feedback}
      </div>
    </div>
  )
}
