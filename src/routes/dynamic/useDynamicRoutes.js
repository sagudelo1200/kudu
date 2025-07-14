import { useState, useEffect, useMemo } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'utils/access'

import componentMap from './componentMap'
import layoutMap from './layoutMap'

/**
 * 🦌 Crear Sub-rutas de Collapse
 *
 * Convierte sub-elementos de collapse en rutas React válidas
 *
 * @param {Object} parentRoute - Ruta padre con collapse
 * @returns {Array} Array de sub-rutas procesadas
 */
function createSubRoutes(parentRoute) {
  if (!parentRoute.collapse || parentRoute.collapse.length === 0) {
    return []
  }

  return parentRoute.collapse.map((subRoute) => {
    const Layout =
      layoutMap[parentRoute.layout?.toLowerCase()] || layoutMap['kudu']
    const Component =
      componentMap[subRoute.component] || componentMap['DefaultPage']

    return {
      path: subRoute.route,
      element: <Layout />,
      children: [{ path: '', element: <Component /> }],
      name: subRoute.name,
      icon: 'arrow_right',
      requiredRoles: parentRoute.requiredRoles,
      requiredPermissions: subRoute.permissions || [],
      isSubRoute: true,
      parentRoute: parentRoute.path,
    }
  })
}

/**
 * 🦌 Procesar Documento de Ruta
 *
 * Convierte documento Firestore en ruta React válida
 *
 * @param {Object} doc - Documento de Firestore
 * @returns {Object|null} Ruta procesada o null si es inválida
 */
function processRouteDoc(doc) {
  const data = doc.data()

  const Component = componentMap[data.component]
  const Layout = layoutMap[data.layout?.toLowerCase()] || layoutMap['dashboard']

  if (!data.route || !Component || !Layout) {
    console.warn(`⚠️ Ruta incompleta: ${data.route}`)
    return null
  }

  // 🎯 Estructura estándar de ruta Kudu
  const processedRoute = {
    path: data.route,
    element: <Layout />,
    children: [{ path: '', element: <Component /> }],
    name: data.name || data.route.replace('/', ''),
    icon: data.icon || 'dashboard',
    requiredRoles: data.roles || [],
    requiredPermissions: data.permissions || [],
    // 🔥 Datos adicionales de collapse y sidebar
    collapse: data.collapse || null,
    showInSidebar: data.showInSidebar !== false,
    order: data.order || 0,
  }

  return processedRoute
}

/**
 * 🦌 Convertir Ruta a Formato Sidebar
 *
 * Transforma ruta interna a formato compatible con Sidenav
 *
 * @param {Object} route - Ruta interna procesada
 * @returns {Object} Ruta en formato sidebar
 */
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
      href: null, // 🎯 Sub-rutas son internas, no enlaces externos
    }))
  }

  return sidebarRoute
}

/**
 * 🦌 Rutas Dinámicas Principal
 *
 * Hook que carga y procesa todas las rutas desde Firestore en tiempo real
 *
 * @returns {Object} {routes, loading} - Rutas procesadas y estado de carga
 *
 * 🪶 El navegante que conoce todos los senderos scout
 */
export default function useDynamicRoutes() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    // ⚠️ No cargar rutas hasta que auth esté listo
    if (authLoading) return

    // 🔒 Escuchar cambios en tiempo real de colección routes
    const unsubscribe = onSnapshot(collection(db, 'routes'), (snapshot) => {
      // 🎯 Procesar documentos de rutas principales
      const mainRoutes = snapshot.docs.map(processRouteDoc).filter(Boolean)

      // 🔥 Crear sub-rutas para cada ruta con collapse
      const subRoutes = mainRoutes.flatMap(createSubRoutes)

      // � Combinar rutas principales y sub-rutas
      const allRoutes = [...mainRoutes, ...subRoutes]

      setRoutes(allRoutes)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [authLoading])

  return { routes, loading }
}

/**
 * 🦌 Rutas para Sidebar
 *
 * Hook especializado que filtra rutas por permisos para mostrar en sidebar
 *
 * @returns {Object} {sidebarRoutes} - Rutas filtradas para navegación
 *
 * 🪶 Solo muestra los caminos que el scout puede recorrer
 */
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
