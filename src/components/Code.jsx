import React, { useEffect, useRef } from 'react'
import parseCSS from '../js/parseCSS'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default function Code({ state, dispatch }) {
  const codeTag = useRef()

  if (!state.pen || Object.keys(state.pen).length === 0)
    return <div>Loading ...</div>

  let code = ''

  try {
    code = parseCSS(state.pen.pen_steps[state.step].code)
  } catch (error) {}

  useEffect(() => {
    hljs.highlightElement(codeTag.current)
  }, [code])

  const handleFocus = () => {
    dispatch({ type: 'WRITING' })
  }

  const handleBlur = () => {
    dispatch({ type: 'SET_STEP_CODE', code: codeTag.current.textContent })
  }

  return (
    <pre className={`Code flex-grow overflow-scroll`}>
      <code
        ref={codeTag}
        className='css outline-none'
        onFocus={handleFocus}
        onBlur={handleBlur}
        contentEditable='true'
        suppressContentEditableWarning='true'
        autoCorrect='off'
        autoComplete='off'
        autoCapitalize='off'
        spellCheck='false'>
        {code}
      </code>
    </pre>
  )
}
