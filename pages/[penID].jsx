import React, { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { reducer, initialState } from '../lib/reducer'
import { selectPen, checkPen } from '../lib/pen'
import { usePens } from '../lib/usePens'

import Nav from '../components/pen/nav'
import Control from '../components/pen/control'
import View from '../components/pen/view'

export default function Index() {
  const router = useRouter()
  const { penID } = router.query
  const { pens, isLoading } = usePens()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (isLoading || !penID || !pens || pens.length === 0) return

    const pen = selectPen(pens, penID)
    if (!checkPen(pen)) return

    dispatch({ type: 'INIT_PENS', pens, pen })
  }, [isLoading, pens, penID])

  // Autoplay
  useEffect(() => {
    if (!state.loaded) return

    if (state.playing) {
      const timeout = setTimeout(() => {
        if (state.step >= state.pen.steps.length - 1) {
          dispatch({ type: 'STOP' })
        } else {
          dispatch({ type: 'NEXT' })
        }
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state?.loaded, state?.playing, state?.step, state?.pen?.steps?.length])

  return (
    <div
      className={cx(
        'Pen',
        'h-full grid sm:grid-rows-1 overflow-y-auto transition-all',
        'grid-rows-[160px_auto]',
        'sm:grid-cols-[200px_400px_auto]',
        {
          'sm:grid-cols-[0px_600px_auto]': state?.menuClosed,
        }
      )}>
      <Nav state={state} dispatch={dispatch} />
      <Control state={state} dispatch={dispatch} />
      <View state={state} dispatch={dispatch} />
    </div>
  )
}
