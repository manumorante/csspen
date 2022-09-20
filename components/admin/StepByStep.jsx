import React from 'react'
import Cover from '@/Cover'
import Editable from './Editable'

export default function StepByStep({ pen }) {
  return (
    <div className='StepByStep mt-4'>
      <div className='Steps flex sm:gap-4 sm:px-4 snap-x snap-mandatory overflow-y-auto pb-12'>
        {pen.steps.map((step, index) => {
          const { info, css } = step
          return (
            <div className='Step snap-center grow sm:grow-0' key={index}>
              <div className='w-screen px-4 sm:p-0 sm:w-64 h-auto'>
                <Editable
                  field='info'
                  value={info}
                  penID={pen.id}
                  step={index}
                  className='mt-3'
                  contentClassName='w-full h-12'
                />
                <div className='py-4' style={{ background: pen.colors.c3 }}>
                  <Cover html={pen.html} css={css} size={220} bg={pen.colors.c3} zoom='1' />
                </div>

                <Editable
                  field='css'
                  isCode={true}
                  value={css}
                  penID={pen.id}
                  step={index}
                  className='mt-4'
                  contentClassName='font-mono text-sm'
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
