import React, { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  useEffect(() => {
    async function fetchUserData() {
      const userId = 'YkrJqORD20hylp1QuQFqR1Lj9Dv2' // ID del usuario actual (simulado)

      try {
        const userDoc = await getDoc(doc(db, 'usuarios', userId))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUser(userData)
          setRoles(userData.roles || [])
          setPermissions(userData.permissions || [])
        } else {
          console.error('El usuario no existe en Firestore.')
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, roles, permissions }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    console.error('useAuth debe ser usado dentro de un AuthProvider')
    return { user: null, roles: [], permissions: [] } // Valores predeterminados
  }
  return context
}
