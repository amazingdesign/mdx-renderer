import React from 'react'
import MDX from '@mdx-js/runtime'

const Optional = ({ title, children }) => (
  <React.Fragment>
    <h3>
      [OPCJONALNY] {title}
    </h3>
    <MDX>
      {children}
    </MDX>
  </React.Fragment>
)

export default Optional