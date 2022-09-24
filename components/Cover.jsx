import React from 'react'
import config from 'config'
import cx from 'classnames'
import { minify } from 'lib/css'

export default function Cover({ html, css, bg, size = 96, zoom = '0.3', className }) {
  const defaultCSS = `
  :root {
    --pen: ${config.size}px;
  }

  *,
  *:after,
  *::before {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  body {    
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;
    margin: auto;
    zoom: ${zoom};
  }

  body > div {    
    pointer-events: auto;
  }
`

  const styleTag = `<style type="text/css">${minify(defaultCSS + css)}</style>`

  return (
    <iframe
      style={{ width: `${size}px`, height: `${size}px`, background: bg }}
      className={cx('mx-auto pointer-events-none overflow-hidden grow-0', className)}
      srcDoc={html + styleTag}></iframe>
  )
}
