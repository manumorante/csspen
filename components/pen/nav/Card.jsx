import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import Loading from '../../ui/Loading'
import Cover from './Cover'

export default function Card({ pen, isActive }) {
  const { id, html, name, info, steps } = pen

  const css = steps[steps.length - 1].css

  const linkStyle = {
    backgroundColor: pen.colors.c3,
    // borderColor: pen.colors.c1,
  }

  const textStyle = { color: pen.colors.c2 }

  if (!css) return <Loading />

  return (
    <Link href={`/${id}`}>
      <a
        className={cx(
          '[Card] py-10 px-7 transition-colors text-center sm:border-r-8',
          {
            'sm:border-red-600': isActive,
            'sm:border-neutral-900': !isActive,
          }
        )}
        style={linkStyle}>
        <Cover title={name} html={html} css={css} />
        <div
          className={cx('mt-8', {
            // hidden: !isActive,
          })}
          style={textStyle}>
          <div className='text-xl'>{name}</div>
          <div className='text-md opacity-80'>{info}</div>
        </div>
      </a>
    </Link>
  )
}
