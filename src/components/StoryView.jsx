import { useState, useEffect, useMemo } from 'react'
import Token from './Token.jsx'
import { STORY, ITEMS, HEART_LEVELS, w, wf, p, visibleLines } from '../game/content.js'
import { canSpeak, canUseItem, hasRequiredItem, hasCond, canAfford, phraseSenses, isBacktrack } from '../game/gameState.js'
import { NON_NOUNS, stableShuffle, testFor } from '../game/comprehension.js'
import { ACHIEVEMENT_BY_ID } from '../game/achievements.js'
import ComprehensionTest from './ComprehensionTest.jsx'
import FactoidLore from './FactoidLore.jsx'

const LIQUID_ITEMS = new Set(['qumesht', 'potion', 'cajMali']) // drinkable — don't "drink the X" them

export default function StoryView({ state, dispatch }) {
  const node = STORY[state.nodeId]
  // in debug mode peak never runs out, so hovering always reveals the English
  const peak = state.debug ? 999 : state.peak
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
  // time-of-day phase id), so resolve against inventory + the world clock
  const has = (id) => hasCond(state, id)
  const lines = visibleLines(node, has)
  // the HARD gate on a good/secret ending's achievement: only unearned ones are
  // tested (a fate needs no proof; an achievement earned on an earlier run is
  // yours). EVERY question must be answered correctly; one wrong ends the
  // attempt — but the deed is already recorded (state.eligible), so the test
  // can be retaken from the Achievements tab with fresh questions.
  const alreadyEarned = !!state.earned?.[state.nodeId]
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
  const pendingAch = !state.ended && state.pendingTest ? ACHIEVEMENT_BY_ID[state.pendingTest] : null
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

  const isNoun = (id) => id && !NON_NOUNS.has(id)
  const lineDiscovered = (line) => line.every((t) => !t.id || state.discovered[t.id])
  // the sentence a reveal-gate points at. When the naming word recurs (an arrival
  // line "you climb up from the river…" AND a signpost "below, a road goes to the
  // river"), ring the LAST occurrence — the establishing/arrival lines come first,
  // and it's the later signpost that actually names the direction, so we never bait
  // the player into the "where you came from" line. See BACKTRACK in gameState.js.
  const sentenceFor = (senseId) => lines.findLast((line) => line.some((t) => t.id === senseId))

  // === HEARTS IN THE STORY ==================================================
  // Your health is a story line, not a chip: HEART_LEVELS[hearts] says how you
  // are right now. Below full, the line hides a once-per-level self-heal —
  // discover every word of the line (📜) to reveal the mending action; taking
  // it (dispatch HEAL) is a normal token spend worth one heart.
  const heartLevel = HEART_LEVELS[state.hearts]
  const healUnused = !!heartLevel?.heal && !state.healedAt?.[state.hearts]
  const healRevealed = healUnused && lineDiscovered(heartLevel.line)
  // An option stays hidden until you discover the sentence it belongs to — authored
  // PER OPTION as `reveal: '<senseId>'` in content.js (deliberately NOT an automatic
  // rule). No `reveal` field => the option is always shown. `scripts/storystats.mjs`
  // lints the design goals: that most options are gated, and that every node always
  // keeps at least one ungated, always-visible path.
  const optionRevealed = (opt) => {
    if (!opt.reveal) return true
    // a step BACK to a recently-visited place always shows — never re-gated, and
    // (because it counts as revealed) never rings its sentence. See BACKTRACK in
    // gameState.js. Forward progress into a NEW place still gates normally.
    if (isBacktrack(state, opt.to)) return true
    const line = sentenceFor(opt.reveal)
    return !line || lineDiscovered(line)
  }

  // what you hold. Companions (ITEMS[id].companion) are tracked exactly like items
  // but they're who walks WITH you, so they render as their own story line instead
  // of "you have a X", and an option can gate on them with `requires: '<companionId>'`.
  const ownedIds = Object.keys(state.inventory).filter((id) => state.inventory[id] > 0)
  // currency (lek) is a COUNT shown in the topbar purse, not a thing in the
  // "ti ke një X" carry-line. Ids with no ITEMS entry are story FLAGS (a kept
  // besa, a promise) — real state for requires/unless, but nothing you carry.
  const itemIds = ownedIds.filter((id) => ITEMS[id] && !ITEMS[id].companion && !ITEMS[id].currency)
  const companionIds = ownedIds.filter((id) => ITEMS[id]?.companion)
  const usableOwned = ownedIds.filter((id) => ITEMS[id]?.use)

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

  // Distractors built from the item(s) you carry — an impossible action on the
  // item, and sometimes a nonsensical combo of the item with a thing in the scene.
  const presentNouns = [...new Set(lines.flat().filter((t) => isNoun(t.id)).map((t) => t.id))]
  const itemConfusers = []
  if (itemIds.length > 0) {
    const hash = [...state.nodeId].reduce((a, c) => a + c.charCodeAt(0), 0)
    const featured = itemIds[hash % itemIds.length]
    const fw = ITEMS[featured].word || featured
    itemConfusers.push([LIQUID_ITEMS.has(featured) ? w('lufto') : w('pi'), w(fw)])
    if (presentNouns.length > 0 && hash % 2 === 0) {
      itemConfusers.push([w('jashte'), w(fw), w(presentNouns[hash % presentNouns.length])])
    }
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
    if (!hasRequiredItem(state, opt)) return // hidden by requires:/unless:
    if (!optionRevealed(opt)) {
      hiddenPaths++
      return
    }
    const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
    const affordable = canAfford(state, opt)
    entries.push({
      key: 'opt-' + i,
      tokens: opt.text,
      real: true,
      allDiscovered,
      enoughMana,
      lek: opt.lek || 0,
      affordable,
      ok: allDiscovered && enoughMana && hasRequiredItem(state, opt) && affordable,
      onSelect: () => dispatch({ type: 'CHOOSE', option: opt, targetNode: STORY[opt.to] }),
    })
  })
  // item uses — always available (you hold the item)
  usableOwned.forEach((id) => {
    const it = ITEMS[id]
    const { allDiscovered, enoughMana, ok } = canUseItem(state, it)
    entries.push({
      key: 'use-' + id,
      tokens: it.use.phrase,
      real: true,
      allDiscovered,
      enoughMana,
      ok,
      onSelect: () => dispatch({ type: 'USE_ITEM', item: it }),
    })
  })
  // the hearts-ladder self-heal — revealed by fully discovering the health line
  if (healRevealed) {
    const { allDiscovered, enoughMana, ok } = canSpeak(state, heartLevel.heal.phrase)
    entries.push({
      key: 'heal',
      tokens: heartLevel.heal.phrase,
      real: true,
      heal: true,
      allDiscovered,
      enoughMana,
      ok,
      onSelect: () => dispatch({ type: 'HEAL' }),
    })
  }
  // confusers — always shown (the comprehension trap)
  {
    node.options.forEach((opt, i) => {
      if (!opt.confuser) return
      const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
      entries.push({
        key: 'opt-' + i,
        tokens: opt.text,
        allDiscovered,
        enoughMana,
        ok: allDiscovered && enoughMana,
        onSelect: () => {
          dispatch({ type: 'CONFUSE' })
          setConfusedKey('opt-' + i)
        },
      })
    })
    dynamicConfusers.forEach((toks, k) => {
      const { allDiscovered, enoughMana } = canSpeak(state, toks)
      entries.push({
        key: 'dyn-' + k,
        tokens: toks,
        allDiscovered,
        enoughMana,
        ok: allDiscovered && enoughMana,
        onSelect: () => {
          dispatch({ type: 'CONFUSE' })
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
    if (!hasRequiredItem(state, opt)) return // path not available at all → don't tease it
    if (optionRevealed(opt)) return // already opened
    const line = sentenceFor(opt.reveal)
    if (line) revealLineIdx.add(lines.indexOf(line))
  })
  // the health line telegraphs its hidden mend the same way, until it's open
  if (healUnused && !healRevealed) revealLineIdx.add('hearts')

  const renderLine = (line, i) => {
    const revealsPath = revealLineIdx.has(i)
    // a Q() line — quoted word-for-word from the folk sources; set apart, attributed
    const quoteSrc = line.quote
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
            peak={peak}
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
        {quoteSrc && (
          <span className="quote-src" title="Quoted word-for-word from the folk sources">
            — {quoteSrc}
          </span>
        )}
      </p>
    )
  }

  return (
    <div className="card story">
      <div className="story-text">
        {!state.ended && heartLevel && renderLine(heartLevel.line, 'hearts')}
        {!state.ended && companionIds.length > 0 && renderLine(companionLine(), 'companions')}
        {!state.ended && itemIds.length > 0 && renderLine(carryLine(), 'carry')}
        {/* an achievement ending's tale stays HIDDEN until the gate is passed —
            no cribbing the answers off the page, and a failed attempt reveals
            nothing (the tale waits, eligible, in the Achievements tab) */}
        {(!state.ended || state.ended === 'bad' || alreadyEarned || endResult === 'passed') &&
          lines.map(renderLine)}
      </div>

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
              <FactoidLore loreId={ACHIEVEMENT_BY_ID[node.id]?.lore} dispatch={dispatch} />
              {endResult === 'passed' && <p className="hearts-restored">❤️ Hearts restored to full.</p>}
              <p className="hint">
                Added to your achievements. This tale is done — step back into the world and
                keep exploring. Everything you&apos;ve gathered comes with you.
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
              <FactoidLore loreId={areaTest.ach.lore} dispatch={dispatch} />
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
          <div className="options">
            {shuffledEntries.map((e) => {
              const wasConfused = confusedKey === e.key
              let cost
              if (wasConfused) {
                cost = <span className="option-cost bad">✗ can&apos;t happen here · −1 ♥</span>
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
                        dispatch({ type: 'SET_VIEW', view: 'practice' })
                      }}
                    >
                      🎯 Train
                    </button>
                  </span>
                )
              } else if (e.affordable === false) {
                // priced path you can't pay for yet — the price tag is the lesson
                cost = <span className="option-cost bad">need 🪙 {-e.lek} lek</span>
              } else if (e.heal) {
                cost = (
                  <span className="option-cost ok">mends one ♥ · spends tokens · once at this level</span>
                )
              } else if (e.lek) {
                cost = (
                  <span className="option-cost ok">
                    {e.lek > 0 ? `earns 🪙 ${e.lek}` : `costs 🪙 ${-e.lek}`} · spends tokens
                  </span>
                )
              } else {
                cost = <span className="option-cost ok">spends tokens</span>
              }
              return (
                <div
                  key={e.key}
                  className={'option' + (e.ok ? ' ready' : ' locked') + (wasConfused ? ' confused' : '')}
                  role="button"
                  aria-disabled={!e.ok}
                  onClick={e.ok ? e.onSelect : undefined}
                >
                  <span className="option-text">
                    {e.tokens.map((tok, j) => (
                      <Token
                        key={j}
                        token={tok}
                        discovered={state.discovered}
                        peak={peak}
                        onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
                        tokenCount={tok.id ? state.mana[tok.id] || 0 : undefined}
                      />
                    ))}
                    <span className="arrow"> →</span>
                  </span>
                  {cost}
                  {state.debug && e.real && !e.ok && (
                    <button
                      className="btn debug-mini"
                      title="Debug: discover these words and grant the tokens to take this path"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        dispatch({ type: 'DEBUG_GRANT', ids: phraseSenses(e.tokens) })
                      }}
                    >
                      ⚡ tokens
                    </button>
                  )}
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
    </div>
  )
}
