import { useState } from 'react'
import cx from 'clsx'

export default function Input({ id, value, placeholder, setValue, isRequired = false }) {
  const [isInvalid, setIsInvalid] = useState(false)
  const [placeholderText, setPlaceholderText] = useState(placeholder)

  const handleChange = (e) => {
    let newValue = e.target.value

    if (isRequired && !newValue) {
      setIsInvalid(true)
      setPlaceholderText(placeholder + ' is required')
    } else {
      setIsInvalid(false)
    }

    setValue(newValue)
  }

  return (
    <div
      className={cx('Input', {
        'ring-2 ring-red-600': isInvalid,
      })}>
      <input
        id={id}
        type='text'
        defaultValue={value}
        placeholder={placeholderText}
        className='input w-full'
        onChange={handleChange}
        onBlur={handleChange}
      />
      <div className='hidden group-invalid:block mt-1 text-red-500'>Error</div>
    </div>
  )
}
