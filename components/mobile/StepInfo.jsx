import React from 'react'
import cx from 'classnames'
import { getPenVO } from '../../lib/pen'

export default function StepInfo({ state }) {
  const penVO = getPenVO(state)
  const styleStepInfo = state.loaded ? { color: penVO.color2 } : {}

  return (
    <div
      className={cx('StepInfo', 'pointer-events-none', 'fixed z-20 top-10 left-10 right-10', 'font-extralight', {
        'text-2xl': state.showCode === 0,
        'text-xl': !state.showCode === 0,
      })}
      style={styleStepInfo}>
      <div className='font-semibold'>{penVO.name}</div>
      {penVO.stepInfo}
    </div>
  )
}
