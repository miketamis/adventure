import { useEffect, useMemo, useRef, useState } from 'react'
import { DICT } from '../game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../game/everydayAlbanian.js'
import { playPhrase } from '../game/audio.js'
import { FORMS_UNLOCK_THRESHOLD } from '../game/gameState.js'
import { buildPhraseProgressionSnapshot } from '../game/phrasePractice.js'
import {
  PHRASE_PROGRESSION_POLICY,
  PHRASE_STAGE_DEFINITIONS,
  advancePhraseProduction,
} from '../game/phraseProgression.js'
import {
  PHRASE_PROGRESSION_MODEL_CARD,
  PHRASE_PROGRESSION_RESEARCH,
  PHRASE_PROGRESSION_RESEARCH_ALIGNMENT,
} from '../game/phraseProgressionResearch.js'
import {
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_NOUN_ENDING_CORRECTION_POLICY,
  TRAIN_QUESTION_MIX_POLICY,
  TRAIN_SCHEDULER_SAFEGUARDS,
  TRAIN_WORD_FORM_POLICY,
  debugLearningLanes,
} from '../game/trainingProgression.js'
import { TRAIN_EXERCISE_EXAMPLES } from '../game/trainingExampleRegistry.js'
import { NOUN_FORM_ROLE_LABELS } from '../game/nounEndingRefresher.js'
import {
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
  advanceWordProgress,
  wordProgressionSnapshot,
} from '../game/wordProgression.js'

const EXAMPLE_PHRASE_ID = 'going-village'
const EXAMPLE_WORD_ID = 'fshat'

function buildWordWalkthroughSteps() {
  const steps = [{
    id: 'word-entry',
    label: 'word saved',
    detail: 'Saving the word already completed guided recognition; the first Train question has four choices.',
    snapshot: wordProgressionSnapshot(null, 0),
    currentRound: 0,
    rewards: 0,
  }]
  let progress = null
  let round = 0
  let rewards = 0
  let previousBaseStage = 0
  for (let attempt = 0; attempt < 18 && previousBaseStage < WORD_STAGE_DEFINITIONS.length - 1; attempt++) {
    let snapshot = wordProgressionSnapshot(progress, round)
    round = Math.max(round, snapshot.next.dueAfterRound)
    snapshot = wordProgressionSnapshot(progress, round)
    const plan = snapshot.next
    const result = advanceWordProgress(progress, round, {
      correct: true,
      tier: plan.tier,
      mode: plan.mode,
      direction: plan.direction,
      questionKey: `debug-word-${attempt}`,
      round: round + 1,
    })
    if (!result.accepted) break
    progress = result.progress
    rewards += 1
    const after = wordProgressionSnapshot(progress, round + 1)
    if (after.next.baseStage > previousBaseStage) {
      previousBaseStage = after.next.baseStage
      steps.push({
        id: after.next.definition.id,
        label: after.next.difficultyLabel,
        detail: `The exact earlier word proofs are complete; ${after.next.difficultyLabel} is next.`,
        snapshot: after,
        currentRound: round + 1,
        rewards,
      })
    }
    round += 2
  }
  const retention = steps.at(-1)
  if (retention?.snapshot.next.baseStage === WORD_STAGE_DEFINITIONS.length - 1 && !retention.snapshot.next.due) {
    const dueRound = retention.snapshot.next.dueAfterRound
    steps.push({
      ...retention,
      id: 'retained-word-due',
      label: 'retention due',
      detail: 'The review gap has elapsed; exact spelling is ready.',
      snapshot: wordProgressionSnapshot(progress, dueRound),
      currentRound: dueRound,
    })
  }
  return steps
}

