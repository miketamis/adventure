import { useReducer, useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { reducer, loadState, saveState, saveAchievements, timeOfDay } from './game/gameState.js'
import { TALES, playOf } from './game/taleBeats.js'
import { isMuted, toggleMute, subscribeMute } from './game/audio.js'
import { ACHIEVEMENTS } from './game/achievements.js'
import StoryView from './components/StoryView.jsx'
import PracticeView from './components/PracticeView.jsx'
import DictionaryView from './components/DictionaryView.jsx'
import AchievementsView from './components/AchievementsView.jsx'
import DebugView from './components/DebugView.jsx'
import MiniMap from './components/MiniMap.jsx'

// the four phases of the world-day, named in Albanian (they're vocabulary too)
const TIME_UI = {
  dawn: { icon: '🌅', al: 'agim', en: 'dawn' },
  day: { icon: '☀️', al: 'ditë', en: 'day' },
  dusk: { icon: '🌆', al: 'muzg', en: 'dusk' },
  night: { icon: '🌙', al: 'natë', en: 'night' },
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const [confirmReset, setConfirmReset] = useState(false)
  // debug mode is unlocked by clicking the title 5× in quick succession
  const titleClicks = useRef(0)
  const titleTimer = useRef(null)
  const onTitleClick = () => {
    titleClicks.current += 1
    clearTimeout(titleTimer.current)
    if (titleClicks.current >= 5) {
      titleClicks.current = 0
      dispatch({ type: 'TOGGLE_DEBUG' })
    } else {
      titleTimer.current = setTimeout(() => { titleClicks.current = 0 }, 1500)
    }
  }
  const peakOn = state.peak > 0 || state.debug
  const muted = useSyncExternalStore(subscribeMute, isMuted)
  const phase = timeOfDay(state)
  const timeUi = TIME_UI[phase]
  // tint the whole sky (the page background) to the hour
  useEffect(() => {
    for (const p of Object.keys(TIME_UI)) document.body.classList.remove('time-' + p)
    document.body.classList.add('time-' + phase)
  }, [phase])
  // the tab badge counts UNLOCKED achievements (gate passed), not the bad "fates"
  const achievementsGot = ACHIEVEMENTS.filter((a) => state.earned?.[a.id]).length

  // persist the whole state every change — reloading resumes exactly where you were
  useEffect(() => {
    saveState(state)
  }, [state])

  // also keep the achievement collection under its own durable key
  useEffect(() => {
    saveAchievements(state)
  }, [state.earned, state.eligible, state.attempts])

  const setView = (view) => dispatch({ type: 'SET_VIEW', view })
  const tab = (view, label) => (
    <button
      className={'btn' + (state.view === view ? ' active' : '')}
      onClick={() => setView(view)}
    >
      {label}
    </button>
  )

  return (
    <div className="app">
      <div className="topbar">
        <h1 className="title" onClick={onTitleClick} title="Aventura Shqip">
          Aventura Shqip <small>· learn Albanian</small>
        </h1>
        {state.debug && <span className="stat debug-badge" title="Debug mode is on — click the title 5× to turn it off">🛠 debug</span>}
        {state.embodying && TALES[state.embodying] && (() => {
          const t = TALES[state.embodying]
          const pl = playOf(t)
          const asName = pl?.avatar ? t.cast.find((c) => c.id === pl.avatar)?.name : null
          const prefix = pl?.stance === 'companion' ? 'with ' : pl?.stance === 'witness' ? 'watching ' : 'as '
          return (
            <span className="stat embody-badge" title={(pl?.role || t.title) + ' — you are bound to this tale until an ending or death (the embodiment framework)'}>
              🎭 {asName ? prefix + asName : t.title}
            </span>
          )
        })()}
        <span className={'stat tip-host' + (peakOn ? ' peak-on' : '')}>
          👁 peak <b>{state.debug ? '∞' : state.peak}</b>
          <span className="tooltip stat-tip">
            <b>👁 Peak</b> — while active, hover a discovered Albanian word to reveal its
            English. It lasts a number of turns; each path you take uses one. Drink a 🧪
            potion to refresh it.
          </span>
        </span>
        <span className="stat">turn <b>{state.turn}</b></span>
        <span
          className={'stat tip-host' + (state.debug ? ' clickable' : '')}
          onClick={state.debug ? () => dispatch({ type: 'DEBUG_LEK' }) : undefined}
          role={state.debug ? 'button' : undefined}
        >
          🪙 <b>{state.inventory.lek || 0}</b>
          <span className="tooltip stat-tip">
            <b>🪙 Lek</b> — the money in your purse. Earn it with work: the mill, the flock,
            mountain tea, a song on the lahuta. Spend it at the market, the inn and the
            healer.{state.debug ? ' Debug: click to add 20.' : ''}
          </span>
        </span>
        {/* the hour is told IN the story (phase lines + sky tint), not by a chip;
            debug keeps the chip because clicking it is the time-skip tool */}
        {state.debug && (
          <span
            className={'stat tip-host time-stat time-' + phase + ' clickable'}
            onClick={() => dispatch({ type: 'DEBUG_TIME' })}
            role="button"
          >
            {timeUi.icon} <b>{timeUi.al}</b>
            <span className="tooltip stat-tip">
              <b>{timeUi.icon} Koha</b> — it is <b>{timeUi.en}</b> ({timeUi.al}). The hour drifts
              as you take turns; sleeping or waiting jumps it. Some paths and scenes only exist
              at certain hours. Debug: click to skip to the next phase.
            </span>
          </span>
        )}
        {/* your health is told IN the story (the hearts line + its once-per-level
            self-heal live in StoryView), not by a chip; debug keeps the chip
            because clicking it is the take-a-hit testing tool */}
        {state.debug && (
          <span
            className="stat hearts clickable"
            onClick={() => dispatch({ type: 'DEBUG_HURT' })}
            role="button"
            title="Hearts — the story tells your health now. Debug: click to lose one."
          >
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={'heart' + (i < state.hearts ? ' full' : '')}>
                ♥
              </span>
            ))}
          </span>
        )}
        <button
          className={'btn' + (muted ? ' active' : '')}
          onClick={toggleMute}
          title={muted ? 'Word audio off — click to unmute' : 'Word audio on — click to mute'}
          aria-pressed={muted}
        >
          {muted ? '🔇 muted' : '🔊 sound'}
        </button>
        <button className="btn" onClick={() => setConfirmReset(true)}>
          ⟳ new run
        </button>
      </div>

      <div className="tabs">
        {tab('story', '📖 Story')}
        {tab('practice', '🎯 Train')}
        {tab('dictionary', '📚 Dictionary')}
        {tab('endings', `🏆 Achievements (${achievementsGot}/${ACHIEVEMENTS.length})`)}
        {state.debug && tab('debug', '🛠 Debug')}
      </div>

      {state.view === 'story' && <StoryView state={state} dispatch={dispatch} />}
      {state.view === 'practice' && <PracticeView state={state} dispatch={dispatch} />}
      {state.view === 'dictionary' && <DictionaryView state={state} dispatch={dispatch} />}
      {state.view === 'endings' && <AchievementsView state={state} dispatch={dispatch} />}
      {state.view === 'debug' && <DebugView state={state} dispatch={dispatch} />}

      {/* debug minimap: the world map docked right, expandable to full screen.
          Hidden on the Debug tab, where the same map already fills the page. */}
      {state.debug && state.view !== 'debug' && <MiniMap state={state} dispatch={dispatch} />}

      {state.hearts <= 0 && (
        <div className="modal-overlay">
          <div className="modal gameover">
            <h2>💔 Game over</h2>
            <p>You ran out of hearts. This run is over.</p>
            <p>
              You <b>keep all your training tokens</b> (◆). Start again from the beginning of
              the story — every word will need rediscovering.
            </p>
            <div className="modal-actions">
              <button className="btn primary" onClick={() => dispatch({ type: 'RESET' })}>
                ⟳ Start again
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmReset && (
        <div className="modal-overlay" onClick={() => setConfirmReset(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Start a new run?</h2>
            <p>
              You go back to the <b>start of the story</b>, and every word becomes
              <b> undiscovered</b> again.
            </p>
            <p>
              You <b>keep all your training tokens</b> (◆) — but you can&apos;t spend them
              until you rediscover those words.
            </p>
            <div className="modal-actions">
              <button className="btn" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  dispatch({ type: 'RESET' })
                  setConfirmReset(false)
                }}
              >
                ⟳ New run
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
