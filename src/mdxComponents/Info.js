import React from 'react'

import Panel from './Panel'

const Info = (props) => (
  <Panel
    {...props}
    tooltip={'Warto wiedzieć'}
    title={'💡 ' + '[ WARTO WIEDZIEĆ ] ' + (props.title || '')}
  />
)

export default Info