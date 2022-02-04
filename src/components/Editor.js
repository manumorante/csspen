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

  // Load pen, set Step to 0
  useEffect(() => {
    setStep(0)
    setTotalSteps(pen.steps.length)
    setAutoplay(false)
  }, [pen])

   // When step changes
  useEffect(() => {
    const code = pen.steps[step]?.code || null
    if(!code) return

    setRawCode(code)
    setParsedCode(parseCSS(code))
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

  function handleNext() {
    if (step + 1 >= totalSteps) return

    setAutoplay(false)
    setStep(step => step + 1)
  }

  function handlePrev() {
    if (step <= 0) return

    setAutoplay(false)
    setStep(step => step - 1)
  }

  function handleMore() {
    // TODO: use State, Context, ...
    document.querySelector('body').classList.add('show-pen-list')
  }

  const handleUpdateRawCode = (code) => {
    setRawCode(code)
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

        <div className='Buttons Editor__buttons'>
          { totalSteps ?
            <>
              <Button label={autoplay ? 'Stop' : 'Play'} action={handlePlayStop} />
              <Button label={`${step + 1}/${totalSteps}`} disabled={true} />
              <Button label='<' action={handlePrev} disabled={step <= 0} />
              <Button label='>' action={handleNext} disabled={step + 1 >= totalSteps} />
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
