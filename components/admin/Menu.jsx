import React from 'react'

export function MenuItems({ children }) {
  return <div className='z-30 relative w-full flex flex-col gap-3 items-center py-3'>{children}</div>
}

export function MenuBg() {
  return <div className='z-20 absolute inset-0 bg-gray-800' />
}

export function MenuContent({ children }) {
  return <div className='z-10 absolute w-0 h-0 right-0 '>{children}</div>
}

export function Menu({ children }) {
  return (
    <div className='Menu fixed top-0 bottom-0 z-50 w-16 bg-black/20'>
      <div className='w-full h-full flex flex-col justify-between items-center'>{children}</div>
    </div>
  )
}
