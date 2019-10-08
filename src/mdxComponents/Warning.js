import React from 'react'

import Panel from './Panel'

const Warning = (props) => (
  <Panel
    {...props}
    tooltip={'Koniecznie przeczytaj!'}
    title={'⚠️ ' + '[ UWAGA ] ' + (props.title || '')}
  />
)

export default Warning