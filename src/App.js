import React, { useState, useEffect } from 'react'
import { usePens } from './hooks/usePens'
import PenCard from './components/PenCard'
import Editor from './components/Editor'
import createPen from './services/createPen'

const DEFAULT_PEN_ID = 'heart'

/**
 * PEN (PAGE)
 * - Este componente se llama por url con un id del Pen deseado
 * - Si no recibe un id, se define uno por defecto
 * - Carga todos los pens usando el curstom hook usePens
 * - Busca el pen con el id recibido en la lista de pens
 */
export default function App () {
  const currentHash = () => window.location.hash.replace('#', '') || DEFAULT_PEN_ID
  const [penID, setPenID] = useState(currentHash())
  const {loadingPens, pens} = usePens()
  const [pen, setPen] = useState(false)

  useEffect(() => {
    // Subscribe on hash changes
    const handlerHashChange = () => setPenID(currentHash())
    window.addEventListener('hashchange', handlerHashChange)
    
    // Close pen list menu when pen is selected
    handleClosePenList()

    return () => window.removeEventListener('hashchange', handlerHashChange)
  }, [penID])

  useEffect(() => {
    if(!loadingPens && pens){
      const newPen = createPen(penID, pens)

      if(!newPen) {
        console.log('useEffect [loadingPens, pens, id] - Pen not found')
        return false
      }

      setPen(newPen)
    }
  }, [loadingPens, pens, penID])

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
            return <PenCard key={item.id} pen={item} active={penID} />
          })}
        </div>
      }

      { pen ? <Editor pen={pen} /> : <b>Pen not found</b> }
    </div>
  )
}
