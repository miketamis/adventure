import { useMemo, useState } from 'react'
import { DICT } from '../game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../game/everydayAlbanian.js'
import {
  CEFR_IMPLEMENTATION_BY_FAMILY,
  cefrFamilyReachability,
  cefrModeProgress,
  cefrProfile,
  cefrWindowIdForTask,
  mergeCefrEvidence,
  performanceEvidenceFor,
  receptionEvidenceFor,
} from '../game/cefrAssessment.js'
import {
  CEFR_CAPSTONE_TASK_FAMILIES,
  CEFR_LEVEL_GATES,
  CEFR_LEVEL_OUTCOMES,
  CEFR_MODES,
  CEFR_PRODUCT_CLAIMS,
  CURRENT_CEFR_EVIDENCE,
} from '../game/cefrProgression.js'
import {
  CEFR_PREPARATION_ACTIVITIES,
  CEFR_PREPARATION_CAPABILITIES,
  CEFR_PREPARATION_EVIDENCE_CONTRACT,
  CEFR_PREPARATION_EXAMPLES,
  CEFR_PREPARATION_MECHANICS,
  CEFR_PREPARATION_STAGES,
  preparationMechanicsForCapstone,
  preparationPlan,
} from '../game/cefrPreparation.js'
import { liveCefrPreparationEvidence } from '../game/cefrPreparationEvidence.js'
import { CEFR_TASKS, CEFR_TASKS_BY_FAMILY } from '../game/cefrTasks.js'
import { NOUN_FORM_ROLE_LABELS } from '../game/nounEndingRefresher.js'
import {
  advancePhraseProduction,
  PHRASE_PROGRESSION_POLICY,
  PHRASE_STAGE_DEFINITIONS,
} from '../game/phraseProgression.js'
import { buildPhraseProgressionSnapshot } from '../game/phrasePractice.js'
import { phraseProductionFocusIds } from '../game/phraseFocus.js'
import { TRAIN_WORD_FORM_POLICY } from '../game/trainingProgression.js'
import {
  advanceWordProgress,
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
  wordProgressionSnapshot,
} from '../game/wordProgression.js'

const EXAMPLE_PHRASE_ID = 'going-village'
const EXAMPLE_WORD_ID = 'fshat'
const LEVELS = ['A1', 'A2']
const RECEPTION_MODES = new Set(['listening', 'reading'])

const clean = (value) => String(value || '').replace(/[-_]/g, ' ')
const titleCase = (value) => value ? value[0].toLocaleUpperCase('sq') + value.slice(1) : ''
const statusClass = (passed, current = false) => passed ? 'passed' : current ? 'current' : 'locked'
const countBy = (items, keyFor) => items.reduce((counts, item) => {
  const key = keyFor(item)
  counts[key] = (counts[key] || 0) + 1
  return counts
}, {})

function simulateWord() {
  const snapshots = [{
    id: 'word-entry', label: 'word saved', note: 'Saving the word completed guided recognition; the real next task is four-choice independent Albanian-to-English recognition.',
    value: wordProgressionSnapshot(null, 0), round: 0,
  }]
  let progress = null
  let round = 0
  let previousStage = 0
  for (let attempt = 0; attempt < 30 && previousStage < WORD_STAGE_DEFINITIONS.length - 1; attempt++) {
    let snapshot = wordProgressionSnapshot(progress, round)
    round = Math.max(round, snapshot.next.dueAfterRound)
    snapshot = wordProgressionSnapshot(progress, round)
    const plan = snapshot.next
    const result = advanceWordProgress(progress, round, {
      correct: true,
      tier: plan.tier,
      mode: plan.mode,
      direction: plan.direction,
      questionKey: `cefr-debug-word-${attempt}`,
      round: round + 1,
    })
    if (!result.accepted) break
    progress = result.progress
    const after = wordProgressionSnapshot(progress, round + 1)
    if (after.next.baseStage > previousStage) {
      previousStage = after.next.baseStage
      snapshots.push({
        id: `word-${after.next.definition.id}`,
        label: after.next.difficultyLabel,
        note: `The exact earlier lexical proofs are complete; ${after.next.difficultyLabel} is next.`,
        value: after,
        round: round + 1,
      })
    }
    round += 2
  }
  return snapshots
}

