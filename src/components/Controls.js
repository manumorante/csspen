import React, { useEffect } from 'react'

export default function Controls({ pen, dispatch }) {
  // Functions to check is can move to next or previous step
  const notNext = () => pen.autoplay || pen.step + 1 >= pen.totalSteps
  const notPrev = () => pen.autoplay || pen.step <= 0

  const handleSave = () => {
    dispatch({ type: 'UPDATE_STEP' })
  }

  useEffect(() => {
    // Control using keyboard
    const handleKeyDown = (e) => {
      if (pen.writing) return

      switch (e.keyCode) {
        case 39:
          dispatch({ type: 'NEXT', stop: true })
          break
        case 37:
          dispatch({ type: 'PREV', stop: true })
          break
        case 32:
          dispatch({ type: 'PLAY_STOP' })
          break
        default:
          break
      }
    }

    // Bind and unbind keyboard events
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, pen.writing])

  return (
    <div className='Controls Buttons Editor__buttons'>
      <button
        className='Button'
        onClick={() => dispatch({ type: 'REWIND' })}
        disabled={pen.rewind}>
        {'⟲'}
      </button>

      <button
        className='Button'
        onClick={() => {
          dispatch({ type: 'PREV' })
        }}
        disabled={notPrev()}>
        {'<'}
      </button>

      <button
        className='Button'
        onClick={() => dispatch({ type: 'PLAY_STOP' })}>
        {pen.autoplay || pen.rewind ? 'Stop' : 'Play'}
      </button>

      <button
        className='Button'
        onClick={() => {
          dispatch({ type: 'NEXT' })
        }}
        disabled={notNext()}>
        {'>'}
      </button>

      <button className='Button' onClick={handleSave} disabled={!pen.edited}>
        {'Save'}
      </button>

      <button
        className='Button button--more'
        onClick={() => dispatch({ type: 'SHOW_MENU' })}>
        More!
      </button>
    </div>
  )
}
