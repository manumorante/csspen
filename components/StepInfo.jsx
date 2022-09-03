import React from 'react'
import cx from 'classnames'

export default function StepInfo({ state }) {
  const { name, stepInfo, showCode, color2 } = state
  if (name === '') return null

  const textStyle = { color: color2 }

  return (
    <div
      className={cx(
        'StepInfo',
        'pointer-events-none',
        'fixed z-20 left-10 right-10',
        'font-extralight',
        'transition-all duration-500 ease-in-out',
        {
          'top-48 text-2xl': showCode === 0,
          'top-6 text-xl': showCode !== 0,
        }
      )}
      style={textStyle}>
      <div className='font-semibold'>{name}</div>
      {stepInfo}
    </div>
  )
}
