import React, { useRef } from 'react'

export default function StepInfo({ pen, dispatch }) {
  const stepInfoTag = useRef()

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
      className='Editor__step-info'
      onFocus={handleFocus}
      onBlur={handleBlur}
      contentEditable='true'
      suppressContentEditableWarning='true'
      autoCorrect='off'
      autoComplete='off'
      autoCapitalize='off'
      spellCheck='false'>
      {pen.stepInfo}
    </div>
  )
}
