import React from 'react'
import cx from 'classnames'
import Cover from './Cover'

export default function Card({ pen, isActive, dispatch }) {
  const css = pen.steps[pen.steps.length - 1].css || ''
  const html = pen.html || ''
  const styles = { backgroundColor: pen.colors.c3, filter: isActive ? 'none' : 'brightness(0.3)' }

  const handleClick = (e) => {
    const card = e.currentTarget
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }, 200)

    dispatch({ type: 'SET_PEN', id: pen.id })
  }

  return (
    <div
      onClick={handleClick}
      className={cx(
        'Card',
        'flex items-center justify-center',
        'w-3/5 sm:w-2/6 h-card',
        'text-center',
        'snap-center shrink-0',
        'cursor-pointer',
        'transition-all duration-500 ease-in-out'
      )}
      style={styles}>
      <Cover html={html} css={css} />
    </div>
  )
}