// Generate the demonstration by successfully traversing the real production
// state machine. This is local, disposable state: no save data enters it and
// clicking a checkpoint can never award tokens or change the player's game.
function buildWalkthroughSteps(phrase) {
  const first = buildPhraseProgressionSnapshot(phrase, null)
  const focusIds = first.focuses.map(({ id }) => id)
  const steps = [{
    id: 'entry',
    label: 'Entry',
    detail: 'Every required word has just been discovered.',
    snapshot: first,
    currentRound: 0,
    wordRewards: 0,
  }]
  let progress = null
  let round = 0
  let previousStage = first.currentStage
  let wordRewards = 0

  for (let attempt = 0; attempt < 24 && previousStage < PHRASE_STAGE_DEFINITIONS.production.length - 1; attempt++) {
    let snapshot = buildPhraseProgressionSnapshot(phrase, progress, { currentRound: round })
    round = Math.max(round, snapshot.next?.dueAfterRound || 0)
    snapshot = buildPhraseProgressionSnapshot(phrase, progress, { currentRound: round })
    const plan = snapshot.next
    const result = advancePhraseProduction(progress, focusIds, round, {
      correct: true,
      skill: plan.skill,
      tier: plan.tier,
      mode: plan.mode,
      typeScope: plan.typeScope,
      focusId: plan.focusId,
      questionKey: `debug-walkthrough-${attempt}`,
      round,
    })
    if (!result.accepted) break
    progress = result.progress
    if (plan.typeScope !== 'word' || plan.focusId === EXAMPLE_WORD_ID) wordRewards += 1
    const after = buildPhraseProgressionSnapshot(phrase, progress, { currentRound: round })
    if (after.currentStage > previousStage) {
      previousStage = after.currentStage
      steps.push({
        id: after.currentDefinition.id,
        label: after.currentDefinition.label,
        detail: `The earlier production gates are proven; ${after.currentDefinition.label} is next.`,
        snapshot: after,
        currentRound: round,
        wordRewards,
      })
    }
    round += 1
  }

  const retention = steps.at(-1)?.snapshot
  if (retention?.currentDefinition.id === 'strict-retention' && !retention.next.due) {
    const dueRound = retention.next.dueAfterRound
    steps.push({
      id: 'strict-retention-due',
      label: 'retention due',
      detail: 'The independent review gap has elapsed, so strict recall is ready.',
      snapshot: buildPhraseProgressionSnapshot(phrase, progress, { currentRound: dueRound }),
      currentRound: dueRound,
      wordRewards,
    })
  }
  return steps
}

const LANE_COPY = Object.freeze({
  production: {
    title: 'Phrase production',
    note: 'A real ladder: each card proves everything before it, then adds harder recall.',
  },
  listening: {
    title: 'Listening',
    note: 'A separate skill track; the audio is continuous Albanian and never exposes English.',
  },
  matching: {
    title: 'Meaning matching',
    note: 'A separate recognition track with progressively larger phrase boards.',
  },
})

const clean = (value) => String(value || '').replace(/[-_]/g, ' ')

function ExampleButton({ exampleId, label, context, onOpen }) {
  const example = TRAIN_EXERCISE_EXAMPLES[exampleId]
  if (!example) return null
  return (
    <button
      type="button"
      className="dbg-learning-example-button"
      aria-label={`Example question for ${label}`}
      onClick={() => onOpen({ id: exampleId, label, context, example })}
    >
      Example
    </button>
  )
}

