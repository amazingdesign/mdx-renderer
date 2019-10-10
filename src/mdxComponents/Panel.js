import React from 'react'

import ChildrenUtils from 'react-children-utilities'
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

  console.log(ChildrenUtils.groupByType(children, ['text']))

  return (
    <BackgroundFieldWrapper>
      <TooltipComponent>
        {titleElement}
      </TooltipComponent>
      {
        React.Children.map(
          children,
          child => (
            <MDX components={mdxComponentsOverwrite}>{ChildrenUtils.onlyText(child)}</MDX>
          )
        )
      }
    </BackgroundFieldWrapper>
  )
}

export default Panel