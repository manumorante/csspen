import React, { useState, useEffect } from 'react'
import { useApiContext } from '../context/ApiContext'
import Loading from '../components/Loading'
import User from '../components/stories/User'
import Nav from '../components/stories/Nav'
import Cover from '../components/Cover'

export default function Stories() {
  const { state } = useApiContext()
  const [active, setActive] = useState(0)
  const [pen, setPen] = useState({
    html: '',
    css: '',
  })

  useEffect(() => {
    if (!state.loaded) return

    const newPen = state.pens[active]
    const stepObj = newPen.pen_steps.at(-1)

    setPen({
      html: newPen.html,
      css: stepObj.code,
    })
  }, [state.loaded, active])

  useEffect(() => {
    const interval = setTimeout(() => {
      if (active < state.pens.length - 1) {
        setActive(active + 1)
      } else {
        setActive(0)
      }
    }, 2000)

    return () => clearTimeout(interval)
  }, [state.loaded, active])

  return (
    <Loading until={state.loaded}>
      <div className='[Stories] h-full grid grid-rows-[62px_auto]'>
        <header className='p-2'>
          <Nav pens={state.pens} active={active} />
          <User />
        </header>

        <Cover html={pen.html} css={pen.css} />
      </div>
    </Loading>
  )
}
