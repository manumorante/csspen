import React from 'react'
import Base from './Base'
import { XIcon } from '@heroicons/react/solid'

export default function Close({ acc }) {
  return (
    <Base acc={acc}>
      <XIcon className='w-6 h-6' />
    </Base>
  )
}
