import React from 'react'
import cx from 'classnames'
import { ArrowLeftIcon } from '@heroicons/react/solid'

export default function PrevPenButton({ visible, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Next',
        'fixed z-40 top-8 left-0',
        'pl-3 pr-4 py-2 rounded-r-md ',
        'transition-transform duration-500 ease-in-out',
        'bg-white/80 text-neutral-800',
        {
          'translate-x-0 ': visible,
          '-translate-x-full': !visible,
        }
      )}>
      <div className='flex gap-1 items-center animate-bounce-r'>
        <ArrowLeftIcon className='w-5 h-5' />
      </div>
    </div>
  )
}
