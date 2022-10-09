import React from 'react'
import { addScope } from 'lib/css'
import CodeMirror from '@uiw/react-codemirror'
import { css as codeCSS } from '@codemirror/lang-css'
import { dracula } from '@uiw/codemirror-theme-dracula'

export default function StepEditor({ num, html, bg, css, ...props }) {
  const scopedCSS = addScope(css, '.step-' + num)

  return (
    <div className='StepEditor h-full'>
      <div className='relative w-full h-64' style={{ backgroundColor: bg }}>
        <div
          className={`step-${num} absolute inset-0 grid place-items-center w-pen h-pen m-auto`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <style type='text/css' dangerouslySetInnerHTML={{ __html: scopedCSS }} />
      <CodeMirror value={css} width='100%' minHeight='500px' theme={dracula} extensions={[codeCSS()]} {...props} />
    </div>
  )
}
