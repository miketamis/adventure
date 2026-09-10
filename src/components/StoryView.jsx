import { lazy, Suspense, useState, useEffect, useMemo, useRef } from 'react'
import Token from './Token.jsx'
import {
  STORY,
  ITEMS,
  HEART_LEVELS,
  itemConfuserActionOf,
  w,
  wf,
  p,
  lineOf,
  moneyOutcomeLineOf,
  visibleLines,
} from '../game/content.js'
import {
  arrivalOptionOf,
  canChoose,
  canSpeak,
  canUseItem,
  currentStoryState,
  effectAvailabilityForOption,
  environmentSnapshot,
  hasCond,
  hasRequiredItem,
  interactionAvailabilityForOption,
  optionLekAvailability,
  optionLekDelta,
  phraseSenses,
} from '../game/gameState.js'
import { albanianTextOf, englishReadingOf, hasAuthoredEnglishReading } from '../game/language.js'
import { stableShuffle, testFor } from '../game/comprehension.js'
import { ACHIEVEMENT_BY_ID } from '../game/achievements.js'
import ComprehensionTest from './ComprehensionTest.jsx'
import WorldContext from './WorldContext.jsx'
import EmbodimentFocus from './EmbodimentFocus.jsx'
import { isDistantLineVisible, transitionInfo } from '../game/worldModel.js'
import {
  ENVIRONMENT_NARRATION_POLICY,
  authoredEnvironmentDimensions,
  environmentStoryLine,
  moneyTransactionStoryLine,
  purseStoryLine,
} from '../game/storyContext.js'
import { festivalLabel } from '../game/environment.js'
import { embodimentOptionAccess, embodimentQuest } from '../game/embodiment.js'
import { resolveRevealLine } from '../game/revealResolver.js'
import { isOptionRevealed } from '../game/revealVisibility.js'
import { trainingTargetForOption } from '../game/trainingTarget.js'
import { narrationSettingForScene } from '../game/sceneEnvironmentSetting.js'
import {
  planScenePresentation,
  SCENE_SCROLL_POLICY,
} from '../game/scenePresentation.js'
import { QUOTES, quoteProofUrl, quoteTier } from '../game/quotes.js'
import {
  attachReviewedOptionReadings,
  dynamicItemConfuserEnglish,
  optionEnglishReadingOf,
} from '../game/data/readings/reviewedOptionReadings.js'
import {
  effectLockText,
  formatCivilHour,
  formatRouteDuration,
  interactionLockText,
  optionMoneyEffectText,
  optionReadingVisible,
  sceneAnnouncement,
  storyReadingVisible,
} from './storyMechanicsPresentation.js'

const FactoidLore = lazy(() => import('./FactoidLore.jsx'))
attachReviewedOptionReadings(STORY, ITEMS, HEART_LEVELS)

const QUOTE_REPO_BLOB = 'https://github.com/miketamis/adventure/blob/main/'
const QUOTE_TIER_LABEL = {
  corpus: 'local proof',
  variant: 'related variant',
  external: 'external citation',
  oral: 'oral attribution',
}

