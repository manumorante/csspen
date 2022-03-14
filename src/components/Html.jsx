import React from 'react'

export default function Html({ pen }) {
  return (
    <div
      className={`Editor__html flex items-center justify-center overflow-hidden opacity-100 transition-opacity ${pen.loading ? 'loading' : ''}`}
      style={{ zoom: pen.zoom }}
      dangerouslySetInnerHTML={{ __html: pen.html }}
    />
  )
}
