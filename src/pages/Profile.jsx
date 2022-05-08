import React from 'react'
import { useUser } from '../context/UserProvider'
import Account from './Account'
import Auth from './Auth'

export default function Profile() {
  const session = useUser()

  return (
    <div className='Profile'>
      {session ? <Account key={session.user.id} session={session} /> : <Auth />}
    </div>
  )
}
