import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'

// Importar el AuthProvider
import { AuthProvider } from 'contexts/AuthContext'

// Material Dashboard 3 PRO React Context Provider
import { MaterialUIControllerProvider } from 'contexts'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AuthProvider> {/* Envolvemos la aplicación con AuthProvider */}
        <App />
      </AuthProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
)
