import React from 'react'

import { MDXProvider } from '@mdx-js/react'

import QueryContext from '../QueryContext'

const mdComponents = {}

const App = ({ Component, ...props }) => {
  const query = (
    props &&
    props.router &&
    props.router.ServerRouter ?
      props.router.ServerRouter.query
      :
      props.router.query
  )

  return (
    <MDXProvider components={mdComponents}>
      <QueryContext.Provider value={query}>
        <Component {...props} />
      </QueryContext.Provider>
    </MDXProvider>
  )
}

App.getInitialProps = ({ query }) => ({})

export default App