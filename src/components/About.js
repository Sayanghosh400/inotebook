import React from 'react'

const About = (props) => {
  return (
    <div style={{color: props.mode === 'light' ? 'black' : 'white'}}>
      This is Your virtual and personal notebook. You can use it as you want. Thank You.
    </div>
  )
}

export default About
