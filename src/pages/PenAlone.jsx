import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import Style from '../components/Style'
import Html from '../components/Html'
import Loading from '../components/Loading'

export default function PenAlone() {
  const { slug } = useParams()
  const { state, dispatch } = useApiContext()

  useEffect(() => {
    if (state.loaded) dispatch({ type: 'SET_PEN', id: slug, last: true })
  }, [state.loaded])

  if (!state.loaded) return <Loading />

  return (
    <div
      className='w-full h-full overflow-hidden relative'
      style={{ background: state.pen.colors.c3 }}>
      <Html pen={state.pen} />
      <Style css={pen.steps[step].css} />
    </div>
  )
}
