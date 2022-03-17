import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../js/UserProvider'
import { layout } from '../styles'
import Navbar from './Navbar'

export default function Header() {
  const session = useUser()

  useEffect(() => {
    console.table(session)
  }, [session])

  return (
    <header
      className={`Header ${layout.header} flex gap-1 p-2 items-center justify-between `}>
      <Navbar />

      <div className=''>
        <Link to='/profile'>{session ? session.user.email : 'Login'}</Link>
      </div>
    </header>
  )
}
