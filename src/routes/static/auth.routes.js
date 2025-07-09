import AuthLayout from 'layouts/auth/AuthLayout'
import Login from 'pages/auth/login'
import Unauthorized from 'pages/Unauthorized'

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <Login /> }],
  },
  {
    path: '/unauthorized',
    element: <AuthLayout />,
    children: [{ path: '', element: <Unauthorized /> }],
  },
]

export default authRoutes
