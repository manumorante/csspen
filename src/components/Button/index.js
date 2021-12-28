import React from 'react'
import './styles.scss'

export default function Button ({ label = 'button', action = null, disabled = false}) {
  return (
    <button className='Button' disabled={ disabled ? 'disabled' : '' } onClick={action}>{label}</button>
  )
}
