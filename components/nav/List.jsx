import React from 'react'
import cx from 'classnames'
import { useApiContext } from '../../context/ApiContext'
import Card from './Card'
import CardPH from './CardPH'

export default function PenList() {
  const { state, dispatch } = useApiContext()
  const { loaded, pens, pen: activePen } = state
  return (
    <div
      className={cx(
        'PenList relative z-10 flex overflow-x-auto snap-mandatory snap-x',
        'transition-transform duration-500 ease-in-out',
        {
          '-translate-y-full': state.showCode,
        }
      )}>
      {loaded ? (
        <>
          {pens.map((pen) => (
            <Card dispatch={dispatch} key={pen.id} pen={pen} isActive={pen.id === activePen.id} />
          ))}
        </>
      ) : (
        <>
          <CardPH />
          <CardPH />
          <CardPH />
        </>
      )}
    </div>
  )
}
