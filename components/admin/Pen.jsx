import React, { useState } from 'react'
import cx from 'classnames'
import Cover from '@/Cover'
import Colors from '@/admin/Colors'
import StepByStep from '@/admin/StepByStep'
import PenInfo from '@/admin/PenInfo'

export default function Pen({ pen }) {
  const [isOpen, setIsOpen] = useState(false)
  const { id, name, info, html, steps, colors } = pen
  const css = steps[steps.length - 1].css

  return (
    <div className='Pen bg-gradient-to-t from-black/10 hover:from-black/20'>
      <div className={cx('flex justify-between')}>
        <div className='w-full flex items-center gap-3'>
          <div
            className='cursor-pointer'
            onClick={() => {
              setIsOpen(!isOpen)
            }}>
            <Cover html={html} css={css} bg={colors.c3} size={80} />
          </div>
          <PenInfo penID={id} name={name} info={info} isOpen={isOpen} />
          <div className='flex flex-col gap-2 mr-3'>
            <Colors colors={colors} />
            <div className=' text-right'>
              {steps.length} {steps.length > 1 ? <span>steps</span> : <span>step</span>}
            </div>
          </div>
        </div>
      </div>

      {isOpen && <StepByStep pen={pen} />}
    </div>
  )
}
