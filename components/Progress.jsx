import React, { useEffect, useRef } from 'react'

function Step({ step, isDone, isActive, isTodo, whenDone }) {
  const stepRef = useRef()
  const frameRef = useRef()

  useEffect(() => {
    const setProgress = (value) => {
      if (stepRef.current) stepRef.current.style.width = value + '%'
    }

    let time = 0
    const anima = () => {
      setProgress(++time)

      if (time >= 100) {
        whenDone()
      } else {
        frameRef.current = requestAnimationFrame(anima)
      }
    }

    setProgress(isDone ? 100 : 0)
    if (!isActive) return () => cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(anima)

    return () => cancelAnimationFrame(frameRef.current)
  }, [isTodo, isActive, isDone, whenDone])

  return (
    <div className='grow bg-white/30' title={`Step ${step + 1}`}>
      <div ref={stepRef} className='h-1 bg-white'></div>
    </div>
  )
}

export default function Progress({ total, active, whenStepDone }) {
  return (
    <div className='Progress flex gap-1 xs:px-4 xs:pt-4'>
      {Array.from({ length: total }, (_, i) => (
        <Step
          key={i}
          step={i}
          isDone={i < active}
          isActive={i === active}
          isTodo={i > active}
          whenDone={whenStepDone}
        />
      ))}
    </div>
  )
}
