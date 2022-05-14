import React from 'react'

export default function Btn({ children, acc, className }) {
  return (
    <button
      className={`Button
      inline-flex flex-grow justify-center
      py-1 px-2 md:px-2
      outline-none
      text-sm font-mono text-neutral-400
      text-center
      decoration-0
      cursor-pointer
      transition-colors
      rounded-2xl
      bg-neutral-800
      sm:hover:bg-neutral-700/60
      disabled:bg-neutral-800/70
      active:bg-neutral-700/80 sm:active:bg-neutral-700/80
      ${className}`}
      onClick={acc}>
      {children}
    </button>
  )
}
