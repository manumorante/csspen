import React from 'react'
import Card from './Card'

export default function Pens({ active, pens, callback }) {
  return (
    <div className='Pens h-24 flex overflow-x-auto snap-mandatory snap-x select-none'>
      {pens.map((pen) => (
        <Card key={pen.id} pen={pen} isActive={pen.id === active} onClick={callback} />
      ))}
    </div>
  )
}
