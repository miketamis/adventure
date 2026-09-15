import { useEffect } from 'react'
import BlockingModal from './BlockingModal.jsx'

export default function AcceptedAnswerReview({ comparison, onContinue, reward = null }) {
  useEffect(() => {
    if (!comparison) return undefined
    const appMain = document.querySelector('.app-main')
    appMain?.setAttribute('inert', '')
    appMain?.setAttribute('aria-hidden', 'true')
    return () => {
      appMain?.removeAttribute('inert')
      appMain?.removeAttribute('aria-hidden')
    }
  }, [comparison])

  if (!comparison) return null
  return (
    <BlockingModal
      id="accepted-answer-title"
      title={comparison.title}
      className="accepted-answer-dialog ph-no-capture"
      actions={<button type="button" className="btn primary" onClick={onContinue}>Continue</button>}
    >
      <div className="accepted-answer-review">
        <div className="accepted-answer-comparison">
          <div>
            <span>Your answer</span>
            <strong lang="sq">{comparison.attempt}</strong>
          </div>
          <div>
            <span>Correct Albanian</span>
            <strong lang="sq">{comparison.answer}</strong>
          </div>
        </div>
        <p>{comparison.explanation}</p>
        {reward}
      </div>
    </BlockingModal>
  )
}
