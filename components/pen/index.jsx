import React, { useEffect, useReducer } from 'react'
import { reducer, initialState } from '../../lib/reducer'
import { selectPen, checkPen } from '../../lib/pen'
import Nav from './nav'
import Control from './control'
import View from './view'

export default function Pen({ pens, penID }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!penID || !pens || pens.length === 0) return

    const pen = selectPen(pens, penID)
    if (!checkPen(pen)) return

    // dispatch({ type: 'INIT_PENS', pens, pen })
  }, [pens, penID])

  return (
    <>
      <Nav state={state} dispatch={dispatch} />
      <Control state={state} dispatch={dispatch} />
      <View state={state} dispatch={dispatch} />
    </>
  )
}
