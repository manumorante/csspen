import React from 'react'
import Avatar from '../../components/Avatar'

const avatarManu = 'https://secure.gravatar.com/avatar/3d6f5d17df19913a7a7970923563710e'

export default function Author () {
  return (
    <div className='Page Author'>
      <h2 className='Page__title'>Author</h2>
      <Avatar url={avatarManu} />
    </div>
  )
}
