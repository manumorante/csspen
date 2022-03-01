import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default function Code ({ pen, handleUpdateRawCode }) {
  const codeTag = useRef()

  useEffect(() => {
    const timeout = setTimeout(() => hljs.highlightBlock(codeTag.current), 0)

    return () => clearTimeout(timeout)
  }, [pen])

  function update() {
    if(handleUpdateRawCode)
      handleUpdateRawCode(codeTag.current.textContent)
  }

  const loading = (pen.loading) ? 'loading' : ''

  return (
    <div className='Code'>
      <pre className={`Code__pre ${loading}`}>
        <code
          ref={codeTag}
          className="Code__tag css"
          onBlur={update}
          contentEditable="true"
          suppressContentEditableWarning="true"
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false">{pen.parsedCode}</code>
      </pre>
    </div>
  )
}
