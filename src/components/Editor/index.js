import React, { useState } from 'react'
import './styles.scss'
import { parseCSS } from '../../lib/parseCSS'
import Code from '../Code'
import Buttons from '../Buttons'
import Button from '../Button'
import Tag from '../Tag'

export default function Editor ({ pen }) {
  const [rawCode, setRawCode] = useState(pen.steps[0].code)
  const [parsedCode, setParsedCode] = useState(parseCSS(pen.steps[0].code))
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
    setRawCode(pen.steps[newStep].code)
    setParsedCode(parseCSS(pen.steps[newStep].code))
  }

  const handleUpdateRawCode = (code) => {
    setRawCode(code)
  }

  return (
    <div className='Editor' style={{background: pen.bg}}>
      <div className='Editor__code'>
        <div className='Editor__step-info'>
          {pen.steps[step].description}
        </div>

        <Code
          className="Editor__textarea"
          parsedCode={parsedCode}
          handleUpdateRawCode={handleUpdateRawCode}>{rawCode}</Code>

        <Buttons className='Editor__buttons'>
          <Button label='← Prev' action={handlePrev} />
          <Button label='↺ Reset' action={handleReset} />
          <Button label='Next →' action={handleNext} />
        </Buttons>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
