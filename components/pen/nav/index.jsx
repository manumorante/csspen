import React from 'react'
import cx from 'classnames'
import List from './List'
import { Close } from '../../ui/buttons'

export default function Nav({ state, dispatch }) {
  if (!state?.loaded) return null

  return (
    <div
      className={cx(
        'Menu',
        'bg-neutral-900',
        // Hidden in mobile
        'hidden',

        // Block in desktop
        'md:block',

        // Define relative because of the close button
        'md:relative'
      )}>
      <div className='absolute z-30 top-6 right-6 sm:hidden'>
        <Close acc={() => dispatch({ type: 'CLOSE_MENU' })} />
      </div>

      <List state={state} />
    </div>
  )
}
