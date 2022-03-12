import React, { useState, useEffect } from 'react'
import { supabase } from '../js/supabase'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [editing, setEditing] = useState(false)

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
      {session.user.email}
      {/* <button type='button' onClick={() => setEditing(() => !editing)}>
        Editar
      </button> */}

      <button className='Button' type='button' onClick={() => supabase.auth.signOut()}>
        Salir
      </button>

      {editing &&
        (<form onSubmit={updateProfile}>
        <div>
          <input
            placeholder='Name'
            id='username'
            type='text'
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Website'
            id='website'
            type='url'
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <button disabled={loading}>Update profile</button>
        </div>
      </form>)}
    </div>
  )
}

export default Account
