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

  // 🌟 Reset scroll en cada cambio de ruta
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  // 🔄 Mostrar loading mientras Kudu se prepara
  if (isLoading) return <LoadingPage />

  return (
    <Routes>
      {/* 📌 Rutas públicas - acceso sin autenticación */}
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
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
        element={
          user ? (
            <Navigate to='/kudu' replace />
          ) : (
            <Navigate to='/auth/login' replace />
          )
        }
      />

      {/* 🚪 Fallback - guía a scouts perdidos */}
      <Route
        path='*'
        element={
          user ? (
            <Navigate to='/kudu' replace />
          ) : (
            <Navigate to='/auth/login' replace />
          )
        }
      />
    </Routes>
  )
}
