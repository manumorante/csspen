import React from 'react'
import { Link } from 'wouter'

export default function Button ({ label = 'button', className = null, to = null, action = null, disabled = false}) {
  return (
    <>
      {to
        ? <Link className={`Button ${className}`} to={to}>{label}</Link>
        : <button className={`Button ${className}`} disabled={ disabled ? 'disabled' : '' } onClick={action}>{label}</button>
      }
    </>
  )
}