function simulatePhrase(phrase) {
  const focusIds = phraseProductionFocusIds(phrase)
  const snapshots = [{
    id: 'phrase-entry', label: 'phrase eligible', note: 'All required words are discovered; phrase-specific evidence is still empty.',
    value: buildPhraseProgressionSnapshot(phrase, null), round: 0,
  }]
  let progress = null
  let round = 0
  let previousStage = 0
  for (let attempt = 0; attempt < 30 && previousStage < PHRASE_STAGE_DEFINITIONS.production.length - 1; attempt++) {
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
      questionKey: `cefr-debug-phrase-${attempt}`,
      round,
    })
    if (!result.accepted) break
    progress = result.progress
    const after = buildPhraseProgressionSnapshot(phrase, progress, { currentRound: round })
    if (after.currentStage > previousStage) {
      previousStage = after.currentStage
      snapshots.push({
        id: `phrase-${after.currentDefinition.id}`,
        label: after.currentDefinition.label,
        note: `The phrase-specific production gate advanced to ${after.currentDefinition.label}.`,
        value: after,
        round,
      })
    }
    round += 1
  }
  return snapshots
}

function passingEvidence(task) {
  if (RECEPTION_MODES.has(task.mode)) {
    const answers = Object.fromEntries(task.questions.map((question) => [question.id, question.acceptedChoiceIds[0]]))
    return receptionEvidenceFor(task, answers)
  }
  const rubric = Object.fromEntries(task.rubric.dimensions.map((dimension) => [dimension, 2]))
  return performanceEvidenceFor(task, rubric, {
    pronunciationPass: true,
    recordingCaptured: ['spokenInteraction', 'spokenProduction'].includes(task.mode),
  })
}

function assessmentEvidence(level, phase) {
  return CEFR_TASKS.filter((task) => {
    if (task.level !== level) return false
    if (phase === 'full') return true
    if (RECEPTION_MODES.has(task.mode)) return cefrWindowIdForTask(task).endsWith('window-1')
    return CEFR_TASKS_BY_FAMILY[task.familyId].indexOf(task) < 1
  }).flatMap(passingEvidence)
}

const preparationWordStages = Object.fromEntries(
  [...new Set(CEFR_PREPARATION_ACTIVITIES.flatMap(({ focusSenseIds }) => focusSenseIds))]
    .map((senseId) => [senseId, WORD_STAGE_DEFINITIONS.at(-1).id]),
)

function completedPreparationThrough(stageOrder) {
  const stages = CEFR_PREPARATION_STAGES.filter(({ order }) => order <= stageOrder)
  const passedMechanicIds = new Set(stages.flatMap(({ id }) =>
    Object.values(CEFR_PREPARATION_MECHANICS)
      .filter(({ stageId }) => stageId === id)
      .map(({ id }) => id)))
  return {
    achievedLevels: stageOrder >= CEFR_PREPARATION_STAGES.find(({ id }) => id === 'a2-understand').order
      ? ['A1']
      : [],
    wordStages: preparationWordStages,
    mechanicPasses: Object.fromEntries([...passedMechanicIds].map((mechanicId) => [
      mechanicId,
      CEFR_PREPARATION_ACTIVITIES.filter((activity) => activity.mechanicId === mechanicId)
        .map(({ id }) => id),
    ])),
  }
}

