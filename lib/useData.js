import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { usePens } from './usePens'
import { reducer, initialState } from './reducer'
import { selectPen, checkPen } from './pen'

export function useData() {
  const router = useRouter()
  const { pens, isLoading } = usePens()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (isLoading) return

    const { penID } = router.query
    const pen = selectPen(pens, penID)
    if (!checkPen(pen)) return

    dispatch({ type: 'INIT_PENS', pens, pen })
  }, [isLoading, pens, router.query])

  return { state, dispatch }
}
