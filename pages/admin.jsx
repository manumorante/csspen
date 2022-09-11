import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { getPens } from 'database'
import Cover from '@/Cover'
import StepByStep from '@/admin/StepByStep'

function ColorBox({ color }) {
  return (
    <div>
      <div className='w-14 h-14 border border-dotted border-black/20' style={{ background: color }} />
      <div className='uppercase text-xs font-mono'>{color}</div>
    </div>
  )
}

function Colors({ colors }) {
  return (
    <div className='flex gap-3'>
      <ColorBox color={colors.c1} />
      <ColorBox color={colors.c2} />
      <ColorBox color={colors.c3} />
    </div>
  )
}

export default function Admin() {
  const [pens, setPens] = useState([])

  useEffect(() => {
    getPens().then((data) => {
      setPens(data)
    })
  }, [])

  const handlePenClick = (penID) => {
    const pen = document.getElementById(penID)
    pen.classList.toggle('hidden')
  }

  return (
    <div className='Admin bg-neutral-100 text-neutral-800'>
      <h1 className='text-xl font-bold'>Admin</h1>
      <div className='Pens flex flex-col gap-10 p-6'>
        {pens.map((pen) => {
          const { id, name, info, html, steps, colors } = pen
          const css = steps[steps.length - 1].css
          return (
            <div className='Pen' key={id}>
              <div className='NameAndCover flex items-center gap-6 mb-6' onClick={() => handlePenClick(id)}>
                <div className='w-20 grow-0'>
                  <div
                    className='Cover w-20 h-20 grow-0 flex items-center justify-center rounded-lg'
                    style={{ background: colors.c3 }}>
                    <Cover html={html} css={css} />
                  </div>
                </div>

                <div className='w-auto grow' id={id}>
                  <span className='text-lg font-bold'>{name}</span>
                  <div className='font-light mb-3'>{info ? info : <span className='text-red-600'>No info</span>}</div>
                </div>
              </div>

              <div className='mb-6'>
                <Colors colors={colors} />
              </div>

              <StepByStep pen={pen} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
