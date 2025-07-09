export function canAccess({
  userRoles = [],
  userPermissions = [],
  requiredRoles = [],
  requiredPermissions = [],
}) {
  if (userRoles.includes('super')) return true

  const hasRole =
    !requiredRoles.length || requiredRoles.some((r) => userRoles.includes(r))
  const hasPermission =
    !requiredPermissions.length ||
    requiredPermissions.some((p) => userPermissions.includes(p))

  return hasRole && hasPermission
}
