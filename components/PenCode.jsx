import React from 'react'
import cx from 'classnames'
import Code from '@/Code'
import { ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid'

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

function Button({ children, ac, className }) {
  return (
    <div
      onClick={ac}
      className={cx(
        'Button',
        'inline-flex py-2 px-3 rounded-xl',
        'text-base text-white/80',
        'bg-black/40',
        'transition-opacity duration-500 ease-in-out',
        className
      )}>
      {children}
    </div>
  )
}

export default function PenCode({ state, dispatch }) {
  const HIDE = state.showCode === 0
  const MID = state.showCode === 1
  const FULL = state.showCode === 2

  return (
    <div
      className={cx(
        'PenCode',
        'fixed w-full bottom-0 z-10',
        'bg-black/30',
        {
          'h-0': HIDE,
          'h-1/2': MID,
          'h-full pt-32 backdrop-blur-sm': FULL,
        },
        'transition-[height] duration-500 ease-in-out'
      )}>
      <div
        className={cx('absolute z-10 left-3 right-3', {
          'top-3': FULL,
          'bottom-full mb-3': !FULL,
        })}>
        <div className='flex justify-between'>
          {HIDE && (
            <Button ac={() => dispatch({ type: 'SHOW_MID_CODE' })}>
              <ChevronUpIcon className='w-6 h-6' /> <span>Ver código CSS</span>
            </Button>
          )}

          {MID && (
            <>
              <Button ac={() => dispatch({ type: 'SHOW_FULL_CODE' })}>
                <ChevronDoubleUpIcon className='w-6 h-6' /> <span>Ampliar código</span>
              </Button>

              <Button ac={() => dispatch({ type: 'HIDE_CODE' })}>
                <XIcon className='w-6 h-6' /> <span>Cerrar</span>
              </Button>
            </>
          )}

          {FULL && (
            <>
              <span></span>
              <Button ac={() => dispatch({ type: 'HIDE_CODE' })}>
                <XIcon className='w-6 h-6' />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={cx('w-full h-full overflow-y-auto')}>
        <Code state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}
