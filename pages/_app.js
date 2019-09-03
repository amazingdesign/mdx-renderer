import React from 'react'

import { useRouter } from 'next/router'

import { MDXProvider } from '@mdx-js/react'

import mdxComponents from '../mdxComponents'
import QueryContext from '../QueryContext'

const components = {
  ...mdxComponents
}

const App = ({ Component, ...props }) => {
  const router = useRouter()
  const { query } = router
  
  return (
    <MDXProvider components={components}>
      <QueryContext.Provider value={query}>
        <Component {...props} />
      </QueryContext.Provider>
    </MDXProvider >
  )
}

App.getInitialProps = async (ctx) => {
  const fetch = require('node-fetch')

  const contentId = (
    ctx.router &&
    ctx.router.query &&
    ctx.router.query.contentId
  )

  const url = process.env.CONTENT_ENDPOINT + '/' + contentId + '.json'

  const res = await fetch(url)
  const data = await res.json()

  return {
    mdxContent: data
  }
}

export default App