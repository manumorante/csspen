import React from 'react'
import { addScope } from 'lib/css'
import CodeMirror from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import { css as codeCSS } from '@codemirror/lang-css'
// import { dracula } from '@uiw/codemirror-theme-dracula'

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: 'transparent',
    foreground: '#75baff',
    caret: '#5d00ff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: 'transparent',
    gutterBackground: 'transparent',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: '#8DDB8C' },
    { tag: t.number, color: '#8DDB8C' },
    { tag: t.bool, color: '#8DDB8C' },
    { tag: t.null, color: '#8DDB8C' },
    { tag: t.keyword, color: '#8DDB8C' },
    { tag: t.operator, color: '#8DDB8C' },
    { tag: t.className, color: '#8DDB8C' },
    { tag: t.definition(t.typeName), color: '#8DDB8C' },
    { tag: t.typeName, color: '#8DDB8C' },
    { tag: t.angleBracket, color: '#8DDB8C' },
    { tag: t.tagName, color: '#8DDB8C' },
    { tag: t.attributeName, color: '#8DDB8C' },
  ],
})

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
      <CodeMirror value={css} width='100%' minHeight='500px' theme={myTheme} extensions={[codeCSS()]} {...props} />
    </div>
  )
}
