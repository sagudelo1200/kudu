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
import Unauthorized from 'pages/Unauthorized'

export default function App() {
  const location = useLocation()
  const { pathname } = location

  const { routes, loading: routesLoading } = useDynamicRoutes()
  const { loading: authLoading } = useAuth()

  const isLoading = routesLoading || authLoading

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  if (isLoading) return <LoadingPage />

  return (
    <Routes>
      {/* 📌 Rutas públicas (auth, etc.) */}
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      {/* 🔐 Rutas protegidas */}
      {routes.map(
        ({ path, element, layout, requiredRoles, requiredPermissions }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute
                requiredRoles={requiredRoles}
                requiredPermissions={requiredPermissions}
              >
                {element}
              </ProtectedRoute>
            }
          />
        )
      )}

      {/* ❌ Acceso denegado */}
      <Route path='/unauthorized' element={<Unauthorized />} />

      {/* 🚪 Redirección por defecto */}
      <Route path='*' element={<Navigate to='/kudu' replace />} />
    </Routes>
  )
}
