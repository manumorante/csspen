import React from 'react'
import cx from 'classnames'
import { ArrowRightIcon } from '@heroicons/react/solid'

export default function NextPenButton({ visible, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Next',
        'fixed z-40 top-16 right-0',
        'pl-8 pr-1 py-2 rounded-l-md ',
        'transition-transform duration-500 ease-in-out',
        'bg-white/80 text-neutral-800',
        {
          'translate-x-0 ': visible,
          'translate-x-full': !visible,
        }
      )}>
      <div className='flex gap-1 items-center animate-bounce-r'>
        <span>Siguiente</span>
        <ArrowRightIcon className='w-5 h-5' />
      </div>
    </div>
  )
}
