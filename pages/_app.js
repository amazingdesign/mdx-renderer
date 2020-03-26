import React, { useEffect } from 'react'

import { getConfig, getConfigOrFail } from '@bit/amazingdesign.utils.config'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import * as allMUIComponents from '@material-ui/core'

import db from '../src/db'

import withError from '../src/withError'
import QueryContext from '../src/QueryContext'
import mdxComponents from '../src/mdxComponents'

import '../src/markdown.css'
import theme from '../src/theme'

const tmpConfigDelete = getConfig('TMP_CONTENT_DELETE') === 'false' ? false : true

const components = {
  ...allMUIComponents,
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


// POST
const handleDirectContentRoute = async (query, req) => {
  const bodyParser = require('body-parser')

  await new Promise((resolve, reject) => {
    try {
      bodyParser.json()(req, null, resolve)
    } catch (error) {
      reject(error)
    }
  })

  const contentFromQuery = (
    query &&
    query.content
  )

  const contentFromBody = (
    req &&
    req.body &&
    req.body.content
  )

  const content = contentFromBody || contentFromQuery

  return {
    statusCode: 200,
    mdxContent: content
  }

}

// GET
const handleUrlAndAccessTokenRoute = async (query) => {
  const axios = require('axios')

  const accessToken = (
    query &&
    query.accessToken
  )

  const url = (
    query &&
    query.url
  )

  if (!url) return { statusCode: 500 }

  try {
    const res = await axios.get(
      url,
      accessToken && { headers: { 'Authorization': `Bearer ${accessToken}` } }
    )

    return {
      statusCode: 200,
      mdxContent: res.data && res.data.content
    }
  } catch (error) {
    return {
      statusCode: (
        error &&
        error.response &&
        error.response.status
      ) || 500
    }
  }

}

// GET
const handleContentIdAndAccessTokenRoute = async (query) => {
  const axios = require('axios')

  const contentId = (
    query &&
    query.contentId
  )

  const accessToken = (
    query &&
    query.accessToken
  )

  let endpoint = null

  try {
    endpoint = getConfigOrFail('CONTENT_ENDPOINT')
  } catch (error) {
    return { statusCode: 500 }
  }

  if (!endpoint) return { statusCode: 500 }

  const url = endpoint + '/' + contentId

  try {
    const res = await axios.get(
      url,
      accessToken && { headers: { 'Authorization': `Bearer ${accessToken}` } }
    )

    return {
      statusCode: 200,
      mdxContent: res.data && res.data.content,
    }
  } catch (error) {
    return {
      statusCode: (
        error &&
        error.response &&
        error.response.status
      ) || 500
    }
  }

}

// GET
const handleTmpContentIdRoute = async (query) => {
  const contentId = (
    query &&
    query.contentId
  )

  const findTmpContentPromise = new Promise((resolve, reject) => {
    db.findOne(
      { _id: contentId },
      (err, doc) => {
        if (err) reject(err.status || err.code || 500)

        if (!doc) reject(404)

        if (tmpConfigDelete) {
          db.remove({ _id: contentId })
        }

        resolve(doc)
      }
    )
  })

  try {
    const data = await findTmpContentPromise
    return {
      statusCode: 200,
      mdxContent: data && data.content,
    }
  } catch (error) {
    return {
      statusCode: error,
      mdxContent: null,
    }
  }


}

App.getInitialProps = async ({ router: { pathname }, ctx: { req, query } }) => {
  // server only
  if (!req) return

  switch (pathname) {
    case '/':
      if (req.method === 'POST') return await handleDirectContentRoute(query, req)
      return await handleUrlAndAccessTokenRoute(query)
    case '/[contentId]':
      return await handleContentIdAndAccessTokenRoute(query)
    case '/tmp/[contentId]':
      return await handleTmpContentIdRoute(query)
    default:
      return {
        statusCode: 404,
        mdxContent: null,
      }
  }
}

export default withError(App)