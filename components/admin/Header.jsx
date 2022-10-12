import React from 'react'

export function HeaderArea({ children }) {
  return <div className='h-full flex gap-3 items-center px-3'>{children}</div>
}

export function Header({ children }) {
  return (
    <div className='Header w-full h-14 fixed top-0 z-50 bg-black/20'>
      <div className='h-full flex justify-between items-start'>{children}</div>
    </div>
  )
}
