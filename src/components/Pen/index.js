import React from 'react'
import Code from '../Code'
import './styles.css'

export default function pen (pen) {
  const { name, description, code } = pen
  let page1 = code[0]

  return (
    <div className='Pen'>
      <div className='Pen__title'>{name}</div>
      <div className='Pen__description'>{description}</div>
      <Code css={page1}/>
    </div>
  )
}
