import React from 'react'
import './styles.css'
import { usePen } from '../../hooks/usePen'
import Spinner from '../../components/Spinner'
import Editor from '../../components/Editor'

export default function Pen ({ params }) {
  const { id } = params
  const { loading, pen, totalSteps } = usePen(id)

    return (
    <div className='Page Pen'>
      {loading
      ? <Spinner/>
      : <Editor pen={pen} />
      }
    </div>
  )
}
