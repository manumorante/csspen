import React from 'react'

export default function Progress({ steps, step }) {
  return (
    <nav className='[stories][nav] w-full h-[2px] flex items-stretch gap-1'>
      {steps.map((_, i) => (
        <div
          key={i}
          className={`w-9 grow transition-colors ${
            step === i ? 'bg-white' : 'bg-white/50'
          }`}></div>
      ))}
    </nav>
  )
}
