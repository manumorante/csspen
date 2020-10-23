import React from 'react'
import './styles.css'
import Menu from '../Menu'

export default function Header () {
  return (
    <div className='Header'>
      <h1 className='Header__title'>CSS.Learn</h1>
      <Menu/>
    </div>
  )
}
