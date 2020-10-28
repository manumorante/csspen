import React, { useState } from 'react'
import './styles.css'
import { usePen } from '../../hooks/usePen'
import Button from '../../components/Button'
import Spinner from '../../components/Spinner'
import Header from '../../components/Header'
import Tag from '../../components/Tag'
import Buttons from '../../components/Buttons'
import Editor from '../../components/Editor'

export default function Pen ({ params }) {
  const { id } = params
  const { loading, pen, totalSteps } = usePen(id)
  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step < totalSteps-1)
      nextStep()
  }

  const handlePrev = () => {
    if (step > 0)
      prevStep()
  }

  const handleReset = () => {
    setStep(0)
  }

  const nextStep = () => {
    setStep(step+1)
  }

  const prevStep = () => {
    setStep(step-1)
  }

    return (
    <div className='Pen'>
      {loading
      ? <Spinner/>
      : <>
          <Header/>

          <Buttons>
            <Button label='Prev' action={handlePrev} />
            <Button label='Next' action={handleNext} />
            <Button label='Reset' action={handleReset} />
          </Buttons>

          <div className='PenContent'>
            <Editor css={pen.steps[step].code} />

            <Tag html={pen.html} />
            <Tag html={`<style>${pen.steps[step].code}</style>`} />
          </div>
        </>
      }
    </div>
  )
}
