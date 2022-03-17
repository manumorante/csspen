import React from 'react'
import { layout } from '../styles.js'

export default function Html({ pen }) {
  return (
    <div
      className={`HTML ${layout.stage.html} `}
      dangerouslySetInnerHTML={{ __html: pen.html }}
    />
  )
}
