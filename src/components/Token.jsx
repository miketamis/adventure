import { useState } from 'react'

// Renders one token.
//  - particle:          "(of)"  -> dim, not interactive
//  - undiscovered word: English gloss, dashed, click to discover.
//                       Hovering shows the Albanian (always, no peak needed).
//  - discovered word:   Albanian surface. If peak is active, hovering shows the
//                       English, prefixed with the 👁 peak icon.
export default function Token({ token, discovered, peak, onDiscover }) {
  const [hover, setHover] = useState(false)

  if (token.paren) {
    // structural tokens (punctuation) render plainly, not clickable
    return <span className="token particle">{token.en}</span>
  }

  const isKnown = discovered[token.id]

  if (!isKnown) {
    return (
      <span
        className="token gloss"
        onClick={() => onDiscover(token.id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {token.en}
        {hover && <span className="tooltip">{token.al}</span>}
      </span>
    )
  }

  const peekable = peak > 0
  return (
    <span
      className={'token known' + (peekable ? ' peekable' : '')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {token.al}
      {peekable && hover && <span className="tooltip">👁 {token.en}</span>}
    </span>
  )
}
