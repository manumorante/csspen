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

  useEffect(() => {
    if(autoPlay){
      const interval = setInterval(() => {
        if (step < pen.steps.length - 1) {
          setAndGoStep(step + 1)
          setStep(step + 1)
        } else {
          setAutoPlay(false)
        }
      }, 1000)

      return () => {
        console.log('clearing interval...')
        return clearInterval(interval)
      }
    }
  }, [autoPlay, step])

  const handlePlay = () => {
    setAndGoStep(0)
    setStep(0)
    setAutoPlay(true)
  }

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
          <Button label={`${step + 1}/${pen.steps.length}`} />
          <Button label='Play' action={handlePlay} />
          <div className='Buttons-group'>
            <Button label='<' action={handlePrev} disabled={step <= 0} />
            <Button label='>' action={handleNext} disabled={step >= pen.steps.length-1} />
          </div>
          <Button label='Reset' action={handleReset} />
        </Buttons>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
