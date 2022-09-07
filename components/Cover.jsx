import React, { useState, useEffect } from 'react'
import cx from 'classnames'

function CardLoading() {
  return (
    <div className='CardLoading snap-center shrink-0 p-6'>
      <div className='w-28 h-28 p-6 mx-auto animate-pulse'>
        <div className='w-full h-full rounded bg-neutral-600/30'></div>
      </div>
    </div>
  )
}

export default function Cover({ html, css }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (css === '') return
    setTimeout(() => setVisible(true), 100)
  }, [css])

  const defaultCSS = `
  *, *:after, *::before { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }

  body {    
    display: flex; align-items: center; justify-content: center;
  }

  body > div { zoom: 0.4; }`

  const styleTag = `<style type="text/css">${defaultCSS + css}</style>`

  return (
    <iframe
      className={cx(
        'w-28 h-28 mx-auto pointer-events-none overflow-hidden',
        'sm:transition-opacity sm:duration-500 sm:ease-in-out',
        {
          'sm:opacity-0': !visible,
          'sm:opacity-100': visible,
        }
      )}
      srcDoc={html + styleTag}></iframe>
  )
}
