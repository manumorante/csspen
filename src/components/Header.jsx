import React, { useEffect } from 'react'
import { useUser } from '../js/UserProvider'
import NavBar from './NavBar'

export default function Header() {
  const session = useUser()

  useEffect(() => {
    console.table(session)
  }, [session])

  return (
    <header className='Header flex h-8 flex-grow-0'>
      <NavBar />

      <div className='TopBar__user'>
        {session ? session.user.email : 'Guest'}
      </div>
    </header>
  )
}
