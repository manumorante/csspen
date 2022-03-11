import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default function Code({ pen, dispatch }) {
  const codeTag = useRef()

  useEffect(() => {
    if (!pen.parsedCode) return

    hljs.highlightBlock(codeTag.current)
  }, [pen.parsedCode])

  const handleFocus = () => {
    dispatch({ type: 'WRITING' })
  }

  const handleBlur = () => {
    dispatch({ type: 'SET_STEP_CODE', code: codeTag.current.textContent })
  }

  const loading = pen.loading ? 'loading' : ''

  return (
    <div className='Code'>
      <pre className={`Code__pre ${loading}`}>
        <code
          ref={codeTag}
          className='Code__tag css'
          onFocus={handleFocus}
          onBlur={handleBlur}
          contentEditable='true'
          suppressContentEditableWarning='true'
          autoCorrect='off'
          autoComplete='off'
          autoCapitalize='off'
          spellCheck='false'>
          {pen.parsedCode}
        </code>
      </pre>
    </div>
  )
}
