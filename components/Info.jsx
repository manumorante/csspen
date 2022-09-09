import React from 'react'
import cx from 'classnames'

export default function Info({ children, state }) {
  return (
    <div
      className={cx('Info fixed z-20 left-16 right-16 text-center transition-[top] duration-500 ease-in-out', {
        'top-32 text-2xl': state.codeHide,
        'top-10 text-xl': !state.codeHide,
      })}
      style={{ color: state.pen.colors.c2 }}>
      {children}
    </div>
  )
}
