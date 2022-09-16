import React from 'react'
import cx from 'classnames'

export default function Cover({ html, css, bg, size = 64, zoom = '0.2', className }) {
  const defaultCSS = `
  *, *:after, *::before { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }

  body {    
    display: flex; align-items: center; justify-content: center;
  }

  body > div { zoom: ${zoom}; }`

  const styleTag = `<style type="text/css">${defaultCSS + css}</style>`

  return (
    <iframe
      style={{ width: `${size}px`, height: `${size}px`, background: bg }}
      className={cx('mx-auto pointer-events-none overflow-hidden', className)}
      srcDoc={html + styleTag}></iframe>
  )
}
