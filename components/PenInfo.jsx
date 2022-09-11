import React from 'react'

export default function PenInfo({ name, info, color, bg }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className='flex gap-2 xs:gap-3 items-center p-2 xs:p-4'>
      <div
        className='Avatar w-6 h-6 xs:w-10 xs:h-10 flex items-center justify-center leading-0 text-lg xs:text-xl font-extrabold text-white rounded-full transition-colors duration-500 ease-in-out'
        style={{ color: color, backgroundColor: bg }}>
        {initials}
      </div>
      <div className='flex gap-2 xs:block text-sm xs:text-lg xs:leading-6'>
        <div className='text-white font-semibold'>{name}</div>
        <div className='text-white/60 text-ellipsis whitespace-nowrap'>{info}</div>
      </div>
    </div>
  )
}
