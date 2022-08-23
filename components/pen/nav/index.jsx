import React from 'react'
import cx from 'classnames'
import List from './List'
import Button from '../../ui/Button'
import { XIcon } from '@heroicons/react/solid'

export default function Nav({ state, dispatch }) {
  return (
    <div
      className={cx(
        'Nav Menu',
        // Hidden in mobile
        'hidden',

        // Block in desktop
        'md:block',

        // Define relative because of the close button
        'md:relative'
      )}>
      {/* Close button */}
      {state?.loaded && (
        <div className='absolute z-30 top-6 right-6 sm:hidden'>
          <Button dispatch={dispatch} acc='CLOSE_MENU' label={<XIcon />} />
        </div>
      )}

      <List state={state} dispatch={dispatch} />
    </div>
  )
}
