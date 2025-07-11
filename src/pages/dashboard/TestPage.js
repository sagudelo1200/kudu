import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function TestPage() {
  return (
    <MDBox py={3}>
      <MDTypography variant='h4' color='success'>
        ✅ Página de Test
      </MDTypography>
      <MDTypography variant='body1' mt={2}>
        Si ves este mensaje, el sistema de rutas dinámicas está funcionando
        correctamente.
      </MDTypography>
      <MDBox mt={3} p={2} bgcolor='success.light' borderRadius='lg'>
        <MDTypography variant='body2' color='white'>
          🦌 El rugido de Kudu resuena: ¡Ruta dinámica exitosa!
        </MDTypography>
      </MDBox>
    </MDBox>
  )
}

export default TestPage
