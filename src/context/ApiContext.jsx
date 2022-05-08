import React, { useEffect, useContext, createContext, useReducer } from 'react'
import { actions, initialState, reducer } from '../js/reducer'
import { GetPensUseCase } from '../js/GetPensUseCase'

const apiContext = createContext({
  state: {},
  dispatch: () => {},
  actions: {},
})

const ApiContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Select the pen by id from pens context
  const selectPen = (pens, id) => {
    const pen = pens.find((p) => p.id === id)
    if (!pen || pen.length <= 0) return false
    return pen
  }

  // Get all pens and their steps from database
  // and set de current pen
  useEffect(() => {
    const GetPens = new GetPensUseCase()
    GetPens.execute().then((pens) => {
      const pen = selectPen(pens, 'heart')
      dispatch({
        type: 'INIT_PENS',
        pens: pens,
        pen: pen
      })
    })
  }, [])

  return (
    <apiContext.Provider
      value={{
        state,
        dispatch,
        actions,
      }}>
      {children}
    </apiContext.Provider>
  )
}

export const useApiContext = () => useContext(apiContext)
export default ApiContext
