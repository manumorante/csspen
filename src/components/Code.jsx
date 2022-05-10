import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import Loading from './Loading'
import parseCSS from '../js/parseCSS'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import '../prism-atom-dark.css'

export default function Code({ state, dispatch }) {
  const { pen } = state
  const code = pen.pen_steps[state.step]?.code
  const parserCode = parseCSS(code)
  
  const handleValueChange = (value) => {
    dispatch({ type: 'SET_STEP_CODE', code: value })
  }

  // loading up to this

  return (
    <Loading until={state.loaded}>
      <Editor
        className='editor-css'
        value={parserCode}
        onValueChange={(value) => handleValueChange(value)}
        highlight={(value) => highlight(value, languages.css)}
        padding={14}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
      />
    </Loading>
  )
}
