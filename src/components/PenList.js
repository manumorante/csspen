import React from 'react'
import PenCard from './PenCard'

export default function PenList ({ pens, active = null }) {
  const handleClosePenList = () => {
    document.querySelector('body').classList.remove('show-pen-list')
  }

  return <div className='PenList'>
    <button className='Button PenList__close' onClick={handleClosePenList}>Close</button>

    {pens.map((pen) => {
      return <PenCard pen={pen} active={active} handleClick={handleClosePenList} />
    })}
  </div>
}
