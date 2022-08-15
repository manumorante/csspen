import React, { useEffect } from 'react'
import Button from '../../ui/Button'
import {
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  StopIcon,
  PlayIcon,
  XIcon,
  PencilIcon,
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

  const confirmCreator = () => {
    const pass = window.prompt('Password', '')
    if (pass === 'hero') {
      dispatch({ type: 'SHOW_CREATOR' })
    }
  }

  const confirmDispatch = (obj) => {
    if (window.confirm(obj.type)) {
      dispatch(obj)
    }
  }

  return (
    <div className='Controls sticky top-0 rounded-2xl flex flex-col gap-3'>
      <div className='flex'>
        <Button acc={() => dispatch({ type: 'TOGGLE_MENU' })}>
          <MenuIcon />
        </Button>

        {hasPrevStep() ? (
          <Button
            acc={() => {
              dispatch({ type: 'PREV' })
            }}>
            <ChevronLeftIcon />
          </Button>
        ) : (
          <Button
            acc={() => {
              dispatch({ type: 'PREV_PEN' })
            }}>
            <ChevronDoubleLeftIcon />
          </Button>
        )}

        {state.playing ? (
          <Button acc={() => dispatch({ type: 'STOP' })}>
            <StopIcon />
          </Button>
        ) : (
          <Button acc={() => dispatch({ type: 'PLAY' })}>
            <PlayIcon />
          </Button>
        )}

        {hasNextStep() ? (
          <Button
            acc={() => {
              dispatch({ type: 'NEXT' })
            }}>
            <ChevronRightIcon />
          </Button>
        ) : (
          <Button acc={() => dispatch({ type: 'NEXT_PEN' })}>
            <ChevronDoubleRightIcon />
          </Button>
        )}

        {state.creator ? (
          <Button acc={() => dispatch({ type: 'HIDE_CREATOR' })}>
            <XIcon />
          </Button>
        ) : (
          <Button acc={confirmCreator}>
            <PencilIcon />
          </Button>
        )}
      </div>

      {state.creator && (
        <div className='flex'>
          <Button
            acc={() => {
              confirmDispatch({ type: 'UPDATE_STEP' })
            }}>
            Update
          </Button>

          <Button
            acc={() => {
              dispatch({ type: 'NEW_STEP' })
            }}>
            New
          </Button>

          <Button
            acc={() => {
              confirmDispatch({ type: 'SAVE_NEW_STEP' })
            }}>
            Save new
          </Button>

          <Button
            acc={() => {
              confirmDispatch({ type: 'DELETE_STEP' })
            }}>
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}
