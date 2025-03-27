/**
=========================================================
* Material Dashboard 3 PRO React - v2.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Link from '@mui/material/Link'
import Icon from '@mui/material/Icon'

// Material Dashboard 3 PRO React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 3 PRO React base styles
import typography from 'assets/theme/base/typography'

function Footer({
  company = {
    href: 'https://github.com/sagudelo1200/',
    name: 'Santiago Agudelo',
  },
  links = [{ href: '', name: '' }],
}) {
  const { href, name } = company
  const { size } = typography

  const renderLinks = () =>
    links.map((link) => (
      <MDBox key={link.name} component='li' px={2} lineHeight={1}>
        <Link href={link.href} target='_blank'>
          <MDTypography variant='button' fontWeight='regular' color='text'>
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ))

  return (
    <MDBox
      width='100%'
      display='flex'
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      px={1.5}
    >
      <MDBox
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        color='text'
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()} - Hecho con
        <MDBox fontSize={size.md} color='text' mb={-0.5} mx={0.25}>
          <Icon color='error' fontSize='inherit'>
            favorite
          </Icon>
        </MDBox>
        por
        <Link href={href} target='_blank'>
          <MDTypography variant='button' fontWeight='medium'>
            &nbsp;{name}.
          </MDTypography>
        </Link>
      </MDBox>
      <MDBox
        component='ul'
        sx={({ breakpoints }) => ({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          listStyle: 'none',
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up('lg')]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </MDBox>
    </MDBox>
  )
}

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
}

export default Footer
