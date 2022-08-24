import React from 'react'

export default function ScreenControls({ onClickPrev, onClickNext }) {
  return (
    <>
      <div className='fixed z-30 top-0 left-0 w-1/3 h-full' onClick={onClickPrev}></div>
      <div className='fixed z-30 top-0 right-0 w-1/3 h-full' onClick={onClickNext}></div>
    </>
  )
}
