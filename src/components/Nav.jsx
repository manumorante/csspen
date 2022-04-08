import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='[Nav] hidden sm:flex gap-4'>
      <Link className='nav-link' to='/pens'>
        Ver todos
      </Link>

      <Link className='nav-link' to='/share'>
        Compartir
      </Link>
    </div>
  )
}
