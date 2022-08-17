import React, { useEffect, useReducer } from 'react'
import { reducer, initialState } from '../../lib/reducer'
import { selectPen, checkPen } from '../../lib/pen'
import cx from 'classnames'
import Nav from './nav'
import Control from './control'
import View from './view'

export default function Pen({ pens, penID }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const pen = selectPen(pens, penID)
    if (!checkPen(pen)) return

    dispatch({ type: 'INIT_PENS', pens, pen })
  }, [pens, penID])

  return (
    <div
      className={cx(
        'Pen',
        'h-full grid sm:grid-rows-1 overflow-y-auto transition-all',
        'grid-rows-[160px_auto]',
        'sm:grid-cols-[200px_400px_auto]',
        {
          'sm:grid-cols-[0px_600px_auto]': state.menuClosed,
        }
      )}>
      <Nav state={state} dispatch={dispatch} />
      <Control state={state} dispatch={dispatch} />
      <View state={state} dispatch={dispatch} />
    </div>
  )
}
