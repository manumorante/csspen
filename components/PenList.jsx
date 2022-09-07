import React from 'react'
import cx from 'classnames'
import { useApiContext } from '../context/ApiContext'
import Card from './Card'

export default function PenList() {
  const { state, dispatch } = useApiContext()
  const { pens, pen: activePen } = state

  return (
    <div
      className={cx(
        'PenList relative z-10 flex overflow-x-auto snap-mandatory snap-x',
        'transition-transform duration-500 ease-in-out',
        {
          '-translate-y-full': state.showCode,
        }
      )}>
      {pens.map((pen, i) => (
        <Card dispatch={dispatch} key={pen.id || i} pen={pen} isActive={pen.id === activePen.id} />
      ))}
    </div>
  )
}
