import React from 'react'
import {
  ArrowUturnLeftIcon,
  BoltIcon,
  ArrowPathIcon,
  TrashIcon,
  PlusCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  PlusSmallIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowRightIcon,
} from '@heroicons/react/20/solid'
import cx from 'classnames'
import Button from '@/Button'

export default function StepsOptions(props) {
  const {
    i,
    isEditing,
    isChanged,
    isSaving,
    isCreating,
    isNew,
    isWritingNewStep,
    onReset,
    onSave,
    onCreate,
    onNewPrev,
    onNewNext,
  } = props

  return (
    <div
      className={cx('h-12 flex items-center justify-between gap-2 p-2', {
        'bg-black/20': isEditing && !isNew,
        'bg-red-500/20': isNew,
      })}>
      <div className='flex gap-1'>
        <div></div>
        {!isCreating && !isWritingNewStep && <Button icon={<PlusIcon />} onClick={() => onNewPrev(i)} />}
      </div>
      <div className='flex gap-1'>
        {isChanged && !isSaving && <Button label='Reset' icon={<ArrowUturnLeftIcon />} onClick={onReset} />}
        {isChanged && !isNew && !isSaving && <Button label='Save' icon={<BoltIcon />} onClick={onSave} />}
        {isSaving && <Button label='Saving' icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />}
        {isNew && !isCreating && <Button label='Create' onClick={onCreate} />}
        {isCreating && (
          <Button label='Creating' icon={<ArrowPathIcon className='animate-spin' />} className='w-auto h-8' />
        )}
        {!isCreating && !isWritingNewStep && <Button icon={<PlusIcon />} onClick={() => onNewNext(i)} />}
      </div>
    </div>
  )
}
