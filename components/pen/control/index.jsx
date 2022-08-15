import React from 'react'
import Code from './Code'
import Controls from './Controls'
import StepInfo from './StepInfo'

export default function Control({ state, dispatch }) {
  if (!state?.loaded) return null

  return (
    <div className='p-6 sm:h-full overflow-y-auto bg-neutral-900'>
      <Controls state={state} dispatch={dispatch} />
      <StepInfo pen={state.pen} step={state.step} dispatch={dispatch} />
      <Code css={state.pen.steps[state.step].css} dispatch={dispatch} />
    </div>
  )
}
