import React from 'react'
import Header from '../../components/Header'
import PenList from '../../components/PenList'
import Spinner from '../../components/Spinner'
import { usePens } from '../../hooks/usePens'

export default function Home () {
  const { loading, pens } = usePens()

  return (
    <div className='Page Home'>
      {loading
        ? <Spinner/>
        : <>
            <Header />
            <PenList pens={pens} />
          </>
      }
    </div>
  )
}
