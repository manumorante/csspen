import React, { useState, useCallback } from 'react'
import { updateStepData, addStep } from 'database'
import StepEditor from '@/admin/StepEditor'
import StepsOptions from './StepOptions'

export default function Step(props) {
  const { penID, i, total, html, css: initialCSS, bg, isNew: _isNew } = props

  const [css, setCss] = useState(initialCSS)
  const [cssInitial, setCssInitial] = useState(initialCSS)
  const [isEditing, setIsEditing] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isNew, setIsNew] = useState(_isNew)

  const onSave = async () => {
    if (isSaving || isCreating) return

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

  const onCreate = async () => {
    if (isSaving || isCreating) return

    setIsCreating(true)
    const options = { penID, step: i + 1, css }
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

  return (
    <div className='Step snap-center grow sm:grow-0'>
      <div className='w-screen sm:w-80'>
        <StepsOptions
          i={i}
          total={total}
          
          isNew={isNew}
          isEditing={isEditing}
          isChanged={isChanged}
          isSaving={isSaving}
          isCreating={isCreating}

          onReset={onReset}
          onSave={onSave}
          onCreate={onCreate}
        />
        <StepEditor i={i} html={html} bg={bg} css={css} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
      </div>
    </div>
  )
}
