import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='[Navbar] flex gap-4'>
      <Link className='nav-link' to='/pen/heart'>
        Logos y dibujos
      </Link>

      <Link className='nav-link' to='/about'>
        Acerca del autor
      </Link>

      <Link className='nav-link' to='/share'>
        Compartir
      </Link>
    </div>
  )
}
