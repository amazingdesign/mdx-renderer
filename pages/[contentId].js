import React, { useState, useEffect } from 'react'

import MDX from '@mdx-js/runtime'

import WaitingForResponsive from '../components/WaitingForResponsive'

const ContentDisplayer = ({ mdxContent }) => {
  const [isServer, setIsServer] = useState(true)

  useEffect(() => {
    if (isServer) setIsServer(false)
  })

  return (
    <div>
      {
        isServer ?
          <WaitingForResponsive />
          :
          null
      }
      <MDX>{mdxContent}</MDX>
    </div>
  )
}

export default ContentDisplayer