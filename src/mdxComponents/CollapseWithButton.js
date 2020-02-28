import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Collapse, Button } from '@material-ui/core'

const CollapseWithButton = (props) => {
  const [collapsed, setCollapsed] = useState(true)

  const ButtonComponent = props.buttonComponent || Button

  return (
    <>
      <ButtonComponent
        onClick={() => setCollapsed(!collapsed)}
        fullWidth={true}
        children={'Collapse in/out'}
        {...props.buttonProps}
      />
      <br />
      <br />
      <br />
      <Collapse in={!collapsed}>
        {
          !collapsed ?
            props.children
            :
            null
        }
      </Collapse>
    </>
  )
}

CollapseWithButton.propTypes = {
  buttonComponent: PropTypes.func,
  buttonProps: PropTypes.object,
}

export default CollapseWithButton