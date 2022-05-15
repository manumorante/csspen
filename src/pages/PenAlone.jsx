import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import Style from '../components/Style'
import Html from '../components/Html'
import Loading from '../components/Loading'

export default function PenAlone() {
  const { slug } = useParams()
  const { state } = useApiContext()
  const [pen, setPen] = useState(null)

  useEffect(() => {
    if (!state.loaded) return
    setPen(state.pens.find((p) => p.id === slug))
  }, [state.loaded, slug])

  if (state.loaded && pen) {
    return (
      <div
        className='w-full h-full overflow-hidden relative'
        style={{ background: pen.colors.c3 }}>
        <Html classes="w-pen h-pen absolute inset-0 m-auto" html={pen.html} />
        <Style css={pen.steps[pen.steps.length - 1].css} />
      </div>
    )
  } else {
    return <Loading />
  }
}
