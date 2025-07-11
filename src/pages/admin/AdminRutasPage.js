import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function AdminRutasPage() {
  return (
    <MDBox py={3}>
      <MDTypography variant='h4' color='primary'>
        🛣️ Administración de Rutas Dinámicas
      </MDTypography>
      <MDTypography variant='body1' mt={2}>
        Control total del sistema de navegación de Kudu.
      </MDTypography>
      <MDBox mt={3} p={2} bgcolor='primary.light' borderRadius='lg'>
        <MDTypography variant='body2' color='white'>
          • Crear y modificar rutas del sistema
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Configurar layouts y componentes
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Gestionar permisos de acceso por ruta
        </MDTypography>
        <MDTypography variant='body2' color='white'>
          • Ordenar y estructurar navegación
        </MDTypography>
      </MDBox>
    </MDBox>
  )
}

export default AdminRutasPage
