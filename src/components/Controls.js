import React, { useEffect } from 'react'

export default function Controls({ pen, dispatch }) {
  // Functions to check is can move to next or previous step
  const notNext = () => pen.autoplay || pen.step + 1 >= pen.totalSteps
  const notPrev = () => pen.autoplay || pen.step <= 0

  const handlePlayStop = () => {
    dispatch({ type: 'PLAY_STOP' })
  }

  const handleMore = () => {
    dispatch({ type: 'SHOW_MENU' })
  }

  const handleRewind = () => {
    dispatch({ type: 'REWIND' })
  }

  // Control using keyboard
  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 39:
        dispatch({ type: 'NEXT', stop: true })
        break
      case 37:
        dispatch({ type: 'PREV', stop: true })
        break
      case 32:
        handlePlayStop()
        break
      default:
        break
    }
  }

  // Bind event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className='Controls Buttons Editor__buttons'>
      <button className='Button' onClick={handleRewind} disabled={pen.rewind}>
        {'<<'}
      </button>

      <button
        className='Button'
        onClick={() => {
          dispatch({ type: 'PREV' })
        }}
        disabled={notPrev()}>
        {'<'}
      </button>

      <button className='Button' onClick={handlePlayStop}>
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

      <button className='Button' disabled={notNext()}>
        {'>>'}
      </button>

      <button className='Button button--more' onClick={handleMore}>
        More!
      </button>
    </div>
  )
}
