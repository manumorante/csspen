import React from 'react'
import cx from 'classnames'
export default function Button({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Button',
        'inline-flex py-2 px-3 rounded-xl',
        'text-base text-white/80',
        'bg-black/40',
        'cursor-pointer',
        'transition-opacity duration-500 ease-in-out',
        className
      )}>
      {children}
    </div>
  )
}
