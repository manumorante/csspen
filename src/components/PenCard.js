import React from 'react'

export default function PenCard({ pen, isActive = false }) {
  return (
    <a href={`#${pen.id}`} className={`PenCard ${isActive ? 'active' : ''}`}>
      <div className='PenCard__name'>{pen.name}</div>
      <div className='PenCard__info'>{pen.info}</div>
    </a>
  )
}
