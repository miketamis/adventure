const baseFormOf = (guide) =>
  guide.rows?.find(({ tag }) => tag === 'indefNom')?.al ||
  guide.target?.al ||
  'this noun'

const OddOneOutExplanation = ({ test }) => (
  <div className="noun-ending-test-explanation">
    <h3>Why your choice belongs with the others</h3>
    <p>
      You chose <b lang="sq">“{test.chosen.al}”</b>. It is{' '}
      <b>{test.chosen.category}</b>, so it belongs with the other{' '}
      <b>{test.matchingCategory}</b> forms in this question.
    </p>
    <p>
      <b lang="sq">“{test.answer.al}”</b> is <b>{test.answer.category}</b>.
      That difference in <b>{test.dimension}</b> makes it the odd one out.
    </p>
  </div>
)

export default function NounEndingRefresher({
  guide,
  attempted,
  correction,
  reason,
  reasoning,
}) {
  if (!guide?.target || !Array.isArray(guide.rows)) return null
  const test = guide.test?.kind === 'odd-one-out' ? guide.test : null

  return (
    <div className="noun-ending-refresher consequence-refresher">
      <h3 className="prompt">Quick ending refresher</h3>

      {test ? (
        <OddOneOutExplanation test={test} />
      ) : (
        <div className="noun-ending-test-explanation" data-private-response>
          <h3>What happened</h3>
          <p>
            {attempted?.al && <>You used <b lang="sq">“{attempted.al}”</b>. </>}
            {attempted?.en && <>You chose “{attempted.en}”. </>}
            {reason}
          </p>
          {(correction?.al || correction?.en) && (
            <p>
              The needed form was{' '}
              {correction.al && <b lang="sq">“{correction.al}”</b>}
              {correction.al && correction.en ? ' — ' : ''}
              {correction.en && <b>“{correction.en}”</b>}.
            </p>
          )}
          {reasoning && <p>{reasoning}</p>}
        </div>
      )}

      <div className="noun-ending-layer-label">This noun</div>
      <h4 className="noun-ending-same-noun">
        Every reviewed form ·{' '}
        <span lang="sq">{baseFormOf(guide)}</span>
      </h4>
      <p className="noun-ending-table-key">
        Each row is a grammatical job. The same spelling can appear more than once when context gives it a different job.
        {test && ' Badges mark the four forms used in this question.'}
      </p>

      <dl className="noun-ending-rows">
        {guide.rows.map((row) => {
          const rowKey = `${row.tag}-${row.al}-${row.gloss || ''}`
          const rowClass = [
            'noun-ending-row',
            row.missed ? 'missed' : '',
            row.selected ? 'selected' : '',
            row.answer ? 'answer' : '',
            row.inQuestion ? 'in-question' : '',
          ].filter(Boolean).join(' ')
          return (
            <div className={rowClass} key={rowKey}>
              <dt>
                <b lang="sq">{row.al}</b>
                <span className="noun-ending-row-badges">
                  {row.inQuestion && <span className="noun-ending-badge in-question">in this question</span>}
                  {row.selected && <span className="noun-ending-badge selected">your choice</span>}
                  {row.answer && <span className="noun-ending-badge answer">odd one out</span>}
                  {!test && row.missed && <span className="noun-ending-this">needed form</span>}
                </span>
              </dt>
              <dd>
                <div className="noun-ending-job">
                  <span>{row.role}</span>
                  <span>{row.learnerMeaning}</span>
                </div>
                {test && row.category && (
                  <div className="noun-ending-category">
                    {test.dimension}: <b>{row.category}</b>
                  </div>
                )}
                <div className="noun-ending-example">
                  <span lang="sq">{row.example?.al}</span>
                  <span>{row.example?.en}</span>
                </div>
              </dd>
            </div>
          )
        })}
      </dl>

      <div className="noun-ending-rule">
        <h4>Pattern to reuse</h4>
        <p className="noun-ending-pattern">{guide.pattern}</p>
        {guide.peer && (
          <div className="noun-ending-peer">
            <b>Same pattern:</b>
            <div className="noun-ending-peer-forms" lang="sq">
              {guide.peer.rows.map((row) => (
                <span key={`${row.tag}-${row.al}`}>
                  <strong>{row.al}</strong>
                  <small>{row.role}</small>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
