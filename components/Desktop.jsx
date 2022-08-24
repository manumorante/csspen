import React from 'react'
import cx from 'classnames'
import List from './pen/nav/List'
import Control from './pen/control'
import View from './pen/view'

export default function PenDesktop() {
  return (
    <div
      className={cx(
        'PenDesktop',
        'h-full grid sm:grid-rows-1 overflow-y-auto transition-all',
        'grid-rows-[160px_auto]',
        'sm:grid-cols-[200px_400px_auto]'
      )}>
      <List />
      <Control />
      <View />
    </div>
  )
}
