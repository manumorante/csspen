import React from 'react'

export default function Cover({ title, html, css }) {
  const PenCoverCSS = `
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  body > div {
    zoom: 0.4;
  }`

  return (
    <iframe
      className='Cover pointer-events-none w-28 h-28'
      title={`${title} - Pen Cover`}
      src={`data:text/html;charset=utf-8,${html}<style type="text/css">${
        PenCoverCSS + css
      }</style>`}></iframe>
  )
}
