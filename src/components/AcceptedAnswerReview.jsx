export default function AcceptedAnswerReview({ comparison, onContinue, reward = null }) {
  if (!comparison) return null
  return (
    <section className="accepted-answer-review" aria-labelledby="accepted-answer-title">
      <h4 id="accepted-answer-title">Close enough at this level — check the exact spelling</h4>
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
      <button type="button" className="btn primary" onClick={onContinue}>Continue</button>
    </section>
  )
}
