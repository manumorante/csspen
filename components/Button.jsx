import React from 'react'
import cx from 'classnames'
export default function Button({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Button',
        'inline-flex items-center py-1 px-2 rounded-lg',
        'text-base text-white/80',
        'bg-black/30',
        'cursor-pointer',
        'transition-all duration-500 ease-in-out',
        className
      )}>
      {children}
    </div>
  )
}
