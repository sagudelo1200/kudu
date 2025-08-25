import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'

// Importar el AuthProvider
import { AuthProvider } from 'contexts/AuthContext'

// Material Dashboard 3 PRO React Context Provider
import { MaterialUIControllerProvider } from 'contexts'

// Importar el Service Worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
)

// Registrar el service worker
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('PWA instalada y lista para uso offline')
  },
  onUpdate: () => {
    console.log('Nueva versión disponible, recarga la página')
  },
})

// Mostrar el prompt de instalación
serviceWorkerRegistration.showInstallPrompt()
