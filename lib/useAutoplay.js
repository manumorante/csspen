import { useEffect } from 'react'
export function useAutoplay(state, dispatch) {
  useEffect(() => {
    if (!state.loaded) return

    const timeout = setTimeout(() => {
      dispatch({ type: state.lastStep ? 'STOP' : 'NEXT' })
    }, 2500)

    return () => clearTimeout(timeout)
  }, [state, dispatch])
}
