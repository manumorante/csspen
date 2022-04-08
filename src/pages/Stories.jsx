import React, { useState, useEffect } from 'react'
import Story from '../components/Story'

export default function Stories() {
  const time = 1000
  const [active, setActive] = useState(0)
  const [pens, setPens] = useState([
    { slug: 'uno' },
    { slug: 'dos' },
    { slug: 'tres' },
    { slug: 'cuatro' },
    { slug: 'cinco' },
    { slug: 'seis' },
    { slug: 'siete' },
  ])

  useEffect(() => {
    function handleTouchStart(e) {
      const touch = e.touches[0]
    }

    function handleTouchMove(e) {
      const touch = e.touches[0]
    }

    function handleTouchEnd(e) {
      const touch = e.changedTouches[0]
      const x = touch.clientX
      const y = touch.clientY
      const w = window.innerWidth
      const h = window.innerHeight
      const xPercent = x / w
      const yPercent = y / h
      const xDirection = xPercent > 0.5 ? 1 : -1
      const yDirection = yPercent > 0.5 ? 1 : -1
      const direction =
        xDirection === 1 && yDirection === 1
          ? 'up'
          : xDirection === 1 && yDirection === -1
          ? 'right'
          : xDirection === -1 && yDirection === 1
          ? 'left'
          : xDirection === -1 && yDirection === -1
          ? 'down'
          : 'none'
      console.log(direction)
      if (direction === 'up') {
        setActive(active - 1)
      } else if (direction === 'down') {
        setActive(active + 1)
      }
    }

    document.body.addEventListener('touchstart', handleTouchStart, false)
    document.body.addEventListener('touchmove', handleTouchMove, false)
    document.body.addEventListener('touchend', handleTouchEnd, false)

    return () => {
      document.body.removeEventListener('touchstart', handleTouchStart, false)
      document.body.removeEventListener('touchmove', handleTouchMove, false)
      document.body.removeEventListener('touchend', handleTouchEnd, false)
    }
  }, [])

  useEffect(() => {
    const interval = setTimeout(() => {
      if (active < pens.length - 1) {
        setActive(active + 1)
      } else {
        setActive(0)
      }
    }, time)
    return () => clearTimeout(interval)
  }, [pens, active])

  return (
    <div className='[Stories]'>
      <header className='p-2'>
        <nav className='w-full h-[2px] flex items-stretch gap-1'>
          {pens.map((pen, i) => (
            <div
              key={i}
              className={`w-9 grow transition-colors ${
                active === i ? 'bg-white' : 'bg-white/50'
              }`}></div>
          ))}
        </nav>
        <div className='flex items-center gap-2 ml-2 mt-3'>
          <div className='avatar flex items-center justify-center w-8 h-8 rounded-full border border-white'>
            M
          </div>
          <div className='name text-sm'>manumorante</div>
        </div>
      </header>
      <div className='pen - m-3 p-2 rounded-md border border-white/20'>
        <Story />
        <h1>{pens[active].slug}</h1>
      </div>
    </div>
  )
}
