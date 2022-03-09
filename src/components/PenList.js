import React, { useState, useEffect } from 'react'
import { getPens } from '../js/getPens'
import PenCard from './PenCard'

export default function PenList({ active }) {
  const [pens, setPens] = useState(false)

  useEffect(() => {
    // Fetch Pens from DB
    getPens().then((pens) => {
      if (!pens || pens.length === 0) {
        console.error(`Error: PenList() getPens() pens:`, pens)
        return false
      }

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
