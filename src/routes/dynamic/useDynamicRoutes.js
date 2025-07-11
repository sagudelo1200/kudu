import { useState, useEffect, useMemo } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'utils/access'

import componentMap from './componentMap'
import layoutMap from './layoutMap'

// 🔥 Función granular: Procesar documento de ruta
function processRouteDoc(doc) {
  const data = doc.data()

  const Component = componentMap[data.component]
  const Layout = layoutMap[data.layout?.toLowerCase()] || layoutMap['dashboard']

  if (!data.route || !Component || !Layout) {
    console.warn(`⚠️ Ruta incompleta: ${data.route}`)
    return null
  }

  // 🎯 Usar la misma estructura que auth.routes.js
  const processedRoute = {
    path: data.route,
    element: <Layout />,
    children: [{ path: '', element: <Component /> }],
    name: data.name || data.route.replace('/', ''),
    icon: data.icon || 'dashboard',
    requiredRoles: data.roles || [],
    requiredPermissions: data.permissions || [],
  }

  return processedRoute
}

// 🔥 Función granular: Convertir ruta a formato sidebar
function routeToSidebarFormat(route) {
  return {
    type: 'collapse',
    name: route.name,
    key: route.path.replace('/', ''),
    route: route.path,
    icon: route.icon,
    noCollapse: true,
  }
}

export default function useDynamicRoutes() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    if (authLoading) return

    const unsubscribe = onSnapshot(collection(db, 'routes'), (snapshot) => {
      const processedRoutes = snapshot.docs.map(processRouteDoc).filter(Boolean)

      setRoutes(processedRoutes)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [authLoading])

  return { routes, loading }
}

// 🎯 Hook especializado para el sidebar (SÍ filtra por permisos)
export function useSidebarRoutes() {
  const { routes } = useDynamicRoutes()
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
      .map(routeToSidebarFormat)
  }, [routes, roles, permissions])

  return { sidebarRoutes }
}
