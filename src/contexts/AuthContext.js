import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from 'firebaseApp'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true)
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...data })
          setRoles(data.roles || [])

          // Cargar permisos heredados de cada rol
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
          // Combinar permisos directos y heredados, eliminando duplicados
          const direct = data.permissions || []
          const combined = Array.from(new Set([...direct, ...rolePerms]))
          setPermissions(combined)
        } else {
          console.warn(
            'Usuario no encontrado en Firestore. UID:',
            firebaseUser.uid
          )
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email })
        }
      } else {
        setUser(null)
        setRoles([])
        setPermissions([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

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

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider')
  return context
}
