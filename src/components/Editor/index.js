import React, { useState } from 'react'
import './styles.scss'
import Code from '../Code'
import Buttons from '../Buttons'
import Button from '../Button'
import Tag from '../Tag'

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
    setAndGoStep(0)
  }

  const nextStep = () => {
    const newStep = step+1
    setAndGoStep(newStep)
  }

  const prevStep = () => {
    const newStep = step-1
    setAndGoStep(newStep)
  }

  const setAndGoStep = (newStep) => {
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

      <div className='Editor__html' style={{background: pen.bg}}>
        <Tag html={pen.html} />
      </div>
    </div>
  )
}
