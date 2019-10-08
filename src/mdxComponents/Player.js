import React, { useState, useEffect } from 'react'

import ReactPlayer from 'react-player'

// from https://usehooks.com/useWindowSize/
const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

const Player = (props) => {
  // { width, height } properties are undefined if server
  const windowSize = useWindowSize()

  const ratio = props.ratio || 16 / 9
  const getMaxWidth = () => {
    // components are in markdown-body div 
    // 720px max width and16 px of padding
    const maxWidth = 720 - 2 * 16

    return Math.min(windowSize.width || maxWidth, maxWidth)
  }

  return (
    <ReactPlayer
      style={{ width: '100%' }}
      controls={true}
      width={null}
      height={getMaxWidth() / ratio}
      {...props}
    />
  )
}

export default Player