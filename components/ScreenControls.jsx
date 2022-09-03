import React from 'react'

export default function ScreenControls({ onClickPrev, onClickNext }) {
  return (
    <>
      <div className='fixed z-30 top-40 left-0 w-1/3 bottom-40' onClick={onClickPrev}></div>
      <div className='fixed z-30 top-40 right-0 w-1/3 bottom-40' onClick={onClickNext}></div>
    </>
  )
}
