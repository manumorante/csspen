import React from 'react'
import { Link } from 'wouter'
import './styles.css'

export default function pen (pen) {
  const { id, name, description } = pen

  return (
    <div className='Pen'>
      <Link className='Pen__title' to={`/pen/${id}`}>{name}</Link>
      <div className='Pen__description'>{description}</div>
    </div>
  )
}
