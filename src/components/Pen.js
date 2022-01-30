import React, { useState, useEffect } from 'react'
import { usePens } from '../hooks/usePens'
import Editor from './Editor'
import PenList from './PenList'

export default function Pen ({ params }) {
  const { id = 'twitter' } = params
  const { loadingPens, pens } = usePens()
  const [pen, setPen] = useState(false)

  useEffect(() => {
    function validatePen ({ id }) {
      if(!id) {
        return false
      }

      return true
    }

    // Search and return Pen from 'pens' state
    function createPen (paramID) {
      const findPen = pens.find(item => item.id === paramID)

      if(!findPen) {
        console.log('createPen - Pent not found')
        return false
      }

      const { id, name, info, html, bg, steps } = findPen

      if(!validatePen({ id, name, info, html, bg, steps })) {
        console.log('createPen - Invalid pen')
        return false
      }

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

  return (
    <div className='Pen'>
      { loadingPens
      ? <div className='Spinner'/>
      : <>
          <PenList pens={pens} active={id} />

          { pen
          ? <Editor pen={pen} />
          : <b>No pen</b>
          }
        </>
      }
    </div>
  )
}
