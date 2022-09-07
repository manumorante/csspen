import React from 'react'
import cx from 'classnames'
import Cover from './Cover'

export default function Card({ pen, isActive, dispatch }) {
  const css = pen.steps[pen.steps.length - 1].css || ''
  const html = pen.html || ''
  const styles = { backgroundColor: pen.colors.c3, filter: isActive ? 'none' : 'brightness(0.3)' }

  return (
    <div
      onClick={() => dispatch({ type: 'SET_PEN', id: pen.id })}
      className={cx(
        'Card',
        'p-6',
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
