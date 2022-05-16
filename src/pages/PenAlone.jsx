import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApiContext } from '../context/ApiContext'
import Style from '../components/Style'
import Html from '../components/Html'
import Loading from '../components/Loading'

export default function PenAlone() {
  let { slug, step = 1 } = useParams()
  const { state } = useApiContext()
  const [data, setData] = useState(false)

  // Return 1 is less than 1 or NaN
  // Return max if n is greater than max
  function validStep(n, max) {
    return (step = isNaN(n) || n <= 0 ? 1 : n > max ? max : n)
  }

  useEffect(() => {
    if (!state.loaded) return

    const pen = state.pens.find((p) => p.id === slug)
    if (!pen) return

    step = validStep(step, pen.steps.length) - 1

    setData({
      html: pen.html,
      css: pen.steps[step].css,
      bg: pen.steps[step].bg,
    })
  }, [state.loaded, slug, step])

  if (state.loaded && data) {
    return (
      <div
        className='w-full h-full overflow-hidden relative'
        style={{ background: data.bg }}>
        <Html classes='w-pen h-pen absolute inset-0 m-auto' html={data.html} />
        <Style css={data.css} />
      </div>
    )
  } else {
    return <Loading />
  }
}
