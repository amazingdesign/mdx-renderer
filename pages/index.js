import React from 'react'
import ContentDisplayer from '../src/components/ContentDisplayer'

import { getConfig } from '@bit/amazingdesign.utils.config'

const displayWaitingForResponsive = getConfig('DISPLAY_WAITING_FOR_RESPONSIVE') === 'false' ? false : Boolean(getConfig('DISPLAY_WAITING_FOR_RESPONSIVE'))

const UrlPage = (props) => (
  <ContentDisplayer
    displayWaitingForResponsive={displayWaitingForResponsive}
    {...props}
  />
)

export default UrlPage