function ExampleQuestionPreview({ selection }) {
  const { example } = selection
  return (
    <div className="dbg-learning-question-preview">
      <div className="dbg-learning-question-meta">
        <span>{selection.context}</span>
        <code>{selection.id}</code>
      </div>
      <p className="dbg-learning-question-instruction">{example.instruction}</p>
      {example.audio ? (
        <button
          type="button"
          className="phrase-listen dbg-learning-question-audio"
          onClick={() => playPhrase(example.audio)}
          aria-label="Play the example Albanian phrase"
        >
          <span aria-hidden="true">🔊</span> Play phrase
        </button>
      ) : (
        <div className="dbg-learning-question-prompt" lang={example.promptLang}>
          {example.prompt}
        </div>
      )}
      {example.choices && (
        <div className="dbg-learning-question-choices" aria-label="Example answer choices">
          {example.choices.map((choice) => <span key={choice}>{choice}</span>)}
        </div>
      )}
      {example.tiles && (
        <div className="dbg-learning-question-tiles" aria-label="Example available word tiles" lang="sq">
          {example.tiles.map((tile, index) => <span key={`${tile}-${index}`}>{tile}</span>)}
        </div>
      )}
      {example.input && (
        <div className="dbg-learning-question-input" aria-label="Example text input">
          <span>{example.input}</span>
        </div>
      )}
      {example.pairs && (
        <div className="dbg-learning-question-pairs" aria-label="Example matching board">
          <div lang="sq">{example.pairs.map(({ al }) => <span key={al}>{al}</span>)}</div>
          <div>{example.pairs.map(({ en }) => <span key={en}>{en}</span>)}</div>
        </div>
      )}
      <div className="dbg-learning-question-answer">
        <b>Expected interaction</b>
        <span>{example.response}</span>
      </div>
    </div>
  )
}

function ExampleQuestionDialog({ selection, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!selection || !dialog || dialog.open) return undefined
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [selection])

  if (!selection) return null
  return (
    <dialog
      ref={dialogRef}
      className="dbg-learning-example-dialog"
      aria-labelledby="dbg-learning-example-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        onClose()
      }}
      onClose={onClose}
    >
      <header>
        <div>
          <p className="dbg-learning-kicker">Question example · independent of save</p>
          <h2 id="dbg-learning-example-dialog-title">{selection.label}</h2>
        </div>
        <button
          type="button"
          className="dbg-learning-example-close"
          aria-label="Close example question"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
      </header>
      <ExampleQuestionPreview selection={selection} />
      <p className="dbg-learning-example-caveat">
        This is a disposable debug preview. Opening or answering the real question is the only thing that can create learning evidence.
      </p>
    </dialog>
  )
}

function gateText(definition) {
  const gate = definition.gate
  const details = []
  for (const [key, value] of Object.entries(definition.variant || {})) details.push(`${clean(key)}: ${value}`)
  if (gate?.wins != null) details.push(`${gate.wins} correct ${gate.wins === 1 ? 'proof' : 'proofs'}`)
  if (gate?.winsPerFocus != null) details.push(`${gate.winsPerFocus} correct proof per reviewed focus`)
  if (gate?.distinctWherePossible) details.push('different focus words where possible')
  if (gate?.initialGapRounds != null) details.push(`first retention gap: ${gate.initialGapRounds} Train rounds`)
  if (gate?.multiplier != null) details.push(`successful gap ×${gate.multiplier}`)
  if (definition.availability?.kind === 'same-tier-board') {
    details.push(`available with ${definition.variant.pairs} compatible phrases at this skill tier`)
  }
  return details.join(' · ')
}

function transitionText(definition, definitions) {
  const transition = definition.transition || {}
  const nameOf = (tier) => definitions[tier]?.label || `tier ${tier}`
  if (typeof transition.correct === 'number') {
    const correct = transition.maxTierRepeat
      ? `correct → remain here for future retention rounds`
      : `correct → ${nameOf(transition.correct)}`
    return `${correct}; miss → ${nameOf(transition.wrong)}`
  }
  const parts = []
  if (transition.correct) parts.push(`correct: ${clean(transition.correct)}`)
  if (transition.gatePending != null) parts.push(`gate still pending → stay at ${nameOf(transition.gatePending)}`)
  if (transition.gateMet != null) parts.push(`gate complete → ${nameOf(transition.gateMet)}`)
  if (transition.wrongRemediation === 'diagnostic' || transition.lapseRemediation === 'diagnostic') {
    parts.push('miss → word/order-specific support')
  } else if (transition.wrongRemediation != null) {
    parts.push(`miss → ${nameOf(transition.wrongRemediation)} remediation`)
  }
  return parts.join('; ')
}

