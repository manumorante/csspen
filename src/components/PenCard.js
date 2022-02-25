import React from 'react'

export default function PenCard ({ pen, active = false }) {
  return <a href={`#${pen.id}`} className={`PenCard ${(pen.id === active) ? 'active' : ''}`}>
  <div className='PenCard__title'>{pen.name}</div>
  <div className='PenCard__description'>{pen.info}</div>
</a>
}
