import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import Styles from '../components/Styles'
import Html from '../components/Html'
import Loading from '../components/Loading'

export default function PenAlone() {
  const { slug } = useParams()
  const { state, dispatch } = useApiContext()

  useEffect(() => {
    if (state.loaded) dispatch({ type: 'SET_PEN', id: slug, last: true })
  }, [state.loaded])

  return (
    <Loading loading={!state.loaded}>
      <div
        className='w-full h-full overflow-hidden relative'
        style={{ background: state.pen.bg }}>
        <Html pen={state.pen} />
        <Styles pen={state.pen} step={state.step} />
      </div>
    </Loading>
  )
}
