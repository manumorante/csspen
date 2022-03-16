import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='NavBar flex gap-3'>
      <Link className='' to='/pen/heart'>
        Pens
      </Link>

      <Link className='' to='/about'>
        About
      </Link>

      <Link className='' to='/share'>
        Share
      </Link>
    </div>
  )
}
