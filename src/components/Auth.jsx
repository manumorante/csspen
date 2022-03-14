import React, { useState } from 'react'
import { client } from '../js/supabase'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await client.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='Auth'>
      {loading ? (
        'Sending magic link...'
      ) : (
        <form className='flex flex-col gap-4 items-center justify-center p-4' onSubmit={handleLogin}>
          <input
            id='email'
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='Button' aria-live='polite'>
            Send magic link
          </button>
        </form>
      )}
    </div>
  )
}
