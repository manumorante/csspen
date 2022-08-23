import React, { useEffect } from 'react'
import cx from 'classnames'
import When from '../../ui/When'
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  PlayIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  StopIcon,
} from '@heroicons/react/solid'
import Button from '../../ui/Button'

export default function Controls({ state, dispatch }) {
  const hasNextStep = state.step < state.pen?.steps?.length - 1
  const hasPrevStep = state.step > 0

  // Keyboard
  useEffect(() => {
    if (state.writing) return

    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        // Right arrow -> next step
        case 39:
          dispatch({ type: 'NEXT', stop: true })
          break

        // Left arrow -> previous step
        case 37:
          dispatch({ type: 'PREV', stop: true })
          break

        // Space -> play/pause
        case 32:
          dispatch({ type: 'PLAY_STOP' })
          break

        // Ctrl + S -> save
        case 83:
          e.ctrlKey && dispatch({ type: 'UPDATE_STEP' })
          break

        default:
          break
      }
    }

    // Bind and unbind keyboard events
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, state.writing])

  return (
    <div className='Controls sticky top-0 rounded-2xl flex flex-col gap-3'>
      <div
        className={cx('flex transition-opacity', {
          'opacity-40 pointer-events-none': !state?.loaded,
        })}>
        <When is={hasPrevStep}>
          <Button dispatch={dispatch} acc='PREV' label={<ChevronLeftIcon />} />
        </When>

        <When is={!hasPrevStep}>
          <Button dispatch={dispatch} acc='PREV_PEN' label={<ChevronDoubleLeftIcon />} />
        </When>

        <When is={state.playing}>
          <Button dispatch={dispatch} acc='STOP' label={<StopIcon />} />
        </When>

        <When is={!state.playing}>
          <Button dispatch={dispatch} acc='PLAY' label={<PlayIcon />} />
        </When>

        <When is={hasNextStep}>
          <Button dispatch={dispatch} acc='NEXT' label={<ChevronRightIcon />} />
        </When>

        <When is={!hasNextStep}>
          <Button dispatch={dispatch} acc='NEXT_PEN' label={<ChevronDoubleRightIcon />} />
        </When>
      </div>
    </div>
  )
}
