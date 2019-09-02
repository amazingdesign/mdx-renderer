import React from 'react'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

const MD = ({children}) => (
  <React.Fragment>
    {
      unified()
        .use(parse)
        .use(remark2react)
        .processSync(children)
        .contents
    }
  </React.Fragment>
)

export default MD