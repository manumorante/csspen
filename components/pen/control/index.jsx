import React from 'react'
import { useApiContext } from '../../../context/ApiContext'
import Code from './Code'
import Controls from './Controls'
import StepInfo from './StepInfo'

export default function Control() {
  const { state, dispatch } = useApiContext()
  return (
    <div className='Control p-6 sm:h-full overflow-y-auto bg-black/80'>
      <Controls state={state} dispatch={dispatch} />
      <StepInfo state={state} dispatch={dispatch} />
      <Code state={state} dispatch={dispatch} />
    </div>
  )
}
