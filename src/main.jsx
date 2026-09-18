import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReleaseErrorBoundary from './components/ReleaseErrorBoundary.jsx'
import { captureEvent } from './analytics.js'
import { recordReactCommit, startPerformanceMonitoring } from './performance.js'
import { installChunkRecovery } from './chunkRecovery.js'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('The application mount point is missing.')

installChunkRecovery()

startPerformanceMonitoring({
  reportSlowInteraction: (properties) => captureEvent(
    'interaction_performance_observed',
    properties,
  ),
})

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Profiler id="application" onRender={recordReactCommit}>
      <ReleaseErrorBoundary
        root
        title="Aventura Shqip needs to reload"
      >
        <App />
      </ReleaseErrorBoundary>
    </Profiler>
  </React.StrictMode>,
)