function evidenceText(evidence) {
  if (!evidence) return 'No separate evidence counter for this tier.'
  const parts = []
  if (evidence.wins != null) parts.push(`${evidence.wins}/${evidence.winsRequired ?? '—'} wins`)
  if (Array.isArray(evidence.focuses)) {
    const required = Array.isArray(evidence.focusesRequired)
      ? evidence.focusesRequired.length
      : evidence.focusesRequired
    parts.push(`${evidence.focuses.length}/${required ?? '—'} focus proofs`)
  }
  if (evidence.dueAfterRound != null) parts.push(`due after round ${evidence.dueAfterRound}`)
  if (evidence.reviewGap != null) parts.push(`gap ${evidence.reviewGap} rounds`)
  if (!parts.length && evidence.tier != null) parts.push(`example tier ${evidence.tier}`)
  return parts.join(' · ') || 'No evidence recorded yet.'
}

function StageCard({ stage, definitions, focuses, onExample }) {
  const { definition, status, evidence, scheduled, due, remediation } = stage
  const typeDetails = [definition.mode, definition.typeScope, definition.answerTolerance]
    .filter(Boolean).join(' · ')
  const repair = definition.remediation
  const opensNounEndingSheet = TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseProductionStages
    .includes(definition)
  return (
    <li className={`dbg-learning-card ${status}`} data-stage-id={definition.id}>
      <div className="dbg-learning-card-head">
        <div>
          <span className={`dbg-learning-status ${status}`}>{status}</span>
          {scheduled && <span className={`dbg-learning-status ${due ? 'due' : 'locked'}`}>{remediation ? 'repair' : due ? 'due next' : 'spaced'}</span>}
        </div>
        <ExampleButton
          exampleId={definition.id}
          label={definition.label}
          context={`Phrase ${definition.skill || 'production'} · ${definition.mode}`}
          onOpen={onExample}
        />
      </div>
      <h4>{definition.label}</h4>
      <p><code>{typeDetails}</code></p>
      <p><b>Gate:</b> {gateText(definition) || 'tier-specific evidence in this skill'}</p>
      <p><b>Word reward:</b> {definition.typeScope === 'word'
        ? 'only the exact focus word'
        : definition.mode === 'match' ? 'all words across every matched phrase' : 'all words in the phrase'}</p>
      {definition.typeScope === 'word' && focuses.length > 0 && (
        <div className="dbg-learning-focuses" aria-label="Phrase-specific focus words">
          {focuses.map((focus) => (
            <span className={evidence?.focuses?.includes(focus.id) ? 'proved' : ''} key={focus.id}>
              <span lang="sq">{focus.word}</span>{focus.id === EXAMPLE_WORD_ID ? ' · noun lane' : ''}
            </span>
          ))}
        </div>
      )}
      <p><b>Then:</b> {transitionText(definition, definitions)}</p>
      {repair && (
        <span className="dbg-learning-branch">
          miss → {repair.mode || 'earlier support'}{repair.afterDisjointRound ? ' after another-word round' : ''}
        </span>
      )}
      {opensNounEndingSheet && (
        <span className="dbg-learning-branch" data-noun-ending-branch="exact-reviewed-form">
          noun-ending miss → immediate exact-form sheet; scheduled support still waits for the disjoint round
        </span>
      )}
      <div className="dbg-learning-evidence"><b>Selected checkpoint:</b> {evidenceText(evidence)}</div>
    </li>
  )
}

