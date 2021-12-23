import React from 'react'
import './styles.scss'

export default function Button ({ label = 'button', action = null}) {
  return (
    <button className='Button' onClick={action}>{label}</button>
  )
}
