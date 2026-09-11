import { useEffect, useMemo, useRef, useState } from 'react'
import { playPhrase } from '../game/audio.js'
import {
  cefrFamilyReachability,
  cefrModeProgress,
  cefrProfile,
  combineOpenResponseTurns,
  nextCefrTask,
  openResponseMetrics,
  performanceEvidenceFor,
  receptionEvidenceFor,
  selfReviewedRubric,
} from '../game/cefrAssessment.js'
import { CEFR_LEVEL_GATES, CEFR_LEVEL_OUTCOMES, CEFR_MODES } from '../game/cefrProgression.js'
import { preparationMechanicsForCapstone } from '../game/cefrPreparation.js'
import {
  analyzeOpenResponseFeedback,
  requiresA2WritingRevision,
  supportsOpenResponseFeedback,
} from '../game/openResponseFeedback.js'
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
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState('')
  const mountedRef = useRef(true)
  const replayLimit = task.stimulus.replayPolicy === 'up-to-three' ? 3 : 2
  const allAnswered = task.questions.every(({ id }) => typeof answers[id] === 'string')

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

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
            disabled={playing || plays >= replayLimit || submitted}
            onClick={async () => {
              if (playing) return
              setPlaying(true)
              setAudioError('')
              const completed = await playPhrase(task.stimulus.scriptSq)
              if (!mountedRef.current) return
              setPlaying(false)
              if (completed) setPlays((count) => count + 1)
              else setAudioError('The message did not finish. Check sound, then play it again; failed playback does not use a play.')
            }}
            aria-label={`Play ${task.voice.character}'s message. ${replayLimit - plays} plays remain.`}
          >
            🔊 {playing ? 'Playing…' : `Hear ${task.voice.character}`} <small>{replayLimit - plays} plays left</small>
          </button>
          <p>Only the continuous audio is available during this mission. No transcript or translation is revealed.</p>
          {audioError && <p className="cefr-error" role="alert">{audioError}</p>}
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

