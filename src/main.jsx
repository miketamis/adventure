import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReleaseErrorBoundary from './components/ReleaseErrorBoundary.jsx'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('The application mount point is missing.')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ReleaseErrorBoundary
      root
      title="Aventura Shqip needs to reload"
    >
      <App />
    </ReleaseErrorBoundary>
  </React.StrictMode>,
)
