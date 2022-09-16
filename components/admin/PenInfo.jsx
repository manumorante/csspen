import React from 'react'

export default function PenInfo({ name, info }) {
  return (
    <div className='w-auto grow'>
      <span className='text-lg font-bold'>{name}</span>
      <div className='font-light mb-3'>
        {info ? (
          info
        ) : (
          <span className='text-neutral-100 bg-red-600 font-medium py-0.5 px-1 rounded-md'>
            El Pen no tiene descripción
          </span>
        )}
      </div>
    </div>
  )
}
