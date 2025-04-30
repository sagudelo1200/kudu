import Kudu from 'pages/kudu'
import DashboardPage from 'pages/DashboardPage'

const kuduRoutes = [
  {
    name: 'Kudu',
    path: '',
    exact: true,
    element: <Kudu />,
  },
  {
    name: 'Dashboard',
    path: 'dash',
    exact: true,
    element: <DashboardPage />,
  },
]

export default kuduRoutes
