import React, { useEffect, useContext, createContext, useReducer } from 'react'
import { useRouter } from 'next/router'
import { usePens } from '../lib/usePens'
import { reducer, initialState } from '../lib/reducer'
import { selectPen, checkPen } from '../lib/pen'

const apiContext = createContext()

const ApiContext = ({ children }) => {
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

  return <apiContext.Provider value={{ state, dispatch }}>{children}</apiContext.Provider>
}

export const useApiContext = () => useContext(apiContext)
export default ApiContext
