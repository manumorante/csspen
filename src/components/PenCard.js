import React from 'react'
import { Link } from 'wouter'

export default function PenCard ({pen, active}) {
  const { id, name, info } = pen

  return <Link className={`PenCard ${(id === active) ? 'active' : ''}`} key={id} to={`/${id}`}>
  <div className='PenCard__title'>{name}</div>
  <div className='PenCard__description'>{info}</div>
</Link>
}
