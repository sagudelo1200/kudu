import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'

function Login() {
  const { login, logout } = useAuth()
  const navigate = useNavigate()

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
      console.log('🔑 Sesión iniciada correctamente')
      navigate('/kudu')
    } catch (err) {
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    logout()
      .then(() => {
        console.log('🔒 Sesión cerrada correctamente')
      })
      .catch((error) => {
        console.error('❌ Error al cerrar sesión', error)
      })
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '10vh' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Contraseña</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type='submit' disabled={loading}>
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
      <button variant='outlined' color='error' onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Login
