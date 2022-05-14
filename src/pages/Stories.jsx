import React, { useState, useEffect } from 'react'
import { useApiContext } from '../context/ApiContext'
import Loading from '../components/Loading'
import Info from '../components/stories/Info'
import Progress from '../components/stories/Progress'
import Html from '../components/Html'
import Style from '../components/Style'
import Nav from '../components/stories/Nav'

export default function Stories() {
  const { state, dispatch } = useApiContext()

  useEffect(() => {
    if (!state.loaded) return

    console.log(state.pen.step)
  }, [state.loaded])

  if (!state.loaded) return <Loading />

  return (
    <div className='[Stories] h-full'>
      <Nav pen={state.pen} dispatch={dispatch} />

      <header className='w-full p-2 fixed z-10 bg-gradient-to-b from-black/40'>
        <Progress steps={state.pen.steps} step={state.pen.step} />
        <Info pen={state.pen} />
      </header>

      <div
        style={{ backgroundColor: state.pen.colors.c3 }}
        className='w-full h-full flex items-center transition-all justify-center overflow-hidden'>
        <Html
          classes='grid place-items-center h-full transition-all-children relative'
          html={state.pen.html}
        />
        <Style css={state.pen.steps[state.pen.step].css} />
      </div>
    </div>
  )
}
