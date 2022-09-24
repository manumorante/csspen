/* eslint-disable @next/next/no-img-element */
import React from 'react'
import cx from 'classnames'

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
        'h-full aspect-square',
        'snap-center shrink-0',
        'overflow-hidden',
        'transition-all duration-500 ease-in-out',
        {
          'cursor-pointer': !isActive,
        }
      )}>
      <img
        className={cx('w-full h-full object-cover', {
          'grayscale opacity-40': !isActive,
        })}
        src={`/og/${penID}.png`}
        width={1200}
        height={630}
        alt={penID}
      />
    </div>
  )
}
