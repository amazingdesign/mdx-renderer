import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'

import BackgroundFieldWrapper from './BackgroundFieldWrapper'

const Panel = ({ title, children, tooltip }) => {
  const titleElement = (
    title ?
      <h3 style={{ textAlign: 'center' }}>
        {title}
      </h3>
      :
      null
  )

  const TooltipComponent = (
    tooltip ?
      (props) => <Tooltip {...props} placement={'top'} title={tooltip} />
      :
      (props) => <React.Fragment {...props} />
  )

  return (
    <BackgroundFieldWrapper>
      <TooltipComponent>
        {titleElement}
      </TooltipComponent>
      {children}
    </BackgroundFieldWrapper>
  )
}

export default Panel