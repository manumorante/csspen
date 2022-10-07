import React from 'react'
import { ArrowUturnLeftIcon, BoltIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import Button from '@/Button'

export default function StepsOptions({ app, step }) {
  return (
    <div
      className={cx('h-12 flex items-center justify-between gap-2 p-2', {
        'bg-black/20': step.isEditing && !step.isNew,
        'bg-red-500/20': step.isNew,
      })}>
      <div className='flex gap-1'>
        <div></div>
        {!step.isCreating && !app.isWritingNewStep && (
          <Button icon={<PlusIcon />} onClick={() => app.onNewPrev(step.index)} />
        )}
      </div>
      <div className='flex gap-1'>
        {step.isChanged && !step.isSaving && (
          <Button label='Reset' icon={<ArrowUturnLeftIcon />} onClick={step.onReset} />
        )}
        {step.isChanged && !step.isNew && !step.isSaving && (
          <Button label='Save' icon={<BoltIcon />} onClick={step.onSave} />
        )}
        {step.isSaving && (
          <Button label='Saving' icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />
        )}
        {step.isNew && !step.isCreating && <Button label='Create' onClick={step.onCreate} />}
        {step.isCreating && (
          <Button label='Creating' icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />
        )}
        {!step.isCreating && !app.isWritingNewStep && (
          <Button icon={<PlusIcon />} onClick={() => app.onNewNext(step.index)} />
        )}
      </div>
    </div>
  )
}
