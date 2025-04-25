import Kudu from 'pages/kudu'
import DashboardPage from 'pages/DashboardPage'

const kuduRoutes = [
  {
    path: '',
    exact: true,
    element: <Kudu />,
  },
  {
    path: 'dash',
    exact: true,
    element: <DashboardPage />,
  },
]

export default kuduRoutes
