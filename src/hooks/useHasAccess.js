import { useAuth } from 'contexts/AuthContext'

export default function useHasAccess({
  roles: requiredRoles = [],
  permissions: requiredPermissions = [],
  any = false,
}) {
  const { roles = [], permissions = [] } = useAuth()

  const isSuper = roles.includes('super')
  if (isSuper) return true

  const hasRole = requiredRoles.some((r) => roles.includes(r))
  const hasPermission = requiredPermissions.some((p) => permissions.includes(p))

  if (any) return hasRole || hasPermission

  return (
    (requiredRoles.length === 0 || hasRole) &&
    (requiredPermissions.length === 0 || hasPermission)
  )
}
