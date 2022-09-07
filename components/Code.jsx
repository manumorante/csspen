import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'

export default function Code({ state, dispatch }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!state.loaded) return

    const css = state.pen.steps[state.step].css
    setValue(css)
  }, [state.loaded, state.pen, state.step])

  const handleBlur = () => {
    dispatch({ type: 'SET_STEP_CSS', css: value })
  }

  const handleFocus = () => {
    dispatch({ type: 'WRITING' })
  }

  if (!state.loaded) return null

  return (
    <Editor
      className='editor-css'
      value={value}
      // onValueChange={(value) => setValue(value)}
      highlight={(value) => highlight(value, languages.css)}
      readOnly={true}
      // onFocus={handleFocus}
      // onBlur={handleBlur}
      padding={32}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 17,
        color: '#c5c8c6',
      }}
    />
  )
}
