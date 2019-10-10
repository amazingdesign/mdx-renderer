import React from 'react'

import Panel from './Panel'

const Task = (props) => (
  <Panel
    {...props}
    tooltip={'Zadanie! Wykonaj je starannie! Praktyka to najważniejsza cześć nauki!'}
    title={'☑️ ' + '[ ZADANIE ] ' + (props.title || '') + ' ☑️'}
  />
)

export default Task