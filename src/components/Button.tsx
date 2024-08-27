import React from 'react'

const Button = (color, text, type) => {
  return (
    <button type={type} className={`px-10 py-2 ${color}`}>
        {text}
    </button>
      
    
  )
}

export default Button
