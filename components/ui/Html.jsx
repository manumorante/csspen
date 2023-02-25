import React from 'react'

export default function Html({ html }) {
  return (
    <div
      className='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
