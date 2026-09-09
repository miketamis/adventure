import { useId, useRef, useState } from 'react'
import { splitStem } from '../game/content.js'
import { playWord } from '../game/audio.js'

// Renders one token.
//  - particle:          "(of)"  -> dim, not interactive
//  - undiscovered word: English gloss, dashed, click to discover.
//                       Hovering shows the Albanian before discovery.
//  - discovered word:   Albanian surface; hover/click replays its pronunciation.
// `tokenCount` (a number) shows a little token-tally circle under a discovered
// word — used in the answer/option rows so you can see your tokens in context.
export default function Token({ token, discovered, onDiscover, tokenCount }) {
  const [showHint, setShowHint] = useState(false)
  const tooltipId = useId()
  const controlLabelId = `${tooltipId}-control`
  const pointerPlayedAudio = useRef(false)

  const playWithPointer = () => {
    pointerPlayedAudio.current = true
    playWord(token.al)
  }

  const resetPointerAudio = () => {
    pointerPlayedAudio.current = false
  }

  const activate = (action) => (event) => {
    // Word controls can sit inside a selectable story-option card. Do not let
    // learning/replaying a word accidentally choose the surrounding path.
    event.stopPropagation()
    if (!pointerPlayedAudio.current) playWord(token.al)
    action?.()
  }

  if (token.paren) {
    // structural tokens (punctuation) render plainly, not clickable
    return <span className="token particle">{token.en}</span>
  }

  const isKnown = discovered[token.id]

  if (!isKnown) {
    return (
      <button
        type="button"
        className="token gloss"
        aria-labelledby={controlLabelId}
        onClick={activate(() => onDiscover(token.id))}
        onMouseEnter={() => {
          setShowHint(true)
          playWithPointer()
        }}
        onMouseLeave={() => {
          setShowHint(false)
          resetPointerAudio()
        }}
        onFocus={() => setShowHint(true)}
        onBlur={() => setShowHint(false)}
      >
        <span id={controlLabelId} className="sr-only">
          Discover and play the Albanian pronunciation for “{token.en}”. Albanian: <span lang="sq">“{token.al}”</span>.
        </span>
        <span aria-hidden="true">{token.en}</span>
        {showHint && (
          <span id={tooltipId} role="tooltip" className="tooltip" lang="sq" aria-hidden="true">
            {token.al}
          </span>
        )}
      </button>
    )
  }

  const showCount = tokenCount != null
  const [stem, ending] = splitStem(token.id, token.al)
  return (
    <button
      type="button"
      className={'token known' + (showCount ? ' has-count' : '')}
      aria-labelledby={controlLabelId}
      onClick={activate()}
      onMouseEnter={playWithPointer}
      onMouseLeave={resetPointerAudio}
    >
      <span id={controlLabelId} className="sr-only">
        <span lang="sq">{token.al}</span>. Play pronunciation.
        {showCount && <> {tokenCount} training token{tokenCount === 1 ? '' : 's'}.</>}
      </span>
      <span className="known-word" lang="sq" aria-hidden="true">
        <span className="stem">{stem}</span>
        {ending && <span className="ending">{ending}</span>}
      </span>
      {showCount && (
        <span
          className={'token-badge' + (tokenCount > 0 ? '' : ' zero')}
          title={`${tokenCount} training token${tokenCount === 1 ? '' : 's'}`}
          aria-hidden="true"
        >
          {tokenCount}
        </span>
      )}
    </button>
  )
}
