import React from 'react'
import List from '../components/List'

export default function Pens() {
  return (
    <div className='[Pens] w-full sm:flex'>
      <div className='relative w-full h-full sm:w-1/2'>
        <List />
      </div>
      <div className='hidden sm:w-1/2 sm:flex justify-center items-center'>
        <p>Selecciona un Pen</p>
      </div>
    </div>
  )
}
