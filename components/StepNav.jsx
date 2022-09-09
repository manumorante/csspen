import React from 'react'
import cx from 'classnames'

export default function StepNav({ children, onClick, className }) {
  return (
    <div
      className={cx(
        'StepNav absolute z-10 top-16',
        'flex items-center justify-center w-5/12 bottom-16',
        'active:bg-white/5',
        'transition-all duration-500 ease-in-out',
        className
      )}
      onClick={onClick}>
      {children}
    </div>
  )
}
