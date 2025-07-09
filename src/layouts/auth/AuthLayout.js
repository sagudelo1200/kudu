import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from 'assets/theme'
import themeDark from 'assets/theme-dark'
import { useMaterialUIController, setLayout } from 'contexts'
import MDBox from 'components/MDBox'

function AuthLayout() {
  const { pathname } = useLocation()
  const [controller, dispatch] = useMaterialUIController()
  const { darkMode } = controller

  useEffect(() => {
    setLayout(dispatch, 'auth')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <MDBox
        width='100vw'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Outlet />
      </MDBox>
    </ThemeProvider>
  )
}

export default AuthLayout
