import React from 'react'
import { ArrowUturnLeftIcon, BoltIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/20/solid'
import cx from 'clsx'
import Button from '@/components/ds/Button'

export default function StepsOptions({ app, step }) {
  const WORKING = step.isWorking
  const NEW = step.isNew && !WORKING
  const DEFAULT = !NEW && !WORKING

  return (
    <div className={cx('w-full h-12 p-2')}>
      {WORKING && (
        <div className='flex justify-end gap-1'>
          <Button label={step.isWorking[1]} icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />
        </div>
      )}

      {NEW && (
        <div className='flex justify-end gap-1'>
          {step.isNew && <Button label='Cancel' onClick={app.onCancelNewStep} />}
          {step.isNew && <Button label='Save new step' icon={<BoltIcon />} onClick={step.onAddStep} />}
        </div>
      )}

      {DEFAULT && (
        <div className='flex items-center justify-between gap-1'>
          <Button icon={<PlusIcon />} onClick={() => app.onNewPrev(step.index)} />
          {step.isChanged && <Button label='Reset' icon={<ArrowUturnLeftIcon />} onClick={step.onReset} />}
          {step.isChanged && !step.isNew && <Button label='Save' icon={<BoltIcon />} onClick={step.onSave} />}
          <Button icon={<PlusIcon />} onClick={() => app.onNewNext(step.index)} />
        </div>
      )}
    </div>
  )
}
