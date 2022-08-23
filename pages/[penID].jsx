import React from 'react'
import cx from 'classnames'
import { useData } from '../lib/useData'
import { useAutoplay } from '../lib/useAutoplay'

import Nav from '../components/pen/nav'
import Control from '../components/pen/control'
import View from '../components/pen/view'

export default function Index() {
  const { state, dispatch } = useData()
  useAutoplay(state, dispatch)

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
