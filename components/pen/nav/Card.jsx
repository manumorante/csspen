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
        '[Card] py-10 px-7 transition-colors text-center sm:border-r-8 cursor-pointer',
        {
          'sm:border-red-600': isActive,
          'sm:border-neutral-900': !isActive,
        },
        'transition-all duration-500 ease-in-out',
      )}
      style={styles.link}>
      <Cover title={name} html={html} css={css} />
      <div
        className={cx('mt-8', {
          // hidden: !isActive,
        })}
        style={styles.text}>
        <div className='text-xl'>{name}</div>
        <div className='text-md opacity-80'>{info}</div>
      </div>
    </div>
  )
}
