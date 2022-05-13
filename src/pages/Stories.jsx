import React, { useState, useEffect } from 'react'
import { useApiContext } from '../context/ApiContext'
import Loading from '../components/Loading'
import User from '../components/stories/User'
import Progress from '../components/stories/Progress'
import Html from '../components/Html'
import Style from '../components/Style'
import Nav from '../components/stories/Nav'

export default function Stories() {
  const { state, dispatch } = useApiContext()
  const [active, setActive] = useState(0)
  const [pen, setPen] = useState({
    html: '',
    css: '',
  })

  useEffect(() => {
    if (!state.loaded) return

    const newPen = state.pens[active]
    const stepObj = newPen.steps.at(-1)

    setPen({
      html: newPen.html,
      css: stepObj.css,
    })
  }, [state.loaded, active])

  useEffect(() => {
    const interval = setTimeout(() => {
      if (active < state.pens.length - 1) {
        setActive(active + 1)
      } else {
        setActive(0)
      }
    }, 2000)

    return () => clearTimeout(interval)
  }, [state.loaded, active])

  return (
    <Loading until={state.loaded}>
      <div className='[Stories] h-full'>
        <Nav dispatch={dispatch} />
        <header className='w-full p-2 fixed z-10 bg-gradient-to-b from-black/20'>
          <Progress steps={state.pen.steps} step={state.step} />
          <User />
        </header>

        <div className='relative h-full flex snap-x snap-mandatory overflow-x-auto'>
          {state.pens.map((pen, _) => (
            <div
              key={pen.id}
              style={{ backgroundColor: pen.colors.c3 }}
              className='snap-center shrink-0 w-full h-full flex items-center justify-center'>
              <Html html={pen.html} />
              <Style css={pen.steps.at(-1).css} />
            </div>
          ))}
        </div>
      </div>
    </Loading>
  )
}
