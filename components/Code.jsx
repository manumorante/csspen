import React, { useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-css'

export default function Code({ css }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.editor-css').scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 150)
  }, [css])

  return (
    <Editor
      className='editor-css'
      value={css}
      highlight={(value) => highlight(value, languages.css)}
      readOnly={true}
      padding={32}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 17,
        color: '#c5c8c6',
      }}
    />
  )
}
