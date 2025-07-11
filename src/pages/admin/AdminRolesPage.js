import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function AdminRolesPage() {
  return (
    <MDBox py={3}>
      <MDTypography variant='h4' color='warning'>
        ⚜️ Administración de Roles
      </MDTypography>
      <MDTypography variant='body1' mt={2}>
        Arquitectura de autoridad y jerarquía scout.
      </MDTypography>
      <MDBox mt={3} p={2} bgcolor='warning.light' borderRadius='lg'>
        <MDTypography variant='body2' color='white'>
          • Crear roles jerárquicos con herencia
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Configurar niveles y precedencias
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Definir contextos territoriales
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Gestionar metadatos y expiración
        </MDTypography>
      </MDBox>
    </MDBox>
  )
}

export default AdminRolesPage
