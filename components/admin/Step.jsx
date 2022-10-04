import React, { useState, useCallback } from 'react'
import { updateStepData } from 'database'
import StepEditor from '@/admin/StepEditor'
import StepsOptions from './StepOptions'

export default function Step(props) {
  const { penID, i, total, html, css: initialCSS, bg, isNew } = props

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
          onReset={onReset}
          onSave={onSave}
        />
        <StepEditor i={i} html={html} bg={bg} css={css} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
      </div>
    </div>
  )
}
