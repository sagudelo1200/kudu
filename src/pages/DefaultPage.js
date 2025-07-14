import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function DefaultPage() {
  return (
    <MDBox py={3}>
      <MDTypography variant='h4' color='primary'>
        🏠 Página Principal
      </MDTypography>
      <MDTypography variant='body1' mt={2}>
        KUDU: La herramienta Scout que responde al llamado de la organización"
      </MDTypography>
    </MDBox>
  )
}

export default DefaultPage