function WordFamilyCard({ family, status = 'locked', statusLabel, onExample }) {
  const label = statusLabel || (family.role === 'remediation' ? 'on error' : status)
  return (
    <li className={`dbg-learning-card ${status}`} data-family-id={family.id}>
      <span className={`dbg-learning-status ${status}`}>{label}</span>
      <h4>{family.label}</h4>
      {family.variants.map((variant) => {
        return (
          <div className="dbg-learning-variant" key={variant.id} data-variant-id={variant.id}>
            <b>{variant.label}</b>
            <ExampleButton
              exampleId={variant.id}
              label={variant.label}
              context={family.label}
              onOpen={onExample}
            />
          </div>
        )
      })}
      {family.kind === 'forms-correction' && (
        <div className="dbg-learning-evidence">
          Appears after a wrong noun-role choice, or after typed word/phrase production changes a reviewed noun ending.
          It explains the exact form immediately and does not cost another quiz round.
        </div>
      )}
    </li>
  )
}

function WordLane({ onExample }) {
  const steps = useMemo(() => buildWordWalkthroughSteps(), [])
  const [selectedStep, setSelectedStep] = useState(0)
  const step = steps[Math.min(selectedStep, steps.length - 1)]
  const { snapshot, rewards: rewardCount } = step
  const boundedRewards = Math.min(rewardCount, FORMS_UNLOCK_THRESHOLD)
  const formsReady = snapshot.next.baseStage >= TRAIN_WORD_FORM_POLICY.lexicalStageRequired &&
    rewardCount >= FORMS_UNLOCK_THRESHOLD
  const gateStatus = formsReady ? 'passed' : 'current'
  return (
    <section className="dbg-learning-lane" aria-labelledby="dbg-learning-word-lane">
      <header className="dbg-learning-lane-head">
        <h3 id="dbg-learning-word-lane">Word and form practice</h3>
        <p>A separate deterministic word walkthrough. It begins when the word is saved and uses the same registry and transition function as Train.</p>
      </header>
      <div className="dbg-learning-step-buttons" role="group" aria-label="Example word progression checkpoint">
        {steps.map((candidate, index) => (
          <button
            type="button"
            className={index === selectedStep ? 'active' : ''}
            aria-pressed={index === selectedStep}
            onClick={() => setSelectedStep(index)}
            key={candidate.id}
          >
            {index}. {candidate.label}
          </button>
        ))}
      </div>
      <p className="dbg-learning-evidence">{step.detail} This example is disposable and never changes your save.</p>
      <ol className="dbg-learning-flow">
        {snapshot.stages.map(({ definition, status, wins, winsRequired, remediation, due }) => {
          return (
            <li className={`dbg-learning-card ${status}`} data-word-stage-id={definition.id} key={definition.id}>
              <div className="dbg-learning-card-head">
                <span className={`dbg-learning-status ${status}`}>{remediation ? 'repair' : due ? 'due' : status}</span>
                <ExampleButton
                  exampleId={definition.id}
                  label={definition.label}
                  context={`Word ${definition.mode} · ${definition.direction}`}
                  onOpen={onExample}
                />
              </div>
              <h4>{definition.label}</h4>
              <p><b>Proof:</b> {definition.proves}</p>
              <p><b>Gate:</b> {winsRequired == null ? 'spaced strict recall' : `${wins}/${winsRequired} correct at this exact stage`}</p>
              <p><b>Miss:</b> {definition.tier === 0 ? 'repeat entry support after a different word' : 'one easier supported retrieval, then return here'}</p>
            </li>
          )
        })}
        <li className={`dbg-learning-card ${gateStatus}`} data-word-form-gate="practice-wins">
          <span className={`dbg-learning-status ${gateStatus}`}>{boundedRewards} / {FORMS_UNLOCK_THRESHOLD}</span>
          <h4>Noun-form gate</h4>
          <p>Correct rounds that reward <span lang="sq">fshat</span> add to its practice count, but that total cannot replace lexical production.</p>
          <div className="dbg-learning-evidence"><b>Rule:</b> forms need {FORMS_UNLOCK_THRESHOLD} rewards and completion of {WORD_STAGE_DEFINITIONS[TRAIN_WORD_FORM_POLICY.lexicalStageRequired - 1].label}.</div>
        </li>
        <WordFamilyCard
          family={TRAIN_EXERCISE_FAMILIES.wordForms}
          status={formsReady ? 'current' : 'locked'}
          statusLabel={formsReady ? 'unlocked' : 'unlocks next'}
          onExample={onExample}
        />
      </ol>
      <div className="dbg-learning-parallel" aria-label="Parallel and corrective word exercise branches">
        <div>
          <p className="dbg-learning-branch-label">Parallel homonym path · not a <span lang="sq">fshat</span> gate</p>
          <ul className="dbg-learning-flow parallel">
            <WordFamilyCard family={TRAIN_EXERCISE_FAMILIES.wordContext} status="current" statusLabel="when applicable" onExample={onExample} />
          </ul>
        </div>
        <div>
          <p className="dbg-learning-branch-label">Wrong noun answer only</p>
          <ul className="dbg-learning-flow parallel">
            <WordFamilyCard family={TRAIN_EXERCISE_FAMILIES.nounCorrection} status="locked" onExample={onExample} />
          </ul>
        </div>
      </div>
    </section>
  )
}

