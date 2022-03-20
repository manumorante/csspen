import React from 'react'
import List from '../components/List'

export default function Pens() {
  return (
    <div className='[Pens] flex w-full'>
      <div className='relative w-1/2'>
        <List />
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <p>Selecciona un Pen</p>
      </div>
    </div>
  )
}
