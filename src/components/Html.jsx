import React from 'react'

export default function Html({ pen }) {
  return (
    <div
      className={`HTML flex h-full items-center justify-center w-full overflow-hidden transition-opacity ${pen.loading ? 'loading' : ''}`}
      dangerouslySetInnerHTML={{ __html: pen.html }}
    />
  )
}
