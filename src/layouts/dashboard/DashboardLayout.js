import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Icon from '@mui/material/Icon'

import MDBox from 'components/MDBox'
import Footer from 'examples/Footer'
import Sidenav from 'examples/Sidenav'
import Configurator from 'examples/Configurator'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import BaseContainer from 'components/BaseContainer'

import {
  useMaterialUIController,
  setLayout,
  setMiniSidenav,
  setOpenConfigurator,
} from 'contexts'

import theme from 'assets/theme'
import themeDark from 'assets/theme-dark'

import brandWhite from 'assets/images/logo-ct.png'
import brandDark from 'assets/images/logo-ct-dark.png'

function DashboardLayout({ routes = [] }) {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    direction,
    darkMode,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    openConfigurator,
  } = controller

  const { pathname } = useLocation()
  const [onMouseEnter, setOnMouseEnter] = useState(false)

  useEffect(() => {
    setLayout(dispatch, 'dashboard')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator)

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
    </MDBox>
  )

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Sidenav
        color={sidenavColor}
        brand={
          (transparentSidenav && !darkMode) || whiteSidenav
            ? brandDark
            : brandWhite
        }
        brandName='Dash Kudu'
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Configurator />
      {configsButton}
      <BaseContainer>
        <DashboardNavbar />
        <MDBox>
          <Outlet />
          <Footer />
        </MDBox>
      </BaseContainer>
    </ThemeProvider>
  )
}

export default DashboardLayout
