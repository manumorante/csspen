import React from 'react'
import { Link } from 'wouter'
import Code from '../Code'
import './styles.css'

export default function pen (pen) {
  const { id, name, description, code } = pen
  let page1 = code[0]

  return (
    <div className='Pen'>
      <Link className='Pen__title' to={`/pen/${id}`}>{name}</Link>
      <div className='Pen__description'>{description}</div>
      <Code css={page1}/>
    </div>
  )
}
