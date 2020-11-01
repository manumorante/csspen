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
    setCode(pen.steps[0].code)
  }

  const nextStep = () => {
    const newStep = step+1
    setStep(newStep)
    console.log(pen.steps[newStep].code)
    setCode(pen.steps[newStep].code)
  }

  const prevStep = () => {
    const newStep = step-1
    setStep(newStep)
    setCode(pen.steps[newStep].code)
  }

  const handleUpdate = (newCss) => {
    setCode(newCss)
  }

  // pen.steps[step].code

  return (
    <div className='Editor'>
      <div className='Editor__code'>
        <Buttons className='Editor__buttons'>
          <Button label='Prev' action={handlePrev} />
          <Button label='Next' action={handleNext} />
          <Button label='Reset' action={handleReset} />
        </Buttons>

        <Code css={code} handleUpdate={handleUpdate} />
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
