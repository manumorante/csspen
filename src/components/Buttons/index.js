import React from 'react'
import './styles.css'

export default function Buttons ({ children, className }) {
  return (
    <div className={`Buttons ${className}`}>
      {children}
    </div>
  )
}
