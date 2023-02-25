import React from 'react'
import cx from 'clsx'

export default function Button({ onClick, className, submit, secondary, icon, label }) {
  icon = icon && React.cloneElement(icon, { className: 'w-8 h-8 sm:w-5 sm:h-5 opacity-70' })
  
  return (
    <div
      role='button'
      type={submit ? 'submit' : 'button'}
      onClick={() => {
        if (onClick && !submit) onClick()
      }}
      className={cx(
        'Button',
        'inline-flex items-center py-2 px-3 gap-2 rounded-lg',
        'text-lg leading-5',
        'cursor-pointer',
        'transition-all duration-500 ease-in-out',
        {
          'bg-black/30 hover:bg-black text-white/80': !secondary,
          'bg-neutral-500/20 hover:bg-neutral-500/30 text-white/50': secondary,
        },
        className
      )}>
      {icon}
      {label && <div>{label}</div>}
    </div>
  )
}