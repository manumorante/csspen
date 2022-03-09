import React from 'react'

export default function Html({ pen }) {
  return (
    <div
      className={`Editor__html ${pen.loading ? 'loading' : ''}`}
      style={{ zoom: pen.zoom }}
      dangerouslySetInnerHTML={{ __html: pen.html }}
    />
  )
}
