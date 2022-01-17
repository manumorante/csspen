import React, { useState, useEffect } from 'react'
import { parseCSS } from '../../lib/parseCSS'
import Code from '../Code'
import Buttons from '../Buttons'
import Button from '../Button'
import Tag from '../Tag'
import './styles.scss'

export default function Editor ({ pen }) {
  const [rawCode, setRawCode] = useState()
  const [parsedCode, setParsedCode] = useState()
  const [autoplay, setAutoplay] = useState()
  const [step, setStep] = useState(0)

  // Load pen, set Step to 0
  useEffect(() => {
    setStep(0)
    setAutoplay(true)
  }, [pen])

  // When step changes
  useEffect(() => {
    const code = pen.steps[step]?.code || null
    if(!code) return

    setRawCode(code)
    setParsedCode(parseCSS(code))
  }, [step])

  // Play
  useEffect(() => {
    if(autoplay) {
      const timeout = setTimeout(() => {
        if (step >= pen.steps.length - 1) {
          setAutoplay(false)
        } else {
          setStep(step + 1)
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
    if (step < pen.steps.length - 1) {
      setAutoplay(false)
      setStep(step + 1)
    }
  }

  function handlePrev() {
    if (step > 0) {
      setAutoplay(false)
      setStep(step - 1)
    }
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

        <Buttons className='Editor__buttons'>
          { pen.steps.length ?
            <>
              <Button label={autoplay ? 'Stop' : 'Play'} action={handlePlayStop} />
              <Button label={`${step + 1}/${pen.steps.length}`} disabled={true} />
              <Button label='<' action={handlePrev} disabled={step <= 0} />
              <Button label='>' action={handleNext} disabled={step >= pen.steps.length-1} />
            </>
            :
            <Button label='Fixed paint' disabled={true} />
          }
          <Button className='button--more' label='More!' to='/' />
        </Buttons>
      </div>

      <Tag html={pen.html} className='Editor__html' />
    </div>
  )
}
