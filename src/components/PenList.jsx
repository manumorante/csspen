import React, { useState, useEffect } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'
import { layout } from '../styles.js'
import PenCard from './PenCard'

export default function PenList({ active }) {
  const [pens, setPens] = useState(false)

  useEffect(() => {
    const GetPens = new GetPensUseCase()
    GetPens.execute().then((pens) => {
      setPens(pens)
    })
  }, [])

  return (
    <div className={`PenList ${layout.menu.items}`}>
      {pens && (
        <>
          {pens.map((pen) => {
            return (
              <PenCard key={pen.id} pen={pen} isActive={pen.id === active} />
            )
          })}
        </>
      )}
    </div>
  )
}