function Research({ entries }) {
  const sourceById = new Map(entries.map((entry) => [entry.id, entry]))
  return (
    <section className="dbg-learning-research dbg-learning-foot" aria-labelledby="dbg-learning-research-title">
      <h3 id="dbg-learning-research-title">Why the scheduler is shaped this way</h3>
      <p className="dbg-learning-model-card">
        <span className="dbg-learning-status current">{PHRASE_PROGRESSION_MODEL_CARD.classification}</span>{' '}
        {PHRASE_PROGRESSION_MODEL_CARD.reason}
      </p>
      <div className="dbg-learning-alignment">
        {PHRASE_PROGRESSION_RESEARCH_ALIGNMENT.map((item) => (
          <article key={item.id}>
            <span className={`dbg-learning-status ${item.status === 'implemented' ? 'passed' : 'due'}`}>
              {item.status}
            </span>
            <h4>{clean(item.id)}</h4>
            <p>{item.systemResponse}</p>
            <p className="dbg-learning-alignment-sources">
              {item.evidenceIds.map((id, index) => {
                const source = sourceById.get(id)
                return source ? (
                  <span key={id}>{index > 0 ? ' · ' : ''}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>
                ) : null
              })}
            </p>
          </article>
        ))}
      </div>
      <h4>Primary research register</h4>
      <ul>
        {entries.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
          </li>
        ))}
      </ul>
      <p className="dbg-learning-caveat">{PHRASE_PROGRESSION_POLICY.caveat} The often-cited 85% result is binary-classification evidence, not a proven Albanian-learning threshold.</p>
      <p className="dbg-learning-caveat"><b>Calibration gate:</b> {PHRASE_PROGRESSION_MODEL_CARD.calibrationRequirement}</p>
    </section>
  )
}

