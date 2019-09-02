import React from 'react'
import QueryContext from '../QueryContext'

const Name = (props) => (
  <QueryContext.Consumer>
    {value => value && value.name}
  </QueryContext.Consumer>
)

export default Name