import React from 'react'
import { layout } from '../styles'

export default function Progress({ pen }) {
  const classes = (step) => {
    const cute = [layout.progress.item.base]
    if (step === pen.step) cute.push(layout.progress.item.active)
    if (step < pen.step) cute.push(layout.progress.item.complete)
    cute.push(layout.progress.item.simple)

    return cute.join(' ')
  }

  if (!pen.loaded || pen.steps.length <= 0) return false

  return (
    <div className={`Progress ease-out ${layout.progress.base}`}>
      {pen.steps.map((data, step) => (
        <span key={step} className={classes(step)}>
          {step + 1}
        </span>
      ))}
    </div>
  )
}
