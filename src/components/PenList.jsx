import React, { useState, useEffect } from 'react'
import { GetPensUseCase } from '../js/GetPensUseCase'
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
    <div className='PenList flex-none hidden sm:flex sm:w-52 h-full flex-col overflow-scroll'>
      {pens && (
        <>
          <button
            className='Button sm:hidden'
            onClick={() => {
              dispatch({ type: 'HIDE_MENU' })
            }}>
            Close
          </button>

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
