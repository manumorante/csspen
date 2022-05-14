import React, { useEffect } from 'react'
import Btn from '../components/Btn'
import {
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/solid'

export default function Controls({ state, dispatch }) {
  const hasNextStep = () => {
    return state.step < state.pen.steps.length - 1
  }

  const hasPrevStep = () => {
    return state.step > 0
  }

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
    <div className='Controls sticky top-0 rounded-2xl flex'>
      <Btn acc={() => dispatch({ type: 'TOGGLE_MENU' })}>
        <MenuIcon />
      </Btn>

      {hasPrevStep() ? (
        <Btn
          acc={() => {
            dispatch({ type: 'PREV' })
          }}>
          <ChevronLeftIcon />
        </Btn>
      ) : (
        <Btn
          acc={() => {
            dispatch({ type: 'PREV_PEN' })
          }}>
          <ChevronDoubleLeftIcon />
        </Btn>
      )}

      <Btn acc={() => dispatch({ type: 'PLAY_STOP' })}>
        {state.autoplay ? 'Stop' : 'Play'}
      </Btn>

      {hasNextStep() ? (
        <Btn
          acc={() => {
            dispatch({ type: 'NEXT' })
          }}>
          <ChevronRightIcon />
        </Btn>
      ) : (
        <Btn acc={() => dispatch({ type: 'NEXT_PEN' })}>
          <ChevronDoubleRightIcon />
        </Btn>
      )}

      {/* <button
        className='Button'
        onClick={() => {
          dispatch({ type: 'UPDATE_STEP' })
        }}
        disabled={hasNextStep()}>
        Save
      </button> */}
    </div>
  )
}
