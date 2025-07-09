import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Unauthorized() {
  const navigate = useNavigate()

  return (
    <MDBox py={6} px={3} textAlign='center'>
      <MDTypography variant='h2' color='error' mb={1}>
        🚫 Acceso Denegado
      </MDTypography>
      <MDTypography variant='body1' color='text' mb={4}>
        No tienes los permisos necesarios para ver esta página.
      </MDTypography>
      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </MDBox>
  )
}

export default Unauthorized
