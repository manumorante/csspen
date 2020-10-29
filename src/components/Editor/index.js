import React, { useState } from 'react'
import './styles.css'
import Code from '../Code'
import Buttons from '../Buttons'
import Tag from '../Tag'
import Button from '../Button'

export default function Editor ({ pen }) {
  const [code, setCode] = useState(pen.steps[0].code)
  const [step, setStep] = useState(1)
  const totalSteps = pen.steps.length

  const handleNext = () => {
    if (step < totalSteps-1)
      nextStep()
  }

  const handlePrev = () => {
    if (step > 0)
      prevStep()
  }

  const handleReset = () => {
    setStep(0)
  }

  const nextStep = () => {
    setStep(step+1)
  }

  const prevStep = () => {
    setStep(step-1)
  }

  const handleUpdate = (newCss) => {
    setCode(newCss)
  }

  // pen.steps[step].code

  return (
    <div className='PenContent'>
      <div className='Editor'>
        <Buttons>
          <Button label='Prev' action={handlePrev} />
          <Button label='Next' action={handleNext} />
          <Button label='Reset' action={handleReset} />
        </Buttons>
        <Code css={code} handleUpdate={handleUpdate} />
        <Tag html={pen.html} />
      </div>
    </div>
  )
}
