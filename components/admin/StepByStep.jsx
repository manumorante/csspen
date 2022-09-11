import React from 'react'
import Cover from '@/Cover'

export default function StepByStep({ pen }) {
  return (
    <div className='StepByStep'>
      <div className='Steps flex flex-wrap gap-6'>
        {pen.steps.map((step, index) => {
          const { info, css } = step
          return (
            <div className='Step w-44 grow-0 flex flex-col gap-4' key={index}>
              <div className='rounded-lg' style={{ background: pen.colors.c3 }}>
                <Cover html={pen.html} css={css} size={176} zoom='0.6' />
              </div>
              <div className='Info text-xl'>{info ? info : <span className='text-red-600'>No info</span>}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
