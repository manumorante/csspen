import React from 'react'
import { useApiContext } from '../context/ApiContext'
import cx from 'classnames'
import Code from './pen/control/Code'
import Controls from './pen/control/Controls'
import StepInfo from './pen/control/StepInfo'

import Style from './pen/view/Style'
import Html from './pen/view/Html'
import CardPH from './pen/nav/CardPH'

export default function PenMobile() {
  const { state, dispatch } = useApiContext()
  return (
    <>
      <div className='fixed z-0 w-full h-full overflow-hidden' style={{ background: state?.pen?.colors?.c3 }}>
        {state?.loaded ? (
          <>
            <Html
              html={state.pen.html}
              classes='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
            />
            <Style css={state.pen.steps[state.step].css} />
          </>
        ) : (
          <div className='absolute inset-0 flex justify-center items-center'>
            <CardPH />
          </div>
        )}
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
