import React, { useState, useEffect } from 'react'
import './styles.scss'
import { parseCSS } from '../../lib/parseCSS'
import Code from '../Code'
import Buttons from '../Buttons'
import Button from '../Button'
import Tag from '../Tag'

export default function Editor ({ pen }) {
  const [rawCode, setRawCode] = useState(pen.steps[0].code)
  const [parsedCode, setParsedCode] = useState(parseCSS(pen.steps[0].code))
  const [autoPlay, setAutoPlay] = useState(false);
  const [step, setStep] = useState(0)
  const steps = pen.steps.length

  useEffect(() => {
    if(autoPlay) {
      const timeout = setTimeout(() => {
        if (step < steps - 1) {
          setAndGoStep(step + 1)
          setStep(step + 1)
        } else {
          setAutoPlay(false)
        }
      }, 1000)

      return () => { clearTimeout(timeout) }
    }
  }, [autoPlay, step])

  const handlePlayStop = () => {
    if(autoPlay) {
      setAutoPlay(false)
    } else {
      setAndGoStep(0)
      setStep(0)
      setAutoPlay(true)
    }
  }

  const handleNext = () => {
    setAutoPlay(false)

    if (step < steps - 1) {
      nextStep()
    }
  }

  const handlePrev = () => {
    setAutoPlay(false)

    if (step > 0)
      prevStep()
  }

  const handleReset = () => {
    setAutoPlay(false)
    setStep(0)
    setAndGoStep(0)
  }

  const nextStep = () => {
    setStep(step + 1)
    setAndGoStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
    setAndGoStep(step - 1)
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
          <Button label={`${step + 1}/${steps}`} />
          <Button label={autoPlay ? 'Stop' : 'Play'} action={handlePlayStop} />
          <div className='Buttons-group'>
            <Button label='<' action={handlePrev} disabled={step <= 0} />
            <Button label='>' action={handleNext} disabled={step >= steps-1} />
          </div>
          <Button label='Reset' action={handleReset} />
        </Buttons>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
