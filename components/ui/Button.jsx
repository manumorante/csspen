import React from 'react'
import cx from 'classnames'

export default function Button(props) {
  const { dispatch, acc, label } = props

  const handle = () => {
    if(!acc) return
    dispatch({ type: acc })
  }

  return (
    <button
      className={cx(
        'Button',
        'inline-flex flex-grow justify-center text-center',
        'child:w-6 child:h-6',
        'py-1 px-2 md:px-2',
        'text-sm font-mono',
        'cursor-pointer decoration-0',
        'rounded-xl outline-none',
        'transition-colors',

        // Default
        'text-neutral-400 bg-black/30',

        // Hover
        'sm:hover:bg-neutral-700/60',

        // Disabled
        'disabled:bg-neutral-800/70',

        // Active
        'active:bg-neutral-700/80 sm:active:bg-neutral-700/80'
      )}
      onClick={handle}>
      {label}
    </button>
  )
}
