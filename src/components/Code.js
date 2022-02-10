import hljs from 'highlight.js'
import React, { useEffect, useRef } from 'react'
import Tag from './Tag'
import 'highlight.js/styles/atom-one-dark.css'

/**
 *
 * @param children CSS raw code from the pen.json
 * @param parsedCode Parsed CSS code
 * @param handleUpdateRawCode Method to update the state in the parent component
 */
export default function Code ({ children, parsedCode, handleUpdateRawCode }) {
  const codeTag = useRef()

  useEffect(() => {
    const timeout = setTimeout(() => hljs.highlightBlock(codeTag.current), 0)

    return () => clearTimeout(timeout)
  }, [children])

  function update() {
    handleUpdateRawCode(codeTag.current.textContent)
  }

  function handleBlur() {
    update()
  }

  return (
    <div className="Code">
      <pre className="Code__pre">
        <code
          ref={codeTag}
          className="Code__tag css"
          onBlur={handleBlur}
          contentEditable="true"
          suppressContentEditableWarning="true"
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false">{parsedCode}</code>
      </pre>

      <Tag html={`<style type="text/css">${children}</style>`} />
    </div>
  )
}