import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../js/UserProvider'
import { KeyStyle as S } from '../js/Styles.js'
import Navbar from './Navbar'

export default function Header() {
  const session = useUser()

  return (
    <header {...S(['header'])}>
      <h1><Link className='nav-link' to='/'>csspen</Link></h1>
      <Navbar />

      <Link className='nav-link' to='/profile'>{session ? session.user.email : 'Entrar'}</Link>
    </header>
  )
}
