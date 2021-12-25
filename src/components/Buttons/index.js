import React from 'react'
import './styles.scss'

export default function Buttons ({ children, className }) {
  return (
    <div className={`Buttons ${className}`}>
      {children}
    </div>
  )
}
