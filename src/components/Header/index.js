import React from 'react'
import './styles.css'
import Logo from '../Logo'
import Menu from '../Menu'

export default function Header () {
  return (
    <div className='Header'>
      <div className='Header__item'><Logo /></div>
      <div className='Header__item'><Menu/></div>
    </div>
  )
}