function buildWalkthrough() {
  const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === EXAMPLE_PHRASE_ID)
  const wordSteps = simulateWord()
  const phraseSteps = simulatePhrase(phrase)
  const wordFinal = wordSteps.at(-1).value
  const phraseFinal = phraseSteps.at(-1).value
  const emptyEvidence = []
  const a1Window = mergeCefrEvidence([], assessmentEvidence('A1', 'first-window'))
  const a1Full = mergeCefrEvidence([], assessmentEvidence('A1', 'full'))
  const a2Window = mergeCefrEvidence(a1Full, assessmentEvidence('A2', 'first-window'))
  const a2Full = mergeCefrEvidence(a1Full, assessmentEvidence('A2', 'full'))
  const foundation = [
    ...wordSteps.map((step, index) => ({
      id: step.id,
      label: step.label,
      note: step.note,
      word: step.value,
      phrase: buildPhraseProgressionSnapshot(phrase, null),
      evidence: emptyEvidence,
      preparationEvidence: {},
      kind: index === 0 ? 'entry' : 'word',
    })),
    ...phraseSteps.slice(1).map((step) => ({
      id: step.id,
      label: step.label,
      note: step.note,
      word: wordFinal,
      phrase: step.value,
      evidence: emptyEvidence,
      preparationEvidence: {},
      kind: 'phrase',
    })),
  ]
  const a1Preparation = CEFR_PREPARATION_STAGES.filter(({ level }) => level === 'A1').map((stage) => ({
    id: `preparation-${stage.id}`,
    label: stage.label,
    kind: 'preparation',
    word: wordFinal,
    phrase: phraseFinal,
    evidence: emptyEvidence,
    preparationEvidence: completedPreparationThrough(stage.order),
    note: `${stage.outcome} This preparation remains separate from held-out A1 evidence.`,
  }))
  const a1AchievedPreparation = {
    ...a1Preparation.at(-1).preparationEvidence,
    achievedLevels: ['A1'],
  }
  const a2Preparation = CEFR_PREPARATION_STAGES.filter(({ level }) => level === 'A2').map((stage) => ({
    id: `preparation-${stage.id}`,
    label: stage.label,
    kind: 'preparation',
    word: wordFinal,
    phrase: phraseFinal,
    evidence: a1Full,
    preparationEvidence: completedPreparationThrough(stage.order),
    note: `${stage.outcome} A1 is already proven, so this A2 preparation may unlock.`,
  }))
  return [
    ...foundation,
    ...a1Preparation,
    {
      id: 'a1-window-one', label: 'A1 first window', kind: 'capstone', word: wordFinal, phrase: phraseFinal,
      evidence: a1Window, preparationEvidence: a1Preparation.at(-1).preparationEvidence,
      note: 'One held-out reception window and one task per performance mode are present; no mode can borrow strength from another.',
    },
    {
      id: 'a1-ready', label: 'A1 ready', kind: 'capstone', word: wordFinal, phrase: phraseFinal,
      evidence: a1Full, preparationEvidence: a1AchievedPreparation,
      note: 'Every A1 mode and the pronunciation floor pass. This exact result unlocks A2.',
    },
    ...a2Preparation,
    {
      id: 'a2-window-one', label: 'A2 first window', kind: 'capstone', word: wordFinal, phrase: phraseFinal,
      evidence: a2Window, preparationEvidence: a2Preparation.at(-1).preparationEvidence,
      note: 'A1 remains proven while A2 has only its first transfer window and one task in each performance mode.',
    },
    {
      id: 'a2-ready', label: 'A2 ready', kind: 'capstone', word: wordFinal, phrase: phraseFinal,
      evidence: a2Full, preparationEvidence: a2Preparation.at(-1).preparationEvidence,
      note: 'Every A2 mode passes its own gate after the A1 prerequisite.',
    },
  ]
}

function modeEvidence(level, mode, evidence) {
  const events = evidence.filter((event) => event.level === level && event.mode === mode)
  return {
    events: events.length,
    tasks: new Set(events.map(({ taskId }) => taskId)).size,
    windows: [...new Set(events.map(({ windowId }) => windowId))],
  }
}

