import React from 'react'

import MD from './MD'

const Optional = ({ title, children }) => (
  <React.Fragment>
    <h3>
      [OPCJONALNY] {title}
    </h3>
    <MD>
      {children}
    </MD>
  </React.Fragment>
)

export default Optional