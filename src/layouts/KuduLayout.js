import { useEffect, useState, useMemo } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import Footer from 'examples/Footer'
import Sidenav from 'examples/Sidenav'
import Configurator from 'examples/Configurator'
import {
  useMaterialUIController,
  setLayout,
  setMiniSidenav,
  setOpenConfigurator,
} from 'contexts'
import theme from 'assets/theme'
import themeDark from 'assets/theme-dark'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import routes from 'routes'

// Brand images
import brandWhite from 'assets/images/logo-ct.png'
import brandDark from 'assets/images/logo-ct-dark.png'
import BaseContainer from 'components/BaseContainer'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

function KuduLayout() {
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
  const [rtlCache, setRtlCache] = useState(null)

  // Cache for RTL
  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin],
    })
    setRtlCache(cacheRtl)
  }, [])

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Toggle configurator
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator)

  // Set layout type
  useEffect(() => {
    setLayout(dispatch, 'kudu')
    // eslint-disable-next-line
  }, [pathname])

  // Set direction attribute for body
  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  // Scroll to top on route change
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  // Configurator button
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
        brandName='Kudu Layout'
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

export default KuduLayout
