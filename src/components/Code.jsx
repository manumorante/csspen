import React, { useEffect, useRef } from 'react'
import parseCSS from '../js/parseCSS'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default function Code({ state, dispatch }) {
  const codeTag = useRef()

  useEffect(() => {
    codeTag.current.textContent = parseCSS(code)
    hljs.highlightElement(codeTag.current)
  }, [state.step])

  let code = ''
  try {
    code = parseCSS(state.pen.pen_steps[state.step].code)
  } catch (error) {}

  const hasChanged = () => {
    return code !== codeTag.current.textContent
  }

  // SET_STEP_CODE
  let preventTimeout = null
  const preventTime = 800
  const handleInput = () => {
    clearInterval(preventTimeout)
    preventTimeout = setTimeout(() => {
      if (hasChanged()) {
        dispatch({ type: 'SET_STEP_CODE', code: codeTag.current.textContent })
      }
    }, preventTime)
  }

  const handleFocus = () => {
    dispatch({ type: 'WRITING' })
  }

  const handleBlur = () => {
    codeTag.current.textContent = parseCSS(codeTag.current.textContent)
    hljs.highlightElement(codeTag.current)
  }

  if (!state.pen || Object.keys(state.pen).length === 0) return

  return (
    <pre className={`Code flex-grow overflow-scroll`}>
      <code
        ref={codeTag}
        className='css outline-none'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        contentEditable='true'
        suppressContentEditableWarning='true'
        autoCorrect='off'
        autoComplete='off'
        autoCapitalize='off'
        spellCheck='false'></code>
    </pre>
  )
}
