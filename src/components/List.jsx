import React from 'react'
import { usePens } from '../context/AppProvider'
import Card from './Card'

export default function List({ active }) {
  const { pens } = usePens()

  return (
    <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
      {pens &&
        pens.map((pen) => (
          <Card key={pen.id} pen={pen} isActive={pen.id === active} />
        ))}
    </div>
  )
}
