import { useEffect } from 'react'
export function useAutoplay(state, dispatch) {
  useEffect(() => {
    if (!state?.loaded || !state.playing) return

    const timeout = setTimeout(() => {
      const acc = state.step >= state.pen.steps.length - 1 ? 'STOP' : 'NEXT'
      dispatch({ type: acc })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [state, dispatch])

  return true
}
