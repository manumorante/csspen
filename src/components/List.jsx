import React, { useState, useEffect } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'
import { layout } from '../styles.js'
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
    <div className={`List ${layout.list.items}`}>
      {pens && (
        <>
          {pens.map((pen) => {
            return <Card key={pen.id} pen={pen} isActive={pen.id === active} />
          })}
        </>
      )}
    </div>
  )
}
