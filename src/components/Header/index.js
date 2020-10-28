import React from 'react'
import './styles.css'
import Menu from '../Menu'
import { Link } from 'wouter'

export default function Header () {
  return (
    <div className='Header'>
      <h1 className='Header__title'><Link to='/'>CSS.Learn</Link></h1>      
      <Menu/>
    </div>
  )
}
