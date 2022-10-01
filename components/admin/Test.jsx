import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { css } from '@codemirror/lang-css'

export default function Test() {
  const styleRef = React.useRef(null)
  const initialCSS = '.foo { background: red; }'
  const html = '<div class="foo">Hello World</div>'

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value)
    styleRef.current.innerHTML = value
  }, [])

  return (
    <div className='Test'>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <style ref={styleRef} type='text/css' dangerouslySetInnerHTML={{ __html: initialCSS }} />
      <CodeMirror value={initialCSS} height='500px' extensions={[css()]} onChange={onChange} />
    </div>
  )
}
