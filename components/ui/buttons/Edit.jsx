import React from 'react'
import Base from './Base'
import { PencilIcon } from '@heroicons/react/solid'

export default function Edit({ acc }) {
  return (
    <Base acc={acc}>
      <PencilIcon className='w-6 h-6' />
    </Base>
  )
}
