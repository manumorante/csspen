import React, { useState, useCallback } from 'react'
import { updateStepData, addStep } from 'database'
import StepEditor from '@/admin/StepEditor'
import StepsOptions from './StepOptions'

export default function Step({ app, pen, step }) {
  const [css, setCss] = useState(step.css)
  const [cssInitial, setCssInitial] = useState(step.css)
  const [isEditing, setIsEditing] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const onSave = async () => {
    if (isSaving || isCreating) return

    setIsSaving(true)
    const options = { penID: pen.id, step: step.index + 1, update: { css } }
    const data = await updateStepData(options)

    if (data) {
      setIsEditing(false)
      setIsChanged(false)
      setIsSaving(false)
      setCssInitial(css)
    }
  }

  const onCreate = async () => {
    if (isSaving || isCreating) return

    setIsCreating(true)
    const options = { penID: pen.id, step: step.index + 1, css }
    const data = await addStep(options)

    if (data) {
      setIsEditing(false)
      setIsChanged(false)
      setIsCreating(false)
      setIsNew(false)
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

  const onFocus = () => setIsEditing(true)
  const onBlur = () => setIsEditing(false)

  const onReset = () => {
    setCss(cssInitial)
    setIsChanged(false)
  }

  const stepProps = {
    ...step,
    isEditing,
    isChanged,
    isSaving,
    isCreating,
    onSave,
    onCreate,
    onChange,
    onReset,
  }

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div className='w-screen sm:w-80'>
        <StepsOptions app={app} step={stepProps} />

        <div className='h-20 flex w-full'>
          <div className='flex items-center p-3 text-white/50 font-medium text-xl bg-black/30'>{step.index + 1}</div>
          <div className='p-3 bg-black/20 w-full'>{step.info}</div>
        </div>
        
        <StepEditor
          i={step.index}
          html={pen.html}
          bg={pen.bg}
          css={css}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}
