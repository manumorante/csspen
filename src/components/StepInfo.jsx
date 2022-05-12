import React from 'react'

export default function StepInfo({ pen, step, dispatch }) {
  const info = pen.steps[step].info

  const handleFocus = () => dispatch({ type: 'WRITING' })

  const handleBlur = (e) =>
    dispatch({
      type: 'SET_STEP_INFO',
      info: e.target.innerText,
    })

  return (
    <div
      className='hidden sm:block text-neutral-500 mt-4'
      onFocus={handleFocus}
      onBlur={(e) => handleBlur(e)}
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
