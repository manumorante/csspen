import React from 'react'
import { KeyStyle as S, layout } from '../js/Styles.js'

export default function Progress({ pen }) {
  //
  // TODO pensar en como hacer este condicional de forma global en Styles.js
  // const classes = (step) => {
  //   const cute = ''
  //   // Active - Current step
  //   if (step === pen.step) cute.push(layout.progressStep.active)

  //   // Completed - Completed step
  //   if (step < pen.step) cute.push(layout.progressStep.complete)
  //   cute.push(layout.progressStep.simple)

  //   return cute.join(' ')
  // }

  if (!pen.loaded || pen.steps.length <= 0) return false

  return (
    <div {...S(['progress', 'base'])}>
      {pen.steps.map((data, step) => (
        <span key={step} {...S(['progressStep', 'base'])}>
          {step + 1}
        </span>
      ))}
    </div>
  )
}
