import React from 'react'
import { usePen } from '../../hooks/usePen'
import { usePens } from '../../hooks/usePens'
import Spinner from '../../components/Spinner'
import Editor from '../../components/Editor'
import PenList from '../../components/PenList'

export default function Pen ({ params }) {
  const { id } = params
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
