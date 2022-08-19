import React, { useEffect } from 'react'
import cx from 'classnames'
import {
  Text,
  Close,
  Edit,
  Left,
  Left2x,
  Menu,
  Play,
  Right,
  Right2x,
  Stop,
} from '../../ui/buttons'

export default function Controls({ state, dispatch }) {
  const hasNextStep = () => {
    return state.step < state.pen?.steps?.length - 1
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
      <div
        className={cx('flex transition-opacity', {
          'opacity-40 pointer-events-none': !state?.loaded,
        })}>
        <Menu acc={() => dispatch({ type: 'TOGGLE_MENU' })} />

        {hasPrevStep() ? (
          <Left acc={() => dispatch({ type: 'PREV' })} />
        ) : (
          <Left2x acc={() => dispatch({ type: 'PREV_PEN' })} />
        )}

        {state.playing ? (
          <Stop acc={() => dispatch({ type: 'STOP' })} />
        ) : (
          <Play acc={() => dispatch({ type: 'PLAY' })} />
        )}

        {hasNextStep() ? (
          <Right acc={() => dispatch({ type: 'NEXT' })} />
        ) : (
          <Right2x acc={() => dispatch({ type: 'NEXT_PEN' })} />
        )}

        {state.creator ? (
          <Close acc={() => dispatch({ type: 'HIDE_CREATOR' })} />
        ) : (
          <Edit acc={confirmCreator} />
        )}
      </div>

      {state.creator && (
        <div className='flex'>
          <Text acc={() => confirmDispatch({ type: 'UPDATE_STEP' })}>
            Update
          </Text>

          <Text acc={() => dispatch({ type: 'NEW_STEP' })}>New</Text>

          <Text acc={() => confirmDispatch({ type: 'SAVE_NEW_STEP' })}>
            Save new
          </Text>

          <Text acc={() => confirmDispatch({ type: 'DELETE_STEP' })}>
            Delete
          </Text>
        </div>
      )}
    </div>
  )
}
