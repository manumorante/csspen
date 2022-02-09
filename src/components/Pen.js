import React, { useState, useEffect } from 'react'
import { usePens } from '../hooks/usePens'
import PenCard from './PenCard'
import Editor from './Editor'

/**
 * PEN (PAGE)
 * - Este componente se llama por url con un id del Pen deseado
 * - Si no recibe un id, se define uno por defecto
 * - Carga todos los pens usando el curstom hook usePens
 * - Busca el pen con el id recibido en la lista de pens
 */
export default function Pen ({ params }) {
  const { id = 'twitter' } = params
  const { loadingPens, pens } = usePens()
  const [ pen, setPen ] = useState(false)

  // Close pen list menu when pen is selected
  useEffect(() => {
    if(pen) {
      handleClosePenList()
    }
  }, [pen])

  useEffect(() => {
    // Search and return Pen from 'pens' state
    function createPen (newID) {
      const newPen = pens.find(item => item.id === newID)

      if(!newPen) {
        console.log('createPen() - Pent not found')
        return false
      }

      const { id, name, info, html, bg, steps } = newPen

      return { id, name, info, html, bg, steps }
    }

    if(!loadingPens && pens){
      const newPen = createPen(id)

      if(!newPen) {
        console.log('useEffect [loadingPens, pens, id] - Pen not found')
        return false
      }

      setPen(newPen)
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

          {pens.map((item) => {
            return <PenCard key={item.id} pen={item} active={id} />
          })}
        </div>
      }

      { pen ? <Editor pen={pen} /> : <b>Pen not found</b> }
    </div>
  )
}
