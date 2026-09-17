import BlockingModal from './BlockingModal.jsx'
import NounEndingRefresher from './NounEndingRefresher.jsx'
import { StaticDefinition } from './Token.jsx'
import { DEFS, DICT } from '../game/content.js'
import { TRAIN_HEALTH_POLICY } from '../game/trainHealthPolicy.js'

export default function HeartConsequenceModal({ consequence, discovered = {}, onDismiss }) {
  const isTrain = consequence.source.startsWith('train-')
  const hasEndingRefresher = Boolean(consequence.grammar?.rows?.length)
  const hasTargetWord = isTrain && Object.hasOwn(DICT, consequence.targetWordId || '')
  const targetDefinition = hasTargetWord && Object.hasOwn(DEFS, consequence.targetWordId)
    ? DEFS[consequence.targetWordId]
    : null
  const targetWord = hasTargetWord ? DICT[consequence.targetWordId] : null

  return (
    <BlockingModal
      id="heart-consequence-title"
      title={consequence.protected
        ? '🛡 Practice miss — no heart lost'
        : consequence.loss === 1
          ? '💔 You lost one heart'
          : `💔 You lost ${consequence.loss} hearts`}
      className={`heart-consequence ${hasEndingRefresher ? 'has-ending-refresher' : ''}`}
      onDismiss={onDismiss}
      actions={(
        <button className="btn primary" onClick={onDismiss}>
          {isTrain ? 'Continue training' : 'Return to game'}
        </button>
      )}
    >
      {hasEndingRefresher ? (
        <NounEndingRefresher
          guide={consequence.grammar}
          attempted={consequence.attempted}
          correction={consequence.correction}
          reason={consequence.reason.text}
          reasoning={consequence.reasoning}
        />
      ) : (
        <>
          <div className="heart-consequence-section" data-private-response>
            <h3>Your attempt</h3>
            {consequence.attempted.al && (
              <p className="heart-consequence-al" lang="sq">{consequence.attempted.al}</p>
            )}
            {consequence.attempted.en && <p>{consequence.attempted.en}</p>}
          </div>
          <div className="heart-consequence-section">
            <h3>{consequence.protected ? 'Why the answer was wrong' : 'Why the heart was lost'}</h3>
            <p>{consequence.reason.text}</p>
          </div>
          {(consequence.correction || consequence.reasoning) && (
            <div className="heart-consequence-section correction">
              <h3>{consequence.correction ? 'What fits here' : 'What to notice'}</h3>
              {consequence.correction?.al && (
                <p className="heart-consequence-al" lang="sq">{consequence.correction.al}</p>
              )}
              {consequence.correction?.en && <p>{consequence.correction.en}</p>}
              {targetDefinition && (
                <div className="heart-consequence-definition">
                  <h4>
                    Definition of <span lang="sq">{targetWord.al}</span>
                  </h4>
                  <p lang="sq">
                    <StaticDefinition
                      tokens={targetDefinition}
                      discovered={discovered}
                      ariaHidden={false}
                    />
                  </p>
                </div>
              )}
              {consequence.reasoning && <p>{consequence.reasoning}</p>}
            </div>
          )}
          {consequence.grammar && (
            <div className="heart-consequence-section grammar">
              <h3>Ending pattern to reuse</h3>
              {consequence.grammar.target?.al && (
                <p className="heart-consequence-al" lang="sq">
                  {consequence.grammar.target.al}
                  {consequence.grammar.target.en ? ` — ${consequence.grammar.target.en}` : ''}
                </p>
              )}
              <p>{consequence.grammar.pattern}</p>
            </div>
          )}
        </>
      )}
      {isTrain && (
        <div className="heart-consequence-section train-combo-reset">
          <h3>Correct combo reset</h3>
          <p>0/{TRAIN_HEALTH_POLICY.recoveryCorrectCompletions} · Build a new correct-answer combo to restore a heart.</p>
        </div>
      )}
    </BlockingModal>
  )
}
