import React from 'react'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'

const avatarManu = 'https://secure.gravatar.com/avatar/3d6f5d17df19913a7a7970923563710e'

export default function Author () {
  return (
    <div className='Page Author'>
      <Header />
      <h2 className='Page__title'>Author</h2>
      <Avatar url={avatarManu} />
      <p>I'm passionate about creating applications. I have working between design and front end for more than twelve years. Doing very specific things for the Github community and managing a multidisciplinary team.</p>
      <p>In recent years I have worked creating design systems, both in HTML development, SASS, etc. and in visual design of components using Sketch. </p>
    </div>
  )
}
