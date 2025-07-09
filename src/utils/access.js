export function canAccess({
  userRoles = [],
  userPermissions = [],
  requiredRoles = [],
  requiredPermissions = [],
  requireAllPermissions = false, // Nueva opción para casos especiales
}) {
  // 🦌 Super usuario tiene acceso total (para emergencias/administración)
  if (userRoles.includes('super')) {
    console.log('🔑 SUPER ACCESS GRANTED')
    return true
  }

  // ✅ ROLES: Debe tener TODOS los roles requeridos (contexto/jerarquía)
  const hasAllRequiredRoles =
    requiredRoles.length === 0 ||
    requiredRoles.every((role) => userRoles.includes(role))

  // ✅ PERMISOS: Debe tener AL MENOS UN permiso (acción específica)
  // O TODOS si requireAllPermissions es true (para operaciones críticas)
  const hasRequiredPermissions =
    requiredPermissions.length === 0 ||
    (requireAllPermissions
      ? requiredPermissions.every((perm) => userPermissions.includes(perm))
      : requiredPermissions.some((perm) => userPermissions.includes(perm)))

  const accessGranted = hasAllRequiredRoles && hasRequiredPermissions

  console.log(`🎯 Roles válidos: ${hasAllRequiredRoles}`)
  console.log(`⚡ Permisos válidos: ${hasRequiredPermissions}`)
  console.log(`\n🔑 ACCESS ${accessGranted ? 'GRANTED\n' : 'DENIED\n'}`)

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
