import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function BlockingModal({
  id,
  title,
  className = '',
  onDismiss,
  returnFocusRef,
  children,
  actions,
}) {
  const dialogRef = useRef(null)
  const headingRef = useRef(null)
  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  useEffect(() => {
    const previous = document.activeElement
    headingRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && dismissRef.current) {
        event.preventDefault()
        dismissRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...(dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) || [])]
      if (!focusable.length) {
        event.preventDefault()
        headingRef.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // React may run cleanup while the former trigger is still inert. Restore
      // focus on the next task after the owning overlay state has settled.
      setTimeout(() => {
        const target = returnFocusRef?.current || previous
        if (target?.isConnected) target.focus?.()
      }, 0)
    }
  }, [])

  return createPortal(
    <div className="modal-overlay" onMouseDown={() => dismissRef.current?.()}>
      <section
        ref={dialogRef}
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={id} ref={headingRef} tabIndex={-1}>{title}</h2>
        {children}
        <div className="modal-actions">{actions}</div>
      </section>
    </div>,
    document.body,
  )
}
