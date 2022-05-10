import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Loading from './Loading'
import Cover from './Cover'

export default function Card({ pen, isActive }) {
  const { id, html, name, info, pen_steps } = pen
  const code = pen_steps.at(-1)?.code

  const linkClass = classnames('[Card]', {
    'py-10 px-7 sm:border-r-4 sm:transition-opacity text-center': true,
    'sm:opacity-100 sm:border-red-700': isActive,
    'sm:border-neutral-900 sm:opacity-60 hover:opacity-100': !isActive,
  })

  const linkStyle = { backgroundColor: pen.bg }

  return (
    <Loading until={code}>
      <Link className={linkClass} to={`/pen/${id}`} style={linkStyle}>
        <Cover title={name} html={html} css={code} />
        <div className='text-xl text-neutral-100'>{name}</div>
        <div className='text-md text-neutral-400'>{info}</div>
      </Link>
    </Loading>
  )
}
