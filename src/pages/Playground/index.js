import React, { useState } from 'react'
import { usePen } from '../../hooks/usePen'
import Tag from '../../components/Tag'
import Button from '../../components/Button'
import Spinner from '../../components/Spinner'

export default function Playground ({ params }) {
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

  const nextStep = () => {
    setStep(step+1)
  }

  const prevStep = () => {
    setStep(step-1)
  }

    return (
    <div className='Page Playground'>
      {loading
      ? <Spinner/>
      : <div>
          <h2 className='Page__title'>{pen.name} - {pen.description}</h2>
          <p>Step {step+1}</p>
          <Button label='Next step' action={handleNext} />
          <Button label='Prev step' action={handlePrev} />

          {pen.steps[step].description}

          <Tag html={pen.html} />
          <Tag html={`<style>${pen.steps[step].code}</style>`} />
        </div>
      }
    </div>
  )
}
