import { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'hooks/utils/access'

import componentMap from './componentMap'
import layoutMap from './layoutMap'

export default function useDynamicRoutes() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const { roles, permissions, loading: authLoading } = useAuth()

  useEffect(() => {
    // No ejecutar si aún no cargan los datos del usuario
    if (authLoading) return

    console.log('🔄 Cargando rutas dinámicas...')

    const unsubscribe = onSnapshot(collection(db, 'routes'), (snapshot) => {
      const result = []

      snapshot.forEach((doc) => {
        const data = doc.data()

        if (
          canAccess({
            userRoles: roles,
            userPermissions: permissions,
            requiredRoles: data.roles || [],
            requiredPermissions: data.permissions || [],
          })
        ) {
          const Layout =
            layoutMap[data.layout?.toLowerCase()] ||
            (({ children }) => children)
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

            console.log(`✅ Ruta habilitada: ${data.route}`)
          }
        } else {
          console.warn(`⛔ Ruta restringida: ${data.route}`)
        }
      })

      setRoutes(result)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [roles, permissions, authLoading])

  return { routes, loading }
}