function DraftFeedback({ feedback }) {
  if (!feedback) return null
  const { metrics, semanticAnchors } = feedback
  return (
    <section className="cefr-review cefr-draft-feedback" aria-labelledby="cefr-draft-feedback-title">
      <div className="cefr-task-place cefr-draft-feedback-heading">
        <h4 id="cefr-draft-feedback-title">Notice, then decide what to revise</h4>
        <span>Structure · lexical notice</span>
      </div>
      <p>
        The game can count structure and recognise reviewed spellings. It cannot decide whether
        your Albanian is natural, grammatical, or communicates the intended meaning.
      </p>

      <div className="cefr-metrics cefr-feedback-counts" aria-label="Draft structure counts">
        <span><b>{metrics.words}</b> words{metrics.minimumWords > 0 ? ` · ${metrics.minimumWords} needed` : ''}</span>
        <span><b>{metrics.sentences}</b> sentences{metrics.minimumSentences > 0 ? ` · ${metrics.minimumSentences} needed` : ''}</span>
        <span><b>{metrics.turns}</b> turns{metrics.minimumTurns > 0 ? ` · ${metrics.minimumTurns} needed` : ''}</span>
      </div>

      <div className="cefr-review-block cefr-feedback-section">
        <h5>Recognised reviewed forms</h5>
        <p>{feedback.recognizedTokenCount}/{feedback.tokenCount} letter-word tokens match the reviewed dictionary or form inventory.</p>
        {feedback.recognized.length > 0 ? (
          <ul className="cefr-alternatives cefr-feedback-chips">
            {feedback.recognized.map((entry) => {
              const sourceLemmas = entry.lemmas.filter((lemma) => lemma.toLocaleLowerCase('sq') !== entry.surface)
              return (
                <li key={entry.surface} lang="sq">
                  <b>{entry.surface}</b>{entry.count > 1 && <span> ×{entry.count}</span>}
                  {sourceLemmas.length > 0 && <small> ({sourceLemmas.join(' / ')})</small>}
                </li>
              )
            })}
          </ul>
        ) : <p>No reviewed Albanian form has been recognised yet.</p>}
      </div>

      <div className="cefr-review-block cefr-feedback-section">
        <h5>Check, not automatically wrong</h5>
        <p>These spellings are outside the reviewed inventory. They may still be names or valid Albanian; they never lower this result automatically.</p>
        {feedback.unrecognized.length > 0 ? (
          <ul className="cefr-alternatives cefr-feedback-chips uncertain">
            {feedback.unrecognized.map((entry) => (
              <li key={entry.surface} lang="sq"><b>{entry.surface}</b>{entry.count > 1 && <span> ×{entry.count}</span>}</li>
            ))}
          </ul>
        ) : <p>Every letter-word token is present in the reviewed inventory.</p>}
      </div>

      <div className="cefr-review-block cefr-feedback-section">
        <h5>Basic connectors noticed</h5>
        <ul className="cefr-feedback-connectors">
          {feedback.connectors.map(({ surface, count, present }) => (
            <li className={present ? 'present' : ''} key={surface}>
              <b lang="sq">{surface}</b><span>{present ? `seen ${count}×` : 'not seen'}</span>
            </li>
          ))}
        </ul>
        <p>A connector count is a noticing prompt, not a quality score.</p>
      </div>

      <div className="cefr-review-block cefr-feedback-section">
        <h5>Prompt meaning</h5>
        {semanticAnchors.available ? (
          <>
            <p>{semanticAnchors.coveredCount}/{semanticAnchors.anchors.length} safely authored prompt-word anchors appear. Presence does not prove that the intended meaning is expressed.</p>
            <ul className="cefr-alternatives cefr-feedback-chips">
              {semanticAnchors.anchors.map((anchor) => (
                <li className={anchor.present ? 'present' : 'missing'} key={anchor.senseId} lang="sq">
                  <b>{anchor.lemma}</b><span>{anchor.present ? ' noticed' : ' not noticed'}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No safe prompt-word anchors are authored for this task, so the game does not guess whether you covered its meaning. Use the task checklist in the self-review.</p>
        )}
      </div>
      <p className="cefr-private-note">🔒 This draft is analysed only in page memory. Its text is not added to saved evidence.</p>
    </section>
  )
}

function OpenResponseTask({ task, onComplete }) {
  const [draft, setDraft] = useState('')
  const [sentTurns, setSentTurns] = useState([])
  const [firstDraft, setFirstDraft] = useState(null)
  const [assessedDraft, setAssessedDraft] = useState(null)
  const [practiceRevision, setPracticeRevision] = useState(false)
  const [phase, setPhase] = useState('writing')
  const [revisionCompleted, setRevisionCompleted] = useState(false)
  const [requirementChecks, setRequirementChecks] = useState({})
  const [dimensionChecks, setDimensionChecks] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const draftRef = useRef(null)
  const followUpRef = useRef(null)
  const feedbackRef = useRef(null)
  const selfReviewRef = useRef(null)
  const feedbackEnabled = supportsOpenResponseFeedback(task)
  const revisionRequired = requiresA2WritingRevision(task)
  const requiredTurns = Math.max(1, Number(task.response.requiredTurns || task.response.minimumTurns || 1))
  const stagedExchange = task.response.kind === 'free-text-exchange' && requiredTurns > 1
  const workingDraft = stagedExchange && phase === 'writing'
    ? combineOpenResponseTurns([...sentTurns, draft])
    : draft
  const metricsText = phase === 'practice-revising'
    ? draft
    : phase === 'first-feedback' ? firstDraft : (assessedDraft ?? workingDraft)
  const metrics = openResponseMetrics(metricsText || '', task.response)
  const structureTargetsMet = metrics.wordFloorMet && metrics.sentenceFloorMet && metrics.turnFloorMet
  const feedbackText = ['first-feedback', 'revising'].includes(phase)
    ? firstDraft
    : phase === 'practice-revising' ? draft
    : phase === 'self-review' || submitted ? assessedDraft : null
  const feedback = useMemo(
    () => feedbackEnabled && feedbackText != null
      ? analyzeOpenResponseFeedback(feedbackText, task)
      : null,
    [feedbackEnabled, feedbackText, task],
  )

  useEffect(() => {
    const target = phase === 'writing' && sentTurns.length > 0
      ? followUpRef.current
      : ['revising', 'practice-revising'].includes(phase)
        ? draftRef.current
        : phase === 'self-review'
          ? selfReviewRef.current
          : ['first-feedback', 'practice-reviewed'].includes(phase)
            ? feedbackRef.current
            : null
    target?.focus()
  }, [phase, sentTurns.length])

  const save = () => {
    if (submitted || phase !== 'self-review' || (revisionRequired && !revisionCompleted)) return
    const rubric = selfReviewedRubric(task, {
      requirementChecks,
      dimensionChecks,
      structureMet: structureTargetsMet,
    })
    setSubmitted(true)
    onComplete(performanceEvidenceFor(task, rubric), Object.values(rubric).every((score) => score >= 2))
  }

  const checkDraft = () => {
    if (!draft.trim() || submitted) return
    if (stagedExchange && sentTurns.length < requiredTurns - 1) {
      setSentTurns((current) => [...current, draft.trim()])
      setDraft('')
      return
    }
    const completedDraft = stagedExchange
      ? combineOpenResponseTurns([...sentTurns, draft])
      : draft
    setDraft(completedDraft)
    setFirstDraft(completedDraft)
    if (revisionRequired) {
      setPhase('first-feedback')
      return
    }
    setAssessedDraft(completedDraft)
    setPhase('self-review')
  }

  const finishRevision = () => {
    if (!draft.trim() || submitted || phase !== 'revising') return
    setAssessedDraft(draft)
    setRevisionCompleted(true)
    setPhase('self-review')
  }

  const startPracticeRevision = () => {
    if (!submitted) return
    setPracticeRevision(true)
    setPhase('practice-revising')
  }

  const finishPracticeRevision = () => {
    if (!submitted || !practiceRevision || !draft.trim()) return
    setAssessedDraft(draft)
    setPracticeRevision(false)
    setPhase('practice-reviewed')
  }

  return (
      <TaskFrame task={task}>
      <Stimulus task={task} />
      {stagedExchange && phase === 'writing' && sentTurns.map((turn, index) => (
        <blockquote className="cefr-written-stimulus cefr-sent-turn" lang="sq" key={`${task.id}-sent-${index}`}>
          <b>You:</b> {turn}
        </blockquote>
      ))}
      {stagedExchange && sentTurns.length > 0 && (
        <blockquote className="cefr-written-stimulus cefr-follow-up" lang="sq" ref={followUpRef} tabIndex="-1">
          <b>{task.storyAnchor.npcLabel}:</b> {task.stimulus.followUpSq}
        </blockquote>
      )}
      <label className="cefr-draft-label" htmlFor={`cefr-draft-${task.id}`}>
        {stagedExchange && phase === 'writing'
          ? `Your Albanian reply ${sentTurns.length + 1} of ${requiredTurns}`
          : 'Your Albanian message'}
      </label>
      <textarea
        ref={draftRef}
        id={`cefr-draft-${task.id}`}
        lang="sq"
        value={draft}
        disabled={(['first-feedback', 'self-review'].includes(phase) || submitted) && !practiceRevision}
        onChange={(event) => setDraft(event.target.value)}
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
      {phase === 'writing' && !submitted && (
        <button type="button" className="btn primary cefr-submit" disabled={!draft.trim()} onClick={checkDraft}>
          {stagedExchange
            ? sentTurns.length < requiredTurns - 1 ? 'Send reply 1' : 'Send reply 2 and check the exchange'
            : 'Check this draft'}
        </button>
      )}
      {feedback && <div ref={feedbackRef} tabIndex="-1"><DraftFeedback feedback={feedback} /></div>}
      {phase === 'first-feedback' && !submitted && (
        <div className="cefr-review-block cefr-revision-gate">
          <p>Before the A2 self-review, make one deliberate revision pass. You may change the draft or keep a line after checking it carefully.</p>
          <button type="button" className="btn primary" onClick={() => setPhase('revising')}>Revise after this check</button>
        </div>
      )}
      {phase === 'revising' && !submitted && (
        <div className="cefr-review-block cefr-revision-gate">
          <p>Edit the message above using what you noticed, then freeze the revised draft for your honest self-review.</p>
          <button type="button" className="btn primary" disabled={!draft.trim()} onClick={finishRevision}>Finish revision and self-review</button>
        </div>
      )}
      {phase === 'self-review' && !submitted && (
        <div className="cefr-review" ref={selfReviewRef} tabIndex="-1">
          <RequirementReview
            task={task}
            checks={requirementChecks}
            onChange={(id, value) => setRequirementChecks((current) => ({ ...current, [id]: value }))}
          />
          <AnalyticSelfCheck
            checks={dimensionChecks}
            onChange={(id, value) => setDimensionChecks((current) => ({ ...current, [id]: value }))}
          />
          {!structureTargetsMet && <p className="cefr-structure-warning">The frozen assessed draft is below this mission’s required length, sentence, or turn floor. It cannot meet task fulfilment yet; counts do not judge Albanian quality.</p>}
          <p className="cefr-heldout-note">This self-check refers to the frozen assessed draft above. Objective task floors confirm that the response has enough structure; spelling, connector, and anchor notices do not pass or fail the CEFR rubric.</p>
          <div className="cefr-review-actions"><button type="button" className="btn primary" onClick={save}>Save honest self-check</button></div>
        </div>
      )}
      {submitted && (
        <div className="cefr-after-attempt">
          {practiceRevision ? (
            <>
              <p>This edit is private practice. It cannot replace the held-out result already saved.</p>
              <button type="button" className="btn primary" disabled={!draft.trim()} onClick={finishPracticeRevision}>
                Finish and recheck practice revision
              </button>
            </>
          ) : (
            <>
              <p className="cefr-result" role="status">{phase === 'practice-reviewed'
                ? 'Practice revision rechecked. No new readiness evidence was saved.'
                : 'This attempt saved only rubric evidence. Your message was not put in the save file.'}</p>
              <ReviewedAlternatives task={task} />
              <button type="button" className="btn" onClick={startPracticeRevision}>
                {phase === 'practice-reviewed' ? 'Revise again for practice' : 'Revise for practice (not new gate evidence)'}
              </button>
            </>
          )}
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
