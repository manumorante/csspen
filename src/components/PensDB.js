import React from 'react'
import usePens from '../hooks/usePens'
import PenDB from './PenDB'

export default function PensDB () {
  const [pens] = usePens()

  if(!pens.length) return <div>Loading...</div>

  return (
    <div className='PenList'>
      {pens.map((pen) => (
        <PenDB key={pen.id} pen={pen} />
      ))}
    </div>
    )
}
