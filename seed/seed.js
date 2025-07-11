const admin = require('firebase-admin')
const serviceAccount = require('./firebaseServiceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// 🔥 DATOS MAESTROS - TODO EN UN LUGAR
const KUDU_SEED = {
  // 🎭 ROLES ESENCIALES
  roles: [
    {
      id: 'super',
      data: {
        name: 'Super Kudu',
        description: 'Acceso total al rugido de Kudu',
        level: 999,
        permissions: ['*.*.*'],
        context: { type: 'global', scope: 'global', territory: 'mundial' },
        metadata: {
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          createdBy: 'seed_kudu',
          active: true,
        },
      },
    },
  ],

  // 👤 USUARIO FUNDADOR
  user: {
    uid: 'YkrJqORD20hylp1QuQFqR1Lj9Dv2',
    data: {
      email: 'sagudelo1200@gmail.com',
      roles: ['super'],
      permissions: ['*.*.*'],
      displayName: 'Santiago Agudelo',
      photoURL: '',
      territory: 'mundial',
      profile: {
        bio: 'Siempre Listo Para Servir. Fundador de Kudu.',
      },
      settings: {
        theme: 'dark',
        language: 'es',
        notifications: true,
        debugMode: true,
      },
      metadata: {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: null,
        loginCount: 0,
        source: 'seed_system',
        version: '1.0.0',
      },
      isActive: true,
      isFounder: true,
    },
  },

  // 🛣️ RUTAS MAESTRAS
  routes: [
    {
      id: 'kudu_principal',
      data: {
        layout: 'DashboardLayout',
        type: 'collapse',
        name: 'Kudu',
        key: 'kudu',
        icon: 'dashboard',
        roles: ['super'],
        permissions: ['dashboard.kudu.acceder'],
        route: '/kudu',
        component: 'DashboardPage',
        showInSidebar: true,
        order: 1,
        metadata: {
          description: 'Vista principal del sistema Kudu',
          category: 'principal',
        },
      },
    },
    {
      id: 'identidad_accesos',
      data: {
        layout: 'DashboardLayout',
        type: 'collapse',
        name: 'Identidad & Accesos',
        key: 'admin',
        icon: 'admin_panel_settings',
        roles: ['super'],
        permissions: ['admin.acceder'],
        route: '/admin',
        component: 'AdminRutasPage',
        showInSidebar: true,
        order: 2,
        collapse: [
          {
            name: 'Rutas',
            route: '/admin/rutas',
            key: 'rutas',
            permissions: ['admin.rutas.leer'],
            component: 'AdminRutasPage',
            layout: 'DashboardLayout',
          },
          {
            name: 'Usuarios',
            route: '/admin/usuarios',
            key: 'usuarios',
            permissions: ['admin.usuarios.leer'],
            component: 'AdminUsuariosPage',
            layout: 'DashboardLayout',
          },
          {
            name: 'Roles',
            route: '/admin/roles',
            key: 'roles',
            permissions: ['admin.roles.leer'],
            component: 'AdminRolesPage',
            layout: 'DashboardLayout',
          },
          {
            name: 'Permisos',
            route: '/admin/permisos',
            key: 'permisos',
            permissions: ['admin.permisos.leer'],
            component: 'AdminPermisosPage',
            layout: 'DashboardLayout',
          },
        ],
        metadata: {
          description: 'Administración de identidades y control de accesos',
          category: 'admin',
        },
      },
    },
    {
      id: 'test_desarrollo',
      data: {
        layout: 'DashboardLayout',
        type: 'collapse',
        name: 'Test & Desarrollo',
        key: 'test',
        icon: 'code',
        roles: ['super'],
        permissions: ['test.acceder'],
        route: '/test',
        component: 'TestPage',
        showInSidebar: true,
        order: 3,
        metadata: {
          description: 'Herramientas de desarrollo y pruebas del sistema',
          category: 'desarrollo',
        },
      },
    },
  ],
}

// 🔥 Función granular: Limpiar colección
async function limpiarColeccion(nombreColeccion) {
  const coleccion = db.collection(nombreColeccion)
  const existing = await coleccion.listDocuments()
  const deleteBatch = db.batch()
  existing.forEach((doc) => deleteBatch.delete(doc))
  await deleteBatch.commit()
  console.log(`🧹 Colección "${nombreColeccion}" limpiada`)
}

// 🔥 Función granular: Sembrar roles
async function sembrarRoles() {
  console.log('🎭 Sembrando roles...')
  await limpiarColeccion('roles')

  for (const { id, data } of KUDU_SEED.roles) {
    await db.collection('roles').doc(id).set(data)
    console.log(`✅ Rol "${data.name}" creado`)
  }
}

// 🔥 Función granular: Sembrar usuario
async function sembrarUsuario() {
  console.log('👤 Sembrando fundador...')
  const { uid, data } = KUDU_SEED.user

  await db.collection('users').doc(uid).set(data, { merge: true })
  console.log(`✅ Fundador "${data.displayName}" creado`)
}

// 🔥 Función granular: Sembrar rutas
async function sembrarRutas() {
  console.log('🛣️ Sembrando rutas...')
  await limpiarColeccion('routes')

  for (const { id, data } of KUDU_SEED.routes) {
    await db.collection('routes').doc(id).set(data)
    console.log(`✅ Ruta "${data.name}" creada`)

    if (data.collapse) {
      console.log(`   📁 Con ${data.collapse.length} sub-rutas`)
    }
  }
}

// 🦌 FUNCIÓN MAESTRA
async function plantarSemillaUnica() {
  console.log('')
  console.log('🦌'.repeat(25))
  console.log('🔥 KUDU SEED ÚNICO - MENOS ES MÁS')
  console.log('⚜️  UNA SEMILLA PARA GOBERNARLAS A TODAS')
  console.log('🦌'.repeat(25))
  console.log('')

  try {
    await sembrarRoles()
    console.log('')
    await sembrarUsuario()
    console.log('')
    await sembrarRutas()
    console.log('')

    console.log('🎉'.repeat(25))
    console.log('✨ ¡SEMILLA ÚNICA PLANTADA CON ÉXITO!')
    console.log('🔥 El rugido de Kudu resuena completo')
    console.log('🦌 Sistema listo para transformar el escultismo')
    console.log('⚜️  Siempre Mejor. Siempre Listos. Listos para Servir.')
    console.log('🎉'.repeat(25))
  } catch (error) {
    console.error('💥 Error crítico en la siembra:', error)
    process.exit(1)
  }

  process.exit(0)
}

// 🚀 EJECUTAR SEMILLA ÚNICA
plantarSemillaUnica().catch((error) => {
  console.error('💥 Error fatal:', error)
  process.exit(1)
})
