import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import TrainingActivityShell from './TrainingActivityShell.jsx'
import Token from './Token.jsx'
import { albanianTextOf } from '../game/language.js'
import { evaluateControlledSelections } from '../game/controlledResponses.js'
import { isMuted, playPhrase, subscribeMute } from '../game/audio.js'
import { isTrainableSense } from '../game/lexicalTrainability.js'

// The world owns this task and every consequence. This card submits option
// identifiers, records support before showing it, and delegates the final act
// to the same canonical choice used by the surrounding story.
export default function StoryLearningTask({
  state, task, dispatch, sourceDomIds = [], worldLockText = null, actionAvailability = [], onChooseAction,
}) {
  const episode = task.episode
  const [selections, setSelections] = useState(() => episode?.result?.selections || episode?.previousSelections || {})
  const [audioStatus, setAudioStatus] = useState('idle')
  const answerCommitted = useRef(false)
  const actionCommitted = useRef(false)
  const playback = useRef(0)
  const mounted = useRef(true)
  const phaseRef = useRef(null)
  const inputGroup = useId()
  const muted = useSyncExternalStore(subscribeMute, isMuted, () => true)
  const phase = episode?.phase || 'answering'
  const hasHelp = episode?.supportIds?.includes(task.support?.id)
  const source = {
    encounterId: task.id,
    fromNodeId: state.nodeId,
    fromTurn: state.turn,
    fromRun: state.storyRunSequence,
  }
  const attempt = { ...source, attemptId: episode?.attemptId }
  const answerValidity = evaluateControlledSelections(task.questions, selections)
  const ready = Boolean(episode && phase === 'answering' && task.availability?.ok && !worldLockText)

  const choiceExposureReceipt = `story-task-choices:${state.storyRunSequence}:${state.nodeId}:${state.turn}:${task.id}:v${task.version}:${task.contextKey}`
  useEffect(() => {
    if (phase !== 'answering' || !episode) return
    const occurrences = task.questions.flatMap((question) => question.choices.flatMap((choice) =>
      (choice.tokens || []).flatMap((token) => token.id && isTrainableSense(token.id) ? [token.id] : [])))
    if (!occurrences.length) return
    dispatch({ type: 'RECORD_WORD_EXPOSURE', source: 'story', receipt: choiceExposureReceipt, occurrences })
  }, [choiceExposureReceipt, phase, dispatch])
  useEffect(() => {
    answerCommitted.current = false
    actionCommitted.current = false
    setSelections(episode?.result?.selections || episode?.previousSelections || {})
    setAudioStatus('idle')
    playback.current++
  }, [episode?.attemptId])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => phaseRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [task.id, episode?.attemptId, phase])
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; playback.current++ }
  }, [])

  const startAudio = async () => {
    if (!task.audio || audioStatus === 'playing' || muted) return
    const generation = ++playback.current
    setAudioStatus('playing')
    const completed = await playPhrase(task.audio.al)
    if (!mounted.current || playback.current !== generation) return
    if (completed === true) dispatch({ type: 'STORY_LEARNING_AUDIO_COMPLETE', ...attempt, audioKey: task.audio.key })
    setAudioStatus(completed === true ? 'complete' : 'unavailable')
  }
  const resume = () => {
    const incorrectIds = episode?.result?.incorrectIds || []
    setSelections(Object.fromEntries(Object.entries(selections).filter(([id]) => !incorrectIds.includes(id))))
    dispatch({ type: 'BEGIN_STORY_LEARNING', ...source })
  }

  return (
    <TrainingActivityShell
      instruction={task.instruction}
      debug={state.debug}
      debugMeta={state.debug ? `${task.debug?.levelAlignment || ''} · ${task.id} · ${episode?.supported ? 'supported practice' : 'controlled response'}` : null}
      className="story-learning-task"
    >
      <div ref={phaseRef} tabIndex={-1} className="story-learning-phase" role="status" aria-live="polite">
        {phase === 'feedback' ? 'Review your response.' : phase === 'complete' ? 'Your response matches the scene.' : 'Use the Albanian passage above.'}
      </div>
      {worldLockText && <p className="hint" role="status">{worldLockText}</p>}
      <div className="story-learning-tools">
        {task.support && !hasHelp && (
          <button
            type="button"
            className="btn"
            onClick={() => dispatch({ type: 'REVEAL_STORY_LEARNING_SUPPORT', ...attempt, supportId: task.support.id })}
          >
            {task.support.label || 'Word help'}
          </button>
        )}
        {task.audio && (
          <button type="button" className="btn" disabled={muted || audioStatus === 'playing'} onClick={startAudio}>
            {audioStatus === 'playing' ? 'Playing…' : 'Listen to the request'}
          </button>
        )}
      </div>
      {task.audio && (muted || audioStatus === 'unavailable') && (
        <p className="hint" role="status">{muted ? 'Sound is off.' : 'The recording could not finish.'} You can answer from the printed request.</p>
      )}
      {task.audio && audioStatus === 'complete' && <p className="hint" role="status">Recording finished.</p>}
      {hasHelp && (
        <div className="story-learning-help" aria-label="Word help">
          <p className="hint">Choose a word to save it or hear its pronunciation.</p>
          {task.sourceLines.map((line, index) => (
            <p key={index}>
              {line.map((token, tokenIndex) => (
                <Token
                  key={tokenIndex}
                  token={token}
                  discovered={state.discovered}
                  onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
                />
              ))}
            </p>
          ))}
        </div>
      )}
      {phase === 'answering' && (
        <form
          aria-describedby={sourceDomIds.join(' ') || undefined}
          onSubmit={(event) => {
            event.preventDefault()
            if (!ready || !answerValidity.valid || answerCommitted.current) return
            answerCommitted.current = true
            dispatch({ type: 'SUBMIT_STORY_LEARNING', ...attempt, response: { selections } })
          }}
        >
          {task.questions.map((question) => (
            <fieldset className="story-learning-question" key={question.id} disabled={!ready}>
              <legend>{question.prompt}</legend>
              <div className="story-learning-choices">
                {question.choices.map((choice) => (
                  <label className="answer" key={choice.id}>
                    <input
                      type="radio"
                      name={`${inputGroup}-${question.id}`}
                      value={choice.id}
                      checked={selections[question.id] === choice.id}
                      onChange={() => setSelections((previous) => ({ ...previous, [question.id]: choice.id }))}
                    />
                    <span lang="sq">{choice.label || albanianTextOf(choice.tokens)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button className="btn primary" type="submit" disabled={!ready || !answerValidity.valid}>Check my response</button>
        </form>
      )}
      {phase === 'feedback' && episode.result && (
        <div className="story-learning-feedback" role="status">
          {task.questions.map((question) => {
            const selected = question.choices.find(({ id }) => id === episode.result.selections?.[question.id])
            return selected ? <p key={question.id}><span>{question.prompt}</span>{' '}<strong lang="sq">{selected.label || albanianTextOf(selected.tokens)}</strong></p> : null
          })}
          {task.sourceLines.map((line, index) => <p key={index} lang="sq">{albanianTextOf(line)}</p>)}
          <p>{episode.result.feedbackEnglish}</p>
          <button className="btn primary" type="button" onClick={resume}>Try the response again</button>
        </div>
      )}
      {phase === 'complete' && (
        <div className="story-learning-complete">
          <p className="hint">Choose what you want to do next.</p>
          {actionAvailability.filter(({ ready, reason }) => !ready && reason).map(({ id, reason }) => (
            <p className="hint" key={id} role="status">{reason}</p>
          ))}
          {task.boundActions.map((action) => (
            <button
              className="btn primary"
              type="button"
              key={action.id}
              disabled={!actionAvailability.find(({ id }) => id === action.id)?.ready}
              onClick={() => {
                if (actionCommitted.current) return
                actionCommitted.current = true
                if (onChooseAction(action) === false) actionCommitted.current = false
              }}
            >
              {actionAvailability.find(({ id }) => id === action.id)?.speechLabel && (
                <span>{actionAvailability.find(({ id }) => id === action.id).speechLabel}{' '}</span>
              )}
              <span lang="sq">{albanianTextOf(action.tokens)}</span>
            </button>
          ))}
        </div>
      )}
      <button className="btn" type="button" onClick={() => dispatch({ type: 'CLOSE_STORY_LEARNING', ...attempt })}>Back to the scene</button>
    </TrainingActivityShell>
  )
}