export default function DebugLearningProgression() {
  const phrase = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === EXAMPLE_PHRASE_ID)
  const steps = useMemo(() => buildWalkthroughSteps(phrase), [phrase])
  const [selectedStep, setSelectedStep] = useState(0)
  const [questionExample, setQuestionExample] = useState(null)
  const step = steps[Math.min(selectedStep, steps.length - 1)]
  const snapshot = step.snapshot
  const lanes = debugLearningLanes(snapshot, { phraseEligible: true })
  const word = DICT[EXAMPLE_WORD_ID]
  const nextFocus = snapshot.next?.focusId ? DICT[snapshot.next.focusId]?.al || snapshot.next.focusId : 'whole phrase'
  const roundsUntilDue = Math.max(0, (snapshot.next?.dueAfterRound || 0) - step.currentRound)

  return (
    <div className="dbg-learning" data-example-phrase={EXAMPLE_PHRASE_ID} data-walkthrough-state="independent">
      <section className="dbg-learning-controls" aria-labelledby="dbg-learning-controls-title">
        <div>
          <p className="dbg-learning-kicker">Independent interactive example</p>
          <h3 id="dbg-learning-controls-title">Move the example through its production checkpoints</h3>
          <p>{step.detail} These controls change only this diagram, never your save.</p>
        </div>
        <div className="dbg-learning-step-buttons" role="group" aria-label="Example progression checkpoint">
          {steps.map((candidate, index) => (
            <button
              type="button"
              className={index === selectedStep ? 'active' : ''}
              aria-pressed={index === selectedStep}
              onClick={() => setSelectedStep(index)}
              key={candidate.id}
            >
              {index}. {candidate.label}
            </button>
          ))}
        </div>
      </section>
      <div className="dbg-learning-hero">
        <section className="dbg-learning-example" aria-labelledby="dbg-learning-example-title">
          <p className="dbg-learning-kicker">Independent rules walkthrough · one example phrase</p>
          <h3 id="dbg-learning-example-title" lang="sq">{phrase.al}</h3>
          <p>{phrase.en}</p>
        </section>
        <section className="dbg-learning-now" aria-labelledby="dbg-learning-now-title">
          <h3 id="dbg-learning-now-title">Selected example checkpoint</h3>
          <dl>
            <dt>Entry condition</dt><dd><span className="dbg-learning-status passed">all phrase words discovered</span></dd>
            <dt>Next production</dt><dd>{snapshot.next?.difficultyLabel} · <code>{snapshot.next?.mode}</code></dd>
            <dt>Focus</dt><dd lang={nextFocus === 'whole phrase' ? undefined : 'sq'}>{nextFocus}</dd>
            <dt>Focus set</dt><dd>{snapshot.focuses.map((focus) => <span className="dbg-learning-inline-focus" lang="sq" key={focus.id}>{focus.word}</span>)}</dd>
            <dt>Spacing</dt><dd>{snapshot.next?.due ? 'ready now' : `${roundsUntilDue} disjoint Train round${roundsUntilDue === 1 ? '' : 's'} before due`}</dd>
            <dt>Remediation</dt><dd>{snapshot.next?.remediation ? snapshot.next.remediationReason : 'none in this successful path'}</dd>
          </dl>
        </section>
      </div>

      <div className="dbg-learning-layout">
        <aside className="dbg-learning-side" aria-label="Example word and scheduler rules">
          <section className="dbg-learning-word" aria-labelledby="dbg-learning-word-title">
            <p className="dbg-learning-kicker">Example word inside the phrase</p>
            <h3 id="dbg-learning-word-title"><span lang="sq">{word.al}</span> · {word.en}</h3>
            <dl className="dbg-learning-forms">
              {word.forms.map((form) => (
                <div className={`dbg-learning-form ${form.al === EXAMPLE_WORD_ID ? 'in-phrase' : ''}`} key={`${form.tag}-${form.al}`}>
                  <dt lang="sq">{form.al}</dt>
                  <dd>{NOUN_FORM_ROLE_LABELS[form.tag] || clean(form.tag)} · {form.gloss}
                    {form.al === EXAMPLE_WORD_ID && <em>surface used in this phrase</em>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="dbg-learning-rules" aria-labelledby="dbg-learning-rules-title">
            <h3 id="dbg-learning-rules-title">What is shared — and what is not</h3>
            <ul>
              <li>Saving every required word makes the phrase eligible; general word quizzes do not skip a phrase-production gate.</li>
              <li>When a correct phrase round rewards <span lang="sq">fshat</span>, it raises the shared practice count; forms still wait for the word ladder’s own spelling proof.</li>
              <li>Cloze and contextual spelling record phrase-specific focus evidence. A win for the same word in another phrase does not count here.</li>
              <li>Listening and matching have separate evidence. They unlock only at production stage {PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage}: {PHRASE_PROGRESSION_POLICY.crossSkillUnlock.rationale}</li>
            </ul>
          </section>
        </aside>

        <div className="dbg-learning-lanes">
          <WordLane onExample={setQuestionExample} />
          <div className="dbg-learning-interlock" role="note" data-evidence-interlock="phrase-reward-to-word-practice">
            <b>One-way shared edge:</b> a correct phrase round that rewards <span lang="sq">fshat</span> feeds its lifetime practice counter. It cannot replace the word’s own spelling proof, while word or form drills never advance a phrase card.
          </div>
          {lanes.map((lane) => (
            <section className="dbg-learning-lane" aria-labelledby={`dbg-learning-${lane.id}`} key={lane.id}>
              <header className="dbg-learning-lane-head">
                <h3 id={`dbg-learning-${lane.id}`}>{LANE_COPY[lane.id].title}</h3>
                <p>{LANE_COPY[lane.id].note}</p>
              </header>
              <ol className="dbg-learning-flow">
                {lane.stages.map((stage) => (
                  <StageCard stage={stage} definitions={lane.definitions} focuses={snapshot.focuses} onExample={setQuestionExample} key={stage.definition.id} />
                ))}
              </ol>
            </section>
          ))}

          <section className="dbg-learning-rules dbg-learning-foot" aria-labelledby="dbg-learning-scheduling-title">
            <h3 id="dbg-learning-scheduling-title">Selection, spacing and backoff</h3>
            <ul>
              <li>Selection attempts: {Math.round(TRAIN_QUESTION_MIX_POLICY.phraseShare * 100)}% go first to a legal, due phrase; within the remaining word allocation, {Math.round(TRAIN_QUESTION_MIX_POLICY.formShareWithinWordRounds * 100)}% tries noun forms when eligible. An unavailable family falls through without breaking no-repeat.</li>
              <li>After the cross-skill gate, a due phrase uses {Math.round(TRAIN_QUESTION_MIX_POLICY.phraseSkill.productionWhenDueUpperBound * 100)}% production, {Math.round((TRAIN_QUESTION_MIX_POLICY.phraseSkill.listeningUpperBound - TRAIN_QUESTION_MIX_POLICY.phraseSkill.productionWhenDueUpperBound) * 100)}% listening and {Math.round((1 - TRAIN_QUESTION_MIX_POLICY.phraseSkill.listeningUpperBound) * 100)}% matching. While production is spaced, its share moves to listening.</li>
              <li>Targeting weights practical vocabulary ×{TRAIN_QUESTION_MIX_POLICY.practicalWordWeight} and zero-token needs ×{TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight}; mistakes raise priority while familiarity lowers it.</li>
              <li>{TRAIN_SCHEDULER_SAFEGUARDS.noImmediateSharedWords && 'Consecutive questions never share an Albanian word.'} {!TRAIN_SCHEDULER_SAFEGUARDS.repeatWhenNoDisjointTargetExists && `If the legal pool is exhausted, Train reports ${TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome} instead of repeating.`}</li>
              <li>A miss schedules targeted support only after another-word round; retention lapses step back to supported production before strict recall returns.</li>
              <li>Correct strict retrieval expands the real review gap up to {PHRASE_PROGRESSION_POLICY.retention.maximumGapRounds} Train rounds.</li>
              <li><b>Evidence boundary:</b> the word ladder proves {WORD_PROGRESSION_POLICY.evidenceBoundary.proves.join(', ')}. It does not by itself prove {WORD_PROGRESSION_POLICY.evidenceBoundary.doesNotProve.join(', ')}.</li>
            </ul>
          </section>
        </div>

        <Research entries={PHRASE_PROGRESSION_RESEARCH} />
      </div>
      <ExampleQuestionDialog selection={questionExample} onClose={() => setQuestionExample(null)} />
    </div>
  )
}
