import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import '../prism-atom-dark.css'

export default function Code({ css, dispatch }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(css)
  }, [css])

  const handleBlur = () => {
    dispatch({ type: 'SET_STEP_CSS', css: value })
  }

  return (
    <Editor
      className='editor-css'
      value={value}
      onValueChange={(value) => setValue(value)}
      highlight={(value) => highlight(value, languages.css)}
      onBlur={handleBlur}
      padding={14}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
      }}
    />
  )
}
