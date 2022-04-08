import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../js/UserProvider'
import Nav from './Nav'

export default function Header() {
  const session = useUser()

  return (
    <header className='flex gap-1 p-2 items-center justify-between'>
      <h1>
        <Link className='nav-link' to='/'>
          csspen
        </Link>
      </h1>
      <Nav />

      <Link className='nav-link' to='/profile'>
        {session ? session.user.email : 'Entrar'}
      </Link>
    </header>
  )
}
