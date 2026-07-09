import { useState } from 'react'
import { splitStem } from '../game/content.js'
import { playWord } from '../game/audio.js'

// Renders one token.
//  - particle:          "(of)"  -> dim, not interactive
//  - undiscovered word: English gloss, dashed, click to discover.
//                       Hovering shows the Albanian (always, no peak needed).
//  - discovered word:   Albanian surface. If peak is active, hovering shows the
//                       English, prefixed with the 👁 peak icon.
// `tokenCount` (a number) shows a little token-tally circle under a discovered
// word — used in the answer/option rows so you can see your tokens in context.
export default function Token({ token, discovered, peak, onDiscover, tokenCount, speaking }) {
  const [hover, setHover] = useState(false)

  if (token.paren) {
    // structural tokens (punctuation) render plainly, not clickable
    return <span className="token particle">{token.en}</span>
  }

  const isKnown = discovered[token.id]
  const speak = speaking ? ' speaking' : ''

  if (!isKnown) {
    return (
      <span
        className={'token gloss' + speak}
        onClick={() => onDiscover(token.id)}
        onMouseEnter={() => { setHover(true); playWord(token.al) }}
        onMouseLeave={() => setHover(false)}
      >
        {token.en}
        {hover && <span className="tooltip">{token.al}</span>}
      </span>
    )
  }

  const peekable = peak > 0
  const showCount = tokenCount != null
  const [stem, ending] = splitStem(token.id, token.al)
  return (
    <span
      className={'token known' + (peekable ? ' peekable' : '') + (showCount ? ' has-count' : '') + speak}
      onMouseEnter={() => { setHover(true); playWord(token.al) }}
      onMouseLeave={() => setHover(false)}
    >
      <span className="known-word">
        <span className="stem">{stem}</span>
        {ending && <span className="ending">{ending}</span>}
      </span>
      {showCount && (
        <span
          className={'token-badge' + (tokenCount > 0 ? '' : ' zero')}
          title={`${tokenCount} training token${tokenCount === 1 ? '' : 's'}`}
        >
          {tokenCount}
        </span>
      )}
      {peekable && hover && <span className="tooltip">👁 {token.en}</span>}
    </span>
  )
}
