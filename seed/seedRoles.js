const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const roleDocuments = [
  {
    id: 'super',
    data: {
      name: 'Super Administrador',
      description: 'Acceso total a todas las funciones del sistema.',
      permissions: ['super.*.*'], // Acceso total
    },
  },
]

async function seedRoles() {
  console.log('🔐 Sembrando rol "super"...')
  const rolesCollection = db.collection('roles')

  // Limpieza previa
  const existing = await rolesCollection.listDocuments()
  const deleteBatch = db.batch()
  existing.forEach((doc) => deleteBatch.delete(doc))
  await deleteBatch.commit()
  console.log('🧹 Colección "roles" limpiada.')

  // Insertar nuevo rol
  for (const { id, data } of roleDocuments) {
    await rolesCollection.doc(id).set(data)
    console.log(`✅ Rol "${id}" insertado.`)
  }

  console.log('🎉 Roles sembrados correctamente.')
  process.exit(0)
}

seedRoles().catch((err) => {
  console.error('❌ Error al sembrar roles:', err)
  process.exit(1)
})
