import React, { useState } from 'react'
import './styles.css'
import cssParser from 'css' // TODO: create hook useCss
import Tag from '../Tag'

export default function Code({ css, handleUpdate }) {
  const parsedCSS = cssParser.parse(css)
  const resultCSS = cssParser.stringify(parsedCSS, { sourcemap: true })

  const handleBlur = (e) => {
    handleUpdate(e.target.textContent)
  }

	return (
    <pre className='Code'>
      <code
        onBlur={handleBlur}
        className="Code__tag css"
        contentEditable="true"
        suppressContentEditableWarning="true"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false">{resultCSS.code}
      </code>
      <Tag html={`<style>${resultCSS.code}</style>`} />
    </pre>
  )
}
