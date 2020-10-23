import React from 'react'
import Pen from '../Pen';
import './styles.css'

export default function ListOfPens ({ pens }) {
  return <div className='ListOfPens'>
    {
      pens.map(pen => <Pen
        key={pen.id}
        id={pen.id}
        name={pen.name}
        description={pen.description}
        code={pen.code}
        />)
    }
  </div>
}
