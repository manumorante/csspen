import React from 'react'
import { useAutoplay } from 'lib/useAutoplay'

export default function Progress({ state, dispatch }) {
  const stepTime = useAutoplay(state, dispatch)

  return (
    <div className='Progress fixed z-20 top-0 left-0 right-0 flex gap-1 p-1'>
      {state.pen.steps.map((_, step) => {
        const isCurrent = step === state.step
        const isDone = state.step > step
        const progress = isDone ? 100 : isCurrent ? stepTime : 0

        return (
          <div key={step} className='grow h-1 bg-white/30 opacity-60'>
            <div className='h-full bg-white' style={{ width: `${progress}%` }}></div>
          </div>
        )
      })}
    </div>
  )
}
