import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'

export default function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}) {
  const { roles, permissions } = useAuth()

  // Verificar si el usuario tiene al menos un rol o permiso requerido
  const hasAccess =
    requiredRoles.some((role) => roles.includes(role)) ||
    requiredPermissions.some((permission) => permissions.includes(permission))

  if (!hasAccess) {
    return <Navigate to='/unauthorized' replace />
  }

  return children
}
