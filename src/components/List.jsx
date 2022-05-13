import React from 'react'
import { useApiContext } from '../context/ApiContext'
import Card from './Card'
import CardPH from './CardPH'
import Loading from './Loading'

export default function List({ active }) {
  const { state } = useApiContext()

  if (!state.loaded) return <Loading />

  return (
    <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
      {state.pens.map((pen) => (
        <Card key={pen.id} pen={pen} isActive={pen.id === active} />
      ))}
      <CardPH />
      <CardPH />
    </div>
  )
}
