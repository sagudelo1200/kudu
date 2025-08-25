import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// 🔒 Auth y contexto
import { useAuth } from 'contexts/AuthContext'
import ProtectedRoute from 'components/ProtectedRoute'

// 🔁 Rutas
import useDynamicRoutes from 'routes/dynamic/useDynamicRoutes'
import authRoutes from 'routes/static/auth.routes'

// 🧩 Extras
import LoadingPage from 'components/LoadingPage'
import PWAInstallPrompt from 'components/PWAInstallPrompt'

/**
 * 🦌 App Principal
 *
 * Orquesta autenticación, rutas dinámicas y navegación scout
 *
 * @returns {JSX} Estructura completa de rutas de Kudu
 *
 * 🪶 El corazón que guía a cada scout por su camino correcto
 */
export default function App() {
  // 🎯 Navegación y ubicación actual
  const location = useLocation()
  const { pathname } = location

  // 🔒 Estado de autenticación y rutas dinámicas
  const { routes, loading: routesLoading } = useDynamicRoutes()
  const { user, loading: authLoading } = useAuth()

  // 🦌 Control de carga unificado
  const isLoading = routesLoading || authLoading

  // 🧭 Navegación inteligente
  const getSmartRedirect = () => {
    if (user) {
      // 🎯 Scout autenticado - buscar última ruta válida o ir a /kudu
      const lastPath = localStorage.getItem('kudu_last_path')
      const isValidPath =
        lastPath && routes.some((route) => route.path === lastPath)
      return isValidPath ? lastPath : '/kudu'
    } else {
      // 🚪 Scout no autenticado - guardar intento de acceso y redirigir a login
      if (pathname !== '/' && pathname !== '/auth/login') {
        localStorage.setItem('kudu_intended_path', pathname)
      }
      return '/auth/login'
    }
  }

  // 🌟 Reset scroll en cada cambio de ruta
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  // 🧭 Guardar última ruta válida para navegación inteligente
  useEffect(() => {
    if (
      user &&
      pathname !== '/' &&
      pathname !== '/auth/login' &&
      pathname !== '/unauthorized'
    ) {
      // 🎯 Solo guardar si el scout tiene acceso a esta ruta
      const hasAccess = routes.some((route) => route.path === pathname)
      if (hasAccess) {
        localStorage.setItem('kudu_last_path', pathname)
      }
    }
  }, [pathname, user, routes])

  // 🔄 Mostrar loading mientras Kudu se prepara
  if (isLoading) return <LoadingPage />

  return (
    <>
      <Routes>
        {/* 📌 Rutas públicas - acceso sin autenticación */}
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}

        {/* 🔐 Rutas protegidas - solo scouts autenticados */}
        {routes.map(
          ({ path, element, children, requiredRoles, requiredPermissions }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute
                  requiredRoles={requiredRoles}
                  requiredPermissions={requiredPermissions}
                  path={path}
                >
                  {element}
                </ProtectedRoute>
              }
            >
              {children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          )
        )}

        {/* 🚪 Redirección inteligente raíz */}
        <Route
          path='/'
          element={<Navigate to={getSmartRedirect()} replace />}
        />

        {/* 🚪 Fallback inteligente - guía a scouts perdidos */}
        <Route
          path='*'
          element={<Navigate to={getSmartRedirect()} replace />}
        />
      </Routes>

      {/* 📱 PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
  )
}
