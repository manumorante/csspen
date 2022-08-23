import React from 'react'
import { useApiContext } from '../../../context/ApiContext'
import Card from './Card'
import CardPH from './CardPH'

export default function List() {
  const { state, dispatch } = useApiContext()
  const { loaded, pens, pen: activePen } = state
  return (
    <div className='Nav hidden md:block md:relative'>
      <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
        {loaded ? (
          <>
            {pens.map((pen) => (
              <Card dispatch={dispatch} key={pen.id} pen={pen} isActive={pen.id === activePen.id} />
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
    </div>
  )
}
