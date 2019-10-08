import React from 'react'

const CodeSandbox = (props) => (
  <iframe src={props.url}
    allow={'geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'}
    sandbox={'allow-modals allow-forms allow-popups allow-scripts allow-same-origin'}
    style={{
      width: '100%',
      height: '500px',
      border: 0,
      borderRadius: '4px',
      overflow: 'hidden'
    }}
  ></iframe >
)

export default CodeSandbox