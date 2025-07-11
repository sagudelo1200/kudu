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

export default function App() {
  const location = useLocation()
  const { pathname } = location

  const { routes, loading: routesLoading } = useDynamicRoutes()
  const { user, loading: authLoading } = useAuth()

  const isLoading = routesLoading || authLoading

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  if (isLoading) return <LoadingPage />

  return (
    <Routes>
      {/* 📌 Rutas públicas (auth, unauthorized, etc.) */}
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      {/* 🔐 Rutas protegidas dinámicas */}
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

      {/* 🚪 Redirecciones inteligentes */}
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

      {/* 🚪 Fallback para rutas no encontradas */}
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
