import { useEffect, useState } from 'react'
import BlockingModal from './BlockingModal.jsx'

export default function AnalyticsPreferencesModal({ consent, onSave, onDismiss }) {
  const [structured, setStructured] = useState(consent.structured)
  const [replay, setReplay] = useState(consent.replay)

  useEffect(() => {
    setStructured(consent.structured)
    setReplay(consent.replay)
  }, [consent.structured, consent.replay])

  return (
    <BlockingModal
      id="analytics-preferences-title"
      title="Help improve Aventura Shqip?"
      className="analytics-preferences ph-no-capture"
      onDismiss={onDismiss}
      actions={(
        <>
          <button type="button" className="btn" onClick={() => onSave({ structured: false, replay: false })}>
            Continue without sharing
          </button>
          <button type="button" className="btn primary" onClick={() => onSave({ structured, replay })}>
            Save my choices
          </button>
        </>
      )}
    >
      <p>
        Your playtest organiser has already handled research consent. These controls let you change
        or stop anonymous collection at any time; the game works normally if you share nothing.
      </p>
      <fieldset className="analytics-consent-options">
        <legend>Choose what you are comfortable sharing</legend>
        <label>
          <input
            type="checkbox"
            checked={structured}
            onChange={(event) => setStructured(event.target.checked)}
          />
          <span>
            <b>Anonymous gameplay research</b>
            <small>
              Sends scene and question IDs, categorical option choices, timing, outcomes, and safe game-state changes.
              Typed answers, microphone audio, names, messages, and private text are never sent.
            </small>
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={replay}
            onChange={(event) => setReplay(event.target.checked)}
          />
          <span>
            <b>Visual session replay</b>
            <small>
              Sends the page structure plus mouse, touch, click, and scroll activity. All form inputs are masked;
              writing, learner responses, feedback controls, and microphone areas are excluded.
            </small>
          </span>
        </label>
      </fieldset>
      <p className="analytics-consent-note">
        Playtest recordings are used only to improve this game. The study organiser is responsible for
        confirming any required adult or guardian consent before sharing the playtest link.
      </p>
    </BlockingModal>
  )
}
