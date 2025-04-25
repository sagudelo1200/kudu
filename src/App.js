import { useEffect } from 'react'

// react-router components
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// Material Dashboard 3 PRO React routes
import routes from 'routes'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  return (
    <Routes>
      {routes.map(({ path, layout: Layout, pages, defaultPage }) => (
        <Route key={path} path={path} element={<Layout />}>
          {pages.map(({ path: childPath, element }) => (
            <Route key={childPath} path={childPath} element={element} />
          ))}
          {/* Ruta por defecto para cada layout */}
          <Route path='*' element={<Navigate to={defaultPage} replace />} />
        </Route>
      ))}
      {/* Ruta global por defecto */}
      <Route path='*' element={<Navigate to='/kudu' replace />} />
    </Routes>
  )
}
