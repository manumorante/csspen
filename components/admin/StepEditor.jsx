/* eslint-disable @next/next/no-img-element */
import React from 'react'
import cx from 'classnames'
import { addScope } from 'lib/css'
import CodeMirror from '@uiw/react-codemirror'
import { myTheme } from 'lib/myTheme'
// import { dracula } from '@uiw/codemirror-theme-dracula'
import { css as codeCSS } from '@codemirror/lang-css'

export default function StepEditor({ num, html, css, isVertical, ...props }) {
  const scopedCSS = addScope(css, '.step-' + num)

  function Preview() {
    return (
      <div
        className={cx('Preview shrink-0 relative w-full h-64', {
          'scale-150 translate-y-10 lg:w-96': !isVertical,
        })}>
        {isVertical || (
          <img className='opacity-50 absolute inset-0 w-pen h-pen m-auto' src='/originals/nbc.png' alt='onion' />
        )}

        <div
          className={`step-${num} absolute inset-0 grid place-items-center w-pen h-pen m-auto overflow-hidden`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <style type='text/css' dangerouslySetInnerHTML={{ __html: scopedCSS }} />
      </div>
    )
  }

  return (
    <div
      className={cx('StepEditor w-full flex items-stretch', {
        'flex-col': isVertical,
        'h-[calc(100vh-48px)]': !isVertical,
      })}>
      <Preview />
      <CodeMirror value={css} width='100%' height='100%' theme={myTheme} extensions={[codeCSS()]} {...props} />
    </div>
  )
}
