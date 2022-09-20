import React from 'react'
import { updatePenData, updateStepData } from 'database'
import cx from 'classnames'
import ContentEditable from './ContentEditable'

export default function Editable({
  value,
  placeholder,
  penID,
  step = undefined,
  field,
  isCode,
  readOnly,
  onChange,
  className,
  contentClassName,
}) {
  if (!field) return

  const saveStepData = async ({ newValue }) => {
    const options = { penID, step: step + 1, update: { [field]: newValue } }
    const data = await updateStepData(options)
    onChange && onChange(newValue)
    return data
  }

  const savePenData = async ({ newValue }) => {
    const options = { penID, update: { [field]: newValue } }
    const data = await updatePenData(options)
    return data
  }

  const onSave = async ({ newValue }) => {
    return step === undefined ? savePenData({ newValue }) : saveStepData({ newValue })
  }

  return (
    <div className={cx(`Editable:${field}`, 'relative', className)}>
      <ContentEditable
        value={value}
        placeholder={placeholder}
        penID={penID}
        step={step}
        field={field}
        isCode={isCode}
        readOnly={readOnly}
        className={contentClassName}
        callbackSave={onSave}
      />
    </div>
  )
}
