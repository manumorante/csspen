import React, { useRef } from 'react'

export default function StepInfo({ pen, step, dispatch }) {
  const stepInfoTag = useRef()
  let info = ''

  try {
    info = pen.steps[step].info
  } catch (e) {}

  const handleFocus = () => {
    dispatch({ type: 'WRITING' })
  }

  const handleBlur = () => {
    dispatch({
      type: 'SET_STEP_INFO',
      stepInfo: stepInfoTag.current.textContent,
    })
  }

  return (
    <div
      ref={stepInfoTag}
      className='text-neutral-500 mt-4'
      onFocus={handleFocus}
      onBlur={handleBlur}
      contentEditable='true'
      suppressContentEditableWarning='true'
      autoCorrect='off'
      autoComplete='off'
      autoCapitalize='off'
      spellCheck='false'>
      {info}
    </div>
  )
}
