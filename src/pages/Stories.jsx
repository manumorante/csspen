import React, { useState, useEffect } from 'react'
import { useApiContext } from '../context/ApiContext'
import Story from '../components/Story'
import Nav from '../components/stories/nav'
import User from '../components/stories/User'

export default function Stories() {
  const { state } = useApiContext()
  const time = 2000
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!state.loaded) return

    const interval = setTimeout(() => {
      if (active < state.pens.length - 1) {
        setActive(active + 1)
      } else {
        setActive(0)
      }
    }, time)

    console.log(state.loaded)

    return () => clearTimeout(interval)
  }, [state.loaded, active])

  if (!state.loaded) return null

  return (
    <div className='[Stories] h-full grid grid-rows-[62px_auto]'>
      <header className='p-2'>
        <Nav pens={state.pens} active={active} />
        <User />
      </header>

      <div className='m-3 p-2 rounded-md border border-white/20'>
        <iframe
          className='w-full h-full'
          src={`/alone/${state.pens[active].id}`}></iframe>
      </div>
    </div>
  )
}
