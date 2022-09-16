import React from 'react'
import Cover from '@/Cover'
import Editable from './Editable'

export default function StepByStep({ pen }) {
  return (
    <div className='StepByStep mt-6'>
      <div className='Steps flex gap-8 overflow-y-auto'>
        {pen.steps.map((step, index) => {
          const { info, css } = step
          return (
            <div className='Step w-64 h-auto grow-0' key={index}>
              <div className='p-4' style={{ background: pen.colors.c3 }}>
                <Cover html={pen.html} css={css} size={220} bg={pen.colors.c3} zoom='1' />
              </div>

              <Editable
                field='info'
                value={info}
                penID={pen.id}
                step={index}
                className='mt-3'
                contentClassName='w-full'
              />

              <Editable
                field='css'
                isCode={true}
                value={css}
                penID={pen.id}
                step={index}
                className='mt-10'
                contentClassName='font-mono text-sm'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
