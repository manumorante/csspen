import React, { useState, useEffect } from 'react'
import { usePens } from '../hooks/usePens'
import Editor from './Editor'
import PenCard from './PenCard'

export default function Pen ({ params }) {
  const { id = 'twitter' } = params
  const { loadingPens, pens } = usePens()
  const [ pen, setPen ] = useState(false)

  useEffect(() => {
    // Search and return Pen from 'pens' state
    function createPen (paramID) {
      const findPen = pens.find(item => item.id === paramID)

      if(!findPen) {
        console.log('createPen - Pent not found')
        return false
      }

      const { id, name, info, html, bg, steps } = findPen

      return { id, name, info, html, bg, steps }
    }

    if(!loadingPens){
      const newPen = createPen(id)

      if(newPen) {
        setPen(newPen)
      } else {
        console.log('createPen - Pen not found 2')
      }
    }
  }, [loadingPens, pens, id])

  const handleClosePenList = () => {
    document.querySelector('body').classList.remove('show-pen-list')
  }

  return (
    <div className='Pen'>
      { loadingPens
      ? <div className='Spinner' />
      : <div className='PenList'>
          <button className='Button PenList__close' onClick={handleClosePenList}>Close</button>

          {pens.map((pen) => {
            return <PenCard key={pen.id} pen={pen} active={id} handleClick={handleClosePenList} />
          })}
        </div>
      }

      { pen ? <Editor pen={pen} /> : <b>No pen</b> }
    </div>
  )
}
