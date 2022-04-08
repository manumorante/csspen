import React from 'react'

export default function Html({ pen }) {
  return (
    <div
      className='grid place-items-center h-full transition-all-children'
      dangerouslySetInnerHTML={{ __html: pen.html }}
    />
  )
}
