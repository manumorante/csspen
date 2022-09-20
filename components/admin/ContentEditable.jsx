import React, { useState, createRef } from 'react'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-css'
import cx from 'classnames'
import { BoltIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import Button from '@/Button'

export default function ContentEditable({ value, placeholder = '...', isCode, readOnly, callbackSave, className }) {
  const [initialValue, setInitialValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [saving, setSaving] = useState(false)
  const editableRef = createRef()

  const niceCode = (code) => {
    if (typeof code === 'string' && code.length) {
      return highlight(code, languages.css)
    } else {
      return placeholder
    }
  }

  const handleSave = async () => {
    setSaving(true)
    const newValue = editableRef.current.innerText
    const hasChanges = newValue !== initialValue

    if (!hasChanges) return

    const data = await callbackSave({ newValue })

    if (data) {
      setInitialValue(newValue)
      setIsChanged(false)
      setSaving(false)
    }
  }

  const onFocus = () => {
    if (readOnly) return
    setIsEditing(true)
  }

  const onInput = () => {
    if (readOnly) return
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
    <>
      <div
        ref={editableRef}
        className={cx(
          'w-full outline-none',
          {
            'language-css p-3 bg-gray-900 whitespace-pre overflow-auto': isCode,
            'ring-4 ring-blue-400/80': isEditing && !isChanged,
            'ring-4 ring-yellow-300/80': isChanged,
          },
          'transition-all duration-500 ease-in-out',
          className
        )}
        contentEditable={!readOnly}
        autoCorrect='off'
        autoComplete='off'
        autoCapitalize='off'
        spellCheck='false'
        data-gramm={false}
        suppressContentEditableWarning={true}
        //
        // Events
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        //
        // Content
        dangerouslySetInnerHTML={{ __html: niceCode(value) }}
      />
      {(isEditing || isChanged) && (
        <div className='absolute top-full flex gap-1 mt-2'>
          <Button onClick={onReset} className='w-auto h-8' secondary>
            <XCircleIcon />
          </Button>

          {!saving && (
            <Button onClick={handleSave} className='w-auto h-8'>
              <BoltIcon />
              <div>Save</div>
            </Button>
          )}

          {saving && (
            <Button className='w-auto h-8'>
              <ArrowPathIcon className='animate-spin' />
              <div>Saving</div>
            </Button>
          )}
        </div>
      )}
    </>
  )
}
