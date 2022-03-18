import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../js/UserProvider'
import { KeyStyle as S } from '../js/Styles.js'
import Navbar from './Navbar'

export default function Header() {
  const session = useUser()

  return (
    <header {...S(['header'])}>
      <Navbar />

      <Link to='/profile'>{session ? session.user.email : 'Login'}</Link>
    </header>
  )
}
