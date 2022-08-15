import React from 'react'

export default function Info({ pen }) {
  return (
    <div className='flex items-center gap-2 ml-2 mt-3'>
      <div className='avatar flex items-center justify-center w-8 h-8 rounded-full border border-white'>
        M
      </div>
      <div className='name text-sm text-white'>{pen.name}</div>
    </div>
  )
}
