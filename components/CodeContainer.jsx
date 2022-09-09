import React from 'react'
import cx from 'classnames'

export default function CodeContainer({ children, state }) {
  return (
    <div
      className={cx(
        'CodeContainer',
        'fixed w-full bottom-0 z-10 bg-black/40',
        'transition-[height_padding] duration-500 ease-in-out',
        {
          'h-0': state.codeHide,
          'h-1/3': state.codeMid,
          'h-full pt-24 backdrop-blur-sm': state.codeFull,
        }
      )}>
      {children}
    </div>
  )
}
