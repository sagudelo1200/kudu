import KuduDashboard from 'pages/dashboard'
import DashboardPage from 'pages/DashboardPage'
import TestPage from 'pages/dashboard/TestPage'
import AdminRutasPage from 'pages/admin/AdminRutasPage'
import AdminUsuariosPage from 'pages/admin/AdminUsuariosPage'
import AdminRolesPage from 'pages/admin/AdminRolesPage'
import AdminPermisosPage from 'pages/admin/AdminPermisosPage'
import Unauthorized from 'pages/Unauthorized'
import DefaultPage from 'pages/DefaultPage'

const componentMap = {
  KuduDashboard,
  DashboardPage,
  TestPage,
  AdminRutasPage,
  AdminUsuariosPage,
  AdminRolesPage,
  AdminPermisosPage,
  Unauthorized,
  DefaultPage,
}

export default componentMap
