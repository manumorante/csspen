import React from 'react'
import { Link } from 'wouter';
import Button from './Button';

export default function PenList ({ pens, active = null }) {
  const handleClick = () => {
    // TODO: use State, Context, ...
    document.querySelector('body').classList.remove('show-pen-list')
  }
  return <div className='PenList'>
    <Button label='Close' className='PenList__close' action={handleClick} />

    {pens.map(({ id, name, info }) => {
      return <Link className={`PenList__item ${(id === active) ? 'active' : ''}`} onClick={handleClick} key={id} to={`/${id}`}>
        <div className='PenList__title'>{name}</div>
        <div className='PenList__description'>{info}</div>
      </Link>
    })}
  </div>
}
