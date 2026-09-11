import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { playPhrase } from '../game/audio.js'
import { cefrProfile } from '../game/cefrAssessment.js'
import {
  CEFR_PREPARATION_ACTIVITIES,
  CEFR_PREPARATION_MECHANICS,
  CEFR_PREPARATION_SCENARIO_COMPANION,
  CEFR_PREPARATION_STAGES,
  evaluatePreparationResponse,
  preparationPlan,
} from '../game/cefrPreparation.js'
import { liveCefrPreparationEvidence } from '../game/cefrPreparationEvidence.js'
import { cefrPreparationLoreLabels } from '../game/cefrPreparationPresentation.js'
import { WORD_CAPABILITY_DEFINITIONS } from '../game/wordProgression.js'
import { DICT } from '../game/dictionary.js'

const capabilityLabel = (capabilityId) =>
  WORD_CAPABILITY_DEFINITIONS.find(({ id }) => id === capabilityId)?.label || capabilityId.replaceAll('-', ' ')
const sqText = (value) => typeof value === 'string' ? value : value?.text || ''
const scenarioCompanionAtSentenceStart = CEFR_PREPARATION_SCENARIO_COMPANION
  .replace(/^./u, (first) => first.toUpperCase())

function Albanian({ value, className = '' }) {
  if (!value) return null
  return <span className={className} lang="sq">{sqText(value)}</span>
}

const unique = (values) => [...new Set(values)]

