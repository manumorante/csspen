import React, { useEffect } from 'react'

export default function Controls({ state, dispatch }) {
  // Functions to check is can move to next or previous step
  const notNext = () => {
    return state.autoplay || state.step + 1 >= state.pen.steps.length
  }

  const notPrev = () => {
    return state.autoplay || state.step <= 0
  }

  // useEffect(() => {
  //   // Control using keyboard
  //   const handleKeyDown = (e) => {
  //     if (state.writing) return

  //     switch (e.keyCode) {
  //       case 39:
  //         if (notNext()) return
  //         dispatch({ type: 'NEXT', stop: true })
  //         break
  //       case 37:
  //         if (notPrev()) return
  //         dispatch({ type: 'PREV', stop: true })
  //         break
  //       case 32:
  //         dispatch({ type: 'PLAY_STOP' })
  //         break
  //       case 83:
  //         e.ctrlKey && dispatch({ type: 'UPDATE_STEP' })
  //         break
  //       default:
  //         break
  //     }
  //   }

  //   // Bind and unbind keyboard events
  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => window.removeEventListener('keydown', handleKeyDown)
  // }, [dispatch, state.writing])

  return (
    <div className='Controls sticky top-0 rounded-2xl flex'>
      <button
        className='Button flex-auto md:hidden'
        onClick={() => dispatch({ type: 'SHOW_MENU' })}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      <button
        className='Button flex-auto'
        onClick={() => {
          dispatch({ type: 'PREV' })
        }}
        disabled={notPrev()}>
        {'<'}
      </button>

      <button
        className='Button flex-auto'
        onClick={() => dispatch({ type: 'PLAY_STOP' })}>
        {state.autoplay ? 'Stop' : 'Play'}
      </button>

      <button
        className='Button flex-auto'
        onClick={() => {
          dispatch({ type: 'NEXT' })
        }}
        disabled={notNext()}>
        {'>'}
      </button>
    </div>
  )
}
