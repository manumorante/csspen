import React from 'react'
import cx from 'classnames'

export default function Step({ step, active }) {
  return (
    <div
      className={cx(
        'w-8 h-8',
        'flex justify-center items-center',
        'rounded-full',
        'text-md',
        {
          'text-neutral-700 bg-neutral-200/50': active,
          'scale-105': active,
          'text-neutral-200 bg-neutral-700/50': !active,
        },
        'transition-colors'
      )}>
      <div>{step + 1}</div>
    </div>
  )
}
