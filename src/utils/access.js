/**
 * 🦌 Validador de Patrones con Wildcard
 *
 * Convierte patrón con '*' a regex y testea coincidencia
 *
 * @param {string} pattern - Patrón con wildcards (ej: "admin.*")
 * @param {string} value - Valor a testear (ej: "admin.users.read")
 * @returns {boolean} Si el valor coincide con el patrón
 */
function matchesPattern(pattern, value) {
  try {
    // 🎯 Escapar puntos y reemplazar '*' por '.*'
    const regex = new RegExp(
      `^${pattern.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`
    )
    return regex.test(value)
  } catch {
    return false
  }
}

/**
 * 🦌 Validador Central de Acceso Scout
 *
 * Función granular que determina si un scout puede acceder a un recurso
 *
 * @param {Array} userRoles - Roles del scout actual
 * @param {Array} userPermissions - Permisos del scout actual
 * @param {Array} requiredRoles - Roles requeridos para el acceso
 * @param {Array} requiredPermissions - Permisos requeridos
 * @param {boolean} requireAllPermissions - Si requiere TODOS los permisos
 * @returns {boolean} Si el acceso está permitido
 *
 * 🪶 El guardián silencioso que protege cada sendero scout
 */
export function canAccess({
  userRoles = [],
  userPermissions = [],
  requiredRoles = [],
  requiredPermissions = [],
  requireAllPermissions = false, // 🎯 Para casos especiales
}) {
  // 🦌 Super usuario tiene acceso total (para emergencias/administración)
  if (userRoles.includes('super')) {
    return true
  }

  // ✅ ROLES: Debe tener TODOS los roles requeridos (contexto/jerarquía)
  const hasAllRequiredRoles =
    requiredRoles.length === 0 ||
    requiredRoles.every((role) => userRoles.includes(role))

  // ✅ PERMISOS: Matching con wildcard inteligente
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

  // 🚫 Log de acceso denegado para debugging
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
