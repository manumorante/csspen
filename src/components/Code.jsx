import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import parseCSS from '../js/parseCSS'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import '../prism-atom-dark.css'

export default function Code({ state, dispatch }) {
  let code = ''
  try {
    code = parseCSS(state.pen.pen_steps[state.step].code)
  } catch (error) {}

  // SET_STEP_CODE
  const handleValueChange = (value) => {
    dispatch({ type: 'SET_STEP_CODE', code: value })
  }

  if (!state.pen || Object.keys(state.pen).length === 0) return

  return (
    <Editor
      className='editor-css'
      value={code}
      onValueChange={(value) => handleValueChange(value)}
      highlight={(value) => highlight(value, languages.css)}
      padding={14}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
      }}
    />
  )
}
