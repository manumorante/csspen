import React from 'react'

export default function Progress({ pen, step }) {
  const progressStep = {
    simple: 'text-gray-500 bg-gray-900',
    active: 'text-black bg-white font-bold',
    complete: 'text-gray-300  bg-gray-700',
  }

  if (pen.pen_steps.length <= 0) return false

  return (
    <div className='absolute hidden left-0 right-0 bottom-10 sm:flex gap-2 justify-center items-center overflow-hidden'>
      <span className='w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ease-out'>
        {step + 1}
      </span>
      <span>of</span>
      <span className='w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ease-out'>
        {pen.pen_steps.length}
      </span>
    </div>
  )

  return (
    <div className='absolute hidden left-0 right-0 bottom-10 sm:flex gap-2 justify-center overflow-hidden'>
      {pen.pen_steps.map((data, step) => (
        <span
          key={step}
          className='w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-700 ease-out'>
          {step + 1}
        </span>
      ))}
    </div>
  )
}
