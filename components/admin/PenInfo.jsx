import React from 'react'
import Editable from './Editable'

export default function PenInfo({ penID, name, info }) {
  return (
    <div className='w-auto grow'>
      <span className='text-lg font-bold'>{name}</span>
      <Editable field='info' value={info} penID={penID} contentClassName='font-light mb-3' />
    </div>
  )
}
