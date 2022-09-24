import React from 'react'
import CardPNG from './CardPNG'

export default function Pens({ active, pens, activeColor, callback }) {
  return (
    <div
      className='Pens h-24 flex overflow-x-auto snap-mandatory snap-x select-none'
      style={{ backgroundColor: activeColor }}>
      {pens.map((pen) => (
        <CardPNG key={pen.id} penID={pen.id} isActive={pen.id === active} color={pen.colors.c3} onClick={callback} />
      ))}
    </div>
  )
}
