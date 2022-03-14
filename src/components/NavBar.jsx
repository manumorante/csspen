import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='NavBar'>
      <Link className='Button' to='/pen/heart'>
        Pens
      </Link>
      <Link className='Button' to='/profile'>
        Profile
      </Link>
    </div>
  )
}
