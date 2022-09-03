import React from 'react'
import cx from 'classnames'
import Code from '@/components/Code'

export default function PenCode({ state, dispatch }) {
  const HIDE = state.showCode === 0
  const MID = state.showCode === 1
  const FULL = state.showCode === 2

  return (
    <div
      className={cx(
        'Code',
        'fixed bottom-0 z-10',
        'w-full',
        'transition-[height] duration-500 ease-in-out',
        'overflow-y-auto bg-black/30 backdrop-blur-sm',
        {
          'h-0': HIDE,
          'h-1/2': MID,
          'h-full': FULL,
        }
      )}>
      <div
        className={cx('px-10 py-12 transition-all duration-500 ease-in-out', {
          'pt-[120px]': FULL,
        })}>
        <Code state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}
