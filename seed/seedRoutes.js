const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const routeDocuments = [
  {
    id: 'kudu',
    data: {
      layout: 'dashboard',
      type: 'collapse',
      name: 'Kudu',
      key: 'kudu',
      icon: 'dashboard',
      roles: ['super'],
      permissions: ['kudu'],
      route: '/kudu',
      component: 'KuduDashboard',
      showInSidebar: true,
    },
  },
]

async function seedRoutes() {
  console.log('🚀 Sembrando rutas mínimas en Firestore...')
  const routesCollection = db.collection('routes')

  // Limpiar colección actual
  const existing = await routesCollection.listDocuments()
  const deleteBatch = db.batch()
  existing.forEach((doc) => deleteBatch.delete(doc))
  await deleteBatch.commit()
  console.log('🧹 Colección "routes" limpiada.')

  // Insertar nuevas rutas
  for (const { id, data } of routeDocuments) {
    await routesCollection.doc(id).set(data)
    console.log(`✅ Ruta "${id}" insertada.`)
  }

  console.log('🎉 Seed completado.')
  process.exit(0)
}

seedRoutes().catch((err) => {
  console.error('❌ Error al sembrar rutas:', err)
  process.exit(1)
})
