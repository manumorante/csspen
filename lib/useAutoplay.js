import { useEffect, useState } from 'react'
const SPEED = 16
export function useAutoplay(state, dispatch) {
  const [stepTime, setStepTime] = useState(0)

  useEffect(() => {
    setStepTime(0)
  }, [state.pen])

  useEffect(() => {
    let interval
    if (stepTime >= 100) {
      if (state.lastStep) {
        dispatch({ type: 'STOP' })
      } else {
        dispatch({ type: 'NEXT_STEP' })
      }

      clearInterval(interval)
    }

    interval = setInterval(() => {
      setStepTime((stepTime) => stepTime + 1)
    }, SPEED)
    return () => clearInterval(interval)
  }, [stepTime, dispatch, state.lastStep])

  return stepTime
}
