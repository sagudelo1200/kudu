import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'utils/access'
import LoadingPage from 'components/LoadingPage'

export default function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}) {
  const { user, roles, permissions, loading } = useAuth()
  const location = useLocation()

  // Mientras carga la autenticación, mostrar loading
  if (loading) {
    return <LoadingPage />
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />
  }

  console.log(`\n🛡️ <ProtectedRoute /> validando: ${location.pathname}`)
  // Usar la función canAccess centralizada para verificar permisos
  const hasAccess = canAccess({
    userRoles: roles,
    userPermissions: permissions,
    requiredRoles,
    requiredPermissions,
  })

  if (!hasAccess) {
    console.warn(`🚫 Acceso DENEGADO a: ${location.pathname}`)
    return <Navigate to='/unauthorized' replace />
  }

  console.log(`✅ Acceso CONCEDIDO a: ${location.pathname}`)
  return children
}