function ChoiceSet({ options, value, onChange, disabled = false, label = 'Choose one' }) {
  const groupId = useId()
  return (
    <fieldset className="cefr-prep-choice" disabled={disabled}>
      <legend>{label}</legend>
      <div className="cefr-choice-grid">
        {options.map((option) => (
          <label className={value === option.id ? 'picked' : ''} key={option.id}>
            <input
              type="radio"
              name={groupId}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <Albanian value={option.text} />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function OrderedTiles({ tiles, value = [], onChange, disabled = false, label = 'Build your answer' }) {
  const selected = new Set(value)
  const add = (id) => onChange([...value, id])
  const remove = (id) => onChange(value.filter((picked) => picked !== id))
  return (
    <div className="cefr-prep-order">
      <b>{label}</b>
      <div className="cefr-prep-built" aria-live="polite">
        {value.length === 0 && <span className="cefr-prep-placeholder">Choose the first Albanian part</span>}
        {value.map((id) => {
          const tile = tiles.find((entry) => entry.id === id)
          return tile ? (
            <button type="button" disabled={disabled} onClick={() => remove(id)} key={id}>
              <Albanian value={tile.text} />
            </button>
          ) : null
        })}
      </div>
      <div className="cefr-prep-tiles">
        {tiles.filter(({ id }) => !selected.has(id)).map((tile) => (
          <button type="button" disabled={disabled} onClick={() => add(tile.id)} key={tile.id}>
            <Albanian value={tile.text} />
          </button>
        ))}
      </div>
    </div>
  )
}

function SlotFrame({ activity, selections, onChange, disabled }) {
  const frameText = activity.frame?.map((part) => part.kind === 'slot'
    ? `[${sqText(activity.slots?.[part.id]?.find(({ id }) => id === selections[part.id])?.text) || '…'}]`
    : sqText(part)).join(' ').replace(/\s+([,.!?])/gu, '$1')
  return (
    <div className="cefr-prep-slots">
      <blockquote lang="sq">{frameText}</blockquote>
      {Object.entries(activity.slots || {}).map(([slotId, options]) => (
        <ChoiceSet
          key={slotId}
          label={`Choose ${slotId}`}
          options={options}
          value={selections[slotId]}
          onChange={(value) => onChange({ ...selections, [slotId]: value })}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

function LocalRecorder({ activity, value, onChange, disabled }) {
  const [recording, setRecording] = useState(false)
  const [clipUrl, setClipUrl] = useState(null)
  const [error, setError] = useState('')
  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const clipUrlRef = useRef(null)

  const release = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  useEffect(() => () => {
    const recorder = recorderRef.current
    if (recorder) {
      recorder.ondataavailable = null
      recorder.onstop = null
      if (recorder.state !== 'inactive') recorder.stop()
    }
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current)
  }, [])

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('This browser cannot make a local recording. Use a browser with microphone recording enabled.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      recorder.ondataavailable = ({ data }) => { if (data.size) chunksRef.current.push(data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current)
        const nextUrl = URL.createObjectURL(blob)
        clipUrlRef.current = nextUrl
        setClipUrl(nextUrl)
        setRecording(false)
        release()
        onChange({ ...value, recorded: true, replayed: false, selfCheck: null })
      }
      recorder.start()
      setRecording(true)
      setError('')
    } catch {
      release()
      setError('Microphone access was not available. Nothing was recorded or uploaded.')
    }
  }

  const retry = () => {
    if (clipUrlRef.current) URL.revokeObjectURL(clipUrlRef.current)
    clipUrlRef.current = null
    setClipUrl(null)
    onChange({ ...value, recorded: false, replayed: false, selfCheck: null })
  }

  const model = activity.model ? [activity.model] : activity.prompts || []
  return (
    <div className="cefr-prep-recorder">
      <p className="cefr-private-note">🔒 Recording stays only in this tab. It is never saved or uploaded.</p>
      <div className="cefr-prep-models">
        {model.map((line, index) => (
          <button type="button" className="btn" key={`${sqText(line)}-${index}`} onClick={() => {
            playPhrase(sqText(line))
            onChange({ ...value, modelPlayed: true })
          }}>
            🔊 {model.length > 1 ? `Hear prompt ${index + 1}` : 'Hear the model'}
          </button>
        ))}
      </div>
      {!clipUrl && (
        <button type="button" className="btn primary" disabled={disabled} onClick={() => recording ? recorderRef.current?.stop() : start()}>
          {recording ? 'Stop recording' : 'Record locally'}
        </button>
      )}
      {clipUrl && (
        <div className="cefr-prep-own-audio">
          <audio controls src={clipUrl} onPlay={() => onChange({ ...value, replayed: true })}>
            Your browser cannot replay this recording.
          </audio>
          <button type="button" className="btn" disabled={disabled} onClick={retry}>Record again</button>
        </div>
      )}
      {value.replayed && (
        <label className="cefr-prep-selfcheck">
          <input
            type="checkbox"
            disabled={disabled}
            checked={value.selfCheck === 'ready'}
            onChange={(event) => onChange({ ...value, selfCheck: event.target.checked ? 'ready' : null })}
          />
          <span>I replayed it and my Albanian communicates the requested meaning.</span>
        </label>
      )}
      {error && <p className="cefr-error" role="alert">{error}</p>}
    </div>
  )
}

function ActivitySurface({ activity, answer, setAnswer, submitted, attempted }) {
  const response = activity.response
  const audioOnly = activity.stimulus?.beforeAttempt === 'audio-only'
  const playAudio = () => {
    playPhrase(sqText(activity.stimulus?.transcript))
    setAnswer({ ...answer, audioPlayed: true })
  }

  return (
    <div className="cefr-prep-surface">
      {audioOnly && (
        <div className="cefr-listening-stimulus">
          <button type="button" className="btn cefr-listen-button" onClick={playAudio}>🔊 Play continuous message</button>
          <p>{attempted ? 'The Albanian transcript is now available below for supported retry.' : 'Listen without a transcript or English translation first.'}</p>
          {attempted && <blockquote lang="sq">{sqText(activity.stimulus.transcript)}</blockquote>}
        </div>
      )}
      {!audioOnly && activity.source && <blockquote lang="sq">{sqText(activity.source)}</blockquote>}
      {activity.opening && <blockquote className="cefr-dialogue-stimulus" lang="sq">{sqText(answer.branchPrompt || activity.opening)}</blockquote>}
      {activity.prompt && <p className="cefr-prep-prompt"><Albanian value={activity.prompt} /></p>}
      {activity.visibleGoal && <p className="cefr-prep-visible-goal"><b>Goal:</b> {activity.visibleGoal}</p>}

      {(response.kind === 'single-choice' || response.kind === 'multiple-acceptable-choice') && (
        <ChoiceSet
          options={activity.options}
          value={answer.optionId}
          onChange={(optionId) => setAnswer({ ...answer, optionId })}
          disabled={submitted}
          label={response.kind === 'multiple-acceptable-choice' ? 'Choose any natural reply' : 'Choose one answer'}
        />
      )}

      {response.kind === 'ordered-tiles' && (
        <OrderedTiles
          tiles={activity.tiles || activity.cards || activity.ideaCards}
          value={answer.orderedIds}
          onChange={(orderedIds) => setAnswer({ ...answer, orderedIds })}
          disabled={submitted}
        />
      )}

      {response.kind === 'slot-selection' && (
        <SlotFrame activity={activity} selections={answer.selections} onChange={(selections) => setAnswer({ ...answer, selections })} disabled={submitted} />
      )}

      {response.kind === 'typed-exact' && (
        <div className="cefr-prep-typed">
          <div className="cefr-prep-frame" lang="sq">
            {activity.frame.map((part, index) => part.kind === 'blank'
              ? <span className="cefr-prep-blank" key={`${part.id}-${index}`}>…</span>
              : <Albanian value={part} key={`${sqText(part)}-${index}`} />)}
          </div>
          <label>
            <span>Missing Albanian word</span>
            <input lang="sq" value={answer.text} disabled={submitted} onChange={(event) => setAnswer({ ...answer, text: event.target.value })} />
          </label>
        </div>
      )}

      {response.kind === 'local-audio-cycle' && (
        <LocalRecorder activity={activity} value={answer} onChange={setAnswer} disabled={submitted} />
      )}

      {response.kind === 'branch-by-intent' && (
        <div>
          {answer.branchPrompt && <p className="cefr-prep-branch-note">{scenarioCompanionAtSentenceStart} changes the next turn in response to your choice.</p>}
          {answer.optionIds.length > 0 && (
            <div className="cefr-prep-dialogue-history" aria-label="Earlier replies in this practice exchange">
              {answer.optionIds.map((optionId, index) => {
                const option = activity.replyOptions.find(({ id }) => id === optionId)
                return option ? <p key={`${optionId}-${index}`}><b>You:</b> <Albanian value={option.text} /></p> : null
              })}
            </div>
          )}
          <ChoiceSet
            options={activity.replyOptions.filter(({ id }) =>
              (answer.branchOptionIds || activity.initialReplyOptionIds || activity.replyOptions.map(({ id: optionId }) => optionId)).includes(id))}
            value={answer.optionId}
            onChange={(optionId) => setAnswer({ ...answer, optionId })}
            disabled={submitted}
            label={answer.branchPrompt ? 'Respond to the changed turn' : 'Choose a reply or ask for repair'}
          />
        </div>
      )}

      {response.kind === 'scan-and-relay' && (
        <div className="cefr-prep-two-step">
          <ChoiceSet options={activity.factOptions} value={answer.factId} onChange={(factId) => setAnswer({ ...answer, factId })} disabled={submitted} label="1. Find the fact" />
          <ChoiceSet options={activity.relayOptions} value={answer.relayId} onChange={(relayId) => setAnswer({ ...answer, relayId })} disabled={submitted} label={`2. Tell ${CEFR_PREPARATION_SCENARIO_COMPANION}`} />
        </div>
      )}

      {response.kind === 'ordered-rounds' && (
        <div className="cefr-prep-rounds">
          {activity.rounds.map((round, index) => index === 0 || answer.byRound?.[activity.rounds[index - 1].id] ? (
            <div key={round.id}>
              <p><Albanian value={round.prompt} /></p>
              <ChoiceSet
                options={round.options}
                value={answer.byRound?.[round.id]}
                onChange={(optionId) => setAnswer({ ...answer, byRound: { ...answer.byRound, [round.id]: optionId } })}
                disabled={submitted}
                label={round.kind === 'gist' ? 'First: main point' : 'Then: practical detail'}
              />
            </div>
          ) : null)}
        </div>
      )}

      {response.kind === 'fact-map' && (
        <div className="cefr-prep-rounds">
          {activity.prompts.map((prompt) => (
            <div key={prompt.id}>
              <p><Albanian value={prompt.text} /></p>
              <ChoiceSet options={activity.answerCards} value={answer.byPrompt?.[prompt.id]} onChange={(id) => setAnswer({ ...answer, byPrompt: { ...answer.byPrompt, [prompt.id]: id } })} disabled={submitted} label="Choose the matching information" />
            </div>
          ))}
        </div>
      )}

      {response.kind === 'connector-map' && (
        <div className="cefr-prep-rounds">
          {activity.sentences.map((sentence) => (
            <div key={sentence.id}>
              <div className="cefr-prep-frame" lang="sq">
                {sentence.frame.map((part, index) => part.kind === 'slot'
                  ? <span className="cefr-prep-blank" key={`${sentence.id}-${index}`}>{answer.bySentence?.[sentence.id] || '…'}</span>
                  : <Albanian value={part} key={`${sentence.id}-${index}`} />)}
              </div>
              <ChoiceSet options={activity.connectorOptions} value={answer.bySentence?.[sentence.id]} onChange={(id) => setAnswer({ ...answer, bySentence: { ...answer.bySentence, [sentence.id]: id } })} disabled={submitted} label={`Connector for ${sentence.relation}`} />
            </div>
          ))}
        </div>
      )}

      {response.kind === 'reconstruct-and-reply' && (
        <div className="cefr-prep-two-step">
          <OrderedTiles tiles={activity.messageTiles} value={answer.messageIds} onChange={(messageIds) => setAnswer({ ...answer, messageIds })} disabled={submitted} label="1. Rebuild the note" />
          <ChoiceSet options={activity.replyOptions} value={answer.replyId} onChange={(replyId) => setAnswer({ ...answer, replyId })} disabled={submitted} label="2. Choose a relevant reply" />
        </div>
      )}

      {response.kind === 'paragraph-plan' && (
        <div className="cefr-prep-plan-builder">
          <fieldset disabled={submitted}>
            <legend>Include every needed part</legend>
            {activity.clauseCards.map((card) => (
              <label key={card.id}>
                <input type="checkbox" checked={answer.clauseIds.includes(card.id)} onChange={(event) => setAnswer({ ...answer, clauseIds: event.target.checked ? [...answer.clauseIds, card.id] : answer.clauseIds.filter((id) => id !== card.id) })} />
                <Albanian value={card.text} />
              </label>
            ))}
          </fieldset>
          <fieldset disabled={submitted}>
            <legend>Choose at least two different connectors, including a reason</legend>
            {(activity.connectorOptions || unique(activity.requiredLinks.flatMap(({ allowedSenseIds }) => allowedSenseIds))
              .map((id) => ({ id, text: { text: DICT[id].al } }))).map((option) => (
              <label key={option.id}>
                <input type="checkbox" checked={answer.connectorSenseIds.includes(option.id)} onChange={(event) => setAnswer({ ...answer, connectorSenseIds: event.target.checked ? unique([...answer.connectorSenseIds, option.id]) : answer.connectorSenseIds.filter((id) => id !== option.id) })} />
                <Albanian value={option.text} />
              </label>
            ))}
          </fieldset>
        </div>
      )}

      {response.kind === 'relay-and-agree' && (
        <div className="cefr-prep-rounds">
          {activity.steps.map((step, index) => index === 0 || answer.byStep?.[activity.steps[index - 1].id] ? (
            <div key={step.id}>
              <p><Albanian value={answer.repairStep === step.id ? { text: `Përsëri, më ngadalë: ${sqText(step.prompt)}` } : step.prompt} /></p>
              <ChoiceSet options={activity.responseOptions} value={answer.byStep?.[step.id]} onChange={(id) => {
                if (id === activity.response.repairOptionId) {
                  setAnswer({ ...answer, repairStep: step.id, byStep: { ...answer.byStep, [step.id]: undefined } })
                } else {
                  setAnswer({ ...answer, repairStep: null, byStep: { ...answer.byStep, [step.id]: id } })
                }
              }} disabled={submitted} label={answer.repairStep === step.id ? 'Now answer the slower prompt' : 'Relay or ask for repetition'} />
            </div>
          ) : null)}
        </div>
      )}
    </div>
  )
}

const initialAnswer = () => ({
  optionId: null,
  optionIds: [],
  orderedIds: [],
  selections: {},
  text: '',
  recorded: false,
  replayed: false,
  selfCheck: null,
  branchPrompt: null,
  branchOptionIds: null,
  factId: null,
  relayId: null,
  byRound: {},
  byPrompt: {},
  bySentence: {},
  messageIds: [],
  replyId: null,
  clauseIds: [],
  connectorSenseIds: [],
  byStep: {},
  repairStep: null,
  audioPlayed: false,
  modelPlayed: false,
})

function preparationAnswerReady(activity, answer) {
  const response = activity.response
  switch (response.kind) {
    case 'single-choice':
    case 'multiple-acceptable-choice':
    case 'branch-by-intent':
      return Boolean(answer.optionId) && (!activity.stimulus?.beforeAttempt || answer.audioPlayed)
    case 'ordered-tiles':
      return answer.orderedIds.length >= response.correctIds.length &&
        (!activity.stimulus?.beforeAttempt || answer.audioPlayed)
    case 'slot-selection':
      return Object.keys(response.correctSelections).every((id) => Boolean(answer.selections[id]))
    case 'typed-exact':
      return Boolean(answer.text.trim())
    case 'local-audio-cycle':
      return answer.modelPlayed && answer.recorded && answer.replayed && answer.selfCheck === 'ready'
    case 'scan-and-relay':
      return Boolean(answer.factId && answer.relayId)
    case 'ordered-rounds':
      return answer.audioPlayed && response.requiredRoundIds.every((id) => Boolean(answer.byRound[id]))
    case 'fact-map':
      return Object.keys(response.correctByPrompt).every((id) => Boolean(answer.byPrompt[id]))
    case 'connector-map':
      return Object.keys(response.correctBySentence).every((id) => Boolean(answer.bySentence[id]))
    case 'reconstruct-and-reply':
      return answer.messageIds.length >= response.correctMessageIds.length && Boolean(answer.replyId)
    case 'paragraph-plan':
      return answer.clauseIds.length > 0 && answer.connectorSenseIds.length > 0
    case 'relay-and-agree':
      return !answer.repairStep && Object.keys(response.correctByStep).every((id) => Boolean(answer.byStep[id]))
    default:
      return false
  }
}

function ActivityPlayer({ activity, attempts, debug, lorePlace, loreCompanion, onAttempt, onBack }) {
  const [answer, setAnswer] = useState(initialAnswer)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [passed, setPassed] = useState(false)
  const response = activity.response

  const preparedAnswer = response.kind === 'paragraph-plan'
    ? {
        roles: answer.clauseIds.map((id) => activity.clauseCards.find((card) => card.id === id)?.role).filter(Boolean),
        connectorSenseIds: answer.connectorSenseIds,
      }
    : answer

  const submit = () => {
    if (submitted) return
    if (response.kind === 'branch-by-intent') {
      const optionIds = [...answer.optionIds, answer.optionId]
      const result = evaluatePreparationResponse(activity.id, { optionIds })
      if (!result.passed && result.reason === 'continue-branch') {
        setAnswer({
          ...answer,
          optionId: null,
          optionIds,
          branchPrompt: result.nextPrompt,
          branchOptionIds: result.nextReplyOptionIds,
        })
        setAttempted(true)
        return
      }
      setAttempted(true)
      setSubmitted(true)
      setPassed(result.passed)
      onAttempt(activity.id, result.passed)
      return
    }
    const result = evaluatePreparationResponse(activity.id, preparedAnswer)
    setAttempted(true)
    setSubmitted(true)
    setPassed(result.passed)
    onAttempt(activity.id, result.passed)
  }

  const retry = () => {
    setAnswer(initialAnswer())
    setSubmitted(false)
    setPassed(false)
  }

  return (
    <section className="card cefr-preparation-player" aria-labelledby="cefr-preparation-activity-title">
      <div className="cefr-capstone-header">
        <div>
          <span className="cefr-eyebrow">Guided practice · {activity.level}</span>
          <h2 id="cefr-preparation-activity-title">{CEFR_PREPARATION_MECHANICS[activity.mechanicId].label}</h2>
        </div>
        <button type="button" className="btn" onClick={onBack}>Preparation path</button>
      </div>
      <div className="cefr-prep-context">
        <span>Current story · {lorePlace}{loreCompanion ? ` · with ${loreCompanion}` : ''}</span>
        {debug && <span>{attempts} earlier {attempts === 1 ? 'attempt' : 'attempts'}</span>}
      </div>
      <p className="cefr-task-prompt">{activity.instruction}</p>
      <ActivitySurface activity={activity} answer={answer} setAnswer={setAnswer} submitted={submitted} attempted={attempted} />
      {!submitted && (
        <button type="button" className="btn primary cefr-submit" disabled={!preparationAnswerReady(activity, answer)} onClick={submit}>Check this practice</button>
      )}
      {submitted && (
        <div className={`cefr-complete ${passed ? 'passed' : 'needs-work'}`} role="status">
          <b>{passed ? 'Ready for the next step.' : 'Use the support, then try this one again.'}</b>
          <span>Practice changes no hearts or word tokens. Retries are always available.</span>
          {passed
            ? <button type="button" className="btn primary" onClick={onBack}>Continue the path</button>
            : <button type="button" className="btn primary" onClick={retry}>Try again with support</button>}
        </div>
      )}
    </section>
  )
}

function lockedReason(readiness, debug = false) {
  const capabilityReasons = readiness.reasons.filter((reason) => reason.startsWith('requires-capability:'))
  if (capabilityReasons.length) {
    const [, senseId, capabilityId] = capabilityReasons[0].split(':')
    const remaining = capabilityReasons.length > 1
      ? debug ? ` and ${capabilityReasons.length - 1} more needed words` : ' and the other required words'
      : ''
    return `Train ${DICT[senseId]?.al || senseId} for ${capabilityLabel(capabilityId)}${remaining}.`
  }
  const level = readiness.reasons.find((reason) => reason.startsWith('requires-level:'))?.split(':')[1]
  if (level) return `Reach ${level} readiness before beginning A2 preparation.`
  if (readiness.reasons.some((reason) => reason.startsWith('requires-mechanic:'))) return 'Complete the earlier preparation step first.'
  return 'Continue story and Train work to unlock this step.'
}

export function cefrPreparationSummary(state) {
  const profile = cefrProfile(state.cefrEvidence)
  const achievedLevels = Object.entries(profile.achieved).filter(([, passed]) => passed).map(([level]) => level)
  const evidence = liveCefrPreparationEvidence(state, achievedLevels)
  const byLevel = Object.fromEntries(['A1', 'A2'].map((level) => {
    const plan = preparationPlan(level, evidence)
    const total = plan.reduce((sum, entry) => sum + entry.activities.length, 0)
    const completed = plan.reduce((sum, entry) => sum + entry.readiness.passedActivityIds.length, 0)
    return [level, { plan, total, completed, complete: total > 0 && completed === total }]
  }))
  return { profile, evidence, byLevel }
}

export default function CefrPreparation({ state, dispatch, onBack, onReturnToTrain }) {
  const [activityId, setActivityId] = useState(null)
  const summary = useMemo(() => cefrPreparationSummary(state), [state])
  const activity = CEFR_PREPARATION_ACTIVITIES.find(({ id }) => id === activityId)

  if (activity) {
    const lore = cefrPreparationLoreLabels(activity, state)
    return (
      <ActivityPlayer
        key={activity.id}
        activity={activity}
        attempts={state.cefrPreparationAttempts?.[activity.id] || 0}
        debug={state.debug}
        lorePlace={lore.place}
        loreCompanion={lore.companion}
        onAttempt={(id, passed) => dispatch({
          type: 'CEFR_PREPARATION_ATTEMPT',
          activityId: id,
          mechanicId: activity.mechanicId,
          passed,
        })}
        onBack={() => setActivityId(null)}
      />
    )
  }

  return (
    <section className="card cefr-preparation" aria-labelledby="cefr-preparation-title">
      <div className="cefr-capstone-header">
        <div>
          <span className="cefr-eyebrow">Learn before the fresh test</span>
          <h2 id="cefr-preparation-title">A1 → A2 preparation path</h2>
        </div>
        <button type="button" className="btn" onClick={onBack}>Readiness missions</button>
      </div>
      <p className="cefr-intro">
        Story and ordinary Train teach the words. These guided village activities then teach you to
        listen, respond, repair, connect and relay. Only after preparation do unseen readiness missions open.
      </p>
      <div className="cefr-prep-actions">
        <button type="button" className="btn" onClick={onReturnToTrain}>Return to ordinary Train</button>
        <button type="button" className="btn" onClick={() => dispatch({ type: 'SET_VIEW', view: 'story' })}>Return to story</button>
      </div>
      {['A1', 'A2'].map((level) => (
        <section className="cefr-prep-level" key={level} aria-labelledby={`cefr-prep-${level}`}>
          <div className="cefr-level-heading">
            <div>
              <span className="cefr-level-mark">{summary.byLevel[level].complete ? '✓' : level === 'A2' && !summary.profile.A1.passed ? '🔒' : '○'} {level}</span>
              <h3 id={`cefr-prep-${level}`}>{level === 'A1' ? 'Make first contact' : 'Take part in village life'}</h3>
            </div>
            <span>{state.debug
              ? `${summary.byLevel[level].completed}/${summary.byLevel[level].total} activities ready`
              : summary.byLevel[level].complete
                ? 'Preparation complete'
                : summary.byLevel[level].completed > 0
                  ? 'Preparation in progress'
                  : 'Story and Train open this path'}</span>
          </div>
          {CEFR_PREPARATION_STAGES.filter((stage) => stage.level === level).map((stage) => {
            const entries = summary.byLevel[level].plan.filter(({ mechanic }) => mechanic.stageId === stage.id)
            return (
              <div className="cefr-prep-stage" key={stage.id}>
                <div>
                  <h4>{stage.label}</h4>
                  <p>{stage.outcome}</p>
                </div>
                <div className="cefr-prep-mechanics">
                  {entries.map(({ mechanic, activities, readiness }) => (
                    <article className={`${readiness.complete ? 'complete' : ''} ${!readiness.ready ? 'locked' : ''}`.trim()} key={mechanic.id}>
                      <div>
                        <b>{readiness.complete ? '✓ ' : readiness.ready ? '○ ' : '🔒 '}{mechanic.label}</b>
                        <small>{readiness.complete ? 'Completed; replay whenever useful.' : readiness.ready ? 'Ready now' : lockedReason(readiness, state.debug)}</small>
                      </div>
                      <div className="cefr-prep-activity-buttons">
                        {activities.map((entry) => {
                          const passed = readiness.passedActivityIds.includes(entry.id)
                          return (
                            <button type="button" className="btn" disabled={!readiness.ready} onClick={() => setActivityId(entry.id)} key={entry.id}>
                              {passed ? 'Replay' : 'Start'} {activities.length > 1 ? entry.kind.replaceAll('-', ' ') : ''}
                            </button>
                          )
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      ))}
      <p className="cefr-boundary-note">Preparation progress is saved separately. It never counts as held-out CEFR evidence.</p>
    </section>
  )
}
