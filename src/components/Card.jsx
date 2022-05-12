import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Loading from './Loading'
import Cover from './Cover'

export default function Card({ pen, isActive }) {
  const { id, html, name, info, steps } = pen
  const css = steps.at(-1)?.css

  const linkClass = classnames(
    '[Card] py-10 px-7 transition-all text-center',
    {
      'sm:border-r-8 sm:opacity-100': isActive,
      'sm:opacity-70 hover:opacity-100': !isActive,
    }
  )

  const linkStyle = {
    backgroundColor: pen.colors.c3,
    borderColor: pen.colors.c1,
  }

  const textClass = classnames('mt-8', {
    hidden: !isActive,
  })

  const textStyle = { color: pen.colors.c2 }

  return (
    <Loading until={css}>
      <Link className={linkClass} to={`/pen/${id}`} style={linkStyle}>
        <Cover title={name} html={html} css={css} />
        <div className={textClass} style={textStyle}>
          <div className='text-xl'>{name}</div>
          <div className='text-md opacity-80'>{info}</div>
        </div>
      </Link>
    </Loading>
  )
}
