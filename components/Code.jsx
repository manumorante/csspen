import React, { useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-css'

export default function Code({ css }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.editor-css').scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 150)
  }, [css])

  return (
    <div className='relative w-full h-full overflow-y-auto'>
      <Editor
        className='editor-css text-sm xs:text-base font-mono text-neutral-200'
        value={css}
        highlight={(value) => highlight(value, languages.css)}
        readOnly={true}
        padding={32}
      />
    </div>
  )
}
