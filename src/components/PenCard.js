import React from 'react'
import { Link } from 'wouter'

export default function PenCard ({pen, active, handleClick}) {
  const { id, name, info } = pen

  return <Link className={`PenCard ${(id === active) ? 'active' : ''}`} key={id} to={`/${id}`} onClick={handleClick}>
  <div className='PenCard__title'>{name}</div>
  <div className='PenCard__description'>{info}</div>
</Link>
}
