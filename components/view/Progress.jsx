import React from 'react'
import cx from 'classnames'
import Step from './Step'

export default function Progress({ state }) {
  const total = state?.pen?.steps?.length || 4
  const steps = Array(total).fill(0)
  const active = state?.step || 0

  return (
    <div
      className={cx(
        'Progress',
        'absolute left-0 right-0 bottom-10',
        'hidden sm:flex justify-center items-center',
        {
          'pointer-events-none opacity-40': !state?.loaded,
        }
      )}>
      <div className='flex justify-center items-center'>
        {steps.map((_, step) => (
          <Step key={step} step={step} active={step === active} />
        ))}
      </div>
    </div>
  )
}
