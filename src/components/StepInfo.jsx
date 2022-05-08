import React, { useState, useEffect, useRef } from 'react'

export default function StepInfo({ pen, cpen, step, dispatch }) {
  const stepInfoTag = useRef()
  const [stepInfo, setStepInfo] = useState(false)

  useEffect(() => {
    if (Object.keys(cpen).length <= 0) return
    setStepInfo( cpen.pen_steps[step].info)
  }, [cpen])

  const handleFocus = () => {
    dispatch({ type: 'WRITING' })
  }

  const handleBlur = () => {
    dispatch({
      type: 'SET_STEP_INFO',
      stepInfo: stepInfoTag.current.textContent,
    })
  }

  // TODO: create an component editable textarea?
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
      {stepInfo}
    </div>
  )
}
