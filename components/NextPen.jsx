import React from 'react'
import cx from 'classnames'
import { ArrowRightIcon } from '@heroicons/react/solid'

export default function NextPenButton({ visible, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Next',
        'fixed z-40 top-0 right-0',
        'pl-4 pr-2 py-2 rounded-bl-md ',
        'transition-opacity duration-500 ease-in-out',
        'bg-white/80 text-neutral-800',
        'shadow-md',
        {
          'opacity-100': visible,
          'opacity-0 pointer-events-none': !visible,
        }
      )}>
      <div className='flex gap-1 items-center animate-bounce-r'>
        <ArrowRightIcon className='w-6 h-6' />
      </div>
    </div>
  )
}
