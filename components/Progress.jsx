import React, { useEffect, useState } from 'react'

export default function Progress({ state, dispatch }) {
  const SPEED = 16
  const [stepTime, setStepTime] = useState(0)

  // Reset time when Pen or Step changes
  useEffect(() => {
    if (!state.playing) return
    setStepTime(0)
  }, [state.pen.id, state.playing, state.step])

  useEffect(() => {
    if (!state.playing) return

    const stepInterval = setInterval(() => {
      // When step is finished, stop playing or next step
      if (stepTime >= 100) {
        if (state.lastStep) {
          dispatch({ type: 'STOP' })
        } else {
          setStepTime(0)
          dispatch({ type: 'NEXT_STEP' })
        }

        return
      }

      setStepTime((stepTime) => stepTime + 1)
    }, SPEED)

    return () => clearInterval(stepInterval)
  }, [stepTime, dispatch, state.lastStep, state.playing])

  return (
    <div className='Progress flex gap-1'>
      {state.pen.steps.map((_, step) => {
        const isCurrent = step === state.step
        const isDone = state.step > step
        const progress = isDone ? 100 : isCurrent ? stepTime : 0

        return (
          <div className='Step h-1 grow bg-white/30' key={step}>
            <div className='h-1 bg-white' style={{ width: `${progress}%` }}></div>
          </div>
        )
      })}
    </div>
  )
}
