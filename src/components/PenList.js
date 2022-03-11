import React, { useState, useEffect } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'
import PenCard from './PenCard'

export default function PenList({ active }) {
  const [pens, setPens] = useState(false)

  useEffect(() => {
    const GetPens = new GetPensUseCase()
    GetPens.execute()
      .then((pens) => {
        setPens(pens)
      })
  }, [])

  return (
    <>
      {!pens ? (
        <div className='Spinner' />
      ) : (
        pens.map((pen) => {
          const isActive = pen.id === active
          return <PenCard key={pen.id} pen={pen} isActive={isActive} />
        })
      )}
    </>
  )
}
