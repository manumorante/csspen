import React from 'react'
import cx from 'classnames'

export default function Cover({ html, css }) {
  const defaultCSS = `
  *, *:after, *::before { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }

  body {    
    display: flex; align-items: center; justify-content: center;
  }

  body > div { zoom: 0.4; }`

  const styleTag = `<style type="text/css">${defaultCSS + css}</style>`

  return (
    <iframe className={cx('w-28 h-28 mx-auto pointer-events-none overflow-hidden')} srcDoc={html + styleTag}></iframe>
  )
}
