import React from 'react'
import './styles.css'
import Logo from '../Logo'
import Menu from '../Menu'

export default function Header () {
  return (
    <div className='Header'>
      <Logo/>
      <Menu/>
    </div>
  )
}
