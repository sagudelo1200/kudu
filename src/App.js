import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import useDynamicRoutes from 'routes'
import ProtectedRoute from 'components/ProtectedRoute'
import Unauthorized from 'pages/Unauthorized'

export default function App() {
  const { pathname } = useLocation()
  const routes = useDynamicRoutes()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  useEffect(() => {
    // Simula un estado de carga mientras se obtienen las rutas
    if (routes.length > 0) {
      setIsLoading(false)
    }
  }, [routes])

  if (isLoading) {
    // Muestra un indicador de carga mientras se obtienen las rutas
    return <div>Cargando rutas...</div>
  }

  return (
    <Routes>
      {routes.map(({ path, layout: LayoutComponent, pages, defaultPage }) => (
        <Route
          key={path}
          path={path}
          element={<LayoutComponent routes={pages} />} // Pasamos las rutas al layout
        >
          {pages.map(({ path: childPath, component: PageComponent, roles, permissions }) => (
            <Route
              key={childPath}
              path={childPath}
              element={
                <ProtectedRoute requiredRoles={roles} requiredPermissions={permissions}>
                  <PageComponent />
                </ProtectedRoute>
              }
            />
          ))}
          {/* Ruta por defecto para cada layout */}
          {defaultPage && <Route path="*" element={<Navigate to={defaultPage} replace />} />}
        </Route>
      ))}
      {/* Ruta de acceso denegado */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Ruta global por defecto */}
      <Route path="*" element={<Navigate to="/kudu" replace />} />
    </Routes>
  )
}
