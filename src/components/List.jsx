import React, { useState, useEffect } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'
import Card from './Card'

export default function List({ active }) {
  const [pens, setPens] = useState(false)

  useEffect(() => {
    const GetPens = new GetPensUseCase()
    GetPens.execute().then((pens) => {
      setPens(pens)
    })
  }, [])

  return (
    <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto flex flex-col'>
      {pens &&
        pens.map((pen) => (
          <Card key={pen.id} pen={pen} isActive={pen.id === active} />
        ))}
    </div>
  )
}
