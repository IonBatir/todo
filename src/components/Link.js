import React from 'react'
import PropTypes from 'prop-types'
import Tab from '@material-ui/core/Tab';

const Link = ({ active, children, onClick }) => (
  <Tab
     disabled={active}
     onClick={onClick}
     label={children}
     fullWidth
  />
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link