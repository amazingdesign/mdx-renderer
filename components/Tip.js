import React from 'react'

import MD from './MD'

const Tip = ({ children }) => (
  <React.Fragment>
    <h1>
      💡
    </h1>
    <MD>
      {children}
    </MD>
  </React.Fragment>
)

export default Tip