import React, { useState } from 'react'
import Editable from '@/admin/Editable'
import Cover from '@/Cover'

export default function Step({ penID, html, bg, step, info, css }) {
  const [currentCSS, setCurrentCSS] = useState(css)

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div className='w-screen sm:w-80 h-auto'>
        <div className='py-4' style={{ background: bg }}>
          <Cover html={html} css={currentCSS} size={220} bg={bg} zoom='1' />
        </div>

        <Editable
          field='info'
          value={info}
          placeholder='Add step info'
          penID={penID}
          step={step}
          className='p-3 bg-gray-900/70'
          contentClassName='w-full h-12'
        />

        <Editable
          field='css'
          isCode={true}
          value={currentCSS}
          penID={penID}
          step={step}
          onChange={setCurrentCSS}
          contentClassName='font-mono text-sm'
        />
      </div>
    </div>
  )
}
