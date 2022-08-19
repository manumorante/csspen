import React from 'react'
import Card from './Card'
import CardPH from './CardPH'

export default function List({ state, dispatch }) {
  return (
    <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
      {state?.loaded ? (
        <>
          {state.pens.map((pen) => (
            <Card
              dispatch={dispatch}
              key={pen.id}
              pen={pen}
              isActive={pen.id === state.pen.id}
            />
          ))}
        </>
      ) : (
        <>
          <CardPH />
          <CardPH />
          <CardPH />
        </>
      )}
    </div>
  )
}
