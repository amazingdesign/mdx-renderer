import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { MDXProvider } from '@mdx-js/react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import mdxComponents from '../src/mdxComponents'
import QueryContext from '../src/QueryContext'

import '../src/markdown.css'
import theme from '../src/theme'

const components = {
  ...mdxComponents
}

const App = ({ Component, ...props }) => {
  const router = useRouter()
  const { query } = router

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  })

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MDXProvider components={components}>
          <QueryContext.Provider value={query}>
            <Component {...props} />
          </QueryContext.Provider>
        </MDXProvider >
      </ThemeProvider>
    </React.Fragment>
  )
}

App.getInitialProps = async (ctx) => {
  const fetch = require('node-fetch')

  const contentId = (
    ctx.router &&
    ctx.router.query &&
    ctx.router.query.contentId
  )

  const url = process.env.CONTENT_ENDPOINT + '/' + contentId

  const res = await fetch(url)
  const data = await res.json()

  return {
    mdxContent: data && data.content
  }
}

export default App