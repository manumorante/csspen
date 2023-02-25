import React from 'react'
import CardPNG from './CardPNG'

export default function Pens({ active, pens, activeBgcolor, callback }) {
  // Filter out pens that are not visible
  pens = pens.filter((pen) => pen.visible)

  return (
    <div
      className='Pens h-24 flex overflow-x-auto snap-mandatory snap-x select-none'
      style={{ backgroundColor: activeBgcolor }}>
      {pens.map((pen) => (
        <CardPNG key={pen.id} penID={pen.id} isActive={pen.id === active} onClick={callback} />
      ))}
    </div>
  )
}
