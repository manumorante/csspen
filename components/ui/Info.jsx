import React from 'react'
import cx from 'clsx'

export default function Info({ children, hide, textcolor }) {
  return (
    <div
      className={cx('Info absolute z-20 left-16 right-16 text-center transition-[top] duration-500 ease-in-out', {
        'top-10 text-2xl': hide,
        'top-8 text-xl': !hide,
      })}
      style={{ color: textcolor }}>
      {children}
    </div>
  )
}
