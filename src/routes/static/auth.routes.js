import AuthLayout from 'layouts/auth/AuthLayout'
import Login from 'pages/auth/login'
import Unauthorized from 'pages/Unauthorized'
import DashboardLayout from 'layouts/dashboard/DashboardLayout'

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <Login /> }],
  },
  // Ruta independiente para acceso denegado
  {
    path: '/unauthorized',
    element: <DashboardLayout />,
    children: [{ path: '', element: <Unauthorized /> }],
  },
]

export default authRoutes
