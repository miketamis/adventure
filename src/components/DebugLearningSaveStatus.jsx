import { DICT } from '../game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../game/everydayAlbanian.js'
import { FORMS_UNLOCK_THRESHOLD, formsUnlocked } from '../game/gameState.js'
import { buildPhraseProgressionSnapshot } from '../game/phrasePractice.js'

const EXAMPLE_PHRASE_ID = 'going-village'
const EXAMPLE_WORD_ID = 'fshat'

export default function DebugLearningSaveStatus({ state }) {
  const phrase = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === EXAMPLE_PHRASE_ID)
  const missing = phrase.requires.filter((id) => !state.discovered?.[id])
  const eligible = missing.length === 0
  const snapshot = buildPhraseProgressionSnapshot(
    phrase,
    state.phraseProductionProgress?.[phrase.id],
    {
      currentRound: state.trainRound || 0,
      listeningTier: state.phraseListeningMastery?.[phrase.id] || 0,
      matchingTier: state.phraseMatchingMastery?.[phrase.id] || 0,
    },
  )
  const rewarded = state.practiced?.[EXAMPLE_WORD_ID] || 0
  const correctRounds = state.phrasePracticed?.[phrase.id] || 0
  const missedRounds = state.phraseMistakes?.[phrase.id] || 0

  return (
    <aside className="dbg-learning-save-status" data-learning-state="current-save" aria-label="Current save status for the walkthrough example">
      <span className="dbg-learning-save-label">Your save · read only</span>
      <span>
        <b>Example phrase:</b>{' '}
        {eligible
          ? `${snapshot.currentDefinition.label}${snapshot.next?.due ? ' · ready' : ' · spaced'}`
          : `locked · ${phrase.requires.length - missing.length}/${phrase.requires.length} words discovered`}
      </span>
      <span>
        <b lang="sq">{DICT[EXAMPLE_WORD_ID].al}</b> noun forms:{' '}
        {formsUnlocked(state, EXAMPLE_WORD_ID) ? 'unlocked' : `${rewarded}/${FORMS_UNLOCK_THRESHOLD} rewards`}
      </span>
      <span><b>Recorded phrase rounds:</b> {correctRounds} correct · {missedRounds} missed</span>
    </aside>
  )
}
