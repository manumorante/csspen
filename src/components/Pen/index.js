import React from 'react'
import { usePen } from '../../hooks/usePen'
import { usePens } from '../../hooks/usePens'
import Spinner from '../Spinner'
import Editor from '../Editor'
import PenList from '../PenList'

export default function Pen ({ params = 'heart' }) {
  const { id = 'twitter' } = params
  const { loadingPen, pen } = usePen(id)
  const { loadingPens, pens } = usePens()

    return (
    <div className='Pen'>
      {loadingPens
      ? <Spinner/>
      : <>
          <PenList pens={pens} active={id} />

          {loadingPen
          ? <Spinner/>
          : <Editor pen={pen} />
          }
        </>
      }
    </div>
  )
}
