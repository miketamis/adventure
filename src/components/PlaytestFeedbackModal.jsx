import { useState } from 'react'
import BlockingModal from './BlockingModal.jsx'

const RATINGS = [1, 2, 3, 4, 5]
const FRICTION = [
  ['none', 'Nothing got in my way'],
  ['next-step', 'I did not know what to do next'],
  ['wording', 'A question or instruction was confusing'],
  ['unfair-answer', 'An answer seemed unfair'],
  ['too-much-reading', 'There was too much to read'],
  ['audio', 'Sound or pronunciation got in my way'],
  ['technical', 'Something appeared broken'],
]

const Rating = ({ legend, value, onChange }) => (
  <fieldset className="feedback-rating">
    <legend>{legend}</legend>
    <div>
      {RATINGS.map((rating) => (
        <label key={rating}>
          <input
            type="radio"
            name={legend}
            value={rating}
            checked={value === rating}
            onChange={() => onChange(rating)}
          />
          <span>{rating}</span>
        </label>
      ))}
    </div>
  </fieldset>
)

export default function PlaytestFeedbackModal({ trigger, context, onSubmit, onDismiss }) {
  const [enjoyment, setEnjoyment] = useState(null)
  const [difficulty, setDifficulty] = useState('about-right')
  const [continueIntent, setContinueIntent] = useState('maybe')
  const [friction, setFriction] = useState([])

  const toggleFriction = (id) => setFriction((current) => {
    if (id === 'none') return current.includes('none') ? [] : ['none']
    const withoutNone = current.filter((entry) => entry !== 'none')
    return withoutNone.includes(id)
      ? withoutNone.filter((entry) => entry !== id)
      : [...withoutNone, id]
  })

  return (
    <BlockingModal
      id="playtest-feedback-title"
      title="How is the journey feeling?"
      className="playtest-feedback ph-no-capture"
      onDismiss={() => onDismiss(trigger)}
      actions={(
        <>
          <button type="button" className="btn" onClick={() => onDismiss(trigger)}>Not now</button>
          <button
            type="button"
            className="btn primary"
            disabled={enjoyment == null}
            onClick={() => onSubmit({
              trigger,
              ...context,
              enjoyment_rating: enjoyment,
              difficulty_rating: difficulty,
              continue_intent: continueIntent,
              friction_tags: friction.length ? friction : ['not-specified'],
            })}
          >
            Send anonymous feedback
          </button>
        </>
      )}
    >
      <p>This short check-in contains only ratings and categories—there is no open-text response.</p>
      <Rating legend="Enjoyment from 1 (not enjoying it) to 5 (really enjoying it)" value={enjoyment} onChange={setEnjoyment} />
      <fieldset className="feedback-choices">
        <legend>How difficult has the Albanian felt?</legend>
        {[
          ['too-easy', 'Too easy'],
          ['about-right', 'About right'],
          ['too-hard', 'Too hard'],
        ].map(([id, label]) => (
          <label key={id}><input type="radio" name="difficulty" checked={difficulty === id} onChange={() => setDifficulty(id)} /> {label}</label>
        ))}
      </fieldset>
      <fieldset className="feedback-choices">
        <legend>Would you keep playing?</legend>
        {[
          ['yes', 'Yes'],
          ['maybe', 'Maybe'],
          ['no', 'No'],
        ].map(([id, label]) => (
          <label key={id}><input type="radio" name="continue" checked={continueIntent === id} onChange={() => setContinueIntent(id)} /> {label}</label>
        ))}
      </fieldset>
      <fieldset className="feedback-choices">
        <legend>What, if anything, got in the way?</legend>
        {FRICTION.map(([id, label]) => (
          <label key={id}>
            <input type="checkbox" checked={friction.includes(id)} onChange={() => toggleFriction(id)} /> {label}
          </label>
        ))}
      </fieldset>
    </BlockingModal>
  )
}
