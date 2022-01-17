import React, { useState, useEffect } from 'react'
import { parseCSS } from '../../lib/parseCSS'
import Code from '../Code'
import Buttons from '../Buttons'
import Button from '../Button'
import Tag from '../Tag'
import './styles.scss'

export default function Editor ({ pen }) {
  const [rawCode, setRawCode] = useState(false)
  const [parsedCode, setParsedCode] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true);
  const [step, setStep] = useState(0)

  // Load pen
  useEffect(() => {
    setStep(0)
  }, [pen])

  // When step changes
  useEffect(() => {
    setRawCode(pen.steps[step].code)
    setParsedCode(parseCSS(pen.steps[step].code))
  }, [step])

  // Autoplay
  useEffect(() => {
    if(autoPlay) {
      const timeout = setTimeout(() => {
        if (step >= pen.steps.length ) {
          setAutoPlay(false)
        } else {
          setStep(step + 1)
        }
      }, 1000)

      return () => { clearTimeout(timeout) }
    }
  }, [autoPlay, step, pen.steps])

  const handlePlayStop = () => {
    setAutoPlay(!autoPlay)
  }

  const handleNext = () => {
    setAutoPlay(false)
    nextStep()
  }

  const handlePrev = () => {
    setAutoPlay(false)
    prevStep()
  }

  const nextStep = () => {
    if (step < pen.steps.length - 1) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleUpdateRawCode = (code) => {
    // setRawCode(code)
    return false
  }

  return (
    <div className='Editor' style={{background: pen.bg}}>
      <div className='Editor__code'>
        { pen.steps[step]?.info ?
          <div className='Editor__step-info'>{pen.steps[step].info}</div> : null }


        <Code
          className="Editor__textarea"
          parsedCode={parsedCode}
          handleUpdateRawCode={handleUpdateRawCode}>{rawCode}</Code>

        <Buttons className='Editor__buttons'>
          {pen.steps.length > 1
            ? <>
                <Button label={autoPlay ? 'Stop' : 'Play'} action={handlePlayStop} />
                <Button label={`${step + 1}/${pen.steps.length}`} disabled={true} />
                <div className='Buttons-group'>
                  <Button label='<' action={handlePrev} disabled={step <= 0} />
                  <Button label='>' action={handleNext} disabled={step >= pen.steps.length-1} />
                </div>
              </>
            : <Button label='Fixed paint' disabled={true} />
            }
            <Button className='button--more' label='More!' to='/' />

        </Buttons>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
