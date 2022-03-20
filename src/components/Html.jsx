import React from 'react'
import { KeyStyle as S } from '../js/Styles.js'

export default function Html({ pen }) {
  return <div {...S(['html'])} dangerouslySetInnerHTML={{ __html: pen.html }} />
}
