import React from 'react'
import cx from 'classnames'
import {
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from '@heroicons/react/solid'

function Btn({ children, visible, top, right, bottom, center, middle, bounce, ac }) {
  return (
    <div
      onClick={ac}
      className={cx(
        'fixed z-40',
        'py-2 px-3 rounded-xl',
        'text-base text-white/80 uppercase',
        'bg-black/40',
        'transition-opacity duration-500 ease-in-out',
        {
          'pointer-events-none opacity-0': !visible,
          'top-4': top,
          'top-1/2 -translate-y-14': middle, // center vertically
          'bottom-10': bottom,
          'left-0 right-0 mx-auto w-12': center, // center horizontally
          'right-4': right,
          'right-16 -translate-x-2': !right && !center,
          'animate-bounce': bounce,
        }
      )}>
      {children}
    </div>
  )
}

export default function ShowCodeButtons({ dispatch, showCode }) {
  const HIDE = showCode === 0
  const MID = showCode === 1
  const FULL = showCode === 2

  return (
    <>
      <Btn visible={FULL} top right pulse ac={() => dispatch({ type: 'HIDE_CODE' })}>
        <XIcon className='w-6 h-6' />
      </Btn>

      <Btn visible={MID} middle right ac={() => dispatch({ type: 'HIDE_CODE' })}>
        <XIcon className='w-6 h-6' />
      </Btn>

      <Btn visible={HIDE} bottom center ac={() => dispatch({ type: 'SHOW_MID_CODE' })}>
        <ChevronUpIcon className='w-6 h-6' />
      </Btn>

      <Btn visible={FULL} top ac={() => dispatch({ type: 'SHOW_MID_CODE' })}>
        <ChevronDownIcon className='w-6 h-6' />
      </Btn>

      <Btn visible={MID} middle ac={() => dispatch({ type: 'SHOW_FULL_CODE' })}>
        <ChevronDoubleUpIcon className='w-6 h-6' />
      </Btn>
    </>
  )
}
