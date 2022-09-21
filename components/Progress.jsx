import React, { useEffect, useRef } from 'react'

function Step({ callback }) {
  const stepRef = useRef()

  useEffect(() => {
    let progress = 0

    const setWidth = (el, value) => {
      if (el) el.style.width = `${value}%`
    }

    const interval = setInterval(() => {
      setWidth(stepRef.current, ++progress)

      if (progress === 100) {
        clearInterval(interval)
        callback()
      }
    }, 16)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='Step h-1 grow bg-white/60'>
      <div ref={stepRef} className='h-1 bg-white' style={{ width: '0%' }}></div>
    </div>
  )
}

function Prev() {
  return <div className='Prev h-1 grow bg-white'></div>
}

function Next() {
  return <div className='Prev h-1 grow bg-white/30'></div>
}

function Steps({ total, active, whenDone }) {
  const renderStep = (i) => {
    if (i < active) return <Prev key={i} />
    if (i === active) return <Step key={i} callback={whenDone} />
    return <Next key={i} />
  }

  return (
    <div className='Steps flex gap-1 xs:px-4 xs:pt-4'>
      {Array.from({ length: total }, (_, i) => {
        return renderStep(i)
      })}
    </div>
  )
}

export default function Progress({ state, dispatch }) {
  const handleStepDone = () => dispatch({ type: 'NEXT_STEP' })
  return <Steps total={state.pen.steps.length} active={state.step} whenDone={handleStepDone} />
}
