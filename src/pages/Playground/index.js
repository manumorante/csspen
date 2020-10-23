import React from 'react'
import Code from '../../components/Code'

export default function Playground () {
  return (
    <div className='Page Playground'>
      <h2 className='Page__title'>Playground</h2>

      <Code css='.foo { display: block; }' />
    </div>
  )
}
