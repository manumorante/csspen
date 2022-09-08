import React from 'react'
import Card from './Card'

export default function PenList({ active, pens, handleCardClick }) {
  return (
    <div className='PenList flex overflow-x-auto snap-mandatory snap-x'>
      {pens.map((pen) => (
        <Card key={pen.id} pen={pen} isActive={pen.id === active} onClick={handleCardClick} />
      ))}
    </div>
  )
}
