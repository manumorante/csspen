import React, { useState, createRef } from 'react'
import cx from 'classnames'
import { updateStepData } from 'database'
import Button from '@/Button'

export default function Editable({ value, penID, step, field, className, contentClassName }) {
  const [initialValue, setInitialValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const editableRef = createRef()

  if (field === undefined) return null

  const onSave = async () => {
    const newValue = editableRef.current.innerText
    const hasChanges = newValue !== initialValue

    if (!hasChanges) return

    const options = { penID, step: step + 1, update: { [field]: newValue } }

    const data = await updateStepData(options)
    if (data) {
      setInitialValue(newValue)
      setIsChanged(false)
      console.log('Saved')
    }
  }

  const onFocus = () => {
    setIsEditing(true)
  }

  const onInput = () => {
    const newValue = editableRef.current.innerText
    const hasChanges = newValue !== initialValue

    setIsChanged(hasChanges)
  }

  const onBlur = () => {
    setIsChanged(editableRef.current.innerText !== initialValue)
    setIsEditing(false)
  }

  const onReset = () => {
    editableRef.current.innerText = initialValue
    setIsChanged(false)
  }

  return (
    <div className={cx('Editable', 'flex flex-col gap-2 items-end', className)}>
      <div
        ref={editableRef}
        className={cx('w-full py-3 px-2 outline-0', 'focus:bg-black/20', contentClassName)}
        contentEditable='true'
        autoCorrect='off'
        autoComplete='off'
        autoCapitalize='off'
        spellCheck='false'
        suppressContentEditableWarning={true}
        //
        // Events
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        //
        // Content
        dangerouslySetInnerHTML={{ __html: value }}
      />
      {(isEditing || isChanged) && (
        <div className='flex gap-1 mt-1'>
          {isChanged && (
            <Button onClick={onReset} secondary>
              Reset
            </Button>
          )}
          <Button onClick={onSave}>Guardar</Button>
        </div>
      )}
    </div>
  )
}
