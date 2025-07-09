import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

function Dashboard() {
  console.log('Dashboard component loaded')
  return (
    <MDBox py={3}>
      <MDTypography variant='h4'>🎯 Bienvenido al Dashboard</MDTypography>
      <MDTypography variant='body1' mt={2}>
        Esta es una vista protegida, visible solo para usuarios con el permiso:{' '}
        <b>kudu.dashboard.leer</b>.
      </MDTypography>
    </MDBox>
  )
}

export default Dashboard
