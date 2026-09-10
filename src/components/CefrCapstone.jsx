import { useEffect, useMemo, useRef, useState } from 'react'
import { playPhrase } from '../game/audio.js'
import {
  cefrFamilyReachability,
  cefrModeProgress,
  cefrProfile,
  nextCefrTask,
  openResponseMetrics,
  performanceEvidenceFor,
  receptionEvidenceFor,
  selfReviewedRubric,
} from '../game/cefrAssessment.js'
import { CEFR_LEVEL_GATES, CEFR_LEVEL_OUTCOMES, CEFR_MODES } from '../game/cefrProgression.js'
import { preparationMechanicsForCapstone } from '../game/cefrPreparation.js'
import CefrPreparation, { cefrPreparationSummary } from './CefrPreparation.jsx'

const SPOKEN_MODES = new Set(['spokenInteraction', 'spokenProduction'])
const RECEPTION_MODES = new Set(['listening', 'reading'])
const MODE_ICONS = {
  listening: '🔊',
  reading: '📜',
  spokenInteraction: '🗣️',
  spokenProduction: '🔥',
  writtenInteraction: '✉️',
  writtenProduction: '🪶',
  mediation: '🤝',
}

const levelTitle = (level) => level === 'A1' ? 'First village circuit' : 'The road beyond the village'

function requirementAlternatives(task) {
  return (task.requirements || []).flatMap((requirement) =>
    (requirement.acceptedAlternativesSq || []).map((al) => ({
      id: `${requirement.id}:${al}`,
      requirement: requirement.prompt,
      al,
    })))
}

function ReviewedAlternatives({ task }) {
  const alternatives = requirementAlternatives(task)
  if (!alternatives.length) return null
  return (
    <details className="cefr-alternatives">
      <summary>Compare a few reviewed ways to express parts of the task</summary>
      <p>No one line below is a complete answer. Your own clear wording can be just as good.</p>
      <ul>
        {alternatives.map((example) => (
          <li key={example.id}>
            <span>{example.requirement}</span>
            <b lang="sq">{example.al}</b>
          </li>
        ))}
      </ul>
    </details>
  )
}

