import React, { useState, useEffect } from 'react'
import { parseCSS } from '../lib/parseCSS'
import Code from './Code'
import Button from './Button'
import Tag from './Tag'

export default function Editor ({ pen }) {
  const [rawCode, setRawCode] = useState()
  const [parsedCode, setParsedCode] = useState()
  const [autoplay, setAutoplay] = useState()
  const [step, setStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [stepInfo, setStepInfo] = useState()

  // Load pen, set Step to 0
  useEffect(() => {
    setStep(0)
    setStepInfo(pen.steps[0]?.info)
    setTotalSteps(pen.steps.length)
    setAutoplay(true)
  }, [pen])

   // When step changes
  useEffect(() => {
    const newStep = pen.steps[step]
    if(!newStep) return

    const newInfo = newStep?.info || `Step ${step + 1}`

    setRawCode(newStep.code)
    setParsedCode(parseCSS(newStep.code))
    setStepInfo(newInfo)
  }, [step, pen.steps])

  // Play
  useEffect(() => {
    if(autoplay) {
      const timeout = setTimeout(() => {
        if (step >= pen.steps.length - 1) {
          setAutoplay(false)
        } else {
          setStep(step => step + 1)
        }
      }, 1000)

      return () => {
        // useEffect callback return function
        clearTimeout(timeout)
      }
    }
  }, [autoplay, step, pen.steps])

  function handlePlayStop() {
    const newAutoplay = !autoplay
    setAutoplay(newAutoplay)
  }

  // Functions to check is can move to next or previous step
  const notNext = () => step + 1 >= totalSteps
  const notPrev = () => step <= 0

  function handleNext() {
    if (notNext()) return

    setAutoplay(false)
    setStep(step => step + 1)
  }

  function handlePrev() {
    if (notPrev()) return

    setAutoplay(false)
    setStep(step => step - 1)
  }

  // Mobile menu with the list of Pens
  function handleMore() {
    // TODO: use State, Context, ...
    document.querySelector('body').classList.add('show-pen-list')
  }

  const handleUpdateRawCode = setRawCode

  return (
    <div className='Editor' style={{background: pen.bg}}>
      <div className='Editor__code'>
        <div className='Editor__step-info'>{stepInfo}</div>

        <Code
          parsedCode={parsedCode}
          handleUpdateRawCode={handleUpdateRawCode}>{rawCode}</Code>

        <div className='Buttons Editor__buttons'>
          { totalSteps ?
            <>
              <Button label={autoplay ? 'Stop' : 'Play'} action={handlePlayStop} />
              <Button label={`${step + 1}/${totalSteps}`} disabled={true} />
              <Button label='<' action={handlePrev} disabled={notPrev()} />
              <Button label='>' action={handleNext} disabled={notNext()} />
            </>
            :
            <Button label='Fixed paint' disabled={true} />
          }
          <Button className='button--more' label='More!' action={handleMore} />
        </div>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
