import React from 'react'
import cx from 'classnames'

export default function Text({ children, acc, className }) {
  return (
    <button
      className={cx(
        'Text',
        'inline-flex flex-grow justify-center text-center',
        'py-1 px-2 md:px-2',
        'text-xs font-mono uppercase',
        'cursor-pointer decoration-0',
        'rounded-xl',
        'outline-none',
        'transition-colors',

        // Default
        'text-neutral-400 bg-neutral-800',

        // Hover
        'sm:hover:bg-neutral-700/60',

        // Disabled
        'disabled:bg-neutral-800/70',

        // Active
        'active:bg-neutral-700/80 sm:active:bg-neutral-700/80',
        className
      )}
      onClick={acc}>
      {children}
    </button>
  )
}
