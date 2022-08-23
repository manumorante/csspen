import React from 'react'
import cx from 'classnames'
import List from '../components/pen/nav/List'
import Control from '../components/pen/control'
import View from '../components/pen/view'

export default function PenMobile() {
  return (
    <div
      className={cx(
        'PenMobile',
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
