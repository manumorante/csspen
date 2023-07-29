"use client"

import cx from "clsx"

const btnCx = cx(
  "Btn",
  "inline-flex items-center p-2 gap-2",
  "text-lg leading-5",
  "rounded-md",
  "md:cursor-pointer",
  "bg-black/30 text-white/80",
  "[&>svg]:w-5 [&>svg]:w-5"
)

function Btn({ children, className, onClick }: Props) {
  const handleOnClick = () => {
    if (onClick) onClick()
  }

  return (
    <button onClick={handleOnClick} className={cx(btnCx, className)}>
      {children}
    </button>
  )
}

Btn.cx = btnCx

export default Btn

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
