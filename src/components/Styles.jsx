import React from 'react'

export default function Styles({ pen }) {
  return (
    <style
      type='text/css'
      dangerouslySetInnerHTML={{ __html: pen.rawCode }}></style>
  )
}
