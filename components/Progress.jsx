import React, { useEffect, useRef } from 'react'
import cx from 'classnames'

function Step({ step, isDone, isActive, isTodo, whenDone }) {
  const stepRef = useRef()
  const SPEED = 18

  useEffect(() => {
    const setProgress = (value) => {
      if (stepRef.current) stepRef.current.style.width = value + '%'
    }

    if (!isActive) {
      setProgress(isDone ? 100 : 0)
      return () => clearInterval(interval)
    }

    let progress = 0
    const interval = setInterval(() => {
      setProgress(++progress)

      if (progress === 100) {
        clearInterval(interval)
        whenDone()
      }
    }, SPEED)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTodo, isActive, isDone])

  return (
    <div
      className={cx('grow transition-colors duration-500 ease-in', {
        'bg-white/40': isActive,
        'bg-white/20': !isActive,
      })}
      title={`Step ${step + 1}`}>
      <div ref={stepRef} className='h-1 bg-white' style={{ width: 0 }}></div>
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
