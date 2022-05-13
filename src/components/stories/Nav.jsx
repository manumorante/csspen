import React from 'react'

export default function Nav({ dispatch }) {
  const handleNext = () => {
    dispatch({ type: 'NEXT' })
  }

  const handlePrev = () => {
    dispatch({ type: 'PREV' })
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