function ProfileGrid({ evidence, label }) {
  const profile = cefrProfile(evidence)
  const profileId = `dbg-cefr-profile-${label.toLocaleLowerCase('en').replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section className="dbg-cefr-profile" aria-labelledby={profileId}>
      <h3 id={profileId}>{label}</h3>
      <div className="dbg-cefr-levels">
        {LEVELS.map((level) => (
          <article className={`dbg-cefr-level ${profile[level].passed ? 'passed' : ''}`} key={level}>
            <header>
              <b>{level}</b>
              <span className={`dbg-learning-status ${statusClass(profile[level].passed)}`}>
                {profile[level].passed ? 'level ready' : level === 'A2' && !profile.A1.passed ? 'A1 blocked' : 'not yet'}
              </span>
            </header>
            <div className="dbg-cefr-mode-strip">
              {CEFR_MODES.map((mode) => {
                const status = profile[level].modes[mode.id]
                const counts = modeEvidence(level, mode.id, evidence)
                return (
                  <div className={status?.passed ? 'passed' : 'locked'} key={mode.id}>
                    <b>{mode.label}</b>
                    <span>{counts.tasks} tasks · {counts.events} evidence rows</span>
                    <small>{status?.passed ? 'gate met' : status?.implementationReady ? 'evidence incomplete' : 'implementation blocked'}</small>
                  </div>
                )
              })}
            </div>
            <p>
              Pronunciation: {profile[level].pronunciationMet ? 'met' : 'not met'} · prerequisite: {profile[level].prerequisiteMet ? 'met' : 'blocked'} · all modes: {profile[level].allModesMet ? 'met' : 'incomplete'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PreparationCheckpoint({ evidence }) {
  const plans = LEVELS.map((level) => ({ level, plan: preparationPlan(level, evidence) }))
  return (
    <div className="dbg-cefr-prep-checkpoint" aria-label="Deterministic preparation checkpoint">
      {plans.map(({ level, plan }) => {
        const complete = plan.filter(({ readiness }) => readiness.complete).length
        const ready = plan.filter(({ readiness }) => readiness.ready && !readiness.complete).length
        return (
          <div key={level}>
            <b>{level} preparation</b>
            <span>{complete}/{plan.length} mechanics complete · {ready} ready next</span>
          </div>
        )
      })}
      <small>Preparation events never enter the held-out CEFR evidence ledger.</small>
    </div>
  )
}

function Walkthrough() {
  const steps = useMemo(buildWalkthrough, [])
  const [selected, setSelected] = useState(0)
  const step = steps[Math.min(selected, steps.length - 1)]
  const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === EXAMPLE_PHRASE_ID)
  const word = DICT[EXAMPLE_WORD_ID]
  return (
    <section className="dbg-cefr-walkthrough" aria-labelledby="dbg-cefr-walkthrough-title" data-example-phrase={EXAMPLE_PHRASE_ID}>
      <header className="dbg-cefr-section-head">
        <div>
          <p className="dbg-learning-kicker">Deterministic interactive walkthrough · independent of save</p>
          <h3 id="dbg-cefr-walkthrough-title">One learning thread from a new noun to an A2 transfer profile</h3>
          <p>Every checkpoint is generated by the production transition and assessment functions. These buttons cannot save, award tokens or change a player result.</p>
        </div>
      </header>
      <div className="dbg-learning-step-buttons" role="group" aria-label="Deterministic CEFR walkthrough checkpoint">
        {steps.map((candidate, index) => (
          <button
            type="button"
            className={selected === index ? 'active' : ''}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            key={candidate.id}
          >
            {index}. {candidate.label}
          </button>
        ))}
      </div>
      <p className="dbg-cefr-selected-note"><b>Selected:</b> {step.note}</p>
      <div className="dbg-cefr-example-grid">
        <article>
          <span className="dbg-learning-status current">word track</span>
          <h4><span lang="sq">{word.al}</span> · {word.en}</h4>
          <p>Next: <b>{step.word.next.difficultyLabel}</b> · tier {step.word.next.tier} · {step.word.next.mode} · {step.word.next.direction}</p>
          <p>{WORD_PROGRESSION_POLICY.principle}</p>
          <div className="dbg-cefr-mini-flow">
            {WORD_STAGE_DEFINITIONS.map((definition) => (
              <span className={statusClass(definition.tier < step.word.next.baseStage, definition.tier === step.word.next.baseStage)} key={definition.id}>
                {definition.label}
              </span>
            ))}
          </div>
        </article>
        <article>
          <span className="dbg-learning-status current">phrase track</span>
          <h4 lang="sq">{titleCase(phrase.al)}</h4>
          <p>{phrase.en} · next: <b>{step.phrase.next?.difficultyLabel}</b> · {step.phrase.next?.mode}</p>
          <p>{PHRASE_PROGRESSION_POLICY.principle}</p>
          <div className="dbg-cefr-mini-flow">
            {PHRASE_STAGE_DEFINITIONS.production.map((definition) => (
              <span className={statusClass(definition.tier < step.phrase.currentStage, definition.tier === step.phrase.currentStage)} key={definition.id}>
                {definition.label}
              </span>
            ))}
          </div>
        </article>
        <article>
          <span className="dbg-learning-status current">noun forms</span>
          <h4>{word.forms.length} reviewed <span lang="sq">fshat</span> forms</h4>
          <p>Unlocked only after lexical stage {TRAIN_WORD_FORM_POLICY.lexicalStageRequired} and {TRAIN_WORD_FORM_POLICY.practiceWinsRequired} rewarded practices; phrase wins may add practice but never replace word spelling.</p>
          <dl className="dbg-cefr-form-list">
            {word.forms.map((form) => (
              <div key={`${form.tag}:${form.al}`}>
                <dt lang="sq">{form.al}</dt>
                <dd>{NOUN_FORM_ROLE_LABELS[form.tag] || clean(form.tag)} · {form.gloss}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
      <PreparationCheckpoint evidence={step.preparationEvidence} />
      <ProfileGrid evidence={step.evidence} label="Deterministic example profile" />
    </section>
  )
}

function gateSummary(level) {
  const gate = CEFR_LEVEL_GATES[level]
  return [
    `${Math.round(gate.reception.minimumAccuracy * 100)}% reception accuracy`,
    `${gate.reception.minimumDistinctWindows} distinct windows`,
    `${gate.reception.minimumFormsPerWindow} question forms per window`,
    `${gate.performance.minimumPassingTasksPerMode} passing tasks per performance mode`,
    `every rubric dimension ≥ ${gate.performance.passFloorEachDimension}`,
    `${gate.pronunciation.minimumPassingRecordings} intelligible recordings`,
    gate.nonCompensatory ? 'all seven modes; no compensation' : 'compensatory',
    gate.prerequisite ? `${gate.prerequisite} prerequisite` : 'no level prerequisite',
  ]
}

function Reachability({ reachability, mode }) {
  if (RECEPTION_MODES.has(mode)) {
    return (
      <div className="dbg-cefr-reachability">
        {reachability.windows.map((window) => (
          <p className={window.reachable ? '' : 'unreachable'} key={window.id}>
            <b>{window.id.split(':').at(-1)}</b>: {window.correct}/{window.attempted} correct evidence forms · {window.freshForms} fresh · {window.missBudget} further misses remain possible
          </p>
        ))}
      </div>
    )
  }
  return (
    <div className="dbg-cefr-reachability">
      <p className={reachability.reachable ? '' : 'unreachable'}>
        <b>First-attempt budget</b>: {reachability.passing}/{reachability.required} passing tasks · {reachability.freshTasks} fresh chances · {reachability.missBudget} further misses remain possible
      </p>
    </div>
  )
}

function FamilyCoverage({ evidence }) {
  return (
    <section className="dbg-cefr-families" aria-labelledby="dbg-cefr-families-title">
      <header className="dbg-cefr-section-head">
        <div>
          <p className="dbg-learning-kicker">Live progression and held-out task contracts</p>
          <h3 id="dbg-cefr-families-title">A1, then A2 · seven non-compensatory modes</h3>
        </div>
      </header>
      {LEVELS.map((level) => (
        <section className="dbg-cefr-family-level" aria-labelledby={`dbg-cefr-family-${level}`} key={level}>
          <div className="dbg-cefr-gate-card">
            <h4 id={`dbg-cefr-family-${level}`}>{level} gate</h4>
            <ul>{gateSummary(level).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="dbg-cefr-family-grid">
            {CEFR_LEVEL_OUTCOMES[level].map((outcome) => outcome.taskFamilies.map((familyId) => {
              const family = CEFR_CAPSTONE_TASK_FAMILIES[familyId]
              const tasks = CEFR_TASKS_BY_FAMILY[familyId] || []
              const speakerIdentities = new Set(tasks.map((task) => task.voice?.id).filter(Boolean)).size
              const acousticVoices = new Set(tasks.map((task) => task.voice?.synthesisVoice).filter(Boolean)).size
              const textTypes = new Set(tasks.map((task) => task.textType).filter(Boolean)).size
              const topics = new Set(tasks.map((task) => task.topic).filter(Boolean)).size
              const windows = [...new Set(tasks.map(cefrWindowIdForTask))]
              const preparationMechanics = preparationMechanicsForCapstone(familyId)
              const reachability = cefrFamilyReachability(familyId, evidence)
              const blockers = []
              if (family.implementation !== 'implemented') blockers.push(`progression registry: ${family.implementation}`)
              if (CEFR_IMPLEMENTATION_BY_FAMILY[familyId] !== 'implemented') blockers.push('renderer does not cover every declared kind')
              if (tasks.length < family.minimumForms) blockers.push(`${tasks.length}/${family.minimumForms} authored forms`)
              if (family.minimumSpeakerIdentities && speakerIdentities < family.minimumSpeakerIdentities) {
                blockers.push(`${speakerIdentities}/${family.minimumSpeakerIdentities} speaker identities`)
              }
              if (family.minimumAcousticVoices && acousticVoices < family.minimumAcousticVoices) {
                blockers.push(`${acousticVoices}/${family.minimumAcousticVoices} acoustic voices`)
              }
              if (family.minimumTextTypes && textTypes < family.minimumTextTypes) blockers.push(`${textTypes}/${family.minimumTextTypes} text types`)
              if (family.minimumTopicFamilies && topics < family.minimumTopicFamilies) blockers.push(`${topics}/${family.minimumTopicFamilies} topic families`)
              return (
                <article className="dbg-cefr-family-card" data-family-id={familyId} key={familyId}>
                  <header>
                    <div>
                      <span>{level} · {CEFR_MODES.find(({ id }) => id === family.mode)?.label}</span>
                      <h4>{familyId}</h4>
                    </div>
                    <span className={`dbg-learning-status ${reachability.passed ? 'passed' : reachability.reachable ? 'current' : 'locked'}`}>
                      {reachability.passed ? 'gate evidence met' : reachability.reachable ? `${reachability.freshTasks} fresh tasks` : 'practice/reset required'}
                    </span>
                  </header>
                  <p>{outcome.descriptor}</p>
                  <dl>
                    <dt>Declared</dt><dd>{family.implementation}</dd>
                    <dt>Renderer</dt><dd>{CEFR_IMPLEMENTATION_BY_FAMILY[familyId]}</dd>
                    <dt>Bank</dt><dd>{tasks.length} forms · {topics} topics{speakerIdentities ? ` · ${speakerIdentities} speaker identities` : ''}{acousticVoices ? ` · ${acousticVoices} acoustic voices` : ''}{textTypes ? ` · ${textTypes} text types` : ''}</dd>
                    <dt>Windows</dt><dd>{windows.join(' · ')}</dd>
                    <dt>Preparation</dt><dd>{preparationMechanics.map(({ id }) => id).join(' · ')}</dd>
                    <dt>Train with</dt><dd>{family.trainWith.join(' · ')}</dd>
                    <dt>Assess with</dt><dd>{family.assessWith}</dd>
                  </dl>
                  <Reachability reachability={reachability} mode={family.mode} />
                  {!reachability.reachable && (
                    <div className="dbg-cefr-blocker"><b>Assessment route exhausted:</b> return to Train for targeted practice. A later valid gate attempt needs a debug evidence reset (not yet implemented) or newly authored unseen forms; rehearsing a revealed task cannot rewrite it into a pass.</div>
                  )}
                  {blockers.length > 0 && <div className="dbg-cefr-blocker"><b>Blockers:</b> {blockers.join(' · ')}</div>}
                </article>
              )
            }))}
          </div>
        </section>
      ))}
    </section>
  )
}

function PreparationGraph({ state, profile }) {
  const livePreparationEvidence = liveCefrPreparationEvidence(
    state,
    LEVELS.filter((level) => profile.achieved[level]),
  )
  const runtimePersisted = Object.hasOwn(state, 'cefrPreparationPasses')
  const familyIds = Object.keys(CEFR_CAPSTONE_TASK_FAMILIES)
  return (
    <section className="dbg-cefr-preparation-graph" aria-labelledby="dbg-cefr-preparation-graph-title">
      <header className="dbg-cefr-section-head">
        <div>
          <p className="dbg-learning-kicker">Production preparation registry · complete unlock graph</p>
          <h3 id="dbg-cefr-preparation-graph-title">{CEFR_PREPARATION_STAGES.length} stages · {Object.keys(CEFR_PREPARATION_MECHANICS).length} mechanics · {CEFR_PREPARATION_ACTIVITIES.length} activities</h3>
          <p>The graph uses the same exact word-stage evidence and A1 prerequisite as the preparation evaluator. A pass here prepares a capability; it never counts as a held-out capstone pass.</p>
        </div>
        <span className={`dbg-learning-status ${runtimePersisted ? 'passed' : 'locked'}`}>
          {runtimePersisted ? 'live preparation evidence wired' : 'runtime persistence blocker'}
        </span>
      </header>
      {!runtimePersisted && (
        <div className="dbg-cefr-blocker"><b>Implementation blocker:</b> the preparation activities and readiness evaluator are registered, but this save has no preparation-evidence ledger. The debug graph therefore shows true word/A1 readiness while activity passes remain unsaved.</div>
      )}
      <div className="dbg-cefr-capabilities" aria-label="Preparation capability coverage">
        <b>Capabilities</b>
        {CEFR_PREPARATION_CAPABILITIES.map((capability) => <span key={capability}>{clean(capability)}</span>)}
      </div>
      <p className="dbg-cefr-prep-contract"><b>Evidence contract:</b> {CEFR_PREPARATION_EVIDENCE_CONTRACT.principles.join(' · ')}</p>
      <div className="dbg-cefr-stage-flow">
        {CEFR_PREPARATION_STAGES.map((stage) => {
          const plan = preparationPlan(stage.level, livePreparationEvidence)
            .filter(({ mechanic }) => mechanic.stageId === stage.id)
          return (
            <article className="dbg-cefr-prep-stage" data-preparation-stage={stage.id} key={stage.id}>
              <header>
                <div><span>{stage.level} · stage {stage.order + 1}</span><h4>{stage.label}</h4></div>
                <span>{plan.length} mechanics</span>
              </header>
              <p>{stage.outcome}</p>
              <div className="dbg-cefr-mechanic-list">
                {plan.map(({ mechanic, activities, readiness }) => {
                  const mappedFamilies = familyIds.filter((familyId) =>
                    preparationMechanicsForCapstone(familyId).some(({ id }) => id === mechanic.id))
                  const example = CEFR_PREPARATION_EXAMPLES[mechanic.id]
                  return (
                    <section className="dbg-cefr-mechanic" data-preparation-mechanic={mechanic.id} aria-labelledby={`dbg-cefr-mechanic-${mechanic.id}`} key={mechanic.id}>
                      <header>
                        <h5 id={`dbg-cefr-mechanic-${mechanic.id}`}>{mechanic.label}</h5>
                        <span className={`dbg-learning-status ${readiness.complete ? 'passed' : readiness.ready ? 'current' : 'locked'}`}>
                          {readiness.complete ? 'complete' : readiness.ready ? 'ready' : 'locked'}
                        </span>
                      </header>
                      <dl>
                        <dt>Registry ID</dt><dd><code>{mechanic.id}</code></dd>
                        <dt>Word gate</dt><dd><code>{mechanic.readiness.wordStageId}</code></dd>
                        <dt>Prerequisites</dt><dd>{[
                          mechanic.readiness.prerequisiteLevel && `${mechanic.readiness.prerequisiteLevel} level`,
                          ...mechanic.readiness.prerequisiteMechanicIds,
                        ].filter(Boolean).join(' · ') || 'none'}</dd>
                        <dt>Capabilities</dt><dd>{mechanic.capabilities.map(clean).join(' · ') || 'foundation'}</dd>
                        <dt>Capstones</dt><dd>{mappedFamilies.join(' · ') || 'indirect foundation'}</dd>
                        <dt>Example</dt><dd><code>{example?.activityId}</code></dd>
                      </dl>
                      {readiness.reasons.length > 0 && <p className="dbg-cefr-readiness-reasons">{readiness.reasons.join(' · ')}</p>}
                      <ul>
                        {activities.map((activity) => (
                          <li data-preparation-activity={activity.id} key={activity.id}>
                            <code>{activity.id}</code>
                            <span>{activity.kind} → {activity.response.kind} · {activity.loreAnchor.nodeId}{activity.loreAnchor.npcId ? ` / ${activity.loreAnchor.npcId}` : ''}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function PreparationInventory() {
  return (
    <section className="dbg-cefr-preparation" aria-labelledby="dbg-cefr-preparation-title">
      <header className="dbg-cefr-section-head">
        <div>
          <p className="dbg-learning-kicker">Preparation is not attainment</p>
          <h3 id="dbg-cefr-preparation-title">Current curriculum evidence and its declared limit</h3>
        </div>
      </header>
      <div className="dbg-cefr-prep-grid">
        {Object.entries(CURRENT_CEFR_EVIDENCE).map(([id, item]) => (
          <article key={id}>
            <span className={`dbg-learning-status ${item.status === 'implemented' ? 'passed' : 'locked'}`}>{item.status}</span>
            <h4>{clean(id)}</h4>
            {item.proof.length > 0 && <code>{item.proof.join(' · ')}</code>}
            <p>{item.limitation}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TaskInventory() {
  const [level, setLevel] = useState('all')
  const [mode, setMode] = useState('all')
  const visible = CEFR_TASKS.filter((task) =>
    (level === 'all' || task.level === level) && (mode === 'all' || task.mode === mode))
  const stimulusCounts = Object.entries(countBy(CEFR_TASKS, (task) => task.stimulus.kind))
  const responseCounts = Object.entries(countBy(CEFR_TASKS, (task) => task.response.kind))
  return (
    <section className="dbg-cefr-inventory" aria-labelledby="dbg-cefr-inventory-title">
      <header className="dbg-cefr-section-head">
        <div>
          <p className="dbg-learning-kicker">Complete variant inventory</p>
          <h3 id="dbg-cefr-inventory-title">Every held-out stimulus, response and task form</h3>
          <p>{CEFR_TASKS.length} task forms. Filters only change this table; they do not change scheduling or evidence.</p>
        </div>
      </header>
      <div className="dbg-cefr-kind-ledger" aria-label="Stimulus and response kind totals">
        <div><b>Stimuli</b>{stimulusCounts.map(([kind, count]) => <span key={kind}><code>{kind}</code> {count}</span>)}</div>
        <div><b>Responses</b>{responseCounts.map(([kind, count]) => <span key={kind}><code>{kind}</code> {count}</span>)}</div>
      </div>
      <div className="dbg-cefr-filters">
        <label>Level <select value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">all</option>{LEVELS.map((id) => <option value={id} key={id}>{id}</option>)}</select></label>
        <label>Mode <select value={mode} onChange={(event) => setMode(event.target.value)}><option value="all">all</option>{CEFR_MODES.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
        <span role="status">showing {visible.length}/{CEFR_TASKS.length}</span>
      </div>
      <div className="dbg-cefr-table-scroll" tabIndex="0" role="region" aria-label="Scrollable CEFR task inventory">
        <table>
          <caption>Live held-out task records</caption>
          <thead><tr><th scope="col">Task variant</th><th scope="col">Family / mode</th><th scope="col">Stimulus</th><th scope="col">Response</th><th scope="col">Evidence shape</th><th scope="col">Window</th></tr></thead>
          <tbody>
            {visible.map((task) => (
              <tr data-task-id={task.id} key={task.id}>
                <th scope="row"><code>{task.id}</code><span>{task.topic}</span></th>
                <td><code>{task.familyId}</code><span>{task.level} · {task.mode}</span></td>
                <td><code>{task.stimulus.kind}</code><span>{task.storyAnchor.location} · {task.storyAnchor.npc}</span></td>
                <td><code>{task.response.kind}</code></td>
                <td>{task.questions?.map(({ kind }) => kind).join(' + ') || `${task.requirements?.length || 0} communicative requirements`}</td>
                <td><code>{cefrWindowIdForTask(task)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function DebugCefrProgression({ state }) {
  const liveEvidence = state.cefrEvidence || []
  const liveProfile = cefrProfile(liveEvidence)
  const liveA1 = cefrModeProgress('A1', 'listening', liveEvidence)
  return (
    <div className="dbg-cefr" data-debug-only="cefr-progression">
      <section className="dbg-cefr-hero" aria-labelledby="dbg-cefr-title">
        <div>
          <p className="dbg-learning-kicker">Debug-only CEFR path and evidence console</p>
          <h2 id="dbg-cefr-title">From first Albanian to A1, then A2</h2>
          <p>{CEFR_PRODUCT_CLAIMS.afterInternalGates} {CEFR_PRODUCT_CLAIMS.certificationBoundary}</p>
        </div>
        <div className="dbg-cefr-source-badge">
          <b>Source identity</b>
          <span>progression gates + held-out task bank + assessment evaluator + Train registries</span>
        </div>
      </section>

      <section className="dbg-cefr-live" aria-labelledby="dbg-cefr-live-title">
        <div className="dbg-cefr-live-head">
          <div>
            <p className="dbg-learning-kicker">Compact live-save profile · separate from the example</p>
            <h3 id="dbg-cefr-live-title">This browser save</h3>
          </div>
          <span>{liveEvidence.length} evidence rows · {liveA1.completed}/{liveA1.total} A1 listening tasks tried</span>
        </div>
        <ProfileGrid evidence={liveEvidence} label="Live seven-mode profile" />
      </section>

      <Walkthrough />
      <PreparationGraph state={state} profile={liveProfile} />
      <FamilyCoverage evidence={liveEvidence} />
      <PreparationInventory />
      <TaskInventory />
    </div>
  )
}
