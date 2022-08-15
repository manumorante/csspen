import React from 'react'
import cx from 'classnames'

export default function Layout({ children }) {
  return (
    <div
      className={cx(
        'Pen',
        'h-full grid sm:grid-rows-1 overflow-y-auto transition-all',
        'grid-rows-[160px_auto]',
        'sm:grid-cols-[200px_400px_auto]'
        // {
        //   'sm:grid-cols-[0px_600px_auto]': state.menuClosed,
        // }
      )}>
      {children}
    </div>
  )
}
