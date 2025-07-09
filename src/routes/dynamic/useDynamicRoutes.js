import { useState, useEffect, useMemo } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'utils/access'

import componentMap from './componentMap'
import layoutMap from './layoutMap'

export default function useDynamicRoutes() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    // No ejecutar si aún no cargan los datos del usuario
    if (authLoading) return

    const unsubscribe = onSnapshot(collection(db, 'routes'), (snapshot) => {
      const result = []

      snapshot.forEach((doc) => {
        const data = doc.data()

        const Layout =
          layoutMap[data.layout?.toLowerCase()] || (({ children }) => children)
        const Component = componentMap[data.component]

        if (data.route && Component) {
          result.push({
            path: data.route,
            element: (
              <Layout>
                <Component />
              </Layout>
            ),
            requiredRoles: data.roles || [],
            requiredPermissions: data.permissions || [],
          })
        } else {
          console.warn(`⚠️ Ruta incompleta: ${data.route} - Falta componente`)
        }
      })

      setRoutes(result)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [authLoading]) // 🚨 Removemos roles y permissions del dependency array

  return { routes, loading }
}

// 🎯 Hook especializado para el sidebar (SÍ filtra por permisos)
export function useSidebarRoutes() {
  const { routes, loading } = useDynamicRoutes()
  const { roles, permissions } = useAuth()

  const sidebarRoutes = useMemo(() => {
    return routes
      .filter((route) =>
        canAccess({
          userRoles: roles,
          userPermissions: permissions,
          requiredRoles: route.requiredRoles,
          requiredPermissions: route.requiredPermissions,
        })
      )
      .map((route) => ({
        type: 'collapse',
        name: route.name || route.path.replace('/', ''),
        key: route.path.replace('/', ''),
        route: route.path,
        // Aquí podrías agregar más propiedades del sidebar como icon, etc.
      }))
  }, [routes, roles, permissions])

  return { sidebarRoutes, loading }
}
