import React from 'react'
import Code from '../../components/Code'
import { usePen } from '../../hooks/usePen'

export default function Playground ({ params }) {
  const { id } = params
  const { loading, pen } = usePen(id)

  return (
    <div className='Page Playground'>
      {loading
      ? <div>loading pen</div>
      : <div>
          <h2 className='Page__title'>{pen.name}</h2>
          <h3 className='Page__title'>{pen.description}</h3>
        </div>
      }

      <Code css='.foo { display: block; }' />
    </div>
  )
}
