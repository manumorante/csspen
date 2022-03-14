import React, { useEffect } from 'react'
import { useUser } from '../js/UserProvider'
import NavBar from './NavBar'

export default function TopBar() {
  const session = useUser()

  useEffect(() => {
    console.table(session)
  }, [session])

  return (
    <div className='TopBar'>
      <NavBar />

      <div className='TopBar__user'>
        {session ? session.user.email : 'Guest'}
      </div>
    </div>
  )
}
