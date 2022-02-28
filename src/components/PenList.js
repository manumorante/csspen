import React, {useState, useEffect} from 'react'
import {getPens} from '../js/getPens'
import PenCard from './PenCard'

export default function PenList({active}) {
  const [pens, setPens] = useState(false)

  // Fetch Pens from DB
  useEffect(() => {
    getPens().then(pens => {
      if(!pens) {
        console.error(`Error: getPens response pens(${pens})`)
        return false
      }

      setPens(pens)
    })

  }, [])

  return <>
    {
    !pens
    ? <div className='Spinner' />
    : pens.map((pen) => {
      const isActive = pen.slug === active
      return <PenCard key={pen.id} pen={pen} isActive={isActive} />
      })
    }
  </>
}
