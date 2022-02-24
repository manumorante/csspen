import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

/**
 *
 * @param parsedCode Parsed CSS code
 * @param handleUpdateRawCode Method to update the state in the parent component
 */
export default function Code ({ parsedCode, handleUpdateRawCode }) {
  const codeTag = useRef()

  useEffect(() => {
    const timeout = setTimeout(() => hljs.highlightBlock(codeTag.current), 0)

    return () => clearTimeout(timeout)
  }, [parsedCode])

  function update() {
    if(handleUpdateRawCode)
      handleUpdateRawCode(codeTag.current.textContent)
  }

  return (
    <pre className="Code__pre">
      <code
        ref={codeTag}
        className="Code__tag css"
        onBlur={update}
        contentEditable="true"
        suppressContentEditableWarning="true"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false">{parsedCode}</code>
    </pre>
  )
}
