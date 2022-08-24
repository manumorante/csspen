import React from 'react'
import CardPH from '../nav/CardPH'

export default function PenView({ html }) {
  if (html === '') {
    return (
      <div className='PenView absolute inset-0 m-auto w-pen h-pen grid place-items-center'>
        <CardPH />
      </div>
    )
  }

  return (
    <div
      className='PenView absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
