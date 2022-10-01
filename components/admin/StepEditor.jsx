import React, { useCallback } from 'react'
import { addScope } from 'lib/css'
import CodeMirror from '@uiw/react-codemirror'
import { css as codeCSS } from '@codemirror/lang-css'
import { dracula } from '@uiw/codemirror-theme-dracula'

export default function StepEditor({ i, html, bg, css, onChange }) {
  const scopedCSS = addScope(css, '.step-' + i)

  const handleOnChange = useCallback(
    (newValue, _viewUpdate) => {
      onChange(newValue)
    },
    [onChange]
  )

  return (
    <div className='StepEditor'>
      <div className='relative w-80 h-80' style={{ backgroundColor: bg }}>
        <div
          className={`step-${i} absolute inset-0 grid place-items-center w-pen h-pen m-auto`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <style type='text/css' dangerouslySetInnerHTML={{ __html: scopedCSS }} />
      <CodeMirror
        value={css}
        height='500px'
        theme={dracula}
        extensions={[codeCSS()]}
        onChange={handleOnChange}
      />
    </div>
  )
}
