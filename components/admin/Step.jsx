import React, { useState, useCallback } from 'react'
import { addStep, deleteStep, getPens, getUserByCookie, updateStepData } from 'database'
import { PlusCircleIcon, TrashIcon, ArrowUturnLeftIcon, BoltIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import Button from '@/Button'
import StepEditor from '@/admin/StepEditor'

function Options(props) {
  const { i, total, isEditing, isChanged, isSaving, onReset, onSave } = props
  const isFirst = i === 0
  const isLast = i === total - 1 && !isFirst
  const stepNum = i + 1

  return (
    <div className={cx('flex justify-between gap-2 p-2', { 'bg-black/20': isEditing })}>
      <Button>{stepNum}</Button>
      <div className='flex gap-1'>
        {isChanged && !isSaving && (
          <Button onClick={onReset}>
            <ArrowUturnLeftIcon />
            <div>Reset</div>
          </Button>
        )}

        {isChanged && !isSaving && (
          <Button onClick={onSave}>
            <BoltIcon />
            <div>Save</div>
          </Button>
        )}

        {isSaving && (
          <Button className='w-auto h-8'>
            <ArrowPathIcon className='animate-spin' />
            <div>Saving</div>
          </Button>
        )}

        {/* {isLast && !isFirst && (
          <Button onClick={() => handleDeleteStep({ num: stepNum })}>
            <TrashIcon />
          </Button>
        )} */}

        {/* {isNew && (
        <>
        <Button onClick={() => cancelNewStep(i)}>
        <ArrowUturnLeftIcon />
        </Button>
        <Button onClick={() => saveNewStep({ step: step.num, info: step.info, css: step.css })}>Save</Button>
        </>
      )} */}
      </div>
    </div>
  )
}

export default function Step({ penID, i, total, html, css: initialCSS, bg }) {
  const [css, setCss] = useState(initialCSS)
  const [cssInitial, setCssInitial] = useState(initialCSS)
  const [isEditing, setIsEditing] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const onSave = async () => {
    setIsSaving(true)

    const options = { penID, step: i + 1, update: { css } }
    const data = await updateStepData(options)

    if (data) {
      setIsEditing(false)
      setIsChanged(false)
      setIsSaving(false)
      setCssInitial(css)
    }
  }

  const onChange = useCallback(
    (value, _viewUpdate) => {
      const hasChanges = value !== cssInitial
      setIsChanged(hasChanges)
      if (hasChanges) setCss(value)
    },
    [cssInitial]
  )

  const onFocus = () => {
    setIsEditing(true)
  }

  const onBlur = () => {
    setIsEditing(false)
  }

  const onReset = () => {
    setCss(cssInitial)
    setIsChanged(false)
  }

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div className='w-screen sm:w-80'>
        <Options
          i={i}
          total={total}
          isEditing={isEditing}
          isChanged={isChanged}
          isSaving={isSaving}
          onReset={onReset}
          onSave={onSave}
        />
        <StepEditor i={i} html={html} bg={bg} css={css} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
      </div>
    </div>
  )
}
