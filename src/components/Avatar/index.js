import React from 'react'
import './styles.css'

export default function Avatar ({ url = null}) {
  if (!url) return false;

  return (
    <div className='Avatar'>
      <img className='Avatar__img' src={url} />
    </div>
  )
}
