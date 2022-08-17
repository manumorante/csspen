import React from 'react'
import Card from './Card'
import CardPH from './CardPH'

export default function List({ state, dispatch }) {
  if (!state?.loaded) return null

  return (
    <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
      {state.pens.map((pen) => (
        <Card dispatch={dispatch} key={pen.id} pen={pen} isActive={pen.id === state.pen.id} />
      ))}
      <CardPH />
      <CardPH />
    </div>
  )
}
