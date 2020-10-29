import React, { useState } from 'react'
import './styles.css'
import cssParser from 'css' // TODO: create hook useCss
import Tag from '../Tag'

export default function Code({ css, handleUpdate }) {
  const cssToParse = css || '.foo{ display: block; }'

  // TODO: control parser errors
  const parsedCSS = cssParser.parse(cssToParse)
  const resultCSS = cssParser.stringify(parsedCSS, { sourcemap: true })
  const code = resultCSS.code

  console.log('css', css)
  console.log('parsedCSS', code)

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
        spellCheck="false">
          {code}
      </code>
      <Tag html={`<style>${code}</style>`} />
    </pre>
  )
}
