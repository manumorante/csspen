import React from 'react'

export default function Story({ pen }) {
  const { name, html, steps } = pen

  return (
    <div className='[Story] w-full h-full'>
      <iframe className='w-full h-full' src='/alone/heart'></iframe>
    </div>
  )
}
