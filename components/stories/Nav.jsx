import React from 'react'

export default function Nav({ pen, dispatch }) {
  const handleNext = () => {
    pen.step === pen.steps.length - 1
      ? dispatch({ type: 'NEXT_PEN' })
      : dispatch({ type: 'STORY_NEXT_STEP' })
  }

  const handlePrev = () => {
    pen.step === 0
      ? dispatch({ type: 'PREV_PEN' })
      : dispatch({ type: 'STORY_PREV_STEP' })
  }

  return (
    <>
      <div
        className='fixed z-10 top-0 right-0 bottom-0 w-1/3'
        onTouchEnd={handleNext}></div>
      <div
        className='fixed z-10 top-0 left-0 bottom-0 w-1/3'
        onTouchEnd={handlePrev}></div>
    </>
  )
}
