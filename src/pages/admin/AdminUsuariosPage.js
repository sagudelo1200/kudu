import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function AdminUsuariosPage() {
  return (
    <MDBox py={3}>
      <MDTypography variant='h4' color='info'>
        👥 Administración de Usuarios
      </MDTypography>
      <MDTypography variant='body1' mt={2}>
        Gestión completa del directorio scout de Kudu.
      </MDTypography>
      <MDBox mt={3} p={2} bgcolor='info.light' borderRadius='lg'>
        <MDTypography variant='body2' color='white'>
          • Crear y editar perfiles de dirigentes
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Asignar territorios y contextos
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Gestionar estados y configuraciones
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Auditar accesos y actividad
        </MDTypography>
      </MDBox>
    </MDBox>
  )
}

export default AdminUsuariosPage
