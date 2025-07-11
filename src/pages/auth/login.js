import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, Alert } from '@mui/material'
import { useAuth } from 'contexts/AuthContext'

// Components Kudu
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)

      // Redirigir a la ruta original o a /kudu por defecto
      const from = location.state?.from?.pathname || '/kudu'
      navigate(from, { replace: true })
    } catch (err) {
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 400,
        width: '100%',
        mx: 'auto',
        boxShadow: 24,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <MDBox mb={3} textAlign='center'>
          <MDTypography variant='h4' fontWeight='bold' color='info'>
            🦌 Kudu
          </MDTypography>
          <MDTypography variant='body2' color='text' mt={1}>
            Inicia sesión para continuar
          </MDTypography>
        </MDBox>

        <MDBox component='form' onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              type='email'
              label='Correo electrónico'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type='password'
              label='Contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </MDBox>

          {error && (
            <MDBox mb={2}>
              <Alert severity='error'>{error}</Alert>
            </MDBox>
          )}

          <MDBox mb={2}>
            <MDButton
              type='submit'
              variant='gradient'
              color='info'
              fullWidth
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Entrar'}
            </MDButton>
          </MDBox>
        </MDBox>
      </CardContent>
    </Card>
  )
}

export default Login
