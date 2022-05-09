import React from 'react'

export default function Nav({ pens, active }) {
  return (
    <nav className='[stories][nav] w-full h-[2px] flex items-stretch gap-1'>
      {pens.map((_, i) => (
        <div
          key={i}
          className={`w-9 grow transition-colors ${
            active === i ? 'bg-white' : 'bg-white/50'
          }`}></div>
      ))}
    </nav>
  )
}
