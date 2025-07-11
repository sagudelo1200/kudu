import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { canAccess } from 'utils/access'
import LoadingPage from 'components/LoadingPage'

/**
 * 🦌 Ruta Protegida Scout
 *
 * Guardián que valida acceso basado en roles y permisos de cada scout
 *
 * @param {ReactNode} children - Componente a proteger
 * @param {Array} requiredRoles - Roles necesarios para acceder
 * @param {Array} requiredPermissions - Permisos específicos requeridos
 * @param {boolean} requireAllPermissions - Si requiere TODOS los permisos
 * @returns {ReactNode} Componente protegido o redirección
 *
 * 🪶 Solo pasan los scouts dignos del acceso solicitado
 */
export default function ProtectedRoute({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  requireAllPermissions = false,
}) {
  const { user, roles, permissions, loading } = useAuth()
  const location = useLocation()

  // 🔄 Mientras carga la autenticación, mostrar loading
  if (loading) {
    return <LoadingPage />
  }

  // 🚪 Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />
  }

  // 🎯 Usar la función canAccess centralizada para verificar permisos
  const hasAccess = canAccess({
    userRoles: roles,
    userPermissions: permissions,
    requiredRoles,
    requiredPermissions,
    requireAllPermissions,
  })

  // 🚫 Acceso denegado - redirigir a página no autorizada
  if (!hasAccess) {
    console.warn(`🚫 Acceso DENEGADO a: ${location.pathname}`)
    return <Navigate to='/unauthorized' replace />
  }

  // ✅ Acceso concedido - dejar pasar al scout
  return children
}
