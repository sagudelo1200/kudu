import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function AdminPermisosPage() {
  return (
    <MDBox py={3}>
      <MDTypography variant='h4' color='error'>
        🔐 Administración de Permisos
      </MDTypography>
      <MDTypography variant='body1' mt={2}>
        Control granular de accesos y autorización.
      </MDTypography>
      <MDBox mt={3} p={2} bgcolor='error.light' borderRadius='lg'>
        <MDTypography variant='body2' color='white'>
          • Definir permisos modulo.recurso.accion
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Configurar herencia multinivel
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Validar contextos territoriales
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Auditar cadenas de autorización
        </MDTypography>
      </MDBox>
    </MDBox>
  )
}

export default AdminPermisosPage
