import React from 'react'
import Button from './Button'
import { XIcon } from '@heroicons/react/solid'

export default function Close({ acc }) {
  return (
    <Button
      acc={acc}>
      <XIcon className='w-6 h-6' />
    </Button>
  )
}
