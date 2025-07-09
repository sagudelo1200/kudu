const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// 🛠 Personaliza el UID y correo del superadmin
const customUid = 'SUPER_ADMIN_UID'
const email = 'super@kudu.org'

const userData = {
  email,
  roles: ['super'],
  permissions: [], // Usa permisos heredados del rol
  displayName: 'Super Kudu',
  photoURL: '',
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
  isActive: true,
}

async function seedUser() {
  console.log(`👤 Creando usuario superadministrador en /users/${customUid}...`)

  const userRef = db.collection('users').doc(customUid)

  const doc = await userRef.get()
  if (doc.exists) {
    console.warn('⚠️ Usuario ya existe. Sobrescribiendo...')
  }

  await userRef.set(userData, { merge: true })
  console.log('✅ Usuario creado/actualizado correctamente.')

  process.exit(0)
}

seedUser().catch((err) => {
  console.error('❌ Error al crear usuario:', err)
  process.exit(1)
})
