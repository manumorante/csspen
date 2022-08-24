import React, { useEffect } from 'react'
import { useApiContext } from '../context/ApiContext'
import Code from './pen/control/Code'
import Controls from './pen/control/Controls'
import StepInfo from './pen/control/StepInfo'

import Style from './pen/view/Style'
import PenView from './pen/view/PenView'

export default function PenMobile() {
  const { state, dispatch } = useApiContext()

  const getHTML = (state) => (state.loaded ? state.pen.html : '')
  const getCSS = (state) => (state.loaded ? state.pen.steps[state.step].css : '')

  useEffect(() => {
    document.documentElement.style.backgroundColor = state?.pen?.colors?.c3
  }, [state?.pen?.colors?.c3])

  return (
    <>
      <div className='fixed w-full h-screen'>
        <PenView html={getHTML(state)} />
        <Style css={getCSS(state)} />
      </div>

      <div className='fixed z-20 w-full p-4'>
        <Controls state={state} dispatch={dispatch} />
        <StepInfo state={state} dispatch={dispatch} />
      </div>

      <div className='w-full h-[90vh]'></div>

      <div className='Control relative z-10 w-screen min-h-screen py-11 px-6 bg-black/30 backdrop-blur-sm'>
        <Code state={state} dispatch={dispatch} />
      </div>
    </>
  )
}
