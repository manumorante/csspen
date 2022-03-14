import React, { useState, useEffect, useContext } from 'react'
import { createClient } from '@supabase/supabase-js'

import { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } from '../../config.js'

export const userContext = React.createContext()

export function useUser() {
  return useContext(userContext)
}

export function UserProvider({ children }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(client.auth.session())

    client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return <userContext.Provider value={session}>{children}</userContext.Provider>
}
