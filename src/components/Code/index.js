import React, { useEffect, useState } from 'react'
import './styles.css'

export default function Code({ css }) {
  const [code, setCode] = useState(() => css)

  const handlePress = (e) => {
    setCode(e.target.textContent)
  }

  const handleChange = (e) => {
    setCode(e.target.textContent)
  }

	return (
    <pre className='Code'>
      <code
        onChange={handleChange}
        onKeyPress={handlePress}
        className="Code__tag css"
        contentEditable="true"
        suppressContentEditableWarning="true"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false">{code}
      </code>
    </pre>
  )
}
