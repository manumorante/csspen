import React from 'react'

export default function Html({ pen }) {
  return (
    <div
      className={`Editor__html ${pen.loading ? 'loading' : ''}`}
      dangerouslySetInnerHTML={{ __html: pen.html }}
    />
  )
}