export default function StoryView({ state, dispatch }) {
  const node = STORY[state.nodeId]
  // The active tale scene owns its frozen narrative clock; public roaming
  // scenes own the monotonic world clock. Keep one projected state for prose,
  // horizon and gates so they can never disagree about the hour.
  const storyState = currentStoryState(state)
  const environment = environmentSnapshot(storyState)
  const sceneHeadingRef = useRef(null)
  const previousNodeRef = useRef(state.nodeId)
  // which confuser option was just picked (to flash feedback); reset per node
  const [confusedKey, setConfusedKey] = useState(null)
  // how THIS visit's ending gate went: null (in progress / not applicable),
  // 'passed' (achievement just unlocked) or 'failed' (the attempt is over)
  const [endResult, setEndResult] = useState(null)
  // an AREA achievement test opened from the banner. The whole attempt lives
  // here — its questions are drawn once when it opens, and the result survives
  // the reducer clearing pendingTest on earn/fail.
  const [areaTest, setAreaTest] = useState(null) // { ach, questions, result }
  useEffect(() => {
    setConfusedKey(null)
    setEndResult(null)
    setAreaTest(null)
  }, [state.nodeId])

  // === SENTENCE-GATED DIRECTIONS ============================================
  // A direction stays hidden until you discover every word of the sentence that
  // names its thing. e.g. discovering "ka një lumë" reveals "shko në lumë". The
  // noun a phrase acts on is its last content noun.
  // the lines actually shown right now — a scene can react to what walks with you
  // AND to the hour (when()/unless() lines in content.js take item ids or a
  // time-of-day phase id), so resolve against inventory + this scene's clock
  const has = (id) => hasCond(storyState, id)
  const lines = visibleLines(node, has).filter((line) =>
    isDistantLineVisible(state.nodeId, line, environment),
  )
  const authoredLines = node.text.map(lineOf)
  const alreadyEarned = !!state.earned?.[state.nodeId]
  // Keep the same comprehension boundary for every player. Whole-line English
  // is a debug-only editorial aid, including in the screen-reader focus heading;
  // normal play keeps the accessible announcement useful without giving away a
  // translation that is deliberately absent from the visible story.
  const endingLoreHidden = ['good', 'secret'].includes(state.ended) &&
    !alreadyEarned && endResult !== 'passed'
  const sceneSummary = state.debug && lines[0] && !endingLoreHidden
    ? englishReadingOf(lines[0])
    : endingLoreHidden
      ? 'The ending is still hidden.'
      : 'Albanian story text is ready.'
  const sceneStatus = sceneAnnouncement({
    ending: state.ended,
    title: node.title,
    summary: sceneSummary,
    loreHidden: endingLoreHidden,
  })

  // A route choice replaces the scene beneath the user's focus. Put keyboard
  // and screen-reader users at the start of that new scene instead of leaving
  // focus attached to a control that just disappeared.
  useEffect(() => {
    if (previousNodeRef.current === state.nodeId) return undefined
    previousNodeRef.current = state.nodeId
    const frame = window.requestAnimationFrame(() => sceneHeadingRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [state.nodeId])
  // Returning from a lazy-loaded section can mount Story after the top-bar
  // role shortcut has already tried to focus its destination. Complete that
  // hand-off once the scene and persistent objective actually exist.
  useEffect(() => {
    if (!document.activeElement?.classList.contains('embody-badge')) return undefined
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById('embodiment-focus') || sceneHeadingRef.current
      target?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])
  // the HARD gate on a good/secret ending's achievement: only unearned ones are
  // tested (a fate needs no proof; an achievement earned on an earlier run is
  // yours). EVERY question must be answered correctly; one wrong ends the
  // attempt — but the deed is already recorded (state.eligible), so the test
  // can be retaken from the Achievements tab with fresh questions.
  const isAchEnd = state.ended === 'good' || state.ended === 'secret'
  const gateOpen = isAchEnd && !alreadyEarned && endResult === null
  const endAttempt = state.attempts?.[state.nodeId] || 0
  const endQuestions = useMemo(
    () => (isAchEnd && !alreadyEarned ? testFor(ACHIEVEMENT_BY_ID[state.nodeId], endAttempt) : null),
    [state.nodeId, isAchEnd, alreadyEarned, endAttempt],
  )
  // an ending so thin no test can be built proves itself — unlock outright
  useEffect(() => {
    if (gateOpen && !endQuestions) {
      dispatch({ type: 'EARN_ACHIEVEMENT', id: state.nodeId })
      setEndResult('passed')
    }
  }, [gateOpen, endQuestions, state.nodeId, dispatch])

  // an AREA achievement the world is offering right now (only while free-roaming)
  const pendingAch = !state.ended && !state.embodying && state.pendingTest ? ACHIEVEMENT_BY_ID[state.pendingTest] : null
  const openAreaTest = () => {
    const questions = testFor(pendingAch, state.attempts?.[pendingAch.id] || 0)
    if (!questions) {
      // nothing to ask (shouldn't happen — quizNodes are authored) — just earn
      dispatch({ type: 'EARN_ACHIEVEMENT', id: pendingAch.id })
      setAreaTest({ ach: pendingAch, questions: null, result: 'passed' })
      return
    }
    setAreaTest({ ach: pendingAch, questions, result: null })
  }

  const lineDiscovered = (line) => line.every((t) => !t.id || state.discovered[t.id])
  // The sentence a reveal-gate points at. A repeated naming word must carry an
  // authored revealOccurrence choice; the shared resolver keeps this
  // UI and the graph audits on exactly the same sentence.
  const sentenceFor = (option) => resolveRevealLine(authoredLines, option).line

  // === HEARTS IN THE STORY ==================================================
  // Your health is a story line, not a chip: HEART_LEVELS[hearts] says how you
  // are right now. Below full, the line hides a once-per-level self-heal —
  // discover every word of the line (📜) to reveal the mending action; taking
  // it (dispatch HEAL) is a normal token spend worth one heart.
  const heartLevel = HEART_LEVELS[state.hearts]
  const healUnused = !state.embodying && !!heartLevel?.heal && !state.healedAt?.[state.hearts]
  const healRevealed = healUnused && lineDiscovered(heartLevel.line)
  // An option stays hidden until you discover the sentence it belongs to — authored
  // PER OPTION as `reveal: '<senseId>'` in content.js (deliberately NOT an automatic
  // rule). No `reveal` field => the option is always shown. `scripts/storystats.mjs`
  // lints the design goals: that most options are gated, and that every node always
  // keeps at least one ungated, always-visible path.
  const optionRevealed = (opt) => isOptionRevealed(storyState, opt, node, lines)

  // what you hold. Companions (ITEMS[id].companion) are tracked exactly like items
  // but they're who walks WITH you, so they render as their own story line instead
  // of "you have a X", and an option can gate on them with `requires: '<companionId>'`.
  const ownedIds = Object.keys(state.inventory).filter((id) => state.inventory[id] > 0)
  // Embodied roles carry an isolated tale inventory, not the traveller's
  // suspended pack. Once a prop is catalogued it should be visible in the
  // story just like any other held object; only direct reusable item actions
  // remain disabled until the traveller returns to their own life.
  const visibleOwnedIds = ownedIds
  // Currency has its own dynamic "ti ke 5 lek" story sentence below, so it is
  // not mistaken for a singular object in the "ti ke një X" carry-line.
  // Authored story flags live in state.flags, never in this physical inventory.
  const itemIds = visibleOwnedIds.filter((id) => ITEMS[id] && !ITEMS[id].companion && !ITEMS[id].currency)
  const companionIds = visibleOwnedIds.filter((id) => ITEMS[id]?.companion)
  const usableOwned = state.embodying ? [] : visibleOwnedIds.filter((id) => ITEMS[id]?.use)
  const arrivalOption = arrivalOptionOf(state)
  const moneyOutcome = moneyOutcomeLineOf(arrivalOption, (id) => hasCond(storyState, id))
  const purseLine = moneyOutcome
    ? moneyTransactionStoryLine(moneyOutcome, state.inventory.lek)
    : purseStoryLine(state.inventory.lek)

  // "ti ke një X dhe një Y ." — what you carry, as a real (discoverable) story line
  const carryLine = () => {
    const toks = [w('ti'), w('ke')]
    itemIds.forEach((id, i) => {
      if (i > 0) toks.push(w('dhe'))
      toks.push(w('nje'), w(ITEMS[id].word || id))
    })
    toks.push(p('.'))
    return toks
  }

  // "ti dhe ujku ." — who walks beside you, woven into the story as a real line
  const companionLine = () => {
    const toks = [w('ti')]
    companionIds.forEach((id) => {
      toks.push(w('dhe'), wf(ITEMS[id].word || id, ITEMS[id].al, 'the ' + ITEMS[id].name.toLowerCase()))
    })
    toks.push(p('.'))
    return toks
  }

  // One deliberately impossible but grammatically rendered action built from
  // an item you carry. Authored confusers already provide the scene-specific
  // distractors; the former "outside + item + noun" word stack was not English.
  const itemConfusers = []
  if (itemIds.length > 0) {
    const hash = [...state.nodeId].reduce((a, c) => a + c.charCodeAt(0), 0)
    const featured = itemIds[hash % itemIds.length]
    const fw = ITEMS[featured].word || featured
    const confuserAction = itemConfuserActionOf(featured)
    const confuser = [w(confuserAction === 'fight' ? 'lufto' : 'pi'), w(fw)]
    confuser.dynamicOptionReading = dynamicItemConfuserEnglish(ITEMS[featured], confuserAction)
    itemConfusers.push(confuser)
  }
  const seenPhrase = new Set()
  for (const o of node.options) seenPhrase.add(o.text.map((t) => t.id || t.en).join(' '))
  for (const id of usableOwned) seenPhrase.add(ITEMS[id].use.phrase.map((t) => t.id || t.en).join(' '))
  if (healRevealed) seenPhrase.add(heartLevel.heal.phrase.map((t) => t.id || t.en).join(' '))
  const dynamicConfusers = itemConfusers.filter(
    (toks) => !seenPhrase.has(toks.map((t) => t.id || t.en).join(' ')),
  )

  const entries = []
  let hiddenPaths = 0
  node.options.forEach((opt, i) => {
    if (opt.confuser) return // confusers handled below
    if (!hasRequiredItem(storyState, opt)) return // hidden by requires:/unless:
    if (!optionRevealed(opt)) {
      hiddenPaths++
      return
    }
    const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
    const lekAvailability = optionLekAvailability(storyState, opt)
    const affordable = lekAvailability.ok
    const interaction = interactionAvailabilityForOption(storyState, opt)
    const effectAvailability = effectAvailabilityForOption(storyState, opt)
    const roleAccess = embodimentOptionAccess(state, opt, STORY[opt.to])
    const entryQuest = opt.become ? embodimentQuest(opt.become) : null
    entries.push({
      key: 'opt-' + i,
      trainingTarget: trainingTargetForOption(state.nodeId, opt),
      tokens: opt.text,
      reading: optionEnglishReadingOf(opt.text),
      readingReviewed: ['internal-editorial', 'generated-world-item'].includes(opt.text.optionReadingReview),
      real: true,
      allDiscovered,
      enoughMana,
      lek: optionLekDelta(opt),
      affordable,
      lekAvailability,
      interaction,
      effectAvailability,
      route: transitionInfo(state.nodeId, opt),
      date: opt.date || null,
      targetPhase: opt.time || null,
      targetHour: opt.atHour ?? null,
      timePassage: opt.timePassage || null,
      beginQuest: !state.embodying ? entryQuest : null,
      roleBlocked: !roleAccess.ok,
      roleReason: roleAccess.reason,
      ok: canChoose(storyState, opt) && roleAccess.ok,
      onSelect: () => opt.become && !state.embodying
        ? dispatch({ type: 'REQUEST_EMBODIMENT', optionIndex: i })
        : dispatch({
            type: 'CHOOSE', option: opt, targetNode: STORY[opt.to],
            fromNodeId: state.nodeId, fromTurn: state.turn,
          }),
    })
  })
  // item uses — always available (you hold the item)
  usableOwned.forEach((id) => {
    const it = ITEMS[id]
    const { allDiscovered, enoughMana, effectAvailability, ok } = canUseItem(state, it)
    entries.push({
      key: 'use-' + id,
      tokens: it.use.phrase,
      reading: optionEnglishReadingOf(it.use.phrase),
      readingReviewed: it.use.phrase.optionReadingReview === 'internal-editorial',
      real: true,
      allDiscovered,
      enoughMana,
      effectAvailability,
      ok,
      onSelect: () => dispatch({
        type: 'USE_ITEM', item: it, expectedCount: state.inventory[id],
      }),
    })
  })
  // the hearts-ladder self-heal — revealed by fully discovering the health line
  if (healRevealed) {
    const { allDiscovered, enoughMana, ok } = canSpeak(state, heartLevel.heal.phrase)
    entries.push({
      key: 'heal',
      tokens: heartLevel.heal.phrase,
      reading: optionEnglishReadingOf(heartLevel.heal.phrase),
      readingReviewed: heartLevel.heal.phrase.optionReadingReview === 'internal-editorial',
      real: true,
      heal: true,
      allDiscovered,
      enoughMana,
      ok,
      onSelect: () => dispatch({ type: 'HEAL', expectedHearts: state.hearts }),
    })
  }
  // confusers — always shown (the comprehension trap)
  if (!state.embodying) {
    node.options.forEach((opt, i) => {
      if (!opt.confuser) return
      // Contextual confusers can belong to an hour, season, weather or other
      // ordinary story condition. A dawn "good night" must disappear when the
      // clock reaches day just as its correct counterpart does.
      if (!hasRequiredItem(storyState, opt)) return
      const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
      entries.push({
        key: 'opt-' + i,
        trainingTarget: trainingTargetForOption(state.nodeId, opt),
        tokens: opt.text,
        reading: optionEnglishReadingOf(opt.text),
        readingReviewed: ['internal-editorial', 'generated-world-item'].includes(opt.text.optionReadingReview),
        allDiscovered,
        enoughMana,
        ok: allDiscovered && enoughMana,
        onSelect: () => {
          dispatch({ type: 'CONFUSE', expectedHearts: state.hearts })
          setConfusedKey('opt-' + i)
        },
      })
    })
    dynamicConfusers.forEach((toks, k) => {
      const { allDiscovered, enoughMana } = canSpeak(state, toks)
      entries.push({
        key: 'dyn-' + k,
        tokens: toks,
        reading: toks.dynamicOptionReading,
        readingReviewed: false,
        dynamicConfuser: true,
        allDiscovered,
        enoughMana,
        ok: allDiscovered && enoughMana,
        onSelect: () => {
          dispatch({ type: 'CONFUSE', expectedHearts: state.hearts })
          setConfusedKey('dyn-' + k)
        },
      })
    })
  }
  const shuffledEntries = stableShuffle(entries, state.nodeId + ':' + state.turn)

  // Telegraph the load-bearing sentences: a line whose full discovery will OPEN a
  // currently-hidden path gets a 📜 cue, so the player knows where discovery pays off.
  // Only while still hidden — once the path is open, the cue has done its job and drops.
  const revealLineIdx = new Set()
  node.options.forEach((opt) => {
    if (opt.confuser || !opt.reveal) return
    if (!hasRequiredItem(storyState, opt)) return // path not available at all → don't tease it
    if (!embodimentOptionAccess(state, opt, STORY[opt.to]).ok) return
    if (optionRevealed(opt)) return // already opened
    const line = sentenceFor(opt)
    if (line) revealLineIdx.add(lines.indexOf(line))
  })
  // the health line telegraphs its hidden mend the same way, until it's open
  if (healUnused && !healRevealed) revealLineIdx.add('hearts')

  const storyLinesVisible = !state.ended || state.ended === 'bad' || alreadyEarned || endResult === 'passed'
  const sceneLineEntries = []
  if (!state.ended && heartLevel) sceneLineEntries.push({ key: 'hearts', line: heartLevel.line, renderKey: 'hearts' })
  if (!state.ended && purseLine) sceneLineEntries.push({ key: 'purse', line: purseLine, renderKey: 'purse' })
  if (!state.ended && companionIds.length > 0) sceneLineEntries.push({ key: 'companions', line: companionLine(), renderKey: 'companions' })
  if (!state.ended && itemIds.length > 0) sceneLineEntries.push({ key: 'carry', line: carryLine(), renderKey: 'carry' })
  if (storyLinesVisible) {
    lines.forEach((line, index) => sceneLineEntries.push({
      key: `authored-${index}`,
      line,
      renderKey: index,
    }))
  }
  const pinnedLines = [...revealLineIdx].map((key) =>
    key === 'hearts' ? heartLevel?.line : lines[key],
  ).filter(Boolean)
  // Reserve one compact line for generated context when deciding whether
  // optional atmosphere still fits. Core prose remains one continuous scroll.
  const contentScrollPolicy = state.ended ? SCENE_SCROLL_POLICY : {
    ...SCENE_SCROLL_POLICY,
    maxLines: Math.max(1, SCENE_SCROLL_POLICY.maxLines - 1),
    maxLexicalTokens: Math.max(
      1,
      SCENE_SCROLL_POLICY.maxLexicalTokens - ENVIRONMENT_NARRATION_POLICY.maxLexicalTokens,
    ),
  }
  const scenePresentation = planScenePresentation(sceneLineEntries, {
    debug: state.debug,
    pinnedLines,
    seed: state.turn,
    policy: contentScrollPolicy,
  })
  const presentedEntries = scenePresentation.entries
  const environmentLine = !state.ended && environmentStoryLine(environment, {
    setting: narrationSettingForScene(state.nodeId),
    omit: authoredEnvironmentDimensions(presentedEntries.map((entry) => entry.line)),
  })

  const renderLine = (line, i) => {
    const revealsPath = revealLineIdx.has(i)
    // A Q() line carries reviewed source evidence. Its quote-register record
    // states whether the displayed Albanian is verbatim, inflected, adapted,
    // a related variant, or an explicitly oral formula.
    const quoteSrc = line.quote
    const quoteRecord = line.quoteId ? QUOTES[line.quoteId] : null
    const proofUrl = quoteRecord ? quoteProofUrl(quoteRecord, QUOTE_REPO_BLOB) : null
    const quoteEvidence = quoteRecord ? QUOTE_TIER_LABEL[quoteTier(quoteRecord)] : null
    const quoteDetail = quoteRecord ? `${quoteRecord.fidelity}, ${quoteEvidence}` : 'source-linked wording'
    const reviewedReading = hasAuthoredEnglishReading(line)
    const showReading = storyReadingVisible(i, state.debug)
    return (
      <p
        className={'story-line' + (revealsPath ? ' reveals-path' : '') + (quoteSrc ? ' quote-line' : '')}
        key={i}
      >
        {line.map((tok, j) => (
          <Token
            key={j}
            token={tok}
            discovered={state.discovered}
            onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
          />
        ))}
        {revealsPath && (
          <span
            className="reveal-cue"
            title={
              i === 'hearts'
                ? 'Discover every word of how you are — a way to mend one ♥ will open (once per heart level)'
                : 'Discover every word in this line to open the path it names'
            }
          >
            📜
          </span>
        )}
        {quoteSrc && (proofUrl ? (
          <a
            className="quote-src"
            href={proofUrl}
            target="_blank"
            rel="noreferrer"
            title={`Open strongest recorded evidence — ${quoteDetail}`}
          >
            — {quoteSrc} · {quoteDetail} ↗
          </a>
        ) : (
          <span className="quote-src" title={`No written witness is linked — ${quoteDetail}`}>
            — {quoteSrc} · {quoteDetail}
          </span>
        ))}
        {showReading && (
          <span
            className={'story-reading' + (reviewedReading ? ' reviewed' : '')}
            title={reviewedReading ? 'Reviewed whole-line English translation' : 'Naturalized fallback reading awaiting line-by-line editorial review'}
          >
            <span className="story-reading-label">{reviewedReading ? 'Reviewed English' : 'English reading'}</span>
            {englishReadingOf(line)}
          </span>
        )}
      </p>
    )
  }

  return (
    <section className="card story" aria-labelledby="story-scene-title">
      <h2 id="story-scene-title" className="sr-only" ref={sceneHeadingRef} tabIndex={-1}>
        {sceneStatus}
      </h2>
      {/* The compact ledger is a diagnostic inspector. Ordinary play learns
          these facts through the interactive prose immediately below. */}
      {!state.ended && state.debug && <WorldContext state={storyState} worldClock={state.clock} />}
      {!state.ended && <EmbodimentFocus state={state} dispatch={dispatch} />}
      <div className="story-text">
        {environmentLine && renderLine(environmentLine, 'environment')}
        {presentedEntries.map((entry) => renderLine(entry.line, entry.renderKey))}
        {!state.ended && state.embodying && (itemIds.length > 0 || companionIds.length > 0) && (
          <p className="role-prop-note">
            <span aria-hidden="true">🎭 </span>
            Role props are visible here and used through the choices they unlock. Direct traveller
            item actions wait outside with your own pack.
          </p>
        )}
      </div>

      {state.debug && scenePresentation.sourceMeasure.lines > 0 && (
        <p className="scene-density-debug">
          Debug density: {scenePresentation.sourceMeasure.lines} lines / {scenePresentation.sourceMeasure.lexicalTokens} words → normal play one scroll surface with {scenePresentation.normalEntries.length} lines; {scenePresentation.omittedAmbient.length} optional {scenePresentation.omittedAmbient.length === 1 ? 'line' : 'lines'} omitted.
        </p>
      )}

      {state.ended ? (
        <div className={'ending ' + state.ended}>
          <div className="verdict">
            {state.ended === 'bad'
              ? '💀 Fund i keq'
              : gateOpen
                ? '🏆 Achievement within reach — A e kuptove?'
                : endResult === 'failed'
                  ? '📜 The tale slips away'
                  : state.ended === 'good'
                    ? '🏆 Achievement unlocked'
                    : '✨ Secret achievement unlocked'}
          </div>
          {node.title && <div className="ending-name">{node.title}</div>}
          {state.ended === 'bad' ? (
            <>
              {node.blurb && <p className="ending-desc">{node.blurb}</p>}
              <p className="hint">
                Recorded in your codex as a fate. Play again to seek out an achievement — your
                discovered words and tokens carry over.
              </p>
              <button className="btn primary" onClick={() => dispatch({ type: 'CONTINUE' })}>
                ⟳ Play again
              </button>
            </>
          ) : gateOpen ? (
            endQuestions && (
              <ComprehensionTest
                questions={endQuestions}
                dispatch={dispatch}
                onDone={(passed) => {
                  if (passed) {
                    dispatch({ type: 'EARN_ACHIEVEMENT', id: node.id })
                    setEndResult('passed')
                  } else {
                    dispatch({ type: 'FAIL_TEST', id: node.id })
                    setEndResult('failed')
                  }
                }}
              />
            )
          ) : endResult === 'failed' ? (
            <>
              <p className="hint">
                The deed is done — this tale now waits, locked, in 🏆 Achievements. Train the
                words and retake the test any time (the questions will be new); the tale itself
                stays hidden until you pass.
              </p>
              <button
                className="btn primary"
                onClick={() => dispatch({ type: 'RETURN_TO_WORLD', to: node.returnTo })}
              >
                🚶 Back to the world →
              </button>
            </>
          ) : (
            <>
              {endResult === 'passed' && (
                <div className="feedback good">✓ Every answer right — the tale is yours.</div>
              )}
              {node.blurb && <p className="ending-desc">{node.blurb}</p>}
              <Suspense fallback={<p className="hint" role="status">Opening the tale&apos;s sources…</p>}>
                <FactoidLore loreId={ACHIEVEMENT_BY_ID[node.id]?.lore} dispatch={dispatch} />
              </Suspense>
              {endResult === 'passed' && <p className="hearts-restored">❤️ Hearts restored to full.</p>}
              <p className="hint">
                Added to your achievements. This tale is done — step back into the world and
                keep exploring. {state.embodying
                  ? 'Your traveller’s pack and health return exactly as they were; this role’s props stay with its tale.'
                  : 'Everything you’ve gathered comes with you.'}
              </p>
              <button
                className="btn primary"
                onClick={() => dispatch({ type: 'RETURN_TO_WORLD', to: node.returnTo })}
              >
                🚶 Back to the world →
              </button>
            </>
          )}
        </div>
      ) : areaTest ? (
        <div className="ending secret">
          <div className="verdict">
            {areaTest.result === 'passed'
              ? '🏆 Achievement unlocked'
              : areaTest.result === 'failed'
                ? '📜 The tale slips away'
                : '🏆 Achievement within reach — A e kuptove?'}
          </div>
          <div className="ending-name">{areaTest.ach.title}</div>
          {areaTest.result === null ? (
            <ComprehensionTest
              questions={areaTest.questions}
              dispatch={dispatch}
              onDone={(passed) => {
                if (passed) dispatch({ type: 'EARN_ACHIEVEMENT', id: areaTest.ach.id })
                else dispatch({ type: 'FAIL_TEST', id: areaTest.ach.id })
                setAreaTest({ ...areaTest, result: passed ? 'passed' : 'failed' })
              }}
            />
          ) : areaTest.result === 'passed' ? (
            <>
              <div className="feedback good">✓ Every answer right — the achievement is yours.</div>
              {areaTest.ach.blurb && <p className="ending-desc">{areaTest.ach.blurb}</p>}
              <Suspense fallback={<p className="hint" role="status">Opening the achievement&apos;s sources…</p>}>
                <FactoidLore loreId={areaTest.ach.lore} dispatch={dispatch} />
              </Suspense>
              <p className="hearts-restored">❤️ Hearts restored to full.</p>
              <button className="btn primary" onClick={() => setAreaTest(null)}>
                🚶 Back to the world →
              </button>
            </>
          ) : (
            <>
              <p className="hint">
                The deed stands — this achievement waits in 🏆 Achievements. Train the words and
                retake the test any time; the questions will be new.
              </p>
              <button className="btn primary" onClick={() => setAreaTest(null)}>
                🚶 Back to the world →
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {pendingAch && (
            <div className="factoid-banner">
              <span className="factoid-banner-text">
                🏆 Achievement within reach: <b>{pendingAch.title}</b> — prove you understood
                what you&apos;ve seen.
              </span>
              <span className="factoid-banner-actions">
                <button className="btn primary" onClick={openAreaTest}>
                  Take the test →
                </button>
                <button
                  className="btn factoid-dismiss"
                  title="Not now — the test stays available in 🏆 Achievements"
                  onClick={() => dispatch({ type: 'DISMISS_TEST', id: pendingAch.id })}
                >
                  ✕
                </button>
              </span>
            </div>
          )}
          <div className="options" role="list" aria-label="Available actions">
            {shuffledEntries.map((e) => {
              const wasConfused = confusedKey === e.key
              const routeParts = []
              if (e.beginQuest) {
                routeParts.push(`${e.beginQuest.stance === 'companion' ? 'Join tale' : 'Begin tale'} · ${e.beginQuest.identity}`)
              }
              if (e.route?.valid && e.route.kind !== 'local') routeParts.push(e.route.label)
              if (e.timePassage?.label) {
                routeParts.push(e.timePassage.label)
              } else if (e.date) {
                routeParts.push(`wait for ${festivalLabel(e.date)}${e.targetHour != null
                  ? ` at ${formatCivilHour(e.targetHour)}`
                  : e.targetPhase ? ` at ${e.targetPhase}` : ''}`)
              } else {
                if (e.route?.hours != null) routeParts.push(formatRouteDuration(e.route.hours))
                const targetHour = e.targetHour ?? e.route?.targetHour
                if (targetHour != null) routeParts.push(`arrive at ${formatCivilHour(targetHour)}`)
                else if (e.targetPhase || e.route?.targetPhase) routeParts.push(`then wait for ${e.targetPhase || e.route.targetPhase}`)
              }
              let cost
              if (wasConfused) {
                cost = <span className="option-cost bad">✗ can&apos;t happen here · −1 ♥</span>
              } else if (e.roleBlocked) {
                cost = <span className="option-cost role-locked">🎭 {e.roleReason}</span>
              } else if (!e.allDiscovered) {
                cost = <span className="option-cost bad">discover all words first</span>
              } else if (!e.enoughMana) {
                cost = (
                  <span className="option-cost bad">
                    need tokens
                    <button
                      className="btn train-mini"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        dispatch(e.trainingTarget
                          ? { type: 'BEGIN_OPTION_TRAINING', target: e.trainingTarget }
                          : { type: 'SET_VIEW', view: 'practice' })
                      }}
                    >
                      🎯 Train
                    </button>
                  </span>
                )
              } else if (e.affordable === false) {
                // priced path you can't pay for yet — the price tag is the lesson
                cost = <span className="option-cost bad">need 🪙 {e.lekAvailability.need} more lek</span>
              } else if (e.interaction?.ok === false) {
                const unavailable = interactionLockText(e.interaction)
                cost = <span className="option-cost bad">⏳ {unavailable}</span>
              } else if (e.effectAvailability?.ok === false) {
                const unavailable = effectLockText(
                  e.effectAvailability,
                  (id) => ITEMS[id]?.name || id,
                )
                cost = <span className="option-cost bad">🧰 {unavailable}</span>
              } else if (e.heal) {
                cost = (
                  <span className="option-cost ok">mends one ♥ · spends tokens · once at this level</span>
                )
              } else if (e.lek) {
                cost = <span className="option-cost ok">{optionMoneyEffectText(e.lek, state.debug)}</span>
              } else if (e.beginQuest) {
                cost = <span className="option-cost role-ready">🎭 confirmation first · then spends tokens</span>
              } else {
                cost = <span className="option-cost ok">spends tokens</span>
              }
              const optionDomId = `story-option-${state.nodeId}-${e.key}`.replace(/[^a-zA-Z0-9_-]/g, '-')
              const routeId = state.debug && routeParts.length > 0 ? `${optionDomId}-route` : null
              const costId = `${optionDomId}-cost`
              const optionPhrase = e.reading || optionEnglishReadingOf(e.tokens)
              const accessibleOptionPhrase = state.debug
                ? optionPhrase
                : albanianTextOf(e.tokens)
              return (
                <div
                  key={e.key}
                  className={'option' + (e.ok ? ' ready' : ' locked') + (wasConfused ? ' confused' : '')}
                  role="listitem"
                  onClick={(event) => {
                    // Keep the original click-anywhere card behavior for pointer
                    // users, while the real button below owns keyboard semantics.
                    // Child word/Train/debug controls keep their independent act.
                    if (e.ok && !event.target.closest('button, a, input, select, textarea')) e.onSelect()
                  }}
                >
                  <span className="option-main">
                    {optionReadingVisible(state.debug) && (
                      <span className={'option-reading' + (e.readingReviewed ? ' reviewed' : '')}>
                        <span className="option-reading-label">
                          {e.readingReviewed ? 'Reviewed action' : e.dynamicConfuser ? 'Generated distractor' : 'Action English'}
                        </span>
                        {optionPhrase}
                      </span>
                    )}
                    <span className="option-gloss-label">Word by word</span>
                    <span className="option-text">
                      {e.tokens.map((tok, j) => (
                        <Token
                          key={j}
                          token={tok}
                          discovered={state.discovered}
                          onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
                          tokenCount={tok.id ? state.mana[tok.id] || 0 : undefined}
                        />
                      ))}
                    </span>
                    {state.debug && e.real && routeParts.length > 0 && (
                      <span id={routeId} className="route-note" title="Direction, distance and world time from the canonical tale-chart">
                        🗺 {routeParts.join(' · ')}
                      </span>
                    )}
                  </span>
                  <span id={costId} className="option-cost-wrap">{cost}</span>
                  {state.debug && e.real && !e.ok && !e.roleBlocked &&
                    e.interaction?.ok !== false && e.effectAvailability?.ok !== false && (
                    <button
                      type="button"
                      className="btn debug-mini"
                      title="Debug: discover these words and grant the tokens to take this path"
                      onClick={() => {
                        dispatch({ type: 'DEBUG_GRANT', ids: phraseSenses(e.tokens) })
                      }}
                    >
                      ⚡ tokens
                    </button>
                  )}
                  <button
                    type="button"
                    className="option-select"
                    aria-disabled={!e.ok}
                    aria-label={`${e.ok ? 'Choose' : 'Locked'}: ${accessibleOptionPhrase}`}
                    aria-describedby={[routeId, costId].filter(Boolean).join(' ')}
                    onClick={() => {
                      if (e.ok) e.onSelect()
                    }}
                  >
                    {e.ok ? 'Choose' : 'Locked'} <span aria-hidden="true">→</span>
                  </button>
                </div>
              )
            })}
          </div>
          {hiddenPaths > 0 && (
            <p className="hint locked-hint">
              📜 {hiddenPaths === 1 ? 'A path is' : hiddenPaths + ' paths are'} still hidden in the
              story — discover every word of a 📜-marked sentence to open the direction it names.
            </p>
          )}
          <p className="hint">
            Click a word to discover it. Discovering a whole sentence reveals the path it names;
            then hold one token per word to take it. Some choices can&apos;t really happen here —
            picking one costs a ♥.
          </p>
        </>
      )}
    </section>
  )
}
