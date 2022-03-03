import React from 'react'

export default function PenCard({ pen, isActive = false }) {
  return (
    <a href={`#${pen.slug}`} className={`PenCard ${isActive ? 'active' : ''}`}>
      <div className='PenCard__title'>{pen.name}</div>
      <div className='PenCard__description'>{pen.info}</div>
    </a>
  )
}
