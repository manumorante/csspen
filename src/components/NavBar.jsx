import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='NavBar'>
      <Link to='/'>Home</Link>
      <Link to='/pen/heart'>Pens</Link>
      <Link to='/profile'>Profile</Link>
    </div>
  )
}
