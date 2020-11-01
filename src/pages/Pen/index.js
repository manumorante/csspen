import React from 'react'
import { usePen } from '../../hooks/usePen'
import Spinner from '../../components/Spinner'
import Editor from '../../components/Editor'

export default function Pen ({ params }) {
  const { id } = params
  const { loading, pen } = usePen(id)

    return (
    <div className='Pen'>
      {loading
      ? <Spinner/>
      : <Editor pen={pen} />
      }
    </div>
  )
}
