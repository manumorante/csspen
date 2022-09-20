import React, { useState } from 'react'
import Cover from '@/Cover'
import Editable from './Editable'

function Step({ penID, html, bg, step, info, css }) {
  const [currentCSS, setCurrentCSS] = useState(css)

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div className='w-screen px-4 sm:p-0 sm:w-64 h-auto'>
        <Editable
          field='info'
          value={info}
          placeholder='Add step info'
          penID={penID}
          step={step}
          className='mt-3'
          contentClassName='w-full h-12'
        />

        <div className='py-4' style={{ background: bg }}>
          <Cover html={html} css={currentCSS} size={220} bg={bg} zoom='1' />
        </div>

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

export default function StepByStep({ pen }) {
  return (
    <div className='StepByStep mt-4'>
      <div className='Steps flex sm:gap-4 sm:px-4 snap-x snap-mandatory overflow-y-auto pb-12'>
        {pen.steps.map((step, i) => {
          return (
            <Step
              key={`${pen.id}-${i}`}
              penID={pen.id}
              html={pen.html}
              bg={pen.colors.c3}
              step={i}
              info={step.info}
              css={step.css}
            />
          )
        })}
      </div>
    </div>
  )
}
