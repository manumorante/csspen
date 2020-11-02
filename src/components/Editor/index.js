import React, { useState } from 'react'
import './styles.css'
import Code from '../Code'
import Buttons from '../Buttons'
import Tag from '../Tag'
import Button from '../Button'

export default function Editor ({ pen }) {
  const [code, setCode] = useState(pen.steps[0].code)
  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step < pen.steps.length-1)
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

  return (
    <div className='Editor'>
      <div className='Editor__code'>
        <Buttons className='Editor__buttons'>
          <Button label='← Prev' action={handlePrev} />
          <Button label='↺ Reset' action={handleReset} />
          <Button label='Next →' action={handleNext} />
        </Buttons>

        <div className='Editor__step-info'>
          {pen.steps[step].description}
        </div>

        <Code handleUpdate={handleUpdate}>{code}</Code>
      </div>

      <div className='Editor__html'>
        <Tag html={pen.html} />
      </div>
    </div>
  )
}
