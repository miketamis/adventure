import { useReducer, useState, useEffect, useSyncExternalStore } from 'react'
import { reducer, loadState, saveState, saveEndings } from './game/gameState.js'
import { isMuted, toggleMute, subscribeMute } from './game/audio.js'
import { ENDINGS } from './game/content.js'
import StoryView from './components/StoryView.jsx'
import PracticeView from './components/PracticeView.jsx'
import DictionaryView from './components/DictionaryView.jsx'
import EndingsView from './components/EndingsView.jsx'

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const [confirmReset, setConfirmReset] = useState(false)
  const peakOn = state.peak > 0
  const muted = useSyncExternalStore(subscribeMute, isMuted)
  const endingsGot = ENDINGS.filter((e) => state.discoveredEndings?.[e.id]).length

  // persist the whole state every change — reloading resumes exactly where you were
  useEffect(() => {
    saveState(state)
  }, [state])

  // also keep the endings collection under its own durable key
  useEffect(() => {
    saveEndings(state.discoveredEndings)
  }, [state.discoveredEndings])

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
        <h1 className="title">
          Aventura Shqip <small>· learn Albanian</small>
        </h1>
        <span className={'stat tip-host' + (peakOn ? ' peak-on' : '')}>
          👁 peak <b>{state.peak}</b>
          <span className="tooltip stat-tip">
            <b>👁 Peak</b> — while active, hover a discovered Albanian word to reveal its
            English. It lasts a number of turns; each path you take uses one. Drink a 🧪
            potion to refresh it.
          </span>
        </span>
        <span className="stat">turn <b>{state.turn}</b></span>
        <span className="stat hearts" title="Hearts — a wrong training answer costs one; lose all 3 and it's game over">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={'heart' + (i < state.hearts ? ' full' : '')}>
              ♥
            </span>
          ))}
        </span>
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
        {tab('endings', `🏆 Endings (${endingsGot}/${ENDINGS.length})`)}
      </div>

      {state.view === 'story' && <StoryView state={state} dispatch={dispatch} />}
      {state.view === 'practice' && <PracticeView state={state} dispatch={dispatch} />}
      {state.view === 'dictionary' && <DictionaryView state={state} dispatch={dispatch} />}
      {state.view === 'endings' && <EndingsView state={state} />}

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
