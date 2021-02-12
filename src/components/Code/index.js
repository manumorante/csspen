import hljs from 'highlight.js'
import React, { useEffect, useRef } from 'react'
import './styles.scss'
import 'highlight.js/styles/atom-one-dark.css'
import cssParser from 'css'
import Tag from '../Tag'

export default function Code ({children, handleUpdate}) {
  const codeTag = useRef()

  const parse = (css) => {
    const cssToParse = cssParser.parse(css)
    const cssResult = cssParser.stringify(cssToParse, { sourcemap: true })
    return cssResult.code
  }

  const highlight = () => {
    hljs.highlightBlock(codeTag.current)
  }

  const handleBlur = (e) => {
    handleUpdate(e.target.textContent)
  }

  useEffect(() => {
    highlight()
  }, [children])

  return (
    <div className='Code'>
      <pre className='Code__pre'>
        <code
          ref={codeTag}
          className="Code__tag css"
          onBlur={handleBlur}
          contentEditable="true"
          suppressContentEditableWarning="true"
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false">{parse(children)}</code>
      </pre>

      <Tag html={`<style>${children}</style>`} />
    </div>
  )

}
