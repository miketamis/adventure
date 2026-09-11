import { useId, useRef, useState } from 'react'
import { DEFS, splitStem } from '../game/content.js'
import { playWord } from '../game/audio.js'
import { lexicalTrainability } from '../game/lexicalTrainability.js'

function definitionText(tokens, discovered) {
  return tokens
    .map((entry) => entry.paren || !discovered[entry.id] ? entry.en : entry.al)
    .join(' ')
    .replace(/\s+([,.;!?])/g, '$1')
}

// A dictionary definition should look exactly like the learning text it comes
// from, while remaining inert inside a word's tooltip. In particular, an
// unfamiliar definition word keeps its dashed English gloss and a familiar one
// keeps its Albanian stem/ending treatment, but neither becomes a nested button.
function StaticDefinition({ tokens, discovered }) {
  return (
    <span className="static-definition" aria-hidden="true">
      {tokens.map((entry, index) => {
        if (entry.paren) {
          return <span key={index} className="token particle">{entry.en}</span>
        }

        if (!discovered[entry.id]) {
          return <span key={index} className="token gloss">{entry.en}</span>
        }

        const [stem, ending] = splitStem(entry.id, entry.al)
        return (
          <span key={index} className="token known">
            <span className="known-word" lang="sq">
              <span className="stem">{stem}</span>
              {ending && <span className="ending">{ending}</span>}
            </span>
          </span>
        )
      })}
    </span>
  )
}

// Renders one token.
//  - particle:          "(of)"  -> dim, not interactive
//  - personal/place name: Albanian story text; pronunciation only, never saved
//                         or styled as a vocabulary discovery.
//  - undiscovered word: English gloss, dashed, click to discover.
//                       Hovering shows the Albanian before discovery.
//  - discovered word:   Albanian surface; hover/focus reveals its Albanian
//                       definition and hover/click replays pronunciation.
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

  const trainability = lexicalTrainability(token.id)
  if (!trainability.trainable) {
    const entityLabel = trainability.kind === 'place-name' ? 'Place name' : 'Personal name'
    return (
      <button
        type="button"
        className="token named-entity"
        onClick={activate()}
        onMouseEnter={playWithPointer}
        onMouseLeave={resetPointerAudio}
        aria-label={`${token.al}. ${entityLabel}. Play pronunciation; not a vocabulary target.`}
      >
        <span className="known-word" lang="sq" aria-hidden="true">{token.al}</span>
      </button>
    )
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
  const definition = DEFS[token.id]
  const accessibleDefinition = definition ? definitionText(definition, discovered) : null
  return (
    <button
      type="button"
      className={'token known' + (showCount ? ' has-count' : '')}
      aria-labelledby={controlLabelId}
      onClick={activate()}
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
        <span lang="sq">{token.al}</span>. Play pronunciation.
        {accessibleDefinition && <> Dictionary definition: {accessibleDefinition}.</>}
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
      {showHint && definition && (
        <span id={tooltipId} role="tooltip" className="tooltip definition-tooltip" lang="sq" aria-hidden="true">
          <StaticDefinition tokens={definition} discovered={discovered} />
        </span>
      )}
    </button>
  )
}
