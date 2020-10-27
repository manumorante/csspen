import React from 'react'
import Code from '../../components/Code'

export default function Playground ({ params }) {
  const { id } = params

  return (
    <div className='Page Playground'>
      <h2 className='Page__title'>ID: {id}</h2>

      <Code css='.foo { display: block; }' />
    </div>
  )
}
