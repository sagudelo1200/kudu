// serviceWorkerRegistration.js
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export function register(config) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(
      process.env.PUBLIC_URL || '',
      window.location.href
    )

    // Permitir service worker en todos los entornos
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL || ''}/sw.js`
      console.log('[PWA] Registrando Service Worker desde:', swUrl)

      registerValidSW(swUrl, config)
    })
  } else {
    console.log('[PWA] Service Worker no soportado en este navegador')
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log(
        '[PWA] Service Worker registrado con éxito en scope:',
        registration.scope
      )

      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                '[PWA] Nuevo contenido disponible; por favor actualiza.'
              )
              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else {
              console.log('[PWA] Contenido cacheado para uso offline.')
              if (config && config.onSuccess) {
                config.onSuccess(registration)
              }
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error(
        '[PWA] Error durante el registro del Service Worker:',
        error
      )
    })
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type')
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log(
        'No hay conexión a internet. La aplicación se ejecuta en modo offline.'
      )
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}

// Función para mostrar prompt de instalación
export function showInstallPrompt() {
  let deferredPrompt

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = e
    console.log('PWA Install prompt disponible')

    // Aquí puedes mostrar tu propio botón de instalación
    showInstallButton()
  })

  function showInstallButton() {
    // Crear botón de instalación personalizado
    const installButton = document.createElement('button')
    installButton.textContent = 'Instalar App'
    installButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: #1A73E8;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `

    installButton.addEventListener('click', () => {
      // Hide the app provided install promotion
      installButton.style.display = 'none'
      // Show the install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación')
        } else {
          console.log('Usuario rechazó la instalación')
        }
        deferredPrompt = null
      })
    })

    document.body.appendChild(installButton)
  }
}
