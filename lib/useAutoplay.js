import { useEffect } from 'react'
export function useAutoplay(state, dispatch) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: state.lastStep ? 'STOP' : 'NEXT_STEP' })
    }, 2500)

    return () => clearTimeout(timeout)
  }, [state, dispatch])
}
