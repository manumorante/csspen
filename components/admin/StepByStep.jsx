import React from 'react'
import Cover from '@/Cover'
import Editable from './Editable'

export default function StepByStep({ pen }) {
  return (
    <div className='StepByStep'>
      <div className='Steps flex flex-wrap gap-10'>
        {pen.steps.map((step, index) => {
          const { info, css } = step
          return (
            <div className='Step w-pen h-auto grow-0' key={index}>
              <Cover html={pen.html} css={css} size={220} bg={pen.colors.c3} zoom='1' />

              <Editable
                field='info'
                value={info}
                penID={pen.id}
                step={index}
                className='InfoEditable'
                contentClassName='text-xl text-center'
              />
              <Editable
                field='css'
                value={css}
                penID={pen.id}
                step={index}
                className='CssEditable'
                contentClassName='font-mono'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
