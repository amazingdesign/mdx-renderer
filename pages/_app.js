import React from 'react'

import { MDXProvider } from '@mdx-js/react'

import QueryContext from '../QueryContext'

const mdComponents = {}

export default ({ Component, ...props }) => (
  <MDXProvider components={mdComponents}>
    <QueryContext.Provider value={props && props.router && props.router.query}>
      <Component {...props} />
    </QueryContext.Provider>
  </MDXProvider>
)