function RequirementReview({ task, checks, onChange }) {
  return (
    <div className="cefr-review-block">
      <h4>Check the message you actually made</h4>
      <p>
        These are communicative ideas, not hidden exact sentences. Tick one only if a listener
        or reader could recover it from your Albanian.
      </p>
      <div className="cefr-check-list">
        {(task.requirements || []).map((requirement) => (
          <label key={requirement.id}>
            <input
              type="checkbox"
              checked={checks[requirement.id] === true}
              onChange={(event) => onChange(requirement.id, event.target.checked)}
            />
            <span>{requirement.prompt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function AnalyticSelfCheck({ checks, onChange, spoken = false, pronunciation, onPronunciation }) {
  const dimensions = [
    ['comprehensibility', 'Someone could understand the intended message.'],
    ['range', 'I used enough Albanian to complete this particular task.'],
    ['control', 'My word forms and sentence shapes did not obscure the message.'],
    ['cohesion', 'The parts belong together rather than being unrelated words.'],
  ]
  return (
    <fieldset className="cefr-self-check">
      <legend>Honest self-check</legend>
      {dimensions.map(([id, label]) => (
        <label key={id}>
          <input
            type="checkbox"
            checked={checks[id] === true}
            onChange={(event) => onChange(id, event.target.checked)}
          />
          <span>{label}</span>
        </label>
      ))}
      {spoken && (
        <label className="cefr-pronunciation-check">
          <input
            type="checkbox"
            checked={pronunciation === true}
            onChange={(event) => onPronunciation(event.target.checked)}
          />
          <span>
            On replay, a supportive Albanian listener could understand me without seeing a transcript.
            The game cannot infer pronunciation from written words.
          </span>
        </label>
      )}
    </fieldset>
  )
}

function TaskFrame({ task, children }) {
  return (
    <article className="cefr-task" aria-labelledby="cefr-task-title">
      <div className="cefr-task-place">
        <span>{task.level} · {task.storyAnchor.placeLabel || 'village road'}</span>
        <b>{task.storyAnchor.npcLabel}</b>
      </div>
      <h3 id="cefr-task-title">{task.storyAnchor.beat}</h3>
      <p className="cefr-task-prompt">{task.prompt}</p>
      {children}
    </article>
  )
}

function ReceptionTask({ task, onComplete }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [plays, setPlays] = useState(0)
  const replayLimit = task.stimulus.replayPolicy === 'up-to-three' ? 3 : 2
  const allAnswered = task.questions.every(({ id }) => typeof answers[id] === 'string')

  const submit = () => {
    if (!allAnswered || submitted) return
    const evidence = receptionEvidenceFor(task, answers)
    setSubmitted(true)
    onComplete(evidence, evidence.every(({ correct }) => correct))
  }

  return (
    <TaskFrame task={task}>
      {task.mode === 'listening' ? (
        <div className="cefr-listening-stimulus">
          <button
            type="button"
            className="btn cefr-listen-button"
            disabled={plays >= replayLimit || submitted}
            onClick={() => {
              playPhrase(task.stimulus.scriptSq)
              setPlays((count) => count + 1)
            }}
            aria-label={`Play ${task.voice.character}'s message. ${replayLimit - plays} plays remain.`}
          >
            🔊 Hear {task.voice.character} <small>{replayLimit - plays} plays left</small>
          </button>
          <p>Only the continuous audio is available during this mission. No transcript or translation is revealed.</p>
        </div>
      ) : (
        <blockquote className="cefr-written-stimulus" lang="sq">{task.stimulus.textSq}</blockquote>
      )}

      <div className="cefr-reception-questions">
        {task.questions.map((question, index) => (
          <fieldset key={question.id} disabled={submitted}>
            <legend>{index + 1}. {question.prompt}</legend>
            <div className="cefr-choice-grid">
              {question.choices.map((choice) => {
                const picked = answers[question.id] === choice.id
                const correct = submitted && question.acceptedChoiceIds.includes(choice.id)
                return (
                  <label className={`${picked ? 'picked ' : ''}${correct ? 'correct' : ''}`.trim()} key={choice.id}>
                    <input
                      type="radio"
                      name={question.id}
                      value={choice.id}
                      checked={picked}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))}
                    />
                    <span lang="sq">{choice.labelSq}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <button type="button" className="btn primary cefr-submit" disabled={!allAnswered || submitted} onClick={submit}>
        Commit this decision
      </button>
      {submitted && (
        <p className="cefr-result" role="status">
          {task.questions.every((question) => question.acceptedChoiceIds.includes(answers[question.id]))
            ? '✓ You recovered every needed fact from this new message.'
            : 'This message needs another visit. The marked Albanian choice shows the missed fact; the transcript stays hidden.'}
        </p>
      )}
    </TaskFrame>
  )
}

function Stimulus({ task, dialogueStep = 0 }) {
  const stimulus = task.stimulus
  if (stimulus.kind === 'branching-dialogue') {
    const turn = stimulus.turns[0]
    const text = dialogueStep > 0 ? turn.followUpSq : turn.speakerSq
    return <blockquote className="cefr-dialogue-stimulus" lang="sq"><b>{task.storyAnchor.npcLabel}:</b> {text}</blockquote>
  }
  if (stimulus.kind === 'incoming-note') {
    return <blockquote className="cefr-written-stimulus" lang="sq">{stimulus.textSq}</blockquote>
  }
  if (stimulus.kind === 'source-and-listener' || stimulus.kind === 'source-and-collaboration') {
    return (
      <div className="cefr-relay-source">
        <blockquote lang="sq">{stimulus.sourceSq}</blockquote>
        <p>{stimulus.listenerNeed}</p>
      </div>
    )
  }
  if (stimulus.kind === 'visual-prompt' || stimulus.kind === 'scene-prompt' || stimulus.kind === 'fresh-topic-card') {
    return (
      <div className="cefr-cue-card">
        <span>What the scene asks you to cover</span>
        <ul>{stimulus.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul>
      </div>
    )
  }
  return null
}

function OpenResponseTask({ task, onComplete }) {
  const [draft, setDraft] = useState('')
  const [firstDraft, setFirstDraft] = useState(null)
  const [practiceRevision, setPracticeRevision] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [requirementChecks, setRequirementChecks] = useState({})
  const [dimensionChecks, setDimensionChecks] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const assessedDraft = firstDraft ?? draft
  const metrics = openResponseMetrics(assessedDraft, task.response)
  const structureMet = metrics.wordFloorMet && metrics.sentenceFloorMet && metrics.turnFloorMet

  const save = () => {
    if (submitted) return
    const rubric = selfReviewedRubric(task, { requirementChecks, dimensionChecks, structureMet })
    setSubmitted(true)
    onComplete(performanceEvidenceFor(task, rubric), Object.values(rubric).every((score) => score >= 2))
  }

  return (
    <TaskFrame task={task}>
      <Stimulus task={task} />
      <label className="cefr-draft-label" htmlFor={`cefr-draft-${task.id}`}>Your Albanian message</label>
      <textarea
        id={`cefr-draft-${task.id}`}
        lang="sq"
        value={draft}
        disabled={(reviewing && !practiceRevision) || (submitted && !practiceRevision)}
        onChange={(event) => { setDraft(event.target.value); setReviewing(false) }}
        rows={task.level === 'A2' ? 8 : 5}
        spellCheck="false"
        autoComplete="off"
        placeholder={task.response.kind.includes('exchange') || task.response.kind.includes('reply')
          ? 'Write each turn as its own paragraph…'
          : 'Write in your own words…'}
      />
      <div className="cefr-metrics" aria-live="polite">
        {metrics.minimumWords > 0 && <span className={metrics.wordFloorMet ? 'met' : ''}>{metrics.words}/{metrics.minimumWords} words</span>}
        {metrics.minimumSentences > 0 && <span className={metrics.sentenceFloorMet ? 'met' : ''}>{metrics.sentences}/{metrics.minimumSentences} sentences</span>}
        {metrics.minimumTurns > 0 && <span className={metrics.turnFloorMet ? 'met' : ''}>{metrics.turns}/{metrics.minimumTurns} turns</span>}
      </div>
      {!reviewing && !submitted && (
        <button type="button" className="btn primary cefr-submit" disabled={!draft.trim()} onClick={() => {
          setFirstDraft(draft)
          setReviewing(true)
        }}>
          Review this draft
        </button>
      )}
      {reviewing && !submitted && (
        <div className="cefr-review">
          <RequirementReview
            task={task}
            checks={requirementChecks}
            onChange={(id, value) => setRequirementChecks((current) => ({ ...current, [id]: value }))}
          />
          <AnalyticSelfCheck
            checks={dimensionChecks}
            onChange={(id, value) => setDimensionChecks((current) => ({ ...current, [id]: value }))}
          />
          {!structureMet && <p className="cefr-structure-warning">The frozen first draft does not meet this mission’s length or turn floor. Saving it records “needs work”; you can revise it for practice afterward.</p>}
          <p className="cefr-heldout-note">This check refers to the frozen first draft above. Reviewed language stays hidden until its evidence is saved.</p>
          <div className="cefr-review-actions"><button type="button" className="btn primary" onClick={save}>Save honest self-check</button></div>
        </div>
      )}
      {submitted && (
        <div className="cefr-after-attempt">
          <p className="cefr-result" role="status">This attempt saved only rubric evidence. Your message was not put in the save file.</p>
          <ReviewedAlternatives task={task} />
          <button type="button" className="btn" onClick={() => setPracticeRevision(true)}>
            Revise for practice (not new gate evidence)
          </button>
        </div>
      )}
    </TaskFrame>
  )
}

function SpeechTask({ task, onComplete }) {
  const [recordings, setRecordings] = useState([])
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [requirementChecks, setRequirementChecks] = useState({})
  const [dimensionChecks, setDimensionChecks] = useState({})
  const [pronunciation, setPronunciation] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const startedAtRef = useRef(0)
  const urlsRef = useRef([])
  const mountedRef = useRef(true)
  const dialogue = task.response.kind === 'recorded-dialogue'
  const neededRecordings = dialogue ? 2 : 1
  const readyToReview = recordings.length >= neededRecordings
  const minimumSeconds = dialogue ? 0 : Number(task.response.minimumSeconds || 0)
  const durationMet = dialogue || recordings.some(({ seconds }) => seconds >= minimumSeconds)

  useEffect(() => () => {
    mountedRef.current = false
    if (recorderRef.current) {
      recorderRef.current.ondataavailable = null
      recorderRef.current.onstop = null
      if (recorderRef.current.state === 'recording') recorderRef.current.stop()
    }
    streamRef.current?.getTracks?.().forEach((track) => track.stop())
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const start = async () => {
    if (recording || submitted) return
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('This browser cannot make a local microphone recording. Use a current browser to complete this mode.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      streamRef.current = stream
      recorderRef.current = recorder
      chunksRef.current = []
      startedAtRef.current = performance.now()
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        const seconds = Math.max(0, (performance.now() - startedAtRef.current) / 1000)
        const url = URL.createObjectURL(blob)
        if (!mountedRef.current) {
          URL.revokeObjectURL(url)
          return
        }
        urlsRef.current.push(url)
        setRecordings((current) => [...current, { url, seconds }].slice(0, neededRecordings))
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        recorderRef.current = null
        setRecording(false)
      }
      recorder.start()
      setRecording(true)
      setError('')
    } catch {
      setError('Microphone permission was not available. Nothing was recorded or uploaded.')
    }
  }

  const stop = () => {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }

  const clearRecordings = () => {
    recordings.forEach(({ url }) => URL.revokeObjectURL(url))
    urlsRef.current = urlsRef.current.filter((url) => !recordings.some((clip) => clip.url === url))
    setRecordings([])
    setReviewing(false)
    setSubmitted(false)
  }

  const save = () => {
    if (submitted) return
    const rubric = selfReviewedRubric(task, {
      requirementChecks,
      dimensionChecks,
      structureMet: readyToReview && durationMet,
    })
    setSubmitted(true)
    const evidence = performanceEvidenceFor(task, rubric, {
      pronunciationPass: pronunciation,
      recordingCaptured: recordings.length >= neededRecordings,
    })
    onComplete(evidence, Object.values(rubric).every((score) => score >= 2) && pronunciation)
  }

  return (
    <TaskFrame task={task}>
      <Stimulus task={task} dialogueStep={Math.min(recordings.length, 1)} />
      <div className="cefr-recorder">
        <p className="cefr-private-note">🔒 Your microphone audio stays in this browser tab for replay. It is never uploaded or written to the save.</p>
        {recordings.map((clip, index) => (
          <div className="cefr-recording" key={clip.url}>
            <span>{dialogue ? `Your reply ${index + 1}` : 'Your recording'} · {Math.round(clip.seconds)}s</span>
            <audio controls src={clip.url}>Your browser cannot replay this recording.</audio>
          </div>
        ))}
        {!readyToReview && (
          <button type="button" className={`btn ${recording ? 'danger' : 'primary'}`} onClick={recording ? stop : start}>
            {recording ? '■ Finish this reply' : `● Record ${dialogue ? `reply ${recordings.length + 1}` : 'your answer'}`}
          </button>
        )}
        {minimumSeconds > 0 && <p className={durationMet ? 'cefr-duration met' : 'cefr-duration'}>Target floor: {minimumSeconds}s of connected speech.</p>}
        {error && <p className="cefr-error" role="alert">{error}</p>}
      </div>
      {readyToReview && !reviewing && !submitted && (
        <div className="cefr-review-actions">
          <button type="button" className="btn" onClick={clearRecordings}>Record again</button>
          <button type="button" className="btn primary" onClick={() => setReviewing(true)}>Replay and review</button>
        </div>
      )}
      {reviewing && !submitted && (
        <div className="cefr-review">
          <RequirementReview
            task={task}
            checks={requirementChecks}
            onChange={(id, value) => setRequirementChecks((current) => ({ ...current, [id]: value }))}
          />
          <AnalyticSelfCheck
            spoken
            checks={dimensionChecks}
            pronunciation={pronunciation}
            onPronunciation={setPronunciation}
            onChange={(id, value) => setDimensionChecks((current) => ({ ...current, [id]: value }))}
          />
          {!durationMet && <p className="cefr-structure-warning">This recording is shorter than the task floor. Record again before saving a passing attempt.</p>}
          <p className="cefr-heldout-note">This check refers to the recordings above. Reviewed language stays hidden until their evidence is saved.</p>
          <div className="cefr-review-actions">
            <button type="button" className="btn primary" onClick={save}>Save honest self-check</button>
          </div>
        </div>
      )}
      {submitted && (
        <div className="cefr-after-attempt">
          <p className="cefr-result" role="status">Only the rubric result was saved. Reloading or leaving this task discards the audio.</p>
          <ReviewedAlternatives task={task} />
        </div>
      )}
    </TaskFrame>
  )
}

export default function CefrCapstone({ state, dispatch, onClose }) {
  const evidence = state.cefrEvidence || []
  const profile = useMemo(() => cefrProfile(evidence), [evidence])
  const preparation = useMemo(() => cefrPreparationSummary(state), [state])
  const [task, setTask] = useState(null)
  const [result, setResult] = useState(null)
  const [notice, setNotice] = useState('')
  const [showPreparation, setShowPreparation] = useState(false)

  const familyFor = (level, mode) => CEFR_LEVEL_OUTCOMES[level]
    .find((outcome) => outcome.mode === mode)?.taskFamilies?.[0]

  const start = (level, mode) => {
    if (level === 'A2' && !profile.A1.passed) return
    if (!preparation.byLevel[level].complete) {
      setNotice(`Complete the ${level} guided preparation path before using a fresh readiness form.`)
      return
    }
    const familyId = familyFor(level, mode)
    const reachability = cefrFamilyReachability(familyId, evidence)
    if (!reachability.reachable && !reachability.passed) {
      setNotice(`This ${mode} evidence circuit cannot meet its gate with the remaining fresh forms. Return to guided preparation; a future fresh circuit is needed for another readiness decision.`)
      return
    }
    setResult(null)
    const nextTask = nextCefrTask(level, mode, evidence)
    if (!nextTask) {
      setNotice(`You have completed every currently held-out ${level} ${mode} situation. Return to Train; revealed forms cannot be reused as fresh gate evidence.`)
      return
    }
    setNotice('')
    setTask(nextTask)
  }

  if (showPreparation) {
    return (
      <CefrPreparation
        state={state}
        dispatch={dispatch}
        onBack={() => setShowPreparation(false)}
        onReturnToTrain={onClose}
      />
    )
  }

  const complete = (newEvidence, passed) => {
    dispatch({ type: 'CEFR_RECORD_EVIDENCE', evidence: newEvidence })
    setResult(passed ? 'passed' : 'needs-work')
  }

  if (task) {
    const response = RECEPTION_MODES.has(task.mode)
      ? <ReceptionTask key={task.id} task={task} onComplete={complete} />
      : SPOKEN_MODES.has(task.mode)
        ? <SpeechTask key={task.id} task={task} onComplete={complete} />
        : <OpenResponseTask key={task.id} task={task} onComplete={complete} />
    return (
      <section className="card cefr-capstone" aria-labelledby="cefr-title">
        <div className="cefr-capstone-header">
          <div>
            <span className="cefr-eyebrow">A village mission · {task.level}</span>
            <h2 id="cefr-title">{levelTitle(task.level)}</h2>
          </div>
          <button type="button" className="btn" onClick={() => { setTask(null); setResult(null) }}>Mission board</button>
        </div>
        {response}
        {result && (
          <div className={`cefr-complete ${result}`} role="status">
            <b>{result === 'passed' ? 'This attempt meets its floor.' : 'This attempt shows where to train next.'}</b>
            <span>No hearts or word-tokens change in a readiness mission.</span>
            <button type="button" className="btn primary" onClick={() => { setTask(null); setResult(null) }}>Choose another mission</button>
          </div>
        )}
      </section>
    )
  }

  const preparationLabel = (level) => {
    if (preparation.byLevel[level].complete) return `${level} guided preparation complete`
    if (level === 'A2' && !profile.A1.passed) return 'A2 guided preparation follows A1 readiness'
    if (preparation.byLevel[level].completed > 0) return `${level} guided preparation in progress`
    return `${level} guided preparation opens as its word skills become ready`
  }
  return (
    <section className="card cefr-capstone" aria-labelledby="cefr-title">
      <div className="cefr-capstone-header">
        <div>
          <span className="cefr-eyebrow">Your path from first words to independent village life</span>
          <h2 id="cefr-title">A1 → A2 readiness journeys</h2>
        </div>
        <button type="button" className="btn" onClick={onClose}>Return to ordinary Train</button>
      </div>
      <p className="cefr-intro">
        Learn through story and ordinary Train, complete the guided preparation path, then try these
        fresh road, inn and village situations. A fresh form is used once for readiness evidence; A2
        opens only after every A1 mode and the spoken intelligibility check have passed.
      </p>
      <div className="cefr-prep-note">
        <b>Current learning preparation</b>
        <span>{preparationLabel('A1')}</span>
        <span>{preparationLabel('A2')}</span>
        <small>This is guidance, not a shortcut into a CEFR result. Only the missions below provide transfer evidence.</small>
        <button type="button" className="btn primary" onClick={() => setShowPreparation(true)}>Open guided preparation</button>
      </div>
      {notice && <p className="cefr-result" role="status">{notice}</p>}
      {['A1', 'A2'].map((level) => {
        const levelLocked = level === 'A2' && !profile.A1.passed
        const preparationLocked = !preparation.byLevel[level].complete
        const locked = levelLocked || preparationLocked
        const gate = CEFR_LEVEL_GATES[level]
        return (
          <section className={`cefr-level ${locked ? 'locked' : ''}`} aria-labelledby={`cefr-${level}`} key={level}>
            <div className="cefr-level-heading">
              <div>
                <span className="cefr-level-mark">{profile[level].passed ? '✓' : locked ? '🔒' : '○'} {level}</span>
                <h3 id={`cefr-${level}`}>{levelTitle(level)}</h3>
              </div>
              <span>{profile[level].passed
                ? `${level}-ready across all seven modes`
                : levelLocked
                  ? 'Complete A1 first'
                  : preparationLocked
                    ? `Complete ${level} guided preparation first`
                    : 'Fresh readiness forms open'}</span>
            </div>
            <div className="cefr-mode-grid">
              {CEFR_MODES.map((mode) => {
                const progress = cefrModeProgress(level, mode.id, evidence)
                const passed = profile[level].modes[mode.id]?.passed
                const familyId = familyFor(level, mode.id)
                const reachability = cefrFamilyReachability(familyId, evidence)
                const modePreparation = preparationMechanicsForCapstone(familyId)
                  .filter((mechanic) => mechanic.level === level)
                  .map((mechanic) => mechanic.label)
                const journeyStatus = progress.completed > 0
                  ? 'readiness journey in progress'
                  : 'first readiness mission waiting'
                return (
                  <button
                    type="button"
                    className={`cefr-mode-card ${passed ? 'passed' : ''}`}
                    key={mode.id}
                    disabled={locked}
                    onClick={() => start(level, mode.id)}
                  >
                    <span className="cefr-mode-icon" aria-hidden="true">{MODE_ICONS[mode.id]}</span>
                    <b>{mode.label}</b>
                    <span>{passed
                      ? 'mode met'
                      : !reachability.reachable
                        ? 'return to practice; a new unseen circuit is needed'
                        : journeyStatus}</span>
                    {!passed && <small>Prepare with: {modePreparation.join(', ') || `${level} guided path`}</small>}
                  </button>
                )
              })}
            </div>
            <p className="cefr-gate-note">
              Strength in one mode cannot hide a missing mode. Reception is checked across more than one
              fresh situation, while speaking and writing are checked task by task.
              {state.debug && <> Debug gate: {Math.round(gate.reception.minimumAccuracy * 100)}% across {gate.reception.minimumDistinctWindows} distinct reception windows.</>}
            </p>
          </section>
        )
      })}
      <p className="cefr-boundary-note">
        This is an internal all-mode readiness profile, not an accredited certificate. Native-speaker
        review, piloting and external standard-setting remain the certification boundary.
      </p>
    </section>
  )
}
