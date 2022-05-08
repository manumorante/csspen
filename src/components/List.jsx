import React from 'react'
import { useApiContext } from '../context/ApiContext'
import Card from './Card'

export default function List({ active }) {
  const { state } = useApiContext()

  if (!state.pens || Object.keys(state.pens).length === 0)
    return <div>Loading ...</div>

  return (
    <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
      {state.pens.map((pen) => (
        <Card key={pen.id} pen={pen} isActive={pen.id === active} />
      ))}
    </div>
  )
}
