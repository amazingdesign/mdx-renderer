import React from 'react'

import MDX from '@mdx-js/runtime'
import Tooltip from '@material-ui/core/Tooltip'

import BackgroundFieldWrapper from './BackgroundFieldWrapper'

const Panel = ({ title, children, tooltip }) => {
  const mdxComponentsOverwrite = {
    // its needed to delete unnecessary padding on wrapper
    wrapper: (props => <div {...props} />)
  }

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
      <MDX components={mdxComponentsOverwrite}>
        {children}
      </MDX>
    </BackgroundFieldWrapper>
  )
}

export default Panel