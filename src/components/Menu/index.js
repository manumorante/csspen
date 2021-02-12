import React from 'react'
import './styles.scss'
import { Link } from 'wouter'

export default function Menu () {
  return (
    <nav className='Menu'>
      <Link to='/' className='Menu__item'>Home</Link>
      <Link to='/author' className='Menu__item'>Author</Link>
    </nav>
  )
}
