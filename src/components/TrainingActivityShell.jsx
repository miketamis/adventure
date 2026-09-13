import { useId } from 'react'

// Every Train interaction uses the same visual and accessibility frame. The
// exercise supplies only its task-specific body; scheduler terminology and
// direction labels are diagnostic metadata and never enter ordinary play.
export default function TrainingActivityShell({
  instruction,
  debug = false,
  debugMeta = null,
  className = '',
  children,
}) {
  const headingId = useId()
  return (
    <div
      className={`training-activity-shell ${className}`.trim()}
      role="group"
      aria-labelledby={headingId}
    >
      <div className="prompt training-activity-header">
        <h3 id={headingId}>{instruction}</h3>
        {debug && debugMeta && (
          <span className="training-activity-debug-meta">{debugMeta}</span>
        )}
      </div>
      {children}
    </div>
  )
}
