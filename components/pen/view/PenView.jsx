import React from 'react'
import CardPH from '../nav/CardPH'
import Style from './Style'

export default function PenView({ html, css }) {
  if (html === '' || css === '') {
    return (
      <div className='PenView absolute inset-0 m-auto w-pen h-pen grid place-items-center'>
        <CardPH />
      </div>
    )
  }

  return (
    <>
      <div
        className='PenView absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Style css={css} />
    </>
  )
}
