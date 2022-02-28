import React from 'react'
import PenCard from './PenCard'

export default function PenList({pens, active}) {
  return <>
    {pens.map((pen) => {
      const isActive = pen.slug === active
      return <PenCard key={pen.id} pen={pen} isActive={isActive} />
    })}
  </>
}
