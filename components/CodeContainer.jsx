import React from 'react'
import cx from 'classnames'

export default function CodeContainer({ children, view }) {
  return (
    <div
      className={cx(
        'CodeContainer',
        'fixed w-full bottom-0 z-10 bg-black/40',
        'transition-[height_padding] duration-500 ease-in-out',
        {
          'h-0': view === 0,
          'h-1/3': view === 1,
          'h-full pt-24 backdrop-blur-sm': view === 2,
        }
      )}>
      {children}
    </div>
  )
}
