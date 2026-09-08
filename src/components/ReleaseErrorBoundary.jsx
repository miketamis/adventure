import { Component, createRef } from 'react'

// React deliberately leaves exception recovery to an error boundary. Keep one
// at the root and another around demand-loaded views so a corrupt render or a
// failed deployment chunk becomes an actionable, accessible recovery screen
// instead of a blank page. No save data is cleared here.
export default class ReleaseErrorBoundary extends Component {
  state = { error: null }
  headingRef = createRef()

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Aventura Shqip recovered from a rendering failure.', error, info)
    window.requestAnimationFrame(() => this.headingRef.current?.focus())
  }

  componentDidUpdate(previousProps) {
    if (this.state.error && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  leave = () => {
    this.setState({ error: null })
    this.props.onLeave?.()
  }

  reload = () => window.location.reload()

  render() {
    if (!this.state.error) return this.props.children

    const {
      root = false,
      title = 'This part of the journey could not open',
      leaveLabel = 'Return to the story',
    } = this.props
    const Heading = root ? 'h1' : 'h2'

    return (
      <section
        className={`card release-error${root ? ' release-error-root' : ''}`}
        role="alert"
        aria-labelledby="release-error-title"
      >
        <Heading id="release-error-title" ref={this.headingRef} tabIndex={-1}>{title}</Heading>
        <p>
          Your progress has not been reset. This can happen when a new release
          arrives while the game is already open or when a file fails to load.
        </p>
        <div className="release-error-actions">
          {this.props.onLeave && (
            <button type="button" className="btn" onClick={this.leave}>{leaveLabel}</button>
          )}
          <button type="button" className="btn primary" onClick={this.reload}>Reload safely</button>
        </div>
      </section>
    )
  }
}
