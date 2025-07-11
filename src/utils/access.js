// Convertir patrón con '*' a una expresión regular y testear coincidencia
function matchesPattern(pattern, value) {
  try {
    // Escapar puntos y reemplazar '*' por '.*'
    const regex = new RegExp(
      `^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`
    )
    return regex.test(value)
  } catch {
    return false
  }
}

export function canAccess({
  userRoles = [],
  userPermissions = [],
  requiredRoles = [],
  requiredPermissions = [],
  requireAllPermissions = false, // Nueva opción para casos especiales
}) {
  // 🦌 Super usuario tiene acceso total (para emergencias/administración)
  if (userRoles.includes('super')) {
    console.log('La magía de Kudu permite el acceso total al super usuario.')
    return true
  }

  // ✅ ROLES: Debe tener TODOS los roles requeridos (contexto/jerarquía)
  const hasAllRequiredRoles =
    requiredRoles.length === 0 ||
    requiredRoles.every((role) => userRoles.includes(role))

  // ✅ PERMISOS: Matching con wildcard
  const hasRequiredPermissions =
    requiredPermissions.length === 0 ||
    (requireAllPermissions
      ? requiredPermissions.every((perm) =>
          userPermissions.some((up) => matchesPattern(up, perm))
        )
      : requiredPermissions.some((perm) =>
          userPermissions.some((up) => matchesPattern(up, perm))
        ))

  const accessGranted = hasAllRequiredRoles && hasRequiredPermissions

  if (!accessGranted) {
    if (!hasAllRequiredRoles) {
      console.error('❌ Falta jerarquía/contexto requerido')
    }
    if (!hasRequiredPermissions) {
      console.error('❌ Sin permisos suficientes para la acción')
    }
  }

  return accessGranted
}
