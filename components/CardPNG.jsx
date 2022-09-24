import React from 'react'
import cx from 'classnames'
import Image from 'next/future/image'

export default function CardPNG({ penID, isActive, onClick }) {
  let timeout
  const handleClick = (e) => {
    if (isActive) return

    onClick(penID)

    const card = e.currentTarget
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }, 200)
  }

  return (
    <div
      onClick={handleClick}
      className={cx(
        'Card',
        'h-full aspect-[1200/630]',
        'snap-center shrink-0',
        'overflow-hidden',
        'transition-all duration-500 ease-in-out',
        {
          'cursor-pointer': !isActive,
        }
      )}>
      <Image
        className={cx({
          'scale-125': isActive,
          'scale-100 grayscale opacity-40': !isActive,
        })}
        src={`/og/${penID}.png`}
        width={1200}
        height={630}
        alt={penID}
      />
    </div>
  )
}
