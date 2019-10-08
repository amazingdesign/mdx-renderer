import React, { useState } from 'react'

import Panel from './Panel'

const Optional = (props) => (
  <Panel
    {...props}
    tooltip={'Dla ciekawskich / zawartość opcjonalna'}
    title={'🔎 ' + '[ OPCJONALNE ] ' + (props.title || '')}
  />
)

export default Optional