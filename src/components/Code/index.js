import hljs from 'highlight.js'
import React, { useState, useEffect, useRef } from 'react'
import { parseCSS } from '../../lib/parseCSS'
import Tag from '../Tag'
import './styles.scss'
import 'highlight.js/styles/atom-one-dark.css'

export default function Code ({children, handleUpdate}) {
  const codeTag = useRef()
  const [rawCSS, setRawCSS] = useState(children)
  const [parsedCSS, setParsedCSS] = useState(children)

  function highlight() {
    hljs.highlightBlock(codeTag.current)
  }

  function handleBlur() {
    setRawCSS(codeTag.current.textContent)
    handleUpdate(rawCSS)
  }

  let myDelay = null
  function handleKeyUp() {
    clearTimeout(myDelay)
    myDelay = setTimeout(() => {
      handleUpdate(codeTag.current.textContent)
    }, 600)
  }

  useEffect(() => {
    setRawCSS(children)
    setParsedCSS(parseCSS(children))
    highlight()
    console.log('hola')
  }, [children])

  return (
    <div className='Code'>
      <pre className='Code__pre'>
        <code
          ref={codeTag}
          className="Code__tag css"
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          contentEditable="true"
          suppressContentEditableWarning="true"
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false">{parsedCSS}</code>
      </pre>

      <Tag html={`<style>${rawCSS}</style>`} />
    </div>
  )
}
