import { client } from '../js/supabase'
import React, { useEffect, useState } from 'react'
import Account from './Account'
import Auth from './Auth'

export default function Profile() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(client.auth.session())

    client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return (
    <div className='Profile'>
      {session ? <Account key={session.user.id} session={session} /> : <Auth />}
    </div>
  )
}
