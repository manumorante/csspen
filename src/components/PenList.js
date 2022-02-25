import React from 'react'
import PenCard from './PenCard'

export default function PenList({pens}) {
  return <>
    {pens.map((pen) => <PenCard key={pen.id} pen={pen} />)}
  </>
}
