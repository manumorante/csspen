import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../js/supabase'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='Account' aria-live='polite'>
      <Link to='/profile'>{session.user.email}</Link>

      <form onSubmit={updateProfile}>
        <input
          className='Input'
          placeholder='Name'
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='Input'
          placeholder='Website'
          id='website'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button className='Button' disabled={loading}>
          Save
        </button>

        <button
          className='Button'
          type='button'
          onClick={() => supabase.auth.signOut()}>
          Salir
        </button>
      </form>
    </div>
  )
}

export default Account
