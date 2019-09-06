import React, { useState, useEffect } from 'react'

import MDX from '@mdx-js/runtime'

import WaitingForResponsive from './WaitingForResponsive'

const ContentDisplayer = ({ mdxContent, displayWaitingForResponsive }) => {
  const [isServer, setIsServer] = useState(true)

  useEffect(() => {
    if (isServer) setIsServer(false)
  })

  return (
    <div>
      {
        displayWaitingForResponsive && isServer ?
          <WaitingForResponsive />
          :
          null
      }
      <MDX>{mdxContent}</MDX>
    </div>
  )
}

export default ContentDisplayer