import React from 'react'

import { MDXProvider } from '@mdx-js/react'

import Components from '../components'
import QueryContext from '../QueryContext'

const mdComponents = {
  ...Components
}

const App = ({ Component, ...props }) => {
  const query = (
    props &&
      props.router &&
      props.router.ServerRouter ?
      props.router.ServerRouter.query
      :
      props.router.query
  )

  console.log(Component)
  console.log(Component.isMDXComponent)

  return (
    <MDXProvider components={mdComponents}>
      <QueryContext.Provider value={query}>
        <Component {...props}
          XXX={() => 'xxx'}
        />
      </QueryContext.Provider>
    </MDXProvider >
  )
}

App.getInitialProps = ({ query }) => ({})

export default App