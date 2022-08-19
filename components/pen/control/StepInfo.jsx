import React from 'react'

export default function StepInfo({ state, dispatch }) {
  const handleFocus = () => dispatch({ type: 'WRITING' })

  const handleBlur = (e) =>
    dispatch({
      type: 'SET_STEP_INFO',
      info: e.target.innerText,
    })

  return (
    <>
      {state.loaded ? (
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
          {state.pen.steps[state.step].info}
        </div>
      ) : (
        <div className='mt-6 w-1/2 h-3 rounded bg-neutral-600/30 animate-pulse'></div>
      )}
    </>
  )
}
