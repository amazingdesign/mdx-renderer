import React, { useEffect } from 'react'

import { getConfigOrFail } from '@bit/amazingdesign.utils.config'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import db from '../src/db'

import withError from '../src/withError'
import QueryContext from '../src/QueryContext'
import mdxComponents from '../src/mdxComponents'

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

App.getInitialProps = async ({ router: { pathname }, ctx: { req, query } }) => {
  if (!req) return

  let mdxContent = null
  let statusCode = 200

  const contentId = (
    query &&
    query.contentId
  )

  if (pathname === '/[contentId]') {
    const fetch = require('node-fetch')

    let endpoint = null

    try {
      endpoint = getConfigOrFail('CONTENT_ENDPOINT')
    } catch (error) {
      statusCode = 500
    }

    if (!endpoint) {
      statusCode = 500
    } else {
      const url = endpoint + '/' + contentId

      const res = await fetch(url)
      const data = await res.json()

      mdxContent = data.content
    }
  }

  if (pathname === '/tmp/[contentId]') {

    const findTmpContentPromise = new Promise((resolve, reject) => {
      db.findOne(
        { _id: contentId },
        (err, doc) => {
          if (err) {
            resolve(null)
            statusCode = err.status || err.code || 500
          }
          if (!doc) {
            resolve(null)
            statusCode = 404
          }

          db.remove({ _id: contentId })

          resolve(doc)
        }
      )
    })

    const data = await findTmpContentPromise

    mdxContent = data && data.content
  }

  return {
    statusCode,
    mdxContent
  }
}

export default withError(App)