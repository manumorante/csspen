import React from 'react'
import cx from 'classnames'

export default function Info({ children, codeView, color }) {
  return (
    <div
      className={cx('Info fixed z-20 left-16 right-16 text-center transition-[top] duration-500 ease-in-out', {
        'top-32 text-2xl': codeView === 0,
        'top-10 text-xl': codeView > 0,
      })}
      style={{ color: color }}>
      {children}
    </div>
  )
}
