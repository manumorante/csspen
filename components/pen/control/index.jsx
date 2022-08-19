import React from 'react'
import Code from './Code'
import Controls from './Controls'
import StepInfo from './StepInfo'

export default function Control({ state, dispatch }) {
  return (
    <div className='Control p-6 sm:h-full overflow-y-auto'>
      <Controls state={state} dispatch={dispatch} />
      <StepInfo state={state} dispatch={dispatch} />
      <Code state={state} dispatch={dispatch} />
    </div>
  )
}
