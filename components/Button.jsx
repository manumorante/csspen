import React from 'react'
import cx from 'classnames'
export default function Button({ children, onClick, className, secondary, icon, label }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        'Button',
        'inline-flex items-center py-1 px-2 gap-1 rounded-lg',
        'text-base ',

        'cursor-pointer',
        'transition-all duration-500 ease-in-out',
        {
          'bg-black/30 hover:bg-black text-white/80': !secondary,
          'bg-neutral-500/10 hover:bg-neutral-500/30 text-white/50': secondary,
        },
        className
      )}>
      {icon && icon}
      {label && <div>{label}</div>}
      {!label && !icon && children}
    </div>
  )
}
