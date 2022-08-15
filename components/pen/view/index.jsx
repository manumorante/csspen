import React from 'react'

import Progress from './Progress'
import Style from './Style'
import Html from './Html'

export default function View({ state, dispatch }) {
  if (!state?.loaded) return null

  return (
    <div
      className='overflow-hidden sm:h-full relative'
      style={{ background: state.pen.colors.c3 }}>
      {/* <div className='[guide] absolute z-20 inset-0 m-auto w-pen h-pen border border-dashed rounded-sm border-red-400/50'></div> */}
      <Html
        html={state.pen.html}
        classes='absolute inset-0 m-auto w-pen h-pen grid place-items-center transition-all-children'
      />
      <Progress pen={state.pen} step={state.step} />
      <Style css={state.pen.steps[state.step].css} />
    </div>
  )
}
