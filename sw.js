const CACHE_NAME = 'kudu-v2'
const urlsToCache = [
  '/',
  '/static/js/',
  '/static/css/',
  '/manifest.json',
  '/favicon.png',
  '/apple-icon.png',
]

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Install event')
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Opened cache')
        // Solo cachear lo esencial inicialmente
        return cache.addAll([
          '/',
          '/manifest.json',
          '/favicon.png',
          '/apple-icon.png',
        ])
      })
      .catch((error) => {
        console.log('[SW] Cache failed:', error)
      })
  )
  // Forzar activación inmediata
  self.skipWaiting()
})

// Interceptar requests con estrategia mejorada
self.addEventListener('fetch', (event) => {
  // Solo interceptar peticiones GET
  if (event.request.method !== 'GET') return

  // Ignorar peticiones a APIs externas y Firebase
  if (
    event.request.url.includes('googleapis.com') ||
    event.request.url.includes('gstatic.com') ||
    event.request.url.includes('firebase') ||
    event.request.url.includes('chrome-extension') ||
    event.request.url.includes('localhost:3000') // Ignora localhost para desarrollo
  ) {
    return
  }

  console.log('[SW] Fetch:', event.request.url)

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[SW] Serving from cache:', event.request.url)
        return cachedResponse
      }

      // Para navegación, siempre devolver index.html
      if (event.request.mode === 'navigate') {
        return caches.match('/').then((response) => {
          return response || fetch(event.request)
        })
      }

      // Para otros recursos, intentar fetch y cachear si es exitoso
      return fetch(event.request)
        .then((response) => {
          // No cachear si no es una respuesta válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          // Clonar la respuesta para cachear
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            // Solo cachear ciertos tipos de archivos
            if (
              event.request.url.includes('/static/') ||
              event.request.url.match(
                /\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$/
              )
            ) {
              cache.put(event.request, responseToCache)
            }
          })

          return response
        })
        .catch(() => {
          // Si falla el fetch y es navegación, devolver index.html cacheado
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
          })
        })
    })
  )
})

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event')
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  // Tomar control inmediatamente
  return self.clients.claim()
})

// Handle background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered')
  }
})

// Handle push notifications (opcional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/favicon.png',
      badge: '/favicon.png',
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
