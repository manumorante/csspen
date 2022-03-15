import React from 'react'

export default function Progress({ pen }) {
  const stepClass = (step) => {
    if (step < pen.step) return 'done'
    if (step === pen.step) return 'active'
    return ''
  }

  if (!pen.loaded || pen.steps.length <= 0) return false

  return (
    <div className='Progress w-full flex-none h-8'>
      {pen.steps.map((data, step) => (
        <span key={step} className={`Progress__step ${stepClass(step)} `}>
          {step + 1}
        </span>
      ))}
    </div>
  )
}
