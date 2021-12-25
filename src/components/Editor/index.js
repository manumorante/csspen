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
  let play_interval

  const handleNext = () => {
    if (step < pen.steps.length - 1) {
      nextStep()
    }
  }

  const handlePrev = () => {
    if (step > 0)
      prevStep()
  }

  const handleReset = () => {
    setAndGoStep(0)
  }

  const handlePlay = () => {
    let paso = 0

    setAndGoStep(paso)

    play_interval = setInterval(() => {
      if (paso < pen.steps.length - 1) {
        paso = paso + 1
        setAndGoStep(paso)
      } else {
        clearInterval(play_interval)
      }
    }, 1000)
  }

  const nextStep = () => {
    const newStep = step + 1
    setStep(newStep)
    setAndGoStep(newStep)
  }

  const prevStep = () => {
    const newStep = step - 1
    setStep(newStep)
    setAndGoStep(newStep)
  }

  const setAndGoStep = (newStep) => {
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
          <Button label='Play' action={handlePlay} />
          <Button label='Anterior' action={handlePrev} />
          <Button label='Siguiente' action={handleNext} />
          <Button label='Reset' action={handleReset} />
        </Buttons>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
