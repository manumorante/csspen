import React, { useState } from 'react'
import { usePen } from '../../hooks/usePen'
import Placeholder from '../../components/Placeholder'
import Button from '../../components/Button'

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
      ? <div>loading pen</div>
      : <div>
          <h2 className='Page__title'>{pen.name} - {pen.description}</h2>
          <p>Step {step+1}</p>
          <Button label='Next step' action={handleNext} />
          <Button label='Prev step' action={handlePrev} />

          {pen.steps[step].description}

          <Placeholder html={pen.html} />
        </div>
      }
    </div>
  )
}
