import React from 'react'

export default function Progress({ pen }) {
  //
  // TODO pensar en como hacer este condicional de forma global en Styles.js
  // const classes = (step) => {
  //   const cute = ''
  //   // Active - Current step
  //   if (step === pen.step) cute.push(layout.progressStep.active)

  //   // Completed - Completed step
  //   if (step < pen.step) cute.push(layout.progressStep.complete)
  //   cute.push(layout.progressStep.simple)

  //   return cute.join(' ')
  // }
  const progressStep = {
    simple: 'text-gray-500 bg-gray-900',
    active: 'text-black bg-white font-bold',
    complete: 'text-gray-300  bg-gray-700',
  }

  if (!pen.loaded || pen.steps.length <= 0) return false

  return (
    <div className='absolute hidden left-0 right-0 bottom-10 sm:flex gap-2 justify-center overflow-hidden'>
      {pen.steps.map((data, step) => (
        <span
          key={step}
          className='w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ease-out'>
          {step + 1}
        </span>
      ))}
    </div>
  )
}
