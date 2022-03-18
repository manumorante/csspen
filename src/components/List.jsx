import React, { useState, useEffect } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'
import { KeyStyle as S } from '../js/Styles.js'
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
    <div {...S(['list', 'items'])}>
      {pens &&
        pens.map((pen) => (
          <Card key={pen.id} pen={pen} isActive={pen.id === active} />
        ))}
    </div>
  )
}
