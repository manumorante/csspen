import React from 'react'
import cx from 'classnames'
export default function Button({ children, onClick, className, secondary }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Button',
        'inline-flex items-center py-1 px-2 rounded-lg',
        'text-base ',

        'cursor-pointer',
        'transition-all duration-500 ease-in-out',
        {
          'bg-black/30 hover:bg-black text-white/80': !secondary,
          'bg-neutral-500/20 hover:bg-neutral-600 text-white/50': secondary,
        },
        className
      )}>
      {children}
    </div>
  )
}
