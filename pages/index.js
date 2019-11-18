import React from 'react'
import ContentDisplayer from '../src/components/ContentDisplayer'

const UrlPage = (props) => (
  <ContentDisplayer
    displayWaitingForResponsive={true}
    {...props}
  />
)

export default UrlPage