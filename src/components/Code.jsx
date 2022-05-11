import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import Loading from './Loading'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import '../prism-atom-dark.css'

export default function Code({ state, dispatch }) {
  const { pen } = state
  const css = pen.steps[state.step]?.css

  const handleValueChange = (value) => {
    dispatch({ type: 'SET_STEP_CODE', css: value })
  }

  return (
    <Loading until={state.loaded}>
      <Editor
        className='editor-css'
        value={css}
        onValueChange={(value) => handleValueChange(value)}
        highlight={(value) => highlight(value, languages.css)}
        padding={14}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />
    </Loading>
  )
}
