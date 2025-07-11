import { useState, useEffect, useMemo } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'utils/access'

import componentMap from './componentMap'
import layoutMap from './layoutMap'

// 🔥 Función granular: Crear rutas de sub-collapse
function createSubRoutes(parentRoute) {
  if (!parentRoute.collapse || parentRoute.collapse.length === 0) {
    return []
  }

  return parentRoute.collapse.map((subRoute) => {
    const Layout = layoutMap['dashboard'] // Sub-rutas usan dashboard layout
    const Component = componentMap['TestPage'] // Por ahora todas usan TestPage

    return {
      path: subRoute.route,
      element: <Layout />,
      children: [{ path: '', element: <Component /> }],
      name: subRoute.name,
      icon: 'arrow_right',
      requiredRoles: parentRoute.requiredRoles, // Heredan permisos del padre
      requiredPermissions: subRoute.permissions || [],
      isSubRoute: true,
      parentRoute: parentRoute.path,
    }
  })
}

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
    // 🔥 Capturar datos de collapse desde Firestore
    collapse: data.collapse || null,
    showInSidebar: data.showInSidebar !== false,
    order: data.order || 0,
  }

  return processedRoute
}

// 🔥 Función granular: Convertir ruta a formato sidebar
function routeToSidebarFormat(route) {
  const hasCollapse = route.collapse && route.collapse.length > 0

  const sidebarRoute = {
    type: 'collapse',
    name: route.name,
    key: route.path.replace('/', ''),
    route: route.path,
    icon: route.icon,
    noCollapse: !hasCollapse, // 🎯 Solo noCollapse si NO tiene sub-rutas
  }

  // 🔥 Si tiene collapse, agregarlo al formato sidebar
  if (hasCollapse) {
    sidebarRoute.collapse = route.collapse.map((subRoute) => ({
      name: subRoute.name,
      route: subRoute.route,
      key: subRoute.key,
      href: null, // Las sub-rutas son internas, no enlaces externos
    }))
  }

  return sidebarRoute
}

export default function useDynamicRoutes() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    if (authLoading) return

    const unsubscribe = onSnapshot(collection(db, 'routes'), (snapshot) => {
      const mainRoutes = snapshot.docs.map(processRouteDoc).filter(Boolean)

      // 🔥 Crear sub-rutas para cada ruta con collapse
      const subRoutes = mainRoutes.flatMap(createSubRoutes)

      // 🎯 Combinar rutas principales y sub-rutas
      const allRoutes = [...mainRoutes, ...subRoutes]

      setRoutes(allRoutes)
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
    // 🔥 Filtrar solo rutas principales (no sub-rutas)
    const mainRoutes = routes.filter((route) => !route.isSubRoute)

    return mainRoutes
      .filter((route) =>
        canAccess({
          userRoles: roles,
          userPermissions: permissions,
          requiredRoles: route.requiredRoles,
          requiredPermissions: route.requiredPermissions,
        })
      )
      .sort((a, b) => (a.order || 0) - (b.order || 0)) // 🎯 Ordenar por orden
      .map(routeToSidebarFormat)
  }, [routes, roles, permissions])

  return { sidebarRoutes }
}
