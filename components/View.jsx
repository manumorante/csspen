import React from 'react'
import cx from 'classnames'

export default function View({ children, codeView }) {
  return (
    <div
      className={cx(
        'PenView fixed z-0 right-0 left-0',
        'transition-[top_bottom] duration-500 ease-in-out',
        'select-none',
        {
          'top-0 bottom-0': codeView === 2,
          'top-0 bottom-1/3': codeView === 1,
          'top-20 bottom-20': codeView === 0,
        }
      )}>
      {children}
    </div>
  )
}
