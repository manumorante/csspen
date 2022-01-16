import React from 'react'
import { Link } from 'wouter';
import './styles.scss'

export default function PenList ({ pens, active = null }) {
  return <div className='PenList'>
    {pens.map(({ id, name, description }) => {
      return <Link className={`PenList__item ${(id === active) ? 'active' : ''}`} key={id} to={`/${id}`}>
        <div className='PenList__title'>{name}</div>
        <div className='PenList__description'>{description}</div>
      </Link>
    })}
  </div>
}
