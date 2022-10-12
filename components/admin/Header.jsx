import React from 'react'

export function HeaderArea({ children }) {
  return <div className='h-full flex gap-3 items-center'>{children}</div>
}

export function Header({ children }) {
  return (
    <div className='Header w-full h-10 fixed top-0 z-50 bg-gray-900'>
      <div className='h-10 flex justify-between items-start'>{children}</div>
    </div>
  )
}
