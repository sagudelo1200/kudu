import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from 'firebaseApp'

/**
 * 🦌 Contexto de Autenticación Scout
 *
 * Maneja el alma digital de cada scout: identidad, roles y permisos
 *
 * 🪶 El guardian espiritual que conoce a cada miembro del movimiento
 */
const AuthContext = createContext()

/**
 * 🦌 Proveedor de Autenticación
 *
 * Orquesta la sesión scout completa con Firebase y permisos granulares
 *
 * @param {Object} children - Componentes hijos que necesitan autenticación
 * @returns {JSX} Proveedor con estado global de autenticación
 *
 * 🪶 Cada scout es único, cada permiso tiene propósito
 */
export function AuthProvider({ children }) {
  // 🎯 Estado central del scout
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔒 Observador permanente de sesión Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true)
        // 🦌 Buscar datos completos del scout en Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...data })
          setRoles(data.roles || [])

          // 🎯 Cargar permisos heredados de cada rol
          const rolePerms = []
          if (data.roles && data.roles.length > 0) {
            for (const roleId of data.roles) {
              const roleDoc = await getDoc(doc(db, 'roles', roleId))
              if (roleDoc.exists()) {
                const perms = roleDoc.data().permissions || []
                rolePerms.push(...perms)
              }
            }
          }
          // 🌟 Combinar permisos directos y heredados, eliminando duplicados
          const direct = data.permissions || []
          const combined = Array.from(new Set([...direct, ...rolePerms]))
          setPermissions(combined)
        } else {
          // ⚠️ Usuario de Firebase sin perfil scout completo
          console.warn(
            'Usuario no encontrado en Firestore. UID:',
            firebaseUser.uid
          )
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email })
        }
      } else {
        // 🚪 Limpiar sesión cuando se desconecta
        setUser(null)
        setRoles([])
        setPermissions([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  /**
   * 🔒 Iniciar sesión scout
   *
   * @param {string} email - Correo del scout
   * @param {string} password - Contraseña
   * @returns {Promise} Resultado de autenticación Firebase
   */
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  /**
   * 🚪 Cerrar sesión scout
   *
   * @returns {Promise} Resultado de logout Firebase
   */
  async function logout() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{ user, roles, permissions, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * 🦌 Hook de Autenticación
 *
 * Acceso controlado al contexto de autenticación scout
 *
 * @returns {Object} Estado completo de autenticación
 * @throws {Error} Si se usa fuera del AuthProvider
 *
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider')
  return context
}
