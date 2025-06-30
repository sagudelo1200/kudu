/** 
  Este archivo carga las rutas dinámicamente desde Firestore.
  Las rutas incluyen layouts, páginas, roles y permisos.
*/

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from 'firebaseApp'

// Layouts dinámicos
import KuduLayout from 'layouts/KuduLayout'
import DashboardLayout from 'layouts/DashboardLayout'

// Componentes dinámicos
import KuduPage from 'pages/KuduPage'
import DashboardPage from 'pages/DashboardPage'

// Mapear layouts y componentes
const layouts = {
  KuduLayout,
  DashboardLayout,
}

const components = {
  KuduPage,
  DashboardPage,
}

export default function useDynamicRoutes() {
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    async function fetchRoutes() {
      const routesCollection = collection(db, 'routes')
      try {
        const snapshot = await getDocs(routesCollection)

        const fetchedRoutes = snapshot.docs.map((doc) => {
          const data = doc.data()

          // Mapear layouts y componentes dinámicamente
          const layout = layouts[data.layout]
          const pages = data.pages.map((page) => ({
            ...page,
            component: components[page.component],
          }))

          return {
            ...data,
            layout,
            pages,
          }
        })

        setRoutes(fetchedRoutes)
      } catch (error) {
        console.error('Error al cargar rutas:', error)
        setRoutes([]) // Fallback a rutas vacías
      }
    }

    fetchRoutes()
  }, [])

  return routes
}
