require('dotenv').config()

const images = require('remark-images')
const emoji = require('remark-emoji')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji]
  },
  scope: 'import * as Components from "./components"'
})

module.exports = withMDX({
  env: {
    CONTENT_ENDPOINT: process.env.CONTENT_ENDPOINT,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    
    return config
  }
})
