import PropTypes from 'prop-types'
import MDBox from 'components/MDBox'
import { useMaterialUIController } from 'contexts'

function BaseContainer({ children }) {
  const [controller] = useMaterialUIController()
  const { miniSidenav } = controller

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: 'relative',

        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav ? pxToRem(104) : pxToRem(228),
          transition: transitions.create(['margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  )
}

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BaseContainer
