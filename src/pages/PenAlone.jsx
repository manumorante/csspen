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

  return (
    <Loading until={state.loaded}>
      <div
        className='w-full h-full overflow-hidden relative'
        style={{ background: state.pen.bg }}>
        <Html pen={state.pen} />
        <Style css={pen.pen_steps[step].code} />
      </div>
    </Loading>
  )
}
