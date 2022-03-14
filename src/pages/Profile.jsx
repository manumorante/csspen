import React from 'react'
import { useUser } from '../js/UserProvider'
import Account from '../components/Account'
import Auth from '../components/Auth'

export default function Profile() {
  const session = useUser()

  return (
    <div className='Profile'>
      {session ? <Account key={session.user.id} session={session} /> : <Auth />}
    </div>
  )
}
