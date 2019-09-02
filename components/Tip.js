import React from 'react'
import MDX from '@mdx-js/runtime'

const Tip = ({children}) => (
  <React.Fragment>
    <h1>
      💡
    </h1>
    <MDX>
      {children}
    </MDX>
  </React.Fragment>
)

export default Tip