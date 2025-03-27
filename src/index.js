import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from 'App'

// Material Dashboard 3 PRO React Context Provider
import { MaterialUIControllerProvider } from 'context'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </HashRouter>
)
