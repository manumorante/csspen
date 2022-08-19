import React from 'react'
import cx from 'classnames'
import Loading from '../../ui/Loading'
import Cover from './Cover'

export default function Card({ pen, isActive, dispatch }) {
  const { id, html, name, info, steps } = pen

  const css = steps[steps.length - 1].css

  const styles = {
    link: { backgroundColor: pen.colors.c3 },
    text: { color: pen.colors.c2 },
  }

  if (!css) return <Loading />

  return (
    <div
      onClick={() => dispatch({ type: 'SET_PEN', id })}
      className={cx(
        '[Card]',
        'p-6 sm:py-10 sm:px-7',
        'text-center',

        // Border
        'sm:border-r-8',
        {
          'sm:border-red-600': isActive,
          'sm:border-neutral-900': !isActive,
        },
        'cursor-pointer',
        'transition-all duration-500 ease-in-out'
      )}
      style={styles.link}>
      <Cover title={name} html={html} css={css} />

      <div className={cx('hidden sm:block mt-8')} style={styles.text}>
        <div className='text-xl'>{name}</div>
        <div className='text-md opacity-80'>{info}</div>
      </div>
    </div>
  )
}
