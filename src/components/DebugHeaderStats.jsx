// Authoring controls are loaded only when debug mode is enabled. The normal
// story communicates these values through its reviewed Albanian narration.
const TIME_UI = {
  dawn: { icon: '🌅', al: 'agim', en: 'dawn' },
  day: { icon: '☀️', al: 'ditë', en: 'day' },
  dusk: { icon: '🌆', al: 'muzg', en: 'dusk' },
  night: { icon: '🌙', al: 'natë', en: 'night' },
}

export default function DebugHeaderStats({ state, dispatch, activeQuest, phase, buildCommit, badgeOnly = false, onboarding = false }) {
  if (onboarding) return (
    <section className="onboarding-banner" aria-label="First steps">
      <span>
        <b>First steps:</b> activate an English word to reveal its Albanian form, then use
        Train to earn the word-token a path needs.
      </span>
      <button className="btn" onClick={() => dispatch({ type: 'SET_VIEW', view: 'guide' })}>Open the guide →</button>
    </section>
  )
  if (badgeOnly) return (
    <span
      className="stat debug-badge"
      title={`Debug mode is on — build commit ${buildCommit}. Click the title 5× to turn it off.`}
    >
      🛠 debug · <code>{buildCommit.slice(0, 12)}</code>
    </span>
  )
  const timeUi = TIME_UI[phase]
  return (
    <>
      <span className="stat">turn <b>{state.turn}</b></span>
      {activeQuest ? (
        <span className="stat" title="Your traveller's pack and purse return when this character tale ends">🎒 pack waiting</span>
      ) : (
        <span
          className="stat tip-host clickable"
          onClick={() => dispatch({ type: 'DEBUG_LEK' })}
          role="button"
        >
          🪙 <b>{state.inventory.lek || 0}</b>
          <span className="tooltip stat-tip">
            <b>🪙 Lek</b> — the money in your purse. Earn it with work: the mill, the flock,
            mountain tea, a song on the lahuta. Spend it at the market, the inn and the
            healer. Debug: click to add 20.
          </span>
        </span>
      )}
      <span
        className={'stat tip-host time-stat time-' + phase + ' clickable'}
        onClick={() => dispatch({ type: 'DEBUG_TIME', clockDomain: state.view === 'story' ? 'scene' : 'world' })}
        role="button"
      >
        {timeUi.icon} <b>{timeUi.al}</b>
        <span className="tooltip stat-tip">
          <b>{timeUi.icon} Koha</b> — it is <b>{timeUi.en}</b> ({timeUi.al}). The hour drifts
          as you take turns; sleeping or waiting jumps it. Some paths and scenes only exist
          at certain hours. Debug: click to skip to the next phase.
        </span>
      </span>
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
    </>
  )
}
