import React from 'react'
import { ArrowUturnLeftIcon, BoltIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import Button from '@/Button'

export default function StepsOptions(props) {
  const { i, total, isEditing, isChanged, isSaving, isCreating, isNew, onReset, onSave, onCreate } = props

  const isFirst = i === 0
  const isLast = i === total - 1 && !isFirst
  const stepNum = i + 1

  return (
    <div
      className={cx('flex justify-between gap-2 p-2', {
        'bg-black/20': isEditing && !isNew,
        'bg-red-500/20': isNew,
      })}>
      <Button>{stepNum}</Button>
      <div className='flex gap-1'>
        {isChanged && !isSaving && <Button label='Reset' icon={<ArrowUturnLeftIcon />} onClick={onReset} />}
        {isChanged && !isNew && !isSaving && <Button label='Save' icon={<BoltIcon />} onClick={onSave} />}
        {isSaving && <Button label='Saving' icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />}
        {isNew && !isCreating && <Button label='Create' onClick={onCreate} />}
        {isCreating && (
          <Button label='Creating' icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />
        )}
      </div>
    </div>
  )
}
