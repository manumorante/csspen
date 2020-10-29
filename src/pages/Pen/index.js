import React from 'react'
import './styles.css'
import { usePen } from '../../hooks/usePen'
import Spinner from '../../components/Spinner'
import Header from '../../components/Header'
import Editor from '../../components/Editor'

export default function Pen ({ params }) {
  const { id } = params
  const { loading, pen, totalSteps } = usePen(id)

    return (
    <div className='Page Pen'>
      {loading
      ? <Spinner/>
      : <>
          <Header/>
          <Editor pen={pen} />
        </>
      }
    </div>
  )
}
